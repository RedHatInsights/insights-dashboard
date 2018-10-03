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

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return {
        notEntitled: <p className ={ modalClasses } { ...props }> {capitalize(app)} is not entitled. Would you like to activate? </p>,
        notSetUp: <p className ={ modalClasses } { ...props }> {capitalize(app)} has not been set up. Would you like to finish setup? </p>
    } [variant];
};

export default ModalContent;

ModalContent.propTypes = {
    app: propTypes.string,
    variant: propTypes.string,
    className: propTypes.string
};
