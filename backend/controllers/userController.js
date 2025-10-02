// * login auth functionality for user
import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import { doctorModel } from '../models/doctorModels.js'
import appointmentModel from '../models/appointmentsModel.js'

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

//? new controller to get the user's profile data.api to get userprofile data

const getProfile = async (req,res)=>{
    try {
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({
            success: true,
            userData
        })
    }
    catch (error)
    {
        console.log(error);
        res.json({
            success: false,
            message:error.message
        })
        
    }
}

//? controller to update the user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.imageFile
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({
                success: false,
                message:"Data Missing"
            })
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        })

        if (imageFile) {
            //* uploading imaging to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageUrl = imageUpload.secure_url

            //*  now saving this url in the users database
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }


        res.json({
            success: true,
            message:"profile updated"
        })
    }
    catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
        
    }
}

//~ Controller function to book the appointments
const bookAppointment = async (req, res) => {
    try {
        //* get the userId from authUser api and other two from body
        const { userId,docId ,slotDate, slotTime } = req.body
        
        //* getting doctor data using doctor id
        const docData = await doctorModel.findById(docId).select('-password')

        //* checking if doctor is available for booking
        if (!docData.available) {
            return res.json({
                success: false,
                message:'Doctor not available'
            })
        }

        //* but available then 
        let slots_booked = docData.slots_booked

        //* checking for slots availability on a particular date 

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({
                    success: false,
                    message:'Slot not available'
                })
            }
            else {
                slots_booked[slotDate] = []
                slots_booked[slotDate].push(slotTime)
            }
        }

        //* now getting the userdata
        const userData = await userModel.findById(userId).select('-password')

        //* now deleting slots_booked data from docData , bz we do not want history of slot booked while saving the data
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }

        //* saving these detail into appointmentModel
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //* saving new slots data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({
            success: true,
            message:"Appointment booked"
        })

    }
    catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
    }
}


//* controller that will list all the appointments that user has booked on my appointment page
const listAppointment = async (req,res) => {
    try {
        const { userId } = req.body
        //* variable to store all the appointment list of the user
        const appointments = await appointmentModel.find({ userId })
        
        res.json({
            success: true,
            appointments
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


export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment
}