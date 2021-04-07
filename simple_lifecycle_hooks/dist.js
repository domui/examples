// ../core/dist/domui.min.js
var properties = window.getComputedStyle(document.createElement("div"));
var commonModifiers = (cb) => {
  const props = {};
  Object.keys(properties).forEach((key) => {
    function styleSetter(prop) {
      return cb.call(this, prop, key);
    }
    props[key] = styleSetter;
  });
  return props;
};
var attachCommonModifiers = () => {
  function callback(value, prop) {
    this.element.style[prop] = value;
    return this;
  }
  return commonModifiers(callback);
};
var common_default = attachCommonModifiers;
var Text = (text) => ({
  text,
  tag: "span",
  ...common_default(),
  render(nodes) {
    const content = text.value !== void 0 ? text.value : text;
    const textNode = document.createTextNode(content);
    this.element.appendChild(textNode);
    if (text.name) {
      if (nodes[text.name] && nodes[text.name].length) {
        nodes[text.name].push(textNode);
      } else {
        nodes[text.name] = [textNode];
      }
    }
    return this.element;
  }
});
var Text_default = Text;
var Button = (label, action) => ({
  label,
  action,
  tag: "button",
  ...common_default(),
  render(nodes) {
    const textNode = document.createTextNode(label.value || label);
    this.element.appendChild(textNode);
    this.element.addEventListener("click", action);
    if (label.name) {
      if (nodes[label.name] && nodes[label.name].length) {
        nodes[label.name].push(textNode);
      } else {
        nodes[label.name] = [textNode];
      }
    }
    return this.element;
  }
});
var Button_default = Button;
var render = ({
  state: initialState = {},
  body,
  onAppear,
  onBeforeStateChange,
  onAfterStateChange
}) => {
  const nodes = {};
  let compiled = false;
  const state = Proxy.revocable(initialState, {
    get: (target, name) => {
      const value = target[name];
      return compiled ? value : {name, value};
    },
    set: (target, prop, value) => {
      let newValue = value;
      if (compiled) {
        newValue = onBeforeStateChange?.(prop, target[prop], value) || newValue;
        if (Array.isArray(newValue)) {
          const {element} = nodes[prop];
          element.innerHTML = null;
          newValue.map((item) => nodes[prop].callback(item).map((sv) => element.appendChild(sv.render())));
        } else {
          nodes[prop].forEach((elem) => {
            elem.textContent = newValue;
          });
        }
        onAfterStateChange?.(prop, newValue);
      }
      return Reflect.set(target, prop, newValue);
    }
  });
  const component2 = body(state.proxy);
  component2.map((elem) => {
    elem.element = document.createElement(elem.tag);
    return document.body.appendChild(elem.render(nodes));
  });
  compiled = true;
  onAppear?.(state.proxy);
};

// simple_lifecycle_hooks/index.js
var component = {
  state: {
    value: 0
  },
  onBeforeStateChange() {
    return -1;
  },
  body: (state) => [
    Text_default(state.value),
    Button_default("Increment", () => {
      state.value += 1;
    })
  ]
};
render(component);
