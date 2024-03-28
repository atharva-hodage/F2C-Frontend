// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';

// // const ImageUpload = () => {
// //   const [image, setImage] = useState(null);
// //   const [videoStream, setVideoStream] = useState(null);
// //   const accessToken = Cookies.get('accessToken');
// //   const videoRef = React.useRef(null);

// //   const startCamera = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       videoRef.current.srcObject = stream;
// //       setVideoStream(stream);
// //     } catch (error) {
// //       console.error('Error starting camera:', error);
// //     }
// //   };

// //   const stopCamera = () => {
// //     if (videoStream) {
// //       videoStream.getVideoTracks().forEach((track) => track.stop());
// //     }
// //   };

// //   useEffect(() => {
// //     startCamera();

// //     return () => {
// //       stopCamera();
// //     };
// //   }, []);

// //   const handleCaptureImage = async () => {
// //     try {
// //       const canvas = document.createElement('canvas');
// //       canvas.width = videoRef.current.videoWidth;
// //       canvas.height = videoRef.current.videoHeight;
// //       const context = canvas.getContext('2d');
// //       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// //       const imageData = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
// //       const formData = new FormData();
// //       formData.append('image', imageData);
// //       console.log(imageData);
// //     //   setImage(blob);
// //         // console.log(blob)
// //       const response = await axios.post('/api/QCAdmin/uploadImage', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //           Authorization: `Bearer ${accessToken}`,
// //         },
// //       });
// //       console.log("Response Data of Image",response.data)
// //       console.log("Image Id",response.data.id)
// //       console.log("Image Data",response.data.imageData)
// //       setImage(response.data);
// //     //   if (response.data.imageData) {

// //     //     // const base64String = btoa(String.fromCharCode(...new Uint8Array(response.data.imageData)));
// //     //     // console.log("base 64 String",base64String)
// //     //     // const dataURL = `data:image/jpeg;base64,${base64String}`;
// //     //     // setImage(dataURL);
// //     //     // console.log(dataURL);
// //     //   }
// //     } catch (error) {
// //       console.error('Error capturing image:', error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Live Image Capture</h2>
// //       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //         <button onClick={handleCaptureImage}>Capture Image</button>
// //         <div>
// //           <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }}></video>
// //         </div>
// //         {image && (
// //           <div>
// //             <p>Captured Image:</p>
// //             <img src={`data:image/jpeg;base64,${image.imageData}`} alt="Captured" />
// //             {/* <img src={`data:image/jpeg;base64,${image}`} alt="Captured" style={{ maxWidth: '100%', height: 'auto' }} /> */}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageUpload;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ImageUpload = () => {
//   const [image, setImage] = useState(null);
//   const [videoStream, setVideoStream] = useState(null);
//   const accessToken = Cookies.get('accessToken');
//   const openCageDataApiKey = '451e6ef73783432b831e496acc51057e'; // Replace with your API key
//   const videoRef = React.useRef(null);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//       setVideoStream(stream);
//     } catch (error) {
//       console.error('Error starting camera:', error);
//     }
//   };

//   const stopCamera = () => {
//     if (videoStream) {
//       videoStream.getVideoTracks().forEach((track) => track.stop());
//     }
//   };

//   useEffect(() => {
//     startCamera();

//     return () => {
//       stopCamera();
//     };
//   }, []);

//   const handleCaptureImage = async () => {
//     try {
//       const canvas = document.createElement('canvas');
//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;
//       const context = canvas.getContext('2d');
//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       const imageData = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
//       const formData = new FormData();
//       formData.append('image', imageData);

//       // Get latitude and longitude using Geolocation API
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;
//           console.log(latitude);
//           console.log(longitude);

//           // Use latitude and longitude for reverse geocoding
//           try {
//             const locationResponse = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude.toFixed()}+${longitude.toFixed(14)}&key=${openCageDataApiKey}`);
//             const locationData = locationResponse.data.results[0];
          
//             console.log('Location Name:', locationData.formatted);
//           } catch (error) {
//             console.error('Error fetching location data:', error);
//           }
//         });
//       } else {
//         console.error('Geolocation is not available in this browser.');
//       }

//       const response = await axios.post('/api/QCAdmin/uploadImage', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       console.log('Response Data of Image', response.data);
//       console.log('Image Id', response.data.id);
//       console.log('Image Data', response.data.imageData);

//       setImage(response.data);
//     } catch (error) {
//       console.error('Error capturing image:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Live Image Capture</h2>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <button onClick={handleCaptureImage}>Capture Image</button>
//         <div>
//           <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }}></video>
//         </div>
//         {image && (
//           <div>
//             <p>Captured Image:</p>
//             <img src={`data:image/jpeg;base64,${image.imageData}`} alt="Captured" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const accessToken = Cookies.get('accessToken');
  const openCageDataApiKey = '451e6ef73783432b831e496acc51057e'; 
  const googleGeocodingApiKey = 'AIzaSyDCfYUhBh9Qg7PWPulV9sQOSJCw8zph8Ec'; 
  const videoRef = React.useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setVideoStream(stream);
    } catch (error) {
      console.error('Error starting camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getVideoTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const handleCaptureImage = async () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
      const formData = new FormData();
      formData.append('image', imageData);

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const googleGeocodingResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleGeocodingApiKey}`
            );
            const googleGeocodingResults = googleGeocodingResponse.data.results;

            if (googleGeocodingResults && googleGeocodingResults.length > 0) {
              const formattedAddress = googleGeocodingResults[0].formatted_address;
              console.log('Location Name:', formattedAddress);

              try {
                const locationResponse = await axios.get(
                  `https://api.opencagedata.com/geocode/v1/json?q=${latitude.toFixed(6)}+${longitude.toFixed(6)}&key=${openCageDataApiKey}`
                );
                const locationData = locationResponse.data.results[0];
                console.log('OpenCage Location Name:', locationData.formatted);
              } catch (error) {
                console.error('Error fetching location data from OpenCage API:', error);
              }
            } else {
              console.error('No results found from Google Geocoding API');
            }
          } catch (error) {
            console.error('Error fetching address from Google Geocoding API:', error);
          }
        });
      } else {
        console.error('Geolocation is not available in this browser.');
      }

      // Include the accessToken in the request headers for Bearer authentication
      const response = await axios.post('/api/QCAdmin/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${accessToken}`, // Add the Bearer token
        },
      });

      console.log('Response Data of Image', response.data);
      console.log('Image Id', response.data.id);
      console.log('Image Data', response.data.imageData);

      setImage(response.data);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  return (
    <div>
      <h2>Live Image Capture</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button onClick={handleCaptureImage}>Capture Image</button>
        <div>
          <video ref={videoRef} autoPlay style={{ width: '100%', height: 'auto' }}></video>
        </div>
        {image && (
          <div>
            <p>Captured Image:</p>
            <img src={`data:image/jpeg;base64,${image.imageData}`} alt="Captured" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
