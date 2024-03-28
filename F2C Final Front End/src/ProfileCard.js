import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../src/logo3.png';
import './ProfileCard.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
const ProfileCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const accessToken = Cookies.get('accessToken');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [showProfileFragment, setShowProfileFragment] = useState(false);
    const userId = localStorage.getItem('userId');
    const defaultProfileIcon = <FontAwesomeIcon icon={faUser} size="5x" color="#555" />;
    const fileInputRef = useRef(null);


 
    // Add this inside your QCProfilePage component
    const logoutFunc = () => {
        Cookies.remove('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('phoneNo');
        console.log('logoutexecuted');
        navigate('/signin');
      };
 // Fetch user profile data when the component mounts
 const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`/api/QCAdmin/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
setUserProfile(response.data);
    setLoading(false);
    console.log(response.data);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('file', file);


    // Add your API endpoint to upload the profile picture
    axios.post(`/api/QCAdmin/saveProfilePicture/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log(response.data);
      // Refresh the user profile after updating the profile picture
      fetchUserProfile();
      console.log('API response:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Profile Picture uploaded Successfully.',
      });


        // Update the userProfile state with the new profile picture URL
        setUserProfile({
          ...userProfile,
          profileImage: response.data.photoPath, // Adjust the property based on your API response
        });
    })
    .catch((error) => {
      console.error('Error uploading profile picture:', error);
    });
  }
};
 
             // Toggle the visibility of the profile fragment
   const toggleProfileFragment = () => {
    setShowProfileFragment(!showProfileFragment);
  };
 
  useEffect(() => {
       
    fetchUserProfile();
  }, [userId, accessToken]);
 
  return (
    <div className="qc-dashboard">
    <nav className="qcleft-navigation">
    <img className="logo" src={logo} alt="logo" />
      <ul>
      <Link to="/QCDashboard" > {/*state={{ pendingCount, approvedCount, rejectedCount }}*/}
<li>
  <button>Home</button>
</li>
</Link>
   <Link to ="/QCViewFReqList">   <li><button>Verification Request</button></li> </Link>  
       
   <Link to ="/QCWorkResponse">      <li><button>Approved Request</button></li></Link>
        <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button onClick={logoutFunc}  className="listfarmerdashboard">Logout</button></li>


      </ul>
    </nav>
    <div className="content">
      <header   className="qctop-navigation">
        {/* Add your top navigation content here */}
        <h1  className="welcome-text">Welcome to Quality Check Employee Portal</h1>
        <div className="profile-container">
        {/* Use onMouseEnter and onMouseLeave on the container */}
        <div className="qcprofile-container" onMouseEnter={toggleProfileFragment} onMouseLeave={toggleProfileFragment}>
          <button className="qcprofile-button">Profile</button>
          {/* Display the profile fragment when showProfileFragment is true */}
          {showProfileFragment && (
            <div className="profile-fragment">
              <ul>
              <li><Link to="/QCProfilePage"><button>View Profile</button></Link></li>
                <li><button>Edit Profile</button></li>
                <li><button onClick={logoutFunc}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      </header>
     
    <div className="mainProfile">
    {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
      <section className="profile-card">
      <div className="image">
      <div className="profile-icon-container">
      {userProfile && userProfile.profileImage ? (
            <img
              src={userProfile.profileImage}
              alt=""
              className="profile-pic"
            />
          ) : (
            <>
            {defaultProfileIcon}
            {/* File input for selecting a profile picture */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button onClick={() => fileInputRef.current.click()}>Select Profile Picture</button>
          </>
          )}
          </div>
        </div>
     {userProfile&&(
        <div className="dataP">
          <h2>{userProfile.firstName} {userProfile.lastName}</h2>
          <span>Contact : {userProfile.phoneNo}</span>
          <span>Email : {userProfile.email}</span>
        </div>)}
        <div className="rowP">
          <div className="infoP">
            <h5>Request Handled</h5>
            <span>{state?.approvedCount}</span>
          </div>
          <div className="infoP">
            <h5>Request Pending</h5>
            <span>{state?.pendingCount}</span>
          </div>
          {/* <div className="info">
            <h3>Posts</h3>
            <span>209</span>
          </div> */}
        </div>
        <div className="buttons">
          <a href="#" className="btn">
            Message
          </a>
          <a href="#" className="btn">
            Follow Me
          </a>
        </div>


      </section>
    </div>
       
    </div>
    </div>
  );
};


export default ProfileCard;
