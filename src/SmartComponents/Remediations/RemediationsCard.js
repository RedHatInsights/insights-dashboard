import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as AppActions from '../../AppActions';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead
} from '../../PresentationalComponents/Template/TemplateCard';
import messages from '../../Messages';
import RunStatus from './RunStatus';
import './RemediationsCard.scss';
import { useIntl } from 'react-intl';

import { RemediationsEmptyState } from './RemediationsEmptyState';

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
                <TemplateCardHeader title='Remediations'/>
            </TemplateCardHead>
            <TemplateCardBody>
                {remediationsFetchStatus === 'fulfilled' &&
                    (Array.isArray(remediations.data) &&
                        (remediations.data.length > 0 ?
                            <React.Fragment>
                                { remediations.data.map(element =>
                                    <RunStatus id={ element.id } name={ element.name } key={ element.id }/>
                                )}
                                { remediations.meta.total > remediations.meta.count &&
                                    <div className='ins-c-remediations-container'>
                                        <div className='ins-c-remediation__status'>
                                        </div>
                                        <div className='ins-c-remediation__timestamp'>
                                            <Button
                                                component='a'
                                                href='./insights/remediations'
                                                variant='link'
                                                isInline
                                            >
                                                { intl.formatMessage(messages.remediationsTotal,
                                                    { total: remediations.meta.total - remediations.meta.count }
                                                ) }
                                            </Button>
                                        </div>
                                    </div>
                                }
                            </React.Fragment>
                            : <RemediationsEmptyState/>)
                    )
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
