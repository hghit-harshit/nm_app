import React, { useState } from 'react';
import axios from 'axios';
//import { getCsrfToken } from '../csrf'; 
import '../styles/Assignment2.css';

const Assignment2 = () => {
  const [degree, setDegree] = useState('');
  const [loading, setLoading] = useState(false);
  const [method1Results, setMethod1Results] = useState(null);
  const [method2Results, setMethod2Results] = useState(null);
  const [error, setError] = useState('');
  const [collapseMethod1, setCollapseMethod1] = useState(true);
  const [collapseMethod2, setCollapseMethod2] = useState(true);

  const handleInputChange = (e) => {
    setDegree(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/assignment2_view/', { n: degree });
      const data = response.data;

      setMethod1Results(data.method1);
      setMethod2Results(data.method2);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapseMethod1 = () => setCollapseMethod1(!collapseMethod1);
  const toggleCollapseMethod2 = () => setCollapseMethod2(!collapseMethod2);

  return (
    <div className="assignment2-container">
      <header className="assignment2-header">
        <h1>Assignment 2: Gauss-Legendre Quadrature</h1>
        <p>Enter the degree for Gauss-Legendre quadrature (n) to calculate the nodes, weights, and plots!</p>
        <a href="https://link-to-the-paper.com" target="_blank" rel="noopener noreferrer" className="paper-link">
          View the Paper
        </a>
      </header>

      <main className="content">
        <div className="input-container">
          <input
            type="number"
            value={degree}
            onChange={handleInputChange}
            placeholder="Enter degree (n)"
            className="input-field"
          />
          <button onClick={handleSubmit} className="submit-button" disabled={loading}>
            {loading ? 'Calculating...' : 'Submit'}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {method1Results && (
          <div className="results-container">
            <h2 onClick={toggleCollapseMethod1} className="collapse-header">
              Method 1: Gauss-Legendre Method {collapseMethod1 ? '▲' : '▼'}
            </h2>
            {!collapseMethod1 && (
              <div className="collapse-content">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Node</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {method1Results.nodes.map((node, index) => (
                      <tr key={index}>
                        <td>{node}</td>
                        <td>{method1Results.weights[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="plot-section">
                  <img src={`data:image/png;base64,${method1Results.plot_url}`} alt="Method 1 Plot" className="plot-image" />
                </div>
              </div>
            )}
          </div>
        )}

        {method2Results && (
          <div className="results-container">
            <h2 onClick={toggleCollapseMethod2} className="collapse-header">
              Method 2: Lagrange Method {collapseMethod2 ? '▲' : '▼'}
            </h2>
            {!collapseMethod2 && (
              <div className="collapse-content">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Node</th>
                      <th>Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {method2Results.nodes.map((node, index) => (
                      <tr key={index}>
                        <td>{node}</td>
                        <td>{method2Results.weights[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="plot-section">
                  <img src={`data:image/png;base64,${method2Results.plot_url}`} alt="Method 2 Plot" className="plot-image" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Assignment2;
