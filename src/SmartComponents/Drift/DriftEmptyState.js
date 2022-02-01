import { Button, EmptyState, EmptyStateBody, Title } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import * as ActionTypes from '../../AppConstants';
import { useChromePush } from '../../Utilities/hooks/useChromePush';

export const DriftEmptyState = () => {

    const intl = useIntl();
    const navigateTo = useChromePush();

    return (
        <EmptyState>
            <Title headingLevel="h4" size="lg">
                {intl.formatMessage(messages.driftEmptyStateTitle)}
            </Title>
            <EmptyStateBody>
                {intl.formatMessage(messages.driftEmptyStateBody)}
            </EmptyStateBody>
            <Button
                href={`${ActionTypes.DRIFT_BASELINES_URL}`}
                onClick={(e) => navigateTo(e, ActionTypes.DRIFT_BASELINES_URL)}
                variant="primary">Go to Baselines
            </Button>
        </EmptyState>
    );
};
