import { Router } from 'express';

import users from './users.js';
import cards from './cards.js';

const rootRouter = Router();

rootRouter.use('/users', users);
rootRouter.use('/cards', cards);

export default rootRouter;
