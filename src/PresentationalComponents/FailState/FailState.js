import './FailState.scss';

import {
    EmptyState,
    EmptyStateBody,
    EmptyStateVariant
} from '@patternfly/react-core/dist/esm/components/EmptyState';

import PropTypes from 'prop-types';
import React from 'react';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/Title';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const FailState = ({ appName, isSmall }) => {

    const intl = useIntl();

    return (
        <EmptyState
            variant={ EmptyStateVariant.full }
            className={ `insd-c-dashboard__error-state ${ isSmall && 'insd-c-dashboard__error-state--isSmall' }` }>
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
