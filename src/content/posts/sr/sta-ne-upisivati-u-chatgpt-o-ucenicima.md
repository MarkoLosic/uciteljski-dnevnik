---
title: "Šta nikad ne upisati u ChatGPT o učenicima"
date: "2026-10-30"
excerpt: "AI alati štede vrijeme, ali podaci o djeci ne idu u svaki prozor za ćaskanje. Šta ne dijeliti, kako anonimizovati zahtjev i šta provjeriti prije slanja."
category: "Etika i AI"
---

## Uvod

Vještačka inteligencija može nastavniku uštedjeti mnogo vremena: da predloži zadatke, preformuliše obavještenje za roditelje ili pomogne oko opisne ocjene. Upravo tu krije se i najveći rizik. Da bi odgovor bio „dobar", lako je u prozor za ćaskanje zalijepiti ime učenika, njegove ocjene, dijagnozu ili opis porodične situacije.

U testiranju softvera postoji jednostavno pravilo: ne pretpostavljaj gdje završavaju podaci, nego provjeri. Kod podataka o djeci pravilo je još strože: ako nisi siguran gdje završavaju, ne šalji ih.

## Zašto je ovo važno

Kada nešto upišete u AI alat, to više nije samo na vašem računaru. Zavisno od alata, naloga i podešavanja, razgovor se može čuvati na serverima kompanije, mogu ga pregledati zaposleni radi kontrole kvaliteta, a može se koristiti i za dalje treniranje modela.

Podaci o djeci, a posebno o zdravlju, razvoju, ponašanju i porodičnim prilikama, spadaju u najosjetljivije lične podatke. Zaštićeni su zakonima o zaštiti ličnih podataka, a škola za njih ima posebnu odgovornost. Roditelji su ih povjerili školi, ne kompaniji koja pravi AI alat.

## Šta nikad ne upisati

- **Puno ime i prezime učenika**, posebno uz bilo šta drugo o njemu.
- **Ocjene, rezultate testova i bilješke o ponašanju** vezane za konkretno dijete.
- **Zdravstvene podatke i dijagnoze**: smetnje u razvoju, poremećaje pažnje, alergije, terapije.
- **Podatke iz individualnog obrazovnog plana (IOP)**.
- **Porodične prilike**: razvod, nasilje, socijalnu pomoć, odsutnog roditelja.
- **Identifikacione podatke**: JMB, adresu, broj telefona, ime škole i odjeljenja uz ime djeteta.
- **Fotografije djece, njihove radove s imenom ili snimke glasa**.
- **Opise sukoba i disciplinskih postupaka** u kojima se dijete može prepoznati.

Zapamtite: dijete se može prepoznati i bez imena. Rečenica „jedini dječak u 2b u maloj seoskoj školi, čiji je otac otišao u inostranstvo" može otkriti više od samog imena.

## Kako onda koristiti AI?

AI ne treba podatke o konkretnom djetetu da bi pomogao. Treba mu opis situacije.

### 1. Uopštite

Umjesto stvarnog djeteta opišite tipičnu situaciju: „učenik drugog razreda koji čita sporo i preskače redove". To je dovoljno da dobijete predloge vježbi.

### 2. Anonimizujte

Ako vam je potreban konkretniji opis, uklonite sve što identifikuje: ime zamijenite sa „Učenik A", izbacite školu, mjesto i detalje porodice.

**Loše:**

```text
Marko Petrović iz 3b ima ADHD i stalno ometa čas. Mama mi je rekla da se
roditelji razvode. Napiši mi opisnu ocjenu za njegov dnevnik.
```

**Bolje:**

```text
Napiši tri primjera opisne povratne informacije za učenika trećeg razreda
koji ima teškoće s održavanjem pažnje, a dobro napreduje u matematici.
Ton treba da bude podržavajući i konkretan.
```

Drugi zahtjev daje upotrebljiv rezultat, a ne otkriva ništa o stvarnom djetetu. Konkretne podatke dodajete sami, u školskom dnevniku, a ne u AI alatu.

### 3. Koristite alate koje je odobrila škola

Neke škole i ministarstva imaju ugovore s dobavljačima koji garantuju kako se podaci čuvaju. Ako takav alat postoji, koristite njega. Ako ne postoji, ponašajte se kao da je sve što upišete javno.

### 4. Provjerite podešavanja

Mnogi alati imaju opciju da se razgovori ne koriste za treniranje modela ili da se ne čuva istorija. Pronađite je i uključite. To ne zamjenjuje anonimizaciju, ali smanjuje rizik.

## Provjera prije slanja

Prije nego što pritisnete „Pošalji", prođite kroz pet pitanja:

- [ ] Ima li u tekstu ime, prezime ili nadimak djeteta?
- [ ] Može li se dijete prepoznati po opisu (škola, odjeljenje, mjesto, porodica)?
- [ ] Ima li zdravstvenih ili drugih osjetljivih podataka?
- [ ] Da li bi roditelj bio miran kada bi vidio ovaj tekst?
- [ ] Da li mi je za ovaj zadatak zaista potreban konkretan podatak?

Ako je odgovor na bilo koje od prva četiri pitanja „da" ili „nisam siguran", tekst treba preraditi.

## Zaključak

AI može biti odličan pomoćnik u pripremi nastave, ali nije mjesto za dosije učenika. Pravilo je jednostavno: alatu dajte situaciju, a ne dijete.

Ako želite da vidite kako izgledaju dobri, anonimni zahtjevi u praksi, pogledajte [gotove promptove za pripremu časa](/blog/promptovi-za-pripremu-casa).
