import React from 'react';
import * as XLSX from 'xlsx';
import { AiOutlineExport } from 'react-icons/ai';
const ExportToExcel = ({ data, fileName }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${fileName}.csv`);
    };
    return (
        <button className='export' onClick={exportToExcel}><AiOutlineExport /> EXPORT</button>
    );
};

export default ExportToExcel;