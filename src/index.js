import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

const renderApp = (Component) => {
  ReactDOM.createRoot(rootElement).render(<Component />);
};

renderApp(App);
