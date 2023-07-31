import React from 'react';
import './policy.scss';
import { Col, Row } from 'antd';
import BreadcrumbCom from '../../components/breadcrumb';
const PolicyPage = () => {

    return (

        <div className='policy-area'>
            <BreadcrumbCom />
            <Row className='policy-area_row' gutter={[0, 24]}>
                <Col xs={24} className='col_cap'>CHÍNH SÁCH ĐỔI / TRẢ / HOÀN TIỀN</Col>
                <Col xs={24} className='col_cap_cover'>Áp dụng cho toàn bộ đơn hàng của Quý Khách </Col>
                <Col xs={24}>
                    <div className='box_thumb_policy'>
                        <div className='box_img'>
                            <img src="https://res.cloudinary.com/dbru1hnfl/image/upload/v1690731433/banner/policy1_leklvx.png" />
                            <div className='name'>Đổi trả hàng trong tháng</div>
                        </div>
                        <div className='box_img'>
                            <img src="https://res.cloudinary.com/dbru1hnfl/image/upload/v1690731433/banner/policy_ejzhtx.png" />
                            <div className='name'>Hotline đăng kí đổi/trả</div>
                        </div>
                        <div className='box_img'>
                            <img src="https://res.cloudinary.com/dbru1hnfl/image/upload/v1690731433/banner/policy2_vkwcbs.png" />
                            <div className='name'>Miền phí gửi hàng </div>
                        </div>
                    </div>
                </Col>
                <Col xs={24}>
                    <div className="policy-exception">
                        <h2>1. Thời gian áp dụng đổi/trả </h2>
                    </div>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td className='w-20'></td>
                                <td ><p><strong>KỂ TỪ KHI </strong><strong >GIAO HÀNG THÀNH CÔNG</strong></p></td>
                                <td className='w-20 ' > <p><strong >SẢN PHẨM LỖI<br /> (do nhà cung cấp)</strong></p></td>
                                <td className='w-20' > <p><strong>SẢN PHẨM KHÔNG LỖI&nbsp;(*)</strong></p> </td>
                                <td ><p><strong>SẢN PHẨM LỖI DO NGƯỜI SỬ DỤNG</strong></p></td>
                            </tr>
                            <tr>
                                <td rowSpan="4">
                                    <p>Sản phẩm  (có tem phiếu bảo hành từ nhà cung cấp)</p>
                                </td>
                                <td rowSpan="2">
                                    <p>7 ngày đầu tiên</p>
                                </td>
                                <td ><p>Đổi mới</p> </td>
                                <td rowSpan="3" > <p >Trả hàng không thu phí</p>
                                </td>
                                <td rowSpan="4" ><p>Bảo hành hoặc sửa chữa có thu phí theo quy định của nhà cung cấp.</p></td>
                            </tr>
                            <tr>
                                <td> <p>Trả không thu phí</p></td>
                            </tr>
                            <tr>
                                <td><p>8 - 30 ngày</p></td>
                                <td><p>Bảo hành</p></td>
                            </tr>
                            <tr>
                                <td><p>30 ngày trở đi</p> </td>
                                <td><p>Bảo hành</p></td>
                                <td><p>Không hỗ trợ đổi/ trả</p></td>
                            </tr>
                        </tbody>
                    </table>

                </Col>
                <Col xs={24}>
                    <div className="policy-exception">
                        <h2 >2. Các trường hợp yêu cầu đổi trả</h2>
                        <ul>
                            <li> Lỗi kỹ thuật của sản phẩm - do nhà cung cấp (sách thiếu trang, sút gáy, trùng nội dung, sản phẩm điện tử, đồ chơi điện – điện tử không hoạt động..)</li>

                            <li>Giao nhầm/ giao thiếu (thiếu sản phẩm đã đặt, thiếu phụ kiện, thiếu quà tặng kèm theo)</li>

                            <li>Chất lượng hàng hóa kém, hư hại do vận chuyển.</li>

                            <li>Hình thức sản phẩm không giống mô tả ban đầu.</li>

                            <li> Quý khách đặt nhầm/ không còn nhu cầu (*)</li>

                            (*) Đối với các Sản phẩm không bị lỗi, chỉ áp dụng khi sản phẩm đáp ứng đủ điều kiện sau:

                            <li> Quý khách có thể trả lại sản phẩm đã mua của chúng tôi trong vòng 30 ngày kể từ khi nhận hàng với đa số sản phẩm khi thỏa mãn các điều kiện sau:</li>

                            <li> Sản phẩm không có dấu hiệu đã qua sử dụng, còn nguyên tem, mác hay niêm phong của nhà sản xuất.</li>

                            <li> Sản phẩm còn đầy đủ phụ kiện hoặc phiếu bảo hành cùng quà tặng kèm theo (nếu có).</li>

                            <li> Nếu là sản phẩm điện – điện tử thì chưa bị kích hoạt, chưa có sao ghi dữ liệu vào thiết bị.</li>
                        </ul>
                    </div>
                </Col>
                <Col xs={24}>
                    <div className="policy-exception">
                        <div>(*)Lưu ý </div>
                        <div>
                            - Đối với thẻ Visa/ Master/ JCB, số tiền hoàn sẽ được ngân hàng chuyển vào tài khoản quý khách dao động 1-3 tuần làm việc (tùy theo chính sách của từng ngân hàng).
                        </div>
                        <div>
                            - Ngày làm việc không bao gồm thứ 7, chủ nhật và ngày lễ. Đối với những đơn hàng trả hàng hoàn tiền: Thời gian hoàn tiền được bắt đầu tính kể từ thời điểm Fahasa.com nhận được hàng hoàn trả và xác nhận với quý khách về việc hàng hoàn trả đáp ứng các điều kiện trả hàng được quy định tại chính sách này. Thời gian hoàn tiền tuân thủ theo quy định tại Mục 6 này.
                        </div>
                        <div>
                            -  Đối với các đơn hàng hoàn tiền, hình thức thanh toán của quý khách là tiền mặt (COD): Fahasa.com sẽ hoàn tiền qua tài khoản Ngân hàng do quý khách chỉ định. Trong trường hợp đã quá thời gian trên quý khách chưa nhận được tiền hoàn, vui lòng liên hệ ngân hàng phát hành thẻ hoặc liên hệ bộ phận Chăm sóc khách hàng của Fahasa.com.
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

    )
}

export default PolicyPage