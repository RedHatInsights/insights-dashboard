import './RemediationsCard.scss';

import * as AppActions from '../../AppActions';

import React, { useEffect } from 'react';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHead,
    TemplateCardHeader
} from '../../PresentationalComponents/Template/TemplateCard';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import FailState from '../../PresentationalComponents/FailState/FailState';
import PropTypes from 'prop-types';
import { RemediationsEmptyState } from './RemediationsEmptyState';
import RunStatus from './RunStatus';
import { connect } from 'react-redux';
import messages from '../../Messages';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import { useIntl } from 'react-intl';

/**
 * Remediations card.
 */
const RemediationsCard = ({
    fetchRemediations, remediationsFetchStatus, remediations
}) => {

    const intl = useIntl();

    useEffect(() => {
        fetchRemediations();
    }, [fetchRemediations]);

    return (
        <TemplateCard appName='Remediations'>
            <TemplateCardHead>
                <TemplateCardHeader title='Remediations' />
            </TemplateCardHead>
            <TemplateCardBody>
                {remediationsFetchStatus === 'fulfilled' &&
                    (Array.isArray(remediations.data) &&
                        (remediations.data.length > 0 ?
                            <React.Fragment>
                                {remediations.data.map((element, index) =>
                                    <RunStatus id={ element.id } name={ element.name } key={ element.id } index={ index + 1 } />
                                )}
                                {remediations.meta.total > remediations.meta.count &&
                                    <div className='ins-c-remediations-container'>
                                        <div className='ins-c-remediation__status'>
                                        </div>
                                        <div className='ins-c-remediation__timestamp'>
                                            <Button
                                                id='remediations-link-more'
                                                component='a'
                                                href='./insights/remediations'
                                                variant='link'
                                                isInline
                                            >
                                                {intl.formatMessage(messages.remediationsTotal,
                                                    { total: remediations.meta.total - remediations.meta.count }
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                            : <RemediationsEmptyState />)
                    )
                }
                {remediationsFetchStatus === 'rejected' &&
                    <FailState appName='Remediations' />
                }
            </TemplateCardBody>
        </TemplateCard>
    );
};

RemediationsCard.propTypes = {
    fetchRemediations: PropTypes.func,
    remediations: PropTypes.object,
    remediationsFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
    remediations: state.DashboardStore.remediations,
    remediationsFetchStatus: state.DashboardStore.remediationsFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchRemediations: () => dispatch(AppActions.fetchRemediations())
});

export default routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(RemediationsCard));
