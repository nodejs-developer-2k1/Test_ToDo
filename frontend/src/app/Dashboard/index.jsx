import { useMyContext } from '../../component/context/AppContext';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CreateWork from '../../component/model/CreateWork';
import UpdateWork from '../../component/model/UpdateWork';
import { DELETE, GET, PUT, getDate } from '../../../functions';
import { Pagination } from 'antd';
import { FaPencil } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Cookies from 'js-cookie';

export default function Dashboard() {
    const { isLogin, setIsLogin, user } = useMyContext();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isCallApi, setIsCallApi] = useState(false);
    const [data, setData] = useState(false);
    const [total, setTotal] = useState(0);
    const [key, setKey] = useState('');
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(2);
    const [id, setId] = useState(0);

    useEffect(() => {
        if (!isLogin) {
            return navigate("/");
        }
    }, [isLogin, navigate]);

    useEffect(() => {
        const callApi = async () => {
            let url = `work?page=${page}`;
            if (key != '') url += `&name=${key}`;
            if (status != 2) url += `&status=${status}`;
            const data = await GET(url);
            setData(data.data)
            setTotal(data.total)
        }
        callApi()
    }, [isCallApi, page, status, key]);

    const handleChangePage = async (page) => {
        setPage(page)
    }

    const handleClickSuccess = async (data) => {
        const response = await PUT(`work/${data.id}`, {
            name: data.name,
            time: getDate(data.time).split('/').reverse().join('/'),
            status: 1
        });
        if (response.data) {
            setIsCallApi((prev) => !prev)
            alert('Thành công!')
        }
    }

    const handleClickDelete = async (data) => {
        await DELETE(`work/${data.id}`);
        setIsCallApi((prev) => !prev)
        alert('Thành công!')

    }

    const handleClickLogout = () => {
        Cookies.remove('Todo');
        setIsLogin(false);
    }
    const columns = [
        {
            title: 'Công việc',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
        },
        {
            title: 'Thời gian',
            // dataIndex: 'time',
            // key: 'time',
            width: '20%',
            render: (data) => (
                <div>{getDate(data.time)}</div>
            )
        },
        {
            title: 'Trạng thái',
            render: (data) => (
                <div>{data.status == 0 ? <span className='text-red-500'>Chưa hoàn thành</span> : <span className='text-green-500'>Đã hoàn thành</span>}</div>
            ),
            width: '15%',
        },
        {
            title: 'Tuỳ chọn',
            width: '15%',
            render:
                (data) => (
                    <div className='flex gap-5 justify-center'>
                        <MdDone className='text-xl cursor-pointer' onClick={() => handleClickSuccess(data)}></MdDone>
                        <FaPencil className='text-xl cursor-pointer' onClick={() => { setIsModalUpdateOpen(true); setId(data.id) }}></FaPencil>
                        <MdDelete className='text-xl cursor-pointer' onClick={() => { handleClickDelete(data); }}></MdDelete>
                    </div>
                )

        },
    ];

    return (
        <div className='w-screen h-screen flex items-center  gap-10  flex-col'>
            <div className='flex flex-col items-end w-full mr-5 '>
                <div className='text-left'>Chào {user?.data.userName}</div>
                <div className='flex items-center gap-2'>
                    <IoIosLogOut className='text-red-600'></IoIosLogOut>
                    <div className='text-red-600 cursor-pointer' onClick={handleClickLogout}>Đăng xuất</div>
                </div>
            </div>
            <div className='text-3xl mt-10 font-bold'>Công việc cần làm</div>
            <div className='w-[60%]'>
                <div className='flex justify-between'>
                    <div className='self-start p-2 cursor-pointer mt-2 box-border rounded-xl bg-blue-400 w-max text-white' onClick={() => setIsModalOpen(true)}>Thêm mới</div>
                    <div className='mt-2 w-[40%]'>
                        <input className='border w-[50%] p-2 outline-none' placeholder='Nhập từ khoá tìm kiếm' onChange={(e) => setKey(e.target.value)}></input>
                        <select className='w-[50%] p-2 border' onChange={(e) => setStatus(e.target.value)}>
                            <option value={2}>Tất cả</option>
                            <option value={1}>Đã hoàn thành</option>
                            <option value={0}>Chưa hoàn thành</option>
                        </select>
                    </div>

                </div>
                <div className=' flex justify-center mt-5 flex-col items-center'>
                    <Table className='w-[100%]' bordered columns={columns}
                        dataSource={data} pagination={false} />
                    <Pagination defaultCurrent={1} pageSize={5} total={total} className='mt-2' onChange={handleChangePage} />;
                </div>
            </div>
            <CreateWork isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setIsCallApi={setIsCallApi}></CreateWork>
            <UpdateWork id={id} dataParent={data} isModalOpen={isModalUpdateOpen} setIsModalOpen={setIsModalUpdateOpen} setIsCallApi={setIsCallApi}></UpdateWork>
        </div>
    )
}