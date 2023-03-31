const CryptoJs = require("crypto-js");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Auth Header Missing");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token Header Missing");
    }
    const tokenString = CryptoJs.AES.decrypt(token, process.env.CRYPTO_SECRET);
    const tokenData = tokenString.toString(CryptoJs.enc.Utf8);
    const { email, userId } = JSON.parse(tokenData);
    req.isAuth = true;
    req.userId = userId;
    req.email = email;
    return next();
  } catch (error) {
    console.log(error);
    req.isAuth = false;
    return next();
  }
};
