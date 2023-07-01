import React from 'react'
import { Breadcrumb } from 'antd';
import { BiHomeAlt2 } from 'react-icons/bi';
import { RiArrowRightSLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './bread.scss'
const BreadcrumbCom = () => {
    const location = useLocation();

    const them = location.pathname.split('/').filter((i) => i !== '')
        .map(item => {
            return {
                title: <Link to="/item">{item.toUpperCase()}</Link>,
                key: item,
            }
        });
    const breadcrumbItems = [
        {
            title: <> HOME </>,
            key: 'home',
        },
    ].concat(them);
    return (
        <div className='breadcrumb-area'>
            <Breadcrumb separator={<RiArrowRightSLine size={20} />} items={breadcrumbItems} />
        </div>

    )
}

export default BreadcrumbCom;