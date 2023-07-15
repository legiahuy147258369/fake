import moment from 'moment';


export const formatGia = (params) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(params)
}
export const convertDate = (params) => {
    return moment(params, 'D/M/YYYY').format('YYYY-MM-DD');
}
export const formatNgay = (params) => {
    return moment(params).format('DD-MM-YYYY');
}
export const dataDate = () => {
    let ngay = [
        {
            value: '',
            label: 'Chọn ngày ',
        },
    ];
    let thang = [
        {
            value: '',
            label: 'Chọn Tháng ',
        },
    ];
    let nam = [
        {
            value: '',
            label: 'Chọn Năm ',
        },
    ];

    for (let i = 1; i < 32; i++) {
        ngay.push({
            value: i.toString().padStart(2, '0'),
            label: `Ngày ${i.toString().padStart(2, '0')}`,
        });
    }

    for (let i = 1; i < 13; i++) {
        thang.push({
            value: i.toString().padStart(2, '0'),
            label: `Tháng ${i.toString().padStart(2, '0')}`,
        });
    }

    for (let i = 2023; i > 1950; i--) {
        nam.push({
            value: i.toString().padStart(2, '0'),
            label: `Năm ${i}`,
        });
    }
    return {
        ngay,
        thang,
        nam,
    };
};

