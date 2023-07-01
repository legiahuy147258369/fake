
import './header.scss';
import logo from '../../assets/logo.png';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useMemo, useRef, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Button, Col } from 'antd';
import { LayoutTwoTone } from '@ant-design/icons';
const items = [
    {
        key: '1',
        label: (
            <a target="_blank" className='item-cat' rel="noopener noreferrer" >
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" className='item-cat' rel="noopener noreferrer" >
                1st menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" className='item-cat' rel="noopener noreferrer" >
                1st menu item
            </a>
        ),
    },
    {
        key: '4',
        label: (
            <a target="_blank" className='item-cat' rel="noopener noreferrer" >
                1st menu item
            </a>
        ),
    }
];
const Header = () => {

    const [widthImage, setWidthImage] = useState(150);
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    };

    const handdelBoxxCat = (e) => {
        if (window.innerWidth < 768) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }
    window.addEventListener("resize", function () {
        (window.innerWidth <= 1024) ? setWidthImage(120) : setWidthImage(150);
    });
    let last = 0;
    window.addEventListener('scroll', () => {
        let headers = document.querySelector('.header-area');
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        (scrollTop > last) ? headers.style.top = '-120px' : headers.style.top = '0px';
        last = scrollTop;
    });

    return (
        <div className='header-area'>
            <div className='header-area__container'>
                <a className='logo'> <img src={logo} width={widthImage} /></a>

                <div className='nav_search'>
                    <Dropdown overlayClassName='container-category'
                        menu={{
                            items,
                        }}
                    >
                        <div className='nav_category  me-4'>
                            <a onClick={(e) => handdelBoxxCat(e)}>
                                <Space>
                                    <BiCategoryAlt size={30} />
                                </Space>
                            </a>
                        </div>
                    </Dropdown>
                    <Input placeholder="Tìm kiếm sản phẩm" />
                    <span className='box-search'><AiOutlineSearch /></span>

                </div>
                <div className="nav-area-icon ps-2">
                    <div className="nav-icon  wish-list">
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
            <Drawer
                title={`Danh mục sản phẩm`}
                placement="left"
                size={'default'}
                onClose={onClose}
                open={open}
            >
                {items?.map((item, i) => {
                    return (
                        <Col key={`image-${i}`}>

                            <div className='item-cat'>{item.label}</div>
                        </Col>
                    );
                })}
            </Drawer>
        </div >

    )
}

export default Header
