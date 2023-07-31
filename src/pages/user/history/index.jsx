import React, { useState } from 'react'
import '../account.scss';
import { Col, Divider, Empty, Image, Popconfirm, Row, Segmented, Select, Tag, Tooltip, notification } from 'antd';
import { StatusOPtion } from '../../../components/status-order';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callOrderAndDetail, callUpdateOrderUser } from '../../../services/api';
import CustomSelectV2 from '../../../components/Select/SelectV2';
import PaginationMini from '../../../components/pagination/paginationMini'
import { formatGia, formatNgay } from '../../../utils/format';
import moment from 'moment';
const History = () => {

    const [orders, setOrders] = useState();
    const user = useSelector((state) => state.account.user);
    const [query, setQuery] = useState({ page: 1, filter_status: 1, user_id: user.id });

    const fetchData = async () => {
        const res = await callOrderAndDetail(query);
        console.log(res.total);
        setOrders({ data: res.data, total: res.total });
    }
    useEffect(() => {
        fetchData();
    }, [query]);
    const handleChange = async (value, option, name) => {
        setQuery(pre => ({ ...pre, filter_status: value }))
    }
    const handleOrderUser = async (id, type) => {
        const status = type === 'cancel' ? 0 : 1;
        const formattedTimestamp = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const res = await callUpdateOrderUser({ id, status: status, created_at: formattedTimestamp });
        if (res.success) {
            setQuery(pre => ({ ...pre, filter_status: status }))
            notification.success({ message: res.mes });
        } else {
            notification.info({ message: 'Có lỗi xảy ra' });
        }
    }
    return (
        <div className='history_area'>
            <Row gutter={[0, 24]} >
                <Col xs={24} className='cap-form'>Lịch sử đơn hàng</Col>
                <Col xs={24} className='fl-center '>
                    <div className='col-status-lg'> <Segmented size='large' value={query.filter_status} options={StatusOPtion()} onChange={handleChange} /></div>
                    <div className='col-status-xs'> <Select options={StatusOPtion()} defaultValue={1} className='w-100' /></div>
                </Col>

                <Col xs={24}>
                    {orders?.data && orders?.data?.length > 0 ?
                        <><div className='box_order p-2'>
                            {orders?.data?.map((item) => {
                                return (
                                    <div className='box_order_detail' key={item.id}>
                                        <div className='w-100 mt-1'>
                                            <div className='box_order_detail_cap'>
                                                <div>Mã đơn hàng : <span className='fs-1-5 fw-5'> #WU3746HGG{item.id} </span></div>
                                                {[1, 2].includes(item.status) && <Popconfirm
                                                    title="Hủy mua hàng"
                                                    description={`Bạn muốn hủy #WU3746HGG${item.id} ?`}
                                                    okText="Hủy đơn hàng"
                                                    cancelText="Thoát"
                                                    onConfirm={() => handleOrderUser(item.id, 'cancel')}
                                                >
                                                    <div className='btn-cancel-order' >Hủy đơn</div>
                                                </Popconfirm>
                                                }
                                            </div>

                                            <Divider />
                                        </div>
                                        <div className='box_order_detail_info'>
                                            <div>Tên người nhận : {item.nameReceiver}</div>
                                            <div>SĐT người nhận : 0{item.phoneReceiver}</div>
                                            <div>Ngày mua : {formatNgay(item.created_at)}</div>
                                            <div>Phương thức thanh toán :
                                                {item.payment === 1 ?
                                                    <span> Đã thanh toán</span>
                                                    : <span> COD</span>}
                                            </div>
                                            <div>Tổng tiền : {formatGia(item.total)}</div>
                                            <div>Địa chỉ giao hàng : <Tooltip placement="topLeft" title={item.address}>
                                                <span>{item.address.slice(0, 20)} ...</span>
                                            </Tooltip></div>
                                            <Divider />
                                        </div>

                                        <div className='box_order_detail_product'>
                                            {item.detail.map(item => (
                                                <div key={item.product_name} className='box_order_detail_product_row'>
                                                    <div className='col_img'>
                                                        <img src={item.thumb} />
                                                    </div>
                                                    <div className='col'>
                                                        <div> <Tag color="#f50">Đổi trả trong vòng 7 ngày</Tag></div>
                                                        <div>{item.product_name}</div>
                                                        <div>Giá bán : {formatGia(item.price)}</div>
                                                        <div>Số lượng : {item.quantity}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {[0].includes(item.status) && <div className='re-order' onClick={() => { handleOrderUser(item.id, null) }}>
                                            Mua lại sản phẩm trên
                                        </div>}
                                    </div>
                                )
                            })}

                        </div>
                            <Divider />
                            <div className='box_pagination'>
                                <PaginationMini setPage={setQuery} page={query} total={orders?.total} limit={10} />
                            </div>
                            <Divider />
                        </>
                        : <div> <Empty /> </div>
                    }


                </Col>

            </Row>
        </div>
    )
}

export default History