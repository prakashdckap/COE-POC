import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";

const product = {
  name: "Adidas Love Unites Shirt",
  price: "$140",
  rating: 3.9,
  reviewCount: 512,
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      id: 1,
      imageSrc:
        "https://cdn.shopify.com/s/files/1/0584/5863/6486/products/26_1120x.png?v=1629685835",
      imageAlt: "Back of women's Basic Tee in black.",
      primary: true,
    },
    {
      id: 2,
      imageSrc:
        "https://cdn.shopify.com/s/files/1/0584/5863/6486/products/27_1120x.png?v=1629685835",
      imageAlt: "Side profile of women's Basic Tee in black.",
      primary: false,
    },
    {
      id: 3,
      imageSrc:
        "https://cdn.shopify.com/s/files/1/0584/5863/6486/products/28_1120x.png?v=1629685835",
      imageAlt: "Front of women's Basic Tee in black.",
      primary: false,
    },
  ],
  colors: [
    { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
    { name: "Heather Grey", bgColor: "bg-gray-400", selectedColor: "ring-gray-400" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: false },
  ],
  description1:
    "The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.",
  description2:
    "Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.",
  details: [
    "Only the best materials",
    "Ethically and locally made",
    "Pre-washed and pre-shrunk",
    "Machine wash cold with similar colors",
  ],
  policies: [
    { name: "International delivery", icon: GlobeIcon, description: "Get your order in 2 years" },
    { name: "Loyalty rewards", icon: CurrencyDollarIcon, description: "Don't look at other tees" },
  ],
};

export default product;
