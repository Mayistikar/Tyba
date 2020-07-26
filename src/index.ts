import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { AppRoutes } from './routes';

const http = require('http');
const cors = require('cors');

createConnection().then(async connection => {

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    const server = http.createServer(app);

    // Adding routes
    AppRoutes.forEach(route => {        
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            const result = validation(route.validations, request);
            if (result.error) {
                response.status(400).json(result);
                next(result.message);
            } else {
                route.action(request, response)
                    .then(() => { 
                        console.info(`\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n`);
                        console.info('Request:', request.url);
                        console.info('Route:', route.path); 
                        return next; 
                    })
                    .catch(err => next(err));
                
            }
        });
    });

    // run app
    const port = process.env.TYBA_PORT;
    server.listen(port);

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

}).catch(error => console.log(error));
