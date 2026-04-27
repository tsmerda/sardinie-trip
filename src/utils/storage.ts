import type { ChecklistItem } from '../data/itinerary';

const STORAGE_KEY = 'sardinia-trip-checklist';

export function loadChecklist(defaults: ChecklistItem[]): ChecklistItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: ChecklistItem[] = JSON.parse(stored);
      // Merge with defaults in case new items were added
      return defaults.map((d) => {
        const found = parsed.find((p) => p.id === d.id);
        return found ? { ...d, checked: found.checked } : d;
      });
    }
  } catch {
    // ignore
  }
  return defaults;
}

export function saveChecklist(items: ChecklistItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}
