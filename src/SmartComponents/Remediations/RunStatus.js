import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as AppActions from '../../AppActions';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import FinishedIcon from './../../Icons/FinishedIcon';
import RunningIcon from './../../Icons/RunningIcon';
import QuestionIcon from './../../Icons/QuestionIcon';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';
import { DateFormat } from '@redhat-cloud-services/frontend-components';
import { Skeleton } from '@red-hat-insights/insights-frontend-components';

const RunStatus = ({
    id,
    name,
    fetchRemediationsPlaybookRuns,
    // remediationsPlaybookRunsFetchStatus,
    remediationsPlaybookRuns
}) => {

    useEffect(() => {
        fetchRemediationsPlaybookRuns(id);
    }, [fetchRemediationsPlaybookRuns]);

    console.log(remediationsPlaybookRuns.data);

    if (remediationsPlaybookRuns.data) {
        return (
            remediationsPlaybookRuns.data && remediationsPlaybookRuns.data.length ?
                <div className="ins-c-remediations-container">
                    <div className="ins-c-remediation__status">
                        <React.Fragment>
                            { remediationsPlaybookRuns.data[0].status === 'Running' ? (
                                <RunningIcon/>
                            ) : (
                                <FinishedIcon/>
                            )}
                            <p>{remediationsPlaybookRuns.data[0].status}</p>
                        </React.Fragment>
                    </div>
                    <div className="ins-c-remediation__timestamp">
                        <Button component="a" variant="link" isInline href={ `./insights/remediations/${id}` }>
                            { name }
                        </Button>
                        <TimeStamp timestamp={ <DateFormat type='exact' date={ remediationsPlaybookRuns.data[0].created_at }/> }/>
                    </div>
                </div>
                : <div className="ins-c-remediations-container">
                    <div className="ins-c-remediation__status">
                        <React.Fragment>
                            <QuestionIcon/>
                            <p>No run data</p>
                        </React.Fragment>
                    </div>
                    <div className="ins-c-remediation__timestamp">
                        <Button component="a" variant="link" isInline href={ `./insights/remediations/${id}` }>
                            { name }
                        </Button>
                        <TimeStamp timestamp='none'/>
                    </div>
                </div>
        );
    } else {
        return <Skeleton size='md'/>;
    }
};

RunStatus.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    fetchRemediationsPlaybookRuns: PropTypes.func,
    remediationsPlaybookRuns: PropTypes.object,
    remediationsPlaybookRunsFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
    remediationsPlaybookRuns: state.DashboardStore.remediationsPlaybookRuns,
    remediationsPlaybookRunsFetchStatus: state.DashboardStore.remediationsPlaybookRunsFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchRemediationsPlaybookRuns: (id) => dispatch(AppActions.fetchRemediationsPlaybookRuns(id))
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(RunStatus));
