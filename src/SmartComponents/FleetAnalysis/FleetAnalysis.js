import { DataList,
    DataListAction,
    DataListCell,
    DataListContent,
    DataListItem,
    DataListItemCells,
    DataListItemRow,
    DataListToggle,
    Dropdown,
    DropdownItem,
    DropdownList,
    Flex,
    FlexItem,
    MenuToggle,
    Spinner
} from '@patternfly/react-core';
import { CodeBranchIcon, EllipsisVIcon } from '@patternfly/react-icons';
import React from 'react';
import { useGrabFleetData } from './helpers';
const FleetAnalysis = () => {

    const [
        isLoading,
        fleetData,
        error
    ] = useGrabFleetData();
    console.log(fleetData, 'fleetData here');

    const [isOpen1, setIsOpen1] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);
    const [expanded, setExpanded] = React.useState(['ex-toggle1', 'ex-toggle3']);

    const onToggle1 = () => {
        setIsOpen1(!isOpen1);
    };

    const onSelect1 = () => {
        setIsOpen1(!isOpen1);
    };

    const toggle = id => {
        const index = expanded.indexOf(id);
        const newExpanded = index >= 0 ? [...expanded.slice(0, index), ...expanded.slice(index + 1, expanded.length)] : [...expanded, id];
        setExpanded(newExpanded);
    };

    return <React.Fragment>
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
    </React.Fragment>;
};

export default FleetAnalysis;
{/* <DataListItem aria-labelledby="ex-item1" isExpanded={expanded.includes('ex-toggle1')}>
                    <DataListItemRow>
                        <DataListToggle
                            onClick={() => toggle('ex-toggle1')}
                            isExpanded={expanded.includes('ex-toggle1')}
                            id="ex-toggle1" aria-controls="ex-expand1" />
                        <DataListItemCells
                            dataListCells={[
                                <DataListCell isIcon key="icon">
                                    blablabla
                                </DataListCell>,
                                <DataListCell key="primary content">
                                    <div id="ex-item1">Primary content</div>
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                    <a href="#">link</a>
                                </DataListCell>,
                                <DataListCell key="secondary content">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </DataListCell>,
                                <DataListCell key="secondary content 2">
                                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                </DataListCell>]
                            }
                        />
                        {/* <DataListAction aria-labelledby="ex-item1 ex-action1" id="ex-action1" aria-label="Actions" isPlainButtonAction>
                            <Dropdown popperProps={{
                                position: 'right'
                            }} onSelect={onSelect1}
                            toggle={toggleRef => <MenuToggle ref={toggleRef} isExpanded={isOpen1}
                                onClick={onToggle1} variant="plain" aria-label="Data list exapndable example kebaby toggle 1">
                                <EllipsisVIcon aria-hidden="true" />
                            </MenuToggle>} isOpen={isOpen1} onOpenChange={isOpen => setIsOpen1(isOpen)}>
                                <DropdownList>
                                    <DropdownItem key="action">Action</DropdownItem>
                                    {{}}
                                    <DropdownItem key="link" to="#" onClick={event => event.preventDefault()}>
                      Link
                                    </DropdownItem>
                                    <DropdownItem key="disabled action" isDisabled>
                      Disabled Action
                                    </DropdownItem>
                                    <DropdownItem key="disabled link" isDisabled to="#" onClick={event => event.preventDefault()}>
                      Disabled Link
                                    </DropdownItem>
                                </DropdownList>
                            </Dropdown>
                        </DataListAction> */}
//     </DataListItemRow>
//     <DataListContent aria-label="First expandable content details" id="ex-expand1" isHidden={!expanded.includes('ex-toggle1')}>
//         <p>
//         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
//         dolore magna aliqua.
//         </p>
//     </DataListContent>
// </DataListItem> */}
