---
title: "Šta nikad ne upisati u ChatGPT o učenicima"
date: "2026-10-30"
excerpt: "AI alati štede vrijeme, ali podaci o djeci ne idu u svaki prozor za razgovor. Šta ne dijeliti, kako anonimizirati zahtjev i šta provjeriti prije slanja."
category: "Etika i AI"
---

## Uvod

Umjetna inteligencija može nastavniku uštedjeti mnogo vremena: predložiti zadatke, preformulisati obavještenje za roditelje ili pomoći oko opisne ocjene. Upravo tu se krije i najveći rizik. Da bi odgovor bio „dobar", lako je u prozor za razgovor zalijepiti ime učenika, njegove ocjene, dijagnozu ili opis porodične situacije.

U testiranju softvera postoji jednostavno pravilo: ne pretpostavljaj gdje završavaju podaci, nego provjeri. Kod podataka o djeci pravilo je još strože: ako nisi siguran gdje završavaju, ne šalji ih.

## Zašto je ovo važno

Kada nešto upišete u AI alat, to više nije samo na vašem računaru. Zavisno od alata, naloga i postavki, razgovor se može čuvati na serverima kompanije, mogu ga pregledati zaposleni radi kontrole kvaliteta, a može se koristiti i za dalje treniranje modela.

Podaci o djeci, a posebno o zdravlju, razvoju, ponašanju i porodičnim prilikama, spadaju u najosjetljivije lične podatke. Zaštićeni su zakonima o zaštiti ličnih podataka, a škola za njih ima posebnu odgovornost. Roditelji su ih povjerili školi, ne kompaniji koja pravi AI alat.

## Šta nikad ne upisati

- **Puno ime i prezime učenika**, posebno uz bilo šta drugo o njemu.
- **Ocjene, rezultate testova i bilješke o ponašanju** vezane za konkretno dijete.
- **Zdravstvene podatke i dijagnoze**: poteškoće u razvoju, poremećaje pažnje, alergije, terapije.
- **Podatke iz individualnog obrazovnog programa (IOP)**.
- **Porodične prilike**: razvod, nasilje, socijalnu pomoć, odsutnog roditelja.
- **Identifikacione podatke**: JMB, adresu, broj telefona, ime škole i odjeljenja uz ime djeteta.
- **Fotografije djece, njihove radove s imenom ili snimke glasa**.
- **Opise sukoba i disciplinskih postupaka** u kojima se dijete može prepoznati.

Zapamtite: dijete se može prepoznati i bez imena. Rečenica „jedini dječak u 2b u maloj seoskoj školi, čiji je otac otišao u inostranstvo" može otkriti više od samog imena.

## Kako onda koristiti AI?

AI ne treba podatke o konkretnom djetetu da bi pomogao. Treba mu opis situacije.

### 1. Uopćite

Umjesto stvarnog djeteta opišite tipičnu situaciju: „učenik drugog razreda koji čita sporo i preskače redove". To je dovoljno da dobijete prijedloge vježbi.

### 2. Anonimizirajte

Ako vam treba konkretniji opis, uklonite sve što identifikuje: ime zamijenite sa „Učenik A", izbacite školu, mjesto i detalje porodice.

**Loše:**

```text
Marko Petrović iz 3b ima ADHD i stalno ometa čas. Mama mi je rekla da se
roditelji razvode. Napiši mi opisnu ocjenu za njegov dnevnik.
```

**Bolje:**

```text
Napiši tri primjera opisne povratne informacije za učenika trećeg razreda
koji ima poteškoće s održavanjem pažnje, a dobro napreduje u matematici.
Ton treba biti podržavajući i konkretan.
```

Drugi zahtjev daje upotrebljiv rezultat, a ne otkriva ništa o stvarnom djetetu. Konkretne podatke dodajete sami, u školskom dnevniku, a ne u AI alatu.

### 3. Koristite alate koje je odobrila škola

Neke škole i ministarstva imaju ugovore s dobavljačima koji garantuju kako se podaci čuvaju. Ako takav alat postoji, koristite njega. Ako ne postoji, ponašajte se kao da je sve što upišete javno.

### 4. Provjerite postavke

Mnogi alati imaju opciju da se razgovori ne koriste za treniranje modela ili da se ne čuva historija. Pronađite je i uključite. To ne zamjenjuje anonimizaciju, ali smanjuje rizik.

## Provjera prije slanja

Prije nego što pritisnete „Pošalji", prođite kroz pet pitanja:

- [ ] Ima li u tekstu ime, prezime ili nadimak djeteta?
- [ ] Može li se dijete prepoznati po opisu (škola, odjeljenje, mjesto, porodica)?
- [ ] Ima li zdravstvenih ili drugih osjetljivih podataka?
- [ ] Bi li roditelj bio miran kada bi vidio ovaj tekst?
- [ ] Treba li mi za ovaj zadatak zaista konkretan podatak?

Ako je odgovor na bilo koje od prva četiri pitanja „da" ili „nisam siguran", tekst treba preraditi.

## Zaključak

AI može biti odličan pomoćnik u pripremi nastave, ali nije mjesto za dosije učenika. Pravilo je jednostavno: alatu dajte situaciju, a ne dijete.

Ako želite vidjeti kako izgledaju dobri, anonimni zahtjevi u praksi, pogledajte [gotove promptove za pripremu časa](/bs/blog/promptovi-za-pripremu-casa).
