import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SongActiveProvider,SongProvider} from './components/Provider'

ReactDOM.render(
  <React.StrictMode>
    <SongActiveProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </SongActiveProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
