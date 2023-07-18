import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import { Layout, Menu, Button, Avatar, theme, Badge, Col, Row } from 'antd';
const { Header, Sider, Content } = Layout;
import './main.scss';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { BsFillBellFill } from 'react-icons/bs';
import { BiCategoryAlt } from 'react-icons/bi';
import { RiBillLine } from 'react-icons/ri';
import { LiaComment } from 'react-icons/lia';
import { FaUserFriends } from 'react-icons/fa';

import { AiFillSetting, AiOutlineBook } from 'react-icons/ai';
const LayoutAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const user = useSelector((state) => state.account.user);

    return (
        <Layout className='layout_admin_area'>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                background: '#FAFAFA',
            }}>
                <div className="demo-logo-vertical" />
                <Menu
                    className='custom-menu'
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={[
                        {
                            key: '0',
                            icon: <img src={logo} />,
                            label: null,
                        },
                        {
                            key: '2',
                            icon: null,
                            label: null,
                        },
                        {
                            key: '3',
                            icon: null,
                            label: null,
                        },
                        {
                            key: '4',
                            icon: <AiOutlineBook />,
                            label: 'Sản phẩm',
                        },
                        {
                            key: '5',
                            icon: <BiCategoryAlt />,
                            label: 'Thể loại',
                        },
                        {
                            key: '6',
                            icon: <RiBillLine />,
                            label: 'Đơn hàng',
                        },
                        {
                            key: '7',
                            icon: <LiaComment />,
                            label: 'Bình luận',
                        },
                        {
                            key: '8',
                            icon: <FaUserFriends />,
                            label: 'Khách hàng',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}

                >
                    <Row className='fl-between'>
                        <Col lg={18}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col lg={6} className='header-right'>
                            <span className='header-right__name'>{user.name}</span>
                            <Avatar src={user.avatar} size={40} />
                            <BsFillBellFill />
                            <AiFillSetting />


                        </Col>


                    </Row>

                    <div>

                    </div>


                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: '#F1F1F1',
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default LayoutAdmin;