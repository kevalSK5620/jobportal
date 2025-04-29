import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { sendOTPEmail } from '../utils/email.js';

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request password reset and send OTP
export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate OTP and set expiry
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Save OTP to user document
        user.otp = {
            code: otp,
            expiresAt: otpExpiry
        };
        await user.save();

        // Send OTP via email
        const emailSent = await sendOTPEmail(email, otp);
        if (!emailSent) {
            return res.status(500).json({
                success: false,
                message: 'Failed to send OTP email'
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'OTP sent successfully. Please check your email.' 
        });
    } catch (error) {
        console.error('Error in requestPasswordReset:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to process password reset request' 
        });
    }
};

// Verify OTP and reset password
export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        console.log('Reset password request received:', { email, otp: '***', hasPassword: !!newPassword });

        if (!email || !otp || !newPassword) {
            console.log('Missing required fields:', { 
                hasEmail: !!email, 
                hasOTP: !!otp, 
                hasPassword: !!newPassword 
            });
            return res.status(400).json({
                success: false,
                message: 'Email, OTP, and new password are required'
            });
        }

        // Convert OTP to string for comparison
        const otpString = otp.toString();

        // Find user and verify OTP
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if OTP exists and is valid
        if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
            console.log('No OTP found for user:', { email, hasOTP: !!user.otp });
            return res.status(400).json({
                success: false,
                message: 'No OTP request found. Please request a new OTP.'
            });
        }

        // Verify OTP
        if (user.otp.code !== otpString) {
            console.log('OTP mismatch:', {
                provided: otpString,
                stored: user.otp.code,
                type1: typeof otpString,
                type2: typeof user.otp.code
            });
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        // Check OTP expiry
        if (new Date() > new Date(user.otp.expiresAt)) {
            console.log('OTP expired:', {
                expiryTime: user.otp.expiresAt,
                currentTime: new Date()
            });
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('Password hashed successfully');

        // Update password and clear OTP
        user.password = hashedPassword;
        user.otp = undefined;
        await user.save();
        console.log('Password updated successfully for user:', email);

        res.status(200).json({ 
            success: true, 
            message: 'Password reset successfully. Please login with your new password.' 
        });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to reset password',
            error: error.message
        });
    }
}; 