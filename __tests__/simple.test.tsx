import { expect, test, describe } from '@jest/globals';
import app from '../srcs/app';
import supertest from 'supertest';

describe('GET /', () => {
    test('status to be 200', async () => {
        const res = await supertest(app).get('/');
        expect(res.status).toBe(200);
    });
});
