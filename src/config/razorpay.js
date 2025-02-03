import Razorpay from "razorpay";

const razorpay = new Razorpay({
  api_id: process.env.RAZORPAY_ID,
  api_secret: process.env.RAZORPAY_SECRET,
});

export default razorpay;
