

import React from 'react';
import { formatGia } from '../../utils/format';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import { Drawer, Popover, Col, Avatar, Menu, message, Badge } from 'antd';
const PopoverCustom = (props) => {
    const { children, cart } = props;
    const navigate = useNavigate();
    const headerPop = () => {

        return (
            <div className="pop-cart-header">
                <div className='pop-cart-header__text' >Sản phẩm đã thêm</div>
                <div className="btn-nav-cart cs" onClick={() => navigate('/cart')}>
                    Xem Giỏ hàng
                </div>
            </div>
        );
    };
    const contentCartPopopover = () => {
        return (
            <div className="pop-cart-body">
                <div className="pop-cart-content">
                    {cart?.map((item, index) => {
                        return (
                            <div className="row-pop-cart cs" key={`${index}-bv`}>
                                <img
                                    src={item.detail.thumbnail}
                                />
                                <div className="content-text">{item.detail?.name.slice(0, 50)} ...</div>
                                <div>{formatGia(item.detail?.price)}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };
    return (
        <Popover
            style={{
                width: 500,
            }}
            overlayClassName='popover-cart-over'
            placement="bottomLeft"
            title={headerPop}
            className="popover-cart"
            content={contentCartPopopover}
        >
            {children}
        </Popover>
    )
}

export default PopoverCustom