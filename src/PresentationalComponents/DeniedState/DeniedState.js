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
        <Card className='ins-c-dashboard__card'>
            <EmptyState variant={ EmptyStateVariant.full } className='ins-c-dashboard__denied-state'>
                <Title headingLevel="h2" size="md"> {intl.formatMessage(messages.deniedStateTitle, { appName })} </Title>
                <EmptyStateBody className='ins-c-dashboard__denied-state--body'>
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
