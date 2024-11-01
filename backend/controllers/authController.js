const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwtSecret, jwtExpiration } = require('../config/jwt');

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: jwtExpiration });

        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { login };
