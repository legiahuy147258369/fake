
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

import 'swiper/css';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slide.scss';
import Product from '../product';
const SlideProduct = (props) => {
    const { data } = props;

    const swiperRef = useRef();
    return (
        <div className='h-400'>
            {data && data.length > 0 && <Swiper
                className="mySwiper2"
                spaceBetween={10}
                loop={true}
                rewind={true}
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
                modules={[Pagination, Navigation, Keyboard]}
                keyboard={true}
                navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                }}
                onAfterInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <button className='review-swiper-button-prev' onClick={() => swiperRef.current?.slidePrev()}> <AiOutlineArrowLeft size={20} /></button>
                {
                    data.map((item, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <Product item={item} />
                            </SwiperSlide>
                        )
                    })
                }
                <button className='review-swiper-button-next' onClick={() => swiperRef.current?.slideNext()}><AiOutlineArrowRight size={20} /></button>

            </Swiper>}

        </div>
    )
}

export default SlideProduct


