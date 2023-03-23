import React from 'react';
import {
    EmptyStateBody,
    EmptyState,
    EmptyStateVariant,
    Title
} from '@patternfly/react-core';
import { useIntl } from 'react-intl';
import trialsMessages from './TrialsMessages';

/**
 * Empty state stable when no systems (or other entities) are found.
 */
const NoEntitiesFound = () => {
    const intl = useIntl();
    return (
        <EmptyState
            variant={EmptyStateVariant.full}
            data-ouia-component-id="empty-state"
            data-ouia-component-type="PF4/EmptyState"
            data-ouia-safe={true}
        >
            <Title headingLevel="h5" size="lg">
                {intl.formatMessage(trialsMessages.emptySystemsTitle)}
            </Title>
            <EmptyStateBody>
                {intl.formatMessage(trialsMessages.emptySystemsBody)}
            </EmptyStateBody>
        </EmptyState>
    );
};

export default NoEntitiesFound;
