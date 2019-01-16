import React from 'react';

import { Skeleton } from '@red-hat-insights/insights-frontend-components';

const Loading = () => {
    return (
        <React.Fragment>
            <Skeleton size='md' />
            <br />
            <Skeleton size='md' />
        </React.Fragment>
    );
};

export default Loading;
