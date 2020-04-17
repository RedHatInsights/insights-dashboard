import React from 'react';
import PropTypes from 'prop-types';

import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import {
    EmptyState,
    EmptyStateVariant,
    EmptyStateBody
} from '@patternfly/react-core/dist/js/components/EmptyState';

import { useIntl } from 'react-intl';
import messages from '../../Messages';

import './FailState.scss';

const FailState = ({ appName, isSmall }) => {

    const intl = useIntl();

    return (
        <EmptyState
            variant={ EmptyStateVariant.full }
            className={ `ins-c-dashboard__error-state ${ isSmall && 'ins-c-dashboard__error-state--isSmall' }` }>
            { isSmall
                ? <EmptyStateBody>{intl.formatMessage(messages.errorStateTitle, { appName })}</EmptyStateBody>
                : <Title headingLevel="h2" size="md"> {intl.formatMessage(messages.errorStateTitle, { appName })} </Title>
            }
        </EmptyState>
    );
};

FailState.propTypes = {
    appName: PropTypes.string.isRequired,
    isSmall: PropTypes.bool
};

export default FailState;
