import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignInOTP.css'
export default function SignInOTP() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
  
  
    const handleVerifyOtp = async () => {
        try {
            const phoneNo = localStorage.getItem('phoneNo');
            const response = await axios.post(`http://localhost:8080/api/auth/signinotp?phoneNo=${phoneNo}&otp=${otp}`);
            if (response.status === 200) {
                setVerificationMessage('OTP verification successful!');
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setVerificationMessage(error.response.data.error); // Show the specific error message
            } else {
                setVerificationMessage('An error occurred');
            }
        }
    };
    return (
      <div className='signincontainer'>
        <h2 className='signinotph2'>Sign In Via OTP</h2>
        <h3 className='signinotph3'>Phone Number:</h3>
      <p>{localStorage.getItem('phoneNo')}</p> {/* Display phone number from local storage */}
        <form className='verifyotpform'>
          <div>
            <label className='signinotplabel'>Enter OTP:</label>
            <input className='verifyotpinput'
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className='verifyotpbutton' type="button" onClick={handleVerifyOtp}>
            Login
          </button>
        </form>
        {verificationMessage && <p>{verificationMessage}</p>}
      </div>
    );
}