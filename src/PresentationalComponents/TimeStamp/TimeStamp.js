import React from 'react';
import propTypes from 'prop-types';
import './TimeStamp.scss';

export const TimeStamp = ({ timestamp }) => (
    <p className="insd-c-dashboard__time-stamp">
        { timestamp }
    </p>
);

TimeStamp.propTypes = {
    timestamp: propTypes.oneOfType([propTypes.string, propTypes.node])
};

export default TimeStamp;
