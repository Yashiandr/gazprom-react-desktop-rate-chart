import React from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Rate } from './components/Rate/Rate';

function App() {
  return (
  <Theme preset={presetGpnDefault}>
    <Rate />
  </Theme>
  );
}

export default App;
