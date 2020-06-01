import './TemplateCard.scss';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { Card } from '@patternfly/react-core/dist/js/components/Card/Card';
import { CardActions } from '@patternfly/react-core/dist/js/components/Card/CardActions';
import { CardBody } from '@patternfly/react-core/dist/js/components/Card/CardBody';
import { CardFooter } from '@patternfly/react-core/dist/js/components/Card/CardFooter';
import { CardHeader } from '@patternfly/react-core/dist/js/components/Card/CardHeader';
import { DownloadIcon } from '@patternfly/react-icons';
import DownloadReport from '../../PresentationalComponents/DownloadReport/DownloadReport';
import IconInline from '../../PresentationalComponents/IconInline/IconInline';
import { Level } from '@patternfly/react-core/dist/js/layouts/Level/Level';
import { LevelItem } from '@patternfly/react-core/dist/js/layouts/Level/LevelItem';
import React from 'react';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
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
            <DownloadReport/>
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

export const TemplateCardHeader = ({ title, subtitle, onDownload, children, ...props }) => (
    <CardHeader className={ `ins-c-dashboard__card--header ${subtitle ? ' ins-m-padding-small ' : ''}` }  { ...props }>
        <Level>
            { title &&
                <LevelItem>
                    <Title headingLevel="h2" size="lg"> { title } </Title>
                </LevelItem>
            }
            { subtitle &&
                <LevelItem>
                    <h2 className="ins-c-dashboard__card--header-subtitle">{ subtitle }</h2>
                </LevelItem>
            }
            <LevelItem>
                { children }
                { onDownload &&
                    <Button variant='link' icon={ <DownloadIcon/> } onClick={ onDownload }>Report</Button>
                }
            </LevelItem>
        </Level>
    </CardHeader>
);

TemplateCardHeader.propTypes = {
    title: propTypes.string,
    subtitle: propTypes.string,
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
