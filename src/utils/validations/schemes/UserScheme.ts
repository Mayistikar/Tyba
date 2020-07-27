const Joi = require('@hapi/joi');

// Get user validations
const getUserByIdSchema = Joi.object({
  userId: Joi.number().required()
});

export const getUserById = [
  {
    property: 'params',
    schemas: [
      getUserByIdSchema
    ]
  }
]

// Create user validations
const createOneUserSchema = Joi.object({
  user: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  document: Joi.number().required(),
  address: Joi.string().allow('').optional(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.number(),
  city: Joi.string(),
  pass: Joi.string().min(8).required()
});

export const createOneUser = [
  {
    property: 'body',
    schemas: [
      createOneUserSchema
    ]
  }
]
