"use server";

import { BASE_PRICE, PRODUCTS_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({
    configId,
}: {
    configId: string;
}) => {
    const configuration = await db.configuration.findUnique({
        where: { id: configId },
    });

    if (!configuration) {
        throw new Error("Configuration not found");
    }

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        throw new Error("You must be logged in to create an order");
    }

    const { finish, material } = configuration;

    let price = BASE_PRICE;
    if (material === "polycarbonate")
        price += PRODUCTS_PRICES.material.polycarbonate;
    if (finish === "textured") price += PRODUCTS_PRICES.finish.textured;

    let order: Order | undefined = undefined;

    const existingOrder = await db.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configId,
        },
    });

    if (existingOrder) {
        order = existingOrder;
    } else {
        order = await db.order.create({
            data: {
                userId: user.id,
                configurationId: configId,
                amount: price / 100,
            },
        });
    }

    const product = await stripe.products.create({
        name: "Custom iPhone Case",
        images: [configuration.imgUrl],
        default_price_data: {
            currency: "USD",
            unit_amount: price,
        },
    });

    const stripeSession = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/configure/preview?id=${configId}`,
        payment_method_types: ["card", "paypal"],
        mode: "payment",
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "GB", "FR", "DE"],
        },
        metadata: {
            userId: user.id,
            orderId: order.id,
        },
        line_items: [{ price: product.default_price as string, quantity: 1 }],
    });

    return { url: stripeSession.url };
};
