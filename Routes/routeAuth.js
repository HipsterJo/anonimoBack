import { Router } from "express";
import AuthPostController from "../controllers/AuthPostController.js"
import {body} from "express-validator"
import authMiddleware from "../middleware/auth-middleware.js";
import checkRole from "../middleware/checkRole-middleware.js";

const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    AuthPostController.registration)
router.post('/login', AuthPostController.login)
router.post('/logout', AuthPostController.logout)
router.get('/activate/:link', AuthPostController.activate)
router.get('/refresh', AuthPostController.refresh)
router.get('/users', authMiddleware, checkRole(['ADMIN']), AuthPostController.getUsers)

export default router;