import './PageLoading.scss';

import React from 'react';
import { Spinner } from '@patternfly/react-core/dist/esm/components/Spinner';
import { EmptyState, EmptyStateHeader, EmptyStateIcon } from '@patternfly/react-core';

const PageLoading = () => <EmptyState>
    <EmptyStateHeader titleText="Loading" headingLevel='h4' icon={<EmptyStateIcon icon={Spinner} />}/>
</EmptyState>;

export default PageLoading;
