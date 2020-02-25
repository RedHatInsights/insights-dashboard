import React from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';
import { Grid, GridItem } from '@patternfly/react-core';
import { Button } from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';

const mockData = [
    {
        status: 'Running',
        name: 'custom_playbook A',
        timestamp: 'Started, Jan 20 2020 08:44:42'
    },
    {
        status: 'Running',
        name: 'custom_playbook A',
        timestamp: 'Started, Jan 20 2020 08:44:42'
    }
];

/**
 * Remediations card.
 */
const RemediationsCard = () => {
    const remediationsList = mockData.map((remediation, index) =>
        <React.Fragment key={ index }>
            <GridItem span={ 4 }>
                <div className="ins-c-dashboard__card-body-remediations-grid-status">
                    <CheckCircleIcon/>
                    {remediation.status}
                </div>
            </GridItem>
            <GridItem span={ 8 }>
                <Button component="a" variant="link" isInline>
                    {remediation.name}
                </Button>
                <div>
                    {remediation.timestamp}
                </div>
            </GridItem>
        </React.Fragment>
    );

    return <TemplateCard appName='Remediations'>
        <TemplateCardHead>
            <TemplateCardActions downloadReport="true"></TemplateCardActions>
            <TemplateCardHeader title='Remediations'></TemplateCardHeader>
        </TemplateCardHead>
        <TemplateCardBody>
            <Grid gutter="sm">
                {remediationsList}
            </Grid>
        </TemplateCardBody>
    </TemplateCard>;
};

export default RemediationsCard;
