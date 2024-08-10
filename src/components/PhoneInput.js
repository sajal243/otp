import React, { useState } from 'react'
import OtpInput from './OtpInput';
import { regex } from '../constants/constants';

const PhoneInput = () => {

    const [showOtpInput, setShowOtpInput] = useState(false);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [otpSubmitted, setOtpSubmitted] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit", e.target.children[0].value)
        const val = e.target.children[0].value;

        const isValid = regex.test(val);

        if(!isValid || val.length < 10){
            alert("validation false");
            return;
        }

        setMobileNumber(val);
        setShowOtpInput(true);
    }

    const onOtpSubmit = (otp) => {
        console.log("otp submitted");
        setOtpSubmitted("Otp Submitted");
    }

  return (
    <div>
        <h1>Login with Phone Number</h1>
        {!showOtpInput ? 
            <form onSubmit={handleSubmit}>
             <input type='text'/>
             <button>Send OTP</button>
            </form> :

            <div>
                <h1>Enter OTP sent to {mobileNumber}</h1>
                <OtpInput length = {4} otpSubmitted={otpSubmitted} onOtpSubmit={onOtpSubmit} />
                {otpSubmitted && <p>{otpSubmitted}</p>}
            </div>
        }
       
    </div>
  )
}

export default PhoneInput