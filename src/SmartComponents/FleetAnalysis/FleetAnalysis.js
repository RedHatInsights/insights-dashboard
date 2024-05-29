import {
    DataList,
    // DataListAction,
    DataListCell,
    DataListContent,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    DataListToggle,
    // Dropdown,
    // DropdownItem,
    // DropdownList,
    // Flex,
    // FlexItem,
    // MenuToggle,
    Spinner,
    Title
} from '@patternfly/react-core';
import React from 'react';
import { useGrabFleetData } from './helpers';
import { OptimizeIcon } from '@patternfly/react-icons';
const FleetAnalysis = () => {
    const [isLoading, fleetData, error] = useGrabFleetData();
    console.log(fleetData, 'fleetData here');

    // const [isOpen1, setIsOpen1] = React.useState(false);
    // const [isOpen2, setIsOpen2] = React.useState(false);
    // const [isOpen3, setIsOpen3] = React.useState(false);
    const [expanded, setExpanded] = React.useState([]);

    const toggle = (id) => {
        const index = expanded.indexOf(id);
        const newExpanded =
      index >= 0
          ? [
              ...expanded.slice(0, index),
              ...expanded.slice(index + 1, expanded.length)
          ]
          : [...expanded, id];
        setExpanded(newExpanded);
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <DataList aria-label='Expandable data list example' isCompact>
                    {/* <DataListItem className='pf-v5-u-mb-0'> */}
                    <Title headingLevel="h6"
                        style={{ backgroundColor: 'purple', color: 'white' }}>
                        <OptimizeIcon className='pf-v5-u-mr-md pf-v5-u-ml-md'/>
                         AI Fleet Analysis
                    </Title>

                    <DataListItem
                        aria-labelledby='ex-item2'
                        isExpanded={expanded.includes('ex-toggle1')}
                    >
                        <DataListItemRow>
                            <DataListToggle
                                onClick={() => toggle('ex-toggle1')}
                                isExpanded={expanded.includes('ex-toggle1')}
                                id='ex-toggle1'
                                aria-controls='ex-expand2'
                            />
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell isIcon key='icon'>
                                        {/* <CodeBranchIcon /> */}
                                    </DataListCell>,
                                    <DataListCell key='secondary content'>
                                        <Title headingLevel="h6">{fleetData[0].issue}</Title>
                                    </DataListCell>,
                                    <DataListCell key='secondary content 2'>
                                        <Title headingLevel="h6">Impacted Systems</Title>
                                        <ul>
                                            <li>
                                                <p className='pf-v5-u-mb-md'
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[0].impacted_systems[0]}</p>
                                            </li>
                                            <li>
                                                <p
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[0].impacted_systems[1]}</p>
                                            </li>
                                        </ul>

                                    </DataListCell>
                                ]}
                            />

                        </DataListItemRow>
                        <DataListContent
                            aria-label='Second expandable content details'
                            id='ex-expand2'
                            isHidden={!expanded.includes('ex-toggle1')}
                        >

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Recommend Remediation</Title>
                            <p>{fleetData[0].recommended_remediation}</p>

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Technical Details</Title>
                            <p>{fleetData[0].issue_technical_details}</p>
                        </DataListContent>
                    </DataListItem>

                    <DataListItem
                        aria-labelledby='ex-item2'
                        isExpanded={expanded.includes('ex-toggle2')}
                    >
                        <DataListItemRow>
                            <DataListToggle
                                onClick={() => toggle('ex-toggle2')}
                                isExpanded={expanded.includes('ex-toggle2')}
                                id='ex-toggle2'
                                aria-controls='ex-expand2'
                            />
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell isIcon key='icon'>
                                        {/* <CodeBranchIcon /> */}
                                    </DataListCell>,
                                    <DataListCell key='secondary content'>
                                        <Title headingLevel="h6">{fleetData[1].issue}</Title>
                                    </DataListCell>,
                                    <DataListCell key='secondary content 2'>
                                        <Title headingLevel="h6">Impacted Systems</Title>
                                        <ul>
                                            <li>
                                                <p className='pf-v5-u-mb-md'
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[1].impacted_systems[0]}</p>
                                            </li>
                                            <li>
                                                <p
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[1].impacted_systems[1]}</p>
                                            </li>
                                        </ul>

                                    </DataListCell>
                                ]}
                            />

                        </DataListItemRow>
                        <DataListContent
                            aria-label='Second expandable content details'
                            id='ex-expand2'
                            isHidden={!expanded.includes('ex-toggle2')}
                        >

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Recommend Remediation</Title>
                            <p>{fleetData[1].recommended_remediation}</p>

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Technical Details</Title>
                            <p>{fleetData[1].issue_technical_details}</p>
                        </DataListContent>
                    </DataListItem>

                    <DataListItem
                        aria-labelledby='ex-item2'
                        isExpanded={expanded.includes('ex-toggle3')}
                    >
                        <DataListItemRow>
                            <DataListToggle
                                onClick={() => toggle('ex-toggle3')}
                                isExpanded={expanded.includes('ex-toggle3')}
                                id='ex-toggle3'
                                aria-controls='ex-expand2'
                            />
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell isIcon key='icon'>
                                        {/* <CodeBranchIcon /> */}
                                    </DataListCell>,
                                    <DataListCell key='secondary content'>
                                        <Title headingLevel="h6">{fleetData[2].issue}</Title>
                                    </DataListCell>,
                                    <DataListCell key='secondary content 2'>
                                        <Title headingLevel="h6">Impacted Systems</Title>
                                        <ul>
                                            <li>
                                                <p className='pf-v5-u-mb-md'
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[2].impacted_systems[0]}</p>
                                            </li>
                                            <li>
                                                <p
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[2].impacted_systems[1]}</p>
                                            </li>
                                        </ul>

                                    </DataListCell>
                                ]}
                            />

                        </DataListItemRow>
                        <DataListContent
                            aria-label='Second expandable content details'
                            id='ex-expand2'
                            isHidden={!expanded.includes('ex-toggle3')}
                        >

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Recommend Remediation</Title>
                            <p>{fleetData[2].recommended_remediation}</p>

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Technical Details</Title>
                            <p>{fleetData[2].issue_technical_details}</p>
                        </DataListContent>
                    </DataListItem>

                    <DataListItem
                        aria-labelledby='ex-item2'
                        isExpanded={expanded.includes('ex-toggle4')}
                    >
                        <DataListItemRow>
                            <DataListToggle
                                onClick={() => toggle('ex-toggle4')}
                                isExpanded={expanded.includes('ex-toggle4')}
                                id='ex-toggle4'
                                aria-controls='ex-expand2'
                            />
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell isIcon key='icon'>
                                        {/* <CodeBranchIcon /> */}
                                    </DataListCell>,
                                    <DataListCell key='secondary content'>
                                        <Title headingLevel="h6">{fleetData[3].issue}</Title>
                                    </DataListCell>,
                                    <DataListCell key='secondary content 2'>
                                        <Title headingLevel="h6">Impacted Systems</Title>
                                        <ul>
                                            <li>
                                                <p className='pf-v5-u-mb-md'
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[3].impacted_systems[0]}</p>
                                            </li>
                                            <li>
                                                <p
                                                    style={{ textDecorationLine: 'underline' }}> {fleetData[3].impacted_systems[1]}</p>
                                            </li>
                                        </ul>

                                    </DataListCell>
                                ]}
                            />

                        </DataListItemRow>
                        <DataListContent
                            aria-label='Second expandable content details'
                            id='ex-expand2'
                            isHidden={!expanded.includes('ex-toggle4')}
                        >

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Recommend Remediation</Title>
                            <p>{fleetData[3].recommended_remediation}</p>

                            <Title headingLevel="h6" style={{ textDecorationLine: 'underline' }}>Technical Details</Title>
                            <p>{fleetData[3].issue_technical_details}</p>
                        </DataListContent>
                    </DataListItem>
                </DataList>

            )}
        </React.Fragment>
    );
};

export default FleetAnalysis;

{
    /* <React.Fragment>
        {isLoading ? <Spinner/>
            : <DataList >
                {fleetData.map((item) => {
                    return <DataListItem key='test'>
                        <DataListItemRow>
                            <DataListToggle
                                onClick={() => toggle('ex-toggle1')}
                                isExpanded={expanded.includes('ex-toggle1')}
                                id="ex-toggle1" aria-controls="ex-expand1"
                            />
                            <DataListItemCells
                                dataListCells={[
                                    <DataListCell isIcon key="icon">
                                        {item.issue}
                                    </DataListCell>,
                                    <DataListCell key="primary content">
                                        <div id="ex-item1">Recommended Remediation</div>
                                        <span>{item.recommended_remediation}</span>
                                    </DataListCell>,
                                    <DataListCell key="secondary content">
                                        <div id="ex-item1">Impacted Systems</div>
                                        <Flex direction={'column'}>
                                            <FlexItem>Affected System : {item.impacted_systems[0]}</FlexItem>
                                            <FlexItem>Affected System : {item.impacted_systems[1]}</FlexItem>
                                        </Flex>

                                    </DataListCell>
                                ]}

                            />
                        </DataListItemRow>
                        <DataListContent aria-label="First expandable content details" id="ex-expand1" isHidden={!expanded.includes('ex-toggle1')}>
                            {item.issue_technical_details}
                        </DataListContent>
                    </DataListItem>;
                })}
            </DataList>}
    </React.Fragment>; */
}
