import rateLimiter from "express-rate-limit";
const limit= rateLimiter({
  windowMs: 1 * 60 * 1000,   /// 1 MINUTE 
  // 3 choti maximum request garna payo 1 minute bhitra ma user le yo chai testing ko lagi yeti rakheko maile 
  max: 3,                     // limit each IP to 10 requests per window
  message: {
    error: {
      code: 429,
      message: "Too many requests, please try again later",
    },
  },
  standardHeaders: true,       
  legacyHeaders: false,       
});

export default limit;