import '../../PresentationalComponents/NumberDescription/NumberDescription.scss';

import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts/Flex/index';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import CriticalIcon from '../../Icons/CriticalIcon';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';
import React from 'react';
import propTypes from 'prop-types';

export const NumberDescription = ({ data, dataSize, link, linkDescription, layout, critical, iconTooltipText }) => {
    return (
        <div className={ `${layout ? `pf-m-${layout}` : ''}` }>
            {critical === 'true' && (
                <CriticalIcon />
            )}
            <Flex direction={ { default: 'column' } } spaceItems={ { default: 'spaceItemsXs' } }>
                <FlexItem>
                    <NumberData data={ data } dataSize={ dataSize } iconTooltipText={ iconTooltipText } />
                </FlexItem>
                <FlexItem>
                    <Button component='a' isInline variant="link" href={ link } >{linkDescription}</Button>
                </FlexItem>
            </Flex>
        </div>
    );};

NumberDescription.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    percentageData: propTypes.string,
    link: propTypes.any,
    linkDescription: propTypes.string,
    layout: propTypes.string,
    critical: propTypes.string,
    iconTooltipText: propTypes.node,
    flexDirection: propTypes.object
};

export default NumberDescription;
