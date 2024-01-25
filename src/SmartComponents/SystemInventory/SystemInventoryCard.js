import './SystemInventoryCard.scss';

import * as AppActions from '../../AppActions';

import React, { Fragment, useEffect } from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { globalFilters, workloadsPropType } from '../../Utilities/Common';

import FailState from '../../PresentationalComponents/FailState/FailState';
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { NumberDescription } from '../../PresentationalComponents/NumberDescription/NumberDescription';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
// eslint-disable-next-line no-unused-vars
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryCard = ({
    fetchInventory, inventoryFetchStatus, inventorySummary,
    fetchInventoryStale, inventoryStaleFetchStatus, inventoryStaleSummary,
    fetchInventoryWarning, inventoryWarningFetchStatus, inventoryWarningSummary,
    fetchInventoryTotal, inventoryTotalFetchStatus, inventoryTotalSummary,
    selectedTags, workloads, SID
}) => {

    const { hasAccess } = usePermissions('inventory', [
        'inventory:*:*',
        'inventory:*:read',
        'inventory:hosts:*',
        'inventory:hosts:read'
    ]);

    useEffect(() => {
        const options = { ...globalFilters(workloads, SID), ...selectedTags?.length > 0 && { tags: selectedTags } };
        fetchInventoryTotal(options);
        fetchInventory(options);
        fetchInventoryStale(options);
        fetchInventoryWarning(options);
    }, [fetchInventoryTotal, fetchInventory, fetchInventoryStale, fetchInventoryWarning, selectedTags, workloads, SID]
    );

    const intl = useIntl();

    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.systemInventoryTitle) } />
        <TemplateCardBody
            isFilled={ hasAccess === false }
            className={ `insd-dashboard-card-system-inventory-body ${hasAccess === false ? ' dashboard-m-no-access' : ''}` }
        >
            {
                hasAccess === false ?
                    <NotAuthorized
                        showReturnButton={ false }
                        serviceName="Inventory"
                        icon={ () => '' }
                        variant='xs'
                        description={ <div>{intl.formatMessage(messages.systemInventoryNoAccess)}</div> }
                    /> :
                    <Fragment>
                        {inventoryFetchStatus === 'fulfilled' && inventoryTotalFetchStatus === 'fulfilled' &&
                            <NumberDescription
                                data={ inventorySummary.total.toLocaleString() || 0 }
                                dataSize="lg"
                                percentageData={ intl.formatMessage(messages.systemInventoryPercentageData,
                                    { count: Math.floor((inventorySummary.total / inventoryTotalSummary.total) * 100) || 0 }
                                ) }
                                linkDescription={ intl.formatMessage(messages.systemInventoryDescription,
                                    { count: inventorySummary.total || 0 }
                                ) }
                                app="inventory"
                                link='/'
                                iconTooltipText={ intl.formatMessage(messages.systemInventoryNotUsingClient,
                                    { count: inventoryTotalSummary.total - inventorySummary.total || 0 }
                                ) }
                            />
                        }
                        {inventoryStaleFetchStatus === 'fulfilled' &&
                        <InsightsLink app='inventory' to='/?status=stale' className="pf-c-button pf-m-link pf-m-inline">
                            <IconInline
                                message={ intl.formatMessage(messages.systemInventoryStale,
                                    { count: inventoryStaleSummary.total || 0 }
                                ) }
                                state="warning"
                                systemInventory="true"
                            />
                        </InsightsLink>
                        }
                        {inventoryWarningFetchStatus === 'fulfilled' &&
                        <InsightsLink app='inventory' to='/?status=stale_warning' className="pf-c-button pf-m-link pf-m-inline">
                            <IconInline
                                message={ intl.formatMessage(messages.systemInventoryStaleWarning,
                                    { count: inventoryWarningSummary.total || 0 }
                                ) }
                                state="critical"
                                systemInventory="true"
                            />
                        </InsightsLink>
                        }
                        {inventoryTotalFetchStatus === 'rejected' &&
                            <FailState appName='Inventory' isSmall />
                        }
                    </Fragment>
            }
        </TemplateCardBody>
    </TemplateCard>;
};

SystemInventoryCard.propTypes = {
    fetchInventory: PropTypes.func,
    inventorySummary: PropTypes.object,
    inventoryFetchStatus: PropTypes.string,
    fetchInventoryStale: PropTypes.func,
    inventoryStaleSummary: PropTypes.object,
    inventoryStaleFetchStatus: PropTypes.string,
    fetchInventoryWarning: PropTypes.func,
    inventoryWarningSummary: PropTypes.object,
    inventoryWarningFetchStatus: PropTypes.string,
    fetchInventoryTotal: PropTypes.func,
    inventoryTotalSummary: PropTypes.object,
    inventoryTotalFetchStatus: PropTypes.string,
    intl: PropTypes.any,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

export default connect(
    ({ DashboardStore }) => ({
        inventorySummary: DashboardStore.inventorySummary,
        inventoryFetchStatus: DashboardStore.inventoryFetchStatus,
        inventoryStaleSummary: DashboardStore.inventoryStaleSummary,
        inventoryStaleFetchStatus: DashboardStore.inventoryStaleFetchStatus,
        inventoryWarningSummary: DashboardStore.inventoryWarningSummary,
        inventoryWarningFetchStatus: DashboardStore.inventoryWarningFetchStatus,
        inventoryTotalSummary: DashboardStore.inventoryTotalSummary,
        inventoryTotalFetchStatus: DashboardStore.inventoryTotalFetchStatus,
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    }),
    dispatch => ({
        fetchInventory: (params) => dispatch(AppActions.fetchInventorySummary(params)),
        fetchInventoryStale: (params) => dispatch(AppActions.fetchInventoryStaleSummary(params)),
        fetchInventoryWarning: (params) => dispatch(AppActions.fetchInventoryWarningSummary(params)),
        fetchInventoryTotal: (params) => dispatch(AppActions.fetchInventoryTotalSummary(params))
    })
)(SystemInventoryCard);
