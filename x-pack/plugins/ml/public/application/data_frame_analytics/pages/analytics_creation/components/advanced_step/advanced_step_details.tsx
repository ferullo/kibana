/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FC } from 'react';
import React, { Fragment } from 'react';
import { i18n } from '@kbn/i18n';
import {
  EuiButtonEmpty,
  EuiDescriptionList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTitle,
} from '@elastic/eui';
import { ANALYSIS_CONFIG_TYPE } from '@kbn/ml-data-frame-analytics-utils';
import type { State } from '../../../analytics_management/hooks/use_create_analytics_form/state';
import { UNSET_CONFIG_ITEM } from '../../../analytics_management/hooks/use_create_analytics_form/state';
import { ANALYTICS_STEPS } from '../../page';

function getStringValue(value: number | undefined) {
  return typeof value === 'number' ? `${value}` : UNSET_CONFIG_ITEM;
}

export interface ListItems {
  title: string;
  description: string | JSX.Element;
}

export const AdvancedStepDetails: FC<{
  setCurrentStep: React.Dispatch<React.SetStateAction<ANALYTICS_STEPS>>;
  state: State;
}> = ({ setCurrentStep, state }) => {
  const { form, isJobCreated } = state;
  const {
    computeFeatureInfluence,
    dependentVariable,
    eta,
    featureBagFraction,
    featureInfluenceThreshold,
    gamma,
    jobType,
    lambda,
    method,
    maxNumThreads,
    maxTrees,
    modelMemoryLimit,
    nNeighbors,
    numTopClasses,
    numTopFeatureImportanceValues,
    outlierFraction,
    predictionFieldName,
    randomizeSeed,
    standardizationEnabled,
  } = form;

  const isRegOrClassJob =
    jobType === ANALYSIS_CONFIG_TYPE.REGRESSION || jobType === ANALYSIS_CONFIG_TYPE.CLASSIFICATION;

  const advancedFirstCol: ListItems[] = [];
  const advancedSecondCol: ListItems[] = [];
  const advancedThirdCol: ListItems[] = [];

  const hyperFirstCol: ListItems[] = [];
  const hyperSecondCol: ListItems[] = [];
  const hyperThirdCol: ListItems[] = [];

  if (jobType === ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION) {
    advancedFirstCol.push({
      title: i18n.translate(
        'xpack.ml.dataframe.analytics.create.configDetails.computeFeatureInfluence',
        {
          defaultMessage: 'Compute feature influence',
        }
      ),
      description: computeFeatureInfluence,
    });

    advancedSecondCol.push({
      title: i18n.translate(
        'xpack.ml.dataframe.analytics.create.configDetails.featureInfluenceThreshold',
        {
          defaultMessage: 'Feature influence threshold',
        }
      ),
      description: getStringValue(featureInfluenceThreshold),
    });

    advancedThirdCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.modelMemoryLimit', {
        defaultMessage: 'Model memory limit',
      }),
      description: `${modelMemoryLimit}`,
    });

    hyperFirstCol.push(
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.nNeighbors', {
          defaultMessage: 'N neighbors',
        }),
        description: getStringValue(nNeighbors),
      },
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.outlierFraction', {
          defaultMessage: 'Outlier fraction',
        }),
        description: getStringValue(outlierFraction),
      }
    );

    hyperSecondCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.method', {
        defaultMessage: 'Method',
      }),
      description: method !== undefined ? method : UNSET_CONFIG_ITEM,
    });

    hyperThirdCol.push({
      title: i18n.translate(
        'xpack.ml.dataframe.analytics.create.configDetails.standardizationEnabled',
        {
          defaultMessage: 'Standardization enabled',
        }
      ),
      description: `${standardizationEnabled}`,
    });
  }

  if (isRegOrClassJob) {
    advancedFirstCol.push({
      title: i18n.translate(
        'xpack.ml.dataframe.analytics.create.configDetails.numTopFeatureImportanceValues',
        {
          defaultMessage: 'Top feature importance values',
        }
      ),
      description: `${numTopFeatureImportanceValues}`,
    });

    hyperFirstCol.push(
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.lambdaFields', {
          defaultMessage: 'Lambda',
        }),
        description: getStringValue(lambda),
      },
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.eta', {
          defaultMessage: 'Eta',
        }),
        description: getStringValue(eta),
      }
    );

    advancedSecondCol.push(
      {
        title: i18n.translate(
          'xpack.ml.dataframe.analytics.create.configDetails.predictionFieldName',
          {
            defaultMessage: 'Prediction field name',
          }
        ),
        description: predictionFieldName ? predictionFieldName : `${dependentVariable}_prediction`,
      },
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.randomizedSeed', {
          defaultMessage: 'Randomized seed',
        }),
        description: getStringValue(randomizeSeed),
      }
    );

    hyperSecondCol.push(
      {
        title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.maxTreesFields', {
          defaultMessage: 'Max trees',
        }),
        description: getStringValue(maxTrees),
      },
      {
        title: i18n.translate(
          'xpack.ml.dataframe.analytics.create.configDetails.featureBagFraction',
          {
            defaultMessage: 'Feature bag fraction',
          }
        ),
        description: getStringValue(featureBagFraction),
      }
    );

    advancedThirdCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.modelMemoryLimit', {
        defaultMessage: 'Model memory limit',
      }),
      description: `${modelMemoryLimit}`,
    });

    hyperThirdCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.gamma', {
        defaultMessage: 'Gamma',
      }),
      description: getStringValue(gamma),
    });
  }

  if (jobType === ANALYSIS_CONFIG_TYPE.CLASSIFICATION) {
    advancedThirdCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.numTopClasses', {
        defaultMessage: 'Top classes',
      }),
      description:
        numTopClasses === -1
          ? i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.allClasses', {
              defaultMessage: 'All classes',
            })
          : getStringValue(numTopClasses),
    });
  }

  if (maxNumThreads !== undefined) {
    advancedFirstCol.push({
      title: i18n.translate('xpack.ml.dataframe.analytics.create.configDetails.maxNumThreads', {
        defaultMessage: 'Maximum number of threads',
      }),
      description: `${maxNumThreads}`,
    });
  }

  return (
    <Fragment>
      <EuiTitle size="xs">
        <h3>
          {i18n.translate('xpack.ml.dataframe.analytics.create.advancedConfigDetailsTitle', {
            defaultMessage: 'Advanced configuration',
          })}
        </h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGroup style={{ width: '70%' }} justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={advancedFirstCol} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={advancedSecondCol} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={advancedThirdCol} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiTitle size="xs">
        <h3>
          {i18n.translate('xpack.ml.dataframe.analytics.create.hyperParametersDetailsTitle', {
            defaultMessage: 'Hyperparameters',
          })}
        </h3>
      </EuiTitle>
      <EuiSpacer />
      <EuiFlexGroup style={{ width: '70%' }} justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={hyperFirstCol} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={hyperSecondCol} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiDescriptionList compressed listItems={hyperThirdCol} />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      {!isJobCreated && (
        <EuiButtonEmpty
          iconType="pencil"
          size="s"
          onClick={() => {
            setCurrentStep(ANALYTICS_STEPS.ADVANCED);
          }}
        >
          {i18n.translate('xpack.ml.dataframe.analytics.create.advancedDetails.editButtonText', {
            defaultMessage: 'Edit',
          })}
        </EuiButtonEmpty>
      )}
    </Fragment>
  );
};
