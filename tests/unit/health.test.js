// Test your health check route
// Requires multiple, 
// small tests to confirm that various aspects of our health check route work they way we expect


const request = require('supertest');

// 1 : Get our Express app object (we don't need the server part
const app = require('../../src/app');

// Get the version and author from our package.json
const {version, author} = require('../../package.json');


describe('/ health check', ()=>{
    // Test to check confirm healthy server
    test('should return HTTP 200 response', async ()=>{
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });
    // Test to confirm Cache-Control returns no-cache header
    test('should return Cache-Control: no-cache header', async ()=>{
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
    });

    test('should return status: ok in response', async ()=>{
        const res = await request(app).get('/');
        expect(res.body.status).toEqual('ok');
    } );

    test('should return correct version, githubUrl, and author in response', async () =>{
        const res = await request(app).get('/');
        expect(res.body.author).toEqual(author);
        expect(res.body.githubUrl.startsWith('https://github.com')).toBe(true);
        expect(res.body.version).toEqual(version);

    }
})


