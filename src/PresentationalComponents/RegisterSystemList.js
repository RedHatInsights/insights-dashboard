/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React from 'react';
import propTypes from 'prop-types';
import { ClipboardCopy } from '@patternfly/react-core';

const registerSystemsList = (item) => {
    return item.link ?
        <React.Fragment>
            <a
                target='_blank'
                href={`${item.link}`}
                rel="noreferrer">
                {item.instructions}
            </a>
        </React.Fragment> :
        item.plainText ?
            <React.Fragment>
                <p>{item.plainText}</p>
            </React.Fragment> :
            <React.Fragment>
                <p>{item.instructions}</p>
                <ClipboardCopy
                    hoverTip="Copy"
                    clickTip="Copied"
                    isReadOnly
                    className='pf-u-p-sm'
                >
                    {item.command}
                </ClipboardCopy>
            </React.Fragment>;
};

export default registerSystemsList;

registerSystemsList.propTypes = {
    item: propTypes.object
};
