import React from 'react';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberData/NumberData.scss';
import InfoIcon from '../../Icons/InfoIcon';
import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/js/components/Tooltip/Tooltip';

export const NumberData = ({ data, dataSize, percentageData, iconTooltipText }) => (
    console.log('test', iconTooltipText),
    <div className="ins-c-dashboard__number-data--number-percentage">
        <span className={ `ins-c-dashboard__number-data--${dataSize}` }>
            {data}
        </span>
        { percentageData &&
            <span className="ins-c-dashboard__number-percentage">
                <span>{percentageData}</span>
                <Tooltip
                    position={ TooltipPosition.top }
                    content={ <div>{ iconTooltipText }</div> }>
                    <InfoIcon />
                </Tooltip>
            </span>
        }
    </div>
);

NumberData.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    linkDescription: propTypes.string,
    percentageData: propTypes.string,
    iconTooltipText: propTypes.node
};

export default NumberData;
