import React from 'react'
import { Tag } from 'antd';
const StatusOrder = ({ status }) => {
    let re;
    switch (+status) {
        case 0:
            re = <Tag color="warning">Hủy đơn hàng</Tag>
            break;
        case 1:
            re = <Tag color="magenta">Đơn hàng mới</Tag>
            break;
        case 2:
            re = <Tag color="lime">Đơn hàng đang giao</Tag>
            break;
        case 3:
            re = <Tag color="cyan">Đơn hàng đã giao</Tag>
            break;
        case 4:
            re = <Tag color="geekblue">Hoàn tất đơn hàng</Tag>
            break;
        default:
            break;
    }
    return (
        <>{re}</>
    )
}
const StatusOPtion = () => {
    return [
        { value: 0, label: 'Hủy đơn hàng' },
        { value: 1, label: 'Đơn hàng mới' },
        { value: 2, label: 'Đơn hàng đang giao' },
        { value: 3, label: 'Đơn hàng đã giao' },
        { value: 4, label: 'Hoàn tất đơn hàng' },

    ]
}
const PaymentOPtion = () => {
    return [
        { value: 0, label: 'Chưa thanh toán' },
        { value: 1, label: 'Đã thanh toán' },

    ]
}
const StatusPayment = ({ payment }) => {
    let result
    if (payment === 0) {
        result = <Tag color="blue">Chưa thanh toán</Tag>
    } else {
        result = <Tag color="green">Đã thanh toán</Tag>
    }
    return <>{result}</>
}
export { StatusOrder, StatusPayment, StatusOPtion, PaymentOPtion };