import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { callChartPieProduct } from '../../../services/api';
import { useQuery } from '@tanstack/react-query';

ChartJS.register(ArcElement, Tooltip, Legend);


export function ChartPie() {
    const { data: result } = useQuery({
        queryKey: ['product-chart-pie'],
        queryFn: () => {
            return callChartPieProduct();
        }
    });

    const data = {
        labels: result && result?.map(item => item.name),
        datasets: [
            {
                label: " có số sản phẩm là ",
                data: result && result?.map(item => item.Tong),
                backgroundColor: result && result.map(() => {
                    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
                    return randomColor;
                })
            }
        ]
    };

    return <Pie data={data} />;
}