import React from 'react';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberData/NumberData.scss';

export const NumberData = ({ data, dataSize }) => (
    <p className={ `ins-c-dashboard__number-data--${dataSize}` }>
        {data}
    </p>
);

NumberData.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    linkDescription: propTypes.string
};

export default NumberData;
