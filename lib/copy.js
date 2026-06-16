// Central brand voice. Heavy ancient-Egyptian mythology and evocative, layered
// allusion throughout. Adapted in structure from the Oceanic Ventures site.

export const BRAND = {
  name: "Fabian's Tours",
  short: 'Fabian’s',
  tagline: 'The Atlantis Call · Sacred Egypt Journeys',
  whatsapp: '15551234567', // placeholder — swap for the real number (no +/spaces)
  email: 'hello@fabianstours.example',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',
};

export const HERO = {
  kicker: 'Egypt · Est. by the river that never sleeps',
  title: 'Answer the Call of Ancient Egypt',
  // layered / suggestive: the land that "undresses" its secrets; surrender to the river
  sub: 'Where the desert lays its oldest secrets bare and the Nile invites you to surrender — luxury journeys for travelers ready to be seduced by five thousand years of wonder.',
  ctaPrimary: 'View All Journeys',
  ctaSecondary: 'Apply Now',
};

// Four value pillars (reference: IMMERSE / RELEASE / CREATE / INTEGRATE)
export const PILLARS = [
  {
    glyph: '\u{13171}', // 𓅱 - quail chick (commonly used)
    name: 'IMMERSE',
    title: 'Descend into the Mysteries',
    body: 'Slip beneath the surface of the everyday and into temples that have kept their secrets for millennia. To enter the sanctuary is to be initiated — surrender, and let Egypt reveal what it shows only to those who come close.',
  },
  {
    glyph: '\u{132AA}', // 𓊪
    name: 'RELEASE',
    title: 'Let the Nile Carry It',
    body: 'Lay down what you carried across the desert. Warm water, warm sand, the slow pull of the current — the river has loosened the grip of pharaohs and travelers alike. Let it loosen yours.',
  },
  {
    glyph: '\u{13000}', // 𓀀
    name: 'AWAKEN',
    title: 'Stir the Ka Within',
    body: 'The ancients believed every soul carried a hidden double — the ka — waiting to be roused. Dawn over Giza, ritual by candlelight, the hush of a tomb: come awake to the part of you that has been asleep.',
  },
  {
    glyph: '\u{13080}', // 𓂀 - Eye of Horus-ish
    name: 'UNITE',
    title: 'Two Lands, One Circle',
    body: 'Upper and Lower Egypt were bound into one kingdom; strangers become a circle around the same fire. Come alone if you must — you will not leave alone.',
  },
];

// About-page narrative (reference: "The Call from the Waters", "Mystery of Atlantis",
// "Community", founder "Fabian")
export const ABOUT = {
  intro: {
    kicker: 'The Call from the Sands',
    title: 'Egypt is both a mirror and a doorway.',
    body: [
      'We believe the desert remembers everything and forgives nothing left unsaid. Our journeys are built to bring you to the threshold — the exact place where the outer wonder of Egypt and the inner wonder of you meet, touch, and refuse to let go.',
      'As above, so below; as within, so without. To stand before the pyramids is to stand before yourself. We simply hold the door open.',
    ],
  },
  atlantis: {
    kicker: 'The Atlantis Call',
    title: 'A golden age, remembered in stone.',
    body: [
      'Long before the pharaohs, the legend speaks of a civilization in perfect balance — consciousness, wisdom, and a reverence for the natural world entwined as one. Egypt is the inheritor of that flame.',
      'We design each journey to rekindle that union: integrity, coherence, reverence for the river, and a quiet devotion to the land that hosts us.',
    ],
  },
  community: {
    kicker: 'The Circle',
    title: 'For travelers who want to feel it, not just see it.',
    body: [
      'These journeys are for the curious and the committed — seekers, romantics, and the quietly intense who want resonance, not a checklist. Come ready to be moved.',
    ],
  },
  founder: {
    kicker: 'Your Guide',
    name: 'Fabian',
    title: 'Fabian',
    body: [
      'Fabian has spent two decades between desert and river — in meditation, in temples at first light, in long conversations with the keepers of old ways. He builds journeys the way the Nile builds a delta: patiently, generously, until something new and fertile is born.',
      'He leads small. He leads close. And he believes the best travel doesn’t take you somewhere — it gives you back to yourself.',
    ],
  },
};

// Social Impact funds (reference: Mother Fund / Marine Conservation / Oshun Water)
export const IMPACT = {
  kicker: 'Spirit in Action',
  title: 'We give back to the land that gives us everything.',
  intro:
    'Authentic reverence asks for more than admiration — it asks for action. A portion of every journey funds regeneration along the Nile and the Red Sea. We partner only with integrity-driven projects on the ground.',
  funds: [
    {
      glyph: '\u{1308B}',
      name: 'The Lotus Fund',
      where: 'Cairo · Aswan',
      body: 'Restoring the Nile through cultivation of the sacred blue lotus, water purification, healing circles, and community programs that return wealth to Indigenous river communities.',
    },
    {
      glyph: '\u{13193}',
      name: 'Red Sea Guardians',
      where: 'Hurghada · Red Sea',
      body: 'Funding coral-reef restoration, marine research, and local conservation teams — empowering coastal communities as stewards of the sea they have always loved.',
    },
    {
      glyph: '\u{132F9}',
      name: 'Living Water Fund',
      where: 'Upper Egypt',
      body: 'Solar-powered clean-water systems, river restoration in mining-affected regions, and the training of community guardians to protect the water for generations.',
    },
  ],
};

// Footer link groups (reference structure)
export const FOOTER_LINKS = {
  explore: [
    { label: 'All Journeys', href: '/journeys/' },
    { label: 'Signature Experiences', href: '/experiences/' },
    { label: 'Apply / Reserve', href: '/apply/' },
  ],
  about: [
    { label: 'About Us', href: '/about/' },
    { label: 'Testimonials', href: '/testimonials/' },
    { label: 'Social Impact', href: '/social-impact/' },
  ],
  legal: [
    { label: 'Refer a Friend', href: '/apply/' },
    { label: 'Terms & Conditions', href: '/terms/' },
    { label: 'Contact', href: '/apply/' },
  ],
};
