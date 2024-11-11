import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="main-page-header">
        <h1>Assignments</h1>
        <p>Click on the cards to view assignments</p>
      </div>

      <div className="card-container">
        <div className="card">
          <Link to="/assignment1">
            <div className="card-content">
              <h2>Assignment 1</h2>
              <p>Click to view details of Assignment 1</p>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="assignment2">
            <div className="card-content">
              <h2>Assignment 2</h2>
              <p>Click to view details of Assignment 2</p>
            </div>
          </Link>
        </div>

        <div className="card">
          <Link to="assignment3">
            <div className="card-content">
              <h2>Assignment 3</h2>
              <p>Click to view details of Assignment 3</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
