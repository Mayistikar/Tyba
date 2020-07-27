import * as UserController from '../controller/UserController';
import * as UserValidations from '../utils/validations/schemes/UserScheme';
export const userRoutes = [
  {
    path: '/user/create',
    method: 'post',
    validations: UserValidations.createOneUser,
    action: UserController.saveUser
  },
  {
    path: '/login',
    method: 'post',
    validations: [],
    action: UserController.login
  },
  {
    path: '/logout',
    method: 'post',
    validations: [],
    action: UserController.logout
  },
  {
    path: '/restaurants',
    method: 'get',
    validations: [],
    action: UserController.getRestaurants
  }
];