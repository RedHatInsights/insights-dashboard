import React from 'react';
import AppSection from './AppSection';
import ZeroStateBanner from './ZeroStateBanner';
import ZeroStateFooter from './ZeroStateFooter';
import propTypes from 'prop-types';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';

const AppZeroState = ({ app, customInstructions, customButton, customText }) => {
    return (
        <IntlProvider>
            <React.Fragment>
                <ZeroStateBanner appName={app} customInstructions={customInstructions} customButton={customButton} customText={customText}/>
                <AppSection appName={app}/>
                <ZeroStateFooter appName={app} />
            </React.Fragment>
        </IntlProvider>
    );
};

export default AppZeroState;

AppZeroState.propTypes = {
    app: propTypes.string,
    customInstructions: propTypes.any,
    customButton: propTypes.any,
    customText: propTypes.string
};
