const crypto = require('crypto');
const User = require('../models/UserModel');
const OTP = require('../models/OtpModel');


const generateOTP = () => {
  // Use crypto for secure random number generation
  const buffer = crypto.randomBytes(3); // 3 bytes = 24 bits
  const number = buffer.readUIntBE(0, 3);
  // Ensure 6 digits by taking modulo and adding offset if needed
  return String(number % 900000 + 100000);
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        error: true, 
        message: "Email is required" 
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Hash OTP before saving
    const hashedOTP = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    // Save OTP to database
    await OTP.create({
      email,
      otp: hashedOTP,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
    });

    // In production, send email with OTP
    // For demo, we'll just return it
    return res.status(200).json({
      error: false,
      message: "OTP sent successfully",
      otp // Remove this in production
    });

  } catch (error) {
    return res.status(500).json({ 
      error: true, 
      message: "Server error", 
      details: error.message 
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        error: true, 
        message: "Email and OTP are required" 
      });
    }

    // Hash received OTP for comparison
    const hashedOTP = crypto
      .createHash('sha256')
      .update(otp)
      .digest('hex');

    // Find latest valid OTP
    const otpRecord = await OTP.findOne({
      email,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ 
        error: true, 
        message: "OTP expired or not found" 
      });
    }

    if (otpRecord.otp !== hashedOTP) {
      return res.status(400).json({ 
        error: true, 
        message: "Invalid OTP" 
      });
    }

    // Mark OTP as used
    otpRecord.used = true;
    await otpRecord.save();

    return res.status(200).json({
      error: false,
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({ 
      error: true, 
      message: "Server error", 
      details: error.message 
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};