import React from 'react';
import propTypes from 'prop-types';
import InfoIcon from '../../Icons/InfoIcon';
import WarningIcon from '../../Icons/WarningIcon';
import CriticalIcon from '../../Icons/CriticalIcon';
import './IconInline.scss';

const checkState = state => {
    switch (state) {
        case 'warning':
            return <WarningIcon/>;
        case 'info':
            return <InfoIcon/>;
        case 'critical':
            return <CriticalIcon/>;
        default:
            return null;
    }
};

export const IconInline = ({ message, state, systemInventory }) => (
    <div className={ 'ins-c-dashboard__info-inline' + (systemInventory ? ' ins-m-padding-top ' : '') }>
        { checkState(state) }
        <p>{ message }</p>
    </div>
);

IconInline.propTypes = {
    message: propTypes.string,
    state: propTypes.string,
    systemInventory: propTypes.boolean
};

export default IconInline;
