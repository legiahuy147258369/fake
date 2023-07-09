
import { Row, Steps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OrderStep = (props) => {
    const navigate = useNavigate()
    const { step } = props;
    const cartRedux = useSelector((state) => state.cart.cart);
    const handChangeStep = (s) => {
        if (s === 0) {
            navigate('/cart')
        } else if (s === 1 && cartRedux.length > 0) {
            navigate('/checkout')
        }
    }
    return (
        <Row className="b-round-2 bg-white p-4 b-round mb-3 cs">
            <Steps
                responsive
                className="steps-container"
                size="small"
                current={step}
                onChange={(current) => handChangeStep(current)}
                items={[
                    {
                        title: 'Đặt hàng',
                    },
                    {
                        title: 'Thanh toán',
                    },
                    {
                        title: 'Đơn hàng',
                    },
                ]}
            />
        </Row>
    )
}

export default OrderStep