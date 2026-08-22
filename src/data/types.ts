export type ShoppingCategory =
  | 'Obst & Gemüse'
  | 'Trockenwaren'
  | 'Tiefkühl'
  | 'Gewürze'
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
  photo?: string;
  description: string;
  ingredients: Ingredient[];
  steps: string[];
};
