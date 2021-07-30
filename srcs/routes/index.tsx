import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import * as controller from '../controllers';
import { fail, login, granted } from '../auth';
import swaggerSpec from '../swagger/option';

const router = Router();
/*
    Set your router, but must check order of router
*/
router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.get('/', async (req, res) => {
    res.json({ data: 'data' });
});
router.get('/login/42', login);
router.get('/login/redirect', granted);
router.get('/login/fail', fail);

//router.use(isAuth);
router.get('/user', controller.getUser);
router.get('/user/:userID', controller.getUser);
router.get('/waitlist', controller.getWaitlist);
router.post('/waitlist', controller.addUser2WaitList);
router.delete('/waitlist/:userID', controller.removeUser2WaitList);
router.post('/addmember', controller.addUser2Team);
router.get('/team', controller.getTeam);
router.get('/team/:teamID', controller.getTeam);
router.patch('/team/:teamID', controller.updateTeam);
router.patch('/team/tag/:teamID', controller.updateTeamTag);
router.post('/team/creategitrepo/:teamID', controller.createGitRepo);
router.post('/team/invitetorepo/:teamID/:userID?', controller.inviteToRepo);

export default router;
