import { getManager } from 'typeorm';
import { Transaction } from '../entity/Transaction';

export const saveTransaction = async (userId, endpoint, req) => {
  const transactionRepo = getManager().getRepository(Transaction);
  const transaction = transactionRepo.create({ userId, endpoint, request: JSON.stringify(req), createdAt: new Date });
  await transactionRepo.save(transaction);
};