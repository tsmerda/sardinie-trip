import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import DayTimeline from './components/DayTimeline';
import DayDetail from './components/DayDetail';
import TripMap from './components/TripMap';
import Checklist from './components/Checklist';
import MoodAlternatives from './components/MoodAlternatives';
import CopyButtons from './components/CopyButtons';
import BottomNav, { type Tab } from './components/BottomNav';
import PracticalTips from './components/PracticalTips';
import { useMediaQuery } from './hooks/useMediaQuery';
import { itinerary, places } from './data/itinerary';
import type { Place } from './data/itinerary';

export default function App() {
  const [selectedDayId, setSelectedDayId] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('plan');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const selectedDay = itinerary.find((d) => d.id === selectedDayId) ?? itinerary[0];
  const allPlaces = useMemo(() => Object.values(places), []);

  const activePlaces: Place[] = useMemo(() => {
    if (selectedDay.variants && selectedDay.variants.length > 0) {
      const variant = selectedDay.variants.find((v) => v.id === selectedVariant) ?? selectedDay.variants[0];
      return variant.places;
    }
    return selectedDay.places;
  }, [selectedDay, selectedVariant]);

  const handleSelectDay = useCallback((id: number) => {
    setSelectedDayId(id);
    setSelectedVariant(null);
  }, []);

  const mapEl = (
    <TripMap
      allPlaces={allPlaces}
      activePlaces={activePlaces}
      selectedDay={selectedDay}
      fullHeight
      days={itinerary}
      onSelectDay={handleSelectDay}
      variants={selectedDay.variants}
      selectedVariant={selectedVariant}
      onSelectVariant={setSelectedVariant}
    />
  );

  if (isDesktop) {
    return (
      <div className="min-h-screen">
        <Hero />
        <div className="max-w-[1600px] mx-auto flex gap-0">
          <div className="flex-1 min-w-0">
            <DayTimeline days={itinerary} selectedDay={selectedDayId} onSelect={handleSelectDay} />
            <AnimatePresence mode="wait">
              <DayDetail
                key={selectedDayId}
                day={selectedDay}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            </AnimatePresence>
            <CopyButtons selectedDay={selectedDay} selectedVariant={selectedVariant} />
            <MoodAlternatives />
            <Checklist />
            <PracticalTips />
          </div>

          <div className="w-[42%] xl:w-[40%]">
            <div className="sticky top-0 h-screen p-4 pl-0">
              <TripMap
                allPlaces={allPlaces}
                activePlaces={activePlaces}
                selectedDay={selectedDay}
                fullHeight
                days={itinerary}
                onSelectDay={handleSelectDay}
                variants={selectedDay.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            </div>
          </div>
        </div>

        <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-100 mt-4">
          Sardinie 2026 — Porto Pino Trip
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ════════════════ MOBILE — native-app tabs ════════════════ */}
      <div>
        <AnimatePresence mode="wait">
          {tab === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-28"
            >
              <Hero />
              <DayTimeline days={itinerary} selectedDay={selectedDayId} onSelect={handleSelectDay} />
              <AnimatePresence mode="wait">
                <DayDetail
                  key={selectedDayId}
                  day={selectedDay}
                  selectedVariant={selectedVariant}
                  onSelectVariant={setSelectedVariant}
                />
              </AnimatePresence>
              <CopyButtons selectedDay={selectedDay} selectedVariant={selectedVariant} />
              <button
                onClick={() => setTab('map')}
                className="mx-auto mb-2 flex items-center gap-2 text-sm font-semibold text-turquoise-dark"
              >
                Zobrazit den na mapě →
              </button>
            </motion.div>
          )}

          {tab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[calc(100dvh-5rem)] px-3 pt-3"
            >
              {mapEl}
            </motion.div>
          )}

          {tab === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-28 pt-5"
            >
              <Checklist />
            </motion.div>
          )}

          {tab === 'more' && (
            <motion.div
              key="more"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pb-28 pt-5"
            >
              <MoodAlternatives />
              <PracticalTips />
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  );
}
