import express from "express";
import {
  createOrderId,
  paymentWebook,
  verifyPayment,
} from "../controllers/payment.controller";

const router = express.Router();

router.post("/payment/create", createOrderId);
router.post("/payment/webhook", paymentWebook);
router.post("/payment/verify", verifyPayment);
