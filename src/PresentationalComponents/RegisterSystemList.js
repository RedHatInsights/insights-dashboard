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
                rel="noreferrer"
                className='pf-u-pl-lg'
            >
                {item.instructions}
            </a>
        </React.Fragment> :
        item.numberedLink ?
            <div>
                {item.step}
                <a
                    target='_blank'
                    href={`${item.numberedLink}`}
                    rel="noreferrer">
                    {item.instructions}
                </a>
            </div>
            :
            item.plainText ?
                <React.Fragment>
                    <p className={ item.plainText.length < 4 ? 'pf-u-pl-lg' : ''}>{item.plainText}</p>
                </React.Fragment> :
                <React.Fragment>
                    <p className='pf-u-mb-0 pf-u-pl-md'>{item.instructions}</p>
                    <ClipboardCopy
                        hoverTip="Copy"
                        clickTip="Copied"
                        isReadOnly
                        className='pf-u-p-sm pf-u-pt-xs pf-u-pl-md'
                    >
                        {item.command}
                    </ClipboardCopy>
                </React.Fragment>;
};

export default registerSystemsList;

registerSystemsList.propTypes = {
    item: propTypes.object
};
