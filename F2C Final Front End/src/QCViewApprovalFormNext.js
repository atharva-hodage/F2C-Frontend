

import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './QCViewApprovalFormNext.css';
import { motion } from "framer-motion";
import logo from '../src/logo3.png';
import animationJSON from "./success2.json";
import { Document, Page, pdfjs } from 'react-pdf';




//npm install pdfjs-dist
//npm install @react-pdf-viewer


//import PdfViewer from './PdfViewer'; // Import the PdfViewer component
//import PdfViewer from '../path/to/PdfViewer'; // Adjust the path accordingly
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function QCViewApprovalFormNext() {
   
  const { requestId } = useParams();
  console.log('Received requestId in QCViewApprovalFormNext:', requestId);


  const [images, setImages] = useState([]);
  const [documentUrl, setDocumentUrl] = useState(null);


  const [visibleDocumentIndex, setVisibleDocumentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);  


const [displayedDocuments, setDisplayedDocuments] = useState([]);
const [startIndex, setStartIndex] = useState(0);
const [requests, setRequests] = useState([]); // useState(null);
const [approvalForm, setApprovalForm] = useState(null);




  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const navigate = useNavigate();


    const initialVariants = {
      opacity: 0,
      scale: 0.9,
    };
 
    const animateVariants = {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        bounce:0.8,
      },
    };
 


  useEffect(() => {
    fetchSingleRequest(requestId, accessToken);
  }, [requestId, accessToken]);


    const fetchSingleRequest = (requestId, accessToken) => {
      setLoading(true);
      setError(null);
   
      axios
        .get(`/api/QCAdmin/getformwithimg/${requestId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setImages(response.data);
          setLoading(false);
       
          const documentUrls = response.data.map((imageResponseForm) => imageResponseForm.docs);
          setDocumentUrl(documentUrls);


          console.log(response.data);
   
          const firstRequest = response.data[0];
          if (firstRequest) {
            const requestIdd = firstRequest.requestId;
            console.log(requestIdd);
   
          }


        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    };




  console.log('Document URLs:', documentUrl);


  const openDocument = (index) => {
    setVisibleDocumentIndex(index);
  };


      const handleImageClick = (imageData) => {
        // Handle the click on the extracted image data, if needed
        console.log('Image clicked:', imageData);
      };




      const handleBack = (requestId) => {
        console.log("handleBack" , requestId);
        navigate(`/QCViewApprovalForm/${requestId}`);
      };


     
     


return (
    <div className="qc-dashboard">
      <nav className="qcleft-navigation">
        <img className="logo" src={logo} alt="logo" />
        <ul>
        <Link to="/QCDashboard" >
        {/* <Link to="/QCDashboard" state={{ pendingCount, approvedCount, rejectedCount }}> */}
  <li>
    <button>Home</button>
  </li>
  </Link>




   <Link to ="/QCViewFReqList">   <li><button>Verification Request</button></li> </Link>  
       
   <Link to ="/QCWorkResponse">      <li><button>Handled Request</button></li></Link>
        <li><button>Notifications</button></li>
        <li><button>Settings</button></li>
        <li><button>Logout</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        <header className="qctop-navigation">
          <h1 className="welcome-text">Welcome to Quality Check Employee Portal</h1>
          <button className="qcprofile-button">Profile</button>
        </header>
        <div className='qcdivcontainernext'>
          <div className="qccontainernext">


            <div className="qcaftitlenext">Approval Form</div>


            {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">Error: {error.message}</p>
          ) : (
            <div>
              {images.map((imageResponseForm, index) => (
                <div key={index}>
                 
              <div className="qcview-detailn">


              <div className="qcview-detailn">
                    <strong> Farm Location: </strong>
                    <div className="qcview-detail-value"> {imageResponseForm.farmLocation}</div>
                  </div>


               {/*
                    <strong> Request ID: </strong>
                    <div className="qcview-detail-value"> {imageResponseForm.requestId}</div>
                  </div>


                  <div className="qcview-detail">
                    <strong> Farm Area (In Acre): </strong>
                    <div className="qcview-detail-value"> {imageResponseForm.farmArea}</div>


                   */}  


                  </div>


               
             
              <div className="qcview-detailn">
              <strong> Images :  </strong>
              <br></br>
                {imageResponseForm.imgs.map((img, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`data:image/jpeg;base64,${img}`}
                    alt={` ${index} Image ${imgIndex}`}
                    onClick={() => handleImageClick(img)} // Handle image click
                       
                  />
                ))}




                           
              </div>
                  <div className="qcview-detailn">
                    <strong> Documents: </strong>
                    {imageResponseForm.docs.map((docUrl, docIndex) => (
                      <div key={docIndex}>


                  {/*       <strong> Document Number: {docIndex + 1} </strong>    */}


                        {/*
                        <button onClick={() => openDocument(docIndex)}>View Doc {docIndex + 1}</button>
                        */}


                      </div>
                    ))}
                  </div>


                </div>
              ))}
            </div>
          )}




           {/* fix size of container */}              
          {visibleDocumentIndex >= 0 && visibleDocumentIndex < images.length && (
             <div className="document-container">
            <div className="document-viewer">
            <DocumentViewer
              pdfData={`data:application/pdf;base64,${images[visibleDocumentIndex].docs}`}
            />
            {/*    
              <Document file={`data:application/pdf;base64,${images[visibleDocumentIndex].docs}`}>
               <Page pageNumber={1} />
               </Document>
           


             <Document file={images[visibleDocumentIndex].pdfUrl}>
             */}  
             
             
           </div>
           </div>
           )}


           {/*


             <PdfViewer pdfData={images[visibleDocumentIndex].docs} onImageClick={handleImageClick} />
           
           */}      


            <button onClick={handleBack} className="qcback-button">
              Back
            </button>


            {isVisible && (
              <motion.div
                initial={initialVariants}
                animate={animateVariants}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  height: 200,
                  backgroundColor: "#ffffff",
                  border: "1px solid #cccccc",
                  borderRadius: 5,
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                }}
                className="pop-up-screen"
              >
                <motion.lottie src={animationJSON} loop autoplay />
                <h1>Request Approved Successfully</h1>
                <button onClick={() => setIsVisible(false)}>Close</button>
              </motion.div>


            )}


          </div>
        </div>
      </div>
    </div>
  );
              }  


              /*
              const DocumentViewer = ({ pdfData }) => {
                const containerRef = useRef();
             
                useEffect(() => {
                  if (containerRef.current) {
                    containerRef.current.addEventListener('wheel', handleWheel);
                    return () => {
                      containerRef.current.removeEventListener('wheel', handleWheel);
                    };
                  }
                }, []);
             
                const handleWheel = (e) => {
                  e.stopPropagation();
                };
             
                return (
                  <div ref={containerRef} className="document-container-scrollable">
                    <Document file={pdfData}>
                      <Page pageNumber={1} />
                    </Document>
                  </div>
                );
               
              };
              */




              const DocumentViewer = ({ pdfData }) => {
                const containerRef = useRef();
                const [scale, setScale] = useState(1);
             
                useEffect(() => {
                  const container = containerRef.current;
             
                  const resizePdfToFit = () => {
                    const containerWidth = container.clientWidth;
                    const pdfViewer = container.querySelector('.react-pdf__Viewer');
                    const pdfViewerWidth = pdfViewer.clientWidth;
             
                    if (containerWidth !== pdfViewerWidth) {
                      const newScale = containerWidth / pdfViewerWidth;
                      setScale(newScale);
                    }
                  };
             
                  if (container) {
                    window.addEventListener('resize', resizePdfToFit);
                    return () => {
                      window.removeEventListener('resize', resizePdfToFit);
                    };
                  }
                }, [containerRef]);
             
                return (
                  <div ref={containerRef} className="document-container-scrollable">
                    <Document file={pdfData}>
                      <Page pageNumber={1} scale={scale} />
                    </Document>
                  </div>
                );
              };
             
export default QCViewApprovalFormNext;
