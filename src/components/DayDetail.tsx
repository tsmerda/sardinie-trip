import { motion } from 'framer-motion';
import { Sun, Sunset, Moon, MapPin, AlertCircle, Backpack, Car, Navigation, ArrowRight, Shuffle } from 'lucide-react';
import type { Day, DayVariant } from '../data/itinerary';
import { getPlaceMapLink } from '../utils/maps';

const placeTypeEmoji: Record<string, string> = {
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

interface Props {
  day: Day;
  selectedVariant: string | null;
  onSelectVariant: (id: string) => void;
}

function ScheduleBlock({ day }: { day: Pick<Day, 'morning' | 'afternoon' | 'evening'> }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {([
        { icon: Sun, label: 'Ráno', text: day.morning, color: 'text-sun', bg: 'bg-sun-light/40' },
        { icon: Sunset, label: 'Odpoledne', text: day.afternoon, color: 'text-turquoise-dark', bg: 'bg-turquoise-light/40' },
        { icon: Moon, label: 'Večer', text: day.evening, color: 'text-sea-dark', bg: 'bg-sea-light/40' },
      ] as const).map((slot) => (
        <div key={slot.label} className={`${slot.bg} rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <slot.icon className={`w-4 h-4 ${slot.color}`} />
            <span className="font-semibold text-sm text-gray-700">{slot.label}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{slot.text}</p>
        </div>
      ))}
    </div>
  );
}

function PlacesList({ places }: { places: Day['places'] }) {
  if (places.length === 0) return null;
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-turquoise" /> Místa
      </h4>
      <div className="flex flex-wrap gap-2">
        {places.map((place) => (
          <a
            key={place.name}
            href={getPlaceMapLink(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-turquoise-light/50 hover:bg-turquoise-light text-turquoise-dark rounded-lg px-3 py-2 text-sm transition-colors border border-turquoise/20"
          >
            <span>{placeTypeEmoji[place.type] || '📍'}</span>
            <span className="font-medium">{place.name}</span>
            <Navigation className="w-3 h-3 opacity-50" />
          </a>
        ))}
      </div>
    </div>
  );
}

function NotesList({ notes }: { notes: string[] }) {
  if (notes.length === 0) return null;
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-sun" /> Poznámky
      </h4>
      <ul className="space-y-1.5">
        {notes.map((note, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-sun mt-0.5 flex-shrink-0">•</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PackingList({ tips }: { tips?: string[] }) {
  if (!tips || tips.length === 0) return null;
  return (
    <div>
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Backpack className="w-4 h-4 text-sea" /> Co vzít s sebou
      </h4>
      <div className="flex flex-wrap gap-2">
        {tips.map((tip, i) => (
          <span key={i} className="bg-sea-light text-sea-dark text-xs font-medium px-2.5 py-1 rounded-full">
            {tip}
          </span>
        ))}
      </div>
    </div>
  );
}

function RouteButton({ routeLink }: { routeLink?: string }) {
  if (!routeLink) return null;
  return (
    <a
      href={routeLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 w-full bg-turquoise hover:bg-turquoise-dark text-white font-semibold py-3 px-4 rounded-xl transition-colors"
    >
      <Navigation className="w-4 h-4" />
      Otevřít trasu v Google Maps
      <ArrowRight className="w-4 h-4" />
    </a>
  );
}

function VariantCard({ variant, active, onClick }: { variant: DayVariant; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left rounded-xl p-4 border-2 transition-all cursor-pointer
        ${active
          ? 'border-turquoise bg-turquoise-light/30 shadow-md ring-2 ring-turquoise/20'
          : 'border-gray-200 bg-white hover:border-turquoise/40 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{variant.emoji}</span>
        <div className="min-w-0">
          <p className={`font-semibold text-sm ${active ? 'text-turquoise-dark' : 'text-gray-800'}`}>
            {variant.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{variant.subtitle}</p>
          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
            <Car className="w-3 h-3" />
            <span>{variant.driving}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

export default function DayDetail({ day, selectedVariant, onSelectVariant }: Props) {
  const hasVariants = day.variants && day.variants.length > 0;
  const activeVariant = hasVariants ? day.variants!.find((v) => v.id === selectedVariant) ?? day.variants![0] : null;

  // Use variant data if applicable
  const displayData = activeVariant ?? day;
  const displayPlaces = activeVariant ? activeVariant.places : day.places;
  const displayNotes = activeVariant ? [...day.notes, ...activeVariant.notes] : day.notes;
  const displayPacking = activeVariant ? activeVariant.packingTips : day.packingTips;
  const displayRoute = activeVariant ? activeVariant.routeLink : day.routeLink;

  return (
    <motion.section
      key={day.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto px-4 pb-8"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sea-dark to-turquoise-dark p-5 md:p-6 text-white">
          <p className="text-turquoise-light/80 text-sm">
            Den {day.id} — {day.dayOfWeek} {day.date}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold mt-1">{day.title}</h3>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <Car className="w-4 h-4" /> {hasVariants ? activeVariant!.driving : day.driving}
            </span>
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-6">
          {/* Variant picker */}
          {hasVariants && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-turquoise" /> Vyber variantu
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                {day.variants!.map((variant) => (
                  <VariantCard
                    key={variant.id}
                    variant={variant}
                    active={(selectedVariant ?? day.variants![0].id) === variant.id}
                    onClick={() => onSelectVariant(variant.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          <ScheduleBlock day={displayData} />

          {/* Places */}
          <PlacesList places={displayPlaces} />

          {/* Notes */}
          <NotesList notes={displayNotes} />

          {/* Packing */}
          <PackingList tips={displayPacking} />

          {/* Route link */}
          <RouteButton routeLink={displayRoute} />
        </div>
      </div>
    </motion.section>
  );
}
