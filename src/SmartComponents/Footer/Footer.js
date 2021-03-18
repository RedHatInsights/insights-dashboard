import { PageSection, PageSectionVariants, Title } from '@patternfly/react-core/dist/esm/components';
import React, { useContext, useEffect, useState } from 'react';
import { SAP_FETCH_URL, UI_BASE } from '../../AppConstants';

import API from '../../Utilities/Api';
import { AppBlock } from '../../PresentationalComponents/Template/AppBlockTemplate';
import BlueprintIcon from '@patternfly/react-icons/dist/js/icons/blueprint-icon';
import BuildIcon from '@patternfly/react-icons/dist/js/icons/build-icon';
import { Flex } from '@patternfly/react-core/dist/esm/layouts';
import { PermissionContext } from '../../App';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

export const DashboardFooter = () => {
    const permission = useContext(PermissionContext);
    const intl = useIntl();
    const [supportsSap, setSupportsSap] = useState(true);
    const workloads = useSelector(({ DashboardStore }) => DashboardStore.workloads);

    useEffect(() => {
        const fetchSapSystems = async () => {
            try {
                const response = await API.get(SAP_FETCH_URL);
                setSupportsSap(response.data.results?.find(({ value }) => value)?.count > 0);
            } catch (error) {
                throw `${error}`;
            }
        };

        fetchSapSystems();
    }, []);

    return permission.hasSystems ?
        (!workloads?.SAP?.isSelected) || (workloads?.SAP?.isSelected && supportsSap) ?
            <PageSection isWidthLimited className='ins-c-dashboard-footer pf-u-pt-lg' variant={PageSectionVariants.light}>
                <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsXl' }}>
                    <Title headingLevel="h2" size="xl">
                        {intl.formatMessage(messages.footerTitle)}
                    </Title>
                    <div className="ins-l-columns ins-m-3-col-on-xl">
                        {!permission.policies &&
                            <AppBlock
                                appName='policies'
                                title={intl.formatMessage(messages.policiesAppBlockHeader)}
                                body={intl.formatMessage(messages.policiesAppBlockBody)}
                                url={`${UI_BASE}/policies/`}
                                icon={<BuildIcon />}
                            />
                        }
                        {!permission.remediations &&
                            <AppBlock
                                appName='remediation'
                                title={intl.formatMessage(messages.remediationsAppBlockHeader)}
                                body={intl.formatMessage(messages.remediationsAppBlockBody)}
                                url={`${UI_BASE}/remediation/`}
                                icon={<BlueprintIcon />}
                            />
                        }
                        {!permission.compliance &&
                            <AppBlock
                                appName='compliance'
                                title={intl.formatMessage(messages.complianceAppBlockHeader)}
                                body={intl.formatMessage(messages.complianceAppBlockBody)}
                                url={`${UI_BASE}/compliance/`}
                                icon={<BuildIcon />}
                            />
                        }
                        {!permission.patch &&
                            <AppBlock
                                appName='patch'
                                title={intl.formatMessage(messages.patchAppBlockHeader)}
                                body={intl.formatMessage(messages.patchAppBlockBody)}
                                url={`${UI_BASE}/patch/advisories`}
                                icon={<BlueprintIcon />}
                            />
                        }
                        {!permission.subscriptions &&
                            <AppBlock
                                appName='subscriptions'
                                title={intl.formatMessage(messages.subscriptionsAppBlockHeader)}
                                body={intl.formatMessage(messages.subscriptionsAppBlockBody)}
                                url={`${UI_BASE}/subscriptions/`}
                                icon={<BuildIcon />}
                            />
                        }
                    </div>
                </Flex>
            </PageSection>
            : ''
        : '';
};

export default DashboardFooter;
