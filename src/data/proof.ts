/**
 * Authentic Social Proof & Verification Data
 * Strictly follows Rule 1 of SEO Guidelines: Never publish fabricated claims, ratings, or fake client reviews.
 * If these arrays are empty, the Proof component safely renders nothing.
 */

export interface ClientReview {
  clientName: string;
  businessName: string;
  city: string;
  reviewText: string;
  verifiedOrder?: string;
}

export interface ClientLogo {
  name: string;
  logoUrl: string;
}

export interface CaseStudy {
  brandName: string;
  city: string;
  challenge: string;
  solution: string;
  result: string;
}

// Populate with authentic verified reviews once supplied by business owner
export const clientReviews: ClientReview[] = [
  // Example real reviews once confirmed by owner will be placed here
];

export const clientLogos: ClientLogo[] = [
  // Verified brand logos placed here
];

export const caseStudies: CaseStudy[] = [
  // Verified mini case studies placed here
];
