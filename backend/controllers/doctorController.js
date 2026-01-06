import { doctorModel } from "../models/doctorModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentsModel.js";

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


// get all the appointments of all specific doctors
const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId })
    res.json({
      success: true,
      appointments
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


// api for marking appointment completed for doctor panel
const appointmentComplete = async (req,res) => {
  try {
    const { docId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
      return res.json({
        success: true,
      
        message:"Appointment completed"
      })
    }
    else {
      return res.json({
        success: false,
        message:"Mark Failed"
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


// api to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,

        message: "Appointment cancelled",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation Failed",
      });
    }
  } catch (error) {
 console.log(error);
 res.json({
   success: false,
   message: error.message,
 });
  }
};


//* api to get dashboard data for api panel
const doctorDashboard = async (req, res) => {
  try {
    const {docId} = req.body
    const appointments = await appointmentModel.find({ docId })
    
    let earnings = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount
      }
    })

    let patients = []

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId)
      }
    })

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
      
    }

    res.json({
      success: true,
      dashData
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

//? getting the doctor profile for doctor panel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body
    const profileData = await doctorModel.findById(docId).select('-password')
    res.json({
      success: true,
      profileData
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


//? update the doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees,address, available } = req.body;
    await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
    
    res.json({
      success: true,
      message: "Profile Updated!"
      
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

export {
  changeAvailability, doctorList,
  loginDoctor, appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile
};
