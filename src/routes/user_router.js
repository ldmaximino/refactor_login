//Third party imports
import { Router } from "express";
import passport from 'passport';

//Local imports
import * as controller from "../controllers/user_controller.js";

const router = Router();

router.post("/login", passport.authenticate('loginStrat'), controller.loginResponse);
router.post("/register", passport.authenticate('registerStrat'), controller.registerResponse);

router.get('/register-github', passport.authenticate('github', { scope: [ 'user: email' ] }));

router.get('/login-github', passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/login-github',
    passReqToCallback: true
}));

export default router;
