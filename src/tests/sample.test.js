const request = require('supertest')
const server = require('../server');

const listen = server.listen;
const close = server.close;
let app;

describe('Jest Configuration Works fine test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})

describe('Post Endpoints', () => {
  afterAll(async (done) => {
    await app.close();
    await close();
    done()
  })

  it('should create a new user', async () => {
    app = await listen();
    const res = await request(app)
      .post('/user/create')
      .send({
        user: "TestUser",
        firstName: "Anderson",
        lastName: "Rodriguez",
        document: 1019053578,
        address: "Calle 44 #19 - 38",
        email: "andersonrodriguezce@gmail.com",
        phone: 3118030925,
        city: "Bogota",
        pass: "12345678"
      })
    expect(res.statusCode).toEqual(200);
    app.close();
  })
})