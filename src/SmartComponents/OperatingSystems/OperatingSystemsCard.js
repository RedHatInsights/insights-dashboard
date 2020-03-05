import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const OperatingSystemsCard = () => {
    return <TemplateCard appName='OperatingSystems'>
        <TemplateCardHeader subtitle='Operating systems'>
        </TemplateCardHeader>
        <TemplateCardBody>
                <PieChart
                    ariaDesc="Operating systems used"
                    ariaTitle="Pie chart operating systems"
                    constrainToVisibleArea={ true }
                    data={ [
                        { x: 'Red Hat Enterprise Linux 8', y: 20 },
                        { x: 'Red Hat Enterprise Linux 7', y: 20 },
                        { x: 'Other', y: 60 }
                    ] }
                    height={ 150 }
                    labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                    legendData={ [{ name: 'Red Hat Enterprise Linux 8' }, { name: 'Red Hat Enterprise Linux 7' }, { name: 'Other' }] }
                    legendOrientation="vertical"
                    legendPosition="right"
                    padding={ { top: '20' }, { right: '20' }, { bottom: '120' }, { left: '20'} }
                    width={ 350 }
                />
        </TemplateCardBody>
    </TemplateCard>;
};

export default OperatingSystemsCard;
