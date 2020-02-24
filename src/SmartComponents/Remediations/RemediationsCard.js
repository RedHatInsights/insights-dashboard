import React from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';

/**
 * Remediations card.
 */
const RemediationsCard = () => {
    return <TemplateCard appName='Remediations'>
        <TemplateCardHead>
            <TemplateCardActions downloadReport="true"></TemplateCardActions>
            <TemplateCardHeader title='Remediations'></TemplateCardHeader>
        </TemplateCardHead>
        <TemplateCardBody>
            Charts go here
        </TemplateCardBody>
    </TemplateCard>;
};

export default RemediationsCard;
