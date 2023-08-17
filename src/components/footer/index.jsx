import React from 'react'
import './footer.scss';
import { BiLogoFacebookCircle, BiMap } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'
import { SiYoutubemusic } from 'react-icons/si'
import { CiMail } from 'react-icons/ci';
import { LuSmartphone } from 'react-icons/lu';
import logo from '../../assets/logo.png'
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router';
const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='footer'>

            <Row className='container'>
                <Col xs={24} lg={10} className='left' >
                    <img src={logo} width={200} />
                    <p>
                        Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM <br />
                        Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam <br />
                        <br />Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. <br /> KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
                    </p>
                    <div className='area-icon'>
                        <BiLogoFacebookCircle size='2rem' />
                        <AiFillInstagram size='2rem' />
                        <SiYoutubemusic size='1.7rem' />
                    </div>
                </Col>
                <Col xs={24} lg={14} className='right'>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12} lg={8} >

                            <div className="footer-static-title">
                                <h3>Dịch vụ</h3>
                            </div>
                            <div className="footer-static-content">
                                <ul>
                                    <li><a >Điều khoản sử dụng</a></li>
                                    <li><a >Chính sách bảo mật thông tin cá nhân</a></li>
                                    <li><a >Chính sách bảo mật thanh toán</a></li>
                                    <li><a >Giới thiệu Fahasa</a></li>
                                    <li ><a >Hệ thống trung tâm - nhà sách</a></li>
                                </ul>
                            </div>

                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <div className="footer-static-title">
                                <h3>Hỗ trợ</h3>
                            </div>
                            <div className="footer-static-content ">
                                <ul>
                                    <li className="first" onClick={() => navigate('/policy')}><a >Chính sách đổi - trả - hoàn tiền</a></li>
                                    <li><a >Chính sách bảo hành - bồi hoàn</a></li>
                                    <li><a >Chính sách vận chuyển</a></li>
                                    <li><a >Chính sách khách sỉ</a></li>
                                    <li><a >Phương thức thanh toán và xuất HĐ</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={24} md={12} lg={8}>
                            <div className="footer-static-title">
                                <h3 >Tài khoản của tôi</h3>
                            </div>
                            <div className="footer-static-content">
                                <ul>
                                    <li ><a >Đăng nhập</a></li>
                                    <li ><a >Tạo mới tài khoản</a></li>
                                    <li ><a >Thay đổi địa chỉ khách hàng</a></li>
                                    <li ><a >Chi tiết tài khoản</a></li>
                                    <li ><a >Lịch sử muahàng</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col xs={24} md={12} lg={24}>

                            <div className="footer-static-title">
                                <h3>Liên hệ</h3>
                            </div>
                            <Row gutter={[8, 16]} className='mt-4'>
                                <Col xs={24} xl={8} ><a className='row-contact'><BiMap /> 60-62 Lê Lợi, Q.1, TP. HCM</a></Col>
                                <Col xs={24} xl={8} ><a className='row-contact'><CiMail />cskh@fahasa.com.vn</a></Col>
                                <Col xs={24} xl={8} ><a className='row-contact'> <LuSmartphone />1900636467</a></Col>
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div>
    )
}

export default Footer
