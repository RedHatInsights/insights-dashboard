import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { ProgressTemplate } from '../../../../insights-dashboard/src/ChartTemplates/Progress/ProgressTemplate';

/**
 * Entitlements utilized card for showing the portion of entitlements used.
 */
const EntitlementsUtilizedCard = () => {
    return <TemplateCard appName='EntitlementsUtilized'>
        <TemplateCardHeader subtitle='Subscriptions utilized'/>
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

export default EntitlementsUtilizedCard;
