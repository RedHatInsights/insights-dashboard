import React from 'react';

import { Card, CardBody, CardFooter, CardHeader } from '@patternfly/react-core';

import { Skeleton } from '@red-hat-insights/insights-frontend-components';

import './_Skeleton.scss';

const Loading = () => {
    return (
        <Card className='ins-c-rules-card ins-c-card__skeleton'>
            <CardHeader>
                <Skeleton size='sm' />
            </CardHeader>
            <CardBody>
                <Skeleton size='md' />
                <br />
                <Skeleton size='md' />
            </CardBody>
            <CardFooter>
                <Skeleton size='sm' />
            </CardFooter>
        </Card>
    );
};

export default Loading;
