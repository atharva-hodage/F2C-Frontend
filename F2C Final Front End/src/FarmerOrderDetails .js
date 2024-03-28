import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ExportToExcel from 'react-html-table-to-excel';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../src/logo3.png';
import FarmerHeaderBar from './FarmerHeaderBar';
import FarmerSideNavigationbar from './FarmerSideNavigationbar';

const FarmerOrderDetails = () => {
  const [orderResponses, setOrderResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const farmerId = localStorage.getItem('userId');
  const accessToken = Cookies.get('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rolef/viewallorderf/${farmerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setOrderResponses(response.data);
    } catch (error) {
      setError(error.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    const input = document.getElementById('orderTable');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
  
        // Calculate aspect ratio
        const aspectRatio = canvas.width / canvas.height;
  
        // Set PDF dimensions based on aspect ratio
        const pdfWidth = 210; // A4 page width in mm
        const pdfHeight = pdfWidth / aspectRatio;
  
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('orderDetails.pdf');
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="cons-dashboard">
      <FarmerHeaderBar />
      <FarmerSideNavigationbar />
      <div className="content">
        <div className='consumerdashpagecontainerdiv'>
          <div className='getfarmerordertablecontainer'>
            <div>
              <button className="btn btn-info" onClick={downloadPdf}>
                Export to PDF
              </button>
              <ExportToExcel
                id="exportButton"
                className="btn btn-success"
                table="orderTable"
                filename="orderDetails"
                sheet="orderDetails"
                buttonText="Export to Excel"
              />
            </div>
            <div>
              <table id='orderTable' className='getcropdetailstable'>
                <thead className='getcropdetailstablehead'>
                  <tr>
                    <th>Crop Name</th>
                    <th>Crop Price</th>
                    <th>Quantity</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Total Amount</th>
                    <th>Payment Status</th>
                    <th>Consumer Name</th>
                  </tr>
                </thead>

                <tbody>
                  {orderResponses.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.cropName}</td>
                      <td>{order.itemPrice}</td>
                      <td>{order.totalQuantity}</td>
                      <td>{new Date(order.orderDateTime).toLocaleDateString()}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.totalAmount}</td>
                      <td>{order.paymentStatus}</td>
                      <td>{order.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerOrderDetails;
