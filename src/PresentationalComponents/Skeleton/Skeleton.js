import './_Skeleton.scss';

import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { CardFooter } from '@patternfly/react-core/dist/js/components/Card/CardFooter';
import { CardHeader } from '@patternfly/react-core/dist/js/components/Card/CardHeader';
import React from 'react';
import { Skeleton } from '@redhat-cloud-services/frontend-components/components/Skeleton/';

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
