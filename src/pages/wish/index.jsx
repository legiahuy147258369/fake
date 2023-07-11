import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './wish.scss';
import { ImBin } from 'react-icons/im';
import { BiSolidShoppingBag } from 'react-icons/bi'
import { Col, Empty, Row, Image } from 'antd';
import BreadcrumbCom from '../../components/breadcrumb';
import { formatGia } from '../../utils/format';
import { delIdWishList } from '../../redux/wish/wishSlide';
import { addToCart } from '../../redux/cart/cartSlice'
import { useNavigate } from 'react-router-dom';
const WishList = () => {
    const wish = useSelector((state) => state.wish.product);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return (
        <>
            <BreadcrumbCom /><div className='wish-area'>

                {wish.length ?
                    <Row justify={'center'} className='mt-2'>
                        <Col xs={0} md={24} lg={20} className='cap'>Danh sách yêu thích</Col>
                        <Col xs={0} md={24} xl={20}>
                            <Row className='box-title border-grey '>
                                <Col className='title-wish' md={4}>Hình</Col>
                                <Col className='title-wish' md={8}>Tên</Col>
                                <Col className='title-wish' md={4}>Giá</Col>
                                <Col className='title-wish' md={5}>Thêm giỏ hàng</Col>
                                <Col className='title-wish' md={3}>Xóa</Col>
                            </Row>
                        </Col>
                        <Col xs={0} md={24} xl={20}>
                            {wish.map(item => {
                                return (
                                    <Row key={item.id} className='box-title border-grey '>
                                        <Col className='content-wish' md={4}><Image src={item.thumbnail} width={100} /> </Col>
                                        <Col className='content-wish name' md={8} onClick={() => navigate(`/book/${item.id}`)}>{item.name}</Col>
                                        <Col className='content-wish' md={4}>{formatGia(item.price)}</Col>
                                        <Col className='content-wish' md={5}><div className='btn-addcart' onClick={() => dispatch(addToCart({ qty: 1, detail: item }))}><BiSolidShoppingBag /> <Col xs={0} md={0} xl={21}>Thêm vào giỏ hàng</Col></div></Col>
                                        <Col className='content-wish bin' md={3} > <ImBin onClick={() => dispatch(delIdWishList(item.id))} /> </Col>
                                    </Row>)
                            })}

                        </Col>
                    </Row>
                    : <Empty className='rong' description='Không có sản phẩm nào' />}
            </div>
        </>

    )
}

export default WishList