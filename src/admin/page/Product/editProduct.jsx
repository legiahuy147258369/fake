import React, { useEffect } from 'react';
import { Col, Row, notification } from 'antd';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { schema } from '../../../utils/rule';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input-custom/input-v2';
import CustomTextArea from '../../../components/textarea';
import CustomSelectV2 from '../../../components/select/select-v2';
import { block, formatNgay } from '../../../utils/format';
import '../../style.scss';
import moment from 'moment';
import _ from 'lodash'
import CustomUploadV2 from '../../../components/custom-upload/custom-v2';
import { callDelProductImg, callUpdateProduct } from '../../../services/api';
const EditProduct = ({ book, cat, setLoading, setOpenDrawEdit, fetchBook }) => {

    const registerSchema = schema.pick(['name', 'description', 'thumb', 'quantity', 'publish_date',
        'number_of_page', 'author', 'block', 'price', 'category_id', 'slide']);

    const methods = useForm({ resolver: yupResolver(registerSchema) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true)
        const { id, thumb, slide, ...rest } = data;
        const formData = new FormData();
        if (thumb && thumb[0]?.originFileObj) {
            formData.append('thumbnail', thumb[0]?.originFileObj)
        }
        if (slide) {
            slide.forEach((item) => {
                if (item.originFileObj) {
                    formData.append('slide', item['originFileObj'])
                }
            })
        }

        for (const item of Object.entries(rest)) {
            formData.append(item[0], item[1]);
        }

        let res = await callUpdateProduct(book.id, formData);
        if (res.success) {
            setOpenDrawEdit(false)
            notification.success({ message: res.mes });
            fetchBook()
            methods.reset();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
        setLoading(false)
    }


    useEffect(() => {
        if (book) {
            getData()
            Object.entries(book).forEach(([name, value]) => {
                if (name === 'name' || name === 'description' || name === 'quantity' ||
                    name === 'number_of_page' || name === 'author' || name === 'block'
                    || name === 'price' || name === 'category_id') {
                    methods.setValue(name, value);
                }
                if (name === 'publish_date') {
                    methods.setValue(name, moment(value).format('YYYY-MM-DD'))
                }
            });
        }
        setLoading(false)
        return () => {
            methods.reset();
        };
    }, [book]);

    const getData = async () => {
        const arrThumbnail = [{
            uid: book.id, name: (book?.thumbnail?.substring(book?.thumbnail.lastIndexOf("/") + 1)), url: book?.thumbnail
        }];
        const arrSlider = book.images && JSON.parse(book.images).map((item, i) => ({
            uid: item.id, name: (item.url.substring(item.url.lastIndexOf("/") + 1)), url: item.url
        }));
        methods.setValue('thumb', arrThumbnail)
        methods.setValue('slide', arrSlider)
    }

    const handleChangeFile = async (name, file) => {
        if (name === 'slide') {
            console.log(file.uid, file.url);
            await callDelProductImg(file.uid, file.url)
        }
        const data = methods.getValues(name)?.filter(item => item.uid !== file.uid);
        methods.setValue(name, data);
    }


    return (
        <div>
            {!_.isEmpty(book) && <FormProvider {...methods}>
                <form className='form-area-product' onSubmit={methods.handleSubmit(onSubmit)}  >
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
                                <Col md={5}> <Col className='mb-2'>Thể loại</Col>  <Col> <CustomSelectV2 name='category_id' placeholder='Loại sách' options={cat} /> </Col></Col>
                                <Col md={5}> <Col className='mb-2'>Số trang</Col>  <Col><CustomInputV2 type={'text'} name='number_of_page' placeholder='Số trang' /> </Col> </Col>
                                <Col md={4}> <Col className='mb-2'>Số lượng</Col>  <Col><CustomInputV2 type={'text'} name='quantity' placeholder='Số lượng sản phẩm' /> </Col> </Col>
                            </Row>
                        </Col>
                        <Col md={24}>
                            <Row justify={'space-between'}>
                                <Col xs={10}>
                                    <Col>Ảnh đại diện sản phẩm</Col>
                                    <CustomUploadV2 name='thumb' qty={false} change={handleChangeFile} />

                                </Col>
                                <Col xs={10}>
                                    <Col>Ảnh phụ</Col>
                                    <CustomUploadV2 name='slide' qty={true} change={handleChangeFile} />

                                </Col>
                            </Row>
                        </Col>
                        <Col span={2} offset={22}>
                            <button className='btn-save'>Lưu</button>
                        </Col>
                    </Row>
                </form>
            </FormProvider >}

        </div >
    )
}

export default EditProduct