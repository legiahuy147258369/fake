import React, { useEffect, useState } from 'react';
import BreadcrumbCom from '../../components/breadcrumb';
import OrderStep from '../../components/order-step';
import { Col, Row, message, notification, Switch, Space, Radio, Checkbox, Divider } from 'antd';
import { callCreateOrder, callHuyen, callPaypal, callTinh } from '../../services/api'
import CustomInput from '../../components/Input';
import { schema } from '../../utils/rule';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import './checkout.scss';
import Order from '../../components/Order';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { delAllCart } from '../../redux/cart/cartSlice';
import CustomSelectV2 from '../../components/select/select-v2';
import CustomInputV2 from '../../components/input/input-v2';
import CustomTextArea from '../../components/textarea';
import { convertOPtion, formatGia } from '../../utils/format';
import { useRef } from 'react';
import PaypalPayment from './paypalPayment';

const Checkout = () => {
    const [step, setStep] = useState(1);
    const [district, setDistrict] = useState([]);
    const cartRedux = useSelector((state) => state.cart.cart);
    const accountRedux = useSelector((state) => state.account.user);
    const [methodPay, setMethodPay] = useState(1);
    const dispatch = useDispatch();
    const [donhang, setDonhang] = useState([]);
    const [addressDefault, setAddressDefault] = useState({ default: false, rule: [] });

    const checkoutS = schema.pick(addressDefault.rule);
    const methods = useForm({
        resolver: yupResolver(checkoutS)
    });

    const { data: tinh } = useQuery({
        queryKey: ['province'],
        queryFn: () => {
            return callTinh()
        }
    });
    const setAddress = () => {
        if (accountRedux.address) {
            setAddressDefault({ default: true, rule: ['name', 'phone', 'dc'] });
            methods.setValue('name', accountRedux?.name);
            methods.setValue('phone', accountRedux?.phone);
            methods.setValue('dc', accountRedux?.address);
        } else {
            setAddressDefault({ default: false, rule: ['name', 'phone', 'province', 'district', 'dc'] });
            methods.setValue('name', accountRedux?.name);
            methods.setValue('phone', accountRedux?.phone);
            methods.trigger();
        }
    }

    useEffect(() => {
        setAddress();
    }, [accountRedux.address, setAddressDefault, methods]);
    const onChangeCheckAddress = (checked) => {
        setAddressDefault({ default: !checked, rule: ['name', 'phone', 'province', 'district', 'dc'] });
        methods.trigger();
        methods.setValue('dc', '');
        methods.setValue('district', '');
        methods.setValue('province', '');
    };
    const handleChange = async (value, option, name) => {
        if (name === 'province') {
            const data = await callHuyen(value);
            setDistrict(data.districts);
            methods.setValue('province', option.label);
        }
        if (name === 'district') {
            methods.setValue('district', option.label);
        }
    }


    const onSubmit = (async (data, type) => {
        if (cartRedux) {
            if (!data.province && !data.district) {
                data.address = ` ${data.dc}`;
            } else {
                data.address = ` ${data.dc} , ${data.district}, ${data.province}`;
            }
            const cart = cartRedux.map(item => ({
                quantity: item.qty,
                cart: {
                    id: item.detail.id,
                    price: item.detail.price,
                    name: item.detail.name
                }
            }));
            data.user_id = accountRedux.id;
            const order = { data, cart };
            const result = (await callCreateOrder(order))[0];
            if (result) {
                setStep(2);
                message.success('Đặt hàng thành công');
                setDonhang(result);
                methods.reset();
                dispatch(delAllCart())
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                });
            }
        }
    });

    const handClickPay = (params) => {
        setMethodPay(params);
    }

    return (
        <div >
            <BreadcrumbCom />
            <OrderStep step={step} />
            {step === 1 && (
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate >
                        <Row justify={'center'} className='checkout-area'>
                            <Col xs={24} lg={12} className='box-checkout-address'>
                                <h2>Địa chỉ đơn hàng</h2>
                                <Row justify={'center'} className='box-checkout-address__row' >
                                    <Col xs={22} >
                                        <Col className='label-text'>Họ tên : </Col>
                                        <CustomInputV2 type={'text'} name='name' placeholder='Nhập họ và tên' />
                                    </Col>
                                    <Col xs={22} >
                                        <Col className='label-text'>Số điện thoại : </Col>
                                        <CustomInputV2 type={'text'} name='phone' placeholder='Nhập số điện thoại' />
                                    </Col>
                                    {
                                        addressDefault.default ?
                                            <Col xs={22}>
                                                <Col xs={24} className='my-2'><Checkbox checked={addressDefault.default} onChange={onChangeCheckAddress}> Lấy mặc định : </Checkbox></Col>
                                                <Col xs={24}>
                                                    <CustomTextArea name='dc' placeholder='Nhập địa chỉ' />
                                                </Col>
                                            </Col>
                                            :
                                            <>
                                                <Col xs={22} >
                                                    <Col className='label-text'>Chọn tỉnh </Col>
                                                    <CustomSelectV2 options={convertOPtion(tinh)} name='province' handleChange={handleChange} placeholder='Chọn tỉnh' />
                                                </Col>
                                                <Col xs={22} >
                                                    <Col className='label-text'>Chọn quận huyện </Col>
                                                    <CustomSelectV2 options={convertOPtion(district)} name='district' handleChange={handleChange} placeholder='Chọn quận huyện' />
                                                </Col>

                                                <Col xs={22}>
                                                    <Col className='label-text'>Nhập địa chỉ nhà </Col>
                                                    <CustomTextArea name='dc' placeholder='Nhập địa chỉ' />
                                                </Col>
                                            </>
                                    }

                                </Row>
                            </Col>
                            <Col xs={24} lg={12} className='p-4 '>
                                <Row gutter={[8, 20]}>
                                    <Col xs={24} className='title_order'> Đơn hàng</Col>

                                    <Col>
                                        <Divider />
                                        {cartRedux && cartRedux.length > 0 && (
                                            cartRedux.map(item => {
                                                return (
                                                    <Row key={item.detail.id} gutter={[8, 16]} className='mt-2' >
                                                        <Col xs={5} md={4}><img src={item.detail.thumbnail} width={90} /></Col>
                                                        <Col xs={19} md={20} className='cart_des'>
                                                            <Col xs={24} > {item.detail.name}</Col>
                                                            <Col xs={24} className='cart_des__price'> {formatGia(item.detail.price)} - Số lượng :{item.qty} </Col>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        )}
                                    </Col>

                                    <Col>
                                        <Col xs={24}>
                                            <Divider />
                                            <Col className='label-text'>Hình thức thanh toán </Col>
                                            <br />
                                            <Col>
                                                <Radio.Group onChange={(e) => handClickPay(e.target.value)} value={methodPay}>
                                                    <Space direction='horizontal'>
                                                        <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                                        <Radio value={2}>Thanh toán Online </Radio>
                                                    </Space>
                                                </Radio.Group>
                                            </Col>
                                            <br />
                                        </Col>

                                    </Col>
                                    {methodPay === 2 && (
                                        <Col xs={24} className='fl-wrap ' >

                                            <Col xs={12} ><PaypalPayment setStep={setStep} setDonhang={setDonhang} methods={methods} user={accountRedux} /></Col>
                                        </Col>
                                    )}
                                    <Col xs={24} className=' fl-center' >
                                        <button className='btn-checkout' >Mua hàng</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </form>
                </FormProvider>)}
            {step === 2 && !_.isEmpty(donhang) && <Order donhang={donhang} />}
        </div>
    )
}

export default Checkout

