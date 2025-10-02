import express from ' express'
import { registerUser , loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile)

//todo  two middleware for passing the form data and another one to get the userid through headers
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

//~ api endpoint for booking the appointment
userRouter.post('/book-appointment', authUser, bookAppointment)

//* list appointment
userRouter.get('/appointments', authUser, listAppointment)

//todo cancel appointment
userRouter.post('/cancel-appointment',authUser,cancelAppointment)



export default userRouter