(function() {
	var ns = class {
		constructor() {
			this.listeners = [], this.unexpectedErrorHandler = function(e) {
				setTimeout(() => {
					throw e.stack ? Pt.isErrorNoTelemetry(e) ? new Pt(e.message + `

` + e.stack) : /* @__PURE__ */ new Error(e.message + `

` + e.stack) : e;
				}, 0);
			};
		}
		emit(e) {
			this.listeners.forEach((t) => {
				t(e);
			});
		}
		onUnexpectedError(e) {
			this.unexpectedErrorHandler(e), this.emit(e);
		}
		onUnexpectedExternalError(e) {
			this.unexpectedErrorHandler(e);
		}
	};
	const rs = new ns();
	function $e(e) {
		ss(e) || rs.onUnexpectedError(e);
	}
	function A1(e) {
		if (e instanceof Error) {
			const { name: t, message: n } = e;
			return {
				$isError: !0,
				name: t,
				message: n,
				stack: e.stacktrace || e.stack,
				noTelemetry: Pt.isErrorNoTelemetry(e)
			};
		}
		return e;
	}
	const kt = "Canceled";
	function ss(e) {
		return e instanceof is ? !0 : e instanceof Error && e.name === kt && e.message === kt;
	}
	var is = class extends Error {
		constructor() {
			super(kt), this.name = this.message;
		}
	}, Pt = class v1 extends Error {
		constructor(t) {
			super(t), this.name = "CodeExpectedError";
		}
		static fromError(t) {
			if (t instanceof v1) return t;
			const n = new v1();
			return n.message = t.message, n.stack = t.stack, n;
		}
		static isErrorNoTelemetry(t) {
			return t.name === "CodeExpectedError";
		}
	}, ae = class $r extends Error {
		constructor(t) {
			super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, $r.prototype);
		}
	};
	function as(e, t) {
		const n = this;
		let r = !1, s;
		return function() {
			if (r) return s;
			if (r = !0, t) try {
				s = e.apply(n, arguments);
			} finally {
				t();
			}
			else s = e.apply(n, arguments);
			return s;
		};
	}
	var nt;
	(function(e) {
		function t(p) {
			return p && typeof p == "object" && typeof p[Symbol.iterator] == "function";
		}
		e.is = t;
		const n = Object.freeze([]);
		function r() {
			return n;
		}
		e.empty = r;
		function* s(p) {
			yield p;
		}
		e.single = s;
		function i(p) {
			return t(p) ? p : s(p);
		}
		e.wrap = i;
		function o(p) {
			return p || n;
		}
		e.from = o;
		function* l(p) {
			for (let b = p.length - 1; b >= 0; b--) yield p[b];
		}
		e.reverse = l;
		function u(p) {
			return !p || p[Symbol.iterator]().next().done === !0;
		}
		e.isEmpty = u;
		function c(p) {
			return p[Symbol.iterator]().next().value;
		}
		e.first = c;
		function m(p, b) {
			let y = 0;
			for (const S of p) if (b(S, y++)) return !0;
			return !1;
		}
		e.some = m;
		function h(p, b) {
			for (const y of p) if (b(y)) return y;
		}
		e.find = h;
		function* d(p, b) {
			for (const y of p) b(y) && (yield y);
		}
		e.filter = d;
		function* f(p, b) {
			let y = 0;
			for (const S of p) yield b(S, y++);
		}
		e.map = f;
		function* g(p, b) {
			let y = 0;
			for (const S of p) yield* b(S, y++);
		}
		e.flatMap = g;
		function* v(...p) {
			for (const b of p) yield* b;
		}
		e.concat = v;
		function L(p, b, y) {
			let S = y;
			for (const F of p) S = b(S, F);
			return S;
		}
		e.reduce = L;
		function* N(p, b, y = p.length) {
			for (b < 0 && (b += p.length), y < 0 ? y += p.length : y > p.length && (y = p.length); b < y; b++) yield p[b];
		}
		e.slice = N;
		function E(p, b = Number.POSITIVE_INFINITY) {
			const y = [];
			if (b === 0) return [y, p];
			const S = p[Symbol.iterator]();
			for (let F = 0; F < b; F++) {
				const H = S.next();
				if (H.done) return [y, e.empty()];
				y.push(H.value);
			}
			return [y, { [Symbol.iterator]() {
				return S;
			} }];
		}
		e.consume = E;
		async function w(p) {
			const b = [];
			for await (const y of p) b.push(y);
			return Promise.resolve(b);
		}
		e.asyncToArray = w;
	})(nt || (nt = {}));
	function Dt(e) {
		return e;
	}
	function E1(e) {
		if (nt.is(e)) {
			const t = [];
			for (const n of e) if (n) try {
				n.dispose();
			} catch (r) {
				t.push(r);
			}
			if (t.length === 1) throw t[0];
			if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
			return Array.isArray(e) ? [] : e;
		} else if (e) return e.dispose(), e;
	}
	function ls(...e) {
		return rt(() => E1(e));
	}
	function rt(e) {
		return Dt({ dispose: as(() => {
			e();
		}) });
	}
	var It = class Wr {
		static {
			this.DISABLE_DISPOSED_WARNING = !1;
		}
		constructor() {
			this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1;
		}
		dispose() {
			this._isDisposed || (this._isDisposed = !0, this.clear());
		}
		get isDisposed() {
			return this._isDisposed;
		}
		clear() {
			if (this._toDispose.size !== 0) try {
				E1(this._toDispose);
			} finally {
				this._toDispose.clear();
			}
		}
		add(t) {
			if (!t) return t;
			if (t === this) throw new Error("Cannot register a disposable on itself!");
			return this._isDisposed ? Wr.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
		}
		deleteAndLeak(t) {
			t && this._toDispose.has(t) && this._toDispose.delete(t);
		}
	}, st = class {
		static {
			this.None = Object.freeze({ dispose() {} });
		}
		constructor() {
			this._store = new It(), this._store;
		}
		dispose() {
			this._store.dispose();
		}
		_register(e) {
			if (e === this) throw new Error("Cannot register a disposable on itself!");
			return this._store.add(e);
		}
	}, $ = class Ct {
		static {
			this.Undefined = new Ct(void 0);
		}
		constructor(t) {
			this.element = t, this.next = Ct.Undefined, this.prev = Ct.Undefined;
		}
	}, us = class {
		constructor() {
			this._first = $.Undefined, this._last = $.Undefined, this._size = 0;
		}
		get size() {
			return this._size;
		}
		isEmpty() {
			return this._first === $.Undefined;
		}
		clear() {
			let e = this._first;
			for (; e !== $.Undefined;) {
				const t = e.next;
				e.prev = $.Undefined, e.next = $.Undefined, e = t;
			}
			this._first = $.Undefined, this._last = $.Undefined, this._size = 0;
		}
		unshift(e) {
			return this._insert(e, !1);
		}
		push(e) {
			return this._insert(e, !0);
		}
		_insert(e, t) {
			const n = new $(e);
			if (this._first === $.Undefined) this._first = n, this._last = n;
			else if (t) {
				const s = this._last;
				this._last = n, n.prev = s, s.next = n;
			} else {
				const s = this._first;
				this._first = n, n.next = s, s.prev = n;
			}
			this._size += 1;
			let r = !1;
			return () => {
				r || (r = !0, this._remove(n));
			};
		}
		shift() {
			if (this._first !== $.Undefined) {
				const e = this._first.element;
				return this._remove(this._first), e;
			}
		}
		pop() {
			if (this._last !== $.Undefined) {
				const e = this._last.element;
				return this._remove(this._last), e;
			}
		}
		_remove(e) {
			if (e.prev !== $.Undefined && e.next !== $.Undefined) {
				const t = e.prev;
				t.next = e.next, e.next.prev = t;
			} else e.prev === $.Undefined && e.next === $.Undefined ? (this._first = $.Undefined, this._last = $.Undefined) : e.next === $.Undefined ? (this._last = this._last.prev, this._last.next = $.Undefined) : e.prev === $.Undefined && (this._first = this._first.next, this._first.prev = $.Undefined);
			this._size -= 1;
		}
		*[Symbol.iterator]() {
			let e = this._first;
			for (; e !== $.Undefined;) yield e.element, e = e.next;
		}
	};
	const cs = globalThis.performance && typeof globalThis.performance.now == "function";
	var x1 = class zr {
		static create(t) {
			return new zr(t);
		}
		constructor(t) {
			this._now = cs && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
		}
		stop() {
			this._stopTime = this._now();
		}
		reset() {
			this._startTime = this._now(), this._stopTime = -1;
		}
		elapsed() {
			return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
		}
	}, it;
	(function(e) {
		e.None = () => st.None;
		function t(R, _) {
			return d(R, () => {}, 0, void 0, !0, void 0, _);
		}
		e.defer = t;
		function n(R) {
			return (_, x = null, C) => {
				let k = !1, D;
				return D = R((V) => {
					if (!k) return D ? D.dispose() : k = !0, _.call(x, V);
				}, null, C), k && D.dispose(), D;
			};
		}
		e.once = n;
		function r(R, _) {
			return e.once(e.filter(R, _));
		}
		e.onceIf = r;
		function s(R, _, x) {
			return m((C, k = null, D) => R((V) => C.call(k, _(V)), null, D), x);
		}
		e.map = s;
		function i(R, _, x) {
			return m((C, k = null, D) => R((V) => {
				_(V), C.call(k, V);
			}, null, D), x);
		}
		e.forEach = i;
		function o(R, _, x) {
			return m((C, k = null, D) => R((V) => _(V) && C.call(k, V), null, D), x);
		}
		e.filter = o;
		function l(R) {
			return R;
		}
		e.signal = l;
		function u(...R) {
			return (_, x = null, C) => h(ls(...R.map((k) => k((D) => _.call(x, D)))), C);
		}
		e.any = u;
		function c(R, _, x, C) {
			let k = x;
			return s(R, (D) => (k = _(k, D), k), C);
		}
		e.reduce = c;
		function m(R, _) {
			let x;
			const k = new se({
				onWillAddFirstListener() {
					x = R(k.fire, k);
				},
				onDidRemoveLastListener() {
					x?.dispose();
				}
			});
			return _?.add(k), k.event;
		}
		function h(R, _) {
			return _ instanceof Array ? _.push(R) : _ && _.add(R), R;
		}
		function d(R, _, x = 100, C = !1, k = !1, D, V) {
			let Y, K, Ve, Nt = 0, Je;
			const St = new se({
				leakWarningThreshold: D,
				onWillAddFirstListener() {
					Y = R((a0) => {
						Nt++, K = _(K, a0), C && !Ve && (St.fire(K), K = void 0), Je = () => {
							const o0 = K;
							K = void 0, Ve = void 0, (!C || Nt > 1) && St.fire(o0), Nt = 0;
						}, typeof x == "number" ? (clearTimeout(Ve), Ve = setTimeout(Je, x)) : Ve === void 0 && (Ve = 0, queueMicrotask(Je));
					});
				},
				onWillRemoveListener() {
					k && Nt > 0 && Je?.();
				},
				onDidRemoveLastListener() {
					Je = void 0, Y.dispose();
				}
			});
			return V?.add(St), St.event;
		}
		e.debounce = d;
		function f(R, _ = 0, x) {
			return e.debounce(R, (C, k) => C ? (C.push(k), C) : [k], _, void 0, !0, void 0, x);
		}
		e.accumulate = f;
		function g(R, _ = (C, k) => C === k, x) {
			let C = !0, k;
			return o(R, (D) => {
				const V = C || !_(D, k);
				return C = !1, k = D, V;
			}, x);
		}
		e.latch = g;
		function v(R, _, x) {
			return [e.filter(R, _, x), e.filter(R, (C) => !_(C), x)];
		}
		e.split = v;
		function L(R, _ = !1, x = [], C) {
			let k = x.slice(), D = R((K) => {
				k ? k.push(K) : Y.fire(K);
			});
			C && C.add(D);
			const V = () => {
				k?.forEach((K) => Y.fire(K)), k = null;
			}, Y = new se({
				onWillAddFirstListener() {
					D || (D = R((K) => Y.fire(K)), C && C.add(D));
				},
				onDidAddFirstListener() {
					k && (_ ? setTimeout(V) : V());
				},
				onDidRemoveLastListener() {
					D && D.dispose(), D = null;
				}
			});
			return C && C.add(Y), Y.event;
		}
		e.buffer = L;
		function N(R, _) {
			return (C, k, D) => {
				const V = _(new w());
				return R(function(Y) {
					const K = V.evaluate(Y);
					K !== E && C.call(k, K);
				}, void 0, D);
			};
		}
		e.chain = N;
		const E = Symbol("HaltChainable");
		class w {
			constructor() {
				this.steps = [];
			}
			map(_) {
				return this.steps.push(_), this;
			}
			forEach(_) {
				return this.steps.push((x) => (_(x), x)), this;
			}
			filter(_) {
				return this.steps.push((x) => _(x) ? x : E), this;
			}
			reduce(_, x) {
				let C = x;
				return this.steps.push((k) => (C = _(C, k), C)), this;
			}
			latch(_ = (x, C) => x === C) {
				let x = !0, C;
				return this.steps.push((k) => {
					const D = x || !_(k, C);
					return x = !1, C = k, D ? k : E;
				}), this;
			}
			evaluate(_) {
				for (const x of this.steps) if (_ = x(_), _ === E) break;
				return _;
			}
		}
		function p(R, _, x = (C) => C) {
			const C = (...Y) => V.fire(x(...Y)), k = () => R.on(_, C), D = () => R.removeListener(_, C), V = new se({
				onWillAddFirstListener: k,
				onDidRemoveLastListener: D
			});
			return V.event;
		}
		e.fromNodeEventEmitter = p;
		function b(R, _, x = (C) => C) {
			const C = (...Y) => V.fire(x(...Y)), k = () => R.addEventListener(_, C), D = () => R.removeEventListener(_, C), V = new se({
				onWillAddFirstListener: k,
				onDidRemoveLastListener: D
			});
			return V.event;
		}
		e.fromDOMEventEmitter = b;
		function y(R) {
			return new Promise((_) => n(R)(_));
		}
		e.toPromise = y;
		function S(R) {
			const _ = new se();
			return R.then((x) => {
				_.fire(x);
			}, () => {
				_.fire(void 0);
			}).finally(() => {
				_.dispose();
			}), _.event;
		}
		e.fromPromise = S;
		function F(R, _) {
			return R((x) => _.fire(x));
		}
		e.forward = F;
		function H(R, _, x) {
			return _(x), R((C) => _(C));
		}
		e.runAndSubscribe = H;
		class Q {
			constructor(_, x) {
				this._observable = _, this._counter = 0, this._hasChanged = !1;
				const C = {
					onWillAddFirstListener: () => {
						_.addObserver(this), this._observable.reportChanges();
					},
					onDidRemoveLastListener: () => {
						_.removeObserver(this);
					}
				};
				this.emitter = new se(C), x && x.add(this.emitter);
			}
			beginUpdate(_) {
				this._counter++;
			}
			handlePossibleChange(_) {}
			handleChange(_, x) {
				this._hasChanged = !0;
			}
			endUpdate(_) {
				this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
			}
		}
		function A(R, _) {
			return new Q(R, _).emitter.event;
		}
		e.fromObservable = A;
		function ce(R) {
			return (_, x, C) => {
				let k = 0, D = !1;
				const V = {
					beginUpdate() {
						k++;
					},
					endUpdate() {
						k--, k === 0 && (R.reportChanges(), D && (D = !1, _.call(x)));
					},
					handlePossibleChange() {},
					handleChange() {
						D = !0;
					}
				};
				R.addObserver(V), R.reportChanges();
				const Y = { dispose() {
					R.removeObserver(V);
				} };
				return C instanceof It ? C.add(Y) : Array.isArray(C) && C.push(Y), Y;
			};
		}
		e.fromObservableLight = ce;
	})(it || (it = {}));
	var hs = class w1 {
		static {
			this.all = /* @__PURE__ */ new Set();
		}
		static {
			this._idPool = 0;
		}
		constructor(t) {
			this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${w1._idPool++}`, w1.all.add(this);
		}
		start(t) {
			this._stopWatch = new x1(), this.listenerCount = t;
		}
		stop() {
			if (this._stopWatch) {
				const t = this._stopWatch.elapsed();
				this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
			}
		}
	};
	let ms = -1;
	var fs = class Or {
		static {
			this._idPool = 1;
		}
		constructor(t, n, r = (Or._idPool++).toString(16).padStart(3, "0")) {
			this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
		}
		dispose() {
			this._stacks?.clear();
		}
		check(t, n) {
			const r = this.threshold;
			if (r <= 0 || n < r) return;
			this._stacks || (this._stacks = /* @__PURE__ */ new Map());
			const s = this._stacks.get(t.value) || 0;
			if (this._stacks.set(t.value, s + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
				this._warnCountdown = r * .5;
				const [i, o] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${o}):`;
				console.warn(l), console.warn(i);
				const u = new gs(l, i);
				this._errorHandler(u);
			}
			return () => {
				const i = this._stacks.get(t.value) || 0;
				this._stacks.set(t.value, i - 1);
			};
		}
		getMostFrequentStack() {
			if (!this._stacks) return;
			let t, n = 0;
			for (const [r, s] of this._stacks) (!t || n < s) && (t = [r, s], n = s);
			return t;
		}
	}, ds = class jr {
		static create() {
			return new jr((/* @__PURE__ */ new Error()).stack ?? "");
		}
		constructor(t) {
			this.value = t;
		}
		print() {
			console.warn(this.value.split(`
`).slice(2).join(`
`));
		}
	}, gs = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerLeakError", this.stack = t;
		}
	}, ps = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerRefusalError", this.stack = t;
		}
	}, Vt = class {
		constructor(e) {
			this.value = e;
		}
	};
	const bs = 2;
	var se = class {
		constructor(e) {
			this._size = 0, this._options = e, this._leakageMon = this._options?.leakWarningThreshold ? new fs(e?.onListenerError ?? $e, this._options?.leakWarningThreshold ?? ms) : void 0, this._perfMon = this._options?._profName ? new hs(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
		}
		dispose() {
			this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
		}
		get event() {
			return this._event ??= (e, t, n) => {
				if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
					const o = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
					console.warn(o);
					const l = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], u = new ps(`${o}. HINT: Stack shows most frequent listener (${l[1]}-times)`, l[0]);
					return (this._options?.onListenerError || $e)(u), st.None;
				}
				if (this._disposed) return st.None;
				t && (e = e.bind(t));
				const r = new Vt(e);
				let s;
				this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = ds.create(), s = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Vt ? (this._deliveryQueue ??= new ys(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
				const i = rt(() => {
					s?.(), this._removeListener(r);
				});
				return n instanceof It ? n.add(i) : Array.isArray(n) && n.push(i), i;
			}, this._event;
		}
		_removeListener(e) {
			if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
			if (this._size === 1) {
				this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
				return;
			}
			const t = this._listeners, n = t.indexOf(e);
			if (n === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), /* @__PURE__ */ new Error("Attempted to dispose unknown listener");
			this._size--, t[n] = void 0;
			const r = this._deliveryQueue.current === this;
			if (this._size * bs <= t.length) {
				let s = 0;
				for (let i = 0; i < t.length; i++) t[i] ? t[s++] = t[i] : r && (this._deliveryQueue.end--, s < this._deliveryQueue.i && this._deliveryQueue.i--);
				t.length = s;
			}
		}
		_deliver(e, t) {
			if (!e) return;
			const n = this._options?.onListenerError || $e;
			if (!n) {
				e.value(t);
				return;
			}
			try {
				e.value(t);
			} catch (r) {
				n(r);
			}
		}
		_deliverQueue(e) {
			const t = e.current._listeners;
			for (; e.i < e.end;) this._deliver(t[e.i++], e.value);
			e.reset();
		}
		fire(e) {
			if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Vt) this._deliver(this._listeners, e);
			else {
				const t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
			this._perfMon?.stop();
		}
		hasListeners() {
			return this._size > 0;
		}
	}, ys = class {
		constructor() {
			this.i = -1, this.end = 0;
		}
		enqueue(e, t, n) {
			this.i = 0, this.end = n, this.current = e, this.value = t;
		}
		reset() {
			this.i = this.end, this.current = void 0, this.value = void 0;
		}
	};
	function _s() {
		return globalThis._VSCODE_NLS_MESSAGES;
	}
	function M1() {
		return globalThis._VSCODE_NLS_LANGUAGE;
	}
	const vs = M1() === "pseudo" || typeof document < "u" && document.location && document.location.hash.indexOf("pseudo=true") >= 0;
	function k1(e, t) {
		let n;
		return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, s) => {
			const i = t[s[0]];
			let o = r;
			return typeof i == "string" ? o = i : (typeof i == "number" || typeof i == "boolean" || i === void 0 || i === null) && (o = String(i)), o;
		}), vs && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
	}
	function q(e, t, ...n) {
		return k1(typeof e == "number" ? ws(e, t) : t, n);
	}
	function ws(e, t) {
		const n = _s()?.[e];
		if (typeof n != "string") {
			if (typeof t == "string") return t;
			throw new Error(`!!! NLS MISSING: ${e} !!!`);
		}
		return n;
	}
	let Bt = !1, qt = !1, Ut = !1, P1 = !1, Ht = !1, me;
	const fe = globalThis;
	let ne;
	typeof fe.vscode < "u" && typeof fe.vscode.process < "u" ? ne = fe.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (ne = process);
	const Ss = typeof ne?.versions?.electron == "string" && ne?.type === "renderer";
	if (typeof ne == "object") {
		Bt = ne.platform === "win32", qt = ne.platform === "darwin", Ut = ne.platform === "linux", Ut && ne.env.SNAP && ne.env.SNAP_REVISION, ne.env.CI || ne.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
		const e = ne.env.VSCODE_NLS_CONFIG;
		if (e) try {
			const t = JSON.parse(e);
			t.userLocale, t.osLocale, t.resolvedLanguage, t.languagePack?.translationsConfigFile;
		} catch {}
		P1 = !0;
	} else typeof navigator == "object" && !Ss ? (me = navigator.userAgent, Bt = me.indexOf("Windows") >= 0, qt = me.indexOf("Macintosh") >= 0, (me.indexOf("Macintosh") >= 0 || me.indexOf("iPad") >= 0 || me.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, Ut = me.indexOf("Linux") >= 0, me?.indexOf("Mobi"), Ht = !0, M1(), navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
	const ze = Bt, Cs = qt, Rs = P1, As = Ht, Es = Ht && typeof fe.importScripts == "function" ? fe.origin : void 0, le = me, xs = typeof fe.postMessage == "function" && !fe.importScripts;
	(() => {
		if (xs) {
			const e = [];
			fe.addEventListener("message", (n) => {
				if (n.data && n.data.vscodeScheduleAsyncWork) for (let r = 0, s = e.length; r < s; r++) {
					const i = e[r];
					if (i.id === n.data.vscodeScheduleAsyncWork) {
						e.splice(r, 1), i.callback();
						return;
					}
				}
			});
			let t = 0;
			return (n) => {
				const r = ++t;
				e.push({
					id: r,
					callback: n
				}), fe.postMessage({ vscodeScheduleAsyncWork: r }, "*");
			};
		}
		return (e) => setTimeout(e);
	})();
	const ks = !!(le && le.indexOf("Chrome") >= 0);
	le && le.indexOf("Firefox");
	!ks && le && le.indexOf("Safari");
	le && le.indexOf("Edg/");
	le && le.indexOf("Android");
	function Ps(e) {
		return e;
	}
	var Ds = class {
		constructor(e, t) {
			this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = Ps) : (this._fn = t, this._computeKey = e.getCacheKey);
		}
		get(e) {
			const t = this._computeKey(e);
			return this.lastArgKey !== t && (this.lastArgKey = t, this.lastCache = this._fn(e)), this.lastCache;
		}
	}, D1 = class {
		constructor(e) {
			this.executor = e, this._didRun = !1;
		}
		get value() {
			if (!this._didRun) try {
				this._value = this.executor();
			} catch (e) {
				this._error = e;
			} finally {
				this._didRun = !0;
			}
			if (this._error) throw this._error;
			return this._value;
		}
		get rawValue() {
			return this._value;
		}
	};
	function Fs(e) {
		return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
	}
	function Ts(e) {
		return e.split(/\r\n|\r|\n/);
	}
	function Is(e) {
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r !== 32 && r !== 9) return t;
		}
		return -1;
	}
	function Vs(e, t = e.length - 1) {
		for (let n = t; n >= 0; n--) {
			const r = e.charCodeAt(n);
			if (r !== 32 && r !== 9) return n;
		}
		return -1;
	}
	function F1(e) {
		return e >= 65 && e <= 90;
	}
	function at(e) {
		return 55296 <= e && e <= 56319;
	}
	function Wt(e) {
		return 56320 <= e && e <= 57343;
	}
	function T1(e, t) {
		return (e - 55296 << 10) + (t - 56320) + 65536;
	}
	function Bs(e, t, n) {
		const r = e.charCodeAt(n);
		if (at(r) && n + 1 < t) {
			const s = e.charCodeAt(n + 1);
			if (Wt(s)) return T1(r, s);
		}
		return r;
	}
	const qs = /^[\t\n\r\x20-\x7E]*$/;
	function Us(e) {
		return qs.test(e);
	}
	(class Ze {
		static {
			this._INSTANCE = null;
		}
		static getInstance() {
			return Ze._INSTANCE || (Ze._INSTANCE = new Ze()), Ze._INSTANCE;
		}
		constructor() {
			this._data = Hs();
		}
		getGraphemeBreakType(t) {
			if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4;
			if (t < 127) return 0;
			const n = this._data, r = n.length / 3;
			let s = 1;
			for (; s <= r;) if (t < n[3 * s]) s = 2 * s;
			else if (t > n[3 * s + 1]) s = 2 * s + 1;
			else return n[3 * s + 2];
			return 0;
		}
	});
	function Hs() {
		return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]");
	}
	var zt = class Ke {
		static {
			this.ambiguousCharacterData = new D1(() => JSON.parse("{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"cs\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"es\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"fr\":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ja\":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],\"ko\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pt-BR\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ru\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"zh-hans\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],\"zh-hant\":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}"));
		}
		static {
			this.cache = new Ds({ getCacheKey: JSON.stringify }, (t) => {
				function n(u) {
					const c = /* @__PURE__ */ new Map();
					for (let m = 0; m < u.length; m += 2) c.set(u[m], u[m + 1]);
					return c;
				}
				function r(u, c) {
					const m = new Map(u);
					for (const [h, d] of c) m.set(h, d);
					return m;
				}
				function s(u, c) {
					if (!u) return c;
					const m = /* @__PURE__ */ new Map();
					for (const [h, d] of u) c.has(h) && m.set(h, d);
					return m;
				}
				const i = this.ambiguousCharacterData.value;
				let o = t.filter((u) => !u.startsWith("_") && u in i);
				o.length === 0 && (o = ["_default"]);
				let l;
				for (const u of o) {
					const c = n(i[u]);
					l = s(l, c);
				}
				return new Ke(r(n(i._common), l));
			});
		}
		static getInstance(t) {
			return Ke.cache.get(Array.from(t));
		}
		static {
			this._locales = new D1(() => Object.keys(Ke.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
		}
		static getLocales() {
			return Ke._locales.value;
		}
		constructor(t) {
			this.confusableDictionary = t;
		}
		isAmbiguous(t) {
			return this.confusableDictionary.has(t);
		}
		getPrimaryConfusable(t) {
			return this.confusableDictionary.get(t);
		}
		getConfusableCodePoints() {
			return new Set(this.confusableDictionary.keys());
		}
	}, Ot = class Rt {
		static getRawData() {
			return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
		}
		static {
			this._data = void 0;
		}
		static getData() {
			return this._data || (this._data = new Set(Rt.getRawData())), this._data;
		}
		static isInvisibleCharacter(t) {
			return Rt.getData().has(t);
		}
		static get codePoints() {
			return Rt.getData();
		}
	};
	let Ee;
	const jt = globalThis.vscode;
	if (typeof jt < "u" && typeof jt.process < "u") {
		const e = jt.process;
		Ee = {
			get platform() {
				return e.platform;
			},
			get arch() {
				return e.arch;
			},
			get env() {
				return e.env;
			},
			cwd() {
				return e.cwd();
			}
		};
	} else typeof process < "u" && typeof process?.versions?.node == "string" ? Ee = {
		get platform() {
			return process.platform;
		},
		get arch() {
			return process.arch;
		},
		get env() {
			return { IS_DEV_ENV: "false" };
		},
		cwd() {
			return { IS_DEV_ENV: "false" }.VSCODE_CWD || process.cwd();
		}
	} : Ee = {
		get platform() {
			return ze ? "win32" : Cs ? "darwin" : "linux";
		},
		get arch() {},
		get env() {
			return {};
		},
		cwd() {
			return "/";
		}
	};
	const ot = Ee.cwd, $s = Ee.env, Ws = Ee.platform, zs = 65, Os = 97, js = 90, Gs = 122, ye = 46, X = 47, ee = 92, _e = 58, Xs = 63;
	var I1 = class extends Error {
		constructor(e, t, n) {
			let r;
			typeof t == "string" && t.indexOf("not ") === 0 ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			let s = `The "${e}" ${e.indexOf(".") !== -1 ? "property" : "argument"} ${r} of type ${t}`;
			s += `. Received type ${typeof n}`, super(s), this.code = "ERR_INVALID_ARG_TYPE";
		}
	};
	function Ys(e, t) {
		if (e === null || typeof e != "object") throw new I1(t, "Object", e);
	}
	function W(e, t) {
		if (typeof e != "string") throw new I1(t, "string", e);
	}
	const de = Ws === "win32";
	function P(e) {
		return e === X || e === ee;
	}
	function Gt(e) {
		return e === X;
	}
	function ve(e) {
		return e >= zs && e <= js || e >= Os && e <= Gs;
	}
	function lt(e, t, n, r) {
		let s = "", i = 0, o = -1, l = 0, u = 0;
		for (let c = 0; c <= e.length; ++c) {
			if (c < e.length) u = e.charCodeAt(c);
			else {
				if (r(u)) break;
				u = X;
			}
			if (r(u)) {
				if (!(o === c - 1 || l === 1)) if (l === 2) {
					if (s.length < 2 || i !== 2 || s.charCodeAt(s.length - 1) !== ye || s.charCodeAt(s.length - 2) !== ye) {
						if (s.length > 2) {
							const m = s.lastIndexOf(n);
							m === -1 ? (s = "", i = 0) : (s = s.slice(0, m), i = s.length - 1 - s.lastIndexOf(n)), o = c, l = 0;
							continue;
						} else if (s.length !== 0) {
							s = "", i = 0, o = c, l = 0;
							continue;
						}
					}
					t && (s += s.length > 0 ? `${n}..` : "..", i = 2);
				} else s.length > 0 ? s += `${n}${e.slice(o + 1, c)}` : s = e.slice(o + 1, c), i = c - o - 1;
				o = c, l = 0;
			} else u === ye && l !== -1 ? ++l : l = -1;
		}
		return s;
	}
	function Qs(e) {
		return e ? `${e[0] === "." ? "" : "."}${e}` : "";
	}
	function V1(e, t) {
		Ys(t, "pathObject");
		const n = t.dir || t.root, r = t.base || `${t.name || ""}${Qs(t.ext)}`;
		return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
	}
	const J = {
		resolve(...e) {
			let t = "", n = "", r = !1;
			for (let s = e.length - 1; s >= -1; s--) {
				let i;
				if (s >= 0) {
					if (i = e[s], W(i, `paths[${s}]`), i.length === 0) continue;
				} else t.length === 0 ? i = ot() : (i = $s[`=${t}`] || ot(), (i === void 0 || i.slice(0, 2).toLowerCase() !== t.toLowerCase() && i.charCodeAt(2) === ee) && (i = `${t}\\`));
				const o = i.length;
				let l = 0, u = "", c = !1;
				const m = i.charCodeAt(0);
				if (o === 1) P(m) && (l = 1, c = !0);
				else if (P(m)) if (c = !0, P(i.charCodeAt(1))) {
					let h = 2, d = h;
					for (; h < o && !P(i.charCodeAt(h));) h++;
					if (h < o && h !== d) {
						const f = i.slice(d, h);
						for (d = h; h < o && P(i.charCodeAt(h));) h++;
						if (h < o && h !== d) {
							for (d = h; h < o && !P(i.charCodeAt(h));) h++;
							(h === o || h !== d) && (u = `\\\\${f}\\${i.slice(d, h)}`, l = h);
						}
					}
				} else l = 1;
				else ve(m) && i.charCodeAt(1) === _e && (u = i.slice(0, 2), l = 2, o > 2 && P(i.charCodeAt(2)) && (c = !0, l = 3));
				if (u.length > 0) if (t.length > 0) {
					if (u.toLowerCase() !== t.toLowerCase()) continue;
				} else t = u;
				if (r) {
					if (t.length > 0) break;
				} else if (n = `${i.slice(l)}\\${n}`, r = c, c && t.length > 0) break;
			}
			return n = lt(n, !r, "\\", P), r ? `${t}\\${n}` : `${t}${n}` || ".";
		},
		normalize(e) {
			W(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = 0, r, s = !1;
			const i = e.charCodeAt(0);
			if (t === 1) return Gt(i) ? "\\" : e;
			if (P(i)) if (s = !0, P(e.charCodeAt(1))) {
				let l = 2, u = l;
				for (; l < t && !P(e.charCodeAt(l));) l++;
				if (l < t && l !== u) {
					const c = e.slice(u, l);
					for (u = l; l < t && P(e.charCodeAt(l));) l++;
					if (l < t && l !== u) {
						for (u = l; l < t && !P(e.charCodeAt(l));) l++;
						if (l === t) return `\\\\${c}\\${e.slice(u)}\\`;
						l !== u && (r = `\\\\${c}\\${e.slice(u, l)}`, n = l);
					}
				}
			} else n = 1;
			else ve(i) && e.charCodeAt(1) === _e && (r = e.slice(0, 2), n = 2, t > 2 && P(e.charCodeAt(2)) && (s = !0, n = 3));
			let o = n < t ? lt(e.slice(n), !s, "\\", P) : "";
			return o.length === 0 && !s && (o = "."), o.length > 0 && P(e.charCodeAt(t - 1)) && (o += "\\"), r === void 0 ? s ? `\\${o}` : o : s ? `${r}\\${o}` : `${r}${o}`;
		},
		isAbsolute(e) {
			W(e, "path");
			const t = e.length;
			if (t === 0) return !1;
			const n = e.charCodeAt(0);
			return P(n) || t > 2 && ve(n) && e.charCodeAt(1) === _e && P(e.charCodeAt(2));
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t, n;
			for (let i = 0; i < e.length; ++i) {
				const o = e[i];
				W(o, "path"), o.length > 0 && (t === void 0 ? t = n = o : t += `\\${o}`);
			}
			if (t === void 0) return ".";
			let r = !0, s = 0;
			if (typeof n == "string" && P(n.charCodeAt(0))) {
				++s;
				const i = n.length;
				i > 1 && P(n.charCodeAt(1)) && (++s, i > 2 && (P(n.charCodeAt(2)) ? ++s : r = !1));
			}
			if (r) {
				for (; s < t.length && P(t.charCodeAt(s));) s++;
				s >= 2 && (t = `\\${t.slice(s)}`);
			}
			return J.normalize(t);
		},
		relative(e, t) {
			if (W(e, "from"), W(t, "to"), e === t) return "";
			const n = J.resolve(e), r = J.resolve(t);
			if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t)) return "";
			let s = 0;
			for (; s < e.length && e.charCodeAt(s) === ee;) s++;
			let i = e.length;
			for (; i - 1 > s && e.charCodeAt(i - 1) === ee;) i--;
			const o = i - s;
			let l = 0;
			for (; l < t.length && t.charCodeAt(l) === ee;) l++;
			let u = t.length;
			for (; u - 1 > l && t.charCodeAt(u - 1) === ee;) u--;
			const c = u - l, m = o < c ? o : c;
			let h = -1, d = 0;
			for (; d < m; d++) {
				const g = e.charCodeAt(s + d);
				if (g !== t.charCodeAt(l + d)) break;
				g === ee && (h = d);
			}
			if (d !== m) {
				if (h === -1) return r;
			} else {
				if (c > m) {
					if (t.charCodeAt(l + d) === ee) return r.slice(l + d + 1);
					if (d === 2) return r.slice(l + d);
				}
				o > m && (e.charCodeAt(s + d) === ee ? h = d : d === 2 && (h = 3)), h === -1 && (h = 0);
			}
			let f = "";
			for (d = s + h + 1; d <= i; ++d) (d === i || e.charCodeAt(d) === ee) && (f += f.length === 0 ? ".." : "\\..");
			return l += h, f.length > 0 ? `${f}${r.slice(l, u)}` : (r.charCodeAt(l) === ee && ++l, r.slice(l, u));
		},
		toNamespacedPath(e) {
			if (typeof e != "string" || e.length === 0) return e;
			const t = J.resolve(e);
			if (t.length <= 2) return e;
			if (t.charCodeAt(0) === ee) {
				if (t.charCodeAt(1) === ee) {
					const n = t.charCodeAt(2);
					if (n !== Xs && n !== ye) return `\\\\?\\UNC\\${t.slice(2)}`;
				}
			} else if (ve(t.charCodeAt(0)) && t.charCodeAt(1) === _e && t.charCodeAt(2) === ee) return `\\\\?\\${t}`;
			return e;
		},
		dirname(e) {
			W(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = -1, r = 0;
			const s = e.charCodeAt(0);
			if (t === 1) return P(s) ? e : ".";
			if (P(s)) {
				if (n = r = 1, P(e.charCodeAt(1))) {
					let l = 2, u = l;
					for (; l < t && !P(e.charCodeAt(l));) l++;
					if (l < t && l !== u) {
						for (u = l; l < t && P(e.charCodeAt(l));) l++;
						if (l < t && l !== u) {
							for (u = l; l < t && !P(e.charCodeAt(l));) l++;
							if (l === t) return e;
							l !== u && (n = r = l + 1);
						}
					}
				}
			} else ve(s) && e.charCodeAt(1) === _e && (n = t > 2 && P(e.charCodeAt(2)) ? 3 : 2, r = n);
			let i = -1, o = !0;
			for (let l = t - 1; l >= r; --l) if (P(e.charCodeAt(l))) {
				if (!o) {
					i = l;
					break;
				}
			} else o = !1;
			if (i === -1) {
				if (n === -1) return ".";
				i = n;
			}
			return e.slice(0, i);
		},
		basename(e, t) {
			t !== void 0 && W(t, "suffix"), W(e, "path");
			let n = 0, r = -1, s = !0, i;
			if (e.length >= 2 && ve(e.charCodeAt(0)) && e.charCodeAt(1) === _e && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (i = e.length - 1; i >= n; --i) {
					const u = e.charCodeAt(i);
					if (P(u)) {
						if (!s) {
							n = i + 1;
							break;
						}
					} else l === -1 && (s = !1, l = i + 1), o >= 0 && (u === t.charCodeAt(o) ? --o === -1 && (r = i) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (i = e.length - 1; i >= n; --i) if (P(e.charCodeAt(i))) {
				if (!s) {
					n = i + 1;
					break;
				}
			} else r === -1 && (s = !1, r = i + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			W(e, "path");
			let t = 0, n = -1, r = 0, s = -1, i = !0, o = 0;
			e.length >= 2 && e.charCodeAt(1) === _e && ve(e.charCodeAt(0)) && (t = r = 2);
			for (let l = e.length - 1; l >= t; --l) {
				const u = e.charCodeAt(l);
				if (P(u)) {
					if (!i) {
						r = l + 1;
						break;
					}
					continue;
				}
				s === -1 && (i = !1, s = l + 1), u === ye ? n === -1 ? n = l : o !== 1 && (o = 1) : n !== -1 && (o = -1);
			}
			return n === -1 || s === -1 || o === 0 || o === 1 && n === s - 1 && n === r + 1 ? "" : e.slice(n, s);
		},
		format: V1.bind(null, "\\"),
		parse(e) {
			W(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.length;
			let r = 0, s = e.charCodeAt(0);
			if (n === 1) return P(s) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
			if (P(s)) {
				if (r = 1, P(e.charCodeAt(1))) {
					let h = 2, d = h;
					for (; h < n && !P(e.charCodeAt(h));) h++;
					if (h < n && h !== d) {
						for (d = h; h < n && P(e.charCodeAt(h));) h++;
						if (h < n && h !== d) {
							for (d = h; h < n && !P(e.charCodeAt(h));) h++;
							h === n ? r = h : h !== d && (r = h + 1);
						}
					}
				}
			} else if (ve(s) && e.charCodeAt(1) === _e) {
				if (n <= 2) return t.root = t.dir = e, t;
				if (r = 2, P(e.charCodeAt(2))) {
					if (n === 3) return t.root = t.dir = e, t;
					r = 3;
				}
			}
			r > 0 && (t.root = e.slice(0, r));
			let i = -1, o = r, l = -1, u = !0, c = e.length - 1, m = 0;
			for (; c >= r; --c) {
				if (s = e.charCodeAt(c), P(s)) {
					if (!u) {
						o = c + 1;
						break;
					}
					continue;
				}
				l === -1 && (u = !1, l = c + 1), s === ye ? i === -1 ? i = c : m !== 1 && (m = 1) : i !== -1 && (m = -1);
			}
			return l !== -1 && (i === -1 || m === 0 || m === 1 && i === l - 1 && i === o + 1 ? t.base = t.name = e.slice(o, l) : (t.name = e.slice(o, i), t.base = e.slice(o, l), t.ext = e.slice(i, l))), o > 0 && o !== r ? t.dir = e.slice(0, o - 1) : t.dir = t.root, t;
		},
		sep: "\\",
		delimiter: ";",
		win32: null,
		posix: null
	}, Js = (() => {
		if (de) {
			const e = /\\/g;
			return () => {
				const t = ot().replace(e, "/");
				return t.slice(t.indexOf("/"));
			};
		}
		return () => ot();
	})(), Z = {
		resolve(...e) {
			let t = "", n = !1;
			for (let r = e.length - 1; r >= -1 && !n; r--) {
				const s = r >= 0 ? e[r] : Js();
				W(s, `paths[${r}]`), s.length !== 0 && (t = `${s}/${t}`, n = s.charCodeAt(0) === X);
			}
			return t = lt(t, !n, "/", Gt), n ? `/${t}` : t.length > 0 ? t : ".";
		},
		normalize(e) {
			if (W(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === X, n = e.charCodeAt(e.length - 1) === X;
			return e = lt(e, !t, "/", Gt), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
		},
		isAbsolute(e) {
			return W(e, "path"), e.length > 0 && e.charCodeAt(0) === X;
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t;
			for (let n = 0; n < e.length; ++n) {
				const r = e[n];
				W(r, "path"), r.length > 0 && (t === void 0 ? t = r : t += `/${r}`);
			}
			return t === void 0 ? "." : Z.normalize(t);
		},
		relative(e, t) {
			if (W(e, "from"), W(t, "to"), e === t || (e = Z.resolve(e), t = Z.resolve(t), e === t)) return "";
			const n = 1, r = e.length, s = r - n, i = 1, o = t.length - i, l = s < o ? s : o;
			let u = -1, c = 0;
			for (; c < l; c++) {
				const h = e.charCodeAt(n + c);
				if (h !== t.charCodeAt(i + c)) break;
				h === X && (u = c);
			}
			if (c === l) if (o > l) {
				if (t.charCodeAt(i + c) === X) return t.slice(i + c + 1);
				if (c === 0) return t.slice(i + c);
			} else s > l && (e.charCodeAt(n + c) === X ? u = c : c === 0 && (u = 0));
			let m = "";
			for (c = n + u + 1; c <= r; ++c) (c === r || e.charCodeAt(c) === X) && (m += m.length === 0 ? ".." : "/..");
			return `${m}${t.slice(i + u)}`;
		},
		toNamespacedPath(e) {
			return e;
		},
		dirname(e) {
			if (W(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === X;
			let n = -1, r = !0;
			for (let s = e.length - 1; s >= 1; --s) if (e.charCodeAt(s) === X) {
				if (!r) {
					n = s;
					break;
				}
			} else r = !1;
			return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
		},
		basename(e, t) {
			t !== void 0 && W(t, "ext"), W(e, "path");
			let n = 0, r = -1, s = !0, i;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (i = e.length - 1; i >= 0; --i) {
					const u = e.charCodeAt(i);
					if (u === X) {
						if (!s) {
							n = i + 1;
							break;
						}
					} else l === -1 && (s = !1, l = i + 1), o >= 0 && (u === t.charCodeAt(o) ? --o === -1 && (r = i) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (i = e.length - 1; i >= 0; --i) if (e.charCodeAt(i) === X) {
				if (!s) {
					n = i + 1;
					break;
				}
			} else r === -1 && (s = !1, r = i + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			W(e, "path");
			let t = -1, n = 0, r = -1, s = !0, i = 0;
			for (let o = e.length - 1; o >= 0; --o) {
				const l = e.charCodeAt(o);
				if (l === X) {
					if (!s) {
						n = o + 1;
						break;
					}
					continue;
				}
				r === -1 && (s = !1, r = o + 1), l === ye ? t === -1 ? t = o : i !== 1 && (i = 1) : t !== -1 && (i = -1);
			}
			return t === -1 || r === -1 || i === 0 || i === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
		},
		format: V1.bind(null, "/"),
		parse(e) {
			W(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.charCodeAt(0) === X;
			let r;
			n ? (t.root = "/", r = 1) : r = 0;
			let s = -1, i = 0, o = -1, l = !0, u = e.length - 1, c = 0;
			for (; u >= r; --u) {
				const m = e.charCodeAt(u);
				if (m === X) {
					if (!l) {
						i = u + 1;
						break;
					}
					continue;
				}
				o === -1 && (l = !1, o = u + 1), m === ye ? s === -1 ? s = u : c !== 1 && (c = 1) : s !== -1 && (c = -1);
			}
			if (o !== -1) {
				const m = i === 0 && n ? 1 : i;
				s === -1 || c === 0 || c === 1 && s === o - 1 && s === i + 1 ? t.base = t.name = e.slice(m, o) : (t.name = e.slice(m, s), t.base = e.slice(m, o), t.ext = e.slice(s, o));
			}
			return i > 0 ? t.dir = e.slice(0, i - 1) : n && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	Z.win32 = J.win32 = J, Z.posix = J.posix = Z;
	de ? J.normalize : Z.normalize;
	const Zs = de ? J.join : Z.join;
	de ? J.resolve : Z.resolve;
	de ? J.relative : Z.relative;
	de ? J.dirname : Z.dirname;
	de ? J.basename : Z.basename;
	de ? J.extname : Z.extname;
	de ? J.sep : Z.sep;
	const Ks = /^\w[\w\d+.-]*$/, ei = /^\//, ti = /^\/\//;
	function ni(e, t) {
		if (!e.scheme && t) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !Ks.test(e.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (e.path) {
			if (e.authority) {
				if (!ei.test(e.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (ti.test(e.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	function ri(e, t) {
		return !e && !t ? "file" : e;
	}
	function si(e, t) {
		switch (e) {
			case "https":
			case "http":
			case "file":
				t ? t[0] !== oe && (t = oe + t) : t = oe;
				break;
		}
		return t;
	}
	const B = "", oe = "/", ii = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	var ue = class At {
		static isUri(t) {
			return t instanceof At ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
		}
		constructor(t, n, r, s, i, o = !1) {
			typeof t == "object" ? (this.scheme = t.scheme || B, this.authority = t.authority || B, this.path = t.path || B, this.query = t.query || B, this.fragment = t.fragment || B) : (this.scheme = ri(t, o), this.authority = n || B, this.path = si(this.scheme, r || B), this.query = s || B, this.fragment = i || B, ni(this, o));
		}
		get fsPath() {
			return Xt(this, !1);
		}
		with(t) {
			if (!t) return this;
			let { scheme: n, authority: r, path: s, query: i, fragment: o } = t;
			return n === void 0 ? n = this.scheme : n === null && (n = B), r === void 0 ? r = this.authority : r === null && (r = B), s === void 0 ? s = this.path : s === null && (s = B), i === void 0 ? i = this.query : i === null && (i = B), o === void 0 ? o = this.fragment : o === null && (o = B), n === this.scheme && r === this.authority && s === this.path && i === this.query && o === this.fragment ? this : new xe(n, r, s, i, o);
		}
		static parse(t, n = !1) {
			const r = ii.exec(t);
			return r ? new xe(r[2] || B, ut(r[4] || B), ut(r[5] || B), ut(r[7] || B), ut(r[9] || B), n) : new xe(B, B, B, B, B);
		}
		static file(t) {
			let n = B;
			if (ze && (t = t.replace(/\\/g, oe)), t[0] === oe && t[1] === oe) {
				const r = t.indexOf(oe, 2);
				r === -1 ? (n = t.substring(2), t = oe) : (n = t.substring(2, r), t = t.substring(r) || oe);
			}
			return new xe("file", n, t, B, B);
		}
		static from(t, n) {
			return new xe(t.scheme, t.authority, t.path, t.query, t.fragment, n);
		}
		static joinPath(t, ...n) {
			if (!t.path) throw new Error("[UriError]: cannot call joinPath on URI without path");
			let r;
			return ze && t.scheme === "file" ? r = At.file(J.join(Xt(t, !0), ...n)).path : r = Z.join(t.path, ...n), t.with({ path: r });
		}
		toString(t = !1) {
			return Yt(this, t);
		}
		toJSON() {
			return this;
		}
		static revive(t) {
			if (t) {
				if (t instanceof At) return t;
				{
					const n = new xe(t);
					return n._formatted = t.external ?? null, n._fsPath = t._sep === B1 ? t.fsPath ?? null : null, n;
				}
			} else return t;
		}
	};
	const B1 = ze ? 1 : void 0;
	var xe = class extends ue {
		constructor() {
			super(...arguments), this._formatted = null, this._fsPath = null;
		}
		get fsPath() {
			return this._fsPath || (this._fsPath = Xt(this, !1)), this._fsPath;
		}
		toString(e = !1) {
			return e ? Yt(this, !0) : (this._formatted || (this._formatted = Yt(this, !1)), this._formatted);
		}
		toJSON() {
			const e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = B1), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	};
	const q1 = {
		58: "%3A",
		47: "%2F",
		63: "%3F",
		35: "%23",
		91: "%5B",
		93: "%5D",
		64: "%40",
		33: "%21",
		36: "%24",
		38: "%26",
		39: "%27",
		40: "%28",
		41: "%29",
		42: "%2A",
		43: "%2B",
		44: "%2C",
		59: "%3B",
		61: "%3D",
		32: "%20"
	};
	function U1(e, t, n) {
		let r, s = -1;
		for (let i = 0; i < e.length; i++) {
			const o = e.charCodeAt(i);
			if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || t && o === 47 || n && o === 91 || n && o === 93 || n && o === 58) s !== -1 && (r += encodeURIComponent(e.substring(s, i)), s = -1), r !== void 0 && (r += e.charAt(i));
			else {
				r === void 0 && (r = e.substr(0, i));
				const l = q1[o];
				l !== void 0 ? (s !== -1 && (r += encodeURIComponent(e.substring(s, i)), s = -1), r += l) : s === -1 && (s = i);
			}
		}
		return s !== -1 && (r += encodeURIComponent(e.substring(s))), r !== void 0 ? r : e;
	}
	function ai(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			const r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += q1[r]) : t !== void 0 && (t += e[n]);
		}
		return t !== void 0 ? t : e;
	}
	function Xt(e, t) {
		let n;
		return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, ze && (n = n.replace(/\//g, "\\")), n;
	}
	function Yt(e, t) {
		const n = t ? ai : U1;
		let r = "", { scheme: s, authority: i, path: o, query: l, fragment: u } = e;
		if (s && (r += s, r += ":"), (i || s === "file") && (r += oe, r += oe), i) {
			let c = i.indexOf("@");
			if (c !== -1) {
				const m = i.substr(0, c);
				i = i.substr(c + 1), c = m.lastIndexOf(":"), c === -1 ? r += n(m, !1, !1) : (r += n(m.substr(0, c), !1, !1), r += ":", r += n(m.substr(c + 1), !1, !0)), r += "@";
			}
			i = i.toLowerCase(), c = i.lastIndexOf(":"), c === -1 ? r += n(i, !1, !0) : (r += n(i.substr(0, c), !1, !0), r += i.substr(c));
		}
		if (o) {
			if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
				const c = o.charCodeAt(1);
				c >= 65 && c <= 90 && (o = `/${String.fromCharCode(c + 32)}:${o.substr(3)}`);
			} else if (o.length >= 2 && o.charCodeAt(1) === 58) {
				const c = o.charCodeAt(0);
				c >= 65 && c <= 90 && (o = `${String.fromCharCode(c + 32)}:${o.substr(2)}`);
			}
			r += n(o, !0, !1);
		}
		return l && (r += "?", r += n(l, !1, !1)), u && (r += "#", r += t ? u : U1(u, !1, !1)), r;
	}
	function H1(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + H1(e.substr(3)) : e;
		}
	}
	const $1 = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function ut(e) {
		return e.match($1) ? e.replace($1, (t) => H1(t)) : e;
	}
	var we;
	(function(e) {
		e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatSesssion = "vscode-chat-editor", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output";
	})(we || (we = {}));
	var oi = class {
		constructor() {
			this._hosts = Object.create(null), this._ports = Object.create(null), this._connectionTokens = Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
		}
		setPreferredWebSchema(e) {
			this._preferredWebSchema = e;
		}
		get _remoteResourcesPath() {
			return Z.join(this._serverRootPath, we.vscodeRemoteResource);
		}
		rewrite(e) {
			if (this._delegate) try {
				return this._delegate(e);
			} catch (o) {
				return $e(o), e;
			}
			const t = e.authority;
			let n = this._hosts[t];
			n && n.indexOf(":") !== -1 && n.indexOf("[") === -1 && (n = `[${n}]`);
			const r = this._ports[t], s = this._connectionTokens[t];
			let i = `path=${encodeURIComponent(e.path)}`;
			return typeof s == "string" && (i += `&tkn=${encodeURIComponent(s)}`), ue.from({
				scheme: As ? this._preferredWebSchema : we.vscodeRemoteResource,
				authority: `${n}:${r}`,
				path: this._remoteResourcesPath,
				query: i
			});
		}
	};
	const li = new oi(), ui = "vscode-app";
	const W1 = new class L1 {
		static {
			this.FALLBACK_AUTHORITY = ui;
		}
		asBrowserUri(t) {
			const n = this.toUri(t);
			return this.uriToBrowserUri(n);
		}
		uriToBrowserUri(t) {
			return t.scheme === we.vscodeRemote ? li.rewrite(t) : t.scheme === we.file && (Rs || Es === `${we.vscodeFileResource}://${L1.FALLBACK_AUTHORITY}`) ? t.with({
				scheme: we.vscodeFileResource,
				authority: t.authority || L1.FALLBACK_AUTHORITY,
				query: null,
				fragment: null
			}) : t;
		}
		toUri(t, n) {
			if (ue.isUri(t)) return t;
			if (globalThis._VSCODE_FILE_ROOT) {
				const r = globalThis._VSCODE_FILE_ROOT;
				if (/^\w[\w\d+.-]*:\/\//.test(r)) return ue.joinPath(ue.parse(r, !0), t);
				const s = Zs(r, t);
				return ue.file(s);
			}
			return ue.parse(n.toUrl(t));
		}
	}();
	var z1;
	(function(e) {
		const t = new Map([
			["1", { "Cross-Origin-Opener-Policy": "same-origin" }],
			["2", { "Cross-Origin-Embedder-Policy": "require-corp" }],
			["3", {
				"Cross-Origin-Opener-Policy": "same-origin",
				"Cross-Origin-Embedder-Policy": "require-corp"
			}]
		]);
		e.CoopAndCoep = Object.freeze(t.get("3"));
		const n = "vscode-coi";
		function r(i) {
			let o;
			typeof i == "string" ? o = new URL(i).searchParams : i instanceof URL ? o = i.searchParams : ue.isUri(i) && (o = new URL(i.toString(!0)).searchParams);
			const l = o?.get(n);
			if (l) return t.get(l);
		}
		e.getHeadersFromQuery = r;
		function s(i, o, l) {
			if (!globalThis.crossOriginIsolated) return;
			const u = o && l ? "3" : l ? "2" : "1";
			i instanceof URLSearchParams ? i.set(n, u) : i[n] = u;
		}
		e.addSearchParam = s;
	})(z1 || (z1 = {}));
	const Qt = "default", hi = "$initialize";
	var mi = class {
		constructor(e, t, n, r, s) {
			this.vsWorker = e, this.req = t, this.channel = n, this.method = r, this.args = s, this.type = 0;
		}
	}, O1 = class {
		constructor(e, t, n, r) {
			this.vsWorker = e, this.seq = t, this.res = n, this.err = r, this.type = 1;
		}
	}, fi = class {
		constructor(e, t, n, r, s) {
			this.vsWorker = e, this.req = t, this.channel = n, this.eventName = r, this.arg = s, this.type = 2;
		}
	}, di = class {
		constructor(e, t, n) {
			this.vsWorker = e, this.req = t, this.event = n, this.type = 3;
		}
	}, gi = class {
		constructor(e, t) {
			this.vsWorker = e, this.req = t, this.type = 4;
		}
	}, pi = class {
		constructor(e) {
			this._workerId = -1, this._handler = e, this._lastSentReq = 0, this._pendingReplies = Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
		}
		setWorkerId(e) {
			this._workerId = e;
		}
		sendMessage(e, t, n) {
			const r = String(++this._lastSentReq);
			return new Promise((s, i) => {
				this._pendingReplies[r] = {
					resolve: s,
					reject: i
				}, this._send(new mi(this._workerId, r, e, t, n));
			});
		}
		listen(e, t, n) {
			let r = null;
			const s = new se({
				onWillAddFirstListener: () => {
					r = String(++this._lastSentReq), this._pendingEmitters.set(r, s), this._send(new fi(this._workerId, r, e, t, n));
				},
				onDidRemoveLastListener: () => {
					this._pendingEmitters.delete(r), this._send(new gi(this._workerId, r)), r = null;
				}
			});
			return s.event;
		}
		handleMessage(e) {
			!e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
		}
		createProxyToRemoteChannel(e, t) {
			return new Proxy(Object.create(null), { get: (n, r) => (typeof r == "string" && !n[r] && (G1(r) ? n[r] = (s) => this.listen(e, r, s) : j1(r) ? n[r] = this.listen(e, r, void 0) : r.charCodeAt(0) === 36 && (n[r] = async (...s) => (await t?.(), this.sendMessage(e, r, s)))), n[r]) });
		}
		_handleMessage(e) {
			switch (e.type) {
				case 1: return this._handleReplyMessage(e);
				case 0: return this._handleRequestMessage(e);
				case 2: return this._handleSubscribeEventMessage(e);
				case 3: return this._handleEventMessage(e);
				case 4: return this._handleUnsubscribeEventMessage(e);
			}
		}
		_handleReplyMessage(e) {
			if (!this._pendingReplies[e.seq]) {
				console.warn("Got reply to unknown seq");
				return;
			}
			const t = this._pendingReplies[e.seq];
			if (delete this._pendingReplies[e.seq], e.err) {
				let n = e.err;
				e.err.$isError && (n = /* @__PURE__ */ new Error(), n.name = e.err.name, n.message = e.err.message, n.stack = e.err.stack), t.reject(n);
				return;
			}
			t.resolve(e.res);
		}
		_handleRequestMessage(e) {
			const t = e.req;
			this._handler.handleMessage(e.channel, e.method, e.args).then((n) => {
				this._send(new O1(this._workerId, t, n, void 0));
			}, (n) => {
				n.detail instanceof Error && (n.detail = A1(n.detail)), this._send(new O1(this._workerId, t, void 0, A1(n)));
			});
		}
		_handleSubscribeEventMessage(e) {
			const t = e.req, n = this._handler.handleEvent(e.channel, e.eventName, e.arg)((r) => {
				this._send(new di(this._workerId, t, r));
			});
			this._pendingEvents.set(t, n);
		}
		_handleEventMessage(e) {
			if (!this._pendingEmitters.has(e.req)) {
				console.warn("Got event for unknown req");
				return;
			}
			this._pendingEmitters.get(e.req).fire(e.event);
		}
		_handleUnsubscribeEventMessage(e) {
			if (!this._pendingEvents.has(e.req)) {
				console.warn("Got unsubscribe for unknown req");
				return;
			}
			this._pendingEvents.get(e.req).dispose(), this._pendingEvents.delete(e.req);
		}
		_send(e) {
			const t = [];
			if (e.type === 0) for (let n = 0; n < e.args.length; n++) e.args[n] instanceof ArrayBuffer && t.push(e.args[n]);
			else e.type === 1 && e.res instanceof ArrayBuffer && t.push(e.res);
			this._handler.sendMessage(e, t);
		}
	};
	function j1(e) {
		return e[0] === "o" && e[1] === "n" && F1(e.charCodeAt(2));
	}
	function G1(e) {
		return /^onDynamic/.test(e) && F1(e.charCodeAt(9));
	}
	var bi = class {
		constructor(e, t) {
			this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = t, this._requestHandler = null, this._protocol = new pi({
				sendMessage: (n, r) => {
					e(n, r);
				},
				handleMessage: (n, r, s) => this._handleMessage(n, r, s),
				handleEvent: (n, r, s) => this._handleEvent(n, r, s)
			});
		}
		onmessage(e) {
			this._protocol.handleMessage(e);
		}
		_handleMessage(e, t, n) {
			if (e === Qt && t === hi) return this.initialize(n[0], n[1], n[2]);
			const r = e === Qt ? this._requestHandler : this._localChannels.get(e);
			if (!r) return Promise.reject(/* @__PURE__ */ new Error(`Missing channel ${e} on worker thread`));
			if (typeof r[t] != "function") return Promise.reject(/* @__PURE__ */ new Error(`Missing method ${t} on worker thread channel ${e}`));
			try {
				return Promise.resolve(r[t].apply(r, n));
			} catch (s) {
				return Promise.reject(s);
			}
		}
		_handleEvent(e, t, n) {
			const r = e === Qt ? this._requestHandler : this._localChannels.get(e);
			if (!r) throw new Error(`Missing channel ${e} on worker thread`);
			if (G1(t)) {
				const s = r[t].call(r, n);
				if (typeof s != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				return s;
			}
			if (j1(t)) {
				const s = r[t];
				if (typeof s != "function") throw new Error(`Missing event ${t} on request handler.`);
				return s;
			}
			throw new Error(`Malformed event name ${t}`);
		}
		getChannel(e) {
			if (!this._remoteChannels.has(e)) {
				const t = this._protocol.createProxyToRemoteChannel(e);
				this._remoteChannels.set(e, t);
			}
			return this._remoteChannels.get(e);
		}
		async initialize(e, t, n) {
			if (this._protocol.setWorkerId(e), this._requestHandlerFactory) {
				this._requestHandler = this._requestHandlerFactory(this);
				return;
			}
			return t && (typeof t.baseUrl < "u" && delete t.baseUrl, typeof t.paths < "u" && typeof t.paths.vs < "u" && delete t.paths.vs, typeof t.trustedTypesPolicy < "u" && delete t.trustedTypesPolicy, t.catchError = !0, globalThis.require.config(t)), import(`${W1.asBrowserUri(`${n}.js`).toString(!0)}`).then((r) => {
				if (this._requestHandler = r.create(this), !this._requestHandler) throw new Error("No RequestHandler!");
			});
		}
	}, Le = class {
		constructor(e, t, n, r) {
			this.originalStart = e, this.originalLength = t, this.modifiedStart = n, this.modifiedLength = r;
		}
		getOriginalEnd() {
			return this.originalStart + this.originalLength;
		}
		getModifiedEnd() {
			return this.modifiedStart + this.modifiedLength;
		}
	};
	function X1(e, t) {
		return (t << 5) - t + e | 0;
	}
	function yi(e, t) {
		t = X1(149417, t);
		for (let n = 0, r = e.length; n < r; n++) t = X1(e.charCodeAt(n), t);
		return t;
	}
	function Jt(e, t, n = 32) {
		const r = n - t, s = ~((1 << r) - 1);
		return (e << t | (s & e) >>> r) >>> 0;
	}
	function Y1(e, t = 0, n = e.byteLength, r = 0) {
		for (let s = 0; s < n; s++) e[t + s] = r;
	}
	function _i(e, t, n = "0") {
		for (; e.length < t;) e = n + e;
		return e;
	}
	function Oe(e, t = 32) {
		return e instanceof ArrayBuffer ? Array.from(new Uint8Array(e)).map((n) => n.toString(16).padStart(2, "0")).join("") : _i((e >>> 0).toString(16), t / 4);
	}
	(class Gr {
		static {
			this._bigBlock32 = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(320));
		}
		constructor() {
			this._h0 = 1732584193, this._h1 = 4023233417, this._h2 = 2562383102, this._h3 = 271733878, this._h4 = 3285377520, this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = !1;
		}
		update(t) {
			const n = t.length;
			if (n === 0) return;
			const r = this._buff;
			let s = this._buffLen, i = this._leftoverHighSurrogate, o, l;
			for (i !== 0 ? (o = i, l = -1, i = 0) : (o = t.charCodeAt(0), l = 0);;) {
				let u = o;
				if (at(o)) if (l + 1 < n) {
					const c = t.charCodeAt(l + 1);
					Wt(c) ? (l++, u = T1(o, c)) : u = 65533;
				} else {
					i = o;
					break;
				}
				else Wt(o) && (u = 65533);
				if (s = this._push(r, s, u), l++, l < n) o = t.charCodeAt(l);
				else break;
			}
			this._buffLen = s, this._leftoverHighSurrogate = i;
		}
		_push(t, n, r) {
			return r < 128 ? t[n++] = r : r < 2048 ? (t[n++] = 192 | (r & 1984) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : r < 65536 ? (t[n++] = 224 | (r & 61440) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : (t[n++] = 240 | (r & 1835008) >>> 18, t[n++] = 128 | (r & 258048) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0), n >= 64 && (this._step(), n -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), n;
		}
		digest() {
			return this._finished || (this._finished = !0, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), Oe(this._h0) + Oe(this._h1) + Oe(this._h2) + Oe(this._h3) + Oe(this._h4);
		}
		_wrapUp() {
			this._buff[this._buffLen++] = 128, Y1(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), Y1(this._buff));
			const t = 8 * this._totalLen;
			this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1), this._buffDV.setUint32(60, t % 4294967296, !1), this._step();
		}
		_step() {
			const t = Gr._bigBlock32, n = this._buffDV;
			for (let h = 0; h < 64; h += 4) t.setUint32(h, n.getUint32(h, !1), !1);
			for (let h = 64; h < 320; h += 4) t.setUint32(h, Jt(t.getUint32(h - 12, !1) ^ t.getUint32(h - 32, !1) ^ t.getUint32(h - 56, !1) ^ t.getUint32(h - 64, !1), 1), !1);
			let r = this._h0, s = this._h1, i = this._h2, o = this._h3, l = this._h4, u, c, m;
			for (let h = 0; h < 80; h++) h < 20 ? (u = s & i | ~s & o, c = 1518500249) : h < 40 ? (u = s ^ i ^ o, c = 1859775393) : h < 60 ? (u = s & i | s & o | i & o, c = 2400959708) : (u = s ^ i ^ o, c = 3395469782), m = Jt(r, 5) + u + l + c + t.getUint32(h * 4, !1) & 4294967295, l = o, o = i, i = Jt(s, 30), s = r, r = m;
			this._h0 = this._h0 + r & 4294967295, this._h1 = this._h1 + s & 4294967295, this._h2 = this._h2 + i & 4294967295, this._h3 = this._h3 + o & 4294967295, this._h4 = this._h4 + l & 4294967295;
		}
	});
	var Q1 = class {
		constructor(e) {
			this.source = e;
		}
		getElements() {
			const e = this.source, t = new Int32Array(e.length);
			for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t;
		}
	};
	function vi(e, t, n) {
		return new Z1(new Q1(e), new Q1(t)).ComputeDiff(n).changes;
	}
	var Me = class {
		static Assert(e, t) {
			if (!e) throw new Error(t);
		}
	}, ke = class {
		static Copy(e, t, n, r, s) {
			for (let i = 0; i < s; i++) n[r + i] = e[t + i];
		}
		static Copy2(e, t, n, r, s) {
			for (let i = 0; i < s; i++) n[r + i] = e[t + i];
		}
	}, J1 = class {
		constructor() {
			this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
		}
		MarkNextChange() {
			(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new Le(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
		}
		AddOriginalElement(e, t) {
			this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, t), this.m_originalCount++;
		}
		AddModifiedElement(e, t) {
			this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, t), this.m_modifiedCount++;
		}
		getChanges() {
			return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
		}
		getReverseChanges() {
			return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
		}
	}, Z1 = class Be {
		constructor(t, n, r = null) {
			this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
			const [s, i, o] = Be._getElements(t), [l, u, c] = Be._getElements(n);
			this._hasStrings = o && c, this._originalStringElements = s, this._originalElementsOrHash = i, this._modifiedStringElements = l, this._modifiedElementsOrHash = u, this.m_forwardHistory = [], this.m_reverseHistory = [];
		}
		static _isStringArray(t) {
			return t.length > 0 && typeof t[0] == "string";
		}
		static _getElements(t) {
			const n = t.getElements();
			if (Be._isStringArray(n)) {
				const r = new Int32Array(n.length);
				for (let s = 0, i = n.length; s < i; s++) r[s] = yi(n[s], 0);
				return [
					n,
					r,
					!0
				];
			}
			return n instanceof Int32Array ? [
				[],
				n,
				!1
			] : [
				[],
				new Int32Array(n),
				!1
			];
		}
		ElementsAreEqual(t, n) {
			return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._modifiedStringElements[n] : !0;
		}
		ElementsAreStrictEqual(t, n) {
			return this.ElementsAreEqual(t, n) ? Be._getStrictElement(this._originalSequence, t) === Be._getStrictElement(this._modifiedSequence, n) : !1;
		}
		static _getStrictElement(t, n) {
			return typeof t.getStrictElement == "function" ? t.getStrictElement(n) : null;
		}
		OriginalElementsAreEqual(t, n) {
			return this._originalElementsOrHash[t] !== this._originalElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._originalStringElements[n] : !0;
		}
		ModifiedElementsAreEqual(t, n) {
			return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._modifiedStringElements[t] === this._modifiedStringElements[n] : !0;
		}
		ComputeDiff(t) {
			return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, t);
		}
		_ComputeDiff(t, n, r, s, i) {
			const o = [!1];
			let l = this.ComputeDiffRecursive(t, n, r, s, o);
			return i && (l = this.PrettifyChanges(l)), {
				quitEarly: o[0],
				changes: l
			};
		}
		ComputeDiffRecursive(t, n, r, s, i) {
			for (i[0] = !1; t <= n && r <= s && this.ElementsAreEqual(t, r);) t++, r++;
			for (; n >= t && s >= r && this.ElementsAreEqual(n, s);) n--, s--;
			if (t > n || r > s) {
				let h;
				return r <= s ? (Me.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), h = [new Le(t, 0, r, s - r + 1)]) : t <= n ? (Me.Assert(r === s + 1, "modifiedStart should only be one more than modifiedEnd"), h = [new Le(t, n - t + 1, r, 0)]) : (Me.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), Me.Assert(r === s + 1, "modifiedStart should only be one more than modifiedEnd"), h = []), h;
			}
			const o = [0], l = [0], u = this.ComputeRecursionPoint(t, n, r, s, o, l, i), c = o[0], m = l[0];
			if (u !== null) return u;
			if (!i[0]) {
				const h = this.ComputeDiffRecursive(t, c, r, m, i);
				let d = [];
				return i[0] ? d = [new Le(c + 1, n - (c + 1) + 1, m + 1, s - (m + 1) + 1)] : d = this.ComputeDiffRecursive(c + 1, n, m + 1, s, i), this.ConcatenateChanges(h, d);
			}
			return [new Le(t, n - t + 1, r, s - r + 1)];
		}
		WALKTRACE(t, n, r, s, i, o, l, u, c, m, h, d, f, g, v, L, N, E) {
			let w = null, p = null, b = new J1(), y = n, S = r, F = f[0] - L[0] - s, H = -1073741824, Q = this.m_forwardHistory.length - 1;
			do {
				const A = F + t;
				A === y || A < S && c[A - 1] < c[A + 1] ? (h = c[A + 1], g = h - F - s, h < H && b.MarkNextChange(), H = h, b.AddModifiedElement(h + 1, g), F = A + 1 - t) : (h = c[A - 1] + 1, g = h - F - s, h < H && b.MarkNextChange(), H = h - 1, b.AddOriginalElement(h, g + 1), F = A - 1 - t), Q >= 0 && (c = this.m_forwardHistory[Q], t = c[0], y = 1, S = c.length - 1);
			} while (--Q >= -1);
			if (w = b.getReverseChanges(), E[0]) {
				let A = f[0] + 1, ce = L[0] + 1;
				if (w !== null && w.length > 0) {
					const R = w[w.length - 1];
					A = Math.max(A, R.getOriginalEnd()), ce = Math.max(ce, R.getModifiedEnd());
				}
				p = [new Le(A, d - A + 1, ce, v - ce + 1)];
			} else {
				b = new J1(), y = o, S = l, F = f[0] - L[0] - u, H = 1073741824, Q = N ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
				do {
					const A = F + i;
					A === y || A < S && m[A - 1] >= m[A + 1] ? (h = m[A + 1] - 1, g = h - F - u, h > H && b.MarkNextChange(), H = h + 1, b.AddOriginalElement(h + 1, g + 1), F = A + 1 - i) : (h = m[A - 1], g = h - F - u, h > H && b.MarkNextChange(), H = h, b.AddModifiedElement(h + 1, g + 1), F = A - 1 - i), Q >= 0 && (m = this.m_reverseHistory[Q], i = m[0], y = 1, S = m.length - 1);
				} while (--Q >= -1);
				p = b.getChanges();
			}
			return this.ConcatenateChanges(w, p);
		}
		ComputeRecursionPoint(t, n, r, s, i, o, l) {
			let u = 0, c = 0, m = 0, h = 0, d = 0, f = 0;
			t--, r--, i[0] = 0, o[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
			const g = n - t + (s - r), v = g + 1, L = new Int32Array(v), N = new Int32Array(v), E = s - r, w = n - t, p = t - r, b = n - s, y = (w - E) % 2 === 0;
			L[E] = t, N[w] = n, l[0] = !1;
			for (let S = 1; S <= g / 2 + 1; S++) {
				let F = 0, H = 0;
				m = this.ClipDiagonalBound(E - S, S, E, v), h = this.ClipDiagonalBound(E + S, S, E, v);
				for (let A = m; A <= h; A += 2) {
					A === m || A < h && L[A - 1] < L[A + 1] ? u = L[A + 1] : u = L[A - 1] + 1, c = u - (A - E) - p;
					const ce = u;
					for (; u < n && c < s && this.ElementsAreEqual(u + 1, c + 1);) u++, c++;
					if (L[A] = u, u + c > F + H && (F = u, H = c), !y && Math.abs(A - w) <= S - 1 && u >= N[A]) return i[0] = u, o[0] = c, ce <= N[A] && S <= 1448 ? this.WALKTRACE(E, m, h, p, w, d, f, b, L, N, u, n, i, c, s, o, y, l) : null;
				}
				const Q = (F - t + (H - r) - S) / 2;
				if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(F, Q)) return l[0] = !0, i[0] = F, o[0] = H, Q > 0 && S <= 1448 ? this.WALKTRACE(E, m, h, p, w, d, f, b, L, N, u, n, i, c, s, o, y, l) : (t++, r++, [new Le(t, n - t + 1, r, s - r + 1)]);
				d = this.ClipDiagonalBound(w - S, S, w, v), f = this.ClipDiagonalBound(w + S, S, w, v);
				for (let A = d; A <= f; A += 2) {
					A === d || A < f && N[A - 1] >= N[A + 1] ? u = N[A + 1] - 1 : u = N[A - 1], c = u - (A - w) - b;
					const ce = u;
					for (; u > t && c > r && this.ElementsAreEqual(u, c);) u--, c--;
					if (N[A] = u, y && Math.abs(A - E) <= S && u <= L[A]) return i[0] = u, o[0] = c, ce >= L[A] && S <= 1448 ? this.WALKTRACE(E, m, h, p, w, d, f, b, L, N, u, n, i, c, s, o, y, l) : null;
				}
				if (S <= 1447) {
					let A = new Int32Array(h - m + 2);
					A[0] = E - m + 1, ke.Copy2(L, m, A, 1, h - m + 1), this.m_forwardHistory.push(A), A = new Int32Array(f - d + 2), A[0] = w - d + 1, ke.Copy2(N, d, A, 1, f - d + 1), this.m_reverseHistory.push(A);
				}
			}
			return this.WALKTRACE(E, m, h, p, w, d, f, b, L, N, u, n, i, c, s, o, y, l);
		}
		PrettifyChanges(t) {
			for (let n = 0; n < t.length; n++) {
				const r = t[n], s = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, i = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, o = r.originalLength > 0, l = r.modifiedLength > 0;
				for (; r.originalStart + r.originalLength < s && r.modifiedStart + r.modifiedLength < i && (!o || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!l || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));) {
					const c = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
					if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !c) break;
					r.originalStart++, r.modifiedStart++;
				}
				const u = [null];
				if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], u)) {
					t[n] = u[0], t.splice(n + 1, 1), n--;
					continue;
				}
			}
			for (let n = t.length - 1; n >= 0; n--) {
				const r = t[n];
				let s = 0, i = 0;
				if (n > 0) {
					const h = t[n - 1];
					s = h.originalStart + h.originalLength, i = h.modifiedStart + h.modifiedLength;
				}
				const o = r.originalLength > 0, l = r.modifiedLength > 0;
				let u = 0, c = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
				for (let h = 1;; h++) {
					const d = r.originalStart - h, f = r.modifiedStart - h;
					if (d < s || f < i || o && !this.OriginalElementsAreEqual(d, d + r.originalLength) || l && !this.ModifiedElementsAreEqual(f, f + r.modifiedLength)) break;
					const g = (d === s && f === i ? 5 : 0) + this._boundaryScore(d, r.originalLength, f, r.modifiedLength);
					g > c && (c = g, u = h);
				}
				r.originalStart -= u, r.modifiedStart -= u;
				const m = [null];
				if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], m)) {
					t[n - 1] = m[0], t.splice(n, 1), n++;
					continue;
				}
			}
			if (this._hasStrings) for (let n = 1, r = t.length; n < r; n++) {
				const s = t[n - 1], i = t[n], o = i.originalStart - s.originalStart - s.originalLength, l = s.originalStart, u = i.originalStart + i.originalLength, c = u - l, m = s.modifiedStart, h = i.modifiedStart + i.modifiedLength, d = h - m;
				if (o < 5 && c < 20 && d < 20) {
					const f = this._findBetterContiguousSequence(l, c, m, d, o);
					if (f) {
						const [g, v] = f;
						(g !== s.originalStart + s.originalLength || v !== s.modifiedStart + s.modifiedLength) && (s.originalLength = g - s.originalStart, s.modifiedLength = v - s.modifiedStart, i.originalStart = g + o, i.modifiedStart = v + o, i.originalLength = u - i.originalStart, i.modifiedLength = h - i.modifiedStart);
					}
				}
			}
			return t;
		}
		_findBetterContiguousSequence(t, n, r, s, i) {
			if (n < i || s < i) return null;
			const o = t + n - i + 1, l = r + s - i + 1;
			let u = 0, c = 0, m = 0;
			for (let h = t; h < o; h++) for (let d = r; d < l; d++) {
				const f = this._contiguousSequenceScore(h, d, i);
				f > 0 && f > u && (u = f, c = h, m = d);
			}
			return u > 0 ? [c, m] : null;
		}
		_contiguousSequenceScore(t, n, r) {
			let s = 0;
			for (let i = 0; i < r; i++) {
				if (!this.ElementsAreEqual(t + i, n + i)) return 0;
				s += this._originalStringElements[t + i].length;
			}
			return s;
		}
		_OriginalIsBoundary(t) {
			return t <= 0 || t >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[t]);
		}
		_OriginalRegionIsBoundary(t, n) {
			if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1)) return !0;
			if (n > 0) {
				const r = t + n;
				if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r)) return !0;
			}
			return !1;
		}
		_ModifiedIsBoundary(t) {
			return t <= 0 || t >= this._modifiedElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t]);
		}
		_ModifiedRegionIsBoundary(t, n) {
			if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1)) return !0;
			if (n > 0) {
				const r = t + n;
				if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r)) return !0;
			}
			return !1;
		}
		_boundaryScore(t, n, r, s) {
			return (this._OriginalRegionIsBoundary(t, n) ? 1 : 0) + (this._ModifiedRegionIsBoundary(r, s) ? 1 : 0);
		}
		ConcatenateChanges(t, n) {
			const r = [];
			if (t.length === 0 || n.length === 0) return n.length > 0 ? n : t;
			if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
				const s = new Array(t.length + n.length - 1);
				return ke.Copy(t, 0, s, 0, t.length - 1), s[t.length - 1] = r[0], ke.Copy(n, 1, s, t.length, n.length - 1), s;
			} else {
				const s = new Array(t.length + n.length);
				return ke.Copy(t, 0, s, 0, t.length), ke.Copy(n, 0, s, t.length, n.length), s;
			}
		}
		ChangesOverlap(t, n, r) {
			if (Me.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), Me.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
				const s = t.originalStart;
				let i = t.originalLength;
				const o = t.modifiedStart;
				let l = t.modifiedLength;
				return t.originalStart + t.originalLength >= n.originalStart && (i = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new Le(s, i, o, l), !0;
			} else return r[0] = null, !1;
		}
		ClipDiagonalBound(t, n, r, s) {
			if (t >= 0 && t < s) return t;
			const i = r, o = s - r - 1, l = n % 2 === 0;
			return t < 0 ? l === (i % 2 === 0) ? 0 : 1 : l === (o % 2 === 0) ? s - 1 : s - 2;
		}
	}, z = class Ae {
		constructor(t, n) {
			this.lineNumber = t, this.column = n;
		}
		with(t = this.lineNumber, n = this.column) {
			return t === this.lineNumber && n === this.column ? this : new Ae(t, n);
		}
		delta(t = 0, n = 0) {
			return this.with(this.lineNumber + t, this.column + n);
		}
		equals(t) {
			return Ae.equals(this, t);
		}
		static equals(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
		}
		isBefore(t) {
			return Ae.isBefore(this, t);
		}
		static isBefore(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
		}
		isBeforeOrEqual(t) {
			return Ae.isBeforeOrEqual(this, t);
		}
		static isBeforeOrEqual(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
		}
		static compare(t, n) {
			const r = t.lineNumber | 0, s = n.lineNumber | 0;
			return r === s ? (t.column | 0) - (n.column | 0) : r - s;
		}
		clone() {
			return new Ae(this.lineNumber, this.column);
		}
		toString() {
			return "(" + this.lineNumber + "," + this.column + ")";
		}
		static lift(t) {
			return new Ae(t.lineNumber, t.column);
		}
		static isIPosition(t) {
			return t && typeof t.lineNumber == "number" && typeof t.column == "number";
		}
		toJSON() {
			return {
				lineNumber: this.lineNumber,
				column: this.column
			};
		}
	}, T = class O {
		constructor(t, n, r, s) {
			t > r || t === r && n > s ? (this.startLineNumber = r, this.startColumn = s, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = s);
		}
		isEmpty() {
			return O.isEmpty(this);
		}
		static isEmpty(t) {
			return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
		}
		containsPosition(t) {
			return O.containsPosition(this, t);
		}
		static containsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
		}
		static strictContainsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
		}
		containsRange(t) {
			return O.containsRange(this, t);
		}
		static containsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
		}
		strictContainsRange(t) {
			return O.strictContainsRange(this, t);
		}
		static strictContainsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
		}
		plusRange(t) {
			return O.plusRange(this, t);
		}
		static plusRange(t, n) {
			let r, s, i, o;
			return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, s = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, s = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, s = t.startColumn), n.endLineNumber > t.endLineNumber ? (i = n.endLineNumber, o = n.endColumn) : n.endLineNumber === t.endLineNumber ? (i = n.endLineNumber, o = Math.max(n.endColumn, t.endColumn)) : (i = t.endLineNumber, o = t.endColumn), new O(r, s, i, o);
		}
		intersectRanges(t) {
			return O.intersectRanges(this, t);
		}
		static intersectRanges(t, n) {
			let r = t.startLineNumber, s = t.startColumn, i = t.endLineNumber, o = t.endColumn;
			const l = n.startLineNumber, u = n.startColumn, c = n.endLineNumber, m = n.endColumn;
			return r < l ? (r = l, s = u) : r === l && (s = Math.max(s, u)), i > c ? (i = c, o = m) : i === c && (o = Math.min(o, m)), r > i || r === i && s > o ? null : new O(r, s, i, o);
		}
		equalsRange(t) {
			return O.equalsRange(this, t);
		}
		static equalsRange(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
		}
		getEndPosition() {
			return O.getEndPosition(this);
		}
		static getEndPosition(t) {
			return new z(t.endLineNumber, t.endColumn);
		}
		getStartPosition() {
			return O.getStartPosition(this);
		}
		static getStartPosition(t) {
			return new z(t.startLineNumber, t.startColumn);
		}
		toString() {
			return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
		}
		setEndPosition(t, n) {
			return new O(this.startLineNumber, this.startColumn, t, n);
		}
		setStartPosition(t, n) {
			return new O(t, n, this.endLineNumber, this.endColumn);
		}
		collapseToStart() {
			return O.collapseToStart(this);
		}
		static collapseToStart(t) {
			return new O(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
		}
		collapseToEnd() {
			return O.collapseToEnd(this);
		}
		static collapseToEnd(t) {
			return new O(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
		}
		delta(t) {
			return new O(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn);
		}
		static fromPositions(t, n = t) {
			return new O(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static lift(t) {
			return t ? new O(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
		}
		static isIRange(t) {
			return t && typeof t.startLineNumber == "number" && typeof t.startColumn == "number" && typeof t.endLineNumber == "number" && typeof t.endColumn == "number";
		}
		static areIntersectingOrTouching(t, n) {
			return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn);
		}
		static areIntersecting(t, n) {
			return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn <= n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn <= t.startColumn);
		}
		static compareRangesUsingStarts(t, n) {
			if (t && n) {
				const r = t.startLineNumber | 0, s = n.startLineNumber | 0;
				if (r === s) {
					const i = t.startColumn | 0, o = n.startColumn | 0;
					if (i === o) {
						const l = t.endLineNumber | 0, u = n.endLineNumber | 0;
						return l === u ? (t.endColumn | 0) - (n.endColumn | 0) : l - u;
					}
					return i - o;
				}
				return r - s;
			}
			return (t ? 1 : 0) - (n ? 1 : 0);
		}
		static compareRangesUsingEnds(t, n) {
			return t.endLineNumber === n.endLineNumber ? t.endColumn === n.endColumn ? t.startLineNumber === n.startLineNumber ? t.startColumn - n.startColumn : t.startLineNumber - n.startLineNumber : t.endColumn - n.endColumn : t.endLineNumber - n.endLineNumber;
		}
		static spansMultipleLines(t) {
			return t.endLineNumber > t.startLineNumber;
		}
		toJSON() {
			return this;
		}
	};
	function K1(e) {
		return e < 0 ? 0 : e > 255 ? 255 : e | 0;
	}
	function Pe(e) {
		return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
	}
	var wi = class Xr {
		constructor(t) {
			const n = K1(t);
			this._defaultValue = n, this._asciiMap = Xr._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
		}
		static _createAsciiMap(t) {
			const n = new Uint8Array(256);
			return n.fill(t), n;
		}
		set(t, n) {
			const r = K1(n);
			t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
		}
		get(t) {
			return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
		}
		clear() {
			this._asciiMap.fill(this._defaultValue), this._map.clear();
		}
	}, Li = class {
		constructor(e, t, n) {
			const r = new Uint8Array(e * t);
			for (let s = 0, i = e * t; s < i; s++) r[s] = n;
			this._data = r, this.rows = e, this.cols = t;
		}
		get(e, t) {
			return this._data[e * this.cols + t];
		}
		set(e, t, n) {
			this._data[e * this.cols + t] = n;
		}
	}, Ni = class {
		constructor(e) {
			let t = 0, n = 0;
			for (let s = 0, i = e.length; s < i; s++) {
				const [o, l, u] = e[s];
				l > t && (t = l), o > n && (n = o), u > n && (n = u);
			}
			t++, n++;
			const r = new Li(n, t, 0);
			for (let s = 0, i = e.length; s < i; s++) {
				const [o, l, u] = e[s];
				r.set(o, l, u);
			}
			this._states = r, this._maxCharCode = t;
		}
		nextState(e, t) {
			return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
		}
	};
	let Zt = null;
	function Si() {
		return Zt === null && (Zt = new Ni([
			[
				1,
				104,
				2
			],
			[
				1,
				72,
				2
			],
			[
				1,
				102,
				6
			],
			[
				1,
				70,
				6
			],
			[
				2,
				116,
				3
			],
			[
				2,
				84,
				3
			],
			[
				3,
				116,
				4
			],
			[
				3,
				84,
				4
			],
			[
				4,
				112,
				5
			],
			[
				4,
				80,
				5
			],
			[
				5,
				115,
				9
			],
			[
				5,
				83,
				9
			],
			[
				5,
				58,
				10
			],
			[
				6,
				105,
				7
			],
			[
				6,
				73,
				7
			],
			[
				7,
				108,
				8
			],
			[
				7,
				76,
				8
			],
			[
				8,
				101,
				9
			],
			[
				8,
				69,
				9
			],
			[
				9,
				58,
				10
			],
			[
				10,
				47,
				11
			],
			[
				11,
				47,
				12
			]
		])), Zt;
	}
	let je = null;
	function Ci() {
		if (je === null) {
			je = new wi(0);
			const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
			for (let n = 0; n < 35; n++) je.set(e.charCodeAt(n), 1);
			const t = ".,;:";
			for (let n = 0; n < 4; n++) je.set(t.charCodeAt(n), 2);
		}
		return je;
	}
	var Ri = class N1 {
		static _createLink(t, n, r, s, i) {
			let o = i - 1;
			do {
				const l = n.charCodeAt(o);
				if (t.get(l) !== 2) break;
				o--;
			} while (o > s);
			if (s > 0) {
				const l = n.charCodeAt(s - 1), u = n.charCodeAt(o);
				(l === 40 && u === 41 || l === 91 && u === 93 || l === 123 && u === 125) && o--;
			}
			return {
				range: {
					startLineNumber: r,
					startColumn: s + 1,
					endLineNumber: r,
					endColumn: o + 2
				},
				url: n.substring(s, o + 1)
			};
		}
		static computeLinks(t, n = Si()) {
			const r = Ci(), s = [];
			for (let i = 1, o = t.getLineCount(); i <= o; i++) {
				const l = t.getLineContent(i), u = l.length;
				let c = 0, m = 0, h = 0, d = 1, f = !1, g = !1, v = !1, L = !1;
				for (; c < u;) {
					let N = !1;
					const E = l.charCodeAt(c);
					if (d === 13) {
						let w;
						switch (E) {
							case 40:
								f = !0, w = 0;
								break;
							case 41:
								w = f ? 0 : 1;
								break;
							case 91:
								v = !0, g = !0, w = 0;
								break;
							case 93:
								v = !1, w = g ? 0 : 1;
								break;
							case 123:
								L = !0, w = 0;
								break;
							case 125:
								w = L ? 0 : 1;
								break;
							case 39:
							case 34:
							case 96:
								h === E ? w = 1 : h === 39 || h === 34 || h === 96 ? w = 0 : w = 1;
								break;
							case 42:
								w = h === 42 ? 1 : 0;
								break;
							case 124:
								w = h === 124 ? 1 : 0;
								break;
							case 32:
								w = v ? 0 : 1;
								break;
							default: w = r.get(E);
						}
						w === 1 && (s.push(N1._createLink(r, l, i, m, c)), N = !0);
					} else if (d === 12) {
						let w;
						E === 91 ? (g = !0, w = 0) : w = r.get(E), w === 1 ? N = !0 : d = 13;
					} else d = n.nextState(d, E), d === 0 && (N = !0);
					N && (d = 1, f = !1, g = !1, L = !1, m = c + 1, h = E), c++;
				}
				d === 13 && s.push(N1._createLink(r, l, i, m, u));
			}
			return s;
		}
	};
	function Ai(e) {
		return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : Ri.computeLinks(e);
	}
	var Ei = class Yr {
		constructor() {
			this._defaultValueSet = [
				["true", "false"],
				["True", "False"],
				[
					"Private",
					"Public",
					"Friend",
					"ReadOnly",
					"Partial",
					"Protected",
					"WriteOnly"
				],
				[
					"public",
					"protected",
					"private"
				]
			];
		}
		static {
			this.INSTANCE = new Yr();
		}
		navigateValueSet(t, n, r, s, i) {
			if (t && n) {
				const o = this.doNavigateValueSet(n, i);
				if (o) return {
					range: t,
					value: o
				};
			}
			if (r && s) {
				const o = this.doNavigateValueSet(s, i);
				if (o) return {
					range: r,
					value: o
				};
			}
			return null;
		}
		doNavigateValueSet(t, n) {
			const r = this.numberReplace(t, n);
			return r !== null ? r : this.textReplace(t, n);
		}
		numberReplace(t, n) {
			const r = Math.pow(10, t.length - (t.lastIndexOf(".") + 1));
			let s = Number(t);
			const i = parseFloat(t);
			return !isNaN(s) && !isNaN(i) && s === i ? s === 0 && !n ? null : (s = Math.floor(s * r), s += n ? r : -r, String(s / r)) : null;
		}
		textReplace(t, n) {
			return this.valueSetsReplace(this._defaultValueSet, t, n);
		}
		valueSetsReplace(t, n, r) {
			let s = null;
			for (let i = 0, o = t.length; s === null && i < o; i++) s = this.valueSetReplace(t[i], n, r);
			return s;
		}
		valueSetReplace(t, n, r) {
			let s = t.indexOf(n);
			return s >= 0 ? (s += r ? 1 : -1, s < 0 ? s = t.length - 1 : s %= t.length, t[s]) : null;
		}
	};
	const en = Object.freeze(function(e, t) {
		const n = setTimeout(e.bind(t), 0);
		return { dispose() {
			clearTimeout(n);
		} };
	});
	var ct;
	(function(e) {
		function t(n) {
			return n === e.None || n === e.Cancelled || n instanceof ht ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
		}
		e.isCancellationToken = t, e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: it.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: en
		});
	})(ct || (ct = {}));
	var ht = class {
		constructor() {
			this._isCancelled = !1, this._emitter = null;
		}
		cancel() {
			this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
		}
		get isCancellationRequested() {
			return this._isCancelled;
		}
		get onCancellationRequested() {
			return this._isCancelled ? en : (this._emitter || (this._emitter = new se()), this._emitter.event);
		}
		dispose() {
			this._emitter && (this._emitter.dispose(), this._emitter = null);
		}
	}, xi = class {
		constructor(e) {
			this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
		}
		get token() {
			return this._token || (this._token = new ht()), this._token;
		}
		cancel() {
			this._token ? this._token instanceof ht && this._token.cancel() : this._token = ct.Cancelled;
		}
		dispose(e = !1) {
			e && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof ht && this._token.dispose() : this._token = ct.None;
		}
	}, Kt = class {
		constructor() {
			this._keyCodeToStr = [], this._strToKeyCode = Object.create(null);
		}
		define(e, t) {
			this._keyCodeToStr[e] = t, this._strToKeyCode[t.toLowerCase()] = e;
		}
		keyCodeToStr(e) {
			return this._keyCodeToStr[e];
		}
		strToKeyCode(e) {
			return this._strToKeyCode[e.toLowerCase()] || 0;
		}
	};
	const mt = new Kt(), e1 = new Kt(), t1 = new Kt(), Mi = new Array(230), ki = {}, Pi = [], Di = Object.create(null), Fi = Object.create(null), tn = [], n1 = [];
	for (let e = 0; e <= 193; e++) tn[e] = -1;
	for (let e = 0; e <= 132; e++) n1[e] = -1;
	(function() {
		const t = [
			[
				1,
				0,
				"None",
				0,
				"unknown",
				0,
				"VK_UNKNOWN",
				"",
				""
			],
			[
				1,
				1,
				"Hyper",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				2,
				"Super",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				3,
				"Fn",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				4,
				"FnLock",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				5,
				"Suspend",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				6,
				"Resume",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				7,
				"Turbo",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				8,
				"Sleep",
				0,
				"",
				0,
				"VK_SLEEP",
				"",
				""
			],
			[
				1,
				9,
				"WakeUp",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				10,
				"KeyA",
				31,
				"A",
				65,
				"VK_A",
				"",
				""
			],
			[
				0,
				11,
				"KeyB",
				32,
				"B",
				66,
				"VK_B",
				"",
				""
			],
			[
				0,
				12,
				"KeyC",
				33,
				"C",
				67,
				"VK_C",
				"",
				""
			],
			[
				0,
				13,
				"KeyD",
				34,
				"D",
				68,
				"VK_D",
				"",
				""
			],
			[
				0,
				14,
				"KeyE",
				35,
				"E",
				69,
				"VK_E",
				"",
				""
			],
			[
				0,
				15,
				"KeyF",
				36,
				"F",
				70,
				"VK_F",
				"",
				""
			],
			[
				0,
				16,
				"KeyG",
				37,
				"G",
				71,
				"VK_G",
				"",
				""
			],
			[
				0,
				17,
				"KeyH",
				38,
				"H",
				72,
				"VK_H",
				"",
				""
			],
			[
				0,
				18,
				"KeyI",
				39,
				"I",
				73,
				"VK_I",
				"",
				""
			],
			[
				0,
				19,
				"KeyJ",
				40,
				"J",
				74,
				"VK_J",
				"",
				""
			],
			[
				0,
				20,
				"KeyK",
				41,
				"K",
				75,
				"VK_K",
				"",
				""
			],
			[
				0,
				21,
				"KeyL",
				42,
				"L",
				76,
				"VK_L",
				"",
				""
			],
			[
				0,
				22,
				"KeyM",
				43,
				"M",
				77,
				"VK_M",
				"",
				""
			],
			[
				0,
				23,
				"KeyN",
				44,
				"N",
				78,
				"VK_N",
				"",
				""
			],
			[
				0,
				24,
				"KeyO",
				45,
				"O",
				79,
				"VK_O",
				"",
				""
			],
			[
				0,
				25,
				"KeyP",
				46,
				"P",
				80,
				"VK_P",
				"",
				""
			],
			[
				0,
				26,
				"KeyQ",
				47,
				"Q",
				81,
				"VK_Q",
				"",
				""
			],
			[
				0,
				27,
				"KeyR",
				48,
				"R",
				82,
				"VK_R",
				"",
				""
			],
			[
				0,
				28,
				"KeyS",
				49,
				"S",
				83,
				"VK_S",
				"",
				""
			],
			[
				0,
				29,
				"KeyT",
				50,
				"T",
				84,
				"VK_T",
				"",
				""
			],
			[
				0,
				30,
				"KeyU",
				51,
				"U",
				85,
				"VK_U",
				"",
				""
			],
			[
				0,
				31,
				"KeyV",
				52,
				"V",
				86,
				"VK_V",
				"",
				""
			],
			[
				0,
				32,
				"KeyW",
				53,
				"W",
				87,
				"VK_W",
				"",
				""
			],
			[
				0,
				33,
				"KeyX",
				54,
				"X",
				88,
				"VK_X",
				"",
				""
			],
			[
				0,
				34,
				"KeyY",
				55,
				"Y",
				89,
				"VK_Y",
				"",
				""
			],
			[
				0,
				35,
				"KeyZ",
				56,
				"Z",
				90,
				"VK_Z",
				"",
				""
			],
			[
				0,
				36,
				"Digit1",
				22,
				"1",
				49,
				"VK_1",
				"",
				""
			],
			[
				0,
				37,
				"Digit2",
				23,
				"2",
				50,
				"VK_2",
				"",
				""
			],
			[
				0,
				38,
				"Digit3",
				24,
				"3",
				51,
				"VK_3",
				"",
				""
			],
			[
				0,
				39,
				"Digit4",
				25,
				"4",
				52,
				"VK_4",
				"",
				""
			],
			[
				0,
				40,
				"Digit5",
				26,
				"5",
				53,
				"VK_5",
				"",
				""
			],
			[
				0,
				41,
				"Digit6",
				27,
				"6",
				54,
				"VK_6",
				"",
				""
			],
			[
				0,
				42,
				"Digit7",
				28,
				"7",
				55,
				"VK_7",
				"",
				""
			],
			[
				0,
				43,
				"Digit8",
				29,
				"8",
				56,
				"VK_8",
				"",
				""
			],
			[
				0,
				44,
				"Digit9",
				30,
				"9",
				57,
				"VK_9",
				"",
				""
			],
			[
				0,
				45,
				"Digit0",
				21,
				"0",
				48,
				"VK_0",
				"",
				""
			],
			[
				1,
				46,
				"Enter",
				3,
				"Enter",
				13,
				"VK_RETURN",
				"",
				""
			],
			[
				1,
				47,
				"Escape",
				9,
				"Escape",
				27,
				"VK_ESCAPE",
				"",
				""
			],
			[
				1,
				48,
				"Backspace",
				1,
				"Backspace",
				8,
				"VK_BACK",
				"",
				""
			],
			[
				1,
				49,
				"Tab",
				2,
				"Tab",
				9,
				"VK_TAB",
				"",
				""
			],
			[
				1,
				50,
				"Space",
				10,
				"Space",
				32,
				"VK_SPACE",
				"",
				""
			],
			[
				0,
				51,
				"Minus",
				88,
				"-",
				189,
				"VK_OEM_MINUS",
				"-",
				"OEM_MINUS"
			],
			[
				0,
				52,
				"Equal",
				86,
				"=",
				187,
				"VK_OEM_PLUS",
				"=",
				"OEM_PLUS"
			],
			[
				0,
				53,
				"BracketLeft",
				92,
				"[",
				219,
				"VK_OEM_4",
				"[",
				"OEM_4"
			],
			[
				0,
				54,
				"BracketRight",
				94,
				"]",
				221,
				"VK_OEM_6",
				"]",
				"OEM_6"
			],
			[
				0,
				55,
				"Backslash",
				93,
				"\\",
				220,
				"VK_OEM_5",
				"\\",
				"OEM_5"
			],
			[
				0,
				56,
				"IntlHash",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				57,
				"Semicolon",
				85,
				";",
				186,
				"VK_OEM_1",
				";",
				"OEM_1"
			],
			[
				0,
				58,
				"Quote",
				95,
				"'",
				222,
				"VK_OEM_7",
				"'",
				"OEM_7"
			],
			[
				0,
				59,
				"Backquote",
				91,
				"`",
				192,
				"VK_OEM_3",
				"`",
				"OEM_3"
			],
			[
				0,
				60,
				"Comma",
				87,
				",",
				188,
				"VK_OEM_COMMA",
				",",
				"OEM_COMMA"
			],
			[
				0,
				61,
				"Period",
				89,
				".",
				190,
				"VK_OEM_PERIOD",
				".",
				"OEM_PERIOD"
			],
			[
				0,
				62,
				"Slash",
				90,
				"/",
				191,
				"VK_OEM_2",
				"/",
				"OEM_2"
			],
			[
				1,
				63,
				"CapsLock",
				8,
				"CapsLock",
				20,
				"VK_CAPITAL",
				"",
				""
			],
			[
				1,
				64,
				"F1",
				59,
				"F1",
				112,
				"VK_F1",
				"",
				""
			],
			[
				1,
				65,
				"F2",
				60,
				"F2",
				113,
				"VK_F2",
				"",
				""
			],
			[
				1,
				66,
				"F3",
				61,
				"F3",
				114,
				"VK_F3",
				"",
				""
			],
			[
				1,
				67,
				"F4",
				62,
				"F4",
				115,
				"VK_F4",
				"",
				""
			],
			[
				1,
				68,
				"F5",
				63,
				"F5",
				116,
				"VK_F5",
				"",
				""
			],
			[
				1,
				69,
				"F6",
				64,
				"F6",
				117,
				"VK_F6",
				"",
				""
			],
			[
				1,
				70,
				"F7",
				65,
				"F7",
				118,
				"VK_F7",
				"",
				""
			],
			[
				1,
				71,
				"F8",
				66,
				"F8",
				119,
				"VK_F8",
				"",
				""
			],
			[
				1,
				72,
				"F9",
				67,
				"F9",
				120,
				"VK_F9",
				"",
				""
			],
			[
				1,
				73,
				"F10",
				68,
				"F10",
				121,
				"VK_F10",
				"",
				""
			],
			[
				1,
				74,
				"F11",
				69,
				"F11",
				122,
				"VK_F11",
				"",
				""
			],
			[
				1,
				75,
				"F12",
				70,
				"F12",
				123,
				"VK_F12",
				"",
				""
			],
			[
				1,
				76,
				"PrintScreen",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				77,
				"ScrollLock",
				84,
				"ScrollLock",
				145,
				"VK_SCROLL",
				"",
				""
			],
			[
				1,
				78,
				"Pause",
				7,
				"PauseBreak",
				19,
				"VK_PAUSE",
				"",
				""
			],
			[
				1,
				79,
				"Insert",
				19,
				"Insert",
				45,
				"VK_INSERT",
				"",
				""
			],
			[
				1,
				80,
				"Home",
				14,
				"Home",
				36,
				"VK_HOME",
				"",
				""
			],
			[
				1,
				81,
				"PageUp",
				11,
				"PageUp",
				33,
				"VK_PRIOR",
				"",
				""
			],
			[
				1,
				82,
				"Delete",
				20,
				"Delete",
				46,
				"VK_DELETE",
				"",
				""
			],
			[
				1,
				83,
				"End",
				13,
				"End",
				35,
				"VK_END",
				"",
				""
			],
			[
				1,
				84,
				"PageDown",
				12,
				"PageDown",
				34,
				"VK_NEXT",
				"",
				""
			],
			[
				1,
				85,
				"ArrowRight",
				17,
				"RightArrow",
				39,
				"VK_RIGHT",
				"Right",
				""
			],
			[
				1,
				86,
				"ArrowLeft",
				15,
				"LeftArrow",
				37,
				"VK_LEFT",
				"Left",
				""
			],
			[
				1,
				87,
				"ArrowDown",
				18,
				"DownArrow",
				40,
				"VK_DOWN",
				"Down",
				""
			],
			[
				1,
				88,
				"ArrowUp",
				16,
				"UpArrow",
				38,
				"VK_UP",
				"Up",
				""
			],
			[
				1,
				89,
				"NumLock",
				83,
				"NumLock",
				144,
				"VK_NUMLOCK",
				"",
				""
			],
			[
				1,
				90,
				"NumpadDivide",
				113,
				"NumPad_Divide",
				111,
				"VK_DIVIDE",
				"",
				""
			],
			[
				1,
				91,
				"NumpadMultiply",
				108,
				"NumPad_Multiply",
				106,
				"VK_MULTIPLY",
				"",
				""
			],
			[
				1,
				92,
				"NumpadSubtract",
				111,
				"NumPad_Subtract",
				109,
				"VK_SUBTRACT",
				"",
				""
			],
			[
				1,
				93,
				"NumpadAdd",
				109,
				"NumPad_Add",
				107,
				"VK_ADD",
				"",
				""
			],
			[
				1,
				94,
				"NumpadEnter",
				3,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				95,
				"Numpad1",
				99,
				"NumPad1",
				97,
				"VK_NUMPAD1",
				"",
				""
			],
			[
				1,
				96,
				"Numpad2",
				100,
				"NumPad2",
				98,
				"VK_NUMPAD2",
				"",
				""
			],
			[
				1,
				97,
				"Numpad3",
				101,
				"NumPad3",
				99,
				"VK_NUMPAD3",
				"",
				""
			],
			[
				1,
				98,
				"Numpad4",
				102,
				"NumPad4",
				100,
				"VK_NUMPAD4",
				"",
				""
			],
			[
				1,
				99,
				"Numpad5",
				103,
				"NumPad5",
				101,
				"VK_NUMPAD5",
				"",
				""
			],
			[
				1,
				100,
				"Numpad6",
				104,
				"NumPad6",
				102,
				"VK_NUMPAD6",
				"",
				""
			],
			[
				1,
				101,
				"Numpad7",
				105,
				"NumPad7",
				103,
				"VK_NUMPAD7",
				"",
				""
			],
			[
				1,
				102,
				"Numpad8",
				106,
				"NumPad8",
				104,
				"VK_NUMPAD8",
				"",
				""
			],
			[
				1,
				103,
				"Numpad9",
				107,
				"NumPad9",
				105,
				"VK_NUMPAD9",
				"",
				""
			],
			[
				1,
				104,
				"Numpad0",
				98,
				"NumPad0",
				96,
				"VK_NUMPAD0",
				"",
				""
			],
			[
				1,
				105,
				"NumpadDecimal",
				112,
				"NumPad_Decimal",
				110,
				"VK_DECIMAL",
				"",
				""
			],
			[
				0,
				106,
				"IntlBackslash",
				97,
				"OEM_102",
				226,
				"VK_OEM_102",
				"",
				""
			],
			[
				1,
				107,
				"ContextMenu",
				58,
				"ContextMenu",
				93,
				"",
				"",
				""
			],
			[
				1,
				108,
				"Power",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				109,
				"NumpadEqual",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				110,
				"F13",
				71,
				"F13",
				124,
				"VK_F13",
				"",
				""
			],
			[
				1,
				111,
				"F14",
				72,
				"F14",
				125,
				"VK_F14",
				"",
				""
			],
			[
				1,
				112,
				"F15",
				73,
				"F15",
				126,
				"VK_F15",
				"",
				""
			],
			[
				1,
				113,
				"F16",
				74,
				"F16",
				127,
				"VK_F16",
				"",
				""
			],
			[
				1,
				114,
				"F17",
				75,
				"F17",
				128,
				"VK_F17",
				"",
				""
			],
			[
				1,
				115,
				"F18",
				76,
				"F18",
				129,
				"VK_F18",
				"",
				""
			],
			[
				1,
				116,
				"F19",
				77,
				"F19",
				130,
				"VK_F19",
				"",
				""
			],
			[
				1,
				117,
				"F20",
				78,
				"F20",
				131,
				"VK_F20",
				"",
				""
			],
			[
				1,
				118,
				"F21",
				79,
				"F21",
				132,
				"VK_F21",
				"",
				""
			],
			[
				1,
				119,
				"F22",
				80,
				"F22",
				133,
				"VK_F22",
				"",
				""
			],
			[
				1,
				120,
				"F23",
				81,
				"F23",
				134,
				"VK_F23",
				"",
				""
			],
			[
				1,
				121,
				"F24",
				82,
				"F24",
				135,
				"VK_F24",
				"",
				""
			],
			[
				1,
				122,
				"Open",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				123,
				"Help",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				124,
				"Select",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				125,
				"Again",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				126,
				"Undo",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				127,
				"Cut",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				128,
				"Copy",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				129,
				"Paste",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				130,
				"Find",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				131,
				"AudioVolumeMute",
				117,
				"AudioVolumeMute",
				173,
				"VK_VOLUME_MUTE",
				"",
				""
			],
			[
				1,
				132,
				"AudioVolumeUp",
				118,
				"AudioVolumeUp",
				175,
				"VK_VOLUME_UP",
				"",
				""
			],
			[
				1,
				133,
				"AudioVolumeDown",
				119,
				"AudioVolumeDown",
				174,
				"VK_VOLUME_DOWN",
				"",
				""
			],
			[
				1,
				134,
				"NumpadComma",
				110,
				"NumPad_Separator",
				108,
				"VK_SEPARATOR",
				"",
				""
			],
			[
				0,
				135,
				"IntlRo",
				115,
				"ABNT_C1",
				193,
				"VK_ABNT_C1",
				"",
				""
			],
			[
				1,
				136,
				"KanaMode",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				0,
				137,
				"IntlYen",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				138,
				"Convert",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				139,
				"NonConvert",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				140,
				"Lang1",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				141,
				"Lang2",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				142,
				"Lang3",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				143,
				"Lang4",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				144,
				"Lang5",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				145,
				"Abort",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				146,
				"Props",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				147,
				"NumpadParenLeft",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				148,
				"NumpadParenRight",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				149,
				"NumpadBackspace",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				150,
				"NumpadMemoryStore",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				151,
				"NumpadMemoryRecall",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				152,
				"NumpadMemoryClear",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				153,
				"NumpadMemoryAdd",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				154,
				"NumpadMemorySubtract",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				155,
				"NumpadClear",
				131,
				"Clear",
				12,
				"VK_CLEAR",
				"",
				""
			],
			[
				1,
				156,
				"NumpadClearEntry",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				5,
				"Ctrl",
				17,
				"VK_CONTROL",
				"",
				""
			],
			[
				1,
				0,
				"",
				4,
				"Shift",
				16,
				"VK_SHIFT",
				"",
				""
			],
			[
				1,
				0,
				"",
				6,
				"Alt",
				18,
				"VK_MENU",
				"",
				""
			],
			[
				1,
				0,
				"",
				57,
				"Meta",
				91,
				"VK_COMMAND",
				"",
				""
			],
			[
				1,
				157,
				"ControlLeft",
				5,
				"",
				0,
				"VK_LCONTROL",
				"",
				""
			],
			[
				1,
				158,
				"ShiftLeft",
				4,
				"",
				0,
				"VK_LSHIFT",
				"",
				""
			],
			[
				1,
				159,
				"AltLeft",
				6,
				"",
				0,
				"VK_LMENU",
				"",
				""
			],
			[
				1,
				160,
				"MetaLeft",
				57,
				"",
				0,
				"VK_LWIN",
				"",
				""
			],
			[
				1,
				161,
				"ControlRight",
				5,
				"",
				0,
				"VK_RCONTROL",
				"",
				""
			],
			[
				1,
				162,
				"ShiftRight",
				4,
				"",
				0,
				"VK_RSHIFT",
				"",
				""
			],
			[
				1,
				163,
				"AltRight",
				6,
				"",
				0,
				"VK_RMENU",
				"",
				""
			],
			[
				1,
				164,
				"MetaRight",
				57,
				"",
				0,
				"VK_RWIN",
				"",
				""
			],
			[
				1,
				165,
				"BrightnessUp",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				166,
				"BrightnessDown",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				167,
				"MediaPlay",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				168,
				"MediaRecord",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				169,
				"MediaFastForward",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				170,
				"MediaRewind",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				171,
				"MediaTrackNext",
				124,
				"MediaTrackNext",
				176,
				"VK_MEDIA_NEXT_TRACK",
				"",
				""
			],
			[
				1,
				172,
				"MediaTrackPrevious",
				125,
				"MediaTrackPrevious",
				177,
				"VK_MEDIA_PREV_TRACK",
				"",
				""
			],
			[
				1,
				173,
				"MediaStop",
				126,
				"MediaStop",
				178,
				"VK_MEDIA_STOP",
				"",
				""
			],
			[
				1,
				174,
				"Eject",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				175,
				"MediaPlayPause",
				127,
				"MediaPlayPause",
				179,
				"VK_MEDIA_PLAY_PAUSE",
				"",
				""
			],
			[
				1,
				176,
				"MediaSelect",
				128,
				"LaunchMediaPlayer",
				181,
				"VK_MEDIA_LAUNCH_MEDIA_SELECT",
				"",
				""
			],
			[
				1,
				177,
				"LaunchMail",
				129,
				"LaunchMail",
				180,
				"VK_MEDIA_LAUNCH_MAIL",
				"",
				""
			],
			[
				1,
				178,
				"LaunchApp2",
				130,
				"LaunchApp2",
				183,
				"VK_MEDIA_LAUNCH_APP2",
				"",
				""
			],
			[
				1,
				179,
				"LaunchApp1",
				0,
				"",
				0,
				"VK_MEDIA_LAUNCH_APP1",
				"",
				""
			],
			[
				1,
				180,
				"SelectTask",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				181,
				"LaunchScreenSaver",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				182,
				"BrowserSearch",
				120,
				"BrowserSearch",
				170,
				"VK_BROWSER_SEARCH",
				"",
				""
			],
			[
				1,
				183,
				"BrowserHome",
				121,
				"BrowserHome",
				172,
				"VK_BROWSER_HOME",
				"",
				""
			],
			[
				1,
				184,
				"BrowserBack",
				122,
				"BrowserBack",
				166,
				"VK_BROWSER_BACK",
				"",
				""
			],
			[
				1,
				185,
				"BrowserForward",
				123,
				"BrowserForward",
				167,
				"VK_BROWSER_FORWARD",
				"",
				""
			],
			[
				1,
				186,
				"BrowserStop",
				0,
				"",
				0,
				"VK_BROWSER_STOP",
				"",
				""
			],
			[
				1,
				187,
				"BrowserRefresh",
				0,
				"",
				0,
				"VK_BROWSER_REFRESH",
				"",
				""
			],
			[
				1,
				188,
				"BrowserFavorites",
				0,
				"",
				0,
				"VK_BROWSER_FAVORITES",
				"",
				""
			],
			[
				1,
				189,
				"ZoomToggle",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				190,
				"MailReply",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				191,
				"MailForward",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				192,
				"MailSend",
				0,
				"",
				0,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				114,
				"KeyInComposition",
				229,
				"",
				"",
				""
			],
			[
				1,
				0,
				"",
				116,
				"ABNT_C2",
				194,
				"VK_ABNT_C2",
				"",
				""
			],
			[
				1,
				0,
				"",
				96,
				"OEM_8",
				223,
				"VK_OEM_8",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_KANA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HANGUL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_JUNJA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_FINAL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HANJA",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_KANJI",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_CONVERT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_NONCONVERT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ACCEPT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_MODECHANGE",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_SELECT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PRINT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EXECUTE",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_SNAPSHOT",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_HELP",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_APPS",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PROCESSKEY",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PACKET",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_DBE_SBCSCHAR",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_DBE_DBCSCHAR",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ATTN",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_CRSEL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EXSEL",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_EREOF",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PLAY",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_ZOOM",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_NONAME",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_PA1",
				"",
				""
			],
			[
				1,
				0,
				"",
				0,
				"",
				0,
				"VK_OEM_CLEAR",
				"",
				""
			]
		], n = [], r = [];
		for (const s of t) {
			const [i, o, l, u, c, m, h, d, f] = s;
			if (r[o] || (r[o] = !0, Pi[o] = l, Di[l] = o, Fi[l.toLowerCase()] = o, i && (tn[o] = u, u !== 0 && u !== 3 && u !== 5 && u !== 4 && u !== 6 && u !== 57 && (n1[u] = o))), !n[u]) {
				if (n[u] = !0, !c) throw new Error(`String representation missing for key code ${u} around scan code ${l}`);
				mt.define(u, c), e1.define(u, d || c), t1.define(u, f || d || c);
			}
			m && (Mi[m] = u), h && (ki[h] = u);
		}
		n1[3] = 46;
	})();
	var nn;
	(function(e) {
		function t(l) {
			return mt.keyCodeToStr(l);
		}
		e.toString = t;
		function n(l) {
			return mt.strToKeyCode(l);
		}
		e.fromString = n;
		function r(l) {
			return e1.keyCodeToStr(l);
		}
		e.toUserSettingsUS = r;
		function s(l) {
			return t1.keyCodeToStr(l);
		}
		e.toUserSettingsGeneral = s;
		function i(l) {
			return e1.strToKeyCode(l) || t1.strToKeyCode(l);
		}
		e.fromUserSettings = i;
		function o(l) {
			if (l >= 98 && l <= 113) return null;
			switch (l) {
				case 16: return "Up";
				case 18: return "Down";
				case 15: return "Left";
				case 17: return "Right";
			}
			return mt.keyCodeToStr(l);
		}
		e.toElectronAccelerator = o;
	})(nn || (nn = {}));
	function Ti(e, t) {
		return (e | (t & 65535) << 16 >>> 0) >>> 0;
	}
	var Ii = class ie extends T {
		constructor(t, n, r, s) {
			super(t, n, r, s), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = s;
		}
		toString() {
			return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
		}
		equalsSelection(t) {
			return ie.selectionsEqual(this, t);
		}
		static selectionsEqual(t, n) {
			return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
		}
		getDirection() {
			return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
		}
		setEndPosition(t, n) {
			return this.getDirection() === 0 ? new ie(this.startLineNumber, this.startColumn, t, n) : new ie(t, n, this.startLineNumber, this.startColumn);
		}
		getPosition() {
			return new z(this.positionLineNumber, this.positionColumn);
		}
		getSelectionStart() {
			return new z(this.selectionStartLineNumber, this.selectionStartColumn);
		}
		setStartPosition(t, n) {
			return this.getDirection() === 0 ? new ie(t, n, this.endLineNumber, this.endColumn) : new ie(this.endLineNumber, this.endColumn, t, n);
		}
		static fromPositions(t, n = t) {
			return new ie(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static fromRange(t, n) {
			return n === 0 ? new ie(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : new ie(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn);
		}
		static liftSelection(t) {
			return new ie(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
		}
		static selectionsArrEqual(t, n) {
			if (t && !n || !t && n) return !1;
			if (!t && !n) return !0;
			if (t.length !== n.length) return !1;
			for (let r = 0, s = t.length; r < s; r++) if (!this.selectionsEqual(t[r], n[r])) return !1;
			return !0;
		}
		static isISelection(t) {
			return t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
		}
		static createWithDirection(t, n, r, s, i) {
			return i === 0 ? new ie(t, n, r, s) : new ie(r, s, t, n);
		}
	};
	function Vi(e) {
		return typeof e == "string";
	}
	const rn = Object.create(null);
	function a(e, t) {
		if (Vi(t)) {
			const n = rn[t];
			if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`);
			t = n;
		}
		return rn[e] = t, { id: e };
	}
	const Bi = {
		add: a("add", 6e4),
		plus: a("plus", 6e4),
		gistNew: a("gist-new", 6e4),
		repoCreate: a("repo-create", 6e4),
		lightbulb: a("lightbulb", 60001),
		lightBulb: a("light-bulb", 60001),
		repo: a("repo", 60002),
		repoDelete: a("repo-delete", 60002),
		gistFork: a("gist-fork", 60003),
		repoForked: a("repo-forked", 60003),
		gitPullRequest: a("git-pull-request", 60004),
		gitPullRequestAbandoned: a("git-pull-request-abandoned", 60004),
		recordKeys: a("record-keys", 60005),
		keyboard: a("keyboard", 60005),
		tag: a("tag", 60006),
		gitPullRequestLabel: a("git-pull-request-label", 60006),
		tagAdd: a("tag-add", 60006),
		tagRemove: a("tag-remove", 60006),
		person: a("person", 60007),
		personFollow: a("person-follow", 60007),
		personOutline: a("person-outline", 60007),
		personFilled: a("person-filled", 60007),
		gitBranch: a("git-branch", 60008),
		gitBranchCreate: a("git-branch-create", 60008),
		gitBranchDelete: a("git-branch-delete", 60008),
		sourceControl: a("source-control", 60008),
		mirror: a("mirror", 60009),
		mirrorPublic: a("mirror-public", 60009),
		star: a("star", 60010),
		starAdd: a("star-add", 60010),
		starDelete: a("star-delete", 60010),
		starEmpty: a("star-empty", 60010),
		comment: a("comment", 60011),
		commentAdd: a("comment-add", 60011),
		alert: a("alert", 60012),
		warning: a("warning", 60012),
		search: a("search", 60013),
		searchSave: a("search-save", 60013),
		logOut: a("log-out", 60014),
		signOut: a("sign-out", 60014),
		logIn: a("log-in", 60015),
		signIn: a("sign-in", 60015),
		eye: a("eye", 60016),
		eyeUnwatch: a("eye-unwatch", 60016),
		eyeWatch: a("eye-watch", 60016),
		circleFilled: a("circle-filled", 60017),
		primitiveDot: a("primitive-dot", 60017),
		closeDirty: a("close-dirty", 60017),
		debugBreakpoint: a("debug-breakpoint", 60017),
		debugBreakpointDisabled: a("debug-breakpoint-disabled", 60017),
		debugHint: a("debug-hint", 60017),
		terminalDecorationSuccess: a("terminal-decoration-success", 60017),
		primitiveSquare: a("primitive-square", 60018),
		edit: a("edit", 60019),
		pencil: a("pencil", 60019),
		info: a("info", 60020),
		issueOpened: a("issue-opened", 60020),
		gistPrivate: a("gist-private", 60021),
		gitForkPrivate: a("git-fork-private", 60021),
		lock: a("lock", 60021),
		mirrorPrivate: a("mirror-private", 60021),
		close: a("close", 60022),
		removeClose: a("remove-close", 60022),
		x: a("x", 60022),
		repoSync: a("repo-sync", 60023),
		sync: a("sync", 60023),
		clone: a("clone", 60024),
		desktopDownload: a("desktop-download", 60024),
		beaker: a("beaker", 60025),
		microscope: a("microscope", 60025),
		vm: a("vm", 60026),
		deviceDesktop: a("device-desktop", 60026),
		file: a("file", 60027),
		fileText: a("file-text", 60027),
		more: a("more", 60028),
		ellipsis: a("ellipsis", 60028),
		kebabHorizontal: a("kebab-horizontal", 60028),
		mailReply: a("mail-reply", 60029),
		reply: a("reply", 60029),
		organization: a("organization", 60030),
		organizationFilled: a("organization-filled", 60030),
		organizationOutline: a("organization-outline", 60030),
		newFile: a("new-file", 60031),
		fileAdd: a("file-add", 60031),
		newFolder: a("new-folder", 60032),
		fileDirectoryCreate: a("file-directory-create", 60032),
		trash: a("trash", 60033),
		trashcan: a("trashcan", 60033),
		history: a("history", 60034),
		clock: a("clock", 60034),
		folder: a("folder", 60035),
		fileDirectory: a("file-directory", 60035),
		symbolFolder: a("symbol-folder", 60035),
		logoGithub: a("logo-github", 60036),
		markGithub: a("mark-github", 60036),
		github: a("github", 60036),
		terminal: a("terminal", 60037),
		console: a("console", 60037),
		repl: a("repl", 60037),
		zap: a("zap", 60038),
		symbolEvent: a("symbol-event", 60038),
		error: a("error", 60039),
		stop: a("stop", 60039),
		variable: a("variable", 60040),
		symbolVariable: a("symbol-variable", 60040),
		array: a("array", 60042),
		symbolArray: a("symbol-array", 60042),
		symbolModule: a("symbol-module", 60043),
		symbolPackage: a("symbol-package", 60043),
		symbolNamespace: a("symbol-namespace", 60043),
		symbolObject: a("symbol-object", 60043),
		symbolMethod: a("symbol-method", 60044),
		symbolFunction: a("symbol-function", 60044),
		symbolConstructor: a("symbol-constructor", 60044),
		symbolBoolean: a("symbol-boolean", 60047),
		symbolNull: a("symbol-null", 60047),
		symbolNumeric: a("symbol-numeric", 60048),
		symbolNumber: a("symbol-number", 60048),
		symbolStructure: a("symbol-structure", 60049),
		symbolStruct: a("symbol-struct", 60049),
		symbolParameter: a("symbol-parameter", 60050),
		symbolTypeParameter: a("symbol-type-parameter", 60050),
		symbolKey: a("symbol-key", 60051),
		symbolText: a("symbol-text", 60051),
		symbolReference: a("symbol-reference", 60052),
		goToFile: a("go-to-file", 60052),
		symbolEnum: a("symbol-enum", 60053),
		symbolValue: a("symbol-value", 60053),
		symbolRuler: a("symbol-ruler", 60054),
		symbolUnit: a("symbol-unit", 60054),
		activateBreakpoints: a("activate-breakpoints", 60055),
		archive: a("archive", 60056),
		arrowBoth: a("arrow-both", 60057),
		arrowDown: a("arrow-down", 60058),
		arrowLeft: a("arrow-left", 60059),
		arrowRight: a("arrow-right", 60060),
		arrowSmallDown: a("arrow-small-down", 60061),
		arrowSmallLeft: a("arrow-small-left", 60062),
		arrowSmallRight: a("arrow-small-right", 60063),
		arrowSmallUp: a("arrow-small-up", 60064),
		arrowUp: a("arrow-up", 60065),
		bell: a("bell", 60066),
		bold: a("bold", 60067),
		book: a("book", 60068),
		bookmark: a("bookmark", 60069),
		debugBreakpointConditionalUnverified: a("debug-breakpoint-conditional-unverified", 60070),
		debugBreakpointConditional: a("debug-breakpoint-conditional", 60071),
		debugBreakpointConditionalDisabled: a("debug-breakpoint-conditional-disabled", 60071),
		debugBreakpointDataUnverified: a("debug-breakpoint-data-unverified", 60072),
		debugBreakpointData: a("debug-breakpoint-data", 60073),
		debugBreakpointDataDisabled: a("debug-breakpoint-data-disabled", 60073),
		debugBreakpointLogUnverified: a("debug-breakpoint-log-unverified", 60074),
		debugBreakpointLog: a("debug-breakpoint-log", 60075),
		debugBreakpointLogDisabled: a("debug-breakpoint-log-disabled", 60075),
		briefcase: a("briefcase", 60076),
		broadcast: a("broadcast", 60077),
		browser: a("browser", 60078),
		bug: a("bug", 60079),
		calendar: a("calendar", 60080),
		caseSensitive: a("case-sensitive", 60081),
		check: a("check", 60082),
		checklist: a("checklist", 60083),
		chevronDown: a("chevron-down", 60084),
		chevronLeft: a("chevron-left", 60085),
		chevronRight: a("chevron-right", 60086),
		chevronUp: a("chevron-up", 60087),
		chromeClose: a("chrome-close", 60088),
		chromeMaximize: a("chrome-maximize", 60089),
		chromeMinimize: a("chrome-minimize", 60090),
		chromeRestore: a("chrome-restore", 60091),
		circleOutline: a("circle-outline", 60092),
		circle: a("circle", 60092),
		debugBreakpointUnverified: a("debug-breakpoint-unverified", 60092),
		terminalDecorationIncomplete: a("terminal-decoration-incomplete", 60092),
		circleSlash: a("circle-slash", 60093),
		circuitBoard: a("circuit-board", 60094),
		clearAll: a("clear-all", 60095),
		clippy: a("clippy", 60096),
		closeAll: a("close-all", 60097),
		cloudDownload: a("cloud-download", 60098),
		cloudUpload: a("cloud-upload", 60099),
		code: a("code", 60100),
		collapseAll: a("collapse-all", 60101),
		colorMode: a("color-mode", 60102),
		commentDiscussion: a("comment-discussion", 60103),
		creditCard: a("credit-card", 60105),
		dash: a("dash", 60108),
		dashboard: a("dashboard", 60109),
		database: a("database", 60110),
		debugContinue: a("debug-continue", 60111),
		debugDisconnect: a("debug-disconnect", 60112),
		debugPause: a("debug-pause", 60113),
		debugRestart: a("debug-restart", 60114),
		debugStart: a("debug-start", 60115),
		debugStepInto: a("debug-step-into", 60116),
		debugStepOut: a("debug-step-out", 60117),
		debugStepOver: a("debug-step-over", 60118),
		debugStop: a("debug-stop", 60119),
		debug: a("debug", 60120),
		deviceCameraVideo: a("device-camera-video", 60121),
		deviceCamera: a("device-camera", 60122),
		deviceMobile: a("device-mobile", 60123),
		diffAdded: a("diff-added", 60124),
		diffIgnored: a("diff-ignored", 60125),
		diffModified: a("diff-modified", 60126),
		diffRemoved: a("diff-removed", 60127),
		diffRenamed: a("diff-renamed", 60128),
		diff: a("diff", 60129),
		diffSidebyside: a("diff-sidebyside", 60129),
		discard: a("discard", 60130),
		editorLayout: a("editor-layout", 60131),
		emptyWindow: a("empty-window", 60132),
		exclude: a("exclude", 60133),
		extensions: a("extensions", 60134),
		eyeClosed: a("eye-closed", 60135),
		fileBinary: a("file-binary", 60136),
		fileCode: a("file-code", 60137),
		fileMedia: a("file-media", 60138),
		filePdf: a("file-pdf", 60139),
		fileSubmodule: a("file-submodule", 60140),
		fileSymlinkDirectory: a("file-symlink-directory", 60141),
		fileSymlinkFile: a("file-symlink-file", 60142),
		fileZip: a("file-zip", 60143),
		files: a("files", 60144),
		filter: a("filter", 60145),
		flame: a("flame", 60146),
		foldDown: a("fold-down", 60147),
		foldUp: a("fold-up", 60148),
		fold: a("fold", 60149),
		folderActive: a("folder-active", 60150),
		folderOpened: a("folder-opened", 60151),
		gear: a("gear", 60152),
		gift: a("gift", 60153),
		gistSecret: a("gist-secret", 60154),
		gist: a("gist", 60155),
		gitCommit: a("git-commit", 60156),
		gitCompare: a("git-compare", 60157),
		compareChanges: a("compare-changes", 60157),
		gitMerge: a("git-merge", 60158),
		githubAction: a("github-action", 60159),
		githubAlt: a("github-alt", 60160),
		globe: a("globe", 60161),
		grabber: a("grabber", 60162),
		graph: a("graph", 60163),
		gripper: a("gripper", 60164),
		heart: a("heart", 60165),
		home: a("home", 60166),
		horizontalRule: a("horizontal-rule", 60167),
		hubot: a("hubot", 60168),
		inbox: a("inbox", 60169),
		issueReopened: a("issue-reopened", 60171),
		issues: a("issues", 60172),
		italic: a("italic", 60173),
		jersey: a("jersey", 60174),
		json: a("json", 60175),
		kebabVertical: a("kebab-vertical", 60176),
		key: a("key", 60177),
		law: a("law", 60178),
		lightbulbAutofix: a("lightbulb-autofix", 60179),
		linkExternal: a("link-external", 60180),
		link: a("link", 60181),
		listOrdered: a("list-ordered", 60182),
		listUnordered: a("list-unordered", 60183),
		liveShare: a("live-share", 60184),
		loading: a("loading", 60185),
		location: a("location", 60186),
		mailRead: a("mail-read", 60187),
		mail: a("mail", 60188),
		markdown: a("markdown", 60189),
		megaphone: a("megaphone", 60190),
		mention: a("mention", 60191),
		milestone: a("milestone", 60192),
		gitPullRequestMilestone: a("git-pull-request-milestone", 60192),
		mortarBoard: a("mortar-board", 60193),
		move: a("move", 60194),
		multipleWindows: a("multiple-windows", 60195),
		mute: a("mute", 60196),
		noNewline: a("no-newline", 60197),
		note: a("note", 60198),
		octoface: a("octoface", 60199),
		openPreview: a("open-preview", 60200),
		package: a("package", 60201),
		paintcan: a("paintcan", 60202),
		pin: a("pin", 60203),
		play: a("play", 60204),
		run: a("run", 60204),
		plug: a("plug", 60205),
		preserveCase: a("preserve-case", 60206),
		preview: a("preview", 60207),
		project: a("project", 60208),
		pulse: a("pulse", 60209),
		question: a("question", 60210),
		quote: a("quote", 60211),
		radioTower: a("radio-tower", 60212),
		reactions: a("reactions", 60213),
		references: a("references", 60214),
		refresh: a("refresh", 60215),
		regex: a("regex", 60216),
		remoteExplorer: a("remote-explorer", 60217),
		remote: a("remote", 60218),
		remove: a("remove", 60219),
		replaceAll: a("replace-all", 60220),
		replace: a("replace", 60221),
		repoClone: a("repo-clone", 60222),
		repoForcePush: a("repo-force-push", 60223),
		repoPull: a("repo-pull", 60224),
		repoPush: a("repo-push", 60225),
		report: a("report", 60226),
		requestChanges: a("request-changes", 60227),
		rocket: a("rocket", 60228),
		rootFolderOpened: a("root-folder-opened", 60229),
		rootFolder: a("root-folder", 60230),
		rss: a("rss", 60231),
		ruby: a("ruby", 60232),
		saveAll: a("save-all", 60233),
		saveAs: a("save-as", 60234),
		save: a("save", 60235),
		screenFull: a("screen-full", 60236),
		screenNormal: a("screen-normal", 60237),
		searchStop: a("search-stop", 60238),
		server: a("server", 60240),
		settingsGear: a("settings-gear", 60241),
		settings: a("settings", 60242),
		shield: a("shield", 60243),
		smiley: a("smiley", 60244),
		sortPrecedence: a("sort-precedence", 60245),
		splitHorizontal: a("split-horizontal", 60246),
		splitVertical: a("split-vertical", 60247),
		squirrel: a("squirrel", 60248),
		starFull: a("star-full", 60249),
		starHalf: a("star-half", 60250),
		symbolClass: a("symbol-class", 60251),
		symbolColor: a("symbol-color", 60252),
		symbolConstant: a("symbol-constant", 60253),
		symbolEnumMember: a("symbol-enum-member", 60254),
		symbolField: a("symbol-field", 60255),
		symbolFile: a("symbol-file", 60256),
		symbolInterface: a("symbol-interface", 60257),
		symbolKeyword: a("symbol-keyword", 60258),
		symbolMisc: a("symbol-misc", 60259),
		symbolOperator: a("symbol-operator", 60260),
		symbolProperty: a("symbol-property", 60261),
		wrench: a("wrench", 60261),
		wrenchSubaction: a("wrench-subaction", 60261),
		symbolSnippet: a("symbol-snippet", 60262),
		tasklist: a("tasklist", 60263),
		telescope: a("telescope", 60264),
		textSize: a("text-size", 60265),
		threeBars: a("three-bars", 60266),
		thumbsdown: a("thumbsdown", 60267),
		thumbsup: a("thumbsup", 60268),
		tools: a("tools", 60269),
		triangleDown: a("triangle-down", 60270),
		triangleLeft: a("triangle-left", 60271),
		triangleRight: a("triangle-right", 60272),
		triangleUp: a("triangle-up", 60273),
		twitter: a("twitter", 60274),
		unfold: a("unfold", 60275),
		unlock: a("unlock", 60276),
		unmute: a("unmute", 60277),
		unverified: a("unverified", 60278),
		verified: a("verified", 60279),
		versions: a("versions", 60280),
		vmActive: a("vm-active", 60281),
		vmOutline: a("vm-outline", 60282),
		vmRunning: a("vm-running", 60283),
		watch: a("watch", 60284),
		whitespace: a("whitespace", 60285),
		wholeWord: a("whole-word", 60286),
		window: a("window", 60287),
		wordWrap: a("word-wrap", 60288),
		zoomIn: a("zoom-in", 60289),
		zoomOut: a("zoom-out", 60290),
		listFilter: a("list-filter", 60291),
		listFlat: a("list-flat", 60292),
		listSelection: a("list-selection", 60293),
		selection: a("selection", 60293),
		listTree: a("list-tree", 60294),
		debugBreakpointFunctionUnverified: a("debug-breakpoint-function-unverified", 60295),
		debugBreakpointFunction: a("debug-breakpoint-function", 60296),
		debugBreakpointFunctionDisabled: a("debug-breakpoint-function-disabled", 60296),
		debugStackframeActive: a("debug-stackframe-active", 60297),
		circleSmallFilled: a("circle-small-filled", 60298),
		debugStackframeDot: a("debug-stackframe-dot", 60298),
		terminalDecorationMark: a("terminal-decoration-mark", 60298),
		debugStackframe: a("debug-stackframe", 60299),
		debugStackframeFocused: a("debug-stackframe-focused", 60299),
		debugBreakpointUnsupported: a("debug-breakpoint-unsupported", 60300),
		symbolString: a("symbol-string", 60301),
		debugReverseContinue: a("debug-reverse-continue", 60302),
		debugStepBack: a("debug-step-back", 60303),
		debugRestartFrame: a("debug-restart-frame", 60304),
		debugAlt: a("debug-alt", 60305),
		callIncoming: a("call-incoming", 60306),
		callOutgoing: a("call-outgoing", 60307),
		menu: a("menu", 60308),
		expandAll: a("expand-all", 60309),
		feedback: a("feedback", 60310),
		gitPullRequestReviewer: a("git-pull-request-reviewer", 60310),
		groupByRefType: a("group-by-ref-type", 60311),
		ungroupByRefType: a("ungroup-by-ref-type", 60312),
		account: a("account", 60313),
		gitPullRequestAssignee: a("git-pull-request-assignee", 60313),
		bellDot: a("bell-dot", 60314),
		debugConsole: a("debug-console", 60315),
		library: a("library", 60316),
		output: a("output", 60317),
		runAll: a("run-all", 60318),
		syncIgnored: a("sync-ignored", 60319),
		pinned: a("pinned", 60320),
		githubInverted: a("github-inverted", 60321),
		serverProcess: a("server-process", 60322),
		serverEnvironment: a("server-environment", 60323),
		pass: a("pass", 60324),
		issueClosed: a("issue-closed", 60324),
		stopCircle: a("stop-circle", 60325),
		playCircle: a("play-circle", 60326),
		record: a("record", 60327),
		debugAltSmall: a("debug-alt-small", 60328),
		vmConnect: a("vm-connect", 60329),
		cloud: a("cloud", 60330),
		merge: a("merge", 60331),
		export: a("export", 60332),
		graphLeft: a("graph-left", 60333),
		magnet: a("magnet", 60334),
		notebook: a("notebook", 60335),
		redo: a("redo", 60336),
		checkAll: a("check-all", 60337),
		pinnedDirty: a("pinned-dirty", 60338),
		passFilled: a("pass-filled", 60339),
		circleLargeFilled: a("circle-large-filled", 60340),
		circleLarge: a("circle-large", 60341),
		circleLargeOutline: a("circle-large-outline", 60341),
		combine: a("combine", 60342),
		gather: a("gather", 60342),
		table: a("table", 60343),
		variableGroup: a("variable-group", 60344),
		typeHierarchy: a("type-hierarchy", 60345),
		typeHierarchySub: a("type-hierarchy-sub", 60346),
		typeHierarchySuper: a("type-hierarchy-super", 60347),
		gitPullRequestCreate: a("git-pull-request-create", 60348),
		runAbove: a("run-above", 60349),
		runBelow: a("run-below", 60350),
		notebookTemplate: a("notebook-template", 60351),
		debugRerun: a("debug-rerun", 60352),
		workspaceTrusted: a("workspace-trusted", 60353),
		workspaceUntrusted: a("workspace-untrusted", 60354),
		workspaceUnknown: a("workspace-unknown", 60355),
		terminalCmd: a("terminal-cmd", 60356),
		terminalDebian: a("terminal-debian", 60357),
		terminalLinux: a("terminal-linux", 60358),
		terminalPowershell: a("terminal-powershell", 60359),
		terminalTmux: a("terminal-tmux", 60360),
		terminalUbuntu: a("terminal-ubuntu", 60361),
		terminalBash: a("terminal-bash", 60362),
		arrowSwap: a("arrow-swap", 60363),
		copy: a("copy", 60364),
		personAdd: a("person-add", 60365),
		filterFilled: a("filter-filled", 60366),
		wand: a("wand", 60367),
		debugLineByLine: a("debug-line-by-line", 60368),
		inspect: a("inspect", 60369),
		layers: a("layers", 60370),
		layersDot: a("layers-dot", 60371),
		layersActive: a("layers-active", 60372),
		compass: a("compass", 60373),
		compassDot: a("compass-dot", 60374),
		compassActive: a("compass-active", 60375),
		azure: a("azure", 60376),
		issueDraft: a("issue-draft", 60377),
		gitPullRequestClosed: a("git-pull-request-closed", 60378),
		gitPullRequestDraft: a("git-pull-request-draft", 60379),
		debugAll: a("debug-all", 60380),
		debugCoverage: a("debug-coverage", 60381),
		runErrors: a("run-errors", 60382),
		folderLibrary: a("folder-library", 60383),
		debugContinueSmall: a("debug-continue-small", 60384),
		beakerStop: a("beaker-stop", 60385),
		graphLine: a("graph-line", 60386),
		graphScatter: a("graph-scatter", 60387),
		pieChart: a("pie-chart", 60388),
		bracket: a("bracket", 60175),
		bracketDot: a("bracket-dot", 60389),
		bracketError: a("bracket-error", 60390),
		lockSmall: a("lock-small", 60391),
		azureDevops: a("azure-devops", 60392),
		verifiedFilled: a("verified-filled", 60393),
		newline: a("newline", 60394),
		layout: a("layout", 60395),
		layoutActivitybarLeft: a("layout-activitybar-left", 60396),
		layoutActivitybarRight: a("layout-activitybar-right", 60397),
		layoutPanelLeft: a("layout-panel-left", 60398),
		layoutPanelCenter: a("layout-panel-center", 60399),
		layoutPanelJustify: a("layout-panel-justify", 60400),
		layoutPanelRight: a("layout-panel-right", 60401),
		layoutPanel: a("layout-panel", 60402),
		layoutSidebarLeft: a("layout-sidebar-left", 60403),
		layoutSidebarRight: a("layout-sidebar-right", 60404),
		layoutStatusbar: a("layout-statusbar", 60405),
		layoutMenubar: a("layout-menubar", 60406),
		layoutCentered: a("layout-centered", 60407),
		target: a("target", 60408),
		indent: a("indent", 60409),
		recordSmall: a("record-small", 60410),
		errorSmall: a("error-small", 60411),
		terminalDecorationError: a("terminal-decoration-error", 60411),
		arrowCircleDown: a("arrow-circle-down", 60412),
		arrowCircleLeft: a("arrow-circle-left", 60413),
		arrowCircleRight: a("arrow-circle-right", 60414),
		arrowCircleUp: a("arrow-circle-up", 60415),
		layoutSidebarRightOff: a("layout-sidebar-right-off", 60416),
		layoutPanelOff: a("layout-panel-off", 60417),
		layoutSidebarLeftOff: a("layout-sidebar-left-off", 60418),
		blank: a("blank", 60419),
		heartFilled: a("heart-filled", 60420),
		map: a("map", 60421),
		mapHorizontal: a("map-horizontal", 60421),
		foldHorizontal: a("fold-horizontal", 60421),
		mapFilled: a("map-filled", 60422),
		mapHorizontalFilled: a("map-horizontal-filled", 60422),
		foldHorizontalFilled: a("fold-horizontal-filled", 60422),
		circleSmall: a("circle-small", 60423),
		bellSlash: a("bell-slash", 60424),
		bellSlashDot: a("bell-slash-dot", 60425),
		commentUnresolved: a("comment-unresolved", 60426),
		gitPullRequestGoToChanges: a("git-pull-request-go-to-changes", 60427),
		gitPullRequestNewChanges: a("git-pull-request-new-changes", 60428),
		searchFuzzy: a("search-fuzzy", 60429),
		commentDraft: a("comment-draft", 60430),
		send: a("send", 60431),
		sparkle: a("sparkle", 60432),
		insert: a("insert", 60433),
		mic: a("mic", 60434),
		thumbsdownFilled: a("thumbsdown-filled", 60435),
		thumbsupFilled: a("thumbsup-filled", 60436),
		coffee: a("coffee", 60437),
		snake: a("snake", 60438),
		game: a("game", 60439),
		vr: a("vr", 60440),
		chip: a("chip", 60441),
		piano: a("piano", 60442),
		music: a("music", 60443),
		micFilled: a("mic-filled", 60444),
		repoFetch: a("repo-fetch", 60445),
		copilot: a("copilot", 60446),
		lightbulbSparkle: a("lightbulb-sparkle", 60447),
		robot: a("robot", 60448),
		sparkleFilled: a("sparkle-filled", 60449),
		diffSingle: a("diff-single", 60450),
		diffMultiple: a("diff-multiple", 60451),
		surroundWith: a("surround-with", 60452),
		share: a("share", 60453),
		gitStash: a("git-stash", 60454),
		gitStashApply: a("git-stash-apply", 60455),
		gitStashPop: a("git-stash-pop", 60456),
		vscode: a("vscode", 60457),
		vscodeInsiders: a("vscode-insiders", 60458),
		codeOss: a("code-oss", 60459),
		runCoverage: a("run-coverage", 60460),
		runAllCoverage: a("run-all-coverage", 60461),
		coverage: a("coverage", 60462),
		githubProject: a("github-project", 60463),
		mapVertical: a("map-vertical", 60464),
		foldVertical: a("fold-vertical", 60464),
		mapVerticalFilled: a("map-vertical-filled", 60465),
		foldVerticalFilled: a("fold-vertical-filled", 60465),
		goToSearch: a("go-to-search", 60466),
		percentage: a("percentage", 60467),
		sortPercentage: a("sort-percentage", 60467),
		attach: a("attach", 60468)
	}, qi = {
		dialogError: a("dialog-error", "error"),
		dialogWarning: a("dialog-warning", "warning"),
		dialogInfo: a("dialog-info", "info"),
		dialogClose: a("dialog-close", "close"),
		treeItemExpanded: a("tree-item-expanded", "chevron-down"),
		treeFilterOnTypeOn: a("tree-filter-on-type-on", "list-filter"),
		treeFilterOnTypeOff: a("tree-filter-on-type-off", "list-selection"),
		treeFilterClear: a("tree-filter-clear", "close"),
		treeItemLoading: a("tree-item-loading", "loading"),
		menuSelection: a("menu-selection", "check"),
		menuSubmenu: a("menu-submenu", "chevron-right"),
		menuBarMore: a("menubar-more", "more"),
		scrollbarButtonLeft: a("scrollbar-button-left", "triangle-left"),
		scrollbarButtonRight: a("scrollbar-button-right", "triangle-right"),
		scrollbarButtonUp: a("scrollbar-button-up", "triangle-up"),
		scrollbarButtonDown: a("scrollbar-button-down", "triangle-down"),
		toolBarMore: a("toolbar-more", "more"),
		quickInputBack: a("quick-input-back", "arrow-left"),
		dropDownButton: a("drop-down-button", 60084),
		symbolCustomColor: a("symbol-customcolor", 60252),
		exportIcon: a("export", 60332),
		workspaceUnspecified: a("workspace-unspecified", 60355),
		newLine: a("newline", 60394),
		thumbsDownFilled: a("thumbsdown-filled", 60435),
		thumbsUpFilled: a("thumbsup-filled", 60436),
		gitFetch: a("git-fetch", 60445),
		lightbulbSparkleAutofix: a("lightbulb-sparkle-autofix", 60447),
		debugBreakpointPending: a("debug-breakpoint-pending", 60377)
	}, M = {
		...Bi,
		...qi
	};
	var sn = class {
		constructor() {
			this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new se(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
		}
		handleChange(e) {
			this._onDidChange.fire({
				changedLanguages: e,
				changedColorMap: !1
			});
		}
		register(e, t) {
			return this._tokenizationSupports.set(e, t), this.handleChange([e]), rt(() => {
				this._tokenizationSupports.get(e) === t && (this._tokenizationSupports.delete(e), this.handleChange([e]));
			});
		}
		get(e) {
			return this._tokenizationSupports.get(e) || null;
		}
		registerFactory(e, t) {
			this._factories.get(e)?.dispose();
			const n = new Ui(this, e, t);
			return this._factories.set(e, n), rt(() => {
				const r = this._factories.get(e);
				!r || r !== n || (this._factories.delete(e), r.dispose());
			});
		}
		async getOrCreate(e) {
			const t = this.get(e);
			if (t) return t;
			const n = this._factories.get(e);
			return !n || n.isResolved ? null : (await n.resolve(), this.get(e));
		}
		isResolved(e) {
			if (this.get(e)) return !0;
			const t = this._factories.get(e);
			return !!(!t || t.isResolved);
		}
		setColorMap(e) {
			this._colorMap = e, this._onDidChange.fire({
				changedLanguages: Array.from(this._tokenizationSupports.keys()),
				changedColorMap: !0
			});
		}
		getColorMap() {
			return this._colorMap;
		}
		getDefaultBackground() {
			return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null;
		}
	}, Ui = class extends st {
		get isResolved() {
			return this._isResolved;
		}
		constructor(e, t, n) {
			super(), this._registry = e, this._languageId = t, this._factory = n, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
		}
		dispose() {
			this._isDisposed = !0, super.dispose();
		}
		async resolve() {
			return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise;
		}
		async _create() {
			const e = await this._factory.tokenizationSupport;
			this._isResolved = !0, e && !this._isDisposed && this._register(this._registry.register(this._languageId, e));
		}
	}, Hi = class {
		constructor(e, t, n) {
			this.offset = e, this.type = t, this.language = n, this._tokenBrand = void 0;
		}
		toString() {
			return "(" + this.offset + ", " + this.type + ")";
		}
	}, an;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(an || (an = {}));
	var on;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, M.symbolMethod), t.set(1, M.symbolFunction), t.set(2, M.symbolConstructor), t.set(3, M.symbolField), t.set(4, M.symbolVariable), t.set(5, M.symbolClass), t.set(6, M.symbolStruct), t.set(7, M.symbolInterface), t.set(8, M.symbolModule), t.set(9, M.symbolProperty), t.set(10, M.symbolEvent), t.set(11, M.symbolOperator), t.set(12, M.symbolUnit), t.set(13, M.symbolValue), t.set(15, M.symbolEnum), t.set(14, M.symbolConstant), t.set(15, M.symbolEnum), t.set(16, M.symbolEnumMember), t.set(17, M.symbolKeyword), t.set(27, M.symbolSnippet), t.set(18, M.symbolText), t.set(19, M.symbolColor), t.set(20, M.symbolFile), t.set(21, M.symbolReference), t.set(22, M.symbolCustomColor), t.set(23, M.symbolFolder), t.set(24, M.symbolTypeParameter), t.set(25, M.account), t.set(26, M.issues);
		function n(i) {
			let o = t.get(i);
			return o || (console.info("No codicon found for CompletionItemKind " + i), o = M.symbolProperty), o;
		}
		e.toIcon = n;
		const r = /* @__PURE__ */ new Map();
		r.set("method", 0), r.set("function", 1), r.set("constructor", 2), r.set("field", 3), r.set("variable", 4), r.set("class", 5), r.set("struct", 6), r.set("interface", 7), r.set("module", 8), r.set("property", 9), r.set("event", 10), r.set("operator", 11), r.set("unit", 12), r.set("value", 13), r.set("constant", 14), r.set("enum", 15), r.set("enum-member", 16), r.set("enumMember", 16), r.set("keyword", 17), r.set("snippet", 27), r.set("text", 18), r.set("color", 19), r.set("file", 20), r.set("reference", 21), r.set("customcolor", 22), r.set("folder", 23), r.set("type-parameter", 24), r.set("typeParameter", 24), r.set("account", 25), r.set("issue", 26);
		function s(i, o) {
			let l = r.get(i);
			return typeof l > "u" && !o && (l = 9), l;
		}
		e.fromString = s;
	})(on || (on = {}));
	var ln;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(ln || (ln = {}));
	var un;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
	})(un || (un = {}));
	var cn;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(cn || (cn = {}));
	var hn;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(hn || (hn = {}));
	q("Array", "array"), q("Boolean", "boolean"), q("Class", "class"), q("Constant", "constant"), q("Constructor", "constructor"), q("Enum", "enumeration"), q("EnumMember", "enumeration member"), q("Event", "event"), q("Field", "field"), q("File", "file"), q("Function", "function"), q("Interface", "interface"), q("Key", "key"), q("Method", "method"), q("Module", "module"), q("Namespace", "namespace"), q("Null", "null"), q("Number", "number"), q("Object", "object"), q("Operator", "operator"), q("Package", "package"), q("Property", "property"), q("String", "string"), q("Struct", "struct"), q("TypeParameter", "type parameter"), q("Variable", "variable");
	var mn;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, M.symbolFile), t.set(1, M.symbolModule), t.set(2, M.symbolNamespace), t.set(3, M.symbolPackage), t.set(4, M.symbolClass), t.set(5, M.symbolMethod), t.set(6, M.symbolProperty), t.set(7, M.symbolField), t.set(8, M.symbolConstructor), t.set(9, M.symbolEnum), t.set(10, M.symbolInterface), t.set(11, M.symbolFunction), t.set(12, M.symbolVariable), t.set(13, M.symbolConstant), t.set(14, M.symbolString), t.set(15, M.symbolNumber), t.set(16, M.symbolBoolean), t.set(17, M.symbolArray), t.set(18, M.symbolObject), t.set(19, M.symbolKey), t.set(20, M.symbolNull), t.set(21, M.symbolEnumMember), t.set(22, M.symbolStruct), t.set(23, M.symbolEvent), t.set(24, M.symbolOperator), t.set(25, M.symbolTypeParameter);
		function n(r) {
			let s = t.get(r);
			return s || (console.info("No codicon found for SymbolKind " + r), s = M.symbolProperty), s;
		}
		e.toIcon = n;
	})(mn || (mn = {}));
	(class Se {
		static {
			this.Comment = new Se("comment");
		}
		static {
			this.Imports = new Se("imports");
		}
		static {
			this.Region = new Se("region");
		}
		static fromValue(t) {
			switch (t) {
				case "comment": return Se.Comment;
				case "imports": return Se.Imports;
				case "region": return Se.Region;
			}
			return new Se(t);
		}
		constructor(t) {
			this.value = t;
		}
	});
	var fn;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(fn || (fn = {}));
	var dn;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(dn || (dn = {}));
	var gn;
	(function(e) {
		function t(n) {
			return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
		}
		e.is = t;
	})(gn || (gn = {}));
	var pn;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(pn || (pn = {}));
	new sn();
	new sn();
	var bn;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(bn || (bn = {}));
	var yn;
	(function(e) {
		e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
	})(yn || (yn = {}));
	var _n;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
	})(_n || (_n = {}));
	var vn;
	(function(e) {
		e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
	})(vn || (vn = {}));
	var wn;
	(function(e) {
		e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
	})(wn || (wn = {}));
	var Ln;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Ln || (Ln = {}));
	var Nn;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
	})(Nn || (Nn = {}));
	var Sn;
	(function(e) {
		e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
	})(Sn || (Sn = {}));
	var Cn;
	(function(e) {
		e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
	})(Cn || (Cn = {}));
	var Rn;
	(function(e) {
		e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Rn || (Rn = {}));
	var An;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(An || (An = {}));
	var En;
	(function(e) {
		e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
	})(En || (En = {}));
	var xn;
	(function(e) {
		e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.emptySelectionClipboard = 37] = "emptySelectionClipboard", e[e.experimentalWhitespaceRendering = 38] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 39] = "extraEditorClassName", e[e.fastScrollSensitivity = 40] = "fastScrollSensitivity", e[e.find = 41] = "find", e[e.fixedOverflowWidgets = 42] = "fixedOverflowWidgets", e[e.folding = 43] = "folding", e[e.foldingStrategy = 44] = "foldingStrategy", e[e.foldingHighlight = 45] = "foldingHighlight", e[e.foldingImportsByDefault = 46] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 47] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 48] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 49] = "fontFamily", e[e.fontInfo = 50] = "fontInfo", e[e.fontLigatures = 51] = "fontLigatures", e[e.fontSize = 52] = "fontSize", e[e.fontWeight = 53] = "fontWeight", e[e.fontVariations = 54] = "fontVariations", e[e.formatOnPaste = 55] = "formatOnPaste", e[e.formatOnType = 56] = "formatOnType", e[e.glyphMargin = 57] = "glyphMargin", e[e.gotoLocation = 58] = "gotoLocation", e[e.hideCursorInOverviewRuler = 59] = "hideCursorInOverviewRuler", e[e.hover = 60] = "hover", e[e.inDiffEditor = 61] = "inDiffEditor", e[e.inlineSuggest = 62] = "inlineSuggest", e[e.inlineEdit = 63] = "inlineEdit", e[e.letterSpacing = 64] = "letterSpacing", e[e.lightbulb = 65] = "lightbulb", e[e.lineDecorationsWidth = 66] = "lineDecorationsWidth", e[e.lineHeight = 67] = "lineHeight", e[e.lineNumbers = 68] = "lineNumbers", e[e.lineNumbersMinChars = 69] = "lineNumbersMinChars", e[e.linkedEditing = 70] = "linkedEditing", e[e.links = 71] = "links", e[e.matchBrackets = 72] = "matchBrackets", e[e.minimap = 73] = "minimap", e[e.mouseStyle = 74] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 75] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 76] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 77] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 78] = "multiCursorModifier", e[e.multiCursorPaste = 79] = "multiCursorPaste", e[e.multiCursorLimit = 80] = "multiCursorLimit", e[e.occurrencesHighlight = 81] = "occurrencesHighlight", e[e.overviewRulerBorder = 82] = "overviewRulerBorder", e[e.overviewRulerLanes = 83] = "overviewRulerLanes", e[e.padding = 84] = "padding", e[e.pasteAs = 85] = "pasteAs", e[e.parameterHints = 86] = "parameterHints", e[e.peekWidgetDefaultFocus = 87] = "peekWidgetDefaultFocus", e[e.placeholder = 88] = "placeholder", e[e.definitionLinkOpensInPeek = 89] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 90] = "quickSuggestions", e[e.quickSuggestionsDelay = 91] = "quickSuggestionsDelay", e[e.readOnly = 92] = "readOnly", e[e.readOnlyMessage = 93] = "readOnlyMessage", e[e.renameOnType = 94] = "renameOnType", e[e.renderControlCharacters = 95] = "renderControlCharacters", e[e.renderFinalNewline = 96] = "renderFinalNewline", e[e.renderLineHighlight = 97] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 98] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 99] = "renderValidationDecorations", e[e.renderWhitespace = 100] = "renderWhitespace", e[e.revealHorizontalRightPadding = 101] = "revealHorizontalRightPadding", e[e.roundedSelection = 102] = "roundedSelection", e[e.rulers = 103] = "rulers", e[e.scrollbar = 104] = "scrollbar", e[e.scrollBeyondLastColumn = 105] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 106] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 107] = "scrollPredominantAxis", e[e.selectionClipboard = 108] = "selectionClipboard", e[e.selectionHighlight = 109] = "selectionHighlight", e[e.selectOnLineNumbers = 110] = "selectOnLineNumbers", e[e.showFoldingControls = 111] = "showFoldingControls", e[e.showUnused = 112] = "showUnused", e[e.snippetSuggestions = 113] = "snippetSuggestions", e[e.smartSelect = 114] = "smartSelect", e[e.smoothScrolling = 115] = "smoothScrolling", e[e.stickyScroll = 116] = "stickyScroll", e[e.stickyTabStops = 117] = "stickyTabStops", e[e.stopRenderingLineAfter = 118] = "stopRenderingLineAfter", e[e.suggest = 119] = "suggest", e[e.suggestFontSize = 120] = "suggestFontSize", e[e.suggestLineHeight = 121] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 122] = "suggestOnTriggerCharacters", e[e.suggestSelection = 123] = "suggestSelection", e[e.tabCompletion = 124] = "tabCompletion", e[e.tabIndex = 125] = "tabIndex", e[e.unicodeHighlighting = 126] = "unicodeHighlighting", e[e.unusualLineTerminators = 127] = "unusualLineTerminators", e[e.useShadowDOM = 128] = "useShadowDOM", e[e.useTabStops = 129] = "useTabStops", e[e.wordBreak = 130] = "wordBreak", e[e.wordSegmenterLocales = 131] = "wordSegmenterLocales", e[e.wordSeparators = 132] = "wordSeparators", e[e.wordWrap = 133] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 134] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 135] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 136] = "wordWrapColumn", e[e.wordWrapOverride1 = 137] = "wordWrapOverride1", e[e.wordWrapOverride2 = 138] = "wordWrapOverride2", e[e.wrappingIndent = 139] = "wrappingIndent", e[e.wrappingStrategy = 140] = "wrappingStrategy", e[e.showDeprecated = 141] = "showDeprecated", e[e.inlayHints = 142] = "inlayHints", e[e.editorClassName = 143] = "editorClassName", e[e.pixelRatio = 144] = "pixelRatio", e[e.tabFocusMode = 145] = "tabFocusMode", e[e.layoutInfo = 146] = "layoutInfo", e[e.wrappingInfo = 147] = "wrappingInfo", e[e.defaultColorDecorators = 148] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 149] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 150] = "inlineCompletionsAccessibilityVerbose";
	})(xn || (xn = {}));
	var Mn;
	(function(e) {
		e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Mn || (Mn = {}));
	var kn;
	(function(e) {
		e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
	})(kn || (kn = {}));
	var Pn;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(Pn || (Pn = {}));
	var Dn;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(Dn || (Dn = {}));
	var Fn;
	(function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(Fn || (Fn = {}));
	var Tn;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(Tn || (Tn = {}));
	var In;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(In || (In = {}));
	var Vn;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(Vn || (Vn = {}));
	var Bn;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Bn || (Bn = {}));
	var r1;
	(function(e) {
		e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
	})(r1 || (r1 = {}));
	var s1;
	(function(e) {
		e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
	})(s1 || (s1 = {}));
	var i1;
	(function(e) {
		e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
	})(i1 || (i1 = {}));
	var qn;
	(function(e) {
		e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
	})(qn || (qn = {}));
	var Un;
	(function(e) {
		e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
	})(Un || (Un = {}));
	var Hn;
	(function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
	})(Hn || (Hn = {}));
	var $n;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})($n || ($n = {}));
	var Wn;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Wn || (Wn = {}));
	var zn;
	(function(e) {
		e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
	})(zn || (zn = {}));
	var On;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(On || (On = {}));
	var jn;
	(function(e) {
		e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
	})(jn || (jn = {}));
	var Gn;
	(function(e) {
		e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
	})(Gn || (Gn = {}));
	var Xn;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
	})(Xn || (Xn = {}));
	var Yn;
	(function(e) {
		e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
	})(Yn || (Yn = {}));
	var Qn;
	(function(e) {
		e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
	})(Qn || (Qn = {}));
	var Jn;
	(function(e) {
		e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
	})(Jn || (Jn = {}));
	var a1;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(a1 || (a1 = {}));
	var Zn;
	(function(e) {
		e.Off = "off", e.OnCode = "onCode", e.On = "on";
	})(Zn || (Zn = {}));
	var Kn;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(Kn || (Kn = {}));
	var er;
	(function(e) {
		e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
	})(er || (er = {}));
	var tr;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(tr || (tr = {}));
	var nr;
	(function(e) {
		e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
	})(nr || (nr = {}));
	var rr;
	(function(e) {
		e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
	})(rr || (rr = {}));
	var sr;
	(function(e) {
		e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
	})(sr || (sr = {}));
	var ir;
	(function(e) {
		e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
	})(ir || (ir = {}));
	var $i = class {
		static {
			this.CtrlCmd = 2048;
		}
		static {
			this.Shift = 1024;
		}
		static {
			this.Alt = 512;
		}
		static {
			this.WinCtrl = 256;
		}
		static chord(e, t) {
			return Ti(e, t);
		}
	};
	function Wi() {
		return {
			editor: void 0,
			languages: void 0,
			CancellationTokenSource: xi,
			Emitter: se,
			KeyCode: r1,
			KeyMod: $i,
			Position: z,
			Range: T,
			Selection: Ii,
			SelectionDirection: a1,
			MarkerSeverity: s1,
			MarkerTag: i1,
			Uri: ue,
			Token: Hi
		};
	}
	var zi = class S1 {
		static {
			this.CHANNEL_NAME = "editorWorkerHost";
		}
		static getChannel(t) {
			return t.getChannel(S1.CHANNEL_NAME);
		}
		static setChannel(t, n) {
			t.setChannel(S1.CHANNEL_NAME, n);
		}
	}, ar, or, Oi = class {
		constructor(e, t) {
			this.uri = e, this.value = t;
		}
	};
	function ji(e) {
		return Array.isArray(e);
	}
	(class et {
		static {
			this.defaultToKey = (t) => t.toString();
		}
		constructor(t, n) {
			if (this[ar] = "ResourceMap", t instanceof et) this.map = new Map(t.map), this.toKey = n ?? et.defaultToKey;
			else if (ji(t)) {
				this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? et.defaultToKey;
				for (const [r, s] of t) this.set(r, s);
			} else this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? et.defaultToKey;
		}
		set(t, n) {
			return this.map.set(this.toKey(t), new Oi(t, n)), this;
		}
		get(t) {
			return this.map.get(this.toKey(t))?.value;
		}
		has(t) {
			return this.map.has(this.toKey(t));
		}
		get size() {
			return this.map.size;
		}
		clear() {
			this.map.clear();
		}
		delete(t) {
			return this.map.delete(this.toKey(t));
		}
		forEach(t, n) {
			typeof n < "u" && (t = t.bind(n));
			for (const [r, s] of this.map) t(s.value, s.uri, this);
		}
		*values() {
			for (const t of this.map.values()) yield t.value;
		}
		*keys() {
			for (const t of this.map.values()) yield t.uri;
		}
		*entries() {
			for (const t of this.map.values()) yield [t.uri, t.value];
		}
		*[(ar = Symbol.toStringTag, Symbol.iterator)]() {
			for (const [, t] of this.map) yield [t.uri, t.value];
		}
	});
	var Gi = class {
		constructor() {
			this[or] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
		}
		clear() {
			this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
		}
		isEmpty() {
			return !this._head && !this._tail;
		}
		get size() {
			return this._size;
		}
		get first() {
			return this._head?.value;
		}
		get last() {
			return this._tail?.value;
		}
		has(e) {
			return this._map.has(e);
		}
		get(e, t = 0) {
			const n = this._map.get(e);
			if (n) return t !== 0 && this.touch(n, t), n.value;
		}
		set(e, t, n = 0) {
			let r = this._map.get(e);
			if (r) r.value = t, n !== 0 && this.touch(r, n);
			else {
				switch (r = {
					key: e,
					value: t,
					next: void 0,
					previous: void 0
				}, n) {
					case 0:
						this.addItemLast(r);
						break;
					case 1:
						this.addItemFirst(r);
						break;
					case 2:
						this.addItemLast(r);
						break;
					default:
						this.addItemLast(r);
						break;
				}
				this._map.set(e, r), this._size++;
			}
			return this;
		}
		delete(e) {
			return !!this.remove(e);
		}
		remove(e) {
			const t = this._map.get(e);
			if (t) return this._map.delete(e), this.removeItem(t), this._size--, t.value;
		}
		shift() {
			if (!this._head && !this._tail) return;
			if (!this._head || !this._tail) throw new Error("Invalid list");
			const e = this._head;
			return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
		}
		forEach(e, t) {
			const n = this._state;
			let r = this._head;
			for (; r;) {
				if (t ? e.bind(t)(r.value, r.key, this) : e(r.value, r.key, this), this._state !== n) throw new Error("LinkedMap got modified during iteration.");
				r = r.next;
			}
		}
		keys() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const s = {
							value: n.key,
							done: !1
						};
						return n = n.next, s;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		values() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const s = {
							value: n.value,
							done: !1
						};
						return n = n.next, s;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		entries() {
			const e = this, t = this._state;
			let n = this._head;
			const r = {
				[Symbol.iterator]() {
					return r;
				},
				next() {
					if (e._state !== t) throw new Error("LinkedMap got modified during iteration.");
					if (n) {
						const s = {
							value: [n.key, n.value],
							done: !1
						};
						return n = n.next, s;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		[(or = Symbol.toStringTag, Symbol.iterator)]() {
			return this.entries();
		}
		trimOld(e) {
			if (e >= this.size) return;
			if (e === 0) {
				this.clear();
				return;
			}
			let t = this._head, n = this.size;
			for (; t && n > e;) this._map.delete(t.key), t = t.next, n--;
			this._head = t, this._size = n, t && (t.previous = void 0), this._state++;
		}
		trimNew(e) {
			if (e >= this.size) return;
			if (e === 0) {
				this.clear();
				return;
			}
			let t = this._tail, n = this.size;
			for (; t && n > e;) this._map.delete(t.key), t = t.previous, n--;
			this._tail = t, this._size = n, t && (t.next = void 0), this._state++;
		}
		addItemFirst(e) {
			if (!this._head && !this._tail) this._tail = e;
			else if (this._head) e.next = this._head, this._head.previous = e;
			else throw new Error("Invalid list");
			this._head = e, this._state++;
		}
		addItemLast(e) {
			if (!this._head && !this._tail) this._head = e;
			else if (this._tail) e.previous = this._tail, this._tail.next = e;
			else throw new Error("Invalid list");
			this._tail = e, this._state++;
		}
		removeItem(e) {
			if (e === this._head && e === this._tail) this._head = void 0, this._tail = void 0;
			else if (e === this._head) {
				if (!e.next) throw new Error("Invalid list");
				e.next.previous = void 0, this._head = e.next;
			} else if (e === this._tail) {
				if (!e.previous) throw new Error("Invalid list");
				e.previous.next = void 0, this._tail = e.previous;
			} else {
				const t = e.next, n = e.previous;
				if (!t || !n) throw new Error("Invalid list");
				t.previous = n, n.next = t;
			}
			e.next = void 0, e.previous = void 0, this._state++;
		}
		touch(e, t) {
			if (!this._head || !this._tail) throw new Error("Invalid list");
			if (!(t !== 1 && t !== 2)) {
				if (t === 1) {
					if (e === this._head) return;
					const n = e.next, r = e.previous;
					e === this._tail ? (r.next = void 0, this._tail = r) : (n.previous = r, r.next = n), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
				} else if (t === 2) {
					if (e === this._tail) return;
					const n = e.next, r = e.previous;
					e === this._head ? (n.previous = void 0, this._head = n) : (n.previous = r, r.next = n), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
				}
			}
		}
		toJSON() {
			const e = [];
			return this.forEach((t, n) => {
				e.push([n, t]);
			}), e;
		}
		fromJSON(e) {
			this.clear();
			for (const [t, n] of e) this.set(t, n);
		}
	}, Xi = class extends Gi {
		constructor(e, t = 1) {
			super(), this._limit = e, this._ratio = Math.min(Math.max(0, t), 1);
		}
		get limit() {
			return this._limit;
		}
		set limit(e) {
			this._limit = e, this.checkTrim();
		}
		get(e, t = 2) {
			return super.get(e, t);
		}
		peek(e) {
			return super.get(e, 0);
		}
		set(e, t) {
			return super.set(e, t, 2), this;
		}
		checkTrim() {
			this.size > this._limit && this.trim(Math.round(this._limit * this._ratio));
		}
	}, Yi = class extends Xi {
		constructor(e, t = 1) {
			super(e, t);
		}
		trim(e) {
			this.trimOld(e);
		}
		set(e, t) {
			return super.set(e, t), this.checkTrim(), this;
		}
	}, Qi = class {
		constructor() {
			this.map = /* @__PURE__ */ new Map();
		}
		add(e, t) {
			let n = this.map.get(e);
			n || (n = /* @__PURE__ */ new Set(), this.map.set(e, n)), n.add(t);
		}
		delete(e, t) {
			const n = this.map.get(e);
			n && (n.delete(t), n.size === 0 && this.map.delete(e));
		}
		forEach(e, t) {
			const n = this.map.get(e);
			n && n.forEach(t);
		}
		get(e) {
			return this.map.get(e) || /* @__PURE__ */ new Set();
		}
	};
	new Yi(10);
	function Ji(e) {
		let t = [];
		for (; Object.prototype !== e;) t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
		return t;
	}
	function lr(e) {
		const t = [];
		for (const n of Ji(e)) typeof e[n] == "function" && t.push(n);
		return t;
	}
	function Zi(e, t) {
		const n = (s) => function() {
			return t(s, Array.prototype.slice.call(arguments, 0));
		}, r = {};
		for (const s of e) r[s] = n(s);
		return r;
	}
	var ur;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(ur || (ur = {}));
	var cr;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(cr || (cr = {}));
	var hr;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(hr || (hr = {}));
	function Ki(e, t, n, r, s) {
		if (r === 0) return !0;
		const i = t.charCodeAt(r - 1);
		if (e.get(i) !== 0 || i === 13 || i === 10) return !0;
		if (s > 0) {
			const o = t.charCodeAt(r);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function ea(e, t, n, r, s) {
		if (r + s === n) return !0;
		const i = t.charCodeAt(r + s);
		if (e.get(i) !== 0 || i === 13 || i === 10) return !0;
		if (s > 0) {
			const o = t.charCodeAt(r + s - 1);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function ta(e, t, n, r, s) {
		return Ki(e, t, n, r, s) && ea(e, t, n, r, s);
	}
	var na = class {
		constructor(e, t) {
			this._wordSeparators = e, this._searchRegex = t, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
		}
		reset(e) {
			this._searchRegex.lastIndex = e, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
		}
		next(e) {
			const t = e.length;
			let n;
			do {
				if (this._prevMatchStartIndex + this._prevMatchLength === t || (n = this._searchRegex.exec(e), !n)) return null;
				const r = n.index, s = n[0].length;
				if (r === this._prevMatchStartIndex && s === this._prevMatchLength) {
					if (s === 0) {
						Bs(e, t, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
						continue;
					}
					return null;
				}
				if (this._prevMatchStartIndex = r, this._prevMatchLength = s, !this._wordSeparators || ta(this._wordSeparators, e, t, r, s)) return n;
			} while (n);
			return null;
		}
	};
	function ra(e, t = "Unreachable") {
		throw new Error(t);
	}
	function ft(e) {
		if (!e()) {
			debugger;
			e(), $e(new ae("Assertion Failed"));
		}
	}
	function mr(e, t) {
		let n = 0;
		for (; n < e.length - 1;) {
			const r = e[n], s = e[n + 1];
			if (!t(r, s)) return !1;
			n++;
		}
		return !0;
	}
	const sa = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
	function ia(e = "") {
		let t = "(-?\\d*\\.\\d\\w*)|([^";
		for (const n of sa) e.indexOf(n) >= 0 || (t += "\\" + n);
		return t += "\\s]+)", new RegExp(t, "g");
	}
	const fr = ia();
	function dr(e) {
		let t = fr;
		if (e && e instanceof RegExp) if (e.global) t = e;
		else {
			let n = "g";
			e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
		}
		return t.lastIndex = 0, t;
	}
	const gr = new us();
	gr.unshift({
		maxLen: 1e3,
		windowSize: 15,
		timeBudget: 150
	});
	function o1(e, t, n, r, s) {
		if (t = dr(t), s || (s = nt.first(gr)), n.length > s.maxLen) {
			let c = e - s.maxLen / 2;
			return c < 0 ? c = 0 : r += c, n = n.substring(c, e + s.maxLen / 2), o1(e, t, n, r, s);
		}
		const i = Date.now(), o = e - 1 - r;
		let l = -1, u = null;
		for (let c = 1; !(Date.now() - i >= s.timeBudget); c++) {
			const m = o - s.windowSize * c;
			t.lastIndex = Math.max(0, m);
			const h = aa(t, n, o, l);
			if (!h && u || (u = h, m <= 0)) break;
			l = m;
		}
		if (u) {
			const c = {
				word: u[0],
				startColumn: r + 1 + u.index,
				endColumn: r + 1 + u.index + u[0].length
			};
			return t.lastIndex = 0, c;
		}
		return null;
	}
	function aa(e, t, n, r) {
		let s;
		for (; s = e.exec(t);) {
			const i = s.index || 0;
			if (i <= n && e.lastIndex >= n) return s;
			if (r > 0 && i > r) return null;
		}
		return null;
	}
	var oa = class {
		static computeUnicodeHighlights(e, t, n) {
			const r = n ? n.startLineNumber : 1, s = n ? n.endLineNumber : e.getLineCount(), i = new pr(t), o = i.getCandidateCodePoints();
			let l;
			o === "allNonBasicAscii" ? l = /* @__PURE__ */ new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : l = new RegExp(`${la(Array.from(o))}`, "g");
			const u = new na(null, l), c = [];
			let m = !1, h, d = 0, f = 0, g = 0;
			e: for (let v = r, L = s; v <= L; v++) {
				const N = e.getLineContent(v), E = N.length;
				u.reset(0);
				do
					if (h = u.next(N), h) {
						let w = h.index, p = h.index + h[0].length;
						if (w > 0) at(N.charCodeAt(w - 1)) && w--;
						if (p + 1 < E) at(N.charCodeAt(p - 1)) && p++;
						const b = N.substring(w, p);
						let y = o1(w + 1, fr, N, 0);
						y && y.endColumn <= w + 1 && (y = null);
						const S = i.shouldHighlightNonBasicASCII(b, y ? y.word : null);
						if (S !== 0) {
							if (S === 3 ? d++ : S === 2 ? f++ : S === 1 ? g++ : ra(S), c.length >= 1e3) {
								m = !0;
								break e;
							}
							c.push(new T(v, w + 1, v, p + 1));
						}
					}
				while (h);
			}
			return {
				ranges: c,
				hasMore: m,
				ambiguousCharacterCount: d,
				invisibleCharacterCount: f,
				nonBasicAsciiCharacterCount: g
			};
		}
		static computeUnicodeHighlightReason(e, t) {
			const n = new pr(t);
			switch (n.shouldHighlightNonBasicASCII(e, null)) {
				case 0: return null;
				case 2: return { kind: 1 };
				case 3: {
					const r = e.codePointAt(0), s = n.ambiguousCharacters.getPrimaryConfusable(r), i = zt.getLocales().filter((o) => !zt.getInstance(new Set([...t.allowedLocales, o])).isAmbiguous(r));
					return {
						kind: 0,
						confusableWith: String.fromCodePoint(s),
						notAmbiguousInLocales: i
					};
				}
				case 1: return { kind: 2 };
			}
		}
	};
	function la(e, t) {
		return `[${Fs(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
	}
	var pr = class {
		constructor(e) {
			this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = zt.getInstance(new Set(e.allowedLocales));
		}
		getCandidateCodePoints() {
			if (this.options.nonBasicASCII) return "allNonBasicAscii";
			const e = /* @__PURE__ */ new Set();
			if (this.options.invisibleCharacters) for (const t of Ot.codePoints) br(String.fromCodePoint(t)) || e.add(t);
			if (this.options.ambiguousCharacters) for (const t of this.ambiguousCharacters.getConfusableCodePoints()) e.add(t);
			for (const t of this.allowedCodePoints) e.delete(t);
			return e;
		}
		shouldHighlightNonBasicASCII(e, t) {
			const n = e.codePointAt(0);
			if (this.allowedCodePoints.has(n)) return 0;
			if (this.options.nonBasicASCII) return 1;
			let r = !1, s = !1;
			if (t) for (const i of t) {
				const o = i.codePointAt(0), l = Us(i);
				r = r || l, !l && !this.ambiguousCharacters.isAmbiguous(o) && !Ot.isInvisibleCharacter(o) && (s = !0);
			}
			return !r && s ? 0 : this.options.invisibleCharacters && !br(e) && Ot.isInvisibleCharacter(n) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n) ? 3 : 0;
		}
	};
	function br(e) {
		return e === " " || e === `
` || e === "	";
	}
	var dt = class {
		constructor(e, t, n) {
			this.changes = e, this.moves = t, this.hitTimeout = n;
		}
	}, ua = class {
		constructor(e, t) {
			this.lineRangeMapping = e, this.changes = t;
		}
	}, U = class he {
		static addRange(t, n) {
			let r = 0;
			for (; r < n.length && n[r].endExclusive < t.start;) r++;
			let s = r;
			for (; s < n.length && n[s].start <= t.endExclusive;) s++;
			if (r === s) n.splice(r, 0, t);
			else {
				const i = Math.min(t.start, n[r].start), o = Math.max(t.endExclusive, n[s - 1].endExclusive);
				n.splice(r, s - r, new he(i, o));
			}
		}
		static tryCreate(t, n) {
			if (!(t > n)) return new he(t, n);
		}
		static ofLength(t) {
			return new he(0, t);
		}
		static ofStartAndLength(t, n) {
			return new he(t, t + n);
		}
		constructor(t, n) {
			if (this.start = t, this.endExclusive = n, t > n) throw new ae(`Invalid range: ${this.toString()}`);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(t) {
			return new he(this.start + t, this.endExclusive + t);
		}
		deltaStart(t) {
			return new he(this.start + t, this.endExclusive);
		}
		deltaEnd(t) {
			return new he(this.start, this.endExclusive + t);
		}
		get length() {
			return this.endExclusive - this.start;
		}
		toString() {
			return `[${this.start}, ${this.endExclusive})`;
		}
		contains(t) {
			return this.start <= t && t < this.endExclusive;
		}
		join(t) {
			return new he(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive));
		}
		intersect(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			if (n <= r) return new he(n, r);
		}
		intersects(t) {
			return Math.max(this.start, t.start) < Math.min(this.endExclusive, t.endExclusive);
		}
		isBefore(t) {
			return this.endExclusive <= t.start;
		}
		isAfter(t) {
			return this.start >= t.endExclusive;
		}
		slice(t) {
			return t.slice(this.start, this.endExclusive);
		}
		substring(t) {
			return t.substring(this.start, this.endExclusive);
		}
		clip(t) {
			if (this.isEmpty) throw new ae(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, t));
		}
		clipCyclic(t) {
			if (this.isEmpty) throw new ae(`Invalid clipping range: ${this.toString()}`);
			return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
		}
		forEach(t) {
			for (let n = this.start; n < this.endExclusive; n++) t(n);
		}
	};
	function De(e, t) {
		const n = Ge(e, t);
		return n === -1 ? void 0 : e[n];
	}
	function Ge(e, t, n = 0, r = e.length) {
		let s = n, i = r;
		for (; s < i;) {
			const o = Math.floor((s + i) / 2);
			t(e[o]) ? s = o + 1 : i = o;
		}
		return s - 1;
	}
	function ca(e, t) {
		const n = l1(e, t);
		return n === e.length ? void 0 : e[n];
	}
	function l1(e, t, n = 0, r = e.length) {
		let s = n, i = r;
		for (; s < i;) {
			const o = Math.floor((s + i) / 2);
			t(e[o]) ? i = o : s = o + 1;
		}
		return s;
	}
	var yr = class Qr {
		static {
			this.assertInvariants = !1;
		}
		constructor(t) {
			this._array = t, this._findLastMonotonousLastIdx = 0;
		}
		findLastMonotonous(t) {
			if (Qr.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const r of this._array) if (this._prevFindLastPredicate(r) && !t(r)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = t;
			}
			const n = Ge(this._array, t, this._findLastMonotonousLastIdx);
			return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
		}
	}, I = class pe {
		static fromRangeInclusive(t) {
			return new pe(t.startLineNumber, t.endLineNumber + 1);
		}
		static joinMany(t) {
			if (t.length === 0) return [];
			let n = new gt(t[0].slice());
			for (let r = 1; r < t.length; r++) n = n.getUnion(new gt(t[r].slice()));
			return n.ranges;
		}
		static join(t) {
			if (t.length === 0) throw new ae("lineRanges cannot be empty");
			let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
			for (let s = 1; s < t.length; s++) n = Math.min(n, t[s].startLineNumber), r = Math.max(r, t[s].endLineNumberExclusive);
			return new pe(n, r);
		}
		static ofLength(t, n) {
			return new pe(t, t + n);
		}
		static deserialize(t) {
			return new pe(t[0], t[1]);
		}
		constructor(t, n) {
			if (t > n) throw new ae(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
			this.startLineNumber = t, this.endLineNumberExclusive = n;
		}
		contains(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(t) {
			return new pe(this.startLineNumber + t, this.endLineNumberExclusive + t);
		}
		deltaLength(t) {
			return new pe(this.startLineNumber, this.endLineNumberExclusive + t);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(t) {
			return new pe(Math.min(this.startLineNumber, t.startLineNumber), Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive));
		}
		toString() {
			return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
		}
		intersect(t) {
			const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
			if (n <= r) return new pe(n, r);
		}
		intersectsStrict(t) {
			return this.startLineNumber < t.endLineNumberExclusive && t.startLineNumber < this.endLineNumberExclusive;
		}
		overlapOrTouch(t) {
			return this.startLineNumber <= t.endLineNumberExclusive && t.startLineNumber <= this.endLineNumberExclusive;
		}
		equals(t) {
			return this.startLineNumber === t.startLineNumber && this.endLineNumberExclusive === t.endLineNumberExclusive;
		}
		toInclusiveRange() {
			return this.isEmpty ? null : new T(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toExclusiveRange() {
			return new T(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
		}
		mapToLineArray(t) {
			const n = [];
			for (let r = this.startLineNumber; r < this.endLineNumberExclusive; r++) n.push(t(r));
			return n;
		}
		forEach(t) {
			for (let n = this.startLineNumber; n < this.endLineNumberExclusive; n++) t(n);
		}
		serialize() {
			return [this.startLineNumber, this.endLineNumberExclusive];
		}
		includes(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		toOffsetRange() {
			return new U(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
	}, gt = class qe {
		constructor(t = []) {
			this._normalizedRanges = t;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(t) {
			if (t.length === 0) return;
			const n = l1(this._normalizedRanges, (s) => s.endLineNumberExclusive >= t.startLineNumber), r = Ge(this._normalizedRanges, (s) => s.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) this._normalizedRanges.splice(n, 0, t);
			else if (n === r - 1) {
				const s = this._normalizedRanges[n];
				this._normalizedRanges[n] = s.join(t);
			} else {
				const s = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(t);
				this._normalizedRanges.splice(n, r - n, s);
			}
		}
		contains(t) {
			const n = De(this._normalizedRanges, (r) => r.startLineNumber <= t);
			return !!n && n.endLineNumberExclusive > t;
		}
		intersects(t) {
			const n = De(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
			return !!n && n.endLineNumberExclusive > t.startLineNumber;
		}
		getUnion(t) {
			if (this._normalizedRanges.length === 0) return t;
			if (t._normalizedRanges.length === 0) return this;
			const n = [];
			let r = 0, s = 0, i = null;
			for (; r < this._normalizedRanges.length || s < t._normalizedRanges.length;) {
				let o = null;
				if (r < this._normalizedRanges.length && s < t._normalizedRanges.length) {
					const l = this._normalizedRanges[r], u = t._normalizedRanges[s];
					l.startLineNumber < u.startLineNumber ? (o = l, r++) : (o = u, s++);
				} else r < this._normalizedRanges.length ? (o = this._normalizedRanges[r], r++) : (o = t._normalizedRanges[s], s++);
				i === null ? i = o : i.endLineNumberExclusive >= o.startLineNumber ? i = new I(i.startLineNumber, Math.max(i.endLineNumberExclusive, o.endLineNumberExclusive)) : (n.push(i), i = o);
			}
			return i !== null && n.push(i), new qe(n);
		}
		subtractFrom(t) {
			const n = l1(this._normalizedRanges, (o) => o.endLineNumberExclusive >= t.startLineNumber), r = Ge(this._normalizedRanges, (o) => o.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) return new qe([t]);
			const s = [];
			let i = t.startLineNumber;
			for (let o = n; o < r; o++) {
				const l = this._normalizedRanges[o];
				l.startLineNumber > i && s.push(new I(i, l.startLineNumber)), i = l.endLineNumberExclusive;
			}
			return i < t.endLineNumberExclusive && s.push(new I(i, t.endLineNumberExclusive)), new qe(s);
		}
		toString() {
			return this._normalizedRanges.map((t) => t.toString()).join(", ");
		}
		getIntersection(t) {
			const n = [];
			let r = 0, s = 0;
			for (; r < this._normalizedRanges.length && s < t._normalizedRanges.length;) {
				const i = this._normalizedRanges[r], o = t._normalizedRanges[s], l = i.intersect(o);
				l && !l.isEmpty && n.push(l), i.endLineNumberExclusive < o.endLineNumberExclusive ? r++ : s++;
			}
			return new qe(n);
		}
		getWithDelta(t) {
			return new qe(this._normalizedRanges.map((n) => n.delta(t)));
		}
	};
	(class Ue {
		static {
			this.zero = new Ue(0, 0);
		}
		static betweenPositions(t, n) {
			return t.lineNumber === n.lineNumber ? new Ue(0, n.column - t.column) : new Ue(n.lineNumber - t.lineNumber, n.column - 1);
		}
		static ofRange(t) {
			return Ue.betweenPositions(t.getStartPosition(), t.getEndPosition());
		}
		static ofText(t) {
			let n = 0, r = 0;
			for (const s of t) s === `
` ? (n++, r = 0) : r++;
			return new Ue(n, r);
		}
		constructor(t, n) {
			this.lineCount = t, this.columnCount = n;
		}
		isGreaterThanOrEqualTo(t) {
			return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
		}
		createRange(t) {
			return this.lineCount === 0 ? new T(t.lineNumber, t.column, t.lineNumber, t.column + this.columnCount) : new T(t.lineNumber, t.column, t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		addToPosition(t) {
			return this.lineCount === 0 ? new z(t.lineNumber, t.column + this.columnCount) : new z(t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toString() {
			return `${this.lineCount},${this.columnCount}`;
		}
	});
	var ha = class {
		constructor(e, t) {
			this.range = e, this.text = t;
		}
		toSingleEditOperation() {
			return {
				range: this.range,
				text: this.text
			};
		}
	}, Fe = class He {
		static inverse(t, n, r) {
			const s = [];
			let i = 1, o = 1;
			for (const u of t) {
				const c = new He(new I(i, u.original.startLineNumber), new I(o, u.modified.startLineNumber));
				c.modified.isEmpty || s.push(c), i = u.original.endLineNumberExclusive, o = u.modified.endLineNumberExclusive;
			}
			const l = new He(new I(i, n + 1), new I(o, r + 1));
			return l.modified.isEmpty || s.push(l), s;
		}
		static clip(t, n, r) {
			const s = [];
			for (const i of t) {
				const o = i.original.intersect(n), l = i.modified.intersect(r);
				o && !o.isEmpty && l && !l.isEmpty && s.push(new He(o, l));
			}
			return s;
		}
		constructor(t, n) {
			this.original = t, this.modified = n;
		}
		toString() {
			return `{${this.original.toString()}->${this.modified.toString()}}`;
		}
		flip() {
			return new He(this.modified, this.original);
		}
		join(t) {
			return new He(this.original.join(t.original), this.modified.join(t.modified));
		}
		toRangeMapping() {
			const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
			if (t && n) return new ge(t, n);
			if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new ae("not a valid diff");
				return new ge(new T(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new T(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new ge(new T(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new T(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(t, n) {
			if (_r(this.original.endLineNumberExclusive, t) && _r(this.modified.endLineNumberExclusive, n)) return new ge(new T(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new T(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new ge(T.fromPositions(new z(this.original.startLineNumber, 1), Te(new z(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), T.fromPositions(new z(this.modified.startLineNumber, 1), Te(new z(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new ge(T.fromPositions(Te(new z(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), Te(new z(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), T.fromPositions(Te(new z(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), Te(new z(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			throw new ae();
		}
	};
	function Te(e, t) {
		if (e.lineNumber < 1) return new z(1, 1);
		if (e.lineNumber > t.length) return new z(t.length, t[t.length - 1].length + 1);
		const n = t[e.lineNumber - 1];
		return e.column > n.length + 1 ? new z(e.lineNumber, n.length + 1) : e;
	}
	function _r(e, t) {
		return e >= 1 && e <= t.length;
	}
	var Xe = class Et extends Fe {
		static fromRangeMappings(t) {
			return new Et(I.join(t.map((n) => I.fromRangeInclusive(n.originalRange))), I.join(t.map((n) => I.fromRangeInclusive(n.modifiedRange))), t);
		}
		constructor(t, n, r) {
			super(t, n), this.innerChanges = r;
		}
		flip() {
			return new Et(this.modified, this.original, this.innerChanges?.map((t) => t.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new Et(this.original, this.modified, [this.toRangeMapping()]);
		}
	}, ge = class Jr {
		static assertSorted(t) {
			for (let n = 1; n < t.length; n++) {
				const r = t[n - 1], s = t[n];
				if (!(r.originalRange.getEndPosition().isBeforeOrEqual(s.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(s.modifiedRange.getStartPosition()))) throw new ae("Range mappings must be sorted");
			}
		}
		constructor(t, n) {
			this.originalRange = t, this.modifiedRange = n;
		}
		toString() {
			return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
		}
		flip() {
			return new Jr(this.modifiedRange, this.originalRange);
		}
		toTextEdit(t) {
			const n = t.getValueOfRange(this.modifiedRange);
			return new ha(this.originalRange, n);
		}
	};
	const ma = 3;
	var fa = class {
		computeDiff(e, t, n) {
			const r = new pa(e, t, {
				maxComputationTime: n.maxComputationTimeMs,
				shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
				shouldComputeCharChanges: !0,
				shouldMakePrettyDiff: !0,
				shouldPostProcessCharChanges: !0
			}).computeDiff(), s = [];
			let i = null;
			for (const o of r.changes) {
				let l;
				o.originalEndLineNumber === 0 ? l = new I(o.originalStartLineNumber + 1, o.originalStartLineNumber + 1) : l = new I(o.originalStartLineNumber, o.originalEndLineNumber + 1);
				let u;
				o.modifiedEndLineNumber === 0 ? u = new I(o.modifiedStartLineNumber + 1, o.modifiedStartLineNumber + 1) : u = new I(o.modifiedStartLineNumber, o.modifiedEndLineNumber + 1);
				let c = new Xe(l, u, o.charChanges?.map((m) => new ge(new T(m.originalStartLineNumber, m.originalStartColumn, m.originalEndLineNumber, m.originalEndColumn), new T(m.modifiedStartLineNumber, m.modifiedStartColumn, m.modifiedEndLineNumber, m.modifiedEndColumn))));
				i && (i.modified.endLineNumberExclusive === c.modified.startLineNumber || i.original.endLineNumberExclusive === c.original.startLineNumber) && (c = new Xe(i.original.join(c.original), i.modified.join(c.modified), i.innerChanges && c.innerChanges ? i.innerChanges.concat(c.innerChanges) : void 0), s.pop()), s.push(c), i = c;
			}
			return ft(() => mr(s, (o, l) => l.original.startLineNumber - o.original.endLineNumberExclusive === l.modified.startLineNumber - o.modified.endLineNumberExclusive && o.original.endLineNumberExclusive < l.original.startLineNumber && o.modified.endLineNumberExclusive < l.modified.startLineNumber)), new dt(s, [], r.quitEarly);
		}
	};
	function vr(e, t, n, r) {
		return new Z1(e, t, n).ComputeDiff(r);
	}
	var wr = class {
		constructor(e) {
			const t = [], n = [];
			for (let r = 0, s = e.length; r < s; r++) t[r] = c1(e[r], 1), n[r] = h1(e[r], 1);
			this.lines = e, this._startColumns = t, this._endColumns = n;
		}
		getElements() {
			const e = [];
			for (let t = 0, n = this.lines.length; t < n; t++) e[t] = this.lines[t].substring(this._startColumns[t] - 1, this._endColumns[t] - 1);
			return e;
		}
		getStrictElement(e) {
			return this.lines[e];
		}
		getStartLineNumber(e) {
			return e + 1;
		}
		getEndLineNumber(e) {
			return e + 1;
		}
		createCharSequence(e, t, n) {
			const r = [], s = [], i = [];
			let o = 0;
			for (let l = t; l <= n; l++) {
				const u = this.lines[l], c = e ? this._startColumns[l] : 1, m = e ? this._endColumns[l] : u.length + 1;
				for (let h = c; h < m; h++) r[o] = u.charCodeAt(h - 1), s[o] = l + 1, i[o] = h, o++;
				!e && l < n && (r[o] = 10, s[o] = l + 1, i[o] = u.length + 1, o++);
			}
			return new da(r, s, i);
		}
	}, da = class {
		constructor(e, t, n) {
			this._charCodes = e, this._lineNumbers = t, this._columns = n;
		}
		toString() {
			return "[" + this._charCodes.map((e, t) => (e === 10 ? "\\n" : String.fromCharCode(e)) + `-(${this._lineNumbers[t]},${this._columns[t]})`).join(", ") + "]";
		}
		_assertIndex(e, t) {
			if (e < 0 || e >= t.length) throw new Error("Illegal index");
		}
		getElements() {
			return this._charCodes;
		}
		getStartLineNumber(e) {
			return e > 0 && e === this._lineNumbers.length ? this.getEndLineNumber(e - 1) : (this._assertIndex(e, this._lineNumbers), this._lineNumbers[e]);
		}
		getEndLineNumber(e) {
			return e === -1 ? this.getStartLineNumber(e + 1) : (this._assertIndex(e, this._lineNumbers), this._charCodes[e] === 10 ? this._lineNumbers[e] + 1 : this._lineNumbers[e]);
		}
		getStartColumn(e) {
			return e > 0 && e === this._columns.length ? this.getEndColumn(e - 1) : (this._assertIndex(e, this._columns), this._columns[e]);
		}
		getEndColumn(e) {
			return e === -1 ? this.getStartColumn(e + 1) : (this._assertIndex(e, this._columns), this._charCodes[e] === 10 ? 1 : this._columns[e] + 1);
		}
	}, pt = class Zr {
		constructor(t, n, r, s, i, o, l, u) {
			this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = s, this.modifiedStartLineNumber = i, this.modifiedStartColumn = o, this.modifiedEndLineNumber = l, this.modifiedEndColumn = u;
		}
		static createFromDiffChange(t, n, r) {
			return new Zr(n.getStartLineNumber(t.originalStart), n.getStartColumn(t.originalStart), n.getEndLineNumber(t.originalStart + t.originalLength - 1), n.getEndColumn(t.originalStart + t.originalLength - 1), r.getStartLineNumber(t.modifiedStart), r.getStartColumn(t.modifiedStart), r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), r.getEndColumn(t.modifiedStart + t.modifiedLength - 1));
		}
	};
	function ga(e) {
		if (e.length <= 1) return e;
		const t = [e[0]];
		let n = t[0];
		for (let r = 1, s = e.length; r < s; r++) {
			const i = e[r], o = i.originalStart - (n.originalStart + n.originalLength), l = i.modifiedStart - (n.modifiedStart + n.modifiedLength);
			Math.min(o, l) < ma ? (n.originalLength = i.originalStart + i.originalLength - n.originalStart, n.modifiedLength = i.modifiedStart + i.modifiedLength - n.modifiedStart) : (t.push(i), n = i);
		}
		return t;
	}
	var u1 = class Kr {
		constructor(t, n, r, s, i) {
			this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = s, this.charChanges = i;
		}
		static createFromDiffResult(t, n, r, s, i, o, l) {
			let u, c, m, h, d;
			if (n.originalLength === 0 ? (u = r.getStartLineNumber(n.originalStart) - 1, c = 0) : (u = r.getStartLineNumber(n.originalStart), c = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (m = s.getStartLineNumber(n.modifiedStart) - 1, h = 0) : (m = s.getStartLineNumber(n.modifiedStart), h = s.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), o && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && i()) {
				const f = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), g = s.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
				if (f.getElements().length > 0 && g.getElements().length > 0) {
					let v = vr(f, g, i, !0).changes;
					l && (v = ga(v)), d = [];
					for (let L = 0, N = v.length; L < N; L++) d.push(pt.createFromDiffChange(v[L], f, g));
				}
			}
			return new Kr(u, c, m, h, d);
		}
	}, pa = class {
		constructor(e, t, n) {
			this.shouldComputeCharChanges = n.shouldComputeCharChanges, this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = n.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = t, this.original = new wr(e), this.modified = new wr(t), this.continueLineDiff = Lr(n.maxComputationTime), this.continueCharDiff = Lr(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3));
		}
		computeDiff() {
			if (this.original.lines.length === 1 && this.original.lines[0].length === 0) return this.modified.lines.length === 1 && this.modified.lines[0].length === 0 ? {
				quitEarly: !1,
				changes: []
			} : {
				quitEarly: !1,
				changes: [{
					originalStartLineNumber: 1,
					originalEndLineNumber: 1,
					modifiedStartLineNumber: 1,
					modifiedEndLineNumber: this.modified.lines.length,
					charChanges: void 0
				}]
			};
			if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) return {
				quitEarly: !1,
				changes: [{
					originalStartLineNumber: 1,
					originalEndLineNumber: this.original.lines.length,
					modifiedStartLineNumber: 1,
					modifiedEndLineNumber: 1,
					charChanges: void 0
				}]
			};
			const e = vr(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), t = e.changes, n = e.quitEarly;
			if (this.shouldIgnoreTrimWhitespace) {
				const o = [];
				for (let l = 0, u = t.length; l < u; l++) o.push(u1.createFromDiffResult(this.shouldIgnoreTrimWhitespace, t[l], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
				return {
					quitEarly: n,
					changes: o
				};
			}
			const r = [];
			let s = 0, i = 0;
			for (let o = -1, l = t.length; o < l; o++) {
				const u = o + 1 < l ? t[o + 1] : null, c = u ? u.originalStart : this.originalLines.length, m = u ? u.modifiedStart : this.modifiedLines.length;
				for (; s < c && i < m;) {
					const h = this.originalLines[s], d = this.modifiedLines[i];
					if (h !== d) {
						{
							let f = c1(h, 1), g = c1(d, 1);
							for (; f > 1 && g > 1 && h.charCodeAt(f - 2) === d.charCodeAt(g - 2);) f--, g--;
							(f > 1 || g > 1) && this._pushTrimWhitespaceCharChange(r, s + 1, 1, f, i + 1, 1, g);
						}
						{
							let f = h1(h, 1), g = h1(d, 1);
							const v = h.length + 1, L = d.length + 1;
							for (; f < v && g < L && h.charCodeAt(f - 1) === h.charCodeAt(g - 1);) f++, g++;
							(f < v || g < L) && this._pushTrimWhitespaceCharChange(r, s + 1, f, v, i + 1, g, L);
						}
					}
					s++, i++;
				}
				u && (r.push(u1.createFromDiffResult(this.shouldIgnoreTrimWhitespace, u, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), s += u.originalLength, i += u.modifiedLength);
			}
			return {
				quitEarly: n,
				changes: r
			};
		}
		_pushTrimWhitespaceCharChange(e, t, n, r, s, i, o) {
			if (this._mergeTrimWhitespaceCharChange(e, t, n, r, s, i, o)) return;
			let l;
			this.shouldComputeCharChanges && (l = [new pt(t, n, t, r, s, i, s, o)]), e.push(new u1(t, t, s, s, l));
		}
		_mergeTrimWhitespaceCharChange(e, t, n, r, s, i, o) {
			const l = e.length;
			if (l === 0) return !1;
			const u = e[l - 1];
			return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0 ? !1 : u.originalEndLineNumber === t && u.modifiedEndLineNumber === s ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new pt(t, n, t, r, s, i, s, o)), !0) : u.originalEndLineNumber + 1 === t && u.modifiedEndLineNumber + 1 === s ? (u.originalEndLineNumber = t, u.modifiedEndLineNumber = s, this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new pt(t, n, t, r, s, i, s, o)), !0) : !1;
		}
	};
	function c1(e, t) {
		const n = Is(e);
		return n === -1 ? t : n + 1;
	}
	function h1(e, t) {
		const n = Vs(e);
		return n === -1 ? t : n + 2;
	}
	function Lr(e) {
		if (e === 0) return () => !0;
		const t = Date.now();
		return () => Date.now() - t < e;
	}
	function ba(e, t, n = (r, s) => r === s) {
		if (e === t) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let r = 0, s = e.length; r < s; r++) if (!n(e[r], t[r])) return !1;
		return !0;
	}
	function* ya(e, t) {
		let n, r;
		for (const s of e) r !== void 0 && t(r, s) ? n.push(s) : (n && (yield n), n = [s]), r = s;
		n && (yield n);
	}
	function _a(e, t) {
		for (let n = 0; n <= e.length; n++) t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
	}
	function va(e, t) {
		for (let n = 0; n < e.length; n++) t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
	}
	function wa(e, t) {
		for (const n of t) e.push(n);
	}
	var m1;
	(function(e) {
		function t(i) {
			return i < 0;
		}
		e.isLessThan = t;
		function n(i) {
			return i <= 0;
		}
		e.isLessThanOrEqual = n;
		function r(i) {
			return i > 0;
		}
		e.isGreaterThan = r;
		function s(i) {
			return i === 0;
		}
		e.isNeitherLessOrGreaterThan = s, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
	})(m1 || (m1 = {}));
	function bt(e, t) {
		return (n, r) => t(e(n), e(r));
	}
	const yt = (e, t) => e - t;
	function La(e) {
		return (t, n) => -e(t, n);
	}
	(class xt {
		static {
			this.empty = new xt((t) => {});
		}
		constructor(t) {
			this.iterate = t;
		}
		toArray() {
			const t = [];
			return this.iterate((n) => (t.push(n), !0)), t;
		}
		filter(t) {
			return new xt((n) => this.iterate((r) => t(r) ? n(r) : !0));
		}
		map(t) {
			return new xt((n) => this.iterate((r) => n(t(r))));
		}
		findLast(t) {
			let n;
			return this.iterate((r) => (t(r) && (n = r), !0)), n;
		}
		findLastMaxBy(t) {
			let n, r = !0;
			return this.iterate((s) => ((r || m1.isGreaterThan(t(s, n))) && (r = !1, n = s), !0)), n;
		}
	});
	var Ie = class C1 {
		static trivial(t, n) {
			return new C1([new te(U.ofLength(t.length), U.ofLength(n.length))], !1);
		}
		static trivialTimedOut(t, n) {
			return new C1([new te(U.ofLength(t.length), U.ofLength(n.length))], !0);
		}
		constructor(t, n) {
			this.diffs = t, this.hitTimeout = n;
		}
	}, te = class be {
		static invert(t, n) {
			const r = [];
			return _a(t, (s, i) => {
				r.push(be.fromOffsetPairs(s ? s.getEndExclusives() : Ce.zero, i ? i.getStarts() : new Ce(n, (s ? s.seq2Range.endExclusive - s.seq1Range.endExclusive : 0) + n)));
			}), r;
		}
		static fromOffsetPairs(t, n) {
			return new be(new U(t.offset1, n.offset1), new U(t.offset2, n.offset2));
		}
		static assertSorted(t) {
			let n;
			for (const r of t) {
				if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start)) throw new ae("Sequence diffs must be sorted");
				n = r;
			}
		}
		constructor(t, n) {
			this.seq1Range = t, this.seq2Range = n;
		}
		swap() {
			return new be(this.seq2Range, this.seq1Range);
		}
		toString() {
			return `${this.seq1Range} <-> ${this.seq2Range}`;
		}
		join(t) {
			return new be(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
		}
		delta(t) {
			return t === 0 ? this : new be(this.seq1Range.delta(t), this.seq2Range.delta(t));
		}
		deltaStart(t) {
			return t === 0 ? this : new be(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
		}
		deltaEnd(t) {
			return t === 0 ? this : new be(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
		}
		intersect(t) {
			const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
			if (!(!n || !r)) return new be(n, r);
		}
		getStarts() {
			return new Ce(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new Ce(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	}, Ce = class Mt {
		static {
			this.zero = new Mt(0, 0);
		}
		static {
			this.max = new Mt(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		}
		constructor(t, n) {
			this.offset1 = t, this.offset2 = n;
		}
		toString() {
			return `${this.offset1} <-> ${this.offset2}`;
		}
		delta(t) {
			return t === 0 ? this : new Mt(this.offset1 + t, this.offset2 + t);
		}
		equals(t) {
			return this.offset1 === t.offset1 && this.offset2 === t.offset2;
		}
	}, f1 = class es {
		static {
			this.instance = new es();
		}
		isValid() {
			return !0;
		}
	}, Na = class {
		constructor(e) {
			if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0) throw new ae("timeout must be positive");
		}
		isValid() {
			if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
				this.valid = !1;
				debugger;
			}
			return this.valid;
		}
	}, d1 = class {
		constructor(e, t) {
			this.width = e, this.height = t, this.array = [], this.array = new Array(e * t);
		}
		get(e, t) {
			return this.array[e + t * this.width];
		}
		set(e, t, n) {
			this.array[e + t * this.width] = n;
		}
	};
	function g1(e) {
		return e === 32 || e === 9;
	}
	var Nr = class R1 {
		static {
			this.chrKeys = /* @__PURE__ */ new Map();
		}
		static getKey(t) {
			let n = this.chrKeys.get(t);
			return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
		}
		constructor(t, n, r) {
			this.range = t, this.lines = n, this.source = r, this.histogram = [];
			let s = 0;
			for (let i = t.startLineNumber - 1; i < t.endLineNumberExclusive - 1; i++) {
				const o = n[i];
				for (let u = 0; u < o.length; u++) {
					s++;
					const c = o[u], m = R1.getKey(c);
					this.histogram[m] = (this.histogram[m] || 0) + 1;
				}
				s++;
				const l = R1.getKey(`
`);
				this.histogram[l] = (this.histogram[l] || 0) + 1;
			}
			this.totalCount = s;
		}
		computeSimilarity(t) {
			let n = 0;
			const r = Math.max(this.histogram.length, t.histogram.length);
			for (let s = 0; s < r; s++) n += Math.abs((this.histogram[s] ?? 0) - (t.histogram[s] ?? 0));
			return 1 - n / (this.totalCount + t.totalCount);
		}
	}, Sa = class {
		compute(e, t, n = f1.instance, r) {
			if (e.length === 0 || t.length === 0) return Ie.trivial(e, t);
			const s = new d1(e.length, t.length), i = new d1(e.length, t.length), o = new d1(e.length, t.length);
			for (let f = 0; f < e.length; f++) for (let g = 0; g < t.length; g++) {
				if (!n.isValid()) return Ie.trivialTimedOut(e, t);
				const v = f === 0 ? 0 : s.get(f - 1, g), L = g === 0 ? 0 : s.get(f, g - 1);
				let N;
				e.getElement(f) === t.getElement(g) ? (f === 0 || g === 0 ? N = 0 : N = s.get(f - 1, g - 1), f > 0 && g > 0 && i.get(f - 1, g - 1) === 3 && (N += o.get(f - 1, g - 1)), N += r ? r(f, g) : 1) : N = -1;
				const E = Math.max(v, L, N);
				if (E === N) {
					const w = f > 0 && g > 0 ? o.get(f - 1, g - 1) : 0;
					o.set(f, g, w + 1), i.set(f, g, 3);
				} else E === v ? (o.set(f, g, 0), i.set(f, g, 1)) : E === L && (o.set(f, g, 0), i.set(f, g, 2));
				s.set(f, g, E);
			}
			const l = [];
			let u = e.length, c = t.length;
			function m(f, g) {
				(f + 1 !== u || g + 1 !== c) && l.push(new te(new U(f + 1, u), new U(g + 1, c))), u = f, c = g;
			}
			let h = e.length - 1, d = t.length - 1;
			for (; h >= 0 && d >= 0;) i.get(h, d) === 3 ? (m(h, d), h--, d--) : i.get(h, d) === 1 ? h-- : d--;
			return m(-1, -1), l.reverse(), new Ie(l, !1);
		}
	}, Sr = class {
		compute(e, t, n = f1.instance) {
			if (e.length === 0 || t.length === 0) return Ie.trivial(e, t);
			const r = e, s = t;
			function i(g, v) {
				for (; g < r.length && v < s.length && r.getElement(g) === s.getElement(v);) g++, v++;
				return g;
			}
			let o = 0;
			const l = new Ca();
			l.set(0, i(0, 0));
			const u = new Ra();
			u.set(0, l.get(0) === 0 ? null : new Cr(null, 0, 0, l.get(0)));
			let c = 0;
			e: for (;;) {
				if (o++, !n.isValid()) return Ie.trivialTimedOut(r, s);
				const g = -Math.min(o, s.length + o % 2), v = Math.min(o, r.length + o % 2);
				for (c = g; c <= v; c += 2) {
					let L = 0;
					const N = c === v ? -1 : l.get(c + 1), E = c === g ? -1 : l.get(c - 1) + 1;
					L++;
					const w = Math.min(Math.max(N, E), r.length), p = w - c;
					if (L++, w > r.length || p > s.length) continue;
					const b = i(w, p);
					l.set(c, b);
					const y = w === N ? u.get(c + 1) : u.get(c - 1);
					if (u.set(c, b !== w ? new Cr(y, w, p, b - w) : y), l.get(c) === r.length && l.get(c) - c === s.length) break e;
				}
			}
			let m = u.get(c);
			const h = [];
			let d = r.length, f = s.length;
			for (;;) {
				const g = m ? m.x + m.length : 0, v = m ? m.y + m.length : 0;
				if ((g !== d || v !== f) && h.push(new te(new U(g, d), new U(v, f))), !m) break;
				d = m.x, f = m.y, m = m.prev;
			}
			return h.reverse(), new Ie(h, !1);
		}
	}, Cr = class {
		constructor(e, t, n, r) {
			this.prev = e, this.x = t, this.y = n, this.length = r;
		}
	}, Ca = class {
		constructor() {
			this.positiveArr = new Int32Array(10), this.negativeArr = new Int32Array(10);
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			if (e < 0) {
				if (e = -e - 1, e >= this.negativeArr.length) {
					const n = this.negativeArr;
					this.negativeArr = new Int32Array(n.length * 2), this.negativeArr.set(n);
				}
				this.negativeArr[e] = t;
			} else {
				if (e >= this.positiveArr.length) {
					const n = this.positiveArr;
					this.positiveArr = new Int32Array(n.length * 2), this.positiveArr.set(n);
				}
				this.positiveArr[e] = t;
			}
		}
	}, Ra = class {
		constructor() {
			this.positiveArr = [], this.negativeArr = [];
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			e < 0 ? (e = -e - 1, this.negativeArr[e] = t) : this.positiveArr[e] = t;
		}
	}, _t = class {
		constructor(e, t, n) {
			this.lines = e, this.range = t, this.considerWhitespaceChanges = n, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
			for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
				let s = e[r - 1], i = 0;
				r === this.range.startLineNumber && this.range.startColumn > 1 && (i = this.range.startColumn - 1, s = s.substring(i)), this.lineStartOffsets.push(i);
				let o = 0;
				if (!n) {
					const u = s.trimStart();
					o = s.length - u.length, s = u.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(o);
				const l = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - i - o, s.length) : s.length;
				for (let u = 0; u < l; u++) this.elements.push(s.charCodeAt(u));
				r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new U(0, this.length));
		}
		getText(e) {
			return this.elements.slice(e.start, e.endExclusive).map((t) => String.fromCharCode(t)).join("");
		}
		getElement(e) {
			return this.elements[e];
		}
		get length() {
			return this.elements.length;
		}
		getBoundaryScore(e) {
			const t = Ar(e > 0 ? this.elements[e - 1] : -1), n = Ar(e < this.elements.length ? this.elements[e] : -1);
			if (t === 7 && n === 8) return 0;
			if (t === 8) return 150;
			let r = 0;
			return t !== n && (r += 10, t === 0 && n === 1 && (r += 1)), r += Rr(t), r += Rr(n), r;
		}
		translateOffset(e, t = "right") {
			const n = Ge(this.firstElementOffsetByLineIdx, (s) => s <= e), r = e - this.firstElementOffsetByLineIdx[n];
			return new z(this.range.startLineNumber + n, 1 + this.lineStartOffsets[n] + r + (r === 0 && t === "left" ? 0 : this.trimmedWsLengthsByLineIdx[n]));
		}
		translateRange(e) {
			const t = this.translateOffset(e.start, "right"), n = this.translateOffset(e.endExclusive, "left");
			return n.isBefore(t) ? T.fromPositions(n, n) : T.fromPositions(t, n);
		}
		findWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !p1(this.elements[e])) return;
			let t = e;
			for (; t > 0 && p1(this.elements[t - 1]);) t--;
			let n = e;
			for (; n < this.elements.length && p1(this.elements[n]);) n++;
			return new U(t, n);
		}
		countLinesIn(e) {
			return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
		}
		isStronglyEqual(e, t) {
			return this.elements[e] === this.elements[t];
		}
		extendToFullLines(e) {
			return new U(De(this.firstElementOffsetByLineIdx, (t) => t <= e.start) ?? 0, ca(this.firstElementOffsetByLineIdx, (t) => e.endExclusive <= t) ?? this.elements.length);
		}
	};
	function p1(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
	}
	const Aa = {
		0: 0,
		1: 0,
		2: 0,
		3: 10,
		4: 2,
		5: 30,
		6: 3,
		7: 10,
		8: 10
	};
	function Rr(e) {
		return Aa[e];
	}
	function Ar(e) {
		return e === 10 ? 8 : e === 13 ? 7 : g1(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
	}
	function Ea(e, t, n, r, s, i) {
		let { moves: o, excludedChanges: l } = Ma(e, t, n, i);
		if (!i.isValid()) return [];
		const u = ka(e.filter((c) => !l.has(c)), r, s, t, n, i);
		return wa(o, u), o = Pa(o), o = o.filter((c) => {
			const m = c.original.toOffsetRange().slice(t).map((h) => h.trim());
			return m.join(`
`).length >= 15 && xa(m, (h) => h.length >= 2) >= 2;
		}), o = Da(e, o), o;
	}
	function xa(e, t) {
		let n = 0;
		for (const r of e) t(r) && n++;
		return n;
	}
	function Ma(e, t, n, r) {
		const s = [], i = e.filter((u) => u.modified.isEmpty && u.original.length >= 3).map((u) => new Nr(u.original, t, u)), o = new Set(e.filter((u) => u.original.isEmpty && u.modified.length >= 3).map((u) => new Nr(u.modified, n, u))), l = /* @__PURE__ */ new Set();
		for (const u of i) {
			let c = -1, m;
			for (const h of o) {
				const d = u.computeSimilarity(h);
				d > c && (c = d, m = h);
			}
			if (c > .9 && m && (o.delete(m), s.push(new Fe(u.range, m.range)), l.add(u.source), l.add(m.source)), !r.isValid()) return {
				moves: s,
				excludedChanges: l
			};
		}
		return {
			moves: s,
			excludedChanges: l
		};
	}
	function ka(e, t, n, r, s, i) {
		const o = [], l = new Qi();
		for (const d of e) for (let f = d.original.startLineNumber; f < d.original.endLineNumberExclusive - 2; f++) {
			const g = `${t[f - 1]}:${t[f + 1 - 1]}:${t[f + 2 - 1]}`;
			l.add(g, { range: new I(f, f + 3) });
		}
		const u = [];
		e.sort(bt((d) => d.modified.startLineNumber, yt));
		for (const d of e) {
			let f = [];
			for (let g = d.modified.startLineNumber; g < d.modified.endLineNumberExclusive - 2; g++) {
				const v = `${n[g - 1]}:${n[g + 1 - 1]}:${n[g + 2 - 1]}`, L = new I(g, g + 3), N = [];
				l.forEach(v, ({ range: E }) => {
					for (const p of f) if (p.originalLineRange.endLineNumberExclusive + 1 === E.endLineNumberExclusive && p.modifiedLineRange.endLineNumberExclusive + 1 === L.endLineNumberExclusive) {
						p.originalLineRange = new I(p.originalLineRange.startLineNumber, E.endLineNumberExclusive), p.modifiedLineRange = new I(p.modifiedLineRange.startLineNumber, L.endLineNumberExclusive), N.push(p);
						return;
					}
					const w = {
						modifiedLineRange: L,
						originalLineRange: E
					};
					u.push(w), N.push(w);
				}), f = N;
			}
			if (!i.isValid()) return [];
		}
		u.sort(La(bt((d) => d.modifiedLineRange.length, yt)));
		const c = new gt(), m = new gt();
		for (const d of u) {
			const f = d.modifiedLineRange.startLineNumber - d.originalLineRange.startLineNumber, g = c.subtractFrom(d.modifiedLineRange), v = m.subtractFrom(d.originalLineRange).getWithDelta(f), L = g.getIntersection(v);
			for (const N of L.ranges) {
				if (N.length < 3) continue;
				const E = N, w = N.delta(-f);
				o.push(new Fe(w, E)), c.addRange(E), m.addRange(w);
			}
		}
		o.sort(bt((d) => d.original.startLineNumber, yt));
		const h = new yr(e);
		for (let d = 0; d < o.length; d++) {
			const f = o[d], g = h.findLastMonotonous((y) => y.original.startLineNumber <= f.original.startLineNumber), v = De(e, (y) => y.modified.startLineNumber <= f.modified.startLineNumber), L = Math.max(f.original.startLineNumber - g.original.startLineNumber, f.modified.startLineNumber - v.modified.startLineNumber), N = h.findLastMonotonous((y) => y.original.startLineNumber < f.original.endLineNumberExclusive), E = De(e, (y) => y.modified.startLineNumber < f.modified.endLineNumberExclusive), w = Math.max(N.original.endLineNumberExclusive - f.original.endLineNumberExclusive, E.modified.endLineNumberExclusive - f.modified.endLineNumberExclusive);
			let p;
			for (p = 0; p < L; p++) {
				const y = f.original.startLineNumber - p - 1, S = f.modified.startLineNumber - p - 1;
				if (y > r.length || S > s.length || c.contains(S) || m.contains(y) || !Er(r[y - 1], s[S - 1], i)) break;
			}
			p > 0 && (m.addRange(new I(f.original.startLineNumber - p, f.original.startLineNumber)), c.addRange(new I(f.modified.startLineNumber - p, f.modified.startLineNumber)));
			let b;
			for (b = 0; b < w; b++) {
				const y = f.original.endLineNumberExclusive + b, S = f.modified.endLineNumberExclusive + b;
				if (y > r.length || S > s.length || c.contains(S) || m.contains(y) || !Er(r[y - 1], s[S - 1], i)) break;
			}
			b > 0 && (m.addRange(new I(f.original.endLineNumberExclusive, f.original.endLineNumberExclusive + b)), c.addRange(new I(f.modified.endLineNumberExclusive, f.modified.endLineNumberExclusive + b))), (p > 0 || b > 0) && (o[d] = new Fe(new I(f.original.startLineNumber - p, f.original.endLineNumberExclusive + b), new I(f.modified.startLineNumber - p, f.modified.endLineNumberExclusive + b)));
		}
		return o;
	}
	function Er(e, t, n) {
		if (e.trim() === t.trim()) return !0;
		if (e.length > 300 && t.length > 300) return !1;
		const r = new Sr().compute(new _t([e], new T(1, 1, 1, e.length), !1), new _t([t], new T(1, 1, 1, t.length), !1), n);
		let s = 0;
		const i = te.invert(r.diffs, e.length);
		for (const u of i) u.seq1Range.forEach((c) => {
			g1(e.charCodeAt(c)) || s++;
		});
		function o(u) {
			let c = 0;
			for (let m = 0; m < e.length; m++) g1(u.charCodeAt(m)) || c++;
			return c;
		}
		const l = o(e.length > t.length ? e : t);
		return s / l > .6 && l > 10;
	}
	function Pa(e) {
		if (e.length === 0) return e;
		e.sort(bt((n) => n.original.startLineNumber, yt));
		const t = [e[0]];
		for (let n = 1; n < e.length; n++) {
			const r = t[t.length - 1], s = e[n], i = s.original.startLineNumber - r.original.endLineNumberExclusive, o = s.modified.startLineNumber - r.modified.endLineNumberExclusive;
			if (i >= 0 && o >= 0 && i + o <= 2) {
				t[t.length - 1] = r.join(s);
				continue;
			}
			t.push(s);
		}
		return t;
	}
	function Da(e, t) {
		const n = new yr(e);
		return t = t.filter((r) => (n.findLastMonotonous((s) => s.original.startLineNumber < r.original.endLineNumberExclusive) || new Fe(new I(1, 1), new I(1, 1))) !== De(e, (s) => s.modified.startLineNumber < r.modified.endLineNumberExclusive)), t;
	}
	function xr(e, t, n) {
		let r = n;
		return r = Mr(e, t, r), r = Mr(e, t, r), r = Fa(e, t, r), r;
	}
	function Mr(e, t, n) {
		if (n.length === 0) return n;
		const r = [];
		r.push(n[0]);
		for (let i = 1; i < n.length; i++) {
			const o = r[r.length - 1];
			let l = n[i];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const u = l.seq1Range.start - o.seq1Range.endExclusive;
				let c;
				for (c = 1; c <= u && !(e.getElement(l.seq1Range.start - c) !== e.getElement(l.seq1Range.endExclusive - c) || t.getElement(l.seq2Range.start - c) !== t.getElement(l.seq2Range.endExclusive - c)); c++);
				if (c--, c === u) {
					r[r.length - 1] = new te(new U(o.seq1Range.start, l.seq1Range.endExclusive - u), new U(o.seq2Range.start, l.seq2Range.endExclusive - u));
					continue;
				}
				l = l.delta(-c);
			}
			r.push(l);
		}
		const s = [];
		for (let i = 0; i < r.length - 1; i++) {
			const o = r[i + 1];
			let l = r[i];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const u = o.seq1Range.start - l.seq1Range.endExclusive;
				let c;
				for (c = 0; c < u && !(!e.isStronglyEqual(l.seq1Range.start + c, l.seq1Range.endExclusive + c) || !t.isStronglyEqual(l.seq2Range.start + c, l.seq2Range.endExclusive + c)); c++);
				if (c === u) {
					r[i + 1] = new te(new U(l.seq1Range.start + u, o.seq1Range.endExclusive), new U(l.seq2Range.start + u, o.seq2Range.endExclusive));
					continue;
				}
				c > 0 && (l = l.delta(c));
			}
			s.push(l);
		}
		return r.length > 0 && s.push(r[r.length - 1]), s;
	}
	function Fa(e, t, n) {
		if (!e.getBoundaryScore || !t.getBoundaryScore) return n;
		for (let r = 0; r < n.length; r++) {
			const s = r > 0 ? n[r - 1] : void 0, i = n[r], o = r + 1 < n.length ? n[r + 1] : void 0, l = new U(s ? s.seq1Range.endExclusive + 1 : 0, o ? o.seq1Range.start - 1 : e.length), u = new U(s ? s.seq2Range.endExclusive + 1 : 0, o ? o.seq2Range.start - 1 : t.length);
			i.seq1Range.isEmpty ? n[r] = kr(i, e, t, l, u) : i.seq2Range.isEmpty && (n[r] = kr(i.swap(), t, e, u, l).swap());
		}
		return n;
	}
	function kr(e, t, n, r, s) {
		let o = 1;
		for (; e.seq1Range.start - o >= r.start && e.seq2Range.start - o >= s.start && n.isStronglyEqual(e.seq2Range.start - o, e.seq2Range.endExclusive - o) && o < 100;) o++;
		o--;
		let l = 0;
		for (; e.seq1Range.start + l < r.endExclusive && e.seq2Range.endExclusive + l < s.endExclusive && n.isStronglyEqual(e.seq2Range.start + l, e.seq2Range.endExclusive + l) && l < 100;) l++;
		if (o === 0 && l === 0) return e;
		let u = 0, c = -1;
		for (let m = -o; m <= l; m++) {
			const h = e.seq2Range.start + m, d = e.seq2Range.endExclusive + m, f = e.seq1Range.start + m, g = t.getBoundaryScore(f) + n.getBoundaryScore(h) + n.getBoundaryScore(d);
			g > c && (c = g, u = m);
		}
		return e.delta(u);
	}
	function Ta(e, t, n) {
		const r = [];
		for (const s of n) {
			const i = r[r.length - 1];
			if (!i) {
				r.push(s);
				continue;
			}
			s.seq1Range.start - i.seq1Range.endExclusive <= 2 || s.seq2Range.start - i.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new te(i.seq1Range.join(s.seq1Range), i.seq2Range.join(s.seq2Range)) : r.push(s);
		}
		return r;
	}
	function Ia(e, t, n) {
		const r = te.invert(n, e.length), s = [];
		let i = new Ce(0, 0);
		function o(l, u) {
			if (l.offset1 < i.offset1 || l.offset2 < i.offset2) return;
			const c = e.findWordContaining(l.offset1), m = t.findWordContaining(l.offset2);
			if (!c || !m) return;
			let h = new te(c, m);
			const d = h.intersect(u);
			let f = d.seq1Range.length, g = d.seq2Range.length;
			for (; r.length > 0;) {
				const v = r[0];
				if (!(v.seq1Range.intersects(h.seq1Range) || v.seq2Range.intersects(h.seq2Range))) break;
				const L = new te(e.findWordContaining(v.seq1Range.start), t.findWordContaining(v.seq2Range.start)), N = L.intersect(v);
				if (f += N.seq1Range.length, g += N.seq2Range.length, h = h.join(L), h.seq1Range.endExclusive >= v.seq1Range.endExclusive) r.shift();
				else break;
			}
			f + g < (h.seq1Range.length + h.seq2Range.length) * 2 / 3 && s.push(h), i = h.getEndExclusives();
		}
		for (; r.length > 0;) {
			const l = r.shift();
			l.seq1Range.isEmpty || (o(l.getStarts(), l), o(l.getEndExclusives().delta(-1), l));
		}
		return Va(n, s);
	}
	function Va(e, t) {
		const n = [];
		for (; e.length > 0 || t.length > 0;) {
			const r = e[0], s = t[0];
			let i;
			r && (!s || r.seq1Range.start < s.seq1Range.start) ? i = e.shift() : i = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= i.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(i) : n.push(i);
		}
		return n;
	}
	function Ba(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let s = 0, i;
		do {
			i = !1;
			const l = [r[0]];
			for (let u = 1; u < r.length; u++) {
				let h = function(d, f) {
					const g = new U(m.seq1Range.endExclusive, c.seq1Range.start);
					return e.getText(g).replace(/\s/g, "").length <= 4 && (d.seq1Range.length + d.seq2Range.length > 5 || f.seq1Range.length + f.seq2Range.length > 5);
				};
				const c = r[u], m = l[l.length - 1];
				h(m, c) ? (i = !0, l[l.length - 1] = l[l.length - 1].join(c)) : l.push(c);
			}
			r = l;
		} while (s++ < 10 && i);
		return r;
	}
	function qa(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let s = 0, i;
		do {
			i = !1;
			const u = [r[0]];
			for (let c = 1; c < r.length; c++) {
				let d = function(f, g) {
					const v = new U(h.seq1Range.endExclusive, m.seq1Range.start);
					if (e.countLinesIn(v) > 5 || v.length > 500) return !1;
					const L = e.getText(v).trim();
					if (L.length > 20 || L.split(/\r\n|\r|\n/).length > 1) return !1;
					const N = e.countLinesIn(f.seq1Range), E = f.seq1Range.length, w = t.countLinesIn(f.seq2Range), p = f.seq2Range.length, b = e.countLinesIn(g.seq1Range), y = g.seq1Range.length, S = t.countLinesIn(g.seq2Range), F = g.seq2Range.length, H = 130;
					function Q(A) {
						return Math.min(A, H);
					}
					return Math.pow(Math.pow(Q(N * 40 + E), 1.5) + Math.pow(Q(w * 40 + p), 1.5), 1.5) + Math.pow(Math.pow(Q(b * 40 + y), 1.5) + Math.pow(Q(S * 40 + F), 1.5), 1.5) > (H ** 1.5) ** 1.5 * 1.3;
				};
				const m = r[c], h = u[u.length - 1];
				d(h, m) ? (i = !0, u[u.length - 1] = u[u.length - 1].join(m)) : u.push(m);
			}
			r = u;
		} while (s++ < 10 && i);
		const o = [];
		return va(r, (u, c, m) => {
			let h = c;
			function d(E) {
				return E.length > 0 && E.trim().length <= 3 && c.seq1Range.length + c.seq2Range.length > 100;
			}
			const f = e.extendToFullLines(c.seq1Range), g = e.getText(new U(f.start, c.seq1Range.start));
			d(g) && (h = h.deltaStart(-g.length));
			const v = e.getText(new U(c.seq1Range.endExclusive, f.endExclusive));
			d(v) && (h = h.deltaEnd(v.length));
			const L = te.fromOffsetPairs(u ? u.getEndExclusives() : Ce.zero, m ? m.getStarts() : Ce.max), N = h.intersect(L);
			o.length > 0 && N.getStarts().equals(o[o.length - 1].getEndExclusives()) ? o[o.length - 1] = o[o.length - 1].join(N) : o.push(N);
		}), o;
	}
	var Pr = class {
		constructor(e, t) {
			this.trimmedHash = e, this.lines = t;
		}
		getElement(e) {
			return this.trimmedHash[e];
		}
		get length() {
			return this.trimmedHash.length;
		}
		getBoundaryScore(e) {
			return 1e3 - ((e === 0 ? 0 : Dr(this.lines[e - 1])) + (e === this.lines.length ? 0 : Dr(this.lines[e])));
		}
		getText(e) {
			return this.lines.slice(e.start, e.endExclusive).join(`
`);
		}
		isStronglyEqual(e, t) {
			return this.lines[e] === this.lines[t];
		}
	};
	function Dr(e) {
		let t = 0;
		for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9);) t++;
		return t;
	}
	var Ua = class {
		constructor() {
			this.dynamicProgrammingDiffing = new Sa(), this.myersDiffingAlgorithm = new Sr();
		}
		computeDiff(e, t, n) {
			if (e.length <= 1 && ba(e, t, (p, b) => p === b)) return new dt([], [], !1);
			if (e.length === 1 && e[0].length === 0 || t.length === 1 && t[0].length === 0) return new dt([new Xe(new I(1, e.length + 1), new I(1, t.length + 1), [new ge(new T(1, 1, e.length, e[e.length - 1].length + 1), new T(1, 1, t.length, t[t.length - 1].length + 1))])], [], !1);
			const r = n.maxComputationTimeMs === 0 ? f1.instance : new Na(n.maxComputationTimeMs), s = !n.ignoreTrimWhitespace, i = /* @__PURE__ */ new Map();
			function o(p) {
				let b = i.get(p);
				return b === void 0 && (b = i.size, i.set(p, b)), b;
			}
			const l = e.map((p) => o(p.trim())), u = t.map((p) => o(p.trim())), c = new Pr(l, e), m = new Pr(u, t), h = c.length + m.length < 1700 ? this.dynamicProgrammingDiffing.compute(c, m, r, (p, b) => e[p] === t[b] ? t[b].length === 0 ? .1 : 1 + Math.log(1 + t[b].length) : .99) : this.myersDiffingAlgorithm.compute(c, m, r);
			let d = h.diffs, f = h.hitTimeout;
			d = xr(c, m, d), d = Ba(c, m, d);
			const g = [], v = (p) => {
				if (s) for (let b = 0; b < p; b++) {
					const y = L + b, S = N + b;
					if (e[y] !== t[S]) {
						const F = this.refineDiff(e, t, new te(new U(y, y + 1), new U(S, S + 1)), r, s);
						for (const H of F.mappings) g.push(H);
						F.hitTimeout && (f = !0);
					}
				}
			};
			let L = 0, N = 0;
			for (const p of d) {
				ft(() => p.seq1Range.start - L === p.seq2Range.start - N), v(p.seq1Range.start - L), L = p.seq1Range.endExclusive, N = p.seq2Range.endExclusive;
				const b = this.refineDiff(e, t, p, r, s);
				b.hitTimeout && (f = !0);
				for (const y of b.mappings) g.push(y);
			}
			v(e.length - L);
			const E = Fr(g, e, t);
			let w = [];
			return n.computeMoves && (w = this.computeMoves(E, e, t, l, u, r, s)), ft(() => {
				function p(y, S) {
					if (y.lineNumber < 1 || y.lineNumber > S.length) return !1;
					const F = S[y.lineNumber - 1];
					return !(y.column < 1 || y.column > F.length + 1);
				}
				function b(y, S) {
					return !(y.startLineNumber < 1 || y.startLineNumber > S.length + 1 || y.endLineNumberExclusive < 1 || y.endLineNumberExclusive > S.length + 1);
				}
				for (const y of E) {
					if (!y.innerChanges) return !1;
					for (const S of y.innerChanges) if (!(p(S.modifiedRange.getStartPosition(), t) && p(S.modifiedRange.getEndPosition(), t) && p(S.originalRange.getStartPosition(), e) && p(S.originalRange.getEndPosition(), e))) return !1;
					if (!b(y.modified, t) || !b(y.original, e)) return !1;
				}
				return !0;
			}), new dt(E, w, f);
		}
		computeMoves(e, t, n, r, s, i, o) {
			return Ea(e, t, n, r, s, i).map((l) => new ua(l, Fr(this.refineDiff(t, n, new te(l.original.toOffsetRange(), l.modified.toOffsetRange()), i, o).mappings, t, n, !0)));
		}
		refineDiff(e, t, n, r, s) {
			const i = $a(n).toRangeMapping2(e, t), o = new _t(e, i.originalRange, s), l = new _t(t, i.modifiedRange, s), u = o.length + l.length < 500 ? this.dynamicProgrammingDiffing.compute(o, l, r) : this.myersDiffingAlgorithm.compute(o, l, r);
			let c = u.diffs;
			return c = xr(o, l, c), c = Ia(o, l, c), c = Ta(o, l, c), c = qa(o, l, c), {
				mappings: c.map((m) => new ge(o.translateRange(m.seq1Range), l.translateRange(m.seq2Range))),
				hitTimeout: u.hitTimeout
			};
		}
	};
	function Fr(e, t, n, r = !1) {
		const s = [];
		for (const i of ya(e.map((o) => Ha(o, t, n)), (o, l) => o.original.overlapOrTouch(l.original) || o.modified.overlapOrTouch(l.modified))) {
			const o = i[0], l = i[i.length - 1];
			s.push(new Xe(o.original.join(l.original), o.modified.join(l.modified), i.map((u) => u.innerChanges[0])));
		}
		return ft(() => !r && s.length > 0 && (s[0].modified.startLineNumber !== s[0].original.startLineNumber || n.length - s[s.length - 1].modified.endLineNumberExclusive !== t.length - s[s.length - 1].original.endLineNumberExclusive) ? !1 : mr(s, (i, o) => o.original.startLineNumber - i.original.endLineNumberExclusive === o.modified.startLineNumber - i.modified.endLineNumberExclusive && i.original.endLineNumberExclusive < o.original.startLineNumber && i.modified.endLineNumberExclusive < o.modified.startLineNumber)), s;
	}
	function Ha(e, t, n) {
		let r = 0, s = 0;
		return e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (s = -1), e.modifiedRange.startColumn - 1 >= n[e.modifiedRange.startLineNumber - 1].length && e.originalRange.startColumn - 1 >= t[e.originalRange.startLineNumber - 1].length && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + s && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + s && (r = 1), new Xe(new I(e.originalRange.startLineNumber + r, e.originalRange.endLineNumber + 1 + s), new I(e.modifiedRange.startLineNumber + r, e.modifiedRange.endLineNumber + 1 + s), [e]);
	}
	function $a(e) {
		return new Fe(new I(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new I(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
	}
	const Tr = {
		getLegacy: () => new fa(),
		getDefault: () => new Ua()
	};
	function Ne(e, t) {
		const n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	var G = class {
		constructor(e, t, n, r = 1) {
			this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, t)) | 0, this.b = Math.min(255, Math.max(0, n)) | 0, this.a = Ne(Math.max(Math.min(1, r), 0), 3);
		}
		static equals(e, t) {
			return e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a;
		}
	}, Re = class tt {
		constructor(t, n, r, s) {
			this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Ne(Math.max(Math.min(1, n), 0), 3), this.l = Ne(Math.max(Math.min(1, r), 0), 3), this.a = Ne(Math.max(Math.min(1, s), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, s = t.b / 255, i = t.a, o = Math.max(n, r, s), l = Math.min(n, r, s);
			let u = 0, c = 0;
			const m = (l + o) / 2, h = o - l;
			if (h > 0) {
				switch (c = Math.min(m <= .5 ? h / (2 * m) : h / (2 - 2 * m), 1), o) {
					case n:
						u = (r - s) / h + (r < s ? 6 : 0);
						break;
					case r:
						u = (s - n) / h + 2;
						break;
					case s:
						u = (n - r) / h + 4;
						break;
				}
				u *= 60, u = Math.round(u);
			}
			return new tt(u, c, m, i);
		}
		static _hue2rgb(t, n, r) {
			return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
		}
		static toRGBA(t) {
			const n = t.h / 360, { s: r, l: s, a: i } = t;
			let o, l, u;
			if (r === 0) o = l = u = s;
			else {
				const c = s < .5 ? s * (1 + r) : s + r - s * r, m = 2 * s - c;
				o = tt._hue2rgb(m, c, n + 1 / 3), l = tt._hue2rgb(m, c, n), u = tt._hue2rgb(m, c, n - 1 / 3);
			}
			return new G(Math.round(o * 255), Math.round(l * 255), Math.round(u * 255), i);
		}
	}, vt = class ts {
		constructor(t, n, r, s) {
			this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Ne(Math.max(Math.min(1, n), 0), 3), this.v = Ne(Math.max(Math.min(1, r), 0), 3), this.a = Ne(Math.max(Math.min(1, s), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, s = t.b / 255, i = Math.max(n, r, s), o = i - Math.min(n, r, s), l = i === 0 ? 0 : o / i;
			let u;
			return o === 0 ? u = 0 : i === n ? u = ((r - s) / o % 6 + 6) % 6 : i === r ? u = (s - n) / o + 2 : u = (n - r) / o + 4, new ts(Math.round(u * 60), l, i, t.a);
		}
		static toRGBA(t) {
			const { h: n, s: r, v: s, a: i } = t, o = s * r, l = o * (1 - Math.abs(n / 60 % 2 - 1)), u = s - o;
			let [c, m, h] = [
				0,
				0,
				0
			];
			return n < 60 ? (c = o, m = l) : n < 120 ? (c = l, m = o) : n < 180 ? (m = o, h = l) : n < 240 ? (m = l, h = o) : n < 300 ? (c = l, h = o) : n <= 360 && (c = o, h = l), c = Math.round((c + u) * 255), m = Math.round((m + u) * 255), h = Math.round((h + u) * 255), new G(c, m, h, i);
		}
	}, wt = class j {
		static fromHex(t) {
			return j.Format.CSS.parseHex(t) || j.red;
		}
		static equals(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
		}
		get hsla() {
			return this._hsla ? this._hsla : Re.fromRGBA(this.rgba);
		}
		get hsva() {
			return this._hsva ? this._hsva : vt.fromRGBA(this.rgba);
		}
		constructor(t) {
			if (t) if (t instanceof G) this.rgba = t;
			else if (t instanceof Re) this._hsla = t, this.rgba = Re.toRGBA(t);
			else if (t instanceof vt) this._hsva = t, this.rgba = vt.toRGBA(t);
			else throw new Error("Invalid color ctor argument");
			else throw new Error("Color needs a value");
		}
		equals(t) {
			return !!t && G.equals(this.rgba, t.rgba) && Re.equals(this.hsla, t.hsla) && vt.equals(this.hsva, t.hsva);
		}
		getRelativeLuminance() {
			const t = j._relativeLuminanceForComponent(this.rgba.r), n = j._relativeLuminanceForComponent(this.rgba.g), r = j._relativeLuminanceForComponent(this.rgba.b);
			return Ne(.2126 * t + .7152 * n + .0722 * r, 4);
		}
		static _relativeLuminanceForComponent(t) {
			const n = t / 255;
			return n <= .03928 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
		}
		isLighter() {
			return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
		}
		isLighterThan(t) {
			return this.getRelativeLuminance() > t.getRelativeLuminance();
		}
		isDarkerThan(t) {
			return this.getRelativeLuminance() < t.getRelativeLuminance();
		}
		lighten(t) {
			return new j(new Re(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
		}
		darken(t) {
			return new j(new Re(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
		}
		transparent(t) {
			const { r: n, g: r, b: s, a: i } = this.rgba;
			return new j(new G(n, r, s, i * t));
		}
		isTransparent() {
			return this.rgba.a === 0;
		}
		isOpaque() {
			return this.rgba.a === 1;
		}
		opposite() {
			return new j(new G(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
		}
		makeOpaque(t) {
			if (this.isOpaque() || t.rgba.a !== 1) return this;
			const { r: n, g: r, b: s, a: i } = this.rgba;
			return new j(new G(t.rgba.r - i * (t.rgba.r - n), t.rgba.g - i * (t.rgba.g - r), t.rgba.b - i * (t.rgba.b - s), 1));
		}
		toString() {
			return this._toString || (this._toString = j.Format.CSS.format(this)), this._toString;
		}
		static getLighterColor(t, n, r) {
			if (t.isLighterThan(n)) return t;
			r = r || .5;
			const s = t.getRelativeLuminance(), i = n.getRelativeLuminance();
			return r = r * (i - s) / i, t.lighten(r);
		}
		static getDarkerColor(t, n, r) {
			if (t.isDarkerThan(n)) return t;
			r = r || .5;
			const s = t.getRelativeLuminance(), i = n.getRelativeLuminance();
			return r = r * (s - i) / s, t.darken(r);
		}
		static {
			this.white = new j(new G(255, 255, 255, 1));
		}
		static {
			this.black = new j(new G(0, 0, 0, 1));
		}
		static {
			this.red = new j(new G(255, 0, 0, 1));
		}
		static {
			this.blue = new j(new G(0, 0, 255, 1));
		}
		static {
			this.green = new j(new G(0, 255, 0, 1));
		}
		static {
			this.cyan = new j(new G(0, 255, 255, 1));
		}
		static {
			this.lightgrey = new j(new G(211, 211, 211, 1));
		}
		static {
			this.transparent = new j(new G(0, 0, 0, 0));
		}
	};
	(function(e) {
		(function(t) {
			(function(n) {
				function r(f) {
					return f.rgba.a === 1 ? `rgb(${f.rgba.r}, ${f.rgba.g}, ${f.rgba.b})` : e.Format.CSS.formatRGBA(f);
				}
				n.formatRGB = r;
				function s(f) {
					return `rgba(${f.rgba.r}, ${f.rgba.g}, ${f.rgba.b}, ${+f.rgba.a.toFixed(2)})`;
				}
				n.formatRGBA = s;
				function i(f) {
					return f.hsla.a === 1 ? `hsl(${f.hsla.h}, ${(f.hsla.s * 100).toFixed(2)}%, ${(f.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(f);
				}
				n.formatHSL = i;
				function o(f) {
					return `hsla(${f.hsla.h}, ${(f.hsla.s * 100).toFixed(2)}%, ${(f.hsla.l * 100).toFixed(2)}%, ${f.hsla.a.toFixed(2)})`;
				}
				n.formatHSLA = o;
				function l(f) {
					const g = f.toString(16);
					return g.length !== 2 ? "0" + g : g;
				}
				function u(f) {
					return `#${l(f.rgba.r)}${l(f.rgba.g)}${l(f.rgba.b)}`;
				}
				n.formatHex = u;
				function c(f, g = !1) {
					return g && f.rgba.a === 1 ? e.Format.CSS.formatHex(f) : `#${l(f.rgba.r)}${l(f.rgba.g)}${l(f.rgba.b)}${l(Math.round(f.rgba.a * 255))}`;
				}
				n.formatHexA = c;
				function m(f) {
					return f.isOpaque() ? e.Format.CSS.formatHex(f) : e.Format.CSS.formatRGBA(f);
				}
				n.format = m;
				function h(f) {
					const g = f.length;
					if (g === 0 || f.charCodeAt(0) !== 35) return null;
					if (g === 7) return new e(new G(16 * d(f.charCodeAt(1)) + d(f.charCodeAt(2)), 16 * d(f.charCodeAt(3)) + d(f.charCodeAt(4)), 16 * d(f.charCodeAt(5)) + d(f.charCodeAt(6)), 1));
					if (g === 9) return new e(new G(16 * d(f.charCodeAt(1)) + d(f.charCodeAt(2)), 16 * d(f.charCodeAt(3)) + d(f.charCodeAt(4)), 16 * d(f.charCodeAt(5)) + d(f.charCodeAt(6)), (16 * d(f.charCodeAt(7)) + d(f.charCodeAt(8))) / 255));
					if (g === 4) {
						const v = d(f.charCodeAt(1)), L = d(f.charCodeAt(2)), N = d(f.charCodeAt(3));
						return new e(new G(16 * v + v, 16 * L + L, 16 * N + N));
					}
					if (g === 5) {
						const v = d(f.charCodeAt(1)), L = d(f.charCodeAt(2)), N = d(f.charCodeAt(3)), E = d(f.charCodeAt(4));
						return new e(new G(16 * v + v, 16 * L + L, 16 * N + N, (16 * E + E) / 255));
					}
					return null;
				}
				n.parseHex = h;
				function d(f) {
					switch (f) {
						case 48: return 0;
						case 49: return 1;
						case 50: return 2;
						case 51: return 3;
						case 52: return 4;
						case 53: return 5;
						case 54: return 6;
						case 55: return 7;
						case 56: return 8;
						case 57: return 9;
						case 97: return 10;
						case 65: return 10;
						case 98: return 11;
						case 66: return 11;
						case 99: return 12;
						case 67: return 12;
						case 100: return 13;
						case 68: return 13;
						case 101: return 14;
						case 69: return 14;
						case 102: return 15;
						case 70: return 15;
					}
					return 0;
				}
			})(t.CSS || (t.CSS = {}));
		})(e.Format || (e.Format = {}));
	})(wt || (wt = {}));
	function Ir(e) {
		const t = [];
		for (const n of e) {
			const r = Number(n);
			(r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
		}
		return t;
	}
	function b1(e, t, n, r) {
		return {
			red: e / 255,
			blue: n / 255,
			green: t / 255,
			alpha: r
		};
	}
	function Ye(e, t) {
		const n = t.index, r = t[0].length;
		if (!n) return;
		const s = e.positionAt(n);
		return {
			startLineNumber: s.lineNumber,
			startColumn: s.column,
			endLineNumber: s.lineNumber,
			endColumn: s.column + r
		};
	}
	function Wa(e, t) {
		if (!e) return;
		const n = wt.Format.CSS.parseHex(t);
		if (n) return {
			range: e,
			color: b1(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
		};
	}
	function Vr(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = Ir(t[0].values());
		return {
			range: e,
			color: b1(r[0], r[1], r[2], n ? r[3] : 1)
		};
	}
	function Br(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = Ir(t[0].values()), s = new wt(new Re(r[0], r[1] / 100, r[2] / 100, n ? r[3] : 1));
		return {
			range: e,
			color: b1(s.rgba.r, s.rgba.g, s.rgba.b, s.rgba.a)
		};
	}
	function Qe(e, t) {
		return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
	}
	function za(e) {
		const t = [], n = Qe(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
		if (n.length > 0) for (const r of n) {
			const s = r.filter((u) => u !== void 0), i = s[1], o = s[2];
			if (!o) continue;
			let l;
			i === "rgb" ? l = Vr(Ye(e, r), Qe(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm), !1) : i === "rgba" ? l = Vr(Ye(e, r), Qe(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : i === "hsl" ? l = Br(Ye(e, r), Qe(o, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm), !1) : i === "hsla" ? l = Br(Ye(e, r), Qe(o, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : i === "#" && (l = Wa(Ye(e, r), i + o)), l && t.push(l);
		}
		return t;
	}
	function Oa(e) {
		return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : za(e);
	}
	const qr = /* @__PURE__ */ new RegExp("\\bMARK:\\s*(.*)$", "d"), ja = /^-+|-+$/g;
	function Ga(e, t) {
		let n = [];
		if (t.findRegionSectionHeaders && t.foldingRules?.markers) {
			const r = Xa(e, t);
			n = n.concat(r);
		}
		if (t.findMarkSectionHeaders) {
			const r = Ya(e);
			n = n.concat(r);
		}
		return n;
	}
	function Xa(e, t) {
		const n = [], r = e.getLineCount();
		for (let s = 1; s <= r; s++) {
			const i = e.getLineContent(s), o = i.match(t.foldingRules.markers.start);
			if (o) {
				const l = {
					startLineNumber: s,
					startColumn: o[0].length + 1,
					endLineNumber: s,
					endColumn: i.length + 1
				};
				if (l.endColumn > l.startColumn) {
					const u = {
						range: l,
						...Ur(i.substring(o[0].length)),
						shouldBeInComments: !1
					};
					(u.text || u.hasSeparatorLine) && n.push(u);
				}
			}
		}
		return n;
	}
	function Ya(e) {
		const t = [], n = e.getLineCount();
		for (let r = 1; r <= n; r++) Qa(e.getLineContent(r), r, t);
		return t;
	}
	function Qa(e, t, n) {
		qr.lastIndex = 0;
		const r = qr.exec(e);
		if (r) {
			const s = {
				startLineNumber: t,
				startColumn: r.indices[1][0] + 1,
				endLineNumber: t,
				endColumn: r.indices[1][1] + 1
			};
			if (s.endColumn > s.startColumn) {
				const i = {
					range: s,
					...Ur(r[1]),
					shouldBeInComments: !0
				};
				(i.text || i.hasSeparatorLine) && n.push(i);
			}
		}
	}
	function Ur(e) {
		e = e.trim();
		const t = e.startsWith("-");
		return e = e.replace(ja, ""), {
			text: e,
			hasSeparatorLine: t
		};
	}
	(function() {
		typeof globalThis.requestIdleCallback != "function" || globalThis.cancelIdleCallback;
	})();
	var Hr;
	(function(e) {
		async function t(r) {
			let s;
			const i = await Promise.all(r.map((o) => o.then((l) => l, (l) => {
				s || (s = l);
			})));
			if (typeof s < "u") throw s;
			return i;
		}
		e.settled = t;
		function n(r) {
			return new Promise(async (s, i) => {
				try {
					await r(s, i);
				} catch (o) {
					i(o);
				}
			});
		}
		e.withAsyncBody = n;
	})(Hr || (Hr = {}));
	(class re {
		static fromArray(t) {
			return new re((n) => {
				n.emitMany(t);
			});
		}
		static fromPromise(t) {
			return new re(async (n) => {
				n.emitMany(await t);
			});
		}
		static fromPromises(t) {
			return new re(async (n) => {
				await Promise.all(t.map(async (r) => n.emitOne(await r)));
			});
		}
		static merge(t) {
			return new re(async (n) => {
				await Promise.all(t.map(async (r) => {
					for await (const s of r) n.emitOne(s);
				}));
			});
		}
		static {
			this.EMPTY = re.fromArray([]);
		}
		constructor(t, n) {
			this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new se(), queueMicrotask(async () => {
				const r = {
					emitOne: (s) => this.emitOne(s),
					emitMany: (s) => this.emitMany(s),
					reject: (s) => this.reject(s)
				};
				try {
					await Promise.resolve(t(r)), this.resolve();
				} catch (s) {
					this.reject(s);
				} finally {
					r.emitOne = void 0, r.emitMany = void 0, r.reject = void 0;
				}
			});
		}
		[Symbol.asyncIterator]() {
			let t = 0;
			return {
				next: async () => {
					do {
						if (this._state === 2) throw this._error;
						if (t < this._results.length) return {
							done: !1,
							value: this._results[t++]
						};
						if (this._state === 1) return {
							done: !0,
							value: void 0
						};
						await it.toPromise(this._onStateChanged.event);
					} while (!0);
				},
				return: async () => (this._onReturn?.(), {
					done: !0,
					value: void 0
				})
			};
		}
		static map(t, n) {
			return new re(async (r) => {
				for await (const s of t) r.emitOne(n(s));
			});
		}
		map(t) {
			return re.map(this, t);
		}
		static filter(t, n) {
			return new re(async (r) => {
				for await (const s of t) n(s) && r.emitOne(s);
			});
		}
		filter(t) {
			return re.filter(this, t);
		}
		static coalesce(t) {
			return re.filter(t, (n) => !!n);
		}
		coalesce() {
			return re.coalesce(this);
		}
		static async toPromise(t) {
			const n = [];
			for await (const r of t) n.push(r);
			return n;
		}
		toPromise() {
			return re.toPromise(this);
		}
		emitOne(t) {
			this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
		}
		emitMany(t) {
			this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
		}
		resolve() {
			this._state === 0 && (this._state = 1, this._onStateChanged.fire());
		}
		reject(t) {
			this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
		}
	});
	var Za = class {
		constructor(e) {
			this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
		}
		insertValues(e, t) {
			e = Pe(e);
			const n = this.values, r = this.prefixSum, s = t.length;
			return s === 0 ? !1 : (this.values = new Uint32Array(n.length + s), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e), e + s), this.values.set(t, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		setValue(e, t) {
			return e = Pe(e), t = Pe(t), this.values[e] === t ? !1 : (this.values[e] = t, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
		}
		removeValues(e, t) {
			e = Pe(e), t = Pe(t);
			const n = this.values, r = this.prefixSum;
			if (e >= n.length) return !1;
			const s = n.length - e;
			return t >= s && (t = s), t === 0 ? !1 : (this.values = new Uint32Array(n.length - t), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e + t), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		getTotalSum() {
			return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
		}
		getPrefixSum(e) {
			return e < 0 ? 0 : (e = Pe(e), this._getPrefixSum(e));
		}
		_getPrefixSum(e) {
			if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e];
			let t = this.prefixSumValidIndex[0] + 1;
			t === 0 && (this.prefixSum[0] = this.values[0], t++), e >= this.values.length && (e = this.values.length - 1);
			for (let n = t; n <= e; n++) this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n];
			return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], e), this.prefixSum[e];
		}
		getIndexOf(e) {
			e = Math.floor(e), this.getTotalSum();
			let t = 0, n = this.values.length - 1, r = 0, s = 0, i = 0;
			for (; t <= n;) if (r = t + (n - t) / 2 | 0, s = this.prefixSum[r], i = s - this.values[r], e < i) n = r - 1;
			else if (e >= s) t = r + 1;
			else break;
			return new Ka(r, e - i);
		}
	}, Ka = class {
		constructor(e, t) {
			this.index = e, this.remainder = t, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = t;
		}
	}, e0 = class {
		constructor(e, t, n, r) {
			this._uri = e, this._lines = t, this._eol = n, this._versionId = r, this._lineStarts = null, this._cachedTextValue = null;
		}
		dispose() {
			this._lines.length = 0;
		}
		get version() {
			return this._versionId;
		}
		getText() {
			return this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)), this._cachedTextValue;
		}
		onEvents(e) {
			e.eol && e.eol !== this._eol && (this._eol = e.eol, this._lineStarts = null);
			const t = e.changes;
			for (const n of t) this._acceptDeleteRange(n.range), this._acceptInsertText(new z(n.range.startLineNumber, n.range.startColumn), n.text);
			this._versionId = e.versionId, this._cachedTextValue = null;
		}
		_ensureLineStarts() {
			if (!this._lineStarts) {
				const e = this._eol.length, t = this._lines.length, n = new Uint32Array(t);
				for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
				this._lineStarts = new Za(n);
			}
		}
		_setLineText(e, t) {
			this._lines[e] = t, this._lineStarts && this._lineStarts.setValue(e, this._lines[e].length + this._eol.length);
		}
		_acceptDeleteRange(e) {
			if (e.startLineNumber === e.endLineNumber) {
				if (e.startColumn === e.endColumn) return;
				this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.startLineNumber - 1].substring(e.endColumn - 1));
				return;
			}
			this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)), this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber), this._lineStarts && this._lineStarts.removeValues(e.startLineNumber, e.endLineNumber - e.startLineNumber);
		}
		_acceptInsertText(e, t) {
			if (t.length === 0) return;
			const n = Ts(t);
			if (n.length === 1) {
				this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
				return;
			}
			n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]);
			const r = new Uint32Array(n.length - 1);
			for (let s = 1; s < n.length; s++) this._lines.splice(e.lineNumber + s - 1, 0, n[s]), r[s - 1] = n[s].length + this._eol.length;
			this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
		}
	}, t0 = class {
		constructor() {
			this._models = Object.create(null);
		}
		getModel(e) {
			return this._models[e];
		}
		getModels() {
			const e = [];
			return Object.keys(this._models).forEach((t) => e.push(this._models[t])), e;
		}
		$acceptNewModel(e) {
			this._models[e.url] = new n0(ue.parse(e.url), e.lines, e.EOL, e.versionId);
		}
		$acceptModelChanged(e, t) {
			this._models[e] && this._models[e].onEvents(t);
		}
		$acceptRemovedModel(e) {
			this._models[e] && delete this._models[e];
		}
	}, n0 = class extends e0 {
		get uri() {
			return this._uri;
		}
		get eol() {
			return this._eol;
		}
		getValue() {
			return this.getText();
		}
		findMatches(e) {
			const t = [];
			for (let n = 0; n < this._lines.length; n++) {
				const r = this._lines[n], s = this.offsetAt(new z(n + 1, 1)), i = r.matchAll(e);
				for (const o of i) (o.index || o.index === 0) && (o.index = o.index + s), t.push(o);
			}
			return t;
		}
		getLinesContent() {
			return this._lines.slice(0);
		}
		getLineCount() {
			return this._lines.length;
		}
		getLineContent(e) {
			return this._lines[e - 1];
		}
		getWordAtPosition(e, t) {
			const n = o1(e.column, dr(t), this._lines[e.lineNumber - 1], 0);
			return n ? new T(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
		}
		words(e) {
			const t = this._lines, n = this._wordenize.bind(this);
			let r = 0, s = "", i = 0, o = [];
			return { *[Symbol.iterator]() {
				for (;;) if (i < o.length) {
					const l = s.substring(o[i].start, o[i].end);
					i += 1, yield l;
				} else if (r < t.length) s = t[r], o = n(s, e), i = 0, r += 1;
				else break;
			} };
		}
		getLineWords(e, t) {
			const n = this._lines[e - 1], r = this._wordenize(n, t), s = [];
			for (const i of r) s.push({
				word: n.substring(i.start, i.end),
				startColumn: i.start + 1,
				endColumn: i.end + 1
			});
			return s;
		}
		_wordenize(e, t) {
			const n = [];
			let r;
			for (t.lastIndex = 0; (r = t.exec(e)) && r[0].length !== 0;) n.push({
				start: r.index,
				end: r.index + r[0].length
			});
			return n;
		}
		getValueInRange(e) {
			if (e = this._validateRange(e), e.startLineNumber === e.endLineNumber) return this._lines[e.startLineNumber - 1].substring(e.startColumn - 1, e.endColumn - 1);
			const t = this._eol, n = e.startLineNumber - 1, r = e.endLineNumber - 1, s = [];
			s.push(this._lines[n].substring(e.startColumn - 1));
			for (let i = n + 1; i < r; i++) s.push(this._lines[i]);
			return s.push(this._lines[r].substring(0, e.endColumn - 1)), s.join(t);
		}
		offsetAt(e) {
			return e = this._validatePosition(e), this._ensureLineStarts(), this._lineStarts.getPrefixSum(e.lineNumber - 2) + (e.column - 1);
		}
		positionAt(e) {
			e = Math.floor(e), e = Math.max(0, e), this._ensureLineStarts();
			const t = this._lineStarts.getIndexOf(e), n = this._lines[t.index].length;
			return {
				lineNumber: 1 + t.index,
				column: 1 + Math.min(t.remainder, n)
			};
		}
		_validateRange(e) {
			const t = this._validatePosition({
				lineNumber: e.startLineNumber,
				column: e.startColumn
			}), n = this._validatePosition({
				lineNumber: e.endLineNumber,
				column: e.endColumn
			});
			return t.lineNumber !== e.startLineNumber || t.column !== e.startColumn || n.lineNumber !== e.endLineNumber || n.column !== e.endColumn ? {
				startLineNumber: t.lineNumber,
				startColumn: t.column,
				endLineNumber: n.lineNumber,
				endColumn: n.column
			} : e;
		}
		_validatePosition(e) {
			if (!z.isIPosition(e)) throw new Error("bad position");
			let { lineNumber: t, column: n } = e, r = !1;
			if (t < 1) t = 1, n = 1, r = !0;
			else if (t > this._lines.length) t = this._lines.length, n = this._lines[t - 1].length + 1, r = !0;
			else {
				const s = this._lines[t - 1].length + 1;
				n < 1 ? (n = 1, r = !0) : n > s && (n = s, r = !0);
			}
			return r ? {
				lineNumber: t,
				column: n
			} : e;
		}
	}, r0 = class {
		constructor() {
			this._workerTextModelSyncServer = new t0();
		}
		dispose() {}
		_getModel(e) {
			return this._workerTextModelSyncServer.getModel(e);
		}
		_getModels() {
			return this._workerTextModelSyncServer.getModels();
		}
		$acceptNewModel(e) {
			this._workerTextModelSyncServer.$acceptNewModel(e);
		}
		$acceptModelChanged(e, t) {
			this._workerTextModelSyncServer.$acceptModelChanged(e, t);
		}
		$acceptRemovedModel(e) {
			this._workerTextModelSyncServer.$acceptRemovedModel(e);
		}
		async $computeUnicodeHighlights(e, t, n) {
			const r = this._getModel(e);
			return r ? oa.computeUnicodeHighlights(r, t, n) : {
				ranges: [],
				hasMore: !1,
				ambiguousCharacterCount: 0,
				invisibleCharacterCount: 0,
				nonBasicAsciiCharacterCount: 0
			};
		}
		async $findSectionHeaders(e, t) {
			const n = this._getModel(e);
			return n ? Ga(n, t) : [];
		}
		async $computeDiff(e, t, n, r) {
			const s = this._getModel(e), i = this._getModel(t);
			return !s || !i ? null : Lt.computeDiff(s, i, n, r);
		}
		static computeDiff(e, t, n, r) {
			const s = r === "advanced" ? Tr.getDefault() : Tr.getLegacy(), i = e.getLinesContent(), o = t.getLinesContent(), l = s.computeDiff(i, o, n), u = l.changes.length > 0 ? !1 : this._modelsAreIdentical(e, t);
			function c(m) {
				return m.map((h) => [
					h.original.startLineNumber,
					h.original.endLineNumberExclusive,
					h.modified.startLineNumber,
					h.modified.endLineNumberExclusive,
					h.innerChanges?.map((d) => [
						d.originalRange.startLineNumber,
						d.originalRange.startColumn,
						d.originalRange.endLineNumber,
						d.originalRange.endColumn,
						d.modifiedRange.startLineNumber,
						d.modifiedRange.startColumn,
						d.modifiedRange.endLineNumber,
						d.modifiedRange.endColumn
					])
				]);
			}
			return {
				identical: u,
				quitEarly: l.hitTimeout,
				changes: c(l.changes),
				moves: l.moves.map((m) => [
					m.lineRangeMapping.original.startLineNumber,
					m.lineRangeMapping.original.endLineNumberExclusive,
					m.lineRangeMapping.modified.startLineNumber,
					m.lineRangeMapping.modified.endLineNumberExclusive,
					c(m.changes)
				])
			};
		}
		static _modelsAreIdentical(e, t) {
			const n = e.getLineCount();
			if (n !== t.getLineCount()) return !1;
			for (let r = 1; r <= n; r++) if (e.getLineContent(r) !== t.getLineContent(r)) return !1;
			return !0;
		}
		static {
			this._diffLimit = 1e5;
		}
		async $computeMoreMinimalEdits(e, t, n) {
			const r = this._getModel(e);
			if (!r) return t;
			const s = [];
			let i;
			t = t.slice(0).sort((l, u) => l.range && u.range ? T.compareRangesUsingStarts(l.range, u.range) : (l.range ? 0 : 1) - (u.range ? 0 : 1));
			let o = 0;
			for (let l = 1; l < t.length; l++) T.getEndPosition(t[o].range).equals(T.getStartPosition(t[l].range)) ? (t[o].range = T.fromPositions(T.getStartPosition(t[o].range), T.getEndPosition(t[l].range)), t[o].text += t[l].text) : (o++, t[o] = t[l]);
			t.length = o + 1;
			for (let { range: l, text: u, eol: c } of t) {
				if (typeof c == "number" && (i = c), T.isEmpty(l) && !u) continue;
				const m = r.getValueInRange(l);
				if (u = u.replace(/\r\n|\n|\r/g, r.eol), m === u) continue;
				if (Math.max(u.length, m.length) > Lt._diffLimit) {
					s.push({
						range: l,
						text: u
					});
					continue;
				}
				const h = vi(m, u, n), d = r.offsetAt(T.lift(l).getStartPosition());
				for (const f of h) {
					const g = r.positionAt(d + f.originalStart), v = r.positionAt(d + f.originalStart + f.originalLength), L = {
						text: u.substr(f.modifiedStart, f.modifiedLength),
						range: {
							startLineNumber: g.lineNumber,
							startColumn: g.column,
							endLineNumber: v.lineNumber,
							endColumn: v.column
						}
					};
					r.getValueInRange(L.range) !== L.text && s.push(L);
				}
			}
			return typeof i == "number" && s.push({
				eol: i,
				text: "",
				range: {
					startLineNumber: 0,
					startColumn: 0,
					endLineNumber: 0,
					endColumn: 0
				}
			}), s;
		}
		async $computeLinks(e) {
			const t = this._getModel(e);
			return t ? Ai(t) : null;
		}
		async $computeDefaultDocumentColors(e) {
			const t = this._getModel(e);
			return t ? Oa(t) : null;
		}
		static {
			this._suggestionsLimit = 1e4;
		}
		async $textualSuggest(e, t, n, r) {
			const s = new x1(), i = new RegExp(n, r), o = /* @__PURE__ */ new Set();
			e: for (const l of e) {
				const u = this._getModel(l);
				if (u) {
					for (const c of u.words(i)) if (!(c === t || !isNaN(Number(c))) && (o.add(c), o.size > Lt._suggestionsLimit)) break e;
				}
			}
			return {
				words: Array.from(o),
				duration: s.elapsed()
			};
		}
		async $computeWordRanges(e, t, n, r) {
			const s = this._getModel(e);
			if (!s) return Object.create(null);
			const i = new RegExp(n, r), o = Object.create(null);
			for (let l = t.startLineNumber; l < t.endLineNumber; l++) {
				const u = s.getLineWords(l, i);
				for (const c of u) {
					if (!isNaN(Number(c.word))) continue;
					let m = o[c.word];
					m || (m = [], o[c.word] = m), m.push({
						startLineNumber: l,
						startColumn: c.startColumn,
						endLineNumber: l,
						endColumn: c.endColumn
					});
				}
			}
			return o;
		}
		async $navigateValueSet(e, t, n, r, s) {
			const i = this._getModel(e);
			if (!i) return null;
			const o = new RegExp(r, s);
			t.startColumn === t.endColumn && (t = {
				startLineNumber: t.startLineNumber,
				startColumn: t.startColumn,
				endLineNumber: t.endLineNumber,
				endColumn: t.endColumn + 1
			});
			const l = i.getValueInRange(t), u = i.getWordAtPosition({
				lineNumber: t.startLineNumber,
				column: t.startColumn
			}, o);
			if (!u) return null;
			const c = i.getValueInRange(u);
			return Ei.INSTANCE.navigateValueSet(t, l, u, c, n);
		}
	}, Lt = class extends r0 {
		constructor(e, t) {
			super(), this._host = e, this._foreignModuleFactory = t, this._foreignModule = null;
		}
		async $ping() {
			return "pong";
		}
		$loadForeignModule(e, t, n) {
			const s = {
				host: Zi(n, (i, o) => this._host.$fhr(i, o)),
				getMirrorModels: () => this._getModels()
			};
			return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(s, t), Promise.resolve(lr(this._foreignModule))) : new Promise((i, o) => {
				const l = (u) => {
					this._foreignModule = u.create(s, t), i(lr(this._foreignModule));
				};
				import(`${W1.asBrowserUri(`${e}.js`).toString(!0)}`).then(l).catch(o);
			});
		}
		$fmr(e, t) {
			if (!this._foreignModule || typeof this._foreignModule[e] != "function") return Promise.reject(/* @__PURE__ */ new Error("Missing requestHandler or method: " + e));
			try {
				return Promise.resolve(this._foreignModule[e].apply(this._foreignModule, t));
			} catch (n) {
				return Promise.reject(n);
			}
		}
	};
	typeof importScripts == "function" && (globalThis.monaco = Wi());
	let _1 = !1;
	function s0(e) {
		if (_1) return;
		_1 = !0;
		const t = new bi((n) => {
			globalThis.postMessage(n);
		}, (n) => new Lt(zi.getChannel(n), e));
		globalThis.onmessage = (n) => {
			t.onmessage(n.data);
		};
	}
	globalThis.onmessage = (e) => {
		_1 || s0(null);
	};
})();
