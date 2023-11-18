import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected the typo here
import './index.css';
import App from '../src/App.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
