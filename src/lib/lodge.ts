// Business facts for Abel's Lodge, shared across the site.
export const LODGE = {
  name: "Abel's Lodge",
  tagline: "Your privacy is our priority",
  phoneDisplay: "0999 28 63 64",
  phoneIntl: "+265999286364",
  whatsappNumber: "265999286364",
  address: "Area 25, Dzenza, Lilongwe, Malawi",
  tiktokHandle: "@abels.lodge",
  tiktokUrl: "https://www.tiktok.com/@abels.lodge",
  rating: "5.0",
  reviewCount: 3,
} as const;

export const TEL_LINK = `tel:${LODGE.phoneIntl}`;

export function whatsappLink(message = "Hello Abel's Lodge, I would like to book a room.") {
  return `https://wa.me/${LODGE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const MAP_QUERY = encodeURIComponent("Abel's Lodge, Area 25, Dzenza, Lilongwe, Malawi");
export const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export const NAV_LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#breakfast", label: "Breakfast" },
  { href: "#gallery", label: "Gallery" },
  { href: "#garden", label: "Garden" },
  { href: "#location", label: "Location" },
  { href: "#faq", label: "Questions" },
] as const;
