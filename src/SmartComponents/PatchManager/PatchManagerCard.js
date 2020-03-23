import React from 'react';
import { TemplateCard, TemplateCardBody, TemplateCardHeader } from '../../PresentationalComponents/Template/TemplateCard';
import { PieChart } from '../../ChartTemplates/PieChart/PieChartTemplate';
import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';

/**
 * Operating systems card for showing the ratio of operating systems used.
 */
const PatchManagerCard = () => {
    const pieChartData = [
        { x: 'security advisories', y: 254, fill: '#004b95' },
        { x: 'bug fixes', y: 400, fill: '#06c' },
        { x: 'enhancements', y: 100, fill: '#519de9' }
    ];
    const pieChartLegendData = pieChartData.map(item => ({ name: `${item.y} ${item.x}`, symbol: { fill: `${item.fill}`, type: 'circle' } }));
    const colorScale = ['#004b95', '#06c', '#519de9'];
    const pieChartPadding = { bottom: 0, left: 0, right: 0, top: 0 };
    return <TemplateCard appName='PatchManager'>
        <TemplateCardHeader subtitle='Patch manager'/>
        <TemplateCardBody>
            <Button
                component="a"
                href=""
                variant="link"
                isInline
                style={ { textAlign: 'left' } }
            >
                0 systems affected
            </Button>
            <PieChart
                ariaDesc="Operating systems used"
                ariaTitle="Pie chart operating systems"
                constrainToVisibleArea={ true }
                data={ pieChartData }
                labels={ ({ datum }) => `${datum.x}: ${datum.y}` }
                padding={ pieChartPadding }
                height={ 65 }
                width={ 65 }
                colorScale={ colorScale }
                legend="true"
                legendData={ pieChartLegendData }
                legendOrientation="vertical"
                legendHeight={ 75 }
                legendWidth={ 200 }
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default PatchManagerCard;
