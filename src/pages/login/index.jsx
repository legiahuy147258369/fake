
import React, { useState } from 'react';
import './login.scss';
import Header from '../../components/header';
import { Col, Row, notification, message } from 'antd';
import CustomInput from '../../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rule'
import { Link, useNavigate } from 'react-router-dom';
import { callLogin } from '../../services/api';
import { useDispatch } from 'react-redux';
import LoadingSnip from '../../components/Loading/LoadingSpin';
import { doLoginAction } from '../../redux/account/accountSlice';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const registerSchema = schema.pick(['email', 'password'])
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        const { success, accessToken, account, message: mes } = await callLogin(data);
        setLoading(false);
        if (success) {
            message.success('Đăng nhập thành công');
            localStorage.setItem('access_token', accessToken);
            dispatch(doLoginAction(account))
            navigate('/');
        } else {
            notification.error({
                message: mes,
            });
        }
    })
    return (
        <>
            <Header />
            <Row justify={'center'} className='register-area'>
                <Col className='box-register' xs={18} md={12} lg={8}>
                    <form onSubmit={onSubmit} noValidate >
                        <h2 className='fs-2 mb-3 text-center'>Đăng nhập</h2>
                        <div className='box-input'>

                            <label >Email</label>
                            <CustomInput type={'text'} register={register} name='email' placeholder='Nhập email' errorMessage={errors.email?.message} />
                            <label >Mật khẩu</label>
                            <CustomInput type={'password'} register={register} name='password' placeholder='Nhập mật khẩu' errorMessage={errors.password?.message} />

                        </div>
                        <Row> <Col className='fl' xs={12}><Link to={'/login'} >Quên mật khẩu</Link></Col> <Col className='fl-end ' xs={12}><button className='btn-register'>Đăng nhập</button> </Col></Row>
                    </form>

                </Col>
            </Row>
            {loading && <LoadingSnip />}
        </>
    )
}

export default Login