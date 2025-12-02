//Middlewares:
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//Token Access Creation:
module.exports.createAccessToken = (user) => {
  const data = {
    _id: user._id,
    username: user.username,
  };

  return jwt.sign(data, secret, {});
};

//Token Verification

module.exports.verify = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token === "undefined") {
    return res.send({ message: "Failed. No token provided" });
  } else {
    token = token.slice(7, token.length);

    jwt.verify(token, secret, function (error, decodedToken) {
      if (error) {
        return res.json({ message: error.message });
      } else {
        console.log("Decoded token", decodedToken);
        req.user = decodedToken;
        next();
      }
    });
  }
};
