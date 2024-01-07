import React, { useRef, useState } from 'react';
import { Select } from 'antd';
const CustomSelect = (props) => {
    const { errorMessage, className, placeholder, name, register, handleChange, items, ...rest } = props;

    const options = [{ label: placeholder, value: '' }];
    for (let i = 0; i < items?.length - 1; i++) {
        options.push({
            value: items[i]?.code,
            label: items[i]?.name
        });
    }
    const show = () => {
        if (items?.length === 0 && name === 'district') {
            return true
        }
        return false
    }

    return (
        <div>
            <Select
                className='mt-2'
                style={{
                    width: '100%',
                }}
                name={name}
                placeholder={placeholder}
                onChange={(value, option) => handleChange(value, option, name)}
                options={options}
                register={...register(name)}
                disabled={show()}
            />
            <div className={`color-main pt-1 mb-4`}>{errorMessage}</div>
        </div>
    );
};


export default CustomSelect;