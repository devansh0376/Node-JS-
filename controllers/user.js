const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }

  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);
  // console.log("Session ID for login:", sessionId);
  // console.log("User logged in:", user);
  //JWT
  const token=setUser(user)
  res.cookie('token',token) // here we takes cookie from browser
  //return res.json({ token }); 
  return res.redirect("/");
}


module.exports = {
  handleUserSignup,
  handleUserLogin,
};
