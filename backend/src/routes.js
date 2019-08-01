import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import LinkController from './app/controllers/LinkController';
import AccesseController from './app/controllers/AccesseController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/:link', LinkController.show);

routes.post('/new/users', UserController.store);
routes.post('/new/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/edit/users', UserController.update);

routes.post('/new/link', LinkController.store);
routes.get('/all/link', LinkController.index);

routes.get('/:link_id/accesses', AccesseController.show);

export default routes;
