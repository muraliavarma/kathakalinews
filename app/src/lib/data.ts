// Build-time data layer. The source of truth is plain JSON in src/data/,
// committed to git. No database, no server — everything here runs at build time.
import performancesRaw from '../data/performances.json';
import storiesRaw from '../data/stories.json';
import ragasRaw from '../data/ragas.json';

export interface Performance {
  date: string;
  date_iso: string;
  year: number | null;
  kathas: string;
  play_key: string;
  venue_and_time: string;
  district: string;
  state: string;
  country: string;
  artists: string;
  organiser: string;
  updated_by: string;
  source_file: string;
}

export interface Story {
  slug: string;
  num: number;
  title: string;
  author: string;
  life_dates: string;
  epic: string;
  synopsis: string;
  vesham: string;
  source_file: string;
}

export interface Raga {
  name: string;
  slug: string;
  arohana: string;
  avarohana: string;
  other_names: string;
  janya_of: string;
  rasa: string;
  examples: string;
}

export const performances = performancesRaw as Performance[];
export const stories = (storiesRaw as Story[]).slice().sort((a, b) => a.num - b.num);
export const ragas = ragasRaw as Raga[];

export function playKey(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function stats() {
  const playKeys = new Set<string>();
  const districts = new Set<string>();
  const countries = new Set<string>();
  for (const p of performances) {
    if (p.play_key) playKeys.add(p.play_key);
    if (p.district && p.district.length > 1) districts.add(p.district);
    if (p.country && p.country.length > 1) countries.add(p.country);
  }
  return {
    performances: performances.length,
    plays: playKeys.size,
    stories: stories.length,
    ragas: ragas.length,
    districts: districts.size,
    countries: countries.size,
  };
}

function countBy<T>(items: T[], key: (t: T) => string) {
  const m = new Map<string, number>();
  for (const it of items) {
    const k = key(it);
    if (!k) continue;
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

export function topPlays(n = 8) {
  const byKey = new Map<string, { play: string; n: number }>();
  for (const p of performances) {
    if (!p.play_key) continue;
    const cur = byKey.get(p.play_key) ?? { play: p.kathas, n: 0 };
    cur.n += 1;
    // prefer the shortest non-empty label as the representative spelling
    if (p.kathas && (!cur.play || p.kathas.length < cur.play.length)) cur.play = p.kathas;
    byKey.set(p.play_key, cur);
  }
  return [...byKey.entries()]
    .map(([play_key, v]) => ({ play_key, play: v.play, n: v.n }))
    .sort((a, b) => b.n - a.n)
    .slice(0, n);
}

export function topDistricts(n = 10) {
  const m = countBy(performances.filter((p) => p.district && p.district.length > 1), (p) => p.district);
  return [...m.entries()].map(([district, n]) => ({ district, n })).sort((a, b) => b.n - a.n).slice(0, n);
}

export function performancesForPlay(key: string): Performance[] {
  return performances
    .filter((p) => p.play_key === key)
    .sort((a, b) => (b.date_iso || '').localeCompare(a.date_iso || ''));
}

export function representativePlayName(key: string): string {
  let best = key;
  for (const p of performances) {
    if (p.play_key === key && p.kathas && (best === key || p.kathas.length < best.length)) best = p.kathas;
  }
  return best;
}
