import React from 'react';
import propTypes from 'prop-types';
import InfoCircleIcon from '@patternfly/react-icons/dist/js/icons/info-circle-icon';
import './InfoInline.scss';

export const InfoInline = ({ message }) => (
    <div className="ins-c-dashboard__info-inline">
        <InfoCircleIcon/>
        <p>{ message }</p>
    </div>
);

InfoInline.propTypes = {
    message: propTypes.string
};

export default InfoInline;
