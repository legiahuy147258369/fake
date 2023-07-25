import React from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Controller, useFormContext } from 'react-hook-form';




const CustomUpload = ({ name, qty }) => {
    const { control, formState: { errors }, reset } = useFormContext();
    let count = qty ? 5 : 1;
    return (
        < >
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Upload
                        listType="picture"
                        maxCount={count}
                        multiple={qty}
                        beforeUpload={() => false}
                        onChange={(info) => {
                            const { file, fileList } = info;
                            if (qty) {
                                onChange(fileList)
                            } else {
                                onChange(fileList[0]?.originFileObj);
                            }
                        }}
                        onRemove={() => {
                            onChange(null);
                        }}
                    >
                        <div className='bg-white w-100 p-2 b-round-2'>
                            <UploadOutlined /> Upload File
                        </div>
                    </Upload>

                )
                }

            />

            {errors[name] && <div className='text-message p-1'>{errors[name]?.message}</div>}
        </ >
    );
};

export default CustomUpload;
