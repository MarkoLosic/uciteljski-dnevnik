// Priručnik „Kako nastaje priča“ za mlade pisce (3–5. razred): 12 tema sa pravilom koje pisci poštuju,
// primjerom iz radionice (naš tekst), preporukom za čitanje i vježbama. Isti sadržaj se štampa latinicom
// ili ćirilicom — tekst je pisan latinicom i preslovljava se funkcijom `toCyrillic`.
import type { ReactNode } from 'react';
import { BookOpen, Feather, PenLine, type LucideIcon } from 'lucide-react';

export type Script = 'lat' | 'cyr';

const DIGRAPHS: [string, string][] = [
  ['DŽ', 'Џ'], ['Dž', 'Џ'], ['dž', 'џ'],
  ['LJ', 'Љ'], ['Lj', 'Љ'], ['lj', 'љ'],
  ['NJ', 'Њ'], ['Nj', 'Њ'], ['nj', 'њ'],
];
const LETTERS: Record<string, string> = {
  A: 'А', B: 'Б', V: 'В', G: 'Г', D: 'Д', Đ: 'Ђ', E: 'Е', Ž: 'Ж', Z: 'З', I: 'И', J: 'Ј', K: 'К', L: 'Л', M: 'М', N: 'Н',
  O: 'О', P: 'П', R: 'Р', S: 'С', T: 'Т', Ć: 'Ћ', U: 'У', F: 'Ф', H: 'Х', C: 'Ц', Č: 'Ч', Š: 'Ш',
  a: 'а', b: 'б', v: 'в', g: 'г', d: 'д', đ: 'ђ', e: 'е', ž: 'ж', z: 'з', i: 'и', j: 'ј', k: 'к', l: 'л', m: 'м', n: 'н',
  o: 'о', p: 'п', r: 'р', s: 'с', t: 'т', ć: 'ћ', u: 'у', f: 'ф', h: 'х', c: 'ц', č: 'ч', š: 'ш',
};

// U tekstu priručnika nema riječi u kojima su „dž“, „lj“ i „nj“ dva glasa (npr. „nadživjeti“), pa je preslovljavanje jednoznačno.
export function toCyrillic(text: string): string {
  let out = text;
  for (const [lat, cyr] of DIGRAPHS) out = out.split(lat).join(cyr);
  return [...out].map((ch) => LETTERS[ch] ?? ch).join('');
}

interface Task {
  text: string;
  lines?: number;
  box?: number; // visina okvira za crtež, u mm
  fields?: string[]; // kratka polja sa linijom (npr. „Ime:“)
}

interface Topic {
  title: string;
  rule: string;
  explain: string;
  example: string[];
  read: { book: string; author: string; why: string };
  tasks: Task[];
}

const TOPICS: Topic[] = [
  {
    title: 'Odakle dolaze ideje',
    rule: 'Priča često počinje pitanjem: „Šta bi bilo kad bi…?“',
    explain:
      'Pisci ne čekaju da im ideja padne s neba. Gledaju oko sebe, slušaju i postavljaju neobična pitanja. Šta bi bilo kad bi moja mačka progovorila? Šta bi bilo kad bi škola jednog jutra nestala?',
    example: [
      'Mila je otvorila pernicu i zastala. Olovke su stajale poredane kao vojnici, a najkraća, onako sitna i izgrizena, salutirala joj je.',
    ],
    read: {
      book: 'Alisa u Zemlji čuda',
      author: 'Luis Kerol',
      why: 'Sve počinje bijelim zecom koji gleda na sat i žuri. Obično i čudno zajedno daju odličnu ideju.',
    },
    tasks: [
      { text: 'Završi pitanja: Šta bi bilo kad bi moj ranac… Šta bi bilo kad bi kiša… Šta bi bilo kad bi moja baka…', lines: 4 },
      { text: 'Zaokruži pitanje koje ti se najviše dopada. Napiši dvije rečenice o tome šta bi se tada dogodilo.', lines: 5 },
      { text: 'Bilježnica ideja: ove sedmice zapiši jednu neobičnu stvar koju si vidio/la ili čuo/la.', lines: 3 },
    ],
  },
  {
    title: 'Junak priče',
    rule: 'Čitaoci prate junaka koji nešto želi.',
    explain:
      'Dobar junak nije samo lijep ili ružan. Ima svoje navike, nešto što voli i nešto čega se boji. Najvažnije je da nešto želi, jer ga ta želja vodi kroz cijelu priču.',
    example: [
      'Vuk Pero imao je najoštrije zube u šumi i najmekše srce. Krišom je čitao knjige o cvijeću, a najviše od svega želio je da mu bar jedan zec kaže „dobro jutro“.',
    ],
    read: {
      book: 'Pipi Duga Čarapa',
      author: 'Astrid Lindgren',
      why: 'Pipi pamtimo po riđim pletenicama, ali još više po tome kako se ponaša: hrabro, smiješno i potpuno na svoj način.',
    },
    tasks: [
      { text: 'Lična karta tvog junaka:', fields: ['Ime:', 'Godine:', 'Izgled:', 'Voli:', 'Boji se:', 'Najviše želi:'] },
      { text: 'Nacrtaj svog junaka.', box: 38 },
      { text: 'Napiši dvije rečenice u kojima junak radi nešto po čemu ga odmah prepoznajemo.', lines: 3 },
    ],
  },
  {
    title: 'Pokaži, nemoj samo reći',
    rule: 'Ne piši samo da je junak tužan — pokaži to.',
    explain:
      'Rečenica „Ana je bila uplašena“ samo saopštava osjećaj. Kad opišemo šta Ana radi i šta joj se dešava u tijelu, čitalac sam osjeti njen strah.',
    example: [
      'Samo kaže: Ana je bila uplašena.',
      'Pokazuje: Ana je stezala kvaku tako jako da su joj pobijeljeli prsti. Srce joj je tuklo u ušima.',
    ],
    read: {
      book: 'Ružno pače',
      author: 'Hans Kristijan Andersen',
      why: 'Andersen ne kaže samo da je pačetu teško. Pokazuje kako ga drugi tjeraju i kako se samo skriva, pa tugu osjetimo i mi.',
    },
    tasks: [
      { text: 'Pretvori u rečenicu koja pokazuje: „Marko je bio srećan.“', lines: 3 },
      { text: 'Pretvori u rečenicu koja pokazuje: „Bilo je jako hladno.“', lines: 3 },
      { text: 'Pretvori u rečenicu koja pokazuje: „Učiteljica je bila ljuta.“', lines: 2 },
      { text: 'Pogodi osjećaj: „Luka je gledao u pod i nogom crtao krugove po prašini.“ Kako se Luka osjeća?', lines: 1 },
    ],
  },
  {
    title: 'Mjesto radnje',
    rule: 'Uvedi čitaoca u mjesto pomoću svih pet čula.',
    explain:
      'Čitalac ne vidi ono što vidiš ti. Zato mu reci šta se na tom mjestu vidi i čuje, kakav je miris, šta osjećaš pod prstima, a ponekad i kakav je ukus u ustima.',
    example: [
      'Na pijaci je mirisalo na zrele breskve i topao hljeb. Prodavci su dovikivali cijene, a pod cipelama je škripao razasuti pijesak.',
    ],
    read: {
      book: 'Čudesno putovanje Nilsa Holgersona',
      author: 'Selma Lagerlef',
      why: 'Nils putuje na leđima guske i iz visine upoznaje cijelu svoju zemlju: polja, šume, jezera i gradove.',
    },
    tasks: [
      {
        text: 'Izaberi mjesto: bakina kuhinja, školsko dvorište ili šuma poslije kiše. Šta tamo…',
        fields: ['vidim:', 'čujem:', 'mirišem:', 'dodirujem:', 'osjećam ukus:'],
      },
      { text: 'Opiši to mjesto u četiri rečenice, ali ne piši njegovo ime. Neka drug pogodi gdje si.', lines: 9 },
    ],
  },
  {
    title: 'Vrijeme radnje',
    rule: 'Kada se priča dešava, mijenja sve.',
    explain:
      'Ista šuma je drugačija u podne i u ponoć, ljeti i zimi, danas i prije sto godina. Vrijeme radnje daje priči raspoloženje i određuje šta junaci mogu, a šta ne mogu da urade.',
    example: [
      'Bilo je to posljednje veče raspusta. Sunce je zalazilo sporo, kao da ni ono ne želi da se ljeto završi.',
    ],
    read: {
      book: 'Doživljaji Toma Sojera',
      author: 'Mark Tven',
      why: 'Priča se dešava u gradiću na obali velike rijeke, davno prije struje i automobila. Zato su i dječje avanture drugačije nego danas.',
    },
    tasks: [
      { text: 'Opiši svoju ulicu u zoru.', lines: 3 },
      { text: 'Opiši istu ulicu u ponoć.', lines: 3 },
      { text: 'Dovrši: „Prije sto godina na mjestu moje škole…“', lines: 2 },
      { text: 'Dovrši: „Za sto godina u mojoj učionici…“', lines: 2 },
    ],
  },
  {
    title: 'Dobar početak',
    rule: 'Prva rečenica je udica — mora uhvatiti čitaoca.',
    explain:
      'Čitalac već u prvim redovima odlučuje da li će čitati dalje. Počni usred događaja, neobičnom rečenicom, pitanjem ili zvukom, a ne rečenicom „Jednog dana sam ustao…“.',
    example: [
      'Dosadan početak: Jednog dana sam otišao u školu.',
      'Udica: Tog jutra moj pas je u školu donio moju zadaću — pojedenu do pola.',
    ],
    read: {
      book: 'Emil i detektivi',
      author: 'Erih Kestner',
      why: 'Emil sam putuje vozom, a u džepu nosi novac za baku. Već na početku slutimo da će se nešto desiti.',
    },
    tasks: [
      { text: 'Popravi dosadan početak: „Bio je lijep dan.“', lines: 3 },
      { text: 'Napiši tri različita početka priče o izgubljenom ključu: usred događaja, pitanjem i zvukom.', lines: 7 },
    ],
  },
  {
    title: 'Zaplet: problem i prepreke',
    rule: 'Bez problema nema priče.',
    explain:
      'Kad sve ide glatko, čitaocu je dosadno. Junak mora naići na problem, a onda na prepreke dok pokušava da ga riješi. Svaka nova prepreka čini priču napetijom.',
    example: [
      'Jelena je trebalo samo da odnese tortu baki. Ali most je bio zatvoren, autobus je upravo otišao, a iz šume je dopirao čudan zvuk…',
    ],
    read: {
      book: 'Crvenkapa',
      author: 'narodna bajka (zapisali braća Grim)',
      why: 'Crvenkapa nosi korpu baki, a na putu sreće vuka. Jedan susret mijenja cijeli tok priče.',
    },
    tasks: [
      { text: 'Tvoj junak želi ____________________. Smisli tri prepreke koje mu stoje na putu.', lines: 5 },
      { text: 'Koja prepreka je najteža? Napiši kako je junak savladava.', lines: 7 },
    ],
  },
  {
    title: 'Napetost i vrhunac',
    rule: 'Uspori kad je najnapetije.',
    explain:
      'U najvažnijem trenutku pisci pišu kraće rečenice, opisuju sitnice i odlažu odgovor. Čitalac tada zadržava dah i jedva čeka sljedeću rečenicu.',
    example: [
      'Vrata su zaškripala. Korak. Pa još jedan. Nešto se pomjerilo iza ormara. Tea je zažmirila i polako, veoma polako, okrenula glavu.',
    ],
    read: {
      book: 'Hajduci',
      author: 'Branislav Nušić',
      why: 'Dječaci odlaze u šumu da se igraju hajduka. Kad padne mrak, svaki šum postaje strašniji nego što su očekivali.',
    },
    tasks: [
      { text: 'Podvuci u primjeru riječi i rečenice koje stvaraju napetost.' },
      { text: 'Napiši vrhunac u pet kratkih rečenica: junak na tavanu otvara staru, zaključanu kutiju.', lines: 8 },
      { text: 'Kojim zvukovima možeš pojačati napetost? Navedi tri.', lines: 3 },
    ],
  },
  {
    title: 'Razgovor likova',
    rule: 'Likovi otkrivaju sebe kroz ono što govore.',
    explain:
      'Dijalog oživljava priču. Svaki lik govori na svoj način: neko kratko, neko mnogo, neko ljubazno, a neko grubo. Riječi lika pišemo pod navodnicima i pazimo na znakove.',
    example: [
      '„Ko je pojeo kolače?“ upitala je mama.',
      '„Ne znam“, rekao je Vuk i obrisao čokoladu sa brade.',
    ],
    read: {
      book: 'Mali princ',
      author: 'Antoan de Sent Egziperi',
      why: 'Veliki dio knjige čine razgovori. Iz pitanja koja Mali princ uporno ponavlja saznajemo kakav je on.',
    },
    tasks: [
      { text: 'Dopiši navodnike i znakove: Gdje si bio pitala je baka. Igrao sam se u parku odgovorio je Ognjen.', lines: 3 },
      { text: 'Napiši razgovor tvoje olovke i gumice. Neka svaka kaže bar dvije rečenice.', lines: 10 },
    ],
  },
  {
    title: 'Ko priča priču',
    rule: 'Odluči ko je pripovjedač.',
    explain:
      'Priču može pričati sam junak („Otvorio sam vrata…“) ili neko sa strane („Otvorio je vrata…“). Kad priča junak, znamo njegove misli. Kad priča neko sa strane, vidimo sve likove.',
    example: [
      'Junak priča: Srce mi je lupalo dok sam čekao rezultate.',
      'Neko sa strane: Srce mu je lupalo dok je čekao rezultate, a učiteljica se smješkala jer je već znala.',
    ],
    read: {
      book: 'Pinokio',
      author: 'Karlo Kolodi',
      why: 'Pripovjedač se šali i obraća čitaocima, a mi vidimo i šta Pinokio radi i šta se oko njega dešava.',
    },
    tasks: [
      { text: 'Ispričaj kao da si ti Mina: „Mina je ušla u učionicu i shvatila da je zaboravila svesku.“', lines: 3 },
      { text: 'Pas je pojeo dječakov sendvič. Ispričaj to kao pas.', lines: 4 },
      { text: 'Sada ispričaj isto kao dječak.', lines: 4 },
    ],
  },
  {
    title: 'Dobar kraj',
    rule: 'Kraj odgovara na pitanje sa početka.',
    explain:
      'Na kraju se problem rješava ili junak shvata nešto važno. Dobar kraj ne dolazi niotkuda: ne budi junaka iz sna i ne šalji čarobnjaka da umjesto njega sve popravi.',
    example: [
      'Nijedan zec nije rekao Peri „dobro jutro“. Ali kad je sutradan na pragu našao kitu poljskog cvijeća, znao je da ga je neko ipak razumio.',
    ],
    read: {
      book: 'Pepeljuga',
      author: 'Šarl Pero',
      why: 'Kraj se veže za cipelicu izgubljenu na balu: ono što je izgubljeno pomaže da se sve riješi.',
    },
    tasks: [
      {
        text: 'Precrtaj loše krajeve: a) „I onda sam se probudio.“ b) Junak sam smisli kako da riješi problem. c) Odjednom je stigao čarobnjak i sve popravio.',
      },
      { text: 'Smisli kraj za Jelenu i tortu iz sedme teme.', lines: 4 },
      { text: 'Napiši novi, neočekivani kraj Crvenkape.', lines: 6 },
    ],
  },
  {
    title: 'Naslov i prepravljanje',
    rule: 'Pravi pisci prepravljaju.',
    explain:
      'Prva verzija je tek početak. Pisci čitaju tekst naglas, brišu suvišno, mijenjaju dosadne riječi boljim i tek na kraju biraju naslov koji budi radoznalost.',
    example: [
      'Prije: Pas je bio veliki i išao je brzo.',
      'Poslije: Ogromni pas jurio je niz ulicu kao lokomotiva.',
    ],
    read: {
      book: 'Priče na telefon',
      author: 'Đani Rodari',
      why: 'Kratke, duhovite priče sa neobičnim naslovima. Već po naslovu poželiš da pročitaš priču.',
    },
    tasks: [
      { text: 'Umjesto riječi „rekao“ napiši četiri bolje (npr. šapnuo).', lines: 2 },
      { text: 'Popravi rečenicu: „Bilo je lijepo i bilo je lijepo vrijeme i bilo je toplo.“', lines: 4 },
      { text: 'Smisli tri naslova za priču o psu koji je pojeo zadaću. Zaokruži najbolji.', lines: 5 },
    ],
  },
];

const COLORS = ['#2563eb', '#db2777', '#7c3aed', '#16a34a', '#0891b2', '#ea580c', '#dc2626', '#4f46e5', '#0d9488', '#b45309', '#059669', '#9333ea'];

// ---------- dijelovi strane ----------

function Lines({ n }: { n: number }) {
  return (
    <div>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="h-[8.5mm] border-b border-[#9ca3af]" />
      ))}
    </div>
  );
}

function TaskView({ n, task, tr }: { n: number; task: Task; tr: (s: string) => string }) {
  return (
    <section className="grid gap-[1mm]">
      <p className="flex gap-2 text-[14px] font-semibold leading-snug">
        <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 border-[#111827] text-[11px] font-bold">
          {n}
        </span>
        <span>{tr(task.text)}</span>
      </p>
      <div className="pl-[30px]">
        {task.fields && (
          <div className="grid grid-cols-2 gap-x-6">
            {task.fields.map((f) => (
              <div key={f} className="flex h-[8.5mm] items-end gap-2 border-b border-[#9ca3af] pb-0.5 text-[13px] font-semibold">
                {tr(f)}
              </div>
            ))}
          </div>
        )}
        {task.box && <div className="rounded-lg border-2 border-dashed border-[#9ca3af]" style={{ height: `${task.box}mm` }} />}
        {task.lines && <Lines n={task.lines} />}
      </div>
    </section>
  );
}

function SideBox({ Icon, title, color, children }: { Icon: LucideIcon; title: string; color: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border-2 p-3" style={{ borderColor: color }}>
      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
        <Icon aria-hidden="true" className="h-4 w-4" />
        {title}
      </p>
      {children}
    </div>
  );
}

function TopicPage({ i, topic, tr }: { i: number; topic: Topic; tr: (s: string) => string }) {
  const color = COLORS[i];
  return (
    <div className="grid gap-[3.5mm] text-[#111827]">
      <div className="flex items-stretch gap-3">
        <div className="flex w-[22mm] shrink-0 flex-col items-center justify-center rounded-xl text-white" style={{ background: color }}>
          <span className="text-[10px] font-bold uppercase tracking-wider">{tr('Tema')}</span>
          <span className="text-[28px] leading-none font-extrabold">{i + 1}</span>
        </div>
        <div className="flex-1 rounded-xl px-3 py-2" style={{ background: `${color}14` }}>
          <p className="text-[19px] leading-tight font-extrabold">{tr(topic.title)}</p>
          <p className="mt-1 text-[14px] font-semibold" style={{ color }}>
            {tr('Pravilo pisaca:')} {tr(topic.rule)}
          </p>
        </div>
      </div>
      <p className="text-[14px] leading-snug">{tr(topic.explain)}</p>
      <div className="grid grid-cols-[3fr_2fr] gap-3">
        <SideBox Icon={Feather} title={tr('Iz radionice')} color={color}>
          {topic.example.map((line) => (
            <p key={line} className="text-[13.5px] leading-snug italic">
              {tr(line)}
            </p>
          ))}
        </SideBox>
        <SideBox Icon={BookOpen} title={tr('Pročitaj')} color={color}>
          <p className="text-[13px] font-bold leading-tight">„{tr(topic.read.book)}“</p>
          <p className="text-[11.5px] text-[#4b5563]">{tr(topic.read.author)}</p>
          <p className="mt-1 text-[12px] leading-snug">{tr(topic.read.why)}</p>
        </SideBox>
      </div>
      <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider" style={{ color }}>
        <PenLine aria-hidden="true" className="h-4 w-4" />
        {tr('Vježbe')}
      </p>
      <div className="grid gap-[3mm]">
        {topic.tasks.map((task, n) => (
          <TaskView key={task.text} n={n + 1} task={task} tr={tr} />
        ))}
      </div>
    </div>
  );
}

function IntroPage({ tr }: { tr: (s: string) => string }) {
  return (
    <div className="grid gap-[5mm] text-[#111827]">
      <div className="rounded-2xl border-2 border-[#4f46e5] bg-[#eef2ff] p-4 text-[14.5px] leading-snug">
        <p className="text-[18px] font-extrabold">{tr('Dobro došao/la na putovanje kroz priču!')}</p>
        <p className="mt-2">
          {tr(
            'Svaka priča koju si ikad pročitao/la nastala je tako što je neko sjeo i počeo da piše. Ni najveći pisci nisu odmah znali sve — učili su korak po korak, baš kao što ćeš ti.',
          )}
        </p>
        <p className="mt-2">
          {tr(
            'Ovaj priručnik ima 12 stanica. Na svakoj te čeka jedno pravilo kojeg se drže pisci, primjer iz naše radionice, knjiga u kojoj to pravilo možeš prepoznati i vježbe za tvoju olovku. Na kraju ćeš napraviti plan i napisati svoju priču.',
          )}
        </p>
      </div>
      <div>
        <p className="mb-2 text-[13px] font-bold uppercase tracking-wider text-[#4f46e5]">{tr('Mapa putovanja')}</p>
        <ol className="grid grid-cols-2 gap-x-6 gap-y-[2.5mm] text-[14px]">
          {TOPICS.map((t, i) => (
            <li key={t.title} className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: COLORS[i] }}>
                {i + 1}
              </span>
              <span className="flex-1">{tr(t.title)}</span>
              <span className="h-4 w-4 rounded border-2 border-[#111827]" />
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[12px] text-[#4b5563]">{tr('Kad završiš stanicu, štikliraj kvadratić.')}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-[13px] leading-snug">
        <div className="rounded-xl border-2 border-dashed border-[#6b7280] p-3">
          <p className="font-bold">{tr('Savjeti za pisca')}</p>
          <ul className="mt-1 list-disc pl-5">
            <li>{tr('Pisanje je kao vožnja bicikla: što češće, to lakše.')}</li>
            <li>{tr('Prvo piši slobodno, a pravopis provjeri na kraju.')}</li>
            <li>{tr('Čitaj naglas ono što si napisao/la.')}</li>
            <li>{tr('Nosi sa sobom svesku za ideje.')}</li>
          </ul>
        </div>
        <div className="rounded-xl border-2 border-dashed border-[#6b7280] p-3">
          <p className="font-bold">{tr('Za učitelje i roditelje')}</p>
          <ul className="mt-1 list-disc pl-5">
            <li>{tr('Za 3, 4. i 5. razred; jedna tema je jedan čas ili jedno vježbanje kod kuće.')}</li>
            <li>{tr('Primjeri „Iz radionice“ pisani su za ovaj priručnik.')}</li>
            <li>{tr('Knjige iz rubrike „Pročitaj“ su preporuka za lektiru i porodično čitanje.')}</li>
          </ul>
        </div>
      </div>
      <div className="rounded-xl border-2 border-[#111827] p-3 text-[14px]">
        <p className="font-bold">{tr('Moja pisačka iskaznica')}</p>
        <div className="mt-1 grid grid-cols-2 gap-x-6">
          {['Pisac/spisateljica:', 'Razred:', 'Moja omiljena knjiga:', 'Najviše volim da pišem o:'].map((f) => (
            <div key={f} className="flex h-[9mm] items-end border-b border-[#9ca3af] pb-0.5 text-[13px] font-semibold">
              {tr(f)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PLAN: [string, number][] = [
  ['Naslov (može i na kraju):', 1],
  ['Junak — ko je i šta najviše želi:', 2],
  ['Mjesto i vrijeme radnje:', 1],
  ['Početak — moja udica:', 2],
  ['Problem:', 1],
  ['Prepreke (bar dvije):', 3],
  ['Vrhunac — najnapetiji trenutak:', 2],
  ['Kraj — kako se problem rješava:', 2],
  ['Ko priča priču (junak ili neko sa strane):', 1],
];

function PlanPage({ tr }: { tr: (s: string) => string }) {
  return (
    <div className="grid gap-[2.5mm] text-[#111827]">
      <div className="rounded-xl bg-[#eef2ff] px-3 py-2">
        <p className="text-[19px] font-extrabold">{tr('Plan moje priče')}</p>
        <p className="text-[13.5px]">{tr('Prije pisanja popuni plan. Ne moraš pisati cijele rečenice — dovoljne su bilješke.')}</p>
      </div>
      {PLAN.map(([label, n]) => (
        <div key={label}>
          <p className="text-[14px] font-semibold">{tr(label)}</p>
          <Lines n={n} />
        </div>
      ))}
    </div>
  );
}

const CHECKLIST = [
  'Moj junak nešto želi.',
  'Prva rečenica je udica.',
  'Čitalac zna gdje i kada se priča dešava.',
  'Upotrijebio/la sam bar tri čula.',
  'Osjećaje pokazujem, a ne samo imenujem.',
  'Junak ima problem i prepreke.',
  'Vrhunac je napet i usporen.',
  'Razgovor likova je pod navodnicima.',
  'Kraj rješava problem sa početka.',
  'Pročitao/la sam priču naglas i popravio/la je.',
];

function StoryPage({ tr }: { tr: (s: string) => string }) {
  return (
    <div className="grid gap-[3mm] text-[#111827]">
      <p className="text-[19px] font-extrabold">{tr('Moja priča')}</p>
      <div className="flex h-[9mm] items-end border-b-2 border-[#111827] pb-0.5 text-[14px] font-semibold">{tr('Naslov:')}</div>
      <Lines n={17} />
      <div className="rounded-xl border-2 border-[#16a34a] p-3">
        <p className="mb-1 text-[13px] font-bold uppercase tracking-wider text-[#16a34a]">{tr('Provjeri prije nego što predaš')}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[12.5px]">
          {CHECKLIST.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-2 border-[#111827]" />
              {tr(c)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function writingHandbookPages(script: Script): ReactNode[] {
  const tr = script === 'cyr' ? toCyrillic : (s: string) => s;
  return [
    <IntroPage key="intro" tr={tr} />,
    ...TOPICS.map((topic, i) => <TopicPage key={topic.title} i={i} topic={topic} tr={tr} />),
    <PlanPage key="plan" tr={tr} />,
    <StoryPage key="story" tr={tr} />,
  ];
}
