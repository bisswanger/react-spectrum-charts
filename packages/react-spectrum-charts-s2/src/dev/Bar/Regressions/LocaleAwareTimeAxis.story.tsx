/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { ReactElement } from 'react';

import { StoryFn } from '@storybook/react';

import { Chart } from '../../../Chart.js';
import { Axis, Bar } from '../../../components/index.js';
import useChartProps from '../../../hooks/useChartProps.js';
import { bindWithProps } from '../../../test-utils/index.js';

const data = Array.from({ length: 8 }, (_, index) => ({
  datetime: Date.UTC(2026, 2, 26, index * 3),
  value: (index + 1) * 10,
}));

export default {
  title: 'React Spectrum Charts 2/Bar/Regressions/Locale Aware Time Axis',
  tags: ['alpha'],
  component: Bar,
  parameters: {
    regression: {
      description: 'Hourly time-axis labels should follow the 12-hour or 24-hour convention of the chart locale.',
    },
  },
};

const LocaleAwareTimeAxisStory: StoryFn<typeof Bar> = (args): ReactElement => {
  const chartProps = useChartProps({ data, width: 360, height: 216 });
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Chart {...chartProps} locale="en-US" title="en-US (12-hour)">
        <Axis position="left" grid />
        <Axis position="bottom" labelFormat="time" granularity="hour" baseline />
        <Bar {...args} />
      </Chart>
      <Chart {...chartProps} locale="de-DE" title="de-DE (24-hour)">
        <Axis position="left" grid />
        <Axis position="bottom" labelFormat="time" granularity="hour" baseline />
        <Bar {...args} />
      </Chart>
    </div>
  );
};

export const LocaleAwareTimeAxis = bindWithProps(LocaleAwareTimeAxisStory);
LocaleAwareTimeAxis.args = {
  dimension: 'datetime',
  dimensionDataType: 'time',
};
