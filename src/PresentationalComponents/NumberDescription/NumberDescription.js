import '../../../src/PresentationalComponents/NumberDescription/NumberDescription.scss';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import CriticalIcon from '../../Icons/CriticalIcon';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';
import React from 'react';
import propTypes from 'prop-types';

export const NumberDescription = ({ data, dataSize, percentageData, link, linkDescription, layout, critical, iconTooltipText }) => (
    <div className={ `ins-c-dashboard__number-description ${layout ? `pf-m-${layout}` : ''}` }>
        {critical === 'true' && (
            <CriticalIcon />
        )}
        <Button component="a" variant="link" href={ link } >
            <span className='pf-c-button__text'>
                <NumberData data={ data } dataSize={ dataSize } percentageData={ percentageData } iconTooltipText={ iconTooltipText } />
                {linkDescription}
            </span>
        </Button>
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
    iconTooltipText: propTypes.node
};

export default NumberDescription;
