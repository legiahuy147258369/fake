import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { callCapture, callCreateOrder, callPaypal } from "../../services/api";
import _ from 'lodash';
import { message, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { delAllCart } from "../../redux/cart/cartSlice";

const PaypalPayment = ({ methods, user, setDonhang, setStep }) => {
    const dispatch = useDispatch();
    const cartRedux = useSelector((state) => state.cart.cart);
    let data = {};
    const { district, dc, province, name, phone } = methods.getValues();

    if (!district && !province) {
        data.address = ` ${dc}`;
    } else {
        data.address = ` ${dc} , ${district}, ${province}`;
    }
    data.user_id = user.id;
    data.name = name;
    data.phone = phone;
    const cart = cartRedux.map(item => ({
        quantity: item.qty,
        cart: {
            id: item.detail.id,
            price: item.detail.price,
            name: item.detail.name
        }
    }));
    const createOrder = async (data) => {
        if (!_.isEmpty(data)) {
            try {
                const res = await callPaypal(cart);
                console.log('createOrder', res);
                return res.id;
            } catch (error) {
                console.error('Error creating PayPal payment:', error);
                return false;
            }
        } else {
            return false;
        }
    };

    const onApprove = async (approveData) => {
        try {
            const res = await callCapture(approveData.orderID);
            if (res.status === 'COMPLETED') {
                data.payment = 1;
                const order = { data, cart };
                console.log(order);
                const result = (await callCreateOrder(order))[0];
                console.log(result);
                if (result) {
                    setStep(2);
                    message.success('Đặt hàng thành công');
                    setDonhang(result);
                    methods.reset();
                    dispatch(delAllCart())
                } else {
                    notification.error({
                        message: "Có lỗi xảy ra",
                    });
                }
            } else {
                notification.info({
                    message: "Chưa hoàn tất thanh toán",
                });
            }
        } catch (error) {
            console.error('Error capturing PayPal payment:', error);
        }
    };

    return (
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    );
}

export default PaypalPayment;
