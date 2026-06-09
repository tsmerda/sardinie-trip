import { motion } from 'framer-motion';
import { Plane, Users, MapPin, Calendar } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sea-deep via-sea-dark to-turquoise-dark text-white">
      {/* Ambient blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-16 -left-10 w-72 h-72 bg-turquoise rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-sun/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sea rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 pt-12 pb-20 md:pt-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-turquoise-light/90 bg-white/10 border border-white/15 rounded-full px-3 py-1 mb-4 backdrop-blur-sm"
          >
            🏖️ Sardinie 2026
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-3 drop-shadow-sm">
            Porto Pino
          </h1>
          <p className="text-base md:text-xl text-white/75 max-w-2xl mx-auto">
            8 dní na jihu Sardinie — pláže, výlety, večeře a spousta zábavy
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 max-w-3xl mx-auto mt-8"
        >
          {[
            { icon: Calendar, label: '14.–21. 7.', sub: '8 dní / 7 nocí' },
            { icon: Users, label: '6 lidí', sub: 'společný trip' },
            { icon: MapPin, label: 'Porto Pino', sub: 'Jih Sardinie' },
            { icon: Plane, label: 'VIE → CAG', sub: 'Přímý let' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 md:p-4 text-center border border-white/15 shadow-lg"
            >
              <item.icon className="w-5 h-5 mx-auto mb-1.5 text-sun" />
              <p className="font-bold text-sm md:text-base leading-tight">{item.label}</p>
              <p className="text-[11px] md:text-xs text-white/55 mt-0.5">{item.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 leading-[0] pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-10 md:h-16">
          <path
            fill="#f3fafb"
            d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
