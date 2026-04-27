import { motion } from 'framer-motion';
import { Plane, Users, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sea-dark via-sea to-turquoise text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-sun rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-turquoise rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-5xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-turquoise-light/80 text-sm md:text-base tracking-widest uppercase mb-2">
            Sardinie 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Porto Pino Trip
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            7 dní na jihu Sardinie — pláže, výlety, večeře a spousta zábavy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Calendar, label: '14. 7. – 21. 7.', sub: '8 dní / 7 nocí' },
            { icon: Users, label: '6 lidí', sub: 'společný trip' },
            { icon: MapPin, label: 'Porto Pino', sub: 'Jih Sardinie' },
            { icon: Plane, label: 'VIE → CAG', sub: 'Přímý let' },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center border border-white/10"
            >
              <item.icon className="w-5 h-5 mx-auto mb-1.5 text-sun" />
              <p className="font-semibold text-sm md:text-base">{item.label}</p>
              <p className="text-xs text-white/60">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
