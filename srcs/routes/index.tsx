import { Router } from 'express';
import dotenv from 'dotenv';
import * as controller from '../controllers';
import { use, serializeUser, deserializeUser, authenticate } from 'passport';
import ensureLoggedIn from 'connect-ensure-login';
import { Strategy as FortyTwoStrategy } from 'passport-42';

dotenv.config();

const router = Router();

/*
    Set your router, but must check order of router
*/

use(
    new FortyTwoStrategy(
        {
            clientID: process.env.FT_CLIENT_ID,
            clientSecret: process.env.FT_CLIENT_SECRET,
            callbackURL: process.env.RETURN_URL,
            passReqToCallback: true,
        },
        (req, accessToken, refreshToken, profile, done) => {
            req.session.accessToken = accessToken;
            req.session.refreshToken = refreshToken;
            console.log('succeed!');
            return done(null, profile.username);
        }
    )
);
serializeUser((user, done) => done(null, user));
deserializeUser((user: any, done) => done(null, user));

router.get('/', ensureLoggedIn.ensureLoggedIn('/login'), (req, res) => {
    res.send(req.user);
});
router.get('/login', authenticate('42'));
router.get('/login/return', authenticate('42', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.patch('/team/:teamid', controller.updateTeamState);
router.get('/user', controller.getUser);
router.get('/user/:userId', controller.getUser);
router.post('/waitlist', controller.addUser2WaitList);
router.post('/addmember', controller.addUser2Team);
router.get('/', (req, res) => {
    res.json({ data: 'data' });
});

export default router;
