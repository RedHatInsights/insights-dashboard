import './_icon-list.scss';

import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const IconList = ({ iconListStyle, className, children }) => {
    const IconListClasses = classNames(className, 'insd-c-icon-list');

    return <ul className={ IconListClasses } style={ iconListStyle }>
        {children}
    </ul>;
};

export default IconList;

IconList.propTypes = {
    children: propTypes.any.isRequired,
    iconListStyle: propTypes.string,
    className: propTypes.string
};
