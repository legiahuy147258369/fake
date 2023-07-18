import React from 'react'
import { BiLike } from 'react-icons/bi'
import './like.scss'
import { useSelector } from 'react-redux';
import { callLike } from '../../services/api';
const LikeComment = ({ item, comment, refetchComments }) => {
    const accountRedux = useSelector((state) => state.account.user);
    const isLike = item.filter(val => val.user_id === accountRedux.id);
    let color = (isLike && isLike.length > 0) ? 'blue' : '';
    const handLike = async () => {
        const data = { user_id: accountRedux.id, product_id: comment.product_id, comment_id: comment.id };
        let res = await callLike(data);
        refetchComments()
    }

    return (
        <div className={`like_area ${color}`} onClick={handLike}>
            <BiLike size={15} /> Thích {item.length > 0 && <>({item.length})</>}
        </div>
    )
}

export default LikeComment