import React from 'react';
import { Skeleton } from '@patternfly/react-core/dist/esm/components/Skeleton';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
} from '@patternfly/react-core/dist/esm/components/EmptyState';
import { EmptyStateHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateHeader';
import { EmptyStateFooter } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateFooter';
import { Button } from '@patternfly/react-core/dist/esm/components/Button';
import { useIntl } from 'react-intl';
import messages from '../../Messages';
import type { WidgetDataState } from './useWidgetData';

export type WidgetUIState = WidgetDataState | 'access-denied';

export interface WidgetStatesProps {
  state: WidgetUIState;
  children?: React.ReactNode;
  emptyBody?: React.ReactNode;
}

const WidgetStates = ({ state, children, emptyBody }: WidgetStatesProps) => {
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
      </EmptyState>
    );
  }

  if (state === 'error') {
    return (
      <EmptyState variant={EmptyStateVariant.sm} className="pf-v6-u-h-100">
        <EmptyStateHeader
          titleText={intl.formatMessage(messages.widgetStateErrorTitle)}
          headingLevel="h2"
        />
        <EmptyStateFooter>
          <Button
            variant="link"
            component="a"
            href="https://access.redhat.com/support"
            target="_blank"
            rel="noopener noreferrer"
          >
            {intl.formatMessage(messages.widgetStateErrorHelp)}
          </Button>
        </EmptyStateFooter>
      </EmptyState>
    );
  }

  return (
    <EmptyState variant={EmptyStateVariant.sm} className="pf-v6-u-h-100">
      <EmptyStateHeader
        titleText={intl.formatMessage(messages.widgetStateAccessDeniedTitle)}
        headingLevel="h2"
      />
      <EmptyStateBody>
        {intl.formatMessage(messages.widgetStateAccessDeniedBody)}
      </EmptyStateBody>
      <EmptyStateFooter>
        <Button
          variant="link"
          component="a"
          href="https://docs.redhat.com/en/red-hat-insights"
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.formatMessage(messages.widgetStateAccessDeniedLearnMore)}
        </Button>
      </EmptyStateFooter>
    </EmptyState>
  );
};

export default WidgetStates;
