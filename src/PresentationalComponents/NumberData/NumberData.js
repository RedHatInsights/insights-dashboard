import '../../PresentationalComponents/NumberData/NumberData.scss';

import React from 'react';
import propTypes from 'prop-types';

export const NumberData = ({ data, dataSize }) => (
  <div>
    <span className={`insd-c-dashboard__number-data--${dataSize}`}>{data}</span>
  </div>
);

NumberData.propTypes = {
  data: propTypes.any,
  dataSize: propTypes.string,
};
