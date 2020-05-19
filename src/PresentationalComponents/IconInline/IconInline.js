import React from 'react';
import propTypes from 'prop-types';
import InfoIcon from '../../Icons/InfoIcon';
import WarningIcon from '../../Icons/WarningIcon';
import CriticalIcon from '../../Icons/CriticalIcon';
import './IconInline.scss';

const checkState = {
    warning: WarningIcon,
    info: InfoIcon,
    critical: CriticalIcon
};

export const IconInline = ({ message, state, systemInventory }) => {
    const Icon = checkState[state] || React.Fragment;

    return (
        <div className={ `ins-c-dashboard__info-inline ${systemInventory ? ' ins-m-padding-top' : ''}` }>
            <Icon aria-hidden="true"/>
            <p>{ message }</p>
        </div>
    );
};

IconInline.propTypes = {
    message: propTypes.string,
    state: propTypes.string,
    systemInventory: propTypes.boolean
};

export default IconInline;
