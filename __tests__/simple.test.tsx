import { expect, test, describe, beforeAll, afterAll } from '@jest/globals';
import createServer from '../srcs/app';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { connectDB } from '../srcs/config';
import mongoose from 'mongoose';

const app = createServer();

describe("test", () => {
    beforeAll(async () => {
        await connectDB(process.env.DB_URL ? process.env.DB_URL : '');
    })
    
    describe('GET /', () => {
        test('status to be 200', async () => {
            const res = await supertest(app).get('/');
            expect(res.status).toBe(200);
        });
    });
    
    describe('GET /user', () => {
        test('status to be 200', async () => {
            const res = await supertest(app).get('/user');
            expect(res.status).toBe(200);
        });
    });
    
    afterAll(async () => {
        mongoose.disconnect();
    })
})


