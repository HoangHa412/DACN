import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from "recoil-nexus";
import 'index.css';
import { App } from 'App';

// setup fake backend
// import { fakeBackend } from '_helpers';
// fakeBackend();

// Suppress benign ResizeObserver loop errors in dev overlay (AntD Table known issue)
const originalError = window.onerror;
window.onerror = function(message, source, lineno, colno, error) {
    if (typeof message === 'string' && message.indexOf('ResizeObserver loop completed with undelivered notifications') !== -1) {
        return true; // prevent logging
    }
    if (originalError) return originalError(message, source, lineno, colno, error);
};

const originalRejection = window.onunhandledrejection;
window.onunhandledrejection = function(event) {
    const msg = (event && event.reason && event.reason.message) || '';
    if (typeof msg === 'string' && msg.indexOf('ResizeObserver loop completed with undelivered notifications') !== -1) {
        event.preventDefault();
        return true;
    }
    if (originalRejection) return originalRejection(event);
};

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <RecoilNexus />
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('app')
);
