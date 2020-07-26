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


export const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userData = req.body;
        console.log(userData);
        const userRepo = getManager().getRepository(User);
        const user = await userRepo.findOne(userId);
        if (!user) throw new Error(`No existe ususario con id: ${userId}`);

        const data = await userRepo.update(userId, userData);
        return res.status(200).json({ data });
    } catch (error) {
        console.error('USER_addElectroToUser:', error.message);
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


export const getUserByName = async (userName) => {    
    try {
        console.log(userName);
        if (!userName) return `No reconozco el nombre ${userName} entre los usuarios habilitados para darme ordenes... Quisiera validar con tu cédula para saber si estas registrado. ¿Cual es tu número de cédula?`;
        const userRepo = getManager().getRepository(User);
        const user = await userRepo.createQueryBuilder()
            .select()
            .where('firstName = :firstName', { firstName: userName.toLowerCase() })
            .getMany();
        console.log({user});
        if(!user.length) return `No reconozco el nombre ${userName} entre los usuarios habilitados para darme ordenes... Quisiera validar con tu cédula para saber si estas registrado. ¿Cual es tu número de cédula?`;
        if (user.length > 1) return `Disculpame ${userName} tengo mas de un usuario con ese nombre, puedes indicarme tu número de cédula por favor...`;
        return `Hola ${userName} gracias por utilizarme, que puedo hacer por ti...`;
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return error.message;
    }
};

export const getUserByDocument = async (document) => {    
    try {        
        if (!document) return `No reconozco el documento numero: ${document} como documento de un usuario registrado, por favor habla con el administrador de la aplicación para que te registre, o intenta otra vez indicando tu apellido`;
        const userRepo = getManager().getRepository(User);
        const user = await userRepo.createQueryBuilder()
            .select()
            .where('document = :document', { document })
            .getMany();
        console.log({user});
        if(!user.length) return `No reconozco el documento numero: ${document} como documento de un usuario registrado, por favor habla con el administrador de la aplicación para que te registre, o intenta otra vez indicando tu apellido`
        return `Hola ${user[0].firstName} ${user[0].lastName}, perdóname no te reconocía... gracias por utilizarme, que puedo hacer por ti...`;
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return error.message;
    }
};
