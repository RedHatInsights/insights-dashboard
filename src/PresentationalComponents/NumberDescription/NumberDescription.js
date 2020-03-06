import React from 'react';
import { Button } from '@patternfly/react-core';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberDescription/NumberDescription.scss';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';

export const NumberDescription = ({ data, dataSize, linkDescription }) => (
    <div className="ins-c-dashboard__number-description">
        <NumberData data={ data } dataSize={ dataSize }/>
        <Button variant="link">
            { linkDescription }
        </Button>
    </div>
);

NumberDescription.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    linkDescription: propTypes.string
};

export default NumberDescription;
