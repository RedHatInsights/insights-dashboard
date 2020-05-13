import './PageLoading.scss';

import { Main } from '@redhat-cloud-services/frontend-components/components/Main';
import React from 'react';
import { Spinner } from '@patternfly/react-core/dist/js/components/Spinner';

const PageLoading = () =>
    <Main>
        <Spinner className='ins-c-loading-spinner'/>
    </Main>;

export default PageLoading;
