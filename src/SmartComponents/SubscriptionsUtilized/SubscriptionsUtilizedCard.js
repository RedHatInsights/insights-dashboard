import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { ProgressTemplate } from '../../../../insights-dashboard/src/ChartTemplates/Progress/ProgressTemplate';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import PropTypes from 'prop-types';

/**
 * Subscriptions utilized card for showing the portion of Subscriptions used.
 */
const SubscriptionsUtilizedCard = ({ intl }) => {
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

SubscriptionsUtilizedCard.propTypes = {
    intl: PropTypes.any
};

export default injectIntl(SubscriptionsUtilizedCard);
