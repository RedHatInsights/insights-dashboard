import React from 'react';

import { EmptyState, EmptyStateVariant } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyState';
import { EmptyStateIcon } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateIcon';
import { EmptyStateBody } from '@patternfly/react-core/dist/js/components/EmptyState/EmptyStateBody';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';
import { Bullseye } from '@patternfly/react-core/dist/js/layouts/Bullseye/Bullseye';

import WrenchIcon from '@patternfly/react-icons/dist/js/icons/wrench-icon';

export const RemediationsEmptyState = () => {
    return (
        <Bullseye>
            <EmptyState variant={ EmptyStateVariant.small }>
                <EmptyStateIcon icon={ WrenchIcon }/>
                <Title headingLevel="h6" size="md">
                    You haven&apos;t created any remediation Playbooks yet
                </Title>
                <EmptyStateBody>
                    Create an Ansible Playbook to remediate or mitigate vulnerabilities or configuration issues.
                </EmptyStateBody>
            </EmptyState>
        </Bullseye>
    );
};
