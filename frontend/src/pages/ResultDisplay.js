import React from 'react';
import './ResultDisplay.css';

const ResultsDisplay = ({ data }) => {
  if (!data) return null;

  const renderArray = (arr) => (
    <ul>
      {arr.map((value, index) => (
        <li key={index}>{value.toFixed(4)}</li>
      ))}
    </ul>
  );

  return (
    <div className="results-container">
      <h2 className="title">Matrix Calculation Results</h2>

      <div className="section">
        <h3>Matrix (A)</h3>
        <div className="matrix">
          {data.matrix.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((val, colIndex) => (
                <span key={colIndex} className="matrix-value">
                  {val.toFixed(2)}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Vectors b1 and b2</h3>
        <div className="vector-list">
          <div>
            <strong>b1:</strong> {renderArray(data.b1)}
          </div>
          <div>
            <strong>b2:</strong> {renderArray(data.b2)}
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Eigenvalues of A</h3>
        {renderArray(data.eigenvalues_A)}
        <p><strong>Determinant:</strong> {data.determinant.toFixed(2)}</p>
        <p><strong>Condition Number:</strong> {data.condition_number.toFixed(2)}</p>
        <p><strong>Condition Number (Hilbert):</strong> {data.condition_number_hilbert.toFixed(2)}</p>
      </div>

      <div className="section">
        <h3>Solutions</h3>
        <div>
          <strong>x1:</strong> {renderArray(data.solution_x1)}
        </div>
        <div>
          <strong>x2:</strong> {renderArray(data.solution_x2)}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
