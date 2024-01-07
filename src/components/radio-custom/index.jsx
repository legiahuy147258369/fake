

import { Radio } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';
const CustomRadio = ({ options, name, placeholder, ...rest }) => {
    const { control, formState: { errors } } = useFormContext();
    return (
        <div className='w-100 pt-1'>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Radio.Group options={options} onChange={onChange} defaultValue={value} value={value} />
                )}
            />
            {errors && <div className='text-message p-2'>{errors[name]?.message}</div>}
        </div>

    )
}

export default CustomRadio