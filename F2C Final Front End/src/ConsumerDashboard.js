import React from 'react';
import './ConsumerDashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../src/logo3.png';

function ConsumerDashboard() {
  const consumerId = localStorage.getItem("userId")
  const navigate = useNavigate();

  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
console.log("logoutexecuted");
    navigate('/signin');
  };
  return (
    <div className="cons-dashboard">
      <nav className="consumerleft-navigation">
      <img className="logo" src={logo} alt="logo" />
        <ul>
    <Link to="/consumerdashboard">     <li><button className='consumerleftnavbuttonhome'>Home</button></li></Link> 
     <Link to="/crops"> <li><button>Products</button></li></Link> 
     <Link to={`/consumerCart/${consumerId}`}><li><button className='consumerleftnavbuttonmycart'> My Cart</button></li></Link>
     <Link to="/orderHistory">  <li><button>Orders</button></li> </Link> 
     <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>

          {/* <li><button>Transaction</button></li>
          <li><button>Notification</button></li> */}
          {/* <li><button>Setting</button></li>
          <li><button>Logout</button></li> */}
        </ul>
      </nav>
      <div className="content">
        <header   className="consumertop-navigation">
          {/* Add your top navigation content here */}
          <h1  className="welcome-text">Welcome to F2C Portal</h1>
                  
          {/* Notification icon */}
            <div className="notification-icon">
            <i className="fas fa-bell"></i>
          </div>
          <button className="consumerprofile-button">Profile</button>
  
        </header>
        {/* Add your main content here */}
         {/* Search filter */}
         {/* <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
          />
          <button className="search-button">Search</button>
        </div> */}
        
     
      </div>
    </div>
  );
}

export default ConsumerDashboard;