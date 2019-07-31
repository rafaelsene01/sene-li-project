import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import LinkController from './app/controllers/LinkController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World' }));

routes.post('/new/users', UserController.store);
routes.post('/new/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/edit/users', UserController.update);

routes.post('/new/link', LinkController.store);

export default routes;
