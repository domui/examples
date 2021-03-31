import { Text, Button, render } from "@domui/core";

const component = {
  state: {
    value: 0,
  },
  body: (state) => [
    Text(state.value),
    Button("Increment", () => {
      state.value += 1;
    }),
  ],
};

render(component);
