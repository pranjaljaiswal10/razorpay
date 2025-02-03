import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: [String],
      required: true,
    },
    paymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { timeseries: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);
