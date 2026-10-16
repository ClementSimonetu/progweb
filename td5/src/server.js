import express from 'express';
import connectDB from "./config/db.js";
import routes from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

process.loadEnvFile();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const app = express();
connectDB();
app.use(express.json());



const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        servers: [
            {
                url: `http://${host}:${port}/api`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Entrez votre token JWT au format : Bearer <votre_token>',
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
}

const openapiSpecification = swaggerJsDoc(options);

app.use('/api', routes);
app.use('/docs', serve, setup(openapiSpecification));

  app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`)
  });