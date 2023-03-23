import './trialsPage.scss';

import { PageSection, PageSectionVariants, Popover, TextContent, Title } from '@patternfly/react-core/dist/esm/components';
import { Split, SplitItem } from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';
import React/*, { useEffect }*/ from 'react';
import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';
import WhatYouGet from './WhatYouGet';
import Requirements from './Requirements';
import FrequentlyAskedQuestions from './FrequentlyAskedQuestions';
import TermsAndConditions from './TermsAndConditions';
import TrialsText from './TrialsText';
import TrialsBullets from './TrialsBullets';
import StartYourTrialButton from './StartYourTrialButton';
//import API from '../../Utilities/Api';

const TrialsPage = () => {
    const intl = useIntl();

    /*useEffect(() => {
        const getTrialStatus = async () => {
            let response = await API.post(`https://product-trials.api.redhat.com/v1/trial/637b99fc62e92ea6f50ede02/status`);
            console.log(response, 'response');
        };

        getTrialStatus();
    }, []);*/

    return (
        <React.Fragment>
            <PageSection isWidthLimited variant={ PageSectionVariants.light }>
                <Title headingLevel="h1">
                    {intl.formatMessage(trialsMessages.trialsTryTitle)}
                </Title>
            </PageSection>
            <PageSection>
                <Split style={{ marginBottom: '24px' }} hasGutter>
                    <SplitItem isFilled>
                        <Title headingLevel="h2">
                            <div>
                                {intl.formatMessage(trialsMessages.startTrialTitle)}
                                <Popover
                                    headerContent={<div>{intl.formatMessage(trialsMessages.trialEligibilityPopoverTitle)}</div>}
                                    bodyContent={
                                        <TextContent>
                                            <TrialsText messages={[trialsMessages.trialEligibilityPopoverBodyParagraph]} />
                                            <TrialsBullets
                                                messages={[
                                                    intl.formatMessage(trialsMessages.trialEligibilityPopoverBodyBulletOne),
                                                    intl.formatMessage(trialsMessages.trialEligibilityPopoverBodyBulletTwo)
                                                ]}
                                            />
                                        </TextContent>
                                    }
                                >
                                    <Icon size='md' className='eight-pixel-left-margin'>
                                        <OutlinedQuestionCircleIcon />
                                    </Icon>
                                </Popover>
                            </div>
                        </Title>
                        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
                            {intl.formatMessage(trialsMessages.startTrialDescription)}
                        </div>
                        <StartYourTrialButton />
                    </SplitItem>
                    <SplitItem>
                        <div className='lg-c-trial__hero' />
                    </SplitItem>
                </Split>
                <WhatYouGet />
                <Requirements />
                <FrequentlyAskedQuestions />
                <TermsAndConditions />
            </PageSection>
        </React.Fragment>
    );
};

export default TrialsPage;
