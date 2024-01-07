import React, { useRef, useState } from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';




const CustomUpload = ({ name, qty, files, change }) => {
    const { control, formState: { errors }, reset } = useFormContext();
    let count = qty ? 5 : 1;

    return (
        < >
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Upload
                        name={name}
                        listType="picture"
                        maxCount={count}
                        multiple={qty}
                        defaultFileList={files ?? []}
                        beforeUpload={() => false}
                        onChange={(info) => {
                            const { fileList } = info;
                            if (qty) {
                                onChange(fileList)
                            } else {
                                onChange(fileList[0]?.originFileObj);
                            }
                        }}
                        onRemove={(file) => {
                            // if (typeof change === 'function') {
                            //     change(file, files);
                            // }
                            onChange(null);
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

export default CustomUpload;
