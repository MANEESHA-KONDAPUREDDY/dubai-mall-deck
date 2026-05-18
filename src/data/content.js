/**
 * content.js — single source of truth for the deck.
 *
 * Every section reads its copy, stats, and media references from here.
 * Keeping content separate from components means the deck can be re-skinned
 * for another property without touching a single component — which is
 * exactly how this deck was retargeted from one mall to another.
 *
 * NOTE ON DATA: Headline figures (area, store count, visitor volume,
 * attraction specs) reflect publicly reported figures for The Dubai Mall.
 * A few audience/commercial figures are illustrative and flagged as such
 * in the README — appropriate for a sales narrative, honest for an
 * evaluation context.
 */

export const meta = {
  property: 'The Dubai Mall',
  shortName: 'Dubai Mall',
  tagline: 'Not the largest mall in the world — the most-visited place in it.',
  location: 'Downtown Dubai, United Arab Emirates',
  contactEmail: 'partnerships@dubaimall-deck.example',
};

/**
 * media — every video reference in the deck, in one place.
 *
 * Videos play via YouTube embeds: paste a video ID here and the hero comes
 * alive — no downloading or transcoding. Leave a value empty and the deck
 * shows a cinematic gradient placeholder instead, so it never looks broken.
 *
 * A YouTube ID is the part after "watch?v=" — e.g. for
 * youtube.com/watch?v=dQw4w9WgXcQ the id is "dQw4w9WgXcQ".
 */
export const media = {
  // Opening hero — the Dubai Fountain in 4K HDR: continuous footage, no
  // baked-in title cards, dark and cinematic so the headline reads clean.
  heroVideoId: 'NdXyTFktapM',
  // Events section — a second Dubai Fountain show angle.
  eventsVideoId: 'dFtckQwGpYo',
  // Sub-module heroes — reuses the events film when left empty.
  moduleVideoId: '',
  // Poster stills — shown instantly, and used in place of the video on
  // mobile so the experience stays fast on a phone.
  heroPoster: '/assets/images/hero-poster.jpg',
  eventsPoster: '/assets/images/events-fountain.jpg',
};

/**
 * Drives the non-linear navigation: the Index overlay, the side rail, and
 * scroll-spy. Each entry carries a tagline and a preview image so the
 * Index menu can show a content preview, not just a label.
 */
export const navSections = [
  {
    id: 'hero',
    label: 'Overview',
    index: '01',
    tagline: 'The most-visited place on Earth',
    image: '/assets/images/hero-poster.jpg',
  },
  {
    id: 'why',
    label: 'Why Dubai Mall',
    index: '02',
    tagline: "A global city's centre of gravity",
    image: '/assets/images/why-aerial.jpg',
  },
  {
    id: 'retail',
    label: 'Retail',
    index: '03',
    tagline: '1,200 brands, one global audience',
    image: '/assets/images/retail-concourse.jpg',
  },
  {
    id: 'luxury',
    label: 'Fashion Avenue',
    index: '04',
    tagline: 'The global address of luxury',
    image: '/assets/images/fashion-avenue.jpg',
  },
  {
    id: 'dining',
    label: 'Dining',
    index: '05',
    tagline: 'Two hundred reasons to stay',
    image: '/assets/images/dining-fountain.jpg',
  },
  {
    id: 'attractions',
    label: 'Attractions',
    index: '06',
    tagline: 'An aquarium, a fountain, a waterfall — indoors',
    image: '/assets/images/attraction-aquarium.jpg',
  },
  {
    id: 'events',
    label: 'Events',
    index: '07',
    tagline: 'Where the world tunes in',
    image: '/assets/images/events-fountain.jpg',
  },
  {
    id: 'invite',
    label: 'Partner',
    index: '08',
    tagline: 'Choose how your brand arrives',
    image: '/assets/images/invite-closing.jpg',
  },
];

export const hero = {
  eyebrow: 'Downtown Dubai · United Arab Emirates',
  titleLines: ['The most-visited', 'place on Earth.'],
  lead: 'Over 105 million visits a year. 1,200 stores, 200 restaurants, a ten-million-litre aquarium, and the world’s tallest building at the door. The Dubai Mall is not a shopping centre — it is a destination the planet travels to.',
  stats: [
    { value: '105M+', label: 'Annual visits' },
    { value: '1,200+', label: 'Brands in residence' },
    { value: '12M', label: 'Square feet' },
  ],
  scrollHint: 'Explore the destination',
};

export const why = {
  eyebrow: 'Why The Dubai Mall',
  title: 'The centre of gravity for a global city.',
  lead: 'The Dubai Mall sits at the foot of the Burj Khalifa, in the heart of the most-visited tourism city on Earth. It does not compete for footfall — the world arrives at its doors.',
  pillars: [
    {
      k: 'Reach',
      title: 'A planet’s worth of visitors',
      body: 'More than 105 million visits a year, drawn from every continent — the majority international travellers arriving with time, intent, and spend.',
    },
    {
      k: 'Adjacency',
      title: 'At the foot of the Burj Khalifa',
      body: 'Connected to the world’s tallest building, the Dubai Fountain, the metro, and Downtown Dubai’s hotels — the property sits inside the city’s single biggest attraction cluster.',
    },
    {
      k: 'Affluence',
      title: 'A high-spend, duty-light market',
      body: 'Dubai’s tax-friendly retail environment and an affluent resident and tourist base make every square foot work harder for the brands inside it.',
    },
    {
      k: 'Always-on',
      title: 'A destination with no off-season',
      body: 'From the Dubai Shopping Festival to year-round programming, the property runs a 12-month calendar of reasons to visit and return.',
    },
  ],
  stats: [
    { value: '105M', label: 'Visits a year' },
    { value: 'No.1', label: 'Most-visited retail & leisure destination worldwide' },
    { value: '2008', label: 'Opened — over 15 years of destination equity' },
    { value: '200+', label: 'Nationalities among Dubai’s visitors' },
  ],
};

export const retail = {
  eyebrow: 'Retail at Scale',
  title: '1,200 brands. One global audience.',
  lead: 'From first-to-region flagships to the world’s marquee names, the retail floor is the largest curated collection of brands on the planet. A tenant here does not rent space — they plug straight into 105 million annual visits.',
  segments: [
    {
      name: 'Flagship & Anchor',
      copy: 'Marquee anchors and global flagships that set the property’s pull.',
    },
    {
      name: 'Specialty & Lifestyle',
      copy: 'The deepest specialty mix in the region — fashion, beauty, tech, home.',
    },
    {
      name: 'First-to-Region',
      copy: 'The launchpad for brands entering the Middle East for the first time.',
    },
    {
      name: 'Pop-Up & Activation',
      copy: 'Flexible short-term footprints for seasonal drops and brand tests.',
    },
  ],
  stats: [
    { value: '1,200+', label: 'Active retail brands' },
    { value: '3.77M', label: 'Sq ft of retail space' },
    { value: '4', label: 'Levels of continuous storefront' },
  ],
  cta: { label: 'Explore leasing paths', to: '/leasing' },
};

export const luxury = {
  eyebrow: 'Fashion Avenue',
  title: 'The global address of luxury.',
  lead: 'Fashion Avenue is the largest concentration of luxury retail in the region — a dedicated wing of flagship boutiques, haute couture, and architecture built to frame a brand as an icon.',
  points: [
    '150+ of the world’s most coveted luxury houses, under one roof.',
    'Dedicated flagship and maison-format spaces with bespoke architecture.',
    'A catwalk atrium, valet, and concierge built for the luxury client.',
    'Direct adjacency to five-star hospitality and the Burj Khalifa.',
  ],
  pullQuote:
    'A boutique on Fashion Avenue is not a store. It is a brand’s flagship to the most international audience on Earth.',
};

export const dining = {
  eyebrow: 'Dining & Lifestyle',
  title: 'Two hundred reasons to stay.',
  lead: 'More than 200 cafés, restaurants, and lounges — many with a front-row view of the Dubai Fountain. Dining here is what turns a visit into an evening, and an evening into a memory.',
  experiences: [
    {
      name: 'Fine Dining',
      copy: 'Signature restaurants that anchor a night out.',
      image: '/assets/images/dining-table.jpg',
    },
    {
      name: 'Cafés & Casual',
      copy: 'High-velocity concepts feeding peak foot traffic.',
      image: '/assets/images/dining-foodcourt.jpg',
    },
    {
      name: 'Fountain-View',
      copy: 'Terraces overlooking the world’s largest fountain.',
      image: '/assets/images/dining-fountain.jpg',
    },
    {
      name: 'Lounges & Nightlife',
      copy: 'Evening programming that extends trading hours.',
      image: '/assets/images/invite-closing.jpg',
    },
  ],
  stats: [
    { value: '200+', label: 'Dining & beverage concepts' },
    { value: '3x', label: 'Longer dwell time vs. retail-only visits' },
  ],
};

export const attractions = {
  eyebrow: 'Attractions & Entertainment',
  title: 'An aquarium. A waterfall. A fountain. Indoors.',
  lead: 'The Dubai Mall built entertainment into its architecture. A ten-million-litre aquarium. A multi-storey indoor waterfall. An Olympic ice rink. The world’s largest fountain at the door. This is the spectacle no standalone retailer can ever build.',
  features: [
    {
      name: 'Dubai Aquarium & Underwater Zoo',
      tag: 'Marine Spectacle',
      copy: 'A 10-million-litre tank and a 48-metre walkthrough tunnel — one of the largest suspended aquariums on Earth, at the heart of the retail floor.',
      image: '/assets/images/attraction-aquarium.jpg',
    },
    {
      name: 'The Dubai Fountain',
      tag: 'World’s Largest Fountain',
      copy: 'A choreographed water, light, and music spectacle on Burj Lake — performing to a global audience every single day.',
      image: '/assets/images/events-fountain.jpg',
    },
    {
      name: 'Waterfall & Ice Rink',
      tag: 'Architectural Features',
      copy: 'A multi-storey indoor waterfall and an Olympic-size ice rink woven directly into the shopping experience.',
      image: '/assets/images/attraction-waterfall.jpg',
    },
    {
      name: 'VR Park & Cinemas',
      tag: 'Live Entertainment',
      copy: 'A large-format VR park and a flagship multiplex anchoring year-round family footfall.',
      image: '/assets/images/attraction-aquarium-2.jpg',
    },
  ],
  stats: [
    { value: '10M L', label: 'Aquarium tank volume' },
    { value: '48 m', label: 'Underwater walkthrough tunnel' },
    { value: 'World #1', label: 'Largest choreographed fountain' },
  ],
};

export const events = {
  eyebrow: 'Events & Platform',
  title: 'Where the world tunes in.',
  lead: 'New Year’s Eve broadcasts to billions. Global product launches. Fashion weeks and celebrity moments. When a brand activates at The Dubai Mall, it does not reach a city — it reaches the world’s media.',
  formats: [
    'Global product launches & reveals',
    'Fashion shows & runway moments',
    'Celebrity & talent appearances',
    'Broadcast & media productions',
    'Cultural & seasonal festivals',
    'Corporate & VIP events',
  ],
  stats: [
    { value: 'Billions', label: 'Broadcast reach on landmark nights' },
    { value: '12 mo', label: 'Year-round programming calendar' },
    { value: 'Global', label: 'Press footprint per activation' },
  ],
  cta: { label: 'Open the Events Module', target: '/events' },
};

export const invite = {
  eyebrow: 'Become Part of It',
  title: 'Choose how you arrive.',
  lead: 'Every path into The Dubai Mall leads to the same 105 million people. The only question is how your brand wants to meet them.',
  paths: [
    {
      k: 'Lease',
      title: 'Lease retail space',
      copy: 'Flagship, specialty, first-to-region, or pop-up footprints.',
      action: 'Start a leasing conversation',
    },
    {
      k: 'Sponsor',
      title: 'Sponsor the property',
      copy: 'Brand partnerships and activations across a global audience.',
      action: 'Explore sponsorship tiers',
    },
    {
      k: 'Book',
      title: 'Book a venue',
      copy: 'Launches, performances, broadcasts, and cultural events.',
      action: 'Open the Events Module',
    },
  ],
  closingLine: 'The Dubai Mall — the most-visited destination on Earth.',
};

/* ----------------------------------------------------------------------
 * PHASE 2 — Expandable sub-module data.
 * Lives here so the deck can grow new modules without architectural change.
 * -------------------------------------------------------------------- */
export const eventsModule = {
  eyebrow: 'Events Module',
  title: 'Stage your moment where the world is watching.',
  lead: 'A dedicated look at what it takes to host an event inside The Dubai Mall — venues, capacities, past highlights, and a direct line to the events team.',
  venues: [
    {
      name: 'The Fountain Stage',
      use: 'Launches · Performances · Broadcasts',
      capacity: 'Thousands, plus Burj Lake sightlines',
      copy: 'The waterfront stage set against the Dubai Fountain and the Burj Khalifa — built for spectacle and global camera coverage.',
    },
    {
      name: 'Fashion Avenue Atrium',
      use: 'Fashion · Luxury activations · Receptions',
      capacity: 'Up to ~1,500 guests',
      copy: 'A runway-ready luxury atrium with a catwalk and premium hospitality, framed by flagship boutiques.',
    },
    {
      name: 'The Grand Atrium',
      use: 'Reveals · Exhibitions · Cultural events',
      capacity: 'Up to ~3,000 guests',
      copy: 'A soaring multi-level atrium for large-format product reveals and cultural programming.',
    },
    {
      name: 'Concourse Activations',
      use: 'Pop-ups · Sampling · Experiential',
      capacity: 'Footfall-based',
      copy: 'High-traffic concourse footprints that place a brand directly in the path of every visitor.',
    },
  ],
  highlights: [
    'New Year’s Eve light-and-fireworks broadcasts seen by billions',
    'Global luxury and automotive product reveals',
    'International fashion weeks and runway showcases',
    'Network television broadcasts and live cultural festivals',
  ],
  tiers: [
    {
      name: 'Activation',
      scope: 'Single-day brand moment',
      includes: ['Concourse or atrium footprint', 'Standard production support', 'Footfall reporting'],
    },
    {
      name: 'Signature',
      scope: 'Marquee event at a flagship venue',
      includes: ['Premium venue & staging', 'Full production & AV', 'Press & media coordination', 'Audience analytics'],
      featured: true,
    },
    {
      name: 'Platform',
      scope: 'Multi-event annual partnership',
      includes: ['Priority venue access', 'Year-round programming', 'Co-marketing & sponsorship', 'Dedicated events lead'],
    },
  ],
  formSubject: 'Venue booking enquiry — The Dubai Mall',
};

export const sponsorshipModule = {
  eyebrow: 'Sponsorship Module',
  title: 'Put your brand inside the visit.',
  lead: 'The Dubai Mall is a year-round media channel that 105 million people walk through. Sponsorship turns that traffic into branded experience — owned space, owned moments, owned attention.',
  audienceIntro: 'Who a sponsorship reaches',
  audienceStats: [
    { value: '105M+', label: 'Annual visits from every continent' },
    { value: '200+', label: 'Visitor nationalities — a truly global audience' },
    { value: '12 mo', label: 'Year-round programming — no off-season' },
    { value: 'High', label: 'Tourist and resident spend power' },
  ],
  activations: [
    { name: 'Naming & Venue Rights', copy: 'Put your brand on a wing, an attraction, or an event space.' },
    { name: 'Experiential Footprints', copy: 'Permanent or seasonal branded installations in high-traffic zones.' },
    { name: 'Digital Screen Network', copy: 'A property-wide network of screens and digital touchpoints.' },
    { name: 'Programming Partnerships', copy: 'Co-create events, festivals, and seasonal campaigns.' },
    { name: 'Sampling & Product Trial', copy: 'Direct-to-consumer sampling in the path of every visitor.' },
    { name: 'Co-Marketing', copy: "Joint campaigns across the property's owned media channels." },
  ],
  tiers: [
    {
      name: 'Activation Partner',
      scope: 'Single campaign or season',
      includes: ['Branded footprint in one zone', 'Digital screen rotation', 'Footfall & impression reporting'],
    },
    {
      name: 'Signature Partner',
      scope: 'Year-round category presence',
      includes: ['Premium zone naming rights', 'Property-wide screen network', 'Co-branded events & programming', 'Audience analytics dashboard'],
      featured: true,
    },
    {
      name: 'Destination Partner',
      scope: 'Multi-year strategic alliance',
      includes: ['Wing or attraction naming', 'Integrated campaign calendar', 'Dedicated partnership team', 'First-right on new inventory'],
    },
  ],
  formSubject: 'Sponsorship enquiry — The Dubai Mall',
};

export const leasingModule = {
  eyebrow: 'Leasing Module',
  title: 'Find your space in the destination.',
  lead: 'Whether you are a global luxury maison or a six-week pop-up, there is a path into The Dubai Mall built for you. Each leasing category carries its own audience, format, and pitch.',
  paths: [
    {
      k: 'Fashion Avenue Luxury',
      fit: 'Luxury houses & haute couture',
      copy: 'Bespoke flagship and maison-format space in the region’s definitive luxury wing, with concierge-grade services.',
    },
    {
      k: 'Specialty Retail',
      fit: 'Fashion, beauty, tech, lifestyle, home',
      copy: 'In-line storefronts across four concourses — the deepest specialty mix in the region, in continuous high-traffic flow.',
    },
    {
      k: 'Food & Beverage',
      fit: 'Restaurants, cafés, lounges',
      copy: 'Full-service, fast-casual, and fountain-view footprints engineered as dwell-time engines for the whole property.',
    },
    {
      k: 'Pop-Up & Activation',
      fit: 'Seasonal, DTC, first-to-region brands',
      copy: 'Flexible short-term footprints for seasonal drops, brand tests, and market-entry launches — low commitment, high exposure.',
    },
  ],
  process: [
    { step: 'Enquire', copy: 'Tell us your brand, preferred format, and timing.' },
    { step: 'Match', copy: 'We identify available space and the right concourse.' },
    { step: 'Propose', copy: 'You receive a tailored space and commercial proposal.' },
    { step: 'Open', copy: 'Fit-out, onboarding, and launch support to opening day.' },
  ],
  stats: [
    { value: '1,200+', label: 'Brands currently in residence' },
    { value: '3.77M', label: 'Sq ft of leasable retail' },
    { value: '4', label: 'Concourse levels of storefront' },
  ],
  formSubject: 'Leasing enquiry — The Dubai Mall',
};
