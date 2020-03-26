import React from 'react';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberData/NumberData.scss';
import InfoIcon from '../../Icons/InfoIcon';

export const NumberData = ({ data, dataSize, percentageData }) => (
    <div className="ins-c-dashboard__number-data--number-percentage">
        <span className={ `ins-c-dashboard__number-data--${dataSize}` }>
            {data}
        </span>
        { percentageData &&
            <span className="ins-c-dashboard__number-percentage">
                <span>{percentageData}</span>
                <InfoIcon/>
            </span>
        }
    </div>
);

NumberData.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    linkDescription: propTypes.string,
    percentageData: propTypes.string
};

export default NumberData;
