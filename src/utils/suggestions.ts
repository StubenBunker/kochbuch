import { recipes } from '../data/recipes';
import type { CustomUnit, ShoppingCategory } from '../data/types';

export type ItemSuggestion = {
  name: string;
  category: ShoppingCategory;
  unit?: CustomUnit;
};

// Alle eindeutigen Zutatennamen aus den Rezepten, als Vorschlagsgrundlage —
// deckt Kochzutaten ab, ohne dass man sie separat pflegen müsste.
export function getRecipeIngredientSuggestions(): ItemSuggestion[] {
  const map = new Map<string, ItemSuggestion>();
  for (const recipe of recipes) {
    for (const ing of recipe.ingredients) {
      if (!map.has(ing.name)) {
        map.set(ing.name, { name: ing.name, category: ing.category });
      }
    }
  }
  return Array.from(map.values());
}

/**
 * Filtert Vorschläge nach Suchtext. `knownItems` (frühere manuelle Artikel,
 * z.B. "Toilettenpapier") gehen vor Rezeptzutaten, da sie persönlicher/
 * gezielter sind. Präfix-Treffer ("Äp" → "Äpfel") stehen vor reinen
 * Teilstring-Treffern.
 */
export function filterItemSuggestions(
  query: string,
  knownItems: Record<string, { category: ShoppingCategory; unit?: CustomUnit }>,
  recipeSuggestions: ItemSuggestion[],
  limit = 5,
): ItemSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const candidates = new Map<string, ItemSuggestion>();
  for (const [name, data] of Object.entries(knownItems)) {
    candidates.set(name, { name, ...data });
  }
  for (const s of recipeSuggestions) {
    if (!candidates.has(s.name)) candidates.set(s.name, s);
  }

  const matches = Array.from(candidates.values()).filter((s) =>
    s.name.toLowerCase().includes(q),
  );

  matches.sort((a, b) => {
    const aPrefix = a.name.toLowerCase().startsWith(q);
    const bPrefix = b.name.toLowerCase().startsWith(q);
    if (aPrefix !== bPrefix) return aPrefix ? -1 : 1;
    return a.name.localeCompare(b.name, 'de');
  });

  return matches.slice(0, limit);
}
