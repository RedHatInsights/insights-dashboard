import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core/dist/esm/components';
import React, { useContext } from 'react';

import { AppBlock } from '../../PresentationalComponents/Template/AppBlockTemplate';
import ComplianceIcon from '../../images/Icon-Red_Hat-Software_and_technologies-App_Secured-A-Red-RGB.svg';
import { Flex } from '@patternfly/react-core/dist/esm/layouts';
import { PermissionContext } from '../../App';
import RemediationsIcon from '../../images/Icon-Red_Hat-Software_and_Technologies-Automation-A-Red-RGB.svg';
import { UI_BASE } from '../../AppConstants';
import messages from '../../Messages';
import propTypes from 'prop-types';
import { useIntl } from 'react-intl';

export const DashboardFooter = ({ supportsSap }) => {
    const permission = useContext(PermissionContext);
    const intl = useIntl();

    return (permission.hasSystems && supportsSap) && (!permission.remediations || !permission.compliance) ?
        <PageSection isWidthLimited className='insd-c-dashboard-footer pf-u-pt-lg' variant={PageSectionVariants.light}>
            <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsXl' }}>
                <Title headingLevel="h2" size="xl">
                    {intl.formatMessage(messages.footerTitle)}
                </Title>
                <div className="insd-l-columns insd-m-3-col-on-xl">
                    {!permission.compliance &&
                        <AppBlock
                            appName='compliance'
                            title={intl.formatMessage(messages.complianceAppBlockHeader)}
                            body={intl.formatMessage(messages.complianceAppBlockBody)}
                            url={`${UI_BASE}/compliance/reports`}
                            icon={<img src={ComplianceIcon} alt='Insights Remediation Icon' />}
                        />
                    }{!permission.remediations &&
                        <AppBlock
                            appName='remediation'
                            title={intl.formatMessage(messages.remediationsAppBlockHeader)}
                            body={intl.formatMessage(messages.remediationsAppBlockBody)}
                            url={`${UI_BASE}/remediations/`}
                            icon={<img src={RemediationsIcon} alt='Insights Remediation Icon' />}
                        />
                    }
                </div>
            </Flex>
        </PageSection>
        : '';
};

DashboardFooter.propTypes = { supportsSap: propTypes.bool };

export default DashboardFooter;
