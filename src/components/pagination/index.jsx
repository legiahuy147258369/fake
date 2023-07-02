
import React from 'react'
import { Pagination } from 'antd';
import './index.scss'
import { Link, createSearchParams } from 'react-router-dom';
const PaginationComponent = (props) => {
    const { queryConfig, pageSize } = props;
    const itemRender = (page, type, originalElement) => {
        if (type === 'page') {
            return <Link to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}>{page}</Link>;
        }
        return originalElement;
    };

    return (
        <div className='pagination-area'><Pagination
            defaultPageSize={queryConfig.page} defaultCurrent={queryConfig.page}
            total={pageSize} pageSize={queryConfig.limit} itemRender={itemRender} /></div>
    )
}

export default PaginationComponent