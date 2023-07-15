import React from 'react'
import { Tag } from 'antd';
const StatusOrder = ({ status }) => {
    let re;
    switch (+status) {
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
const StatusPayment = ({ payment }) => {
    let result
    if (payment === 0) {
        result = <Tag color="blue">Chưa thanh toán</Tag>
    } else {
        result = <Tag color="green">Đã thanh toán</Tag>
    }
    return <>{result}</>
}
export { StatusOrder, StatusPayment } 