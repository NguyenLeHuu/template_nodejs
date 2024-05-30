
const STRIPE_SETTINGS_PROD = {
    currency: 'vnd',
    unit_amount: 10000,
    client_reference_id: '11111-111111-111111-1111',
    stripe_server: 'https://us-central1-unicon-apps.cloudfunctions.net/stripe',
    stripe_success_url: 'https://unicon-app-pay.web.app/success.html',
    stripe_cancel_url: 'https://unicon-app-pay.web.app/canceled.html',
    stripe_pk: 'pk_live_51MfMYJFT7i2QToFK5lF5FZjZkyCqzxHo7RT2dsBiGDxMPNKPKSLkawDCYmZZR0eg6QOaurkaN2jeaVWWSs8YFqzH0094iE53Dt',
    sk: 'this is private. we done not publish this'
}

// TEST
const STRIPE_SETTINGS = {
    currency: 'vnd',
    unit_amount: 10000,
    client_reference_id: '000000000000000000',
    stripe_server: 'http://localhost:3000',
    stripe_success_url: 'success.html',
    stripe_cancel_url: 'canceled.html',
    stripe_pk: 'pk_test_51PFIBzGCFOEiUw2fhze5xe5fTEVhOXW9D7DdwnjTTfXD4CIkpIkDnZMB7zpupgPfhg0uSfgygA1uB7e0scoF96Gu006h9baxGm',
    sk: 'this is private. we done not publish this'
}
