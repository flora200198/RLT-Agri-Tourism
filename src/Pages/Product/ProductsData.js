// productsData.js
const PLACE = (t) =>
  `https://via.placeholder.com/1200x500?text=${encodeURIComponent(t)}`;

export const PRODUCTS = [
  {
    slug: "ghee",
    name: "Pure Cow Ghee",
    heroImg: '/assets/Ghee.png',
    short: "Traditional slow-cooked ghee made from our farm’s cow milk cream—rich aroma, natural granules, zero preservatives.",
    highlights: [
      "Rich in vitamins A, D, E, K",
      "Slow-churned, low-heat clarified",
      "No preservatives or stabilizers",
    ],
    variants: [
      { label: "195 ml", price: 329 },
      { label: "490 ml", price: 749 },
    ],
    nutrition: [
      ["Energy", "≈ 892 kcal"],
      ["Fat", "≈ 98.5 g"],
      ["Saturated Fat", "≈ 57 g"],
      ["Cholesterol", "≈ 0.19 g"],
      ["Protein", "≈ 1.4 g"],
      ["Carbohydrates", "0 g"],
    ],
    accordions: {
      process:
        "Our ghee is prepared by culturing cream from our farm’s cow milk, slow-churning to butter, and gently heating to remove moisture—leaving pure, aromatic ghee with natural granules.",
      usage: [
        "Store in a clean, dry place, away from direct sunlight.",
        "Ensure no moisture enters the container; avoid wet spoons.",
        "No refrigeration required.",
      ],
      availability:
        "Available at our farm store and for local delivery in our service area. Contact us for current stock and delivery windows.",
    },
  },
  {
    slug: "milk",
    name: "Cow Milk",
    heroImg: '/assets/Milk.png',
    short: "Pure, fresh milk from grass-fed cows. Delivered quickly from our farm with complete transparency.",
    highlights: [
      "Fresh from our farm",
      "No artificial additives",
      "Chilled chain maintained",
    ],
    variants: [
      { label: "500 ml", price: 35 },
      { label: "1 L", price: 65 },
    ],
    nutrition: [
      ["Energy", "≈ 62 kcal / 100ml"],
      ["Fat", "≈ 3.3 g / 100ml"],
      ["Protein", "≈ 3.2 g / 100ml"],
      ["Carbohydrates", "≈ 4.8 g / 100ml"],
    ],
    accordions: {
      process:
        "Milk is collected hygienically, chilled immediately, and transported in a cold chain to preserve freshness.",
      usage: [
        "Keep refrigerated at ≤ 4°C.",
        "Boil before use if preferred.",
        "Consume by the date on the pack.",
      ],
      availability:
        "Farm pickup and local doorstep delivery. Timings vary by route—please check availability during booking.",
    },
  },
  {
    slug: "honey",
    name: "Raw Honey",
    heroImg: '/assets/Honey.png',
    short: "Unprocessed, raw honey from our on-farm hives—rich floral notes and natural goodness.",
    highlights: ["Unheated & unfiltered", "Floral varietal notes", "Bee-friendly practices"],
    variants: [
      { label: "250 g", price: 199 },
      { label: "500 g", price: 349 },
    ],
    accordions: {
      process:
        "Honey is extracted from combs using gentle centrifugal methods and strained to remove wax while retaining natural enzymes.",
      usage: [
        "Store at room temperature, away from sunlight.",
        "Crystallization is natural; place the jar in warm water to reliquefy.",
        "Not recommended for infants under 12 months.",
      ],
      availability: "Available year-round in limited batches at the farm shop.",
    },
  },
  {
    slug: "beeswax",
    name: "Bee Wax",
    heroImg: '/assets/Bee-wax.png',
    short: "Naturally harvested beeswax for candles, balms, and crafts—clean and aromatic.",
    highlights: ["Natural blocks and pellets", "Gently rendered", "Craft & cosmetic grade"],
    variants: [
      { label: "100 g", price: 149 },
      { label: "250 g", price: 329 },
    ],
    accordions: {
      process:
        "Rendered from clean comb cappings after honey extraction, then filtered to remove impurities.",
      usage: [
        "Ideal for DIY balms, salves, candles, and wood polish.",
        "Melt using a double boiler; avoid direct flame.",
      ],
      availability: "Limited batches—check farm store for current stock.",
    },
  },
  {
    slug: "eggs",
    name: "Farm Fresh Eggs",
    heroImg: '/assets/Eggs.png',
    short: "Collected daily from free-range hens—naturally nutrient-dense and delicious.",
    highlights: ["Daily collection", "Cleaned & graded", "Great for baking & breakfast"],
    variants: [
      { label: "Tray of 12", price: 120 },
      { label: "Tray of 30", price: 280 },
    ],
    accordions: {
      process:
        "Eggs are collected, candled for quality, gently cleaned, and packed in protective trays.",
      usage: [
        "Refrigerate for extended freshness.",
        "Cook thoroughly before consumption.",
      ],
      availability: "Year-round with seasonal variations in size and shell color.",
    },
  },
  {
    slug: "chicken",
    name: "Fresh Chicken",
    heroImg: PLACE("Fresh Chicken"),
    short: "Naturally raised, antibiotic-free chicken—tender and flavorful.",
    highlights: ["Farm-raised", "Fresh cuts & whole", "Hygienic processing"],
    variants: [
      { label: "Whole (~1 kg)", price: 299 },
      { label: "Curry Cuts (500 g)", price: 175 },
    ],
    accordions: {
      process:
        "Processed in hygienic conditions with cold-chain handling to lock in freshness.",
      usage: [
        "Keep chilled; cook thoroughly.",
        "Use within 24–48 hours of purchase or freeze.",
      ],
      availability: "Pre-order for farm pickup; limited daily slots.",
    },
  },
  {
    slug: "duck",
    name: "Farm Duck",
    heroImg: PLACE("Farm Duck"),
    short: "Free-range ducks raised around our ponds—rich taste, great for special dishes.",
    highlights: ["Free-range near ponds", "Whole & cuts", "Deep flavor"],
    variants: [
      { label: "Whole (~1.2 kg)", price: 399 },
      { label: "Curry Cuts (500 g)", price: 220 },
    ],
    accordions: {
      process:
        "Handled in a chilled environment and packed to retain moisture and taste.",
      usage: [
        "Best slow-cooked; ensure internal doneness.",
        "Refrigerate promptly and consume or freeze quickly.",
      ],
      availability: "Weekend batches; pre-book recommended.",
    },
  },
  {
    slug: "fish",
    name: "Fresh Fish",
    heroImg: PLACE("Fresh Fish"),
    short: "Pond-grown fish, cleaned and packed fresh—protein-rich and chemical-free.",
    highlights: ["Clean pond habitat", "Daily fresh catch", "Multiple varieties"],
    variants: [
      { label: "Whole Cleaned (per kg)", price: 299 },
      { label: "Fillets (500 g)", price: 225 },
    ],
    accordions: {
      process:
        "Caught, cleaned, and packed on ice for maximum freshness; minimal handling.",
      usage: [
        "Keep chilled; cook the same day for best taste.",
        "Rinse lightly before cooking.",
      ],
      availability: "Seasonal varieties; check the day’s catch list.",
    },
  },
  {
    slug: "fruits",
    name: "Seasonal Fruits",
    heroImg: PLACE("Seasonal Fruits"),
    short: "Orchard-fresh fruits—hand-picked at peak ripeness from 10,000+ trees.",
    highlights: ["Seasonal harvests", "Naturally grown", "Bursting with flavor"],
    variants: [{ label: "Assorted Farm Box", price: 349 }],
    accordions: {
      process:
        "Harvested at maturity, sorted gently, and delivered fresh to reduce waste and bruising.",
      usage: ["Refrigeration depends on the fruit.", "Rinse before eating."],
      availability: "Seasonally rotating selection (e.g., guava, amla, lemon).",
    },
  },

  // Optional individual fruit pages:
  {
    slug: "guava",
    name: "Guava",
    heroImg: PLACE("Guava"),
    short: "Sweet-tart guavas from our orchard—great fresh or in salads.",
    highlights: ["Hand-picked", "Fragrant & juicy", "High in vitamin C"],
    variants: [{ label: "500 g", price: 79 }],
    accordions: {
      process: "Picked at optimal ripeness and packed to prevent bruising.",
      usage: ["Rinse, slice, enjoy with a pinch of salt or chili!"],
      availability: "Peak season varies by region; check weekly list.",
    },
  },
  {
    slug: "amla",
    name: "Amla (Indian Gooseberry)",
    heroImg: PLACE("Amla"),
    short: "Tart and potent—perfect for pickles, powders, or fresh juicing.",
    highlights: ["Naturally grown", "Tart & refreshing", "Multiple culinary uses"],
    variants: [{ label: "500 g", price: 65 }],
    accordions: {
      process: "Harvested young for best tartness; sorted and packed promptly.",
      usage: ["Ideal for chutneys, pickles, candies, and juices."],
      availability: "Available seasonally.",
    },
  },
  {
    slug: "lemon",
    name: "Lemon",
    heroImg: PLACE("Lemon"),
    short: "Bright, zesty lemons to elevate everyday cooking and drinks.",
    highlights: ["Juicy & aromatic", "Hand-picked", "Kitchen essential"],
    variants: [{ label: "6 pcs", price: 49 }],
    accordions: {
      process: "Picked in the cool hours; sorted by size and firmness.",
      usage: ["Store at room temp for 3–5 days; refrigerate to extend life."],
      availability: "Year-round with seasonal peaks.",
    },
  },
];

export default PRODUCTS;
