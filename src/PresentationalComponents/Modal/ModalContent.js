import React from 'react';
import propTypes from 'prop-types';

import classNames from 'classnames';

/**
 * This is a dumb component that only recieves properties from a smart component.
 * Dumb components are usually functions and not classes.
 *
 * @param props the props given by the smart component.
 */

const ModalContent = ({ app, variant, className, ...props }) => {

    const modalClasses = classNames (
        'ins-c-modal__content',
        className
    );

    switch (variant) {
        // TODO: Expand these later with more information when provided
        case 'notEntitled':
            return (
                <p className ={ modalClasses } { ...props }> { app } is not entitled </p>
            );
        case 'notSetUp':
            return (
                <p className ={ modalClasses } { ...props }> { app } has not been set up </p>
            );
    }
};

export default ModalContent;

ModalContent.propTypes = {
    app: propTypes.string,
    variant: propTypes.string,
    className: propTypes.string
};
