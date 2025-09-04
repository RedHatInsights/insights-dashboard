import * as AppActions from '../../AppActions';

import React, { useEffect } from 'react';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FailState from '../../PresentationalComponents/FailState/FailState';
import { Button, Flex, FlexItem, Spinner } from '@patternfly/react-core';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';
import StatsLink from './StatsLink';

const ResourceOptimizationCard = ({
    fetchRosIsConfigured, rosIsConfiguredFetchStatus, rosIsConfigured
}) =>{
    const intl = useIntl();

    useEffect(() => {
        fetchRosIsConfigured();
    }, [fetchRosIsConfigured]);

    const waitingForDataUrl = `/?with_waiting_for_data=true`;
    const suggestionsUrl = `/?with_suggestions=true`;
    const allSystemsUrl = `/`;

    return (
        <ExpandableCardTemplate
            appName="ResourceOptimization"
            className='insd-m-toggle-right-on-md'
            title={intl.formatMessage(messages.resourceOptimizationCardHeader)}
            isExpanded={JSON.parse(localStorage.getItem('dashboard_expanded_ros') || 'true')}
            isExpandedCallback={isExpanded => localStorage.setItem('dashboard_expanded_ros', isExpanded)}
            body={
                <TemplateCardBody>
                    {
                        rosIsConfiguredFetchStatus === 'fulfilled' &&
                        (
                            rosIsConfigured.success ?
                                <React.Fragment>
                                    <div>{ intl.formatMessage(messages.rosSystemsGenericMessage)}</div>
                                    <Flex
                                        direction={{ default: 'column' }}
                                        alignItems={{ default: 'alignItemsCenter' }}
                                    >
                                        <Flex
                                            justifyContent={{ default: 'justifyContentCenter' }}
                                            spaceItems={{ default: 'spaceItemsLg', sm: 'spaceItems2xl' }}>
                                            {rosIsConfigured.systems_stats.waiting_for_data > 0 && (
                                                <StatsLink
                                                    to={waitingForDataUrl}
                                                    value={rosIsConfigured.systems_stats.waiting_for_data}
                                                    label={intl.formatMessage(messages.waitingForData)}
                                                    fontWeight='bold'
                                                />
                                            )}
                                            <StatsLink
                                                to={suggestionsUrl}
                                                value={rosIsConfigured.systems_stats.with_suggestions}
                                                label={intl.formatMessage(messages.systemsWithSuggestions)}
                                            />
                                            <StatsLink
                                                to={allSystemsUrl}
                                                value={rosIsConfigured.count}
                                                label={intl.formatMessage(messages.totalSystems)}
                                            />
                                        </Flex>
                                    </Flex>
                                </React.Fragment>
                                : <Flex
                                    direction={{ default: 'column' }}
                                    alignItems={{ default: 'alignItemsCenter' }}
                                >
                                    <FlexItem>{ intl.formatMessage(messages.rosSystemsNotConfiguredMessage)}</FlexItem>
                                    <InsightsLink app='ros' to='/'>
                                        <Button
                                            variant='secondary'
                                            size='sm'>
                                            {intl.formatMessage(messages.rosCardConfigureSystemsCTA)}
                                        </Button>
                                    </InsightsLink>
                                </Flex>
                        )

                    }
                    {rosIsConfiguredFetchStatus === 'pending' && <Spinner />}
                    {rosIsConfiguredFetchStatus === 'rejected' && <FailState appName='Resource optimization' />}
                </TemplateCardBody>
            }
        />

    );
};

ResourceOptimizationCard.propTypes = {
    fetchRosIsConfigured: PropTypes.func,
    rosIsConfigured: PropTypes.object,
    rosIsConfiguredFetchStatus: PropTypes.string
};

const mapStateToProps = ({ DashboardStore }) => ({
    rosIsConfigured: DashboardStore.rosIsConfigured,
    rosIsConfiguredFetchStatus: DashboardStore.rosIsConfiguredFetchStatus
});

const mapDispatchToProps = dispatch => ({
    fetchRosIsConfigured: () => dispatch(AppActions.fetchRosIsConfigured())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResourceOptimizationCard);
