require('dotenv').config();

const db = require('../../data/dbConfig');
const request = require('supertest');
const server = require('../server');



const registerTemplate = {
    username: 'adamSkoog',
    password: 'testing123!'
  
}

const loginTemplate = {
  username: 'adamSkoog',
  password: 'testing123!'
}

describe('Authentication Router', () => {
    describe('POST /register', () => {
     
  
      it('does not allow an empty request body', async () => {
        const registerObject = {};
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow registration without an username', async () => {
        const registerObject = { ...registerTemplate };
        delete registerObject.username;
        
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow registration without a password', async () => {
        const registerObject = { ...registerTemplate };
        delete registerObject.password;
        
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow empty password', async () => {
        const registerObject = { ...registerTemplate, password: '' };
        
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow an invalid password pattern', async () => {
        const registerObject = { ...registerTemplate, password: 'test' };
        
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerObject);
        
        expect(response.status).toBe(400);
      })
  
      it('returns a status code 201 and a user object with a token', async () => {
        const response = await request(server)
          .post('/api/auth/register')
          .send(registerTemplate);
  
        expect(response.status).toBe(201);
        expect('user' in response.body).toBe(true);
        expect('token' in response.body).toBe(true);
      })
    })
  
    describe('POST /login', () => {
     
  
      it('does not allow an empty request body', async () => {
        const loginObject = {};
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginObject);
        
        expect(response.status).toBe(400);
      })
  
  
      it('does not allow login without a password', async () => {
        const loginObject = { ...loginTemplate };
        delete loginObject.password;
        
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow empty password', async () => {
        const loginObject = { ...loginTemplate, password: '' };
        
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginObject);
        
        expect(response.status).toBe(400);
      })
  
      it('does not allow an invalid password pattern', async () => {
        const loginObject = { ...loginTemplate, password: 'test' };
        
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginObject);
        
        expect(response.status).toBe(400);
      })
  
      it('returns a status of 404 when the credentials don\'t exist in the db', async () => {
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginTemplate);
  
        expect(response.status).toBe(404);
      })
  
      it('returns a status code 200 and a user object with a token', async () => {
        await request(server)
          .post('/api/auth/register')
          .send(registerTemplate);
  
        const response = await request(server)
          .post('/api/auth/login')
          .send(loginTemplate);
        
        expect(response.status).toBe(200);
        expect('user' in response.body).toBe(true);
        expect('token' in response.body).toBe(true);
      })
    })
  })