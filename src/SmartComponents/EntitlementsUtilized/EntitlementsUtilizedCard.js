import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { ProgressTemplate } from '../../../../insights-dashboard/src/ChartTemplates/Progress/ProgressTemplate';

/**
 * Entitlements utilized card for showing the portion of entitlements used.
 */
const EntitlementsUtilizedCard = () => {
    return <TemplateCard appName='EntitlementsUtilized'>
        <TemplateCardHeader subtitle='Entitlements utilized'>
        </TemplateCardHeader>
        <TemplateCardBody>
            <ProgressTemplate
                title="Red Hat JBoss"
                value="72"
            />
            <ProgressTemplate
                title="Red Hat Openshift"
                value="212"
                variant="danger"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default EntitlementsUtilizedCard;
