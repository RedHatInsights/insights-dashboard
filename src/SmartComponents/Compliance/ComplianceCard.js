import * as AppActions from '../../AppActions';
import React, { Component } from 'react';
import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
import { Stack } from '@patternfly/react-core/dist/js/layouts/Stack/Stack';
import { StackItem } from '@patternfly/react-core/dist/js/layouts/Stack/StackItem';
import { Split } from '@patternfly/react-core/dist/js/layouts/Split/Split';
import { SplitItem } from '@patternfly/react-core/dist/js/layouts/Split/SplitItem';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import {
    TemplateCard,
    TemplateCardBody,
    TemplateCardHeader,
    TemplateCardHead,
    TemplateCardActions
} from '../../PresentationalComponents/Template/TemplateCard';
import Loading from '../../PresentationalComponents/Loading/Loading';
import PropTypes from 'prop-types';
import { UI_BASE } from '../../AppConstants';
import { connect } from 'react-redux';
import messages from '../../Messages';
import { injectIntl } from 'react-intl';
import routerParams from '@redhat-cloud-services/frontend-components-utilities/files/RouterParams';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class ComplianceCard extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCompliance();
    }

    render() {
        /*
         * Returns the first two -- if there are at least two entries -- items as a shallow copy of
         * complianceSummary
         */
        const getTopThreePolicies = function (compliance) {
            const complianceTopThree = compliance.data.length > 1 ? compliance.data.slice(0, 3) :
                compliance.data.slice();

            return complianceTopThree;
        };

        const {
            complianceFetchStatus,
            complianceSummary,
            intl
        } = this.props;

        const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };

        return (
            <TemplateCard appName='Compliance' className='ins-c-card__compliance'
                { ...complianceFetchStatus !== 'pending' ? {
                    'data-ouia-safe': true
                } : { 'data-ouia-safe': false } }
            >
                <TemplateCardHead>
                    <TemplateCardActions downloadReport="true"/>
                    <TemplateCardHeader title='Compliance'/>
                </TemplateCardHead>
                <TemplateCardBody>
                    <Stack>
                        {complianceFetchStatus === 'fulfilled' &&
                            (Array.isArray(complianceSummary.data) &&
                                (complianceSummary.data.length > 0 ? (
                                    getTopThreePolicies(complianceSummary).map((element, index) =>
                                        <div className="ins-c-compliance__row" key={ index }>
                                            <div className="ins-c-compliance__row-item">
                                                <PieChart
                                                    containerWidth={ 75 }
                                                    containerHeight={ 75 }
                                                    ariaDesc="Operating systems used"
                                                    ariaTitle="Pie chart operating systems"
                                                    constrainToVisibleArea={ true }
                                                    data={ [
                                                        { x: element.attributes.name, y: element.attributes.score * 100 },
                                                        { x: 'empty', y: 100 }
                                                    ] }
                                                    height={ 100 }
                                                    labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                                                    padding={ pieChartPadding }
                                                    width={ 100 }
                                                    colorScale={ ['#002f5d', '#06c', '#8bc1f7'] }
                                                />
                                            </div>
                                            <div className="ins-c-compliance__row-item">
                                                <Stack>
                                                    <StackItem>
                                                        <Button
                                                            className="ins-c-compliance__policy-link"
                                                            component="a"
                                                            href={ `/${UI_BASE}/compliance/policies/` }
                                                            variant="link"
                                                            isInline
                                                        >
                                                            {element.attributes.name}
                                                        </Button>
                                                    </StackItem>
                                                    <StackItem>
                                                        <Split gutter='sm'>
                                                            <SplitItem>
                                                                { intl.formatMessage(messages.compliantHostCount,
                                                                    { count: element.attributes.compliant_host_count }
                                                                ) }
                                                            </SplitItem>
                                                            <SplitItem>
                                                                { intl.formatMessage(messages.compliantScore,
                                                                    { score: Math.trunc(element.attributes.score * 100) }
                                                                ) }
                                                            </SplitItem>
                                                        </Split>
                                                    </StackItem>
                                                </Stack>
                                            </div>
                                        </div>
                                    )
                                    (
                                        <div className="ins-c-compliance__row">
                                            <div className="ins-c-compliance__row-item">
                                            </div>
                                            <div className="ins-c-compliance__row-item">
                                                <Button
                                                    className="ins-c-compliance__policy-link"
                                                    component="a"
                                                    href={ `/${UI_BASE}/compliance/policies/` }
                                                    variant="link"
                                                    isInline
                                                >
                                                    {complianceFetchStatus === 'fulfilled' && Array.isArray(complianceSummary.data) &&
                                                    complianceSummary.data.length > 1 ? ` ${complianceSummary.data.length} ` : ' '}
                                                    more compliance policies
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <EmptyState className="ins-c-compliance__empty-state" variant={ EmptyStateVariant.full }>
                                        <TextContent>
                                            <Text component={ TextVariants.p }>
                                                No policies are reporting
                                            </Text>
                                            <Text component={ TextVariants.small }>
                                                The compliance service uses SCAP policies to track your organization&apos;s
                                                adherence to compliance requirements.
                                            </Text>
                                            <Text component={ TextVariants.small }>
                                                <a href={ `${UI_BASE}/compliance/policies/` }>Learn about OpenSCAP and Compliance</a>
                                            </Text>
                                        </TextContent>
                                    </EmptyState>
                                ))
                            )
                        }
                        {complianceFetchStatus === 'pending' && (<Loading />)}
                    </Stack>
                </TemplateCardBody>
            </TemplateCard>
        );
    }
}

ComplianceCard.propTypes = {
    fetchCompliance: PropTypes.func,
    complianceSummary: PropTypes.object,
    complianceFetchStatus: PropTypes.string,
    intl: PropTypes.any
};

const mapStateToProps = (state, ownProps) => ({
    complianceSummary: state.DashboardStore.complianceSummary,
    complianceFetchStatus: state.DashboardStore.complianceFetchStatus,
    ...ownProps
});

const mapDispatchToProps = dispatch => ({
    fetchCompliance: (url) => dispatch(AppActions.fetchComplianceSummary(url))
});

export default injectIntl(routerParams(connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplianceCard)));
