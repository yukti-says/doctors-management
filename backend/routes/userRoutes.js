import express from ' express'
import { registerUser , loginUser, getProfile, updateProfile, bookAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';


const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile)

//todo  two middleware for passing the form data and another one to get the userid through headers
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)

//~ api endpoint for booking the appointment
userRouter.post('/book-appointment',authUser,bookAppointment)



export default userRouter