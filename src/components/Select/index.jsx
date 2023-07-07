import React, { useRef, useState } from 'react';

import './select.scss'
const CustomSelect = (props) => {
    const { errorMessage, className, placeholder, name, register, handleChange, items, ...rest } = props;
    const registerResult = register && name ? register(name) : null;


    const show = () => {
        if (items?.length === 0 && name === 'district') {
            return true
        }
        return false
    }
    return (
        <div>
            <select placeholder={placeholder} className='select-custom'  {...rest} {...registerResult} disabled={show()} onChange={(v) => handleChange(v, name)}>
                <option value="">{placeholder}</option>
                {items && items.length > 0 && items?.map((item, i) => {
                    return (
                        <option key={item.code} value={item.code} data={item.name}>{item.name}</option>
                    );
                })}
            </select>
            <div className={`color-main pt-1 mb-4`}>{errorMessage}</div>
        </div>
    );
};


export default CustomSelect;