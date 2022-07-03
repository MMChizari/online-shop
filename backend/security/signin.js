const jwt = require("./jwt.js");
const mongodb = require("../mongodb.js");

async function signIn(req, res) {
  let result;
  await mongodb
    .check_user_exist("online-shop", "users", req.body)
    .then((res) => (result = res))
    .catch((err) => (result = err));
  console.log(result);
  if (result.code === 200) {
    const username = req.body.username;
    // Create a new token with the username in the payload
    // and which expires 300 seconds after issue
    const token = jwt.jwtModule.sign({ username }, jwt.jwtKey, {
      algorithm: "HS256",
      expiresIn: jwt.jwtExpirySeconds,
    });
    console.log("token:", token);

    // set the cookie as the token string, with a similar max age as the token
    // here, the max age is in milliseconds, so we multiply by 1000
    res.cookie("token", token, { maxAge: jwt.jwtExpirySeconds * 1000 });
    res.status(200).json({ message: "ok", token: token }).end();
  } else {
    res.status(400).json({ message: "error" });
  }
}

module.exports = signIn;
