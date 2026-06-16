import { IMG } from './images';

// Single source of truth for every journey. Drives the home grid, the /journeys
// listing, and each /journeys/[slug] detail page (via generateStaticParams).
export const TOURS = [
  {
    slug: 'complete-egypt-initiation',
    name: 'Complete Egypt Initiation',
    subtitle: 'A Journey of Rebirth',
    badge: 'Application · By interview',
    route: 'Hurghada → Cairo',
    dates: '29 Aug – 12 Sep 2026',
    duration: '15 days',
    price: 'from $6,800',
    forWhom: 'For those ready for deep transformation',
    image: IMG.gizaPyramids,
    blurb:
      'Our flagship pilgrimage. From the warm shallows of the Red Sea to the foot of the Great Pyramid, this is the full arc — death and rebirth, in the only land that ever made an art of both.',
    overview: [
      'Fifteen days that move like the Egyptian soul’s own journey through the afterlife: a descent, a reckoning, and a rising into the light. We begin where the sun warms the water and end where it crowns the pyramids at dawn.',
      'This is the complete initiation — desert and river, temple and tomb, silence and celebration. It asks everything of you and gives back more.',
    ],
    highlights: [
      'Private dawn entry to the Giza plateau before the crowds',
      'A night sailing the Nile under a sky thick with stars',
      'Candlelit ritual within a working temple sanctuary',
      'Swimming the Red Sea reefs at golden hour',
      'A closing sharing circle beneath the desert moon',
    ],
    itinerary: [
      { day: 'Days 1–4', place: 'Hurghada · Red Sea', text: 'Arrival, warm-water immersion, reef swims, and the slow shedding of the world you came from.' },
      { day: 'Days 5–8', place: 'Luxor · Karnak & Valley of the Kings', text: 'Temples at first light, hieroglyph readings, and the long descent into the tombs of the kings.' },
      { day: 'Days 9–11', place: 'The Nile · Aswan', text: 'Sailing felucca by day, ceremony by night, the river carrying what you’re ready to release.' },
      { day: 'Days 12–15', place: 'Cairo · Giza', text: 'The pyramids at dawn, the Sphinx’s long gaze, and a final circle to seal the rebirth.' },
    ],
    includes: ['Boutique & sailing accommodation', 'All private guiding & rituals', 'Internal transfers & felucca', 'Most meals', 'Temple & site access'],
    image2: IMG.karnak,
  },
  {
    slug: 'wild-dolphins-red-sea',
    name: 'Swimming with Wild Dolphins',
    subtitle: 'in the Red Sea',
    badge: 'Small group · Limited cabins',
    route: 'Hurghada',
    dates: '29 Aug – 5 Sep 2026',
    duration: '8 days',
    price: 'from $3,900',
    forWhom: 'For ocean lovers & sensitives',
    image: IMG.dolphins,
    blurb:
      'Meet wild spinner dolphins in their own blue cathedral. No tanks, no cages — just you, your breath, and the most charismatic locals in the Red Sea, on their terms.',
    overview: [
      'An intimate, small-cabin voyage built around respectful, free-diving encounters with wild dolphins. We move slowly, we ask permission, and the sea decides the rest.',
      'Between encounters: coral gardens, long quiet swims, and the kind of stillness only open water can teach.',
    ],
    highlights: [
      'Free-diving encounters with wild spinner dolphins',
      'Vibrant coral-reef snorkeling daily',
      'Breath-work to meet the sea calm and open',
      'Sunset deck circles under desert stars',
      'Tiny group, big cabins, real privacy',
    ],
    itinerary: [
      { day: 'Days 1–2', place: 'Hurghada · Embark', text: 'Board, settle, and ease into the rhythm of the water with breath and orientation.' },
      { day: 'Days 3–5', place: 'Offshore reefs', text: 'Daily dolphin encounters, coral swims, and long luminous afternoons on deck.' },
      { day: 'Days 6–7', place: 'Hidden bays', text: 'Quiet anchorages, deeper free-dives, and ceremony at sunset.' },
      { day: 'Day 8', place: 'Return', text: 'A closing circle and the slow sail home, changed.' },
    ],
    includes: ['Private liveaboard cabin', 'Guided free-diving & snorkeling', 'All meals aboard', 'Breath-work sessions', 'Marine guide & crew'],
    image2: IMG.redSea,
  },
  {
    slug: 'ancient-temples-river-pilgrimage',
    name: 'Ancient Temples & River Pilgrimage',
    subtitle: 'Ritual on the Sacred Nile',
    badge: 'Small group · Limited cabins',
    route: 'Luxor → Cairo',
    dates: '5 – 12 Sep 2026',
    duration: '8 days',
    price: 'from $4,400',
    forWhom: 'For seekers of ancient wisdom',
    image: IMG.karnak,
    blurb:
      'Walk the avenues the priests walked. From Karnak’s forest of columns to the secret chambers of the Valley of the Kings, this is Egypt for those who came for the deep stuff.',
    overview: [
      'A temple-by-temple pilgrimage up the sacred river — reading the walls, entering the sanctuaries, and following the old map of the soul carved in stone.',
      'We pair each site with quiet practice, so the wisdom doesn’t just impress you. It enters you.',
    ],
    highlights: [
      'The hypostyle hall of Karnak at first light',
      'Hieroglyph & mythology readings on-site',
      'Tomb visits in the Valley of the Kings',
      'A Nile sailing leg by felucca',
      'Closing rite among Giza’s monuments',
    ],
    itinerary: [
      { day: 'Days 1–3', place: 'Luxor', text: 'Karnak and Luxor temples, the Valley of the Kings, and evenings of reflection.' },
      { day: 'Days 4–5', place: 'The Nile', text: 'Sailing between sacred sites, ritual on the water, the river as teacher.' },
      { day: 'Days 6–8', place: 'Cairo · Giza', text: 'The Egyptian Museum, the pyramids, and a final ceremony beneath the Sphinx.' },
    ],
    includes: ['Boutique & sailing stays', 'Expert Egyptologist guiding', 'All site access', 'Most meals', 'Internal transfers'],
    image2: IMG.hieroglyphs,
  },
  {
    slug: 'nile-sailing-pyramids-dawn',
    name: 'Nile Sailing & Pyramids at Dawn',
    subtitle: 'The Essential Luxury Escape',
    badge: 'Boutique · Couples & solo',
    route: 'Cairo · Giza · Nile',
    dates: 'Year-round departures',
    duration: '6 days',
    price: 'from $3,200',
    forWhom: 'For first-timers who refuse the ordinary',
    image: IMG.nileFelucca,
    blurb:
      'The greatest hits, done beautifully. Sail the Nile, sleep under stars, and stand before the pyramids as the first light touches the stone — a short journey that lingers for life.',
    overview: [
      'A refined introduction to Egypt for those who want the icons without the crowds and clichés. Private guiding, boutique stays, and just enough ritual to make it sacred.',
      'Perfect as a first journey — or a romantic one.',
    ],
    highlights: [
      'Private sunrise at the Giza pyramids',
      'A night aboard a traditional felucca',
      'The Sphinx, Saqqara, and old Cairo',
      'Sunset dinner overlooking the Nile',
      'Flexible, year-round departures',
    ],
    itinerary: [
      { day: 'Days 1–2', place: 'Cairo · Giza', text: 'Arrival, old Cairo, and a private dawn at the pyramids.' },
      { day: 'Days 3–4', place: 'The Nile', text: 'Felucca sailing, a starlit night on the water, riverside ritual.' },
      { day: 'Days 5–6', place: 'Saqqara & farewell', text: 'The step pyramid, a closing toast, and departure.' },
    ],
    includes: ['Boutique hotel & felucca', 'Private guide & driver', 'Pyramid & site access', 'Breakfasts & select dinners', 'Airport transfers'],
    image2: IMG.gizaPyramids,
  },
];

export const getTour = (slug) => TOURS.find((t) => t.slug === slug);
export const tourSlugs = () => TOURS.map((t) => t.slug);
