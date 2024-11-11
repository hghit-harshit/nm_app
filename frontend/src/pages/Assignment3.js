import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Assignment3.css';

const Assignment3 = () => {
  const [P, setP] = useState('');
  const [u0, setU0] = useState('');
  const [uEnd, setUEnd] = useState('');
  const [graphs, setGraphs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!P || !u0 || !uEnd) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');

    const numericP = parseFloat(P);
    const numericU0 = parseFloat(u0);
    const numericUEnd = parseFloat(uEnd);
  
    if (isNaN(numericP) || isNaN(numericU0) || isNaN(numericUEnd)) {
      setError('Please provide valid numeric values.');
      return;
    }
  
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/assignment3_view/', {
        P: numericP,
        u0: numericU0,
        uEnd: numericUEnd,
      });
      setGraphs(response.data);
    } catch (err) {
      setError('An error occurred while fetching the results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assignment3-container">
      <header className="assignment3-header">
        <h1>Boundary Value Problem Solver</h1>
        <p>Solve the differential equation: d²u/dy² = -P with given boundary conditions</p>
      </header>
      
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>P value:</label>
            <input
              type="number"
              value={P}
              onChange={(e) => setP(e.target.value)}
              placeholder="Enter value of P"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label>Initial value of u:</label>
            <input
              type="number"
              value={u0}
              onChange={(e) => setU0(e.target.value)}
              placeholder="Enter initial u"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label>Final value of u:</label>
            <input
              type="number"
              value={uEnd}
              onChange={(e) => setUEnd(e.target.value)}
              placeholder="Enter final u"
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Processing...' : 'Solve'}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {graphs && (
          <div className="results-container">
            <h2>Results for P = {P}</h2>
            <div className="result">
              <h3>Explicit Euler</h3>
              <img src={`data:image/png;base64,${graphs.explicit}`} alt="Explicit Euler" className="plot-image" />
            </div>
            <div className="result">
              <h3>Implicit Euler</h3>
              <img src={`data:image/png;base64,${graphs.implicit}`} alt="Implicit Euler" className="plot-image" />
            </div>
            <div className="result">
              <h3>Finite Differences</h3>
              <img src={`data:image/png;base64,${graphs.finite_difference}`} alt="Finite Differences" className="plot-image" />
            </div>
            <div className="result">
              <h3>Analytical Solution</h3>
              <img src={`data:image/png;base64,${graphs.analytical}`} alt="Analytical Solution" className="plot-image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment3;
