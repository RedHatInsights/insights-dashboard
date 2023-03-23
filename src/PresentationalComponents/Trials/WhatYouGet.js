import './trialsPage.scss';

import { Card, CardBody, CardFooter, CardHeader, Title } from '@patternfly/react-core/dist/esm/components';
import React from 'react';

import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';

import WhatYouGetBullets from './WhatYouGetBullets';
import TrialsText from './TrialsText';

const WhatYouGet = () => {
    const intl = useIntl();
    const whatYouGetBullets = [
        trialsMessages.whatYouGetBulletOne,
        trialsMessages.whatYouGetBulletTwo,
        trialsMessages.whatYouGetBulletThree,
        trialsMessages.whatYouGetBulletFour,
        trialsMessages.whatYouGetBulletFive,
        trialsMessages.whatYouGetBulletSix
    ];
    const whatYouGetFooter = {
        message: trialsMessages.whatYouGetFooter,
        value: {
            a: (chunks) => <a href={ `${window.location.origin}${window.location.pathname}#trial-terms` }>{ chunks }</a>
        }
    };

    return (
        <Card className='trials-page-cards'>
            <CardHeader>
                <Title headingLevel="h2">
                    {intl.formatMessage(trialsMessages.whatYouGetTitle)}
                </Title>
            </CardHeader>
            <CardBody>
                {whatYouGetBullets.map((bullet, index) => {
                    return <WhatYouGetBullets key={`what-you-get-bullet-${index}`} message={intl.formatMessage(bullet)} />;
                })}
            </CardBody>
            <CardFooter>
                <TrialsText
                    messages={[whatYouGetFooter]}
                    style={{ color: '#6a6e73' }}
                />
            </CardFooter>
        </Card>
    );
};

export default WhatYouGet;
