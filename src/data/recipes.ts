import type { Recipe } from './types';

const G = 'Obst & Gemüse' as const;
const C = 'Konserven' as const;
const T = 'Trockenwaren' as const;
const K = 'Tiefkühl' as const;
const W = 'Gewürze' as const;
const D = 'Drogerie' as const;
const S = 'Sonstiges' as const;

export const SHOPPING_CATEGORY_ORDER = [G, C, T, K, W, D, S] as const;

export const RECIPE_CATEGORIES = [
  'Schnell',
  'Asiatisch',
  'Indisch',
  'Italienisch',
  'Pasta',
  'Mexikanisch',
  'Suppen & Eintopf',
  'Bowls',
  'Street Food',
  'Backwaren & Dessert',
] as const;

export const recipes: Recipe[] = [
  {
    id: 'rigatoni',
    title: 'Vegane Rigatoni al Forno',
    categories: ['Italienisch', 'Pasta'],
    minutes: 60,
    tint: '#CBA378',
    photo: require('../../assets/recipes/rigatoni.jpg'),
    description:
      'Italienischer Nudelauflauf mit veganem Hack, Erbsen und cremiger Käse-Béchamel aus dem Ofen.',
    ingredients: [
      { name: 'Rigatoni', amount: 125, unit: 'g', category: T },
      { name: 'Zwiebel', amount: 0.25, unit: 'Stk', category: G },
      { name: 'Knoblauch', amount: 0.25, unit: 'Zehe', category: G },
      { name: 'Veganes Hack', amount: 125, unit: 'g', category: S },
      { name: 'Tomatenmark', amount: 0.5, unit: 'EL', category: S },
      { name: 'Agavendicksaft', amount: 0.25, unit: 'EL', category: S },
      { name: 'Getrockneter Oregano', amount: 0.25, unit: 'EL', category: W },
      { name: 'Paprikapulver', amount: 0.25, unit: 'TL', category: W },
      { name: 'Passierte Tomaten', amount: 125, unit: 'ml', category: S },
      { name: 'Pflanzliche Kochsahne', amount: 125, unit: 'ml', category: S },
      { name: 'Tiefkühlerbsen', amount: 25, unit: 'g', category: K },
      { name: 'Pflanzliche Butter', amount: 0.75, unit: 'EL', category: S },
      { name: 'Weizenmehl', amount: 0.75, unit: 'EL', category: T },
      { name: 'Pflanzliche Milch', amount: 50, unit: 'ml', category: S },
      { name: 'Hefeflocken', amount: 0.4, unit: 'EL', category: S },
      { name: 'Veganer Streukäse', amount: 25, unit: 'g', category: S },
      { name: 'Basilikum frisch', amount: 3, unit: 'g', category: G },
    ],
    steps: [
      'Zwiebel und Knoblauch fein würfeln, in Öl glasig andünsten.',
      'Veganes Hack zugeben und rundum kräftig anbraten, bis es gebräunt ist.',
      'Tomatenmark, Agavendicksaft, Oregano, Paprikapulver, Salz und Pfeffer einrühren, kurz mitrösten.',
      'Mit passierten Tomaten und Kochsahne ablöschen, Erbsen zugeben, köcheln lassen, bis die Nudeln fertig sind.',
      'Rigatoni al dente kochen, abgießen und mit der Soße vermengen.',
      'Für die Béchamel Butter schmelzen, Mehl einrühren, mit Milch und Kochsahne unter Rühren aufgießen, bis die Soße glatt ist.',
      'Hefeflocken und Streukäse einrühren, bis der Käse geschmolzen ist. Mit Salz, Pfeffer und Muskat abschmecken.',
      'Nudeln in eine Auflaufform geben, mit der Béchamel übergießen und bei 180 °C ca. 20 Minuten backen, bis die Oberfläche gebräunt ist.',
      'Mit frischem Basilikum bestreut servieren.',
    ],
    alternatives: 'Für mehr Räucharoma passen gebratene Räuchertofu-Würfel dazu.',
  },
  {
    id: 'spaghettini',
    title: 'Spaghettini in brauner Butter mit Mandel-Gremolata',
    categories: ['Pasta', 'Schnell'],
    minutes: 20,
    tint: '#D6B98C',
    photo: require('../../assets/recipes/spaghettini.jpg'),
    description:
      'Nussig-buttrige Spaghettini mit gebräunter veganer Butter, Mandelmus und frischer Zitronen-Mandel-Gremolata.',
    ingredients: [
      { name: 'Spaghettini', amount: 75, unit: 'g', category: T },
      { name: 'Mandeln', amount: 15, unit: 'g', category: T },
      { name: 'Petersilie', amount: 7.5, unit: 'g', category: G },
      { name: 'Zitrone', amount: 0.25, unit: 'Stk', category: G },
      { name: 'Vegane Butter', amount: 37.5, unit: 'g', category: S },
      { name: 'Zwiebel', amount: 0.25, unit: 'Stk', category: G },
      { name: 'Knoblauch', amount: 0.75, unit: 'Zehe', category: G },
      { name: 'Dunkles Mandelmus', amount: 12.5, unit: 'g', category: T },
      { name: 'Chiliflocken', amount: 0.125, unit: 'TL', category: W },
    ],
    steps: [
      'Mandeln in einer fettfreien Pfanne rösten, bis sie leicht gebräunt sind, dann fein hacken.',
      'Petersilie fein hacken, mit Mandeln, Zitronenabrieb, Salz und Pfeffer zur Gremolata vermengen, mit etwas Zitronensaft abschmecken.',
      'Spaghettini in Salzwasser al dente kochen, dabei etwas Nudelwasser auffangen.',
      'Zwiebel fein würfeln, Knoblauch in dünne Scheiben schneiden.',
      'Einen Teil der Butter bei kleiner Hitze schmelzen, Zwiebel, Knoblauch und Chiliflocken darin anschwitzen, bis die Butter gebräunt ist.',
      'Mandelmus und restlichen Zitronensaft einrühren, kurz aufköcheln lassen.',
      'Vom Herd nehmen, restliche Butter für die Cremigkeit unterrühren.',
      'Spaghettini mit etwas Nudelwasser in der braunen Butter schwenken, mit Gremolata bestreuen und servieren.',
    ],
    alternatives: 'Die Mandeln lassen sich problemlos durch Hasel- oder Erdnüsse ersetzen.',
  },
  {
    id: 'udon',
    title: 'Hot-Oil-Udonnudeln mit Tofubröseln',
    categories: ['Asiatisch', 'Schnell'],
    minutes: 20,
    tint: '#B98F6B',
    photo: require('../../assets/recipes/udon.jpg'),
    description:
      'Warme Udonnudeln mit zischend heißem Erdnussöl, Sojasoße und knusprigen Tofu-Erdnuss-Bröseln.',
    ingredients: [
      { name: 'Naturtofu', amount: 100, unit: 'g', category: S },
      { name: 'Erdnüsse', amount: 2, unit: 'EL', category: T },
      { name: 'Udonnudeln', amount: 200, unit: 'g', category: T },
      { name: 'Edamame', amount: 50, unit: 'g', category: K },
      { name: 'Frühlingszwiebel', amount: 1, unit: 'Stk', category: G },
      { name: 'Knoblauch', amount: 1, unit: 'Zehe', category: G },
      { name: 'Sojasauce', amount: 1.5, unit: 'EL', category: S },
      { name: 'Schwarzer Reisessig', amount: 1, unit: 'TL', category: S },
      { name: 'Chiliflocken', amount: 0.25, unit: 'TL', category: W },
      { name: 'Erdnussöl', amount: 3, unit: 'EL', category: S },
      { name: 'Sesam', amount: 0.5, unit: 'TL', category: T },
      { name: 'Koriander frisch', amount: 3, unit: 'g', category: G },
      { name: 'Sprossen frisch', amount: 10, unit: 'g', category: G },
    ],
    steps: [
      'Tofu in kleine Stücke zerbröseln, Erdnüsse grob hacken.',
      'Erdnussöl in einer Pfanne erhitzen, Tofu darin 5–6 Minuten anbraten, bis er bräunt, dann Erdnüsse zugeben und 3–4 Minuten mitbraten, bis alles knusprig ist.',
      'Udonnudeln nach Packungsanleitung kochen, herausnehmen, Kochwasser im Topf lassen. Edamame darin garen, abgießen und kalt abschrecken.',
      'Frühlingszwiebel in Ringe schneiden, Knoblauch reiben.',
      'Nudeln, Edamame, Frühlingszwiebel, Knoblauch, Sojasauce, Reisessig, Chiliflocken und Salz in einer Schüssel vermengen.',
      'Erdnussöl stark erhitzen und heiß über die Nudeln gießen, gut vermengen.',
      'Mit Tofu-Erdnuss-Bröseln, Sesam, Koriander und Sprossen toppen und servieren.',
    ],
    alternatives: 'Statt schwarzem Reisessig geht auch Balsamico, bei der Sojasauce reicht eine Sorte.',
  },
];

export function findRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}
