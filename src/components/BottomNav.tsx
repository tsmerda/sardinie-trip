import { motion } from 'framer-motion';
import { CalendarDays, Map, ListChecks, Sparkles } from 'lucide-react';

export type Tab = 'plan' | 'map' | 'list' | 'more';

const tabs: { id: Tab; label: string; icon: typeof Map }[] = [
  { id: 'plan', label: 'Plán', icon: CalendarDays },
  { id: 'map', label: 'Mapa', icon: Map },
  { id: 'list', label: 'Checklist', icon: ListChecks },
  { id: 'more', label: 'Více', icon: Sparkles },
];

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[1000] pb-safe">
      <div className="mx-auto max-w-md px-3 pb-2">
        <div className="glass rounded-3xl shadow-float border border-white/60 flex items-stretch justify-around px-1.5 py-1.5">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-2xl"
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-gradient-to-br from-turquoise to-turquoise-dark rounded-2xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <t.icon
                  className={`relative w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-sea-dark/55'
                  }`}
                  strokeWidth={isActive ? 2.4 : 2}
                />
                <span
                  className={`relative text-[10px] font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-sea-dark/55'
                  }`}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
