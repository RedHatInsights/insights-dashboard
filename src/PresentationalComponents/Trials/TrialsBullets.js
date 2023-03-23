import './trialsPage.scss';

import PropTypes from 'prop-types';
import { TextList, TextListItem, TextListVariants } from '@patternfly/react-core';
import React from 'react';

const TrialsBullets = ({ isNumbered, messages, style }) => {
    return (
        <TextList component={isNumbered ? TextListVariants.ol : TextListVariants.ul}>
            {messages.map((message) => {
                return (
                    <TextListItem key={message.id} style={style}>
                        {message}
                    </TextListItem>
                );
            })}
        </TextList>
    );
};

TrialsBullets.propTypes = {
    isNumbered: PropTypes.bool,
    messages: PropTypes.object,
    style: PropTypes.object
};

export default TrialsBullets;
