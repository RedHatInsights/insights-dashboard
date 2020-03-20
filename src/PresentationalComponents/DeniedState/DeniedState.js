import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import {
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    EmptyStateBody
} from '@patternfly/react-core/dist/js/components/EmptyState';

import { LockIcon } from '@patternfly/react-icons';

import { injectIntl } from 'react-intl';
import messages from '../../Messages';

import './DeniedState.scss';

const DeniedState = ({ appName, intl }) => {
    return (
        <Card className='ins-c-dashboard__card'>
            <EmptyState variant={ EmptyStateVariant.full } className='ins-c-dashboard__denied-state'>
                <EmptyStateIcon icon={ LockIcon }/>
                <Title headingLevel="h2" size="md"> {intl.formatMessage(messages.deniedStateTitle, { appName })} </Title>
                <EmptyStateBody className='ins-c-dashboard__denied-state--body'>
                    {intl.formatMessage(messages.deniedStateBody)}
                </EmptyStateBody>
            </EmptyState>
        </Card>
    );
};

DeniedState.propTypes = {
    appName: PropTypes.string,
    intl: PropTypes.any
};

export default injectIntl(DeniedState);
