
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { translateDriftDropdownItems } from './utils';

import {
    Dropdown,
    DropdownToggle,
    DropdownItem
} from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export const DriftDropDown = ({ fetchDriftData, selectedFilter }) => {

    const intl = useIntl();
    const dropdownItems = useRef([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dropdownItems.current = translateDriftDropdownItems(intl);
    }, []);

    const onItemClick = (item, itemRef) => {
        fetchDriftData(item);
        setIsOpen((prevOpen) => !prevOpen);
        itemRef.focus();
    };

    return <Dropdown
        toggle={
            <DropdownToggle onToggle={setIsOpen} toggleIndicator={CaretDownIcon}>
                {selectedFilter.description}
            </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems.current.map((item, key) => (
            <DropdownItem
                key={key}
                ref={(el) => dropdownItems.current[key].el = el}
                onClick={() => onItemClick(item, dropdownItems.current[key].el)}>
                {item.description}
            </DropdownItem>
        ))}
    />;
};

DriftDropDown.propTypes = {
    fetchDriftData: PropTypes.func,
    selectedFilter: PropTypes.shape({
        description: PropTypes.string
    })
};
