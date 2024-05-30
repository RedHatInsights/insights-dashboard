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
    Title,
    Grid,
    GridItem,
    Flex,
    FlexItem
} from '@patternfly/react-core';
import React, { useEffect } from 'react';

import IconList from '../IconList/IconList';
import IconListItem from '../IconList/IconListItem';
import ImgInsSmartMgmt from '../../images/img__ins-and-sm.png';
import MarketingBanner from '../MarketingBanner/MarketingBanner';
import { UI_BASE } from '../../AppConstants';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { ArrowRightIcon } from '@patternfly/react-icons';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

const ZeroState = () => {
    const intl = useIntl();
    const { hideGlobalFilter } = useChrome();

    useEffect(() => {
        hideGlobalFilter?.();

        return () => {
            hideGlobalFilter?.(false);
        };
    }, [hideGlobalFilter]);

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
                                    size="lg"
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
            isWidthLimited={true}
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
                            <div className='insd-c-width-limiter pf-v5-u-pt-lg-on-lg' style={ { '--insd-c-width-limiter--MaxWidth': '600px' } }>
                                <List>
                                    <ListItem>{intl.formatMessage(messages.rhm1)}</ListItem>
                                    <ListItem>{intl.formatMessage(messages.rhm2)}</ListItem>
                                    <ListItem>{intl.formatMessage(messages.rhm3)}</ListItem>
                                </List>
                            </div>
                        </GridItem>
                        <GridItem md={ 6 } lg={ 7 } className='pf-v5-u-pl-lg'>
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
