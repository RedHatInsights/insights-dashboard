import React from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';

/**
 * Custom policies card with a table
 */
const CustomPoliciesCard = () => {
    return <TemplateCard appName='CustomPolicies'>
        <TemplateCardHead>
            <TemplateCardActions downloadReport="true"/>
            <TemplateCardHeader title='Custom policies'/>
        </TemplateCardHead>
        <TemplateCardBody>
            This is where the table goes.
        </TemplateCardBody>
    </TemplateCard>;
};

export default CustomPoliciesCard;
