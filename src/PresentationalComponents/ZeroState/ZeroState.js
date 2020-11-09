import React from 'react';
import './_zero-state.scss';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Flex,
    FlexItem,
    Grid,
    GridItem,
    List,
    ListItem,
    PageSection,
    TextContent,
    Title
} from '@patternfly/react-core';

import {
    Table,
    TableHeader,
    TableBody,
    sortable,
    SortByDirection
} from '@patternfly/react-table';

import { UI_BASE } from '../../AppConstants';
import MarketingBanner from '../MarketingBanner/MarketingBanner';
import IconList from '../IconList/IconList';
import IconListItem from '../IconList/IconListItem';

import ArrowRightIcon from '@patternfly/react-icons/dist/js/icons/arrow-right-icon';
import ImgInsSmartMgmt from '../../images/img__ins-and-sm.png';

class SortableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'CVE ID', transforms: [sortable] },
                { title: 'Publish Date', transforms: [sortable] },
                { title: 'Severity', transforms: [sortable] },
                { title: 'CVSS', transforms: [sortable] }
            ],
            rows: [
                [
                    { title:
                        <a href="#">CVE-2020-14365</a>
                    },
                    '30 Aug 2020',
                    { title:
                        <span>Important</span>
                    },
                    { title:
                        <span>6.3</span>
                    }
                ],
                [
                    { title:
                        <a href="#">CVE-2020-17376</a>
                    },
                    '30 Aug 2020',
                    { title:
                        <span>Important</span>
                    },
                    { title:
                        <span>6.3</span>
                    }
                ],
                [
                    { title:
                        <a href="#">CVE-2020-15669</a>
                    },
                    '30 Aug 2020',
                    { title:
                        <span>Important</span>
                    },
                    { title:
                        <span>6.3</span>
                    }
                ],
                [
                    { title:
                        <a href="#">CVE-2020-15664</a>
                    },
                    '30 Aug 2020',
                    { title:
                        <span>Important</span>
                    },
                    { title:
                        <span>6.3</span>
                    }
                ]
            ],
            sortBy: {}
        };
        this.onSort = this.onSort.bind(this);
    }

    onSort(_event, index, direction) {
        const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        this.setState({
            sortBy: {
                index,
                direction
            },
            rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
        });
    }

    render() {
        const { columns, rows, sortBy } = this.state;

        return (
            <Table aria-label="Sortable Table" sortBy={ sortBy } onSort={ this.onSort } cells={ columns } rows={ rows }>
                <TableHeader />
                <TableBody />
            </Table>
        );
    }
}

const ZeroState = () => {
    return (
        <div className="ins-c-marketing-page">
            <MarketingBanner
                hasGraphic
                graphicRight
                dark1000
                fullBleed
                style={ {
                    '--ins-c-marketing-banner--graphic--width-on-md': '200px',
                    '--ins-c-marketing-banner--graphic--width-on-xl': '400px' } }>
                <Grid>
                    <GridItem>
                        <Flex direction={ { default: 'column' } }>
                            <FlexItem>
                                <Title headingLevel="h1" size="2xl">
                                    Get started with Insights
                                </Title>
                            </FlexItem>
                            <FlexItem spacer={ { default: 'spacer2xl' } }>
                                <div className="ins-c-width-limiter" style={ { '--ins-c-width-limiter--MaxWidth': '600px' } }>
                                    <p className="ins-c-text--black-400">
                                        Single, consistent management solution across on-premise, hybrid cloud,
                                        and public cloud. Included with Red Hat Enterprise Linux subscription.
                                    </p>
                                </div>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    isLarge
                                    component='a'
                                    href={ `${UI_BASE}/registration` } variant='primary'>
                                    Register your systems
                                </Button>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    className='pf-m-plain'
                                    variant='secondary'
                                    component='a'
                                    href='https://www.redhat.com/en/resources/smart-management-datasheet'>
                                    Learn more about insights&nbsp;&nbsp;&nbsp;
                                    <ArrowRightIcon/>
                                </Button>
                            </FlexItem>
                        </Flex>
                    </GridItem>
                </Grid>
            </MarketingBanner>
            <PageSection isWidthLimited>
                <Grid lg={ 6 } hasGutter>
                    <GridItem>
                        <Card style={ { height: '100%' } }>
                            <CardHeader>
                                <TextContent>
                                    <Title headingLevel="h2">
                                        Improve operational confidence
                                    </Title>
                                    <p>
                                        Deliver more reliable IT solutions by identifying performance and
                                        configuration risks before downtime occurs. With less downtime,
                                        IT can focus on higher value projects and deepen their skills.
                                    </p>
                                </TextContent>
                            </CardHeader>
                            <CardBody>
                                <IconList>
                                    <IconListItem>
                                        Meet high IT performance and security demands across traditional and cloud instances.
                                    </IconListItem>
                                    <IconListItem>
                                        Gain operational confidence through enhanced visibility into IT environments.
                                    </IconListItem>
                                    <IconListItem>
                                        Optimize staff efficiency and extend Linux skills.
                                    </IconListItem>
                                    <IconListItem>
                                        Shift teams to focus on delivering innovation.
                                    </IconListItem>
                                    <IconListItem>
                                        Control complexity by working with fewer and more reliable configurations.
                                    </IconListItem>
                                </IconList>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem>
                        <Card style={ { height: '100%' } }>
                            <CardHeader>
                                <TextContent>
                                    <Title headingLevel="h2">
                                        Continually manage vulnerability risks
                                    </Title>
                                    <p>
                                        Identify risks in advance, and filter to focus on the most important ones. Continually
                                        analyze against a large volume of Red Hat industry vulnerability and
                                        compliance advisories, as well as your own policies without manual steps.
                                    </p>
                                </TextContent>
                            </CardHeader>
                            <CardBody>
                                <IconList>
                                    <IconListItem>
                                        Implement more defined analytics-driven processes for risk assessment and prioritization.
                                    </IconListItem>
                                    <IconListItem>
                                        Remediate prioritized risks using easy to understand guidance or Ansible &#8482;
                                        Playbooks to address threats at scale.
                                    </IconListItem>
                                    <IconListItem>
                                        Gain visibility into your posture regarding security vulnerabilities, industry compliance,
                                        and internally defined security policies.
                                    </IconListItem>
                                    <IconListItem>
                                        Easily create audience-appropriate reporting.
                                    </IconListItem>
                                    <IconListItem>
                                        Implement predictable processes. Shift teams to more predictable processes for
                                        continuous security visibility.
                                    </IconListItem>
                                </IconList>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </PageSection>
            <PageSection isWidthLimited className="pf-m-light">
                <Grid hasGutter>
                    <GridItem>
                        <div className="ins-l-autofit pf-m-gutter"
                            style={ { '--ins-l-autofit--GridTemplateColumns--min-on-sm': '360px',
                                '--ins-l-autofit--GridTemplateColumns--min-on-lg': '440px' } }>
                            <Flex direction={ { default: 'column' } }>
                                <FlexItem>
                                    <Title headingLevel="h2" size="lg">
                                        Latest security vulnerabilities affecting RHEL infrastructures
                                    </Title>
                                </FlexItem>
                                <FlexItem>
                                    <Card isFlat>
                                        <SortableTable />
                                    </Card>
                                </FlexItem>
                            </Flex>
                            <TextContent>
                                <Title headingLevel="h2" size="lg">
                                    Red Hat&lsquo;s response: Boot Hole vulnerability
                                </Title>
                                <h3>
                                    8.3 CVSS Base Score
                                </h3>
                                <p>
                                    Red Hat is currently responding to a flaw in the GRUB 2 boot loader that impacts
                                    our products, including Red Hat Enterprise Linux. This flaw allows an attacker,
                                    already on the system, to hijack the boot process and execute malicious code during
                                    system startup...&nbsp;<a href="#">more</a>
                                </p>
                                <h3 aria-hidden="true" id="list-label">
                                    The following Red Hat product versions are impacted:
                                </h3>
                                <ul aria-labelledby="list-label">
                                    <li>Red Hat Enterprise Linux 7</li>
                                    <li>Red Hat Enterprise Linux 8</li>
                                    <li>Red Hat Atomic Host</li>
                                    <li>OpenShift Container Platform 4 (RHEL CoreOS)</li>
                                </ul>
                            </TextContent>
                        </div>
                    </GridItem>
                    <GridItem style={ { 'text-align': 'center' } }>
                        <Button isLarge variant="secondary">
                            Find issues across your infrastructure
                        </Button>
                    </GridItem>
                </Grid>
            </PageSection>
            <MarketingBanner
                isWidthLimited="true"
                hasGraphic
                graphicRight
                dark1000
                fullBleed
                style={ {
                    '--ins-c-marketing-banner--graphic--width': '400px' } }>
                <Flex direction={ { default: 'column' } }>
                    <FlexItem spacer={ { default: 'spacerLg' } }>
                        <Title headingLevel="h3" size="lg">
                            Data privacy and controls in Red Hat Insights
                        </Title>
                    </FlexItem>
                    <FlexItem spacer={ { default: 'spacerXl' } }>
                        <p className="ins-c-width-limiter ins-c-text--black-400"
                            style={ { '--ins-c-width-limiter--MaxWidth': '70ch' } }>
                            Red Hat Insights provides a mechanism for users to obtain
                            actionable intelligence regarding suggested improvements to
                            deployed Red Hat software. This document covers the
                            security measures Red Hat puts in place to provide
                            secure transmission, processing, and analysis of this
                            data by those tools.
                        </p>
                    </FlexItem>
                    <FlexItem>
                        <Button className="pf-m-reversed">
                            Understanding our security measures
                        </Button>
                    </FlexItem>
                </Flex>
            </MarketingBanner>
            <PageSection isWidthLimited>
                <Flex direction={ { default: 'column' } }>
                    <FlexItem spacer={ { default: 'spacerXl' } }>
                        <TextContent>
                            <Title headingLevel="h3">
                                Insights and smart management
                            </Title>
                            <div className="ins-c-width-limiter" style={ { '--ins-c-width-limiter--MaxWidth': '900px' } }>
                                <p>
                                    Smart management subscription enables push-button remediation of issues
                                    identified by Insights. Any issues identified by Insights are accompanied by
                                    remediation instructions, and with Smart Management, remediation is available
                                    at scale.
                                </p>
                            </div>
                        </TextContent>
                    </FlexItem>
                    <FlexItem>
                        <Grid hasGutter>
                            <GridItem md={ 6 } lg={ 5 } mdRowSpan={ 3 }>
                                <img src={ ImgInsSmartMgmt } alt="Insights smart management" />
                            </GridItem>
                            <GridItem md={ 6 } lg={ 7 }>
                                <div className="ins-c-width-limiter pf-u-pt-lg" style={ { '--ins-c-width-limiter--MaxWidth': '600px' } }>
                                    <List>
                                        <ListItem>
                                            Red Hat Management gives you the flexibility to manage Red Hat
                                            Enterprise Linux on-premise or in a hosted environment
                                        </ListItem>
                                        <ListItem>
                                            Red Hat Management covers your entire system and security management
                                            life cycle
                                        </ListItem>
                                        <ListItem>
                                            Red Hat Management includes Red Hat Satellite and the new cloud
                                            management services for Red Hat Enterprise Linux
                                        </ListItem>
                                    </List>
                                </div>
                            </GridItem>
                            <GridItem md={ 6 } lg={ 7 } className="pf-u-pl-lg">
                                <Flex>
                                    <FlexItem>
                                        <Button className="pf-m-secondary"
                                            component="a"
                                            href="https://www.redhat.com/en/technologies/management/smart-management"
                                            target="_blank">
                                            Learn more
                                        </Button>
                                    </FlexItem>
                                    <FlexItem>
                                        <Button className="pf-m-secondary"
                                            component="a"
                                            href="https://www.redhat.com/en/contact"
                                            target="_blank">
                                            Contact sales
                                        </Button>
                                    </FlexItem>
                                </Flex>
                            </GridItem>
                        </Grid>
                    </FlexItem>
                </Flex>
            </PageSection>
        </div>
    );
};

export default ZeroState;
