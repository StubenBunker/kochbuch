---
name: add-recipe
description: Add a new recipe (or edit an existing one) in the Kochbuch app's recipe collection. Use this whenever the user wants to add, create, paste, or edit a recipe for the Kochbuch app — e.g. "füge ein Rezept hinzu", "add a recipe for X", pasting a recipe or ingredient list they want in the app, or asking to fix/update an existing recipe's ingredients, steps, or category.
---

# Rezept zum Kochbuch hinzufügen

Kochbuch speichert Rezepte als schlichtes TypeScript-Array in `src/data/recipes.ts`,
typisiert über `src/data/types.ts`. Es gibt keine Datenbank und kein Admin-UI dafür —
ein neues Rezept hinzuzufügen heißt: ein Objekt an das `recipes`-Array anhängen.

## 1. Alle Angaben vom Nutzer einsammeln

Frag nach, was fehlt, statt zu raten. Für ein vollständiges Rezept brauchst du:

- **Titel** (z. B. "Rote-Linsen-Dal")
- **Kategorie** — muss einer der bestehenden Werte sein: `Schnell`, `Asiatisch`,
  `Indisch`, `Bowls`, `Backen`. Passt keine wirklich, sieh Schritt 4.
- **Minuten** (Gesamtzeit, als Zahl)
- **Beschreibung** — ein kurzer, appetitanregender Satz auf Deutsch
- **Zutaten** — jede mit `name`, `amount`, `unit`, `category`. Sieh Abschnitt
  "Zutaten korrekt erfassen" unten, das ist der Teil, bei dem am ehesten was schiefgeht.
- **Zubereitungsschritte** — kurze, direkte Imperativsätze auf Deutsch ("Zwiebel fein
  würfeln, in Öl glasig dünsten."), als Array von Strings.
- **Foto (optional)** — hat der Nutzer eine Bilddatei? Falls ja, sieh
  `assets/recipes/README.md`: Datei nach `assets/recipes/<id>.jpg` legen und
  `photo: require('../../assets/recipes/<id>.jpg')` im Rezept-Objekt setzen. Ohne
  Foto bleibt das Feld einfach weg — die Karte zeigt dann automatisch den
  Tint-Platzhalter.

Wenn der Nutzer ein Rezept einfach als Fließtext einfügt (z. B. aus einer Kochseite
kopiert), extrahiere daraus die Felder selbst und bestätige kurz die Zusammenfassung,
statt jede Zutat einzeln nachzufragen.

## 2. Zutaten korrekt erfassen

Das ist der Teil mit den meisten unsichtbaren Fallstricken:

- **`amount` ist immer PRO PORTION.** Die App skaliert live mit der Portionenzahl
  (siehe `src/utils/shopping.ts` und `app/recipe/[id].tsx`). Wenn ein Rezept "für 2
  Portionen: 200g Reis" angibt, trägst du `amount: 100` ein (200 ÷ 2), nicht 200.
  Frag im Zweifel nach, für wie viele Portionen die Original-Mengenangabe gilt.
- **`category` ist eine von genau fünf Einkaufslisten-Kategorien**, keine freie
  Beschreibung: `Obst & Gemüse`, `Trockenwaren`, `Tiefkühl`, `Gewürze`, `Sonstiges`.
  Diese Kategorie steuert die Gruppierung auf dem Einkaufsliste-Screen — es gibt
  keinen automatischen Fallback, jede Zutat muss eine davon bekommen. Als Faustregel:
  - frisches Gemüse/Obst/Kräuter → `Obst & Gemüse`
  - Nudeln, Reis, Hülsenfrüchte, Mehl, Konserven mit langer Haltbarkeit → `Trockenwaren`
  - alles aus dem Gefrierfach → `Tiefkühl`
  - Gewürze/getrocknete Kräuter → `Gewürze`
  - Saucen, Pasten, Öle, Tofu, alles andere → `Sonstiges`
  - Am Dateianfang von `recipes.ts` gibt es die Kurz-Konstanten `G`/`T`/`K`/`W`/`S`
    für genau diese fünf — nutze sie, das ist der bestehende Stil.
- **`unit`** ist ein freier String, aber halte dich an die im Projekt schon verwendeten
  Einheiten für Konsistenz: `g`, `ml`, `Stk`, `TL`, `EL`, `Zehe`.

## 3. Tint-Farbe wählen

Es gibt noch keine echten Fotos — jede Karte zeigt stattdessen einen flächigen
Farbton (`tint`) mit Schraffur als Platzhalter. Die bestehende Palette ist warm und
erdig:

```
#E8C79A #D9A98C #C9B98F #DBC08B #D08F76 #C4B27E #E0A97A #B9AE84 #C79E86
```

Nimm für ein neues Rezept einen Ton, der zur Palette passt und sich von den
zuletzt vergebenen unterscheidet (schau in `recipes.ts`, welche Tints die
Nachbar-Rezepte schon haben). Du darfst die Palette behutsam erweitern — bleib aber
in der gleichen gedeckten, warmen Sättigung/Helligkeit, ein grelles oder kaltes Blau
würde aus dem Rahmen fallen.

## 4. Neue Kategorie? Nur wenn wirklich nötig

Die fünf Rezept-Kategorien (`Schnell`, `Asiatisch`, `Indisch`, `Bowls`, `Backen`)
erzeugen direkt die Filter-Chips auf dem Rezepte-Screen. Bevor du eine neue
hinzufügst, prüf, ob eine bestehende wirklich nicht passt — mehr Kategorien heißt
mehr Chips in einer Reihe, die schon auf dem Handy an der Kante beschnitten wird.
Falls doch nötig, an zwei Stellen ergänzen (beide müssen übereinstimmen):

1. `RecipeCategory`-Union in `src/data/types.ts`
2. `RECIPE_CATEGORIES`-Array in `src/data/recipes.ts`

## 5. Ins Array eintragen

Häng ein neues Objekt an das `recipes`-Array in `src/data/recipes.ts` an, nach dem
Muster der bestehenden Einträge. `id` ist ein eindeutiger kebab-case-Slug (z. B.
`schoko-bananenbrot`) — kurz, aus dem Titel abgeleitet, kollidiert mit keiner
bestehenden `id`.

## 6. Prüfen

Nach dem Editieren:

```bash
cd "/Users/noah/Documents/Claude code/kochbuch" && npx tsc --noEmit
```

Das fängt so gut wie jeden Fehler ab, den man beim Abtippen macht — falsche
Kategorie, vergessenes Feld, Tippfehler in einem Union-Typ. Bei Fehlern die
betroffene Zeile fixen und erneut prüfen, bevor du fertig meldest.

## 7. Veröffentlichen

Ein `git push` auf `main` im Repo `StubenBunker/kochbuch` löst automatisch ein
Deployment über GitHub Actions aus (siehe `.github/workflows/deploy.yml`) — die
Web-App unter https://stubenbunker.github.io/kochbuch/ aktualisiert sich von selbst,
kein manueller Schritt nötig. Frag den Nutzer, ob du committen und pushen sollst,
statt es automatisch zu tun (Push in ein öffentliches Repo ist eine Aktion, die
Bestätigung braucht).
