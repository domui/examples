(() => {
  // node_modules/@domui/core/dist/domui.min.js
  var h = window.getComputedStyle(document.createElement("div"));
  var y = (e) => {
    let t = {};
    return Object.keys(h).forEach((n) => {
      function m(s) {
        return e.call(this, s, n);
      }
      t[n] = m;
    }), t;
  };
  var x = () => {
    function e(t, n) {
      return this.element.style[n] = t, this;
    }
    return y(e);
  };
  var o = x;
  var C = (e) => ({type: "text", text: e, ...o(), element: document.createElement("span"), render(t) {
    let n = e.value !== void 0 ? e.value : e, m = document.createTextNode(n);
    return this.element.appendChild(m), e.name && (t[e.name] && t[e.name].length ? t[e.name].push(m) : t[e.name] = [m]), this.element;
  }});
  var E = C;
  var Y = ({state: e = {}, body: t, onAppear: n, onStateChange: m}) => {
    let s = {}, c = false, d = Proxy.revocable(e, {get: (a, r) => c ? a[r] : {name: r, value: a[r]}, set: (a, r, u) => {
      let i = u;
      if (c) {
        if (m && (i = m(r, a[r], u)), Array.isArray(i)) {
          let {element: l} = s[r];
          l.innerHTML = null, i.map((f) => s[r].callback(f).map((p) => l.appendChild(p.render())));
        } else
          s[r].map((l) => (l.textContent = i, l));
        return Reflect.set(a, r, i);
      }
      return Reflect.set(a, r, i);
    }});
    t(d.proxy).map((a) => {
      if (a.type) {
        let r = a.render(s);
        return document.body.appendChild(r);
      }
      return null;
    }), c = true, n && n(d.proxy);
  };

  // simple/index.js
  var component = {
    body: () => [E("Hello World")]
  };
  Y(component);
})();
