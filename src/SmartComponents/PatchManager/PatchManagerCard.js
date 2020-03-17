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
    const pieChartPadding = { bottom: 0, left: 0, right: 220, top: 0 };
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
                className="ins-c-pie-chart"
                containerWidth={ 275 }
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
                width={ 290 }
                colorScale={ colorScale }
            />
        </TemplateCardBody>
    </TemplateCard>;
};

export default PatchManagerCard;
