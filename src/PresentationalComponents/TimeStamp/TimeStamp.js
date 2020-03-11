import React from 'react';
import propTypes from 'prop-types';
import './TimeStamp.scss';

export const TimeStamp = ({ timestamp }) => (
    <p className="ins-c-dashboard__time-stamp">
        { timestamp }
    </p>
);

TimeStamp.propTypes = {
    timestamp: propTypes.string
};

export default TimeStamp;
