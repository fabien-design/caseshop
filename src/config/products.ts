import { text } from "stream/consumers";

export const BASE_PRICE = 13.99;

export const PRODUCTS_PRICES = {
    material: {
        silicone: 0,
        polycarbonate: 30,

    },
    finish: {
        smooth: 0,
        textured: 3.99,
    }
} as const;