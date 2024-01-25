import './RemediationsEmptyState.scss';

import { EmptyState, EmptyStateVariant, EmptyStateHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyState';

import { EmptyStateBody } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateBody';
import PropTypes from 'prop-types';
import React from 'react';
import {  } from '@patternfly/react-core/dist/esm/components/Title/Title';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

export const RemediationsEmptyState = () => {

    const intl = useIntl();

    return (
        <EmptyState variant={ EmptyStateVariant.sm }>
            <EmptyStateHeader titleText={<>{ intl.formatMessage(messages.remediationsNoDataTitle)}</>} headingLevel='h6' />
            <EmptyStateBody>
                { intl.formatMessage(messages.remediationsNoDataBody)}
            </EmptyStateBody>
        </EmptyState>
    );
};

RemediationsEmptyState.propTypes = {
    intl: PropTypes.any
};
