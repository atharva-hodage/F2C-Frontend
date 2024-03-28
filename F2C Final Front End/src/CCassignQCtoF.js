import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CCassignQCtoF.css';
function CCassignQCtoF() {
    const location = useLocation();
     const { success } = location.state || {};
     return (
         <div className="CCassignQCsuccesscontainer">
         <h1 className="CCassignQCsuccessh1">Assign QC to Farmer</h1>
         {success ? (
            <div>
        <div className="CCassignQCsuccess-message">QC assigned to farmer successfully!</div>
        <Link to="/CCviewFReqlist"><button className="button-CCassignQC" >Request List</button></Link>
        </div>
       ) : (
        <div>
      <div className="error-message">Failed to assign QC to farmer.</div>
      <Link to="/CCviewFReqlist"><button className="button-CCassignQC" >Request List</button></Link>
       </div>)}
        </div>
       );
}

export default CCassignQCtoF;