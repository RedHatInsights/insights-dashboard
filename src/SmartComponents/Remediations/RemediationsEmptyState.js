import './RemediationsEmptyState.scss';

import { EmptyStateBody } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateBody';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { EmptyState, EmptyStateVariant } from '@patternfly/react-core';

export const RemediationsEmptyState = () => {

    const intl = useIntl();

    return (
        <EmptyState  headingLevel='h6'   titleText={<>{ intl.formatMessage(messages.remediationsNoDataTitle)}</>} variant={ EmptyStateVariant.sm }>
            <EmptyStateBody>
                { intl.formatMessage(messages.remediationsNoDataBody)}
            </EmptyStateBody>
        </EmptyState>
    );
};

RemediationsEmptyState.propTypes = {
    intl: PropTypes.any
};
