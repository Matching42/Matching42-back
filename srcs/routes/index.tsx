import { Router } from 'express';
import * as controller from '../controllers';
import { fail, login, granted, isAuth } from '../auth';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});
router.get('/login/42', login);
router.get('/login/redirect', granted);
router.get('/login/fail', fail);

router.use(isAuth);
router.patch('/team/:teamid', controller.updateTeamState);
router.get('/user', controller.getUser);
router.get('/user/:userId', controller.getUser);
router.post('/waitlist', controller.addUser2WaitList);
router.post('/addmember', controller.addUser2Team);


export default router;
