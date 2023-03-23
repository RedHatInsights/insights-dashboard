import './trialsPage.scss';

import PropTypes from 'prop-types';
import { Text } from '@patternfly/react-core';

import React from 'react';
import { useIntl } from 'react-intl';

const TrialsText = ({ messages, component, style }) => {
    const intl = useIntl();
    return (
        messages.map((message) => {
            return (
                message.message
                    ? <Text key={message.id} component={component} style={style}>
                        {intl.formatMessage(message.message, message.value)}
                    </Text>
                    : <Text key={message.id} component={component} style={style}>
                        {intl.formatMessage(message)}
                    </Text>
            );
        })
    );
};

TrialsText.propTypes = {
    messages: PropTypes.object,
    component: PropTypes.element,
    style: PropTypes.object
};

export default TrialsText;
