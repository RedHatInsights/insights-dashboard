import './PageLoading.scss';

import {
    EmptyState,
    EmptyStateIcon,
    Title
} from '@patternfly/react-core/dist/esm/components';

import React from 'react';
import { Spinner } from '@patternfly/react-core/dist/esm/components/Spinner';

const PageLoading = () => <EmptyState>
    <EmptyStateIcon variant="container" component={ Spinner } />
    <Title size="lg" headingLevel="h4">
        Loading
    </Title>
</EmptyState>;

export default PageLoading;
