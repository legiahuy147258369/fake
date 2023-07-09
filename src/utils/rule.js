import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";


const handleConfirmPasswordYup = (refString) => {
    return yup
        .string()
        .required('Nhập lại password là bắt buộc')
        .min(5, 'Độ dài từ 5 - 150 ký tự')
        .max(150, 'Độ dài từ 5 - 150 ký tự')
        .oneOf([yup.ref(refString)], 'Nhập lại password không khớp')
}

const schema = yup.object({
    name: yup.string().required('Vui lòng nhập họ tên')
        .min(5, 'Độ dài kí tự từ 5-160 kí tự')
        .max(120, 'Độ dài 5-150 kí tự'),
    email: yup.string().required('Vui lòng nhập email')
        .email('Email không đúng định dạng')
        .min(5, 'Độ dài kí tự từ 5-160 kí tự')
        .max(120, 'Độ dài 5-150 kí tự'),
    phone: yup.string().required('Vui lòng nhập số điện thoại').matches(
        /^-?[0-9]*$/, "Vui lòng nhập số không chứa kí tự khác"
    ),
    password: yup.string().required('Vui lòng nhập mật khẩu ')
        .min(5, 'Độ dài kí tự từ 5-160 kí tự')
        .max(120, 'Độ dài 5-150 kí tự'),
    confirm_password: handleConfirmPasswordYup('password'),
    province: yup.string().required('Vui lòng chọn tỉnh'),
    district: yup.string().required('Vui lòng chọn huyện '),
    dc: yup.string().required('Vui lòng nhập địa chỉ ')
        .min(5, 'Độ dài kí tự từ 5-150 kí tự')
        .max(120, 'Độ dài 5-150 kí tự'),
})

export { schema };