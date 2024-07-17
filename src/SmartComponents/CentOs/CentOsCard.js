import React, { useEffect, useState } from 'react';
import {
    Bullseye,
    Button,
    Flex,
    FlexItem,
    Spinner,
    Text,
    TextContent,
    Title
} from '@patternfly/react-core';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import useInsightsNavigate from '@redhat-cloud-services/frontend-components-utilities/useInsightsNavigate';
import { INVENTORY_CENTOS_FETCH_URL } from '../../AppConstants';
import { ExpandableCardTemplate } from '../../PresentationalComponents/Template/ExpandableCardTemplate';
import { TemplateCardBody } from '../../PresentationalComponents/Template/TemplateCard';
import { EOLCountdownAlert } from './EOLCountdownAlert';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

const CentOsCard = () => {
    const axios = useAxiosWithPlatformInterceptors();
    const navigate = useInsightsNavigate('tasks');
    const [totalCentOsHosts, setTotalCentOsHosts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const hasCentOsHosts = totalCentOsHosts !== null && totalCentOsHosts > 0;

    useEffect(() => {
        const getCentOsCount = async () => {
            try {
                const response = await axios.get(INVENTORY_CENTOS_FETCH_URL);

                setTotalCentOsHosts(response.total);
            } catch (error) {
                setTotalCentOsHosts(0);
            }

            setIsLoading(false);
        };

        getCentOsCount();
    }, []);

    return (
        <ExpandableCardTemplate
            appName="tasks"
            className="centos-warning insd-m-toggle-right-on-md"
            title="Convert your CentOS systems to RHEL"
            body={
                <TemplateCardBody>
                    <Flex direction={{ default: 'column' }} gap={{ default: 'gapLg' }}>
                        <FlexItem>
                            <EOLCountdownAlert />
                        </FlexItem>
                        {isLoading && (
                            <Bullseye>
                                <Spinner aria-label='Loading CentOS hosts'/>
                            </Bullseye>
                        )}
                        {(!isLoading && hasCentOsHosts) && (
                            <FlexItem>
                                <Flex
                                    direction={{ default: 'column' }}
                                    alignItems={{ default: 'alignItemsCenter' }}
                                    gap={{ default: 'gapMd' }}
                                >
                                    <Title headingLevel="h3" size="2xl">
                                        {totalCentOsHosts} CentOS systems
                                    </Title>
                                    <Text component="p" style={{ textAlign: 'center' }}>
                                        Detected on your system and ready for pre-conversion
                                        analysis and conversion to RHEL.
                                    </Text>
                                    <Text component="p" style={{ textAlign: 'center' }}>
                                        <a
                                            href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/centos-migration"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Learn more
                                        </a>{' '}
                                        about migrating your CentOS Linux systems to RHEL, whether
                                        on-premise or in the cloud
                                    </Text>
                                    <FlexItem>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                navigate('/available/convert-to-rhel-analysis')
                                            }
                                        >
                                            Start converting CentOS systems
                                        </Button>
                                    </FlexItem>
                                </Flex>
                            </FlexItem>
                        )}
                        {(!isLoading && !hasCentOsHosts) && (
                            <>
                                <FlexItem>
                                    <TextContent>
                                        <Text component="p">
                                            On June 30, 2024, CentOS Linux 7 will reach End of Life
                                            (EOL), and those systems will stop receiving updates,
                                            security patches, and new features.
                                        </Text>
                                        <Text component="p">
                                            Red Hat can help.{' '}
                                            <a
                                                href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/centos-migration"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Learn more
                                            </a>{' '}
                                            about migrating your CentOS Linux systems to RHEL, whether
                                            on-premise or in the cloud
                                        </Text>
                                    </TextContent>
                                </FlexItem>
                                <FlexItem>
                                    <Button
                                        variant="secondary"
                                        component='a'
                                        icon={<ExternalLinkAltIcon />}
                                        iconPosition="end"
                                        target='_blank'
                                        // eslint-disable-next-line max-len
                                        href="https://docs.redhat.com/en/documentation/red_hat_insights/1-latest/html/converting_from_a_linux_distribution_to_rhel_using_the_convert2rhel_utility_in_red_hat_insights/preparation-for-a-rhel-conversion-using-insights_converting-from-a-linux-distribution-to-rhel-in-insights"
                                    >
                                        Prepare CentOS systems to convert via Insights
                                    </Button>
                                </FlexItem>
                            </>
                        )}
                    </Flex>
                </TemplateCardBody>
            }
        />
    );
};

export default CentOsCard;
export { CentOsCard };
