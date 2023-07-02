import React, { useEffect, useState } from 'react';
import BreadcrumbCom from '../../components/breadcrumb';
import { Col, Row, Rate, Slider } from 'antd';
import './shop.scss';
import { callCategory, callProductPagination } from '../../services/api';
import { formatGia } from '../../utils/format';
import { BsCartPlus } from 'react-icons/bs';
import PaginationComponent from '../../components/pagination';
const ShopPage = () => {
    const [itemsCat, setItemsCat] = useState([]);
    const [products, setProducts] = useState([]);
    const [valuePrice, setValuePrice] = useState([0, 500000]);
    const getData = async () => {
        let data = await callCategory();
        let d = await callProductPagination();

        setItemsCat(data);
        setProducts(d);
    };

    const handlePrice = (params) => {
        setValuePrice(params);
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <>
            <BreadcrumbCom />
            <div className='shop-area '>

                <Row className='box-shop' justify="space-between"  >
                    <Col className='left-box-shop ' xs={0} md={0} lg={6} >
                        <div className='box-container-cat'>
                            <h3 className='title-filter'>Thể loại</h3>
                            <Row className='box-filter'>
                                {itemsCat.map((item, i) => {
                                    return (
                                        <Col lg={20} className='item-category' key={i}>
                                            <a> {item.name} </a>
                                        </Col>
                                    )
                                })}
                            </Row>


                            <div className='filter-price'>
                                <h3 className='title-filter '>Lọc theo giá</h3>
                                <div
                                    className='p-2'>
                                    <div className='fl-between'><div>Từ : {formatGia(valuePrice[0])}</div> <div>Đến : {formatGia(valuePrice[1])} </div> </div>
                                    <Slider
                                        className='slide-price'
                                        range={{
                                            draggableTrack: true,
                                        }}
                                        step={50000}
                                        max={500000}
                                        defaultValue={valuePrice}
                                        onChange={(value) => {
                                            handlePrice(value)
                                        }}
                                    />
                                </div>

                            </div>

                        </div>

                    </Col>
                    <Col className='right-box-shop' xs={24} lg={18}  >
                        <Row gutter={[8, 8]}>
                            {
                                products.map((item, i) => {
                                    return (
                                        <Col xs={12} md={6} key={i}>
                                            <div className='product'>
                                                <img src={item.thumbnail} />
                                                <p>{item.name}</p>
                                                <div><Row className='box-price'> <Col className='price' xs={12}>{formatGia(item.price)}</Col> <Col xs={12} className='price-cover'>{formatGia(item.price * 1.1)} </Col> </Row></div>
                                                <div className='my-3'>
                                                    <Row className='box-cart'>
                                                        <Col className='fl cs text-cart' xl={10} xs={0}> Add to cart</Col>
                                                        <Col className='cart cs' xs={6} lg={6} xl={4}> <span className='icon-cart'><BsCartPlus /></span></Col>
                                                        <Col className='rating' xs={18} lg={18} xl={10}><Rate defaultValue={item.rating} /></Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                            }


                        </Row>
                        <PaginationComponent />
                    </Col>
                </Row >

            </div >
        </>
    )
}

export default ShopPage