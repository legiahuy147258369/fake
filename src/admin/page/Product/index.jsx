import React, { useState, useEffect } from 'react';
import { Popconfirm, Col, Row, Table, message, Image, notification, Drawer, Descriptions } from 'antd';
import '../../style.scss';
import { callCategory, callDelProduct, callProductPagination } from '../../../services/api';

import { IoMdRefresh } from 'react-icons/io';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { FiEdit2 } from 'react-icons/fi';

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { formatGia, formatNgay } from '../../../utils/format';
import { omitBy, isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import LoadingSnip from '../../../components/Loading/LoadingSpin';
import EditProduct from './editProduct';
import { FormProvider, useForm } from 'react-hook-form';
import ExportToExcel from '../../components/ExportExcel';
const ListProductAdmin = () => {
    const search = useForm();

    const [loading, setLoading] = useState(false);
    const [listBook, setListBook] = useState([]);
    const [dataViewDetail, setDataViewDetail] = useState({});
    const [openViewDetail, setOpenViewDetail] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [openDrawEdit, setOpenDrawEdit] = useState(false);
    const [query, setQuery] = useState({ page: 1, created_at: 'desc' });
    const [cat, setCat] = useState();
    const navigate = useNavigate();
    const fetchBook = async () => {
        setLoading(true);
        const queryConfig = omitBy(query, (value) => value === '');
        let res = await callProductPagination(queryConfig);
        let cat = (await callCategory()).map(item => ({
            value: item.id,
            label: item.name,
        }))
        setListBook(res);
        setCat(cat);
        setLoading(false);
    };
    useEffect(() => {
        fetchBook()
    }, [query]);
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
                            setDataViewDetail(record);
                            setOpenViewDetail(true);
                        }}
                    >
                        {record.id}
                    </a>
                );
            },
        },
        {
            title: <div className='text-center'>Ảnh</div>,
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 100,
            render: (text, record, index) => {
                return <Image
                    src={record.thumbnail}
                    preview={{ src: record.thumbnail }}
                />;
            },
        },
        {
            title: 'Tên sách ',
            dataIndex: 'name',
            key: 'name',
            width: 400,
        },
        {
            title: 'Thể loại',
            dataIndex: 'name_category',
            key: 'name_category',
            sorter: true,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            sorter: true,
            render: (text, record, index) => {
                return <span>{formatGia(record.price)}</span>;
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: true,
        },
        {
            title: 'Ngày cập nhật',
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
                return (
                    <>
                        <div className="btn_table">
                            <FiEdit2
                                className="icon-edit"
                                onClick={() => {
                                    setOpenDrawEdit(true);
                                    setDataEdit(record)
                                }}
                            />
                            <Popconfirm
                                onConfirm={() => handDeleteBook(record.id)}
                                placement="leftTop"
                                title={'Xác nhận xóa cuốn sách này ?'}
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
    const handDeleteBook = async (id) => {
        const res = await callDelProduct(id);
        if (res) {
            notification.success({ message: res });
            fetchBook();
        }
    }
    const submitSearch = (params) => {
        setQuery(pre => ({ ...pre, search: params.name }));
        search.reset();
    }
    const onClose1 = () => {
        setOpenViewDetail(false);
        setDataViewDetail({});
    };
    const onClose2 = () => {
        setOpenDrawEdit(false)
        setDataEdit({})
    };
    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination.current !== query.page) {
            setQuery(pre => ({ ...pre, page: pagination.current }))
        }
        if (sorter && sorter.field) {
            if (sorter.field === 'name_category') {
                const s = sorter.order === 'ascend' ? `asc` : `desc`;
                setQuery(pre => ({ page: pre.page, sort_category: s }));
            }
            if (sorter.field === 'price') {
                const s = sorter.order === 'ascend' ? `asc` : `desc`;
                setQuery(pre => ({ page: pre.page, sort: s }));
            }
            if (sorter.field === 'quantity') {
                const s = sorter.order === 'ascend' ? `asc` : `desc`;
                setQuery(pre => ({ page: pre.page, quantity: s }));
            }
            if (sorter.field === 'created_at') {
                let s = sorter.order === 'ascend' ? `asc` : `desc`;
                setQuery(pre => ({ page: pre.page, created_at: s }));
            }
        }

    };

    return (
        <div className='product_admin_area'>
            <Row gutter={[16, 8]} justify={'start'}>
                <Col xs={24} className='cap-form'>Danh sách sản phẩm</Col>
                <Col xs={24}>
                    <Col xs={4}></Col>
                    <Row justify={'space-between'}>
                        <Col xs={6}><button className='btn_add' onClick={() => navigate('/admin/create-product')}>Thêm mới</button></Col>
                        <Col xs={18}>
                            <div className='row-port'>
                                <FormProvider {...search}>
                                    <form className='form-search' onSubmit={search.handleSubmit(submitSearch)}  >
                                        <input className='input-search' placeholder='Tên sách' type={'text'} name='name' {...search.register('name')} />
                                        <button> <AiOutlineSearch /></button>
                                    </form>
                                </FormProvider >
                                <ExportToExcel data={[]} fileName='PRODUCT' /> <button className='refresh' onClick={() => setQuery({ page: 1, created_at: 'desc' })}><IoMdRefresh /></button>
                            </div>
                        </Col>
                    </Row>

                </Col>
                <Col span={24}>
                    <Table
                        columns={columns}
                        dataSource={listBook.data}
                        onChange={onChange}
                        rowKey={'id'}
                        pagination={{
                            current: query.page,
                            pageSize: 10,
                            showSizeChanger: true,
                            total: listBook.total,
                        }}
                    />
                </Col>
                <Drawer
                    title={`Chi tiết sản phẩm`}
                    placement="right"
                    size={'large'}
                    onClose={onClose1}
                    open={openViewDetail}
                    key={'0'}
                >
                    {dataViewDetail && (
                        <><Descriptions title="Thông tin sản phẩm" column={2}>
                            <Descriptions.Item label="Tên sản phẩm">{dataViewDetail.name}</Descriptions.Item>
                            <Descriptions.Item label="Giá">{formatGia(dataViewDetail.price)} </Descriptions.Item>
                            <Descriptions.Item label="Mô tả">{dataViewDetail.description?.slice(0, 30)}</Descriptions.Item>
                            <Descriptions.Item label="Ngày công bố">{formatNgay(dataViewDetail.publish_date)}</Descriptions.Item>
                            <Descriptions.Item label="Tác giả">
                                {dataViewDetail.author || 'Trống'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số lượng">
                                {dataViewDetail.quantity}

                            </Descriptions.Item>
                            <Descriptions.Item label="Lượt bán">
                                {dataViewDetail.sold}
                            </Descriptions.Item>
                            <Descriptions.Item label="Số trang">
                                {dataViewDetail.number_of_page}
                            </Descriptions.Item>
                            <Descriptions.Item label="Thế loại">
                                {dataViewDetail.name_category}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">
                                {formatNgay(dataViewDetail.created_at)}
                            </Descriptions.Item>

                        </Descriptions>
                            <Row gutter={[10, 20]}>
                                <Col xs={12}>Ảnh thumbnail :
                                    <Col className='mt-3'><Image src={dataViewDetail.thumbnail} width={100} /></Col>
                                </Col>

                                {dataViewDetail?.images && <Col xs={12}>
                                    <Row gutter={[10, 20]}>
                                        <Col xs={24}>Ảnh phụ :</Col>
                                        {dataViewDetail?.images && JSON.parse(dataViewDetail?.images).map(item => <Col key={item.id} xs={24}><Image src={item.url} width={100} /></Col>)}
                                    </Row>

                                </Col>
                                }
                            </Row>
                        </>)}
                </Drawer>
            </Row>
            <Drawer
                title="Chỉnh sửa sản phẩm"
                placement='right'
                onClose={onClose2}
                open={openDrawEdit}
                key={1}
                width={1000}
            >
                <EditProduct book={dataEdit} cat={cat} setLoading={setLoading}
                    fetchBook={fetchBook}
                    setOpenDrawEdit={setOpenDrawEdit} />
            </Drawer>
            {loading && <LoadingSnip />}
        </div>
    )
}

export default ListProductAdmin