import './trialsPage.scss';

import { TextContent, Title } from '@patternfly/react-core/dist/esm/components';
import React from 'react';
import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';
import TrialsBullets from './TrialsBullets';

const TermsAndConditions = () => {
    const intl = useIntl();

    return (
        <div>
            <Title headingLevel="h2" id="trial-terms">
                {intl.formatMessage(trialsMessages.termsAndConditionsTitle)}
            </Title>
            <div style={{ fontSize: '12px' }}>
                {intl.formatMessage(trialsMessages.termsAndConditionsParagraphOne)}
            </div>
            <br />
            <div style={{ fontSize: '12px' }}>
                {intl.formatMessage(trialsMessages.termsAndConditionsParagraphTwo)}
            </div>
            <TextContent>
                <TrialsBullets
                    isNumbered={false}
                    messages={[
                        intl.formatMessage(trialsMessages.termsAndConditionsBulletOne),
                        intl.formatMessage(trialsMessages.termsAndConditionsBulletTwo),
                        intl.formatMessage(trialsMessages.termsAndConditionsBulletThree)
                    ]}
                    style={{ fontSize: '12px' }}
                />
            </TextContent>
            <br />
            <div style={{ fontSize: '12px' }}>
                {intl.formatMessage(trialsMessages.termsAndConditionsParagraphThree)}
            </div>
        </div>
    );
};

export default TermsAndConditions;
