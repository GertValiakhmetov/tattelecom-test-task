import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import Service from './services/service';
import ServiceContext from './contexts/serviceContext';

const service = new Service();

ReactDOM.render(
  <React.StrictMode>
    <ServiceContext.Provider value={{
      service,
    }}
    >
      <App />
    </ServiceContext.Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
