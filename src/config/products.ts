import { text } from "stream/consumers";

export const BASE_PRICE = 1399;

export const PRODUCTS_PRICES = {
    material: {
        silicone: 0,
        polycarbonate: 3000,

    },
    finish: {
        smooth: 0,
        textured: 399,
    }
} as const;