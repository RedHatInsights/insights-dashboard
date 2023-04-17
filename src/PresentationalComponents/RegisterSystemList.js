/* eslint-disable react/jsx-key */
import React from 'react';
import propTypes from 'prop-types';
import { ClipboardCopy } from '@patternfly/react-core';

const registerSystemsList = (item) => {
    return (
        <React.Fragment>
            <p>{item.intructions}</p>
            <ClipboardCopy
                hoverTip="Copy"
                clickTip="Copied"
                variant="inline-compact"
                isCode
                className='pf-u-p-sm'
            >
                {item.command}
            </ClipboardCopy>
        </React.Fragment>
    );
};

export default registerSystemsList;

registerSystemsList.propTypes = {
    item: propTypes.object
};
