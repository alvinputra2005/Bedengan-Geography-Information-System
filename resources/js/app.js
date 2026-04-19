import './bootstrap';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './MainApp';

ReactDOM.createRoot(document.getElementById('app')).render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(MainApp)
    )
);
