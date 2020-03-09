import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const OperatingSystemsCard = () => {
    const pieChartData = [
        { x: 'Red Hat Enterprise Linux 8', y: 20 },
        { x: 'Red Hat Enterprise Linux 7', y: 20 },
        { x: 'Other', y: 60 }
    ];
    const pieChartLegendData = [
        { name: 'Red Hat Enterprise Linux 8', symbol: { fill: '#002f5d', type: 'circle' } },
        { name: 'Red Hat Enterprise Linux 7', symbol: { fill: '#06c', type: 'circle' } },
        { name: 'Other', symbol: { fill: '#8bc1f7', type: 'circle' } }
    ];
    const pieChartPadding = { bottom: 10, left: 10, right: 220, top: 10 };
    return <TemplateCard appName='OperatingSystems'>
        <TemplateCardHeader subtitle='Operating systems'/>
        <TemplateCardBody>
            <PieChart
                containerWidth={ 290 }
                containerHeight={ 90 }
                ariaDesc="Operating systems used"
                ariaTitle="Pie chart operating systems"
                constrainToVisibleArea={ true }
                data={ pieChartData }
                height={ 150 }
                labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                legendData={ pieChartLegendData }
                legendOrientation="vertical"
                legendPosition="right"
                padding={ pieChartPadding }
                width={ 310 }
                colorScale={ ['#002f5d', '#06c', '#8bc1f7'] }
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default OperatingSystemsCard;
