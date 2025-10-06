import express from "express";
import cors from "cors";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "https://boat-rental-stefanoconsulti.replit.app"
  ],
  credentials: true
}));
app.use((req, _res, next) => { console.log("[REQ]", req.method, req.path); next(); });

const stripeSecret = process.env.STRIPE_SECRET_KEY || "";
if (!stripeSecret) console.warn("[WARN] STRIPE_SECRET_KEY assente nei Secrets");
const stripe = new Stripe(stripeSecret);

// Health
app.get("/api/healthz", (_req, res) => res.json({ ok: true }));

// Handler riusabile
const createPaymentHandler = async (req, res) => {
  try {
    console.log("[PAY] handler HIT", req.method, req.path, req.body);
    const amount = Number(req.body?.amount);
    const currency = String(req.body?.currency || "eur");
    if (!Number.isFinite(amount) || amount <= 0) return res.status(400).json({ error: "bad_amount" });

    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      description: "SeaBoo experience",
    });

    return res.json({ client_secret: intent.client_secret, clientSecret: intent.client_secret });
  } catch (e) {
    console.error("[PAY][SERVER-ERR]", e?.message || e);
    return res.status(500).json({ error: "stripe_failed" });
  }
};

// Rotte API (accetta qualsiasi verbo)
app.all("/api/payments/create-payment-intent", createPaymentHandler);
app.all("/api/create-experience-payment", createPaymentHandler);

// Guard JSON per qualsiasi /api/* non trovato
app.use("/api", (req, res) => {
  console.log("[API-404]", req.method, req.originalUrl);
  res.status(404).json({ error: "api_not_found", url: req.originalUrl });
});

const port = Number(process.env.PORT || 5000);
app.listen(port, "0.0.0.0", () => console.log(`✅ API server on http://localhost:${port}`));
