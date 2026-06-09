import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import type { Day, DayType } from '../data/itinerary';

const typeColors: Record<DayType, string> = {
  cestování: 'bg-gray-100 text-gray-600',
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

  useEffect(() => {
    const el = scrollRef.current?.querySelector('[data-active="true"]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [selectedDay]);

  return (
    <section className="pt-5 pb-3 lg:py-8" id="timeline">
      <h2 className="text-xl md:text-3xl font-bold text-sea-dark mb-4 px-5 lg:text-center">
        Itinerář po dnech
      </h2>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 px-5 lg:px-4 max-w-5xl mx-auto snap-x snap-mandatory scrollbar-thin"
      >
        {days.map((day) => {
          const active = day.id === selectedDay;
          const diff = difficultyLabel[day.difficulty];
          return (
            <motion.button
              key={day.id}
              data-active={active}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(day.id)}
              className={`
                flex-shrink-0 w-40 snap-center text-left rounded-2xl p-3.5 border-2 transition-all cursor-pointer
                ${active
                  ? 'border-turquoise bg-white shadow-float ring-1 ring-turquoise/20'
                  : 'border-transparent bg-white/70 hover:bg-white hover:shadow-soft'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`
                  flex items-center justify-center w-9 h-9 rounded-xl font-bold text-sm
                  ${active ? 'bg-gradient-to-br from-turquoise to-turquoise-dark text-white shadow-md' : 'bg-sea-light text-sea-dark'}
                `}>
                  {day.id}
                </div>
                <span className="text-[10px] text-gray-400 text-right leading-tight">{day.dayOfWeek}<br />{day.date}</span>
              </div>
              <p className={`font-semibold text-sm leading-snug line-clamp-2 min-h-[2.5rem] ${active ? 'text-sea-dark' : 'text-gray-700'}`}>
                {day.title}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {day.types.slice(0, 2).map((t) => (
                  <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[t]}`}>
                    {t}
                  </span>
                ))}
              </div>
              <p className={`text-[10px] mt-1.5 font-semibold ${diff?.color}`}>{diff?.text}</p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
