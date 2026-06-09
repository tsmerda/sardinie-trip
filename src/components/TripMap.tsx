import { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Crosshair, Layers, X } from 'lucide-react';
import type { Day, DayVariant, Place } from '../data/itinerary';
import { buildRoute } from '../data/itinerary';
import { getPlaceMapLink } from '../utils/maps';

const placeTypeEmoji: Record<Place['type'], string> = {
  airport: '✈️',
  beach: '🏖️',
  town: '🏘️',
  viewpoint: '👀',
  cave: '🕳️',
  port: '⛴️',
  district: '🍷',
  ruins: '🏛️',
  unesco: '🏛️',
  plateau: '🌿',
  rock: '🪨',
};

/** Build a premium DivIcon pin. */
function makeIcon(emoji: string, variant: 'active' | 'inactive' | 'base', seq?: number) {
  const size = variant === 'inactive' ? 26 : 36;
  const anchor = variant === 'inactive' ? 30 : 42;
  const seqHtml = seq != null ? `<span class="seq">${seq}</span>` : '';
  const pulse = variant === 'active' ? ' pulse' : '';
  return L.divIcon({
    className: 'trip-marker',
    html: `<div class="trip-pin ${variant}${pulse}"><span>${emoji}</span>${seqHtml}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, anchor],
    popupAnchor: [0, -anchor + 4],
  });
}

/** Smoothly fly to the relevant places whenever the active set changes. */
function MapUpdater({ places }: { places: Place[] }) {
  const map = useMap();
  const prevKey = useRef('');

  useEffect(() => {
    if (places.length === 0) return;
    const key = places.map((p) => `${p.lat},${p.lng}`).join('|');
    if (key === prevKey.current) return;

    const size = map.getSize();
    // Guard: a hidden / not-yet-laid-out map has size 0 → fitBounds would
    // compute NaN center/zoom and throw. Wait until it has real dimensions.
    if (size.x === 0 || size.y === 0) return;
    prevKey.current = key;

    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 12, duration: 0.8 });
  }, [places, map]);

  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 220);
    return () => clearTimeout(t);
  }, [map]);

  return null;
}

const TILES = {
  voyager: {
    label: 'Mapa',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  satellite: {
    label: 'Satelit',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics',
  },
} as const;

type TileKey = keyof typeof TILES;

interface Props {
  allPlaces: Place[];
  activePlaces: Place[];
  selectedDay: Day | undefined;
  fullHeight?: boolean;
  /** Optional in-map day switcher */
  days?: Day[];
  onSelectDay?: (id: number) => void;
  variants?: DayVariant[];
  selectedVariant?: string | null;
  onSelectVariant?: (id: string) => void;
}

export default function TripMap({
  allPlaces,
  activePlaces,
  selectedDay,
  fullHeight,
  days,
  onSelectDay,
  variants,
  selectedVariant,
  onSelectVariant,
}: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const [tile, setTile] = useState<TileKey>('voyager');
  const [showLegend, setShowLegend] = useState(false);

  const activeNames = useMemo(() => new Set(activePlaces.map((p) => p.name)), [activePlaces]);
  const route = useMemo(() => buildRoute(activePlaces), [activePlaces]);
  const routeLatLngs = useMemo(() => route.map((p) => [p.lat, p.lng] as [number, number]), [route]);
  const fitPlaces = route.length > 0 ? route : allPlaces;

  // Sequence number per active place (visiting order, excluding the base loop endpoints)
  const seqByName = useMemo(() => {
    const map = new Map<string, number>();
    let n = 0;
    for (const pl of activePlaces) {
      if (pl.type !== 'airport') n += 1;
      map.set(pl.name, n || 1);
    }
    return map;
  }, [activePlaces]);

  const recenter = () => {
    const m = mapRef.current;
    if (!m || fitPlaces.length === 0) return;
    const size = m.getSize();
    if (size.x === 0 || size.y === 0) return;
    const bounds = L.latLngBounds(fitPlaces.map((p) => [p.lat, p.lng]));
    m.flyToBounds(bounds, { padding: [60, 60], maxZoom: 12, duration: 0.7 });
  };

  return (
    <section className={fullHeight ? 'h-full flex flex-col' : 'py-6 px-4'} id="map">
      {!fullHeight && (
        <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-4 text-center">
          Mapa výletů
        </h2>
      )}

      <div
        className={`relative rounded-3xl overflow-hidden shadow-float border border-white/60 ${
          fullHeight ? 'flex-1' : 'max-w-5xl mx-auto'
        }`}
      >
        {/* ── Top overlay: day switcher ── */}
        {days && onSelectDay && (
          <div className="absolute top-0 left-0 right-0 z-[500] pointer-events-none">
            <div className="pointer-events-auto flex gap-2 overflow-x-auto no-scrollbar px-3 pt-3 pb-6">
              {days.map((d) => {
                const active = d.id === selectedDay?.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => onSelectDay(d.id)}
                    className={`flex-shrink-0 flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 text-xs font-semibold transition-all shadow-soft ${
                      active
                        ? 'bg-sea-dark text-white'
                        : 'glass text-sea-dark hover:bg-white'
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                        active ? 'bg-turquoise text-white' : 'bg-sea-light text-sea-dark'
                      }`}
                    >
                      {d.id}
                    </span>
                    <span className="whitespace-nowrap">{d.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Variant switcher (e.g. day 7) ── */}
        {variants && variants.length > 0 && onSelectVariant && (
          <div className="absolute top-14 left-0 right-0 z-[500] pointer-events-none">
            <div className="pointer-events-auto flex gap-2 overflow-x-auto no-scrollbar px-3 pb-2">
              {variants.map((v) => {
                const active = (selectedVariant ?? variants[0].id) === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => onSelectVariant(v.id)}
                    className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all shadow-soft ${
                      active ? 'bg-turquoise text-white' : 'glass text-turquoise-dark hover:bg-white'
                    }`}
                  >
                    {v.emoji} {v.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <MapContainer
          ref={mapRef}
          center={[39.15, 8.7]}
          zoom={9}
          scrollWheelZoom={true}
          zoomControl={false}
          style={fullHeight ? { height: '100%', minHeight: '320px' } : { height: 'clamp(360px, 60vw, 520px)', width: '100%' }}
          className="z-0"
        >
          <TileLayer key={tile} attribution={TILES[tile].attribution} url={TILES[tile].url} />
          <MapUpdater places={fitPlaces} />

          {/* Route line connecting the day's stops in order */}
          {routeLatLngs.length >= 2 && (
            <>
              <Polyline positions={routeLatLngs} pathOptions={{ color: '#ffffff', weight: 7, opacity: 0.6 }} />
              <Polyline
                positions={routeLatLngs}
                className="route-line"
                pathOptions={{ color: '#0a8a8e', weight: 4, opacity: 0.95 }}
              />
            </>
          )}

          {allPlaces.map((place) => {
            const isActive = activeNames.has(place.name);
            const isBase = place.name === 'Porto Pino';
            const emoji = placeTypeEmoji[place.type] ?? '📍';
            const variant: 'active' | 'inactive' | 'base' = isActive
              ? 'active'
              : isBase
              ? 'base'
              : 'inactive';
            const seq = isActive && place.type !== 'airport' ? seqByName.get(place.name) : undefined;

            return (
              <Marker
                key={place.name}
                position={[place.lat, place.lng]}
                icon={makeIcon(emoji, variant, seq)}
                zIndexOffset={isActive ? 1000 : isBase ? 500 : 0}
                opacity={activePlaces.length > 0 && !isActive && !isBase ? 0.45 : 1}
              >
                <Popup>
                  <div className="text-sm min-w-[180px]">
                    <p className="font-bold text-base mb-0.5 text-sea-dark flex items-center gap-1.5">
                      <span>{emoji}</span> {place.name}
                    </p>
                    {isBase && (
                      <span className="inline-block text-[11px] font-semibold text-sun bg-sun-light rounded-full px-2 py-0.5 mb-1">
                        🏠 Základna
                      </span>
                    )}
                    {place.description && (
                      <p className="text-gray-600 mb-2 leading-snug">{place.description}</p>
                    )}
                    <a
                      href={getPlaceMapLink(place)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-turquoise-dark hover:text-turquoise font-semibold"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Otevřít v Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* ── Floating controls (bottom-right) ── */}
        <div className="absolute bottom-4 right-3 z-[500] flex flex-col gap-2">
          <button
            onClick={recenter}
            aria-label="Vycentrovat trasu"
            className="w-11 h-11 rounded-2xl glass shadow-float flex items-center justify-center text-sea-dark hover:text-turquoise active:scale-95 transition"
          >
            <Crosshair className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTile((t) => (t === 'voyager' ? 'satellite' : 'voyager'))}
            aria-label="Přepnout styl mapy"
            className="w-11 h-11 rounded-2xl glass shadow-float flex items-center justify-center text-sea-dark hover:text-turquoise active:scale-95 transition"
          >
            <Layers className="w-5 h-5" />
          </button>
        </div>

        {/* ── Legend ── */}
        <div className="absolute bottom-4 left-3 z-[500]">
          {showLegend ? (
            <div className="glass rounded-2xl shadow-float p-3 text-[11px] text-sea-dark w-44 relative">
              <button
                onClick={() => setShowLegend(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Zavřít legendu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="font-bold mb-2">Legenda</p>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-turquoise to-turquoise-dark" />
                  Body dnešního dne
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-sun to-sand-dark" />
                  Základna Porto Pino
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-[#94a8b6]" />
                  Ostatní místa
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-block w-5 h-0.5 bg-turquoise-dark" />
                  Trasa výletu
                </li>
              </ul>
            </div>
          ) : (
            <button
              onClick={() => setShowLegend(true)}
              className="glass rounded-full shadow-float px-3 py-2 text-[11px] font-semibold text-sea-dark hover:bg-white transition"
            >
              Legenda
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
