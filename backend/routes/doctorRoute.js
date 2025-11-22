import express from 'express'
import { doctorList,loginDocotor } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login',loginDocotor)

export default doctorRouter