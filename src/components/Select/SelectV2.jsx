import React from 'react';
import { Divider, Select } from 'antd';
import { useFormContext, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/rule';

const { Option } = Select;
const CustomSelectV2 = ({ name, options, placeholder, handleChange, ...rest }) => {
    const { control, formState: { errors } } = useFormContext();
    if (options && options.length > 0) {
        options.unshift({ label: placeholder, value: '' });
    }
    return (
        <div className='w-100'>
            <Controller
                control={control}
                name={name}
                defaultValue={''}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                        className='w-100'
                        onChange={(value, option) => {
                            onChange(value)
                            if (typeof handleChange === 'function') {
                                handleChange(value, option, name);
                            }
                        }}
                        onBlur={onBlur}
                        options={options}
                        value={value}
                    />
                )}
            />
            {errors && <div className='text-message h-15 p-1'>{errors[name]?.message}</div>}
        </div>
    );
};

export default CustomSelectV2;