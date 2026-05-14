// Global telecom operators — top 100+ by revenue
// Source: dgtlinfra.com, companiesmarketcap.com, Statista, Mordor Intelligence (2025)
// TAM/SAM/SOM for telecom digital twin market

export const MARKET_SIZING = {
  tam: { value: 49.47e9, label: '$49.5B', description: 'Global Digital Twin Market 2026' },
  sam: { value: 2.73e9, label: '$2.7B', description: 'Telecom Network Digital Twin 2026' },
  som: { value: 108e6, label: '$108M', description: 'AXON Addressable (Top 100 operators)' },
  totalOperators: 800,
  topOperatorsRevenue: 1.7e12,
  cagr: 16.6,
  growthTo2031: 5.89e9,
};

export const GLOBAL_OPERATORS = [
  // Tier 1 — $50B+ revenue
  { id: 'china-mobile', name: 'China Mobile', country: 'CN', region: 'APAC', lat: 39.9042, lng: 116.4074, revenue: 140e9, subs: '1.00B', tier: 1, status: 'prospect' },
  { id: 'att', name: 'AT&T', country: 'US', region: 'NA', lat: 32.7767, lng: -96.7970, revenue: 122e9, subs: '200M', tier: 1, status: 'prospect' },
  { id: 'verizon', name: 'Verizon', country: 'US', region: 'NA', lat: 40.7580, lng: -73.9855, revenue: 121e9, subs: '143M', tier: 1, status: 'prospect' },
  { id: 'comcast', name: 'Comcast', country: 'US', region: 'NA', lat: 39.9526, lng: -75.1652, revenue: 120e9, subs: '62M', tier: 1, status: 'prospect' },
  { id: 'dt', name: 'Deutsche Telekom', country: 'DE', region: 'EU', lat: 50.1109, lng: 8.6821, revenue: 120e9, subs: '300M', tier: 1, status: 'active' },
  { id: 'ntt', name: 'NTT', country: 'JP', region: 'APAC', lat: 35.6762, lng: 139.6503, revenue: 85e9, subs: '90M', tier: 1, status: 'prospect' },
  { id: 'airtel', name: 'Bharti Airtel', country: 'IN', region: 'APAC', lat: 28.6139, lng: 77.2090, revenue: 80e9, subs: '550M', tier: 1, status: 'prospect' },
  { id: 'china-unicom', name: 'China Unicom', country: 'CN', region: 'APAC', lat: 31.2304, lng: 121.4737, revenue: 70e9, subs: '339M', tier: 1, status: 'prospect' },
  { id: 'china-telecom', name: 'China Telecom', country: 'CN', region: 'APAC', lat: 30.5728, lng: 104.0668, revenue: 68e9, subs: '423M', tier: 1, status: 'prospect' },

  // Tier 2 — $15B–$50B revenue
  { id: 'orange', name: 'Orange', country: 'FR', region: 'EU', lat: 48.8566, lng: 2.3522, revenue: 48e9, subs: '287M', tier: 2, status: 'prospect' },
  { id: 'vodafone', name: 'Vodafone', country: 'GB', region: 'EU', lat: 51.5135, lng: -0.0968, revenue: 45e9, subs: '330M', tier: 2, status: 'prospect' },
  { id: 'america-movil', name: 'América Móvil', country: 'MX', region: 'LATAM', lat: 19.4326, lng: -99.1332, revenue: 45e9, subs: '400M', tier: 2, status: 'prospect' },
  { id: 'telefonica', name: 'Telefónica', country: 'ES', region: 'EU', lat: 40.4168, lng: -3.7038, revenue: 42e9, subs: '383M', tier: 2, status: 'active' },
  { id: 'tmobile', name: 'T-Mobile US', country: 'US', region: 'NA', lat: 47.6062, lng: -122.3321, revenue: 40e9, subs: '119M', tier: 2, status: 'prospect' },
  { id: 'softbank', name: 'SoftBank Corp', country: 'JP', region: 'APAC', lat: 35.6594, lng: 139.7005, revenue: 38e9, subs: '50M', tier: 2, status: 'prospect' },
  { id: 'kddi', name: 'KDDI', country: 'JP', region: 'APAC', lat: 35.6762, lng: 139.7500, revenue: 36e9, subs: '63M', tier: 2, status: 'prospect' },
  { id: 'charter', name: 'Charter Spectrum', country: 'US', region: 'NA', lat: 38.6270, lng: -90.1994, revenue: 34e9, subs: '55M', tier: 2, status: 'prospect' },
  { id: 'sk-telecom', name: 'SK Telecom', country: 'KR', region: 'APAC', lat: 37.5665, lng: 126.9780, revenue: 32e9, subs: '31M', tier: 2, status: 'prospect' },
  { id: 'kt', name: 'KT Corporation', country: 'KR', region: 'APAC', lat: 37.5726, lng: 126.9841, revenue: 28e9, subs: '22M', tier: 2, status: 'prospect' },
  { id: 'swisscom', name: 'Swisscom', country: 'CH', region: 'EU', lat: 46.9480, lng: 7.4474, revenue: 26e9, subs: '6.5M', tier: 2, status: 'prospect' },
  { id: 'reliance-jio', name: 'Reliance Jio', country: 'IN', region: 'APAC', lat: 19.0760, lng: 72.8777, revenue: 25e9, subs: '482M', tier: 2, status: 'prospect' },
  { id: 'telstra', name: 'Telstra', country: 'AU', region: 'APAC', lat: -33.8688, lng: 151.2093, revenue: 22e9, subs: '22M', tier: 2, status: 'prospect' },
  { id: 'rogers', name: 'Rogers Communications', country: 'CA', region: 'NA', lat: 43.6532, lng: -79.3832, revenue: 20e9, subs: '12M', tier: 2, status: 'prospect' },
  { id: 'lumen', name: 'Lumen Technologies', country: 'US', region: 'NA', lat: 39.7392, lng: -104.9903, revenue: 19e9, subs: '4.5M', tier: 2, status: 'active' },
  { id: 'bell-canada', name: 'Bell Canada', country: 'CA', region: 'NA', lat: 45.5017, lng: -73.5673, revenue: 18e9, subs: '12M', tier: 2, status: 'prospect' },
  { id: 'telenor', name: 'Telenor', country: 'NO', region: 'EU', lat: 59.9139, lng: 10.7522, revenue: 17e9, subs: '158M', tier: 2, status: 'prospect' },
  { id: 'telia', name: 'Telia Company', country: 'SE', region: 'EU', lat: 59.3293, lng: 18.0686, revenue: 16e9, subs: '25M', tier: 2, status: 'prospect' },
  { id: 'singtel', name: 'Singtel', country: 'SG', region: 'APAC', lat: 1.3521, lng: 103.8198, revenue: 15e9, subs: '770M', tier: 2, status: 'prospect' },

  // Tier 3 — $5B–$15B revenue
  { id: 'brightspeed', name: 'Brightspeed', country: 'US', region: 'NA', lat: 35.2271, lng: -80.8431, revenue: 10e9, subs: '6.5M', tier: 3, status: 'active' },
  { id: 'etisalat', name: 'e& (Etisalat)', country: 'AE', region: 'MEA', lat: 24.4539, lng: 54.3773, revenue: 14e9, subs: '163M', tier: 3, status: 'prospect' },
  { id: 'stc', name: 'STC (Saudi Telecom)', country: 'SA', region: 'MEA', lat: 24.7136, lng: 46.6753, revenue: 13e9, subs: '160M', tier: 3, status: 'prospect' },
  { id: 'turkcell', name: 'Turkcell', country: 'TR', region: 'MEA', lat: 41.0082, lng: 28.9784, revenue: 12e9, subs: '38M', tier: 3, status: 'prospect' },
  { id: 'mtn', name: 'MTN Group', country: 'ZA', region: 'MEA', lat: -26.2041, lng: 28.0473, revenue: 11e9, subs: '295M', tier: 3, status: 'prospect' },
  { id: 'telus', name: 'Telus', country: 'CA', region: 'NA', lat: 49.2827, lng: -123.1207, revenue: 11e9, subs: '10M', tier: 3, status: 'prospect' },
  { id: 'proximus', name: 'Proximus', country: 'BE', region: 'EU', lat: 50.8503, lng: 4.3517, revenue: 10e9, subs: '6M', tier: 3, status: 'prospect' },
  { id: 'bouygues', name: 'Bouygues Telecom', country: 'FR', region: 'EU', lat: 48.8738, lng: 2.2950, revenue: 9e9, subs: '15M', tier: 3, status: 'active' },
  { id: 'iliad', name: 'Iliad / Free', country: 'FR', region: 'EU', lat: 48.8698, lng: 2.3422, revenue: 9e9, subs: '48M', tier: 3, status: 'prospect' },
  { id: 'three-uk', name: 'Three UK', country: 'GB', region: 'EU', lat: 51.5074, lng: -0.1278, revenue: 8e9, subs: '10M', tier: 3, status: 'prospect' },
  { id: 'wind-tre', name: 'WindTre', country: 'IT', region: 'EU', lat: 41.9028, lng: 12.4964, revenue: 8e9, subs: '26M', tier: 3, status: 'prospect' },
  { id: 'tele2', name: 'Tele2', country: 'SE', region: 'EU', lat: 59.3326, lng: 18.0649, revenue: 7e9, subs: '5M', tier: 3, status: 'prospect' },
  { id: 'a1-telekom', name: 'A1 Telekom Austria', country: 'AT', region: 'EU', lat: 48.2082, lng: 16.3738, revenue: 7e9, subs: '25M', tier: 3, status: 'prospect' },
  { id: 'tim', name: 'TIM (Telecom Italia)', country: 'IT', region: 'EU', lat: 41.8719, lng: 12.5674, revenue: 7e9, subs: '30M', tier: 3, status: 'prospect' },
  { id: 'cassava', name: 'Cassava Technologies', country: 'ZW', region: 'MEA', lat: -17.8292, lng: 31.0522, revenue: 5e9, subs: '100M', tier: 3, status: 'active' },
  { id: 'claro', name: 'Claro (América Móvil)', country: 'BR', region: 'LATAM', lat: -23.5505, lng: -46.6333, revenue: 12e9, subs: '97M', tier: 3, status: 'prospect' },
  { id: 'movistar', name: 'Movistar (Telefónica)', country: 'AR', region: 'LATAM', lat: -34.6037, lng: -58.3816, revenue: 8e9, subs: '40M', tier: 3, status: 'prospect' },
  { id: 'telkom-sa', name: 'Telkom SA', country: 'ZA', region: 'MEA', lat: -25.7479, lng: 28.2293, revenue: 5e9, subs: '17M', tier: 3, status: 'prospect' },
  { id: 'safaricom', name: 'Safaricom', country: 'KE', region: 'MEA', lat: -1.2921, lng: 36.8219, revenue: 5e9, subs: '44M', tier: 3, status: 'prospect' },
  { id: 'celcom', name: 'CelcomDigi', country: 'MY', region: 'APAC', lat: 3.1390, lng: 101.6869, revenue: 5e9, subs: '20M', tier: 3, status: 'prospect' },

  // Tier 4 — $1B–$5B revenue (emerging / regional)
  { id: 'globe', name: 'Globe Telecom', country: 'PH', region: 'APAC', lat: 14.5995, lng: 120.9842, revenue: 4e9, subs: '88M', tier: 4, status: 'prospect' },
  { id: 'pldt', name: 'PLDT', country: 'PH', region: 'APAC', lat: 14.5547, lng: 121.0244, revenue: 4e9, subs: '72M', tier: 4, status: 'prospect' },
  { id: 'axiata', name: 'Axiata Group', country: 'MY', region: 'APAC', lat: 3.1569, lng: 101.7123, revenue: 4e9, subs: '180M', tier: 4, status: 'prospect' },
  { id: 'oi', name: 'Oi (Brazil)', country: 'BR', region: 'LATAM', lat: -22.9068, lng: -43.1729, revenue: 3e9, subs: '30M', tier: 4, status: 'prospect' },
  { id: 'entel', name: 'Entel Chile', country: 'CL', region: 'LATAM', lat: -33.4489, lng: -70.6693, revenue: 3e9, subs: '12M', tier: 4, status: 'prospect' },
  { id: 'millicom', name: 'Millicom (Tigo)', country: 'LU', region: 'LATAM', lat: 14.6349, lng: -90.5069, revenue: 3e9, subs: '55M', tier: 4, status: 'prospect' },
  { id: 'digicel', name: 'Digicel', country: 'JM', region: 'LATAM', lat: 18.1096, lng: -77.2975, revenue: 2e9, subs: '12M', tier: 4, status: 'prospect' },
  { id: 'batelco', name: 'Batelco', country: 'BH', region: 'MEA', lat: 26.2285, lng: 50.5860, revenue: 2e9, subs: '8M', tier: 4, status: 'prospect' },
  { id: 'zain', name: 'Zain Group', country: 'KW', region: 'MEA', lat: 29.3759, lng: 47.9774, revenue: 4e9, subs: '52M', tier: 4, status: 'prospect' },
  { id: 'ooredoo', name: 'Ooredoo', country: 'QA', region: 'MEA', lat: 25.2854, lng: 51.5310, revenue: 3e9, subs: '70M', tier: 4, status: 'prospect' },
  { id: 'du', name: 'du (EITC)', country: 'AE', region: 'MEA', lat: 25.2048, lng: 55.2708, revenue: 3e9, subs: '8M', tier: 4, status: 'prospect' },
  { id: 'maroc-telecom', name: 'Maroc Telecom', country: 'MA', region: 'MEA', lat: 33.9716, lng: -6.8498, revenue: 3e9, subs: '75M', tier: 4, status: 'prospect' },
  { id: 'ethio-telecom', name: 'Ethio Telecom', country: 'ET', region: 'MEA', lat: 9.0054, lng: 38.7636, revenue: 2e9, subs: '72M', tier: 4, status: 'prospect' },
  { id: 'sonatel', name: 'Sonatel (Orange)', country: 'SN', region: 'MEA', lat: 14.7167, lng: -17.4677, revenue: 2e9, subs: '36M', tier: 4, status: 'prospect' },
  { id: 'airtel-africa', name: 'Airtel Africa', country: 'NG', region: 'MEA', lat: 6.5244, lng: 3.3792, revenue: 5e9, subs: '150M', tier: 4, status: 'prospect' },
  { id: 'maxis', name: 'Maxis', country: 'MY', region: 'APAC', lat: 3.1209, lng: 101.6538, revenue: 2e9, subs: '11M', tier: 4, status: 'prospect' },
  { id: 'ncell', name: 'Ncell', country: 'NP', region: 'APAC', lat: 27.7172, lng: 85.3240, revenue: 1e9, subs: '17M', tier: 4, status: 'prospect' },
  { id: 'smart', name: 'Smart Axiata', country: 'KH', region: 'APAC', lat: 11.5564, lng: 104.9282, revenue: 1e9, subs: '10M', tier: 4, status: 'prospect' },
  { id: 'optus', name: 'Optus', country: 'AU', region: 'APAC', lat: -33.7963, lng: 151.1382, revenue: 7e9, subs: '11M', tier: 4, status: 'prospect' },
  { id: 'spark', name: 'Spark NZ', country: 'NZ', region: 'APAC', lat: -36.8485, lng: 174.7633, revenue: 3e9, subs: '3M', tier: 4, status: 'prospect' },
  { id: 'true-corp', name: 'True Corp', country: 'TH', region: 'APAC', lat: 13.7563, lng: 100.5018, revenue: 4e9, subs: '50M', tier: 4, status: 'prospect' },
  { id: 'ais', name: 'AIS', country: 'TH', region: 'APAC', lat: 13.7270, lng: 100.5230, revenue: 5e9, subs: '46M', tier: 4, status: 'prospect' },
  { id: 'indosat', name: 'Indosat Ooredoo', country: 'ID', region: 'APAC', lat: -6.2088, lng: 106.8456, revenue: 3e9, subs: '100M', tier: 4, status: 'prospect' },
  { id: 'telkomsel', name: 'Telkomsel', country: 'ID', region: 'APAC', lat: -6.1751, lng: 106.8650, revenue: 5e9, subs: '170M', tier: 4, status: 'prospect' },
  { id: 'xl-axiata', name: 'XL Axiata', country: 'ID', region: 'APAC', lat: -6.2250, lng: 106.8000, revenue: 2e9, subs: '58M', tier: 4, status: 'prospect' },
  { id: 'viettel', name: 'Viettel', country: 'VN', region: 'APAC', lat: 21.0278, lng: 105.8342, revenue: 6e9, subs: '80M', tier: 4, status: 'prospect' },
  { id: 'vnpt', name: 'VNPT', country: 'VN', region: 'APAC', lat: 21.0188, lng: 105.8044, revenue: 3e9, subs: '35M', tier: 4, status: 'prospect' },
  { id: 'lg-uplus', name: 'LG U+', country: 'KR', region: 'APAC', lat: 37.5294, lng: 126.9655, revenue: 10e9, subs: '18M', tier: 4, status: 'prospect' },
  { id: 'hutchison', name: 'CK Hutchison (3)', country: 'HK', region: 'APAC', lat: 22.2783, lng: 114.1747, revenue: 8e9, subs: '55M', tier: 4, status: 'prospect' },
  { id: 'pccw', name: 'PCCW / HKT', country: 'HK', region: 'APAC', lat: 22.2855, lng: 114.1577, revenue: 4e9, subs: '5M', tier: 4, status: 'prospect' },
  { id: 'taipower', name: 'Chunghwa Telecom', country: 'TW', region: 'APAC', lat: 25.0330, lng: 121.5654, revenue: 7e9, subs: '11M', tier: 4, status: 'prospect' },
  { id: 'far-eastone', name: 'Far EasTone', country: 'TW', region: 'APAC', lat: 25.0478, lng: 121.5170, revenue: 3e9, subs: '7M', tier: 4, status: 'prospect' },
  { id: 'tw-mobile', name: 'Taiwan Mobile', country: 'TW', region: 'APAC', lat: 25.0392, lng: 121.5647, revenue: 4e9, subs: '8M', tier: 4, status: 'prospect' },

  // European Tier 3-4
  { id: 'kpn', name: 'KPN', country: 'NL', region: 'EU', lat: 52.3676, lng: 4.9041, revenue: 8e9, subs: '6M', tier: 3, status: 'prospect' },
  { id: 'elisa', name: 'Elisa', country: 'FI', region: 'EU', lat: 60.1699, lng: 24.9384, revenue: 3e9, subs: '6M', tier: 4, status: 'prospect' },
  { id: 'dna', name: 'DNA (Telenor)', country: 'FI', region: 'EU', lat: 60.1867, lng: 24.9226, revenue: 2e9, subs: '3M', tier: 4, status: 'prospect' },
  { id: 'sunrise', name: 'Sunrise (Liberty)', country: 'CH', region: 'EU', lat: 47.3769, lng: 8.5417, revenue: 3e9, subs: '3M', tier: 4, status: 'prospect' },
  { id: 'play', name: 'Play (P4)', country: 'PL', region: 'EU', lat: 52.2297, lng: 21.0122, revenue: 3e9, subs: '16M', tier: 4, status: 'prospect' },
  { id: 'orange-pl', name: 'Orange Polska', country: 'PL', region: 'EU', lat: 52.2060, lng: 21.0410, revenue: 4e9, subs: '16M', tier: 4, status: 'prospect' },
  { id: 'tmobile-nl', name: 'T-Mobile NL', country: 'NL', region: 'EU', lat: 52.0705, lng: 4.3007, revenue: 3e9, subs: '7M', tier: 4, status: 'prospect' },
  { id: 'o2-cz', name: 'O2 Czech Republic', country: 'CZ', region: 'EU', lat: 50.0755, lng: 14.4378, revenue: 2e9, subs: '6M', tier: 4, status: 'prospect' },
  { id: 'telenor-dk', name: 'Telenor Denmark', country: 'DK', region: 'EU', lat: 55.6761, lng: 12.5683, revenue: 2e9, subs: '3M', tier: 4, status: 'prospect' },
  { id: 'tdc', name: 'TDC NET / Nuuday', country: 'DK', region: 'EU', lat: 55.6867, lng: 12.5720, revenue: 4e9, subs: '5M', tier: 4, status: 'prospect' },
  { id: 'nos', name: 'NOS', country: 'PT', region: 'EU', lat: 38.7223, lng: -9.1393, revenue: 2e9, subs: '5M', tier: 4, status: 'prospect' },
  { id: 'meo', name: 'MEO (Altice PT)', country: 'PT', region: 'EU', lat: 38.7369, lng: -9.1427, revenue: 3e9, subs: '5M', tier: 4, status: 'prospect' },
  { id: 'cosmote', name: 'Cosmote (OTE)', country: 'GR', region: 'EU', lat: 37.9838, lng: 23.7275, revenue: 3e9, subs: '8M', tier: 4, status: 'prospect' },
  { id: 'mts', name: 'MTS (Russia)', country: 'RU', region: 'EU', lat: 55.7558, lng: 37.6173, revenue: 8e9, subs: '80M', tier: 3, status: 'prospect' },
  { id: 'megafon', name: 'MegaFon', country: 'RU', region: 'EU', lat: 59.9343, lng: 30.3351, revenue: 6e9, subs: '72M', tier: 3, status: 'prospect' },
  { id: 'beeline', name: 'Beeline (VEON)', country: 'RU', region: 'EU', lat: 55.7539, lng: 37.6208, revenue: 5e9, subs: '52M', tier: 3, status: 'prospect' },

  // Americas Tier 4
  { id: 'tigo-col', name: 'Tigo Colombia', country: 'CO', region: 'LATAM', lat: 6.2442, lng: -75.5812, revenue: 2e9, subs: '20M', tier: 4, status: 'prospect' },
  { id: 'wom', name: 'WOM', country: 'CL', region: 'LATAM', lat: -33.4372, lng: -70.6506, revenue: 1e9, subs: '8M', tier: 4, status: 'prospect' },
  { id: 'personal', name: 'Personal (Telecom Arg)', country: 'AR', region: 'LATAM', lat: -34.5957, lng: -58.3730, revenue: 3e9, subs: '22M', tier: 4, status: 'prospect' },
  { id: 'claro-mx', name: 'Claro Mexico', country: 'MX', region: 'LATAM', lat: 19.4284, lng: -99.1276, revenue: 8e9, subs: '82M', tier: 3, status: 'prospect' },
  { id: 'vivo', name: 'Vivo (Telefónica BR)', country: 'BR', region: 'LATAM', lat: -23.5613, lng: -46.6560, revenue: 10e9, subs: '110M', tier: 3, status: 'prospect' },
  { id: 'tim-br', name: 'TIM Brasil', country: 'BR', region: 'LATAM', lat: -22.9099, lng: -43.2095, revenue: 5e9, subs: '62M', tier: 4, status: 'prospect' },
];

export const REGION_STATS = {
  NA:    { operators: 12, totalRevenue: '$540B', subscribers: '640M', penetration: '87%' },
  EU:    { operators: 32, totalRevenue: '$450B', subscribers: '1.1B', penetration: '82%' },
  APAC:  { operators: 35, totalRevenue: '$520B', subscribers: '4.8B', penetration: '68%' },
  LATAM: { operators: 12, totalRevenue: '$120B', subscribers: '700M', penetration: '72%' },
  MEA:   { operators: 15, totalRevenue: '$100B', subscribers: '1.2B', penetration: '55%' },
};

export const TOTAL_GLOBAL_OPERATORS = GLOBAL_OPERATORS.length;
export const ACTIVE_OPERATORS = GLOBAL_OPERATORS.filter(o => o.status === 'active');
export const TOTAL_GLOBAL_SUBS = '8.4B';
export const TOTAL_GLOBAL_REVENUE = '$1.73T';

const ACTIVE_JOIN_YEARS = {
  'dt': 2019,
  'telefonica': 2020,
  'lumen': 2021,
  'brightspeed': 2023,
  'bouygues': 2024,
  'cassava': 2025,
};

export function getOperatorJoinYear(op) {
  if (ACTIVE_JOIN_YEARS[op.id]) return ACTIVE_JOIN_YEARS[op.id];
  if (op.tier === 1) return 2027;
  if (op.tier === 2) return op.revenue >= 25e9 ? 2027 : 2028;
  if (op.tier === 3) return 2029;
  return 2030;
}
