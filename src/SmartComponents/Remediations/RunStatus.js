import './RunStatus.scss';

import { DateFormat, Skeleton } from '@redhat-cloud-services/frontend-components';
import React, { useEffect, useState } from 'react';

import API from '../../Utilities/Api';
import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import InProgressIcon from '@patternfly/react-icons/dist/esm/icons/in-progress-icon';
import PropTypes from 'prop-types';
import QuestionIcon from './../../Icons/QuestionIcon';
import { REMEDIATIONS_PLAYBOOK_RUNS_FETCH_URL } from '../../AppConstants';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';
import TimesCircleIcon from '@patternfly/react-icons/dist/esm/icons/times-circle-icon';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

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

const RunStatus = ({ id, name, index }) => {
    const [playbookRun, setPlaybookRun] = useState({});
    const [hasData, setHasData] = useState();
    const [loaded, setLoaded] = useState();
    const [isCriticalError, setIsCriticalError] = useState(false);

    const intl = useIntl();

    useEffect(() => {
        const fetchPlaybookRun = async () => {
            try {
                const response = await API.get(`${REMEDIATIONS_PLAYBOOK_RUNS_FETCH_URL}${id}/playbook_runs?limit=1&offset=0&sort=-updated_at`);
                setPlaybookRun(response.data.data);
                setLoaded(true);
                setHasData(response.data.data.length);
            } catch (error) {
                setLoaded(false);
                setHasData(false);
                setIsCriticalError(true);
                // eslint-disable-next-line no-console
                console.error('Error contacting remediations API');
            }
        };

        fetchPlaybookRun();
    }, [id]);

    return <div className="insd-c-remediations-container">
        <div className="insd-c-remediation__status">
            { loaded === undefined && <Skeleton size='md' /> }
            { (loaded && hasData) ?
                <React.Fragment>
                    {renderStatusIcon(normalizeStatus(playbookRun[0].status))}
                    <p className='insd-c-remediation__status-text'>
                        { intl.formatMessage(messages.remediationsPlaybookStatus, { status: normalizeStatus(playbookRun[0].status) }) }
                    </p>
                </React.Fragment>
                : null
            }
            { loaded && !hasData &&
                <React.Fragment>
                    <QuestionIcon />
                    <p>{intl.formatMessage(messages.remediationsPlaybookNoActivity)}</p>
                </React.Fragment>
            }
            { isCriticalError &&
                <React.Fragment>
                    <span>{intl.formatMessage(messages.remediationsPlaybookFailure)}</span> {/* TODO Later for absolute failure */}
                </React.Fragment>
            }
        </div>
        <div className="insd-c-remediation__timestamp">
            {name.length > 65 ? <Tooltip content={ name }>
                <Button
                    id={ `remediation-link-${index}` }
                    component="a"
                    variant="link"
                    isInline
                    href={ `./insights/remediations/${id}` }
                >
                    {name}
                </Button>
            </Tooltip> :
                <Button
                    id={ `remediation-link-${index}` }
                    component="a"
                    variant="link"
                    isInline
                    href={ `./insights/remediations/${id}` }
                >
                    {name}
                </Button>}
            { loaded === undefined && <Skeleton size='md' /> }
            { loaded && hasData
                ? <TimeStamp timestamp={ <DateFormat type='exact' date={ playbookRun[0].created_at } /> } />
                : null
            }
        </div>
    </div>;
};

RunStatus.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    intl: PropTypes.any,
    index: PropTypes.any
};

export default RunStatus;
