import React, { useState, useEffect } from 'react';
import { Col, Popconfirm, Row, Space, Table, Tag, Modal, Button, notification } from 'antd';
import { blockCategory } from '../../../utils/format';
import '../../style.scss';
import { callCategory, callCreateCategory, callDelCategory, callUpdateCategory } from '../../../services/api';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { schema } from '../../../utils/rule';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input/input-v2';
import CustomSelectV2 from '../../../components/select/select-v2';

const ListCategoryAdmin = () => {
    const createSchema = schema.pick(['name', 'block']);
    const updateSchema = schema.pick(['name', 'block', 'id']);
    const create = useForm({ resolver: yupResolver(createSchema) });
    const update = useForm({ resolver: yupResolver(updateSchema) });
    const [listCat, setListCat] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);


    const handleCancel = () => {
        setIsModalOpen(false);
        setOpenEdit(false);
        create.reset();
        update.reset()
    };
    const handleEdit = (record) => {
        setOpenEdit(true);
        update.setValue('name', record.name);
        update.setValue('block', record.block);
        update.setValue('id', record.id);
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record, index) => {
                return (
                    <a
                        onClick={() => {

                        }}
                    >
                        {record.id}
                    </a>
                );
            },
        },
        {
            title: 'Tên thể loại',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ẩn / Hiện',
            dataIndex: 'block',
            key: 'block',
            render: (_, record) => (
                <Space size="middle">
                    {record.block === 1 ?
                        <Tag bordered={false} color="processing"> Hiện</Tag> :
                        <Tag bordered={false} color="purple"> Ẩn</Tag>}
                </Space>
            ),
        },
        {
            title: 'Chỉnh sửa',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <div className="btn_table">
                        <FiEdit2
                            className="icon-edit"
                            onClick={() => handleEdit(record)}
                        />
                        <Popconfirm
                            onConfirm={() => handDeleteCat(record.id)}
                            placement="leftTop"
                            title={'Xác nhận xóa cuốn sách này ?'}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <RiDeleteBin7Line className="icon-delete" />
                        </Popconfirm>
                    </div>
                );
            }
        },
    ];

    const fetchData = async () => {
        let da = await callCategory();
        setListCat(da)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const onSubmitCreate = async (data) => {
        let res = await callCreateCategory(data);
        if (res.success) {
            fetchData();
            notification.success({ message: res.mes });
            handleCancel();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const onSubmitUpdate = async (data) => {
        let res = await callUpdateCategory(data);
        if (res.success) {
            fetchData();
            notification.success({ message: res.mes });
            handleCancel();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const handDeleteCat = async (id) => {
        const res = await callDelCategory(id);
        if (res.success) {
            notification.success({ message: res.mes });
            fetchData();
        } else notification.info({ message: 'Có lỗi xảy ra' })
    }
    return (
        <div className='category_admin_area'>
            <Row gutter={[16, 8]} justify={'start'}>
                <Col xs={24} className='cap-form'>Danh sách sản phẩm</Col>
                <Col xs={24}>
                    <Row justify={'space-between'}>
                        <Col xs={6}><button className='btn_add' onClick={() => setIsModalOpen(true)}>Thêm mới</button></Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Table columns={columns} dataSource={listCat}
                        rowKey={'id'} />
                </Col>
            </Row>
            <Modal className='modal-category' title="Thêm danh mục" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <FormProvider {...create}>
                    <form className='form-area-category' onSubmit={create.handleSubmit(onSubmitCreate)}  >
                        <h2 className='cap-form'>Thêm sản phẩm</h2>
                        <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 32]}>
                            <Col md={24}><Col className='mb-2'>Tên sản phẩm</Col> <CustomInputV2 type={'text'} name='name' placeholder='Tên thế loại sách' /> </Col>
                            <Col md={24}> <Col className='mb-2'>Ẩn hiện sản phẩm</Col> <Col> <CustomSelectV2 name='block' placeholder='Chọn bên dưới' options={blockCategory()} /> </Col></Col>
                            <Row gutter={[16, 0]} justify={'end'} className='w-100'>
                                <Col><button type='button' className='btn-cancel' onClick={handleCancel}>Hủy</button></Col>
                                <Col><button className='btn-save'>Gửi</button></Col>
                            </Row>
                        </Row>

                    </form>
                </FormProvider >
            </Modal>
            <Modal className='modal-category' title="Thêm danh mục" open={openEdit} onCancel={handleCancel} footer={null}>
                <FormProvider {...update}>
                    <form className='form-area-category' onSubmit={update.handleSubmit(onSubmitUpdate)}  >
                        <h2 className='cap-form'>Chỉnh sủa thế loại sách</h2>
                        <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 32]}>

                            <Col md={24}><Col className='mb-2'>Tên sản phẩm</Col> <CustomInputV2 type={'text'} name='name' placeholder='Tên thế loại sách' /> </Col>
                            <Col md={24}> <Col className='mb-2'>Ẩn hiện sản phẩm</Col> <Col> <CustomSelectV2 name='block' placeholder='Chọn bên dưới' options={blockCategory()} /> </Col></Col>
                            <Row gutter={[16, 0]} justify={'end'} className='w-100'>
                                <Col><button type='button' className='btn-cancel' onClick={handleCancel}>Hủy</button></Col>
                                <Col><button className='btn-save'>Gửi</button></Col>
                            </Row>
                            <CustomInputV2 type={'hidden'} name='id' />
                        </Row>

                    </form>
                </FormProvider >
            </Modal>
        </div >
    )
}

export default ListCategoryAdmin