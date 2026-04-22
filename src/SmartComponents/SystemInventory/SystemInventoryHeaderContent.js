import './SystemInventoryHeader.scss';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import React from 'react';
import { workloadsPropType } from '../../Utilities/Common';
import { Button, Skeleton } from '@patternfly/react-core/dist/esm/components';
import FailState from '../../PresentationalComponents/FailState/FailState';
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { NumberDescription } from '../../PresentationalComponents/NumberDescription/NumberDescription';
import PropTypes from 'prop-types';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';
import { Link } from 'react-router-dom';
import { useBatchInventoryFetch } from '../../Utilities/useBatchInventoryFetch';
import { useFeatureFlag } from '../../Utilities/Hooks';

const accessLoadingSkeleton = (
  <Flex
    spaceItems={{ md: 'spaceItemsXl' }}
    alignItems={{ md: 'alignItemsCenter' }}
    direction={{ default: 'column', md: 'row' }}
  >
    <Flex spaceItems={{ default: 'spaceItemsXl' }}>
      <Skeleton fontSize="4xl" width="200px" />
    </Flex>
    <Flex
      spaceItems={{ default: 'spaceItemsXl' }}
      alignItems={{ md: 'alignItemsCenter' }}
      flex={{ default: 'flex_1' }}
      direction={{ default: 'column', md: 'row' }}
    >
      <Flex
        direction={{ default: 'column' }}
        spaceItems={{ default: 'spaceItemsNone' }}
      >
        <FlexItem>
          <Skeleton width="200px" style={{ marginBottom: 4, marginTop: 4 }} />
        </FlexItem>
        <FlexItem>
          <Skeleton width="200px" />
        </FlexItem>
      </Flex>
      <FlexItem align={{ md: 'alignRight' }}>
        <Skeleton width="120px" height="32px" className="pf-v6-u-mr-sm" />
        <Skeleton width="140px" height="32px" />
      </FlexItem>
    </Flex>
  </Flex>
);

const SystemInventoryHeaderContent = ({
  selectedTags,
  workloads,
  hasInventoryHostRead,
  isInventoryHostReadLoading,
}) => {
  const isLightspeedEnabled = useFeatureFlag('platform.lightspeed-rebrand');
  const mayFetch = !isInventoryHostReadLoading && hasInventoryHostRead === true;

  const [
    isLoading,
    inventorySummary,
    inventoryWarningSummary,
    inventoryStaleSum,
    error,
  ] = useBatchInventoryFetch(workloads, selectedTags, mayFetch);

  const intl = useIntl();

  if (isInventoryHostReadLoading) {
    return <React.Fragment>{accessLoadingSkeleton}</React.Fragment>;
  }

  if (hasInventoryHostRead === false) {
    return (
      <NotAuthorized
        showReturnButton={false}
        serviceName="Inventory"
        icon={() => ''}
        variant="xs"
        description={
          <div>{intl.formatMessage(messages.systemInventoryNoAccess)}</div>
        }
      />
    );
  }

  return (
    <React.Fragment>
      {!error ? (
        <Flex
          spaceItems={{ md: 'spaceItemsXl' }}
          alignItems={{ md: 'alignItemsCenter' }}
          direction={{ default: 'column', md: 'row' }}
        >
          <Flex spaceItems={{ default: 'spaceItemsXl' }}>
            {isLoading ? (
              <Skeleton fontSize="4xl" width="200px" />
            ) : (
              <NumberDescription
                data={inventorySummary?.total.toLocaleString() || 0}
                dataSize="lg"
                linkDescription={intl.formatMessage(
                  messages.systemInventoryDescription,
                  {
                    count: inventorySummary?.total || 0,
                    productName: isLightspeedEnabled
                      ? 'the insights-client'
                      : 'Insights',
                  },
                )}
                app="inventory"
                link="/?source=puptoo"
              />
            )}
          </Flex>
          <Flex
            spaceItems={{ default: 'spaceItemsXl' }}
            alignItems={{ md: 'alignItemsCenter' }}
            flex={{ default: 'flex_1' }}
            direction={{ default: 'column', md: 'row' }}
          >
            <Flex
              direction={{ default: 'column' }}
              spaceItems={{ default: 'spaceItemsNone' }}
            >
              <FlexItem>
                {isLoading ? (
                  <Skeleton
                    width="200px"
                    style={{ marginBottom: 4, marginTop: 4 }}
                  />
                ) : (
                  <InsightsLink
                    app="inventory"
                    to="/?status=stale&source=puptoo"
                    className="pf-v6-c-button pf-m-link pf-m-inline"
                  >
                    <IconInline
                      message={intl.formatMessage(
                        messages.systemInventoryStale,
                        { count: inventoryStaleSum?.total || 0 },
                      )}
                      state="warning"
                      systemInventory
                    />
                  </InsightsLink>
                )}
              </FlexItem>
              <FlexItem>
                {isLoading ? (
                  <Skeleton width="200px" />
                ) : (
                  <InsightsLink
                    app="inventory"
                    to="/?status=stale_warning&source=puptoo"
                    className="pf-v6-c-button pf-m-link pf-m-inline"
                  >
                    <IconInline
                      message={intl.formatMessage(
                        messages.systemInventoryStaleWarning,
                        { count: inventoryWarningSummary?.total || 0 },
                      )}
                      state="critical"
                      systemInventory
                    />
                  </InsightsLink>
                )}
              </FlexItem>
            </Flex>
            <FlexItem align={{ md: 'alignRight' }}>
              <Link to="/settings/integrations?category=Communications">
                <Button
                  className="pf-v6-u-mr-sm pf-v6-u-font-size-md"
                  variant="secondary"
                  size="sm"
                >
                  {intl.formatMessage(messages.configureIntegrations)}
                </Button>
              </Link>
              <InsightsLink app="registration" to="/">
                <Button variant="primary">
                  {intl.formatMessage(messages.systemInventoryCTA)}
                </Button>
              </InsightsLink>
            </FlexItem>
          </Flex>
        </Flex>
      ) : (
        <FailState appName="Inventory" isSmall />
      )}
    </React.Fragment>
  );
};

SystemInventoryHeaderContent.propTypes = {
  selectedTags: PropTypes.arrayOf(PropTypes.string),
  workloads: workloadsPropType,
  hasInventoryHostRead: PropTypes.bool.isRequired,
  isInventoryHostReadLoading: PropTypes.bool.isRequired,
};

export default SystemInventoryHeaderContent;
