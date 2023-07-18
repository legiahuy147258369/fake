import React from 'react'
import { Pagination } from 'antd';
const PaginationMini = (props) => {
    const { total, setPageComment, pageComment } = props
    const handleChange = (page, pageSize) => {
        setPageComment(prev => { return { ...prev, page: page } });
    }
    return (
        <Pagination simple defaultCurrent={1} current={pageComment.page} total={total} onChange={handleChange} pageSize={5} />
    )
}

export default PaginationMini