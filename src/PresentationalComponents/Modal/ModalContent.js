import React from 'react';
import { capitalize } from '../../Utilities/Common/';
import classNames from 'classnames';
import propTypes from 'prop-types';

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

    return {
        notEntitled: <p className ={ modalClasses } { ...props }> Would you like to activate an evaluation? </p>,
        notSetUp: <p className ={ modalClasses } { ...props }> Would you like to set up { capitalize(app) }? </p>
    } [variant];
};

export default ModalContent;

ModalContent.propTypes = {
    app: propTypes.string,
    variant: propTypes.string,
    className: propTypes.string
};
