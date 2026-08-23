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
  | 'Asiatisch'
  | 'Indisch'
  | 'Bowls'
  | 'Schnell'
  | 'Backen';

export type Ingredient = {
  name: string;
  amount: number; // per portion, scaled by portion count
  unit: string;
  category: ShoppingCategory;
};

export type Recipe = {
  id: string;
  title: string;
  category: RecipeCategory;
  minutes: number;
  tint: string;
  photo?: ImageSourcePropType;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
  alternatives?: string; // optional substitution tip, e.g. "Statt Tofu geht auch Seitan"
};

export type CustomItem = {
  id: string;
  name: string;
  category: ShoppingCategory;
};
