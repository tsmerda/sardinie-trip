import { Car, ParkingCircle, Banknote, Droplets, Footprints, Sun, Ship, UtensilsCrossed } from 'lucide-react';

const tips = [
  { icon: Car, title: 'Auta', text: 'Potřebujeme min. 2 auta pro 6 lidí. Rezervovat dopředu — v červenci je to žádané.' },
  { icon: ParkingCircle, title: 'Parkování', text: 'U populárních pláží (Tuerredda, Nora, Cala Domestica) jezdit brzy ráno. Některé pláže mají placené parkování.' },
  { icon: Banknote, title: 'Hotovost', text: 'Mít hotovost — menší pláže a stánky neberou karty. Parkování taky často jen cash.' },
  { icon: Droplets, title: 'Voda & jídlo', text: 'Na celý den na pláži / výlet vzít hodně vody, ovoce, sendviče. Ne všude je blízko obchod.' },
  { icon: Footprints, title: 'Šnorchl & boty', text: 'Vzít šnorchly a boty do vody — hodně skal a krásné podmořské scenérie.' },
  { icon: Sun, title: 'Slunce', text: 'Sardinie v červenci = 35 °C+. Opalovací krém SPF 50, klobouk, slunečník. Na Su Nuraxi / Noru extra voda.' },
  { icon: Ship, title: 'Trajekt', text: 'Trajekt Calasetta → Carloforte: ověřit časy a koupit lístky dopředu (Delcomar). Jen pro variantu A dne 7.' },
  { icon: UtensilsCrossed, title: 'Večeře & vstupenky', text: 'V Cagliari rezervovat večeři dopředu. Pro Noru a Su Nuraxi ověřit vstupenky / prohlídky.' },
];

export default function PracticalTips() {
  return (
    <section className="py-6 px-4" id="tips">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-sea-dark mb-6 text-center">
          Praktické tipy
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="card p-4 flex gap-3 hover:shadow-float transition-shadow"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-turquoise-light flex items-center justify-center">
                <tip.icon className="w-5 h-5 text-turquoise-dark" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sea-dark mb-0.5">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
