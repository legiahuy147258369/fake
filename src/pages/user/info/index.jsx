import React, { useState, useEffect, useRef } from 'react';
import '../account.scss';
import { Divider, Button, Radio, Form, Input, Row, Col, message, notification, Avatar, Upload, Image } from 'antd';
import { ruleAnt, schema } from '../../../utils/rule';
import LoadingSnip from '../../../components/loading-custom/loading-spin';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelectV2 from '../../../components/select-custom/select-v2';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input-custom/input-v2';
import CustomRadio from '../../../components/radio';
import { convertDate, formatNgay, dataDate } from '../../../utils/format';
import { callFetchAccount, callLogout, callUpdateCurrent, callUploadAvatar } from '../../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction, doUpdateAvatarAction } from '../../../redux/account/accountSlice';
import _ from 'lodash';
import { LuImagePlus } from 'react-icons/lu';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const Info = () => {
    const dispatch = useDispatch();
    const registerSchema = schema.pick(['email', 'name', 'ngay', 'thang', 'nam', 'phone', 'gender', 'address'])
    const methods = useForm({ resolver: yupResolver(registerSchema) });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.account.user);
    const [img, setImg] = useState(user?.avatar);
    const dataGender = [
        { label: 'Nam', value: 1 },
        { label: 'Nữ', value: 2 },
        { label: 'Khác', value: 3 },
    ];
    const onSubmit = async (data) => {
        const { ngay, thang, nam, ...rest } = data;
        let date = convertDate(`${ngay}/${thang}/${nam}`)
        const body = { ...rest, date };
        let result = await callUpdateCurrent(body);
        if (result) {
            message.success('Cập nhật thành công');
            handleLogout();
        } else {
            notification.error({
                message: result,
            });
        }
    }
    const handleLogout = async () => {
        const res = await callLogout();
        if (res) {
            dispatch(doLogoutAction());
            navigate('/login');
        }
    };
    const setValueForm = () => {
        const filteredData = _.omitBy(user, _.isNull);
        Object.keys(filteredData).forEach((key) => {
            if (key === 'date') {
                const [ngay, thang, nam] = formatNgay(filteredData[key]).split("-");
                methods.setValue('ngay', ngay || '');
                methods.setValue('thang', thang || '');
                methods.setValue('nam', nam || '');
            }
            methods.setValue(key, filteredData[key] || '');
        });
    }
    useEffect(() => {
        setValueForm();
    }, []);


    const handleUpdateAvatar = async ({ file, onSuccess, onError }) => {
        setLoading(true);
        const res = await callUploadAvatar(file);
        if (res && res.url) {
            dispatch(doUpdateAvatarAction({ avatar: res.url }));
            setImg(res.url);
            onSuccess('ok')
        } else {
            onError('Đã có lỗi khi upload file')
        }
        setLoading(false);
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    const propsUpload = {
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        customRequest: handleUpdateAvatar,
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className='info-area'>
            <h2 className='title-top'>Thông tin tài khoản</h2>
            <Divider />
            <Row justify={'space-evenly'}>
                <Col xs={24} md={5}>
                    <Row gutter={[0, 16]}>
                        <Col xs={24} className='text-center'>
                            Ảnh đại diện
                        </Col>
                        <Col xs={24} className='fl-center mt-3'>

                            <Upload {...propsUpload}>
                                {img ? (
                                    <div className='custom-item-renderer'>
                                        <Avatar src={img} shape='circle' size={100} />
                                        <span className='content-render'><LuImagePlus size={20} /></span>
                                    </div>
                                ) : (
                                    uploadButton
                                )}
                            </Upload>

                        </Col>
                    </Row>
                </Col>
                <Col xs={24} md={14}>
                    <FormProvider {...methods}>
                        <form className='form-area-info' onSubmit={methods.handleSubmit(onSubmit)} >
                            <Row className='row-form' justify={'end'} align={'top'} gutter={[0, 16]}>
                                <Col xs={24} md={5}><label >Họ và tên</label></Col><Col xs={24} md={18}> <CustomInputV2 type={'text'} name='name' placeholder='Nhập Họ Tên' /> </Col>
                                <Col xs={24} md={5}><label >Email</label></Col><Col xs={24} md={18}><CustomInputV2 type={'text'} name='email' placeholder='Nhập email' /> </Col>
                                <Col xs={24} md={5}><label >Số điện thoại</label></Col><Col xs={24} md={18}><CustomInputV2 type={'text'} name='phone' placeholder='Nhập Số Điện Thoai' />  </Col>
                                <Col xs={24} md={5}><label >Địa chỉ</label></Col><Col xs={24} md={18}><CustomInputV2 type={'text'} name='address' placeholder='Nhập địa chỉ' />  </Col>
                                <Col xs={24} md={5}><label >Giới tính</label></Col>
                                <Col xs={24} md={18} className='group-gender'>
                                    <CustomRadio options={dataGender} name='gender' />
                                </Col>

                                <Col xs={24} md={5}><label >Ngày sinh</label></Col>
                                <Col xs={24} md={18}>
                                    <Col xs={24} md={8}><CustomSelectV2 options={dataDate().ngay} name="ngay" /></Col>
                                    <Col xs={24} md={8}><CustomSelectV2 options={dataDate().thang} name="thang" /></Col>
                                    <Col xs={24} md={8}><CustomSelectV2 options={dataDate().nam} name="nam" /></Col>
                                </Col>
                                <Col span={18} offset={5}>
                                    <button className='btn-save'>Lưu</button>
                                </Col>
                            </Row>

                        </form>
                    </FormProvider>
                </Col>
            </Row>
            {loading && <LoadingSnip />}
        </div>
    )
}

export default Info