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
import zeroStateConstants from './zeroStateConstants';

const ZeroStateBanner = ({
    appName,
    description = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].header.description,
    commands = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].header.commands,
    bulletPoints = zeroStateConstants[`${appName.toUpperCase()}_ZERO_STATE`].header.bulletPoints,
    customInstructions,
    customButton,
    customText,
    customTitle,
    appId
}) => {
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

    return <div className='insd-c-marketing-page warning'>
        <MarketingBanner
            dark1000
            style={ {
                '--ins-c-marketing-banner--graphic--width-on-md': '200px',
                '--ins-c-marketing-banner--graphic--width-on-xl': '400px'
            } }>
            <Grid lg={ 6 } hasGutter className='pf-u-pt-xl pf-u-pb-xl'>
                <GridItem className='pf-u-pl-lg pf-u-pr-lg'>
                    <Flex direction={ { default: 'column' } }>
                        <FlexItem>
                            <Title headingLevel='h1' size='4xl'>
                                {appName.replace('_', ' ')}
                            </Title>
                        </FlexItem>
                        <FlexItem spacer={ { default: 'spacerXl' } }>
                            <Title headingLevel='h4' style={{ maxWidth: '600px' }}>{description}</Title>
                        </FlexItem>
                        <FlexItem>
                            <IconList className='pf-u-pl-sm ' >
                                {bulletPoints.map(item => (
                                    <IconListItem key={item}>
                                        <Title headingLevel='h4'>
                                            {item}
                                        </Title>
                                    </IconListItem>
                                ))}
                            </IconList>
                        </FlexItem>
                    </Flex>
                </GridItem>

                <GridItem style={{ backgroundColor: '#fff' }} className={!registerButton ? 'bannerBefore' : ''} >
                    {registerButton ?
                        <Flex className='pf-u-p-lg' direction={{ default: 'column' }} style={{ color: '#151515' }}>
                            <a className='pf-u-pb-sm' onClick={updateRegisterButton} >Go Back</a>
                            {commands.map(item => (
                                registerSystemsList(item)
                            ))}
                        </Flex>
                        : (!registerButton && customInstructions) ?
                            customInstructions(setRegisterButton)
                            :
                            <Flex
                                direction={ { default: 'column' } }
                                alignItems={{ default: 'alignItemsCenter' }}
                                alignSelf={{ default: 'alignSelfCenter' }}
                                className='bannerRight' >
                                <FlexItem className='pf-u-pt-lg'>
                                    <Title headingLevel='h1' size='2xl' style={{ color: '#151515' }} ouiaId='ZeroStateCustomAppTitle'>
                                        {customTitle ? customTitle : `Start using ${appName.replace('_', ' ')} now`}
                                    </Title>
                                </FlexItem>
                                <FlexItem>
                                    <div  style={{ maxWidth: '600px', color: '#151515', textAlign: 'center' }}>
                                        <p>{customText ? customText : intl.formatMessage(messages.getStartedInsights)}</p>
                                    </div>
                                </FlexItem>
                                <FlexItem>
                                    { customButton ? customButton :
                                        <Button
                                            id={appId}
                                            onClick={updateRegisterButton}
                                            className='pf-u-p-md pf-u-font-size-md'> Register your systems
                                        </Button>}
                                </FlexItem>
                                <FlexItem>
                                    <a
                                        component='a'
                                        target='_blank'
                                        rel='noreferrer'
                                        href='https://www.redhat.com/en/products/trials?products=rhel' >
                                        {intl.formatMessage(messages.notMember)}
                                    </a>
                                </FlexItem>
                            </Flex>
                    }
                </GridItem>
            </Grid>
        </MarketingBanner>

    </div>;
};

export default ZeroStateBanner;

ZeroStateBanner.propTypes = {
    appName: propTypes.string,
    description: propTypes.object,
    commands: propTypes.array,
    bulletPoints: propTypes.array,
    customInstructions: propTypes.any,
    customButton: propTypes.any,
    customText: propTypes.string,
    customTitle: propTypes.string,
    appId: propTypes.string
};
