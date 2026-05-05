# Pizzeria Zio Armando — Sito Web

Sito web statico per la **Pizzeria Zio Armando** di Zibido San Giacomo (MI).
Realizzato con HTML, CSS e JavaScript puro. Pronto per la pubblicazione su **GitHub Pages**.

---

## Struttura del progetto

```
/
  index.html          Homepage
  menu.html           Pagina menù digitale
  style.css           Tutti gli stili del sito
  script.js           Funzionalità JavaScript
  README.md           Questo file
  /assets
    /images           Foto del locale, della pizza, consegna, ecc.
    /logo             Logo del locale
    /menu             Immagini del menù originale
    /icons            Icone opzionali
```

---

## Come cambiare le immagini

### Logo
Sostituisci il file:
```
assets/logo/logo-zio-armando.png
```
con il logo ufficiale del locale, usando lo **stesso nome file**.
Formato consigliato: PNG trasparente o SVG · Dimensione consigliata: almeno 200×200 px

### Immagine hero (prima schermata homepage)
Sostituisci:
```
assets/images/hero-pizza.jpg
```
con una foto della pizza o del locale.
Dimensione consigliata: **1600 × 900 px** · Formato: `.jpg`

### Foto del locale
Sostituisci:
```
assets/images/locale.jpg
```
con una foto dell'interno o esterno del locale.
Dimensione consigliata: **800 × 600 px** · Formato: `.jpg`

### Foto pizza al trancio
```
assets/images/pizza-trancio.jpg
```
Dimensione consigliata: **800 × 600 px**

### Foto pizza tonda
```
assets/images/pizza-tonda.jpg
```
Dimensione consigliata: **800 × 600 px**

### Foto teglie
```
assets/images/teglie.jpg
```
Dimensione consigliata: **800 × 600 px**

### Foto consegna
```
assets/images/delivery.jpg
```
Foto di una pizza da asporto, scooter o box pizza.
Dimensione consigliata: **800 × 600 px**

### Immagini del menù originale
Sostituisci:
```
assets/menu/menu-pizze.jpg
assets/menu/menu-fritti-bibite.jpg
```
con le foto del menù stampato o delle lavagne del locale.
Dimensione consigliata: **almeno 1200 px di larghezza** · Formato: `.jpg` o `.png`

> **Nota:** Il sito è progettato per funzionare anche senza immagini. Se un file manca, al suo posto viene mostrato un riquadro testuale.

---

## Formati immagine consigliati

| Tipo | Formato | Dimensione |
|------|---------|------------|
| Foto (pizza, locale, consegna) | `.jpg` | 800–1600 px |
| Logo | `.png` trasparente o `.svg` | min 200×200 px |
| Menù originale | `.jpg` o `.png` | min 1200 px larghezza |
| Icone | `.svg` o `.png` trasparente | 64–128 px |

---

## Come aggiornare le informazioni

Apri `index.html` con un editor di testo e cerca i seguenti elementi:

### Numero di telefono
Cerca `tel:+393494928620` e sostituisci con il nuovo numero in tutti i tag `<a>`.

### Link WhatsApp
Cerca `https://wa.me/393494928620` e sostituisci con il numero aggiornato.
Il formato corretto è: `https://wa.me/39XXXXXXXXXX` (senza spazi, senza il +).

### Indirizzo
Cerca `Via Pavese, 12, 20058 Zibido San Giacomo MI` e aggiorna se necessario.

### Link Google Maps
Cerca `google.com/maps/search/Pizzeria+Zio+Armando` e aggiorna con il link diretto al segnaposto corretto.

### Orari di apertura
In `index.html`, modifica il contenuto del blocco `<table class="hours-table">`.
In `script.js`, aggiorna l'oggetto `schedule` con i nuovi orari per il calcolo automatico dello stato "aperto/chiuso".

### Recensioni
Cerca i blocchi `<article class="review-card">` in `index.html` e modifica il testo delle recensioni.
I punteggi (Google, Just Eat) sono nei blocchi `<div class="score-card">`.

### Pagina Facebook
Cerca `facebook.com/pizzeriazioarmando` e sostituisci con il link aggiornato.

### Just Eat, Glovo, Deliveroo
In `index.html` cerca i commenti:
```html
<!-- Replace this with the real Just Eat restaurant URL -->
<!-- Replace this with the real Glovo restaurant URL -->
<!-- Replace this with the real Deliveroo restaurant URL -->
```
e sostituisci il `href="#"` con l'URL corretto di ogni piattaforma.

---

## Come aggiornare il menù digitale

Il menù digitale si trova in `menu.html`. Ogni voce di menù segue questa struttura:

```html
<div class="menu-item" data-name="nome-pizza" data-ingredients="ingrediente1 ingrediente2">
  <span class="menu-item-num">01</span>
  <div class="menu-item-content">
    <div class="menu-item-name">Nome Pizza</div>
    <div class="menu-item-desc">Pomodoro, mozzarella, ingrediente</div>
    <div class="menu-item-formats">
      <span class="format-tag">Al trancio</span>
      <span class="format-tag">Tonda</span>
    </div>
  </div>
  <div class="menu-item-price price-grid" aria-label="Prezzi pizza">
    <div class="price-col">
      <span class="price-col-label">Trancio</span>
      <span class="price-col-val">da confermare</span>
    </div>
    <div class="price-col">
      <span class="price-col-label">1/4 / Classica</span>
      <span class="price-col-val">da confermare</span>
    </div>
    <div class="price-col">
      <span class="price-col-label">Teglia</span>
      <span class="price-col-val">da confermare</span>
    </div>
  </div>
</div>
```

**Per aggiungere una nuova pizza:** copia il blocco sopra, incollalo sotto l'ultimo `<div class="menu-item">` della categoria Pizze, e modifica nome, ingredienti e prezzi.

Per piatti non pizza usa una riga prezzo semplice:

```html
<div class="menu-item-price">
  <div class="price-simple"><span class="price-label">Prezzo:</span> da confermare</div>
</div>
```

Il menù digitale include anche una sezione separata per le birre. Aggiorna la categoria `Birre` in `menu.html` solo con informazioni presenti nel menù originale o confermate dal locale.

**Per rimuovere un piatto:** cancella l'intero blocco `<div class="menu-item">...</div>`.

**Per aggiornare un prezzo:** modifica il valore dentro `.price-col-val` per le pizze, oppure la riga `.price-simple` per gli altri prodotti.

**Attributi `data-name` e `data-ingredients`:** questi valori servono per la ricerca — includici le parole chiave più comuni con cui il cliente potrebbe cercare il piatto.

> **Nota:** I prezzi e gli ingredienti nel menù digitale sono indicativi e vanno verificati e aggiornati dal proprietario prima della pubblicazione.

## Come aggiornare gli allergeni

La sezione `Allergeni` si trova in `menu.html`, vicino al fondo della pagina prima delle immagini del menù originale.

Aggiorna solo le voci della legenda confermate dal menù originale o dal personale. Non associare allergeni ai singoli piatti se l'informazione non è chiaramente disponibile.

---

## Come pubblicare su GitHub Pages

1. Carica tutti i file su un repository GitHub (pubblico o privato con Pages attivo).
2. Vai su **Settings → Pages**.
3. In **Source**, seleziona il branch `main` e la cartella **/ (root)**.
4. Clicca **Save**.
5. Dopo qualche minuto il sito sarà disponibile all'indirizzo:
   `https://tuonome.github.io/nome-repository/`

> **Nota:** Se il sito è in una sottocartella (non alla root del dominio), i percorsi relativi dei file funzionano già correttamente senza modifiche.

---

## Funzionalità incluse

- Navigazione responsive con menu hamburger su mobile
- Barra inferiore mobile con Chiama, WhatsApp, Indicazioni, Menu
- Sezione orari con evidenziazione del giorno corrente e stato aperto/chiuso automatico
- Menù digitale con ricerca per nome/ingrediente e filtri per categoria
- Sezione birre separata nel menù digitale
- Legenda allergeni modificabile
- Immagini con fallback graceful (il layout non si rompe se mancano le immagini)
- Scroll fluido e animazioni hover
- Tasto "torna in cima"
- Layout ottimizzato per mobile, tablet e desktop

---

## Contatti

**Pizzeria Zio Armando**
Via Pavese, 12 · 20058 Zibido San Giacomo MI
Telefono: +39 349 492 8620
Facebook: [Pizzeria Zio Armando](https://www.facebook.com/pizzeriazioarmando/?locale=it_IT)
Instagram: da aggiornare con URL reale
