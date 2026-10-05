import React from 'react';
import ReactDOM from 'react-dom/client';
import JourneyPage from './components/journey/JourneyPage';
import './journey.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <JourneyPage />
  </React.StrictMode>,
);
