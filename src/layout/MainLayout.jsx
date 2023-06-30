
import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';

import { Outlet } from 'react-router-dom'
import './main.scss'
const MainLayout = () => {

    return (
        <div className="layout_app">
            <Header />
            <Outlet />
            <Footer />

        </div>
    )
}

export default MainLayout