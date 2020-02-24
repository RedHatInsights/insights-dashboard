import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const OperatingSystemsCard = () => {
    return <TemplateCard appName='OperatingSystems'>
        <TemplateCardHeader subtitle='Operating systems'>
        </TemplateCardHeader>
        <TemplateCardBody>
            Pie chart goes here.
        </TemplateCardBody>
    </TemplateCard>;
};

export default OperatingSystemsCard;
