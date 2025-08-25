import "reflect-metadata"; 
import express from "express";
import expressConfig from "./common/configs/express";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger/swagger.json';
import { errorHandlerMiddlware } from "./middlewares/errorHandlerMiddleware";
import { attachExpressReqAndRes } from "./middlewares/attachExpressReqAndRes";

export async function app() : Promise<express.Application> {
    const app: express.Application = express();
    // // if (!CONFIGS.IS_PRODUCTION) {
        app.use('/swagger/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    // // }
    app.use(attachExpressReqAndRes);
    await expressConfig(app);
    app.use(errorHandlerMiddlware as express.ErrorRequestHandler)
    return app;
}