import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { NumberDescription } from '../../../../insights-dashboard/src/PresentationalComponents/NumberDescription/NumberDescription';
import { IconInline } from '../../PresentationalComponents/IconInline/IconInline';
import { injectIntl } from 'react-intl';
import messages from '../../Messages';
import PropTypes from 'prop-types';

/**
 * System inventory card for showing system inventory and status.
 */
const SystemInventoryCard = ({ intl }) => {
    return <TemplateCard appName='SystemInventory'>
        <TemplateCardHeader subtitle='Insights system inventory'/>
        <TemplateCardBody isFilled={ false }>
            <NumberDescription
                data="100000"
                dataSize="lg"
                percentageData={ intl.formatMessage(messages.systemInventoryPercentageData) }
                linkDescription={ intl.formatMessage(messages.systemInventoryDescription) }
            />
            <IconInline
                message={ intl.formatMessage(messages.systemInventoryWarning1) }
                state="warning"
                systemInventory="true"
            />
            <IconInline
                message={ intl.formatMessage(messages.systemInventoryWarning2) }
                state="critical"
                systemInventory="true"
            />
        </TemplateCardBody>
    </TemplateCard>;
};

SystemInventoryCard.propTypes = {
    intl: PropTypes.any
};

export default injectIntl(SystemInventoryCard);
