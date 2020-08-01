import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { Transaction } from '../entity/Transaction';


export const getTransactions = async (req: Request, res: Response) => {    
    try {
        const transactionRepo = getManager().getRepository(Transaction);
        const transactions = await transactionRepo.find();
        return res.status(200).json({ transactions });
    } catch (error) {
        console.error('Transaction_getTransactions:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};