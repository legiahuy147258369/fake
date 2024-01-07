
import React, { useState } from 'react';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './input.scss'
const CustomInput = (props) => {
    const { errorMessage, className, name, register, rules, type, ...rest } = props;
    const registerResult = register && name ? register(name, rules) : null;
    const [openEye, setOpenEye] = useState(false);
    const toggleEye = () => {
        setOpenEye((prev) => !prev)
    }

    const handleType = () => {
        if (type === 'password') {
            return openEye ? 'text' : 'password'
        }
        return type
    }
    return (
        <>
            <div className='box-input-custom'>
                <input className='input-custom' {...rest} {...registerResult} type={handleType()} />
                {type === 'password' && openEye && (
                    <EyeTwoTone className='icon' onClick={toggleEye} />
                )}
                {type === 'password' && !openEye && (
                    <EyeInvisibleOutlined className='icon' onClick={toggleEye} />
                )}
            </div>
            <div className={`color-main pt-1 mb-4 ${className}`}>{errorMessage}</div>
        </>
    )
}

export default CustomInput