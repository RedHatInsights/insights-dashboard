import React from 'react';
import AppSection from './AppSection';
import ZeroStateBanner from './ZeroStateBanner';
import ZeroStateFooter from './ZeroStateFooter';
import propTypes from 'prop-types';

const AppZeroState = ({ app }) => {
    return (
        <React.Fragment>
            <ZeroStateBanner appName={app} />
            <AppSection appName={app}/>
            <ZeroStateFooter appName={app} />
        </React.Fragment>
    );
};

export default AppZeroState;

AppZeroState.propTypes = {
    app: propTypes.string
};
