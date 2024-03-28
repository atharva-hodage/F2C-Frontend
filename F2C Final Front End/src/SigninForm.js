import React, { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import './SignInForm.css';
import Swal from 'sweetalert2'; 
 // Import the CSS file
import { Link, useNavigate } from "react-router-dom";

function SigninForm() {
  const [formData, setFormData] = useState({
    phoneNo: "",
    password: "",
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/signin", formData)
      .then((response) => {
        const accessToken = response.data.accessToken;
        Cookies.set('accessToken', accessToken, { expires: 1 });
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("phoneNo", response.data.phoneNo);
        console.log(response.data.roles);
        const role = response.data.roles;
        if(role[0] === 'ROLE_CONSUMER'){
          navigate('/consumerdashboard');
          // farmerdashboard ,qcdashboard , ccdashboard
        }
        if(role[0] === 'ROLE_QUALITYCHECK'){
          navigate('/qcdashboard');
        }
        if(role[0] === 'ROLE_FARMER'){
          navigate('/farmerdashboard');
        }
        if(role[0] === 'ROLE_ADMIN'){
          navigate('/ccdashboard');
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in Successfully'
        })
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  return (
    <div className="signincontainerdiv"> {/* Add the className here */}
      <h2 className="signinh2" >Sign In</h2>
      <form className="signinformcontainer" onSubmit={handleSubmit}>
        <div>
          <label className="signinlabel" htmlFor="phoneNo">Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            id="phoneNo"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="signinlabel" htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button className="signinbutton" type="submit">Sign In</button>
        </div>
        <div  className="signinLinkdiv">
        <Link to="/loginviaotp">
          Login Via OTP  
        </Link>
        </div>
      </form>
    </div>
  );
}

export default SigninForm;