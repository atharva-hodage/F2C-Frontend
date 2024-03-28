import React, { useEffect, useState } from "react";
import axios from "axios";
import './FarmerDashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import NotificationModalf from "./NotificationModalf";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

import logo from '../src/logo3.png';
import Cookies from "js-cookie";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function FarmerDashboard() {
  const [chartData, setChartData] = useState([]);
  const [netTotal, setNetTotal] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    months[new Date().getMonth()]
  );
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const farmerId = localStorage.getItem('userId');
      const accessToken = Cookies.get('accessToken');
  const fetchNotifications = async () => {
    try {
      

      const response = await axios.get(`/api/rolef/notificationf/${farmerId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setNotifications(response.data);
      console.log(notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleBellIconClick = async () => {
    // Fetch notifications when the bell icon is clicked
    await fetchNotifications();
    // Show the modal
    setShowModal(true);
  };

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedMonth]);

  const fetchData = async () => {
    try {
      const farmerId = localStorage.getItem("userId");
      const accessToken = Cookies.get("accessToken");

      const response = await axios.get(
        `/api/rolef/crop-earnings/${farmerId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = response.data;
console.log(responseData);
      // If a specific date is selected, filter the data
      let selectedData = responseData.OverallSummary;

      if (selectedYear && selectedMonth) {
        // Aggregate data by month
        selectedData = aggregateDataByMonth(
          responseData,
          selectedYear,
          selectedMonth
        );
      }
      // const fetchNotifications = async () => {
      //   try {
      //     const farmerId = localStorage.getItem('userId');
      //     const accessToken = Cookies.get('accessToken');
    
      //     const response = await axios.get(`/api/rolef/notifications/${farmerId}`, {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     });
    
      //     setNotifications(response.data);
      //   } catch (error) {
      //     console.error('Error fetching notifications:', error);
      //   }
      // };
    
      // const handleBellIconClick = async () => {
      //   // Fetch notifications when the bell icon is clicked
      //   await fetchNotifications();
      //   // Show the modal
      //   setShowModal(true);
      // };
      const pieChartData = Object.entries(selectedData)
        .filter(([key]) => key !== "NetTotal")
        .map(([name, value]) => ({ name, value: parseFloat(value) }));

      const netTotalValue = selectedData.NetTotal || 0;

      setChartData(pieChartData);
      console.log("chart data"+chartData)
      setNetTotal(netTotalValue);
      console.log("net data"+netTotal)

      // Prepare data for the bar chart
      const barChartData = Object.entries(selectedData)
        .filter(([key]) => key !== "NetTotal")
        .map(([crop, earnings]) => ({
          crop,
          earnings: parseFloat(earnings),
        }));

      setBarChartData(barChartData);
      console.log(barChartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // New function to aggregate data by month
  const aggregateDataByMonth = (data, year, month) => {
    const aggregatedData = {};

    // Iterate through the data and sum up values for each crop
    Object.entries(data)
      .filter(([key]) => key !== "OverallSummary")
      .forEach(([date, cropData]) => {
        const [dataYear, dataMonth] = date.split("-");

        if (
          dataYear === year.toString() &&
          months[dataMonth - 1] === month
        ) {
          // Sum up values for each crop
          Object.entries(cropData).forEach(([crop, value]) => {
            if (!aggregatedData[crop]) {
              aggregatedData[crop] = 0;
            }
            aggregatedData[crop] += parseFloat(value);
          });
        }
      });

    // Add NetTotal to the aggregated data
    aggregatedData.NetTotal = Object.values(aggregatedData).reduce(
      (sum, value) => sum + value,
      0
    );

    return aggregatedData;
  };


  const navigate = useNavigate();
  const logoutFunc = () => {
    Cookies.remove('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('phoneNo');
    navigate('/signin');
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date ? date.toISOString().split('T')[0] : null);
  // };


  return (
    <div className="farmer-dashboard">
      <nav className="fleft-navigation">
      <img className="logof" src={logo} alt="logo" />
      <ul>
      <Link to ="/farmerdashboard"><li className="listfarmerdashboard" ><button>Home</button></li></Link>
        <Link to ="/addcrop"><li className="listfarmerdashboard"><button>Add New Crop</button></li></Link>
 <Link to ="/getcroplist">      <li className="listfarmerdashboard"  ><button>Crop List</button></li></Link> 
 
 <Link to ="/farmerreqlist">    <li className="listfarmerdashboard"  ><button>Processed Requests</button></li> </Link>

 <Link to ="/farmerorderhistory">      <li className="listfarmerdashboard"  ><button>Order List</button></li></Link> 
       <li className="listfarmerdashboard"  ><button>Payment</button></li>

          {/*
          <li className="listfarmerdashboard"  ><button>Resources</button></li>
          <li className="listfarmerdashboard"  ><button>Reports</button></li>
      */}

          <li className="listfarmerdashboard"  ><button>Settings</button></li>
          <button onClick={logoutFunc} className="listfarmerdashboard">Logout</button>
        </ul>
      </nav>
      <header className="top-navigation">
          <h1 className="welcome-text">Welcome to Farmer Portal</h1>
          <button className="ffprofile-button">Profile</button>
          <div className="notification-icon" onClick={handleBellIconClick}>
        <FontAwesomeIcon icon={faBell} />
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </div>

      {/* Notification modal */}
      {showModal && (
        <NotificationModalf
          notifications={notifications}
          onClose={() => setShowModal(false)}
        />
      )}
        </header>
      <div className="fcontentforcharts">
 
        <div className="maincontentdashboard">
          <h2>Total Earnings</h2>

          {/* Custom date selection */}
          <div className="date-selection">
            <label>Select Date: </label>

            {/* Year selection */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {/* Populate with available years */}
              {Array.from({ length: 30 }, (_, index) => (
                <option
                  key={index}
                  value={new Date().getFullYear() - index}
                >
                  {new Date().getFullYear() - index}
                </option>
              ))}
            </select>

            {/* Month selection */}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* Pie Chart for Overall Summary */}
          <div className="chart-container">
            <div className="pie-chart" style={{ width: "100%" }}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`#${Math.floor(
                          Math.random() * 16777215
                        ).toString(16)}`}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Net Total Box */}
          <div className="net-total-box">
            <p>Net Total Earnings: ₹{netTotal}</p>
          </div>

          {/* Bar Chart */}
          <div className="bar-chart-container">
            <h2>Crop-Wise Sales</h2>
            <div className="bar-chart">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="earnings" fill="#1750B1" barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
