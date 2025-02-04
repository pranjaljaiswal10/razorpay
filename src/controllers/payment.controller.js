import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";
import razorpayInstance from "../config/razorpay.js";
import { Payment } from "../model/payment.model.js";

const createOrderId = async (req, res) => {
  try {
    const order = await razorpayInstance.orders.create({
      amount: 200,
      currency: "INR",
    });
    const payment = new Payment.create({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });
    res.status(200).json({ ...payment, key: process.env.RAZORPAY_ID });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
};

// const paymentWebook = async (req, res) => {
//     try {        
//         const webhookSignature = req.get("X-Razorpay-Signature");
      
//         const verifyWebhook = validateWebhookSignature(
//           req.body,
//           webhookSignature,
//           process.env.RAZORPAY_WEBHOOK_SECRET
//         );
      
//         if (verifyWebhook) {
//           const paymentDetail = req.body.payload.entity;
//           const payment = await Payment.findOne({ paymentId: paymentDetail.order_id });
//           payment.status = paymentDetail.status;
//           return res.status(201).send("valid webhooksignature");
//         }
//         res.status(400).send("invalidwebhooksignature");
//     } catch (error) {
//       res.status(500).json("") 
//     }
// };

const verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const paymentVerify = validatePaymentVerification({
    order_id: orderId,
    payment_id: paymentId,
    signature,
    secret: process.env.RAZORPAY_SECRET,
  });

  if (paymentVerify) {
    const payment = await Payment.findOne({ orderId });
    payment.paymentId = paymentId;
    payment.signature = signature;
    const savedPayment = await payment.save();
    res.send( "payment successful");
  }
};

export { createOrderId, verifyPayment };
