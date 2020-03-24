import React from 'react';

import { Main } from '@red-hat-insights/insights-frontend-components';
import { Spinner } from '@patternfly/react-core/dist/js/components/Spinner';
import './PageLoading.scss';

const PageLoading = () =>
    <Main>
        <Spinner className='ins-c-loading-spinner'/>
    </Main>;

export default PageLoading;
