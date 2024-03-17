import * as workService from '../Services/Work.service.js';
import * as Utils from '../Utils/index.js';

// lấy danh sách công việc
export const getAllWork = async (req, res) => {
    const idUser = req.idUser;
    const response = await workService.getAllWork(idUser, req.query);
    return Utils.response(res, response)
}

// lấy chi tiết công việc
export const getDetailWork = async (req, res) => {
    const idUser = req.idUser;
    const { id } = req.params;

    const response = await workService.getDetailWork(id, idUser);
    return Utils.response(res, response)
}

// tạo mới công việc
export const createNewWork = async (req, res) => {
    const idUser = req.idUser;
    const response = await workService.createNewWork(req.body, idUser);
    return Utils.response(res, response)
}

// sửa công việc
export const updateWork = async (req, res) => {
    const idUser = req.idUser;
    const { id } = req.params;
    const data = { id, ...req.body };

    const response = await workService.updateWork(data, idUser);
    return Utils.response(res, response)
}

// xoá công việc
export const deleteWork = async (req, res) => {
    const idUser = req.idUser;
    const { id } = req.params;

    const response = await workService.deleteWork(id, idUser);
    return Utils.response(res, response)
}