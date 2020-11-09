import React, { Component } from 'react';

import classNames from 'classnames';
import propTypes from 'prop-types';

class IconListItem extends Component {

    render () {
        const IconListItemClasses = classNames(
            this.props.className,
            'ins-c-icon-list__item'
        );

        return (
            <li
                className={ IconListItemClasses }
                style={ this.props.iconListItemStyle }>
                { this.props.children }
            </li>
        );
    }
}

export default IconListItem;

IconListItem.propTypes = {
    className: propTypes.string,
    iconListItemStyle: propTypes.string,
    children: propTypes.any.isRequired
};
