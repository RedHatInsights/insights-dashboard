import { Button, EmptyState, EmptyStateBody, Text, Title } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import * as ActionTypes from '../../AppConstants';

export const DriftEmptyState = () => {

    const intl = useIntl();

    return (
        <EmptyState>
            <Title headingLevel="h4" size="lg">
                {intl.formatMessage(messages.driftEmptyStateTitle)}
            </Title>
            <EmptyStateBody>
                <Text>
                    {intl.formatMessage(messages.driftEmptyStateBodyCreateBaseline)}
                </Text>
                <Text>
                    {intl.formatMessage(messages.driftEmptyStateBodyEnableNotif)}
                </Text>
            </EmptyStateBody>
            <Button
                href={`${ActionTypes.DRIFT_BASELINES_URL}`}
                variant="primary">Go to Baselines
            </Button>
        </EmptyState>
    );
};
