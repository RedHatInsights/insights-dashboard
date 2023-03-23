import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalVariant } from '@patternfly/react-core/dist/esm/components';
import SystemsTable from '../../SmartComponents/SystemsTable/SystemsTable';

const SystemsModal = ({ activeEmptyState, isModalOpened, setIsModalOpened, defaultActiveFilters, modalTitle, modalDescription }) => {
    return (
        <Modal
            variant={ModalVariant.medium}
            style={{ maxHeight: '1000px' }}
            title={modalTitle}
            isOpen={isModalOpened}
            onClose={() => setIsModalOpened(false)}
            description={modalDescription}
        >
            <SystemsTable activeEmptyState={activeEmptyState} defaultActiveFilters={defaultActiveFilters} />
        </Modal>
    );
};

SystemsModal.propTypes = {
    activeEmptyState: PropTypes.node,
    defaultActiveFilters: PropTypes.array,
    isModalOpened: PropTypes.bool,
    modalDescription: PropTypes.any,
    modalTitle: PropTypes.any,
    setIsModalOpened: PropTypes.func
};

export default SystemsModal;
