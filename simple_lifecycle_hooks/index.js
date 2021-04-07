import { Text, Button, render } from "@domui/core";

const component = {
  state: {
    value: 0,
  },
  onBeforeStateChange() {
    return -1;
  },
  body: (state) => [
    Text(state.value),
    Button("Increment", () => {
      state.value += 1;
    }),
  ],
};

render(component);
