import React, { useEffect, useState } from 'react';
import './cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ImBin } from 'react-icons/im'
import { Col, Row } from 'antd';
import { formatGia } from '../../utils/format';
import QtyCart from '../../components/qty-cart';
import { delIdCart } from '../../redux/cart/cartSlice';
const CartPage = () => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    // const total = (item) => {
    //     console.log(item);
    //     let d = item.reduce((a, b) => {
    //         return a + b.detail.price * item.qty
    //     }, 0);
    //     return d
    // }
    return (
        <div className='cart-area'>
            <h2>Giỏ hàng</h2>
            <Row>
                <Col className='cart-container' lg={18}>
                    {cart && cart.map((item, i) => {
                        return (
                            <Row className='box-cart ' key={i}>
                                <Col className='fl-center' xs={6} md={4}> <Link to={`/${item.detail.id}`}> <img src={item.detail.thumbnail} width={100} /></Link></Col>
                                <Col className='cart-info ' xs={18} md={13}>
                                    <div className='cart-info__top text-cut2'>{item.detail.name.slice(0, 80)}</div>
                                    <Row className='cart-info__bot my-2'>
                                        <Col className='fs-2' xs={0} md={5}>{formatGia(item.detail.price)}</Col>
                                        <Col ><QtyCart setQty={setQty} qty={item.qty} id={item.detail.id} page={'cart'} /> </Col>

                                    </Row>
                                </Col>
                                <Col xs={6} md={0}> </Col>
                                <Col className='fs-2 color-main fw-5 cart-info-tt' xs={14} md={3}>{formatGia(item.detail.price * item.qty)}</Col>
                                <Col className=' fl-center' xs={4} md={3} ><ImBin
                                    onClick={() => {
                                        dispatch(delIdCart({ id: item.detail.id }));
                                    }}
                                />
                                </Col>
                            </Row>
                        )

                    })}

                </Col>
                <Col lg={6}>3 / dgaergaerg5</Col>
            </Row>
        </div>
    )
}

export default CartPage