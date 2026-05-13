export const CENTRAL_OFFICES = [
  // DENVER METRO
  { id: 'co-den-downtown', metroId: 'denver', name: 'Denver Downtown CO', address: '1801 California St, Denver, CO', lat: 39.7478, lng: -104.9878, oltCount: 24, ponPorts: 288, subscribersServed: 18400, technology: 'XGS-PON + GPON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-den-lodo', metroId: 'denver', name: 'LoDo CO', address: '1600 Wynkoop St, Denver, CO', lat: 39.7530, lng: -105.0000, oltCount: 16, ponPorts: 192, subscribersServed: 12200, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-den-rino', metroId: 'denver', name: 'RiNo Arts District CO', address: '3500 Brighton Blvd, Denver, CO', lat: 39.7690, lng: -104.9780, oltCount: 12, ponPorts: 144, subscribersServed: 9100, technology: 'GPON', status: 'degraded', vendor: 'Adtran TA5000' },
  { id: 'co-den-caphill', metroId: 'denver', name: 'Capitol Hill CO', address: '1200 E Colfax Ave, Denver, CO', lat: 39.7400, lng: -104.9740, oltCount: 18, ponPorts: 216, subscribersServed: 14800, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-den-highland', metroId: 'denver', name: 'Highland CO', address: '3300 Tejon St, Denver, CO', lat: 39.7620, lng: -105.0100, oltCount: 10, ponPorts: 120, subscribersServed: 7600, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-den-washpark', metroId: 'denver', name: 'Wash Park CO', address: '700 S University Blvd, Denver, CO', lat: 39.7050, lng: -104.9620, oltCount: 14, ponPorts: 168, subscribersServed: 11200, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-den-cherrycreek', metroId: 'denver', name: 'Cherry Creek CO', address: '200 Clayton St, Denver, CO', lat: 39.7170, lng: -104.9550, oltCount: 20, ponPorts: 240, subscribersServed: 16100, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-den-aurora', metroId: 'denver', name: 'Aurora CO', address: '14200 E Alameda Ave, Aurora, CO', lat: 39.7290, lng: -104.8310, oltCount: 22, ponPorts: 264, subscribersServed: 17500, technology: 'GPON', status: 'degraded', vendor: 'Calix E9-2' },
  { id: 'co-den-centennial', metroId: 'denver', name: 'Centennial CO', address: '7800 E Arapahoe Rd, Centennial, CO', lat: 39.5960, lng: -104.8690, oltCount: 16, ponPorts: 192, subscribersServed: 13000, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-den-lakewood', metroId: 'denver', name: 'Lakewood CO', address: '800 Yarrow St, Lakewood, CO', lat: 39.7270, lng: -105.0870, oltCount: 14, ponPorts: 168, subscribersServed: 10800, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-den-littleton', metroId: 'denver', name: 'Littleton CO', address: '2600 W Main St, Littleton, CO', lat: 39.6133, lng: -105.0166, oltCount: 10, ponPorts: 120, subscribersServed: 8200, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-den-wheatridge', metroId: 'denver', name: 'Wheat Ridge CO', address: '4300 Wadsworth Blvd, Wheat Ridge, CO', lat: 39.7660, lng: -105.0770, oltCount: 8, ponPorts: 96, subscribersServed: 6200, technology: 'GPON', status: 'alarm', vendor: 'Adtran TA5000' },

  // SALT LAKE CITY METRO
  { id: 'co-slc-downtown', metroId: 'salt-lake-city', name: 'SLC Downtown CO', address: '350 S Main St, Salt Lake City, UT', lat: 40.7608, lng: -111.8910, oltCount: 22, ponPorts: 264, subscribersServed: 17800, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-slc-sugarhouse', metroId: 'salt-lake-city', name: 'Sugar House CO', address: '2100 S 1100 E, Salt Lake City, UT', lat: 40.7250, lng: -111.8580, oltCount: 14, ponPorts: 168, subscribersServed: 10900, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-slc-avenues', metroId: 'salt-lake-city', name: 'The Avenues CO', address: '500 N 700 E, Salt Lake City, UT', lat: 40.7770, lng: -111.8740, oltCount: 10, ponPorts: 120, subscribersServed: 7400, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-slc-sandy', metroId: 'salt-lake-city', name: 'Sandy CO', address: '10000 S State St, Sandy, UT', lat: 40.5710, lng: -111.8390, oltCount: 18, ponPorts: 216, subscribersServed: 13900, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-slc-westvalley', metroId: 'salt-lake-city', name: 'West Valley CO', address: '3600 S 2700 W, West Valley City, UT', lat: 40.6920, lng: -111.9830, oltCount: 16, ponPorts: 192, subscribersServed: 12100, technology: 'GPON', status: 'degraded', vendor: 'Adtran TA5000' },
  { id: 'co-slc-provo', metroId: 'salt-lake-city', name: 'Provo CO', address: '450 W Center St, Provo, UT', lat: 40.2338, lng: -111.6585, oltCount: 14, ponPorts: 168, subscribersServed: 11300, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-slc-lehi', metroId: 'salt-lake-city', name: 'Lehi CO', address: '3700 N Thanksgiving Way, Lehi, UT', lat: 40.3916, lng: -111.8508, oltCount: 12, ponPorts: 144, subscribersServed: 9800, technology: 'XGS-PON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-slc-orem', metroId: 'salt-lake-city', name: 'Orem CO', address: '1100 W Center St, Orem, UT', lat: 40.2969, lng: -111.6946, oltCount: 10, ponPorts: 120, subscribersServed: 7700, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },

  // MINNEAPOLIS-ST. PAUL METRO
  { id: 'co-msp-northloop', metroId: 'minneapolis', name: 'North Loop CO', address: '700 N Washington Ave, Minneapolis, MN', lat: 44.9870, lng: -93.2730, oltCount: 18, ponPorts: 216, subscribersServed: 14200, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-msp-uptown', metroId: 'minneapolis', name: 'Uptown CO', address: '3000 Hennepin Ave, Minneapolis, MN', lat: 44.9485, lng: -93.2980, oltCount: 14, ponPorts: 168, subscribersServed: 10800, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-msp-northeast', metroId: 'minneapolis', name: 'Northeast CO', address: '1500 Central Ave NE, Minneapolis, MN', lat: 45.0030, lng: -93.2470, oltCount: 12, ponPorts: 144, subscribersServed: 8900, technology: 'GPON', status: 'degraded', vendor: 'Calix E9-2' },
  { id: 'co-msp-lynlake', metroId: 'minneapolis', name: 'Lyn-Lake CO', address: '2900 Lyndale Ave S, Minneapolis, MN', lat: 44.9498, lng: -93.2880, oltCount: 10, ponPorts: 120, subscribersServed: 7300, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-msp-edina', metroId: 'minneapolis', name: 'Edina CO', address: '6800 France Ave S, Edina, MN', lat: 44.8810, lng: -93.3290, oltCount: 16, ponPorts: 192, subscribersServed: 12500, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-msp-bloomington', metroId: 'minneapolis', name: 'Bloomington CO', address: '8100 Penn Ave S, Bloomington, MN', lat: 44.8408, lng: -93.3061, oltCount: 18, ponPorts: 216, subscribersServed: 13400, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-msp-plymouth', metroId: 'minneapolis', name: 'Plymouth CO', address: '3400 Plymouth Blvd, Plymouth, MN', lat: 45.0105, lng: -93.4555, oltCount: 14, ponPorts: 168, subscribersServed: 10100, technology: 'XGS-PON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-msp-edenprairie', metroId: 'minneapolis', name: 'Eden Prairie CO', address: '8080 Mitchell Rd, Eden Prairie, MN', lat: 44.8547, lng: -93.4708, oltCount: 12, ponPorts: 144, subscribersServed: 9200, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-msp-woodbury', metroId: 'minneapolis', name: 'Woodbury CO', address: '8301 Valley Creek Rd, Woodbury, MN', lat: 44.9230, lng: -92.9230, oltCount: 10, ponPorts: 120, subscribersServed: 7800, technology: 'GPON', status: 'degraded', vendor: 'Calix E9-2' },
  { id: 'co-msp-stpaul', metroId: 'minneapolis', name: 'St. Paul Downtown CO', address: '345 Cedar St, St. Paul, MN', lat: 44.9450, lng: -93.0930, oltCount: 20, ponPorts: 240, subscribersServed: 15200, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },

  // SEATTLE-BELLEVUE METRO
  { id: 'co-sea-slu', metroId: 'seattle', name: 'South Lake Union CO', address: '400 Fairview Ave N, Seattle, WA', lat: 47.6240, lng: -122.3370, oltCount: 22, ponPorts: 264, subscribersServed: 17100, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-sea-caphill', metroId: 'seattle', name: 'Capitol Hill CO', address: '500 E Pike St, Seattle, WA', lat: 47.6140, lng: -122.3230, oltCount: 16, ponPorts: 192, subscribersServed: 11900, technology: 'GPON + XGS-PON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-sea-ballard', metroId: 'seattle', name: 'Ballard CO', address: '5400 22nd Ave NW, Seattle, WA', lat: 47.6680, lng: -122.3845, oltCount: 12, ponPorts: 144, subscribersServed: 8900, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-sea-fremont', metroId: 'seattle', name: 'Fremont CO', address: '3500 Fremont Ave N, Seattle, WA', lat: 47.6510, lng: -122.3500, oltCount: 10, ponPorts: 120, subscribersServed: 7400, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-sea-bellevue', metroId: 'seattle', name: 'Bellevue CO', address: '11000 NE 8th St, Bellevue, WA', lat: 47.6160, lng: -122.1990, oltCount: 20, ponPorts: 240, subscribersServed: 14800, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-sea-redmond', metroId: 'seattle', name: 'Redmond CO', address: '15700 NE 40th St, Redmond, WA', lat: 47.6740, lng: -122.1215, oltCount: 18, ponPorts: 216, subscribersServed: 13100, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-sea-kirkland', metroId: 'seattle', name: 'Kirkland CO', address: '600 Kirkland Ave, Kirkland, WA', lat: 47.6815, lng: -122.2087, oltCount: 12, ponPorts: 144, subscribersServed: 9100, technology: 'GPON + XGS-PON', status: 'degraded', vendor: 'Calix E9-2' },
  { id: 'co-sea-tacoma', metroId: 'seattle', name: 'Tacoma CO', address: '1102 Broadway, Tacoma, WA', lat: 47.2529, lng: -122.4443, oltCount: 14, ponPorts: 168, subscribersServed: 10700, technology: 'GPON', status: 'healthy', vendor: 'Adtran TA5000' },
  { id: 'co-sea-spokane', metroId: 'seattle', name: 'Spokane CO', address: '930 W Riverside Ave, Spokane, WA', lat: 47.6588, lng: -117.4260, oltCount: 10, ponPorts: 120, subscribersServed: 7800, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },

  // OMAHA METRO
  { id: 'co-omaha-oldmarket', metroId: 'omaha', name: 'Old Market CO', address: '1100 Howard St, Omaha, NE', lat: 41.2570, lng: -95.9320, oltCount: 18, ponPorts: 216, subscribersServed: 14300, technology: 'XGS-PON', status: 'healthy', vendor: 'Nokia 7360 ISAM FX' },
  { id: 'co-omaha-blackstone', metroId: 'omaha', name: 'Blackstone CO', address: '4006 Farnam St, Omaha, NE', lat: 41.2585, lng: -95.9700, oltCount: 14, ponPorts: 168, subscribersServed: 10900, technology: 'GPON + XGS-PON', status: 'alarm', vendor: 'Adtran TA5000' },
  { id: 'co-omaha-dundee', metroId: 'omaha', name: 'Dundee CO', address: '4925 Underwood Ave, Omaha, NE', lat: 41.2680, lng: -95.9920, oltCount: 10, ponPorts: 120, subscribersServed: 7700, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' },
  { id: 'co-omaha-aksarben', metroId: 'omaha', name: 'Aksarben CO', address: '6700 Mercy Rd, Omaha, NE', lat: 41.2330, lng: -95.9700, oltCount: 8, ponPorts: 96, subscribersServed: 6100, technology: 'GPON', status: 'degraded', vendor: 'Adtran TA5000' },
  { id: 'co-omaha-lavista', metroId: 'omaha', name: 'La Vista CO', address: '8302 S 84th St, La Vista, NE', lat: 41.1840, lng: -96.0260, oltCount: 8, ponPorts: 96, subscribersServed: 6300, technology: 'GPON', status: 'healthy', vendor: 'Calix E9-2' }
];

export function getCOsByMetro(metroId) {
  return CENTRAL_OFFICES.filter((co) => co.metroId === metroId);
}

export function getCO(id) {
  return CENTRAL_OFFICES.find((co) => co.id === id);
}
