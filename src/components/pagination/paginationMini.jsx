import React from 'react'
import { Pagination } from 'antd';
const PaginationMini = (props) => {
    const { total, setPage, page, limit } = props;
    const pageSize = limit || 5;
    const handleChange = (page, pageSize) => {
        setPage(prev => { return { ...prev, page: page } });
    }
    return (
        <Pagination simple defaultCurrent={1} current={page.page} total={total} onChange={handleChange} pageSize={pageSize} />
    )
}

export default PaginationMini