import '../../../src/PresentationalComponents/NumberData/NumberData.scss';

import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/js/components/Tooltip/Tooltip';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import InfoIcon from '../../Icons/InfoIcon';
import React from 'react';
import propTypes from 'prop-types';

export const NumberData = ({ data, dataSize, percentageData, iconTooltipText }) => (
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
                    <Button variant="plain" aria-label="Action" className='ins-c-info-icon'>
                        <InfoIcon />
                    </Button>
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
