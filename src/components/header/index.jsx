
import './header.scss';
import logo from '../../assets/logo.png';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Button, Col } from 'antd';
import { LayoutTwoTone } from '@ant-design/icons';
import { callCategory } from '../../services/api';

const Header = () => {
    const [items, setItems] = useState([]);
    const [widthImage, setWidthImage] = useState(150);
    const [open, setOpen] = useState(false);

    const getData = async () => {
        let data = (await callCategory()).map(item => ({
            key: item.id,
            label: (
                <a className='item-cat'>
                    {item.name}
                </a>
            )
        }));
        setItems(data);
    };
    useEffect(() => {
        getData()
    }, [])

    const onClose = () => {
        setOpen(false);
    };

    const handleBoxCat = (e) => {
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
        <div className='header-area '>
            <div className='header-area__container cs'>
                <a className='logo'> <img src={logo} width={widthImage} /></a>

                <div className='nav_search'>
                    <Dropdown overlayClassName='container-category'
                        menu={{
                            items,
                        }}
                    >
                        <div className='nav_category  me-4'>
                            <a onClick={(e) => handleBoxCat(e)}>
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
