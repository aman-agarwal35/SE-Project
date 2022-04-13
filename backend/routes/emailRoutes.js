import express from 'express'
import {sendEmail} from '../controllers/sendEmailController.js'
const router = express.Router()

router.route('/').post(sendEmail)

export default router