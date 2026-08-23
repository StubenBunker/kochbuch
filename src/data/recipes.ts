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
  'Bowls',
  'Backen',
] as const;

export const recipes: Recipe[] = [
  {
    id: 'dal',
    title: 'Rote-Linsen-Dal',
    category: 'Indisch',
    minutes: 30,
    tint: '#E8C79A',
    description:
      'Cremiges Dal mit Kokosmilch, Ingwer und geröstetem Kreuzkümmel. Wird beim Stehen nur besser.',
    ingredients: [
      { name: 'Rote Linsen', amount: 80, unit: 'g', category: T },
      { name: 'Kokosmilch', amount: 100, unit: 'ml', category: S },
      { name: 'Zwiebel', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Ingwer', amount: 8, unit: 'g', category: G },
      { name: 'Tomaten', amount: 100, unit: 'g', category: G },
      { name: 'Kurkuma', amount: 0.5, unit: 'TL', category: W },
      { name: 'Kreuzkümmel', amount: 0.5, unit: 'TL', category: W },
      { name: 'Koriander frisch', amount: 5, unit: 'g', category: G },
    ],
    steps: [
      'Zwiebel und Ingwer fein würfeln, in Öl glasig dünsten.',
      'Kreuzkümmel und Kurkuma 30 Sekunden mitrösten, bis es duftet.',
      'Linsen, Tomaten und Kokosmilch zugeben, mit Wasser auffüllen und 20 Minuten köcheln.',
      'Mit Salz abschmecken und mit frischem Koriander servieren.',
    ],
  },
  {
    id: 'ramen',
    title: 'Erdnuss-Ramen',
    category: 'Asiatisch',
    minutes: 25,
    tint: '#D9A98C',
    description: 'Tiefe Brühe aus Erdnussmus, Miso und Limette – in 25 Minuten fertig.',
    ingredients: [
      { name: 'Ramen-Nudeln', amount: 90, unit: 'g', category: T },
      { name: 'Erdnussmus', amount: 30, unit: 'g', category: T },
      { name: 'Misopaste', amount: 15, unit: 'g', category: S },
      { name: 'Pak Choi', amount: 80, unit: 'g', category: G },
      { name: 'Frühlingszwiebel', amount: 1, unit: 'Stk', category: G },
      { name: 'Limette', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Edamame TK', amount: 60, unit: 'g', category: K },
      { name: 'Chiliflocken', amount: 0.25, unit: 'TL', category: W },
    ],
    steps: [
      'Erdnussmus und Miso mit heißer Gemüsebrühe glattrühren.',
      'Edamame und Pak Choi 4 Minuten in der Brühe garen.',
      'Nudeln separat kochen und in die Schalen verteilen.',
      'Brühe aufgießen, mit Frühlingszwiebel, Chili und Limette toppen.',
    ],
  },
  {
    id: 'bowl',
    title: 'Ofengemüse-Bowl',
    category: 'Bowls',
    minutes: 40,
    tint: '#C9B98F',
    description: 'Geröstetes Wurzelgemüse, Hirse und Tahin-Dressing. Meal-Prep-tauglich.',
    ingredients: [
      { name: 'Süßkartoffel', amount: 150, unit: 'g', category: G },
      { name: 'Rote Beete', amount: 80, unit: 'g', category: G },
      { name: 'Hirse', amount: 60, unit: 'g', category: T },
      { name: 'Tahin', amount: 20, unit: 'g', category: T },
      { name: 'Zitrone', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Rucola', amount: 30, unit: 'g', category: G },
      { name: 'Kichererbsen', amount: 80, unit: 'g', category: T },
      { name: 'Paprikapulver', amount: 0.5, unit: 'TL', category: W },
    ],
    steps: [
      'Gemüse in Spalten schneiden, mit Öl und Paprikapulver mischen.',
      'Bei 200 °C 30 Minuten rösten, Kichererbsen die letzten 15 Minuten dazu.',
      'Hirse nach Packung garen. Tahin mit Zitrone und Wasser cremig rühren.',
      'Alles schichten, Dressing darüber, Rucola obenauf.',
    ],
  },
  {
    id: 'curry',
    title: 'Kichererbsen-Curry',
    category: 'Indisch',
    minutes: 35,
    tint: '#DBC08B',
    description:
      'Sattes Curry mit Spinat und Garam Masala. Funktioniert mit allem, was im Kühlschrank liegt.',
    ingredients: [
      { name: 'Kichererbsen', amount: 120, unit: 'g', category: T },
      { name: 'Kokosmilch', amount: 120, unit: 'ml', category: S },
      { name: 'Blattspinat TK', amount: 80, unit: 'g', category: K },
      { name: 'Zwiebel', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Knoblauch', amount: 1, unit: 'Zehe', category: G },
      { name: 'Garam Masala', amount: 1, unit: 'TL', category: W },
      { name: 'Tomatenmark', amount: 15, unit: 'g', category: S },
      { name: 'Reis', amount: 70, unit: 'g', category: T },
    ],
    steps: [
      'Zwiebel und Knoblauch anbraten, Tomatenmark kurz mitrösten.',
      'Garam Masala zugeben, mit Kokosmilch ablöschen.',
      'Kichererbsen 15 Minuten einköcheln, Spinat zum Schluss unterheben.',
      'Mit Reis servieren, mit Salz und Limette abschmecken.',
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta Arrabbiata',
    category: 'Schnell',
    minutes: 20,
    tint: '#D08F76',
    description: 'Scharf, schnell, immer richtig. Fünf Zutaten plus Salz.',
    ingredients: [
      { name: 'Spaghetti', amount: 110, unit: 'g', category: T },
      { name: 'Passierte Tomaten', amount: 200, unit: 'g', category: S },
      { name: 'Knoblauch', amount: 2, unit: 'Zehe', category: G },
      { name: 'Chilischote', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Petersilie', amount: 5, unit: 'g', category: G },
      { name: 'Olivenöl', amount: 1, unit: 'EL', category: S },
    ],
    steps: [
      'Nudeln in reichlich Salzwasser al dente kochen.',
      'Knoblauch und Chili in Olivenöl langsam goldgelb ziehen lassen.',
      'Tomaten zugeben, 10 Minuten offen einkochen.',
      'Nudeln mit etwas Kochwasser in die Sauce schwenken, Petersilie darüber.',
    ],
  },
  {
    id: 'banhmi',
    title: 'Tofu-Bánh-mì',
    category: 'Asiatisch',
    minutes: 30,
    tint: '#C4B27E',
    description: 'Marinierter Tofu, schnell eingelegte Möhre und viel Koriander im Baguette.',
    ingredients: [
      { name: 'Räuchertofu', amount: 100, unit: 'g', category: S },
      { name: 'Baguette', amount: 0.5, unit: 'Stk', category: T },
      { name: 'Möhre', amount: 60, unit: 'g', category: G },
      { name: 'Gurke', amount: 50, unit: 'g', category: G },
      { name: 'Reisessig', amount: 1, unit: 'EL', category: S },
      { name: 'Sojasauce', amount: 1, unit: 'EL', category: S },
      { name: 'Koriander frisch', amount: 5, unit: 'g', category: G },
      { name: 'Vegane Mayo', amount: 20, unit: 'g', category: S },
    ],
    steps: [
      'Möhre fein hobeln, mit Reisessig, Zucker und Salz 15 Minuten ziehen lassen.',
      'Tofu in Scheiben mit Sojasauce knusprig braten.',
      'Baguette aufschneiden, mit Mayo bestreichen.',
      'Tofu, Gemüse und Koriander einschichten.',
    ],
  },
  {
    id: 'suppe',
    title: 'Kürbis-Kokos-Suppe',
    category: 'Schnell',
    minutes: 25,
    tint: '#E0A97A',
    description: 'Samtig, mit Ingwer und geröstetem Kürbiskernöl.',
    ingredients: [
      { name: 'Hokkaido', amount: 250, unit: 'g', category: G },
      { name: 'Kokosmilch', amount: 80, unit: 'ml', category: S },
      { name: 'Ingwer', amount: 6, unit: 'g', category: G },
      { name: 'Zwiebel', amount: 0.5, unit: 'Stk', category: G },
      { name: 'Gemüsebrühe', amount: 200, unit: 'ml', category: S },
      { name: 'Kürbiskerne', amount: 10, unit: 'g', category: T },
      { name: 'Muskat', amount: 0.25, unit: 'TL', category: W },
    ],
    steps: [
      'Kürbis würfeln (Schale bleibt dran), Zwiebel und Ingwer andünsten.',
      'Alles mit Brühe 15 Minuten weich kochen.',
      'Kokosmilch zugeben und fein pürieren.',
      'Mit Muskat abschmecken, mit gerösteten Kernen servieren.',
    ],
  },
  {
    id: 'falafel',
    title: 'Falafel-Teller',
    category: 'Schnell',
    minutes: 45,
    tint: '#B9AE84',
    description: 'Ofen-Falafel mit Kräuterkern, dazu Hummus und Tomatensalat.',
    ingredients: [
      { name: 'Kichererbsen getrocknet', amount: 90, unit: 'g', category: T },
      { name: 'Petersilie', amount: 15, unit: 'g', category: G },
      { name: 'Knoblauch', amount: 1, unit: 'Zehe', category: G },
      { name: 'Kreuzkümmel', amount: 0.5, unit: 'TL', category: W },
      { name: 'Hummus', amount: 50, unit: 'g', category: S },
      { name: 'Tomaten', amount: 80, unit: 'g', category: G },
      { name: 'Fladenbrot', amount: 0.5, unit: 'Stk', category: T },
    ],
    steps: [
      'Über Nacht eingeweichte Kichererbsen mit Kräutern und Gewürzen grob mixen.',
      'Bällchen formen, 25 Minuten bei 200 °C backen, einmal wenden.',
      'Tomaten würfeln, mit Salz und Olivenöl marinieren.',
      'Mit Hummus und warmem Fladenbrot anrichten.',
    ],
  },
  {
    id: 'brot',
    title: 'Schoko-Bananenbrot',
    category: 'Backen',
    minutes: 60,
    tint: '#C79E86',
    description: 'Sehr saftig, ohne Ei – reife Bananen machen die Arbeit.',
    ingredients: [
      { name: 'Bananen reif', amount: 1, unit: 'Stk', category: G },
      { name: 'Mehl', amount: 60, unit: 'g', category: T },
      { name: 'Haferflocken', amount: 20, unit: 'g', category: T },
      { name: 'Zartbitterschokolade', amount: 20, unit: 'g', category: T },
      { name: 'Pflanzendrink', amount: 30, unit: 'ml', category: S },
      { name: 'Backpulver', amount: 0.5, unit: 'TL', category: T },
      { name: 'Zimt', amount: 0.25, unit: 'TL', category: W },
      { name: 'Rohrzucker', amount: 20, unit: 'g', category: T },
    ],
    steps: [
      'Bananen zerdrücken, mit Pflanzendrink und Zucker verrühren.',
      'Trockene Zutaten unterheben, Schokolade grob hacken und zugeben.',
      'In eine Kastenform füllen, 45 Minuten bei 180 °C backen.',
      'Vollständig auskühlen lassen – dann erst schneiden.',
    ],
  },
];

export function findRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}
