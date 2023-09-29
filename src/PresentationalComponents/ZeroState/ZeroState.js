import './_zero-state.scss';

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    List,
    ListItem,
    PageSection,
    TextContent,
    Title
} from '@patternfly/react-core/dist/esm/components/index';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts/Flex/index';
import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import React, { useEffect, useState } from 'react';
import {
    SortByDirection,
    Table,
    TableBody,
    TableHeader,
    sortable
} from '@patternfly/react-table/dist/esm/components/Table/index';

import API from '../../Utilities/Api';
import IconList from '../IconList/IconList';
import IconListItem from '../IconList/IconListItem';
import ImgInsSmartMgmt from '../../images/img__ins-and-sm.png';
import MarketingBanner from '../MarketingBanner/MarketingBanner';
import { UI_BASE, VULNERABILITIES_CVES_URL } from '../../AppConstants';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { ArrowRightIcon } from '@patternfly/react-icons';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

// eslint-disable-next-line no-unused-vars
const SortableTable = () => {
    const columns = [
        { title: 'CVE ID', transforms: [sortable] },
        { title: 'Publish Date', transforms: [sortable] },
        { title: 'Impact', transforms: [sortable] },
        { title: 'CVSS Base Score', transforms: [sortable] }
    ];
    const [rows, setRows] = useState([]);
    const [sortBy, setSort] = useState({});
    const dateFormatter = (date) => {
        const newDate = (new Date(date)).toString().split(' ');
        return `${newDate[2]} ${newDate[1]} ${newDate[3]}`;
    };

    const rowBuilder = data => data.map(row => [{
        title: <a href={ ` https://access.redhat.com/security/cve/${row.id}` }
            target='_blank' rel='noreferrer'>{row.id}</a>
    },
    { title: <span>{dateFormatter(row.attributes.public_date)}</span> },
    { title: <span>{row.attributes.impact}</span> },
    { title: <span>{row.attributes.cvss3_score}</span> }]);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCves = async () => {
            try {
                const cves = (await API.get(VULNERABILITIES_CVES_URL, {}, { sort: '-public_date', limit: 4 })).data;
                setRows(rowBuilder(cves.data));
            } catch (error) {
                throw `${error}`;
            }
        };

        fetchCves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSort = (_event, index, direction) => {
        const sortedRows = rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
        setSort({ index, direction });
        setRows(direction === SortByDirection.asc ? sortedRows : sortedRows.reverse());
    };

    return <Table aria-label='Sortable Table' sortBy={ sortBy } onSort={ onSort } cells={ columns } rows={ rows }>
        <TableHeader />
        <TableBody />
    </Table>;
};

const ZeroState = () => {
    const intl = useIntl();
    const { hideGlobalFilter } = useChrome();

    useEffect(() => {
        hideGlobalFilter?.();

        return () => {
            hideGlobalFilter?.(false);
        };
    }, []);

    return <div className='insd-c-marketing-page'>
        <MarketingBanner
            hasGraphic
            graphicRight
            dark1000
            fullBleed
            isWidthLimited
            style={ {
                '--ins-c-marketing-banner--graphic--width-on-md': '200px',
                '--ins-c-marketing-banner--graphic--width-on-xl': '400px'
            } }>
            <Grid>
                <GridItem>
                    <Flex direction={ { default: 'column' } }>
                        <FlexItem>
                            <Title headingLevel='h1' size='2xl'>
                                {intl.formatMessage(messages.noSystemsTitle)}
                            </Title>
                        </FlexItem>
                        <FlexItem spacer={ { default: 'spacer2xl' } }>
                            <div className='insd-c-width-limiter' style={ { '--insd-c-width-limiter--MaxWidth': '600px' } }>
                                <p className='ins-c-text--black-400'>{intl.formatMessage(messages.singleConsistent)}</p>
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <InsightsLink app='registration' to="/">
                                <Button
                                    isLarge
                                    component='a'
                                    variant='primary'
                                    style={{ color: 'white' }}
                                    href={ `${UI_BASE}/registration` }>
                                    {intl.formatMessage(messages.registerYourSystems)}
                                </Button>
                            </InsightsLink>
                        </FlexItem>
                        <FlexItem>
                            <Button
                                className='pf-m-plain'
                                component='a'
                                variant='secondary'
                                target='_blank'
                                rel='noreferrer'
                                href='https://www.redhat.com/en/technologies/management/insights'>
                                {intl.formatMessage(messages.learnmoreRHI)}&nbsp;&nbsp;&nbsp;
                                <ArrowRightIcon />
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
                                <Title headingLevel='h2'>{intl.formatMessage(messages.zslblTitle)}</Title>
                                <p>{intl.formatMessage(messages.zslblBody)}</p>
                            </TextContent>
                        </CardHeader>
                        <CardBody>
                            <IconList>
                                <IconListItem>{intl.formatMessage(messages.zslblb1)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zslblb2)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zslblb3)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zslblb4)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zslblb5)}</IconListItem>
                            </IconList>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem>
                    <Card style={ { height: '100%' } }>
                        <CardHeader>
                            <TextContent>
                                <Title headingLevel='h2'>{intl.formatMessage(messages.zsrblTitle)}</Title>
                                <p>{intl.formatMessage(messages.zsrblBody)}</p>
                            </TextContent>
                        </CardHeader>
                        <CardBody>
                            <IconList>
                                <IconListItem>{intl.formatMessage(messages.zsrblb1)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zsrblb2)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zsrblb3)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zsrblb4)}</IconListItem>
                                <IconListItem>{intl.formatMessage(messages.zsrblb5)}</IconListItem>
                            </IconList>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </PageSection>
        <MarketingBanner
            isWidthLimited='true'
            hasGraphic
            graphicRight
            dark1000
            fullBleed
            style={ {
                '--ins-c-marketing-banner--graphic--width': '400px'
            } }>
            <Flex direction={ { default: 'column' } }>
                <FlexItem spacer={ { default: 'spacerLg' } }>
                    <Title headingLevel='h3' size='lg'>
                        {intl.formatMessage(messages.dataPrivacyAndControlsTitle)}
                    </Title>
                </FlexItem>
                <FlexItem spacer={ { default: 'spacerXl' } }>
                    <p className='insd-c-width-limiter ins-c-text--black-400'
                        style={ { '--insd-c-width-limiter--MaxWidth': '70ch' } }>
                        {intl.formatMessage(messages.dataPrivacyAndControls)}
                    </p>
                </FlexItem>
                <FlexItem>
                    <Button
                        component='a'
                        target='_blank'
                        rel='noreferrer'
                        href={ `./security/insights` }>
                        {intl.formatMessage(messages.securityRedirect)}
                    </Button>
                </FlexItem>
            </Flex>
        </MarketingBanner>
        <PageSection isWidthLimited>
            <Flex direction={ { default: 'column' } }>
                <FlexItem spacer={ { default: 'spacerXl' } }>
                    <TextContent>
                        <Title headingLevel='h3'>
                            {intl.formatMessage(messages.insightsandsatellite)}
                        </Title>
                        <div className='insd-c-width-limiter' style={ { '--insd-c-width-limiter--MaxWidth': '900px' } }>
                            <p>{intl.formatMessage(messages.satellite)}</p>
                        </div>
                    </TextContent>
                </FlexItem>
                <FlexItem>
                    <Grid hasGutter>
                        <GridItem md={ 6 } lg={ 5 } mdRowSpan={ 3 }>
                            <img src={ ImgInsSmartMgmt } alt='Insights Satellite' />
                        </GridItem>
                        <GridItem md={ 6 } lg={ 7 }>
                            <div className='insd-c-width-limiter pf-u-pt-lg-on-lg' style={ { '--insd-c-width-limiter--MaxWidth': '600px' } }>
                                <List>
                                    <ListItem>{intl.formatMessage(messages.rhm1)}</ListItem>
                                    <ListItem>{intl.formatMessage(messages.rhm2)}</ListItem>
                                    <ListItem>{intl.formatMessage(messages.rhm3)}</ListItem>
                                </List>
                            </div>
                        </GridItem>
                        <GridItem md={ 6 } lg={ 7 } className='pf-u-pl-lg'>
                            <Flex>
                                <FlexItem>
                                    <Button
                                        className='pf-m-secondary'
                                        component='a'
                                        target='_blank'
                                        rel='noreferrer'
                                        href='https://www.redhat.com/en/technologies/management/satellite'>
                                        {intl.formatMessage(messages.learnmore)}
                                    </Button>
                                </FlexItem>
                                <FlexItem>
                                    <Button
                                        className='pf-m-secondary'
                                        component='a'
                                        target='_blank'
                                        rel='noreferrer'
                                        href='https://www.redhat.com/en/contact'>
                                        {intl.formatMessage(messages.contactsales)}
                                    </Button>
                                </FlexItem>
                            </Flex>
                        </GridItem>
                    </Grid>
                </FlexItem>
            </Flex>
        </PageSection>
    </div>;
};

export default ZeroState;
