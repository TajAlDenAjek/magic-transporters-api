import express from 'express';
import magicMoverRouter from './magicMoverRouter';
import magicItemRouter from './magicItemRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../docs/swagger';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Magic Transporters API",
            version: "1.0.0",
            description: "API for managing Magic Movers and Items",
        },
        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Development server",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};






const router = express.Router();

router.use('/magicMover', magicMoverRouter)
router.use('/magicItem', magicItemRouter)
router.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {}, options));



export default router;