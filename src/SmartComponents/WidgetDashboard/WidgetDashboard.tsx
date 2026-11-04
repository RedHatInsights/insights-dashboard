import React from 'react';
import { PageSection } from '@patternfly/react-core/dist/esm/components/Page';
import { Bullseye } from '@patternfly/react-core/dist/esm/layouts/Bullseye';
import {
  EmptyState,
  EmptyStateBody,
} from '@patternfly/react-core/dist/esm/components/EmptyState';
import { EmptyStateHeader } from '@patternfly/react-core/dist/esm/components/EmptyState/EmptyStateHeader';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

const WidgetDashboard = () => {
  const intl = useIntl();

  return (
    <PageSection>
      <Bullseye>
        <EmptyState>
          <EmptyStateHeader
            titleText={intl.formatMessage(messages.widgetRevampTitle)}
            headingLevel="h1"
          />
          <EmptyStateBody>
            {intl.formatMessage(messages.widgetRevampBody)}
          </EmptyStateBody>
        </EmptyState>
      </Bullseye>
    </PageSection>
  );
};

export default WidgetDashboard;
