// Bounding boxes used for procedural placement of splitters + ONTs around each CO.
// Each box is ~0.01° on a side (~1km), large enough to feel like a real
// neighborhood serving area without overlapping adjacent COs.
export const NEIGHBORHOODS = {
  // Denver
  'co-den-downtown':    { name: 'Downtown',       north: 39.7525, south: 39.7430, east: -104.9820, west: -104.9940 },
  'co-den-lodo':        { name: 'LoDo',           north: 39.7580, south: 39.7480, east: -104.9930, west: -105.0050 },
  'co-den-rino':        { name: 'RiNo',           north: 39.7750, south: 39.7620, east: -104.9700, west: -104.9850 },
  'co-den-caphill':     { name: 'Capitol Hill',   north: 39.7450, south: 39.7300, east: -104.9650, west: -104.9820 },
  'co-den-highland':    { name: 'Highland',       north: 39.7680, south: 39.7550, east: -105.0030, west: -105.0180 },
  'co-den-washpark':    { name: 'Wash Park',      north: 39.7100, south: 39.6950, east: -104.9550, west: -104.9750 },
  'co-den-cherrycreek': { name: 'Cherry Creek',   north: 39.7220, south: 39.7100, east: -104.9480, west: -104.9620 },
  'co-den-aurora':      { name: 'Aurora',         north: 39.7340, south: 39.7240, east: -104.8260, west: -104.8360 },
  'co-den-centennial':  { name: 'Centennial',     north: 39.6010, south: 39.5910, east: -104.8640, west: -104.8740 },
  'co-den-lakewood':    { name: 'Lakewood',       north: 39.7320, south: 39.7220, east: -105.0820, west: -105.0920 },
  'co-den-littleton':   { name: 'Littleton',      north: 39.6183, south: 39.6083, east: -105.0116, west: -105.0216 },
  'co-den-wheatridge':  { name: 'Wheat Ridge',    north: 39.7710, south: 39.7610, east: -105.0720, west: -105.0820 },

  // SLC
  'co-slc-downtown':    { name: 'SLC Downtown',   north: 40.7650, south: 40.7570, east: -111.8860, west: -111.8960 },
  'co-slc-sugarhouse':  { name: 'Sugar House',    north: 40.7300, south: 40.7200, east: -111.8530, west: -111.8630 },
  'co-slc-avenues':     { name: 'The Avenues',    north: 40.7820, south: 40.7720, east: -111.8690, west: -111.8790 },
  'co-slc-sandy':       { name: 'Sandy',          north: 40.5760, south: 40.5660, east: -111.8340, west: -111.8440 },
  'co-slc-westvalley':  { name: 'West Valley',    north: 40.6970, south: 40.6870, east: -111.9780, west: -111.9880 },
  'co-slc-provo':       { name: 'Provo',          north: 40.2388, south: 40.2288, east: -111.6535, west: -111.6635 },
  'co-slc-lehi':        { name: 'Lehi',           north: 40.3966, south: 40.3866, east: -111.8458, west: -111.8558 },
  'co-slc-orem':        { name: 'Orem',           north: 40.3019, south: 40.2919, east: -111.6896, west: -111.6996 },

  // Minneapolis
  'co-msp-northloop':    { name: 'North Loop',     north: 44.9920, south: 44.9820, east: -93.2680, west: -93.2780 },
  'co-msp-uptown':       { name: 'Uptown',         north: 44.9535, south: 44.9435, east: -93.2930, west: -93.3030 },
  'co-msp-northeast':    { name: 'Northeast',      north: 45.0080, south: 44.9980, east: -93.2420, west: -93.2520 },
  'co-msp-lynlake':      { name: 'Lyn-Lake',       north: 44.9548, south: 44.9448, east: -93.2830, west: -93.2930 },
  'co-msp-edina':        { name: 'Edina',          north: 44.8860, south: 44.8760, east: -93.3240, west: -93.3340 },
  'co-msp-bloomington':  { name: 'Bloomington',    north: 44.8458, south: 44.8358, east: -93.3011, west: -93.3111 },
  'co-msp-plymouth':     { name: 'Plymouth',       north: 45.0155, south: 45.0055, east: -93.4505, west: -93.4605 },
  'co-msp-edenprairie':  { name: 'Eden Prairie',   north: 44.8597, south: 44.8497, east: -93.4658, west: -93.4758 },
  'co-msp-woodbury':     { name: 'Woodbury',       north: 44.9280, south: 44.9180, east: -92.9180, west: -92.9280 },
  'co-msp-stpaul':       { name: 'St. Paul',       north: 44.9500, south: 44.9400, east: -93.0880, west: -93.0980 },

  // Seattle
  'co-sea-slu':          { name: 'South Lake Union', north: 47.6280, south: 47.6200, east: -122.3320, west: -122.3420 },
  'co-sea-caphill':      { name: 'Capitol Hill',     north: 47.6180, south: 47.6100, east: -122.3180, west: -122.3280 },
  'co-sea-ballard':      { name: 'Ballard',          north: 47.6720, south: 47.6640, east: -122.3795, west: -122.3895 },
  'co-sea-fremont':      { name: 'Fremont',          north: 47.6550, south: 47.6470, east: -122.3450, west: -122.3550 },
  'co-sea-bellevue':     { name: 'Bellevue',         north: 47.6200, south: 47.6120, east: -122.1940, west: -122.2040 },
  'co-sea-redmond':      { name: 'Redmond',          north: 47.6780, south: 47.6700, east: -122.1165, west: -122.1265 },
  'co-sea-kirkland':     { name: 'Kirkland',         north: 47.6855, south: 47.6775, east: -122.2037, west: -122.2137 },
  'co-sea-tacoma':       { name: 'Tacoma',           north: 47.2569, south: 47.2489, east: -122.4393, west: -122.4493 },
  'co-sea-spokane':      { name: 'Spokane',          north: 47.6628, south: 47.6548, east: -117.4210, west: -117.4310 },

  // Omaha
  'co-omaha-oldmarket':  { name: 'Old Market',     north: 41.2610, south: 41.2530, east: -95.9270, west: -95.9370 },
  'co-omaha-blackstone': { name: 'Blackstone',     north: 41.2625, south: 41.2545, east: -95.9650, west: -95.9750 },
  'co-omaha-dundee':     { name: 'Dundee',         north: 41.2720, south: 41.2640, east: -95.9870, west: -95.9970 },
  'co-omaha-aksarben':   { name: 'Aksarben',       north: 41.2370, south: 41.2290, east: -95.9650, west: -95.9750 },
  'co-omaha-lavista':    { name: 'La Vista',       north: 41.1880, south: 41.1800, east: -96.0210, west: -96.0310 }
};
