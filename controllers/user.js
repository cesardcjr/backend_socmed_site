const User = require("../models/User");
const auth = require("../auth");
const bcrypt = require("bcrypt");

//User Registration
module.exports.registerUser = async (req, res) => {
  try {
    let newUser = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      age: req.body.age,
      contactNumber: req.body.contactNumber,
    });
    const newUserRegistered = await newUser.save();

    if (newUserRegistered) {
      return res.send("User is registered successfully!");
    } else {
      return res.send("User registration failed");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
};

module.exports.getUserByName = async (req, res) => {
  try {
    const { fullname } = req.body;
    const user = await User.find({
      fullname: { $regex: fullname, $options: "i" },
    });

    if (user && user.length !== 0) {
      res.json(user);
    } else {
      return res.json({ message: "Cannot find user" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports.userAuthentication = async (req, res) => {
  try {
    const currentUser = await User.findOne({ username: req.body.username });

    if (currentUser === null) {
      return res.json({ message: "Invalid username input" });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        currentUser.password
      );

      if (isPasswordCorrect) {
        return res.json({ access: auth.createAccessToken(currentUser) });
      } else {
        res.json({ message: "Incorrect password input" });
      }
    }
  } catch (error) {}
};
