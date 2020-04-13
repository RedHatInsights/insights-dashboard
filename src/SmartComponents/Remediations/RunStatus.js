import React, { useEffect, useState } from 'react';

import API from '../../Utilities/Api';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { DateFormat } from '@redhat-cloud-services/frontend-components';
import FinishedIcon from './../../Icons/FinishedIcon';
import PropTypes from 'prop-types';
import QuestionIcon from './../../Icons/QuestionIcon';
import { REMEDIATIONS_PLAYBOOK_RUNS_FETCH_URL } from '../../AppConstants';
import RunningIcon from './../../Icons/RunningIcon';
import { Skeleton } from '@red-hat-insights/insights-frontend-components';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';

const RunStatus = ({ id, name }) => {
    const [playbookRun, setPlaybookRun] = useState({});
    const [loaded, setLoaded] = useState();

    useEffect(() => {
        const fetchPlaybookRun = async () => {
            try {
                const response = await API.get(`${REMEDIATIONS_PLAYBOOK_RUNS_FETCH_URL}${id}/playbook_runs?limit=1&offset=0&sort=-updated_at`);
                setPlaybookRun(response.data.data);
                setLoaded(true);
                console.error(response.data);
            } catch (error) {
                setLoaded(false);
                console.error('oopsie');
            }
        };

        fetchPlaybookRun();
    }, [id]);

    return <div className="ins-c-remediations-container">
        <div className="ins-c-remediation__status">
            {loaded === undefined && <Skeleton size='md' />}
            {loaded ? <React.Fragment>
                {playbookRun[0].status === 'Running' ? <RunningIcon /> : <FinishedIcon />}
                <p>{playbookRun[0].status}</p>
            </React.Fragment>
                : <React.Fragment>
                    <QuestionIcon />
                    <p>No run data</p>
                </React.Fragment>
            }
        </div>
        <div className="ins-c-remediation__timestamp">
            <Button component="a" variant="link" isInline href={ `./insights/remediations/${id}` }>
                {name}
            </Button>
            {loaded === undefined ? <Skeleton size='md' /> :
                loaded && <TimeStamp timestamp={ <DateFormat type='exact' date={ playbookRun[0].created_at } /> } />
            }
        </div>
    </div>;
};

RunStatus.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    intl: PropTypes.any
};

export default RunStatus;
