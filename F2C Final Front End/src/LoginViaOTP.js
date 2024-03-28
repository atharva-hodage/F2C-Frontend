import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './VerifyPhoneno.css';

export default function LoginViaOtp() {
    const navigate = useNavigate();
    const [phoneNo, setPhoneNo] = useState('');
    const [message, setMessage] = useState('');

    const handleSendOtp = async () => {
        
        try {
             console.log('phoneNo:', phoneNo);
            const response = await axios.post(`/api/auth/loginViaOTP?phoneNo=${phoneNo}`);
           
            if (response.status === 200) {
                setMessage('OTP sent successfully!');
                localStorage.setItem('phoneNo', phoneNo);
                navigate('/enterotp');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error); 
            } else {
                setMessage('An error occurred');
            }
        }
    };

    return (
        <div className="verifyph-container">
        
          <h2 id='verifyphone'>Enter Phone No</h2>
          <form className='verifyphoneform'>
            <div>
              <label className='verifyphonelabel'>Phone Number:</label>
              <input className='verifyphoneinput'
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <button className='verifyphonebutton' type="button" onClick={handleSendOtp}>
              Send OTP
            </button>
          </form>
          <div className='loginviaotperrormessage'>{message && <p className='loginviaotperrorpara'>{message}</p>}</div>
          
        
      </div>
    );
}