import Cookies from 'js-cookie';
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
  const logoutfunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');

    navigate('/signin');
  };

  return (
    <div>
      <button onClick={logoutfunc}>Logout</button>
    </div>
  );
}