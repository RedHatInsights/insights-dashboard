import './trialsPage.scss';

import { Button, Card, CardBody, CardFooter, TextContent, Title } from '@patternfly/react-core/dist/esm/components';
import { Divider, Grid, GridItem } from '@patternfly/react-core';
import { ArrowRightIcon } from '@patternfly/react-icons';
import React from 'react';
import trialsMessages from './TrialsMessages';
import { useIntl } from 'react-intl';
import TrialsText from './TrialsText';

const HelpfulResources = () => {
    const intl = useIntl();

    return (
        <Card className='trials-page-cards'>
            <CardBody>
                <Title headingLevel='h2'>
                    {intl.formatMessage(trialsMessages.needSupportTitle)}
                </Title>
                <div className='pf-u-display-flex'>
                    <div className='sm-c-trial__support' />
                    <div style={ { flexGrow: 1, alignSelf: 'center' } }>
                        <TextContent>
                            <TrialsText messages={[trialsMessages.needSupportParagraph]} />
                        </TextContent>
                    </div>
                </div>
                <Divider className='pf-u-my-lg' />
                <Title headingLevel="h2" style={{ marginBottom: '8px' }}>
                    {intl.formatMessage(trialsMessages.helpfulResourcesTitle)}
                </Title>
                <TrialsText messages={[trialsMessages.helpfulResourcesParagraph]} />
                <Grid hasGutter style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <GridItem md={ 6 }>
                        <Card isFlat className='pf-u-px-md pf-u-h-100'>
                            <CardBody>
                                {intl.formatMessage(trialsMessages.helpfulResourcesCardOne)}
                            </CardBody>
                            <CardFooter>
                                <Button variant='link' isLarge isInline component='a' href='#' target='blank' rel='noopener noreferrer'>
                                    {intl.formatMessage(trialsMessages.helpfulResourcesCardOneLink)} <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem md={ 6 }>
                        <Card isFlat className='pf-u-px-md pf-u-h-100'>
                            <CardBody>
                                {intl.formatMessage(trialsMessages.helpfulResourcesCardTwo)}
                            </CardBody>
                            <CardFooter>
                                <Button variant='link' isLarge isInline component='a' href='#' target='blank' rel='noopener noreferrer'>
                                    {intl.formatMessage(trialsMessages.helpfulResourcesCardTwoLink)} <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem md={ 6 }>
                        <Card isFlat className='pf-u-px-md pf-u-h-100'>
                            <CardBody>
                                {intl.formatMessage(trialsMessages.helpfulResourcesCardThree)}
                            </CardBody>
                            <CardFooter>
                                <Button variant='link' isLarge isInline component='a' href='#' target='blank' rel='noopener noreferrer'>
                                    {intl.formatMessage(trialsMessages.helpfulResourcesCardThreeLink)} <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem md={ 6 }>
                        <Card isFlat className='pf-u-px-md pf-u-h-100'>
                            <CardBody>
                                {intl.formatMessage(trialsMessages.helpfulResourcesCardFour)}
                            </CardBody>
                            <CardFooter>
                                <Button variant='link' isLarge isInline component='a' href='#' target='blank' rel='noopener noreferrer'>
                                    {intl.formatMessage(trialsMessages.helpfulResourcesCardFourLink)} <ArrowRightIcon />
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </Grid>
                <Button variant='link' isLarge isInline component='a' href='#' target='blank' rel='noopener noreferrer'>
                    {intl.formatMessage(trialsMessages.helpfulResourcesCardFiveLink)} <ArrowRightIcon />
                </Button>
            </CardBody>
        </Card>
    );
};

export default HelpfulResources;
