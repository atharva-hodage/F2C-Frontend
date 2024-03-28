
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { Razorpay } from 'react-razorpay';
import logo from '../src/logo3.png';

import './PaymentForm.css'
const PaymentForm = () => {
  const { orderId } = useParams(); //Bitch you shouldn't do this shit
  const location = useLocation();
  const [amount, setAmount] = useState(location.state?.amount || '');
  const[billingId,setBillingId] = useState('');
  const accessToken = Cookies.get('accessToken');
  const consumerId = localStorage.getItem("userId");
  const cropId = localStorage.getItem("cropID");
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      console.log("THis is before the Payment")
        const response = await axios.post(
            `/api/payments/order?amount=${amount}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`, // Add the authorization header
              },
            }
          );
      
      const order = response.data;
      console.log('Payment order created:', order);
      console.log("This is OrderId from UseParams",orderId);
      setBillingId(order.id);
      if(order.status==="created"){
        console.log("test");
        let options={
          key:'rzp_test_jj5g0T9ovGQq1a',
          amount:order.amount,
          currency:'INR',
          name:'F2C Payment Test',
          description:'Testing',
          image:'https://www.istockphoto.com/illustrations/agriculture-logo',
          order_id:order.id,
          handler:function(response){
            console.log("Test");
            console.log(response.razorpay_payment_id);
            console.log(response.razorpay_order_id);
            console.log(response.razorpay_signature);
            console.log("Payment Successfull");
            try{
              const response1 = axios.post(
              `/api/payments/verify?orderId=${orderId}&paymentId=${response.razorpay_payment_id}&signature=${response.razorpay_signature}&userId=${consumerId}&billingId=${billingId}&cropId=${cropId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`, // Add the authorization header
                },
              }
            );
              console.log("This is after verify",response1);
              navigate('/crops');

          }catch (error) {
            console.error('Error creating payment order:', error);
          }
            

          },
          prefill: {
            name: "",
            email: "",
            contact: ""
            },
          notes: {
              address: "tCognition Consultancy Limited"
              
              },
          theme: {
              "color": "#3399cc"
              }
        };
        // let rzp=new Razorpay(options);


        const rzp = new window.Razorpay(options);
        // rzp.open();

          rzp.on('payment.failed', function (response){
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          alert("payment fail");
          });
          rzp.open();
      }
    
    } catch (error) {
      console.error('Error creating payment order:', error);
    }
  };

  return (
    <div className="payment-form-container">
      
    <h2>Payment Form</h2>
    <div className="payment-form-container-input">
      <label className='paymentlabel'>Payment Amount(Rs.) : </label>
    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
    <button onClick={handlePayment}>Make Payment</button>
  </div>
  </div>
  );
};

export default PaymentForm;