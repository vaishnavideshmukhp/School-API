import { body, query } from 'express-validator';

export const addSchoolValidators = [
  body('name').isString().trim().isLength({ min: 1, max: 255 }).withMessage('name is required (1-255 chars)'),
  body('address').isString().trim().isLength({ min: 1, max: 255 }).withMessage('address is required (1-255 chars)'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('latitude must be a float in [-90, 90]'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('longitude must be a float in [-180, 180]'),
];

export const listSchoolsValidators = [
  query('lat').isFloat({ min: -90, max: 90 }).withMessage('lat must be a float in [-90, 90]'),
  query('lng').isFloat({ min: -180, max: 180 }).withMessage('lng must be a float in [-180, 180]'),
];
