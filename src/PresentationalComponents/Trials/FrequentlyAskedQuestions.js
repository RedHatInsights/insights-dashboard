import './trialsPage.scss';

import { Accordion, Card, CardBody, CardHeader, Title } from '@patternfly/react-core';
import React from 'react';

import FrequentlyAskedQuestionsRows from './FrequentlyAskedQuestionsRows';
import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';
import { faqs } from './Constants';

const FrequentlyAskedQuestions = () => {
    const intl = useIntl();

    return (
        <Card className='trials-page-cards'>
            <CardHeader>
                <Title headingLevel="h2">
                    {intl.formatMessage(trialsMessages.frequentlyAskedQuestionsTitle)}
                </Title>
            </CardHeader>
            <CardBody>
                <Accordion asDefinitionList={false}>
                    {faqs.map((question, index) => {
                        return (
                            <FrequentlyAskedQuestionsRows
                                key={`faq-row-${index}`}
                                faq={intl.formatMessage(question.faq)}
                                answer={question.answer}
                            />
                        );
                    })}
                </Accordion>
            </CardBody>
        </Card>
    );
};

export default FrequentlyAskedQuestions;
