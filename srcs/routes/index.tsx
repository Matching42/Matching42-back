import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import * as controller from '../controllers';
import { fail, login, granted, isAuth } from '../auth';
import swaggerSpec from '../swagger/option';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});
router.get('/login/42', login);
router.get('/login/redirect', granted);
router.get('/login/fail', fail);

router.use(isAuth);
router.get('/user', controller.getUser);
router.get('/user/:userId', controller.getUser);
router.post('/waitlist', controller.addUser2WaitList);
router.post('/addmember', controller.addUser2Team);
router.get('/team', controller.getTeam);
router.get('/team/:teamId', controller.getTeam);
router.patch('/team/:teamId', controller.updateTeamState);
router.post('/team/creategitrepo/:teamId', controller.createGitRepo);

export default router;
