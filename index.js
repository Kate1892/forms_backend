import express from 'express'
import multer from 'multer'
import cors from 'cors'

import mongoose from 'mongoose'

import {
  registerValidation,
  loginValidation,
} from './validations/validation.js'

import User from './models/User.js'
import { checkAuth, handleValidationErrors } from './utils/index.js'
import { UserController } from './controllers/index.js'

mongoose
  .connect(
    'mongodb+srv://admin:vkp8elwc@cluster0.oqdlymr.mongodb.net/forms_?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB ok'))
  .catch(err => console.log('DB error ', err))

const app = express()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

app.use(express.json())

app.use(cors())

app.use('/uploads', express.static('uploads'))

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)

app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)

app.get('/auth/me', checkAuth, UserController.getMe)

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  })
})

app.listen(4000, err => {
  if (err) {
    return console.log(err)
  }
})