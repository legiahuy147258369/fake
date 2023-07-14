
import React from 'react'
import { Pagination } from 'antd';
import './index.scss';

import { Link, useNavigate, createSearchParams } from 'react-router-dom';
const PaginationComponent = (props) => {
    const { queryConfig, pageSize } = props;
    const navigate = useNavigate()
    const onShowSizeChange = (current, pageSize) => {
        navigate({
            pathname: '',
            search: createSearchParams({
                ...queryConfig,
                limit: pageSize
            }).toString()
        })
    };
    const itemRender = (page, type, originalElement) => {
        if (type === 'jump-prev') {
            return <Link to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}>...</Link>;
        }
        if (type === 'jump-next') {
            return <Link to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}>...</Link>;
        }
        if (type === 'page') {
            return <Link to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}>{page}</Link>;
        }
        if (type === 'prev') {
            return <Link className='fl-center' to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}> Prev </Link>;
        }
        if (type === 'next') {
            return <Link className='fl-center' to={{
                pathname: '', search: createSearchParams({
                    ...queryConfig,
                    page: page
                }).toString()
            }}> Next </Link>;
        }
        return originalElement;
    };

    return (
        <div className='pagination-area'><Pagination
            defaultPageSize={queryConfig.page}
            defaultCurrent={queryConfig.page}
            total={pageSize} pageSize={queryConfig.limit}
            itemRender={itemRender}
            onShowSizeChange={onShowSizeChange}
            showSizeChanger
            pageSizeOptions={[5, 10, 15, 20, 30]}
        /></div>
    )
}

export default PaginationComponent