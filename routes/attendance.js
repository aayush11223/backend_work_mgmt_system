const express = require('express');
const router = express.Router();


fetch('../data/attendance.json')
    .then((response) => {
        // Check if the network request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then((data) => {
        console.log('Success! Your data:', data);
        useData(data);
    })
    .catch((error) => {
        console.error('Error fetching or processing JSON:', error);
    });