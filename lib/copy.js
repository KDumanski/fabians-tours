// Central brand voice. Heavy ancient-Egyptian mythology and evocative, layered
// allusion throughout. Adapted in structure from the Oceanic Ventures site.

export const BRAND = {
  name: 'Oceanic Ventures',
  short: 'Oceanic Ventures',
  tagline: 'The Atlantis Call · Sacred Egypt Journeys',
  whatsapp: '15551234567', // placeholder — swap for the real number (no +/spaces)
  email: 'hello@fabianstours.example',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  youtube: 'https://youtube.com/',
};

export const HERO = {
  kicker: 'Oceanic Ventures · Egypt',
  // Brand tagline from oceanicventures.co
  title: 'The Atlantis Call — Sacred Water Journeys',
  // Verbatim hero line from oceanicventures.co
  sub: 'Connect with marine life in a respectful manner discovering the depths of the sea and yourself.',
  ctaPrimary: 'View All Journeys',
  ctaSecondary: 'Apply Now',
};

// Four pillars — exact names + descriptions from oceanicventures.co
export const PILLARS = [
  {
    glyph: '\u{13171}',
    name: 'IMMERSE',
    title: 'Freediving',
    body: 'Freediving is a connection with your own soul, where you learn to trust and surrender.',
  },
  {
    glyph: '\u{132AA}',
    name: 'RELEASE',
    title: 'Somatics',
    body: 'Deep relaxation warm water therapy. Release trauma effectively.',
  },
  {
    glyph: '\u{13000}',
    name: 'CREATE',
    title: 'Shamanism',
    body: 'Enter into deep inner states without all the ‘noise’ and surrounded by nature.',
  },
  {
    glyph: '\u{13080}',
    name: 'INTEGRATE',
    title: 'Sharing Circles',
    body: 'Deepening nature connection and enhance interpersonal connection.',
  },
];

// About-page narrative — verbatim copy from oceanicventures.co/about-us
export const ABOUT = {
  intro: {
    kicker: 'A Call from the Waters',
    title: 'Water is both a mirror and a medicine.',
    body: [
      'Oceanic Ventures creates transformational journeys rooted in the wisdom of water — inviting deep inner cleansing, clarity, and remembrance through embodied experience.',
      'As within, so without. Healing the self and healing the planet are inseparable.',
    ],
  },
  atlantis: {
    kicker: 'The Mystery of Atlantis',
    title: 'A golden age of balance.',
    body: [
      'Atlantis has come to symbolize a golden age of balance between human consciousness, wisdom, and reverence for the natural world.',
      'The Atlantis Call is not about recreating a lost civilization, but about embodying its essence — through integrity, coherence, and conscious stewardship today.',
    ],
  },
  community: {
    kicker: 'Community',
    title: 'For those who feel the call.',
    body: [
      'Our community includes meditators, healers, facilitators, and space-holders who are already engaged in deep inner work.',
      'Those who feel drawn to The Atlantis Call are not looking for a first step, but for resonance.',
    ],
  },
  founder: {
    kicker: 'Founder',
    name: 'Fabian',
    title: 'Fabian',
    body: [
      'Raised in Berlin and shaped by a life of exploration, inner inquiry, and lived experience, his path led him from the corporate world into a deep relationship with the sea.',
      'His approach is grounded not in ideology, but in presence, discernment, and integrity. Fabian devotes his work to creating intimate, well-held containers where people can reconnect.',
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
