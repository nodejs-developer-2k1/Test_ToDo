import * as userService from '../Services/User.service.js';
import * as Utils from '../Utils/index.js';

// đăng kí tài khoản
export const register = async (req, res) => {
    const response = await userService.register(req.body);
    return Utils.response(res, response)
}

// đăng nhập
export const login = async (req, res) => {
    const response = await userService.login(req.body);
    return Utils.response(res, response)
}

