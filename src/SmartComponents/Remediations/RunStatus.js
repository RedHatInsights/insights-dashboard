import './RunStatus.scss';

import { DateFormat } from '@redhat-cloud-services/frontend-components';
import React from 'react';

import { Icon, Tooltip } from '@patternfly/react-core';
import {
  RhUiCheckCircleFillIcon,
  RhUiErrorFillIcon,
  RhUiInProgressIcon,
  RhUiQuestionMarkCircleIcon,
} from '@patternfly/react-icons';
import PropTypes from 'prop-types';
import TimeStamp from './../../PresentationalComponents/TimeStamp/TimeStamp';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

// Normalize the status so we don't show all API statuses
const normalizeStatus = (status) =>
  ({
    running: 'running',
    pending: 'running',
    acked: 'running',
    failure: 'failure',
    canceled: 'failure',
    success: 'success',
  })[status];

const renderStatusIcon = (status) =>
  ({
    running: (
      <Icon status="custom" aria-label="Remediation in progress">
        <RhUiInProgressIcon />
      </Icon>
    ),
    success: (
      <Icon status="success" aria-label="Remediation passed">
        <RhUiCheckCircleFillIcon />
      </Icon>
    ),
    failure: (
      <Icon status="danger" aria-label="Remediation failed">
        <RhUiErrorFillIcon />
      </Icon>
    ),
  })[status];

const RunStatus = ({ id, name, index, playbook_runs: playbookRuns }) => {
  const hasData = playbookRuns ? playbookRuns.data?.length > 0 : false;
  const intl = useIntl();

  return (
    <div className="insd-c-remediations-container">
      <div className="insd-c-remediation__status">
        {hasData ? (
          <React.Fragment>
            {renderStatusIcon(normalizeStatus(playbookRuns.data[0].status))}
            <p className="insd-c-remediation__status-text">
              {intl.formatMessage(messages.remediationsPlaybookStatus, {
                status: normalizeStatus(playbookRuns.data[0].status),
              })}
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Icon>
              <RhUiQuestionMarkCircleIcon />
            </Icon>
            <p>{intl.formatMessage(messages.remediationsPlaybookNoActivity)}</p>
          </React.Fragment>
        )}
      </div>
      <div className="insd-c-remediation__timestamp">
        {name.length > 65 ? (
          <Tooltip content={name}>
            <InsightsLink
              app="remediations"
              to={`/${id}`}
              className="pf-v6-c-button pf-m-inline pf-m-link"
              id={`remediation-link-${index}`}
            >
              {name}
            </InsightsLink>
          </Tooltip>
        ) : (
          <InsightsLink
            app="remediations"
            to={`/${id}`}
            className="pf-v6-c-button pf-m-inline pf-m-link"
            id={`remediation-link-${index}`}
          >
            {name}
          </InsightsLink>
        )}
        {hasData ? (
          <TimeStamp
            timestamp={
              <DateFormat type="exact" date={playbookRuns.data[0].created_at} />
            }
          />
        ) : null}
      </div>
    </div>
  );
};

RunStatus.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  intl: PropTypes.any,
  index: PropTypes.any,
  playbook_runs: PropTypes.any,
};

export default RunStatus;
