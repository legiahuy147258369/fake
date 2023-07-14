import React, { useState } from 'react';
import { Row, Col, message, notification } from 'antd';
import CustomInput from '../../../components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../utils/rule';
import '../account.scss';
import { callUpdateCurrentPass } from '../../../services/api';
import LoadingSnip from '../../../components/Loading/LoadingSpin';
const Pass = () => {
    const [loading, setLoading] = useState(false);
    const registerSchema = schema.pick(['pass_current', 'password', 'confirm_password']);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });
    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        let result = await callUpdateCurrentPass(data);
        if (result.success) {
            message.success(result.mes);
            reset()
        } else {
            notification.warning({ message: result.mes });
        }
        setLoading(false)
    })
    return (
        <form onSubmit={onSubmit} noValidate>
            <Row gutter={[0, 12]} justify={'center'}>
                <Col xs={15} className='height2 text-center mt-3 f-text'>Thay đổi mật khẩu</Col>
                <Col xs={15}> <label>Mật khẩu hiện tại</label>  </Col>
                <Col xs={15}><CustomInput type={'password'} register={register} name='pass_current' placeholder='Nhập mật khẩu hiện tại' errorMessage={errors.pass_current?.message} /></Col>
                <Col xs={15}> <label>Mật khẩu Mới</label>  </Col>
                <Col xs={15}><CustomInput type={'password'} register={register} name='password' placeholder='Nhập mật khẩu' errorMessage={errors.password?.message} /></Col>
                <Col xs={15}> <label>Xác nhận lại mật khẩu</label>  </Col>
                <Col xs={15}><CustomInput type={'password'} register={register} name='confirm_password' placeholder='Nhập mật khẩu' errorMessage={errors.confirm_password?.message} /></Col>
                <Col span={10} offset={8}><button className='btn-change_pass'>Đăng kí</button> </Col>
            </Row>
            {loading && <LoadingSnip />}
        </form>
    )
}

export default Pass