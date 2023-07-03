import { Col, Divider, Image, Rate, Row, Skeleton, Collapse } from 'antd';
import React, { useState } from 'react';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import './detail.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { formatGia } from '../../utils/format';
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import { callProductDetail, callTopView } from '../../services/api';
import _ from 'lodash'
import Loading from '../../components/Loading';
import SlideProduct from '../../components/slide-product';
import LoadingProduct from '../../components/Loading/loadingProduct';
import moment from 'moment'
const DetailProduct = () => {
    const [qty, setQty] = useState(1);
    const [showFullDescription, setFullDescription] = useState(false);
    const { id } = useParams();
    const { data: product } = useQuery({
        queryKey: ['product-detail'],
        queryFn: () => {
            return callProductDetail(id)
        }
    });
    const data = product && product[0];
    const { data: top } = useQuery({
        queryKey: ['product-top'],
        queryFn: () => {
            return callTopView();
        }
    });
    const description = showFullDescription
        ? data.description
        : data.description.slice(0, 200);
    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };
    const handleChangeQty = (type) => {
        if (type === 'MINUS') {
            if (qty - 1 <= 0) return;
            setQty(qty - 1);
        }
        if (type === 'PLUS') {
            if (qty === +20) return;
            setQty(qty + 1);
        }
    };
    const handleChangeInputQty = (event) => {
        let t = event.target.value;
        if (t > +20) setQty(20);
        setQty(t);
    }
    return (
        <div className='product-detail-area'>
            {_.isUndefined(data) ? <Loading /> :
                <>
                    <div className="product-essential">
                        <Row className='layout-detail'>
                            <Col className=' fl-between' lg={10}>
                                <Row className='box-img_row' >
                                    <Col className='left-box' xs={6}>
                                        {data && (
                                            <SlideshowLightbox theme='night' showThumbnails="false" showControls={true} className="thumbnail1 " >
                                                <img src={data.thumbnail} />
                                            </SlideshowLightbox>)
                                        }
                                    </Col>
                                    <Col xs={18} className='w-100 fl-center'>
                                        <SlideshowLightbox className="thumbnail2 ">
                                            <img src={data.thumbnail} />
                                        </SlideshowLightbox>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={14} className='bg-white'>
                                <Row className='box-mota'>
                                    <Col xs={24}> <h1>Ghi Chép Pháp Y - Những Cái Chết Bí Ẩn</h1> </Col>
                                    <Col xs={24} className='des-author'>
                                        <Col xs={8}>
                                            Nhà cung cấp : <span>Nhà sách HCM</span>
                                        </Col>
                                        <Col xs={8}>
                                            Tác giả : <span>Lê Anh Tuấn</span>
                                        </Col>
                                        <Col xs={8}>
                                            Nhà xuất bản : <span>Thanh Niên</span>
                                        </Col>
                                        <Col xs={8}>
                                            Hình thức bìa : <span> Bìa Mềm</span>
                                        </Col>

                                    </Col>
                                    <Col className='box-mota__rate' xs={20}>
                                        <Rate /> <span> ( 0 lượt đánh giá)</span>
                                    </Col>
                                    <Col className='box-mota__price' xs={20}>
                                        <span className="current_price">{formatGia(120000)} </span>
                                        <span className='xt'>{formatGia(120000 * 1.1)}</span>
                                        <span className='price-percent'> 10 %</span>
                                    </Col >
                                    <Col className='box-mota_qty' xs={20}>
                                        Số lượng :
                                        <div className='box-qty'>
                                            <span onClick={() => handleChangeQty('MINUS')}><AiOutlineMinus /></span>
                                            <input className='input-qty' onChange={(e) => handleChangeInputQty(e)} value={qty}></input>
                                            <span onClick={() => handleChangeQty('PLUS')}> <AiOutlinePlus /></span>
                                        </div>
                                    </Col>
                                    <Col className='mt-2 fl-between'>
                                        <div className='add-to-cart'>Thêm vào giỏ hàng</div>
                                        <div className='shop-now'>Mua ngay</div>
                                    </Col>

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
                            <Col className='fl-between' xs={16}><Col xs={12}>Mã hàng</Col><Col xs={12}>24442{data.id}</Col></Col>
                            <Col className='fl-between' xs={16}><Col xs={12}>Tên Nhà Cung Cấp</Col><Col xs={12}>Thanh Niên</Col></Col>
                            <Col className='fl-between' xs={16}><Col xs={12}>Năm Xuất bản</Col><Col xs={12}> {moment(data.publish_date).year()}</Col></Col>
                            <Col className='fl-between' xs={16}><Col xs={12}>Số trang</Col><Col xs={12}> {data.number_of_page}</Col></Col>
                        </Row>
                        <hr className='my-4' />
                        <div className='product-info_des'>
                            <h2 className="name">{data.name}</h2>
                            <p className="text">{description}...</p>
                            <div className='see-view' onClick={showFullDescriptionHandler}>
                                Read {showFullDescription ? "Less" : "More"}
                            </div>
                        </div>
                    </div>
                    <div className='product-review'>
                        <h2>Đánh giá sản phẩm</h2>
                        <div className="box-review">

                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default DetailProduct