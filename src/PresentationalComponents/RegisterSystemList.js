/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
import React from 'react';
import propTypes from 'prop-types';
import { ClipboardCopy } from '@patternfly/react-core';

const registerSystemsList = (item) => {
    //This is just a full length link
    return item.link ? (
        <React.Fragment>
            <a
                target="_blank"
                href={`${item.link}`}
                rel="noreferrer"
                className="pf-u-pl-lg"
            >
                {item.instructions}
            </a>
        </React.Fragment>
        //Some mocks require a number and then a link with certain padding
    ) : item.numberedLink ? (
        <div>
            {item.step}
            <a target="_blank" href={`${item.numberedLink}`} rel="noreferrer">
                {item.instructions}
            </a>
        </div>
    ) : item.plainText ? (
        <React.Fragment>
            <p className={item.plainText.length < 4 ? 'pf-u-pl-lg' : ''}>
                {item.plainText}
            </p>
        </React.Fragment>
        //A string with a link inline and within it
    ) : item.linkWithinText ? (
        <React.Fragment>
            <p className='pf-u-pl-md'>
                {item.partOne} <a href={item.linkWithinText}>{item.anchorText}</a> {item.partTwo}
            </p>
        </React.Fragment>
    ) : (
        //Plain text and then the clipboard component below
        <React.Fragment>
            <p className={(item.noPadding ? 'pf-u-pl-0' : `pf-u-pl-md`) + ' pf-u-mb-0 '}>{item.instructions}</p>
            <ClipboardCopy
                hoverTip="Copy"
                clickTip="Copied"
                isReadOnly
                className="pf-u-p-sm pf-u-pt-xs pf-u-pl-md"
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
