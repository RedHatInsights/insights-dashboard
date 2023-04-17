import '../ZeroState/_zero-state.scss';

import {
    Button,
    Title
} from '@patternfly/react-core/dist/esm/components/index';
import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts/Flex/index';
import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import React, { useEffect, useState } from 'react';

import IconList from '../IconList/IconList';
import IconListItem from '../IconList/IconListItem';
import MarketingBanner from '../MarketingBanner/MarketingBanner';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import registerSystemsList from '../RegisterSystemList';
import propTypes from 'prop-types';

//An array like this would be passed into the app
const testObject = [
    { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' },
    { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' },
    { intructions: 'Install the client on the RHEL system', command: '[root@server] testing install insights-clint' }];

const testBullets = ['What problems do we solve', 'What solution do we provide'];

const AppZeroState = ({ appName = 'Insights', description = messages.insightsDescription, commands = testObject, bulletPoints = testBullets }) => {
    const intl = useIntl();
    const { hideGlobalFilter } = useChrome();

    useEffect(() => {
        hideGlobalFilter?.();

        return () => {
            hideGlobalFilter?.(false);
        };
    }, [hideGlobalFilter]);

    const [registerButton, setRegisterButton] = useState(false);
    const updateRegisterButton = ()=> setRegisterButton(!registerButton);

    return <div className='insd-c-marketing-page'>
        <MarketingBanner
            dark1000
            style={ {
                '--ins-c-marketing-banner--graphic--width-on-md': '200px',
                '--ins-c-marketing-banner--graphic--width-on-xl': '400px'
            } }>
            <Grid lg={ 6 } hasGutter className='pf-u-pt-xl pf-u-pb-xl'>
                <GridItem className='pf-u-pl-lg pf-u-pr-lg' >
                    <Flex direction={ { default: 'column' } }>
                        <FlexItem>
                            <Title headingLevel='h1' size='4xl'>
                                {appName}
                            </Title>
                        </FlexItem>
                        <FlexItem spacer={ { default: 'spacerXl' } }>
                            <div className='insd-c-width-limiter' style={ { '--insd-c-width-limiter--MaxWidth': '600px' } }>
                                <p >{intl.formatMessage(description)}</p>
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <IconList className='pf-u-pl-sm ' >
                                {bulletPoints.map(item => (
                                    <IconListItem key={item} >{item}</IconListItem>
                                ))}
                            </IconList>
                        </FlexItem>
                    </Flex>
                </GridItem>

                <GridItem style={{ backgroundColor: '#fff' }} >
                    {registerButton ?
                        <Flex className='pf-u-p-lg' direction={{ default: 'column' }} style={{ color: '#151515' }}>
                            <a className='pf-u-pb-sm' onClick={updateRegisterButton} >Go Back</a>
                            {commands.map(item => (
                                registerSystemsList(item)
                            ))}
                        </Flex>
                        : <Flex
                            direction={ { default: 'column' } }
                            alignItems={{ default: 'alignItemsCenter' }}
                            alignSelf={{ default: 'alignSelfCenter' }} >
                            <FlexItem className='pf-u-pt-lg'>
                                <Title headingLevel='h1' size='2xl' style={{ color: '#151515' }}>
                                    {intl.formatMessage(messages.startUsiningInisghts)}
                                </Title>
                            </FlexItem>
                            <FlexItem>
                                <div className='insd-c-width-limiter' style={ { '--insd-c-width-limiter--MaxWidth': '600px', color: '#151515' } }>
                                    <p >{intl.formatMessage(messages.getStartedInsights)}</p>
                                </div>
                            </FlexItem>
                            <FlexItem>
                                <Button
                                    onClick={updateRegisterButton}
                                    className='pf-u-p-md pf-u-font-size-md'> Register your systems</Button>
                            </FlexItem>
                            <FlexItem>
                                <a
                                    component='a'
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.redhat.com/en/technologies/management/insights' >{intl.formatMessage(messages.notMember)}</a>
                            </FlexItem>
                        </Flex>}
                </GridItem>

            </Grid>
        </MarketingBanner>

    </div>;
};

export default AppZeroState;

AppZeroState.propTypes = {
    appName: propTypes.string,
    description: propTypes.object,
    commands: propTypes.array,
    bulletPoints: propTypes.array
};
