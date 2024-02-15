import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Alert } from '@patternfly/react-core';
import messages from '../../Messages';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../AppActions';

export const EdgeDevicesWarning = () => {
    const intl = useIntl();
    const isEdgeParityEnabled = useFeatureFlag('edgeParity.inventory-list');
    const { edgeTotalSummary, edgeTotalFetchStatus } = useSelector(({ DashboardStore }) => ({
        edgeTotalSummary: DashboardStore.edgeTotalSummary,
        edgeTotalFetchStatus: DashboardStore.edgeTotalFetchStatus
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AppActions.fetchEdgeTotal({}));
    }, [dispatch]);

    return isEdgeParityEnabled &&
        edgeTotalFetchStatus === 'fulfilled' &&
        edgeTotalSummary.count > 0
        ? <Alert
            variant="info"
            isInline
            title={intl.formatMessage(messages.edgeWarning)}
        />
        : null;
};
