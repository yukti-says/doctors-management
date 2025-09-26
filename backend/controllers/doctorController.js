import { doctorModel } from "../models/doctorModels";

const changeAvailability = async (req,res) => {
    try {
        //? get doctor id
        const { docId } = req.body;
        //? find the doctor using this id
        const docData = await doctorModel.findById(docId)
        //? now update the available if true make it false or vice versa
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({
            success: true,
            message:'Availability changed'
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


//? controller for getting all doctors for frontend
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-email', '-password']) //^ by adding {} will get all the doctors
        res.json({
            success: true,
            doctors
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
    changeAvailability,
    doctorList
}