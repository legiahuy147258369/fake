import React from 'react'
import { Breadcrumb } from 'antd';
import { BiHomeAlt2 } from 'react-icons/bi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './bread.scss'
import { initRoute } from '../../useRoter';

const BreadcrumbCom = () => {
    const { pathname } = useLocation();
    let parts = pathname.split("/");
    let currentPath = "/" + parts[1];

    const them = (initRoute[0].children.filter(item => item.key === currentPath)).map(item => {
        return {
            title: <Link to={''}>{item.cap}</Link>,
            key: item.key,
        }
    });

    const breadcrumbItems = [
        {
            title: <Link to='/'> Trang chủ </Link>,
            key: 'home',
        }
    ].concat(them)
    return (
        <div className='breadcrumb-area'>
            <Breadcrumb separator={<RiArrowRightSLine size={20} />} items={breadcrumbItems} />
        </div>
    );
};

export default BreadcrumbCom;