import './trialsPage.scss';

import { Card, CardBody, CardHeader, Title } from '@patternfly/react-core/dist/esm/components';
import React, { useState } from 'react';

import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';

import GettingStartedBullets from './GettingStartedBullets';
import SystemsModal from './SystemsModal';
import { gettingStartedBullets } from './Constants';

const GettingStarted = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [defaultActiveFilters, setDefaultActiveFilters] = useState([]);
    const [activeEmptyState, setActiveEmptyState] = useState();
    const [modalTitle, setModalTitle] = useState();
    const [modalDescription, setModalDescription] = useState();
    const intl = useIntl();

    return (
        <React.Fragment>
            <SystemsModal
                activeEmptyState={activeEmptyState}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
                defaultActiveFilters={defaultActiveFilters}
                modalTitle={modalTitle}
                modalDescription={modalDescription}
            />
            <Card className='trials-page-cards'>
                <CardHeader>
                    <Title headingLevel="h2">
                        {intl.formatMessage(trialsMessages.gettingStartedTitle)}
                    </Title>
                </CardHeader>
                <CardBody>
                    {gettingStartedBullets(
                        setIsModalOpened, setDefaultActiveFilters, setActiveEmptyState, setModalTitle, setModalDescription
                    ).map((bullet, index) => {
                        return (
                            <GettingStartedBullets
                                key={`getting-started-bullet-${index}`}
                                number={bullet.number}
                                message={bullet.message}
                                title={intl.formatMessage(bullet.title)}
                            />
                        );
                    })}
                </CardBody>
            </Card>
        </React.Fragment>
    );
};

export default GettingStarted;
