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
- **Kategorien (eine oder mehrere)** — ein Rezept kann zu mehreren Rezept-Kategorien
  gehören (`categories: string[]`), z. B. ist "Pasta Arrabbiata" sowohl `Italienisch`
  als auch `Pasta` und `Schnell`. Muss einer oder mehrere der bestehenden Werte sein:
  `Schnell`, `Asiatisch`, `Indisch`, `Italienisch`, `Pasta`, `Mexikanisch`,
  `Suppen & Eintopf`, `Bowls`, `Street Food`, `Backwaren & Dessert`. Nimm ruhig
  mehrere, wenn es wirklich passt — aber nicht künstlich aufblähen, nur setzen was
  tatsächlich zutrifft. Passt keine wirklich, sieh Schritt 4.
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
- **Alternativen (optional)** — nur fragen/setzen, wenn es einen sinnvollen
  Ersatz-Tipp gibt (z. B. "Statt Tofu geht auch Seitan oder Kichererbsen"). Als
  `alternatives: '...'`-Feld (ein Satz, String) im Rezept-Objekt. Die meisten
  Rezepte brauchen das nicht — nicht erfinden, nur setzen wenn der Nutzer eine
  echte Alternative nennt oder explizit danach fragt.

Wenn der Nutzer ein Rezept einfach als Fließtext einfügt (z. B. aus einer Kochseite
kopiert), extrahiere daraus die Felder selbst und bestätige kurz die Zusammenfassung,
statt jede Zutat einzeln nachzufragen.

## 2. Zutaten korrekt erfassen

Das ist der Teil mit den meisten unsichtbaren Fallstricken:

- **`amount` ist immer PRO PORTION.** Die App skaliert live mit der Portionenzahl
  (siehe `src/utils/shopping.ts` und `app/recipe/[id].tsx`). Wenn ein Rezept "für 2
  Portionen: 200g Reis" angibt, trägst du `amount: 100` ein (200 ÷ 2), nicht 200.
  Frag im Zweifel nach, für wie viele Portionen die Original-Mengenangabe gilt.
- **`category` ist eine von genau sieben Einkaufslisten-Kategorien**, keine freie
  Beschreibung: `Obst & Gemüse`, `Konserven`, `Trockenwaren`, `Tiefkühl`, `Gewürze`,
  `Drogerie`, `Sonstiges`. Diese Kategorie steuert die Gruppierung auf dem
  Einkaufsliste-Screen — es gibt keinen automatischen Fallback, jede Zutat muss eine
  davon bekommen. Als Faustregel:
  - frisches Gemüse/Obst/Kräuter → `Obst & Gemüse`
  - Dosen, Gläser, Eingemachtes (Tomaten, Bohnen, Mais, Kokosmilch in der Dose …) → `Konserven`
  - Nudeln, Reis, Hülsenfrüchte trocken, Mehl, Backzutaten → `Trockenwaren`
  - alles aus dem Gefrierfach → `Tiefkühl`
  - Gewürze/getrocknete Kräuter → `Gewürze`
  - Non-Food: Küchenrolle, Spülmittel, Alufolie o.Ä. (kommt meist nur bei manuell
    hinzugefügten Artikeln vor, selten bei Rezept-Zutaten) → `Drogerie`
  - Saucen, Pasten, Öle, Tofu, alles andere → `Sonstiges`
  - Am Dateianfang von `recipes.ts` gibt es die Kurz-Konstanten `G`/`C`/`T`/`K`/`W`/`D`/`S`
    für genau diese sieben — nutze sie, das ist der bestehende Stil.
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

Die zehn Rezept-Kategorien (`Schnell`, `Asiatisch`, `Indisch`, `Italienisch`, `Pasta`,
`Mexikanisch`, `Suppen & Eintopf`, `Bowls`, `Street Food`, `Backwaren & Dessert`)
erzeugen direkt die Filter-Chips auf dem Rezepte-Screen, in dieser Reihenfolge. Bevor
du eine neue hinzufügst, prüf, ob eine bestehende wirklich nicht passt — dank
Mehrfachkategorien reicht das oft schon aus (z. B. `Suppen & Eintopf` + `Asiatisch`
statt einer neuen "Ramen"-Kategorie). Falls doch nötig, an zwei Stellen ergänzen
(beide müssen übereinstimmen), und häng die neue Kategorie sinnvoll einsortiert ein,
nicht einfach hinten dran:

1. `RecipeCategory`-Union in `src/data/types.ts`
2. `RECIPE_CATEGORIES`-Array in `src/data/recipes.ts`

## 5. Ins Array eintragen

Häng ein neues Objekt an das `recipes`-Array in `src/data/recipes.ts` an, nach dem
Muster der bestehenden Einträge. `id` ist ein eindeutiger kebab-case-Slug (z. B.
`schoko-bananenbrot`) — kurz, aus dem Titel abgeleitet, kollidiert mit keiner
bestehenden `id`.

## 6. Bild-Prompt ausgeben

Es gibt noch keine Food-Fotografie-KI-Anbindung — stattdessen bekommt der Nutzer
nach jedem hinzugefügten Rezept einen fertigen Prompt zum Selbst-Einfügen in ein
Bildgenerierungs-Tool (z. B. ChatGPT/GPT Image, Midjourney, Gemini). Gib ihn **immer**
aus, direkt im Chat, mit dem Rezept ausgefüllt:

```
Professional food photography of [GERICHT], plated on a Motel a Miio "Areia"
large plate in [TELLERFARBE] — handmade stoneware with a glossy, mottled
reactive glaze radiating from the rim, cream-white base. Visible ingredients:
[ZUTATENLISTE, kommagetrennt]. Shot from a 45-degree angle, soft natural window
light from the left, shallow depth of field. Composition: the plate centered
exactly in the middle of the frame, occupying no more than half of the frame
width, with generous, even empty space on all four sides — the plate must
stay well clear of every edge, since the app crops this image tighter on
some screens. Background: plain, seamless, neutral matte off-white surface,
completely empty and softly out of focus — no props, no napkin, no cutlery,
no table texture, no other objects, nothing in frame besides the plate
itself, so the food is the sole focus. Minimal styling, no text, no
watermark, no hands, clean and appetizing aesthetic, shot on a 50mm lens,
high detail, editorial food magazine style.
```

`[GERICHT]` ist der Rezepttitel auf Englisch beschrieben, `[ZUTATENLISTE]` die
Haupt-Zutaten (nicht jede Kleinigkeit wie Salz/Gewürze, sondern die visuell
erkennbaren) auf Englisch, kommagetrennt. `[TELLERFARBE]` ist **nicht immer
Pink** — die Areia-Kollektion gibt es u. a. in `pink`, `sand`, `azure`,
`mint`, `gray`, `black`, `white`, `rosé`; wähl pro Rezept die Farbe, die am
meisten Kontrast zum Gericht gibt (z. B. hellere Töne wie sand/white/gray zu
farbintensiven, dunklen Gerichten, dunklere/kräftigere Töne wie black/azure
zu eher blassen, hellen Gerichten), damit das Essen auf dem Foto nicht mit
dem Teller verschwimmt. Falls das Bildgenerierungs-Tool ein Seitenverhältnis
einstellen lässt, empfiehl **4:3 (landschaft)** oder **1:1** — beides liegt
näher an den Zielrahmen der App (Karte ca. 1.4:1, Hero-Bild ca. 1.4:1) als
ein sehr breites Kinoformat und braucht dadurch weniger Zuschnitt. Sobald
der Nutzer ein fertiges Bild hat, sieh Schritt 1 „Foto (optional)" oben, um
es einzubinden.

## 7. Prüfen

Nach dem Editieren:

```bash
cd "/Users/noah/Documents/Claude code/kochbuch" && npx tsc --noEmit
```

Das fängt so gut wie jeden Fehler ab, den man beim Abtippen macht — falsche
Kategorie, vergessenes Feld, Tippfehler in einem Union-Typ. Bei Fehlern die
betroffene Zeile fixen und erneut prüfen, bevor du fertig meldest.

## 8. Veröffentlichen

Ein `git push` auf `main` im Repo `StubenBunker/kochbuch` löst automatisch ein
Deployment über GitHub Actions aus (siehe `.github/workflows/deploy.yml`) — die
Web-App unter https://stubenbunker.github.io/kochbuch/ aktualisiert sich von selbst,
kein manueller Schritt nötig. Der Nutzer hat explizit gesagt, dass direkt gepusht
werden darf, ohne vorher zu fragen — also committen und pushen, sobald `tsc` sauber
durchläuft.
