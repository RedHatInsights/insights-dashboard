import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

export const DriftEmptyState = () => {

    const intl = useIntl();

    return (
        <EmptyState>
            <Title headingLevel="h4" size="lg">
                {intl.formatMessage(messages.driftEmptyStateTitle)}
            </Title>
            <EmptyStateBody>
                {intl.formatMessage(messages.driftEmptyStateBody)}
            </EmptyStateBody>
            <Button variant="primary">Go to Baselines</Button>
        </EmptyState>
    );
};
