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
            <TemplateCardActions downloadReport="true">
            </TemplateCardActions>
            <TemplateCardHeader title='Custom policies'>
            </TemplateCardHeader>
        </TemplateCardHead>
        <TemplateCardBody>
            Table goes here
        </TemplateCardBody>
    </TemplateCard>;
};

export default CustomPoliciesCard;
