/* eslint-disable no-unused-vars */
import './SystemInventoryHeader.scss';
// layouts
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';
import React from 'react';
import { workloadsPropType } from '../../Utilities/Common';

// components
import {
    Button,
    Skeleton
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
import { useBatchInventoryFetch } from '../../Utilities/useBatchInventoryFetch';
import { useFeatureFlag } from '../../Utilities/Hooks';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryHeader = ({
    selectedTags, workloads
}) => {
    const isLightspeedEnabled = useFeatureFlag('platform.lightspeed-rebrand');

    const { hasAccess } = usePermissions('inventory', [
        'inventory:*:*',
        'inventory:*:read',
        'inventory:hosts:*',
        'inventory:hosts:read'
    ]);

    const [
        isLoading,
        inventorySummary,
        inventoryWarningSummary,
        inventoryStaleSum,
        error] = useBatchInventoryFetch(workloads, selectedTags, hasAccess);

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
                    {!error ?
                        <Flex spaceItems={ { md: 'spaceItemsXl' } }
                            alignItems={ { md: 'alignItemsCenter' } }
                            direction={ { default: 'column', md: 'row' } }
                        >
                            <Flex spaceItems={ { default: 'spaceItemsXl' } }>
                                {isLoading
                                    ? <Skeleton fontSize="4xl" width="200px" />
                                    : <NumberDescription
                                        data={inventorySummary?.total.toLocaleString() || 0 }
                                        dataSize="lg"
                                        linkDescription={ intl.formatMessage(messages.systemInventoryDescription,
                                            { count: inventorySummary?.total || 0,
                                                productName: isLightspeedEnabled ? 'the insights-client' : 'Insights'
                                            }
                                        ) }
                                        app='inventory'
                                        link='/?source=puptoo'
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
                                        {isLoading
                                            ? <Skeleton width="200px" style={{ marginBottom: 4, marginTop: 4 }} />
                                            : <InsightsLink
                                                app='inventory'
                                                to='/?status=stale&source=puptoo'
                                                className="pf-v6-c-button pf-m-link pf-m-inline">
                                                <IconInline
                                                    message={ intl.formatMessage(messages.systemInventoryStale,
                                                        { count: inventoryStaleSum?.total || 0 }
                                                    ) }
                                                    state="warning"
                                                    systemInventory
                                                />
                                            </InsightsLink>
                                        }
                                    </FlexItem>
                                    <FlexItem>
                                        {isLoading
                                            ? <Skeleton width="200px" />
                                            : <InsightsLink
                                                app='inventory'
                                                to='/?status=stale_warning&source=puptoo'
                                                className="pf-v6-c-button pf-m-link pf-m-inline">
                                                <IconInline
                                                    message={ intl.formatMessage(messages.systemInventoryStaleWarning,
                                                        { count: inventoryWarningSummary?.total || 0 }
                                                    ) }
                                                    state="critical"
                                                    systemInventory
                                                />
                                            </InsightsLink>
                                        }
                                    </FlexItem>
                                </Flex>
                                <FlexItem align={{ md: 'alignRight' }}>
                                    <Link to="/settings/integrations?category=Communications">
                                        <Button
                                            className='pf-v6-u-mr-sm pf-v6-u-font-size-md'
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
                        : <FailState appName='Inventory' isSmall />
                    }
                </React.Fragment>
        }
    </React.Fragment>;
};

SystemInventoryHeader.propTypes = {
    intl: PropTypes.any,
    selectedTags: PropTypes.arrayOf(PropTypes.string),
    workloads: workloadsPropType
};

export default connect(
    ({ DashboardStore }) => ({
        selectedTags: DashboardStore.selectedTags,
        workloads: DashboardStore.workloads
    })
)(SystemInventoryHeader);
