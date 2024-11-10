// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [image, setImage] = useState(null);

    const handleButtonClick = () => {
        axios.post("http://127.0.0.1:8000/api/call-function/")  // Ensure the URL is correct
            .then(response => {
                console.log("Response from Django function:", response.data);
                setImage(`data:image/png;base64,${response.data.image}`);  // Display image in React
            })
            .catch(error => console.error("Error calling function:", error));
    };

    return (
        <div>
            <h1>Call Python Function and Display Plot</h1>
            <button onClick={handleButtonClick}>Generate Plot</button>
            {image && (
                <div>
                    <h2>Generated Plot:</h2>
                    <img src={image} alt="Generated Plot" />
                </div>
            )}
        </div>
    );
}

export default App;
