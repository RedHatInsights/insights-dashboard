import './ResourceOptimizationCard.scss';

import React, { useEffect } from 'react';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';


const ResourceOptimizationCard = () =>{
    const intl = useIntl();

    return(
        <ExpandableCardTemplate
            appName="ResourceOptimization"
            className='insd-m-toggle-right-on-md'
            title={intl.formatMessage(messages.resourceOptimizationCardHeader)}
            isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_ros') || 'true')}
            isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_ros', isExpanded)}
            body={
                <TemplateCardBody>

                    <div>No systems configured yet? Get started with resource optimization.</div>
                </TemplateCardBody>
            }        
        />

    );
}

export default ResourceOptimizationCard;