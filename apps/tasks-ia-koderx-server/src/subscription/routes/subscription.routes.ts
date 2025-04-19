import { verify } from "crypto";

export const version = 'v1';
const path = "subscription";

export const routes_subscription = {
    create_payment: `${version}/${path}/create-payment`,
    verify_payment: `${version}/${path}/verify-payment/:email`,
    update_subscription_user: `${version}/${path}/update-subscription-user/:email`,
}