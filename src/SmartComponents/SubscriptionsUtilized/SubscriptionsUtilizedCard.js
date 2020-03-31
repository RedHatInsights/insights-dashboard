import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { ProgressTemplate } from '../../../../insights-dashboard/src/ChartTemplates/Progress/ProgressTemplate';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

/**
 * Subscriptions utilized card for showing the portion of Subscriptions used.
 */
const SubscriptionsUtilizedCard = () => {

    const intl = useIntl();

    return <TemplateCard appName='SubscriptionsUtilized'>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.subscriptionsUtilized) }/>
        <TemplateCardBody>
            <ProgressTemplate
                title="Red Hat JBoss"
                value="0"
            />
            <ProgressTemplate
                title="Red Hat Openshift"
                value="0"
                variant="danger"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default SubscriptionsUtilizedCard;
