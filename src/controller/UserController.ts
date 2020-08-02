import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { User } from '../entity/User';
import * as UserService from '../service/UserService';

const axios = require('axios');

export const saveUser = async (req: Request, res: Response) => {
    try {
        const userRepo = getManager().getRepository(User);
        const user = req.body;

        const token = UserService.auth(`${user.pass}${new Date}`);

        const newUser = userRepo.create({ ...user, user: user.user.toLowerCase(), token });
        const data = await userRepo.save(newUser) || 'User created';

        return res.status(200).json({ data });
    } catch (error) {
        console.error('USERS_saveUser:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {    
    try {
        const { user, password } = req.body;
        const userRepo = getManager().getRepository(User);
    
        const logged = await userRepo
          .createQueryBuilder("User")
          .where("User.user = :user AND User.pass = :password", { user: user.toLowerCase(), password })
          .getOne();
    
        if (!logged) throw new Error(`Credenciales incorrectas!`);
        return res.status(200).json({ user: logged.user, token: logged.token });
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return res.status(401).json({ error: true, message: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {    
    try {
        const { token } = req.headers;
        const userRepo = getManager().getRepository(User);
    
        const logged = await userRepo
          .createQueryBuilder("User")
          .where("User.token = :token", { token })
          .getOne();
        
        if (!logged) throw new Error(`Token incorrecto!`);

        const newToken = UserService.auth(`${new Date}`);
    
        const data = await userRepo
            .createQueryBuilder()
            .update(User)
            .set({ token: newToken })
            .where("id = :id", { id: logged.id })
            .execute();

        return res.status(200).json({ user: logged.user, token_expired: logged.token });
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return res.status(401).json({ error: true, message: error.message });
    }
};

export const getRestaurants = async (req: Request, res: Response) => {    
    try {
        const { lat, lon } = req.query;
        const { token } = req.headers;

        const authorized = await UserService.authorizedToken(token);

        if (!authorized) throw new Error(`No estás autorizado para hacer esta consulta.`);
        
        const response = await axios({
            url: `${process.env.RAPID_API}/restaurants/list-by-latlng?latitude=${lat}&longitude=${lon}`,
            method: 'get',
            headers: { 'x-rapidapi-host': process.env.RAPID_HOST, 'x-rapidapi-key': process.env.RAPID_KEY }
        });

        const restaurants = response.data.data.map(restaruant => {
            return {
                location_id: restaruant.location_id,
                name: restaruant.name,
                latitude: restaruant.latitude,
                longitude: restaruant.longitude,
                num_reviews: restaruant.num_reviews,
                timezone: restaruant.timezone,
                location_string: restaruant.location_string,
                photo: restaruant.photo,
                awards: restaruant.awards,
                price: restaruant.price,
                description: restaruant.description,
                web_url: restaruant.web_url
            };
        });


        return res.status(200).json({ restaurants });
    } catch (error) {
        console.error('USERS_getUsers:', error.message);
        return res.status(422).json({ error: true, message: error.message });
    }
};
