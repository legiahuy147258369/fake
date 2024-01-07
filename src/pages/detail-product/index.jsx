import { Col, Divider, Modal, Rate, Row, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import './detail.scss';

import { formatGia, formatNgay, formatTimeAgo } from '../../utils/format';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from "react-router-dom";
import { callComments, callCreateComment, callProductDetail, callTopView } from '../../services/api';
import _ from 'lodash';
import Loading from '../../components/loading-custom';
import SlideProduct from '../../components/slide-product';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addToCart } from '../../redux/cart/cartSlice';
import QtyCart from '../../components/qty-cart';
import ThumbsSwiper from '../../components/thumb';
import { AiOutlinePlus } from 'react-icons/ai';
import { addToWishList } from '../../redux/wish/wishSlide';
import BreadcrumbCom from '../../components/breadcrumb';
import CustomInputV2 from '../../components/input-custom/input-v2';
import { schema } from '../../utils/rule';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import CustomTextArea from '../../components/text-area';
import CustomRate from '../../components/rate-custom';
import PaginationMini from '../../components/pagination/paginationMini';
import ShowReply from '../../components/show_reply';
import LikeComment from '../../components/like_comment';


const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const accountRedux = useSelector((state) => state.account.user);
    const [qty, setQty] = useState(1);
    const [pageComment, setPageComment] = useState({ page: 1, product_id: id });

    const [modalComment, setModalComment] = useState({ show: false, parent_id: -1 });
    const registerSchema = schema.pick(['name', 'content', 'rate'])
    const methods = useForm({ resolver: yupResolver(registerSchema) });
    const [showFullDescription, setFullDescription] = useState(false);
    const dispatch = useDispatch();


    const { data: product } = useQuery({
        queryKey: ['product-detail', id],
        queryFn: () => {
            return callProductDetail(id);
        }
    });


    useEffect(() => {
        window.scrollTo(0, 0);
        setQty(1);
        setPageComment({ page: 1, product_id: id });
    }, [product]);

    const data = product && product[0];
    const imgSlide = (data) => {
        const img = [data?.thumbnail];
        const arr = data?.images && data?.images.split(',');
        if (arr) {
            img.push(...arr)
        }
        return img
    }


    const { data: top } = useQuery({
        queryKey: ['product-top'],
        queryFn: () => {
            return callTopView();
        },

    });

    const { data: dataComment, refetch: refetchComments } = useQuery({
        queryKey: ['commnent', pageComment],
        queryFn: () => {
            return callComments(pageComment);
        },
    });

    const description = showFullDescription
        ? data?.description
        : data?.description.slice(0, 200);

    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };

    const handleAddToCart = (quantity, data, type) => {
        dispatch(addToCart({ qty: quantity, detail: data }));
        setQty(1);
        (type === 'now') && navigate('/cart')
    };
    const handleComment = (parent_id) => {
        const isEmpty = _.every(accountRedux, _.isEmpty);
        if (!isEmpty) {
            parent_id !== -1 && methods.setValue('rate', 0);
            setModalComment({ parent_id: parent_id, show: true });
        } else {
            notification.info({
                message: 'Hãy đăng nhập để gửi bình luận',
            });
        }
    }
    const onSubmit = async (value) => {
        if (modalComment.parent_id !== -1) delete value.rate;
        let body = { product_id: data.id, user_id: accountRedux.id, ...value, parent_id: modalComment.parent_id };
        await callCreateComment(body);
        handleCancel();
        refetchComments();
    }
    const handleCancel = () => {
        setModalComment({ parent_id: -1, show: false })
        methods.reset();
    }

    return (
        <div className='product-detail-area'>
            <BreadcrumbCom />
            {_.isUndefined(data) ? <Loading /> :
                <>
                    <div className="product-essential mt-2">
                        <Row className='layout-detail pt-2'>
                            <Col className=' fl-between' md={24} lg={10}>
                                <Row className='box-img_row ' >
                                    {data.thumbnail.length > 0 && <ThumbsSwiper images={imgSlide(data)} />}
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
                                        <div className='add-to-cart' onClick={() => handleAddToCart(qty, data, null)}>Thêm vào giỏ hàng</div>
                                        <div className='shop-now' onClick={() => handleAddToCart(qty, data, 'now')}>Mua ngay</div>
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
                    <div className='product__review'>
                        <div className='product__review__box'>
                            <h2 className='fs-25'>Đánh giá sản phẩm</h2>
                            <Row className="box-review">
                                <Col xs={10} className='box-review__detail'>  <span><b>5</b>/5</span> <span><Rate value={5} /></span>
                                    ({dataComment.total} lượt đánh giá) </Col>
                                <Col xs={14} className='btn-review' onClick={() => handleComment(-1)}> <div>Viết đánh giá</div></Col>
                            </Row>
                        </div>
                        <div className='product__review__list'>
                            {dataComment && dataComment.comments && dataComment.comments.length > 0 && (<div>
                                <Divider />
                                {
                                    dataComment?.comments.map(item => {
                                        return (
                                            <div key={item.id} className='product__review__list__row'>
                                                <div className='product__review__list__row__left' >
                                                    <div className='name'>{item.name}</div>
                                                    <div className='date'> {formatTimeAgo(item.created_at)}</div>
                                                </div>
                                                <div className='product__review__list__row__right'>
                                                    <div className='rate'><Rate value={item.rate} style={{ fontSize: '14px' }} /></div>
                                                    <div className='content'>{item.content}</div>
                                                    {item.reply && item.reply.length > 0 && (
                                                        <div className='list__rep'> <ShowReply reply={item.reply} /></div>
                                                    )}
                                                    <div className='box__feed'>
                                                        <span className='box__feed__like'> <LikeComment item={item.like} comment={item} refetchComments={refetchComments} /> </span>
                                                        <span className='box__feed__rep' onClick={() => handleComment(item.id)}>Phản hồi</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='box-pagination'>

                                    <PaginationMini setPage={setPageComment} page={pageComment} total={dataComment.total} />
                                </div>
                                <Divider />
                            </div>)}
                        </div>
                    </div>
                </>
            }
            <Modal title="Bình luận" open={modalComment.show} onCancel={handleCancel} footer={null}>
                <FormProvider {...methods}>
                    <form className='form-area-info' onSubmit={methods.handleSubmit(onSubmit)} >
                        <Row gutter={[0, 10]}>
                            <Col xs={24}><div className='text-center fs-2 my-3'>Gửi phản hồi</div></Col>
                            <Col xs={24}><CustomInputV2 type={'text'} name='name' placeholder='Nhập Họ Tên' /></Col>
                            <Col xs={24}>
                                <CustomTextArea name='content' placeholder='Nhập nội dung' />
                            </Col>
                            {modalComment.parent_id < 0 && (<Col xs={24}>
                                <CustomRate name='rate' />
                            </Col>)}
                            <Col xs={24}>
                                <button className='btn-comment'>Gửi </button>
                            </Col>
                        </Row>
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}

export default DetailProduct;

