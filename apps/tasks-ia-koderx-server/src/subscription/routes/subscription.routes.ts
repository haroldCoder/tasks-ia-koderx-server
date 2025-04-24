export const version = 'v1';
const path = "subscription";

export const routes_subscription = {
    create_payment: `${path}/create-payment`,
    verify_payment: `${path}/verify-payment/:email`,
    update_subscription_user: `${path}/update-subscription-user/:email`,
}