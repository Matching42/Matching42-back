import { Router } from 'express';
import dotenv from 'dotenv';
import * as controller from '../controllers';
import { fail, login, granted } from '../auth/controller.login';

const router = Router();
/*
    Set your router, but must check order of router
*/
import { isAuth } from '../auth/auth';

router.get('/login/42', login);
router.get('/login/redirect', granted);
router.get('/login/fail', fail);

router.patch('/team/:teamid', controller.updateTeamState);
router.get('/user', isAuth, controller.getUser);
router.get('/user/:userId', controller.getUser);
router.post('/waitlist', controller.addUser2WaitList);
router.post('/addmember', controller.addUser2Team);
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});

export default router;
