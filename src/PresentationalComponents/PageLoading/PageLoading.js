import './PageLoading.scss';

import React from 'react';
import {
    EmptyState,
    Spinner
} from '@patternfly/react-core';

const PageLoading = () => <EmptyState  headingLevel='h4' icon={Spinner}  titleText="Loading">
</EmptyState>;

export default PageLoading;
