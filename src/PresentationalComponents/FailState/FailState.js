import React from 'react';
import PropTypes from 'prop-types';

import { Bullseye } from '@patternfly/react-core/dist/js/layouts/Bullseye/Bullseye';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import {
    EmptyState,
    EmptyStateVariant
} from '@patternfly/react-core/dist/js/components/EmptyState';

import { useIntl } from 'react-intl';
import messages from '../../Messages';

const FailState = ({ appName }) => {

    const intl = useIntl();

    return (
        <Bullseye>
            <EmptyState variant={ EmptyStateVariant.full } className='ins-c-dashboard__error-state'>
                <Title headingLevel="h2" size="md"> {intl.formatMessage(messages.errorStateTitle, { appName })} </Title>
            </EmptyState>
        </Bullseye>
    );
};

FailState.propTypes = {
    appName: PropTypes.string.isRequired
};

export default FailState;
