const request = require('supertest');
const app = require('../../src/app');


// test 404 handler 
describe('error 404 check', ()=>{
    test('Should return HTTP 404 response', async ()=>{
        const res = await request(app).get('/does-not-exist');
        expect(res.statusCode).toBe(404);
    });
})