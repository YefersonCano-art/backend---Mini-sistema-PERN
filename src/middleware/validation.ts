import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateProduct = [
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),
  
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('Debe ser un número positivo'),
  
  body('availability')
    .isBoolean().withMessage('Debe ser true o false'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];