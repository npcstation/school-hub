import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

try {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (err: any) {
    Object.assign(window.web, {
        type: 'back',
        template: 'ErrorShow',
        data: {
            errormsg: err.message,
            from: 'ui'
        }
    });
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    console.error(err);
}
