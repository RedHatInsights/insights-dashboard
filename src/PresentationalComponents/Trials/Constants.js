import React from 'react';
import trialsMessages from './TrialsMessages';
import TrialsText from './TrialsText';
import TrialsBullets from './TrialsBullets';
import { Button, TextContent } from '@patternfly/react-core';
import NoConnectedSystemsTable from './NoConnectedSystemsTable';
import NoEligibleSystemsTable from './NoEligibleSystemsTable';

import { intl } from '../../Utilities/IntlProvider';

const rhcConnectedFilter = [
    {
        rhcdFilter: ['not_nil']
    }
];

const rhcEligibleFilter = [
    {
        rhcdFilter: ['nil']
    },
    {
        osFilter: ['8.6', '8.7', '8.8', '9.0', '9.1', '9.2']
    }
];

const learnMoreMessage = {
    message: trialsMessages.systemsEligibleDescriptionTwo,
    value: {
        a: (chunks) => <a href={`https://access.redhat.com/articles/rhc-registration`}>{ chunks }</a>
    }
};

const systemsEligibleDescription =
    <TextContent><TrialsText messages={[trialsMessages.systemsEligibleDescriptionOne, learnMoreMessage]} /></TextContent>;

const setSystemTable = (
    setIsModalOpened,
    setDefaultActiveFilters,
    setActiveEmptyState,
    emptyState,
    filter,
    setModalTitle,
    title,
    setModalDescription,
    description
) => {
    setIsModalOpened(true);
    setDefaultActiveFilters(filter);
    setActiveEmptyState(emptyState);
    setModalTitle(title);
    setModalDescription(description);
};

export const faqs = [
    {
        faq: trialsMessages.faqOne,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqOneAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqTwo,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqTwoAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqThree,
        answer:
            <TextContent>
                <TrialsText
                    messages={[trialsMessages.faqThreeAnswerParagraphOne, trialsMessages.faqThreeAnswerParagraphTwo]}
                    style={{ color: '#6a6e73' }}
                />
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.faqThreeAnswerBulletOne),
                        intl.formatMessage(trialsMessages.faqThreeAnswerBulletTwo),
                        intl.formatMessage(trialsMessages.faqThreeAnswerBulletThree)
                    ]}
                    style={{ color: '#6a6e73' }}
                />
                <TrialsText messages={[trialsMessages.faqThreeAnswerParagraphThree]} color='#6a6e73' />
            </TextContent>
    },
    {
        faq: trialsMessages.faqFour,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqFourAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqFive,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqFiveAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqSix,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqSixAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqSeven,
        answer:
            <TextContent>
                <TrialsText messages={[trialsMessages.faqSevenAnswerParagraphOne]} style={{ color: '#6a6e73' }} />
                <TrialsBullets
                    isNumbered={true}
                    messages={[
                        intl.formatMessage(trialsMessages.faqSevenAnswerBulletOne),
                        intl.formatMessage(trialsMessages.faqSevenAnswerBulletTwo),
                        intl.formatMessage(trialsMessages.faqSevenAnswerBulletThree),
                        intl.formatMessage(trialsMessages.faqSevenAnswerBulletFour)
                    ]}
                    style={{ color: '#6a6e73' }}
                />
            </TextContent>
    },
    {
        faq: trialsMessages.faqEight,
        answer: <TextContent><TrialsText messages={[trialsMessages.faqEightAnswer]} style={{ color: '#6a6e73' }} /></TextContent>
    },
    {
        faq: trialsMessages.faqNine,
        answer:
            <TextContent>
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.faqNineAnswerBulletOne),
                        intl.formatMessage(trialsMessages.faqNineAnswerBulletTwo),
                        intl.formatMessage(trialsMessages.faqNineAnswerBulletThree)
                    ]}
                    style={{ color: '#6a6e73' }}
                />
            </TextContent>
    }
];

export const gettingStartedBullets = (setIsModalOpened, setDefaultActiveFilters, setActiveEmptyState, setModalTitle, setModalDescription) => {
    return [
        {
            title: trialsMessages.gettingStartedBulletOneTitle,
            message: <TextContent>
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.discoverSystemsBulletOne),
                        <Button
                            key='rhc-connected-system-link'
                            style={{ padding: '0px' }}
                            variant="link"
                            onClick={() => setSystemTable(
                                setIsModalOpened,
                                setDefaultActiveFilters,
                                setActiveEmptyState,
                                NoConnectedSystemsTable,
                                rhcConnectedFilter,
                                setModalTitle,
                                intl.formatMessage(trialsMessages.systemsConnectedTitle),
                                setModalDescription
                            )}
                        >
                            {intl.formatMessage(trialsMessages.discoverSystemsBulletTwo)}
                        </Button>,
                        <Button
                            key='rhc-eligible-system-link'
                            style={{ padding: '0px' }}
                            variant="link"
                            onClick={() => setSystemTable(
                                setIsModalOpened,
                                setDefaultActiveFilters,
                                setActiveEmptyState,
                                NoEligibleSystemsTable,
                                rhcEligibleFilter,
                                setModalTitle,
                                intl.formatMessage(trialsMessages.systemsEligibleTitle),
                                setModalDescription,
                                systemsEligibleDescription
                            )}
                        >
                            {intl.formatMessage(trialsMessages.discoverSystemsBulletThree)}
                        </Button>,
                        <React.Fragment key="getting-started-discover-systems">
                            {intl.formatMessage(trialsMessages.discoverSystemsBulletFour)}
                            <TrialsBullets
                                isNumbered={false}
                                messages={[
                                    intl.formatMessage(trialsMessages.connectRHCSystemsBulletOne, {
                                        a: (chunks) => <a href={`https://access.redhat.com/articles/rhc-registration`}>{ chunks }</a>
                                    })
                                ]}
                            />
                        </React.Fragment>
                    ]}
                />
            </TextContent>,
            number: 1
        },
        {
            title: trialsMessages.gettingStartedBulletTwoTitle,
            message: <TextContent>
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.updateRHCSettingsBulletOne)
                    ]}
                />
            </TextContent>,
            number: 2
        },
        {
            title: trialsMessages.gettingStartedBulletThreeTitle,
            message: <TextContent>
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.createPlaybookBulletOne),
                        intl.formatMessage(trialsMessages.createPlaybookBulletTwo),
                        intl.formatMessage(trialsMessages.createPlaybookBulletThree)
                    ]}
                />
            </TextContent>,
            number: 3
        }
    ];
};
