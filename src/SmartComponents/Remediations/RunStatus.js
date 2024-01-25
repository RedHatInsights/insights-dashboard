import './RunStatus.scss';

import { DateFormat } from '@redhat-cloud-services/frontend-components';
import React from 'react';

import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import InProgressIcon from '@patternfly/react-icons/dist/esm/icons/in-progress-icon';
import PropTypes from 'prop-types';
import QuestionIcon from './../../Icons/QuestionIcon';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';
import TimesCircleIcon from '@patternfly/react-icons/dist/esm/icons/times-circle-icon';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

// Normalize the status so we don't show all API statuses
const normalizeStatus = (status) => ({
    running: 'running',
    pending: 'running',
    acked: 'running',
    failure: 'failure',
    canceled: 'failure',
    success: 'success'
})[status];

// Render the correct icon based on normalized status
const statusIconClass = 'insd-c-remediation__status-icon';
const renderStatusIcon = (status) => ({
    running: <InProgressIcon
        className={ `${statusIconClass} ${statusIconClass}--running` }
        aria-label="Remediation in progress" />,
    success: <CheckCircleIcon
        className={ `${statusIconClass} ${statusIconClass}--passed` }
        aria-label="Remediation passed" />,
    failure: <TimesCircleIcon
        className={ `${statusIconClass} ${statusIconClass}--failed` }
        aria-label="Remediation failed" />
})[status];

const RunStatus = ({ id, name, index, playbook_runs: playbookRuns }) => {
    const hasData = playbookRuns ? playbookRuns.data?.length > 0 : false;
    const intl = useIntl();

    return <div className="insd-c-remediations-container">
        <div className="insd-c-remediation__status">
            { hasData ?
                <React.Fragment>
                    {renderStatusIcon(normalizeStatus(playbookRuns.data[0].status))}
                    <p className='insd-c-remediation__status-text'>
                        { intl.formatMessage(messages.remediationsPlaybookStatus, { status: normalizeStatus(playbookRuns.data[0].status) }) }
                    </p>
                </React.Fragment>
                :
                <React.Fragment>
                    <QuestionIcon />
                    <p>{intl.formatMessage(messages.remediationsPlaybookNoActivity)}</p>
                </React.Fragment>
            }
        </div>
        <div className="insd-c-remediation__timestamp">
            {name.length > 65 ? <Tooltip content={ name }>
                <InsightsLink app='remediations' to={ `/${id}` } className="pf-c-button pf-m-inline pf-m-link" id={ `remediation-link-${index}` }>
                    {name}
                </InsightsLink>
            </Tooltip> :
                <InsightsLink app='remediations' to={ `/${id}` } className="pf-c-button pf-m-inline pf-m-link" id={ `remediation-link-${index}` }>
                    {name}
                </InsightsLink>
            }
            { hasData
                ? <TimeStamp timestamp={ <DateFormat type='exact' date={ playbookRuns.data[0].created_at } /> } />
                : null
            }
        </div>
    </div>;
};

RunStatus.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    intl: PropTypes.any,
    index: PropTypes.any,
    playbook_runs: PropTypes.any
};

export default RunStatus;
