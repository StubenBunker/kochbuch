# Rezeptfotos

Fotos hier ablegen (z. B. `dal.jpg`, benannt nach der Rezept-`id` in
`src/data/recipes.ts`) und im jeweiligen Rezept-Objekt eintragen:

```ts
{
  id: 'dal',
  // ...
  photo: require('../../assets/recipes/dal.jpg'),
}
```

Jedes Bild wird in einem festen Rahmen zugeschnitten (nicht gestreckt) — beliebiges
Seitenverhältnis ist ok, am besten aber querformatig/quadratisch und mind. ~800px breit.
Ohne `photo`-Eintrag zeigt die Karte weiterhin den Farbton-Platzhalter.
