import request from 'supertest';
import app from '../../../src/app';

import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Link', () => {
  describe('Store', () => {
    beforeEach(async () => {
      await truncate();
    });

    it('must pass all data', async () => {
      const user = await factory.attrs('User');

      await request(app)
        .post('/new/users')
        .send(user);

      const login = await request(app)
        .post('/new/sessions')
        .send({ email: user.email, password: user.password });

      const response = await request(app)
        .post('/new/link')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send({});

      expect(response.status).toBe(400);
    });

    it('creating a link', async () => {
      const user = await factory.attrs('User');
      const link = await factory.attrs('Link');

      await request(app)
        .post('/new/users')
        .send(user);

      const login = await request(app)
        .post('/new/sessions')
        .send({ email: user.email, password: user.password });

      const response = await request(app)
        .post('/new/link')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(link);

      expect(response.status).toBe(200);
    });
  });
});
