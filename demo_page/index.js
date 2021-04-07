import { Text, Button, render } from '@domui/core';

const Counter = (count) => ({
  render: () => [Text(count)],
});

const Main = () => ({
  state: {
    count: 1,
  },
  render: (state) => [
    Text(state.count)
      .padding('15px')
      .background('#ccc')
      .fontFamily('monospace'),

    Counter(state.count),

    Button('Increment', () => {
      state.count += 1;
    })
      .background('blue')
      .color('#fff')
      .border(0)
      .borderRadius('12px')
      .padding('12px'),
  ],
});

render(Main());
