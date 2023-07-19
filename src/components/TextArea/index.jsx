
import React, { useState } from 'react';

import { Input } from 'antd';
const { TextArea } = Input;
import { Controller, useFormContext } from 'react-hook-form';
const CustomTextArea = ({ name, placeholder, ...rest }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <div className='w-100 '>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextArea
                        rows={5}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        className='w-100 '
                    />
                )}
            />
            {errors && <div className='text-message h-15 p-2'>{errors[name]?.message}</div>}
        </div>

    )
}

export default CustomTextArea