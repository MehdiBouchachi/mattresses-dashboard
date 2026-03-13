// services/apiCategories.js — ADD these exports

import supabase from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("id, value, translations, parent_id, type")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Categories could not be loaded");
  }

  return data;
}

export async function getDimensions() {
  const { data, error } = await supabase
    .from("dimensions")
    .select("id, label")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Dimensions could not be loaded");
  }

  return data;
}

export async function getThicknesses() {
  const { data, error } = await supabase
    .from("thicknesses")
    .select("id, value")
    .order("id");

  if (error) {
    console.error(error);
    throw new Error("Thicknesses could not be loaded");
  }

  return data;
}

export async function createCategory(newCategory) {
  const { data, error } = await supabase
    .from("categories")
    .insert([newCategory])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be created");
  }

  return data;
}

// ─── Update a category ─────────────────────────────────────────
export async function updateCategory(id, updatedFields) {
  const { data, error } = await supabase
    .from("categories")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Category could not be updated");
  }

  return data;
}

// ─── Delete a category ─────────────────────────────────────────
export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Category could not be deleted");
  }

  return id;
}
