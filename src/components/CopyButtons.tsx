import { useState } from 'react';
import { Copy, Check, Calendar } from 'lucide-react';
import type { Day } from '../data/itinerary';
import { itinerary } from '../data/itinerary';

function formatDay(day: Day, variantId?: string | null): string {
  const lines = [
    `Den ${day.id} — ${day.dayOfWeek} ${day.date}`,
    day.title,
    `Typ: ${day.types.join(', ')}`,
    `Řízení: ${day.driving}`,
  ];

  if (day.variants && day.variants.length > 0) {
    const variant = day.variants.find((v) => v.id === variantId) ?? day.variants[0];
    lines.push(`Zvolená varianta: ${variant.title}`, '');
    lines.push(`Ráno: ${variant.morning}`);
    lines.push(`Odpoledne: ${variant.afternoon}`);
    lines.push(`Večer: ${variant.evening}`);
    lines.push('', 'Místa: ' + variant.places.map((p) => p.name).join(', '));
    if (variant.notes.length > 0) {
      lines.push('', 'Poznámky:', ...variant.notes.map((n) => `• ${n}`));
    }
    if (variant.routeLink) {
      lines.push('', `Trasa: ${variant.routeLink}`);
    }
    // Also show other variants
    lines.push('', 'Ostatní varianty:');
    for (const v of day.variants) {
      if (v.id !== variant.id) {
        lines.push(`  ${v.emoji} ${v.title}: ${v.subtitle}`);
      }
    }
  } else {
    lines.push('');
    lines.push(`Ráno: ${day.morning}`);
    lines.push(`Odpoledne: ${day.afternoon}`);
    lines.push(`Večer: ${day.evening}`);
    lines.push('', 'Místa: ' + day.places.map((p) => p.name).join(', '));
    if (day.notes.length > 0) {
      lines.push('', 'Poznámky:', ...day.notes.map((n) => `• ${n}`));
    }
    if (day.routeLink) {
      lines.push('', `Trasa: ${day.routeLink}`);
    }
  }
  return lines.join('\n');
}

function formatAll(): string {
  const header = [
    'SARDINIE 2026 — PORTO PINO TRIP',
    '14. 7. – 21. 7. 2026',
    '6 lidí',
    'Základna: Porto Pino, jih Sardinie',
    'Let: VIE → CAG / CAG → VIE',
    '',
    '═══════════════════════════════════',
    '',
  ];
  return header.join('\n') + itinerary.map((d) => formatDay(d)).join('\n\n─────────────────────────────────\n\n');
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

interface Props {
  selectedDay: Day;
  selectedVariant: string | null;
}

export default function CopyButtons({ selectedDay, selectedVariant }: Props) {
  const [copiedDay, setCopiedDay] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopyDay = async () => {
    const ok = await copyToClipboard(formatDay(selectedDay, selectedVariant));
    if (ok) {
      setCopiedDay(true);
      setTimeout(() => setCopiedDay(false), 2000);
    }
  };

  const handleCopyAll = async () => {
    const ok = await copyToClipboard(formatAll());
    if (ok) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopyDay}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-turquoise text-turquoise-dark font-semibold py-3 px-4 rounded-xl hover:bg-turquoise hover:text-white transition-all cursor-pointer"
        >
          {copiedDay ? <Check className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
          {copiedDay ? 'Zkopírováno!' : `Zkopírovat Den ${selectedDay.id}`}
        </button>
        <button
          onClick={handleCopyAll}
          className="flex-1 flex items-center justify-center gap-2 bg-sea-dark text-white font-semibold py-3 px-4 rounded-xl hover:bg-sea transition-all cursor-pointer"
        >
          {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copiedAll ? 'Zkopírováno!' : 'Zkopírovat celý itinerář'}
        </button>
      </div>
    </section>
  );
}
