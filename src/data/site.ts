import { getEnvConfig } from "@/lib/env";

// Single source of truth for brand + contact details.
export const site = {
  name: "Printzy",
  tagline: "Custom Packaging",
  url: getEnvConfig().siteUrl,
  email: "sales.printzy@gmail.com",
  phoneDisplay: "0321 9091707",
  phoneIntl: "+92 321 9091707",
  phoneHref: "tel:+923219091707",
  whatsapp:
    "https://wa.me/923219091707?text=Hello%20Printzy%2C%20I%20would%20like%20a%20quote%20for%20custom%20packaging.",
  whatsappNumber: "923219091707",
  about:
    "Printzy designs and prints custom packaging for brands, food chains and retailers. Premium print, low minimums, delivered nationwide.",
  social: {
    // TODO: Replace with verified social media URLs before launch
    instagram: "https://instagram.com/printzy.pk",
    facebook: "https://facebook.com/printzy.pk",
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
