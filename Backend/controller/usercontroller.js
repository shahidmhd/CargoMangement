import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/Authmodel.js'

export default {
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }).exec();
            if (user) {
                const validaPassword = await bcrypt.compare(req.body.password, user.password);
                if (!validaPassword) {
                    throw new Error("Invalid password !");
                } else {
                    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
                    res.json({
                        success: true,
                        message: "user logged in successfully",
                        data: token
                    })
                }
            } else {
                throw new Error("user not found !!");
            }
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
    },
    changepassword: async (req, res) => {
        try {
            console.log(req.body);
            const { currentPassword, newPassword, email } = req.body;
            console.log(currentPassword, newPassword);
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                console.log("hii");
                return res.json({ success: false, message: 'User not found' });
            }

            console.log("faa");

            // Compare the provided currentPassword with the hashed password in the database
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);

            if (!isValidPassword) {
                console.log("pass");
                return res.json({ success: false, message: 'Your password is incorrect' });
            }
            console.log("out");
            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            user.password = hashedNewPassword;
            await user.save();

            return res.status(200).json({ success: true, message: 'Password changed successfully' });
        } catch (err) {
            console.error('Error changing password:', err);
            return res.status(500).json({ success: false, message: 'An error occurred while changing the password' });
        }
    }


}