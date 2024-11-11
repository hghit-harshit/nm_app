//import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import axios from 'axios';
import MainPage from './components/MainPage';
import Assignment1 from './pages/Assignment1';
import Assignment2 from './pages/Assignment2';
import Assignment3 from './pages/Assignment3';
import "./App.css"
/*function PlotDisplay() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get('api/generate-plot/')
      .then(response => {
        console.log("API Response:", response.data);
        setImage(response.data.image);
      })
      .catch(error => console.error("Error fetching the plot:", error));
  }, []);

  return (
    <div>
      {image ? (
        <img src={`data:image/png;base64,${image}`} alt="Plot" />
      ) : (
        <p>Loading plot...</p>
      )}
    </div>
  );
}*/

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/assignment1" element={<Assignment1 />} />
        <Route path="/assignment2" element={<Assignment2 />} />
        <Route path="/assignment3" element={<Assignment3 />} />
      </Routes>
    </Router>
  );
};

export default App;




//export default PlotDisplay;