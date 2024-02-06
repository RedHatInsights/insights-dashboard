
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { translateDriftDropdownItems } from './utils';

import { CaretDownIcon } from '@patternfly/react-icons';
import {
    Dropdown,
    DropdownItem,
    DropdownToggle
} from '@patternfly/react-core';

const DriftDropDown = ({ fetchDriftData, selectedFilter }) => {

    const intl = useIntl();
    const dropdownItems = useRef([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dropdownItems.current = translateDriftDropdownItems(intl);
    }, [intl]);

    const onItemClick = (item, itemRef) => {
        fetchDriftData(item);
        setIsOpen((prevOpen) => !prevOpen);
        itemRef.focus();
    };

    return <Dropdown
        toggle={
            <DropdownToggle onToggle={(_event, val) => setIsOpen(val)} toggleIndicator={CaretDownIcon}>
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

export default DriftDropDown;
