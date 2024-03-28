import {BrowserRouter ,Routes,Route} from 'react-router-dom';


// import ForgotPassword from './ForgotPassword';
// import ResetPassword from './ResetPassword';
import React from "react";
import './App.css'

import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import VerifyPhoneno from './VerifyPhoneno';
import Enterotp from './EnterOtp';
import SignInOTP from './SignInOTP';
import LoginViaOtp from './LoginViaOTP';
import Logout from './Logout';

import AddFarmProduct from './AddFarmProduct';
import GetCropDetails from './GetCropDetails';
import FarmerDashboard from './FarmerDashboard';
import FarmerReqList from './FarmerReqList';    
import FViewApprovalForm from './FViewApprovalForm';
import UpdateFarmProduct from './UpdateFarmProduct';
import FarmerOrderDetails from './FarmerOrderDetails ';


import CCDashboard from './CCDashboard';
import CCviewFReqlist from './CCviewFReqlist';
import CCassignQCtoF from './CCassignQCtoF';
import CCWorkResponse from './CCWorkResponse';
import CCviewFReqSingle from './CCviewFReqSingle';
import CCviewQCFreeLoc from './CCviewQCFreeLoc';

import QualityCheckerList from './QualityCheckerList';
import QCDashboard from './QCDashboard';
import  QCViewFReqList from './QCViewFReqList';
import QCViewFReqSingle from './QCViewFReqSingle';
import QCWorkResponse from './QCWorkResponse';
//import QCApprovalForm from './QCApprovalForm';
import QCApprovalForm from './QCApprovalForm ';
import QCViewApprovalForm from './QCViewApprovalForm';
import QCViewApprovalFormNext from './QCViewApprovalFormNext';

//import QCFormSubmit from './QCFormSubmit';
//import QCDocumentViewer from './QCDocumentViewer';

import ProfileCard from './ProfileCard';


import ConsumerCart from './ConsumerCart';
import ConsumerDashboard from './ConsumerDashboard';
import ConsumerDashpage from './ConsumerDashpage'; //Crop List using List of getCropDetails() from Spring
import ConsumerOrder from './ConsumerOrder';
import OrderDetails from './OrderDetails';
import OrderTable from './OrderTable';
import PaymentForm from './Payment';
import ViewSingleCrop from './ViewSingleCrop';



import ReverseGeocode from './ReverseGeocode';
import GeoLocationComponent from './GeoLocationComponent';
import GeoLocationService from './GeoLocationService';
import LocationService from './LocationService';

import NotificationModal from './NotificationModal';


//import CropDetails from './GetCropDetails';
//import FarmerDashboard from './FarmerDashboard';
//import AdminDashboard from './AdminDashboard';
// import ViewFtoCCRequests from './ViewFtoCCRequests';
// import ConsumerDashboard from './ConsumerDashboard';
// import CropDetails from './ConsumerDashboard';
//import ConsumerDashboard from './ConsumerDashboard';


function App() {
 

  
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/signup' element={<SignupForm/>}></Route>
      <Route path='/signin' element={<SigninForm/>}></Route>
 
      <Route path='/loginviaotp' element={<LoginViaOtp/>}></Route>
      <Route path='/enterotp' element={<Enterotp/>}></Route>

      <Route path='/verifyphone' element={<VerifyPhoneno/>}></Route>
      <Route path='/signinviaotp' element={<SignInOTP/>}></Route>

      <Route path="/logout" element={<Logout/>}/>

      <Route path='/addcrop' element={<AddFarmProduct/>}></Route>
      <Route path='/getcroplist' element={<GetCropDetails/>}></Route>
      <Route path='/editCrop/:cropId' element={<UpdateFarmProduct/>}></Route>
<Route path='/farmerreqlist' element={<FarmerReqList/>}></Route>
      <Route path="/FViewApprovalForm/:requestId" element={<FViewApprovalForm/>}/>
      <Route path="/UpdateFarmProduct" element={<UpdateFarmProduct/>}/>
     
      
    
      {/* Call Center Admin */}    
      <Route path="/CCviewFReqlist" element={<CCviewFReqlist />} />
      <Route path="/CCviewFReqSingle/:farmerId/:requestId" element={<CCviewFReqSingle />} />
      <Route path="/CCviewQCFreeLoc/:requestId" element={<CCviewQCFreeLoc />} />
      <Route path="/CCassignQCtoF" element={<CCassignQCtoF/>}/> 
      <Route path="/CCWorkResponse" element={<CCWorkResponse/>}/>

      <Route path="/allqc" element={<QualityCheckerList/>}/>
         
      <Route path="/allqc" element={<QualityCheckerList/>}/>  
      <Route path="/QCViewFReqList" element={<QCViewFReqList/>}/>
      <Route path="/QCviewFReqSingle/:requestId" element={<QCViewFReqSingle/>} />      
   {/*   
      <Route path="/QCApprovalForm/:requestId" element={<QCApprovalForm/>}/>
    */} 

      <Route path="/QCApprovalForm/:requestId/:cropName/:cropSubType/:quantityAvailable/:organicInOrganic" element={<QCApprovalForm/>}/>
   
      <Route path="/QCWorkResponse" element={<QCWorkResponse/>}/>
      <Route path="/QCViewApprovalForm/:requestId" element={<QCViewApprovalForm/>}/>
      <Route path="/QCViewApprovalFormNext/:requestId" element={<QCViewApprovalFormNext/>}/>

      <Route path="/ProfileCard" element={<ProfileCard/>}/>
{/*
     <Route path='/getdoc' element={<QCDocumentViewer/>}  />
     <Route path="/QCFormSubmit" element={<QCFormSubmit/>}/>
      */}

          {/* consumer */}
          <Route path="/consumerCart/:consumerId" element={<ConsumerCart/>} />
         <Route path='/crops' element={<ConsumerDashpage/>}></Route>
         <Route path="/ConsumerOrder/:consumerId/:orderId" element={<ConsumerOrder/>} />
         <Route path="/ViewSingleCrop/:consumerId/:cropId" element={<ViewSingleCrop/>} />
        
         
         <Route path='/myOrders' element={<ConsumerOrder/>}></Route>
         <Route path="/payment/:orderId" element={<PaymentForm/>}></Route>
         <Route path="/geocode" element={<ReverseGeocode/>} />
         <Route path='latlong' element={<GeoLocationComponent/>}  />
         <Route path='/geoloc' element={<GeoLocationService/>} />
         <Route path='/latitude' element={<LocationService/>} />
         <Route path='/orderHistory' element={<OrderTable/>}/>
        <Route path='/farmerorderhistory' element={<FarmerOrderDetails/>}/>
         <Route path='/order-details/:orderId/:orderItemId' element={<OrderDetails/>} />

{/* Dashboards */}
<Route path="/farmerdashboard" element={<FarmerDashboard/>}/>
<Route path="/consumerdashboard" element={<ConsumerDashboard/>}/>
<Route path="/qcdashboard" element={<QCDashboard/>}/>
<Route path="/ccdashboard" element={<CCDashboard/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
