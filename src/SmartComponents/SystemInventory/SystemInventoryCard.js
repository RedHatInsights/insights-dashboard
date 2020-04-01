import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';
import { useIntl } from 'react-intl';
import messages from '../../Messages';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryCard = () => {

    const intl = useIntl();

    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle={ intl.formatMessage(messages.systemInventoryTitle) }/>
        <TemplateCardBody isFilled={ false }>
            <NumberDescription
                data="100000"
                dataSize="lg"
                percentageData={ intl.formatMessage(messages.systemInventoryPercentageData) }
                linkDescription={ intl.formatMessage(messages.systemInventoryDescription) }
            />
            <IconInline
                message={ intl.formatMessage(messages.systemInventoryWarning) }
                state="warning"
                systemInventory="true"
            />
            <IconInline
                message={ intl.formatMessage(messages.systemInventoryDanger) }
                state="critical"
                systemInventory="true"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default SystemInventoryCard;
