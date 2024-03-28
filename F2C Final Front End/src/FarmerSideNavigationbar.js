import { Link, useNavigate } from "react-router-dom";
import './FarmerSideNavigationbar.css'
import React from 'react';
import Cookies from "js-cookie";
import logo from '../src/logo3.png';

const SideNavigationbar = () => {
  const navigate = useNavigate();
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };
    return ( 

      <nav className="fleft-navigation">
        <img className="logof" src={logo} alt="logo" />
      <ul>
      <Link to ="/farmerdashboard"><li className="listfarmerdashboard" ><button>Home</button></li></Link>
        <Link to ="/addcrop"><li className="listfarmerdashboard"><button>Add New Crop</button></li></Link>
 <Link to ="/getcroplist">      <li className="listfarmerdashboard"  ><button>Crop List</button></li></Link> 
 
 <Link to ="/farmerreqlist">    <li className="listfarmerdashboard"  ><button>Processed Requests</button></li> </Link>

 <Link to ="/farmerorderhistory">      <li className="listfarmerdashboard"  ><button>Order List</button></li></Link> 
        <li className="listfarmerdashboard"  ><button>Payment</button></li>
        <li className="listfarmerdashboard"  ><button>Resourses</button></li>
        <li className="listfarmerdashboard"  ><button>Reports</button></li>
        <li className="listfarmerdashboard"  ><button>Settings</button></li>
        <button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button>
      </ul>
    </nav>
     );
}
 
export default SideNavigationbar;