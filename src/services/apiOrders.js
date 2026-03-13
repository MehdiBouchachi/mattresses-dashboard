import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

// ─── Fetch orders with filter, sort, pagination, search ─────────
export async function getOrders({ filter, sortBy, page, search }) {
  let query = supabase.from("orders").select(
    `
      id,
      order_code,
      status,
      created_at,

      order_summary (
        items_count,
        total_price
      ),

      order_customer (
        first_name,
        last_name
      ),

      order_payment (
        method,
        status
      )
    `,
    { count: "exact" },
  );

  // ── Search by order_code ──
  // Supabase can't search joined columns, so we search order_code server-side.
  // For customer name search we'll use a different approach below.
  if (search) {
    query = query.ilike("order_code", `%${search}%`);
  }

  // ── Filter by status ──
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // ── Sort ──
  if (sortBy) {
    const sortField =
      sortBy.field === "total_price" ? "created_at" : sortBy.field;
    query = query.order(sortField, {
      ascending: sortBy.direction === "asc",
    });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  // ── Pagination ──
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders could not be loaded");
  }

  return { data, count };
}

// ─── Search orders (no pagination — for customer name search) ───
export async function searchOrders({ search, filter, sortBy }) {
  // Split into individual words: "Mehdi Bouchachi" → ["Mehdi", "Bouchachi"]
  const words = search.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return { data: [], count: 0 };

  // ── Step 1: Search order_customer ──
  // For each word, find customers where first_name OR last_name matches
  // Then intersect results so ALL words must match somewhere

  let matchingOrderIds = null;

  for (const word of words) {
    const { data: customers, error: custErr } = await supabase
      .from("order_customer")
      .select("order_id")
      .or(`first_name.ilike.%${word}%,last_name.ilike.%${word}%`);

    if (custErr) {
      console.error(custErr);
      throw new Error("Customer search failed");
    }

    const ids = new Set(customers.map((c) => c.order_id));

    if (matchingOrderIds === null) {
      // First word — take all matches
      matchingOrderIds = ids;
    } else {
      // Subsequent words — intersect (keep only IDs that match ALL words)
      matchingOrderIds = new Set(
        [...matchingOrderIds].filter((id) => ids.has(id)),
      );
    }
  }

  // ── Step 2: Also search by order_code (full string) ──
  const { data: codeMatches, error: codeErr } = await supabase
    .from("orders")
    .select("id")
    .ilike("order_code", `%${search}%`);

  if (codeErr) {
    console.error(codeErr);
    throw new Error("Order code search failed");
  }

  const codeOrderIds = codeMatches.map((o) => o.id);

  // ── Step 3: Merge unique IDs ──
  const allIds = [...new Set([...(matchingOrderIds || []), ...codeOrderIds])];

  if (allIds.length === 0) {
    return { data: [], count: 0 };
  }

  // ── Step 4: Fetch full orders for matched IDs ──
  let query = supabase
    .from("orders")
    .select(
      `
      id,
      order_code,
      status,
      created_at,

      order_summary (
        items_count,
        total_price
      ),

      order_customer (
        first_name,
        last_name
      ),

      order_payment (
        method,
        status
      )
    `,
      { count: "exact" },
    )
    .in("id", allIds);

  // ── Filter ──
  if (filter) {
    query = query.eq(filter.field, filter.value);
  }

  // ── Sort ──
  if (sortBy) {
    const sortField =
      sortBy.field === "total_price" ? "created_at" : sortBy.field;
    query = query.order(sortField, {
      ascending: sortBy.direction === "asc",
    });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Orders search failed");
  }

  return { data, count };
}

// ─── Fetch a single order with full details ─────────────────────
export async function getOrder(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      order_code,
      status,
      created_at,

      order_customer (
        first_name,
        last_name,
        email,
        phone
      ),

      order_shipping (
        wilaya,
        city,
        street,
        map_link
      ),

      order_payment (
        method,
        status
      ),

      order_summary (
        items_count,
        total_quantity,
        total_price
      ),

      order_items (
        product_id,
        name,
        size,
        thickness,
        density,
        price,
        quantity,
        subtotal
      )
    `,
    )
    .eq("id", orderId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(`Order #${orderId} could not be loaded`);
  }

  return data;
}

// ─── Update order status ────────────────────────────────────────
export async function updateOrderStatus(orderId, status) {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order status could not be updated");
  }

  return data;
}

// ─── Update payment status ──────────────────────────────────────
export async function updatePaymentStatus(orderId, paymentStatus) {
  const { data, error } = await supabase
    .from("order_payment")
    .update({ status: paymentStatus })
    .eq("order_id", orderId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Payment status could not be updated");
  }

  return data;
}
