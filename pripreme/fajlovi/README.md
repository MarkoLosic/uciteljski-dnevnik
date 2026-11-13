# Folder za nastavne materijale (`pripreme/fajlovi/`)

U ovaj direktorijum smještaju se statički fajlovi za preuzimanje:
- **`.docx`** — Word dokumenti dnevnih priprema (koje možete jednim klikom generisati i preuzeti pomoću lokalnog alata `pripreme/admin.html` ili direktno iz modala na `pripreme/index.html`).
- **`.pdf`** — Radni listići za učenike.

### Kako funkcioniše preuzimanje u aplikaciji:
1. **Word (`.docx`) pripreme:** Klikom na dugme **„⬇ Preuzmi Word (.docx)“** u okviru bilo koje pripreme, aplikacija direktno u pregledaču generiše kompletno formatiran `.docx` dokument sa tabelom zaglavlja i razradom časa pomoću `docx` biblioteke.
2. **Radni listići (`.pdf`):** Aplikacija provjerava da li se odgovarajući `.pdf` fajl (naveden u polju `fajlPdf` u `podaci.js`) nalazi u ovom folderu. Ukoliko fajl još nije postavljen, umjesto `404` greške prikazuje se diskretno obavještenje u interfejsu.

