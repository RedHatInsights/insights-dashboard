import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Title } from '@patternfly/react-core';

import './_cards.scss';

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class VulnerabilitiesCard extends Component {

    render() {

        return (
            <Card className='pf-m-dark'>
                <CardHeader>
                    <Title className="pf-u-mt-0 pf-u-mb-0" size={'lg'}>Configuration Assessments</Title>
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>
        );
    }
}

export default VulnerabilitiesCard;
