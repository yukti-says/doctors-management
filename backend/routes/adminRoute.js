import express from 'express'
import { addDoctor , loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

// creating router
const adminRouter = express.Router()


// endpoints
adminRouter.post('/add-doctor', upload.single('image'), addDoctor)

adminRouter.post('/login',loginAdmin)

export {
    adminRouter
}