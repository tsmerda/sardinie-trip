import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation } from 'lucide-react';
import type { Day, Place } from '../data/itinerary';
import { getPlaceMapLink } from '../utils/maps';

// Fix default marker icons
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const activeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const inactiveIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ places }: { places: Place[] }) {
  const map = useMap();
  const prevKey = useRef('');

  useEffect(() => {
    if (places.length === 0) return;
    const key = places.map((p) => `${p.lat},${p.lng}`).join('|');
    if (key === prevKey.current) return;
    prevKey.current = key;

    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  }, [places, map]);

  useEffect(() => {
    const timeout = setTimeout(() => map.invalidateSize(), 200);
    return () => clearTimeout(timeout);
  }, [map]);

  return null;
}

interface Props {
  allPlaces: Place[];
  activePlaces: Place[];
  selectedDay: Day | undefined;
  fullHeight?: boolean;
}

export default function TripMap({ allPlaces, activePlaces, selectedDay, fullHeight }: Props) {
  const activeNames = useMemo(() => new Set(activePlaces.map((p) => p.name)), [activePlaces]);
  const fitPlaces = activePlaces.length > 0 ? activePlaces : allPlaces;

  return (
    <section className={fullHeight ? 'h-full flex flex-col' : 'py-8 px-4'} id="map">
      {!fullHeight && (
        <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-4 text-center">
          Mapa
          {selectedDay && (
            <span className="block md:inline text-base font-normal text-gray-500 md:ml-2 mt-1 md:mt-0">
              — Den {selectedDay.id}: {selectedDay.title}
            </span>
          )}
        </h2>
      )}

      <div className={`
        rounded-2xl overflow-hidden shadow-lg border border-gray-200
        ${fullHeight ? 'flex-1 flex flex-col' : 'max-w-5xl mx-auto'}
      `}>
        {fullHeight && selectedDay && (
          <div className="bg-gradient-to-r from-sea-dark to-turquoise-dark px-4 py-3 text-white flex-shrink-0">
            <p className="text-sm font-semibold">
              Den {selectedDay.id}: {selectedDay.title}
            </p>
            <p className="text-xs text-white/60">{selectedDay.driving}</p>
          </div>
        )}

        <MapContainer
          center={[39.05, 8.7]}
          zoom={10}
          scrollWheelZoom={true}
          style={fullHeight ? { flex: 1, minHeight: '300px' } : { height: 'clamp(300px, 50vw, 450px)', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater places={fitPlaces} />
          {allPlaces.map((place) => {
            const isActive = activeNames.has(place.name);
            return (
              <Marker
                key={place.name}
                position={[place.lat, place.lng]}
                icon={isActive ? activeIcon : inactiveIcon}
                opacity={activePlaces.length > 0 && !isActive ? 0.35 : 1}
              >
                <Popup>
                  <div className="text-sm min-w-[160px]">
                    <p className="font-bold text-base mb-1">{place.name}</p>
                    {place.description && (
                      <p className="text-gray-600 mb-2">{place.description}</p>
                    )}
                    <a
                      href={getPlaceMapLink(place)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <Navigation className="w-3 h-3" />
                      Otevřít v Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}
