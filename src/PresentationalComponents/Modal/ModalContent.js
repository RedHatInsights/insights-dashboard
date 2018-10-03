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
        notEntitled: <p className ={ modalClasses } { ...props }> Would you like to activate an evaluation? </p>,
        notSetUp: <p className ={ modalClasses } { ...props }> Would you like to set up {capitalize(app)}? </p>
    } [variant];
};

export default ModalContent;

ModalContent.propTypes = {
    app: propTypes.string,
    variant: propTypes.string,
    className: propTypes.string
};
