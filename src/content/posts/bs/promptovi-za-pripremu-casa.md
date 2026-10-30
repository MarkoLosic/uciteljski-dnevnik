---
title: "Gotovi promptovi za pripremu časa u razrednoj nastavi"
date: "2026-10-30"
excerpt: "Osam promptova koje možete kopirati i prilagoditi: plan časa, zadaci na tri nivoa, tekst za čitanje, pitanja, igre i poruka roditeljima, uz provjeru rezultata."
category: "AI alati u nastavi"
---

## Uvod

Razlika između beskorisnog i korisnog odgovora AI alata najčešće nije u alatu, nego u zahtjevu. „Napravi mi čas iz matematike" daje opći tekst koji ne odgovara ni razredu ni djeci. Zahtjev koji kaže ko su učenici, šta trebaju naučiti i u kojem obliku vam treba rezultat daje nešto što se može odmah koristiti.

Ovdje je osam promptova za najčešće zadatke u razrednoj nastavi. Kopirajte ih, zamijenite dijelove u uglastim zagradama i prilagodite svom odjeljenju. Svi su napisani tako da **ne traže nikakve podatke o konkretnoj djeci** (više o tome u tekstu [Šta nikad ne upisati u ChatGPT o učenicima](/bs/blog/sta-ne-upisivati-u-chatgpt-o-ucenicima)).

## Kako izgleda dobar prompt

Dobar zahtjev ima pet dijelova:

1. **Uloga.** Kome se obraćate: „Ti si iskusan učitelj razredne nastave."
2. **Kontekst.** Razred, predmet, tema, broj učenika, vrijeme.
3. **Cilj.** Šta djeca trebaju znati ili umjeti nakon časa.
4. **Ograničenja.** Jezik i pismo, dužina, nivo težine, materijali koje imate.
5. **Format.** Tabela, lista, tekst za štampu, broj primjera.

Ako nešto od toga izostavite, AI će praznine popuniti nagađanjem.

## 1. Plan časa

```text
Ti si iskusan učitelj razredne nastave. Napravi plan časa od 45 minuta za
[razred] razred, predmet [predmet], tema „[tema]".
Cilj: nakon časa učenici trebaju [konkretan ishod].
Podijeli čas na uvodni (5 min), glavni (30 min) i završni dio (10 min).
U glavnom dijelu predvidi bar jednu aktivnost s pokretom ili u paru.
Navedi potreban materijal. Piši na bosanskom jeziku, ijekavicom, latinicom.
```

## 2. Zadaci na tri nivoa težine

```text
Napravi po pet zadataka iz oblasti „[oblast]" za [razred] razred, na tri
nivoa: osnovni, srednji i napredni. Zadaci na istom nivou trebaju biti
različiti po obliku (računanje, tekstualni zadatak, dopunjavanje).
Na kraju daj rješenja odvojeno, da ih mogu izrezati prije štampe.
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
razreda, u tri grupe: pitanja o činjenicama iz teksta, pitanja o
osjećanjima likova i pitanja „šta bi ti uradio". Po četiri pitanja u grupi.
```

## 5. Igra za ponavljanje gradiva

```text
Predloži tri igre za ponavljanje gradiva „[tema]" u [razred] razredu.
Igre trebaju trajati 10 minuta, u njima treba učestvovati cijelo odjeljenje
i ne smiju tražiti poseban materijal osim table, krede i papira. Za svaku
igru napiši pravila u pet koraka i kako da prilagodim igru za slabije učenike.
```

## 6. Poruka roditeljima

```text
Napiši kratko i ljubazno obavještenje roditeljima učenika [razred] razreda
o [događaj: ekskurzija, roditeljski sastanak, projekat]. Uključi datum,
vrijeme i šta djeca trebaju ponijeti. Ton: topao i jasan, bez birokratskog
jezika. Najviše 120 riječi.
```

## 7. Opisna povratna informacija

```text
Napiši pet primjera opisne povratne informacije za rad učenika [razred]
razreda na zadatku „[zadatak]". Svaki primjer treba imati: šta je dobro
urađeno, šta treba popraviti i jedan konkretan sljedeći korak. Ton je
podržavajući. Ne izmišljaj ocjene.
```

Ovo su primjeri formulacija, ne gotove ocjene. Konkretnu povratnu informaciju za svako dijete pišete sami, na osnovu onoga što ste vidjeli.

## 8. Neka AI provjeri sam sebe

Ovaj prompt dolazi pravo iz testiranja softvera: rezultat se ne prihvata dok ga neko ne provjeri. Nakon bilo kojeg odgovora pošaljite:

```text
Pregledaj ono što si napisao kao strog recenzent. Navedi: moguće
činjenične greške, zadatke čije rješenje nije jednoznačno, riječi koje su
preteške za [razred] razred i mjesta gdje nisi poštovao moja ograničenja.
```

Ne vjerujte ni ovom odgovoru napamet, ali često otkrije stvari koje bi vam promakle.

## Provjerite prije nego što odštampate

AI alati pišu uvjerljivo i kada griješe. Prije nego što bilo šta stigne do djece:

- **Riješite sve zadatke sami.** Računske greške i zadaci bez rješenja nisu rijetkost.
- **Provjerite činjenice.** Datume, imena, prirodne pojave, geografiju.
- **Provjerite jezik.** AI lako miješa ijekavicu i ekavicu, latinicu i ćirilicu, bosanske, srpske i hrvatske riječi.
- **Pročitajte očima djeteta.** Bi li prvak razumio svaku riječ?
- **Uskladite s planom.** Vodi li zadatak zaista ka ishodu koji je u vašem planu?

## Zaključak

Promptovi nisu čarobne formule. To su dobro postavljena pitanja. Što jasnije kažete šta vam treba, to manje vremena trošite na ispravljanje.

Najbolji rezultat dobijate kada AI shvatite kao asistenta koji pravi prvi nacrt, a vi ostajete onaj koji poznaje djecu, provjerava i odlučuje.
