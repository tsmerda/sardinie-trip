import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { moodAlternatives } from '../data/itinerary';

export default function MoodAlternatives() {
  const [active, setActive] = useState<string | null>(null);
  const activeMood = moodAlternatives.find((m) => m.id === active) ?? null;

  return (
    <section className="py-8 px-4" id="mood">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-2 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-sun" /> Alternativy podle nálady
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Co máte chuť dělat? Klikni a uvidíš doporučení.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {moodAlternatives.map((mood) => (
            <motion.button
              key={mood.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(active === mood.id ? null : mood.id)}
              className={`
                p-3 rounded-xl text-center transition-all cursor-pointer border-2
                ${active === mood.id
                  ? 'bg-turquoise text-white border-turquoise shadow-lg shadow-turquoise/20'
                  : 'bg-white border-gray-100 hover:border-turquoise/30 hover:shadow-md'
                }
              `}
            >
              <span className="text-2xl block mb-1">{mood.emoji}</span>
              <span className="text-xs font-semibold leading-tight block">{mood.title}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeMood && (
            <motion.div
              key={activeMood.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md">
                <p className="font-semibold text-gray-800 mb-1">{activeMood.emoji} {activeMood.title}</p>
                <p className="text-sm text-gray-500 mb-4">{activeMood.description}</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {activeMood.recommendations.map((rec) => (
                    <div key={rec.name} className="bg-turquoise-light/30 rounded-xl p-3 border border-turquoise/10">
                      <p className="font-semibold text-sm text-sea-dark">{rec.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{rec.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
