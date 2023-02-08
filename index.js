"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb2, mod) => function __require() {
    return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/preact/dist/preact.module.js
  function v(n3, l4) {
    for (var u4 in l4)
      n3[u4] = l4[u4];
    return n3;
  }
  function h(n3) {
    var l4 = n3.parentNode;
    l4 && l4.removeChild(n3);
  }
  function y(l4, u4, i4) {
    var t4, r4, o4, f4 = {};
    for (o4 in u4)
      "key" == o4 ? t4 = u4[o4] : "ref" == o4 ? r4 = u4[o4] : f4[o4] = u4[o4];
    if (arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), "function" == typeof l4 && null != l4.defaultProps)
      for (o4 in l4.defaultProps)
        void 0 === f4[o4] && (f4[o4] = l4.defaultProps[o4]);
    return p(l4, f4, t4, r4, null);
  }
  function p(n3, i4, t4, r4, o4) {
    var f4 = { type: n3, props: i4, key: t4, ref: r4, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o4 ? ++u : o4 };
    return null == o4 && null != l.vnode && l.vnode(f4), f4;
  }
  function d() {
    return { current: null };
  }
  function _(n3) {
    return n3.children;
  }
  function k(n3, l4, u4, i4, t4) {
    var r4;
    for (r4 in u4)
      "children" === r4 || "key" === r4 || r4 in l4 || m(n3, r4, null, u4[r4], i4);
    for (r4 in l4)
      t4 && "function" != typeof l4[r4] || "children" === r4 || "key" === r4 || "value" === r4 || "checked" === r4 || u4[r4] === l4[r4] || m(n3, r4, l4[r4], u4[r4], i4);
  }
  function b(n3, l4, u4) {
    "-" === l4[0] ? n3.setProperty(l4, null == u4 ? "" : u4) : n3[l4] = null == u4 ? "" : "number" != typeof u4 || a.test(l4) ? u4 : u4 + "px";
  }
  function m(n3, l4, u4, i4, t4) {
    var r4;
    n:
      if ("style" === l4)
        if ("string" == typeof u4)
          n3.style.cssText = u4;
        else {
          if ("string" == typeof i4 && (n3.style.cssText = i4 = ""), i4)
            for (l4 in i4)
              u4 && l4 in u4 || b(n3.style, l4, "");
          if (u4)
            for (l4 in u4)
              i4 && u4[l4] === i4[l4] || b(n3.style, l4, u4[l4]);
        }
      else if ("o" === l4[0] && "n" === l4[1])
        r4 = l4 !== (l4 = l4.replace(/Capture$/, "")), l4 = l4.toLowerCase() in n3 ? l4.toLowerCase().slice(2) : l4.slice(2), n3.l || (n3.l = {}), n3.l[l4 + r4] = u4, u4 ? i4 || n3.addEventListener(l4, r4 ? w : g, r4) : n3.removeEventListener(l4, r4 ? w : g, r4);
      else if ("dangerouslySetInnerHTML" !== l4) {
        if (t4)
          l4 = l4.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
        else if ("href" !== l4 && "list" !== l4 && "form" !== l4 && "tabIndex" !== l4 && "download" !== l4 && l4 in n3)
          try {
            n3[l4] = null == u4 ? "" : u4;
            break n;
          } catch (n4) {
          }
        "function" == typeof u4 || (null == u4 || false === u4 && -1 == l4.indexOf("-") ? n3.removeAttribute(l4) : n3.setAttribute(l4, u4));
      }
  }
  function g(n3) {
    t = true;
    try {
      return this.l[n3.type + false](l.event ? l.event(n3) : n3);
    } finally {
      t = false;
    }
  }
  function w(n3) {
    t = true;
    try {
      return this.l[n3.type + true](l.event ? l.event(n3) : n3);
    } finally {
      t = false;
    }
  }
  function x(n3, l4) {
    this.props = n3, this.context = l4;
  }
  function A(n3, l4) {
    if (null == l4)
      return n3.__ ? A(n3.__, n3.__.__k.indexOf(n3) + 1) : null;
    for (var u4; l4 < n3.__k.length; l4++)
      if (null != (u4 = n3.__k[l4]) && null != u4.__e)
        return u4.__e;
    return "function" == typeof n3.type ? A(n3) : null;
  }
  function P(n3) {
    var l4, u4;
    if (null != (n3 = n3.__) && null != n3.__c) {
      for (n3.__e = n3.__c.base = null, l4 = 0; l4 < n3.__k.length; l4++)
        if (null != (u4 = n3.__k[l4]) && null != u4.__e) {
          n3.__e = n3.__c.base = u4.__e;
          break;
        }
      return P(n3);
    }
  }
  function C(n3) {
    t ? setTimeout(n3) : f(n3);
  }
  function T(n3) {
    (!n3.__d && (n3.__d = true) && r.push(n3) && !$.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || C)($);
  }
  function $() {
    var n3, l4, u4, i4, t4, o4, f4, e4;
    for (r.sort(function(n4, l5) {
      return n4.__v.__b - l5.__v.__b;
    }); n3 = r.shift(); )
      n3.__d && (l4 = r.length, i4 = void 0, t4 = void 0, f4 = (o4 = (u4 = n3).__v).__e, (e4 = u4.__P) && (i4 = [], (t4 = v({}, o4)).__v = o4.__v + 1, M(e4, o4, t4, u4.__n, void 0 !== e4.ownerSVGElement, null != o4.__h ? [f4] : null, i4, null == f4 ? A(o4) : f4, o4.__h), N(i4, o4), o4.__e != f4 && P(o4)), r.length > l4 && r.sort(function(n4, l5) {
        return n4.__v.__b - l5.__v.__b;
      }));
    $.__r = 0;
  }
  function H(n3, l4, u4, i4, t4, r4, o4, f4, e4, a4) {
    var v3, h4, y4, d3, k4, b3, m3, g5 = i4 && i4.__k || s, w4 = g5.length;
    for (u4.__k = [], v3 = 0; v3 < l4.length; v3++)
      if (null != (d3 = u4.__k[v3] = null == (d3 = l4[v3]) || "boolean" == typeof d3 ? null : "string" == typeof d3 || "number" == typeof d3 || "bigint" == typeof d3 ? p(null, d3, null, null, d3) : Array.isArray(d3) ? p(_, { children: d3 }, null, null, null) : d3.__b > 0 ? p(d3.type, d3.props, d3.key, d3.ref ? d3.ref : null, d3.__v) : d3)) {
        if (d3.__ = u4, d3.__b = u4.__b + 1, null === (y4 = g5[v3]) || y4 && d3.key == y4.key && d3.type === y4.type)
          g5[v3] = void 0;
        else
          for (h4 = 0; h4 < w4; h4++) {
            if ((y4 = g5[h4]) && d3.key == y4.key && d3.type === y4.type) {
              g5[h4] = void 0;
              break;
            }
            y4 = null;
          }
        M(n3, d3, y4 = y4 || c, t4, r4, o4, f4, e4, a4), k4 = d3.__e, (h4 = d3.ref) && y4.ref != h4 && (m3 || (m3 = []), y4.ref && m3.push(y4.ref, null, d3), m3.push(h4, d3.__c || k4, d3)), null != k4 ? (null == b3 && (b3 = k4), "function" == typeof d3.type && d3.__k === y4.__k ? d3.__d = e4 = I(d3, e4, n3) : e4 = z(n3, d3, y4, g5, k4, e4), "function" == typeof u4.type && (u4.__d = e4)) : e4 && y4.__e == e4 && e4.parentNode != n3 && (e4 = A(y4));
      }
    for (u4.__e = b3, v3 = w4; v3--; )
      null != g5[v3] && ("function" == typeof u4.type && null != g5[v3].__e && g5[v3].__e == u4.__d && (u4.__d = L(i4).nextSibling), q(g5[v3], g5[v3]));
    if (m3)
      for (v3 = 0; v3 < m3.length; v3++)
        S(m3[v3], m3[++v3], m3[++v3]);
  }
  function I(n3, l4, u4) {
    for (var i4, t4 = n3.__k, r4 = 0; t4 && r4 < t4.length; r4++)
      (i4 = t4[r4]) && (i4.__ = n3, l4 = "function" == typeof i4.type ? I(i4, l4, u4) : z(u4, i4, i4, t4, i4.__e, l4));
    return l4;
  }
  function j(n3, l4) {
    return l4 = l4 || [], null == n3 || "boolean" == typeof n3 || (Array.isArray(n3) ? n3.some(function(n4) {
      j(n4, l4);
    }) : l4.push(n3)), l4;
  }
  function z(n3, l4, u4, i4, t4, r4) {
    var o4, f4, e4;
    if (void 0 !== l4.__d)
      o4 = l4.__d, l4.__d = void 0;
    else if (null == u4 || t4 != r4 || null == t4.parentNode)
      n:
        if (null == r4 || r4.parentNode !== n3)
          n3.appendChild(t4), o4 = null;
        else {
          for (f4 = r4, e4 = 0; (f4 = f4.nextSibling) && e4 < i4.length; e4 += 1)
            if (f4 == t4)
              break n;
          n3.insertBefore(t4, r4), o4 = r4;
        }
    return void 0 !== o4 ? o4 : t4.nextSibling;
  }
  function L(n3) {
    var l4, u4, i4;
    if (null == n3.type || "string" == typeof n3.type)
      return n3.__e;
    if (n3.__k) {
      for (l4 = n3.__k.length - 1; l4 >= 0; l4--)
        if ((u4 = n3.__k[l4]) && (i4 = L(u4)))
          return i4;
    }
    return null;
  }
  function M(n3, u4, i4, t4, r4, o4, f4, e4, c4) {
    var s4, a4, h4, y4, p3, d3, k4, b3, m3, g5, w4, A4, P4, C3, T4, $3 = u4.type;
    if (void 0 !== u4.constructor)
      return null;
    null != i4.__h && (c4 = i4.__h, e4 = u4.__e = i4.__e, u4.__h = null, o4 = [e4]), (s4 = l.__b) && s4(u4);
    try {
      n:
        if ("function" == typeof $3) {
          if (b3 = u4.props, m3 = (s4 = $3.contextType) && t4[s4.__c], g5 = s4 ? m3 ? m3.props.value : s4.__ : t4, i4.__c ? k4 = (a4 = u4.__c = i4.__c).__ = a4.__E : ("prototype" in $3 && $3.prototype.render ? u4.__c = a4 = new $3(b3, g5) : (u4.__c = a4 = new x(b3, g5), a4.constructor = $3, a4.render = B), m3 && m3.sub(a4), a4.props = b3, a4.state || (a4.state = {}), a4.context = g5, a4.__n = t4, h4 = a4.__d = true, a4.__h = [], a4._sb = []), null == a4.__s && (a4.__s = a4.state), null != $3.getDerivedStateFromProps && (a4.__s == a4.state && (a4.__s = v({}, a4.__s)), v(a4.__s, $3.getDerivedStateFromProps(b3, a4.__s))), y4 = a4.props, p3 = a4.state, a4.__v = u4, h4)
            null == $3.getDerivedStateFromProps && null != a4.componentWillMount && a4.componentWillMount(), null != a4.componentDidMount && a4.__h.push(a4.componentDidMount);
          else {
            if (null == $3.getDerivedStateFromProps && b3 !== y4 && null != a4.componentWillReceiveProps && a4.componentWillReceiveProps(b3, g5), !a4.__e && null != a4.shouldComponentUpdate && false === a4.shouldComponentUpdate(b3, a4.__s, g5) || u4.__v === i4.__v) {
              for (u4.__v !== i4.__v && (a4.props = b3, a4.state = a4.__s, a4.__d = false), u4.__e = i4.__e, u4.__k = i4.__k, u4.__k.forEach(function(n4) {
                n4 && (n4.__ = u4);
              }), w4 = 0; w4 < a4._sb.length; w4++)
                a4.__h.push(a4._sb[w4]);
              a4._sb = [], a4.__h.length && f4.push(a4);
              break n;
            }
            null != a4.componentWillUpdate && a4.componentWillUpdate(b3, a4.__s, g5), null != a4.componentDidUpdate && a4.__h.push(function() {
              a4.componentDidUpdate(y4, p3, d3);
            });
          }
          if (a4.context = g5, a4.props = b3, a4.__P = n3, A4 = l.__r, P4 = 0, "prototype" in $3 && $3.prototype.render) {
            for (a4.state = a4.__s, a4.__d = false, A4 && A4(u4), s4 = a4.render(a4.props, a4.state, a4.context), C3 = 0; C3 < a4._sb.length; C3++)
              a4.__h.push(a4._sb[C3]);
            a4._sb = [];
          } else
            do {
              a4.__d = false, A4 && A4(u4), s4 = a4.render(a4.props, a4.state, a4.context), a4.state = a4.__s;
            } while (a4.__d && ++P4 < 25);
          a4.state = a4.__s, null != a4.getChildContext && (t4 = v(v({}, t4), a4.getChildContext())), h4 || null == a4.getSnapshotBeforeUpdate || (d3 = a4.getSnapshotBeforeUpdate(y4, p3)), T4 = null != s4 && s4.type === _ && null == s4.key ? s4.props.children : s4, H(n3, Array.isArray(T4) ? T4 : [T4], u4, i4, t4, r4, o4, f4, e4, c4), a4.base = u4.__e, u4.__h = null, a4.__h.length && f4.push(a4), k4 && (a4.__E = a4.__ = null), a4.__e = false;
        } else
          null == o4 && u4.__v === i4.__v ? (u4.__k = i4.__k, u4.__e = i4.__e) : u4.__e = O(i4.__e, u4, i4, t4, r4, o4, f4, c4);
      (s4 = l.diffed) && s4(u4);
    } catch (n4) {
      u4.__v = null, (c4 || null != o4) && (u4.__e = e4, u4.__h = !!c4, o4[o4.indexOf(e4)] = null), l.__e(n4, u4, i4);
    }
  }
  function N(n3, u4) {
    l.__c && l.__c(u4, n3), n3.some(function(u5) {
      try {
        n3 = u5.__h, u5.__h = [], n3.some(function(n4) {
          n4.call(u5);
        });
      } catch (n4) {
        l.__e(n4, u5.__v);
      }
    });
  }
  function O(l4, u4, i4, t4, r4, o4, f4, e4) {
    var s4, a4, v3, y4 = i4.props, p3 = u4.props, d3 = u4.type, _3 = 0;
    if ("svg" === d3 && (r4 = true), null != o4) {
      for (; _3 < o4.length; _3++)
        if ((s4 = o4[_3]) && "setAttribute" in s4 == !!d3 && (d3 ? s4.localName === d3 : 3 === s4.nodeType)) {
          l4 = s4, o4[_3] = null;
          break;
        }
    }
    if (null == l4) {
      if (null === d3)
        return document.createTextNode(p3);
      l4 = r4 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), o4 = null, e4 = false;
    }
    if (null === d3)
      y4 === p3 || e4 && l4.data === p3 || (l4.data = p3);
    else {
      if (o4 = o4 && n.call(l4.childNodes), a4 = (y4 = i4.props || c).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !e4) {
        if (null != o4)
          for (y4 = {}, _3 = 0; _3 < l4.attributes.length; _3++)
            y4[l4.attributes[_3].name] = l4.attributes[_3].value;
        (v3 || a4) && (v3 && (a4 && v3.__html == a4.__html || v3.__html === l4.innerHTML) || (l4.innerHTML = v3 && v3.__html || ""));
      }
      if (k(l4, p3, y4, r4, e4), v3)
        u4.__k = [];
      else if (_3 = u4.props.children, H(l4, Array.isArray(_3) ? _3 : [_3], u4, i4, t4, r4 && "foreignObject" !== d3, o4, f4, o4 ? o4[0] : i4.__k && A(i4, 0), e4), null != o4)
        for (_3 = o4.length; _3--; )
          null != o4[_3] && h(o4[_3]);
      e4 || ("value" in p3 && void 0 !== (_3 = p3.value) && (_3 !== l4.value || "progress" === d3 && !_3 || "option" === d3 && _3 !== y4.value) && m(l4, "value", _3, y4.value, false), "checked" in p3 && void 0 !== (_3 = p3.checked) && _3 !== l4.checked && m(l4, "checked", _3, y4.checked, false));
    }
    return l4;
  }
  function S(n3, u4, i4) {
    try {
      "function" == typeof n3 ? n3(u4) : n3.current = u4;
    } catch (n4) {
      l.__e(n4, i4);
    }
  }
  function q(n3, u4, i4) {
    var t4, r4;
    if (l.unmount && l.unmount(n3), (t4 = n3.ref) && (t4.current && t4.current !== n3.__e || S(t4, null, u4)), null != (t4 = n3.__c)) {
      if (t4.componentWillUnmount)
        try {
          t4.componentWillUnmount();
        } catch (n4) {
          l.__e(n4, u4);
        }
      t4.base = t4.__P = null, n3.__c = void 0;
    }
    if (t4 = n3.__k)
      for (r4 = 0; r4 < t4.length; r4++)
        t4[r4] && q(t4[r4], u4, i4 || "function" != typeof n3.type);
    i4 || null == n3.__e || h(n3.__e), n3.__ = n3.__e = n3.__d = void 0;
  }
  function B(n3, l4, u4) {
    return this.constructor(n3, u4);
  }
  function D(u4, i4, t4) {
    var r4, o4, f4;
    l.__ && l.__(u4, i4), o4 = (r4 = "function" == typeof t4) ? null : t4 && t4.__k || i4.__k, f4 = [], M(i4, u4 = (!r4 && t4 || i4).__k = y(_, null, [u4]), o4 || c, c, void 0 !== i4.ownerSVGElement, !r4 && t4 ? [t4] : o4 ? null : i4.firstChild ? n.call(i4.childNodes) : null, f4, !r4 && t4 ? t4 : o4 ? o4.__e : i4.firstChild, r4), N(f4, u4);
  }
  function E(n3, l4) {
    D(n3, l4, E);
  }
  function F(l4, u4, i4) {
    var t4, r4, o4, f4 = v({}, l4.props);
    for (o4 in u4)
      "key" == o4 ? t4 = u4[o4] : "ref" == o4 ? r4 = u4[o4] : f4[o4] = u4[o4];
    return arguments.length > 2 && (f4.children = arguments.length > 3 ? n.call(arguments, 2) : i4), p(l4.type, f4, t4 || l4.key, r4 || l4.ref, null);
  }
  function G(n3, l4) {
    var u4 = { __c: l4 = "__cC" + e++, __: n3, Consumer: function(n4, l5) {
      return n4.children(l5);
    }, Provider: function(n4) {
      var u5, i4;
      return this.getChildContext || (u5 = [], (i4 = {})[l4] = this, this.getChildContext = function() {
        return i4;
      }, this.shouldComponentUpdate = function(n5) {
        this.props.value !== n5.value && u5.some(T);
      }, this.sub = function(n5) {
        u5.push(n5);
        var l5 = n5.componentWillUnmount;
        n5.componentWillUnmount = function() {
          u5.splice(u5.indexOf(n5), 1), l5 && l5.call(n5);
        };
      }), n4.children;
    } };
    return u4.Provider.__ = u4.Consumer.contextType = u4;
  }
  var n, l, u, i, t, r, o, f, e, c, s, a;
  var init_preact_module = __esm({
    "node_modules/preact/dist/preact.module.js"() {
      c = {};
      s = [];
      a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = s.slice, l = { __e: function(n3, l4, u4, i4) {
        for (var t4, r4, o4; l4 = l4.__; )
          if ((t4 = l4.__c) && !t4.__)
            try {
              if ((r4 = t4.constructor) && null != r4.getDerivedStateFromError && (t4.setState(r4.getDerivedStateFromError(n3)), o4 = t4.__d), null != t4.componentDidCatch && (t4.componentDidCatch(n3, i4 || {}), o4 = t4.__d), o4)
                return t4.__E = t4;
            } catch (l5) {
              n3 = l5;
            }
        throw n3;
      } }, u = 0, i = function(n3) {
        return null != n3 && void 0 === n3.constructor;
      }, t = false, x.prototype.setState = function(n3, l4) {
        var u4;
        u4 = null != this.__s && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), "function" == typeof n3 && (n3 = n3(v({}, u4), this.props)), n3 && v(u4, n3), null != n3 && this.__v && (l4 && this._sb.push(l4), T(this));
      }, x.prototype.forceUpdate = function(n3) {
        this.__v && (this.__e = true, n3 && this.__h.push(n3), T(this));
      }, x.prototype.render = _, r = [], f = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, $.__r = 0, e = 0;
    }
  });

  // node_modules/preact/hooks/dist/hooks.module.js
  function d2(t4, u4) {
    l.__h && l.__h(r2, t4, o2 || u4), o2 = 0;
    var i4 = r2.__H || (r2.__H = { __: [], __h: [] });
    return t4 >= i4.__.length && i4.__.push({ __V: c2 }), i4.__[t4];
  }
  function p2(n3) {
    return o2 = 1, y2(B2, n3);
  }
  function y2(n3, u4, i4) {
    var o4 = d2(t2++, 2);
    if (o4.t = n3, !o4.__c && (o4.__ = [i4 ? i4(u4) : B2(void 0, u4), function(n4) {
      var t4 = o4.__N ? o4.__N[0] : o4.__[0], r4 = o4.t(t4, n4);
      t4 !== r4 && (o4.__N = [r4, o4.__[1]], o4.__c.setState({}));
    }], o4.__c = r2, !r2.u)) {
      r2.u = true;
      var f4 = r2.shouldComponentUpdate;
      r2.shouldComponentUpdate = function(n4, t4, r4) {
        if (!o4.__c.__H)
          return true;
        var u5 = o4.__c.__H.__.filter(function(n5) {
          return n5.__c;
        });
        if (u5.every(function(n5) {
          return !n5.__N;
        }))
          return !f4 || f4.call(this, n4, t4, r4);
        var i5 = false;
        return u5.forEach(function(n5) {
          if (n5.__N) {
            var t5 = n5.__[0];
            n5.__ = n5.__N, n5.__N = void 0, t5 !== n5.__[0] && (i5 = true);
          }
        }), !(!i5 && o4.__c.props === n4) && (!f4 || f4.call(this, n4, t4, r4));
      };
    }
    return o4.__N || o4.__;
  }
  function h2(u4, i4) {
    var o4 = d2(t2++, 3);
    !l.__s && z2(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r2.__H.__h.push(o4));
  }
  function s2(u4, i4) {
    var o4 = d2(t2++, 4);
    !l.__s && z2(o4.__H, i4) && (o4.__ = u4, o4.i = i4, r2.__h.push(o4));
  }
  function _2(n3) {
    return o2 = 5, F2(function() {
      return { current: n3 };
    }, []);
  }
  function A2(n3, t4, r4) {
    o2 = 6, s2(function() {
      return "function" == typeof n3 ? (n3(t4()), function() {
        return n3(null);
      }) : n3 ? (n3.current = t4(), function() {
        return n3.current = null;
      }) : void 0;
    }, null == r4 ? r4 : r4.concat(n3));
  }
  function F2(n3, r4) {
    var u4 = d2(t2++, 7);
    return z2(u4.__H, r4) ? (u4.__V = n3(), u4.i = r4, u4.__h = n3, u4.__V) : u4.__;
  }
  function T2(n3, t4) {
    return o2 = 8, F2(function() {
      return n3;
    }, t4);
  }
  function q2(n3) {
    var u4 = r2.context[n3.__c], i4 = d2(t2++, 9);
    return i4.c = n3, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n3.__;
  }
  function x2(t4, r4) {
    l.useDebugValue && l.useDebugValue(r4 ? r4(t4) : t4);
  }
  function P2(n3) {
    var u4 = d2(t2++, 10), i4 = p2();
    return u4.__ = n3, r2.componentDidCatch || (r2.componentDidCatch = function(n4, t4) {
      u4.__ && u4.__(n4, t4), i4[1](n4);
    }), [i4[0], function() {
      i4[1](void 0);
    }];
  }
  function V() {
    var n3 = d2(t2++, 11);
    if (!n3.__) {
      for (var u4 = r2.__v; null !== u4 && !u4.__m && null !== u4.__; )
        u4 = u4.__;
      var i4 = u4.__m || (u4.__m = [0, 0]);
      n3.__ = "P" + i4[0] + "-" + i4[1]++;
    }
    return n3.__;
  }
  function b2() {
    for (var t4; t4 = f2.shift(); )
      if (t4.__P && t4.__H)
        try {
          t4.__H.__h.forEach(k2), t4.__H.__h.forEach(w2), t4.__H.__h = [];
        } catch (r4) {
          t4.__H.__h = [], l.__e(r4, t4.__v);
        }
  }
  function j2(n3) {
    var t4, r4 = function() {
      clearTimeout(u4), g2 && cancelAnimationFrame(t4), setTimeout(n3);
    }, u4 = setTimeout(r4, 100);
    g2 && (t4 = requestAnimationFrame(r4));
  }
  function k2(n3) {
    var t4 = r2, u4 = n3.__c;
    "function" == typeof u4 && (n3.__c = void 0, u4()), r2 = t4;
  }
  function w2(n3) {
    var t4 = r2;
    n3.__c = n3.__(), r2 = t4;
  }
  function z2(n3, t4) {
    return !n3 || n3.length !== t4.length || t4.some(function(t5, r4) {
      return t5 !== n3[r4];
    });
  }
  function B2(n3, t4) {
    return "function" == typeof t4 ? t4(n3) : t4;
  }
  var t2, r2, u2, i2, o2, f2, c2, e2, a2, v2, l2, m2, g2;
  var init_hooks_module = __esm({
    "node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      f2 = [];
      c2 = [];
      e2 = l.__b;
      a2 = l.__r;
      v2 = l.diffed;
      l2 = l.__c;
      m2 = l.unmount;
      l.__b = function(n3) {
        r2 = null, e2 && e2(n3);
      }, l.__r = function(n3) {
        a2 && a2(n3), t2 = 0;
        var i4 = (r2 = n3.__c).__H;
        i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n4) {
          n4.__N && (n4.__ = n4.__N), n4.__V = c2, n4.__N = n4.i = void 0;
        })) : (i4.__h.forEach(k2), i4.__h.forEach(w2), i4.__h = [])), u2 = r2;
      }, l.diffed = function(t4) {
        v2 && v2(t4);
        var o4 = t4.__c;
        o4 && o4.__H && (o4.__H.__h.length && (1 !== f2.push(o4) && i2 === l.requestAnimationFrame || ((i2 = l.requestAnimationFrame) || j2)(b2)), o4.__H.__.forEach(function(n3) {
          n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = void 0, n3.__V = c2;
        })), u2 = r2 = null;
      }, l.__c = function(t4, r4) {
        r4.some(function(t5) {
          try {
            t5.__h.forEach(k2), t5.__h = t5.__h.filter(function(n3) {
              return !n3.__ || w2(n3);
            });
          } catch (u4) {
            r4.some(function(n3) {
              n3.__h && (n3.__h = []);
            }), r4 = [], l.__e(u4, t5.__v);
          }
        }), l2 && l2(t4, r4);
      }, l.unmount = function(t4) {
        m2 && m2(t4);
        var r4, u4 = t4.__c;
        u4 && u4.__H && (u4.__H.__.forEach(function(n3) {
          try {
            k2(n3);
          } catch (n4) {
            r4 = n4;
          }
        }), u4.__H = void 0, r4 && l.__e(r4, u4.__v));
      };
      g2 = "function" == typeof requestAnimationFrame;
    }
  });

  // node_modules/preact/compat/dist/compat.module.js
  var compat_module_exports = {};
  __export(compat_module_exports, {
    Children: () => O2,
    Component: () => x,
    Fragment: () => _,
    PureComponent: () => w3,
    StrictMode: () => vn,
    Suspense: () => D2,
    SuspenseList: () => V2,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: () => rn,
    cloneElement: () => cn,
    createContext: () => G,
    createElement: () => y,
    createFactory: () => on,
    createPortal: () => j3,
    createRef: () => d,
    default: () => bn,
    findDOMNode: () => an,
    flushSync: () => hn,
    forwardRef: () => k3,
    hydrate: () => q3,
    isValidElement: () => ln,
    lazy: () => M2,
    memo: () => R,
    render: () => Y,
    startTransition: () => dn,
    unmountComponentAtNode: () => fn,
    unstable_batchedUpdates: () => sn,
    useCallback: () => T2,
    useContext: () => q2,
    useDebugValue: () => x2,
    useDeferredValue: () => pn,
    useEffect: () => h2,
    useErrorBoundary: () => P2,
    useId: () => V,
    useImperativeHandle: () => A2,
    useInsertionEffect: () => yn,
    useLayoutEffect: () => s2,
    useMemo: () => F2,
    useReducer: () => y2,
    useRef: () => _2,
    useState: () => p2,
    useSyncExternalStore: () => _n,
    useTransition: () => mn,
    version: () => un
  });
  function g3(n3, t4) {
    for (var e4 in t4)
      n3[e4] = t4[e4];
    return n3;
  }
  function C2(n3, t4) {
    for (var e4 in n3)
      if ("__source" !== e4 && !(e4 in t4))
        return true;
    for (var r4 in t4)
      if ("__source" !== r4 && n3[r4] !== t4[r4])
        return true;
    return false;
  }
  function E2(n3, t4) {
    return n3 === t4 && (0 !== n3 || 1 / n3 == 1 / t4) || n3 != n3 && t4 != t4;
  }
  function w3(n3) {
    this.props = n3;
  }
  function R(n3, e4) {
    function r4(n4) {
      var t4 = this.props.ref, r5 = t4 == n4.ref;
      return !r5 && t4 && (t4.call ? t4(null) : t4.current = null), e4 ? !e4(this.props, n4) || !r5 : C2(this.props, n4);
    }
    function u4(e5) {
      return this.shouldComponentUpdate = r4, y(n3, e5);
    }
    return u4.displayName = "Memo(" + (n3.displayName || n3.name) + ")", u4.prototype.isReactComponent = true, u4.__f = true, u4;
  }
  function k3(n3) {
    function t4(t5) {
      var e4 = g3({}, t5);
      return delete e4.ref, n3(e4, t5.ref || null);
    }
    return t4.$$typeof = N2, t4.render = t4, t4.prototype.isReactComponent = t4.__f = true, t4.displayName = "ForwardRef(" + (n3.displayName || n3.name) + ")", t4;
  }
  function L2(n3, t4, e4) {
    return n3 && (n3.__c && n3.__c.__H && (n3.__c.__H.__.forEach(function(n4) {
      "function" == typeof n4.__c && n4.__c();
    }), n3.__c.__H = null), null != (n3 = g3({}, n3)).__c && (n3.__c.__P === e4 && (n3.__c.__P = t4), n3.__c = null), n3.__k = n3.__k && n3.__k.map(function(n4) {
      return L2(n4, t4, e4);
    })), n3;
  }
  function U(n3, t4, e4) {
    return n3 && (n3.__v = null, n3.__k = n3.__k && n3.__k.map(function(n4) {
      return U(n4, t4, e4);
    }), n3.__c && n3.__c.__P === t4 && (n3.__e && e4.insertBefore(n3.__e, n3.__d), n3.__c.__e = true, n3.__c.__P = e4)), n3;
  }
  function D2() {
    this.__u = 0, this.t = null, this.__b = null;
  }
  function F3(n3) {
    var t4 = n3.__.__c;
    return t4 && t4.__a && t4.__a(n3);
  }
  function M2(n3) {
    var e4, r4, u4;
    function o4(o5) {
      if (e4 || (e4 = n3()).then(function(n4) {
        r4 = n4.default || n4;
      }, function(n4) {
        u4 = n4;
      }), u4)
        throw u4;
      if (!r4)
        throw e4;
      return y(r4, o5);
    }
    return o4.displayName = "Lazy", o4.__f = true, o4;
  }
  function V2() {
    this.u = null, this.o = null;
  }
  function P3(n3) {
    return this.getChildContext = function() {
      return n3.context;
    }, n3.children;
  }
  function $2(n3) {
    var e4 = this, r4 = n3.i;
    e4.componentWillUnmount = function() {
      D(null, e4.l), e4.l = null, e4.i = null;
    }, e4.i && e4.i !== r4 && e4.componentWillUnmount(), n3.__v ? (e4.l || (e4.i = r4, e4.l = { nodeType: 1, parentNode: r4, childNodes: [], appendChild: function(n4) {
      this.childNodes.push(n4), e4.i.appendChild(n4);
    }, insertBefore: function(n4, t4) {
      this.childNodes.push(n4), e4.i.appendChild(n4);
    }, removeChild: function(n4) {
      this.childNodes.splice(this.childNodes.indexOf(n4) >>> 1, 1), e4.i.removeChild(n4);
    } }), D(y(P3, { context: e4.context }, n3.__v), e4.l)) : e4.l && e4.componentWillUnmount();
  }
  function j3(n3, e4) {
    var r4 = y($2, { __v: n3, i: e4 });
    return r4.containerInfo = e4, r4;
  }
  function Y(n3, t4, e4) {
    return null == t4.__k && (t4.textContent = ""), D(n3, t4), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
  }
  function q3(n3, t4, e4) {
    return E(n3, t4), "function" == typeof e4 && e4(), n3 ? n3.__c : null;
  }
  function J() {
  }
  function K() {
    return this.cancelBubble;
  }
  function Q() {
    return this.defaultPrevented;
  }
  function on(n3) {
    return y.bind(null, n3);
  }
  function ln(n3) {
    return !!n3 && n3.$$typeof === z3;
  }
  function cn(n3) {
    return ln(n3) ? F.apply(null, arguments) : n3;
  }
  function fn(n3) {
    return !!n3.__k && (D(null, n3), true);
  }
  function an(n3) {
    return n3 && (n3.base || 1 === n3.nodeType && n3) || null;
  }
  function dn(n3) {
    n3();
  }
  function pn(n3) {
    return n3;
  }
  function mn() {
    return [false, dn];
  }
  function _n(n3, t4) {
    var e4 = t4(), r4 = p2({ h: { __: e4, v: t4 } }), u4 = r4[0].h, o4 = r4[1];
    return s2(function() {
      u4.__ = e4, u4.v = t4, E2(u4.__, t4()) || o4({ h: u4 });
    }, [n3, e4, t4]), h2(function() {
      return E2(u4.__, u4.v()) || o4({ h: u4 }), n3(function() {
        E2(u4.__, u4.v()) || o4({ h: u4 });
      });
    }, [n3]), e4;
  }
  var x3, N2, A3, O2, T3, I2, W, z3, B3, H2, Z, G2, X, nn, tn, en, rn, un, sn, hn, vn, yn, bn;
  var init_compat_module = __esm({
    "node_modules/preact/compat/dist/compat.module.js"() {
      init_preact_module();
      init_preact_module();
      init_hooks_module();
      init_hooks_module();
      (w3.prototype = new x()).isPureReactComponent = true, w3.prototype.shouldComponentUpdate = function(n3, t4) {
        return C2(this.props, n3) || C2(this.state, t4);
      };
      x3 = l.__b;
      l.__b = function(n3) {
        n3.type && n3.type.__f && n3.ref && (n3.props.ref = n3.ref, n3.ref = null), x3 && x3(n3);
      };
      N2 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
      A3 = function(n3, t4) {
        return null == n3 ? null : j(j(n3).map(t4));
      };
      O2 = { map: A3, forEach: A3, count: function(n3) {
        return n3 ? j(n3).length : 0;
      }, only: function(n3) {
        var t4 = j(n3);
        if (1 !== t4.length)
          throw "Children.only";
        return t4[0];
      }, toArray: j };
      T3 = l.__e;
      l.__e = function(n3, t4, e4, r4) {
        if (n3.then) {
          for (var u4, o4 = t4; o4 = o4.__; )
            if ((u4 = o4.__c) && u4.__c)
              return null == t4.__e && (t4.__e = e4.__e, t4.__k = e4.__k), u4.__c(n3, t4);
        }
        T3(n3, t4, e4, r4);
      };
      I2 = l.unmount;
      l.unmount = function(n3) {
        var t4 = n3.__c;
        t4 && t4.__R && t4.__R(), t4 && true === n3.__h && (n3.type = null), I2 && I2(n3);
      }, (D2.prototype = new x()).__c = function(n3, t4) {
        var e4 = t4.__c, r4 = this;
        null == r4.t && (r4.t = []), r4.t.push(e4);
        var u4 = F3(r4.__v), o4 = false, i4 = function() {
          o4 || (o4 = true, e4.__R = null, u4 ? u4(l4) : l4());
        };
        e4.__R = i4;
        var l4 = function() {
          if (!--r4.__u) {
            if (r4.state.__a) {
              var n4 = r4.state.__a;
              r4.__v.__k[0] = U(n4, n4.__c.__P, n4.__c.__O);
            }
            var t5;
            for (r4.setState({ __a: r4.__b = null }); t5 = r4.t.pop(); )
              t5.forceUpdate();
          }
        }, c4 = true === t4.__h;
        r4.__u++ || c4 || r4.setState({ __a: r4.__b = r4.__v.__k[0] }), n3.then(i4, i4);
      }, D2.prototype.componentWillUnmount = function() {
        this.t = [];
      }, D2.prototype.render = function(n3, e4) {
        if (this.__b) {
          if (this.__v.__k) {
            var r4 = document.createElement("div"), o4 = this.__v.__k[0].__c;
            this.__v.__k[0] = L2(this.__b, r4, o4.__O = o4.__P);
          }
          this.__b = null;
        }
        var i4 = e4.__a && y(_, null, n3.fallback);
        return i4 && (i4.__h = null), [y(_, null, e4.__a ? null : n3.children), i4];
      };
      W = function(n3, t4, e4) {
        if (++e4[1] === e4[0] && n3.o.delete(t4), n3.props.revealOrder && ("t" !== n3.props.revealOrder[0] || !n3.o.size))
          for (e4 = n3.u; e4; ) {
            for (; e4.length > 3; )
              e4.pop()();
            if (e4[1] < e4[0])
              break;
            n3.u = e4 = e4[2];
          }
      };
      (V2.prototype = new x()).__a = function(n3) {
        var t4 = this, e4 = F3(t4.__v), r4 = t4.o.get(n3);
        return r4[0]++, function(u4) {
          var o4 = function() {
            t4.props.revealOrder ? (r4.push(u4), W(t4, n3, r4)) : u4();
          };
          e4 ? e4(o4) : o4();
        };
      }, V2.prototype.render = function(n3) {
        this.u = null, this.o = /* @__PURE__ */ new Map();
        var t4 = j(n3.children);
        n3.revealOrder && "b" === n3.revealOrder[0] && t4.reverse();
        for (var e4 = t4.length; e4--; )
          this.o.set(t4[e4], this.u = [1, 0, this.u]);
        return n3.children;
      }, V2.prototype.componentDidUpdate = V2.prototype.componentDidMount = function() {
        var n3 = this;
        this.o.forEach(function(t4, e4) {
          W(n3, e4, t4);
        });
      };
      z3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
      B3 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
      H2 = "undefined" != typeof document;
      Z = function(n3) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(n3);
      };
      x.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t4) {
        Object.defineProperty(x.prototype, t4, { configurable: true, get: function() {
          return this["UNSAFE_" + t4];
        }, set: function(n3) {
          Object.defineProperty(this, t4, { configurable: true, writable: true, value: n3 });
        } });
      });
      G2 = l.event;
      l.event = function(n3) {
        return G2 && (n3 = G2(n3)), n3.persist = J, n3.isPropagationStopped = K, n3.isDefaultPrevented = Q, n3.nativeEvent = n3;
      };
      nn = { configurable: true, get: function() {
        return this.class;
      } };
      tn = l.vnode;
      l.vnode = function(n3) {
        var t4 = n3.type, e4 = n3.props, u4 = e4;
        if ("string" == typeof t4) {
          var o4 = -1 === t4.indexOf("-");
          for (var i4 in u4 = {}, e4) {
            var l4 = e4[i4];
            H2 && "children" === i4 && "noscript" === t4 || "value" === i4 && "defaultValue" in e4 && null == l4 || ("defaultValue" === i4 && "value" in e4 && null == e4.value ? i4 = "value" : "download" === i4 && true === l4 ? l4 = "" : /ondoubleclick/i.test(i4) ? i4 = "ondblclick" : /^onchange(textarea|input)/i.test(i4 + t4) && !Z(e4.type) ? i4 = "oninput" : /^onfocus$/i.test(i4) ? i4 = "onfocusin" : /^onblur$/i.test(i4) ? i4 = "onfocusout" : /^on(Ani|Tra|Tou|BeforeInp|Compo)/.test(i4) ? i4 = i4.toLowerCase() : o4 && B3.test(i4) ? i4 = i4.replace(/[A-Z0-9]/g, "-$&").toLowerCase() : null === l4 && (l4 = void 0), /^oninput$/i.test(i4) && (i4 = i4.toLowerCase(), u4[i4] && (i4 = "oninputCapture")), u4[i4] = l4);
          }
          "select" == t4 && u4.multiple && Array.isArray(u4.value) && (u4.value = j(e4.children).forEach(function(n4) {
            n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
          })), "select" == t4 && null != u4.defaultValue && (u4.value = j(e4.children).forEach(function(n4) {
            n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
          })), n3.props = u4, e4.class != e4.className && (nn.enumerable = "className" in e4, null != e4.className && (u4.class = e4.className), Object.defineProperty(u4, "className", nn));
        }
        n3.$$typeof = z3, tn && tn(n3);
      };
      en = l.__r;
      l.__r = function(n3) {
        en && en(n3), X = n3.__c;
      };
      rn = { ReactCurrentDispatcher: { current: { readContext: function(n3) {
        return X.__n[n3.__c].props.value;
      } } } };
      un = "17.0.2";
      sn = function(n3, t4) {
        return n3(t4);
      };
      hn = function(n3, t4) {
        return n3(t4);
      };
      vn = _;
      yn = s2;
      bn = { useState: p2, useId: V, useReducer: y2, useEffect: h2, useLayoutEffect: s2, useInsertionEffect: yn, useTransition: mn, useDeferredValue: pn, useSyncExternalStore: _n, startTransition: dn, useRef: _2, useImperativeHandle: A2, useMemo: F2, useCallback: T2, useContext: q2, useDebugValue: x2, version: "17.0.2", Children: O2, render: Y, hydrate: q3, unmountComponentAtNode: fn, createPortal: j3, createElement: y, createContext: G, createFactory: on, cloneElement: cn, createRef: d, Fragment: _, isValidElement: ln, findDOMNode: an, Component: x, PureComponent: w3, memo: R, forwardRef: k3, flushSync: hn, unstable_batchedUpdates: sn, StrictMode: vn, Suspense: D2, SuspenseList: V2, lazy: M2, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: rn };
    }
  });

  // alias/react.js
  var require_react = __commonJS({
    "alias/react.js"(exports, module) {
      "use strict";
      var react = (init_compat_module(), __toCommonJS(compat_module_exports));
      window.React = react;
      module.exports = react;
    }
  });

  // node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        var nativeCodeString = "[native code]";
        function classNames2() {
          var classes = [];
          for (var i4 = 0; i4 < arguments.length; i4++) {
            var arg = arguments[i4];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames2.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
                classes.push(arg.toString());
                continue;
              }
              for (var key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                  classes.push(key);
                }
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames2.default = classNames2;
          module.exports = classNames2;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames2;
          });
        } else {
          window.classNames = classNames2;
        }
      })();
    }
  });

  // node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
  var require_use_sync_external_store_shim_development = __commonJS({
    "node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
      "use strict";
      if (true) {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var React2 = require_react();
          var ReactSharedInternals = React2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function is(x4, y4) {
            return x4 === y4 && (x4 !== 0 || 1 / x4 === 1 / y4) || x4 !== x4 && y4 !== y4;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var useState = React2.useState, useEffect2 = React2.useEffect, useLayoutEffect = React2.useLayoutEffect, useDebugValue2 = React2.useDebugValue;
          var didWarnOld18Alpha = false;
          var didWarnUncachedGetSnapshot = false;
          function useSyncExternalStore2(subscribe2, getSnapshot, getServerSnapshot) {
            {
              if (!didWarnOld18Alpha) {
                if (React2.startTransition !== void 0) {
                  didWarnOld18Alpha = true;
                  error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
                }
              }
            }
            var value = getSnapshot();
            {
              if (!didWarnUncachedGetSnapshot) {
                var cachedValue = getSnapshot();
                if (!objectIs(value, cachedValue)) {
                  error("The result of getSnapshot should be cached to avoid an infinite loop");
                  didWarnUncachedGetSnapshot = true;
                }
              }
            }
            var _useState = useState({
              inst: {
                value,
                getSnapshot
              }
            }), inst = _useState[0].inst, forceUpdate = _useState[1];
            useLayoutEffect(function() {
              inst.value = value;
              inst.getSnapshot = getSnapshot;
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            }, [subscribe2, value, getSnapshot]);
            useEffect2(function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
              var handleStoreChange = function() {
                if (checkIfSnapshotChanged(inst)) {
                  forceUpdate({
                    inst
                  });
                }
              };
              return subscribe2(handleStoreChange);
            }, [subscribe2]);
            useDebugValue2(value);
            return value;
          }
          function checkIfSnapshotChanged(inst) {
            var latestGetSnapshot = inst.getSnapshot;
            var prevValue = inst.value;
            try {
              var nextValue = latestGetSnapshot();
              return !objectIs(prevValue, nextValue);
            } catch (error2) {
              return true;
            }
          }
          function useSyncExternalStore$1(subscribe2, getSnapshot, getServerSnapshot) {
            return getSnapshot();
          }
          var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
          var isServerEnvironment = !canUseDOM;
          var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore2;
          var useSyncExternalStore$2 = React2.useSyncExternalStore !== void 0 ? React2.useSyncExternalStore : shim;
          exports.useSyncExternalStore = useSyncExternalStore$2;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // node_modules/use-sync-external-store/shim/index.js
  var require_shim = __commonJS({
    "node_modules/use-sync-external-store/shim/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_use_sync_external_store_shim_development();
      }
    }
  });

  // src/index.tsx
  var import_react_dom = __toESM(require_react());

  // src/drawer.tsx
  var import_classnames = __toESM(require_classnames());

  // node_modules/proxy-compare/dist/index.modern.js
  var e3 = Symbol();
  var t3 = Symbol();
  var r3 = "a";
  var n2 = "w";
  var o3 = (e4, t4) => new Proxy(e4, t4);
  var s3 = Object.getPrototypeOf;
  var c3 = /* @__PURE__ */ new WeakMap();
  var l3 = (e4) => e4 && (c3.has(e4) ? c3.get(e4) : s3(e4) === Object.prototype || s3(e4) === Array.prototype);
  var f3 = (e4) => "object" == typeof e4 && null !== e4;
  var i3 = (e4) => e4[t3] || e4;
  var u3 = (c4, f4, a4) => {
    if (!l3(c4))
      return c4;
    const p3 = i3(c4), y4 = ((e4) => Object.isFrozen(e4) || Object.values(Object.getOwnPropertyDescriptors(e4)).some((e5) => !e5.writable))(p3);
    let g5 = a4 && a4.get(p3);
    return g5 && g5[1].f === y4 || (g5 = ((o4, s4) => {
      const c5 = { f: s4 };
      let l4 = false;
      const f5 = (e4, t4) => {
        if (!l4) {
          let s5 = c5[r3].get(o4);
          if (s5 || (s5 = {}, c5[r3].set(o4, s5)), e4 === n2)
            s5[n2] = true;
          else {
            let r4 = s5[e4];
            r4 || (r4 = /* @__PURE__ */ new Set(), s5[e4] = r4), r4.add(t4);
          }
        }
      }, i4 = { get: (e4, n3) => n3 === t3 ? o4 : (f5("k", n3), u3(Reflect.get(e4, n3), c5[r3], c5.c)), has: (t4, n3) => n3 === e3 ? (l4 = true, c5[r3].delete(o4), true) : (f5("h", n3), Reflect.has(t4, n3)), getOwnPropertyDescriptor: (e4, t4) => (f5("o", t4), Reflect.getOwnPropertyDescriptor(e4, t4)), ownKeys: (e4) => (f5(n2), Reflect.ownKeys(e4)) };
      return s4 && (i4.set = i4.deleteProperty = () => false), [i4, c5];
    })(p3, y4), g5[1].p = o3(y4 ? ((e4) => {
      if (Array.isArray(e4))
        return Array.from(e4);
      const t4 = Object.getOwnPropertyDescriptors(e4);
      return Object.values(t4).forEach((e5) => {
        e5.configurable = true;
      }), Object.create(s3(e4), t4);
    })(p3) : p3, g5[0]), a4 && a4.set(p3, g5)), g5[1][r3] = f4, g5[1].c = a4, g5[1].p;
  };
  var a3 = (e4, t4, r4, o4) => {
    if (Object.is(e4, t4))
      return false;
    if (!f3(e4) || !f3(t4))
      return true;
    const s4 = r4.get(i3(e4));
    if (!s4)
      return true;
    if (o4) {
      const r5 = o4.get(e4);
      if (r5 && r5.n === t4)
        return r5.g;
      o4.set(e4, { n: t4, g: false });
    }
    let c4 = null;
    try {
      for (const r5 of s4.h || [])
        if (c4 = Reflect.has(e4, r5) !== Reflect.has(t4, r5), c4)
          return c4;
      if (true === s4[n2]) {
        if (c4 = ((e5, t5) => {
          const r5 = Reflect.ownKeys(e5), n3 = Reflect.ownKeys(t5);
          return r5.length !== n3.length || r5.some((e6, t6) => e6 !== n3[t6]);
        })(e4, t4), c4)
          return c4;
      } else
        for (const r5 of s4.o || [])
          if (c4 = !!Reflect.getOwnPropertyDescriptor(e4, r5) != !!Reflect.getOwnPropertyDescriptor(t4, r5), c4)
            return c4;
      for (const n3 of s4.k || [])
        if (c4 = a3(e4[n3], t4[n3], r4, o4), c4)
          return c4;
      return null === c4 && (c4 = true), c4;
    } finally {
      o4 && o4.set(e4, { n: t4, g: c4 });
    }
  };
  var y3 = (e4) => l3(e4) && e4[t3] || null;
  var g4 = (e4, t4 = true) => {
    c3.set(e4, t4);
  };
  var h3 = (e4, t4, r4) => {
    const o4 = [], s4 = /* @__PURE__ */ new WeakSet(), c4 = (e5, l4) => {
      if (s4.has(e5))
        return;
      f3(e5) && s4.add(e5);
      const u4 = f3(e5) && t4.get(i3(e5));
      if (u4) {
        var a4, p3;
        if (null == (a4 = u4.h) || a4.forEach((e6) => {
          const t5 = `:has(${String(e6)})`;
          o4.push(l4 ? [...l4, t5] : [t5]);
        }), true === u4[n2]) {
          const e6 = ":ownKeys";
          o4.push(l4 ? [...l4, e6] : [e6]);
        } else {
          var y4;
          null == (y4 = u4.o) || y4.forEach((e6) => {
            const t5 = `:hasOwn(${String(e6)})`;
            o4.push(l4 ? [...l4, t5] : [t5]);
          });
        }
        null == (p3 = u4.k) || p3.forEach((t5) => {
          r4 && !("value" in (Object.getOwnPropertyDescriptor(e5, t5) || {})) || c4(e5[t5], l4 ? [...l4, t5] : [t5]);
        });
      } else
        l4 && o4.push(l4);
    };
    return c4(e4), o4;
  };

  // node_modules/valtio/esm/vanilla.mjs
  var import_meta = {};
  var isObject = (x4) => typeof x4 === "object" && x4 !== null;
  var proxyStateMap = /* @__PURE__ */ new WeakMap();
  var refSet = /* @__PURE__ */ new WeakSet();
  var buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x4) => isObject(x4) && !refSet.has(x4) && (Array.isArray(x4) || !(Symbol.iterator in x4)) && !(x4 instanceof WeakMap) && !(x4 instanceof WeakSet) && !(x4 instanceof Error) && !(x4 instanceof Number) && !(x4 instanceof Date) && !(x4 instanceof String) && !(x4 instanceof RegExp) && !(x4 instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
    switch (promise.status) {
      case "fulfilled":
        return promise.value;
      case "rejected":
        throw promise.reason;
      default:
        throw promise;
    }
  }, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
    const cache = snapCache.get(target);
    if ((cache == null ? void 0 : cache[0]) === version) {
      return cache[1];
    }
    const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
    g4(snap, true);
    snapCache.set(target, [version, snap]);
    Reflect.ownKeys(target).forEach((key) => {
      if (Object.getOwnPropertyDescriptor(snap, key)) {
        return;
      }
      const value = Reflect.get(target, key);
      const desc = {
        value,
        enumerable: true
      };
      if (refSet.has(value)) {
        g4(value, false);
      } else if (value instanceof Promise) {
        delete desc.value;
        desc.get = () => handlePromise(value);
      } else if (proxyStateMap.has(value)) {
        desc.value = snapshot(value, handlePromise);
      }
      Object.defineProperty(snap, key, desc);
    });
    return snap;
  }, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction2 = function proxyFunction3(initialObject) {
    if (!isObject(initialObject)) {
      throw new Error("object required");
    }
    const found = proxyCache.get(initialObject);
    if (found) {
      return found;
    }
    let version = versionHolder[0];
    const listeners = /* @__PURE__ */ new Set();
    const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
      if (version !== nextVersion) {
        version = nextVersion;
        listeners.forEach((listener) => listener(op, nextVersion));
      }
    };
    let checkVersion = versionHolder[1];
    const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
      if (checkVersion !== nextCheckVersion && !listeners.size) {
        checkVersion = nextCheckVersion;
        propProxyStates.forEach(([propProxyState]) => {
          const propVersion = propProxyState[1](nextCheckVersion);
          if (propVersion > version) {
            version = propVersion;
          }
        });
      }
      return version;
    };
    const createPropListener = (prop) => (op, nextVersion) => {
      const newOp = [...op];
      newOp[1] = [prop, ...newOp[1]];
      notifyUpdate(newOp, nextVersion);
    };
    const propProxyStates = /* @__PURE__ */ new Map();
    const addPropListener = (prop, propProxyState) => {
      var _a;
      if (((_a = import_meta.env) == null ? void 0 : _a.MODE) !== "production" && propProxyStates.has(prop)) {
        throw new Error("prop listener already exists");
      }
      if (listeners.size) {
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      } else {
        propProxyStates.set(prop, [propProxyState]);
      }
    };
    const removePropListener = (prop) => {
      var _a;
      const entry = propProxyStates.get(prop);
      if (entry) {
        propProxyStates.delete(prop);
        (_a = entry[1]) == null ? void 0 : _a.call(entry);
      }
    };
    const addListener = (listener) => {
      listeners.add(listener);
      if (listeners.size === 1) {
        propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
          var _a;
          if (((_a = import_meta.env) == null ? void 0 : _a.MODE) !== "production" && prevRemove) {
            throw new Error("remove already exists");
          }
          const remove = propProxyState[3](createPropListener(prop));
          propProxyStates.set(prop, [propProxyState, remove]);
        });
      }
      const removeListener = () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          propProxyStates.forEach(([propProxyState, remove], prop) => {
            if (remove) {
              remove();
              propProxyStates.set(prop, [propProxyState]);
            }
          });
        }
      };
      return removeListener;
    };
    const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
    const handler = {
      deleteProperty(target, prop) {
        const prevValue = Reflect.get(target, prop);
        removePropListener(prop);
        const deleted = Reflect.deleteProperty(target, prop);
        if (deleted) {
          notifyUpdate(["delete", [prop], prevValue]);
        }
        return deleted;
      },
      set(target, prop, value, receiver) {
        const hasPrevValue = Reflect.has(target, prop);
        const prevValue = Reflect.get(target, prop, receiver);
        if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
          return true;
        }
        removePropListener(prop);
        if (isObject(value)) {
          value = y3(value) || value;
        }
        let nextValue = value;
        if (value instanceof Promise) {
          value.then((v3) => {
            value.status = "fulfilled";
            value.value = v3;
            notifyUpdate(["resolve", [prop], v3]);
          }).catch((e4) => {
            value.status = "rejected";
            value.reason = e4;
            notifyUpdate(["reject", [prop], e4]);
          });
        } else {
          if (!proxyStateMap.has(value) && canProxy(value)) {
            nextValue = proxyFunction3(value);
          }
          const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
          if (childProxyState) {
            addPropListener(prop, childProxyState);
          }
        }
        Reflect.set(target, prop, nextValue, receiver);
        notifyUpdate(["set", [prop], value, prevValue]);
        return true;
      }
    };
    const proxyObject = newProxy(baseObject, handler);
    proxyCache.set(initialObject, proxyObject);
    const proxyState = [
      baseObject,
      ensureVersion,
      createSnapshot,
      addListener
    ];
    proxyStateMap.set(proxyObject, proxyState);
    Reflect.ownKeys(initialObject).forEach((key) => {
      const desc = Object.getOwnPropertyDescriptor(
        initialObject,
        key
      );
      const hasValue = "value" in desc;
      delete desc.value;
      Object.defineProperty(baseObject, key, desc);
      if (hasValue) {
        proxyObject[key] = initialObject[key];
      }
    });
    return proxyObject;
  }) => [
    // public functions
    proxyFunction2,
    // shared state
    proxyStateMap,
    refSet,
    // internal things
    objectIs,
    newProxy,
    canProxy,
    defaultHandlePromise,
    snapCache,
    createSnapshot,
    proxyCache,
    versionHolder
  ];
  var [proxyFunction] = buildProxyFunction();
  function proxy(initialObject = {}) {
    return proxyFunction(initialObject);
  }
  function subscribe(proxyObject, callback, notifyInSync) {
    var _a;
    const proxyState = proxyStateMap.get(proxyObject);
    if (((_a = import_meta.env) == null ? void 0 : _a.MODE) !== "production" && !proxyState) {
      console.warn("Please use proxy object");
    }
    let promise;
    const ops = [];
    const addListener = proxyState[3];
    let isListenerActive = false;
    const listener = (op) => {
      ops.push(op);
      if (notifyInSync) {
        callback(ops.splice(0));
        return;
      }
      if (!promise) {
        promise = Promise.resolve().then(() => {
          promise = void 0;
          if (isListenerActive) {
            callback(ops.splice(0));
          }
        });
      }
    };
    const removeListener = addListener(listener);
    isListenerActive = true;
    return () => {
      isListenerActive = false;
      removeListener();
    };
  }
  function snapshot(proxyObject, handlePromise) {
    var _a;
    const proxyState = proxyStateMap.get(proxyObject);
    if (((_a = import_meta.env) == null ? void 0 : _a.MODE) !== "production" && !proxyState) {
      console.warn("Please use proxy object");
    }
    const [target, ensureVersion, createSnapshot] = proxyState;
    return createSnapshot(target, ensureVersion(), handlePromise);
  }

  // node_modules/valtio/esm/react.mjs
  var import_react = __toESM(require_react(), 1);
  var import_shim = __toESM(require_shim(), 1);
  var import_meta2 = {};
  var { use } = import_react.default;
  var { useSyncExternalStore } = import_shim.default;
  var useAffectedDebugValue = (state2, affected) => {
    const pathList = (0, import_react.useRef)();
    (0, import_react.useEffect)(() => {
      pathList.current = h3(state2, affected, true);
    });
    (0, import_react.useDebugValue)(pathList.current);
  };
  function useSnapshot(proxyObject, options) {
    var _a;
    const notifyInSync = options == null ? void 0 : options.sync;
    const lastSnapshot = (0, import_react.useRef)();
    const lastAffected = (0, import_react.useRef)();
    let inRender = true;
    const currSnapshot = useSyncExternalStore(
      (0, import_react.useCallback)(
        (callback) => {
          const unsub = subscribe(proxyObject, callback, notifyInSync);
          callback();
          return unsub;
        },
        [proxyObject, notifyInSync]
      ),
      () => {
        const nextSnapshot = snapshot(proxyObject, use);
        try {
          if (!inRender && lastSnapshot.current && lastAffected.current && !a3(
            lastSnapshot.current,
            nextSnapshot,
            lastAffected.current,
            /* @__PURE__ */ new WeakMap()
          )) {
            return lastSnapshot.current;
          }
        } catch (e4) {
        }
        return nextSnapshot;
      },
      () => snapshot(proxyObject, use)
    );
    inRender = false;
    const currAffected = /* @__PURE__ */ new WeakMap();
    (0, import_react.useEffect)(() => {
      lastSnapshot.current = currSnapshot;
      lastAffected.current = currAffected;
    });
    if (((_a = import_meta2.env) == null ? void 0 : _a.MODE) !== "production") {
      useAffectedDebugValue(currSnapshot, currAffected);
    }
    const proxyCache = (0, import_react.useMemo)(() => /* @__PURE__ */ new WeakMap(), []);
    return u3(currSnapshot, currAffected, proxyCache);
  }

  // node_modules/valtio/esm/vanilla/utils.mjs
  var DEVTOOLS = Symbol();
  function proxySet(initialValues) {
    const set = proxy({
      data: Array.from(new Set(initialValues)),
      has(value) {
        return this.data.indexOf(value) !== -1;
      },
      add(value) {
        let hasProxy = false;
        if (typeof value === "object" && value !== null) {
          hasProxy = this.data.indexOf(proxy(value)) !== -1;
        }
        if (this.data.indexOf(value) === -1 && !hasProxy) {
          this.data.push(value);
        }
        return this;
      },
      delete(value) {
        const index = this.data.indexOf(value);
        if (index === -1) {
          return false;
        }
        this.data.splice(index, 1);
        return true;
      },
      clear() {
        this.data.splice(0);
      },
      get size() {
        return this.data.length;
      },
      forEach(cb2) {
        this.data.forEach((value) => {
          cb2(value, value, this);
        });
      },
      get [Symbol.toStringTag]() {
        return "Set";
      },
      toJSON() {
        return new Set(this.data);
      },
      [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
      },
      values() {
        return this.data.values();
      },
      keys() {
        return this.data.values();
      },
      entries() {
        return new Set(this.data).entries();
      }
    });
    Object.defineProperties(set, {
      data: {
        enumerable: false
      },
      size: {
        enumerable: false
      },
      toJSON: {
        enumerable: false
      }
    });
    Object.seal(set);
    return set;
  }

  // images/drawer-arrow.png
  var drawer_arrow_default = "./drawer-arrow-PT6EU2Y5.png";

  // images/drawer-bg-bottom.png
  var drawer_bg_bottom_default = "./drawer-bg-bottom-LIPWKSWM.png";

  // images/drawer-bg-content.png
  var drawer_bg_content_default = "./drawer-bg-content-WAO4COBD.png";

  // images/drawer-bg-top.png
  var drawer_bg_top_default = "./drawer-bg-top-BQTCOIPL.png";

  // images/drawer-button.png
  var drawer_button_default = "./drawer-button-YDIAMH2C.png";

  // node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js
  function clamp(v3, min, max) {
    return Math.max(min, Math.min(v3, max));
  }
  var V3 = {
    toVector(v3, fallback) {
      if (v3 === void 0)
        v3 = fallback;
      return Array.isArray(v3) ? v3 : [v3, v3];
    },
    add(v1, v22) {
      return [v1[0] + v22[0], v1[1] + v22[1]];
    },
    sub(v1, v22) {
      return [v1[0] - v22[0], v1[1] - v22[1]];
    },
    addTo(v1, v22) {
      v1[0] += v22[0];
      v1[1] += v22[1];
    },
    subTo(v1, v22) {
      v1[0] -= v22[0];
      v1[1] -= v22[1];
    }
  };
  function rubberband(distance, dimension, constant) {
    if (dimension === 0 || Math.abs(dimension) === Infinity)
      return Math.pow(distance, constant * 5);
    return distance * dimension * constant / (dimension + constant * distance);
  }
  function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
    if (constant === 0)
      return clamp(position, min, max);
    if (position < min)
      return -rubberband(min - position, max - min, constant) + min;
    if (position > max)
      return +rubberband(position - max, max - min, constant) + max;
    return position;
  }
  function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
    const [[X0, X1], [Y0, Y1]] = bounds;
    return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
  }

  // node_modules/@use-gesture/core/dist/actions-b1cc53c2.esm.js
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  var EVENT_TYPE_MAP = {
    pointer: {
      start: "down",
      change: "move",
      end: "up"
    },
    mouse: {
      start: "down",
      change: "move",
      end: "up"
    },
    touch: {
      start: "start",
      change: "move",
      end: "end"
    },
    gesture: {
      start: "start",
      change: "change",
      end: "end"
    }
  };
  function capitalize(string) {
    if (!string)
      return "";
    return string[0].toUpperCase() + string.slice(1);
  }
  var actionsWithoutCaptureSupported = ["enter", "leave"];
  function hasCapture(capture = false, actionKey) {
    return capture && !actionsWithoutCaptureSupported.includes(actionKey);
  }
  function toHandlerProp(device, action = "", capture = false) {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return "on" + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? "Capture" : "");
  }
  var pointerCaptureEvents = ["gotpointercapture", "lostpointercapture"];
  function parseProp(prop) {
    let eventKey = prop.substring(2).toLowerCase();
    const passive = !!~eventKey.indexOf("passive");
    if (passive)
      eventKey = eventKey.replace("passive", "");
    const captureKey = pointerCaptureEvents.includes(eventKey) ? "capturecapture" : "capture";
    const capture = !!~eventKey.indexOf(captureKey);
    if (capture)
      eventKey = eventKey.replace("capture", "");
    return {
      device: eventKey,
      capture,
      passive
    };
  }
  function toDomEventType(device, action = "") {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return device + actionKey;
  }
  function isTouch(event) {
    return "touches" in event;
  }
  function getPointerType(event) {
    if (isTouch(event))
      return "touch";
    if ("pointerType" in event)
      return event.pointerType;
    return "mouse";
  }
  function getCurrentTargetTouchList(event) {
    return Array.from(event.touches).filter((e4) => {
      var _event$currentTarget, _event$currentTarget$;
      return e4.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 ? void 0 : (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e4.target));
    });
  }
  function getTouchList(event) {
    return event.type === "touchend" || event.type === "touchcancel" ? event.changedTouches : event.targetTouches;
  }
  function getValueEvent(event) {
    return isTouch(event) ? getTouchList(event)[0] : event;
  }
  function distanceAngle(P1, P22) {
    const dx = P22.clientX - P1.clientX;
    const dy = P22.clientY - P1.clientY;
    const cx = (P22.clientX + P1.clientX) / 2;
    const cy = (P22.clientY + P1.clientY) / 2;
    const distance = Math.hypot(dx, dy);
    const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
    const origin = [cx, cy];
    return {
      angle,
      distance,
      origin
    };
  }
  function touchIds(event) {
    return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
  }
  function touchDistanceAngle(event, ids) {
    const [P1, P22] = Array.from(event.touches).filter((touch) => ids.includes(touch.identifier));
    return distanceAngle(P1, P22);
  }
  function pointerId(event) {
    const valueEvent = getValueEvent(event);
    return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
  }
  function pointerValues(event) {
    const valueEvent = getValueEvent(event);
    return [valueEvent.clientX, valueEvent.clientY];
  }
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;
  function wheelValues(event) {
    let {
      deltaX,
      deltaY,
      deltaMode
    } = event;
    if (deltaMode === 1) {
      deltaX *= LINE_HEIGHT;
      deltaY *= LINE_HEIGHT;
    } else if (deltaMode === 2) {
      deltaX *= PAGE_HEIGHT;
      deltaY *= PAGE_HEIGHT;
    }
    return [deltaX, deltaY];
  }
  function scrollValues(event) {
    var _ref, _ref2;
    const {
      scrollX,
      scrollY,
      scrollLeft,
      scrollTop
    } = event.currentTarget;
    return [(_ref = scrollX !== null && scrollX !== void 0 ? scrollX : scrollLeft) !== null && _ref !== void 0 ? _ref : 0, (_ref2 = scrollY !== null && scrollY !== void 0 ? scrollY : scrollTop) !== null && _ref2 !== void 0 ? _ref2 : 0];
  }
  function getEventDetails(event) {
    const payload = {};
    if ("buttons" in event)
      payload.buttons = event.buttons;
    if ("shiftKey" in event) {
      const {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      } = event;
      Object.assign(payload, {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      });
    }
    return payload;
  }
  function call(v3, ...args) {
    if (typeof v3 === "function") {
      return v3(...args);
    } else {
      return v3;
    }
  }
  function noop() {
  }
  function chain(...fns) {
    if (fns.length === 0)
      return noop;
    if (fns.length === 1)
      return fns[0];
    return function() {
      let result;
      for (const fn2 of fns) {
        result = fn2.apply(this, arguments) || result;
      }
      return result;
    };
  }
  function assignDefault(value, fallback) {
    return Object.assign({}, fallback, value || {});
  }
  var BEFORE_LAST_KINEMATICS_DELAY = 32;
  var Engine = class {
    constructor(ctrl, args, key) {
      this.ctrl = ctrl;
      this.args = args;
      this.key = key;
      if (!this.state) {
        this.state = {};
        this.computeValues([0, 0]);
        this.computeInitial();
        if (this.init)
          this.init();
        this.reset();
      }
    }
    get state() {
      return this.ctrl.state[this.key];
    }
    set state(state2) {
      this.ctrl.state[this.key] = state2;
    }
    get shared() {
      return this.ctrl.state.shared;
    }
    get eventStore() {
      return this.ctrl.gestureEventStores[this.key];
    }
    get timeoutStore() {
      return this.ctrl.gestureTimeoutStores[this.key];
    }
    get config() {
      return this.ctrl.config[this.key];
    }
    get sharedConfig() {
      return this.ctrl.config.shared;
    }
    get handler() {
      return this.ctrl.handlers[this.key];
    }
    reset() {
      const {
        state: state2,
        shared,
        ingKey,
        args
      } = this;
      shared[ingKey] = state2._active = state2.active = state2._blocked = state2._force = false;
      state2._step = [false, false];
      state2.intentional = false;
      state2._movement = [0, 0];
      state2._distance = [0, 0];
      state2._direction = [0, 0];
      state2._delta = [0, 0];
      state2._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
      state2.args = args;
      state2.axis = void 0;
      state2.memo = void 0;
      state2.elapsedTime = 0;
      state2.direction = [0, 0];
      state2.distance = [0, 0];
      state2.overflow = [0, 0];
      state2._movementBound = [false, false];
      state2.velocity = [0, 0];
      state2.movement = [0, 0];
      state2.delta = [0, 0];
      state2.timeStamp = 0;
    }
    start(event) {
      const state2 = this.state;
      const config = this.config;
      if (!state2._active) {
        this.reset();
        this.computeInitial();
        state2._active = true;
        state2.target = event.target;
        state2.currentTarget = event.currentTarget;
        state2.lastOffset = config.from ? call(config.from, state2) : state2.offset;
        state2.offset = state2.lastOffset;
      }
      state2.startTime = state2.timeStamp = event.timeStamp;
    }
    computeValues(values) {
      const state2 = this.state;
      state2._values = values;
      state2.values = this.config.transform(values);
    }
    computeInitial() {
      const state2 = this.state;
      state2._initial = state2._values;
      state2.initial = state2.values;
    }
    compute(event) {
      const {
        state: state2,
        config,
        shared
      } = this;
      state2.args = this.args;
      let dt = 0;
      if (event) {
        state2.event = event;
        if (config.preventDefault && event.cancelable)
          state2.event.preventDefault();
        state2.type = event.type;
        shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
        shared.locked = !!document.pointerLockElement;
        Object.assign(shared, getEventDetails(event));
        shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
        dt = event.timeStamp - state2.timeStamp;
        state2.timeStamp = event.timeStamp;
        state2.elapsedTime = state2.timeStamp - state2.startTime;
      }
      if (state2._active) {
        const _absoluteDelta = state2._delta.map(Math.abs);
        V3.addTo(state2._distance, _absoluteDelta);
      }
      if (this.axisIntent)
        this.axisIntent(event);
      const [_m0, _m1] = state2._movement;
      const [t0, t1] = config.threshold;
      const {
        _step,
        values
      } = state2;
      if (config.hasCustomTransform) {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && values[0];
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && values[1];
      } else {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
      }
      state2.intentional = _step[0] !== false || _step[1] !== false;
      if (!state2.intentional)
        return;
      const movement = [0, 0];
      if (config.hasCustomTransform) {
        const [v0, v1] = values;
        movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
      } else {
        movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
      }
      if (this.restrictToAxis && !state2._blocked)
        this.restrictToAxis(movement);
      const previousOffset = state2.offset;
      const gestureIsActive = state2._active && !state2._blocked || state2.active;
      if (gestureIsActive) {
        state2.first = state2._active && !state2.active;
        state2.last = !state2._active && state2.active;
        state2.active = shared[this.ingKey] = state2._active;
        if (event) {
          if (state2.first) {
            if ("bounds" in config)
              state2._bounds = call(config.bounds, state2);
            if (this.setup)
              this.setup();
          }
          state2.movement = movement;
          this.computeOffset();
        }
      }
      const [ox, oy] = state2.offset;
      const [[x0, x1], [y0, y1]] = state2._bounds;
      state2.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
      state2._movementBound[0] = state2.overflow[0] ? state2._movementBound[0] === false ? state2._movement[0] : state2._movementBound[0] : false;
      state2._movementBound[1] = state2.overflow[1] ? state2._movementBound[1] === false ? state2._movement[1] : state2._movementBound[1] : false;
      const rubberband2 = state2._active ? config.rubberband || [0, 0] : [0, 0];
      state2.offset = computeRubberband(state2._bounds, state2.offset, rubberband2);
      state2.delta = V3.sub(state2.offset, previousOffset);
      this.computeMovement();
      if (gestureIsActive && (!state2.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
        state2.delta = V3.sub(state2.offset, previousOffset);
        const absoluteDelta = state2.delta.map(Math.abs);
        V3.addTo(state2.distance, absoluteDelta);
        state2.direction = state2.delta.map(Math.sign);
        state2._direction = state2._delta.map(Math.sign);
        if (!state2.first && dt > 0) {
          state2.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
        }
      }
    }
    emit() {
      const state2 = this.state;
      const shared = this.shared;
      const config = this.config;
      if (!state2._active)
        this.clean();
      if ((state2._blocked || !state2.intentional) && !state2._force && !config.triggerAllEvents)
        return;
      const memo = this.handler(_objectSpread2(_objectSpread2(_objectSpread2({}, shared), state2), {}, {
        [this.aliasKey]: state2.values
      }));
      if (memo !== void 0)
        state2.memo = memo;
    }
    clean() {
      this.eventStore.clean();
      this.timeoutStore.clean();
    }
  };
  function selectAxis([dx, dy], threshold) {
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > absDy && absDx > threshold) {
      return "x";
    }
    if (absDy > absDx && absDy > threshold) {
      return "y";
    }
    return void 0;
  }
  var CoordinatesEngine = class extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "aliasKey", "xy");
    }
    reset() {
      super.reset();
      this.state.axis = void 0;
    }
    init() {
      this.state.offset = [0, 0];
      this.state.lastOffset = [0, 0];
    }
    computeOffset() {
      this.state.offset = V3.add(this.state.lastOffset, this.state.movement);
    }
    computeMovement() {
      this.state.movement = V3.sub(this.state.offset, this.state.lastOffset);
    }
    axisIntent(event) {
      const state2 = this.state;
      const config = this.config;
      if (!state2.axis && event) {
        const threshold = typeof config.axisThreshold === "object" ? config.axisThreshold[getPointerType(event)] : config.axisThreshold;
        state2.axis = selectAxis(state2._movement, threshold);
      }
      state2._blocked = (config.lockDirection || !!config.axis) && !state2.axis || !!config.axis && config.axis !== state2.axis;
    }
    restrictToAxis(v3) {
      if (this.config.axis || this.config.lockDirection) {
        switch (this.state.axis) {
          case "x":
            v3[1] = 0;
            break;
          case "y":
            v3[0] = 0;
            break;
        }
      }
    }
  };
  var identity = (v3) => v3;
  var DEFAULT_RUBBERBAND = 0.15;
  var commonConfigResolver = {
    enabled(value = true) {
      return value;
    },
    eventOptions(value, _k, config) {
      return _objectSpread2(_objectSpread2({}, config.shared.eventOptions), value);
    },
    preventDefault(value = false) {
      return value;
    },
    triggerAllEvents(value = false) {
      return value;
    },
    rubberband(value = 0) {
      switch (value) {
        case true:
          return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
        case false:
          return [0, 0];
        default:
          return V3.toVector(value);
      }
    },
    from(value) {
      if (typeof value === "function")
        return value;
      if (value != null)
        return V3.toVector(value);
    },
    transform(value, _k, config) {
      const transform = value || config.shared.transform;
      this.hasCustomTransform = !!transform;
      if (true) {
        const originalTransform = transform || identity;
        return (v3) => {
          const r4 = originalTransform(v3);
          if (!isFinite(r4[0]) || !isFinite(r4[1])) {
            console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${r4[0]},${[1]}]`);
          }
          return r4;
        };
      }
      return transform || identity;
    },
    threshold(value) {
      return V3.toVector(value, 0);
    }
  };
  if (true) {
    Object.assign(commonConfigResolver, {
      domTarget(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
        }
        return NaN;
      },
      lockDirection(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``);
        }
        return NaN;
      },
      initial(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`);
        }
        return NaN;
      }
    });
  }
  var DEFAULT_AXIS_THRESHOLD = 0;
  var coordinatesConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
    axis(_v, _k, {
      axis
    }) {
      this.lockDirection = axis === "lock";
      if (!this.lockDirection)
        return axis;
    },
    axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
      return value;
    },
    bounds(value = {}) {
      if (typeof value === "function") {
        return (state2) => coordinatesConfigResolver.bounds(value(state2));
      }
      if ("current" in value) {
        return () => value.current;
      }
      if (typeof HTMLElement === "function" && value instanceof HTMLElement) {
        return value;
      }
      const {
        left = -Infinity,
        right = Infinity,
        top = -Infinity,
        bottom = Infinity
      } = value;
      return [[left, right], [top, bottom]];
    }
  });
  var KEYS_DELTA_MAP = {
    ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
    ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
    ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
    ArrowDown: (displacement, factor = 1) => [0, displacement * factor]
  };
  var DragEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "dragging");
    }
    reset() {
      super.reset();
      const state2 = this.state;
      state2._pointerId = void 0;
      state2._pointerActive = false;
      state2._keyboardActive = false;
      state2._preventScroll = false;
      state2._delayed = false;
      state2.swipe = [0, 0];
      state2.tap = false;
      state2.canceled = false;
      state2.cancel = this.cancel.bind(this);
    }
    setup() {
      const state2 = this.state;
      if (state2._bounds instanceof HTMLElement) {
        const boundRect = state2._bounds.getBoundingClientRect();
        const targetRect = state2.currentTarget.getBoundingClientRect();
        const _bounds = {
          left: boundRect.left - targetRect.left + state2.offset[0],
          right: boundRect.right - targetRect.right + state2.offset[0],
          top: boundRect.top - targetRect.top + state2.offset[1],
          bottom: boundRect.bottom - targetRect.bottom + state2.offset[1]
        };
        state2._bounds = coordinatesConfigResolver.bounds(_bounds);
      }
    }
    cancel() {
      const state2 = this.state;
      if (state2.canceled)
        return;
      state2.canceled = true;
      state2._active = false;
      setTimeout(() => {
        this.compute();
        this.emit();
      }, 0);
    }
    setActive() {
      this.state._active = this.state._pointerActive || this.state._keyboardActive;
    }
    clean() {
      this.pointerClean();
      this.state._pointerActive = false;
      this.state._keyboardActive = false;
      super.clean();
    }
    pointerDown(event) {
      const config = this.config;
      const state2 = this.state;
      if (event.buttons != null && (Array.isArray(config.pointerButtons) ? !config.pointerButtons.includes(event.buttons) : config.pointerButtons !== -1 && config.pointerButtons !== event.buttons))
        return;
      const ctrlIds = this.ctrl.setEventIds(event);
      if (config.pointerCapture) {
        event.target.setPointerCapture(event.pointerId);
      }
      if (ctrlIds && ctrlIds.size > 1 && state2._pointerActive)
        return;
      this.start(event);
      this.setupPointer(event);
      state2._pointerId = pointerId(event);
      state2._pointerActive = true;
      this.computeValues(pointerValues(event));
      this.computeInitial();
      if (config.preventScrollAxis && getPointerType(event) !== "mouse") {
        state2._active = false;
        this.setupScrollPrevention(event);
      } else if (config.delay > 0) {
        this.setupDelayTrigger(event);
        if (config.triggerAllEvents) {
          this.compute(event);
          this.emit();
        }
      } else {
        this.startPointerDrag(event);
      }
    }
    startPointerDrag(event) {
      const state2 = this.state;
      state2._active = true;
      state2._preventScroll = true;
      state2._delayed = false;
      this.compute(event);
      this.emit();
    }
    pointerMove(event) {
      const state2 = this.state;
      const config = this.config;
      if (!state2._pointerActive)
        return;
      if (state2.type === event.type && event.timeStamp === state2.timeStamp)
        return;
      const id = pointerId(event);
      if (state2._pointerId !== void 0 && id !== state2._pointerId)
        return;
      const _values = pointerValues(event);
      if (document.pointerLockElement === event.target) {
        state2._delta = [event.movementX, event.movementY];
      } else {
        state2._delta = V3.sub(_values, state2._values);
        this.computeValues(_values);
      }
      V3.addTo(state2._movement, state2._delta);
      this.compute(event);
      if (state2._delayed && state2.intentional) {
        this.timeoutStore.remove("dragDelay");
        state2.active = false;
        this.startPointerDrag(event);
        return;
      }
      if (config.preventScrollAxis && !state2._preventScroll) {
        if (state2.axis) {
          if (state2.axis === config.preventScrollAxis || config.preventScrollAxis === "xy") {
            state2._active = false;
            this.clean();
            return;
          } else {
            this.timeoutStore.remove("startPointerDrag");
            this.startPointerDrag(event);
            return;
          }
        } else {
          return;
        }
      }
      this.emit();
    }
    pointerUp(event) {
      this.ctrl.setEventIds(event);
      try {
        if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
          ;
          event.target.releasePointerCapture(event.pointerId);
        }
      } catch (_unused) {
        if (true) {
          console.warn(`[@use-gesture]: If you see this message, it's likely that you're using an outdated version of \`@react-three/fiber\`. 

Please upgrade to the latest version.`);
        }
      }
      const state2 = this.state;
      const config = this.config;
      if (!state2._active || !state2._pointerActive)
        return;
      const id = pointerId(event);
      if (state2._pointerId !== void 0 && id !== state2._pointerId)
        return;
      this.state._pointerActive = false;
      this.setActive();
      this.compute(event);
      const [dx, dy] = state2._distance;
      state2.tap = dx <= config.tapsThreshold && dy <= config.tapsThreshold;
      if (state2.tap && config.filterTaps) {
        state2._force = true;
      } else {
        const [dirx, diry] = state2.direction;
        const [vx, vy] = state2.velocity;
        const [mx, my] = state2.movement;
        const [svx, svy] = config.swipe.velocity;
        const [sx, sy] = config.swipe.distance;
        const sdt = config.swipe.duration;
        if (state2.elapsedTime < sdt) {
          if (Math.abs(vx) > svx && Math.abs(mx) > sx)
            state2.swipe[0] = dirx;
          if (Math.abs(vy) > svy && Math.abs(my) > sy)
            state2.swipe[1] = diry;
        }
      }
      this.emit();
    }
    pointerClick(event) {
      if (!this.state.tap && event.detail > 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    setupPointer(event) {
      const config = this.config;
      const device = config.device;
      if (true) {
        try {
          if (device === "pointer" && config.preventScrollDelay === void 0) {
            const currentTarget = "uv" in event ? event.sourceEvent.currentTarget : event.currentTarget;
            const style = window.getComputedStyle(currentTarget);
            if (style.touchAction === "auto") {
              console.warn(`[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.

This message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`, currentTarget);
            }
          }
        } catch (_unused2) {
        }
      }
      if (config.pointerLock) {
        event.currentTarget.requestPointerLock();
      }
      if (!config.pointerCapture) {
        this.eventStore.add(this.sharedConfig.window, device, "change", this.pointerMove.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "end", this.pointerUp.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "cancel", this.pointerUp.bind(this));
      }
    }
    pointerClean() {
      if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
        document.exitPointerLock();
      }
    }
    preventScroll(event) {
      if (this.state._preventScroll && event.cancelable) {
        event.preventDefault();
      }
    }
    setupScrollPrevention(event) {
      this.state._preventScroll = false;
      persistEvent(event);
      const remove = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
        passive: false
      });
      this.eventStore.add(this.sharedConfig.window, "touch", "end", remove);
      this.eventStore.add(this.sharedConfig.window, "touch", "cancel", remove);
      this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
    }
    setupDelayTrigger(event) {
      this.state._delayed = true;
      this.timeoutStore.add("dragDelay", () => {
        this.state._step = [0, 0];
        this.startPointerDrag(event);
      }, this.config.delay);
    }
    keyDown(event) {
      const deltaFn = KEYS_DELTA_MAP[event.key];
      if (deltaFn) {
        const state2 = this.state;
        const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
        this.start(event);
        state2._delta = deltaFn(this.config.keyboardDisplacement, factor);
        state2._keyboardActive = true;
        V3.addTo(state2._movement, state2._delta);
        this.compute(event);
        this.emit();
      }
    }
    keyUp(event) {
      if (!(event.key in KEYS_DELTA_MAP))
        return;
      this.state._keyboardActive = false;
      this.setActive();
      this.compute(event);
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      bindFunction(device, "start", this.pointerDown.bind(this));
      if (this.config.pointerCapture) {
        bindFunction(device, "change", this.pointerMove.bind(this));
        bindFunction(device, "end", this.pointerUp.bind(this));
        bindFunction(device, "cancel", this.pointerUp.bind(this));
        bindFunction("lostPointerCapture", "", this.pointerUp.bind(this));
      }
      if (this.config.keys) {
        bindFunction("key", "down", this.keyDown.bind(this));
        bindFunction("key", "up", this.keyUp.bind(this));
      }
      if (this.config.filterTaps) {
        bindFunction("click", "", this.pointerClick.bind(this), {
          capture: true,
          passive: false
        });
      }
    }
  };
  function persistEvent(event) {
    "persist" in event && typeof event.persist === "function" && event.persist();
  }
  var isBrowser = typeof window !== "undefined" && window.document && window.document.createElement;
  function supportsTouchEvents() {
    return isBrowser && "ontouchstart" in window;
  }
  function isTouchScreen() {
    return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
  }
  function supportsPointerEvents() {
    return isBrowser && "onpointerdown" in window;
  }
  function supportsPointerLock() {
    return isBrowser && "exitPointerLock" in window.document;
  }
  function supportsGestureEvents() {
    try {
      return "constructor" in GestureEvent;
    } catch (e4) {
      return false;
    }
  }
  var SUPPORT = {
    isBrowser,
    gesture: supportsGestureEvents(),
    touch: isTouchScreen(),
    touchscreen: isTouchScreen(),
    pointer: supportsPointerEvents(),
    pointerLock: supportsPointerLock()
  };
  var DEFAULT_PREVENT_SCROLL_DELAY = 250;
  var DEFAULT_DRAG_DELAY = 180;
  var DEFAULT_SWIPE_VELOCITY = 0.5;
  var DEFAULT_SWIPE_DISTANCE = 50;
  var DEFAULT_SWIPE_DURATION = 250;
  var DEFAULT_KEYBOARD_DISPLACEMENT = 10;
  var DEFAULT_DRAG_AXIS_THRESHOLD = {
    mouse: 0,
    touch: 0,
    pen: 8
  };
  var dragConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    device(_v, _k, {
      pointer: {
        touch = false,
        lock = false,
        mouse = false
      } = {}
    }) {
      this.pointerLock = lock && SUPPORT.pointerLock;
      if (SUPPORT.touch && touch)
        return "touch";
      if (this.pointerLock)
        return "mouse";
      if (SUPPORT.pointer && !mouse)
        return "pointer";
      if (SUPPORT.touch)
        return "touch";
      return "mouse";
    },
    preventScrollAxis(value, _k, {
      preventScroll
    }) {
      this.preventScrollDelay = typeof preventScroll === "number" ? preventScroll : preventScroll || preventScroll === void 0 && value ? DEFAULT_PREVENT_SCROLL_DELAY : void 0;
      if (!SUPPORT.touchscreen || preventScroll === false)
        return void 0;
      return value ? value : preventScroll !== void 0 ? "y" : void 0;
    },
    pointerCapture(_v, _k, {
      pointer: {
        capture = true,
        buttons = 1,
        keys = true
      } = {}
    }) {
      this.pointerButtons = buttons;
      this.keys = keys;
      return !this.pointerLock && this.device === "pointer" && capture;
    },
    threshold(value, _k, {
      filterTaps = false,
      tapsThreshold = 3,
      axis = void 0
    }) {
      const threshold = V3.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
      this.filterTaps = filterTaps;
      this.tapsThreshold = tapsThreshold;
      return threshold;
    },
    swipe({
      velocity = DEFAULT_SWIPE_VELOCITY,
      distance = DEFAULT_SWIPE_DISTANCE,
      duration = DEFAULT_SWIPE_DURATION
    } = {}) {
      return {
        velocity: this.transform(V3.toVector(velocity)),
        distance: this.transform(V3.toVector(distance)),
        duration
      };
    },
    delay(value = 0) {
      switch (value) {
        case true:
          return DEFAULT_DRAG_DELAY;
        case false:
          return 0;
        default:
          return value;
      }
    },
    axisThreshold(value) {
      if (!value)
        return DEFAULT_DRAG_AXIS_THRESHOLD;
      return _objectSpread2(_objectSpread2({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
    },
    keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
      return value;
    }
  });
  if (true) {
    Object.assign(dragConfigResolver, {
      useTouch(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`);
        }
        return NaN;
      },
      experimental_preventWindowScrollY(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`);
        }
        return NaN;
      },
      swipeVelocity(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`);
        }
        return NaN;
      },
      swipeDistance(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`);
        }
        return NaN;
      },
      swipeDuration(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`);
        }
        return NaN;
      }
    });
  }
  function clampStateInternalMovementToBounds(state2) {
    const [ox, oy] = state2.overflow;
    const [dx, dy] = state2._delta;
    const [dirx, diry] = state2._direction;
    if (ox < 0 && dx > 0 && dirx < 0 || ox > 0 && dx < 0 && dirx > 0) {
      state2._movement[0] = state2._movementBound[0];
    }
    if (oy < 0 && dy > 0 && diry < 0 || oy > 0 && dy < 0 && diry > 0) {
      state2._movement[1] = state2._movementBound[1];
    }
  }
  var SCALE_ANGLE_RATIO_INTENT_DEG = 30;
  var PINCH_WHEEL_RATIO = 100;
  var PinchEngine = class extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "pinching");
      _defineProperty(this, "aliasKey", "da");
    }
    init() {
      this.state.offset = [1, 0];
      this.state.lastOffset = [1, 0];
      this.state._pointerEvents = /* @__PURE__ */ new Map();
    }
    reset() {
      super.reset();
      const state2 = this.state;
      state2._touchIds = [];
      state2.canceled = false;
      state2.cancel = this.cancel.bind(this);
      state2.turns = 0;
    }
    computeOffset() {
      const {
        type,
        movement,
        lastOffset
      } = this.state;
      if (type === "wheel") {
        this.state.offset = V3.add(movement, lastOffset);
      } else {
        this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
      }
    }
    computeMovement() {
      const {
        offset,
        lastOffset
      } = this.state;
      this.state.movement = [offset[0] / lastOffset[0], offset[1] - lastOffset[1]];
    }
    axisIntent() {
      const state2 = this.state;
      const [_m0, _m1] = state2._movement;
      if (!state2.axis) {
        const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m1);
        if (axisMovementDifference < 0)
          state2.axis = "angle";
        else if (axisMovementDifference > 0)
          state2.axis = "scale";
      }
    }
    restrictToAxis(v3) {
      if (this.config.lockDirection) {
        if (this.state.axis === "scale")
          v3[1] = 0;
        else if (this.state.axis === "angle")
          v3[0] = 0;
      }
    }
    cancel() {
      const state2 = this.state;
      if (state2.canceled)
        return;
      setTimeout(() => {
        state2.canceled = true;
        state2._active = false;
        this.compute();
        this.emit();
      }, 0);
    }
    touchStart(event) {
      this.ctrl.setEventIds(event);
      const state2 = this.state;
      const ctrlTouchIds = this.ctrl.touchIds;
      if (state2._active) {
        if (state2._touchIds.every((id) => ctrlTouchIds.has(id)))
          return;
      }
      if (ctrlTouchIds.size < 2)
        return;
      this.start(event);
      state2._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
      const payload = touchDistanceAngle(event, state2._touchIds);
      this.pinchStart(event, payload);
    }
    pointerStart(event) {
      if (event.buttons != null && event.buttons % 2 !== 1)
        return;
      this.ctrl.setEventIds(event);
      event.target.setPointerCapture(event.pointerId);
      const state2 = this.state;
      const _pointerEvents = state2._pointerEvents;
      const ctrlPointerIds = this.ctrl.pointerIds;
      if (state2._active) {
        if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id)))
          return;
      }
      if (_pointerEvents.size < 2) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (state2._pointerEvents.size < 2)
        return;
      this.start(event);
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      this.pinchStart(event, payload);
    }
    pinchStart(event, payload) {
      const state2 = this.state;
      state2.origin = payload.origin;
      this.computeValues([payload.distance, payload.angle]);
      this.computeInitial();
      this.compute(event);
      this.emit();
    }
    touchMove(event) {
      if (!this.state._active)
        return;
      const payload = touchDistanceAngle(event, this.state._touchIds);
      this.pinchMove(event, payload);
    }
    pointerMove(event) {
      const _pointerEvents = this.state._pointerEvents;
      if (_pointerEvents.has(event.pointerId)) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (!this.state._active)
        return;
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      this.pinchMove(event, payload);
    }
    pinchMove(event, payload) {
      const state2 = this.state;
      const prev_a = state2._values[1];
      const delta_a = payload.angle - prev_a;
      let delta_turns = 0;
      if (Math.abs(delta_a) > 270)
        delta_turns += Math.sign(delta_a);
      this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
      state2.origin = payload.origin;
      state2.turns = delta_turns;
      state2._movement = [state2._values[0] / state2._initial[0] - 1, state2._values[1] - state2._initial[1]];
      this.compute(event);
      this.emit();
    }
    touchEnd(event) {
      this.ctrl.setEventIds(event);
      if (!this.state._active)
        return;
      if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
        this.state._active = false;
        this.compute(event);
        this.emit();
      }
    }
    pointerEnd(event) {
      const state2 = this.state;
      this.ctrl.setEventIds(event);
      try {
        event.target.releasePointerCapture(event.pointerId);
      } catch (_unused) {
      }
      if (state2._pointerEvents.has(event.pointerId)) {
        state2._pointerEvents.delete(event.pointerId);
      }
      if (!state2._active)
        return;
      if (state2._pointerEvents.size < 2) {
        state2._active = false;
        this.compute(event);
        this.emit();
      }
    }
    gestureStart(event) {
      if (event.cancelable)
        event.preventDefault();
      const state2 = this.state;
      if (state2._active)
        return;
      this.start(event);
      this.computeValues([event.scale, event.rotation]);
      state2.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    gestureMove(event) {
      if (event.cancelable)
        event.preventDefault();
      if (!this.state._active)
        return;
      const state2 = this.state;
      this.computeValues([event.scale, event.rotation]);
      state2.origin = [event.clientX, event.clientY];
      const _previousMovement = state2._movement;
      state2._movement = [event.scale - 1, event.rotation];
      state2._delta = V3.sub(state2._movement, _previousMovement);
      this.compute(event);
      this.emit();
    }
    gestureEnd(event) {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
    wheel(event) {
      const modifierKey = this.config.modifierKey;
      if (modifierKey && !event[modifierKey])
        return;
      if (!this.state._active)
        this.wheelStart(event);
      else
        this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelStart(event) {
      this.start(event);
      this.wheelChange(event);
    }
    wheelChange(event) {
      const isR3f = "uv" in event;
      if (!isR3f) {
        if (event.cancelable) {
          event.preventDefault();
        }
        if (!event.defaultPrevented) {
          console.warn(`[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option.

This message will only appear in development mode.`);
        }
      }
      const state2 = this.state;
      state2._delta = [-wheelValues(event)[1] / PINCH_WHEEL_RATIO * state2.offset[0], 0];
      V3.addTo(state2._movement, state2._delta);
      clampStateInternalMovementToBounds(state2);
      this.state.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      if (!!device) {
        bindFunction(device, "start", this[device + "Start"].bind(this));
        bindFunction(device, "change", this[device + "Move"].bind(this));
        bindFunction(device, "end", this[device + "End"].bind(this));
        bindFunction(device, "cancel", this[device + "End"].bind(this));
      }
      if (this.config.pinchOnWheel) {
        bindFunction("wheel", "", this.wheel.bind(this), {
          passive: false
        });
      }
    }
  };
  var pinchConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
    device(_v, _k, {
      shared,
      pointer: {
        touch = false
      } = {}
    }) {
      const sharedConfig = shared;
      if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture)
        return "gesture";
      if (SUPPORT.touch && touch)
        return "touch";
      if (SUPPORT.touchscreen) {
        if (SUPPORT.pointer)
          return "pointer";
        if (SUPPORT.touch)
          return "touch";
      }
    },
    bounds(_v, _k, {
      scaleBounds = {},
      angleBounds = {}
    }) {
      const _scaleBounds = (state2) => {
        const D3 = assignDefault(call(scaleBounds, state2), {
          min: -Infinity,
          max: Infinity
        });
        return [D3.min, D3.max];
      };
      const _angleBounds = (state2) => {
        const A4 = assignDefault(call(angleBounds, state2), {
          min: -Infinity,
          max: Infinity
        });
        return [A4.min, A4.max];
      };
      if (typeof scaleBounds !== "function" && typeof angleBounds !== "function")
        return [_scaleBounds(), _angleBounds()];
      return (state2) => [_scaleBounds(state2), _angleBounds(state2)];
    },
    threshold(value, _k, config) {
      this.lockDirection = config.axis === "lock";
      const threshold = V3.toVector(value, this.lockDirection ? [0.1, 3] : 0);
      return threshold;
    },
    modifierKey(value) {
      if (value === void 0)
        return "ctrlKey";
      return value;
    },
    pinchOnWheel(value = true) {
      return value;
    }
  });
  var MoveEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "moving");
    }
    move(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      if (!this.state._active)
        this.moveStart(event);
      else
        this.moveChange(event);
      this.timeoutStore.add("moveEnd", this.moveEnd.bind(this));
    }
    moveStart(event) {
      this.start(event);
      this.computeValues(pointerValues(event));
      this.compute(event);
      this.computeInitial();
      this.emit();
    }
    moveChange(event) {
      if (!this.state._active)
        return;
      const values = pointerValues(event);
      const state2 = this.state;
      state2._delta = V3.sub(values, state2._values);
      V3.addTo(state2._movement, state2._delta);
      this.computeValues(values);
      this.compute(event);
      this.emit();
    }
    moveEnd(event) {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("pointer", "change", this.move.bind(this));
      bindFunction("pointer", "leave", this.moveEnd.bind(this));
    }
  };
  var moveConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  var ScrollEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "scrolling");
    }
    scroll(event) {
      if (!this.state._active)
        this.start(event);
      this.scrollChange(event);
      this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
    }
    scrollChange(event) {
      if (event.cancelable)
        event.preventDefault();
      const state2 = this.state;
      const values = scrollValues(event);
      state2._delta = V3.sub(values, state2._values);
      V3.addTo(state2._movement, state2._delta);
      this.computeValues(values);
      this.compute(event);
      this.emit();
    }
    scrollEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("scroll", "", this.scroll.bind(this));
    }
  };
  var scrollConfigResolver = coordinatesConfigResolver;
  var WheelEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "wheeling");
    }
    wheel(event) {
      if (!this.state._active)
        this.start(event);
      this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelChange(event) {
      const state2 = this.state;
      state2._delta = wheelValues(event);
      V3.addTo(state2._movement, state2._delta);
      clampStateInternalMovementToBounds(state2);
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("wheel", "", this.wheel.bind(this));
    }
  };
  var wheelConfigResolver = coordinatesConfigResolver;
  var HoverEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "hovering");
    }
    enter(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      this.start(event);
      this.computeValues(pointerValues(event));
      this.compute(event);
      this.emit();
    }
    leave(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      const state2 = this.state;
      if (!state2._active)
        return;
      state2._active = false;
      const values = pointerValues(event);
      state2._movement = state2._delta = V3.sub(values, state2._values);
      this.computeValues(values);
      this.compute(event);
      state2.delta = state2.movement;
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("pointer", "enter", this.enter.bind(this));
      bindFunction("pointer", "leave", this.leave.bind(this));
    }
  };
  var hoverConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  var EngineMap = /* @__PURE__ */ new Map();
  var ConfigResolverMap = /* @__PURE__ */ new Map();
  function registerAction(action) {
    EngineMap.set(action.key, action.engine);
    ConfigResolverMap.set(action.key, action.resolver);
  }
  var dragAction = {
    key: "drag",
    engine: DragEngine,
    resolver: dragConfigResolver
  };
  var hoverAction = {
    key: "hover",
    engine: HoverEngine,
    resolver: hoverConfigResolver
  };
  var moveAction = {
    key: "move",
    engine: MoveEngine,
    resolver: moveConfigResolver
  };
  var pinchAction = {
    key: "pinch",
    engine: PinchEngine,
    resolver: pinchConfigResolver
  };
  var scrollAction = {
    key: "scroll",
    engine: ScrollEngine,
    resolver: scrollConfigResolver
  };
  var wheelAction = {
    key: "wheel",
    engine: WheelEngine,
    resolver: wheelConfigResolver
  };

  // node_modules/@use-gesture/core/dist/use-gesture-core.esm.js
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i4;
    for (i4 = 0; i4 < sourceKeys.length; i4++) {
      key = sourceKeys[i4];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i4;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i4 = 0; i4 < sourceSymbolKeys.length; i4++) {
        key = sourceSymbolKeys[i4];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var sharedConfigResolver = {
    target(value) {
      if (value) {
        return () => "current" in value ? value.current : value;
      }
      return void 0;
    },
    enabled(value = true) {
      return value;
    },
    window(value = SUPPORT.isBrowser ? window : void 0) {
      return value;
    },
    eventOptions({
      passive = true,
      capture = false
    } = {}) {
      return {
        passive,
        capture
      };
    },
    transform(value) {
      return value;
    }
  };
  var _excluded = ["target", "eventOptions", "window", "enabled", "transform"];
  function resolveWith(config = {}, resolvers) {
    const result = {};
    for (const [key, resolver] of Object.entries(resolvers)) {
      switch (typeof resolver) {
        case "function":
          if (true) {
            const r4 = resolver.call(result, config[key], key, config);
            if (!Number.isNaN(r4))
              result[key] = r4;
          } else {
            result[key] = resolver.call(result, config[key], key, config);
          }
          break;
        case "object":
          result[key] = resolveWith(config[key], resolver);
          break;
        case "boolean":
          if (resolver)
            result[key] = config[key];
          break;
      }
    }
    return result;
  }
  function parse(newConfig, gestureKey, _config = {}) {
    const _ref = newConfig, {
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    } = _ref, rest = _objectWithoutProperties(_ref, _excluded);
    _config.shared = resolveWith({
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    }, sharedConfigResolver);
    if (gestureKey) {
      const resolver = ConfigResolverMap.get(gestureKey);
      _config[gestureKey] = resolveWith(_objectSpread2({
        shared: _config.shared
      }, rest), resolver);
    } else {
      for (const key in rest) {
        const resolver = ConfigResolverMap.get(key);
        if (resolver) {
          _config[key] = resolveWith(_objectSpread2({
            shared: _config.shared
          }, rest[key]), resolver);
        } else if (true) {
          if (!["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(key)) {
            if (key === "domTarget") {
              throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
            }
            console.warn(`[@use-gesture]: Unknown config key \`${key}\` was used. Please read the documentation for further information.`);
          }
        }
      }
    }
    return _config;
  }
  var EventStore = class {
    constructor(ctrl, gestureKey) {
      _defineProperty(this, "_listeners", /* @__PURE__ */ new Set());
      this._ctrl = ctrl;
      this._gestureKey = gestureKey;
    }
    add(element, device, action, handler, options) {
      const listeners = this._listeners;
      const type = toDomEventType(device, action);
      const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
      const eventOptions = _objectSpread2(_objectSpread2({}, _options), options);
      element.addEventListener(type, handler, eventOptions);
      const remove = () => {
        element.removeEventListener(type, handler, eventOptions);
        listeners.delete(remove);
      };
      listeners.add(remove);
      return remove;
    }
    clean() {
      this._listeners.forEach((remove) => remove());
      this._listeners.clear();
    }
  };
  var TimeoutStore = class {
    constructor() {
      _defineProperty(this, "_timeouts", /* @__PURE__ */ new Map());
    }
    add(key, callback, ms = 140, ...args) {
      this.remove(key);
      this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
    }
    remove(key) {
      const timeout = this._timeouts.get(key);
      if (timeout)
        window.clearTimeout(timeout);
    }
    clean() {
      this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
      this._timeouts.clear();
    }
  };
  var Controller = class {
    constructor(handlers) {
      _defineProperty(this, "gestures", /* @__PURE__ */ new Set());
      _defineProperty(this, "_targetEventStore", new EventStore(this));
      _defineProperty(this, "gestureEventStores", {});
      _defineProperty(this, "gestureTimeoutStores", {});
      _defineProperty(this, "handlers", {});
      _defineProperty(this, "config", {});
      _defineProperty(this, "pointerIds", /* @__PURE__ */ new Set());
      _defineProperty(this, "touchIds", /* @__PURE__ */ new Set());
      _defineProperty(this, "state", {
        shared: {
          shiftKey: false,
          metaKey: false,
          ctrlKey: false,
          altKey: false
        }
      });
      resolveGestures(this, handlers);
    }
    setEventIds(event) {
      if (isTouch(event)) {
        this.touchIds = new Set(touchIds(event));
        return this.touchIds;
      } else if ("pointerId" in event) {
        if (event.type === "pointerup" || event.type === "pointercancel")
          this.pointerIds.delete(event.pointerId);
        else if (event.type === "pointerdown")
          this.pointerIds.add(event.pointerId);
        return this.pointerIds;
      }
    }
    applyHandlers(handlers, nativeHandlers) {
      this.handlers = handlers;
      this.nativeHandlers = nativeHandlers;
    }
    applyConfig(config, gestureKey) {
      this.config = parse(config, gestureKey, this.config);
    }
    clean() {
      this._targetEventStore.clean();
      for (const key of this.gestures) {
        this.gestureEventStores[key].clean();
        this.gestureTimeoutStores[key].clean();
      }
    }
    effect() {
      if (this.config.shared.target)
        this.bind();
      return () => this._targetEventStore.clean();
    }
    bind(...args) {
      const sharedConfig = this.config.shared;
      const props = {};
      let target;
      if (sharedConfig.target) {
        target = sharedConfig.target();
        if (!target)
          return;
      }
      if (sharedConfig.enabled) {
        for (const gestureKey of this.gestures) {
          const gestureConfig = this.config[gestureKey];
          const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
          if (gestureConfig.enabled) {
            const Engine2 = EngineMap.get(gestureKey);
            new Engine2(this, args, gestureKey).bind(bindFunction);
          }
        }
        const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
        for (const eventKey in this.nativeHandlers) {
          nativeBindFunction(eventKey, "", (event) => this.nativeHandlers[eventKey](_objectSpread2(_objectSpread2({}, this.state.shared), {}, {
            event,
            args
          })), void 0, true);
        }
      }
      for (const handlerProp in props) {
        props[handlerProp] = chain(...props[handlerProp]);
      }
      if (!target)
        return props;
      for (const handlerProp in props) {
        const {
          device,
          capture,
          passive
        } = parseProp(handlerProp);
        this._targetEventStore.add(target, device, "", props[handlerProp], {
          capture,
          passive
        });
      }
    }
  };
  function setupGesture(ctrl, gestureKey) {
    ctrl.gestures.add(gestureKey);
    ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
    ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
  }
  function resolveGestures(ctrl, internalHandlers) {
    if (internalHandlers.drag)
      setupGesture(ctrl, "drag");
    if (internalHandlers.wheel)
      setupGesture(ctrl, "wheel");
    if (internalHandlers.scroll)
      setupGesture(ctrl, "scroll");
    if (internalHandlers.move)
      setupGesture(ctrl, "move");
    if (internalHandlers.pinch)
      setupGesture(ctrl, "pinch");
    if (internalHandlers.hover)
      setupGesture(ctrl, "hover");
  }
  var bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
    var _options$capture, _options$passive;
    const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
    const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
    let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
    if (withPassiveOption && passive)
      handlerProp += "Passive";
    props[handlerProp] = props[handlerProp] || [];
    props[handlerProp].push(handler);
  };
  var RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
  function sortHandlers(_handlers) {
    const native = {};
    const handlers = {};
    const actions = /* @__PURE__ */ new Set();
    for (let key in _handlers) {
      if (RE_NOT_NATIVE.test(key)) {
        actions.add(RegExp.lastMatch);
        handlers[key] = _handlers[key];
      } else {
        native[key] = _handlers[key];
      }
    }
    return [handlers, native, actions];
  }
  function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config) {
    if (!actions.has(handlerKey))
      return;
    if (!EngineMap.has(key)) {
      if (true) {
        console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${key}\` gesture but isn't properly configured.

Please add \`${key}Action\` when creating your handler.`);
      }
      return;
    }
    const startKey = handlerKey + "Start";
    const endKey = handlerKey + "End";
    const fn2 = (state2) => {
      let memo = void 0;
      if (state2.first && startKey in handlers)
        handlers[startKey](state2);
      if (handlerKey in handlers)
        memo = handlers[handlerKey](state2);
      if (state2.last && endKey in handlers)
        handlers[endKey](state2);
      return memo;
    };
    internalHandlers[key] = fn2;
    config[key] = config[key] || {};
  }
  function parseMergedHandlers(mergedHandlers, mergedConfig) {
    const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
    const internalHandlers = {};
    registerGesture(actions, handlers, "onDrag", "drag", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onWheel", "wheel", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onScroll", "scroll", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onPinch", "pinch", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onMove", "move", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onHover", "hover", internalHandlers, mergedConfig);
    return {
      handlers: internalHandlers,
      config: mergedConfig,
      nativeHandlers
    };
  }

  // node_modules/@use-gesture/vanilla/dist/use-gesture-vanilla.esm.js
  function _toPrimitive2(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey2(arg) {
    var key = _toPrimitive2(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _defineProperty2(obj, key, value) {
    key = _toPropertyKey2(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread22(target) {
    for (var i4 = 1; i4 < arguments.length; i4++) {
      var source = null != arguments[i4] ? arguments[i4] : {};
      i4 % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  var Recognizer = class {
    constructor(target, handlers, config, gestureKey, nativeHandlers) {
      this._target = target;
      this._gestureKey = gestureKey;
      this._ctrl = new Controller(handlers);
      this._ctrl.applyHandlers(handlers, nativeHandlers);
      this._ctrl.applyConfig(_objectSpread22(_objectSpread22({}, config), {}, {
        target
      }), gestureKey);
      this._ctrl.effect();
    }
    destroy() {
      this._ctrl.clean();
    }
    setConfig(config) {
      this._ctrl.clean();
      this._ctrl.applyConfig(_objectSpread22(_objectSpread22({}, config), {}, {
        target: this._target
      }), this._gestureKey);
      this._ctrl.effect();
    }
  };
  function createGesture(actions) {
    actions.forEach(registerAction);
    return function(target, _handlers, _config) {
      const {
        handlers,
        nativeHandlers,
        config
      } = parseMergedHandlers(_handlers, _config || {});
      return new Recognizer(target, handlers, config, void 0, nativeHandlers);
    };
  }
  var Gesture = function Gesture2(target, handlers, config) {
    const gestureFunction = createGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction]);
    return gestureFunction(target, handlers, config || {});
  };

  // node_modules/tslib/tslib.es6.js
  function __rest(s4, e4) {
    var t4 = {};
    for (var p3 in s4)
      if (Object.prototype.hasOwnProperty.call(s4, p3) && e4.indexOf(p3) < 0)
        t4[p3] = s4[p3];
    if (s4 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i4 = 0, p3 = Object.getOwnPropertySymbols(s4); i4 < p3.length; i4++) {
        if (e4.indexOf(p3[i4]) < 0 && Object.prototype.propertyIsEnumerable.call(s4, p3[i4]))
          t4[p3[i4]] = s4[p3[i4]];
      }
    return t4;
  }

  // node_modules/hey-listen/dist/hey-listen.es.js
  var warning = function() {
  };
  var invariant = function() {
  };
  if (true) {
    warning = function(check, message) {
      if (!check && typeof console !== "undefined") {
        console.warn(message);
      }
    };
    invariant = function(check, message) {
      if (!check) {
        throw new Error(message);
      }
    };
  }

  // node_modules/popmotion/dist/es/utils/clamp.mjs
  var clamp2 = (min, max, v3) => Math.min(Math.max(v3, min), max);

  // node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
  var safeMin = 1e-3;
  var minDuration = 0.01;
  var maxDuration = 10;
  var minDamping = 0.05;
  var maxDamping = 1;
  function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
    let envelope;
    let derivative;
    warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp2(minDamping, maxDamping, dampingRatio);
    duration = clamp2(minDuration, maxDuration, duration / 1e3);
    if (dampingRatio < 1) {
      envelope = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const a4 = exponentialDecay - velocity;
        const b3 = calcAngularFreq(undampedFreq2, dampingRatio);
        const c4 = Math.exp(-delta);
        return safeMin - a4 / b3 * c4;
      };
      derivative = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const d3 = delta * velocity + velocity;
        const e4 = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
        const f4 = Math.exp(-delta);
        const g5 = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
        const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
        return factor * ((d3 - e4) * f4) / g5;
      };
    } else {
      envelope = (undampedFreq2) => {
        const a4 = Math.exp(-undampedFreq2 * duration);
        const b3 = (undampedFreq2 - velocity) * duration + 1;
        return -safeMin + a4 * b3;
      };
      derivative = (undampedFreq2) => {
        const a4 = Math.exp(-undampedFreq2 * duration);
        const b3 = (velocity - undampedFreq2) * (duration * duration);
        return a4 * b3;
      };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1e3;
    if (isNaN(undampedFreq)) {
      return {
        stiffness: 100,
        damping: 10,
        duration
      };
    } else {
      const stiffness = Math.pow(undampedFreq, 2) * mass;
      return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
        duration
      };
    }
  }
  var rootIterations = 12;
  function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i4 = 1; i4 < rootIterations; i4++) {
      result = result - envelope(result) / derivative(result);
    }
    return result;
  }
  function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
  }

  // node_modules/popmotion/dist/es/animations/generators/spring.mjs
  var durationKeys = ["duration", "bounce"];
  var physicsKeys = ["stiffness", "damping", "mass"];
  function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== void 0);
  }
  function getSpringOptions(options) {
    let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
      const derived = findSpring(options);
      springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
      springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
  }
  function spring(_a) {
    var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
    const state2 = { done: false, value: from };
    let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
    let resolveSpring = zero;
    let resolveVelocity = zero;
    function createSpring() {
      const initialVelocity = velocity ? -(velocity / 1e3) : 0;
      const initialDelta = to - from;
      const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
      const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
      if (restDelta === void 0) {
        restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
      }
      if (dampingRatio < 1) {
        const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
        resolveSpring = (t4) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t4);
          return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t4) + initialDelta * Math.cos(angularFreq * t4));
        };
        resolveVelocity = (t4) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t4);
          return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t4) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t4)) - envelope * (Math.cos(angularFreq * t4) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t4));
        };
      } else if (dampingRatio === 1) {
        resolveSpring = (t4) => to - Math.exp(-undampedAngularFreq * t4) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t4);
      } else {
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t4) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t4);
          const freqForT = Math.min(dampedAngularFreq * t4, 300);
          return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
        };
      }
    }
    createSpring();
    return {
      next: (t4) => {
        const current = resolveSpring(t4);
        if (!isResolvedFromDuration) {
          const currentVelocity = resolveVelocity(t4) * 1e3;
          const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
          const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
          state2.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
        } else {
          state2.done = t4 >= duration;
        }
        state2.value = state2.done ? to : current;
        return state2;
      },
      flipTarget: () => {
        velocity = -velocity;
        [from, to] = [to, from];
        createSpring();
      }
    };
  }
  spring.needsInterpolation = (a4, b3) => typeof a4 === "string" || typeof b3 === "string";
  var zero = (_t) => 0;

  // node_modules/popmotion/dist/es/utils/progress.mjs
  var progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
  };

  // node_modules/popmotion/dist/es/utils/mix.mjs
  var mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;

  // node_modules/style-value-types/dist/es/utils.mjs
  var clamp3 = (min, max) => (v3) => Math.max(Math.min(v3, max), min);
  var sanitize = (v3) => v3 % 1 ? Number(v3.toFixed(5)) : v3;
  var floatRegex = /(-)?([\d]*\.?[\d])+/g;
  var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
  var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
  function isString(v3) {
    return typeof v3 === "string";
  }

  // node_modules/style-value-types/dist/es/numbers/index.mjs
  var number = {
    test: (v3) => typeof v3 === "number",
    parse: parseFloat,
    transform: (v3) => v3
  };
  var alpha = Object.assign(Object.assign({}, number), { transform: clamp3(0, 1) });
  var scale = Object.assign(Object.assign({}, number), { default: 1 });

  // node_modules/style-value-types/dist/es/numbers/units.mjs
  var createUnitType = (unit) => ({
    test: (v3) => isString(v3) && v3.endsWith(unit) && v3.split(" ").length === 1,
    parse: parseFloat,
    transform: (v3) => `${v3}${unit}`
  });
  var degrees = createUnitType("deg");
  var percent = createUnitType("%");
  var px = createUnitType("px");
  var vh = createUnitType("vh");
  var vw = createUnitType("vw");
  var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v3) => percent.parse(v3) / 100, transform: (v3) => percent.transform(v3 * 100) });

  // node_modules/style-value-types/dist/es/color/utils.mjs
  var isColorString = (type, testProp) => (v3) => {
    return Boolean(isString(v3) && singleColorRegex.test(v3) && v3.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v3, testProp));
  };
  var splitColor = (aName, bName, cName) => (v3) => {
    if (!isString(v3))
      return v3;
    const [a4, b3, c4, alpha2] = v3.match(floatRegex);
    return {
      [aName]: parseFloat(a4),
      [bName]: parseFloat(b3),
      [cName]: parseFloat(c4),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
    };
  };

  // node_modules/style-value-types/dist/es/color/hsla.mjs
  var hsla = {
    test: isColorString("hsl", "hue"),
    parse: splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
      return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
  };

  // node_modules/style-value-types/dist/es/color/rgba.mjs
  var clampRgbUnit = clamp3(0, 255);
  var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v3) => Math.round(clampRgbUnit(v3)) });
  var rgba = {
    test: isColorString("rgb", "red"),
    parse: splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
  };

  // node_modules/style-value-types/dist/es/color/hex.mjs
  function parseHex(v3) {
    let r4 = "";
    let g5 = "";
    let b3 = "";
    let a4 = "";
    if (v3.length > 5) {
      r4 = v3.substr(1, 2);
      g5 = v3.substr(3, 2);
      b3 = v3.substr(5, 2);
      a4 = v3.substr(7, 2);
    } else {
      r4 = v3.substr(1, 1);
      g5 = v3.substr(2, 1);
      b3 = v3.substr(3, 1);
      a4 = v3.substr(4, 1);
      r4 += r4;
      g5 += g5;
      b3 += b3;
      a4 += a4;
    }
    return {
      red: parseInt(r4, 16),
      green: parseInt(g5, 16),
      blue: parseInt(b3, 16),
      alpha: a4 ? parseInt(a4, 16) / 255 : 1
    };
  }
  var hex = {
    test: isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
  };

  // node_modules/style-value-types/dist/es/color/index.mjs
  var color = {
    test: (v3) => rgba.test(v3) || hex.test(v3) || hsla.test(v3),
    parse: (v3) => {
      if (rgba.test(v3)) {
        return rgba.parse(v3);
      } else if (hsla.test(v3)) {
        return hsla.parse(v3);
      } else {
        return hex.parse(v3);
      }
    },
    transform: (v3) => {
      return isString(v3) ? v3 : v3.hasOwnProperty("red") ? rgba.transform(v3) : hsla.transform(v3);
    }
  };

  // node_modules/style-value-types/dist/es/complex/index.mjs
  var colorToken = "${c}";
  var numberToken = "${n}";
  function test(v3) {
    var _a, _b, _c, _d;
    return isNaN(v3) && isString(v3) && ((_b = (_a = v3.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v3.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
  }
  function analyse(v3) {
    if (typeof v3 === "number")
      v3 = `${v3}`;
    const values = [];
    let numColors = 0;
    const colors = v3.match(colorRegex);
    if (colors) {
      numColors = colors.length;
      v3 = v3.replace(colorRegex, colorToken);
      values.push(...colors.map(color.parse));
    }
    const numbers = v3.match(floatRegex);
    if (numbers) {
      v3 = v3.replace(floatRegex, numberToken);
      values.push(...numbers.map(number.parse));
    }
    return { values, numColors, tokenised: v3 };
  }
  function parse2(v3) {
    return analyse(v3).values;
  }
  function createTransformer(v3) {
    const { values, numColors, tokenised } = analyse(v3);
    const numValues = values.length;
    return (v4) => {
      let output = tokenised;
      for (let i4 = 0; i4 < numValues; i4++) {
        output = output.replace(i4 < numColors ? colorToken : numberToken, i4 < numColors ? color.transform(v4[i4]) : sanitize(v4[i4]));
      }
      return output;
    };
  }
  var convertNumbersToZero = (v3) => typeof v3 === "number" ? 0 : v3;
  function getAnimatableNone(v3) {
    const parsed = parse2(v3);
    const transformer = createTransformer(v3);
    return transformer(parsed.map(convertNumbersToZero));
  }
  var complex = { test, parse: parse2, createTransformer, getAnimatableNone };

  // node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
  function hueToRgb(p3, q4, t4) {
    if (t4 < 0)
      t4 += 1;
    if (t4 > 1)
      t4 -= 1;
    if (t4 < 1 / 6)
      return p3 + (q4 - p3) * 6 * t4;
    if (t4 < 1 / 2)
      return q4;
    if (t4 < 2 / 3)
      return p3 + (q4 - p3) * (2 / 3 - t4) * 6;
    return p3;
  }
  function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
      red = green = blue = lightness;
    } else {
      const q4 = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      const p3 = 2 * lightness - q4;
      red = hueToRgb(p3, q4, hue + 1 / 3);
      green = hueToRgb(p3, q4, hue);
      blue = hueToRgb(p3, q4, hue - 1 / 3);
    }
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha: alpha2
    };
  }

  // node_modules/popmotion/dist/es/utils/mix-color.mjs
  var mixLinearColor = (from, to, v3) => {
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v3 * (toExpo - fromExpo) + fromExpo));
  };
  var colorTypes = [hex, rgba, hsla];
  var getColorType = (v3) => colorTypes.find((type) => type.test(v3));
  var notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
  var mixColor = (from, to) => {
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    invariant(!!fromColorType, notAnimatable(from));
    invariant(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
      fromColor = hslaToRgba(fromColor);
      fromColorType = rgba;
    }
    if (toColorType === hsla) {
      toColor = hslaToRgba(toColor);
      toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v3) => {
      for (const key in blended) {
        if (key !== "alpha") {
          blended[key] = mixLinearColor(fromColor[key], toColor[key], v3);
        }
      }
      blended.alpha = mix(fromColor.alpha, toColor.alpha, v3);
      return fromColorType.transform(blended);
    };
  };

  // node_modules/popmotion/dist/es/utils/inc.mjs
  var isNum = (v3) => typeof v3 === "number";

  // node_modules/popmotion/dist/es/utils/pipe.mjs
  var combineFunctions = (a4, b3) => (v3) => b3(a4(v3));
  var pipe = (...transformers) => transformers.reduce(combineFunctions);

  // node_modules/popmotion/dist/es/utils/mix-complex.mjs
  function getMixer(origin, target) {
    if (isNum(origin)) {
      return (v3) => mix(origin, target, v3);
    } else if (color.test(origin)) {
      return mixColor(origin, target);
    } else {
      return mixComplex(origin, target);
    }
  }
  var mixArray = (from, to) => {
    const output = [...from];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i4) => getMixer(fromThis, to[i4]));
    return (v3) => {
      for (let i4 = 0; i4 < numValues; i4++) {
        output[i4] = blendValue[i4](v3);
      }
      return output;
    };
  };
  var mixObject = (origin, target) => {
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for (const key in output) {
      if (origin[key] !== void 0 && target[key] !== void 0) {
        blendValue[key] = getMixer(origin[key], target[key]);
      }
    }
    return (v3) => {
      for (const key in blendValue) {
        output[key] = blendValue[key](v3);
      }
      return output;
    };
  };
  function analyse2(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for (let i4 = 0; i4 < numValues; i4++) {
      if (numNumbers || typeof parsed[i4] === "number") {
        numNumbers++;
      } else {
        if (parsed[i4].hue !== void 0) {
          numHSL++;
        } else {
          numRGB++;
        }
      }
    }
    return { parsed, numNumbers, numRGB, numHSL };
  }
  var mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyse2(origin);
    const targetStats = analyse2(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
      return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    } else {
      warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
      return (p3) => `${p3 > 0 ? target : origin}`;
    }
  };

  // node_modules/popmotion/dist/es/utils/interpolate.mjs
  var mixNumber = (from, to) => (p3) => mix(from, to, p3);
  function detectMixerFactory(v3) {
    if (typeof v3 === "number") {
      return mixNumber;
    } else if (typeof v3 === "string") {
      if (color.test(v3)) {
        return mixColor;
      } else {
        return mixComplex;
      }
    } else if (Array.isArray(v3)) {
      return mixArray;
    } else if (typeof v3 === "object") {
      return mixObject;
    }
  }
  function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for (let i4 = 0; i4 < numMixers; i4++) {
      let mixer = mixerFactory(output[i4], output[i4 + 1]);
      if (ease) {
        const easingFunction = Array.isArray(ease) ? ease[i4] : ease;
        mixer = pipe(easingFunction, mixer);
      }
      mixers.push(mixer);
    }
    return mixers;
  }
  function fastInterpolate([from, to], [mixer]) {
    return (v3) => mixer(progress(from, to, v3));
  }
  function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v3) => {
      let mixerIndex = 0;
      let foundMixerIndex = false;
      if (v3 <= input[0]) {
        foundMixerIndex = true;
      } else if (v3 >= input[lastInputIndex]) {
        mixerIndex = lastInputIndex - 1;
        foundMixerIndex = true;
      }
      if (!foundMixerIndex) {
        let i4 = 1;
        for (; i4 < inputLength; i4++) {
          if (input[i4] > v3 || i4 === lastInputIndex) {
            break;
          }
        }
        mixerIndex = i4 - 1;
      }
      const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v3);
      return mixers[mixerIndex](progressInRange);
    };
  }
  function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, "Both input and output ranges must be the same length");
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
    if (input[0] > input[inputLength - 1]) {
      input = [].concat(input);
      output = [].concat(output);
      input.reverse();
      output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
    return isClamp ? (v3) => interpolator(clamp2(input[0], input[inputLength - 1], v3)) : interpolator;
  }

  // node_modules/popmotion/dist/es/easing/utils.mjs
  var reverseEasing = (easing) => (p3) => 1 - easing(1 - p3);
  var mirrorEasing = (easing) => (p3) => p3 <= 0.5 ? easing(2 * p3) / 2 : (2 - easing(2 * (1 - p3))) / 2;
  var createExpoIn = (power) => (p3) => Math.pow(p3, power);
  var createBackIn = (power) => (p3) => p3 * p3 * ((power + 1) * p3 - power);
  var createAnticipate = (power) => {
    const backEasing = createBackIn(power);
    return (p3) => (p3 *= 2) < 1 ? 0.5 * backEasing(p3) : 0.5 * (2 - Math.pow(2, -10 * (p3 - 1)));
  };

  // node_modules/popmotion/dist/es/easing/index.mjs
  var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
  var BOUNCE_FIRST_THRESHOLD = 4 / 11;
  var BOUNCE_SECOND_THRESHOLD = 8 / 11;
  var BOUNCE_THIRD_THRESHOLD = 9 / 10;
  var easeIn = createExpoIn(2);
  var easeOut = reverseEasing(easeIn);
  var easeInOut = mirrorEasing(easeIn);
  var circIn = (p3) => 1 - Math.sin(Math.acos(p3));
  var circOut = reverseEasing(circIn);
  var circInOut = mirrorEasing(circOut);
  var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
  var backOut = reverseEasing(backIn);
  var backInOut = mirrorEasing(backIn);
  var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
  var ca = 4356 / 361;
  var cb = 35442 / 1805;
  var cc = 16061 / 1805;
  var bounceOut = (p3) => {
    if (p3 === 1 || p3 === 0)
      return p3;
    const p22 = p3 * p3;
    return p3 < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p22 : p3 < BOUNCE_SECOND_THRESHOLD ? 9.075 * p22 - 9.9 * p3 + 3.4 : p3 < BOUNCE_THIRD_THRESHOLD ? ca * p22 - cb * p3 + cc : 10.8 * p3 * p3 - 20.52 * p3 + 10.72;
  };
  var bounceIn = reverseEasing(bounceOut);

  // node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
  function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
  }
  function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i4) => i4 !== 0 ? i4 / (numValues - 1) : 0);
  }
  function convertOffsetToTimes(offset, duration) {
    return offset.map((o4) => o4 * duration);
  }
  function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
    const state2 = { done: false, value: from };
    const values = Array.isArray(to) ? to : [from, to];
    const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
    function createInterpolator() {
      return interpolate(times, values, {
        ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
      });
    }
    let interpolator = createInterpolator();
    return {
      next: (t4) => {
        state2.value = interpolator(t4);
        state2.done = t4 >= duration;
        return state2;
      },
      flipTarget: () => {
        values.reverse();
        interpolator = createInterpolator();
      }
    };
  }

  // node_modules/popmotion/dist/es/animations/generators/decay.mjs
  function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
    const state2 = { done: false, value: from };
    let amplitude = power * velocity;
    const ideal = from + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal)
      amplitude = target - from;
    return {
      next: (t4) => {
        const delta = -amplitude * Math.exp(-t4 / timeConstant);
        state2.done = !(delta > restDelta || delta < -restDelta);
        state2.value = state2.done ? target : target + delta;
        return state2;
      },
      flipTarget: () => {
      }
    };
  }

  // node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
  var types = { keyframes, spring, decay };
  function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
      return keyframes;
    } else if (types[config.type]) {
      return types[config.type];
    }
    const keys = new Set(Object.keys(config));
    if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
      return keyframes;
    } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
      return spring;
    }
    return keyframes;
  }

  // node_modules/framesync/dist/es/on-next-frame.mjs
  var defaultTimestep = 1 / 60 * 1e3;
  var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
  var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

  // node_modules/framesync/dist/es/create-render-step.mjs
  function createRenderStep(runNextFrame2) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing2 = false;
    let flushNextFrame = false;
    const toKeepAlive = /* @__PURE__ */ new WeakSet();
    const step = {
      schedule: (callback, keepAlive = false, immediate = false) => {
        const addToCurrentFrame = immediate && isProcessing2;
        const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
        if (keepAlive)
          toKeepAlive.add(callback);
        if (buffer.indexOf(callback) === -1) {
          buffer.push(callback);
          if (addToCurrentFrame && isProcessing2)
            numToRun = toRun.length;
        }
        return callback;
      },
      cancel: (callback) => {
        const index = toRunNextFrame.indexOf(callback);
        if (index !== -1)
          toRunNextFrame.splice(index, 1);
        toKeepAlive.delete(callback);
      },
      process: (frameData) => {
        if (isProcessing2) {
          flushNextFrame = true;
          return;
        }
        isProcessing2 = true;
        [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
        toRunNextFrame.length = 0;
        numToRun = toRun.length;
        if (numToRun) {
          for (let i4 = 0; i4 < numToRun; i4++) {
            const callback = toRun[i4];
            callback(frameData);
            if (toKeepAlive.has(callback)) {
              step.schedule(callback);
              runNextFrame2();
            }
          }
        }
        isProcessing2 = false;
        if (flushNextFrame) {
          flushNextFrame = false;
          step.process(frameData);
        }
      }
    };
    return step;
  }

  // node_modules/framesync/dist/es/index.mjs
  var maxElapsed = 40;
  var useDefaultElapsed = true;
  var runNextFrame = false;
  var isProcessing = false;
  var frame = {
    delta: 0,
    timestamp: 0
  };
  var stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender"
  ];
  var steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => runNextFrame = true);
    return acc;
  }, {});
  var sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        startLoop();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  var cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
  }, {});
  var flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(frame);
    return acc;
  }, {});
  var processStep = (stepId) => steps[stepId].process(frame);
  var processFrame = (timestamp) => {
    runNextFrame = false;
    frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
      useDefaultElapsed = false;
      onNextFrame(processFrame);
    }
  };
  var startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
      onNextFrame(processFrame);
  };
  var getFrameData = () => frame;
  var es_default = sync;

  // node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
  function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
  }
  function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
  }
  function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
  }

  // node_modules/popmotion/dist/es/animations/index.mjs
  var framesync = (update) => {
    const passTimestamp = ({ delta }) => update(delta);
    return {
      start: () => es_default.update(passTimestamp, true),
      stop: () => cancelSync.update(passTimestamp)
    };
  };
  function animate(_a) {
    var _b, _c;
    var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
    let { to } = options;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = options.duration;
    let latest;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
      interpolateFromNumber = interpolate([0, 100], [from, to], {
        clamp: false
      });
      from = 0;
      to = 100;
    }
    const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
    function repeat() {
      repeatCount++;
      if (repeatType === "reverse") {
        isForwardPlayback = repeatCount % 2 === 0;
        elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
      } else {
        elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
        if (repeatType === "mirror")
          animation.flipTarget();
      }
      isComplete = false;
      onRepeat && onRepeat();
    }
    function complete() {
      driverControls.stop();
      onComplete && onComplete();
    }
    function update(delta) {
      if (!isForwardPlayback)
        delta = -delta;
      elapsed += delta;
      if (!isComplete) {
        const state2 = animation.next(Math.max(0, elapsed));
        latest = state2.value;
        if (interpolateFromNumber)
          latest = interpolateFromNumber(latest);
        isComplete = isForwardPlayback ? state2.done : elapsed <= 0;
      }
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
      if (isComplete) {
        if (repeatCount === 0)
          computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
        if (repeatCount < repeatMax) {
          hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
        } else {
          complete();
        }
      }
    }
    function play() {
      onPlay === null || onPlay === void 0 ? void 0 : onPlay();
      driverControls = driver(update);
      driverControls.start();
    }
    autoplay && play();
    return {
      stop: () => {
        onStop === null || onStop === void 0 ? void 0 : onStop();
        driverControls.stop();
      }
    };
  }

  // node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
  function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1e3 / frameDuration) : 0;
  }

  // node_modules/popmotion/dist/es/animations/inertia.mjs
  function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
    let currentAnimation;
    function isOutOfBounds(v3) {
      return min !== void 0 && v3 < min || max !== void 0 && v3 > max;
    }
    function boundaryNearest(v3) {
      if (min === void 0)
        return max;
      if (max === void 0)
        return min;
      return Math.abs(min - v3) < Math.abs(max - v3) ? min : max;
    }
    function startAnimation(options) {
      currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
      currentAnimation = animate(Object.assign(Object.assign({}, options), {
        driver,
        onUpdate: (v3) => {
          var _a;
          onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v3);
          (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v3);
        },
        onComplete,
        onStop
      }));
    }
    function startSpring(options) {
      startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
    }
    if (isOutOfBounds(from)) {
      startSpring({ from, velocity, to: boundaryNearest(from) });
    } else {
      let target = power * velocity + from;
      if (typeof modifyTarget !== "undefined")
        target = modifyTarget(target);
      const boundary = boundaryNearest(target);
      const heading = boundary === min ? -1 : 1;
      let prev;
      let current;
      const checkBoundary = (v3) => {
        prev = current;
        current = v3;
        velocity = velocityPerSecond(v3 - prev, getFrameData().delta);
        if (heading === 1 && v3 > boundary || heading === -1 && v3 < boundary) {
          startSpring({ from: v3, to: boundary, velocity });
        }
      };
      startAnimation({
        type: "decay",
        from,
        velocity,
        timeConstant,
        power,
        restDelta,
        modifyTarget,
        onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
      });
    }
    return {
      stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
    };
  }

  // node_modules/@7c00/canvas-tilemap/src/gesture.ts
  var Average = class {
    constructor(length2 = 3) {
      this.count = 0;
      this.length = 0;
      this.data = [];
      this.length = length2;
    }
    add(value) {
      this.data[this.count % this.length] = value;
      this.count += 1;
    }
    clear() {
      this.data = Array(length);
    }
    get value() {
      const data = this.data.filter((i4) => i4 != void 0);
      if (data.length == 0)
        return 0;
      return data.reduce((value, i4) => value + i4, 0) / data.length;
    }
  };
  var Gesture3 = class {
    constructor(map) {
      this.initialScale = 0;
      this.lastPinchTime = 0;
      this.lastWheelTime = 0;
      this.lastClickTime = 0;
      this.lastDragTime = 0;
      this.scaleAnimation = inertia({});
      this.offsetAnimation = [inertia({}), inertia({})];
      this.velocity = [new Average(), new Average()];
      this.velocityScale = new Average();
      this.map = map;
      new Gesture(this.map.element, {
        onWheel: this.onWheel.bind(this),
        onPinchStart: () => this.initialScale = this.map.scale,
        onPinch: this.onPinch.bind(this),
        onPinchEnd: this.onPinchEnd.bind(this),
        onDragStart: this.onDragStart.bind(this),
        onDrag: this.onDrag.bind(this),
        onDragEnd: this.onDragEnd.bind(this),
        onClick: this.onClick.bind(this)
      });
    }
    onWheel({ direction, event, delta, timeStamp }) {
      if (timeStamp == this.lastWheelTime)
        return;
      this.offsetAnimation[0]?.stop();
      this.offsetAnimation[1]?.stop();
      this.scaleAnimation?.stop();
      this.lastWheelTime = timeStamp;
      const lastScale = this.map.scale;
      this.scaleAnimation = inertia({
        velocity: Math.log2(1 + Math.abs(delta[1]) / 200) / 2,
        power: 2,
        timeConstant: 50,
        restDelta: 1e-3,
        onUpdate: (value) => {
          const zoom = Math.log2(lastScale) - direction[1] * value;
          this.scaleTo(2 ** zoom, [event.x, event.y]);
        }
      });
    }
    onPinch(state2) {
      const { origin, da, initial, touches, timeStamp } = state2;
      if (touches != 2)
        return;
      this.lastPinchTime = timeStamp;
      const newScale = da[0] / initial[0] * this.initialScale;
      this.velocityScale.add(newScale - this.map.scale);
      this.scaleTo(newScale, origin);
    }
    onPinchEnd({ origin }) {
      const value = this.velocityScale.value;
      const direction = value > 0 ? -1 : 1;
      this.initialScale = this.map.scale;
      const velocity = Math.log10(1 + Math.abs(this.velocityScale.value)) * 50;
      this.scaleAnimation?.stop();
      this.scaleAnimation = inertia({
        velocity,
        timeConstant: 50,
        restDelta: 1e-3,
        onUpdate: (value2) => {
          const zoom = Math.log2(this.initialScale) - direction * value2;
          this.scaleTo(2 ** zoom, origin);
        }
      });
    }
    onDragStart() {
      this.offsetAnimation[0]?.stop();
      this.offsetAnimation[1]?.stop();
      this.scaleAnimation?.stop();
      this.velocity[0].clear();
      this.velocity[1].clear();
    }
    onDrag(state2) {
      const { pinching, wheeling, timeStamp, velocity, delta } = state2;
      if (pinching || wheeling || timeStamp - this.lastPinchTime < 200) {
        return;
      }
      this.velocity[0].add(velocity[0]);
      this.velocity[1].add(velocity[1]);
      this.setOffset([
        this.map.offset[0] + delta[0],
        this.map.offset[1] + delta[1]
      ]);
    }
    async onDragEnd(state2) {
      const { direction, timeStamp, distance } = state2;
      if (timeStamp - this.lastPinchTime < 200)
        return;
      const initialOffset = [...this.map.offset];
      const velocity = [this.velocity[0].value, this.velocity[1].value];
      const v3 = Math.sqrt(velocity[0] ** 2 + velocity[1] ** 2);
      if (v3 != 0) {
        this.offsetAnimation[0] = inertia({
          velocity: v3,
          power: 200,
          timeConstant: 200,
          onUpdate: (value) => {
            this.setOffset([
              initialOffset[0] + direction[0] * value * (velocity[0] / v3),
              initialOffset[1] + direction[1] * value * (velocity[1] / v3)
            ]);
          }
        });
      }
      if (distance[0] > 2 || distance[1] > 2) {
        this.lastDragTime = timeStamp;
      }
    }
    onClick({ event }) {
      if (event.timeStamp == this.lastDragTime)
        return;
      const doubleClickDelay = 200;
      if (event.timeStamp - this.lastClickTime < doubleClickDelay) {
        const lastScale = this.map.scale;
        this.scaleAnimation?.stop();
        this.scaleAnimation = inertia({
          velocity: 1,
          power: 1,
          timeConstant: 100,
          restDelta: 1e-3,
          onUpdate: (value) => {
            const zoom = Math.log2(lastScale) + value;
            this.scaleTo(2 ** zoom, [event.x, event.y]);
          }
        });
      } else {
        setTimeout(() => {
          if (event.timeStamp == this.lastClickTime) {
            this.onClickTilemap([event.x, event.y]);
          }
        }, doubleClickDelay);
      }
      this.lastClickTime = event.timeStamp;
    }
    onClickTilemap(position) {
      const result = this.map.findMarker(position);
      if (result) {
        result?.[0].options.onClick?.(result[1]);
        this.map.options.onClick?.({ target: result[0], index: result[1] });
        return;
      }
      this.map.options.onClick?.();
    }
    limitScale(newScale) {
      const { minZoom, options } = this.map;
      let zoom = Math.log2(newScale);
      zoom = Math.max(Math.min(zoom, options.maxZoom), minZoom);
      return 2 ** zoom;
    }
    scaleTo(newScale, origin) {
      const { offset, scale: scale2 } = this.map;
      newScale = this.limitScale(newScale);
      const ratio = (newScale - scale2) / scale2;
      this.map.scale = newScale;
      this.setOffset([
        offset[0] - (origin[0] - offset[0]) * ratio,
        offset[1] - (origin[1] - offset[1]) * ratio
      ]);
    }
    setOffset(value) {
      const { size, options, offset, scale: scale2 } = this.map;
      const max = [
        size[0] - options.size[0] * scale2,
        size[1] - options.size[1] * scale2
      ];
      offset[0] = Math.min(Math.max(value[0], max[0]), 0);
      offset[1] = Math.min(Math.max(value[1], max[1]), 0);
      this.map.draw();
    }
  };

  // node_modules/@7c00/canvas-tilemap/src/tilemap.ts
  var Layer = class {
  };
  var Tilemap = class {
    constructor(options) {
      this.offset = [0, 0];
      this.scale = 0;
      this.minZoom = 0;
      this.size = [0, 0];
      this.tileLayers = /* @__PURE__ */ new Set();
      this.markerLayers = /* @__PURE__ */ new Set();
      this.domLayers = /* @__PURE__ */ new Set();
      this.imageLayers = /* @__PURE__ */ new Set();
      this.lastDrawTime = 0;
      this.options = {
        ...options,
        tileOffset: options.tileOffset ?? [0, 0],
        maxZoom: options.maxZoom ?? 0
      };
      if (typeof options.element == "string") {
        this.element = document.querySelector(options.element);
      } else {
        this.element = options.element;
      }
      this.element.style.touchAction = "none";
      this.canvas = document.createElement("canvas");
      this.element.appendChild(this.canvas);
      this.canvas2d = this.canvas.getContext("2d");
      this.gesture = new Gesture3(this);
      const resizeObserver = new ResizeObserver(([entry]) => {
        const { width, height } = entry.contentRect;
        setTimeout(() => this.resize(width, height), 0);
      });
      resizeObserver.observe(this.element);
      this.element.addEventListener("mousemove", ({ clientX, clientY }) => {
        const result = this.findMarker([clientX, clientY]);
        if (result) {
          result?.[0].options.onMouseMove?.(result[1]);
          this.options.onMouseMove?.({ target: result[0], index: result[1] });
          return;
        }
        this.options.onMouseMove?.();
      });
      this.domLayers.clear = new Proxy(this.domLayers.clear, {
        apply: (target, thisArg) => {
          for (const i4 of thisArg.values()) {
            this.element.removeChild(i4.element);
          }
          return target.apply(thisArg);
        }
      });
      this.domLayers.delete = new Proxy(this.domLayers.delete, {
        apply: (target, thisArg, argArray) => {
          this.element.removeChild(argArray[0].element);
          return target.apply(thisArg, argArray);
        }
      });
    }
    findMarker(point) {
      const markerLayers = Array.from(this.markerLayers).reverse();
      for (const marker of markerLayers) {
        const { image, positions, anchor } = marker.options;
        const size = [image.width, image.height];
        size[0] /= devicePixelRatio;
        size[1] /= devicePixelRatio;
        for (let index = positions.length - 1; index >= 0; index -= 1) {
          let [x4, y4] = this.toCanvasPositionWithOffset(positions[index]);
          const centerOffset = [size[0] * anchor[0], size[1] * anchor[1]];
          if (point[0] > x4 - centerOffset[0] && point[0] < x4 + (size[0] - centerOffset[0]) && point[1] > y4 - centerOffset[1] && point[1] < y4 + (size[0] - centerOffset[0])) {
            return [marker, index];
          }
        }
      }
    }
    toCanvasPositionWithOffset(position) {
      const { offset } = this;
      let [x4, y4] = this.toCanvasPosition(position);
      return [x4 + offset[0], y4 + offset[1]];
    }
    toCanvasPosition([x4, y4]) {
      const [px2, py] = this.mapPointOffset;
      return [(x4 + px2) * this.scale, (y4 + py) * this.scale];
    }
    overlaps(position, size) {
      if (position[0] + size[0] > -this.offset[0] && position[0] < this.size[0] - this.offset[0] && position[1] + size[1] > -this.offset[1] && position[1] < this.size[1] - this.offset[1]) {
        return true;
      }
      return false;
    }
    get mapPointOffset() {
      const { origin, tileOffset } = this.options;
      return [origin[0] - tileOffset[0], origin[1] - tileOffset[1]];
    }
    resize(width, height) {
      this.canvas.width = width * devicePixelRatio;
      this.canvas.height = height * devicePixelRatio;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
      this.size = [width, height];
      const minScale = Math.max(
        this.size[0] / this.options.size[0],
        this.size[1] / this.options.size[1]
      );
      const minZoom = Math.log2(minScale);
      if (!this.scale) {
        this.minZoom = minZoom;
        this.scale = this.gesture.limitScale(minScale);
        this.draw();
      } else if (this.minZoom != minZoom) {
        this.minZoom = minZoom;
        this.gesture.scaleTo(this.scale, [this.size[0] / 2, this.size[1] / 2]);
      }
    }
    draw() {
      const now = Date.now();
      if (now != this.lastDrawTime) {
        requestAnimationFrame(() => {
          const { canvas2d, canvas, offset } = this;
          canvas2d.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
          canvas2d.clearRect(0, 0, canvas.width, canvas.height);
          canvas2d.translate(offset[0], offset[1]);
          for (const layer of this.tileLayers) {
            layer.draw();
          }
          for (const layer of this.imageLayers) {
            layer.draw();
          }
          for (const layer of this.markerLayers) {
            layer.draw();
          }
          for (const layer of this.domLayers) {
            layer.draw();
          }
        });
        this.lastDrawTime = now;
      }
    }
  };

  // node_modules/@7c00/canvas-tilemap/src/utils.ts
  function safeCeil(n3) {
    return Math.ceil(parseFloat(n3.toFixed(3)));
  }

  // node_modules/@7c00/canvas-tilemap/src/tile-layer.ts
  var TileLayer = class extends Layer {
    constructor(map, options) {
      super();
      this.tiles = {};
      this.images = {};
      this.map = map;
      this.options = {
        ...options,
        tileSize: options.tileSize ?? 256
      };
      const { size: mapSize, tileOffset } = map.options;
      const { minZoom, maxZoom, tileSize } = this.options;
      for (let z4 = minZoom; z4 <= maxZoom; z4 += 1) {
        const imageSize = tileSize * 2 ** (maxZoom - z4);
        const row = safeCeil(mapSize[1] / imageSize);
        const col = safeCeil(mapSize[0] / imageSize);
        const offset = [
          Math.floor(tileOffset[0] / imageSize),
          Math.floor(tileOffset[1] / imageSize)
        ];
        const tiles = [];
        for (let y4 = 0; y4 < row; y4 += 1) {
          tiles[y4] = [];
          for (let x4 = 0; x4 < col; x4 += 1) {
            const url = options.getTileUrl(x4 + offset[0], y4 + offset[1], z4);
            tiles[y4][x4] = url;
          }
        }
        this.tiles[z4] = tiles;
      }
      for (const tiles of this.tiles[minZoom]) {
        for (const url of tiles) {
          const image = new Image();
          image.src = url;
          image.addEventListener("load", () => {
            this.images[url] = image;
            this.map.draw();
          });
        }
      }
    }
    draw() {
      const { minZoom, maxZoom } = this.options;
      this.drawTiles(minZoom);
      let zoom = maxZoom + Math.log2(this.map.scale);
      zoom = safeCeil(Math.min(Math.max(zoom, minZoom), maxZoom));
      if (zoom > minZoom) {
        this.drawTiles(zoom);
      }
    }
    drawTiles(z4) {
      const tiles = this.tiles[z4];
      const { scale: scale2, offset, size, options } = this.map;
      const tileSize = this.options.tileSize * 2 ** (this.options.maxZoom - z4);
      const imageSize = tileSize * scale2;
      const dx = options.size[0] % tileSize * scale2;
      const startX = Math.floor(-offset[0] / imageSize);
      const endX = safeCeil((size[0] - offset[0] + dx) / imageSize);
      const startY = Math.floor(-offset[1] / imageSize);
      const endY = safeCeil((size[1] - offset[1]) / imageSize);
      for (let y4 = startY; y4 < endY; y4 += 1) {
        for (let x4 = startX; x4 < endX; x4 += 1) {
          const url = tiles[y4][x4];
          const image = this.images[tiles[y4][x4]];
          if (image) {
            this.map.canvas2d.drawImage(
              image,
              imageSize * x4 - dx,
              imageSize * y4,
              imageSize,
              imageSize
            );
          } else {
            const image2 = new Image();
            image2.src = url;
            image2.addEventListener("load", () => {
              this.images[url] = image2;
            });
          }
        }
      }
    }
  };

  // src/api.ts
  async function api(path, params = {}) {
    const response = await fetch(`https://cloud.yuanshen.site/api/${path}`, {
      method: "post",
      body: JSON.stringify(params),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${store.accessToken}`
      }
    });
    return (await response.json())["data"];
  }
  async function fetchAccessToken() {
    const headers = { authorization: "Basic Y2xpZW50OnNlY3JldA==" };
    const response = await fetch(
      "https://cloud.yuanshen.site/oauth/token?scope=all&grant_type=client_credentials",
      { method: "post", headers }
    );
    return (await response.json())["access_token"];
  }

  // src/maps-config.ts
  var teyvatMapConfig = {
    size: [17408, 16384],
    origin: [3568, 6286],
    tileOffset: [-5120, 0],
    maxZoom: 0.5,
    getTileUrl(x4, y4, z4) {
      return `https://assets.yuanshen.site/tiles_twt34/${z4}/${x4}_${y4}.png`;
    }
  };

  // src/store.ts
  var tilemap;
  var teleportNames = ["\u4F20\u9001\u951A\u70B9", "\u4E03\u5929\u795E\u50CF", "\u79D8\u5883", "\u5F81\u8BA8\u9886\u57DF"];
  var store = proxy({
    accessToken: "",
    topAreaList: [],
    areaMap: {},
    activeTopArea: null,
    activeSubArea: null,
    itemTypeMap: {},
    isDrawerOpen: true,
    iconMap: {},
    teleports: []
  });
  async function init() {
    store.accessToken = await fetchAccessToken();
    initIconMap();
    initItemTypes();
    await initAreaList();
    fetchAreaItems();
  }
  async function initAreaList() {
    const areaList = await api("area/get/list", {
      isTraverse: true,
      parentId: -1
    });
    for (const area of areaList) {
      area.children = [];
      store.areaMap[area.areaId] = area;
      if (area.parentId == -1) {
        store.topAreaList.push(store.areaMap[area.areaId]);
      } else {
        store.areaMap[area.parentId].children.push(store.areaMap[area.areaId]);
      }
    }
    store.activeTopArea = store.topAreaList[0];
    store.activeSubArea = store.activeTopArea.children[0];
  }
  async function initIconMap() {
    const { record } = await api("icon/get/list", { size: 1e3 });
    for (const i4 of record) {
      store.iconMap[i4.name] = i4.url;
    }
  }
  async function initItemTypes() {
    const { record } = await api("item_type/get/list/1");
    for (const i4 of record) {
      i4.items = [];
      store.itemTypeMap[i4.typeId] = i4;
    }
  }
  async function fetchAreaItems() {
    store.teleports = [];
    const { record } = await api("item/get/list", {
      areaIdList: [store.activeSubArea.areaId],
      size: 1e3
    });
    for (const item of record) {
      for (const typeId of item.typeIdList) {
        const itemType = store.itemTypeMap[typeId];
        if (itemType) {
          itemType.items.push(item);
        } else {
        }
      }
      if (teleportNames.includes(item.name)) {
        store.teleports.push(item);
      }
    }
    fetchMarkers(store.teleports);
  }
  async function fetchMarkers(items) {
    const markersMap = {};
    const markers = await api("marker/get/list_byinfo", {
      itemIdList: items.map((i4) => i4.itemId)
    });
    for (const i4 of markers) {
    }
    console.log(markers);
  }
  function initTilemap(element) {
    if (!element)
      return;
    tilemap = new Tilemap({ element, ...teyvatMapConfig });
    tilemap.tileLayers.add(
      new TileLayer(tilemap, {
        minZoom: 10,
        maxZoom: 13,
        getTileUrl: teyvatMapConfig.getTileUrl
      })
    );
  }
  function toggleDrawer() {
    store.isDrawerOpen = !store.isDrawerOpen;
  }

  // src/drawer.tsx
  var state = proxy({ selected: proxySet() });
  function Drawer() {
    const { isDrawerOpen } = useSnapshot(store);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex flex-col w-72 h-full absolute top-2 right-2 duration-300 ease-out",
        style: {
          height: "calc(100% - 1rem)",
          transform: `translate(${isDrawerOpen ? 0 : 18}rem, 0)`
        }
      },
      /* @__PURE__ */ React.createElement(ToggleButton, null),
      /* @__PURE__ */ React.createElement("img", { className: "w-full relative top-1", src: drawer_bg_top_default }),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "flex-1",
          style: { background: `url(${drawer_bg_content_default}) center / 100%` }
        }
      ),
      /* @__PURE__ */ React.createElement("img", { className: "w-full relative -top-1", src: drawer_bg_bottom_default }),
      /* @__PURE__ */ React.createElement("div", { className: "absolute w-full h-full pt-2.5 pl-5 pr-3 pb-11 box-border" }, /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "rounded w-60 mx-auto h-2.5 shadow relative top-1",
          style: { backgroundColor: "#B6A9A3" }
        }
      ), /* @__PURE__ */ React.createElement(ItemTypes, null))
    );
  }
  function ToggleButton() {
    const { isDrawerOpen } = useSnapshot(store);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute -z-10 top-2 -left-11 h-8 w-14 bg-contain bg-right bg-no-repeat",
        style: { backgroundImage: `url(${drawer_button_default})` },
        onClick: toggleDrawer
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: (0, import_classnames.default)(
            "h-5 w-5 mt-1.5 ml-6 bg-cover duration-300 ease-out",
            !isDrawerOpen && "rotate-180"
          ),
          style: { backgroundImage: `url(${drawer_arrow_default})` }
        }
      )
    );
  }
  function ItemTypes() {
    const { itemTypeMap } = useSnapshot(store);
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "rounded w-full h-full shadow relative overflow-y-auto",
        style: { backgroundColor: "#f2f0eb" }
      },
      Object.values(itemTypeMap).map((i4) => /* @__PURE__ */ React.createElement(TypeItem, { itemType: i4 }))
    );
  }
  function TypeItem(props) {
    const { iconMap } = useSnapshot(store);
    const { selected } = useSnapshot(state);
    const { name, iconTag, typeId, items } = props.itemType;
    const isSelected = selected.has(typeId);
    const icon = iconMap[iconTag || `icon_${name}`];
    const height = 2.5 * Math.ceil(items.length / 2) + 0.5;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "m-2 p-2 bg-white rounded",
        onClick: () => {
          if (isSelected) {
            state.selected.delete(typeId);
          } else {
            state.selected.add(typeId);
          }
        }
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("img", { src: icon, className: "w-6 h-6 mr-2" }), /* @__PURE__ */ React.createElement("div", { className: "flex-1" }, name), /* @__PURE__ */ React.createElement(
        "div",
        {
          className: (0, import_classnames.default)(
            "text-sm duration-300 ease-out",
            !isSelected && "rotate-180"
          ),
          style: { color: "#b6a9a3" }
        },
        "\u25B2"
      )),
      /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "overflow-hidden duration-300 ease-out",
          style: { height: `${isSelected ? height : 0}rem` }
        },
        /* @__PURE__ */ React.createElement("div", { className: "h-2" }),
        /* @__PURE__ */ React.createElement(Items, { items, isSelected })
      )
    );
  }
  function Items(props) {
    return /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 gap-x-1" }, props.items.map((i4) => {
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          className: "text-xs text-gray-700 mt-1",
          style: { background: "#f6f6f6" },
          onClick: (event) => {
            event.stopPropagation();
          }
        },
        /* @__PURE__ */ React.createElement("div", { className: "flex" }, props.isSelected && /* @__PURE__ */ React.createElement(
          "img",
          {
            className: "w-9 h-9 bg-black/10 box-border p-1 mr-1",
            src: store.iconMap[i4.iconTag]
          }
        ), /* @__PURE__ */ React.createElement("div", { className: "flex flex-1 flex-col justify-center overflow-hidden" }, /* @__PURE__ */ React.createElement("div", { className: "whitespace-nowrap text-ellipsis overflow-hidden" }, i4.name), /* @__PURE__ */ React.createElement("div", { className: "text-gray-400" }, i4.count)))
      );
    }));
  }

  // src/index.tsx
  function Main() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { ref: initTilemap, className: "h-full w-full absolute" }), /* @__PURE__ */ React.createElement(Drawer, null));
  }
  init();
  (0, import_react_dom.render)(/* @__PURE__ */ React.createElement(Main, null), document.getElementById("main"));
})();
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

use-sync-external-store/cjs/use-sync-external-store-shim.development.js:
  (**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
