import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BackgroundProvider } from './contexts/background.context';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
           <BackgroundProvider>
                <App />
            </BackgroundProvider>
    </React.StrictMode>
);
