import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { callTopSold } from '../../../services/api';
import { useQuery } from '@tanstack/react-query';

const ProductSold = () => {
    const { data: result } = useQuery({
        queryKey: ['product-chart-sold'],
        queryFn: () => {
            return callTopSold()
        }
    });
    const data = result && result?.map(item => {
        let clone = {
            name: `${item.name}`,
            value: item.sold
        }
        return clone
    })

    const config = {
        data,
        xField: 'name',
        yField: 'value',
        xAxis: {
            label: {
                autoHide: false,
                autoRotate: false,
                formatter: (value) => value.slice(0, 15),
            },
        },
        minColumnWidth: 30,
        maxColumnWidth: 50,
    };
    return <>{data && <Column {...config} className='w-100' />} </>;
};
export default ProductSold;

