import React, { useEffect, useRef, useState } from 'react'
import { regex } from '../constants/constants';

const OtpInput = ({length, otpSubmitted, onOtpSubmit = () => {}}) => {
    const [otpInput, setOtpInput] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, [])

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        console.log(value)

        if(!regex.test(value) || value.length !== 1 ){
            console.log("invalid input")
            return;
        }

        const newOtp = [...otpInput];
        newOtp[index] = value;
        setOtpInput(newOtp);

        //handle onOtpSubmit 
        let combinedOtp = newOtp.join("");
        if(combinedOtp.length === length){
            onOtpSubmit(combinedOtp)
        }    

        // shift focus to next
        if(value && index < length-1 && inputRefs.current[index + 1]){
            inputRefs.current[index + 1].focus();
        }

    }

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // if value is null
        if(index > 0 && !otpInput[index-1]){
            inputRefs.current[otpInput.indexOf("")].focus();
        }

    }

    const handleKeyDown = (e, index) => {
        console.log("key down", e.key)
        if(e.key === "Backspace" && !otpInput[index] && index > 0){
            console.log("backspace pressed")
            inputRefs.current[index-1]?.focus();
        }
        else if(e.key === "Backspace" && otpInput[index]){
            const newOtp = [...otpInput];
            newOtp[index] = "";
            setOtpInput(newOtp);
        }
    }

  return (
    <div>
        {otpInput?.map((ele, index) => 
        <input 
            key={index} 
            ref={(input) => inputRefs.current[index] = input} 
            className='otp_input' 
            type='text'
            value={ele} 
            onChange={(e) => handleInputChange(e, index)}
            onClick={() => handleClick(index)} 
            onKeyDown={(e) => handleKeyDown(e, index)}
            disabled={otpSubmitted}
        />)}
    </div>
  )
}

export default OtpInput