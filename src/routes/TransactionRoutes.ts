import * as TransactionController from '../controller/TransactionController';
export const transactionRoutes = [
  {
    path: '/transactions',
    method: 'get',
    validations: [],
    action: TransactionController.getTransactions
  }
];