import './trialsPage.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Modal, ModalVariant, TextContent } from '@patternfly/react-core/dist/esm/components';
import { Split, SplitItem } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import trialsMessages from './TrialsMessages';
import TrialsText from './TrialsText';
import { useIntl } from 'react-intl';

const TryItModal = ({ isModalOpened, setIsModalOpened }) => {
    const intl = useIntl();
    return (
        <Modal
            variant={ModalVariant.large}
            title={intl.formatMessage(trialsMessages.tryItModalTitle)}
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
        >
            <Split hasGutter>
                <SplitItem isFilled>
                    <TextContent>
                        <TrialsText
                            messages={[trialsMessages.tryItModalParagraphOne]}
                        />
                        <TrialsText
                            messages={[trialsMessages.tryItModalParagraphTwo]}
                        />
                        <TrialsText
                            messages={[trialsMessages.tryItModalParagraphThree]}
                        />
                        {/*<a
                            href='https://www.redhat.com/wapps/tnc/backend/viewterms/v1/ae14d5c4-332b-4e58-af22-3546a2274419.pdf'
                            style={{ marginBottom: '8px' }}
                        >
                            {intl.formatMessage(trialsMessages.tryItModalTermsAndConditions)} <ExternalLinkAltIcon />
                        </a>
                        <Button
                            component="a"
                            href="https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/satellite/console-trial"
                            variant="primary"
                            style={{ marginTop: '8px', marginBottom: '8px' }}
                        >
                            {intl.formatMessage(trialsMessages.startTrialModalButton)}
                        </Button>
                        <Link to='/satellite/try-it' style={{ marginTop: '8px' }}>{intl.formatMessage(trialsMessages.learnMoreLink)}</Link>*/}
                    </TextContent>
                </SplitItem>
                <SplitItem>
                    <div className='lg-c-trial__hero' />
                </SplitItem>
            </Split>
        </Modal>
    );
};

TryItModal.propTypes = {
    isModalOpened: PropTypes.bool,
    setIsModalOpened: PropTypes.func
};

export default TryItModal;
