import React from 'react';
import { Skeleton } from '@patternfly/react-core/dist/esm/components/Skeleton';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
} from '@patternfly/react-core/dist/esm/components/EmptyState';
import { EmptyStateHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateHeader';
import { Button } from '@patternfly/react-core/dist/esm/components/Button';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts';
import { LockIcon } from '@patternfly/react-icons';
import RhUiErrorFillIcon from '@patternfly/react-icons/dist/js/icons/rh-ui-error-fill-icon';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import type { WidgetDataState } from './useWidgetData';
import './WidgetStates.scss';

export type WidgetUIState = WidgetDataState | 'access-denied';

export interface WidgetStatesProps {
  state: WidgetUIState;
  children?: React.ReactNode;
  emptyBody?: React.ReactNode;
  emptyAction?: React.ReactNode;
  onRetry?: () => void;
}

type IconProps = React.ComponentProps<typeof LockIcon>;

const GrayLockIcon = (props: IconProps) => (
  <LockIcon
    {...props}
    data-testid="widget-state-lock-icon"
    style={{ color: 'var(--pf-t--global--icon--color--200)' }}
  />
);

const ErrorStateIcon = (props: IconProps) => (
  <RhUiErrorFillIcon {...props} data-testid="widget-state-error-icon" />
);

const StateCtaRow = ({ children }: { children: React.ReactNode }) => (
  <FlexItem className="pf-v6-u-mt-auto">
    <Flex gap={{ default: 'gapSm' }}>{children}</Flex>
  </FlexItem>
);

const StateCtaLink = ({ href, label }: { href: string; label: string }) => (
  <Button
    variant="secondary"
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {label}
  </Button>
);

const WidgetStates = ({
  state,
  children,
  emptyBody,
  emptyAction,
  onRetry,
}: WidgetStatesProps) => {
  const intl = useIntl();

  if (state === 'loading') {
    return (
      <div className="pf-v6-u-h-100">
        <Skeleton height="100%" width="100%" />
      </div>
    );
  }

  if (state === 'default') {
    return <>{children}</>;
  }

  if (state === 'empty') {
    return (
      <EmptyState variant={EmptyStateVariant.sm} className="pf-v6-u-h-100">
        <EmptyStateHeader
          titleText={intl.formatMessage(messages.widgetStateEmptyTitle)}
          headingLevel="h2"
        />
        <EmptyStateBody>
          {emptyBody ?? intl.formatMessage(messages.widgetStateEmptyBody)}
        </EmptyStateBody>
        {emptyAction}
      </EmptyState>
    );
  }

  if (state === 'error') {
    return (
      <div className="pf-v6-u-h-100 insd-c-widget-state">
        <Flex direction={{ default: 'column' }} className="pf-v6-u-h-100">
          <FlexItem>
            <EmptyState
              variant={EmptyStateVariant.sm}
              status="danger"
              icon={ErrorStateIcon}
              titleText={intl.formatMessage(messages.widgetStateErrorTitle)}
              headingLevel="h2"
            />
          </FlexItem>
          <StateCtaRow>
            {onRetry && (
              <Button variant="secondary" onClick={onRetry}>
                {intl.formatMessage(messages.widgetStateErrorRetry)}
              </Button>
            )}
            <StateCtaLink
              href="https://access.redhat.com/support"
              label={intl.formatMessage(messages.widgetStateErrorHelp)}
            />
          </StateCtaRow>
        </Flex>
      </div>
    );
  }

  return (
    <div className="pf-v6-u-h-100 insd-c-widget-state">
      <Flex direction={{ default: 'column' }} className="pf-v6-u-h-100">
        <FlexItem>
          <EmptyState
            variant={EmptyStateVariant.sm}
            icon={GrayLockIcon}
            titleText={intl.formatMessage(
              messages.widgetStateAccessDeniedTitle,
            )}
            headingLevel="h2"
          >
            <EmptyStateBody>
              {intl.formatMessage(messages.widgetStateAccessDeniedBody)}
            </EmptyStateBody>
          </EmptyState>
        </FlexItem>
        <StateCtaRow>
          <StateCtaLink
            href="https://docs.redhat.com/en/red-hat-insights"
            label={intl.formatMessage(
              messages.widgetStateAccessDeniedLearnMore,
            )}
          />
        </StateCtaRow>
      </Flex>
    </div>
  );
};

export default WidgetStates;
