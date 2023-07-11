import { Col, Divider, Rate, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

import './detail.scss';

import { formatGia } from '../../utils/format';
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { callProductDetail, callTopView } from '../../services/api';
import _ from 'lodash';
import Loading from '../../components/Loading';
import SlideProduct from '../../components/slide-product';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { addToCart } from '../../redux/cart/cartSlice';
import QtyCart from '../../components/qty-cart';
import ThumbsSwiper from '../../components/thumb';
import { AiOutlinePlus } from 'react-icons/ai';
import { addToWishList } from '../../redux/wish/wishSlide';
import BreadcrumbCom from '../../components/breadcrumb';



const DetailProduct = () => {
    const [qty, setQty] = useState(1);
    const [showFullDescription, setFullDescription] = useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data: product } = useQuery({
        queryKey: ['product-detail', id],
        queryFn: () => {
            return callProductDetail(id);
        }
    });

    useEffect(() => {
        window.scrollTo(0, 0)
        setQty(1);
    }, [product]);
    const data = product && product[0];
    const { data: top } = useQuery({
        queryKey: ['product-top'],
        queryFn: () => {
            return callTopView();
        }
    });
    const description = showFullDescription
        ? data?.description
        : data?.description.slice(0, 200);

    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };

    const handleAddToCart = (quantity, data) => {
        dispatch(addToCart({ qty: quantity, detail: data }));
        setQty(1)
    };
    let img = ['https://cdn0.fahasa.com/media/catalog/product/c/o/combo-9786043129359-9786043356670.jpg', 'https://cdn0.fahasa.com/media/catalog/product/z/4/z4389778470937_2bf23e326e5ca521f95725baa0fd063d.jpg']
    return (
        <div className='product-detail-area'>
            <BreadcrumbCom />
            {_.isUndefined(data) ? <Loading /> :
                <>
                    <div className="product-essential mt-2">
                        <Row className='layout-detail pt-2'>
                            <Col className=' fl-between' md={24} lg={10}>
                                <Row className='box-img_row ' >
                                    {data.thumbnail.length > 0 && <ThumbsSwiper images={img} />}
                                </Row>
                            </Col>
                            <Col xs={24} md={24} lg={14} className='bg-white'>
                                <Row className='box-mota'>
                                    <Col xs={24}> <h1 className='line-h-1'>{data.name}</h1> </Col>
                                    <Col xs={24} className='des-author'>
                                        <Col md={8} xs={24}>
                                            Nhà cung cấp : <span>Nhà sách HCM</span>
                                        </Col>
                                        <Col md={8} xs={24}>
                                            Tác giả : <span>Lê Anh Tuấn</span>
                                        </Col>
                                        <Col md={8} xs={24}>
                                            Nhà xuất bản : <span>Thanh Niên</span>
                                        </Col>
                                        <Col md={8} xs={24}>
                                            Hình thức bìa : <span> Bìa Mềm</span>
                                        </Col>

                                    </Col>
                                    <Col className='box-mota__rate' xs={24}>
                                        <Rate /> <span> ( 0 lượt đánh giá)</span>
                                    </Col>
                                    <Col className='box-mota__price' xs={24}>
                                        <span className="current_price">{formatGia(120000)} </span>
                                        <span className='xt'>{formatGia(120000 * 1.1)}</span>
                                        <span className='price-percent'> 10 %</span>
                                    </Col >
                                    <Col className='box-mota_qty ' xs={24}>
                                        Số lượng :
                                        <QtyCart qty={qty} setQty={setQty} id={data.id} page={'detail'} />
                                    </Col>
                                    <Col className='my-2 fl-between'>
                                        <div className='add-to-cart' onClick={() => handleAddToCart(qty, data)}>Thêm vào giỏ hàng</div>
                                        <div className='shop-now'>Mua ngay</div>
                                    </Col>
                                    <Col xs={24} > <div className='add-wishlist' onClick={() => dispatch(addToWishList(data))}><AiOutlinePlus /> Danh sách yêu thích </div> </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className='product-topview'>
                        <h2 className='title-view fl'> <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_XuHuong_Thuong_120x120.png" />Sản phẩm khác</h2>
                        {top && <SlideProduct data={top} />}
                    </div>
                    <div className='product-info'>
                        <h2>Thông tin sản phẩm</h2>
                        <Row gutter={[16, 24]} className='mt-4'>
                            <Col className='fl-between' xs={24} md={16}><Col xs={12}>Mã hàng</Col><Col xs={12}>24442{data.id}</Col></Col>
                            <Col className='fl-between' xs={24} md={16}><Col xs={12}>Tên Nhà Cung Cấp</Col><Col xs={12}>Thanh Niên</Col></Col>
                            <Col className='fl-between' xs={24} md={16}><Col xs={12}>Năm Xuất bản</Col><Col xs={12}> {moment(data.publish_date).year()}</Col></Col>
                            <Col className='fl-between' xs={24} md={16}><Col xs={12}>Số trang</Col><Col xs={12}> {data.number_of_page}</Col></Col>
                        </Row>
                        <hr className='my-4' />

                        <div className='product-info_des'>
                            {
                                description && description.length > 0 ? <>
                                    <h2 className="name line-h-1">{data.name}</h2>
                                    <p className="text">{description}...</p>
                                    <div className='see-view ' onClick={showFullDescriptionHandler}>
                                        {showFullDescription ? "Thu gọn" : "Xem thêm"}
                                    </div>
                                </> : <div></div>
                            }

                        </div>
                    </div>
                    <div className='product-review'>
                        <h2 className='fs-25'>Đánh giá sản phẩm</h2>
                        <Row className="box-review">
                            <Col xs={10} className='box-review__detail'>  <span><b>0</b>/5</span> <span><Rate value={0} /></span>
                                (0 lượt đánh giá) </Col>
                            <Col xs={14} className='btn-review'> <div>Viết đánh giá</div></Col>
                        </Row>
                    </div>
                </>
            }

        </div>
    )
}

export default DetailProduct;

{/* <Col className='left-box' xs={6} >
                                {data && (
                                            <SlideshowLightbox theme='night' open={iShow} showThumbnails="false" showControls={true} className="thumbnail1 " >
                                                <img src={data.thumbnail} />
                                                <img src={data.thumbnail} />
                                                <img src={data.thumbnail} />
                                                <img src={data.thumbnail} />
                                                <img src={data.thumbnail} />
                                                <img src={data.thumbnail} />
                                            </SlideshowLightbox>)
                                        }
                                    </Col>
                                    <Col xs={18} className='w-100 fl-center'>
                                        <img className="thumbnail2" onClick={handLightBox} src={data.thumbnail} />
                                    </Col> */}