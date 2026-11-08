/**
 * Shop facts for the draft. To add a real photo later:
 * 1. Put the file in public/photos/
 * 2. Set `src` on that slot, for example "/photos/storefront.jpg"
 * Leave `src` unset until the photograph is ready.
 */

export const shop = {
  name: "NYC Leather Repair",
  proprietor: "Jorge Bacuilima",
  street: "205 West 57th Street",
  cityLine: "New York, NY",
  between: "Between 7th Avenue and Broadway",
  landmark: "Near Carnegie Hall",
  phoneDisplay: "212-265-2108",
  phoneHref: "tel:+12122652108",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=205+West+57th+Street%2C+New+York%2C+NY",
} as const;

export const services = [
  "Shoe repair & restoration",
  "Resoling",
  "Heel replacement",
  "Cleaning & polishing",
  "Dyeing & stretching",
  "Handbag & luggage repair",
  "Leather care",
] as const;

export type ShopPhoto = {
  id: string;
  caption: string;
  alt: string;
  src?: string;
};

export const photos: ShopPhoto[] = [
  {
    id: "storefront",
    caption: "Storefront",
    alt: "NYC Leather Repair storefront at 205 West 57th Street",
  },
  {
    id: "workshop",
    caption: "Workshop",
    alt: "Workshop at NYC Leather Repair",
  },
  {
    id: "bench",
    caption: "At the bench",
    alt: "Workbench at NYC Leather Repair",
  },
];
