const { OAuth2Client } = require("google-auth-library");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  let token = jwt.sign({ id: user._id }, process.env.SECRET, {
    expiresIn: "3d",
  });
  if (!token) {
    throw new Error("Can't create token");
  }
  return token;
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please, fill email field" });
  }
  if (!password) {
    return res.status(400).json({ error: "Please, fill password field" });
  }
  if (!name) {
    return res.status(400).json({ error: "Please, fill name field" });
  }
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "This email is not avaliable" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      isGoogleAccount: false,
    });

    let token = createToken(user);
    return res.status(200).json({
      email: user.email,
      name: user.name,
      _id: user._id,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Please, fill email field" });
  }
  if (!password) {
    return res.status(400).json({ error: "Please, fill password field" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user with this email" });
    }
    if (user.isGoogleAccount) {
      return res.status(404).json({ error: "No user with this email" });
    }
    let hashPassword = user.password;
    let isMatch = await bcrypt.compare(password, hashPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Password is Wrong" });
    }
    let token = createToken(user);
    return res.status(200).json({
      email: user.email,
      name: user.name,
      _id: user._id,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signWithGoogle = async (req, res) => {
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENTID,
      process.env.CLIENTSECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    let googleAccount = jwt.decode(tokens.id_token);
    let user = await User.findOne({ email: googleAccount.email });
    if (!user) {
      user = await User.create({
        name: googleAccount.name,
        email: googleAccount.email,
        isGoogleAccount: true,
      });
    }
    let token = createToken(user);
    res.status(200).json({
      email: user.email,
      name: user.name,
      _id: user._id,
      token,
      picture: googleAccount.picture,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signWithGoogle,
  signin,
  signup,
};
