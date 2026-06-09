# Sardinie 2026 — Porto Pino Trip

Webová aplikace pro plánování dovolené na Sardinii pro 6 lidí.

## Spuštění

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Funkce

- **Mobilní aplikace** — spodní navigace (Plán / Mapa / Checklist / Více) a přepínání obrazovek jako v nativní appce
- **Prémiová interaktivní mapa** — vlastní markery podle typu místa, vyznačená základna Porto Pino, číslované zastávky a vykreslená trasa dne v logickém pořadí
- Přepínání stylu mapy (mapa / satelit), vycentrování trasy, legenda
- Itinerář po dnech s detaily a číslovanými zastávkami
- Odkazy na Google Maps pro místa i trasy
- Checklist rezervací (localStorage)
- Alternativy podle nálady
- Kopírování shrnutí dne / celého itineráře
- Plně responzivní — split layout na desktopu, tab navigace na mobilu

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Leaflet / react-leaflet
- Framer Motion
- Lucide React icons

Žádné API klíče nejsou potřeba.
# sardinie-trip
