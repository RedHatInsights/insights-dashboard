import React, { useEffect, useRef, useState } from 'react';
import AppSection from './AppSection';
import ZeroStateBanner from './ZeroStateBanner';
import ZeroStateFooter from './ZeroStateFooter';
import propTypes from 'prop-types';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';

//current stand in as we migrate away from the old version
const AppZeroState = ({ children, ...props }) => {
    return (children ? <NewAppZeroState {...props}>{children}</NewAppZeroState> : <OldAppZeroState {...props} />);
};

const standardApiReq = '/api/inventory/v1/hosts?page=1&per_page=1';

const NewAppZeroState = ({
    app,
    customInstructions,
    customButton,
    customText,
    customTitle,
    appId,
    children,
    customFetchResults
}) => {
    const axios = useAxiosWithPlatformInterceptors();
    const [hasSystems, setHasSystems] = useState(true);
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        const fetchData =  async () => {
            //if you pass custom fetch, dont use standard at all
            try {
                if (customFetchResults !== undefined) {
                    mounted.current && setHasSystems(customFetchResults);
                } else {
                    axios.get(`${standardApiReq}`)
                    .then(({ data }) => {
                        mounted.current && setHasSystems(data.total > 0);
                    });
                }
            } catch (e) {
                /*eslint-disable no-console*/
                console.log(e);
                /*eslint-enable no-console*/
            }};

        fetchData();
        return () => {
            mounted.current = false;
        };
    }, [axios, customFetchResults, hasSystems]);

    return (
        //If hasSystems is true, render routes
        hasSystems ? children :
            <IntlProvider>
                <React.Fragment>
                    <ZeroStateBanner
                        appName={app}
                        customInstructions={customInstructions}
                        customButton={customButton}
                        customText={customText}
                        customTitle={customTitle}
                        appId={appId}
                    />
                    <AppSection appName={app}/>
                    <ZeroStateFooter appName={app} />
                </React.Fragment>
            </IntlProvider>
    );
};

//We will slowly migrate away from this
const OldAppZeroState = ({
    app,
    customInstructions,
    customButton,
    customText,
    customTitle,
    appId
}) => {
    return (
        <IntlProvider>
            <React.Fragment>
                <ZeroStateBanner
                    appName={app}
                    customInstructions={customInstructions}
                    customButton={customButton}
                    customText={customText}
                    customTitle={customTitle}
                    appId={appId}
                />
                <AppSection appName={app}/>
                <ZeroStateFooter appName={app} />
            </React.Fragment>
        </IntlProvider>
    );
};

export default AppZeroState;

OldAppZeroState.propTypes = {
    app: propTypes.string,
    customInstructions: propTypes.any,
    customButton: propTypes.any,
    customText: propTypes.string,
    customTitle: propTypes.string,
    appId: propTypes.string,
    children: propTypes.any,
    fetchSystem: propTypes.bool
};

NewAppZeroState.propTypes = {
    app: propTypes.string,
    customInstructions: propTypes.any,
    customButton: propTypes.any,
    customText: propTypes.string,
    customTitle: propTypes.string,
    appId: propTypes.string,
    children: propTypes.any,
    customFetchResults: propTypes.bool
};
AppZeroState.propTypes = {
    children: propTypes.any,
    app: propTypes.oneOf([
        'Advisor',
        'Compliance',
        'Drift',
        'Insights',
        'Content_management',
        'Policies',
        'Malware',
        'Resource_optimization',
        'Vulnerability',
        'Images',
        'Remediations',
        'Inventory',
        'Tasks'])
};
