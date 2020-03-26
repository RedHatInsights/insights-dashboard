import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryCard = () => {
    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle='System inventory and status'/>
        <TemplateCardBody isFilled={ false }>
            <NumberDescription
                data="100000"
                dataSize="lg"
                percentageData="24% of total systems"
                linkDescription="Systems running insights-client"
            />
        </TemplateCardBody>
        <TemplateCardBody isFilled={ false }>
            <IconInline message="stale systems" state="warning"/>
            <IconInline message="systems to be removed" state="critical"/>
        </TemplateCardBody>
    </TemplateCard>;
};

export default SystemInventoryCard;
