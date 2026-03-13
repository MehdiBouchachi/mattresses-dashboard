import supabase from "./supabase";

/* ─────────────────────────────
   SIGNUP
───────────────────────────── */

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

/* ─────────────────────────────
   LOGIN
───────────────────────────── */

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

/* ─────────────────────────────
   CURRENT USER
───────────────────────────── */

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

/* ─────────────────────────────
   LOGOUT
───────────────────────────── */

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

/* ─────────────────────────────
   UPDATE USER
───────────────────────────── */
export async function updateCurrentUser({ password, fullName }) {
  const updates = {};

  if (password) updates.password = password;
  if (fullName) updates.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updates);

  if (error) throw new Error(error.message);

  return data;
}
