import { Button, EmptyState, EmptyStateBody, Text, EmptyStateHeader, EmptyStateFooter  } from '@patternfly/react-core';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import * as ActionTypes from '../../AppConstants';

export const DriftEmptyState = () => {

    const intl = useIntl();

    return (
        <EmptyState>
            <EmptyStateHeader titleText={<>{intl.formatMessage(messages.driftEmptyStateTitle)}</>} headingLevel="h4" />
            <EmptyStateBody>
                <Text>
                    {intl.formatMessage(messages.driftEmptyStateBodyCreateBaseline)}
                </Text>
                <Text>
                    {intl.formatMessage(messages.driftEmptyStateBodyEnableNotif)}
                </Text>
            </EmptyStateBody><EmptyStateFooter>
                <Button
                    href={`${ActionTypes.DRIFT_BASELINES_URL}`}
                    component='a'
                    variant="primary">Go to Baselines
                </Button>
            </EmptyStateFooter></EmptyState>
    );
};
