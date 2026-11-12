import { images } from "./images";

export interface ProductSpec {
  sizes: string;
  material: string;
  printMethod: string;
  colours: string;
  finish: string;
  moq: string;
  leadTime: string;
  packing?: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  benefit: string;
  image: string;
  imageAlt: string;
  specs: ProductSpec;
  printOptions: {
    title: string;
    description: string;
  }[];
  industries: {
    name: string;
    slug: string;
    useCase: string;
  }[];
  pricingGuidance: string;
  orderingSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: ProductFaq[];
  relatedSlugs: string[];
}

export const products: Product[] = [
  {
    slug: "custom-paper-cups",
    title: "Custom Paper Cups",
    metaTitle: "Custom Printed Paper Cups with Logo Pakistan | Printzy",
    metaDescription:
      "Branded single and double wall paper cups for cafes, tea shops and restaurants. Sizes 4oz–16oz. Free mockup, delivery across Pakistan.",
    h1: "Custom Printed Paper Cups in Pakistan",
    benefit: "Single and double-wall cups that carry your logo to every customer table and office desk.",
    intro:
      "Your cup is the most-seen piece of your brand: it walks out of your door in a customer's hand, sits on office desks and appears in their social photos. Printzy prints single-wall and double-wall paper cups with your logo, engineered for coffee, tea, chai karak and cold drinks. Share your logo, get a free digital mockup, approve a proof, and we deliver nationwide across Pakistan.",
    image: images.cups,
    imageAlt: "Custom printed single-wall and double-wall paper coffee cups with brand logo",
    specs: {
      sizes: "4oz, 6oz, 8oz, 12oz, 16oz (Standard 80mm & 90mm rim diameters)",
      material: "Food-grade virgin paperboard with PE moisture barrier lining",
      printMethod: "High-definition flexographic & food-safe offset printing",
      colours: "Single colour spot printing to full colour CMYK",
      finish: "Matte smooth or semi-gloss finish",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "7–10 working days after artwork approval",
      packing: "500 or 1,000 cups per carton in poly-wrapped sleeves",
    },
    printOptions: [
      {
        title: "Single-Wall vs Double-Wall",
        description:
          "Single-wall cups cost less and suit tea, juices, cold brew, and quick counter service (often paired with a printed kraft sleeve). Double-wall cups provide superior thermal insulation, feel heavier and more premium in hand, and require no sleeve.",
      },
      {
        title: "Which size should you order?",
        description:
          "4oz for espresso and samplers; 6oz/8oz for traditional tea and flat whites; 12oz for standard lattes and cappuccinos; 16oz for large iced beverages, shakes, and smoothies.",
      },
      {
        title: "Food-Grade Inks & Odour-Free Printing",
        description:
          "We use low-odour, food-safe inks designed specifically for hot beverage packaging so the taste of your coffee or tea remains 100% unaffected.",
      },
    ],
    industries: [
      {
        name: "Cafes & Specialty Coffee",
        slug: "cafes",
        useCase: "8oz & 12oz branded cups for dine-in takeaway and walk-up orders.",
      },
      {
        name: "Tea & Karak Chains",
        slug: "restaurants",
        useCase: "Heat-resistant 6oz & 8oz cups with leak-proof tight lids.",
      },
      {
        name: "Corporate Events & Offices",
        slug: "corporate-gifting",
        useCase: "Branded cups for seminars, corporate cafeterias, and exhibitions.",
      },
    ],
    pricingGuidance:
      "Pricing is determined by cup size, wall construction (single vs double), order volume, and the number of print colours. Bulk volume tiers lower the cost per piece substantially. Contact us on WhatsApp with your required size and quantity for an immediate, transparent rate.",
    orderingSteps: [
      {
        step: 1,
        title: "Send Logo & Size",
        description: "Share your logo file and desired cup sizes (4oz to 16oz) via WhatsApp or our quote form.",
      },
      {
        step: 2,
        title: "Free Digital Mockup",
        description: "Receive a 3D digital mockup and itemized pricing within 24 hours.",
      },
      {
        step: 3,
        title: "Approve Proof",
        description: "Review and approve your print proof. We refine the artwork until you are completely satisfied.",
      },
      {
        step: 4,
        title: "Production & Delivery",
        description: "We print, count-check, carton-pack, and deliver to your doorstep anywhere in Pakistan.",
      },
    ],
    faqs: [
      {
        q: "What is your minimum order for printed cups?",
        a: "Minimum order quantities depend on your cup size and print colors. If you are launching a new cafe, contact us on WhatsApp with your planned volume and we will advise on the most economical trial run.",
      },
      {
        q: "Can I print my logo in full colour?",
        a: "Yes. We offer both single-colour spot printing (ideal for minimalist logos) and full-colour CMYK wrap-around printing for vibrant, detailed illustrations.",
      },
      {
        q: "Are the cups certified food-safe and leak-proof?",
        a: "Yes. All paper cups are manufactured from certified food-grade board with an internal poly coating that prevents leaks, softening, and seam seepage with hot liquids.",
      },
      {
        q: "Do you supply matching lids?",
        a: "Yes. We provide matching food-grade tight-fitting sip lids in black and white for 8oz, 12oz, and 16oz cups.",
      },
      {
        q: "How long does production take?",
        a: "Production typically takes [7–10 working days] following final digital proof approval, plus 1–3 days courier transit depending on your city.",
      },
      {
        q: "Cup ki price kya hai?",
        a: "Price cup ke size (single vs double wall), quantity, aur print colours par depend karti hai. Apna required size aur quantity WhatsApp karein, mockup ke saath exact rate mil jayega.",
      },
    ],
    relatedSlugs: ["cup-sleeves-stickers", "custom-napkins-tissues", "custom-paper-bags"],
  },
  {
    slug: "custom-pizza-boxes",
    title: "Custom Pizza Boxes",
    metaTitle: "Custom Pizza Boxes with Logo Pakistan | Printzy",
    metaDescription:
      "Strong, printed corrugated pizza boxes in 7 to 16 inch sizes. Grease-resistant, rigid fluting. Free mockup, delivery across Pakistan.",
    h1: "Custom Printed Pizza Boxes in Pakistan",
    benefit: "Sturdy, grease-resistant corrugated boxes that keep pizza hot, crust crisp, and branding intact.",
    intro:
      "A pizza box is your brand's billboard on every delivery bike and every customer dining table. Printzy manufactures rigid, food-grade corrugated pizza boxes tailored to maintain structural strength under hot, steamy food. Available in kraft or white outer boards with crisp custom logo printing across sizes from 7-inch personal pans to 16-inch family pies.",
    image: images.food,
    imageAlt: "Custom printed corrugated kraft pizza boxes with restaurant branding",
    specs: {
      sizes: '7", 9", 10", 11", 12", 14", 16" standard & custom cutter formats',
      material: "High-burst corrugated board (E-flute / B-flute micro-fluting)",
      printMethod: "Direct flexographic printing or high-resolution litho-laminated offset",
      colours: "1 to 4 spot colours or full-colour process",
      finish: "Natural matte kraft, bleached white, or water-based food-safe varnish",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "7–10 working days after artwork approval",
      packing: "Flat-packed in 50 or 100 piece shrink-wrapped bundles for easy storage",
    },
    printOptions: [
      {
        title: "Kraft vs Bleached White Board",
        description:
          "Natural brown kraft gives an artisan, rustic feel and resists surface scuffs during rider delivery. Bleached white exterior board provides maximum contrast and brightness for multi-colour logos and detailed promotional graphics.",
      },
      {
        title: "Rigid Fluting for Hot Delivery",
        description:
          "We engineer our boxes with calculated ventilation tabs and high-burst fluting so steam escapes without compromising lid rigidity or causing soggy crusts.",
      },
      {
        title: "Internal Printing Options",
        description:
          "Enhance unboxing by adding your social handles, QR codes, or discount codes printed cleanly inside the top lid.",
      },
    ],
    industries: [
      {
        name: "Pizzerias & Italian Restaurants",
        slug: "restaurants",
        useCase: "Heavy-duty 10, 12, and 14-inch delivery boxes.",
      },
      {
        name: "Cloud Kitchens",
        slug: "cloud-kitchens",
        useCase: "Flat-pack stackable boxes optimized for fast assembly during peak dinner rushes.",
      },
      {
        name: "Cafes & Bakeries",
        slug: "bakeries",
        useCase: "7-inch and 9-inch personal pizza and flatbread packaging.",
      },
    ],
    pricingGuidance:
      "Pricing depends on box dimensions, board grade (flute thickness), order quantity, and number of print sides. Bundled orders with burger boxes and paper bags qualify for combined production discounts.",
    orderingSteps: [
      {
        step: 1,
        title: "Choose Dimensions",
        description: "Select your pizza box sizes (7-inch to 16-inch) and estimated order volume.",
      },
      {
        step: 2,
        title: "Artwork & Mockup",
        description: "Send your logo; our design team prepares a 3D digital box mockup free of charge.",
      },
      {
        step: 3,
        title: "Proof Approval",
        description: "Review and approve print alignment, die-cut scores, and venting tab placement.",
      },
      {
        step: 4,
        title: "Production & Nationwide Delivery",
        description: "Your boxes are die-cut, quality-checked, bundle-packed, and shipped directly to your branch.",
      },
    ],
    faqs: [
      {
        q: "What sizes of pizza boxes do you manufacture?",
        a: "We manufacture standard 7-inch, 9-inch, 10-inch, 12-inch, 14-inch, and 16-inch boxes, as well as custom rectangular calzone and garlic bread boxes.",
      },
      {
        q: "Will the box collapse when riders stack orders on delivery bikes?",
        a: "No. We utilize heavy-gauge micro-flute corrugated board with high stacking resistance, engineered specifically to withstand heavy delivery humidity without buckling.",
      },
      {
        q: "Can I print on the inside of the pizza box lid?",
        a: "Yes. We offer interior lid printing using non-toxic food-safe inks, perfect for discount codes, review links, and brand stories.",
      },
      {
        q: "Are the boxes delivered pre-folded or flat?",
        a: "All pizza boxes are shipped flat-packed in tight bundles. This minimizes shipping freight and saves valuable storage space in your kitchen.",
      },
      {
        q: "Do you supply greaseproof butter paper liners as well?",
        a: "Yes. We provide custom printed or plain food-grade greaseproof liners cut precisely to your box dimensions.",
      },
    ],
    relatedSlugs: ["custom-food-boxes", "custom-takeaway-packaging", "custom-paper-bags"],
  },
  {
    slug: "custom-food-boxes",
    title: "Custom Food Boxes",
    metaTitle: "Custom Food Boxes with Logo Pakistan | Printzy",
    metaDescription:
      "Custom burger boxes, fries scoops, bakery and cake packaging. Grease-resistant food-grade board. Free design proof, fast delivery across Pakistan.",
    h1: "Custom Printed Food Boxes in Pakistan",
    benefit: "Greaseproof burger clamshells, fries scoops, and pastry boxes engineered for fresh food presentation.",
    intro:
      "From gourmet burgers and loaded fries to delicate pastries and cakes, your packaging preserves presentation, temperature, and taste. Printzy manufactures precision die-cut food boxes crafted from food-grade paperboard with greaseproof internal barriers. Designed for fast kitchen assembly and eye-catching unboxing on delivery.",
    image: images.food,
    imageAlt: "Custom printed burger clamshells, fries boxes, and pastry packaging",
    specs: {
      sizes: "Burger clamshells, fries scoops, roll boxes, pastry & cake boxes (standard & custom sizes)",
      material: "Food-grade SBS board, kraft virgin paperboard, or grease-resistant barrier board",
      printMethod: "Offset litho printing with food-safe inks",
      colours: "Single colour to 6-colour full process",
      finish: "Water-based matte coating, oil-resistant varnish, or clear window patching",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "7–10 working days after artwork approval",
      packing: "Packed nested or flat in heavy protective shipping cartons",
    },
    printOptions: [
      {
        title: "Interlocking Clamshell vs Tuck-End Boxes",
        description:
          "Clamshell burger boxes feature secure tab locks for one-handed closure on fast assembly lines. Tuck-end and crash-lock bakery boxes offer maximum stability for heavier desserts and family meal sets.",
      },
      {
        title: "Clear Window Inserts",
        description:
          "Available for bakery and sandwich boxes using food-safe transparent film to showcase product freshness while keeping contents hygienic.",
      },
      {
        title: "Greaseproof Barrier",
        description:
          "Integrated grease barrier coatings prevent butter, oil, and sauce stains from seeping through to the outer printed surface.",
      },
    ],
    industries: [
      {
        name: "Fast Food & Burger Joints",
        slug: "restaurants",
        useCase: "Burger clamshells, loaded fries boxes, and chicken tender buckets.",
      },
      {
        name: "Bakeries & Patisseries",
        slug: "bakeries",
        useCase: "Pastry boxes, brownie packs, and sturdy cake delivery containers.",
      },
      {
        name: "Cloud Kitchens",
        slug: "cloud-kitchens",
        useCase: "Modular meal boxes designed to pack neatly into delivery bags.",
      },
    ],
    pricingGuidance:
      "Unit costs depend on carton dimensions, board caliper/GSM, grease barrier specifications, and print coverage. Request a quick quote with your menu dimensions for exact rates.",
    orderingSteps: [
      {
        step: 1,
        title: "Share Food Dimensions",
        description: "Tell us the item you are packing (burger, fries, cake) or provide length, width, and height.",
      },
      {
        step: 2,
        title: "Digital Die-Line & Mockup",
        description: "We provide die-line templates for your designer or place your logo onto a 3D preview free.",
      },
      {
        step: 3,
        title: "Approve Proof",
        description: "Confirm print colours, fold scores, and locking tab tightness.",
      },
      {
        step: 4,
        title: "Manufacture & Ship",
        description: "Boxes are printed, die-cut, and dispatched with nationwide delivery across Pakistan.",
      },
    ],
    faqs: [
      {
        q: "Are these boxes safe for hot, greasy food?",
        a: "Yes. All boxes are made with certified food-contact board and internal grease barriers to resist oil bleed and moisture breakdown.",
      },
      {
        q: "Can you create custom die-cut shapes for our unique menu items?",
        a: "Yes. We engineer bespoke cutting dies tailored specifically to your food dimensions, sandwich rolls, or bakery items.",
      },
      {
        q: "What is the turnaround time?",
        a: "Standard production is [7–10 working days] from approved artwork, with express shipping available to major cities.",
      },
      {
        q: "Do the boxes require glue to assemble in our kitchen?",
        a: "No. Our boxes are pre-glued crash-bottom or self-locking fold designs that pop open instantly during kitchen service.",
      },
    ],
    relatedSlugs: ["custom-pizza-boxes", "custom-takeaway-packaging", "custom-paper-bags"],
  },
  {
    slug: "custom-takeaway-packaging",
    title: "Takeaway Packaging Sets",
    metaTitle: "Custom Takeaway Packaging Sets Pakistan | Printzy",
    metaDescription:
      "Matching branded packaging sets: boxes, cups, bags, and napkins. Consistent brand colours from kitchen to doorstep. Free mockup, fast quote.",
    h1: "Custom Takeaway Packaging Sets in Pakistan",
    benefit: "Coordinated packaging runs that guarantee matching colours and consistent quality across all customer touchpoints.",
    intro:
      "Most food businesses buy cups from one vendor, boxes from another, and bags from a third — resulting in mismatched shades and inconsistent branding. Printzy provides complete branded takeaway packaging suites: cups, food boxes, paper bags, napkins, and sleeves produced in coordinated production runs. One order, one brand approval, one unified customer experience.",
    image: images.food,
    imageAlt: "Complete branded food takeaway packaging set with matching box, cup, bag, and napkin",
    specs: {
      sizes: "Custom curated suites tailored to your complete restaurant or cafe menu",
      material: "Coordinated virgin kraft, bleached paperboard, and greaseproof liners",
      printMethod: "Matched flexo and offset color calibrations",
      colours: "Brand-standardized Pantone and CMYK palette matching",
      finish: "Unified matte or satin brand finish across all components",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "8–12 working days after artwork approval",
      packing: "Grouped by item in protective shipping cartons with moisture wrap",
    },
    printOptions: [
      {
        title: "Pantone Brand Consistency",
        description:
          "We calibrate color profiles across different paper substrates (kraft bag vs poly cup vs corrugated box) to ensure your brand hue looks identical on every piece.",
      },
      {
        title: "Turnkey Bundle Savings",
        description:
          "Consolidating your entire packaging supply with Printzy lowers setup overhead, simplifies inventory tracking, and reduces overall shipping freight.",
      },
      {
        title: "Scheduled Reorders",
        description:
          "We keep your approved artwork and die-lines on active file so routine monthly replenishment requires only a quick WhatsApp confirmation.",
      },
    ],
    industries: [
      {
        name: "Restaurants & Fast Casual",
        slug: "restaurants",
        useCase: "Full table-to-doorstep packaging for delivery and take-out.",
      },
      {
        name: "Cafes & Coffee Bars",
        slug: "cafes",
        useCase: "Matching cups, pastry bags, and cup sleeves.",
      },
      {
        name: "Cloud Kitchen Networks",
        slug: "cloud-kitchens",
        useCase: "Streamlined multi-brand packaging management for delivery platforms.",
      },
    ],
    pricingGuidance:
      "Bundled packaging suites provide our strongest volume pricing. Share your menu items and monthly packaging volumes on WhatsApp for an all-in-one quotation.",
    orderingSteps: [
      {
        step: 1,
        title: "Select Suite Items",
        description: "Choose which items you need (cups, burger boxes, takeaway bags, napkins, sleeves).",
      },
      {
        step: 2,
        title: "Unified Brand Proof",
        description: "We generate a synchronized 3D mockup presenting all your packaging side by side.",
      },
      {
        step: 3,
        title: "Approve Colors & Quantities",
        description: "Review color consistency across all substrates before releasing to press.",
      },
      {
        step: 4,
        title: "Coordinated Dispatch",
        description: "All packaging components are produced, checked, and delivered together to your location.",
      },
    ],
    faqs: [
      {
        q: "What items can be included in a takeaway packaging set?",
        a: "Any combination of paper cups, pizza boxes, burger clamshells, fries scoops, paper carrier bags, tissue napkins, cup sleeves, and sealed box stickers.",
      },
      {
        q: "How do you ensure the logo color matches across paper bags and cups?",
        a: "We calibrate ink viscosities and test on substrate samples to ensure your brand's specific Pantone color remains consistent across kraft paper, white board, and cup walls.",
      },
      {
        q: "Can different items have different order quantities in the set?",
        a: "Yes. For example, you can order 2,000 cups, 1,000 boxes, and 500 carrier bags based on your restaurant's specific consumption rate.",
      },
      {
        q: "Can we reorder individual items when stock runs low?",
        a: "Absolutely. Once initial artwork is approved, you can reorder individual items whenever needed without re-paying die setup fees.",
      },
    ],
    relatedSlugs: ["custom-paper-cups", "custom-food-boxes", "custom-paper-bags"],
  },
  {
    slug: "custom-paper-bags",
    title: "Custom Paper Bags",
    metaTitle: "Custom Printed Paper Bags with Logo Pakistan | Printzy",
    metaDescription:
      "Custom kraft and white paper bags with handles for retail, restaurants and cafes. High strength. Free design proof, nationwide delivery.",
    h1: "Custom Printed Paper Bags in Pakistan",
    benefit: "High-strength kraft and white paper carrier bags with sturdy handles that elevate your customer takeaway experience.",
    intro:
      "When a customer leaves your store or receives a food delivery, your paper bag is their first physical interaction with your brand. Printzy prints eco-friendly brown kraft and bleached white paper carrier bags built with reinforced handles and durable gusseted bases. Perfect for boutique retail, coffee shops, bakeries, and takeaway food delivery.",
    image: images.bags,
    imageAlt: "Custom printed kraft paper carrier bags with handles and company logo",
    specs: {
      sizes: "Small (6x8x3\"), Medium (8x10x4\"), Large (10x14x5\"), Takeaway Flat-Bottom (12x12x7\") standard & custom dimensions",
      material: "Heavy-duty virgin brown kraft (120–180 GSM) or premium bleached white kraft",
      printMethod: "High-precision flexographic or offset printing",
      colours: "1 to 4 spot colours or full-coverage CMYK print",
      finish: "Natural textured kraft, smooth matte, or reinforced turn-top rim",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "7–10 working days after artwork approval",
      packing: "Packed flat in heavy protective cartons of 250 or 500 pieces",
    },
    printOptions: [
      {
        title: "Handle Configurations",
        description:
          "Choose twisted paper rope handles for retail luxury, flat folded kraft handles for comfortable food delivery carry, or die-cut D-punch handles for counter convenience.",
      },
      {
        title: "Brown Kraft vs Bleached White",
        description:
          "Brown kraft communicates organic sustainability and natural quality. Bleached white kraft produces high-contrast, vivid brand colours that stand out on busy streets.",
      },
      {
        title: "Reinforced Block Bottoms",
        description:
          "Engineered with rectangular flat bottoms so bags stay upright on restaurant packing counters without tipping over.",
      },
    ],
    industries: [
      {
        name: "Retail & Apparel Boutiques",
        slug: "ecommerce",
        useCase: "Luxury shopping bags with twisted rope handles.",
      },
      {
        name: "Cafes & Bakeries",
        slug: "bakeries",
        useCase: "Sturdy flat-bottom takeaway bags that hold pastry boxes flat.",
      },
      {
        name: "Restaurants & Delivery",
        slug: "restaurants",
        useCase: "Large volume food carrier bags designed to fit multiple food containers.",
      },
    ],
    pricingGuidance:
      "Bag price is determined by paper weight (GSM), bag dimensions, handle style, and number of printed ink colours. Ordering in higher volume bands provides substantial cost savings per unit.",
    orderingSteps: [
      {
        step: 1,
        title: "Select Bag Size & Style",
        description: "Choose small, medium, large, or provide your exact required width, height, and gusset.",
      },
      {
        step: 2,
        title: "Artwork Placement",
        description: "Send your logo; we generate a 3D digital bag mockup showing both sides and gusset print.",
      },
      {
        step: 3,
        title: "Approve Proof",
        description: "Review print margins, handle alignment, and paper substrate selection.",
      },
      {
        step: 4,
        title: "Print & Deliver",
        description: "Bags are printed, handle-assembled, carton-packed, and shipped to your address.",
      },
    ],
    faqs: [
      {
        q: "What weight capacity can your paper bags hold?",
        a: "Our standard 130–150 GSM kraft bags safely support 3kg to 7kg of weight, reinforced with strong adhesive along the bottom fold and handle anchors.",
      },
      {
        q: "Can you print on both sides and on the side gussets?",
        a: "Yes. We offer full wrap-around printing including front, back, side gussets, and bottom exterior panel.",
      },
      {
        q: "Are the paper bags eco-friendly and biodegradable?",
        a: "Yes. All our kraft paper bags are 100% recyclable, biodegradable, and made from responsibly managed pulp sources.",
      },
      {
        q: "What is your minimum order quantity for custom printed bags?",
        a: "Minimum order quantities vary by bag dimensions and handle type. Message us on WhatsApp with your target size for the most economical run size.",
      },
    ],
    relatedSlugs: ["custom-paper-cups", "custom-food-boxes", "custom-takeaway-packaging"],
  },
  {
    slug: "custom-napkins-tissues",
    title: "Custom Napkins & Tissues",
    metaTitle: "Custom Printed Napkins & Tissues Pakistan | Printzy",
    metaDescription:
      "Custom printed restaurant napkins, cocktail napkins and dispenser tissues with your logo. Soft, absorbent. Free mockup, fast quote.",
    h1: "Custom Printed Napkins and Tissues in Pakistan",
    benefit: "Soft, highly absorbent printed napkins that complete your customer's in-store and takeaway dining experience.",
    intro:
      "Every meal ends with a napkin: placing your logo into your customer's hands at the exact moment of meal satisfaction. Printzy manufactures ultra-soft, absorbent 1-ply, 2-ply, and 3-ply printed napkins for restaurants, cafes, caterers, and corporate dining. Featuring crisp, food-safe spot logo printing that never smudges or bleeds upon contact with moisture.",
    image: images.napkins,
    imageAlt: "Custom printed restaurant paper napkins and cocktail tissues with company logo",
    specs: {
      sizes: "Cocktail/Beverage (25x25cm), Lunch (30x30cm), Dinner/L-Fold (33x33cm or 40x40cm)",
      material: "100% virgin wood pulp, available in 1-ply, 2-ply, and 3-ply embossed tissue",
      printMethod: "High-speed flexographic rotary printing with water-based non-toxic inks",
      colours: "1 to 2 crisp spot colours (Pantone matched)",
      finish: "Full edge embossing or coin edge embossing for maximum absorbency and softness",
      moq: "Rotary volume runs available. Contact on WhatsApp for tier options.",
      leadTime: "7–10 working days after artwork approval",
      packing: "Packed in hygienic poly sleeves of 100 or 250 napkins inside protective shipping cartons",
    },
    printOptions: [
      {
        title: "2-Ply vs 3-Ply Embossing",
        description:
          "2-ply napkins balance cost and absorbency for fast casual dining and coffee counters. 3-ply napkins provide luxurious softness and heavy absorbency for fine dining, weddings, and formal banquets.",
      },
      {
        title: "Water-Fast Inks",
        description:
          "We use food-safe, non-toxic inks that lock permanently into tissue fibers, ensuring no ink transfers onto customer hands, lips, or table linens.",
      },
      {
        title: "Fold Styles",
        description:
          "Available in standard 1/4 quarter fold, 1/8 dinner fold, or dispenser fold for counter service dispensers.",
      },
    ],
    industries: [
      {
        name: "Restaurants & Steakhouses",
        slug: "restaurants",
        useCase: "Large 2-ply and 3-ply dinner napkins with crisp corner logo print.",
      },
      {
        name: "Cafes & Juice Bars",
        slug: "cafes",
        useCase: "Cocktail size 2-ply napkins paired with cold brew, coffee, and dessert orders.",
      },
      {
        name: "Weddings & Catering",
        slug: "corporate-gifting",
        useCase: "Custom monogrammed luxury napkins for events and banquets.",
      },
    ],
    pricingGuidance:
      "Tissue napkins are an economical high-volume branding medium. Pricing scales significantly with volume tiers (5k, 10k, 25k, 50k pieces). Send your logo and napkin size on WhatsApp for immediate tiered pricing.",
    orderingSteps: [
      {
        step: 1,
        title: "Select Napkin Size",
        description: "Choose cocktail (25cm), lunch (30cm), or dinner (33cm/40cm) and ply count (2-ply or 3-ply).",
      },
      {
        step: 2,
        title: "Digital Proof",
        description: "We position your logo in the corner or center of the fold and provide a digital proof within 24 hours.",
      },
      {
        step: 3,
        title: "Approve Print Proof",
        description: "Confirm ink Pantone shade and embossing border style.",
      },
      {
        step: 4,
        title: "Hygienic Packing & Delivery",
        description: "Napkins are printed, count-packed in poly wrappers, and delivered to your doorstep.",
      },
    ],
    faqs: [
      {
        q: "Will the printed ink bleed onto customer hands or face?",
        a: "Never. We use specialized water-fast, food-grade flexo inks that are permanently cured into the paper fibers and will not run or transfer when wet.",
      },
      {
        q: "What is your minimum order for printed napkins?",
        a: "Because rotary tissue printing is a continuous high-speed process, minimum orders are structured to provide the lowest cost per napkin. Contact on WhatsApp for current production minimums.",
      },
      {
        q: "Do you offer dispenser-compatible napkins for counter holders?",
        a: "Yes. We produce dispenser-folded napkins designed to fit standard restaurant stainless steel and acrylic counter dispensers.",
      },
      {
        q: "Can I print in gold or metallic foil on napkins?",
        a: "Yes. We offer metallic hot foil stamping for luxury wedding, banquet, and VIP lounge event napkins.",
      },
    ],
    relatedSlugs: ["custom-paper-cups", "custom-food-boxes", "cup-sleeves-stickers"],
  },
  {
    slug: "cup-sleeves-stickers",
    title: "Cup Sleeves & Stickers",
    metaTitle: "Custom Cup Sleeves & Packaging Stickers Pakistan | Printzy",
    metaDescription:
      "Branded corrugated cup sleeves and die-cut packaging stickers. Low-cost custom packaging for cafes and food delivery. Free proof, fast quote.",
    h1: "Custom Cup Sleeves and Packaging Stickers in Pakistan",
    benefit: "Cost-effective, versatile branding accessories that transform plain cups and food boxes into branded packaging.",
    intro:
      "Looking for a low-cost, flexible way to brand your cups, bakery boxes, and delivery bags? Printzy prints custom corrugated coffee cup sleeves and waterproof die-cut packaging stickers. Sleeves provide heat protection and brand visibility on standard cups, while adhesive stickers securely seal delivery containers and elevate plain kraft bags with professional polish.",
    image: images.napkins,
    imageAlt: "Custom printed coffee cup sleeves and die-cut packaging stickers with brand artwork",
    specs: {
      sizes: "Universal sleeves (fits 8oz–16oz cups); Stickers in custom round, square, or die-cut shapes (3cm–10cm)",
      material: "Sleeves: Embossed corrugated kraft paperboard. Stickers: Gloss paper, matte vinyl, or waterproof BOPP",
      printMethod: "High-resolution offset and digital UV label printing",
      colours: "1-colour spot print to full-colour photo CMYK with protective varnish",
      finish: "Matte laminate, gloss UV coat, or natural kraft texture",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "5–7 working days after artwork approval",
      packing: "Sleeves flat-packed in cartons; stickers supplied on rolls or pre-cut sheets",
    },
    printOptions: [
      {
        title: "Embossed Heat-Barrier Sleeves",
        description:
          "Our corrugated fluting creates an insulating air pocket that protects customer hands from scalding hot coffee while providing a textured grip.",
      },
      {
        title: "Tamper-Evident Delivery Seals",
        description:
          "Adhesive stickers with security cut lines provide visual proof that food packaging was not opened during courier transit.",
      },
      {
        title: "Waterproof Label Substrates",
        description:
          "Waterproof vinyl stickers resist condensation on cold iced drink cups and refrigerated dessert containers without curling or peeling.",
      },
    ],
    industries: [
      {
        name: "Coffee Shops & Drink Kiosks",
        slug: "cafes",
        useCase: "Universal corrugated sleeves for hot coffee, tea, and chai.",
      },
      {
        name: "Bakeries & Home Bakers",
        slug: "bakeries",
        useCase: "Die-cut round stickers for cake boxes, cookie pouches, and ribbon tags.",
      },
      {
        name: "Food Delivery & Cloud Kitchens",
        slug: "cloud-kitchens",
        useCase: "Tamper-evident hygiene seal stickers for paper bags and food containers.",
      },
    ],
    pricingGuidance:
      "Sleeves and stickers offer our lowest price point per unit for custom branding. Share your desired sticker size or sleeve quantity on WhatsApp for instant quote tiers.",
    orderingSteps: [
      {
        step: 1,
        title: "Choose Accessory",
        description: "Specify whether you need cup sleeves, roll stickers, or sheet-cut labels.",
      },
      {
        step: 2,
        title: "Send Logo & Shape",
        description: "Send your logo; our team formats the die-cut boundary and provides a digital mockup.",
      },
      {
        step: 3,
        title: "Approve Proof",
        description: "Verify print sharpness, finish (matte vs gloss), and cup fit.",
      },
      {
        step: 4,
        title: "Fast Production & Dispatch",
        description: "Accessories are printed, precision cut, and dispatched directly to your business.",
      },
    ],
    faqs: [
      {
        q: "Do your cup sleeves fit standard paper cups?",
        a: "Yes. Our universal tapered sleeves fit standard 8oz, 10oz, 12oz, and 16oz paper hot cups with a secure friction grip.",
      },
      {
        q: "Are the stickers waterproof for cold drink condensation?",
        a: "Yes. When you choose our vinyl or BOPP sticker option, the adhesive and ink are 100% waterproof and condensation-resistant.",
      },
      {
        q: "Can stickers be printed in custom die-cut shapes following our logo contour?",
        a: "Yes. We offer precision digital contour cutting for circular, oval, square, or custom contoured badge shapes at no extra tooling cost.",
      },
      {
        q: "What is the turnaround time for stickers?",
        a: "Stickers typically dispatch within [5–7 working days] from digital proof approval, making them our fastest branding option.",
      },
    ],
    relatedSlugs: ["custom-paper-cups", "custom-food-boxes", "custom-paper-bags"],
  },
  {
    slug: "custom-mailer-gift-boxes",
    title: "Custom Mailer & Gift Boxes",
    metaTitle: "Custom Mailer & Gift Boxes with Logo Pakistan | Printzy",
    metaDescription:
      "Corrugated mailer boxes and gift packaging for e-commerce, corporate gifting and events. Free 3D proof, delivery across Pakistan.",
    h1: "Custom Printed Mailer and Gift Boxes in Pakistan",
    benefit: "Premium corrugated mailer boxes engineered for memorable e-commerce unboxing and corporate gifting.",
    intro:
      "For e-commerce brands, subscription boxes, and corporate gifting, your unboxing experience is your primary physical brand moment. Printzy manufactures rigid E-flute corrugated mailer boxes with front tuck flaps and self-locking wings. Built to withstand courier transit without requiring exterior tape, while showcasing high-resolution interior and exterior brand artwork.",
    image: images.boxes,
    imageAlt: "Custom printed kraft corrugated mailer boxes with locking tuck flap",
    specs: {
      sizes: "Custom dimensions manufactured to your product specifications (e.g. 6x6x2\", 9x6x3\", 12x9x4\", 14x10x5\")",
      material: "Rigid corrugated E-flute / B-flute with kraft, bleached white, or art paper liner",
      printMethod: "High-resolution offset litho printing or direct digital UV printing",
      colours: "Single colour minimalist print to full-coverage exterior and interior CMYK",
      finish: "Soft-touch matte laminate, gloss varnish, spot UV, or metallic foil stamping",
      moq: "Flexible run sizes available. Contact on WhatsApp for optimal tier volume.",
      leadTime: "8–12 working days after artwork approval",
      packing: "Flat-packed in protective master cartons with corner guards",
    },
    printOptions: [
      {
        title: "Interior & Exterior Double-Sided Print",
        description:
          "Print a minimalist brand exterior combined with a vibrant, welcoming surprise pattern or greeting on the inside lid for viral unboxing videos.",
      },
      {
        title: "Self-Locking Front Tuck Flap",
        description:
          "Engineered with dust flaps and double-walled side panels that lock firmly into place, providing maximum rigidity and tamper resistance without exterior tape.",
      },
      {
        title: "Custom Cut Foam & Paper Inserts",
        description:
          "Available with custom die-cut cardboard or velvet foam inserts to hold bottles, apparel, cosmetics, or corporate gift items firmly in position.",
      },
    ],
    industries: [
      {
        name: "E-Commerce & D2C Brands",
        slug: "ecommerce",
        useCase: "Apparel, skincare, cosmetics, and jewelry shipping boxes.",
      },
      {
        name: "Corporate Gifting & HR",
        slug: "corporate-gifting",
        useCase: "Employee welcome kits, executive holiday gifts, and brand merchandise.",
      },
      {
        name: "Specialty Bakeries & Confectionery",
        slug: "bakeries",
        useCase: "Luxury gift boxes for macaroons, artisan chocolates, and festive sweets.",
      },
    ],
    pricingGuidance:
      "Pricing is based on box volume (length x width x depth), board fluting, print coverage (1 side vs 2 sides), and finishing treatments. Request a quote with your product dimensions for exact tier rates.",
    orderingSteps: [
      {
        step: 1,
        title: "Provide Product Dimensions",
        description: "Tell us what you are shipping and the internal box length, width, and depth you need.",
      },
      {
        step: 2,
        title: "Die-Line & 3D Mockup",
        description: "We provide an exact die-line template for your artwork and generate a 3D digital mockup.",
      },
      {
        step: 3,
        title: "Approve Proof",
        description: "Confirm locking tabs, panel alignments, and print colours.",
      },
      {
        step: 4,
        title: "Precision Die-Cut & Delivery",
        description: "Boxes are printed, die-cut, packed flat, and delivered directly to your fulfillment warehouse.",
      },
    ],
    faqs: [
      {
        q: "Can I ship these boxes directly through courier without an outer bag?",
        a: "Yes. Our mailer boxes are constructed from heavy-gauge corrugated board with self-locking tabs built specifically to withstand courier transit across Pakistan.",
      },
      {
        q: "Can I print both on the outside and inside of the mailer box?",
        a: "Yes. Full-color double-sided printing (outside + inside lid and base) is one of our most popular unboxing features.",
      },
      {
        q: "What is the minimum order quantity for custom mailer boxes?",
        a: "Minimum order quantities are structured to support both boutique launches and volume e-commerce runs. Contact on WhatsApp for exact tier volume options.",
      },
      {
        q: "Do you supply custom tissue paper and branded stickers to match?",
        a: "Yes. We offer coordinated branded tissue wrap and sticker seals to complete your brand unboxing presentation.",
      },
    ],
    relatedSlugs: ["custom-paper-bags", "cup-sleeves-stickers", "custom-food-boxes"],
  },
];

// Helper to look up products by canonical slug or legacy alias
const legacySlugAliases: Record<string, string> = {
  cups: "custom-paper-cups",
  boxes: "custom-mailer-gift-boxes",
  food: "custom-food-boxes",
  "pizza-food-boxes": "custom-pizza-boxes",
  takeaway: "custom-takeaway-packaging",
  tissues: "custom-napkins-tissues",
  "paper-bags": "custom-paper-bags",
  "sleeves-stickers": "cup-sleeves-stickers",
  other: "custom-mailer-gift-boxes",
};

export function resolveProductSlug(slug: string): string {
  const normalized = slug.trim().toLowerCase();
  return legacySlugAliases[normalized] ?? normalized;
}

export function getProductBySlug(slug: string): Product | undefined {
  const canonical = resolveProductSlug(slug);
  return products.find((p) => p.slug === canonical);
}
