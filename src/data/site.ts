import { getEnvConfig } from "@/lib/env";
import { buildWhatsAppUrl } from "@/config/business-facts";

// Single source of truth for brand + contact details.
export const site = {
  name: "Printzy",
  tagline: "Custom Packaging",
  url: getEnvConfig().siteUrl,
  email: "sales.printzy@gmail.com",
  phoneDisplay: "0321 9091707",
  phoneIntl: "+92 321 9091707",
  phoneHref: "tel:+923219091707",
  whatsapp: buildWhatsAppUrl(),
  whatsappNumber: "923219091707",
  about:
    "Printzy works with businesses in Pakistan on custom printed packaging, including cups, boxes, bags, and napkins.",
  social: {
    instagram: null,
    facebook: null,
  },
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/blog", label: "Guides" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
