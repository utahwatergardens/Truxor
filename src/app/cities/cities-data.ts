export interface CityData {
  name: string;
  state: string;
  population: number;
  region: string;
  description: string;
  services: string[];
  imageSlug: string;
  slug: string;
}

export const CITIES_DATA: CityData[] = [
  // Utah Cities (Top 15)
  {
    name: "Salt Lake City",
    state: "Utah",
    population: 200133,
    region: "Wasatch Front",
    description: "Utah's capital and largest city, featuring urban lakes, parks, and extensive water management systems.",
    services: ["Urban pond maintenance", "Park lake restoration", "Municipal water features", "Emergency flood response"],
    imageSlug: "salt-lake-city",
    slug: "salt-lake-city-ut"
  },
  {
    name: "West Valley City",
    state: "Utah",
    population: 140230,
    region: "Wasatch Front",
    description: "Second largest city in Utah with numerous residential ponds and commercial water features.",
    services: ["Residential pond cleanup", "Commercial water features", "Irrigation system maintenance", "Sediment removal"],
    imageSlug: "west-valley-city",
    slug: "west-valley-city-ut"
  },
  {
    name: "Provo",
    state: "Utah",
    population: 115162,
    region: "Utah Valley",
    description: "Home to Brigham Young University with campus lakes and extensive irrigation systems.",
    services: ["Campus lake maintenance", "Irrigation system cleanup", "Educational facility ponds", "Agricultural water management"],
    imageSlug: "provo",
    slug: "provo-ut"
  },
  {
    name: "West Jordan",
    state: "Utah",
    population: 116961,
    region: "Wasatch Front",
    description: "Growing suburban community with residential ponds and golf course water features.",
    services: ["Residential pond maintenance", "Golf course water features", "Suburban lake cleanup", "Landscape pond restoration"],
    imageSlug: "west-jordan",
    slug: "west-jordan-ut"
  },
  {
    name: "Orem",
    state: "Utah",
    population: 98829,
    region: "Utah Valley",
    description: "Family-oriented community with numerous parks and recreational water features.",
    services: ["Park pond maintenance", "Recreational lake cleanup", "Family community ponds", "Public water feature restoration"],
    imageSlug: "orem",
    slug: "orem-ut"
  },
  {
    name: "Sandy",
    state: "Utah",
    population: 96380,
    region: "Wasatch Front",
    description: "Suburban city with extensive park systems and residential water features.",
    services: ["Park system maintenance", "Residential pond cleanup", "Community lake restoration", "Landscape water features"],
    imageSlug: "sandy",
    slug: "sandy-ut"
  },
  {
    name: "Ogden",
    state: "Utah",
    population: 87321,
    region: "Wasatch Front",
    description: "Northern Utah's largest city with industrial water management and recreational lakes.",
    services: ["Industrial water management", "Recreational lake cleanup", "Municipal pond maintenance", "Emergency response"],
    imageSlug: "ogden",
    slug: "ogden-ut"
  },
  {
    name: "St. George",
    state: "Utah",
    population: 95174,
    region: "Southwest Utah",
    description: "Desert city with golf courses, resorts, and specialized water management needs.",
    services: ["Golf course maintenance", "Resort water features", "Desert landscape ponds", "Evaporative cooling systems"],
    imageSlug: "st-george",
    slug: "st-george-ut"
  },
  {
    name: "Layton",
    state: "Utah",
    population: 81248,
    region: "Wasatch Front",
    description: "Military community with base ponds and residential water features.",
    services: ["Military base ponds", "Residential lake maintenance", "Community water features", "Irrigation system cleanup"],
    imageSlug: "layton",
    slug: "layton-ut"
  },
  {
    name: "South Jordan",
    state: "Utah",
    population: 77374,
    region: "Wasatch Front",
    description: "Affluent suburban community with luxury homes and extensive water features.",
    services: ["Luxury home ponds", "Community lake maintenance", "Golf course water features", "Landscape pond restoration"],
    imageSlug: "south-jordan",
    slug: "south-jordan-ut"
  },
  {
    name: "Lehi",
    state: "Utah",
    population: 75907,
    region: "Utah Valley",
    description: "Tech corridor city with corporate campuses and modern water management systems.",
    services: ["Corporate campus ponds", "Tech company water features", "Modern irrigation systems", "Commercial lake maintenance"],
    imageSlug: "lehi",
    slug: "lehi-ut"
  },
  {
    name: "Millcreek",
    state: "Utah",
    population: 60663,
    region: "Wasatch Front",
    description: "Residential community with mountain streams and natural water features.",
    services: ["Mountain stream maintenance", "Natural water feature restoration", "Residential pond cleanup", "Environmental conservation"],
    imageSlug: "millcreek",
    slug: "millcreek-ut"
  },
  {
    name: "Taylorsville",
    state: "Utah",
    population: 60548,
    region: "Wasatch Front",
    description: "Urban community with park systems and recreational water features.",
    services: ["Park system maintenance", "Recreational pond cleanup", "Urban water features", "Community lake restoration"],
    imageSlug: "taylorsville",
    slug: "taylorsville-ut"
  },
  {
    name: "Logan",
    state: "Utah",
    population: 52801,
    region: "Cache Valley",
    description: "University town with campus lakes and agricultural irrigation systems.",
    services: ["Campus lake maintenance", "Agricultural irrigation", "University pond cleanup", "Research facility water features"],
    imageSlug: "logan",
    slug: "logan-ut"
  },
  {
    name: "Murray",
    state: "Utah",
    population: 50737,
    region: "Wasatch Front",
    description: "Central Salt Lake Valley city with municipal parks and water features.",
    services: ["Municipal park maintenance", "City water features", "Public pond cleanup", "Community lake restoration"],
    imageSlug: "murray",
    slug: "murray-ut"
  },

  // Idaho Cities (Top 15)
  {
    name: "Boise",
    state: "Idaho",
    population: 235684,
    region: "Treasure Valley",
    description: "Idaho's capital with the Boise River, extensive parks, and urban water management.",
    services: ["River maintenance", "Urban park ponds", "Municipal water features", "Emergency flood response"],
    imageSlug: "boise",
    slug: "boise-id"
  },
  {
    name: "Meridian",
    state: "Idaho",
    population: 117635,
    region: "Treasure Valley",
    description: "Fast-growing suburban community with residential ponds and golf courses.",
    services: ["Residential pond maintenance", "Golf course water features", "Suburban lake cleanup", "Community water features"],
    imageSlug: "meridian",
    slug: "meridian-id"
  },
  {
    name: "Nampa",
    state: "Idaho",
    population: 100200,
    region: "Treasure Valley",
    description: "Agricultural community with irrigation systems and farm ponds.",
    services: ["Agricultural irrigation", "Farm pond maintenance", "Crop water management", "Livestock watering systems"],
    imageSlug: "nampa",
    slug: "nampa-id"
  },
  {
    name: "Idaho Falls",
    state: "Idaho",
    population: 64718,
    region: "Eastern Idaho",
    description: "Eastern Idaho's largest city with Snake River access and industrial water management.",
    services: ["Snake River maintenance", "Industrial water management", "Municipal pond cleanup", "Emergency response"],
    imageSlug: "idaho-falls",
    slug: "idaho-falls-id"
  },
  {
    name: "Pocatello",
    state: "Idaho",
    population: 56520,
    region: "Eastern Idaho",
    description: "University town with campus lakes and research facility water features.",
    services: ["Campus lake maintenance", "Research facility ponds", "University water features", "Educational pond cleanup"],
    imageSlug: "pocatello",
    slug: "pocatello-id"
  },
  {
    name: "Caldwell",
    state: "Idaho",
    population: 56712,
    region: "Treasure Valley",
    description: "Agricultural center with extensive irrigation systems and farm water management.",
    services: ["Agricultural irrigation", "Farm pond maintenance", "Crop water systems", "Livestock watering areas"],
    imageSlug: "caldwell",
    slug: "caldwell-id"
  },
  {
    name: "Coeur d'Alene",
    state: "Idaho",
    population: 52414,
    region: "North Idaho",
    description: "Resort city on Lake Coeur d'Alene with luxury properties and recreational water features.",
    services: ["Lake shore maintenance", "Resort water features", "Luxury property ponds", "Recreational lake cleanup"],
    imageSlug: "coeur-dalene",
    slug: "coeur-dalene-id"
  },
  {
    name: "Twin Falls",
    state: "Idaho",
    population: 51380,
    region: "Magic Valley",
    description: "Snake River Canyon city with agricultural irrigation and recreational water features.",
    services: ["Canyon water management", "Agricultural irrigation", "Recreational ponds", "River access maintenance"],
    imageSlug: "twin-falls",
    slug: "twin-falls-id"
  },
  {
    name: "Lewiston",
    state: "Idaho",
    population: 34147,
    region: "North Central Idaho",
    description: "Port city on the Snake River with industrial water management and recreational access.",
    services: ["Port water management", "Industrial pond cleanup", "River access maintenance", "Recreational water features"],
    imageSlug: "lewiston",
    slug: "lewiston-id"
  },
  {
    name: "Post Falls",
    state: "Idaho",
    population: 38085,
    region: "North Idaho",
    description: "Suburban community with residential ponds and community water features.",
    services: ["Residential pond maintenance", "Community lake cleanup", "Suburban water features", "Landscape pond restoration"],
    imageSlug: "post-falls",
    slug: "post-falls-id"
  },
  {
    name: "Rexburg",
    state: "Idaho",
    population: 28520,
    region: "Eastern Idaho",
    description: "University town with campus lakes and agricultural research facilities.",
    services: ["Campus lake maintenance", "Agricultural research ponds", "University water features", "Educational facility cleanup"],
    imageSlug: "rexburg",
    slug: "rexburg-id"
  },
  {
    name: "Moscow",
    state: "Idaho",
    population: 25608,
    region: "North Central Idaho",
    description: "University town with research ponds and agricultural water management.",
    services: ["Research pond maintenance", "Agricultural water systems", "University lake cleanup", "Educational water features"],
    imageSlug: "moscow",
    slug: "moscow-id"
  },
  {
    name: "Eagle",
    state: "Idaho",
    population: 30555,
    region: "Treasure Valley",
    description: "Affluent suburban community with luxury homes and extensive water features.",
    services: ["Luxury home ponds", "Community lake maintenance", "Golf course water features", "Landscape pond restoration"],
    imageSlug: "eagle",
    slug: "eagle-id"
  },
  {
    name: "Kuna",
    state: "Idaho",
    population: 24356,
    region: "Treasure Valley",
    description: "Growing suburban community with residential ponds and agricultural areas.",
    services: ["Residential pond maintenance", "Agricultural irrigation", "Suburban lake cleanup", "Community water features"],
    imageSlug: "kuna",
    slug: "kuna-id"
  },
  {
    name: "Mountain Home",
    state: "Idaho",
    population: 14306,
    region: "Southwestern Idaho",
    description: "Military community with base ponds and agricultural water management.",
    services: ["Military base ponds", "Agricultural irrigation", "Base lake maintenance", "Community water features"],
    imageSlug: "mountain-home",
    slug: "mountain-home-id"
  },

  // Wyoming Cities (Top 10)
  {
    name: "Cheyenne",
    state: "Wyoming",
    population: 65132,
    region: "Southeast Wyoming",
    description: "Wyoming's capital with municipal parks and urban water management systems.",
    services: ["Municipal park maintenance", "Urban pond cleanup", "City water features", "Emergency response"],
    imageSlug: "cheyenne",
    slug: "cheyenne-wy"
  },
  {
    name: "Casper",
    state: "Wyoming",
    population: 59274,
    region: "Central Wyoming",
    description: "Oil and gas center with industrial water management and recreational lakes.",
    services: ["Industrial water management", "Recreational lake cleanup", "Oil field ponds", "Municipal water features"],
    imageSlug: "casper",
    slug: "casper-wy"
  },
  {
    name: "Laramie",
    state: "Wyoming",
    population: 32511,
    region: "Southeast Wyoming",
    description: "University town with campus lakes and research facility water features.",
    services: ["Campus lake maintenance", "Research facility ponds", "University water features", "Educational pond cleanup"],
    imageSlug: "laramie",
    slug: "laramie-wy"
  },
  {
    name: "Gillette",
    state: "Wyoming",
    population: 33133,
    region: "Northeast Wyoming",
    description: "Energy industry center with industrial ponds and community water features.",
    services: ["Industrial pond maintenance", "Energy facility water management", "Community lake cleanup", "Municipal water features"],
    imageSlug: "gillette",
    slug: "gillette-wy"
  },
  {
    name: "Rock Springs",
    state: "Wyoming",
    population: 23294,
    region: "Southwest Wyoming",
    description: "Mining and energy community with industrial water management and recreational ponds.",
    services: ["Industrial water management", "Mining facility ponds", "Recreational lake cleanup", "Community water features"],
    imageSlug: "rock-springs",
    slug: "rock-springs-wy"
  },
  {
    name: "Sheridan",
    state: "Wyoming",
    population: 18437,
    region: "North Central Wyoming",
    description: "Historic ranching community with agricultural ponds and recreational water features.",
    services: ["Agricultural pond maintenance", "Ranch water management", "Recreational lake cleanup", "Community water features"],
    imageSlug: "sheridan",
    slug: "sheridan-wy"
  },
  {
    name: "Green River",
    state: "Wyoming",
    population: 11561,
    region: "Southwest Wyoming",
    description: "River town with water access and recreational lake management.",
    services: ["River access maintenance", "Recreational lake cleanup", "Municipal water features", "Community pond maintenance"],
    imageSlug: "green-river",
    slug: "green-river-wy"
  },
  {
    name: "Evanston",
    state: "Wyoming",
    population: 11507,
    region: "Southwest Wyoming",
    description: "Border town with municipal ponds and community water features.",
    services: ["Municipal pond maintenance", "Community lake cleanup", "Border facility water management", "Public water features"],
    imageSlug: "evanston",
    slug: "evanston-wy"
  },
  {
    name: "Riverton",
    state: "Wyoming",
    population: 10903,
    region: "Central Wyoming",
    description: "Agricultural community with farm ponds and irrigation systems.",
    services: ["Agricultural pond maintenance", "Farm irrigation systems", "Community lake cleanup", "Livestock watering areas"],
    imageSlug: "riverton",
    slug: "riverton-wy"
  },
  {
    name: "Cody",
    state: "Wyoming",
    population: 10249,
    region: "Northwest Wyoming",
    description: "Gateway to Yellowstone with tourism-related water features and recreational lakes.",
    services: ["Tourism water features", "Recreational lake maintenance", "Resort pond cleanup", "Community water management"],
    imageSlug: "cody",
    slug: "cody-wy"
  },

  // Arizona Cities (Top 10)
  {
    name: "Phoenix",
    state: "Arizona",
    population: 1608139,
    region: "Valley of the Sun",
    description: "Arizona's capital with extensive golf courses, resorts, and desert water management.",
    services: ["Golf course maintenance", "Resort water features", "Desert landscape ponds", "Municipal water management"],
    imageSlug: "phoenix",
    slug: "phoenix-az"
  },
  {
    name: "Tucson",
    state: "Arizona",
    population: 542629,
    region: "Southern Arizona",
    description: "Desert city with university campus lakes and specialized water management systems.",
    services: ["Campus lake maintenance", "Desert water features", "University pond cleanup", "Arid landscape management"],
    imageSlug: "tucson",
    slug: "tucson-az"
  },
  {
    name: "Mesa",
    state: "Arizona",
    population: 504258,
    region: "Valley of the Sun",
    description: "Suburban community with residential ponds and golf course water features.",
    services: ["Residential pond maintenance", "Golf course water features", "Suburban lake cleanup", "Community water management"],
    imageSlug: "mesa",
    slug: "mesa-az"
  },
  {
    name: "Chandler",
    state: "Arizona",
    population: 275987,
    region: "Valley of the Sun",
    description: "Tech corridor city with corporate campuses and modern water management systems.",
    services: ["Corporate campus ponds", "Tech company water features", "Modern irrigation systems", "Commercial lake maintenance"],
    imageSlug: "chandler",
    slug: "chandler-az"
  },
  {
    name: "Scottsdale",
    state: "Arizona",
    population: 241361,
    region: "Valley of the Sun",
    description: "Luxury resort city with high-end golf courses and exclusive water features.",
    services: ["Luxury resort ponds", "High-end golf course maintenance", "Exclusive water features", "Desert landscape management"],
    imageSlug: "scottsdale",
    slug: "scottsdale-az"
  },
  {
    name: "Glendale",
    state: "Arizona",
    population: 248325,
    region: "Valley of the Sun",
    description: "Sports and entertainment hub with stadium water features and community ponds.",
    services: ["Stadium water features", "Community pond maintenance", "Entertainment venue ponds", "Municipal water management"],
    imageSlug: "glendale",
    slug: "glendale-az"
  },
  {
    name: "Gilbert",
    state: "Arizona",
    population: 267918,
    region: "Valley of the Sun",
    description: "Family-oriented community with extensive park systems and residential water features.",
    services: ["Park system maintenance", "Residential pond cleanup", "Family community lakes", "Public water feature restoration"],
    imageSlug: "gilbert",
    slug: "gilbert-az"
  },
  {
    name: "Tempe",
    state: "Arizona",
    population: 180587,
    region: "Valley of the Sun",
    description: "University town with campus lakes and urban water management systems.",
    services: ["Campus lake maintenance", "Urban water management", "University pond cleanup", "Municipal water features"],
    imageSlug: "tempe",
    slug: "tempe-az"
  },
  {
    name: "Peoria",
    state: "Arizona",
    population: 190985,
    region: "Valley of the Sun",
    description: "Suburban community with residential ponds and recreational water features.",
    services: ["Residential pond maintenance", "Recreational lake cleanup", "Suburban water features", "Community lake restoration"],
    imageSlug: "peoria",
    slug: "peoria-az"
  },
  {
    name: "Surprise",
    state: "Arizona",
    population: 141664,
    region: "Valley of the Sun",
    description: "Fast-growing suburban community with new residential developments and water features.",
    services: ["New development ponds", "Residential lake maintenance", "Suburban water features", "Community pond restoration"],
    imageSlug: "surprise",
    slug: "surprise-az"
  }
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return CITIES_DATA.find(city => city.slug === slug);
};

export const getCitiesByState = (state: string): CityData[] => {
  return CITIES_DATA.filter(city => city.state === state);
};

export const getCitiesByRegion = (region: string): CityData[] => {
  return CITIES_DATA.filter(city => city.region === region);
};
