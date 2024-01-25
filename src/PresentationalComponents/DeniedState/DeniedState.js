import './DeniedState.scss';

import {
    EmptyState,
    EmptyStateBody,
    EmptyStateVariant
} from '@patternfly/react-core/dist/esm/components/EmptyState';

import { Card } from '@patternfly/react-core/dist/esm/components/Card/Card';
import PropTypes from 'prop-types';
import React from 'react';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/Title';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const DeniedState = ({ appName }) => {

    const intl = useIntl();

    return (
        <Card className='insd-c-dashboard__card'>
            <EmptyState variant={ EmptyStateVariant.full } className='insd-c-empty-state-denied'>
                <Title headingLevel="h2" size="md"> {intl.formatMessage(messages.deniedStateTitle, { appName })} </Title>
                <EmptyStateBody className='insd-c-empty-state-denied__body'>
                    {intl.formatMessage(messages.deniedStateBody)}
                </EmptyStateBody>
            </EmptyState>
        </Card>
    );
};

DeniedState.propTypes = {
    appName: PropTypes.string
};

export default DeniedState;
