import './HelpIconPopover.scss';

import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Icon, Popover } from '@patternfly/react-core';
import { RhUiQuestionMarkCircleIcon } from '@patternfly/react-icons';

const HelpIconPopover = ({ headerContent, bodyContent, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Popover
      headerContent={headerContent}
      bodyContent={bodyContent}
      onShow={() => setIsExpanded(true)}
      onHide={() => setIsExpanded(false)}
    >
      <Icon
        className={`insd-c-info-icon${className ? ` ${className}` : ''}${isExpanded ? ' insd-m-expanded' : ''}`}
        aria-label="More information"
      >
        <RhUiQuestionMarkCircleIcon />
      </Icon>
    </Popover>
  );
};

HelpIconPopover.propTypes = {
  headerContent: propTypes.node.isRequired,
  bodyContent: propTypes.node.isRequired,
  className: propTypes.string,
};

export default HelpIconPopover;
