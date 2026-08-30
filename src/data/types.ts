import type { ImageSourcePropType } from 'react-native';

export type ShoppingCategory =
  | 'Obst & Gemüse'
  | 'Konserven'
  | 'Trockenwaren'
  | 'Tiefkühl'
  | 'Gewürze'
  | 'Drogerie'
  | 'Sonstiges';

export type RecipeCategory =
  | 'Schnell'
  | 'Asiatisch'
  | 'Indisch'
  | 'Italienisch'
  | 'Pasta'
  | 'Mexikanisch'
  | 'Suppen & Eintopf'
  | 'Bowls'
  | 'Street Food'
  | 'Backwaren & Dessert';

export type Ingredient = {
  name: string;
  amount: number; // per portion, scaled by portion count
  unit: string;
  category: ShoppingCategory;
  group?: string; // optional sub-heading, e.g. "Für die Soße" vs "Für die Nudeln"
};

export type Recipe = {
  id: string;
  title: string;
  categories: RecipeCategory[];
  minutes: number;
  tint: string;
  photo?: ImageSourcePropType;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  alternatives?: string; // optional substitution tip, e.g. "Statt Tofu geht auch Seitan"
  // For recipes that don't scale with a portion count (mainly baked goods: a cake
  // is baked as one whole in one pan, not "N portions"). When set, `ingredients`
  // hold the recipe's real, absolute amounts (not per-portion), the portion
  // stepper is replaced by this label, and the shopping list adds the recipe
  // exactly once regardless of how many "portions" are planned.
  fixedYield?: { label: string };
};

export type CustomUnit = 'Stk' | 'g' | 'ml';

export type CustomItem = {
  id: string;
  name: string;
  category: ShoppingCategory;
  unit?: CustomUnit;
  amount?: number; // only meaningful together with unit
};
