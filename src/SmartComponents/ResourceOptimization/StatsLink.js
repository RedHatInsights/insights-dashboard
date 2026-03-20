import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@patternfly/react-core';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

const StatsLink = ({ to, value, label, fontWeight = 'normal' }) => {
    return (
        <InsightsLink app='ros' to={to}>
            <Flex
                direction={{ default: 'column' }}
                spaceItems={{ default: 'spaceItemsNone' }}
                alignItems={{ default: 'alignItemsCenter' }}
            >
                <span className={`pf-v6-u-font-size-2xl pf-v6-u-color-100 pf-v6-u-font-weight-${fontWeight}`}>
                    {value}
                </span>
                <span className='pf-v6-u-font-size-sm'>
                    {label}
                </span>
            </Flex>
        </InsightsLink>
    );
};

StatsLink.propTypes = {
    to: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    fontWeight: PropTypes.string
};

export default StatsLink;
