# CosmoKaraoke — sito ufficiale

Sito statico in italiano per presentare CosmoKaraoke e consultare la guida utente. È pubblicabile direttamente da GitHub Pages e non richiede un framework o una procedura di compilazione.

## Pagine

- `index.html` — presentazione dell'app, funzioni, schermate reali, link alle release.
- `guida.html` — guida utente consultabile sul sito.
- `assets/` — schermate dell'app e mascotte CosmoNet.

Le schermate sono catture dell'applicazione reale. La guida descrive la versione 0.4.5; dopo nuove release vanno ricontrollate e aggiornate insieme alle note di versione.

## Pubblicazione

In GitHub apri **Settings → Pages**, scegli **Deploy from a branch**, seleziona `main` e la cartella `/(root)`, quindi salva. Il sito viene pubblicato su:

`https://cosmonetinfo.github.io/CosmoKaraoke-Site/`

## Aggiornare il sito

1. Modifica `index.html`, `guida.html` e `styles.css`.
2. Metti in `assets/` solo immagini utilizzabili pubblicamente; evita QR o indirizzi Live attivi della rete locale.
3. Verifica i link e visualizza entrambe le pagine da computer e telefono.
4. Fai commit e push su `main`; GitHub Pages pubblica la versione aggiornata.

## Progetto

- [Repository dell'app](https://github.com/CosmoNetinfo/CosmoKaraoke)
- [Release e download](https://github.com/CosmoNetinfo/CosmoKaraoke/releases/latest)
- [Segnalazione problemi](https://github.com/CosmoNetinfo/CosmoKaraoke/issues)
