import express from 'express'
import cors from 'cors'
import "dotenv/config"
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import { adminRouter } from './routes/adminRoute.js'


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


const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello World! yukti')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
