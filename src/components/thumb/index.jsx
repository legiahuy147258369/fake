import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { FreeMode, Navigation, Thumbs, Keyboard, Zoom } from 'swiper/modules';
import './thumb.scss';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
export default function ThumbsSwiper(props) {
    const { images } = props;
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const swiperRef = useRef();

    let data = images?.map(item => (
        <SwiperSlide key={item}>
            <div className="swiper-zoom-container">
                <img src={item} /></div>
        </SwiperSlide>
    ));
    return (
        <>
            <Swiper
                loop={true}
                spaceBetween={10}
                keyboard={{
                    enabled: true,
                }}
                centeredSlides={true}
                zoom={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Keyboard, Zoom]}
                className="mySwiper3"
                navigation={{
                    prevEl: '.prev-mySwiper3',
                    nextEl: '.next-mySwiper3',
                }}
                onAfterInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                <button className='prev-mySwiper3' onClick={() => swiperRef.current?.slidePrev()}> <MdOutlineKeyboardArrowLeft size={30} /></button>
                {data}
                <button className='next-mySwiper3' onClick={() => swiperRef.current?.slideNext()}><MdOutlineKeyboardArrowRight size={30} /></button>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                keyboard={{
                    enabled: true,
                }}
                modules={[FreeMode, Navigation, Thumbs, Keyboard]}
                spaceBetween={0}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper4"
            >
                {data}
            </Swiper>
        </>
    );
}