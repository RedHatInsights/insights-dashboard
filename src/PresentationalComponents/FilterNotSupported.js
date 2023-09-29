import './FilterNotSupported.scss';

import {
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon
} from '@patternfly/react-core/dist/esm/components/EmptyState';

import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { Title } from '@patternfly/react-core/dist/esm/components/Title/Title';
import messages from '../Messages';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const FilterNotSupported = ({ href, title, appName }) => {
    const intl = useIntl();

    return <EmptyState>
        <EmptyStateIcon className='fontSizeOverride' icon={ SearchIcon } />
        <Title headingLevel="h4" size="md">{title}</Title>
        <EmptyStateBody>
            {intl.formatMessage(appName !== 'Vulnerability' ? messages.functionalityNotSupported : messages.filteredResultsInApp, {
                appname: <Link to={href} className='pf-c-button pf-m-link pf-m-inline'>
                    {appName}
                </Link>
            })}
        </EmptyStateBody>
    </EmptyState>;
};

FilterNotSupported.propTypes = {
    appName: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string
};

export default FilterNotSupported;

