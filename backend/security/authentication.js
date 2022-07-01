const jwt = require("./jwt.js");
let currentUser = {};

async function authenticate (req, res, next){
  console.log("authentication is run");
  // We can obtain the session token from the requests cookies, which come with every request

  if (!req.cookies) {
    return res
      .status(401)
      .send("authentication failed. There are no cookies")
      .end();
  }

  const token = req.cookies.token;
  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res
      .status(401)
      .send("authentication failed. There are no token")
      .end();
  }

  var payload;
  try {
    payload = jwt.jwtModule.verify(token, jwt.jwtKey);
  } catch (e) {
    if (e instanceof jwt.jwtModule.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res
        .status(401)
        .send("authentication failed. error message:" + e.message)
        .end();
    }
    // otherwise, return a bad request error
    return res
      .status(400)
      .send("authentication failed. error message:" + e.message)
      .end();
  }

  console.log(
    "user authentication is successfull for this username:",
    payload.username
  );
  
  // req.currentUser = await UserClass.find({
  //   userName == payload.userName,
  // });

  next();
};

module.exports = { authenticate: authenticate, currentUser: currentUser };
