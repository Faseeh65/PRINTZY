/**
 * Central Single Source of Truth for Business Facts & Verification State.
 *
 * NON-NEGOTIABLE RULE: Never invent business facts.
 * Every unknown fact is explicitly set to `null` with a TODO comment.
 * The UI consumes helpers from this file to degrade gracefully (hiding unverified claims
 * or displaying honest, transparent fallback copy).
 */

export interface ProductFact {
  slug: string;
  name: string;
  /** Null if not confirmed by owner. Fallback: contact for run size */
  moq: string | null;
  /** Null if not confirmed by owner. Fallback: confirm timing with the quote */
  leadTimeDays: string | null;
  /** Standard confirmed dimensions or null */
  sizes: string | null;
  /** Starting price per unit (PKR) or null */
  startingPrice: string | null;
  /** Material substrate details */
  materials: string | null;
}

export interface BusinessFacts {
  company: {
    legalName: string;
    brandName: string;
    ntn: string | null; // TODO: Owner to supply NTN if registered
    yearEstablished: number | null; // TODO: Owner to supply launch year
    founderName: string | null; // TODO: Owner to supply name & role
    founderRole: string | null;
  };
  location: {
    city: string;
    facilityAddress: string | null; // TODO: Street address
    googleMapsEmbedUrl: string | null; // TODO: Verified CID / Place link
    businessHours: {
      days: string;
      hours: string;
    };
  };
  contact: {
    phoneDisplay: string;
    phoneIntl: string;
    whatsappNumber: string;
    email: string;
    domainEmail: string | null; // TODO: Setup sales@printzy.pk or sales@printzy.site
    responseTime: string;
  };
  social: {
    instagram: string | null;
    facebook: string | null;
    linkedin: string | null;
  };
  commercialPolicies: {
    paymentTerms: {
      advancePercent: number | null; // TODO: Owner to confirm standard advance % (e.g. 50%)
      balanceMilestone: string | null; // TODO: e.g. "Upon dispatch"
      acceptedMethods: string[];
    };
    designSupport: {
      freeLogoVectorPrep: boolean;
      customDesignFee: string | null; // TODO: Owner to confirm if bespoke artwork has nominal fee
    };
    samplePolicy: {
      freeDigital3DMockup: boolean;
      swatchPackCourierFee: string | null; // TODO: Owner to confirm swatch fee
      printedProofFeeCreditedToBulk: boolean;
    };
    couriers: string[];
    exportTerms: {
      isExportAvailable: boolean;
      exportMoq: string | null; // TODO: Owner to confirm export container / pallet MOQ
      incoterms: string[];
      portsOfOrigin: string[];
    };
  };
  proofStats: {
    brandsServed: number | null; // Set to null until owner supplies verified count
    reprintRatePercent: number | null;
  };
  products: Record<string, ProductFact>;
}

export const businessFacts: BusinessFacts = {
  company: {
    legalName: "Printzy Packaging Pakistan",
    brandName: "Printzy",
    ntn: null, // TODO: Add verified NTN registration
    yearEstablished: null, // TODO: Add verified launch year
    founderName: "Faizan Ali",
    founderRole: "Owner",
  },
  location: {
    city: "Lahore",
    facilityAddress: null, // TODO: Owner to confirm factory/office street address
    googleMapsEmbedUrl: null, // TODO: Google Business Profile link
    businessHours: {
      days: "Monday – Saturday",
      hours: "9:00 AM – 6:00 PM PKT",
    },
  },
  contact: {
    phoneDisplay: "0321 9091707",
    phoneIntl: "+92 321 9091707",
    whatsappNumber: "923219091707",
    email: "sales.printzy@gmail.com",
    domainEmail: null, // TODO: Migrate to sales@printzy.site
    responseTime: "1–2 hours during business hours",
  },
  social: {
    instagram: null, // TODO: Link verified Instagram handle
    facebook: null, // TODO: Link verified Facebook page
    linkedin: null, // TODO: Link verified LinkedIn page
  },
  commercialPolicies: {
    paymentTerms: {
      advancePercent: 50,
      balanceMilestone: "Prior to shipment dispatch",
      acceptedMethods: ["Direct Online Bank Transfer (IBFT)", "JazzCash / Easypaisa on request"],
    },
    designSupport: {
      freeLogoVectorPrep: true,
      customDesignFee: null, // Free prepress vector setup; custom branding quoted on scope
    },
    samplePolicy: {
      freeDigital3DMockup: true,
      swatchPackCourierFee: null, // TODO: Nominal courier charges
      printedProofFeeCreditedToBulk: true,
    },
    couriers: ["TCS", "Leopards Courier", "Daewoo Cargo", "National Cargo Logistics"],
    exportTerms: {
      isExportAvailable: true,
      exportMoq: null, // TODO: Confirm export minimums
      incoterms: ["FOB Karachi Port", "CIF Destination Port", "EXW Lahore"],
      portsOfOrigin: ["Karachi Port (PKBQM / PKCT)", "Lahore Dry Port"],
    },
  },
  proofStats: {
    brandsServed: null, // Kept null to never display unverified "500+ brands" claim
    reprintRatePercent: null,
  },
  products: {
    "custom-paper-cups": {
      slug: "custom-paper-cups",
      name: "Custom Printed Paper Cups",
      moq: null, // TODO: Owner to confirm minimum order (e.g. 1,000 pcs)
      leadTimeDays: "7–10 working days after artwork approval",
      sizes: "4oz, 6oz, 8oz, 12oz, 16oz (Standard 80mm & 90mm rim diameters)",
      startingPrice: null,
      materials: "Single-wall & double-wall virgin food-grade paperboard with PE moisture barrier",
    },
    "custom-pizza-boxes": {
      slug: "custom-pizza-boxes",
      name: "Custom Printed Pizza Boxes",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "7–10 working days after artwork approval",
      sizes: '7", 9", 10", 11", 12", 14", 16" square & deep-dish formats',
      startingPrice: null,
      materials: "Corrugated E-flute (1.5mm) & B-flute (3.0mm) with kraft or bleached white liner",
    },
    "custom-food-boxes": {
      slug: "custom-food-boxes",
      name: "Custom Food & Burger Boxes",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "7–10 working days after artwork approval",
      sizes: "Burger clamshells, fries scoops, meal boxes, bakery & cake boxes",
      startingPrice: null,
      materials: "Greaseproof SBS virgin food-contact board, kraft paperboard",
    },
    "custom-takeaway-packaging": {
      slug: "custom-takeaway-packaging",
      name: "Custom Takeaway Packaging Sets",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "8–12 working days after artwork approval",
      sizes: "Integrated cup, box, bag, and napkin dining suites",
      startingPrice: null,
      materials: "Coordinated food-grade kraft and coated paperboard",
    },
    "custom-paper-bags": {
      slug: "custom-paper-bags",
      name: "Custom Printed Paper Bags",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "7–10 working days after artwork approval",
      sizes: "Small, Medium, Large, and Extra-Large grocery/takeaway formats",
      startingPrice: null,
      materials: "100–150 GSM brown kraft & bleached white paper with twisted paper handles",
    },
    "custom-napkins-tissues": {
      slug: "custom-napkins-tissues",
      name: "Custom Printed Napkins & Tissues",
      moq: null, // TODO: Owner to confirm rotary MOQ
      leadTimeDays: "7–10 working days after artwork approval",
      sizes: "Cocktail (25x25cm), Lunch (33x33cm), Dinner (40x40cm), Dispenser folds",
      startingPrice: null,
      materials: "100% pure virgin wood pulp, 1-ply / 2-ply / 3-ply with food-safe inks",
    },
    "cup-sleeves-stickers": {
      slug: "cup-sleeves-stickers",
      name: "Cup Sleeves & Packaging Stickers",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "5–7 working days after artwork approval",
      sizes: "Standard 8oz/12oz/16oz sleeves; custom die-cut vinyl and paper stickers",
      startingPrice: null,
      materials: "Insulating fluted kraft paperboard; matte/gloss water-resistant adhesive vinyl",
    },
    "custom-mailer-gift-boxes": {
      slug: "custom-mailer-gift-boxes",
      name: "Custom Corrugated Mailer & Gift Boxes",
      moq: null, // TODO: Owner to confirm MOQ
      leadTimeDays: "8–12 working days after artwork approval",
      sizes: "Custom dimensions manufactured to exact product specs (e.g. 9x6x3\", 12x9x4\")",
      startingPrice: null,
      materials: "High-density E-flute corrugated board with locking front tuck tabs",
    },
  },
};

/**
 * Builds a single, properly URL-encoded WhatsApp click URL.
 * Strictly guarantees exactly ONE `?text=` query parameter (fixes double ?text bug).
 */
export function buildWhatsAppUrl(message?: string): string {
  const number = businessFacts.contact.whatsappNumber;
  const baseUrl = `https://wa.me/${number}`;
  const defaultMsg = "Hello Printzy, I would like a quote for custom packaging.";
  const finalMsg = message?.trim() || defaultMsg;
  return `${baseUrl}?text=${encodeURIComponent(finalMsg)}`;
}

/**
 * Returns user-facing MOQ copy.
 * If verified in config, returns the number (e.g. "500 pcs").
 * If unconfirmed (null), returns honest fallback copy without leaking raw [confirm] placeholders.
 */
export function getProductMoqDisplay(slug: string): string {
  const fact = businessFacts.products[slug];
  if (fact?.moq) {
    return fact.moq;
  }
  return "MOQ depends on the product and design. Share your quantity on WhatsApp and we will advise on the available run size.";
}

/**
 * Returns user-facing Lead Time copy.
 */
export function getProductLeadTimeDisplay(slug: string): string {
  const fact = businessFacts.products[slug];
  if (fact?.leadTimeDays) {
    return fact.leadTimeDays;
  }
  return "Production timing depends on the product and order details. Contact us to confirm the schedule.";
}

/**
 * Returns user-facing Sizes copy.
 */
export function getProductSizesDisplay(slug: string): string {
  const fact = businessFacts.products[slug];
  if (fact?.sizes) {
    return fact.sizes;
  }
  return "Custom sizes and standard industry dimensions available upon request";
}

