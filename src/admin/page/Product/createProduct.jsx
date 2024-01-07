import React, { useState } from 'react';
import { Col, Row, notification } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { schema } from '../../../utils/rule';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input/input-v2';
import CustomTextArea from '../../../components/textarea';
import { callCategory, callCreateProduct } from '../../../services/api';
import CustomUpload from '../../../components/custom-upload';
import CustomSelectV2 from '../../../components/select/select-v2';
import { block } from '../../../utils/format';
import LoadingSnip from '../../../components/loading/loading-spin';
const CreateProduct = () => {
    const registerSchema = schema.pick(['name', 'description', 'thumbnail', 'quantity', 'publish_date', 'number_of_page', 'author', 'block', 'price', 'category_id', 'slide']);
    const methods = useForm({ resolver: yupResolver(registerSchema) });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        setLoading(true);
        const formData = new FormData();
        const { thumbnail, slide, ...rest } = data;
        for (const item of Object.entries(rest)) {
            formData.append(item[0], item[1])
        }
        if (thumbnail) formData.append('thumbnail', thumbnail);
        if (slide) {
            slide.forEach((item, i) => {
                formData.append('slide', item['originFileObj']);
            });
        }
        const res = await callCreateProduct(formData);
        setLoading(true);
        if (res) {
            notification.success({ message: res });
            navigate('/admin/product');
        }

    }
    const { data: cat } = useQuery({
        queryKey: ['cat'],
        queryFn: () => {
            return callCategory();
        }
    });
    const dataCat = cat && cat.map(item => {
        return ({
            value: item.id,
            label: item.name,
        })
    })
    return (
        <div>
            <FormProvider {...methods}>
                <form className='form-area-product' onSubmit={methods.handleSubmit(onSubmit)}  >
                    <h2 className='cap-form'>Thêm sản phẩm</h2>
                    <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 16]}>
                        <Col md={24}><Col className='mb-2'>Tên sản phẩm</Col> <CustomInputV2 type={'text'} name='name' placeholder='Tên sản phẩm' /> </Col>
                        <Col md={24}><Col className='mb-2'>Mô tả sản phẩm</Col> <CustomTextArea type={'text'} placeholder='Mô tả' name='description' /> </Col>
                        <Col md={24}>
                            <Row gutter={[10, 10]} className='w-100'>
                                <Col md={12}><Col className='mb-2'>Tên tác giả</Col> <Col> <CustomInputV2 type={'text'} name='author' placeholder='Tên tác giả' /></Col></Col>
                                <Col md={12}><Col className='mb-2'>Giá sản phẩm</Col> <Col> <CustomInputV2 type={'text'} name='price' placeholder='Giá sản phẩm' /> </Col></Col>
                            </Row>
                        </Col>
                        <Col md={24}>
                            <Row gutter={[10, 10]} className='w-100'>
                                <Col md={5}> <Col className='mb-2'>Ngày công bố</Col> <Col> <CustomInputV2 type={'date'} name='publish_date' placeholder='Ngày công bố' /> </Col></Col>
                                <Col md={5}> <Col className='mb-2'>Ẩn hiện sản phẩm</Col> <Col> <CustomSelectV2 name='block' placeholder='Chọn bên dưới' options={block()} /> </Col></Col>
                                <Col md={5}> <Col className='mb-2'>Thể loại</Col>  <Col> <CustomSelectV2 name='category_id' placeholder='Loại sách' options={dataCat} /> </Col></Col>
                                <Col md={5}> <Col className='mb-2'>Số trang</Col>  <Col><CustomInputV2 type={'text'} name='number_of_page' placeholder='Số trang' /> </Col> </Col>
                                <Col md={4}> <Col className='mb-2'>Số lượng</Col>  <Col><CustomInputV2 type={'text'} name='quantity' placeholder='Số lượng sản phẩm' /> </Col> </Col>
                            </Row>
                        </Col>
                        <Col md={24}>
                            <Row justify={'space-between'}>
                                <Col xs={10}>
                                    <Col>Ảnh đại diện sản phẩm</Col>
                                    <CustomUpload name='thumbnail' qty={false} />
                                </Col>
                                <Col xs={10}>
                                    <Col>Ảnh phụ</Col>
                                    <CustomUpload name='slide' qty={true} />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={2} offset={22}>
                            <button className='btn-save'>Lưu</button>
                        </Col>
                    </Row>

                </form>
            </FormProvider >
            {loading && <LoadingSnip />}
        </div >
    )
}

export default CreateProduct