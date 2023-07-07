import React, { useEffect, useState } from 'react'
import BreadcrumbCom from '../../components/breadcrumb'
import OrderStep from '../../components/order-step'
import { Col, Row } from 'antd'
import { callCreateOrder, callHuyen, callTinh } from '../../services/api'
import CustomInput from '../../components/Input'
import { schema } from '../../utils/rule'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CustomSelect from '../../components/Select'
import { useQuery } from '@tanstack/react-query';
import './checkout.scss'
import Order from '../../components/Order'
import { useSelector } from 'react-redux'
const Checkout = () => {
    const [step, setStep] = useState(2)
    const [district, setDistrict] = useState([]);
    const cartRedux = useSelector((state) => state.cart.cart);
    const accountRedux = useSelector((state) => state.account.user);

    const checkoutS = schema.pick(['name', 'phone', 'province', 'district', 'dc'])
    const { register, clearErrors, setError, resetField, getValues, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(checkoutS) });

    const { data: tinh } = useQuery({
        queryKey: ['province'],
        queryFn: () => {
            return callTinh()
        }
    });


    console.log(accountRedux.id);
    const handleChange = async (event, name) => {
        const ip = event.target.value;
        if (name === 'province') {
            const data = await callHuyen(ip);
            setDistrict(data.districts);
            if (ip.length > 0) {
                clearErrors('province');
            } else {
                setDistrict([])
                setValue('district', '')
                setError('province', { type: 'custom', message: 'Vui lòng chọn tỉnh' });
            }
        } else {
            if (ip.length > 0) {
                clearErrors('district');
            } else {
                setValue('district', '')
                setError('district', { type: 'custom', message: 'Vui lòng chọn quận huyện' });
            }
        }
    }

    const onSubmit = handleSubmit(async (data) => {

        const cart = cartRedux.map(item => ({
            quantity: item.qty,
            cart: {
                id: item.detail.id,
                price: item.detail.price
            }
        }))
        data.user_id = accountRedux.id;
        const order = { data, cart };
        await callCreateOrder(order);
    });

    return (
        <div >
            <BreadcrumbCom />
            <OrderStep step={step} />
            {step === 1 && <Row justify={'center'} className='checkout-area'>
                <Col xs={18} md={12} lg={8} className='box-checkout-address'>
                    <form onSubmit={onSubmit} noValidate >
                        <h2>Địa chỉ đơn hàng</h2>
                        <Row justify={'center'} gutter={[8, 8]} >
                            <Col xs={22} >
                                <label className='label-text'>Họ tên : </label>
                                <CustomInput type={'text'} register={register} name='name' placeholder='Nhập họ và tên' errorMessage={errors.name?.message} />
                            </Col>
                            <Col xs={22} >
                                <label className='label-text'>Số điện thoại : </label>
                                <CustomInput type={'text'} register={register} name='phone' placeholder='Nhập số điện thoại' errorMessage={errors.phone?.message} />
                            </Col>
                            <Col xs={22} >
                                <label className='label-text'>Chọn tỉnh </label>
                                <CustomSelect register={register} items={tinh} handleChange={handleChange} name='province' placeholder='Chọn tỉnh' errorMessage={errors.province?.message} />
                            </Col>
                            <Col xs={22} >
                                <label className='label-text'>Chọn quận huyện </label>
                                <CustomSelect register={register} items={district} handleChange={handleChange} name='district' placeholder='Chọn quận huyện' errorMessage={errors.district?.message} />
                            </Col>

                            <Col xs={22}>
                                <textarea rows="4" placeholder='Nhập địa chỉ'{...register("dc")} className='textarea-address'></textarea>
                                <p className='color-main'>{errors.dc?.message}</p>
                            </Col>
                            <Col xs={22} className='mt-2 fl'>
                                <div className='dot'></div> Thanh toán khi nhận hàng
                            </Col>
                            <Col xs={22} className='mt-2 fl-center' >
                                <button className='btn-checkout'>Mua hàng</button>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>}
            {step === 2 && <Order />}
        </div>
    )
}

export default Checkout

