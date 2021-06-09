import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Matching42 API with Swagger',
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [{ url: process.env.HOST }],
    },
    apis: [path.join(__dirname, './schema/*.tsx'), path.join(__dirname, './controller/*.tsx')],
};

export default swaggerJsdoc(options);
