import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import { adminRouter } from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'


// app config
const app = express()
connectDB();
connectCloudinary();

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//api endpoints
app.use('/api/admin', adminRouter);

//api endpoint for doctor
app.use('/api/doctor',doctorRouter)

//api for registering users
app.use('/api/user',userRouter)

const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World! yukti')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
