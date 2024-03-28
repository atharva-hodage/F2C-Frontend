import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EnterOtp.css';
import Cookies from 'js-cookie';
export default function Enterotp() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
  
  
    const handleVerifyOtp = async () => {
        try {
            const phoneNo = localStorage.getItem('phoneNo');
           
            const response = await axios.post(`/api/auth/signin-otp?phoneNo=${phoneNo}&otp=${otp}`);
            if (response.status === 200) {
                localStorage.setItem('otp', otp);
                setVerificationMessage('OTP verification successful!');

                const accessToken = response.data.accessToken;
                Cookies.set('accessToken', accessToken, { expires: 1 });
                localStorage.setItem("userId", response.data.id);
        localStorage.setItem("phoneNo", response.data.phoneNo);
        console.log(response.data)
                // const role = response.data.roles;
                // if(role[0] === 'ROLE_CONSUMER'){
                //   navigate('/consumerdashboard');
                 
                // }
                // if(role[0] === 'ROLE_QUALITYCHECK'){
                //   navigate('/qcdashboard');
                // }
                // if(role[0] === 'ROLE_FARMER'){
                  navigate('/farmerdashboard');
                // }
                // if(role[0] === 'ROLE_ADMIN'){
                  // navigate('/ccdashboard');
                // }
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
      // <div className='verifyph-container'>
         
      // </div>

      <div className="enterotpcontainer">
      <h2 className='enterotph2'>OTP Verification</h2>
      
      {/* Display phone number from local storage */}
      <form className='otp-verification-form'>
        <div>
        <label className='enterotplabel'>Phone Number: {localStorage.getItem('phoneNo')}</label>
      
          <label className='enterotp6digitlabel'>Enter the 6 Digit OTP:</label>
          <input
            type="text"
            className="otp-input-field"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <button type="button" className="otp-verification-button" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
      </form>
      {verificationMessage && <p className={`verification-message ${verificationMessage.startsWith('OTP verification successful!') ? 'success' : 'error'}`}>{verificationMessage}</p>}
    </div>
    );
}