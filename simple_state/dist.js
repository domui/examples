// ../core/dist/domui.min.js
var Text = (...props) => ({
  props,
  body([label]) {
    const element = document.createElement("span");
    return element.appendChild(label);
  }
});
var Text_default = Text;
var Button = (...props) => ({
  props,
  body([label, action]) {
    const element = document.createElement("button");
    element.innerText = label.textContent;
    element.addEventListener("click", action);
    return element;
  }
});
var Button_default = Button;
var render = (schema, target = document.body) => {
  const nodes = {};
  let compiled = false;
  const createState = (initialState) => Proxy.revocable(initialState, {
    get: (store, name) => {
      const value = store[name].value || store[name];
      return compiled ? value : {name, value};
    },
    set: (store, prop, value) => {
      if (compiled) {
        nodes[prop].forEach((elem) => {
          elem.textContent = value;
        });
      }
      return Reflect.set(store, prop, value);
    }
  }).proxy;
  const mapProps = (props) => props.map((prop) => {
    if (typeof prop === "function") {
      return prop;
    }
    if (prop.value !== void 0) {
      const textNode = document.createTextNode(prop.value);
      if (nodes[prop.name]?.length) {
        nodes[prop.name].push(textNode);
      } else {
        nodes[prop.name] = [textNode];
      }
      return textNode;
    }
    return document.createTextNode(prop);
  });
  const renderCycle = (internalSchema) => {
    internalSchema.forEach((element) => {
      if (element.body) {
        const body = element.body(mapProps(element.props));
        target.appendChild(body);
      } else {
        renderCycle(element.render(element.state ? createState(element.state) : {}));
      }
    });
  };
  renderCycle(schema.render(createState(schema.state)));
  compiled = true;
};

// simple_state/index.js
var Counter = (count) => ({
  render: () => [Text_default(count)]
});
var Main = () => ({
  state: {
    count: 1
  },
  render: (state) => [
    Text_default(state.count),
    Counter(state.count),
    Button_default("Increment", () => {
      state.count += 1;
    })
  ]
});
render(Main());
