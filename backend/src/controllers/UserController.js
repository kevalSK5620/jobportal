const User = require('../models/UserModel')
const bcrypt = require('bcrypt')

const userSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, gender, contactNum, stateId,cityId,status, password, confirmPassword } = req.body;

        if (!firstName || !lastName || !email || !gender || !contactNum ||!stateId||!cityId|| !status || !password || !confirmPassword) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: true, message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            gender,
            contactNum,
            stateId,
            cityId,
            status,
            password: hashedPassword,
            confirmPassword: hashedPassword,
        });

        await newUser.save();


        return res.status(201).json({
            error: false,
            message: "Signup successful",

        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error", details: error.message });
    }
};


const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ error: true, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ error: true, message: "Invalid email" });
    }

    // Ensure that createPassword is defined
    const storedPassword = user.password;

    if (!storedPassword) {
        return res.json({ error: true, message: "No password found in database" });
    }

    const match = await bcrypt.compare(password, storedPassword);

    if (!match) {
        return res.json({ error: true, message: "Invalid password" });
    }


    return res.status(200).json({
        error: false,
        message: "Login successful",

    });
};

module.exports = {
    userLogin,
    userSignup
}