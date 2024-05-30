import { updatetOne, deleteFunction, findAll, findOne, insertOne } from "../mongodb/app";
import { json } from "body-parser";
import cors from "cors";
const promiseRouter = require("express-promise-router");
let route = promiseRouter();

const STRIPE_SETTINGS = {
  currency: 'vnd',
  unit_amount: 10000,
  client_reference_id: '00000-00000-00000-00000',
  pricing_table_id: "prctbl_1PDPH8FT7i2QToFKiUzCarft",
  stripe_hook_key: 'whsec_73b1a5f6a81f89f3bd7519b35e201d9d314baf70862496e1a7566a0810aa38d6',
  stripe_server: 'http://localhost:3000',
  stripe_success_url: 'https://www.google.com/',
  stripe_cancel_url: 'https://www.google.com/',
  stripe_pk: 'pk_test_51PFIBzGCFOEiUw2fhze5xe5fTEVhOXW9D7DdwnjTTfXD4CIkpIkDnZMB7zpupgPfhg0uSfgygA1uB7e0scoF96Gu006h9baxGm',
  stripe_sk: 'sk_test_51PFIBzGCFOEiUw2fcIx24LDuPfTbMIYePm9A9jkKcTn8oade4Q9erxDuWz21rsxinoWUEvVAaF51sz4fMmY3jt0r00PGf7PmUT'
};


route.use(cors());
route.use(
  json({
    verify: function (req, res, buf) {
      var url = req.originalUrl;
      if (url.startsWith("/stripe") || url.startsWith("/webhook")) {
        req.rawBody = buf.toString();
      }
    },
  })
);

async function handlePaymentMethodAttached(paymentMethod) {
  await insertOne(paymentMethod);
}

route.post("/charge", async (req, res) => {
  //#swagger.tags = ['stripe']
  const { token } = req.body;
  try {
    const stripe = require("stripe")(STRIPE_SETTINGS.stripe_sk);
    const charge = await stripe.charges.create({
      amount: 1000, // Amount in cents
      currency: "usd",
      source: token,
      description: "Example charge",
    });
    res.json({ message: "Payment successful", charge });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

route.post('/create-checkout-session', async (req, res) => {
/* 
        #swagger.tags = ['stripe']
        */
 
  try {
    const body = req.body;
    const stripe = require("stripe")(STRIPE_SETTINGS.stripe_sk);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: body.line_items,
      mode: 'payment',
      client_reference_id: body.client_reference_id,
      success_url: STRIPE_SETTINGS.stripe_success_url,
      cancel_url: STRIPE_SETTINGS.stripe_cancel_url
    });
    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Failed to create checkout session. ${err.message}` });
  }
});

route.post("/webhook", async (request, response) => {
  //#swagger.tags = ['stripe']

  let event = request.body;
  switch (event.type) {
    case "checkout.session.completed":
      const checkout_complete = event.data.object;
      console.log(checkout_complete, `ckcplckcplckcplckcplckcplckcpl`);
      let [ma_hoa_don, uid] = checkout_complete.client_reference_id.split('--');
      console.log(ma_hoa_don, "-----------------ma_hoa_don");
      console.log(uid, "-----------------uid");
      // await updateOneOrder(ma_hoa_don, checkout_complete.payment_status)
      // if (checkout_complete.payment_status === "paid") {
      //   await deleteCart(uid)
      //   await insertOne({
      //     is_cart: true,
      //     uid: uid,
      //     san_pham: []
      //   })
      // }
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      await handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }

  response.send();
});

route.get("/subscribe/:project", async (request, response) => {
  //#swagger.tags = ['stripe']

  const project = request.params['project'];
  // https://billing.stripe.com/p/login/bIY3eseBJ3ONf6g4gg
  // client_reference_id="${project}"
  response.send(`
  <div style="width: 100%; text-align: center;margin-top: 2rem;">
    <h1>UniCon</h1>
  </div>

  <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
  <stripe-pricing-table pricing-table-id="${STRIPE_SETTINGS.pricing_table_id}"
  publishable-key="${STRIPE_SETTINGS.stripe_pk}">
    client_reference_id="${project}"
    </stripe-pricing-table>
  `);
});

module.exports = route;
