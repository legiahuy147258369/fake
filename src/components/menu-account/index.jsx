import React from 'react';
import { MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [

    getItem('Thông tin tài khoản', 'user', <></>, [
        getItem('Hồ sơ', 'info'),
        getItem('Thay đổi mật khẩu', 'pass')
    ]),
    {
        type: 'divider',
    },
    getItem('Lịch sử đơn hàng', 'history')
];
const MenuAccount = (props) => {
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log(e);
        navigate(`/user/${e.key}`)
    };
    return (
        <Menu
            onClick={onClick}
            style={{
                width: '100%',
                height: 500
            }}
            defaultSelectedKeys={[props.path]}
            defaultOpenKeys={['user']}
            mode="inline"
            items={items}
        />
    );
}

export default MenuAccount