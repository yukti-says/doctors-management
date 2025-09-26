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
            success: true,
            message:error.message
        })
        
    }
}

export {
    changeAvailability
}