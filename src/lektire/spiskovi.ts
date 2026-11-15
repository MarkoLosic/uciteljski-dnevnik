import type { Djelo, LektireRazred } from './types';

// Djela prepisana iz nastavnih programa (ćirilica iz programa RS prenesena u latinicu).
// Isti spisak važi za srpsku i bosansku verziju stranice; napomene uz spisak su u sr.ts / bs.ts.
// Pri izmjeni programa: promijeni spisak ovdje i datum `checked` u oba jezika.

// Republika Srpska — RPZ RS, Nastavni program Srpski jezik (II–V razred, 2021; Službeni glasnik RS, 2023).
// Za I razred (predmetno područje „Govor, izražavanje, stvaranje“) program nije objavljen na sajtu RPZ-a.
export const RS_DJELA: Record<LektireRazred, Djelo[]> = {
  1: [],
  2: [
    { autor: 'Branko Ćopić', naslov: 'Ježeva kućica' },
    { autor: 'Stanko Rakita', naslov: 'Radoznali dječak' },
    { autor: 'Jovan Jovanović Zmaj', naslov: 'Pesme za decu', napomena: 'izbor' },
  ],
  3: [
    { naslov: 'Ezopove ili Dositejeve basne', napomena: 'izbor' },
    { naslov: 'Andersenove bajke', napomena: 'tri po izboru' },
    { autor: 'Dušan Radović', naslov: 'Razbojnik Kađa i princeza Nađa' },
    { autor: 'Nasiha Kapidžić-Hadžić', naslov: 'Maskenbal u šumi' },
  ],
  4: [
    { autor: 'Branko Ćopić', naslov: 'Doživljaji mačka Toše' },
    { autor: 'Desanka Maksimović', naslov: 'Izbor iz poezije i proze za djecu' },
    { autor: 'Ljubivoje Ršumović', naslov: 'Izbor iz poezije za djecu' },
    { autor: 'Astrid Lindgren', naslov: 'Pipi Duga Čarapa' },
    { autor: 'Braća Grim', naslov: 'Bajke', napomena: 'dvije po izboru' },
    { autor: 'Predrag Bjelošević', naslov: 'Tužni princ' },
    { autor: 'Uroš Petrović', naslov: 'Misterije Ginkove ulice' },
    { autor: 'Berislav Blagojević', naslov: 'Upoznajte Gagarina, najšašavijeg psa u svemiru' },
    { autor: 'Ahmet Hromadžić', naslov: 'Patuljak vam priča' },
  ],
  5: [
    { naslov: 'Srpske narodne bajke', napomena: 'dvije po izboru' },
    { autor: 'Grozdana Olujić', naslov: 'Bajke' },
    { autor: 'Ranko Pavlović', naslov: 'Izbor iz poezije i proze za djecu' },
    { naslov: 'Izbor iz poezije za djecu savremenih pisaca Republike Srpske' },
    { autor: 'Rene Gijo', naslov: 'Bela griva' },
    { autor: 'Luis Kerol', naslov: 'Alisa u zemlji čuda' },
    { autor: 'Ivana Brlić-Mažuranić', naslov: 'Čudnovate zgode šegrta Hlapića' },
    { autor: 'Mato Lovrak', naslov: 'Družina Pere Kvržice' },
    { autor: 'Svetlana Velmar-Janković', naslov: 'Knjiga za Marka' },
    { autor: 'Gradimir Stojković', naslov: 'Ja kao ti – ti kao ja' },
    { autor: 'Jovo Čulić', naslov: 'Junak u tregerima' },
    { autor: 'Johana Špiri', naslov: 'Hajdi' },
  ],
};

// Federacija BiH — Nastavni plan i program Kantona Sarajevo za devetogodišnju osnovnu školu (2018).
// Ostali kantoni imaju svoje programe, pa se spiskovi mogu razlikovati.
// Za II razred program ne propisuje lektiru; djela su sa spiskova škola u Kantonu Sarajevo (2025/26).
export const FBIH_DJELA: Record<LektireRazred, Djelo[]> = {
  1: [],
  2: [
    { autor: 'Branko Ćopić', naslov: 'Ježeva kućica' },
    { autor: 'Sunčana Škrinjarić', naslov: 'Dućan kod svrake' },
    { autor: 'Zehra Hubijar', naslov: 'Medin rođendan' },
  ],
  3: [
    { autor: 'Nasiha Kapidžić-Hadžić', naslov: 'Pjesme', napomena: 'po izboru' },
    { autor: 'Šimo Ešić', naslov: 'Vezena torbica' },
    { autor: 'Ahmet Hromadžić', naslov: 'Zelena šuma', napomena: 'priče Ledena gora, Prijatelji, Miš vitez' },
    { autor: 'Stanislav Femenić', naslov: 'Idi pa vidi' },
    { autor: 'Đani Rodari', naslov: 'Telefonske priče' },
  ],
  4: [
    { autor: 'Ivica Vanja Rorić', naslov: 'Plavi vjetar' },
    { autor: 'Bisera Alikadić', naslov: 'Kraljica iz dvorišta' },
    { autor: 'Ahmet Hromadžić', naslov: 'Patuljak vam priča' },
    { autor: 'Karlo Kolodi', naslov: 'Pinokio' },
    { naslov: 'Vrelo ljepote / Stihovi u lektiri', napomena: 'izbor iz bosanskohercegovačke poezije za djecu' },
  ],
  5: [
    { autor: 'Ahmet Hromadžić', naslov: 'Patuljak iz Zaboravljene zemlje' },
    { autor: 'Alija Dubočanin', naslov: 'Tiha rijeka djetinjstva' },
    { autor: 'Ivana Brlić-Mažuranić', naslov: 'Priče iz davnine' },
    { autor: 'Đani Rodari', naslov: 'Putovanje Plave strijele' },
    { autor: 'Mato Lovrak', naslov: 'Vlak u snijegu' },
    { autor: 'Ismet Bekrić', naslov: 'Jesen u gradu', napomena: 'izabrane pjesme' },
  ],
};
