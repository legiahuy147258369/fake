


import './input.scss'
import { Input } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
const CustomInputV2 = ({ type, name, placeholder, disabled, ...rest }) => {
    const { control, formState: { errors } } = useFormContext();
    const di = disabled ?? false
    return (
        <div className='w-100'>
            <Controller

                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        type={type}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onChange={onChange}
                        value={value}
                        className='w-100'
                        disabled={di}
                    />
                )}
            />
            {errors && <div className='text-message p-1'>{errors[name]?.message}</div>}
        </div>

    )
}

export default CustomInputV2