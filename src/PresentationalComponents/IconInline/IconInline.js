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

export const IconInline = ({ message, state, systemInventory, href }) => {
    const Icon = checkState[state] || React.Fragment;

    if (href) {
        return (
            <a href={ href } className={ `ins-c-dashboard__info-inline ${systemInventory ? ' ins-m-padding-top' : ''}` }>
                <Icon/>
                <p>{ message }</p>
            </a>
        );
    }

    return (
        <div className={ `ins-c-dashboard__info-inline ${systemInventory ? ' ins-m-padding-top' : ''}` }>
            <Icon/>
            <p>{ message }</p>
        </div>
    );
};

IconInline.propTypes = {
    message: propTypes.string,
    state: propTypes.string,
    systemInventory: propTypes.boolean,
    href: propTypes.string
};

export default IconInline;
