import "reflect-metadata";
import { createConnection, getConnection } from "typeorm";
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
        const port = 3000; // process.env.TYBA_PORT;
        
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
        return app.listen(port);
        // return app;
    } catch (error) {
        console.error(error);
        return null;
    }

};

const close = async () => {
  await getConnection().close();
}

module.exports = {
    getApp: () => app,
    listen,
    close
}

// listen ();