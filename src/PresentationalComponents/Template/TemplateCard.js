import './TemplateCard.scss';

import {
    Button,
    Card,
    CardActions,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Title
} from '@patternfly/react-core/dist/js/components/';

import { DownloadIcon } from '@patternfly/react-icons';
import DownloadReport from '../DownloadReport/DownloadReport';
import IconInline from '../IconInline/IconInline';
import React from 'react';
import propTypes from 'prop-types';

export const TemplateCard = ({ appName, children, ...props }) => (
    <Card className={ `ins-c-dashboard__card ins-c-dashboard__card--${appName}` } { ...props }>
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

export const TemplateCardActions = ({ children, downloadReport, iconInlineMessage, iconInlineState, ...props }) => (
    <CardActions { ...props }>
        { iconInlineMessage &&
            <IconInline message={ iconInlineMessage } state={ iconInlineState }/>
        }
        { downloadReport &&
            <DownloadReport />
        }
        {children}
    </CardActions>
);

TemplateCardActions.propTypes = {
    children: propTypes.any,
    downloadReport: propTypes.any,
    iconInlineMessage: propTypes.string,
    iconInlineState: propTypes.string
};

export const TemplateCardHeader = ({ title, onDownload, subtitle, children, ...props }) => (
    <CardHeader className='ins-c-dashboard__card--header'  { ...props }>
        <CardTitle>
            <Title headingLevel='h4' size='xl'>
                { title }
            </Title>
            { subtitle &&
                <div>
                    { subtitle }
                </div>
            }
        </CardTitle>
        <CardActions>
            { children }
            { onDownload &&
                <Button variant='link' icon={ <DownloadIcon/> } onClick={ onDownload }>Report</Button>
            }
        </CardActions>
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
    <CardBody className={ `ins-c-dashboard__card--body ${isHorizontalLayout ? ' ins-m-horizontal' : ''}` } { ...props }>
        { children }
    </CardBody>
);

TemplateCardBody.propTypes = {
    isHorizontalLayout: propTypes.any,
    children: propTypes.any
};

export const TemplateCardFooter = ({ children, ...props }) => (
    <CardFooter className='ins-c-dashboard__card--footer' { ...props }>
        { children }
    </CardFooter>
);

TemplateCardFooter.propTypes = {
    children: propTypes.any
};
