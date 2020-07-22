import '../../../src/PresentationalComponents/NumberDescription/NumberDescription.scss';

import { Flex, FlexItem } from '@patternfly/react-core/dist/js/layouts/Flex/index';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import CriticalIcon from '../../Icons/CriticalIcon';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';
import React from 'react';
import propTypes from 'prop-types';

export const NumberDescription = ({ data, dataSize, percentageData, link, linkDescription, layout, critical, iconTooltipText, flexDirection }) => (
    <div className={ `ins-c-dashboard__number-description ${layout ? `pf-m-${layout}` : ''}` }>
        {critical === 'true' && (
            <CriticalIcon />
        )}
        <Flex direction={ flexDirection }>
            <FlexItem spacer={ { default: 'spacerXs' } }>
                <NumberData data={ data } dataSize={ dataSize } percentageData={ percentageData } iconTooltipText={ iconTooltipText } />
            </FlexItem>
            <FlexItem spacer={ { default: 'spacerXs' } }>
                <Button component='a' isInline variant="link" href={ link } >{linkDescription}</Button>
            </FlexItem>
        </Flex>
    </div>
);

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
