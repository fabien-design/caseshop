import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
    try {
        const body = await req.text();
        const signature = headers().get("stripe-signature");

        if (!signature) {
            throw new Response("Invalid signature", { status: 400 });
        }

        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

        if (event.type === "checkout.session.completed") {
            if (!event.data.object.customer_details?.email) {
                throw new Error("Missing user email");
            }

            const session = event.data.object as Stripe.Checkout.Session;

            const { userId, orderId } = session.metadata || {
                userId: null,
                orderId: null,
            };

            if (!userId || !orderId) {
                throw new Error("Missing metadata");
            }

            const billingAddress = session.customer_details!.address;
            const shippingAddress = session.shipping_details!.address;

            // Save the order to the database
            await db.order.update({
                where: { id: orderId },
                data: {
                    isPaid: true,
                    shippingAddress: {
                        create: {
                            name: session.shipping_details!.name!,
                            street: shippingAddress!.line1!,
                            city: shippingAddress!.city!,
                            country: shippingAddress!.country!,
                            postalCode: shippingAddress!.postal_code,
                            state: shippingAddress!.state,
                            phoneNumber: session.shipping_details!.phone,
                        },
                    },
                    billingAddress: {
                        create: {
                            name: session.shipping_details!.name!,
                            street: billingAddress!.line1!,
                            city: billingAddress!.city!,
                            country: billingAddress!.country!,
                            postalCode: billingAddress!.postal_code,
                            state: billingAddress!.state,
                            phoneNumber: session.shipping_details!.phone,
                        },
                    },
                },
            });
        }

        return NextResponse.json({ result: event, ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "An error occurred", status: 500 });
    }
}
