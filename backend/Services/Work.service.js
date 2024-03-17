import * as Utils from '../Utils/index.js';
import workModel from '../Models/Work.model.js';

// chức năng danh sách công việc
export const getAllWork = async (id, data) => {
    try {
        const page = Number(data.page) || 1;
        const pageSize = Number(data.pageSize) || 5;

        // phân trang
        const skip = (page - 1) * pageSize;
        const limit = pageSize;

        // điều kiện tìm kiếm
        const conditions = { idUser: id };
        if (data.name) conditions.name = new RegExp(data.name, 'i');
        if (data.status) conditions.status = data.status;

        // tìm dữ liệu và đếm tổng số bản ghi
        const [dataa, total] = await Promise.all([
            workModel.find(conditions, { _id: 0 }).sort({ status: 1 }).skip(skip).limit(limit).lean(),
            workModel.countDocuments(conditions)
        ]);

        return Utils.success('Get data success', { data: dataa, total });
    } catch (error) {
        console.log("🚀 ~ getAllWork ~ error:", error)
        return Utils.error(error.message);
    }
};

// chức năng xem chi tiết công việc
export const getDetailWork = async (id, idUser) => {
    try {
        // kiểm tra các trường bắt buộc
        if (!id) {
            return Utils.error('Missing id', 400);
        }

        // tìm kiếm dữ liệu
        const data = await workModel.findOne({ idUser: idUser, id: id }, { _id: 0 }).lean();
        if (!data) {
            return Utils.error('Not found Work', 404);
        }

        return Utils.success('Get data success', { data });
    } catch (error) {
        return Utils.error(error.message);
    }
};

// tạo mới công việc
export const createNewWork = async (data, idUser) => {
    try {
        // kiểm tra các trường bắt buộc
        const checkMissing = Utils.checkMissing(data, ['name', 'time'])
        if (checkMissing.result === false) {
            return checkMissing;
        }

        // kiểm tra thời gian hợp lệ
        const checkTime = Utils.checkTime(data.time);
        if (checkTime.result === false) {
            return checkTime;
        }

        // lấy id 
        const id = await Utils.getMaxId(workModel, 'id');

        // lưu vào csdl
        const dataCreate = await workModel.create({ id, idUser: idUser, name: data.name, time: new Date(data.time).getTime(), status: 0 })

        return Utils.success('Create work success', { data: dataCreate });
    } catch (error) {
        console.log("🚀 ~ createNewWork ~ error:", error)
        return Utils.error(error.message);
    }
};

// sửa công việc
export const updateWork = async (data, idUser) => {
    try {
        // kiểm tra các trường bắt buộc
        const checkMissing = Utils.checkMissing(data, ['name', 'time', 'status'])
        if (checkMissing.result === false) {
            return checkMissing;
        }

        // kiểm tra thời gian hợp lệ
        const checkTime = Utils.checkTime(data.time);
        if (checkTime.result === false) {
            return checkTime;
        }
        
        // lưu vào csdl
        const dataUpdate = await workModel.findOneAndUpdate({ id: data.id, idUser }, { name: data.name, time: new Date(data.time).getTime(), status: data.status });

        // xử lý lỗi
        if (!dataUpdate) {
            return Utils.error('Not found Work', 404);
        }

        return Utils.success('Update work success', { data: dataUpdate });
    } catch (error) {
        console.log("🚀 ~ updateWork ~ error:", error)
        return Utils.error(error.message);
    }
};

// xoá công việc
export const deleteWork = async (id, idUser) => {
    try {
        // kiểm tra các trường bắt buộc
        if (!id) {
            return Utils.error('Missing id', 400);
        }

        // cập nhật csdl
        const dataDelete = await workModel.findOneAndDelete({ id, idUser });

        // xử lý lỗi
        if (!dataDelete) {
            return Utils.error('Not found Work', 404);
        }

        return Utils.success('Delete work success');
    } catch (error) {
        return Utils.error(error.message);
    }
};