// ../core/dist/domui.min.js
var properties = window.getComputedStyle(document.createElement("div"));
var attachCommonModifiers = () => Object.keys(properties).reduce((result, key) => {
  result[key] = function styleModifier() {
    this.className = key;
    return this;
  };
  return result;
}, {});
var common_default = attachCommonModifiers;
var Text = (...props) => ({
  props,
  ...common_default(),
  body([label]) {
    const element = document.createElement("span");
    element.appendChild(label);
    return element;
  }
});
var Text_default = Text;
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
        body.className = element.className;
        target.appendChild(body);
      } else {
        renderCycle(element.render(element.state ? createState(element.state) : {}));
      }
    });
  };
  renderCycle(schema.render(schema.state ? createState(schema.state) : {}));
  compiled = true;
};

// simple/index.js
var Main = () => ({
  render: () => [Text_default("Hello World").padding("14px")]
});
render(Main());
