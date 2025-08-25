import './TemplateCard.scss';
import { DownloadIcon } from '@patternfly/react-icons';
import IconInline from '../IconInline/IconInline';
import React from 'react';
import propTypes from 'prop-types';
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Title } from '@patternfly/react-core';

export const TemplateCard = ({ appName, children, ...props }) => (
    <Card className={ `insd-c-dashboard__card insd-c-dashboard__card--${appName}` } { ...props }>
        { children }
    </Card>
);

TemplateCard.propTypes = {
    appName: propTypes.string,
    children: propTypes.any
};

export const TemplateCardHead = ({ children, ...props }) => (
    <CardHeader { ...props }>
        {children}
    </CardHeader>
);

TemplateCardHead.propTypes = {
    children: propTypes.any
};

export const TemplateCardActions = ({ children, iconInlineMessage, iconInlineState, ...props }) => (
    <div { ...props }>
        { iconInlineMessage &&
            <IconInline message={ iconInlineMessage } state={ iconInlineState }/>
        }
        {children}
    </div>
);

TemplateCardActions.propTypes = {
    children: propTypes.any,
    iconInlineMessage: propTypes.string,
    iconInlineState: propTypes.string
};

export const TemplateCardHeader = ({ title, onDownload, subtitle, children, ...props }) => (
    <CardHeader className='insd-c-dashboard__card--header'  { ...props }>
        <CardTitle>
            <Title headingLevel='h4' size='lg'>
                { title }
            </Title>
            { subtitle &&
                <div>
                    { subtitle }
                </div>
            }
        </CardTitle>
        { children }
        { onDownload &&
                <Button variant='link' icon={ <DownloadIcon/> } onClick={ onDownload }>Report</Button>
        }
    </CardHeader>
);

TemplateCardHeader.propTypes = {
    title: propTypes.string,
    titleClassName: propTypes.string,
    subtitle: propTypes.any,
    children: propTypes.any,
    onDownload: propTypes.func
};

export const TemplateCardBody = ({ children, isHorizontalLayout, ...props }) => (
    <CardBody className={ `insd-c-dashboard__card--body ${isHorizontalLayout ? ' insd-m-horizontal' : ''}` } { ...props }>
        { children }
    </CardBody>
);

TemplateCardBody.propTypes = {
    isHorizontalLayout: propTypes.any,
    children: propTypes.any
};

export const TemplateCardFooter = ({ children, ...props }) => (
    <CardFooter className='insd-c-dashboard__card--footer' { ...props }>
        { children }
    </CardFooter>
);

TemplateCardFooter.propTypes = {
    children: propTypes.any
};
