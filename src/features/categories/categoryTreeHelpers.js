/**
 * Converts flat categories array into a nested tree structure.
 *
 * Input:  [{ id: 1, parent_id: null }, { id: 6, parent_id: 1 }, ...]
 * Output: [{ ...main, children: [{ ...sub, children: [{ ...type }] }] }]
 */
export function buildCategoryTree(categories) {
  if (!categories) return [];

  const map = {};
  const roots = [];

  // 1) Index every category by id
  categories.forEach((cat) => {
    map[cat.id] = { ...cat, children: [] };
  });

  // 2) Attach children to their parent
  categories.forEach((cat) => {
    if (cat.parent_id && map[cat.parent_id]) {
      map[cat.parent_id].children.push(map[cat.id]);
    } else {
      roots.push(map[cat.id]);
    }
  });

  return roots;
}

/**
 * Flattens tree into ordered array with depth info for table rendering.
 * Each item gets: { ...category, depth: 0|1|2, isLast: bool, parentIsLast: bool }
 */
export function flattenTree(tree, depth = 0, parentTrail = []) {
  const result = [];

  tree.forEach((node, index) => {
    const isLast = index === tree.length - 1;

    result.push({
      ...node,
      depth,
      isLast,
      parentTrail: [...parentTrail],
    });

    if (node.children?.length > 0) {
      result.push(
        ...flattenTree(node.children, depth + 1, [...parentTrail, isLast]),
      );
    }
  });

  return result;
}

/**
 * Get the display name for a category (uses translations.en or value)
 */
export function getCategoryDisplayName(category) {
  if (!category) return "—";
  return category.translations?.en || category.value || "—";
}

/**
 * Find a category by id from flat list
 */
export function findCategoryById(categories, id) {
  return categories?.find((cat) => cat.id === id) || null;
}

/**
 * Get parent options filtered by type
 */
export function getParentOptions(categories, selectedType) {
  if (!categories) return [];

  if (selectedType === "main") return [];

  if (selectedType === "subcategory") {
    return categories.filter((cat) => cat.type === "main");
  }

  if (selectedType === "type") {
    return categories.filter((cat) => cat.type === "subcategory");
  }

  return [];
}
