
import React from 'react'
import { Pagination } from 'antd';
import './index.scss'
const PaginationComponent = () => {
    return (
        <div className='pagination-area'><Pagination defaultPageSize={8} defaultCurrent={1} total={500} showSizeChanger={false} /></div>
    )
}

export default PaginationComponent