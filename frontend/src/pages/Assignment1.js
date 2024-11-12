import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Assignment1.css';
import { getCsrfToken } from '../csrf';
import ResultsDisplay from './ResultDisplay';

const Assignment1 = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [matrixResults, setMatrixResults] = useState(null);
  const [error, setError] = useState(null);

  // Handle CSV file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!csvFile) {
      alert("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await axios.post('http://localhost:8000/assignment1_view/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': getCsrfToken(),
          
        }
      });
      console.log(response.data)
      // Assuming response.data contains the computed result
      setMatrixResults(response.data);
    } catch (err) {
      setError("Error uploading file or processing matrix.");
      console.error(err);
    }
  };

  return (
    <div className="assignment1-container">
      <h1 className="header">Assignment 1: Matrix Operations</h1>

      {/* CSV File Upload */}
      <div className="upload-section">
        <input type="file" accept=".csv" onChange={handleFileChange} className="file-upload" />
        <button onClick={handleUpload} className="upload-button">Upload CSV</button>
      </div>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Results */}
      {/* Display Results */}
      {matrixResults ? (
        <div className="matrix-results">
          <h2>Matrix Results</h2>
          <ResultsDisplay data={matrixResults} />  {/* Pass matrixResults to ResultsDisplay */}
        </div>
      ) : (
        <p className="instruction">Upload a CSV to see the results.</p>
      )}
    </div>
  );
};

export default Assignment1;
