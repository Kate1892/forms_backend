import { body } from 'express-validator'

export const loginValidation = [
  body('phoneNumber', 'минимальная длина 8 символов').isLength({ min: 8 }),
  body('password', 'минимальная длина 5 символов').isLength({ min: 5 }),
]

export const registerValidation = [
  body('phoneNumber', 'минимальная длина 8 символов').isLength({ min: 8 }),
  body('password', 'минимальная длина 5 символов').isLength({ min: 5 }),
  body('fullName', 'минимальная длина 3 символа').isLength({ min: 3 }),
  // body('avatarUrl', 'некорректный url').optional().isURL(),
]
