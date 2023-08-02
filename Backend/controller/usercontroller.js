import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/Authmodel.js'

export default {
    LoginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email }).exec();
            console.log(user);
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
    }


}