import { SmileOutlined } from '@ant-design/icons';
import {  notification } from 'antd';
import { useEffect } from 'react';
import { useMyContext } from '../context/AppContext';
const App = () => {
    const [api, contextHolder] = notification.useNotification();
    const { contentNotifi, SetContentNotifi } = useMyContext()

    useEffect(() => {
        if (contentNotifi != '') {
            const openNotification = () => {
                api.open({
                    message: 'Todo thông báo!',
                    description: `${contentNotifi}`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            };
            openNotification();
        }
        return () => SetContentNotifi('');
    }, [api, contentNotifi]);
    return (
        <>
            {contextHolder}
        </>
    );
};
export default App;