// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-red-800 border-red-800
// bg-rose-100 border-rose-100

import { PRODUCTS_PRICES } from "@/config/products";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    label: "Red",
    value: "red",
    tw: "red-800",
  },
  {
    label: "Pink",
    value: "pink",
    tw: "rose-100",
  },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphonex",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
} as const;

export const MATERIALS = [
  {
    name: "material",
    options: [
      {
        label: "Silicone",
        value: "silicone",
        description: undefined,
        price: PRODUCTS_PRICES.material.silicone
      },
      {
        label: "Soft Polycarbonate",
        value: "Polycarbonate",
        description: "Scratch-resistant coating",
        price: PRODUCTS_PRICES.material.polycarbonate
      },
    ],
  },
] as const;

export const FINISHES = [
    {
      name: "finishe",
      options: [
        {
          label: "Smooth",
          value: "smooth",
          description: undefined,
          price: PRODUCTS_PRICES.finish.smooth
        },
        {
          label: "Textured",
          value: "textured",
          description: "Soft grippy texture",
          price: PRODUCTS_PRICES.finish.textured 
        },
      ],
    },
  ] as const;
