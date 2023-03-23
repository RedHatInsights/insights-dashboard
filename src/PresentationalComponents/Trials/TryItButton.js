import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Button } from '@patternfly/react-core/dist/esm/components';

const TryItButton = ({ setIsModalOpened }) => {
    return (
        <Button variant="secondary" onClick={() => setIsModalOpened(true)}>
            Remediate <Badge>Try it</Badge>
        </Button>
    );
};

TryItButton.propTypes = {
    setIsModalOpened: PropTypes.func
};

export default TryItButton;
