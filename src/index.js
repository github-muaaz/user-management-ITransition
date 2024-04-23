import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from "react-toastify";

import Router from "./router";
import Auth from "./service/auth";

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.Fragment>
        <Auth>
            <Router/>
        </Auth>

        <ToastContainer/>
    </React.Fragment>
);
