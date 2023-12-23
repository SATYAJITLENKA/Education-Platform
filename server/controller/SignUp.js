const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const User = require("../model/loginModel.js");
const nodemailer = require("nodemailer");
const randomOtp = require("random-otp");

const saltRounds = 10;

const validateSignUpData = async (req, res) => {
  const { name, email, password, phone, age, city,address,gender, state, pincode } = req.body;

  if (name.trim().length === 0) {
    res.status(400).json({ message: "please enter a Name" });
    return false;
  }
  if (!isEmail(email)) {
    res.status(400).json({ message: "please enter a email" });
    return false;
  }
  if (password.trim().length === 0) {
    res.status(400).json({ message: "please enter a Password" });
    return false;
  } else if (password.trim().length <= 5) {
    res.status(400).json({ message: "Minimum password length is 6 character" });
    return false;
  }
  if (phone.trim().length < 10) {
    res
      .status(400)
      .json({ message: "Please enter a valid phone number (10 digits)" });
    return false;
  }

  if (age.trim().length === 0) {
    res.status(400).json({ message: "please enter age" });
    return false;
  }

  if (city.trim().length === 0) {
    res.status(400).json({ message: "please enter city" });
    return false;
  }

  if (state.trim().length === 0) {
    res.status(400).json({ message: "please enter state" });
    return false;
  }
  if (pincode.trim().length === 0) {
    res.status(400).json({ message: "please enter pincode" });
    return false;
  }

  const existingUser = await User.findOne({ email }).exec();
  if (existingUser) {
    res.status(400).json({ message: "Email already Registered" });
    return false;
  }

  return true;
};
const signup = async (req, res) => {
  const { name, email, password, phone, age, state, city, pincode, address,gender} = req.body;
  const isValid = await validateSignUpData(req, res);
  if (isValid) {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        age,
        state,
        city,
        pincode,
        address,
        gender
      });
      res.json({
        message: "Account created successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          age: user.age,
          state: user.state,
          city: user.city,
          pincode: user.pincode,
          address:user.address,
        gender:user.gender
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const getData = async (req, res) => {
  const data = await User.find();
  res.status(200).json({ message: "successfully get all the data", data });
};

const updateData = async (req, res) => {
  try {
    const { userId } = req.params;

    const { name, email, password, phone,address,gender, age, state, city, pincode } =
      req.body;

    const hashedPassword = password
      ? await bcrypt.hash(password, saltRounds)
      : undefined;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = hashedPassword || user.password;
    user.phone = phone || user.phone;
    user.age = age || user.age;
    user.state = state || user.state;
    user.city = city || user.city;
    user.pincode = pincode || user.pincode;
    user.address = address || user.address;
    user.gender = gender || user.gender;

    await user.save();

    res.status(200).json({
      message: "User data updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender:user.address,
        age: user.age,
        address:user.address,
        state: user.state,
        city: user.city,
        pincode: user.pincode,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//tryed to send OTP

function sendOTP(req, res) {
  // const { email } = req.query;
  const { email } = req.body;
  const otp = "1234";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "satya@gmail.com",
      pass: "satya@gmail",
    },
  });

  const mailOptions = {
    from: "mojagannath11@gmail.com",
    to: email,
    subject: "Your OTP",
    text: `Your OTP is the send mail`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending email", error });
    }

    res.status(200).json({ message: "OTP sent successfully", info });
  });
}

module.exports = { signup, getData, updateData, sendOTP };
