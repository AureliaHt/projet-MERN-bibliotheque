const rateLimit = require('express-rate-limit');

const loginAccountLimiter = rateLimit({
    max: 5,
    windowMs: 15 * 60 * 1000,
    message:"Too many request made from this IP, please try again in 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
});


module.exports = {loginAccountLimiter,};