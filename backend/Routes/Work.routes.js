import express from 'express';
import * as Work from '../Controllers/Work.controller.js';
import { checkToken } from '../Middleware/index.js';
const router = express.Router();

// lấy danh sách công việc
router.get('/', [checkToken], Work.getAllWork);

// lấy chi tiết công việc
router.get('/:id', [checkToken], Work.getDetailWork);

// tạo mới công việc
router.post('/', [checkToken], Work.createNewWork);

// sửa công việc
router.put('/:id', [checkToken], Work.updateWork);

// xoá công việc
router.delete('/:id', [checkToken], Work.deleteWork);

export default router;