import { Router } from 'express';
import * as controller from '../controllers';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.get('/example', controller.exampleController);

router.patch('/team/:teamid', controller.updateTeam);

export default router;
