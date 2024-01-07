import React, { useState, useEffect } from 'react'
import { Col, Modal, Popconfirm, Row, Table, notification } from 'antd';
import { formatNgay, gender } from '../../../utils/format';
import { callAllUser, callDelUser, callUpdateUserAdmin } from '../../../services/api';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { schema } from '../../../utils/rule';
import CustomInputV2 from '../../../components/input-custom/input-v2';
import CustomSelectV2 from '../../../components/select/select-v2';
import ExportToExcel from '../../components/ExportExcel';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
const ListUserAdmin = () => {
    const search = useForm();
    const updateSchema = schema.pick(['role', 'password', 'id', 'name']);
    const update = useForm({ resolver: yupResolver(updateSchema) });
    const [listUser, setListUser] = useState([]);
    // const [listAllUserExport, setListUserExport] = useState([]);
    const [query, setQuery] = useState({ page: 1 });
    const [openEdit, setOpenEdit] = useState(false);
    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            width: 50,
            sorter: true,
            render: (text, record, index) => {
                return (
                    <a
                        onClick={() => {
                            // setDataViewDetail(record);
                            // setOpenViewDetail(true);
                        }}
                    >
                        {record.id}
                    </a>
                );
            },
        },
        {
            title: 'Họ và tên ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (text, record) => {
                return <span>{gender().find(item => item.value === +record.gender).label}</span>;
            },
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            sorter: true,
            render: (text, record) => {
                return (
                    <span>{+record.role === 1 ? 'ADMIN' : 'USER'}</span>
                )
            }
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: true,
            render: (text, record) => {
                return <span >{formatNgay(record.created_at)}</span>;
            },
        },
        {
            title: 'Chỉnh sửa',
            key: 'Chỉnh sửa',
            render: (text, record) => {
                return (
                    <>
                        <div className="btn_table">
                            <FiEdit2
                                className="icon-edit"
                                onClick={() => handleEdit(record)}
                            />
                            <Popconfirm
                                onConfirm={() => handDeleteUser(record.id)}
                                placement="leftTop"
                                title={'Xác nhận xóa tài khoản này ?'}
                                okText="Xác nhận"
                                cancelText="Hủy"
                            >
                                <RiDeleteBin7Line className="icon-delete" />
                            </Popconfirm>
                        </div>
                    </>
                );
            },
        },
    ];

    const fetchData = async () => {
        const res = await callAllUser(query);
        setListUser(res);
    }
    useEffect(() => {
        fetchData()
    }, [query]);

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination.current !== query.page) {
            setQuery(pre => ({ ...pre, page: pagination.current }))
        }
        if (sorter && sorter.field) {
            const s = sorter.order === 'ascend' ? `asc` : `desc`;
            setQuery(pre => ({ ...pre, val_sort: s, sort: sorter.field }));
        }
    };
    const handDeleteUser = async (id) => {
        const res = await callDelUser(id);
        if (res.success) {
            notification.success({ message: res.mes });
            fetchData()
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const onSubmitUpdate = async (data) => {
        let res = await callUpdateUserAdmin(data);
        if (res.success) {
            fetchData();
            notification.success({ message: res.mes });
            handleCancel();
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    const handleEdit = (record) => {
        setOpenEdit(true);
        update.setValue('role', record.role);
        update.setValue('password', record.password);
        update.setValue('id', record.id);
        update.setValue('name', record.name);
    }

    const role = () => {
        return [
            { label: 'USER', value: 0 },
            { label: 'ADMIN', value: 1 }
        ]
    }
    const handleCancel = () => {
        setOpenEdit(false);
        update.reset();
    };
    const submitSearch = (params) => {
        setQuery(pre => ({ ...pre, search: params.name }));
        search.reset();
    }
    return (
        <div className='user_admin_area'>
            <Row gutter={[0, 16]}>
                <Col xs={24} >
                    <Row align={'middle'}>
                        <Col xs={6} className='cap-form'>Danh sách tài khoản</Col>
                        <Col xs={18} className='row-port'>
                            <div></div>
                            <FormProvider {...search}>
                                <form className='form-search' onSubmit={search.handleSubmit(submitSearch)}  >
                                    <input className='input-search' placeholder='Tên , sđt , email' type={'text'} name='name' {...search.register('name')} />
                                    <button> <AiOutlineSearch /></button>
                                </form>
                            </FormProvider >
                            <ExportToExcel data={listUser.export} fileName='USER' />
                            <button className='refresh' onClick={() => setQuery({ page: 1 })}><IoMdRefresh /></button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24}>
                    <Table columns={columns}
                        dataSource={listUser.data}
                        onChange={onChange}
                        rowKey={'id'}
                        pagination={{
                            current: query.page,
                            pageSize: 10,
                            showSizeChanger: true,
                            total: listUser.total,
                        }} />
                </Col>
            </Row>

            <Modal className='modal-category' open={openEdit} onCancel={handleCancel} footer={null}>
                <FormProvider {...update}>
                    <form className='form-area-category' onSubmit={update.handleSubmit(onSubmitUpdate)}  >
                        <h2 className='cap-form'>Cập nhật tài khoản</h2>
                        <Row className='row-form' justify={'start'} align={'top'} gutter={[0, 32]}>
                            <Col md={24}> <Col className='mb-2'>Họ và tên</Col> <Col> <CustomInputV2 name='name' placeholder='Vui lòng nhập Họ và tên' disabled={true} /> </Col></Col>
                            <Col md={24}> <Col className='mb-2'>Vai trò</Col> <Col> <CustomSelectV2 name='role' placeholder='Chọn bên dưới' options={role()} /> </Col></Col>
                            <Col md={24}> <Col className='mb-2'>Mật khẩu</Col> <Col> <CustomInputV2 name='password' placeholder='Nhập mật khẩu' /> </Col></Col>
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

export default ListUserAdmin