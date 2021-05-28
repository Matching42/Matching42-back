import { Router } from 'express';
import * as controller from '../controllers';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.get('/example', controller.exampleController);
router.patch('/team/:teamid', controller.updateTeam);
router.post('/addmember', controller.addMember);
router.get('/user', controller.getUser);
router.get('/user/:userId', controller.getUser);

export default router;
