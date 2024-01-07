import React, { useState } from 'react';
import { Col, Modal, Popconfirm, Row, Space, Switch, Table, Tag, notification } from 'antd';
import { useEffect } from 'react';
import { callAllComment, callDelComment, callUpdateComment } from '../../../services/api';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { formatNgay, blockComment } from '../../../utils/format';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from '../../../utils/rule';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input-custom/input-v2';
import CustomSelectV2 from '../../../components/select/select-v2';
import CustomRate from '../../../components/rate'
const vert = (item, index) => {
    let va = {
        key: 1 + index, id: item.id, name: item.name,
        content: item.content, block: item.block,
        rate: item.rate, created_at: item.created_at
    };
    (item?.reply?.length > 0) && (va.children = item.reply.map((item1, index1) => vert(item1, index1)))
    return va
}
const ListCommentAdmin = () => {
    const updateSchema = schema.pick(['block', 'rate', 'id', 'name']);
    const update = useForm({ resolver: yupResolver(updateSchema) });
    const [query, setQuery] = useState({ page: 1 });
    const [listData, setListData] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const fetchData = async () => {
        const res = await callAllComment(query);
        const data = res?.data && res?.data?.map(((item, index) => vert(item, index)))
        setListData({ data, total: res.total });
    }
    useEffect(() => {
        fetchData();
    }, [query]);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'ID',
        },
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Ẩn / Hiện',
            dataIndex: 'block',
            key: 'block',
            render: (text, record, index) => <>{record.block === 1 ?
                <Tag bordered={false} color="success"> Hiện </Tag>
                : <Tag bordered={false} color="warning"> Ẩn </Tag>}
            </>
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            render: (text, record, index) => {
                return <span >{formatNgay(record.created_at)}</span>;
            },
        },
        {
            title: 'Chỉnh sửa',
            key: 'Chỉnh sửa',
            render: (text, record, index) => {
                return (<div className="btn_table">
                    <FiEdit2
                        className="icon-edit"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        onConfirm={() => handDeleteComment(record.id)}
                        placement="leftTop"
                        title={'Xác nhận xóa bình luận này này ?'}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <RiDeleteBin7Line className="icon-delete" />
                    </Popconfirm>
                </div>
                );
            },
        },
    ];
    const handDeleteComment = async (id) => {
        const res = await callDelComment(id);
        if (res.success) {
            notification.success({ message: res.mes });
            fetchData()
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination.current !== query.page) {
            setQuery(pre => ({ ...pre, page: pagination.current }))
        }
        if (pagination?.pageSize !== query.limit) {
            setQuery(pre => ({ ...pre, limit: pagination.pageSize }))
        }
        if (sorter && sorter.field) {
            const s = sorter.order === 'ascend' ? `asc` : `desc`;
            setQuery(pre => ({ ...pre, val_sort: s, sort: sorter.field }));
        }
    }
    const handleCancel = () => {
        setOpenEdit(false);
        update.reset();
    };
    const handleEdit = (record) => {
        setOpenEdit(true);
        update.setValue('block', record.block);
        update.setValue('rate', record.rate);
        update.setValue('name', record.name);
        update.setValue('id', record.id);
    }
    const onSubmitUpdate = async (data) => {
        let res = await callUpdateComment(data);
        if (res.success) {
            fetchData();
            notification.success({ message: res.mes });
            handleCancel();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    return (
        <div className='admin_area'>
            <Row gutter={[0, 24]}>
                <Col xs={24} className='cap-form'> Danh sách bình luận </Col>
                <Col xs={24}>
                    <Table
                        columns={columns}
                        dataSource={listData?.data}
                        onChange={onChange}
                        pagination={{
                            current: query.page,
                            pageSize: query?.limit || 10,
                            showSizeChanger: true,
                            total: listData?.total,
                        }}
                    />
                </Col>
            </Row>
            <Modal className='modal-category' open={openEdit} onCancel={handleCancel} footer={null}>
                <FormProvider {...update}>
                    <form className='form-area-category' onSubmit={update.handleSubmit(onSubmitUpdate)}  >
                        <h2 className='cap-form'>Cập nhật tài khoản</h2>
                        <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 32]}>
                            <Col md={24}> <Col className='mb-2'>Họ và tên</Col> <Col> <CustomInputV2 name='name' placeholder='Vui lòng nhập Họ và tên' disabled={true} /> </Col></Col>
                            <Col md={24}> <Col className='mb-2'>Ản /Hiện</Col> <Col> <CustomSelectV2 name='block' placeholder='Chọn bên dưới' options={blockComment()} /> </Col></Col>
                            <Col md={24}> <CustomRate name='rate' /> </Col>
                            <Row gutter={[16, 0]} justify={'end'} className='w-100'>
                                <Col><button type='button' className='btn-cancel' onClick={handleCancel}>Hủy</button></Col>
                                <Col><button className='btn-save'>Gửi</button></Col>
                            </Row>
                            <CustomInputV2 type={'hidden'} name='id' />
                        </Row>

                    </form>
                </FormProvider >
            </Modal>
        </div>
    )
}

export default ListCommentAdmin