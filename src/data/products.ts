import { Product } from '../domain/models/product';

export const featuredProducts: Product[] = [
  {
    id: '1',
    title: 'AirPods Pro Max Clone',
    description: 'High-quality wireless headphones with active noise cancellation.',
    category: 'Electronics',
    price: 1299,
    originalPrice: 1899,
    image: '/images/airpods_clone.png',
    inStock: true,
    stockCount: 50,
    sku: 'ELEC-AP-001',
  },
  {
    id: '2',
    title: 'BoomBox Portable Speaker',
    description: 'Waterproof portable Bluetooth speaker with 20 hours of playtime.',
    category: 'Electronics',
    price: 599,
    originalPrice: 899,
    image: '/images/boombox_speaker.png',
    inStock: true,
    stockCount: 120,
    sku: 'ELEC-SP-002',
  }
];

export const sampleProduct: Product = {
  id: '3',
  title: 'SmartWatch Rose Gold Edition',
  description: 'Premium smartwatch with health tracking, GPS, and 5-day battery life. Features include heart rate monitoring, sleep tracking, water resistance, and smartphone notifications.',
  price: 1499,
  originalPrice: 2199,
  category: 'Electronics',
  image: '/images/smartwatch_main.png',
  images: [
    '/images/smartwatch_main.png',
    '/images/smartwatch_main.png',
    '/images/smartwatch_main.png'
  ],
  inStock: true,
  stockCount: 15,
  sku: 'SW-RG-001',
  features: [
    '1.4" AMOLED Display',
    'Heart Rate & SpO2 Monitoring',
    'GPS Tracking',
    '5-Day Battery Life',
    'Water Resistant (5ATM)',
    'Bluetooth 5.0',
    'Compatible with iOS & Android'
  ]
};
