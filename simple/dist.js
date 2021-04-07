// node_modules/@domui/core/dist/domui.min.js
var m = window.getComputedStyle(document.createElement("div"));
var x = () => Object.keys(m).reduce((n, r) => (n[r] = function(o) {
  return this.element.style[r] = o, this;
}, n), {});
var i = x;
var y = (...n) => ({props: n, element: document.createElement("span"), ...i(), body([r]) {
  return this.element.appendChild(r), this.element;
}});
var h = y;
var N = (n, r = document.body) => {
  let d = {}, o = false, a = (s) => Proxy.revocable(s, {get: (e, t) => {
    let c = e[t].value || e[t];
    return o ? c : {name: t, value: c};
  }, set: (e, t, c) => (o && d[t].forEach((f) => {
    f.textContent = c;
  }), Reflect.set(e, t, c))}).proxy, l = (s) => s.map((e) => {
    if (typeof e == "function")
      return e;
    if (e.value !== void 0) {
      let t = document.createTextNode(e.value);
      return d[e.name]?.length ? d[e.name].push(t) : d[e.name] = [t], t;
    }
    return document.createTextNode(e);
  }), u = (s) => {
    s.forEach((e) => {
      if (e.body) {
        let t = e.body(l(e.props));
        r.appendChild(t);
      } else
        u(e.render(e.state ? a(e.state) : {}));
    });
  };
  u(n.render(n.state ? a(n.state) : {})), o = true;
};

// simple/index.js
var Main = () => ({
  render: () => [h("Hello World").padding("14px")]
});
N(Main());
