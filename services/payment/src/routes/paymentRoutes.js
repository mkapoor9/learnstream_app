import express, { Router } from "express";
import bodyParser from "body-parser";
import { authContext } from "../middlewares/authContext.js";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { handleStripeWebhook } from "../webhooks/stripeWebhook.js";


const router = Router();

router.post("/checkout", authContext, createCheckoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
