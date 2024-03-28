import React, { useState } from "react";
import axios from "axios";
import './SignupForm.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; 

function SignupForm() {
  const [formData, setFormData] = useState({
    phoneNo: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    password: "",
    roles: [],
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    const selectedRoles = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, roles: selectedRoles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/auth/signup', formData)
      .then((response) => {
        // Handle success (e.g., show a success message)
        navigate('/signin');
        console.log(response.data);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successfull!',
        text: 'User has been Registered Successfully.',
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle any error or show a failure message
    });
};

  return (
    <div className="signupcontainer">
      <h2 className="signuph2">Sign Up</h2>
      <form className="SignupForm" onSubmit={handleSubmit}>
       
        <div>
          <label className="signupformlabel" htmlFor="firstName">First Name</label>
          <input className="signupforminputtag" type="text" name="firstName" id="firstName" onChange={handleChange} required />
        </div>
        <div className="rightcolumn">
          <label className="signupformlabel" htmlFor="lastName">Last Name</label>
          <input className="signupforminputtag" type="text" name="lastName" id="lastName" onChange={handleChange} required />
        </div>
        <div>
          <label className="signupformlabel" htmlFor="phoneNo">Phone Number</label>
          <input className="signupforminputtag" type="text" name="phoneNo" id="phoneNo" onChange={handleChange} required />
        </div>
        <div className="rightcolumn">
          <label className="signupformlabel"  htmlFor="email">Email</label>
          <input className="signupforminputtag" type="text" name="email" id="email" onChange={handleChange} required />
        </div>
        <div>
          <label className="signupformlabel" htmlFor="address">Address</label>
          <input className="signupforminputtag" type="text" name="address" id="address" onChange={handleChange} required />
        </div>
        <div className="rightcolumn">
          <label className="signupformlabel" htmlFor="roles">Select Roles</label>
          <select
            name="roles"
            id="roles"
            
            onChange={handleRoleChange}
            className="signup-custom-dropdown"
            required
          >
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
            <option value="qualitycheck">Quality Check</option>
            <option value="consumer">Consumer</option>
          </select>
        </div>
        <div>
          <label className="signupformlabel" htmlFor="password">Password</label>
          <input className="signupforminputtag" type="password" name="password" id="password" onChange={handleChange} required />
        </div>
        <div className="rightcolumn">
          <label className="signupformlabel" htmlFor="confirmpassword">Confirm Password</label>
          <input className="signupforminputtag" type="password" name="confirmpassword" id="confirmpassword" onChange={handleChange} required />
        </div>
        
        <div className="signupbuttondiv">
          <button className="signupbutton" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
