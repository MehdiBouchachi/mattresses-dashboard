import supabase from "./supabase";

// ========================
// DIMENSIONS
// ========================

export async function getDimensions() {
  const { data, error } = await supabase
    .from("dimensions")
    .select("*")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Dimensions could not be loaded");
  }

  return data;
}

export async function createDimension(label) {
  const { data, error } = await supabase
    .from("dimensions")
    .insert([{ label }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Dimension could not be created");
  }

  return data;
}

export async function deleteDimension(id) {
  const { data, error } = await supabase
    .from("dimensions")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Dimension could not be deleted");
  }

  return data;
}

// ========================
// THICKNESSES
// ========================

export async function getThicknesses() {
  const { data, error } = await supabase
    .from("thicknesses")
    .select("*")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Thicknesses could not be loaded");
  }

  return data;
}

export async function createThickness(value) {
  const { data, error } = await supabase
    .from("thicknesses")
    .insert([{ value }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Thickness could not be created");
  }

  return data;
}

export async function deleteThickness(id) {
  const { data, error } = await supabase
    .from("thicknesses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Thickness could not be deleted");
  }

  return data;
}

// ========================
// SITE SETTINGS
// ========================

export async function getSetting(key) {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("key", key)
    .single();

  // If no row found yet, return null gracefully
  if (error && error.code === "PGRST116") {
    return null;
  }

  if (error) {
    console.error(error);
    throw new Error(`Setting "${key}" could not be loaded`);
  }

  return data;
}

export async function updateSetting({ key, value }) {
  const { data, error } = await supabase
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" })
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Setting "${key}" could not be updated`);
  }

  return data;
}
