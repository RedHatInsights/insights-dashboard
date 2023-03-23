import './trialsPage.scss';
import PropTypes from 'prop-types';

import { Card, CardBody, CardHeader, Title } from '@patternfly/react-core/dist/esm/components';
import React from 'react';

import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';

import RequirementsBullets from './RequirementsBullets';

const Requirements = ({ isSuccessPage }) => {
    const intl = useIntl();
    const requirementsBullets = [
        { title: trialsMessages.requirementsBulletOneTitle, message: trialsMessages.requirementsBulletOne, icon: 'sm-c-trial__install' },
        { title: trialsMessages.requirementsBulletTwoTitle, message: trialsMessages.requirementsBulletTwo, icon: 'sm-c-trial__clock' }
    ];

    return (
        <Card className='trials-page-cards'>
            <CardHeader>
                <Title headingLevel="h2">
                    {isSuccessPage
                        ? intl.formatMessage(trialsMessages.requirementsToGetStartedTitle) : intl.formatMessage(trialsMessages.requirementsTitle)
                    }
                </Title>
            </CardHeader>
            <CardBody>
                {requirementsBullets.map((bullet, index) => {
                    return (
                        <RequirementsBullets
                            key={`requirements-bullet-${index}`}
                            icon={bullet.icon}
                            message={intl.formatMessage(bullet.message)}
                            title={intl.formatMessage(bullet.title)}
                        />
                    );
                })}
            </CardBody>
        </Card>
    );
};

Requirements.propTypes = {
    isSuccessPage: PropTypes.bool
};

export default Requirements;
