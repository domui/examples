import { Text, render } from '@domui/core';

const Main = () => ({
  render: () => [Text('Hello World').padding('14px')],
});

render(Main());
