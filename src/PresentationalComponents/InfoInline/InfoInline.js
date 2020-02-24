import React from 'react';
import propTypes from 'prop-types';
import { InfoCircleIcon } from '@patternfly/react-icons';
import './InfoInline.scss';

export const InfoInline = ({ message }) => {
    return (
        <div className="insights-dashboard__info-inline">
            <InfoCircleIcon/>
            <p>{ message }</p>
        </div>
    );
};

InfoInline.propTypes = {
    message: propTypes.string
};

export default InfoInline;
