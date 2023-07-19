import React from 'react'
import BreadcrumbCom from '../../components/breadcrumb'
import { Col, Row } from 'antd'
import MenuAccount from '../../components/menu-account'
import { useLocation } from 'react-router-dom';
import Info from './info'
import History from './history'
import Pass from './ChangePass'
import './account.scss'
const AccountUser = () => {
    const { pathname } = useLocation();
    const path = pathname.split("/")[2] || 'info';
    return (
        <>
            <BreadcrumbCom />
            <div className='account-area'>
                <div className=' row' >
                    <div className=' col-left' ><MenuAccount path={path} /> </div>
                    <div className=' col-right'>
                        {path === 'info' && <Info />}
                        {path === 'history' && <History />}
                        {path === 'pass' && <Pass />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountUser