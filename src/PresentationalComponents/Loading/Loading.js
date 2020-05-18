import React from 'react';
import { Skeleton } from '@redhat-cloud-services/frontend-components/components/Skeleton';

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
