import { findRecipe, SHOPPING_CATEGORY_ORDER } from '../data/recipes';
import type { ShoppingCategory } from '../data/types';

export type ShoppingLine = {
  key: string; // `${name}|${unit}`
  name: string;
  unit: string;
  category: ShoppingCategory;
  amount: number;
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
    const count = portions[id] ?? defaultPortions;
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
