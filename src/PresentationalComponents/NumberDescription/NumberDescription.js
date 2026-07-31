import '../../PresentationalComponents/NumberDescription/NumberDescription.scss';

import {
  Flex,
  FlexItem,
} from '@patternfly/react-core/dist/esm/layouts/Flex/index';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import { NumberData } from '../../PresentationalComponents/NumberData/NumberData';
import React from 'react';
import propTypes from 'prop-types';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink/InsightsLink';

export const NumberDescription = ({
  data,
  dataSize,
  app,
  link,
  linkDescription,
}) => (
  <Flex
    direction={{ default: 'column' }}
    spaceItems={{ default: 'spaceItemsXs' }}
  >
    <FlexItem>
      <NumberData data={data} dataSize={dataSize} />
    </FlexItem>
    <FlexItem>
      <InsightsLink app={app} to={link}>
        <Button isInline variant="link">
          {linkDescription}
        </Button>
      </InsightsLink>
    </FlexItem>
  </Flex>
);

NumberDescription.propTypes = {
  data: propTypes.any,
  dataSize: propTypes.string,
  link: propTypes.any,
  linkDescription: propTypes.string,
  app: propTypes.string,
};
