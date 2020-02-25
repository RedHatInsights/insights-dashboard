import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryCard = () => {
    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle='System inventory and status'>
        </TemplateCardHeader>
        <TemplateCardBody isHorizontalLayout="true">
            <NumberDescription
                data="NA"
                dataSize="xl"
                linkDescription="Connected systems"
            />
            <NumberDescription
                data="NA"
                dataSize="lg"
                linkDescription="Not checked-in last 7 days"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default SystemInventoryCard;
