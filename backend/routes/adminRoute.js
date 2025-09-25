import express from 'express'
import { addDoctor , allDoctor, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authMiddleware.js';

// creating router
const adminRouter = express.Router()


// endpoints
adminRouter.post('/add-doctor', authAdmin ,upload.single('image'), addDoctor)

adminRouter.post('/login', loginAdmin)
adminRouter.post("/all-doctors",authAdmin, allDoctor);

export {
    adminRouter
}