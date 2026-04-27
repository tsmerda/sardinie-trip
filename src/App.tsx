import { useState, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import DayTimeline from './components/DayTimeline';
import DayDetail from './components/DayDetail';
import TripMap from './components/TripMap';
import Checklist from './components/Checklist';
import MoodAlternatives from './components/MoodAlternatives';
import CopyButtons from './components/CopyButtons';
import { itinerary, places } from './data/itinerary';
import type { Place } from './data/itinerary';

export default function App() {
  const [selectedDayId, setSelectedDayId] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const selectedDay = itinerary.find((d) => d.id === selectedDayId) ?? itinerary[0];
  const allPlaces = useMemo(() => Object.values(places), []);

  // Compute active places considering variant selection
  const activePlaces: Place[] = useMemo(() => {
    if (selectedDay.variants && selectedDay.variants.length > 0) {
      const variant = selectedDay.variants.find((v) => v.id === selectedVariant) ?? selectedDay.variants[0];
      return variant.places;
    }
    return selectedDay.places;
  }, [selectedDay, selectedVariant]);

  const handleSelectDay = useCallback((id: number) => {
    setSelectedDayId(id);
    setSelectedVariant(null); // reset variant when switching days
  }, []);

  return (
    <div className="min-h-screen pb-safe">
      <Hero />

      {/* Main split layout: content left, map right on desktop */}
      <div className="max-w-[1600px] mx-auto lg:flex lg:gap-0">
        {/* Left column — scrollable content */}
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

          {/* Mobile-only map (hidden on lg+) */}
          <div className="lg:hidden">
            <TripMap allPlaces={allPlaces} activePlaces={activePlaces} selectedDay={selectedDay} />
          </div>

          <MoodAlternatives />
          <Checklist />

          {/* Praktické tipy */}
          <section className="py-8 px-4" id="tips">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-6 text-center">
                Praktické tipy
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: 'Auta', text: 'Potřebujeme min. 2 auta pro 6 lidí. Rezervovat dopředu — v červenci je to žádané.' },
                  { title: 'Parkování', text: 'U populárních pláží (Tuerredda, Nora, Cala Domestica) jezdit brzy ráno. Některé pláže mají placené parkování.' },
                  { title: 'Hotovost', text: 'Mít hotovost — menší pláže a stánky neberou karty. Parkování taky často jen cash.' },
                  { title: 'Voda & jídlo', text: 'Na celý den na pláži / výlet vzít hodně vody, ovoce, sendviče. Ne všude je blízko obchod.' },
                  { title: 'Šnorchl & boty', text: 'Vzít šnorchly a boty do vody — hodně skal a krásné podmořské scenérie.' },
                  { title: 'Slunce', text: 'Sardinie v červenci = 35°C+. Opalovací krém SPF 50, klobouk, slunečník. Na Su Nuraxi / Noru extra voda.' },
                  { title: 'Trajekt', text: 'Trajekt Calasetta → Carloforte: ověřit časy a koupit lístky dopředu (Delcomar). Jen pokud zvolíte variantu A dne 7.' },
                  { title: 'Večeře & vstupenky', text: 'V Cagliari rezervovat večeři dopředu. Pro Noru a Su Nuraxi ověřit vstupenky / prohlídky.' },
                ].map((tip) => (
                  <div key={tip.title} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h3 className="font-semibold text-sea-dark mb-1">{tip.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right column — sticky map (desktop only) */}
        <div className="hidden lg:block lg:w-[42%] xl:w-[40%]">
          <div className="sticky top-0 h-screen p-4 pl-0">
            <TripMap
              allPlaces={allPlaces}
              activePlaces={activePlaces}
              selectedDay={selectedDay}
              fullHeight
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-400 border-t border-gray-100 mt-4">
        Sardinie 2026 — Porto Pino Trip
      </footer>
    </div>
  );
}
