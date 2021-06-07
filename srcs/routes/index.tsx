import { Router } from 'express';
import * as controller from '../controllers';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.patch('/team/:teamid', controller.updateTeamState);
router.get('/user', controller.getUser);
router.get('/user/:userId', controller.getUser);
router.post('/waitlist', controller.addUser2WaitList);
router.post('/addmember', controller.addUser2Team);
router.get('/team', controller.getTeam);
router.get('/team/:teamId', controller.getTeam);

export default router;
