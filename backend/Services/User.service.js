import * as Utils from '../Utils/index.js';
import userModel from '../Models/User.model.js';


// chức năng đăng kí tài khoản
export const register = async (data) => {
    try {
        // kiểm tra các trường bắt buộc
        const checkMissing = Utils.checkMissing(data, ['userName', 'password', 'rePassword']);
        if (checkMissing.result === false) {
            return checkMissing;
        }

        // kiểm tra sự tồn tại của tài khoản
        const checkUserNameExists = await userModel.findOne({ userName: data.userName }, { _id: 1 }).lean();
        if (checkUserNameExists) {
            return Utils.error("Account already exists", 409);
        }

        // kiểm tra trường mật khẩu
        if (data.password !== data.rePassword) {
            return Utils.error("Password and rePassowrd not match", 400);
        }

        // lấy id 
        const id = await Utils.getMaxId(userModel, 'id');

        // lưu vào csdl
        const user = await userModel.create({ id, userName: data.userName, password: Utils.createMd5(data.password) });

        // xoá password
        user.password = undefined;

        // tạo token
        const token = await Utils.createToken(user, '1d');

        // trả về response
        return Utils.success('Register account success', { token, user });

    } catch (error) {
        return Utils.error(error.message);
    }
}

// chức năng đăng nhập
export const login = async (data) => {
    try {
        // kiểm tra các trường bắt buộc
        const checkMissing = Utils.checkMissing(data, ['userName', 'password']);
        if (checkMissing.result === false) {
            return checkMissing;
        }

        // kiểm tra sự tồn tại của tài khoản
        const checkAccount = await userModel.findOne({ userName: data.userName }, { id: 1, userName: 1, password: 1 }).lean();
        if (!checkAccount) {
            return Utils.error("Not found Account", 404);
        }

        // kiểm tra mật khẩu
        const checkPass = await Utils.verifyPassword(data.password, checkAccount.password);
        if (checkPass === false) {
            return Utils.error("Incorrect password", 400);
        }

        // xoá password
        checkAccount.password = undefined;

        // tạo token
        const token = await Utils.createToken(checkAccount, '1d');

        // trả về response
        return Utils.success('Login success', { token, user: checkAccount });

    } catch (error) {
        return Utils.error(error.message);
    }
}