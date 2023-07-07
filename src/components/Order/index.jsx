import React from 'react'
import { Result } from 'antd';
const Order = (props) => {
    return (
        <div className='bg-white'>
            <Result
                status="success"
                title="Cảm ơn bạn đã đặt hàng"
                subTitle="Chúng tôi luôn cố gắng mang đến cho mọi người những quyển sách hay nhất"
            />
        </div>
    )
}

export default Order