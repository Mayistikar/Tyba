import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import { validation } from './utils/validations/index';
import { AppRoutes } from './routes';

const http = require('http');
const cors = require('cors');
const app = express();

const listen = async () => {
    try {
        app.use(cors());
        app.use(bodyParser.json());

        await createConnection();

        // const server = http.createServer(app);
        // Adding routes
        AppRoutes.forEach(route => {        
            app[route.method](route.path, (request: Request, response: Response, next: Function) => {
                const result = validation(route.validations, request);
                if (result.error) {
                    response.status(400).json(result);
                    next(result.message);
                } else {
                    route.action(request, response)
                        .then(() => { return next })
                        .catch(err => next(err));                
                }
            });
        });
    
        // run app
        const port = process.env.TYBA_PORT;
        app.listen(port);
    
        console.log(`
        .########.##....##.########.....###...
        ....##.....##..##..##.....##...##.##..
        ....##......####...##.....##..##...##.
        ....##.......##....########..##.....##
        ....##.......##....##.....##.#########
        ....##.......##....##.....##.##.....##
        ....##.......##....########..##.....## 
            `);
        console.log(`Express application is up and running on port ${port}`);
        return app;
    } catch (error) {
        console.error(error);
        return null;
    }

};

module.exports = {
    getApp: () => app,
    listen
}

// listen ();