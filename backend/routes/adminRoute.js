import express from 'express'
import { addDoctor , adminDashboard, allDoctor, appointmentsAdmin, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authMiddleware.js';
import { changeAvailability } from '../controllers/doctorController.js';
import { cancelAppointment } from '../controllers/userController.js';

// creating router
const adminRouter = express.Router()


// endpoints
adminRouter.post('/add-doctor', authAdmin ,upload.single('image'), addDoctor)

adminRouter.post('/login', loginAdmin)
adminRouter.post("/all-doctors", authAdmin, allDoctor);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment)
adminRouter.get('/dashboard',authAdmin,adminDashboard)

export {
    adminRouter
}