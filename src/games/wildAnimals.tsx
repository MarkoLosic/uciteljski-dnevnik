// Bojanka „Divlje životinje“: naslovna strana, 12 životinja (svaka sa imenom i zanimljivošću) i strana
// za crtanje. Svi crteži su naši (SVG u kodu), da bojanka ne zavisi od tuđih ilustracija.
// Vodeni žig sajta je ispod crteža: vidi se u praznom prostoru, a životinje (bijela ispuna) ga pokrivaju.
import type { ReactNode, SVGProps } from 'react';
import { siteConfig } from '../config/site';
import type { Dictionary } from '../i18n/dictionaries';

type Labels = Dictionary['games']['worksheet']['labels'];

export const WILD_ANIMALS = [
  'bear',
  'giraffe',
  'owl',
  'lion',
  'hedgehog',
  'zebra',
  'wolf',
  'crocodile',
  'squirrel',
  'elephant',
  'penguin',
  'monkey',
] as const;

export type WildAnimal = (typeof WILD_ANIMALS)[number];

const INK = '#111827';
const SIZE = 600;
const O = { fill: '#fff', stroke: INK, strokeWidth: 4, strokeLinejoin: 'round', strokeLinecap: 'round' } as const satisfies SVGProps<SVGElement>;
const T = { fill: 'none', stroke: INK, strokeWidth: 2.5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const satisfies SVGProps<SVGElement>;
const TF = { ...T, fill: '#fff' } as const;

// ---------- zajednički dijelovi ----------

function Eye({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={INK} />
      <circle cx={x + r * 0.35} cy={y - r * 0.38} r={r * 0.34} fill="#fff" />
    </g>
  );
}

// Krug sa izbočinama (griva, krošnja, oblak).
function wavyCircle(cx: number, cy: number, r: number, amp: number, n: number): string {
  const pt = (a: number, rr: number) => `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
  let d = `M${pt(0, r)}`;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = ((i + 1) / n) * Math.PI * 2;
    d += ` Q${pt((a0 + a1) / 2, r + amp * 2)} ${pt(a1, r)}`;
  }
  return `${d} Z`;
}

function Cloud({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M-60 15 Q-75 15 -72 0 Q-70 -15 -50 -12 Q-45 -35 -20 -32 Q-5 -50 18 -38 Q40 -45 48 -22 Q72 -22 70 0 Q72 15 55 15 Z"
      {...T}
      fill="#fff"
    />
  );
}

function Sun({ x, y, r = 34 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={x + Math.cos(a) * (r + 8)}
            y1={y + Math.sin(a) * (r + 8)}
            x2={x + Math.cos(a) * (r + 22)}
            y2={y + Math.sin(a) * (r + 22)}
            {...T}
          />
        );
      })}
      <circle cx={x} cy={y} r={r} {...T} fill="#fff" />
    </g>
  );
}

function Grass({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${s})`} d="M-14 0 Q-12 -14 -18 -26 M0 0 Q0 -18 -2 -34 M14 0 Q12 -14 18 -26" {...T} />;
}

function Pine({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x={-9} y={-30} width={18} height={30} {...TF} />
      <path d="M-55 -30 L0 -95 L55 -30 Z" {...TF} />
      <path d="M-45 -70 L0 -135 L45 -70 Z" {...TF} />
      <path d="M-34 -110 L0 -165 L34 -110 Z" {...TF} />
    </g>
  );
}

function Leaf({ x, y, a, s = 1 }: { x: number; y: number; a: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d="M0 0 Q20 -22 48 0 Q20 22 0 0 Z" {...TF} />
      <path d="M4 0 L40 0" {...T} />
    </g>
  );
}

function Star({ x, y, r = 10 }: { x: number; y: number; r?: number }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 === 0 ? r : r * 0.45;
    return `${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`;
  }).join(' ');
  return <polygon points={pts} {...TF} />;
}

function Ground({ y = 512 }: { y?: number }) {
  return <path d={`M8 ${y + 6} Q160 ${y - 10} 300 ${y} T592 ${y - 4}`} {...T} strokeWidth={3} />;
}

function Watermark() {
  const text = `www.${siteConfig.name}`;
  return (
    <g fill="#9ca3af" opacity={0.28} fontFamily="'Space Grotesk', sans-serif" fontSize={26} fontWeight={700} textAnchor="middle">
      <g transform="rotate(-28 300 300)">
        {[150, 320, 490].map((y) => (
          <text key={y} x={300} y={y}>
            {text}
          </text>
        ))}
      </g>
    </g>
  );
}

function Frame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block w-full" role="img" aria-label={label}>
      <rect x={6} y={6} width={588} height={588} rx={22} fill="#fff" stroke={INK} strokeWidth={3} />
      <Watermark />
      {children}
      <text x={580} y={586} textAnchor="end" fontSize={11} fill="#6b7280">
        © {siteConfig.author.name} · www.{siteConfig.name}
      </text>
    </svg>
  );
}

function Name({ text }: { text: string }) {
  return (
    <text
      x={300}
      y={568}
      textAnchor="middle"
      fontFamily="'Space Grotesk', sans-serif"
      fontSize={48}
      fontWeight={700}
      letterSpacing={3}
      fill="#fff"
      stroke={INK}
      strokeWidth={2.2}
      strokeLinejoin="round"
    >
      {text}
    </text>
  );
}

// ---------- životinje (bez pozadine, da se mogu ponovo koristiti na naslovnoj strani) ----------

function Bear() {
  return (
    <g>
      <ellipse cx={190} cy={385} rx={32} ry={62} transform="rotate(22 190 385)" {...O} />
      <ellipse cx={410} cy={385} rx={32} ry={62} transform="rotate(-22 410 385)" {...O} />
      <ellipse cx={300} cy={400} rx={130} ry={118} {...O} />
      <ellipse cx={300} cy={420} rx={72} ry={78} {...T} />
      <ellipse cx={218} cy={490} rx={52} ry={32} {...O} />
      <ellipse cx={382} cy={490} rx={52} ry={32} {...O} />
      {[218, 382].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={496} rx={20} ry={14} {...TF} />
          <circle cx={x - 22} cy={474} r={7} {...TF} />
          <circle cx={x} cy={468} r={7} {...TF} />
          <circle cx={x + 22} cy={474} r={7} {...TF} />
        </g>
      ))}
      <circle cx={222} cy={150} r={34} {...O} />
      <circle cx={378} cy={150} r={34} {...O} />
      <circle cx={222} cy={150} r={17} {...T} />
      <circle cx={378} cy={150} r={17} {...T} />
      <circle cx={300} cy={230} r={96} {...O} />
      <ellipse cx={300} cy={268} rx={46} ry={36} {...O} />
      <ellipse cx={300} cy={252} rx={17} ry={12} fill={INK} />
      <path d="M300 264 L300 276 M284 282 Q300 294 316 282" {...T} />
      <Eye x={262} y={212} r={12} />
      <Eye x={338} y={212} r={12} />
      <path d="M248 188 Q262 180 276 188 M324 188 Q338 180 352 188" {...T} />
    </g>
  );
}

// Griva uz zadnju ivicu vrata (od glave prema tijelu), zupci na lijevu stranu.
function giraffeMane(): string {
  const [x0, y0, x1, y1] = [370, 166, 306, 330];
  const n = 9;
  const len = Math.hypot(x1 - x0, y1 - y0);
  const [nx, ny] = [-(y1 - y0) / len, (x1 - x0) / len];
  let d = `M${x0} ${y0}`;
  for (let i = 1; i <= n; i++) {
    const tm = (i - 0.5) / n;
    const t = i / n;
    d += ` L${(x0 + (x1 - x0) * tm - nx * 12).toFixed(1)} ${(y0 + (y1 - y0) * tm - ny * 12).toFixed(1)}`;
    d += ` L${(x0 + (x1 - x0) * t).toFixed(1)} ${(y0 + (y1 - y0) * t).toFixed(1)}`;
  }
  return d;
}

function Giraffe() {
  const spots: [number, number, number, number][] = [
    [200, 352, 20, 14],
    [252, 340, 22, 15],
    [305, 362, 18, 13],
    [222, 395, 17, 12],
    [280, 398, 16, 11],
    [168, 378, 13, 10],
  ];
  const neckSpots: [number, number, number][] = [
    [338, 318, 10],
    [354, 272, 10],
    [370, 228, 9],
    [383, 190, 8],
  ];
  return (
    <g>
      <path d="M150 360 Q122 400 132 446" {...T} strokeWidth={4} />
      <path d="M132 446 l-8 18 l10 -6 l4 12 l6 -12 l8 6 z" {...TF} />
      {[178, 222, 292, 334].map((x) => (
        <g key={x}>
          <rect x={x} y={395} width={24} height={115} rx={10} {...O} />
          <path d={`M${x} 494 L${x + 24} 494`} {...T} />
        </g>
      ))}
      <path d="M298 350 L372 158 L414 172 L352 382 Z" {...O} />
      <path d={giraffeMane()} {...T} />
      <ellipse cx={250} cy={368} rx={112} ry={62} {...O} />
      {spots.map(([x, y, rx, ry]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(-12 ${x} ${y})`} {...TF} />
      ))}
      {neckSpots.map(([x, y, r]) => (
        <ellipse key={y} cx={x} cy={y} rx={r} ry={r * 0.8} {...TF} />
      ))}
      <path d="M406 124 L398 86 M426 120 L426 82" {...T} strokeWidth={4} />
      <circle cx={398} cy={82} r={8} {...O} />
      <circle cx={426} cy={78} r={8} {...O} />
      <ellipse cx={384} cy={128} rx={20} ry={9} transform="rotate(-25 384 128)" {...O} />
      <ellipse cx={428} cy={150} rx={50} ry={31} transform="rotate(18 428 150)" {...O} />
      <ellipse cx={466} cy={168} rx={22} ry={19} {...O} />
      <ellipse cx={472} cy={162} rx={3.5} ry={5} fill={INK} />
      <path d="M456 182 Q466 188 476 182" {...T} />
      <Eye x={430} y={140} r={8} />
    </g>
  );
}

function Owl() {
  return (
    <g>
      <path d="M208 220 L196 148 L258 192 Z" {...O} />
      <path d="M392 220 L404 148 L342 192 Z" {...O} />
      <ellipse cx={300} cy={320} rx={125} ry={145} {...O} />
      <path d="M180 290 Q148 390 214 452 Q200 380 206 296 Z" {...O} />
      <path d="M420 290 Q452 390 386 452 Q400 380 394 296 Z" {...O} />
      <ellipse cx={300} cy={385} rx={78} ry={78} {...O} />
      {[
        [270, 350],
        [300, 350],
        [330, 350],
        [255, 385],
        [285, 385],
        [315, 385],
        [345, 385],
        [270, 420],
        [300, 420],
        [330, 420],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x - 10} ${y} Q${x} ${y + 12} ${x + 10} ${y}`} {...T} />
      ))}
      <circle cx={255} cy={262} r={50} {...O} />
      <circle cx={345} cy={262} r={50} {...O} />
      <circle cx={255} cy={262} r={28} {...T} />
      <circle cx={345} cy={262} r={28} {...T} />
      <Eye x={255} y={262} r={17} />
      <Eye x={345} y={262} r={17} />
      <path d="M286 298 L314 298 L300 330 Z" {...O} strokeWidth={3} />
    </g>
  );
}

function Lion() {
  return (
    <g>
      <path d="M392 470 C462 474 500 430 484 386" {...T} strokeWidth={6} />
      <path d={wavyCircle(482, 374, 13, 4, 7)} {...O} strokeWidth={3} />
      <path d="M214 504 C196 404 238 330 300 330 C362 330 404 404 386 504 Z" {...O} />
      <ellipse cx={226} cy={490} rx={46} ry={26} {...O} />
      <ellipse cx={374} cy={490} rx={46} ry={26} {...O} />
      <rect x={254} y={392} width={42} height={118} rx={18} {...O} />
      <rect x={304} y={392} width={42} height={118} rx={18} {...O} />
      <path d="M268 496 L268 510 M282 496 L282 510 M318 496 L318 510 M332 496 L332 510" {...T} />
      <path d={wavyCircle(300, 218, 118, 9, 14)} {...O} />
      <path d={wavyCircle(300, 218, 98, 5, 14)} {...T} />
      <circle cx={232} cy={146} r={24} {...O} />
      <circle cx={368} cy={146} r={24} {...O} />
      <circle cx={232} cy={146} r={11} {...T} />
      <circle cx={368} cy={146} r={11} {...T} />
      <circle cx={300} cy={226} r={80} {...O} />
      <ellipse cx={283} cy={264} rx={23} ry={18} {...O} />
      <ellipse cx={317} cy={264} rx={23} ry={18} {...O} />
      <path d="M287 242 Q300 236 313 242 Q314 254 300 258 Q286 254 287 242 Z" fill={INK} />
      {[
        [276, 262],
        [270, 270],
        [282, 272],
        [324, 262],
        [330, 270],
        [318, 272],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={INK} />
      ))}
      <path d="M292 284 Q300 296 308 284" {...T} />
      <Eye x={270} y={208} r={11} />
      <Eye x={330} y={208} r={11} />
      <path d="M256 186 Q270 178 284 186 M316 186 Q330 178 344 186" {...T} />
    </g>
  );
}

function Hedgehog() {
  const cx = 330;
  const cy = 402;
  const rx = 150;
  const ry = 112;
  const n = 15;
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = Math.PI * (1.04 + (0.92 * i) / n);
    const base = `${(cx + rx * Math.cos(a)).toFixed(1)} ${(cy + ry * Math.sin(a)).toFixed(1)}`;
    d += i === 0 ? `M${base}` : ` L${base}`;
    if (i < n) {
      const t = Math.PI * (1.04 + (0.92 * (i + 0.5)) / n);
      d += ` L${(cx + rx * 1.24 * Math.cos(t)).toFixed(1)} ${(cy + ry * 1.3 * Math.sin(t)).toFixed(1)}`;
    }
  }
  return (
    <g>
      <ellipse cx={330} cy={432} rx={146} ry={30} {...O} />
      <path d={`${d} Z`} {...O} />
      {[210, 260, 310, 360, 410].map((x, i) => (
        <path key={x} d={`M${x} ${360 - (i % 2) * 18} l14 -26 M${x + 18} ${388 - (i % 2) * 10} l12 -24`} {...T} />
      ))}
      <path d="M276 350 Q205 346 150 398 Q138 412 152 420 Q200 446 290 440 Q304 396 276 350 Z" {...O} />
      <circle cx={146} cy={408} r={9} fill={INK} />
      <Eye x={206} y={388} r={8} />
      <path d="M232 362 Q246 352 252 368" {...T} />
      <path d="M168 424 Q182 430 194 424" {...T} />
      {[240, 320, 400].map((x) => (
        <ellipse key={x} cx={x} cy={458} rx={18} ry={9} {...O} strokeWidth={3} />
      ))}
      <circle cx={350} cy={256} r={26} {...O} />
      <path d="M350 232 Q352 220 360 214" {...T} strokeWidth={3} />
      <Leaf x={354} y={222} a={-30} s={0.5} />
    </g>
  );
}

function Zebra() {
  const stripesBody = [168, 196, 224, 252, 280, 308, 336];
  return (
    <g>
      <defs>
        <clipPath id="zebra-body">
          <ellipse cx={262} cy={360} rx={125} ry={68} />
        </clipPath>
        <clipPath id="zebra-neck">
          <path d="M330 330 L392 226 L442 250 L386 372 Z" />
        </clipPath>
      </defs>
      <path d="M140 350 Q116 392 124 432" {...T} strokeWidth={4} />
      <path d="M124 432 l-8 18 l10 -6 l4 12 l6 -12 l8 6 z" {...TF} />
      {[176, 220, 290, 334].map((x) => (
        <g key={x}>
          <rect x={x} y={390} width={26} height={120} rx={10} {...O} />
          {[420, 442, 464].map((y) => (
            <path key={y} d={`M${x + 2} ${y} L${x + 24} ${y - 6}`} {...T} strokeWidth={5} />
          ))}
          <rect x={x} y={494} width={26} height={16} rx={4} fill={INK} />
        </g>
      ))}
      <path d="M330 330 L392 226 L442 250 L386 372 Z" {...O} />
      <g clipPath="url(#zebra-neck)">
        {[250, 280, 310, 340].map((y) => (
          <path key={y} d={`M330 ${y + 30} Q390 ${y - 10} 450 ${y - 20}`} {...T} strokeWidth={8} />
        ))}
      </g>
      <path d="M392 222 l-6 -14 l-8 12 l-6 -14 l-8 14 l-6 -12 l-8 16 l-6 -12 l-8 18 l-6 -12 l-8 20 l-6 -12 l-8 22" {...T} />
      <ellipse cx={262} cy={360} rx={125} ry={68} {...O} />
      <g clipPath="url(#zebra-body)">
        {stripesBody.map((x) => (
          <path key={x} d={`M${x} 286 Q${x + 18} 360 ${x} 436`} {...T} strokeWidth={9} />
        ))}
      </g>
      <ellipse cx={262} cy={360} rx={125} ry={68} {...T} strokeWidth={4} />
      <path d="M418 206 L404 168 L434 196 Z" {...O} strokeWidth={3} />
      <path d="M408 210 Q440 186 466 214 L502 284 Q508 306 486 312 Q464 316 454 300 L414 246 Q398 226 408 210 Z" {...O} />
      <path d="M426 252 Q446 240 462 232 M438 270 Q458 258 476 252" {...T} strokeWidth={6} />
      <ellipse cx={486} cy={296} rx={20} ry={16} {...O} />
      <ellipse cx={490} cy={292} rx={3.5} ry={5} fill={INK} />
      <Eye x={444} y={228} r={8} />
    </g>
  );
}

function Wolf() {
  return (
    <g>
      <path d="M368 474 Q478 474 474 378 Q470 330 432 350 Q446 420 358 440 Z" {...O} />
      <path d="M440 380 l14 -6 M446 410 l16 -2" {...T} />
      <path d="M218 504 Q204 384 262 330 L338 330 Q396 384 382 504 Z" {...O} />
      <path d="M268 340 L282 380 L294 346 L306 384 L318 346 L332 380" {...T} />
      <ellipse cx={228} cy={492} rx={40} ry={22} {...O} />
      <ellipse cx={372} cy={492} rx={40} ry={22} {...O} />
      <rect x={262} y={404} width={34} height={106} rx={15} {...O} />
      <rect x={304} y={404} width={34} height={106} rx={15} {...O} />
      <path d="M276 498 L276 510 M318 498 L318 510" {...T} />
      <path d="M234 182 L224 92 L290 150 Z" {...O} />
      <path d="M366 182 L376 92 L310 150 Z" {...O} />
      <path d="M240 160 L236 118 L268 150 M360 160 L364 118 L332 150" {...T} />
      <path
        d="M220 232 Q214 172 262 150 L300 144 L338 150 Q386 172 380 232 Q398 262 360 278 Q330 302 300 302 Q270 302 240 278 Q202 262 220 232 Z"
        {...O}
      />
      <path d="M268 226 Q300 208 332 226 Q348 272 300 292 Q252 272 268 226 Z" {...T} />
      <Eye x={262} y={214} r={10} />
      <Eye x={338} y={214} r={10} />
      <path d="M248 198 Q262 190 276 198 M324 198 Q338 190 352 198" {...T} />
      <ellipse cx={300} cy={244} rx={15} ry={10} fill={INK} />
      <path d="M300 254 L300 266 M286 270 Q300 278 314 270" {...T} />
    </g>
  );
}

function Crocodile() {
  const scutes: [number, number][] = [
    [312, 284],
    [344, 283],
    [376, 286],
    [408, 292],
    [440, 302],
    [470, 314],
    [500, 324],
    [530, 330],
  ];
  return (
    <g>
      <path d="M210 372 L192 432 L240 434 L246 378 Z" {...O} />
      <path d="M386 384 L370 440 L418 442 L424 388 Z" {...O} />
      {[198, 214, 230, 376, 392, 408].map((x) => (
        <circle key={x} cx={x} cy={436} r={7} {...O} strokeWidth={3} />
      ))}
      {scutes.map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={12} {...O} strokeWidth={3} />
      ))}
      <path
        d="M92 336 Q88 314 116 312 L232 300 Q262 270 302 284 Q402 280 472 318 Q522 344 578 330 Q542 372 472 382 Q402 400 302 396 L232 390 Q150 386 110 362 Q90 352 92 336 Z"
        {...O}
      />
      <path d="M108 350 Q170 362 240 352" {...T} />
      {[124, 146, 168, 190, 212].map((x) => (
        <path key={x} d={`M${x} 352 L${x + 6} 364 L${x + 12} 353`} {...TF} strokeWidth={2} />
      ))}
      {[270, 300, 330, 360, 390, 420, 450].map((x) => (
        <path key={x} d={`M${x} 374 L${x - 4} 392`} {...T} />
      ))}
      <circle cx={112} cy={322} r={4} fill={INK} />
      <circle cx={252} cy={284} r={21} {...O} />
      <Eye x={255} y={284} r={9} />
    </g>
  );
}

function Squirrel() {
  return (
    <g>
      <path d="M326 446 Q474 452 474 330 Q474 226 402 198 Q346 186 356 240 Q420 250 420 322 Q420 392 330 402 Z" {...O} />
      <path d="M430 280 l18 -8 M440 320 l20 0 M432 362 l18 8 M404 226 l10 -16" {...T} />
      <path d="M238 452 Q212 360 268 322 Q322 300 342 362 Q362 432 330 454 Z" {...O} />
      <ellipse cx={288} cy={402} rx={30} ry={44} {...T} />
      <ellipse cx={252} cy={456} rx={26} ry={12} {...O} />
      <ellipse cx={322} cy={456} rx={26} ry={12} {...O} />
      <path d="M236 230 L226 176 L264 214 Z M288 220 L300 168 L314 224 Z" {...O} />
      <circle cx={268} cy={268} r={56} {...O} />
      <ellipse cx={224} cy={286} rx={26} ry={20} {...O} />
      <ellipse cx={208} cy={280} rx={7} ry={5} fill={INK} />
      <path d="M212 296 Q222 302 232 296" {...T} />
      <Eye x={254} y={258} r={10} />
      <ellipse cx={278} cy={292} rx={12} ry={8} {...T} />
      <ellipse cx={246} cy={362} rx={18} ry={22} {...O} />
      <path d="M232 344 Q246 330 262 344 Z" {...O} strokeWidth={3} />
      <path d="M246 332 L248 324" {...T} />
      <ellipse cx={266} cy={360} rx={12} ry={18} transform="rotate(20 266 360)" {...O} strokeWidth={3} />
    </g>
  );
}

function Elephant() {
  return (
    <g>
      <rect x={192} y={410} width={52} height={96} rx={18} {...O} />
      <rect x={356} y={410} width={52} height={96} rx={18} {...O} />
      <ellipse cx={300} cy={392} rx={124} ry={96} {...O} />
      {[240, 308].map((x) => (
        <g key={x}>
          <rect x={x} y={420} width={52} height={92} rx={18} {...O} />
          <path d={`M${x + 8} 512 Q${x + 14} 500 ${x + 22} 512 M${x + 30} 512 Q${x + 37} 500 ${x + 44} 512`} {...T} />
        </g>
      ))}
      <ellipse cx={192} cy={236} rx={78} ry={96} {...O} />
      <ellipse cx={408} cy={236} rx={78} ry={96} {...O} />
      <ellipse cx={200} cy={240} rx={50} ry={66} {...T} />
      <ellipse cx={400} cy={240} rx={50} ry={66} {...T} />
      <circle cx={300} cy={228} r={86} {...O} />
      <path d="M264 288 Q252 318 274 330 L280 300 Z" {...O} strokeWidth={3} />
      <path d="M336 288 Q348 318 326 330 L320 300 Z" {...O} strokeWidth={3} />
      <path d="M276 262 Q270 360 302 402 Q322 426 346 410 Q356 398 340 392 Q322 400 312 380 Q302 350 324 262 Z" {...O} />
      {[300, 326, 352].map((y, i) => (
        <path key={y} d={`M${280 + i * 4} ${y} Q${300} ${y + 8} ${318 - i * 2} ${y - 2}`} {...T} />
      ))}
      <Eye x={264} y={214} r={10} />
      <Eye x={336} y={214} r={10} />
      <path d="M250 194 Q264 186 278 194 M322 194 Q336 186 350 194" {...T} />
      <circle cx={246} cy={246} r={10} {...T} />
      <circle cx={354} cy={246} r={10} {...T} />
    </g>
  );
}

function Penguin() {
  return (
    <g>
      <ellipse cx={266} cy={478} rx={30} ry={12} {...O} />
      <ellipse cx={334} cy={478} rx={30} ry={12} {...O} />
      <path d="M194 292 Q146 362 182 424 Q204 384 210 302 Z" {...O} />
      <path d="M406 292 Q454 362 418 424 Q396 384 390 302 Z" {...O} />
      <ellipse cx={300} cy={325} rx={112} ry={150} {...O} />
      <ellipse cx={300} cy={360} rx={76} ry={112} {...O} />
      <path d="M300 214 Q262 178 240 228 Q240 270 300 286 Q360 270 360 228 Q338 178 300 214 Z" {...O} />
      <Eye x={276} y={234} r={10} />
      <Eye x={324} y={234} r={10} />
      <path d="M284 254 L316 254 L300 280 Z" {...O} strokeWidth={3} />
      <path d="M284 254 L316 254" {...T} />
      <circle cx={258} cy={264} r={9} {...T} />
      <circle cx={342} cy={264} r={9} {...T} />
    </g>
  );
}

function Monkey() {
  return (
    <g>
      <path d="M356 446 Q470 456 470 362 Q470 300 426 304 Q394 314 408 344 Q428 366 446 346" {...T} strokeWidth={7} />
      <path d="M238 478 Q222 364 300 348 Q378 364 362 478 Z" {...O} />
      <ellipse cx={300} cy={420} rx={42} ry={46} {...T} />
      <ellipse cx={262} cy={404} rx={16} ry={22} transform="rotate(-30 262 404)" {...O} strokeWidth={3} />
      <ellipse cx={338} cy={404} rx={16} ry={22} transform="rotate(30 338 404)" {...O} strokeWidth={3} />
      <ellipse cx={256} cy={482} rx={32} ry={14} {...O} />
      <ellipse cx={344} cy={482} rx={32} ry={14} {...O} />
      <circle cx={210} cy={234} r={32} {...O} />
      <circle cx={390} cy={234} r={32} {...O} />
      <circle cx={210} cy={234} r={18} {...T} />
      <circle cx={390} cy={234} r={18} {...T} />
      <circle cx={300} cy={232} r={86} {...O} />
      <path d="M300 208 Q274 172 246 192 Q220 216 240 252 Q252 292 300 302 Q348 292 360 252 Q380 216 354 192 Q326 172 300 208 Z" {...O} />
      <Eye x={270} y={228} r={11} />
      <Eye x={330} y={228} r={11} />
      <circle cx={293} cy={260} r={3} fill={INK} />
      <circle cx={307} cy={260} r={3} fill={INK} />
      <path d="M276 274 Q300 294 324 274" {...T} />
    </g>
  );
}

const ANIMALS: Record<WildAnimal, () => ReactNode> = {
  bear: Bear,
  giraffe: Giraffe,
  owl: Owl,
  lion: Lion,
  hedgehog: () => (
    <g transform="translate(-24 0)">
      <Hedgehog />
    </g>
  ),
  zebra: Zebra,
  wolf: Wolf,
  crocodile: Crocodile,
  squirrel: Squirrel,
  elephant: Elephant,
  penguin: Penguin,
  monkey: Monkey,
};

// ---------- pozadine ----------

const SCENES: Record<WildAnimal, () => ReactNode> = {
  bear: () => (
    <g>
      <Ground />
      <Pine x={80} y={500} s={1.1} />
      <Pine x={520} y={500} s={1.2} />
      <Pine x={470} y={505} s={0.7} />
      <Cloud x={300} y={60} s={0.8} />
    </g>
  ),
  giraffe: () => (
    <g>
      <Ground />
      <path d="M104 512 L112 300 Q108 250 92 220 M112 300 Q130 260 160 236" {...T} strokeWidth={5} />
      <ellipse cx={110} cy={200} rx={88} ry={26} {...TF} />
      <ellipse cx={168} cy={222} rx={56} ry={18} {...TF} />
      <Sun x={520} y={90} r={30} />
      <Grass x={250} y={514} />
      <Grass x={540} y={508} />
    </g>
  ),
  owl: () => (
    <g>
      <path d="M492 60 A48 48 0 1 0 540 136 A38 38 0 1 1 492 60 Z" {...TF} />
      <Star x={90} y={80} />
      <Star x={150} y={150} r={7} />
      <Star x={420} y={110} r={8} />
      <Star x={510} y={220} r={7} />
      <path d="M30 458 Q300 440 572 470 L572 492 Q300 462 30 482 Z" {...O} />
      <Leaf x={40} y={470} a={-160} s={0.9} />
      <Leaf x={520} y={478} a={-20} s={0.9} />
      <Leaf x={470} y={484} a={30} s={0.8} />
      {[262, 284, 316, 338].map((x) => (
        <path key={x} d={`M${x} 452 l-4 14 M${x} 452 l0 16 M${x} 452 l4 14`} {...T} strokeWidth={3} />
      ))}
    </g>
  ),
  lion: () => (
    <g>
      <Ground />
      <Sun x={90} y={90} r={30} />
      <Cloud x={480} y={80} s={0.8} />
      <Grass x={70} y={510} />
      <Grass x={140} y={506} s={0.8} />
      <Grass x={470} y={506} s={0.8} />
      <Grass x={540} y={506} />
    </g>
  ),
  hedgehog: () => (
    <g>
      <Ground y={470} />
      <path d="M530 470 L536 436 L554 436 L560 470 Z" {...TF} />
      <path d="M502 438 Q545 380 588 438 Z" {...O} strokeWidth={3} />
      {[
        [530, 418],
        [552, 406],
        [568, 424],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={7} {...T} />
      ))}
      <Leaf x={80} y={480} a={-10} />
      <Leaf x={140} y={496} a={20} s={0.8} />
      <Leaf x={420} y={500} a={-30} s={0.8} />
      <Cloud x={130} y={110} s={0.9} />
      <Cloud x={460} y={150} s={0.7} />
    </g>
  ),
  zebra: () => (
    <g>
      <Ground />
      <Sun x={90} y={90} r={28} />
      <path d={wavyCircle(520, 470, 40, 6, 9)} {...TF} />
      <Grass x={60} y={510} />
      <Grass x={420} y={512} s={0.8} />
    </g>
  ),
  wolf: () => (
    <g>
      <circle cx={480} cy={110} r={52} {...TF} />
      <circle cx={462} cy={96} r={10} {...T} />
      <circle cx={496} cy={128} r={7} {...T} />
      <path d="M8 360 L120 230 L210 330 L290 250 L400 380 L480 300 L592 400" {...T} />
      <Ground />
      <Pine x={90} y={505} s={0.9} />
      <Pine x={520} y={505} s={0.8} />
      <Star x={120} y={80} r={8} />
      <Star x={300} y={60} r={7} />
    </g>
  ),
  crocodile: () => (
    <g>
      <path d="M8 440 Q300 430 592 444" {...T} strokeWidth={3} />
      {[470, 500, 530].map((y, i) => (
        <path key={y} d={`M${40 + i * 30} ${y} q20 -10 40 0 t40 0 t40 0 M${330 - i * 20} ${y} q20 -10 40 0 t40 0 t40 0`} {...T} />
      ))}
      {[480, 510, 540].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 440 L${x + 6} ${200 + i * 30}`} {...T} strokeWidth={3} />
          <rect x={x - 3} y={190 + i * 30} width={16} height={40} rx={8} {...TF} transform={`rotate(2 ${x} ${200 + i * 30})`} />
        </g>
      ))}
      <Sun x={90} y={90} r={28} />
      <Cloud x={300} y={110} s={0.8} />
    </g>
  ),
  squirrel: () => (
    <g>
      <path d="M150 470 L160 520 M450 470 L440 520" {...T} />
      <ellipse cx={300} cy={470} rx={160} ry={26} {...O} />
      <ellipse cx={300} cy={470} rx={110} ry={16} {...T} />
      <ellipse cx={300} cy={470} rx={56} ry={8} {...T} />
      <Leaf x={60} y={110} a={30} />
      <Leaf x={110} y={180} a={-20} s={0.8} />
      <Leaf x={500} y={100} a={150} />
      <Leaf x={530} y={190} a={200} s={0.8} />
      {[
        [90, 500],
        [510, 505],
      ].map(([x, y]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={12} ry={15} {...TF} />
          <path d={`M${x - 14} ${y - 8} Q${x} ${y - 24} ${x + 14} ${y - 8} Z`} {...TF} />
        </g>
      ))}
    </g>
  ),
  elephant: () => (
    <g>
      <Ground />
      <Sun x={510} y={90} r={30} />
      <Cloud x={110} y={90} s={0.9} />
      <Grass x={70} y={510} />
      <Grass x={140} y={508} s={0.8} />
      <Grass x={540} y={506} />
    </g>
  ),
  penguin: () => (
    <g>
      <path d="M40 300 L120 170 L190 300 Z M420 300 L500 150 L580 300 Z" {...TF} />
      <path d="M8 300 L592 300" {...T} />
      <path d="M60 472 L540 472 L520 516 L80 516 Z" {...O} />
      {[90, 160, 470, 530].map((x, i) => (
        <path key={x} d={`M${x} ${80 + (i % 2) * 40} l0 20 M${x - 10} ${90 + (i % 2) * 40} l20 0 M${x - 7} ${83 + (i % 2) * 40} l14 14 M${x + 7} ${83 + (i % 2) * 40} l-14 14`} {...T} />
      ))}
      <path d="M90 548 Q110 532 130 548 Q110 562 90 548 Z M130 548 l12 -8 l0 16 Z" {...TF} transform="translate(0 -20)" />
    </g>
  ),
  monkey: () => (
    <g>
      <path d="M30 492 Q300 476 570 496" {...T} strokeWidth={10} />
      <path d="M30 492 Q300 476 570 496" fill="none" stroke="#fff" strokeWidth={4} />
      <path d="M520 20 Q500 120 540 200" {...T} strokeWidth={4} />
      <Leaf x={20} y={40} a={20} s={1.3} />
      <Leaf x={60} y={60} a={70} s={1.1} />
      <Leaf x={530} y={110} a={150} />
      <Leaf x={540} y={170} a={20} s={0.9} />
      <Leaf x={120} y={500} a={-150} s={0.9} />
    </g>
  ),
};

// ---------- strane ----------

function CoverPage({ labels }: { labels: Labels }) {
  const l = labels.wildAnimals;
  return (
    <Frame label={l.coverTitle}>
      <text
        x={300}
        y={110}
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontSize={56}
        fontWeight={700}
        fill="#fff"
        stroke={INK}
        strokeWidth={2.4}
        strokeLinejoin="round"
      >
        {l.coverTitle}
      </text>
      <text x={300} y={150} textAnchor="middle" fontSize={20} fill="#374151">
        {l.coverSubtitle}
      </text>
      <Ground y={540} />
      <g transform="translate(-30 228) scale(0.6)">
        <Giraffe />
      </g>
      <g transform="translate(170 290) scale(0.5)">
        <Elephant />
      </g>
      <g transform="translate(330 300) scale(0.5)">
        <Lion />
      </g>
      <g transform="translate(150 130) scale(0.32)">
        <Owl />
      </g>
      <g transform="translate(330 140) scale(0.3)">
        <Monkey />
      </g>
    </Frame>
  );
}

function AnimalPage({ id, labels }: { id: WildAnimal; labels: Labels }) {
  const a = labels.wildAnimals.animals[id];
  const Scene = SCENES[id];
  const Animal = ANIMALS[id];
  return (
    <div className="grid gap-[3mm]">
      <Frame label={a.name}>
        <Scene />
        <Animal />
        <Name text={a.name} />
      </Frame>
      <p className="text-center text-[14.5px] leading-snug text-[#374151]">💡 {a.fact}</p>
    </div>
  );
}

function DrawPage({ labels }: { labels: Labels }) {
  const l = labels.wildAnimals;
  return (
    <div className="grid gap-[3mm]">
      <Frame label={l.drawTitle}>
        <text x={300} y={70} textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontSize={30} fontWeight={700} fill={INK}>
          {l.drawTitle}
        </text>
        <Sun x={520} y={160} r={22} />
        <Cloud x={110} y={160} s={0.6} />
        <Ground y={470} />
        <text x={40} y={540} fontSize={18} fill={INK}>
          {l.drawName}
        </text>
        <line x1={40} x2={560} y1={562} y2={562} stroke={INK} strokeWidth={1.5} />
      </Frame>
    </div>
  );
}

export function wildAnimalsPages(labels: Labels): ReactNode[] {
  return [
    <CoverPage key="cover" labels={labels} />,
    ...WILD_ANIMALS.map((id) => <AnimalPage key={id} id={id} labels={labels} />),
    <DrawPage key="draw" labels={labels} />,
  ];
}
