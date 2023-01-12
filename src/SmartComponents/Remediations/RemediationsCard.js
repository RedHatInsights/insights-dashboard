import './RemediationsCard.scss';

import * as AppActions from '../../AppActions';

import React, { useEffect } from 'react';
import {
    TemplateCardActions,
    TemplateCardBody
} from '../../PresentationalComponents/Template/TemplateCard';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import FailState from '../../PresentationalComponents/FailState/FailState';
import PropTypes from 'prop-types';
import { RemediationsEmptyState } from './RemediationsEmptyState';
import RunStatus from './RunStatus';
import { connect } from 'react-redux';
import messages from '../../Messages';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/RouterParams';
import { useIntl } from 'react-intl';

const RemediationsCard = ({
    fetchRemediations, remediationsFetchStatus, remediations
}) => {

    const intl = useIntl();

    useEffect(() => {
        fetchRemediations();
    }, [fetchRemediations]);

    return (
        <ExpandableCardTemplate
            appName='remediations'
            className='ins-c-card__remediations insd-m-toggle-right-on-md'
            title={ intl.formatMessage(messages.remediationsCardHeader) }
            isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_remediations') || 'true')}
            isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_remediations', isExpanded)}
            header={
                <TemplateCardActions />
            }
            body={
                <TemplateCardBody>
                    {remediationsFetchStatus === 'fulfilled' &&
                        (Array.isArray(remediations.data) &&
                            (remediations.data.length > 0 ?
                                <React.Fragment>
                                    {remediations.data.map((element, index) =>
                                        <RunStatus id={ element.id } name={ element.name } key={ element.id } index={ index + 1 } />
                                    )}
                                    {remediations.meta.total > remediations.meta.count &&
                                        <div className='insd-c-remediations-container'>
                                            <div className='insd-c-remediation__status'>
                                            </div>
                                            <div className='insd-c-remediation__timestamp'>
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
            }
        />
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
