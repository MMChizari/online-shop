const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

module.exports = {
  jwtModule: jwt,
  jwtKey: jwtKey,
  jwtExpirySeconds: jwtExpirySeconds,
};
