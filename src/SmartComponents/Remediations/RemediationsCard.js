import React from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';
import { TemplateGrid, TemplateGridItem } from './../../PresentationalComponents/TemplateGrid/TemplateGrid';
import { Button } from '@patternfly/react-core';
import FinishedIcon from './../../Icons/FinishedIcon';
import RunningIcon from './../../Icons/RunningIcon';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';

const mockData = [
    {
        status: 'Running',
        name: 'custom_playbook A',
        timestamp: 'Started, Jan 20 2020 08:44:42'
    },
    {
        status: 'Running',
        name: 'custom_playbook B',
        timestamp: 'Started, Jan 20 2020 08:44:42'
    },
    {
        status: 'Running',
        name: 'custom_playbook C',
        timestamp: 'Started, Jan 20 2020 08:44:42'
    },
    {
        status: 'Finished',
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
            <TemplateGridItem isRemediationStatus="true" span={ 4 }>
                <React.Fragment>
                    { remediation.status === 'Running' ? (
                        <RunningIcon/>
                    ) : (
                        <FinishedIcon/>
                    )}
                    <p>{remediation.status}</p>
                </React.Fragment>
            </TemplateGridItem>
            <TemplateGridItem span={ 8 }>
                <Button component="a" variant="link" isInline>
                    {remediation.name}
                </Button>
                <TimeStamp timestamp={ remediation.timestamp }/>
            </TemplateGridItem>
        </React.Fragment>
    );

    return <TemplateCard appName='Remediations'>
        <TemplateCardHead>
            <TemplateCardActions downloadReport="true"></TemplateCardActions>
            <TemplateCardHeader title='Remediations'></TemplateCardHeader>
        </TemplateCardHead>
        <TemplateCardBody>
            <TemplateGrid gutter="sm">
                {remediationsList}
            </TemplateGrid>
        </TemplateCardBody>
    </TemplateCard>;
};

export default RemediationsCard;
