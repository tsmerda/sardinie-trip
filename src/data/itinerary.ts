export type DayType = 'cestování' | 'pláž' | 'poznávání' | 'město' | 'výlet' | 'večer' | 'chill' | 'historie' | 'památky' | 'UNESCO';
export type Difficulty = 'low' | 'medium' | 'medium/high' | 'low/medium' | 'low–medium';

export interface Place {
  name: string;
  lat: number;
  lng: number;
  type: 'airport' | 'beach' | 'town' | 'viewpoint' | 'cave' | 'port' | 'district' | 'ruins' | 'unesco' | 'plateau' | 'rock';
  description?: string;
}

export interface DayVariant {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  types: DayType[];
  difficulty: Difficulty;
  driving: string;
  morning: string;
  afternoon: string;
  evening: string;
  places: Place[];
  notes: string[];
  packingTips?: string[];
  routeLink?: string;
}

export interface Day {
  id: number;
  date: string;
  dayOfWeek: string;
  title: string;
  types: DayType[];
  difficulty: Difficulty;
  driving: string;
  morning: string;
  afternoon: string;
  evening: string;
  places: Place[];
  notes: string[];
  packingTips?: string[];
  routeLink?: string;
  /** For days with multiple options (Day 7) */
  variants?: DayVariant[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface MoodAlternative {
  id: string;
  emoji: string;
  title: string;
  description: string;
  recommendations: { name: string; why: string }[];
}

// ─── Places ──────────────────────────────────────────────────────────

export const places: Record<string, Place> = {
  // Base
  cagliariAirport: { name: 'Cagliari Airport', lat: 39.2515, lng: 9.0543, type: 'airport', description: 'Letiště Cagliari-Elmas' },
  portoPino: { name: 'Porto Pino', lat: 38.9667, lng: 8.6000, type: 'beach', description: 'Naše základna — krásná pláž s tyrkysovou vodou' },
  portoPinoBeach: { name: 'Porto Pino Beach', lat: 38.9589, lng: 8.5962, type: 'beach', description: 'Hlavní pláž Porto Pino' },
  santAnnaArresi: { name: "Sant'Anna Arresi", lat: 39.0003, lng: 8.6423, type: 'town', description: 'Nejbližší městečko k Porto Pino' },
  leDune: { name: 'Le Dune / Is Arenas Biancas', lat: 38.9439, lng: 8.5965, type: 'beach', description: 'Bílé duny a průzračná voda — chráněná oblast' },

  // Sant'Antioco area
  santAntioco: { name: "Sant'Antioco", lat: 39.0700, lng: 8.4525, type: 'town', description: 'Historické městečko na ostrově propojeném mostem' },
  calaSapone: { name: 'Cala Sapone', lat: 39.0154, lng: 8.3945, type: 'beach', description: 'Zátoka ideální na šnorchlování' },
  calaLunga: { name: 'Cala Lunga', lat: 38.9991, lng: 8.3845, type: 'beach', description: 'Klidná pláž se skálami' },
  calasetta: { name: 'Calasetta', lat: 39.1101, lng: 8.3686, type: 'town', description: 'Rybářské městečko s přívozem na San Pietro' },

  // Tuerredda / Chia
  tuerredda: { name: 'Tuerredda Beach', lat: 38.8943, lng: 8.8156, type: 'beach', description: 'Jedna z nejkrásnějších pláží Sardinie' },
  chia: { name: 'Chia', lat: 38.8977, lng: 8.8822, type: 'beach', description: 'Známá oblast s nádhernými plážemi' },
  suGiudeu: { name: 'Su Giudeu', lat: 38.8836, lng: 8.8661, type: 'beach', description: 'Pláž s malým ostrůvkem, na který se dá dojít' },

  // Nora / Pula
  nora: { name: 'Nora', lat: 38.9845, lng: 9.0157, type: 'ruins', description: 'Archeologické naleziště — féničtí, kartáginští a římští osadníci' },
  pula: { name: 'Pula', lat: 39.0050, lng: 9.0026, type: 'town', description: 'Městečko u Nory — kafe, aperitivo, atmosféra' },

  // Cagliari
  cagliari: { name: 'Cagliari', lat: 39.2238, lng: 9.1217, type: 'town', description: 'Hlavní město Sardinie — historické centrum, bary, atmosféra' },
  castello: { name: 'Castello', lat: 39.2180, lng: 9.1165, type: 'viewpoint', description: 'Historická čtvrť na kopci s úzkými uličkami' },
  bastione: { name: 'Bastione di Saint Remy', lat: 39.2169, lng: 9.1168, type: 'viewpoint', description: 'Výhlídka nad městem s terasou' },
  marina: { name: 'Marina District', lat: 39.2155, lng: 9.1137, type: 'district', description: 'Čtvrť s restauracemi a bary' },
  poetto: { name: 'Poetto', lat: 39.2009, lng: 9.1656, type: 'beach', description: 'Městská pláž Cagliari — beach-club vibe' },

  // Barumini / vnitrozemí
  suNuraxi: { name: 'Su Nuraxi di Barumini', lat: 39.7057, lng: 8.9916, type: 'unesco', description: 'UNESCO — největší nuragická pevnost na Sardinii' },
  barumini: { name: 'Barumini', lat: 39.7027, lng: 9.0033, type: 'town', description: 'Městečko u Su Nuraxi' },
  casaZapata: { name: 'Casa Zapata', lat: 39.7018, lng: 9.0027, type: 'ruins', description: 'Muzeum v paláci nad nuragickými ruinami' },
  giaraDiGesturi: { name: 'Giara di Gesturi', lat: 39.7310, lng: 8.9830, type: 'plateau', description: 'Bazaltová plošina s divokými koňmi' },

  // Carloforte / San Pietro
  calasettaFerry: { name: 'Calasetta Ferry Port', lat: 39.1087, lng: 8.3715, type: 'port', description: 'Přístav — trajekt na San Pietro / Carloforte' },
  carloforte: { name: 'Carloforte', lat: 39.1456, lng: 8.3058, type: 'town', description: 'Malebné městečko na ostrově San Pietro' },
  sanPietro: { name: 'San Pietro Island', lat: 39.1440, lng: 8.2870, type: 'beach', description: 'Ostrov s klidnými plážemi a skalními útesy' },

  // Cala Domestica / Masua area
  calaDomestica: { name: 'Cala Domestica', lat: 39.3722, lng: 8.3824, type: 'beach', description: 'Divoká pláž mezi útesy — fotogenické místo' },
  masua: { name: 'Masua', lat: 39.3338, lng: 8.4235, type: 'viewpoint', description: 'Pobřeží s výhledem na Pan di Zucchero' },
  panDiZucchero: { name: 'Pan di Zucchero', lat: 39.3347, lng: 8.4028, type: 'rock', description: 'Ikonický vápencový monolit trčící z moře' },

  // Backup / alternativy
  isZuddas: { name: 'Grotte Is Zuddas', lat: 39.0845, lng: 8.7197, type: 'cave', description: 'Krápníková jeskyně — unikátní aragonitové formace' },
  santadi: { name: 'Santadi', lat: 39.0935, lng: 8.7137, type: 'town', description: 'Vinařské městečko — lokální víno a gastronomie' },
};

const p = places;

// ─── Itinerary ───────────────────────────────────────────────────────

export const itinerary: Day[] = [
  {
    id: 1,
    date: '14. 7. 2026',
    dayOfWeek: 'Úterý',
    title: 'Přílet + Porto Pino sunset',
    types: ['cestování', 'chill'],
    difficulty: 'low',
    driving: 'Cagliari Airport → Porto Pino, cca 1 h 15 min',
    morning: 'Let Vídeň → Cagliari',
    afternoon: '14:05 přílet, vyzvednutí aut, cesta do Porto Pino. Check-in a nákup po příjezdu.',
    evening: 'První koupání a západ slunce na Porto Pino. Večeře blízko apartmánu.',
    places: [p.cagliariAirport, p.portoPino, p.santAnnaArresi],
    notes: [
      'Neplánovat nic velkého — odpočinek po cestě',
      'Ideální první večeře blízko apartmánu',
      'Udělat nákup cestou nebo po check-inu',
      '14:45–15:30 kufry + vyzvednutí aut',
      '15:30–16:45 cesta do Porto Pino',
      '17:00–18:00 check-in / nákup',
    ],
    packingTips: ['Plavky do příručáku pro první koupání'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=39.2515,9.0543&destination=38.9667,8.6000',
  },
  {
    id: 2,
    date: '15. 7. 2026',
    dayOfWeek: 'Středa',
    title: 'Porto Pino & Le Dune',
    types: ['pláž', 'chill'],
    difficulty: 'low',
    driving: 'Minimum — vše blízko základny',
    morning: 'Le Dune / Is Arenas Biancas — bílé duny a tyrkysová voda. Vyrazit brzy kvůli parkování.',
    afternoon: 'Porto Pino hlavní pláž, koupání, drink.',
    evening: 'Aperitivo v Porto Pino.',
    places: [p.leDune, p.portoPinoBeach],
    notes: [
      'Vyrazit ráno kvůli parkování',
      'Duny jsou chráněné, nelézt po nich!',
      'Ideální den na slunečník, šnorchl, chill',
    ],
    packingTips: ['Šnorchl', 'Slunečník', 'Opalovací krém', 'Hodně vody'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9439,8.5965&waypoints=38.9589,8.5962',
  },
  {
    id: 3,
    date: '16. 7. 2026',
    dayOfWeek: 'Čtvrtek',
    title: "Sant'Antioco + Cala Sapone + Calasetta",
    types: ['poznávání', 'pláž', 'večer'],
    difficulty: 'medium',
    driving: 'Cca 1–1.5 h celkem podle zastávek',
    morning: "Sant'Antioco — kafe, procházka historickým centrem.",
    afternoon: 'Cala Sapone nebo Cala Lunga — koupání a šnorchl.',
    evening: "Calasetta nebo Sant'Antioco — večeře u moře.",
    places: [p.santAntioco, p.calaSapone, p.calaLunga, p.calasetta],
    notes: [
      'Super kombinace města, moře a večera',
      'Cala Sapone je dobrá na šnorchlování',
      'Vzít boty do vody',
    ],
    packingTips: ['Boty do vody', 'Šnorchl'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9667,8.6000&waypoints=39.0700,8.4525%7C39.0154,8.3945%7C39.1101,8.3686',
  },
  {
    id: 4,
    date: '17. 7. 2026',
    dayOfWeek: 'Pátek',
    title: 'Tuerredda + Chia',
    types: ['pláž'],
    difficulty: 'medium/high',
    driving: 'Cca 2–2.5 h celkem',
    morning: 'Velmi brzký odjezd na Tuerredda Beach — jedna z TOP pláží Sardinie.',
    afternoon: 'Chia / Su Giudeu / vyhlídky po pobřeží.',
    evening: 'Návrat do Porto Pino, domácí večeře.',
    places: [p.tuerredda, p.chia, p.suGiudeu],
    notes: [
      'Tuerredda je v červenci hodně populární!',
      'Ověřit rezervace, kapacity a parkování',
      'Jet brzy ráno (ideálně 7:30–8:00)',
      'Nepřecpat den dalšími plážemi',
    ],
    packingTips: ['Jídlo a pití s sebou', 'Hotovost na parkování'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9667,8.6000&waypoints=38.8943,8.8156%7C38.8977,8.8822%7C38.8836,8.8661',
  },
  {
    id: 5,
    date: '18. 7. 2026',
    dayOfWeek: 'Sobota',
    title: 'Nora + Pula + Cagliari večer',
    types: ['památky', 'město', 'večer'],
    difficulty: 'medium/high',
    driving: 'Cca 2.5–3 h celkem',
    morning: 'Volnější start, případně krátká pláž v Porto Pino.',
    afternoon: 'Archeologické naleziště Nora. Pak Pula na kafe / aperitivo.',
    evening: 'Cagliari — Castello, Bastione di Saint Remy, Marina district, večeře, bary.',
    places: [p.nora, p.pula, p.cagliari, p.castello, p.bastione, p.marina, p.poetto],
    notes: [
      'Kulturně-městský den — kombinace historie, moře a večerní zábavy',
      'Rezervovat večeři v Cagliari dopředu',
      'Vyřešit řidiče nebo transfer zpět do Porto Pino!',
      'Počítat s tím, že to bude delší den',
      'Poetto jako alternativa, pokud chceme beach-club vibe',
    ],
    packingTips: ['Hezčí oblečení na večer', 'Hotovost', 'Pohodlné boty na Noru'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=39.2238,9.1217&waypoints=38.9845,9.0157%7C39.0050,9.0026',
  },
  {
    id: 6,
    date: '19. 7. 2026',
    dayOfWeek: 'Neděle',
    title: 'Su Nuraxi Barumini + vnitrozemí',
    types: ['historie', 'UNESCO', 'poznávání'],
    difficulty: 'medium/high',
    driving: 'Cca 3.5–4.5 h celkem podle trasy',
    morning: 'Odjezd z Porto Pino směr Barumini.',
    afternoon: 'Su Nuraxi di Barumini — UNESCO. Oběd v okolí. Volitelně Casa Zapata nebo Giara di Gesturi.',
    evening: 'Návrat do Porto Pino, klidnější večer na apartmánu.',
    places: [p.suNuraxi, p.barumini, p.casaZapata, p.giaraDiGesturi],
    notes: [
      'Hlavní vnitrozemský výlet celé dovolené',
      'Nejlepší "neplážový" kulturní bod',
      'Ověřit vstupenky / prohlídky dopředu',
      'Nepřidávat ten den večer další velký program',
      'Vzít vodu, pohodlné boty, pokrývku hlavy',
    ],
    packingTips: ['Pohodlné boty', 'Pokrývka hlavy', 'Hodně vody', 'Opalovací krém'],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9667,8.6000&waypoints=39.7057,8.9916%7C39.7018,9.0027%7C39.7310,8.9830',
  },
  {
    id: 7,
    date: '20. 7. 2026',
    dayOfWeek: 'Pondělí',
    title: 'Flexibilní poslední celý den',
    types: ['výlet', 'pláž', 'chill'],
    difficulty: 'low',
    driving: 'Podle zvolené varianty',
    morning: 'Záleží na variantě — viz níže.',
    afternoon: 'Záleží na variantě — viz níže.',
    evening: 'Poslední společná večeře.',
    places: [], // filled by selected variant
    notes: [
      'Tento den je záměrně flexibilní',
      'Vyberte variantu podle energie a nálady skupiny',
    ],
    variants: [
      {
        id: 'carloforte',
        emoji: '⛴️',
        title: 'Carloforte / San Pietro',
        subtitle: 'Výlet trajektem na ostrov',
        types: ['výlet', 'město'],
        difficulty: 'medium',
        driving: 'Řízení + trajekt Calasetta → Carloforte',
        morning: 'Calasetta — snídaně, nástup na trajekt.',
        afternoon: 'Carloforte — procházka, oběd, gelato, případně koupání na San Pietro.',
        evening: 'Poslední večeře venku.',
        places: [p.calasettaFerry, p.carloforte, p.sanPietro],
        notes: [
          'Nejvíc společenská varianta',
          'Ověřit trajekt Delcomar — časy a ceny',
          'Skvělá volba, pokud máme energii na další výlet',
        ],
        packingTips: ['Pohodlné boty na procházku'],
        routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9667,8.6000&waypoints=39.1087,8.3715%7C39.1456,8.3058',
      },
      {
        id: 'domestica',
        emoji: '🏔️',
        title: 'Cala Domestica / Masua / Pan di Zucchero',
        subtitle: 'Divoké pobřeží, útesy a fotky',
        types: ['pláž', 'výlet'],
        difficulty: 'medium',
        driving: 'Cca 2.5–3 h celkem',
        morning: 'Odjezd na západní pobřeží — Cala Domestica.',
        afternoon: 'Masua / výhled na Pan di Zucchero.',
        evening: 'Návrat a poslední večeře.',
        places: [p.calaDomestica, p.masua, p.panDiZucchero],
        notes: [
          'Fotogenická a dramatičtější Sardinie',
          'Lepší pro útesy, výhledy a fotky',
          'Dobrá alternativa, pokud nechceme trajekt',
        ],
        packingTips: ['Fotoaparát', 'Boty do vody', 'Jídlo s sebou'],
        routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9667,8.6000&waypoints=39.3722,8.3824%7C39.3338,8.4235',
      },
      {
        id: 'chill',
        emoji: '🏖️',
        title: 'Porto Pino chill',
        subtitle: 'Odpočinek, pláž, poslední pohodový den',
        types: ['pláž', 'chill'],
        difficulty: 'low',
        driving: 'Minimum',
        morning: 'Porto Pino / Le Dune.',
        afternoon: 'Drink, koupání, balení bez stresu.',
        evening: "Poslední společná večeře v okolí Porto Pino / Sant'Anna Arresi.",
        places: [p.portoPino, p.leDune, p.santAnnaArresi],
        notes: [
          'Nejrozumnější varianta, pokud budeme po týdnu unavení',
          'Minimum logistiky',
          'Ideální pro poslední dovolenkový vibe',
        ],
        packingTips: ['Šnorchl', 'Slunečník'],
        routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=38.9439,8.5965',
      },
    ],
  },
  {
    id: 8,
    date: '21. 7. 2026',
    dayOfWeek: 'Úterý',
    title: 'Odlet',
    types: ['cestování', 'chill'],
    difficulty: 'low',
    driving: 'Porto Pino → Cagliari Airport, cca 1 h 15 min',
    morning: 'Snídaně, balení, krátké koupání na rozloučenou.',
    afternoon: '12:30 odjezd z Porto Pino. 14:00–14:30 vrácení auta / letiště.',
    evening: '16:30 odlet do Vídně.',
    places: [p.portoPino, p.cagliariAirport],
    notes: [
      'Neplánovat vzdálenou pláž',
      'Nechat rezervu na vrácení auta',
      'Cagliari jen pokud bude opravdu hodně času',
    ],
    routeLink: 'https://www.google.com/maps/dir/?api=1&origin=38.9667,8.6000&destination=39.2515,9.0543',
  },
];

// ─── Checklist ───────────────────────────────────────────────────────

export const defaultChecklist: ChecklistItem[] = [
  { id: 'cars', text: 'Půjčit / rezervovat auta', checked: false },
  { id: 'checkin', text: 'Ověřit check-in u apartmánu', checked: false },
  { id: 'shopping', text: 'Udělat větší nákup po příletu', checked: false },
  { id: 'tuerredda', text: 'Ověřit rezervaci / pravidla pro Tuerredda', checked: false },
  { id: 'nora', text: 'Ověřit vstupenky / prohlídky pro Noru', checked: false },
  { id: 'barumini', text: 'Ověřit vstupenky / prohlídky pro Su Nuraxi Barumini', checked: false },
  { id: 'dinner-cagliari', text: 'Rezervovat večeři v Cagliari', checked: false },
  { id: 'transfer', text: 'Domluvit řidiče / transfer na Cagliari večer', checked: false },
  { id: 'ferry', text: 'Ověřit trajekt Calasetta–Carloforte (pokud zvolíme Carloforte variantu)', checked: false },
  { id: 'parking', text: 'Ověřit parkování u Tuerredda, Chia, Nora, Cala Domestica', checked: false },
  { id: 'gear', text: 'Vzít šnorchly, boty do vody, slunečník, hotovost', checked: false },
  { id: 'hiking-gear', text: 'Vzít pohodlné boty a pokrývku hlavy na Su Nuraxi / Noru', checked: false },
  { id: 'flex-day', text: 'Nechat poslední den flexibilní podle energie skupiny', checked: false },
];

// ─── Mood Alternatives ──────────────────────────────────────────────

export const moodAlternatives: MoodAlternative[] = [
  {
    id: 'history',
    emoji: '🏛️',
    title: 'Chceme historii',
    description: 'Nejzajímavější historické a kulturní body',
    recommendations: [
      { name: 'Su Nuraxi di Barumini', why: 'UNESCO — největší nuragická pevnost' },
      { name: 'Nora', why: 'Féničtí, kartáginští a římští osadníci u moře' },
      { name: 'Casa Zapata', why: 'Muzeum v paláci nad ruinami — blízko Su Nuraxi' },
    ],
  },
  {
    id: 'evening-out',
    emoji: '🍷',
    title: 'Chceme večer ven',
    description: 'Nejlepší místa na večeři a bary',
    recommendations: [
      { name: 'Cagliari — Marina District', why: 'Bary, restaurace, městská atmosféra' },
      { name: 'Pula', why: 'Příjemné městečko na aperitivo po Noře' },
      { name: 'Calasetta', why: 'Rybářské městečko, skvělé ryby' },
    ],
  },
  {
    id: 'top-beach',
    emoji: '🏖️',
    title: 'Chceme top pláž',
    description: 'Nejkrásnější pláže na jihu Sardinie',
    recommendations: [
      { name: 'Tuerredda Beach', why: 'Nejznámější — tyrkysová laguna' },
      { name: 'Su Giudeu', why: 'Pláž s ostrůvkem, méně turistů než Tuerredda' },
      { name: 'Le Dune / Is Arenas Biancas', why: 'Bílé duny, blízko základny' },
    ],
  },
  {
    id: 'short-drive',
    emoji: '🚗',
    title: 'Chceme méně řízení',
    description: 'Místa blízko Porto Pino',
    recommendations: [
      { name: 'Porto Pino', why: 'Doslova za rohem' },
      { name: 'Le Dune / Is Arenas Biancas', why: 'Pár minut od základny' },
      { name: "Sant'Anna Arresi", why: 'Nejbližší městečko' },
    ],
  },
  {
    id: 'photogenic',
    emoji: '📸',
    title: 'Chceme fotky a útesy',
    description: 'Dramatické pobřeží a instagramové lokace',
    recommendations: [
      { name: 'Cala Domestica', why: 'Divoká pláž mezi útesy' },
      { name: 'Masua / Pan di Zucchero', why: 'Ikonický monolit trčící z moře' },
      { name: 'Bastione di Saint Remy', why: 'Výhled na celé Cagliari' },
    ],
  },
  {
    id: 'relax',
    emoji: '😴',
    title: 'Chceme odpočinkový den',
    description: 'Žádná logistika, jen pohoda',
    recommendations: [
      { name: 'Porto Pino chill', why: 'Pláž, drink, slunce, klid' },
      { name: 'Le Dune / Is Arenas Biancas', why: 'Ráno na dunách, odpoledne u vody' },
      { name: 'Aperitivo v Porto Pino', why: 'Drink s výhledem na západ slunce' },
    ],
  },
  {
    id: 'bad-weather',
    emoji: '🌧️',
    title: 'Když bude horší počasí',
    description: 'Backup plán na deštivý / větrný den',
    recommendations: [
      { name: 'Grotte Is Zuddas', why: 'Jeskyně — skvělá při špatném počasí' },
      { name: 'Cagliari', why: 'Muzea, kavárny, shopping' },
      { name: 'Su Nuraxi di Barumini', why: 'Částečně krytá prohlídka' },
    ],
  },
];
