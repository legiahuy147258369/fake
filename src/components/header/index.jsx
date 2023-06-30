
import './header.scss';
import logo from '../../assets/logo.png';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useMemo, useRef, useState } from 'react';
import { Input } from 'antd';
const Header = () => {

    const [widthImage, setWidthImage] = useState(150)

    window.addEventListener("resize", function () {
        if (window.innerWidth <= 1024) {
            setWidthImage(120);
        } else {
            setWidthImage(150);
        }
    });
    return (
        <div className='header-area'>
            <div className='header-area__container'>
                <a className='logo'> <img src={logo} width={widthImage} /></a>

                <div className='nav_search'>
                    <div className='nav_category me-4'>
                        <BiCategoryAlt size={30} />
                    </div>
                    <Input placeholder="Tìm kiếm sản phẩm" />
                    <span className='box-search'><AiOutlineSearch /></span>
                </div>
                <div className="nav-area-icon">
                    <div className="nav-icon">
                        <AiOutlineHeart size={25} />
                        <span className='nav-cover-text'>Yêu thích</span>
                    </div>
                    <div className="nav-icon">
                        <AiOutlineShoppingCart size={25} />
                        <span className='nav-cover-text'>Giỏ hàng</span>
                    </div>
                    <div className="nav-icon"  >
                        <BiUser size={25} />
                        <span className='nav-cover-text'>Tài Khoản</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
