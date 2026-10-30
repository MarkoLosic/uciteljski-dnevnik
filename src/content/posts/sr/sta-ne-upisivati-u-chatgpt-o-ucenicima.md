---
title: "Šta nikad ne upisati u ChatGPT o učenicima"
date: "2026-10-30"
excerpt: "AI alati štede vreme, ali podaci o deci ne idu u svaki prozor za ćaskanje. Šta ne deliti, kako anonimizovati zahtev i šta proveriti pre slanja."
category: "Etika i AI"
---

## Uvod

Veštačka inteligencija može nastavniku uštedeti mnogo vremena: da predloži zadatke, preformuliše obaveštenje za roditelje ili pomogne oko opisne ocene. Upravo tu krije se i najveći rizik. Da bi odgovor bio „dobar", lako je u prozor za ćaskanje zalepiti ime učenika, njegove ocene, dijagnozu ili opis porodične situacije.

U testiranju softvera postoji jednostavno pravilo: ne pretpostavljaj gde završavaju podaci, nego proveri. Kod podataka o deci pravilo je još strože: ako nisi siguran gde završavaju, ne šalji ih.

## Zašto je ovo važno

Kada nešto upišete u AI alat, to više nije samo na vašem računaru. Zavisno od alata, naloga i podešavanja, razgovor se može čuvati na serverima kompanije, mogu ga pregledati zaposleni radi kontrole kvaliteta, a može se koristiti i za dalje treniranje modela.

Podaci o deci, a posebno o zdravlju, razvoju, ponašanju i porodičnim prilikama, spadaju u najosetljivije lične podatke. Zaštićeni su zakonima o zaštiti ličnih podataka, a škola za njih ima posebnu odgovornost. Roditelji su ih poverili školi, ne kompaniji koja pravi AI alat.

## Šta nikad ne upisati

- **Puno ime i prezime učenika**, posebno uz bilo šta drugo o njemu.
- **Ocene, rezultate testova i beleške o ponašanju** vezane za konkretno dete.
- **Zdravstvene podatke i dijagnoze**: smetnje u razvoju, poremećaje pažnje, alergije, terapije.
- **Podatke iz individualnog obrazovnog plana (IOP)**.
- **Porodične prilike**: razvod, nasilje, socijalnu pomoć, odsutnog roditelja.
- **Identifikacione podatke**: JMB, adresu, broj telefona, ime škole i odeljenja uz ime deteta.
- **Fotografije dece, njihove radove s imenom ili snimke glasa**.
- **Opise sukoba i disciplinskih postupaka** u kojima se dete može prepoznati.

Zapamtite: dete se može prepoznati i bez imena. Rečenica „jedini dečak u 2b u maloj seoskoj školi, čiji je otac otišao u inostranstvo" može otkriti više od samog imena.

## Kako onda koristiti AI?

AI ne treba podatke o konkretnom detetu da bi pomogao. Treba mu opis situacije.

### 1. Uopštite

Umesto stvarnog deteta opišite tipičnu situaciju: „učenik drugog razreda koji čita sporo i preskače redove". To je dovoljno da dobijete predloge vežbi.

### 2. Anonimizujte

Ako vam je potreban konkretniji opis, uklonite sve što identifikuje: ime zamenite sa „Učenik A", izbacite školu, mesto i detalje porodice.

**Loše:**

```text
Marko Petrović iz 3b ima ADHD i stalno ometa čas. Mama mi je rekla da se
roditelji razvode. Napiši mi opisnu ocenu za njegov dnevnik.
```

**Bolje:**

```text
Napiši tri primera opisne povratne informacije za učenika trećeg razreda
koji ima teškoće s održavanjem pažnje, a dobro napreduje u matematici.
Ton treba da bude podržavajući i konkretan.
```

Drugi zahtev daje upotrebljiv rezultat, a ne otkriva ništa o stvarnom detetu. Konkretne podatke dodajete sami, u školskom dnevniku, a ne u AI alatu.

### 3. Koristite alate koje je odobrila škola

Neke škole i ministarstva imaju ugovore s dobavljačima koji garantuju kako se podaci čuvaju. Ako takav alat postoji, koristite njega. Ako ne postoji, ponašajte se kao da je sve što upišete javno.

### 4. Proverite podešavanja

Mnogi alati imaju opciju da se razgovori ne koriste za treniranje modela ili da se ne čuva istorija. Pronađite je i uključite. To ne zamenjuje anonimizaciju, ali smanjuje rizik.

## Provera pre slanja

Pre nego što pritisnete „Pošalji", prođite kroz pet pitanja:

- [ ] Ima li u tekstu ime, prezime ili nadimak deteta?
- [ ] Može li se dete prepoznati po opisu (škola, odeljenje, mesto, porodica)?
- [ ] Ima li zdravstvenih ili drugih osetljivih podataka?
- [ ] Da li bi roditelj bio miran kada bi video ovaj tekst?
- [ ] Da li mi je za ovaj zadatak zaista potreban konkretan podatak?

Ako je odgovor na bilo koje od prva četiri pitanja „da" ili „nisam siguran", tekst treba preraditi.

## Zaključak

AI može biti odličan pomoćnik u pripremi nastave, ali nije mesto za dosije učenika. Pravilo je jednostavno: alatu dajte situaciju, a ne dete.

Ako želite da vidite kako izgledaju dobri, anonimni zahtevi u praksi, pogledajte [gotove promptove za pripremu časa](/blog/promptovi-za-pripremu-casa).
