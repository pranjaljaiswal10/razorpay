import express from "express";
import {
  createOrderId,
  // paymentWebook,
  verifyPayment,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment/create", createOrderId);
// router.post("/payment/webhook", paymentWebook);
paymentRouter.post("/payment/verify", verifyPayment);

export {paymentRouter}