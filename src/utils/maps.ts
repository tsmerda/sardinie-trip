import type { Place } from '../data/itinerary';

export function getPlaceMapLink(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
}

export function getRouteLink(places: Place[]): string {
  if (places.length < 2) return '';
  const origin = places[0];
  const destination = places[places.length - 1];
  const waypoints = places.slice(1, -1);
  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`;
  if (waypoints.length > 0) {
    const wp = waypoints.map((p) => `${p.lat},${p.lng}`).join('%7C');
    url += `&waypoints=${wp}`;
  }
  return url;
}
