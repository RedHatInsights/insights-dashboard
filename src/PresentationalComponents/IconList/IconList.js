import React, { Component } from 'react';
import './_icon-list.scss';

import classNames from 'classnames';
import propTypes from 'prop-types';

class IconList extends Component {

    render () {
        const IconListClasses = classNames(
            this.props.className,
            'ins-c-icon-list'
        );

        return (
            <ul
                className={ IconListClasses }
                style={ this.props.iconListStyle }>
                { this.props.children }
            </ul>
        );
    }
}

export default IconList;

IconList.propTypes = {
    children: propTypes.any.isRequired,
    iconListStyle: propTypes.string,
    className: propTypes.string
};
