import { useEffect, useState } from 'react';
import { Button, Modal, DatePicker } from 'antd';
import { GET, PUT } from '../../../functions';
import dayjs from 'dayjs';

const App = ({ isModalOpen, setIsModalOpen, setIsCallApi, id }) => {

    const [name, setName] = useState(null);
    const [time, setTime] = useState(null);
    const [status, setStatus] = useState(null);

    const handleOk = async () => {
        if (name == '' || time == '') {
            alert('Nhập đầy đủ thông tin')
        }
        const data = await PUT(`work/${id}`, {
            name: name,
            time: time.format("YYYY/MM/DD"),
            status: status
        })
        if (data.data) {
            alert('Sửa công việc thành công!');
            setIsCallApi((prev) => !prev)
        } else if (data.status == 400) {
            alert(data.message);
        } else {
            alert('Sửa công việc thất bại!')
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (id != 0) {
            const callApiDetail = async () => {
                const data = await GET(`work/${id}`);
                setName(data.data.name);
                setTime(dayjs(new Date(data.data.time).toISOString().slice(0, 10), 'YYYY-MM-DD'));
                setStatus(data.data.status)
            }
            callApiDetail();
        }
    }, [id])

    return (
        <>
            <Modal title="Sửa công việc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[<Button key="back" onClick={handleCancel}>
                Return
            </Button>,
            <Button key="submit" type="primary" className='bg-blue-500' onClick={handleOk}>
                Submit
            </Button>,]}>
                <div>
                    <label>Tên công việc <span className='text-red-600'>*</span> : </label>
                    <input className='border outline-none h-8 w-full p-2' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div className='mt-5'>
                    <label>Thời gian <span className='text-red-600'>*</span> : </label>
                    <DatePicker className='ml-1 h-8 w-40' value={time} onChange={(e) => setTime(e)} />
                </div>
            </Modal>
        </>
    );
};
export default App;