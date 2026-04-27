import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Square, ListChecks } from 'lucide-react';
import type { ChecklistItem } from '../data/itinerary';
import { defaultChecklist } from '../data/itinerary';
import { loadChecklist, saveChecklist } from '../utils/storage';

export default function Checklist() {
  const [items, setItems] = useState<ChecklistItem[]>(() => loadChecklist(defaultChecklist));

  useEffect(() => {
    saveChecklist(items);
  }, [items]);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const done = items.filter((i) => i.checked).length;

  return (
    <section className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-sea-dark flex items-center gap-2">
            <ListChecks className="w-7 h-7" /> Checklist
          </h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">
            {done}/{items.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <motion.div
            className="bg-turquoise h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(done / items.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(item.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer
                ${item.checked
                  ? 'bg-turquoise-light/50 border border-turquoise/20'
                  : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'
                }
              `}
            >
              {item.checked ? (
                <CheckSquare className="w-5 h-5 text-turquoise flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-gray-300 flex-shrink-0" />
              )}
              <span className={`text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {item.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
