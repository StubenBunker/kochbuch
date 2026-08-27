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
    description: 'Italienischer Nudelauflauf mit veganem Hack und cremiger Béchamel aus dem Ofen.',
    ingredients: [
      { name: 'Zwiebel', amount: 0.25, unit: 'Stk', category: G, group: 'Für die Soße' },
      { name: 'Knoblauch', amount: 0.25, unit: 'Zehe', category: G, group: 'Für die Soße' },
      { name: 'Veganes Hack', amount: 125, unit: 'g', category: S, group: 'Für die Soße' },
      { name: 'Tomatenmark', amount: 0.5, unit: 'EL', category: S, group: 'Für die Soße' },
      { name: 'Agavendicksaft', amount: 0.25, unit: 'EL', category: S, group: 'Für die Soße' },
      { name: 'Getrockneter Oregano', amount: 0.25, unit: 'EL', category: W, group: 'Für die Soße' },
      { name: 'Paprikapulver', amount: 0.25, unit: 'TL', category: W, group: 'Für die Soße' },
      { name: 'Passierte Tomaten', amount: 125, unit: 'ml', category: S, group: 'Für die Soße' },
      { name: 'Pflanzliche Kochsahne', amount: 62.5, unit: 'ml', category: S, group: 'Für die Soße' },
      { name: 'Pflanzliche Butter', amount: 0.75, unit: 'EL', category: S, group: 'Für die Béchamel' },
      { name: 'Weizenmehl', amount: 0.75, unit: 'EL', category: T, group: 'Für die Béchamel' },
      { name: 'Pflanzliche Milch', amount: 50, unit: 'ml', category: S, group: 'Für die Béchamel' },
      { name: 'Pflanzliche Kochsahne', amount: 62.5, unit: 'ml', category: S, group: 'Für die Béchamel' },
      { name: 'Rigatoni', amount: 125, unit: 'g', category: T, group: 'Außerdem' },
      { name: 'Basilikum frisch', amount: 3, unit: 'g', category: G, group: 'Außerdem' },
    ],
    steps: [
      'Zwiebel und Knoblauch fein würfeln, in Öl glasig andünsten.',
      'Veganes Hack zugeben und rundum kräftig anbraten, bis es gebräunt ist.',
      'Tomatenmark, Agavendicksaft, Oregano, Paprikapulver, Salz und Pfeffer einrühren, kurz mitrösten.',
      'Mit passierten Tomaten und Kochsahne ablöschen, köcheln lassen, bis die Nudeln fertig sind.',
      'Rigatoni al dente kochen, abgießen und mit der Soße vermengen.',
      'Für die Béchamel Butter schmelzen, Mehl einrühren, mit Milch und Kochsahne unter Rühren aufgießen, bis die Soße glatt ist. Mit Salz, Pfeffer und Muskat abschmecken.',
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
      { name: 'Spaghettini', amount: 75, unit: 'g', category: T, group: 'Für die Pasta' },
      { name: 'Mandeln', amount: 15, unit: 'g', category: T, group: 'Für die Gremolata' },
      { name: 'Petersilie', amount: 7.5, unit: 'g', category: G, group: 'Für die Gremolata' },
      { name: 'Zitrone', amount: 0.25, unit: 'Stk', category: G, group: 'Für die Gremolata' },
      { name: 'Vegane Butter', amount: 37.5, unit: 'g', category: S, group: 'Für die braune Butter' },
      { name: 'Zwiebel', amount: 0.25, unit: 'Stk', category: G, group: 'Für die braune Butter' },
      { name: 'Knoblauch', amount: 0.75, unit: 'Zehe', category: G, group: 'Für die braune Butter' },
      { name: 'Dunkles Mandelmus', amount: 12.5, unit: 'g', category: T, group: 'Für die braune Butter' },
      { name: 'Chiliflocken', amount: 0.125, unit: 'TL', category: W, group: 'Für die braune Butter' },
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
      { name: 'Udonnudeln', amount: 200, unit: 'g', category: T, group: 'Außerdem' },
      { name: 'Edamame', amount: 50, unit: 'g', category: K, group: 'Außerdem' },
      { name: 'Frühlingszwiebel', amount: 1, unit: 'Stk', category: G, group: 'Für die Soße' },
      { name: 'Knoblauch', amount: 1, unit: 'Zehe', category: G, group: 'Für die Soße' },
      { name: 'Sojasauce', amount: 1.5, unit: 'EL', category: S, group: 'Für die Soße' },
      { name: 'Schwarzer Reisessig', amount: 1, unit: 'TL', category: S, group: 'Für die Soße' },
      { name: 'Chiliflocken', amount: 0.25, unit: 'TL', category: W, group: 'Für die Soße' },
      { name: 'Erdnussöl', amount: 3, unit: 'EL', category: S, group: 'Für die Soße' },
      { name: 'Naturtofu', amount: 100, unit: 'g', category: S, group: 'Toppings' },
      { name: 'Erdnüsse', amount: 2, unit: 'EL', category: T, group: 'Toppings' },
      { name: 'Sesam', amount: 0.5, unit: 'TL', category: T, group: 'Toppings' },
      { name: 'Koriander frisch', amount: 3, unit: 'g', category: G, group: 'Toppings' },
      { name: 'Sprossen frisch', amount: 10, unit: 'g', category: G, group: 'Toppings' },
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
  {
    id: 'pesto-auflauf',
    title: 'Veganer One-Pot-Pesto-Nudelauflauf',
    categories: ['Italienisch', 'Pasta'],
    minutes: 55,
    tint: '#C97B5A',
    description:
      'One-Pot-Nudelauflauf mit Pesto Rosso, Paprika und Kirschtomaten — ungekocht in den Ofen, ganz ohne Vorkochen.',
    ingredients: [
      { name: 'Zwiebel', amount: 0.2, unit: 'Stk', category: G },
      { name: 'Knoblauch', amount: 0.4, unit: 'Zehe', category: G },
      { name: 'Gegrillte Paprika (Glas)', amount: 30, unit: 'g', category: C },
      { name: 'Kirschtomaten', amount: 50, unit: 'g', category: G },
      { name: 'Blattspinat', amount: 20, unit: 'g', category: G },
      { name: 'Rigatoni', amount: 100, unit: 'g', category: T },
      { name: 'Getrocknete Kräuter (italienisch)', amount: 0.2, unit: 'EL', category: W },
      { name: 'Chiliflocken', amount: 0.2, unit: 'TL', category: W },
      { name: 'Sonnenblumenkerne', amount: 20, unit: 'g', category: T },
      { name: 'Veganes Pesto Rosso', amount: 52, unit: 'g', category: S },
      { name: 'Basilikum frisch', amount: 3, unit: 'g', category: G },
    ],
    steps: [
      'Ofen auf 180 °C (Umluft) vorheizen. Zwiebel und Knoblauch fein würfeln, Paprika abtropfen lassen und klein schneiden, Kirschtomaten halbieren, Spinat putzen und klein schneiden.',
      'Ungekochte Rigatoni, Zwiebel, Knoblauch, Paprika, Kirschtomaten, Spinat, Kräuter, Chiliflocken, Sonnenblumenkerne, Salz und Pfeffer in eine Auflaufform geben.',
      'Pesto dazugeben, alles gründlich vermengen, dann Wasser angießen, ohne die Nudeln komplett zu bedecken.',
      'Bei 180 °C (Umluft) ca. 30 Minuten backen, bis die Nudeln al dente sind.',
      'Mit frischem Basilikum bestreut servieren.',
    ],
    alternatives: 'Statt/zusätzlich zur Paprika passen auch Auberginen oder Zucchini gut.',
  },
];

export function findRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}
