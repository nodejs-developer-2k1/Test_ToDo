import { useState } from 'react';
import { Button, Modal, DatePicker } from 'antd';
import { POST } from '../../../functions';
const App = ({ isModalOpen, setIsModalOpen, setIsCallApi }) => {

    const [name, setName] = useState(null);
    const [time, setTime] = useState(null);

    const handleOk = async () => {
        if (!name || !time) {
            alert('Nhập đầy đủ thông tin')
        }
        const data = await POST('work', {
            name: name,
            time: time.format("YYYY/MM/DD")
        })
        if (data.data) {
            alert('Thêm công việc thành công!');
            setName('')
            setTime('')
            setIsCallApi((prev) => !prev)
        } else if (data.status == 400) {
            alert(data.message);
        } else {
            alert('Thêm công việc thất bại!')
        }
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal title="Thêm công việc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[<Button key="back" onClick={handleCancel}>
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