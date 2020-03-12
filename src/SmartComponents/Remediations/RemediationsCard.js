import React from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import FinishedIcon from './../../Icons/FinishedIcon';
import RunningIcon from './../../Icons/RunningIcon';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';

const mockData = [
    {
        status: 'Running',
        name: 'Name',
        timestamp: 'Timestamp'
    },
    {
        status: 'Running',
        name: 'Name',
        timestamp: 'Timestamp'
    },
    {
        status: 'Running',
        name: 'Name',
        timestamp: 'Timestamp'
    },
    {
        status: 'Finished',
        name: 'Name',
        timestamp: 'Timestamp'
    }
];

/**
 * Remediations card.
 */
const RemediationsCard = () => {
    const remediationsList = mockData.map((remediation, index) =>
        <React.Fragment key={ index }>
            <div className="ins-c-remediations-container">
                <div className="ins-c-remediation__status" span={ 4 }>
                    <React.Fragment>
                        { remediation.status === 'Running' ? (
                            <RunningIcon/>
                        ) : (
                            <FinishedIcon/>
                        )}
                        <p>{remediation.status}</p>
                    </React.Fragment>
                </div>
                <div className="ins-c-remediation__timestamp">
                    <Button component="a" variant="link" isInline>
                        {remediation.name}
                    </Button>
                    <TimeStamp timestamp={ remediation.timestamp }/>
                </div>
            </div>
        </React.Fragment>
    );

    return <TemplateCard appName='Remediations'>
        <TemplateCardHead>
            <TemplateCardActions downloadReport="true"/>
            <TemplateCardHeader title='Remediations'/>
        </TemplateCardHead>
        <TemplateCardBody>
            {remediationsList}
            <div className="ins-c-remediation__status">
            </div>
            <div className="ins-c-remediation__timestamp">
                <Button
                    component="a"
                    href=""
                    variant="link"
                    isInline
                >
                    more remediations
                </Button>
            </div>
        </TemplateCardBody>
    </TemplateCard>;
};

export default RemediationsCard;
