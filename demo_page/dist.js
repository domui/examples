// ../core/dist/domui.min.js
var properties = window.getComputedStyle(document.createElement("div"));
var attachCommonModifiers = () => Object.keys(properties).reduce((result, key) => {
  result[key] = function styleModifier(value) {
    this.element.style[key] = value;
    return this;
  };
  return result;
}, {});
var common_default = attachCommonModifiers;
var Text = (...props) => ({
  props,
  element: document.createElement("span"),
  ...common_default(),
  body([label]) {
    this.element.appendChild(label);
    return this.element;
  }
});
var Text_default = Text;
var Button = (...props) => ({
  props,
  element: document.createElement("button"),
  ...common_default(),
  body([label, action]) {
    this.element.appendChild(label);
    this.element.addEventListener("click", action);
    return this.element;
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
  renderCycle(schema.render(schema.state ? createState(schema.state) : {}));
  compiled = true;
};

// demo_page/index.js
var Counter = (count) => ({
  render: () => [Text_default(count)]
});
var Main = () => ({
  state: {
    count: 1
  },
  render: (state) => [
    Text_default(state.count).padding("15px").background("#ccc").fontFamily("monospace"),
    Counter(state.count),
    Button_default("Increment", () => {
      state.count += 1;
    }).background("blue").color("#fff").border(0).borderRadius("12px").padding("12px")
  ]
});
render(Main());
