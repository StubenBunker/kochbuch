import { findRecipe, SHOPPING_CATEGORY_ORDER } from '../data/recipes';
import type { CustomItem, ShoppingCategory } from '../data/types';

export type ShoppingLine = {
  key: string; // `${name}|${unit}` for recipe-derived lines, `custom:${id}` for manual ones
  name: string;
  unit: string; // '' for manual items — they don't carry a per-portion amount
  category: ShoppingCategory;
  amount: number;
  custom?: boolean;
};

export type ShoppingGroup = {
  category: ShoppingCategory;
  items: ShoppingLine[];
};

export function buildShoppingList(
  plan: string[],
  portions: Record<string, number>,
  defaultPortions: number,
): ShoppingGroup[] {
  const map = new Map<string, ShoppingLine>();

  for (const id of plan) {
    const recipe = findRecipe(id);
    if (!recipe) continue;
    const count = recipe.fixedYield ? 1 : portions[id] ?? defaultPortions;
    for (const ing of recipe.ingredients) {
      const key = `${ing.name}|${ing.unit}`;
      const existing = map.get(key);
      if (existing) {
        existing.amount += ing.amount * count;
      } else {
        map.set(key, {
          key,
          name: ing.name,
          unit: ing.unit,
          category: ing.category,
          amount: ing.amount * count,
        });
      }
    }
  }

  const lines = Array.from(map.values());
  return SHOPPING_CATEGORY_ORDER.map((category) => ({
    category,
    items: lines.filter((l) => l.category === category),
  })).filter((g) => g.items.length > 0);
}

/** Folds manually added items (see CustomItem) into the recipe-derived groups. */
export function mergeCustomItems(
  groups: ShoppingGroup[],
  customItems: CustomItem[],
): ShoppingGroup[] {
  const byCategory = new Map<ShoppingCategory, ShoppingLine[]>();
  for (const group of groups) byCategory.set(group.category, [...group.items]);

  for (const item of customItems) {
    const line: ShoppingLine = {
      key: `custom:${item.id}`,
      name: item.name,
      unit: item.unit ?? '',
      amount: item.unit ? item.amount ?? 1 : 0,
      category: item.category,
      custom: true,
    };
    byCategory.set(item.category, [...(byCategory.get(item.category) ?? []), line]);
  }

  return SHOPPING_CATEGORY_ORDER.map((category) => ({
    category,
    items: byCategory.get(category) ?? [],
  })).filter((g) => g.items.length > 0);
}
