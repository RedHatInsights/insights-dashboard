import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

const IconListItem = ({ className, iconListItemStyle, children }) => {
    const IconListItemClasses = classNames(className, 'insd-c-icon-list__item');

    return <li className={ IconListItemClasses } style={ iconListItemStyle }>
        {children}
    </li>;
};

export default IconListItem;

IconListItem.propTypes = {
    className: propTypes.string,
    iconListItemStyle: propTypes.string,
    children: propTypes.any.isRequired
};
