import React from 'react'
import { Button, Col, Divider, Result, Row } from 'antd';
import './order.scss';
import { formatGia } from '../../utils/format';
import moment from 'moment';
import { useNavigate } from 'react-router';
const Order = (props) => {
    const { donhang } = props;
    const navigate = useNavigate()
    console.log(donhang);
    const cart = JSON.parse(donhang.cart);
    console.log(cart);
    const total = (cart) => {
        console.log(cart);
        return +cart.reduce((a, b) => a + b.quantity * b.price, 0)
    }
    return (
        <div className='bg-white mt-20 pt-20'>
            <Result
                status="success"
                title="Cảm ơn bạn đã đặt hàng"
                subTitle="Chúng tôi luôn cố gắng mang đến cho mọi người những quyển sách hay nhất"
                extra={[
                    <Button key="console" onClick={() => navigate('/shop')}>
                        Trở về trang shop
                    </Button>

                ]}
            />
            <Row className='detail-order__1'>
                <Col xs={12} lg={6}>
                    <span> Mã đơn hàng</span>
                    <div>LGH-{donhang.id} </div>
                </Col>
                <Col xs={12} lg={6}>
                    <span>Ngày</span>
                    <div> {moment(donhang.created_at).format('DD/MM/YYYY')}</div>
                </Col>
                <Col xs={12} lg={6}>
                    <span>Tổng tiền</span>
                    <div>{formatGia(total(cart))}</div>
                </Col>
                <Col xs={12} lg={6}>
                    <span>Phương thức thanh toán</span>
                    <div>Nhận tiền khi giao</div>
                </Col>
            </Row>
            <Row className='detail-order__2' justify={'center'} gutter={[0, 20]} >
                <h2>Chi tiết đơn hàng</h2>
                <Col xs={24} md={22} className='detail-order__cart' >
                    {cart.map((item, i) => {
                        return (
                            <Row className='detail-order__cart__product' key={item.price + i} >
                                <Col xs={12} className='detail-order__cart__product__name'>{item.product_name}</Col>
                                <Col xs={12} className='detail-order__cart__product__price'> {formatGia(item.price)}</Col>
                            </Row>
                        )
                    })}
                </Col>
                <Col xs={12} md={11} className='title'>Tổng sản phẩm</Col>
                <Col xs={12} md={11} className='content'>{formatGia(total(cart))}</Col>
                <Col xs={12} md={11} className='title'>Phí ship</Col>
                <Col xs={12} md={11} className='content'>FREE</Col>
                <Col xs={24} md={22} className='fl bt pt-4'>
                    <Col xs={12} className=' fs-2 fw-5'>Tổng tiền</Col>
                    <Col xs={12} className='fs-2 fw-5 color-main text-end'>{formatGia(total(cart))}</Col>
                </Col>

            </Row>
            <Divider />
            <div className='btn-history' onClick={() => navigate('/history')}>Xem lịch sử đơn hàng</div>
        </div>
    )
}

export default Order