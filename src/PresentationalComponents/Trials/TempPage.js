import React, { useState } from 'react';
import { Button, Card, PageSection } from '@patternfly/react-core/dist/esm/components';
import SystemsModal from './SystemsModal';
import TryItButton from './TryItButton';
import TryItModal from './TryItModal';

const TempPage = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isSystemModalOpened, setIsSystemModalOpened] = useState(false);
    return (
        <React.Fragment>
            <TryItModal isModalOpened={isModalOpened} setIsModalOpened={setIsModalOpened} />
            <SystemsModal isModalOpened={isSystemModalOpened} setIsModalOpened={setIsSystemModalOpened} />
            <PageSection>
                <Card>
                    <div>
                        <TryItButton setIsModalOpened={setIsModalOpened} />
                        <Button onClick={() => setIsSystemModalOpened(true)}>
                            Systems
                        </Button>
                    </div>
                </Card>
            </PageSection>
        </React.Fragment>
    );
};

export default TempPage;
