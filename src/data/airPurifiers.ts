export type PurifierType =
  | '2-in-1 Purifier Fan'
  | 'Dedicated HEPA'
  | 'Humidifying Purifier'
  | 'Pet & Allergen Care';

export interface AirPurifierProduct {
  id: string;
  sku: string;
  brand: 'Dyson' | 'Electrolux' | 'Novita' | 'LG' | 'Sharp' | 'EuropAce' | 'Whirlpool';
  name: string;
  shortSubtitle: string;
  price: number;
  usualPrice?: number;
  purifierType: PurifierType;
  coverageSqm: number;
  cadrCmh: number;
  filtration: string;
  noiseDb: string;
  smartControl: string;
  dimensionsMm: string;
  warrantyYears: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  clickAndCollect: boolean;
  climateVoucherEligible: boolean;
  promoLabel?: string;
  image: string;
  highlights: string[];
  description: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  region: 'Central' | 'East' | 'South' | 'North' | 'West';
  address: string;
  mrt: string;
  hours: string;
  pickupReadyText: string;
}

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_air_purifier_banner_1795062400806.jpg';

export const SINGAPORE_STORES: StoreLocation[] = [
  {
    id: 'millenia-walk',
    name: 'Millenia Walk Flagship Superstore',
    region: 'Central',
    address: '9 Raffles Boulevard, #01-59/63, #02-37/41, Singapore 039596',
    mrt: 'Promenade MRT (Exit A)',
    hours: 'Daily 10:30 AM – 9:30 PM',
    pickupReadyText: 'Ready in 2 hours',
  },
  {
    id: 'parkway-parade',
    name: 'Parkway Parade',
    region: 'East',
    address: '80 Marine Parade Road, #03-01/10, Singapore 449269',
    mrt: 'Marine Parade MRT',
    hours: 'Daily 10:30 AM – 9:30 PM',
    pickupReadyText: 'Ready in 2 hours',
  },
  {
    id: 'vivocity',
    name: 'VivoCity',
    region: 'South',
    address: '1 HarbourFront Walk, #02-12/18, Singapore 098585',
    mrt: 'HarbourFront MRT',
    hours: 'Daily 10:30 AM – 9:30 PM',
    pickupReadyText: 'Ready in 2 hours',
  },
  {
    id: 'northpoint-city',
    name: 'Northpoint City',
    region: 'North',
    address: '930 Yishun Avenue 2, #B1-141/145, Singapore 769098',
    mrt: 'Yishun MRT',
    hours: 'Daily 10:30 AM – 9:30 PM',
    pickupReadyText: 'Ready today',
  },
  {
    id: 'jurong-point',
    name: 'Jurong Point',
    region: 'West',
    address: '1 Jurong West Central 2, #03-34/39, Singapore 648886',
    mrt: 'Boon Lay MRT',
    hours: 'Daily 10:30 AM – 9:30 PM',
    pickupReadyText: 'Ready in 2 hours',
  },
];

export const AIR_PURIFIER_PRODUCTS: AirPurifierProduct[] = [
  {
    id: 'dyson-tp12-nickel-gold',
    sku: 'DY-TP12-NG',
    brand: 'Dyson',
    name: 'Dyson Purifier Big+Quiet & Tower Fan TP12 (Nickel / Gold)',
    shortSubtitle: 'Formaldehyde catalytic sensor with HEPA H13 sealed airflow',
    price: 699,
    usualPrice: 1109,
    purifierType: '2-in-1 Purifier Fan',
    coverageSqm: 81,
    cadrCmh: 495,
    filtration: '360° Glass HEPA H13 + Activated Carbon',
    noiseDb: '22 – 50 dB',
    smartControl: 'MyDyson App, Alexa, Siri',
    dimensionsMm: '1050 × 220 × 220 mm',
    warrantyYears: 2,
    rating: 4.9,
    reviewCount: 148,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$410',
    image: '/src/assets/images/purifier_dyson_gold_1795062400434.jpg',
    highlights: [
      'Captures 99.95% of ultrafine particles down to 0.1 microns',
      'Continuous solid-state formaldehyde detection & destruction',
      '350° oscillation with Air Multiplier cooling projection',
    ],
    description:
      'Engineered for large HDB living rooms and open-plan condos, the Dyson TP12 combines fully sealed HEPA H13 filtration with powerful bladeless cooling airflow and real-time LCD air quality reporting.',
  },
  {
    id: 'dyson-tp07-black-nickel',
    sku: 'DY-TP07-BN',
    brand: 'Dyson',
    name: 'Dyson Purifier Cool TP07 2-in-1 Air Purifier Fan (Black / Nickel)',
    shortSubtitle: 'Whole-room HEPA purification with 20% quieter acoustic chamber',
    price: 909,
    usualPrice: 999,
    purifierType: '2-in-1 Purifier Fan',
    coverageSqm: 81,
    cadrCmh: 450,
    filtration: 'Sealed HEPA H13 + Carbon VOC Filter',
    noiseDb: '20 – 48 dB',
    smartControl: 'MyDyson App & Voice Control',
    dimensionsMm: '1050 × 204 × 204 mm',
    warrantyYears: 2,
    rating: 4.8,
    reviewCount: 214,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$90',
    image: '/src/assets/images/purifier_dyson_tower_1795062399631.jpg',
    highlights: [
      'Automatically senses PM2.5, PM10, VOCs, and NO₂ pollutants',
      'Night mode dims display and operates at whisper-quiet speed',
      'Magnetised remote control docks neatly atop the loop',
    ],
    description:
      'Dyson Purifier Cool TP07 is acoustically engineered to run 20% quieter while delivering over 290 litres of smooth purified airflow per second across Singapore bedrooms and living spaces.',
  },
  {
    id: 'electrolux-ultimatehome-500',
    sku: 'ELX-EP53-45SWA',
    brand: 'Electrolux',
    name: 'Electrolux UltimateHome 500 Air Purifier (Shell White / Heather Grey)',
    shortSubtitle: '4-stage 360° spiral air filtration with anti-bacterial coating',
    price: 319,
    usualPrice: 389,
    purifierType: 'Dedicated HEPA',
    coverageSqm: 54,
    cadrCmh: 415,
    filtration: '4-Stage True HEPA H13 + Activated Carbon',
    noiseDb: '19 – 49 dB',
    smartControl: 'Electrolux App & Touch Panel',
    dimensionsMm: '575 × 240 × 240 mm',
    warrantyYears: 2,
    rating: 4.7,
    reviewCount: 92,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: true,
    promoLabel: 'Save S$70',
    image: '/src/assets/images/purifier_electrolux_cylinder_1795062400577.jpg',
    highlights: [
      'Neutralises up to 99.99% of tested bacteria and H1N1 viruses',
      'Scandinavian textile exterior blends naturally into modern interiors',
      'Laser particle sensor adjusts fan speed automatically',
    ],
    description:
      'Wrapped in tactile grey fabric with a minimalist top louvre, the Electrolux UltimateHome 500 circulates clean air evenly across 54 m² rooms in under 15 minutes.',
  },
  {
    id: 'novita-puriclean-a11i',
    sku: 'NOV-A11I-WH',
    brand: 'Novita',
    name: 'Novita PuriClean A11I Smart HEPA Air Purifier (Matte White)',
    shortSubtitle: 'Dual-suction H13 HEPA + semi-permanent built-in ionizer',
    price: 258,
    usualPrice: 469,
    purifierType: 'Dedicated HEPA',
    coverageSqm: 60,
    cadrCmh: 480,
    filtration: '3-in-1 PuriPro H13 HEPA + Granular Carbon',
    noiseDb: '24 – 52 dB',
    smartControl: 'Novita Smart App & Wi-Fi',
    dimensionsMm: '540 × 270 × 270 mm',
    warrantyYears: 2,
    rating: 4.7,
    reviewCount: 176,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$211',
    image: '/src/assets/images/purifier_novita_compact_1795062401224.jpg',
    highlights: [
      'Real-time PM2.5 digital display with 4-colour air quality ring',
      'Built-in negative ionizer helps settle airborne haze particles',
      'Low energy 38W DC brushless motor for 24/7 operation',
    ],
    description:
      'Designed specifically for Singapore haze and urban allergen protection, the Novita A11I delivers high 480 m³/h CADR performance in a compact footprint.',
  },
  {
    id: 'lg-puricare-aerocat-tower',
    sku: 'LG-AF25CATM',
    brand: 'LG',
    name: 'LG PuriCare AeroCat Tower Air Purifier (Clay Brown)',
    shortSubtitle: '360° pet dander & odour purification with heated rest perch',
    price: 899,
    usualPrice: 1099,
    purifierType: 'Pet & Allergen Care',
    coverageSqm: 58,
    cadrCmh: 420,
    filtration: '360° Pet HEPA H13 + Photocatalytic Deodoriser',
    noiseDb: '21 – 47 dB',
    smartControl: 'LG ThinQ App + Weight Monitor',
    dimensionsMm: '760 × 310 × 310 mm',
    warrantyYears: 2,
    rating: 4.9,
    reviewCount: 41,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$200',
    image: '/src/assets/images/purifier_lg_aerocat_1795062399731.jpg',
    highlights: [
      'Washable pre-filter traps loose pet fur before it clogs HEPA media',
      'Cat-friendly 34°C–39°C heated dome seat with silent Cat Mode',
      'UVnano fan blade sterilisation removes 99.99% of bacteria',
    ],
    description:
      'Built for pet-loving households, the LG PuriCare AeroCat Tower combines 360-degree allergen & ammonia odour filtration with an ergonomic heated lounge perch and ThinQ health tracking.',
  },
  {
    id: 'sharp-kin50-humidifying',
    sku: 'SHP-KIN50-GY',
    brand: 'Sharp',
    name: 'Sharp Plasmacluster KI-N50 Humidifying Air Purifier (Charcoal / Silver)',
    shortSubtitle: 'High-density Plasmacluster 25000 ions + evaporative humidification',
    price: 1063,
    usualPrice: 1199,
    purifierType: 'Humidifying Purifier',
    coverageSqm: 38,
    cadrCmh: 306,
    filtration: 'Plasmacluster 25000 + HEPA + Deodorising + Humidifying',
    noiseDb: '17 – 51 dB',
    smartControl: 'Sharp Air App (Wi-Fi)',
    dimensionsMm: '619 × 384 × 230 mm',
    warrantyYears: 1,
    rating: 4.8,
    reviewCount: 64,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$136',
    image: '/src/assets/images/purifier_sharp_humidifier_1795062400012.jpg',
    highlights: [
      'Balances dry air-conditioned bedrooms with 600 ml/h moisture output',
      'Plasmacluster 25000 suppresses airborne mould, static, and odours',
      'Coanda airflow technology draws dust from low floor levels',
    ],
    description:
      'Ideal for air-conditioned Singapore bedrooms, the Sharp KI-N50 simultaneously purifies fine dust and gently restores optimal 45–55% indoor humidity overnight.',
  },
  {
    id: 'novita-a5-compact',
    sku: 'NOV-A5-WH',
    brand: 'Novita',
    name: 'Novita A5 Compact HEPA Air Purifier (Pure White)',
    shortSubtitle: 'Whisper-quiet bedroom purifier for study rooms & nurseries',
    price: 180,
    usualPrice: 328,
    purifierType: 'Dedicated HEPA',
    coverageSqm: 28,
    cadrCmh: 240,
    filtration: 'True HEPA H13 + Activated Carbon',
    noiseDb: '21 – 44 dB',
    smartControl: 'Capacitive Touch + Timer',
    dimensionsMm: '410 × 215 × 215 mm',
    warrantyYears: 2,
    rating: 4.6,
    reviewCount: 231,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$148',
    image: '/src/assets/images/purifier_novita_compact_1795062401224.jpg',
    highlights: [
      'Refreshes a standard 28 m² master bedroom up to 4 times per hour',
      'Ultra-low 21 dB sleep mode with lights-off indicator option',
      'One-touch child lock & filter replacement reminder',
    ],
    description:
      'Compact, affordable, and effective for HDB bedrooms and home offices, the Novita A5 clears dust mites, pollen, and cooking odours effortlessly.',
  },
  {
    id: 'europace-epu9200dwh',
    sku: 'EUR-EPU9200-DWH',
    brand: 'EuropAce',
    name: 'EuropAce DC Air Circulating HEPA Purifier Fan (White / Grey)',
    shortSubtitle: '3D multi-directional air circulation with medical-grade H13 HEPA',
    price: 399,
    usualPrice: 549,
    purifierType: '2-in-1 Purifier Fan',
    coverageSqm: 45,
    cadrCmh: 360,
    filtration: '3-Layer True HEPA H13 + UV-C Steriliser',
    noiseDb: '23 – 49 dB',
    smartControl: 'Smart Life App & Remote',
    dimensionsMm: '680 × 260 × 260 mm',
    warrantyYears: 2,
    rating: 4.6,
    reviewCount: 53,
    inStock: true,
    clickAndCollect: true,
    climateVoucherEligible: true,
    promoLabel: 'Save S$150',
    image: '/src/assets/images/purifier_electrolux_cylinder_1795062400577.jpg',
    highlights: [
      'Brushless DC motor cuts electricity usage by up to 60%',
      'Built-in UV-C chamber neutralises trapped pathogens inside filter',
      '12-speed wind control with 90° horizontal & vertical swing',
    ],
    description:
      'Combining an energy-saving DC circulator fan with H13 HEPA and UV-C sanitation, the EuropAce EPU9200 keeps air cool and allergen-free all year round.',
  },
  {
    id: 'whirlpool-ap628w-6th-sense',
    sku: 'WHP-AP628W',
    brand: 'Whirlpool',
    name: 'Whirlpool 6th Sense Dual-Sensor Air Purifier (Charcoal / Silver)',
    shortSubtitle: 'Auto-adapting 6th Sense particle & odour purification system',
    price: 449,
    usualPrice: 599,
    purifierType: 'Pet & Allergen Care',
    coverageSqm: 50,
    cadrCmh: 400,
    filtration: 'Pre-Filter + HEPA H13 + Honeycomb Carbon',
    noiseDb: '22 – 50 dB',
    smartControl: '6th Sense Auto Sensor + Touch',
    dimensionsMm: '590 × 345 × 220 mm',
    warrantyYears: 2,
    rating: 4.5,
    reviewCount: 38,
    inStock: false,
    clickAndCollect: true,
    climateVoucherEligible: false,
    promoLabel: 'Save S$150',
    image: '/src/assets/images/purifier_sharp_humidifier_1795062400012.jpg',
    highlights: [
      '6th Sense technology continuously calibrates airflow to PM2.5 & VOC levels',
      'High-capacity honeycomb activated carbon absorbs smoke and cooking fumes',
      'Child safety lock and magnetic front filter access door',
    ],
    description:
      'Equipped with Whirlpool 6th Sense dual sensors, this high-CADR air purifier responds immediately to smoke, pet dander, and fine particulate spikes.',
  },
];

export const BRAND_OPTIONS: Array<AirPurifierProduct['brand']> = [
  'Dyson',
  'Electrolux',
  'Novita',
  'LG',
  'Sharp',
  'EuropAce',
  'Whirlpool',
];

export const PURIFIER_TYPE_OPTIONS: PurifierType[] = [
  '2-in-1 Purifier Fan',
  'Dedicated HEPA',
  'Humidifying Purifier',
  'Pet & Allergen Care',
];
