import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from '../utils/datauri.js';
import cloudinary from "../utils/cloudinary.js";
import { sendOTPEmail } from "../utils/email.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        
        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success: false,
                missingFields: {
                    fullname: !fullname,
                    email: !email,
                    phoneNumber: !phoneNumber,
                    password: !password,
                    role: !role
                }
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format", 
                success: false 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists", 
                success: false 
            });
        }

        // Handle file upload
        let profilePhoto = undefined;
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                if (!fileUri) {
                    console.error("Failed to create data URI from file");
                    // Continue registration without profile photo
                } else {
                    try {
                        if (!process.env.CLOUD_NAME || !process.env.API_KEY || !process.env.API_SECRET) {
                            console.error("Cloudinary configuration missing");
                            // Continue registration without profile photo
                        } else {
                            const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
                            profilePhoto = cloudinaryResponse.secure_url;
                        }
                    } catch (cloudinaryError) {
                        console.error("Cloudinary upload error:", cloudinaryError);
                        // Continue registration without profile photo
                    }
                }
            } catch (fileError) {
                console.error("File processing error:", fileError);
                // Continue registration without profile photo
            }
        }

        // Create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            fullName: fullname, 
            email, 
            phoneNumber, 
            password: hashedPassword, 
            role,
            profile: {
                profilePhoto: profilePhoto || ""
            }
        });

        return res.status(201).json({ 
            message: "User created successfully", 
            success: true,
            user: {
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ 
            message: "Registration failed: " + (error.message || "Internal server error"), 
            success: false 
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register first.", success: false });
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password", success: false });
        }
        if (role !== user.role) {
            return res.status(400).json({ message: "Invalid role", success: false });
        }
        const tokenData = {
            userId: user._id,
            role: user.role
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        const userData = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === 'production'
            })
            .json({ 
                message: "Login successful", 
                success: true,
                token: token,
                user: userData
            });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            message: "Login failed: " + (error.message || "Internal server error"), 
            success: false 
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({ message: "Logout successful", success: true });
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;
        let skillsArray = skills ? skills.split(",") : undefined;

        const userId = req.user.userId;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        if (!user.profile) {
            user.profile = {}; // Initialize profile if it doesn't exist
        }

        // Update basic fields if provided
        if(fullName) user.fullName = fullName;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skillsArray) user.profile.skills = skillsArray;
        
        // Only process file upload if a file was provided
        if(file) {
            const fileUri = getDataUri(file);
            if(fileUri) {
                try {
                    const CloudResponse = await cloudinary.uploader.upload(fileUri.content);
                    if(CloudResponse) {
                        user.profile.resume = CloudResponse.secure_url;
                        user.profile.resumeOriginalName = file.originalname;
                    }
                } catch (uploadError) {
                    console.error('File upload error:', uploadError);
                    return res.status(400).json({ 
                        message: "Error uploading file", 
                        success: false,
                        error: uploadError.message 
                    });
                }
            }
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }

        return res.status(200).json({ 
            message: "Profile updated successfully", 
            success: true, 
            user: updatedUser 
        });

    } catch (error) {
        console.error('Profile update error:', error);
        return res.status(500).json({ 
            message: "Error updating profile", 
            success: false,
            error: error.message 
        });
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const userData = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile || {}
        };

        return res.status(200).json({
            message: "Profile fetched successfully",
            success: true,
            user: userData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error fetching profile",
            success: false
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ 
                message: "Email is required", 
                success: false 
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                message: "User not found", 
                success: false 
            });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

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
                message: "Failed to send OTP email",
                success: false
            });
        }

        // Also log OTP to console for development
        console.log(`OTP for ${email}: ${otp}`);

        return res.status(200).json({
            message: "OTP sent successfully",
            success: true
        });

    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({
            message: "Failed to send OTP: " + (error.message || "Internal server error"),
            success: false
        });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Verify OTP
        if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({
                message: "No OTP request found",
                success: false
            });
        }

        if (user.otp.code !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                success: false
            });
        }

        if (new Date() > new Date(user.otp.expiresAt)) {
            return res.status(400).json({
                message: "OTP has expired",
                success: false
            });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        
        // Clear OTP
        user.otp = undefined;
        await user.save();

        return res.status(200).json({
            message: "Password reset successful",
            success: true
        });

    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({
            message: "Failed to reset password: " + (error.message || "Internal server error"),
            success: false
        });
    }
};
