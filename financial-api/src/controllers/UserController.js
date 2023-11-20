/*import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_ADDRESS, 
    pass: process.env.EMAIL_PASSWORD 
  }
});

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user with the same username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(409).json({ error: 'Username already exists' });
      } else if (existingUser.email === email) {
        return res.status(409).json({ error: 'Email already in use' });
      }
    }

    // Generate a verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Create and save the new user with the verification token and expiry time
    const newUser = new User({
      username,
      email,
      password,
      verificationToken,
      verificationTokenExpires: Date.now() + 3600000 // 1 hour
    });
    await newUser.save();

    // Set up the email options
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS, // replace with your email
      to: newUser.email,
      subject: 'Email Verification',
      text: `Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://${req.headers.host}/verify-email?token=${verificationToken}\n\n
             If you did not request this, please ignore this email.\n`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });

    res.status(201).json({ message: 'User created successfully. Please check your email to verify your account.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createUser };*/

