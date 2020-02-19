import './App.scss';

import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Routes } from './Routes';

const App = (props) => {
    useEffect(() => {
        insights.chrome.init();
        insights.chrome.identifyApp('dashboard');
    }, []);

    return <Routes childProps={ props } />;
};

App.propTypes = {
    history: PropTypes.object
};

export default App;
