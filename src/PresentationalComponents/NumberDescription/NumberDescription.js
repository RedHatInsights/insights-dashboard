import React from 'react';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberDescription/NumberDescription.scss';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';

export const NumberDescription = ({ data, dataSize, link, linkDescription, layout }) => (
    <div className={ `ins-c-dashboard__number-description pf-m-${layout}` }>
        <NumberData data={ data } dataSize={ dataSize }/>
        <Button component="a" variant="link" href={ link }>
            { linkDescription }
        </Button>
    </div>
);

NumberDescription.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    link: propTypes.any,
    linkDescription: propTypes.string,
    layout: propTypes.string
};

export default NumberDescription;
