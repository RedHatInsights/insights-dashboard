import './FilterNotSupported.scss';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import messages from '../Messages';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { EmptyState, EmptyStateBody  } from '@patternfly/react-core';

const FilterNotSupported = ({ href, title, appName }) => {
    const intl = useIntl();

    return <EmptyState  headingLevel="h4" icon={ SearchIcon }  titleText={<>{title}</>}>
        <EmptyStateBody>
            {intl.formatMessage(appName !== 'Vulnerability' ? messages.functionalityNotSupported : messages.filteredResultsInApp, {
                appname: <Link to={href} className='pf-v6-c-button pf-m-link pf-m-inline'>
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

