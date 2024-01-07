import '../../style.scss';
import { IoMdRefresh } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import { Popconfirm, Col, Row, Table, message, Modal, notification, Drawer, Descriptions } from 'antd';
import { formatGia, formatNgay } from '../../../utils/format';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';
import { callAllOrder, callDelOrder, callOrderAndDetail, callUpdateOrder } from '../../../services/api';
import { StatusOrder, StatusPayment, StatusOPtion, PaymentOPtion } from '../../../components/status-order';
import CustomSelectV2 from '../../../components/select/select-v2';
import { schema } from '../../../utils/rule';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInputV2 from '../../../components/input-custom/input-v2';

import ExportToExcel from '../../components/ExportExcel';

const ListOrderAdmin = () => {
    const updateSchema = schema.pick(['status', 'payment', 'id']);
    const update = useForm({ resolver: yupResolver(updateSchema) });
    const search = useForm();
    const [listOrder, setListOrder] = useState([]);
    const [listAllOrder, setListAllOrder] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [viewDetail, setViewDetail] = useState({ data: null, open: false });
    const [query, setQuery] = useState({ page: 1, limit: 10, sort_created_at: 'desc' });
    const [totalPage, setTotalPage] = useState();
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            render: (text, record, index) => {
                return (
                    <a
                        onClick={() => {
                            setViewDetail({ data: record, open: true })
                        }}
                    >
                        {record.id}
                    </a>
                );
            },
        }
        ,
        {
            title: 'SĐT',
            dataIndex: 'phoneReceiver',
            key: 'phoneReceiver',
        },
        {
            title: 'Tên người nhận ',
            dataIndex: 'nameReceiver',
            key: 'nameReceiver',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            sorter: true,
            render: (text, record, index) => {
                return <span>{formatGia(record.total)}</span>;
            },
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 300
        },
        {
            title: 'Trạng thái ',
            key: 'status',
            dataIndex: 'status',
            sorter: true,
            render: (_, { status }) => (
                <>
                    <StatusOrder status={status} />
                </>
            ),
        },
        {
            title: 'Thanh toán',
            key: 'payment',
            dataIndex: 'payment',
            sorter: true,
            render: (_, { payment }) => (
                <>
                    <StatusPayment payment={+payment} />
                </>
            ),
        },
        {
            title: 'Ngày đặt',
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
                        onConfirm={() => handDeleteOrder(record.id)}
                        placement="leftTop"
                        title={'Xác nhận xóa đơn này ?'}
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
    const handDeleteOrder = async (id) => {
        const res = await callDelOrder(id);
        if (res.success) {
            notification.success({ message: res.mes });
            fetchData()
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const fetchData = async () => {
        const { data, total } = await callOrderAndDetail(query);
        const all = await callAllOrder();
        setListOrder(data);
        setTotalPage(total);
        setListAllOrder(all)
    }
    const onSubmitUpdate = async (data) => {
        let res = await callUpdateOrder(data);
        if (res.success) {
            fetchData();
            notification.success({ message: res.mes });
            handleCancel();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const handleCancel = () => {
        setOpenEdit(false);
        update.reset();
    };
    const handleEdit = (record) => {
        setOpenEdit(true);
        update.setValue('status', record.status);
        update.setValue('payment', record.payment);
        update.setValue('id', record.id);
    }
    useEffect(() => {
        fetchData()
    }, [query])
    const onClose1 = () => {
        setViewDetail({ data: null, open: false });
    }
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination.current !== query.page) {
            setQuery(pre => ({ ...pre, page: pagination.current }))
        }
        if (pagination?.pageSize !== query.limit) {
            setQuery(pre => ({ ...pre, limit: pagination.pageSize }))
        }
        if (sorter && sorter.field) {
            let s = sorter.order === 'ascend' ? `asc` : `desc`;
            switch (sorter.field) {
                case 'payment':
                    setQuery(pre => ({ page: pre.page, sort_pay: s }));
                    break;
                case 'status':
                    setQuery(pre => ({ page: pre.page, sort_status: s }));
                    break;
                case 'created_at':
                    setQuery(pre => ({ page: pre.page, sort_created_at: s }));
                    break;
                case 'total':
                    setQuery(pre => ({ page: pre.page, sort_total: s }));
                    break;
                default:
                    break;
            }
        }

    }
    const submitSearch = (params) => {
        setQuery(pre => ({ ...pre, search: params.name }));
        search.reset();
    }
    return (
        <div className='admin_area'>
            <div className='mb-3'>
                <Row justify={'space-between'} align={'middle'}>
                    <Col xs={6} className='cap-form'> Danh sách đơn hàng</Col>
                    <Col xs={16} className='row-port'>
                        <FormProvider {...search}>
                            <form className='form-search' onSubmit={search.handleSubmit(submitSearch)}  >
                                <input className='input-search' placeholder='Tên , sđt , địa chỉ' type={'text'} name='name' {...search.register('name')} />
                                <button> <AiOutlineSearch /></button>
                            </form>
                        </FormProvider >
                        <ExportToExcel data={listAllOrder} fileName='ORDER' /> <button className='refresh' onClick={() => setQuery({ page: 1, limit: 10, sort_created_at: 'desc' })}><IoMdRefresh /></button>
                    </Col>
                </Row>
            </div>
            <Table columns={columns} dataSource={listOrder}
                rowKey={'id'} onChange={onChange}
                pagination={{
                    current: query.page,
                    pageSize: query.limit,
                    showSizeChanger: true,
                    total: totalPage,
                }} />


            <Drawer
                title={`Chi tiết sản phẩm`}
                placement="right"
                size={'large'}
                onClose={onClose1}
                open={viewDetail.data}
                key={'0'}
            >
                {viewDetail.data && (<>
                    <Descriptions title="Thông tin sản phẩm" column={2}>
                        <Descriptions.Item label="Tên người nhận">{viewDetail.data.nameReceiver}</Descriptions.Item>
                        <Descriptions.Item label="Tổng tiền">{formatGia(viewDetail.data.total)} </Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{viewDetail.data.address} </Descriptions.Item>
                    </Descriptions>
                    <Row gutter={[0, 24]} className='row_order'>
                        <Col xs={24} className='cap-form'>Giỏ hàng</Col>
                        {viewDetail.data?.detail.map(item => (<Col xs={24} key={item.name} >
                            <Col xs={24} className='row_order_name'>{item.product_name}</Col>
                            <Col xs={12} className='row_order_info'>Giá {formatGia(item.price)} - Số lượng</Col>
                        </Col>)
                        )}
                    </Row>
                </>
                )}
            </Drawer>
            <Modal className='modal-category' title="Thêm danh mục" open={openEdit} onCancel={handleCancel} footer={null}>
                <FormProvider {...update}>
                    <form className='form-area-category' onSubmit={update.handleSubmit(onSubmitUpdate)}  >
                        <h2 className='cap-form'>Chỉnh sủa thế loại sách</h2>
                        <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 32]}>

                            <Col md={24}> <Col className='mb-2'>Phương thức thanh toán</Col> <Col> <CustomSelectV2 name='payment' placeholder='Chọn bên dưới' options={PaymentOPtion()} /> </Col></Col>
                            <Col md={24}> <Col className='mb-2'>Trạng thái đơn hàng</Col> <Col> <CustomSelectV2 name='status' placeholder='Chọn bên dưới' options={StatusOPtion()} /> </Col></Col>
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

export default ListOrderAdmin