import supabase, { supabaseUrl } from "./supabase";

/* =========================
   CREATE / EDIT PRODUCT
========================= */

export async function createEditProduct(newProduct, id) {
  const pricingType = newProduct.pricing_type || "VARIANT_FULL";

  const productPayload = {
    slug: newProduct.slug,
    name: {
      en: newProduct.name_en || "",
      fr: newProduct.name_fr || "",
      ar: newProduct.name_ar || "",
    },
    description: {
      en: newProduct.description_en || "",
      fr: newProduct.description_fr || "",
      ar: newProduct.description_ar || "",
    },
    category_id: newProduct.category_id || null,
    subcategory_id: newProduct.subcategory_id || null,
    type_id: newProduct.type_id || null,
    available: newProduct.available ?? true,
    featured: newProduct.featured ?? false,
    discount: newProduct.discount || 0,
    pricing_type: pricingType,
    base_price:
      pricingType === "SIMPLE" ? Number(newProduct.base_price) || null : null,
  };

  let query = supabase.from("products");
  if (!id) query = query.insert([productPayload]);
  if (id) query = query.update(productPayload).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Product could not be saved");
  }

  const productId = data.id;

  /* ── IMAGES ── */
  if (newProduct.images?.length) {
    if (id) {
      await supabase.from("product_images").delete().eq("product_id", id);
    }

    for (const img of newProduct.images) {
      if (!img) continue;

      if (typeof img === "string" && img.startsWith(supabaseUrl)) {
        await supabase
          .from("product_images")
          .insert({ product_id: productId, url: img });
        continue;
      }

      if (img instanceof File) {
        const imageName =
          `${Date.now()}-${Math.random()}-${img.name}`.replaceAll("/", "");
        const imagePath = `${supabaseUrl}/storage/v1/object/public/product_images/${imageName}`;

        const { error: storageError } = await supabase.storage
          .from("product_images")
          .upload(imageName, img);

        if (storageError) {
          console.error("Image upload failed:", storageError);
          continue;
        }

        await supabase
          .from("product_images")
          .insert({ product_id: productId, url: imagePath });
      }
    }
  }

  /* ── VARIANTS ── */
  // Always clear old variants first
  if (id) {
    await supabase.from("product_variants").delete().eq("product_id", id);
  }

  if (pricingType === "SIMPLE") {
    // No variants for simple products — base_price saved on products row
  } else if (pricingType === "VARIANT_DIMENSION") {
    // dimension_id only, thickness_id = null
    if (newProduct.variants?.length) {
      const variantRows = newProduct.variants.map((v) => ({
        product_id: productId,
        dimension_id: v.dimension_id,
        thickness_id: null,
        price: Number(v.price),
      }));

      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(variantRows);

      if (variantError) console.error("Variant insert failed:", variantError);
    }
  } else {
    // VARIANT_FULL — existing behavior: dimension_id + thickness_id
    if (newProduct.variants?.length) {
      const variantRows = newProduct.variants.map((v) => ({
        product_id: productId,
        dimension_id: v.dimension_id,
        thickness_id: v.thickness_id,
        price: Number(v.price),
      }));

      const { error: variantError } = await supabase
        .from("product_variants")
        .insert(variantRows);

      if (variantError) console.error("Variant insert failed:", variantError);
    }
  }

  /* ── SPECS ── */
  if (id) {
    await supabase.from("product_specs").delete().eq("product_id", id);
  }

  if (newProduct.specs?.length) {
    const specRows = newProduct.specs
      .filter((s) => s.label && s.value)
      .map((s) => ({ product_id: productId, label: s.label, value: s.value }));

    if (specRows.length) {
      const { error: specError } = await supabase
        .from("product_specs")
        .insert(specRows);
      if (specError) console.error("Spec insert failed:", specError);
    }
  }

  /* ── FEATURES ── */
  if (id) {
    await supabase.from("product_features").delete().eq("product_id", id);
  }

  if (newProduct.features?.length) {
    const featureRows = newProduct.features
      .filter((f) => f.en || f.fr || f.ar)
      .map((f) => ({
        product_id: productId,
        translations: { en: f.en || "", fr: f.fr || "", ar: f.ar || "" },
      }));

    if (featureRows.length) {
      const { error: featError } = await supabase
        .from("product_features")
        .insert(featureRows);
      if (featError) console.error("Feature insert failed:", featError);
    }
  }

  return data;
}

/* =========================
   GET PRODUCTS (SHOP)
========================= */

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      discount,
      featured,
      available,
      pricing_type,
      base_price,

      category:category_id (
        value,
        translations
      ),

      subcategory:subcategory_id (
        value,
        translations
      ),

      images:product_images (
        url
      ),

      variants:product_variants (
        price
      )
    `,
    )
    .order("id", { ascending: false });

  if (error) throw new Error("Products could not be loaded");

  return data.map((p) => ({
    id: p.id,
    name: p.name?.en || p.name?.fr || p.name?.ar || "",
    nameTranslations: p.name,
    slug: p.slug,
    discount: p.discount,
    featured: p.featured,
    available: p.available,
    pricingType: p.pricing_type,

    category: p.category?.translations?.en || p.category?.value || "",
    subcategory: p.subcategory?.translations?.en || p.subcategory?.value || "",
    categoryValue: p.category?.value || "",

    image: p.images?.[0]?.url || null,

    priceRange: getPriceRange(p.pricing_type, p.base_price, p.variants),
  }));
}

/* ======================
   PRICE RANGE — pricing_type aware
====================== */

function getPriceRange(pricingType, basePrice, variants = []) {
  if (pricingType === "SIMPLE") {
    return basePrice ? `${basePrice}` : 0;
  }

  // VARIANT_FULL or VARIANT_DIMENSION
  if (!variants.length) return 0;
  const prices = variants.map((v) => v.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `${min}` : `${min} – ${max}`;
}

/* =========================
   GET PRODUCT (ADMIN)
========================= */

export async function getProduct(id) {
  if (!id) throw new Error("Product ID is required");

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      description,
      discount,
      featured,
      available,
      category_id,
      subcategory_id,
      type_id,
      pricing_type,
      base_price,

      category:category_id (
        value,
        translations
      ),

      subcategory:subcategory_id (
        value,
        translations
      ),

      images:product_images (
        id,
        url
      ),

      variants:product_variants (
        id,
        dimension_id,
        thickness_id,
        price,

        dimension:dimension_id (
          id,
          label
        ),

        thickness:thickness_id (
          id,
          value
        )
      ),

      specs:product_specs (
        id,
        label,
        value
      ),

      features:product_features (
        id,
        translations
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProduct error:", error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

/* =========================
   DELETE PRODUCT
========================= */

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }
}
