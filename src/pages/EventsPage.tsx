import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar, MapPin, ExternalLink, Music2,
  Ticket, Loader2, RefreshCw, Search, AlertCircle
} from 'lucide-react';

// ─── ⚙️  Config ───────────────────────────────────────────────────────────────
const TM_API_KEY = import.meta.env.VITE_TICKETMASTER_KEY ?? 'knLH1Jjqm2gn2f8wnjS0xAmxDgh7kf0S';

// Artistas Gospel/CCM monitorados
const GOSPEL_KEYWORDS = [
  'Kirk Franklin',
  'Maverick City Music',
  'Elevation Worship',
  'Tasha Cobbs Leonard',
  'Chris Tomlin',
  'Hillsong',
  'Bethel Music',
  'Phil Wickham',
  'Lauren Daigle',
  'for KING & COUNTRY',
  'TobyMac',
  'CeCe Winans',
  'Travis Greene',
  'Todd Dulaney',
  'Lecrae',
];

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface TMVenue {
  name: string;
  city?: { name: string };
  state?: { stateCode: string; name: string };
  country?: { countryCode: string; name: string };
}

interface TMEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: { localDate: string; localTime?: string };
    status?: { code: string };
  };
  images?: { url: string; width: number; height: number }[];
  priceRanges?: { min: number; max: number; currency: string }[];
  _embedded?: { venues?: TMVenue[] };
  _keyword: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getVenue(e: TMEvent): TMVenue | null {
  return e._embedded?.venues?.[0] ?? null;
}

// Alterado para formato holandês
function formatDate(localDate: string) {
  const d = new Date(localDate + 'T12:00:00');
  return {
    month: d.toLocaleDateString('nl-NL', { month: 'short' }),
    day: d.getDate(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('nl-NL', { weekday: 'short' }),
    full: d.toLocaleDateString('nl-NL', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

function daysUntil(localDate: string) {
  return Math.ceil((new Date(localDate + 'T12:00:00').getTime() - Date.now()) / 86400000);
}

function getBestImage(e: TMEvent) {
  if (!e.images?.length) return null;
  const sorted = [...e.images].sort((a, b) => b.width - a.width);
  return (sorted.find(i => i.width / (i.height || 1) > 1.5) ?? sorted[0]).url;
}

// Formatação de preço (EUR para Holanda)
function formatPrice(e: TMEvent) {
  const r = e.priceRanges?.[0];
  if (!r) return null;
  const currency = r.currency === 'EUR' ? '€' : '$';
  return r.min === r.max ? `${currency}${Math.round(r.min)}` : `${currency}${Math.round(r.min)}–${currency}${Math.round(r.max)}`;
}

// Adicionado filtro por país (NL - Netherlands)
async function fetchForKeyword(keyword: string): Promise<TMEvent[]> {
  const params = new URLSearchParams({
    apikey: TM_API_KEY,
    keyword,
    classificationName: 'Music',
    countryCode: 'NL', // Foco em eventos na Holanda
    size: '5',
    sort: 'date,asc',
  });
  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
