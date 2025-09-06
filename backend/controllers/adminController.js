//& API for adding doctors
import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from "cloudinary"
import { doctorModel } from "../models/doctorModels.js"
import jwt from 'jsonwebtoken'
const addDoctor = async (req,res) => {
    try {
        const {
            name,
            email,
            password,
            speciality,
            degree,
            experience,
            about,
            fee,
            address,
        } = req.body;
        //* we will add these data in a form data format for which we will use a middleware->upload

        //&image file
        const imageFile = req.file;
        // test
        //    console.log({
        //      name,
        //      email,
        //      password,
        //      speciality,
        //      degree,
        //      experience,
        //      about,
        //      fees,
        //      address,
        //    imageFile});

        //& checking for all data to add doctor
        if (
            !name ||
            !email ||
            !password ||
            !speciality ||
            !degree ||
            !experience ||
            !about ||
            !fee ||
            !address ||
            !imageFile
           
        ) {  console.log({
          name,
          email,
          password,
          speciality,
          degree,
          experience,
          about,
          fee,
          address,
          imageFile,
        });
            return res.json({
                success: false,
                message: "Missing Details",
            });
        }



        //& validating email format with the help of validator package
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "invalid Email",
            });
        }

        //& validating password format with the help of validator package
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please Give a Strong Password",
            });
        }
    

        //& encrypting this password and saving in our database
        //?-> generating salt for hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //& now uploading image to cloudinary to get an image url

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "Image" })
        const imageURL = imageUpload.secure_url;

        //&now saving these data into our database
        const doctorData = {
            name,
            email,
            image: imageURL,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save();

        res.json({
            success: true,
            message:"doctor created successfully."

        })

       

    }


    catch (error) {
        console.log(error)
        res.json({
            success: false,
            message:error.message
        }
        )
    }
}


//? API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try {
        //& getting email id and password from req.body then we will match with our env variable if it matches then do further steps-
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password ===
            ADMIN_PASSWORD) {
            //& will generate a token
            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            res.json({
                success: true,
                token
            })
        }
        else {
            res.json({
                success: false,
                message:"Invalid credential"
            })
        }


        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error.message
        })
        
    }

}

export {
    addDoctor,
    loginAdmin
}