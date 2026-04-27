import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { Day, DayType } from '../data/itinerary';

const typeColors: Record<DayType, string> = {
  cestování: 'bg-gray-200 text-gray-700',
  pláž: 'bg-turquoise-light text-turquoise-dark',
  poznávání: 'bg-sun-light text-yellow-800',
  město: 'bg-sea-light text-sea-dark',
  výlet: 'bg-green-100 text-green-800',
  večer: 'bg-purple-100 text-purple-800',
  chill: 'bg-sand text-yellow-900',
  historie: 'bg-amber-100 text-amber-800',
  památky: 'bg-orange-100 text-orange-800',
  UNESCO: 'bg-red-100 text-red-800',
};

const difficultyLabel: Record<string, { text: string; color: string }> = {
  low: { text: 'Lehký', color: 'text-green-600' },
  'low/medium': { text: 'Lehký–Střední', color: 'text-yellow-600' },
  medium: { text: 'Střední', color: 'text-yellow-600' },
  'medium/high': { text: 'Střední–Náročný', color: 'text-orange-600' },
};

interface Props {
  days: Day[];
  selectedDay: number;
  onSelect: (id: number) => void;
}

export default function DayTimeline({ days, selectedDay, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll active day into view on desktop
  useEffect(() => {
    if (scrollRef.current && window.innerWidth >= 768) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDay]);

  return (
    <section className="py-8 px-4" id="timeline">
      <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-6 text-center">
        Itinerář po dnech
      </h2>

      <div
        ref={scrollRef}
        className="flex flex-col md:flex-row gap-3 md:gap-2 md:overflow-x-auto md:pb-4 max-w-5xl mx-auto md:snap-x md:snap-mandatory scrollbar-thin"
      >
        {days.map((day) => {
          const active = day.id === selectedDay;
          const diff = difficultyLabel[day.difficulty];
          return (
            <motion.button
              key={day.id}
              data-active={active}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(day.id)}
              className={`
                flex-shrink-0 md:w-44 md:snap-center text-left rounded-xl p-3 md:p-4 border-2 transition-all cursor-pointer
                ${active
                  ? 'border-turquoise bg-white shadow-lg shadow-turquoise/20 ring-2 ring-turquoise/30'
                  : 'border-transparent bg-white/70 hover:bg-white hover:shadow-md'
                }
              `}
            >
              <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-1.5">
                <div className={`
                  flex items-center justify-center w-10 h-10 md:w-8 md:h-8 rounded-lg font-bold text-sm flex-shrink-0
                  ${active ? 'bg-turquoise text-white' : 'bg-sea-light text-sea-dark'}
                `}>
                  {day.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{day.dayOfWeek} {day.date}</p>
                  <p className={`font-semibold text-sm md:text-xs truncate ${active ? 'text-sea-dark' : 'text-gray-800'}`}>
                    {day.title}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {day.types.map((t) => (
                      <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[t]}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className={`text-[10px] mt-1 font-medium ${diff?.color}`}>
                    {diff?.text}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
