import supabase from "./supabase";

// ════════════════════════════════════════════
// HELPER: Date range
// ════════════════════════════════════════════

function getStartDate(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
}

// ════════════════════════════════════════════
// 1. DASHBOARD STATS (4 cards) — FIXED
// ════════════════════════════════════════════

export async function getDashboardStats(days = 30) {
  const startDate = getStartDate(days);

  // ── Step 1: Get order IDs in range ──
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, created_at")
    .gte("created_at", startDate);

  if (ordersError) {
    console.error("Orders fetch error:", ordersError);
    throw new Error("Could not load dashboard stats");
  }

  const totalOrders = orders.length;
  const orderIds = orders.map((o) => o.id);

  // ── Step 2: Get summaries separately for those order IDs ──
  let totalRevenue = 0;

  if (orderIds.length > 0) {
    const { data: summaries, error: summaryError } = await supabase
      .from("order_summary")
      .select("order_id, total_price")
      .in("order_id", orderIds);

    if (summaryError) {
      console.error("Summary fetch error:", summaryError);
      // Don't throw — just leave revenue as 0
    } else {
      totalRevenue = summaries.reduce(
        (sum, s) => sum + (s.total_price || 0),
        0,
      );
    }
  }

  const avgOrderValue =
    totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // ── Step 3: Orders today ──
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const ordersToday = orders.filter(
    (order) => new Date(order.created_at) >= todayStart,
  ).length;

  return {
    totalOrders,
    totalRevenue,
    avgOrderValue,
    ordersToday,
  };
}

// ════════════════════════════════════════════
// 2. REVENUE CHART — FIXED (separate queries)
// ════════════════════════════════════════════

export async function getRevenueChart(days = 30) {
  const startDate = getStartDate(days);

  // Step 1: Get orders in range
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, created_at")
    .gte("created_at", startDate)
    .order("created_at", { ascending: true });

  if (ordersError) {
    console.error(ordersError);
    throw new Error("Revenue chart data could not be loaded");
  }

  const orderIds = orders.map((o) => o.id);

  // Step 2: Get summaries
  let summaryMap = {};

  if (orderIds.length > 0) {
    const { data: summaries, error: summaryError } = await supabase
      .from("order_summary")
      .select("order_id, total_price")
      .in("order_id", orderIds);

    if (!summaryError && summaries) {
      summaries.forEach((s) => {
        summaryMap[s.order_id] = s.total_price || 0;
      });
    }
  }

  // Step 3: Group by date
  const revenueByDay = {};

  orders.forEach((order) => {
    const date = new Date(order.created_at).toLocaleDateString("en-CA");
    const price = summaryMap[order.id] || 0;
    revenueByDay[date] = (revenueByDay[date] || 0) + price;
  });

  // Step 4: Fill missing days
  const result = [];
  const current = new Date(startDate);
  const today = new Date();

  while (current <= today) {
    const dateStr = current.toLocaleDateString("en-CA");
    result.push({
      date: dateStr,
      revenue: revenueByDay[dateStr] || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
}

// ════════════════════════════════════════════
// 3. ORDER STATUS (pie chart)
// ════════════════════════════════════════════

export async function getOrderStatusStats(days = 30) {
  const startDate = getStartDate(days);

  const { data, error } = await supabase
    .from("orders")
    .select("status")
    .gte("created_at", startDate);

  if (error) {
    console.error(error);
    throw new Error("Order status stats could not be loaded");
  }

  const statusCounts = {
    unconfirmed: 0,
    confirmed: 0,
    in_delivering: 0,
    delivered: 0,
  };

  data.forEach((order) => {
    if (Object.prototype.hasOwnProperty.call(statusCounts, order.status)) {
      statusCounts[order.status]++;
    }
  });

  return Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));
}

// ════════════════════════════════════════════
// 4. TOP PRODUCTS (top 5)
// ════════════════════════════════════════════

export async function getTopProducts(days = 30, limit = 5) {
  const startDate = getStartDate(days);

  const { data: orders, error: orderErr } = await supabase
    .from("orders")
    .select("id")
    .gte("created_at", startDate);

  if (orderErr) {
    console.error(orderErr);
    throw new Error("Top products could not be loaded");
  }

  const orderIds = orders.map((o) => o.id);

  if (orderIds.length === 0) return [];

  const { data: items, error: itemsErr } = await supabase
    .from("order_items")
    .select("name, quantity")
    .in("order_id", orderIds);

  if (itemsErr) {
    console.error(itemsErr);
    throw new Error("Top products items could not be loaded");
  }

  const productMap = {};
  items.forEach((item) => {
    if (!productMap[item.name]) productMap[item.name] = 0;
    productMap[item.name] += item.quantity || 1;
  });

  return Object.entries(productMap)
    .map(([name, totalQuantity]) => ({ name, totalQuantity }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, limit);
}

// ════════════════════════════════════════════
// 5. RECENT ORDERS (latest 10) — FIXED
// ════════════════════════════════════════════

export async function getRecentOrders(days = 30, limit = 10) {
  const startDate = getStartDate(days);

  // Step 1: Get orders
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, order_code, status, created_at")
    .gte("created_at", startDate)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (ordersError) {
    console.error("Orders error:", ordersError);
    throw new Error("Recent orders could not be loaded");
  }

  if (!orders.length) return [];

  const orderIds = orders.map((o) => o.id);

  // Step 2: Get customers separately
  const { data: customers } = await supabase
    .from("order_customer")
    .select("order_id, first_name, last_name")
    .in("order_id", orderIds);

  // Step 3: Get summaries separately
  const { data: summaries } = await supabase
    .from("order_summary")
    .select("order_id, total_price")
    .in("order_id", orderIds);

  // Step 4: Build lookup maps
  const customerMap = {};
  (customers || []).forEach((c) => {
    customerMap[c.order_id] = c;
  });

  const summaryMap = {};
  (summaries || []).forEach((s) => {
    summaryMap[s.order_id] = s;
  });

  // Step 5: Merge
  return orders.map((order) => ({
    ...order,
    customer: customerMap[order.id] || null,
    summary: summaryMap[order.id] || null,
  }));
}
