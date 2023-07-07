import React, { useState } from 'react'
import Header from '../../components/header';
import './register.scss';
import { Col, Row } from 'antd';
import CustomInput from '../../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rule'
import { Link, useNavigate } from 'react-router-dom';
import LoadingSnip from '../../components/Loading/LoadingSpin';
import { callRegister } from '../../services/api';
import { Button, message, Space } from 'antd';
import omit from 'lodash/omit';


const Register = () => {
    const navigate = useNavigate();
    const registerSchema = schema.pick(['email', 'phone', 'password', 'confirm_password', 'name']);
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
    const [loading, setLoading] = useState(false);
    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        const body = omit(data, ['confirm_password'])
        const { success, message: mes } = await callRegister(body);
        setLoading(false);
        if (success) {
            message.success('Đăng kí thành công');
            navigate('/login')
        } else {
            message.warning(mes);
        }

    })
    return (
        <>
            <Header />
            <Row justify={'center'} className='register-area'>
                <Col className='box-register' xs={18} md={12} lg={8}>
                    <form onSubmit={onSubmit} noValidate >
                        <h2 className='fs-2 mb-3 text-center'>Đăng kí tài khoản</h2>
                        <div className='box-input'>
                            <label >Họ và tên</label>
                            <CustomInput type={'text'} register={register} name='name' placeholder='Nhập họ tên' errorMessage={errors.name?.message} />
                            <label >Email</label>
                            <CustomInput type={'text'} register={register} name='email' placeholder='Nhập email' errorMessage={errors.email?.message} />
                            <label >Số điện thoại</label>
                            <CustomInput type={'text'} register={register} name='phone' placeholder='Nhập Số điện thoại' errorMessage={errors.phone?.message} />
                            <label >Mật khẩu</label>
                            <CustomInput type={'password'} register={register} name='password' placeholder='Nhập mật khẩu' errorMessage={errors.password?.message} />
                            <label >Xác nhận mật khẩu</label>
                            <CustomInput type={'password'} placeholder='Xác nhận mật khẩu' register={register} name='confirm_password' errorMessage={errors.confirm_password?.message}
                            />
                        </div>
                        <Row> <Col className='fl' xs={12}><Link to={'/login'} >Đăng nhập</Link></Col> <Col className='fl-end ' xs={12}><button className='btn-register'>Đăng kí</button> </Col></Row>
                    </form>
                    {loading && <LoadingSnip />}
                </Col>
            </Row>
        </>
    )
}

export default Register