import React, { useEffect, useRef, useState } from 'react'
import './banner.scss';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Row, Col, Rate } from 'antd';
import { callBanner } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
const Banner = () => {

    const { data: slides } = useQuery({
        queryKey: ['banner'],
        queryFn: () => {
            return callBanner()
        }
    });

    return (
        <>
            <div className='banner-area'>
                <div className="banner-area_slide">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        loop={false}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500
                        }}
                        className="mySwiper"
                    >
                        {slides?.map((slideContent, index) => (
                            <SwiperSlide key={index}>
                                <img src={slideContent.url} />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
                <div className='banner-area_qc'>
                    <div>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/VnPayT6_392%20x%20156.png" alt="" />
                    </div>
                    <div>
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/PNJT6_392x156.png" alt="" />
                    </div>
                </div>
            </div >
            <div className="banner-bottom">
                <div><img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/SubBannerT6_Coupon_310x210-06.png" /></div>
                <div><img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/TrangBalo_Resize_310x210.png" /></div>
                <div><img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/Tamlinh_mainbanner_T6_Smallbanner_310x210.png" /></div>
                <div><img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/TuSachThieuNhi_T623_Banner_SmallBanner_310x210.png" /></div>
            </div>
            <div className='cms-area'>
                <Row gutter={[8, 8]}  >
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_FlashSale_Thuong_120x120.png" width={50} />
                        <span>Flash sale</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_MaGiamGia_8px_1.png" width={50} />
                        <span>Mã Giảm Giá</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_SanPhamMoi_8px_1.png" width={50} />
                        <span>Sản phẩm mới</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/F3_HomepageT6.png" width={50} />
                        <span>Sale thứ 3</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_VanPhongPham_Th%C6%B0%C6%A1ng_120x120.png" width={50} />
                        <span> Văn phòng</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_PhienChoCu_8px_1.png" width={50} />
                        <span>Sách cũ</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/icon-menu/Icon_VanHoc_8px_1.png" width={50} />
                        <span> Văn học</span>
                    </Col>
                    <Col xs={6} md={3} >
                        <img src="https://cdn0.fahasa.com/media/wysiwyg/Thang-06-2023/Icon_KinhTe_Thuong.png" width={50} />
                        <span> Kinh tế</span>
                    </Col>
                </Row>
            </div>


        </>

    )
}

export default Banner;
{/* <button className='review-swiper-button-prev1' onClick={() => swiperRef.current?.slidePrev()}> <AiOutlineArrowLeft size={20} /></button> */ }
{/* {slides.map((slideContent, index) => (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <img src={slideContent} />

                            </SwiperSlide>
                        ))} */}
{/* <button className='review-swiper-button-next1' onClick={() => swiperRef.current?.slideNext()}><AiOutlineArrowRight size={20} /></button> */ }
{/* <Swiper

    autoplay={{
        delay: 5000,
        disableOnInteraction: true,
    }}
    pagination={{
        clickable: true,
    }}
    // modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
    // className="mySwiper -h-400"
    // navigation={{
    //     nextEl: '.review-swiper-button-next1',
    //     prevEl: '.review-swiper-button-prev1',
    // }}
    navigation={true}
    modules={[Lazy, Pagination, Navigation]}

    className="mySwiper"
>

</Swiper> */}