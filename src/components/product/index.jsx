import { Row, Col, Rate } from 'antd'
import React from 'react'
import { formatGia } from '../../utils/format'
import { BsCartPlus } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import './product.scss';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { addToWishList } from '../../redux/wish/wishSlide';
const Product = (props) => {
    const dispatch = useDispatch();
    const { item } = props;
    const handAddToCart = () => {
        dispatch(addToCart({ qty: 1, detail: item }));
    }
    return (
        <>
            <div className='product'>
                <Link className='text-none' to={`/book/${item.id}`}>
                    <img src={item.thumbnail} className='pt-2' />
                    <p>{item.name}</p>
                </Link>
                <div><Row className='box-price'> <Col className='price' xs={12}>{formatGia(item.price)}</Col> <Col xs={12} className='price-cover'>{formatGia(item.price * 1.1)} </Col> </Row></div>
                <div className='my-3'>
                    <Row className='box-cart'>
                        <Col className='fl cs text-wish' xl={10} xs={0}> <span className='btn-wish' onClick={() => dispatch(addToWishList(item))}>Yêu thích</span></Col>
                        <Col className='cart cs' xs={6} lg={6} xl={4}> <span onClick={handAddToCart} className='icon-cart'><BsCartPlus /></span></Col>
                        <Col className='rating' xs={18} lg={18} xl={10}><Rate defaultValue={item.rating} /></Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default Product