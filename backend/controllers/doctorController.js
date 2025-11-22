import { doctorModel } from "../models/doctorModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailability = async (req, res) => {
  try {
    //? get doctor id
    const { docId } = req.body;
    //? find the doctor using this id
    const docData = await doctorModel.findById(docId);
    //? now update the available if true make it false or vice versa
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//? controller for getting all doctors for frontend
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-email", "-password"]); //^ by adding {} will get all the doctors
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};



// api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email })
    
    if (!doctor) {
      return res.json({
        success: false,
        message:"Invalid Credential"
      })
    }

    const isMatch = await bcrypt.compare(password, doctor.password)
    //* this variable will have true if the password matched or if not then it will have false
    if (isMatch) {
      // provide auth token
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      // generating response and sending it
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

  }
  catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}
export {
  changeAvailability, doctorList,
  loginDoctor
};
