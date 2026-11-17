import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';
import { usePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBACHook/RBACHook';
import { Button } from '@patternfly/react-core/dist/esm/components';
import { Label } from '@patternfly/react-core/dist/esm/components/Label';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import {
  INVENTORY_ALL_SYSTEMS_VIEW_PARAM,
  INVENTORY_FETCH_URL,
  INVENTORY_STALE_FETCH_URL,
  INVENTORY_TOTAL_FETCH_URL,
  INVENTORY_WARNING_FETCH_URL,
} from '../../AppConstants';
import { useFeatureFlag } from '../../Utilities/Hooks';
import { IconInline } from '../IconInline/IconInline';
import { NumberData } from '../NumberData/NumberData';
import { useInventoryHostsReadKesselProbe } from '../../Utilities/hooks/useInventoryHostsReadKesselProbe';
import { useInventoryViewsFeatureFlag } from '../../Utilities/hooks/useInventoryViewsFeatureFlag';
import { useSelectedWorkspace } from './useSelectedWorkspace';
import { useWidgetData } from './useWidgetData';
import WidgetStates, { type WidgetUIState } from './WidgetStates';
import messages from '../../Messages';
import './InventoryWidget.scss';

interface HostsCountPayload {
  total: number;
}

type InventoryInsightsLinkProps = {
  to: string;
  app: string;
  className?: string;
  children: React.ReactNode;
};

const InventoryInsightsLink = InsightsLink as unknown as (
  props: InventoryInsightsLinkProps,
) => JSX.Element;

const INVENTORY_HOST_READ_PERMISSIONS = ['inventory:hosts:read'];

interface InventoryWidgetContentProps {
  hasAccess?: boolean;
  isAccessLoading: boolean;
}

const InventoryWidgetContent = ({
  hasAccess,
  isAccessLoading,
}: InventoryWidgetContentProps) => {
  const intl = useIntl();
  const isInventoryViewsEnabled = useInventoryViewsFeatureFlag();
  const viewParam = isInventoryViewsEnabled
    ? `&${INVENTORY_ALL_SYSTEMS_VIEW_PARAM}`
    : '';

  const selectedWorkspace = useSelectedWorkspace();

  const { data, state } = useWidgetData(
    async (api) => {
      const [total, stale, staleWarning, registered] = (await Promise.all([
        api.get(INVENTORY_TOTAL_FETCH_URL),
        api.get(INVENTORY_STALE_FETCH_URL),
        api.get(INVENTORY_WARNING_FETCH_URL),
        api.get(INVENTORY_FETCH_URL),
      ])) as unknown as HostsCountPayload[];

      return {
        total: total?.total ?? 0,
        stale: stale?.total ?? 0,
        staleWarning: staleWarning?.total ?? 0,
        notRegistered: Math.max(
          (total?.total ?? 0) - (registered?.total ?? 0),
          0,
        ),
      };
    },
    { enabled: hasAccess && !isAccessLoading },
  );

  const isEmpty = (data?.total ?? 0) === 0;
  const notRegistered = data?.notRegistered ?? 0;

  const uiState: WidgetUIState =
    !hasAccess && !isAccessLoading ? 'access-denied' : state;

  return (
    <div className="pf-v6-u-h-100 pf-v6-u-p-md insd-c-inventory-widget">
      <WidgetStates state={uiState}>
        <Flex direction={{ default: 'column' }} className="pf-v6-u-h-100">
          <Flex
            className="insd-c-inventory-widget__row"
            direction={{ default: 'row' }}
            justifyContent={{ default: 'justifyContentSpaceBetween' }}
            alignItems={{ default: 'alignItemsFlexStart' }}
            flexWrap={{ default: 'wrap' }}
            gap={{ default: 'gapLg' }}
          >
            <FlexItem>
              <Flex
                alignItems={{ default: 'alignItemsCenter' }}
                gap={{ default: 'gapSm' }}
              >
                <FlexItem>
                  <div className="insd-c-inventory-widget__count">
                    <NumberData
                      data={(data?.total ?? 0).toLocaleString()}
                      dataSize="xl"
                    />
                  </div>
                </FlexItem>
                <FlexItem>
                  <Label
                    color="grey"
                    className="insd-c-inventory-widget__workspace-chip"
                  >
                    {selectedWorkspace
                      ? selectedWorkspace.name
                      : intl.formatMessage(
                          messages.inventoryWidgetDefaultWorkspace,
                        )}
                  </Label>
                </FlexItem>
              </Flex>
              <div className="insd-c-inventory-widget__label">
                {intl.formatMessage(messages.inventoryWidgetTotalSystems)}
              </div>
            </FlexItem>
            {!isEmpty && (
              <FlexItem>
                <Flex
                  direction={{ default: 'column' }}
                  gap={{ default: 'gapSm' }}
                  className="insd-c-inventory-widget__stats"
                >
                  <FlexItem>
                    <InventoryInsightsLink
                      app="inventory"
                      to={`/?status=stale_warning&source=puptoo${viewParam}`}
                      className="pf-v6-c-button pf-m-link pf-m-inline"
                    >
                      <IconInline
                        message={intl.formatMessage(
                          messages.systemInventoryStaleWarning,
                          { count: data?.staleWarning ?? 0 },
                        )}
                        state="critical"
                        systemInventory
                      />
                    </InventoryInsightsLink>
                  </FlexItem>
                  <FlexItem>
                    <InventoryInsightsLink
                      app="inventory"
                      to={`/?status=stale&source=puptoo${viewParam}`}
                      className="pf-v6-c-button pf-m-link pf-m-inline"
                    >
                      <IconInline
                        message={intl.formatMessage(
                          messages.systemInventoryStale,
                          {
                            count: data?.stale ?? 0,
                          },
                        )}
                        state="warning"
                        systemInventory
                      />
                    </InventoryInsightsLink>
                  </FlexItem>
                  {notRegistered > 0 && (
                    <FlexItem>
                      <InventoryInsightsLink
                        app="registration"
                        to="/"
                        className="pf-v6-c-button pf-m-link pf-m-inline"
                      >
                        <IconInline
                          message={intl.formatMessage(
                            messages.inventoryWidgetNotRegistered,
                            { count: notRegistered },
                          )}
                          state="info"
                          systemInventory
                        />
                      </InventoryInsightsLink>
                    </FlexItem>
                  )}
                </Flex>
              </FlexItem>
            )}
          </Flex>
          {isEmpty && (
            <FlexItem>
              <p className="insd-c-inventory-widget__empty-message">
                {intl.formatMessage(messages.inventoryWidgetEmpty)}
              </p>
            </FlexItem>
          )}
          <FlexItem className="pf-v6-u-mt-auto">
            <Flex gap={{ default: 'gapSm' }}>
              <FlexItem>
                <InventoryInsightsLink app="registration" to="/">
                  {isEmpty ? (
                    <Button variant="primary">
                      {intl.formatMessage(messages.systemInventoryCTA)}
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      className="insd-c-inventory-widget__pill insd-c-inventory-widget__pill--emphasis"
                    >
                      {intl.formatMessage(messages.systemInventoryCTA)}
                    </Button>
                  )}
                </InventoryInsightsLink>
              </FlexItem>
              <FlexItem>
                <Link to="/settings/integrations?category=Communications">
                  <Button
                    variant="link"
                    className="insd-c-inventory-widget__pill insd-c-inventory-widget__pill--outline"
                  >
                    {intl.formatMessage(
                      messages.inventoryWidgetConfigureIntegrations,
                    )}
                  </Button>
                </Link>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </WidgetStates>
    </div>
  );
};

const InventoryWidgetWithRbac = () => {
  const { hasAccess, isLoading } = usePermissions(
    'inventory',
    INVENTORY_HOST_READ_PERMISSIONS,
  );

  return (
    <InventoryWidgetContent hasAccess={hasAccess} isAccessLoading={isLoading} />
  );
};

const InventoryWidgetWithKessel = () => {
  const { hasAccess, isLoading } = useInventoryHostsReadKesselProbe();

  return (
    <InventoryWidgetContent hasAccess={hasAccess} isAccessLoading={isLoading} />
  );
};

const InventoryWidget = () => {
  const isKesselEnabled = useFeatureFlag('insights-dashboard.kessel_enabled');

  return isKesselEnabled ? (
    <InventoryWidgetWithKessel />
  ) : (
    <InventoryWidgetWithRbac />
  );
};

export default InventoryWidget;
