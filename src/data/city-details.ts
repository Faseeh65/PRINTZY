export interface CityDetail {
  slug: string;
  cityName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  cityContext: string;
  deliveryTime: string;
  logisticsDetails: string;
  localIndustries: string[];
  popularProducts: {
    title: string;
    slug: string;
    reason: string;
  }[];
  orderingSteps: string[];
  faqs: {
    q: string;
    a: string;
  }[];
  isPrimaryHub: boolean;
}

export const cityDetails: Record<string, CityDetail> = {
  lahore: {
    slug: "lahore",
    cityName: "Lahore",
    metaTitle: "Custom Packaging Printing Lahore | Printzy",
    metaDescription:
      "Custom paper cups, pizza boxes, burger cartons and kraft bags in Lahore. Fast local delivery (1-2 days), low MOQ, free 3D mockup. Get a quote today.",
    h1: "Custom Printed Packaging for Lahore Cafes, Restaurants & Brands",
    intro:
      "As Pakistan's culinary and printing capital, Lahore demands packaging that stands out in bustling food hubs like Gulberg, DHA, MM Alam Road, Johar Town, and the Walled City. Printzy provides Lahore food businesses, cafes, and online stores with fast local turnaround, low minimums, and pre-production proof approvals.",
    cityContext:
      "Lahore's vibrant food culture is among the most competitive in South Asia. With hundreds of artisanal cafes, burger joints, traditional barbecue masters, and bakeries competing for customer loyalty, unbranded packaging simply gets overlooked. Whether you operate a single specialty espresso bar in DHA Phase 5 or a multi-branch restaurant group spanning Mall Road to Bahria Town, Printzy ensures your branded packaging delivers crisp presentation and dependable food hygiene.",
    deliveryTime: "1 to 2 working days after production completion",
    logisticsDetails:
      "Direct local dispatch from our Lahore production facility via dedicated logistics couriers and same-day city delivery services. Physical paper stock inspections and sample pickups can be coordinated directly.",
    localIndustries: [
      "Specialty cafes & third-wave coffee shops in Gulberg & DHA",
      "Gourmet burger & loaded fries spots in Johar Town & Model Town",
      "Artisanal bakeries & dessert parlours across MM Alam Road",
      "High-volume cloud kitchens serving Foodpanda delivery clusters",
      "Independent apparel & skincare brands based in Lahore",
    ],
    popularProducts: [
      {
        title: "Custom Paper Cups",
        slug: "custom-paper-cups",
        reason: "Double-wall coffee cups for Lahore's thriving winter coffee culture and specialty cafes.",
      },
      {
        title: "Custom Pizza Boxes",
        slug: "custom-pizza-boxes",
        reason: "Sturdy corrugated E-flute pizza boxes for artisanal sourdough and deep-pan pizzerias.",
      },
      {
        title: "Custom Food Boxes",
        slug: "custom-food-boxes",
        reason: "Greaseproof lock-corner burger cartons and loaded fries packaging built for speedy dining.",
      },
      {
        title: "Kraft Paper Bags",
        slug: "custom-paper-bags",
        reason: "Heavy-duty takeaway bags for bakery purchases and retail boutique carryouts.",
      },
    ],
    orderingSteps: [
      "Share your required product type, dimensions, and logo via WhatsApp (0321 9091707).",
      "Receive an itemised quote and free photorealistic 3D digital mockup within 24 hours.",
      "Review your digital proof or inspect physical material samples in Lahore.",
      "Production commences and your order is delivered to your doorstep in 1–2 days after completion.",
    ],
    faqs: [
      {
        q: "How fast is delivery for custom packaging orders in Lahore?",
        a: "Once production and quality checks are complete, delivery within Lahore typically takes just 1 to 2 working days via local courier dispatch.",
      },
      {
        q: "Can I inspect physical paper stock samples in Lahore before ordering?",
        a: "Yes. We can dispatch a material swatch pack directly to your cafe or kitchen in Lahore so you can touch the paperboard GSM and inspect coating finishes.",
      },
      {
        q: "What is the minimum order quantity for Lahore food brands?",
        a: "Our standard minimums start from [MOQ: confirm, e.g. 500 – 1,000 pcs], designed to support emerging food entrepreneurs without locking up excess capital.",
      },
    ],
    isPrimaryHub: true,
  },

  karachi: {
    slug: "karachi",
    cityName: "Karachi",
    metaTitle: "Custom Packaging Printing Karachi | Printzy Pakistan",
    metaDescription:
      "Reliable custom packaging delivery to Karachi: branded cups, grease-resistant food boxes, pizza cartons, kraft bags. Low MOQ, free mockup in 24h.",
    h1: "Custom Printed Packaging for Karachi Food Chains & Retail Brands",
    intro:
      "Operating in Pakistan's biggest commercial engine and seaside metropolis requires packaging built to withstand coastal humidity, heavy motorcycle delivery transit, and massive customer volume. Printzy delivers high-grade custom packaging directly to Karachi businesses.",
    cityContext:
      "Karachi's dining ecosystem—from food streets at Burns Road and Sindhi Muslim Society (SMCHS) to seaside dining in Clifton and DHA, and bustling hubs in North Nazimabad and Gulshan-e-Iqbal—operates at unmatched scale. Packaging in Karachi faces unique challenges: high maritime humidity that can soften weak paperboards, and long bike delivery distances in intense heat. Printzy uses moisture-resistant food boards and grease-barrier linings specifically engineered to keep food intact from kitchen to doorstep across Karachi.",
    deliveryTime: "2 to 4 working days via express logistics",
    logisticsDetails:
      "Daily shipments to Karachi handled by reputable national cargo and express courier partners [couriers: confirm, e.g. TCS, Leopards, Trax] with real-time consignment tracking straight to your branch doors.",
    localIndustries: [
      "High-volume burger joints & takeaway counters in SMCHS & Gulshan",
      "Fine dining restaurants & beachside bistros in Clifton & DHA",
      "Traditional biryani, roll & barbecue chains across Karachi",
      "Fast-expanding cloud kitchens covering Korangi to North Karachi",
      "Textile, fashion & beauty e-commerce businesses headquartered in Karachi",
    ],
    popularProducts: [
      {
        title: "Custom Food Boxes",
        slug: "custom-food-boxes",
        reason: "Greaseproof burger cartons and takeaway boxes with moisture-resistant barrier boards.",
      },
      {
        title: "Custom Paper Cups",
        slug: "custom-paper-cups",
        reason: "Single and double-wall cups for chai spots, karak counters, and cold beverage bars.",
      },
      {
        title: "Custom Mailer Boxes",
        slug: "custom-mailer-gift-boxes",
        reason: "E-commerce shipping boxes for Karachi's thriving direct-to-consumer online brands.",
      },
      {
        title: "Custom Takeaway Packaging",
        slug: "custom-takeaway-packaging",
        reason: "Complete delivery sets that survive Karachi's demanding delivery motorcycle journeys.",
      },
    ],
    orderingSteps: [
      "Send your packaging specifications and artwork via WhatsApp or our online quote form.",
      "Get a 3D digital mockup and transparent pricing tailored to your Karachi delivery address within 24h.",
      "Approve high-resolution proofs online; we keep your approved files archived for effortless reorders.",
      "Your order is manufactured, packed in protective master cartons, and dispatched via express cargo to Karachi.",
    ],
    faqs: [
      {
        q: "How are packaging orders shipped to Karachi?",
        a: "We ship orders to Karachi using secure, dry-van cargo and express courier logistics, sealed in moisture-protected master cartons to prevent coastal humidity damage in transit.",
      },
      {
        q: "How long does shipping to Karachi take?",
        a: "Transit time from production completion to your doorstep in Karachi typically takes 2 to 4 working days with full tracking details provided.",
      },
      {
        q: "Do your food boxes handle Karachi's humid coastal climate?",
        a: "Yes. We employ high-caliper virgin paperboard with optional internal moisture and grease coatings to ensure boxes stay rigid and never buckle under humidity.",
      },
    ],
    isPrimaryHub: false,
  },

  islamabad: {
    slug: "islamabad",
    cityName: "Islamabad & Rawalpindi",
    metaTitle: "Custom Packaging Printing Islamabad & Rawalpindi | Printzy",
    metaDescription:
      "Premium custom packaging in Islamabad & Rawalpindi: branded coffee cups, boutique mailer boxes, food cartons. Free 3D mockup, delivery in 2-3 days.",
    h1: "Custom Printed Packaging for Islamabad & Rawalpindi Businesses",
    intro:
      "From diplomatic enclaves and trendy F-6, F-7, and F-10 cafe strips to commercial hubs in Bahria Town and Saddar Rawalpindi, Islamabad demands refined, eco-conscious, and polished brand presentation. Printzy supplies custom packaging that reflects your brand's prestige.",
    cityContext:
      "Consumers in Islamabad and Rawalpindi have high aesthetic expectations. Specialty coffee bars, health-food kitchens, artisanal dessert studios, and corporate institutions in the twin cities prioritize clean minimalist typography, eco-friendly kraft paper substrates, and flawless print registration. Printzy delivers sophisticated packaging solutions—including biodegradable food boards and crisp foil-accented finishes—that fit Islamabad's modern cafe culture and corporate community.",
    deliveryTime: "2 to 3 working days via express logistics",
    logisticsDetails:
      "Direct transit from our central facility via motorway logistics, arriving at twin-city commercial hubs (Blue Area, I-8, F-sectors, Saddar, Bahria Town, DHA Islamabad) in 48 to 72 hours.",
    localIndustries: [
      "Artisanal specialty coffee shops & breakfast cafes in F-6, F-7 & Kohsar Market",
      "Corporate gifting & executive event kits for Islamabad embassies and multinational NGOs",
      "Boutique bakeries & gourmet confectioners in Beverly Centre and F-11",
      "Fast-growing delivery brands across Rawalpindi & Bahria Town",
      "Direct-to-consumer lifestyle brands operating from the capital",
    ],
    popularProducts: [
      {
        title: "Custom Paper Cups",
        slug: "custom-paper-cups",
        reason: "Minimalist, aesthetic double-wall cups popular with Islamabad's specialty coffee crowd.",
      },
      {
        title: "Custom Mailer & Gift Boxes",
        slug: "custom-mailer-gift-boxes",
        reason: "Refined presentation boxes for Islamabad corporate gifts, NGO kits, and luxury retail.",
      },
      {
        title: "Custom Printed Napkins",
        slug: "custom-napkins-tissues",
        reason: "Embossed 2-ply dinner napkins that complement upscale restaurant interiors.",
      },
      {
        title: "Kraft Paper Bags",
        slug: "custom-paper-bags",
        reason: "Eco-friendly recyclable kraft shopping bags favoured by green-conscious shoppers.",
      },
    ],
    orderingSteps: [
      "Message our team on WhatsApp with your product requirement and brand design vector.",
      "Receive a tailored quote and complimentary 3D visual render within 24 hours.",
      "Confirm proof details online; adjustments are made free of charge until you are satisfied.",
      "Orders are securely packed and dispatched via express motorway courier straight to your Islamabad/Rawalpindi address.",
    ],
    faqs: [
      {
        q: "What is the delivery time to Islamabad and Rawalpindi?",
        a: "Transit via motorway express courier takes approximately 2 to 3 working days following production and quality verification.",
      },
      {
        q: "Do you offer eco-friendly and recyclable packaging for Islamabad brands?",
        a: "Yes. We offer biodegradable unbleached kraft paperboards, compostable linings, and recyclable materials aligned with Islamabad's environmental standards.",
      },
      {
        q: "Can you provide official tax invoices for corporate and NGO orders in Islamabad?",
        a: "Yes. We provide complete corporate tax invoices with NTN details suitable for official institutional and corporate procurement.",
      },
    ],
    isPrimaryHub: false,
  },

  faisalabad: {
    slug: "faisalabad",
    cityName: "Faisalabad",
    metaTitle: "Custom Packaging Printing Faisalabad | Printzy Pakistan",
    metaDescription:
      "Custom printed boxes, paper cups, takeaway bags and napkins in Faisalabad. Industrial-grade packaging, low MOQ, fast dispatch across Faisalabad.",
    h1: "Custom Printed Packaging for Faisalabad Food & Retail Businesses",
    intro:
      "As Pakistan's industrial powerhouse, Faisalabad is experiencing an explosion of modern cafes, food streets, and retail stores from D-Ground and Kohinoor City to Canal Road. Printzy provides Faisalabad brands with durable, cost-effective custom packaging.",
    cityContext:
      "Faisalabad's entrepreneurial market appreciates manufacturing value: robust paper stocks, clear cost structures, and dependable timelines. As modern dining hubs in Kohinoor City, D-Ground, and Peoples Colony continue to flourish, local eateries are moving rapidly away from generic packaging to branded, Instagrammable containers that retain brand loyalty. Printzy bridges industrial quality with approachable minimum order sizes so Faisalabad businesses can scale without waste.",
    deliveryTime: "1 to 2 working days via regional logistics",
    logisticsDetails:
      "Close regional proximity ensures rapid 24-to-48-hour delivery from our production press to all commercial districts of Faisalabad via standard and express cargo networks.",
    localIndustries: [
      "Fast-food franchises & dynamic burger joints in D-Ground & Kohinoor",
      "Traditional sweets & festive confectionery makers across Faisalabad",
      "Textile, bedwear & apparel manufacturers requiring branded retail packaging",
      "High-traffic chai dhabas & tea cafes in commercial industrial hubs",
      "Home-bakers and cloud delivery operators in Peoples Colony & Madina Town",
    ],
    popularProducts: [
      {
        title: "Custom Food Boxes",
        slug: "custom-food-boxes",
        reason: "Sturdy burger cartons and loaded fries boxes for Faisalabad's active evening dining scene.",
      },
      {
        title: "Custom Pizza Boxes",
        slug: "custom-pizza-boxes",
        reason: "Rigid micro-flute pizza packaging for local pizzerias that keeps hot food crispy in transit.",
      },
      {
        title: "Printed Paper Bags",
        slug: "custom-paper-bags",
        reason: "Cost-effective kraft and white retail bags for textile shops, shoe boutiques, and bakeries.",
      },
      {
        title: "Custom Paper Cups",
        slug: "custom-paper-cups",
        reason: "Branded single and double-wall cups for tea bars and quick-service beverage counters.",
      },
    ],
    orderingSteps: [
      "Share your required product size and logo file with our packaging team on WhatsApp.",
      "Get a clear volume quote and free 3D digital mockup within 24 hours.",
      "Approve your digital proof before production starts.",
      "Your order is printed, inspected, and shipped directly to your Faisalabad address within 1–2 days of completion.",
    ],
    faqs: [
      {
        q: "How fast is shipping to Faisalabad?",
        a: "Due to our close regional proximity, delivery to Faisalabad is very fast—typically arriving within 1 to 2 working days after production completion.",
      },
      {
        q: "Do you supply retail packaging for Faisalabad textile and apparel brands?",
        a: "Yes. In addition to food packaging, we manufacture custom mailer boxes, product boxes, and branded shopping bags for textile and garment companies.",
      },
      {
        q: "What payment methods are supported for Faisalabad orders?",
        a: "We accept direct online bank transfers (IBFT) as well as Easypaisa and JazzCash with a standard [50% advance: confirm] to initiate production.",
      },
    ],
    isPrimaryHub: false,
  },
};
