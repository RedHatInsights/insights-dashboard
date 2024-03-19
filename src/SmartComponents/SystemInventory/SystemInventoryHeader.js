/* eslint-disable no-unused-vars */
import './SystemInventoryHeader.scss';
// layouts
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';
import React, { useEffect } from 'react';
import { workloadsPropType } from '../../Utilities/Common';

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
import { connect } from 'react-redux';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
// eslint-disable-next-line no-unused-vars
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';
import { Link } from 'react-router-dom';
import { EdgeDevicesWarning } from './EdgeDevicesWarning';
import { useBatchInventoryFetch } from '../../Utilities/useBatchInventoryFetch';
import { Spinner } from '@redhat-cloud-services/frontend-components';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryHeader = ({
    selectedTags, workloads, SID
}) => {

    const { hasAccess } = usePermissions('inventory', [
        'inventory:*:*',
        'inventory:*:read',
        'inventory:hosts:*',
        'inventory:hosts:read'
    ]);
    const [isLoading, inventorySummary, inventoryWarningSummary, error] = useBatchInventoryFetch(workloads, SID, selectedTags);

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
                <React.Fragment>
                    <EdgeDevicesWarning />
                    {!isLoading && !error ?
                        <Flex spaceItems={ { md: 'spaceItemsXl' } }
                            alignItems={ { md: 'alignItemsCenter' } }
                            direction={ { default: 'column', md: 'row' } }
                        >
                            <Flex spaceItems={ { default: 'spaceItemsXl' } }>
                                <NumberDescription
                                    data={ inventorySummary.total.toLocaleString() || 0 }
                                    dataSize="lg"
                                    linkDescription={ intl.formatMessage(messages.systemInventoryDescription,
                                        { count: inventorySummary.total || 0 }
                                    ) }
                                    app='inventory'
                                    link='/?source=puptoo'
                                />
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

                                        <InsightsLink
                                            app='inventory'
                                            to='/?status=stale&source=puptoo'
                                            className="pf-v5-c-button pf-m-link pf-m-inline">
                                            <IconInline
                                                message={ intl.formatMessage(messages.systemInventoryStale,
                                                    { count: inventorySummary.total || 0 }
                                                ) }
                                                state="warning"
                                                systemInventory
                                            />
                                        </InsightsLink>

                                    </FlexItem>
                                    <FlexItem>

                                        <InsightsLink
                                            app='inventory'
                                            to='/?status=stale_warning&source=puptoo'
                                            className="pf-v5-c-button pf-m-link pf-m-inline">
                                            <IconInline
                                                message={ intl.formatMessage(messages.systemInventoryStaleWarning,
                                                    { count: inventoryWarningSummary.total || 0 }
                                                ) }
                                                state="critical"
                                                systemInventory
                                            />
                                        </InsightsLink>

                                    </FlexItem>
                                </Flex>
                                <FlexItem align={{ md: 'alignRight' }}>
                                    <Link to="/settings/integrations">
                                        <Button
                                            className='pf-v5-u-mr-sm pf-v5-u-font-size-md'
                                            variant='secondary'
                                            size='sm'
                                        >
                                            { intl.formatMessage(messages.configureIntegrations) }
                                        </Button>
                                    </Link>
                                    <InsightsLink app='registration' to="/">
                                        <Button
                                            variant='primary'
                                        >
                                            { intl.formatMessage(messages.systemInventoryCTA) }
                                        </Button>
                                    </InsightsLink>
                                </FlexItem>
                            </Flex>
                        </Flex>
                        : error ?
                            <FailState appName='Inventory' isSmall />
                            :  <Spinner/>
                    }
                </React.Fragment>
        }
    </React.Fragment>;
};

SystemInventoryHeader.propTypes = {
    fetchEdgeTotal: PropTypes.func,
    edgeTotalSummary: PropTypes.object,
    edgeTotalFetchStatus: PropTypes.string,
    intl: PropTypes.any,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    workloads: workloadsPropType,
    SID: PropTypes.arrayOf(PropTypes.string)
};

export default connect(
    ({ DashboardStore }) => ({
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads,
        SID: DashboardStore.SID
    })
)(SystemInventoryHeader);
