---
title: "Gotovi promptovi za pripremu sata u razrednoj nastavi"
date: "2026-10-30"
excerpt: "Osam promptova koje možete kopirati i prilagoditi: plan sata, zadaci na tri razine, tekst za čitanje, pitanja, igre i poruka roditeljima, uz provjeru rezultata."
category: "AI alati u nastavi"
---

## Uvod

Razlika između beskorisnog i korisnog odgovora AI alata najčešće nije u alatu, nego u upitu. „Napravi mi sat iz matematike" daje općenit tekst koji ne odgovara ni razredu ni djeci. Upit koji kaže tko su učenici, što trebaju naučiti i u kojem obliku vam treba rezultat daje nešto što se može odmah koristiti.

Ovdje je osam promptova za najčešće zadatke u razrednoj nastavi. Kopirajte ih, zamijenite dijelove u uglatim zagradama i prilagodite svom razredu. Svi su napisani tako da **ne traže nikakve podatke o konkretnoj djeci** (više o tome u tekstu [Što nikad ne upisati u ChatGPT o učenicima](/hr/blog/sta-ne-upisivati-u-chatgpt-o-ucenicima)).

## Kako izgleda dobar prompt

Dobar upit ima pet dijelova:

1. **Uloga.** Kome se obraćate: „Ti si iskusan učitelj razredne nastave."
2. **Kontekst.** Razred, predmet, tema, broj učenika, vrijeme.
3. **Cilj.** Što djeca trebaju znati ili moći nakon sata.
4. **Ograničenja.** Jezik, duljina, razina težine, materijali koje imate.
5. **Format.** Tablica, popis, tekst za ispis, broj primjera.

Ako nešto od toga izostavite, AI će praznine popuniti nagađanjem.

## 1. Plan sata

```text
Ti si iskusan učitelj razredne nastave. Napravi plan sata od 45 minuta za
[razred] razred, predmet [predmet], tema „[tema]".
Cilj: nakon sata učenici trebaju [konkretan ishod].
Podijeli sat na uvodni (5 min), glavni (30 min) i završni dio (10 min).
U glavnom dijelu predvidi barem jednu aktivnost s kretanjem ili u paru.
Navedi potreban materijal. Piši na hrvatskom standardnom jeziku.
```

## 2. Zadaci na tri razine težine

```text
Napravi po pet zadataka iz područja „[područje]" za [razred] razred, na tri
razine: osnovna, srednja i napredna. Zadaci na istoj razini trebaju biti
različiti po obliku (računanje, tekstualni zadatak, nadopunjavanje).
Na kraju daj rješenja odvojeno, da ih mogu izrezati prije ispisa.
```

## 3. Kratak tekst za čitanje

```text
Napiši kratku priču od oko [broj] riječi za učenike [razred] razreda koji
tek uče čitati. Koristi kratke rečenice i poznate riječi. Tema: [tema].
Glavni lik je [životinja ili predmet]. Ne koristi imena stvarnih osoba.
Na kraju dodaj tri pitanja za razumijevanje pročitanog.
```

## 4. Pitanja za razgovor o pročitanom

```text
Za priču „[naslov]" napravi pitanja za razgovor s učenicima [razred]
razreda, u tri skupine: pitanja o činjenicama iz teksta, pitanja o
osjećajima likova i pitanja „što bi ti učinio". Po četiri pitanja u skupini.
```

## 5. Igra za ponavljanje gradiva

```text
Predloži tri igre za ponavljanje gradiva „[tema]" u [razred] razredu.
Igre trebaju trajati 10 minuta, u njima treba sudjelovati cijeli razred
i ne smiju tražiti poseban materijal osim ploče, krede i papira. Za svaku
igru napiši pravila u pet koraka i kako prilagoditi igru slabijim učenicima.
```

## 6. Poruka roditeljima

```text
Napiši kratku i ljubaznu obavijest roditeljima učenika [razred] razreda
o [događaj: izlet, roditeljski sastanak, projekt]. Uključi datum, vrijeme
i što djeca trebaju ponijeti. Ton: topao i jasan, bez birokratskog
jezika. Najviše 120 riječi.
```

## 7. Opisna povratna informacija

```text
Napiši pet primjera opisne povratne informacije za rad učenika [razred]
razreda na zadatku „[zadatak]". Svaki primjer treba imati: što je dobro
napravljeno, što treba popraviti i jedan konkretan sljedeći korak. Ton je
podržavajući. Ne izmišljaj ocjene.
```

Ovo su primjeri formulacija, ne gotove ocjene. Konkretnu povratnu informaciju za svako dijete pišete sami, na temelju onoga što ste vidjeli.

## 8. Neka AI provjeri sam sebe

Ovaj prompt dolazi ravno iz testiranja softvera: rezultat se ne prihvaća dok ga netko ne provjeri. Nakon bilo kojeg odgovora pošaljite:

```text
Pregledaj ono što si napisao kao strog recenzent. Navedi: moguće
činjenične pogreške, zadatke čije rješenje nije jednoznačno, riječi koje su
preteške za [razred] razred i mjesta gdje nisi poštovao moja ograničenja.
```

Ni ovom odgovoru ne vjerujte napamet, ali često otkrije stvari koje bi vam promakle.

## Provjerite prije nego što ispišete

AI alati pišu uvjerljivo i kad griješe. Prije nego što išta stigne do djece:

- **Riješite sve zadatke sami.** Računske pogreške i zadaci bez rješenja nisu rijetkost.
- **Provjerite činjenice.** Datume, imena, prirodne pojave, zemljopis.
- **Provjerite jezik.** AI lako miješa hrvatske, srpske i bosanske riječi, ijekavicu i ekavicu.
- **Pročitajte očima djeteta.** Bi li prvašić razumio svaku riječ?
- **Uskladite s planom.** Vodi li zadatak zaista prema ishodu iz vašeg kurikuluma?

## Zaključak

Promptovi nisu čarobne formule. To su dobro postavljena pitanja. Što jasnije kažete što vam treba, to manje vremena trošite na ispravljanje.

Najbolji rezultat dobivate kad AI shvatite kao asistenta koji izrađuje prvi nacrt, a vi ostajete onaj koji poznaje djecu, provjerava i odlučuje.
