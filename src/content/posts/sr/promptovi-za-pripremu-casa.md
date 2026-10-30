---
title: "Gotovi promptovi za pripremu časa u razrednoj nastavi"
date: "2026-10-30"
excerpt: "Osam promptova koje možete kopirati i prilagoditi: plan časa, zadaci na tri nivoa, tekst za čitanje, pitanja, igre i poruka roditeljima, uz proveru rezultata."
category: "AI alati u nastavi"
---

## Uvod

Razlika između beskorisnog i korisnog odgovora AI alata najčešće nije u alatu, nego u zahtevu. „Napravi mi čas iz matematike" daje opšti tekst koji ne odgovara ni razredu ni deci. Zahtev koji kaže ko su učenici, šta treba da nauče i u kom obliku vam treba rezultat daje nešto što se može odmah koristiti.

Ovde je osam promptova za najčešće zadatke u razrednoj nastavi. Kopirajte ih, zamenite delove u uglastim zagradama i prilagodite svom odeljenju. Svi su napisani tako da **ne zahtevaju nikakve podatke o konkretnoj deci** (više o tome u tekstu [Šta nikad ne upisati u ChatGPT o učenicima](/blog/sta-ne-upisivati-u-chatgpt-o-ucenicima)).

## Kako izgleda dobar prompt

Dobar zahtev ima pet delova:

1. **Uloga.** Kome se obraćate: „Ti si iskusan učitelj razredne nastave."
2. **Kontekst.** Razred, predmet, tema, broj učenika, vreme.
3. **Cilj.** Šta deca treba da znaju ili umeju posle časa.
4. **Ograničenja.** Jezik i pismo, dužina, nivo težine, materijali koje imate.
5. **Format.** Tabela, lista, tekst za štampu, broj primera.

Ako nešto od toga izostavi, AI će praznine popuniti nagađanjem.

## 1. Plan časa

```text
Ti si iskusan učitelj razredne nastave. Napravi plan časa od 45 minuta za
[razred] razred, predmet [predmet], tema „[tema]".
Cilj: posle časa učenici treba da [konkretan ishod].
Podeli čas na uvodni (5 min), glavni (30 min) i završni deo (10 min).
U glavnom delu predvidi bar jednu aktivnost s pokretom ili u paru.
Navedi potreban materijal. Piši na srpskom jeziku, ekavicom, latinicom.
```

## 2. Zadaci na tri nivoa težine

```text
Napravi po pet zadataka iz oblasti „[oblast]" za [razred] razred, na tri
nivoa: osnovni, srednji i napredni. Zadaci na istom nivou treba da budu
različiti po obliku (računanje, tekstualni zadatak, dopunjavanje).
Na kraju daj rešenja odvojeno, da ih mogu iseći pre štampe.
```

## 3. Kratak tekst za čitanje

```text
Napiši kratku priču od oko [broj] reči za učenike [razred] razreda koji
tek uče da čitaju. Koristi kratke rečenice i poznate reči. Tema: [tema].
Glavni lik je [životinja ili predmet]. Ne koristi imena stvarnih osoba.
Na kraju dodaj tri pitanja za razumevanje pročitanog.
```

## 4. Pitanja za razgovor o pročitanom

```text
Za priču „[naslov]" napravi pitanja za razgovor s učenicima [razred]
razreda, u tri grupe: pitanja o činjenicama iz teksta, pitanja o
osećanjima likova i pitanja „šta bi ti uradio". Po četiri pitanja u grupi.
```

## 5. Igra za ponavljanje gradiva

```text
Predloži tri igre za ponavljanje gradiva „[tema]" u [razred] razredu.
Igre treba da traju 10 minuta, da u njima učestvuje celo odeljenje i da
ne zahtevaju poseban materijal osim table, krede i papira. Za svaku igru
napiši pravila u pet koraka i kako da prilagodim igru za slabije učenike.
```

## 6. Poruka roditeljima

```text
Napiši kratko i ljubazno obaveštenje roditeljima učenika [razred] razreda
o [događaj: ekskurzija, roditeljski sastanak, projekat]. Uključi datum,
vreme i šta deca treba da ponesu. Ton: topao i jasan, bez birokratskog
jezika. Najviše 120 reči.
```

## 7. Opisna povratna informacija

```text
Napiši pet primera opisne povratne informacije za rad učenika [razred]
razreda na zadatku „[zadatak]". Svaki primer treba da ima: šta je dobro
urađeno, šta treba popraviti i jedan konkretan sledeći korak. Ton je
podržavajući. Ne izmišljaj ocene.
```

Ovo su primeri formulacija, ne gotove ocene. Konkretnu povratnu informaciju za svako dete pišete sami, na osnovu onoga što ste videli.

## 8. Neka AI proveri sam sebe

Ovaj prompt dolazi pravo iz testiranja softvera: rezultat se ne prihvata dok ga neko ne proveri. Posle bilo kog odgovora pošaljite:

```text
Pregledaj ono što si napisao kao strog recenzent. Navedi: moguće
činjenične greške, zadatke čije rešenje nije jednoznačno, reči koje su
preteške za [razred] razred i mesta gde nisi poštovao moja ograničenja.
```

Ne verujte ni ovom odgovoru napamet, ali često otkrije stvari koje bi vam promakle.

## Proverite pre nego što odštampate

AI alati pišu uverljivo i kada greše. Pre nego što bilo šta stigne do dece:

- **Rešite sve zadatke sami.** Računske greške i zadaci bez rešenja nisu retkost.
- **Proverite činjenice.** Datume, imena, prirodne pojave, geografiju.
- **Proverite jezik.** AI lako meša ekavicu i ijekavicu, latinicu i ćirilicu, srpske, hrvatske i bosanske reči.
- **Pročitajte očima deteta.** Da li bi prvak razumeo svaku reč?
- **Uskladite s planom.** Da li zadatak zaista vodi ka ishodu koji je u vašem planu?

## Zaključak

Promptovi nisu čarobne formule. To su dobro postavljena pitanja. Što jasnije kažete šta vam treba, to manje vremena trošite na ispravljanje.

Najbolji rezultat dobijate kada AI shvatite kao asistenta koji pravi prvi nacrt, a vi ostajete onaj koji poznaje decu, proverava i odlučuje.
