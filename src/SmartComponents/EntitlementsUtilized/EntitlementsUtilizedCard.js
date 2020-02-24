import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';

/**
 * Entitlements utilized card for showing the portion of entitlements used.
 */
const EntitlementsUtilizedCard = () => {
    return <TemplateCard appName='EntitlementsUtilized'>
        <TemplateCardHeader subtitle='Entitlements utilized'>
        </TemplateCardHeader>
        <TemplateCardBody>
            Progress bars go here.
        </TemplateCardBody>
    </TemplateCard>;
};

export default EntitlementsUtilizedCard;
