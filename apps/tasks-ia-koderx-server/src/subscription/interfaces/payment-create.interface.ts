import Stripe from "stripe";

export class PaymentCreate{
    response: Stripe.Response<Stripe.Checkout.Session>
}