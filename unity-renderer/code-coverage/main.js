/* Chartist.js 0.11.0
 * Copyright © 2017 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */

!function (a, b) { "function" == typeof define && define.amd ? define("Chartist", [], function () { return a.Chartist = b() }) : "object" == typeof module && module.exports ? module.exports = b() : a.Chartist = b() }(this, function () {
    var a = { version: "0.11.0" }; return function (a, b, c) { "use strict"; c.namespaces = { svg: "http://www.w3.org/2000/svg", xmlns: "http://www.w3.org/2000/xmlns/", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", ct: "http://gionkunz.github.com/chartist-js/ct" }, c.noop = function (a) { return a }, c.alphaNumerate = function (a) { return String.fromCharCode(97 + a % 26) }, c.extend = function (a) { var b, d, e; for (a = a || {}, b = 1; b < arguments.length; b++) { d = arguments[b]; for (var f in d) e = d[f], "object" != typeof e || null === e || e instanceof Array ? a[f] = e : a[f] = c.extend(a[f], e) } return a }, c.replaceAll = function (a, b, c) { return a.replace(new RegExp(b, "g"), c) }, c.ensureUnit = function (a, b) { return "number" == typeof a && (a += b), a }, c.quantity = function (a) { if ("string" == typeof a) { var b = /^(\d+)\s*(.*)$/g.exec(a); return { value: +b[1], unit: b[2] || void 0 } } return { value: a } }, c.querySelector = function (a) { return a instanceof Node ? a : b.querySelector(a) }, c.times = function (a) { return Array.apply(null, new Array(a)) }, c.sum = function (a, b) { return a + (b ? b : 0) }, c.mapMultiply = function (a) { return function (b) { return b * a } }, c.mapAdd = function (a) { return function (b) { return b + a } }, c.serialMap = function (a, b) { var d = [], e = Math.max.apply(null, a.map(function (a) { return a.length })); return c.times(e).forEach(function (c, e) { var f = a.map(function (a) { return a[e] }); d[e] = b.apply(null, f) }), d }, c.roundWithPrecision = function (a, b) { var d = Math.pow(10, b || c.precision); return Math.round(a * d) / d }, c.precision = 8, c.escapingMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }, c.serialize = function (a) { return null === a || void 0 === a ? a : ("number" == typeof a ? a = "" + a : "object" == typeof a && (a = JSON.stringify({ data: a })), Object.keys(c.escapingMap).reduce(function (a, b) { return c.replaceAll(a, b, c.escapingMap[b]) }, a)) }, c.deserialize = function (a) { if ("string" != typeof a) return a; a = Object.keys(c.escapingMap).reduce(function (a, b) { return c.replaceAll(a, c.escapingMap[b], b) }, a); try { a = JSON.parse(a), a = void 0 !== a.data ? a.data : a } catch (b) { } return a }, c.createSvg = function (a, b, d, e) { var f; return b = b || "100%", d = d || "100%", Array.prototype.slice.call(a.querySelectorAll("svg")).filter(function (a) { return a.getAttributeNS(c.namespaces.xmlns, "ct") }).forEach(function (b) { a.removeChild(b) }), f = new c.Svg("svg").attr({ width: b, height: d }).addClass(e), f._node.style.width = b, f._node.style.height = d, a.appendChild(f._node), f }, c.normalizeData = function (a, b, d) { var e, f = { raw: a, normalized: {} }; return f.normalized.series = c.getDataArray({ series: a.series || [] }, b, d), e = f.normalized.series.every(function (a) { return a instanceof Array }) ? Math.max.apply(null, f.normalized.series.map(function (a) { return a.length })) : f.normalized.series.length, f.normalized.labels = (a.labels || []).slice(), Array.prototype.push.apply(f.normalized.labels, c.times(Math.max(0, e - f.normalized.labels.length)).map(function () { return "" })), b && c.reverseData(f.normalized), f }, c.safeHasProperty = function (a, b) { return null !== a && "object" == typeof a && a.hasOwnProperty(b) }, c.isDataHoleValue = function (a) { return null === a || void 0 === a || "number" == typeof a && isNaN(a) }, c.reverseData = function (a) { a.labels.reverse(), a.series.reverse(); for (var b = 0; b < a.series.length; b++)"object" == typeof a.series[b] && void 0 !== a.series[b].data ? a.series[b].data.reverse() : a.series[b] instanceof Array && a.series[b].reverse() }, c.getDataArray = function (a, b, d) { function e(a) { if (c.safeHasProperty(a, "value")) return e(a.value); if (c.safeHasProperty(a, "data")) return e(a.data); if (a instanceof Array) return a.map(e); if (!c.isDataHoleValue(a)) { if (d) { var b = {}; return "string" == typeof d ? b[d] = c.getNumberOrUndefined(a) : b.y = c.getNumberOrUndefined(a), b.x = a.hasOwnProperty("x") ? c.getNumberOrUndefined(a.x) : b.x, b.y = a.hasOwnProperty("y") ? c.getNumberOrUndefined(a.y) : b.y, b } return c.getNumberOrUndefined(a) } } return a.series.map(e) }, c.normalizePadding = function (a, b) { return b = b || 0, "number" == typeof a ? { top: a, right: a, bottom: a, left: a } : { top: "number" == typeof a.top ? a.top : b, right: "number" == typeof a.right ? a.right : b, bottom: "number" == typeof a.bottom ? a.bottom : b, left: "number" == typeof a.left ? a.left : b } }, c.getMetaData = function (a, b) { var c = a.data ? a.data[b] : a[b]; return c ? c.meta : void 0 }, c.orderOfMagnitude = function (a) { return Math.floor(Math.log(Math.abs(a)) / Math.LN10) }, c.projectLength = function (a, b, c) { return b / c.range * a }, c.getAvailableHeight = function (a, b) { return Math.max((c.quantity(b.height).value || a.height()) - (b.chartPadding.top + b.chartPadding.bottom) - b.axisX.offset, 0) }, c.getHighLow = function (a, b, d) { function e(a) { if (void 0 !== a) if (a instanceof Array) for (var b = 0; b < a.length; b++)e(a[b]); else { var c = d ? +a[d] : +a; g && c > f.high && (f.high = c), h && c < f.low && (f.low = c) } } b = c.extend({}, b, d ? b["axis" + d.toUpperCase()] : {}); var f = { high: void 0 === b.high ? -Number.MAX_VALUE : +b.high, low: void 0 === b.low ? Number.MAX_VALUE : +b.low }, g = void 0 === b.high, h = void 0 === b.low; return (g || h) && e(a), (b.referenceValue || 0 === b.referenceValue) && (f.high = Math.max(b.referenceValue, f.high), f.low = Math.min(b.referenceValue, f.low)), f.high <= f.low && (0 === f.low ? f.high = 1 : f.low < 0 ? f.high = 0 : f.high > 0 ? f.low = 0 : (f.high = 1, f.low = 0)), f }, c.isNumeric = function (a) { return null !== a && isFinite(a) }, c.isFalseyButZero = function (a) { return !a && 0 !== a }, c.getNumberOrUndefined = function (a) { return c.isNumeric(a) ? +a : void 0 }, c.isMultiValue = function (a) { return "object" == typeof a && ("x" in a || "y" in a) }, c.getMultiValue = function (a, b) { return c.isMultiValue(a) ? c.getNumberOrUndefined(a[b || "y"]) : c.getNumberOrUndefined(a) }, c.rho = function (a) { function b(a, c) { return a % c === 0 ? c : b(c, a % c) } function c(a) { return a * a + 1 } if (1 === a) return a; var d, e = 2, f = 2; if (a % 2 === 0) return 2; do e = c(e) % a, f = c(c(f)) % a, d = b(Math.abs(e - f), a); while (1 === d); return d }, c.getBounds = function (a, b, d, e) { function f(a, b) { return a === (a += b) && (a *= 1 + (b > 0 ? o : -o)), a } var g, h, i, j = 0, k = { high: b.high, low: b.low }; k.valueRange = k.high - k.low, k.oom = c.orderOfMagnitude(k.valueRange), k.step = Math.pow(10, k.oom), k.min = Math.floor(k.low / k.step) * k.step, k.max = Math.ceil(k.high / k.step) * k.step, k.range = k.max - k.min, k.numberOfSteps = Math.round(k.range / k.step); var l = c.projectLength(a, k.step, k), m = l < d, n = e ? c.rho(k.range) : 0; if (e && c.projectLength(a, 1, k) >= d) k.step = 1; else if (e && n < k.step && c.projectLength(a, n, k) >= d) k.step = n; else for (; ;) { if (m && c.projectLength(a, k.step, k) <= d) k.step *= 2; else { if (m || !(c.projectLength(a, k.step / 2, k) >= d)) break; if (k.step /= 2, e && k.step % 1 !== 0) { k.step *= 2; break } } if (j++ > 1e3) throw new Error("Exceeded maximum number of iterations while optimizing scale step!") } var o = 2.221e-16; for (k.step = Math.max(k.step, o), h = k.min, i = k.max; h + k.step <= k.low;)h = f(h, k.step); for (; i - k.step >= k.high;)i = f(i, -k.step); k.min = h, k.max = i, k.range = k.max - k.min; var p = []; for (g = k.min; g <= k.max; g = f(g, k.step)) { var q = c.roundWithPrecision(g); q !== p[p.length - 1] && p.push(q) } return k.values = p, k }, c.polarToCartesian = function (a, b, c, d) { var e = (d - 90) * Math.PI / 180; return { x: a + c * Math.cos(e), y: b + c * Math.sin(e) } }, c.createChartRect = function (a, b, d) { var e = !(!b.axisX && !b.axisY), f = e ? b.axisY.offset : 0, g = e ? b.axisX.offset : 0, h = a.width() || c.quantity(b.width).value || 0, i = a.height() || c.quantity(b.height).value || 0, j = c.normalizePadding(b.chartPadding, d); h = Math.max(h, f + j.left + j.right), i = Math.max(i, g + j.top + j.bottom); var k = { padding: j, width: function () { return this.x2 - this.x1 }, height: function () { return this.y1 - this.y2 } }; return e ? ("start" === b.axisX.position ? (k.y2 = j.top + g, k.y1 = Math.max(i - j.bottom, k.y2 + 1)) : (k.y2 = j.top, k.y1 = Math.max(i - j.bottom - g, k.y2 + 1)), "start" === b.axisY.position ? (k.x1 = j.left + f, k.x2 = Math.max(h - j.right, k.x1 + 1)) : (k.x1 = j.left, k.x2 = Math.max(h - j.right - f, k.x1 + 1))) : (k.x1 = j.left, k.x2 = Math.max(h - j.right, k.x1 + 1), k.y2 = j.top, k.y1 = Math.max(i - j.bottom, k.y2 + 1)), k }, c.createGrid = function (a, b, d, e, f, g, h, i) { var j = {}; j[d.units.pos + "1"] = a, j[d.units.pos + "2"] = a, j[d.counterUnits.pos + "1"] = e, j[d.counterUnits.pos + "2"] = e + f; var k = g.elem("line", j, h.join(" ")); i.emit("draw", c.extend({ type: "grid", axis: d, index: b, group: g, element: k }, j)) }, c.createGridBackground = function (a, b, c, d) { var e = a.elem("rect", { x: b.x1, y: b.y2, width: b.width(), height: b.height() }, c, !0); d.emit("draw", { type: "gridBackground", group: a, element: e }) }, c.createLabel = function (a, d, e, f, g, h, i, j, k, l, m) { var n, o = {}; if (o[g.units.pos] = a + i[g.units.pos], o[g.counterUnits.pos] = i[g.counterUnits.pos], o[g.units.len] = d, o[g.counterUnits.len] = Math.max(0, h - 10), l) { var p = b.createElement("span"); p.className = k.join(" "), p.setAttribute("xmlns", c.namespaces.xhtml), p.innerText = f[e], p.style[g.units.len] = Math.round(o[g.units.len]) + "px", p.style[g.counterUnits.len] = Math.round(o[g.counterUnits.len]) + "px", n = j.foreignObject(p, c.extend({ style: "overflow: visible;" }, o)) } else n = j.elem("text", o, k.join(" ")).text(f[e]); m.emit("draw", c.extend({ type: "label", axis: g, index: e, group: j, element: n, text: f[e] }, o)) }, c.getSeriesOption = function (a, b, c) { if (a.name && b.series && b.series[a.name]) { var d = b.series[a.name]; return d.hasOwnProperty(c) ? d[c] : b[c] } return b[c] }, c.optionsProvider = function (b, d, e) { function f(b) { var f = h; if (h = c.extend({}, j), d) for (i = 0; i < d.length; i++) { var g = a.matchMedia(d[i][0]); g.matches && (h = c.extend(h, d[i][1])) } e && b && e.emit("optionsChanged", { previousOptions: f, currentOptions: h }) } function g() { k.forEach(function (a) { a.removeListener(f) }) } var h, i, j = c.extend({}, b), k = []; if (!a.matchMedia) throw "window.matchMedia not found! Make sure you're using a polyfill."; if (d) for (i = 0; i < d.length; i++) { var l = a.matchMedia(d[i][0]); l.addListener(f), k.push(l) } return f(), { removeMediaQueryListeners: g, getCurrentOptions: function () { return c.extend({}, h) } } }, c.splitIntoSegments = function (a, b, d) { var e = { increasingX: !1, fillHoles: !1 }; d = c.extend({}, e, d); for (var f = [], g = !0, h = 0; h < a.length; h += 2)void 0 === c.getMultiValue(b[h / 2].value) ? d.fillHoles || (g = !0) : (d.increasingX && h >= 2 && a[h] <= a[h - 2] && (g = !0), g && (f.push({ pathCoordinates: [], valueData: [] }), g = !1), f[f.length - 1].pathCoordinates.push(a[h], a[h + 1]), f[f.length - 1].valueData.push(b[h / 2])); return f } }(window, document, a), function (a, b, c) { "use strict"; c.Interpolation = {}, c.Interpolation.none = function (a) { var b = { fillHoles: !1 }; return a = c.extend({}, b, a), function (b, d) { for (var e = new c.Svg.Path, f = !0, g = 0; g < b.length; g += 2) { var h = b[g], i = b[g + 1], j = d[g / 2]; void 0 !== c.getMultiValue(j.value) ? (f ? e.move(h, i, !1, j) : e.line(h, i, !1, j), f = !1) : a.fillHoles || (f = !0) } return e } }, c.Interpolation.simple = function (a) { var b = { divisor: 2, fillHoles: !1 }; a = c.extend({}, b, a); var d = 1 / Math.max(1, a.divisor); return function (b, e) { for (var f, g, h, i = new c.Svg.Path, j = 0; j < b.length; j += 2) { var k = b[j], l = b[j + 1], m = (k - f) * d, n = e[j / 2]; void 0 !== n.value ? (void 0 === h ? i.move(k, l, !1, n) : i.curve(f + m, g, k - m, l, k, l, !1, n), f = k, g = l, h = n) : a.fillHoles || (f = k = h = void 0) } return i } }, c.Interpolation.cardinal = function (a) { var b = { tension: 1, fillHoles: !1 }; a = c.extend({}, b, a); var d = Math.min(1, Math.max(0, a.tension)), e = 1 - d; return function f(b, g) { var h = c.splitIntoSegments(b, g, { fillHoles: a.fillHoles }); if (h.length) { if (h.length > 1) { var i = []; return h.forEach(function (a) { i.push(f(a.pathCoordinates, a.valueData)) }), c.Svg.Path.join(i) } if (b = h[0].pathCoordinates, g = h[0].valueData, b.length <= 4) return c.Interpolation.none()(b, g); for (var j, k = (new c.Svg.Path).move(b[0], b[1], !1, g[0]), l = 0, m = b.length; m - 2 * !j > l; l += 2) { var n = [{ x: +b[l - 2], y: +b[l - 1] }, { x: +b[l], y: +b[l + 1] }, { x: +b[l + 2], y: +b[l + 3] }, { x: +b[l + 4], y: +b[l + 5] }]; j ? l ? m - 4 === l ? n[3] = { x: +b[0], y: +b[1] } : m - 2 === l && (n[2] = { x: +b[0], y: +b[1] }, n[3] = { x: +b[2], y: +b[3] }) : n[0] = { x: +b[m - 2], y: +b[m - 1] } : m - 4 === l ? n[3] = n[2] : l || (n[0] = { x: +b[l], y: +b[l + 1] }), k.curve(d * (-n[0].x + 6 * n[1].x + n[2].x) / 6 + e * n[2].x, d * (-n[0].y + 6 * n[1].y + n[2].y) / 6 + e * n[2].y, d * (n[1].x + 6 * n[2].x - n[3].x) / 6 + e * n[2].x, d * (n[1].y + 6 * n[2].y - n[3].y) / 6 + e * n[2].y, n[2].x, n[2].y, !1, g[(l + 2) / 2]) } return k } return c.Interpolation.none()([]) } }, c.Interpolation.monotoneCubic = function (a) { var b = { fillHoles: !1 }; return a = c.extend({}, b, a), function d(b, e) { var f = c.splitIntoSegments(b, e, { fillHoles: a.fillHoles, increasingX: !0 }); if (f.length) { if (f.length > 1) { var g = []; return f.forEach(function (a) { g.push(d(a.pathCoordinates, a.valueData)) }), c.Svg.Path.join(g) } if (b = f[0].pathCoordinates, e = f[0].valueData, b.length <= 4) return c.Interpolation.none()(b, e); var h, i, j = [], k = [], l = b.length / 2, m = [], n = [], o = [], p = []; for (h = 0; h < l; h++)j[h] = b[2 * h], k[h] = b[2 * h + 1]; for (h = 0; h < l - 1; h++)o[h] = k[h + 1] - k[h], p[h] = j[h + 1] - j[h], n[h] = o[h] / p[h]; for (m[0] = n[0], m[l - 1] = n[l - 2], h = 1; h < l - 1; h++)0 === n[h] || 0 === n[h - 1] || n[h - 1] > 0 != n[h] > 0 ? m[h] = 0 : (m[h] = 3 * (p[h - 1] + p[h]) / ((2 * p[h] + p[h - 1]) / n[h - 1] + (p[h] + 2 * p[h - 1]) / n[h]), isFinite(m[h]) || (m[h] = 0)); for (i = (new c.Svg.Path).move(j[0], k[0], !1, e[0]), h = 0; h < l - 1; h++)i.curve(j[h] + p[h] / 3, k[h] + m[h] * p[h] / 3, j[h + 1] - p[h] / 3, k[h + 1] - m[h + 1] * p[h] / 3, j[h + 1], k[h + 1], !1, e[h + 1]); return i } return c.Interpolation.none()([]) } }, c.Interpolation.step = function (a) { var b = { postpone: !0, fillHoles: !1 }; return a = c.extend({}, b, a), function (b, d) { for (var e, f, g, h = new c.Svg.Path, i = 0; i < b.length; i += 2) { var j = b[i], k = b[i + 1], l = d[i / 2]; void 0 !== l.value ? (void 0 === g ? h.move(j, k, !1, l) : (a.postpone ? h.line(j, f, !1, g) : h.line(e, k, !1, l), h.line(j, k, !1, l)), e = j, f = k, g = l) : a.fillHoles || (e = f = g = void 0) } return h } } }(window, document, a), function (a, b, c) { "use strict"; c.EventEmitter = function () { function a(a, b) { d[a] = d[a] || [], d[a].push(b) } function b(a, b) { d[a] && (b ? (d[a].splice(d[a].indexOf(b), 1), 0 === d[a].length && delete d[a]) : delete d[a]) } function c(a, b) { d[a] && d[a].forEach(function (a) { a(b) }), d["*"] && d["*"].forEach(function (c) { c(a, b) }) } var d = []; return { addEventHandler: a, removeEventHandler: b, emit: c } } }(window, document, a), function (a, b, c) { "use strict"; function d(a) { var b = []; if (a.length) for (var c = 0; c < a.length; c++)b.push(a[c]); return b } function e(a, b) { var d = b || this.prototype || c.Class, e = Object.create(d); c.Class.cloneDefinitions(e, a); var f = function () { var a, b = e.constructor || function () { }; return a = this === c ? Object.create(e) : this, b.apply(a, Array.prototype.slice.call(arguments, 0)), a }; return f.prototype = e, f["super"] = d, f.extend = this.extend, f } function f() { var a = d(arguments), b = a[0]; return a.splice(1, a.length - 1).forEach(function (a) { Object.getOwnPropertyNames(a).forEach(function (c) { delete b[c], Object.defineProperty(b, c, Object.getOwnPropertyDescriptor(a, c)) }) }), b } c.Class = { extend: e, cloneDefinitions: f } }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, d) { return a && (this.data = a || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.eventEmitter.emit("data", { type: "update", data: this.data })), b && (this.options = c.extend({}, d ? this.options : this.defaultOptions, b), this.initializeTimeoutId || (this.optionsProvider.removeMediaQueryListeners(), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter))), this.initializeTimeoutId || this.createChart(this.optionsProvider.getCurrentOptions()), this } function e() { return this.initializeTimeoutId ? a.clearTimeout(this.initializeTimeoutId) : (a.removeEventListener("resize", this.resizeListener), this.optionsProvider.removeMediaQueryListeners()), this } function f(a, b) { return this.eventEmitter.addEventHandler(a, b), this } function g(a, b) { return this.eventEmitter.removeEventHandler(a, b), this } function h() { a.addEventListener("resize", this.resizeListener), this.optionsProvider = c.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter), this.eventEmitter.addEventHandler("optionsChanged", function () { this.update() }.bind(this)), this.options.plugins && this.options.plugins.forEach(function (a) { a instanceof Array ? a[0](this, a[1]) : a(this) }.bind(this)), this.eventEmitter.emit("data", { type: "initial", data: this.data }), this.createChart(this.optionsProvider.getCurrentOptions()), this.initializeTimeoutId = void 0 } function i(a, b, d, e, f) { this.container = c.querySelector(a), this.data = b || {}, this.data.labels = this.data.labels || [], this.data.series = this.data.series || [], this.defaultOptions = d, this.options = e, this.responsiveOptions = f, this.eventEmitter = c.EventEmitter(), this.supportsForeignObject = c.Svg.isSupported("Extensibility"), this.supportsAnimations = c.Svg.isSupported("AnimationEventsAttribute"), this.resizeListener = function () { this.update() }.bind(this), this.container && (this.container.__chartist__ && this.container.__chartist__.detach(), this.container.__chartist__ = this), this.initializeTimeoutId = setTimeout(h.bind(this), 0) } c.Base = c.Class.extend({ constructor: i, optionsProvider: void 0, container: void 0, svg: void 0, eventEmitter: void 0, createChart: function () { throw new Error("Base chart type can't be instantiated!") }, update: d, detach: e, on: f, off: g, version: c.version, supportsForeignObject: !1 }) }(window, document, a), function (a, b, c) { "use strict"; function d(a, d, e, f, g) { a instanceof Element ? this._node = a : (this._node = b.createElementNS(c.namespaces.svg, a), "svg" === a && this.attr({ "xmlns:ct": c.namespaces.ct })), d && this.attr(d), e && this.addClass(e), f && (g && f._node.firstChild ? f._node.insertBefore(this._node, f._node.firstChild) : f._node.appendChild(this._node)) } function e(a, b) { return "string" == typeof a ? b ? this._node.getAttributeNS(b, a) : this._node.getAttribute(a) : (Object.keys(a).forEach(function (b) { if (void 0 !== a[b]) if (b.indexOf(":") !== -1) { var d = b.split(":"); this._node.setAttributeNS(c.namespaces[d[0]], b, a[b]) } else this._node.setAttribute(b, a[b]) }.bind(this)), this) } function f(a, b, d, e) { return new c.Svg(a, b, d, this, e) } function g() { return this._node.parentNode instanceof SVGElement ? new c.Svg(this._node.parentNode) : null } function h() { for (var a = this._node; "svg" !== a.nodeName;)a = a.parentNode; return new c.Svg(a) } function i(a) { var b = this._node.querySelector(a); return b ? new c.Svg(b) : null } function j(a) { var b = this._node.querySelectorAll(a); return b.length ? new c.Svg.List(b) : null } function k() { return this._node } function l(a, d, e, f) { if ("string" == typeof a) { var g = b.createElement("div"); g.innerHTML = a, a = g.firstChild } a.setAttribute("xmlns", c.namespaces.xmlns); var h = this.elem("foreignObject", d, e, f); return h._node.appendChild(a), h } function m(a) { return this._node.appendChild(b.createTextNode(a)), this } function n() { for (; this._node.firstChild;)this._node.removeChild(this._node.firstChild); return this } function o() { return this._node.parentNode.removeChild(this._node), this.parent() } function p(a) { return this._node.parentNode.replaceChild(a._node, this._node), a } function q(a, b) { return b && this._node.firstChild ? this._node.insertBefore(a._node, this._node.firstChild) : this._node.appendChild(a._node), this } function r() { return this._node.getAttribute("class") ? this._node.getAttribute("class").trim().split(/\s+/) : [] } function s(a) { return this._node.setAttribute("class", this.classes(this._node).concat(a.trim().split(/\s+/)).filter(function (a, b, c) { return c.indexOf(a) === b }).join(" ")), this } function t(a) { var b = a.trim().split(/\s+/); return this._node.setAttribute("class", this.classes(this._node).filter(function (a) { return b.indexOf(a) === -1 }).join(" ")), this } function u() { return this._node.setAttribute("class", ""), this } function v() { return this._node.getBoundingClientRect().height } function w() { return this._node.getBoundingClientRect().width } function x(a, b, d) { return void 0 === b && (b = !0), Object.keys(a).forEach(function (e) { function f(a, b) { var f, g, h, i = {}; a.easing && (h = a.easing instanceof Array ? a.easing : c.Svg.Easing[a.easing], delete a.easing), a.begin = c.ensureUnit(a.begin, "ms"), a.dur = c.ensureUnit(a.dur, "ms"), h && (a.calcMode = "spline", a.keySplines = h.join(" "), a.keyTimes = "0;1"), b && (a.fill = "freeze", i[e] = a.from, this.attr(i), g = c.quantity(a.begin || 0).value, a.begin = "indefinite"), f = this.elem("animate", c.extend({ attributeName: e }, a)), b && setTimeout(function () { try { f._node.beginElement() } catch (b) { i[e] = a.to, this.attr(i), f.remove() } }.bind(this), g), d && f._node.addEventListener("beginEvent", function () { d.emit("animationBegin", { element: this, animate: f._node, params: a }) }.bind(this)), f._node.addEventListener("endEvent", function () { d && d.emit("animationEnd", { element: this, animate: f._node, params: a }), b && (i[e] = a.to, this.attr(i), f.remove()) }.bind(this)) } a[e] instanceof Array ? a[e].forEach(function (a) { f.bind(this)(a, !1) }.bind(this)) : f.bind(this)(a[e], b) }.bind(this)), this } function y(a) { var b = this; this.svgElements = []; for (var d = 0; d < a.length; d++)this.svgElements.push(new c.Svg(a[d])); Object.keys(c.Svg.prototype).filter(function (a) { return ["constructor", "parent", "querySelector", "querySelectorAll", "replace", "append", "classes", "height", "width"].indexOf(a) === -1 }).forEach(function (a) { b[a] = function () { var d = Array.prototype.slice.call(arguments, 0); return b.svgElements.forEach(function (b) { c.Svg.prototype[a].apply(b, d) }), b } }) } c.Svg = c.Class.extend({ constructor: d, attr: e, elem: f, parent: g, root: h, querySelector: i, querySelectorAll: j, getNode: k, foreignObject: l, text: m, empty: n, remove: o, replace: p, append: q, classes: r, addClass: s, removeClass: t, removeAllClasses: u, height: v, width: w, animate: x }), c.Svg.isSupported = function (a) { return b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#" + a, "1.1") }; var z = { easeInSine: [.47, 0, .745, .715], easeOutSine: [.39, .575, .565, 1], easeInOutSine: [.445, .05, .55, .95], easeInQuad: [.55, .085, .68, .53], easeOutQuad: [.25, .46, .45, .94], easeInOutQuad: [.455, .03, .515, .955], easeInCubic: [.55, .055, .675, .19], easeOutCubic: [.215, .61, .355, 1], easeInOutCubic: [.645, .045, .355, 1], easeInQuart: [.895, .03, .685, .22], easeOutQuart: [.165, .84, .44, 1], easeInOutQuart: [.77, 0, .175, 1], easeInQuint: [.755, .05, .855, .06], easeOutQuint: [.23, 1, .32, 1], easeInOutQuint: [.86, 0, .07, 1], easeInExpo: [.95, .05, .795, .035], easeOutExpo: [.19, 1, .22, 1], easeInOutExpo: [1, 0, 0, 1], easeInCirc: [.6, .04, .98, .335], easeOutCirc: [.075, .82, .165, 1], easeInOutCirc: [.785, .135, .15, .86], easeInBack: [.6, -.28, .735, .045], easeOutBack: [.175, .885, .32, 1.275], easeInOutBack: [.68, -.55, .265, 1.55] }; c.Svg.Easing = z, c.Svg.List = c.Class.extend({ constructor: y }) }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, d, e, f, g) { var h = c.extend({ command: f ? a.toLowerCase() : a.toUpperCase() }, b, g ? { data: g } : {}); d.splice(e, 0, h) } function e(a, b) { a.forEach(function (c, d) { u[c.command.toLowerCase()].forEach(function (e, f) { b(c, e, d, f, a) }) }) } function f(a, b) { this.pathElements = [], this.pos = 0, this.close = a, this.options = c.extend({}, v, b) } function g(a) { return void 0 !== a ? (this.pos = Math.max(0, Math.min(this.pathElements.length, a)), this) : this.pos } function h(a) { return this.pathElements.splice(this.pos, a), this } function i(a, b, c, e) { return d("M", { x: +a, y: +b }, this.pathElements, this.pos++, c, e), this } function j(a, b, c, e) { return d("L", { x: +a, y: +b }, this.pathElements, this.pos++, c, e), this } function k(a, b, c, e, f, g, h, i) { return d("C", { x1: +a, y1: +b, x2: +c, y2: +e, x: +f, y: +g }, this.pathElements, this.pos++, h, i), this } function l(a, b, c, e, f, g, h, i, j) { return d("A", { rx: +a, ry: +b, xAr: +c, lAf: +e, sf: +f, x: +g, y: +h }, this.pathElements, this.pos++, i, j), this } function m(a) { var b = a.replace(/([A-Za-z])([0-9])/g, "$1 $2").replace(/([0-9])([A-Za-z])/g, "$1 $2").split(/[\s,]+/).reduce(function (a, b) { return b.match(/[A-Za-z]/) && a.push([]), a[a.length - 1].push(b), a }, []); "Z" === b[b.length - 1][0].toUpperCase() && b.pop(); var d = b.map(function (a) { var b = a.shift(), d = u[b.toLowerCase()]; return c.extend({ command: b }, d.reduce(function (b, c, d) { return b[c] = +a[d], b }, {})) }), e = [this.pos, 0]; return Array.prototype.push.apply(e, d), Array.prototype.splice.apply(this.pathElements, e), this.pos += d.length, this } function n() { var a = Math.pow(10, this.options.accuracy); return this.pathElements.reduce(function (b, c) { var d = u[c.command.toLowerCase()].map(function (b) { return this.options.accuracy ? Math.round(c[b] * a) / a : c[b] }.bind(this)); return b + c.command + d.join(",") }.bind(this), "") + (this.close ? "Z" : "") } function o(a, b) { return e(this.pathElements, function (c, d) { c[d] *= "x" === d[0] ? a : b }), this } function p(a, b) { return e(this.pathElements, function (c, d) { c[d] += "x" === d[0] ? a : b }), this } function q(a) { return e(this.pathElements, function (b, c, d, e, f) { var g = a(b, c, d, e, f); (g || 0 === g) && (b[c] = g) }), this } function r(a) { var b = new c.Svg.Path(a || this.close); return b.pos = this.pos, b.pathElements = this.pathElements.slice().map(function (a) { return c.extend({}, a) }), b.options = c.extend({}, this.options), b } function s(a) { var b = [new c.Svg.Path]; return this.pathElements.forEach(function (d) { d.command === a.toUpperCase() && 0 !== b[b.length - 1].pathElements.length && b.push(new c.Svg.Path), b[b.length - 1].pathElements.push(d) }), b } function t(a, b, d) { for (var e = new c.Svg.Path(b, d), f = 0; f < a.length; f++)for (var g = a[f], h = 0; h < g.pathElements.length; h++)e.pathElements.push(g.pathElements[h]); return e } var u = { m: ["x", "y"], l: ["x", "y"], c: ["x1", "y1", "x2", "y2", "x", "y"], a: ["rx", "ry", "xAr", "lAf", "sf", "x", "y"] }, v = { accuracy: 3 }; c.Svg.Path = c.Class.extend({ constructor: f, position: g, remove: h, move: i, line: j, curve: k, arc: l, scale: o, translate: p, transform: q, parse: m, stringify: n, clone: r, splitByCommand: s }), c.Svg.Path.elementDescriptions = u, c.Svg.Path.join = t }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, c, d) { this.units = a, this.counterUnits = a === f.x ? f.y : f.x, this.chartRect = b, this.axisLength = b[a.rectEnd] - b[a.rectStart], this.gridOffset = b[a.rectOffset], this.ticks = c, this.options = d } function e(a, b, d, e, f) { var g = e["axis" + this.units.pos.toUpperCase()], h = this.ticks.map(this.projectValue.bind(this)), i = this.ticks.map(g.labelInterpolationFnc); h.forEach(function (j, k) { var l, m = { x: 0, y: 0 }; l = h[k + 1] ? h[k + 1] - j : Math.max(this.axisLength - j, 30), c.isFalseyButZero(i[k]) && "" !== i[k] || ("x" === this.units.pos ? (j = this.chartRect.x1 + j, m.x = e.axisX.labelOffset.x, "start" === e.axisX.position ? m.y = this.chartRect.padding.top + e.axisX.labelOffset.y + (d ? 5 : 20) : m.y = this.chartRect.y1 + e.axisX.labelOffset.y + (d ? 5 : 20)) : (j = this.chartRect.y1 - j, m.y = e.axisY.labelOffset.y - (d ? l : 0), "start" === e.axisY.position ? m.x = d ? this.chartRect.padding.left + e.axisY.labelOffset.x : this.chartRect.x1 - 10 : m.x = this.chartRect.x2 + e.axisY.labelOffset.x + 10), g.showGrid && c.createGrid(j, k, this, this.gridOffset, this.chartRect[this.counterUnits.len](), a, [e.classNames.grid, e.classNames[this.units.dir]], f), g.showLabel && c.createLabel(j, l, k, i, this, g.offset, m, b, [e.classNames.label, e.classNames[this.units.dir], "start" === g.position ? e.classNames[g.position] : e.classNames.end], d, f)) }.bind(this)) } var f = { x: { pos: "x", len: "width", dir: "horizontal", rectStart: "x1", rectEnd: "x2", rectOffset: "y2" }, y: { pos: "y", len: "height", dir: "vertical", rectStart: "y2", rectEnd: "y1", rectOffset: "x1" } }; c.Axis = c.Class.extend({ constructor: d, createGridAndLabels: e, projectValue: function (a, b, c) { throw new Error("Base axis can't be instantiated!") } }), c.Axis.units = f }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, d, e) { var f = e.highLow || c.getHighLow(b, e, a.pos); this.bounds = c.getBounds(d[a.rectEnd] - d[a.rectStart], f, e.scaleMinSpace || 20, e.onlyInteger), this.range = { min: this.bounds.min, max: this.bounds.max }, c.AutoScaleAxis["super"].constructor.call(this, a, d, this.bounds.values, e) } function e(a) { return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.bounds.min) / this.bounds.range } c.AutoScaleAxis = c.Axis.extend({ constructor: d, projectValue: e }) }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, d, e) { var f = e.highLow || c.getHighLow(b, e, a.pos); this.divisor = e.divisor || 1, this.ticks = e.ticks || c.times(this.divisor).map(function (a, b) { return f.low + (f.high - f.low) / this.divisor * b }.bind(this)), this.ticks.sort(function (a, b) { return a - b }), this.range = { min: f.low, max: f.high }, c.FixedScaleAxis["super"].constructor.call(this, a, d, this.ticks, e), this.stepLength = this.axisLength / this.divisor } function e(a) { return this.axisLength * (+c.getMultiValue(a, this.units.pos) - this.range.min) / (this.range.max - this.range.min) } c.FixedScaleAxis = c.Axis.extend({ constructor: d, projectValue: e }) }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, d, e) { c.StepAxis["super"].constructor.call(this, a, d, e.ticks, e); var f = Math.max(1, e.ticks.length - (e.stretch ? 1 : 0)); this.stepLength = this.axisLength / f } function e(a, b) { return this.stepLength * b } c.StepAxis = c.Axis.extend({ constructor: d, projectValue: e }) }(window, document, a), function (a, b, c) { "use strict"; function d(a) { var b = c.normalizeData(this.data, a.reverseData, !0); this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart); var d, e, g = this.svg.elem("g").addClass(a.classNames.gridGroup), h = this.svg.elem("g"), i = this.svg.elem("g").addClass(a.classNames.labelGroup), j = c.createChartRect(this.svg, a, f.padding); d = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, j, c.extend({}, a.axisX, { ticks: b.normalized.labels, stretch: a.fullWidth })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, j, a.axisX), e = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, j, c.extend({}, a.axisY, { high: c.isNumeric(a.high) ? a.high : a.axisY.high, low: c.isNumeric(a.low) ? a.low : a.axisY.low })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, j, a.axisY), d.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), e.createGridAndLabels(g, i, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(g, j, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function (f, g) { var i = h.elem("g"); i.attr({ "ct:series-name": f.name, "ct:meta": c.serialize(f.meta) }), i.addClass([a.classNames.series, f.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" ")); var k = [], l = []; b.normalized.series[g].forEach(function (a, h) { var i = { x: j.x1 + d.projectValue(a, h, b.normalized.series[g]), y: j.y1 - e.projectValue(a, h, b.normalized.series[g]) }; k.push(i.x, i.y), l.push({ value: a, valueIndex: h, meta: c.getMetaData(f, h) }) }.bind(this)); var m = { lineSmooth: c.getSeriesOption(f, a, "lineSmooth"), showPoint: c.getSeriesOption(f, a, "showPoint"), showLine: c.getSeriesOption(f, a, "showLine"), showArea: c.getSeriesOption(f, a, "showArea"), areaBase: c.getSeriesOption(f, a, "areaBase") }, n = "function" == typeof m.lineSmooth ? m.lineSmooth : m.lineSmooth ? c.Interpolation.monotoneCubic() : c.Interpolation.none(), o = n(k, l); if (m.showPoint && o.pathElements.forEach(function (b) { var h = i.elem("line", { x1: b.x, y1: b.y, x2: b.x + .01, y2: b.y }, a.classNames.point).attr({ "ct:value": [b.data.value.x, b.data.value.y].filter(c.isNumeric).join(","), "ct:meta": c.serialize(b.data.meta) }); this.eventEmitter.emit("draw", { type: "point", value: b.data.value, index: b.data.valueIndex, meta: b.data.meta, series: f, seriesIndex: g, axisX: d, axisY: e, group: i, element: h, x: b.x, y: b.y }) }.bind(this)), m.showLine) { var p = i.elem("path", { d: o.stringify() }, a.classNames.line, !0); this.eventEmitter.emit("draw", { type: "line", values: b.normalized.series[g], path: o.clone(), chartRect: j, index: g, series: f, seriesIndex: g, seriesMeta: f.meta, axisX: d, axisY: e, group: i, element: p }) } if (m.showArea && e.range) { var q = Math.max(Math.min(m.areaBase, e.range.max), e.range.min), r = j.y1 - e.projectValue(q); o.splitByCommand("M").filter(function (a) { return a.pathElements.length > 1 }).map(function (a) { var b = a.pathElements[0], c = a.pathElements[a.pathElements.length - 1]; return a.clone(!0).position(0).remove(1).move(b.x, r).line(b.x, b.y).position(a.pathElements.length + 1).line(c.x, r) }).forEach(function (c) { var h = i.elem("path", { d: c.stringify() }, a.classNames.area, !0); this.eventEmitter.emit("draw", { type: "area", values: b.normalized.series[g], path: c.clone(), series: f, seriesIndex: g, axisX: d, axisY: e, chartRect: j, index: g, group: i, element: h }) }.bind(this)) } }.bind(this)), this.eventEmitter.emit("created", { bounds: e.bounds, chartRect: j, axisX: d, axisY: e, svg: this.svg, options: a }) } function e(a, b, d, e) { c.Line["super"].constructor.call(this, a, b, f, c.extend({}, f, d), e) } var f = { axisX: { offset: 30, position: "end", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: c.noop, type: void 0 }, axisY: { offset: 40, position: "start", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: c.noop, type: void 0, scaleMinSpace: 20, onlyInteger: !1 }, width: void 0, height: void 0, showLine: !0, showPoint: !0, showArea: !1, areaBase: 0, lineSmooth: !0, showGridBackground: !1, low: void 0, high: void 0, chartPadding: { top: 15, right: 15, bottom: 5, left: 10 }, fullWidth: !1, reverseData: !1, classNames: { chart: "ct-chart-line", label: "ct-label", labelGroup: "ct-labels", series: "ct-series", line: "ct-line", point: "ct-point", area: "ct-area", grid: "ct-grid", gridGroup: "ct-grids", gridBackground: "ct-grid-background", vertical: "ct-vertical", horizontal: "ct-horizontal", start: "ct-start", end: "ct-end" } }; c.Line = c.Base.extend({ constructor: e, createChart: d }) }(window, document, a), function (a, b, c) {
        "use strict"; function d(a) {
            var b, d; a.distributeSeries ? (b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), b.normalized.series = b.normalized.series.map(function (a) { return [a] })) : b = c.normalizeData(this.data, a.reverseData, a.horizontalBars ? "x" : "y"), this.svg = c.createSvg(this.container, a.width, a.height, a.classNames.chart + (a.horizontalBars ? " " + a.classNames.horizontalBars : "")); var e = this.svg.elem("g").addClass(a.classNames.gridGroup), g = this.svg.elem("g"), h = this.svg.elem("g").addClass(a.classNames.labelGroup); if (a.stackBars && 0 !== b.normalized.series.length) {
                var i = c.serialMap(b.normalized.series, function () {
                    return Array.prototype.slice.call(arguments).map(function (a) { return a }).reduce(function (a, b) { return { x: a.x + (b && b.x) || 0, y: a.y + (b && b.y) || 0 } }, { x: 0, y: 0 })
                }); d = c.getHighLow([i], a, a.horizontalBars ? "x" : "y")
            } else d = c.getHighLow(b.normalized.series, a, a.horizontalBars ? "x" : "y"); d.high = +a.high || (0 === a.high ? 0 : d.high), d.low = +a.low || (0 === a.low ? 0 : d.low); var j, k, l, m, n, o = c.createChartRect(this.svg, a, f.padding); k = a.distributeSeries && a.stackBars ? b.normalized.labels.slice(0, 1) : b.normalized.labels, a.horizontalBars ? (j = m = void 0 === a.axisX.type ? new c.AutoScaleAxis(c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, { highLow: d, referenceValue: 0 })) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, c.extend({}, a.axisX, { highLow: d, referenceValue: 0 })), l = n = void 0 === a.axisY.type ? new c.StepAxis(c.Axis.units.y, b.normalized.series, o, { ticks: k }) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, a.axisY)) : (l = m = void 0 === a.axisX.type ? new c.StepAxis(c.Axis.units.x, b.normalized.series, o, { ticks: k }) : a.axisX.type.call(c, c.Axis.units.x, b.normalized.series, o, a.axisX), j = n = void 0 === a.axisY.type ? new c.AutoScaleAxis(c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, { highLow: d, referenceValue: 0 })) : a.axisY.type.call(c, c.Axis.units.y, b.normalized.series, o, c.extend({}, a.axisY, { highLow: d, referenceValue: 0 }))); var p = a.horizontalBars ? o.x1 + j.projectValue(0) : o.y1 - j.projectValue(0), q = []; l.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), j.createGridAndLabels(e, h, this.supportsForeignObject, a, this.eventEmitter), a.showGridBackground && c.createGridBackground(e, o, a.classNames.gridBackground, this.eventEmitter), b.raw.series.forEach(function (d, e) { var f, h, i = e - (b.raw.series.length - 1) / 2; f = a.distributeSeries && !a.stackBars ? l.axisLength / b.normalized.series.length / 2 : a.distributeSeries && a.stackBars ? l.axisLength / 2 : l.axisLength / b.normalized.series[e].length / 2, h = g.elem("g"), h.attr({ "ct:series-name": d.name, "ct:meta": c.serialize(d.meta) }), h.addClass([a.classNames.series, d.className || a.classNames.series + "-" + c.alphaNumerate(e)].join(" ")), b.normalized.series[e].forEach(function (g, k) { var r, s, t, u; if (u = a.distributeSeries && !a.stackBars ? e : a.distributeSeries && a.stackBars ? 0 : k, r = a.horizontalBars ? { x: o.x1 + j.projectValue(g && g.x ? g.x : 0, k, b.normalized.series[e]), y: o.y1 - l.projectValue(g && g.y ? g.y : 0, u, b.normalized.series[e]) } : { x: o.x1 + l.projectValue(g && g.x ? g.x : 0, u, b.normalized.series[e]), y: o.y1 - j.projectValue(g && g.y ? g.y : 0, k, b.normalized.series[e]) }, l instanceof c.StepAxis && (l.options.stretch || (r[l.units.pos] += f * (a.horizontalBars ? -1 : 1)), r[l.units.pos] += a.stackBars || a.distributeSeries ? 0 : i * a.seriesBarDistance * (a.horizontalBars ? -1 : 1)), t = q[k] || p, q[k] = t - (p - r[l.counterUnits.pos]), void 0 !== g) { var v = {}; v[l.units.pos + "1"] = r[l.units.pos], v[l.units.pos + "2"] = r[l.units.pos], !a.stackBars || "accumulate" !== a.stackMode && a.stackMode ? (v[l.counterUnits.pos + "1"] = p, v[l.counterUnits.pos + "2"] = r[l.counterUnits.pos]) : (v[l.counterUnits.pos + "1"] = t, v[l.counterUnits.pos + "2"] = q[k]), v.x1 = Math.min(Math.max(v.x1, o.x1), o.x2), v.x2 = Math.min(Math.max(v.x2, o.x1), o.x2), v.y1 = Math.min(Math.max(v.y1, o.y2), o.y1), v.y2 = Math.min(Math.max(v.y2, o.y2), o.y1); var w = c.getMetaData(d, k); s = h.elem("line", v, a.classNames.bar).attr({ "ct:value": [g.x, g.y].filter(c.isNumeric).join(","), "ct:meta": c.serialize(w) }), this.eventEmitter.emit("draw", c.extend({ type: "bar", value: g, index: k, meta: w, series: d, seriesIndex: e, axisX: m, axisY: n, chartRect: o, group: h, element: s }, v)) } }.bind(this)) }.bind(this)), this.eventEmitter.emit("created", { bounds: j.bounds, chartRect: o, axisX: m, axisY: n, svg: this.svg, options: a })
        } function e(a, b, d, e) { c.Bar["super"].constructor.call(this, a, b, f, c.extend({}, f, d), e) } var f = { axisX: { offset: 30, position: "end", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: c.noop, scaleMinSpace: 30, onlyInteger: !1 }, axisY: { offset: 40, position: "start", labelOffset: { x: 0, y: 0 }, showLabel: !0, showGrid: !0, labelInterpolationFnc: c.noop, scaleMinSpace: 20, onlyInteger: !1 }, width: void 0, height: void 0, high: void 0, low: void 0, referenceValue: 0, chartPadding: { top: 15, right: 15, bottom: 5, left: 10 }, seriesBarDistance: 15, stackBars: !1, stackMode: "accumulate", horizontalBars: !1, distributeSeries: !1, reverseData: !1, showGridBackground: !1, classNames: { chart: "ct-chart-bar", horizontalBars: "ct-horizontal-bars", label: "ct-label", labelGroup: "ct-labels", series: "ct-series", bar: "ct-bar", grid: "ct-grid", gridGroup: "ct-grids", gridBackground: "ct-grid-background", vertical: "ct-vertical", horizontal: "ct-horizontal", start: "ct-start", end: "ct-end" } }; c.Bar = c.Base.extend({ constructor: e, createChart: d })
    }(window, document, a), function (a, b, c) { "use strict"; function d(a, b, c) { var d = b.x > a.x; return d && "explode" === c || !d && "implode" === c ? "start" : d && "implode" === c || !d && "explode" === c ? "end" : "middle" } function e(a) { var b, e, f, h, i, j = c.normalizeData(this.data), k = [], l = a.startAngle; this.svg = c.createSvg(this.container, a.width, a.height, a.donut ? a.classNames.chartDonut : a.classNames.chartPie), e = c.createChartRect(this.svg, a, g.padding), f = Math.min(e.width() / 2, e.height() / 2), i = a.total || j.normalized.series.reduce(function (a, b) { return a + b }, 0); var m = c.quantity(a.donutWidth); "%" === m.unit && (m.value *= f / 100), f -= a.donut && !a.donutSolid ? m.value / 2 : 0, h = "outside" === a.labelPosition || a.donut && !a.donutSolid ? f : "center" === a.labelPosition ? 0 : a.donutSolid ? f - m.value / 2 : f / 2, h += a.labelOffset; var n = { x: e.x1 + e.width() / 2, y: e.y2 + e.height() / 2 }, o = 1 === j.raw.series.filter(function (a) { return a.hasOwnProperty("value") ? 0 !== a.value : 0 !== a }).length; j.raw.series.forEach(function (a, b) { k[b] = this.svg.elem("g", null, null) }.bind(this)), a.showLabel && (b = this.svg.elem("g", null, null)), j.raw.series.forEach(function (e, g) { if (0 !== j.normalized.series[g] || !a.ignoreEmptyValues) { k[g].attr({ "ct:series-name": e.name }), k[g].addClass([a.classNames.series, e.className || a.classNames.series + "-" + c.alphaNumerate(g)].join(" ")); var p = i > 0 ? l + j.normalized.series[g] / i * 360 : 0, q = Math.max(0, l - (0 === g || o ? 0 : .2)); p - q >= 359.99 && (p = q + 359.99); var r, s, t, u = c.polarToCartesian(n.x, n.y, f, q), v = c.polarToCartesian(n.x, n.y, f, p), w = new c.Svg.Path(!a.donut || a.donutSolid).move(v.x, v.y).arc(f, f, 0, p - l > 180, 0, u.x, u.y); a.donut ? a.donutSolid && (t = f - m.value, r = c.polarToCartesian(n.x, n.y, t, l - (0 === g || o ? 0 : .2)), s = c.polarToCartesian(n.x, n.y, t, p), w.line(r.x, r.y), w.arc(t, t, 0, p - l > 180, 1, s.x, s.y)) : w.line(n.x, n.y); var x = a.classNames.slicePie; a.donut && (x = a.classNames.sliceDonut, a.donutSolid && (x = a.classNames.sliceDonutSolid)); var y = k[g].elem("path", { d: w.stringify() }, x); if (y.attr({ "ct:value": j.normalized.series[g], "ct:meta": c.serialize(e.meta) }), a.donut && !a.donutSolid && (y._node.style.strokeWidth = m.value + "px"), this.eventEmitter.emit("draw", { type: "slice", value: j.normalized.series[g], totalDataSum: i, index: g, meta: e.meta, series: e, group: k[g], element: y, path: w.clone(), center: n, radius: f, startAngle: l, endAngle: p }), a.showLabel) { var z; z = 1 === j.raw.series.length ? { x: n.x, y: n.y } : c.polarToCartesian(n.x, n.y, h, l + (p - l) / 2); var A; A = j.normalized.labels && !c.isFalseyButZero(j.normalized.labels[g]) ? j.normalized.labels[g] : j.normalized.series[g]; var B = a.labelInterpolationFnc(A, g); if (B || 0 === B) { var C = b.elem("text", { dx: z.x, dy: z.y, "text-anchor": d(n, z, a.labelDirection) }, a.classNames.label).text("" + B); this.eventEmitter.emit("draw", { type: "label", index: g, group: b, element: C, text: "" + B, x: z.x, y: z.y }) } } l = p } }.bind(this)), this.eventEmitter.emit("created", { chartRect: e, svg: this.svg, options: a }) } function f(a, b, d, e) { c.Pie["super"].constructor.call(this, a, b, g, c.extend({}, g, d), e) } var g = { width: void 0, height: void 0, chartPadding: 5, classNames: { chartPie: "ct-chart-pie", chartDonut: "ct-chart-donut", series: "ct-series", slicePie: "ct-slice-pie", sliceDonut: "ct-slice-donut", sliceDonutSolid: "ct-slice-donut-solid", label: "ct-label" }, startAngle: 0, total: void 0, donut: !1, donutSolid: !1, donutWidth: 60, showLabel: !0, labelOffset: 0, labelPosition: "inside", labelInterpolationFnc: c.noop, labelDirection: "neutral", reverseData: !1, ignoreEmptyValues: !1 }; c.Pie = c.Base.extend({ constructor: f, createChart: e, determineAnchorPosition: d }) }(window, document, a), a
});

var i, l, selectedLine = null;

/* Navigate to hash without browser history entry */
var navigateToHash = function () {
    if (window.history !== undefined && window.history.replaceState !== undefined) {
        window.history.replaceState(undefined, undefined, this.getAttribute("href"));
    }
};

var hashLinks = document.getElementsByClassName('navigatetohash');
for (i = 0, l = hashLinks.length; i < l; i++) {
    hashLinks[i].addEventListener('click', navigateToHash);
}

/* Switch test method */
var switchTestMethod = function () {
    var method = this.getAttribute("value");
    console.log("Selected test method: " + method);

    var lines, i, l, coverageData, lineAnalysis, cells;

    lines = document.querySelectorAll('.lineAnalysis tr');

    for (i = 1, l = lines.length; i < l; i++) {
        coverageData = JSON.parse(lines[i].getAttribute('data-coverage').replace(/'/g, '"'));
        lineAnalysis = coverageData[method];
        cells = lines[i].querySelectorAll('td');
        if (lineAnalysis === undefined) {
            lineAnalysis = coverageData.AllTestMethods;
            if (lineAnalysis.LVS !== 'gray') {
                cells[0].setAttribute('class', 'red');
                cells[1].innerText = cells[1].textContent = '0';
                cells[4].setAttribute('class', 'lightred');
            }
        } else {
            cells[0].setAttribute('class', lineAnalysis.LVS);
            cells[1].innerText = cells[1].textContent = lineAnalysis.VC;
            cells[4].setAttribute('class', 'light' + lineAnalysis.LVS);
        }
    }
};

var testMethods = document.getElementsByClassName('switchtestmethod');
for (i = 0, l = testMethods.length; i < l; i++) {
    testMethods[i].addEventListener('change', switchTestMethod);
}

/* Highlight test method by line */
var toggleLine = function () {
    if (selectedLine === this) {
        selectedLine = null;
    } else {
        selectedLine = null;
        unhighlightTestMethods();
        highlightTestMethods.call(this);
        selectedLine = this;
    }
    
};
var highlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var lineAnalysis;
    var coverageData = JSON.parse(this.getAttribute('data-coverage').replace(/'/g, '"'));
    var testMethods = document.getElementsByClassName('testmethod');

    for (i = 0, l = testMethods.length; i < l; i++) {
        lineAnalysis = coverageData[testMethods[i].id];
        if (lineAnalysis === undefined) {
            testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
        } else {
            testMethods[i].className += ' light' + lineAnalysis.LVS;
        }
    }
};
var unhighlightTestMethods = function () {
    if (selectedLine !== null) {
        return;
    }

    var testMethods = document.getElementsByClassName('testmethod');
    for (i = 0, l = testMethods.length; i < l; i++) {
        testMethods[i].className = testMethods[i].className.replace(/\s*light.+/g, "");
    }
};
var coverableLines = document.getElementsByClassName('coverableline');
for (i = 0, l = coverableLines.length; i < l; i++) {
    coverableLines[i].addEventListener('click', toggleLine);
    coverableLines[i].addEventListener('mouseenter', highlightTestMethods);
    coverableLines[i].addEventListener('mouseleave', unhighlightTestMethods);
}

/* History charts */
var renderChart = function (chart) {
    // Remove current children (e.g. PNG placeholder)
    while (chart.firstChild) {
        chart.firstChild.remove();
    }

    var chartData = window[chart.getAttribute('data-data')];
    var options = {
        axisY: {
            type: undefined,
            onlyInteger: true
        },
        lineSmooth: false,
        low: 0,
        high: 100,
        scaleMinSpace: 20,
        onlyInteger: true,
        fullWidth: true
    };
    var lineChart = new Chartist.Line(chart, {
        labels: [],
        series: chartData.series
    }, options);

    /* Zoom */
    var zoomButtonDiv = document.createElement("div");
    zoomButtonDiv.className = "toggleZoom";
    var zoomButtonLink = document.createElement("a");
    zoomButtonLink.setAttribute("href", "");
    var zoomButtonText = document.createElement("i");
    zoomButtonText.className = "icon-search-plus";

    zoomButtonLink.appendChild(zoomButtonText);
    zoomButtonDiv.appendChild(zoomButtonLink);

    chart.appendChild(zoomButtonDiv);

    zoomButtonDiv.addEventListener('click', function (event) {
        event.preventDefault();

        if (options.axisY.type === undefined) {
            options.axisY.type = Chartist.AutoScaleAxis;
            zoomButtonText.className = "icon-search-minus";
        } else {
            options.axisY.type = undefined;
            zoomButtonText.className = "icon-search-plus";
        }

        lineChart.update(null, options);
    });

    var tooltip = document.createElement("div");
    tooltip.className = "tooltip";

    chart.appendChild(tooltip);

    /* Tooltips */
    var showToolTip = function () {
        var point = this;
        var index = [].slice.call(chart.getElementsByClassName('ct-point')).indexOf(point);

        tooltip.innerHTML = chartData.tooltips[index % chartData.tooltips.length];
        tooltip.style.display = 'block';
    };

    var moveToolTip = function (event) {
        var box = chart.getBoundingClientRect();
        var left = event.pageX - box.left - window.pageXOffset;
        var top = event.pageY - box.top - window.pageYOffset;

        left = left + 20;
        top = top - tooltip.offsetHeight / 2;

        if (left + tooltip.offsetWidth > box.width) {
            left -= tooltip.offsetWidth + 40;
        }

        if (top < 0) {
            top = 0;
        }

        if (top + tooltip.offsetHeight > box.height) {
            top = box.height - tooltip.offsetHeight;
        }

        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    };

    var hideToolTip = function () {
        tooltip.style.display = 'none';
    };
    chart.addEventListener('mousemove', moveToolTip);

    lineChart.on('created', function () {
        var chartPoints = chart.getElementsByClassName('ct-point');
        for (i = 0, l = chartPoints.length; i < l; i++) {
            chartPoints[i].addEventListener('mousemove', showToolTip);
            chartPoints[i].addEventListener('mouseout', hideToolTip);
        }
    });
};

var charts = document.getElementsByClassName('historychart');
for (i = 0, l = charts.length; i < l; i++) {
    renderChart(charts[i]);
}

var assemblies = [
  {
    "name": "ABConverter",
    "classes": [
      { "name": "DCL.ABConverter.AssetPath", "rp": "ABConverter_AssetPath.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Client", "rp": "ABConverter_Client.html", "cl": 0, "ucl": 179, "cal": 179, "tl": 503, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Config", "rp": "ABConverter_Config.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Core", "rp": "ABConverter_Core.html", "cl": 0, "ucl": 322, "cal": 322, "tl": 825, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.DependencyMapBuilder", "rp": "ABConverter_DependencyMapBuilder.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Environment", "rp": "ABConverter_Environment.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.MeshUtils", "rp": "ABConverter_MeshUtils.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 412, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.PathUtils", "rp": "ABConverter_PathUtils.html", "cl": 0, "ucl": 29, "cal": 29, "tl": 412, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Utils", "rp": "ABConverter_Utils.html", "cl": 0, "ucl": 117, "cal": 117, "tl": 412, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.VisualTests", "rp": "ABConverter_VisualTests.html", "cl": 0, "ucl": 152, "cal": 152, "tl": 341, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetBundleMenuItems", "rp": "ABConverter_AssetBundleMenuItems.html", "cl": 0, "ucl": 44, "cal": 44, "tl": 131, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Mocked", "rp": "ABConverter_Mocked.html", "cl": 0, "ucl": 123, "cal": 123, "tl": 307, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SystemWrappers", "rp": "ABConverter_SystemWrappers.html", "cl": 0, "ucl": 32, "cal": 32, "tl": 85, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.UnityEditorWrappers", "rp": "ABConverter_UnityEditorWrappers.html", "cl": 0, "ucl": 49, "cal": 49, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestExtensions", "rp": "ABConverter_WebRequestExtensions.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ABConverterTests",
    "classes": [
      { "name": "DCL.ABConverter.ParseOptionShould", "rp": "ABConverterTests_ParseOptionShould.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Tests.ABConverterCoreShould", "rp": "ABConverterTests_ABConverterCoreShould.html", "cl": 0, "ucl": 215, "cal": 215, "tl": 430, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.Tests.ABConverterShould", "rp": "ABConverterTests_ABConverterShould.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 430, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ABConverter.UtilsTests", "rp": "ABConverterTests_UtilsTests.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AirdroppingHUD",
    "classes": [
      { "name": "AirdroppingHUDController", "rp": "AirdroppingHUD_AirdroppingHUDController.html", "cl": 55, "ucl": 1, "cal": 56, "tl": 142, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AirdroppingHUDView", "rp": "AirdroppingHUD_AirdroppingHUDView.html", "cl": 44, "ucl": 1, "cal": 45, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AirdroppingItemPanel", "rp": "AirdroppingHUD_AirdroppingItemPanel.html", "cl": 16, "ucl": 8, "cal": 24, "tl": 57, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AirdroppingHUDTests",
    "classes": [
      { "name": "AirdroppingHUDController_Should", "rp": "AirdroppingHUDTests_AirdroppingHUDController_Should.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AirdroppingHUDView_Should", "rp": "AirdroppingHUDTests_AirdroppingHUDView_Should.html", "cl": 40, "ucl": 0, "cal": 40, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Analytics",
    "classes": [
      { "name": "Analytics", "rp": "Analytics_Analytics.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AnimatorTests",
    "classes": [
      { "name": "Tests.AnimatorTests", "rp": "AnimatorTests_AnimatorTests.html", "cl": 96, "ucl": 20, "cal": 116, "tl": 372, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "APK_Common_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_Tests.APKWithPoolableAssetShouldWorkWhen_Base[APKType,AssetPromiseType,AssetType,AssetLibraryType]", "rp": "APK_Common_Tests_APKWithPoolableAssetShouldWorkWhetPromiseType_AssetType_AssetLibraryType_.html", "cl": 125, "ucl": 3, "cal": 128, "tl": 236, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Tests.APKWithRefCountedAssetShouldWorkWhen_Base[APKType,AssetPromiseType,AssetType,AssetLibraryType]", "rp": "APK_Common_Tests_APKWithRefCountedAssetShouldWorkWtPromiseType_AssetType_AssetLibraryType_.html", "cl": 94, "ucl": 2, "cal": 96, "tl": 187, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Tests.TestsBase_APK[APKType,AssetPromiseType,AssetType,AssetLibraryType]", "rp": "APK_Common_Tests_TestsBase_APK_APKType_AssetPromiseType_AssetType_AssetLibraryType_.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Assembly-CSharp",
    "classes": [
      { "name": "GLTFBenchmark", "rp": "Assembly_CSharp_GLTFBenchmark.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 57, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetBundlesVisualTestHelpers",
    "classes": [
      { "name": "DCL.Helpers.AssetBundlesVisualTestHelpers", "rp": "AssetBundlesVisualTestHelpers_AssetBundlesVisualTestHelpers.html", "cl": 0, "ucl": 105, "cal": 105, "tl": 261, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GameViewUtils", "rp": "AssetBundlesVisualTestHelpers_GameViewUtils.html", "cl": 0, "ucl": 60, "cal": 60, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.GameViewUtilsTests", "rp": "AssetBundlesVisualTestHelpers_GameViewUtilsTests.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper",
    "classes": [
      { "name": "APK_AB_InteractiveTest", "rp": "AssetPromiseKeeper_APK_AB_InteractiveTest.html", "cl": 0, "ucl": 24, "cal": 24, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "APK_GLTF_InteractiveTest", "rp": "AssetPromiseKeeper_APK_GLTF_InteractiveTest.html", "cl": 0, "ucl": 32, "cal": 32, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset", "rp": "AssetPromiseKeeper_Asset.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_AB", "rp": "AssetPromiseKeeper_Asset_AB.html", "cl": 21, "ucl": 1, "cal": 22, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_AB_GameObject", "rp": "AssetPromiseKeeper_Asset_AB_GameObject.html", "cl": 14, "ucl": 0, "cal": 14, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_Gif", "rp": "AssetPromiseKeeper_Asset_Gif.html", "cl": 9, "ucl": 4, "cal": 13, "tl": 37, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_GLTF", "rp": "AssetPromiseKeeper_Asset_GLTF.html", "cl": 33, "ucl": 5, "cal": 38, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_Material", "rp": "AssetPromiseKeeper_Asset_Material.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_Mock", "rp": "AssetPromiseKeeper_Asset_Mock.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Asset_Texture", "rp": "AssetPromiseKeeper_Asset_Texture.html", "cl": 10, "ucl": 5, "cal": 15, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetBundlesLoader", "rp": "AssetPromiseKeeper_AssetBundlesLoader.html", "cl": 75, "ucl": 14, "cal": 89, "tl": 225, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_AB_GameObject", "rp": "AssetPromiseKeeper_AssetLibrary_AB_GameObject.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_GLTF", "rp": "AssetPromiseKeeper_AssetLibrary_GLTF.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_Material", "rp": "AssetPromiseKeeper_AssetLibrary_Material.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_Mock", "rp": "AssetPromiseKeeper_AssetLibrary_Mock.html", "cl": 18, "ucl": 2, "cal": 20, "tl": 65, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_Poolable[AssetType]", "rp": "AssetPromiseKeeper_AssetLibrary_Poolable_AssetType_.html", "cl": 40, "ucl": 14, "cal": 54, "tl": 129, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_RefCounted[AssetType]", "rp": "AssetPromiseKeeper_AssetLibrary_RefCounted_AssetType_.html", "cl": 27, "ucl": 4, "cal": 31, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetLibrary_Texture", "rp": "AssetPromiseKeeper_AssetLibrary_Texture.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise[AssetType]", "rp": "AssetPromiseKeeper_AssetPromise_AssetType_.html", "cl": 61, "ucl": 12, "cal": 73, "tl": 190, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_AB", "rp": "AssetPromiseKeeper_AssetPromise_AB.html", "cl": 75, "ucl": 27, "cal": 102, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_AB_GameObject", "rp": "AssetPromiseKeeper_AssetPromise_AB_GameObject.html", "cl": 64, "ucl": 5, "cal": 69, "tl": 176, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_Gif", "rp": "AssetPromiseKeeper_AssetPromise_Gif.html", "cl": 14, "ucl": 3, "cal": 17, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_GLTF", "rp": "AssetPromiseKeeper_AssetPromise_GLTF.html", "cl": 39, "ucl": 2, "cal": 41, "tl": 113, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_Material", "rp": "AssetPromiseKeeper_AssetPromise_Material.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_Mock", "rp": "AssetPromiseKeeper_AssetPromise_Mock.html", "cl": 18, "ucl": 2, "cal": 20, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_PrefetchGLTF", "rp": "AssetPromiseKeeper_AssetPromise_PrefetchGLTF.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_Texture", "rp": "AssetPromiseKeeper_AssetPromise_Texture.html", "cl": 52, "ucl": 15, "cal": 67, "tl": 155, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromise_WithUrl[T]", "rp": "AssetPromiseKeeper_AssetPromise_WithUrl_T_.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper", "rp": "AssetPromiseKeeper_AssetPromiseKeeper.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 377, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper[AssetType,AssetLibraryType,AssetPromiseType]", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_AssetType_AssetLibraryType_AssetPromiseType_.html", "cl": 152, "ucl": 16, "cal": 168, "tl": 377, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_AB", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_AB.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_AB_GameObject", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_AB_GameObject.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_Gif", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_Gif.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_GLTF", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_GLTF.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_Material", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_Material.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_Mock", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_Mock.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseKeeper_Texture", "rp": "AssetPromiseKeeper_AssetPromiseKeeper_Texture.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AssetPromiseSettings_Rendering", "rp": "AssetPromiseKeeper_AssetPromiseSettings_Rendering.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.GifPlayer", "rp": "AssetPromiseKeeper_GifPlayer.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 109, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DependencyMapLoadHelper", "rp": "AssetPromiseKeeper_DependencyMapLoadHelper.html", "cl": 43, "ucl": 6, "cal": 49, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_AssetBundle_GameObject_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_AssetBundle_GameObject_Tests.APK_AB_GameObject_Promise_Should", "rp": "AssetPromiseKeeper_AssetBundle_GameObject_Tests_APK_AB_GameObject_Promise_Should.html", "cl": 74, "ucl": 0, "cal": 74, "tl": 147, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_AssetBundle_GameObject_Tests.APK_AB_GameObject_ShouldWorkWhen", "rp": "AssetPromiseKeeper_AssetBundle_GameObject_Tests_APK_AB_GameObject_ShouldWorkWhen.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_AssetBundle_GameObject_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_AssetBundle_GameObject_Tests_BlockedAndMasterPromisesShould.html", "cl": 71, "ucl": 0, "cal": 71, "tl": 131, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_AssetBundleTests",
    "classes": [
      { "name": "AssetPromiseKeeper_AssetBundle_Tests.APK_AB_ShouldWorkWhen", "rp": "AssetPromiseKeeper_AssetBundleTests_APK_AB_ShouldWorkWhen.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_AssetBundle_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_AssetBundleTests_BlockedAndMasterPromisesShould.html", "cl": 39, "ucl": 0, "cal": 39, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_Basic_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_Mock_Tests.AnyAssetPromiseShould", "rp": "AssetPromiseKeeper_Basic_Tests_AnyAssetPromiseShould.html", "cl": 67, "ucl": 4, "cal": 71, "tl": 135, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Mock_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_Basic_Tests_BlockedAndMasterPromisesShould.html", "cl": 79, "ucl": 0, "cal": 79, "tl": 130, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Mock_Tests.PromiseKeeperShouldBehaveCorrectlyWhen", "rp": "AssetPromiseKeeper_Basic_Tests_PromiseKeeperShouldBehaveCorrectlyWhen.html", "cl": 141, "ucl": 6, "cal": 147, "tl": 240, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_Gif_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_Gif_Tests.APK_Gif_Promise_Should", "rp": "AssetPromiseKeeper_Gif_Tests_APK_Gif_Promise_Should.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Gif_Tests.APK_Gif_ShouldWorkWhen", "rp": "AssetPromiseKeeper_Gif_Tests_APK_Gif_ShouldWorkWhen.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Gif_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_Gif_Tests_BlockedAndMasterPromisesShould.html", "cl": 34, "ucl": 0, "cal": 34, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_GLTF_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_GLTF_Tests.AnyAssetPromiseShould", "rp": "AssetPromiseKeeper_GLTF_Tests_AnyAssetPromiseShould.html", "cl": 102, "ucl": 4, "cal": 106, "tl": 194, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_GLTF_Tests.APK_GLTF_ShouldWorkWhen", "rp": "AssetPromiseKeeper_GLTF_Tests_APK_GLTF_ShouldWorkWhen.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 33, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_GLTF_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_GLTF_Tests_BlockedAndMasterPromisesShould.html", "cl": 68, "ucl": 0, "cal": 68, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AssetPromiseKeeper_Texture_Tests",
    "classes": [
      { "name": "AssetPromiseKeeper_Texture_Tests.APK_Texture_Promise_Should", "rp": "AssetPromiseKeeper_Texture_Tests_APK_Texture_Promise_Should.html", "cl": 69, "ucl": 0, "cal": 69, "tl": 140, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Texture_Tests.APK_Texture_ShouldWorkWhen", "rp": "AssetPromiseKeeper_Texture_Tests_APK_Texture_ShouldWorkWhen.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AssetPromiseKeeper_Texture_Tests.BlockedAndMasterPromisesShould", "rp": "AssetPromiseKeeper_Texture_Tests_BlockedAndMasterPromisesShould.html", "cl": 54, "ucl": 0, "cal": 54, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AudioTests",
    "classes": [
      { "name": "Tests.AudioTests", "rp": "AudioTests_AudioTests.html", "cl": 129, "ucl": 0, "cal": 129, "tl": 312, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarAssets",
    "classes": [
      { "name": "WearableItem", "rp": "AvatarAssets_WearableItem.html", "cl": 41, "ucl": 13, "cal": 54, "tl": 223, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WearableLiterals", "rp": "AvatarAssets_WearableLiterals.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 89, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarAssetsTest",
    "classes": [
      { "name": "AvatarAssets_Test.GeneralHidesListShould", "rp": "AvatarAssetsTest_GeneralHidesListShould.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAssets_Test.GeneralReplacesListShould", "rp": "AvatarAssetsTest_GeneralReplacesListShould.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAssets_Test.OverrideHidesListShould", "rp": "AvatarAssetsTest_OverrideHidesListShould.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAssets_Test.OverrideReplacesListShould", "rp": "AvatarAssetsTest_OverrideReplacesListShould.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarAssetsTest_Helpers",
    "classes": [
      { "name": "AvatarAssetsTestHelpers", "rp": "AvatarAssetsTest_Helpers_AvatarAssetsTestHelpers.html", "cl": 13, "ucl": 0, "cal": 13, "tl": 37, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WearableItemDummy", "rp": "AvatarAssetsTest_Helpers_WearableItemDummy.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WearableItemDummyListVariable", "rp": "AvatarAssetsTest_Helpers_WearableItemDummyListVariable.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarEditorHUD",
    "classes": [
      { "name": "AvatarEditorHUDAudioHandler", "rp": "AvatarEditorHUD_AvatarEditorHUDAudioHandler.html", "cl": 7, "ucl": 92, "cal": 99, "tl": 233, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUDController", "rp": "AvatarEditorHUD_AvatarEditorHUDController.html", "cl": 238, "ucl": 63, "cal": 301, "tl": 617, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUDModel", "rp": "AvatarEditorHUD_AvatarEditorHUDModel.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUDView", "rp": "AvatarEditorHUD_AvatarEditorHUDView.html", "cl": 155, "ucl": 36, "cal": 191, "tl": 449, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CharacterPreviewController", "rp": "AvatarEditorHUD_CharacterPreviewController.html", "cl": 10, "ucl": 53, "cal": 63, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ColorSelector", "rp": "AvatarEditorHUD_ColorSelector.html", "cl": 24, "ucl": 14, "cal": 38, "tl": 93, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ColorToggle", "rp": "AvatarEditorHUD_ColorToggle.html", "cl": 10, "ucl": 5, "cal": 15, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FontOnToggle", "rp": "AvatarEditorHUD_FontOnToggle.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 15, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ImageColorOnToggle", "rp": "AvatarEditorHUD_ImageColorOnToggle.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ItemSelector", "rp": "AvatarEditorHUD_ItemSelector.html", "cl": 55, "ucl": 23, "cal": 78, "tl": 176, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ItemToggle", "rp": "AvatarEditorHUD_ItemToggle.html", "cl": 37, "ucl": 27, "cal": 64, "tl": 151, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ItemToggleFactory", "rp": "AvatarEditorHUD_ItemToggleFactory.html", "cl": 12, "ucl": 4, "cal": 16, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTItemInfo", "rp": "AvatarEditorHUD_NFTItemInfo.html", "cl": 20, "ucl": 21, "cal": 41, "tl": 138, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTItemToggle", "rp": "AvatarEditorHUD_NFTItemToggle.html", "cl": 5, "ucl": 25, "cal": 30, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PreviewCameraRotation", "rp": "AvatarEditorHUD_PreviewCameraRotation.html", "cl": 2, "ucl": 20, "cal": 22, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SizeOnHover", "rp": "AvatarEditorHUD_SizeOnHover.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TMPColorOnToggle", "rp": "AvatarEditorHUD_TMPColorOnToggle.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TMPFontOnToggle", "rp": "AvatarEditorHUD_TMPFontOnToggle.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIButton", "rp": "AvatarEditorHUD_UIButton.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIRotate", "rp": "AvatarEditorHUD_UIRotate.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIToggle", "rp": "AvatarEditorHUD_UIToggle.html", "cl": 5, "ucl": 4, "cal": 9, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarEditorHUDTests",
    "classes": [
      { "name": "AvatarEditorHUD_Tests.AvatarEditorHUDController_Mock", "rp": "AvatarEditorHUDTests_AvatarEditorHUDController_Mock.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUD_Tests.AvatarEditorHUDControllerShould", "rp": "AvatarEditorHUDTests_AvatarEditorHUDControllerShould.html", "cl": 86, "ucl": 0, "cal": 86, "tl": 304, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUD_Tests.AvatarEditorHUDViewShould", "rp": "AvatarEditorHUDTests_AvatarEditorHUDViewShould.html", "cl": 80, "ucl": 0, "cal": 80, "tl": 283, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarEditorHUD_Tests.WearableItemsShould", "rp": "AvatarEditorHUDTests_WearableItemsShould.html", "cl": 57, "ucl": 0, "cal": 57, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarModel",
    "classes": [
      { "name": "AvatarModel", "rp": "AvatarModel_AvatarModel.html", "cl": 19, "ucl": 0, "cal": 19, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarModifiersTest",
    "classes": [
      { "name": "AvatarModifierAreaShould", "rp": "AvatarModifiersTest_AvatarModifierAreaShould.html", "cl": 44, "ucl": 0, "cal": 44, "tl": 101, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarShape",
    "classes": [
      { "name": "AvatarAnimationEventAudioHandler", "rp": "AvatarShape_AvatarAnimationEventAudioHandler.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAnimationsVariable", "rp": "AvatarShape_AvatarAnimationsVariable.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAnimatorLegacy", "rp": "AvatarShape_AvatarAnimatorLegacy.html", "cl": 15, "ucl": 90, "cal": 105, "tl": 280, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAudioHandlerLocal", "rp": "AvatarShape_AvatarAudioHandlerLocal.html", "cl": 33, "ucl": 3, "cal": 36, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarAudioHandlerRemote", "rp": "AvatarShape_AvatarAudioHandlerRemote.html", "cl": 1, "ucl": 60, "cal": 61, "tl": 153, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarModifierArea", "rp": "AvatarShape_AvatarModifierArea.html", "cl": 55, "ucl": 5, "cal": 60, "tl": 159, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarName", "rp": "AvatarShape_AvatarName.html", "cl": 11, "ucl": 31, "cal": 42, "tl": 101, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarUtils", "rp": "AvatarShape_AvatarUtils.html", "cl": 0, "ucl": 50, "cal": 50, "tl": 132, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BodyShapeController", "rp": "AvatarShape_BodyShapeController.html", "cl": 0, "ucl": 114, "cal": 114, "tl": 223, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BoxTriggerArea", "rp": "AvatarShape_BoxTriggerArea.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AvatarMovementController", "rp": "AvatarShape_AvatarMovementController.html", "cl": 8, "ucl": 51, "cal": 59, "tl": 155, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AvatarRenderer", "rp": "AvatarShape_AvatarRenderer.html", "cl": 62, "ucl": 180, "cal": 242, "tl": 507, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AvatarShape", "rp": "AvatarShape_AvatarShape.html", "cl": 40, "ucl": 46, "cal": 86, "tl": 197, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.AvatarVisibility", "rp": "AvatarShape_AvatarVisibility.html", "cl": 13, "ucl": 1, "cal": 14, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DisablePassportModifier", "rp": "AvatarShape_DisablePassportModifier.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FacialFeatureController", "rp": "AvatarShape_FacialFeatureController.html", "cl": 41, "ucl": 21, "cal": 62, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HideAvatarsModifier", "rp": "AvatarShape_HideAvatarsModifier.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ParticlesOnAvatarVisualCue", "rp": "AvatarShape_ParticlesOnAvatarVisualCue.html", "cl": 8, "ucl": 8, "cal": 16, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WearableController", "rp": "AvatarShape_WearableController.html", "cl": 61, "ucl": 33, "cal": 94, "tl": 205, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarShapeTests",
    "classes": [
      { "name": "AvatarShape_Tests.AnimatorLegacyShould", "rp": "AvatarShapeTests_AnimatorLegacyShould.html", "cl": 0, "ucl": 24, "cal": 24, "tl": 343, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.AvatarRenderer_Mock", "rp": "AvatarShapeTests_AvatarRenderer_Mock.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.AvatarRendererShould", "rp": "AvatarShapeTests_AvatarRendererShould.html", "cl": 0, "ucl": 127, "cal": 127, "tl": 343, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.AvatarShapeTestHelpers", "rp": "AvatarShapeTests_AvatarShapeTestHelpers.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.BodyShapeController_Mock", "rp": "AvatarShapeTests_BodyShapeController_Mock.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.FacialFeatureControllerShould", "rp": "AvatarShapeTests_FacialFeatureControllerShould.html", "cl": 33, "ucl": 0, "cal": 33, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.WearableController_Mock", "rp": "AvatarShapeTests_WearableController_Mock.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.WearableControllerShould", "rp": "AvatarShapeTests_WearableControllerShould.html", "cl": 69, "ucl": 0, "cal": 69, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AvatarShape_Tests.WearableItemsShould", "rp": "AvatarShapeTests_WearableItemsShould.html", "cl": 0, "ucl": 136, "cal": 136, "tl": 293, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.AvatarShapeTests", "rp": "AvatarShapeTests_AvatarShapeTests.html", "cl": 8, "ucl": 39, "cal": 47, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.AvatarVisibilityShould", "rp": "AvatarShapeTests_AvatarVisibilityShould.html", "cl": 17, "ucl": 0, "cal": 17, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "AvatarShapeVisualTests",
    "classes": [
      { "name": "Tests.AvatarShapeVisualTests", "rp": "AvatarShapeVisualTests_AvatarShapeVisualTests.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.FacialFeatureController_VisualTests", "rp": "AvatarShapeVisualTests_FacialFeatureController_VisualTests.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BaseVariableTests",
    "classes": [
      { "name": "VariableTests.BaseVariableTest[ValueType,VariableType]", "rp": "BaseVariableTests_BaseVariableTest_ValueType_VariableType_.html", "cl": 17, "ucl": 0, "cal": 17, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VariableTests.FloatVariableShould", "rp": "BaseVariableTests_FloatVariableShould.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VariableTests.Vector2IntVariableShould", "rp": "BaseVariableTests_Vector2IntVariableShould.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VariableTests.Vector3VariableShould", "rp": "BaseVariableTests_Vector3VariableShould.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BillboardTests",
    "classes": [
      { "name": "Tests.BillboardTests", "rp": "BillboardTests_BillboardTests.html", "cl": 63, "ucl": 0, "cal": 63, "tl": 151, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BIWAnalytics",
    "classes": [
      { "name": "BIWAnalytics", "rp": "BIWAnalytics_BIWAnalytics.html", "cl": 24, "ucl": 94, "cal": 118, "tl": 238, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BIWUrls",
    "classes": [
      { "name": "BIWUrlUtils", "rp": "BIWUrls_BIWUrlUtils.html", "cl": 4, "ucl": 2, "cal": 6, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BlockerControllerTests",
    "classes": [
      { "name": "BlockerHandlerCan", "rp": "BlockerControllerTests_BlockerHandlerCan.html", "cl": 49, "ucl": 0, "cal": 49, "tl": 119, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BlockersControllerShould", "rp": "BlockerControllerTests_BlockersControllerShould.html", "cl": 78, "ucl": 0, "cal": 78, "tl": 150, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BotsControllerInterface",
    "classes": [
      { "name": "DCL.Bots.CoordsInstantiationConfig", "rp": "BotsControllerInterface_CoordsInstantiationConfig.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Bots.WorldPosInstantiationConfig", "rp": "BotsControllerInterface_WorldPosInstantiationConfig.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Builder",
    "classes": [
      { "name": "Builder.BuilderConfig", "rp": "Builder_BuilderConfig.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 65, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderBridge", "rp": "Builder_DCLBuilderBridge.html", "cl": 118, "ucl": 185, "cal": 303, "tl": 688, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderCamera", "rp": "Builder_DCLBuilderCamera.html", "cl": 64, "ucl": 69, "cal": 133, "tl": 272, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderConfig", "rp": "Builder_DCLBuilderConfig.html", "cl": 1, "ucl": 10, "cal": 11, "tl": 65, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderEntity", "rp": "Builder_DCLBuilderEntity.html", "cl": 80, "ucl": 75, "cal": 155, "tl": 366, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderEnvironment", "rp": "Builder_DCLBuilderEnvironment.html", "cl": 17, "ucl": 3, "cal": 20, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderInput", "rp": "Builder_DCLBuilderInput.html", "cl": 22, "ucl": 32, "cal": 54, "tl": 159, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderObjectDragger", "rp": "Builder_DCLBuilderObjectDragger.html", "cl": 15, "ucl": 36, "cal": 51, "tl": 123, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderObjectSelector", "rp": "Builder_DCLBuilderObjectSelector.html", "cl": 44, "ucl": 164, "cal": 208, "tl": 466, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderOutline", "rp": "Builder_DCLBuilderOutline.html", "cl": 46, "ucl": 14, "cal": 60, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderRaycast", "rp": "Builder_DCLBuilderRaycast.html", "cl": 7, "ucl": 26, "cal": 33, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderSceneMetricsController", "rp": "Builder_DCLBuilderSceneMetricsController.html", "cl": 17, "ucl": 3, "cal": 20, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderSelectionCollider", "rp": "Builder_DCLBuilderSelectionCollider.html", "cl": 13, "ucl": 10, "cal": 23, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.DCLBuilderWebInterface", "rp": "Builder_DCLBuilderWebInterface.html", "cl": 22, "ucl": 37, "cal": 59, "tl": 145, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderGizmo", "rp": "Builder_DCLBuilderGizmo.html", "cl": 13, "ucl": 49, "cal": 62, "tl": 144, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderGizmoAxis", "rp": "Builder_DCLBuilderGizmoAxis.html", "cl": 0, "ucl": 23, "cal": 23, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderGizmoManager", "rp": "Builder_DCLBuilderGizmoManager.html", "cl": 72, "ucl": 53, "cal": 125, "tl": 297, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderRotateGizmo", "rp": "Builder_DCLBuilderRotateGizmo.html", "cl": 1, "ucl": 17, "cal": 18, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderScaleGizmo", "rp": "Builder_DCLBuilderScaleGizmo.html", "cl": 5, "ucl": 56, "cal": 61, "tl": 153, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.Gizmos.DCLBuilderTranslateGizmo", "rp": "Builder_DCLBuilderTranslateGizmo.html", "cl": 1, "ucl": 10, "cal": 11, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.MeshLoadIndicator.DCLBuilderMeshLoadIndicator", "rp": "Builder_DCLBuilderMeshLoadIndicator.html", "cl": 6, "ucl": 2, "cal": 8, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Builder.MeshLoadIndicator.DCLBuilderMeshLoadIndicatorController", "rp": "Builder_DCLBuilderMeshLoadIndicatorController.html", "cl": 54, "ucl": 8, "cal": 62, "tl": 141, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderEntity",
    "classes": [
      { "name": "DCLBuilderInWorldEntity", "rp": "BuilderEntity_DCLBuilderInWorldEntity.html", "cl": 211, "ucl": 93, "cal": 304, "tl": 682, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorld",
    "classes": [
      { "name": "ActionAdapter", "rp": "BuilderInWorld_ActionAdapter.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 52, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ActionController", "rp": "BuilderInWorld_ActionController.html", "cl": 84, "ucl": 40, "cal": 124, "tl": 250, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ActionListview", "rp": "BuilderInWorld_ActionListview.html", "cl": 0, "ucl": 22, "cal": 22, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWController", "rp": "BuilderInWorld_BIWController.html", "cl": 4, "ucl": 8, "cal": 12, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWCreatorController", "rp": "BuilderInWorld_BIWCreatorController.html", "cl": 119, "ucl": 68, "cal": 187, "tl": 398, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWFloorHandler", "rp": "BuilderInWorld_BIWFloorHandler.html", "cl": 53, "ucl": 22, "cal": 75, "tl": 177, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWInputHandler", "rp": "BuilderInWorld_BIWInputHandler.html", "cl": 4, "ucl": 82, "cal": 86, "tl": 197, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWLoadingPlaceHolder", "rp": "BuilderInWorld_BIWLoadingPlaceHolder.html", "cl": 12, "ucl": 11, "cal": 23, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWModeController", "rp": "BuilderInWorld_BIWModeController.html", "cl": 36, "ucl": 56, "cal": 92, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWOutlinerController", "rp": "BuilderInWorld_BIWOutlinerController.html", "cl": 24, "ucl": 56, "cal": 80, "tl": 180, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWPublishController", "rp": "BuilderInWorld_BIWPublishController.html", "cl": 11, "ucl": 46, "cal": 57, "tl": 119, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWSaveController", "rp": "BuilderInWorld_BIWSaveController.html", "cl": 29, "ucl": 13, "cal": 42, "tl": 89, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldAudioHandler", "rp": "BuilderInWorld_BuilderInWorldAudioHandler.html", "cl": 1, "ucl": 81, "cal": 82, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldBridge", "rp": "BuilderInWorld_BuilderInWorldBridge.html", "cl": 94, "ucl": 36, "cal": 130, "tl": 279, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldController", "rp": "BuilderInWorld_BuilderInWorldController.html", "cl": 40, "ucl": 366, "cal": 406, "tl": 819, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldEntityAction", "rp": "BuilderInWorld_BuilderInWorldEntityAction.html", "cl": 14, "ucl": 2, "cal": 16, "tl": 36, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldEntityHandler", "rp": "BuilderInWorld_BuilderInWorldEntityHandler.html", "cl": 197, "ucl": 234, "cal": 431, "tl": 892, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldFirstPersonMode", "rp": "BuilderInWorld_BuilderInWorldFirstPersonMode.html", "cl": 29, "ucl": 135, "cal": 164, "tl": 321, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldGodMode", "rp": "BuilderInWorld_BuilderInWorldGodMode.html", "cl": 59, "ucl": 346, "cal": 405, "tl": 860, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldInputWrapper", "rp": "BuilderInWorld_BuilderInWorldInputWrapper.html", "cl": 3, "ucl": 54, "cal": 57, "tl": 124, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldMode", "rp": "BuilderInWorld_BuilderInWorldMode.html", "cl": 27, "ucl": 93, "cal": 120, "tl": 259, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuildInWorldCompleteAction", "rp": "BuilderInWorld_BuildInWorldCompleteAction.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.FreeCameraMovement", "rp": "BuilderInWorld_FreeCameraMovement.html", "cl": 116, "ucl": 158, "cal": 274, "tl": 571, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VoxelController", "rp": "BuilderInWorld_VoxelController.html", "cl": 1, "ucl": 150, "cal": 151, "tl": 317, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VoxelEntityHit", "rp": "BuilderInWorld_VoxelEntityHit.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VoxelPrefab", "rp": "BuilderInWorld_VoxelPrefab.html", "cl": 1, "ucl": 9, "cal": 10, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldCatalog",
    "classes": [
      { "name": "BIWCatalogManager", "rp": "BuilderInWorldCatalog_BIWCatalogManager.html", "cl": 104, "ucl": 18, "cal": 122, "tl": 247, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogAssetGroupAdapter", "rp": "BuilderInWorldCatalog_CatalogAssetGroupAdapter.html", "cl": 9, "ucl": 28, "cal": 37, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogAssetPackAdapter", "rp": "BuilderInWorldCatalog_CatalogAssetPackAdapter.html", "cl": 0, "ucl": 27, "cal": 27, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogAssetPackListView", "rp": "BuilderInWorldCatalog_CatalogAssetPackListView.html", "cl": 1, "ucl": 34, "cal": 35, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogGroupListView", "rp": "BuilderInWorldCatalog_CatalogGroupListView.html", "cl": 17, "ucl": 36, "cal": 53, "tl": 117, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogItemAdapter", "rp": "BuilderInWorldCatalog_CatalogItemAdapter.html", "cl": 36, "ucl": 36, "cal": 72, "tl": 169, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogItemDropController", "rp": "BuilderInWorldCatalog_CatalogItemDropController.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FavoritesController", "rp": "BuilderInWorldCatalog_FavoritesController.html", "cl": 17, "ucl": 2, "cal": 19, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldCatalogData",
    "classes": [
      { "name": "CatalogItem", "rp": "BuilderInWorldCatalogData_CatalogItem.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogItemPack", "rp": "BuilderInWorldCatalogData_CatalogItemPack.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldCommon",
    "classes": [
      { "name": "ListView[T]", "rp": "BuilderInWorldCommon_ListView_T_.html", "cl": 1, "ucl": 21, "cal": 22, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldEntityInformation",
    "classes": [
      { "name": "ActionEventAdapter", "rp": "BuilderInWorldEntityInformation_ActionEventAdapter.html", "cl": 0, "ucl": 40, "cal": 40, "tl": 102, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ActionsListView", "rp": "BuilderInWorldEntityInformation_ActionsListView.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AttributeXYZ", "rp": "BuilderInWorldEntityInformation_AttributeXYZ.html", "cl": 24, "ucl": 36, "cal": 60, "tl": 128, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemActionEventAdapter", "rp": "BuilderInWorldEntityInformation_SmartItemActionEventAdapter.html", "cl": 3, "ucl": 90, "cal": 93, "tl": 194, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemActionPaddingDeleter", "rp": "BuilderInWorldEntityInformation_SmartItemActionPaddingDeleter.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemActionParameter", "rp": "BuilderInWorldEntityInformation_SmartItemActionParameter.html", "cl": 0, "ucl": 44, "cal": 44, "tl": 94, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemBooleanParameterAdapter", "rp": "BuilderInWorldEntityInformation_SmartItemBooleanParameterAdapter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemEntityParameter", "rp": "BuilderInWorldEntityInformation_SmartItemEntityParameter.html", "cl": 2, "ucl": 45, "cal": 47, "tl": 99, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemFloatParameter", "rp": "BuilderInWorldEntityInformation_SmartItemFloatParameter.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemIntegerParameter", "rp": "BuilderInWorldEntityInformation_SmartItemIntegerParameter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemListView", "rp": "BuilderInWorldEntityInformation_SmartItemListView.html", "cl": 2, "ucl": 15, "cal": 17, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemOptionsParameter", "rp": "BuilderInWorldEntityInformation_SmartItemOptionsParameter.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemParameterFactory", "rp": "BuilderInWorldEntityInformation_SmartItemParameterFactory.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemSliderParameter", "rp": "BuilderInWorldEntityInformation_SmartItemSliderParameter.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 89, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemTextAreaParameter", "rp": "BuilderInWorldEntityInformation_SmartItemTextAreaParameter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemTextParameter", "rp": "BuilderInWorldEntityInformation_SmartItemTextParameter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmartItemUIParameterAdapter", "rp": "BuilderInWorldEntityInformation_SmartItemUIParameterAdapter.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldNFT",
    "classes": [
      { "name": "BuilderInWorldNFTController", "rp": "BuilderInWorldNFT_BuilderInWorldNFTController.html", "cl": 30, "ucl": 20, "cal": 50, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldTeleportAndEdit",
    "classes": [
      { "name": "BuilderInWorldTeleportAndEdit", "rp": "BuilderInWorldTeleportAndEdit_BuilderInWorldTeleportAndEdit.html", "cl": 0, "ucl": 17, "cal": 17, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldTests",
    "classes": [
      { "name": "BIWActionsShould", "rp": "BuilderInWorldTests_BIWActionsShould.html", "cl": 100, "ucl": 0, "cal": 100, "tl": 192, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWCatalogShould", "rp": "BuilderInWorldTests_BIWCatalogShould.html", "cl": 62, "ucl": 4, "cal": 66, "tl": 128, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWCreatorShould", "rp": "BuilderInWorldTests_BIWCreatorShould.html", "cl": 84, "ucl": 0, "cal": 84, "tl": 185, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWEntityHandlerShould", "rp": "BuilderInWorldTests_BIWEntityHandlerShould.html", "cl": 41, "ucl": 0, "cal": 41, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWEntityShould", "rp": "BuilderInWorldTests_BIWEntityShould.html", "cl": 53, "ucl": 1, "cal": 54, "tl": 130, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWFloorHandlerShould", "rp": "BuilderInWorldTests_BIWFloorHandlerShould.html", "cl": 55, "ucl": 1, "cal": 56, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWGizmosShould", "rp": "BuilderInWorldTests_BIWGizmosShould.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWKernelBridgeShould", "rp": "BuilderInWorldTests_BIWKernelBridgeShould.html", "cl": 52, "ucl": 0, "cal": 52, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWModeControllerShould", "rp": "BuilderInWorldTests_BIWModeControllerShould.html", "cl": 26, "ucl": 0, "cal": 26, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWNftsShould", "rp": "BuilderInWorldTests_BIWNftsShould.html", "cl": 33, "ucl": 0, "cal": 33, "tl": 86, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWOutlinerShould", "rp": "BuilderInWorldTests_BIWOutlinerShould.html", "cl": 24, "ucl": 0, "cal": 24, "tl": 66, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWPublishShould", "rp": "BuilderInWorldTests_BIWPublishShould.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 88, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWSaveControllerShould", "rp": "BuilderInWorldTests_BIWSaveControllerShould.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWSceneBoundarieShould", "rp": "BuilderInWorldTests_BIWSceneBoundarieShould.html", "cl": 26, "ucl": 0, "cal": 26, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldShould", "rp": "BuilderInWorldTests_BuilderInWorldShould.html", "cl": 52, "ucl": 0, "cal": 52, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldTestHelper", "rp": "BuilderInWorldTests_BuilderInWorldTestHelper.html", "cl": 41, "ucl": 0, "cal": 41, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderInWorldUtils",
    "classes": [
      { "name": "BuilderInWorldUtils", "rp": "BuilderInWorldUtils_BuilderInWorldUtils.html", "cl": 52, "ucl": 128, "cal": 180, "tl": 397, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderProjectsPanel",
    "classes": [
      { "name": "BuilderProjectsPanelController", "rp": "BuilderProjectsPanel_BuilderProjectsPanelController.html", "cl": 87, "ucl": 45, "cal": 132, "tl": 302, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderProjectsPanelView", "rp": "BuilderProjectsPanel_BuilderProjectsPanelView.html", "cl": 47, "ucl": 13, "cal": 60, "tl": 183, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsSearchPromptController", "rp": "BuilderProjectsPanel_FriendsSearchPromptController.html", "cl": 44, "ucl": 3, "cal": 47, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LandController", "rp": "BuilderProjectsPanel_LandController.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LandElementView", "rp": "BuilderProjectsPanel_LandElementView.html", "cl": 73, "ucl": 16, "cal": 89, "tl": 206, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LeftMenuButtonToggleView", "rp": "BuilderProjectsPanel_LeftMenuButtonToggleView.html", "cl": 17, "ucl": 25, "cal": 42, "tl": 116, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LeftMenuHandler", "rp": "BuilderProjectsPanel_LeftMenuHandler.html", "cl": 31, "ucl": 4, "cal": 35, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LeftMenuSettingsViewHandler", "rp": "BuilderProjectsPanel_LeftMenuSettingsViewHandler.html", "cl": 30, "ucl": 20, "cal": 50, "tl": 123, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneCardView", "rp": "BuilderProjectsPanel_SceneCardView.html", "cl": 70, "ucl": 28, "cal": 98, "tl": 263, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneCardViewContextMenu", "rp": "BuilderProjectsPanel_SceneCardViewContextMenu.html", "cl": 41, "ucl": 30, "cal": 71, "tl": 163, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneContextMenuHandler", "rp": "BuilderProjectsPanel_SceneContextMenuHandler.html", "cl": 26, "ucl": 12, "cal": 38, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneData", "rp": "BuilderProjectsPanel_SceneData.html", "cl": 18, "ucl": 42, "cal": 60, "tl": 139, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScenesRefreshHelper", "rp": "BuilderProjectsPanel_ScenesRefreshHelper.html", "cl": 13, "ucl": 9, "cal": 22, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScenesViewController", "rp": "BuilderProjectsPanel_ScenesViewController.html", "cl": 99, "ucl": 27, "cal": 126, "tl": 313, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SearchBarView", "rp": "BuilderProjectsPanel_SearchBarView.html", "cl": 54, "ucl": 5, "cal": 59, "tl": 138, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SearchHandler[T]", "rp": "BuilderProjectsPanel_SearchHandler_T_.html", "cl": 64, "ucl": 6, "cal": 70, "tl": 147, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SearchHelper", "rp": "BuilderProjectsPanel_SearchHelper.html", "cl": 7, "ucl": 1, "cal": 8, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SearchInfo", "rp": "BuilderProjectsPanel_SearchInfo.html", "cl": 16, "ucl": 7, "cal": 23, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SearchInputField", "rp": "BuilderProjectsPanel_SearchInputField.html", "cl": 47, "ucl": 5, "cal": 52, "tl": 116, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionBase", "rp": "BuilderProjectsPanel_SectionBase.html", "cl": 11, "ucl": 4, "cal": 15, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionDeployedScenesController", "rp": "BuilderProjectsPanel_SectionDeployedScenesController.html", "cl": 35, "ucl": 11, "cal": 46, "tl": 105, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionDeployedScenesView", "rp": "BuilderProjectsPanel_SectionDeployedScenesView.html", "cl": 29, "ucl": 6, "cal": 35, "tl": 81, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionFactory", "rp": "BuilderProjectsPanel_SectionFactory.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionLandController", "rp": "BuilderProjectsPanel_SectionLandController.html", "cl": 76, "ucl": 18, "cal": 94, "tl": 218, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionLandView", "rp": "BuilderProjectsPanel_SectionLandView.html", "cl": 29, "ucl": 4, "cal": 33, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionProjectScenesController", "rp": "BuilderProjectsPanel_SectionProjectScenesController.html", "cl": 26, "ucl": 11, "cal": 37, "tl": 86, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionProjectScenesView", "rp": "BuilderProjectsPanel_SectionProjectScenesView.html", "cl": 8, "ucl": 5, "cal": 13, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneAdminsSettingsController", "rp": "BuilderProjectsPanel_SectionSceneAdminsSettingsController.html", "cl": 76, "ucl": 46, "cal": 122, "tl": 213, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneAdminsSettingsView", "rp": "BuilderProjectsPanel_SectionSceneAdminsSettingsView.html", "cl": 62, "ucl": 9, "cal": 71, "tl": 170, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneContributorsSettingsController", "rp": "BuilderProjectsPanel_SectionSceneContributorsSettingsController.html", "cl": 42, "ucl": 26, "cal": 68, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneContributorsSettingsView", "rp": "BuilderProjectsPanel_SectionSceneContributorsSettingsView.html", "cl": 41, "ucl": 7, "cal": 48, "tl": 119, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneGeneralSettingsController", "rp": "BuilderProjectsPanel_SectionSceneGeneralSettingsController.html", "cl": 19, "ucl": 22, "cal": 41, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSceneGeneralSettingsView", "rp": "BuilderProjectsPanel_SectionSceneGeneralSettingsView.html", "cl": 16, "ucl": 10, "cal": 26, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionScenesController", "rp": "BuilderProjectsPanel_SectionScenesController.html", "cl": 64, "ucl": 14, "cal": 78, "tl": 170, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionScenesView", "rp": "BuilderProjectsPanel_SectionScenesView.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionsController", "rp": "BuilderProjectsPanel_SectionsController.html", "cl": 44, "ucl": 28, "cal": 72, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionSearchHandler", "rp": "BuilderProjectsPanel_SectionSearchHandler.html", "cl": 17, "ucl": 16, "cal": 33, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SectionsHandler", "rp": "BuilderProjectsPanel_SectionsHandler.html", "cl": 28, "ucl": 6, "cal": 34, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SortDropdownButton", "rp": "BuilderProjectsPanel_SortDropdownButton.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 15, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SortDropdownView", "rp": "BuilderProjectsPanel_SortDropdownView.html", "cl": 30, "ucl": 5, "cal": 35, "tl": 86, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnpublishPopupController", "rp": "BuilderProjectsPanel_UnpublishPopupController.html", "cl": 32, "ucl": 4, "cal": 36, "tl": 83, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnpublishPopupView", "rp": "BuilderProjectsPanel_UnpublishPopupView.html", "cl": 65, "ucl": 1, "cal": 66, "tl": 144, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserElementView", "rp": "BuilderProjectsPanel_UserElementView.html", "cl": 56, "ucl": 22, "cal": 78, "tl": 192, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersSearchFriendsHandler", "rp": "BuilderProjectsPanel_UsersSearchFriendsHandler.html", "cl": 22, "ucl": 17, "cal": 39, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersSearchPromptController", "rp": "BuilderProjectsPanel_UsersSearchPromptController.html", "cl": 33, "ucl": 8, "cal": 41, "tl": 87, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersSearchPromptView", "rp": "BuilderProjectsPanel_UsersSearchPromptView.html", "cl": 23, "ucl": 9, "cal": 32, "tl": 83, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersSearchUserViewsHandler", "rp": "BuilderProjectsPanel_UsersSearchUserViewsHandler.html", "cl": 68, "ucl": 4, "cal": 72, "tl": 167, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderProjectsPanelEditor",
    "classes": [
      { "name": "BuilderProjectsPanelLocalTest", "rp": "BuilderProjectsPanelEditor_BuilderProjectsPanelLocalTest.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderProjectsPanelTests",
    "classes": [
      { "name": "Tests.BuilderProjectsPanelControllerShould", "rp": "BuilderProjectsPanelTests_BuilderProjectsPanelControllerShould.html", "cl": 82, "ucl": 0, "cal": 82, "tl": 174, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuilderProjectsPanelViewPrefabCheck", "rp": "BuilderProjectsPanelTests_BuilderProjectsPanelViewPrefabCheck.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.LandElementViewShould", "rp": "BuilderProjectsPanelTests_LandElementViewShould.html", "cl": 40, "ucl": 0, "cal": 40, "tl": 83, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.Listener_Mock", "rp": "BuilderProjectsPanelTests_Listener_Mock.html", "cl": 26, "ucl": 3, "cal": 29, "tl": 161, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SceneCardViewShould", "rp": "BuilderProjectsPanelTests_SceneCardViewShould.html", "cl": 30, "ucl": 0, "cal": 30, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SceneContextMenuShould", "rp": "BuilderProjectsPanelTests_SceneContextMenuShould.html", "cl": 34, "ucl": 20, "cal": 54, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.ScenesViewControllerShould", "rp": "BuilderProjectsPanelTests_ScenesViewControllerShould.html", "cl": 46, "ucl": 0, "cal": 46, "tl": 161, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SearchBarViewShould", "rp": "BuilderProjectsPanelTests_SearchBarViewShould.html", "cl": 97, "ucl": 0, "cal": 97, "tl": 186, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SearchHandlerShould", "rp": "BuilderProjectsPanelTests_SearchHandlerShould.html", "cl": 61, "ucl": 6, "cal": 67, "tl": 193, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionDeployedScenesViewShould", "rp": "BuilderProjectsPanelTests_SectionDeployedScenesViewShould.html", "cl": 62, "ucl": 0, "cal": 62, "tl": 129, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionFactory_Mock", "rp": "BuilderProjectsPanelTests_SectionFactory_Mock.html", "cl": 13, "ucl": 0, "cal": 13, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionLandShould", "rp": "BuilderProjectsPanelTests_SectionLandShould.html", "cl": 70, "ucl": 0, "cal": 70, "tl": 158, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionProjectScenesViewShould", "rp": "BuilderProjectsPanelTests_SectionProjectScenesViewShould.html", "cl": 24, "ucl": 0, "cal": 24, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionSceneAdminsSettingsShould", "rp": "BuilderProjectsPanelTests_SectionSceneAdminsSettingsShould.html", "cl": 44, "ucl": 0, "cal": 44, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionSceneContributorsSettingsShould", "rp": "BuilderProjectsPanelTests_SectionSceneContributorsSettingsShould.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionSceneGeneralSettingsViewShould", "rp": "BuilderProjectsPanelTests_SectionSceneGeneralSettingsViewShould.html", "cl": 26, "ucl": 0, "cal": 26, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionScenesShould", "rp": "BuilderProjectsPanelTests_SectionScenesShould.html", "cl": 73, "ucl": 0, "cal": 73, "tl": 126, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SectionsControllerShould", "rp": "BuilderProjectsPanelTests_SectionsControllerShould.html", "cl": 30, "ucl": 0, "cal": 30, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UnpublishPopupShould", "rp": "BuilderProjectsPanelTests_UnpublishPopupShould.html", "cl": 64, "ucl": 0, "cal": 64, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UsersSearchPromptShould", "rp": "BuilderProjectsPanelTests_UsersSearchPromptShould.html", "cl": 106, "ucl": 0, "cal": 106, "tl": 183, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuilderTests",
    "classes": [
      { "name": "BuilderMeshLoadingIndicator", "rp": "BuilderTests_BuilderMeshLoadingIndicator.html", "cl": 19, "ucl": 0, "cal": 19, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuildModeHUD",
    "classes": [
      { "name": "BIWSearchBarController", "rp": "BuildModeHUD_BIWSearchBarController.html", "cl": 51, "ucl": 29, "cal": 80, "tl": 188, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BIWSearchBarView", "rp": "BuildModeHUD_BIWSearchBarView.html", "cl": 11, "ucl": 2, "cal": 13, "tl": 47, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldLoadingController", "rp": "BuildModeHUD_BuilderInWorldLoadingController.html", "cl": 4, "ucl": 2, "cal": 6, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldLoadingTip", "rp": "BuildModeHUD_BuilderInWorldLoadingTip.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuilderInWorldLoadingView", "rp": "BuildModeHUD_BuilderInWorldLoadingView.html", "cl": 38, "ucl": 28, "cal": 66, "tl": 174, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuildModeConfirmationModalController", "rp": "BuildModeHUD_BuildModeConfirmationModalController.html", "cl": 22, "ucl": 0, "cal": 22, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuildModeConfirmationModalView", "rp": "BuildModeHUD_BuildModeConfirmationModalView.html", "cl": 19, "ucl": 0, "cal": 19, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuildModeHUDController", "rp": "BuildModeHUD_BuildModeHUDController.html", "cl": 239, "ucl": 56, "cal": 295, "tl": 650, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BuildModeHUDView", "rp": "BuildModeHUD_BuildModeHUDView.html", "cl": 73, "ucl": 9, "cal": 82, "tl": 188, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogBtnController", "rp": "BuildModeHUD_CatalogBtnController.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CatalogBtnView", "rp": "BuildModeHUD_CatalogBtnView.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CircleLoadingAnimator", "rp": "BuildModeHUD_CircleLoadingAnimator.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DragAndDropSceneObjectController", "rp": "BuildModeHUD_DragAndDropSceneObjectController.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DragAndDropSceneObjectView", "rp": "BuildModeHUD_DragAndDropSceneObjectView.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EntityInformationController", "rp": "BuildModeHUD_EntityInformationController.html", "cl": 94, "ucl": 11, "cal": 105, "tl": 238, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EntityInformationView", "rp": "BuildModeHUD_EntityInformationView.html", "cl": 62, "ucl": 22, "cal": 84, "tl": 228, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EntityListAdapter", "rp": "BuildModeHUD_EntityListAdapter.html", "cl": 8, "ucl": 91, "cal": 99, "tl": 206, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EntityListView", "rp": "BuildModeHUD_EntityListView.html", "cl": 2, "ucl": 21, "cal": 23, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExtraActionsController", "rp": "BuildModeHUD_ExtraActionsController.html", "cl": 29, "ucl": 3, "cal": 32, "tl": 88, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExtraActionsView", "rp": "BuildModeHUD_ExtraActionsView.html", "cl": 36, "ucl": 0, "cal": 36, "tl": 113, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FirstPersonModeController", "rp": "BuildModeHUD_FirstPersonModeController.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FirstPersonModeView", "rp": "BuildModeHUD_FirstPersonModeView.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InspectorBtnController", "rp": "BuildModeHUD_InspectorBtnController.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InspectorBtnView", "rp": "BuildModeHUD_InspectorBtnView.html", "cl": 17, "ucl": 0, "cal": 17, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InspectorController", "rp": "BuildModeHUD_InspectorController.html", "cl": 32, "ucl": 6, "cal": 38, "tl": 129, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InspectorView", "rp": "BuildModeHUD_InspectorView.html", "cl": 22, "ucl": 4, "cal": 26, "tl": 88, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LoadingBar", "rp": "BuildModeHUD_LoadingBar.html", "cl": 6, "ucl": 5, "cal": 11, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublicationDetailsController", "rp": "BuildModeHUD_PublicationDetailsController.html", "cl": 33, "ucl": 1, "cal": 34, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublicationDetailsView", "rp": "BuildModeHUD_PublicationDetailsView.html", "cl": 38, "ucl": 4, "cal": 42, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublishBtnController", "rp": "BuildModeHUD_PublishBtnController.html", "cl": 20, "ucl": 5, "cal": 25, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublishBtnView", "rp": "BuildModeHUD_PublishBtnView.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublishPopupController", "rp": "BuildModeHUD_PublishPopupController.html", "cl": 7, "ucl": 1, "cal": 8, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PublishPopupView", "rp": "BuildModeHUD_PublishPopupView.html", "cl": 23, "ucl": 3, "cal": 26, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuickBarController", "rp": "BuildModeHUD_QuickBarController.html", "cl": 45, "ucl": 25, "cal": 70, "tl": 161, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuickBarSlot", "rp": "BuildModeHUD_QuickBarSlot.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuickBarView", "rp": "BuildModeHUD_QuickBarView.html", "cl": 74, "ucl": 32, "cal": 106, "tl": 244, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SaveHUDController", "rp": "BuildModeHUD_SaveHUDController.html", "cl": 4, "ucl": 1, "cal": 5, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SaveHUDView", "rp": "BuildModeHUD_SaveHUDView.html", "cl": 13, "ucl": 32, "cal": 45, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneCatalogController", "rp": "BuildModeHUD_SceneCatalogController.html", "cl": 107, "ucl": 64, "cal": 171, "tl": 375, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneCatalogView", "rp": "BuildModeHUD_SceneCatalogView.html", "cl": 39, "ucl": 17, "cal": 56, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneLimitsController", "rp": "BuildModeHUD_SceneLimitsController.html", "cl": 76, "ucl": 18, "cal": 94, "tl": 182, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneLimitsView", "rp": "BuildModeHUD_SceneLimitsView.html", "cl": 17, "ucl": 8, "cal": 25, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ShortcutsController", "rp": "BuildModeHUD_ShortcutsController.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ShortcutsView", "rp": "BuildModeHUD_ShortcutsView.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TooltipController", "rp": "BuildModeHUD_TooltipController.html", "cl": 28, "ucl": 7, "cal": 35, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TooltipView", "rp": "BuildModeHUD_TooltipView.html", "cl": 7, "ucl": 2, "cal": 9, "tl": 44, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TopActionsButtonsController", "rp": "BuildModeHUD_TopActionsButtonsController.html", "cl": 73, "ucl": 5, "cal": 78, "tl": 167, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TopActionsButtonsView", "rp": "BuildModeHUD_TopActionsButtonsView.html", "cl": 121, "ucl": 25, "cal": 146, "tl": 394, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "BuildModeHUDTests",
    "classes": [
      { "name": "BIWSearchBarShould", "rp": "BuildModeHUDTests_BIWSearchBarShould.html", "cl": 58, "ucl": 0, "cal": 58, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.BuilderInWorldLoadingControllerShould", "rp": "BuildModeHUDTests_BuilderInWorldLoadingControllerShould.html", "cl": 14, "ucl": 0, "cal": 14, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.BuildModeConfirmationModalControllerShould", "rp": "BuildModeHUDTests_BuildModeConfirmationModalControllerShould.html", "cl": 32, "ucl": 0, "cal": 32, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.BuildModeHUDControllerShould", "rp": "BuildModeHUDTests_BuildModeHUDControllerShould.html", "cl": 219, "ucl": 1, "cal": 220, "tl": 598, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.CatalogBtnControllerShould", "rp": "BuildModeHUDTests_CatalogBtnControllerShould.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.DragAndDropSceneObjectControllerShould", "rp": "BuildModeHUDTests_DragAndDropSceneObjectControllerShould.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.EntityInformationControllerShould", "rp": "BuildModeHUDTests_EntityInformationControllerShould.html", "cl": 108, "ucl": 0, "cal": 108, "tl": 308, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.ExtraActionsControllerShould", "rp": "BuildModeHUDTests_ExtraActionsControllerShould.html", "cl": 30, "ucl": 0, "cal": 30, "tl": 100, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.FirstPersonModeControllerShould", "rp": "BuildModeHUDTests_FirstPersonModeControllerShould.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.InspectorBtnControllerShould", "rp": "BuildModeHUDTests_InspectorBtnControllerShould.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.InspectorControllerShould", "rp": "BuildModeHUDTests_InspectorControllerShould.html", "cl": 47, "ucl": 0, "cal": 47, "tl": 141, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.PublicationDetailsControllerShould", "rp": "BuildModeHUDTests_PublicationDetailsControllerShould.html", "cl": 48, "ucl": 0, "cal": 48, "tl": 144, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.PublishBtnControllerShould", "rp": "BuildModeHUDTests_PublishBtnControllerShould.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 88, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.PublishPopupControllerShould", "rp": "BuildModeHUDTests_PublishPopupControllerShould.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.QuickBarControllerShould", "rp": "BuildModeHUDTests_QuickBarControllerShould.html", "cl": 55, "ucl": 0, "cal": 55, "tl": 145, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.SaveHUDControllerShould", "rp": "BuildModeHUDTests_SaveHUDControllerShould.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.SceneCatalogControllerShould", "rp": "BuildModeHUDTests_SceneCatalogControllerShould.html", "cl": 71, "ucl": 0, "cal": 71, "tl": 230, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.SceneLimitsControllerShould", "rp": "BuildModeHUDTests_SceneLimitsControllerShould.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.ShortcutsControllerShould", "rp": "BuildModeHUDTests_ShortcutsControllerShould.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.TooltipControllerShould", "rp": "BuildModeHUDTests_TooltipControllerShould.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDControllers.TopActionsButtonsControllerShould", "rp": "BuildModeHUDTests_TopActionsButtonsControllerShould.html", "cl": 78, "ucl": 0, "cal": 78, "tl": 240, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.BuilderInWorldLoadingViewShould", "rp": "BuildModeHUDTests_BuilderInWorldLoadingViewShould.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.BuildModeConfirmationModalViewShould", "rp": "BuildModeHUDTests_BuildModeConfirmationModalViewShould.html", "cl": 39, "ucl": 0, "cal": 39, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.BuildModeHUDViewShould", "rp": "BuildModeHUDTests_BuildModeHUDViewShould.html", "cl": 84, "ucl": 0, "cal": 84, "tl": 226, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.CatalogBtnViewShould", "rp": "BuildModeHUDTests_CatalogBtnViewShould.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 82, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.DragAndDropSceneObjectViewShould", "rp": "BuildModeHUDTests_DragAndDropSceneObjectViewShould.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.EntityInformationViewShould", "rp": "BuildModeHUDTests_EntityInformationViewShould.html", "cl": 108, "ucl": 2, "cal": 110, "tl": 285, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.ExtraActionsViewShould", "rp": "BuildModeHUDTests_ExtraActionsViewShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 116, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.FirstPersonModeViewShould", "rp": "BuildModeHUDTests_FirstPersonModeViewShould.html", "cl": 24, "ucl": 0, "cal": 24, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.InspectorBtnViewShould", "rp": "BuildModeHUDTests_InspectorBtnViewShould.html", "cl": 24, "ucl": 0, "cal": 24, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.InspectorViewShould", "rp": "BuildModeHUDTests_InspectorViewShould.html", "cl": 78, "ucl": 0, "cal": 78, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.PublicationDetailsViewShould", "rp": "BuildModeHUDTests_PublicationDetailsViewShould.html", "cl": 69, "ucl": 0, "cal": 69, "tl": 199, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.PublishBtnViewShould", "rp": "BuildModeHUDTests_PublishBtnViewShould.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 82, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.PublishPopupViewShould", "rp": "BuildModeHUDTests_PublishPopupViewShould.html", "cl": 39, "ucl": 0, "cal": 39, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.QuickBarViewShould", "rp": "BuildModeHUDTests_QuickBarViewShould.html", "cl": 78, "ucl": 0, "cal": 78, "tl": 191, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.SceneCatalogViewShould", "rp": "BuildModeHUDTests_SceneCatalogViewShould.html", "cl": 48, "ucl": 0, "cal": 48, "tl": 150, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.SceneLimitsViewShould", "rp": "BuildModeHUDTests_SceneLimitsViewShould.html", "cl": 38, "ucl": 0, "cal": 38, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.ShortcutsViewShould", "rp": "BuildModeHUDTests_ShortcutsViewShould.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.TooltipViewShould", "rp": "BuildModeHUDTests_TooltipViewShould.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.BuildModeHUDViews.TopActionsButtonsViewShould", "rp": "BuildModeHUDTests_TopActionsButtonsViewShould.html", "cl": 90, "ucl": 0, "cal": 90, "tl": 261, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Camera",
    "classes": [
      { "name": "DCL.Camera.CameraController", "rp": "Camera_CameraController.html", "cl": 56, "ucl": 8, "cal": 64, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraControllerAudioHandler", "rp": "Camera_CameraControllerAudioHandler.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraDampOnGroundType", "rp": "Camera_CameraDampOnGroundType.html", "cl": 6, "ucl": 7, "cal": 13, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraDampOnSprint", "rp": "Camera_CameraDampOnSprint.html", "cl": 11, "ucl": 12, "cal": 23, "tl": 66, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraFreefall", "rp": "Camera_CameraFreefall.html", "cl": 6, "ucl": 22, "cal": 28, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraStateBase", "rp": "Camera_CameraStateBase.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraStateFPS", "rp": "Camera_CameraStateFPS.html", "cl": 20, "ucl": 10, "cal": 30, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraStateFreeBuildingMovement", "rp": "Camera_CameraStateFreeBuildingMovement.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Camera.CameraStateTPS", "rp": "Camera_CameraStateTPS.html", "cl": 36, "ucl": 54, "cal": 90, "tl": 193, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FollowWithDamping", "rp": "Camera_FollowWithDamping.html", "cl": 23, "ucl": 0, "cal": 23, "tl": 57, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OverrideCinemachineAxisInput", "rp": "Camera_OverrideCinemachineAxisInput.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SmoothAxisProvider", "rp": "Camera_SmoothAxisProvider.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CameraTests",
    "classes": [
      { "name": "CameraController_Test.CameraControllerShould", "rp": "CameraTests_CameraControllerShould.html", "cl": 21, "ucl": 1, "cal": 22, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CatalogController",
    "classes": [
      { "name": "CatalogController", "rp": "CatalogController_CatalogController.html", "cl": 48, "ucl": 94, "cal": 142, "tl": 355, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Catalyst",
    "classes": [
      { "name": "Catalyst", "rp": "Catalyst_Catalyst.html", "cl": 12, "ucl": 74, "cal": 86, "tl": 188, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CatalystInterfaces",
    "classes": [
      { "name": "CatalystEntitiesType", "rp": "CatalystInterfaces_CatalystEntitiesType.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CharacterControllerTests",
    "classes": [
      { "name": "Tests.CharacterControllerTests", "rp": "CharacterControllerTests_CharacterControllerTests.html", "cl": 21, "ucl": 111, "cal": 132, "tl": 338, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ChatController",
    "classes": [
      { "name": "ChatController", "rp": "ChatController_ChatController.html", "cl": 5, "ucl": 18, "cal": 23, "tl": 83, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ChatControllerTests",
    "classes": [
      { "name": "ChatController_Mock", "rp": "ChatControllerTests_ChatController_Mock.html", "cl": 10, "ucl": 2, "cal": 12, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TestHelpers_Chat", "rp": "ChatControllerTests_TestHelpers_Chat.html", "cl": 12, "ucl": 3, "cal": 15, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ChatHUD",
    "classes": [
      { "name": "ChatEntry", "rp": "ChatHUD_ChatEntry.html", "cl": 67, "ucl": 48, "cal": 115, "tl": 290, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ChatHUDController", "rp": "ChatHUD_ChatHUDController.html", "cl": 46, "ucl": 6, "cal": 52, "tl": 114, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ChatHUDView", "rp": "ChatHUD_ChatHUDView.html", "cl": 76, "ucl": 17, "cal": 93, "tl": 211, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DateSeparatorEntry", "rp": "ChatHUD_DateSeparatorEntry.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ChatHUDTests",
    "classes": [
      { "name": "ChatEntryShould", "rp": "ChatHUDTests_ChatEntryShould.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ChatHUDShould", "rp": "ChatHUDTests_ChatHUDShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 93, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ChatMessage",
    "classes": [
      { "name": "DCL.Interface.ChatMessage", "rp": "ChatMessage_ChatMessage.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Clipboard",
    "classes": [
      { "name": "Clipboard", "rp": "Clipboard_Clipboard.html", "cl": 17, "ucl": 1, "cal": 18, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ClipboardStandalone", "rp": "Clipboard_ClipboardStandalone.html", "cl": 1, "ucl": 2, "cal": 3, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ClipboardWebGL", "rp": "Clipboard_ClipboardWebGL.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 99, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ClipboardTests",
    "classes": [
      { "name": "ClipboardHandler_Mock", "rp": "ClipboardTests_ClipboardHandler_Mock.html", "cl": 13, "ucl": 3, "cal": 16, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ClipboardTests", "rp": "ClipboardTests_ClipboardTests.html", "cl": 24, "ucl": 4, "cal": 28, "tl": 52, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Configuration",
    "classes": [
      { "name": "DCL.Configuration.ApplicationSettings", "rp": "Configuration_ApplicationSettings.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.AssetManagerSettings", "rp": "Configuration_AssetManagerSettings.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.BuilderInWorldSettings", "rp": "Configuration_BuilderInWorldSettings.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.EnvironmentSettings", "rp": "Configuration_EnvironmentSettings.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.InputSettings", "rp": "Configuration_InputSettings.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.MessageThrottlingSettings", "rp": "Configuration_MessageThrottlingSettings.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.NFTDataFetchingSettings", "rp": "Configuration_NFTDataFetchingSettings.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.ParcelSettings", "rp": "Configuration_ParcelSettings.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.PhysicsLayers", "rp": "Configuration_PhysicsLayers.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.PlayerSettings", "rp": "Configuration_PlayerSettings.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.TestSettings", "rp": "Configuration_TestSettings.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Configuration.UISettings", "rp": "Configuration_UISettings.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ContentProvider",
    "classes": [
      { "name": "DCL.ContentProvider", "rp": "ContentProvider_ContentProvider.html", "cl": 43, "ucl": 26, "cal": 69, "tl": 188, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ContentProvider_Dummy", "rp": "ContentProvider_ContentProvider_Dummy.html", "cl": 6, "ucl": 4, "cal": 10, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ContentServerUtils",
    "classes": [
      { "name": "DCL.ContentServerUtils", "rp": "ContentServerUtils_ContentServerUtils.html", "cl": 0, "ucl": 20, "cal": 20, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ControlsHUD",
    "classes": [
      { "name": "ControlsHUDController", "rp": "ControlsHUD_ControlsHUDController.html", "cl": 24, "ucl": 19, "cal": 43, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ControlsHUDView", "rp": "ControlsHUD_ControlsHUDView.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ControlsHUDTest",
    "classes": [
      { "name": "Tests.ControlsHUDTest", "rp": "ControlsHUDTest_ControlsHUDTest.html", "cl": 14, "ucl": 0, "cal": 14, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CoroutineHelpers",
    "classes": [
      { "name": "CoroutineStarter", "rp": "CoroutineHelpers_CoroutineStarter.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.CleanableYieldInstruction", "rp": "CoroutineHelpers_CleanableYieldInstruction.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.CoroutineHelpers", "rp": "CoroutineHelpers_CoroutineHelpers.html", "cl": 18, "ucl": 8, "cal": 26, "tl": 143, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WaitUntil", "rp": "CoroutineHelpers_WaitUntil.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 143, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CrashPayloadUtils",
    "classes": [
      { "name": "DCL.Helpers.AssetBundleDumper", "rp": "CrashPayloadUtils_AssetBundleDumper.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.CrashPayloadPositionTracker", "rp": "CrashPayloadUtils_CrashPayloadPositionTracker.html", "cl": 19, "ucl": 2, "cal": 21, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.CrashPayloadUtils", "rp": "CrashPayloadUtils_CrashPayloadUtils.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.GltfDumper", "rp": "CrashPayloadUtils_GltfDumper.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.PoolManagerDumper", "rp": "CrashPayloadUtils_PoolManagerDumper.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.PositionDumper", "rp": "CrashPayloadUtils_PositionDumper.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.QualitySettingsDumper", "rp": "CrashPayloadUtils_QualitySettingsDumper.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.ScenesDumper", "rp": "CrashPayloadUtils_ScenesDumper.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.TextureDumper", "rp": "CrashPayloadUtils_TextureDumper.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CullingController",
    "classes": [
      { "name": "DCL.Rendering.CullingController", "rp": "CullingController_CullingController.html", "cl": 173, "ucl": 25, "cal": 198, "tl": 481, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Rendering.CullingControllerUtils", "rp": "CullingController_CullingControllerUtils.html", "cl": 49, "ucl": 3, "cal": 52, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Rendering.CullingObjectsTracker", "rp": "CullingController_CullingObjectsTracker.html", "cl": 26, "ucl": 2, "cal": 28, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CullingControllerInterfaces",
    "classes": [
      { "name": "DCL.Rendering.CullingControllerProfile", "rp": "CullingControllerInterfaces_CullingControllerProfile.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Rendering.CullingControllerSettings", "rp": "CullingControllerInterfaces_CullingControllerSettings.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CullingControllerTests",
    "classes": [
      { "name": "CullingControllerTests.CullingControllerAndScenesShould", "rp": "CullingControllerTests_CullingControllerAndScenesShould.html", "cl": 54, "ucl": 0, "cal": 54, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CullingControllerTests.CullingControllerShould", "rp": "CullingControllerTests_CullingControllerShould.html", "cl": 175, "ucl": 0, "cal": 175, "tl": 346, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CullingControllerTests.CullingObjectsTrackerShould", "rp": "CullingControllerTests_CullingObjectsTrackerShould.html", "cl": 50, "ucl": 0, "cal": 50, "tl": 98, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "CursorControllerTests",
    "classes": [
      { "name": "Tests.CursorControllerTests", "rp": "CursorControllerTests_CursorControllerTests.html", "cl": 88, "ucl": 1, "cal": 89, "tl": 288, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DataCache",
    "classes": [
      { "name": "DataCache[T]", "rp": "DataCache_DataCache_T_.html", "cl": 6, "ucl": 25, "cal": 31, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DataStore",
    "classes": [
      { "name": "BaseCollection[T]", "rp": "DataStore_BaseCollection_T_.html", "cl": 19, "ucl": 5, "cal": 24, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseDictionary[TKey,TValue]", "rp": "DataStore_BaseDictionary_TKey_TValue_.html", "cl": 28, "ucl": 4, "cal": 32, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseVariable[T]", "rp": "DataStore_BaseVariable_T_.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.DataStore", "rp": "DataStore_DataStore.html", "cl": 25, "ucl": 0, "cal": 25, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Variables.RealmsInfo.CurrentRealmModel", "rp": "DataStore_CurrentRealmModel.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Variables.RealmsInfo.CurrentRealmVariable", "rp": "DataStore_CurrentRealmVariable.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Variables.RealmsInfo.RealmsVariable", "rp": "DataStore_RealmsVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DataStoreBridge",
    "classes": [
      { "name": "DataStoreBridge", "rp": "DataStoreBridge_DataStoreBridge.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DataStoreTests",
    "classes": [
      { "name": "BaseCollectionShould", "rp": "DataStoreTests_BaseCollectionShould.html", "cl": 52, "ucl": 0, "cal": 52, "tl": 169, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseDictionaryShould", "rp": "DataStoreTests_BaseDictionaryShould.html", "cl": 43, "ucl": 0, "cal": 43, "tl": 169, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DebugController",
    "classes": [
      { "name": "DCL.DebugController", "rp": "DebugController_DebugController.html", "cl": 22, "ucl": 20, "cal": 42, "tl": 101, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.DebugView", "rp": "DebugController_DebugView.html", "cl": 2, "ucl": 6, "cal": 8, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "DeployedScenesFetcher",
    "classes": [
      { "name": "DeployedScene", "rp": "DeployedScenesFetcher_DeployedScene.html", "cl": 0, "ucl": 48, "cal": 48, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DeployedScenesFetcher", "rp": "DeployedScenesFetcher_DeployedScenesFetcher.html", "cl": 8, "ucl": 38, "cal": 46, "tl": 105, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LandWithAccess", "rp": "DeployedScenesFetcher_LandWithAccess.html", "cl": 6, "ucl": 6, "cal": 12, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "EditorUtils",
    "classes": [
      { "name": "CompilerOptions", "rp": "EditorUtils_CompilerOptions.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EditorUtils", "rp": "EditorUtils_EditorUtils.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "EntityTests",
    "classes": [
      { "name": "Tests.EntityTests", "rp": "EntityTests_EntityTests.html", "cl": 34, "ucl": 0, "cal": 34, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "EntryPoint_World",
    "classes": [
      { "name": "EntryPoint_World", "rp": "EntryPoint_World_EntryPoint_World.html", "cl": 79, "ucl": 14, "cal": 93, "tl": 365, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "EntryPoint_World_Tests",
    "classes": [
      { "name": "EntryPointWorldShould", "rp": "EntryPoint_World_Tests_EntryPointWorldShould.html", "cl": 80, "ucl": 0, "cal": 80, "tl": 179, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MessageQueueHandler_Mock", "rp": "EntryPoint_World_Tests_MessageQueueHandler_Mock.html", "cl": 5, "ucl": 6, "cal": 11, "tl": 179, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Environment",
    "classes": [
      { "name": "DCL.Environment", "rp": "Environment_Environment.html", "cl": 35, "ucl": 4, "cal": 39, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.HUDContext", "rp": "Environment_HUDContext.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessagingContext", "rp": "Environment_MessagingContext.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PlatformContext", "rp": "Environment_PlatformContext.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WorldRuntimeContext", "rp": "Environment_WorldRuntimeContext.html", "cl": 13, "ucl": 0, "cal": 13, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExploreHUD",
    "classes": [
      { "name": "AnimationHandler", "rp": "ExploreHUD_AnimationHandler.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExploreFriendsView", "rp": "ExploreHUD_ExploreFriendsView.html", "cl": 18, "ucl": 9, "cal": 27, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExploreHUDAudioHandler", "rp": "ExploreHUD_ExploreHUDAudioHandler.html", "cl": 4, "ucl": 7, "cal": 11, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExploreHUDController", "rp": "ExploreHUD_ExploreHUDController.html", "cl": 41, "ucl": 15, "cal": 56, "tl": 127, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExploreHUDView", "rp": "ExploreHUD_ExploreHUDView.html", "cl": 16, "ucl": 1, "cal": 17, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsHandler", "rp": "ExploreHUD_FriendsHandler.html", "cl": 3, "ucl": 1, "cal": 4, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendTracker", "rp": "ExploreHUD_FriendTracker.html", "cl": 26, "ucl": 12, "cal": 38, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendTrackerController", "rp": "ExploreHUD_FriendTrackerController.html", "cl": 50, "ucl": 20, "cal": 70, "tl": 159, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GotoMagicButton", "rp": "ExploreHUD_GotoMagicButton.html", "cl": 3, "ucl": 9, "cal": 12, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HighlightScenesController", "rp": "ExploreHUD_HighlightScenesController.html", "cl": 49, "ucl": 22, "cal": 71, "tl": 163, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HotSceneCellView", "rp": "ExploreHUD_HotSceneCellView.html", "cl": 53, "ucl": 30, "cal": 83, "tl": 201, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MapInfoHandler", "rp": "ExploreHUD_MapInfoHandler.html", "cl": 8, "ucl": 6, "cal": 14, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneInfoView", "rp": "ExploreHUD_SceneInfoView.html", "cl": 19, "ucl": 55, "cal": 74, "tl": 166, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ThumbnailHandler", "rp": "ExploreHUD_ThumbnailHandler.html", "cl": 14, "ucl": 9, "cal": 23, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TrackedSceneInfo", "rp": "ExploreHUD_TrackedSceneInfo.html", "cl": 3, "ucl": 2, "cal": 5, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ViewPool[T]", "rp": "ExploreHUD_ViewPool_T_.html", "cl": 20, "ucl": 1, "cal": 21, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExploreHUDTest",
    "classes": [
      { "name": "Tests.ExploreHUDShould", "rp": "ExploreHUDTest_ExploreHUDShould.html", "cl": 69, "ucl": 1, "cal": 70, "tl": 248, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExpressionsHUD",
    "classes": [
      { "name": "ExpressionsHUDController", "rp": "ExpressionsHUD_ExpressionsHUDController.html", "cl": 19, "ucl": 1, "cal": 20, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExpressionsHUDView", "rp": "ExpressionsHUD_ExpressionsHUDView.html", "cl": 37, "ucl": 4, "cal": 41, "tl": 110, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExpressionsHUDTests",
    "classes": [
      { "name": "ExpressionsHUD_Test.ExpressionsHUDControllerShould", "rp": "ExpressionsHUDTests_ExpressionsHUDControllerShould.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 110, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExpressionsHUD_Test.ExpressionsHUDViewShould", "rp": "ExpressionsHUDTests_ExpressionsHUDViewShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 110, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExternalUrlPromptHUD",
    "classes": [
      { "name": "ExternalUrlPromptHUDController", "rp": "ExternalUrlPromptHUD_ExternalUrlPromptHUDController.html", "cl": 40, "ucl": 1, "cal": 41, "tl": 93, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExternalUrlPromptView", "rp": "ExternalUrlPromptHUD_ExternalUrlPromptView.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ExternalUrlPromptHUDTest",
    "classes": [
      { "name": "Tests.ExternalUrlPromptHUDShould", "rp": "ExternalUrlPromptHUDTest_ExternalUrlPromptHUDShould.html", "cl": 31, "ucl": 0, "cal": 31, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FocusStateBridge",
    "classes": [
      { "name": "FocusStateBridge", "rp": "FocusStateBridge_FocusStateBridge.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FontTests",
    "classes": [
      { "name": "Tests.FontTests", "rp": "FontTests_FontTests.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 104, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FPSDisplay",
    "classes": [
      { "name": "DCL.FPSDisplay.FPSColor", "rp": "FPSDisplay_FPSColor.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.FPSDisplay.FPSColoring", "rp": "FPSDisplay_FPSColoring.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.FPSDisplay.FPSDisplay", "rp": "FPSDisplay_FPSDisplay.html", "cl": 22, "ucl": 1, "cal": 23, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FPSDisplayTests",
    "classes": [
      { "name": "FPSDisplayTests.HiccupTests", "rp": "FPSDisplayTests_HiccupTests.html", "cl": 41, "ucl": 0, "cal": 41, "tl": 101, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.FPSDisplayTests", "rp": "FPSDisplayTests_FPSDisplayTests.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FriendsController",
    "classes": [
      { "name": "FriendsController", "rp": "FriendsController_FriendsController.html", "cl": 18, "ucl": 52, "cal": 70, "tl": 239, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FriendsControllerTests",
    "classes": [
      { "name": "FriendsController_Mock", "rp": "FriendsControllerTests_FriendsController_Mock.html", "cl": 13, "ucl": 2, "cal": 15, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TestHelpers_Friends", "rp": "FriendsControllerTests_TestHelpers_Friends.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FriendsHUD",
    "classes": [
      { "name": "FriendEntry", "rp": "FriendsHUD_FriendEntry.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendEntryBase", "rp": "FriendsHUD_FriendEntryBase.html", "cl": 21, "ucl": 8, "cal": 29, "tl": 90, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendRequestEntry", "rp": "FriendsHUD_FriendRequestEntry.html", "cl": 20, "ucl": 1, "cal": 21, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendRequestsTabView", "rp": "FriendsHUD_FriendRequestsTabView.html", "cl": 69, "ucl": 20, "cal": 89, "tl": 201, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsHUDController", "rp": "FriendsHUD_FriendsHUDController.html", "cl": 98, "ucl": 38, "cal": 136, "tl": 296, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsHUDView", "rp": "FriendsHUD_FriendsHUDView.html", "cl": 39, "ucl": 30, "cal": 69, "tl": 204, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsListToggleButton", "rp": "FriendsHUD_FriendsListToggleButton.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsTabView", "rp": "FriendsHUD_FriendsTabView.html", "cl": 60, "ucl": 24, "cal": 84, "tl": 185, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsTabViewBase", "rp": "FriendsHUD_FriendsTabViewBase.html", "cl": 88, "ucl": 28, "cal": 116, "tl": 279, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "JumpInButton", "rp": "FriendsHUD_JumpInButton.html", "cl": 36, "ucl": 2, "cal": 38, "tl": 109, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "FriendsHUDTests",
    "classes": [
      { "name": "FriendEntryShould", "rp": "FriendsHUDTests_FriendEntryShould.html", "cl": 34, "ucl": 0, "cal": 34, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendRequestEntryShould", "rp": "FriendsHUDTests_FriendRequestEntryShould.html", "cl": 69, "ucl": 0, "cal": 69, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsHUDControllerShould", "rp": "FriendsHUDTests_FriendsHUDControllerShould.html", "cl": 114, "ucl": 0, "cal": 114, "tl": 218, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FriendsHUDViewShould", "rp": "FriendsHUDTests_FriendsHUDViewShould.html", "cl": 122, "ucl": 0, "cal": 122, "tl": 247, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "JumpInButtonShould", "rp": "FriendsHUDTests_JumpInButtonShould.html", "cl": 50, "ucl": 0, "cal": 50, "tl": 153, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GenericAnalytics",
    "classes": [
      { "name": "GenericAnalytics", "rp": "GenericAnalytics_GenericAnalytics.html", "cl": 3, "ucl": 1, "cal": 4, "tl": 15, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GenericPointers",
    "classes": [
      { "name": "RaycastPointerClickProxy", "rp": "GenericPointers_RaycastPointerClickProxy.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GifFrameData",
    "classes": [
      { "name": "GifFrameData", "rp": "GifFrameData_GifFrameData.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GIFProcessingBridge",
    "classes": [
      { "name": "DCL.GIFProcessingBridge", "rp": "GIFProcessingBridge_GIFProcessingBridge.html", "cl": 5, "ucl": 41, "cal": 46, "tl": 141, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GifProcessor",
    "classes": [
      { "name": "GifProcessor", "rp": "GifProcessor_GifProcessor.html", "cl": 23, "ucl": 16, "cal": 39, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GlobalUsersPositionMarker",
    "classes": [
      { "name": "DCL.FetchScenesHandler", "rp": "GlobalUsersPositionMarker_FetchScenesHandler.html", "cl": 29, "ucl": 13, "cal": 42, "tl": 126, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MapGlobalUsersPositionMarkerController", "rp": "GlobalUsersPositionMarker_MapGlobalUsersPositionMarkerController.html", "cl": 31, "ucl": 1, "cal": 32, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MarkersHandler", "rp": "GlobalUsersPositionMarker_MarkersHandler.html", "cl": 57, "ucl": 2, "cal": 59, "tl": 152, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.UserPositionMarker", "rp": "GlobalUsersPositionMarker_UserPositionMarker.html", "cl": 21, "ucl": 4, "cal": 25, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExclusionArea", "rp": "GlobalUsersPositionMarker_ExclusionArea.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ParcelData", "rp": "GlobalUsersPositionMarker_ParcelData.html", "cl": 5, "ucl": 3, "cal": 8, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScenesFilter", "rp": "GlobalUsersPositionMarker_ScenesFilter.html", "cl": 22, "ucl": 0, "cal": 22, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserMarkerObject", "rp": "GlobalUsersPositionMarker_UserMarkerObject.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserPositionHandler", "rp": "GlobalUsersPositionMarker_UserPositionHandler.html", "cl": 8, "ucl": 1, "cal": 9, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GlobalUsersPositionMarkerTests",
    "classes": [
      { "name": "DCL.GlobalUsersPositionMarkerTests", "rp": "GlobalUsersPositionMarkerTests_GlobalUsersPositionMarkerTests.html", "cl": 64, "ucl": 0, "cal": 64, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "GraphicCardWarningHUD",
    "classes": [
      { "name": "GraphicCardNotification", "rp": "GraphicCardWarningHUD_GraphicCardNotification.html", "cl": 1, "ucl": 9, "cal": 10, "tl": 33, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GraphicCardWarningHUDController", "rp": "GraphicCardWarningHUD_GraphicCardWarningHUDController.html", "cl": 10, "ucl": 17, "cal": 27, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HelpAndSupportHUD",
    "classes": [
      { "name": "DCL.HelpAndSupportHUD.HelpAndSupportHUDController", "rp": "HelpAndSupportHUD_HelpAndSupportHUDController.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.HelpAndSupportHUD.HelpAndSupportHUDView", "rp": "HelpAndSupportHUD_HelpAndSupportHUDView.html", "cl": 18, "ucl": 8, "cal": 26, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HelpAndSupportHUDTests",
    "classes": [
      { "name": "Tests.HelpAndSupportHUDControllerShould", "rp": "HelpAndSupportHUDTests_HelpAndSupportHUDControllerShould.html", "cl": 17, "ucl": 0, "cal": 17, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HotScenesController",
    "classes": [
      { "name": "HotScenesController", "rp": "HotScenesController_HotScenesController.html", "cl": 15, "ucl": 2, "cal": 17, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HotScenesControllerTests",
    "classes": [
      { "name": "HotScenesControllerTests", "rp": "HotScenesControllerTests_HotScenesControllerTests.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HUD",
    "classes": [
      { "name": "CallbackOnExternalClick", "rp": "HUD_CallbackOnExternalClick.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HUDBridge", "rp": "HUD_HUDBridge.html", "cl": 0, "ucl": 29, "cal": 29, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HUDController", "rp": "HUD_HUDController.html", "cl": 172, "ucl": 46, "cal": 218, "tl": 469, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HUDFactory", "rp": "HUD_HUDFactory.html", "cl": 55, "ucl": 0, "cal": 55, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIHoverObjectToggler", "rp": "HUD_UIHoverObjectToggler.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HUDCommon",
    "classes": [
      { "name": "AvatarEditorCategoryToggleAudioHandler", "rp": "HUDCommon_AvatarEditorCategoryToggleAudioHandler.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Button_OnPointerDown", "rp": "HUDCommon_Button_OnPointerDown.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ButtonAudioHandler", "rp": "HUDCommon_ButtonAudioHandler.html", "cl": 1, "ucl": 14, "cal": 15, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GeneralHUDElementAudioHandler", "rp": "HUDCommon_GeneralHUDElementAudioHandler.html", "cl": 1, "ucl": 13, "cal": 14, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "HUDAudioHandler", "rp": "HUDCommon_HUDAudioHandler.html", "cl": 1, "ucl": 21, "cal": 22, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NavMapAudioHandler", "rp": "HUDCommon_NavMapAudioHandler.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScrollbarHandleAudioHandler", "rp": "HUDCommon_ScrollbarHandleAudioHandler.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ShowHideAnimator", "rp": "HUDCommon_ShowHideAnimator.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ShowHideUIByTrigger", "rp": "HUDCommon_ShowHideUIByTrigger.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SliderAudioHandler", "rp": "HUDCommon_SliderAudioHandler.html", "cl": 6, "ucl": 8, "cal": 14, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SliderHandleAudioHandler", "rp": "HUDCommon_SliderHandleAudioHandler.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ToggleAudioHandler", "rp": "HUDCommon_ToggleAudioHandler.html", "cl": 10, "ucl": 4, "cal": 14, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ToggleHandleAudioHandler", "rp": "HUDCommon_ToggleHandleAudioHandler.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIHoverTriggerShowHideAnimator", "rp": "HUDCommon_UIHoverTriggerShowHideAnimator.html", "cl": 3, "ucl": 23, "cal": 26, "tl": 76, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HUDContextFactory",
    "classes": [
      { "name": "DCL.HUDContextFactory", "rp": "HUDContextFactory_HUDContextFactory.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "HUDTests",
    "classes": [
      { "name": "Tests.HUDControllerShould", "rp": "HUDTests_HUDControllerShould.html", "cl": 23, "ucl": 0, "cal": 23, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "IdleChecker",
    "classes": [
      { "name": "DCL.IdleChecker", "rp": "IdleChecker_IdleChecker.html", "cl": 19, "ucl": 6, "cal": 25, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "IdleCheckerTests",
    "classes": [
      { "name": "Tests.IdleCheckerShould", "rp": "IdleCheckerTests_IdleCheckerShould.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "InitialSceneReferences",
    "classes": [
      { "name": "DCL.InitialSceneReferences", "rp": "InitialSceneReferences_InitialSceneReferences.html", "cl": 1, "ucl": 8, "cal": 9, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "InputController",
    "classes": [
      { "name": "InputAction_Hold", "rp": "InputController_InputAction_Hold.html", "cl": 6, "ucl": 8, "cal": 14, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputAction_Measurable", "rp": "InputController_InputAction_Measurable.html", "cl": 4, "ucl": 7, "cal": 11, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputAction_Trigger", "rp": "InputController_InputAction_Trigger.html", "cl": 5, "ucl": 6, "cal": 11, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputController", "rp": "InputController_InputController.html", "cl": 101, "ucl": 92, "cal": 193, "tl": 651, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputProcessor", "rp": "InputController_InputProcessor.html", "cl": 36, "ucl": 20, "cal": 56, "tl": 651, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "InputControllerTests",
    "classes": [
      { "name": "InputController_Tests.InputAction_Hold_Should", "rp": "InputControllerTests_InputAction_Hold_Should.html", "cl": 22, "ucl": 0, "cal": 22, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputController_Tests.InputAction_Measurable_Should", "rp": "InputControllerTests_InputAction_Measurable_Should.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InputController_Tests.InputAction_Trigger_Should", "rp": "InputControllerTests_InputAction_Trigger_Should.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "IntegrationTests",
    "classes": [
      { "name": "IntegrationTestController", "rp": "IntegrationTests_IntegrationTestController.html", "cl": 0, "ucl": 45, "cal": 45, "tl": 163, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "IntegrationTestSuite",
    "classes": [
      { "name": "Tests.IntegrationTestSuite", "rp": "IntegrationTestSuite_IntegrationTestSuite.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "KernelConfiguration",
    "classes": [
      { "name": "KernelConfig", "rp": "KernelConfiguration_KernelConfig.html", "cl": 34, "ucl": 5, "cal": 39, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "KernelConfigModel", "rp": "KernelConfiguration_KernelConfigModel.html", "cl": 19, "ucl": 2, "cal": 21, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "KernelConfigurationTypes.Comms", "rp": "KernelConfiguration_Comms.html", "cl": 3, "ucl": 1, "cal": 4, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "KernelConfigurationTypes.Features", "rp": "KernelConfiguration_Features.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "KernelConfigurationTypes.Profiles", "rp": "KernelConfiguration_Profiles.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "KernelConfigurationTypes.WorldRange", "rp": "KernelConfiguration_WorldRange.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "KernelConfigurationBridge",
    "classes": [
      { "name": "KernelConfigurationBridge", "rp": "KernelConfigurationBridge_KernelConfigurationBridge.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 6, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "KernelConfigurationTests",
    "classes": [
      { "name": "KernelConfigurationShould", "rp": "KernelConfigurationTests_KernelConfigurationShould.html", "cl": 48, "ucl": 0, "cal": 48, "tl": 163, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "LoadableShapesTests",
    "classes": [
      { "name": "GLTFImporterTests", "rp": "LoadableShapesTests_GLTFImporterTests.html", "cl": 62, "ucl": 18, "cal": 80, "tl": 177, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GLTFImporterVisualTests", "rp": "LoadableShapesTests_GLTFImporterVisualTests.html", "cl": 0, "ucl": 24, "cal": 24, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GLTFShape_Tests", "rp": "LoadableShapesTests_GLTFShape_Tests.html", "cl": 96, "ucl": 32, "cal": 128, "tl": 303, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LoadableShapesMiscTests", "rp": "LoadableShapesTests_LoadableShapesMiscTests.html", "cl": 45, "ucl": 0, "cal": 45, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShape_Tests", "rp": "LoadableShapesTests_NFTShape_Tests.html", "cl": 21, "ucl": 26, "cal": 47, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShapeVisualTests", "rp": "LoadableShapesTests_NFTShapeVisualTests.html", "cl": 0, "ucl": 44, "cal": 44, "tl": 136, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "LoadWrapperTests",
    "classes": [
      { "name": "LoadWrapperShould", "rp": "LoadWrapperTests_LoadWrapperShould.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 49, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Logger",
    "classes": [
      { "name": "DCL.Logger", "rp": "Logger_Logger.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Main",
    "classes": [
      { "name": "DCL.Main", "rp": "Main_Main.html", "cl": 17, "ucl": 21, "cal": 38, "tl": 119, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MainAttributes",
    "classes": [
      { "name": "ExpandableAttribute", "rp": "MainAttributes_ExpandableAttribute.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 10, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MainEditor",
    "classes": [
      { "name": "BuildCommand", "rp": "MainEditor_BuildCommand.html", "cl": 0, "ucl": 59, "cal": 59, "tl": 162, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.ScriptableObjectUtility", "rp": "MainEditor_ScriptableObjectUtility.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EndNameEdit", "rp": "MainEditor_EndNameEdit.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ExpandableAttributeDrawer", "rp": "MainEditor_ExpandableAttributeDrawer.html", "cl": 0, "ucl": 80, "cal": 80, "tl": 219, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScriptableObjectFactory", "rp": "MainEditor_ScriptableObjectFactory.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ScriptableObjectWindow", "rp": "MainEditor_ScriptableObjectWindow.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MainScripts",
    "classes": [
      { "name": "CursorController", "rp": "MainScripts_CursorController.html", "cl": 7, "ucl": 1, "cal": 8, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Billboard", "rp": "MainScripts_Billboard.html", "cl": 39, "ucl": 2, "cal": 41, "tl": 99, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Bots.BotsController", "rp": "MainScripts_BotsController.html", "cl": 11, "ucl": 122, "cal": 133, "tl": 312, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.CollidersManager", "rp": "MainScripts_CollidersManager.html", "cl": 65, "ucl": 13, "cal": 78, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.AvatarOnPointerDown", "rp": "MainScripts_AvatarOnPointerDown.html", "cl": 5, "ucl": 32, "cal": 37, "tl": 98, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.BaseComponent", "rp": "MainScripts_BaseComponent.html", "cl": 22, "ucl": 7, "cal": 29, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.BaseDisposable", "rp": "MainScripts_BaseDisposable.html", "cl": 41, "ucl": 7, "cal": 48, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.BaseShape", "rp": "MainScripts_BaseShape.html", "cl": 28, "ucl": 9, "cal": 37, "tl": 100, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.BasicMaterial", "rp": "MainScripts_BasicMaterial.html", "cl": 73, "ucl": 7, "cal": 80, "tl": 173, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.BoxShape", "rp": "MainScripts_BoxShape.html", "cl": 25, "ucl": 4, "cal": 29, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.ConeShape", "rp": "MainScripts_ConeShape.html", "cl": 13, "ucl": 1, "cal": 14, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.CylinderShape", "rp": "MainScripts_CylinderShape.html", "cl": 14, "ucl": 1, "cal": 15, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLAnimator", "rp": "MainScripts_DCLAnimator.html", "cl": 63, "ucl": 7, "cal": 70, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLAudioClip", "rp": "MainScripts_DCLAudioClip.html", "cl": 32, "ucl": 19, "cal": 51, "tl": 142, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLAudioSource", "rp": "MainScripts_DCLAudioSource.html", "cl": 63, "ucl": 16, "cal": 79, "tl": 194, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLAudioStream", "rp": "MainScripts_DCLAudioStream.html", "cl": 47, "ucl": 25, "cal": 72, "tl": 160, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLFont", "rp": "MainScripts_DCLFont.html", "cl": 23, "ucl": 12, "cal": 35, "tl": 95, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLGizmos", "rp": "MainScripts_DCLGizmos.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLTransform", "rp": "MainScripts_DCLTransform.html", "cl": 24, "ucl": 7, "cal": 31, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLVideoClip", "rp": "MainScripts_DCLVideoClip.html", "cl": 10, "ucl": 4, "cal": 14, "tl": 49, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.DCLVideoTexture", "rp": "MainScripts_DCLVideoTexture.html", "cl": 151, "ucl": 62, "cal": 213, "tl": 468, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.GLTFShape", "rp": "MainScripts_GLTFShape.html", "cl": 3, "ucl": 6, "cal": 9, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadableShape", "rp": "MainScripts_LoadableShape.html", "cl": 17, "ucl": 4, "cal": 21, "tl": 303, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadableShape[LoadWrapperType,LoadWrapperModelType]", "rp": "MainScripts_LoadableShape_LoadWrapperType_LoadWrapperModelType_.html", "cl": 89, "ucl": 22, "cal": 111, "tl": 303, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadWrapper", "rp": "MainScripts_LoadWrapper.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadWrapper_GLTF", "rp": "MainScripts_LoadWrapper_GLTF.html", "cl": 29, "ucl": 5, "cal": 34, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadWrapper_NFT", "rp": "MainScripts_LoadWrapper_NFT.html", "cl": 20, "ucl": 11, "cal": 31, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.LoadWrapper_OBJ", "rp": "MainScripts_LoadWrapper_OBJ.html", "cl": 22, "ucl": 3, "cal": 25, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.NFTShape", "rp": "MainScripts_NFTShape.html", "cl": 30, "ucl": 6, "cal": 36, "tl": 85, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OBJShape", "rp": "MainScripts_OBJShape.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnClick", "rp": "MainScripts_OnClick.html", "cl": 6, "ucl": 2, "cal": 8, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnPointerDown", "rp": "MainScripts_OnPointerDown.html", "cl": 9, "ucl": 2, "cal": 11, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnPointerEvent", "rp": "MainScripts_OnPointerEvent.html", "cl": 35, "ucl": 5, "cal": 40, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnPointerEventColliders", "rp": "MainScripts_OnPointerEventColliders.html", "cl": 51, "ucl": 4, "cal": 55, "tl": 129, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnPointerEventHandler", "rp": "MainScripts_OnPointerEventHandler.html", "cl": 17, "ucl": 2, "cal": 19, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.OnPointerUp", "rp": "MainScripts_OnPointerUp.html", "cl": 10, "ucl": 2, "cal": 12, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.ParametrizedShape[T]", "rp": "MainScripts_ParametrizedShape_T_.html", "cl": 78, "ucl": 6, "cal": 84, "tl": 176, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.PBRMaterial", "rp": "MainScripts_PBRMaterial.html", "cl": 123, "ucl": 29, "cal": 152, "tl": 330, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.PlaneShape", "rp": "MainScripts_PlaneShape.html", "cl": 18, "ucl": 6, "cal": 24, "tl": 65, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.RendereableAssetLoadHelper", "rp": "MainScripts_RendereableAssetLoadHelper.html", "cl": 41, "ucl": 38, "cal": 79, "tl": 204, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.SmartItemComponent", "rp": "MainScripts_SmartItemComponent.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.SphereShape", "rp": "MainScripts_SphereShape.html", "cl": 11, "ucl": 1, "cal": 12, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.TextShape", "rp": "MainScripts_TextShape.html", "cl": 73, "ucl": 8, "cal": 81, "tl": 221, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIContainerRect", "rp": "MainScripts_UIContainerRect.html", "cl": 18, "ucl": 4, "cal": 22, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIContainerStack", "rp": "MainScripts_UIContainerStack.html", "cl": 54, "ucl": 13, "cal": 67, "tl": 153, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIImage", "rp": "MainScripts_UIImage.html", "cl": 44, "ucl": 7, "cal": 51, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIInputText", "rp": "MainScripts_UIInputText.html", "cl": 57, "ucl": 13, "cal": 70, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIInputTextRefContainer", "rp": "MainScripts_UIInputTextRefContainer.html", "cl": 12, "ucl": 5, "cal": 17, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIReferencesContainer", "rp": "MainScripts_UIReferencesContainer.html", "cl": 7, "ucl": 4, "cal": 11, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIScreenSpace", "rp": "MainScripts_UIScreenSpace.html", "cl": 67, "ucl": 12, "cal": 79, "tl": 178, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIScrollRect", "rp": "MainScripts_UIScrollRect.html", "cl": 49, "ucl": 3, "cal": 52, "tl": 122, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIShape", "rp": "MainScripts_UIShape.html", "cl": 125, "ucl": 9, "cal": 134, "tl": 441, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIShape[ReferencesContainerType,ModelType]", "rp": "MainScripts_UIShape_ReferencesContainerType_ModelType_.html", "cl": 28, "ucl": 1, "cal": 29, "tl": 441, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIShapeUpdateHandler[ReferencesContainerType,ModelType]", "rp": "MainScripts_UIShapeUpdateHandler_ReferencesContainerType_ModelType_.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIText", "rp": "MainScripts_UIText.html", "cl": 30, "ucl": 4, "cal": 34, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.UIValue", "rp": "MainScripts_UIValue.html", "cl": 4, "ucl": 10, "cal": 14, "tl": 441, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.Video.Plugin.WebVideoPlayer", "rp": "MainScripts_WebVideoPlayer.html", "cl": 24, "ucl": 68, "cal": 92, "tl": 213, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.WaitForComponentUpdate", "rp": "MainScripts_WaitForComponentUpdate.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ComponentUpdateHandler", "rp": "MainScripts_ComponentUpdateHandler.html", "cl": 37, "ucl": 2, "cal": 39, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.GlobalScene", "rp": "MainScripts_GlobalScene.html", "cl": 9, "ucl": 3, "cal": 12, "tl": 36, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.ParcelScene", "rp": "MainScripts_ParcelScene.html", "cl": 259, "ucl": 89, "cal": 348, "tl": 809, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.ParcelSceneDebug.SceneDebugPlane", "rp": "MainScripts_SceneDebugPlane.html", "cl": 21, "ucl": 8, "cal": 29, "tl": 73, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.SceneBoundsChecker", "rp": "MainScripts_SceneBoundsChecker.html", "cl": 127, "ucl": 12, "cal": 139, "tl": 309, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.SceneBoundsFeedbackStyle_RedFlicker", "rp": "MainScripts_SceneBoundsFeedbackStyle_RedFlicker.html", "cl": 63, "ucl": 16, "cal": 79, "tl": 180, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.SceneBoundsFeedbackStyle_Simple", "rp": "MainScripts_SceneBoundsFeedbackStyle_Simple.html", "cl": 21, "ucl": 1, "cal": 22, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.SceneLifecycleHandler", "rp": "MainScripts_SceneLifecycleHandler.html", "cl": 29, "ucl": 29, "cal": 58, "tl": 151, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.SceneUtils", "rp": "MainScripts_SceneUtils.html", "cl": 11, "ucl": 10, "cal": 21, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.DCLTexture", "rp": "MainScripts_DCLTexture.html", "cl": 47, "ucl": 24, "cal": 71, "tl": 184, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.DebugBridge", "rp": "MainScripts_DebugBridge.html", "cl": 1, "ucl": 42, "cal": 43, "tl": 124, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.DummyMessageHandler", "rp": "MainScripts_DummyMessageHandler.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.PrimitiveMeshBuilder", "rp": "MainScripts_PrimitiveMeshBuilder.html", "cl": 396, "ucl": 26, "cal": 422, "tl": 754, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.RaycastHandler", "rp": "MainScripts_RaycastHandler.html", "cl": 19, "ucl": 18, "cal": 37, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.InputController_Legacy", "rp": "MainScripts_InputController_Legacy.html", "cl": 43, "ucl": 8, "cal": 51, "tl": 143, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessageBenchmarkController", "rp": "MainScripts_MessageBenchmarkController.html", "cl": 0, "ucl": 169, "cal": 169, "tl": 433, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessageDecoder", "rp": "MainScripts_MessageDecoder.html", "cl": 9, "ucl": 86, "cal": 95, "tl": 196, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessagingBus", "rp": "MainScripts_MessagingBus.html", "cl": 59, "ucl": 61, "cal": 120, "tl": 293, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessagingController", "rp": "MainScripts_MessagingController.html", "cl": 30, "ucl": 32, "cal": 62, "tl": 155, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MessagingControllersManager", "rp": "MainScripts_MessagingControllersManager.html", "cl": 122, "ucl": 12, "cal": 134, "tl": 304, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MiscBenchmarkController", "rp": "MainScripts_MiscBenchmarkController.html", "cl": 0, "ucl": 89, "cal": 89, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Models.DecentralandEntity", "rp": "MainScripts_DecentralandEntity.html", "cl": 98, "ucl": 5, "cal": 103, "tl": 234, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.ParcelScenesCleaner", "rp": "MainScripts_ParcelScenesCleaner.html", "cl": 61, "ucl": 15, "cal": 76, "tl": 185, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PhysicsCast", "rp": "MainScripts_PhysicsCast.html", "cl": 0, "ucl": 57, "cal": 57, "tl": 143, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PointerEventsController", "rp": "MainScripts_PointerEventsController.html", "cl": 160, "ucl": 44, "cal": 204, "tl": 487, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.RuntimeComponentFactory", "rp": "MainScripts_RuntimeComponentFactory.html", "cl": 56, "ucl": 3, "cal": 59, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SceneController", "rp": "MainScripts_SceneController.html", "cl": 217, "ucl": 157, "cal": 374, "tl": 893, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SceneMetricsController", "rp": "MainScripts_SceneMetricsController.html", "cl": 146, "ucl": 19, "cal": 165, "tl": 374, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.StatsPanelToggler", "rp": "MainScripts_StatsPanelToggler.html", "cl": 0, "ucl": 38, "cal": 38, "tl": 104, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.UserBenchmarkController", "rp": "MainScripts_UserBenchmarkController.html", "cl": 0, "ucl": 67, "cal": 67, "tl": 172, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.UserBenchmarkToggler", "rp": "MainScripts_UserBenchmarkToggler.html", "cl": 0, "ucl": 9, "cal": 9, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.UUIDComponent", "rp": "MainScripts_UUIDComponent.html", "cl": 4, "ucl": 5, "cal": 9, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WorldState", "rp": "MainScripts_WorldState.html", "cl": 26, "ucl": 9, "cal": 35, "tl": 86, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WorldStateUtils", "rp": "MainScripts_WorldStateUtils.html", "cl": 26, "ucl": 22, "cal": 48, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLCharacterController", "rp": "MainScripts_DCLCharacterController.html", "cl": 181, "ucl": 48, "cal": 229, "tl": 526, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLCharacterPosition", "rp": "MainScripts_DCLCharacterPosition.html", "cl": 28, "ucl": 7, "cal": 35, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLLockedOnEdit", "rp": "MainScripts_DCLLockedOnEdit.html", "cl": 2, "ucl": 6, "cal": 8, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLName", "rp": "MainScripts_DCLName.html", "cl": 15, "ucl": 2, "cal": 17, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLVisibleOnEdit", "rp": "MainScripts_DCLVisibleOnEdit.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 33, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DynamicOBJLoaderController", "rp": "MainScripts_DynamicOBJLoaderController.html", "cl": 28, "ucl": 7, "cal": 35, "tl": 87, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EditableEntity", "rp": "MainScripts_EditableEntity.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FirstPersonCameraEntityReference", "rp": "MainScripts_FirstPersonCameraEntityReference.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 47, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FreeMovementController", "rp": "MainScripts_FreeMovementController.html", "cl": 6, "ucl": 32, "cal": 38, "tl": 86, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InteractionHoverCanvasController", "rp": "MainScripts_InteractionHoverCanvasController.html", "cl": 19, "ucl": 26, "cal": 45, "tl": 117, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LoadingFeedbackController", "rp": "MainScripts_LoadingFeedbackController.html", "cl": 27, "ucl": 45, "cal": 72, "tl": 170, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShape_Internal.NFTAssetFactory", "rp": "MainScripts_NFTAssetFactory.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShape_Internal.NFTGifAsset", "rp": "MainScripts_NFTGifAsset.html", "cl": 0, "ucl": 29, "cal": 29, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShape_Internal.NFTImageAsset", "rp": "MainScripts_NFTImageAsset.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShape_Internal.NFTShapeHQImageHandler", "rp": "MainScripts_NFTShapeHQImageHandler.html", "cl": 47, "ucl": 14, "cal": 61, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShapeConfig", "rp": "MainScripts_NFTShapeConfig.html", "cl": 9, "ucl": 4, "cal": 13, "tl": 27, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShapeFactory", "rp": "MainScripts_NFTShapeFactory.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTShapeLoaderController", "rp": "MainScripts_NFTShapeLoaderController.html", "cl": 58, "ucl": 93, "cal": 151, "tl": 341, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuestTrackingInfo", "rp": "MainScripts_QuestTrackingInfo.html", "cl": 17, "ucl": 4, "cal": 21, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneBoundsFeedbackStyle_BIW", "rp": "MainScripts_SceneBoundsFeedbackStyle_BIW.html", "cl": 4, "ucl": 57, "cal": 61, "tl": 138, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneMessageUtilities", "rp": "MainScripts_SceneMessageUtilities.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SimpleHTTPServer", "rp": "MainScripts_SimpleHTTPServer.html", "cl": 0, "ucl": 57, "cal": 57, "tl": 238, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "StatsPanel", "rp": "MainScripts_StatsPanel.html", "cl": 3, "ucl": 48, "cal": 51, "tl": 146, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "StickerAnimationListener", "rp": "MainScripts_StickerAnimationListener.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "StickersController", "rp": "MainScripts_StickersController.html", "cl": 1, "ucl": 8, "cal": 9, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "StickersFactory", "rp": "MainScripts_StickersFactory.html", "cl": 1, "ucl": 8, "cal": 9, "tl": 36, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UISizeFitter", "rp": "MainScripts_UISizeFitter.html", "cl": 58, "ucl": 7, "cal": 65, "tl": 166, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WebServerComponent", "rp": "MainScripts_WebServerComponent.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MapRenderer",
    "classes": [
      { "name": "DCL.Helpers.MapUtils", "rp": "MapRenderer_MapUtils.html", "cl": 29, "ucl": 1, "cal": 30, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MapAtlas", "rp": "MapRenderer_MapAtlas.html", "cl": 44, "ucl": 4, "cal": 48, "tl": 112, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MapChunk", "rp": "MapRenderer_MapChunk.html", "cl": 27, "ucl": 13, "cal": 40, "tl": 100, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.MapRenderer", "rp": "MapRenderer_MapRenderer.html", "cl": 110, "ucl": 62, "cal": 172, "tl": 396, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MapRendererAudioHandler", "rp": "MapRenderer_MapRendererAudioHandler.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MinimapMetadata", "rp": "MapRenderer_MinimapMetadata.html", "cl": 29, "ucl": 2, "cal": 31, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MinimapMetadataController", "rp": "MapRenderer_MinimapMetadataController.html", "cl": 6, "ucl": 9, "cal": 15, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MapRendererTests",
    "classes": [
      { "name": "DCL.MapChunk_Mock", "rp": "MapRendererTests_MapChunk_Mock.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.MapRendererShould", "rp": "MapRendererTests_MapRendererShould.html", "cl": 51, "ucl": 30, "cal": 81, "tl": 173, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MaterialCachingHelper",
    "classes": [
      { "name": "DCL.Helpers.MaterialCachingHelper", "rp": "MaterialCachingHelper_MaterialCachingHelper.html", "cl": 46, "ucl": 10, "cal": 56, "tl": 138, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MaterialsTests",
    "classes": [
      { "name": "BasicMaterialShould", "rp": "MaterialsTests_BasicMaterialShould.html", "cl": 100, "ucl": 0, "cal": 100, "tl": 291, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BasicMaterialVisualTests", "rp": "MaterialsTests_BasicMaterialVisualTests.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PBRMaterialShould", "rp": "MaterialsTests_PBRMaterialShould.html", "cl": 136, "ucl": 0, "cal": 136, "tl": 394, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PBRMaterialVisualTests", "rp": "MaterialsTests_PBRMaterialVisualTests.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MaterialTransitionController",
    "classes": [
      { "name": "MaterialTransitionController", "rp": "MaterialTransitionController_MaterialTransitionController.html", "cl": 98, "ucl": 27, "cal": 125, "tl": 291, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MaterialTransitionControllerTests",
    "classes": [
      { "name": "Tests.MaterialTransitionControllerTests", "rp": "MaterialTransitionControllerTests_MaterialTransitionControllerTests.html", "cl": 23, "ucl": 35, "cal": 58, "tl": 141, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MemoryManager",
    "classes": [
      { "name": "DCL.MemoryManager", "rp": "MemoryManager_MemoryManager.html", "cl": 36, "ucl": 4, "cal": 40, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MeshesInfo",
    "classes": [
      { "name": "DCL.Models.MeshesInfo", "rp": "MeshesInfo_MeshesInfo.html", "cl": 33, "ucl": 9, "cal": 42, "tl": 114, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Models.MeshesInfoUtils", "rp": "MeshesInfo_MeshesInfoUtils.html", "cl": 9, "ucl": 1, "cal": 10, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MessagingContextFactory",
    "classes": [
      { "name": "DCL.MessagingContextFactory", "rp": "MessagingContextFactory_MessagingContextFactory.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MinimapHUD",
    "classes": [
      { "name": "MinimapHUDController", "rp": "MinimapHUD_MinimapHUDController.html", "cl": 37, "ucl": 17, "cal": 54, "tl": 121, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MinimapHUDModel", "rp": "MinimapHUD_MinimapHUDModel.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 5, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MinimapHUDView", "rp": "MinimapHUD_MinimapHUDView.html", "cl": 22, "ucl": 3, "cal": 25, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MinimapZoom", "rp": "MinimapHUD_MinimapZoom.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MinimapHUDTests",
    "classes": [
      { "name": "Tests.MinimapHUDTests", "rp": "MinimapHUDTests_MinimapHUDTests.html", "cl": 32, "ucl": 0, "cal": 32, "tl": 83, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MordiAudio",
    "classes": [
      { "name": "AnimationEventAudioPlayer", "rp": "MordiAudio_AnimationEventAudioPlayer.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AudioContainer", "rp": "MordiAudio_AudioContainer.html", "cl": 20, "ucl": 2, "cal": 22, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AudioEvent", "rp": "MordiAudio_AudioEvent.html", "cl": 54, "ucl": 34, "cal": 88, "tl": 203, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AudioEvent_WithBlockingEvent", "rp": "MordiAudio_AudioEvent_WithBlockingEvent.html", "cl": 3, "ucl": 4, "cal": 7, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AudioEvent_WithPitchIncrement", "rp": "MordiAudio_AudioEvent_WithPitchIncrement.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MouseCatcher",
    "classes": [
      { "name": "DCL.MouseCatcher", "rp": "MouseCatcher_MouseCatcher.html", "cl": 3, "ucl": 21, "cal": 24, "tl": 92, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MouseCatcherBridge",
    "classes": [
      { "name": "DCL.MouseCatcherBridge", "rp": "MouseCatcherBridge_MouseCatcherBridge.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "MouseCatcherTests",
    "classes": [
      { "name": "MouseCatcher_Mock", "rp": "MouseCatcherTests_MouseCatcher_Mock.html", "cl": 1, "ucl": 2, "cal": 3, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Navmap",
    "classes": [
      { "name": "DCL.NavmapToastView", "rp": "Navmap_NavmapToastView.html", "cl": 51, "ucl": 23, "cal": 74, "tl": 177, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.NavmapView", "rp": "Navmap_NavmapView.html", "cl": 45, "ucl": 33, "cal": 78, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NavMapScrollRect", "rp": "Navmap_NavMapScrollRect.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NavmapTests",
    "classes": [
      { "name": "Tests.NavmapTests", "rp": "NavmapTests_NavmapTests.html", "cl": 13, "ucl": 14, "cal": 27, "tl": 81, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.NavmapToastViewShould", "rp": "NavmapTests_NavmapToastViewShould.html", "cl": 30, "ucl": 11, "cal": 41, "tl": 110, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NFTHelper",
    "classes": [
      { "name": "DCL.Helpers.NFT.Markets.OpenSea", "rp": "NFTHelper_OpenSea.html", "cl": 4, "ucl": 105, "cal": 109, "tl": 255, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.NFTHelper", "rp": "NFTHelper_NFTHelper.html", "cl": 9, "ucl": 17, "cal": 26, "tl": 95, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.NFTInfo", "rp": "NFTHelper_NFTInfo.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 118, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.NFTInfoSingleAsset", "rp": "NFTHelper_NFTInfoSingleAsset.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 118, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.NFTOwner", "rp": "NFTHelper_NFTOwner.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 118, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NFTPromptHUD",
    "classes": [
      { "name": "NFTPromptHUDController", "rp": "NFTPromptHUD_NFTPromptHUDController.html", "cl": 39, "ucl": 52, "cal": 91, "tl": 193, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NFTPromptHUDView", "rp": "NFTPromptHUD_NFTPromptHUDView.html", "cl": 61, "ucl": 119, "cal": 180, "tl": 425, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OwnerInfoElement", "rp": "NFTPromptHUD_OwnerInfoElement.html", "cl": 1, "ucl": 21, "cal": 22, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OwnersInfoController", "rp": "NFTPromptHUD_OwnersInfoController.html", "cl": 3, "ucl": 27, "cal": 30, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OwnersPopupView", "rp": "NFTPromptHUD_OwnersPopupView.html", "cl": 12, "ucl": 7, "cal": 19, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OwnersTooltipView", "rp": "NFTPromptHUD_OwnersTooltipView.html", "cl": 24, "ucl": 14, "cal": 38, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NFTPromptHUDTests",
    "classes": [
      { "name": "Tests.NFTPromptHUDTests", "rp": "NFTPromptHUDTests_NFTPromptHUDTests.html", "cl": 39, "ucl": 0, "cal": 39, "tl": 93, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NFTPromptModel",
    "classes": [
      { "name": "NFTPromptModel", "rp": "NFTPromptModel_NFTPromptModel.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NFTShapeTests",
    "classes": [
      { "name": "NFTShapeHQImageHandlerShould", "rp": "NFTShapeTests_NFTShapeHQImageHandlerShould.html", "cl": 49, "ucl": 0, "cal": 49, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NotificationBadge",
    "classes": [
      { "name": "NotificationBadge", "rp": "NotificationBadge_NotificationBadge.html", "cl": 22, "ucl": 5, "cal": 27, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnreadNotificationBadge", "rp": "NotificationBadge_UnreadNotificationBadge.html", "cl": 36, "ucl": 2, "cal": 38, "tl": 104, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnreadWorldNotificationBadge", "rp": "NotificationBadge_UnreadWorldNotificationBadge.html", "cl": 35, "ucl": 2, "cal": 37, "tl": 98, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NotificationBadgeTests",
    "classes": [
      { "name": "UnreadNotificationBadgeShould", "rp": "NotificationBadgeTests_UnreadNotificationBadgeShould.html", "cl": 45, "ucl": 0, "cal": 45, "tl": 135, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnreadWorldNotificationBadgeShould", "rp": "NotificationBadgeTests_UnreadWorldNotificationBadgeShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 118, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NotificationHUD",
    "classes": [
      { "name": "Notification", "rp": "NotificationHUD_Notification.html", "cl": 55, "ucl": 13, "cal": 68, "tl": 176, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NotificationFactory", "rp": "NotificationHUD_NotificationFactory.html", "cl": 11, "ucl": 4, "cal": 15, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NotificationHUDController", "rp": "NotificationHUD_NotificationHUDController.html", "cl": 21, "ucl": 10, "cal": 31, "tl": 75, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NotificationHUDView", "rp": "NotificationHUD_NotificationHUDView.html", "cl": 16, "ucl": 2, "cal": 18, "tl": 49, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NotificationHudTests",
    "classes": [
      { "name": "Tests.NotificationHudTests", "rp": "NotificationHudTests_NotificationHudTests.html", "cl": 47, "ucl": 0, "cal": 47, "tl": 124, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "NotificationsController",
    "classes": [
      { "name": "NotificationsController", "rp": "NotificationsController_NotificationsController.html", "cl": 8, "ucl": 23, "cal": 31, "tl": 76, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Onboarding",
    "classes": [
      { "name": "DCL.Tutorial.TutorialController", "rp": "Onboarding_TutorialController.html", "cl": 107, "ucl": 127, "cal": 234, "tl": 665, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep", "rp": "Onboarding_TutorialStep.html", "cl": 2, "ucl": 52, "cal": 54, "tl": 157, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_AvatarJumping", "rp": "Onboarding_TutorialStep_AvatarJumping.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_AvatarMovement", "rp": "Onboarding_TutorialStep_AvatarMovement.html", "cl": 1, "ucl": 6, "cal": 7, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_AvatarWalk", "rp": "Onboarding_TutorialStep_AvatarWalk.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 33, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_BasicControls", "rp": "Onboarding_TutorialStep_BasicControls.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 52, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Camera", "rp": "Onboarding_TutorialStep_Camera.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_GenesisGreetings", "rp": "Onboarding_TutorialStep_GenesisGreetings.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_GenesisGreetingsAfterDeepLink", "rp": "Onboarding_TutorialStep_GenesisGreetingsAfterDeepLink.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_LockTheCursor", "rp": "Onboarding_TutorialStep_LockTheCursor.html", "cl": 0, "ucl": 6, "cal": 6, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_MinimapTooltip", "rp": "Onboarding_TutorialStep_MinimapTooltip.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_OpenControlsPanel", "rp": "Onboarding_TutorialStep_OpenControlsPanel.html", "cl": 0, "ucl": 27, "cal": 27, "tl": 69, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip", "rp": "Onboarding_TutorialStep_Tooltip.html", "cl": 1, "ucl": 19, "cal": 20, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_BackpackButton", "rp": "Onboarding_TutorialStep_Tooltip_BackpackButton.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_ExploreButton", "rp": "Onboarding_TutorialStep_Tooltip_ExploreButton.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_RestartTutorialButton", "rp": "Onboarding_TutorialStep_Tooltip_RestartTutorialButton.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_SocialFeatures", "rp": "Onboarding_TutorialStep_Tooltip_SocialFeatures.html", "cl": 0, "ucl": 43, "cal": 43, "tl": 113, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_TaskbarMoreButton", "rp": "Onboarding_TutorialStep_Tooltip_TaskbarMoreButton.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Tooltip_UsersAround", "rp": "Onboarding_TutorialStep_Tooltip_UsersAround.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_TutorialCompleted", "rp": "Onboarding_TutorialStep_TutorialCompleted.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStep_Welcome", "rp": "Onboarding_TutorialStep_Welcome.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialStepAction", "rp": "Onboarding_TutorialStepAction.html", "cl": 1, "ucl": 17, "cal": 18, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial.TutorialTeacher", "rp": "Onboarding_TutorialTeacher.html", "cl": 8, "ucl": 5, "cal": 13, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TutorialMusicHandler", "rp": "Onboarding_TutorialMusicHandler.html", "cl": 21, "ucl": 13, "cal": 34, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TutorialStepAnimatorHideAudioHandler", "rp": "Onboarding_TutorialStepAnimatorHideAudioHandler.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TutorialStepAnimatorShowAudioHandler", "rp": "Onboarding_TutorialStepAnimatorShowAudioHandler.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "OpenSea_Internal",
    "classes": [
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.BatchAssetsRequestHandler", "rp": "OpenSea_Internal_BatchAssetsRequestHandler.html", "cl": 15, "ucl": 61, "cal": 76, "tl": 192, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.OwnedNFTRequestHandler", "rp": "OpenSea_Internal_OwnedNFTRequestHandler.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestAssetInBatch", "rp": "OpenSea_Internal_RequestAssetInBatch.html", "cl": 6, "ucl": 2, "cal": 8, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestAssetSingle", "rp": "OpenSea_Internal_RequestAssetSingle.html", "cl": 0, "ucl": 8, "cal": 8, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestBase[T]", "rp": "OpenSea_Internal_RequestBase_T_.html", "cl": 1, "ucl": 12, "cal": 13, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestController", "rp": "OpenSea_Internal_RequestController.html", "cl": 17, "ucl": 59, "cal": 76, "tl": 191, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestOwnedNFTs", "rp": "OpenSea_Internal_RequestOwnedNFTs.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.RequestScheduler", "rp": "OpenSea_Internal_RequestScheduler.html", "cl": 5, "ucl": 19, "cal": 24, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.SchedulableRequestHandler", "rp": "OpenSea_Internal_SchedulableRequestHandler.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.NFT.Markets.OpenSea_Internal.SingleAssetRequestHandler", "rp": "OpenSea_Internal_SingleAssetRequestHandler.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ParametrizedShapesTests",
    "classes": [
      { "name": "BoxShapeShould", "rp": "ParametrizedShapesTests_BoxShapeShould.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ParametrizedShapesTests", "rp": "ParametrizedShapesTests_ParametrizedShapesTests.html", "cl": 172, "ucl": 0, "cal": 172, "tl": 373, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlaneShapeShould", "rp": "ParametrizedShapesTests_PlaneShapeShould.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlaneShapeShould_VisualTests", "rp": "ParametrizedShapesTests_PlaneShapeShould_VisualTests.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PerformanceController",
    "classes": [
      { "name": "DCL.FPSDisplay.LinealBufferFPSCounter", "rp": "PerformanceController_LinealBufferFPSCounter.html", "cl": 14, "ucl": 7, "cal": 21, "tl": 36, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.FPSDisplay.LinealBufferHiccupCounter", "rp": "PerformanceController_LinealBufferHiccupCounter.html", "cl": 11, "ucl": 7, "cal": 18, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PerformanceMetricsController", "rp": "PerformanceController_PerformanceMetricsController.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 44, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PerformanceMetricsDataVariable", "rp": "PerformanceController_PerformanceMetricsDataVariable.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PerformanceMeterController",
    "classes": [
      { "name": "DCL.PerformanceMeterController", "rp": "PerformanceMeterController_PerformanceMeterController.html", "cl": 2, "ucl": 83, "cal": 85, "tl": 295, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PerformanceTests",
    "classes": [
      { "name": "MemberAccessTest.MainMemberAccessTest", "rp": "PerformanceTests_MainMemberAccessTest.html", "cl": 0, "ucl": 13, "cal": 13, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MessagingBusTest.MainMessagingBusTest", "rp": "PerformanceTests_MainMessagingBusTest.html", "cl": 0, "ucl": 73, "cal": 73, "tl": 210, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "MessaginPerformanceTests.MessageDecodingTests", "rp": "PerformanceTests_MessageDecodingTests.html", "cl": 0, "ucl": 30, "cal": 30, "tl": 90, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PhysicsCastTest",
    "classes": [
      { "name": "PhysicsCast_Tests", "rp": "PhysicsCastTest_PhysicsCast_Tests.html", "cl": 1, "ucl": 126, "cal": 127, "tl": 275, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PhysicsSyncController",
    "classes": [
      { "name": "DCL.PhysicsSyncController", "rp": "PhysicsSyncController_PhysicsSyncController.html", "cl": 10, "ucl": 1, "cal": 11, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PlatformContextFactory",
    "classes": [
      { "name": "DCL.PlatformContextFactory", "rp": "PlatformContextFactory_PlatformContextFactory.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PlayerAvatarController",
    "classes": [
      { "name": "ExpressionsHotKeyController", "rp": "PlayerAvatarController_ExpressionsHotKeyController.html", "cl": 15, "ucl": 2, "cal": 17, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlayerAvatarController", "rp": "PlayerAvatarController_PlayerAvatarController.html", "cl": 27, "ucl": 26, "cal": 53, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PlayerInfoCardHUD",
    "classes": [
      { "name": "PlayerInfoCardHUDController", "rp": "PlayerInfoCardHUD_PlayerInfoCardHUDController.html", "cl": 39, "ucl": 31, "cal": 70, "tl": 178, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlayerInfoCardHUDView", "rp": "PlayerInfoCardHUD_PlayerInfoCardHUDView.html", "cl": 75, "ucl": 49, "cal": 124, "tl": 297, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlayerInfoCollectibleItem", "rp": "PlayerInfoCardHUD_PlayerInfoCollectibleItem.html", "cl": 0, "ucl": 24, "cal": 24, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PlayerInfoCardHUDTests",
    "classes": [
      { "name": "PlayerInfoCardHUDControllerShould", "rp": "PlayerInfoCardHUDTests_PlayerInfoCardHUDControllerShould.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 57, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PlayerInfoCardHUDViewShould", "rp": "PlayerInfoCardHUDTests_PlayerInfoCardHUDViewShould.html", "cl": 66, "ucl": 2, "cal": 68, "tl": 152, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PluginScripts",
    "classes": [
      { "name": "Kongregate.WebGLMemoryStats", "rp": "PluginScripts_WebGLMemoryStats.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "OBJLoader", "rp": "PluginScripts_OBJLoader.html", "cl": 133, "ucl": 122, "cal": 255, "tl": 495, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TextureLoader", "rp": "PluginScripts_TextureLoader.html", "cl": 0, "ucl": 85, "cal": 85, "tl": 181, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PoolableComponentFactory",
    "classes": [
      { "name": "DCL.PoolableComponentFactory", "rp": "PoolableComponentFactory_PoolableComponentFactory.html", "cl": 42, "ucl": 4, "cal": 46, "tl": 150, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PoolInstantiator_GLTF",
    "classes": [
      { "name": "DCL.PoolInstantiator_GLTF", "rp": "PoolInstantiator_GLTF_PoolInstantiator_GLTF.html", "cl": 5, "ucl": 8, "cal": 13, "tl": 39, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PoolManager",
    "classes": [
      { "name": "DCL.Pool", "rp": "PoolManager_Pool.html", "cl": 93, "ucl": 42, "cal": 135, "tl": 335, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PoolableObject", "rp": "PoolManager_PoolableObject.html", "cl": 28, "ucl": 5, "cal": 33, "tl": 89, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PoolManager", "rp": "PoolManager_PoolManager.html", "cl": 80, "ucl": 23, "cal": 103, "tl": 252, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PoolManagerTests",
    "classes": [
      { "name": "Tests.PoolManagerTests", "rp": "PoolManagerTests_PoolManagerTests.html", "cl": 51, "ucl": 1, "cal": 52, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PositionUtils",
    "classes": [
      { "name": "DCL.Helpers.PositionUtils", "rp": "PositionUtils_PositionUtils.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PrivateChatWindowHUD",
    "classes": [
      { "name": "PrivateChatEntryBackgroundFitter", "rp": "PrivateChatWindowHUD_PrivateChatEntryBackgroundFitter.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PrivateChatHUDView", "rp": "PrivateChatWindowHUD_PrivateChatHUDView.html", "cl": 25, "ucl": 4, "cal": 29, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PrivateChatWindowHUDController", "rp": "PrivateChatWindowHUD_PrivateChatWindowHUDController.html", "cl": 87, "ucl": 6, "cal": 93, "tl": 196, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PrivateChatWindowHUDView", "rp": "PrivateChatWindowHUD_PrivateChatWindowHUDView.html", "cl": 17, "ucl": 11, "cal": 28, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "PrivateChatWindowHUDTests",
    "classes": [
      { "name": "PrivateChatWindowHUDShould", "rp": "PrivateChatWindowHUDTests_PrivateChatWindowHUDShould.html", "cl": 107, "ucl": 0, "cal": 107, "tl": 205, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ProfileHUD",
    "classes": [
      { "name": "ManaCounterView", "rp": "ProfileHUD_ManaCounterView.html", "cl": 14, "ucl": 6, "cal": 20, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ProfileHUDController", "rp": "ProfileHUD_ProfileHUDController.html", "cl": 69, "ucl": 33, "cal": 102, "tl": 232, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ProfileHUDView", "rp": "ProfileHUD_ProfileHUDView.html", "cl": 80, "ucl": 27, "cal": 107, "tl": 333, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ProfileHUDTests",
    "classes": [
      { "name": "ProfileHUDTests", "rp": "ProfileHUDTests_ProfileHUDTests.html", "cl": 83, "ucl": 0, "cal": 83, "tl": 175, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Promise",
    "classes": [
      { "name": "DCL.Helpers.Promise[T]", "rp": "Promise_Promise_T_.html", "cl": 28, "ucl": 2, "cal": 30, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsBridge",
    "classes": [
      { "name": "QuestsBridge", "rp": "QuestsBridge_QuestsBridge.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 27, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsController",
    "classes": [
      { "name": "DCL.QuestsController.QuestsController", "rp": "QuestsController_QuestsController.html", "cl": 78, "ucl": 14, "cal": 92, "tl": 225, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsControllerAnalytics",
    "classes": [
      { "name": "QuestsControllerAnalytics", "rp": "QuestsControllerAnalytics_QuestsControllerAnalytics.html", "cl": 47, "ucl": 4, "cal": 51, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsControllerTests",
    "classes": [
      { "name": "Tests.QuestsTrackerHUD.QuestsControllerShould", "rp": "QuestsControllerTests_QuestsControllerShould.html", "cl": 99, "ucl": 2, "cal": 101, "tl": 240, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsModels",
    "classes": [
      { "name": "QuestModel", "rp": "QuestsModels_QuestModel.html", "cl": 12, "ucl": 0, "cal": 12, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuestSection", "rp": "QuestsModels_QuestSection.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "QuestTask", "rp": "QuestsModels_QuestTask.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 37, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsPanelHUD",
    "classes": [
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelEntry", "rp": "QuestsPanelHUD_QuestsPanelEntry.html", "cl": 46, "ucl": 47, "cal": 93, "tl": 202, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelHUDController", "rp": "QuestsPanelHUD_QuestsPanelHUDController.html", "cl": 49, "ucl": 1, "cal": 50, "tl": 104, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelHUDView", "rp": "QuestsPanelHUD_QuestsPanelHUDView.html", "cl": 89, "ucl": 14, "cal": 103, "tl": 221, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelPopup", "rp": "QuestsPanelHUD_QuestsPanelPopup.html", "cl": 49, "ucl": 43, "cal": 92, "tl": 203, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelSection", "rp": "QuestsPanelHUD_QuestsPanelSection.html", "cl": 15, "ucl": 4, "cal": 19, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelTask_Numeric", "rp": "QuestsPanelHUD_QuestsPanelTask_Numeric.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 47, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelTask_Single", "rp": "QuestsPanelHUD_QuestsPanelTask_Single.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 44, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsPanel.QuestsPanelTaskFactory", "rp": "QuestsPanelHUD_QuestsPanelTaskFactory.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsPanelHUDTests",
    "classes": [
      { "name": "Tests.QuestsPanelHUD.QuestsPanelHUDControllerShould", "rp": "QuestsPanelHUDTests_QuestsPanelHUDControllerShould.html", "cl": 61, "ucl": 0, "cal": 61, "tl": 179, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsPanelHUD.QuestsPanelHUDViewShould", "rp": "QuestsPanelHUDTests_QuestsPanelHUDViewShould.html", "cl": 95, "ucl": 0, "cal": 95, "tl": 199, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsPanelHUD.QuestsPanelPopupHUDViewShould", "rp": "QuestsPanelHUDTests_QuestsPanelPopupHUDViewShould.html", "cl": 48, "ucl": 0, "cal": 48, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsTrackerHUD",
    "classes": [
      { "name": "DCL.Huds.QuestsTracker.QuestNotification_QuestCompleted", "rp": "QuestsTrackerHUD_QuestNotification_QuestCompleted.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestNotification_RewardObtained", "rp": "QuestsTrackerHUD_QuestNotification_RewardObtained.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 57, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsNotificationsController", "rp": "QuestsTrackerHUD_QuestsNotificationsController.html", "cl": 18, "ucl": 12, "cal": 30, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsTrackerEntry", "rp": "QuestsTrackerHUD_QuestsTrackerEntry.html", "cl": 78, "ucl": 79, "cal": 157, "tl": 335, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsTrackerHUDController", "rp": "QuestsTrackerHUD_QuestsTrackerHUDController.html", "cl": 43, "ucl": 10, "cal": 53, "tl": 105, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsTrackerHUDView", "rp": "QuestsTrackerHUD_QuestsTrackerHUDView.html", "cl": 48, "ucl": 16, "cal": 64, "tl": 160, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsTrackerSection", "rp": "QuestsTrackerHUD_QuestsTrackerSection.html", "cl": 32, "ucl": 45, "cal": 77, "tl": 181, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Huds.QuestsTracker.QuestsTrackerTask", "rp": "QuestsTrackerHUD_QuestsTrackerTask.html", "cl": 23, "ucl": 21, "cal": 44, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsTrackerHUDTests",
    "classes": [
      { "name": "Tests.QuestsNotificationsHUD.QuestsNotificationsHUDViewShould", "rp": "QuestsTrackerHUDTests_QuestsNotificationsHUDViewShould.html", "cl": 21, "ucl": 0, "cal": 21, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsTrackerHUD.QuestsTrackerEntryShould", "rp": "QuestsTrackerHUDTests_QuestsTrackerEntryShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 311, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsTrackerHUD.QuestsTrackerHUDControllerShould", "rp": "QuestsTrackerHUDTests_QuestsTrackerHUDControllerShould.html", "cl": 48, "ucl": 0, "cal": 48, "tl": 138, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsTrackerHUD.QuestsTrackerHUDViewShould", "rp": "QuestsTrackerHUDTests_QuestsTrackerHUDViewShould.html", "cl": 101, "ucl": 0, "cal": 101, "tl": 267, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.QuestsTrackerHUD.QuestsTrackerSectionShould", "rp": "QuestsTrackerHUDTests_QuestsTrackerSectionShould.html", "cl": 35, "ucl": 0, "cal": 35, "tl": 311, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestsUIAnalytics",
    "classes": [
      { "name": "QuestsUIAnalytics", "rp": "QuestsUIAnalytics_QuestsUIAnalytics.html", "cl": 10, "ucl": 13, "cal": 23, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "QuestTrackingInfoTests",
    "classes": [
      { "name": "QuestTrackingInfoShould", "rp": "QuestTrackingInfoTests_QuestTrackingInfoShould.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 98, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "RealmsInfoBridge",
    "classes": [
      { "name": "DCL.RealmsInfoBridge", "rp": "RealmsInfoBridge_RealmsInfoBridge.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.RealmsInfoHandler", "rp": "RealmsInfoBridge_RealmsInfoHandler.html", "cl": 7, "ucl": 3, "cal": 10, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "RealmsInfoTests",
    "classes": [
      { "name": "RealmsInfoTests", "rp": "RealmsInfoTests_RealmsInfoTests.html", "cl": 47, "ucl": 0, "cal": 47, "tl": 107, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Rendering",
    "classes": [
      { "name": "RenderingController", "rp": "Rendering_RenderingController.html", "cl": 38, "ucl": 10, "cal": 48, "tl": 103, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "RenderProfileBridge",
    "classes": [
      { "name": "RenderProfileBridge", "rp": "RenderProfileBridge_RenderProfileBridge.html", "cl": 1, "ucl": 10, "cal": 11, "tl": 62, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "RenderProfiles",
    "classes": [
      { "name": "DCL.RenderProfileAvatar", "rp": "RenderProfiles_RenderProfileAvatar.html", "cl": 6, "ucl": 5, "cal": 11, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.RenderProfileManifest", "rp": "RenderProfiles_RenderProfileManifest.html", "cl": 14, "ucl": 3, "cal": 17, "tl": 66, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "RenderProfileWorld", "rp": "RenderProfiles_RenderProfileWorld.html", "cl": 19, "ucl": 14, "cal": 33, "tl": 105, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "RenderUtils",
    "classes": [
      { "name": "DCL.Helpers.ShaderUtils", "rp": "RenderUtils_ShaderUtils.html", "cl": 30, "ucl": 0, "cal": 30, "tl": 48, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ReorderableEditor",
    "classes": [
      { "name": "ReorderableList.Editor.ReorderableDrawer", "rp": "ReorderableEditor_ReorderableDrawer.html", "cl": 0, "ucl": 45, "cal": 45, "tl": 142, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ReorderableList.Editor.ReorderableList", "rp": "ReorderableEditor_ReorderableList.html", "cl": 0, "ucl": 970, "cal": 970, "tl": 2913, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SceneAssets",
    "classes": [
      { "name": "AssetCatalogBridge", "rp": "SceneAssets_AssetCatalogBridge.html", "cl": 41, "ucl": 8, "cal": 49, "tl": 131, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneAssetPack", "rp": "SceneAssets_SceneAssetPack.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 21, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SceneBoundariesCheckerTests",
    "classes": [
      { "name": "SceneBoundarieCheckerFeedbackStyleShould", "rp": "SceneBoundariesCheckerTests_SceneBoundarieCheckerFeedbackStyleShould.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneBoundariesCheckerTests.SBC_Asserts", "rp": "SceneBoundariesCheckerTests_SBC_Asserts.html", "cl": 132, "ucl": 40, "cal": 172, "tl": 366, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneBoundariesCheckerTests.SceneBoundariesCheckerTests", "rp": "SceneBoundariesCheckerTests_SceneBoundariesCheckerTests.html", "cl": 65, "ucl": 4, "cal": 69, "tl": 160, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SceneBoundariesCheckerTests.SceneBoundariesCheckerTests_DebugMode", "rp": "SceneBoundariesCheckerTests_SceneBoundariesCheckerTests_DebugMode.html", "cl": 38, "ucl": 4, "cal": 42, "tl": 120, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SceneObject",
    "classes": [
      { "name": "SceneObject", "rp": "SceneObject_SceneObject.html", "cl": 1, "ucl": 2, "cal": 3, "tl": 46, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SceneTests",
    "classes": [
      { "name": "DecentralandEntityShould", "rp": "SceneTests_DecentralandEntityShould.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 19, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SceneTests", "rp": "SceneTests_SceneTests.html", "cl": 160, "ucl": 25, "cal": 185, "tl": 414, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ScriptableObjects",
    "classes": [
      { "name": "AudioScriptableObjects", "rp": "ScriptableObjects_AudioScriptableObjects.html", "cl": 13, "ucl": 14, "cal": 27, "tl": 207, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseDictionary_Legacy[TKey,TValue]", "rp": "ScriptableObjects_BaseDictionary_Legacy_TKey_TValue_.html", "cl": 25, "ucl": 17, "cal": 42, "tl": 102, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseVariableAsset", "rp": "ScriptableObjects_BaseVariableAsset.html", "cl": 0, "ucl": 4, "cal": 4, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BaseVariableAsset[T]", "rp": "ScriptableObjects_BaseVariableAsset_T_.html", "cl": 10, "ucl": 7, "cal": 17, "tl": 72, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "BooleanVariable", "rp": "ScriptableObjects_BooleanVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "CommonScriptableObjects", "rp": "ScriptableObjects_CommonScriptableObjects.html", "cl": 33, "ucl": 1, "cal": 34, "tl": 207, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FloatVariable", "rp": "ScriptableObjects_FloatVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "IntVariable", "rp": "ScriptableObjects_IntVariable.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ListVariable_Legacy[T]", "rp": "ScriptableObjects_ListVariable_Legacy_T_.html", "cl": 6, "ucl": 26, "cal": 32, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "LongVariable", "rp": "ScriptableObjects_LongVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "NotificationScriptableObjects", "rp": "ScriptableObjects_NotificationScriptableObjects.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 207, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "RendererState", "rp": "ScriptableObjects_RendererState.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "StringVariable", "rp": "ScriptableObjects_StringVariable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Vector2IntVariable", "rp": "ScriptableObjects_Vector2IntVariable.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Vector3NullableVariable", "rp": "ScriptableObjects_Vector3NullableVariable.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Vector3Variable", "rp": "ScriptableObjects_Vector3Variable.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 7, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ServiceProviders",
    "classes": [
      { "name": "ServiceProviders", "rp": "ServiceProviders_ServiceProviders.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Settings",
    "classes": [
      { "name": "DCL.Settings", "rp": "Settings_Settings.html", "cl": 24, "ucl": 45, "cal": 69, "tl": 193, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsCommon.CommonSettingsScriptableObjects", "rp": "Settings_CommonSettingsScriptableObjects.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsData.GeneralSettings", "rp": "Settings_GeneralSettings.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 193, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsData.QualitySettings", "rp": "Settings_QualitySettings.html", "cl": 4, "ucl": 25, "cal": 29, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsData.QualitySettingsData", "rp": "Settings_QualitySettingsData.html", "cl": 0, "ucl": 5, "cal": 5, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SettingsControllers",
    "classes": [
      { "name": "AutoQualityCappedFPSController", "rp": "SettingsControllers_AutoQualityCappedFPSController.html", "cl": 22, "ucl": 1, "cal": 23, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AutoQualitySettingsComponent", "rp": "SettingsControllers_AutoQualitySettingsComponent.html", "cl": 24, "ucl": 17, "cal": 41, "tl": 101, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "AutoQualityUncappedFPSController", "rp": "SettingsControllers_AutoQualityUncappedFPSController.html", "cl": 21, "ucl": 1, "cal": 22, "tl": 54, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsController.GeneralSettingsReferences", "rp": "SettingsControllers_GeneralSettingsReferences.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsController.QualitySettingsReferences", "rp": "SettingsControllers_QualitySettingsReferences.html", "cl": 1, "ucl": 1, "cal": 2, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.AllowVoiceChatControlController", "rp": "SettingsControllers_AllowVoiceChatControlController.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.AntiAliasingControlController", "rp": "SettingsControllers_AntiAliasingControlController.html", "cl": 14, "ucl": 1, "cal": 15, "tl": 49, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.AutoQualityControlController", "rp": "SettingsControllers_AutoQualityControlController.html", "cl": 5, "ucl": 5, "cal": 10, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.BaseResolutionControlController", "rp": "SettingsControllers_BaseResolutionControlController.html", "cl": 5, "ucl": 4, "cal": 9, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.BloomControlController", "rp": "SettingsControllers_BloomControlController.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.ColorGradingControlController", "rp": "SettingsControllers_ColorGradingControlController.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.DetailObjectCullingControlController", "rp": "SettingsControllers_DetailObjectCullingControlController.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.DetailObjectCullingSizeControlController", "rp": "SettingsControllers_DetailObjectCullingSizeControlController.html", "cl": 4, "ucl": 4, "cal": 8, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.DrawDistanceControlController", "rp": "SettingsControllers_DrawDistanceControlController.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.FPSLimitControlController", "rp": "SettingsControllers_FPSLimitControlController.html", "cl": 4, "ucl": 1, "cal": 5, "tl": 26, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.MouseSensivityControlController", "rp": "SettingsControllers_MouseSensivityControlController.html", "cl": 11, "ucl": 0, "cal": 11, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.MuteSoundControlController", "rp": "SettingsControllers_MuteSoundControlController.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.QualityPresetControlController", "rp": "SettingsControllers_QualityPresetControlController.html", "cl": 18, "ucl": 2, "cal": 20, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.RenderingScaleControlController", "rp": "SettingsControllers_RenderingScaleControlController.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.ScenesLoadRadiusControlController", "rp": "SettingsControllers_ScenesLoadRadiusControlController.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 31, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.SettingsControlController", "rp": "SettingsControllers_SettingsControlController.html", "cl": 10, "ucl": 10, "cal": 20, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.ShadowControlController", "rp": "SettingsControllers_ShadowControlController.html", "cl": 16, "ucl": 1, "cal": 17, "tl": 50, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.ShadowDistanceControlController", "rp": "SettingsControllers_ShadowDistanceControlController.html", "cl": 8, "ucl": 0, "cal": 8, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.ShadowResolutionControlController", "rp": "SettingsControllers_ShadowResolutionControlController.html", "cl": 10, "ucl": 1, "cal": 11, "tl": 36, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.SliderSettingsControlController", "rp": "SettingsControllers_SliderSettingsControlController.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.SoftShadowsControlController", "rp": "SettingsControllers_SoftShadowsControlController.html", "cl": 15, "ucl": 1, "cal": 16, "tl": 47, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.SpinBoxSettingsControlController", "rp": "SettingsControllers_SpinBoxSettingsControlController.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.SSAOControlController", "rp": "SettingsControllers_SSAOControlController.html", "cl": 17, "ucl": 11, "cal": 28, "tl": 70, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsControls.VoiceChatVolumeControlController", "rp": "SettingsControllers_VoiceChatVolumeControlController.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 17, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SettingsControllersTest",
    "classes": [
      { "name": "Tests.AutoQualityCappedFPSControllerShould", "rp": "SettingsControllersTest_AutoQualityCappedFPSControllerShould.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 220, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.AutoQualitySettingsComponentShould", "rp": "SettingsControllersTest_AutoQualitySettingsComponentShould.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 220, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.AutoQualityUncappedFPSControllerShould", "rp": "SettingsControllersTest_AutoQualityUncappedFPSControllerShould.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 220, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SettingsControlsShould", "rp": "SettingsControllersTest_SettingsControlsShould.html", "cl": 158, "ucl": 0, "cal": 158, "tl": 382, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SettingsPanelHUD",
    "classes": [
      { "name": "DCL.SettingsPanelHUD.Common.CommonSettingsPanelEvents", "rp": "SettingsPanelHUD_CommonSettingsPanelEvents.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 10, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Controls.SettingsControlView", "rp": "SettingsPanelHUD_SettingsControlView.html", "cl": 57, "ucl": 11, "cal": 68, "tl": 186, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Controls.SliderSettingsControlView", "rp": "SettingsPanelHUD_SliderSettingsControlView.html", "cl": 24, "ucl": 5, "cal": 29, "tl": 82, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Controls.SpinBoxSettingsControlView", "rp": "SettingsPanelHUD_SpinBoxSettingsControlView.html", "cl": 23, "ucl": 3, "cal": 26, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Controls.ToggleSettingsControlView", "rp": "SettingsPanelHUD_ToggleSettingsControlView.html", "cl": 10, "ucl": 3, "cal": 13, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Sections.SettingsButtonEntry", "rp": "SettingsPanelHUD_SettingsButtonEntry.html", "cl": 12, "ucl": 8, "cal": 20, "tl": 82, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Sections.SettingsSectionController", "rp": "SettingsPanelHUD_SettingsSectionController.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 44, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Sections.SettingsSectionView", "rp": "SettingsPanelHUD_SettingsSectionView.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.SettingsPanelHUDController", "rp": "SettingsPanelHUD_SettingsPanelHUDController.html", "cl": 28, "ucl": 15, "cal": 43, "tl": 165, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.SettingsPanelHUDView", "rp": "SettingsPanelHUD_SettingsPanelHUDView.html", "cl": 48, "ucl": 17, "cal": 65, "tl": 155, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Widgets.SettingsWidgetController", "rp": "SettingsPanelHUD_SettingsWidgetController.html", "cl": 5, "ucl": 0, "cal": 5, "tl": 45, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.SettingsPanelHUD.Widgets.SettingsWidgetView", "rp": "SettingsPanelHUD_SettingsWidgetView.html", "cl": 40, "ucl": 1, "cal": 41, "tl": 126, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SettingsPanelDataStore", "rp": "SettingsPanelHUD_SettingsPanelDataStore.html", "cl": 4, "ucl": 9, "cal": 13, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SettingsPanelHUDTests_PlayMode",
    "classes": [
      { "name": "SettingsPanelTests.SettingsPanelShould_PlayMode", "rp": "SettingsPanelHUDTests_PlayMode_SettingsPanelShould_PlayMode.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 77, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SettingsSectionTests.SettingsSectionShould_PlayMode", "rp": "SettingsPanelHUDTests_PlayMode_SettingsSectionShould_PlayMode.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 66, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SettingsWidgetTests.SettingsWidgetShould_PlayMode", "rp": "SettingsPanelHUDTests_PlayMode_SettingsWidgetShould_PlayMode.html", "cl": 24, "ucl": 0, "cal": 24, "tl": 81, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SettingsPanelTests_EditMode",
    "classes": [
      { "name": "SettingsPanelTests.SettingsPanelShould_EditMode", "rp": "SettingsPanelTests_EditMode_SettingsPanelShould_EditMode.html", "cl": 0, "ucl": 28, "cal": 28, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SettingsSectionTests.SettingsSectionShould_EditMode", "rp": "SettingsPanelTests_EditMode_SettingsSectionShould_EditMode.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SettingsWidgetTests.SettingsWidgetShould_EditMode", "rp": "SettingsPanelTests_EditMode_SettingsWidgetShould_EditMode.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 43, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ShaderVariantTracker",
    "classes": [
      { "name": "ShaderVariantTracker", "rp": "ShaderVariantTracker_ShaderVariantTracker.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 42, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ShaderVariantTrackerComponent", "rp": "ShaderVariantTracker_ShaderVariantTrackerComponent.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 13, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SignupHUD",
    "classes": [
      { "name": "SignupHUD.SignupHUDController", "rp": "SignupHUD_SignupHUDController.html", "cl": 40, "ucl": 3, "cal": 43, "tl": 84, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SignupHUD.SignupHUDView", "rp": "SignupHUD_SignupHUDView.html", "cl": 59, "ucl": 3, "cal": 62, "tl": 158, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SignupHUDTests",
    "classes": [
      { "name": "Tests.SignupHUD.SignupHUDControllerShould", "rp": "SignupHUDTests_SignupHUDControllerShould.html", "cl": 49, "ucl": 1, "cal": 50, "tl": 111, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.SignupHUD.SignupHUDViewShould", "rp": "SignupHUDTests_SignupHUDViewShould.html", "cl": 41, "ucl": 0, "cal": 41, "tl": 98, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SmartItemCommon",
    "classes": [
      { "name": "DCL.Components.SmartItemActionable", "rp": "SmartItemCommon_SmartItemActionable.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Components.SmartItemParameter", "rp": "SmartItemCommon_SmartItemParameter.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "SRPBatchingHelper",
    "classes": [
      { "name": "DCL.Helpers.SRPBatchingHelper", "rp": "SRPBatchingHelper_SRPBatchingHelper.html", "cl": 28, "ucl": 7, "cal": 35, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TaskbarHUD",
    "classes": [
      { "name": "ChatHeadButton", "rp": "TaskbarHUD_ChatHeadButton.html", "cl": 15, "ucl": 8, "cal": 23, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ChatHeadGroupView", "rp": "TaskbarHUD_ChatHeadGroupView.html", "cl": 66, "ucl": 73, "cal": 139, "tl": 301, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PortableExperienceContextMenu", "rp": "TaskbarHUD_PortableExperienceContextMenu.html", "cl": 11, "ucl": 9, "cal": 20, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PortableExperienceTaskbarItem", "rp": "TaskbarHUD_PortableExperienceTaskbarItem.html", "cl": 5, "ucl": 12, "cal": 17, "tl": 64, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarButton", "rp": "TaskbarHUD_TaskbarButton.html", "cl": 39, "ucl": 1, "cal": 40, "tl": 97, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarHUDController", "rp": "TaskbarHUD_TaskbarHUDController.html", "cl": 165, "ucl": 135, "cal": 300, "tl": 599, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarHUDView", "rp": "TaskbarHUD_TaskbarHUDView.html", "cl": 187, "ucl": 22, "cal": 209, "tl": 443, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarMoreMenu", "rp": "TaskbarHUD_TaskbarMoreMenu.html", "cl": 56, "ucl": 41, "cal": 97, "tl": 209, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarMoreMenuButton", "rp": "TaskbarHUD_TaskbarMoreMenuButton.html", "cl": 15, "ucl": 10, "cal": 25, "tl": 79, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TaskbarNewQuestTooltip", "rp": "TaskbarHUD_TaskbarNewQuestTooltip.html", "cl": 3, "ucl": 3, "cal": 6, "tl": 20, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TaskbarHUDTests",
    "classes": [
      { "name": "TaskbarHUDShould", "rp": "TaskbarHUDTests_TaskbarHUDShould.html", "cl": 130, "ucl": 0, "cal": 130, "tl": 252, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TeleportPromptHUD",
    "classes": [
      { "name": "TeleportPromptHUDController", "rp": "TeleportPromptHUD_TeleportPromptHUDController.html", "cl": 24, "ucl": 31, "cal": 55, "tl": 142, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TeleportPromptHUDView", "rp": "TeleportPromptHUD_TeleportPromptHUDView.html", "cl": 26, "ucl": 42, "cal": 68, "tl": 166, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TeleportPromptHUDTest",
    "classes": [
      { "name": "Tests.TeleportPromptHUDTest", "rp": "TeleportPromptHUDTest_TeleportPromptHUDTest.html", "cl": 14, "ucl": 0, "cal": 14, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TermsOfServiceHUD",
    "classes": [
      { "name": "TermsOfServiceHUDController", "rp": "TermsOfServiceHUD_TermsOfServiceHUDController.html", "cl": 21, "ucl": 9, "cal": 30, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TermsOfServiceHUDView", "rp": "TermsOfServiceHUD_TermsOfServiceHUDView.html", "cl": 30, "ucl": 0, "cal": 30, "tl": 78, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TermsOfServiceHUDTests",
    "classes": [
      { "name": "TermsOfServiceHUD_Should", "rp": "TermsOfServiceHUDTests_TermsOfServiceHUD_Should.html", "cl": 36, "ucl": 0, "cal": 36, "tl": 97, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TestAssetsUtils",
    "classes": [
      { "name": "DCL.Helpers.TestAssetsUtils", "rp": "TestAssetsUtils_TestAssetsUtils.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TestEnvironment",
    "classes": [
      { "name": "DCL.Tests.MessagingContextFactory", "rp": "TestEnvironment_MessagingContextFactory.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tests.PlatformContextFactory", "rp": "TestEnvironment_PlatformContextFactory.html", "cl": 24, "ucl": 15, "cal": 39, "tl": 115, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tests.WorldRuntimeContextFactory", "rp": "TestEnvironment_WorldRuntimeContextFactory.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 27, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TestHelpers",
    "classes": [
      { "name": "DCL.Helpers.TestHelpers", "rp": "TestHelpers_TestHelpers.html", "cl": 301, "ucl": 82, "cal": 383, "tl": 1197, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.WaitForAllMessagesProcessed", "rp": "TestHelpers_WaitForAllMessagesProcessed.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 1197, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "EntityMaterialUpdateTestController", "rp": "TestHelpers_EntityMaterialUpdateTestController.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 80, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GLTFLoadingTestController", "rp": "TestHelpers_GLTFLoadingTestController.html", "cl": 0, "ucl": 31, "cal": 31, "tl": 90, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "IntegrationTestSuite_Legacy", "rp": "TestHelpers_IntegrationTestSuite_Legacy.html", "cl": 108, "ucl": 11, "cal": 119, "tl": 281, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "InteractiveObjectsHoverTestSceneController", "rp": "TestHelpers_InteractiveObjectsHoverTestSceneController.html", "cl": 0, "ucl": 18, "cal": 18, "tl": 59, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UITestsBase", "rp": "TestHelpers_UITestsBase.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 49, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TestSceneIntegrityChecker", "rp": "TestHelpers_TestSceneIntegrityChecker.html", "cl": 6, "ucl": 29, "cal": 35, "tl": 95, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TextShapeTests",
    "classes": [
      { "name": "Tests.TextShapeHelperTests", "rp": "TextShapeTests_TextShapeHelperTests.html", "cl": 10, "ucl": 0, "cal": 10, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.TextShapeTests", "rp": "TextShapeTests_TextShapeTests.html", "cl": 69, "ucl": 0, "cal": 69, "tl": 183, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TextureHelpers",
    "classes": [
      { "name": "TextureHelpers", "rp": "TextureHelpers_TextureHelpers.html", "cl": 14, "ucl": 17, "cal": 31, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TexturesTests",
    "classes": [
      { "name": "Tests.TexturesTests", "rp": "TexturesTests_TexturesTests.html", "cl": 28, "ucl": 0, "cal": 28, "tl": 74, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TheGraph",
    "classes": [
      { "name": "TheGraph", "rp": "TheGraph_TheGraph.html", "cl": 33, "ucl": 37, "cal": 70, "tl": 151, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TheGraphQueries", "rp": "TheGraph_TheGraphQueries.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 76, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TheGraphInterfaces",
    "classes": [
      { "name": "LandHelper", "rp": "TheGraphInterfaces_LandHelper.html", "cl": 0, "ucl": 42, "cal": 42, "tl": 139, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "ThumbnailsManager",
    "classes": [
      { "name": "ThumbnailsManager", "rp": "ThumbnailsManager_ThumbnailsManager.html", "cl": 17, "ucl": 7, "cal": 24, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TransformTests",
    "classes": [
      { "name": "Tests.TransformTests", "rp": "TransformTests_TransformTests.html", "cl": 62, "ucl": 0, "cal": 62, "tl": 133, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TutorialBuilderInWorld",
    "classes": [
      { "name": "TutorialStep_Catalog", "rp": "TutorialBuilderInWorld_TutorialStep_Catalog.html", "cl": 0, "ucl": 12, "cal": 12, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TutorialStep_PutSceneObject", "rp": "TutorialBuilderInWorld_TutorialStep_PutSceneObject.html", "cl": 0, "ucl": 11, "cal": 11, "tl": 34, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "TutorialStep_SceneObject", "rp": "TutorialBuilderInWorld_TutorialStep_SceneObject.html", "cl": 0, "ucl": 10, "cal": 10, "tl": 32, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "TutorialControllerTests",
    "classes": [
      { "name": "DCL.Tutorial_Tests.TutorialControllerShould", "rp": "TutorialControllerTests_TutorialControllerShould.html", "cl": 133, "ucl": 6, "cal": 139, "tl": 270, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Tutorial_Tests.TutorialStep_Mock", "rp": "TutorialControllerTests_TutorialStep_Mock.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIContainerRectTests",
    "classes": [
      { "name": "Tests.UIContainerRectTests", "rp": "UIContainerRectTests_UIContainerRectTests.html", "cl": 70, "ucl": 0, "cal": 70, "tl": 231, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UIContainerStackTests", "rp": "UIContainerRectTests_UIContainerStackTests.html", "cl": 128, "ucl": 0, "cal": 128, "tl": 413, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIContainerRectVisualTests", "rp": "UIContainerRectTests_UIContainerRectVisualTests.html", "cl": 16, "ucl": 1, "cal": 17, "tl": 140, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIContainerStackVisualTests", "rp": "UIContainerRectTests_UIContainerStackVisualTests.html", "cl": 14, "ucl": 1, "cal": 15, "tl": 96, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIHelpers",
    "classes": [
      { "name": "DCLVerticalLayoutGroup", "rp": "UIHelpers_DCLVerticalLayoutGroup.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 10, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DynamicScrollSensitivity", "rp": "UIHelpers_DynamicScrollSensitivity.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "PointerOverDetector", "rp": "UIHelpers_PointerOverDetector.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 15, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "RawImageFillParent", "rp": "UIHelpers_RawImageFillParent.html", "cl": 17, "ucl": 2, "cal": 19, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SpinBoxPresetted", "rp": "UIHelpers_SpinBoxPresetted.html", "cl": 15, "ucl": 18, "cal": 33, "tl": 90, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "SwitchToggle", "rp": "UIHelpers_SwitchToggle.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ToggleActiveGameObject", "rp": "UIHelpers_ToggleActiveGameObject.html", "cl": 9, "ucl": 0, "cal": 9, "tl": 27, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ToggleSpriteSwap", "rp": "UIHelpers_ToggleSpriteSwap.html", "cl": 0, "ucl": 7, "cal": 7, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIHoverCallback", "rp": "UIHelpers_UIHoverCallback.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 16, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIImageTests",
    "classes": [
      { "name": "Tests.UIImageTests", "rp": "UIImageTests_UIImageTests.html", "cl": 143, "ucl": 0, "cal": 143, "tl": 477, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIImageVisualTests", "rp": "UIImageTests_UIImageVisualTests.html", "cl": 9, "ucl": 1, "cal": 10, "tl": 63, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIInputTextTests",
    "classes": [
      { "name": "DCL.InputTextTestsController", "rp": "UIInputTextTests_InputTextTestsController.html", "cl": 0, "ucl": 15, "cal": 15, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UIInputTextTests", "rp": "UIInputTextTests_UIInputTextTests.html", "cl": 68, "ucl": 0, "cal": 68, "tl": 161, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIInputTextVisualTests", "rp": "UIInputTextTests_UIInputTextVisualTests.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 52, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIScreenSpaceTests",
    "classes": [
      { "name": "Tests.UIScreenSpaceTests", "rp": "UIScreenSpaceTests_UIScreenSpaceTests.html", "cl": 11, "ucl": 28, "cal": 39, "tl": 134, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UIScrollRectTests",
    "classes": [
      { "name": "Tests.UIScrollRectTests", "rp": "UIScrollRectTests_UIScrollRectTests.html", "cl": 46, "ucl": 12, "cal": 58, "tl": 194, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIScrollRectVisualTests", "rp": "UIScrollRectTests_UIScrollRectVisualTests.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 61, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UITextTests",
    "classes": [
      { "name": "Tests.UITextTests", "rp": "UITextTests_UITextTests.html", "cl": 60, "ucl": 0, "cal": 60, "tl": 181, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UITextVisualTests", "rp": "UITextTests_UITextVisualTests.html", "cl": 6, "ucl": 1, "cal": 7, "tl": 67, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UniGif",
    "classes": [
      { "name": "UniGif", "rp": "UniGif_UniGif.html", "cl": 331, "ucl": 201, "cal": 532, "tl": 1512, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UniGifExtension", "rp": "UniGif_UniGifExtension.html", "cl": 11, "ucl": 6, "cal": 17, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UnityGLTFEditorAssembly",
    "classes": [
      { "name": "GLTFExportMenu", "rp": "UnityGLTFEditorAssembly_GLTFExportMenu.html", "cl": 0, "ucl": 46, "cal": 46, "tl": 99, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnityEditor.PbrShaderGUI", "rp": "UnityGLTFEditorAssembly_PbrShaderGUI.html", "cl": 0, "ucl": 146, "cal": 146, "tl": 295, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnityGLTF.GLTFImporter", "rp": "UnityGLTFEditorAssembly_GLTFImporter.html", "cl": 0, "ucl": 271, "cal": 271, "tl": 574, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UnityGLTF.GLTFImporterInspector", "rp": "UnityGLTFEditorAssembly_GLTFImporterInspector.html", "cl": 0, "ucl": 26, "cal": 26, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UserContextMenu",
    "classes": [
      { "name": "UserContextConfirmationDialog", "rp": "UserContextMenu_UserContextConfirmationDialog.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 35, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserContextMenu", "rp": "UserContextMenu_UserContextMenu.html", "cl": 116, "ucl": 42, "cal": 158, "tl": 410, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UserContextMenuTest",
    "classes": [
      { "name": "UserContextMenuShould", "rp": "UserContextMenuTest_UserContextMenuShould.html", "cl": 79, "ucl": 0, "cal": 79, "tl": 188, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UserProfile",
    "classes": [
      { "name": "UserProfile", "rp": "UserProfile_UserProfile.html", "cl": 62, "ucl": 25, "cal": 87, "tl": 169, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserProfileController", "rp": "UserProfile_UserProfileController.html", "cl": 14, "ucl": 30, "cal": 44, "tl": 104, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserProfileFetcher", "rp": "UserProfile_UserProfileFetcher.html", "cl": 11, "ucl": 9, "cal": 20, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UserProfileModel", "rp": "UserProfile_UserProfileModel.html", "cl": 2, "ucl": 1, "cal": 3, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UserProfileTests",
    "classes": [
      { "name": "Tests.UserProfileTests", "rp": "UserProfileTests_UserProfileTests.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 116, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UsersAroundListHUD",
    "classes": [
      { "name": "UsersAroundListHUDButtonView", "rp": "UsersAroundListHUD_UsersAroundListHUDButtonView.html", "cl": 0, "ucl": 2, "cal": 2, "tl": 15, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersAroundListHUDController", "rp": "UsersAroundListHUD_UsersAroundListHUDController.html", "cl": 61, "ucl": 44, "cal": 105, "tl": 243, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersAroundListHUDListElementView", "rp": "UsersAroundListHUD_UsersAroundListHUDListElementView.html", "cl": 38, "ucl": 31, "cal": 69, "tl": 168, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UsersAroundListHUDListView", "rp": "UsersAroundListHUD_UsersAroundListHUDListView.html", "cl": 64, "ucl": 24, "cal": 88, "tl": 197, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UsersAroundListHUDTests",
    "classes": [
      { "name": "UsersAroundListHUDShould", "rp": "UsersAroundListHUDTests_UsersAroundListHUDShould.html", "cl": 37, "ucl": 0, "cal": 37, "tl": 107, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UsersSearchBridge",
    "classes": [
      { "name": "UsersSearchBridge", "rp": "UsersSearchBridge_UsersSearchBridge.html", "cl": 1, "ucl": 11, "cal": 12, "tl": 52, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UsersSearcher",
    "classes": [
      { "name": "UsersSearcher", "rp": "UsersSearcher_UsersSearcher.html", "cl": 18, "ucl": 0, "cal": 18, "tl": 55, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UsersSearcherTests",
    "classes": [
      { "name": "UsersSearcherTests", "rp": "UsersSearcherTests_UsersSearcherTests.html", "cl": 32, "ucl": 2, "cal": 34, "tl": 68, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "Utils",
    "classes": [
      { "name": "DCL.Helpers.CompositeLock", "rp": "Utils_CompositeLock.html", "cl": 11, "ucl": 12, "cal": 23, "tl": 53, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.GenericFactory", "rp": "Utils_GenericFactory.html", "cl": 13, "ucl": 2, "cal": 15, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.PlayerPrefsUtils", "rp": "Utils_PlayerPrefsUtils.html", "cl": 10, "ucl": 7, "cal": 17, "tl": 41, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.Utils", "rp": "Utils_Utils.html", "cl": 135, "ucl": 74, "cal": 209, "tl": 578, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Helpers.UtilsDummyJsonUtilityFromArray[T]", "rp": "Utils_UtilsDummyJsonUtilityFromArray_T_.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 578, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Singleton[T]", "rp": "Utils_Singleton_T_.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 8, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCLTime", "rp": "Utils_DCLTime.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 9, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DestroyParticlesOnFinish", "rp": "Utils_DestroyParticlesOnFinish.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "FollowObject", "rp": "Utils_FollowObject.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 11, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "RectTransformExtensions", "rp": "Utils_RectTransformExtensions.html", "cl": 16, "ucl": 1, "cal": 17, "tl": 40, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ReorderableList.ReorderableArray[T]", "rp": "Utils_ReorderableArray_T_.html", "cl": 9, "ucl": 13, "cal": 22, "tl": 60, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "ReorderableList.ReorderableAttribute", "rp": "Utils_ReorderableAttribute.html", "cl": 0, "ucl": 14, "cal": 14, "tl": 51, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "UUIDComponentTests",
    "classes": [
      { "name": "Tests.UUIDComponentShould", "rp": "UUIDComponentTests_UUIDComponentShould.html", "cl": 78, "ucl": 1, "cal": 79, "tl": 206, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.UUIDComponentTests", "rp": "UUIDComponentTests_UUIDComponentTests.html", "cl": 477, "ucl": 14, "cal": 491, "tl": 1181, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "VideoTests",
    "classes": [
      { "name": "Tests.VideoTests", "rp": "VideoTests_VideoTests.html", "cl": 151, "ucl": 0, "cal": 151, "tl": 335, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "VisualTests",
    "classes": [
      { "name": "DCL.Helpers.VisualTestHelpers", "rp": "VisualTests_VisualTestHelpers.html", "cl": 88, "ucl": 37, "cal": 125, "tl": 315, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "GameViewUtils", "rp": "VisualTests_GameViewUtils.html", "cl": 45, "ucl": 15, "cal": 60, "tl": 124, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.GameViewUtilsTests", "rp": "VisualTests_GameViewUtilsTests.html", "cl": 7, "ucl": 0, "cal": 7, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "UIVisualTestsBase", "rp": "VisualTests_UIVisualTestsBase.html", "cl": 16, "ucl": 0, "cal": 16, "tl": 66, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VisualTestController", "rp": "VisualTests_VisualTestController.html", "cl": 6, "ucl": 32, "cal": 38, "tl": 108, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "VisualTestsBase", "rp": "VisualTests_VisualTestsBase.html", "cl": 2, "ucl": 14, "cal": 16, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "VoiceChatButton",
    "classes": [
      { "name": "VoiceChatButton", "rp": "VoiceChatButton_VoiceChatButton.html", "cl": 5, "ucl": 27, "cal": 32, "tl": 71, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "VoiceChatController",
    "classes": [
      { "name": "DCL.DCLVoiceChatController", "rp": "VoiceChatController_DCLVoiceChatController.html", "cl": 15, "ucl": 0, "cal": 15, "tl": 38, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WaitForSecondsCache",
    "classes": [
      { "name": "WaitForSecondsCache", "rp": "WaitForSecondsCache_WaitForSecondsCache.html", "cl": 6, "ucl": 0, "cal": 6, "tl": 22, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WearablesFetching",
    "classes": [
      { "name": "DCL.Helpers.WearablesFetchingHelper", "rp": "WearablesFetching_WearablesFetchingHelper.html", "cl": 0, "ucl": 35, "cal": 35, "tl": 105, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WearablesAPIData", "rp": "WearablesFetching_WearablesAPIData.html", "cl": 0, "ucl": 16, "cal": 16, "tl": 125, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WebInterface",
    "classes": [
      { "name": "DCL.Interface.CrashPayload", "rp": "WebInterface_CrashPayload.html", "cl": 0, "ucl": 1, "cal": 1, "tl": 25, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Interface.SceneMetricsModelExtensions", "rp": "WebInterface_SceneMetricsModelExtensions.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 18, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Interface.WebInterface", "rp": "WebInterface_WebInterface.html", "cl": 217, "ucl": 101, "cal": 318, "tl": 1249, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Interface.WebInterfaceControlEvent[T]", "rp": "WebInterface_WebInterfaceControlEvent_T_.html", "cl": 4, "ucl": 0, "cal": 4, "tl": 1249, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Interface.WebInterfaceUUIDEvent[TPayload]", "rp": "WebInterface_WebInterfaceUUIDEvent_TPayload_.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 1249, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WebRequest",
    "classes": [
      { "name": "DCL.WebRequest", "rp": "WebRequest_WebRequest.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestAssetBundle", "rp": "WebRequest_WebRequestAssetBundle.html", "cl": 5, "ucl": 1, "cal": 6, "tl": 28, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestAudio", "rp": "WebRequest_WebRequestAudio.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 14, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestController", "rp": "WebRequest_WebRequestController.html", "cl": 30, "ucl": 3, "cal": 33, "tl": 179, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestExtensions", "rp": "WebRequest_WebRequestExtensions.html", "cl": 3, "ucl": 0, "cal": 3, "tl": 29, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WebRequestTexture", "rp": "WebRequest_WebRequestTexture.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 12, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WebRequestControllerInterfaces",
    "classes": [
      { "name": "DCL.WebRequestAsyncOperation", "rp": "WebRequestControllerInterfaces_WebRequestAsyncOperation.html", "cl": 23, "ucl": 5, "cal": 28, "tl": 91, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WelcomeHUD",
    "classes": [
      { "name": "WelcomeHUDController", "rp": "WelcomeHUD_WelcomeHUDController.html", "cl": 40, "ucl": 23, "cal": 63, "tl": 163, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WelcomeHUDView", "rp": "WelcomeHUD_WelcomeHUDView.html", "cl": 50, "ucl": 19, "cal": 69, "tl": 164, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WelcomeHUDTests",
    "classes": [
      { "name": "Tests.WelcomeHUDControllerShould", "rp": "WelcomeHUDTests_WelcomeHUDControllerShould.html", "cl": 17, "ucl": 9, "cal": 26, "tl": 149, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "Tests.WelcomeHUDViewShould", "rp": "WelcomeHUDTests_WelcomeHUDViewShould.html", "cl": 20, "ucl": 0, "cal": 20, "tl": 149, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WorldBlockersController",
    "classes": [
      { "name": "DCL.Controllers.BlockerAnimationHandler", "rp": "WorldBlockersController_BlockerAnimationHandler.html", "cl": 5, "ucl": 13, "cal": 18, "tl": 56, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.BlockerInstanceHandler", "rp": "WorldBlockersController_BlockerInstanceHandler.html", "cl": 56, "ucl": 5, "cal": 61, "tl": 148, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.Controllers.WorldBlockersController", "rp": "WorldBlockersController_WorldBlockersController.html", "cl": 71, "ucl": 4, "cal": 75, "tl": 189, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WorldChatWindowHUD",
    "classes": [
      { "name": "WorldChatWindowHUDController", "rp": "WorldChatWindowHUD_WorldChatWindowHUDController.html", "cl": 72, "ucl": 16, "cal": 88, "tl": 187, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "WorldChatWindowHUDView", "rp": "WorldChatWindowHUD_WorldChatWindowHUDView.html", "cl": 36, "ucl": 8, "cal": 44, "tl": 106, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WorldChatWindowHUDTests",
    "classes": [
      { "name": "WorldChatWindowHUDShould", "rp": "WorldChatWindowHUDTests_WorldChatWindowHUDShould.html", "cl": 91, "ucl": 0, "cal": 91, "tl": 222, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WorldRuntimeContextFactory",
    "classes": [
      { "name": "DCL.WorldRuntimeContextFactory", "rp": "WorldRuntimeContextFactory_WorldRuntimeContextFactory.html", "cl": 2, "ucl": 0, "cal": 2, "tl": 23, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WorldRuntimeInterfaces",
    "classes": [
      { "name": "DCL.SceneMetricsModel", "rp": "WorldRuntimeInterfaces_SceneMetricsModel.html", "cl": 1, "ucl": 0, "cal": 1, "tl": 30, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WrappedTextureAsset",
    "classes": [
      { "name": "DCL.PromiseLike_Gif", "rp": "WrappedTextureAsset_PromiseLike_Gif.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.PromiseLike_Texture", "rp": "WrappedTextureAsset_PromiseLike_Texture.html", "cl": 0, "ucl": 3, "cal": 3, "tl": 24, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WrappedTextureUtils", "rp": "WrappedTextureAsset_WrappedTextureUtils.html", "cl": 0, "ucl": 25, "cal": 25, "tl": 58, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WSSController",
    "classes": [
      { "name": "DCL.DCLWebSocketService", "rp": "WSSController_DCLWebSocketService.html", "cl": 0, "ucl": 21, "cal": 21, "tl": 558, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
      { "name": "DCL.WSSController", "rp": "WSSController_WSSController.html", "cl": 0, "ucl": 233, "cal": 233, "tl": 558, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
  {
    "name": "WSSTests",
    "classes": [
      { "name": "Tests.WSSTests", "rp": "WSSTests_WSSTests.html", "cl": 0, "ucl": 43, "cal": 43, "tl": 113, "ct": "LineCoverage", "mc": "-", "cb": 0, "tb": 0, "lch": [], "bch": [], "hc": [] },
    ]},
];

var historicCoverageExecutionTimes = [];

var riskHotspotMetrics = [
      { "name": "Cyclomatic complexity", "explanationUrl": "https://en.wikipedia.org/wiki/Cyclomatic_complexity" },
      { "name": "NPath complexity", "explanationUrl": "https://modess.io/npath-complexity-cyclomatic-complexity-explained" },
      { "name": "Crap Score", "explanationUrl": "https://googletesting.blogspot.de/2011/02/this-code-is-crap.html" },
];

var riskHotspots = [
  {
    "assembly": "WSSController", "class": "DCL.WSSController", "reportPath": "WSSController_WSSController.html", "methodName": "System.Void DCL.WSSController::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 250,
    "metrics": [
      { "value": 241, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 58322, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarRenderer", "reportPath": "AvatarShape_AvatarRenderer.html", "methodName": "LoadAvatar()", "methodShortName": "LoadAvatar()", "fileIndex": 0, "line": 158,
    "metrics": [
      { "value": 56, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 2722.71, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.SceneController", "reportPath": "MainScripts_SceneController.html", "methodName": "System.Void DCL.SceneController::ProcessMessage(DCL.Controllers.ParcelScene, System.String, System.Object, UnityEngine.CustomYieldInstruction&)", "methodShortName": "ProcessMessage(...)", "fileIndex": 0, "line": 196,
    "metrics": [
      { "value": 47, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 2256, "exceeded": true },
    ]},
  {
    "assembly": "UnityGLTFEditorAssembly", "class": "UnityGLTF.GLTFImporter", "reportPath": "UnityGLTFEditorAssembly_GLTFImporter.html", "methodName": "System.Void UnityGLTF.GLTFImporter::OnImportAsset(UnityEditor.AssetImporters.AssetImportContext)", "methodShortName": "OnImportAsset(...)", "fileIndex": 0, "line": 75,
    "metrics": [
      { "value": 35, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 1260, "exceeded": true },
    ]},
  {
    "assembly": "AvatarEditorHUD", "class": "AvatarEditorHUDAudioHandler", "reportPath": "AvatarEditorHUD_AvatarEditorHUDAudioHandler.html", "methodName": "System.Void AvatarEditorHUDAudioHandler::OnSelectWearable(System.String)", "methodShortName": "OnSelectWearable(...)", "fileIndex": 0, "line": 44,
    "metrics": [
      { "value": 34, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 1190, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessageDecoder", "reportPath": "MainScripts_MessageDecoder.html", "methodName": "static System.Void DCL.MessageDecoder::DecodeSceneMessage(System.String, System.String, System.String, DCL.Interface.PB_SendSceneMessage, DCL.QueuedSceneMessage_Scene&)", "methodShortName": "DecodeSceneMessage(...)", "fileIndex": 0, "line": 91,
    "metrics": [
      { "value": 32, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 1056, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Bots.BotsController", "reportPath": "MainScripts_BotsController.html", "methodName": "System.Void DCL.Bots.BotsController::PopulateCatalog(System.Collections.Generic.List[WearableItem])", "methodShortName": "PopulateCatalog(...)", "fileIndex": 0, "line": 76,
    "metrics": [
      { "value": 24, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 600, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.VisualTests", "reportPath": "ABConverter_VisualTests.html", "methodName": "TestConvertedAssets()", "methodShortName": "TestConvertedAssets()", "fileIndex": 0, "line": 27,
    "metrics": [
      { "value": 23, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 552, "exceeded": true },
    ]},
  {
    "assembly": "InputController", "class": "InputController", "reportPath": "InputController_InputController.html", "methodName": "System.Void InputController::Update_Trigger(InputAction_Trigger[])", "methodShortName": "Update_Trigger(...)", "fileIndex": 0, "line": 177,
    "metrics": [
      { "value": 60, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 487.18, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::HandlePostSelection(UnityEngine.Rect, UnityEngine.Event)", "methodShortName": "HandlePostSelection(...)", "fileIndex": 0, "line": 1644,
    "metrics": [
      { "value": 19, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 380, "exceeded": true },
    ]},
  {
    "assembly": "UniGif", "class": "UniGif", "reportPath": "UniGif_UniGif.html", "methodName": "static System.Byte[] UniGif::SortInterlaceGifData(System.Byte[], System.Int32)", "methodShortName": "SortInterlaceGifData(...)", "fileIndex": 2, "line": 516,
    "metrics": [
      { "value": 19, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 380, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.VisualTests", "reportPath": "ABConverter_VisualTests.html", "methodName": "static UnityEngine.GameObject[] DCL.ABConverter.VisualTests::LoadAndInstantiateAllAssetBundles()", "methodShortName": "LoadAndInstantiateAllAssetBundles()", "fileIndex": 0, "line": 214,
    "metrics": [
      { "value": 18, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 342, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "static System.String ReorderableList.Editor.ReorderableList::GetElementName(UnityEditor.SerializedProperty, System.String, System.String)", "methodShortName": "GetElementName(...)", "fileIndex": 0, "line": 1040,
    "metrics": [
      { "value": 17, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 306, "exceeded": true },
    ]},
  {
    "assembly": "WSSController", "class": "DCL.WSSController", "reportPath": "WSSController_WSSController.html", "methodName": "System.Void DCL.WSSController::Start()", "methodShortName": "Start()", "fileIndex": 0, "line": 146,
    "metrics": [
      { "value": 17, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 306, "exceeded": true },
    ]},
  {
    "assembly": "QuestsTrackerHUD", "class": "DCL.Huds.QuestsTracker.QuestsTrackerEntry", "reportPath": "QuestsTrackerHUD_QuestsTrackerEntry.html", "methodName": "Sequence()", "methodShortName": "Sequence()", "fileIndex": 0, "line": 176,
    "metrics": [
      { "value": 17, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 277.11, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Client", "reportPath": "ABConverter_Client.html", "methodName": "static System.Void DCL.ABConverter.Client::ExportSceneToAssetBundles(System.String[])", "methodShortName": "ExportSceneToAssetBundles(...)", "fileIndex": 0, "line": 127,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 272, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DrawElements(UnityEngine.Rect, UnityEngine.Event)", "methodShortName": "DrawElements(...)", "fileIndex": 0, "line": 850,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 272, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessageDecoder", "reportPath": "MainScripts_MessageDecoder.html", "methodName": "static System.Boolean DCL.MessageDecoder::DecodePayloadChunk(System.String, System.String&, System.String&, System.String&, DCL.Interface.PB_SendSceneMessage&)", "methodShortName": "DecodePayloadChunk(...)", "fileIndex": 0, "line": 30,
    "metrics": [
      { "value": 15, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 240, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialController", "reportPath": "Onboarding_TutorialController.html", "methodName": "BlockPlayerCameraUntilBlendingIsFinished()", "methodShortName": "BlockPlayerCameraUntilBlendingIsFinished()", "fileIndex": 0, "line": 645,
    "metrics": [
      { "value": 15, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 240, "exceeded": true },
    ]},
  {
    "assembly": "PluginScripts", "class": "OBJLoader", "reportPath": "PluginScripts_OBJLoader.html", "methodName": "static UnityEngine.Material[] OBJLoader::LoadMTLFile(System.String)", "methodShortName": "LoadMTLFile(...)", "fileIndex": 0, "line": 86,
    "metrics": [
      { "value": 15, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 240, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelController", "reportPath": "BuilderInWorld_VoxelController.html", "methodName": "System.Void VoxelController::FillVoxels(UnityEngine.Vector3Int, UnityEngine.Vector3Int)", "methodShortName": "FillVoxels(...)", "fileIndex": 0, "line": 131,
    "metrics": [
      { "value": 14, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 210, "exceeded": true },
    ]},
  {
    "assembly": "QuestsTrackerHUD", "class": "DCL.Huds.QuestsTracker.QuestsTrackerSection", "reportPath": "QuestsTrackerHUD_QuestsTrackerSection.html", "methodName": "Sequence()", "methodShortName": "Sequence()", "fileIndex": 0, "line": 100,
    "metrics": [
      { "value": 14, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 210, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DrawHeader(UnityEngine.Rect, UnityEngine.GUIContent)", "methodShortName": "DrawHeader(...)", "fileIndex": 0, "line": 613,
    "metrics": [
      { "value": 14, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 210, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DrawFooter(UnityEngine.Rect)", "methodShortName": "DrawFooter(...)", "fileIndex": 0, "line": 1149,
    "metrics": [
      { "value": 14, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 210, "exceeded": true },
    ]},
  {
    "assembly": "NFTPromptHUD", "class": "NFTPromptHUDView", "reportPath": "NFTPromptHUD_NFTPromptHUDView.html", "methodName": "System.Void NFTPromptHUDView.INFTPromptHUDView::SetNFTInfo(DCL.Helpers.NFT.NFTInfoSingleAsset, System.String)", "methodShortName": "SetNFTInfo(...)", "fileIndex": 0, "line": 167,
    "metrics": [
      { "value": 13, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 182, "exceeded": true },
    ]},
  {
    "assembly": "Settings", "class": "DCL.SettingsData.QualitySettings", "reportPath": "Settings_QualitySettings.html", "methodName": "System.Boolean DCL.SettingsData.QualitySettings::Equals(DCL.SettingsData.QualitySettings)", "methodShortName": "Equals(...)", "fileIndex": 0, "line": 93,
    "metrics": [
      { "value": 15, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 159.16, "exceeded": true },
    ]},
  {
    "assembly": "FriendsController", "class": "FriendsController", "reportPath": "FriendsController_FriendsController.html", "methodName": "System.Void FriendsController::InitializeFriends(System.String)", "methodShortName": "InitializeFriends(...)", "fileIndex": 0, "line": 109,
    "metrics": [
      { "value": 12, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "QuestsTrackerHUD", "class": "DCL.Huds.QuestsTracker.QuestsTrackerTask", "reportPath": "QuestsTrackerHUD_QuestsTrackerTask.html", "methodName": "ProgressAndCompleteSequence()", "methodShortName": "ProgressAndCompleteSequence()", "fileIndex": 0, "line": 70,
    "metrics": [
      { "value": 12, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "TheGraphInterfaces", "class": "LandHelper", "reportPath": "TheGraphInterfaces_LandHelper.html", "methodName": "static System.Collections.Generic.List[Land] LandHelper::ConvertQueryResult(LandQueryResult, System.String)", "methodShortName": "ConvertQueryResult(...)", "fileIndex": 0, "line": 8,
    "metrics": [
      { "value": 12, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 156, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessagingBus", "reportPath": "MainScripts_MessagingBus.html", "methodName": "System.Boolean DCL.MessagingBus::ProcessQueue(System.Single, System.Collections.IEnumerator&)", "methodShortName": "ProcessQueue(...)", "fileIndex": 0, "line": 155,
    "metrics": [
      { "value": 24, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 148.42, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Utils", "reportPath": "ABConverter_Utils.html", "methodName": "static System.Boolean DCL.ABConverter.Utils::ParseOptionExplicit(System.String[], System.String, System.Int32, System.String[]&)", "methodShortName": "ParseOptionExplicit(...)", "fileIndex": 0, "line": 147,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "AssetBundlesVisualTestHelpers", "class": "DCL.Helpers.AssetBundlesVisualTestHelpers", "reportPath": "AssetBundlesVisualTestHelpers_AssetBundlesVisualTestHelpers.html", "methodName": "TakeSnapshot()", "methodShortName": "TakeSnapshot()", "fileIndex": 0, "line": 73,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "AvatarAudioHandlerRemote", "reportPath": "AvatarShape_AvatarAudioHandlerRemote.html", "methodName": "System.Void AvatarAudioHandlerRemote::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 57,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "BodyShapeController", "reportPath": "AvatarShape_BodyShapeController.html", "methodName": "System.Void BodyShapeController::PrepareWearable(UnityEngine.GameObject)", "methodShortName": "PrepareWearable(...)", "fileIndex": 0, "line": 122,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::EndBoundMultiSelection()", "methodShortName": "EndBoundMultiSelection()", "fileIndex": 0, "line": 442,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldMode", "reportPath": "BuilderInWorld_BuilderInWorldMode.html", "methodName": "System.Void BuilderInWorldMode::TransformActionEnd(DCL.Models.IDCLEntity, System.String)", "methodShortName": "TransformActionEnd(...)", "fileIndex": 0, "line": 212,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "CharacterControllerTests", "class": "Tests.CharacterControllerTests", "reportPath": "CharacterControllerTests_CharacterControllerTests.html", "methodName": "CharacterSupportsRotatingPlatforms()", "methodShortName": "CharacterSupportsRotatingPlatforms()", "fileIndex": 0, "line": 219,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "DeployedScenesFetcher", "class": "DeployedScene", "reportPath": "DeployedScenesFetcher_DeployedScene.html", "methodName": "static System.String DeployedScene::GetNavmapThumbnailUrl(CatalystSceneEntityPayload, System.String)", "methodShortName": "GetNavmapThumbnailUrl(...)", "fileIndex": 0, "line": 80,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "HUD", "class": "HUDController", "reportPath": "HUD_HUDController.html", "methodName": "System.Void HUDController::ToggleUIVisibility_OnTriggered(DCLAction_Trigger)", "methodShortName": "ToggleUIVisibility_OnTriggered(...)", "fileIndex": 0, "line": 110,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MiscBenchmarkController", "reportPath": "MainScripts_MiscBenchmarkController.html", "methodName": "RefreshProfilingData()", "methodShortName": "RefreshProfilingData()", "fileIndex": 0, "line": 137,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "NFTPromptHUD", "class": "NFTPromptHUDView", "reportPath": "NFTPromptHUD_NFTPromptHUDView.html", "methodName": "FetchNFTImage()", "methodShortName": "FetchNFTImage()", "fileIndex": 0, "line": 267,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep", "reportPath": "Onboarding_TutorialStep.html", "methodName": "System.Void DCL.Tutorial.TutorialStep::OnStepStart()", "methodShortName": "OnStepStart()", "fileIndex": 0, "line": 38,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableDrawer", "reportPath": "ReorderableEditor_ReorderableDrawer.html", "methodName": "static ReorderableList.Editor.ReorderableList ReorderableList.Editor.ReorderableDrawer::GetList(UnityEditor.SerializedProperty, ReorderableList.ReorderableAttribute, System.Int32, System.String)", "methodShortName": "GetList(...)", "fileIndex": 0, "line": 67,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "static System.Int32 ReorderableList.Editor.ReorderableList/ListSort::Compare(UnityEditor.SerializedProperty, UnityEditor.SerializedProperty, System.Boolean, UnityEditor.SerializedPropertyType)", "methodShortName": "Compare(...)", "fileIndex": 0, "line": 2736,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "UnityGLTFEditorAssembly", "class": "UnityEditor.PbrShaderGUI", "reportPath": "UnityGLTFEditorAssembly_PbrShaderGUI.html", "methodName": "System.Void UnityEditor.PbrShaderGUI::DoSpecularMetallicArea()", "methodShortName": "DoSpecularMetallicArea()", "fileIndex": 0, "line": 205,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 132, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Utils", "reportPath": "ABConverter_Utils.html", "methodName": "static System.Void DCL.ABConverter.Utils::FixGltfRootInvalidUriCharacters(GLTF.Schema.GLTFRoot)", "methodShortName": "FixGltfRootInvalidUriCharacters(...)", "fileIndex": 0, "line": 344,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "AssetBundlesVisualTestHelpers", "class": "DCL.Helpers.AssetBundlesVisualTestHelpers", "reportPath": "AssetBundlesVisualTestHelpers_AssetBundlesVisualTestHelpers.html", "methodName": "TakeSnapshot()", "methodShortName": "TakeSnapshot()", "fileIndex": 0, "line": 22,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "AvatarEditorHUD", "class": "AvatarEditorHUDAudioHandler", "reportPath": "AvatarEditorHUD_AvatarEditorHUDAudioHandler.html", "methodName": "System.Void AvatarEditorHUDAudioHandler::PlayVoiceReaction(System.String)", "methodShortName": "PlayVoiceReaction(...)", "fileIndex": 0, "line": 169,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "AvatarAudioHandlerRemote", "reportPath": "AvatarShape_AvatarAudioHandlerRemote.html", "methodName": "System.Boolean AvatarAudioHandlerRemote::AvatarIsInView()", "methodShortName": "AvatarIsInView()", "fileIndex": 0, "line": 93,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "AvatarAudioHandlerRemote", "reportPath": "AvatarShape_AvatarAudioHandlerRemote.html", "methodName": "System.Void AvatarAudioHandlerRemote::SimulateFootsteps()", "methodShortName": "SimulateFootsteps()", "fileIndex": 0, "line": 126,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderObjectSelector", "reportPath": "Builder_DCLBuilderObjectSelector.html", "methodName": "System.Void Builder.DCLBuilderObjectSelector::OnMouseDown(System.Int32, UnityEngine.Vector3)", "methodShortName": "OnMouseDown(...)", "fileIndex": 0, "line": 111,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderObjectSelector", "reportPath": "Builder_DCLBuilderObjectSelector.html", "methodName": "System.Void Builder.DCLBuilderObjectSelector::SelectionParentReset()", "methodShortName": "SelectionParentReset()", "fileIndex": 0, "line": 350,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.Gizmos.DCLBuilderScaleGizmo", "reportPath": "Builder_DCLBuilderScaleGizmo.html", "methodName": "UnityEngine.Vector3 Builder.Gizmos.DCLBuilderScaleGizmo::GetScaleRoundedToSnapFactor(UnityEngine.Vector3, System.Single)", "methodShortName": "GetScaleRoundedToSnapFactor(...)", "fileIndex": 0, "line": 113,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.Gizmos.DCLBuilderTranslateGizmo", "reportPath": "Builder_DCLBuilderTranslateGizmo.html", "methodName": "UnityEngine.Vector3 Builder.Gizmos.DCLBuilderTranslateGizmo::GetPositionRoundedToSnapFactor(UnityEngine.Vector3, System.Single)", "methodShortName": "GetPositionRoundedToSnapFactor(...)", "fileIndex": 0, "line": 25,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::OnInputMouseDrag(System.Int32, UnityEngine.Vector3, System.Single, System.Single)", "methodShortName": "OnInputMouseDrag(...)", "fileIndex": 0, "line": 273,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldInputWrapper", "reportPath": "BuilderInWorld_BuilderInWorldInputWrapper.html", "methodName": "System.Void BuilderInWorldInputWrapper::MouseUp(System.Int32, UnityEngine.Vector3)", "methodShortName": "MouseUp(...)", "fileIndex": 0, "line": 56,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "Catalyst", "class": "Catalyst", "reportPath": "Catalyst_Catalyst.html", "methodName": "DCL.Helpers.Promise[String] Catalyst::GetEntities(System.String, System.String[])", "methodShortName": "GetEntities(...)", "fileIndex": 0, "line": 101,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "CharacterControllerTests", "class": "Tests.CharacterControllerTests", "reportPath": "CharacterControllerTests_CharacterControllerTests.html", "methodName": "CharacterSupportsMovingPlatforms()", "methodShortName": "CharacterSupportsMovingPlatforms()", "fileIndex": 0, "line": 153,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "CrashPayloadUtils", "class": "DCL.Helpers.ScenesDumper", "reportPath": "CrashPayloadUtils_ScenesDumper.html", "methodName": "static System.Void DCL.Helpers.ScenesDumper::Dump(System.Collections.Generic.Dictionary[String,IParcelScene], DCL.AssetLibrary_Texture, System.Collections.Generic.Dictionary[String,RefCountedTextureData], DCL.Interface.CrashPayload)", "methodShortName": "Dump(...)", "fileIndex": 0, "line": 188,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Bots.BotsController", "reportPath": "MainScripts_BotsController.html", "methodName": "System.Collections.Generic.List[String] DCL.Bots.BotsController::GetRandomizedWearablesSet()", "methodShortName": "GetRandomizedWearablesSet()", "fileIndex": 0, "line": 238,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Components.Video.Plugin.WebVideoPlayer", "reportPath": "MainScripts_WebVideoPlayer.html", "methodName": "System.Void DCL.Components.Video.Plugin.WebVideoPlayer::UpdateWebVideoTexture()", "methodShortName": "UpdateWebVideoTexture()", "fileIndex": 0, "line": 84,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessagingController", "reportPath": "MainScripts_MessagingController.html", "methodName": "System.Void DCL.MessagingController::Enqueue(System.Boolean, DCL.QueuedSceneMessage_Scene, DCL.MessagingBusType&)", "methodShortName": "Enqueue(...)", "fileIndex": 0, "line": 98,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.PointerEventsController", "reportPath": "MainScripts_PointerEventsController.html", "methodName": "System.Void DCL.PointerEventsController::ResolveGenericRaycastHandlers(IRaycastPointerHandler)", "methodShortName": "ResolveGenericRaycastHandlers(...)", "fileIndex": 0, "line": 163,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.SceneController", "reportPath": "MainScripts_SceneController.html", "methodName": "System.Boolean DCL.SceneController::ProcessMessage(DCL.QueuedSceneMessage_Scene, UnityEngine.CustomYieldInstruction&)", "methodShortName": "ProcessMessage(...)", "fileIndex": 0, "line": 144,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "FreeMovementController", "reportPath": "MainScripts_FreeMovementController.html", "methodName": "UnityEngine.Vector3 FreeMovementController::FreeMovement()", "methodShortName": "FreeMovement()", "fileIndex": 0, "line": 44,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MaterialTransitionControllerTests", "class": "Tests.MaterialTransitionControllerTests", "reportPath": "MaterialTransitionControllerTests_MaterialTransitionControllerTests.html", "methodName": "MaterialTransitionWithGLTF()", "methodShortName": "MaterialTransitionWithGLTF()", "fileIndex": 0, "line": 19,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DoList(UnityEngine.Rect, UnityEngine.GUIContent)", "methodShortName": "DoList(...)", "fileIndex": 0, "line": 268,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DrawPaginationHeader(UnityEngine.Rect)", "methodShortName": "DrawPaginationHeader(...)", "fileIndex": 0, "line": 1212,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::HandleDragAndDrop(UnityEngine.Rect, UnityEngine.Event)", "methodShortName": "HandleDragAndDrop(...)", "fileIndex": 0, "line": 1473,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "TheGraphInterfaces", "class": "LandHelper", "reportPath": "TheGraphInterfaces_LandHelper.html", "methodName": "static Land LandHelper::FromEstate(EstateFields, LandRole)", "methodShortName": "FromEstate(...)", "fileIndex": 0, "line": 100,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 110, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Helpers.PrimitiveMeshBuilder", "reportPath": "MainScripts_PrimitiveMeshBuilder.html", "methodName": "static UnityEngine.Mesh DCL.Helpers.PrimitiveMeshBuilder::BuildConeOrCylinder(System.Int32, System.Single, System.Single, System.Single, System.Single, System.Boolean, System.Boolean, System.Boolean, UnityEngine.Vector3)", "methodShortName": "BuildConeOrCylinder(...)", "fileIndex": 0, "line": 426,
    "metrics": [
      { "value": 72, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 108.46, "exceeded": true },
    ]},
  {
    "assembly": "InputController", "class": "InputController", "reportPath": "InputController_InputController.html", "methodName": "System.Void InputController::Update_Hold(InputAction_Hold[])", "methodShortName": "Update_Hold(...)", "fileIndex": 0, "line": 362,
    "metrics": [
      { "value": 21, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 101.9, "exceeded": true },
    ]},
  {
    "assembly": "TestHelpers", "class": "TestSceneIntegrityChecker", "reportPath": "TestHelpers_TestSceneIntegrityChecker.html", "methodName": "TestSceneSnapshot()", "methodShortName": "TestSceneSnapshot()", "fileIndex": 0, "line": 49,
    "metrics": [
      { "value": 11, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 100.63, "exceeded": true },
    ]},
  {
    "assembly": "PluginScripts", "class": "OBJLoader", "reportPath": "PluginScripts_OBJLoader.html", "methodName": "static UnityEngine.GameObject OBJLoader::LoadOBJFile(System.String, System.Boolean)", "methodShortName": "LoadOBJFile(...)", "fileIndex": 0, "line": 184,
    "metrics": [
      { "value": 53, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 90.2, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Core", "reportPath": "ABConverter_Core.html", "methodName": "System.Void DCL.ABConverter.Core::GetAssetDependenciesMappingPairs(System.String, System.String, System.String, System.Collections.Generic.List`1[[DCL.ContentServerUtils/MappingPair, ContentServerUtils, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]]&)", "methodShortName": "GetAssetDependenciesMappingPairs(...)", "fileIndex": 0, "line": 240,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "AssetBundlesVisualTestHelpers", "class": "DCL.Helpers.AssetBundlesVisualTestHelpers", "reportPath": "AssetBundlesVisualTestHelpers_AssetBundlesVisualTestHelpers.html", "methodName": "static System.Single DCL.Helpers.AssetBundlesVisualTestHelpers::ComputeImageAffinityPercentage(UnityEngine.Texture2D, UnityEngine.Texture2D, System.String)", "methodShortName": "ComputeImageAffinityPercentage(...)", "fileIndex": 0, "line": 153,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeTests", "class": "AvatarShape_Tests.WearableItemsShould", "reportPath": "AvatarShapeTests_WearableItemsShould.html", "methodName": "SetTheCorrectMaterial()", "methodShortName": "SetTheCorrectMaterial()", "fileIndex": 0, "line": 178,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeTests", "class": "AvatarShape_Tests.WearableItemsShould", "reportPath": "AvatarShapeTests_WearableItemsShould.html", "methodName": "SetTheCorrectMaterialWhenLoadingMultipleTimes()", "methodShortName": "SetTheCorrectMaterialWhenLoadingMultipleTimes()", "fileIndex": 0, "line": 200,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldFirstPersonMode", "reportPath": "BuilderInWorld_BuilderInWorldFirstPersonMode.html", "methodName": "System.Void BuilderInWorldFirstPersonMode::CheckInputSelectedEntities()", "methodShortName": "CheckInputSelectedEntities()", "fileIndex": 0, "line": 201,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 112,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::OnInputMouseDown(System.Int32, UnityEngine.Vector3)", "methodShortName": "OnInputMouseDown(...)", "fileIndex": 0, "line": 354,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelController", "reportPath": "BuilderInWorld_VoxelController.html", "methodName": "System.Void VoxelController::MouseUp(System.Int32, UnityEngine.Vector3)", "methodShortName": "MouseUp(...)", "fileIndex": 0, "line": 216,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "ChatHUD", "class": "ChatEntry", "reportPath": "ChatHUD_ChatEntry.html", "methodName": "System.Void ChatEntry::OnPointerClick(UnityEngine.EventSystems.PointerEventData)", "methodShortName": "OnPointerClick(...)", "fileIndex": 0, "line": 176,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "GIFProcessingBridge", "class": "DCL.GIFProcessingBridge", "reportPath": "GIFProcessingBridge_GIFProcessingBridge.html", "methodName": "RequestGIFProcessor()", "methodShortName": "RequestGIFProcessor()", "fileIndex": 0, "line": 56,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "GLTFImporterVisualTests", "reportPath": "LoadableShapesTests_GLTFImporterVisualTests.html", "methodName": "ProcessTextureOffsetAndScale()", "methodShortName": "ProcessTextureOffsetAndScale()", "fileIndex": 0, "line": 24,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "GLTFImporterVisualTests", "reportPath": "LoadableShapesTests_GLTFImporterVisualTests.html", "methodName": "ProcessTexturesUVs()", "methodShortName": "ProcessTexturesUVs()", "fileIndex": 0, "line": 53,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "MapRenderer", "class": "DCL.MapRenderer", "reportPath": "MapRenderer_MapRenderer.html", "methodName": "System.Void DCL.MapRenderer::UpdateParcelHighlight()", "methodShortName": "UpdateParcelHighlight()", "fileIndex": 0, "line": 217,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "NFTHelper", "class": "DCL.Helpers.NFT.Markets.OpenSea", "reportPath": "NFTHelper_OpenSea.html", "methodName": "DCL.Helpers.NFT.NFTInfo DCL.Helpers.NFT.Markets.OpenSea::ResponseToNFTInfo(DCL.Helpers.NFT.Markets.OpenSea_Internal.AssetResponse)", "methodShortName": "ResponseToNFTInfo(...)", "fileIndex": 0, "line": 77,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialController", "reportPath": "Onboarding_TutorialController.html", "methodName": "System.Void DCL.Tutorial.TutorialController::SetupTutorial(System.String, System.String, DCL.Tutorial.TutorialController/TutorialType, System.Boolean)", "methodShortName": "SetupTutorial(...)", "fileIndex": 0, "line": 212,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_OpenControlsPanel", "reportPath": "Onboarding_TutorialStep_OpenControlsPanel.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_OpenControlsPanel::ControlsHud_OnControlsOpened()", "methodShortName": "ControlsHud_OnControlsOpened()", "fileIndex": 0, "line": 55,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "OpenSea_Internal", "class": "DCL.Helpers.NFT.Markets.OpenSea_Internal.BatchAssetsRequestHandler", "reportPath": "OpenSea_Internal_BatchAssetsRequestHandler.html", "methodName": "System.Void DCL.Helpers.NFT.Markets.OpenSea_Internal.BatchAssetsRequestHandler.DCL.Helpers.NFT.Markets.OpenSea_Internal.IRequestHandler::SetApiResponse(System.String, System.Action, System.Action[String])", "methodShortName": "SetApiResponse(...)", "fileIndex": 0, "line": 111,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "PluginScripts", "class": "TextureLoader", "reportPath": "PluginScripts_TextureLoader.html", "methodName": "static UnityEngine.Texture2D TextureLoader::LoadTexture(System.String, System.Boolean)", "methodShortName": "LoadTexture(...)", "fileIndex": 0, "line": 83,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "TheGraphInterfaces", "class": "LandHelper", "reportPath": "TheGraphInterfaces_LandHelper.html", "methodName": "static Land LandHelper::FromParcel(ParcelFields, LandRole)", "methodShortName": "FromParcel(...)", "fileIndex": 0, "line": 71,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 90, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessagingBus", "reportPath": "MainScripts_MessagingBus.html", "methodName": "System.Void DCL.MessagingBus::Enqueue(DCL.QueuedSceneMessage, DCL.QueueMode)", "methodShortName": "Enqueue(...)", "fileIndex": 0, "line": 76,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 86.3, "exceeded": true },
    ]},
  {
    "assembly": "BuilderEntity", "class": "DCLBuilderInWorldEntity", "reportPath": "BuilderEntity_DCLBuilderInWorldEntity.html", "methodName": "System.Void DCLBuilderInWorldEntity::SetEditMaterial()", "methodShortName": "SetEditMaterial()", "fileIndex": 0, "line": 537,
    "metrics": [
      { "value": 10, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 84.07, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "NFTShapeLoaderController", "reportPath": "MainScripts_NFTShapeLoaderController.html", "methodName": "FetchNFTImage()", "methodShortName": "FetchNFTImage()", "fileIndex": 0, "line": 148,
    "metrics": [
      { "value": 13, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 80.6, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Core", "reportPath": "ABConverter_Core.html", "methodName": "DCL.ABConverter.AssetPath DCL.ABConverter.Core::DumpGltf(DCL.ABConverter.AssetPath, System.Collections.Generic.List[AssetPath], System.Collections.Generic.List[AssetPath])", "methodShortName": "DumpGltf(...)", "fileIndex": 0, "line": 392,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeTests", "class": "AvatarShape_Tests.WearableItemsShould", "reportPath": "AvatarShapeTests_WearableItemsShould.html", "methodName": "BeUnequipedProperlyMultipleTimes()", "methodShortName": "BeUnequipedProperlyMultipleTimes()", "fileIndex": 0, "line": 156,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderBridge", "reportPath": "Builder_DCLBuilderBridge.html", "methodName": "System.Void Builder.DCLBuilderBridge::SetBuilderCameraRotation(System.String)", "methodShortName": "SetBuilderCameraRotation(...)", "fileIndex": 0, "line": 219,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderBridge", "reportPath": "Builder_DCLBuilderBridge.html", "methodName": "System.Void Builder.DCLBuilderBridge::SetPlayMode(System.Boolean)", "methodShortName": "SetPlayMode(...)", "fileIndex": 0, "line": 531,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderObjectSelector", "reportPath": "Builder_DCLBuilderObjectSelector.html", "methodName": "System.Void Builder.DCLBuilderObjectSelector::OnMouseUp(System.Int32, UnityEngine.Vector3)", "methodShortName": "OnMouseUp(...)", "fileIndex": 0, "line": 158,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Void BuilderInWorldController::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 143,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "DCL.Camera.FreeCameraMovement", "reportPath": "BuilderInWorld_FreeCameraMovement.html", "methodName": "System.Void DCL.Camera.FreeCameraMovement::FocusOnEntities(System.Collections.Generic.List[DCLBuilderInWorldEntity])", "methodShortName": "FocusOnEntities(...)", "fileIndex": 0, "line": 402,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelController", "reportPath": "BuilderInWorld_VoxelController.html", "methodName": "System.Void VoxelController::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 49,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelController", "reportPath": "BuilderInWorld_VoxelController.html", "methodName": "System.Void VoxelController::SetEditObjectLikeVoxel()", "methodShortName": "SetEditObjectLikeVoxel()", "fileIndex": 0, "line": 80,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorldTeleportAndEdit", "class": "BuilderInWorldTeleportAndEdit", "reportPath": "BuilderInWorldTeleportAndEdit_BuilderInWorldTeleportAndEdit.html", "methodName": "TeleportAndEditRoutine()", "methodShortName": "TeleportAndEditRoutine()", "fileIndex": 0, "line": 25,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "BuilderProjectsPanel", "class": "SectionFactory", "reportPath": "BuilderProjectsPanel_SectionFactory.html", "methodName": "SectionBase SectionFactory.ISectionFactory::GetSectionController(SectionId)", "methodShortName": "GetSectionController(...)", "fileIndex": 0, "line": 12,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "DeployedScenesFetcher", "class": "DeployedScene", "reportPath": "DeployedScenesFetcher_DeployedScene.html", "methodName": "DeployedScene::DeployedScene(CatalystSceneEntityPayload, System.String)", "methodShortName": "DeployedScene(...)", "fileIndex": 0, "line": 35,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "MainEditor", "class": "ExpandableAttributeDrawer", "reportPath": "MainEditor_ExpandableAttributeDrawer.html", "methodName": "System.Void ExpandableAttributeDrawer::OnGUI(UnityEngine.Rect, UnityEditor.SerializedProperty, UnityEngine.GUIContent)", "methodShortName": "OnGUI(...)", "fileIndex": 0, "line": 99,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessageBenchmarkController", "reportPath": "MainScripts_MessageBenchmarkController.html", "methodName": "System.Void DCL.MessageBenchmarkController::ResetTracker()", "methodShortName": "ResetTracker()", "fileIndex": 0, "line": 392,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "SimpleHTTPServer", "reportPath": "MainScripts_SimpleHTTPServer.html", "methodName": "System.Void SimpleHTTPServer::Process(System.Net.HttpListenerContext)", "methodShortName": "Process(...)", "fileIndex": 0, "line": 164,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "PhysicsCastTest", "class": "PhysicsCast_Tests", "reportPath": "PhysicsCastTest_PhysicsCast_Tests.html", "methodName": "HitAll()", "methodShortName": "HitAll()", "fileIndex": 0, "line": 128,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::DrawElement(UnityEditor.SerializedProperty, UnityEngine.Rect, System.Boolean, System.Boolean)", "methodShortName": "DrawElement(...)", "fileIndex": 0, "line": 950,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "static System.String ReorderableList.Editor.ReorderableList::GetLayerMaskName(System.Int32)", "methodShortName": "GetLayerMaskName(...)", "fileIndex": 0, "line": 1112,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "UIScreenSpaceTests", "class": "Tests.UIScreenSpaceTests", "reportPath": "UIScreenSpaceTests_UIScreenSpaceTests.html", "methodName": "TestVisibilityUpdate()", "methodShortName": "TestVisibilityUpdate()", "fileIndex": 0, "line": 18,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "WearablesFetching", "class": "DCL.Helpers.WearablesFetchingHelper", "reportPath": "WearablesFetching_WearablesFetchingHelper.html", "methodName": "EnsureCollectionsData()", "methodShortName": "EnsureCollectionsData()", "fileIndex": 0, "line": 19,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "WearablesFetching", "class": "DCL.Helpers.WearablesFetchingHelper", "reportPath": "WearablesFetching_WearablesFetchingHelper.html", "methodName": "GetRandomCollections()", "methodShortName": "GetRandomCollections()", "fileIndex": 0, "line": 44,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "WSSTests", "class": "Tests.WSSTests", "reportPath": "WSSTests_WSSTests.html", "methodName": "BasicConnectionTest()", "methodShortName": "BasicConnectionTest()", "fileIndex": 0, "line": 30,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 72, "exceeded": true },
    ]},
  {
    "assembly": "UniGif", "class": "UniGif", "reportPath": "UniGif_UniGif.html", "methodName": "static System.Void UniGif::SetTexturePixelRow(UnityEngine.Texture2D, System.Int32, UniGif/ImageBlock, System.Byte[], System.Int32&, System.Collections.Generic.List[Byte[]], UnityEngine.Color32, System.Int32, System.Boolean)", "methodShortName": "SetTexturePixelRow(...)", "fileIndex": 2, "line": 246,
    "metrics": [
      { "value": 19, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 68.37, "exceeded": true },
    ]},
  {
    "assembly": "TaskbarHUD", "class": "TaskbarMoreMenu", "reportPath": "TaskbarHUD_TaskbarMoreMenu.html", "methodName": "PlayMoreMenuAnimations()", "methodShortName": "PlayMoreMenuAnimations()", "fileIndex": 0, "line": 147,
    "metrics": [
      { "value": 13, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 67.13, "exceeded": true },
    ]},
  {
    "assembly": "HUD", "class": "HUDController", "reportPath": "HUD_HUDController.html", "methodName": "System.Void HUDController::ConfigureHUDElement(HUDElementID, HUDConfiguration, System.String)", "methodShortName": "ConfigureHUDElement(...)", "fileIndex": 0, "line": 152,
    "metrics": [
      { "value": 55, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 57.88, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BIWCreatorController", "reportPath": "BuilderInWorld_BIWCreatorController.html", "methodName": "System.Boolean BIWCreatorController::IsInsideTheLimits(CatalogItem)", "methodShortName": "IsInsideTheLimits(...)", "fileIndex": 0, "line": 112,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56.71, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BIWLoadingPlaceHolder", "reportPath": "BuilderInWorld_BIWLoadingPlaceHolder.html", "methodName": "CheckIfAnimationHasFinish()", "methodShortName": "CheckIfAnimationHasFinish()", "fileIndex": 0, "line": 38,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56.09, "exceeded": true },
    ]},
  {
    "assembly": "Camera", "class": "DCL.Camera.CameraFreefall", "reportPath": "Camera_CameraFreefall.html", "methodName": "System.Void DCL.Camera.CameraFreefall::Update(System.Boolean, UnityEngine.RaycastHit)", "methodShortName": "Update(...)", "fileIndex": 0, "line": 36,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56.09, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.DependencyMapBuilder", "reportPath": "ABConverter_DependencyMapBuilder.html", "methodName": "static System.Void DCL.ABConverter.DependencyMapBuilder::Generate(DCL.IFile, System.String, System.Collections.Generic.Dictionary[String,String], UnityEngine.AssetBundleManifest, System.String)", "methodShortName": "Generate(...)", "fileIndex": 0, "line": 26,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.UnityEditorWrappers", "reportPath": "ABConverter_UnityEditorWrappers.html", "methodName": "GetAsyncCoroutine()", "methodShortName": "GetAsyncCoroutine()", "fileIndex": 2, "line": 23,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "AssetPromiseKeeper", "class": "APK_GLTF_InteractiveTest", "reportPath": "AssetPromiseKeeper_APK_GLTF_InteractiveTest.html", "methodName": "System.Void APK_GLTF_InteractiveTest::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 37,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarRenderer", "reportPath": "AvatarShape_AvatarRenderer.html", "methodName": "System.Void DCL.AvatarRenderer::OnWearableLoadingFail(WearableController, System.Int32)", "methodShortName": "OnWearableLoadingFail(...)", "fileIndex": 0, "line": 401,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarRenderer", "reportPath": "AvatarShape_AvatarRenderer.html", "methodName": "System.Void DCL.AvatarRenderer::AddWearableController(WearableItem)", "methodShortName": "AddWearableController(...)", "fileIndex": 0, "line": 436,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarRenderer", "reportPath": "AvatarShape_AvatarRenderer.html", "methodName": "System.Void DCL.AvatarRenderer::UpdateWearableController(WearableItem)", "methodShortName": "UpdateWearableController(...)", "fileIndex": 0, "line": 461,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeTests", "class": "AvatarShape_Tests.WearableItemsShould", "reportPath": "AvatarShapeTests_WearableItemsShould.html", "methodName": "BeRetrievedWithoutPoolableObject()", "methodShortName": "BeRetrievedWithoutPoolableObject()", "fileIndex": 0, "line": 228,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderBridge", "reportPath": "Builder_DCLBuilderBridge.html", "methodName": "System.Void Builder.DCLBuilderBridge::SetBuilderCameraPosition(System.String)", "methodShortName": "SetBuilderCameraPosition(...)", "fileIndex": 0, "line": 193,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderObjectSelector", "reportPath": "Builder_DCLBuilderObjectSelector.html", "methodName": "UnityEngine.RaycastHit Builder.DCLBuilderObjectSelector::CompareSelectionHit(UnityEngine.RaycastHit[])", "methodShortName": "CompareSelectionHit(...)", "fileIndex": 0, "line": 414,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BIWInputHandler", "reportPath": "BuilderInWorld_BIWInputHandler.html", "methodName": "System.Void BIWInputHandler::MouseClick(System.Int32, UnityEngine.Vector3)", "methodShortName": "MouseClick(...)", "fileIndex": 0, "line": 147,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BIWOutlinerController", "reportPath": "BuilderInWorld_BIWOutlinerController.html", "methodName": "System.Void BIWOutlinerController::CheckOutline()", "methodShortName": "CheckOutline()", "fileIndex": 0, "line": 40,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "VoxelEntityHit BuilderInWorldController::GetCloserUnselectedVoxelEntityOnPointer()", "methodShortName": "GetCloserUnselectedVoxelEntityOnPointer()", "fileIndex": 0, "line": 370,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Void BuilderInWorldController::TryStartEnterEditMode(System.Boolean, DCL.Controllers.IParcelScene, System.String)", "methodShortName": "TryStartEnterEditMode(...)", "fileIndex": 0, "line": 472,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldEntityHandler", "reportPath": "BuilderInWorld_BuilderInWorldEntityHandler.html", "methodName": "System.Void BuilderInWorldEntityHandler::EntityClicked(DCLBuilderInWorldEntity)", "methodShortName": "EntityClicked(...)", "fileIndex": 0, "line": 323,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::GizmosMode(System.String)", "methodShortName": "GizmosMode(...)", "fileIndex": 0, "line": 724,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelEntityHit", "reportPath": "BuilderInWorld_VoxelEntityHit.html", "methodName": "System.Void VoxelEntityHit::CalculateHitVector(UnityEngine.RaycastHit)", "methodShortName": "CalculateHitVector(...)", "fileIndex": 0, "line": 20,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuilderProjectsPanel", "class": "SceneData", "reportPath": "BuilderProjectsPanel_SceneData.html", "methodName": "SceneData::SceneData(DeployedScene)", "methodShortName": "SceneData(...)", "fileIndex": 0, "line": 90,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "BuildModeHUD", "class": "SaveHUDView", "reportPath": "BuildModeHUD_SaveHUDView.html", "methodName": "SceneStateSaveAnimation()", "methodShortName": "SceneStateSaveAnimation()", "fileIndex": 0, "line": 57,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "FriendsHUD", "class": "FriendsTabView", "reportPath": "FriendsHUD_FriendsTabView.html", "methodName": "System.Void FriendsTabView::ChatController_OnAddMessage(DCL.Interface.ChatMessage)", "methodShortName": "ChatController_OnAddMessage(...)", "fileIndex": 0, "line": 115,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Bots.BotsController", "reportPath": "MainScripts_BotsController.html", "methodName": "InstantiateBotsAtWorldPos()", "methodShortName": "InstantiateBotsAtWorldPos()", "fileIndex": 0, "line": 119,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.PhysicsCast", "reportPath": "MainScripts_PhysicsCast.html", "methodName": "System.Void DCL.PhysicsCast::HitAll(DCL.Models.RaycastQuery)", "methodShortName": "HitAll(...)", "fileIndex": 0, "line": 76,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.SceneController", "reportPath": "MainScripts_SceneController.html", "methodName": "DeferredDecoding()", "methodShortName": "DeferredDecoding()", "fileIndex": 0, "line": 385,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.UserBenchmarkController", "reportPath": "MainScripts_UserBenchmarkController.html", "methodName": "RefreshProfilingData()", "methodShortName": "RefreshProfilingData()", "fileIndex": 0, "line": 146,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "NFTShapeLoaderController", "reportPath": "MainScripts_NFTShapeLoaderController.html", "methodName": "System.Void NFTShapeLoaderController::SetFrameImage(DCL.ITexture, System.Boolean)", "methodShortName": "SetFrameImage(...)", "fileIndex": 0, "line": 234,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "SceneBoundsFeedbackStyle_BIW", "reportPath": "MainScripts_SceneBoundsFeedbackStyle_BIW.html", "methodName": "System.Void SceneBoundsFeedbackStyle_BIW::RemoveInvalidMeshEffect(DCL.Models.MeshesInfo)", "methodShortName": "RemoveInvalidMeshEffect(...)", "fileIndex": 0, "line": 77,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MaterialsTests", "class": "PBRMaterialVisualTests", "reportPath": "MaterialsTests_PBRMaterialVisualTests.html", "methodName": "AlphaTextureShouldWork()", "methodShortName": "AlphaTextureShouldWork()", "fileIndex": 0, "line": 24,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep", "reportPath": "Onboarding_TutorialStep.html", "methodName": "OnStepPlayHideAnimation()", "methodShortName": "OnStepPlayHideAnimation()", "fileIndex": 0, "line": 82,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_GenesisGreetings", "reportPath": "Onboarding_TutorialStep_GenesisGreetings.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_GenesisGreetings::OnStepStart()", "methodShortName": "OnStepStart()", "fileIndex": 0, "line": 27,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_GenesisGreetingsAfterDeepLink", "reportPath": "Onboarding_TutorialStep_GenesisGreetingsAfterDeepLink.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_GenesisGreetingsAfterDeepLink::OnStepFinished()", "methodShortName": "OnStepFinished()", "fileIndex": 0, "line": 16,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_LockTheCursor", "reportPath": "Onboarding_TutorialStep_LockTheCursor.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_LockTheCursor::OnStepStart()", "methodShortName": "OnStepStart()", "fileIndex": 0, "line": 13,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Int32 ReorderableList.Editor.ReorderableList::GetSelectionIndex(UnityEngine.Vector2)", "methodShortName": "GetSelectionIndex(...)", "fileIndex": 0, "line": 1929,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "UnityEngine.Rect ReorderableList.Editor.ReorderableList/SlideGroup::GetRect(System.Int32, UnityEngine.Rect, System.Single)", "methodShortName": "GetRect(...)", "fileIndex": 0, "line": 2271,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList/ListSelection::AppendWithAction(System.Int32, UnityEngine.Event)", "methodShortName": "AppendWithAction(...)", "fileIndex": 0, "line": 2466,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "TaskbarHUD", "class": "TaskbarHUDController", "reportPath": "TaskbarHUD_TaskbarHUDController.html", "methodName": "System.Void TaskbarHUDController::OnFriendsToggleInputPress()", "methodShortName": "OnFriendsToggleInputPress()", "fileIndex": 0, "line": 532,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "TeleportPromptHUD", "class": "TeleportPromptHUDController", "reportPath": "TeleportPromptHUD_TeleportPromptHUDController.html", "methodName": "System.Void TeleportPromptHUDController::SetSceneEvent()", "methodShortName": "SetSceneEvent()", "fileIndex": 0, "line": 81,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "TeleportPromptHUD", "class": "TeleportPromptHUDController", "reportPath": "TeleportPromptHUD_TeleportPromptHUDController.html", "methodName": "System.Void TeleportPromptHUDController::OnTeleportPressed()", "methodShortName": "OnTeleportPressed()", "fileIndex": 0, "line": 106,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "UIScrollRectTests", "class": "Tests.UIScrollRectTests", "reportPath": "UIScrollRectTests_UIScrollRectTests.html", "methodName": "TestNormalizedSize()", "methodShortName": "TestNormalizedSize()", "fileIndex": 0, "line": 158,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "UnityGLTFEditorAssembly", "class": "UnityEditor.PbrShaderGUI", "reportPath": "UnityGLTFEditorAssembly_PbrShaderGUI.html", "methodName": "System.Void UnityEditor.PbrShaderGUI::ShaderPropertiesGUI(UnityEngine.Material)", "methodShortName": "ShaderPropertiesGUI(...)", "fileIndex": 0, "line": 121,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "UnityGLTFEditorAssembly", "class": "UnityGLTF.GLTFImporter", "reportPath": "UnityGLTFEditorAssembly_GLTFImporter.html", "methodName": "UnityEngine.GameObject UnityGLTF.GLTFImporter::CreateGLTFScene(System.String)", "methodShortName": "CreateGLTFScene(...)", "fileIndex": 0, "line": 497,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 56, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Components.DCLVideoTexture", "reportPath": "MainScripts_DCLVideoTexture.html", "methodName": "ApplyChanges()", "methodShortName": "ApplyChanges()", "fileIndex": 0, "line": 52,
    "metrics": [
      { "value": 24, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 53.77, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarShape", "reportPath": "AvatarShape_AvatarShape.html", "methodName": "ApplyChanges()", "methodShortName": "ApplyChanges()", "fileIndex": 0, "line": 60,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 51.49, "exceeded": true },
    ]},
  {
    "assembly": "UniGif", "class": "UniGif", "reportPath": "UniGif_UniGif.html", "methodName": "static System.Boolean UniGif::SetGifHeader(System.Byte[], System.Int32&, UniGif/GifData&)", "methodShortName": "SetGifHeader(...)", "fileIndex": 3, "line": 60,
    "metrics": [
      { "value": 21, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 44.78, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.DCLTexture", "reportPath": "MainScripts_DCLTexture.html", "methodName": "ApplyChanges()", "methodShortName": "ApplyChanges()", "fileIndex": 0, "line": 73,
    "metrics": [
      { "value": 19, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 43.94, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "LoadingFeedbackController", "reportPath": "MainScripts_LoadingFeedbackController.html", "methodName": "System.Void LoadingFeedbackController::RefreshFeedbackMessage()", "methodShortName": "RefreshFeedbackMessage()", "fileIndex": 0, "line": 98,
    "metrics": [
      { "value": 7, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 43.82, "exceeded": true },
    ]},
  {
    "assembly": "QuestsController", "class": "DCL.QuestsController.QuestsController", "reportPath": "QuestsController_QuestsController.html", "methodName": "System.Void DCL.QuestsController.QuestsController::UpdateQuestProgress(QuestModel)", "methodShortName": "UpdateQuestProgress(...)", "fileIndex": 0, "line": 82,
    "metrics": [
      { "value": 38, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 42.45, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Client", "reportPath": "ABConverter_Client.html", "methodName": "static DCL.ABConverter.Core/State DCL.ABConverter.Client::ConvertAssetToAssetBundle(System.String, System.String, System.String, DCL.ABConverter.Client/Settings)", "methodShortName": "ConvertAssetToAssetBundle(...)", "fileIndex": 0, "line": 240,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ABConverter", "class": "DCL.ABConverter.Core", "reportPath": "ABConverter_Core.html", "methodName": "System.Collections.Generic.List[AssetPath] DCL.ABConverter.Core::DumpRawAssets(System.Collections.Generic.List[AssetPath])", "methodShortName": "DumpRawAssets(...)", "fileIndex": 0, "line": 447,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AssetBundlesVisualTestHelpers", "class": "DCL.Helpers.AssetBundlesVisualTestHelpers", "reportPath": "AssetBundlesVisualTestHelpers_AssetBundlesVisualTestHelpers.html", "methodName": "static System.Boolean DCL.Helpers.AssetBundlesVisualTestHelpers::IsSamePixel(UnityEngine.Color32, UnityEngine.Color32, System.Single)", "methodShortName": "IsSamePixel(...)", "fileIndex": 0, "line": 241,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarEditorHUD", "class": "AvatarEditorHUDAudioHandler", "reportPath": "AvatarEditorHUD_AvatarEditorHUDAudioHandler.html", "methodName": "System.Void AvatarEditorHUDAudioHandler::OnAvatarAppear(AvatarModel)", "methodShortName": "OnAvatarAppear(...)", "fileIndex": 0, "line": 115,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarEditorHUD", "class": "NFTItemInfo", "reportPath": "AvatarEditorHUD_NFTItemInfo.html", "methodName": "System.Boolean NFTItemInfo/Model::Equals(NFTItemInfo/Model)", "methodShortName": "Equals(...)", "fileIndex": 0, "line": 31,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "AvatarUtils", "reportPath": "AvatarShape_AvatarUtils.html", "methodName": "static System.Void AvatarUtils::MapSharedMaterialsRecursively(UnityEngine.Transform, System.Func[Material,Material], System.String)", "methodShortName": "MapSharedMaterialsRecursively(...)", "fileIndex": 0, "line": 25,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "DCL.AvatarRenderer", "reportPath": "AvatarShape_AvatarRenderer.html", "methodName": "System.Void DCL.AvatarRenderer::OnBodyShapeLoadingFail(WearableController)", "methodShortName": "OnBodyShapeLoadingFail(...)", "fileIndex": 0, "line": 394,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "WearableController", "reportPath": "AvatarShape_WearableController.html", "methodName": "System.Boolean WearableController::IsLoadedForBodyShape(System.String)", "methodShortName": "IsLoadedForBodyShape(...)", "fileIndex": 0, "line": 200,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeTests", "class": "AvatarShape_Tests.WearableItemsShould", "reportPath": "AvatarShapeTests_WearableItemsShould.html", "methodName": "HideBodyShapeProperly()", "methodShortName": "HideBodyShapeProperly()", "fileIndex": 0, "line": 246,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShapeVisualTests", "class": "Tests.AvatarShapeVisualTests", "reportPath": "AvatarShapeVisualTests_AvatarShapeVisualTests.html", "methodName": "AvatarShapeVisualTest1()", "methodShortName": "AvatarShapeVisualTest1()", "fileIndex": 0, "line": 26,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderBridge", "reportPath": "Builder_DCLBuilderBridge.html", "methodName": "System.Void Builder.DCLBuilderBridge::PreloadFile(System.String)", "methodShortName": "PreloadFile(...)", "fileIndex": 0, "line": 87,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.DCLBuilderWebInterface", "reportPath": "Builder_DCLBuilderWebInterface.html", "methodName": "System.Void Builder.DCLBuilderWebInterface::SendEntitySelected(EditableEntity, System.String, System.String)", "methodShortName": "SendEntitySelected(...)", "fileIndex": 0, "line": 112,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Builder", "class": "Builder.Gizmos.DCLBuilderScaleGizmo", "reportPath": "Builder_DCLBuilderScaleGizmo.html", "methodName": "System.Single Builder.Gizmos.DCLBuilderScaleGizmo::TransformEntity(UnityEngine.Transform, Builder.Gizmos.DCLBuilderGizmoAxis, System.Single)", "methodShortName": "TransformEntity(...)", "fileIndex": 0, "line": 28,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "ActionAdapter", "reportPath": "BuilderInWorld_ActionAdapter.html", "methodName": "System.Void ActionAdapter::SetContent(BuildInWorldCompleteAction)", "methodShortName": "SetContent(...)", "fileIndex": 0, "line": 23,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BIWPublishController", "reportPath": "BuilderInWorld_BIWPublishController.html", "methodName": "System.Void BIWPublishController::CheckPublishConditions()", "methodShortName": "CheckPublishConditions()", "fileIndex": 0, "line": 72,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Void BuilderInWorldController::ChangeEditModeStatusByShortcut()", "methodShortName": "ChangeEditModeStatusByShortcut()", "fileIndex": 0, "line": 338,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Boolean BuilderInWorldController::IsParcelSceneDeployedFromSDK(DCL.Controllers.ParcelScene)", "methodShortName": "IsParcelSceneDeployedFromSDK(...)", "fileIndex": 0, "line": 444,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Void BuilderInWorldController::EnterEditMode()", "methodShortName": "EnterEditMode()", "fileIndex": 0, "line": 533,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldController", "reportPath": "BuilderInWorld_BuilderInWorldController.html", "methodName": "System.Void BuilderInWorldController::ExitEditMode()", "methodShortName": "ExitEditMode()", "fileIndex": 0, "line": 642,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldEntityHandler", "reportPath": "BuilderInWorld_BuilderInWorldEntityHandler.html", "methodName": "System.Void BuilderInWorldEntityHandler::ReportTransform(System.Boolean)", "methodShortName": "ReportTransform(...)", "fileIndex": 0, "line": 153,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldEntityHandler", "reportPath": "BuilderInWorld_BuilderInWorldEntityHandler.html", "methodName": "System.Void BuilderInWorldEntityHandler::DestroyLastCreatedEntities()", "methodShortName": "DestroyLastCreatedEntities()", "fileIndex": 0, "line": 609,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldFirstPersonMode", "reportPath": "BuilderInWorld_BuilderInWorldFirstPersonMode.html", "methodName": "System.Void BuilderInWorldFirstPersonMode::LateUpdate()", "methodShortName": "LateUpdate()", "fileIndex": 0, "line": 52,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::SelectedEntity(DCLBuilderInWorldEntity)", "methodShortName": "SelectedEntity(...)", "fileIndex": 0, "line": 599,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "BuilderInWorldGodMode", "reportPath": "BuilderInWorld_BuilderInWorldGodMode.html", "methodName": "System.Void BuilderInWorldGodMode::OnGizmosTransformEnd(System.String)", "methodShortName": "OnGizmosTransformEnd(...)", "fileIndex": 0, "line": 752,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "DCL.Camera.FreeCameraMovement", "reportPath": "BuilderInWorld_FreeCameraMovement.html", "methodName": "UnityEngine.Vector3 DCL.Camera.FreeCameraMovement::FindMidPoint(System.Collections.Generic.List[DCLBuilderInWorldEntity])", "methodShortName": "FindMidPoint(...)", "fileIndex": 0, "line": 439,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "VoxelController", "reportPath": "BuilderInWorld_VoxelController.html", "methodName": "System.Boolean VoxelController::IsVoxelAtValidPoint(VoxelPrefab, System.Collections.Generic.List[DCLBuilderInWorldEntity])", "methodShortName": "IsVoxelAtValidPoint(...)", "fileIndex": 0, "line": 302,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorldCatalog", "class": "CatalogAssetPackAdapter", "reportPath": "BuilderInWorldCatalog_CatalogAssetPackAdapter.html", "methodName": "System.Void CatalogAssetPackAdapter::GetThumbnail()", "methodShortName": "GetThumbnail()", "fileIndex": 0, "line": 39,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorldCatalog", "class": "CatalogAssetPackListView", "reportPath": "BuilderInWorldCatalog_CatalogAssetPackListView.html", "methodName": "System.Void CatalogAssetPackListView::AddAdapters()", "methodShortName": "AddAdapters()", "fileIndex": 0, "line": 19,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorldCatalog", "class": "CatalogGroupListView", "reportPath": "BuilderInWorldCatalog_CatalogGroupListView.html", "methodName": "System.Void CatalogGroupListView::RemoveAdapters()", "methodShortName": "RemoveAdapters()", "fileIndex": 0, "line": 45,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorldCommon", "class": "ListView[T]", "reportPath": "BuilderInWorldCommon_ListView_T_.html", "methodName": "System.Void ListView[T]::RemoveAdapters()", "methodShortName": "RemoveAdapters()", "fileIndex": 0, "line": 39,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuilderProjectsPanel", "class": "SectionSceneGeneralSettingsController", "reportPath": "BuilderProjectsPanel_SectionSceneGeneralSettingsController.html", "methodName": "System.Void SectionSceneGeneralSettingsController::OnApplyChanges()", "methodShortName": "OnApplyChanges()", "fileIndex": 0, "line": 63,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "BuildModeHUD", "class": "BIWSearchBarController", "reportPath": "BuildModeHUD_BIWSearchBarController.html", "methodName": "System.Void BIWSearchBarController::OnSearchInputChanged(System.String)", "methodShortName": "OnSearchInputChanged(...)", "fileIndex": 0, "line": 55,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "CharacterControllerTests", "class": "Tests.CharacterControllerTests", "reportPath": "CharacterControllerTests_CharacterControllerTests.html", "methodName": "CharacterIsReleasedOnEntityRemoval()", "methodShortName": "CharacterIsReleasedOnEntityRemoval()", "fileIndex": 0, "line": 287,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "CharacterControllerTests", "class": "Tests.CharacterControllerTests", "reportPath": "CharacterControllerTests_CharacterControllerTests.html", "methodName": "CharacterIsReleasedOnPlatformCollisionToggle()", "methodShortName": "CharacterIsReleasedOnPlatformCollisionToggle()", "fileIndex": 0, "line": 304,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "GLTFShape_Tests", "reportPath": "LoadableShapesTests_GLTFShape_Tests.html", "methodName": "CollisionProperty()", "methodShortName": "CollisionProperty()", "fileIndex": 0, "line": 190,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "GLTFShape_Tests", "reportPath": "LoadableShapesTests_GLTFShape_Tests.html", "methodName": "VisibleProperty()", "methodShortName": "VisibleProperty()", "fileIndex": 0, "line": 215,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "NFTShape_Tests", "reportPath": "LoadableShapesTests_NFTShape_Tests.html", "methodName": "CollisionProperty()", "methodShortName": "CollisionProperty()", "fileIndex": 0, "line": 68,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "LoadableShapesTests", "class": "NFTShape_Tests", "reportPath": "LoadableShapesTests_NFTShape_Tests.html", "methodName": "VisibleProperty()", "methodShortName": "VisibleProperty()", "fileIndex": 0, "line": 93,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MainEditor", "class": "ExpandableAttributeDrawer", "reportPath": "MainEditor_ExpandableAttributeDrawer.html", "methodName": "System.Single ExpandableAttributeDrawer::GetPropertyHeight(UnityEditor.SerializedProperty, UnityEngine.GUIContent)", "methodShortName": "GetPropertyHeight(...)", "fileIndex": 0, "line": 62,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Controllers.ParcelScene", "reportPath": "MainScripts_ParcelScene.html", "methodName": "System.Void DCL.Controllers.ParcelScene::GetWaitingComponentsDebugInfo()", "methodShortName": "GetWaitingComponentsDebugInfo()", "fileIndex": 0, "line": 753,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MapRenderer", "class": "DCL.MapRenderer", "reportPath": "MapRenderer_MapRenderer.html", "methodName": "System.Void DCL.MapRenderer::UpdateParcelHold()", "methodShortName": "UpdateParcelHold()", "fileIndex": 0, "line": 244,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MaterialsTests", "class": "BasicMaterialVisualTests", "reportPath": "MaterialsTests_BasicMaterialVisualTests.html", "methodName": "CastShadowFalseShouldWork()", "methodShortName": "CastShadowFalseShouldWork()", "fileIndex": 0, "line": 23,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MaterialsTests", "class": "BasicMaterialVisualTests", "reportPath": "MaterialsTests_BasicMaterialVisualTests.html", "methodName": "CastShadowTrueShouldWork()", "methodShortName": "CastShadowTrueShouldWork()", "fileIndex": 0, "line": 52,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "MordiAudio", "class": "AudioEvent", "reportPath": "MordiAudio_AudioEvent.html", "methodName": "FadeOut()", "methodShortName": "FadeOut()", "fileIndex": 0, "line": 188,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NavmapTests", "class": "Tests.NavmapTests", "reportPath": "NavmapTests_NavmapTests.html", "methodName": "Toggle()", "methodShortName": "Toggle()", "fileIndex": 0, "line": 35,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NFTHelper", "class": "DCL.Helpers.NFT.Markets.OpenSea", "reportPath": "NFTHelper_OpenSea.html", "methodName": "DCL.Helpers.NFT.NFTInfoSingleAsset DCL.Helpers.NFT.Markets.OpenSea::ResponseToNFTInfo(DCL.Helpers.NFT.Markets.OpenSea_Internal.SingleAssetResponse)", "methodShortName": "ResponseToNFTInfo(...)", "fileIndex": 0, "line": 137,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NFTHelper", "class": "DCL.Helpers.NFT.Markets.OpenSea", "reportPath": "NFTHelper_OpenSea.html", "methodName": "DCL-Helpers-NFT-Markets-INFTMarket-FetchNFTsFromOwner()", "methodShortName": "DCL-Helpers-NFT-Markets-INFTMarket-FetchNFTsFromOwner()", "fileIndex": 0, "line": 16,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NFTHelper", "class": "DCL.Helpers.NFT.Markets.OpenSea", "reportPath": "NFTHelper_OpenSea.html", "methodName": "DCL-Helpers-NFT-Markets-INFTMarket-FetchNFTInfoSingleAsset()", "methodShortName": "DCL-Helpers-NFT-Markets-INFTMarket-FetchNFTInfoSingleAsset()", "fileIndex": 0, "line": 48,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NFTHelper", "class": "DCL.Helpers.NFT.NFTHelper", "reportPath": "NFTHelper_NFTHelper.html", "methodName": "FetchNFTsFromOwner()", "methodShortName": "FetchNFTsFromOwner()", "fileIndex": 0, "line": 20,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "NotificationsController", "class": "NotificationsController", "reportPath": "NotificationsController_NotificationsController.html", "methodName": "System.Void NotificationsController::ShowWelcomeNotification()", "methodShortName": "ShowWelcomeNotification()", "fileIndex": 0, "line": 53,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_Tooltip_SocialFeatures", "reportPath": "Onboarding_TutorialStep_Tooltip_SocialFeatures.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_Tooltip_SocialFeatures::OnStepStart()", "methodShortName": "OnStepStart()", "fileIndex": 0, "line": 18,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialStep_Tooltip_SocialFeatures", "reportPath": "Onboarding_TutorialStep_Tooltip_SocialFeatures.html", "methodName": "System.Void DCL.Tutorial.TutorialStep_Tooltip_SocialFeatures::OnStepFinished()", "methodShortName": "OnStepFinished()", "fileIndex": 0, "line": 47,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "PhysicsCastTest", "class": "PhysicsCast_Tests", "reportPath": "PhysicsCastTest_PhysicsCast_Tests.html", "methodName": "HitFirst()", "methodShortName": "HitFirst()", "fileIndex": 0, "line": 62,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "PluginScripts", "class": "TextureLoader", "reportPath": "PluginScripts_TextureLoader.html", "methodName": "static UnityEngine.Texture2D TextureLoader::LoadTGA(System.IO.Stream)", "methodShortName": "LoadTGA(...)", "fileIndex": 0, "line": 130,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::RemoveItem(System.Int32)", "methodShortName": "RemoveItem(...)", "fileIndex": 0, "line": 415,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::SortElements(UnityEngine.Rect, System.Boolean)", "methodShortName": "SortElements(...)", "fileIndex": 0, "line": 733,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::HandleMoveElement(System.Object)", "methodShortName": "HandleMoveElement(...)", "fileIndex": 0, "line": 1396,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList::HandlePreSelection(UnityEngine.Rect, UnityEngine.Event)", "methodShortName": "HandlePreSelection(...)", "fileIndex": 0, "line": 1586,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Boolean ReorderableList.Editor.ReorderableList::IsElementExpandable(UnityEditor.SerializedProperty)", "methodShortName": "IsElementExpandable(...)", "fileIndex": 0, "line": 1957,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Boolean ReorderableList.Editor.ReorderableList::IsTypeExpandable(UnityEditor.SerializedPropertyType)", "methodShortName": "IsTypeExpandable(...)", "fileIndex": 0, "line": 1984,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "System.Void ReorderableList.Editor.ReorderableList/ListSelection::Trim(System.Int32, System.Int32)", "methodShortName": "Trim(...)", "fileIndex": 0, "line": 2529,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ReorderableEditor", "class": "ReorderableList.Editor.ReorderableList", "reportPath": "ReorderableEditor_ReorderableList.html", "methodName": "static System.Int32 ReorderableList.Editor.ReorderableList/ListSort::CompareObjects(UnityEngine.Object, UnityEngine.Object, System.Boolean)", "methodShortName": "CompareObjects(...)", "fileIndex": 0, "line": 2785,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "SceneBoundariesCheckerTests", "class": "SceneBoundariesCheckerTests.SBC_Asserts", "reportPath": "SceneBoundariesCheckerTests_SBC_Asserts.html", "methodName": "NFTShapeIsInvalidatedWhenStartingOutOfBounds()", "methodShortName": "NFTShapeIsInvalidatedWhenStartingOutOfBounds()", "fileIndex": 0, "line": 67,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "SceneBoundariesCheckerTests", "class": "SceneBoundariesCheckerTests.SBC_Asserts", "reportPath": "SceneBoundariesCheckerTests_SBC_Asserts.html", "methodName": "NFTShapeIsInvalidatedWhenLeavingBounds()", "methodShortName": "NFTShapeIsInvalidatedWhenLeavingBounds()", "fileIndex": 0, "line": 136,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "SceneBoundariesCheckerTests", "class": "SceneBoundariesCheckerTests.SBC_Asserts", "reportPath": "SceneBoundariesCheckerTests_SBC_Asserts.html", "methodName": "NFTShapeIsResetWhenReenteringBounds()", "methodShortName": "NFTShapeIsResetWhenReenteringBounds()", "fileIndex": 0, "line": 285,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "Settings", "class": "DCL.SettingsData.GeneralSettings", "reportPath": "Settings_GeneralSettings.html", "methodName": "System.Boolean DCL.SettingsData.GeneralSettings::Equals(DCL.SettingsData.GeneralSettings)", "methodShortName": "Equals(...)", "fileIndex": 0, "line": 185,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "TaskbarHUD", "class": "TaskbarHUDController", "reportPath": "TaskbarHUD_TaskbarHUDController.html", "methodName": "System.Void TaskbarHUDController::OnWorldChatToggleInputPress()", "methodShortName": "OnWorldChatToggleInputPress()", "fileIndex": 0, "line": 497,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "TestHelpers", "class": "TestSceneIntegrityChecker", "reportPath": "TestHelpers_TestSceneIntegrityChecker.html", "methodName": "static System.Collections.Generic.List[Component] TestSceneIntegrityChecker::GetAllSceneComponents()", "methodShortName": "GetAllSceneComponents()", "fileIndex": 0, "line": 28,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "TextureHelpers", "class": "TextureHelpers", "reportPath": "TextureHelpers_TextureHelpers.html", "methodName": "static System.Void TextureHelpers::EnsureTexture2DMaxSize(UnityEngine.Texture2D&, System.Int32)", "methodShortName": "EnsureTexture2DMaxSize(...)", "fileIndex": 0, "line": 7,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "TheGraph", "class": "TheGraph", "reportPath": "TheGraph_TheGraph.html", "methodName": "DCL.Helpers.Promise[List`1] TheGraph::QueryLands(System.String, System.String, System.Single)", "methodShortName": "QueryLands(...)", "fileIndex": 0, "line": 67,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "UIInputTextTests", "class": "DCL.InputTextTestsController", "reportPath": "UIInputTextTests_InputTextTestsController.html", "methodName": "InitScene()", "methodShortName": "InitScene()", "fileIndex": 0, "line": 16,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "UnityGLTFEditorAssembly", "class": "UnityGLTF.GLTFImporter", "reportPath": "UnityGLTFEditorAssembly_GLTFImporter.html", "methodName": "System.Collections.Generic.List[Material] UnityGLTF.GLTFImporter::SimplifyMaterials(UnityEngine.Renderer[])", "methodShortName": "SimplifyMaterials(...)", "fileIndex": 0, "line": 41,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "VisualTests", "class": "VisualTestController", "reportPath": "VisualTests_VisualTestController.html", "methodName": "TakeSnapshots()", "methodShortName": "TakeSnapshots()", "fileIndex": 0, "line": 103,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "WearablesFetching", "class": "DCL.Helpers.WearablesFetchingHelper", "reportPath": "WearablesFetching_WearablesFetchingHelper.html", "methodName": "GetWearableItems()", "methodShortName": "GetWearableItems()", "fileIndex": 0, "line": 77,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "WearablesFetching", "class": "WearablesAPIData", "reportPath": "WearablesFetching_WearablesAPIData.html", "methodName": "System.Collections.Generic.List[WearableItem] WearablesAPIData::GetWearableItems()", "methodShortName": "GetWearableItems()", "fileIndex": 0, "line": 58,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "WorldBlockersController", "class": "DCL.Controllers.BlockerAnimationHandler", "reportPath": "WorldBlockersController_BlockerAnimationHandler.html", "methodName": "FadeOutCoroutine()", "methodShortName": "FadeOutCoroutine()", "fileIndex": 0, "line": 39,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "WrappedTextureAsset", "class": "DCL.WrappedTextureUtils", "reportPath": "WrappedTextureAsset_WrappedTextureUtils.html", "methodName": "GetHeader()", "methodShortName": "GetHeader()", "fileIndex": 0, "line": 12,
    "metrics": [
      { "value": 6, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 42, "exceeded": true },
    ]},
  {
    "assembly": "ChatHUD", "class": "ChatEntry", "reportPath": "ChatHUD_ChatEntry.html", "methodName": "System.Void ChatEntry::Populate(ChatEntry/Model)", "methodShortName": "Populate(...)", "fileIndex": 0, "line": 70,
    "metrics": [
      { "value": 24, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 40.52, "exceeded": true },
    ]},
  {
    "assembly": "Camera", "class": "DCL.Camera.CameraStateTPS", "reportPath": "Camera_CameraStateTPS.html", "methodName": "System.Void DCL.Camera.CameraStateTPS::UpdateAvatarRotationDamping()", "methodShortName": "UpdateAvatarRotationDamping()", "fileIndex": 0, "line": 136,
    "metrics": [
      { "value": 8, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 39.49, "exceeded": true },
    ]},
  {
    "assembly": "UniGif", "class": "UniGif", "reportPath": "UniGif_UniGif.html", "methodName": "static System.Byte[] UniGif::DecodeGifLZW(System.Collections.Generic.List[Byte], System.Int32, System.Int32)", "methodShortName": "DecodeGifLZW(...)", "fileIndex": 2, "line": 332,
    "metrics": [
      { "value": 33, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 39.43, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "ActionController", "reportPath": "BuilderInWorld_ActionController.html", "methodName": "System.Void ActionController::CheckButtonsInteractability()", "methodShortName": "CheckButtonsInteractability()", "fileIndex": 0, "line": 241,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 38.52, "exceeded": true },
    ]},
  {
    "assembly": "PlayerInfoCardHUD", "class": "PlayerInfoCardHUDView", "reportPath": "PlayerInfoCardHUD_PlayerInfoCardHUDView.html", "methodName": "System.Void PlayerInfoCardHUDView::UpdateFriendButton()", "methodShortName": "UpdateFriendButton()", "fileIndex": 0, "line": 211,
    "metrics": [
      { "value": 9, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 36.27, "exceeded": true },
    ]},
  {
    "assembly": "MainScripts", "class": "DCLCharacterController", "reportPath": "MainScripts_DCLCharacterController.html", "methodName": "System.Void DCLCharacterController::LateUpdate()", "methodShortName": "LateUpdate()", "fileIndex": 0, "line": 252,
    "metrics": [
      { "value": 27, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 35.46, "exceeded": true },
    ]},
  {
    "assembly": "BuilderInWorld", "class": "DCL.Camera.FreeCameraMovement", "reportPath": "BuilderInWorld_FreeCameraMovement.html", "methodName": "System.Void DCL.Camera.FreeCameraMovement::HandleCameraMovementInput()", "methodShortName": "HandleCameraMovementInput()", "fileIndex": 0, "line": 283,
    "metrics": [
      { "value": 14, "exceeded": false },
      { "value": 0, "exceeded": false },
      { "value": 31.66, "exceeded": true },
    ]},
  {
    "assembly": "AvatarShape", "class": "FacialFeatureController", "reportPath": "AvatarShape_FacialFeatureController.html", "methodName": "FetchTextures()", "methodShortName": "FetchTextures()", "fileIndex": 0, "line": 68,
    "metrics": [
      { "value": 29, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 29.43, "exceeded": false },
    ]},
  {
    "assembly": "HUD", "class": "HUDFactory", "reportPath": "HUD_HUDFactory.html", "methodName": "IHUD HUDFactory::CreateHUD(HUDElementID)", "methodShortName": "CreateHUD(...)", "fileIndex": 0, "line": 13,
    "metrics": [
      { "value": 29, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 29, "exceeded": false },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialController", "reportPath": "Onboarding_TutorialController.html", "methodName": "ExecuteSteps()", "methodShortName": "ExecuteSteps()", "fileIndex": 0, "line": 440,
    "metrics": [
      { "value": 27, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 29.75, "exceeded": false },
    ]},
  {
    "assembly": "AssetPromiseKeeper", "class": "DCL.AssetPromise_AB", "reportPath": "AssetPromiseKeeper_AssetPromise_AB.html", "methodName": "LoadAssetBundleWithDeps()", "methodShortName": "LoadAssetBundleWithDeps()", "fileIndex": 0, "line": 89,
    "metrics": [
      { "value": 20, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 22.4, "exceeded": false },
    ]},
  {
    "assembly": "CullingController", "class": "DCL.Rendering.CullingController", "reportPath": "CullingController_CullingController.html", "methodName": "ProcessProfile()", "methodShortName": "ProcessProfile()", "fileIndex": 0, "line": 126,
    "metrics": [
      { "value": 20, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 22.25, "exceeded": false },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.PointerEventsController", "reportPath": "MainScripts_PointerEventsController.html", "methodName": "System.Void DCL.PointerEventsController::Update()", "methodShortName": "Update()", "fileIndex": 0, "line": 60,
    "metrics": [
      { "value": 20, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 20.3, "exceeded": false },
    ]},
  {
    "assembly": "AssetPromiseKeeper", "class": "DCL.AssetBundlesLoader", "reportPath": "AssetPromiseKeeper_AssetBundlesLoader.html", "methodName": "LoadAssetBundle()", "methodShortName": "LoadAssetBundle()", "fileIndex": 0, "line": 129,
    "metrics": [
      { "value": 19, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 19.77, "exceeded": false },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.ParcelScenesCleaner", "reportPath": "MainScripts_ParcelScenesCleaner.html", "methodName": "CleanupEntitiesCoroutine()", "methodShortName": "CleanupEntitiesCoroutine()", "fileIndex": 0, "line": 115,
    "metrics": [
      { "value": 18, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 22.22, "exceeded": false },
    ]},
  {
    "assembly": "MainScripts", "class": "UISizeFitter", "reportPath": "MainScripts_UISizeFitter.html", "methodName": "System.Void UISizeFitter::FitSizeToChildren(System.Boolean, System.Boolean)", "methodShortName": "FitSizeToChildren(...)", "fileIndex": 0, "line": 31,
    "metrics": [
      { "value": 18, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 18.14, "exceeded": false },
    ]},
  {
    "assembly": "ParametrizedShapesTests", "class": "ParametrizedShapesTests", "reportPath": "ParametrizedShapesTests_ParametrizedShapesTests.html", "methodName": "CollisionProperty()", "methodShortName": "CollisionProperty()", "fileIndex": 0, "line": 157,
    "metrics": [
      { "value": 18, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 18, "exceeded": false },
    ]},
  {
    "assembly": "ParametrizedShapesTests", "class": "ParametrizedShapesTests", "reportPath": "ParametrizedShapesTests_ParametrizedShapesTests.html", "methodName": "VisibleProperty()", "methodShortName": "VisibleProperty()", "fileIndex": 0, "line": 234,
    "metrics": [
      { "value": 18, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 18, "exceeded": false },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.MessagingControllersManager", "reportPath": "MainScripts_MessagingControllersManager.html", "methodName": "System.Void DCL.MessagingControllersManager::PopulateBusesToBeProcessed()", "methodShortName": "PopulateBusesToBeProcessed()", "fileIndex": 0, "line": 65,
    "metrics": [
      { "value": 17, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 17, "exceeded": false },
    ]},
  {
    "assembly": "TaskbarHUD", "class": "TaskbarHUDView", "reportPath": "TaskbarHUD_TaskbarHUDView.html", "methodName": "System.Void TaskbarHUDView::OnWindowToggleOff(TaskbarButton)", "methodShortName": "OnWindowToggleOff(...)", "fileIndex": 0, "line": 179,
    "metrics": [
      { "value": 17, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 24.17, "exceeded": false },
    ]},
  {
    "assembly": "BuilderEntity", "class": "DCLBuilderInWorldEntity", "reportPath": "BuilderEntity_DCLBuilderInWorldEntity.html", "methodName": "System.Void DCLBuilderInWorldEntity::CreateCollidersForEntity(DCL.Models.IDCLEntity)", "methodShortName": "CreateCollidersForEntity(...)", "fileIndex": 0, "line": 582,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 20, "exceeded": false },
    ]},
  {
    "assembly": "MainScripts", "class": "DCL.Controllers.SceneBoundsFeedbackStyle_Simple", "reportPath": "MainScripts_SceneBoundsFeedbackStyle_Simple.html", "methodName": "System.Void DCL.Controllers.SceneBoundsFeedbackStyle_Simple::ApplyFeedback(DCL.Models.MeshesInfo, System.Boolean)", "methodShortName": "ApplyFeedback(...)", "fileIndex": 0, "line": 13,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 16, "exceeded": false },
    ]},
  {
    "assembly": "MaterialCachingHelper", "class": "DCL.Helpers.MaterialCachingHelper", "reportPath": "MaterialCachingHelper_MaterialCachingHelper.html", "methodName": "Process()", "methodShortName": "Process()", "fileIndex": 0, "line": 43,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 16.39, "exceeded": false },
    ]},
  {
    "assembly": "Onboarding", "class": "DCL.Tutorial.TutorialController", "reportPath": "Onboarding_TutorialController.html", "methodName": "StartTutorialFromStep()", "methodShortName": "StartTutorialFromStep()", "fileIndex": 0, "line": 290,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 23.21, "exceeded": false },
    ]},
  {
    "assembly": "ProfileHUD", "class": "ProfileHUDController", "reportPath": "ProfileHUD_ProfileHUDController.html", "methodName": "ProfileHUDController::ProfileHUDController()", "methodShortName": "ProfileHUDController()", "fileIndex": 0, "line": 38,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 16.21, "exceeded": false },
    ]},
  {
    "assembly": "TaskbarHUD", "class": "TaskbarHUDView", "reportPath": "TaskbarHUD_TaskbarHUDView.html", "methodName": "System.Void TaskbarHUDView::OnWindowToggleOn(TaskbarButton)", "methodShortName": "OnWindowToggleOn(...)", "fileIndex": 0, "line": 232,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 28.31, "exceeded": false },
    ]},
  {
    "assembly": "UIContainerRectTests", "class": "UIContainerRectVisualTests", "reportPath": "UIContainerRectTests_UIContainerRectVisualTests.html", "methodName": "UIContainerRectTest1()", "methodShortName": "UIContainerRectTest1()", "fileIndex": 0, "line": 22,
    "metrics": [
      { "value": 16, "exceeded": true },
      { "value": 0, "exceeded": false },
      { "value": 16, "exceeded": false },
    ]},
];

var branchCoverageAvailable = true;


var translations = {
'top': 'Top:',
'all': 'All',
'assembly': 'Assembly',
'class': 'Class',
'method': 'Method',
'lineCoverage': 'LineCoverage',
'noGrouping': 'No grouping',
'byAssembly': 'By assembly',
'byNamespace': 'By namespace, Level:',
'all': 'All',
'collapseAll': 'Collapse all',
'expandAll': 'Expand all',
'grouping': 'Grouping:',
'filter': 'Filter:',
'name': 'Name',
'covered': 'Covered',
'uncovered': 'Uncovered',
'coverable': 'Coverable',
'total': 'Total',
'coverage': 'Line coverage',
'branchCoverage': 'Branch coverage',
'history': 'Coverage History',
'compareHistory': 'Compare with:',
'date': 'Date',
'allChanges': 'All changes',
'lineCoverageIncreaseOnly': 'Line coverage: Increase only',
'lineCoverageDecreaseOnly': 'Line coverage: Decrease only',
'branchCoverageIncreaseOnly': 'Branch coverage: Increase only',
'branchCoverageDecreaseOnly': 'Branch coverage: Decrease only'
};


(()=>{"use strict";var r,e={},o={};function t(r){var a=o[r];if(void 0!==a)return a.exports;var n=o[r]={exports:{}};return e[r](n,n.exports,t),n.exports}t.m=e,r=[],t.O=(e,o,a,n)=>{if(!o){var p=1/0;for(v=0;v<r.length;v++){for(var[o,a,n]=r[v],l=!0,u=0;u<o.length;u++)(!1&n||p>=n)&&Object.keys(t.O).every(r=>t.O[r](o[u]))?o.splice(u--,1):(l=!1,n<p&&(p=n));l&&(r.splice(v--,1),e=a())}return e}n=n||0;for(var v=r.length;v>0&&r[v-1][2]>n;v--)r[v]=r[v-1];r[v]=[o,a,n]},t.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return t.d(e,{a:e}),e},t.d=(r,e)=>{for(var o in e)t.o(e,o)&&!t.o(r,o)&&Object.defineProperty(r,o,{enumerable:!0,get:e[o]})},t.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r={666:0};t.O.j=e=>0===r[e];var e=(e,o)=>{var a,n,[p,l,u]=o,v=0;for(a in l)t.o(l,a)&&(t.m[a]=l[a]);if(u)var f=u(t);for(e&&e(o);v<p.length;v++)t.o(r,n=p[v])&&r[n]&&r[n][0](),r[p[v]]=0;return t.O(f)},o=self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))})()})();
(self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[]).push([[429],{167:()=>{"use strict";!function(e){const t=e.performance;function n(e){t&&t.mark&&t.mark(e)}function o(e,n){t&&t.measure&&t.measure(e,n)}n("Zone");const r=e.__Zone_symbol_prefix||"__zone_symbol__";function s(e){return r+e}const a=!0===e[s("forceDuplicateZoneCheck")];if(e.Zone){if(a||"function"!=typeof e.Zone.__symbol__)throw new Error("Zone already loaded.");return e.Zone}class i{constructor(e,t){this._parent=e,this._name=t?t.name||"unnamed":"<root>",this._properties=t&&t.properties||{},this._zoneDelegate=new l(this,this._parent&&this._parent._zoneDelegate,t)}static assertZonePatched(){if(e.Promise!==O.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let e=i.current;for(;e.parent;)e=e.parent;return e}static get current(){return z.zone}static get currentTask(){return j}static __load_patch(t,r,s=!1){if(O.hasOwnProperty(t)){if(!s&&a)throw Error("Already loaded patch: "+t)}else if(!e["__Zone_disable_"+t]){const s="Zone:"+t;n(s),O[t]=r(e,i,C),o(s,s)}}get parent(){return this._parent}get name(){return this._name}get(e){const t=this.getZoneWith(e);if(t)return t._properties[e]}getZoneWith(e){let t=this;for(;t;){if(t._properties.hasOwnProperty(e))return t;t=t._parent}return null}fork(e){if(!e)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,e)}wrap(e,t){if("function"!=typeof e)throw new Error("Expecting function got: "+e);const n=this._zoneDelegate.intercept(this,e,t),o=this;return function(){return o.runGuarded(n,this,arguments,t)}}run(e,t,n,o){z={parent:z,zone:this};try{return this._zoneDelegate.invoke(this,e,t,n,o)}finally{z=z.parent}}runGuarded(e,t=null,n,o){z={parent:z,zone:this};try{try{return this._zoneDelegate.invoke(this,e,t,n,o)}catch(r){if(this._zoneDelegate.handleError(this,r))throw r}}finally{z=z.parent}}runTask(e,t,n){if(e.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(e.zone||y).name+"; Execution: "+this.name+")");if(e.state===v&&(e.type===P||e.type===D))return;const o=e.state!=E;o&&e._transitionTo(E,b),e.runCount++;const r=j;j=e,z={parent:z,zone:this};try{e.type==D&&e.data&&!e.data.isPeriodic&&(e.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,e,t,n)}catch(s){if(this._zoneDelegate.handleError(this,s))throw s}}finally{e.state!==v&&e.state!==Z&&(e.type==P||e.data&&e.data.isPeriodic?o&&e._transitionTo(b,E):(e.runCount=0,this._updateTaskCount(e,-1),o&&e._transitionTo(v,E,v))),z=z.parent,j=r}}scheduleTask(e){if(e.zone&&e.zone!==this){let t=this;for(;t;){if(t===e.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${e.zone.name}`);t=t.parent}}e._transitionTo(T,v);const t=[];e._zoneDelegates=t,e._zone=this;try{e=this._zoneDelegate.scheduleTask(this,e)}catch(n){throw e._transitionTo(Z,T,v),this._zoneDelegate.handleError(this,n),n}return e._zoneDelegates===t&&this._updateTaskCount(e,1),e.state==T&&e._transitionTo(b,T),e}scheduleMicroTask(e,t,n,o){return this.scheduleTask(new u(S,e,t,n,o,void 0))}scheduleMacroTask(e,t,n,o,r){return this.scheduleTask(new u(D,e,t,n,o,r))}scheduleEventTask(e,t,n,o,r){return this.scheduleTask(new u(P,e,t,n,o,r))}cancelTask(e){if(e.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(e.zone||y).name+"; Execution: "+this.name+")");e._transitionTo(w,b,E);try{this._zoneDelegate.cancelTask(this,e)}catch(t){throw e._transitionTo(Z,w),this._zoneDelegate.handleError(this,t),t}return this._updateTaskCount(e,-1),e._transitionTo(v,w),e.runCount=0,e}_updateTaskCount(e,t){const n=e._zoneDelegates;-1==t&&(e._zoneDelegates=null);for(let o=0;o<n.length;o++)n[o]._updateTaskCount(e.type,t)}}i.__symbol__=s;const c={name:"",onHasTask:(e,t,n,o)=>e.hasTask(n,o),onScheduleTask:(e,t,n,o)=>e.scheduleTask(n,o),onInvokeTask:(e,t,n,o,r,s)=>e.invokeTask(n,o,r,s),onCancelTask:(e,t,n,o)=>e.cancelTask(n,o)};class l{constructor(e,t,n){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=e,this._parentDelegate=t,this._forkZS=n&&(n&&n.onFork?n:t._forkZS),this._forkDlgt=n&&(n.onFork?t:t._forkDlgt),this._forkCurrZone=n&&(n.onFork?this.zone:t._forkCurrZone),this._interceptZS=n&&(n.onIntercept?n:t._interceptZS),this._interceptDlgt=n&&(n.onIntercept?t:t._interceptDlgt),this._interceptCurrZone=n&&(n.onIntercept?this.zone:t._interceptCurrZone),this._invokeZS=n&&(n.onInvoke?n:t._invokeZS),this._invokeDlgt=n&&(n.onInvoke?t:t._invokeDlgt),this._invokeCurrZone=n&&(n.onInvoke?this.zone:t._invokeCurrZone),this._handleErrorZS=n&&(n.onHandleError?n:t._handleErrorZS),this._handleErrorDlgt=n&&(n.onHandleError?t:t._handleErrorDlgt),this._handleErrorCurrZone=n&&(n.onHandleError?this.zone:t._handleErrorCurrZone),this._scheduleTaskZS=n&&(n.onScheduleTask?n:t._scheduleTaskZS),this._scheduleTaskDlgt=n&&(n.onScheduleTask?t:t._scheduleTaskDlgt),this._scheduleTaskCurrZone=n&&(n.onScheduleTask?this.zone:t._scheduleTaskCurrZone),this._invokeTaskZS=n&&(n.onInvokeTask?n:t._invokeTaskZS),this._invokeTaskDlgt=n&&(n.onInvokeTask?t:t._invokeTaskDlgt),this._invokeTaskCurrZone=n&&(n.onInvokeTask?this.zone:t._invokeTaskCurrZone),this._cancelTaskZS=n&&(n.onCancelTask?n:t._cancelTaskZS),this._cancelTaskDlgt=n&&(n.onCancelTask?t:t._cancelTaskDlgt),this._cancelTaskCurrZone=n&&(n.onCancelTask?this.zone:t._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const o=n&&n.onHasTask;(o||t&&t._hasTaskZS)&&(this._hasTaskZS=o?n:c,this._hasTaskDlgt=t,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=e,n.onScheduleTask||(this._scheduleTaskZS=c,this._scheduleTaskDlgt=t,this._scheduleTaskCurrZone=this.zone),n.onInvokeTask||(this._invokeTaskZS=c,this._invokeTaskDlgt=t,this._invokeTaskCurrZone=this.zone),n.onCancelTask||(this._cancelTaskZS=c,this._cancelTaskDlgt=t,this._cancelTaskCurrZone=this.zone))}fork(e,t){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,e,t):new i(e,t)}intercept(e,t,n){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,e,t,n):t}invoke(e,t,n,o,r){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,e,t,n,o,r):t.apply(n,o)}handleError(e,t){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,e,t)}scheduleTask(e,t){let n=t;if(this._scheduleTaskZS)this._hasTaskZS&&n._zoneDelegates.push(this._hasTaskDlgtOwner),n=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,e,t),n||(n=t);else if(t.scheduleFn)t.scheduleFn(t);else{if(t.type!=S)throw new Error("Task is missing scheduleFn.");k(t)}return n}invokeTask(e,t,n,o){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,e,t,n,o):t.callback.apply(n,o)}cancelTask(e,t){let n;if(this._cancelTaskZS)n=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,e,t);else{if(!t.cancelFn)throw Error("Task is not cancelable");n=t.cancelFn(t)}return n}hasTask(e,t){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,e,t)}catch(n){this.handleError(e,n)}}_updateTaskCount(e,t){const n=this._taskCounts,o=n[e],r=n[e]=o+t;if(r<0)throw new Error("More tasks executed then were scheduled.");0!=o&&0!=r||this.hasTask(this.zone,{microTask:n.microTask>0,macroTask:n.macroTask>0,eventTask:n.eventTask>0,change:e})}}class u{constructor(t,n,o,r,s,a){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=t,this.source=n,this.data=r,this.scheduleFn=s,this.cancelFn=a,!o)throw new Error("callback is not defined");this.callback=o;const i=this;this.invoke=t===P&&r&&r.useG?u.invokeTask:function(){return u.invokeTask.call(e,i,this,arguments)}}static invokeTask(e,t,n){e||(e=this),I++;try{return e.runCount++,e.zone.runTask(e,t,n)}finally{1==I&&m(),I--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(v,T)}_transitionTo(e,t,n){if(this._state!==t&&this._state!==n)throw new Error(`${this.type} '${this.source}': can not transition to '${e}', expecting state '${t}'${n?" or '"+n+"'":""}, was '${this._state}'.`);this._state=e,e==v&&(this._zoneDelegates=null)}toString(){return this.data&&void 0!==this.data.handleId?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const h=s("setTimeout"),p=s("Promise"),f=s("then");let d,g=[],_=!1;function k(t){if(0===I&&0===g.length)if(d||e[p]&&(d=e[p].resolve(0)),d){let e=d[f];e||(e=d.then),e.call(d,m)}else e[h](m,0);t&&g.push(t)}function m(){if(!_){for(_=!0;g.length;){const t=g;g=[];for(let n=0;n<t.length;n++){const o=t[n];try{o.zone.runTask(o,null,null)}catch(e){C.onUnhandledError(e)}}}C.microtaskDrainDone(),_=!1}}const y={name:"NO ZONE"},v="notScheduled",T="scheduling",b="scheduled",E="running",w="canceling",Z="unknown",S="microTask",D="macroTask",P="eventTask",O={},C={symbol:s,currentZoneFrame:()=>z,onUnhandledError:R,microtaskDrainDone:R,scheduleMicroTask:k,showUncaughtError:()=>!i[s("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:R,patchMethod:()=>R,bindArguments:()=>[],patchThen:()=>R,patchMacroTask:()=>R,patchEventPrototype:()=>R,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>R,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>R,wrapWithCurrentZone:()=>R,filterProperties:()=>[],attachOriginToPatched:()=>R,_redefineProperty:()=>R,patchCallbacks:()=>R};let z={parent:null,zone:new i(null,null)},j=null,I=0;function R(){}o("Zone","Zone"),e.Zone=i}("undefined"!=typeof window&&window||"undefined"!=typeof self&&self||global);const e=Object.getOwnPropertyDescriptor,t=Object.defineProperty,n=Object.getPrototypeOf,o=Object.create,r=Array.prototype.slice,s="addEventListener",a="removeEventListener",i=Zone.__symbol__(s),c=Zone.__symbol__(a),l="true",u="false",h=Zone.__symbol__("");function p(e,t){return Zone.current.wrap(e,t)}function f(e,t,n,o,r){return Zone.current.scheduleMacroTask(e,t,n,o,r)}const d=Zone.__symbol__,g="undefined"!=typeof window,_=g?window:void 0,k=g&&_||"object"==typeof self&&self||global,m=[null];function y(e,t){for(let n=e.length-1;n>=0;n--)"function"==typeof e[n]&&(e[n]=p(e[n],t+"_"+n));return e}function v(e){return!e||!1!==e.writable&&!("function"==typeof e.get&&void 0===e.set)}const T="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,b=!("nw"in k)&&void 0!==k.process&&"[object process]"==={}.toString.call(k.process),E=!b&&!T&&!(!g||!_.HTMLElement),w=void 0!==k.process&&"[object process]"==={}.toString.call(k.process)&&!T&&!(!g||!_.HTMLElement),Z={},S=function(e){if(!(e=e||k.event))return;let t=Z[e.type];t||(t=Z[e.type]=d("ON_PROPERTY"+e.type));const n=this||e.target||k,o=n[t];let r;if(E&&n===_&&"error"===e.type){const t=e;r=o&&o.call(this,t.message,t.filename,t.lineno,t.colno,t.error),!0===r&&e.preventDefault()}else r=o&&o.apply(this,arguments),null==r||r||e.preventDefault();return r};function D(n,o,r){let s=e(n,o);if(!s&&r&&e(r,o)&&(s={enumerable:!0,configurable:!0}),!s||!s.configurable)return;const a=d("on"+o+"patched");if(n.hasOwnProperty(a)&&n[a])return;delete s.writable,delete s.value;const i=s.get,c=s.set,l=o.substr(2);let u=Z[l];u||(u=Z[l]=d("ON_PROPERTY"+l)),s.set=function(e){let t=this;t||n!==k||(t=k),t&&(t[u]&&t.removeEventListener(l,S),c&&c.apply(t,m),"function"==typeof e?(t[u]=e,t.addEventListener(l,S,!1)):t[u]=null)},s.get=function(){let e=this;if(e||n!==k||(e=k),!e)return null;const t=e[u];if(t)return t;if(i){let t=i&&i.call(this);if(t)return s.set.call(this,t),"function"==typeof e.removeAttribute&&e.removeAttribute(o),t}return null},t(n,o,s),n[a]=!0}function P(e,t,n){if(t)for(let o=0;o<t.length;o++)D(e,"on"+t[o],n);else{const t=[];for(const n in e)"on"==n.substr(0,2)&&t.push(n);for(let o=0;o<t.length;o++)D(e,t[o],n)}}const O=d("originalInstance");function C(e){const n=k[e];if(!n)return;k[d(e)]=n,k[e]=function(){const t=y(arguments,e);switch(t.length){case 0:this[O]=new n;break;case 1:this[O]=new n(t[0]);break;case 2:this[O]=new n(t[0],t[1]);break;case 3:this[O]=new n(t[0],t[1],t[2]);break;case 4:this[O]=new n(t[0],t[1],t[2],t[3]);break;default:throw new Error("Arg list too long.")}},I(k[e],n);const o=new n(function(){});let r;for(r in o)"XMLHttpRequest"===e&&"responseBlob"===r||function(n){"function"==typeof o[n]?k[e].prototype[n]=function(){return this[O][n].apply(this[O],arguments)}:t(k[e].prototype,n,{set:function(t){"function"==typeof t?(this[O][n]=p(t,e+"."+n),I(this[O][n],t)):this[O][n]=t},get:function(){return this[O][n]}})}(r);for(r in n)"prototype"!==r&&n.hasOwnProperty(r)&&(k[e][r]=n[r])}function z(t,o,r){let s=t;for(;s&&!s.hasOwnProperty(o);)s=n(s);!s&&t[o]&&(s=t);const a=d(o);let i=null;if(s&&(!(i=s[a])||!s.hasOwnProperty(a))&&(i=s[a]=s[o],v(s&&e(s,o)))){const e=r(i,a,o);s[o]=function(){return e(this,arguments)},I(s[o],i)}return i}function j(e,t,n){let o=null;function r(e){const t=e.data;return t.args[t.cbIdx]=function(){e.invoke.apply(this,arguments)},o.apply(t.target,t.args),e}o=z(e,t,e=>function(t,o){const s=n(t,o);return s.cbIdx>=0&&"function"==typeof o[s.cbIdx]?f(s.name,o[s.cbIdx],s,r):e.apply(t,o)})}function I(e,t){e[d("OriginalDelegate")]=t}let R=!1,M=!1;function N(){try{const e=_.navigator.userAgent;if(-1!==e.indexOf("MSIE ")||-1!==e.indexOf("Trident/"))return!0}catch(e){}return!1}function x(){if(R)return M;R=!0;try{const e=_.navigator.userAgent;-1===e.indexOf("MSIE ")&&-1===e.indexOf("Trident/")&&-1===e.indexOf("Edge/")||(M=!0)}catch(e){}return M}Zone.__load_patch("ZoneAwarePromise",(e,t,n)=>{const o=Object.getOwnPropertyDescriptor,r=Object.defineProperty,s=n.symbol,a=[],i=!0===e[s("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],c=s("Promise"),l=s("then");n.onUnhandledError=e=>{if(n.showUncaughtError()){const t=e&&e.rejection;t?console.error("Unhandled Promise rejection:",t instanceof Error?t.message:t,"; Zone:",e.zone.name,"; Task:",e.task&&e.task.source,"; Value:",t,t instanceof Error?t.stack:void 0):console.error(e)}},n.microtaskDrainDone=()=>{for(;a.length;){const t=a.shift();try{t.zone.runGuarded(()=>{if(t.throwOriginal)throw t.rejection;throw t})}catch(e){h(e)}}};const u=s("unhandledPromiseRejectionHandler");function h(e){n.onUnhandledError(e);try{const n=t[u];"function"==typeof n&&n.call(this,e)}catch(o){}}function p(e){return e&&e.then}function f(e){return e}function d(e){return C.reject(e)}const g=s("state"),_=s("value"),k=s("finally"),m=s("parentPromiseValue"),y=s("parentPromiseState"),v=null,T=!0,b=!1;function E(e,t){return n=>{try{Z(e,t,n)}catch(o){Z(e,!1,o)}}}const w=s("currentTaskTrace");function Z(e,o,s){const c=function(){let e=!1;return function(t){return function(){e||(e=!0,t.apply(null,arguments))}}}();if(e===s)throw new TypeError("Promise resolved with itself");if(e[g]===v){let h=null;try{"object"!=typeof s&&"function"!=typeof s||(h=s&&s.then)}catch(u){return c(()=>{Z(e,!1,u)})(),e}if(o!==b&&s instanceof C&&s.hasOwnProperty(g)&&s.hasOwnProperty(_)&&s[g]!==v)D(s),Z(e,s[g],s[_]);else if(o!==b&&"function"==typeof h)try{h.call(s,c(E(e,o)),c(E(e,!1)))}catch(u){c(()=>{Z(e,!1,u)})()}else{e[g]=o;const c=e[_];if(e[_]=s,e[k]===k&&o===T&&(e[g]=e[y],e[_]=e[m]),o===b&&s instanceof Error){const e=t.currentTask&&t.currentTask.data&&t.currentTask.data.__creationTrace__;e&&r(s,w,{configurable:!0,enumerable:!1,writable:!0,value:e})}for(let t=0;t<c.length;)P(e,c[t++],c[t++],c[t++],c[t++]);if(0==c.length&&o==b){e[g]=0;let o=s;try{throw new Error("Uncaught (in promise): "+((l=s)&&l.toString===Object.prototype.toString?(l.constructor&&l.constructor.name||"")+": "+JSON.stringify(l):l?l.toString():Object.prototype.toString.call(l))+(s&&s.stack?"\n"+s.stack:""))}catch(u){o=u}i&&(o.throwOriginal=!0),o.rejection=s,o.promise=e,o.zone=t.current,o.task=t.currentTask,a.push(o),n.scheduleMicroTask()}}}var l;return e}const S=s("rejectionHandledHandler");function D(e){if(0===e[g]){try{const n=t[S];n&&"function"==typeof n&&n.call(this,{rejection:e[_],promise:e})}catch(n){}e[g]=b;for(let t=0;t<a.length;t++)e===a[t].promise&&a.splice(t,1)}}function P(e,t,n,o,r){D(e);const s=e[g],a=s?"function"==typeof o?o:f:"function"==typeof r?r:d;t.scheduleMicroTask("Promise.then",()=>{try{const o=e[_],r=!!n&&k===n[k];r&&(n[m]=o,n[y]=s);const i=t.run(a,void 0,r&&a!==d&&a!==f?[]:[o]);Z(n,!0,i)}catch(o){Z(n,!1,o)}},n)}const O=function(){};class C{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(e){return Z(new this(null),T,e)}static reject(e){return Z(new this(null),b,e)}static race(e){let t,n,o=new this((e,o)=>{t=e,n=o});function r(e){t(e)}function s(e){n(e)}for(let a of e)p(a)||(a=this.resolve(a)),a.then(r,s);return o}static all(e){return C.allWithCallback(e)}static allSettled(e){return(this&&this.prototype instanceof C?this:C).allWithCallback(e,{thenCallback:e=>({status:"fulfilled",value:e}),errorCallback:e=>({status:"rejected",reason:e})})}static allWithCallback(e,t){let n,o,r=new this((e,t)=>{n=e,o=t}),s=2,a=0;const i=[];for(let l of e){p(l)||(l=this.resolve(l));const e=a;try{l.then(o=>{i[e]=t?t.thenCallback(o):o,s--,0===s&&n(i)},r=>{t?(i[e]=t.errorCallback(r),s--,0===s&&n(i)):o(r)})}catch(c){o(c)}s++,a++}return s-=2,0===s&&n(i),r}constructor(e){const t=this;if(!(t instanceof C))throw new Error("Must be an instanceof Promise.");t[g]=v,t[_]=[];try{e&&e(E(t,T),E(t,b))}catch(n){Z(t,!1,n)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return C}then(e,n){let o=this.constructor[Symbol.species];o&&"function"==typeof o||(o=this.constructor||C);const r=new o(O),s=t.current;return this[g]==v?this[_].push(s,r,e,n):P(this,s,r,e,n),r}catch(e){return this.then(null,e)}finally(e){let n=this.constructor[Symbol.species];n&&"function"==typeof n||(n=C);const o=new n(O);o[k]=k;const r=t.current;return this[g]==v?this[_].push(r,o,e,e):P(this,r,o,e,e),o}}C.resolve=C.resolve,C.reject=C.reject,C.race=C.race,C.all=C.all;const j=e[c]=e.Promise;e.Promise=C;const I=s("thenPatched");function R(e){const t=e.prototype,n=o(t,"then");if(n&&(!1===n.writable||!n.configurable))return;const r=t.then;t[l]=r,e.prototype.then=function(e,t){return new C((e,t)=>{r.call(this,e,t)}).then(e,t)},e[I]=!0}return n.patchThen=R,j&&(R(j),z(e,"fetch",e=>{return t=e,function(e,n){let o=t.apply(e,n);if(o instanceof C)return o;let r=o.constructor;return r[I]||R(r),o};var t})),Promise[t.__symbol__("uncaughtPromiseErrors")]=a,C}),Zone.__load_patch("toString",e=>{const t=Function.prototype.toString,n=d("OriginalDelegate"),o=d("Promise"),r=d("Error"),s=function(){if("function"==typeof this){const s=this[n];if(s)return"function"==typeof s?t.call(s):Object.prototype.toString.call(s);if(this===Promise){const n=e[o];if(n)return t.call(n)}if(this===Error){const n=e[r];if(n)return t.call(n)}}return t.call(this)};s[n]=t,Function.prototype.toString=s;const a=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":a.call(this)}});let L=!1;if("undefined"!=typeof window)try{const e=Object.defineProperty({},"passive",{get:function(){L=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(he){L=!1}const A={useG:!0},H={},F={},q=new RegExp("^"+h+"(\\w+)(true|false)$"),G=d("propagationStopped");function B(e,t){const n=(t?t(e):e)+u,o=(t?t(e):e)+l,r=h+n,s=h+o;H[e]={},H[e].false=r,H[e].true=s}function W(e,t,o){const r=o&&o.add||s,i=o&&o.rm||a,c=o&&o.listeners||"eventListeners",p=o&&o.rmAll||"removeAllListeners",f=d(r),g="."+r+":",_=function(e,t,n){if(e.isRemoved)return;const o=e.callback;"object"==typeof o&&o.handleEvent&&(e.callback=e=>o.handleEvent(e),e.originalDelegate=o),e.invoke(e,t,[n]);const r=e.options;r&&"object"==typeof r&&r.once&&t[i].call(t,n.type,e.originalDelegate?e.originalDelegate:e.callback,r)},k=function(t){if(!(t=t||e.event))return;const n=this||t.target||e,o=n[H[t.type].false];if(o)if(1===o.length)_(o[0],n,t);else{const e=o.slice();for(let o=0;o<e.length&&(!t||!0!==t[G]);o++)_(e[o],n,t)}},m=function(t){if(!(t=t||e.event))return;const n=this||t.target||e,o=n[H[t.type].true];if(o)if(1===o.length)_(o[0],n,t);else{const e=o.slice();for(let o=0;o<e.length&&(!t||!0!==t[G]);o++)_(e[o],n,t)}};function y(t,o){if(!t)return!1;let s=!0;o&&void 0!==o.useG&&(s=o.useG);const a=o&&o.vh;let _=!0;o&&void 0!==o.chkDup&&(_=o.chkDup);let y=!1;o&&void 0!==o.rt&&(y=o.rt);let v=t;for(;v&&!v.hasOwnProperty(r);)v=n(v);if(!v&&t[r]&&(v=t),!v)return!1;if(v[f])return!1;const T=o&&o.eventNameToString,E={},w=v[f]=v[r],Z=v[d(i)]=v[i],S=v[d(c)]=v[c],D=v[d(p)]=v[p];let P;function O(e,t){return!L&&"object"==typeof e&&e?!!e.capture:L&&t?"boolean"==typeof e?{capture:e,passive:!0}:e?"object"==typeof e&&!1!==e.passive?Object.assign(Object.assign({},e),{passive:!0}):e:{passive:!0}:e}o&&o.prepend&&(P=v[d(o.prepend)]=v[o.prepend]);const C=s?function(e){if(!E.isExisting)return w.call(E.target,E.eventName,E.capture?m:k,E.options)}:function(e){return w.call(E.target,E.eventName,e.invoke,E.options)},z=s?function(e){if(!e.isRemoved){const t=H[e.eventName];let n;t&&(n=t[e.capture?l:u]);const o=n&&e.target[n];if(o)for(let r=0;r<o.length;r++)if(o[r]===e){o.splice(r,1),e.isRemoved=!0,0===o.length&&(e.allRemoved=!0,e.target[n]=null);break}}if(e.allRemoved)return Z.call(e.target,e.eventName,e.capture?m:k,e.options)}:function(e){return Z.call(e.target,e.eventName,e.invoke,e.options)},j=o&&o.diff?o.diff:function(e,t){const n=typeof t;return"function"===n&&e.callback===t||"object"===n&&e.originalDelegate===t},R=Zone[d("UNPATCHED_EVENTS")],M=e[d("PASSIVE_EVENTS")],N=function(t,n,r,i,c=!1,h=!1){return function(){const p=this||e;let f=arguments[0];o&&o.transferEventName&&(f=o.transferEventName(f));let d=arguments[1];if(!d)return t.apply(this,arguments);if(b&&"uncaughtException"===f)return t.apply(this,arguments);let g=!1;if("function"!=typeof d){if(!d.handleEvent)return t.apply(this,arguments);g=!0}if(a&&!a(t,d,p,arguments))return;const k=L&&!!M&&-1!==M.indexOf(f),m=O(arguments[2],k);if(R)for(let e=0;e<R.length;e++)if(f===R[e])return k?t.call(p,f,d,m):t.apply(this,arguments);const y=!!m&&("boolean"==typeof m||m.capture),v=!(!m||"object"!=typeof m)&&m.once,w=Zone.current;let Z=H[f];Z||(B(f,T),Z=H[f]);const S=Z[y?l:u];let D,P=p[S],C=!1;if(P){if(C=!0,_)for(let e=0;e<P.length;e++)if(j(P[e],d))return}else P=p[S]=[];const z=p.constructor.name,I=F[z];I&&(D=I[f]),D||(D=z+n+(T?T(f):f)),E.options=m,v&&(E.options.once=!1),E.target=p,E.capture=y,E.eventName=f,E.isExisting=C;const N=s?A:void 0;N&&(N.taskData=E);const x=w.scheduleEventTask(D,d,N,r,i);return E.target=null,N&&(N.taskData=null),v&&(m.once=!0),(L||"boolean"!=typeof x.options)&&(x.options=m),x.target=p,x.capture=y,x.eventName=f,g&&(x.originalDelegate=d),h?P.unshift(x):P.push(x),c?p:void 0}};return v[r]=N(w,g,C,z,y),P&&(v.prependListener=N(P,".prependListener:",function(e){return P.call(E.target,E.eventName,e.invoke,E.options)},z,y,!0)),v[i]=function(){const t=this||e;let n=arguments[0];o&&o.transferEventName&&(n=o.transferEventName(n));const r=arguments[2],s=!!r&&("boolean"==typeof r||r.capture),i=arguments[1];if(!i)return Z.apply(this,arguments);if(a&&!a(Z,i,t,arguments))return;const c=H[n];let p;c&&(p=c[s?l:u]);const f=p&&t[p];if(f)for(let e=0;e<f.length;e++){const o=f[e];if(j(o,i))return f.splice(e,1),o.isRemoved=!0,0===f.length&&(o.allRemoved=!0,t[p]=null,"string"==typeof n)&&(t[h+"ON_PROPERTY"+n]=null),o.zone.cancelTask(o),y?t:void 0}return Z.apply(this,arguments)},v[c]=function(){const t=this||e;let n=arguments[0];o&&o.transferEventName&&(n=o.transferEventName(n));const r=[],s=U(t,T?T(n):n);for(let e=0;e<s.length;e++){const t=s[e];r.push(t.originalDelegate?t.originalDelegate:t.callback)}return r},v[p]=function(){const t=this||e;let n=arguments[0];if(n){o&&o.transferEventName&&(n=o.transferEventName(n));const e=H[n];if(e){const o=t[e.false],r=t[e.true];if(o){const e=o.slice();for(let t=0;t<e.length;t++){const o=e[t];this[i].call(this,n,o.originalDelegate?o.originalDelegate:o.callback,o.options)}}if(r){const e=r.slice();for(let t=0;t<e.length;t++){const o=e[t];this[i].call(this,n,o.originalDelegate?o.originalDelegate:o.callback,o.options)}}}}else{const e=Object.keys(t);for(let t=0;t<e.length;t++){const n=q.exec(e[t]);let o=n&&n[1];o&&"removeListener"!==o&&this[p].call(this,o)}this[p].call(this,"removeListener")}if(y)return this},I(v[r],w),I(v[i],Z),D&&I(v[p],D),S&&I(v[c],S),!0}let v=[];for(let n=0;n<t.length;n++)v[n]=y(t[n],o);return v}function U(e,t){if(!t){const n=[];for(let o in e){const r=q.exec(o);let s=r&&r[1];if(s&&(!t||s===t)){const t=e[o];if(t)for(let e=0;e<t.length;e++)n.push(t[e])}}return n}let n=H[t];n||(B(t),n=H[t]);const o=e[n.false],r=e[n.true];return o?r?o.concat(r):o.slice():r?r.slice():[]}function V(e,t){const n=e.Event;n&&n.prototype&&t.patchMethod(n.prototype,"stopImmediatePropagation",e=>function(t,n){t[G]=!0,e&&e.apply(t,n)})}function $(e,t,n,o,r){const s=Zone.__symbol__(o);if(t[s])return;const a=t[s]=t[o];t[o]=function(s,i,c){return i&&i.prototype&&r.forEach(function(t){const r=`${n}.${o}::`+t,s=i.prototype;if(s.hasOwnProperty(t)){const n=e.ObjectGetOwnPropertyDescriptor(s,t);n&&n.value?(n.value=e.wrapWithCurrentZone(n.value,r),e._redefineProperty(i.prototype,t,n)):s[t]&&(s[t]=e.wrapWithCurrentZone(s[t],r))}else s[t]&&(s[t]=e.wrapWithCurrentZone(s[t],r))}),a.call(t,s,i,c)},e.attachOriginToPatched(t[o],a)}const X=["absolutedeviceorientation","afterinput","afterprint","appinstalled","beforeinstallprompt","beforeprint","beforeunload","devicelight","devicemotion","deviceorientation","deviceorientationabsolute","deviceproximity","hashchange","languagechange","message","mozbeforepaint","offline","online","paint","pageshow","pagehide","popstate","rejectionhandled","storage","unhandledrejection","unload","userproximity","vrdisplayconnected","vrdisplaydisconnected","vrdisplaypresentchange"],Y=["encrypted","waitingforkey","msneedkey","mozinterruptbegin","mozinterruptend"],J=["load"],K=["blur","error","focus","load","resize","scroll","messageerror"],Q=["bounce","finish","start"],ee=["loadstart","progress","abort","error","load","progress","timeout","loadend","readystatechange"],te=["upgradeneeded","complete","abort","success","error","blocked","versionchange","close"],ne=["close","error","open","message"],oe=["error","message"],re=["abort","animationcancel","animationend","animationiteration","auxclick","beforeinput","blur","cancel","canplay","canplaythrough","change","compositionstart","compositionupdate","compositionend","cuechange","click","close","contextmenu","curechange","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","drop","durationchange","emptied","ended","error","focus","focusin","focusout","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadstart","loadeddata","loadedmetadata","lostpointercapture","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","orientationchange","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointerlockchange","mozpointerlockchange","webkitpointerlockerchange","pointerlockerror","mozpointerlockerror","webkitpointerlockerror","pointermove","pointout","pointerover","pointerup","progress","ratechange","reset","resize","scroll","seeked","seeking","select","selectionchange","selectstart","show","sort","stalled","submit","suspend","timeupdate","volumechange","touchcancel","touchmove","touchstart","touchend","transitioncancel","transitionend","waiting","wheel"].concat(["webglcontextrestored","webglcontextlost","webglcontextcreationerror"],["autocomplete","autocompleteerror"],["toggle"],["afterscriptexecute","beforescriptexecute","DOMContentLoaded","freeze","fullscreenchange","mozfullscreenchange","webkitfullscreenchange","msfullscreenchange","fullscreenerror","mozfullscreenerror","webkitfullscreenerror","msfullscreenerror","readystatechange","visibilitychange","resume"],X,["beforecopy","beforecut","beforepaste","copy","cut","paste","dragstart","loadend","animationstart","search","transitionrun","transitionstart","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkittransitionend"],["activate","afterupdate","ariarequest","beforeactivate","beforedeactivate","beforeeditfocus","beforeupdate","cellchange","controlselect","dataavailable","datasetchanged","datasetcomplete","errorupdate","filterchange","layoutcomplete","losecapture","move","moveend","movestart","propertychange","resizeend","resizestart","rowenter","rowexit","rowsdelete","rowsinserted","command","compassneedscalibration","deactivate","help","mscontentzoom","msmanipulationstatechanged","msgesturechange","msgesturedoubletap","msgestureend","msgesturehold","msgesturestart","msgesturetap","msgotpointercapture","msinertiastart","mslostpointercapture","mspointercancel","mspointerdown","mspointerenter","mspointerhover","mspointerleave","mspointermove","mspointerout","mspointerover","mspointerup","pointerout","mssitemodejumplistitemremoved","msthumbnailclick","stop","storagecommit"]);function se(e,t,n){if(!n||0===n.length)return t;const o=n.filter(t=>t.target===e);if(!o||0===o.length)return t;const r=o[0].ignoreProperties;return t.filter(e=>-1===r.indexOf(e))}function ae(e,t,n,o){e&&P(e,se(e,t,n),o)}function ie(e,t){if(b&&!w)return;if(Zone[e.symbol("patchEvents")])return;const o="undefined"!=typeof WebSocket,r=t.__Zone_ignore_on_properties;if(E){const e=window,t=N()?[{target:e,ignoreProperties:["error"]}]:[];ae(e,re.concat(["messageerror"]),r?r.concat(t):r,n(e)),ae(Document.prototype,re,r),void 0!==e.SVGElement&&ae(e.SVGElement.prototype,re,r),ae(Element.prototype,re,r),ae(HTMLElement.prototype,re,r),ae(HTMLMediaElement.prototype,Y,r),ae(HTMLFrameSetElement.prototype,X.concat(K),r),ae(HTMLBodyElement.prototype,X.concat(K),r),ae(HTMLFrameElement.prototype,J,r),ae(HTMLIFrameElement.prototype,J,r);const o=e.HTMLMarqueeElement;o&&ae(o.prototype,Q,r);const s=e.Worker;s&&ae(s.prototype,oe,r)}const s=t.XMLHttpRequest;s&&ae(s.prototype,ee,r);const a=t.XMLHttpRequestEventTarget;a&&ae(a&&a.prototype,ee,r),"undefined"!=typeof IDBIndex&&(ae(IDBIndex.prototype,te,r),ae(IDBRequest.prototype,te,r),ae(IDBOpenDBRequest.prototype,te,r),ae(IDBDatabase.prototype,te,r),ae(IDBTransaction.prototype,te,r),ae(IDBCursor.prototype,te,r)),o&&ae(WebSocket.prototype,ne,r)}Zone.__load_patch("util",(n,i,c)=>{c.patchOnProperties=P,c.patchMethod=z,c.bindArguments=y,c.patchMacroTask=j;const f=i.__symbol__("BLACK_LISTED_EVENTS"),d=i.__symbol__("UNPATCHED_EVENTS");n[d]&&(n[f]=n[d]),n[f]&&(i[f]=i[d]=n[f]),c.patchEventPrototype=V,c.patchEventTarget=W,c.isIEOrEdge=x,c.ObjectDefineProperty=t,c.ObjectGetOwnPropertyDescriptor=e,c.ObjectCreate=o,c.ArraySlice=r,c.patchClass=C,c.wrapWithCurrentZone=p,c.filterProperties=se,c.attachOriginToPatched=I,c._redefineProperty=Object.defineProperty,c.patchCallbacks=$,c.getGlobalObjects=()=>({globalSources:F,zoneSymbolEventNames:H,eventNames:re,isBrowser:E,isMix:w,isNode:b,TRUE_STR:l,FALSE_STR:u,ZONE_SYMBOL_PREFIX:h,ADD_EVENT_LISTENER_STR:s,REMOVE_EVENT_LISTENER_STR:a})});const ce=d("zoneTask");function le(e,t,n,o){let r=null,s=null;n+=o;const a={};function i(t){const n=t.data;return n.args[0]=function(){return t.invoke.apply(this,arguments)},n.handleId=r.apply(e,n.args),t}function c(t){return s.call(e,t.data.handleId)}r=z(e,t+=o,n=>function(r,s){if("function"==typeof s[0]){const e={isPeriodic:"Interval"===o,delay:"Timeout"===o||"Interval"===o?s[1]||0:void 0,args:s},n=s[0];s[0]=function(){try{return n.apply(this,arguments)}finally{e.isPeriodic||("number"==typeof e.handleId?delete a[e.handleId]:e.handleId&&(e.handleId[ce]=null))}};const r=f(t,s[0],e,i,c);if(!r)return r;const l=r.data.handleId;return"number"==typeof l?a[l]=r:l&&(l[ce]=r),l&&l.ref&&l.unref&&"function"==typeof l.ref&&"function"==typeof l.unref&&(r.ref=l.ref.bind(l),r.unref=l.unref.bind(l)),"number"==typeof l||l?l:r}return n.apply(e,s)}),s=z(e,n,t=>function(n,o){const r=o[0];let s;"number"==typeof r?s=a[r]:(s=r&&r[ce],s||(s=r)),s&&"string"==typeof s.type?"notScheduled"!==s.state&&(s.cancelFn&&s.data.isPeriodic||0===s.runCount)&&("number"==typeof r?delete a[r]:r&&(r[ce]=null),s.zone.cancelTask(s)):t.apply(e,o)})}function ue(e,t){if(Zone[t.symbol("patchEventTarget")])return;const{eventNames:n,zoneSymbolEventNames:o,TRUE_STR:r,FALSE_STR:s,ZONE_SYMBOL_PREFIX:a}=t.getGlobalObjects();for(let c=0;c<n.length;c++){const e=n[c],t=a+(e+s),i=a+(e+r);o[e]={},o[e][s]=t,o[e][r]=i}const i=e.EventTarget;return i&&i.prototype?(t.patchEventTarget(e,[i&&i.prototype]),!0):void 0}Zone.__load_patch("legacy",e=>{const t=e[Zone.__symbol__("legacyPatch")];t&&t()}),Zone.__load_patch("queueMicrotask",(e,t,n)=>{n.patchMethod(e,"queueMicrotask",e=>function(e,n){t.current.scheduleMicroTask("queueMicrotask",n[0])})}),Zone.__load_patch("timers",e=>{const t="set",n="clear";le(e,t,n,"Timeout"),le(e,t,n,"Interval"),le(e,t,n,"Immediate")}),Zone.__load_patch("requestAnimationFrame",e=>{le(e,"request","cancel","AnimationFrame"),le(e,"mozRequest","mozCancel","AnimationFrame"),le(e,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(e,t)=>{const n=["alert","prompt","confirm"];for(let o=0;o<n.length;o++)z(e,n[o],(n,o,r)=>function(o,s){return t.current.run(n,e,s,r)})}),Zone.__load_patch("EventTarget",(e,t,n)=>{!function(e,t){t.patchEventPrototype(e,t)}(e,n),ue(e,n);const o=e.XMLHttpRequestEventTarget;o&&o.prototype&&n.patchEventTarget(e,[o.prototype])}),Zone.__load_patch("MutationObserver",(e,t,n)=>{C("MutationObserver"),C("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(e,t,n)=>{C("IntersectionObserver")}),Zone.__load_patch("FileReader",(e,t,n)=>{C("FileReader")}),Zone.__load_patch("on_property",(e,t,n)=>{ie(n,e)}),Zone.__load_patch("customElements",(e,t,n)=>{!function(e,t){const{isBrowser:n,isMix:o}=t.getGlobalObjects();(n||o)&&e.customElements&&"customElements"in e&&t.patchCallbacks(t,e.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(e,n)}),Zone.__load_patch("XHR",(e,t)=>{!function(e){const u=e.XMLHttpRequest;if(!u)return;const h=u.prototype;let p=h[i],g=h[c];if(!p){const t=e.XMLHttpRequestEventTarget;if(t){const e=t.prototype;p=e[i],g=e[c]}}const _="readystatechange",k="scheduled";function m(e){const o=e.data,a=o.target;a[s]=!1,a[l]=!1;const u=a[r];p||(p=a[i],g=a[c]),u&&g.call(a,_,u);const h=a[r]=()=>{if(a.readyState===a.DONE)if(!o.aborted&&a[s]&&e.state===k){const n=a[t.__symbol__("loadfalse")];if(0!==a.status&&n&&n.length>0){const r=e.invoke;e.invoke=function(){const n=a[t.__symbol__("loadfalse")];for(let t=0;t<n.length;t++)n[t]===e&&n.splice(t,1);o.aborted||e.state!==k||r.call(e)},n.push(e)}else e.invoke()}else o.aborted||!1!==a[s]||(a[l]=!0)};return p.call(a,_,h),a[n]||(a[n]=e),w.apply(a,o.args),a[s]=!0,e}function y(){}function v(e){const t=e.data;return t.aborted=!0,Z.apply(t.target,t.args)}const T=z(h,"open",()=>function(e,t){return e[o]=0==t[2],e[a]=t[1],T.apply(e,t)}),b=d("fetchTaskAborting"),E=d("fetchTaskScheduling"),w=z(h,"send",()=>function(e,n){if(!0===t.current[E])return w.apply(e,n);if(e[o])return w.apply(e,n);{const t={target:e,url:e[a],isPeriodic:!1,args:n,aborted:!1},o=f("XMLHttpRequest.send",y,t,m,v);e&&!0===e[l]&&!t.aborted&&o.state===k&&o.invoke()}}),Z=z(h,"abort",()=>function(e,o){const r=e[n];if(r&&"string"==typeof r.type){if(null==r.cancelFn||r.data&&r.data.aborted)return;r.zone.cancelTask(r)}else if(!0===t.current[b])return Z.apply(e,o)})}(e);const n=d("xhrTask"),o=d("xhrSync"),r=d("xhrListener"),s=d("xhrScheduled"),a=d("xhrURL"),l=d("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",t=>{t.navigator&&t.navigator.geolocation&&function(t,n){const o=t.constructor.name;for(let r=0;r<n.length;r++){const s=n[r],a=t[s];if(a){if(!v(e(t,s)))continue;t[s]=(e=>{const t=function(){return e.apply(this,y(arguments,o+"."+s))};return I(t,e),t})(a)}}}(t.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(e,t)=>{function n(t){return function(n){U(e,t).forEach(o=>{const r=e.PromiseRejectionEvent;if(r){const e=new r(t,{promise:n.promise,reason:n.rejection});o.invoke(e)}})}}e.PromiseRejectionEvent&&(t[d("unhandledPromiseRejectionHandler")]=n("unhandledrejection"),t[d("rejectionHandledHandler")]=n("rejectionhandled"))})},796:(e,t,n)=>{"use strict";n(167)}},e=>{"use strict";e(e.s=796)}]);

(self.webpackChunkcoverage_app=self.webpackChunkcoverage_app||[]).push([[179],{255:t=>{function e(t){return Promise.resolve().then(()=>{var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e})}e.keys=()=>[],e.resolve=e,e.id=255,t.exports=e},520:(t,e,n)=>{"use strict";function s(t){return"function"==typeof t}let r=!1;const i={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){if(t){const t=new Error;console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n"+t.stack)}else r&&console.log("RxJS: Back to a better error behavior. Thank you. <3");r=t},get useDeprecatedSynchronousErrorHandling(){return r}};function o(t){setTimeout(()=>{throw t},0)}const l={closed:!0,next(t){},error(t){if(i.useDeprecatedSynchronousErrorHandling)throw t;o(t)},complete(){}},a=(()=>Array.isArray||(t=>t&&"number"==typeof t.length))();function c(t){return null!==t&&"object"==typeof t}const u=(()=>{function t(t){return Error.call(this),this.message=t?`${t.length} errors occurred during unsubscription:\n${t.map((t,e)=>`${e+1}) ${t.toString()}`).join("\n  ")}`:"",this.name="UnsubscriptionError",this.errors=t,this}return t.prototype=Object.create(Error.prototype),t})();let h=(()=>{class t{constructor(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._ctorUnsubscribe=!0,this._unsubscribe=t)}unsubscribe(){let e;if(this.closed)return;let{_parentOrParents:n,_ctorUnsubscribe:r,_unsubscribe:i,_subscriptions:o}=this;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,n instanceof t)n.remove(this);else if(null!==n)for(let t=0;t<n.length;++t)n[t].remove(this);if(s(i)){r&&(this._unsubscribe=void 0);try{i.call(this)}catch(l){e=l instanceof u?d(l.errors):[l]}}if(a(o)){let t=-1,n=o.length;for(;++t<n;){const n=o[t];if(c(n))try{n.unsubscribe()}catch(l){e=e||[],l instanceof u?e=e.concat(d(l.errors)):e.push(l)}}}if(e)throw new u(e)}add(e){let n=e;if(!e)return t.EMPTY;switch(typeof e){case"function":n=new t(e);case"object":if(n===this||n.closed||"function"!=typeof n.unsubscribe)return n;if(this.closed)return n.unsubscribe(),n;if(!(n instanceof t)){const e=n;n=new t,n._subscriptions=[e]}break;default:throw new Error("unrecognized teardown "+e+" added to Subscription.")}let{_parentOrParents:s}=n;if(null===s)n._parentOrParents=this;else if(s instanceof t){if(s===this)return n;n._parentOrParents=[s,this]}else{if(-1!==s.indexOf(this))return n;s.push(this)}const r=this._subscriptions;return null===r?this._subscriptions=[n]:r.push(n),n}remove(t){const e=this._subscriptions;if(e){const n=e.indexOf(t);-1!==n&&e.splice(n,1)}}}return t.EMPTY=function(t){return t.closed=!0,t}(new t),t})();function d(t){return t.reduce((t,e)=>t.concat(e instanceof u?e.errors:e),[])}const f=(()=>"function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random())();class p extends h{constructor(t,e,n){switch(super(),this.syncErrorValue=null,this.syncErrorThrown=!1,this.syncErrorThrowable=!1,this.isStopped=!1,arguments.length){case 0:this.destination=l;break;case 1:if(!t){this.destination=l;break}if("object"==typeof t){t instanceof p?(this.syncErrorThrowable=t.syncErrorThrowable,this.destination=t,t.add(this)):(this.syncErrorThrowable=!0,this.destination=new g(this,t));break}default:this.syncErrorThrowable=!0,this.destination=new g(this,t,e,n)}}[f](){return this}static create(t,e,n){const s=new p(t,e,n);return s.syncErrorThrowable=!1,s}next(t){this.isStopped||this._next(t)}error(t){this.isStopped||(this.isStopped=!0,this._error(t))}complete(){this.isStopped||(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe())}_next(t){this.destination.next(t)}_error(t){this.destination.error(t),this.unsubscribe()}_complete(){this.destination.complete(),this.unsubscribe()}_unsubscribeAndRecycle(){const{_parentOrParents:t}=this;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this}}class g extends p{constructor(t,e,n,r){let i;super(),this._parentSubscriber=t;let o=this;s(e)?i=e:e&&(i=e.next,n=e.error,r=e.complete,e!==l&&(o=Object.create(e),s(o.unsubscribe)&&this.add(o.unsubscribe.bind(o)),o.unsubscribe=this.unsubscribe.bind(this))),this._context=o,this._next=i,this._error=n,this._complete=r}next(t){if(!this.isStopped&&this._next){const{_parentSubscriber:e}=this;i.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}}error(t){if(!this.isStopped){const{_parentSubscriber:e}=this,{useDeprecatedSynchronousErrorHandling:n}=i;if(this._error)n&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)n?(e.syncErrorValue=t,e.syncErrorThrown=!0):o(t),this.unsubscribe();else{if(this.unsubscribe(),n)throw t;o(t)}}}complete(){if(!this.isStopped){const{_parentSubscriber:t}=this;if(this._complete){const e=()=>this._complete.call(this._context);i.useDeprecatedSynchronousErrorHandling&&t.syncErrorThrowable?(this.__tryOrSetError(t,e),this.unsubscribe()):(this.__tryOrUnsub(e),this.unsubscribe())}else this.unsubscribe()}}__tryOrUnsub(t,e){try{t.call(this._context,e)}catch(n){if(this.unsubscribe(),i.useDeprecatedSynchronousErrorHandling)throw n;o(n)}}__tryOrSetError(t,e,n){if(!i.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,n)}catch(s){return i.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=s,t.syncErrorThrown=!0,!0):(o(s),!0)}return!1}_unsubscribe(){const{_parentSubscriber:t}=this;this._context=null,this._parentSubscriber=null,t.unsubscribe()}}const v=(()=>"function"==typeof Symbol&&Symbol.observable||"@@observable")();function y(t){return t}let _=(()=>{class t{constructor(t){this._isScalar=!1,t&&(this._subscribe=t)}lift(e){const n=new t;return n.source=this,n.operator=e,n}subscribe(t,e,n){const{operator:s}=this,r=function(t,e,n){if(t){if(t instanceof p)return t;if(t[f])return t[f]()}return t||e||n?new p(t,e,n):new p(l)}(t,e,n);if(r.add(s?s.call(r,this.source):this.source||i.useDeprecatedSynchronousErrorHandling&&!r.syncErrorThrowable?this._subscribe(r):this._trySubscribe(r)),i.useDeprecatedSynchronousErrorHandling&&r.syncErrorThrowable&&(r.syncErrorThrowable=!1,r.syncErrorThrown))throw r.syncErrorValue;return r}_trySubscribe(t){try{return this._subscribe(t)}catch(e){i.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),function(t){for(;t;){const{closed:e,destination:n,isStopped:s}=t;if(e||s)return!1;t=n&&n instanceof p?n:null}return!0}(t)?t.error(e):console.warn(e)}}forEach(t,e){return new(e=m(e))((e,n)=>{let s;s=this.subscribe(e=>{try{t(e)}catch(r){n(r),s&&s.unsubscribe()}},n,e)})}_subscribe(t){const{source:e}=this;return e&&e.subscribe(t)}[v](){return this}pipe(...t){return 0===t.length?this:(0===(e=t).length?y:1===e.length?e[0]:function(t){return e.reduce((t,e)=>e(t),t)})(this);var e}toPromise(t){return new(t=m(t))((t,e)=>{let n;this.subscribe(t=>n=t,t=>e(t),()=>t(n))})}}return t.create=e=>new t(e),t})();function m(t){if(t||(t=i.Promise||Promise),!t)throw new Error("no Promise impl found");return t}const b=(()=>{function t(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}return t.prototype=Object.create(Error.prototype),t})();class C extends h{constructor(t,e){super(),this.subject=t,this.subscriber=e,this.closed=!1}unsubscribe(){if(this.closed)return;this.closed=!0;const t=this.subject,e=t.observers;if(this.subject=null,!e||0===e.length||t.isStopped||t.closed)return;const n=e.indexOf(this.subscriber);-1!==n&&e.splice(n,1)}}class w extends p{constructor(t){super(t),this.destination=t}}let E=(()=>{class t extends _{constructor(){super(),this.observers=[],this.closed=!1,this.isStopped=!1,this.hasError=!1,this.thrownError=null}[f](){return new w(this)}lift(t){const e=new x(this,this);return e.operator=t,e}next(t){if(this.closed)throw new b;if(!this.isStopped){const{observers:e}=this,n=e.length,s=e.slice();for(let r=0;r<n;r++)s[r].next(t)}}error(t){if(this.closed)throw new b;this.hasError=!0,this.thrownError=t,this.isStopped=!0;const{observers:e}=this,n=e.length,s=e.slice();for(let r=0;r<n;r++)s[r].error(t);this.observers.length=0}complete(){if(this.closed)throw new b;this.isStopped=!0;const{observers:t}=this,e=t.length,n=t.slice();for(let s=0;s<e;s++)n[s].complete();this.observers.length=0}unsubscribe(){this.isStopped=!0,this.closed=!0,this.observers=null}_trySubscribe(t){if(this.closed)throw new b;return super._trySubscribe(t)}_subscribe(t){if(this.closed)throw new b;return this.hasError?(t.error(this.thrownError),h.EMPTY):this.isStopped?(t.complete(),h.EMPTY):(this.observers.push(t),new C(this,t))}asObservable(){const t=new _;return t.source=this,t}}return t.create=(t,e)=>new x(t,e),t})();class x extends E{constructor(t,e){super(),this.destination=t,this.source=e}next(t){const{destination:e}=this;e&&e.next&&e.next(t)}error(t){const{destination:e}=this;e&&e.error&&this.destination.error(t)}complete(){const{destination:t}=this;t&&t.complete&&this.destination.complete()}_subscribe(t){const{source:e}=this;return e?this.source.subscribe(t):h.EMPTY}}function k(t,e){return function(n){if("function"!=typeof t)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return n.lift(new A(t,e))}}class A{constructor(t,e){this.project=t,this.thisArg=e}call(t,e){return e.subscribe(new O(t,this.project,this.thisArg))}}class O extends p{constructor(t,e,n){super(t),this.project=e,this.count=0,this.thisArg=n||this}_next(t){let e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(n){return void this.destination.error(n)}this.destination.next(e)}}const I=t=>e=>{for(let n=0,s=t.length;n<s&&!e.closed;n++)e.next(t[n]);e.complete()};function S(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}const T=S(),V=t=>t&&"number"==typeof t.length&&"function"!=typeof t;function D(t){return!!t&&"function"!=typeof t.subscribe&&"function"==typeof t.then}const H=t=>{if(t&&"function"==typeof t[v])return n=t,t=>{const e=n[v]();if("function"!=typeof e.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return e.subscribe(t)};if(V(t))return I(t);if(D(t))return(t=>e=>(t.then(t=>{e.closed||(e.next(t),e.complete())},t=>e.error(t)).then(null,o),e))(t);if(t&&"function"==typeof t[T])return e=t,t=>{const n=e[T]();for(;;){let e;try{e=n.next()}catch(s){return t.error(s),t}if(e.done){t.complete();break}if(t.next(e.value),t.closed)break}return"function"==typeof n.return&&t.add(()=>{n.return&&n.return()}),t};{const e=c(t)?"an invalid object":`'${t}'`;throw new TypeError(`You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`)}var e,n};function N(t,e){return new _(n=>{const s=new h;let r=0;return s.add(e.schedule(function(){r!==t.length?(n.next(t[r++]),n.closed||s.add(this.schedule())):n.complete()})),s})}function M(t,e){return e?function(t,e){if(null!=t){if(function(t){return t&&"function"==typeof t[v]}(t))return function(t,e){return new _(n=>{const s=new h;return s.add(e.schedule(()=>{const r=t[v]();s.add(r.subscribe({next(t){s.add(e.schedule(()=>n.next(t)))},error(t){s.add(e.schedule(()=>n.error(t)))},complete(){s.add(e.schedule(()=>n.complete()))}}))})),s})}(t,e);if(D(t))return function(t,e){return new _(n=>{const s=new h;return s.add(e.schedule(()=>t.then(t=>{s.add(e.schedule(()=>{n.next(t),s.add(e.schedule(()=>n.complete()))}))},t=>{s.add(e.schedule(()=>n.error(t)))}))),s})}(t,e);if(V(t))return N(t,e);if(function(t){return t&&"function"==typeof t[T]}(t)||"string"==typeof t)return function(t,e){if(!t)throw new Error("Iterable cannot be null");return new _(n=>{const s=new h;let r;return s.add(()=>{r&&"function"==typeof r.return&&r.return()}),s.add(e.schedule(()=>{r=t[T](),s.add(e.schedule(function(){if(n.closed)return;let t,e;try{const n=r.next();t=n.value,e=n.done}catch(s){return void n.error(s)}e?n.complete():(n.next(t),this.schedule())}))})),s})}(t,e)}throw new TypeError((null!==t&&typeof t||t)+" is not observable")}(t,e):t instanceof _?t:new _(H(t))}class P extends p{constructor(t){super(),this.parent=t}_next(t){this.parent.notifyNext(t)}_error(t){this.parent.notifyError(t),this.unsubscribe()}_complete(){this.parent.notifyComplete(),this.unsubscribe()}}class R extends p{notifyNext(t){this.destination.next(t)}notifyError(t){this.destination.error(t)}notifyComplete(){this.destination.complete()}}function j(t,e,n=Number.POSITIVE_INFINITY){return"function"==typeof e?s=>s.pipe(j((n,s)=>M(t(n,s)).pipe(k((t,r)=>e(n,t,s,r))),n)):("number"==typeof e&&(n=e),e=>e.lift(new F(t,n)))}class F{constructor(t,e=Number.POSITIVE_INFINITY){this.project=t,this.concurrent=e}call(t,e){return e.subscribe(new z(t,this.project,this.concurrent))}}class z extends R{constructor(t,e,n=Number.POSITIVE_INFINITY){super(t),this.project=e,this.concurrent=n,this.hasCompleted=!1,this.buffer=[],this.active=0,this.index=0}_next(t){this.active<this.concurrent?this._tryNext(t):this.buffer.push(t)}_tryNext(t){let e;const n=this.index++;try{e=this.project(t,n)}catch(s){return void this.destination.error(s)}this.active++,this._innerSub(e)}_innerSub(t){const e=new P(this),n=this.destination;n.add(e);const s=function(t,e){if(e.closed)return;if(t instanceof _)return t.subscribe(e);let n;try{n=H(t)(e)}catch(s){e.error(s)}return n}(t,e);s!==e&&n.add(s)}_complete(){this.hasCompleted=!0,0===this.active&&0===this.buffer.length&&this.destination.complete(),this.unsubscribe()}notifyNext(t){this.destination.next(t)}notifyComplete(){const t=this.buffer;this.active--,t.length>0?this._next(t.shift()):0===this.active&&this.hasCompleted&&this.destination.complete()}}function L(...t){let e=Number.POSITIVE_INFINITY,n=null,s=t[t.length-1];var r;return(r=s)&&"function"==typeof r.schedule?(n=t.pop(),t.length>1&&"number"==typeof t[t.length-1]&&(e=t.pop())):"number"==typeof s&&(e=t.pop()),null===n&&1===t.length&&t[0]instanceof _?t[0]:function(t=Number.POSITIVE_INFINITY){return j(y,t)}(e)(function(t,e){return e?N(t,e):new _(I(t))}(t,n))}function B(){return function(t){return t.lift(new $(t))}}class ${constructor(t){this.connectable=t}call(t,e){const{connectable:n}=this;n._refCount++;const s=new U(t,n),r=e.subscribe(s);return s.closed||(s.connection=n.connect()),r}}class U extends p{constructor(t,e){super(t),this.connectable=e}_unsubscribe(){const{connectable:t}=this;if(!t)return void(this.connection=null);this.connectable=null;const e=t._refCount;if(e<=0)return void(this.connection=null);if(t._refCount=e-1,e>1)return void(this.connection=null);const{connection:n}=this,s=t._connection;this.connection=null,!s||n&&s!==n||s.unsubscribe()}}class Z extends _{constructor(t,e){super(),this.source=t,this.subjectFactory=e,this._refCount=0,this._isComplete=!1}_subscribe(t){return this.getSubject().subscribe(t)}getSubject(){const t=this._subject;return t&&!t.isStopped||(this._subject=this.subjectFactory()),this._subject}connect(){let t=this._connection;return t||(this._isComplete=!1,t=this._connection=new h,t.add(this.source.subscribe(new W(this.getSubject(),this))),t.closed&&(this._connection=null,t=h.EMPTY)),t}refCount(){return B()(this)}}const q=(()=>{const t=Z.prototype;return{operator:{value:null},_refCount:{value:0,writable:!0},_subject:{value:null,writable:!0},_connection:{value:null,writable:!0},_subscribe:{value:t._subscribe},_isComplete:{value:t._isComplete,writable:!0},getSubject:{value:t.getSubject},connect:{value:t.connect},refCount:{value:t.refCount}}})();class W extends w{constructor(t,e){super(t),this.connectable=e}_error(t){this._unsubscribe(),super._error(t)}_complete(){this.connectable._isComplete=!0,this._unsubscribe(),super._complete()}_unsubscribe(){const t=this.connectable;if(t){this.connectable=null;const e=t._connection;t._refCount=0,t._subject=null,t._connection=null,e&&e.unsubscribe()}}}function G(){return new E}function Q(t){for(let e in t)if(t[e]===Q)return e;throw Error("Could not find renamed property on target object.")}function J(t,e){for(const n in e)e.hasOwnProperty(n)&&!t.hasOwnProperty(n)&&(t[n]=e[n])}function K(t){if("string"==typeof t)return t;if(Array.isArray(t))return"["+t.map(K).join(", ")+"]";if(null==t)return""+t;if(t.overriddenName)return`${t.overriddenName}`;if(t.name)return`${t.name}`;const e=t.toString();if(null==e)return""+e;const n=e.indexOf("\n");return-1===n?e:e.substring(0,n)}function Y(t,e){return null==t||""===t?null===e?"":e:null==e||""===e?t:t+" "+e}const X=Q({__forward_ref__:Q});function tt(t){return t.__forward_ref__=tt,t.toString=function(){return K(this())},t}function et(t){return nt(t)?t():t}function nt(t){return"function"==typeof t&&t.hasOwnProperty(X)&&t.__forward_ref__===tt}class st extends Error{constructor(t,e){super(function(t,e){return`${t?`NG0${t}: `:""}${e}`}(t,e)),this.code=t}}function rt(t){return"string"==typeof t?t:null==t?"":String(t)}function it(t){return"function"==typeof t?t.name||t.toString():"object"==typeof t&&null!=t&&"function"==typeof t.type?t.type.name||t.type.toString():rt(t)}function ot(t,e){const n=e?` in ${e}`:"";throw new st("201",`No provider for ${it(t)} found${n}`)}function lt(t){return{token:t.token,providedIn:t.providedIn||null,factory:t.factory,value:void 0}}function at(t){return{providers:t.providers||[],imports:t.imports||[]}}function ct(t){return ut(t,dt)||ut(t,pt)}function ut(t,e){return t.hasOwnProperty(e)?t[e]:null}function ht(t){return t&&(t.hasOwnProperty(ft)||t.hasOwnProperty(gt))?t[ft]:null}const dt=Q({"\u0275prov":Q}),ft=Q({"\u0275inj":Q}),pt=Q({ngInjectableDef:Q}),gt=Q({ngInjectorDef:Q});var vt=function(t){return t[t.Default=0]="Default",t[t.Host=1]="Host",t[t.Self=2]="Self",t[t.SkipSelf=4]="SkipSelf",t[t.Optional=8]="Optional",t}({});let yt;function _t(t){const e=yt;return yt=t,e}function mt(t,e,n){const s=ct(t);return s&&"root"==s.providedIn?void 0===s.value?s.value=s.factory():s.value:n&vt.Optional?null:void 0!==e?e:void ot(K(t),"Injector")}function bt(t){return{toString:t}.toString()}var Ct=function(t){return t[t.OnPush=0]="OnPush",t[t.Default=1]="Default",t}({}),wt=function(t){return t[t.Emulated=0]="Emulated",t[t.None=2]="None",t[t.ShadowDom=3]="ShadowDom",t}({});const Et="undefined"!=typeof globalThis&&globalThis,xt="undefined"!=typeof window&&window,kt="undefined"!=typeof self&&"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope&&self,At="undefined"!=typeof global&&global,Ot=Et||At||xt||kt,It={},St=[],Tt=Q({"\u0275cmp":Q}),Vt=Q({"\u0275dir":Q}),Dt=Q({"\u0275pipe":Q}),Ht=Q({"\u0275mod":Q}),Nt=Q({"\u0275loc":Q}),Mt=Q({"\u0275fac":Q}),Pt=Q({__NG_ELEMENT_ID__:Q});let Rt=0;function jt(t){return bt(()=>{const e={},n={type:t.type,providersResolver:null,decls:t.decls,vars:t.vars,factory:null,template:t.template||null,consts:t.consts||null,ngContentSelectors:t.ngContentSelectors,hostBindings:t.hostBindings||null,hostVars:t.hostVars||0,hostAttrs:t.hostAttrs||null,contentQueries:t.contentQueries||null,declaredInputs:e,inputs:null,outputs:null,exportAs:t.exportAs||null,onPush:t.changeDetection===Ct.OnPush,directiveDefs:null,pipeDefs:null,selectors:t.selectors||St,viewQuery:t.viewQuery||null,features:t.features||null,data:t.data||{},encapsulation:t.encapsulation||wt.Emulated,id:"c",styles:t.styles||St,_:null,setInput:null,schemas:t.schemas||null,tView:null},s=t.directives,r=t.features,i=t.pipes;return n.id+=Rt++,n.inputs=$t(t.inputs,e),n.outputs=$t(t.outputs),r&&r.forEach(t=>t(n)),n.directiveDefs=s?()=>("function"==typeof s?s():s).map(Ft):null,n.pipeDefs=i?()=>("function"==typeof i?i():i).map(zt):null,n})}function Ft(t){return qt(t)||function(t){return t[Vt]||null}(t)}function zt(t){return function(t){return t[Dt]||null}(t)}const Lt={};function Bt(t){const e={type:t.type,bootstrap:t.bootstrap||St,declarations:t.declarations||St,imports:t.imports||St,exports:t.exports||St,transitiveCompileScopes:null,schemas:t.schemas||null,id:t.id||null};return null!=t.id&&bt(()=>{Lt[t.id]=t.type}),e}function $t(t,e){if(null==t)return It;const n={};for(const s in t)if(t.hasOwnProperty(s)){let r=t[s],i=r;Array.isArray(r)&&(i=r[1],r=r[0]),n[r]=s,e&&(e[r]=i)}return n}const Ut=jt;function Zt(t){return{type:t.type,name:t.name,factory:null,pure:!1!==t.pure,onDestroy:t.type.prototype.ngOnDestroy||null}}function qt(t){return t[Tt]||null}function Wt(t,e){const n=t[Ht]||null;if(!n&&!0===e)throw new Error(`Type ${K(t)} does not have '\u0275mod' property.`);return n}const Gt=20,Qt=10;function Jt(t){return Array.isArray(t)&&"object"==typeof t[1]}function Kt(t){return Array.isArray(t)&&!0===t[1]}function Yt(t){return 0!=(8&t.flags)}function Xt(t){return 2==(2&t.flags)}function te(t){return 1==(1&t.flags)}function ee(t){return null!==t.template}function ne(t,e){return t.hasOwnProperty(Mt)?t[Mt]:null}class se{constructor(t,e,n){this.previousValue=t,this.currentValue=e,this.firstChange=n}isFirstChange(){return this.firstChange}}function re(){return ie}function ie(t){return t.type.prototype.ngOnChanges&&(t.setInput=le),oe}function oe(){const t=ae(this),e=null==t?void 0:t.current;if(e){const n=t.previous;if(n===It)t.previous=e;else for(let t in e)n[t]=e[t];t.current=null,this.ngOnChanges(e)}}function le(t,e,n,s){const r=ae(t)||function(t,e){return t.__ngSimpleChanges__=e}(t,{previous:It,current:null}),i=r.current||(r.current={}),o=r.previous,l=this.declaredInputs[n],a=o[l];i[l]=new se(a&&a.currentValue,e,o===It),t[s]=e}function ae(t){return t.__ngSimpleChanges__||null}re.ngInherit=!0;const ce="http://www.w3.org/2000/svg";let ue;function he(t){return!!t.listen}const de={createRenderer:(t,e)=>void 0!==ue?ue:"undefined"!=typeof document?document:void 0};function fe(t){for(;Array.isArray(t);)t=t[0];return t}function pe(t,e){return fe(e[t])}function ge(t,e){return fe(e[t.index])}function ve(t,e){return t.data[e]}function ye(t,e){const n=e[t];return Jt(n)?n:n[0]}function _e(t){return 128==(128&t[2])}function me(t,e){return null==e?null:t[e]}function be(t){t[18]=0}function Ce(t,e){t[5]+=e;let n=t,s=t[3];for(;null!==s&&(1===e&&1===n[5]||-1===e&&0===n[5]);)s[5]+=e,n=s,s=s[3]}const we={lFrame:Ue(null),bindingsEnabled:!0,isInCheckNoChangesMode:!1};function Ee(){return we.bindingsEnabled}function xe(){return we.lFrame.lView}function ke(){return we.lFrame.tView}function Ae(t){return we.lFrame.contextLView=t,t[8]}function Oe(){let t=Ie();for(;null!==t&&64===t.type;)t=t.parent;return t}function Ie(){return we.lFrame.currentTNode}function Se(t,e){const n=we.lFrame;n.currentTNode=t,n.isParent=e}function Te(){return we.lFrame.isParent}function Ve(){we.lFrame.isParent=!1}function De(){return we.isInCheckNoChangesMode}function He(t){we.isInCheckNoChangesMode=t}function Ne(){const t=we.lFrame;let e=t.bindingRootIndex;return-1===e&&(e=t.bindingRootIndex=t.tView.bindingStartIndex),e}function Me(){return we.lFrame.bindingIndex++}function Pe(t){const e=we.lFrame,n=e.bindingIndex;return e.bindingIndex=e.bindingIndex+t,n}function Re(t,e){const n=we.lFrame;n.bindingIndex=n.bindingRootIndex=t,je(e)}function je(t){we.lFrame.currentDirectiveIndex=t}function Fe(t){we.lFrame.currentQueryIndex=t}function ze(t){const e=t[1];return 2===e.type?e.declTNode:1===e.type?t[6]:null}function Le(t,e,n){if(n&vt.SkipSelf){let s=e,r=t;for(;s=s.parent,!(null!==s||n&vt.Host||(s=ze(r),null===s)||(r=r[15],10&s.type)););if(null===s)return!1;e=s,t=r}const s=we.lFrame=$e();return s.currentTNode=e,s.lView=t,!0}function Be(t){const e=$e(),n=t[1];we.lFrame=e,e.currentTNode=n.firstChild,e.lView=t,e.tView=n,e.contextLView=t,e.bindingIndex=n.bindingStartIndex,e.inI18n=!1}function $e(){const t=we.lFrame,e=null===t?null:t.child;return null===e?Ue(t):e}function Ue(t){const e={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:t,child:null,inI18n:!1};return null!==t&&(t.child=e),e}function Ze(){const t=we.lFrame;return we.lFrame=t.parent,t.currentTNode=null,t.lView=null,t}const qe=Ze;function We(){const t=Ze();t.isParent=!0,t.tView=null,t.selectedIndex=-1,t.contextLView=null,t.elementDepthCount=0,t.currentDirectiveIndex=-1,t.currentNamespace=null,t.bindingRootIndex=-1,t.bindingIndex=-1,t.currentQueryIndex=0}function Ge(){return we.lFrame.selectedIndex}function Qe(t){we.lFrame.selectedIndex=t}function Je(){const t=we.lFrame;return ve(t.tView,t.selectedIndex)}function Ke(t,e){for(let n=e.directiveStart,s=e.directiveEnd;n<s;n++){const e=t.data[n].type.prototype,{ngAfterContentInit:s,ngAfterContentChecked:r,ngAfterViewInit:i,ngAfterViewChecked:o,ngOnDestroy:l}=e;s&&(t.contentHooks||(t.contentHooks=[])).push(-n,s),r&&((t.contentHooks||(t.contentHooks=[])).push(n,r),(t.contentCheckHooks||(t.contentCheckHooks=[])).push(n,r)),i&&(t.viewHooks||(t.viewHooks=[])).push(-n,i),o&&((t.viewHooks||(t.viewHooks=[])).push(n,o),(t.viewCheckHooks||(t.viewCheckHooks=[])).push(n,o)),null!=l&&(t.destroyHooks||(t.destroyHooks=[])).push(n,l)}}function Ye(t,e,n){en(t,e,3,n)}function Xe(t,e,n,s){(3&t[2])===n&&en(t,e,n,s)}function tn(t,e){let n=t[2];(3&n)===e&&(n&=2047,n+=1,t[2]=n)}function en(t,e,n,s){const r=null!=s?s:-1,i=e.length-1;let o=0;for(let l=void 0!==s?65535&t[18]:0;l<i;l++)if("number"==typeof e[l+1]){if(o=e[l],null!=s&&o>=s)break}else e[l]<0&&(t[18]+=65536),(o<r||-1==r)&&(nn(t,n,e,l),t[18]=(4294901760&t[18])+l+2),l++}function nn(t,e,n,s){const r=n[s]<0,i=n[s+1],o=t[r?-n[s]:n[s]];if(r){if(t[2]>>11<t[18]>>16&&(3&t[2])===e){t[2]+=2048;try{i.call(o)}finally{}}}else try{i.call(o)}finally{}}const sn=-1;class rn{constructor(t,e,n){this.factory=t,this.resolving=!1,this.canSeeViewProviders=e,this.injectImpl=n}}function on(t,e,n){const s=he(t);let r=0;for(;r<n.length;){const i=n[r];if("number"==typeof i){if(0!==i)break;r++;const o=n[r++],l=n[r++],a=n[r++];s?t.setAttribute(e,l,a,o):e.setAttributeNS(o,l,a)}else{const o=i,l=n[++r];ln(o)?s&&t.setProperty(e,o,l):s?t.setAttribute(e,o,l):e.setAttribute(o,l),r++}}return r}function ln(t){return 64===t.charCodeAt(0)}function an(t,e){if(null===e||0===e.length);else if(null===t||0===t.length)t=e.slice();else{let n=-1;for(let s=0;s<e.length;s++){const r=e[s];"number"==typeof r?n=r:0===n||cn(t,n,r,null,-1===n||2===n?e[++s]:null)}}return t}function cn(t,e,n,s,r){let i=0,o=t.length;if(-1===e)o=-1;else for(;i<t.length;){const n=t[i++];if("number"==typeof n){if(n===e){o=-1;break}if(n>e){o=i-1;break}}}for(;i<t.length;){const e=t[i];if("number"==typeof e)break;if(e===n){if(null===s)return void(null!==r&&(t[i+1]=r));if(s===t[i+1])return void(t[i+2]=r)}i++,null!==s&&i++,null!==r&&i++}-1!==o&&(t.splice(o,0,e),i=o+1),t.splice(i++,0,n),null!==s&&t.splice(i++,0,s),null!==r&&t.splice(i++,0,r)}function un(t){return t!==sn}function hn(t){return 32767&t}function dn(t,e){let n=t>>16,s=e;for(;n>0;)s=s[15],n--;return s}let fn=!0;function pn(t){const e=fn;return fn=t,e}let gn=0;function vn(t,e){const n=_n(t,e);if(-1!==n)return n;const s=e[1];s.firstCreatePass&&(t.injectorIndex=e.length,yn(s.data,t),yn(e,null),yn(s.blueprint,null));const r=mn(t,e),i=t.injectorIndex;if(un(r)){const t=hn(r),n=dn(r,e),s=n[1].data;for(let r=0;r<8;r++)e[i+r]=n[t+r]|s[t+r]}return e[i+8]=r,i}function yn(t,e){t.push(0,0,0,0,0,0,0,0,e)}function _n(t,e){return-1===t.injectorIndex||t.parent&&t.parent.injectorIndex===t.injectorIndex||null===e[t.injectorIndex+8]?-1:t.injectorIndex}function mn(t,e){if(t.parent&&-1!==t.parent.injectorIndex)return t.parent.injectorIndex;let n=0,s=null,r=e;for(;null!==r;){const t=r[1],e=t.type;if(s=2===e?t.declTNode:1===e?r[6]:null,null===s)return sn;if(n++,r=r[15],-1!==s.injectorIndex)return s.injectorIndex|n<<16}return sn}function bn(t,e,n){!function(t,e,n){let s;"string"==typeof n?s=n.charCodeAt(0)||0:n.hasOwnProperty(Pt)&&(s=n[Pt]),null==s&&(s=n[Pt]=gn++);const r=255&s;e.data[t+(r>>5)]|=1<<r}(t,e,n)}function Cn(t,e,n){if(n&vt.Optional)return t;ot(e,"NodeInjector")}function wn(t,e,n,s){if(n&vt.Optional&&void 0===s&&(s=null),0==(n&(vt.Self|vt.Host))){const r=t[9],i=_t(void 0);try{return r?r.get(e,s,n&vt.Optional):mt(e,s,n&vt.Optional)}finally{_t(i)}}return Cn(s,e,n)}function En(t,e,n,s=vt.Default,r){if(null!==t){const i=function(t){if("string"==typeof t)return t.charCodeAt(0)||0;const e=t.hasOwnProperty(Pt)?t[Pt]:void 0;return"number"==typeof e?e>=0?255&e:kn:e}(n);if("function"==typeof i){if(!Le(e,t,s))return s&vt.Host?Cn(r,n,s):wn(e,n,s,r);try{const t=i(s);if(null!=t||s&vt.Optional)return t;ot(n)}finally{qe()}}else if("number"==typeof i){let r=null,o=_n(t,e),l=sn,a=s&vt.Host?e[16][6]:null;for((-1===o||s&vt.SkipSelf)&&(l=-1===o?mn(t,e):e[o+8],l!==sn&&Sn(s,!1)?(r=e[1],o=hn(l),e=dn(l,e)):o=-1);-1!==o;){const t=e[1];if(In(i,o,t.data)){const t=An(o,e,n,r,s,a);if(t!==xn)return t}l=e[o+8],l!==sn&&Sn(s,e[1].data[o+8]===a)&&In(i,o,e)?(r=t,o=hn(l),e=dn(l,e)):o=-1}}}return wn(e,n,s,r)}const xn={};function kn(){return new Tn(Oe(),xe())}function An(t,e,n,s,r,i){const o=e[1],l=o.data[t+8],a=function(t,e,n,s,r){const i=t.providerIndexes,o=e.data,l=1048575&i,a=t.directiveStart,c=i>>20,u=r?l+c:t.directiveEnd;for(let h=s?l:l+c;h<u;h++){const t=o[h];if(h<a&&n===t||h>=a&&t.type===n)return h}if(r){const t=o[a];if(t&&ee(t)&&t.type===n)return a}return null}(l,o,n,null==s?Xt(l)&&fn:s!=o&&0!=(3&l.type),r&vt.Host&&i===l);return null!==a?On(e,o,a,l):xn}function On(t,e,n,s){let r=t[n];const i=e.data;if(r instanceof rn){const o=r;o.resolving&&function(t,e){throw new st("200",`Circular dependency in DI detected for ${t}`)}(it(i[n]));const l=pn(o.canSeeViewProviders);o.resolving=!0;const a=o.injectImpl?_t(o.injectImpl):null;Le(t,s,vt.Default);try{r=t[n]=o.factory(void 0,i,t,s),e.firstCreatePass&&n>=s.directiveStart&&function(t,e,n){const{ngOnChanges:s,ngOnInit:r,ngDoCheck:i}=e.type.prototype;if(s){const s=ie(e);(n.preOrderHooks||(n.preOrderHooks=[])).push(t,s),(n.preOrderCheckHooks||(n.preOrderCheckHooks=[])).push(t,s)}r&&(n.preOrderHooks||(n.preOrderHooks=[])).push(0-t,r),i&&((n.preOrderHooks||(n.preOrderHooks=[])).push(t,i),(n.preOrderCheckHooks||(n.preOrderCheckHooks=[])).push(t,i))}(n,i[n],e)}finally{null!==a&&_t(a),pn(l),o.resolving=!1,qe()}}return r}function In(t,e,n){return!!(n[e+(t>>5)]&1<<t)}function Sn(t,e){return!(t&vt.Self||t&vt.Host&&e)}class Tn{constructor(t,e){this._tNode=t,this._lView=e}get(t,e){return En(this._tNode,this._lView,t,void 0,e)}}function Vn(t){return bt(()=>{const e=t.prototype.constructor,n=e[Mt]||Dn(e),s=Object.prototype;let r=Object.getPrototypeOf(t.prototype).constructor;for(;r&&r!==s;){const t=r[Mt]||Dn(r);if(t&&t!==n)return t;r=Object.getPrototypeOf(r)}return t=>new t})}function Dn(t){return nt(t)?()=>{const e=Dn(et(t));return e&&e()}:ne(t)}const Hn="__parameters__";function Nn(t,e,n){return bt(()=>{const s=function(t){return function(...e){if(t){const n=t(...e);for(const t in n)this[t]=n[t]}}}(e);function r(...t){if(this instanceof r)return s.apply(this,t),this;const e=new r(...t);return n.annotation=e,n;function n(t,n,s){const r=t.hasOwnProperty(Hn)?t[Hn]:Object.defineProperty(t,Hn,{value:[]})[Hn];for(;r.length<=s;)r.push(null);return(r[s]=r[s]||[]).push(e),t}}return n&&(r.prototype=Object.create(n.prototype)),r.prototype.ngMetadataName=t,r.annotationCls=r,r})}class Mn{constructor(t,e){this._desc=t,this.ngMetadataName="InjectionToken",this.\u0275prov=void 0,"number"==typeof e?this.__NG_ELEMENT_ID__=e:void 0!==e&&(this.\u0275prov=lt({token:this,providedIn:e.providedIn||"root",factory:e.factory}))}toString(){return`InjectionToken ${this._desc}`}}function Pn(t,e){t.forEach(t=>Array.isArray(t)?Pn(t,e):e(t))}function Rn(t,e,n){e>=t.length?t.push(n):t.splice(e,0,n)}function jn(t,e){return e>=t.length-1?t.pop():t.splice(e,1)[0]}function Fn(t,e,n){let s=Ln(t,e);return s>=0?t[1|s]=n:(s=~s,function(t,e,n,s){let r=t.length;if(r==e)t.push(n,s);else if(1===r)t.push(s,t[0]),t[0]=n;else{for(r--,t.push(t[r-1],t[r]);r>e;)t[r]=t[r-2],r--;t[e]=n,t[e+1]=s}}(t,s,e,n)),s}function zn(t,e){const n=Ln(t,e);if(n>=0)return t[1|n]}function Ln(t,e){return function(t,e,n){let s=0,r=t.length>>1;for(;r!==s;){const n=s+(r-s>>1),i=t[n<<1];if(e===i)return n<<1;i>e?r=n:s=n+1}return~(r<<1)}(t,e)}const Bn={},$n=/\n/gm,Un="__source",Zn=Q({provide:String,useValue:Q});let qn;function Wn(t){const e=qn;return qn=t,e}function Gn(t,e=vt.Default){if(void 0===qn)throw new Error("inject() must be called from an injection context");return null===qn?mt(t,void 0,e):qn.get(t,e&vt.Optional?null:void 0,e)}function Qn(t,e=vt.Default){return(yt||Gn)(et(t),e)}function Jn(t){const e=[];for(let n=0;n<t.length;n++){const s=et(t[n]);if(Array.isArray(s)){if(0===s.length)throw new Error("Arguments array must have arguments.");let t,n=vt.Default;for(let e=0;e<s.length;e++){const r=s[e],i=r.__NG_DI_FLAG__;"number"==typeof i?-1===i?t=r.token:n|=i:t=r}e.push(Qn(t,n))}else e.push(Qn(s))}return e}function Kn(t,e){return t.__NG_DI_FLAG__=e,t.prototype.__NG_DI_FLAG__=e,t}const Yn=Kn(Nn("Inject",t=>({token:t})),-1),Xn=Kn(Nn("Optional"),8),ts=Kn(Nn("SkipSelf"),4);class es{constructor(t){this.changingThisBreaksApplicationSecurity=t}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`}}function ns(t){return t instanceof es?t.changingThisBreaksApplicationSecurity:t}const ss=/^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,rs=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;var is=function(t){return t[t.NONE=0]="NONE",t[t.HTML=1]="HTML",t[t.STYLE=2]="STYLE",t[t.SCRIPT=3]="SCRIPT",t[t.URL=4]="URL",t[t.RESOURCE_URL=5]="RESOURCE_URL",t}({});function os(t){const e=function(){const t=xe();return t&&t[12]}();return e?e.sanitize(is.URL,t)||"":function(t,e){const n=function(t){return t instanceof es&&t.getTypeName()||null}(t);if(null!=n&&n!==e){if("ResourceURL"===n&&"URL"===e)return!0;throw new Error(`Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`)}return n===e}(t,"URL")?ns(t):(n=rt(t),(n=String(n)).match(ss)||n.match(rs)?n:"unsafe:"+n);var n}function ls(t,e){t.__ngContext__=e}function as(t){const e=function(t){return t.__ngContext__||null}(t);return e?Array.isArray(e)?e:e.lView:null}function cs(t){return t.ngDebugContext}function us(t){return t.ngOriginalError}function hs(t,...e){t.error(...e)}class ds{constructor(){this._console=console}handleError(t){const e=this._findOriginalError(t),n=this._findContext(t),s=function(t){return t.ngErrorLogger||hs}(t);s(this._console,"ERROR",t),e&&s(this._console,"ORIGINAL ERROR",e),n&&s(this._console,"ERROR CONTEXT",n)}_findContext(t){return t?cs(t)?cs(t):this._findContext(us(t)):null}_findOriginalError(t){let e=us(t);for(;e&&us(e);)e=us(e);return e}}const fs=(()=>("undefined"!=typeof requestAnimationFrame&&requestAnimationFrame||setTimeout).bind(Ot))();function ps(t){return t.ownerDocument.defaultView}function gs(t){return t instanceof Function?t():t}var vs=function(t){return t[t.Important=1]="Important",t[t.DashCase=2]="DashCase",t}({});function ys(t,e){return(void 0)(t,e)}function _s(t){const e=t[3];return Kt(e)?e[3]:e}function ms(t){return Cs(t[13])}function bs(t){return Cs(t[4])}function Cs(t){for(;null!==t&&!Kt(t);)t=t[4];return t}function ws(t,e,n,s,r){if(null!=s){let i,o=!1;Kt(s)?i=s:Jt(s)&&(o=!0,s=s[0]);const l=fe(s);0===t&&null!==n?null==r?Ss(e,n,l):Is(e,n,l,r||null,!0):1===t&&null!==n?Is(e,n,l,r||null,!0):2===t?function(t,e,n){const s=Vs(t,e);s&&function(t,e,n,s){he(t)?t.removeChild(e,n,s):e.removeChild(n)}(t,s,e,n)}(e,l,o):3===t&&e.destroyNode(l),null!=i&&function(t,e,n,s,r){const i=n[7];i!==fe(n)&&ws(e,t,s,i,r);for(let o=Qt;o<n.length;o++){const r=n[o];Rs(r[1],r,t,e,s,i)}}(e,t,i,n,r)}}function Es(t,e,n){return he(t)?t.createElement(e,n):null===n?t.createElement(e):t.createElementNS(n,e)}function xs(t,e){const n=t[9],s=n.indexOf(e),r=e[3];1024&e[2]&&(e[2]&=-1025,Ce(r,-1)),n.splice(s,1)}function ks(t,e){if(t.length<=Qt)return;const n=Qt+e,s=t[n];if(s){const i=s[17];null!==i&&i!==t&&xs(i,s),e>0&&(t[n-1][4]=s[4]);const o=jn(t,Qt+e);Rs(s[1],r=s,r[11],2,null,null),r[0]=null,r[6]=null;const l=o[19];null!==l&&l.detachView(o[1]),s[3]=null,s[4]=null,s[2]&=-129}var r;return s}function As(t,e){if(!(256&e[2])){const n=e[11];he(n)&&n.destroyNode&&Rs(t,e,n,3,null,null),function(t){let e=t[13];if(!e)return Os(t[1],t);for(;e;){let n=null;if(Jt(e))n=e[13];else{const t=e[10];t&&(n=t)}if(!n){for(;e&&!e[4]&&e!==t;)Jt(e)&&Os(e[1],e),e=e[3];null===e&&(e=t),Jt(e)&&Os(e[1],e),n=e&&e[4]}e=n}}(e)}}function Os(t,e){if(!(256&e[2])){e[2]&=-129,e[2]|=256,function(t,e){let n;if(null!=t&&null!=(n=t.destroyHooks))for(let s=0;s<n.length;s+=2){const t=e[n[s]];if(!(t instanceof rn)){const e=n[s+1];if(Array.isArray(e))for(let n=0;n<e.length;n+=2){const s=t[e[n]],r=e[n+1];try{r.call(s)}finally{}}else try{e.call(t)}finally{}}}}(t,e),function(t,e){const n=t.cleanup,s=e[7];let r=-1;if(null!==n)for(let i=0;i<n.length-1;i+=2)if("string"==typeof n[i]){const t=n[i+1],o="function"==typeof t?t(e):fe(e[t]),l=s[r=n[i+2]],a=n[i+3];"boolean"==typeof a?o.removeEventListener(n[i],l,a):a>=0?s[r=a]():s[r=-a].unsubscribe(),i+=2}else{const t=s[r=n[i+1]];n[i].call(t)}if(null!==s){for(let t=r+1;t<s.length;t++)(0,s[t])();e[7]=null}}(t,e),1===e[1].type&&he(e[11])&&e[11].destroy();const n=e[17];if(null!==n&&Kt(e[3])){n!==e[3]&&xs(n,e);const s=e[19];null!==s&&s.detachView(t)}}}function Is(t,e,n,s,r){he(t)?t.insertBefore(e,n,s,r):e.insertBefore(n,s,r)}function Ss(t,e,n){he(t)?t.appendChild(e,n):e.appendChild(n)}function Ts(t,e,n,s,r){null!==s?Is(t,e,n,s,r):Ss(t,e,n)}function Vs(t,e){return he(t)?t.parentNode(e):e.parentNode}function Ds(t,e,n,s){const r=function(t,e,n){return function(t,e,n){let s=e;for(;null!==s&&40&s.type;)s=(e=s).parent;if(null===s)return n[0];if(2&s.flags){const e=t.data[s.directiveStart].encapsulation;if(e===wt.None||e===wt.Emulated)return null}return ge(s,n)}(t,e.parent,n)}(t,s,e),i=e[11],o=function(t,e,n){return function(t,e,n){return 40&t.type?ge(t,n):null}(t,0,n)}(s.parent||e[6],0,e);if(null!=r)if(Array.isArray(n))for(let l=0;l<n.length;l++)Ts(i,r,n[l],o,!1);else Ts(i,r,n,o,!1)}function Hs(t,e){if(null!==e){const n=e.type;if(3&n)return ge(e,t);if(4&n)return Ms(-1,t[e.index]);if(8&n){const n=e.child;if(null!==n)return Hs(t,n);{const n=t[e.index];return Kt(n)?Ms(-1,n):fe(n)}}if(32&n)return ys(e,t)()||fe(t[e.index]);{const n=Ns(t,e);return null!==n?Array.isArray(n)?n[0]:Hs(_s(t[16]),n):Hs(t,e.next)}}return null}function Ns(t,e){return null!==e?t[16][6].projection[e.projection]:null}function Ms(t,e){const n=Qt+t+1;if(n<e.length){const t=e[n],s=t[1].firstChild;if(null!==s)return Hs(t,s)}return e[7]}function Ps(t,e,n,s,r,i,o){for(;null!=n;){const l=s[n.index],a=n.type;if(o&&0===e&&(l&&ls(fe(l),s),n.flags|=4),64!=(64&n.flags))if(8&a)Ps(t,e,n.child,s,r,i,!1),ws(e,t,r,l,i);else if(32&a){const o=ys(n,s);let a;for(;a=o();)ws(e,t,r,a,i);ws(e,t,r,l,i)}else 16&a?js(t,e,s,n,r,i):ws(e,t,r,l,i);n=o?n.projectionNext:n.next}}function Rs(t,e,n,s,r,i){Ps(n,s,t.firstChild,e,r,i,!1)}function js(t,e,n,s,r,i){const o=n[16],l=o[6].projection[s.projection];if(Array.isArray(l))for(let a=0;a<l.length;a++)ws(e,t,r,l[a],i);else Ps(t,e,l,o[3],r,i,!0)}function Fs(t,e,n){he(t)?t.setAttribute(e,"style",n):e.style.cssText=n}function zs(t,e,n){he(t)?""===n?t.removeAttribute(e,"class"):t.setAttribute(e,"class",n):e.className=n}function Ls(t,e,n){let s=t.length;for(;;){const r=t.indexOf(e,n);if(-1===r)return r;if(0===r||t.charCodeAt(r-1)<=32){const n=e.length;if(r+n===s||t.charCodeAt(r+n)<=32)return r}n=r+1}}const Bs="ng-template";function $s(t,e,n){let s=0;for(;s<t.length;){let r=t[s++];if(n&&"class"===r){if(r=t[s],-1!==Ls(r.toLowerCase(),e,0))return!0}else if(1===r){for(;s<t.length&&"string"==typeof(r=t[s++]);)if(r.toLowerCase()===e)return!0;return!1}}return!1}function Us(t){return 4===t.type&&t.value!==Bs}function Zs(t,e,n){return e===(4!==t.type||n?t.value:Bs)}function qs(t,e,n){let s=4;const r=t.attrs||[],i=function(t){for(let n=0;n<t.length;n++)if(3===(e=t[n])||4===e||6===e)return n;var e;return t.length}(r);let o=!1;for(let l=0;l<e.length;l++){const a=e[l];if("number"!=typeof a){if(!o)if(4&s){if(s=2|1&s,""!==a&&!Zs(t,a,n)||""===a&&1===e.length){if(Ws(s))return!1;o=!0}}else{const c=8&s?a:e[++l];if(8&s&&null!==t.attrs){if(!$s(t.attrs,c,n)){if(Ws(s))return!1;o=!0}continue}const u=Gs(8&s?"class":a,r,Us(t),n);if(-1===u){if(Ws(s))return!1;o=!0;continue}if(""!==c){let t;t=u>i?"":r[u+1].toLowerCase();const e=8&s?t:null;if(e&&-1!==Ls(e,c,0)||2&s&&c!==t){if(Ws(s))return!1;o=!0}}}}else{if(!o&&!Ws(s)&&!Ws(a))return!1;if(o&&Ws(a))continue;o=!1,s=a|1&s}}return Ws(s)||o}function Ws(t){return 0==(1&t)}function Gs(t,e,n,s){if(null===e)return-1;let r=0;if(s||!n){let n=!1;for(;r<e.length;){const s=e[r];if(s===t)return r;if(3===s||6===s)n=!0;else{if(1===s||2===s){let t=e[++r];for(;"string"==typeof t;)t=e[++r];continue}if(4===s)break;if(0===s){r+=4;continue}}r+=n?1:2}return-1}return function(t,e){let n=t.indexOf(4);if(n>-1)for(n++;n<t.length;){const s=t[n];if("number"==typeof s)return-1;if(s===e)return n;n++}return-1}(e,t)}function Qs(t,e,n=!1){for(let s=0;s<e.length;s++)if(qs(t,e[s],n))return!0;return!1}function Js(t,e){return t?":not("+e.trim()+")":e}function Ks(t){let e=t[0],n=1,s=2,r="",i=!1;for(;n<t.length;){let o=t[n];if("string"==typeof o)if(2&s){const e=t[++n];r+="["+o+(e.length>0?'="'+e+'"':"")+"]"}else 8&s?r+="."+o:4&s&&(r+=" "+o);else""===r||Ws(o)||(e+=Js(i,r),r=""),s=o,i=i||!Ws(s);n++}return""!==r&&(e+=Js(i,r)),e}const Ys={};function Xs(t){tr(ke(),xe(),Ge()+t,De())}function tr(t,e,n,s){if(!s)if(3==(3&e[2])){const s=t.preOrderCheckHooks;null!==s&&Ye(e,s,n)}else{const s=t.preOrderHooks;null!==s&&Xe(e,s,0,n)}Qe(n)}function er(t,e){return t<<17|e<<2}function nr(t){return t>>17&32767}function sr(t){return 2|t}function rr(t){return(131068&t)>>2}function ir(t,e){return-131069&t|e<<2}function or(t){return 1|t}function lr(t,e){const n=t.contentQueries;if(null!==n)for(let s=0;s<n.length;s+=2){const r=n[s],i=n[s+1];if(-1!==i){const n=t.data[i];Fe(r),n.contentQueries(2,e[i],i)}}}function ar(t,e,n,s,r,i,o,l,a,c){const u=e.blueprint.slice();return u[0]=r,u[2]=140|s,be(u),u[3]=u[15]=t,u[8]=n,u[10]=o||t&&t[10],u[11]=l||t&&t[11],u[12]=a||t&&t[12]||null,u[9]=c||t&&t[9]||null,u[6]=i,u[16]=2==e.type?t[16]:u,u}function cr(t,e,n,s,r){let i=t.data[e];if(null===i)i=function(t,e,n,s,r){const i=Ie(),o=Te(),l=t.data[e]=function(t,e,n,s,r,i){return{type:n,index:s,insertBeforeIndex:null,injectorIndex:e?e.injectorIndex:-1,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,propertyBindings:null,flags:0,providerIndexes:0,value:r,attrs:i,mergedAttrs:null,localNames:null,initialInputs:void 0,inputs:null,outputs:null,tViews:null,next:null,projectionNext:null,child:null,parent:e,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}(0,o?i:i&&i.parent,n,e,s,r);return null===t.firstChild&&(t.firstChild=l),null!==i&&(o?null==i.child&&null!==l.parent&&(i.child=l):null===i.next&&(i.next=l)),l}(t,e,n,s,r),we.lFrame.inI18n&&(i.flags|=64);else if(64&i.type){i.type=n,i.value=s,i.attrs=r;const t=function(){const t=we.lFrame,e=t.currentTNode;return t.isParent?e:e.parent}();i.injectorIndex=null===t?-1:t.injectorIndex}return Se(i,!0),i}function ur(t,e,n,s){if(0===n)return-1;const r=e.length;for(let i=0;i<n;i++)e.push(s),t.blueprint.push(s),t.data.push(null);return r}function hr(t,e,n){Be(e);try{const s=t.viewQuery;null!==s&&zr(1,s,n);const r=t.template;null!==r&&pr(t,e,r,1,n),t.firstCreatePass&&(t.firstCreatePass=!1),t.staticContentQueries&&lr(t,e),t.staticViewQueries&&zr(2,t.viewQuery,n);const i=t.components;null!==i&&function(t,e){for(let n=0;n<e.length;n++)Mr(t,e[n])}(e,i)}catch(s){throw t.firstCreatePass&&(t.incompleteFirstPass=!0),s}finally{e[2]&=-5,We()}}function dr(t,e,n,s){const r=e[2];if(256==(256&r))return;Be(e);const i=De();try{be(e),we.lFrame.bindingIndex=t.bindingStartIndex,null!==n&&pr(t,e,n,2,s);const o=3==(3&r);if(!i)if(o){const n=t.preOrderCheckHooks;null!==n&&Ye(e,n,null)}else{const n=t.preOrderHooks;null!==n&&Xe(e,n,0,null),tn(e,0)}if(function(t){for(let e=ms(t);null!==e;e=bs(e)){if(!e[2])continue;const t=e[9];for(let e=0;e<t.length;e++){const n=t[e],s=n[3];0==(1024&n[2])&&Ce(s,1),n[2]|=1024}}}(e),function(t){for(let e=ms(t);null!==e;e=bs(e))for(let t=Qt;t<e.length;t++){const n=e[t],s=n[1];_e(n)&&dr(s,n,s.template,n[8])}}(e),null!==t.contentQueries&&lr(t,e),!i)if(o){const n=t.contentCheckHooks;null!==n&&Ye(e,n)}else{const n=t.contentHooks;null!==n&&Xe(e,n,1),tn(e,1)}!function(t,e){const n=t.hostBindingOpCodes;if(null!==n)try{for(let t=0;t<n.length;t++){const s=n[t];if(s<0)Qe(~s);else{const r=s,i=n[++t],o=n[++t];Re(i,r),o(2,e[r])}}}finally{Qe(-1)}}(t,e);const l=t.components;null!==l&&function(t,e){for(let n=0;n<e.length;n++)Hr(t,e[n])}(e,l);const a=t.viewQuery;if(null!==a&&zr(2,a,s),!i)if(o){const n=t.viewCheckHooks;null!==n&&Ye(e,n)}else{const n=t.viewHooks;null!==n&&Xe(e,n,2),tn(e,2)}!0===t.firstUpdatePass&&(t.firstUpdatePass=!1),i||(e[2]&=-73),1024&e[2]&&(e[2]&=-1025,Ce(e[3],-1))}finally{We()}}function fr(t,e,n,s){const r=e[10],i=!De(),o=4==(4&e[2]);try{i&&!o&&r.begin&&r.begin(),o&&hr(t,e,s),dr(t,e,n,s)}finally{i&&!o&&r.end&&r.end()}}function pr(t,e,n,s,r){const i=Ge(),o=2&s;try{Qe(-1),o&&e.length>Gt&&tr(t,e,Gt,De()),n(s,r)}finally{Qe(i)}}function gr(t,e,n){if(Yt(e)){const s=e.directiveEnd;for(let r=e.directiveStart;r<s;r++){const e=t.data[r];e.contentQueries&&e.contentQueries(1,n[r],r)}}}function vr(t,e,n){Ee()&&(function(t,e,n,s){const r=n.directiveStart,i=n.directiveEnd;t.firstCreatePass||vn(n,e),ls(s,e);const o=n.initialInputs;for(let l=r;l<i;l++){const s=t.data[l],i=ee(s);i&&Sr(e,n,s);const a=On(e,t,l,n);ls(a,e),null!==o&&Tr(0,l-r,a,s,0,o),i&&(ye(n.index,e)[8]=a)}}(t,e,n,ge(n,e)),128==(128&n.flags)&&function(t,e,n){const s=n.directiveStart,r=n.directiveEnd,i=n.index,o=we.lFrame.currentDirectiveIndex;try{Qe(i);for(let n=s;n<r;n++){const s=t.data[n],r=e[n];je(n),null===s.hostBindings&&0===s.hostVars&&null===s.hostAttrs||xr(s,r)}}finally{Qe(-1),je(o)}}(t,e,n))}function yr(t,e,n=ge){const s=e.localNames;if(null!==s){let r=e.index+1;for(let i=0;i<s.length;i+=2){const o=s[i+1],l=-1===o?n(e,t):t[o];t[r++]=l}}}function _r(t){const e=t.tView;return null===e||e.incompleteFirstPass?t.tView=mr(1,null,t.template,t.decls,t.vars,t.directiveDefs,t.pipeDefs,t.viewQuery,t.schemas,t.consts):e}function mr(t,e,n,s,r,i,o,l,a,c){const u=Gt+s,h=u+r,d=function(t,e){const n=[];for(let s=0;s<e;s++)n.push(s<t?null:Ys);return n}(u,h),f="function"==typeof c?c():c;return d[1]={type:t,blueprint:d,template:n,queries:null,viewQuery:l,declTNode:e,data:d.slice().fill(null,u),bindingStartIndex:u,expandoStartIndex:h,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:"function"==typeof i?i():i,pipeRegistry:"function"==typeof o?o():o,firstChild:null,schemas:a,consts:f,incompleteFirstPass:!1}}function br(t,e,n){for(let s in t)if(t.hasOwnProperty(s)){const r=t[s];(n=null===n?{}:n).hasOwnProperty(s)?n[s].push(e,r):n[s]=[e,r]}return n}function Cr(t,e,n,s,r,i,o,l){const a=ge(e,n);let c,u=e.inputs;var h;!l&&null!=u&&(c=u[s])?(Zr(t,n,c,s,r),Xt(e)&&function(t,e){const n=ye(e,t);16&n[2]||(n[2]|=64)}(n,e.index)):3&e.type&&(s="class"===(h=s)?"className":"for"===h?"htmlFor":"formaction"===h?"formAction":"innerHtml"===h?"innerHTML":"readonly"===h?"readOnly":"tabindex"===h?"tabIndex":h,r=null!=o?o(r,e.value||"",s):r,he(i)?i.setProperty(a,s,r):ln(s)||(a.setProperty?a.setProperty(s,r):a[s]=r))}function wr(t,e,n,s){let r=!1;if(Ee()){const i=function(t,e,n){const s=t.directiveRegistry;let r=null;if(s)for(let i=0;i<s.length;i++){const o=s[i];Qs(n,o.selectors,!1)&&(r||(r=[]),bn(vn(n,e),t,o.type),ee(o)?(kr(t,n),r.unshift(o)):r.push(o))}return r}(t,e,n),o=null===s?null:{"":-1};if(null!==i){r=!0,Or(n,t.data.length,i.length);for(let t=0;t<i.length;t++){const e=i[t];e.providersResolver&&e.providersResolver(e)}let s=!1,l=!1,a=ur(t,e,i.length,null);for(let r=0;r<i.length;r++){const c=i[r];n.mergedAttrs=an(n.mergedAttrs,c.hostAttrs),Ir(t,n,e,a,c),Ar(a,c,o),null!==c.contentQueries&&(n.flags|=8),null===c.hostBindings&&null===c.hostAttrs&&0===c.hostVars||(n.flags|=128);const u=c.type.prototype;!s&&(u.ngOnChanges||u.ngOnInit||u.ngDoCheck)&&((t.preOrderHooks||(t.preOrderHooks=[])).push(n.index),s=!0),l||!u.ngOnChanges&&!u.ngDoCheck||((t.preOrderCheckHooks||(t.preOrderCheckHooks=[])).push(n.index),l=!0),a++}!function(t,e){const n=e.directiveEnd,s=t.data,r=e.attrs,i=[];let o=null,l=null;for(let a=e.directiveStart;a<n;a++){const t=s[a],n=t.inputs,c=null===r||Us(e)?null:Vr(n,r);i.push(c),o=br(n,a,o),l=br(t.outputs,a,l)}null!==o&&(o.hasOwnProperty("class")&&(e.flags|=16),o.hasOwnProperty("style")&&(e.flags|=32)),e.initialInputs=i,e.inputs=o,e.outputs=l}(t,n)}o&&function(t,e,n){if(e){const s=t.localNames=[];for(let t=0;t<e.length;t+=2){const r=n[e[t+1]];if(null==r)throw new st("301",`Export of name '${e[t+1]}' not found!`);s.push(e[t],r)}}}(n,s,o)}return n.mergedAttrs=an(n.mergedAttrs,n.attrs),r}function Er(t,e,n,s,r,i){const o=i.hostBindings;if(o){let n=t.hostBindingOpCodes;null===n&&(n=t.hostBindingOpCodes=[]);const i=~e.index;(function(t){let e=t.length;for(;e>0;){const n=t[--e];if("number"==typeof n&&n<0)return n}return 0})(n)!=i&&n.push(i),n.push(s,r,o)}}function xr(t,e){null!==t.hostBindings&&t.hostBindings(1,e)}function kr(t,e){e.flags|=2,(t.components||(t.components=[])).push(e.index)}function Ar(t,e,n){if(n){if(e.exportAs)for(let s=0;s<e.exportAs.length;s++)n[e.exportAs[s]]=t;ee(e)&&(n[""]=t)}}function Or(t,e,n){t.flags|=1,t.directiveStart=e,t.directiveEnd=e+n,t.providerIndexes=e}function Ir(t,e,n,s,r){t.data[s]=r;const i=r.factory||(r.factory=ne(r.type)),o=new rn(i,ee(r),null);t.blueprint[s]=o,n[s]=o,Er(t,e,0,s,ur(t,n,r.hostVars,Ys),r)}function Sr(t,e,n){const s=ge(e,t),r=_r(n),i=t[10],o=Pr(t,ar(t,r,null,n.onPush?64:16,s,e,i,i.createRenderer(s,n),null,null));t[e.index]=o}function Tr(t,e,n,s,r,i){const o=i[e];if(null!==o){const t=s.setInput;for(let e=0;e<o.length;){const r=o[e++],i=o[e++],l=o[e++];null!==t?s.setInput(n,l,r,i):n[i]=l}}}function Vr(t,e){let n=null,s=0;for(;s<e.length;){const r=e[s];if(0!==r)if(5!==r){if("number"==typeof r)break;t.hasOwnProperty(r)&&(null===n&&(n=[]),n.push(r,t[r],e[s+1])),s+=2}else s+=2;else s+=4}return n}function Dr(t,e,n,s){return new Array(t,!0,!1,e,null,0,s,n,null,null)}function Hr(t,e){const n=ye(e,t);if(_e(n)){const t=n[1];80&n[2]?dr(t,n,t.template,n[8]):n[5]>0&&Nr(n)}}function Nr(t){for(let n=ms(t);null!==n;n=bs(n))for(let t=Qt;t<n.length;t++){const e=n[t];if(1024&e[2]){const t=e[1];dr(t,e,t.template,e[8])}else e[5]>0&&Nr(e)}const e=t[1].components;if(null!==e)for(let n=0;n<e.length;n++){const s=ye(e[n],t);_e(s)&&s[5]>0&&Nr(s)}}function Mr(t,e){const n=ye(e,t),s=n[1];!function(t,e){for(let n=e.length;n<t.blueprint.length;n++)e.push(t.blueprint[n])}(s,n),hr(s,n,n[8])}function Pr(t,e){return t[13]?t[14][4]=e:t[13]=e,t[14]=e,e}function Rr(t){for(;t;){t[2]|=64;const e=_s(t);if(0!=(512&t[2])&&!e)return t;t=e}return null}function jr(t,e,n){const s=e[10];s.begin&&s.begin();try{dr(t,e,t.template,n)}catch(r){throw Ur(e,r),r}finally{s.end&&s.end()}}function Fr(t){!function(t){for(let e=0;e<t.components.length;e++){const n=t.components[e],s=as(n),r=s[1];fr(r,s,r.template,n)}}(t[8])}function zr(t,e,n){Fe(0),e(t,n)}const Lr=(()=>Promise.resolve(null))();function Br(t){return t[7]||(t[7]=[])}function $r(t){return t.cleanup||(t.cleanup=[])}function Ur(t,e){const n=t[9],s=n?n.get(ds,null):null;s&&s.handleError(e)}function Zr(t,e,n,s,r){for(let i=0;i<n.length;){const o=n[i++],l=n[i++],a=e[o],c=t.data[o];null!==c.setInput?c.setInput(a,r,s,l):a[l]=r}}function qr(t,e,n){let s=n?t.styles:null,r=n?t.classes:null,i=0;if(null!==e)for(let o=0;o<e.length;o++){const t=e[o];"number"==typeof t?i=t:1==i?r=Y(r,t):2==i&&(s=Y(s,t+": "+e[++o]+";"))}n?t.styles=s:t.stylesWithoutHost=s,n?t.classes=r:t.classesWithoutHost=r}const Wr=new Mn("INJECTOR",-1);class Gr{get(t,e=Bn){if(e===Bn){const e=new Error(`NullInjectorError: No provider for ${K(t)}!`);throw e.name="NullInjectorError",e}return e}}const Qr=new Mn("Set Injector scope."),Jr={},Kr={};let Yr;function Xr(){return void 0===Yr&&(Yr=new Gr),Yr}function ti(t,e=null,n=null,s){return new ei(t,n,e||Xr(),s)}class ei{constructor(t,e,n,s=null){this.parent=n,this.records=new Map,this.injectorDefTypes=new Set,this.onDestroy=new Set,this._destroyed=!1;const r=[];e&&Pn(e,n=>this.processProvider(n,t,e)),Pn([t],t=>this.processInjectorType(t,[],r)),this.records.set(Wr,ri(void 0,this));const i=this.records.get(Qr);this.scope=null!=i?i.value:null,this.source=s||("object"==typeof t?null:K(t))}get destroyed(){return this._destroyed}destroy(){this.assertNotDestroyed(),this._destroyed=!0;try{this.onDestroy.forEach(t=>t.ngOnDestroy())}finally{this.records.clear(),this.onDestroy.clear(),this.injectorDefTypes.clear()}}get(t,e=Bn,n=vt.Default){this.assertNotDestroyed();const s=Wn(this);try{if(!(n&vt.SkipSelf)){let e=this.records.get(t);if(void 0===e){const n=("function"==typeof(r=t)||"object"==typeof r&&r instanceof Mn)&&ct(t);e=n&&this.injectableDefInScope(n)?ri(ni(t),Jr):null,this.records.set(t,e)}if(null!=e)return this.hydrate(t,e)}return(n&vt.Self?Xr():this.parent).get(t,e=n&vt.Optional&&e===Bn?null:e)}catch(i){if("NullInjectorError"===i.name){if((i.ngTempTokenPath=i.ngTempTokenPath||[]).unshift(K(t)),s)throw i;return function(t,e,n,s){const r=t.ngTempTokenPath;throw e[Un]&&r.unshift(e[Un]),t.message=function(t,e,n,s=null){t=t&&"\n"===t.charAt(0)&&"\u0275"==t.charAt(1)?t.substr(2):t;let r=K(e);if(Array.isArray(e))r=e.map(K).join(" -> ");else if("object"==typeof e){let t=[];for(let n in e)if(e.hasOwnProperty(n)){let s=e[n];t.push(n+":"+("string"==typeof s?JSON.stringify(s):K(s)))}r=`{${t.join(", ")}}`}return`${n}${s?"("+s+")":""}[${r}]: ${t.replace($n,"\n  ")}`}("\n"+t.message,r,n,s),t.ngTokenPath=r,t.ngTempTokenPath=null,t}(i,t,"R3InjectorError",this.source)}throw i}finally{Wn(s)}var r}_resolveInjectorDefTypes(){this.injectorDefTypes.forEach(t=>this.get(t))}toString(){const t=[];return this.records.forEach((e,n)=>t.push(K(n))),`R3Injector[${t.join(", ")}]`}assertNotDestroyed(){if(this._destroyed)throw new Error("Injector has already been destroyed.")}processInjectorType(t,e,n){if(!(t=et(t)))return!1;let s=ht(t);const r=null==s&&t.ngModule||void 0,i=void 0===r?t:r,o=-1!==n.indexOf(i);if(void 0!==r&&(s=ht(r)),null==s)return!1;if(null!=s.imports&&!o){let t;n.push(i);try{Pn(s.imports,s=>{this.processInjectorType(s,e,n)&&(void 0===t&&(t=[]),t.push(s))})}finally{}if(void 0!==t)for(let e=0;e<t.length;e++){const{ngModule:n,providers:s}=t[e];Pn(s,t=>this.processProvider(t,n,s||St))}}this.injectorDefTypes.add(i);const l=ne(i)||(()=>new i);this.records.set(i,ri(l,Jr));const a=s.providers;if(null!=a&&!o){const e=t;Pn(a,t=>this.processProvider(t,e,a))}return void 0!==r&&void 0!==t.providers}processProvider(t,e,n){let s=oi(t=et(t))?t:et(t&&t.provide);const r=function(t,e,n){return ii(t)?ri(void 0,t.useValue):ri(si(t),Jr)}(t);if(oi(t)||!0!==t.multi)this.records.get(s);else{let e=this.records.get(s);e||(e=ri(void 0,Jr,!0),e.factory=()=>Jn(e.multi),this.records.set(s,e)),s=t,e.multi.push(t)}this.records.set(s,r)}hydrate(t,e){var n;return e.value===Jr&&(e.value=Kr,e.value=e.factory()),"object"==typeof e.value&&e.value&&null!==(n=e.value)&&"object"==typeof n&&"function"==typeof n.ngOnDestroy&&this.onDestroy.add(e.value),e.value}injectableDefInScope(t){if(!t.providedIn)return!1;const e=et(t.providedIn);return"string"==typeof e?"any"===e||e===this.scope:this.injectorDefTypes.has(e)}}function ni(t){const e=ct(t),n=null!==e?e.factory:ne(t);if(null!==n)return n;if(t instanceof Mn)throw new Error(`Token ${K(t)} is missing a \u0275prov definition.`);if(t instanceof Function)return function(t){const e=t.length;if(e>0){const n=function(t,e){const n=[];for(let s=0;s<t;s++)n.push("?");return n}(e);throw new Error(`Can't resolve all parameters for ${K(t)}: (${n.join(", ")}).`)}const n=function(t){const e=t&&(t[dt]||t[pt]);if(e){const n=function(t){if(t.hasOwnProperty("name"))return t.name;const e=(""+t).match(/^function\s*([^\s(]+)/);return null===e?"":e[1]}(t);return console.warn(`DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`),e}return null}(t);return null!==n?()=>n.factory(t):()=>new t}(t);throw new Error("unreachable")}function si(t,e,n){let s;if(oi(t)){const e=et(t);return ne(e)||ni(e)}if(ii(t))s=()=>et(t.useValue);else if((r=t)&&r.useFactory)s=()=>t.useFactory(...Jn(t.deps||[]));else if(function(t){return!(!t||!t.useExisting)}(t))s=()=>Qn(et(t.useExisting));else{const e=et(t&&(t.useClass||t.provide));if(!function(t){return!!t.deps}(t))return ne(e)||ni(e);s=()=>new e(...Jn(t.deps))}var r;return s}function ri(t,e,n=!1){return{factory:t,value:e,multi:n?[]:void 0}}function ii(t){return null!==t&&"object"==typeof t&&Zn in t}function oi(t){return"function"==typeof t}const li=function(t,e,n){return function(t,e=null,n=null,s){const r=ti(t,e,n,s);return r._resolveInjectorDefTypes(),r}({name:n},e,t,n)};let ai=(()=>{class t{static create(t,e){return Array.isArray(t)?li(t,e,""):li(t.providers,t.parent,t.name||"")}}return t.THROW_IF_NOT_FOUND=Bn,t.NULL=new Gr,t.\u0275prov=lt({token:t,providedIn:"any",factory:()=>Qn(Wr)}),t.__NG_ELEMENT_ID__=-1,t})();function ci(t,e){Ke(as(t)[1],Oe())}function ui(t){let e=Object.getPrototypeOf(t.type.prototype).constructor,n=!0;const s=[t];for(;e;){let r;if(ee(t))r=e.\u0275cmp||e.\u0275dir;else{if(e.\u0275cmp)throw new Error("Directives cannot inherit Components");r=e.\u0275dir}if(r){if(n){s.push(r);const e=t;e.inputs=hi(t.inputs),e.declaredInputs=hi(t.declaredInputs),e.outputs=hi(t.outputs);const n=r.hostBindings;n&&pi(t,n);const i=r.viewQuery,o=r.contentQueries;if(i&&di(t,i),o&&fi(t,o),J(t.inputs,r.inputs),J(t.declaredInputs,r.declaredInputs),J(t.outputs,r.outputs),ee(r)&&r.data.animation){const e=t.data;e.animation=(e.animation||[]).concat(r.data.animation)}}const e=r.features;if(e)for(let s=0;s<e.length;s++){const r=e[s];r&&r.ngInherit&&r(t),r===ui&&(n=!1)}}e=Object.getPrototypeOf(e)}!function(t){let e=0,n=null;for(let s=t.length-1;s>=0;s--){const r=t[s];r.hostVars=e+=r.hostVars,r.hostAttrs=an(r.hostAttrs,n=an(n,r.hostAttrs))}}(s)}function hi(t){return t===It?{}:t===St?[]:t}function di(t,e){const n=t.viewQuery;t.viewQuery=n?(t,s)=>{e(t,s),n(t,s)}:e}function fi(t,e){const n=t.contentQueries;t.contentQueries=n?(t,s,r)=>{e(t,s,r),n(t,s,r)}:e}function pi(t,e){const n=t.hostBindings;t.hostBindings=n?(t,s)=>{e(t,s),n(t,s)}:e}let gi=null;function vi(){if(!gi){const t=Ot.Symbol;if(t&&t.iterator)gi=t.iterator;else{const t=Object.getOwnPropertyNames(Map.prototype);for(let e=0;e<t.length;++e){const n=t[e];"entries"!==n&&"size"!==n&&Map.prototype[n]===Map.prototype.entries&&(gi=n)}}}return gi}class yi{constructor(t){this.wrapped=t}static wrap(t){return new yi(t)}static unwrap(t){return yi.isWrapped(t)?t.wrapped:t}static isWrapped(t){return t instanceof yi}}function _i(t){return!!mi(t)&&(Array.isArray(t)||!(t instanceof Map)&&vi()in t)}function mi(t){return null!==t&&("function"==typeof t||"object"==typeof t)}function bi(t,e,n){return t[e]=n}function Ci(t,e,n){return!Object.is(t[e],n)&&(t[e]=n,!0)}function wi(t,e,n,s){const r=Ci(t,e,n);return Ci(t,e+1,s)||r}function Ei(t,e,n,s){const r=xe();return Ci(r,Me(),e)&&(ke(),function(t,e,n,s,r,i){const o=ge(t,e);!function(t,e,n,s,r,i,o){if(null==i)he(t)?t.removeAttribute(e,r,n):e.removeAttribute(r);else{const l=null==o?rt(i):o(i,s||"",r);he(t)?t.setAttribute(e,r,l,n):n?e.setAttributeNS(n,r,l):e.setAttribute(r,l)}}(e[11],o,i,t.value,n,s,r)}(Je(),r,t,e,n,s)),Ei}function xi(t,e,n,s){return Ci(t,Me(),n)?e+rt(n)+s:Ys}function ki(t,e,n,s,r,i,o,l){const a=xe(),c=ke(),u=t+Gt,h=c.firstCreatePass?function(t,e,n,s,r,i,o,l,a){const c=e.consts,u=cr(e,t,4,o||null,me(c,l));wr(e,n,u,me(c,a)),Ke(e,u);const h=u.tViews=mr(2,u,s,r,i,e.directiveRegistry,e.pipeRegistry,null,e.schemas,c);return null!==e.queries&&(e.queries.template(e,u),h.queries=e.queries.embeddedTView(u)),u}(u,c,a,e,n,s,r,i,o):c.data[u];Se(h,!1);const d=a[11].createComment("");Ds(c,a,d,h),ls(d,a),Pr(a,a[u]=Dr(d,a,d,h)),te(h)&&vr(c,a,h),null!=o&&yr(a,h,l)}function Ai(t,e=vt.Default){const n=xe();return null===n?Qn(t,e):En(Oe(),n,et(t),e)}function Oi(t,e,n){const s=xe();return Ci(s,Me(),e)&&Cr(ke(),Je(),s,t,e,s[11],n,!1),Oi}function Ii(t,e,n,s,r){const i=r?"class":"style";Zr(t,n,e.inputs[i],i,s)}function Si(t,e,n,s){const r=xe(),i=ke(),o=Gt+t,l=r[11],a=r[o]=Es(l,e,we.lFrame.currentNamespace),c=i.firstCreatePass?function(t,e,n,s,r,i,o){const l=e.consts,a=cr(e,t,2,r,me(l,i));return wr(e,n,a,me(l,o)),null!==a.attrs&&qr(a,a.attrs,!1),null!==a.mergedAttrs&&qr(a,a.mergedAttrs,!0),null!==e.queries&&e.queries.elementStart(e,a),a}(o,i,r,0,e,n,s):i.data[o];Se(c,!0);const u=c.mergedAttrs;null!==u&&on(l,a,u);const h=c.classes;null!==h&&zs(l,a,h);const d=c.styles;null!==d&&Fs(l,a,d),64!=(64&c.flags)&&Ds(i,r,a,c),0===we.lFrame.elementDepthCount&&ls(a,r),we.lFrame.elementDepthCount++,te(c)&&(vr(i,r,c),gr(i,c,r)),null!==s&&yr(r,c)}function Ti(){let t=Oe();Te()?Ve():(t=t.parent,Se(t,!1));const e=t;we.lFrame.elementDepthCount--;const n=ke();n.firstCreatePass&&(Ke(n,t),Yt(t)&&n.queries.elementEnd(t)),null!=e.classesWithoutHost&&function(t){return 0!=(16&t.flags)}(e)&&Ii(n,e,xe(),e.classesWithoutHost,!0),null!=e.stylesWithoutHost&&function(t){return 0!=(32&t.flags)}(e)&&Ii(n,e,xe(),e.stylesWithoutHost,!1)}function Vi(t,e,n,s){Si(t,e,n,s),Ti()}function Di(t,e,n){const s=xe(),r=ke(),i=t+Gt,o=r.firstCreatePass?function(t,e,n,s,r){const i=e.consts,o=me(i,s),l=cr(e,t,8,"ng-container",o);return null!==o&&qr(l,o,!0),wr(e,n,l,me(i,r)),null!==e.queries&&e.queries.elementStart(e,l),l}(i,r,s,e,n):r.data[i];Se(o,!0);const l=s[i]=s[11].createComment("");Ds(r,s,l,o),ls(l,s),te(o)&&(vr(r,s,o),gr(r,o,s)),null!=n&&yr(s,o)}function Hi(){let t=Oe();const e=ke();Te()?Ve():(t=t.parent,Se(t,!1)),e.firstCreatePass&&(Ke(e,t),Yt(t)&&e.queries.elementEnd(t))}function Ni(){return xe()}function Mi(t){return!!t&&"function"==typeof t.then}const Pi=function(t){return!!t&&"function"==typeof t.subscribe};function Ri(t,e,n,s){const r=xe(),i=ke(),o=Oe();return function(t,e,n,s,r,i,o,l){const a=te(s),c=t.firstCreatePass&&$r(t),u=Br(e);let h=!0;if(3&s.type||l){const d=ge(s,e),f=l?l(d):d,p=u.length,g=l?t=>l(fe(t[s.index])):s.index;if(he(n)){let o=null;if(!l&&a&&(o=function(t,e,n,s){const r=t.cleanup;if(null!=r)for(let i=0;i<r.length-1;i+=2){const t=r[i];if(t===n&&r[i+1]===s){const t=e[7],n=r[i+2];return t.length>n?t[n]:null}"string"==typeof t&&(i+=2)}return null}(t,e,r,s.index)),null!==o)(o.__ngLastListenerFn__||o).__ngNextListenerFn__=i,o.__ngLastListenerFn__=i,h=!1;else{i=Fi(s,e,0,i,!1);const t=n.listen(f,r,i);u.push(i,t),c&&c.push(r,g,p,p+1)}}else i=Fi(s,e,0,i,!0),f.addEventListener(r,i,o),u.push(i),c&&c.push(r,g,p,o)}else i=Fi(s,e,0,i,!1);const d=s.outputs;let f;if(h&&null!==d&&(f=d[r])){const t=f.length;if(t)for(let n=0;n<t;n+=2){const t=e[f[n]][f[n+1]].subscribe(i),o=u.length;u.push(i,t),c&&c.push(r,s.index,o,-(o+1))}}}(i,r,r[11],o,t,e,!!n,s),Ri}function ji(t,e,n,s){try{return!1!==n(s)}catch(r){return Ur(t,r),!1}}function Fi(t,e,n,s,r){return function n(i){if(i===Function)return s;const o=2&t.flags?ye(t.index,e):e;0==(32&e[2])&&Rr(o);let l=ji(e,0,s,i),a=n.__ngNextListenerFn__;for(;a;)l=ji(e,0,a,i)&&l,a=a.__ngNextListenerFn__;return r&&!1===l&&(i.preventDefault(),i.returnValue=!1),l}}function zi(t=1){return function(t){return(we.lFrame.contextLView=function(t,e){for(;t>0;)e=e[15],t--;return e}(t,we.lFrame.contextLView))[8]}(t)}function Li(t,e,n){return Bi(t,"",e,"",n),Li}function Bi(t,e,n,s,r){const i=xe(),o=xi(i,e,n,s);return o!==Ys&&Cr(ke(),Je(),i,t,o,i[11],r,!1),Bi}function $i(t,e,n,s,r){const i=t[n+1],o=null===e;let l=s?nr(i):rr(i),a=!1;for(;0!==l&&(!1===a||o);){const n=t[l+1];Ui(t[l],e)&&(a=!0,t[l+1]=s?or(n):sr(n)),l=s?nr(n):rr(n)}a&&(t[n+1]=s?sr(i):or(i))}function Ui(t,e){return null===t||null==e||(Array.isArray(t)?t[1]:t)===e||!(!Array.isArray(t)||"string"!=typeof e)&&Ln(t,e)>=0}const Zi={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function qi(t){return t.substring(Zi.key,Zi.keyEnd)}function Wi(t,e){const n=Zi.textEnd;return n===e?-1:(e=Zi.keyEnd=function(t,e,n){for(;e<n&&t.charCodeAt(e)>32;)e++;return e}(t,Zi.key=e,n),Gi(t,e,n))}function Gi(t,e,n){for(;e<n&&t.charCodeAt(e)<=32;)e++;return e}function Qi(t,e){return function(t,e,n,s){const r=xe(),i=ke(),o=Pe(2);i.firstUpdatePass&&Yi(i,t,o,true),e!==Ys&&Ci(r,o,e)&&eo(i,i.data[Ge()],r,r[11],t,r[o+1]=function(t,e){return null==t||"object"==typeof t&&(t=K(ns(t))),t}(e),true,o)}(t,e),Qi}function Ji(t,e){for(let n=function(t){return function(t){Zi.key=0,Zi.keyEnd=0,Zi.value=0,Zi.valueEnd=0,Zi.textEnd=t.length}(t),Wi(t,Gi(t,0,Zi.textEnd))}(e);n>=0;n=Wi(e,n))Fn(t,qi(e),!0)}function Ki(t,e){return e>=t.expandoStartIndex}function Yi(t,e,n,s){const r=t.data;if(null===r[n+1]){const i=r[Ge()],o=Ki(t,n);ro(i,s)&&null===e&&!o&&(e=!1),e=function(t,e,n,s){const r=function(t){const e=we.lFrame.currentDirectiveIndex;return-1===e?null:t[e]}(t);let i=s?e.residualClasses:e.residualStyles;if(null===r)0===(s?e.classBindings:e.styleBindings)&&(n=to(n=Xi(null,t,e,n,s),e.attrs,s),i=null);else{const o=e.directiveStylingLast;if(-1===o||t[o]!==r)if(n=Xi(r,t,e,n,s),null===i){let n=function(t,e,n){const s=n?e.classBindings:e.styleBindings;if(0!==rr(s))return t[nr(s)]}(t,e,s);void 0!==n&&Array.isArray(n)&&(n=Xi(null,t,e,n[1],s),n=to(n,e.attrs,s),function(t,e,n,s){t[nr(n?e.classBindings:e.styleBindings)]=s}(t,e,s,n))}else i=function(t,e,n){let s;const r=e.directiveEnd;for(let i=1+e.directiveStylingLast;i<r;i++)s=to(s,t[i].hostAttrs,n);return to(s,e.attrs,n)}(t,e,s)}return void 0!==i&&(s?e.residualClasses=i:e.residualStyles=i),n}(r,i,e,s),function(t,e,n,s,r,i){let o=i?e.classBindings:e.styleBindings,l=nr(o),a=rr(o);t[s]=n;let c,u=!1;if(Array.isArray(n)){const t=n;c=t[1],(null===c||Ln(t,c)>0)&&(u=!0)}else c=n;if(r)if(0!==a){const e=nr(t[l+1]);t[s+1]=er(e,l),0!==e&&(t[e+1]=ir(t[e+1],s)),t[l+1]=131071&t[l+1]|s<<17}else t[s+1]=er(l,0),0!==l&&(t[l+1]=ir(t[l+1],s)),l=s;else t[s+1]=er(a,0),0===l?l=s:t[a+1]=ir(t[a+1],s),a=s;u&&(t[s+1]=sr(t[s+1])),$i(t,c,s,!0),$i(t,c,s,!1),function(t,e,n,s,r){const i=r?t.residualClasses:t.residualStyles;null!=i&&"string"==typeof e&&Ln(i,e)>=0&&(n[s+1]=or(n[s+1]))}(e,c,t,s,i),o=er(l,a),i?e.classBindings=o:e.styleBindings=o}(r,i,e,n,o,s)}}function Xi(t,e,n,s,r){let i=null;const o=n.directiveEnd;let l=n.directiveStylingLast;for(-1===l?l=n.directiveStart:l++;l<o&&(i=e[l],s=to(s,i.hostAttrs,r),i!==t);)l++;return null!==t&&(n.directiveStylingLast=l),s}function to(t,e,n){const s=n?1:2;let r=-1;if(null!==e)for(let i=0;i<e.length;i++){const o=e[i];"number"==typeof o?r=o:r===s&&(Array.isArray(t)||(t=void 0===t?[]:["",t]),Fn(t,o,!!n||e[++i]))}return void 0===t?null:t}function eo(t,e,n,s,r,i,o,l){if(!(3&e.type))return;const a=t.data,c=a[l+1];so(1==(1&c)?no(a,e,n,r,rr(c),o):void 0)||(so(i)||2==(2&c)&&(i=no(a,null,n,r,l,o)),function(t,e,n,s,r){const i=he(t);if(e)r?i?t.addClass(n,s):n.classList.add(s):i?t.removeClass(n,s):n.classList.remove(s);else{let e=-1===s.indexOf("-")?void 0:vs.DashCase;if(null==r)i?t.removeStyle(n,s,e):n.style.removeProperty(s);else{const o="string"==typeof r&&r.endsWith("!important");o&&(r=r.slice(0,-10),e|=vs.Important),i?t.setStyle(n,s,r,e):n.style.setProperty(s,r,o?"important":"")}}}(s,o,pe(Ge(),n),r,i))}function no(t,e,n,s,r,i){const o=null===e;let l;for(;r>0;){const e=t[r],i=Array.isArray(e),a=i?e[1]:e,c=null===a;let u=n[r+1];u===Ys&&(u=c?St:void 0);let h=c?zn(u,s):a===s?u:void 0;if(i&&!so(h)&&(h=zn(e,s)),so(h)&&(l=h,o))return l;const d=t[r+1];r=o?nr(d):rr(d)}if(null!==e){let t=i?e.residualClasses:e.residualStyles;null!=t&&(l=zn(t,s))}return l}function so(t){return void 0!==t}function ro(t,e){return 0!=(t.flags&(e?16:32))}function io(t,e=""){const n=xe(),s=ke(),r=t+Gt,i=s.firstCreatePass?cr(s,r,1,e,null):s.data[r],o=n[r]=function(t,e){return he(t)?t.createText(e):t.createTextNode(e)}(n[11],e);Ds(s,n,o,i),Se(i,!1)}function oo(t){return lo("",t,""),oo}function lo(t,e,n){const s=xe(),r=xi(s,t,e,n);return r!==Ys&&function(t,e,n){const s=pe(e,t);!function(t,e,n){he(t)?t.setValue(e,n):e.textContent=n}(t[11],s,n)}(s,Ge(),r),lo}function ao(t,e,n){!function(t,e,n,s){const r=ke(),i=Pe(2);r.firstUpdatePass&&Yi(r,null,i,s);const o=xe();if(n!==Ys&&Ci(o,i,n)){const l=r.data[Ge()];if(ro(l,s)&&!Ki(r,i)){let t=l.classesWithoutHost;null!==t&&(n=Y(t,n||"")),Ii(r,l,o,n,s)}else!function(t,e,n,s,r,i,o,l){r===Ys&&(r=St);let a=0,c=0,u=0<r.length?r[0]:null,h=0<i.length?i[0]:null;for(;null!==u||null!==h;){const o=a<r.length?r[a+1]:void 0,d=c<i.length?i[c+1]:void 0;let f,p=null;u===h?(a+=2,c+=2,o!==d&&(p=h,f=d)):null===h||null!==u&&u<h?(a+=2,p=u):(c+=2,p=h,f=d),null!==p&&eo(t,e,n,s,p,f,true,l),u=a<r.length?r[a]:null,h=c<i.length?i[c]:null}}(r,l,o,o[11],o[i+1],o[i+1]=function(t,e,n){if(null==n||""===n)return St;const s=[],r=ns(n);if(Array.isArray(r))for(let i=0;i<r.length;i++)t(s,r[i],!0);else if("object"==typeof r)for(const i in r)r.hasOwnProperty(i)&&t(s,i,r[i]);else"string"==typeof r&&e(s,r);return s}(t,e,n),0,i)}}(Fn,Ji,xi(xe(),t,e,n),!0)}const co=void 0;var uo=["en",[["a","p"],["AM","PM"],co],[["AM","PM"],co,co],[["S","M","T","W","T","F","S"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Su","Mo","Tu","We","Th","Fr","Sa"]],co,[["J","F","M","A","M","J","J","A","S","O","N","D"],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],["January","February","March","April","May","June","July","August","September","October","November","December"]],co,[["B","A"],["BC","AD"],["Before Christ","Anno Domini"]],0,[6,0],["M/d/yy","MMM d, y","MMMM d, y","EEEE, MMMM d, y"],["h:mm a","h:mm:ss a","h:mm:ss a z","h:mm:ss a zzzz"],["{1}, {0}",co,"{1} 'at' {0}",co],[".",",",";","%","+","-","E","\xd7","\u2030","\u221e","NaN",":"],["#,##0.###","#,##0%","\xa4#,##0.00","#E0"],"USD","$","US Dollar",{},"ltr",function(t){let e=Math.floor(Math.abs(t)),n=t.toString().replace(/^[^.]*\.?/,"").length;return 1===e&&0===n?1:5}];let ho={};function fo(t){return t in ho||(ho[t]=Ot.ng&&Ot.ng.common&&Ot.ng.common.locales&&Ot.ng.common.locales[t]),ho[t]}var po=function(t){return t[t.LocaleId=0]="LocaleId",t[t.DayPeriodsFormat=1]="DayPeriodsFormat",t[t.DayPeriodsStandalone=2]="DayPeriodsStandalone",t[t.DaysFormat=3]="DaysFormat",t[t.DaysStandalone=4]="DaysStandalone",t[t.MonthsFormat=5]="MonthsFormat",t[t.MonthsStandalone=6]="MonthsStandalone",t[t.Eras=7]="Eras",t[t.FirstDayOfWeek=8]="FirstDayOfWeek",t[t.WeekendRange=9]="WeekendRange",t[t.DateFormat=10]="DateFormat",t[t.TimeFormat=11]="TimeFormat",t[t.DateTimeFormat=12]="DateTimeFormat",t[t.NumberSymbols=13]="NumberSymbols",t[t.NumberFormats=14]="NumberFormats",t[t.CurrencyCode=15]="CurrencyCode",t[t.CurrencySymbol=16]="CurrencySymbol",t[t.CurrencyName=17]="CurrencyName",t[t.Currencies=18]="Currencies",t[t.Directionality=19]="Directionality",t[t.PluralCase=20]="PluralCase",t[t.ExtraData=21]="ExtraData",t}({});const go="en-US";let vo=go;function yo(t){var e,n;n="Expected localeId to be defined",null==(e=t)&&function(t,e,n,s){throw new Error(`ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`)}(n,e),"string"==typeof t&&(vo=t.toLowerCase().replace(/_/g,"-"))}function _o(t,e,n,s,r){if(t=et(t),Array.isArray(t))for(let i=0;i<t.length;i++)_o(t[i],e,n,s,r);else{const i=ke(),o=xe();let l=oi(t)?t:et(t.provide),a=si(t);const c=Oe(),u=1048575&c.providerIndexes,h=c.directiveStart,d=c.providerIndexes>>20;if(oi(t)||!t.multi){const s=new rn(a,r,Ai),f=Co(l,e,r?u:u+d,h);-1===f?(bn(vn(c,o),i,l),mo(i,t,e.length),e.push(l),c.directiveStart++,c.directiveEnd++,r&&(c.providerIndexes+=1048576),n.push(s),o.push(s)):(n[f]=s,o[f]=s)}else{const f=Co(l,e,u+d,h),p=Co(l,e,u,u+d),g=f>=0&&n[f],v=p>=0&&n[p];if(r&&!v||!r&&!g){bn(vn(c,o),i,l);const u=function(t,e,n,s,r){const i=new rn(t,n,Ai);return i.multi=[],i.index=e,i.componentProviders=0,bo(i,r,s&&!n),i}(r?Eo:wo,n.length,r,s,a);!r&&v&&(n[p].providerFactory=u),mo(i,t,e.length,0),e.push(l),c.directiveStart++,c.directiveEnd++,r&&(c.providerIndexes+=1048576),n.push(u),o.push(u)}else mo(i,t,f>-1?f:p,bo(n[r?p:f],a,!r&&s));!r&&s&&v&&n[p].componentProviders++}}}function mo(t,e,n,s){const r=oi(e);if(r||e.useClass){const i=(e.useClass||e).prototype.ngOnDestroy;if(i){const o=t.destroyHooks||(t.destroyHooks=[]);if(!r&&e.multi){const t=o.indexOf(n);-1===t?o.push(n,[s,i]):o[t+1].push(s,i)}else o.push(n,i)}}}function bo(t,e,n){return n&&t.componentProviders++,t.multi.push(e)-1}function Co(t,e,n,s){for(let r=n;r<s;r++)if(e[r]===t)return r;return-1}function wo(t,e,n,s){return xo(this.multi,[])}function Eo(t,e,n,s){const r=this.multi;let i;if(this.providerFactory){const t=this.providerFactory.componentProviders,e=On(n,n[1],this.providerFactory.index,s);i=e.slice(0,t),xo(r,i);for(let n=t;n<e.length;n++)i.push(e[n])}else i=[],xo(r,i);return i}function xo(t,e){for(let n=0;n<t.length;n++)e.push((0,t[n])());return e}function ko(t,e=[]){return n=>{n.providersResolver=(n,s)=>function(t,e,n){const s=ke();if(s.firstCreatePass){const r=ee(t);_o(n,s.data,s.blueprint,r,!0),_o(e,s.data,s.blueprint,r,!1)}}(n,s?s(t):t,e)}}class Ao{}class Oo{resolveComponentFactory(t){throw function(t){const e=Error(`No component factory found for ${K(t)}. Did you add it to @NgModule.entryComponents?`);return e.ngComponent=t,e}(t)}}let Io=(()=>{class t{}return t.NULL=new Oo,t})();function So(...t){}function To(t,e){return new Do(ge(t,e))}const Vo=function(){return To(Oe(),xe())};let Do=(()=>{class t{constructor(t){this.nativeElement=t}}return t.__NG_ELEMENT_ID__=Vo,t})();class Ho{}let No=(()=>{class t{}return t.__NG_ELEMENT_ID__=()=>Mo(),t})();const Mo=function(){const t=xe(),e=ye(Oe().index,t);return function(t){return t[11]}(Jt(e)?e:t)};let Po=(()=>{class t{}return t.\u0275prov=lt({token:t,providedIn:"root",factory:()=>null}),t})();class Ro{constructor(t){this.full=t,this.major=t.split(".")[0],this.minor=t.split(".")[1],this.patch=t.split(".").slice(2).join(".")}}const jo=new Ro("12.0.1");class Fo{constructor(){}supports(t){return _i(t)}create(t){return new Lo(t)}}const zo=(t,e)=>e;class Lo{constructor(t){this.length=0,this._linkedRecords=null,this._unlinkedRecords=null,this._previousItHead=null,this._itHead=null,this._itTail=null,this._additionsHead=null,this._additionsTail=null,this._movesHead=null,this._movesTail=null,this._removalsHead=null,this._removalsTail=null,this._identityChangesHead=null,this._identityChangesTail=null,this._trackByFn=t||zo}forEachItem(t){let e;for(e=this._itHead;null!==e;e=e._next)t(e)}forEachOperation(t){let e=this._itHead,n=this._removalsHead,s=0,r=null;for(;e||n;){const i=!n||e&&e.currentIndex<Zo(n,s,r)?e:n,o=Zo(i,s,r),l=i.currentIndex;if(i===n)s--,n=n._nextRemoved;else if(e=e._next,null==i.previousIndex)s++;else{r||(r=[]);const t=o-s,e=l-s;if(t!=e){for(let n=0;n<t;n++){const s=n<r.length?r[n]:r[n]=0,i=s+n;e<=i&&i<t&&(r[n]=s+1)}r[i.previousIndex]=e-t}}o!==l&&t(i,o,l)}}forEachPreviousItem(t){let e;for(e=this._previousItHead;null!==e;e=e._nextPrevious)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;null!==e;e=e._nextAdded)t(e)}forEachMovedItem(t){let e;for(e=this._movesHead;null!==e;e=e._nextMoved)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;null!==e;e=e._nextRemoved)t(e)}forEachIdentityChange(t){let e;for(e=this._identityChangesHead;null!==e;e=e._nextIdentityChange)t(e)}diff(t){if(null==t&&(t=[]),!_i(t))throw new Error(`Error trying to diff '${K(t)}'. Only arrays and iterables are allowed`);return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e,n,s,r=this._itHead,i=!1;if(Array.isArray(t)){this.length=t.length;for(let e=0;e<this.length;e++)n=t[e],s=this._trackByFn(e,n),null!==r&&Object.is(r.trackById,s)?(i&&(r=this._verifyReinsertion(r,n,s,e)),Object.is(r.item,n)||this._addIdentityChange(r,n)):(r=this._mismatch(r,n,s,e),i=!0),r=r._next}else e=0,function(t,e){if(Array.isArray(t))for(let n=0;n<t.length;n++)e(t[n]);else{const n=t[vi()]();let s;for(;!(s=n.next()).done;)e(s.value)}}(t,t=>{s=this._trackByFn(e,t),null!==r&&Object.is(r.trackById,s)?(i&&(r=this._verifyReinsertion(r,t,s,e)),Object.is(r.item,t)||this._addIdentityChange(r,t)):(r=this._mismatch(r,t,s,e),i=!0),r=r._next,e++}),this.length=e;return this._truncate(r),this.collection=t,this.isDirty}get isDirty(){return null!==this._additionsHead||null!==this._movesHead||null!==this._removalsHead||null!==this._identityChangesHead}_reset(){if(this.isDirty){let t;for(t=this._previousItHead=this._itHead;null!==t;t=t._next)t._nextPrevious=t._next;for(t=this._additionsHead;null!==t;t=t._nextAdded)t.previousIndex=t.currentIndex;for(this._additionsHead=this._additionsTail=null,t=this._movesHead;null!==t;t=t._nextMoved)t.previousIndex=t.currentIndex;this._movesHead=this._movesTail=null,this._removalsHead=this._removalsTail=null,this._identityChangesHead=this._identityChangesTail=null}}_mismatch(t,e,n,s){let r;return null===t?r=this._itTail:(r=t._prev,this._remove(t)),null!==(t=null===this._unlinkedRecords?null:this._unlinkedRecords.get(n,null))?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._reinsertAfter(t,r,s)):null!==(t=null===this._linkedRecords?null:this._linkedRecords.get(n,s))?(Object.is(t.item,e)||this._addIdentityChange(t,e),this._moveAfter(t,r,s)):t=this._addAfter(new Bo(e,n),r,s),t}_verifyReinsertion(t,e,n,s){let r=null===this._unlinkedRecords?null:this._unlinkedRecords.get(n,null);return null!==r?t=this._reinsertAfter(r,t._prev,s):t.currentIndex!=s&&(t.currentIndex=s,this._addToMoves(t,s)),t}_truncate(t){for(;null!==t;){const e=t._next;this._addToRemovals(this._unlink(t)),t=e}null!==this._unlinkedRecords&&this._unlinkedRecords.clear(),null!==this._additionsTail&&(this._additionsTail._nextAdded=null),null!==this._movesTail&&(this._movesTail._nextMoved=null),null!==this._itTail&&(this._itTail._next=null),null!==this._removalsTail&&(this._removalsTail._nextRemoved=null),null!==this._identityChangesTail&&(this._identityChangesTail._nextIdentityChange=null)}_reinsertAfter(t,e,n){null!==this._unlinkedRecords&&this._unlinkedRecords.remove(t);const s=t._prevRemoved,r=t._nextRemoved;return null===s?this._removalsHead=r:s._nextRemoved=r,null===r?this._removalsTail=s:r._prevRemoved=s,this._insertAfter(t,e,n),this._addToMoves(t,n),t}_moveAfter(t,e,n){return this._unlink(t),this._insertAfter(t,e,n),this._addToMoves(t,n),t}_addAfter(t,e,n){return this._insertAfter(t,e,n),this._additionsTail=null===this._additionsTail?this._additionsHead=t:this._additionsTail._nextAdded=t,t}_insertAfter(t,e,n){const s=null===e?this._itHead:e._next;return t._next=s,t._prev=e,null===s?this._itTail=t:s._prev=t,null===e?this._itHead=t:e._next=t,null===this._linkedRecords&&(this._linkedRecords=new Uo),this._linkedRecords.put(t),t.currentIndex=n,t}_remove(t){return this._addToRemovals(this._unlink(t))}_unlink(t){null!==this._linkedRecords&&this._linkedRecords.remove(t);const e=t._prev,n=t._next;return null===e?this._itHead=n:e._next=n,null===n?this._itTail=e:n._prev=e,t}_addToMoves(t,e){return t.previousIndex===e||(this._movesTail=null===this._movesTail?this._movesHead=t:this._movesTail._nextMoved=t),t}_addToRemovals(t){return null===this._unlinkedRecords&&(this._unlinkedRecords=new Uo),this._unlinkedRecords.put(t),t.currentIndex=null,t._nextRemoved=null,null===this._removalsTail?(this._removalsTail=this._removalsHead=t,t._prevRemoved=null):(t._prevRemoved=this._removalsTail,this._removalsTail=this._removalsTail._nextRemoved=t),t}_addIdentityChange(t,e){return t.item=e,this._identityChangesTail=null===this._identityChangesTail?this._identityChangesHead=t:this._identityChangesTail._nextIdentityChange=t,t}}class Bo{constructor(t,e){this.item=t,this.trackById=e,this.currentIndex=null,this.previousIndex=null,this._nextPrevious=null,this._prev=null,this._next=null,this._prevDup=null,this._nextDup=null,this._prevRemoved=null,this._nextRemoved=null,this._nextAdded=null,this._nextMoved=null,this._nextIdentityChange=null}}class $o{constructor(){this._head=null,this._tail=null}add(t){null===this._head?(this._head=this._tail=t,t._nextDup=null,t._prevDup=null):(this._tail._nextDup=t,t._prevDup=this._tail,t._nextDup=null,this._tail=t)}get(t,e){let n;for(n=this._head;null!==n;n=n._nextDup)if((null===e||e<=n.currentIndex)&&Object.is(n.trackById,t))return n;return null}remove(t){const e=t._prevDup,n=t._nextDup;return null===e?this._head=n:e._nextDup=n,null===n?this._tail=e:n._prevDup=e,null===this._head}}class Uo{constructor(){this.map=new Map}put(t){const e=t.trackById;let n=this.map.get(e);n||(n=new $o,this.map.set(e,n)),n.add(t)}get(t,e){const n=this.map.get(t);return n?n.get(t,e):null}remove(t){const e=t.trackById;return this.map.get(e).remove(t)&&this.map.delete(e),t}get isEmpty(){return 0===this.map.size}clear(){this.map.clear()}}function Zo(t,e,n){const s=t.previousIndex;if(null===s)return s;let r=0;return n&&s<n.length&&(r=n[s]),s+e+r}class qo{constructor(){}supports(t){return t instanceof Map||mi(t)}create(){return new Wo}}class Wo{constructor(){this._records=new Map,this._mapHead=null,this._appendAfter=null,this._previousMapHead=null,this._changesHead=null,this._changesTail=null,this._additionsHead=null,this._additionsTail=null,this._removalsHead=null,this._removalsTail=null}get isDirty(){return null!==this._additionsHead||null!==this._changesHead||null!==this._removalsHead}forEachItem(t){let e;for(e=this._mapHead;null!==e;e=e._next)t(e)}forEachPreviousItem(t){let e;for(e=this._previousMapHead;null!==e;e=e._nextPrevious)t(e)}forEachChangedItem(t){let e;for(e=this._changesHead;null!==e;e=e._nextChanged)t(e)}forEachAddedItem(t){let e;for(e=this._additionsHead;null!==e;e=e._nextAdded)t(e)}forEachRemovedItem(t){let e;for(e=this._removalsHead;null!==e;e=e._nextRemoved)t(e)}diff(t){if(t){if(!(t instanceof Map||mi(t)))throw new Error(`Error trying to diff '${K(t)}'. Only maps and objects are allowed`)}else t=new Map;return this.check(t)?this:null}onDestroy(){}check(t){this._reset();let e=this._mapHead;if(this._appendAfter=null,this._forEach(t,(t,n)=>{if(e&&e.key===n)this._maybeAddToChanges(e,t),this._appendAfter=e,e=e._next;else{const s=this._getOrCreateRecordForKey(n,t);e=this._insertBeforeOrAppend(e,s)}}),e){e._prev&&(e._prev._next=null),this._removalsHead=e;for(let t=e;null!==t;t=t._nextRemoved)t===this._mapHead&&(this._mapHead=null),this._records.delete(t.key),t._nextRemoved=t._next,t.previousValue=t.currentValue,t.currentValue=null,t._prev=null,t._next=null}return this._changesTail&&(this._changesTail._nextChanged=null),this._additionsTail&&(this._additionsTail._nextAdded=null),this.isDirty}_insertBeforeOrAppend(t,e){if(t){const n=t._prev;return e._next=t,e._prev=n,t._prev=e,n&&(n._next=e),t===this._mapHead&&(this._mapHead=e),this._appendAfter=t,t}return this._appendAfter?(this._appendAfter._next=e,e._prev=this._appendAfter):this._mapHead=e,this._appendAfter=e,null}_getOrCreateRecordForKey(t,e){if(this._records.has(t)){const n=this._records.get(t);this._maybeAddToChanges(n,e);const s=n._prev,r=n._next;return s&&(s._next=r),r&&(r._prev=s),n._next=null,n._prev=null,n}const n=new Go(t);return this._records.set(t,n),n.currentValue=e,this._addToAdditions(n),n}_reset(){if(this.isDirty){let t;for(this._previousMapHead=this._mapHead,t=this._previousMapHead;null!==t;t=t._next)t._nextPrevious=t._next;for(t=this._changesHead;null!==t;t=t._nextChanged)t.previousValue=t.currentValue;for(t=this._additionsHead;null!=t;t=t._nextAdded)t.previousValue=t.currentValue;this._changesHead=this._changesTail=null,this._additionsHead=this._additionsTail=null,this._removalsHead=null}}_maybeAddToChanges(t,e){Object.is(e,t.currentValue)||(t.previousValue=t.currentValue,t.currentValue=e,this._addToChanges(t))}_addToAdditions(t){null===this._additionsHead?this._additionsHead=this._additionsTail=t:(this._additionsTail._nextAdded=t,this._additionsTail=t)}_addToChanges(t){null===this._changesHead?this._changesHead=this._changesTail=t:(this._changesTail._nextChanged=t,this._changesTail=t)}_forEach(t,e){t instanceof Map?t.forEach(e):Object.keys(t).forEach(n=>e(t[n],n))}}class Go{constructor(t){this.key=t,this.previousValue=null,this.currentValue=null,this._nextPrevious=null,this._next=null,this._prev=null,this._nextAdded=null,this._nextRemoved=null,this._nextChanged=null}}function Qo(){return new Jo([new Fo])}let Jo=(()=>{class t{constructor(t){this.factories=t}static create(e,n){if(null!=n){const t=n.factories.slice();e=e.concat(t)}return new t(e)}static extend(e){return{provide:t,useFactory:n=>t.create(e,n||Qo()),deps:[[t,new ts,new Xn]]}}find(t){const e=this.factories.find(e=>e.supports(t));if(null!=e)return e;throw new Error(`Cannot find a differ supporting object '${t}' of type '${n=t,n.name||typeof n}'`);var n}}return t.\u0275prov=lt({token:t,providedIn:"root",factory:Qo}),t})();function Ko(){return new Yo([new qo])}let Yo=(()=>{class t{constructor(t){this.factories=t}static create(e,n){if(n){const t=n.factories.slice();e=e.concat(t)}return new t(e)}static extend(e){return{provide:t,useFactory:n=>t.create(e,n||Ko()),deps:[[t,new ts,new Xn]]}}find(t){const e=this.factories.find(e=>e.supports(t));if(e)return e;throw new Error(`Cannot find a differ supporting object '${t}'`)}}return t.\u0275prov=lt({token:t,providedIn:"root",factory:Ko}),t})();function Xo(t,e,n,s,r=!1){for(;null!==n;){const i=e[n.index];if(null!==i&&s.push(fe(i)),Kt(i))for(let t=Qt;t<i.length;t++){const e=i[t],n=e[1].firstChild;null!==n&&Xo(e[1],e,n,s)}const o=n.type;if(8&o)Xo(t,e,n.child,s);else if(32&o){const t=ys(n,e);let r;for(;r=t();)s.push(r)}else if(16&o){const t=Ns(e,n);if(Array.isArray(t))s.push(...t);else{const n=_s(e[16]);Xo(n[1],n,t,s,!0)}}n=r?n.projectionNext:n.next}return s}class tl{constructor(t,e){this._lView=t,this._cdRefInjectingView=e,this._appRef=null,this._attachedToViewContainer=!1}get rootNodes(){const t=this._lView,e=t[1];return Xo(e,t,e.firstChild,[])}get context(){return this._lView[8]}set context(t){this._lView[8]=t}get destroyed(){return 256==(256&this._lView[2])}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){const t=this._lView[3];if(Kt(t)){const e=t[8],n=e?e.indexOf(this):-1;n>-1&&(ks(t,n),jn(e,n))}this._attachedToViewContainer=!1}As(this._lView[1],this._lView)}onDestroy(t){!function(t,e,n,s){const r=Br(e);r.push(s)}(0,this._lView,0,t)}markForCheck(){Rr(this._cdRefInjectingView||this._lView)}detach(){this._lView[2]&=-129}reattach(){this._lView[2]|=128}detectChanges(){jr(this._lView[1],this._lView,this.context)}checkNoChanges(){!function(t,e,n){He(!0);try{jr(t,e,n)}finally{He(!1)}}(this._lView[1],this._lView,this.context)}attachToViewContainerRef(){if(this._appRef)throw new Error("This view is already attached directly to the ApplicationRef!");this._attachedToViewContainer=!0}detachFromAppRef(){var t;this._appRef=null,Rs(this._lView[1],t=this._lView,t[11],2,null,null)}attachToAppRef(t){if(this._attachedToViewContainer)throw new Error("This view is already attached to a ViewContainer!");this._appRef=t}}class el extends tl{constructor(t){super(t),this._view=t}detectChanges(){Fr(this._view)}checkNoChanges(){!function(t){He(!0);try{Fr(t)}finally{He(!1)}}(this._view)}get context(){return null}}const nl=[new qo],sl=new Jo([new Fo]),rl=new Yo(nl),il=function(){return t=Oe(),e=xe(),4&t.type?new al(e,t,To(t,e)):null;var t,e};let ol=(()=>{class t{}return t.__NG_ELEMENT_ID__=il,t})();const ll=ol,al=class extends ll{constructor(t,e,n){super(),this._declarationLView=t,this._declarationTContainer=e,this.elementRef=n}createEmbeddedView(t){const e=this._declarationTContainer.tViews,n=ar(this._declarationLView,e,t,16,null,e.declTNode,null,null,null,null);n[17]=this._declarationLView[this._declarationTContainer.index];const s=this._declarationLView[19];return null!==s&&(n[19]=s.createEmbeddedView(e)),hr(e,n,t),new tl(n)}};class cl{}const ul=function(){return function(t,e){let n;const s=e[t.index];if(Kt(s))n=s;else{let r;if(8&t.type)r=fe(s);else{const n=e[11];r=n.createComment("");const s=ge(t,e);Is(n,Vs(n,s),r,function(t,e){return he(t)?t.nextSibling(e):e.nextSibling}(n,s),!1)}e[t.index]=n=Dr(s,e,r,t),Pr(e,n)}return new fl(n,t,e)}(Oe(),xe())};let hl=(()=>{class t{}return t.__NG_ELEMENT_ID__=ul,t})();const dl=hl,fl=class extends dl{constructor(t,e,n){super(),this._lContainer=t,this._hostTNode=e,this._hostLView=n}get element(){return To(this._hostTNode,this._hostLView)}get injector(){return new Tn(this._hostTNode,this._hostLView)}get parentInjector(){const t=mn(this._hostTNode,this._hostLView);if(un(t)){const e=dn(t,this._hostLView),n=hn(t);return new Tn(e[1].data[n+8],e)}return new Tn(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(t){const e=pl(this._lContainer);return null!==e&&e[t]||null}get length(){return this._lContainer.length-Qt}createEmbeddedView(t,e,n){const s=t.createEmbeddedView(e||{});return this.insert(s,n),s}createComponent(t,e,n,s,r){const i=n||this.parentInjector;if(!r&&null==t.ngModule&&i){const t=i.get(cl,null);t&&(r=t)}const o=t.create(i,s,void 0,r);return this.insert(o.hostView,e),o}insert(t,e){const n=t._lView,s=n[1];if(Kt(n[3])){const e=this.indexOf(t);if(-1!==e)this.detach(e);else{const e=n[3],s=new fl(e,e[6],e[3]);s.detach(s.indexOf(t))}}const r=this._adjustIndex(e),i=this._lContainer;!function(t,e,n,s){const r=Qt+s,i=n.length;s>0&&(n[r-1][4]=e),s<i-Qt?(e[4]=n[r],Rn(n,Qt+s,e)):(n.push(e),e[4]=null),e[3]=n;const o=e[17];null!==o&&n!==o&&function(t,e){const n=t[9];e[16]!==e[3][3][16]&&(t[2]=!0),null===n?t[9]=[e]:n.push(e)}(o,e);const l=e[19];null!==l&&l.insertView(t),e[2]|=128}(s,n,i,r);const o=Ms(r,i),l=n[11],a=Vs(l,i[7]);return null!==a&&function(t,e,n,s,r,i){s[0]=r,s[6]=e,Rs(t,s,n,1,r,i)}(s,i[6],l,n,a,o),t.attachToViewContainerRef(),Rn(gl(i),r,t),t}move(t,e){return this.insert(t,e)}indexOf(t){const e=pl(this._lContainer);return null!==e?e.indexOf(t):-1}remove(t){const e=this._adjustIndex(t,-1),n=ks(this._lContainer,e);n&&(jn(gl(this._lContainer),e),As(n[1],n))}detach(t){const e=this._adjustIndex(t,-1),n=ks(this._lContainer,e);return n&&null!=jn(gl(this._lContainer),e)?new tl(n):null}_adjustIndex(t,e=0){return null==t?this.length+e:t}};function pl(t){return t[8]}function gl(t){return t[8]||(t[8]=[])}const vl={};class yl extends Io{constructor(t){super(),this.ngModule=t}resolveComponentFactory(t){const e=qt(t);return new bl(e,this.ngModule)}}function _l(t){const e=[];for(let n in t)t.hasOwnProperty(n)&&e.push({propName:t[n],templateName:n});return e}const ml=new Mn("SCHEDULER_TOKEN",{providedIn:"root",factory:()=>fs});class bl extends Ao{constructor(t,e){super(),this.componentDef=t,this.ngModule=e,this.componentType=t.type,this.selector=t.selectors.map(Ks).join(","),this.ngContentSelectors=t.ngContentSelectors?t.ngContentSelectors:[],this.isBoundToModule=!!e}get inputs(){return _l(this.componentDef.inputs)}get outputs(){return _l(this.componentDef.outputs)}create(t,e,n,s){const r=(s=s||this.ngModule)?function(t,e){return{get:(n,s,r)=>{const i=t.get(n,vl,r);return i!==vl||s===vl?i:e.get(n,s,r)}}}(t,s.injector):t,i=r.get(Ho,de),o=r.get(Po,null),l=i.createRenderer(null,this.componentDef),a=this.componentDef.selectors[0][0]||"div",c=n?function(t,e,n){if(he(t))return t.selectRootElement(e,n===wt.ShadowDom);let s="string"==typeof e?t.querySelector(e):e;return s.textContent="",s}(l,n,this.componentDef.encapsulation):Es(i.createRenderer(null,this.componentDef),a,function(t){const e=t.toLowerCase();return"svg"===e?ce:"math"===e?"http://www.w3.org/1998/MathML/":null}(a)),u=this.componentDef.onPush?576:528,h={components:[],scheduler:fs,clean:Lr,playerHandler:null,flags:0},d=mr(0,null,null,1,0,null,null,null,null,null),f=ar(null,d,h,u,null,null,i,l,o,r);let p,g;Be(f);try{const t=function(t,e,n,s,r,i){const o=n[1];n[20]=t;const l=cr(o,20,2,"#host",null),a=l.mergedAttrs=e.hostAttrs;null!==a&&(qr(l,a,!0),null!==t&&(on(r,t,a),null!==l.classes&&zs(r,t,l.classes),null!==l.styles&&Fs(r,t,l.styles)));const c=s.createRenderer(t,e),u=ar(n,_r(e),null,e.onPush?64:16,n[20],l,s,c,null,null);return o.firstCreatePass&&(bn(vn(l,n),o,e.type),kr(o,l),Or(l,n.length,1)),Pr(n,u),n[20]=u}(c,this.componentDef,f,i,l);if(c)if(n)on(l,c,["ng-version",jo.full]);else{const{attrs:t,classes:e}=function(t){const e=[],n=[];let s=1,r=2;for(;s<t.length;){let i=t[s];if("string"==typeof i)2===r?""!==i&&e.push(i,t[++s]):8===r&&n.push(i);else{if(!Ws(r))break;r=i}s++}return{attrs:e,classes:n}}(this.componentDef.selectors[0]);t&&on(l,c,t),e&&e.length>0&&zs(l,c,e.join(" "))}if(g=ve(d,Gt),void 0!==e){const t=g.projection=[];for(let n=0;n<this.ngContentSelectors.length;n++){const s=e[n];t.push(null!=s?Array.from(s):null)}}p=function(t,e,n,s,r){const i=n[1],o=function(t,e,n){const s=Oe();t.firstCreatePass&&(n.providersResolver&&n.providersResolver(n),Ir(t,s,e,ur(t,e,1,null),n));const r=On(e,t,s.directiveStart,s);ls(r,e);const i=ge(s,e);return i&&ls(i,e),r}(i,n,e);if(s.components.push(o),t[8]=o,r&&r.forEach(t=>t(o,e)),e.contentQueries){const t=Oe();e.contentQueries(1,o,t.directiveStart)}const l=Oe();return!i.firstCreatePass||null===e.hostBindings&&null===e.hostAttrs||(Qe(l.index),Er(n[1],l,0,l.directiveStart,l.directiveEnd,e),xr(e,o)),o}(t,this.componentDef,f,h,[ci]),hr(d,f,null)}finally{We()}return new Cl(this.componentType,p,To(g,f),f,g)}}class Cl extends class{}{constructor(t,e,n,s,r){super(),this.location=n,this._rootLView=s,this._tNode=r,this.instance=e,this.hostView=this.changeDetectorRef=new el(s),this.componentType=t}get injector(){return new Tn(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(t){this.hostView.onDestroy(t)}}const wl=new Map;class El extends cl{constructor(t,e){super(),this._parent=e,this._bootstrapComponents=[],this.injector=this,this.destroyCbs=[],this.componentFactoryResolver=new yl(this);const n=Wt(t),s=t[Nt]||null;s&&yo(s),this._bootstrapComponents=gs(n.bootstrap),this._r3Injector=ti(t,e,[{provide:cl,useValue:this},{provide:Io,useValue:this.componentFactoryResolver}],K(t)),this._r3Injector._resolveInjectorDefTypes(),this.instance=this.get(t)}get(t,e=ai.THROW_IF_NOT_FOUND,n=vt.Default){return t===ai||t===cl||t===Wr?this:this._r3Injector.get(t,e,n)}destroy(){const t=this._r3Injector;!t.destroyed&&t.destroy(),this.destroyCbs.forEach(t=>t()),this.destroyCbs=null}onDestroy(t){this.destroyCbs.push(t)}}class xl extends class{}{constructor(t){super(),this.moduleType=t,null!==Wt(t)&&function(t){const e=new Set;!function t(n){const s=Wt(n,!0),r=s.id;null!==r&&(function(t,e,n){if(e&&e!==n)throw new Error(`Duplicate module registered for ${t} - ${K(e)} vs ${K(e.name)}`)}(r,wl.get(r),n),wl.set(r,n));const i=gs(s.imports);for(const o of i)e.has(o)||(e.add(o),t(o))}(t)}(t)}create(t){return new El(this.moduleType,t)}}function kl(t,e,n,s){return function(t,e,n,s,r,i){const o=e+n;return Ci(t,o,r)?bi(t,o+1,i?s.call(i,r):s(r)):Il(t,o+1)}(xe(),Ne(),t,e,n,s)}function Al(t,e,n,s,r){return function(t,e,n,s,r,i,o){const l=e+n;return wi(t,l,r,i)?bi(t,l+2,o?s.call(o,r,i):s(r,i)):Il(t,l+2)}(xe(),Ne(),t,e,n,s,r)}function Ol(t,e,n,s,r,i){return Sl(xe(),Ne(),t,e,n,s,r,i)}function Il(t,e){const n=t[e];return n===Ys?void 0:n}function Sl(t,e,n,s,r,i,o,l){const a=e+n;return function(t,e,n,s,r){const i=wi(t,e,n,s);return Ci(t,e+2,r)||i}(t,a,r,i,o)?bi(t,a+3,l?s.call(l,r,i,o):s(r,i,o)):Il(t,a+3)}function Tl(t){return e=>{setTimeout(t,void 0,e)}}const Vl=class extends E{constructor(t=!1){super(),this.__isAsync=t}emit(t){super.next(t)}subscribe(t,e,n){var s,r,i;let o=t,l=e||(()=>null),a=n;if(t&&"object"==typeof t){const e=t;o=null===(s=e.next)||void 0===s?void 0:s.bind(e),l=null===(r=e.error)||void 0===r?void 0:r.bind(e),a=null===(i=e.complete)||void 0===i?void 0:i.bind(e)}this.__isAsync&&(l=Tl(l),o&&(o=Tl(o)),a&&(a=Tl(a)));const c=super.subscribe({next:o,error:l,complete:a});return t instanceof h&&t.add(c),c}},Dl=new Mn("Application Initializer");let Hl=(()=>{class t{constructor(t){this.appInits=t,this.resolve=So,this.reject=So,this.initialized=!1,this.done=!1,this.donePromise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}runInitializers(){if(this.initialized)return;const t=[],e=()=>{this.done=!0,this.resolve()};if(this.appInits)for(let n=0;n<this.appInits.length;n++){const e=this.appInits[n]();if(Mi(e))t.push(e);else if(Pi(e)){const n=new Promise((t,n)=>{e.subscribe({complete:t,error:n})});t.push(n)}}Promise.all(t).then(()=>{e()}).catch(t=>{this.reject(t)}),0===t.length&&e(),this.initialized=!0}}return t.\u0275fac=function(e){return new(e||t)(Qn(Dl,8))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const Nl=new Mn("AppId"),Ml={provide:Nl,useFactory:function(){return`${Pl()}${Pl()}${Pl()}`},deps:[]};function Pl(){return String.fromCharCode(97+Math.floor(25*Math.random()))}const Rl=new Mn("Platform Initializer"),jl=new Mn("Platform ID"),Fl=new Mn("appBootstrapListener");let zl=(()=>{class t{log(t){console.log(t)}warn(t){console.warn(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const Ll=new Mn("LocaleId"),Bl=new Mn("DefaultCurrencyCode");class $l{constructor(t,e){this.ngModuleFactory=t,this.componentFactories=e}}const Ul=function(t){return new xl(t)},Zl=Ul,ql=function(t){return Promise.resolve(Ul(t))},Wl=function(t){const e=Ul(t),n=gs(Wt(t).declarations).reduce((t,e)=>{const n=qt(e);return n&&t.push(new bl(n)),t},[]);return new $l(e,n)},Gl=Wl,Ql=function(t){return Promise.resolve(Wl(t))};let Jl=(()=>{class t{constructor(){this.compileModuleSync=Zl,this.compileModuleAsync=ql,this.compileModuleAndAllComponentsSync=Gl,this.compileModuleAndAllComponentsAsync=Ql}clearCache(){}clearCacheFor(t){}getModuleId(t){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const Kl=(()=>Promise.resolve(0))();function Yl(t){"undefined"==typeof Zone?Kl.then(()=>{t&&t.apply(null,null)}):Zone.current.scheduleMicroTask("scheduleMicrotask",t)}class Xl{constructor({enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:e=!1,shouldCoalesceRunChangeDetection:n=!1}){if(this.hasPendingMacrotasks=!1,this.hasPendingMicrotasks=!1,this.isStable=!0,this.onUnstable=new Vl(!1),this.onMicrotaskEmpty=new Vl(!1),this.onStable=new Vl(!1),this.onError=new Vl(!1),"undefined"==typeof Zone)throw new Error("In this configuration Angular requires Zone.js");Zone.assertZonePatched();const s=this;s._nesting=0,s._outer=s._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(s._inner=s._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(s._inner=s._inner.fork(Zone.longStackTraceZoneSpec)),s.shouldCoalesceEventChangeDetection=!n&&e,s.shouldCoalesceRunChangeDetection=n,s.lastRequestAnimationFrameId=-1,s.nativeRequestAnimationFrame=function(){let t=Ot.requestAnimationFrame,e=Ot.cancelAnimationFrame;if("undefined"!=typeof Zone&&t&&e){const n=t[Zone.__symbol__("OriginalDelegate")];n&&(t=n);const s=e[Zone.__symbol__("OriginalDelegate")];s&&(e=s)}return{nativeRequestAnimationFrame:t,nativeCancelAnimationFrame:e}}().nativeRequestAnimationFrame,function(t){const e=()=>{!function(t){t.isCheckStableRunning||-1!==t.lastRequestAnimationFrameId||(t.lastRequestAnimationFrameId=t.nativeRequestAnimationFrame.call(Ot,()=>{t.fakeTopEventTask||(t.fakeTopEventTask=Zone.root.scheduleEventTask("fakeTopEventTask",()=>{t.lastRequestAnimationFrameId=-1,na(t),t.isCheckStableRunning=!0,ea(t),t.isCheckStableRunning=!1},void 0,()=>{},()=>{})),t.fakeTopEventTask.invoke()}),na(t))}(t)};t._inner=t._inner.fork({name:"angular",properties:{isAngularZone:!0},onInvokeTask:(n,s,r,i,o,l)=>{try{return sa(t),n.invokeTask(r,i,o,l)}finally{(t.shouldCoalesceEventChangeDetection&&"eventTask"===i.type||t.shouldCoalesceRunChangeDetection)&&e(),ra(t)}},onInvoke:(n,s,r,i,o,l,a)=>{try{return sa(t),n.invoke(r,i,o,l,a)}finally{t.shouldCoalesceRunChangeDetection&&e(),ra(t)}},onHasTask:(e,n,s,r)=>{e.hasTask(s,r),n===s&&("microTask"==r.change?(t._hasPendingMicrotasks=r.microTask,na(t),ea(t)):"macroTask"==r.change&&(t.hasPendingMacrotasks=r.macroTask))},onHandleError:(e,n,s,r)=>(e.handleError(s,r),t.runOutsideAngular(()=>t.onError.emit(r)),!1)})}(s)}static isInAngularZone(){return!0===Zone.current.get("isAngularZone")}static assertInAngularZone(){if(!Xl.isInAngularZone())throw new Error("Expected to be in Angular Zone, but it is not!")}static assertNotInAngularZone(){if(Xl.isInAngularZone())throw new Error("Expected to not be in Angular Zone, but it is!")}run(t,e,n){return this._inner.run(t,e,n)}runTask(t,e,n,s){const r=this._inner,i=r.scheduleEventTask("NgZoneEvent: "+s,t,ta,So,So);try{return r.runTask(i,e,n)}finally{r.cancelTask(i)}}runGuarded(t,e,n){return this._inner.runGuarded(t,e,n)}runOutsideAngular(t){return this._outer.run(t)}}const ta={};function ea(t){if(0==t._nesting&&!t.hasPendingMicrotasks&&!t.isStable)try{t._nesting++,t.onMicrotaskEmpty.emit(null)}finally{if(t._nesting--,!t.hasPendingMicrotasks)try{t.runOutsideAngular(()=>t.onStable.emit(null))}finally{t.isStable=!0}}}function na(t){t.hasPendingMicrotasks=!!(t._hasPendingMicrotasks||(t.shouldCoalesceEventChangeDetection||t.shouldCoalesceRunChangeDetection)&&-1!==t.lastRequestAnimationFrameId)}function sa(t){t._nesting++,t.isStable&&(t.isStable=!1,t.onUnstable.emit(null))}function ra(t){t._nesting--,ea(t)}class ia{constructor(){this.hasPendingMicrotasks=!1,this.hasPendingMacrotasks=!1,this.isStable=!0,this.onUnstable=new Vl,this.onMicrotaskEmpty=new Vl,this.onStable=new Vl,this.onError=new Vl}run(t,e,n){return t.apply(e,n)}runGuarded(t,e,n){return t.apply(e,n)}runOutsideAngular(t){return t()}runTask(t,e,n,s){return t.apply(e,n)}}let oa=(()=>{class t{constructor(t){this._ngZone=t,this._pendingCount=0,this._isZoneStable=!0,this._didWork=!1,this._callbacks=[],this.taskTrackingZone=null,this._watchAngularEvents(),t.run(()=>{this.taskTrackingZone="undefined"==typeof Zone?null:Zone.current.get("TaskTrackingZone")})}_watchAngularEvents(){this._ngZone.onUnstable.subscribe({next:()=>{this._didWork=!0,this._isZoneStable=!1}}),this._ngZone.runOutsideAngular(()=>{this._ngZone.onStable.subscribe({next:()=>{Xl.assertNotInAngularZone(),Yl(()=>{this._isZoneStable=!0,this._runCallbacksIfReady()})}})})}increasePendingRequestCount(){return this._pendingCount+=1,this._didWork=!0,this._pendingCount}decreasePendingRequestCount(){if(this._pendingCount-=1,this._pendingCount<0)throw new Error("pending async requests below zero");return this._runCallbacksIfReady(),this._pendingCount}isStable(){return this._isZoneStable&&0===this._pendingCount&&!this._ngZone.hasPendingMacrotasks}_runCallbacksIfReady(){if(this.isStable())Yl(()=>{for(;0!==this._callbacks.length;){let t=this._callbacks.pop();clearTimeout(t.timeoutId),t.doneCb(this._didWork)}this._didWork=!1});else{let t=this.getPendingTasks();this._callbacks=this._callbacks.filter(e=>!e.updateCb||!e.updateCb(t)||(clearTimeout(e.timeoutId),!1)),this._didWork=!0}}getPendingTasks(){return this.taskTrackingZone?this.taskTrackingZone.macroTasks.map(t=>({source:t.source,creationLocation:t.creationLocation,data:t.data})):[]}addCallback(t,e,n){let s=-1;e&&e>0&&(s=setTimeout(()=>{this._callbacks=this._callbacks.filter(t=>t.timeoutId!==s),t(this._didWork,this.getPendingTasks())},e)),this._callbacks.push({doneCb:t,timeoutId:s,updateCb:n})}whenStable(t,e,n){if(n&&!this.taskTrackingZone)throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');this.addCallback(t,e,n),this._runCallbacksIfReady()}getPendingRequestCount(){return this._pendingCount}findProviders(t,e,n){return[]}}return t.\u0275fac=function(e){return new(e||t)(Qn(Xl))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})(),la=(()=>{class t{constructor(){this._applications=new Map,ua.addToWindow(this)}registerApplication(t,e){this._applications.set(t,e)}unregisterApplication(t){this._applications.delete(t)}unregisterAllApplications(){this._applications.clear()}getTestability(t){return this._applications.get(t)||null}getAllTestabilities(){return Array.from(this._applications.values())}getAllRootElements(){return Array.from(this._applications.keys())}findTestabilityInTree(t,e=!0){return ua.findTestabilityInTree(this,t,e)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();class aa{addToWindow(t){}findTestabilityInTree(t,e,n){return null}}let ca,ua=new aa,ha=!0,da=!1;const fa=new Mn("AllowMultipleToken");function pa(t,e,n=[]){const s=`Platform: ${e}`,r=new Mn(s);return(e=[])=>{let i=ga();if(!i||i.injector.get(fa,!1))if(t)t(n.concat(e).concat({provide:r,useValue:!0}));else{const t=n.concat(e).concat({provide:r,useValue:!0},{provide:Qr,useValue:"platform"});!function(t){if(ca&&!ca.destroyed&&!ca.injector.get(fa,!1))throw new Error("There can be only one platform. Destroy the previous one to create a new one.");ca=t.get(va);const e=t.get(Rl,null);e&&e.forEach(t=>t())}(ai.create({providers:t,name:s}))}return function(t){const e=ga();if(!e)throw new Error("No platform exists!");if(!e.injector.get(t,null))throw new Error("A platform with a different configuration has been created. Please destroy it first.");return e}(r)}}function ga(){return ca&&!ca.destroyed?ca:null}let va=(()=>{class t{constructor(t){this._injector=t,this._modules=[],this._destroyListeners=[],this._destroyed=!1}bootstrapModuleFactory(t,e){const n=function(t,e){let n;return n="noop"===t?new ia:("zone.js"===t?void 0:t)||new Xl({enableLongStackTrace:(da=!0,ha),shouldCoalesceEventChangeDetection:!!(null==e?void 0:e.ngZoneEventCoalescing),shouldCoalesceRunChangeDetection:!!(null==e?void 0:e.ngZoneRunCoalescing)}),n}(e?e.ngZone:void 0,{ngZoneEventCoalescing:e&&e.ngZoneEventCoalescing||!1,ngZoneRunCoalescing:e&&e.ngZoneRunCoalescing||!1}),s=[{provide:Xl,useValue:n}];return n.run(()=>{const e=ai.create({providers:s,parent:this.injector,name:t.moduleType.name}),r=t.create(e),i=r.injector.get(ds,null);if(!i)throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");return n.runOutsideAngular(()=>{const t=n.onError.subscribe({next:t=>{i.handleError(t)}});r.onDestroy(()=>{ma(this._modules,r),t.unsubscribe()})}),function(t,e,n){try{const s=n();return Mi(s)?s.catch(n=>{throw e.runOutsideAngular(()=>t.handleError(n)),n}):s}catch(s){throw e.runOutsideAngular(()=>t.handleError(s)),s}}(i,n,()=>{const t=r.injector.get(Hl);return t.runInitializers(),t.donePromise.then(()=>(yo(r.injector.get(Ll,go)||go),this._moduleDoBootstrap(r),r))})})}bootstrapModule(t,e=[]){const n=ya({},e);return function(t,e,n){const s=new xl(n);return Promise.resolve(s)}(0,0,t).then(t=>this.bootstrapModuleFactory(t,n))}_moduleDoBootstrap(t){const e=t.injector.get(_a);if(t._bootstrapComponents.length>0)t._bootstrapComponents.forEach(t=>e.bootstrap(t));else{if(!t.instance.ngDoBootstrap)throw new Error(`The module ${K(t.instance.constructor)} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`);t.instance.ngDoBootstrap(e)}this._modules.push(t)}onDestroy(t){this._destroyListeners.push(t)}get injector(){return this._injector}destroy(){if(this._destroyed)throw new Error("The platform has already been destroyed!");this._modules.slice().forEach(t=>t.destroy()),this._destroyListeners.forEach(t=>t()),this._destroyed=!0}get destroyed(){return this._destroyed}}return t.\u0275fac=function(e){return new(e||t)(Qn(ai))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();function ya(t,e){return Array.isArray(e)?e.reduce(ya,t):Object.assign(Object.assign({},t),e)}let _a=(()=>{class t{constructor(t,e,n,s,r){this._zone=t,this._injector=e,this._exceptionHandler=n,this._componentFactoryResolver=s,this._initStatus=r,this._bootstrapListeners=[],this._views=[],this._runningTick=!1,this._stable=!0,this.componentTypes=[],this.components=[],this._onMicrotaskEmptySubscription=this._zone.onMicrotaskEmpty.subscribe({next:()=>{this._zone.run(()=>{this.tick()})}});const i=new _(t=>{this._stable=this._zone.isStable&&!this._zone.hasPendingMacrotasks&&!this._zone.hasPendingMicrotasks,this._zone.runOutsideAngular(()=>{t.next(this._stable),t.complete()})}),o=new _(t=>{let e;this._zone.runOutsideAngular(()=>{e=this._zone.onStable.subscribe(()=>{Xl.assertNotInAngularZone(),Yl(()=>{this._stable||this._zone.hasPendingMacrotasks||this._zone.hasPendingMicrotasks||(this._stable=!0,t.next(!0))})})});const n=this._zone.onUnstable.subscribe(()=>{Xl.assertInAngularZone(),this._stable&&(this._stable=!1,this._zone.runOutsideAngular(()=>{t.next(!1)}))});return()=>{e.unsubscribe(),n.unsubscribe()}});this.isStable=L(i,o.pipe(t=>{return B()((e=G,function(t){let n;n="function"==typeof e?e:function(){return e};const s=Object.create(t,q);return s.source=t,s.subjectFactory=n,s})(t));var e}))}bootstrap(t,e){if(!this._initStatus.done)throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");let n;n=t instanceof Ao?t:this._componentFactoryResolver.resolveComponentFactory(t),this.componentTypes.push(n.componentType);const s=n.isBoundToModule?void 0:this._injector.get(cl),r=n.create(ai.NULL,[],e||n.selector,s),i=r.location.nativeElement,o=r.injector.get(oa,null),l=o&&r.injector.get(la);return o&&l&&l.registerApplication(i,o),r.onDestroy(()=>{this.detachView(r.hostView),ma(this.components,r),l&&l.unregisterApplication(i)}),this._loadComponent(r),r}tick(){if(this._runningTick)throw new Error("ApplicationRef.tick is called recursively");try{this._runningTick=!0;for(let t of this._views)t.detectChanges()}catch(t){this._zone.runOutsideAngular(()=>this._exceptionHandler.handleError(t))}finally{this._runningTick=!1}}attachView(t){const e=t;this._views.push(e),e.attachToAppRef(this)}detachView(t){const e=t;ma(this._views,e),e.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView),this.tick(),this.components.push(t),this._injector.get(Fl,[]).concat(this._bootstrapListeners).forEach(e=>e(t))}ngOnDestroy(){this._views.slice().forEach(t=>t.destroy()),this._onMicrotaskEmptySubscription.unsubscribe()}get viewCount(){return this._views.length}}return t.\u0275fac=function(e){return new(e||t)(Qn(Xl),Qn(ai),Qn(ds),Qn(Io),Qn(Hl))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();function ma(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const ba=pa(null,"core",[{provide:jl,useValue:"unknown"},{provide:va,deps:[ai]},{provide:la,deps:[]},{provide:zl,deps:[]}]),Ca=[{provide:_a,useClass:_a,deps:[Xl,ai,ds,Io,Hl]},{provide:ml,deps:[Xl],useFactory:function(t){let e=[];return t.onStable.subscribe(()=>{for(;e.length;)e.pop()()}),function(t){e.push(t)}}},{provide:Hl,useClass:Hl,deps:[[new Xn,Dl]]},{provide:Jl,useClass:Jl,deps:[]},Ml,{provide:Jo,useFactory:function(){return sl},deps:[]},{provide:Yo,useFactory:function(){return rl},deps:[]},{provide:Ll,useFactory:function(t){return yo(t=t||"undefined"!=typeof $localize&&$localize.locale||go),t},deps:[[new Yn(Ll),new Xn,new ts]]},{provide:Bl,useValue:"USD"}];let wa=(()=>{class t{constructor(t){}}return t.\u0275fac=function(e){return new(e||t)(Qn(_a))},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({providers:Ca}),t})(),Ea=null;function xa(){return Ea}const ka=new Mn("DocumentToken");var Aa=function(t){return t[t.Zero=0]="Zero",t[t.One=1]="One",t[t.Two=2]="Two",t[t.Few=3]="Few",t[t.Many=4]="Many",t[t.Other=5]="Other",t}({});class Oa{}let Ia=(()=>{class t extends Oa{constructor(t){super(),this.locale=t}getPluralCategory(t,e){switch(function(t){return function(t){const e=function(t){return t.toLowerCase().replace(/_/g,"-")}(t);let n=fo(e);if(n)return n;const s=e.split("-")[0];if(n=fo(s),n)return n;if("en"===s)return uo;throw new Error(`Missing locale data for the locale "${t}".`)}(t)[po.PluralCase]}(e||this.locale)(t)){case Aa.Zero:return"zero";case Aa.One:return"one";case Aa.Two:return"two";case Aa.Few:return"few";case Aa.Many:return"many";default:return"other"}}}return t.\u0275fac=function(e){return new(e||t)(Qn(Ll))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})(),Sa=(()=>{class t{constructor(t,e,n,s){this._iterableDiffers=t,this._keyValueDiffers=e,this._ngEl=n,this._renderer=s,this._iterableDiffer=null,this._keyValueDiffer=null,this._initialClasses=[],this._rawClass=null}set klass(t){this._removeClasses(this._initialClasses),this._initialClasses="string"==typeof t?t.split(/\s+/):[],this._applyClasses(this._initialClasses),this._applyClasses(this._rawClass)}set ngClass(t){this._removeClasses(this._rawClass),this._applyClasses(this._initialClasses),this._iterableDiffer=null,this._keyValueDiffer=null,this._rawClass="string"==typeof t?t.split(/\s+/):t,this._rawClass&&(_i(this._rawClass)?this._iterableDiffer=this._iterableDiffers.find(this._rawClass).create():this._keyValueDiffer=this._keyValueDiffers.find(this._rawClass).create())}ngDoCheck(){if(this._iterableDiffer){const t=this._iterableDiffer.diff(this._rawClass);t&&this._applyIterableChanges(t)}else if(this._keyValueDiffer){const t=this._keyValueDiffer.diff(this._rawClass);t&&this._applyKeyValueChanges(t)}}_applyKeyValueChanges(t){t.forEachAddedItem(t=>this._toggleClass(t.key,t.currentValue)),t.forEachChangedItem(t=>this._toggleClass(t.key,t.currentValue)),t.forEachRemovedItem(t=>{t.previousValue&&this._toggleClass(t.key,!1)})}_applyIterableChanges(t){t.forEachAddedItem(t=>{if("string"!=typeof t.item)throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${K(t.item)}`);this._toggleClass(t.item,!0)}),t.forEachRemovedItem(t=>this._toggleClass(t.item,!1))}_applyClasses(t){t&&(Array.isArray(t)||t instanceof Set?t.forEach(t=>this._toggleClass(t,!0)):Object.keys(t).forEach(e=>this._toggleClass(e,!!t[e])))}_removeClasses(t){t&&(Array.isArray(t)||t instanceof Set?t.forEach(t=>this._toggleClass(t,!1)):Object.keys(t).forEach(t=>this._toggleClass(t,!1)))}_toggleClass(t,e){(t=t.trim())&&t.split(/\s+/g).forEach(t=>{e?this._renderer.addClass(this._ngEl.nativeElement,t):this._renderer.removeClass(this._ngEl.nativeElement,t)})}}return t.\u0275fac=function(e){return new(e||t)(Ai(Jo),Ai(Yo),Ai(Do),Ai(No))},t.\u0275dir=Ut({type:t,selectors:[["","ngClass",""]],inputs:{klass:["class","klass"],ngClass:"ngClass"}}),t})();class Ta{constructor(t,e,n,s){this.$implicit=t,this.ngForOf=e,this.index=n,this.count=s}get first(){return 0===this.index}get last(){return this.index===this.count-1}get even(){return this.index%2==0}get odd(){return!this.even}}let Va=(()=>{class t{constructor(t,e,n){this._viewContainer=t,this._template=e,this._differs=n,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;const n=this._ngForOf;if(!this._differ&&n)try{this._differ=this._differs.find(n).create(this.ngForTrackBy)}catch(e){throw new Error(`Cannot find a differ supporting object '${n}' of type '${t=n,t.name||typeof t}'. NgFor only supports binding to Iterables such as Arrays.`)}}var t;if(this._differ){const t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){const e=[];t.forEachOperation((t,n,s)=>{if(null==t.previousIndex){const n=this._viewContainer.createEmbeddedView(this._template,new Ta(null,this._ngForOf,-1,-1),null===s?void 0:s),r=new Da(t,n);e.push(r)}else if(null==s)this._viewContainer.remove(null===n?void 0:n);else if(null!==n){const r=this._viewContainer.get(n);this._viewContainer.move(r,s);const i=new Da(t,r);e.push(i)}});for(let n=0;n<e.length;n++)this._perViewChange(e[n].view,e[n].record);for(let n=0,s=this._viewContainer.length;n<s;n++){const t=this._viewContainer.get(n);t.context.index=n,t.context.count=s,t.context.ngForOf=this._ngForOf}t.forEachIdentityChange(t=>{this._viewContainer.get(t.currentIndex).context.$implicit=t.item})}_perViewChange(t,e){t.context.$implicit=e.item}static ngTemplateContextGuard(t,e){return!0}}return t.\u0275fac=function(e){return new(e||t)(Ai(hl),Ai(ol),Ai(Jo))},t.\u0275dir=Ut({type:t,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"}}),t})();class Da{constructor(t,e){this.record=t,this.view=e}}let Ha=(()=>{class t{constructor(t,e){this._viewContainer=t,this._context=new Na,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=e}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){Ma("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){Ma("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,e){return!0}}return t.\u0275fac=function(e){return new(e||t)(Ai(hl),Ai(ol))},t.\u0275dir=Ut({type:t,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"}}),t})();class Na{constructor(){this.$implicit=null,this.ngIf=null}}function Ma(t,e){if(e&&!e.createEmbeddedView)throw new Error(`${t} must be a TemplateRef, but received '${K(e)}'.`)}let Pa=(()=>{class t{transform(e,n,s){if(null==e)return null;if(!this.supports(e))throw function(t,e){return Error(`InvalidPipeArgument: '${e}' for pipe '${K(t)}'`)}(t,e);return e.slice(n,s)}supports(t){return"string"==typeof t||Array.isArray(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=Zt({name:"slice",type:t,pure:!1}),t})(),Ra=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({providers:[{provide:Oa,useClass:Ia}]}),t})();class ja extends class extends class{}{constructor(){super(...arguments),this.supportsDOMEvents=!0}}{static makeCurrent(){var t;t=new ja,Ea||(Ea=t)}onAndCancel(t,e,n){return t.addEventListener(e,n,!1),()=>{t.removeEventListener(e,n,!1)}}dispatchEvent(t,e){t.dispatchEvent(e)}remove(t){t.parentNode&&t.parentNode.removeChild(t)}createElement(t,e){return(e=e||this.getDefaultDocument()).createElement(t)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}isShadowRoot(t){return t instanceof DocumentFragment}getGlobalEventTarget(t,e){return"window"===e?window:"document"===e?t:"body"===e?t.body:null}getBaseHref(t){const e=(za=za||document.querySelector("base"),za?za.getAttribute("href"):null);return null==e?null:function(t){Fa=Fa||document.createElement("a"),Fa.setAttribute("href",t);const e=Fa.pathname;return"/"===e.charAt(0)?e:`/${e}`}(e)}resetBaseElement(){za=null}getUserAgent(){return window.navigator.userAgent}getCookie(t){return function(t,e){e=encodeURIComponent(e);for(const n of t.split(";")){const t=n.indexOf("="),[s,r]=-1==t?[n,""]:[n.slice(0,t),n.slice(t+1)];if(s.trim()===e)return decodeURIComponent(r)}return null}(document.cookie,t)}}let Fa,za=null;const La=new Mn("TRANSITION_ID"),Ba=[{provide:Dl,useFactory:function(t,e,n){return()=>{n.get(Hl).donePromise.then(()=>{const n=xa();Array.prototype.slice.apply(e.querySelectorAll("style[ng-transition]")).filter(e=>e.getAttribute("ng-transition")===t).forEach(t=>n.remove(t))})}},deps:[La,ka,ai],multi:!0}];class $a{static init(){var t;t=new $a,ua=t}addToWindow(t){Ot.getAngularTestability=(e,n=!0)=>{const s=t.findTestabilityInTree(e,n);if(null==s)throw new Error("Could not find testability for element.");return s},Ot.getAllAngularTestabilities=()=>t.getAllTestabilities(),Ot.getAllAngularRootElements=()=>t.getAllRootElements(),Ot.frameworkStabilizers||(Ot.frameworkStabilizers=[]),Ot.frameworkStabilizers.push(t=>{const e=Ot.getAllAngularTestabilities();let n=e.length,s=!1;const r=function(e){s=s||e,n--,0==n&&t(s)};e.forEach(function(t){t.whenStable(r)})})}findTestabilityInTree(t,e,n){if(null==e)return null;const s=t.getTestability(e);return null!=s?s:n?xa().isShadowRoot(e)?this.findTestabilityInTree(t,e.host,!0):this.findTestabilityInTree(t,e.parentElement,!0):null}}let Ua=(()=>{class t{build(){return new XMLHttpRequest}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const Za=new Mn("EventManagerPlugins");let qa=(()=>{class t{constructor(t,e){this._zone=e,this._eventNameToPlugin=new Map,t.forEach(t=>t.manager=this),this._plugins=t.slice().reverse()}addEventListener(t,e,n){return this._findPluginFor(e).addEventListener(t,e,n)}addGlobalEventListener(t,e,n){return this._findPluginFor(e).addGlobalEventListener(t,e,n)}getZone(){return this._zone}_findPluginFor(t){const e=this._eventNameToPlugin.get(t);if(e)return e;const n=this._plugins;for(let s=0;s<n.length;s++){const e=n[s];if(e.supports(t))return this._eventNameToPlugin.set(t,e),e}throw new Error(`No event manager plugin found for event ${t}`)}}return t.\u0275fac=function(e){return new(e||t)(Qn(Za),Qn(Xl))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();class Wa{constructor(t){this._doc=t}addGlobalEventListener(t,e,n){const s=xa().getGlobalEventTarget(this._doc,t);if(!s)throw new Error(`Unsupported event target ${s} for event ${e}`);return this.addEventListener(s,e,n)}}let Ga=(()=>{class t{constructor(){this._stylesSet=new Set}addStyles(t){const e=new Set;t.forEach(t=>{this._stylesSet.has(t)||(this._stylesSet.add(t),e.add(t))}),this.onStylesAdded(e)}onStylesAdded(t){}getAllStyles(){return Array.from(this._stylesSet)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})(),Qa=(()=>{class t extends Ga{constructor(t){super(),this._doc=t,this._hostNodes=new Map,this._hostNodes.set(t.head,[])}_addStylesToHost(t,e,n){t.forEach(t=>{const s=this._doc.createElement("style");s.textContent=t,n.push(e.appendChild(s))})}addHost(t){const e=[];this._addStylesToHost(this._stylesSet,t,e),this._hostNodes.set(t,e)}removeHost(t){const e=this._hostNodes.get(t);e&&e.forEach(Ja),this._hostNodes.delete(t)}onStylesAdded(t){this._hostNodes.forEach((e,n)=>{this._addStylesToHost(t,n,e)})}ngOnDestroy(){this._hostNodes.forEach(t=>t.forEach(Ja))}}return t.\u0275fac=function(e){return new(e||t)(Qn(ka))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();function Ja(t){xa().remove(t)}const Ka={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},Ya=/%COMP%/g;function Xa(t,e,n){for(let s=0;s<e.length;s++){let r=e[s];Array.isArray(r)?Xa(t,r,n):(r=r.replace(Ya,t),n.push(r))}return n}function tc(t){return e=>{if("__ngUnwrap__"===e)return t;!1===t(e)&&(e.preventDefault(),e.returnValue=!1)}}let ec=(()=>{class t{constructor(t,e,n){this.eventManager=t,this.sharedStylesHost=e,this.appId=n,this.rendererByCompId=new Map,this.defaultRenderer=new nc(t)}createRenderer(t,e){if(!t||!e)return this.defaultRenderer;switch(e.encapsulation){case wt.Emulated:{let n=this.rendererByCompId.get(e.id);return n||(n=new sc(this.eventManager,this.sharedStylesHost,e,this.appId),this.rendererByCompId.set(e.id,n)),n.applyToHost(t),n}case 1:case wt.ShadowDom:return new rc(this.eventManager,this.sharedStylesHost,t,e);default:if(!this.rendererByCompId.has(e.id)){const t=Xa(e.id,e.styles,[]);this.sharedStylesHost.addStyles(t),this.rendererByCompId.set(e.id,this.defaultRenderer)}return this.defaultRenderer}}begin(){}end(){}}return t.\u0275fac=function(e){return new(e||t)(Qn(qa),Qn(Qa),Qn(Nl))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();class nc{constructor(t){this.eventManager=t,this.data=Object.create(null)}destroy(){}createElement(t,e){return e?document.createElementNS(Ka[e]||e,t):document.createElement(t)}createComment(t){return document.createComment(t)}createText(t){return document.createTextNode(t)}appendChild(t,e){t.appendChild(e)}insertBefore(t,e,n){t&&t.insertBefore(e,n)}removeChild(t,e){t&&t.removeChild(e)}selectRootElement(t,e){let n="string"==typeof t?document.querySelector(t):t;if(!n)throw new Error(`The selector "${t}" did not match any elements`);return e||(n.textContent=""),n}parentNode(t){return t.parentNode}nextSibling(t){return t.nextSibling}setAttribute(t,e,n,s){if(s){e=s+":"+e;const r=Ka[s];r?t.setAttributeNS(r,e,n):t.setAttribute(e,n)}else t.setAttribute(e,n)}removeAttribute(t,e,n){if(n){const s=Ka[n];s?t.removeAttributeNS(s,e):t.removeAttribute(`${n}:${e}`)}else t.removeAttribute(e)}addClass(t,e){t.classList.add(e)}removeClass(t,e){t.classList.remove(e)}setStyle(t,e,n,s){s&(vs.DashCase|vs.Important)?t.style.setProperty(e,n,s&vs.Important?"important":""):t.style[e]=n}removeStyle(t,e,n){n&vs.DashCase?t.style.removeProperty(e):t.style[e]=""}setProperty(t,e,n){t[e]=n}setValue(t,e){t.nodeValue=e}listen(t,e,n){return"string"==typeof t?this.eventManager.addGlobalEventListener(t,e,tc(n)):this.eventManager.addEventListener(t,e,tc(n))}}class sc extends nc{constructor(t,e,n,s){super(t),this.component=n;const r=Xa(s+"-"+n.id,n.styles,[]);e.addStyles(r),this.contentAttr="_ngcontent-%COMP%".replace(Ya,s+"-"+n.id),this.hostAttr="_nghost-%COMP%".replace(Ya,s+"-"+n.id)}applyToHost(t){super.setAttribute(t,this.hostAttr,"")}createElement(t,e){const n=super.createElement(t,e);return super.setAttribute(n,this.contentAttr,""),n}}class rc extends nc{constructor(t,e,n,s){super(t),this.sharedStylesHost=e,this.hostEl=n,this.shadowRoot=n.attachShadow({mode:"open"}),this.sharedStylesHost.addHost(this.shadowRoot);const r=Xa(s.id,s.styles,[]);for(let i=0;i<r.length;i++){const t=document.createElement("style");t.textContent=r[i],this.shadowRoot.appendChild(t)}}nodeOrShadowRoot(t){return t===this.hostEl?this.shadowRoot:t}destroy(){this.sharedStylesHost.removeHost(this.shadowRoot)}appendChild(t,e){return super.appendChild(this.nodeOrShadowRoot(t),e)}insertBefore(t,e,n){return super.insertBefore(this.nodeOrShadowRoot(t),e,n)}removeChild(t,e){return super.removeChild(this.nodeOrShadowRoot(t),e)}parentNode(t){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)))}}let ic=(()=>{class t extends Wa{constructor(t){super(t)}supports(t){return!0}addEventListener(t,e,n){return t.addEventListener(e,n,!1),()=>this.removeEventListener(t,e,n)}removeEventListener(t,e,n){return t.removeEventListener(e,n)}}return t.\u0275fac=function(e){return new(e||t)(Qn(ka))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const oc=["alt","control","meta","shift"],lc={"\b":"Backspace","\t":"Tab","\x7f":"Delete","\x1b":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},ac={A:"1",B:"2",C:"3",D:"4",E:"5",F:"6",G:"7",H:"8",I:"9",J:"*",K:"+",M:"-",N:".",O:"/","`":"0","\x90":"NumLock"},cc={alt:t=>t.altKey,control:t=>t.ctrlKey,meta:t=>t.metaKey,shift:t=>t.shiftKey};let uc=(()=>{class t extends Wa{constructor(t){super(t)}supports(e){return null!=t.parseEventName(e)}addEventListener(e,n,s){const r=t.parseEventName(n),i=t.eventCallback(r.fullKey,s,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>xa().onAndCancel(e,r.domEventName,i))}static parseEventName(e){const n=e.toLowerCase().split("."),s=n.shift();if(0===n.length||"keydown"!==s&&"keyup"!==s)return null;const r=t._normalizeKey(n.pop());let i="";if(oc.forEach(t=>{const e=n.indexOf(t);e>-1&&(n.splice(e,1),i+=t+".")}),i+=r,0!=n.length||0===r.length)return null;const o={};return o.domEventName=s,o.fullKey=i,o}static getEventFullKey(t){let e="",n=function(t){let e=t.key;if(null==e){if(e=t.keyIdentifier,null==e)return"Unidentified";e.startsWith("U+")&&(e=String.fromCharCode(parseInt(e.substring(2),16)),3===t.location&&ac.hasOwnProperty(e)&&(e=ac[e]))}return lc[e]||e}(t);return n=n.toLowerCase()," "===n?n="space":"."===n&&(n="dot"),oc.forEach(s=>{s!=n&&(0,cc[s])(t)&&(e+=s+".")}),e+=n,e}static eventCallback(e,n,s){return r=>{t.getEventFullKey(r)===e&&s.runGuarded(()=>n(r))}}static _normalizeKey(t){switch(t){case"esc":return"escape";default:return t}}}return t.\u0275fac=function(e){return new(e||t)(Qn(ka))},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();const hc=pa(ba,"browser",[{provide:jl,useValue:"browser"},{provide:Rl,useValue:function(){ja.makeCurrent(),$a.init()},multi:!0},{provide:ka,useFactory:function(){return function(t){ue=t}(document),document},deps:[]}]),dc=[[],{provide:Qr,useValue:"root"},{provide:ds,useFactory:function(){return new ds},deps:[]},{provide:Za,useClass:ic,multi:!0,deps:[ka,Xl,jl]},{provide:Za,useClass:uc,multi:!0,deps:[ka]},[],{provide:ec,useClass:ec,deps:[qa,Qa,Nl]},{provide:Ho,useExisting:ec},{provide:Ga,useExisting:Qa},{provide:Qa,useClass:Qa,deps:[ka]},{provide:oa,useClass:oa,deps:[Xl]},{provide:qa,useClass:qa,deps:[Za,Xl]},{provide:class{},useClass:Ua,deps:[]},[]];let fc=(()=>{class t{constructor(t){if(t)throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.")}static withServerTransition(e){return{ngModule:t,providers:[{provide:Nl,useValue:e.appId},{provide:La,useExisting:Nl},Ba]}}}return t.\u0275fac=function(e){return new(e||t)(Qn(t,12))},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({providers:dc,imports:[Ra,wa]}),t})();function pc(t,e){return new _(n=>{const s=t.length;if(0===s)return void n.complete();const r=new Array(s);let i=0,o=0;for(let l=0;l<s;l++){const a=M(t[l]);let c=!1;n.add(a.subscribe({next:t=>{c||(c=!0,o++),r[l]=t},error:t=>n.error(t),complete:()=>{i++,i!==s&&c||(o===s&&n.next(e?e.reduce((t,e,n)=>(t[e]=r[n],t),{}):r),n.complete())}}))}})}"undefined"!=typeof window&&window;let gc=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this.onChange=t=>{},this.onTouched=()=>{}}setProperty(t,e){this._renderer.setProperty(this._elementRef.nativeElement,t,e)}registerOnTouched(t){this.onTouched=t}registerOnChange(t){this.onChange=t}setDisabledState(t){this.setProperty("disabled",t)}}return t.\u0275fac=function(e){return new(e||t)(Ai(No),Ai(Do))},t.\u0275dir=Ut({type:t}),t})(),vc=(()=>{class t extends gc{}return t.\u0275fac=function(){let e;return function(n){return(e||(e=Vn(t)))(n||t)}}(),t.\u0275dir=Ut({type:t,features:[ui]}),t})();const yc=new Mn("NgValueAccessor"),_c={provide:yc,useExisting:tt(()=>bc),multi:!0},mc=new Mn("CompositionEventMode");let bc=(()=>{class t extends gc{constructor(t,e,n){super(t,e),this._compositionMode=n,this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function(){const t=xa()?xa().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}())}writeValue(t){this.setProperty("value",null==t?"":t)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}}return t.\u0275fac=function(e){return new(e||t)(Ai(No),Ai(Do),Ai(mc,8))},t.\u0275dir=Ut({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(t,e){1&t&&Ri("input",function(t){return e._handleInput(t.target.value)})("blur",function(){return e.onTouched()})("compositionstart",function(){return e._compositionStart()})("compositionend",function(t){return e._compositionEnd(t.target.value)})},features:[ko([_c]),ui]}),t})();const Cc=new Mn("NgValidators"),wc=new Mn("NgAsyncValidators");function Ec(t){return null!=t}function xc(t){const e=Mi(t)?M(t):t;return Pi(e),e}function kc(t){let e={};return t.forEach(t=>{e=null!=t?Object.assign(Object.assign({},e),t):e}),0===Object.keys(e).length?null:e}function Ac(t,e){return e.map(e=>e(t))}function Oc(t){return t.map(t=>function(t){return!t.validate}(t)?t:e=>t.validate(e))}function Ic(t){return null!=t?function(t){if(!t)return null;const e=t.filter(Ec);return 0==e.length?null:function(t){return kc(Ac(t,e))}}(Oc(t)):null}function Sc(t){return null!=t?function(t){if(!t)return null;const e=t.filter(Ec);return 0==e.length?null:function(t){return function(...t){if(1===t.length){const e=t[0];if(a(e))return pc(e,null);if(c(e)&&Object.getPrototypeOf(e)===Object.prototype){const t=Object.keys(e);return pc(t.map(t=>e[t]),t)}}if("function"==typeof t[t.length-1]){const e=t.pop();return pc(t=1===t.length&&a(t[0])?t[0]:t,null).pipe(k(t=>e(...t)))}return pc(t,null)}(Ac(t,e).map(xc)).pipe(k(kc))}}(Oc(t)):null}function Tc(t,e){return null===t?[e]:Array.isArray(t)?[...t,e]:[t,e]}let Vc=(()=>{class t{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Ic(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Sc(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=Ut({type:t}),t})(),Dc=(()=>{class t extends Vc{get formDirective(){return null}get path(){return null}}return t.\u0275fac=function(){let e;return function(n){return(e||(e=Vn(t)))(n||t)}}(),t.\u0275dir=Ut({type:t,features:[ui]}),t})();class Hc extends Vc{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}let Nc=(()=>{class t extends class{constructor(t){this._cd=t}is(t){var e,n;return!!(null===(n=null===(e=this._cd)||void 0===e?void 0:e.control)||void 0===n?void 0:n[t])}}{constructor(t){super(t)}}return t.\u0275fac=function(e){return new(e||t)(Ai(Hc,2))},t.\u0275dir=Ut({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,e){2&t&&Qi("ng-untouched",e.is("untouched"))("ng-touched",e.is("touched"))("ng-pristine",e.is("pristine"))("ng-dirty",e.is("dirty"))("ng-valid",e.is("valid"))("ng-invalid",e.is("invalid"))("ng-pending",e.is("pending"))},features:[ui]}),t})();function Mc(t,e){t.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function Pc(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}function Rc(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const jc="VALID",Fc="INVALID",zc="PENDING",Lc="DISABLED";function Bc(t){return(qc(t)?t.validators:t)||null}function $c(t){return Array.isArray(t)?Ic(t):t||null}function Uc(t,e){return(qc(e)?e.asyncValidators:t)||null}function Zc(t){return Array.isArray(t)?Sc(t):t||null}function qc(t){return null!=t&&!Array.isArray(t)&&"object"==typeof t}class Wc{constructor(t,e){this._hasOwnPendingAsyncValidator=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._rawValidators=t,this._rawAsyncValidators=e,this._composedValidatorFn=$c(this._rawValidators),this._composedAsyncValidatorFn=Zc(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===jc}get invalid(){return this.status===Fc}get pending(){return this.status==zc}get disabled(){return this.status===Lc}get enabled(){return this.status!==Lc}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._rawValidators=t,this._composedValidatorFn=$c(t)}setAsyncValidators(t){this._rawAsyncValidators=t,this._composedAsyncValidatorFn=Zc(t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(t=>{t.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(t=>{t.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=zc,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=Lc,this.errors=null,this._forEachChild(e=>{e.disable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=jc,this._forEachChild(e=>{e.enable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),this.status!==jc&&this.status!==zc||this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?Lc:jc}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=zc,this._hasOwnPendingAsyncValidator=!0;const e=xc(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(e=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(e,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){return function(t,e,n){if(null==e)return null;if(Array.isArray(e)||(e=e.split(".")),Array.isArray(e)&&0===e.length)return null;let s=t;return e.forEach(t=>{s=s instanceof Qc?s.controls.hasOwnProperty(t)?s.controls[t]:null:s instanceof Jc&&s.at(t)||null}),s}(this,t)}getError(t,e){const n=e?this.get(e):this;return n&&n.errors?n.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new Vl,this.statusChanges=new Vl}_calculateStatus(){return this._allControlsDisabled()?Lc:this.errors?Fc:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(zc)?zc:this._anyControlsHaveStatus(Fc)?Fc:jc}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_isBoxedValue(t){return"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"value"in t&&"disabled"in t}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){qc(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}}class Gc extends Wc{constructor(t=null,e,n){super(Bc(e),Uc(n,e)),this._onChange=[],this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(t=>t(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=null,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Rc(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Rc(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){this._isBoxedValue(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}}class Qc extends Wc{constructor(t,e,n){super(Bc(e),Uc(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,n={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,n={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){this._checkAllValuesPresent(t),Object.keys(t).forEach(n=>{this._throwIfControlMissing(n),this.controls[n].setValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(Object.keys(t).forEach(n=>{this.controls[n]&&this.controls[n].patchValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e instanceof Gc?e.value:e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(t,e)=>!!e._syncPendingControls()||t);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!Object.keys(this.controls).length)throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.controls[t])throw new Error(`Cannot find form control with name: ${t}.`)}_forEachChild(t){Object.keys(this.controls).forEach(e=>{const n=this.controls[e];n&&t(n,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(const e of Object.keys(this.controls)){const n=this.controls[e];if(this.contains(e)&&t(n))return!0}return!1}_reduceValue(){return this._reduceChildren({},(t,e,n)=>((e.enabled||this.disabled)&&(t[n]=e.value),t))}_reduceChildren(t,e){let n=t;return this._forEachChild((t,s)=>{n=e(n,t,s)}),n}_allControlsDisabled(){for(const t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control with name: '${n}'.`)})}}class Jc extends Wc{constructor(t,e,n){super(Bc(e),Uc(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}at(t){return this.controls[t]}push(t,e={}){this.controls.push(t),this._registerControl(t),this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}insert(t,e,n={}){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity({emitEvent:n.emitEvent})}removeAt(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),this.updateValueAndValidity({emitEvent:e.emitEvent})}setControl(t,e,n={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),e&&(this.controls.splice(t,0,e),this._registerControl(e)),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}get length(){return this.controls.length}setValue(t,e={}){this._checkAllValuesPresent(t),t.forEach((t,n)=>{this._throwIfControlMissing(n),this.at(n).setValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){null!=t&&(t.forEach((t,n)=>{this.at(n)&&this.at(n).patchValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t=[],e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this.controls.map(t=>t instanceof Gc?t.value:t.getRawValue())}clear(t={}){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity({emitEvent:t.emitEvent}))}_syncPendingControls(){let t=this.controls.reduce((t,e)=>!!e._syncPendingControls()||t,!1);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!this.controls.length)throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.at(t))throw new Error(`Cannot find form control at index ${t}`)}_forEachChild(t){this.controls.forEach((e,n)=>{t(e,n)})}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value)}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t))}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control at index: ${n}.`)})}_allControlsDisabled(){for(const t of this.controls)if(t.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)}}const Kc={provide:Hc,useExisting:tt(()=>Xc)},Yc=(()=>Promise.resolve(null))();let Xc=(()=>{class t extends Hc{constructor(t,e,n,s){super(),this.control=new Gc,this._registered=!1,this.update=new Vl,this._parent=t,this._setValidators(e),this._setAsyncValidators(n),this.valueAccessor=function(t,e){if(!e)return null;let n,s,r;return Array.isArray(e),e.forEach(t=>{t.constructor===bc?n=t:Object.getPrototypeOf(t.constructor)===vc?s=t:r=t}),r||s||n||null}(0,s)}ngOnChanges(t){this._checkForErrors(),this._registered||this._setUpControl(),"isDisabled"in t&&this._updateDisabled(t),function(t,e){if(!t.hasOwnProperty("model"))return!1;const n=t.model;return!!n.isFirstChange()||!Object.is(e,n.currentValue)}(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._parent?[...this._parent.path,this.name]:[this.name]}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){var t,e;(function(t,e){const n=function(t){return t._rawValidators}(t);null!==e.validator?t.setValidators(Tc(n,e.validator)):"function"==typeof n&&t.setValidators([n]);const s=function(t){return t._rawAsyncValidators}(t);null!==e.asyncValidator?t.setAsyncValidators(Tc(s,e.asyncValidator)):"function"==typeof s&&t.setAsyncValidators([s]);const r=()=>t.updateValueAndValidity();Mc(e._rawValidators,r),Mc(e._rawAsyncValidators,r)})(t=this.control,e=this),e.valueAccessor.writeValue(t.value),function(t,e){e.valueAccessor.registerOnChange(n=>{t._pendingValue=n,t._pendingChange=!0,t._pendingDirty=!0,"change"===t.updateOn&&Pc(t,e)})}(t,e),function(t,e){const n=(t,n)=>{e.valueAccessor.writeValue(t),n&&e.viewToModelUpdate(t)};t.registerOnChange(n),e._registerOnDestroy(()=>{t._unregisterOnChange(n)})}(t,e),function(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,"blur"===t.updateOn&&t._pendingChange&&Pc(t,e),"submit"!==t.updateOn&&t.markAsTouched()})}(t,e),function(t,e){if(e.valueAccessor.setDisabledState){const n=t=>{e.valueAccessor.setDisabledState(t)};t.registerOnDisabledChange(n),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(n)})}}(t,e),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(t){Yc.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1})})}_updateDisabled(t){const e=t.isDisabled.currentValue,n=""===e||e&&"false"!==e;Yc.then(()=>{n&&!this.control.disabled?this.control.disable():!n&&this.control.disabled&&this.control.enable()})}}return t.\u0275fac=function(e){return new(e||t)(Ai(Dc,9),Ai(Cc,10),Ai(wc,10),Ai(yc,10))},t.\u0275dir=Ut({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[ko([Kc]),ui,re]}),t})(),tu=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({}),t})();const eu={provide:yc,useExisting:tt(()=>nu),multi:!0};let nu=(()=>{class t extends vc{writeValue(t){this.setProperty("value",parseFloat(t))}registerOnChange(t){this.onChange=e=>{t(""==e?null:parseFloat(e))}}}return t.\u0275fac=function(){let e;return function(n){return(e||(e=Vn(t)))(n||t)}}(),t.\u0275dir=Ut({type:t,selectors:[["input","type","range","formControlName",""],["input","type","range","formControl",""],["input","type","range","ngModel",""]],hostBindings:function(t,e){1&t&&Ri("change",function(t){return e.onChange(t.target.value)})("input",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},features:[ko([eu]),ui]}),t})();const su={provide:yc,useExisting:tt(()=>iu),multi:!0};function ru(t,e){return null==t?`${e}`:(e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let iu=(()=>{class t extends vc{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){this.value=t;const e=this._getOptionId(t);null==e&&this.setProperty("selectedIndex",-1);const n=ru(e,t);this.setProperty("value",n)}registerOnChange(t){this.onChange=e=>{this.value=this._getOptionValue(e),t(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e),t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e):t}}return t.\u0275fac=function(){let e;return function(n){return(e||(e=Vn(t)))(n||t)}}(),t.\u0275dir=Ut({type:t,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(t,e){1&t&&Ri("change",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[ko([su]),ui]}),t})(),ou=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption())}set ngValue(t){null!=this._select&&(this._select._optionMap.set(this.id,t),this._setElementValue(ru(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._setElementValue(t),this._select&&this._select.writeValue(this._select.value)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(Ai(Do),Ai(No),Ai(iu,9))},t.\u0275dir=Ut({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})();const lu={provide:yc,useExisting:tt(()=>cu),multi:!0};function au(t,e){return null==t?`${e}`:("string"==typeof e&&(e=`'${e}'`),e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let cu=(()=>{class t extends vc{constructor(){super(...arguments),this._optionMap=new Map,this._idCounter=0,this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){let e;if(this.value=t,Array.isArray(t)){const n=t.map(t=>this._getOptionId(t));e=(t,e)=>{t._setSelected(n.indexOf(e.toString())>-1)}}else e=(t,e)=>{t._setSelected(!1)};this._optionMap.forEach(e)}registerOnChange(t){this.onChange=e=>{const n=[];if(void 0!==e.selectedOptions){const t=e.selectedOptions;for(let e=0;e<t.length;e++){const s=t.item(e),r=this._getOptionValue(s.value);n.push(r)}}else{const t=e.options;for(let e=0;e<t.length;e++){const s=t.item(e);if(s.selected){const t=this._getOptionValue(s.value);n.push(t)}}}this.value=n,t(n)}}_registerOption(t){const e=(this._idCounter++).toString();return this._optionMap.set(e,t),e}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e)._value,t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e)._value:t}}return t.\u0275fac=function(){let e;return function(n){return(e||(e=Vn(t)))(n||t)}}(),t.\u0275dir=Ut({type:t,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(t,e){1&t&&Ri("change",function(t){return e.onChange(t.target)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[ko([lu]),ui]}),t})(),uu=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){null!=this._select&&(this._value=t,this._setElementValue(au(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(au(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(Ai(Do),Ai(No),Ai(cu,9))},t.\u0275dir=Ut({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})(),hu=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({imports:[[tu]]}),t})(),du=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=Bt({type:t}),t.\u0275inj=at({imports:[hu]}),t})();class fu{constructor(){this.riskHotspotsSettings=null,this.coverageInfoSettings=null}}class pu{constructor(){this.groupingMaximum=0,this.grouping=0,this.historyComparisionDate="",this.historyComparisionType="",this.filter="",this.sortBy="name",this.sortOrder="asc",this.collapseStates=[]}}class gu{constructor(t){this.et="",this.et=t.et,this.cl=t.cl,this.ucl=t.ucl,this.cal=t.cal,this.tl=t.tl,this.lcq=t.lcq,this.cb=t.cb,this.tb=t.tb,this.bcq=t.bcq}get coverageRatioText(){return 0===this.tl?"-":this.cl+"/"+this.cal}get branchCoverageRatioText(){return 0===this.tb?"-":this.cb+"/"+this.tb}}class vu{static roundNumber(t,e){return Math.floor(t*Math.pow(10,e))/Math.pow(10,e)}static getNthOrLastIndexOf(t,e,n){let s=0,r=-1,i=-1;for(;s<n&&(i=t.indexOf(e,r+1),-1!==i);)r=i,s++;return r}}class yu{constructor(){this.name="",this.coveredLines=0,this.uncoveredLines=0,this.coverableLines=0,this.totalLines=0,this.coveredBranches=0,this.totalBranches=0}get coverage(){return 0===this.coverableLines?NaN:vu.roundNumber(100*this.coveredLines/this.coverableLines,1)}get coveragePercentage(){return 0===this.coverableLines?"":this.coverage+"%"}get coverageRatioText(){return 0===this.coverableLines?"-":this.coveredLines+"/"+this.coverableLines}get branchCoverage(){return 0===this.totalBranches?NaN:vu.roundNumber(100*this.coveredBranches/this.totalBranches,1)}get branchCoveragePercentage(){return 0===this.totalBranches?"":this.branchCoverage+"%"}get branchCoverageRatioText(){return 0===this.totalBranches?"-":this.coveredBranches+"/"+this.totalBranches}}class _u extends yu{constructor(t,e){super(),this.reportPath="",this._coverageType="",this.methodCoverage="",this.lineCoverageHistory=[],this.branchCoverageHistory=[],this.historicCoverages=[],this.currentHistoricCoverage=null,this.name=t.name,this.reportPath=t.rp?t.rp+e:t.rp,this.coveredLines=t.cl,this.uncoveredLines=t.ucl,this.coverableLines=t.cal,this.totalLines=t.tl,this._coverageType=t.ct,this.methodCoverage=t.mc,this.coveredBranches=t.cb,this.totalBranches=t.tb,this.lineCoverageHistory=t.lch,this.branchCoverageHistory=t.bch,t.hc.forEach(t=>{this.historicCoverages.push(new gu(t))})}get coverage(){return 0===this.coverableLines?"-"!==this.methodCoverage?parseFloat(this.methodCoverage):NaN:vu.roundNumber(100*this.coveredLines/this.coverableLines,1)}get coverageType(){return 0===this.coverableLines?"-"!==this.methodCoverage?this._coverageType:"":this._coverageType}visible(t,e){if(""!==t&&-1===this.name.toLowerCase().indexOf(t.toLowerCase()))return!1;if(""===e||null===this.currentHistoricCoverage)return!0;if("allChanges"===e){if(this.coveredLines===this.currentHistoricCoverage.cl&&this.uncoveredLines===this.currentHistoricCoverage.ucl&&this.coverableLines===this.currentHistoricCoverage.cal&&this.totalLines===this.currentHistoricCoverage.tl&&this.coveredBranches===this.currentHistoricCoverage.cb&&this.totalBranches===this.currentHistoricCoverage.tb)return!1}else if("lineCoverageIncreaseOnly"===e){let t=this.coverage;if(isNaN(t)||t<=this.currentHistoricCoverage.lcq)return!1}else if("lineCoverageDecreaseOnly"===e){let t=this.coverage;if(isNaN(t)||t>=this.currentHistoricCoverage.lcq)return!1}else if("branchCoverageIncreaseOnly"===e){let t=this.branchCoverage;if(isNaN(t)||t<=this.currentHistoricCoverage.bcq)return!1}else if("branchCoverageDecreaseOnly"===e){let t=this.branchCoverage;if(isNaN(t)||t>=this.currentHistoricCoverage.bcq)return!1}return!0}updateCurrentHistoricCoverage(t){if(this.currentHistoricCoverage=null,""!==t)for(let e=0;e<this.historicCoverages.length;e++)if(this.historicCoverages[e].et===t){this.currentHistoricCoverage=this.historicCoverages[e];break}}}class mu extends yu{constructor(t,e){super(),this.subElements=[],this.classes=[],this.collapsed=!1,this.name=t,this.collapsed=t.indexOf("Test")>-1&&null===e}visible(t,e){if(""!==t&&this.name.toLowerCase().indexOf(t.toLowerCase())>-1)return!0;for(let n=0;n<this.subElements.length;n++)if(this.subElements[n].visible(t,e))return!0;for(let n=0;n<this.classes.length;n++)if(this.classes[n].visible(t,e))return!0;return!1}insertClass(t,e){if(this.coveredLines+=t.coveredLines,this.uncoveredLines+=t.uncoveredLines,this.coverableLines+=t.coverableLines,this.totalLines+=t.totalLines,this.coveredBranches+=t.coveredBranches,this.totalBranches+=t.totalBranches,null===e)return void this.classes.push(t);let n=vu.getNthOrLastIndexOf(t.name,".",e),s=-1===n?"-":t.name.substr(0,n);for(let i=0;i<this.subElements.length;i++)if(this.subElements[i].name===s)return void this.subElements[i].insertClass(t,null);let r=new mu(s,this);this.subElements.push(r),r.insertClass(t,null)}collapse(){this.collapsed=!0;for(let t=0;t<this.subElements.length;t++)this.subElements[t].collapse()}expand(){this.collapsed=!1;for(let t=0;t<this.subElements.length;t++)this.subElements[t].expand()}toggleCollapse(t){t.preventDefault(),this.collapsed=!this.collapsed}updateCurrentHistoricCoverage(t){for(let e=0;e<this.subElements.length;e++)this.subElements[e].updateCurrentHistoricCoverage(t);for(let e=0;e<this.classes.length;e++)this.classes[e].updateCurrentHistoricCoverage(t)}static sortCodeElementViewModels(t,e,n){let s=n?-1:1,r=n?1:-1;"name"===e?t.sort(function(t,e){return t.name===e.name?0:t.name<e.name?s:r}):"covered"===e?t.sort(function(t,e){return t.coveredLines===e.coveredLines?0:t.coveredLines<e.coveredLines?s:r}):"uncovered"===e?t.sort(function(t,e){return t.uncoveredLines===e.uncoveredLines?0:t.uncoveredLines<e.uncoveredLines?s:r}):"coverable"===e?t.sort(function(t,e){return t.coverableLines===e.coverableLines?0:t.coverableLines<e.coverableLines?s:r}):"total"===e?t.sort(function(t,e){return t.totalLines===e.totalLines?0:t.totalLines<e.totalLines?s:r}):"coverage"===e?t.sort(function(t,e){return t.coverage===e.coverage?0:isNaN(t.coverage)?s:isNaN(e.coverage)?r:t.coverage<e.coverage?s:r}):"branchcoverage"===e&&t.sort(function(t,e){return t.branchCoverage===e.branchCoverage?0:isNaN(t.branchCoverage)?s:isNaN(e.branchCoverage)?r:t.branchCoverage<e.branchCoverage?s:r})}changeSorting(t,e){mu.sortCodeElementViewModels(this.subElements,t,e);let n=e?-1:1,s=e?1:-1;"name"===t?this.classes.sort(function(t,e){return t.name===e.name?0:t.name<e.name?n:s}):"covered"===t?this.classes.sort(function(t,e){return t.coveredLines===e.coveredLines?0:t.coveredLines<e.coveredLines?n:s}):"uncovered"===t?this.classes.sort(function(t,e){return t.uncoveredLines===e.uncoveredLines?0:t.uncoveredLines<e.uncoveredLines?n:s}):"coverable"===t?this.classes.sort(function(t,e){return t.coverableLines===e.coverableLines?0:t.coverableLines<e.coverableLines?n:s}):"total"===t?this.classes.sort(function(t,e){return t.totalLines===e.totalLines?0:t.totalLines<e.totalLines?n:s}):"coverage"===t?this.classes.sort(function(t,e){return t.coverage===e.coverage?0:isNaN(t.coverage)?n:isNaN(e.coverage)?s:t.coverage<e.coverage?n:s}):"covered_branches"===t?this.classes.sort(function(t,e){return t.coveredBranches===e.coveredBranches?0:t.coveredBranches<e.coveredBranches?n:s}):"total_branches"===t?this.classes.sort(function(t,e){return t.totalBranches===e.totalBranches?0:t.totalBranches<e.totalBranches?n:s}):"branchcoverage"===t&&this.classes.sort(function(t,e){return t.branchCoverage===e.branchCoverage?0:isNaN(t.branchCoverage)?n:isNaN(e.branchCoverage)?s:t.branchCoverage<e.branchCoverage?n:s});for(let r=0;r<this.subElements.length;r++)this.subElements[r].changeSorting(t,e)}}let bu=(()=>{class t{get nativeWindow(){return window}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=lt({token:t,factory:t.\u0275fac}),t})();function Cu(t,e){1&t&&Vi(0,"td",3)}function wu(t,e){1&t&&Vi(0,"td"),2&t&&ao("green ",zi().greenClass,"")}function Eu(t,e){1&t&&Vi(0,"td"),2&t&&ao("red ",zi().redClass,"")}let xu=(()=>{class t{constructor(){this.grayVisible=!0,this.greenVisible=!1,this.redVisible=!1,this.greenClass="",this.redClass="",this._percentage=NaN}get percentage(){return this._percentage}set percentage(t){this._percentage=t,this.grayVisible=isNaN(t),this.greenVisible=!isNaN(t)&&Math.round(t)>0,this.redVisible=!isNaN(t)&&100-Math.round(t)>0,this.greenClass="covered"+Math.round(t),this.redClass="covered"+(100-Math.round(t))}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=jt({type:t,selectors:[["coverage-bar"]],inputs:{percentage:"percentage"},decls:4,vars:3,consts:[[1,"coverage"],["class","gray covered100",4,"ngIf"],[3,"class",4,"ngIf"],[1,"gray","covered100"]],template:function(t,e){1&t&&(Si(0,"table",0),ki(1,Cu,1,0,"td",1),ki(2,wu,1,3,"td",2),ki(3,Eu,1,3,"td",2),Ti()),2&t&&(Xs(1),Oi("ngIf",e.grayVisible),Xs(1),Oi("ngIf",e.greenVisible),Xs(1),Oi("ngIf",e.redVisible))},directives:[Ha],encapsulation:2,changeDetection:0}),t})();const ku=["codeelement-row",""];function Au(t,e){if(1&t&&(Si(0,"th",2),io(1),Ti()),2&t){const t=zi();Xs(1),oo(t.element.coveredBranches)}}function Ou(t,e){if(1&t&&(Si(0,"th",2),io(1),Ti()),2&t){const t=zi();Xs(1),oo(t.element.totalBranches)}}function Iu(t,e){if(1&t&&(Si(0,"th",3),io(1),Ti()),2&t){const t=zi();Oi("title",t.element.branchCoverageRatioText),Xs(1),oo(t.element.branchCoveragePercentage)}}function Su(t,e){if(1&t&&(Si(0,"th",2),Vi(1,"coverage-bar",4),Ti()),2&t){const t=zi();Xs(1),Oi("percentage",t.element.branchCoverage)}}const Tu=function(t,e){return{"icon-plus":t,"icon-minus":e}};let Vu=(()=>{class t{constructor(){this.collapsed=!1,this.branchCoverageAvailable=!1}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=jt({type:t,selectors:[["","codeelement-row",""]],inputs:{element:"element",collapsed:"collapsed",branchCoverageAvailable:"branchCoverageAvailable"},attrs:ku,decls:20,vars:16,consts:[["href","#",3,"click"],[3,"ngClass"],[1,"right"],[1,"right",3,"title"],[3,"percentage"],["class","right",4,"ngIf"],["class","right",3,"title",4,"ngIf"]],template:function(t,e){1&t&&(Si(0,"th"),Si(1,"a",0),Ri("click",function(t){return e.element.toggleCollapse(t)}),Vi(2,"i",1),io(3),Ti(),Ti(),Si(4,"th",2),io(5),Ti(),Si(6,"th",2),io(7),Ti(),Si(8,"th",2),io(9),Ti(),Si(10,"th",2),io(11),Ti(),Si(12,"th",3),io(13),Ti(),Si(14,"th",2),Vi(15,"coverage-bar",4),Ti(),ki(16,Au,2,1,"th",5),ki(17,Ou,2,1,"th",5),ki(18,Iu,2,2,"th",6),ki(19,Su,2,1,"th",5)),2&t&&(Xs(2),Oi("ngClass",Al(13,Tu,e.element.collapsed,!e.element.collapsed)),Xs(1),lo(" ",e.element.name,""),Xs(2),oo(e.element.coveredLines),Xs(2),oo(e.element.uncoveredLines),Xs(2),oo(e.element.coverableLines),Xs(2),oo(e.element.totalLines),Xs(1),Oi("title",e.element.coverageRatioText),Xs(1),oo(e.element.coveragePercentage),Xs(2),Oi("percentage",e.element.coverage),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable))},directives:[Sa,xu,Ha],encapsulation:2,changeDetection:0}),t})();const Du=["coverage-history-chart",""];let Hu=(()=>{class t{constructor(){this.path=null,this._historicCoverages=[]}get historicCoverages(){return this._historicCoverages}set historicCoverages(t){if(this._historicCoverages=t,t.length>1){let e="";for(let n=0;n<t.length;n++)e+=0===n?"M":"L",e+=`${vu.roundNumber(30*n/(t.length-1),1)}`,e+=`,${vu.roundNumber(18-18*t[n]/100,1)}`;this.path=e}else this.path=null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=jt({type:t,selectors:[["","coverage-history-chart",""]],inputs:{historicCoverages:"historicCoverages"},attrs:Du,decls:3,vars:1,consts:[["width","30","height","18",1,"ct-chart-line"],[1,"ct-series","ct-series-a"],[1,"ct-line"]],template:function(t,e){1&t&&(we.lFrame.currentNamespace=ce,Si(0,"svg",0),Si(1,"g",1),Vi(2,"path",2),Ti(),Ti()),2&t&&(Xs(2),Ei("d",e.path))},encapsulation:2,changeDetection:0}),t})();const Nu=["class-row",""];function Mu(t,e){if(1&t&&(Si(0,"a",8),io(1),Ti()),2&t){const t=zi();Oi("href",t.clazz.reportPath,os),Xs(1),oo(t.clazz.name)}}function Pu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),oo(t.clazz.name)}}function Ru(t,e){if(1&t&&(Di(0),Si(1,"div"),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi();Xs(1),ao("currenthistory ",t.getClassName(t.clazz.coveredLines,t.clazz.currentHistoricCoverage.cl),""),Xs(1),lo(" ",t.clazz.coveredLines," "),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),lo(" ",t.clazz.currentHistoricCoverage.cl," ")}}function ju(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),lo(" ",t.clazz.coveredLines," ")}}function Fu(t,e){if(1&t&&(Di(0),Si(1,"div"),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi();Xs(1),ao("currenthistory ",t.getClassName(t.clazz.currentHistoricCoverage.ucl,t.clazz.uncoveredLines),""),Xs(1),lo(" ",t.clazz.uncoveredLines," "),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),lo(" ",t.clazz.currentHistoricCoverage.ucl," ")}}function zu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),lo(" ",t.clazz.uncoveredLines," ")}}function Lu(t,e){if(1&t&&(Di(0),Si(1,"div",10),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi();Xs(2),oo(t.clazz.coverableLines),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),oo(t.clazz.currentHistoricCoverage.cal)}}function Bu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),lo(" ",t.clazz.coverableLines," ")}}function $u(t,e){if(1&t&&(Di(0),Si(1,"div",10),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi();Xs(2),oo(t.clazz.totalLines),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),oo(t.clazz.currentHistoricCoverage.tl)}}function Uu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),lo(" ",t.clazz.totalLines," ")}}const Zu=function(t){return{historiccoverageoffset:t}};function qu(t,e){if(1&t&&Vi(0,"div",11),2&t){const t=zi();Li("title",t.translations.history+": "+t.translations.coverage),Oi("historicCoverages",t.clazz.lineCoverageHistory)("ngClass",kl(3,Zu,null!==t.clazz.currentHistoricCoverage))}}function Wu(t,e){if(1&t&&(Di(0),Si(1,"div"),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi();Xs(1),ao("currenthistory ",t.getClassName(t.clazz.coverage,t.clazz.currentHistoricCoverage.lcq),""),Xs(1),lo(" ",t.clazz.coveragePercentage," "),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et+": "+t.clazz.currentHistoricCoverage.coverageRatioText),Xs(1),lo("",t.clazz.currentHistoricCoverage.lcq,"%")}}function Gu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi();Xs(1),lo(" ",t.clazz.coveragePercentage," ")}}function Qu(t,e){if(1&t&&(Di(0),Si(1,"div"),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi(2);Xs(1),ao("currenthistory ",t.getClassName(t.clazz.coveredBranches,t.clazz.currentHistoricCoverage.cb),""),Xs(1),lo(" ",t.clazz.coveredBranches," "),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),lo(" ",t.clazz.currentHistoricCoverage.cb," ")}}function Ju(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),lo(" ",t.clazz.coveredBranches," ")}}function Ku(t,e){if(1&t&&(Si(0,"td",2),ki(1,Qu,5,6,"ng-container",1),ki(2,Ju,2,1,"ng-container",1),Ti()),2&t){const t=zi();Xs(1),Oi("ngIf",null!==t.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===t.clazz.currentHistoricCoverage)}}function Yu(t,e){if(1&t&&(Di(0),Si(1,"div",10),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi(2);Xs(2),oo(t.clazz.totalBranches),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et),Xs(1),oo(t.clazz.currentHistoricCoverage.tb)}}function Xu(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),lo(" ",t.clazz.totalBranches," ")}}function th(t,e){if(1&t&&(Si(0,"td",2),ki(1,Yu,5,3,"ng-container",1),ki(2,Xu,2,1,"ng-container",1),Ti()),2&t){const t=zi();Xs(1),Oi("ngIf",null!==t.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===t.clazz.currentHistoricCoverage)}}function eh(t,e){if(1&t&&Vi(0,"div",13),2&t){const t=zi(2);Li("title",t.translations.history+": "+t.translations.branchCoverage),Oi("historicCoverages",t.clazz.branchCoverageHistory)("ngClass",kl(3,Zu,null!==t.clazz.currentHistoricCoverage))}}function nh(t,e){if(1&t&&(Di(0),Si(1,"div"),io(2),Ti(),Si(3,"div",9),io(4),Ti(),Hi()),2&t){const t=zi(2);Xs(1),ao("currenthistory ",t.getClassName(t.clazz.branchCoverage,t.clazz.currentHistoricCoverage.bcq),""),Xs(1),lo(" ",t.clazz.branchCoveragePercentage," "),Xs(1),Oi("title",t.clazz.currentHistoricCoverage.et+": "+t.clazz.currentHistoricCoverage.branchCoverageRatioText),Xs(1),lo("",t.clazz.currentHistoricCoverage.bcq,"%")}}function sh(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),lo(" ",t.clazz.branchCoveragePercentage," ")}}function rh(t,e){if(1&t&&(Si(0,"td",3),ki(1,eh,1,5,"div",12),ki(2,nh,5,6,"ng-container",1),ki(3,sh,2,1,"ng-container",1),Ti()),2&t){const t=zi();Oi("title",t.clazz.branchCoverageRatioText),Xs(1),Oi("ngIf",t.clazz.branchCoverageHistory.length>1),Xs(1),Oi("ngIf",null!==t.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===t.clazz.currentHistoricCoverage)}}function ih(t,e){if(1&t&&(Si(0,"td",2),Vi(1,"coverage-bar",5),Ti()),2&t){const t=zi();Xs(1),Oi("percentage",t.clazz.branchCoverage)}}let oh=(()=>{class t{constructor(){this.translations={},this.branchCoverageAvailable=!1,this.historyComparisionDate=""}getClassName(t,e){return t>e?"lightgreen":t<e?"lightred":"lightgraybg"}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=jt({type:t,selectors:[["","class-row",""]],inputs:{clazz:"clazz",translations:"translations",branchCoverageAvailable:"branchCoverageAvailable",historyComparisionDate:"historyComparisionDate"},attrs:Nu,decls:25,vars:19,consts:[[3,"href",4,"ngIf"],[4,"ngIf"],[1,"right"],[1,"right",3,"title"],["coverage-history-chart","","class","tinylinecoveragechart ct-chart",3,"historicCoverages","ngClass","title",4,"ngIf"],[3,"percentage"],["class","right",4,"ngIf"],["class","right",3,"title",4,"ngIf"],[3,"href"],[3,"title"],[1,"currenthistory"],["coverage-history-chart","",1,"tinylinecoveragechart","ct-chart",3,"historicCoverages","ngClass","title"],["coverage-history-chart","","class","tinybranchcoveragechart ct-chart",3,"historicCoverages","ngClass","title",4,"ngIf"],["coverage-history-chart","",1,"tinybranchcoveragechart","ct-chart",3,"historicCoverages","ngClass","title"]],template:function(t,e){1&t&&(Si(0,"td"),ki(1,Mu,2,2,"a",0),ki(2,Pu,2,1,"ng-container",1),Ti(),Si(3,"td",2),ki(4,Ru,5,6,"ng-container",1),ki(5,ju,2,1,"ng-container",1),Ti(),Si(6,"td",2),ki(7,Fu,5,6,"ng-container",1),ki(8,zu,2,1,"ng-container",1),Ti(),Si(9,"td",2),ki(10,Lu,5,3,"ng-container",1),ki(11,Bu,2,1,"ng-container",1),Ti(),Si(12,"td",2),ki(13,$u,5,3,"ng-container",1),ki(14,Uu,2,1,"ng-container",1),Ti(),Si(15,"td",3),ki(16,qu,1,5,"div",4),ki(17,Wu,5,6,"ng-container",1),ki(18,Gu,2,1,"ng-container",1),Ti(),Si(19,"td",2),Vi(20,"coverage-bar",5),Ti(),ki(21,Ku,3,2,"td",6),ki(22,th,3,2,"td",6),ki(23,rh,4,4,"td",7),ki(24,ih,2,1,"td",6)),2&t&&(Xs(1),Oi("ngIf",""!==e.clazz.reportPath),Xs(1),Oi("ngIf",""===e.clazz.reportPath),Xs(2),Oi("ngIf",null!==e.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===e.clazz.currentHistoricCoverage),Xs(2),Oi("ngIf",null!==e.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===e.clazz.currentHistoricCoverage),Xs(2),Oi("ngIf",null!==e.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===e.clazz.currentHistoricCoverage),Xs(2),Oi("ngIf",null!==e.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===e.clazz.currentHistoricCoverage),Xs(1),Oi("title",e.clazz.coverageType+": "+e.clazz.coverageRatioText),Xs(1),Oi("ngIf",e.clazz.lineCoverageHistory.length>1),Xs(1),Oi("ngIf",null!==e.clazz.currentHistoricCoverage),Xs(1),Oi("ngIf",null===e.clazz.currentHistoricCoverage),Xs(2),Oi("percentage",e.clazz.coverage),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable),Xs(1),Oi("ngIf",e.branchCoverageAvailable))},directives:[Ha,xu,Hu,Sa],encapsulation:2,changeDetection:0}),t})();function lh(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),oo(t.translations.noGrouping)}}function ah(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),oo(t.translations.byAssembly)}}function ch(t,e){if(1&t&&(Di(0),io(1),Hi()),2&t){const t=zi(2);Xs(1),oo(t.translations.byNamespace+" "+t.settings.grouping)}}function uh(t,e){if(1&t&&(Si(0,"option",26),io(1),Ti()),2&t){const t=e.$implicit;Oi("value",t),Xs(1),oo(t)}}function hh(t,e){1&t&&Vi(0,"br")}function dh(t,e){if(1&t&&(Si(0,"option",32),io(1),Ti()),2&t){const t=zi(4);Xs(1),lo(" ",t.translations.branchCoverageIncreaseOnly," ")}}function fh(t,e){if(1&t&&(Si(0,"option",33),io(1),Ti()),2&t){const t=zi(4);Xs(1),lo(" ",t.translations.branchCoverageDecreaseOnly," ")}}function ph(t,e){if(1&t){const t=Ni();Si(0,"div"),Si(1,"select",23),Ri("ngModelChange",function(e){return Ae(t),zi(3).settings.historyComparisionType=e}),Si(2,"option",24),io(3),Ti(),Si(4,"option",27),io(5),Ti(),Si(6,"option",28),io(7),Ti(),Si(8,"option",29),io(9),Ti(),ki(10,dh,2,1,"option",30),ki(11,fh,2,1,"option",31),Ti(),Ti()}if(2&t){const t=zi(3);Xs(1),Oi("ngModel",t.settings.historyComparisionType),Xs(2),oo(t.translations.filter),Xs(2),oo(t.translations.allChanges),Xs(2),oo(t.translations.lineCoverageIncreaseOnly),Xs(2),oo(t.translations.lineCoverageDecreaseOnly),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable)}}function gh(t,e){if(1&t){const t=Ni();Di(0),Si(1,"div"),io(2),Si(3,"select",23),Ri("ngModelChange",function(e){return Ae(t),zi(2).settings.historyComparisionDate=e})("ngModelChange",function(){return Ae(t),zi(2).updateCurrentHistoricCoverage()}),Si(4,"option",24),io(5),Ti(),ki(6,uh,2,2,"option",25),Ti(),Ti(),ki(7,hh,1,0,"br",0),ki(8,ph,12,7,"div",0),Hi()}if(2&t){const t=zi(2);Xs(2),lo(" ",t.translations.compareHistory," "),Xs(1),Oi("ngModel",t.settings.historyComparisionDate),Xs(2),oo(t.translations.date),Xs(1),Oi("ngForOf",t.historicCoverageExecutionTimes),Xs(1),Oi("ngIf",""!==t.settings.historyComparisionDate),Xs(1),Oi("ngIf",""!==t.settings.historyComparisionDate)}}function vh(t,e){1&t&&Vi(0,"col",8)}function yh(t,e){1&t&&Vi(0,"col",11)}function _h(t,e){1&t&&Vi(0,"col",12)}function mh(t,e){1&t&&Vi(0,"col",13)}const bh=function(t,e,n){return{"icon-up-dir_active":t,"icon-down-dir_active":e,"icon-down-dir":n}};function Ch(t,e){if(1&t){const t=Ni();Si(0,"th",5),Si(1,"a",2),Ri("click",function(e){return Ae(t),zi(2).updateSorting("covered_branches",e)}),Vi(2,"i",18),io(3),Ti(),Ti()}if(2&t){const t=zi(2);Xs(2),Oi("ngClass",Ol(2,bh,"covered_branches"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"covered_branches"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"covered_branches"!==t.settings.sortBy)),Xs(1),oo(t.translations.covered)}}function wh(t,e){if(1&t){const t=Ni();Si(0,"th",5),Si(1,"a",2),Ri("click",function(e){return Ae(t),zi(2).updateSorting("total_branches",e)}),Vi(2,"i",18),io(3),Ti(),Ti()}if(2&t){const t=zi(2);Xs(2),Oi("ngClass",Ol(2,bh,"total_branches"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"total_branches"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"total_branches"!==t.settings.sortBy)),Xs(1),oo(t.translations.total)}}function Eh(t,e){if(1&t){const t=Ni();Si(0,"th",19),Si(1,"a",2),Ri("click",function(e){return Ae(t),zi(2).updateSorting("branchcoverage",e)}),Vi(2,"i",18),io(3),Ti(),Ti()}if(2&t){const t=zi(2);Xs(2),Oi("ngClass",Ol(2,bh,"branchcoverage"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"branchcoverage"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"branchcoverage"!==t.settings.sortBy)),Xs(1),oo(t.translations.branchCoverage)}}function xh(t,e){if(1&t&&Vi(0,"tr",35),2&t){const t=zi().$implicit,e=zi(2);Oi("element",t)("collapsed",t.collapsed)("branchCoverageAvailable",e.branchCoverageAvailable)}}function kh(t,e){if(1&t&&Vi(0,"tr",37),2&t){const t=zi().$implicit,e=zi(3);Oi("clazz",t)("translations",e.translations)("branchCoverageAvailable",e.branchCoverageAvailable)("historyComparisionDate",e.settings.historyComparisionDate)}}function Ah(t,e){if(1&t&&(Di(0),ki(1,kh,1,4,"tr",36),Hi()),2&t){const t=e.$implicit,n=zi().$implicit,s=zi(2);Xs(1),Oi("ngIf",!n.collapsed&&t.visible(s.settings.filter,s.settings.historyComparisionType))}}function Oh(t,e){if(1&t&&Vi(0,"tr",40),2&t){const t=zi().$implicit,e=zi(5);Oi("clazz",t)("translations",e.translations)("branchCoverageAvailable",e.branchCoverageAvailable)("historyComparisionDate",e.settings.historyComparisionDate)}}function Ih(t,e){if(1&t&&(Di(0),ki(1,Oh,1,4,"tr",39),Hi()),2&t){const t=e.$implicit,n=zi(2).$implicit,s=zi(3);Xs(1),Oi("ngIf",!n.collapsed&&t.visible(s.settings.filter,s.settings.historyComparisionType))}}function Sh(t,e){if(1&t&&(Di(0),Vi(1,"tr",38),ki(2,Ih,2,1,"ng-container",22),Hi()),2&t){const t=zi().$implicit,e=zi(3);Xs(1),Oi("element",t)("collapsed",t.collapsed)("branchCoverageAvailable",e.branchCoverageAvailable),Xs(1),Oi("ngForOf",t.classes)}}function Th(t,e){if(1&t&&(Di(0),ki(1,Sh,3,4,"ng-container",0),Hi()),2&t){const t=e.$implicit,n=zi().$implicit,s=zi(2);Xs(1),Oi("ngIf",!n.collapsed&&t.visible(s.settings.filter,s.settings.historyComparisionType))}}function Vh(t,e){if(1&t&&(Di(0),ki(1,xh,1,3,"tr",34),ki(2,Ah,2,1,"ng-container",22),ki(3,Th,2,1,"ng-container",22),Hi()),2&t){const t=e.$implicit,n=zi(2);Xs(1),Oi("ngIf",t.visible(n.settings.filter,n.settings.historyComparisionType)),Xs(1),Oi("ngForOf",t.classes),Xs(1),Oi("ngForOf",t.subElements)}}function Dh(t,e){if(1&t){const t=Ni();Si(0,"div"),Si(1,"div",1),Si(2,"div"),Si(3,"a",2),Ri("click",function(e){return Ae(t),zi().collapseAll(e)}),io(4),Ti(),io(5," | "),Si(6,"a",2),Ri("click",function(e){return Ae(t),zi().expandAll(e)}),io(7),Ti(),Ti(),Si(8,"div",3),ki(9,lh,2,1,"ng-container",0),ki(10,ah,2,1,"ng-container",0),ki(11,ch,2,1,"ng-container",0),Vi(12,"br"),io(13),Si(14,"input",4),Ri("ngModelChange",function(e){return Ae(t),zi().settings.grouping=e})("ngModelChange",function(){return Ae(t),zi().updateCoverageInfo()}),Ti(),Ti(),Si(15,"div",3),ki(16,gh,9,6,"ng-container",0),Ti(),Si(17,"div",5),Si(18,"span"),io(19),Ti(),Si(20,"input",6),Ri("ngModelChange",function(e){return Ae(t),zi().settings.filter=e}),Ti(),Ti(),Ti(),Si(21,"table",7),Si(22,"colgroup"),Vi(23,"col"),Vi(24,"col",8),Vi(25,"col",9),Vi(26,"col",10),Vi(27,"col",11),Vi(28,"col",12),Vi(29,"col",13),ki(30,vh,1,0,"col",14),ki(31,yh,1,0,"col",15),ki(32,_h,1,0,"col",16),ki(33,mh,1,0,"col",17),Ti(),Si(34,"thead"),Si(35,"tr"),Si(36,"th"),Si(37,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("name",e)}),Vi(38,"i",18),io(39),Ti(),Ti(),Si(40,"th",5),Si(41,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("covered",e)}),Vi(42,"i",18),io(43),Ti(),Ti(),Si(44,"th",5),Si(45,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("uncovered",e)}),Vi(46,"i",18),io(47),Ti(),Ti(),Si(48,"th",5),Si(49,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("coverable",e)}),Vi(50,"i",18),io(51),Ti(),Ti(),Si(52,"th",5),Si(53,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("total",e)}),Vi(54,"i",18),io(55),Ti(),Ti(),Si(56,"th",19),Si(57,"a",2),Ri("click",function(e){return Ae(t),zi().updateSorting("coverage",e)}),Vi(58,"i",18),io(59),Ti(),Ti(),ki(60,Ch,4,6,"th",20),ki(61,wh,4,6,"th",20),ki(62,Eh,4,6,"th",21),Ti(),Ti(),Si(63,"tbody"),ki(64,Vh,4,3,"ng-container",22),Ti(),Ti(),Ti()}if(2&t){const t=zi();Xs(4),oo(t.translations.collapseAll),Xs(3),oo(t.translations.expandAll),Xs(2),Oi("ngIf",-1===t.settings.grouping),Xs(1),Oi("ngIf",0===t.settings.grouping),Xs(1),Oi("ngIf",t.settings.grouping>0),Xs(2),lo(" ",t.translations.grouping," "),Xs(1),Oi("max",t.settings.groupingMaximum)("ngModel",t.settings.grouping),Xs(2),Oi("ngIf",t.historicCoverageExecutionTimes.length>0),Xs(3),lo("",t.translations.filter," "),Xs(1),Oi("ngModel",t.settings.filter),Xs(10),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(5),Oi("ngClass",Ol(31,bh,"name"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"name"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"name"!==t.settings.sortBy)),Xs(1),oo(t.translations.name),Xs(3),Oi("ngClass",Ol(35,bh,"covered"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"covered"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"covered"!==t.settings.sortBy)),Xs(1),oo(t.translations.covered),Xs(3),Oi("ngClass",Ol(39,bh,"uncovered"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"uncovered"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"uncovered"!==t.settings.sortBy)),Xs(1),oo(t.translations.uncovered),Xs(3),Oi("ngClass",Ol(43,bh,"coverable"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"coverable"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"coverable"!==t.settings.sortBy)),Xs(1),oo(t.translations.coverable),Xs(3),Oi("ngClass",Ol(47,bh,"total"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"total"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"total"!==t.settings.sortBy)),Xs(1),oo(t.translations.total),Xs(3),Oi("ngClass",Ol(51,bh,"coverage"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"coverage"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"coverage"!==t.settings.sortBy)),Xs(1),oo(t.translations.coverage),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(1),Oi("ngIf",t.branchCoverageAvailable),Xs(2),Oi("ngForOf",t.codeElements)}}let Hh=(()=>{class t{constructor(t){this.queryString="",this.historicCoverageExecutionTimes=[],this.branchCoverageAvailable=!1,this.codeElements=[],this.translations={},this.settings=new pu,this.window=t.nativeWindow}ngOnInit(){this.historicCoverageExecutionTimes=this.window.historicCoverageExecutionTimes,this.branchCoverageAvailable=this.window.branchCoverageAvailable,this.translations=this.window.translations;let t=!1;if(void 0!==this.window.history&&void 0!==this.window.history.replaceState&&null!==this.window.history.state&&null!=this.window.history.state.coverageInfoSettings)console.log("Coverage info: Restoring from history",this.window.history.state.coverageInfoSettings),t=!0,this.settings=JSON.parse(JSON.stringify(this.window.history.state.coverageInfoSettings));else{let t=0,e=this.window.assemblies;for(let n=0;n<e.length;n++)for(let s=0;s<e[n].classes.length;s++)t=Math.max(t,(e[n].classes[s].name.match(/\./g)||[]).length);this.settings.groupingMaximum=t,console.log("Grouping maximum: "+t)}const e=window.location.href.indexOf("?");e>-1&&(this.queryString=window.location.href.substr(e)),this.updateCoverageInfo(),t&&this.restoreCollapseState()}onDonBeforeUnlodad(){if(this.saveCollapseState(),void 0!==this.window.history&&void 0!==this.window.history.replaceState){console.log("Coverage info: Updating history",this.settings);let t=new fu;null!==window.history.state&&(t=JSON.parse(JSON.stringify(this.window.history.state))),t.coverageInfoSettings=JSON.parse(JSON.stringify(this.settings)),window.history.replaceState(t,"")}}updateCoverageInfo(){let t=(new Date).getTime(),e=this.window.assemblies,n=[],s=0;if(0===this.settings.grouping)for(let o=0;o<e.length;o++){let t=new mu(e[o].name,null);n.push(t);for(let n=0;n<e[o].classes.length;n++)t.insertClass(new _u(e[o].classes[n],this.queryString),null),s++}else if(-1===this.settings.grouping){let t=new mu(this.translations.all,null);n.push(t);for(let n=0;n<e.length;n++)for(let r=0;r<e[n].classes.length;r++)t.insertClass(new _u(e[n].classes[r],this.queryString),null),s++}else for(let o=0;o<e.length;o++){let t=new mu(e[o].name,null);n.push(t);for(let n=0;n<e[o].classes.length;n++)t.insertClass(new _u(e[o].classes[n],this.queryString),this.settings.grouping),s++}let r=-1,i=1;"name"===this.settings.sortBy&&(r="asc"===this.settings.sortOrder?-1:1,i="asc"===this.settings.sortOrder?1:-1),n.sort(function(t,e){return t.name===e.name?0:t.name<e.name?r:i}),mu.sortCodeElementViewModels(n,this.settings.sortBy,"asc"===this.settings.sortOrder);for(let o=0;o<n.length;o++)n[o].changeSorting(this.settings.sortBy,"asc"===this.settings.sortOrder);this.codeElements=n,console.log(`Processing assemblies finished (Duration: ${(new Date).getTime()-t}ms, Assemblies: ${n.length}, Classes: ${s})`),""!==this.settings.historyComparisionDate&&this.updateCurrentHistoricCoverage()}updateCurrentHistoricCoverage(){let t=(new Date).getTime();for(let e=0;e<this.codeElements.length;e++)this.codeElements[e].updateCurrentHistoricCoverage(this.settings.historyComparisionDate);console.log(`Updating current historic coverage finished (Duration: ${(new Date).getTime()-t}ms)`)}collapseAll(t){t.preventDefault();for(let e=0;e<this.codeElements.length;e++)this.codeElements[e].collapse()}expandAll(t){t.preventDefault();for(let e=0;e<this.codeElements.length;e++)this.codeElements[e].expand()}updateSorting(t,e){e.preventDefault(),this.settings.sortOrder=t===this.settings.sortBy&&"asc"===this.settings.sortOrder?"desc":"asc",this.settings.sortBy=t,console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`),mu.sortCodeElementViewModels(this.codeElements,this.settings.sortBy,"asc"===this.settings.sortOrder);for(let n=0;n<this.codeElements.length;n++)this.codeElements[n].changeSorting(this.settings.sortBy,"asc"===this.settings.sortOrder)}saveCollapseState(){this.settings.collapseStates=[];let t=e=>{for(let n=0;n<e.length;n++)this.settings.collapseStates.push(e[n].collapsed),t(e[n].subElements)};t(this.codeElements)}restoreCollapseState(){let t=0,e=n=>{for(let s=0;s<n.length;s++)this.settings.collapseStates.length>t&&(n[s].collapsed=this.settings.collapseStates[t]),t++,e(n[s].subElements)};e(this.codeElements)}}return t.\u0275fac=function(e){return new(e||t)(Ai(bu))},t.\u0275cmp=jt({type:t,selectors:[["coverage-info"]],hostBindings:function(t,e){1&t&&Ri("beforeunload",function(){return e.onDonBeforeUnlodad()},!1,ps)},decls:1,vars:1,consts:[[4,"ngIf"],[1,"customizebox"],["href","#",3,"click"],[1,"center"],["type","range","step","1","min","-1",3,"max","ngModel","ngModelChange"],[1,"right"],["type","text",3,"ngModel","ngModelChange"],[1,"overview","table-fixed","stripped"],[1,"column90"],[1,"column105"],[1,"column100"],[1,"column70"],[1,"column98"],[1,"column112"],["class","column90",4,"ngIf"],["class","column70",4,"ngIf"],["class","column98",4,"ngIf"],["class","column112",4,"ngIf"],[1,"icon-down-dir",3,"ngClass"],["colspan","2",1,"center"],["class","right",4,"ngIf"],["class","center","colspan","2",4,"ngIf"],[4,"ngFor","ngForOf"],[3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[3,"value"],["value","allChanges"],["value","lineCoverageIncreaseOnly"],["value","lineCoverageDecreaseOnly"],["value","branchCoverageIncreaseOnly",4,"ngIf"],["value","branchCoverageDecreaseOnly",4,"ngIf"],["value","branchCoverageIncreaseOnly"],["value","branchCoverageDecreaseOnly"],["codeelement-row","",3,"element","collapsed","branchCoverageAvailable",4,"ngIf"],["codeelement-row","",3,"element","collapsed","branchCoverageAvailable"],["class-row","",3,"clazz","translations","branchCoverageAvailable","historyComparisionDate",4,"ngIf"],["class-row","",3,"clazz","translations","branchCoverageAvailable","historyComparisionDate"],["codeelement-row","",1,"namespace",3,"element","collapsed","branchCoverageAvailable"],["class","namespace","class-row","",3,"clazz","translations","branchCoverageAvailable","historyComparisionDate",4,"ngIf"],["class-row","",1,"namespace",3,"clazz","translations","branchCoverageAvailable","historyComparisionDate"]],template:function(t,e){1&t&&ki(0,Dh,65,55,"div",0),2&t&&Oi("ngIf",e.codeElements.length>0)},directives:[Ha,nu,bc,Nc,Xc,Sa,Va,iu,ou,uu,Vu,oh],encapsulation:2}),t})();class Nh{constructor(){this.assembly="",this.numberOfRiskHotspots=10,this.filter="",this.sortBy="",this.sortOrder="asc"}}function Mh(t,e){if(1&t&&(Si(0,"option",14),io(1),Ti()),2&t){const t=e.$implicit;Oi("value",t),Xs(1),oo(t)}}function Ph(t,e){1&t&&(Si(0,"option",21),io(1,"20"),Ti())}function Rh(t,e){1&t&&(Si(0,"option",22),io(1,"50"),Ti())}function jh(t,e){1&t&&(Si(0,"option",23),io(1,"100"),Ti())}function Fh(t,e){if(1&t&&(Si(0,"option",14),io(1),Ti()),2&t){const t=zi(3);Oi("value",t.totalNumberOfRiskHotspots),Xs(1),oo(t.translations.all)}}function zh(t,e){if(1&t){const t=Ni();Si(0,"select",15),Ri("ngModelChange",function(e){return Ae(t),zi(2).settings.numberOfRiskHotspots=e}),Si(1,"option",16),io(2,"10"),Ti(),ki(3,Ph,2,0,"option",17),ki(4,Rh,2,0,"option",18),ki(5,jh,2,0,"option",19),ki(6,Fh,2,2,"option",20),Ti()}if(2&t){const t=zi(2);Oi("ngModel",t.settings.numberOfRiskHotspots),Xs(3),Oi("ngIf",t.totalNumberOfRiskHotspots>10),Xs(1),Oi("ngIf",t.totalNumberOfRiskHotspots>20),Xs(1),Oi("ngIf",t.totalNumberOfRiskHotspots>50),Xs(1),Oi("ngIf",t.totalNumberOfRiskHotspots>100)}}function Lh(t,e){1&t&&Vi(0,"col",24)}const Bh=function(t,e,n){return{"icon-up-dir_active":t,"icon-down-dir_active":e,"icon-down-dir":n}};function $h(t,e){if(1&t){const t=Ni();Si(0,"th"),Si(1,"a",11),Ri("click",function(e){const n=Ae(t).index;return zi(2).updateSorting(""+n,e)}),Vi(2,"i",12),io(3),Ti(),Si(4,"a",25),Vi(5,"i",26),Ti(),Ti()}if(2&t){const t=e.$implicit,n=e.index,s=zi(2);Xs(2),Oi("ngClass",Ol(3,Bh,s.settings.sortBy===""+n&&"desc"===s.settings.sortOrder,s.settings.sortBy===""+n&&"asc"===s.settings.sortOrder,s.settings.sortBy!==""+n)),Xs(1),oo(t.name),Xs(1),Li("href",t.explanationUrl,os)}}const Uh=function(t,e){return{lightred:t,lightgreen:e}};function Zh(t,e){if(1&t&&(Si(0,"td",29),io(1),Ti()),2&t){const t=e.$implicit;Oi("ngClass",Al(2,Uh,t.exceeded,!t.exceeded)),Xs(1),oo(t.value)}}function qh(t,e){if(1&t&&(Si(0,"tr"),Si(1,"td"),io(2),Ti(),Si(3,"td"),Si(4,"a",25),io(5),Ti(),Ti(),Si(6,"td",27),Si(7,"a",25),io(8),Ti(),Ti(),ki(9,Zh,2,5,"td",28),Ti()),2&t){const t=e.$implicit,n=zi(2);Xs(2),oo(t.assembly),Xs(2),Oi("href",t.reportPath+n.queryString,os),Xs(1),oo(t.class),Xs(1),Oi("title",t.methodName),Xs(1),Oi("href",t.reportPath+n.queryString+"#file"+t.fileIndex+"_line"+t.line,os),Xs(1),lo(" ",t.methodShortName," "),Xs(1),Oi("ngForOf",t.metrics)}}function Wh(t,e){if(1&t){const t=Ni();Si(0,"div"),Si(1,"div",1),Si(2,"div"),Si(3,"select",2),Ri("ngModelChange",function(e){return Ae(t),zi().settings.assembly=e})("ngModelChange",function(){return Ae(t),zi().updateRiskHotpots()}),Si(4,"option",3),io(5),Ti(),ki(6,Mh,2,2,"option",4),Ti(),Ti(),Si(7,"div",5),Si(8,"span"),io(9),Ti(),ki(10,zh,7,5,"select",6),Ti(),Vi(11,"div",5),Si(12,"div",7),Si(13,"span"),io(14),Ti(),Si(15,"input",8),Ri("ngModelChange",function(e){return Ae(t),zi().settings.filter=e})("ngModelChange",function(){return Ae(t),zi().updateRiskHotpots()}),Ti(),Ti(),Ti(),Si(16,"table",9),Si(17,"colgroup"),Vi(18,"col"),Vi(19,"col"),Vi(20,"col"),ki(21,Lh,1,0,"col",10),Ti(),Si(22,"thead"),Si(23,"tr"),Si(24,"th"),Si(25,"a",11),Ri("click",function(e){return Ae(t),zi().updateSorting("assembly",e)}),Vi(26,"i",12),io(27),Ti(),Ti(),Si(28,"th"),Si(29,"a",11),Ri("click",function(e){return Ae(t),zi().updateSorting("class",e)}),Vi(30,"i",12),io(31),Ti(),Ti(),Si(32,"th"),Si(33,"a",11),Ri("click",function(e){return Ae(t),zi().updateSorting("method",e)}),Vi(34,"i",12),io(35),Ti(),Ti(),ki(36,$h,6,7,"th",13),Ti(),Ti(),Si(37,"tbody"),ki(38,qh,10,7,"tr",13),function(t,e){const n=ke();let s;n.firstCreatePass?(s=function(t,e){if(e)for(let n=e.length-1;n>=0;n--){const s=e[n];if(t===s.name)return s}throw new st("302","The pipe 'slice' could not be found!")}("slice",n.pipeRegistry),n.data[59]=s,s.onDestroy&&(n.destroyHooks||(n.destroyHooks=[])).push(59,s.onDestroy)):s=n.data[59];const r=s.factory||(s.factory=ne(s.type)),i=_t(Ai);try{const t=pn(!1),e=r();pn(t),function(t,e,n,s){59>=t.data.length&&(t.data[59]=null,t.blueprint[59]=null),e[59]=s}(n,xe(),0,e)}finally{_t(i)}}(),Ti(),Ti(),Ti()}if(2&t){const t=zi();Xs(3),Oi("ngModel",t.settings.assembly),Xs(2),oo(t.translations.assembly),Xs(1),Oi("ngForOf",t.assemblies),Xs(3),oo(t.translations.top),Xs(1),Oi("ngIf",t.totalNumberOfRiskHotspots>10),Xs(4),lo("",t.translations.filter," "),Xs(1),Oi("ngModel",t.settings.filter),Xs(6),Oi("ngForOf",t.riskHotspotMetrics),Xs(5),Oi("ngClass",Ol(20,Bh,"assembly"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"assembly"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"assembly"!==t.settings.sortBy)),Xs(1),oo(t.translations.assembly),Xs(3),Oi("ngClass",Ol(24,Bh,"class"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"class"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"class"!==t.settings.sortBy)),Xs(1),oo(t.translations.class),Xs(3),Oi("ngClass",Ol(28,Bh,"method"===t.settings.sortBy&&"desc"===t.settings.sortOrder,"method"===t.settings.sortBy&&"asc"===t.settings.sortOrder,"method"!==t.settings.sortBy)),Xs(1),oo(t.translations.method),Xs(1),Oi("ngForOf",t.riskHotspotMetrics),Xs(2),Oi("ngForOf",function(t,e,n,s,r){const i=t+Gt,o=xe(),l=function(t,e){return t[e]}(o,i);return function(t,e){return yi.isWrapped(e)&&(e=yi.unwrap(e),t[we.lFrame.bindingIndex]=Ys),e}(o,function(t,e){return t[1].data[e].pure}(o,i)?Sl(o,Ne(),e,l.transform,n,s,r,l):l.transform(n,s,r))}(39,16,t.riskHotspots,0,t.settings.numberOfRiskHotspots))}}let Gh=(()=>{class t{constructor(t){this.queryString="",this.riskHotspotMetrics=[],this.riskHotspots=[],this.totalNumberOfRiskHotspots=0,this.assemblies=[],this.translations={},this.settings=new Nh,this.window=t.nativeWindow}ngOnInit(){this.riskHotspotMetrics=this.window.riskHotspotMetrics,this.translations=this.window.translations,void 0!==this.window.history&&void 0!==this.window.history.replaceState&&null!==this.window.history.state&&null!=this.window.history.state.riskHotspotsSettings&&(console.log("Risk hotspots: Restoring from history",this.window.history.state.riskHotspotsSettings),this.settings=JSON.parse(JSON.stringify(this.window.history.state.riskHotspotsSettings)));const t=window.location.href.indexOf("?");t>-1&&(this.queryString=window.location.href.substr(t)),this.updateRiskHotpots()}onDonBeforeUnlodad(){if(void 0!==this.window.history&&void 0!==this.window.history.replaceState){console.log("Risk hotspots: Updating history",this.settings);let t=new fu;null!==window.history.state&&(t=JSON.parse(JSON.stringify(this.window.history.state))),t.riskHotspotsSettings=JSON.parse(JSON.stringify(this.settings)),window.history.replaceState(t,"")}}updateRiskHotpots(){const t=this.window.riskHotspots;if(this.totalNumberOfRiskHotspots=t.length,0===this.assemblies.length){let e=[];for(let n=0;n<t.length;n++)-1===e.indexOf(t[n].assembly)&&e.push(t[n].assembly);this.assemblies=e.sort()}let e=[];for(let r=0;r<t.length;r++)""!==this.settings.filter&&-1===t[r].class.toLowerCase().indexOf(this.settings.filter)||""!==this.settings.assembly&&t[r].assembly!==this.settings.assembly||e.push(t[r]);let n="asc"===this.settings.sortOrder?-1:1,s="asc"===this.settings.sortOrder?1:-1;if("assembly"===this.settings.sortBy)e.sort(function(t,e){return t.assembly===e.assembly?0:t.assembly<e.assembly?n:s});else if("class"===this.settings.sortBy)e.sort(function(t,e){return t.class===e.class?0:t.class<e.class?n:s});else if("method"===this.settings.sortBy)e.sort(function(t,e){return t.methodShortName===e.methodShortName?0:t.methodShortName<e.methodShortName?n:s});else if(""!==this.settings.sortBy){let t=parseInt(this.settings.sortBy,10);e.sort(function(e,r){return e.metrics[t].value===r.metrics[t].value?0:e.metrics[t].value<r.metrics[t].value?n:s})}this.riskHotspots=e}updateSorting(t,e){e.preventDefault(),this.settings.sortOrder=t===this.settings.sortBy&&"asc"===this.settings.sortOrder?"desc":"asc",this.settings.sortBy=t,console.log(`Updating sort column: '${this.settings.sortBy}' (${this.settings.sortOrder})`),this.updateRiskHotpots()}}return t.\u0275fac=function(e){return new(e||t)(Ai(bu))},t.\u0275cmp=jt({type:t,selectors:[["risk-hotspots"]],hostBindings:function(t,e){1&t&&Ri("beforeunload",function(){return e.onDonBeforeUnlodad()},!1,ps)},decls:1,vars:1,consts:[[4,"ngIf"],[1,"customizebox"],["name","assembly",3,"ngModel","ngModelChange"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"center"],[3,"ngModel","ngModelChange",4,"ngIf"],[1,"right"],["type","text",3,"ngModel","ngModelChange"],[1,"overview","table-fixed","stripped"],["class","column105",4,"ngFor","ngForOf"],["href","#",3,"click"],[1,"icon-down-dir",3,"ngClass"],[4,"ngFor","ngForOf"],[3,"value"],[3,"ngModel","ngModelChange"],["value","10"],["value","20",4,"ngIf"],["value","50",4,"ngIf"],["value","100",4,"ngIf"],[3,"value",4,"ngIf"],["value","20"],["value","50"],["value","100"],[1,"column105"],[3,"href"],[1,"icon-info-circled"],[3,"title"],["class","right",3,"ngClass",4,"ngFor","ngForOf"],[1,"right",3,"ngClass"]],template:function(t,e){1&t&&ki(0,Wh,40,32,"div",0),2&t&&Oi("ngIf",e.totalNumberOfRiskHotspots>0)},directives:[Ha,iu,Nc,Xc,ou,uu,Va,bc,Sa],pipes:[Pa],encapsulation:2}),t})(),Qh=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=Bt({type:t,bootstrap:[Gh,Hh]}),t.\u0275inj=at({providers:[bu],imports:[[fc,du]]}),t})();(function(){if(da)throw new Error("Cannot enable prod mode after platform setup.");ha=!1})(),hc().bootstrapModule(Qh).catch(t=>console.error(t))}},t=>{"use strict";t(t.s=520)}]);