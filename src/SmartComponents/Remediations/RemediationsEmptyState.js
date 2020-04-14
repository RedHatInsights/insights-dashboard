import React from 'react';

import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
import { EmptyStateBody } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateBody';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { Bullseye } from '@patternfly/react-core/dist/js/layouts/Bullseye/Bullseye';

import PropTypes from 'prop-types';

import { useIntl } from 'react-intl';
import messages from '../../Messages';

export const RemediationsEmptyState = () => {

    const intl = useIntl();

    return (
        <Bullseye>
            <EmptyState variant={ EmptyStateVariant.small }>
                <Title headingLevel="h6" size="md">
                    { intl.formatMessage(messages.remediationsNoDataTitle)}
                </Title>
                <EmptyStateBody>
                    { intl.formatMessage(messages.remediationsNoDataBody)}
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>
    );
};

RemediationsEmptyState.propTypes = {
    intl: PropTypes.any
};
