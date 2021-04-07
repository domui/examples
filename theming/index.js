import { Text, render } from '@domui/core';

const theme = {
  padding: {
    1: '4px',
    2: '8px',
  },
};

const Main = () => ({
  render: () => [Text('Hello World').padding('14px')],
});

render(Main());
