import React, { useRef, useState } from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';


const CustomUploadV2 = ({ name, qty, change }) => {
    const { control, formState: { errors }, reset, getValues, setValue, watch } = useFormContext();
    let count = qty ? 5 : 1;

    return (
        < >
            <Controller
                control={control}
                name={name}
                defaultValue={getValues(name)}
                render={({ field: { onChange, value } }) => (
                    <Upload
                        name={name}
                        listType="picture"
                        maxCount={count}
                        multiple={qty}
                        fileList={value}
                        beforeUpload={() => false}
                        onChange={(info) => {
                            const { fileList, file } = info;
                            onChange(fileList)
                        }}
                        onRemove={(file) => {
                            if (typeof change === 'function') {
                                change(name, file);
                            }
                        }}
                    >
                        <div className='bg-white w-100 p-2 b-round-2'>
                            <UploadOutlined /> Upload File
                        </div>

                    </Upload >
                )}
            />

            {errors[name] && <div className='text-message p-1'>{errors[name]?.message}</div>}
        </ >
    );
};

export default CustomUploadV2;
