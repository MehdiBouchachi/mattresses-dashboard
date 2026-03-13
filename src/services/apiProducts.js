import supabase, { supabaseUrl } from "./supabase";

export async function createEditProduct(newProduct, id) {
  let query = supabase.from("products");

  const productPayload = {
    slug: newProduct.slug,
    name: newProduct.name_en,
    description: newProduct.description_en,
    category_id: newProduct.category_id || null,
    subcategory_id: newProduct.subcategory_id || null,
    type_id: newProduct.type_id || null,
    available: newProduct.available ?? true,
    featured: newProduct.featured ?? false,
    discount: newProduct.discount || 0,
  };

  console.log("IMAGES RECEIVED:", newProduct.images);
  /* ── CREATE ── */
  if (!id) query = query.insert([productPayload]);

  /* ── UPDATE ── */
  if (id) query = query.update(productPayload).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be saved");
  }

  const productId = data.id;

  /* ── IMAGES ── */
  if (newProduct.images?.length) {
    // When editing, clear old images first
    if (id) {
      await supabase.from("product_images").delete().eq("product_id", id);
    }

    for (const img of newProduct.images) {
      if (!img) continue;

      // Already-uploaded URL string
      if (typeof img === "string" && img.startsWith(supabaseUrl)) {
        await supabase
          .from("product_images")
          .insert({ product_id: productId, url: img });
        continue;
      }

      // File object — upload then save
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
  if (id) {
    await supabase.from("product_variants").delete().eq("product_id", id);
  }

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

    if (variantError) {
      console.error("Variant insert failed:", variantError);
    }
  }

  /* ── SPECS ── */
  if (id) {
    await supabase.from("product_specs").delete().eq("product_id", id);
  }

  if (newProduct.specs?.length) {
    const specRows = newProduct.specs
      .filter((s) => s.label && s.value)
      .map((s) => ({
        product_id: productId,
        label: s.label,
        value: s.value,
      }));

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
   GET PRODUCTS
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
    name: p.name,
    slug: p.slug,
    discount: p.discount,
    featured: p.featured,
    available: p.available,

    // Display label
    category: p.category?.translations?.en || p.category?.value || "",
    subcategory: p.subcategory?.translations?.en || p.subcategory?.value || "",

    // Raw value for filtering (matches the Filter option value)
    categoryValue: p.category?.value || "",

    image: p.images?.[0]?.url || null,

    priceRange: getPriceRange(p.variants),
  }));
}

/* ======================
   PRICE RANGE
====================== */

function getPriceRange(variants = []) {
  if (!variants.length) return 0;

  const prices = variants.map((v) => v.price);

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return min === max ? `${min}` : `${min} – ${max}`;
}

// services/apiProducts.js — REPLACE getProduct

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
   CREATE / UPDATE PRODUCT
========================= */

export async function createEditProductdd(newProduct, id) {
  const hasImagePath = newProduct?.images?.[0]?.file?.startsWith?.(supabaseUrl);

  const imageName =
    `${Math.random()}-${newProduct.images?.[0]?.file?.name}`.replaceAll(
      "/",
      "",
    );

  const imagePath = hasImagePath
    ? newProduct.images[0].file
    : `${supabaseUrl}/storage/v1/object/public/product_images/${imageName}`;

  let query = supabase.from("products");

  /* CREATE */

  if (!id)
    query = query.insert([
      {
        slug: newProduct.slug,
        name: newProduct.name_en,
        description: newProduct.description_en,
        category_id: newProduct.category_id,
        subcategory_id: newProduct.subcategory_id,
        available: newProduct.available,
        featured: newProduct.featured,
        discount: newProduct.discount,
      },
    ]);

  /* UPDATE */

  if (id)
    query = query
      .update({
        slug: newProduct.slug,
        name: newProduct.name_en,
        description: newProduct.description_en,
        category_id: newProduct.category_id,
        subcategory_id: newProduct.subcategory_id,
        available: newProduct.available,
        featured: newProduct.featured,
        discount: newProduct.discount,
      })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be created");
  }

  /* =========================
     IMAGE UPLOAD
  ========================= */

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("product_images")
    .upload(imageName, newProduct.images[0].file);

  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    throw new Error("Product image upload failed");
  }

  /* SAVE IMAGE URL */

  await supabase.from("product_images").insert({
    product_id: data.id,
    url: imagePath,
  });

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
