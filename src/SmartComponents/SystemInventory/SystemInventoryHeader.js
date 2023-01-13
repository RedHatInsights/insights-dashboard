/* eslint-disable no-unused-vars */
import './SystemInventoryHeader.scss';

import * as AppActions from '../../AppActions';

// layouts
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect } from 'react';
import { globalFilters, workloadsPropType } from '../../Utilities/Common';

// components
import {
    Button
} from '@patternfly/react-core/dist/esm/components';
import FailState from '../../PresentationalComponents/FailState/FailState';
// icons
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { NumberDescription } from '../../PresentationalComponents/NumberDescription/NumberDescription';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
// eslint-disable-next-line no-unused-vars
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryHeader = ({
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

    return <React.Fragment>
        {
            hasAccess === false ?
                <NotAuthorized
                    showReturnButton={ false }
                    serviceName="Inventory"
                    icon={ () => '' }
                    variant='xs'
                    description={ <div>{intl.formatMessage(messages.systemInventoryNoAccess)}</div> }
                /> :
                <Flex spaceItems={ { md: 'spaceItemsXl' } }
                    alignItems={ { md: 'alignItemsCenter' } }
                    direction={ { default: 'column', md: 'row' } }
                >
                    <Flex spaceItems={ { default: 'spaceItemsXl' } }>
                        {inventoryFetchStatus === 'fulfilled' && inventoryTotalFetchStatus === 'fulfilled' &&
                            <NumberDescription
                                data={ inventorySummary.total.toLocaleString() || 0 }
                                dataSize="lg"
                                linkDescription={ intl.formatMessage(messages.systemInventoryDescription,
                                    { count: inventorySummary.total || 0 }
                                ) }
                                link='./insights/inventory/?source=puptoo'
                            />
                        }
                        {/* {inventoryFetchStatus === 'fulfilled' && inventoryTotalFetchStatus === 'fulfilled' &&
                            <NumberDescription
                                data={ inventoryTotalSummary.total - inventorySummary.total || 0 }
                                dataSize="lg"
                                linkDescription={ intl.formatMessage(messages.systemInventoryUnregisteredDescription,
                                    { count: inventoryTotalSummary.total || 0 }
                                ) }
                                link='./insights/inventory'
                            />
                        } */}
                    </Flex>
                    <Flex spaceItems={ { default: 'spaceItemsXl' } }
                        alignItems={ { md: 'alignItemsCenter' } }
                        flex={ { default: 'flex_1' } }
                        direction={ { default: 'column', md: 'row' } }
                    >
                        <Flex direction={ { default: 'column' } } spaceItems={ { default: 'spaceItemsNone' } }>
                            <FlexItem>
                                {inventoryStaleFetchStatus === 'fulfilled' &&
                                    <Button
                                        component="a"
                                        variant="link"
                                        href='./insights/inventory/?status=stale&source=puptoo'
                                        isInline
                                    >
                                        <IconInline
                                            message={ intl.formatMessage(messages.systemInventoryStale,
                                                { count: inventoryStaleSummary.total || 0 }
                                            ) }
                                            state="warning"
                                            systemInventory
                                        />
                                    </Button>
                                }
                            </FlexItem>
                            <FlexItem>
                                {inventoryWarningFetchStatus === 'fulfilled' &&
                                    <Button
                                        component="a"
                                        variant="link"
                                        href='./insights/inventory/?status=stale_warning&source=puptoo'
                                        isInline
                                    >
                                        <IconInline
                                            message={ intl.formatMessage(messages.systemInventoryStaleWarning,
                                                { count: inventoryWarningSummary.total || 0 }
                                            ) }
                                            state="critical"
                                            systemInventory
                                        />
                                    </Button>
                                }
                            </FlexItem>
                            {inventoryTotalFetchStatus === 'rejected' &&
                                <FailState appName='Inventory' isSmall />
                            }
                        </Flex>
                        <FlexItem align={{ md: 'alignRight' }}>
                            <Button
                                className='pf-u-mr-sm pf-u-font-size-md'
                                component='a'
                                variant='secondary'
                                isSmall
                                href={ `settings/integrations` }
                            >
                                { intl.formatMessage(messages.configureIntegrations) }
                            </Button>
                            <Button
                                component='a'
                                variant='primary'
                                href={ `${UI_BASE}/registration` }
                            >
                                { intl.formatMessage(messages.systemInventoryCTA) }
                            </Button>
                        </FlexItem>
                    </Flex>
                </Flex>
        }
    </React.Fragment>;
};

SystemInventoryHeader.propTypes = {
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
)(SystemInventoryHeader);
