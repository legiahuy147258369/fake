import React from 'react';
import { Card, Row, Col, Statistic, Space, Table, Tag, Divider } from 'antd';
import '../../style.scss';
import { BsBook } from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import { LuUsers } from 'react-icons/lu';
import { FaShippingFast } from 'react-icons/fa';
import { formatGia } from '../../../utils/format';
import { ChartPie } from '../../components/chart';
import { StatusOrder, StatusPayment } from '../../../components/status-order';
import { callAllOrder } from '../../../services/api';
import { useQuery } from '@tanstack/react-query';
import ChartLine from '../../components/chart/chart-line';
import ProductSold from '../../components/chart/chart-sold';

const columns = [
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone'
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Trạng thái ',
        key: 'status',
        dataIndex: 'status',
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
        render: (_, { payment }) => (
            <>
                <StatusPayment payment={+payment} />
            </>
        ),
    }
];

const Dashboard = () => {
    const { data: dataOrder } = useQuery({
        queryKey: ['order_all'],
        queryFn: () => {
            return callAllOrder();
        }
    });
    const data = dataOrder && dataOrder.map(item => {
        let er = {
            key: item.id, name: item.nameReceiver, phone: +item.phoneReceiver,
            address: item.address, status: item.status, payment: item.payment
        }
        return er
    })
    return (
        <div className='dashboard-area'>
            <Card title="Dashboard" className='card-area' >
                <Row gutter={[16, 0]} className='card-area__row'>
                    <Col xs={6}>
                        <Card.Grid className='card-area__row__col'>
                            <Col span={17} className='col-1'>
                                <Statistic title="Sản phẩm" value={20} />
                            </Col>
                            <Col span={7} className='col-2'>
                                <BsBook className='icon' size={30} />
                            </Col>
                        </Card.Grid>
                    </Col>
                    <Col xs={6}>
                        <Card.Grid className='card-area__row__col'>
                            <Col span={17} className='col-1'>
                                <Statistic title="Khách hàng" value={1793} />
                            </Col>
                            <Col span={7} className='col-2'>
                                <LuUsers className='icon' size={30} />
                            </Col>
                        </Card.Grid>
                    </Col>
                    <Col xs={6}>
                        <Card.Grid className='card-area__row__col'>
                            <Col span={17} className='col-1'>
                                <Statistic title="Đơn hàng" value={11793} />
                            </Col>
                            <Col span={7} className='col-2'>
                                <FaShippingFast className='icon' size={30} />
                            </Col>
                        </Card.Grid>
                    </Col>
                    <Col xs={6}>
                        <Card.Grid className='card-area__row__col'>
                            <Col span={17} className='col-1'>
                                <Statistic title="Bình luận" value={13} />
                            </Col>
                            <Col span={7} className='col-2'>
                                <AiOutlineComment className='icon' size={30} />
                            </Col>
                        </Card.Grid>
                    </Col>
                </Row>
            </Card >
            <Row className='chart_product-order' gutter={[0, 32]} justify={'space-between'}>
                <Col md={8}>
                    <div className='text-center title_chart mt-3 mb-3'>Biểu đô thống kê sản phẩm</div>
                    <ChartPie />
                </Col>
                <Col md={16}>
                    <div className='text-center title_chart mt-3 mb-3'>Biểu đô bán hàng</div>
                    <ChartLine />

                </Col>
                <Col xs={24}>
                    <Divider />
                    <div className='text-center title_chart mt-3 mb-3'>Đơn hàng gần đây</div>
                    <Table columns={columns} dataSource={data} />
                </Col>
                <Col xs={24} className='top_sale_product'>
                    <Divider />
                    <Col xs={12} className='title_chart'>Sản phẩm bán ra cao nhất</Col>
                    <Col xs={22}>
                        <ProductSold />
                    </Col>
                </Col>

            </Row>
        </div>

    )
}

export default Dashboard