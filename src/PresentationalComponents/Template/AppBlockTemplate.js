import './AppBlockTemplate.scss';

import {
    Button,
    Title
} from '@patternfly/react-core/dist/esm/components';
import {
    Flex,
    FlexItem
} from '@patternfly/react-core/dist/esm/layouts';

import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';
import React from 'react';
import { UI_BASE } from '../../AppConstants';
import propTypes from 'prop-types';

export const AppBlock = ({ className, appName, icon, title, body, url, buttonText, ...props }) => {
    return (
        <div className={ `insd-c-app-block insd-c-app-block--${appName} ${className}` }
            id={ `insd-c-app-block--${appName}` }
            { ...props }
        >
            <div className='insd-c-app-block__icon'>
                { icon }
            </div>
            <Flex
                direction={ { default: 'column' } }
                spaceItems={ { default: 'spaceItemsNone' } }
            >
                <Title headingLevel='h3' size='xs' className='pf-u-pt-sm'>
                    { title }
                </Title>
                <FlexItem spacer={ { default: 'spacerSm' } }>
                    <p className='pf-u-color-200 pf-u-font-size-sm'>{ body }</p>
                </FlexItem>
                <Button variant='link' href={ `${UI_BASE}/${url}` } isInline icon={<ArrowRightIcon />} iconPosition='right'>
                    <span>{ buttonText ? { buttonText } : 'Get started' }</span>
                </Button>
            </Flex>
        </div>
    );
};

AppBlock.propTypes = {
    appName: propTypes.string,
    className: propTypes.string,
    icon: propTypes.any,
    title: propTypes.string,
    body: propTypes.string,
    url: propTypes.string,
    buttonText: propTypes.string
};
