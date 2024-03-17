import express from 'express';
import * as User from '../Controllers/User.controller.js'
const router = express.Router();

// đăng kí tài khoản
router.post('/register', User.register);

// đăng nhập tài khoản
router.post('/login', User.login);

export default router;