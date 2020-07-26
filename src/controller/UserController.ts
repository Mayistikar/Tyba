import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/User';

export const getUsers = async (req: Request, res: Response) => {    
    try {
        const userRepo = getManager().getRepository(User);
        const users = await userRepo.find();
        return res.status(200).json({ data: users });
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};

export const getUser = async (req: Request, res: Response) => {    
    try {

        const { userId } = req.params;
        const userRepo = getManager().getRepository(User);
        const user = await userRepo.findOne( userId );
        return res.status(200).json({ user });
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};

export const saveUser = async (req: Request, res: Response) => {
    try {
        const userRepo = getManager().getRepository(User);
        const user = req.body;
        const newUser = userRepo.create( user );
        const data = await userRepo.save(newUser);
        return res.status(200).json({ data });
    } catch (error) {
        console.error('USERS_saveUser:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};

export const getCities = async (req: Request, res: Response) => {
    try {
        const cities = [
            'Bogotá',
            'Cali',
            'Pasto'
        ];
        return res.status(200).json({ data: cities });
    } catch (error) {
        console.error('USER_addElectroToUser:', error.message);
        return res.status(422).json({ error: true, message: error.message });        
    }
};
