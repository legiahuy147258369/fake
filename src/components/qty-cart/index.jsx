import React, { useRef } from 'react'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import './qty.scss'
import { InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../redux/cart/cartSlice';
const QtyCart = (props) => {
    const { setQty, qty, id, page } = props;
    const refInput = useRef();
    const dispatch = useDispatch();
    const handleChangeQty = (type, id) => {
        if (page === 'cart') {
            let currentQty = refInput.current.value;
            if (type === 'MINUS') {
                if (currentQty - 1 <= 0) return;
                dispatch(updateCart({ qty: (+currentQty - 1), id: id }));
            }
            if (type === 'PLUS') {
                if (currentQty === +20) return;
                dispatch(updateCart({ qty: (+currentQty + 1), id: id }));
            }

        } else {
            if (type === 'MINUS') {
                if (qty - 1 <= 0) return;
                setQty(qty - 1);
            }
            if (type === 'PLUS') {
                if (qty === +20) return;
                setQty(qty + 1);
            }
        }

    };


    const handleChangeInputQty = (value, id) => {
        if (page === 'cart') {
            let t = value;
            console.log(t);
            dispatch(updateCart({ qty: value, id: id }));
        } else {
            let t = value;
            if (t > +20) setQty(20);
            setQty(t);
        }

    }


    return (
        <>
            <div className='box-qty'>
                <span onClick={() => handleChangeQty('MINUS', id)}><AiOutlineMinus /></span>
                <InputNumber bordered={false} controls={false} className='input-qty'
                    min={1} max={20} ref={refInput}
                    onChange={(value) => handleChangeInputQty(value, id)}
                    value={+qty}
                />
                <span onClick={() => handleChangeQty('PLUS', id)}> <AiOutlinePlus /></span>
            </div>
        </>
    )
}

export default QtyCart