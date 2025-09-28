// * login auth functionality for user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
//? api for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({
                success: false,
                message:"Missing Details"
            })
        }

        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message:"Enter a Valid Email"
            })
        }

        if (password.length < 8) {
            return res.json({
                success: false,
                message:"Enter a Strong Password"
            })
        }

        //^ hashing password then saving it to db
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const userData = {
            name,email ,password:hashedPassword
        }


        const newUser = new userModel(userData)
        const user = await newUser.save()


        //^ generating token  and sent to user logged in
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);


        res.json({
            success: true,
            token
        })



    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error.message
        })
        
    }
}

//? api for user login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        //^ finding the user
        const user = await userModel.findOne({ email })
        
        if (!user) {
           return res.json({
                success: false,
                message:"User does not exist"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({
                success: true,
                token
            })
        }
        else {
            res.json({
                success: false,
                message:"Invalid Credentials"
            })
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error.message
        })
        
    }
}
export {
    registerUser,
    loginUser
}