import React, { useState, useEffect } from 'react';
import { Popconfirm, Col, Row, Pagination, Modal, Table, Button, message, Image } from 'antd';
import './product.scss';
import { callProductPagination } from '../../../services/api';
import moment from 'moment';
import { IoMdRefresh } from 'react-icons/io';
import { ImBin } from 'react-icons/im';
import { AiFillEdit } from 'react-icons/ai';
import { TbFileExport } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { formatGia, formatNgay } from '../../../utils/format';
import { omitBy, isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
const ListProductAdmin = () => {
    const [listBook, setListBook] = useState([]);
    const [dataViewDetail, setDataViewDetail] = useState();
    const [openViewDetail, setOpenViewDetail] = useState(true);
    const [openCreate, setOpenCreate] = useState(true);
    const [query, setQuery] = useState({ page: 1, created_at: 'desc' });
    const navigate = useNavigate();
    const fetchBook = async () => {
        const queryConfig = omitBy(query, (value) => value === '');
        let res = await callProductPagination(queryConfig);
        setListBook(res);
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
            width: 500,
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
            // render: (text, record, index) => {
            //     return (
            //         <>
            //             <div className="btn_table">
            //                 <AiFillEdit
            //                     className="icon-edit"
            //                 // onClick={() => {
            //                 //     setOpenUpdateBook(true);
            //                 //     setDataUpdate(record);
            //                 // }}
            //                 />
            //                 <Popconfirm
            //                     // onConfirm={() => handDeleteBook(record._id)}
            //                     placement="leftTop"
            //                     title={'Xác nhận xóa cuốn sách này ?'}
            //                     okText="Xác nhận"
            //                     cancelText="Hủy"
            //                 >
            //                     <ImBin className="icon-delete" />
            //                 </Popconfirm>
            //             </div>
            //         </>
            //     );
            // },
        },
    ];

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
                <Col xs={24}>
                    <Row justify={'space-between'}>
                        <Col xs={6}><button className='btn_add-product' onClick={() => navigate('/admin/create-product')}>Thêm mới</button></Col>
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
            </Row>
        </div>
    )
}

export default ListProductAdmin