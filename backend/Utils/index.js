import crypto from 'crypto';
import jwt from 'jsonwebtoken';
// hàm check dữ liệu đầu vào tồn tại
export const checkMissing = (data, check) => {
    try {
        const arr = Object.keys(data);
        for (let i = 0; i < check.length; i++) {
            const element = check[i];
            if (!arr.includes(element) || !data[element]) {
                return error(`Missing data ${element}`, 400);
            }
        }
        return success();
    } catch (error) {
        return error('Error server');
    }
}

// hàm trả về thành công
export const success = (message = '', data = []) => {
    return { result: true, message, data };
};

// hàm lấy id lớn nhất
export const getMaxId = async (model, field) => {
    let maxId = await model.findOne({}, { [field]: 1, }).sort({ [field]: -1, }).limit(1).lean();
    if (maxId) {
        maxId = Number(maxId[`${field}`]) + 1;
    } else maxId = 1;
    return maxId;
};

// hàm trả về lỗi
export const error = (message, status = 500) => {
    return { result: false, message, code: status };
};

// hàm trả về response 
export const response = (res, response) => {
    if (response.result === false) {
        return res.status(response.code).json({ result: false, data: null, code: response.code, error: { message: response.message } });
    }
    return res.status(200).json({ result: true, message: response.messsage, data: response.data, error: null });
};

// hàm xác thực mật khẩu
export const verifyPassword = async (inputPassword, hashedPassword) => {
    const md5Hash = crypto.createHash('md5').update(inputPassword).digest('hex');
    return md5Hash === hashedPassword;
};

// hàm tạo mật khẩu md5
export const createMd5 = (password) => {
    return crypto.createHash('md5').update(password).digest('hex');
};

// hàm tạo token
export const createToken = async (data, time) => {
    return jwt.sign({ data }, process.env.NODE_SERCET, { expiresIn: time });
};

// hàm kiểm tra thời gian
export const checkTime = (time) => {
    try {
        const timeNow = new Date().getTime();
        const timeCheck = new Date(time).getTime();
        if (timeNow > timeCheck + 12 * 60 * 60 * 1000) {
            return error(`Invalid time`, 400);
        }
        return success();
    } catch (error) {
        return error('Invalid time', 400);
    }
}