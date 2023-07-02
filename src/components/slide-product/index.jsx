
import { formatGia } from '../../utils/format';
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsCartPlus } from 'react-icons/bs'
import SwiperCore, { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper";
import { Row, Col, Rate } from 'antd';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import './slide.scss';
SwiperCore.use([EffectCoverflow, Pagination]);
const SlideProduct = (props) => {
    const { data } = props;
    console.log(data);
    const swiperRef = useRef();

    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 10,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper2"
                navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <button className='review-swiper-button-prev' onClick={() => swiperRef.current?.slidePrev()}> <AiOutlineArrowLeft size={20} /></button>
                {
                    data.map(item => {
                        return (
                            <SwiperSlide key={item.price}>
                                <div className='product'>
                                    <img src={item.thumbnail} />
                                    <p>{item.name}</p>
                                    <div><Row className='box-price'> <Col className='price' xs={12}>{formatGia(item.price)}</Col> <Col xs={12} className='price-cover'>{formatGia(item.price * 1.1)} </Col> </Row></div>
                                    <div className='my-3'>
                                        <Row className='box-cart'>
                                            <Col className='fl cs' xs={10} lg={10}> Add to cart</Col>
                                            <Col className='cart cs' xs={4} lg={4}> <span className='icon-cart'><BsCartPlus /></span></Col>
                                            <Col className='rating' xs={10} lg={10}><Rate defaultValue={item.rating} /></Col>
                                        </Row>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }

                <button className='review-swiper-button-next' onClick={() => swiperRef.current?.slideNext()}><AiOutlineArrowRight size={20} /></button>

            </Swiper>
            <div className='slide-product-area'>

            </div>
        </>
    )
}

export default SlideProduct