import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import asyncComponent from '../../Utilities/asyncComponent';
import './sample-page.scss';

import { Button } from '@patternfly/react-core';
import { Title } from '@patternfly/react-core';

const SampleComponent = asyncComponent(() => import('../../PresentationalComponents/SampleComponent/sample-component'));

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
class SamplePage extends Component {

    render() {
        return (
            <React.Fragment>
                <section className="pf-l-page__main-section pf-m-light">
                    <div className="pf-c-content">
                        <Title size="xxl">Sample Insights App</Title>
                        <p>
                            Body text should be Overpass Regular at 16px. It should have leading
                            of 24px because of it’s relative line height of 1.5.
                        </p>
                    </div>
                </section>
                <section className="pf-l-page__main-section">
                    <h1> Sample Component </h1>
                    <SampleComponent> Sample Component </SampleComponent>
                    <h1> Cards </h1>
                    <h1> Buttons </h1>
                    <Button variant='primary'> PF-Next Primary Button </Button>
                    <Button variant='secondary'> PF-Next Secondary Button </Button>
                    <Button variant='tertiary'> PF-Next Tertiary Button </Button>
                    <Button variant='danger'> PF-Next Danger Button </Button>
                </section>
            </React.Fragment>
        );
    }
}

export default withRouter(SamplePage);
