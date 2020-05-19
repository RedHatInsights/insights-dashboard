import React from 'react';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import propTypes from 'prop-types';
import '../../../src/PresentationalComponents/NumberDescription/NumberDescription.scss';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';
import CriticalIcon from '../../Icons/CriticalIcon';

export const NumberDescription = ({ data, dataSize, percentageData, link, linkDescription, layout, critical, iconTooltipText }) => (
    <div className={ `ins-c-dashboard__number-description ${layout ? `pf-m-${layout}` : ''}` }>
        { critical === 'true' && (
            <CriticalIcon />
        )}
        <Button component="a" variant="link" href={ link }>
            <NumberData data={ data } dataSize={ dataSize } percentageData={ percentageData } iconTooltipText={ iconTooltipText }/>
            { linkDescription }
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
