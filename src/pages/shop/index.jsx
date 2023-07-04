import React, { useEffect, useRef, useState } from 'react';
import BreadcrumbCom from '../../components/breadcrumb';
import { Col, Row, Rate, Slider, Select } from 'antd';
import './shop.scss';
import { callCategory, callProductPagination } from '../../services/api';
import { formatGia } from '../../utils/format';
import { BsCartPlus } from 'react-icons/bs';
import PaginationComponent from '../../components/pagination';
import useQueryConfig from '../../hooks/useQueryConfig';
import { useQuery } from '@tanstack/react-query';
import { Navigate, createSearchParams, useNavigate } from 'react-router-dom';
import { omit } from 'lodash';
import Product from '../../components/product';
const ShopPage = () => {
    const queryConfig = useQueryConfig();
    const navigate = useNavigate();
    const ref = useRef([0, 500000]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 500000])
    const itemsCat = useQuery({
        queryKey: ['categories'],
        queryFn: () => {
            return callCategory()
        }
    })
    const { data: products } = useQuery({
        queryKey: ['products', queryConfig],
        queryFn: () => {
            return callProductPagination(queryConfig)
        },
        keepPreviousData: true,
        staleTime: 3 * 60 * 1000
    });

    const handleFilterPrice = () => {
        console.log(minMaxPrice);
        navigate({
            pathname: '',
            search: createSearchParams({
                ...queryConfig,
                filterMaxPrice: minMaxPrice[1],
                filterMinPrice: minMaxPrice[0]
            }).toString()
        })
    }
    const handleFilterCat = (id) => {
        navigate({
            pathname: '',
            search: createSearchParams({
                ...queryConfig,
                category: id
            }).toString()
        })
    }

    const handleChangeSortPrice = (value) => {
        navigate({
            pathname: '',
            search: createSearchParams({
                ...queryConfig,
                sort: value
            }).toString()
        })
    };

    const handelRefresh = () => {
        navigate({
            pathname: '',
            search: createSearchParams(omit(queryConfig, ['page', 'limit', 'sort', 'search', 'filterMaxPrice', 'filterMinPrice', 'category'])).toString()
        })
    }
    return (
        <>
            <BreadcrumbCom />
            <div className='shop-area '>

                <Row className='box-shop' justify="space-between"  >
                    <Col className='left-box-shop ' xs={0} md={0} lg={6} >
                        <div className='box-container'>
                            <div className="filter-cat pt-3">
                                <h3 className='title-filter'>Thể loại</h3>
                                <Row className='box-filter '>
                                    {itemsCat?.data?.map((item, i) => {
                                        return (
                                            <Col lg={20} className='item-category' key={i}>
                                                <a onClick={() => handleFilterCat(item.id)} > {item.name} </a>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </div>

                            <div className='filter-price mt-2'>
                                <h3 className='title-filter '>Lọc theo giá</h3>
                                <div
                                    className='p-2'>
                                    <div className='fl-between'><div>Từ : {formatGia(minMaxPrice[0])}</div> <div>Đến : {formatGia(minMaxPrice[1])} </div> </div>
                                    <Slider
                                        className='slide-price'
                                        range={{
                                            draggableTrack: true,
                                        }}
                                        step={50000}
                                        max={500000}
                                        defaultValue={minMaxPrice}
                                        onChange={(value) => {
                                            setMinMaxPrice(value)
                                        }}
                                    />
                                    <div className='btn-apply mt-4' onClick={handleFilterPrice}>Lọc theo giá</div>

                                </div>
                            </div>
                            <div className='rate-area mt-2'>
                                <h3 className='title-filter '>Lượt đánh giá</h3>
                                <div className='ms-4 mt-2'>
                                    <div> <Rate defaultValue={5} /></div>
                                    <div> <Rate defaultValue={4} /></div>
                                    <div> <Rate defaultValue={3} /></div>
                                    <div> <Rate defaultValue={2} /></div>
                                    <div> <Rate defaultValue={1} /></div>
                                </div>

                            </div>
                            <div className='cs refresh' onClick={handelRefresh}>Xóa tất cả</div>
                        </div>

                    </Col>
                    <Col className='right-box-shop' xs={24} lg={18}  >
                        <Row gutter={[8, 8]} justify={'center'} className='box-area-sort'>
                            <Col className='box-total' md={12} ><div className='fs-1-5 fw-5'>Tổng: {products?.total} sản phẩm </div></Col>
                            <Col className='box-sort fs-1-5 fw-5' md={12}  >
                                <div className='text-des'>Sắp xếp theo giá :</div>
                                <Select className='ps-2 '
                                    defaultValue="asc"
                                    style={{
                                        width: 180,
                                    }}
                                    onChange={handleChangeSortPrice}
                                    options={[
                                        {
                                            value: 'asc',
                                            label: 'Giá tăng dần',
                                        },
                                        {
                                            value: 'desc',
                                            label: ' Giá giảm dần',
                                        }
                                    ]}
                                /></Col>
                        </Row>
                        <Row gutter={[8, 8]}>
                            {
                                products && products.data && products.data.map((item, i) => {
                                    return (
                                        <Col xs={12} md={6} key={i}><Product item={item} /></Col>


                                    )
                                })
                            }
                        </Row>

                        <PaginationComponent queryConfig={queryConfig} pageSize={products?.total} />
                    </Col>
                </Row >

            </div >
        </>
    )
}

export default ShopPage