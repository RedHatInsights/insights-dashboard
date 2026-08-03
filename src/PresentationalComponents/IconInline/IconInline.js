import React from 'react';
import propTypes from 'prop-types';
import { Icon } from '@patternfly/react-core';
import {
  RhUiErrorFillIcon,
  RhUiInformationFillIcon,
  RhUiWarningFillIcon,
} from '@patternfly/react-icons';
import './IconInline.scss';

const stateIcons = {
  warning: { status: 'warning', Component: RhUiWarningFillIcon },
  info: { status: 'info', Component: RhUiInformationFillIcon },
  critical: { status: 'danger', Component: RhUiErrorFillIcon },
};

export const IconInline = ({ message, state, systemInventory }) => {
  const iconConfig = stateIcons[state];
  const StatusIcon = iconConfig?.Component;

  return (
    <div
      className={`insd-c-dashboard__info-inline ${systemInventory ? ' insd-m-padding-top' : ''}`}
    >
      {StatusIcon && (
        <Icon status={iconConfig.status} aria-hidden="true">
          <StatusIcon />
        </Icon>
      )}
      <p>{message}</p>
    </div>
  );
};

IconInline.propTypes = {
  message: propTypes.string,
  state: propTypes.string,
  systemInventory: propTypes.bool,
};

export default IconInline;
