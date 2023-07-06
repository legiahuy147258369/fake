
import './header.scss';
import logo from '../../assets/logo.png';
import { BiCategoryAlt, BiUser } from 'react-icons/bi';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Input, Dropdown, Space, Drawer, Button, Col, Avatar, Menu, message } from 'antd';
import { LayoutTwoTone, UserOutlined } from '@ant-design/icons';
import { callCategory, callLogout } from '../../services/api';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import useQueryConfig from '../../hooks/useQueryConfig';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const [widthImage, setWidthImage] = useState(150);
    const [open, setOpen] = useState(false);
    const queryConfig = useQueryConfig();

    const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
    const user = useSelector((state) => state.account.user);
    const cart = useSelector((state) => state.cart.cart);

    const getData = async () => {
        let data = (await callCategory()).map(item => ({
            key: item.id,
            label: (<Link className='item-cat' to={{
                pathname: '/shop', search: createSearchParams({
                    ...queryConfig,
                    category: item.id
                }).toString()
            }}>
                {item.name}
            </Link>)
        }));
        setItems(data);
        console.log(data);
    };
    const handleLogout = async () => {
        const res = await callLogout();
        console.log(res);
        if (res) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/');
        }
    };
    useEffect(() => {
        getData()
    }, [])
    const itemsAccount = [
        {
            label: (
                <label>
                    Quản lý tài khoản
                </label>
            ),
            key: 'account',
        },
        {
            label: (
                <label onClick={() => navigate('/history')}>
                    Lịch sử mua hàng
                </label>
            ),
            key: 'history',
        },
        {
            label: (
                <label onClick={() => handleLogout()}>
                    Đăng xuất
                </label>
            ),
            key: 'logout',
        },
    ];
    if (user?.role === 1) {
        itemsAccount.unshift({
            label: (
                <label
                    onClick={() => {
                        navigate('/admin');
                    }}
                >
                    Trang Quản Trị
                </label>
            ),
            key: 'admin',
        });
    }

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
                <Link to={'/'} className='logo'> <img src={logo} width={widthImage} /></Link>

                <div className='nav_search'>
                    <Dropdown overlayClassName='container-category '
                        menu={{
                            items
                        }}
                    >
                        <div className='nav_category  me-4'>
                            <a onClick={(e) => handleBoxCat(e)}>
                                <Space>
                                    <BiCategoryAlt size={35} />
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

                    <div className="nav-icon "  >
                        {isAuthenticated ? (
                            <Dropdown menu={{ items: itemsAccount }} trigger={['click']} placement="bottomRight" >
                                <div className='space-avatar'>
                                    <Avatar icon={<UserOutlined />} size={25} />
                                    <span className='nav-cover-text' >{user.name}</span>
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <BiUser size={25} onClick={() => navigate('/login')} />
                                <span className='nav-cover-text' onClick={() => navigate('/login')}>Tài Khoản</span>
                            </>
                        )}
                    </div>

                </div>
            </div>
            <Drawer
                title={`Danh mục sản phẩm`}
                placement="left"
                size={'default'}
                onClose={() => setOpen(false)}
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
