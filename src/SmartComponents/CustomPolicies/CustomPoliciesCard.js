import './CustomPoliciesCard.scss';

import { Table, TableBody, TableHeader, TableVariant } from '@patternfly/react-table';
import {
    TemplateCard,
    TemplateCardActions,
    TemplateCardBody,
    TemplateCardHead,
    TemplateCardHeader
} from '../../PresentationalComponents/Template/TemplateCard';

import BellIcon from '@patternfly/react-icons/dist/esm/icons/bell-icon';
import CogsIcon from '@patternfly/react-icons/dist/esm/icons/cogs-icon';
import EnvelopeIcon from '@patternfly/react-icons/dist/esm/icons/envelope-icon';
import FinishedIcon from './../../Icons/FinishedIcon';
import React from 'react';
import SlackHashIcon from '@patternfly/react-icons/dist/esm/icons/slack-hash-icon';

/**
 * Custom policies card with a table
 */
class CustomPoliciesCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: ['Policy name', 'Trigger status', 'Running', 'Timestamp', 'Actions', 'Status'],
            rows: [
                {
                    cells: [
                        { title: <a href="#">custom_policy_A1</a>, props: { component: 'th' } },
                        'Last triggered',
                        {
                            title: (
                                <React.Fragment>
                                    <FinishedIcon/>
                                </React.Fragment>
                            )
                        },
                        'Timestamp',
                        'Actions',
                        {
                            title: (
                                <React.Fragment>
                                    <div className="insd-c-custom-policies__icon-group">
                                        <SlackHashIcon/>
                                        <EnvelopeIcon/>
                                        <BellIcon/>
                                        <CogsIcon/>
                                        <CogsIcon/>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    ]
                },
                {
                    cells: [
                        { title: <a href="#">custom_policy_B2</a>, props: { component: 'th' } },
                        'Last triggered',
                        {
                            title: (
                                <React.Fragment>
                                    <FinishedIcon/>
                                </React.Fragment>
                            )
                        },
                        'Timestamp',
                        'Actions',
                        {
                            title: (
                                <React.Fragment>
                                    <div className="insd-c-custom-policies__icon-group">
                                        <SlackHashIcon/>
                                        <EnvelopeIcon/>
                                    </div>
                                </React.Fragment>
                            )
                        }
                    ]
                }
            ]
        };
    }

    render() {
        const { columns, rows } = this.state;

        return (
            <TemplateCard appName='CustomPolicies'>
                <TemplateCardHead>
                    <TemplateCardActions downloadReport="true"/>
                    <TemplateCardHeader title='Custom policies'/>
                </TemplateCardHead>
                <TemplateCardBody className="insd-c-custom-policies__card-body">
                    <Table
                        aria-label="custom-policies-table"
                        className="insd-c-table-custom-policies"
                        variant={ TableVariant.compact }
                        cells={ columns }
                        rows={ rows }
                    >
                        <TableHeader />
                        <TableBody />
                    </Table>
                </TemplateCardBody>
            </TemplateCard>
        );
    }
}

export default CustomPoliciesCard;
