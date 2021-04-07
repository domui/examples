import { Text, Button, render } from '@domui/core';

const Counter = (count) => ({
  render: () => [Text(count)],
});

const Main = () => ({
  state: {
    count: 1,
  },
  render: (state) => [
    Text(state.count),
    Counter(state.count),
    Button('Increment', () => {
      state.count += 1;
    }),
  ],
});

render(Main());
