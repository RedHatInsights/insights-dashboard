import React, { useEffect, useRef, useState } from 'react';
import AppSection from './AppSection';
import ZeroStateBanner from './ZeroStateBanner';
import ZeroStateFooter from './ZeroStateFooter';
import propTypes from 'prop-types';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import zeroStateAppList from './zeroStateConstants';

const standardApiReq = '/api/inventory/v1/hosts?page=1&per_page=1';

const AppZeroState = ({
    app,
    customInstructions,
    customButton,
    customText,
    customTitle,
    appId,
    children,
    customFetchResults,
    customSection
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
    }, [axios, children, customFetchResults, hasSystems]);

    //If there are children, act as a wrapper, otherwise a component
    return (
        <IntlProvider>
            {(children && hasSystems) ? (

                children
            ) : (
                <>
                    <ZeroStateBanner
                        appName={app}
                        customInstructions={customInstructions}
                        customButton={customButton}
                        customText={customText}
                        customTitle={customTitle}
                        appId={appId}
                    />
                    {customSection && customSection}
                    <AppSection appName={app} />
                    <ZeroStateFooter appName={app} />
                </>
            )}
        </IntlProvider>
    );
};

export default AppZeroState;

const appNames = Object.keys(zeroStateAppList).map(key => key.split('_')[0]);

AppZeroState.propTypes = {
    children: propTypes.any,
    customInstructions: propTypes.any,
    customButton: propTypes.any,
    customText: propTypes.string,
    customTitle: propTypes.string,
    appId: propTypes.string,
    customFetchResults: propTypes.bool,
    customSection: propTypes.node,
    app: propTypes.oneOf(appNames)
};
