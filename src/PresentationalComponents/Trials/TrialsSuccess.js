import './trialsPage.scss';

import { PageSection, PageSectionVariants, TextVariants, Title } from '@patternfly/react-core/dist/esm/components';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { Icon } from '@patternfly/react-core';
import React, { useEffect } from 'react';
import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';
import TrialsText from './TrialsText';
import Requirements from './Requirements';
import GettingStarted from './GettingStarted';
import HelpfulResources from './HelpfulResources';
import TermsAndConditions from './TermsAndConditions';
import { dispatchNotification } from '../../Utilities/Dispatcher';

const TrialsSuccess = () => {
    useEffect(() => {
        dispatchNotification({
            variant: 'success',
            title: 'Your 60-day trial of Red Hat Satellite is active',
            description: 'You are now able to use all of the features of Red Hat Satellite.',
            dismissable: true,
            autoDismiss: true
        });
    }, []);

    const intl = useIntl();
    const productTrialTerms = {
        message: trialsMessages.trialSuccessTrialTerms,
        value: {
            a: (chunks) => <a href={ `${window.location.origin}${window.location.pathname}#trial-terms` }>{ chunks }</a>
        }
    };

    return (
        <React.Fragment>
            <PageSection isWidthLimited variant={ PageSectionVariants.light }>
                <Title headingLevel="h1">
                    <Icon isInline status='success' className="success-icon-margin">
                        <CheckCircleIcon />
                    </Icon>
                    {intl.formatMessage(trialsMessages.trialSuccessTitle)}
                </Title>
                <TrialsText messages={[trialsMessages.trialSuccessDaysLeft]} style={{ marginTop: '16px', marginBottom: '16px' }}/>
                <TrialsText messages={[productTrialTerms]} component={TextVariants.small} style={{ color: '#6a6e73' }} />
            </PageSection>
            <PageSection>
                <Requirements isSuccessPage={true} />
                <GettingStarted />
                <HelpfulResources />
                <TermsAndConditions />
            </PageSection>
        </React.Fragment>
    );
};

export default TrialsSuccess;
