import * as UserController from '../controller/UserController';
import * as UserValidations from '../utils/validations/schemes/UserScheme';
export const userRoutes = [
  {
    path: '/user/all',
    method: 'get',
    validations: [],
    action: UserController.getUsers
  },
  {
    path: '/user/:userId',
    method: 'get',
    validations: UserValidations.getUserById,
    action: UserController.getUser
  },
  {
    path: '/user/create',
    method: 'post',
    validations: UserValidations.createOneUser,
    action: UserController.saveUser
  },

  // Other list
  {
    path: '/city/all',
    method: 'get',
    validations: [],
    action: UserController.getCities
  }
];