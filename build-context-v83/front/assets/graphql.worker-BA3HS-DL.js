(function() {
	var y2 = Object.create, Vi = Object.defineProperty, v2 = Object.getOwnPropertyDescriptor, E2 = Object.getOwnPropertyNames, b2 = Object.getPrototypeOf, _2 = Object.prototype.hasOwnProperty, N2 = (e, t) => () => (e && (t = e(e = 0)), t), xn = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), T2 = (e, t) => {
		let n = {};
		for (var r in e) Vi(n, r, {
			get: e[r],
			enumerable: !0
		});
		return t || Vi(n, Symbol.toStringTag, { value: "Module" }), n;
	}, S2 = (e, t, n, r) => {
		if (t && typeof t == "object" || typeof t == "function") for (var i = E2(t), s = 0, a = i.length, o; s < a; s++) o = i[s], !_2.call(e, o) && o !== n && Vi(e, o, {
			get: ((u) => t[u]).bind(null, o),
			enumerable: !(r = v2(t, o)) || r.enumerable
		});
		return e;
	}, ba = (e, t, n) => (n = e != null ? y2(b2(e)) : {}, S2(t || !e || !e.__esModule ? Vi(n, "default", {
		value: e,
		enumerable: !0
	}) : n, e)), F2 = class {
		constructor() {
			this.listeners = [], this.unexpectedErrorHandler = function(e) {
				setTimeout(() => {
					throw e.stack ? Na.isErrorNoTelemetry(e) ? new Na(e.message + `

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
	const A2 = new F2();
	function ei(e) {
		C2(e) || A2.onUnexpectedError(e);
	}
	function Fl(e) {
		if (e instanceof Error) {
			const { name: t, message: n } = e;
			return {
				$isError: !0,
				name: t,
				message: n,
				stack: e.stacktrace || e.stack,
				noTelemetry: Na.isErrorNoTelemetry(e)
			};
		}
		return e;
	}
	const _a = "Canceled";
	function C2(e) {
		return e instanceof w2 ? !0 : e instanceof Error && e.name === _a && e.message === _a;
	}
	var w2 = class extends Error {
		constructor() {
			super(_a), this.name = this.message;
		}
	}, Na = class vl extends Error {
		constructor(t) {
			super(t), this.name = "CodeExpectedError";
		}
		static fromError(t) {
			if (t instanceof vl) return t;
			const n = new vl();
			return n.message = t.message, n.stack = t.stack, n;
		}
		static isErrorNoTelemetry(t) {
			return t.name === "CodeExpectedError";
		}
	}, Ht = class n2 extends Error {
		constructor(t) {
			super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, n2.prototype);
		}
	};
	function I2(e, t) {
		const n = this;
		let r = !1, i;
		return function() {
			if (r) return i;
			if (r = !0, t) try {
				i = e.apply(n, arguments);
			} finally {
				t();
			}
			else i = e.apply(n, arguments);
			return i;
		};
	}
	var $i;
	(function(e) {
		function t(T) {
			return T && typeof T == "object" && typeof T[Symbol.iterator] == "function";
		}
		e.is = t;
		const n = Object.freeze([]);
		function r() {
			return n;
		}
		e.empty = r;
		function* i(T) {
			yield T;
		}
		e.single = i;
		function s(T) {
			return t(T) ? T : i(T);
		}
		e.wrap = s;
		function a(T) {
			return T || n;
		}
		e.from = a;
		function* o(T) {
			for (let A = T.length - 1; A >= 0; A--) yield T[A];
		}
		e.reverse = o;
		function u(T) {
			return !T || T[Symbol.iterator]().next().done === !0;
		}
		e.isEmpty = u;
		function l(T) {
			return T[Symbol.iterator]().next().value;
		}
		e.first = l;
		function c(T, A) {
			let k = 0;
			for (const V of T) if (A(V, k++)) return !0;
			return !1;
		}
		e.some = c;
		function d(T, A) {
			for (const k of T) if (A(k)) return k;
		}
		e.find = d;
		function* m(T, A) {
			for (const k of T) A(k) && (yield k);
		}
		e.filter = m;
		function* p(T, A) {
			let k = 0;
			for (const V of T) yield A(V, k++);
		}
		e.map = p;
		function* g(T, A) {
			let k = 0;
			for (const V of T) yield* A(V, k++);
		}
		e.flatMap = g;
		function* v(...T) {
			for (const A of T) yield* A;
		}
		e.concat = v;
		function F(T, A, k) {
			let V = k;
			for (const K of T) V = A(V, K);
			return V;
		}
		e.reduce = F;
		function* S(T, A, k = T.length) {
			for (A < 0 && (A += T.length), k < 0 ? k += T.length : k > T.length && (k = T.length); A < k; A++) yield T[A];
		}
		e.slice = S;
		function C(T, A = Number.POSITIVE_INFINITY) {
			const k = [];
			if (A === 0) return [k, T];
			const V = T[Symbol.iterator]();
			for (let K = 0; K < A; K++) {
				const L = V.next();
				if (L.done) return [k, e.empty()];
				k.push(L.value);
			}
			return [k, { [Symbol.iterator]() {
				return V;
			} }];
		}
		e.consume = C;
		async function w(T) {
			const A = [];
			for await (const k of T) A.push(k);
			return Promise.resolve(A);
		}
		e.asyncToArray = w;
	})($i || ($i = {}));
	function Ta(e) {
		return e;
	}
	function Al(e) {
		if ($i.is(e)) {
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
	function R2(...e) {
		return Ui(() => Al(e));
	}
	function Ui(e) {
		return Ta({ dispose: I2(() => {
			e();
		}) });
	}
	var Aa = class r2 {
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
				Al(this._toDispose);
			} finally {
				this._toDispose.clear();
			}
		}
		add(t) {
			if (!t) return t;
			if (t === this) throw new Error("Cannot register a disposable on itself!");
			return this._isDisposed ? r2.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
		}
		deleteAndLeak(t) {
			t && this._toDispose.has(t) && this._toDispose.delete(t);
		}
	}, ji = class {
		static {
			this.None = Object.freeze({ dispose() {} });
		}
		constructor() {
			this._store = new Aa(), this._store;
		}
		dispose() {
			this._store.dispose();
		}
		_register(e) {
			if (e === this) throw new Error("Cannot register a disposable on itself!");
			return this._store.add(e);
		}
	}, Be = class ma {
		static {
			this.Undefined = new ma(void 0);
		}
		constructor(t) {
			this.element = t, this.next = ma.Undefined, this.prev = ma.Undefined;
		}
	}, k2 = class {
		constructor() {
			this._first = Be.Undefined, this._last = Be.Undefined, this._size = 0;
		}
		get size() {
			return this._size;
		}
		isEmpty() {
			return this._first === Be.Undefined;
		}
		clear() {
			let e = this._first;
			for (; e !== Be.Undefined;) {
				const t = e.next;
				e.prev = Be.Undefined, e.next = Be.Undefined, e = t;
			}
			this._first = Be.Undefined, this._last = Be.Undefined, this._size = 0;
		}
		unshift(e) {
			return this._insert(e, !1);
		}
		push(e) {
			return this._insert(e, !0);
		}
		_insert(e, t) {
			const n = new Be(e);
			if (this._first === Be.Undefined) this._first = n, this._last = n;
			else if (t) {
				const i = this._last;
				this._last = n, n.prev = i, i.next = n;
			} else {
				const i = this._first;
				this._first = n, n.next = i, i.prev = n;
			}
			this._size += 1;
			let r = !1;
			return () => {
				r || (r = !0, this._remove(n));
			};
		}
		shift() {
			if (this._first !== Be.Undefined) {
				const e = this._first.element;
				return this._remove(this._first), e;
			}
		}
		pop() {
			if (this._last !== Be.Undefined) {
				const e = this._last.element;
				return this._remove(this._last), e;
			}
		}
		_remove(e) {
			if (e.prev !== Be.Undefined && e.next !== Be.Undefined) {
				const t = e.prev;
				t.next = e.next, e.next.prev = t;
			} else e.prev === Be.Undefined && e.next === Be.Undefined ? (this._first = Be.Undefined, this._last = Be.Undefined) : e.next === Be.Undefined ? (this._last = this._last.prev, this._last.next = Be.Undefined) : e.prev === Be.Undefined && (this._first = this._first.next, this._first.prev = Be.Undefined);
			this._size -= 1;
		}
		*[Symbol.iterator]() {
			let e = this._first;
			for (; e !== Be.Undefined;) yield e.element, e = e.next;
		}
	};
	const x2 = globalThis.performance && typeof globalThis.performance.now == "function";
	var Cl = class i2 {
		static create(t) {
			return new i2(t);
		}
		constructor(t) {
			this._now = x2 && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
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
	}, qi;
	(function(e) {
		e.None = () => ji.None;
		function t(I, B) {
			return m(I, () => {}, 0, void 0, !0, void 0, B);
		}
		e.defer = t;
		function n(I) {
			return (B, G = null, q) => {
				let ee = !1, W;
				return W = I((se) => {
					if (!ee) return W ? W.dispose() : ee = !0, B.call(G, se);
				}, null, q), ee && W.dispose(), W;
			};
		}
		e.once = n;
		function r(I, B) {
			return e.once(e.filter(I, B));
		}
		e.onceIf = r;
		function i(I, B, G) {
			return c((q, ee = null, W) => I((se) => q.call(ee, B(se)), null, W), G);
		}
		e.map = i;
		function s(I, B, G) {
			return c((q, ee = null, W) => I((se) => {
				B(se), q.call(ee, se);
			}, null, W), G);
		}
		e.forEach = s;
		function a(I, B, G) {
			return c((q, ee = null, W) => I((se) => B(se) && q.call(ee, se), null, W), G);
		}
		e.filter = a;
		function o(I) {
			return I;
		}
		e.signal = o;
		function u(...I) {
			return (B, G = null, q) => d(R2(...I.map((ee) => ee((W) => B.call(G, W)))), q);
		}
		e.any = u;
		function l(I, B, G, q) {
			let ee = G;
			return i(I, (W) => (ee = B(ee, W), ee), q);
		}
		e.reduce = l;
		function c(I, B) {
			let G;
			const ee = new Bt({
				onWillAddFirstListener() {
					G = I(ee.fire, ee);
				},
				onDidRemoveLastListener() {
					G?.dispose();
				}
			});
			return B?.add(ee), ee.event;
		}
		function d(I, B) {
			return B instanceof Array ? B.push(I) : B && B.add(I), I;
		}
		function m(I, B, G = 100, q = !1, ee = !1, W, se) {
			let ue, Ne, _, J = 0, Y;
			const x = new Bt({
				leakWarningThreshold: W,
				onWillAddFirstListener() {
					ue = I((P) => {
						J++, Ne = B(Ne, P), q && !_ && (x.fire(Ne), Ne = void 0), Y = () => {
							const re = Ne;
							Ne = void 0, _ = void 0, (!q || J > 1) && x.fire(re), J = 0;
						}, typeof G == "number" ? (clearTimeout(_), _ = setTimeout(Y, G)) : _ === void 0 && (_ = 0, queueMicrotask(Y));
					});
				},
				onWillRemoveListener() {
					ee && J > 0 && Y?.();
				},
				onDidRemoveLastListener() {
					Y = void 0, ue.dispose();
				}
			});
			return se?.add(x), x.event;
		}
		e.debounce = m;
		function p(I, B = 0, G) {
			return e.debounce(I, (q, ee) => q ? (q.push(ee), q) : [ee], B, void 0, !0, void 0, G);
		}
		e.accumulate = p;
		function g(I, B = (q, ee) => q === ee, G) {
			let q = !0, ee;
			return a(I, (W) => {
				const se = q || !B(W, ee);
				return q = !1, ee = W, se;
			}, G);
		}
		e.latch = g;
		function v(I, B, G) {
			return [e.filter(I, B, G), e.filter(I, (q) => !B(q), G)];
		}
		e.split = v;
		function F(I, B = !1, G = [], q) {
			let ee = G.slice(), W = I((Ne) => {
				ee ? ee.push(Ne) : ue.fire(Ne);
			});
			q && q.add(W);
			const se = () => {
				ee?.forEach((Ne) => ue.fire(Ne)), ee = null;
			}, ue = new Bt({
				onWillAddFirstListener() {
					W || (W = I((Ne) => ue.fire(Ne)), q && q.add(W));
				},
				onDidAddFirstListener() {
					ee && (B ? setTimeout(se) : se());
				},
				onDidRemoveLastListener() {
					W && W.dispose(), W = null;
				}
			});
			return q && q.add(ue), ue.event;
		}
		e.buffer = F;
		function S(I, B) {
			return (q, ee, W) => {
				const se = B(new w());
				return I(function(ue) {
					const Ne = se.evaluate(ue);
					Ne !== C && q.call(ee, Ne);
				}, void 0, W);
			};
		}
		e.chain = S;
		const C = Symbol("HaltChainable");
		class w {
			constructor() {
				this.steps = [];
			}
			map(B) {
				return this.steps.push(B), this;
			}
			forEach(B) {
				return this.steps.push((G) => (B(G), G)), this;
			}
			filter(B) {
				return this.steps.push((G) => B(G) ? G : C), this;
			}
			reduce(B, G) {
				let q = G;
				return this.steps.push((ee) => (q = B(q, ee), q)), this;
			}
			latch(B = (G, q) => G === q) {
				let G = !0, q;
				return this.steps.push((ee) => {
					const W = G || !B(ee, q);
					return G = !1, q = ee, W ? ee : C;
				}), this;
			}
			evaluate(B) {
				for (const G of this.steps) if (B = G(B), B === C) break;
				return B;
			}
		}
		function T(I, B, G = (q) => q) {
			const q = (...ue) => se.fire(G(...ue)), ee = () => I.on(B, q), W = () => I.removeListener(B, q), se = new Bt({
				onWillAddFirstListener: ee,
				onDidRemoveLastListener: W
			});
			return se.event;
		}
		e.fromNodeEventEmitter = T;
		function A(I, B, G = (q) => q) {
			const q = (...ue) => se.fire(G(...ue)), ee = () => I.addEventListener(B, q), W = () => I.removeEventListener(B, q), se = new Bt({
				onWillAddFirstListener: ee,
				onDidRemoveLastListener: W
			});
			return se.event;
		}
		e.fromDOMEventEmitter = A;
		function k(I) {
			return new Promise((B) => n(I)(B));
		}
		e.toPromise = k;
		function V(I) {
			const B = new Bt();
			return I.then((G) => {
				B.fire(G);
			}, () => {
				B.fire(void 0);
			}).finally(() => {
				B.dispose();
			}), B.event;
		}
		e.fromPromise = V;
		function K(I, B) {
			return I((G) => B.fire(G));
		}
		e.forward = K;
		function L(I, B, G) {
			return B(G), I((q) => B(q));
		}
		e.runAndSubscribe = L;
		class M {
			constructor(B, G) {
				this._observable = B, this._counter = 0, this._hasChanged = !1;
				const q = {
					onWillAddFirstListener: () => {
						B.addObserver(this), this._observable.reportChanges();
					},
					onDidRemoveLastListener: () => {
						B.removeObserver(this);
					}
				};
				this.emitter = new Bt(q), G && G.add(this.emitter);
			}
			beginUpdate(B) {
				this._counter++;
			}
			handlePossibleChange(B) {}
			handleChange(B, G) {
				this._hasChanged = !0;
			}
			endUpdate(B) {
				this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
			}
		}
		function O(I, B) {
			return new M(I, B).emitter.event;
		}
		e.fromObservable = O;
		function oe(I) {
			return (B, G, q) => {
				let ee = 0, W = !1;
				const se = {
					beginUpdate() {
						ee++;
					},
					endUpdate() {
						ee--, ee === 0 && (I.reportChanges(), W && (W = !1, B.call(G)));
					},
					handlePossibleChange() {},
					handleChange() {
						W = !0;
					}
				};
				I.addObserver(se), I.reportChanges();
				const ue = { dispose() {
					I.removeObserver(se);
				} };
				return q instanceof Aa ? q.add(ue) : Array.isArray(q) && q.push(ue), ue;
			};
		}
		e.fromObservableLight = oe;
	})(qi || (qi = {}));
	var O2 = class El {
		static {
			this.all = /* @__PURE__ */ new Set();
		}
		static {
			this._idPool = 0;
		}
		constructor(t) {
			this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${El._idPool++}`, El.all.add(this);
		}
		start(t) {
			this._stopWatch = new Cl(), this.listenerCount = t;
		}
		stop() {
			if (this._stopWatch) {
				const t = this._stopWatch.elapsed();
				this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
			}
		}
	};
	let M2 = -1;
	var P2 = class s2 {
		static {
			this._idPool = 1;
		}
		constructor(t, n, r = (s2._idPool++).toString(16).padStart(3, "0")) {
			this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
		}
		dispose() {
			this._stacks?.clear();
		}
		check(t, n) {
			const r = this.threshold;
			if (r <= 0 || n < r) return;
			this._stacks || (this._stacks = /* @__PURE__ */ new Map());
			const i = this._stacks.get(t.value) || 0;
			if (this._stacks.set(t.value, i + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
				this._warnCountdown = r * .5;
				const [s, a] = this.getMostFrequentStack(), o = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${a}):`;
				console.warn(o), console.warn(s);
				const u = new V2(o, s);
				this._errorHandler(u);
			}
			return () => {
				const s = this._stacks.get(t.value) || 0;
				this._stacks.set(t.value, s - 1);
			};
		}
		getMostFrequentStack() {
			if (!this._stacks) return;
			let t, n = 0;
			for (const [r, i] of this._stacks) (!t || n < i) && (t = [r, i], n = i);
			return t;
		}
	}, B2 = class a2 {
		static create() {
			return new a2((/* @__PURE__ */ new Error()).stack ?? "");
		}
		constructor(t) {
			this.value = t;
		}
		print() {
			console.warn(this.value.split(`
`).slice(2).join(`
`));
		}
	}, V2 = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerLeakError", this.stack = t;
		}
	}, $2 = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerRefusalError", this.stack = t;
		}
	}, Ca = class {
		constructor(e) {
			this.value = e;
		}
	};
	const U2 = 2;
	var Bt = class {
		constructor(e) {
			this._size = 0, this._options = e, this._leakageMon = this._options?.leakWarningThreshold ? new P2(e?.onListenerError ?? ei, this._options?.leakWarningThreshold ?? M2) : void 0, this._perfMon = this._options?._profName ? new O2(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
		}
		dispose() {
			this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
		}
		get event() {
			return this._event ??= (e, t, n) => {
				if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
					const a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
					console.warn(a);
					const o = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], u = new $2(`${a}. HINT: Stack shows most frequent listener (${o[1]}-times)`, o[0]);
					return (this._options?.onListenerError || ei)(u), ji.None;
				}
				if (this._disposed) return ji.None;
				t && (e = e.bind(t));
				const r = new Ca(e);
				let i;
				this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = B2.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof Ca ? (this._deliveryQueue ??= new j2(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
				const s = Ui(() => {
					i?.(), this._removeListener(r);
				});
				return n instanceof Aa ? n.add(s) : Array.isArray(n) && n.push(s), s;
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
			if (this._size * U2 <= t.length) {
				let i = 0;
				for (let s = 0; s < t.length; s++) t[s] ? t[i++] = t[s] : r && (this._deliveryQueue.end--, i < this._deliveryQueue.i && this._deliveryQueue.i--);
				t.length = i;
			}
		}
		_deliver(e, t) {
			if (!e) return;
			const n = this._options?.onListenerError || ei;
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
			if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Ca) this._deliver(this._listeners, e);
			else {
				const t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
			this._perfMon?.stop();
		}
		hasListeners() {
			return this._size > 0;
		}
	}, j2 = class {
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
	function q2() {
		return globalThis._VSCODE_NLS_MESSAGES;
	}
	function wl() {
		return globalThis._VSCODE_NLS_LANGUAGE;
	}
	const H2 = wl() === "pseudo" || typeof document < "u" && document.location && document.location.hash.indexOf("pseudo=true") >= 0;
	function Il(e, t) {
		let n;
		return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, i) => {
			const s = t[i[0]];
			let a = r;
			return typeof s == "string" ? a = s : (typeof s == "number" || typeof s == "boolean" || s === void 0 || s === null) && (a = String(s)), a;
		}), H2 && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
	}
	function Re(e, t, ...n) {
		return Il(typeof e == "number" ? G2(e, t) : t, n);
	}
	function G2(e, t) {
		const n = q2()?.[e];
		if (typeof n != "string") {
			if (typeof t == "string") return t;
			throw new Error(`!!! NLS MISSING: ${e} !!!`);
		}
		return n;
	}
	let wa = !1, Ia = !1, La = !1, Ll = !1, Ra = !1, yn;
	const vn = globalThis;
	let It;
	typeof vn.vscode < "u" && typeof vn.vscode.process < "u" ? It = vn.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (It = process);
	const Y2 = typeof It?.versions?.electron == "string" && It?.type === "renderer";
	if (typeof It == "object") {
		wa = It.platform === "win32", Ia = It.platform === "darwin", La = It.platform === "linux", La && It.env.SNAP && It.env.SNAP_REVISION, It.env.CI || It.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
		const e = It.env.VSCODE_NLS_CONFIG;
		if (e) try {
			const t = JSON.parse(e);
			t.userLocale, t.osLocale, t.resolvedLanguage, t.languagePack?.translationsConfigFile;
		} catch {}
		Ll = !0;
	} else typeof navigator == "object" && !Y2 ? (yn = navigator.userAgent, wa = yn.indexOf("Windows") >= 0, Ia = yn.indexOf("Macintosh") >= 0, (yn.indexOf("Macintosh") >= 0 || yn.indexOf("iPad") >= 0 || yn.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, La = yn.indexOf("Linux") >= 0, yn?.indexOf("Mobi"), Ra = !0, wl(), navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
	const ni = wa, J2 = Ia, X2 = Ll, Q2 = Ra, Z2 = Ra && typeof vn.importScripts == "function" ? vn.origin : void 0, sn = yn, K2 = typeof vn.postMessage == "function" && !vn.importScripts;
	(() => {
		if (K2) {
			const e = [];
			vn.addEventListener("message", (n) => {
				if (n.data && n.data.vscodeScheduleAsyncWork) for (let r = 0, i = e.length; r < i; r++) {
					const s = e[r];
					if (s.id === n.data.vscodeScheduleAsyncWork) {
						e.splice(r, 1), s.callback();
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
				}), vn.postMessage({ vscodeScheduleAsyncWork: r }, "*");
			};
		}
		return (e) => setTimeout(e);
	})();
	const tm = !!(sn && sn.indexOf("Chrome") >= 0);
	sn && sn.indexOf("Firefox");
	!tm && sn && sn.indexOf("Safari");
	sn && sn.indexOf("Edg/");
	sn && sn.indexOf("Android");
	function nm(e) {
		return e;
	}
	var rm = class {
		constructor(e, t) {
			this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = nm) : (this._fn = t, this._computeKey = e.getCacheKey);
		}
		get(e) {
			const t = this._computeKey(e);
			return this.lastArgKey !== t && (this.lastArgKey = t, this.lastCache = this._fn(e)), this.lastCache;
		}
	}, Rl = class {
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
	function im(e) {
		return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
	}
	function sm(e) {
		return e.split(/\r\n|\r|\n/);
	}
	function am(e) {
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r !== 32 && r !== 9) return t;
		}
		return -1;
	}
	function om(e, t = e.length - 1) {
		for (let n = t; n >= 0; n--) {
			const r = e.charCodeAt(n);
			if (r !== 32 && r !== 9) return n;
		}
		return -1;
	}
	function kl(e) {
		return e >= 65 && e <= 90;
	}
	function Hi(e) {
		return 55296 <= e && e <= 56319;
	}
	function xa(e) {
		return 56320 <= e && e <= 57343;
	}
	function xl(e, t) {
		return (e - 55296 << 10) + (t - 56320) + 65536;
	}
	function um(e, t, n) {
		const r = e.charCodeAt(n);
		if (Hi(r) && n + 1 < t) {
			const i = e.charCodeAt(n + 1);
			if (xa(i)) return xl(r, i);
		}
		return r;
	}
	const lm = /^[\t\n\r\x20-\x7E]*$/;
	function cm(e) {
		return lm.test(e);
	}
	(class Oi {
		static {
			this._INSTANCE = null;
		}
		static getInstance() {
			return Oi._INSTANCE || (Oi._INSTANCE = new Oi()), Oi._INSTANCE;
		}
		constructor() {
			this._data = fm();
		}
		getGraphemeBreakType(t) {
			if (t < 32) return t === 10 ? 3 : t === 13 ? 2 : 4;
			if (t < 127) return 0;
			const n = this._data, r = n.length / 3;
			let i = 1;
			for (; i <= r;) if (t < n[3 * i]) i = 2 * i;
			else if (t > n[3 * i + 1]) i = 2 * i + 1;
			else return n[3 * i + 2];
			return 0;
		}
	});
	function fm() {
		return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]");
	}
	var Oa = class Mi {
		static {
			this.ambiguousCharacterData = new Rl(() => JSON.parse("{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"cs\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"es\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"fr\":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ja\":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],\"ko\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pt-BR\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ru\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"zh-hans\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],\"zh-hant\":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}"));
		}
		static {
			this.cache = new rm({ getCacheKey: JSON.stringify }, (t) => {
				function n(u) {
					const l = /* @__PURE__ */ new Map();
					for (let c = 0; c < u.length; c += 2) l.set(u[c], u[c + 1]);
					return l;
				}
				function r(u, l) {
					const c = new Map(u);
					for (const [d, m] of l) c.set(d, m);
					return c;
				}
				function i(u, l) {
					if (!u) return l;
					const c = /* @__PURE__ */ new Map();
					for (const [d, m] of u) l.has(d) && c.set(d, m);
					return c;
				}
				const s = this.ambiguousCharacterData.value;
				let a = t.filter((u) => !u.startsWith("_") && u in s);
				a.length === 0 && (a = ["_default"]);
				let o;
				for (const u of a) {
					const l = n(s[u]);
					o = i(o, l);
				}
				return new Mi(r(n(s._common), o));
			});
		}
		static getInstance(t) {
			return Mi.cache.get(Array.from(t));
		}
		static {
			this._locales = new Rl(() => Object.keys(Mi.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
		}
		static getLocales() {
			return Mi._locales.value;
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
	}, Ma = class ga {
		static getRawData() {
			return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
		}
		static {
			this._data = void 0;
		}
		static getData() {
			return this._data || (this._data = new Set(ga.getRawData())), this._data;
		}
		static isInvisibleCharacter(t) {
			return ga.getData().has(t);
		}
		static get codePoints() {
			return ga.getData();
		}
	};
	let br;
	const Pa = globalThis.vscode;
	if (typeof Pa < "u" && typeof Pa.process < "u") {
		const e = Pa.process;
		br = {
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
	} else typeof process < "u" && typeof process?.versions?.node == "string" ? br = {
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
	} : br = {
		get platform() {
			return ni ? "win32" : J2 ? "darwin" : "linux";
		},
		get arch() {},
		get env() {
			return {};
		},
		cwd() {
			return "/";
		}
	};
	const Gi = br.cwd, dm = br.env, hm = br.platform, pm = 65, mm = 97, gm = 90, Dm = 122, On = 46, ot = 47, Nt = 92, Mn = 58, ym = 63;
	var Ol = class extends Error {
		constructor(e, t, n) {
			let r;
			typeof t == "string" && t.indexOf("not ") === 0 ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			let i = `The "${e}" ${e.indexOf(".") !== -1 ? "property" : "argument"} ${r} of type ${t}`;
			i += `. Received type ${typeof n}`, super(i), this.code = "ERR_INVALID_ARG_TYPE";
		}
	};
	function vm(e, t) {
		if (e === null || typeof e != "object") throw new Ol(t, "Object", e);
	}
	function Ve(e, t) {
		if (typeof e != "string") throw new Ol(t, "string", e);
	}
	const En = hm === "win32";
	function he(e) {
		return e === ot || e === Nt;
	}
	function Ba(e) {
		return e === ot;
	}
	function Pn(e) {
		return e >= pm && e <= gm || e >= mm && e <= Dm;
	}
	function Wi(e, t, n, r) {
		let i = "", s = 0, a = -1, o = 0, u = 0;
		for (let l = 0; l <= e.length; ++l) {
			if (l < e.length) u = e.charCodeAt(l);
			else {
				if (r(u)) break;
				u = ot;
			}
			if (r(u)) {
				if (!(a === l - 1 || o === 1)) if (o === 2) {
					if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== On || i.charCodeAt(i.length - 2) !== On) {
						if (i.length > 2) {
							const c = i.lastIndexOf(n);
							c === -1 ? (i = "", s = 0) : (i = i.slice(0, c), s = i.length - 1 - i.lastIndexOf(n)), a = l, o = 0;
							continue;
						} else if (i.length !== 0) {
							i = "", s = 0, a = l, o = 0;
							continue;
						}
					}
					t && (i += i.length > 0 ? `${n}..` : "..", s = 2);
				} else i.length > 0 ? i += `${n}${e.slice(a + 1, l)}` : i = e.slice(a + 1, l), s = l - a - 1;
				a = l, o = 0;
			} else u === On && o !== -1 ? ++o : o = -1;
		}
		return i;
	}
	function Em(e) {
		return e ? `${e[0] === "." ? "" : "."}${e}` : "";
	}
	function Ml(e, t) {
		vm(t, "pathObject");
		const n = t.dir || t.root, r = t.base || `${t.name || ""}${Em(t.ext)}`;
		return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
	}
	const pt = {
		resolve(...e) {
			let t = "", n = "", r = !1;
			for (let i = e.length - 1; i >= -1; i--) {
				let s;
				if (i >= 0) {
					if (s = e[i], Ve(s, `paths[${i}]`), s.length === 0) continue;
				} else t.length === 0 ? s = Gi() : (s = dm[`=${t}`] || Gi(), (s === void 0 || s.slice(0, 2).toLowerCase() !== t.toLowerCase() && s.charCodeAt(2) === Nt) && (s = `${t}\\`));
				const a = s.length;
				let o = 0, u = "", l = !1;
				const c = s.charCodeAt(0);
				if (a === 1) he(c) && (o = 1, l = !0);
				else if (he(c)) if (l = !0, he(s.charCodeAt(1))) {
					let d = 2, m = d;
					for (; d < a && !he(s.charCodeAt(d));) d++;
					if (d < a && d !== m) {
						const p = s.slice(m, d);
						for (m = d; d < a && he(s.charCodeAt(d));) d++;
						if (d < a && d !== m) {
							for (m = d; d < a && !he(s.charCodeAt(d));) d++;
							(d === a || d !== m) && (u = `\\\\${p}\\${s.slice(m, d)}`, o = d);
						}
					}
				} else o = 1;
				else Pn(c) && s.charCodeAt(1) === Mn && (u = s.slice(0, 2), o = 2, a > 2 && he(s.charCodeAt(2)) && (l = !0, o = 3));
				if (u.length > 0) if (t.length > 0) {
					if (u.toLowerCase() !== t.toLowerCase()) continue;
				} else t = u;
				if (r) {
					if (t.length > 0) break;
				} else if (n = `${s.slice(o)}\\${n}`, r = l, l && t.length > 0) break;
			}
			return n = Wi(n, !r, "\\", he), r ? `${t}\\${n}` : `${t}${n}` || ".";
		},
		normalize(e) {
			Ve(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = 0, r, i = !1;
			const s = e.charCodeAt(0);
			if (t === 1) return Ba(s) ? "\\" : e;
			if (he(s)) if (i = !0, he(e.charCodeAt(1))) {
				let o = 2, u = o;
				for (; o < t && !he(e.charCodeAt(o));) o++;
				if (o < t && o !== u) {
					const l = e.slice(u, o);
					for (u = o; o < t && he(e.charCodeAt(o));) o++;
					if (o < t && o !== u) {
						for (u = o; o < t && !he(e.charCodeAt(o));) o++;
						if (o === t) return `\\\\${l}\\${e.slice(u)}\\`;
						o !== u && (r = `\\\\${l}\\${e.slice(u, o)}`, n = o);
					}
				}
			} else n = 1;
			else Pn(s) && e.charCodeAt(1) === Mn && (r = e.slice(0, 2), n = 2, t > 2 && he(e.charCodeAt(2)) && (i = !0, n = 3));
			let a = n < t ? Wi(e.slice(n), !i, "\\", he) : "";
			return a.length === 0 && !i && (a = "."), a.length > 0 && he(e.charCodeAt(t - 1)) && (a += "\\"), r === void 0 ? i ? `\\${a}` : a : i ? `${r}\\${a}` : `${r}${a}`;
		},
		isAbsolute(e) {
			Ve(e, "path");
			const t = e.length;
			if (t === 0) return !1;
			const n = e.charCodeAt(0);
			return he(n) || t > 2 && Pn(n) && e.charCodeAt(1) === Mn && he(e.charCodeAt(2));
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t, n;
			for (let s = 0; s < e.length; ++s) {
				const a = e[s];
				Ve(a, "path"), a.length > 0 && (t === void 0 ? t = n = a : t += `\\${a}`);
			}
			if (t === void 0) return ".";
			let r = !0, i = 0;
			if (typeof n == "string" && he(n.charCodeAt(0))) {
				++i;
				const s = n.length;
				s > 1 && he(n.charCodeAt(1)) && (++i, s > 2 && (he(n.charCodeAt(2)) ? ++i : r = !1));
			}
			if (r) {
				for (; i < t.length && he(t.charCodeAt(i));) i++;
				i >= 2 && (t = `\\${t.slice(i)}`);
			}
			return pt.normalize(t);
		},
		relative(e, t) {
			if (Ve(e, "from"), Ve(t, "to"), e === t) return "";
			const n = pt.resolve(e), r = pt.resolve(t);
			if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t)) return "";
			let i = 0;
			for (; i < e.length && e.charCodeAt(i) === Nt;) i++;
			let s = e.length;
			for (; s - 1 > i && e.charCodeAt(s - 1) === Nt;) s--;
			const a = s - i;
			let o = 0;
			for (; o < t.length && t.charCodeAt(o) === Nt;) o++;
			let u = t.length;
			for (; u - 1 > o && t.charCodeAt(u - 1) === Nt;) u--;
			const l = u - o, c = a < l ? a : l;
			let d = -1, m = 0;
			for (; m < c; m++) {
				const g = e.charCodeAt(i + m);
				if (g !== t.charCodeAt(o + m)) break;
				g === Nt && (d = m);
			}
			if (m !== c) {
				if (d === -1) return r;
			} else {
				if (l > c) {
					if (t.charCodeAt(o + m) === Nt) return r.slice(o + m + 1);
					if (m === 2) return r.slice(o + m);
				}
				a > c && (e.charCodeAt(i + m) === Nt ? d = m : m === 2 && (d = 3)), d === -1 && (d = 0);
			}
			let p = "";
			for (m = i + d + 1; m <= s; ++m) (m === s || e.charCodeAt(m) === Nt) && (p += p.length === 0 ? ".." : "\\..");
			return o += d, p.length > 0 ? `${p}${r.slice(o, u)}` : (r.charCodeAt(o) === Nt && ++o, r.slice(o, u));
		},
		toNamespacedPath(e) {
			if (typeof e != "string" || e.length === 0) return e;
			const t = pt.resolve(e);
			if (t.length <= 2) return e;
			if (t.charCodeAt(0) === Nt) {
				if (t.charCodeAt(1) === Nt) {
					const n = t.charCodeAt(2);
					if (n !== ym && n !== On) return `\\\\?\\UNC\\${t.slice(2)}`;
				}
			} else if (Pn(t.charCodeAt(0)) && t.charCodeAt(1) === Mn && t.charCodeAt(2) === Nt) return `\\\\?\\${t}`;
			return e;
		},
		dirname(e) {
			Ve(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = -1, r = 0;
			const i = e.charCodeAt(0);
			if (t === 1) return he(i) ? e : ".";
			if (he(i)) {
				if (n = r = 1, he(e.charCodeAt(1))) {
					let o = 2, u = o;
					for (; o < t && !he(e.charCodeAt(o));) o++;
					if (o < t && o !== u) {
						for (u = o; o < t && he(e.charCodeAt(o));) o++;
						if (o < t && o !== u) {
							for (u = o; o < t && !he(e.charCodeAt(o));) o++;
							if (o === t) return e;
							o !== u && (n = r = o + 1);
						}
					}
				}
			} else Pn(i) && e.charCodeAt(1) === Mn && (n = t > 2 && he(e.charCodeAt(2)) ? 3 : 2, r = n);
			let s = -1, a = !0;
			for (let o = t - 1; o >= r; --o) if (he(e.charCodeAt(o))) {
				if (!a) {
					s = o;
					break;
				}
			} else a = !1;
			if (s === -1) {
				if (n === -1) return ".";
				s = n;
			}
			return e.slice(0, s);
		},
		basename(e, t) {
			t !== void 0 && Ve(t, "suffix"), Ve(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (e.length >= 2 && Pn(e.charCodeAt(0)) && e.charCodeAt(1) === Mn && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let a = t.length - 1, o = -1;
				for (s = e.length - 1; s >= n; --s) {
					const u = e.charCodeAt(s);
					if (he(u)) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else o === -1 && (i = !1, o = s + 1), a >= 0 && (u === t.charCodeAt(a) ? --a === -1 && (r = s) : (a = -1, r = o));
				}
				return n === r ? r = o : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= n; --s) if (he(e.charCodeAt(s))) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			Ve(e, "path");
			let t = 0, n = -1, r = 0, i = -1, s = !0, a = 0;
			e.length >= 2 && e.charCodeAt(1) === Mn && Pn(e.charCodeAt(0)) && (t = r = 2);
			for (let o = e.length - 1; o >= t; --o) {
				const u = e.charCodeAt(o);
				if (he(u)) {
					if (!s) {
						r = o + 1;
						break;
					}
					continue;
				}
				i === -1 && (s = !1, i = o + 1), u === On ? n === -1 ? n = o : a !== 1 && (a = 1) : n !== -1 && (a = -1);
			}
			return n === -1 || i === -1 || a === 0 || a === 1 && n === i - 1 && n === r + 1 ? "" : e.slice(n, i);
		},
		format: Ml.bind(null, "\\"),
		parse(e) {
			Ve(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.length;
			let r = 0, i = e.charCodeAt(0);
			if (n === 1) return he(i) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
			if (he(i)) {
				if (r = 1, he(e.charCodeAt(1))) {
					let d = 2, m = d;
					for (; d < n && !he(e.charCodeAt(d));) d++;
					if (d < n && d !== m) {
						for (m = d; d < n && he(e.charCodeAt(d));) d++;
						if (d < n && d !== m) {
							for (m = d; d < n && !he(e.charCodeAt(d));) d++;
							d === n ? r = d : d !== m && (r = d + 1);
						}
					}
				}
			} else if (Pn(i) && e.charCodeAt(1) === Mn) {
				if (n <= 2) return t.root = t.dir = e, t;
				if (r = 2, he(e.charCodeAt(2))) {
					if (n === 3) return t.root = t.dir = e, t;
					r = 3;
				}
			}
			r > 0 && (t.root = e.slice(0, r));
			let s = -1, a = r, o = -1, u = !0, l = e.length - 1, c = 0;
			for (; l >= r; --l) {
				if (i = e.charCodeAt(l), he(i)) {
					if (!u) {
						a = l + 1;
						break;
					}
					continue;
				}
				o === -1 && (u = !1, o = l + 1), i === On ? s === -1 ? s = l : c !== 1 && (c = 1) : s !== -1 && (c = -1);
			}
			return o !== -1 && (s === -1 || c === 0 || c === 1 && s === o - 1 && s === a + 1 ? t.base = t.name = e.slice(a, o) : (t.name = e.slice(a, s), t.base = e.slice(a, o), t.ext = e.slice(s, o))), a > 0 && a !== r ? t.dir = e.slice(0, a - 1) : t.dir = t.root, t;
		},
		sep: "\\",
		delimiter: ";",
		win32: null,
		posix: null
	}, bm = (() => {
		if (En) {
			const e = /\\/g;
			return () => {
				const t = Gi().replace(e, "/");
				return t.slice(t.indexOf("/"));
			};
		}
		return () => Gi();
	})(), mt = {
		resolve(...e) {
			let t = "", n = !1;
			for (let r = e.length - 1; r >= -1 && !n; r--) {
				const i = r >= 0 ? e[r] : bm();
				Ve(i, `paths[${r}]`), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === ot);
			}
			return t = Wi(t, !n, "/", Ba), n ? `/${t}` : t.length > 0 ? t : ".";
		},
		normalize(e) {
			if (Ve(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === ot, n = e.charCodeAt(e.length - 1) === ot;
			return e = Wi(e, !t, "/", Ba), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
		},
		isAbsolute(e) {
			return Ve(e, "path"), e.length > 0 && e.charCodeAt(0) === ot;
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t;
			for (let n = 0; n < e.length; ++n) {
				const r = e[n];
				Ve(r, "path"), r.length > 0 && (t === void 0 ? t = r : t += `/${r}`);
			}
			return t === void 0 ? "." : mt.normalize(t);
		},
		relative(e, t) {
			if (Ve(e, "from"), Ve(t, "to"), e === t || (e = mt.resolve(e), t = mt.resolve(t), e === t)) return "";
			const n = 1, r = e.length, i = r - n, s = 1, a = t.length - s, o = i < a ? i : a;
			let u = -1, l = 0;
			for (; l < o; l++) {
				const d = e.charCodeAt(n + l);
				if (d !== t.charCodeAt(s + l)) break;
				d === ot && (u = l);
			}
			if (l === o) if (a > o) {
				if (t.charCodeAt(s + l) === ot) return t.slice(s + l + 1);
				if (l === 0) return t.slice(s + l);
			} else i > o && (e.charCodeAt(n + l) === ot ? u = l : l === 0 && (u = 0));
			let c = "";
			for (l = n + u + 1; l <= r; ++l) (l === r || e.charCodeAt(l) === ot) && (c += c.length === 0 ? ".." : "/..");
			return `${c}${t.slice(s + u)}`;
		},
		toNamespacedPath(e) {
			return e;
		},
		dirname(e) {
			if (Ve(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === ot;
			let n = -1, r = !0;
			for (let i = e.length - 1; i >= 1; --i) if (e.charCodeAt(i) === ot) {
				if (!r) {
					n = i;
					break;
				}
			} else r = !1;
			return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
		},
		basename(e, t) {
			t !== void 0 && Ve(t, "ext"), Ve(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let a = t.length - 1, o = -1;
				for (s = e.length - 1; s >= 0; --s) {
					const u = e.charCodeAt(s);
					if (u === ot) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else o === -1 && (i = !1, o = s + 1), a >= 0 && (u === t.charCodeAt(a) ? --a === -1 && (r = s) : (a = -1, r = o));
				}
				return n === r ? r = o : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= 0; --s) if (e.charCodeAt(s) === ot) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			Ve(e, "path");
			let t = -1, n = 0, r = -1, i = !0, s = 0;
			for (let a = e.length - 1; a >= 0; --a) {
				const o = e.charCodeAt(a);
				if (o === ot) {
					if (!i) {
						n = a + 1;
						break;
					}
					continue;
				}
				r === -1 && (i = !1, r = a + 1), o === On ? t === -1 ? t = a : s !== 1 && (s = 1) : t !== -1 && (s = -1);
			}
			return t === -1 || r === -1 || s === 0 || s === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
		},
		format: Ml.bind(null, "/"),
		parse(e) {
			Ve(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.charCodeAt(0) === ot;
			let r;
			n ? (t.root = "/", r = 1) : r = 0;
			let i = -1, s = 0, a = -1, o = !0, u = e.length - 1, l = 0;
			for (; u >= r; --u) {
				const c = e.charCodeAt(u);
				if (c === ot) {
					if (!o) {
						s = u + 1;
						break;
					}
					continue;
				}
				a === -1 && (o = !1, a = u + 1), c === On ? i === -1 ? i = u : l !== 1 && (l = 1) : i !== -1 && (l = -1);
			}
			if (a !== -1) {
				const c = s === 0 && n ? 1 : s;
				i === -1 || l === 0 || l === 1 && i === a - 1 && i === s + 1 ? t.base = t.name = e.slice(c, a) : (t.name = e.slice(c, i), t.base = e.slice(c, a), t.ext = e.slice(i, a));
			}
			return s > 0 ? t.dir = e.slice(0, s - 1) : n && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	mt.win32 = pt.win32 = pt, mt.posix = pt.posix = mt;
	En ? pt.normalize : mt.normalize;
	const _m = En ? pt.join : mt.join;
	En ? pt.resolve : mt.resolve;
	En ? pt.relative : mt.relative;
	En ? pt.dirname : mt.dirname;
	En ? pt.basename : mt.basename;
	En ? pt.extname : mt.extname;
	En ? pt.sep : mt.sep;
	const Nm = /^\w[\w\d+.-]*$/, Tm = /^\//, Sm = /^\/\//;
	function Fm(e, t) {
		if (!e.scheme && t) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !Nm.test(e.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (e.path) {
			if (e.authority) {
				if (!Tm.test(e.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (Sm.test(e.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	function Am(e, t) {
		return !e && !t ? "file" : e;
	}
	function Cm(e, t) {
		switch (e) {
			case "https":
			case "http":
			case "file":
				t ? t[0] !== Gt && (t = Gt + t) : t = Gt;
				break;
		}
		return t;
	}
	const Ce = "", Gt = "/", wm = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	var an = class Da {
		static isUri(t) {
			return t instanceof Da ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
		}
		constructor(t, n, r, i, s, a = !1) {
			typeof t == "object" ? (this.scheme = t.scheme || Ce, this.authority = t.authority || Ce, this.path = t.path || Ce, this.query = t.query || Ce, this.fragment = t.fragment || Ce) : (this.scheme = Am(t, a), this.authority = n || Ce, this.path = Cm(this.scheme, r || Ce), this.query = i || Ce, this.fragment = s || Ce, Fm(this, a));
		}
		get fsPath() {
			return Va(this, !1);
		}
		with(t) {
			if (!t) return this;
			let { scheme: n, authority: r, path: i, query: s, fragment: a } = t;
			return n === void 0 ? n = this.scheme : n === null && (n = Ce), r === void 0 ? r = this.authority : r === null && (r = Ce), i === void 0 ? i = this.path : i === null && (i = Ce), s === void 0 ? s = this.query : s === null && (s = Ce), a === void 0 ? a = this.fragment : a === null && (a = Ce), n === this.scheme && r === this.authority && i === this.path && s === this.query && a === this.fragment ? this : new _r(n, r, i, s, a);
		}
		static parse(t, n = !1) {
			const r = wm.exec(t);
			return r ? new _r(r[2] || Ce, zi(r[4] || Ce), zi(r[5] || Ce), zi(r[7] || Ce), zi(r[9] || Ce), n) : new _r(Ce, Ce, Ce, Ce, Ce);
		}
		static file(t) {
			let n = Ce;
			if (ni && (t = t.replace(/\\/g, Gt)), t[0] === Gt && t[1] === Gt) {
				const r = t.indexOf(Gt, 2);
				r === -1 ? (n = t.substring(2), t = Gt) : (n = t.substring(2, r), t = t.substring(r) || Gt);
			}
			return new _r("file", n, t, Ce, Ce);
		}
		static from(t, n) {
			return new _r(t.scheme, t.authority, t.path, t.query, t.fragment, n);
		}
		static joinPath(t, ...n) {
			if (!t.path) throw new Error("[UriError]: cannot call joinPath on URI without path");
			let r;
			return ni && t.scheme === "file" ? r = Da.file(pt.join(Va(t, !0), ...n)).path : r = mt.join(t.path, ...n), t.with({ path: r });
		}
		toString(t = !1) {
			return $a(this, t);
		}
		toJSON() {
			return this;
		}
		static revive(t) {
			if (t) {
				if (t instanceof Da) return t;
				{
					const n = new _r(t);
					return n._formatted = t.external ?? null, n._fsPath = t._sep === Pl ? t.fsPath ?? null : null, n;
				}
			} else return t;
		}
	};
	const Pl = ni ? 1 : void 0;
	var _r = class extends an {
		constructor() {
			super(...arguments), this._formatted = null, this._fsPath = null;
		}
		get fsPath() {
			return this._fsPath || (this._fsPath = Va(this, !1)), this._fsPath;
		}
		toString(e = !1) {
			return e ? $a(this, !0) : (this._formatted || (this._formatted = $a(this, !1)), this._formatted);
		}
		toJSON() {
			const e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = Pl), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	};
	const Bl = {
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
	function Vl(e, t, n) {
		let r, i = -1;
		for (let s = 0; s < e.length; s++) {
			const a = e.charCodeAt(s);
			if (a >= 97 && a <= 122 || a >= 65 && a <= 90 || a >= 48 && a <= 57 || a === 45 || a === 46 || a === 95 || a === 126 || t && a === 47 || n && a === 91 || n && a === 93 || n && a === 58) i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r !== void 0 && (r += e.charAt(s));
			else {
				r === void 0 && (r = e.substr(0, s));
				const o = Bl[a];
				o !== void 0 ? (i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r += o) : i === -1 && (i = s);
			}
		}
		return i !== -1 && (r += encodeURIComponent(e.substring(i))), r !== void 0 ? r : e;
	}
	function Im(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			const r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += Bl[r]) : t !== void 0 && (t += e[n]);
		}
		return t !== void 0 ? t : e;
	}
	function Va(e, t) {
		let n;
		return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, ni && (n = n.replace(/\//g, "\\")), n;
	}
	function $a(e, t) {
		const n = t ? Im : Vl;
		let r = "", { scheme: i, authority: s, path: a, query: o, fragment: u } = e;
		if (i && (r += i, r += ":"), (s || i === "file") && (r += Gt, r += Gt), s) {
			let l = s.indexOf("@");
			if (l !== -1) {
				const c = s.substr(0, l);
				s = s.substr(l + 1), l = c.lastIndexOf(":"), l === -1 ? r += n(c, !1, !1) : (r += n(c.substr(0, l), !1, !1), r += ":", r += n(c.substr(l + 1), !1, !0)), r += "@";
			}
			s = s.toLowerCase(), l = s.lastIndexOf(":"), l === -1 ? r += n(s, !1, !0) : (r += n(s.substr(0, l), !1, !0), r += s.substr(l));
		}
		if (a) {
			if (a.length >= 3 && a.charCodeAt(0) === 47 && a.charCodeAt(2) === 58) {
				const l = a.charCodeAt(1);
				l >= 65 && l <= 90 && (a = `/${String.fromCharCode(l + 32)}:${a.substr(3)}`);
			} else if (a.length >= 2 && a.charCodeAt(1) === 58) {
				const l = a.charCodeAt(0);
				l >= 65 && l <= 90 && (a = `${String.fromCharCode(l + 32)}:${a.substr(2)}`);
			}
			r += n(a, !0, !1);
		}
		return o && (r += "?", r += n(o, !1, !1)), u && (r += "#", r += t ? u : Vl(u, !1, !1)), r;
	}
	function $l(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + $l(e.substr(3)) : e;
		}
	}
	const Ul = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function zi(e) {
		return e.match(Ul) ? e.replace(Ul, (t) => $l(t)) : e;
	}
	var Bn;
	(function(e) {
		e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatSesssion = "vscode-chat-editor", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output";
	})(Bn || (Bn = {}));
	var Lm = class {
		constructor() {
			this._hosts = Object.create(null), this._ports = Object.create(null), this._connectionTokens = Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
		}
		setPreferredWebSchema(e) {
			this._preferredWebSchema = e;
		}
		get _remoteResourcesPath() {
			return mt.join(this._serverRootPath, Bn.vscodeRemoteResource);
		}
		rewrite(e) {
			if (this._delegate) try {
				return this._delegate(e);
			} catch (a) {
				return ei(a), e;
			}
			const t = e.authority;
			let n = this._hosts[t];
			n && n.indexOf(":") !== -1 && n.indexOf("[") === -1 && (n = `[${n}]`);
			const r = this._ports[t], i = this._connectionTokens[t];
			let s = `path=${encodeURIComponent(e.path)}`;
			return typeof i == "string" && (s += `&tkn=${encodeURIComponent(i)}`), an.from({
				scheme: Q2 ? this._preferredWebSchema : Bn.vscodeRemoteResource,
				authority: `${n}:${r}`,
				path: this._remoteResourcesPath,
				query: s
			});
		}
	};
	const Rm = new Lm(), km = "vscode-app";
	const jl = new class bl {
		static {
			this.FALLBACK_AUTHORITY = km;
		}
		asBrowserUri(t) {
			const n = this.toUri(t);
			return this.uriToBrowserUri(n);
		}
		uriToBrowserUri(t) {
			return t.scheme === Bn.vscodeRemote ? Rm.rewrite(t) : t.scheme === Bn.file && (X2 || Z2 === `${Bn.vscodeFileResource}://${bl.FALLBACK_AUTHORITY}`) ? t.with({
				scheme: Bn.vscodeFileResource,
				authority: t.authority || bl.FALLBACK_AUTHORITY,
				query: null,
				fragment: null
			}) : t;
		}
		toUri(t, n) {
			if (an.isUri(t)) return t;
			if (globalThis._VSCODE_FILE_ROOT) {
				const r = globalThis._VSCODE_FILE_ROOT;
				if (/^\w[\w\d+.-]*:\/\//.test(r)) return an.joinPath(an.parse(r, !0), t);
				const i = _m(r, t);
				return an.file(i);
			}
			return an.parse(n.toUrl(t));
		}
	}();
	var ql;
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
		function r(s) {
			let a;
			typeof s == "string" ? a = new URL(s).searchParams : s instanceof URL ? a = s.searchParams : an.isUri(s) && (a = new URL(s.toString(!0)).searchParams);
			const o = a?.get(n);
			if (o) return t.get(o);
		}
		e.getHeadersFromQuery = r;
		function i(s, a, o) {
			if (!globalThis.crossOriginIsolated) return;
			const u = a && o ? "3" : o ? "2" : "1";
			s instanceof URLSearchParams ? s.set(n, u) : s[n] = u;
		}
		e.addSearchParam = i;
	})(ql || (ql = {}));
	const Ua = "default", Om = "$initialize";
	var Mm = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.method = r, this.args = i, this.type = 0;
		}
	}, Hl = class {
		constructor(e, t, n, r) {
			this.vsWorker = e, this.seq = t, this.res = n, this.err = r, this.type = 1;
		}
	}, Pm = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.eventName = r, this.arg = i, this.type = 2;
		}
	}, Bm = class {
		constructor(e, t, n) {
			this.vsWorker = e, this.req = t, this.event = n, this.type = 3;
		}
	}, Vm = class {
		constructor(e, t) {
			this.vsWorker = e, this.req = t, this.type = 4;
		}
	}, $m = class {
		constructor(e) {
			this._workerId = -1, this._handler = e, this._lastSentReq = 0, this._pendingReplies = Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
		}
		setWorkerId(e) {
			this._workerId = e;
		}
		sendMessage(e, t, n) {
			const r = String(++this._lastSentReq);
			return new Promise((i, s) => {
				this._pendingReplies[r] = {
					resolve: i,
					reject: s
				}, this._send(new Mm(this._workerId, r, e, t, n));
			});
		}
		listen(e, t, n) {
			let r = null;
			const i = new Bt({
				onWillAddFirstListener: () => {
					r = String(++this._lastSentReq), this._pendingEmitters.set(r, i), this._send(new Pm(this._workerId, r, e, t, n));
				},
				onDidRemoveLastListener: () => {
					this._pendingEmitters.delete(r), this._send(new Vm(this._workerId, r)), r = null;
				}
			});
			return i.event;
		}
		handleMessage(e) {
			!e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
		}
		createProxyToRemoteChannel(e, t) {
			return new Proxy(Object.create(null), { get: (n, r) => (typeof r == "string" && !n[r] && (Wl(r) ? n[r] = (i) => this.listen(e, r, i) : Gl(r) ? n[r] = this.listen(e, r, void 0) : r.charCodeAt(0) === 36 && (n[r] = async (...i) => (await t?.(), this.sendMessage(e, r, i)))), n[r]) });
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
				this._send(new Hl(this._workerId, t, n, void 0));
			}, (n) => {
				n.detail instanceof Error && (n.detail = Fl(n.detail)), this._send(new Hl(this._workerId, t, void 0, Fl(n)));
			});
		}
		_handleSubscribeEventMessage(e) {
			const t = e.req, n = this._handler.handleEvent(e.channel, e.eventName, e.arg)((r) => {
				this._send(new Bm(this._workerId, t, r));
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
	function Gl(e) {
		return e[0] === "o" && e[1] === "n" && kl(e.charCodeAt(2));
	}
	function Wl(e) {
		return /^onDynamic/.test(e) && kl(e.charCodeAt(9));
	}
	var Um = class {
		constructor(e, t) {
			this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = t, this._requestHandler = null, this._protocol = new $m({
				sendMessage: (n, r) => {
					e(n, r);
				},
				handleMessage: (n, r, i) => this._handleMessage(n, r, i),
				handleEvent: (n, r, i) => this._handleEvent(n, r, i)
			});
		}
		onmessage(e) {
			this._protocol.handleMessage(e);
		}
		_handleMessage(e, t, n) {
			if (e === Ua && t === Om) return this.initialize(n[0], n[1], n[2]);
			const r = e === Ua ? this._requestHandler : this._localChannels.get(e);
			if (!r) return Promise.reject(/* @__PURE__ */ new Error(`Missing channel ${e} on worker thread`));
			if (typeof r[t] != "function") return Promise.reject(/* @__PURE__ */ new Error(`Missing method ${t} on worker thread channel ${e}`));
			try {
				return Promise.resolve(r[t].apply(r, n));
			} catch (i) {
				return Promise.reject(i);
			}
		}
		_handleEvent(e, t, n) {
			const r = e === Ua ? this._requestHandler : this._localChannels.get(e);
			if (!r) throw new Error(`Missing channel ${e} on worker thread`);
			if (Wl(t)) {
				const i = r[t].call(r, n);
				if (typeof i != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				return i;
			}
			if (Gl(t)) {
				const i = r[t];
				if (typeof i != "function") throw new Error(`Missing event ${t} on request handler.`);
				return i;
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
			return t && (typeof t.baseUrl < "u" && delete t.baseUrl, typeof t.paths < "u" && typeof t.paths.vs < "u" && delete t.paths.vs, typeof t.trustedTypesPolicy < "u" && delete t.trustedTypesPolicy, t.catchError = !0, globalThis.require.config(t)), import(`${jl.asBrowserUri(`${n}.js`).toString(!0)}`).then((r) => {
				if (this._requestHandler = r.create(this), !this._requestHandler) throw new Error("No RequestHandler!");
			});
		}
	}, Vn = class {
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
	function zl(e, t) {
		return (t << 5) - t + e | 0;
	}
	function jm(e, t) {
		t = zl(149417, t);
		for (let n = 0, r = e.length; n < r; n++) t = zl(e.charCodeAt(n), t);
		return t;
	}
	function ja(e, t, n = 32) {
		const r = n - t, i = ~((1 << r) - 1);
		return (e << t | (i & e) >>> r) >>> 0;
	}
	function Yl(e, t = 0, n = e.byteLength, r = 0) {
		for (let i = 0; i < n; i++) e[t + i] = r;
	}
	function qm(e, t, n = "0") {
		for (; e.length < t;) e = n + e;
		return e;
	}
	function ri(e, t = 32) {
		return e instanceof ArrayBuffer ? Array.from(new Uint8Array(e)).map((n) => n.toString(16).padStart(2, "0")).join("") : qm((e >>> 0).toString(16), t / 4);
	}
	(class o2 {
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
			let i = this._buffLen, s = this._leftoverHighSurrogate, a, o;
			for (s !== 0 ? (a = s, o = -1, s = 0) : (a = t.charCodeAt(0), o = 0);;) {
				let u = a;
				if (Hi(a)) if (o + 1 < n) {
					const l = t.charCodeAt(o + 1);
					xa(l) ? (o++, u = xl(a, l)) : u = 65533;
				} else {
					s = a;
					break;
				}
				else xa(a) && (u = 65533);
				if (i = this._push(r, i, u), o++, o < n) a = t.charCodeAt(o);
				else break;
			}
			this._buffLen = i, this._leftoverHighSurrogate = s;
		}
		_push(t, n, r) {
			return r < 128 ? t[n++] = r : r < 2048 ? (t[n++] = 192 | (r & 1984) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : r < 65536 ? (t[n++] = 224 | (r & 61440) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : (t[n++] = 240 | (r & 1835008) >>> 18, t[n++] = 128 | (r & 258048) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0), n >= 64 && (this._step(), n -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), n;
		}
		digest() {
			return this._finished || (this._finished = !0, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), ri(this._h0) + ri(this._h1) + ri(this._h2) + ri(this._h3) + ri(this._h4);
		}
		_wrapUp() {
			this._buff[this._buffLen++] = 128, Yl(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), Yl(this._buff));
			const t = 8 * this._totalLen;
			this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1), this._buffDV.setUint32(60, t % 4294967296, !1), this._step();
		}
		_step() {
			const t = o2._bigBlock32, n = this._buffDV;
			for (let d = 0; d < 64; d += 4) t.setUint32(d, n.getUint32(d, !1), !1);
			for (let d = 64; d < 320; d += 4) t.setUint32(d, ja(t.getUint32(d - 12, !1) ^ t.getUint32(d - 32, !1) ^ t.getUint32(d - 56, !1) ^ t.getUint32(d - 64, !1), 1), !1);
			let r = this._h0, i = this._h1, s = this._h2, a = this._h3, o = this._h4, u, l, c;
			for (let d = 0; d < 80; d++) d < 20 ? (u = i & s | ~i & a, l = 1518500249) : d < 40 ? (u = i ^ s ^ a, l = 1859775393) : d < 60 ? (u = i & s | i & a | s & a, l = 2400959708) : (u = i ^ s ^ a, l = 3395469782), c = ja(r, 5) + u + o + l + t.getUint32(d * 4, !1) & 4294967295, o = a, a = s, s = ja(i, 30), i = r, r = c;
			this._h0 = this._h0 + r & 4294967295, this._h1 = this._h1 + i & 4294967295, this._h2 = this._h2 + s & 4294967295, this._h3 = this._h3 + a & 4294967295, this._h4 = this._h4 + o & 4294967295;
		}
	});
	var Jl = class {
		constructor(e) {
			this.source = e;
		}
		getElements() {
			const e = this.source, t = new Int32Array(e.length);
			for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t;
		}
	};
	function Hm(e, t, n) {
		return new Ql(new Jl(e), new Jl(t)).ComputeDiff(n).changes;
	}
	var Nr = class {
		static Assert(e, t) {
			if (!e) throw new Error(t);
		}
	}, Tr = class {
		static Copy(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
		static Copy2(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
	}, Xl = class {
		constructor() {
			this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
		}
		MarkNextChange() {
			(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new Vn(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
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
	}, Ql = class Xr {
		constructor(t, n, r = null) {
			this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
			const [i, s, a] = Xr._getElements(t), [o, u, l] = Xr._getElements(n);
			this._hasStrings = a && l, this._originalStringElements = i, this._originalElementsOrHash = s, this._modifiedStringElements = o, this._modifiedElementsOrHash = u, this.m_forwardHistory = [], this.m_reverseHistory = [];
		}
		static _isStringArray(t) {
			return t.length > 0 && typeof t[0] == "string";
		}
		static _getElements(t) {
			const n = t.getElements();
			if (Xr._isStringArray(n)) {
				const r = new Int32Array(n.length);
				for (let i = 0, s = n.length; i < s; i++) r[i] = jm(n[i], 0);
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
			return this.ElementsAreEqual(t, n) ? Xr._getStrictElement(this._originalSequence, t) === Xr._getStrictElement(this._modifiedSequence, n) : !1;
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
		_ComputeDiff(t, n, r, i, s) {
			const a = [!1];
			let o = this.ComputeDiffRecursive(t, n, r, i, a);
			return s && (o = this.PrettifyChanges(o)), {
				quitEarly: a[0],
				changes: o
			};
		}
		ComputeDiffRecursive(t, n, r, i, s) {
			for (s[0] = !1; t <= n && r <= i && this.ElementsAreEqual(t, r);) t++, r++;
			for (; n >= t && i >= r && this.ElementsAreEqual(n, i);) n--, i--;
			if (t > n || r > i) {
				let d;
				return r <= i ? (Nr.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), d = [new Vn(t, 0, r, i - r + 1)]) : t <= n ? (Nr.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), d = [new Vn(t, n - t + 1, r, 0)]) : (Nr.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), Nr.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), d = []), d;
			}
			const a = [0], o = [0], u = this.ComputeRecursionPoint(t, n, r, i, a, o, s), l = a[0], c = o[0];
			if (u !== null) return u;
			if (!s[0]) {
				const d = this.ComputeDiffRecursive(t, l, r, c, s);
				let m = [];
				return s[0] ? m = [new Vn(l + 1, n - (l + 1) + 1, c + 1, i - (c + 1) + 1)] : m = this.ComputeDiffRecursive(l + 1, n, c + 1, i, s), this.ConcatenateChanges(d, m);
			}
			return [new Vn(t, n - t + 1, r, i - r + 1)];
		}
		WALKTRACE(t, n, r, i, s, a, o, u, l, c, d, m, p, g, v, F, S, C) {
			let w = null, T = null, A = new Xl(), k = n, V = r, K = p[0] - F[0] - i, L = -1073741824, M = this.m_forwardHistory.length - 1;
			do {
				const O = K + t;
				O === k || O < V && l[O - 1] < l[O + 1] ? (d = l[O + 1], g = d - K - i, d < L && A.MarkNextChange(), L = d, A.AddModifiedElement(d + 1, g), K = O + 1 - t) : (d = l[O - 1] + 1, g = d - K - i, d < L && A.MarkNextChange(), L = d - 1, A.AddOriginalElement(d, g + 1), K = O - 1 - t), M >= 0 && (l = this.m_forwardHistory[M], t = l[0], k = 1, V = l.length - 1);
			} while (--M >= -1);
			if (w = A.getReverseChanges(), C[0]) {
				let O = p[0] + 1, oe = F[0] + 1;
				if (w !== null && w.length > 0) {
					const I = w[w.length - 1];
					O = Math.max(O, I.getOriginalEnd()), oe = Math.max(oe, I.getModifiedEnd());
				}
				T = [new Vn(O, m - O + 1, oe, v - oe + 1)];
			} else {
				A = new Xl(), k = a, V = o, K = p[0] - F[0] - u, L = 1073741824, M = S ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
				do {
					const O = K + s;
					O === k || O < V && c[O - 1] >= c[O + 1] ? (d = c[O + 1] - 1, g = d - K - u, d > L && A.MarkNextChange(), L = d + 1, A.AddOriginalElement(d + 1, g + 1), K = O + 1 - s) : (d = c[O - 1], g = d - K - u, d > L && A.MarkNextChange(), L = d, A.AddModifiedElement(d + 1, g + 1), K = O - 1 - s), M >= 0 && (c = this.m_reverseHistory[M], s = c[0], k = 1, V = c.length - 1);
				} while (--M >= -1);
				T = A.getChanges();
			}
			return this.ConcatenateChanges(w, T);
		}
		ComputeRecursionPoint(t, n, r, i, s, a, o) {
			let u = 0, l = 0, c = 0, d = 0, m = 0, p = 0;
			t--, r--, s[0] = 0, a[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
			const g = n - t + (i - r), v = g + 1, F = new Int32Array(v), S = new Int32Array(v), C = i - r, w = n - t, T = t - r, A = n - i, k = (w - C) % 2 === 0;
			F[C] = t, S[w] = n, o[0] = !1;
			for (let V = 1; V <= g / 2 + 1; V++) {
				let K = 0, L = 0;
				c = this.ClipDiagonalBound(C - V, V, C, v), d = this.ClipDiagonalBound(C + V, V, C, v);
				for (let O = c; O <= d; O += 2) {
					O === c || O < d && F[O - 1] < F[O + 1] ? u = F[O + 1] : u = F[O - 1] + 1, l = u - (O - C) - T;
					const oe = u;
					for (; u < n && l < i && this.ElementsAreEqual(u + 1, l + 1);) u++, l++;
					if (F[O] = u, u + l > K + L && (K = u, L = l), !k && Math.abs(O - w) <= V - 1 && u >= S[O]) return s[0] = u, a[0] = l, oe <= S[O] && V <= 1448 ? this.WALKTRACE(C, c, d, T, w, m, p, A, F, S, u, n, s, l, i, a, k, o) : null;
				}
				const M = (K - t + (L - r) - V) / 2;
				if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(K, M)) return o[0] = !0, s[0] = K, a[0] = L, M > 0 && V <= 1448 ? this.WALKTRACE(C, c, d, T, w, m, p, A, F, S, u, n, s, l, i, a, k, o) : (t++, r++, [new Vn(t, n - t + 1, r, i - r + 1)]);
				m = this.ClipDiagonalBound(w - V, V, w, v), p = this.ClipDiagonalBound(w + V, V, w, v);
				for (let O = m; O <= p; O += 2) {
					O === m || O < p && S[O - 1] >= S[O + 1] ? u = S[O + 1] - 1 : u = S[O - 1], l = u - (O - w) - A;
					const oe = u;
					for (; u > t && l > r && this.ElementsAreEqual(u, l);) u--, l--;
					if (S[O] = u, k && Math.abs(O - C) <= V && u <= F[O]) return s[0] = u, a[0] = l, oe >= F[O] && V <= 1448 ? this.WALKTRACE(C, c, d, T, w, m, p, A, F, S, u, n, s, l, i, a, k, o) : null;
				}
				if (V <= 1447) {
					let O = new Int32Array(d - c + 2);
					O[0] = C - c + 1, Tr.Copy2(F, c, O, 1, d - c + 1), this.m_forwardHistory.push(O), O = new Int32Array(p - m + 2), O[0] = w - m + 1, Tr.Copy2(S, m, O, 1, p - m + 1), this.m_reverseHistory.push(O);
				}
			}
			return this.WALKTRACE(C, c, d, T, w, m, p, A, F, S, u, n, s, l, i, a, k, o);
		}
		PrettifyChanges(t) {
			for (let n = 0; n < t.length; n++) {
				const r = t[n], i = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, s = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, a = r.originalLength > 0, o = r.modifiedLength > 0;
				for (; r.originalStart + r.originalLength < i && r.modifiedStart + r.modifiedLength < s && (!a || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!o || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));) {
					const l = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
					if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !l) break;
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
				let i = 0, s = 0;
				if (n > 0) {
					const d = t[n - 1];
					i = d.originalStart + d.originalLength, s = d.modifiedStart + d.modifiedLength;
				}
				const a = r.originalLength > 0, o = r.modifiedLength > 0;
				let u = 0, l = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
				for (let d = 1;; d++) {
					const m = r.originalStart - d, p = r.modifiedStart - d;
					if (m < i || p < s || a && !this.OriginalElementsAreEqual(m, m + r.originalLength) || o && !this.ModifiedElementsAreEqual(p, p + r.modifiedLength)) break;
					const g = (m === i && p === s ? 5 : 0) + this._boundaryScore(m, r.originalLength, p, r.modifiedLength);
					g > l && (l = g, u = d);
				}
				r.originalStart -= u, r.modifiedStart -= u;
				const c = [null];
				if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], c)) {
					t[n - 1] = c[0], t.splice(n, 1), n++;
					continue;
				}
			}
			if (this._hasStrings) for (let n = 1, r = t.length; n < r; n++) {
				const i = t[n - 1], s = t[n], a = s.originalStart - i.originalStart - i.originalLength, o = i.originalStart, u = s.originalStart + s.originalLength, l = u - o, c = i.modifiedStart, d = s.modifiedStart + s.modifiedLength, m = d - c;
				if (a < 5 && l < 20 && m < 20) {
					const p = this._findBetterContiguousSequence(o, l, c, m, a);
					if (p) {
						const [g, v] = p;
						(g !== i.originalStart + i.originalLength || v !== i.modifiedStart + i.modifiedLength) && (i.originalLength = g - i.originalStart, i.modifiedLength = v - i.modifiedStart, s.originalStart = g + a, s.modifiedStart = v + a, s.originalLength = u - s.originalStart, s.modifiedLength = d - s.modifiedStart);
					}
				}
			}
			return t;
		}
		_findBetterContiguousSequence(t, n, r, i, s) {
			if (n < s || i < s) return null;
			const a = t + n - s + 1, o = r + i - s + 1;
			let u = 0, l = 0, c = 0;
			for (let d = t; d < a; d++) for (let m = r; m < o; m++) {
				const p = this._contiguousSequenceScore(d, m, s);
				p > 0 && p > u && (u = p, l = d, c = m);
			}
			return u > 0 ? [l, c] : null;
		}
		_contiguousSequenceScore(t, n, r) {
			let i = 0;
			for (let s = 0; s < r; s++) {
				if (!this.ElementsAreEqual(t + s, n + s)) return 0;
				i += this._originalStringElements[t + s].length;
			}
			return i;
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
		_boundaryScore(t, n, r, i) {
			return (this._OriginalRegionIsBoundary(t, n) ? 1 : 0) + (this._ModifiedRegionIsBoundary(r, i) ? 1 : 0);
		}
		ConcatenateChanges(t, n) {
			const r = [];
			if (t.length === 0 || n.length === 0) return n.length > 0 ? n : t;
			if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
				const i = new Array(t.length + n.length - 1);
				return Tr.Copy(t, 0, i, 0, t.length - 1), i[t.length - 1] = r[0], Tr.Copy(n, 1, i, t.length, n.length - 1), i;
			} else {
				const i = new Array(t.length + n.length);
				return Tr.Copy(t, 0, i, 0, t.length), Tr.Copy(n, 0, i, t.length, n.length), i;
			}
		}
		ChangesOverlap(t, n, r) {
			if (Nr.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), Nr.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
				const i = t.originalStart;
				let s = t.originalLength;
				const a = t.modifiedStart;
				let o = t.modifiedLength;
				return t.originalStart + t.originalLength >= n.originalStart && (s = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (o = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new Vn(i, s, a, o), !0;
			} else return r[0] = null, !1;
		}
		ClipDiagonalBound(t, n, r, i) {
			if (t >= 0 && t < i) return t;
			const s = r, a = i - r - 1, o = n % 2 === 0;
			return t < 0 ? o === (s % 2 === 0) ? 0 : 1 : o === (a % 2 === 0) ? i - 1 : i - 2;
		}
	}, $e = class Er {
		constructor(t, n) {
			this.lineNumber = t, this.column = n;
		}
		with(t = this.lineNumber, n = this.column) {
			return t === this.lineNumber && n === this.column ? this : new Er(t, n);
		}
		delta(t = 0, n = 0) {
			return this.with(this.lineNumber + t, this.column + n);
		}
		equals(t) {
			return Er.equals(this, t);
		}
		static equals(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
		}
		isBefore(t) {
			return Er.isBefore(this, t);
		}
		static isBefore(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
		}
		isBeforeOrEqual(t) {
			return Er.isBeforeOrEqual(this, t);
		}
		static isBeforeOrEqual(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
		}
		static compare(t, n) {
			const r = t.lineNumber | 0, i = n.lineNumber | 0;
			return r === i ? (t.column | 0) - (n.column | 0) : r - i;
		}
		clone() {
			return new Er(this.lineNumber, this.column);
		}
		toString() {
			return "(" + this.lineNumber + "," + this.column + ")";
		}
		static lift(t) {
			return new Er(t.lineNumber, t.column);
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
	}, Ee = class Ge {
		constructor(t, n, r, i) {
			t > r || t === r && n > i ? (this.startLineNumber = r, this.startColumn = i, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = i);
		}
		isEmpty() {
			return Ge.isEmpty(this);
		}
		static isEmpty(t) {
			return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
		}
		containsPosition(t) {
			return Ge.containsPosition(this, t);
		}
		static containsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
		}
		static strictContainsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
		}
		containsRange(t) {
			return Ge.containsRange(this, t);
		}
		static containsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
		}
		strictContainsRange(t) {
			return Ge.strictContainsRange(this, t);
		}
		static strictContainsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
		}
		plusRange(t) {
			return Ge.plusRange(this, t);
		}
		static plusRange(t, n) {
			let r, i, s, a;
			return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, i = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, i = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, i = t.startColumn), n.endLineNumber > t.endLineNumber ? (s = n.endLineNumber, a = n.endColumn) : n.endLineNumber === t.endLineNumber ? (s = n.endLineNumber, a = Math.max(n.endColumn, t.endColumn)) : (s = t.endLineNumber, a = t.endColumn), new Ge(r, i, s, a);
		}
		intersectRanges(t) {
			return Ge.intersectRanges(this, t);
		}
		static intersectRanges(t, n) {
			let r = t.startLineNumber, i = t.startColumn, s = t.endLineNumber, a = t.endColumn;
			const o = n.startLineNumber, u = n.startColumn, l = n.endLineNumber, c = n.endColumn;
			return r < o ? (r = o, i = u) : r === o && (i = Math.max(i, u)), s > l ? (s = l, a = c) : s === l && (a = Math.min(a, c)), r > s || r === s && i > a ? null : new Ge(r, i, s, a);
		}
		equalsRange(t) {
			return Ge.equalsRange(this, t);
		}
		static equalsRange(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
		}
		getEndPosition() {
			return Ge.getEndPosition(this);
		}
		static getEndPosition(t) {
			return new $e(t.endLineNumber, t.endColumn);
		}
		getStartPosition() {
			return Ge.getStartPosition(this);
		}
		static getStartPosition(t) {
			return new $e(t.startLineNumber, t.startColumn);
		}
		toString() {
			return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
		}
		setEndPosition(t, n) {
			return new Ge(this.startLineNumber, this.startColumn, t, n);
		}
		setStartPosition(t, n) {
			return new Ge(t, n, this.endLineNumber, this.endColumn);
		}
		collapseToStart() {
			return Ge.collapseToStart(this);
		}
		static collapseToStart(t) {
			return new Ge(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
		}
		collapseToEnd() {
			return Ge.collapseToEnd(this);
		}
		static collapseToEnd(t) {
			return new Ge(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
		}
		delta(t) {
			return new Ge(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn);
		}
		static fromPositions(t, n = t) {
			return new Ge(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static lift(t) {
			return t ? new Ge(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
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
				const r = t.startLineNumber | 0, i = n.startLineNumber | 0;
				if (r === i) {
					const s = t.startColumn | 0, a = n.startColumn | 0;
					if (s === a) {
						const o = t.endLineNumber | 0, u = n.endLineNumber | 0;
						return o === u ? (t.endColumn | 0) - (n.endColumn | 0) : o - u;
					}
					return s - a;
				}
				return r - i;
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
	function Zl(e) {
		return e < 0 ? 0 : e > 255 ? 255 : e | 0;
	}
	function Sr(e) {
		return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
	}
	var Gm = class u2 {
		constructor(t) {
			const n = Zl(t);
			this._defaultValue = n, this._asciiMap = u2._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
		}
		static _createAsciiMap(t) {
			const n = new Uint8Array(256);
			return n.fill(t), n;
		}
		set(t, n) {
			const r = Zl(n);
			t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
		}
		get(t) {
			return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
		}
		clear() {
			this._asciiMap.fill(this._defaultValue), this._map.clear();
		}
	}, Wm = class {
		constructor(e, t, n) {
			const r = new Uint8Array(e * t);
			for (let i = 0, s = e * t; i < s; i++) r[i] = n;
			this._data = r, this.rows = e, this.cols = t;
		}
		get(e, t) {
			return this._data[e * this.cols + t];
		}
		set(e, t, n) {
			this._data[e * this.cols + t] = n;
		}
	}, zm = class {
		constructor(e) {
			let t = 0, n = 0;
			for (let i = 0, s = e.length; i < s; i++) {
				const [a, o, u] = e[i];
				o > t && (t = o), a > n && (n = a), u > n && (n = u);
			}
			t++, n++;
			const r = new Wm(n, t, 0);
			for (let i = 0, s = e.length; i < s; i++) {
				const [a, o, u] = e[i];
				r.set(a, o, u);
			}
			this._states = r, this._maxCharCode = t;
		}
		nextState(e, t) {
			return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
		}
	};
	let qa = null;
	function Ym() {
		return qa === null && (qa = new zm([
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
		])), qa;
	}
	let ii = null;
	function Jm() {
		if (ii === null) {
			ii = new Gm(0);
			const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
			for (let n = 0; n < 35; n++) ii.set(e.charCodeAt(n), 1);
			const t = ".,;:";
			for (let n = 0; n < 4; n++) ii.set(t.charCodeAt(n), 2);
		}
		return ii;
	}
	var Xm = class _l {
		static _createLink(t, n, r, i, s) {
			let a = s - 1;
			do {
				const o = n.charCodeAt(a);
				if (t.get(o) !== 2) break;
				a--;
			} while (a > i);
			if (i > 0) {
				const o = n.charCodeAt(i - 1), u = n.charCodeAt(a);
				(o === 40 && u === 41 || o === 91 && u === 93 || o === 123 && u === 125) && a--;
			}
			return {
				range: {
					startLineNumber: r,
					startColumn: i + 1,
					endLineNumber: r,
					endColumn: a + 2
				},
				url: n.substring(i, a + 1)
			};
		}
		static computeLinks(t, n = Ym()) {
			const r = Jm(), i = [];
			for (let s = 1, a = t.getLineCount(); s <= a; s++) {
				const o = t.getLineContent(s), u = o.length;
				let l = 0, c = 0, d = 0, m = 1, p = !1, g = !1, v = !1, F = !1;
				for (; l < u;) {
					let S = !1;
					const C = o.charCodeAt(l);
					if (m === 13) {
						let w;
						switch (C) {
							case 40:
								p = !0, w = 0;
								break;
							case 41:
								w = p ? 0 : 1;
								break;
							case 91:
								v = !0, g = !0, w = 0;
								break;
							case 93:
								v = !1, w = g ? 0 : 1;
								break;
							case 123:
								F = !0, w = 0;
								break;
							case 125:
								w = F ? 0 : 1;
								break;
							case 39:
							case 34:
							case 96:
								d === C ? w = 1 : d === 39 || d === 34 || d === 96 ? w = 0 : w = 1;
								break;
							case 42:
								w = d === 42 ? 1 : 0;
								break;
							case 124:
								w = d === 124 ? 1 : 0;
								break;
							case 32:
								w = v ? 0 : 1;
								break;
							default: w = r.get(C);
						}
						w === 1 && (i.push(_l._createLink(r, o, s, c, l)), S = !0);
					} else if (m === 12) {
						let w;
						C === 91 ? (g = !0, w = 0) : w = r.get(C), w === 1 ? S = !0 : m = 13;
					} else m = n.nextState(m, C), m === 0 && (S = !0);
					S && (m = 1, p = !1, g = !1, F = !1, c = l + 1, d = C), l++;
				}
				m === 13 && i.push(_l._createLink(r, o, s, c, u));
			}
			return i;
		}
	};
	function Qm(e) {
		return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : Xm.computeLinks(e);
	}
	var Zm = class l2 {
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
			this.INSTANCE = new l2();
		}
		navigateValueSet(t, n, r, i, s) {
			if (t && n) {
				const a = this.doNavigateValueSet(n, s);
				if (a) return {
					range: t,
					value: a
				};
			}
			if (r && i) {
				const a = this.doNavigateValueSet(i, s);
				if (a) return {
					range: r,
					value: a
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
			let i = Number(t);
			const s = parseFloat(t);
			return !isNaN(i) && !isNaN(s) && i === s ? i === 0 && !n ? null : (i = Math.floor(i * r), i += n ? r : -r, String(i / r)) : null;
		}
		textReplace(t, n) {
			return this.valueSetsReplace(this._defaultValueSet, t, n);
		}
		valueSetsReplace(t, n, r) {
			let i = null;
			for (let s = 0, a = t.length; i === null && s < a; s++) i = this.valueSetReplace(t[s], n, r);
			return i;
		}
		valueSetReplace(t, n, r) {
			let i = t.indexOf(n);
			return i >= 0 ? (i += r ? 1 : -1, i < 0 ? i = t.length - 1 : i %= t.length, t[i]) : null;
		}
	};
	const Kl = Object.freeze(function(e, t) {
		const n = setTimeout(e.bind(t), 0);
		return { dispose() {
			clearTimeout(n);
		} };
	});
	var Yi;
	(function(e) {
		function t(n) {
			return n === e.None || n === e.Cancelled || n instanceof Ji ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
		}
		e.isCancellationToken = t, e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: qi.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: Kl
		});
	})(Yi || (Yi = {}));
	var Ji = class {
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
			return this._isCancelled ? Kl : (this._emitter || (this._emitter = new Bt()), this._emitter.event);
		}
		dispose() {
			this._emitter && (this._emitter.dispose(), this._emitter = null);
		}
	}, Km = class {
		constructor(e) {
			this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
		}
		get token() {
			return this._token || (this._token = new Ji()), this._token;
		}
		cancel() {
			this._token ? this._token instanceof Ji && this._token.cancel() : this._token = Yi.Cancelled;
		}
		dispose(e = !1) {
			e && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof Ji && this._token.dispose() : this._token = Yi.None;
		}
	}, Ha = class {
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
	const Xi = new Ha(), Ga = new Ha(), Wa = new Ha(), eg = new Array(230), tg = {}, ng = [], rg = Object.create(null), ig = Object.create(null), ec = [], za = [];
	for (let e = 0; e <= 193; e++) ec[e] = -1;
	for (let e = 0; e <= 132; e++) za[e] = -1;
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
		for (const i of t) {
			const [s, a, o, u, l, c, d, m, p] = i;
			if (r[a] || (r[a] = !0, ng[a] = o, rg[o] = a, ig[o.toLowerCase()] = a, s && (ec[a] = u, u !== 0 && u !== 3 && u !== 5 && u !== 4 && u !== 6 && u !== 57 && (za[u] = a))), !n[u]) {
				if (n[u] = !0, !l) throw new Error(`String representation missing for key code ${u} around scan code ${o}`);
				Xi.define(u, l), Ga.define(u, m || l), Wa.define(u, p || m || l);
			}
			c && (eg[c] = u), d && (tg[d] = u);
		}
		za[3] = 46;
	})();
	var tc;
	(function(e) {
		function t(o) {
			return Xi.keyCodeToStr(o);
		}
		e.toString = t;
		function n(o) {
			return Xi.strToKeyCode(o);
		}
		e.fromString = n;
		function r(o) {
			return Ga.keyCodeToStr(o);
		}
		e.toUserSettingsUS = r;
		function i(o) {
			return Wa.keyCodeToStr(o);
		}
		e.toUserSettingsGeneral = i;
		function s(o) {
			return Ga.strToKeyCode(o) || Wa.strToKeyCode(o);
		}
		e.fromUserSettings = s;
		function a(o) {
			if (o >= 98 && o <= 113) return null;
			switch (o) {
				case 16: return "Up";
				case 18: return "Down";
				case 15: return "Left";
				case 17: return "Right";
			}
			return Xi.keyCodeToStr(o);
		}
		e.toElectronAccelerator = a;
	})(tc || (tc = {}));
	function sg(e, t) {
		return (e | (t & 65535) << 16 >>> 0) >>> 0;
	}
	var ag = class qt extends Ee {
		constructor(t, n, r, i) {
			super(t, n, r, i), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = i;
		}
		toString() {
			return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
		}
		equalsSelection(t) {
			return qt.selectionsEqual(this, t);
		}
		static selectionsEqual(t, n) {
			return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
		}
		getDirection() {
			return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
		}
		setEndPosition(t, n) {
			return this.getDirection() === 0 ? new qt(this.startLineNumber, this.startColumn, t, n) : new qt(t, n, this.startLineNumber, this.startColumn);
		}
		getPosition() {
			return new $e(this.positionLineNumber, this.positionColumn);
		}
		getSelectionStart() {
			return new $e(this.selectionStartLineNumber, this.selectionStartColumn);
		}
		setStartPosition(t, n) {
			return this.getDirection() === 0 ? new qt(t, n, this.endLineNumber, this.endColumn) : new qt(this.endLineNumber, this.endColumn, t, n);
		}
		static fromPositions(t, n = t) {
			return new qt(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static fromRange(t, n) {
			return n === 0 ? new qt(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : new qt(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn);
		}
		static liftSelection(t) {
			return new qt(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
		}
		static selectionsArrEqual(t, n) {
			if (t && !n || !t && n) return !1;
			if (!t && !n) return !0;
			if (t.length !== n.length) return !1;
			for (let r = 0, i = t.length; r < i; r++) if (!this.selectionsEqual(t[r], n[r])) return !1;
			return !0;
		}
		static isISelection(t) {
			return t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
		}
		static createWithDirection(t, n, r, i, s) {
			return s === 0 ? new qt(t, n, r, i) : new qt(r, i, t, n);
		}
	};
	function og(e) {
		return typeof e == "string";
	}
	const nc = Object.create(null);
	function h(e, t) {
		if (og(t)) {
			const n = nc[t];
			if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`);
			t = n;
		}
		return nc[e] = t, { id: e };
	}
	const ug = {
		add: h("add", 6e4),
		plus: h("plus", 6e4),
		gistNew: h("gist-new", 6e4),
		repoCreate: h("repo-create", 6e4),
		lightbulb: h("lightbulb", 60001),
		lightBulb: h("light-bulb", 60001),
		repo: h("repo", 60002),
		repoDelete: h("repo-delete", 60002),
		gistFork: h("gist-fork", 60003),
		repoForked: h("repo-forked", 60003),
		gitPullRequest: h("git-pull-request", 60004),
		gitPullRequestAbandoned: h("git-pull-request-abandoned", 60004),
		recordKeys: h("record-keys", 60005),
		keyboard: h("keyboard", 60005),
		tag: h("tag", 60006),
		gitPullRequestLabel: h("git-pull-request-label", 60006),
		tagAdd: h("tag-add", 60006),
		tagRemove: h("tag-remove", 60006),
		person: h("person", 60007),
		personFollow: h("person-follow", 60007),
		personOutline: h("person-outline", 60007),
		personFilled: h("person-filled", 60007),
		gitBranch: h("git-branch", 60008),
		gitBranchCreate: h("git-branch-create", 60008),
		gitBranchDelete: h("git-branch-delete", 60008),
		sourceControl: h("source-control", 60008),
		mirror: h("mirror", 60009),
		mirrorPublic: h("mirror-public", 60009),
		star: h("star", 60010),
		starAdd: h("star-add", 60010),
		starDelete: h("star-delete", 60010),
		starEmpty: h("star-empty", 60010),
		comment: h("comment", 60011),
		commentAdd: h("comment-add", 60011),
		alert: h("alert", 60012),
		warning: h("warning", 60012),
		search: h("search", 60013),
		searchSave: h("search-save", 60013),
		logOut: h("log-out", 60014),
		signOut: h("sign-out", 60014),
		logIn: h("log-in", 60015),
		signIn: h("sign-in", 60015),
		eye: h("eye", 60016),
		eyeUnwatch: h("eye-unwatch", 60016),
		eyeWatch: h("eye-watch", 60016),
		circleFilled: h("circle-filled", 60017),
		primitiveDot: h("primitive-dot", 60017),
		closeDirty: h("close-dirty", 60017),
		debugBreakpoint: h("debug-breakpoint", 60017),
		debugBreakpointDisabled: h("debug-breakpoint-disabled", 60017),
		debugHint: h("debug-hint", 60017),
		terminalDecorationSuccess: h("terminal-decoration-success", 60017),
		primitiveSquare: h("primitive-square", 60018),
		edit: h("edit", 60019),
		pencil: h("pencil", 60019),
		info: h("info", 60020),
		issueOpened: h("issue-opened", 60020),
		gistPrivate: h("gist-private", 60021),
		gitForkPrivate: h("git-fork-private", 60021),
		lock: h("lock", 60021),
		mirrorPrivate: h("mirror-private", 60021),
		close: h("close", 60022),
		removeClose: h("remove-close", 60022),
		x: h("x", 60022),
		repoSync: h("repo-sync", 60023),
		sync: h("sync", 60023),
		clone: h("clone", 60024),
		desktopDownload: h("desktop-download", 60024),
		beaker: h("beaker", 60025),
		microscope: h("microscope", 60025),
		vm: h("vm", 60026),
		deviceDesktop: h("device-desktop", 60026),
		file: h("file", 60027),
		fileText: h("file-text", 60027),
		more: h("more", 60028),
		ellipsis: h("ellipsis", 60028),
		kebabHorizontal: h("kebab-horizontal", 60028),
		mailReply: h("mail-reply", 60029),
		reply: h("reply", 60029),
		organization: h("organization", 60030),
		organizationFilled: h("organization-filled", 60030),
		organizationOutline: h("organization-outline", 60030),
		newFile: h("new-file", 60031),
		fileAdd: h("file-add", 60031),
		newFolder: h("new-folder", 60032),
		fileDirectoryCreate: h("file-directory-create", 60032),
		trash: h("trash", 60033),
		trashcan: h("trashcan", 60033),
		history: h("history", 60034),
		clock: h("clock", 60034),
		folder: h("folder", 60035),
		fileDirectory: h("file-directory", 60035),
		symbolFolder: h("symbol-folder", 60035),
		logoGithub: h("logo-github", 60036),
		markGithub: h("mark-github", 60036),
		github: h("github", 60036),
		terminal: h("terminal", 60037),
		console: h("console", 60037),
		repl: h("repl", 60037),
		zap: h("zap", 60038),
		symbolEvent: h("symbol-event", 60038),
		error: h("error", 60039),
		stop: h("stop", 60039),
		variable: h("variable", 60040),
		symbolVariable: h("symbol-variable", 60040),
		array: h("array", 60042),
		symbolArray: h("symbol-array", 60042),
		symbolModule: h("symbol-module", 60043),
		symbolPackage: h("symbol-package", 60043),
		symbolNamespace: h("symbol-namespace", 60043),
		symbolObject: h("symbol-object", 60043),
		symbolMethod: h("symbol-method", 60044),
		symbolFunction: h("symbol-function", 60044),
		symbolConstructor: h("symbol-constructor", 60044),
		symbolBoolean: h("symbol-boolean", 60047),
		symbolNull: h("symbol-null", 60047),
		symbolNumeric: h("symbol-numeric", 60048),
		symbolNumber: h("symbol-number", 60048),
		symbolStructure: h("symbol-structure", 60049),
		symbolStruct: h("symbol-struct", 60049),
		symbolParameter: h("symbol-parameter", 60050),
		symbolTypeParameter: h("symbol-type-parameter", 60050),
		symbolKey: h("symbol-key", 60051),
		symbolText: h("symbol-text", 60051),
		symbolReference: h("symbol-reference", 60052),
		goToFile: h("go-to-file", 60052),
		symbolEnum: h("symbol-enum", 60053),
		symbolValue: h("symbol-value", 60053),
		symbolRuler: h("symbol-ruler", 60054),
		symbolUnit: h("symbol-unit", 60054),
		activateBreakpoints: h("activate-breakpoints", 60055),
		archive: h("archive", 60056),
		arrowBoth: h("arrow-both", 60057),
		arrowDown: h("arrow-down", 60058),
		arrowLeft: h("arrow-left", 60059),
		arrowRight: h("arrow-right", 60060),
		arrowSmallDown: h("arrow-small-down", 60061),
		arrowSmallLeft: h("arrow-small-left", 60062),
		arrowSmallRight: h("arrow-small-right", 60063),
		arrowSmallUp: h("arrow-small-up", 60064),
		arrowUp: h("arrow-up", 60065),
		bell: h("bell", 60066),
		bold: h("bold", 60067),
		book: h("book", 60068),
		bookmark: h("bookmark", 60069),
		debugBreakpointConditionalUnverified: h("debug-breakpoint-conditional-unverified", 60070),
		debugBreakpointConditional: h("debug-breakpoint-conditional", 60071),
		debugBreakpointConditionalDisabled: h("debug-breakpoint-conditional-disabled", 60071),
		debugBreakpointDataUnverified: h("debug-breakpoint-data-unverified", 60072),
		debugBreakpointData: h("debug-breakpoint-data", 60073),
		debugBreakpointDataDisabled: h("debug-breakpoint-data-disabled", 60073),
		debugBreakpointLogUnverified: h("debug-breakpoint-log-unverified", 60074),
		debugBreakpointLog: h("debug-breakpoint-log", 60075),
		debugBreakpointLogDisabled: h("debug-breakpoint-log-disabled", 60075),
		briefcase: h("briefcase", 60076),
		broadcast: h("broadcast", 60077),
		browser: h("browser", 60078),
		bug: h("bug", 60079),
		calendar: h("calendar", 60080),
		caseSensitive: h("case-sensitive", 60081),
		check: h("check", 60082),
		checklist: h("checklist", 60083),
		chevronDown: h("chevron-down", 60084),
		chevronLeft: h("chevron-left", 60085),
		chevronRight: h("chevron-right", 60086),
		chevronUp: h("chevron-up", 60087),
		chromeClose: h("chrome-close", 60088),
		chromeMaximize: h("chrome-maximize", 60089),
		chromeMinimize: h("chrome-minimize", 60090),
		chromeRestore: h("chrome-restore", 60091),
		circleOutline: h("circle-outline", 60092),
		circle: h("circle", 60092),
		debugBreakpointUnverified: h("debug-breakpoint-unverified", 60092),
		terminalDecorationIncomplete: h("terminal-decoration-incomplete", 60092),
		circleSlash: h("circle-slash", 60093),
		circuitBoard: h("circuit-board", 60094),
		clearAll: h("clear-all", 60095),
		clippy: h("clippy", 60096),
		closeAll: h("close-all", 60097),
		cloudDownload: h("cloud-download", 60098),
		cloudUpload: h("cloud-upload", 60099),
		code: h("code", 60100),
		collapseAll: h("collapse-all", 60101),
		colorMode: h("color-mode", 60102),
		commentDiscussion: h("comment-discussion", 60103),
		creditCard: h("credit-card", 60105),
		dash: h("dash", 60108),
		dashboard: h("dashboard", 60109),
		database: h("database", 60110),
		debugContinue: h("debug-continue", 60111),
		debugDisconnect: h("debug-disconnect", 60112),
		debugPause: h("debug-pause", 60113),
		debugRestart: h("debug-restart", 60114),
		debugStart: h("debug-start", 60115),
		debugStepInto: h("debug-step-into", 60116),
		debugStepOut: h("debug-step-out", 60117),
		debugStepOver: h("debug-step-over", 60118),
		debugStop: h("debug-stop", 60119),
		debug: h("debug", 60120),
		deviceCameraVideo: h("device-camera-video", 60121),
		deviceCamera: h("device-camera", 60122),
		deviceMobile: h("device-mobile", 60123),
		diffAdded: h("diff-added", 60124),
		diffIgnored: h("diff-ignored", 60125),
		diffModified: h("diff-modified", 60126),
		diffRemoved: h("diff-removed", 60127),
		diffRenamed: h("diff-renamed", 60128),
		diff: h("diff", 60129),
		diffSidebyside: h("diff-sidebyside", 60129),
		discard: h("discard", 60130),
		editorLayout: h("editor-layout", 60131),
		emptyWindow: h("empty-window", 60132),
		exclude: h("exclude", 60133),
		extensions: h("extensions", 60134),
		eyeClosed: h("eye-closed", 60135),
		fileBinary: h("file-binary", 60136),
		fileCode: h("file-code", 60137),
		fileMedia: h("file-media", 60138),
		filePdf: h("file-pdf", 60139),
		fileSubmodule: h("file-submodule", 60140),
		fileSymlinkDirectory: h("file-symlink-directory", 60141),
		fileSymlinkFile: h("file-symlink-file", 60142),
		fileZip: h("file-zip", 60143),
		files: h("files", 60144),
		filter: h("filter", 60145),
		flame: h("flame", 60146),
		foldDown: h("fold-down", 60147),
		foldUp: h("fold-up", 60148),
		fold: h("fold", 60149),
		folderActive: h("folder-active", 60150),
		folderOpened: h("folder-opened", 60151),
		gear: h("gear", 60152),
		gift: h("gift", 60153),
		gistSecret: h("gist-secret", 60154),
		gist: h("gist", 60155),
		gitCommit: h("git-commit", 60156),
		gitCompare: h("git-compare", 60157),
		compareChanges: h("compare-changes", 60157),
		gitMerge: h("git-merge", 60158),
		githubAction: h("github-action", 60159),
		githubAlt: h("github-alt", 60160),
		globe: h("globe", 60161),
		grabber: h("grabber", 60162),
		graph: h("graph", 60163),
		gripper: h("gripper", 60164),
		heart: h("heart", 60165),
		home: h("home", 60166),
		horizontalRule: h("horizontal-rule", 60167),
		hubot: h("hubot", 60168),
		inbox: h("inbox", 60169),
		issueReopened: h("issue-reopened", 60171),
		issues: h("issues", 60172),
		italic: h("italic", 60173),
		jersey: h("jersey", 60174),
		json: h("json", 60175),
		kebabVertical: h("kebab-vertical", 60176),
		key: h("key", 60177),
		law: h("law", 60178),
		lightbulbAutofix: h("lightbulb-autofix", 60179),
		linkExternal: h("link-external", 60180),
		link: h("link", 60181),
		listOrdered: h("list-ordered", 60182),
		listUnordered: h("list-unordered", 60183),
		liveShare: h("live-share", 60184),
		loading: h("loading", 60185),
		location: h("location", 60186),
		mailRead: h("mail-read", 60187),
		mail: h("mail", 60188),
		markdown: h("markdown", 60189),
		megaphone: h("megaphone", 60190),
		mention: h("mention", 60191),
		milestone: h("milestone", 60192),
		gitPullRequestMilestone: h("git-pull-request-milestone", 60192),
		mortarBoard: h("mortar-board", 60193),
		move: h("move", 60194),
		multipleWindows: h("multiple-windows", 60195),
		mute: h("mute", 60196),
		noNewline: h("no-newline", 60197),
		note: h("note", 60198),
		octoface: h("octoface", 60199),
		openPreview: h("open-preview", 60200),
		package: h("package", 60201),
		paintcan: h("paintcan", 60202),
		pin: h("pin", 60203),
		play: h("play", 60204),
		run: h("run", 60204),
		plug: h("plug", 60205),
		preserveCase: h("preserve-case", 60206),
		preview: h("preview", 60207),
		project: h("project", 60208),
		pulse: h("pulse", 60209),
		question: h("question", 60210),
		quote: h("quote", 60211),
		radioTower: h("radio-tower", 60212),
		reactions: h("reactions", 60213),
		references: h("references", 60214),
		refresh: h("refresh", 60215),
		regex: h("regex", 60216),
		remoteExplorer: h("remote-explorer", 60217),
		remote: h("remote", 60218),
		remove: h("remove", 60219),
		replaceAll: h("replace-all", 60220),
		replace: h("replace", 60221),
		repoClone: h("repo-clone", 60222),
		repoForcePush: h("repo-force-push", 60223),
		repoPull: h("repo-pull", 60224),
		repoPush: h("repo-push", 60225),
		report: h("report", 60226),
		requestChanges: h("request-changes", 60227),
		rocket: h("rocket", 60228),
		rootFolderOpened: h("root-folder-opened", 60229),
		rootFolder: h("root-folder", 60230),
		rss: h("rss", 60231),
		ruby: h("ruby", 60232),
		saveAll: h("save-all", 60233),
		saveAs: h("save-as", 60234),
		save: h("save", 60235),
		screenFull: h("screen-full", 60236),
		screenNormal: h("screen-normal", 60237),
		searchStop: h("search-stop", 60238),
		server: h("server", 60240),
		settingsGear: h("settings-gear", 60241),
		settings: h("settings", 60242),
		shield: h("shield", 60243),
		smiley: h("smiley", 60244),
		sortPrecedence: h("sort-precedence", 60245),
		splitHorizontal: h("split-horizontal", 60246),
		splitVertical: h("split-vertical", 60247),
		squirrel: h("squirrel", 60248),
		starFull: h("star-full", 60249),
		starHalf: h("star-half", 60250),
		symbolClass: h("symbol-class", 60251),
		symbolColor: h("symbol-color", 60252),
		symbolConstant: h("symbol-constant", 60253),
		symbolEnumMember: h("symbol-enum-member", 60254),
		symbolField: h("symbol-field", 60255),
		symbolFile: h("symbol-file", 60256),
		symbolInterface: h("symbol-interface", 60257),
		symbolKeyword: h("symbol-keyword", 60258),
		symbolMisc: h("symbol-misc", 60259),
		symbolOperator: h("symbol-operator", 60260),
		symbolProperty: h("symbol-property", 60261),
		wrench: h("wrench", 60261),
		wrenchSubaction: h("wrench-subaction", 60261),
		symbolSnippet: h("symbol-snippet", 60262),
		tasklist: h("tasklist", 60263),
		telescope: h("telescope", 60264),
		textSize: h("text-size", 60265),
		threeBars: h("three-bars", 60266),
		thumbsdown: h("thumbsdown", 60267),
		thumbsup: h("thumbsup", 60268),
		tools: h("tools", 60269),
		triangleDown: h("triangle-down", 60270),
		triangleLeft: h("triangle-left", 60271),
		triangleRight: h("triangle-right", 60272),
		triangleUp: h("triangle-up", 60273),
		twitter: h("twitter", 60274),
		unfold: h("unfold", 60275),
		unlock: h("unlock", 60276),
		unmute: h("unmute", 60277),
		unverified: h("unverified", 60278),
		verified: h("verified", 60279),
		versions: h("versions", 60280),
		vmActive: h("vm-active", 60281),
		vmOutline: h("vm-outline", 60282),
		vmRunning: h("vm-running", 60283),
		watch: h("watch", 60284),
		whitespace: h("whitespace", 60285),
		wholeWord: h("whole-word", 60286),
		window: h("window", 60287),
		wordWrap: h("word-wrap", 60288),
		zoomIn: h("zoom-in", 60289),
		zoomOut: h("zoom-out", 60290),
		listFilter: h("list-filter", 60291),
		listFlat: h("list-flat", 60292),
		listSelection: h("list-selection", 60293),
		selection: h("selection", 60293),
		listTree: h("list-tree", 60294),
		debugBreakpointFunctionUnverified: h("debug-breakpoint-function-unverified", 60295),
		debugBreakpointFunction: h("debug-breakpoint-function", 60296),
		debugBreakpointFunctionDisabled: h("debug-breakpoint-function-disabled", 60296),
		debugStackframeActive: h("debug-stackframe-active", 60297),
		circleSmallFilled: h("circle-small-filled", 60298),
		debugStackframeDot: h("debug-stackframe-dot", 60298),
		terminalDecorationMark: h("terminal-decoration-mark", 60298),
		debugStackframe: h("debug-stackframe", 60299),
		debugStackframeFocused: h("debug-stackframe-focused", 60299),
		debugBreakpointUnsupported: h("debug-breakpoint-unsupported", 60300),
		symbolString: h("symbol-string", 60301),
		debugReverseContinue: h("debug-reverse-continue", 60302),
		debugStepBack: h("debug-step-back", 60303),
		debugRestartFrame: h("debug-restart-frame", 60304),
		debugAlt: h("debug-alt", 60305),
		callIncoming: h("call-incoming", 60306),
		callOutgoing: h("call-outgoing", 60307),
		menu: h("menu", 60308),
		expandAll: h("expand-all", 60309),
		feedback: h("feedback", 60310),
		gitPullRequestReviewer: h("git-pull-request-reviewer", 60310),
		groupByRefType: h("group-by-ref-type", 60311),
		ungroupByRefType: h("ungroup-by-ref-type", 60312),
		account: h("account", 60313),
		gitPullRequestAssignee: h("git-pull-request-assignee", 60313),
		bellDot: h("bell-dot", 60314),
		debugConsole: h("debug-console", 60315),
		library: h("library", 60316),
		output: h("output", 60317),
		runAll: h("run-all", 60318),
		syncIgnored: h("sync-ignored", 60319),
		pinned: h("pinned", 60320),
		githubInverted: h("github-inverted", 60321),
		serverProcess: h("server-process", 60322),
		serverEnvironment: h("server-environment", 60323),
		pass: h("pass", 60324),
		issueClosed: h("issue-closed", 60324),
		stopCircle: h("stop-circle", 60325),
		playCircle: h("play-circle", 60326),
		record: h("record", 60327),
		debugAltSmall: h("debug-alt-small", 60328),
		vmConnect: h("vm-connect", 60329),
		cloud: h("cloud", 60330),
		merge: h("merge", 60331),
		export: h("export", 60332),
		graphLeft: h("graph-left", 60333),
		magnet: h("magnet", 60334),
		notebook: h("notebook", 60335),
		redo: h("redo", 60336),
		checkAll: h("check-all", 60337),
		pinnedDirty: h("pinned-dirty", 60338),
		passFilled: h("pass-filled", 60339),
		circleLargeFilled: h("circle-large-filled", 60340),
		circleLarge: h("circle-large", 60341),
		circleLargeOutline: h("circle-large-outline", 60341),
		combine: h("combine", 60342),
		gather: h("gather", 60342),
		table: h("table", 60343),
		variableGroup: h("variable-group", 60344),
		typeHierarchy: h("type-hierarchy", 60345),
		typeHierarchySub: h("type-hierarchy-sub", 60346),
		typeHierarchySuper: h("type-hierarchy-super", 60347),
		gitPullRequestCreate: h("git-pull-request-create", 60348),
		runAbove: h("run-above", 60349),
		runBelow: h("run-below", 60350),
		notebookTemplate: h("notebook-template", 60351),
		debugRerun: h("debug-rerun", 60352),
		workspaceTrusted: h("workspace-trusted", 60353),
		workspaceUntrusted: h("workspace-untrusted", 60354),
		workspaceUnknown: h("workspace-unknown", 60355),
		terminalCmd: h("terminal-cmd", 60356),
		terminalDebian: h("terminal-debian", 60357),
		terminalLinux: h("terminal-linux", 60358),
		terminalPowershell: h("terminal-powershell", 60359),
		terminalTmux: h("terminal-tmux", 60360),
		terminalUbuntu: h("terminal-ubuntu", 60361),
		terminalBash: h("terminal-bash", 60362),
		arrowSwap: h("arrow-swap", 60363),
		copy: h("copy", 60364),
		personAdd: h("person-add", 60365),
		filterFilled: h("filter-filled", 60366),
		wand: h("wand", 60367),
		debugLineByLine: h("debug-line-by-line", 60368),
		inspect: h("inspect", 60369),
		layers: h("layers", 60370),
		layersDot: h("layers-dot", 60371),
		layersActive: h("layers-active", 60372),
		compass: h("compass", 60373),
		compassDot: h("compass-dot", 60374),
		compassActive: h("compass-active", 60375),
		azure: h("azure", 60376),
		issueDraft: h("issue-draft", 60377),
		gitPullRequestClosed: h("git-pull-request-closed", 60378),
		gitPullRequestDraft: h("git-pull-request-draft", 60379),
		debugAll: h("debug-all", 60380),
		debugCoverage: h("debug-coverage", 60381),
		runErrors: h("run-errors", 60382),
		folderLibrary: h("folder-library", 60383),
		debugContinueSmall: h("debug-continue-small", 60384),
		beakerStop: h("beaker-stop", 60385),
		graphLine: h("graph-line", 60386),
		graphScatter: h("graph-scatter", 60387),
		pieChart: h("pie-chart", 60388),
		bracket: h("bracket", 60175),
		bracketDot: h("bracket-dot", 60389),
		bracketError: h("bracket-error", 60390),
		lockSmall: h("lock-small", 60391),
		azureDevops: h("azure-devops", 60392),
		verifiedFilled: h("verified-filled", 60393),
		newline: h("newline", 60394),
		layout: h("layout", 60395),
		layoutActivitybarLeft: h("layout-activitybar-left", 60396),
		layoutActivitybarRight: h("layout-activitybar-right", 60397),
		layoutPanelLeft: h("layout-panel-left", 60398),
		layoutPanelCenter: h("layout-panel-center", 60399),
		layoutPanelJustify: h("layout-panel-justify", 60400),
		layoutPanelRight: h("layout-panel-right", 60401),
		layoutPanel: h("layout-panel", 60402),
		layoutSidebarLeft: h("layout-sidebar-left", 60403),
		layoutSidebarRight: h("layout-sidebar-right", 60404),
		layoutStatusbar: h("layout-statusbar", 60405),
		layoutMenubar: h("layout-menubar", 60406),
		layoutCentered: h("layout-centered", 60407),
		target: h("target", 60408),
		indent: h("indent", 60409),
		recordSmall: h("record-small", 60410),
		errorSmall: h("error-small", 60411),
		terminalDecorationError: h("terminal-decoration-error", 60411),
		arrowCircleDown: h("arrow-circle-down", 60412),
		arrowCircleLeft: h("arrow-circle-left", 60413),
		arrowCircleRight: h("arrow-circle-right", 60414),
		arrowCircleUp: h("arrow-circle-up", 60415),
		layoutSidebarRightOff: h("layout-sidebar-right-off", 60416),
		layoutPanelOff: h("layout-panel-off", 60417),
		layoutSidebarLeftOff: h("layout-sidebar-left-off", 60418),
		blank: h("blank", 60419),
		heartFilled: h("heart-filled", 60420),
		map: h("map", 60421),
		mapHorizontal: h("map-horizontal", 60421),
		foldHorizontal: h("fold-horizontal", 60421),
		mapFilled: h("map-filled", 60422),
		mapHorizontalFilled: h("map-horizontal-filled", 60422),
		foldHorizontalFilled: h("fold-horizontal-filled", 60422),
		circleSmall: h("circle-small", 60423),
		bellSlash: h("bell-slash", 60424),
		bellSlashDot: h("bell-slash-dot", 60425),
		commentUnresolved: h("comment-unresolved", 60426),
		gitPullRequestGoToChanges: h("git-pull-request-go-to-changes", 60427),
		gitPullRequestNewChanges: h("git-pull-request-new-changes", 60428),
		searchFuzzy: h("search-fuzzy", 60429),
		commentDraft: h("comment-draft", 60430),
		send: h("send", 60431),
		sparkle: h("sparkle", 60432),
		insert: h("insert", 60433),
		mic: h("mic", 60434),
		thumbsdownFilled: h("thumbsdown-filled", 60435),
		thumbsupFilled: h("thumbsup-filled", 60436),
		coffee: h("coffee", 60437),
		snake: h("snake", 60438),
		game: h("game", 60439),
		vr: h("vr", 60440),
		chip: h("chip", 60441),
		piano: h("piano", 60442),
		music: h("music", 60443),
		micFilled: h("mic-filled", 60444),
		repoFetch: h("repo-fetch", 60445),
		copilot: h("copilot", 60446),
		lightbulbSparkle: h("lightbulb-sparkle", 60447),
		robot: h("robot", 60448),
		sparkleFilled: h("sparkle-filled", 60449),
		diffSingle: h("diff-single", 60450),
		diffMultiple: h("diff-multiple", 60451),
		surroundWith: h("surround-with", 60452),
		share: h("share", 60453),
		gitStash: h("git-stash", 60454),
		gitStashApply: h("git-stash-apply", 60455),
		gitStashPop: h("git-stash-pop", 60456),
		vscode: h("vscode", 60457),
		vscodeInsiders: h("vscode-insiders", 60458),
		codeOss: h("code-oss", 60459),
		runCoverage: h("run-coverage", 60460),
		runAllCoverage: h("run-all-coverage", 60461),
		coverage: h("coverage", 60462),
		githubProject: h("github-project", 60463),
		mapVertical: h("map-vertical", 60464),
		foldVertical: h("fold-vertical", 60464),
		mapVerticalFilled: h("map-vertical-filled", 60465),
		foldVerticalFilled: h("fold-vertical-filled", 60465),
		goToSearch: h("go-to-search", 60466),
		percentage: h("percentage", 60467),
		sortPercentage: h("sort-percentage", 60467),
		attach: h("attach", 60468)
	}, lg = {
		dialogError: h("dialog-error", "error"),
		dialogWarning: h("dialog-warning", "warning"),
		dialogInfo: h("dialog-info", "info"),
		dialogClose: h("dialog-close", "close"),
		treeItemExpanded: h("tree-item-expanded", "chevron-down"),
		treeFilterOnTypeOn: h("tree-filter-on-type-on", "list-filter"),
		treeFilterOnTypeOff: h("tree-filter-on-type-off", "list-selection"),
		treeFilterClear: h("tree-filter-clear", "close"),
		treeItemLoading: h("tree-item-loading", "loading"),
		menuSelection: h("menu-selection", "check"),
		menuSubmenu: h("menu-submenu", "chevron-right"),
		menuBarMore: h("menubar-more", "more"),
		scrollbarButtonLeft: h("scrollbar-button-left", "triangle-left"),
		scrollbarButtonRight: h("scrollbar-button-right", "triangle-right"),
		scrollbarButtonUp: h("scrollbar-button-up", "triangle-up"),
		scrollbarButtonDown: h("scrollbar-button-down", "triangle-down"),
		toolBarMore: h("toolbar-more", "more"),
		quickInputBack: h("quick-input-back", "arrow-left"),
		dropDownButton: h("drop-down-button", 60084),
		symbolCustomColor: h("symbol-customcolor", 60252),
		exportIcon: h("export", 60332),
		workspaceUnspecified: h("workspace-unspecified", 60355),
		newLine: h("newline", 60394),
		thumbsDownFilled: h("thumbsdown-filled", 60435),
		thumbsUpFilled: h("thumbsup-filled", 60436),
		gitFetch: h("git-fetch", 60445),
		lightbulbSparkleAutofix: h("lightbulb-sparkle-autofix", 60447),
		debugBreakpointPending: h("debug-breakpoint-pending", 60377)
	}, ae = {
		...ug,
		...lg
	};
	var rc = class {
		constructor() {
			this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new Bt(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
		}
		handleChange(e) {
			this._onDidChange.fire({
				changedLanguages: e,
				changedColorMap: !1
			});
		}
		register(e, t) {
			return this._tokenizationSupports.set(e, t), this.handleChange([e]), Ui(() => {
				this._tokenizationSupports.get(e) === t && (this._tokenizationSupports.delete(e), this.handleChange([e]));
			});
		}
		get(e) {
			return this._tokenizationSupports.get(e) || null;
		}
		registerFactory(e, t) {
			this._factories.get(e)?.dispose();
			const n = new cg(this, e, t);
			return this._factories.set(e, n), Ui(() => {
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
	}, cg = class extends ji {
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
	}, fg = class {
		constructor(e, t, n) {
			this.offset = e, this.type = t, this.language = n, this._tokenBrand = void 0;
		}
		toString() {
			return "(" + this.offset + ", " + this.type + ")";
		}
	}, ic;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(ic || (ic = {}));
	var sc;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, ae.symbolMethod), t.set(1, ae.symbolFunction), t.set(2, ae.symbolConstructor), t.set(3, ae.symbolField), t.set(4, ae.symbolVariable), t.set(5, ae.symbolClass), t.set(6, ae.symbolStruct), t.set(7, ae.symbolInterface), t.set(8, ae.symbolModule), t.set(9, ae.symbolProperty), t.set(10, ae.symbolEvent), t.set(11, ae.symbolOperator), t.set(12, ae.symbolUnit), t.set(13, ae.symbolValue), t.set(15, ae.symbolEnum), t.set(14, ae.symbolConstant), t.set(15, ae.symbolEnum), t.set(16, ae.symbolEnumMember), t.set(17, ae.symbolKeyword), t.set(27, ae.symbolSnippet), t.set(18, ae.symbolText), t.set(19, ae.symbolColor), t.set(20, ae.symbolFile), t.set(21, ae.symbolReference), t.set(22, ae.symbolCustomColor), t.set(23, ae.symbolFolder), t.set(24, ae.symbolTypeParameter), t.set(25, ae.account), t.set(26, ae.issues);
		function n(s) {
			let a = t.get(s);
			return a || (console.info("No codicon found for CompletionItemKind " + s), a = ae.symbolProperty), a;
		}
		e.toIcon = n;
		const r = /* @__PURE__ */ new Map();
		r.set("method", 0), r.set("function", 1), r.set("constructor", 2), r.set("field", 3), r.set("variable", 4), r.set("class", 5), r.set("struct", 6), r.set("interface", 7), r.set("module", 8), r.set("property", 9), r.set("event", 10), r.set("operator", 11), r.set("unit", 12), r.set("value", 13), r.set("constant", 14), r.set("enum", 15), r.set("enum-member", 16), r.set("enumMember", 16), r.set("keyword", 17), r.set("snippet", 27), r.set("text", 18), r.set("color", 19), r.set("file", 20), r.set("reference", 21), r.set("customcolor", 22), r.set("folder", 23), r.set("type-parameter", 24), r.set("typeParameter", 24), r.set("account", 25), r.set("issue", 26);
		function i(s, a) {
			let o = r.get(s);
			return typeof o > "u" && !a && (o = 9), o;
		}
		e.fromString = i;
	})(sc || (sc = {}));
	var ac;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(ac || (ac = {}));
	var oc;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
	})(oc || (oc = {}));
	var uc;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(uc || (uc = {}));
	var lc;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(lc || (lc = {}));
	Re("Array", "array"), Re("Boolean", "boolean"), Re("Class", "class"), Re("Constant", "constant"), Re("Constructor", "constructor"), Re("Enum", "enumeration"), Re("EnumMember", "enumeration member"), Re("Event", "event"), Re("Field", "field"), Re("File", "file"), Re("Function", "function"), Re("Interface", "interface"), Re("Key", "key"), Re("Method", "method"), Re("Module", "module"), Re("Namespace", "namespace"), Re("Null", "null"), Re("Number", "number"), Re("Object", "object"), Re("Operator", "operator"), Re("Package", "package"), Re("Property", "property"), Re("String", "string"), Re("Struct", "struct"), Re("TypeParameter", "type parameter"), Re("Variable", "variable");
	var cc;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, ae.symbolFile), t.set(1, ae.symbolModule), t.set(2, ae.symbolNamespace), t.set(3, ae.symbolPackage), t.set(4, ae.symbolClass), t.set(5, ae.symbolMethod), t.set(6, ae.symbolProperty), t.set(7, ae.symbolField), t.set(8, ae.symbolConstructor), t.set(9, ae.symbolEnum), t.set(10, ae.symbolInterface), t.set(11, ae.symbolFunction), t.set(12, ae.symbolVariable), t.set(13, ae.symbolConstant), t.set(14, ae.symbolString), t.set(15, ae.symbolNumber), t.set(16, ae.symbolBoolean), t.set(17, ae.symbolArray), t.set(18, ae.symbolObject), t.set(19, ae.symbolKey), t.set(20, ae.symbolNull), t.set(21, ae.symbolEnumMember), t.set(22, ae.symbolStruct), t.set(23, ae.symbolEvent), t.set(24, ae.symbolOperator), t.set(25, ae.symbolTypeParameter);
		function n(r) {
			let i = t.get(r);
			return i || (console.info("No codicon found for SymbolKind " + r), i = ae.symbolProperty), i;
		}
		e.toIcon = n;
	})(cc || (cc = {}));
	(class Zn {
		static {
			this.Comment = new Zn("comment");
		}
		static {
			this.Imports = new Zn("imports");
		}
		static {
			this.Region = new Zn("region");
		}
		static fromValue(t) {
			switch (t) {
				case "comment": return Zn.Comment;
				case "imports": return Zn.Imports;
				case "region": return Zn.Region;
			}
			return new Zn(t);
		}
		constructor(t) {
			this.value = t;
		}
	});
	var fc;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(fc || (fc = {}));
	var dc;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(dc || (dc = {}));
	var hc;
	(function(e) {
		function t(n) {
			return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
		}
		e.is = t;
	})(hc || (hc = {}));
	var pc;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(pc || (pc = {}));
	new rc();
	new rc();
	var mc;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(mc || (mc = {}));
	var gc;
	(function(e) {
		e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
	})(gc || (gc = {}));
	var Dc;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
	})(Dc || (Dc = {}));
	var yc;
	(function(e) {
		e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
	})(yc || (yc = {}));
	var vc;
	(function(e) {
		e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
	})(vc || (vc = {}));
	var Ec;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Ec || (Ec = {}));
	var bc;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
	})(bc || (bc = {}));
	var _c;
	(function(e) {
		e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
	})(_c || (_c = {}));
	var Nc;
	(function(e) {
		e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
	})(Nc || (Nc = {}));
	var Tc;
	(function(e) {
		e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Tc || (Tc = {}));
	var Sc;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(Sc || (Sc = {}));
	var Fc;
	(function(e) {
		e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
	})(Fc || (Fc = {}));
	var Ac;
	(function(e) {
		e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.emptySelectionClipboard = 37] = "emptySelectionClipboard", e[e.experimentalWhitespaceRendering = 38] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 39] = "extraEditorClassName", e[e.fastScrollSensitivity = 40] = "fastScrollSensitivity", e[e.find = 41] = "find", e[e.fixedOverflowWidgets = 42] = "fixedOverflowWidgets", e[e.folding = 43] = "folding", e[e.foldingStrategy = 44] = "foldingStrategy", e[e.foldingHighlight = 45] = "foldingHighlight", e[e.foldingImportsByDefault = 46] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 47] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 48] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 49] = "fontFamily", e[e.fontInfo = 50] = "fontInfo", e[e.fontLigatures = 51] = "fontLigatures", e[e.fontSize = 52] = "fontSize", e[e.fontWeight = 53] = "fontWeight", e[e.fontVariations = 54] = "fontVariations", e[e.formatOnPaste = 55] = "formatOnPaste", e[e.formatOnType = 56] = "formatOnType", e[e.glyphMargin = 57] = "glyphMargin", e[e.gotoLocation = 58] = "gotoLocation", e[e.hideCursorInOverviewRuler = 59] = "hideCursorInOverviewRuler", e[e.hover = 60] = "hover", e[e.inDiffEditor = 61] = "inDiffEditor", e[e.inlineSuggest = 62] = "inlineSuggest", e[e.inlineEdit = 63] = "inlineEdit", e[e.letterSpacing = 64] = "letterSpacing", e[e.lightbulb = 65] = "lightbulb", e[e.lineDecorationsWidth = 66] = "lineDecorationsWidth", e[e.lineHeight = 67] = "lineHeight", e[e.lineNumbers = 68] = "lineNumbers", e[e.lineNumbersMinChars = 69] = "lineNumbersMinChars", e[e.linkedEditing = 70] = "linkedEditing", e[e.links = 71] = "links", e[e.matchBrackets = 72] = "matchBrackets", e[e.minimap = 73] = "minimap", e[e.mouseStyle = 74] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 75] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 76] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 77] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 78] = "multiCursorModifier", e[e.multiCursorPaste = 79] = "multiCursorPaste", e[e.multiCursorLimit = 80] = "multiCursorLimit", e[e.occurrencesHighlight = 81] = "occurrencesHighlight", e[e.overviewRulerBorder = 82] = "overviewRulerBorder", e[e.overviewRulerLanes = 83] = "overviewRulerLanes", e[e.padding = 84] = "padding", e[e.pasteAs = 85] = "pasteAs", e[e.parameterHints = 86] = "parameterHints", e[e.peekWidgetDefaultFocus = 87] = "peekWidgetDefaultFocus", e[e.placeholder = 88] = "placeholder", e[e.definitionLinkOpensInPeek = 89] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 90] = "quickSuggestions", e[e.quickSuggestionsDelay = 91] = "quickSuggestionsDelay", e[e.readOnly = 92] = "readOnly", e[e.readOnlyMessage = 93] = "readOnlyMessage", e[e.renameOnType = 94] = "renameOnType", e[e.renderControlCharacters = 95] = "renderControlCharacters", e[e.renderFinalNewline = 96] = "renderFinalNewline", e[e.renderLineHighlight = 97] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 98] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 99] = "renderValidationDecorations", e[e.renderWhitespace = 100] = "renderWhitespace", e[e.revealHorizontalRightPadding = 101] = "revealHorizontalRightPadding", e[e.roundedSelection = 102] = "roundedSelection", e[e.rulers = 103] = "rulers", e[e.scrollbar = 104] = "scrollbar", e[e.scrollBeyondLastColumn = 105] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 106] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 107] = "scrollPredominantAxis", e[e.selectionClipboard = 108] = "selectionClipboard", e[e.selectionHighlight = 109] = "selectionHighlight", e[e.selectOnLineNumbers = 110] = "selectOnLineNumbers", e[e.showFoldingControls = 111] = "showFoldingControls", e[e.showUnused = 112] = "showUnused", e[e.snippetSuggestions = 113] = "snippetSuggestions", e[e.smartSelect = 114] = "smartSelect", e[e.smoothScrolling = 115] = "smoothScrolling", e[e.stickyScroll = 116] = "stickyScroll", e[e.stickyTabStops = 117] = "stickyTabStops", e[e.stopRenderingLineAfter = 118] = "stopRenderingLineAfter", e[e.suggest = 119] = "suggest", e[e.suggestFontSize = 120] = "suggestFontSize", e[e.suggestLineHeight = 121] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 122] = "suggestOnTriggerCharacters", e[e.suggestSelection = 123] = "suggestSelection", e[e.tabCompletion = 124] = "tabCompletion", e[e.tabIndex = 125] = "tabIndex", e[e.unicodeHighlighting = 126] = "unicodeHighlighting", e[e.unusualLineTerminators = 127] = "unusualLineTerminators", e[e.useShadowDOM = 128] = "useShadowDOM", e[e.useTabStops = 129] = "useTabStops", e[e.wordBreak = 130] = "wordBreak", e[e.wordSegmenterLocales = 131] = "wordSegmenterLocales", e[e.wordSeparators = 132] = "wordSeparators", e[e.wordWrap = 133] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 134] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 135] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 136] = "wordWrapColumn", e[e.wordWrapOverride1 = 137] = "wordWrapOverride1", e[e.wordWrapOverride2 = 138] = "wordWrapOverride2", e[e.wrappingIndent = 139] = "wrappingIndent", e[e.wrappingStrategy = 140] = "wrappingStrategy", e[e.showDeprecated = 141] = "showDeprecated", e[e.inlayHints = 142] = "inlayHints", e[e.editorClassName = 143] = "editorClassName", e[e.pixelRatio = 144] = "pixelRatio", e[e.tabFocusMode = 145] = "tabFocusMode", e[e.layoutInfo = 146] = "layoutInfo", e[e.wrappingInfo = 147] = "wrappingInfo", e[e.defaultColorDecorators = 148] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 149] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 150] = "inlineCompletionsAccessibilityVerbose";
	})(Ac || (Ac = {}));
	var Cc;
	(function(e) {
		e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Cc || (Cc = {}));
	var wc;
	(function(e) {
		e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
	})(wc || (wc = {}));
	var Ic;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(Ic || (Ic = {}));
	var Lc;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(Lc || (Lc = {}));
	var Rc;
	(function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(Rc || (Rc = {}));
	var kc;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(kc || (kc = {}));
	var xc;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(xc || (xc = {}));
	var Oc;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(Oc || (Oc = {}));
	var Mc;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Mc || (Mc = {}));
	var Ya;
	(function(e) {
		e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
	})(Ya || (Ya = {}));
	var Kn;
	(function(e) {
		e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
	})(Kn || (Kn = {}));
	var Ja;
	(function(e) {
		e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
	})(Ja || (Ja = {}));
	var Pc;
	(function(e) {
		e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
	})(Pc || (Pc = {}));
	var Bc;
	(function(e) {
		e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
	})(Bc || (Bc = {}));
	var Vc;
	(function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
	})(Vc || (Vc = {}));
	var $c;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})($c || ($c = {}));
	var Uc;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Uc || (Uc = {}));
	var jc;
	(function(e) {
		e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
	})(jc || (jc = {}));
	var qc;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(qc || (qc = {}));
	var Hc;
	(function(e) {
		e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
	})(Hc || (Hc = {}));
	var Gc;
	(function(e) {
		e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
	})(Gc || (Gc = {}));
	var Wc;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
	})(Wc || (Wc = {}));
	var zc;
	(function(e) {
		e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
	})(zc || (zc = {}));
	var Yc;
	(function(e) {
		e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
	})(Yc || (Yc = {}));
	var Jc;
	(function(e) {
		e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
	})(Jc || (Jc = {}));
	var Xa;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(Xa || (Xa = {}));
	var Xc;
	(function(e) {
		e.Off = "off", e.OnCode = "onCode", e.On = "on";
	})(Xc || (Xc = {}));
	var Qc;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(Qc || (Qc = {}));
	var Zc;
	(function(e) {
		e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
	})(Zc || (Zc = {}));
	var Kc;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Kc || (Kc = {}));
	var e1;
	(function(e) {
		e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
	})(e1 || (e1 = {}));
	var t1;
	(function(e) {
		e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
	})(t1 || (t1 = {}));
	var n1;
	(function(e) {
		e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
	})(n1 || (n1 = {}));
	var r1;
	(function(e) {
		e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
	})(r1 || (r1 = {}));
	var dg = class {
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
			return sg(e, t);
		}
	};
	function hg() {
		return {
			editor: void 0,
			languages: void 0,
			CancellationTokenSource: Km,
			Emitter: Bt,
			KeyCode: Ya,
			KeyMod: dg,
			Position: $e,
			Range: Ee,
			Selection: ag,
			SelectionDirection: Xa,
			MarkerSeverity: Kn,
			MarkerTag: Ja,
			Uri: an,
			Token: fg
		};
	}
	var pg = class Nl {
		static {
			this.CHANNEL_NAME = "editorWorkerHost";
		}
		static getChannel(t) {
			return t.getChannel(Nl.CHANNEL_NAME);
		}
		static setChannel(t, n) {
			t.setChannel(Nl.CHANNEL_NAME, n);
		}
	}, i1, s1, mg = class {
		constructor(e, t) {
			this.uri = e, this.value = t;
		}
	};
	function gg(e) {
		return Array.isArray(e);
	}
	(class Pi {
		static {
			this.defaultToKey = (t) => t.toString();
		}
		constructor(t, n) {
			if (this[i1] = "ResourceMap", t instanceof Pi) this.map = new Map(t.map), this.toKey = n ?? Pi.defaultToKey;
			else if (gg(t)) {
				this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? Pi.defaultToKey;
				for (const [r, i] of t) this.set(r, i);
			} else this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? Pi.defaultToKey;
		}
		set(t, n) {
			return this.map.set(this.toKey(t), new mg(t, n)), this;
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
			for (const [r, i] of this.map) t(i.value, i.uri, this);
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
		*[(i1 = Symbol.toStringTag, Symbol.iterator)]() {
			for (const [, t] of this.map) yield [t.uri, t.value];
		}
	});
	var Dg = class {
		constructor() {
			this[s1] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
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
						const i = {
							value: n.key,
							done: !1
						};
						return n = n.next, i;
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
						const i = {
							value: n.value,
							done: !1
						};
						return n = n.next, i;
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
						const i = {
							value: [n.key, n.value],
							done: !1
						};
						return n = n.next, i;
					} else return {
						value: void 0,
						done: !0
					};
				}
			};
			return r;
		}
		[(s1 = Symbol.toStringTag, Symbol.iterator)]() {
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
	}, yg = class extends Dg {
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
	}, vg = class extends yg {
		constructor(e, t = 1) {
			super(e, t);
		}
		trim(e) {
			this.trimOld(e);
		}
		set(e, t) {
			return super.set(e, t), this.checkTrim(), this;
		}
	}, Eg = class {
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
	new vg(10);
	function bg(e) {
		let t = [];
		for (; Object.prototype !== e;) t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
		return t;
	}
	function a1(e) {
		const t = [];
		for (const n of bg(e)) typeof e[n] == "function" && t.push(n);
		return t;
	}
	function _g(e, t) {
		const n = (i) => function() {
			return t(i, Array.prototype.slice.call(arguments, 0));
		}, r = {};
		for (const i of e) r[i] = n(i);
		return r;
	}
	var o1;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(o1 || (o1 = {}));
	var u1;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(u1 || (u1 = {}));
	var l1;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(l1 || (l1 = {}));
	function Ng(e, t, n, r, i) {
		if (r === 0) return !0;
		const s = t.charCodeAt(r - 1);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const a = t.charCodeAt(r);
			if (e.get(a) !== 0) return !0;
		}
		return !1;
	}
	function Tg(e, t, n, r, i) {
		if (r + i === n) return !0;
		const s = t.charCodeAt(r + i);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const a = t.charCodeAt(r + i - 1);
			if (e.get(a) !== 0) return !0;
		}
		return !1;
	}
	function Sg(e, t, n, r, i) {
		return Ng(e, t, n, r, i) && Tg(e, t, n, r, i);
	}
	var Fg = class {
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
				const r = n.index, i = n[0].length;
				if (r === this._prevMatchStartIndex && i === this._prevMatchLength) {
					if (i === 0) {
						um(e, t, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
						continue;
					}
					return null;
				}
				if (this._prevMatchStartIndex = r, this._prevMatchLength = i, !this._wordSeparators || Sg(this._wordSeparators, e, t, r, i)) return n;
			} while (n);
			return null;
		}
	};
	function Ag(e, t = "Unreachable") {
		throw new Error(t);
	}
	function Qi(e) {
		if (!e()) {
			debugger;
			e(), ei(new Ht("Assertion Failed"));
		}
	}
	function c1(e, t) {
		let n = 0;
		for (; n < e.length - 1;) {
			const r = e[n], i = e[n + 1];
			if (!t(r, i)) return !1;
			n++;
		}
		return !0;
	}
	const Cg = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
	function wg(e = "") {
		let t = "(-?\\d*\\.\\d\\w*)|([^";
		for (const n of Cg) e.indexOf(n) >= 0 || (t += "\\" + n);
		return t += "\\s]+)", new RegExp(t, "g");
	}
	const f1 = wg();
	function d1(e) {
		let t = f1;
		if (e && e instanceof RegExp) if (e.global) t = e;
		else {
			let n = "g";
			e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
		}
		return t.lastIndex = 0, t;
	}
	const h1 = new k2();
	h1.unshift({
		maxLen: 1e3,
		windowSize: 15,
		timeBudget: 150
	});
	function Qa(e, t, n, r, i) {
		if (t = d1(t), i || (i = $i.first(h1)), n.length > i.maxLen) {
			let l = e - i.maxLen / 2;
			return l < 0 ? l = 0 : r += l, n = n.substring(l, e + i.maxLen / 2), Qa(e, t, n, r, i);
		}
		const s = Date.now(), a = e - 1 - r;
		let o = -1, u = null;
		for (let l = 1; !(Date.now() - s >= i.timeBudget); l++) {
			const c = a - i.windowSize * l;
			t.lastIndex = Math.max(0, c);
			const d = Ig(t, n, a, o);
			if (!d && u || (u = d, c <= 0)) break;
			o = c;
		}
		if (u) {
			const l = {
				word: u[0],
				startColumn: r + 1 + u.index,
				endColumn: r + 1 + u.index + u[0].length
			};
			return t.lastIndex = 0, l;
		}
		return null;
	}
	function Ig(e, t, n, r) {
		let i;
		for (; i = e.exec(t);) {
			const s = i.index || 0;
			if (s <= n && e.lastIndex >= n) return i;
			if (r > 0 && s > r) return null;
		}
		return null;
	}
	var Lg = class {
		static computeUnicodeHighlights(e, t, n) {
			const r = n ? n.startLineNumber : 1, i = n ? n.endLineNumber : e.getLineCount(), s = new p1(t), a = s.getCandidateCodePoints();
			let o;
			a === "allNonBasicAscii" ? o = /* @__PURE__ */ new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : o = new RegExp(`${Rg(Array.from(a))}`, "g");
			const u = new Fg(null, o), l = [];
			let c = !1, d, m = 0, p = 0, g = 0;
			e: for (let v = r, F = i; v <= F; v++) {
				const S = e.getLineContent(v), C = S.length;
				u.reset(0);
				do
					if (d = u.next(S), d) {
						let w = d.index, T = d.index + d[0].length;
						if (w > 0) Hi(S.charCodeAt(w - 1)) && w--;
						if (T + 1 < C) Hi(S.charCodeAt(T - 1)) && T++;
						const A = S.substring(w, T);
						let k = Qa(w + 1, f1, S, 0);
						k && k.endColumn <= w + 1 && (k = null);
						const V = s.shouldHighlightNonBasicASCII(A, k ? k.word : null);
						if (V !== 0) {
							if (V === 3 ? m++ : V === 2 ? p++ : V === 1 ? g++ : Ag(V), l.length >= 1e3) {
								c = !0;
								break e;
							}
							l.push(new Ee(v, w + 1, v, T + 1));
						}
					}
				while (d);
			}
			return {
				ranges: l,
				hasMore: c,
				ambiguousCharacterCount: m,
				invisibleCharacterCount: p,
				nonBasicAsciiCharacterCount: g
			};
		}
		static computeUnicodeHighlightReason(e, t) {
			const n = new p1(t);
			switch (n.shouldHighlightNonBasicASCII(e, null)) {
				case 0: return null;
				case 2: return { kind: 1 };
				case 3: {
					const r = e.codePointAt(0), i = n.ambiguousCharacters.getPrimaryConfusable(r), s = Oa.getLocales().filter((a) => !Oa.getInstance(new Set([...t.allowedLocales, a])).isAmbiguous(r));
					return {
						kind: 0,
						confusableWith: String.fromCodePoint(i),
						notAmbiguousInLocales: s
					};
				}
				case 1: return { kind: 2 };
			}
		}
	};
	function Rg(e, t) {
		return `[${im(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
	}
	var p1 = class {
		constructor(e) {
			this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = Oa.getInstance(new Set(e.allowedLocales));
		}
		getCandidateCodePoints() {
			if (this.options.nonBasicASCII) return "allNonBasicAscii";
			const e = /* @__PURE__ */ new Set();
			if (this.options.invisibleCharacters) for (const t of Ma.codePoints) m1(String.fromCodePoint(t)) || e.add(t);
			if (this.options.ambiguousCharacters) for (const t of this.ambiguousCharacters.getConfusableCodePoints()) e.add(t);
			for (const t of this.allowedCodePoints) e.delete(t);
			return e;
		}
		shouldHighlightNonBasicASCII(e, t) {
			const n = e.codePointAt(0);
			if (this.allowedCodePoints.has(n)) return 0;
			if (this.options.nonBasicASCII) return 1;
			let r = !1, i = !1;
			if (t) for (const s of t) {
				const a = s.codePointAt(0), o = cm(s);
				r = r || o, !o && !this.ambiguousCharacters.isAmbiguous(a) && !Ma.isInvisibleCharacter(a) && (i = !0);
			}
			return !r && i ? 0 : this.options.invisibleCharacters && !m1(e) && Ma.isInvisibleCharacter(n) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n) ? 3 : 0;
		}
	};
	function m1(e) {
		return e === " " || e === `
` || e === "	";
	}
	var Zi = class {
		constructor(e, t, n) {
			this.changes = e, this.moves = t, this.hitTimeout = n;
		}
	}, kg = class {
		constructor(e, t) {
			this.lineRangeMapping = e, this.changes = t;
		}
	}, ke = class Dn {
		static addRange(t, n) {
			let r = 0;
			for (; r < n.length && n[r].endExclusive < t.start;) r++;
			let i = r;
			for (; i < n.length && n[i].start <= t.endExclusive;) i++;
			if (r === i) n.splice(r, 0, t);
			else {
				const s = Math.min(t.start, n[r].start), a = Math.max(t.endExclusive, n[i - 1].endExclusive);
				n.splice(r, i - r, new Dn(s, a));
			}
		}
		static tryCreate(t, n) {
			if (!(t > n)) return new Dn(t, n);
		}
		static ofLength(t) {
			return new Dn(0, t);
		}
		static ofStartAndLength(t, n) {
			return new Dn(t, t + n);
		}
		constructor(t, n) {
			if (this.start = t, this.endExclusive = n, t > n) throw new Ht(`Invalid range: ${this.toString()}`);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(t) {
			return new Dn(this.start + t, this.endExclusive + t);
		}
		deltaStart(t) {
			return new Dn(this.start + t, this.endExclusive);
		}
		deltaEnd(t) {
			return new Dn(this.start, this.endExclusive + t);
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
			return new Dn(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive));
		}
		intersect(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			if (n <= r) return new Dn(n, r);
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
			if (this.isEmpty) throw new Ht(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, t));
		}
		clipCyclic(t) {
			if (this.isEmpty) throw new Ht(`Invalid clipping range: ${this.toString()}`);
			return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
		}
		forEach(t) {
			for (let n = this.start; n < this.endExclusive; n++) t(n);
		}
	};
	function Fr(e, t) {
		const n = si(e, t);
		return n === -1 ? void 0 : e[n];
	}
	function si(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const a = Math.floor((i + s) / 2);
			t(e[a]) ? i = a + 1 : s = a;
		}
		return i - 1;
	}
	function xg(e, t) {
		const n = Za(e, t);
		return n === e.length ? void 0 : e[n];
	}
	function Za(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const a = Math.floor((i + s) / 2);
			t(e[a]) ? s = a : i = a + 1;
		}
		return i;
	}
	var g1 = class c2 {
		static {
			this.assertInvariants = !1;
		}
		constructor(t) {
			this._array = t, this._findLastMonotonousLastIdx = 0;
		}
		findLastMonotonous(t) {
			if (c2.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const r of this._array) if (this._prevFindLastPredicate(r) && !t(r)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = t;
			}
			const n = si(this._array, t, this._findLastMonotonousLastIdx);
			return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
		}
	}, be = class Rn {
		static fromRangeInclusive(t) {
			return new Rn(t.startLineNumber, t.endLineNumber + 1);
		}
		static joinMany(t) {
			if (t.length === 0) return [];
			let n = new Ki(t[0].slice());
			for (let r = 1; r < t.length; r++) n = n.getUnion(new Ki(t[r].slice()));
			return n.ranges;
		}
		static join(t) {
			if (t.length === 0) throw new Ht("lineRanges cannot be empty");
			let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
			for (let i = 1; i < t.length; i++) n = Math.min(n, t[i].startLineNumber), r = Math.max(r, t[i].endLineNumberExclusive);
			return new Rn(n, r);
		}
		static ofLength(t, n) {
			return new Rn(t, t + n);
		}
		static deserialize(t) {
			return new Rn(t[0], t[1]);
		}
		constructor(t, n) {
			if (t > n) throw new Ht(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
			this.startLineNumber = t, this.endLineNumberExclusive = n;
		}
		contains(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(t) {
			return new Rn(this.startLineNumber + t, this.endLineNumberExclusive + t);
		}
		deltaLength(t) {
			return new Rn(this.startLineNumber, this.endLineNumberExclusive + t);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(t) {
			return new Rn(Math.min(this.startLineNumber, t.startLineNumber), Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive));
		}
		toString() {
			return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
		}
		intersect(t) {
			const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
			if (n <= r) return new Rn(n, r);
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
			return this.isEmpty ? null : new Ee(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toExclusiveRange() {
			return new Ee(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
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
			return new ke(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
	}, Ki = class Qr {
		constructor(t = []) {
			this._normalizedRanges = t;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(t) {
			if (t.length === 0) return;
			const n = Za(this._normalizedRanges, (i) => i.endLineNumberExclusive >= t.startLineNumber), r = si(this._normalizedRanges, (i) => i.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) this._normalizedRanges.splice(n, 0, t);
			else if (n === r - 1) {
				const i = this._normalizedRanges[n];
				this._normalizedRanges[n] = i.join(t);
			} else {
				const i = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(t);
				this._normalizedRanges.splice(n, r - n, i);
			}
		}
		contains(t) {
			const n = Fr(this._normalizedRanges, (r) => r.startLineNumber <= t);
			return !!n && n.endLineNumberExclusive > t;
		}
		intersects(t) {
			const n = Fr(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
			return !!n && n.endLineNumberExclusive > t.startLineNumber;
		}
		getUnion(t) {
			if (this._normalizedRanges.length === 0) return t;
			if (t._normalizedRanges.length === 0) return this;
			const n = [];
			let r = 0, i = 0, s = null;
			for (; r < this._normalizedRanges.length || i < t._normalizedRanges.length;) {
				let a = null;
				if (r < this._normalizedRanges.length && i < t._normalizedRanges.length) {
					const o = this._normalizedRanges[r], u = t._normalizedRanges[i];
					o.startLineNumber < u.startLineNumber ? (a = o, r++) : (a = u, i++);
				} else r < this._normalizedRanges.length ? (a = this._normalizedRanges[r], r++) : (a = t._normalizedRanges[i], i++);
				s === null ? s = a : s.endLineNumberExclusive >= a.startLineNumber ? s = new be(s.startLineNumber, Math.max(s.endLineNumberExclusive, a.endLineNumberExclusive)) : (n.push(s), s = a);
			}
			return s !== null && n.push(s), new Qr(n);
		}
		subtractFrom(t) {
			const n = Za(this._normalizedRanges, (a) => a.endLineNumberExclusive >= t.startLineNumber), r = si(this._normalizedRanges, (a) => a.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) return new Qr([t]);
			const i = [];
			let s = t.startLineNumber;
			for (let a = n; a < r; a++) {
				const o = this._normalizedRanges[a];
				o.startLineNumber > s && i.push(new be(s, o.startLineNumber)), s = o.endLineNumberExclusive;
			}
			return s < t.endLineNumberExclusive && i.push(new be(s, t.endLineNumberExclusive)), new Qr(i);
		}
		toString() {
			return this._normalizedRanges.map((t) => t.toString()).join(", ");
		}
		getIntersection(t) {
			const n = [];
			let r = 0, i = 0;
			for (; r < this._normalizedRanges.length && i < t._normalizedRanges.length;) {
				const s = this._normalizedRanges[r], a = t._normalizedRanges[i], o = s.intersect(a);
				o && !o.isEmpty && n.push(o), s.endLineNumberExclusive < a.endLineNumberExclusive ? r++ : i++;
			}
			return new Qr(n);
		}
		getWithDelta(t) {
			return new Qr(this._normalizedRanges.map((n) => n.delta(t)));
		}
	};
	(class Zr {
		static {
			this.zero = new Zr(0, 0);
		}
		static betweenPositions(t, n) {
			return t.lineNumber === n.lineNumber ? new Zr(0, n.column - t.column) : new Zr(n.lineNumber - t.lineNumber, n.column - 1);
		}
		static ofRange(t) {
			return Zr.betweenPositions(t.getStartPosition(), t.getEndPosition());
		}
		static ofText(t) {
			let n = 0, r = 0;
			for (const i of t) i === `
` ? (n++, r = 0) : r++;
			return new Zr(n, r);
		}
		constructor(t, n) {
			this.lineCount = t, this.columnCount = n;
		}
		isGreaterThanOrEqualTo(t) {
			return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
		}
		createRange(t) {
			return this.lineCount === 0 ? new Ee(t.lineNumber, t.column, t.lineNumber, t.column + this.columnCount) : new Ee(t.lineNumber, t.column, t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		addToPosition(t) {
			return this.lineCount === 0 ? new $e(t.lineNumber, t.column + this.columnCount) : new $e(t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toString() {
			return `${this.lineCount},${this.columnCount}`;
		}
	});
	var Og = class {
		constructor(e, t) {
			this.range = e, this.text = t;
		}
		toSingleEditOperation() {
			return {
				range: this.range,
				text: this.text
			};
		}
	}, Ar = class Kr {
		static inverse(t, n, r) {
			const i = [];
			let s = 1, a = 1;
			for (const u of t) {
				const l = new Kr(new be(s, u.original.startLineNumber), new be(a, u.modified.startLineNumber));
				l.modified.isEmpty || i.push(l), s = u.original.endLineNumberExclusive, a = u.modified.endLineNumberExclusive;
			}
			const o = new Kr(new be(s, n + 1), new be(a, r + 1));
			return o.modified.isEmpty || i.push(o), i;
		}
		static clip(t, n, r) {
			const i = [];
			for (const s of t) {
				const a = s.original.intersect(n), o = s.modified.intersect(r);
				a && !a.isEmpty && o && !o.isEmpty && i.push(new Kr(a, o));
			}
			return i;
		}
		constructor(t, n) {
			this.original = t, this.modified = n;
		}
		toString() {
			return `{${this.original.toString()}->${this.modified.toString()}}`;
		}
		flip() {
			return new Kr(this.modified, this.original);
		}
		join(t) {
			return new Kr(this.original.join(t.original), this.modified.join(t.modified));
		}
		toRangeMapping() {
			const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
			if (t && n) return new bn(t, n);
			if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new Ht("not a valid diff");
				return new bn(new Ee(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new Ee(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new bn(new Ee(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new Ee(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(t, n) {
			if (D1(this.original.endLineNumberExclusive, t) && D1(this.modified.endLineNumberExclusive, n)) return new bn(new Ee(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new Ee(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new bn(Ee.fromPositions(new $e(this.original.startLineNumber, 1), Cr(new $e(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), Ee.fromPositions(new $e(this.modified.startLineNumber, 1), Cr(new $e(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new bn(Ee.fromPositions(Cr(new $e(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), Cr(new $e(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), Ee.fromPositions(Cr(new $e(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), Cr(new $e(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			throw new Ht();
		}
	};
	function Cr(e, t) {
		if (e.lineNumber < 1) return new $e(1, 1);
		if (e.lineNumber > t.length) return new $e(t.length, t[t.length - 1].length + 1);
		const n = t[e.lineNumber - 1];
		return e.column > n.length + 1 ? new $e(e.lineNumber, n.length + 1) : e;
	}
	function D1(e, t) {
		return e >= 1 && e <= t.length;
	}
	var ai = class ya extends Ar {
		static fromRangeMappings(t) {
			return new ya(be.join(t.map((n) => be.fromRangeInclusive(n.originalRange))), be.join(t.map((n) => be.fromRangeInclusive(n.modifiedRange))), t);
		}
		constructor(t, n, r) {
			super(t, n), this.innerChanges = r;
		}
		flip() {
			return new ya(this.modified, this.original, this.innerChanges?.map((t) => t.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new ya(this.original, this.modified, [this.toRangeMapping()]);
		}
	}, bn = class f2 {
		static assertSorted(t) {
			for (let n = 1; n < t.length; n++) {
				const r = t[n - 1], i = t[n];
				if (!(r.originalRange.getEndPosition().isBeforeOrEqual(i.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(i.modifiedRange.getStartPosition()))) throw new Ht("Range mappings must be sorted");
			}
		}
		constructor(t, n) {
			this.originalRange = t, this.modifiedRange = n;
		}
		toString() {
			return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
		}
		flip() {
			return new f2(this.modifiedRange, this.originalRange);
		}
		toTextEdit(t) {
			const n = t.getValueOfRange(this.modifiedRange);
			return new Og(this.originalRange, n);
		}
	};
	const Mg = 3;
	var Pg = class {
		computeDiff(e, t, n) {
			const r = new $g(e, t, {
				maxComputationTime: n.maxComputationTimeMs,
				shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
				shouldComputeCharChanges: !0,
				shouldMakePrettyDiff: !0,
				shouldPostProcessCharChanges: !0
			}).computeDiff(), i = [];
			let s = null;
			for (const a of r.changes) {
				let o;
				a.originalEndLineNumber === 0 ? o = new be(a.originalStartLineNumber + 1, a.originalStartLineNumber + 1) : o = new be(a.originalStartLineNumber, a.originalEndLineNumber + 1);
				let u;
				a.modifiedEndLineNumber === 0 ? u = new be(a.modifiedStartLineNumber + 1, a.modifiedStartLineNumber + 1) : u = new be(a.modifiedStartLineNumber, a.modifiedEndLineNumber + 1);
				let l = new ai(o, u, a.charChanges?.map((c) => new bn(new Ee(c.originalStartLineNumber, c.originalStartColumn, c.originalEndLineNumber, c.originalEndColumn), new Ee(c.modifiedStartLineNumber, c.modifiedStartColumn, c.modifiedEndLineNumber, c.modifiedEndColumn))));
				s && (s.modified.endLineNumberExclusive === l.modified.startLineNumber || s.original.endLineNumberExclusive === l.original.startLineNumber) && (l = new ai(s.original.join(l.original), s.modified.join(l.modified), s.innerChanges && l.innerChanges ? s.innerChanges.concat(l.innerChanges) : void 0), i.pop()), i.push(l), s = l;
			}
			return Qi(() => c1(i, (a, o) => o.original.startLineNumber - a.original.endLineNumberExclusive === o.modified.startLineNumber - a.modified.endLineNumberExclusive && a.original.endLineNumberExclusive < o.original.startLineNumber && a.modified.endLineNumberExclusive < o.modified.startLineNumber)), new Zi(i, [], r.quitEarly);
		}
	};
	function y1(e, t, n, r) {
		return new Ql(e, t, n).ComputeDiff(r);
	}
	var v1 = class {
		constructor(e) {
			const t = [], n = [];
			for (let r = 0, i = e.length; r < i; r++) t[r] = eo(e[r], 1), n[r] = to(e[r], 1);
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
			const r = [], i = [], s = [];
			let a = 0;
			for (let o = t; o <= n; o++) {
				const u = this.lines[o], l = e ? this._startColumns[o] : 1, c = e ? this._endColumns[o] : u.length + 1;
				for (let d = l; d < c; d++) r[a] = u.charCodeAt(d - 1), i[a] = o + 1, s[a] = d, a++;
				!e && o < n && (r[a] = 10, i[a] = o + 1, s[a] = u.length + 1, a++);
			}
			return new Bg(r, i, s);
		}
	}, Bg = class {
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
	}, es = class d2 {
		constructor(t, n, r, i, s, a, o, u) {
			this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = i, this.modifiedStartLineNumber = s, this.modifiedStartColumn = a, this.modifiedEndLineNumber = o, this.modifiedEndColumn = u;
		}
		static createFromDiffChange(t, n, r) {
			return new d2(n.getStartLineNumber(t.originalStart), n.getStartColumn(t.originalStart), n.getEndLineNumber(t.originalStart + t.originalLength - 1), n.getEndColumn(t.originalStart + t.originalLength - 1), r.getStartLineNumber(t.modifiedStart), r.getStartColumn(t.modifiedStart), r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), r.getEndColumn(t.modifiedStart + t.modifiedLength - 1));
		}
	};
	function Vg(e) {
		if (e.length <= 1) return e;
		const t = [e[0]];
		let n = t[0];
		for (let r = 1, i = e.length; r < i; r++) {
			const s = e[r], a = s.originalStart - (n.originalStart + n.originalLength), o = s.modifiedStart - (n.modifiedStart + n.modifiedLength);
			Math.min(a, o) < Mg ? (n.originalLength = s.originalStart + s.originalLength - n.originalStart, n.modifiedLength = s.modifiedStart + s.modifiedLength - n.modifiedStart) : (t.push(s), n = s);
		}
		return t;
	}
	var Ka = class h2 {
		constructor(t, n, r, i, s) {
			this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = i, this.charChanges = s;
		}
		static createFromDiffResult(t, n, r, i, s, a, o) {
			let u, l, c, d, m;
			if (n.originalLength === 0 ? (u = r.getStartLineNumber(n.originalStart) - 1, l = 0) : (u = r.getStartLineNumber(n.originalStart), l = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (c = i.getStartLineNumber(n.modifiedStart) - 1, d = 0) : (c = i.getStartLineNumber(n.modifiedStart), d = i.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), a && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && s()) {
				const p = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), g = i.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
				if (p.getElements().length > 0 && g.getElements().length > 0) {
					let v = y1(p, g, s, !0).changes;
					o && (v = Vg(v)), m = [];
					for (let F = 0, S = v.length; F < S; F++) m.push(es.createFromDiffChange(v[F], p, g));
				}
			}
			return new h2(u, l, c, d, m);
		}
	}, $g = class {
		constructor(e, t, n) {
			this.shouldComputeCharChanges = n.shouldComputeCharChanges, this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = n.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = t, this.original = new v1(e), this.modified = new v1(t), this.continueLineDiff = E1(n.maxComputationTime), this.continueCharDiff = E1(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3));
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
			const e = y1(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), t = e.changes, n = e.quitEarly;
			if (this.shouldIgnoreTrimWhitespace) {
				const a = [];
				for (let o = 0, u = t.length; o < u; o++) a.push(Ka.createFromDiffResult(this.shouldIgnoreTrimWhitespace, t[o], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
				return {
					quitEarly: n,
					changes: a
				};
			}
			const r = [];
			let i = 0, s = 0;
			for (let a = -1, o = t.length; a < o; a++) {
				const u = a + 1 < o ? t[a + 1] : null, l = u ? u.originalStart : this.originalLines.length, c = u ? u.modifiedStart : this.modifiedLines.length;
				for (; i < l && s < c;) {
					const d = this.originalLines[i], m = this.modifiedLines[s];
					if (d !== m) {
						{
							let p = eo(d, 1), g = eo(m, 1);
							for (; p > 1 && g > 1 && d.charCodeAt(p - 2) === m.charCodeAt(g - 2);) p--, g--;
							(p > 1 || g > 1) && this._pushTrimWhitespaceCharChange(r, i + 1, 1, p, s + 1, 1, g);
						}
						{
							let p = to(d, 1), g = to(m, 1);
							const v = d.length + 1, F = m.length + 1;
							for (; p < v && g < F && d.charCodeAt(p - 1) === d.charCodeAt(g - 1);) p++, g++;
							(p < v || g < F) && this._pushTrimWhitespaceCharChange(r, i + 1, p, v, s + 1, g, F);
						}
					}
					i++, s++;
				}
				u && (r.push(Ka.createFromDiffResult(this.shouldIgnoreTrimWhitespace, u, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), i += u.originalLength, s += u.modifiedLength);
			}
			return {
				quitEarly: n,
				changes: r
			};
		}
		_pushTrimWhitespaceCharChange(e, t, n, r, i, s, a) {
			if (this._mergeTrimWhitespaceCharChange(e, t, n, r, i, s, a)) return;
			let o;
			this.shouldComputeCharChanges && (o = [new es(t, n, t, r, i, s, i, a)]), e.push(new Ka(t, t, i, i, o));
		}
		_mergeTrimWhitespaceCharChange(e, t, n, r, i, s, a) {
			const o = e.length;
			if (o === 0) return !1;
			const u = e[o - 1];
			return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0 ? !1 : u.originalEndLineNumber === t && u.modifiedEndLineNumber === i ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new es(t, n, t, r, i, s, i, a)), !0) : u.originalEndLineNumber + 1 === t && u.modifiedEndLineNumber + 1 === i ? (u.originalEndLineNumber = t, u.modifiedEndLineNumber = i, this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new es(t, n, t, r, i, s, i, a)), !0) : !1;
		}
	};
	function eo(e, t) {
		const n = am(e);
		return n === -1 ? t : n + 1;
	}
	function to(e, t) {
		const n = om(e);
		return n === -1 ? t : n + 2;
	}
	function E1(e) {
		if (e === 0) return () => !0;
		const t = Date.now();
		return () => Date.now() - t < e;
	}
	function Ug(e, t, n = (r, i) => r === i) {
		if (e === t) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let r = 0, i = e.length; r < i; r++) if (!n(e[r], t[r])) return !1;
		return !0;
	}
	function* jg(e, t) {
		let n, r;
		for (const i of e) r !== void 0 && t(r, i) ? n.push(i) : (n && (yield n), n = [i]), r = i;
		n && (yield n);
	}
	function qg(e, t) {
		for (let n = 0; n <= e.length; n++) t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
	}
	function Hg(e, t) {
		for (let n = 0; n < e.length; n++) t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
	}
	function Gg(e, t) {
		for (const n of t) e.push(n);
	}
	var no;
	(function(e) {
		function t(s) {
			return s < 0;
		}
		e.isLessThan = t;
		function n(s) {
			return s <= 0;
		}
		e.isLessThanOrEqual = n;
		function r(s) {
			return s > 0;
		}
		e.isGreaterThan = r;
		function i(s) {
			return s === 0;
		}
		e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
	})(no || (no = {}));
	function ts(e, t) {
		return (n, r) => t(e(n), e(r));
	}
	const ns = (e, t) => e - t;
	function Wg(e) {
		return (t, n) => -e(t, n);
	}
	(class va {
		static {
			this.empty = new va((t) => {});
		}
		constructor(t) {
			this.iterate = t;
		}
		toArray() {
			const t = [];
			return this.iterate((n) => (t.push(n), !0)), t;
		}
		filter(t) {
			return new va((n) => this.iterate((r) => t(r) ? n(r) : !0));
		}
		map(t) {
			return new va((n) => this.iterate((r) => n(t(r))));
		}
		findLast(t) {
			let n;
			return this.iterate((r) => (t(r) && (n = r), !0)), n;
		}
		findLastMaxBy(t) {
			let n, r = !0;
			return this.iterate((i) => ((r || no.isGreaterThan(t(i, n))) && (r = !1, n = i), !0)), n;
		}
	});
	var wr = class Tl {
		static trivial(t, n) {
			return new Tl([new Tt(ke.ofLength(t.length), ke.ofLength(n.length))], !1);
		}
		static trivialTimedOut(t, n) {
			return new Tl([new Tt(ke.ofLength(t.length), ke.ofLength(n.length))], !0);
		}
		constructor(t, n) {
			this.diffs = t, this.hitTimeout = n;
		}
	}, Tt = class kn {
		static invert(t, n) {
			const r = [];
			return qg(t, (i, s) => {
				r.push(kn.fromOffsetPairs(i ? i.getEndExclusives() : er.zero, s ? s.getStarts() : new er(n, (i ? i.seq2Range.endExclusive - i.seq1Range.endExclusive : 0) + n)));
			}), r;
		}
		static fromOffsetPairs(t, n) {
			return new kn(new ke(t.offset1, n.offset1), new ke(t.offset2, n.offset2));
		}
		static assertSorted(t) {
			let n;
			for (const r of t) {
				if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start)) throw new Ht("Sequence diffs must be sorted");
				n = r;
			}
		}
		constructor(t, n) {
			this.seq1Range = t, this.seq2Range = n;
		}
		swap() {
			return new kn(this.seq2Range, this.seq1Range);
		}
		toString() {
			return `${this.seq1Range} <-> ${this.seq2Range}`;
		}
		join(t) {
			return new kn(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
		}
		delta(t) {
			return t === 0 ? this : new kn(this.seq1Range.delta(t), this.seq2Range.delta(t));
		}
		deltaStart(t) {
			return t === 0 ? this : new kn(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
		}
		deltaEnd(t) {
			return t === 0 ? this : new kn(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
		}
		intersect(t) {
			const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
			if (!(!n || !r)) return new kn(n, r);
		}
		getStarts() {
			return new er(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new er(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	}, er = class Ea {
		static {
			this.zero = new Ea(0, 0);
		}
		static {
			this.max = new Ea(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		}
		constructor(t, n) {
			this.offset1 = t, this.offset2 = n;
		}
		toString() {
			return `${this.offset1} <-> ${this.offset2}`;
		}
		delta(t) {
			return t === 0 ? this : new Ea(this.offset1 + t, this.offset2 + t);
		}
		equals(t) {
			return this.offset1 === t.offset1 && this.offset2 === t.offset2;
		}
	}, ro = class p2 {
		static {
			this.instance = new p2();
		}
		isValid() {
			return !0;
		}
	}, zg = class {
		constructor(e) {
			if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0) throw new Ht("timeout must be positive");
		}
		isValid() {
			if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
				this.valid = !1;
				debugger;
			}
			return this.valid;
		}
	}, io = class {
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
	function so(e) {
		return e === 32 || e === 9;
	}
	var b1 = class Sl {
		static {
			this.chrKeys = /* @__PURE__ */ new Map();
		}
		static getKey(t) {
			let n = this.chrKeys.get(t);
			return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
		}
		constructor(t, n, r) {
			this.range = t, this.lines = n, this.source = r, this.histogram = [];
			let i = 0;
			for (let s = t.startLineNumber - 1; s < t.endLineNumberExclusive - 1; s++) {
				const a = n[s];
				for (let u = 0; u < a.length; u++) {
					i++;
					const l = a[u], c = Sl.getKey(l);
					this.histogram[c] = (this.histogram[c] || 0) + 1;
				}
				i++;
				const o = Sl.getKey(`
`);
				this.histogram[o] = (this.histogram[o] || 0) + 1;
			}
			this.totalCount = i;
		}
		computeSimilarity(t) {
			let n = 0;
			const r = Math.max(this.histogram.length, t.histogram.length);
			for (let i = 0; i < r; i++) n += Math.abs((this.histogram[i] ?? 0) - (t.histogram[i] ?? 0));
			return 1 - n / (this.totalCount + t.totalCount);
		}
	}, Yg = class {
		compute(e, t, n = ro.instance, r) {
			if (e.length === 0 || t.length === 0) return wr.trivial(e, t);
			const i = new io(e.length, t.length), s = new io(e.length, t.length), a = new io(e.length, t.length);
			for (let p = 0; p < e.length; p++) for (let g = 0; g < t.length; g++) {
				if (!n.isValid()) return wr.trivialTimedOut(e, t);
				const v = p === 0 ? 0 : i.get(p - 1, g), F = g === 0 ? 0 : i.get(p, g - 1);
				let S;
				e.getElement(p) === t.getElement(g) ? (p === 0 || g === 0 ? S = 0 : S = i.get(p - 1, g - 1), p > 0 && g > 0 && s.get(p - 1, g - 1) === 3 && (S += a.get(p - 1, g - 1)), S += r ? r(p, g) : 1) : S = -1;
				const C = Math.max(v, F, S);
				if (C === S) {
					const w = p > 0 && g > 0 ? a.get(p - 1, g - 1) : 0;
					a.set(p, g, w + 1), s.set(p, g, 3);
				} else C === v ? (a.set(p, g, 0), s.set(p, g, 1)) : C === F && (a.set(p, g, 0), s.set(p, g, 2));
				i.set(p, g, C);
			}
			const o = [];
			let u = e.length, l = t.length;
			function c(p, g) {
				(p + 1 !== u || g + 1 !== l) && o.push(new Tt(new ke(p + 1, u), new ke(g + 1, l))), u = p, l = g;
			}
			let d = e.length - 1, m = t.length - 1;
			for (; d >= 0 && m >= 0;) s.get(d, m) === 3 ? (c(d, m), d--, m--) : s.get(d, m) === 1 ? d-- : m--;
			return c(-1, -1), o.reverse(), new wr(o, !1);
		}
	}, _1 = class {
		compute(e, t, n = ro.instance) {
			if (e.length === 0 || t.length === 0) return wr.trivial(e, t);
			const r = e, i = t;
			function s(g, v) {
				for (; g < r.length && v < i.length && r.getElement(g) === i.getElement(v);) g++, v++;
				return g;
			}
			let a = 0;
			const o = new Jg();
			o.set(0, s(0, 0));
			const u = new Xg();
			u.set(0, o.get(0) === 0 ? null : new N1(null, 0, 0, o.get(0)));
			let l = 0;
			e: for (;;) {
				if (a++, !n.isValid()) return wr.trivialTimedOut(r, i);
				const g = -Math.min(a, i.length + a % 2), v = Math.min(a, r.length + a % 2);
				for (l = g; l <= v; l += 2) {
					let F = 0;
					const S = l === v ? -1 : o.get(l + 1), C = l === g ? -1 : o.get(l - 1) + 1;
					F++;
					const w = Math.min(Math.max(S, C), r.length), T = w - l;
					if (F++, w > r.length || T > i.length) continue;
					const A = s(w, T);
					o.set(l, A);
					const k = w === S ? u.get(l + 1) : u.get(l - 1);
					if (u.set(l, A !== w ? new N1(k, w, T, A - w) : k), o.get(l) === r.length && o.get(l) - l === i.length) break e;
				}
			}
			let c = u.get(l);
			const d = [];
			let m = r.length, p = i.length;
			for (;;) {
				const g = c ? c.x + c.length : 0, v = c ? c.y + c.length : 0;
				if ((g !== m || v !== p) && d.push(new Tt(new ke(g, m), new ke(v, p))), !c) break;
				m = c.x, p = c.y, c = c.prev;
			}
			return d.reverse(), new wr(d, !1);
		}
	}, N1 = class {
		constructor(e, t, n, r) {
			this.prev = e, this.x = t, this.y = n, this.length = r;
		}
	}, Jg = class {
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
	}, Xg = class {
		constructor() {
			this.positiveArr = [], this.negativeArr = [];
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			e < 0 ? (e = -e - 1, this.negativeArr[e] = t) : this.positiveArr[e] = t;
		}
	}, rs = class {
		constructor(e, t, n) {
			this.lines = e, this.range = t, this.considerWhitespaceChanges = n, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
			for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
				let i = e[r - 1], s = 0;
				r === this.range.startLineNumber && this.range.startColumn > 1 && (s = this.range.startColumn - 1, i = i.substring(s)), this.lineStartOffsets.push(s);
				let a = 0;
				if (!n) {
					const u = i.trimStart();
					a = i.length - u.length, i = u.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(a);
				const o = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - s - a, i.length) : i.length;
				for (let u = 0; u < o; u++) this.elements.push(i.charCodeAt(u));
				r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new ke(0, this.length));
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
			const t = S1(e > 0 ? this.elements[e - 1] : -1), n = S1(e < this.elements.length ? this.elements[e] : -1);
			if (t === 7 && n === 8) return 0;
			if (t === 8) return 150;
			let r = 0;
			return t !== n && (r += 10, t === 0 && n === 1 && (r += 1)), r += T1(t), r += T1(n), r;
		}
		translateOffset(e, t = "right") {
			const n = si(this.firstElementOffsetByLineIdx, (i) => i <= e), r = e - this.firstElementOffsetByLineIdx[n];
			return new $e(this.range.startLineNumber + n, 1 + this.lineStartOffsets[n] + r + (r === 0 && t === "left" ? 0 : this.trimmedWsLengthsByLineIdx[n]));
		}
		translateRange(e) {
			const t = this.translateOffset(e.start, "right"), n = this.translateOffset(e.endExclusive, "left");
			return n.isBefore(t) ? Ee.fromPositions(n, n) : Ee.fromPositions(t, n);
		}
		findWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !ao(this.elements[e])) return;
			let t = e;
			for (; t > 0 && ao(this.elements[t - 1]);) t--;
			let n = e;
			for (; n < this.elements.length && ao(this.elements[n]);) n++;
			return new ke(t, n);
		}
		countLinesIn(e) {
			return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
		}
		isStronglyEqual(e, t) {
			return this.elements[e] === this.elements[t];
		}
		extendToFullLines(e) {
			return new ke(Fr(this.firstElementOffsetByLineIdx, (t) => t <= e.start) ?? 0, xg(this.firstElementOffsetByLineIdx, (t) => e.endExclusive <= t) ?? this.elements.length);
		}
	};
	function ao(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
	}
	const Qg = {
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
	function T1(e) {
		return Qg[e];
	}
	function S1(e) {
		return e === 10 ? 8 : e === 13 ? 7 : so(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
	}
	function Zg(e, t, n, r, i, s) {
		let { moves: a, excludedChanges: o } = e4(e, t, n, s);
		if (!s.isValid()) return [];
		const u = t4(e.filter((l) => !o.has(l)), r, i, t, n, s);
		return Gg(a, u), a = n4(a), a = a.filter((l) => {
			const c = l.original.toOffsetRange().slice(t).map((d) => d.trim());
			return c.join(`
`).length >= 15 && Kg(c, (d) => d.length >= 2) >= 2;
		}), a = r4(e, a), a;
	}
	function Kg(e, t) {
		let n = 0;
		for (const r of e) t(r) && n++;
		return n;
	}
	function e4(e, t, n, r) {
		const i = [], s = e.filter((u) => u.modified.isEmpty && u.original.length >= 3).map((u) => new b1(u.original, t, u)), a = new Set(e.filter((u) => u.original.isEmpty && u.modified.length >= 3).map((u) => new b1(u.modified, n, u))), o = /* @__PURE__ */ new Set();
		for (const u of s) {
			let l = -1, c;
			for (const d of a) {
				const m = u.computeSimilarity(d);
				m > l && (l = m, c = d);
			}
			if (l > .9 && c && (a.delete(c), i.push(new Ar(u.range, c.range)), o.add(u.source), o.add(c.source)), !r.isValid()) return {
				moves: i,
				excludedChanges: o
			};
		}
		return {
			moves: i,
			excludedChanges: o
		};
	}
	function t4(e, t, n, r, i, s) {
		const a = [], o = new Eg();
		for (const m of e) for (let p = m.original.startLineNumber; p < m.original.endLineNumberExclusive - 2; p++) {
			const g = `${t[p - 1]}:${t[p + 1 - 1]}:${t[p + 2 - 1]}`;
			o.add(g, { range: new be(p, p + 3) });
		}
		const u = [];
		e.sort(ts((m) => m.modified.startLineNumber, ns));
		for (const m of e) {
			let p = [];
			for (let g = m.modified.startLineNumber; g < m.modified.endLineNumberExclusive - 2; g++) {
				const v = `${n[g - 1]}:${n[g + 1 - 1]}:${n[g + 2 - 1]}`, F = new be(g, g + 3), S = [];
				o.forEach(v, ({ range: C }) => {
					for (const T of p) if (T.originalLineRange.endLineNumberExclusive + 1 === C.endLineNumberExclusive && T.modifiedLineRange.endLineNumberExclusive + 1 === F.endLineNumberExclusive) {
						T.originalLineRange = new be(T.originalLineRange.startLineNumber, C.endLineNumberExclusive), T.modifiedLineRange = new be(T.modifiedLineRange.startLineNumber, F.endLineNumberExclusive), S.push(T);
						return;
					}
					const w = {
						modifiedLineRange: F,
						originalLineRange: C
					};
					u.push(w), S.push(w);
				}), p = S;
			}
			if (!s.isValid()) return [];
		}
		u.sort(Wg(ts((m) => m.modifiedLineRange.length, ns)));
		const l = new Ki(), c = new Ki();
		for (const m of u) {
			const p = m.modifiedLineRange.startLineNumber - m.originalLineRange.startLineNumber, g = l.subtractFrom(m.modifiedLineRange), v = c.subtractFrom(m.originalLineRange).getWithDelta(p), F = g.getIntersection(v);
			for (const S of F.ranges) {
				if (S.length < 3) continue;
				const C = S, w = S.delta(-p);
				a.push(new Ar(w, C)), l.addRange(C), c.addRange(w);
			}
		}
		a.sort(ts((m) => m.original.startLineNumber, ns));
		const d = new g1(e);
		for (let m = 0; m < a.length; m++) {
			const p = a[m], g = d.findLastMonotonous((k) => k.original.startLineNumber <= p.original.startLineNumber), v = Fr(e, (k) => k.modified.startLineNumber <= p.modified.startLineNumber), F = Math.max(p.original.startLineNumber - g.original.startLineNumber, p.modified.startLineNumber - v.modified.startLineNumber), S = d.findLastMonotonous((k) => k.original.startLineNumber < p.original.endLineNumberExclusive), C = Fr(e, (k) => k.modified.startLineNumber < p.modified.endLineNumberExclusive), w = Math.max(S.original.endLineNumberExclusive - p.original.endLineNumberExclusive, C.modified.endLineNumberExclusive - p.modified.endLineNumberExclusive);
			let T;
			for (T = 0; T < F; T++) {
				const k = p.original.startLineNumber - T - 1, V = p.modified.startLineNumber - T - 1;
				if (k > r.length || V > i.length || l.contains(V) || c.contains(k) || !F1(r[k - 1], i[V - 1], s)) break;
			}
			T > 0 && (c.addRange(new be(p.original.startLineNumber - T, p.original.startLineNumber)), l.addRange(new be(p.modified.startLineNumber - T, p.modified.startLineNumber)));
			let A;
			for (A = 0; A < w; A++) {
				const k = p.original.endLineNumberExclusive + A, V = p.modified.endLineNumberExclusive + A;
				if (k > r.length || V > i.length || l.contains(V) || c.contains(k) || !F1(r[k - 1], i[V - 1], s)) break;
			}
			A > 0 && (c.addRange(new be(p.original.endLineNumberExclusive, p.original.endLineNumberExclusive + A)), l.addRange(new be(p.modified.endLineNumberExclusive, p.modified.endLineNumberExclusive + A))), (T > 0 || A > 0) && (a[m] = new Ar(new be(p.original.startLineNumber - T, p.original.endLineNumberExclusive + A), new be(p.modified.startLineNumber - T, p.modified.endLineNumberExclusive + A)));
		}
		return a;
	}
	function F1(e, t, n) {
		if (e.trim() === t.trim()) return !0;
		if (e.length > 300 && t.length > 300) return !1;
		const r = new _1().compute(new rs([e], new Ee(1, 1, 1, e.length), !1), new rs([t], new Ee(1, 1, 1, t.length), !1), n);
		let i = 0;
		const s = Tt.invert(r.diffs, e.length);
		for (const u of s) u.seq1Range.forEach((l) => {
			so(e.charCodeAt(l)) || i++;
		});
		function a(u) {
			let l = 0;
			for (let c = 0; c < e.length; c++) so(u.charCodeAt(c)) || l++;
			return l;
		}
		const o = a(e.length > t.length ? e : t);
		return i / o > .6 && o > 10;
	}
	function n4(e) {
		if (e.length === 0) return e;
		e.sort(ts((n) => n.original.startLineNumber, ns));
		const t = [e[0]];
		for (let n = 1; n < e.length; n++) {
			const r = t[t.length - 1], i = e[n], s = i.original.startLineNumber - r.original.endLineNumberExclusive, a = i.modified.startLineNumber - r.modified.endLineNumberExclusive;
			if (s >= 0 && a >= 0 && s + a <= 2) {
				t[t.length - 1] = r.join(i);
				continue;
			}
			t.push(i);
		}
		return t;
	}
	function r4(e, t) {
		const n = new g1(e);
		return t = t.filter((r) => (n.findLastMonotonous((i) => i.original.startLineNumber < r.original.endLineNumberExclusive) || new Ar(new be(1, 1), new be(1, 1))) !== Fr(e, (i) => i.modified.startLineNumber < r.modified.endLineNumberExclusive)), t;
	}
	function A1(e, t, n) {
		let r = n;
		return r = C1(e, t, r), r = C1(e, t, r), r = i4(e, t, r), r;
	}
	function C1(e, t, n) {
		if (n.length === 0) return n;
		const r = [];
		r.push(n[0]);
		for (let s = 1; s < n.length; s++) {
			const a = r[r.length - 1];
			let o = n[s];
			if (o.seq1Range.isEmpty || o.seq2Range.isEmpty) {
				const u = o.seq1Range.start - a.seq1Range.endExclusive;
				let l;
				for (l = 1; l <= u && !(e.getElement(o.seq1Range.start - l) !== e.getElement(o.seq1Range.endExclusive - l) || t.getElement(o.seq2Range.start - l) !== t.getElement(o.seq2Range.endExclusive - l)); l++);
				if (l--, l === u) {
					r[r.length - 1] = new Tt(new ke(a.seq1Range.start, o.seq1Range.endExclusive - u), new ke(a.seq2Range.start, o.seq2Range.endExclusive - u));
					continue;
				}
				o = o.delta(-l);
			}
			r.push(o);
		}
		const i = [];
		for (let s = 0; s < r.length - 1; s++) {
			const a = r[s + 1];
			let o = r[s];
			if (o.seq1Range.isEmpty || o.seq2Range.isEmpty) {
				const u = a.seq1Range.start - o.seq1Range.endExclusive;
				let l;
				for (l = 0; l < u && !(!e.isStronglyEqual(o.seq1Range.start + l, o.seq1Range.endExclusive + l) || !t.isStronglyEqual(o.seq2Range.start + l, o.seq2Range.endExclusive + l)); l++);
				if (l === u) {
					r[s + 1] = new Tt(new ke(o.seq1Range.start + u, a.seq1Range.endExclusive), new ke(o.seq2Range.start + u, a.seq2Range.endExclusive));
					continue;
				}
				l > 0 && (o = o.delta(l));
			}
			i.push(o);
		}
		return r.length > 0 && i.push(r[r.length - 1]), i;
	}
	function i4(e, t, n) {
		if (!e.getBoundaryScore || !t.getBoundaryScore) return n;
		for (let r = 0; r < n.length; r++) {
			const i = r > 0 ? n[r - 1] : void 0, s = n[r], a = r + 1 < n.length ? n[r + 1] : void 0, o = new ke(i ? i.seq1Range.endExclusive + 1 : 0, a ? a.seq1Range.start - 1 : e.length), u = new ke(i ? i.seq2Range.endExclusive + 1 : 0, a ? a.seq2Range.start - 1 : t.length);
			s.seq1Range.isEmpty ? n[r] = w1(s, e, t, o, u) : s.seq2Range.isEmpty && (n[r] = w1(s.swap(), t, e, u, o).swap());
		}
		return n;
	}
	function w1(e, t, n, r, i) {
		let a = 1;
		for (; e.seq1Range.start - a >= r.start && e.seq2Range.start - a >= i.start && n.isStronglyEqual(e.seq2Range.start - a, e.seq2Range.endExclusive - a) && a < 100;) a++;
		a--;
		let o = 0;
		for (; e.seq1Range.start + o < r.endExclusive && e.seq2Range.endExclusive + o < i.endExclusive && n.isStronglyEqual(e.seq2Range.start + o, e.seq2Range.endExclusive + o) && o < 100;) o++;
		if (a === 0 && o === 0) return e;
		let u = 0, l = -1;
		for (let c = -a; c <= o; c++) {
			const d = e.seq2Range.start + c, m = e.seq2Range.endExclusive + c, p = e.seq1Range.start + c, g = t.getBoundaryScore(p) + n.getBoundaryScore(d) + n.getBoundaryScore(m);
			g > l && (l = g, u = c);
		}
		return e.delta(u);
	}
	function s4(e, t, n) {
		const r = [];
		for (const i of n) {
			const s = r[r.length - 1];
			if (!s) {
				r.push(i);
				continue;
			}
			i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new Tt(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)) : r.push(i);
		}
		return r;
	}
	function a4(e, t, n) {
		const r = Tt.invert(n, e.length), i = [];
		let s = new er(0, 0);
		function a(o, u) {
			if (o.offset1 < s.offset1 || o.offset2 < s.offset2) return;
			const l = e.findWordContaining(o.offset1), c = t.findWordContaining(o.offset2);
			if (!l || !c) return;
			let d = new Tt(l, c);
			const m = d.intersect(u);
			let p = m.seq1Range.length, g = m.seq2Range.length;
			for (; r.length > 0;) {
				const v = r[0];
				if (!(v.seq1Range.intersects(d.seq1Range) || v.seq2Range.intersects(d.seq2Range))) break;
				const F = new Tt(e.findWordContaining(v.seq1Range.start), t.findWordContaining(v.seq2Range.start)), S = F.intersect(v);
				if (p += S.seq1Range.length, g += S.seq2Range.length, d = d.join(F), d.seq1Range.endExclusive >= v.seq1Range.endExclusive) r.shift();
				else break;
			}
			p + g < (d.seq1Range.length + d.seq2Range.length) * 2 / 3 && i.push(d), s = d.getEndExclusives();
		}
		for (; r.length > 0;) {
			const o = r.shift();
			o.seq1Range.isEmpty || (a(o.getStarts(), o), a(o.getEndExclusives().delta(-1), o));
		}
		return o4(n, i);
	}
	function o4(e, t) {
		const n = [];
		for (; e.length > 0 || t.length > 0;) {
			const r = e[0], i = t[0];
			let s;
			r && (!i || r.seq1Range.start < i.seq1Range.start) ? s = e.shift() : s = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= s.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(s) : n.push(s);
		}
		return n;
	}
	function u4(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const o = [r[0]];
			for (let u = 1; u < r.length; u++) {
				let d = function(m, p) {
					const g = new ke(c.seq1Range.endExclusive, l.seq1Range.start);
					return e.getText(g).replace(/\s/g, "").length <= 4 && (m.seq1Range.length + m.seq2Range.length > 5 || p.seq1Range.length + p.seq2Range.length > 5);
				};
				const l = r[u], c = o[o.length - 1];
				d(c, l) ? (s = !0, o[o.length - 1] = o[o.length - 1].join(l)) : o.push(l);
			}
			r = o;
		} while (i++ < 10 && s);
		return r;
	}
	function l4(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const u = [r[0]];
			for (let l = 1; l < r.length; l++) {
				let m = function(p, g) {
					const v = new ke(d.seq1Range.endExclusive, c.seq1Range.start);
					if (e.countLinesIn(v) > 5 || v.length > 500) return !1;
					const F = e.getText(v).trim();
					if (F.length > 20 || F.split(/\r\n|\r|\n/).length > 1) return !1;
					const S = e.countLinesIn(p.seq1Range), C = p.seq1Range.length, w = t.countLinesIn(p.seq2Range), T = p.seq2Range.length, A = e.countLinesIn(g.seq1Range), k = g.seq1Range.length, V = t.countLinesIn(g.seq2Range), K = g.seq2Range.length, L = 130;
					function M(O) {
						return Math.min(O, L);
					}
					return Math.pow(Math.pow(M(S * 40 + C), 1.5) + Math.pow(M(w * 40 + T), 1.5), 1.5) + Math.pow(Math.pow(M(A * 40 + k), 1.5) + Math.pow(M(V * 40 + K), 1.5), 1.5) > (L ** 1.5) ** 1.5 * 1.3;
				};
				const c = r[l], d = u[u.length - 1];
				m(d, c) ? (s = !0, u[u.length - 1] = u[u.length - 1].join(c)) : u.push(c);
			}
			r = u;
		} while (i++ < 10 && s);
		const a = [];
		return Hg(r, (u, l, c) => {
			let d = l;
			function m(C) {
				return C.length > 0 && C.trim().length <= 3 && l.seq1Range.length + l.seq2Range.length > 100;
			}
			const p = e.extendToFullLines(l.seq1Range), g = e.getText(new ke(p.start, l.seq1Range.start));
			m(g) && (d = d.deltaStart(-g.length));
			const v = e.getText(new ke(l.seq1Range.endExclusive, p.endExclusive));
			m(v) && (d = d.deltaEnd(v.length));
			const F = Tt.fromOffsetPairs(u ? u.getEndExclusives() : er.zero, c ? c.getStarts() : er.max), S = d.intersect(F);
			a.length > 0 && S.getStarts().equals(a[a.length - 1].getEndExclusives()) ? a[a.length - 1] = a[a.length - 1].join(S) : a.push(S);
		}), a;
	}
	var I1 = class {
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
			return 1e3 - ((e === 0 ? 0 : L1(this.lines[e - 1])) + (e === this.lines.length ? 0 : L1(this.lines[e])));
		}
		getText(e) {
			return this.lines.slice(e.start, e.endExclusive).join(`
`);
		}
		isStronglyEqual(e, t) {
			return this.lines[e] === this.lines[t];
		}
	};
	function L1(e) {
		let t = 0;
		for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9);) t++;
		return t;
	}
	var c4 = class {
		constructor() {
			this.dynamicProgrammingDiffing = new Yg(), this.myersDiffingAlgorithm = new _1();
		}
		computeDiff(e, t, n) {
			if (e.length <= 1 && Ug(e, t, (T, A) => T === A)) return new Zi([], [], !1);
			if (e.length === 1 && e[0].length === 0 || t.length === 1 && t[0].length === 0) return new Zi([new ai(new be(1, e.length + 1), new be(1, t.length + 1), [new bn(new Ee(1, 1, e.length, e[e.length - 1].length + 1), new Ee(1, 1, t.length, t[t.length - 1].length + 1))])], [], !1);
			const r = n.maxComputationTimeMs === 0 ? ro.instance : new zg(n.maxComputationTimeMs), i = !n.ignoreTrimWhitespace, s = /* @__PURE__ */ new Map();
			function a(T) {
				let A = s.get(T);
				return A === void 0 && (A = s.size, s.set(T, A)), A;
			}
			const o = e.map((T) => a(T.trim())), u = t.map((T) => a(T.trim())), l = new I1(o, e), c = new I1(u, t), d = l.length + c.length < 1700 ? this.dynamicProgrammingDiffing.compute(l, c, r, (T, A) => e[T] === t[A] ? t[A].length === 0 ? .1 : 1 + Math.log(1 + t[A].length) : .99) : this.myersDiffingAlgorithm.compute(l, c, r);
			let m = d.diffs, p = d.hitTimeout;
			m = A1(l, c, m), m = u4(l, c, m);
			const g = [], v = (T) => {
				if (i) for (let A = 0; A < T; A++) {
					const k = F + A, V = S + A;
					if (e[k] !== t[V]) {
						const K = this.refineDiff(e, t, new Tt(new ke(k, k + 1), new ke(V, V + 1)), r, i);
						for (const L of K.mappings) g.push(L);
						K.hitTimeout && (p = !0);
					}
				}
			};
			let F = 0, S = 0;
			for (const T of m) {
				Qi(() => T.seq1Range.start - F === T.seq2Range.start - S), v(T.seq1Range.start - F), F = T.seq1Range.endExclusive, S = T.seq2Range.endExclusive;
				const A = this.refineDiff(e, t, T, r, i);
				A.hitTimeout && (p = !0);
				for (const k of A.mappings) g.push(k);
			}
			v(e.length - F);
			const C = R1(g, e, t);
			let w = [];
			return n.computeMoves && (w = this.computeMoves(C, e, t, o, u, r, i)), Qi(() => {
				function T(k, V) {
					if (k.lineNumber < 1 || k.lineNumber > V.length) return !1;
					const K = V[k.lineNumber - 1];
					return !(k.column < 1 || k.column > K.length + 1);
				}
				function A(k, V) {
					return !(k.startLineNumber < 1 || k.startLineNumber > V.length + 1 || k.endLineNumberExclusive < 1 || k.endLineNumberExclusive > V.length + 1);
				}
				for (const k of C) {
					if (!k.innerChanges) return !1;
					for (const V of k.innerChanges) if (!(T(V.modifiedRange.getStartPosition(), t) && T(V.modifiedRange.getEndPosition(), t) && T(V.originalRange.getStartPosition(), e) && T(V.originalRange.getEndPosition(), e))) return !1;
					if (!A(k.modified, t) || !A(k.original, e)) return !1;
				}
				return !0;
			}), new Zi(C, w, p);
		}
		computeMoves(e, t, n, r, i, s, a) {
			return Zg(e, t, n, r, i, s).map((o) => new kg(o, R1(this.refineDiff(t, n, new Tt(o.original.toOffsetRange(), o.modified.toOffsetRange()), s, a).mappings, t, n, !0)));
		}
		refineDiff(e, t, n, r, i) {
			const s = d4(n).toRangeMapping2(e, t), a = new rs(e, s.originalRange, i), o = new rs(t, s.modifiedRange, i), u = a.length + o.length < 500 ? this.dynamicProgrammingDiffing.compute(a, o, r) : this.myersDiffingAlgorithm.compute(a, o, r);
			let l = u.diffs;
			return l = A1(a, o, l), l = a4(a, o, l), l = s4(a, o, l), l = l4(a, o, l), {
				mappings: l.map((c) => new bn(a.translateRange(c.seq1Range), o.translateRange(c.seq2Range))),
				hitTimeout: u.hitTimeout
			};
		}
	};
	function R1(e, t, n, r = !1) {
		const i = [];
		for (const s of jg(e.map((a) => f4(a, t, n)), (a, o) => a.original.overlapOrTouch(o.original) || a.modified.overlapOrTouch(o.modified))) {
			const a = s[0], o = s[s.length - 1];
			i.push(new ai(a.original.join(o.original), a.modified.join(o.modified), s.map((u) => u.innerChanges[0])));
		}
		return Qi(() => !r && i.length > 0 && (i[0].modified.startLineNumber !== i[0].original.startLineNumber || n.length - i[i.length - 1].modified.endLineNumberExclusive !== t.length - i[i.length - 1].original.endLineNumberExclusive) ? !1 : c1(i, (s, a) => a.original.startLineNumber - s.original.endLineNumberExclusive === a.modified.startLineNumber - s.modified.endLineNumberExclusive && s.original.endLineNumberExclusive < a.original.startLineNumber && s.modified.endLineNumberExclusive < a.modified.startLineNumber)), i;
	}
	function f4(e, t, n) {
		let r = 0, i = 0;
		return e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (i = -1), e.modifiedRange.startColumn - 1 >= n[e.modifiedRange.startLineNumber - 1].length && e.originalRange.startColumn - 1 >= t[e.originalRange.startLineNumber - 1].length && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + i && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + i && (r = 1), new ai(new be(e.originalRange.startLineNumber + r, e.originalRange.endLineNumber + 1 + i), new be(e.modifiedRange.startLineNumber + r, e.modifiedRange.endLineNumber + 1 + i), [e]);
	}
	function d4(e) {
		return new Ar(new be(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new be(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
	}
	const k1 = {
		getLegacy: () => new Pg(),
		getDefault: () => new c4()
	};
	function $n(e, t) {
		const n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	var nt = class {
		constructor(e, t, n, r = 1) {
			this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, t)) | 0, this.b = Math.min(255, Math.max(0, n)) | 0, this.a = $n(Math.max(Math.min(1, r), 0), 3);
		}
		static equals(e, t) {
			return e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a;
		}
	}, tr = class Bi {
		constructor(t, n, r, i) {
			this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = $n(Math.max(Math.min(1, n), 0), 3), this.l = $n(Math.max(Math.min(1, r), 0), 3), this.a = $n(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = t.a, a = Math.max(n, r, i), o = Math.min(n, r, i);
			let u = 0, l = 0;
			const c = (o + a) / 2, d = a - o;
			if (d > 0) {
				switch (l = Math.min(c <= .5 ? d / (2 * c) : d / (2 - 2 * c), 1), a) {
					case n:
						u = (r - i) / d + (r < i ? 6 : 0);
						break;
					case r:
						u = (i - n) / d + 2;
						break;
					case i:
						u = (n - r) / d + 4;
						break;
				}
				u *= 60, u = Math.round(u);
			}
			return new Bi(u, l, c, s);
		}
		static _hue2rgb(t, n, r) {
			return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
		}
		static toRGBA(t) {
			const n = t.h / 360, { s: r, l: i, a: s } = t;
			let a, o, u;
			if (r === 0) a = o = u = i;
			else {
				const l = i < .5 ? i * (1 + r) : i + r - i * r, c = 2 * i - l;
				a = Bi._hue2rgb(c, l, n + 1 / 3), o = Bi._hue2rgb(c, l, n), u = Bi._hue2rgb(c, l, n - 1 / 3);
			}
			return new nt(Math.round(a * 255), Math.round(o * 255), Math.round(u * 255), s);
		}
	}, is = class m2 {
		constructor(t, n, r, i) {
			this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = $n(Math.max(Math.min(1, n), 0), 3), this.v = $n(Math.max(Math.min(1, r), 0), 3), this.a = $n(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = Math.max(n, r, i), a = s - Math.min(n, r, i), o = s === 0 ? 0 : a / s;
			let u;
			return a === 0 ? u = 0 : s === n ? u = ((r - i) / a % 6 + 6) % 6 : s === r ? u = (i - n) / a + 2 : u = (n - r) / a + 4, new m2(Math.round(u * 60), o, s, t.a);
		}
		static toRGBA(t) {
			const { h: n, s: r, v: i, a: s } = t, a = i * r, o = a * (1 - Math.abs(n / 60 % 2 - 1)), u = i - a;
			let [l, c, d] = [
				0,
				0,
				0
			];
			return n < 60 ? (l = a, c = o) : n < 120 ? (l = o, c = a) : n < 180 ? (c = a, d = o) : n < 240 ? (c = o, d = a) : n < 300 ? (l = o, d = a) : n <= 360 && (l = a, d = o), l = Math.round((l + u) * 255), c = Math.round((c + u) * 255), d = Math.round((d + u) * 255), new nt(l, c, d, s);
		}
	}, ss = class tt {
		static fromHex(t) {
			return tt.Format.CSS.parseHex(t) || tt.red;
		}
		static equals(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
		}
		get hsla() {
			return this._hsla ? this._hsla : tr.fromRGBA(this.rgba);
		}
		get hsva() {
			return this._hsva ? this._hsva : is.fromRGBA(this.rgba);
		}
		constructor(t) {
			if (t) if (t instanceof nt) this.rgba = t;
			else if (t instanceof tr) this._hsla = t, this.rgba = tr.toRGBA(t);
			else if (t instanceof is) this._hsva = t, this.rgba = is.toRGBA(t);
			else throw new Error("Invalid color ctor argument");
			else throw new Error("Color needs a value");
		}
		equals(t) {
			return !!t && nt.equals(this.rgba, t.rgba) && tr.equals(this.hsla, t.hsla) && is.equals(this.hsva, t.hsva);
		}
		getRelativeLuminance() {
			const t = tt._relativeLuminanceForComponent(this.rgba.r), n = tt._relativeLuminanceForComponent(this.rgba.g), r = tt._relativeLuminanceForComponent(this.rgba.b);
			return $n(.2126 * t + .7152 * n + .0722 * r, 4);
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
			return new tt(new tr(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
		}
		darken(t) {
			return new tt(new tr(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
		}
		transparent(t) {
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new tt(new nt(n, r, i, s * t));
		}
		isTransparent() {
			return this.rgba.a === 0;
		}
		isOpaque() {
			return this.rgba.a === 1;
		}
		opposite() {
			return new tt(new nt(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
		}
		makeOpaque(t) {
			if (this.isOpaque() || t.rgba.a !== 1) return this;
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new tt(new nt(t.rgba.r - s * (t.rgba.r - n), t.rgba.g - s * (t.rgba.g - r), t.rgba.b - s * (t.rgba.b - i), 1));
		}
		toString() {
			return this._toString || (this._toString = tt.Format.CSS.format(this)), this._toString;
		}
		static getLighterColor(t, n, r) {
			if (t.isLighterThan(n)) return t;
			r = r || .5;
			const i = t.getRelativeLuminance(), s = n.getRelativeLuminance();
			return r = r * (s - i) / s, t.lighten(r);
		}
		static getDarkerColor(t, n, r) {
			if (t.isDarkerThan(n)) return t;
			r = r || .5;
			const i = t.getRelativeLuminance(), s = n.getRelativeLuminance();
			return r = r * (i - s) / i, t.darken(r);
		}
		static {
			this.white = new tt(new nt(255, 255, 255, 1));
		}
		static {
			this.black = new tt(new nt(0, 0, 0, 1));
		}
		static {
			this.red = new tt(new nt(255, 0, 0, 1));
		}
		static {
			this.blue = new tt(new nt(0, 0, 255, 1));
		}
		static {
			this.green = new tt(new nt(0, 255, 0, 1));
		}
		static {
			this.cyan = new tt(new nt(0, 255, 255, 1));
		}
		static {
			this.lightgrey = new tt(new nt(211, 211, 211, 1));
		}
		static {
			this.transparent = new tt(new nt(0, 0, 0, 0));
		}
	};
	(function(e) {
		(function(t) {
			(function(n) {
				function r(p) {
					return p.rgba.a === 1 ? `rgb(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b})` : e.Format.CSS.formatRGBA(p);
				}
				n.formatRGB = r;
				function i(p) {
					return `rgba(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b}, ${+p.rgba.a.toFixed(2)})`;
				}
				n.formatRGBA = i;
				function s(p) {
					return p.hsla.a === 1 ? `hsl(${p.hsla.h}, ${(p.hsla.s * 100).toFixed(2)}%, ${(p.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(p);
				}
				n.formatHSL = s;
				function a(p) {
					return `hsla(${p.hsla.h}, ${(p.hsla.s * 100).toFixed(2)}%, ${(p.hsla.l * 100).toFixed(2)}%, ${p.hsla.a.toFixed(2)})`;
				}
				n.formatHSLA = a;
				function o(p) {
					const g = p.toString(16);
					return g.length !== 2 ? "0" + g : g;
				}
				function u(p) {
					return `#${o(p.rgba.r)}${o(p.rgba.g)}${o(p.rgba.b)}`;
				}
				n.formatHex = u;
				function l(p, g = !1) {
					return g && p.rgba.a === 1 ? e.Format.CSS.formatHex(p) : `#${o(p.rgba.r)}${o(p.rgba.g)}${o(p.rgba.b)}${o(Math.round(p.rgba.a * 255))}`;
				}
				n.formatHexA = l;
				function c(p) {
					return p.isOpaque() ? e.Format.CSS.formatHex(p) : e.Format.CSS.formatRGBA(p);
				}
				n.format = c;
				function d(p) {
					const g = p.length;
					if (g === 0 || p.charCodeAt(0) !== 35) return null;
					if (g === 7) return new e(new nt(16 * m(p.charCodeAt(1)) + m(p.charCodeAt(2)), 16 * m(p.charCodeAt(3)) + m(p.charCodeAt(4)), 16 * m(p.charCodeAt(5)) + m(p.charCodeAt(6)), 1));
					if (g === 9) return new e(new nt(16 * m(p.charCodeAt(1)) + m(p.charCodeAt(2)), 16 * m(p.charCodeAt(3)) + m(p.charCodeAt(4)), 16 * m(p.charCodeAt(5)) + m(p.charCodeAt(6)), (16 * m(p.charCodeAt(7)) + m(p.charCodeAt(8))) / 255));
					if (g === 4) {
						const v = m(p.charCodeAt(1)), F = m(p.charCodeAt(2)), S = m(p.charCodeAt(3));
						return new e(new nt(16 * v + v, 16 * F + F, 16 * S + S));
					}
					if (g === 5) {
						const v = m(p.charCodeAt(1)), F = m(p.charCodeAt(2)), S = m(p.charCodeAt(3)), C = m(p.charCodeAt(4));
						return new e(new nt(16 * v + v, 16 * F + F, 16 * S + S, (16 * C + C) / 255));
					}
					return null;
				}
				n.parseHex = d;
				function m(p) {
					switch (p) {
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
	})(ss || (ss = {}));
	function x1(e) {
		const t = [];
		for (const n of e) {
			const r = Number(n);
			(r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
		}
		return t;
	}
	function oo(e, t, n, r) {
		return {
			red: e / 255,
			blue: n / 255,
			green: t / 255,
			alpha: r
		};
	}
	function oi(e, t) {
		const n = t.index, r = t[0].length;
		if (!n) return;
		const i = e.positionAt(n);
		return {
			startLineNumber: i.lineNumber,
			startColumn: i.column,
			endLineNumber: i.lineNumber,
			endColumn: i.column + r
		};
	}
	function h4(e, t) {
		if (!e) return;
		const n = ss.Format.CSS.parseHex(t);
		if (n) return {
			range: e,
			color: oo(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
		};
	}
	function O1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = x1(t[0].values());
		return {
			range: e,
			color: oo(r[0], r[1], r[2], n ? r[3] : 1)
		};
	}
	function M1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = x1(t[0].values()), i = new ss(new tr(r[0], r[1] / 100, r[2] / 100, n ? r[3] : 1));
		return {
			range: e,
			color: oo(i.rgba.r, i.rgba.g, i.rgba.b, i.rgba.a)
		};
	}
	function ui(e, t) {
		return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
	}
	function p4(e) {
		const t = [], n = ui(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
		if (n.length > 0) for (const r of n) {
			const i = r.filter((u) => u !== void 0), s = i[1], a = i[2];
			if (!a) continue;
			let o;
			s === "rgb" ? o = O1(oi(e, r), ui(a, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm), !1) : s === "rgba" ? o = O1(oi(e, r), ui(a, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : s === "hsl" ? o = M1(oi(e, r), ui(a, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm), !1) : s === "hsla" ? o = M1(oi(e, r), ui(a, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : s === "#" && (o = h4(oi(e, r), s + a)), o && t.push(o);
		}
		return t;
	}
	function m4(e) {
		return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : p4(e);
	}
	const P1 = /* @__PURE__ */ new RegExp("\\bMARK:\\s*(.*)$", "d"), g4 = /^-+|-+$/g;
	function D4(e, t) {
		let n = [];
		if (t.findRegionSectionHeaders && t.foldingRules?.markers) {
			const r = y4(e, t);
			n = n.concat(r);
		}
		if (t.findMarkSectionHeaders) {
			const r = v4(e);
			n = n.concat(r);
		}
		return n;
	}
	function y4(e, t) {
		const n = [], r = e.getLineCount();
		for (let i = 1; i <= r; i++) {
			const s = e.getLineContent(i), a = s.match(t.foldingRules.markers.start);
			if (a) {
				const o = {
					startLineNumber: i,
					startColumn: a[0].length + 1,
					endLineNumber: i,
					endColumn: s.length + 1
				};
				if (o.endColumn > o.startColumn) {
					const u = {
						range: o,
						...B1(s.substring(a[0].length)),
						shouldBeInComments: !1
					};
					(u.text || u.hasSeparatorLine) && n.push(u);
				}
			}
		}
		return n;
	}
	function v4(e) {
		const t = [], n = e.getLineCount();
		for (let r = 1; r <= n; r++) E4(e.getLineContent(r), r, t);
		return t;
	}
	function E4(e, t, n) {
		P1.lastIndex = 0;
		const r = P1.exec(e);
		if (r) {
			const i = {
				startLineNumber: t,
				startColumn: r.indices[1][0] + 1,
				endLineNumber: t,
				endColumn: r.indices[1][1] + 1
			};
			if (i.endColumn > i.startColumn) {
				const s = {
					range: i,
					...B1(r[1]),
					shouldBeInComments: !0
				};
				(s.text || s.hasSeparatorLine) && n.push(s);
			}
		}
	}
	function B1(e) {
		e = e.trim();
		const t = e.startsWith("-");
		return e = e.replace(g4, ""), {
			text: e,
			hasSeparatorLine: t
		};
	}
	(function() {
		typeof globalThis.requestIdleCallback != "function" || globalThis.cancelIdleCallback;
	})();
	var V1;
	(function(e) {
		async function t(r) {
			let i;
			const s = await Promise.all(r.map((a) => a.then((o) => o, (o) => {
				i || (i = o);
			})));
			if (typeof i < "u") throw i;
			return s;
		}
		e.settled = t;
		function n(r) {
			return new Promise(async (i, s) => {
				try {
					await r(i, s);
				} catch (a) {
					s(a);
				}
			});
		}
		e.withAsyncBody = n;
	})(V1 || (V1 = {}));
	(class Pt {
		static fromArray(t) {
			return new Pt((n) => {
				n.emitMany(t);
			});
		}
		static fromPromise(t) {
			return new Pt(async (n) => {
				n.emitMany(await t);
			});
		}
		static fromPromises(t) {
			return new Pt(async (n) => {
				await Promise.all(t.map(async (r) => n.emitOne(await r)));
			});
		}
		static merge(t) {
			return new Pt(async (n) => {
				await Promise.all(t.map(async (r) => {
					for await (const i of r) n.emitOne(i);
				}));
			});
		}
		static {
			this.EMPTY = Pt.fromArray([]);
		}
		constructor(t, n) {
			this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new Bt(), queueMicrotask(async () => {
				const r = {
					emitOne: (i) => this.emitOne(i),
					emitMany: (i) => this.emitMany(i),
					reject: (i) => this.reject(i)
				};
				try {
					await Promise.resolve(t(r)), this.resolve();
				} catch (i) {
					this.reject(i);
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
						await qi.toPromise(this._onStateChanged.event);
					} while (!0);
				},
				return: async () => (this._onReturn?.(), {
					done: !0,
					value: void 0
				})
			};
		}
		static map(t, n) {
			return new Pt(async (r) => {
				for await (const i of t) r.emitOne(n(i));
			});
		}
		map(t) {
			return Pt.map(this, t);
		}
		static filter(t, n) {
			return new Pt(async (r) => {
				for await (const i of t) n(i) && r.emitOne(i);
			});
		}
		filter(t) {
			return Pt.filter(this, t);
		}
		static coalesce(t) {
			return Pt.filter(t, (n) => !!n);
		}
		coalesce() {
			return Pt.coalesce(this);
		}
		static async toPromise(t) {
			const n = [];
			for await (const r of t) n.push(r);
			return n;
		}
		toPromise() {
			return Pt.toPromise(this);
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
	var _4 = class {
		constructor(e) {
			this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
		}
		insertValues(e, t) {
			e = Sr(e);
			const n = this.values, r = this.prefixSum, i = t.length;
			return i === 0 ? !1 : (this.values = new Uint32Array(n.length + i), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e), e + i), this.values.set(t, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		setValue(e, t) {
			return e = Sr(e), t = Sr(t), this.values[e] === t ? !1 : (this.values[e] = t, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
		}
		removeValues(e, t) {
			e = Sr(e), t = Sr(t);
			const n = this.values, r = this.prefixSum;
			if (e >= n.length) return !1;
			const i = n.length - e;
			return t >= i && (t = i), t === 0 ? !1 : (this.values = new Uint32Array(n.length - t), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e + t), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		getTotalSum() {
			return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
		}
		getPrefixSum(e) {
			return e < 0 ? 0 : (e = Sr(e), this._getPrefixSum(e));
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
			let t = 0, n = this.values.length - 1, r = 0, i = 0, s = 0;
			for (; t <= n;) if (r = t + (n - t) / 2 | 0, i = this.prefixSum[r], s = i - this.values[r], e < s) n = r - 1;
			else if (e >= i) t = r + 1;
			else break;
			return new N4(r, e - s);
		}
	}, N4 = class {
		constructor(e, t) {
			this.index = e, this.remainder = t, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = t;
		}
	}, T4 = class {
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
			for (const n of t) this._acceptDeleteRange(n.range), this._acceptInsertText(new $e(n.range.startLineNumber, n.range.startColumn), n.text);
			this._versionId = e.versionId, this._cachedTextValue = null;
		}
		_ensureLineStarts() {
			if (!this._lineStarts) {
				const e = this._eol.length, t = this._lines.length, n = new Uint32Array(t);
				for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
				this._lineStarts = new _4(n);
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
			const n = sm(t);
			if (n.length === 1) {
				this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
				return;
			}
			n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]);
			const r = new Uint32Array(n.length - 1);
			for (let i = 1; i < n.length; i++) this._lines.splice(e.lineNumber + i - 1, 0, n[i]), r[i - 1] = n[i].length + this._eol.length;
			this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
		}
	}, S4 = class {
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
			this._models[e.url] = new F4(an.parse(e.url), e.lines, e.EOL, e.versionId);
		}
		$acceptModelChanged(e, t) {
			this._models[e] && this._models[e].onEvents(t);
		}
		$acceptRemovedModel(e) {
			this._models[e] && delete this._models[e];
		}
	}, F4 = class extends T4 {
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
				const r = this._lines[n], i = this.offsetAt(new $e(n + 1, 1)), s = r.matchAll(e);
				for (const a of s) (a.index || a.index === 0) && (a.index = a.index + i), t.push(a);
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
			const n = Qa(e.column, d1(t), this._lines[e.lineNumber - 1], 0);
			return n ? new Ee(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
		}
		words(e) {
			const t = this._lines, n = this._wordenize.bind(this);
			let r = 0, i = "", s = 0, a = [];
			return { *[Symbol.iterator]() {
				for (;;) if (s < a.length) {
					const o = i.substring(a[s].start, a[s].end);
					s += 1, yield o;
				} else if (r < t.length) i = t[r], a = n(i, e), s = 0, r += 1;
				else break;
			} };
		}
		getLineWords(e, t) {
			const n = this._lines[e - 1], r = this._wordenize(n, t), i = [];
			for (const s of r) i.push({
				word: n.substring(s.start, s.end),
				startColumn: s.start + 1,
				endColumn: s.end + 1
			});
			return i;
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
			const t = this._eol, n = e.startLineNumber - 1, r = e.endLineNumber - 1, i = [];
			i.push(this._lines[n].substring(e.startColumn - 1));
			for (let s = n + 1; s < r; s++) i.push(this._lines[s]);
			return i.push(this._lines[r].substring(0, e.endColumn - 1)), i.join(t);
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
			if (!$e.isIPosition(e)) throw new Error("bad position");
			let { lineNumber: t, column: n } = e, r = !1;
			if (t < 1) t = 1, n = 1, r = !0;
			else if (t > this._lines.length) t = this._lines.length, n = this._lines[t - 1].length + 1, r = !0;
			else {
				const i = this._lines[t - 1].length + 1;
				n < 1 ? (n = 1, r = !0) : n > i && (n = i, r = !0);
			}
			return r ? {
				lineNumber: t,
				column: n
			} : e;
		}
	}, A4 = class {
		constructor() {
			this._workerTextModelSyncServer = new S4();
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
			return r ? Lg.computeUnicodeHighlights(r, t, n) : {
				ranges: [],
				hasMore: !1,
				ambiguousCharacterCount: 0,
				invisibleCharacterCount: 0,
				nonBasicAsciiCharacterCount: 0
			};
		}
		async $findSectionHeaders(e, t) {
			const n = this._getModel(e);
			return n ? D4(n, t) : [];
		}
		async $computeDiff(e, t, n, r) {
			const i = this._getModel(e), s = this._getModel(t);
			return !i || !s ? null : as.computeDiff(i, s, n, r);
		}
		static computeDiff(e, t, n, r) {
			const i = r === "advanced" ? k1.getDefault() : k1.getLegacy(), s = e.getLinesContent(), a = t.getLinesContent(), o = i.computeDiff(s, a, n), u = o.changes.length > 0 ? !1 : this._modelsAreIdentical(e, t);
			function l(c) {
				return c.map((d) => [
					d.original.startLineNumber,
					d.original.endLineNumberExclusive,
					d.modified.startLineNumber,
					d.modified.endLineNumberExclusive,
					d.innerChanges?.map((m) => [
						m.originalRange.startLineNumber,
						m.originalRange.startColumn,
						m.originalRange.endLineNumber,
						m.originalRange.endColumn,
						m.modifiedRange.startLineNumber,
						m.modifiedRange.startColumn,
						m.modifiedRange.endLineNumber,
						m.modifiedRange.endColumn
					])
				]);
			}
			return {
				identical: u,
				quitEarly: o.hitTimeout,
				changes: l(o.changes),
				moves: o.moves.map((c) => [
					c.lineRangeMapping.original.startLineNumber,
					c.lineRangeMapping.original.endLineNumberExclusive,
					c.lineRangeMapping.modified.startLineNumber,
					c.lineRangeMapping.modified.endLineNumberExclusive,
					l(c.changes)
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
			const i = [];
			let s;
			t = t.slice(0).sort((o, u) => o.range && u.range ? Ee.compareRangesUsingStarts(o.range, u.range) : (o.range ? 0 : 1) - (u.range ? 0 : 1));
			let a = 0;
			for (let o = 1; o < t.length; o++) Ee.getEndPosition(t[a].range).equals(Ee.getStartPosition(t[o].range)) ? (t[a].range = Ee.fromPositions(Ee.getStartPosition(t[a].range), Ee.getEndPosition(t[o].range)), t[a].text += t[o].text) : (a++, t[a] = t[o]);
			t.length = a + 1;
			for (let { range: o, text: u, eol: l } of t) {
				if (typeof l == "number" && (s = l), Ee.isEmpty(o) && !u) continue;
				const c = r.getValueInRange(o);
				if (u = u.replace(/\r\n|\n|\r/g, r.eol), c === u) continue;
				if (Math.max(u.length, c.length) > as._diffLimit) {
					i.push({
						range: o,
						text: u
					});
					continue;
				}
				const d = Hm(c, u, n), m = r.offsetAt(Ee.lift(o).getStartPosition());
				for (const p of d) {
					const g = r.positionAt(m + p.originalStart), v = r.positionAt(m + p.originalStart + p.originalLength), F = {
						text: u.substr(p.modifiedStart, p.modifiedLength),
						range: {
							startLineNumber: g.lineNumber,
							startColumn: g.column,
							endLineNumber: v.lineNumber,
							endColumn: v.column
						}
					};
					r.getValueInRange(F.range) !== F.text && i.push(F);
				}
			}
			return typeof s == "number" && i.push({
				eol: s,
				text: "",
				range: {
					startLineNumber: 0,
					startColumn: 0,
					endLineNumber: 0,
					endColumn: 0
				}
			}), i;
		}
		async $computeLinks(e) {
			const t = this._getModel(e);
			return t ? Qm(t) : null;
		}
		async $computeDefaultDocumentColors(e) {
			const t = this._getModel(e);
			return t ? m4(t) : null;
		}
		static {
			this._suggestionsLimit = 1e4;
		}
		async $textualSuggest(e, t, n, r) {
			const i = new Cl(), s = new RegExp(n, r), a = /* @__PURE__ */ new Set();
			e: for (const o of e) {
				const u = this._getModel(o);
				if (u) {
					for (const l of u.words(s)) if (!(l === t || !isNaN(Number(l))) && (a.add(l), a.size > as._suggestionsLimit)) break e;
				}
			}
			return {
				words: Array.from(a),
				duration: i.elapsed()
			};
		}
		async $computeWordRanges(e, t, n, r) {
			const i = this._getModel(e);
			if (!i) return Object.create(null);
			const s = new RegExp(n, r), a = Object.create(null);
			for (let o = t.startLineNumber; o < t.endLineNumber; o++) {
				const u = i.getLineWords(o, s);
				for (const l of u) {
					if (!isNaN(Number(l.word))) continue;
					let c = a[l.word];
					c || (c = [], a[l.word] = c), c.push({
						startLineNumber: o,
						startColumn: l.startColumn,
						endLineNumber: o,
						endColumn: l.endColumn
					});
				}
			}
			return a;
		}
		async $navigateValueSet(e, t, n, r, i) {
			const s = this._getModel(e);
			if (!s) return null;
			const a = new RegExp(r, i);
			t.startColumn === t.endColumn && (t = {
				startLineNumber: t.startLineNumber,
				startColumn: t.startColumn,
				endLineNumber: t.endLineNumber,
				endColumn: t.endColumn + 1
			});
			const o = s.getValueInRange(t), u = s.getWordAtPosition({
				lineNumber: t.startLineNumber,
				column: t.startColumn
			}, a);
			if (!u) return null;
			const l = s.getValueInRange(u);
			return Zm.INSTANCE.navigateValueSet(t, o, u, l, n);
		}
	}, as = class extends A4 {
		constructor(e, t) {
			super(), this._host = e, this._foreignModuleFactory = t, this._foreignModule = null;
		}
		async $ping() {
			return "pong";
		}
		$loadForeignModule(e, t, n) {
			const i = {
				host: _g(n, (s, a) => this._host.$fhr(s, a)),
				getMirrorModels: () => this._getModels()
			};
			return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(i, t), Promise.resolve(a1(this._foreignModule))) : new Promise((s, a) => {
				const o = (u) => {
					this._foreignModule = u.create(i, t), s(a1(this._foreignModule));
				};
				import(`${jl.asBrowserUri(`${e}.js`).toString(!0)}`).then(o).catch(a);
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
	typeof importScripts == "function" && (globalThis.monaco = hg());
	let lo = !1;
	function $1(e) {
		if (lo) return;
		lo = !0;
		const t = new Um((n) => {
			globalThis.postMessage(n);
		}, (n) => new as(pg.getChannel(n), e));
		globalThis.onmessage = (n) => {
			t.onmessage(n.data);
		};
	}
	globalThis.onmessage = (e) => {
		lo || $1(null);
	};
	function _e(e, t) {
		if (!e) throw new Error(t);
	}
	function _n(e) {
		return typeof e == "object" && e !== null;
	}
	function St(e, t) {
		if (!e) throw new Error(t ?? "Unexpected invariant triggered.");
	}
	const C4 = /\r\n|[\n\r]/g;
	function co(e, t) {
		let n = 0, r = 1;
		for (const i of e.body.matchAll(C4)) {
			if (typeof i.index == "number" || St(!1), i.index >= t) break;
			n = i.index + i[0].length, r += 1;
		}
		return {
			line: r,
			column: t + 1 - n
		};
	}
	function w4(e) {
		return U1(e.source, co(e.source, e.start));
	}
	function U1(e, t) {
		const n = e.locationOffset.column - 1, r = "".padStart(n) + e.body, i = t.line - 1, s = e.locationOffset.line - 1, a = t.line + s, o = t.line === 1 ? n : 0, u = t.column + o, l = `${e.name}:${a}:${u}
`, c = r.split(/\r\n|[\n\r]/g), d = c[i];
		if (d.length > 120) {
			const m = Math.floor(u / 80), p = u % 80, g = [];
			for (let v = 0; v < d.length; v += 80) g.push(d.slice(v, v + 80));
			return l + j1([
				[`${a} |`, g[0]],
				...g.slice(1, m + 1).map((v) => ["|", v]),
				["|", "^".padStart(p)],
				["|", g[m + 1]]
			]);
		}
		return l + j1([
			[`${a - 1} |`, c[i - 1]],
			[`${a} |`, d],
			["|", "^".padStart(u)],
			[`${a + 1} |`, c[i + 1]]
		]);
	}
	function j1(e) {
		const t = e.filter(([r, i]) => i !== void 0), n = Math.max(...t.map(([r]) => r.length));
		return t.map(([r, i]) => r.padStart(n) + (i ? " " + i : "")).join(`
`);
	}
	function I4(e) {
		const t = e[0];
		return t == null || "kind" in t || "length" in t ? {
			nodes: t,
			source: e[1],
			positions: e[2],
			path: e[3],
			originalError: e[4],
			extensions: e[5]
		} : t;
	}
	var H = class g2 extends Error {
		constructor(t, ...n) {
			var r, i, s;
			const { nodes: a, source: o, positions: u, path: l, originalError: c, extensions: d } = I4(n);
			super(t), this.name = "GraphQLError", this.path = l ?? void 0, this.originalError = c ?? void 0, this.nodes = q1(Array.isArray(a) ? a : a ? [a] : void 0);
			const m = q1((r = this.nodes) === null || r === void 0 ? void 0 : r.map((g) => g.loc).filter((g) => g != null));
			this.source = o ?? (m == null || (i = m[0]) === null || i === void 0 ? void 0 : i.source), this.positions = u ?? m?.map((g) => g.start), this.locations = u && o ? u.map((g) => co(o, g)) : m?.map((g) => co(g.source, g.start));
			const p = _n(c?.extensions) ? c?.extensions : void 0;
			this.extensions = (s = d ?? p) !== null && s !== void 0 ? s : Object.create(null), Object.defineProperties(this, {
				message: {
					writable: !0,
					enumerable: !0
				},
				name: { enumerable: !1 },
				nodes: { enumerable: !1 },
				source: { enumerable: !1 },
				positions: { enumerable: !1 },
				originalError: { enumerable: !1 }
			}), c != null && c.stack ? Object.defineProperty(this, "stack", {
				value: c.stack,
				writable: !0,
				configurable: !0
			}) : Error.captureStackTrace ? Error.captureStackTrace(this, g2) : Object.defineProperty(this, "stack", {
				value: Error().stack,
				writable: !0,
				configurable: !0
			});
		}
		get [Symbol.toStringTag]() {
			return "GraphQLError";
		}
		toString() {
			let t = this.message;
			if (this.nodes) for (const n of this.nodes) n.loc && (t += `

` + w4(n.loc));
			else if (this.source && this.locations) for (const n of this.locations) t += `

` + U1(this.source, n);
			return t;
		}
		toJSON() {
			const t = { message: this.message };
			return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
		}
	};
	function q1(e) {
		return e === void 0 || e.length === 0 ? void 0 : e;
	}
	function ut(e, t, n) {
		return new H(`Syntax Error: ${n}`, {
			source: e,
			positions: [t]
		});
	}
	var L4 = class {
		constructor(e, t, n) {
			this.start = e.start, this.end = t.end, this.startToken = e, this.endToken = t, this.source = n;
		}
		get [Symbol.toStringTag]() {
			return "Location";
		}
		toJSON() {
			return {
				start: this.start,
				end: this.end
			};
		}
	}, H1 = class {
		constructor(e, t, n, r, i, s) {
			this.kind = e, this.start = t, this.end = n, this.line = r, this.column = i, this.value = s, this.prev = null, this.next = null;
		}
		get [Symbol.toStringTag]() {
			return "Token";
		}
		toJSON() {
			return {
				kind: this.kind,
				value: this.value,
				line: this.line,
				column: this.column
			};
		}
	};
	const G1 = {
		Name: [],
		Document: ["definitions"],
		OperationDefinition: [
			"name",
			"variableDefinitions",
			"directives",
			"selectionSet"
		],
		VariableDefinition: [
			"variable",
			"type",
			"defaultValue",
			"directives"
		],
		Variable: ["name"],
		SelectionSet: ["selections"],
		Field: [
			"alias",
			"name",
			"arguments",
			"directives",
			"selectionSet"
		],
		Argument: ["name", "value"],
		FragmentSpread: ["name", "directives"],
		InlineFragment: [
			"typeCondition",
			"directives",
			"selectionSet"
		],
		FragmentDefinition: [
			"name",
			"variableDefinitions",
			"typeCondition",
			"directives",
			"selectionSet"
		],
		IntValue: [],
		FloatValue: [],
		StringValue: [],
		BooleanValue: [],
		NullValue: [],
		EnumValue: [],
		ListValue: ["values"],
		ObjectValue: ["fields"],
		ObjectField: ["name", "value"],
		Directive: ["name", "arguments"],
		NamedType: ["name"],
		ListType: ["type"],
		NonNullType: ["type"],
		SchemaDefinition: [
			"description",
			"directives",
			"operationTypes"
		],
		OperationTypeDefinition: ["type"],
		ScalarTypeDefinition: [
			"description",
			"name",
			"directives"
		],
		ObjectTypeDefinition: [
			"description",
			"name",
			"interfaces",
			"directives",
			"fields"
		],
		FieldDefinition: [
			"description",
			"name",
			"arguments",
			"type",
			"directives"
		],
		InputValueDefinition: [
			"description",
			"name",
			"type",
			"defaultValue",
			"directives"
		],
		InterfaceTypeDefinition: [
			"description",
			"name",
			"interfaces",
			"directives",
			"fields"
		],
		UnionTypeDefinition: [
			"description",
			"name",
			"directives",
			"types"
		],
		EnumTypeDefinition: [
			"description",
			"name",
			"directives",
			"values"
		],
		EnumValueDefinition: [
			"description",
			"name",
			"directives"
		],
		InputObjectTypeDefinition: [
			"description",
			"name",
			"directives",
			"fields"
		],
		DirectiveDefinition: [
			"description",
			"name",
			"arguments",
			"locations"
		],
		SchemaExtension: ["directives", "operationTypes"],
		ScalarTypeExtension: ["name", "directives"],
		ObjectTypeExtension: [
			"name",
			"interfaces",
			"directives",
			"fields"
		],
		InterfaceTypeExtension: [
			"name",
			"interfaces",
			"directives",
			"fields"
		],
		UnionTypeExtension: [
			"name",
			"directives",
			"types"
		],
		EnumTypeExtension: [
			"name",
			"directives",
			"values"
		],
		InputObjectTypeExtension: [
			"name",
			"directives",
			"fields"
		]
	}, R4 = new Set(Object.keys(G1));
	function fo(e) {
		const t = e?.kind;
		return typeof t == "string" && R4.has(t);
	}
	var gt;
	(function(e) {
		e.QUERY = "query", e.MUTATION = "mutation", e.SUBSCRIPTION = "subscription";
	})(gt || (gt = {}));
	var ne;
	(function(e) {
		e.QUERY = "QUERY", e.MUTATION = "MUTATION", e.SUBSCRIPTION = "SUBSCRIPTION", e.FIELD = "FIELD", e.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", e.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", e.INLINE_FRAGMENT = "INLINE_FRAGMENT", e.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", e.SCHEMA = "SCHEMA", e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.FIELD_DEFINITION = "FIELD_DEFINITION", e.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.ENUM_VALUE = "ENUM_VALUE", e.INPUT_OBJECT = "INPUT_OBJECT", e.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
	})(ne || (ne = {}));
	var E;
	(function(e) {
		e.NAME = "Name", e.DOCUMENT = "Document", e.OPERATION_DEFINITION = "OperationDefinition", e.VARIABLE_DEFINITION = "VariableDefinition", e.SELECTION_SET = "SelectionSet", e.FIELD = "Field", e.ARGUMENT = "Argument", e.FRAGMENT_SPREAD = "FragmentSpread", e.INLINE_FRAGMENT = "InlineFragment", e.FRAGMENT_DEFINITION = "FragmentDefinition", e.VARIABLE = "Variable", e.INT = "IntValue", e.FLOAT = "FloatValue", e.STRING = "StringValue", e.BOOLEAN = "BooleanValue", e.NULL = "NullValue", e.ENUM = "EnumValue", e.LIST = "ListValue", e.OBJECT = "ObjectValue", e.OBJECT_FIELD = "ObjectField", e.DIRECTIVE = "Directive", e.NAMED_TYPE = "NamedType", e.LIST_TYPE = "ListType", e.NON_NULL_TYPE = "NonNullType", e.SCHEMA_DEFINITION = "SchemaDefinition", e.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", e.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", e.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", e.FIELD_DEFINITION = "FieldDefinition", e.INPUT_VALUE_DEFINITION = "InputValueDefinition", e.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", e.UNION_TYPE_DEFINITION = "UnionTypeDefinition", e.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", e.ENUM_VALUE_DEFINITION = "EnumValueDefinition", e.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", e.DIRECTIVE_DEFINITION = "DirectiveDefinition", e.SCHEMA_EXTENSION = "SchemaExtension", e.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", e.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", e.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", e.UNION_TYPE_EXTENSION = "UnionTypeExtension", e.ENUM_TYPE_EXTENSION = "EnumTypeExtension", e.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
	})(E || (E = {}));
	function ho(e) {
		return e === 9 || e === 32;
	}
	function li(e) {
		return e >= 48 && e <= 57;
	}
	function W1(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90;
	}
	function po(e) {
		return W1(e) || e === 95;
	}
	function z1(e) {
		return W1(e) || li(e) || e === 95;
	}
	function k4(e) {
		var t;
		let n = Number.MAX_SAFE_INTEGER, r = null, i = -1;
		for (let a = 0; a < e.length; ++a) {
			var s;
			const o = e[a], u = x4(o);
			u !== o.length && (r = (s = r) !== null && s !== void 0 ? s : a, i = a, a !== 0 && u < n && (n = u));
		}
		return e.map((a, o) => o === 0 ? a : a.slice(n)).slice((t = r) !== null && t !== void 0 ? t : 0, i + 1);
	}
	function x4(e) {
		let t = 0;
		for (; t < e.length && ho(e.charCodeAt(t));) ++t;
		return t;
	}
	function O4(e, t) {
		const n = e.replace(/"""/g, "\\\"\"\""), r = n.split(/\r\n|[\n\r]/g), i = r.length === 1, s = r.length > 1 && r.slice(1).every((p) => p.length === 0 || ho(p.charCodeAt(0))), a = n.endsWith("\\\"\"\""), o = e.endsWith("\"") && !a, u = e.endsWith("\\"), l = o || u, c = !(t != null && t.minimize) && (!i || e.length > 70 || l || s || a);
		let d = "";
		const m = i && ho(e.charCodeAt(0));
		return (c && !m || s) && (d += `
`), d += n, (c || l) && (d += `
`), "\"\"\"" + d + "\"\"\"";
	}
	var j;
	(function(e) {
		e.SOF = "<SOF>", e.EOF = "<EOF>", e.BANG = "!", e.DOLLAR = "$", e.AMP = "&", e.PAREN_L = "(", e.PAREN_R = ")", e.SPREAD = "...", e.COLON = ":", e.EQUALS = "=", e.AT = "@", e.BRACKET_L = "[", e.BRACKET_R = "]", e.BRACE_L = "{", e.PIPE = "|", e.BRACE_R = "}", e.NAME = "Name", e.INT = "Int", e.FLOAT = "Float", e.STRING = "String", e.BLOCK_STRING = "BlockString", e.COMMENT = "Comment";
	})(j || (j = {}));
	var M4 = class {
		constructor(e) {
			const t = new H1(j.SOF, 0, 0, 0, 0);
			this.source = e, this.lastToken = t, this.token = t, this.line = 1, this.lineStart = 0;
		}
		get [Symbol.toStringTag]() {
			return "Lexer";
		}
		advance() {
			return this.lastToken = this.token, this.token = this.lookahead();
		}
		lookahead() {
			let e = this.token;
			if (e.kind !== j.EOF) do
				if (e.next) e = e.next;
				else {
					const t = B4(this, e.end);
					e.next = t, t.prev = e, e = t;
				}
			while (e.kind === j.COMMENT);
			return e;
		}
	};
	function P4(e) {
		return e === j.BANG || e === j.DOLLAR || e === j.AMP || e === j.PAREN_L || e === j.PAREN_R || e === j.SPREAD || e === j.COLON || e === j.EQUALS || e === j.AT || e === j.BRACKET_L || e === j.BRACKET_R || e === j.BRACE_L || e === j.PIPE || e === j.BRACE_R;
	}
	function Ir(e) {
		return e >= 0 && e <= 55295 || e >= 57344 && e <= 1114111;
	}
	function os(e, t) {
		return Y1(e.charCodeAt(t)) && J1(e.charCodeAt(t + 1));
	}
	function Y1(e) {
		return e >= 55296 && e <= 56319;
	}
	function J1(e) {
		return e >= 56320 && e <= 57343;
	}
	function nr(e, t) {
		const n = e.source.body.codePointAt(t);
		if (n === void 0) return j.EOF;
		if (n >= 32 && n <= 126) {
			const r = String.fromCodePoint(n);
			return r === "\"" ? `'"'` : `"${r}"`;
		}
		return "U+" + n.toString(16).toUpperCase().padStart(4, "0");
	}
	function We(e, t, n, r, i) {
		const s = e.line;
		return new H1(t, n, r, s, 1 + n - e.lineStart, i);
	}
	function B4(e, t) {
		const n = e.source.body, r = n.length;
		let i = t;
		for (; i < r;) {
			const s = n.charCodeAt(i);
			switch (s) {
				case 65279:
				case 9:
				case 32:
				case 44:
					++i;
					continue;
				case 10:
					++i, ++e.line, e.lineStart = i;
					continue;
				case 13:
					n.charCodeAt(i + 1) === 10 ? i += 2 : ++i, ++e.line, e.lineStart = i;
					continue;
				case 35: return V4(e, i);
				case 33: return We(e, j.BANG, i, i + 1);
				case 36: return We(e, j.DOLLAR, i, i + 1);
				case 38: return We(e, j.AMP, i, i + 1);
				case 40: return We(e, j.PAREN_L, i, i + 1);
				case 41: return We(e, j.PAREN_R, i, i + 1);
				case 46:
					if (n.charCodeAt(i + 1) === 46 && n.charCodeAt(i + 2) === 46) return We(e, j.SPREAD, i, i + 3);
					break;
				case 58: return We(e, j.COLON, i, i + 1);
				case 61: return We(e, j.EQUALS, i, i + 1);
				case 64: return We(e, j.AT, i, i + 1);
				case 91: return We(e, j.BRACKET_L, i, i + 1);
				case 93: return We(e, j.BRACKET_R, i, i + 1);
				case 123: return We(e, j.BRACE_L, i, i + 1);
				case 124: return We(e, j.PIPE, i, i + 1);
				case 125: return We(e, j.BRACE_R, i, i + 1);
				case 34: return n.charCodeAt(i + 1) === 34 && n.charCodeAt(i + 2) === 34 ? G4(e, i) : U4(e, i);
			}
			if (li(s) || s === 45) return $4(e, i, s);
			if (po(s)) return W4(e, i);
			throw ut(e.source, i, s === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Ir(s) || os(n, i) ? `Unexpected character: ${nr(e, i)}.` : `Invalid character: ${nr(e, i)}.`);
		}
		return We(e, j.EOF, r, r);
	}
	function V4(e, t) {
		const n = e.source.body, r = n.length;
		let i = t + 1;
		for (; i < r;) {
			const s = n.charCodeAt(i);
			if (s === 10 || s === 13) break;
			if (Ir(s)) ++i;
			else if (os(n, i)) i += 2;
			else break;
		}
		return We(e, j.COMMENT, t, i, n.slice(t + 1, i));
	}
	function $4(e, t, n) {
		const r = e.source.body;
		let i = t, s = n, a = !1;
		if (s === 45 && (s = r.charCodeAt(++i)), s === 48) {
			if (s = r.charCodeAt(++i), li(s)) throw ut(e.source, i, `Invalid number, unexpected digit after 0: ${nr(e, i)}.`);
		} else i = mo(e, i, s), s = r.charCodeAt(i);
		if (s === 46 && (a = !0, s = r.charCodeAt(++i), i = mo(e, i, s), s = r.charCodeAt(i)), (s === 69 || s === 101) && (a = !0, s = r.charCodeAt(++i), (s === 43 || s === 45) && (s = r.charCodeAt(++i)), i = mo(e, i, s), s = r.charCodeAt(i)), s === 46 || po(s)) throw ut(e.source, i, `Invalid number, expected digit but got: ${nr(e, i)}.`);
		return We(e, a ? j.FLOAT : j.INT, t, i, r.slice(t, i));
	}
	function mo(e, t, n) {
		if (!li(n)) throw ut(e.source, t, `Invalid number, expected digit but got: ${nr(e, t)}.`);
		const r = e.source.body;
		let i = t + 1;
		for (; li(r.charCodeAt(i));) ++i;
		return i;
	}
	function U4(e, t) {
		const n = e.source.body, r = n.length;
		let i = t + 1, s = i, a = "";
		for (; i < r;) {
			const o = n.charCodeAt(i);
			if (o === 34) return a += n.slice(s, i), We(e, j.STRING, t, i + 1, a);
			if (o === 92) {
				a += n.slice(s, i);
				const u = n.charCodeAt(i + 1) === 117 ? n.charCodeAt(i + 2) === 123 ? j4(e, i) : q4(e, i) : H4(e, i);
				a += u.value, i += u.size, s = i;
				continue;
			}
			if (o === 10 || o === 13) break;
			if (Ir(o)) ++i;
			else if (os(n, i)) i += 2;
			else throw ut(e.source, i, `Invalid character within String: ${nr(e, i)}.`);
		}
		throw ut(e.source, i, "Unterminated string.");
	}
	function j4(e, t) {
		const n = e.source.body;
		let r = 0, i = 3;
		for (; i < 12;) {
			const s = n.charCodeAt(t + i++);
			if (s === 125) {
				if (i < 5 || !Ir(r)) break;
				return {
					value: String.fromCodePoint(r),
					size: i
				};
			}
			if (r = r << 4 | ci(s), r < 0) break;
		}
		throw ut(e.source, t, `Invalid Unicode escape sequence: "${n.slice(t, t + i)}".`);
	}
	function q4(e, t) {
		const n = e.source.body, r = X1(n, t + 2);
		if (Ir(r)) return {
			value: String.fromCodePoint(r),
			size: 6
		};
		if (Y1(r) && n.charCodeAt(t + 6) === 92 && n.charCodeAt(t + 7) === 117) {
			const i = X1(n, t + 8);
			if (J1(i)) return {
				value: String.fromCodePoint(r, i),
				size: 12
			};
		}
		throw ut(e.source, t, `Invalid Unicode escape sequence: "${n.slice(t, t + 6)}".`);
	}
	function X1(e, t) {
		return ci(e.charCodeAt(t)) << 12 | ci(e.charCodeAt(t + 1)) << 8 | ci(e.charCodeAt(t + 2)) << 4 | ci(e.charCodeAt(t + 3));
	}
	function ci(e) {
		return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1;
	}
	function H4(e, t) {
		const n = e.source.body;
		switch (n.charCodeAt(t + 1)) {
			case 34: return {
				value: "\"",
				size: 2
			};
			case 92: return {
				value: "\\",
				size: 2
			};
			case 47: return {
				value: "/",
				size: 2
			};
			case 98: return {
				value: "\b",
				size: 2
			};
			case 102: return {
				value: "\f",
				size: 2
			};
			case 110: return {
				value: `
`,
				size: 2
			};
			case 114: return {
				value: "\r",
				size: 2
			};
			case 116: return {
				value: "	",
				size: 2
			};
		}
		throw ut(e.source, t, `Invalid character escape sequence: "${n.slice(t, t + 2)}".`);
	}
	function G4(e, t) {
		const n = e.source.body, r = n.length;
		let i = e.lineStart, s = t + 3, a = s, o = "";
		const u = [];
		for (; s < r;) {
			const l = n.charCodeAt(s);
			if (l === 34 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34) {
				o += n.slice(a, s), u.push(o);
				const c = We(e, j.BLOCK_STRING, t, s + 3, k4(u).join(`
`));
				return e.line += u.length - 1, e.lineStart = i, c;
			}
			if (l === 92 && n.charCodeAt(s + 1) === 34 && n.charCodeAt(s + 2) === 34 && n.charCodeAt(s + 3) === 34) {
				o += n.slice(a, s), a = s + 1, s += 4;
				continue;
			}
			if (l === 10 || l === 13) {
				o += n.slice(a, s), u.push(o), l === 13 && n.charCodeAt(s + 1) === 10 ? s += 2 : ++s, o = "", a = s, i = s;
				continue;
			}
			if (Ir(l)) ++s;
			else if (os(n, s)) s += 2;
			else throw ut(e.source, s, `Invalid character within String: ${nr(e, s)}.`);
		}
		throw ut(e.source, s, "Unterminated string.");
	}
	function W4(e, t) {
		const n = e.source.body, r = n.length;
		let i = t + 1;
		for (; i < r && z1(n.charCodeAt(i));) ++i;
		return We(e, j.NAME, t, i, n.slice(t, i));
	}
	const z4 = 10, Q1 = 2;
	function X(e) {
		return us(e, []);
	}
	function us(e, t) {
		switch (typeof e) {
			case "string": return JSON.stringify(e);
			case "function": return e.name ? `[function ${e.name}]` : "[function]";
			case "object": return Y4(e, t);
			default: return String(e);
		}
	}
	function Y4(e, t) {
		if (e === null) return "null";
		if (t.includes(e)) return "[Circular]";
		const n = [...t, e];
		if (J4(e)) {
			const r = e.toJSON();
			if (r !== e) return typeof r == "string" ? r : us(r, n);
		} else if (Array.isArray(e)) return Q4(e, n);
		return X4(e, n);
	}
	function J4(e) {
		return typeof e.toJSON == "function";
	}
	function X4(e, t) {
		const n = Object.entries(e);
		return n.length === 0 ? "{}" : t.length > Q1 ? "[" + Z4(e) + "]" : "{ " + n.map(([r, i]) => r + ": " + us(i, t)).join(", ") + " }";
	}
	function Q4(e, t) {
		if (e.length === 0) return "[]";
		if (t.length > Q1) return "[Array]";
		const n = Math.min(z4, e.length), r = e.length - n, i = [];
		for (let s = 0; s < n; ++s) i.push(us(e[s], t));
		return r === 1 ? i.push("... 1 more item") : r > 1 && i.push(`... ${r} more items`), "[" + i.join(", ") + "]";
	}
	function Z4(e) {
		const t = Object.prototype.toString.call(e).replace(/^\[object /, "").replace(/]$/, "");
		if (t === "Object" && typeof e.constructor == "function") {
			const n = e.constructor.name;
			if (typeof n == "string" && n !== "") return n;
		}
		return t;
	}
	const Wt = globalThis.process ? function(t, n) {
		return t instanceof n;
	} : function(t, n) {
		if (t instanceof n) return !0;
		if (typeof t == "object" && t !== null) {
			var r;
			const i = n.prototype[Symbol.toStringTag];
			if (i === (Symbol.toStringTag in t ? t[Symbol.toStringTag] : (r = t.constructor) === null || r === void 0 ? void 0 : r.name)) {
				const s = X(t);
				throw new Error(`Cannot use ${i} "${s}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
			}
		}
		return !1;
	};
	var Z1 = class {
		constructor(e, t = "GraphQL request", n = {
			line: 1,
			column: 1
		}) {
			typeof e == "string" || _e(!1, `Body must be a string. Received: ${X(e)}.`), this.body = e, this.name = t, this.locationOffset = n, this.locationOffset.line > 0 || _e(!1, "line in locationOffset is 1-indexed and must be positive."), this.locationOffset.column > 0 || _e(!1, "column in locationOffset is 1-indexed and must be positive.");
		}
		get [Symbol.toStringTag]() {
			return "Source";
		}
	};
	function K4(e) {
		return Wt(e, Z1);
	}
	function ls(e, t) {
		return new K1(e, t).parseDocument();
	}
	function e5(e, t) {
		const n = new K1(e, t);
		n.expectToken(j.SOF);
		const r = n.parseValueLiteral(!1);
		return n.expectToken(j.EOF), r;
	}
	var K1 = class {
		constructor(e, t = {}) {
			const n = K4(e) ? e : new Z1(e);
			this._lexer = new M4(n), this._options = t, this._tokenCounter = 0;
		}
		parseName() {
			const e = this.expectToken(j.NAME);
			return this.node(e, {
				kind: E.NAME,
				value: e.value
			});
		}
		parseDocument() {
			return this.node(this._lexer.token, {
				kind: E.DOCUMENT,
				definitions: this.many(j.SOF, this.parseDefinition, j.EOF)
			});
		}
		parseDefinition() {
			if (this.peek(j.BRACE_L)) return this.parseOperationDefinition();
			const e = this.peekDescription(), t = e ? this._lexer.lookahead() : this._lexer.token;
			if (t.kind === j.NAME) {
				switch (t.value) {
					case "schema": return this.parseSchemaDefinition();
					case "scalar": return this.parseScalarTypeDefinition();
					case "type": return this.parseObjectTypeDefinition();
					case "interface": return this.parseInterfaceTypeDefinition();
					case "union": return this.parseUnionTypeDefinition();
					case "enum": return this.parseEnumTypeDefinition();
					case "input": return this.parseInputObjectTypeDefinition();
					case "directive": return this.parseDirectiveDefinition();
				}
				if (e) throw ut(this._lexer.source, this._lexer.token.start, "Unexpected description, descriptions are supported only on type definitions.");
				switch (t.value) {
					case "query":
					case "mutation":
					case "subscription": return this.parseOperationDefinition();
					case "fragment": return this.parseFragmentDefinition();
					case "extend": return this.parseTypeSystemExtension();
				}
			}
			throw this.unexpected(t);
		}
		parseOperationDefinition() {
			const e = this._lexer.token;
			if (this.peek(j.BRACE_L)) return this.node(e, {
				kind: E.OPERATION_DEFINITION,
				operation: gt.QUERY,
				name: void 0,
				variableDefinitions: [],
				directives: [],
				selectionSet: this.parseSelectionSet()
			});
			const t = this.parseOperationType();
			let n;
			return this.peek(j.NAME) && (n = this.parseName()), this.node(e, {
				kind: E.OPERATION_DEFINITION,
				operation: t,
				name: n,
				variableDefinitions: this.parseVariableDefinitions(),
				directives: this.parseDirectives(!1),
				selectionSet: this.parseSelectionSet()
			});
		}
		parseOperationType() {
			const e = this.expectToken(j.NAME);
			switch (e.value) {
				case "query": return gt.QUERY;
				case "mutation": return gt.MUTATION;
				case "subscription": return gt.SUBSCRIPTION;
			}
			throw this.unexpected(e);
		}
		parseVariableDefinitions() {
			return this.optionalMany(j.PAREN_L, this.parseVariableDefinition, j.PAREN_R);
		}
		parseVariableDefinition() {
			return this.node(this._lexer.token, {
				kind: E.VARIABLE_DEFINITION,
				variable: this.parseVariable(),
				type: (this.expectToken(j.COLON), this.parseTypeReference()),
				defaultValue: this.expectOptionalToken(j.EQUALS) ? this.parseConstValueLiteral() : void 0,
				directives: this.parseConstDirectives()
			});
		}
		parseVariable() {
			const e = this._lexer.token;
			return this.expectToken(j.DOLLAR), this.node(e, {
				kind: E.VARIABLE,
				name: this.parseName()
			});
		}
		parseSelectionSet() {
			return this.node(this._lexer.token, {
				kind: E.SELECTION_SET,
				selections: this.many(j.BRACE_L, this.parseSelection, j.BRACE_R)
			});
		}
		parseSelection() {
			return this.peek(j.SPREAD) ? this.parseFragment() : this.parseField();
		}
		parseField() {
			const e = this._lexer.token, t = this.parseName();
			let n, r;
			return this.expectOptionalToken(j.COLON) ? (n = t, r = this.parseName()) : r = t, this.node(e, {
				kind: E.FIELD,
				alias: n,
				name: r,
				arguments: this.parseArguments(!1),
				directives: this.parseDirectives(!1),
				selectionSet: this.peek(j.BRACE_L) ? this.parseSelectionSet() : void 0
			});
		}
		parseArguments(e) {
			const t = e ? this.parseConstArgument : this.parseArgument;
			return this.optionalMany(j.PAREN_L, t, j.PAREN_R);
		}
		parseArgument(e = !1) {
			const t = this._lexer.token, n = this.parseName();
			return this.expectToken(j.COLON), this.node(t, {
				kind: E.ARGUMENT,
				name: n,
				value: this.parseValueLiteral(e)
			});
		}
		parseConstArgument() {
			return this.parseArgument(!0);
		}
		parseFragment() {
			const e = this._lexer.token;
			this.expectToken(j.SPREAD);
			const t = this.expectOptionalKeyword("on");
			return !t && this.peek(j.NAME) ? this.node(e, {
				kind: E.FRAGMENT_SPREAD,
				name: this.parseFragmentName(),
				directives: this.parseDirectives(!1)
			}) : this.node(e, {
				kind: E.INLINE_FRAGMENT,
				typeCondition: t ? this.parseNamedType() : void 0,
				directives: this.parseDirectives(!1),
				selectionSet: this.parseSelectionSet()
			});
		}
		parseFragmentDefinition() {
			const e = this._lexer.token;
			return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(e, {
				kind: E.FRAGMENT_DEFINITION,
				name: this.parseFragmentName(),
				variableDefinitions: this.parseVariableDefinitions(),
				typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
				directives: this.parseDirectives(!1),
				selectionSet: this.parseSelectionSet()
			}) : this.node(e, {
				kind: E.FRAGMENT_DEFINITION,
				name: this.parseFragmentName(),
				typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
				directives: this.parseDirectives(!1),
				selectionSet: this.parseSelectionSet()
			});
		}
		parseFragmentName() {
			if (this._lexer.token.value === "on") throw this.unexpected();
			return this.parseName();
		}
		parseValueLiteral(e) {
			const t = this._lexer.token;
			switch (t.kind) {
				case j.BRACKET_L: return this.parseList(e);
				case j.BRACE_L: return this.parseObject(e);
				case j.INT: return this.advanceLexer(), this.node(t, {
					kind: E.INT,
					value: t.value
				});
				case j.FLOAT: return this.advanceLexer(), this.node(t, {
					kind: E.FLOAT,
					value: t.value
				});
				case j.STRING:
				case j.BLOCK_STRING: return this.parseStringLiteral();
				case j.NAME: switch (this.advanceLexer(), t.value) {
					case "true": return this.node(t, {
						kind: E.BOOLEAN,
						value: !0
					});
					case "false": return this.node(t, {
						kind: E.BOOLEAN,
						value: !1
					});
					case "null": return this.node(t, { kind: E.NULL });
					default: return this.node(t, {
						kind: E.ENUM,
						value: t.value
					});
				}
				case j.DOLLAR:
					if (e) if (this.expectToken(j.DOLLAR), this._lexer.token.kind === j.NAME) {
						const n = this._lexer.token.value;
						throw ut(this._lexer.source, t.start, `Unexpected variable "$${n}" in constant value.`);
					} else throw this.unexpected(t);
					return this.parseVariable();
				default: throw this.unexpected();
			}
		}
		parseConstValueLiteral() {
			return this.parseValueLiteral(!0);
		}
		parseStringLiteral() {
			const e = this._lexer.token;
			return this.advanceLexer(), this.node(e, {
				kind: E.STRING,
				value: e.value,
				block: e.kind === j.BLOCK_STRING
			});
		}
		parseList(e) {
			const t = () => this.parseValueLiteral(e);
			return this.node(this._lexer.token, {
				kind: E.LIST,
				values: this.any(j.BRACKET_L, t, j.BRACKET_R)
			});
		}
		parseObject(e) {
			const t = () => this.parseObjectField(e);
			return this.node(this._lexer.token, {
				kind: E.OBJECT,
				fields: this.any(j.BRACE_L, t, j.BRACE_R)
			});
		}
		parseObjectField(e) {
			const t = this._lexer.token, n = this.parseName();
			return this.expectToken(j.COLON), this.node(t, {
				kind: E.OBJECT_FIELD,
				name: n,
				value: this.parseValueLiteral(e)
			});
		}
		parseDirectives(e) {
			const t = [];
			for (; this.peek(j.AT);) t.push(this.parseDirective(e));
			return t;
		}
		parseConstDirectives() {
			return this.parseDirectives(!0);
		}
		parseDirective(e) {
			const t = this._lexer.token;
			return this.expectToken(j.AT), this.node(t, {
				kind: E.DIRECTIVE,
				name: this.parseName(),
				arguments: this.parseArguments(e)
			});
		}
		parseTypeReference() {
			const e = this._lexer.token;
			let t;
			if (this.expectOptionalToken(j.BRACKET_L)) {
				const n = this.parseTypeReference();
				this.expectToken(j.BRACKET_R), t = this.node(e, {
					kind: E.LIST_TYPE,
					type: n
				});
			} else t = this.parseNamedType();
			return this.expectOptionalToken(j.BANG) ? this.node(e, {
				kind: E.NON_NULL_TYPE,
				type: t
			}) : t;
		}
		parseNamedType() {
			return this.node(this._lexer.token, {
				kind: E.NAMED_TYPE,
				name: this.parseName()
			});
		}
		peekDescription() {
			return this.peek(j.STRING) || this.peek(j.BLOCK_STRING);
		}
		parseDescription() {
			if (this.peekDescription()) return this.parseStringLiteral();
		}
		parseSchemaDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("schema");
			const n = this.parseConstDirectives(), r = this.many(j.BRACE_L, this.parseOperationTypeDefinition, j.BRACE_R);
			return this.node(e, {
				kind: E.SCHEMA_DEFINITION,
				description: t,
				directives: n,
				operationTypes: r
			});
		}
		parseOperationTypeDefinition() {
			const e = this._lexer.token, t = this.parseOperationType();
			this.expectToken(j.COLON);
			const n = this.parseNamedType();
			return this.node(e, {
				kind: E.OPERATION_TYPE_DEFINITION,
				operation: t,
				type: n
			});
		}
		parseScalarTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("scalar");
			const n = this.parseName(), r = this.parseConstDirectives();
			return this.node(e, {
				kind: E.SCALAR_TYPE_DEFINITION,
				description: t,
				name: n,
				directives: r
			});
		}
		parseObjectTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("type");
			const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
			return this.node(e, {
				kind: E.OBJECT_TYPE_DEFINITION,
				description: t,
				name: n,
				interfaces: r,
				directives: i,
				fields: s
			});
		}
		parseImplementsInterfaces() {
			return this.expectOptionalKeyword("implements") ? this.delimitedMany(j.AMP, this.parseNamedType) : [];
		}
		parseFieldsDefinition() {
			return this.optionalMany(j.BRACE_L, this.parseFieldDefinition, j.BRACE_R);
		}
		parseFieldDefinition() {
			const e = this._lexer.token, t = this.parseDescription(), n = this.parseName(), r = this.parseArgumentDefs();
			this.expectToken(j.COLON);
			const i = this.parseTypeReference(), s = this.parseConstDirectives();
			return this.node(e, {
				kind: E.FIELD_DEFINITION,
				description: t,
				name: n,
				arguments: r,
				type: i,
				directives: s
			});
		}
		parseArgumentDefs() {
			return this.optionalMany(j.PAREN_L, this.parseInputValueDef, j.PAREN_R);
		}
		parseInputValueDef() {
			const e = this._lexer.token, t = this.parseDescription(), n = this.parseName();
			this.expectToken(j.COLON);
			const r = this.parseTypeReference();
			let i;
			this.expectOptionalToken(j.EQUALS) && (i = this.parseConstValueLiteral());
			const s = this.parseConstDirectives();
			return this.node(e, {
				kind: E.INPUT_VALUE_DEFINITION,
				description: t,
				name: n,
				type: r,
				defaultValue: i,
				directives: s
			});
		}
		parseInterfaceTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("interface");
			const n = this.parseName(), r = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), s = this.parseFieldsDefinition();
			return this.node(e, {
				kind: E.INTERFACE_TYPE_DEFINITION,
				description: t,
				name: n,
				interfaces: r,
				directives: i,
				fields: s
			});
		}
		parseUnionTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("union");
			const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
			return this.node(e, {
				kind: E.UNION_TYPE_DEFINITION,
				description: t,
				name: n,
				directives: r,
				types: i
			});
		}
		parseUnionMemberTypes() {
			return this.expectOptionalToken(j.EQUALS) ? this.delimitedMany(j.PIPE, this.parseNamedType) : [];
		}
		parseEnumTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("enum");
			const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
			return this.node(e, {
				kind: E.ENUM_TYPE_DEFINITION,
				description: t,
				name: n,
				directives: r,
				values: i
			});
		}
		parseEnumValuesDefinition() {
			return this.optionalMany(j.BRACE_L, this.parseEnumValueDefinition, j.BRACE_R);
		}
		parseEnumValueDefinition() {
			const e = this._lexer.token, t = this.parseDescription(), n = this.parseEnumValueName(), r = this.parseConstDirectives();
			return this.node(e, {
				kind: E.ENUM_VALUE_DEFINITION,
				description: t,
				name: n,
				directives: r
			});
		}
		parseEnumValueName() {
			if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") throw ut(this._lexer.source, this._lexer.token.start, `${cs(this._lexer.token)} is reserved and cannot be used for an enum value.`);
			return this.parseName();
		}
		parseInputObjectTypeDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("input");
			const n = this.parseName(), r = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
			return this.node(e, {
				kind: E.INPUT_OBJECT_TYPE_DEFINITION,
				description: t,
				name: n,
				directives: r,
				fields: i
			});
		}
		parseInputFieldsDefinition() {
			return this.optionalMany(j.BRACE_L, this.parseInputValueDef, j.BRACE_R);
		}
		parseTypeSystemExtension() {
			const e = this._lexer.lookahead();
			if (e.kind === j.NAME) switch (e.value) {
				case "schema": return this.parseSchemaExtension();
				case "scalar": return this.parseScalarTypeExtension();
				case "type": return this.parseObjectTypeExtension();
				case "interface": return this.parseInterfaceTypeExtension();
				case "union": return this.parseUnionTypeExtension();
				case "enum": return this.parseEnumTypeExtension();
				case "input": return this.parseInputObjectTypeExtension();
			}
			throw this.unexpected(e);
		}
		parseSchemaExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("schema");
			const t = this.parseConstDirectives(), n = this.optionalMany(j.BRACE_L, this.parseOperationTypeDefinition, j.BRACE_R);
			if (t.length === 0 && n.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.SCHEMA_EXTENSION,
				directives: t,
				operationTypes: n
			});
		}
		parseScalarTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("scalar");
			const t = this.parseName(), n = this.parseConstDirectives();
			if (n.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.SCALAR_TYPE_EXTENSION,
				name: t,
				directives: n
			});
		}
		parseObjectTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("type");
			const t = this.parseName(), n = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), i = this.parseFieldsDefinition();
			if (n.length === 0 && r.length === 0 && i.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.OBJECT_TYPE_EXTENSION,
				name: t,
				interfaces: n,
				directives: r,
				fields: i
			});
		}
		parseInterfaceTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("interface");
			const t = this.parseName(), n = this.parseImplementsInterfaces(), r = this.parseConstDirectives(), i = this.parseFieldsDefinition();
			if (n.length === 0 && r.length === 0 && i.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.INTERFACE_TYPE_EXTENSION,
				name: t,
				interfaces: n,
				directives: r,
				fields: i
			});
		}
		parseUnionTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("union");
			const t = this.parseName(), n = this.parseConstDirectives(), r = this.parseUnionMemberTypes();
			if (n.length === 0 && r.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.UNION_TYPE_EXTENSION,
				name: t,
				directives: n,
				types: r
			});
		}
		parseEnumTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("enum");
			const t = this.parseName(), n = this.parseConstDirectives(), r = this.parseEnumValuesDefinition();
			if (n.length === 0 && r.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.ENUM_TYPE_EXTENSION,
				name: t,
				directives: n,
				values: r
			});
		}
		parseInputObjectTypeExtension() {
			const e = this._lexer.token;
			this.expectKeyword("extend"), this.expectKeyword("input");
			const t = this.parseName(), n = this.parseConstDirectives(), r = this.parseInputFieldsDefinition();
			if (n.length === 0 && r.length === 0) throw this.unexpected();
			return this.node(e, {
				kind: E.INPUT_OBJECT_TYPE_EXTENSION,
				name: t,
				directives: n,
				fields: r
			});
		}
		parseDirectiveDefinition() {
			const e = this._lexer.token, t = this.parseDescription();
			this.expectKeyword("directive"), this.expectToken(j.AT);
			const n = this.parseName(), r = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
			this.expectKeyword("on");
			const s = this.parseDirectiveLocations();
			return this.node(e, {
				kind: E.DIRECTIVE_DEFINITION,
				description: t,
				name: n,
				arguments: r,
				repeatable: i,
				locations: s
			});
		}
		parseDirectiveLocations() {
			return this.delimitedMany(j.PIPE, this.parseDirectiveLocation);
		}
		parseDirectiveLocation() {
			const e = this._lexer.token, t = this.parseName();
			if (Object.prototype.hasOwnProperty.call(ne, t.value)) return t;
			throw this.unexpected(e);
		}
		node(e, t) {
			return this._options.noLocation !== !0 && (t.loc = new L4(e, this._lexer.lastToken, this._lexer.source)), t;
		}
		peek(e) {
			return this._lexer.token.kind === e;
		}
		expectToken(e) {
			const t = this._lexer.token;
			if (t.kind === e) return this.advanceLexer(), t;
			throw ut(this._lexer.source, t.start, `Expected ${ef(e)}, found ${cs(t)}.`);
		}
		expectOptionalToken(e) {
			return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
		}
		expectKeyword(e) {
			const t = this._lexer.token;
			if (t.kind === j.NAME && t.value === e) this.advanceLexer();
			else throw ut(this._lexer.source, t.start, `Expected "${e}", found ${cs(t)}.`);
		}
		expectOptionalKeyword(e) {
			const t = this._lexer.token;
			return t.kind === j.NAME && t.value === e ? (this.advanceLexer(), !0) : !1;
		}
		unexpected(e) {
			const t = e ?? this._lexer.token;
			return ut(this._lexer.source, t.start, `Unexpected ${cs(t)}.`);
		}
		any(e, t, n) {
			this.expectToken(e);
			const r = [];
			for (; !this.expectOptionalToken(n);) r.push(t.call(this));
			return r;
		}
		optionalMany(e, t, n) {
			if (this.expectOptionalToken(e)) {
				const r = [];
				do
					r.push(t.call(this));
				while (!this.expectOptionalToken(n));
				return r;
			}
			return [];
		}
		many(e, t, n) {
			this.expectToken(e);
			const r = [];
			do
				r.push(t.call(this));
			while (!this.expectOptionalToken(n));
			return r;
		}
		delimitedMany(e, t) {
			this.expectOptionalToken(e);
			const n = [];
			do
				n.push(t.call(this));
			while (this.expectOptionalToken(e));
			return n;
		}
		advanceLexer() {
			const { maxTokens: e } = this._options, t = this._lexer.advance();
			if (e !== void 0 && t.kind !== j.EOF && (++this._tokenCounter, this._tokenCounter > e)) throw ut(this._lexer.source, t.start, `Document contains more that ${e} tokens. Parsing aborted.`);
		}
	};
	function cs(e) {
		const t = e.value;
		return ef(e.kind) + (t != null ? ` "${t}"` : "");
	}
	function ef(e) {
		return P4(e) ? `"${e}"` : e;
	}
	const t5 = 5;
	function Un(e, t) {
		const [n, r] = t ? [e, t] : [void 0, e];
		let i = " Did you mean ";
		n && (i += n + " ");
		const s = r.map((u) => `"${u}"`);
		switch (s.length) {
			case 0: return "";
			case 1: return i + s[0] + "?";
			case 2: return i + s[0] + " or " + s[1] + "?";
		}
		const a = s.slice(0, t5), o = a.pop();
		return i + a.join(", ") + ", or " + o + "?";
	}
	function tf(e) {
		return e;
	}
	function rr(e, t) {
		const n = Object.create(null);
		for (const r of e) n[t(r)] = r;
		return n;
	}
	function ir(e, t, n) {
		const r = Object.create(null);
		for (const i of e) r[t(i)] = n(i);
		return r;
	}
	function Nn(e, t) {
		const n = Object.create(null);
		for (const r of Object.keys(e)) n[r] = t(e[r], r);
		return n;
	}
	function go(e, t) {
		let n = 0, r = 0;
		for (; n < e.length && r < t.length;) {
			let i = e.charCodeAt(n), s = t.charCodeAt(r);
			if (fs(i) && fs(s)) {
				let a = 0;
				do
					++n, a = a * 10 + i - Do, i = e.charCodeAt(n);
				while (fs(i) && a > 0);
				let o = 0;
				do
					++r, o = o * 10 + s - Do, s = t.charCodeAt(r);
				while (fs(s) && o > 0);
				if (a < o) return -1;
				if (a > o) return 1;
			} else {
				if (i < s) return -1;
				if (i > s) return 1;
				++n, ++r;
			}
		}
		return e.length - t.length;
	}
	const Do = 48, n5 = 57;
	function fs(e) {
		return !isNaN(e) && Do <= e && e <= n5;
	}
	function sr(e, t) {
		const n = Object.create(null), r = new r5(e), i = Math.floor(e.length * .4) + 1;
		for (const s of t) {
			const a = r.measure(s, i);
			a !== void 0 && (n[s] = a);
		}
		return Object.keys(n).sort((s, a) => {
			const o = n[s] - n[a];
			return o !== 0 ? o : go(s, a);
		});
	}
	var r5 = class {
		constructor(e) {
			this._input = e, this._inputLowerCase = e.toLowerCase(), this._inputArray = nf(this._inputLowerCase), this._rows = [
				new Array(e.length + 1).fill(0),
				new Array(e.length + 1).fill(0),
				new Array(e.length + 1).fill(0)
			];
		}
		measure(e, t) {
			if (this._input === e) return 0;
			const n = e.toLowerCase();
			if (this._inputLowerCase === n) return 1;
			let r = nf(n), i = this._inputArray;
			if (r.length < i.length) {
				const l = r;
				r = i, i = l;
			}
			const s = r.length, a = i.length;
			if (s - a > t) return;
			const o = this._rows;
			for (let l = 0; l <= a; l++) o[0][l] = l;
			for (let l = 1; l <= s; l++) {
				const c = o[(l - 1) % 3], d = o[l % 3];
				let m = d[0] = l;
				for (let p = 1; p <= a; p++) {
					const g = r[l - 1] === i[p - 1] ? 0 : 1;
					let v = Math.min(c[p] + 1, d[p - 1] + 1, c[p - 1] + g);
					if (l > 1 && p > 1 && r[l - 1] === i[p - 2] && r[l - 2] === i[p - 1]) {
						const F = o[(l - 2) % 3][p - 2];
						v = Math.min(v, F + 1);
					}
					v < m && (m = v), d[p] = v;
				}
				if (m > t) return;
			}
			const u = o[s % 3][a];
			return u <= t ? u : void 0;
		}
	};
	function nf(e) {
		const t = e.length, n = new Array(t);
		for (let r = 0; r < t; ++r) n[r] = e.charCodeAt(r);
		return n;
	}
	function Vt(e) {
		if (e == null) return Object.create(null);
		if (Object.getPrototypeOf(e) === null) return e;
		const t = Object.create(null);
		for (const [n, r] of Object.entries(e)) t[n] = r;
		return t;
	}
	function i5(e) {
		return `"${e.replace(s5, a5)}"`;
	}
	const s5 = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
	function a5(e) {
		return o5[e.charCodeAt(0)];
	}
	const o5 = [
		"\\u0000",
		"\\u0001",
		"\\u0002",
		"\\u0003",
		"\\u0004",
		"\\u0005",
		"\\u0006",
		"\\u0007",
		"\\b",
		"\\t",
		"\\n",
		"\\u000B",
		"\\f",
		"\\r",
		"\\u000E",
		"\\u000F",
		"\\u0010",
		"\\u0011",
		"\\u0012",
		"\\u0013",
		"\\u0014",
		"\\u0015",
		"\\u0016",
		"\\u0017",
		"\\u0018",
		"\\u0019",
		"\\u001A",
		"\\u001B",
		"\\u001C",
		"\\u001D",
		"\\u001E",
		"\\u001F",
		"",
		"",
		"\\\"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"\\\\",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"\\u007F",
		"\\u0080",
		"\\u0081",
		"\\u0082",
		"\\u0083",
		"\\u0084",
		"\\u0085",
		"\\u0086",
		"\\u0087",
		"\\u0088",
		"\\u0089",
		"\\u008A",
		"\\u008B",
		"\\u008C",
		"\\u008D",
		"\\u008E",
		"\\u008F",
		"\\u0090",
		"\\u0091",
		"\\u0092",
		"\\u0093",
		"\\u0094",
		"\\u0095",
		"\\u0096",
		"\\u0097",
		"\\u0098",
		"\\u0099",
		"\\u009A",
		"\\u009B",
		"\\u009C",
		"\\u009D",
		"\\u009E",
		"\\u009F"
	], Lr = Object.freeze({});
	function jn(e, t, n = G1) {
		const r = /* @__PURE__ */ new Map();
		for (const S of Object.values(E)) r.set(S, ds(t, S));
		let i, s = Array.isArray(e), a = [e], o = -1, u = [], l = e, c, d;
		const m = [], p = [];
		do {
			o++;
			const S = o === a.length, C = S && u.length !== 0;
			if (S) {
				if (c = p.length === 0 ? void 0 : m[m.length - 1], l = d, d = p.pop(), C) if (s) {
					l = l.slice();
					let T = 0;
					for (const [A, k] of u) {
						const V = A - T;
						k === null ? (l.splice(V, 1), T++) : l[V] = k;
					}
				} else {
					l = Object.defineProperties({}, Object.getOwnPropertyDescriptors(l));
					for (const [T, A] of u) l[T] = A;
				}
				o = i.index, a = i.keys, u = i.edits, s = i.inArray, i = i.prev;
			} else if (d) {
				if (c = s ? o : a[o], l = d[c], l == null) continue;
				m.push(c);
			}
			let w;
			if (!Array.isArray(l)) {
				var g, v;
				fo(l) || _e(!1, `Invalid AST Node: ${X(l)}.`);
				if (w = (S ? (g = r.get(l.kind)) === null || g === void 0 ? void 0 : g.leave : (v = r.get(l.kind)) === null || v === void 0 ? void 0 : v.enter)?.call(t, l, c, d, m, p), w === Lr) break;
				if (w === !1) {
					if (!S) {
						m.pop();
						continue;
					}
				} else if (w !== void 0 && (u.push([c, w]), !S)) if (fo(w)) l = w;
				else {
					m.pop();
					continue;
				}
			}
			if (w === void 0 && C && u.push([c, l]), S) m.pop();
			else {
				var F;
				i = {
					inArray: s,
					index: o,
					keys: a,
					edits: u,
					prev: i
				}, s = Array.isArray(l), a = s ? l : (F = n[l.kind]) !== null && F !== void 0 ? F : [], o = -1, u = [], d && p.push(d), d = l;
			}
		} while (i !== void 0);
		return u.length !== 0 ? u[u.length - 1][1] : e;
	}
	function rf(e) {
		const t = new Array(e.length).fill(null), n = Object.create(null);
		for (const r of Object.values(E)) {
			let i = !1;
			const s = new Array(e.length).fill(void 0), a = new Array(e.length).fill(void 0);
			for (let o = 0; o < e.length; ++o) {
				const { enter: u, leave: l } = ds(e[o], r);
				i || (i = u != null || l != null), s[o] = u, a[o] = l;
			}
			i && (n[r] = {
				enter(...o) {
					const u = o[0];
					for (let c = 0; c < e.length; c++) if (t[c] === null) {
						var l;
						const d = (l = s[c]) === null || l === void 0 ? void 0 : l.apply(e[c], o);
						if (d === !1) t[c] = u;
						else if (d === Lr) t[c] = Lr;
						else if (d !== void 0) return d;
					}
				},
				leave(...o) {
					const u = o[0];
					for (let c = 0; c < e.length; c++) if (t[c] === null) {
						var l;
						const d = (l = a[c]) === null || l === void 0 ? void 0 : l.apply(e[c], o);
						if (d === Lr) t[c] = Lr;
						else if (d !== void 0 && d !== !1) return d;
					} else t[c] === u && (t[c] = null);
				}
			});
		}
		return n;
	}
	function ds(e, t) {
		const n = e[t];
		return typeof n == "object" ? n : typeof n == "function" ? {
			enter: n,
			leave: void 0
		} : {
			enter: e.enter,
			leave: e.leave
		};
	}
	function rt(e) {
		return jn(e, l5);
	}
	const u5 = 80, l5 = {
		Name: { leave: (e) => e.value },
		Variable: { leave: (e) => "$" + e.name },
		Document: { leave: (e) => ie(e.definitions, `

`) },
		OperationDefinition: { leave(e) {
			const t = De("(", ie(e.variableDefinitions, ", "), ")"), n = ie([
				e.operation,
				ie([e.name, t]),
				ie(e.directives, " ")
			], " ");
			return (n === "query" ? "" : n + " ") + e.selectionSet;
		} },
		VariableDefinition: { leave: ({ variable: e, type: t, defaultValue: n, directives: r }) => e + ": " + t + De(" = ", n) + De(" ", ie(r, " ")) },
		SelectionSet: { leave: ({ selections: e }) => zt(e) },
		Field: { leave({ alias: e, name: t, arguments: n, directives: r, selectionSet: i }) {
			const s = De("", e, ": ") + t;
			let a = s + De("(", ie(n, ", "), ")");
			return a.length > u5 && (a = s + De(`(
`, hs(ie(n, `
`)), `
)`)), ie([
				a,
				ie(r, " "),
				i
			], " ");
		} },
		Argument: { leave: ({ name: e, value: t }) => e + ": " + t },
		FragmentSpread: { leave: ({ name: e, directives: t }) => "..." + e + De(" ", ie(t, " ")) },
		InlineFragment: { leave: ({ typeCondition: e, directives: t, selectionSet: n }) => ie([
			"...",
			De("on ", e),
			ie(t, " "),
			n
		], " ") },
		FragmentDefinition: { leave: ({ name: e, typeCondition: t, variableDefinitions: n, directives: r, selectionSet: i }) => `fragment ${e}${De("(", ie(n, ", "), ")")} on ${t} ${De("", ie(r, " "), " ")}` + i },
		IntValue: { leave: ({ value: e }) => e },
		FloatValue: { leave: ({ value: e }) => e },
		StringValue: { leave: ({ value: e, block: t }) => t ? O4(e) : i5(e) },
		BooleanValue: { leave: ({ value: e }) => e ? "true" : "false" },
		NullValue: { leave: () => "null" },
		EnumValue: { leave: ({ value: e }) => e },
		ListValue: { leave: ({ values: e }) => "[" + ie(e, ", ") + "]" },
		ObjectValue: { leave: ({ fields: e }) => "{" + ie(e, ", ") + "}" },
		ObjectField: { leave: ({ name: e, value: t }) => e + ": " + t },
		Directive: { leave: ({ name: e, arguments: t }) => "@" + e + De("(", ie(t, ", "), ")") },
		NamedType: { leave: ({ name: e }) => e },
		ListType: { leave: ({ type: e }) => "[" + e + "]" },
		NonNullType: { leave: ({ type: e }) => e + "!" },
		SchemaDefinition: { leave: ({ description: e, directives: t, operationTypes: n }) => De("", e, `
`) + ie([
			"schema",
			ie(t, " "),
			zt(n)
		], " ") },
		OperationTypeDefinition: { leave: ({ operation: e, type: t }) => e + ": " + t },
		ScalarTypeDefinition: { leave: ({ description: e, name: t, directives: n }) => De("", e, `
`) + ie([
			"scalar",
			t,
			ie(n, " ")
		], " ") },
		ObjectTypeDefinition: { leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => De("", e, `
`) + ie([
			"type",
			t,
			De("implements ", ie(n, " & ")),
			ie(r, " "),
			zt(i)
		], " ") },
		FieldDefinition: { leave: ({ description: e, name: t, arguments: n, type: r, directives: i }) => De("", e, `
`) + t + (sf(n) ? De(`(
`, hs(ie(n, `
`)), `
)`) : De("(", ie(n, ", "), ")")) + ": " + r + De(" ", ie(i, " ")) },
		InputValueDefinition: { leave: ({ description: e, name: t, type: n, defaultValue: r, directives: i }) => De("", e, `
`) + ie([
			t + ": " + n,
			De("= ", r),
			ie(i, " ")
		], " ") },
		InterfaceTypeDefinition: { leave: ({ description: e, name: t, interfaces: n, directives: r, fields: i }) => De("", e, `
`) + ie([
			"interface",
			t,
			De("implements ", ie(n, " & ")),
			ie(r, " "),
			zt(i)
		], " ") },
		UnionTypeDefinition: { leave: ({ description: e, name: t, directives: n, types: r }) => De("", e, `
`) + ie([
			"union",
			t,
			ie(n, " "),
			De("= ", ie(r, " | "))
		], " ") },
		EnumTypeDefinition: { leave: ({ description: e, name: t, directives: n, values: r }) => De("", e, `
`) + ie([
			"enum",
			t,
			ie(n, " "),
			zt(r)
		], " ") },
		EnumValueDefinition: { leave: ({ description: e, name: t, directives: n }) => De("", e, `
`) + ie([t, ie(n, " ")], " ") },
		InputObjectTypeDefinition: { leave: ({ description: e, name: t, directives: n, fields: r }) => De("", e, `
`) + ie([
			"input",
			t,
			ie(n, " "),
			zt(r)
		], " ") },
		DirectiveDefinition: { leave: ({ description: e, name: t, arguments: n, repeatable: r, locations: i }) => De("", e, `
`) + "directive @" + t + (sf(n) ? De(`(
`, hs(ie(n, `
`)), `
)`) : De("(", ie(n, ", "), ")")) + (r ? " repeatable" : "") + " on " + ie(i, " | ") },
		SchemaExtension: { leave: ({ directives: e, operationTypes: t }) => ie([
			"extend schema",
			ie(e, " "),
			zt(t)
		], " ") },
		ScalarTypeExtension: { leave: ({ name: e, directives: t }) => ie([
			"extend scalar",
			e,
			ie(t, " ")
		], " ") },
		ObjectTypeExtension: { leave: ({ name: e, interfaces: t, directives: n, fields: r }) => ie([
			"extend type",
			e,
			De("implements ", ie(t, " & ")),
			ie(n, " "),
			zt(r)
		], " ") },
		InterfaceTypeExtension: { leave: ({ name: e, interfaces: t, directives: n, fields: r }) => ie([
			"extend interface",
			e,
			De("implements ", ie(t, " & ")),
			ie(n, " "),
			zt(r)
		], " ") },
		UnionTypeExtension: { leave: ({ name: e, directives: t, types: n }) => ie([
			"extend union",
			e,
			ie(t, " "),
			De("= ", ie(n, " | "))
		], " ") },
		EnumTypeExtension: { leave: ({ name: e, directives: t, values: n }) => ie([
			"extend enum",
			e,
			ie(t, " "),
			zt(n)
		], " ") },
		InputObjectTypeExtension: { leave: ({ name: e, directives: t, fields: n }) => ie([
			"extend input",
			e,
			ie(t, " "),
			zt(n)
		], " ") }
	};
	function ie(e, t = "") {
		var n;
		return (n = e?.filter((r) => r).join(t)) !== null && n !== void 0 ? n : "";
	}
	function zt(e) {
		return De(`{
`, hs(ie(e, `
`)), `
}`);
	}
	function De(e, t, n = "") {
		return t != null && t !== "" ? e + t + n : "";
	}
	function hs(e) {
		return De("  ", e.replace(/\n/g, `
  `));
	}
	function sf(e) {
		var t;
		return (t = e?.some((n) => n.includes(`
`))) !== null && t !== void 0 ? t : !1;
	}
	function yo(e, t) {
		switch (e.kind) {
			case E.NULL: return null;
			case E.INT: return parseInt(e.value, 10);
			case E.FLOAT: return parseFloat(e.value);
			case E.STRING:
			case E.ENUM:
			case E.BOOLEAN: return e.value;
			case E.LIST: return e.values.map((n) => yo(n, t));
			case E.OBJECT: return ir(e.fields, (n) => n.name.value, (n) => yo(n.value, t));
			case E.VARIABLE: return t?.[e.name.value];
		}
	}
	function Yt(e) {
		if (e ?? _e(!1, "Must provide name."), typeof e == "string" || _e(!1, "Expected name to be a string."), e.length === 0) throw new H("Expected name to be a non-empty string.");
		for (let t = 1; t < e.length; ++t) if (!z1(e.charCodeAt(t))) throw new H(`Names must only contain [_a-zA-Z0-9] but "${e}" does not.`);
		if (!po(e.charCodeAt(0))) throw new H(`Names must start with [_a-zA-Z] but "${e}" does not.`);
		return e;
	}
	function c5(e) {
		if (e === "true" || e === "false" || e === "null") throw new H(`Enum values cannot be named: ${e}`);
		return Yt(e);
	}
	function vo(e) {
		return $t(e) || we(e) || xe(e) || Lt(e) || Dt(e) || ze(e) || Ye(e) || Fe(e);
	}
	function $t(e) {
		return Wt(e, Tn);
	}
	function we(e) {
		return Wt(e, Ut);
	}
	function f5(e) {
		if (!we(e)) throw new Error(`Expected ${X(e)} to be a GraphQL Object type.`);
		return e;
	}
	function xe(e) {
		return Wt(e, qn);
	}
	function d5(e) {
		if (!xe(e)) throw new Error(`Expected ${X(e)} to be a GraphQL Interface type.`);
		return e;
	}
	function Lt(e) {
		return Wt(e, ps);
	}
	function Dt(e) {
		return Wt(e, Hn);
	}
	function ze(e) {
		return Wt(e, di);
	}
	function Ye(e) {
		return Wt(e, ct);
	}
	function Fe(e) {
		return Wt(e, me);
	}
	function Rt(e) {
		return $t(e) || Dt(e) || ze(e) || Eo(e) && Rt(e.ofType);
	}
	function ar(e) {
		return $t(e) || we(e) || xe(e) || Lt(e) || Dt(e) || Eo(e) && ar(e.ofType);
	}
	function Rr(e) {
		return $t(e) || Dt(e);
	}
	function kt(e) {
		return we(e) || xe(e) || Lt(e);
	}
	function on(e) {
		return xe(e) || Lt(e);
	}
	function h5(e) {
		if (!on(e)) throw new Error(`Expected ${X(e)} to be a GraphQL abstract type.`);
		return e;
	}
	var ct = class {
		constructor(e) {
			vo(e) || _e(!1, `Expected ${X(e)} to be a GraphQL type.`), this.ofType = e;
		}
		get [Symbol.toStringTag]() {
			return "GraphQLList";
		}
		toString() {
			return "[" + String(this.ofType) + "]";
		}
		toJSON() {
			return this.toString();
		}
	}, me = class {
		constructor(e) {
			af(e) || _e(!1, `Expected ${X(e)} to be a GraphQL nullable type.`), this.ofType = e;
		}
		get [Symbol.toStringTag]() {
			return "GraphQLNonNull";
		}
		toString() {
			return String(this.ofType) + "!";
		}
		toJSON() {
			return this.toString();
		}
	};
	function Eo(e) {
		return Ye(e) || Fe(e);
	}
	function af(e) {
		return vo(e) && !Fe(e);
	}
	function p5(e) {
		if (!af(e)) throw new Error(`Expected ${X(e)} to be a GraphQL nullable type.`);
		return e;
	}
	function bo(e) {
		if (e) return Fe(e) ? e.ofType : e;
	}
	function m5(e) {
		return $t(e) || we(e) || xe(e) || Lt(e) || Dt(e) || ze(e);
	}
	function je(e) {
		if (e) {
			let t = e;
			for (; Eo(t);) t = t.ofType;
			return t;
		}
	}
	function of(e) {
		return typeof e == "function" ? e() : e;
	}
	function uf(e) {
		return typeof e == "function" ? e() : e;
	}
	var Tn = class {
		constructor(e) {
			var t, n, r, i;
			const s = (t = e.parseValue) !== null && t !== void 0 ? t : tf;
			this.name = Yt(e.name), this.description = e.description, this.specifiedByURL = e.specifiedByURL, this.serialize = (n = e.serialize) !== null && n !== void 0 ? n : tf, this.parseValue = s, this.parseLiteral = (r = e.parseLiteral) !== null && r !== void 0 ? r : (a, o) => s(yo(a, o)), this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (i = e.extensionASTNodes) !== null && i !== void 0 ? i : [], e.specifiedByURL == null || typeof e.specifiedByURL == "string" || _e(!1, `${this.name} must provide "specifiedByURL" as a string, but got: ${X(e.specifiedByURL)}.`), e.serialize == null || typeof e.serialize == "function" || _e(!1, `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`), e.parseLiteral && (typeof e.parseValue == "function" && typeof e.parseLiteral == "function" || _e(!1, `${this.name} must provide both "parseValue" and "parseLiteral" functions.`));
		}
		get [Symbol.toStringTag]() {
			return "GraphQLScalarType";
		}
		toConfig() {
			return {
				name: this.name,
				description: this.description,
				specifiedByURL: this.specifiedByURL,
				serialize: this.serialize,
				parseValue: this.parseValue,
				parseLiteral: this.parseLiteral,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	}, Ut = class {
		constructor(e) {
			var t;
			this.name = Yt(e.name), this.description = e.description, this.isTypeOf = e.isTypeOf, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._fields = () => cf(e), this._interfaces = () => lf(e), e.isTypeOf == null || typeof e.isTypeOf == "function" || _e(!1, `${this.name} must provide "isTypeOf" as a function, but got: ${X(e.isTypeOf)}.`);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLObjectType";
		}
		getFields() {
			return typeof this._fields == "function" && (this._fields = this._fields()), this._fields;
		}
		getInterfaces() {
			return typeof this._interfaces == "function" && (this._interfaces = this._interfaces()), this._interfaces;
		}
		toConfig() {
			return {
				name: this.name,
				description: this.description,
				interfaces: this.getInterfaces(),
				fields: df(this.getFields()),
				isTypeOf: this.isTypeOf,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	};
	function lf(e) {
		var t;
		const n = of((t = e.interfaces) !== null && t !== void 0 ? t : []);
		return Array.isArray(n) || _e(!1, `${e.name} interfaces must be an Array or a function which returns an Array.`), n;
	}
	function cf(e) {
		const t = uf(e.fields);
		return kr(t) || _e(!1, `${e.name} fields must be an object with field names as keys or a function which returns such an object.`), Nn(t, (n, r) => {
			var i;
			kr(n) || _e(!1, `${e.name}.${r} field config must be an object.`), n.resolve == null || typeof n.resolve == "function" || _e(!1, `${e.name}.${r} field resolver must be a function if provided, but got: ${X(n.resolve)}.`);
			const s = (i = n.args) !== null && i !== void 0 ? i : {};
			return kr(s) || _e(!1, `${e.name}.${r} args must be an object with argument names as keys.`), {
				name: Yt(r),
				description: n.description,
				type: n.type,
				args: ff(s),
				resolve: n.resolve,
				subscribe: n.subscribe,
				deprecationReason: n.deprecationReason,
				extensions: Vt(n.extensions),
				astNode: n.astNode
			};
		});
	}
	function ff(e) {
		return Object.entries(e).map(([t, n]) => ({
			name: Yt(t),
			description: n.description,
			type: n.type,
			defaultValue: n.defaultValue,
			deprecationReason: n.deprecationReason,
			extensions: Vt(n.extensions),
			astNode: n.astNode
		}));
	}
	function kr(e) {
		return _n(e) && !Array.isArray(e);
	}
	function df(e) {
		return Nn(e, (t) => ({
			description: t.description,
			type: t.type,
			args: hf(t.args),
			resolve: t.resolve,
			subscribe: t.subscribe,
			deprecationReason: t.deprecationReason,
			extensions: t.extensions,
			astNode: t.astNode
		}));
	}
	function hf(e) {
		return ir(e, (t) => t.name, (t) => ({
			description: t.description,
			type: t.type,
			defaultValue: t.defaultValue,
			deprecationReason: t.deprecationReason,
			extensions: t.extensions,
			astNode: t.astNode
		}));
	}
	function fi(e) {
		return Fe(e.type) && e.defaultValue === void 0;
	}
	var qn = class {
		constructor(e) {
			var t;
			this.name = Yt(e.name), this.description = e.description, this.resolveType = e.resolveType, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._fields = cf.bind(void 0, e), this._interfaces = lf.bind(void 0, e), e.resolveType == null || typeof e.resolveType == "function" || _e(!1, `${this.name} must provide "resolveType" as a function, but got: ${X(e.resolveType)}.`);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLInterfaceType";
		}
		getFields() {
			return typeof this._fields == "function" && (this._fields = this._fields()), this._fields;
		}
		getInterfaces() {
			return typeof this._interfaces == "function" && (this._interfaces = this._interfaces()), this._interfaces;
		}
		toConfig() {
			return {
				name: this.name,
				description: this.description,
				interfaces: this.getInterfaces(),
				fields: df(this.getFields()),
				resolveType: this.resolveType,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	}, ps = class {
		constructor(e) {
			var t;
			this.name = Yt(e.name), this.description = e.description, this.resolveType = e.resolveType, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._types = g5.bind(void 0, e), e.resolveType == null || typeof e.resolveType == "function" || _e(!1, `${this.name} must provide "resolveType" as a function, but got: ${X(e.resolveType)}.`);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLUnionType";
		}
		getTypes() {
			return typeof this._types == "function" && (this._types = this._types()), this._types;
		}
		toConfig() {
			return {
				name: this.name,
				description: this.description,
				types: this.getTypes(),
				resolveType: this.resolveType,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	};
	function g5(e) {
		const t = of(e.types);
		return Array.isArray(t) || _e(!1, `Must provide Array of types or a function which returns such an array for Union ${e.name}.`), t;
	}
	var Hn = class {
		constructor(e) {
			var t;
			this.name = Yt(e.name), this.description = e.description, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._values = D5(this.name, e.values), this._valueLookup = new Map(this._values.map((n) => [n.value, n])), this._nameLookup = rr(this._values, (n) => n.name);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLEnumType";
		}
		getValues() {
			return this._values;
		}
		getValue(e) {
			return this._nameLookup[e];
		}
		serialize(e) {
			const t = this._valueLookup.get(e);
			if (t === void 0) throw new H(`Enum "${this.name}" cannot represent value: ${X(e)}`);
			return t.name;
		}
		parseValue(e) {
			if (typeof e != "string") {
				const n = X(e);
				throw new H(`Enum "${this.name}" cannot represent non-string value: ${n}.` + ms(this, n));
			}
			const t = this.getValue(e);
			if (t == null) throw new H(`Value "${e}" does not exist in "${this.name}" enum.` + ms(this, e));
			return t.value;
		}
		parseLiteral(e, t) {
			if (e.kind !== E.ENUM) {
				const r = rt(e);
				throw new H(`Enum "${this.name}" cannot represent non-enum value: ${r}.` + ms(this, r), { nodes: e });
			}
			const n = this.getValue(e.value);
			if (n == null) {
				const r = rt(e);
				throw new H(`Value "${r}" does not exist in "${this.name}" enum.` + ms(this, r), { nodes: e });
			}
			return n.value;
		}
		toConfig() {
			const e = ir(this.getValues(), (t) => t.name, (t) => ({
				description: t.description,
				value: t.value,
				deprecationReason: t.deprecationReason,
				extensions: t.extensions,
				astNode: t.astNode
			}));
			return {
				name: this.name,
				description: this.description,
				values: e,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	};
	function ms(e, t) {
		return Un("the enum value", sr(t, e.getValues().map((n) => n.name)));
	}
	function D5(e, t) {
		return kr(t) || _e(!1, `${e} values must be an object with value names as keys.`), Object.entries(t).map(([n, r]) => (kr(r) || _e(!1, `${e}.${n} must refer to an object with a "value" key representing an internal value but got: ${X(r)}.`), {
			name: c5(n),
			description: r.description,
			value: r.value !== void 0 ? r.value : n,
			deprecationReason: r.deprecationReason,
			extensions: Vt(r.extensions),
			astNode: r.astNode
		}));
	}
	var di = class {
		constructor(e) {
			var t;
			this.name = Yt(e.name), this.description = e.description, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._fields = y5.bind(void 0, e);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLInputObjectType";
		}
		getFields() {
			return typeof this._fields == "function" && (this._fields = this._fields()), this._fields;
		}
		toConfig() {
			const e = Nn(this.getFields(), (t) => ({
				description: t.description,
				type: t.type,
				defaultValue: t.defaultValue,
				deprecationReason: t.deprecationReason,
				extensions: t.extensions,
				astNode: t.astNode
			}));
			return {
				name: this.name,
				description: this.description,
				fields: e,
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes
			};
		}
		toString() {
			return this.name;
		}
		toJSON() {
			return this.toString();
		}
	};
	function y5(e) {
		const t = uf(e.fields);
		return kr(t) || _e(!1, `${e.name} fields must be an object with field names as keys or a function which returns such an object.`), Nn(t, (n, r) => (!("resolve" in n) || _e(!1, `${e.name}.${r} field has a resolve property, but Input Types cannot define resolvers.`), {
			name: Yt(r),
			description: n.description,
			type: n.type,
			defaultValue: n.defaultValue,
			deprecationReason: n.deprecationReason,
			extensions: Vt(n.extensions),
			astNode: n.astNode
		}));
	}
	function pf(e) {
		return Fe(e.type) && e.defaultValue === void 0;
	}
	function _o(e, t) {
		return e === t ? !0 : Fe(e) && Fe(t) || Ye(e) && Ye(t) ? _o(e.ofType, t.ofType) : !1;
	}
	function xr(e, t, n) {
		return t === n ? !0 : Fe(n) ? Fe(t) ? xr(e, t.ofType, n.ofType) : !1 : Fe(t) ? xr(e, t.ofType, n) : Ye(n) ? Ye(t) ? xr(e, t.ofType, n.ofType) : !1 : Ye(t) ? !1 : on(n) && (xe(t) || we(t)) && e.isSubType(n, t);
	}
	function No(e, t, n) {
		return t === n ? !0 : on(t) ? on(n) ? e.getPossibleTypes(t).some((r) => e.isSubType(n, r)) : e.isSubType(t, n) : on(n) ? e.isSubType(n, t) : !1;
	}
	const v5 = new Tn({
		name: "Int",
		description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
		serialize(e) {
			const t = hi(e);
			if (typeof t == "boolean") return t ? 1 : 0;
			let n = t;
			if (typeof t == "string" && t !== "" && (n = Number(t)), typeof n != "number" || !Number.isInteger(n)) throw new H(`Int cannot represent non-integer value: ${X(t)}`);
			if (n > 2147483647 || n < -2147483648) throw new H("Int cannot represent non 32-bit signed integer value: " + X(t));
			return n;
		},
		parseValue(e) {
			if (typeof e != "number" || !Number.isInteger(e)) throw new H(`Int cannot represent non-integer value: ${X(e)}`);
			if (e > 2147483647 || e < -2147483648) throw new H(`Int cannot represent non 32-bit signed integer value: ${e}`);
			return e;
		},
		parseLiteral(e) {
			if (e.kind !== E.INT) throw new H(`Int cannot represent non-integer value: ${rt(e)}`, { nodes: e });
			const t = parseInt(e.value, 10);
			if (t > 2147483647 || t < -2147483648) throw new H(`Int cannot represent non 32-bit signed integer value: ${e.value}`, { nodes: e });
			return t;
		}
	}), mf = new Tn({
		name: "Float",
		description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
		serialize(e) {
			const t = hi(e);
			if (typeof t == "boolean") return t ? 1 : 0;
			let n = t;
			if (typeof t == "string" && t !== "" && (n = Number(t)), typeof n != "number" || !Number.isFinite(n)) throw new H(`Float cannot represent non numeric value: ${X(t)}`);
			return n;
		},
		parseValue(e) {
			if (typeof e != "number" || !Number.isFinite(e)) throw new H(`Float cannot represent non numeric value: ${X(e)}`);
			return e;
		},
		parseLiteral(e) {
			if (e.kind !== E.FLOAT && e.kind !== E.INT) throw new H(`Float cannot represent non numeric value: ${rt(e)}`, e);
			return parseFloat(e.value);
		}
	}), qe = new Tn({
		name: "String",
		description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
		serialize(e) {
			const t = hi(e);
			if (typeof t == "string") return t;
			if (typeof t == "boolean") return t ? "true" : "false";
			if (typeof t == "number" && Number.isFinite(t)) return t.toString();
			throw new H(`String cannot represent value: ${X(e)}`);
		},
		parseValue(e) {
			if (typeof e != "string") throw new H(`String cannot represent a non string value: ${X(e)}`);
			return e;
		},
		parseLiteral(e) {
			if (e.kind !== E.STRING) throw new H(`String cannot represent a non string value: ${rt(e)}`, { nodes: e });
			return e.value;
		}
	}), ft = new Tn({
		name: "Boolean",
		description: "The `Boolean` scalar type represents `true` or `false`.",
		serialize(e) {
			const t = hi(e);
			if (typeof t == "boolean") return t;
			if (Number.isFinite(t)) return t !== 0;
			throw new H(`Boolean cannot represent a non boolean value: ${X(t)}`);
		},
		parseValue(e) {
			if (typeof e != "boolean") throw new H(`Boolean cannot represent a non boolean value: ${X(e)}`);
			return e;
		},
		parseLiteral(e) {
			if (e.kind !== E.BOOLEAN) throw new H(`Boolean cannot represent a non boolean value: ${rt(e)}`, { nodes: e });
			return e.value;
		}
	}), gf = new Tn({
		name: "ID",
		description: "The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `\"4\"`) or integer (such as `4`) input value will be accepted as an ID.",
		serialize(e) {
			const t = hi(e);
			if (typeof t == "string") return t;
			if (Number.isInteger(t)) return String(t);
			throw new H(`ID cannot represent value: ${X(e)}`);
		},
		parseValue(e) {
			if (typeof e == "string") return e;
			if (typeof e == "number" && Number.isInteger(e)) return e.toString();
			throw new H(`ID cannot represent value: ${X(e)}`);
		},
		parseLiteral(e) {
			if (e.kind !== E.STRING && e.kind !== E.INT) throw new H("ID cannot represent a non-string and non-integer value: " + rt(e), { nodes: e });
			return e.value;
		}
	}), gs = Object.freeze([
		qe,
		v5,
		mf,
		ft,
		gf
	]);
	function E5(e) {
		return gs.some(({ name: t }) => e.name === t);
	}
	function hi(e) {
		if (_n(e)) {
			if (typeof e.valueOf == "function") {
				const t = e.valueOf();
				if (!_n(t)) return t;
			}
			if (typeof e.toJSON == "function") return e.toJSON();
		}
		return e;
	}
	function Df(e) {
		return Wt(e, Gn);
	}
	var Gn = class {
		constructor(e) {
			var t, n;
			this.name = Yt(e.name), this.description = e.description, this.locations = e.locations, this.isRepeatable = (t = e.isRepeatable) !== null && t !== void 0 ? t : !1, this.extensions = Vt(e.extensions), this.astNode = e.astNode, Array.isArray(e.locations) || _e(!1, `@${e.name} locations must be an Array.`);
			const r = (n = e.args) !== null && n !== void 0 ? n : {};
			_n(r) && !Array.isArray(r) || _e(!1, `@${e.name} args must be an object with argument names as keys.`), this.args = ff(r);
		}
		get [Symbol.toStringTag]() {
			return "GraphQLDirective";
		}
		toConfig() {
			return {
				name: this.name,
				description: this.description,
				locations: this.locations,
				args: hf(this.args),
				isRepeatable: this.isRepeatable,
				extensions: this.extensions,
				astNode: this.astNode
			};
		}
		toString() {
			return "@" + this.name;
		}
		toJSON() {
			return this.toString();
		}
	};
	const yf = new Gn({
		name: "include",
		description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
		locations: [
			ne.FIELD,
			ne.FRAGMENT_SPREAD,
			ne.INLINE_FRAGMENT
		],
		args: { if: {
			type: new me(ft),
			description: "Included when true."
		} }
	}), vf = new Gn({
		name: "skip",
		description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
		locations: [
			ne.FIELD,
			ne.FRAGMENT_SPREAD,
			ne.INLINE_FRAGMENT
		],
		args: { if: {
			type: new me(ft),
			description: "Skipped when true."
		} }
	}), To = new Gn({
		name: "deprecated",
		description: "Marks an element of a GraphQL schema as no longer supported.",
		locations: [
			ne.FIELD_DEFINITION,
			ne.ARGUMENT_DEFINITION,
			ne.INPUT_FIELD_DEFINITION,
			ne.ENUM_VALUE
		],
		args: { reason: {
			type: qe,
			description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
			defaultValue: "No longer supported"
		} }
	}), Ef = new Gn({
		name: "specifiedBy",
		description: "Exposes a URL that specifies the behavior of this scalar.",
		locations: [ne.SCALAR],
		args: { url: {
			type: new me(qe),
			description: "The URL that specifies the behavior of this scalar."
		} }
	}), Or = Object.freeze([
		yf,
		vf,
		To,
		Ef
	]);
	function _5(e) {
		return typeof e == "object" && typeof e?.[Symbol.iterator] == "function";
	}
	function pi(e, t) {
		if (Fe(t)) {
			const n = pi(e, t.ofType);
			return n?.kind === E.NULL ? null : n;
		}
		if (e === null) return { kind: E.NULL };
		if (e === void 0) return null;
		if (Ye(t)) {
			const n = t.ofType;
			if (_5(e)) {
				const r = [];
				for (const i of e) {
					const s = pi(i, n);
					s != null && r.push(s);
				}
				return {
					kind: E.LIST,
					values: r
				};
			}
			return pi(e, n);
		}
		if (ze(t)) {
			if (!_n(e)) return null;
			const n = [];
			for (const r of Object.values(t.getFields())) {
				const i = pi(e[r.name], r.type);
				i && n.push({
					kind: E.OBJECT_FIELD,
					name: {
						kind: E.NAME,
						value: r.name
					},
					value: i
				});
			}
			return {
				kind: E.OBJECT,
				fields: n
			};
		}
		if (Rr(t)) {
			const n = t.serialize(e);
			if (n == null) return null;
			if (typeof n == "boolean") return {
				kind: E.BOOLEAN,
				value: n
			};
			if (typeof n == "number" && Number.isFinite(n)) {
				const r = String(n);
				return bf.test(r) ? {
					kind: E.INT,
					value: r
				} : {
					kind: E.FLOAT,
					value: r
				};
			}
			if (typeof n == "string") return Dt(t) ? {
				kind: E.ENUM,
				value: n
			} : t === gf && bf.test(n) ? {
				kind: E.INT,
				value: n
			} : {
				kind: E.STRING,
				value: n
			};
			throw new TypeError(`Cannot convert value to AST: ${X(n)}.`);
		}
		St(!1, "Unexpected input type: " + X(t));
	}
	const bf = /^-?(?:0|[1-9][0-9]*)$/, So = new Ut({
		name: "__Schema",
		description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
		fields: () => ({
			description: {
				type: qe,
				resolve: (e) => e.description
			},
			types: {
				description: "A list of all types supported by this server.",
				type: new me(new ct(new me(Jt))),
				resolve(e) {
					return Object.values(e.getTypeMap());
				}
			},
			queryType: {
				description: "The type that query operations will be rooted at.",
				type: new me(Jt),
				resolve: (e) => e.getQueryType()
			},
			mutationType: {
				description: "If this server supports mutation, the type that mutation operations will be rooted at.",
				type: Jt,
				resolve: (e) => e.getMutationType()
			},
			subscriptionType: {
				description: "If this server support subscription, the type that subscription operations will be rooted at.",
				type: Jt,
				resolve: (e) => e.getSubscriptionType()
			},
			directives: {
				description: "A list of all directives supported by this server.",
				type: new me(new ct(new me(_f))),
				resolve: (e) => e.getDirectives()
			}
		})
	}), _f = new Ut({
		name: "__Directive",
		description: `A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.

In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.`,
		fields: () => ({
			name: {
				type: new me(qe),
				resolve: (e) => e.name
			},
			description: {
				type: qe,
				resolve: (e) => e.description
			},
			isRepeatable: {
				type: new me(ft),
				resolve: (e) => e.isRepeatable
			},
			locations: {
				type: new me(new ct(new me(Nf))),
				resolve: (e) => e.locations
			},
			args: {
				type: new me(new ct(new me(Ds))),
				args: { includeDeprecated: {
					type: ft,
					defaultValue: !1
				} },
				resolve(e, { includeDeprecated: t }) {
					return t ? e.args : e.args.filter((n) => n.deprecationReason == null);
				}
			}
		})
	}), Nf = new Hn({
		name: "__DirectiveLocation",
		description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
		values: {
			QUERY: {
				value: ne.QUERY,
				description: "Location adjacent to a query operation."
			},
			MUTATION: {
				value: ne.MUTATION,
				description: "Location adjacent to a mutation operation."
			},
			SUBSCRIPTION: {
				value: ne.SUBSCRIPTION,
				description: "Location adjacent to a subscription operation."
			},
			FIELD: {
				value: ne.FIELD,
				description: "Location adjacent to a field."
			},
			FRAGMENT_DEFINITION: {
				value: ne.FRAGMENT_DEFINITION,
				description: "Location adjacent to a fragment definition."
			},
			FRAGMENT_SPREAD: {
				value: ne.FRAGMENT_SPREAD,
				description: "Location adjacent to a fragment spread."
			},
			INLINE_FRAGMENT: {
				value: ne.INLINE_FRAGMENT,
				description: "Location adjacent to an inline fragment."
			},
			VARIABLE_DEFINITION: {
				value: ne.VARIABLE_DEFINITION,
				description: "Location adjacent to a variable definition."
			},
			SCHEMA: {
				value: ne.SCHEMA,
				description: "Location adjacent to a schema definition."
			},
			SCALAR: {
				value: ne.SCALAR,
				description: "Location adjacent to a scalar definition."
			},
			OBJECT: {
				value: ne.OBJECT,
				description: "Location adjacent to an object type definition."
			},
			FIELD_DEFINITION: {
				value: ne.FIELD_DEFINITION,
				description: "Location adjacent to a field definition."
			},
			ARGUMENT_DEFINITION: {
				value: ne.ARGUMENT_DEFINITION,
				description: "Location adjacent to an argument definition."
			},
			INTERFACE: {
				value: ne.INTERFACE,
				description: "Location adjacent to an interface definition."
			},
			UNION: {
				value: ne.UNION,
				description: "Location adjacent to a union definition."
			},
			ENUM: {
				value: ne.ENUM,
				description: "Location adjacent to an enum definition."
			},
			ENUM_VALUE: {
				value: ne.ENUM_VALUE,
				description: "Location adjacent to an enum value definition."
			},
			INPUT_OBJECT: {
				value: ne.INPUT_OBJECT,
				description: "Location adjacent to an input object type definition."
			},
			INPUT_FIELD_DEFINITION: {
				value: ne.INPUT_FIELD_DEFINITION,
				description: "Location adjacent to an input object field definition."
			}
		}
	}), Jt = new Ut({
		name: "__Type",
		description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
		fields: () => ({
			kind: {
				type: new me(Ff),
				resolve(e) {
					if ($t(e)) return Ie.SCALAR;
					if (we(e)) return Ie.OBJECT;
					if (xe(e)) return Ie.INTERFACE;
					if (Lt(e)) return Ie.UNION;
					if (Dt(e)) return Ie.ENUM;
					if (ze(e)) return Ie.INPUT_OBJECT;
					if (Ye(e)) return Ie.LIST;
					if (Fe(e)) return Ie.NON_NULL;
					St(!1, `Unexpected type: "${X(e)}".`);
				}
			},
			name: {
				type: qe,
				resolve: (e) => "name" in e ? e.name : void 0
			},
			description: {
				type: qe,
				resolve: (e) => "description" in e ? e.description : void 0
			},
			specifiedByURL: {
				type: qe,
				resolve: (e) => "specifiedByURL" in e ? e.specifiedByURL : void 0
			},
			fields: {
				type: new ct(new me(Tf)),
				args: { includeDeprecated: {
					type: ft,
					defaultValue: !1
				} },
				resolve(e, { includeDeprecated: t }) {
					if (we(e) || xe(e)) {
						const n = Object.values(e.getFields());
						return t ? n : n.filter((r) => r.deprecationReason == null);
					}
				}
			},
			interfaces: {
				type: new ct(new me(Jt)),
				resolve(e) {
					if (we(e) || xe(e)) return e.getInterfaces();
				}
			},
			possibleTypes: {
				type: new ct(new me(Jt)),
				resolve(e, t, n, { schema: r }) {
					if (on(e)) return r.getPossibleTypes(e);
				}
			},
			enumValues: {
				type: new ct(new me(Sf)),
				args: { includeDeprecated: {
					type: ft,
					defaultValue: !1
				} },
				resolve(e, { includeDeprecated: t }) {
					if (Dt(e)) {
						const n = e.getValues();
						return t ? n : n.filter((r) => r.deprecationReason == null);
					}
				}
			},
			inputFields: {
				type: new ct(new me(Ds)),
				args: { includeDeprecated: {
					type: ft,
					defaultValue: !1
				} },
				resolve(e, { includeDeprecated: t }) {
					if (ze(e)) {
						const n = Object.values(e.getFields());
						return t ? n : n.filter((r) => r.deprecationReason == null);
					}
				}
			},
			ofType: {
				type: Jt,
				resolve: (e) => "ofType" in e ? e.ofType : void 0
			}
		})
	}), Tf = new Ut({
		name: "__Field",
		description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
		fields: () => ({
			name: {
				type: new me(qe),
				resolve: (e) => e.name
			},
			description: {
				type: qe,
				resolve: (e) => e.description
			},
			args: {
				type: new me(new ct(new me(Ds))),
				args: { includeDeprecated: {
					type: ft,
					defaultValue: !1
				} },
				resolve(e, { includeDeprecated: t }) {
					return t ? e.args : e.args.filter((n) => n.deprecationReason == null);
				}
			},
			type: {
				type: new me(Jt),
				resolve: (e) => e.type
			},
			isDeprecated: {
				type: new me(ft),
				resolve: (e) => e.deprecationReason != null
			},
			deprecationReason: {
				type: qe,
				resolve: (e) => e.deprecationReason
			}
		})
	}), Ds = new Ut({
		name: "__InputValue",
		description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
		fields: () => ({
			name: {
				type: new me(qe),
				resolve: (e) => e.name
			},
			description: {
				type: qe,
				resolve: (e) => e.description
			},
			type: {
				type: new me(Jt),
				resolve: (e) => e.type
			},
			defaultValue: {
				type: qe,
				description: "A GraphQL-formatted string representing the default value for this input value.",
				resolve(e) {
					const { type: t, defaultValue: n } = e, r = pi(n, t);
					return r ? rt(r) : null;
				}
			},
			isDeprecated: {
				type: new me(ft),
				resolve: (e) => e.deprecationReason != null
			},
			deprecationReason: {
				type: qe,
				resolve: (e) => e.deprecationReason
			}
		})
	}), Sf = new Ut({
		name: "__EnumValue",
		description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
		fields: () => ({
			name: {
				type: new me(qe),
				resolve: (e) => e.name
			},
			description: {
				type: qe,
				resolve: (e) => e.description
			},
			isDeprecated: {
				type: new me(ft),
				resolve: (e) => e.deprecationReason != null
			},
			deprecationReason: {
				type: qe,
				resolve: (e) => e.deprecationReason
			}
		})
	});
	var Ie;
	(function(e) {
		e.SCALAR = "SCALAR", e.OBJECT = "OBJECT", e.INTERFACE = "INTERFACE", e.UNION = "UNION", e.ENUM = "ENUM", e.INPUT_OBJECT = "INPUT_OBJECT", e.LIST = "LIST", e.NON_NULL = "NON_NULL";
	})(Ie || (Ie = {}));
	const Ff = new Hn({
		name: "__TypeKind",
		description: "An enum describing what kind of type a given `__Type` is.",
		values: {
			SCALAR: {
				value: Ie.SCALAR,
				description: "Indicates this type is a scalar."
			},
			OBJECT: {
				value: Ie.OBJECT,
				description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
			},
			INTERFACE: {
				value: Ie.INTERFACE,
				description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
			},
			UNION: {
				value: Ie.UNION,
				description: "Indicates this type is a union. `possibleTypes` is a valid field."
			},
			ENUM: {
				value: Ie.ENUM,
				description: "Indicates this type is an enum. `enumValues` is a valid field."
			},
			INPUT_OBJECT: {
				value: Ie.INPUT_OBJECT,
				description: "Indicates this type is an input object. `inputFields` is a valid field."
			},
			LIST: {
				value: Ie.LIST,
				description: "Indicates this type is a list. `ofType` is a valid field."
			},
			NON_NULL: {
				value: Ie.NON_NULL,
				description: "Indicates this type is a non-null. `ofType` is a valid field."
			}
		}
	}), mi = {
		name: "__schema",
		type: new me(So),
		description: "Access the current type schema of this server.",
		args: [],
		resolve: (e, t, n, { schema: r }) => r,
		deprecationReason: void 0,
		extensions: Object.create(null),
		astNode: void 0
	}, gi = {
		name: "__type",
		type: Jt,
		description: "Request the type information of a single type.",
		args: [{
			name: "name",
			description: void 0,
			type: new me(qe),
			defaultValue: void 0,
			deprecationReason: void 0,
			extensions: Object.create(null),
			astNode: void 0
		}],
		resolve: (e, { name: t }, n, { schema: r }) => r.getType(t),
		deprecationReason: void 0,
		extensions: Object.create(null),
		astNode: void 0
	}, Di = {
		name: "__typename",
		type: new me(qe),
		description: "The name of the current Object type at runtime.",
		args: [],
		resolve: (e, t, n, { parentType: r }) => r.name,
		deprecationReason: void 0,
		extensions: Object.create(null),
		astNode: void 0
	}, ys = Object.freeze([
		So,
		_f,
		Nf,
		Jt,
		Tf,
		Ds,
		Sf,
		Ff
	]);
	function Af(e) {
		return ys.some(({ name: t }) => e.name === t);
	}
	function N5(e) {
		return Wt(e, Fo);
	}
	function T5(e) {
		if (!N5(e)) throw new Error(`Expected ${X(e)} to be a GraphQL schema.`);
		return e;
	}
	var Fo = class {
		constructor(e) {
			var t, n;
			this.__validationErrors = e.assumeValid === !0 ? [] : void 0, _n(e) || _e(!1, "Must provide configuration object."), !e.types || Array.isArray(e.types) || _e(!1, `"types" must be Array if provided but got: ${X(e.types)}.`), !e.directives || Array.isArray(e.directives) || _e(!1, `"directives" must be Array if provided but got: ${X(e.directives)}.`), this.description = e.description, this.extensions = Vt(e.extensions), this.astNode = e.astNode, this.extensionASTNodes = (t = e.extensionASTNodes) !== null && t !== void 0 ? t : [], this._queryType = e.query, this._mutationType = e.mutation, this._subscriptionType = e.subscription, this._directives = (n = e.directives) !== null && n !== void 0 ? n : Or;
			const r = new Set(e.types);
			if (e.types != null) for (const i of e.types) r.delete(i), Xt(i, r);
			this._queryType != null && Xt(this._queryType, r), this._mutationType != null && Xt(this._mutationType, r), this._subscriptionType != null && Xt(this._subscriptionType, r);
			for (const i of this._directives) if (Df(i)) for (const s of i.args) Xt(s.type, r);
			Xt(So, r), this._typeMap = Object.create(null), this._subTypeMap = Object.create(null), this._implementationsMap = Object.create(null);
			for (const i of r) {
				if (i == null) continue;
				const s = i.name;
				if (s || _e(!1, "One of the provided types for building the Schema is missing a name."), this._typeMap[s] !== void 0) throw new Error(`Schema must contain uniquely named types but contains multiple types named "${s}".`);
				if (this._typeMap[s] = i, xe(i)) {
					for (const a of i.getInterfaces()) if (xe(a)) {
						let o = this._implementationsMap[a.name];
						o === void 0 && (o = this._implementationsMap[a.name] = {
							objects: [],
							interfaces: []
						}), o.interfaces.push(i);
					}
				} else if (we(i)) {
					for (const a of i.getInterfaces()) if (xe(a)) {
						let o = this._implementationsMap[a.name];
						o === void 0 && (o = this._implementationsMap[a.name] = {
							objects: [],
							interfaces: []
						}), o.objects.push(i);
					}
				}
			}
		}
		get [Symbol.toStringTag]() {
			return "GraphQLSchema";
		}
		getQueryType() {
			return this._queryType;
		}
		getMutationType() {
			return this._mutationType;
		}
		getSubscriptionType() {
			return this._subscriptionType;
		}
		getRootType(e) {
			switch (e) {
				case gt.QUERY: return this.getQueryType();
				case gt.MUTATION: return this.getMutationType();
				case gt.SUBSCRIPTION: return this.getSubscriptionType();
			}
		}
		getTypeMap() {
			return this._typeMap;
		}
		getType(e) {
			return this.getTypeMap()[e];
		}
		getPossibleTypes(e) {
			return Lt(e) ? e.getTypes() : this.getImplementations(e).objects;
		}
		getImplementations(e) {
			return this._implementationsMap[e.name] ?? {
				objects: [],
				interfaces: []
			};
		}
		isSubType(e, t) {
			let n = this._subTypeMap[e.name];
			if (n === void 0) {
				if (n = Object.create(null), Lt(e)) for (const r of e.getTypes()) n[r.name] = !0;
				else {
					const r = this.getImplementations(e);
					for (const i of r.objects) n[i.name] = !0;
					for (const i of r.interfaces) n[i.name] = !0;
				}
				this._subTypeMap[e.name] = n;
			}
			return n[t.name] !== void 0;
		}
		getDirectives() {
			return this._directives;
		}
		getDirective(e) {
			return this.getDirectives().find((t) => t.name === e);
		}
		toConfig() {
			return {
				description: this.description,
				query: this.getQueryType(),
				mutation: this.getMutationType(),
				subscription: this.getSubscriptionType(),
				types: Object.values(this.getTypeMap()),
				directives: this.getDirectives(),
				extensions: this.extensions,
				astNode: this.astNode,
				extensionASTNodes: this.extensionASTNodes,
				assumeValid: this.__validationErrors !== void 0
			};
		}
	};
	function Xt(e, t) {
		const n = je(e);
		if (!t.has(n)) {
			if (t.add(n), Lt(n)) for (const r of n.getTypes()) Xt(r, t);
			else if (we(n) || xe(n)) {
				for (const r of n.getInterfaces()) Xt(r, t);
				for (const r of Object.values(n.getFields())) {
					Xt(r.type, t);
					for (const i of r.args) Xt(i.type, t);
				}
			} else if (ze(n)) for (const r of Object.values(n.getFields())) Xt(r.type, t);
		}
		return t;
	}
	function S5(e) {
		if (T5(e), e.__validationErrors) return e.__validationErrors;
		const t = new A5(e);
		C5(t), w5(t), I5(t);
		const n = t.getErrors();
		return e.__validationErrors = n, n;
	}
	function F5(e) {
		const t = S5(e);
		if (t.length !== 0) throw new Error(t.map((n) => n.message).join(`

`));
	}
	var A5 = class {
		constructor(e) {
			this._errors = [], this.schema = e;
		}
		reportError(e, t) {
			const n = Array.isArray(t) ? t.filter(Boolean) : t;
			this._errors.push(new H(e, { nodes: n }));
		}
		getErrors() {
			return this._errors;
		}
	};
	function C5(e) {
		const t = e.schema, n = t.getQueryType();
		if (!n) e.reportError("Query root type must be provided.", t.astNode);
		else if (!we(n)) {
			var r;
			e.reportError(`Query root type must be Object type, it cannot be ${X(n)}.`, (r = Ao(t, gt.QUERY)) !== null && r !== void 0 ? r : n.astNode);
		}
		const i = t.getMutationType();
		if (i && !we(i)) {
			var s;
			e.reportError(`Mutation root type must be Object type if provided, it cannot be ${X(i)}.`, (s = Ao(t, gt.MUTATION)) !== null && s !== void 0 ? s : i.astNode);
		}
		const a = t.getSubscriptionType();
		if (a && !we(a)) {
			var o;
			e.reportError(`Subscription root type must be Object type if provided, it cannot be ${X(a)}.`, (o = Ao(t, gt.SUBSCRIPTION)) !== null && o !== void 0 ? o : a.astNode);
		}
	}
	function Ao(e, t) {
		var n;
		return (n = [e.astNode, ...e.extensionASTNodes].flatMap((r) => {
			var i;
			return (i = r?.operationTypes) !== null && i !== void 0 ? i : [];
		}).find((r) => r.operation === t)) === null || n === void 0 ? void 0 : n.type;
	}
	function w5(e) {
		for (const n of e.schema.getDirectives()) {
			if (!Df(n)) {
				e.reportError(`Expected directive but got: ${X(n)}.`, n?.astNode);
				continue;
			}
			or(e, n);
			for (const r of n.args) if (or(e, r), Rt(r.type) || e.reportError(`The type of @${n.name}(${r.name}:) must be Input Type but got: ${X(r.type)}.`, r.astNode), fi(r) && r.deprecationReason != null) {
				var t;
				e.reportError(`Required argument @${n.name}(${r.name}:) cannot be deprecated.`, [Co(r.astNode), (t = r.astNode) === null || t === void 0 ? void 0 : t.type]);
			}
		}
	}
	function or(e, t) {
		t.name.startsWith("__") && e.reportError(`Name "${t.name}" must not begin with "__", which is reserved by GraphQL introspection.`, t.astNode);
	}
	function I5(e) {
		const t = M5(e), n = e.schema.getTypeMap();
		for (const r of Object.values(n)) {
			if (!m5(r)) {
				e.reportError(`Expected GraphQL named type but got: ${X(r)}.`, r.astNode);
				continue;
			}
			Af(r) || or(e, r), we(r) || xe(r) ? (Cf(e, r), wf(e, r)) : Lt(r) ? k5(e, r) : Dt(r) ? x5(e, r) : ze(r) && (O5(e, r), t(r));
		}
	}
	function Cf(e, t) {
		const n = Object.values(t.getFields());
		n.length === 0 && e.reportError(`Type ${t.name} must define one or more fields.`, [t.astNode, ...t.extensionASTNodes]);
		for (const a of n) {
			if (or(e, a), !ar(a.type)) {
				var r;
				e.reportError(`The type of ${t.name}.${a.name} must be Output Type but got: ${X(a.type)}.`, (r = a.astNode) === null || r === void 0 ? void 0 : r.type);
			}
			for (const o of a.args) {
				const u = o.name;
				if (or(e, o), !Rt(o.type)) {
					var i;
					e.reportError(`The type of ${t.name}.${a.name}(${u}:) must be Input Type but got: ${X(o.type)}.`, (i = o.astNode) === null || i === void 0 ? void 0 : i.type);
				}
				if (fi(o) && o.deprecationReason != null) {
					var s;
					e.reportError(`Required argument ${t.name}.${a.name}(${u}:) cannot be deprecated.`, [Co(o.astNode), (s = o.astNode) === null || s === void 0 ? void 0 : s.type]);
				}
			}
		}
	}
	function wf(e, t) {
		const n = Object.create(null);
		for (const r of t.getInterfaces()) {
			if (!xe(r)) {
				e.reportError(`Type ${X(t)} must only implement Interface types, it cannot implement ${X(r)}.`, yi(t, r));
				continue;
			}
			if (t === r) {
				e.reportError(`Type ${t.name} cannot implement itself because it would create a circular reference.`, yi(t, r));
				continue;
			}
			if (n[r.name]) {
				e.reportError(`Type ${t.name} can only implement ${r.name} once.`, yi(t, r));
				continue;
			}
			n[r.name] = !0, R5(e, t, r), L5(e, t, r);
		}
	}
	function L5(e, t, n) {
		const r = t.getFields();
		for (const u of Object.values(n.getFields())) {
			const l = u.name, c = r[l];
			if (!c) {
				e.reportError(`Interface field ${n.name}.${l} expected but ${t.name} does not provide it.`, [
					u.astNode,
					t.astNode,
					...t.extensionASTNodes
				]);
				continue;
			}
			if (!xr(e.schema, c.type, u.type)) {
				var i, s;
				e.reportError(`Interface field ${n.name}.${l} expects type ${X(u.type)} but ${t.name}.${l} is type ${X(c.type)}.`, [(i = u.astNode) === null || i === void 0 ? void 0 : i.type, (s = c.astNode) === null || s === void 0 ? void 0 : s.type]);
			}
			for (const d of u.args) {
				const m = d.name, p = c.args.find((g) => g.name === m);
				if (!p) {
					e.reportError(`Interface field argument ${n.name}.${l}(${m}:) expected but ${t.name}.${l} does not provide it.`, [d.astNode, c.astNode]);
					continue;
				}
				if (!_o(d.type, p.type)) {
					var a, o;
					e.reportError(`Interface field argument ${n.name}.${l}(${m}:) expects type ${X(d.type)} but ${t.name}.${l}(${m}:) is type ${X(p.type)}.`, [(a = d.astNode) === null || a === void 0 ? void 0 : a.type, (o = p.astNode) === null || o === void 0 ? void 0 : o.type]);
				}
			}
			for (const d of c.args) {
				const m = d.name;
				!u.args.find((p) => p.name === m) && fi(d) && e.reportError(`Object field ${t.name}.${l} includes required argument ${m} that is missing from the Interface field ${n.name}.${l}.`, [d.astNode, u.astNode]);
			}
		}
	}
	function R5(e, t, n) {
		const r = t.getInterfaces();
		for (const i of n.getInterfaces()) r.includes(i) || e.reportError(i === t ? `Type ${t.name} cannot implement ${n.name} because it would create a circular reference.` : `Type ${t.name} must implement ${i.name} because it is implemented by ${n.name}.`, [...yi(n, i), ...yi(t, n)]);
	}
	function k5(e, t) {
		const n = t.getTypes();
		n.length === 0 && e.reportError(`Union type ${t.name} must define one or more member types.`, [t.astNode, ...t.extensionASTNodes]);
		const r = Object.create(null);
		for (const i of n) {
			if (r[i.name]) {
				e.reportError(`Union type ${t.name} can only include type ${i.name} once.`, If(t, i.name));
				continue;
			}
			r[i.name] = !0, we(i) || e.reportError(`Union type ${t.name} can only include Object types, it cannot include ${X(i)}.`, If(t, String(i)));
		}
	}
	function x5(e, t) {
		const n = t.getValues();
		n.length === 0 && e.reportError(`Enum type ${t.name} must define one or more values.`, [t.astNode, ...t.extensionASTNodes]);
		for (const r of n) or(e, r);
	}
	function O5(e, t) {
		const n = Object.values(t.getFields());
		n.length === 0 && e.reportError(`Input Object type ${t.name} must define one or more fields.`, [t.astNode, ...t.extensionASTNodes]);
		for (const s of n) {
			if (or(e, s), !Rt(s.type)) {
				var r;
				e.reportError(`The type of ${t.name}.${s.name} must be Input Type but got: ${X(s.type)}.`, (r = s.astNode) === null || r === void 0 ? void 0 : r.type);
			}
			if (pf(s) && s.deprecationReason != null) {
				var i;
				e.reportError(`Required input field ${t.name}.${s.name} cannot be deprecated.`, [Co(s.astNode), (i = s.astNode) === null || i === void 0 ? void 0 : i.type]);
			}
		}
	}
	function M5(e) {
		const t = Object.create(null), n = [], r = Object.create(null);
		return i;
		function i(s) {
			if (t[s.name]) return;
			t[s.name] = !0, r[s.name] = n.length;
			const a = Object.values(s.getFields());
			for (const o of a) if (Fe(o.type) && ze(o.type.ofType)) {
				const u = o.type.ofType, l = r[u.name];
				if (n.push(o), l === void 0) i(u);
				else {
					const c = n.slice(l), d = c.map((m) => m.name).join(".");
					e.reportError(`Cannot reference Input Object "${u.name}" within itself through a series of non-null fields: "${d}".`, c.map((m) => m.astNode));
				}
				n.pop();
			}
			r[s.name] = void 0;
		}
	}
	function yi(e, t) {
		const { astNode: n, extensionASTNodes: r } = e;
		return (n != null ? [n, ...r] : r).flatMap((i) => {
			var s;
			return (s = i.interfaces) !== null && s !== void 0 ? s : [];
		}).filter((i) => i.name.value === t.name);
	}
	function If(e, t) {
		const { astNode: n, extensionASTNodes: r } = e;
		return (n != null ? [n, ...r] : r).flatMap((i) => {
			var s;
			return (s = i.types) !== null && s !== void 0 ? s : [];
		}).filter((i) => i.name.value === t);
	}
	function Co(e) {
		var t;
		return e == null || (t = e.directives) === null || t === void 0 ? void 0 : t.find((n) => n.name.value === To.name);
	}
	function xt(e, t) {
		switch (t.kind) {
			case E.LIST_TYPE: {
				const n = xt(e, t.type);
				return n && new ct(n);
			}
			case E.NON_NULL_TYPE: {
				const n = xt(e, t.type);
				return n && new me(n);
			}
			case E.NAMED_TYPE: return e.getType(t.name.value);
		}
	}
	var Lf = class {
		constructor(e, t, n) {
			this._schema = e, this._typeStack = [], this._parentTypeStack = [], this._inputTypeStack = [], this._fieldDefStack = [], this._defaultValueStack = [], this._directive = null, this._argument = null, this._enumValue = null, this._getFieldDef = n ?? P5, t && (Rt(t) && this._inputTypeStack.push(t), kt(t) && this._parentTypeStack.push(t), ar(t) && this._typeStack.push(t));
		}
		get [Symbol.toStringTag]() {
			return "TypeInfo";
		}
		getType() {
			if (this._typeStack.length > 0) return this._typeStack[this._typeStack.length - 1];
		}
		getParentType() {
			if (this._parentTypeStack.length > 0) return this._parentTypeStack[this._parentTypeStack.length - 1];
		}
		getInputType() {
			if (this._inputTypeStack.length > 0) return this._inputTypeStack[this._inputTypeStack.length - 1];
		}
		getParentInputType() {
			if (this._inputTypeStack.length > 1) return this._inputTypeStack[this._inputTypeStack.length - 2];
		}
		getFieldDef() {
			if (this._fieldDefStack.length > 0) return this._fieldDefStack[this._fieldDefStack.length - 1];
		}
		getDefaultValue() {
			if (this._defaultValueStack.length > 0) return this._defaultValueStack[this._defaultValueStack.length - 1];
		}
		getDirective() {
			return this._directive;
		}
		getArgument() {
			return this._argument;
		}
		getEnumValue() {
			return this._enumValue;
		}
		enter(e) {
			const t = this._schema;
			switch (e.kind) {
				case E.SELECTION_SET: {
					const r = je(this.getType());
					this._parentTypeStack.push(kt(r) ? r : void 0);
					break;
				}
				case E.FIELD: {
					const r = this.getParentType();
					let i, s;
					r && (i = this._getFieldDef(t, r, e), i && (s = i.type)), this._fieldDefStack.push(i), this._typeStack.push(ar(s) ? s : void 0);
					break;
				}
				case E.DIRECTIVE:
					this._directive = t.getDirective(e.name.value);
					break;
				case E.OPERATION_DEFINITION: {
					const r = t.getRootType(e.operation);
					this._typeStack.push(we(r) ? r : void 0);
					break;
				}
				case E.INLINE_FRAGMENT:
				case E.FRAGMENT_DEFINITION: {
					const r = e.typeCondition, i = r ? xt(t, r) : je(this.getType());
					this._typeStack.push(ar(i) ? i : void 0);
					break;
				}
				case E.VARIABLE_DEFINITION: {
					const r = xt(t, e.type);
					this._inputTypeStack.push(Rt(r) ? r : void 0);
					break;
				}
				case E.ARGUMENT: {
					var n;
					let r, i;
					const s = (n = this.getDirective()) !== null && n !== void 0 ? n : this.getFieldDef();
					s && (r = s.args.find((a) => a.name === e.name.value), r && (i = r.type)), this._argument = r, this._defaultValueStack.push(r ? r.defaultValue : void 0), this._inputTypeStack.push(Rt(i) ? i : void 0);
					break;
				}
				case E.LIST: {
					const r = bo(this.getInputType()), i = Ye(r) ? r.ofType : r;
					this._defaultValueStack.push(void 0), this._inputTypeStack.push(Rt(i) ? i : void 0);
					break;
				}
				case E.OBJECT_FIELD: {
					const r = je(this.getInputType());
					let i, s;
					ze(r) && (s = r.getFields()[e.name.value], s && (i = s.type)), this._defaultValueStack.push(s ? s.defaultValue : void 0), this._inputTypeStack.push(Rt(i) ? i : void 0);
					break;
				}
				case E.ENUM: {
					const r = je(this.getInputType());
					let i;
					Dt(r) && (i = r.getValue(e.value)), this._enumValue = i;
					break;
				}
				default:
			}
		}
		leave(e) {
			switch (e.kind) {
				case E.SELECTION_SET:
					this._parentTypeStack.pop();
					break;
				case E.FIELD:
					this._fieldDefStack.pop(), this._typeStack.pop();
					break;
				case E.DIRECTIVE:
					this._directive = null;
					break;
				case E.OPERATION_DEFINITION:
				case E.INLINE_FRAGMENT:
				case E.FRAGMENT_DEFINITION:
					this._typeStack.pop();
					break;
				case E.VARIABLE_DEFINITION:
					this._inputTypeStack.pop();
					break;
				case E.ARGUMENT:
					this._argument = null, this._defaultValueStack.pop(), this._inputTypeStack.pop();
					break;
				case E.LIST:
				case E.OBJECT_FIELD:
					this._defaultValueStack.pop(), this._inputTypeStack.pop();
					break;
				case E.ENUM:
					this._enumValue = null;
					break;
				default:
			}
		}
	};
	function P5(e, t, n) {
		const r = n.name.value;
		if (r === mi.name && e.getQueryType() === t) return mi;
		if (r === gi.name && e.getQueryType() === t) return gi;
		if (r === Di.name && kt(t)) return Di;
		if (we(t) || xe(t)) return t.getFields()[r];
	}
	function Rf(e, t) {
		return {
			enter(...n) {
				const r = n[0];
				e.enter(r);
				const i = ds(t, r.kind).enter;
				if (i) {
					const s = i.apply(t, n);
					return s !== void 0 && (e.leave(r), fo(s) && e.enter(s)), s;
				}
			},
			leave(...n) {
				const r = n[0], i = ds(t, r.kind).leave;
				let s;
				return i && (s = i.apply(t, n)), e.leave(r), s;
			}
		};
	}
	function B5(e) {
		return e.kind === E.OPERATION_DEFINITION || e.kind === E.FRAGMENT_DEFINITION;
	}
	function V5(e) {
		return e.kind === E.SCHEMA_DEFINITION || vi(e) || e.kind === E.DIRECTIVE_DEFINITION;
	}
	function vi(e) {
		return e.kind === E.SCALAR_TYPE_DEFINITION || e.kind === E.OBJECT_TYPE_DEFINITION || e.kind === E.INTERFACE_TYPE_DEFINITION || e.kind === E.UNION_TYPE_DEFINITION || e.kind === E.ENUM_TYPE_DEFINITION || e.kind === E.INPUT_OBJECT_TYPE_DEFINITION;
	}
	function $5(e) {
		return e.kind === E.SCHEMA_EXTENSION || wo(e);
	}
	function wo(e) {
		return e.kind === E.SCALAR_TYPE_EXTENSION || e.kind === E.OBJECT_TYPE_EXTENSION || e.kind === E.INTERFACE_TYPE_EXTENSION || e.kind === E.UNION_TYPE_EXTENSION || e.kind === E.ENUM_TYPE_EXTENSION || e.kind === E.INPUT_OBJECT_TYPE_EXTENSION;
	}
	function kf(e) {
		return { Document(t) {
			for (const n of t.definitions) if (!B5(n)) {
				const r = n.kind === E.SCHEMA_DEFINITION || n.kind === E.SCHEMA_EXTENSION ? "schema" : "\"" + n.name.value + "\"";
				e.reportError(new H(`The ${r} definition is not executable.`, { nodes: n }));
			}
			return !1;
		} };
	}
	function U5(e) {
		return { Field(t) {
			const n = e.getParentType();
			if (n && !e.getFieldDef()) {
				const r = e.getSchema(), i = t.name.value;
				let s = Un("to use an inline fragment on", j5(r, n, i));
				s === "" && (s = Un(q5(n, i))), e.reportError(new H(`Cannot query field "${i}" on type "${n.name}".` + s, { nodes: t }));
			}
		} };
	}
	function j5(e, t, n) {
		if (!on(t)) return [];
		const r = /* @__PURE__ */ new Set(), i = Object.create(null);
		for (const a of e.getPossibleTypes(t)) if (a.getFields()[n]) {
			r.add(a), i[a.name] = 1;
			for (const o of a.getInterfaces()) {
				var s;
				o.getFields()[n] && (r.add(o), i[o.name] = ((s = i[o.name]) !== null && s !== void 0 ? s : 0) + 1);
			}
		}
		return [...r].sort((a, o) => {
			const u = i[o.name] - i[a.name];
			return u !== 0 ? u : xe(a) && e.isSubType(a, o) ? -1 : xe(o) && e.isSubType(o, a) ? 1 : go(a.name, o.name);
		}).map((a) => a.name);
	}
	function q5(e, t) {
		return we(e) || xe(e) ? sr(t, Object.keys(e.getFields())) : [];
	}
	function xf(e) {
		return {
			InlineFragment(t) {
				const n = t.typeCondition;
				if (n) {
					const r = xt(e.getSchema(), n);
					if (r && !kt(r)) {
						const i = rt(n);
						e.reportError(new H(`Fragment cannot condition on non composite type "${i}".`, { nodes: n }));
					}
				}
			},
			FragmentDefinition(t) {
				const n = xt(e.getSchema(), t.typeCondition);
				if (n && !kt(n)) {
					const r = rt(t.typeCondition);
					e.reportError(new H(`Fragment "${t.name.value}" cannot condition on non composite type "${r}".`, { nodes: t.typeCondition }));
				}
			}
		};
	}
	function H5(e) {
		return {
			...Of(e),
			Argument(t) {
				const n = e.getArgument(), r = e.getFieldDef(), i = e.getParentType();
				if (!n && r && i) {
					const s = t.name.value, a = sr(s, r.args.map((o) => o.name));
					e.reportError(new H(`Unknown argument "${s}" on field "${i.name}.${r.name}".` + Un(a), { nodes: t }));
				}
			}
		};
	}
	function Of(e) {
		const t = Object.create(null), n = e.getSchema(), r = n ? n.getDirectives() : Or;
		for (const a of r) t[a.name] = a.args.map((o) => o.name);
		const i = e.getDocument().definitions;
		for (const a of i) if (a.kind === E.DIRECTIVE_DEFINITION) {
			var s;
			const o = (s = a.arguments) !== null && s !== void 0 ? s : [];
			t[a.name.value] = o.map((u) => u.name.value);
		}
		return { Directive(a) {
			const o = a.name.value, u = t[o];
			if (a.arguments && u) for (const l of a.arguments) {
				const c = l.name.value;
				if (!u.includes(c)) {
					const d = sr(c, u);
					e.reportError(new H(`Unknown argument "${c}" on directive "@${o}".` + Un(d), { nodes: l }));
				}
			}
			return !1;
		} };
	}
	function Io(e) {
		const t = Object.create(null), n = e.getSchema(), r = n ? n.getDirectives() : Or;
		for (const s of r) t[s.name] = s.locations;
		const i = e.getDocument().definitions;
		for (const s of i) s.kind === E.DIRECTIVE_DEFINITION && (t[s.name.value] = s.locations.map((a) => a.value));
		return { Directive(s, a, o, u, l) {
			const c = s.name.value, d = t[c];
			if (!d) {
				e.reportError(new H(`Unknown directive "@${c}".`, { nodes: s }));
				return;
			}
			const m = G5(l);
			m && !d.includes(m) && e.reportError(new H(`Directive "@${c}" may not be used on ${m}.`, { nodes: s }));
		} };
	}
	function G5(e) {
		const t = e[e.length - 1];
		switch ("kind" in t || St(!1), t.kind) {
			case E.OPERATION_DEFINITION: return W5(t.operation);
			case E.FIELD: return ne.FIELD;
			case E.FRAGMENT_SPREAD: return ne.FRAGMENT_SPREAD;
			case E.INLINE_FRAGMENT: return ne.INLINE_FRAGMENT;
			case E.FRAGMENT_DEFINITION: return ne.FRAGMENT_DEFINITION;
			case E.VARIABLE_DEFINITION: return ne.VARIABLE_DEFINITION;
			case E.SCHEMA_DEFINITION:
			case E.SCHEMA_EXTENSION: return ne.SCHEMA;
			case E.SCALAR_TYPE_DEFINITION:
			case E.SCALAR_TYPE_EXTENSION: return ne.SCALAR;
			case E.OBJECT_TYPE_DEFINITION:
			case E.OBJECT_TYPE_EXTENSION: return ne.OBJECT;
			case E.FIELD_DEFINITION: return ne.FIELD_DEFINITION;
			case E.INTERFACE_TYPE_DEFINITION:
			case E.INTERFACE_TYPE_EXTENSION: return ne.INTERFACE;
			case E.UNION_TYPE_DEFINITION:
			case E.UNION_TYPE_EXTENSION: return ne.UNION;
			case E.ENUM_TYPE_DEFINITION:
			case E.ENUM_TYPE_EXTENSION: return ne.ENUM;
			case E.ENUM_VALUE_DEFINITION: return ne.ENUM_VALUE;
			case E.INPUT_OBJECT_TYPE_DEFINITION:
			case E.INPUT_OBJECT_TYPE_EXTENSION: return ne.INPUT_OBJECT;
			case E.INPUT_VALUE_DEFINITION: {
				const n = e[e.length - 3];
				return "kind" in n || St(!1), n.kind === E.INPUT_OBJECT_TYPE_DEFINITION ? ne.INPUT_FIELD_DEFINITION : ne.ARGUMENT_DEFINITION;
			}
			default: St(!1, "Unexpected kind: " + X(t.kind));
		}
	}
	function W5(e) {
		switch (e) {
			case gt.QUERY: return ne.QUERY;
			case gt.MUTATION: return ne.MUTATION;
			case gt.SUBSCRIPTION: return ne.SUBSCRIPTION;
		}
	}
	function Mf(e) {
		return { FragmentSpread(t) {
			const n = t.name.value;
			e.getFragment(n) || e.reportError(new H(`Unknown fragment "${n}".`, { nodes: t.name }));
		} };
	}
	function Lo(e) {
		const t = e.getSchema(), n = t ? t.getTypeMap() : Object.create(null), r = Object.create(null);
		for (const s of e.getDocument().definitions) vi(s) && (r[s.name.value] = !0);
		const i = [...Object.keys(n), ...Object.keys(r)];
		return { NamedType(s, a, o, u, l) {
			const c = s.name.value;
			if (!n[c] && !r[c]) {
				var d;
				const m = (d = l[2]) !== null && d !== void 0 ? d : o, p = m != null && z5(m);
				if (p && Pf.includes(c)) return;
				const g = sr(c, p ? Pf.concat(i) : i);
				e.reportError(new H(`Unknown type "${c}".` + Un(g), { nodes: s }));
			}
		} };
	}
	const Pf = [...gs, ...ys].map((e) => e.name);
	function z5(e) {
		return "kind" in e && (V5(e) || $5(e));
	}
	function Y5(e) {
		let t = 0;
		return {
			Document(n) {
				t = n.definitions.filter((r) => r.kind === E.OPERATION_DEFINITION).length;
			},
			OperationDefinition(n) {
				!n.name && t > 1 && e.reportError(new H("This anonymous operation must be the only defined operation.", { nodes: n }));
			}
		};
	}
	function Bf(e) {
		var t, n, r;
		const i = e.getSchema(), s = (t = (n = (r = i?.astNode) !== null && r !== void 0 ? r : i?.getQueryType()) !== null && n !== void 0 ? n : i?.getMutationType()) !== null && t !== void 0 ? t : i?.getSubscriptionType();
		let a = 0;
		return { SchemaDefinition(o) {
			if (s) {
				e.reportError(new H("Cannot define a new schema within a schema extension.", { nodes: o }));
				return;
			}
			a > 0 && e.reportError(new H("Must provide only one schema definition.", { nodes: o })), ++a;
		} };
	}
	function J5(e) {
		const t = Object.create(null), n = [], r = Object.create(null);
		return {
			OperationDefinition: () => !1,
			FragmentDefinition(s) {
				return i(s), !1;
			}
		};
		function i(s) {
			if (t[s.name.value]) return;
			const a = s.name.value;
			t[a] = !0;
			const o = e.getFragmentSpreads(s.selectionSet);
			if (o.length !== 0) {
				r[a] = n.length;
				for (const u of o) {
					const l = u.name.value, c = r[l];
					if (n.push(u), c === void 0) {
						const d = e.getFragment(l);
						d && i(d);
					} else {
						const d = n.slice(c), m = d.slice(0, -1).map((p) => "\"" + p.name.value + "\"").join(", ");
						e.reportError(new H(`Cannot spread fragment "${l}" within itself` + (m !== "" ? ` via ${m}.` : "."), { nodes: d }));
					}
					n.pop();
				}
				r[a] = void 0;
			}
		}
	}
	function X5(e) {
		let t = Object.create(null);
		return {
			OperationDefinition: {
				enter() {
					t = Object.create(null);
				},
				leave(n) {
					const r = e.getRecursiveVariableUsages(n);
					for (const { node: i } of r) {
						const s = i.name.value;
						t[s] !== !0 && e.reportError(new H(n.name ? `Variable "$${s}" is not defined by operation "${n.name.value}".` : `Variable "$${s}" is not defined.`, { nodes: [i, n] }));
					}
				}
			},
			VariableDefinition(n) {
				t[n.variable.name.value] = !0;
			}
		};
	}
	function Vf(e) {
		const t = [], n = [];
		return {
			OperationDefinition(r) {
				return t.push(r), !1;
			},
			FragmentDefinition(r) {
				return n.push(r), !1;
			},
			Document: { leave() {
				const r = Object.create(null);
				for (const i of t) for (const s of e.getRecursivelyReferencedFragments(i)) r[s.name.value] = !0;
				for (const i of n) {
					const s = i.name.value;
					r[s] !== !0 && e.reportError(new H(`Fragment "${s}" is never used.`, { nodes: i }));
				}
			} }
		};
	}
	function Q5(e) {
		let t = [];
		return {
			OperationDefinition: {
				enter() {
					t = [];
				},
				leave(n) {
					const r = Object.create(null), i = e.getRecursiveVariableUsages(n);
					for (const { node: s } of i) r[s.name.value] = !0;
					for (const s of t) {
						const a = s.variable.name.value;
						r[a] !== !0 && e.reportError(new H(n.name ? `Variable "$${a}" is never used in operation "${n.name.value}".` : `Variable "$${a}" is never used.`, { nodes: s }));
					}
				}
			},
			VariableDefinition(n) {
				t.push(n);
			}
		};
	}
	function Ro(e) {
		switch (e.kind) {
			case E.OBJECT: return {
				...e,
				fields: Z5(e.fields)
			};
			case E.LIST: return {
				...e,
				values: e.values.map(Ro)
			};
			case E.INT:
			case E.FLOAT:
			case E.STRING:
			case E.BOOLEAN:
			case E.NULL:
			case E.ENUM:
			case E.VARIABLE: return e;
		}
	}
	function Z5(e) {
		return e.map((t) => ({
			...t,
			value: Ro(t.value)
		})).sort((t, n) => go(t.name.value, n.name.value));
	}
	function $f(e) {
		return Array.isArray(e) ? e.map(([t, n]) => `subfields "${t}" conflict because ` + $f(n)).join(" and ") : e;
	}
	function K5(e) {
		const t = new s7(), n = /* @__PURE__ */ new Map();
		return { SelectionSet(r) {
			const i = e7(e, n, t, e.getParentType(), r);
			for (const [[s, a], o, u] of i) {
				const l = $f(a);
				e.reportError(new H(`Fields "${s}" conflict because ${l}. Use different aliases on the fields to fetch both if this was intentional.`, { nodes: o.concat(u) }));
			}
		} };
	}
	function e7(e, t, n, r, i) {
		const s = [], [a, o] = bs(e, t, r, i);
		if (n7(e, s, t, n, a), o.length !== 0) for (let u = 0; u < o.length; u++) {
			vs(e, s, t, n, !1, a, o[u]);
			for (let l = u + 1; l < o.length; l++) Es(e, s, t, n, !1, o[u], o[l]);
		}
		return s;
	}
	function vs(e, t, n, r, i, s, a) {
		const o = e.getFragment(a);
		if (!o) return;
		const [u, l] = Oo(e, n, o);
		if (s !== u) {
			ko(e, t, n, r, i, s, u);
			for (const c of l) r.has(c, a, i) || (r.add(c, a, i), vs(e, t, n, r, i, s, c));
		}
	}
	function Es(e, t, n, r, i, s, a) {
		if (s === a || r.has(s, a, i)) return;
		r.add(s, a, i);
		const o = e.getFragment(s), u = e.getFragment(a);
		if (!o || !u) return;
		const [l, c] = Oo(e, n, o), [d, m] = Oo(e, n, u);
		ko(e, t, n, r, i, l, d);
		for (const p of m) Es(e, t, n, r, i, s, p);
		for (const p of c) Es(e, t, n, r, i, p, a);
	}
	function t7(e, t, n, r, i, s, a, o) {
		const u = [], [l, c] = bs(e, t, i, s), [d, m] = bs(e, t, a, o);
		ko(e, u, t, n, r, l, d);
		for (const p of m) vs(e, u, t, n, r, l, p);
		for (const p of c) vs(e, u, t, n, r, d, p);
		for (const p of c) for (const g of m) Es(e, u, t, n, r, p, g);
		return u;
	}
	function n7(e, t, n, r, i) {
		for (const [s, a] of Object.entries(i)) if (a.length > 1) for (let o = 0; o < a.length; o++) for (let u = o + 1; u < a.length; u++) {
			const l = Uf(e, n, r, !1, s, a[o], a[u]);
			l && t.push(l);
		}
	}
	function ko(e, t, n, r, i, s, a) {
		for (const [o, u] of Object.entries(s)) {
			const l = a[o];
			if (l) for (const c of u) for (const d of l) {
				const m = Uf(e, n, r, i, o, c, d);
				m && t.push(m);
			}
		}
	}
	function Uf(e, t, n, r, i, s, a) {
		const [o, u, l] = s, [c, d, m] = a, p = r || o !== c && we(o) && we(c);
		if (!p) {
			const C = u.name.value, w = d.name.value;
			if (C !== w) return [
				[i, `"${C}" and "${w}" are different fields`],
				[u],
				[d]
			];
			if (!r7(u, d)) return [
				[i, "they have differing arguments"],
				[u],
				[d]
			];
		}
		const g = l?.type, v = m?.type;
		if (g && v && xo(g, v)) return [
			[i, `they return conflicting types "${X(g)}" and "${X(v)}"`],
			[u],
			[d]
		];
		const F = u.selectionSet, S = d.selectionSet;
		if (F && S) return i7(t7(e, t, n, p, je(g), F, je(v), S), i, u, d);
	}
	function r7(e, t) {
		const n = e.arguments, r = t.arguments;
		if (n === void 0 || n.length === 0) return r === void 0 || r.length === 0;
		if (r === void 0 || r.length === 0 || n.length !== r.length) return !1;
		const i = new Map(r.map(({ name: s, value: a }) => [s.value, a]));
		return n.every((s) => {
			const a = s.value, o = i.get(s.name.value);
			return o === void 0 ? !1 : jf(a) === jf(o);
		});
	}
	function jf(e) {
		return rt(Ro(e));
	}
	function xo(e, t) {
		return Ye(e) ? Ye(t) ? xo(e.ofType, t.ofType) : !0 : Ye(t) ? !0 : Fe(e) ? Fe(t) ? xo(e.ofType, t.ofType) : !0 : Fe(t) ? !0 : Rr(e) || Rr(t) ? e !== t : !1;
	}
	function bs(e, t, n, r) {
		const i = t.get(r);
		if (i) return i;
		const s = Object.create(null), a = Object.create(null);
		qf(e, n, r, s, a);
		const o = [s, Object.keys(a)];
		return t.set(r, o), o;
	}
	function Oo(e, t, n) {
		return t.get(n.selectionSet) || bs(e, t, xt(e.getSchema(), n.typeCondition), n.selectionSet);
	}
	function qf(e, t, n, r, i) {
		for (const s of n.selections) switch (s.kind) {
			case E.FIELD: {
				const a = s.name.value;
				let o;
				(we(t) || xe(t)) && (o = t.getFields()[a]);
				const u = s.alias ? s.alias.value : a;
				r[u] || (r[u] = []), r[u].push([
					t,
					s,
					o
				]);
				break;
			}
			case E.FRAGMENT_SPREAD:
				i[s.name.value] = !0;
				break;
			case E.INLINE_FRAGMENT: {
				const a = s.typeCondition;
				qf(e, a ? xt(e.getSchema(), a) : t, s.selectionSet, r, i);
				break;
			}
		}
	}
	function i7(e, t, n, r) {
		if (e.length > 0) return [
			[t, e.map(([i]) => i)],
			[n, ...e.map(([, i]) => i).flat()],
			[r, ...e.map(([, , i]) => i).flat()]
		];
	}
	var s7 = class {
		constructor() {
			this._data = /* @__PURE__ */ new Map();
		}
		has(e, t, n) {
			var r;
			const [i, s] = e < t ? [e, t] : [t, e], a = (r = this._data.get(i)) === null || r === void 0 ? void 0 : r.get(s);
			return a === void 0 ? !1 : n ? !0 : n === a;
		}
		add(e, t, n) {
			const [r, i] = e < t ? [e, t] : [t, e], s = this._data.get(r);
			s === void 0 ? this._data.set(r, new Map([[i, n]])) : s.set(i, n);
		}
	};
	function a7(e) {
		return {
			InlineFragment(t) {
				const n = e.getType(), r = e.getParentType();
				if (kt(n) && kt(r) && !No(e.getSchema(), n, r)) {
					const i = X(r), s = X(n);
					e.reportError(new H(`Fragment cannot be spread here as objects of type "${i}" can never be of type "${s}".`, { nodes: t }));
				}
			},
			FragmentSpread(t) {
				const n = t.name.value, r = o7(e, n), i = e.getParentType();
				if (r && i && !No(e.getSchema(), r, i)) {
					const s = X(i), a = X(r);
					e.reportError(new H(`Fragment "${n}" cannot be spread here as objects of type "${s}" can never be of type "${a}".`, { nodes: t }));
				}
			}
		};
	}
	function o7(e, t) {
		const n = e.getFragment(t);
		if (n) {
			const r = xt(e.getSchema(), n.typeCondition);
			if (kt(r)) return r;
		}
	}
	function Hf(e) {
		const t = e.getSchema(), n = Object.create(null);
		for (const i of e.getDocument().definitions) vi(i) && (n[i.name.value] = i);
		return {
			ScalarTypeExtension: r,
			ObjectTypeExtension: r,
			InterfaceTypeExtension: r,
			UnionTypeExtension: r,
			EnumTypeExtension: r,
			InputObjectTypeExtension: r
		};
		function r(i) {
			const s = i.name.value, a = n[s], o = t?.getType(s);
			let u;
			if (a ? u = u7[a.kind] : o && (u = l7(o)), u) {
				if (u !== i.kind) {
					const l = c7(i.kind);
					e.reportError(new H(`Cannot extend non-${l} type "${s}".`, { nodes: a ? [a, i] : i }));
				}
			} else {
				const l = sr(s, Object.keys({
					...n,
					...t?.getTypeMap()
				}));
				e.reportError(new H(`Cannot extend type "${s}" because it is not defined.` + Un(l), { nodes: i.name }));
			}
		}
	}
	const u7 = {
		[E.SCALAR_TYPE_DEFINITION]: E.SCALAR_TYPE_EXTENSION,
		[E.OBJECT_TYPE_DEFINITION]: E.OBJECT_TYPE_EXTENSION,
		[E.INTERFACE_TYPE_DEFINITION]: E.INTERFACE_TYPE_EXTENSION,
		[E.UNION_TYPE_DEFINITION]: E.UNION_TYPE_EXTENSION,
		[E.ENUM_TYPE_DEFINITION]: E.ENUM_TYPE_EXTENSION,
		[E.INPUT_OBJECT_TYPE_DEFINITION]: E.INPUT_OBJECT_TYPE_EXTENSION
	};
	function l7(e) {
		if ($t(e)) return E.SCALAR_TYPE_EXTENSION;
		if (we(e)) return E.OBJECT_TYPE_EXTENSION;
		if (xe(e)) return E.INTERFACE_TYPE_EXTENSION;
		if (Lt(e)) return E.UNION_TYPE_EXTENSION;
		if (Dt(e)) return E.ENUM_TYPE_EXTENSION;
		if (ze(e)) return E.INPUT_OBJECT_TYPE_EXTENSION;
		St(!1, "Unexpected type: " + X(e));
	}
	function c7(e) {
		switch (e) {
			case E.SCALAR_TYPE_EXTENSION: return "scalar";
			case E.OBJECT_TYPE_EXTENSION: return "object";
			case E.INTERFACE_TYPE_EXTENSION: return "interface";
			case E.UNION_TYPE_EXTENSION: return "union";
			case E.ENUM_TYPE_EXTENSION: return "enum";
			case E.INPUT_OBJECT_TYPE_EXTENSION: return "input object";
			default: St(!1, "Unexpected kind: " + X(e));
		}
	}
	function Gf(e) {
		return {
			...Wf(e),
			Field: { leave(t) {
				var n;
				const r = e.getFieldDef();
				if (!r) return !1;
				const i = new Set((n = t.arguments) === null || n === void 0 ? void 0 : n.map((s) => s.name.value));
				for (const s of r.args) if (!i.has(s.name) && fi(s)) {
					const a = X(s.type);
					e.reportError(new H(`Field "${r.name}" argument "${s.name}" of type "${a}" is required, but it was not provided.`, { nodes: t }));
				}
			} }
		};
	}
	function Wf(e) {
		var t;
		const n = Object.create(null), i = (t = e.getSchema()?.getDirectives()) !== null && t !== void 0 ? t : Or;
		for (const o of i) n[o.name] = rr(o.args.filter(fi), (u) => u.name);
		const s = e.getDocument().definitions;
		for (const o of s) if (o.kind === E.DIRECTIVE_DEFINITION) {
			var a;
			const u = (a = o.arguments) !== null && a !== void 0 ? a : [];
			n[o.name.value] = rr(u.filter(f7), (l) => l.name.value);
		}
		return { Directive: { leave(o) {
			const u = o.name.value, l = n[u];
			if (l) {
				var c;
				const d = (c = o.arguments) !== null && c !== void 0 ? c : [], m = new Set(d.map((p) => p.name.value));
				for (const [p, g] of Object.entries(l)) if (!m.has(p)) {
					const v = vo(g.type) ? X(g.type) : rt(g.type);
					e.reportError(new H(`Directive "@${u}" argument "${p}" of type "${v}" is required, but it was not provided.`, { nodes: o }));
				}
			}
		} } };
	}
	function f7(e) {
		return e.type.kind === E.NON_NULL_TYPE && e.defaultValue == null;
	}
	function d7(e) {
		return { Field(t) {
			const n = e.getType(), r = t.selectionSet;
			if (n) {
				if (Rr(je(n))) {
					if (r) {
						const i = t.name.value, s = X(n);
						e.reportError(new H(`Field "${i}" must not have a selection since type "${s}" has no subfields.`, { nodes: r }));
					}
				} else if (!r) {
					const i = t.name.value, s = X(n);
					e.reportError(new H(`Field "${i}" of type "${s}" must have a selection of subfields. Did you mean "${i} { ... }"?`, { nodes: t }));
				}
			}
		} };
	}
	function Wn(e, t, n) {
		if (e) {
			if (e.kind === E.VARIABLE) {
				const r = e.name.value;
				if (n == null || n[r] === void 0) return;
				const i = n[r];
				return i === null && Fe(t) ? void 0 : i;
			}
			if (Fe(t)) return e.kind === E.NULL ? void 0 : Wn(e, t.ofType, n);
			if (e.kind === E.NULL) return null;
			if (Ye(t)) {
				const r = t.ofType;
				if (e.kind === E.LIST) {
					const s = [];
					for (const a of e.values) if (zf(a, n)) {
						if (Fe(r)) return;
						s.push(null);
					} else {
						const o = Wn(a, r, n);
						if (o === void 0) return;
						s.push(o);
					}
					return s;
				}
				const i = Wn(e, r, n);
				return i === void 0 ? void 0 : [i];
			}
			if (ze(t)) {
				if (e.kind !== E.OBJECT) return;
				const r = Object.create(null), i = rr(e.fields, (s) => s.name.value);
				for (const s of Object.values(t.getFields())) {
					const a = i[s.name];
					if (!a || zf(a.value, n)) {
						if (s.defaultValue !== void 0) r[s.name] = s.defaultValue;
						else if (Fe(s.type)) return;
						continue;
					}
					const o = Wn(a.value, s.type, n);
					if (o === void 0) return;
					r[s.name] = o;
				}
				return r;
			}
			if (Rr(t)) {
				let r;
				try {
					r = t.parseLiteral(e, n);
				} catch {
					return;
				}
				return r === void 0 ? void 0 : r;
			}
			St(!1, "Unexpected input type: " + X(t));
		}
	}
	function zf(e, t) {
		return e.kind === E.VARIABLE && (t == null || t[e.name.value] === void 0);
	}
	function h7(e, t, n) {
		var r;
		const i = {}, s = rr((r = t.arguments) !== null && r !== void 0 ? r : [], (a) => a.name.value);
		for (const a of e.args) {
			const o = a.name, u = a.type, l = s[o];
			if (!l) {
				if (a.defaultValue !== void 0) i[o] = a.defaultValue;
				else if (Fe(u)) throw new H(`Argument "${o}" of required type "${X(u)}" was not provided.`, { nodes: t });
				continue;
			}
			const c = l.value;
			let d = c.kind === E.NULL;
			if (c.kind === E.VARIABLE) {
				const p = c.name.value;
				if (n == null || !p7(n, p)) {
					if (a.defaultValue !== void 0) i[o] = a.defaultValue;
					else if (Fe(u)) throw new H(`Argument "${o}" of required type "${X(u)}" was provided the variable "$${p}" which was not provided a runtime value.`, { nodes: c });
					continue;
				}
				d = n[p] == null;
			}
			if (d && Fe(u)) throw new H(`Argument "${o}" of non-null type "${X(u)}" must not be null.`, { nodes: c });
			const m = Wn(c, u, n);
			if (m === void 0) throw new H(`Argument "${o}" has invalid value ${rt(c)}.`, { nodes: c });
			i[o] = m;
		}
		return i;
	}
	function _s(e, t, n) {
		var r;
		const i = (r = t.directives) === null || r === void 0 ? void 0 : r.find((s) => s.name.value === e.name);
		if (i) return h7(e, i, n);
	}
	function p7(e, t) {
		return Object.prototype.hasOwnProperty.call(e, t);
	}
	function m7(e, t, n, r, i) {
		const s = /* @__PURE__ */ new Map();
		return Mo(e, t, n, r, i, s, /* @__PURE__ */ new Set()), s;
	}
	function Mo(e, t, n, r, i, s, a) {
		for (const o of i.selections) switch (o.kind) {
			case E.FIELD: {
				if (!Po(n, o)) continue;
				const u = g7(o), l = s.get(u);
				l !== void 0 ? l.push(o) : s.set(u, [o]);
				break;
			}
			case E.INLINE_FRAGMENT:
				if (!Po(n, o) || !Yf(e, o, r)) continue;
				Mo(e, t, n, r, o.selectionSet, s, a);
				break;
			case E.FRAGMENT_SPREAD: {
				const u = o.name.value;
				if (a.has(u) || !Po(n, o)) continue;
				a.add(u);
				const l = t[u];
				if (!l || !Yf(e, l, r)) continue;
				Mo(e, t, n, r, l.selectionSet, s, a);
				break;
			}
		}
	}
	function Po(e, t) {
		if (_s(vf, t, e)?.if === !0) return !1;
		return _s(yf, t, e)?.if !== !1;
	}
	function Yf(e, t, n) {
		const r = t.typeCondition;
		if (!r) return !0;
		const i = xt(e, r);
		return i === n ? !0 : on(i) ? e.isSubType(i, n) : !1;
	}
	function g7(e) {
		return e.alias ? e.alias.value : e.name.value;
	}
	function D7(e) {
		return { OperationDefinition(t) {
			if (t.operation === "subscription") {
				const n = e.getSchema(), r = n.getSubscriptionType();
				if (r) {
					const i = t.name ? t.name.value : null, s = Object.create(null), a = e.getDocument(), o = Object.create(null);
					for (const l of a.definitions) l.kind === E.FRAGMENT_DEFINITION && (o[l.name.value] = l);
					const u = m7(n, o, s, r, t.selectionSet);
					if (u.size > 1) {
						const l = [...u.values()].slice(1).flat();
						e.reportError(new H(i != null ? `Subscription "${i}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.", { nodes: l }));
					}
					for (const l of u.values()) l[0].name.value.startsWith("__") && e.reportError(new H(i != null ? `Subscription "${i}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.", { nodes: l }));
				}
			}
		} };
	}
	function Bo(e, t) {
		const n = /* @__PURE__ */ new Map();
		for (const r of e) {
			const i = t(r), s = n.get(i);
			s === void 0 ? n.set(i, [r]) : s.push(r);
		}
		return n;
	}
	function y7(e) {
		return {
			DirectiveDefinition(r) {
				var i;
				const s = (i = r.arguments) !== null && i !== void 0 ? i : [];
				return n(`@${r.name.value}`, s);
			},
			InterfaceTypeDefinition: t,
			InterfaceTypeExtension: t,
			ObjectTypeDefinition: t,
			ObjectTypeExtension: t
		};
		function t(r) {
			var i;
			const s = r.name.value, a = (i = r.fields) !== null && i !== void 0 ? i : [];
			for (const u of a) {
				var o;
				const l = u.name.value, c = (o = u.arguments) !== null && o !== void 0 ? o : [];
				n(`${s}.${l}`, c);
			}
			return !1;
		}
		function n(r, i) {
			const s = Bo(i, (a) => a.name.value);
			for (const [a, o] of s) o.length > 1 && e.reportError(new H(`Argument "${r}(${a}:)" can only be defined once.`, { nodes: o.map((u) => u.name) }));
			return !1;
		}
	}
	function Vo(e) {
		return {
			Field: t,
			Directive: t
		};
		function t(n) {
			var r;
			const i = Bo((r = n.arguments) !== null && r !== void 0 ? r : [], (s) => s.name.value);
			for (const [s, a] of i) a.length > 1 && e.reportError(new H(`There can be only one argument named "${s}".`, { nodes: a.map((o) => o.name) }));
		}
	}
	function Jf(e) {
		const t = Object.create(null), n = e.getSchema();
		return { DirectiveDefinition(r) {
			const i = r.name.value;
			if (n != null && n.getDirective(i)) {
				e.reportError(new H(`Directive "@${i}" already exists in the schema. It cannot be redefined.`, { nodes: r.name }));
				return;
			}
			return t[i] ? e.reportError(new H(`There can be only one directive named "@${i}".`, { nodes: [t[i], r.name] })) : t[i] = r.name, !1;
		} };
	}
	function $o(e) {
		const t = Object.create(null), n = e.getSchema(), r = n ? n.getDirectives() : Or;
		for (const o of r) t[o.name] = !o.isRepeatable;
		const i = e.getDocument().definitions;
		for (const o of i) o.kind === E.DIRECTIVE_DEFINITION && (t[o.name.value] = !o.repeatable);
		const s = Object.create(null), a = Object.create(null);
		return { enter(o) {
			if (!("directives" in o) || !o.directives) return;
			let u;
			if (o.kind === E.SCHEMA_DEFINITION || o.kind === E.SCHEMA_EXTENSION) u = s;
			else if (vi(o) || wo(o)) {
				const l = o.name.value;
				u = a[l], u === void 0 && (a[l] = u = Object.create(null));
			} else u = Object.create(null);
			for (const l of o.directives) {
				const c = l.name.value;
				t[c] && (u[c] ? e.reportError(new H(`The directive "@${c}" can only be used once at this location.`, { nodes: [u[c], l] })) : u[c] = l);
			}
		} };
	}
	function Xf(e) {
		const t = e.getSchema(), n = t ? t.getTypeMap() : Object.create(null), r = Object.create(null);
		return {
			EnumTypeDefinition: i,
			EnumTypeExtension: i
		};
		function i(s) {
			var a;
			const o = s.name.value;
			r[o] || (r[o] = Object.create(null));
			const u = (a = s.values) !== null && a !== void 0 ? a : [], l = r[o];
			for (const c of u) {
				const d = c.name.value, m = n[o];
				Dt(m) && m.getValue(d) ? e.reportError(new H(`Enum value "${o}.${d}" already exists in the schema. It cannot also be defined in this type extension.`, { nodes: c.name })) : l[d] ? e.reportError(new H(`Enum value "${o}.${d}" can only be defined once.`, { nodes: [l[d], c.name] })) : l[d] = c.name;
			}
			return !1;
		}
	}
	function Qf(e) {
		const t = e.getSchema(), n = t ? t.getTypeMap() : Object.create(null), r = Object.create(null);
		return {
			InputObjectTypeDefinition: i,
			InputObjectTypeExtension: i,
			InterfaceTypeDefinition: i,
			InterfaceTypeExtension: i,
			ObjectTypeDefinition: i,
			ObjectTypeExtension: i
		};
		function i(s) {
			var a;
			const o = s.name.value;
			r[o] || (r[o] = Object.create(null));
			const u = (a = s.fields) !== null && a !== void 0 ? a : [], l = r[o];
			for (const c of u) {
				const d = c.name.value;
				v7(n[o], d) ? e.reportError(new H(`Field "${o}.${d}" already exists in the schema. It cannot also be defined in this type extension.`, { nodes: c.name })) : l[d] ? e.reportError(new H(`Field "${o}.${d}" can only be defined once.`, { nodes: [l[d], c.name] })) : l[d] = c.name;
			}
			return !1;
		}
	}
	function v7(e, t) {
		return we(e) || xe(e) || ze(e) ? e.getFields()[t] != null : !1;
	}
	function E7(e) {
		const t = Object.create(null);
		return {
			OperationDefinition: () => !1,
			FragmentDefinition(n) {
				const r = n.name.value;
				return t[r] ? e.reportError(new H(`There can be only one fragment named "${r}".`, { nodes: [t[r], n.name] })) : t[r] = n.name, !1;
			}
		};
	}
	function Uo(e) {
		const t = [];
		let n = Object.create(null);
		return {
			ObjectValue: {
				enter() {
					t.push(n), n = Object.create(null);
				},
				leave() {
					const r = t.pop();
					r || St(!1), n = r;
				}
			},
			ObjectField(r) {
				const i = r.name.value;
				n[i] ? e.reportError(new H(`There can be only one input field named "${i}".`, { nodes: [n[i], r.name] })) : n[i] = r.name;
			}
		};
	}
	function b7(e) {
		const t = Object.create(null);
		return {
			OperationDefinition(n) {
				const r = n.name;
				return r && (t[r.value] ? e.reportError(new H(`There can be only one operation named "${r.value}".`, { nodes: [t[r.value], r] })) : t[r.value] = r), !1;
			},
			FragmentDefinition: () => !1
		};
	}
	function Zf(e) {
		const t = e.getSchema(), n = Object.create(null), r = t ? {
			query: t.getQueryType(),
			mutation: t.getMutationType(),
			subscription: t.getSubscriptionType()
		} : {};
		return {
			SchemaDefinition: i,
			SchemaExtension: i
		};
		function i(s) {
			var a;
			const o = (a = s.operationTypes) !== null && a !== void 0 ? a : [];
			for (const u of o) {
				const l = u.operation, c = n[l];
				r[l] ? e.reportError(new H(`Type for ${l} already defined in the schema. It cannot be redefined.`, { nodes: u })) : c ? e.reportError(new H(`There can be only one ${l} type in schema.`, { nodes: [c, u] })) : n[l] = u;
			}
			return !1;
		}
	}
	function Kf(e) {
		const t = Object.create(null), n = e.getSchema();
		return {
			ScalarTypeDefinition: r,
			ObjectTypeDefinition: r,
			InterfaceTypeDefinition: r,
			UnionTypeDefinition: r,
			EnumTypeDefinition: r,
			InputObjectTypeDefinition: r
		};
		function r(i) {
			const s = i.name.value;
			if (n != null && n.getType(s)) {
				e.reportError(new H(`Type "${s}" already exists in the schema. It cannot also be defined in this type definition.`, { nodes: i.name }));
				return;
			}
			return t[s] ? e.reportError(new H(`There can be only one type named "${s}".`, { nodes: [t[s], i.name] })) : t[s] = i.name, !1;
		}
	}
	function e0(e) {
		return { OperationDefinition(t) {
			var n;
			const r = Bo((n = t.variableDefinitions) !== null && n !== void 0 ? n : [], (i) => i.variable.name.value);
			for (const [i, s] of r) s.length > 1 && e.reportError(new H(`There can be only one variable named "$${i}".`, { nodes: s.map((a) => a.variable.name) }));
		} };
	}
	function _7(e) {
		return {
			ListValue(t) {
				if (!Ye(bo(e.getParentInputType()))) return ur(e, t), !1;
			},
			ObjectValue(t) {
				const n = je(e.getInputType());
				if (!ze(n)) return ur(e, t), !1;
				const r = rr(t.fields, (i) => i.name.value);
				for (const i of Object.values(n.getFields())) if (!r[i.name] && pf(i)) {
					const s = X(i.type);
					e.reportError(new H(`Field "${n.name}.${i.name}" of required type "${s}" was not provided.`, { nodes: t }));
				}
			},
			ObjectField(t) {
				const n = je(e.getParentInputType());
				if (!e.getInputType() && ze(n)) {
					const r = sr(t.name.value, Object.keys(n.getFields()));
					e.reportError(new H(`Field "${t.name.value}" is not defined by type "${n.name}".` + Un(r), { nodes: t }));
				}
			},
			NullValue(t) {
				const n = e.getInputType();
				Fe(n) && e.reportError(new H(`Expected value of type "${X(n)}", found ${rt(t)}.`, { nodes: t }));
			},
			EnumValue: (t) => ur(e, t),
			IntValue: (t) => ur(e, t),
			FloatValue: (t) => ur(e, t),
			StringValue: (t) => ur(e, t),
			BooleanValue: (t) => ur(e, t)
		};
	}
	function ur(e, t) {
		const n = e.getInputType();
		if (!n) return;
		const r = je(n);
		if (!Rr(r)) {
			const i = X(n);
			e.reportError(new H(`Expected value of type "${i}", found ${rt(t)}.`, { nodes: t }));
			return;
		}
		try {
			if (r.parseLiteral(t, void 0) === void 0) {
				const i = X(n);
				e.reportError(new H(`Expected value of type "${i}", found ${rt(t)}.`, { nodes: t }));
			}
		} catch (i) {
			const s = X(n);
			i instanceof H ? e.reportError(i) : e.reportError(new H(`Expected value of type "${s}", found ${rt(t)}; ` + i.message, {
				nodes: t,
				originalError: i
			}));
		}
	}
	function N7(e) {
		return { VariableDefinition(t) {
			const n = xt(e.getSchema(), t.type);
			if (n !== void 0 && !Rt(n)) {
				const r = t.variable.name.value, i = rt(t.type);
				e.reportError(new H(`Variable "$${r}" cannot be non-input type "${i}".`, { nodes: t.type }));
			}
		} };
	}
	function T7(e) {
		let t = Object.create(null);
		return {
			OperationDefinition: {
				enter() {
					t = Object.create(null);
				},
				leave(n) {
					const r = e.getRecursiveVariableUsages(n);
					for (const { node: i, type: s, defaultValue: a } of r) {
						const o = i.name.value, u = t[o];
						if (u && s) {
							const l = e.getSchema(), c = xt(l, u.type);
							if (c && !S7(l, c, u.defaultValue, s, a)) {
								const d = X(c), m = X(s);
								e.reportError(new H(`Variable "$${o}" of type "${d}" used in position expecting type "${m}".`, { nodes: [u, i] }));
							}
						}
					}
				}
			},
			VariableDefinition(n) {
				t[n.variable.name.value] = n;
			}
		};
	}
	function S7(e, t, n, r, i) {
		if (Fe(r) && !Fe(t)) {
			if (!(n != null && n.kind !== E.NULL) && i === void 0) return !1;
			const s = r.ofType;
			return xr(e, t, s);
		}
		return xr(e, t, r);
	}
	const t0 = Object.freeze([
		kf,
		b7,
		Y5,
		D7,
		Lo,
		xf,
		N7,
		d7,
		U5,
		E7,
		Mf,
		Vf,
		a7,
		J5,
		e0,
		X5,
		Q5,
		Io,
		$o,
		H5,
		Vo,
		_7,
		Gf,
		T7,
		K5,
		Uo
	]), F7 = Object.freeze([
		Bf,
		Zf,
		Kf,
		Xf,
		Qf,
		y7,
		Jf,
		Lo,
		Io,
		$o,
		Hf,
		Of,
		Vo,
		Uo,
		Wf
	]);
	var n0 = class {
		constructor(e, t) {
			this._ast = e, this._fragments = void 0, this._fragmentSpreads = /* @__PURE__ */ new Map(), this._recursivelyReferencedFragments = /* @__PURE__ */ new Map(), this._onError = t;
		}
		get [Symbol.toStringTag]() {
			return "ASTValidationContext";
		}
		reportError(e) {
			this._onError(e);
		}
		getDocument() {
			return this._ast;
		}
		getFragment(e) {
			let t;
			if (this._fragments) t = this._fragments;
			else {
				t = Object.create(null);
				for (const n of this.getDocument().definitions) n.kind === E.FRAGMENT_DEFINITION && (t[n.name.value] = n);
				this._fragments = t;
			}
			return t[e];
		}
		getFragmentSpreads(e) {
			let t = this._fragmentSpreads.get(e);
			if (!t) {
				t = [];
				const n = [e];
				let r;
				for (; r = n.pop();) for (const i of r.selections) i.kind === E.FRAGMENT_SPREAD ? t.push(i) : i.selectionSet && n.push(i.selectionSet);
				this._fragmentSpreads.set(e, t);
			}
			return t;
		}
		getRecursivelyReferencedFragments(e) {
			let t = this._recursivelyReferencedFragments.get(e);
			if (!t) {
				t = [];
				const n = Object.create(null), r = [e.selectionSet];
				let i;
				for (; i = r.pop();) for (const s of this.getFragmentSpreads(i)) {
					const a = s.name.value;
					if (n[a] !== !0) {
						n[a] = !0;
						const o = this.getFragment(a);
						o && (t.push(o), r.push(o.selectionSet));
					}
				}
				this._recursivelyReferencedFragments.set(e, t);
			}
			return t;
		}
	}, A7 = class extends n0 {
		constructor(e, t, n) {
			super(e, n), this._schema = t;
		}
		get [Symbol.toStringTag]() {
			return "SDLValidationContext";
		}
		getSchema() {
			return this._schema;
		}
	}, C7 = class extends n0 {
		constructor(e, t, n, r) {
			super(t, r), this._schema = e, this._typeInfo = n, this._variableUsages = /* @__PURE__ */ new Map(), this._recursiveVariableUsages = /* @__PURE__ */ new Map();
		}
		get [Symbol.toStringTag]() {
			return "ValidationContext";
		}
		getSchema() {
			return this._schema;
		}
		getVariableUsages(e) {
			let t = this._variableUsages.get(e);
			if (!t) {
				const n = [], r = new Lf(this._schema);
				jn(e, Rf(r, {
					VariableDefinition: () => !1,
					Variable(i) {
						n.push({
							node: i,
							type: r.getInputType(),
							defaultValue: r.getDefaultValue()
						});
					}
				})), t = n, this._variableUsages.set(e, t);
			}
			return t;
		}
		getRecursiveVariableUsages(e) {
			let t = this._recursiveVariableUsages.get(e);
			if (!t) {
				t = this.getVariableUsages(e);
				for (const n of this.getRecursivelyReferencedFragments(e)) t = t.concat(this.getVariableUsages(n));
				this._recursiveVariableUsages.set(e, t);
			}
			return t;
		}
		getType() {
			return this._typeInfo.getType();
		}
		getParentType() {
			return this._typeInfo.getParentType();
		}
		getInputType() {
			return this._typeInfo.getInputType();
		}
		getParentInputType() {
			return this._typeInfo.getParentInputType();
		}
		getFieldDef() {
			return this._typeInfo.getFieldDef();
		}
		getDirective() {
			return this._typeInfo.getDirective();
		}
		getArgument() {
			return this._typeInfo.getArgument();
		}
		getEnumValue() {
			return this._typeInfo.getEnumValue();
		}
	};
	function r0(e, t, n = t0, r, i = new Lf(e)) {
		var s;
		const a = (s = r?.maxErrors) !== null && s !== void 0 ? s : 100;
		t || _e(!1, "Must provide document."), F5(e);
		const o = Object.freeze({}), u = [], l = new C7(e, t, i, (d) => {
			if (u.length >= a) throw u.push(new H("Too many validation errors, error limit reached. Validation aborted.")), o;
			u.push(d);
		}), c = rf(n.map((d) => d(l)));
		try {
			jn(t, Rf(i, c));
		} catch (d) {
			if (d !== o) throw d;
		}
		return u;
	}
	function w7(e, t, n = F7) {
		const r = [], i = new A7(e, t, (s) => {
			r.push(s);
		});
		return jn(e, rf(n.map((s) => s(i)))), r;
	}
	function I7(e) {
		const t = w7(e);
		if (t.length !== 0) throw new Error(t.map((n) => n.message).join(`

`));
	}
	function L7(e) {
		return {
			Field(t) {
				const n = e.getFieldDef(), r = n?.deprecationReason;
				if (n && r != null) {
					const i = e.getParentType();
					i ?? St(!1), e.reportError(new H(`The field ${i.name}.${n.name} is deprecated. ${r}`, { nodes: t }));
				}
			},
			Argument(t) {
				const n = e.getArgument(), r = n?.deprecationReason;
				if (n && r != null) {
					const i = e.getDirective();
					if (i != null) e.reportError(new H(`Directive "@${i.name}" argument "${n.name}" is deprecated. ${r}`, { nodes: t }));
					else {
						const s = e.getParentType(), a = e.getFieldDef();
						s != null && a != null || St(!1), e.reportError(new H(`Field "${s.name}.${a.name}" argument "${n.name}" is deprecated. ${r}`, { nodes: t }));
					}
				}
			},
			ObjectField(t) {
				const n = je(e.getParentInputType());
				if (ze(n)) {
					const r = n.getFields()[t.name.value], i = r?.deprecationReason;
					i != null && e.reportError(new H(`The input field ${n.name}.${r.name} is deprecated. ${i}`, { nodes: t }));
				}
			},
			EnumValue(t) {
				const n = e.getEnumValue(), r = n?.deprecationReason;
				if (n && r != null) {
					const i = je(e.getInputType());
					i ?? St(!1), e.reportError(new H(`The enum value "${i.name}.${n.name}" is deprecated. ${r}`, { nodes: t }));
				}
			}
		};
	}
	function i0(e, t) {
		_n(e) && _n(e.__schema) || _e(!1, `Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ${X(e)}.`);
		const n = e.__schema, r = ir(n.types, (L) => L.name, (L) => m(L));
		for (const L of [...gs, ...ys]) r[L.name] && (r[L.name] = L);
		const i = n.queryType ? c(n.queryType) : null, s = n.mutationType ? c(n.mutationType) : null, a = n.subscriptionType ? c(n.subscriptionType) : null, o = n.directives ? n.directives.map(K) : [];
		return new Fo({
			description: n.description,
			query: i,
			mutation: s,
			subscription: a,
			types: Object.values(r),
			directives: o,
			assumeValid: t?.assumeValid
		});
		function u(L) {
			if (L.kind === Ie.LIST) {
				const M = L.ofType;
				if (!M) throw new Error("Decorated type deeper than introspection query.");
				return new ct(u(M));
			}
			if (L.kind === Ie.NON_NULL) {
				const M = L.ofType;
				if (!M) throw new Error("Decorated type deeper than introspection query.");
				return new me(p5(u(M)));
			}
			return l(L);
		}
		function l(L) {
			const M = L.name;
			if (!M) throw new Error(`Unknown type reference: ${X(L)}.`);
			const O = r[M];
			if (!O) throw new Error(`Invalid or incomplete schema, unknown type: ${M}. Ensure that a full introspection query is used in order to build a client schema.`);
			return O;
		}
		function c(L) {
			return f5(l(L));
		}
		function d(L) {
			return d5(l(L));
		}
		function m(L) {
			if (L != null && L.name != null && L.kind != null) switch (L.kind) {
				case Ie.SCALAR: return p(L);
				case Ie.OBJECT: return v(L);
				case Ie.INTERFACE: return F(L);
				case Ie.UNION: return S(L);
				case Ie.ENUM: return C(L);
				case Ie.INPUT_OBJECT: return w(L);
			}
			const M = X(L);
			throw new Error(`Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ${M}.`);
		}
		function p(L) {
			return new Tn({
				name: L.name,
				description: L.description,
				specifiedByURL: L.specifiedByURL
			});
		}
		function g(L) {
			if (L.interfaces === null && L.kind === Ie.INTERFACE) return [];
			if (!L.interfaces) {
				const M = X(L);
				throw new Error(`Introspection result missing interfaces: ${M}.`);
			}
			return L.interfaces.map(d);
		}
		function v(L) {
			return new Ut({
				name: L.name,
				description: L.description,
				interfaces: () => g(L),
				fields: () => T(L)
			});
		}
		function F(L) {
			return new qn({
				name: L.name,
				description: L.description,
				interfaces: () => g(L),
				fields: () => T(L)
			});
		}
		function S(L) {
			if (!L.possibleTypes) {
				const M = X(L);
				throw new Error(`Introspection result missing possibleTypes: ${M}.`);
			}
			return new ps({
				name: L.name,
				description: L.description,
				types: () => L.possibleTypes.map(c)
			});
		}
		function C(L) {
			if (!L.enumValues) {
				const M = X(L);
				throw new Error(`Introspection result missing enumValues: ${M}.`);
			}
			return new Hn({
				name: L.name,
				description: L.description,
				values: ir(L.enumValues, (M) => M.name, (M) => ({
					description: M.description,
					deprecationReason: M.deprecationReason
				}))
			});
		}
		function w(L) {
			if (!L.inputFields) {
				const M = X(L);
				throw new Error(`Introspection result missing inputFields: ${M}.`);
			}
			return new di({
				name: L.name,
				description: L.description,
				fields: () => k(L.inputFields)
			});
		}
		function T(L) {
			if (!L.fields) throw new Error(`Introspection result missing fields: ${X(L)}.`);
			return ir(L.fields, (M) => M.name, A);
		}
		function A(L) {
			const M = u(L.type);
			if (!ar(M)) {
				const O = X(M);
				throw new Error(`Introspection must provide output type for fields, but received: ${O}.`);
			}
			if (!L.args) {
				const O = X(L);
				throw new Error(`Introspection result missing field args: ${O}.`);
			}
			return {
				description: L.description,
				deprecationReason: L.deprecationReason,
				type: M,
				args: k(L.args)
			};
		}
		function k(L) {
			return ir(L, (M) => M.name, V);
		}
		function V(L) {
			const M = u(L.type);
			if (!Rt(M)) {
				const oe = X(M);
				throw new Error(`Introspection must provide input type for arguments, but received: ${oe}.`);
			}
			const O = L.defaultValue != null ? Wn(e5(L.defaultValue), M) : void 0;
			return {
				description: L.description,
				type: M,
				defaultValue: O,
				deprecationReason: L.deprecationReason
			};
		}
		function K(L) {
			if (!L.args) {
				const M = X(L);
				throw new Error(`Introspection result missing directive args: ${M}.`);
			}
			if (!L.locations) {
				const M = X(L);
				throw new Error(`Introspection result missing directive locations: ${M}.`);
			}
			return new Gn({
				name: L.name,
				description: L.description,
				isRepeatable: L.isRepeatable,
				locations: L.locations.slice(),
				args: k(L.args)
			});
		}
	}
	function R7(e, t, n) {
		var r, i, s, a;
		const o = [], u = Object.create(null), l = [];
		let c;
		const d = [];
		for (const _ of t.definitions) if (_.kind === E.SCHEMA_DEFINITION) c = _;
		else if (_.kind === E.SCHEMA_EXTENSION) d.push(_);
		else if (vi(_)) o.push(_);
		else if (wo(_)) {
			const J = _.name.value, Y = u[J];
			u[J] = Y ? Y.concat([_]) : [_];
		} else _.kind === E.DIRECTIVE_DEFINITION && l.push(_);
		if (Object.keys(u).length === 0 && o.length === 0 && l.length === 0 && d.length === 0 && c == null) return e;
		const m = Object.create(null);
		for (const _ of e.types) m[_.name] = C(_);
		for (const _ of o) {
			var p;
			const J = _.name.value;
			m[J] = (p = s0[J]) !== null && p !== void 0 ? p : Ne(_);
		}
		const g = {
			query: e.query && F(e.query),
			mutation: e.mutation && F(e.mutation),
			subscription: e.subscription && F(e.subscription),
			...c && O([c]),
			...O(d)
		};
		return {
			description: (r = c) === null || r === void 0 || (i = r.description) === null || i === void 0 ? void 0 : i.value,
			...g,
			types: Object.values(m),
			directives: [...e.directives.map(S), ...l.map(B)],
			extensions: Object.create(null),
			astNode: (s = c) !== null && s !== void 0 ? s : e.astNode,
			extensionASTNodes: e.extensionASTNodes.concat(d),
			assumeValid: (a = n?.assumeValid) !== null && a !== void 0 ? a : !1
		};
		function v(_) {
			return Ye(_) ? new ct(v(_.ofType)) : Fe(_) ? new me(v(_.ofType)) : F(_);
		}
		function F(_) {
			return m[_.name];
		}
		function S(_) {
			const J = _.toConfig();
			return new Gn({
				...J,
				args: Nn(J.args, M)
			});
		}
		function C(_) {
			if (Af(_) || E5(_)) return _;
			if ($t(_)) return A(_);
			if (we(_)) return k(_);
			if (xe(_)) return V(_);
			if (Lt(_)) return K(_);
			if (Dt(_)) return T(_);
			if (ze(_)) return w(_);
			St(!1, "Unexpected type: " + X(_));
		}
		function w(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[Y.name]) !== null && J !== void 0 ? J : [];
			return new di({
				...Y,
				fields: () => ({
					...Nn(Y.fields, (x) => ({
						...x,
						type: v(x.type)
					})),
					...ee(Z)
				}),
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function T(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[_.name]) !== null && J !== void 0 ? J : [];
			return new Hn({
				...Y,
				values: {
					...Y.values,
					...W(Z)
				},
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function A(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[Y.name]) !== null && J !== void 0 ? J : [];
			let x = Y.specifiedByURL;
			for (const re of Z) {
				var P;
				x = (P = a0(re)) !== null && P !== void 0 ? P : x;
			}
			return new Tn({
				...Y,
				specifiedByURL: x,
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function k(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[Y.name]) !== null && J !== void 0 ? J : [];
			return new Ut({
				...Y,
				interfaces: () => [..._.getInterfaces().map(F), ...se(Z)],
				fields: () => ({
					...Nn(Y.fields, L),
					...G(Z)
				}),
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function V(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[Y.name]) !== null && J !== void 0 ? J : [];
			return new qn({
				...Y,
				interfaces: () => [..._.getInterfaces().map(F), ...se(Z)],
				fields: () => ({
					...Nn(Y.fields, L),
					...G(Z)
				}),
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function K(_) {
			var J;
			const Y = _.toConfig(), Z = (J = u[Y.name]) !== null && J !== void 0 ? J : [];
			return new ps({
				...Y,
				types: () => [..._.getTypes().map(F), ...ue(Z)],
				extensionASTNodes: Y.extensionASTNodes.concat(Z)
			});
		}
		function L(_) {
			return {
				..._,
				type: v(_.type),
				args: _.args && Nn(_.args, M)
			};
		}
		function M(_) {
			return {
				..._,
				type: v(_.type)
			};
		}
		function O(_) {
			const J = {};
			for (const Z of _) {
				var Y;
				const x = (Y = Z.operationTypes) !== null && Y !== void 0 ? Y : [];
				for (const P of x) J[P.operation] = oe(P.type);
			}
			return J;
		}
		function oe(_) {
			var J;
			const Y = _.name.value, Z = (J = s0[Y]) !== null && J !== void 0 ? J : m[Y];
			if (Z === void 0) throw new Error(`Unknown type: "${Y}".`);
			return Z;
		}
		function I(_) {
			return _.kind === E.LIST_TYPE ? new ct(I(_.type)) : _.kind === E.NON_NULL_TYPE ? new me(I(_.type)) : oe(_);
		}
		function B(_) {
			var J;
			return new Gn({
				name: _.name.value,
				description: (J = _.description) === null || J === void 0 ? void 0 : J.value,
				locations: _.locations.map(({ value: Y }) => Y),
				isRepeatable: _.repeatable,
				args: q(_.arguments),
				astNode: _
			});
		}
		function G(_) {
			const J = Object.create(null);
			for (const x of _) {
				var Y;
				const P = (Y = x.fields) !== null && Y !== void 0 ? Y : [];
				for (const re of P) {
					var Z;
					J[re.name.value] = {
						type: I(re.type),
						description: (Z = re.description) === null || Z === void 0 ? void 0 : Z.value,
						args: q(re.arguments),
						deprecationReason: Ns(re),
						astNode: re
					};
				}
			}
			return J;
		}
		function q(_) {
			const J = _ ?? [], Y = Object.create(null);
			for (const x of J) {
				var Z;
				const P = I(x.type);
				Y[x.name.value] = {
					type: P,
					description: (Z = x.description) === null || Z === void 0 ? void 0 : Z.value,
					defaultValue: Wn(x.defaultValue, P),
					deprecationReason: Ns(x),
					astNode: x
				};
			}
			return Y;
		}
		function ee(_) {
			const J = Object.create(null);
			for (const x of _) {
				var Y;
				const P = (Y = x.fields) !== null && Y !== void 0 ? Y : [];
				for (const re of P) {
					var Z;
					const fe = I(re.type);
					J[re.name.value] = {
						type: fe,
						description: (Z = re.description) === null || Z === void 0 ? void 0 : Z.value,
						defaultValue: Wn(re.defaultValue, fe),
						deprecationReason: Ns(re),
						astNode: re
					};
				}
			}
			return J;
		}
		function W(_) {
			const J = Object.create(null);
			for (const x of _) {
				var Y;
				const P = (Y = x.values) !== null && Y !== void 0 ? Y : [];
				for (const re of P) {
					var Z;
					J[re.name.value] = {
						description: (Z = re.description) === null || Z === void 0 ? void 0 : Z.value,
						deprecationReason: Ns(re),
						astNode: re
					};
				}
			}
			return J;
		}
		function se(_) {
			return _.flatMap((J) => {
				var Y, Z;
				return (Y = (Z = J.interfaces) === null || Z === void 0 ? void 0 : Z.map(oe)) !== null && Y !== void 0 ? Y : [];
			});
		}
		function ue(_) {
			return _.flatMap((J) => {
				var Y, Z;
				return (Y = (Z = J.types) === null || Z === void 0 ? void 0 : Z.map(oe)) !== null && Y !== void 0 ? Y : [];
			});
		}
		function Ne(_) {
			var J;
			const Y = _.name.value, Z = (J = u[Y]) !== null && J !== void 0 ? J : [];
			switch (_.kind) {
				case E.OBJECT_TYPE_DEFINITION: {
					var x;
					const ye = [_, ...Z];
					return new Ut({
						name: Y,
						description: (x = _.description) === null || x === void 0 ? void 0 : x.value,
						interfaces: () => se(ye),
						fields: () => G(ye),
						astNode: _,
						extensionASTNodes: Z
					});
				}
				case E.INTERFACE_TYPE_DEFINITION: {
					var P;
					const ye = [_, ...Z];
					return new qn({
						name: Y,
						description: (P = _.description) === null || P === void 0 ? void 0 : P.value,
						interfaces: () => se(ye),
						fields: () => G(ye),
						astNode: _,
						extensionASTNodes: Z
					});
				}
				case E.ENUM_TYPE_DEFINITION: {
					var re;
					const ye = [_, ...Z];
					return new Hn({
						name: Y,
						description: (re = _.description) === null || re === void 0 ? void 0 : re.value,
						values: W(ye),
						astNode: _,
						extensionASTNodes: Z
					});
				}
				case E.UNION_TYPE_DEFINITION: {
					var fe;
					const ye = [_, ...Z];
					return new ps({
						name: Y,
						description: (fe = _.description) === null || fe === void 0 ? void 0 : fe.value,
						types: () => ue(ye),
						astNode: _,
						extensionASTNodes: Z
					});
				}
				case E.SCALAR_TYPE_DEFINITION:
					var Qe;
					return new Tn({
						name: Y,
						description: (Qe = _.description) === null || Qe === void 0 ? void 0 : Qe.value,
						specifiedByURL: a0(_),
						astNode: _,
						extensionASTNodes: Z
					});
				case E.INPUT_OBJECT_TYPE_DEFINITION: {
					var At;
					const ye = [_, ...Z];
					return new di({
						name: Y,
						description: (At = _.description) === null || At === void 0 ? void 0 : At.value,
						fields: () => ee(ye),
						astNode: _,
						extensionASTNodes: Z
					});
				}
			}
		}
	}
	const s0 = rr([...gs, ...ys], (e) => e.name);
	function Ns(e) {
		return _s(To, e)?.reason;
	}
	function a0(e) {
		return _s(Ef, e)?.url;
	}
	function o0(e, t) {
		e != null && e.kind === E.DOCUMENT || _e(!1, "Must provide valid Document AST."), t?.assumeValid !== !0 && t?.assumeValidSDL !== !0 && I7(e);
		const n = R7({
			description: void 0,
			types: [],
			directives: [],
			extensions: Object.create(null),
			extensionASTNodes: [],
			assumeValid: !1
		}, e, t);
		if (n.astNode == null) for (const i of n.types) switch (i.name) {
			case "Query":
				n.query = i;
				break;
			case "Mutation":
				n.mutation = i;
				break;
			case "Subscription":
				n.subscription = i;
				break;
		}
		const r = [...n.directives, ...Or.filter((i) => n.directives.every((s) => s.name !== i.name))];
		return new Fo({
			...n,
			directives: r
		});
	}
	function lr(e) {
		const t = Object.keys(e), n = t.length, r = new Array(n);
		for (let i = 0; i < n; ++i) r[i] = e[t[i]];
		return r;
	}
	function Me(e, t) {
		return k7(t, u0(e.string));
	}
	function k7(e, t) {
		return !t || t.trim() === "" || t.trim() === ":" || t.trim() === "{" ? jo(e, (n) => !n.isDeprecated) : jo(jo(e.map((n) => ({
			proximity: x7(u0(n.label), t),
			entry: n
		})), (n) => n.proximity <= 2), (n) => !n.entry.isDeprecated).sort((n, r) => (n.entry.isDeprecated ? 1 : 0) - (r.entry.isDeprecated ? 1 : 0) || n.proximity - r.proximity || n.entry.label.length - r.entry.label.length).map((n) => n.entry);
	}
	function jo(e, t) {
		const n = e.filter(t);
		return n.length === 0 ? e : n;
	}
	function u0(e) {
		return e.toLowerCase().replaceAll(/\W/g, "");
	}
	function x7(e, t) {
		let n = O7(t, e);
		return e.length > t.length && (n -= e.length - t.length - 1, n += e.indexOf(t) === 0 ? 0 : .5), n;
	}
	function O7(e, t) {
		let n, r;
		const i = [], s = e.length, a = t.length;
		for (n = 0; n <= s; n++) i[n] = [n];
		for (r = 1; r <= a; r++) i[0][r] = r;
		for (n = 1; n <= s; n++) for (r = 1; r <= a; r++) {
			const o = e[n - 1] === t[r - 1] ? 0 : 1;
			i[n][r] = Math.min(i[n - 1][r] + 1, i[n][r - 1] + 1, i[n - 1][r - 1] + o), n > 1 && r > 1 && e[n - 1] === t[r - 2] && e[n - 2] === t[r - 1] && (i[n][r] = Math.min(i[n][r], i[n - 2][r - 2] + o));
		}
		return i[s][a];
	}
	const M7 = (e) => ` {
   $${e ?? 1}
}`, Ts = (e, t, n) => {
		if (!t) return n ?? e;
		const r = je(t);
		return we(r) || ze(r) || Ye(r) || on(r) ? e + M7() : n ?? e;
	}, l0 = (e, t, n) => Ye(t) ? e + `[${Ts("", je(t.ofType), "$1")}]` : Ts(e, t, n), P7 = (e) => {
		const t = e.args.filter((n) => n.type.toString().endsWith("!"));
		if (t.length) return e.name + `(${t.map((n, r) => `${n.name}: $${r + 1}`)}) ${Ts("", e.type, `
`)}`;
	};
	var c0;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})(c0 || (c0 = {}));
	var qo;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})(qo || (qo = {}));
	var f0;
	(function(e) {
		e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(f0 || (f0 = {}));
	var Ss;
	(function(e) {
		e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(Ss || (Ss = {}));
	var Qt;
	(function(e) {
		function t(r, i) {
			return r === Number.MAX_VALUE && (r = Ss.MAX_VALUE), i === Number.MAX_VALUE && (i = Ss.MAX_VALUE), {
				line: r,
				character: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.objectLiteral(i) && R.uinteger(i.line) && R.uinteger(i.character);
		}
		e.is = n;
	})(Qt || (Qt = {}));
	var He;
	(function(e) {
		function t(r, i, s, a) {
			if (R.uinteger(r) && R.uinteger(i) && R.uinteger(s) && R.uinteger(a)) return {
				start: Qt.create(r, i),
				end: Qt.create(s, a)
			};
			if (Qt.is(r) && Qt.is(i)) return {
				start: r,
				end: i
			};
			throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${a}]`);
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.objectLiteral(i) && Qt.is(i.start) && Qt.is(i.end);
		}
		e.is = n;
	})(He || (He = {}));
	var Fs;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				range: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.objectLiteral(i) && He.is(i.range) && (R.string(i.uri) || R.undefined(i.uri));
		}
		e.is = n;
	})(Fs || (Fs = {}));
	var d0;
	(function(e) {
		function t(r, i, s, a) {
			return {
				targetUri: r,
				targetRange: i,
				targetSelectionRange: s,
				originSelectionRange: a
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.objectLiteral(i) && He.is(i.targetRange) && R.string(i.targetUri) && He.is(i.targetSelectionRange) && (He.is(i.originSelectionRange) || R.undefined(i.originSelectionRange));
		}
		e.is = n;
	})(d0 || (d0 = {}));
	var Ho;
	(function(e) {
		function t(r, i, s, a) {
			return {
				red: r,
				green: i,
				blue: s,
				alpha: a
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && R.numberRange(i.red, 0, 1) && R.numberRange(i.green, 0, 1) && R.numberRange(i.blue, 0, 1) && R.numberRange(i.alpha, 0, 1);
		}
		e.is = n;
	})(Ho || (Ho = {}));
	var h0;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				color: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && He.is(i.range) && Ho.is(i.color);
		}
		e.is = n;
	})(h0 || (h0 = {}));
	var p0;
	(function(e) {
		function t(r, i, s) {
			return {
				label: r,
				textEdit: i,
				additionalTextEdits: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && R.string(i.label) && (R.undefined(i.textEdit) || Pr.is(i)) && (R.undefined(i.additionalTextEdits) || R.typedArray(i.additionalTextEdits, Pr.is));
		}
		e.is = n;
	})(p0 || (p0 = {}));
	var m0;
	(function(e) {
		e.Comment = "comment", e.Imports = "imports", e.Region = "region";
	})(m0 || (m0 = {}));
	var g0;
	(function(e) {
		function t(r, i, s, a, o, u) {
			const l = {
				startLine: r,
				endLine: i
			};
			return R.defined(s) && (l.startCharacter = s), R.defined(a) && (l.endCharacter = a), R.defined(o) && (l.kind = o), R.defined(u) && (l.collapsedText = u), l;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && R.uinteger(i.startLine) && R.uinteger(i.startLine) && (R.undefined(i.startCharacter) || R.uinteger(i.startCharacter)) && (R.undefined(i.endCharacter) || R.uinteger(i.endCharacter)) && (R.undefined(i.kind) || R.string(i.kind));
		}
		e.is = n;
	})(g0 || (g0 = {}));
	var Go;
	(function(e) {
		function t(r, i) {
			return {
				location: r,
				message: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && Fs.is(i.location) && R.string(i.message);
		}
		e.is = n;
	})(Go || (Go = {}));
	var D0;
	(function(e) {
		e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
	})(D0 || (D0 = {}));
	var y0;
	(function(e) {
		e.Unnecessary = 1, e.Deprecated = 2;
	})(y0 || (y0 = {}));
	var v0;
	(function(e) {
		function t(n) {
			const r = n;
			return R.objectLiteral(r) && R.string(r.href);
		}
		e.is = t;
	})(v0 || (v0 = {}));
	var As;
	(function(e) {
		function t(r, i, s, a, o, u) {
			let l = {
				range: r,
				message: i
			};
			return R.defined(s) && (l.severity = s), R.defined(a) && (l.code = a), R.defined(o) && (l.source = o), R.defined(u) && (l.relatedInformation = u), l;
		}
		e.create = t;
		function n(r) {
			var i;
			let s = r;
			return R.defined(s) && He.is(s.range) && R.string(s.message) && (R.number(s.severity) || R.undefined(s.severity)) && (R.integer(s.code) || R.string(s.code) || R.undefined(s.code)) && (R.undefined(s.codeDescription) || R.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (R.string(s.source) || R.undefined(s.source)) && (R.undefined(s.relatedInformation) || R.typedArray(s.relatedInformation, Go.is));
		}
		e.is = n;
	})(As || (As = {}));
	var Mr;
	(function(e) {
		function t(r, i, ...s) {
			let a = {
				title: r,
				command: i
			};
			return R.defined(s) && s.length > 0 && (a.arguments = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.string(i.title) && R.string(i.command);
		}
		e.is = n;
	})(Mr || (Mr = {}));
	var Pr;
	(function(e) {
		function t(s, a) {
			return {
				range: s,
				newText: a
			};
		}
		e.replace = t;
		function n(s, a) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: a
			};
		}
		e.insert = n;
		function r(s) {
			return {
				range: s,
				newText: ""
			};
		}
		e.del = r;
		function i(s) {
			const a = s;
			return R.objectLiteral(a) && R.string(a.newText) && He.is(a.range);
		}
		e.is = i;
	})(Pr || (Pr = {}));
	var Wo;
	(function(e) {
		function t(r, i, s) {
			const a = { label: r };
			return i !== void 0 && (a.needsConfirmation = i), s !== void 0 && (a.description = s), a;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && R.string(i.label) && (R.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (R.string(i.description) || i.description === void 0);
		}
		e.is = n;
	})(Wo || (Wo = {}));
	var Br;
	(function(e) {
		function t(n) {
			const r = n;
			return R.string(r);
		}
		e.is = t;
	})(Br || (Br = {}));
	var E0;
	(function(e) {
		function t(s, a, o) {
			return {
				range: s,
				newText: a,
				annotationId: o
			};
		}
		e.replace = t;
		function n(s, a, o) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: a,
				annotationId: o
			};
		}
		e.insert = n;
		function r(s, a) {
			return {
				range: s,
				newText: "",
				annotationId: a
			};
		}
		e.del = r;
		function i(s) {
			const a = s;
			return Pr.is(a) && (Wo.is(a.annotationId) || Br.is(a.annotationId));
		}
		e.is = i;
	})(E0 || (E0 = {}));
	var zo;
	(function(e) {
		function t(r, i) {
			return {
				textDocument: r,
				edits: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && Zo.is(i.textDocument) && Array.isArray(i.edits);
		}
		e.is = n;
	})(zo || (zo = {}));
	var Yo;
	(function(e) {
		function t(r, i, s) {
			let a = {
				kind: "create",
				uri: r
			};
			return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "create" && R.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || R.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || R.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Br.is(i.annotationId));
		}
		e.is = n;
	})(Yo || (Yo = {}));
	var Jo;
	(function(e) {
		function t(r, i, s, a) {
			let o = {
				kind: "rename",
				oldUri: r,
				newUri: i
			};
			return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (o.options = s), a !== void 0 && (o.annotationId = a), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "rename" && R.string(i.oldUri) && R.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || R.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || R.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Br.is(i.annotationId));
		}
		e.is = n;
	})(Jo || (Jo = {}));
	var Xo;
	(function(e) {
		function t(r, i, s) {
			let a = {
				kind: "delete",
				uri: r
			};
			return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (a.options = i), s !== void 0 && (a.annotationId = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "delete" && R.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || R.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || R.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || Br.is(i.annotationId));
		}
		e.is = n;
	})(Xo || (Xo = {}));
	var Qo;
	(function(e) {
		function t(n) {
			let r = n;
			return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => R.string(i.kind) ? Yo.is(i) || Jo.is(i) || Xo.is(i) : zo.is(i)));
		}
		e.is = t;
	})(Qo || (Qo = {}));
	var b0;
	(function(e) {
		function t(r) {
			return { uri: r };
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.string(i.uri);
		}
		e.is = n;
	})(b0 || (b0 = {}));
	var _0;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				version: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.string(i.uri) && R.integer(i.version);
		}
		e.is = n;
	})(_0 || (_0 = {}));
	var Zo;
	(function(e) {
		function t(r, i) {
			return {
				uri: r,
				version: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.string(i.uri) && (i.version === null || R.integer(i.version));
		}
		e.is = n;
	})(Zo || (Zo = {}));
	var N0;
	(function(e) {
		function t(r, i, s, a) {
			return {
				uri: r,
				languageId: i,
				version: s,
				text: a
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.string(i.uri) && R.string(i.languageId) && R.integer(i.version) && R.string(i.text);
		}
		e.is = n;
	})(N0 || (N0 = {}));
	var Ko;
	(function(e) {
		e.PlainText = "plaintext", e.Markdown = "markdown";
		function t(n) {
			const r = n;
			return r === e.PlainText || r === e.Markdown;
		}
		e.is = t;
	})(Ko || (Ko = {}));
	var Ei;
	(function(e) {
		function t(n) {
			const r = n;
			return R.objectLiteral(n) && Ko.is(r.kind) && R.string(r.value);
		}
		e.is = t;
	})(Ei || (Ei = {}));
	var T0;
	(function(e) {
		e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
	})(T0 || (T0 = {}));
	var Vr;
	(function(e) {
		e.PlainText = 1, e.Snippet = 2;
	})(Vr || (Vr = {}));
	var S0;
	(function(e) {
		e.Deprecated = 1;
	})(S0 || (S0 = {}));
	var F0;
	(function(e) {
		function t(r, i, s) {
			return {
				newText: r,
				insert: i,
				replace: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i && R.string(i.newText) && He.is(i.insert) && He.is(i.replace);
		}
		e.is = n;
	})(F0 || (F0 = {}));
	var cr;
	(function(e) {
		e.asIs = 1, e.adjustIndentation = 2;
	})(cr || (cr = {}));
	var A0;
	(function(e) {
		function t(n) {
			const r = n;
			return r && (R.string(r.detail) || r.detail === void 0) && (R.string(r.description) || r.description === void 0);
		}
		e.is = t;
	})(A0 || (A0 = {}));
	var C0;
	(function(e) {
		function t(n) {
			return { label: n };
		}
		e.create = t;
	})(C0 || (C0 = {}));
	var w0;
	(function(e) {
		function t(n, r) {
			return {
				items: n || [],
				isIncomplete: !!r
			};
		}
		e.create = t;
	})(w0 || (w0 = {}));
	var Cs;
	(function(e) {
		function t(r) {
			return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		e.fromPlainText = t;
		function n(r) {
			const i = r;
			return R.string(i) || R.objectLiteral(i) && R.string(i.language) && R.string(i.value);
		}
		e.is = n;
	})(Cs || (Cs = {}));
	var I0;
	(function(e) {
		function t(n) {
			let r = n;
			return !!r && R.objectLiteral(r) && (Ei.is(r.contents) || Cs.is(r.contents) || R.typedArray(r.contents, Cs.is)) && (n.range === void 0 || He.is(n.range));
		}
		e.is = t;
	})(I0 || (I0 = {}));
	var L0;
	(function(e) {
		function t(n, r) {
			return r ? {
				label: n,
				documentation: r
			} : { label: n };
		}
		e.create = t;
	})(L0 || (L0 = {}));
	var R0;
	(function(e) {
		function t(n, r, ...i) {
			let s = { label: n };
			return R.defined(r) && (s.documentation = r), R.defined(i) ? s.parameters = i : s.parameters = [], s;
		}
		e.create = t;
	})(R0 || (R0 = {}));
	var k0;
	(function(e) {
		e.Text = 1, e.Read = 2, e.Write = 3;
	})(k0 || (k0 = {}));
	var x0;
	(function(e) {
		function t(n, r) {
			let i = { range: n };
			return R.number(r) && (i.kind = r), i;
		}
		e.create = t;
	})(x0 || (x0 = {}));
	var O0;
	(function(e) {
		e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
	})(O0 || (O0 = {}));
	var M0;
	(function(e) {
		e.Deprecated = 1;
	})(M0 || (M0 = {}));
	var P0;
	(function(e) {
		function t(n, r, i, s, a) {
			let o = {
				name: n,
				kind: r,
				location: {
					uri: s,
					range: i
				}
			};
			return a && (o.containerName = a), o;
		}
		e.create = t;
	})(P0 || (P0 = {}));
	var B0;
	(function(e) {
		function t(n, r, i, s) {
			return s !== void 0 ? {
				name: n,
				kind: r,
				location: {
					uri: i,
					range: s
				}
			} : {
				name: n,
				kind: r,
				location: { uri: i }
			};
		}
		e.create = t;
	})(B0 || (B0 = {}));
	var V0;
	(function(e) {
		function t(r, i, s, a, o, u) {
			let l = {
				name: r,
				detail: i,
				kind: s,
				range: a,
				selectionRange: o
			};
			return u !== void 0 && (l.children = u), l;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && R.string(i.name) && R.number(i.kind) && He.is(i.range) && He.is(i.selectionRange) && (i.detail === void 0 || R.string(i.detail)) && (i.deprecated === void 0 || R.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
		}
		e.is = n;
	})(V0 || (V0 = {}));
	var $0;
	(function(e) {
		e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
	})($0 || ($0 = {}));
	var ws;
	(function(e) {
		e.Invoked = 1, e.Automatic = 2;
	})(ws || (ws = {}));
	var U0;
	(function(e) {
		function t(r, i, s) {
			let a = { diagnostics: r };
			return i != null && (a.only = i), s != null && (a.triggerKind = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.typedArray(i.diagnostics, As.is) && (i.only === void 0 || R.typedArray(i.only, R.string)) && (i.triggerKind === void 0 || i.triggerKind === ws.Invoked || i.triggerKind === ws.Automatic);
		}
		e.is = n;
	})(U0 || (U0 = {}));
	var j0;
	(function(e) {
		function t(r, i, s) {
			let a = { title: r }, o = !0;
			return typeof i == "string" ? (o = !1, a.kind = i) : Mr.is(i) ? a.command = i : a.edit = i, o && s !== void 0 && (a.kind = s), a;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && R.string(i.title) && (i.diagnostics === void 0 || R.typedArray(i.diagnostics, As.is)) && (i.kind === void 0 || R.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || Mr.is(i.command)) && (i.isPreferred === void 0 || R.boolean(i.isPreferred)) && (i.edit === void 0 || Qo.is(i.edit));
		}
		e.is = n;
	})(j0 || (j0 = {}));
	var q0;
	(function(e) {
		function t(r, i) {
			let s = { range: r };
			return R.defined(i) && (s.data = i), s;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && He.is(i.range) && (R.undefined(i.command) || Mr.is(i.command));
		}
		e.is = n;
	})(q0 || (q0 = {}));
	var H0;
	(function(e) {
		function t(r, i) {
			return {
				tabSize: r,
				insertSpaces: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && R.uinteger(i.tabSize) && R.boolean(i.insertSpaces);
		}
		e.is = n;
	})(H0 || (H0 = {}));
	var G0;
	(function(e) {
		function t(r, i, s) {
			return {
				range: r,
				target: i,
				data: s
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.defined(i) && He.is(i.range) && (R.undefined(i.target) || R.string(i.target));
		}
		e.is = n;
	})(G0 || (G0 = {}));
	var W0;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				parent: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return R.objectLiteral(i) && He.is(i.range) && (i.parent === void 0 || e.is(i.parent));
		}
		e.is = n;
	})(W0 || (W0 = {}));
	var z0;
	(function(e) {
		e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator";
	})(z0 || (z0 = {}));
	var Y0;
	(function(e) {
		e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
	})(Y0 || (Y0 = {}));
	var J0;
	(function(e) {
		function t(n) {
			const r = n;
			return R.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
		}
		e.is = t;
	})(J0 || (J0 = {}));
	var X0;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				text: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && He.is(i.range) && R.string(i.text);
		}
		e.is = n;
	})(X0 || (X0 = {}));
	var Q0;
	(function(e) {
		function t(r, i, s) {
			return {
				range: r,
				variableName: i,
				caseSensitiveLookup: s
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && He.is(i.range) && R.boolean(i.caseSensitiveLookup) && (R.string(i.variableName) || i.variableName === void 0);
		}
		e.is = n;
	})(Q0 || (Q0 = {}));
	var Z0;
	(function(e) {
		function t(r, i) {
			return {
				range: r,
				expression: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return i != null && He.is(i.range) && (R.string(i.expression) || i.expression === void 0);
		}
		e.is = n;
	})(Z0 || (Z0 = {}));
	var K0;
	(function(e) {
		function t(r, i) {
			return {
				frameId: r,
				stoppedLocation: i
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.defined(i) && He.is(r.stoppedLocation);
		}
		e.is = n;
	})(K0 || (K0 = {}));
	var eu;
	(function(e) {
		e.Type = 1, e.Parameter = 2;
		function t(n) {
			return n === 1 || n === 2;
		}
		e.is = t;
	})(eu || (eu = {}));
	var tu;
	(function(e) {
		function t(r) {
			return { value: r };
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && (i.tooltip === void 0 || R.string(i.tooltip) || Ei.is(i.tooltip)) && (i.location === void 0 || Fs.is(i.location)) && (i.command === void 0 || Mr.is(i.command));
		}
		e.is = n;
	})(tu || (tu = {}));
	var ed;
	(function(e) {
		function t(r, i, s) {
			const a = {
				position: r,
				label: i
			};
			return s !== void 0 && (a.kind = s), a;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return R.objectLiteral(i) && Qt.is(i.position) && (R.string(i.label) || R.typedArray(i.label, tu.is)) && (i.kind === void 0 || eu.is(i.kind)) && i.textEdits === void 0 || R.typedArray(i.textEdits, Pr.is) && (i.tooltip === void 0 || R.string(i.tooltip) || Ei.is(i.tooltip)) && (i.paddingLeft === void 0 || R.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || R.boolean(i.paddingRight));
		}
		e.is = n;
	})(ed || (ed = {}));
	var td;
	(function(e) {
		function t(n) {
			return {
				kind: "snippet",
				value: n
			};
		}
		e.createSnippet = t;
	})(td || (td = {}));
	var nd;
	(function(e) {
		function t(n, r, i, s) {
			return {
				insertText: n,
				filterText: r,
				range: i,
				command: s
			};
		}
		e.create = t;
	})(nd || (nd = {}));
	var rd;
	(function(e) {
		function t(n) {
			return { items: n };
		}
		e.create = t;
	})(rd || (rd = {}));
	var id;
	(function(e) {
		e.Invoked = 0, e.Automatic = 1;
	})(id || (id = {}));
	var sd;
	(function(e) {
		function t(n, r) {
			return {
				range: n,
				text: r
			};
		}
		e.create = t;
	})(sd || (sd = {}));
	var ad;
	(function(e) {
		function t(n, r) {
			return {
				triggerKind: n,
				selectedCompletionInfo: r
			};
		}
		e.create = t;
	})(ad || (ad = {}));
	var od;
	(function(e) {
		function t(n) {
			const r = n;
			return R.objectLiteral(r) && qo.is(r.uri) && R.string(r.name);
		}
		e.is = t;
	})(od || (od = {}));
	var ud;
	(function(e) {
		function t(s, a, o, u) {
			return new B7(s, a, o, u);
		}
		e.create = t;
		function n(s) {
			let a = s;
			return !!(R.defined(a) && R.string(a.uri) && (R.undefined(a.languageId) || R.string(a.languageId)) && R.uinteger(a.lineCount) && R.func(a.getText) && R.func(a.positionAt) && R.func(a.offsetAt));
		}
		e.is = n;
		function r(s, a) {
			let o = s.getText(), u = i(a, (c, d) => {
				let m = c.range.start.line - d.range.start.line;
				return m === 0 ? c.range.start.character - d.range.start.character : m;
			}), l = o.length;
			for (let c = u.length - 1; c >= 0; c--) {
				let d = u[c], m = s.offsetAt(d.range.start), p = s.offsetAt(d.range.end);
				if (p <= l) o = o.substring(0, m) + d.newText + o.substring(p, o.length);
				else throw new Error("Overlapping edit");
				l = m;
			}
			return o;
		}
		e.applyEdits = r;
		function i(s, a) {
			if (s.length <= 1) return s;
			const o = s.length / 2 | 0, u = s.slice(0, o), l = s.slice(o);
			i(u, a), i(l, a);
			let c = 0, d = 0, m = 0;
			for (; c < u.length && d < l.length;) a(u[c], l[d]) <= 0 ? s[m++] = u[c++] : s[m++] = l[d++];
			for (; c < u.length;) s[m++] = u[c++];
			for (; d < l.length;) s[m++] = l[d++];
			return s;
		}
	})(ud || (ud = {}));
	var B7 = class {
		constructor(e, t, n, r) {
			this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(e) {
			if (e) {
				let t = this.offsetAt(e.start), n = this.offsetAt(e.end);
				return this._content.substring(t, n);
			}
			return this._content;
		}
		update(e, t) {
			this._content = e.text, this._version = t, this._lineOffsets = void 0;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) {
				let e = [], t = this._content, n = !0;
				for (let r = 0; r < t.length; r++) {
					n && (e.push(r), n = !1);
					let i = t.charAt(r);
					n = i === "\r" || i === `
`, i === "\r" && r + 1 < t.length && t.charAt(r + 1) === `
` && r++;
				}
				n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
			}
			return this._lineOffsets;
		}
		positionAt(e) {
			e = Math.max(Math.min(e, this._content.length), 0);
			let t = this.getLineOffsets(), n = 0, r = t.length;
			if (r === 0) return Qt.create(0, e);
			for (; n < r;) {
				let s = Math.floor((n + r) / 2);
				t[s] > e ? r = s : n = s + 1;
			}
			let i = n - 1;
			return Qt.create(i, e - t[i]);
		}
		offsetAt(e) {
			let t = this.getLineOffsets();
			if (e.line >= t.length) return this._content.length;
			if (e.line < 0) return 0;
			let n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
			return Math.max(Math.min(n + e.character, r), n);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
	}, R;
	(function(e) {
		const t = Object.prototype.toString;
		function n(p) {
			return typeof p < "u";
		}
		e.defined = n;
		function r(p) {
			return typeof p > "u";
		}
		e.undefined = r;
		function i(p) {
			return p === !0 || p === !1;
		}
		e.boolean = i;
		function s(p) {
			return t.call(p) === "[object String]";
		}
		e.string = s;
		function a(p) {
			return t.call(p) === "[object Number]";
		}
		e.number = a;
		function o(p, g, v) {
			return t.call(p) === "[object Number]" && g <= p && p <= v;
		}
		e.numberRange = o;
		function u(p) {
			return t.call(p) === "[object Number]" && -2147483648 <= p && p <= 2147483647;
		}
		e.integer = u;
		function l(p) {
			return t.call(p) === "[object Number]" && 0 <= p && p <= 2147483647;
		}
		e.uinteger = l;
		function c(p) {
			return t.call(p) === "[object Function]";
		}
		e.func = c;
		function d(p) {
			return p !== null && typeof p == "object";
		}
		e.objectLiteral = d;
		function m(p, g) {
			return Array.isArray(p) && p.every(g);
		}
		e.typedArray = m;
	})(R || (R = {}));
	var nu = class {
		constructor(e) {
			this._start = 0, this._pos = 0, this.getStartOfToken = () => this._start, this.getCurrentPosition = () => this._pos, this.eol = () => this._sourceText.length === this._pos, this.sol = () => this._pos === 0, this.peek = () => this._sourceText.charAt(this._pos) || null, this.next = () => {
				const t = this._sourceText.charAt(this._pos);
				return this._pos++, t;
			}, this.eat = (t) => {
				if (this._testNextCharacter(t)) return this._start = this._pos, this._pos++, this._sourceText.charAt(this._pos - 1);
			}, this.eatWhile = (t) => {
				let n = this._testNextCharacter(t), r = !1;
				for (n && (r = n, this._start = this._pos); n;) this._pos++, n = this._testNextCharacter(t), r = !0;
				return r;
			}, this.eatSpace = () => this.eatWhile(/[\s\u00a0]/), this.skipToEnd = () => {
				this._pos = this._sourceText.length;
			}, this.skipTo = (t) => {
				this._pos = t;
			}, this.match = (t, n = !0, r = !1) => {
				let i = null, s = null;
				return typeof t == "string" ? (s = new RegExp(t, r ? "i" : "g").test(this._sourceText.slice(this._pos, this._pos + t.length)), i = t) : t instanceof RegExp && (s = this._sourceText.slice(this._pos).match(t), i = s?.[0]), s != null && (typeof t == "string" || s instanceof Array && this._sourceText.startsWith(s[0], this._pos)) ? (n && (this._start = this._pos, i && i.length && (this._pos += i.length)), s) : !1;
			}, this.backUp = (t) => {
				this._pos -= t;
			}, this.column = () => this._pos, this.indentation = () => {
				const t = this._sourceText.match(/\s*/);
				let n = 0;
				if (t && t.length !== 0) {
					const r = t[0];
					let i = 0;
					for (; r.length > i;) r.charCodeAt(i) === 9 ? n += 2 : n++, i++;
				}
				return n;
			}, this.current = () => this._sourceText.slice(this._start, this._pos), this._sourceText = e;
		}
		_testNextCharacter(e) {
			const t = this._sourceText.charAt(this._pos);
			let n = !1;
			return typeof e == "string" ? n = t === e : n = e instanceof RegExp ? e.test(t) : e(t), n;
		}
	};
	function Pe(e) {
		return { ofRule: e };
	}
	function Te(e, t) {
		return {
			ofRule: e,
			isList: !0,
			separator: t
		};
	}
	function V7(e, t) {
		const n = e.match;
		return e.match = (r) => {
			let i = !1;
			return n && (i = n(r)), i && t.every((s) => s.match && !s.match(r));
		}, e;
	}
	function ru(e, t) {
		return {
			style: t,
			match: (n) => n.kind === e
		};
	}
	function pe(e, t) {
		return {
			style: t || "punctuation",
			match: (n) => n.kind === "Punctuation" && n.value === e
		};
	}
	const $7 = (e) => e === " " || e === "	" || e === "," || e === `
` || e === "\r" || e === "﻿" || e === "\xA0", U7 = {
		Name: /^[_A-Za-z][_0-9A-Za-z]*/,
		Punctuation: /^(?:!|\$|\(|\)|\.\.\.|:|=|&|@|\[|]|\{|\||\})/,
		Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
		String: /^(?:"""(?:\\"""|[^"]|"[^"]|""[^"])*(?:""")?|"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?)/,
		Comment: /^#.*/
	}, j7 = {
		Document: [Te("Definition")],
		Definition(e) {
			switch (e.value) {
				case "{": return "ShortQuery";
				case "query": return "Query";
				case "mutation": return "Mutation";
				case "subscription": return "Subscription";
				case "fragment": return E.FRAGMENT_DEFINITION;
				case "schema": return "SchemaDef";
				case "scalar": return "ScalarDef";
				case "type": return "ObjectTypeDef";
				case "interface": return "InterfaceDef";
				case "union": return "UnionDef";
				case "enum": return "EnumDef";
				case "input": return "InputDef";
				case "extend": return "ExtendDef";
				case "directive": return "DirectiveDef";
			}
		},
		ShortQuery: ["SelectionSet"],
		Query: [
			dt("query"),
			Pe(Oe("def")),
			Pe("VariableDefinitions"),
			Te("Directive"),
			"SelectionSet"
		],
		Mutation: [
			dt("mutation"),
			Pe(Oe("def")),
			Pe("VariableDefinitions"),
			Te("Directive"),
			"SelectionSet"
		],
		Subscription: [
			dt("subscription"),
			Pe(Oe("def")),
			Pe("VariableDefinitions"),
			Te("Directive"),
			"SelectionSet"
		],
		VariableDefinitions: [
			pe("("),
			Te("VariableDefinition"),
			pe(")")
		],
		VariableDefinition: [
			"Variable",
			pe(":"),
			"Type",
			Pe("DefaultValue")
		],
		Variable: [pe("$", "variable"), Oe("variable")],
		DefaultValue: [pe("="), "Value"],
		SelectionSet: [
			pe("{"),
			Te("Selection"),
			pe("}")
		],
		Selection(e, t) {
			return e.value === "..." ? t.match(/[\s\u00a0,]*(on\b|@|{)/, !1) ? "InlineFragment" : "FragmentSpread" : t.match(/[\s\u00a0,]*:/, !1) ? "AliasedField" : "Field";
		},
		AliasedField: [
			Oe("property"),
			pe(":"),
			Oe("qualifier"),
			Pe("Arguments"),
			Te("Directive"),
			Pe("SelectionSet")
		],
		Field: [
			Oe("property"),
			Pe("Arguments"),
			Te("Directive"),
			Pe("SelectionSet")
		],
		Arguments: [
			pe("("),
			Te("Argument"),
			pe(")")
		],
		Argument: [
			Oe("attribute"),
			pe(":"),
			"Value"
		],
		FragmentSpread: [
			pe("..."),
			Oe("def"),
			Te("Directive")
		],
		InlineFragment: [
			pe("..."),
			Pe("TypeCondition"),
			Te("Directive"),
			"SelectionSet"
		],
		FragmentDefinition: [
			dt("fragment"),
			Pe(V7(Oe("def"), [dt("on")])),
			"TypeCondition",
			Te("Directive"),
			"SelectionSet"
		],
		TypeCondition: [dt("on"), "NamedType"],
		Value(e) {
			switch (e.kind) {
				case "Number": return "NumberValue";
				case "String": return "StringValue";
				case "Punctuation":
					switch (e.value) {
						case "[": return "ListValue";
						case "{": return "ObjectValue";
						case "$": return "Variable";
						case "&": return "NamedType";
					}
					return null;
				case "Name":
					switch (e.value) {
						case "true":
						case "false": return "BooleanValue";
					}
					return e.value === "null" ? "NullValue" : "EnumValue";
			}
		},
		NumberValue: [ru("Number", "number")],
		StringValue: [{
			style: "string",
			match: (e) => e.kind === "String",
			update(e, t) {
				t.value.startsWith("\"\"\"") && (e.inBlockstring = !t.value.slice(3).endsWith("\"\"\""));
			}
		}],
		BooleanValue: [ru("Name", "builtin")],
		NullValue: [ru("Name", "keyword")],
		EnumValue: [Oe("string-2")],
		ListValue: [
			pe("["),
			Te("Value"),
			pe("]")
		],
		ObjectValue: [
			pe("{"),
			Te("ObjectField"),
			pe("}")
		],
		ObjectField: [
			Oe("attribute"),
			pe(":"),
			"Value"
		],
		Type(e) {
			return e.value === "[" ? "ListType" : "NonNullType";
		},
		ListType: [
			pe("["),
			"Type",
			pe("]"),
			Pe(pe("!"))
		],
		NonNullType: ["NamedType", Pe(pe("!"))],
		NamedType: [q7("atom")],
		Directive: [
			pe("@", "meta"),
			Oe("meta"),
			Pe("Arguments")
		],
		DirectiveDef: [
			dt("directive"),
			pe("@", "meta"),
			Oe("meta"),
			Pe("ArgumentsDef"),
			dt("on"),
			Te("DirectiveLocation", pe("|"))
		],
		InterfaceDef: [
			dt("interface"),
			Oe("atom"),
			Pe("Implements"),
			Te("Directive"),
			Pe("FieldsDef")
		],
		Implements: [dt("implements"), Te("NamedType", pe("&"))],
		DirectiveLocation: [Oe("string-2")],
		SchemaDef: [
			dt("schema"),
			Te("Directive"),
			pe("{"),
			Te("OperationTypeDef"),
			pe("}")
		],
		OperationTypeDef: [
			Oe("keyword"),
			pe(":"),
			Oe("atom")
		],
		ScalarDef: [
			dt("scalar"),
			Oe("atom"),
			Te("Directive")
		],
		ObjectTypeDef: [
			dt("type"),
			Oe("atom"),
			Pe("Implements"),
			Te("Directive"),
			Pe("FieldsDef")
		],
		FieldsDef: [
			pe("{"),
			Te("FieldDef"),
			pe("}")
		],
		FieldDef: [
			Oe("property"),
			Pe("ArgumentsDef"),
			pe(":"),
			"Type",
			Te("Directive")
		],
		ArgumentsDef: [
			pe("("),
			Te("InputValueDef"),
			pe(")")
		],
		InputValueDef: [
			Oe("attribute"),
			pe(":"),
			"Type",
			Pe("DefaultValue"),
			Te("Directive")
		],
		UnionDef: [
			dt("union"),
			Oe("atom"),
			Te("Directive"),
			pe("="),
			Te("UnionMember", pe("|"))
		],
		UnionMember: ["NamedType"],
		EnumDef: [
			dt("enum"),
			Oe("atom"),
			Te("Directive"),
			Pe("EnumValuesDef")
		],
		EnumValuesDef: [
			pe("{"),
			Te("EnumValueDef"),
			pe("}")
		],
		EnumValueDef: [Oe("string-2"), Te("Directive")],
		InputDef: [
			dt("input"),
			Oe("atom"),
			Te("Directive"),
			Pe("InputFieldsDef")
		],
		InputFieldsDef: [
			pe("{"),
			Te("InputValueDef"),
			pe("}")
		],
		ExtendDef: [dt("extend"), "ExtensionDefinition"],
		ExtensionDefinition(e) {
			switch (e.value) {
				case "schema": return E.SCHEMA_EXTENSION;
				case "scalar": return E.SCALAR_TYPE_EXTENSION;
				case "type": return E.OBJECT_TYPE_EXTENSION;
				case "interface": return E.INTERFACE_TYPE_EXTENSION;
				case "union": return E.UNION_TYPE_EXTENSION;
				case "enum": return E.ENUM_TYPE_EXTENSION;
				case "input": return E.INPUT_OBJECT_TYPE_EXTENSION;
			}
		},
		[E.SCHEMA_EXTENSION]: ["SchemaDef"],
		[E.SCALAR_TYPE_EXTENSION]: ["ScalarDef"],
		[E.OBJECT_TYPE_EXTENSION]: ["ObjectTypeDef"],
		[E.INTERFACE_TYPE_EXTENSION]: ["InterfaceDef"],
		[E.UNION_TYPE_EXTENSION]: ["UnionDef"],
		[E.ENUM_TYPE_EXTENSION]: ["EnumDef"],
		[E.INPUT_OBJECT_TYPE_EXTENSION]: ["InputDef"]
	};
	function dt(e) {
		return {
			style: "keyword",
			match: (t) => t.kind === "Name" && t.value === e
		};
	}
	function Oe(e) {
		return {
			style: e,
			match: (t) => t.kind === "Name",
			update(t, n) {
				t.name = n.value;
			}
		};
	}
	function q7(e) {
		return {
			style: e,
			match: (t) => t.kind === "Name",
			update(t, n) {
				var r;
				!((r = t.prevState) === null || r === void 0) && r.prevState && (t.name = n.value, t.prevState.prevState.type = n.value);
			}
		};
	}
	function ld(e = {
		eatWhitespace: (t) => t.eatWhile($7),
		lexRules: U7,
		parseRules: j7,
		editorConfig: {}
	}) {
		return {
			startState() {
				const t = {
					level: 0,
					step: 0,
					name: null,
					kind: null,
					type: null,
					rule: null,
					needsSeparator: !1,
					prevState: null
				};
				return bi(e.parseRules, t, E.DOCUMENT), t;
			},
			token(t, n) {
				return H7(t, n, e);
			}
		};
	}
	function H7(e, t, n) {
		var r;
		if (t.inBlockstring) return e.match(/.*"""/) ? (t.inBlockstring = !1, "string") : (e.skipToEnd(), "string");
		const { lexRules: i, parseRules: s, eatWhitespace: a, editorConfig: o } = n;
		if (t.rule && t.rule.length === 0 ? su(t) : t.needsAdvance && (t.needsAdvance = !1, au(t, !0)), e.sol()) {
			const c = o?.tabSize || 2;
			t.indentLevel = Math.floor(e.indentation() / c);
		}
		if (a(e)) return "ws";
		const u = W7(i, e);
		if (!u) return e.match(/\S+/) || e.match(/\s/), bi(iu, t, "Invalid"), "invalidchar";
		if (u.kind === "Comment") return bi(iu, t, "Comment"), "comment";
		const l = cd({}, t);
		if (u.kind === "Punctuation") {
			if (/^[{([]/.test(u.value)) t.indentLevel !== void 0 && (t.levels = (t.levels || []).concat(t.indentLevel + 1));
			else if (/^[})\]]/.test(u.value)) {
				const c = t.levels = (t.levels || []).slice(0, -1);
				t.indentLevel && c.length > 0 && c.at(-1) < t.indentLevel && (t.indentLevel = c.at(-1));
			}
		}
		for (; t.rule;) {
			let c = typeof t.rule == "function" ? t.step === 0 ? t.rule(u, e) : null : t.rule[t.step];
			if (t.needsSeparator && (c = c?.separator), c) {
				if (c.ofRule && (c = c.ofRule), typeof c == "string") {
					bi(s, t, c);
					continue;
				}
				if (!((r = c.match) === null || r === void 0) && r.call(c, u)) return c.update && c.update(t, u), u.kind === "Punctuation" ? au(t, !0) : t.needsAdvance = !0, c.style;
			}
			G7(t);
		}
		return cd(t, l), bi(iu, t, "Invalid"), "invalidchar";
	}
	function cd(e, t) {
		const n = Object.keys(t);
		for (let r = 0; r < n.length; r++) e[n[r]] = t[n[r]];
		return e;
	}
	const iu = {
		Invalid: [],
		Comment: []
	};
	function bi(e, t, n) {
		if (!e[n]) throw new TypeError("Unknown rule: " + n);
		t.prevState = Object.assign({}, t), t.kind = n, t.name = null, t.type = null, t.rule = e[n], t.step = 0, t.needsSeparator = !1;
	}
	function su(e) {
		e.prevState && (e.kind = e.prevState.kind, e.name = e.prevState.name, e.type = e.prevState.type, e.rule = e.prevState.rule, e.step = e.prevState.step, e.needsSeparator = e.prevState.needsSeparator, e.prevState = e.prevState.prevState);
	}
	function au(e, t) {
		var n;
		if (fd(e) && e.rule) {
			const r = e.rule[e.step];
			if (r.separator) {
				const { separator: i } = r;
				if (e.needsSeparator = !e.needsSeparator, !e.needsSeparator && i.ofRule) return;
			}
			if (t) return;
		}
		for (e.needsSeparator = !1, e.step++; e.rule && !(Array.isArray(e.rule) && e.step < e.rule.length);) su(e), e.rule && (fd(e) ? !((n = e.rule) === null || n === void 0) && n[e.step].separator && (e.needsSeparator = !e.needsSeparator) : (e.needsSeparator = !1, e.step++));
	}
	function fd(e) {
		const t = Array.isArray(e.rule) && typeof e.rule[e.step] != "string" && e.rule[e.step];
		return t && t.isList;
	}
	function G7(e) {
		for (; e.rule && !(Array.isArray(e.rule) && e.rule[e.step].ofRule);) su(e);
		e.rule && au(e, !1);
	}
	function W7(e, t) {
		const n = Object.keys(e);
		for (let r = 0; r < n.length; r++) {
			const i = t.match(e[n[r]]);
			if (i && i instanceof Array) return {
				kind: n[r],
				value: i[0]
			};
		}
	}
	function Is(e, t) {
		const n = e.split(`
`), r = ld();
		let i = r.startState(), s = "", a = new nu("");
		for (let o = 0; o < n.length; o++) {
			for (a = new nu(n[o]); !a.eol() && (s = r.token(a, i), t(a, i, s, o) !== "BREAK"););
			t(a, i, s, o), i.kind || (i = r.startState());
		}
		return {
			start: a.getStartOfToken(),
			end: a.getCurrentPosition(),
			string: a.current(),
			state: i,
			style: s
		};
	}
	var zn;
	(function(e) {
		e.TYPE_SYSTEM = "TYPE_SYSTEM", e.EXECUTABLE = "EXECUTABLE", e.UNKNOWN = "UNKNOWN";
	})(zn || (zn = {}));
	const z7 = [
		E.SCHEMA_DEFINITION,
		E.OPERATION_TYPE_DEFINITION,
		E.SCALAR_TYPE_DEFINITION,
		E.OBJECT_TYPE_DEFINITION,
		E.INTERFACE_TYPE_DEFINITION,
		E.UNION_TYPE_DEFINITION,
		E.ENUM_TYPE_DEFINITION,
		E.INPUT_OBJECT_TYPE_DEFINITION,
		E.DIRECTIVE_DEFINITION,
		E.SCHEMA_EXTENSION,
		E.SCALAR_TYPE_EXTENSION,
		E.OBJECT_TYPE_EXTENSION,
		E.INTERFACE_TYPE_EXTENSION,
		E.UNION_TYPE_EXTENSION,
		E.ENUM_TYPE_EXTENSION,
		E.INPUT_OBJECT_TYPE_EXTENSION
	], Y7 = (e) => {
		let t = zn.UNKNOWN;
		if (e) try {
			jn(ls(e), { enter(n) {
				if (n.kind === "Document") {
					t = zn.EXECUTABLE;
					return;
				}
				return z7.includes(n.kind) ? (t = zn.TYPE_SYSTEM, Lr) : !1;
			} });
		} catch {
			return t;
		}
		return t;
	};
	function J7(e, t) {
		return t?.endsWith(".graphqls") ? zn.TYPE_SYSTEM : Y7(e);
	}
	function dd(e, t, n = 0) {
		let r = null, i = null, s = null;
		const a = Is(e, (o, u, l, c) => {
			if (!(c !== t.line || o.getCurrentPosition() + n < t.character + 1)) return r = l, i = Object.assign({}, u), s = o.current(), "BREAK";
		});
		return {
			start: a.start,
			end: a.end,
			string: s || a.string,
			state: i || a.state,
			style: r || a.style
		};
	}
	function hd(e, t, n, r, i, s = 0) {
		const a = r || dd(e, t, s);
		if (!a) return null;
		const o = a.state.kind === "Invalid" ? a.state.prevState : a.state;
		return o ? {
			token: a,
			state: o,
			typeInfo: Q7(n, a.state),
			mode: i?.mode || J7(e, i?.uri)
		} : null;
	}
	function pd(e, t, n) {
		return n === mi.name && e.getQueryType() === t ? mi : n === gi.name && e.getQueryType() === t ? gi : n === Di.name && kt(t) ? Di : "getFields" in t ? t.getFields()[n] : null;
	}
	function md(e, t) {
		const n = [];
		let r = e;
		for (; r?.kind;) n.push(r), r = r.prevState;
		for (let i = n.length - 1; i >= 0; i--) t(n[i]);
	}
	function X7(e) {
		let t;
		return md(e, (n) => {
			switch (n.kind) {
				case "Query":
				case "ShortQuery":
				case "Mutation":
				case "Subscription":
				case "FragmentDefinition":
					t = n;
					break;
			}
		}), t;
	}
	function Q7(e, t) {
		let n, r, i, s, a, o, u, l, c, d, m;
		return md(t, (p) => {
			var g;
			switch (p.kind) {
				case z.QUERY:
				case "ShortQuery":
					d = e.getQueryType();
					break;
				case z.MUTATION:
					d = e.getMutationType();
					break;
				case z.SUBSCRIPTION:
					d = e.getSubscriptionType();
					break;
				case z.INLINE_FRAGMENT:
				case z.FRAGMENT_DEFINITION:
					p.type && (d = e.getType(p.type));
					break;
				case z.FIELD:
				case z.ALIASED_FIELD:
					!d || !p.name ? a = null : (a = c ? pd(e, c, p.name) : null, d = a ? a.type : null);
					break;
				case z.SELECTION_SET:
					c = je(d);
					break;
				case z.DIRECTIVE:
					i = p.name ? e.getDirective(p.name) : null;
					break;
				case z.INTERFACE_DEF:
					p.name && (u = null, m = new qn({
						name: p.name,
						interfaces: [],
						fields: {}
					}));
					break;
				case z.OBJECT_TYPE_DEF:
					p.name && (m = null, u = new Ut({
						name: p.name,
						interfaces: [],
						fields: {}
					}));
					break;
				case z.ARGUMENTS:
					if (p.prevState) switch (p.prevState.kind) {
						case z.FIELD:
							r = a && a.args;
							break;
						case z.DIRECTIVE:
							r = i && i.args;
							break;
						case z.ALIASED_FIELD: {
							const w = (g = p.prevState) === null || g === void 0 ? void 0 : g.name;
							if (!w) {
								r = null;
								break;
							}
							const T = c ? pd(e, c, w) : null;
							if (!T) {
								r = null;
								break;
							}
							r = T.args;
							break;
						}
						default:
							r = null;
							break;
					}
					else r = null;
					break;
				case z.ARGUMENT:
					if (r) {
						for (let w = 0; w < r.length; w++) if (r[w].name === p.name) {
							n = r[w];
							break;
						}
					}
					o = n?.type;
					break;
				case z.VARIABLE_DEFINITION:
				case z.VARIABLE:
					d = o;
					break;
				case z.ENUM_VALUE:
					const v = je(o);
					s = v instanceof Hn ? v.getValues().find((w) => w.value === p.name) : null;
					break;
				case z.LIST_VALUE:
					const F = bo(o);
					o = F instanceof ct ? F.ofType : null;
					break;
				case z.OBJECT_VALUE:
					const S = je(o);
					l = S instanceof di ? S.getFields() : null;
					break;
				case z.OBJECT_FIELD:
					const C = p.name && l ? l[p.name] : null;
					o = C?.type, a = C, d = a ? a.type : null;
					break;
				case z.NAMED_TYPE:
					p.name && (d = e.getType(p.name));
					break;
			}
		}), {
			argDef: n,
			argDefs: r,
			directiveDef: i,
			enumValue: s,
			fieldDef: a,
			inputType: o,
			objectFieldDefs: l,
			parentType: c,
			type: d,
			interfaceDef: m,
			objectTypeDef: u
		};
	}
	const z = Object.assign(Object.assign({}, E), {
		ALIASED_FIELD: "AliasedField",
		ARGUMENTS: "Arguments",
		SHORT_QUERY: "ShortQuery",
		QUERY: "Query",
		MUTATION: "Mutation",
		SUBSCRIPTION: "Subscription",
		TYPE_CONDITION: "TypeCondition",
		INVALID: "Invalid",
		COMMENT: "Comment",
		SCHEMA_DEF: "SchemaDef",
		SCALAR_DEF: "ScalarDef",
		OBJECT_TYPE_DEF: "ObjectTypeDef",
		OBJECT_VALUE: "ObjectValue",
		LIST_VALUE: "ListValue",
		INTERFACE_DEF: "InterfaceDef",
		UNION_DEF: "UnionDef",
		ENUM_DEF: "EnumDef",
		ENUM_VALUE: "EnumValue",
		FIELD_DEF: "FieldDef",
		INPUT_DEF: "InputDef",
		INPUT_VALUE_DEF: "InputValueDef",
		ARGUMENTS_DEF: "ArgumentsDef",
		EXTEND_DEF: "ExtendDef",
		EXTENSION_DEFINITION: "ExtensionDefinition",
		DIRECTIVE_DEF: "DirectiveDef",
		IMPLEMENTS: "Implements",
		VARIABLE_DEFINITIONS: "VariableDefinitions",
		TYPE: "Type",
		VARIABLE: "Variable"
	});
	var ge;
	(function(e) {
		e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
	})(ge || (ge = {}));
	const ou = {
		command: "editor.action.triggerSuggest",
		title: "Suggestions"
	}, K7 = (e) => {
		const t = [];
		if (e) try {
			jn(ls(e), { FragmentDefinition(n) {
				t.push(n);
			} });
		} catch {
			return [];
		}
		return t;
	};
	function e9(e, t, n, r, i, s) {
		var a;
		const o = Object.assign(Object.assign({}, s), { schema: e }), u = hd(t, n, e, r, s, 1);
		if (!u) return [];
		const { state: l, typeInfo: c, mode: d, token: m } = u, { kind: p, step: g, prevState: v } = l;
		if (p === z.DOCUMENT) return d === zn.TYPE_SYSTEM ? t9(m) : d === zn.EXECUTABLE ? n9(m) : r9(m);
		if (p === z.EXTEND_DEF) return i9(m);
		if (((a = v?.prevState) === null || a === void 0 ? void 0 : a.kind) === z.EXTENSION_DEFINITION && l.name) return Me(m, []);
		if (v?.kind === E.SCALAR_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter($t).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (v?.kind === E.OBJECT_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter((S) => we(S) && !S.name.startsWith("__")).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (v?.kind === E.INTERFACE_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter(xe).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (v?.kind === E.UNION_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter(Lt).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (v?.kind === E.ENUM_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter((S) => Dt(S) && !S.name.startsWith("__")).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (v?.kind === E.INPUT_OBJECT_TYPE_EXTENSION) return Me(m, Object.values(e.getTypeMap()).filter(ze).map((S) => ({
			label: S.name,
			kind: ge.Function
		})));
		if (p === z.IMPLEMENTS || p === z.NAMED_TYPE && v?.kind === z.IMPLEMENTS) return o9(m, l, e, t, c);
		if (p === z.SELECTION_SET || p === z.FIELD || p === z.ALIASED_FIELD) return s9(m, c, o);
		if (p === z.ARGUMENTS || p === z.ARGUMENT && g === 0) {
			const { argDefs: S } = c;
			if (S) return Me(m, S.map((C) => {
				var w;
				return {
					label: C.name,
					insertText: l0(C.name + ": ", C.type),
					insertTextMode: cr.adjustIndentation,
					insertTextFormat: Vr.Snippet,
					command: ou,
					labelDetails: { detail: " " + String(C.type) },
					documentation: (w = C.description) !== null && w !== void 0 ? w : void 0,
					kind: ge.Variable,
					type: C.type
				};
			}));
		}
		if ((p === z.OBJECT_VALUE || p === z.OBJECT_FIELD && g === 0) && c.objectFieldDefs) {
			const S = lr(c.objectFieldDefs), C = p === z.OBJECT_VALUE ? ge.Value : ge.Field;
			return Me(m, S.map((w) => {
				var T;
				return {
					label: w.name,
					detail: String(w.type),
					documentation: (T = w?.description) !== null && T !== void 0 ? T : void 0,
					kind: C,
					type: w.type,
					insertText: l0(w.name + ": ", w.type),
					insertTextMode: cr.adjustIndentation,
					insertTextFormat: Vr.Snippet,
					command: ou
				};
			}));
		}
		if (p === z.ENUM_VALUE || p === z.LIST_VALUE && g === 1 || p === z.OBJECT_FIELD && g === 2 || p === z.ARGUMENT && g === 2) return a9(m, c, t, e);
		if (p === z.VARIABLE && g === 1) {
			const S = je(c.inputType);
			return Me(m, Dd(t, e, m).filter((C) => C.detail === S?.name));
		}
		if (p === z.TYPE_CONDITION && g === 1 || p === z.NAMED_TYPE && v != null && v.kind === z.TYPE_CONDITION) return u9(m, c, e, p);
		if (p === z.FRAGMENT_SPREAD && g === 1) return l9(m, c, e, t, Array.isArray(i) ? i : K7(i));
		const F = yd(l);
		return F.kind === z.FIELD_DEF ? Me(m, Object.values(e.getTypeMap()).filter((S) => ar(S) && !S.name.startsWith("__")).map((S) => ({
			label: S.name,
			kind: ge.Function,
			insertText: s?.fillLeafsOnComplete ? S.name + `
` : S.name,
			insertTextMode: cr.adjustIndentation
		}))) : F.kind === z.INPUT_VALUE_DEF && g === 2 ? Me(m, Object.values(e.getTypeMap()).filter((S) => Rt(S) && !S.name.startsWith("__")).map((S) => ({
			label: S.name,
			kind: ge.Function,
			insertText: s?.fillLeafsOnComplete ? S.name + `
$1` : S.name,
			insertTextMode: cr.adjustIndentation,
			insertTextFormat: Vr.Snippet
		}))) : p === z.VARIABLE_DEFINITION && g === 2 || p === z.LIST_TYPE && g === 1 || p === z.NAMED_TYPE && v && (v.kind === z.VARIABLE_DEFINITION || v.kind === z.LIST_TYPE || v.kind === z.NON_NULL_TYPE) ? d9(m, e, p) : p === z.DIRECTIVE ? h9(m, l, e, p) : p === z.DIRECTIVE_DEF ? p9(m, l, e, p) : [];
	}
	const uu = [
		{
			label: "type",
			kind: ge.Function
		},
		{
			label: "interface",
			kind: ge.Function
		},
		{
			label: "union",
			kind: ge.Function
		},
		{
			label: "input",
			kind: ge.Function
		},
		{
			label: "scalar",
			kind: ge.Function
		},
		{
			label: "schema",
			kind: ge.Function
		}
	], gd = [
		{
			label: "query",
			kind: ge.Function
		},
		{
			label: "mutation",
			kind: ge.Function
		},
		{
			label: "subscription",
			kind: ge.Function
		},
		{
			label: "fragment",
			kind: ge.Function
		},
		{
			label: "{",
			kind: ge.Constructor
		}
	];
	function t9(e) {
		return Me(e, [{
			label: "extend",
			kind: ge.Function
		}, ...uu]);
	}
	function n9(e) {
		return Me(e, gd);
	}
	function r9(e) {
		return Me(e, [
			{
				label: "extend",
				kind: ge.Function
			},
			...gd,
			...uu
		]);
	}
	function i9(e) {
		return Me(e, uu);
	}
	function s9(e, t, n) {
		var r;
		if (t.parentType) {
			const { parentType: i } = t;
			let s = [];
			return "getFields" in i && (s = lr(i.getFields())), kt(i) && s.push(Di), i === ((r = n?.schema) === null || r === void 0 ? void 0 : r.getQueryType()) && s.push(mi, gi), Me(e, s.map((a, o) => {
				var u;
				const l = {
					sortText: String(o) + a.name,
					label: a.name,
					detail: String(a.type),
					documentation: (u = a.description) !== null && u !== void 0 ? u : void 0,
					deprecated: !!a.deprecationReason,
					isDeprecated: !!a.deprecationReason,
					deprecationReason: a.deprecationReason,
					kind: ge.Field,
					labelDetails: { detail: " " + a.type.toString() },
					type: a.type
				};
				return n?.fillLeafsOnComplete && (l.insertText = P7(a), l.insertText || (l.insertText = Ts(a.name, a.type, a.name + (e.state.needsAdvance ? "" : `
`))), l.insertText && (l.insertTextFormat = Vr.Snippet, l.insertTextMode = cr.adjustIndentation, l.command = ou)), l;
			}));
		}
		return [];
	}
	function a9(e, t, n, r) {
		const i = je(t.inputType), s = Dd(n, r, e).filter((a) => a.detail === i?.name);
		return i instanceof Hn ? Me(e, i.getValues().map((a) => {
			var o;
			return {
				label: a.name,
				detail: String(i),
				documentation: (o = a.description) !== null && o !== void 0 ? o : void 0,
				deprecated: !!a.deprecationReason,
				isDeprecated: !!a.deprecationReason,
				deprecationReason: a.deprecationReason,
				kind: ge.EnumMember,
				type: i
			};
		}).concat(s)) : i === ft ? Me(e, s.concat([{
			label: "true",
			detail: String(ft),
			documentation: "Not false.",
			kind: ge.Variable,
			type: ft
		}, {
			label: "false",
			detail: String(ft),
			documentation: "Not true.",
			kind: ge.Variable,
			type: ft
		}])) : s;
	}
	function o9(e, t, n, r, i) {
		if (t.needsSeparator) return [];
		const s = lr(n.getTypeMap()).filter(xe), a = s.map(({ name: c }) => c), o = /* @__PURE__ */ new Set();
		Is(r, (c, d) => {
			var m, p, g, v, F;
			if (d.name && (d.kind === z.INTERFACE_DEF && !a.includes(d.name) && o.add(d.name), d.kind === z.NAMED_TYPE && ((m = d.prevState) === null || m === void 0 ? void 0 : m.kind) === z.IMPLEMENTS)) {
				if (i.interfaceDef) {
					if (!((p = i.interfaceDef) === null || p === void 0) && p.getInterfaces().find(({ name: w }) => w === d.name)) return;
					const S = n.getType(d.name), C = (g = i.interfaceDef) === null || g === void 0 ? void 0 : g.toConfig();
					i.interfaceDef = new qn(Object.assign(Object.assign({}, C), { interfaces: [...C.interfaces, S || new qn({
						name: d.name,
						fields: {}
					})] }));
				} else if (i.objectTypeDef) {
					if (!((v = i.objectTypeDef) === null || v === void 0) && v.getInterfaces().find(({ name: w }) => w === d.name)) return;
					const S = n.getType(d.name), C = (F = i.objectTypeDef) === null || F === void 0 ? void 0 : F.toConfig();
					i.objectTypeDef = new Ut(Object.assign(Object.assign({}, C), { interfaces: [...C.interfaces, S || new qn({
						name: d.name,
						fields: {}
					})] }));
				}
			}
		});
		const u = i.interfaceDef || i.objectTypeDef, l = (u?.getInterfaces() || []).map(({ name: c }) => c);
		return Me(e, s.concat([...o].map((c) => ({ name: c }))).filter(({ name: c }) => c !== u?.name && !l.includes(c)).map((c) => {
			const d = {
				label: c.name,
				kind: ge.Interface,
				type: c
			};
			return c?.description && (d.documentation = c.description), d;
		}));
	}
	function u9(e, t, n, r) {
		let i;
		if (t.parentType) if (on(t.parentType)) {
			const s = h5(t.parentType), a = n.getPossibleTypes(s), o = Object.create(null);
			for (const u of a) for (const l of u.getInterfaces()) o[l.name] = l;
			i = a.concat(lr(o));
		} else i = [t.parentType];
		else i = lr(n.getTypeMap()).filter((s) => kt(s) && !s.name.startsWith("__"));
		return Me(e, i.map((s) => {
			const a = je(s);
			return {
				label: String(s),
				documentation: a?.description || "",
				kind: ge.Field
			};
		}));
	}
	function l9(e, t, n, r, i) {
		if (!r) return [];
		const s = n.getTypeMap(), a = X7(e.state), o = f9(r);
		return i && i.length > 0 && o.push(...i), Me(e, o.filter((u) => s[u.typeCondition.name.value] && !(a && a.kind === z.FRAGMENT_DEFINITION && a.name === u.name.value) && kt(t.parentType) && kt(s[u.typeCondition.name.value]) && No(n, t.parentType, s[u.typeCondition.name.value])).map((u) => ({
			label: u.name.value,
			detail: String(s[u.typeCondition.name.value]),
			documentation: `fragment ${u.name.value} on ${u.typeCondition.name.value}`,
			labelDetails: { detail: `fragment ${u.name.value} on ${u.typeCondition.name.value}` },
			kind: ge.Field,
			type: s[u.typeCondition.name.value]
		})));
	}
	const c9 = (e, t) => {
		var n, r, i, s, a, o, u, l, c, d;
		if (((n = e.prevState) === null || n === void 0 ? void 0 : n.kind) === t) return e.prevState;
		if (((i = (r = e.prevState) === null || r === void 0 ? void 0 : r.prevState) === null || i === void 0 ? void 0 : i.kind) === t) return e.prevState.prevState;
		if (((o = (a = (s = e.prevState) === null || s === void 0 ? void 0 : s.prevState) === null || a === void 0 ? void 0 : a.prevState) === null || o === void 0 ? void 0 : o.kind) === t) return e.prevState.prevState.prevState;
		if (((d = (c = (l = (u = e.prevState) === null || u === void 0 ? void 0 : u.prevState) === null || l === void 0 ? void 0 : l.prevState) === null || c === void 0 ? void 0 : c.prevState) === null || d === void 0 ? void 0 : d.kind) === t) return e.prevState.prevState.prevState.prevState;
	};
	function Dd(e, t, n) {
		let r = null, i;
		const s = Object.create({});
		return Is(e, (a, o) => {
			var u;
			if (o?.kind === z.VARIABLE && o.name && (r = o.name), o?.kind === z.NAMED_TYPE && r) {
				const l = c9(o, z.TYPE);
				l?.type && (i = t.getType(l?.type));
			}
			if (r && i && !s[r]) {
				const l = n.string === "$" || ((u = n?.state) === null || u === void 0 ? void 0 : u.kind) === "Variable" ? r : "$" + r;
				s[r] = {
					detail: i.toString(),
					insertText: l,
					label: "$" + r,
					rawInsert: l,
					type: i,
					kind: ge.Variable
				}, r = null, i = null;
			}
		}), lr(s);
	}
	function f9(e) {
		const t = [];
		return Is(e, (n, r) => {
			r.kind === z.FRAGMENT_DEFINITION && r.name && r.type && t.push({
				kind: z.FRAGMENT_DEFINITION,
				name: {
					kind: E.NAME,
					value: r.name
				},
				selectionSet: {
					kind: z.SELECTION_SET,
					selections: []
				},
				typeCondition: {
					kind: z.NAMED_TYPE,
					name: {
						kind: E.NAME,
						value: r.type
					}
				}
			});
		}), t;
	}
	function d9(e, t, n) {
		return Me(e, lr(t.getTypeMap()).filter(Rt).map((r) => ({
			label: r.name,
			documentation: r?.description || "",
			kind: ge.Variable
		})));
	}
	function h9(e, t, n, r) {
		var i;
		return !((i = t.prevState) === null || i === void 0) && i.kind ? Me(e, n.getDirectives().filter((s) => m9(t.prevState, s)).map((s) => ({
			label: s.name,
			documentation: s?.description || "",
			kind: ge.Function
		}))) : [];
	}
	function p9(e, t, n, r) {
		return Me(e, n.getDirectives().find((s) => s.name === t.name)?.args.map((s) => ({
			label: s.name,
			documentation: s.description || "",
			kind: ge.Field
		})) || []);
	}
	function m9(e, t) {
		if (!e?.kind) return !1;
		const { kind: n, prevState: r } = e, { locations: i } = t;
		switch (n) {
			case z.QUERY: return i.includes(ne.QUERY);
			case z.MUTATION: return i.includes(ne.MUTATION);
			case z.SUBSCRIPTION: return i.includes(ne.SUBSCRIPTION);
			case z.FIELD:
			case z.ALIASED_FIELD: return i.includes(ne.FIELD);
			case z.FRAGMENT_DEFINITION: return i.includes(ne.FRAGMENT_DEFINITION);
			case z.FRAGMENT_SPREAD: return i.includes(ne.FRAGMENT_SPREAD);
			case z.INLINE_FRAGMENT: return i.includes(ne.INLINE_FRAGMENT);
			case z.SCHEMA_DEF: return i.includes(ne.SCHEMA);
			case z.SCALAR_DEF: return i.includes(ne.SCALAR);
			case z.OBJECT_TYPE_DEF: return i.includes(ne.OBJECT);
			case z.FIELD_DEF: return i.includes(ne.FIELD_DEFINITION);
			case z.INTERFACE_DEF: return i.includes(ne.INTERFACE);
			case z.UNION_DEF: return i.includes(ne.UNION);
			case z.ENUM_DEF: return i.includes(ne.ENUM);
			case z.ENUM_VALUE: return i.includes(ne.ENUM_VALUE);
			case z.INPUT_DEF: return i.includes(ne.INPUT_OBJECT);
			case z.INPUT_VALUE_DEF: switch (r?.kind) {
				case z.ARGUMENTS_DEF: return i.includes(ne.ARGUMENT_DEFINITION);
				case z.INPUT_DEF: return i.includes(ne.INPUT_FIELD_DEFINITION);
			}
		}
		return !1;
	}
	function yd(e) {
		return e.prevState && e.kind && [
			z.NAMED_TYPE,
			z.LIST_TYPE,
			z.TYPE,
			z.NON_NULL_TYPE
		].includes(e.kind) ? yd(e.prevState) : e;
	}
	ba(xn(((e, t) => {
		function n(r, i) {
			if (r != null) return r;
			var s = new Error(i !== void 0 ? i : "Got unexpected " + r);
			throw s.framesToPop = 1, s;
		}
		t.exports = n, t.exports.default = n, Object.defineProperty(t.exports, "__esModule", { value: !0 });
	}))());
	function yt(e, t) {
		e.push(t);
	}
	function lu(e, t) {
		Fe(t) ? (lu(e, t.ofType), yt(e, "!")) : Ye(t) ? (yt(e, "["), lu(e, t.ofType), yt(e, "]")) : yt(e, t.name);
	}
	function Ls(e, t, n) {
		const r = [], i = "type" in e ? e.type : e;
		return "type" in e && e.description && (yt(r, e.description), yt(r, `

`)), yt(r, D9(i, t)), n ? (yt(r, `
`), yt(r, n)) : !$t(i) && "description" in i && i.description ? (yt(r, `
`), yt(r, i.description)) : "ofType" in i && !$t(i.ofType) && "description" in i.ofType && i.ofType.description && (yt(r, `
`), yt(r, i.ofType.description)), r.join("");
	}
	function D9(e, t) {
		const n = [];
		return t && yt(n, "```graphql\n"), lu(n, e), t && yt(n, "\n```"), n.join("");
	}
	const y9 = {
		Int: { type: "integer" },
		String: { type: "string" },
		Float: { type: "number" },
		ID: { type: "string" },
		Boolean: { type: "boolean" },
		DateTime: { type: "string" }
	};
	var v9 = class {
		constructor() {
			this.set = /* @__PURE__ */ new Set();
		}
		mark(e) {
			return this.set.has(e) ? !1 : (this.set.add(e), !0);
		}
	};
	function cu(e, t) {
		var n, r;
		let i = Object.create(null);
		const s = Object.create(null), a = "type" in e ? e.type : e, o = Fe(a) ? a.ofType : a, u = Fe(a);
		if ($t(o)) !((n = t?.scalarSchemas) === null || n === void 0) && n[o.name] ? i = JSON.parse(JSON.stringify(t.scalarSchemas[o.name])) : i.type = [
			"string",
			"number",
			"boolean",
			"integer"
		], u || (Array.isArray(i.type) ? i.type.push("null") : i.type ? i.type = [i.type, "null"] : i.enum ? i.enum.push(null) : i.oneOf ? i.oneOf.push({ type: "null" }) : i = { oneOf: [i, { type: "null" }] });
		else if (Dt(o)) i.enum = o.getValues().map((c) => c.name), u || i.enum.push(null);
		else if (Ye(o)) {
			u ? i.type = "array" : i.type = ["array", "null"];
			const { definition: c, definitions: d } = cu(o.ofType, t);
			if (i.items = c, d) for (const m of Object.keys(d)) s[m] = d[m];
		} else if (ze(o) && (u ? i.$ref = `#/definitions/${o.name}` : i.oneOf = [{ $ref: `#/definitions/${o.name}` }, { type: "null" }], !((r = t?.definitionMarker) === null || r === void 0) && r.mark(o.name))) {
			const c = o.getFields(), d = {
				type: "object",
				properties: {},
				required: []
			};
			d.description = Ls(o), t?.useMarkdownDescription && (d.markdownDescription = Ls(o, !0));
			for (const m of Object.keys(c)) {
				const p = c[m], { required: g, definition: v, definitions: F } = cu(p, t);
				if (d.properties[m] = v, g && d.required.push(m), F) for (const [S, C] of Object.entries(F)) s[S] = C;
			}
			s[o.name] = d;
		}
		"defaultValue" in e && e.defaultValue !== void 0 && (i.default = e.defaultValue);
		const { description: l } = i;
		return i.description = Ls(e, !1, l), t?.useMarkdownDescription && (i.markdownDescription = Ls(e, !0, l)), {
			required: u,
			definition: i,
			definitions: s
		};
	}
	function E9(e, t) {
		var n;
		const r = {
			$schema: "http://json-schema.org/draft-04/schema",
			type: "object",
			properties: {},
			required: [],
			additionalProperties: !1
		}, i = Object.assign(Object.assign({}, t), {
			definitionMarker: new v9(),
			scalarSchemas: Object.assign(Object.assign({}, y9), t?.scalarSchemas)
		});
		if (e) for (const [s, a] of Object.entries(e)) {
			const { definition: o, required: u, definitions: l } = cu(a, i);
			r.properties[s] = o, u && ((n = r.required) === null || n === void 0 || n.push(s)), l && (r.definitions = Object.assign(Object.assign({}, r?.definitions), l));
		}
		return r;
	}
	var fu = class {
		constructor(e, t) {
			this.containsPosition = (n) => this.start.line === n.line ? this.start.character <= n.character : this.end.line === n.line ? this.end.character >= n.character : this.start.line <= n.line && this.end.line >= n.line, this.start = e, this.end = t;
		}
		setStart(e, t) {
			this.start = new Sn(e, t);
		}
		setEnd(e, t) {
			this.end = new Sn(e, t);
		}
	}, Sn = class {
		constructor(e, t) {
			this.lessThanOrEqualTo = (n) => this.line < n.line || this.line === n.line && this.character <= n.character, this.line = e, this.character = t;
		}
		setLine(e) {
			this.line = e;
		}
		setCharacter(e) {
			this.character = e;
		}
	};
	const b9 = [
		Bf,
		Zf,
		Kf,
		Xf,
		Qf,
		Jf,
		Lo,
		Io,
		$o,
		Hf,
		Vo,
		Uo,
		e0,
		xf,
		Gf
	];
	function _9(e, t, n, r, i) {
		const s = t0.filter((a) => !(a === Vf || a === kf || r && a === Mf));
		return n && Array.prototype.push.apply(s, n), i && Array.prototype.push.apply(s, b9), r0(e, t, s).filter((a) => {
			if (a.message.includes("Unknown directive") && a.nodes) {
				const o = a.nodes[0];
				if (o && o.kind === E.DIRECTIVE) {
					const u = o.name.value;
					if (u === "arguments" || u === "argumentDefinitions") return !1;
				}
			}
			return !0;
		});
	}
	function N9(e, t) {
		const n = Object.create(null);
		for (const r of t.definitions) if (r.kind === "OperationDefinition") {
			const { variableDefinitions: i } = r;
			if (i) for (const { variable: s, type: a } of i) {
				const o = xt(e, a);
				o ? n[s.name.value] = o : a.kind === E.NAMED_TYPE && a.name.value === "Float" && (n[s.name.value] = mf);
			}
		}
		return n;
	}
	function T9(e, t) {
		const n = t ? N9(t, e) : void 0, r = [];
		return jn(e, { OperationDefinition(i) {
			r.push(i);
		} }), {
			variableToType: n,
			operations: r
		};
	}
	const Rs = {
		Error: "Error",
		Warning: "Warning",
		Information: "Information",
		Hint: "Hint"
	}, du = {
		[Rs.Error]: 1,
		[Rs.Warning]: 2,
		[Rs.Information]: 3,
		[Rs.Hint]: 4
	}, ks = (e, t) => {
		if (!e) throw new Error(t);
	};
	function S9(e, t = null, n, r, i) {
		var s, a;
		let o = null, u = "";
		i && (u = typeof i == "string" ? i : i.reduce((c, d) => c + rt(d) + `

`, ""));
		const l = u ? `${e}

${u}` : e;
		try {
			o = ls(l);
		} catch (c) {
			if (c instanceof H) {
				const d = A9((a = (s = c.locations) === null || s === void 0 ? void 0 : s[0]) !== null && a !== void 0 ? a : {
					line: 0,
					column: 0
				}, l);
				return [{
					severity: du.Error,
					message: c.message,
					source: "GraphQL: Syntax",
					range: d
				}];
			}
			throw c;
		}
		return F9(o, t, n, r);
	}
	function F9(e, t = null, n, r) {
		if (!t) return [];
		const i = _9(t, e, n, r).flatMap((a) => vd(a, du.Error, "Validation")), s = r0(t, e, [L7]).flatMap((a) => vd(a, du.Warning, "Deprecation"));
		return i.concat(s);
	}
	function vd(e, t, n) {
		if (!e.nodes) return [];
		const r = [];
		for (const [i, s] of e.nodes.entries()) {
			const a = s.kind !== "Variable" && "name" in s && s.name !== void 0 ? s.name : "variable" in s && s.variable !== void 0 ? s.variable : s;
			if (a) {
				ks(e.locations, "GraphQL validation error requires locations.");
				const o = e.locations[i], u = C9(a), l = o.column + (u.end - u.start);
				r.push({
					source: `GraphQL: ${n}`,
					message: e.message,
					severity: t,
					range: new fu(new Sn(o.line - 1, o.column - 1), new Sn(o.line - 1, l))
				});
			}
		}
		return r;
	}
	function A9(e, t) {
		const n = ld(), r = n.startState(), i = t.split(`
`);
		ks(i.length >= e.line, "Query text must have more lines than where the error happened");
		let s = null;
		for (let l = 0; l < e.line; l++) for (s = new nu(i[l]); !s.eol() && n.token(s, r) !== "invalidchar";);
		ks(s, "Expected Parser stream to be available.");
		const a = e.line - 1, o = s.getStartOfToken(), u = s.getCurrentPosition();
		return new fu(new Sn(a, o), new Sn(a, u));
	}
	function C9(e) {
		const t = e.loc;
		return ks(t, "Expected ASTNode to have a location."), t;
	}
	function w9(e, t, n, r, i) {
		const s = Object.assign(Object.assign({}, i), { schema: e }), a = hd(t, n, e, r);
		if (!a) return "";
		const { typeInfo: o, token: u } = a, { kind: l, step: c } = u.state;
		if (l === "Field" && c === 0 && o.fieldDef || l === "AliasedField" && c === 2 && o.fieldDef || l === "ObjectField" && c === 0 && o.fieldDef) {
			const d = [];
			return $r(d, s), I9(d, o, s), Ur(d, s), jr(d, s, o.fieldDef), d.join("").trim();
		}
		if (l === "Directive" && c === 1 && o.directiveDef) {
			const d = [];
			return $r(d, s), bd(d, o, s), Ur(d, s), jr(d, s, o.directiveDef), d.join("").trim();
		}
		if (l === "Variable" && o.type) {
			const d = [];
			return $r(d, s), fr(d, o, s, o.type), Ur(d, s), jr(d, s, o.type), d.join("").trim();
		}
		if (l === "Argument" && c === 0 && o.argDef) {
			const d = [];
			return $r(d, s), L9(d, o, s), Ur(d, s), jr(d, s, o.argDef), d.join("").trim();
		}
		if (l === "EnumValue" && o.enumValue && "description" in o.enumValue) {
			const d = [];
			return $r(d, s), R9(d, o, s), Ur(d, s), jr(d, s, o.enumValue), d.join("").trim();
		}
		if (l === "NamedType" && o.type && "description" in o.type) {
			const d = [];
			return $r(d, s), fr(d, o, s, o.type), Ur(d, s), jr(d, s, o.type), d.join("").trim();
		}
		return "";
	}
	function $r(e, t) {
		t.useMarkdown && Je(e, "```graphql\n");
	}
	function Ur(e, t) {
		t.useMarkdown && Je(e, "\n```");
	}
	function I9(e, t, n) {
		Ed(e, t, n), _d(e, t, n, t.type);
	}
	function Ed(e, t, n) {
		if (!t.fieldDef) return;
		const r = t.fieldDef.name;
		r.slice(0, 2) !== "__" && (fr(e, t, n, t.parentType), Je(e, ".")), Je(e, r);
	}
	function bd(e, t, n) {
		t.directiveDef && Je(e, "@" + t.directiveDef.name);
	}
	function L9(e, t, n) {
		if (t.directiveDef ? bd(e, t, n) : t.fieldDef && Ed(e, t, n), !t.argDef) return;
		const { name: r } = t.argDef;
		Je(e, "("), Je(e, r), _d(e, t, n, t.inputType), Je(e, ")");
	}
	function _d(e, t, n, r) {
		Je(e, ": "), fr(e, t, n, r);
	}
	function R9(e, t, n) {
		if (!t.enumValue) return;
		const { name: r } = t.enumValue;
		fr(e, t, n, t.inputType), Je(e, "."), Je(e, r);
	}
	function fr(e, t, n, r) {
		r && (r instanceof me ? (fr(e, t, n, r.ofType), Je(e, "!")) : r instanceof ct ? (Je(e, "["), fr(e, t, n, r.ofType), Je(e, "]")) : Je(e, r.name));
	}
	function jr(e, t, n) {
		if (!n) return;
		const r = typeof n.description == "string" ? n.description : null;
		r && (Je(e, `

`), Je(e, r)), k9(e, t, n);
	}
	function k9(e, t, n) {
		if (!n) return;
		const r = n.deprecationReason;
		r && (Je(e, `

`), Je(e, "Deprecated: "), Je(e, r));
	}
	function Je(e, t) {
		e.push(t);
	}
	var xs = xn(((e, t) => {
		const r = "[^\\\\/]", u = "(?=.)", l = "[^/]", c = "(?:\\/|$)", d = "(?:^|\\/)", m = `\\.{1,2}${c}`, p = {
			DOT_LITERAL: "\\.",
			PLUS_LITERAL: "\\+",
			QMARK_LITERAL: "\\?",
			SLASH_LITERAL: "\\/",
			ONE_CHAR: u,
			QMARK: l,
			END_ANCHOR: c,
			DOTS_SLASH: m,
			NO_DOT: "(?!\\.)",
			NO_DOTS: `(?!${d}${m})`,
			NO_DOT_SLASH: `(?!\\.{0,1}${c})`,
			NO_DOTS_SLASH: `(?!${m})`,
			QMARK_NO_DOT: "[^.\\/]",
			STAR: `${l}*?`,
			START_ANCHOR: d,
			SEP: "/"
		}, g = {
			...p,
			SLASH_LITERAL: "[\\\\/]",
			QMARK: r,
			STAR: `${r}*?`,
			DOTS_SLASH: "\\.{1,2}(?:[\\\\/]|$)",
			NO_DOT: "(?!\\.)",
			NO_DOTS: "(?!(?:^|[\\\\/])\\.{1,2}(?:[\\\\/]|$))",
			NO_DOT_SLASH: "(?!\\.{0,1}(?:[\\\\/]|$))",
			NO_DOTS_SLASH: "(?!\\.{1,2}(?:[\\\\/]|$))",
			QMARK_NO_DOT: "[^.\\\\/]",
			START_ANCHOR: "(?:^|[\\\\/])",
			END_ANCHOR: "(?:[\\\\/]|$)",
			SEP: "\\"
		};
		t.exports = {
			MAX_LENGTH: 1024 * 64,
			POSIX_REGEX_SOURCE: {
				alnum: "a-zA-Z0-9",
				alpha: "a-zA-Z",
				ascii: "\\x00-\\x7F",
				blank: " \\t",
				cntrl: "\\x00-\\x1F\\x7F",
				digit: "0-9",
				graph: "\\x21-\\x7E",
				lower: "a-z",
				print: "\\x20-\\x7E ",
				punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
				space: " \\t\\r\\n\\v\\f",
				upper: "A-Z",
				word: "A-Za-z0-9_",
				xdigit: "A-Fa-f0-9"
			},
			REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
			REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
			REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
			REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
			REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
			REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
			REPLACEMENTS: {
				"***": "*",
				"**/**": "**",
				"**/**/**": "**"
			},
			CHAR_0: 48,
			CHAR_9: 57,
			CHAR_UPPERCASE_A: 65,
			CHAR_LOWERCASE_A: 97,
			CHAR_UPPERCASE_Z: 90,
			CHAR_LOWERCASE_Z: 122,
			CHAR_LEFT_PARENTHESES: 40,
			CHAR_RIGHT_PARENTHESES: 41,
			CHAR_ASTERISK: 42,
			CHAR_AMPERSAND: 38,
			CHAR_AT: 64,
			CHAR_BACKWARD_SLASH: 92,
			CHAR_CARRIAGE_RETURN: 13,
			CHAR_CIRCUMFLEX_ACCENT: 94,
			CHAR_COLON: 58,
			CHAR_COMMA: 44,
			CHAR_DOT: 46,
			CHAR_DOUBLE_QUOTE: 34,
			CHAR_EQUAL: 61,
			CHAR_EXCLAMATION_MARK: 33,
			CHAR_FORM_FEED: 12,
			CHAR_FORWARD_SLASH: 47,
			CHAR_GRAVE_ACCENT: 96,
			CHAR_HASH: 35,
			CHAR_HYPHEN_MINUS: 45,
			CHAR_LEFT_ANGLE_BRACKET: 60,
			CHAR_LEFT_CURLY_BRACE: 123,
			CHAR_LEFT_SQUARE_BRACKET: 91,
			CHAR_LINE_FEED: 10,
			CHAR_NO_BREAK_SPACE: 160,
			CHAR_PERCENT: 37,
			CHAR_PLUS: 43,
			CHAR_QUESTION_MARK: 63,
			CHAR_RIGHT_ANGLE_BRACKET: 62,
			CHAR_RIGHT_CURLY_BRACE: 125,
			CHAR_RIGHT_SQUARE_BRACKET: 93,
			CHAR_SEMICOLON: 59,
			CHAR_SINGLE_QUOTE: 39,
			CHAR_SPACE: 32,
			CHAR_TAB: 9,
			CHAR_UNDERSCORE: 95,
			CHAR_VERTICAL_LINE: 124,
			CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
			extglobChars(F) {
				return {
					"!": {
						type: "negate",
						open: "(?:(?!(?:",
						close: `))${F.STAR})`
					},
					"?": {
						type: "qmark",
						open: "(?:",
						close: ")?"
					},
					"+": {
						type: "plus",
						open: "(?:",
						close: ")+"
					},
					"*": {
						type: "star",
						open: "(?:",
						close: ")*"
					},
					"@": {
						type: "at",
						open: "(?:",
						close: ")"
					}
				};
			},
			globChars(F) {
				return F === !0 ? g : p;
			}
		};
	})), hu = xn(((e) => {
		const { REGEX_BACKSLASH: t, REGEX_REMOVE_BACKSLASH: n, REGEX_SPECIAL_CHARS: r, REGEX_SPECIAL_CHARS_GLOBAL: i } = xs();
		e.isObject = (s) => s !== null && typeof s == "object" && !Array.isArray(s), e.hasRegexChars = (s) => r.test(s), e.isRegexChar = (s) => s.length === 1 && e.hasRegexChars(s), e.escapeRegex = (s) => s.replace(i, "\\$1"), e.toPosixSlashes = (s) => s.replace(t, "/"), e.removeBackslashes = (s) => s.replace(n, (a) => a === "\\" ? "" : a), e.supportsLookbehinds = () => {
			const s = process.version.slice(1).split(".").map(Number);
			return s.length === 3 && s[0] >= 9 || s[0] === 8 && s[1] >= 10;
		}, e.escapeLast = (s, a, o) => {
			const u = s.lastIndexOf(a, o);
			return u === -1 ? s : s[u - 1] === "\\" ? e.escapeLast(s, a, u - 1) : `${s.slice(0, u)}\\${s.slice(u)}`;
		}, e.removePrefix = (s, a = {}) => {
			let o = s;
			return o.startsWith("./") && (o = o.slice(2), a.prefix = "./"), o;
		}, e.wrapOutput = (s, a = {}, o = {}) => {
			let u = `${o.contains ? "" : "^"}(?:${s})${o.contains ? "" : "$"}`;
			return a.negated === !0 && (u = `(?:^(?!${u}).*$)`), u;
		}, e.basename = (s, { windows: a } = {}) => a ? s.replace(/[\\/]$/, "").replace(/.*[\\/]/, "") : s.replace(/\/$/, "").replace(/.*\//, "");
	})), x9 = xn(((e, t) => {
		const n = hu(), { CHAR_ASTERISK: r, CHAR_AT: i, CHAR_BACKWARD_SLASH: s, CHAR_COMMA: a, CHAR_DOT: o, CHAR_EXCLAMATION_MARK: u, CHAR_FORWARD_SLASH: l, CHAR_LEFT_CURLY_BRACE: c, CHAR_LEFT_PARENTHESES: d, CHAR_LEFT_SQUARE_BRACKET: m, CHAR_PLUS: p, CHAR_QUESTION_MARK: g, CHAR_RIGHT_CURLY_BRACE: v, CHAR_RIGHT_PARENTHESES: F, CHAR_RIGHT_SQUARE_BRACKET: S } = xs(), C = (A) => A === l || A === s, w = (A) => {
			A.isPrefix !== !0 && (A.depth = A.isGlobstar ? Infinity : 1);
		}, T = (A, k) => {
			const V = k || {}, K = A.length - 1, L = V.parts === !0 || V.scanToEnd === !0, M = [], O = [], oe = [];
			let I = A, B = -1, G = 0, q = 0, ee = !1, W = !1, se = !1, ue = !1, Ne = !1, _ = !1, J = !1, Y = !1, Z = !1, x = 0, P, re, fe = {
				value: "",
				depth: 0,
				isGlob: !1
			};
			const Qe = () => B >= K, At = () => I.charCodeAt(B + 1), ye = () => (P = re, I.charCodeAt(++B));
			for (; B < K;) {
				re = ye();
				let de;
				if (re === s) {
					J = fe.backslashes = !0, re = ye(), re === c && (_ = !0);
					continue;
				}
				if (_ === !0 || re === c) {
					for (x++; Qe() !== !0 && (re = ye());) {
						if (re === s) {
							J = fe.backslashes = !0, ye();
							continue;
						}
						if (re === c) {
							x++;
							continue;
						}
						if (_ !== !0 && re === o && (re = ye()) === o) {
							if (ee = fe.isBrace = !0, se = fe.isGlob = !0, Z = !0, L === !0) continue;
							break;
						}
						if (_ !== !0 && re === a) {
							if (ee = fe.isBrace = !0, se = fe.isGlob = !0, Z = !0, L === !0) continue;
							break;
						}
						if (re === v && (x--, x === 0)) {
							_ = !1, ee = fe.isBrace = !0, Z = !0;
							break;
						}
					}
					if (L === !0) continue;
					break;
				}
				if (re === l) {
					if (M.push(B), O.push(fe), fe = {
						value: "",
						depth: 0,
						isGlob: !1
					}, Z === !0) continue;
					if (P === o && B === G + 1) {
						G += 2;
						continue;
					}
					q = B + 1;
					continue;
				}
				if (V.noext !== !0 && (re === p || re === i || re === r || re === g || re === u) && At() === d) {
					if (se = fe.isGlob = !0, ue = fe.isExtglob = !0, Z = !0, L === !0) {
						for (; Qe() !== !0 && (re = ye());) {
							if (re === s) {
								J = fe.backslashes = !0, re = ye();
								continue;
							}
							if (re === F) {
								se = fe.isGlob = !0, Z = !0;
								break;
							}
						}
						continue;
					}
					break;
				}
				if (re === r) {
					if (P === r && (Ne = fe.isGlobstar = !0), se = fe.isGlob = !0, Z = !0, L === !0) continue;
					break;
				}
				if (re === g) {
					if (se = fe.isGlob = !0, Z = !0, L === !0) continue;
					break;
				}
				if (re === m) for (; Qe() !== !0 && (de = ye());) {
					if (de === s) {
						J = fe.backslashes = !0, ye();
						continue;
					}
					if (de === S) {
						if (W = fe.isBracket = !0, se = fe.isGlob = !0, Z = !0, L === !0) continue;
						break;
					}
				}
				if (V.nonegate !== !0 && re === u && B === G) {
					Y = fe.negated = !0, G++;
					continue;
				}
				if (V.noparen !== !0 && re === d) {
					if (se = fe.isGlob = !0, L === !0) {
						for (; Qe() !== !0 && (re = ye());) {
							if (re === d) {
								J = fe.backslashes = !0, re = ye();
								continue;
							}
							if (re === F) {
								Z = !0;
								break;
							}
						}
						continue;
					}
					break;
				}
				if (se === !0) {
					if (Z = !0, L === !0) continue;
					break;
				}
			}
			V.noext === !0 && (ue = !1, se = !1);
			let Le = I, rn = "", Mt = "";
			G > 0 && (rn = I.slice(0, G), I = I.slice(G), q -= G), Le && se === !0 && q > 0 ? (Le = I.slice(0, q), Mt = I.slice(q)) : se === !0 ? (Le = "", Mt = I) : Le = I, Le && Le !== "" && Le !== "/" && Le !== I && C(Le.charCodeAt(Le.length - 1)) && (Le = Le.slice(0, -1)), V.unescape === !0 && (Mt && (Mt = n.removeBackslashes(Mt)), Le && J === !0 && (Le = n.removeBackslashes(Le)));
			const ht = {
				prefix: rn,
				input: A,
				start: G,
				base: Le,
				glob: Mt,
				isBrace: ee,
				isBracket: W,
				isGlob: se,
				isExtglob: ue,
				isGlobstar: Ne,
				negated: Y
			};
			if (V.tokens === !0 && (ht.maxDepth = 0, C(re) || O.push(fe), ht.tokens = O), V.parts === !0 || V.tokens === !0) {
				let de;
				for (let Ze = 0; Ze < M.length; Ze++) {
					const Li = de ? de + 1 : G, te = M[Ze], Ae = A.slice(Li, te);
					V.tokens && (Ze === 0 && G !== 0 ? (O[Ze].isPrefix = !0, O[Ze].value = rn) : O[Ze].value = Ae, w(O[Ze]), ht.maxDepth += O[Ze].depth), (Ze !== 0 || Ae !== "") && oe.push(Ae), de = te;
				}
				if (de && de + 1 < A.length) {
					const Ze = A.slice(de + 1);
					oe.push(Ze), V.tokens && (O[O.length - 1].value = Ze, w(O[O.length - 1]), ht.maxDepth += O[O.length - 1].depth);
				}
				ht.slashes = M, ht.parts = oe;
			}
			return ht;
		};
		t.exports = T;
	})), O9 = xn(((e, t) => {
		const n = xs(), r = hu(), { MAX_LENGTH: i, POSIX_REGEX_SOURCE: s, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: o, REPLACEMENTS: u } = n, l = (m, p) => {
			if (typeof p.expandRange == "function") return p.expandRange(...m, p);
			m.sort();
			const g = `[${m.join("-")}]`;
			try {
				new RegExp(g);
			} catch {
				return m.map((F) => r.escapeRegex(F)).join("..");
			}
			return g;
		}, c = (m, p) => `Missing ${m}: "${p}" - use "\\\\${p}" to match literal characters`, d = (m, p) => {
			if (typeof m != "string") throw new TypeError("Expected a string");
			m = u[m] || m;
			const g = { ...p }, v = typeof g.maxLength == "number" ? Math.min(i, g.maxLength) : i;
			let F = m.length;
			if (F > v) throw new SyntaxError(`Input length: ${F}, exceeds maximum allowed length: ${v}`);
			const S = {
				type: "bos",
				value: "",
				output: g.prepend || ""
			}, C = [S], w = g.capture ? "" : "?:", T = n.globChars(g.windows), A = n.extglobChars(T), { DOT_LITERAL: k, PLUS_LITERAL: V, SLASH_LITERAL: K, ONE_CHAR: L, DOTS_SLASH: M, NO_DOT: O, NO_DOT_SLASH: oe, NO_DOTS_SLASH: I, QMARK: B, QMARK_NO_DOT: G, STAR: q, START_ANCHOR: ee } = T, W = (te) => `(${w}(?:(?!${ee}${te.dot ? M : k}).)*?)`, se = g.dot ? "" : O, ue = g.dot ? B : G;
			let Ne = g.bash === !0 ? W(g) : q;
			g.capture && (Ne = `(${Ne})`), typeof g.noext == "boolean" && (g.noextglob = g.noext);
			const _ = {
				input: m,
				index: -1,
				start: 0,
				dot: g.dot === !0,
				consumed: "",
				output: "",
				prefix: "",
				backtrack: !1,
				negated: !1,
				brackets: 0,
				braces: 0,
				parens: 0,
				quotes: 0,
				globstar: !1,
				tokens: C
			};
			m = r.removePrefix(m, _), F = m.length;
			const J = [], Y = [], Z = [];
			let x = S, P;
			const re = () => _.index === F - 1, fe = _.peek = (te = 1) => m[_.index + te], Qe = _.advance = () => m[++_.index], At = () => m.slice(_.index + 1), ye = (te = "", Ae = 0) => {
				_.consumed += te, _.index += Ae;
			}, Le = (te) => {
				_.output += te.output != null ? te.output : te.value, ye(te.value);
			}, rn = () => {
				let te = 1;
				for (; fe() === "!" && (fe(2) !== "(" || fe(3) === "?");) Qe(), _.start++, te++;
				return te % 2 === 0 ? !1 : (_.negated = !0, _.start++, !0);
			}, Mt = (te) => {
				_[te]++, Z.push(te);
			}, ht = (te) => {
				_[te]--, Z.pop();
			}, de = (te) => {
				if (x.type === "globstar") {
					const Ae = _.braces > 0 && (te.type === "comma" || te.type === "brace"), Q = te.extglob === !0 || J.length && (te.type === "pipe" || te.type === "paren");
					te.type !== "slash" && te.type !== "paren" && !Ae && !Q && (_.output = _.output.slice(0, -x.output.length), x.type = "star", x.value = "*", x.output = Ne, _.output += x.output);
				}
				if (J.length && te.type !== "paren" && !A[te.value] && (J[J.length - 1].inner += te.value), (te.value || te.output) && Le(te), x && x.type === "text" && te.type === "text") {
					x.value += te.value, x.output = (x.output || "") + te.value;
					return;
				}
				te.prev = x, C.push(te), x = te;
			}, Ze = (te, Ae) => {
				const Q = {
					...A[Ae],
					conditions: 1,
					inner: ""
				};
				Q.prev = x, Q.parens = _.parens, Q.output = _.output;
				const ve = (g.capture ? "(" : "") + Q.open;
				Mt("parens"), de({
					type: te,
					value: Ae,
					output: _.output ? "" : L
				}), de({
					type: "paren",
					extglob: !0,
					value: Qe(),
					output: ve
				}), J.push(Q);
			}, Li = (te) => {
				let Ae = te.close + (g.capture ? ")" : "");
				if (te.type === "negate") {
					let Q = Ne;
					te.inner && te.inner.length > 1 && te.inner.includes("/") && (Q = W(g)), (Q !== Ne || re() || /^\)+$/.test(At())) && (Ae = te.close = `)$))${Q}`), te.prev.type === "bos" && re() && (_.negatedExtglob = !0);
				}
				de({
					type: "paren",
					extglob: !0,
					value: P,
					output: Ae
				}), ht("parens");
			};
			if (g.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(m)) {
				let te = !1, Ae = m.replace(o, (Q, ve, Ke, it, st, Ri) => it === "\\" ? (te = !0, Q) : it === "?" ? ve ? ve + it + (st ? B.repeat(st.length) : "") : Ri === 0 ? ue + (st ? B.repeat(st.length) : "") : B.repeat(Ke.length) : it === "." ? k.repeat(Ke.length) : it === "*" ? ve ? ve + it + (st ? Ne : "") : Ne : ve ? Q : `\\${Q}`);
				return te === !0 && (g.unescape === !0 ? Ae = Ae.replace(/\\/g, "") : Ae = Ae.replace(/\\+/g, (Q) => Q.length % 2 === 0 ? "\\\\" : Q ? "\\" : "")), Ae === m && g.contains === !0 ? (_.output = m, _) : (_.output = r.wrapOutput(Ae, _, p), _);
			}
			for (; !re();) {
				if (P = Qe(), P === "\0") continue;
				if (P === "\\") {
					const Q = fe();
					if (Q === "/" && g.bash !== !0 || Q === "." || Q === ";") continue;
					if (!Q) {
						P += "\\", de({
							type: "text",
							value: P
						});
						continue;
					}
					const ve = /^\\+/.exec(At());
					let Ke = 0;
					if (ve && ve[0].length > 2 && (Ke = ve[0].length, _.index += Ke, Ke % 2 !== 0 && (P += "\\")), g.unescape === !0 ? P = Qe() || "" : P += Qe() || "", _.brackets === 0) {
						de({
							type: "text",
							value: P
						});
						continue;
					}
				}
				if (_.brackets > 0 && (P !== "]" || x.value === "[" || x.value === "[^")) {
					if (g.posix !== !1 && P === ":") {
						const Q = x.value.slice(1);
						if (Q.includes("[") && (x.posix = !0, Q.includes(":"))) {
							const ve = x.value.lastIndexOf("["), Ke = x.value.slice(0, ve), it = s[x.value.slice(ve + 2)];
							if (it) {
								x.value = Ke + it, _.backtrack = !0, Qe(), !S.output && C.indexOf(x) === 1 && (S.output = L);
								continue;
							}
						}
					}
					(P === "[" && fe() !== ":" || P === "-" && fe() === "]") && (P = `\\${P}`), P === "]" && (x.value === "[" || x.value === "[^") && (P = `\\${P}`), g.posix === !0 && P === "!" && x.value === "[" && (P = "^"), x.value += P, Le({ value: P });
					continue;
				}
				if (_.quotes === 1 && P !== "\"") {
					P = r.escapeRegex(P), x.value += P, Le({ value: P });
					continue;
				}
				if (P === "\"") {
					_.quotes = _.quotes === 1 ? 0 : 1, g.keepQuotes === !0 && de({
						type: "text",
						value: P
					});
					continue;
				}
				if (P === "(") {
					Mt("parens"), de({
						type: "paren",
						value: P
					});
					continue;
				}
				if (P === ")") {
					if (_.parens === 0 && g.strictBrackets === !0) throw new SyntaxError(c("opening", "("));
					const Q = J[J.length - 1];
					if (Q && _.parens === Q.parens + 1) {
						Li(J.pop());
						continue;
					}
					de({
						type: "paren",
						value: P,
						output: _.parens ? ")" : "\\)"
					}), ht("parens");
					continue;
				}
				if (P === "[") {
					if (g.nobracket === !0 || !At().includes("]")) {
						if (g.nobracket !== !0 && g.strictBrackets === !0) throw new SyntaxError(c("closing", "]"));
						P = `\\${P}`;
					} else Mt("brackets");
					de({
						type: "bracket",
						value: P
					});
					continue;
				}
				if (P === "]") {
					if (g.nobracket === !0 || x && x.type === "bracket" && x.value.length === 1) {
						de({
							type: "text",
							value: P,
							output: `\\${P}`
						});
						continue;
					}
					if (_.brackets === 0) {
						if (g.strictBrackets === !0) throw new SyntaxError(c("opening", "["));
						de({
							type: "text",
							value: P,
							output: `\\${P}`
						});
						continue;
					}
					ht("brackets");
					const Q = x.value.slice(1);
					if (x.posix !== !0 && Q[0] === "^" && !Q.includes("/") && (P = `/${P}`), x.value += P, Le({ value: P }), g.literalBrackets === !1 || r.hasRegexChars(Q)) continue;
					const ve = r.escapeRegex(x.value);
					if (_.output = _.output.slice(0, -x.value.length), g.literalBrackets === !0) {
						_.output += ve, x.value = ve;
						continue;
					}
					x.value = `(${w}${ve}|${x.value})`, _.output += x.value;
					continue;
				}
				if (P === "{" && g.nobrace !== !0) {
					Mt("braces");
					const Q = {
						type: "brace",
						value: P,
						output: "(",
						outputIndex: _.output.length,
						tokensIndex: _.tokens.length
					};
					Y.push(Q), de(Q);
					continue;
				}
				if (P === "}") {
					const Q = Y[Y.length - 1];
					if (g.nobrace === !0 || !Q) {
						de({
							type: "text",
							value: P,
							output: P
						});
						continue;
					}
					let ve = ")";
					if (Q.dots === !0) {
						const Ke = C.slice(), it = [];
						for (let st = Ke.length - 1; st >= 0 && (C.pop(), Ke[st].type !== "brace"); st--) Ke[st].type !== "dots" && it.unshift(Ke[st].value);
						ve = l(it, g), _.backtrack = !0;
					}
					if (Q.comma !== !0 && Q.dots !== !0) {
						const Ke = _.output.slice(0, Q.outputIndex), it = _.tokens.slice(Q.tokensIndex);
						Q.value = Q.output = "\\{", P = ve = "\\}", _.output = Ke;
						for (const st of it) _.output += st.output || st.value;
					}
					de({
						type: "brace",
						value: P,
						output: ve
					}), ht("braces"), Y.pop();
					continue;
				}
				if (P === "|") {
					J.length > 0 && J[J.length - 1].conditions++, de({
						type: "text",
						value: P
					});
					continue;
				}
				if (P === ",") {
					let Q = P;
					const ve = Y[Y.length - 1];
					ve && Z[Z.length - 1] === "braces" && (ve.comma = !0, Q = "|"), de({
						type: "comma",
						value: P,
						output: Q
					});
					continue;
				}
				if (P === "/") {
					if (x.type === "dot" && _.index === _.start + 1) {
						_.start = _.index + 1, _.consumed = "", _.output = "", C.pop(), x = S;
						continue;
					}
					de({
						type: "slash",
						value: P,
						output: K
					});
					continue;
				}
				if (P === ".") {
					if (_.braces > 0 && x.type === "dot") {
						x.value === "." && (x.output = k);
						const Q = Y[Y.length - 1];
						x.type = "dots", x.output += P, x.value += P, Q.dots = !0;
						continue;
					}
					if (_.braces + _.parens === 0 && x.type !== "bos" && x.type !== "slash") {
						de({
							type: "text",
							value: P,
							output: k
						});
						continue;
					}
					de({
						type: "dot",
						value: P,
						output: k
					});
					continue;
				}
				if (P === "?") {
					if (!(x && x.value === "(") && g.noextglob !== !0 && fe() === "(" && fe(2) !== "?") {
						Ze("qmark", P);
						continue;
					}
					if (x && x.type === "paren") {
						const Q = fe();
						let ve = P;
						if (Q === "<" && !r.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
						(x.value === "(" && !/[!=<:]/.test(Q) || Q === "<" && !/<([!=]|\w+>)/.test(At())) && (ve = `\\${P}`), de({
							type: "text",
							value: P,
							output: ve
						});
						continue;
					}
					if (g.dot !== !0 && (x.type === "slash" || x.type === "bos")) {
						de({
							type: "qmark",
							value: P,
							output: G
						});
						continue;
					}
					de({
						type: "qmark",
						value: P,
						output: B
					});
					continue;
				}
				if (P === "!") {
					if (g.noextglob !== !0 && fe() === "(" && (fe(2) !== "?" || !/[!=<:]/.test(fe(3)))) {
						Ze("negate", P);
						continue;
					}
					if (g.nonegate !== !0 && _.index === 0) {
						rn();
						continue;
					}
				}
				if (P === "+") {
					if (g.noextglob !== !0 && fe() === "(" && fe(2) !== "?") {
						Ze("plus", P);
						continue;
					}
					if (x && x.value === "(" || g.regex === !1) {
						de({
							type: "plus",
							value: P,
							output: V
						});
						continue;
					}
					if (x && (x.type === "bracket" || x.type === "paren" || x.type === "brace") || _.parens > 0) {
						de({
							type: "plus",
							value: P
						});
						continue;
					}
					de({
						type: "plus",
						value: V
					});
					continue;
				}
				if (P === "@") {
					if (g.noextglob !== !0 && fe() === "(" && fe(2) !== "?") {
						de({
							type: "at",
							extglob: !0,
							value: P,
							output: ""
						});
						continue;
					}
					de({
						type: "text",
						value: P
					});
					continue;
				}
				if (P !== "*") {
					(P === "$" || P === "^") && (P = `\\${P}`);
					const Q = a.exec(At());
					Q && (P += Q[0], _.index += Q[0].length), de({
						type: "text",
						value: P
					});
					continue;
				}
				if (x && (x.type === "globstar" || x.star === !0)) {
					x.type = "star", x.star = !0, x.value += P, x.output = Ne, _.backtrack = !0, _.globstar = !0, ye(P);
					continue;
				}
				let te = At();
				if (g.noextglob !== !0 && /^\([^?]/.test(te)) {
					Ze("star", P);
					continue;
				}
				if (x.type === "star") {
					if (g.noglobstar === !0) {
						ye(P);
						continue;
					}
					const Q = x.prev, ve = Q.prev, Ke = Q.type === "slash" || Q.type === "bos", it = ve && (ve.type === "star" || ve.type === "globstar");
					if (g.bash === !0 && (!Ke || te[0] && te[0] !== "/")) {
						de({
							type: "star",
							value: P,
							output: ""
						});
						continue;
					}
					const st = _.braces > 0 && (Q.type === "comma" || Q.type === "brace"), Ri = J.length && (Q.type === "pipe" || Q.type === "paren");
					if (!Ke && Q.type !== "paren" && !st && !Ri) {
						de({
							type: "star",
							value: P,
							output: ""
						});
						continue;
					}
					for (; te.slice(0, 3) === "/**";) {
						const Wr = m[_.index + 4];
						if (Wr && Wr !== "/") break;
						te = te.slice(3), ye("/**", 3);
					}
					if (Q.type === "bos" && re()) {
						x.type = "globstar", x.value += P, x.output = W(g), _.output = x.output, _.globstar = !0, ye(P);
						continue;
					}
					if (Q.type === "slash" && Q.prev.type !== "bos" && !it && re()) {
						_.output = _.output.slice(0, -(Q.output + x.output).length), Q.output = `(?:${Q.output}`, x.type = "globstar", x.output = W(g) + (g.strictSlashes ? ")" : "|$)"), x.value += P, _.globstar = !0, _.output += Q.output + x.output, ye(P);
						continue;
					}
					if (Q.type === "slash" && Q.prev.type !== "bos" && te[0] === "/") {
						const Wr = te[1] !== void 0 ? "|$" : "";
						_.output = _.output.slice(0, -(Q.output + x.output).length), Q.output = `(?:${Q.output}`, x.type = "globstar", x.output = `${W(g)}${K}|${K}${Wr})`, x.value += P, _.output += Q.output + x.output, _.globstar = !0, ye(P + Qe()), de({
							type: "slash",
							value: "/",
							output: ""
						});
						continue;
					}
					if (Q.type === "bos" && te[0] === "/") {
						x.type = "globstar", x.value += P, x.output = `(?:^|${K}|${W(g)}${K})`, _.output = x.output, _.globstar = !0, ye(P + Qe()), de({
							type: "slash",
							value: "/",
							output: ""
						});
						continue;
					}
					_.output = _.output.slice(0, -x.output.length), x.type = "globstar", x.output = W(g), x.value += P, _.output += x.output, _.globstar = !0, ye(P);
					continue;
				}
				const Ae = {
					type: "star",
					value: P,
					output: Ne
				};
				if (g.bash === !0) {
					Ae.output = ".*?", (x.type === "bos" || x.type === "slash") && (Ae.output = se + Ae.output), de(Ae);
					continue;
				}
				if (x && (x.type === "bracket" || x.type === "paren") && g.regex === !0) {
					Ae.output = P, de(Ae);
					continue;
				}
				(_.index === _.start || x.type === "slash" || x.type === "dot") && (x.type === "dot" ? (_.output += oe, x.output += oe) : g.dot === !0 ? (_.output += I, x.output += I) : (_.output += se, x.output += se), fe() !== "*" && (_.output += L, x.output += L)), de(Ae);
			}
			for (; _.brackets > 0;) {
				if (g.strictBrackets === !0) throw new SyntaxError(c("closing", "]"));
				_.output = r.escapeLast(_.output, "["), ht("brackets");
			}
			for (; _.parens > 0;) {
				if (g.strictBrackets === !0) throw new SyntaxError(c("closing", ")"));
				_.output = r.escapeLast(_.output, "("), ht("parens");
			}
			for (; _.braces > 0;) {
				if (g.strictBrackets === !0) throw new SyntaxError(c("closing", "}"));
				_.output = r.escapeLast(_.output, "{"), ht("braces");
			}
			if (g.strictSlashes !== !0 && (x.type === "star" || x.type === "bracket") && de({
				type: "maybe_slash",
				value: "",
				output: `${K}?`
			}), _.backtrack === !0) {
				_.output = "";
				for (const te of _.tokens) _.output += te.output != null ? te.output : te.value, te.suffix && (_.output += te.suffix);
			}
			return _;
		};
		d.fastpaths = (m, p) => {
			const g = { ...p }, v = typeof g.maxLength == "number" ? Math.min(i, g.maxLength) : i, F = m.length;
			if (F > v) throw new SyntaxError(`Input length: ${F}, exceeds maximum allowed length: ${v}`);
			m = u[m] || m;
			const { DOT_LITERAL: S, SLASH_LITERAL: C, ONE_CHAR: w, DOTS_SLASH: T, NO_DOT: A, NO_DOTS: k, NO_DOTS_SLASH: V, STAR: K, START_ANCHOR: L } = n.globChars(g.windows), M = g.dot ? k : A, O = g.dot ? V : A, oe = g.capture ? "" : "?:", I = {
				negated: !1,
				prefix: ""
			};
			let B = g.bash === !0 ? ".*?" : K;
			g.capture && (B = `(${B})`);
			const G = (W) => W.noglobstar === !0 ? B : `(${oe}(?:(?!${L}${W.dot ? T : S}).)*?)`, q = (W) => {
				switch (W) {
					case "*": return `${M}${w}${B}`;
					case ".*": return `${S}${w}${B}`;
					case "*.*": return `${M}${B}${S}${w}${B}`;
					case "*/*": return `${M}${B}${C}${w}${O}${B}`;
					case "**": return M + G(g);
					case "**/*": return `(?:${M}${G(g)}${C})?${O}${w}${B}`;
					case "**/*.*": return `(?:${M}${G(g)}${C})?${O}${B}${S}${w}${B}`;
					case "**/.*": return `(?:${M}${G(g)}${C})?${S}${w}${B}`;
					default: {
						const se = /^(.*?)\.(\w+)$/.exec(W);
						if (!se) return;
						const ue = q(se[1]);
						return ue ? ue + S + se[2] : void 0;
					}
				}
			};
			let ee = q(r.removePrefix(m, I));
			return ee && g.strictSlashes !== !0 && (ee += `${C}?`), ee;
		}, t.exports = d;
	})), M9 = xn(((e, t) => {
		const n = x9(), r = O9(), i = hu(), s = xs(), a = (u) => u && typeof u == "object" && !Array.isArray(u), o = (u, l, c = !1) => {
			if (Array.isArray(u)) {
				const C = u.map((T) => o(T, l, c));
				return (T) => {
					for (const A of C) {
						const k = A(T);
						if (k) return k;
					}
					return !1;
				};
			}
			const d = a(u) && u.tokens && u.input;
			if (u === "" || typeof u != "string" && !d) throw new TypeError("Expected pattern to be a non-empty string");
			const m = l || {}, p = m.windows, g = d ? o.compileRe(u, l) : o.makeRe(u, l, !1, !0), v = g.state;
			delete g.state;
			let F = () => !1;
			if (m.ignore) {
				const C = {
					...l,
					ignore: null,
					onMatch: null,
					onResult: null
				};
				F = o(m.ignore, C, c);
			}
			const S = (C, w = !1) => {
				const { isMatch: T, match: A, output: k } = o.test(C, g, l, {
					glob: u,
					posix: p
				}), V = {
					glob: u,
					state: v,
					regex: g,
					posix: p,
					input: C,
					output: k,
					match: A,
					isMatch: T
				};
				return typeof m.onResult == "function" && m.onResult(V), T === !1 ? (V.isMatch = !1, w ? V : !1) : F(C) ? (typeof m.onIgnore == "function" && m.onIgnore(V), V.isMatch = !1, w ? V : !1) : (typeof m.onMatch == "function" && m.onMatch(V), w ? V : !0);
			};
			return c && (S.state = v), S;
		};
		o.test = (u, l, c, { glob: d, posix: m } = {}) => {
			if (typeof u != "string") throw new TypeError("Expected input to be a string");
			if (u === "") return {
				isMatch: !1,
				output: ""
			};
			const p = c || {}, g = p.format || (m ? i.toPosixSlashes : null);
			let v = u === d, F = v && g ? g(u) : u;
			return v === !1 && (F = g ? g(u) : u, v = F === d), (v === !1 || p.capture === !0) && (p.matchBase === !0 || p.basename === !0 ? v = o.matchBase(u, l, c, m) : v = l.exec(F)), {
				isMatch: !!v,
				match: v,
				output: F
			};
		}, o.matchBase = (u, l, c) => (l instanceof RegExp ? l : o.makeRe(l, c)).test(i.basename(u)), o.isMatch = (u, l, c) => o(l, c)(u), o.parse = (u, l) => Array.isArray(u) ? u.map((c) => o.parse(c, l)) : r(u, {
			...l,
			fastpaths: !1
		}), o.scan = (u, l) => n(u, l), o.compileRe = (u, l, c = !1, d = !1) => {
			if (c === !0) return u.output;
			const m = l || {}, p = m.contains ? "" : "^", g = m.contains ? "" : "$";
			let v = `${p}(?:${u.output})${g}`;
			u && u.negated === !0 && (v = `^(?!${v}).*$`);
			const F = o.toRegex(v, l);
			return d === !0 && (F.state = u), F;
		}, o.makeRe = (u, l, c = !1, d = !1) => {
			if (!u || typeof u != "string") throw new TypeError("Expected a non-empty string");
			const m = l || {};
			let p = {
				negated: !1,
				fastpaths: !0
			}, g = "", v;
			return u.startsWith("./") && (u = u.slice(2), g = p.prefix = "./"), m.fastpaths !== !1 && (u[0] === "." || u[0] === "*") && (v = r.fastpaths(u, l)), v === void 0 ? (p = r(u, l), p.prefix = g + (p.prefix || "")) : p.output = v, o.compileRe(p, l, c, d);
		}, o.toRegex = (u, l) => {
			try {
				const c = l || {};
				return new RegExp(u, c.flags || (c.nocase ? "i" : ""));
			} catch (c) {
				if (l && l.debug === !0) throw c;
				return /$^/;
			}
		}, o.constants = s, t.exports = o;
	})), B9 = ba(xn(((e, t) => {
		t.exports = M9();
	}))());
	const Nd = (e, t) => {
		const { schema: n, documentAST: r, introspectionJSON: i, introspectionJSONString: s, buildSchemaOptions: a, documentString: o } = e;
		if (n) return n;
		if (s) return i0(JSON.parse(s), a);
		if (o && t) return o0(t(o), a);
		if (i) return i0(i, a);
		if (r) return o0(r, a);
		throw new Error("No schema supplied");
	}, V9 = /* @__PURE__ */ new Map();
	var $9 = class {
		_parser = ls;
		_schemas = [];
		_schemaCache = V9;
		_schemaLoader = Nd;
		_parseOptions;
		_customValidationRules;
		_externalFragmentDefinitionNodes = null;
		_externalFragmentDefinitionsString = null;
		_completionSettings;
		constructor({ parser: e, schemas: t, parseOptions: n, externalFragmentDefinitions: r, customValidationRules: i, fillLeafsOnComplete: s, completionSettings: a }) {
			this._schemaLoader = Nd, t && (this._schemas = t, this._cacheSchemas()), e && (this._parser = e), this._completionSettings = {
				...a,
				fillLeafsOnComplete: a?.fillLeafsOnComplete ?? s
			}, n && (this._parseOptions = n), i && (this._customValidationRules = i), r && (Array.isArray(r) ? this._externalFragmentDefinitionNodes = r : this._externalFragmentDefinitionsString = r);
		}
		_cacheSchemas() {
			for (const e of this._schemas) this._cacheSchema(e);
		}
		_cacheSchema(e) {
			const t = this._schemaLoader(e, this.parse.bind(this));
			return this._schemaCache.set(e.uri, {
				...e,
				schema: t
			});
		}
		getSchemaForFile(e) {
			if (!this._schemas.length) return;
			if (this._schemas.length === 1) return this._schemaCache.get(this._schemas[0].uri);
			const t = this._schemas.find((n) => n.fileMatch ? n.fileMatch.some((r) => (0, B9.default)(r)(e)) : !1);
			if (t) return this._schemaCache.get(t.uri) || this._cacheSchema(t).get(t.uri);
		}
		getExternalFragmentDefinitions() {
			if (!this._externalFragmentDefinitionNodes && this._externalFragmentDefinitionsString) {
				const e = [];
				try {
					jn(this._parser(this._externalFragmentDefinitionsString), { FragmentDefinition(t) {
						e.push(t);
					} });
				} catch {
					throw new Error(`Failed parsing externalFragmentDefinitions string:
${this._externalFragmentDefinitionsString}`);
				}
				this._externalFragmentDefinitionNodes = e;
			}
			return this._externalFragmentDefinitionNodes;
		}
		async updateSchemas(e) {
			this._schemas = e, this._cacheSchemas();
		}
		updateSchema(e) {
			const t = this._schemas.findIndex((n) => n.uri === e.uri);
			if (t < 0) {
				console.warn("updateSchema could not find a schema in your config by that URI", e.uri);
				return;
			}
			this._schemas[t] = e, this._cacheSchema(e);
		}
		addSchema(e) {
			this._schemas.push(e), this._cacheSchema(e);
		}
		parse(e, t) {
			return this._parser(e, t || this._parseOptions);
		}
		getCompletion = (e, t, n) => {
			const r = this.getSchemaForFile(e);
			return !t || !r?.schema ? [] : e9(r.schema, t, n, void 0, this.getExternalFragmentDefinitions(), {
				uri: e,
				...this._completionSettings
			});
		};
		getDiagnostics = (e, t, n) => {
			const r = this.getSchemaForFile(e);
			return !t || t.trim().length < 2 || !r?.schema ? [] : S9(t, r.schema, n ?? this._customValidationRules, !1, this.getExternalFragmentDefinitions());
		};
		getHover = (e, t, n, r) => {
			const i = this.getSchemaForFile(e);
			if (i && t.length > 3) return w9(i.schema, t, n, void 0, {
				useMarkdown: !0,
				...r
			});
		};
		getVariablesJSONSchema = (e, t, n) => {
			const r = this.getSchemaForFile(e);
			if (r && t.length > 3) try {
				const { variableToType: i } = T9(this.parse(t), r.schema);
				if (i) return E9(i, {
					...n,
					scalarSchemas: r.customScalarSchemas
				});
			} catch {}
			return null;
		};
	};
	function Td(e) {
		return {
			startLineNumber: e.start.line + 1,
			startColumn: e.start.character + 1,
			endLineNumber: e.end.line + 1,
			endColumn: e.end.character + 1
		};
	}
	function Sd(e) {
		return new Sn(e.lineNumber - 1, e.column - 1);
	}
	function U9(e, t) {
		return {
			label: e.label,
			insertText: e.insertText,
			sortText: e.sortText,
			filterText: e.filterText,
			...e.documentation && { documentation: { value: e.documentation } },
			detail: e.detail,
			...t && { range: Td(t) },
			kind: e.kind,
			...e.insertTextFormat && { insertTextFormat: e.insertTextFormat },
			...e.insertTextMode && { insertTextMode: e.insertTextMode },
			...e.command && { command: {
				...e.command,
				id: e.command.command
			} },
			...e.labelDetails && { labelDetails: e.labelDetails }
		};
	}
	function j9(e) {
		const t = {
			1: Kn.Error,
			2: Kn.Warning,
			3: Kn.Info,
			4: Kn.Hint
		};
		return e ? t[e] : t[2];
	}
	function q9(e) {
		return {
			startLineNumber: e.range.start.line + 1,
			endLineNumber: e.range.end.line + 1,
			startColumn: e.range.start.character + 1,
			endColumn: e.range.end.character,
			message: e.message,
			severity: j9(e.severity),
			code: e.code || void 0
		};
	}
	var H9 = T2({
		__debug: () => hl,
		check: () => dh,
		default: () => Su,
		doc: () => sa,
		format: () => Tu,
		formatWithCursor: () => fa,
		getSupportInfo: () => dl,
		util: () => aa,
		version: () => ll
	});
	function G9(e, t, n) {
		return Sh.diff(e, t, n);
	}
	function W9(e) {
		let t = e.indexOf(Hs);
		return t !== -1 ? e.charAt(t + 1) === Ai ? Au : Fu : Ah;
	}
	function pu(e) {
		return e === Fu ? Hs : e === Au ? Cu : Ch;
	}
	function Fd(e, t) {
		let n = wh.get(t);
		return e.match(n)?.length ?? 0;
	}
	function z9(e) {
		return Fi(0, e, Ih, Ai);
	}
	function Y9(e) {
		return this[e < 0 ? this.length + e : e];
	}
	function J9(e) {
		let t = e.length;
		for (; t > 0 && (e[t - 1] === "\r" || e[t - 1] === `
`);) t--;
		return t < e.length ? e.slice(0, t) : e;
	}
	function X9(e) {
		if (typeof e == "string") return Yn;
		if (Array.isArray(e)) return un;
		if (!e) return;
		let { type: t } = e;
		if (wu.has(t)) return t;
	}
	function Q9(e) {
		let t = e === null ? "null" : typeof e;
		if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
		if (Jn(e)) throw new Error("doc is valid.");
		let n = Object.prototype.toString.call(e);
		if (n !== "[object Object]") return `Unexpected doc '${n}'.`;
		let r = Lh([...wu].map((i) => `'${i}'`));
		return `Unexpected doc.type '${e.type}'.
Expected it to be ${r}.`;
	}
	function Z9(e, t, n, r) {
		let i = [e];
		for (; i.length > 0;) {
			let s = i.pop();
			if (s === Iu) {
				n(i.pop());
				continue;
			}
			n && i.push(s, Iu);
			let a = Jn(s);
			if (!a) throw new pr(s);
			if (t?.(s) !== !1) switch (a) {
				case un:
				case Zt: {
					let o = a === un ? s : s.parts;
					for (let u = o.length - 1; u >= 0; --u) i.push(o[u]);
					break;
				}
				case Ft:
					i.push(s.flatContents, s.breakContents);
					break;
				case vt:
					if (r && s.expandedStates) for (let o = s.expandedStates.length, u = o - 1; u >= 0; --u) i.push(s.expandedStates[u]);
					else i.push(s.contents);
					break;
				case cn:
				case ln:
				case dn:
				case Kt:
				case hn:
					i.push(s.contents);
					break;
				case Yn:
				case Cn:
				case fn:
				case pn:
				case lt:
				case Ot: break;
				default: throw new pr(s);
			}
		}
	}
	function Os(e, t) {
		if (typeof e == "string") return t(e);
		let n = /* @__PURE__ */ new Map();
		return r(e);
		function r(s) {
			if (n.has(s)) return n.get(s);
			let a = i(s);
			return n.set(s, a), a;
		}
		function i(s) {
			switch (Jn(s)) {
				case un: return t(s.map(r));
				case Zt: return t({
					...s,
					parts: s.parts.map(r)
				});
				case Ft: return t({
					...s,
					breakContents: r(s.breakContents),
					flatContents: r(s.flatContents)
				});
				case vt: {
					let { expandedStates: a, contents: o } = s;
					return a ? (a = a.map(r), o = a[0]) : o = r(o), t({
						...s,
						contents: o,
						expandedStates: a
					});
				}
				case cn:
				case ln:
				case dn:
				case Kt:
				case hn: return t({
					...s,
					contents: r(s.contents)
				});
				case Yn:
				case Cn:
				case fn:
				case pn:
				case lt:
				case Ot: return t(s);
				default: throw new pr(s);
			}
		}
	}
	function mu(e, t, n) {
		let r = n, i = !1;
		function s(a) {
			if (i) return !1;
			let o = t(a);
			o !== void 0 && (i = !0, r = o);
		}
		return Gs(e, s), r;
	}
	function K9(e) {
		if (e.type === vt && e.break || e.type === lt && e.hard || e.type === Ot) return !0;
	}
	function e6(e) {
		return mu(e, K9, !1);
	}
	function Ad(e) {
		if (e.length > 0) {
			let t = Xe(0, e, -1);
			!t.expandedStates && !t.break && (t.break = "propagated");
		}
		return null;
	}
	function t6(e) {
		let t = /* @__PURE__ */ new Set(), n = [];
		function r(s) {
			if (s.type === Ot && Ad(n), s.type === vt) {
				if (n.push(s), t.has(s)) return !1;
				t.add(s);
			}
		}
		function i(s) {
			s.type === vt && n.pop().break && Ad(n);
		}
		Gs(e, r, i, !0);
	}
	function n6(e) {
		return e.type === lt && !e.hard ? e.soft ? "" : " " : e.type === Ft ? e.flatContents : e;
	}
	function r6(e) {
		return Os(e, n6);
	}
	function Cd(e) {
		for (e = [...e]; e.length >= 2 && Xe(0, e, -2).type === lt && Xe(0, e, -1).type === Ot;) e.length -= 2;
		if (e.length > 0) {
			let t = _i(Xe(0, e, -1));
			e[e.length - 1] = t;
		}
		return e;
	}
	function _i(e) {
		switch (Jn(e)) {
			case ln:
			case dn:
			case vt:
			case hn:
			case Kt: {
				let t = _i(e.contents);
				return {
					...e,
					contents: t
				};
			}
			case Ft: return {
				...e,
				breakContents: _i(e.breakContents),
				flatContents: _i(e.flatContents)
			};
			case Zt: return {
				...e,
				parts: Cd(e.parts)
			};
			case un: return Cd(e);
			case Yn: return J9(e);
			case cn:
			case Cn:
			case fn:
			case pn:
			case lt:
			case Ot: break;
			default: throw new pr(e);
		}
		return e;
	}
	function wd(e) {
		return _i(s6(e));
	}
	function i6(e) {
		switch (Jn(e)) {
			case Zt:
				if (e.parts.every((t) => t === "")) return "";
				break;
			case vt:
				if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
				if (e.contents.type === vt && e.contents.id === e.id && e.contents.break === e.break && e.contents.expandedStates === e.expandedStates) return e.contents;
				break;
			case cn:
			case ln:
			case dn:
			case hn:
				if (!e.contents) return "";
				break;
			case Ft:
				if (!e.flatContents && !e.breakContents) return "";
				break;
			case un: {
				let t = [];
				for (let n of e) {
					if (!n) continue;
					let [r, ...i] = Array.isArray(n) ? n : [n];
					typeof r == "string" && typeof Xe(0, t, -1) == "string" ? t[t.length - 1] += r : t.push(r), t.push(...i);
				}
				return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
			}
			case Yn:
			case Cn:
			case fn:
			case pn:
			case lt:
			case Kt:
			case Ot: break;
			default: throw new pr(e);
		}
		return e;
	}
	function s6(e) {
		return Os(e, (t) => i6(t));
	}
	function a6(e, t = xu) {
		return Os(e, (n) => typeof n == "string" ? kd(t, n.split(`
`)) : n);
	}
	function o6(e) {
		if (e.type === lt) return !0;
	}
	function u6(e) {
		return mu(e, o6, !1);
	}
	function Ms(e, t) {
		return e.type === Kt ? {
			...e,
			contents: t(e.contents)
		} : t(e);
	}
	function Ps(e) {
		return en(e), {
			type: ln,
			contents: e
		};
	}
	function qr(e, t) {
		return xh(e), en(t), {
			type: cn,
			contents: t,
			n: e
		};
	}
	function l6(e) {
		return qr(Number.NEGATIVE_INFINITY, e);
	}
	function Id(e) {
		return qr({ type: "root" }, e);
	}
	function c6(e) {
		return qr(-1, e);
	}
	function Ld(e, t, n) {
		en(e);
		let r = e;
		if (t > 0) {
			for (let i = 0; i < Math.floor(t / n); ++i) r = Ps(r);
			r = qr(t % n, r), r = qr(Number.NEGATIVE_INFINITY, r);
		}
		return r;
	}
	function f6(e) {
		return kh(e), {
			type: Zt,
			parts: e
		};
	}
	function Rd(e, t = {}) {
		return en(e), Lu(t.expandedStates, !0), {
			type: vt,
			id: t.id,
			contents: e,
			break: !!t.shouldBreak,
			expandedStates: t.expandedStates
		};
	}
	function d6(e, t) {
		return Rd(e[0], {
			...t,
			expandedStates: e
		});
	}
	function h6(e, t = "", n = {}) {
		return en(e), t !== "" && en(t), {
			type: Ft,
			breakContents: e,
			flatContents: t,
			groupId: n.groupId
		};
	}
	function p6(e, t) {
		return en(e), {
			type: dn,
			contents: e,
			groupId: t.groupId,
			negate: t.negate
		};
	}
	function kd(e, t) {
		en(e), Lu(t);
		let n = [];
		for (let r = 0; r < t.length; r++) r !== 0 && n.push(e), n.push(t[r]);
		return n;
	}
	function m6(e, t) {
		return en(t), e ? {
			type: Kt,
			label: e,
			contents: t
		} : t;
	}
	function gu(e) {
		return en(e), {
			type: hn,
			contents: e
		};
	}
	function Fn(e) {
		if (!e) return "";
		if (Array.isArray(e)) {
			let t = [];
			for (let n of e) if (Array.isArray(n)) t.push(...Fn(n));
			else {
				let r = Fn(n);
				r !== "" && t.push(r);
			}
			return t;
		}
		return e.type === Ft ? {
			...e,
			breakContents: Fn(e.breakContents),
			flatContents: Fn(e.flatContents)
		} : e.type === vt ? {
			...e,
			contents: Fn(e.contents),
			expandedStates: e.expandedStates?.map(Fn)
		} : e.type === Zt ? {
			type: "fill",
			parts: e.parts.map(Fn)
		} : e.contents ? {
			...e,
			contents: Fn(e.contents)
		} : e;
	}
	function g6(e) {
		let t = Object.create(null), n = /* @__PURE__ */ new Set();
		return r(Fn(e));
		function r(s, a, o) {
			if (typeof s == "string") return JSON.stringify(s);
			if (Array.isArray(s)) {
				let u = s.map(r).filter(Boolean);
				return u.length === 1 ? u[0] : `[${u.join(", ")}]`;
			}
			if (s.type === lt) {
				let u = o?.[a + 1]?.type === Ot;
				return s.literal ? u ? "literalline" : "literallineWithoutBreakParent" : s.hard ? u ? "hardline" : "hardlineWithoutBreakParent" : s.soft ? "softline" : "line";
			}
			if (s.type === Ot) return o?.[a - 1]?.type === lt && o[a - 1].hard ? void 0 : "breakParent";
			if (s.type === fn) return "trim";
			if (s.type === ln) return "indent(" + r(s.contents) + ")";
			if (s.type === cn) return s.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + r(s.contents) + ")" : s.n < 0 ? "dedent(" + r(s.contents) + ")" : s.n.type === "root" ? "markAsRoot(" + r(s.contents) + ")" : "align(" + JSON.stringify(s.n) + ", " + r(s.contents) + ")";
			if (s.type === Ft) return "ifBreak(" + r(s.breakContents) + (s.flatContents ? ", " + r(s.flatContents) : "") + (s.groupId ? (s.flatContents ? "" : ", \"\"") + `, { groupId: ${i(s.groupId)} }` : "") + ")";
			if (s.type === dn) {
				let u = [];
				s.negate && u.push("negate: true"), s.groupId && u.push(`groupId: ${i(s.groupId)}`);
				let l = u.length > 0 ? `, { ${u.join(", ")} }` : "";
				return `indentIfBreak(${r(s.contents)}${l})`;
			}
			if (s.type === vt) {
				let u = [];
				s.break && s.break !== "propagated" && u.push("shouldBreak: true"), s.id && u.push(`id: ${i(s.id)}`);
				let l = u.length > 0 ? `, { ${u.join(", ")} }` : "";
				return s.expandedStates ? `conditionalGroup([${s.expandedStates.map((c) => r(c)).join(",")}]${l})` : `group(${r(s.contents)}${l})`;
			}
			if (s.type === Zt) return `fill([${s.parts.map((u) => r(u)).join(", ")}])`;
			if (s.type === hn) return "lineSuffix(" + r(s.contents) + ")";
			if (s.type === pn) return "lineSuffixBoundary";
			if (s.type === Kt) return `label(${JSON.stringify(s.label)}, ${r(s.contents)})`;
			if (s.type === Cn) return "cursor";
			throw new Error("Unknown doc type " + s.type);
		}
		function i(s) {
			if (typeof s != "symbol") return JSON.stringify(String(s));
			if (s in t) return t[s];
			let a = s.description || "symbol";
			for (let o = 0;; o++) {
				let u = a + (o > 0 ? ` #${o}` : "");
				if (!n.has(u)) return n.add(u), t[s] = `Symbol.for(${JSON.stringify(u)})`;
			}
		}
	}
	function D6(e) {
		return e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
	}
	function y6(e) {
		return e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9776 && e <= 9783 || e >= 9800 && e <= 9811 || e === 9855 || e >= 9866 && e <= 9871 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12773 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e >= 94192 && e <= 94198 || e >= 94208 && e <= 101589 || e >= 101631 && e <= 101662 || e >= 101760 && e <= 101874 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e >= 119552 && e <= 119638 || e >= 119648 && e <= 119670 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128728 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129674 || e >= 129678 && e <= 129734 || e === 129736 || e >= 129741 && e <= 129756 || e >= 129759 && e <= 129770 || e >= 129775 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
	}
	function v6(e) {
		if (!e) return 0;
		if (!$h.test(e)) return e.length;
		e = e.replace(Bh(), (n) => Uh.has(n) ? " " : "  ");
		let t = 0;
		for (let n of e) {
			let r = n.codePointAt(0);
			r <= 31 || r >= 127 && r <= 159 || r >= 768 && r <= 879 || r >= 65024 && r <= 65039 || (t += D6(r) || y6(r) ? 2 : 1);
		}
		return t;
	}
	function xd(e, t, n) {
		let r = t.type === 1 ? e.queue.slice(0, -1) : [...e.queue, t], i = "", s = 0, a = 0, o = 0;
		for (let g of r) switch (g.type) {
			case 0:
				c(), n.useTabs ? u(1) : l(n.tabWidth);
				break;
			case 3: {
				let { string: v } = g;
				c(), i += v, s += v.length;
				break;
			}
			case 2: {
				let { width: v } = g;
				a += 1, o += v;
				break;
			}
			default: throw new Error(`Unexpected indent comment '${g.type}'.`);
		}
		return m(), {
			...e,
			value: i,
			length: s,
			queue: r
		};
		function u(g) {
			i += "	".repeat(g), s += n.tabWidth * g;
		}
		function l(g) {
			i += " ".repeat(g), s += g;
		}
		function c() {
			n.useTabs ? d() : m();
		}
		function d() {
			a > 0 && u(a), p();
		}
		function m() {
			o > 0 && l(o), p();
		}
		function p() {
			a = 0, o = 0;
		}
	}
	function E6(e, t, n) {
		if (!t) return e;
		if (t.type === "root") return {
			...e,
			root: e
		};
		if (t === Number.NEGATIVE_INFINITY) return e.root;
		let r;
		return typeof t == "number" ? t < 0 ? r = qh : r = {
			type: 2,
			width: t
		} : r = {
			type: 3,
			string: t
		}, xd(e, r, n);
	}
	function b6(e, t) {
		return xd(e, jh, t);
	}
	function _6(e) {
		let t = 0;
		for (let n = e.length - 1; n >= 0; n--) {
			let r = e[n];
			if (r === " " || r === "	") t++;
			else break;
		}
		return t;
	}
	function Od(e) {
		let t = _6(e);
		return {
			text: t === 0 ? e : e.slice(0, e.length - t),
			count: t
		};
	}
	function Bs(e, t, n, r, i, s) {
		if (n === Number.POSITIVE_INFINITY) return !0;
		let a = t.length, o = !1, u = [e], l = "";
		for (; n >= 0;) {
			if (u.length === 0) {
				if (a === 0) return !0;
				u.push(t[--a]);
				continue;
			}
			let { mode: c, doc: d } = u.pop(), m = Jn(d);
			switch (m) {
				case Yn:
					d && (o && (l += " ", n -= 1, o = !1), l += d, n -= zs(d));
					break;
				case un:
				case Zt: {
					let p = m === un ? d : d.parts, g = d[Ys] ?? 0;
					for (let v = p.length - 1; v >= g; v--) u.push({
						mode: c,
						doc: p[v]
					});
					break;
				}
				case ln:
				case cn:
				case dn:
				case Kt:
					u.push({
						mode: c,
						doc: d.contents
					});
					break;
				case fn: {
					let { text: p, count: g } = Od(l);
					l = p, n += g;
					break;
				}
				case vt: {
					if (s && d.break) return !1;
					let p = d.break ? Et : c, g = d.expandedStates && p === Et ? Xe(0, d.expandedStates, -1) : d.contents;
					u.push({
						mode: p,
						doc: g
					});
					break;
				}
				case Ft: {
					let p = (d.groupId ? i[d.groupId] || tn : c) === Et ? d.breakContents : d.flatContents;
					p && u.push({
						mode: c,
						doc: p
					});
					break;
				}
				case lt:
					if (c === Et || d.hard) return !0;
					d.soft || (o = !0);
					break;
				case hn:
					r = !0;
					break;
				case pn:
					if (r) return !1;
					break;
			}
		}
		return !1;
	}
	function Vs(e, t) {
		let n = Object.create(null), r = t.printWidth, i = pu(t.endOfLine), s = 0, a = [{
			indent: Ou,
			mode: Et,
			doc: e
		}], o = "", u = !1, l = [], c = [], d = [], m = [], p = 0;
		for (t6(e); a.length > 0;) {
			let { indent: C, mode: w, doc: T } = a.pop();
			switch (Jn(T)) {
				case Yn: {
					let A = i !== `
` ? Fi(0, T, `
`, i) : T;
					A && (o += A, a.length > 0 && (s += zs(A)));
					break;
				}
				case un:
					for (let A = T.length - 1; A >= 0; A--) a.push({
						indent: C,
						mode: w,
						doc: T[A]
					});
					break;
				case Cn:
					if (c.length >= 2) throw new Error("There are too many 'cursor' in doc.");
					c.push(p + o.length);
					break;
				case ln:
					a.push({
						indent: b6(C, t),
						mode: w,
						doc: T.contents
					});
					break;
				case cn:
					a.push({
						indent: E6(C, T.n, t),
						mode: w,
						doc: T.contents
					});
					break;
				case fn:
					S();
					break;
				case vt:
					switch (w) {
						case tn: if (!u) {
							a.push({
								indent: C,
								mode: T.break ? Et : tn,
								doc: T.contents
							});
							break;
						}
						case Et: {
							u = !1;
							let A = {
								indent: C,
								mode: tn,
								doc: T.contents
							}, k = r - s, V = l.length > 0;
							if (!T.break && Bs(A, a, k, V, n)) a.push(A);
							else if (T.expandedStates) {
								let K = Xe(0, T.expandedStates, -1);
								if (T.break) {
									a.push({
										indent: C,
										mode: Et,
										doc: K
									});
									break;
								} else for (let L = 1; L < T.expandedStates.length + 1; L++) if (L >= T.expandedStates.length) {
									a.push({
										indent: C,
										mode: Et,
										doc: K
									});
									break;
								} else {
									let M = {
										indent: C,
										mode: tn,
										doc: T.expandedStates[L]
									};
									if (Bs(M, a, k, V, n)) {
										a.push(M);
										break;
									}
								}
							} else a.push({
								indent: C,
								mode: Et,
								doc: T.contents
							});
							break;
						}
					}
					T.id && (n[T.id] = Xe(0, a, -1).mode);
					break;
				case Zt: {
					let A = r - s, k = T[Ys] ?? 0, { parts: V } = T, K = V.length - k;
					if (K === 0) break;
					let L = V[k + 0], M = V[k + 1], O = {
						indent: C,
						mode: tn,
						doc: L
					}, oe = {
						indent: C,
						mode: Et,
						doc: L
					}, I = Bs(O, [], A, l.length > 0, n, !0);
					if (K === 1) {
						I ? a.push(O) : a.push(oe);
						break;
					}
					let B = {
						indent: C,
						mode: tn,
						doc: M
					}, G = {
						indent: C,
						mode: Et,
						doc: M
					};
					if (K === 2) {
						I ? a.push(B, O) : a.push(G, oe);
						break;
					}
					let q = V[k + 2], ee = {
						indent: C,
						mode: w,
						doc: {
							...T,
							[Ys]: k + 2
						}
					}, W = Bs({
						indent: C,
						mode: tn,
						doc: [
							L,
							M,
							q
						]
					}, [], A, l.length > 0, n, !0);
					a.push(ee), W ? a.push(B, O) : I ? a.push(G, O) : a.push(G, oe);
					break;
				}
				case Ft:
				case dn: {
					let A = T.groupId ? n[T.groupId] : w;
					if (A === Et) {
						let k = T.type === Ft ? T.breakContents : T.negate ? T.contents : Ps(T.contents);
						k && a.push({
							indent: C,
							mode: w,
							doc: k
						});
					}
					if (A === tn) {
						let k = T.type === Ft ? T.flatContents : T.negate ? Ps(T.contents) : T.contents;
						k && a.push({
							indent: C,
							mode: w,
							doc: k
						});
					}
					break;
				}
				case hn:
					l.push({
						indent: C,
						mode: w,
						doc: T.contents
					});
					break;
				case pn:
					l.length > 0 && a.push({
						indent: C,
						mode: w,
						doc: Ws
					});
					break;
				case lt:
					switch (w) {
						case tn: if (T.hard) u = !0;
						else {
							T.soft || (o += " ", s += 1);
							break;
						}
						case Et:
							if (l.length > 0) {
								a.push({
									indent: C,
									mode: w,
									doc: T
								}, ...l.reverse()), l.length = 0;
								break;
							}
							T.literal ? (o += i, s = 0, C.root && (C.root.value && (o += C.root.value), s = C.root.length)) : (S(), o += i + C.value, s = C.length);
							break;
					}
					break;
				case Kt:
					a.push({
						indent: C,
						mode: w,
						doc: T.contents
					});
					break;
				case Ot: break;
				default: throw new pr(T);
			}
			a.length === 0 && l.length > 0 && (a.push(...l.reverse()), l.length = 0);
		}
		let g = d.join("") + o, v = [...m, ...c];
		if (v.length !== 2) return { formatted: g };
		let F = v[0];
		return {
			formatted: g,
			cursorNodeStart: F,
			cursorNodeText: g.slice(F, Xe(0, v, -1))
		};
		function S() {
			let { text: C, count: w } = Od(o);
			C && (d.push(C), p += C.length), o = "", s -= w, c.length > 0 && (m.push(...c.map((T) => Math.min(T, p))), c.length = 0);
		}
	}
	function N6(e, t, n = 0) {
		let r = 0;
		for (let i = n; i < e.length; ++i) e[i] === "	" ? r = r + t - r % t : r++;
		return r;
	}
	function T6(e) {
		return e !== null && typeof e == "object";
	}
	function Ni(e) {
		return (t, n, r) => {
			let i = !!r?.backwards;
			if (n === !1) return !1;
			let { length: s } = t, a = n;
			for (; a >= 0 && a < s;) {
				let o = t.charAt(a);
				if (e instanceof RegExp) {
					if (!e.test(o)) return a;
				} else if (!e.includes(o)) return a;
				i ? a-- : a++;
			}
			return a === -1 || a === s ? a : !1;
		};
	}
	function S6(e, t, n) {
		let r = !!n?.backwards;
		if (t === !1) return !1;
		let i = e.charAt(t);
		if (r) {
			if (e.charAt(t - 1) === "\r" && i === `
`) return t - 2;
			if (Bu(i)) return t - 1;
		} else {
			if (i === "\r" && e.charAt(t + 1) === `
`) return t + 2;
			if (Bu(i)) return t + 1;
		}
		return t;
	}
	function F6(e, t, n = {}) {
		let r = wn(e, n.backwards ? t - 1 : t, n);
		return r !== Qn(e, r, n);
	}
	function A6(e) {
		return Array.isArray(e) && e.length > 0;
	}
	function* $s(e, t) {
		let { getVisitorKeys: n, filter: r = () => !0 } = t, i = (s) => Xs(s) && r(s);
		for (let s of n(e)) {
			let a = e[s];
			if (Array.isArray(a)) for (let o of a) i(o) && (yield o);
			else i(a) && (yield a);
		}
	}
	function* C6(e, t) {
		let n = [e];
		for (let r = 0; r < n.length; r++) {
			let i = n[r];
			for (let s of $s(i, t)) yield s, n.push(s);
		}
	}
	function w6(e, t) {
		return $s(e, t).next().done;
	}
	function Md(e, t, n) {
		let { cache: r } = n;
		if (r.has(e)) return r.get(e);
		let { filter: i } = n;
		if (!i) return [];
		let s, a = (n.getChildren?.(e, n) ?? [...$s(e, { getVisitorKeys: n.getVisitorKeys })]).flatMap((l) => (s ?? (s = [e, ...t]), i(l, s) ? [l] : Md(l, s, n))), { locStart: o, locEnd: u } = n;
		return a.sort((l, c) => o(l) - o(c) || u(l) - u(c)), r.set(e, a), a;
	}
	function I6(e) {
		let t = e.type || e.kind || "(unknown type)", n = String(e.name || e.id && (typeof e.id == "object" ? e.id.name : e.id) || e.key && (typeof e.key == "object" ? e.key.name : e.key) || e.value && (typeof e.value == "object" ? "" : String(e.value)) || e.operator || "");
		return n.length > 20 && (n = n.slice(0, 19) + "…"), t + (n ? " " + n : "");
	}
	function Du(e, t) {
		(e.comments ?? (e.comments = [])).push(t), t.printed = !1, t.nodeDescription = I6(e);
	}
	function Ti(e, t) {
		t.leading = !0, t.trailing = !1, Du(e, t);
	}
	function dr(e, t, n) {
		t.leading = !1, t.trailing = !1, n && (t.marker = n), Du(e, t);
	}
	function Si(e, t) {
		t.leading = !1, t.trailing = !0, Du(e, t);
	}
	function Pd(e, t, n, r, i = []) {
		let { locStart: s, locEnd: a } = n, o = s(t), u = a(t), l = Vu(e, i, {
			cache: $u,
			locStart: s,
			locEnd: a,
			getVisitorKeys: n.getVisitorKeys,
			filter: n.printer.canAttachComment,
			getChildren: n.printer.getCommentChildNodes
		}), c, d, m = 0, p = l.length;
		for (; m < p;) {
			let g = m + p >> 1, v = l[g], F = s(v), S = a(v);
			if (F <= o && u <= S) return Pd(v, t, n, v, [v, ...i]);
			if (S <= o) {
				c = v, m = g + 1;
				continue;
			}
			if (u <= F) {
				d = v, p = g;
				continue;
			}
			throw new Error("Comment location overlaps with node location");
		}
		if (r?.type === "TemplateLiteral") {
			let { quasis: g } = r, v = yu(g, t, n);
			c && yu(g, c, n) !== v && (c = null), d && yu(g, d, n) !== v && (d = null);
		}
		return {
			enclosingNode: r,
			precedingNode: c,
			followingNode: d
		};
	}
	function L6(e, t) {
		let { comments: n } = e;
		if (delete e.comments, !zh(n) || !t.printer.canAttachComment) return;
		let r = [], { printer: { features: { experimental_avoidAstMutation: i }, handleComments: s = {} }, originalText: a } = t, { ownLine: o = Qs, endOfLine: u = Qs, remaining: l = Qs } = s, c = n.map((d, m) => ({
			...Pd(e, d, t),
			comment: d,
			text: a,
			options: t,
			ast: e,
			isLastComment: n.length - 1 === m
		}));
		for (let [d, m] of c.entries()) {
			let { comment: p, precedingNode: g, enclosingNode: v, followingNode: F, text: S, options: C, ast: w, isLastComment: T } = m, A;
			if (i ? A = [m] : (p.enclosingNode = v, p.precedingNode = g, p.followingNode = F, A = [
				p,
				S,
				C,
				w,
				T
			]), R6(S, C, c, d)) p.placement = "ownLine", o(...A) || (F ? Ti(F, p) : g ? Si(g, p) : dr(v || w, p));
			else if (k6(S, C, c, d)) p.placement = "endOfLine", u(...A) || (g ? Si(g, p) : F ? Ti(F, p) : dr(v || w, p));
			else if (p.placement = "remaining", !l(...A)) if (g && F) {
				let k = r.length;
				k > 0 && r[k - 1].followingNode !== F && Bd(r, C), r.push(m);
			} else g ? Si(g, p) : F ? Ti(F, p) : dr(v || w, p);
		}
		if (Bd(r, t), !i) for (let d of n) delete d.precedingNode, delete d.enclosingNode, delete d.followingNode;
	}
	function R6(e, t, n, r) {
		let { comment: i, precedingNode: s } = n[r], { locStart: a, locEnd: o } = t, u = a(i);
		if (s) for (let l = r - 1; l >= 0; l--) {
			let { comment: c, precedingNode: d } = n[l];
			if (d !== s || !Uu(e.slice(o(c), u))) break;
			u = a(c);
		}
		return In(e, u, { backwards: !0 });
	}
	function k6(e, t, n, r) {
		let { comment: i, followingNode: s } = n[r], { locStart: a, locEnd: o } = t, u = o(i);
		if (s) for (let l = r + 1; l < n.length; l++) {
			let { comment: c, followingNode: d } = n[l];
			if (d !== s || !Uu(e.slice(u, a(c)))) break;
			u = o(c);
		}
		return In(e, u);
	}
	function Bd(e, t) {
		let n = e.length;
		if (n === 0) return;
		let { precedingNode: r, followingNode: i } = e[0], s = t.locStart(i), a;
		for (a = n; a > 0; --a) {
			let { comment: o, precedingNode: u, followingNode: l } = e[a - 1];
			An(u, r), An(l, i);
			let c = t.originalText.slice(t.locEnd(o), s);
			if (t.printer.isGap?.(c, t) ?? /^[\s(]*$/u.test(c)) s = t.locStart(o);
			else break;
		}
		for (let [o, { comment: u }] of e.entries()) o < a ? Si(r, u) : Ti(i, u);
		for (let o of [r, i]) o.comments && o.comments.length > 1 && o.comments.sort((u, l) => t.locStart(u) - t.locStart(l));
		e.length = 0;
	}
	function yu(e, t, n) {
		let r = n.locStart(t) - 1;
		for (let i = 1; i < e.length; ++i) if (r < n.locStart(e[i])) return i - 1;
		return 0;
	}
	function x6(e, t) {
		let n = t - 1;
		n = wn(e, n, { backwards: !0 }), n = Qn(e, n, { backwards: !0 }), n = wn(e, n, { backwards: !0 });
		let r = Qn(e, n, { backwards: !0 });
		return n !== r;
	}
	function Vd(e, t) {
		let n = e.node;
		return n.printed = !0, t.printer.printComment(e, t);
	}
	function O6(e, t) {
		let n = e.node, r = [Vd(e, t)], { printer: i, originalText: s, locStart: a, locEnd: o } = t;
		if (i.isBlockComment?.(n)) {
			let l = In(s, o(n)) ? In(s, a(n), { backwards: !0 }) ? mn : Ru : " ";
			r.push(l);
		} else r.push(mn);
		let u = Qn(s, wn(s, o(n)));
		return u !== !1 && In(s, u) && r.push(mn), r;
	}
	function M6(e, t, n) {
		let r = e.node, i = Vd(e, t), { printer: s, originalText: a, locStart: o } = t, u = s.isBlockComment?.(r);
		return n?.hasLineSuffix && !n?.isBlock || In(a, o(r), { backwards: !0 }) ? {
			doc: gu([
				mn,
				Zs(a, o(r)) ? mn : "",
				i
			]),
			isBlock: u,
			hasLineSuffix: !0
		} : !u || n?.hasLineSuffix ? {
			doc: [gu([" ", i]), Ci],
			isBlock: u,
			hasLineSuffix: !0
		} : {
			doc: [" ", i],
			isBlock: u,
			hasLineSuffix: !1
		};
	}
	function P6(e, t) {
		let n = e.node;
		if (!n) return {};
		let r = t[Symbol.for("printedComments")];
		if ((n.comments || []).filter((o) => !r.has(o)).length === 0) return {
			leading: "",
			trailing: ""
		};
		let i = [], s = [], a;
		return e.each(() => {
			let o = e.node;
			if (r?.has(o)) return;
			let { leading: u, trailing: l } = o;
			u ? i.push(O6(e, t)) : l && (a = M6(e, t, a), s.push(a.doc));
		}, "comments"), {
			leading: i,
			trailing: s
		};
	}
	function B6(e, t, n) {
		let { leading: r, trailing: i } = P6(e, n);
		return !r && !i ? t : Ms(t, (s) => [
			r,
			s,
			i
		]);
	}
	function V6(e) {
		let { [Symbol.for("comments")]: t, [Symbol.for("printedComments")]: n } = e;
		for (let r of t) {
			if (!r.printed && !n.has(r)) throw new Error("Comment \"" + r.value.trim() + "\" was not printed. Please report this error!");
			delete r.printed;
		}
	}
	function $d({ plugins: e = [], showDeprecated: t = !1 } = {}) {
		let n = e.flatMap((i) => i.languages ?? []), r = [];
		for (let i of U6(Object.assign({}, ...e.map(({ options: s }) => s), Jh))) !t && i.deprecated || (Array.isArray(i.choices) && (t || (i.choices = i.choices.filter((s) => !s.deprecated)), i.name === "parser" && (i.choices = [...i.choices, ...$6(i.choices, n, e)])), i.pluginDefaults = Object.fromEntries(e.filter((s) => s.defaultOptions?.[i.name] !== void 0).map((s) => [s.name, s.defaultOptions[i.name]])), r.push(i));
		return {
			languages: n,
			options: r
		};
	}
	function* $6(e, t, n) {
		let r = new Set(e.map((i) => i.value));
		for (let i of t) if (i.parsers) {
			for (let s of i.parsers) if (!r.has(s)) {
				r.add(s);
				let a = n.find((u) => u.parsers && Object.prototype.hasOwnProperty.call(u.parsers, s)), o = i.name;
				a?.name && (o += ` (plugin: ${a.name})`), yield {
					value: s,
					description: o
				};
			}
		}
	}
	function U6(e) {
		let t = [];
		for (let [n, r] of Object.entries(e)) {
			let i = {
				name: n,
				...r
			};
			Array.isArray(i.default) && (i.default = Xe(0, i.default, -1).value), t.push(i);
		}
		return t;
	}
	function j6() {
		let e = globalThis, t = e.Deno?.build?.os;
		return typeof t == "string" ? t === "windows" : e.navigator?.platform?.startsWith("Win") ?? e.process?.platform?.startsWith("win") ?? !1;
	}
	function Ud(e) {
		if (e = e instanceof URL ? e : new URL(e), e.protocol !== "file:") throw new TypeError(`URL must be a file URL: received "${e.protocol}"`);
		return e;
	}
	function q6(e) {
		return e = Ud(e), decodeURIComponent(e.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"));
	}
	function H6(e) {
		e = Ud(e);
		let t = decodeURIComponent(e.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25")).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
		return e.hostname !== "" && (t = `\\\\${e.hostname}${t}`), t;
	}
	function G6(e) {
		return Zh ? H6(e) : q6(e);
	}
	function jd(e, t) {
		if (!t) return;
		let n = Kh(t).toLowerCase();
		return e.find(({ filenames: r }) => r?.some((i) => i.toLowerCase() === n)) ?? e.find(({ extensions: r }) => r?.some((i) => n.endsWith(i)));
	}
	function W6(e, t) {
		if (t) return e.find(({ name: n }) => n.toLowerCase() === t) ?? e.find(({ aliases: n }) => n?.includes(t)) ?? e.find(({ extensions: n }) => n?.includes(`.${t}`));
	}
	function qd(e, t) {
		if (t) {
			if (ep(t)) try {
				t = G6(t);
			} catch {
				return;
			}
			if (typeof t == "string") return e.find(({ isSupported: n }) => n?.({ filepath: t }));
		}
	}
	function z6(e, t) {
		let n = Qh(0, e.plugins).flatMap((r) => r.languages ?? []);
		return (W6(n, t.language) ?? jd(n, t.physicalFile) ?? jd(n, t.file) ?? qd(n, t.physicalFile) ?? qd(n, t.file) ?? tp?.(n, t.physicalFile))?.parsers[0];
	}
	function Hd(e, t, n, r) {
		return [
			`Invalid ${nn.red(r.key(e))} value.`,
			`Expected ${nn.blue(n)},`,
			`but received ${t === Wu ? nn.gray("nothing") : nn.red(r.value(t))}.`
		].join(" ");
	}
	function Gd({ text: e, list: t }, n) {
		let r = [];
		return e && r.push(`- ${nn.blue(e)}`), t && r.push([`- ${nn.blue(t.title)}:`].concat(t.values.map((i) => Gd(i, n - zu.length).replace(/^|\n/g, `$&${zu}`))).join(`
`)), Wd(r, n);
	}
	function Wd(e, t) {
		if (e.length === 1) return e[0];
		let [n, r] = e, [i, s] = e.map((a) => a.split(`
`, 1)[0].length);
		return i > t && i > s ? r : n;
	}
	function vu(e, t, n) {
		if (e === t) return 0;
		let r = n?.maxDistance, i = e;
		e.length > t.length && (e = t, t = i);
		let s = e.length, a = t.length;
		for (; s > 0 && e.charCodeAt(~-s) === t.charCodeAt(~-a);) s--, a--;
		let o = 0;
		for (; o < s && e.charCodeAt(o) === t.charCodeAt(o);) o++;
		if (s -= o, a -= o, r !== void 0 && a - s > r) return r;
		if (s === 0) return r !== void 0 && a > r ? r : a;
		let u, l, c, d, m = 0, p = 0;
		for (; m < s;) ea[m] = e.charCodeAt(o + m), gr[m] = ++m;
		for (; p < a;) {
			for (u = t.charCodeAt(o + p), c = p++, l = p, m = 0; m < s; m++) d = u === ea[m] ? c : c + 1, c = gr[m], l = gr[m] = c > l ? d > l ? l + 1 : d : d > c ? c + 1 : d;
			if (r !== void 0) {
				let g = l;
				for (m = 0; m < s; m++) gr[m] < g && (g = gr[m]);
				if (g > r) return r;
			}
		}
		return gr.length = s, ea.length = s, r !== void 0 && l > r ? r : l;
	}
	function Y6(e, t, n) {
		if (!Array.isArray(t) || t.length === 0) return;
		let r = n?.maxDistance, i = e.length;
		for (let u of t) if (u === e) return u;
		if (r === 0) return;
		let s, a = Number.POSITIVE_INFINITY, o = /* @__PURE__ */ new Set();
		for (let u of t) {
			if (o.has(u)) continue;
			o.add(u);
			let l = Math.abs(u.length - i);
			if (l >= a || r !== void 0 && l > r) continue;
			let c = Number.isFinite(a) ? r === void 0 ? a : Math.min(a, r) : r, d = c === void 0 ? vu(e, u) : vu(e, u, { maxDistance: c });
			if (r !== void 0 && d > r) continue;
			let m = d;
			if (c !== void 0 && d === c && c === r && (m = vu(e, u)), m < a && (a = m, s = u, a === 0)) break;
		}
		if (!(r !== void 0 && a > r)) return s;
	}
	function J6(e, t) {
		let n = new e(t), r = Object.create(n);
		for (let i of ip) i in t && (r[i] = X6(t[i], n, Ln.prototype[i].length));
		return r;
	}
	function X6(e, t, n) {
		return typeof e == "function" ? (...r) => e(...r.slice(0, n - 1), t, ...r.slice(n - 1)) : () => e;
	}
	function zd({ from: e, to: t }) {
		return {
			from: [e],
			to: t
		};
	}
	function Q6(e, t) {
		let n = Object.create(null);
		for (let r of e) {
			let i = r[t];
			if (n[i]) throw new Error(`Duplicate ${t} ${JSON.stringify(i)}`);
			n[i] = r;
		}
		return n;
	}
	function Z6(e, t) {
		let n = /* @__PURE__ */ new Map();
		for (let r of e) {
			let i = r[t];
			if (n.has(i)) throw new Error(`Duplicate ${t} ${JSON.stringify(i)}`);
			n.set(i, r);
		}
		return n;
	}
	function K6() {
		let e = Object.create(null);
		return (t) => {
			let n = JSON.stringify(t);
			return e[n] ? !0 : (e[n] = !0, !1);
		};
	}
	function e8(e, t) {
		let n = [], r = [];
		for (let i of e) t(i) ? n.push(i) : r.push(i);
		return [n, r];
	}
	function t8(e) {
		return e === Math.floor(e);
	}
	function n8(e, t) {
		if (e === t) return 0;
		let n = typeof e, r = typeof t, i = [
			"undefined",
			"object",
			"boolean",
			"number",
			"string"
		];
		return n !== r ? i.indexOf(n) - i.indexOf(r) : n !== "string" ? Number(e) - Number(t) : e.localeCompare(t);
	}
	function r8(e) {
		return (...t) => {
			let n = e(...t);
			return typeof n == "string" ? new Error(n) : n;
		};
	}
	function Yd(e) {
		return e === void 0 ? {} : e;
	}
	function Jd(e) {
		if (typeof e == "string") return { text: e };
		let { text: t, list: n } = e;
		return i8((t || n) !== void 0, "Unexpected `expected` result, there should be at least one field."), n ? {
			text: t,
			list: {
				title: n.title,
				values: n.values.map(Jd)
			}
		} : { text: t };
	}
	function Xd(e, t) {
		return e === !0 ? !0 : e === !1 ? { value: t } : e;
	}
	function Qd(e, t, n = !1) {
		return e === !1 ? !1 : e === !0 ? n ? !0 : [{ value: t }] : "value" in e ? [e] : e.length === 0 ? !1 : e;
	}
	function Zd(e, t) {
		return typeof e == "string" || "key" in e ? {
			from: t,
			to: e
		} : "from" in e ? {
			from: e.from,
			to: e.to
		} : {
			from: t,
			to: e.to
		};
	}
	function Eu(e, t) {
		return e === void 0 ? [] : Array.isArray(e) ? e.map((n) => Zd(n, t)) : [Zd(e, t)];
	}
	function Kd(e, t) {
		let n = Eu(typeof e == "object" && "redirect" in e ? e.redirect : e, t);
		return n.length === 0 ? {
			remain: t,
			redirect: n
		} : typeof e == "object" && "remain" in e ? {
			remain: e.remain,
			redirect: n
		} : { redirect: n };
	}
	function i8(e, t) {
		if (!e) throw new Error(t);
	}
	function s8(e, t, { logger: n = !1, isCLI: r = !1, passThrough: i = !1, FlagSchema: s, descriptor: a } = {}) {
		if (r) {
			if (!s) throw new Error("'FlagSchema' option is required.");
			if (!a) throw new Error("'descriptor' option is required.");
		} else a = mr;
		let o = i ? Array.isArray(i) ? (d, m) => i.includes(d) ? { [d]: m } : void 0 : (d, m) => ({ [d]: m }) : (d, m, p) => {
			let { _: g, ...v } = p.schemas;
			return Yu(d, m, {
				...p,
				schemas: v
			});
		}, u = new gp(a8(t, {
			isCLI: r,
			FlagSchema: s
		}), {
			logger: n,
			unknown: o,
			descriptor: a
		}), l = n !== !1;
		l && Xu && (u._hasDeprecationWarned = Xu);
		let c = u.normalize(e);
		return l && (Xu = u._hasDeprecationWarned), c;
	}
	function a8(e, { isCLI: t, FlagSchema: n }) {
		let r = [];
		t && r.push(ap.create({ name: "_" }));
		for (let i of e) r.push(o8(i, {
			isCLI: t,
			optionInfos: e,
			FlagSchema: n
		})), i.alias && t && r.push(sp.create({
			name: i.alias,
			sourceName: i.name
		}));
		return r;
	}
	function o8(e, { isCLI: t, optionInfos: n, FlagSchema: r }) {
		let { name: i } = e, s = { name: i }, a, o = {};
		switch (e.type) {
			case "int":
				a = fp, t && (s.preprocess = Number);
				break;
			case "string":
				a = Ju;
				break;
			case "choice":
				a = lp, s.choices = e.choices.map((u) => u?.redirect ? {
					...u,
					redirect: { to: {
						key: e.name,
						value: u.redirect
					} }
				} : u);
				break;
			case "boolean":
				a = up;
				break;
			case "flag":
				a = r, s.flags = n.flatMap((u) => [
					u.alias,
					u.description && u.name,
					u.oppositeDescription && `no-${u.name}`
				].filter(Boolean));
				break;
			case "path":
				a = Ju;
				break;
			default: throw new Error(`Unexpected type ${e.type}`);
		}
		if (e.exception ? s.validate = (u, l, c) => e.exception(u) || l.validate(u, c) : s.validate = (u, l, c) => u === void 0 || l.validate(u, c), e.redirect && (o.redirect = (u) => u ? { to: typeof e.redirect == "string" ? e.redirect : {
			key: e.redirect.option,
			value: e.redirect.value
		} } : void 0), e.deprecated && (o.deprecated = !0), t && !e.array) {
			let u = s.preprocess || ((l) => l);
			s.preprocess = (l, c, d) => c.preprocess(u(Array.isArray(l) ? Xe(0, l, -1) : l), d);
		}
		return e.array ? op.create({
			...t ? { preprocess: (u) => Array.isArray(u) ? u : [u] } : {},
			...o,
			valueSchema: a.create(s)
		}) : a.create({
			...s,
			...o
		});
	}
	function u8(e) {
		return !!e?.[vp];
	}
	async function l8(e, t, n, r) {
		let { node: i } = n, { language: s } = i;
		if (!Zu.has(s)) return;
		let a = i.value.trim(), o;
		if (a) {
			let u = s === "yaml" ? s : Hu(r, { language: s });
			if (!u) return;
			o = a ? await e(a, { parser: u }) : "";
		} else o = a;
		return Id([
			i.startDelimiter,
			i.explicitLanguage ?? "",
			mn,
			o,
			o ? mn : "",
			i.endDelimiter
		]);
	}
	function c8(e, t) {
		return Ku({ node: e }) && (delete t.end, delete t.raw, delete t.value), t;
	}
	function f8({ node: e }) {
		return e.raw;
	}
	function d8(e, t) {
		let n = e ? (r) => e(r, el) : Np;
		return t ? new Proxy(n, { apply: (r, i, s) => ta(s[0]) ? Ep : Reflect.apply(r, i, s) }) : n;
	}
	function eh(e, t) {
		if (!t) throw new Error("parserName is required.");
		let n = Qu(0, e, (i) => i.parsers && Object.prototype.hasOwnProperty.call(i.parsers, t));
		if (n) return n;
		let r = `Couldn't resolve parser "${t}".`;
		throw r += " Plugins must be explicitly added to the standalone bundle.", new ju(r);
	}
	function h8(e, t) {
		if (!t) throw new Error("astFormat is required.");
		let n = Qu(0, e, (i) => i.printers && Object.prototype.hasOwnProperty.call(i.printers, t));
		if (n) return n;
		let r = `Couldn't find plugin for AST format "${t}".`;
		throw r += " Plugins must be explicitly added to the standalone bundle.", new ju(r);
	}
	function bu({ plugins: e, parser: t }) {
		return th(eh(e, t), t);
	}
	function th(e, t) {
		let n = e.parsers[t];
		return typeof n == "function" ? n() : n;
	}
	async function p8(e, t) {
		let n = e.printers[t];
		return m8(typeof n == "function" ? await n() : n);
	}
	function m8(e) {
		if (na.has(e)) return na.get(e);
		let { features: t, getVisitorKeys: n, embed: r, massageAstNode: i, print: s, ...a } = e;
		t = D8(t);
		let o = t.experimental_frontMatterSupport;
		n = tl(n, o.massageAstNode || o.embed || o.print);
		let u = i;
		i && o.massageAstNode && (u = new Proxy(i, { apply(m, p, g) {
			return bp(...g), Reflect.apply(m, p, g);
		} }));
		let l = r;
		if (r) {
			let m;
			l = new Proxy(r, {
				get(p, g, v) {
					return g === "getVisitorKeys" ? (m ?? (m = r.getVisitorKeys ? tl(r.getVisitorKeys, o.massageAstNode || o.embed) : n), m) : Reflect.get(p, g, v);
				},
				apply: (p, g, v) => o.embed && Ku(...v) ? l8 : Reflect.apply(p, g, v)
			});
		}
		let c = s;
		o.print && (c = new Proxy(s, { apply(m, p, g) {
			let [v] = g;
			return ta(v.node) ? _p(v) : Reflect.apply(m, p, g);
		} }));
		let d = {
			features: t,
			getVisitorKeys: n,
			embed: l,
			massageAstNode: u,
			print: c,
			...a
		};
		return na.set(e, d), d;
	}
	function g8(e) {
		return {
			...Tp,
			...e
		};
	}
	function D8(e) {
		return {
			experimental_avoidAstMutation: !1,
			...e,
			experimental_frontMatterSupport: g8(e?.experimental_frontMatterSupport)
		};
	}
	async function y8(e, t = {}) {
		let n = { ...e };
		if (!n.parser) if (n.filepath) {
			if (n.parser = Hu(n, { physicalFile: n.filepath }), !n.parser) throw new qu(`No parser could be inferred for file "${n.filepath}".`);
		} else throw new qu("No parser and no file path given, couldn't infer a parser.");
		let r = $d({
			plugins: e.plugins,
			showDeprecated: !0
		}).options, i = {
			...nl,
			...Object.fromEntries(r.filter((d) => d.default !== void 0).map((d) => [d.name, d.default]))
		}, s = eh(n.plugins, n.parser), a = await th(s, n.parser);
		n.astFormat = a.astFormat, n.locEnd = a.locEnd, n.locStart = a.locStart;
		let o = s.printers?.[a.astFormat] ? s : h8(n.plugins, a.astFormat), u = await p8(o, a.astFormat);
		n.printer = u, n.getVisitorKeys = u.getVisitorKeys;
		let l = o.defaultOptions ? Object.fromEntries(Object.entries(o.defaultOptions).filter(([, d]) => d !== void 0)) : {}, c = {
			...i,
			...l
		};
		for (let [d, m] of Object.entries(c)) (n[d] === null || n[d] === void 0) && (n[d] = m);
		return n.parser === "json" && (n.trailingComma = "none"), Dp(n, r, {
			passThrough: Object.keys(nl),
			...t
		});
	}
	function nh(e) {
		return {
			keyword: e.cyan,
			capitalized: e.yellow,
			jsxIdentifier: e.yellow,
			punctuator: e.yellow,
			number: e.magenta,
			string: e.green,
			regex: e.magenta,
			comment: e.gray,
			invalid: Ii(Ii(e.white, e.bgRed), e.bold),
			gutter: e.gray,
			marker: Ii(e.red, e.bold),
			message: Ii(e.red, e.bold),
			reset: e.reset
		};
	}
	function v8() {
		return new Proxy({}, { get: () => (e) => e });
	}
	function E8(e, t, n) {
		let r = Object.assign({
			column: 0,
			line: -1
		}, e.start), i = Object.assign({}, r, e.end), { linesAbove: s = 2, linesBelow: a = 3 } = n || {}, o = r.line, u = r.column, l = i.line, c = i.column, d = Math.max(o - (s + 1), 0), m = Math.min(t.length, l + a);
		o === -1 && (d = 0), l === -1 && (m = t.length);
		let p = l - o, g = {};
		if (p) for (let v = 0; v <= p; v++) {
			let F = v + o;
			u ? v === 0 ? g[F] = [u, t[F - 1].length - u + 1] : v === p ? g[F] = [0, c] : g[F] = [0, t[F - v].length] : g[F] = !0;
		}
		else u === c ? u ? g[o] = [u, 0] : g[o] = !0 : g[o] = [u, c - u];
		return {
			start: d,
			end: m,
			markerLines: g
		};
	}
	function b8(e, t, n = {}) {
		let r = v8(!1), { start: i, end: s, markerLines: a } = E8(t, e.split(il), n), o = t.start && typeof t.start.column == "number", u = String(s).length, l = e.split(il, s).slice(i, s).map((c, d) => {
			let m = i + 1 + d, p = ` ${` ${m}`.slice(-u)} |`, g = a[m], v = !a[m + 1];
			if (g) {
				let F = "";
				if (Array.isArray(g)) {
					let S = c.slice(0, Math.max(g[0] - 1, 0)).replace(/[^\t]/g, " "), C = g[1] || 1;
					F = [
						`
 `,
						r.gutter(p.replace(/\d/g, " ")),
						" ",
						S,
						r.marker("^").repeat(C)
					].join(""), v && n.message && (F += " " + r.message(n.message));
				}
				return [
					r.marker(">"),
					r.gutter(p),
					c.length > 0 ? ` ${c}` : "",
					F
				].join("");
			} else return ` ${r.gutter(p)}${c.length > 0 ? ` ${c}` : ""}`;
		}).join(`
`);
		return n.message && !o && (l = `${" ".repeat(u + 1)}${n.message}
${l}`), l;
	}
	async function _8(e, t) {
		let n = await bu(t), r = n.preprocess ? await n.preprocess(e, t) : e;
		t.originalText = r;
		let i;
		try {
			i = await n.parse(r, t, t);
		} catch (s) {
			N8(s, e);
		}
		return {
			text: r,
			ast: i
		};
	}
	function N8(e, t) {
		let { loc: n } = e;
		if (n) {
			let r = b8(t, n, { highlightCode: !0 });
			throw e.message += `
` + r, e.codeFrame = r, e;
		}
		throw e;
	}
	async function T8(e, t, n, r, i) {
		if (n.embeddedLanguageFormatting !== "auto") return;
		let { printer: s } = n, { embed: a } = s;
		if (!a) return;
		if (a.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/plugins#optional-embed");
		let { hasPrettierIgnore: o } = s, { getVisitorKeys: u } = a, l = [];
		m();
		let c = e.stack;
		for (let { print: p, node: g, pathStack: v } of l) try {
			e.stack = v;
			let F = await p(d, t, e, n);
			F && i.set(g, F);
		} catch (F) {
			if (globalThis.PRETTIER_DEBUG) throw F;
		}
		e.stack = c;
		function d(p, g) {
			return S8(p, g, n, r);
		}
		function m() {
			let { node: p } = e;
			if (p === null || typeof p != "object" || o?.(e)) return;
			for (let v of u(p)) Array.isArray(p[v]) ? e.each(m, v) : e.call(m, v);
			let g = a(e, n);
			if (g) {
				if (typeof g == "function") {
					l.push({
						print: g,
						node: p,
						pathStack: [...e.stack]
					});
					return;
				}
				i.set(p, g);
			}
		}
	}
	async function S8(e, t, n, r) {
		let i = await Dr({
			...n,
			...t,
			parentParser: n.parser,
			originalText: e,
			cursorOffset: void 0,
			rangeStart: void 0,
			rangeEnd: void 0
		}, { passThrough: !0 }), { ast: s } = await Gr(e, i);
		return wd(await r(s, i));
	}
	function F8(e, t, n, r) {
		let { originalText: i, [Symbol.for("comments")]: s, locStart: a, locEnd: o, [Symbol.for("printedComments")]: u } = t, { node: l } = e, c = a(l), d = o(l);
		for (let p of s) a(p) >= c && o(p) <= d && u.add(p);
		let { printPrettierIgnored: m } = t.printer;
		return m ? m(e, t, n, r) : i.slice(c, d);
	}
	async function Us(e, t) {
		({ast: e} = await ih(e, t));
		let n = /* @__PURE__ */ new Map(), r = new Gh(e), i = Yh(t), s = /* @__PURE__ */ new Map();
		await T8(r, o, t, Us, s);
		let a = await rh(r, t, o, void 0, s);
		if (V6(t), t.cursorOffset >= 0) {
			if (t.nodeAfterCursor && !t.nodeBeforeCursor) return [Xn, a];
			if (t.nodeBeforeCursor && !t.nodeAfterCursor) return [a, Xn];
		}
		return a;
		function o(l, c) {
			return l === void 0 || l === r ? u(c) : Array.isArray(l) ? r.call(() => u(c), ...l) : r.call(() => u(c), l);
		}
		function u(l) {
			i(r);
			let c = r.node;
			if (c == null) return "";
			let d = Xs(c) && l === void 0;
			if (d && n.has(c)) return n.get(c);
			let m = rh(r, t, o, l, s);
			return d && n.set(c, m), m;
		}
	}
	function rh(e, t, n, r, i) {
		let { node: s } = e, { printer: a } = t, o;
		switch (a.hasPrettierIgnore?.(e) ? o = Sp(e, t, n, r) : i.has(s) ? o = i.get(s) : o = a.print(e, t, n, r), s) {
			case t.cursorNode:
				o = Ms(o, (u) => [
					Xn,
					u,
					Xn
				]);
				break;
			case t.nodeBeforeCursor:
				o = Ms(o, (u) => [u, Xn]);
				break;
			case t.nodeAfterCursor:
				o = Ms(o, (u) => [Xn, u]);
				break;
		}
		return a.printComment && !a.willPrintOwnComments?.(e, t) && (o = B6(e, o, t)), o;
	}
	async function ih(e, t) {
		let n = e.comments ?? [];
		t[Symbol.for("comments")] = n, t[Symbol.for("printedComments")] = /* @__PURE__ */ new Set(), L6(e, t);
		let { printer: { preprocess: r } } = t;
		return e = r ? await r(e, t) : e, {
			ast: e,
			comments: n
		};
	}
	function A8(e, t) {
		let { cursorOffset: n, locStart: r, locEnd: i, getVisitorKeys: s } = t, a = (p) => r(p) <= n && i(p) >= n, o = e, u = [e];
		for (let p of C6(e, {
			getVisitorKeys: s,
			filter: a
		})) u.push(p), o = p;
		if (w6(o, { getVisitorKeys: s })) return { cursorNode: o };
		let l, c, d = -1, m = Number.POSITIVE_INFINITY;
		for (; u.length > 0 && (l === void 0 || c === void 0);) {
			o = u.pop();
			let p = l !== void 0, g = c !== void 0;
			for (let v of $s(o, { getVisitorKeys: s })) {
				if (!p) {
					let F = i(v);
					F <= n && F > d && (l = v, d = F);
				}
				if (!g) {
					let F = r(v);
					F >= n && F < m && (c = v, m = F);
				}
			}
		}
		return {
			nodeBeforeCursor: l,
			nodeAfterCursor: c
		};
	}
	function C8(e, t) {
		let { printer: n } = t, r = n.massageAstNode;
		if (!r) return e;
		let { getVisitorKeys: i } = n, { ignoredProperties: s } = r;
		return a(e);
		function a(o, u) {
			if (!Xs(o)) return o;
			if (Array.isArray(o)) return o.map((m) => a(m, u)).filter(Boolean);
			let l = {}, c = new Set(i(o));
			for (let m in o) !Object.prototype.hasOwnProperty.call(o, m) || s?.has(m) || (c.has(m) ? l[m] = a(o[m], o) : l[m] = o[m]);
			let d = r(o, l, u);
			if (d !== null) return d ?? l;
		}
	}
	function w8(e, t) {
		return t = new Set(t), e.find((n) => al.has(n.type) && t.has(n));
	}
	function sh(e) {
		let t = Cp(0, e, (n) => n.type !== "Program" && n.type !== "File");
		return t === -1 ? e : e.slice(0, t + 1);
	}
	function I8(e, t, { locStart: n, locEnd: r }) {
		let [i, ...s] = e, [a, ...o] = t;
		if (i === a) return [i, a];
		let u = n(i);
		for (let c of sh(o)) if (n(c) >= u) a = c;
		else break;
		let l = r(a);
		for (let c of sh(s)) {
			if (r(c) <= l) i = c;
			else break;
			if (i === a) break;
		}
		return [i, a];
	}
	function _u(e, t, n, r, i = [], s) {
		let { locStart: a, locEnd: o } = n, u = a(e), l = o(e);
		if (t > l || t < u || s === "rangeEnd" && t === u || s === "rangeStart" && t === l) return;
		let c = [e, ...i], d = Vu(e, c, {
			cache: $u,
			locStart: a,
			locEnd: o,
			getVisitorKeys: n.getVisitorKeys,
			filter: n.printer.canAttachComment,
			getChildren: n.printer.getCommentChildNodes
		});
		for (let m of d) {
			let p = _u(m, t, n, r, c, s);
			if (p) return p;
		}
		if (r(e, i[0])) return c;
	}
	function L8(e, t) {
		return t !== "DeclareExportDeclaration" && e !== "TypeParameterDeclaration" && (e === "Directive" || e === "TypeAlias" || e === "TSExportAssignment" || e.startsWith("Declare") || e.startsWith("TSDeclare") || e.endsWith("Statement") || e.endsWith("Declaration"));
	}
	function ah(e, t, n) {
		if (!t) return !1;
		switch (e.parser) {
			case "flow":
			case "hermes":
			case "babel":
			case "babel-flow":
			case "babel-ts":
			case "typescript":
			case "acorn":
			case "espree":
			case "meriyah":
			case "oxc":
			case "oxc-ts":
			case "__babel_estree": return L8(t.type, n?.type);
			case "json":
			case "json5":
			case "jsonc":
			case "json-stringify": return al.has(t.type);
			case "graphql": return Ip.has(t.kind);
			case "vue": return t.tag !== "root";
		}
		return !1;
	}
	function R8(e, t, n) {
		let { rangeStart: r, rangeEnd: i, locStart: s, locEnd: a } = t;
		An(i > r);
		let o = e.slice(r, i).search(/\S/u), u = o === -1;
		if (!u) for (r += o; i > r && !/\S/u.test(e[i - 1]); --i);
		let l = _u(n, r, t, (p, g) => ah(t, p, g), [], "rangeStart");
		if (!l) return;
		let c = u ? l : _u(n, i, t, (p) => ah(t, p), [], "rangeEnd");
		if (!c) return;
		let d, m;
		if (wp(t)) {
			let p = w8(l, c);
			d = p, m = p;
		} else [d, m] = I8(l, c, t);
		return [Math.min(s(d), s(m)), Math.max(a(d), a(m))];
	}
	async function oh(e, t, n = 0) {
		if (!e || e.trim().length === 0) return {
			formatted: "",
			cursorOffset: -1,
			comments: []
		};
		let { ast: r, text: i } = await Gr(e, t);
		t.cursorOffset >= 0 && (t = {
			...t,
			...sl(r, t)
		});
		let s = await Us(r, t, n);
		n > 0 && (s = Ld([mn, s], n, t.tabWidth));
		let a = Vs(s, t);
		if (n > 0) {
			let u = a.formatted.trim();
			a.cursorNodeStart !== void 0 && (a.cursorNodeStart -= a.formatted.indexOf(u), a.cursorNodeStart < 0 && (a.cursorNodeStart = 0, a.cursorNodeText = a.cursorNodeText.trimStart()), a.cursorNodeStart + a.cursorNodeText.length > u.length && (a.cursorNodeText = a.cursorNodeText.trimEnd())), a.formatted = u + pu(t.endOfLine);
		}
		let o = t[Symbol.for("comments")];
		if (t.cursorOffset >= 0) {
			let u, l, c, d;
			if ((t.cursorNode || t.nodeBeforeCursor || t.nodeAfterCursor) && a.cursorNodeText) if (c = a.cursorNodeStart, d = a.cursorNodeText, t.cursorNode) u = t.locStart(t.cursorNode), l = i.slice(u, t.locEnd(t.cursorNode));
			else {
				if (!t.nodeBeforeCursor && !t.nodeAfterCursor) throw new Error("Cursor location must contain at least one of cursorNode, nodeBeforeCursor, nodeAfterCursor");
				u = t.nodeBeforeCursor ? t.locEnd(t.nodeBeforeCursor) : 0;
				let F = t.nodeAfterCursor ? t.locStart(t.nodeAfterCursor) : i.length;
				l = i.slice(u, F);
			}
			else u = 0, l = i, c = 0, d = a.formatted;
			let m = t.cursorOffset - u;
			if (l === d) return {
				formatted: a.formatted,
				cursorOffset: c + m,
				comments: o
			};
			let p = l.split("");
			p.splice(m, 0, ul);
			let g = G9(p, d.split("")), v = c;
			for (let F of g) if (F.removed) {
				if (F.value.includes(ul)) break;
			} else v += F.count;
			return {
				formatted: a.formatted,
				cursorOffset: v,
				comments: o
			};
		}
		return {
			formatted: a.formatted,
			cursorOffset: -1,
			comments: o
		};
	}
	async function k8(e, t) {
		let { ast: n, text: r } = await Gr(e, t), [i, s] = R8(r, t, n) ?? [0, 0], a = r.slice(i, s), o = Math.min(i, r.lastIndexOf(`
`, i) + 1), u = r.slice(o, i).match(/^\s*/u)[0], l = Js(u, t.tabWidth), c = await oh(a, {
			...t,
			rangeStart: 0,
			rangeEnd: Number.POSITIVE_INFINITY,
			cursorOffset: t.cursorOffset > i && t.cursorOffset <= s ? t.cursorOffset - i : -1,
			endOfLine: "lf"
		}, l), d = c.formatted.trimEnd(), { cursorOffset: m } = t;
		m > s ? m += d.length - a.length : c.cursorOffset >= 0 && (m = c.cursorOffset + i);
		let p = r.slice(0, i) + d + r.slice(s);
		if (t.endOfLine !== "lf") {
			let g = pu(t.endOfLine);
			m >= 0 && g === `\r
` && (m += Fd(p.slice(0, m), `
`)), p = Fi(0, p, `
`, g);
		}
		return {
			formatted: p,
			cursorOffset: m,
			comments: c.comments
		};
	}
	function Nu(e, t, n) {
		return typeof t != "number" || Number.isNaN(t) || t < 0 || t > e.length ? n : t;
	}
	function uh(e, t) {
		let { cursorOffset: n, rangeStart: r, rangeEnd: i } = t;
		return n = Nu(e, n, -1), r = Nu(e, r, 0), i = Nu(e, i, e.length), {
			...t,
			cursorOffset: n,
			rangeStart: r,
			rangeEnd: i
		};
	}
	function lh(e, t) {
		let { cursorOffset: n, rangeStart: r, rangeEnd: i, endOfLine: s } = uh(e, t), a = e.charAt(0) === ol;
		if (a && (e = e.slice(1), n--, r--, i--), s === "auto" && (s = W9(e)), e.includes("\r")) {
			let o = (u) => Fd(e.slice(0, Math.max(u, 0)), `\r
`);
			n -= o(n), r -= o(r), i -= o(i), e = z9(e);
		}
		return {
			hasBOM: a,
			text: e,
			options: uh(e, {
				...t,
				cursorOffset: n,
				rangeStart: r,
				rangeEnd: i,
				endOfLine: s
			})
		};
	}
	async function ch(e, t) {
		let n = await bu(t);
		return !n.hasPragma || n.hasPragma(e);
	}
	async function x8(e, t) {
		return (await bu(t)).hasIgnorePragma?.(e);
	}
	async function fh(e, t) {
		let { hasBOM: n, text: r, options: i } = lh(e, await Dr(t));
		if (i.rangeStart >= i.rangeEnd && r !== "" || i.requirePragma && !await ch(r, i) || i.checkIgnorePragma && await x8(r, i)) return {
			formatted: e,
			cursorOffset: t.cursorOffset,
			comments: []
		};
		let s;
		return i.rangeStart > 0 || i.rangeEnd < r.length ? s = await k8(r, i) : (!i.requirePragma && i.insertPragma && i.printer.insertPragma && !await ch(r, i) && (r = i.printer.insertPragma(r)), s = await oh(r, i)), n && (s.formatted = ol + s.formatted, s.cursorOffset >= 0 && s.cursorOffset++), s;
	}
	async function O8(e, t, n) {
		let { text: r, options: i } = lh(e, await Dr(t)), s = await Gr(r, i);
		return n && (n.preprocessForPrint && (s.ast = await ih(s.ast, i)), n.massage && (s.ast = Fp(s.ast, i))), s;
	}
	async function M8(e, t) {
		return t = await Dr(t), Vs(await Us(e, t), t);
	}
	async function P8(e, t) {
		let { formatted: n } = await fh(g6(e), {
			...t,
			parser: "__js_expression"
		});
		return n;
	}
	async function B8(e, t) {
		t = await Dr(t);
		let { ast: n } = await Gr(e, t);
		return t.cursorOffset >= 0 && (t = {
			...t,
			...sl(n, t)
		}), Us(n, t);
	}
	async function V8(e, t) {
		return Vs(e, await Dr(t));
	}
	function $8(e, t) {
		if (t === !1) return !1;
		if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
			for (let n = t + 2; n < e.length; ++n) if (e.charAt(n) === "*" && e.charAt(n + 1) === "/") return n + 2;
		}
		return t;
	}
	function U8(e, t) {
		return t === !1 ? !1 : e.charAt(t) === "/" && e.charAt(t + 1) === "/" ? Pu(e, t) : t;
	}
	function j8(e, t) {
		let n = null, r = t;
		for (; r !== n;) n = r, r = wn(e, r), r = oa(e, r), r = ua(e, r), r = Qn(e, r);
		return r;
	}
	function q8(e, t) {
		let n = null, r = t;
		for (; r !== n;) n = r, r = Mu(e, r), r = oa(e, r), r = wn(e, r);
		return r = ua(e, r), r = Qn(e, r), r !== !1 && In(e, r);
	}
	function H8(e, t) {
		let n = e.lastIndexOf(`
`);
		return n === -1 ? 0 : Js(e.slice(n + 1).match(/^[\t ]*/u)[0], t);
	}
	function G8(e) {
		if (typeof e != "string") throw new TypeError("Expected a string");
		return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
	}
	function W8(e, t) {
		let n = e.matchAll(new RegExp(`(?:${G8(t)})+`, "gu"));
		return n.reduce || (n = [...n]), n.reduce((r, [i]) => Math.max(r, i.length), 0) / t.length;
	}
	function z8(e, t) {
		let n = la(e, t);
		return n === !1 ? "" : e.charAt(n);
	}
	function Y8(e, t) {
		let { preferred: n, alternate: r } = t === !0 || t === "'" ? Pp : Bp, { length: i } = e, s = 0, a = 0;
		for (let o = 0; o < i; o++) {
			let u = e.charCodeAt(o);
			u === n.codePoint ? s++ : u === r.codePoint && a++;
		}
		return (s > a ? r : n).character;
	}
	function J8(e, t, n) {
		for (let r = t; r < n; ++r) if (e.charAt(r) === `
`) return !0;
		return !1;
	}
	function X8(e, t, n = {}) {
		return wn(e, n.backwards ? t - 1 : t, n) !== t;
	}
	function Q8(e, t, n) {
		return la(e, n(t));
	}
	function Z8(e, t) {
		return arguments.length === 2 || typeof t == "number" ? la(e, t) : Q8(...arguments);
	}
	function K8(e, t, n) {
		return Zs(e, n(t));
	}
	function eD(e, t) {
		return arguments.length === 2 || typeof t == "number" ? Zs(e, t) : K8(...arguments);
	}
	function tD(e, t, n) {
		return ca(e, n(t));
	}
	function nD(e, t, n) {
		let r = t === "\"" ? "'" : "\"";
		return t + Fi(0, e, /\\(.)|(["'])/gsu, (i, s, a) => s === r ? s : a === t ? "\\" + a : a || (n && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/u.test(s) ? s : "\\" + s)) + t;
	}
	function rD(e, t) {
		return arguments.length === 2 || typeof t == "number" ? ca(e, t) : tD(...arguments);
	}
	function hr(e, t = 1) {
		return async (...n) => {
			let r = n[t] ?? {}, i = r.plugins ?? [];
			return n[t] = {
				...r,
				plugins: Array.isArray(i) ? i : Object.values(i)
			}, e(...n);
		};
	}
	async function Tu(e, t) {
		let { formatted: n } = await fa(e, {
			...t,
			cursorOffset: -1
		});
		return n;
	}
	async function dh(e, t) {
		return await Tu(e, t) === e;
	}
	var hh, js, ph, mh, gh, Dh, yh, qs, vh, Eh, bh, Su, Hr, _h, Fi, Nh, Th, Sh, Fh, An, Fu, Au, Ah, Hs, Cu, Ai, Ch, wh, Ih, Xe, Yn, un, Cn, ln, cn, fn, vt, Zt, Ft, dn, hn, pn, lt, Kt, Ot, wu, Jn, Lh, Rh, pr, Iu, Gs, en, Lu, kh, xh, Ci, Xn, Ru, Oh, Ws, mn, ku, xu, Mh, Ph, Bh, Vh, $h, Uh, zs, jh, qh, Ou, Et, tn, Ys, Js, Hh, Gh, Xs, Wh, wn, Mu, Pu, Bu, Qn, In, zh, Vu, $u, Qs, Uu, Zs, Yh, ju, qu, Jh, Xh, Qh, Zh, Kh, ep, tp, Hu, mr, Ks, nn, Gu, np, Wu, wi, zu, rp, gr, ea, Yu, ip, Ln, sp, ap, op, up, lp, cp, fp, Ju, dp, hp, pp, mp, gp, Xu, Dp, yp, Qu, vp, Ep, ta, Zu, Ku, bp, _p, el, Np, tl, na, Tp, nl, Dr, ra, rl, ia, Ii, il, Gr, Sp, sl, Fp, Ap, Cp, wp, al, Ip, ol, ul, sa, Lp, Rp, kp, ll, aa, oa, ua, la, ca, xp, Op, Mp, cl, fl, Pp, Bp, Vp, $p, Up, fa, dl, hl, iD = N2((() => {
		hh = Object.create, js = Object.defineProperty, ph = Object.getOwnPropertyDescriptor, mh = Object.getOwnPropertyNames, gh = Object.getPrototypeOf, Dh = Object.prototype.hasOwnProperty, yh = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), qs = (e, t) => {
			for (var n in t) js(e, n, {
				get: t[n],
				enumerable: !0
			});
		}, vh = (e, t, n, r) => {
			if (t && typeof t == "object" || typeof t == "function") for (let i of mh(t)) !Dh.call(e, i) && i !== n && js(e, i, {
				get: () => t[i],
				enumerable: !(r = ph(t, i)) || r.enumerable
			});
			return e;
		}, Eh = (e, t, n) => (n = e != null ? hh(gh(e)) : {}, vh(t || !e || !e.__esModule ? js(n, "default", {
			value: e,
			enumerable: !0
		}) : n, e)), bh = yh((e, t) => {
			var n, r, i, s, a, o, u, l, c, d, m, p, g = /\/(?![*\/])(?:\[(?:[^\]\\\n\r\u2028\u2029]+|\\.)*\]|[^\/\\\n\r\u2028\u2029]+|\\.)*(\/[$_\u200C\u200D\p{ID_Continue}]*|\\)?/uy, v, F, S, C, w, T;
			p = /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![\/*]))=?|[?~,:;[\](){}]/y, n = /(\x23?)(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]+|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/uy, F = /(['"])(?:[^'"\\\n\r]+|(?!\1)['"]|\\(?:\r\n|[^]))*(\1)?/y, m = /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/y, S = /[`}](?:[^`\\$]+|\\[^]|\$(?!\{))*(`|\$\{)?/y, T = /[\t\v\f\ufeff\p{Zs}]+/uy, l = /\r?\n|[\r\u2028\u2029]/y, c = /\/\*(?:[^*]+|\*(?!\/))*(\*\/)?/y, v = /\/\/.*/y, i = /[<>.:={}]|\/(?![\/*])/y, r = /[$_\p{ID_Start}][$_\u200C\u200D\p{ID_Continue}-]*/uy, s = /(['"])(?:[^'"]+|(?!\1)['"])*(\1)?/y, a = /[^<>{}]+/y, w = /^(?:[\/+-]|\.{3}|\?(?:InterpolationIn(?:JSX|Template)|NoLineTerminatorHere|NonExpressionParenEnd|UnaryIncDec))?$|[{}([,;<>=*%&|^!~?:]$/, C = /^(?:=>|[;\]){}]|else|\?(?:NoLineTerminatorHere|NonExpressionParenEnd))?$/, o = /^(?:await|case|default|delete|do|else|instanceof|new|return|throw|typeof|void|yield)$/, u = /^(?:return|throw|yield)$/, d = RegExp(l.source), t.exports = function* (A, { jsx: k = !1 } = {}) {
				var V, K, L, M, O, oe, I, B, G, q, ee, W, se, ue;
				for ({length: oe} = A, M = 0, O = "", ue = [{ tag: "JS" }], V = [], ee = 0, W = !1; M < oe;) {
					switch (B = ue[ue.length - 1], B.tag) {
						case "JS":
						case "JSNonExpressionParen":
						case "InterpolationInTemplate":
						case "InterpolationInJSX":
							if (A[M] === "/" && (w.test(O) || o.test(O)) && (g.lastIndex = M, I = g.exec(A))) {
								M = g.lastIndex, O = I[0], W = !0, yield {
									type: "RegularExpressionLiteral",
									value: I[0],
									closed: I[1] !== void 0 && I[1] !== "\\"
								};
								continue;
							}
							if (p.lastIndex = M, I = p.exec(A)) {
								switch (se = I[0], G = p.lastIndex, q = se, se) {
									case "(":
										O === "?NonExpressionParenKeyword" && ue.push({
											tag: "JSNonExpressionParen",
											nesting: ee
										}), ee++, W = !1;
										break;
									case ")":
										ee--, W = !0, B.tag === "JSNonExpressionParen" && ee === B.nesting && (ue.pop(), q = "?NonExpressionParenEnd", W = !1);
										break;
									case "{":
										p.lastIndex = 0, L = !C.test(O) && (w.test(O) || o.test(O)), V.push(L), W = !1;
										break;
									case "}":
										switch (B.tag) {
											case "InterpolationInTemplate":
												if (V.length === B.nesting) {
													S.lastIndex = M, I = S.exec(A), M = S.lastIndex, O = I[0], I[1] === "${" ? (O = "?InterpolationInTemplate", W = !1, yield {
														type: "TemplateMiddle",
														value: I[0]
													}) : (ue.pop(), W = !0, yield {
														type: "TemplateTail",
														value: I[0],
														closed: I[1] === "`"
													});
													continue;
												}
												break;
											case "InterpolationInJSX": if (V.length === B.nesting) {
												ue.pop(), M += 1, O = "}", yield {
													type: "JSXPunctuator",
													value: "}"
												};
												continue;
											}
										}
										W = V.pop(), q = W ? "?ExpressionBraceEnd" : "}";
										break;
									case "]":
										W = !0;
										break;
									case "++":
									case "--":
										q = W ? "?PostfixIncDec" : "?UnaryIncDec";
										break;
									case "<":
										if (k && (w.test(O) || o.test(O))) {
											ue.push({ tag: "JSXTag" }), M += 1, O = "<", yield {
												type: "JSXPunctuator",
												value: se
											};
											continue;
										}
										W = !1;
										break;
									default: W = !1;
								}
								M = G, O = q, yield {
									type: "Punctuator",
									value: se
								};
								continue;
							}
							if (n.lastIndex = M, I = n.exec(A)) {
								switch (M = n.lastIndex, q = I[0], I[0]) {
									case "for":
									case "if":
									case "while":
									case "with": O !== "." && O !== "?." && (q = "?NonExpressionParenKeyword");
								}
								O = q, W = !o.test(I[0]), yield {
									type: I[1] === "#" ? "PrivateIdentifier" : "IdentifierName",
									value: I[0]
								};
								continue;
							}
							if (F.lastIndex = M, I = F.exec(A)) {
								M = F.lastIndex, O = I[0], W = !0, yield {
									type: "StringLiteral",
									value: I[0],
									closed: I[2] !== void 0
								};
								continue;
							}
							if (m.lastIndex = M, I = m.exec(A)) {
								M = m.lastIndex, O = I[0], W = !0, yield {
									type: "NumericLiteral",
									value: I[0]
								};
								continue;
							}
							if (S.lastIndex = M, I = S.exec(A)) {
								M = S.lastIndex, O = I[0], I[1] === "${" ? (O = "?InterpolationInTemplate", ue.push({
									tag: "InterpolationInTemplate",
									nesting: V.length
								}), W = !1, yield {
									type: "TemplateHead",
									value: I[0]
								}) : (W = !0, yield {
									type: "NoSubstitutionTemplate",
									value: I[0],
									closed: I[1] === "`"
								});
								continue;
							}
							break;
						case "JSXTag":
						case "JSXTagEnd":
							if (i.lastIndex = M, I = i.exec(A)) {
								switch (M = i.lastIndex, q = I[0], I[0]) {
									case "<":
										ue.push({ tag: "JSXTag" });
										break;
									case ">":
										ue.pop(), O === "/" || B.tag === "JSXTagEnd" ? (q = "?JSX", W = !0) : ue.push({ tag: "JSXChildren" });
										break;
									case "{":
										ue.push({
											tag: "InterpolationInJSX",
											nesting: V.length
										}), q = "?InterpolationInJSX", W = !1;
										break;
									case "/": O === "<" && (ue.pop(), ue[ue.length - 1].tag === "JSXChildren" && ue.pop(), ue.push({ tag: "JSXTagEnd" }));
								}
								O = q, yield {
									type: "JSXPunctuator",
									value: I[0]
								};
								continue;
							}
							if (r.lastIndex = M, I = r.exec(A)) {
								M = r.lastIndex, O = I[0], yield {
									type: "JSXIdentifier",
									value: I[0]
								};
								continue;
							}
							if (s.lastIndex = M, I = s.exec(A)) {
								M = s.lastIndex, O = I[0], yield {
									type: "JSXString",
									value: I[0],
									closed: I[2] !== void 0
								};
								continue;
							}
							break;
						case "JSXChildren":
							if (a.lastIndex = M, I = a.exec(A)) {
								M = a.lastIndex, O = I[0], yield {
									type: "JSXText",
									value: I[0]
								};
								continue;
							}
							switch (A[M]) {
								case "<":
									ue.push({ tag: "JSXTag" }), M++, O = "<", yield {
										type: "JSXPunctuator",
										value: "<"
									};
									continue;
								case "{":
									ue.push({
										tag: "InterpolationInJSX",
										nesting: V.length
									}), M++, O = "?InterpolationInJSX", W = !1, yield {
										type: "JSXPunctuator",
										value: "{"
									};
									continue;
							}
					}
					if (T.lastIndex = M, I = T.exec(A)) {
						M = T.lastIndex, yield {
							type: "WhiteSpace",
							value: I[0]
						};
						continue;
					}
					if (l.lastIndex = M, I = l.exec(A)) {
						M = l.lastIndex, W = !1, u.test(O) && (O = "?NoLineTerminatorHere"), yield {
							type: "LineTerminatorSequence",
							value: I[0]
						};
						continue;
					}
					if (c.lastIndex = M, I = c.exec(A)) {
						M = c.lastIndex, d.test(I[0]) && (W = !1, u.test(O) && (O = "?NoLineTerminatorHere")), yield {
							type: "MultiLineComment",
							value: I[0],
							closed: I[1] !== void 0
						};
						continue;
					}
					if (v.lastIndex = M, I = v.exec(A)) {
						M = v.lastIndex, W = !1, yield {
							type: "SingleLineComment",
							value: I[0]
						};
						continue;
					}
					K = String.fromCodePoint(A.codePointAt(M)), M += K.length, O = K, W = !1, yield {
						type: B.tag.startsWith("JSX") ? "JSXInvalid" : "Invalid",
						value: K
					};
				}
			};
		}), Su = {}, qs(Su, {
			__debug: () => hl,
			check: () => dh,
			doc: () => sa,
			format: () => Tu,
			formatWithCursor: () => fa,
			getSupportInfo: () => dl,
			util: () => aa,
			version: () => ll
		}), Hr = (e, t) => (n, r, ...i) => n | 1 && r == null ? void 0 : (t.call(r) ?? r[e]).apply(r, i), _h = String.prototype.replaceAll ?? function(e, t) {
			return e.global ? this.replace(e, t) : this.split(e).join(t);
		}, Fi = Hr("replaceAll", function() {
			if (typeof this == "string") return _h;
		}), Nh = class {
			diff(e, t, n = {}) {
				let r;
				typeof n == "function" ? (r = n, n = {}) : "callback" in n && (r = n.callback);
				let i = this.castInput(e, n), s = this.castInput(t, n), a = this.removeEmpty(this.tokenize(i, n)), o = this.removeEmpty(this.tokenize(s, n));
				return this.diffWithOptionsObj(a, o, n, r);
			}
			diffWithOptionsObj(e, t, n, r) {
				var i;
				let s = (S) => {
					if (S = this.postProcess(S, n), r) {
						setTimeout(function() {
							r(S);
						}, 0);
						return;
					} else return S;
				}, a = t.length, o = e.length, u = 1, l = a + o;
				n.maxEditLength != null && (l = Math.min(l, n.maxEditLength));
				let c = (i = n.timeout) !== null && i !== void 0 ? i : Infinity, d = Date.now() + c, m = [{
					oldPos: -1,
					lastComponent: void 0
				}], p = this.extractCommon(m[0], t, e, 0, n);
				if (m[0].oldPos + 1 >= o && p + 1 >= a) return s(this.buildValues(m[0].lastComponent, t, e));
				let g = -Infinity, v = Infinity, F = () => {
					for (let S = Math.max(g, -u); S <= Math.min(v, u); S += 2) {
						let C, w = m[S - 1], T = m[S + 1];
						w && (m[S - 1] = void 0);
						let A = !1;
						if (T) {
							let V = T.oldPos - S;
							A = T && 0 <= V && V < a;
						}
						let k = w && w.oldPos + 1 < o;
						if (!A && !k) {
							m[S] = void 0;
							continue;
						}
						if (!k || A && w.oldPos < T.oldPos ? C = this.addToPath(T, !0, !1, 0, n) : C = this.addToPath(w, !1, !0, 1, n), p = this.extractCommon(C, t, e, S, n), C.oldPos + 1 >= o && p + 1 >= a) return s(this.buildValues(C.lastComponent, t, e)) || !0;
						m[S] = C, C.oldPos + 1 >= o && (v = Math.min(v, S - 1)), p + 1 >= a && (g = Math.max(g, S + 1));
					}
					u++;
				};
				if (r) (function S() {
					setTimeout(function() {
						if (u > l || Date.now() > d) return r(void 0);
						F() || S();
					}, 0);
				})();
				else for (; u <= l && Date.now() <= d;) {
					let S = F();
					if (S) return S;
				}
			}
			addToPath(e, t, n, r, i) {
				let s = e.lastComponent;
				return s && !i.oneChangePerToken && s.added === t && s.removed === n ? {
					oldPos: e.oldPos + r,
					lastComponent: {
						count: s.count + 1,
						added: t,
						removed: n,
						previousComponent: s.previousComponent
					}
				} : {
					oldPos: e.oldPos + r,
					lastComponent: {
						count: 1,
						added: t,
						removed: n,
						previousComponent: s
					}
				};
			}
			extractCommon(e, t, n, r, i) {
				let s = t.length, a = n.length, o = e.oldPos, u = o - r, l = 0;
				for (; u + 1 < s && o + 1 < a && this.equals(n[o + 1], t[u + 1], i);) u++, o++, l++, i.oneChangePerToken && (e.lastComponent = {
					count: 1,
					previousComponent: e.lastComponent,
					added: !1,
					removed: !1
				});
				return l && !i.oneChangePerToken && (e.lastComponent = {
					count: l,
					previousComponent: e.lastComponent,
					added: !1,
					removed: !1
				}), e.oldPos = o, u;
			}
			equals(e, t, n) {
				return n.comparator ? n.comparator(e, t) : e === t || !!n.ignoreCase && e.toLowerCase() === t.toLowerCase();
			}
			removeEmpty(e) {
				let t = [];
				for (let n = 0; n < e.length; n++) e[n] && t.push(e[n]);
				return t;
			}
			castInput(e, t) {
				return e;
			}
			tokenize(e, t) {
				return Array.from(e);
			}
			join(e) {
				return e.join("");
			}
			postProcess(e, t) {
				return e;
			}
			get useLongestToken() {
				return !1;
			}
			buildValues(e, t, n) {
				let r = [], i;
				for (; e;) r.push(e), i = e.previousComponent, delete e.previousComponent, e = i;
				r.reverse();
				let s = r.length, a = 0, o = 0, u = 0;
				for (; a < s; a++) {
					let l = r[a];
					if (l.removed) l.value = this.join(n.slice(u, u + l.count)), u += l.count;
					else {
						if (!l.added && this.useLongestToken) {
							let c = t.slice(o, o + l.count);
							c = c.map(function(d, m) {
								let p = n[u + m];
								return p.length > d.length ? p : d;
							}), l.value = this.join(c);
						} else l.value = this.join(t.slice(o, o + l.count));
						o += l.count, l.added || (u += l.count);
					}
				}
				return r;
			}
		}, Th = class extends Nh {
			tokenize(e) {
				return e.slice();
			}
			join(e) {
				return e;
			}
			removeEmpty(e) {
				return e;
			}
		}, Sh = new Th(), Fh = () => {}, An = Fh, Fu = "cr", Au = "crlf", Ah = "lf", Hs = "\r", Cu = `\r
`, Ai = `
`, Ch = Ai, wh = new Map([
			[Ai, /\n/gu],
			[Hs, /\r/gu],
			[Cu, /\r\n/gu]
		]), Ih = /\r\n?/gu, Xe = Hr("at", function() {
			if (Array.isArray(this) || typeof this == "string") return Y9;
		}), Yn = "string", un = "array", Cn = "cursor", ln = "indent", cn = "align", fn = "trim", vt = "group", Zt = "fill", Ft = "if-break", dn = "indent-if-break", hn = "line-suffix", pn = "line-suffix-boundary", lt = "line", Kt = "label", Ot = "break-parent", wu = new Set([
			Cn,
			ln,
			cn,
			fn,
			vt,
			Zt,
			Ft,
			dn,
			hn,
			pn,
			lt,
			Kt,
			Ot
		]), Jn = X9, Lh = (e) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(e), Rh = class extends Error {
			name = "InvalidDocError";
			constructor(e) {
				super(Q9(e)), this.doc = e;
			}
		}, pr = Rh, Iu = {}, Gs = Z9, en = An, Lu = An, kh = An, xh = An, Ci = { type: Ot }, Xn = { type: Cn }, Ru = { type: lt }, Oh = {
			type: lt,
			soft: !0
		}, Ws = {
			type: lt,
			hard: !0
		}, mn = [Ws, Ci], ku = {
			type: lt,
			hard: !0,
			literal: !0
		}, xu = [ku, Ci], Mh = { type: pn }, Ph = { type: fn }, Bh = () => /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g, Vh = "©®‼⁉™ℹ↔↕↖↗↘↙↩↪⌨⏏⏱⏲⏸⏹⏺▪▫▶◀◻◼☀☁☂☃☄☎☑☘☝☠☢☣☦☪☮☯☸☹☺♀♂♟♠♣♥♦♨♻♾⚒⚔⚕⚖⚗⚙⚛⚜⚠⚧⚰⚱⛈⛏⛑⛓⛩⛱⛷⛸⛹✂✈✉✌✍✏✒✔✖✝✡✳✴❄❇❣❤➡⤴⤵⬅⬆⬇", $h = /[^\x20-\x7F]/u, Uh = new Set(Vh), zs = v6, jh = { type: 0 }, qh = { type: 1 }, Ou = {
			value: "",
			length: 0,
			queue: [],
			get root() {
				return Ou;
			}
		}, Et = Symbol("MODE_BREAK"), tn = Symbol("MODE_FLAT"), Ys = Symbol("DOC_FILL_PRINTED_LENGTH"), Js = N6, Hh = class {
			constructor(e) {
				this.stack = [e];
			}
			get key() {
				let { stack: e, siblings: t } = this;
				return Xe(0, e, t === null ? -2 : -4) ?? null;
			}
			get index() {
				return this.siblings === null ? null : Xe(0, this.stack, -2);
			}
			get node() {
				return Xe(0, this.stack, -1);
			}
			get parent() {
				return this.getNode(1);
			}
			get grandparent() {
				return this.getNode(2);
			}
			get isInArray() {
				return this.siblings !== null;
			}
			get siblings() {
				let { stack: e } = this, t = Xe(0, e, -3);
				return Array.isArray(t) ? t : null;
			}
			get next() {
				let { siblings: e } = this;
				return e === null ? null : e[this.index + 1];
			}
			get previous() {
				let { siblings: e } = this;
				return e === null ? null : e[this.index - 1];
			}
			get isFirst() {
				return this.index === 0;
			}
			get isLast() {
				let { siblings: e, index: t } = this;
				return e !== null && t === e.length - 1;
			}
			get isRoot() {
				return this.stack.length === 1;
			}
			get root() {
				return this.stack[0];
			}
			get ancestors() {
				return [...this.#e()];
			}
			getName() {
				let { stack: e } = this, { length: t } = e;
				return t > 1 ? Xe(0, e, -2) : null;
			}
			getValue() {
				return Xe(0, this.stack, -1);
			}
			getNode(e = 0) {
				let t = this.#t(e);
				return t === -1 ? null : this.stack[t];
			}
			getParentNode(e = 0) {
				return this.getNode(e + 1);
			}
			#t(e) {
				let { stack: t } = this;
				for (let n = t.length - 1; n >= 0; n -= 2) if (!Array.isArray(t[n]) && --e < 0) return n;
				return -1;
			}
			call(e, ...t) {
				let { stack: n } = this, { length: r } = n, i = Xe(0, n, -1);
				for (let s of t) i = i?.[s], n.push(s, i);
				try {
					return e(this);
				} finally {
					n.length = r;
				}
			}
			callParent(e, t = 0) {
				let n = this.#t(t + 1), r = this.stack.splice(n + 1);
				try {
					return e(this);
				} finally {
					this.stack.push(...r);
				}
			}
			each(e, ...t) {
				let { stack: n } = this, { length: r } = n, i = Xe(0, n, -1);
				for (let s of t) i = i[s], n.push(s, i);
				try {
					for (let s = 0; s < i.length; ++s) n.push(s, i[s]), e(this, s, i), n.length -= 2;
				} finally {
					n.length = r;
				}
			}
			map(e, ...t) {
				let n = [];
				return this.each((r, i, s) => {
					n[i] = e(r, i, s);
				}, ...t), n;
			}
			match(...e) {
				let t = this.stack.length - 1, n = null, r = this.stack[t--];
				for (let i of e) {
					if (r === void 0) return !1;
					let s = null;
					if (typeof n == "number" && (s = n, n = this.stack[t--], r = this.stack[t--]), i && !i(r, n, s)) return !1;
					n = this.stack[t--], r = this.stack[t--];
				}
				return !0;
			}
			findAncestor(e) {
				for (let t of this.#e()) if (e(t)) return t;
			}
			hasAncestor(e) {
				for (let t of this.#e()) if (e(t)) return !0;
				return !1;
			}
			*#e() {
				let { stack: e } = this;
				for (let t = e.length - 3; t >= 0; t -= 2) {
					let n = e[t];
					Array.isArray(n) || (yield n);
				}
			}
		}, Gh = Hh, Xs = T6, Wh = Ni(/\s/u), wn = Ni(" 	"), Mu = Ni(",; 	"), Pu = Ni(/[^\n\r]/u), Bu = (e) => e === `
` || e === "\r" || e === "\u2028" || e === "\u2029", Qn = S6, In = F6, zh = A6, Vu = Md, $u = /* @__PURE__ */ new WeakMap(), Qs = () => !1, Uu = (e) => !/[\S\n\u2028\u2029]/u.test(e), Zs = x6, Yh = () => An, ju = class extends Error {
			name = "ConfigError";
		}, qu = class extends Error {
			name = "UndefinedParserError";
		}, Jh = {
			checkIgnorePragma: {
				category: "Special",
				type: "boolean",
				default: !1,
				description: "Check whether the file's first docblock comment contains '@noprettier' or '@noformat' to determine if it should be formatted.",
				cliCategory: "Other"
			},
			cursorOffset: {
				category: "Special",
				type: "int",
				default: -1,
				range: {
					start: -1,
					end: Infinity,
					step: 1
				},
				description: "Print (to stderr) where a cursor at the given position would move to after formatting.",
				cliCategory: "Editor"
			},
			endOfLine: {
				category: "Global",
				type: "choice",
				default: "lf",
				description: "Which end of line characters to apply.",
				choices: [
					{
						value: "lf",
						description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos"
					},
					{
						value: "crlf",
						description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows"
					},
					{
						value: "cr",
						description: "Carriage Return character only (\\r), used very rarely"
					},
					{
						value: "auto",
						description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`
					}
				]
			},
			filepath: {
				category: "Special",
				type: "path",
				description: "Specify the input filepath. This will be used to do parser inference.",
				cliName: "stdin-filepath",
				cliCategory: "Other",
				cliDescription: "Path to the file to pretend that stdin comes from."
			},
			insertPragma: {
				category: "Special",
				type: "boolean",
				default: !1,
				description: "Insert @format pragma into file's first docblock comment.",
				cliCategory: "Other"
			},
			parser: {
				category: "Global",
				type: "choice",
				default: void 0,
				description: "Which parser to use.",
				exception: (e) => typeof e == "string" || typeof e == "function",
				choices: [
					{
						value: "flow",
						description: "Flow"
					},
					{
						value: "babel",
						description: "JavaScript"
					},
					{
						value: "babel-flow",
						description: "Flow"
					},
					{
						value: "babel-ts",
						description: "TypeScript"
					},
					{
						value: "typescript",
						description: "TypeScript"
					},
					{
						value: "acorn",
						description: "JavaScript"
					},
					{
						value: "espree",
						description: "JavaScript"
					},
					{
						value: "meriyah",
						description: "JavaScript"
					},
					{
						value: "css",
						description: "CSS"
					},
					{
						value: "less",
						description: "Less"
					},
					{
						value: "scss",
						description: "SCSS"
					},
					{
						value: "json",
						description: "JSON"
					},
					{
						value: "json5",
						description: "JSON5"
					},
					{
						value: "jsonc",
						description: "JSON with Comments"
					},
					{
						value: "json-stringify",
						description: "JSON.stringify"
					},
					{
						value: "graphql",
						description: "GraphQL"
					},
					{
						value: "markdown",
						description: "Markdown"
					},
					{
						value: "mdx",
						description: "MDX"
					},
					{
						value: "vue",
						description: "Vue"
					},
					{
						value: "yaml",
						description: "YAML"
					},
					{
						value: "glimmer",
						description: "Ember / Handlebars"
					},
					{
						value: "html",
						description: "HTML"
					},
					{
						value: "angular",
						description: "Angular"
					},
					{
						value: "lwc",
						description: "Lightning Web Components"
					},
					{
						value: "mjml",
						description: "MJML"
					}
				]
			},
			plugins: {
				type: "path",
				array: !0,
				default: [{ value: [] }],
				category: "Global",
				description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
				exception: (e) => typeof e == "string" || typeof e == "object",
				cliName: "plugin",
				cliCategory: "Config"
			},
			printWidth: {
				category: "Global",
				type: "int",
				default: 80,
				description: "The line length where Prettier will try wrap.",
				range: {
					start: 0,
					end: Infinity,
					step: 1
				}
			},
			rangeEnd: {
				category: "Special",
				type: "int",
				default: Infinity,
				range: {
					start: 0,
					end: Infinity,
					step: 1
				},
				description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`,
				cliCategory: "Editor"
			},
			rangeStart: {
				category: "Special",
				type: "int",
				default: 0,
				range: {
					start: 0,
					end: Infinity,
					step: 1
				},
				description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`,
				cliCategory: "Editor"
			},
			requirePragma: {
				category: "Special",
				type: "boolean",
				default: !1,
				description: "Require either '@prettier' or '@format' to be present in the file's first docblock comment in order for it to be formatted.",
				cliCategory: "Other"
			},
			tabWidth: {
				type: "int",
				category: "Global",
				default: 2,
				description: "Number of spaces per indentation level.",
				range: {
					start: 0,
					end: Infinity,
					step: 1
				}
			},
			useTabs: {
				category: "Global",
				type: "boolean",
				default: !1,
				description: "Indent with tabs instead of spaces."
			},
			embeddedLanguageFormatting: {
				category: "Global",
				type: "choice",
				default: "auto",
				description: "Control how Prettier formats quoted code embedded in the file.",
				choices: [{
					value: "auto",
					description: "Format embedded code if Prettier can automatically identify it."
				}, {
					value: "off",
					description: "Never automatically format embedded code."
				}]
			}
		}, Xh = Array.prototype.toReversed ?? function() {
			return [...this].reverse();
		}, Qh = Hr("toReversed", function() {
			if (Array.isArray(this)) return Xh;
		}), Zh = j6(), Kh = (e) => String(e).split(/[/\\]/u).pop(), ep = (e) => String(e).startsWith("file:"), tp = void 0, Hu = z6, mr = {
			key: (e) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e),
			value(e) {
				if (e === null || typeof e != "object") return JSON.stringify(e);
				if (Array.isArray(e)) return `[${e.map((n) => mr.value(n)).join(", ")}]`;
				let t = Object.keys(e);
				return t.length === 0 ? "{}" : `{ ${t.map((n) => `${mr.key(n)}: ${mr.value(e[n])}`).join(", ")} }`;
			},
			pair: ({ key: e, value: t }) => mr.value({ [e]: t })
		}, Ks = new Proxy(String, { get: () => Ks }), nn = Ks, Gu = () => Ks, np = (e, t, { descriptor: n }) => {
			let r = [`${nn.yellow(typeof e == "string" ? n.key(e) : n.pair(e))} is deprecated`];
			return t && r.push(`we now treat it as ${nn.blue(typeof t == "string" ? n.key(t) : n.pair(t))}`), r.join("; ") + ".";
		}, Wu = Symbol.for("vnopts.VALUE_NOT_EXIST"), wi = Symbol.for("vnopts.VALUE_UNCHANGED"), zu = " ".repeat(2), rp = (e, t, n) => {
			let { text: r, list: i } = n.normalizeExpectedResult(n.schemas[e].expected(n)), s = [];
			return r && s.push(Hd(e, t, r, n.descriptor)), i && s.push([Hd(e, t, i.title, n.descriptor)].concat(i.values.map((a) => Gd(a, n.loggerPrintWidth))).join(`
`)), Wd(s, n.loggerPrintWidth);
		}, gr = [], ea = [], Yu = (e, t, { descriptor: n, logger: r, schemas: i }) => {
			let s = [`Ignored unknown option ${nn.yellow(n.pair({
				key: e,
				value: t
			}))}.`], a = Y6(e, Object.keys(i), { maxDistance: 3 });
			a && s.push(`Did you mean ${nn.blue(n.key(a))}?`), r.warn(s.join(" "));
		}, ip = [
			"default",
			"expected",
			"validate",
			"deprecated",
			"forward",
			"redirect",
			"overlap",
			"preprocess",
			"postprocess"
		], Ln = class {
			static create(e) {
				return J6(this, e);
			}
			constructor(e) {
				this.name = e.name;
			}
			default(e) {}
			expected(e) {
				return "nothing";
			}
			validate(e, t) {
				return !1;
			}
			deprecated(e, t) {
				return !1;
			}
			forward(e, t) {}
			redirect(e, t) {}
			overlap(e, t, n) {
				return e;
			}
			preprocess(e, t) {
				return e;
			}
			postprocess(e, t) {
				return wi;
			}
		}, sp = class extends Ln {
			constructor(e) {
				super(e), this._sourceName = e.sourceName;
			}
			expected(e) {
				return e.schemas[this._sourceName].expected(e);
			}
			validate(e, t) {
				return t.schemas[this._sourceName].validate(e, t);
			}
			redirect(e, t) {
				return this._sourceName;
			}
		}, ap = class extends Ln {
			expected() {
				return "anything";
			}
			validate() {
				return !0;
			}
		}, op = class extends Ln {
			constructor({ valueSchema: e, name: t = e.name, ...n }) {
				super({
					...n,
					name: t
				}), this._valueSchema = e;
			}
			expected(e) {
				let { text: t, list: n } = e.normalizeExpectedResult(this._valueSchema.expected(e));
				return {
					text: t && `an array of ${t}`,
					list: n && {
						title: "an array of the following values",
						values: [{ list: n }]
					}
				};
			}
			validate(e, t) {
				if (!Array.isArray(e)) return !1;
				let n = [];
				for (let r of e) {
					let i = t.normalizeValidateResult(this._valueSchema.validate(r, t), r);
					i !== !0 && n.push(i.value);
				}
				return n.length === 0 ? !0 : { value: n };
			}
			deprecated(e, t) {
				let n = [];
				for (let r of e) {
					let i = t.normalizeDeprecatedResult(this._valueSchema.deprecated(r, t), r);
					i !== !1 && n.push(...i.map(({ value: s }) => ({ value: [s] })));
				}
				return n;
			}
			forward(e, t) {
				let n = [];
				for (let r of e) {
					let i = t.normalizeForwardResult(this._valueSchema.forward(r, t), r);
					n.push(...i.map(zd));
				}
				return n;
			}
			redirect(e, t) {
				let n = [], r = [];
				for (let i of e) {
					let s = t.normalizeRedirectResult(this._valueSchema.redirect(i, t), i);
					"remain" in s && n.push(s.remain), r.push(...s.redirect.map(zd));
				}
				return n.length === 0 ? { redirect: r } : {
					redirect: r,
					remain: n
				};
			}
			overlap(e, t) {
				return e.concat(t);
			}
		}, up = class extends Ln {
			expected() {
				return "true or false";
			}
			validate(e) {
				return typeof e == "boolean";
			}
		}, lp = class extends Ln {
			constructor(e) {
				super(e), this._choices = Z6(e.choices.map((t) => t && typeof t == "object" ? t : { value: t }), "value");
			}
			expected({ descriptor: e }) {
				let t = Array.from(this._choices.keys()).map((i) => this._choices.get(i)).filter(({ hidden: i }) => !i).map((i) => i.value).sort(n8).map(e.value), n = t.slice(0, -2), r = t.slice(-2);
				return {
					text: n.concat(r.join(" or ")).join(", "),
					list: {
						title: "one of the following values",
						values: t
					}
				};
			}
			validate(e) {
				return this._choices.has(e);
			}
			deprecated(e) {
				let t = this._choices.get(e);
				return t && t.deprecated ? { value: e } : !1;
			}
			forward(e) {
				let t = this._choices.get(e);
				return t ? t.forward : void 0;
			}
			redirect(e) {
				let t = this._choices.get(e);
				return t ? t.redirect : void 0;
			}
		}, cp = class extends Ln {
			expected() {
				return "a number";
			}
			validate(e, t) {
				return typeof e == "number";
			}
		}, fp = class extends cp {
			expected() {
				return "an integer";
			}
			validate(e, t) {
				return t.normalizeValidateResult(super.validate(e, t), e) === !0 && t8(e);
			}
		}, Ju = class extends Ln {
			expected() {
				return "a string";
			}
			validate(e) {
				return typeof e == "string";
			}
		}, dp = mr, hp = Yu, pp = rp, mp = np, gp = class {
			constructor(e, t) {
				let { logger: n = console, loggerPrintWidth: r = 80, descriptor: i = dp, unknown: s = hp, invalid: a = pp, deprecated: o = mp, missing: u = () => !1, required: l = () => !1, preprocess: c = (m) => m, postprocess: d = () => wi } = t || {};
				this._utils = {
					descriptor: i,
					logger: n || { warn: () => {} },
					loggerPrintWidth: r,
					schemas: Q6(e, "name"),
					normalizeDefaultResult: Yd,
					normalizeExpectedResult: Jd,
					normalizeDeprecatedResult: Qd,
					normalizeForwardResult: Eu,
					normalizeRedirectResult: Kd,
					normalizeValidateResult: Xd
				}, this._unknownHandler = s, this._invalidHandler = r8(a), this._deprecatedHandler = o, this._identifyMissing = (m, p) => !(m in p) || u(m, p), this._identifyRequired = l, this._preprocess = c, this._postprocess = d, this.cleanHistory();
			}
			cleanHistory() {
				this._hasDeprecationWarned = K6();
			}
			normalize(e) {
				let t = {}, n = [this._preprocess(e, this._utils)], r = () => {
					for (; n.length !== 0;) {
						let i = n.shift(), s = this._applyNormalization(i, t);
						n.push(...s);
					}
				};
				r();
				for (let i of Object.keys(this._utils.schemas)) {
					let s = this._utils.schemas[i];
					if (!(i in t)) {
						let a = Yd(s.default(this._utils));
						"value" in a && n.push({ [i]: a.value });
					}
				}
				r();
				for (let i of Object.keys(this._utils.schemas)) {
					if (!(i in t)) continue;
					let s = this._utils.schemas[i], a = t[i], o = s.postprocess(a, this._utils);
					o !== wi && (this._applyValidation(o, i, s), t[i] = o);
				}
				return this._applyPostprocess(t), this._applyRequiredCheck(t), t;
			}
			_applyNormalization(e, t) {
				let n = [], { knownKeys: r, unknownKeys: i } = this._partitionOptionKeys(e);
				for (let s of r) {
					let a = this._utils.schemas[s], o = a.preprocess(e[s], this._utils);
					this._applyValidation(o, s, a);
					let u = ({ from: d, to: m }) => {
						n.push(typeof m == "string" ? { [m]: d } : { [m.key]: m.value });
					}, l = ({ value: d, redirectTo: m }) => {
						let p = Qd(a.deprecated(d, this._utils), o, !0);
						if (p !== !1) if (p === !0) this._hasDeprecationWarned(s) || this._utils.logger.warn(this._deprecatedHandler(s, m, this._utils));
						else for (let { value: g } of p) {
							let v = {
								key: s,
								value: g
							};
							if (!this._hasDeprecationWarned(v)) {
								let F = typeof m == "string" ? {
									key: m,
									value: g
								} : m;
								this._utils.logger.warn(this._deprecatedHandler(v, F, this._utils));
							}
						}
					};
					Eu(a.forward(o, this._utils), o).forEach(u);
					let c = Kd(a.redirect(o, this._utils), o);
					if (c.redirect.forEach(u), "remain" in c) {
						let d = c.remain;
						t[s] = s in t ? a.overlap(t[s], d, this._utils) : d, l({ value: d });
					}
					for (let { from: d, to: m } of c.redirect) l({
						value: d,
						redirectTo: m
					});
				}
				for (let s of i) {
					let a = e[s];
					this._applyUnknownHandler(s, a, t, (o, u) => {
						n.push({ [o]: u });
					});
				}
				return n;
			}
			_applyRequiredCheck(e) {
				for (let t of Object.keys(this._utils.schemas)) if (this._identifyMissing(t, e) && this._identifyRequired(t)) throw this._invalidHandler(t, Wu, this._utils);
			}
			_partitionOptionKeys(e) {
				let [t, n] = e8(Object.keys(e).filter((r) => !this._identifyMissing(r, e)), (r) => r in this._utils.schemas);
				return {
					knownKeys: t,
					unknownKeys: n
				};
			}
			_applyValidation(e, t, n) {
				let r = Xd(n.validate(e, this._utils), e);
				if (r !== !0) throw this._invalidHandler(t, r.value, this._utils);
			}
			_applyUnknownHandler(e, t, n, r) {
				let i = this._unknownHandler(e, t, this._utils);
				if (i) for (let s of Object.keys(i)) {
					if (this._identifyMissing(s, i)) continue;
					let a = i[s];
					s in this._utils.schemas ? r(s, a) : n[s] = a;
				}
			}
			_applyPostprocess(e) {
				let t = this._postprocess(e, this._utils);
				if (t !== wi) {
					if (t.delete) for (let n of t.delete) delete e[n];
					if (t.override) {
						let { knownKeys: n, unknownKeys: r } = this._partitionOptionKeys(t.override);
						for (let i of n) {
							let s = t.override[i];
							this._applyValidation(s, i, this._utils.schemas[i]), e[i] = s;
						}
						for (let i of r) {
							let s = t.override[i];
							this._applyUnknownHandler(i, s, e, (a, o) => {
								let u = this._utils.schemas[a];
								this._applyValidation(o, a, u), e[a] = o;
							});
						}
					}
				}
			}
		}, Dp = s8, yp = Array.prototype.findLast ?? function(e) {
			for (let t = this.length - 1; t >= 0; t--) {
				let n = this[t];
				if (e(n, t, this)) return n;
			}
		}, Qu = Hr("findLast", function() {
			if (Array.isArray(this)) return yp;
		}), vp = Symbol.for("PRETTIER_IS_FRONT_MATTER"), Ep = [], ta = u8, Zu = new Set(["yaml", "toml"]), Ku = ({ node: e }) => ta(e) && Zu.has(e.language), bp = c8, _p = f8, el = new Set([
			"tokens",
			"comments",
			"parent",
			"enclosingNode",
			"precedingNode",
			"followingNode"
		]), Np = (e) => Object.keys(e).filter((t) => !el.has(t)), tl = d8, na = /* @__PURE__ */ new WeakMap(), Tp = Object.fromEntries([
			"clean",
			"embed",
			"print"
		].map((e) => [e, !1])), nl = {
			astFormat: "estree",
			printer: {},
			originalText: void 0,
			locStart: null,
			locEnd: null,
			getVisitorKeys: null
		}, Dr = y8, Eh(bh(), 1), ra = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-࢏ࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚ౜ౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽ೜-ೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-Ƛ꟱-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", rl = "·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-᫝᫠-᫫ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", new RegExp("[" + ra + "]"), new RegExp("[" + ra + rl + "]"), ra = rl = null, ia = {
			keyword: [
				"break",
				"case",
				"catch",
				"continue",
				"debugger",
				"default",
				"do",
				"else",
				"finally",
				"for",
				"function",
				"if",
				"return",
				"switch",
				"throw",
				"try",
				"var",
				"const",
				"while",
				"with",
				"new",
				"this",
				"super",
				"class",
				"extends",
				"export",
				"import",
				"null",
				"true",
				"false",
				"in",
				"instanceof",
				"typeof",
				"void",
				"delete"
			],
			strict: [
				"implements",
				"interface",
				"let",
				"package",
				"private",
				"protected",
				"public",
				"static",
				"yield"
			],
			strictBind: ["eval", "arguments"]
		}, new Set(ia.keyword), new Set(ia.strict), new Set(ia.strictBind), Ii = (e, t) => (n) => e(t(n)), nh(Gu(!0)), nh(Gu(!1)), il = /\r\n|[\n\r\u2028\u2029]/, Gr = _8, Sp = F8, sl = A8, Fp = C8, Ap = Array.prototype.findLastIndex ?? function(e) {
			for (let t = this.length - 1; t >= 0; t--) {
				let n = this[t];
				if (e(n, t, this)) return t;
			}
			return -1;
		}, Cp = Hr("findLastIndex", function() {
			if (Array.isArray(this)) return Ap;
		}), wp = ({ parser: e }) => e === "json" || e === "json5" || e === "jsonc" || e === "json-stringify", al = new Set([
			"JsonRoot",
			"ObjectExpression",
			"ArrayExpression",
			"StringLiteral",
			"NumericLiteral",
			"BooleanLiteral",
			"NullLiteral",
			"UnaryExpression",
			"TemplateLiteral"
		]), Ip = new Set([
			"OperationDefinition",
			"FragmentDefinition",
			"VariableDefinition",
			"TypeExtensionDefinition",
			"ObjectTypeDefinition",
			"FieldDefinition",
			"DirectiveDefinition",
			"EnumTypeDefinition",
			"EnumValueDefinition",
			"InputValueDefinition",
			"InputObjectTypeDefinition",
			"SchemaDefinition",
			"OperationTypeDefinition",
			"InterfaceTypeDefinition",
			"UnionTypeDefinition",
			"ScalarTypeDefinition"
		]), ol = "﻿", ul = Symbol("cursor"), sa = {}, qs(sa, {
			builders: () => Lp,
			printer: () => Rp,
			utils: () => kp
		}), Lp = {
			join: kd,
			line: Ru,
			softline: Oh,
			hardline: mn,
			literalline: xu,
			group: Rd,
			conditionalGroup: d6,
			fill: f6,
			lineSuffix: gu,
			lineSuffixBoundary: Mh,
			cursor: Xn,
			breakParent: Ci,
			ifBreak: h6,
			trim: Ph,
			indent: Ps,
			indentIfBreak: p6,
			align: qr,
			addAlignmentToDoc: Ld,
			markAsRoot: Id,
			dedentToRoot: l6,
			dedent: c6,
			hardlineWithoutBreakParent: Ws,
			literallineWithoutBreakParent: ku,
			label: m6,
			concat: (e) => e
		}, Rp = { printDocToString: Vs }, kp = {
			willBreak: e6,
			traverseDoc: Gs,
			findInDoc: mu,
			mapDoc: Os,
			removeLines: r6,
			stripTrailingHardline: wd,
			replaceEndOfLine: a6,
			canBreak: u6
		}, ll = "3.8.3", aa = {}, qs(aa, {
			addDanglingComment: () => dr,
			addLeadingComment: () => Ti,
			addTrailingComment: () => Si,
			getAlignmentSize: () => Js,
			getIndentSize: () => xp,
			getMaxContinuousCount: () => Op,
			getNextNonSpaceNonCommentCharacter: () => Mp,
			getNextNonSpaceNonCommentCharacterIndex: () => Z8,
			getPreferredQuote: () => Vp,
			getStringWidth: () => zs,
			hasNewline: () => In,
			hasNewlineInRange: () => $p,
			hasSpaces: () => Up,
			isNextLineEmpty: () => rD,
			isNextLineEmptyAfterIndex: () => ca,
			isPreviousLineEmpty: () => eD,
			makeString: () => nD,
			skip: () => Ni,
			skipEverythingButNewLine: () => Pu,
			skipInlineComment: () => oa,
			skipNewline: () => Qn,
			skipSpaces: () => wn,
			skipToLineEnd: () => Mu,
			skipTrailingComment: () => ua,
			skipWhitespace: () => Wh
		}), oa = $8, ua = U8, la = j8, ca = q8, xp = H8, Op = W8, Mp = z8, cl = Object.freeze({
			character: "'",
			codePoint: 39
		}), fl = Object.freeze({
			character: "\"",
			codePoint: 34
		}), Pp = Object.freeze({
			preferred: cl,
			alternate: fl
		}), Bp = Object.freeze({
			preferred: fl,
			alternate: cl
		}), Vp = Y8, $p = J8, Up = X8, fa = hr(fh), dl = hr($d, 0), hl = {
			parse: hr(O8),
			formatAST: hr(M8),
			formatDoc: hr(P8),
			printToDoc: hr(B8),
			printDocToString: hr(V8)
		};
	})), sD = xn(((e, t) => {
		(function(n) {
			function r() {
				var s = n();
				return s.default || s;
			}
			if (typeof e == "object" && typeof t == "object") t.exports = r();
			else if (typeof define == "function" && define.amd) define(r);
			else {
				var i = typeof globalThis < "u" ? globalThis : typeof global < "u" ? global : typeof self < "u" ? self : this || {};
				i.prettierPlugins = i.prettierPlugins || {}, i.prettierPlugins.graphql = r();
			}
		})(function() {
			"use strict";
			var n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, a = (f, D) => {
				for (var y in D) n(f, y, {
					get: D[y],
					enumerable: !0
				});
			}, o = (f, D, y, N) => {
				if (D && typeof D == "object" || typeof D == "function") for (let b of i(D)) !s.call(f, b) && b !== y && n(f, b, {
					get: () => D[b],
					enumerable: !(N = r(D, b)) || N.enumerable
				});
				return f;
			}, u = (f) => o(n({}, "__esModule", { value: !0 }), f), l = {};
			a(l, {
				languages: () => yD,
				options: () => vD,
				parsers: () => Hp,
				printers: () => r3
			});
			var c = (f, D) => (y, N, ...b) => y | 1 && N == null ? void 0 : (D.call(N) ?? N[f]).apply(N, b), d = String.prototype.replaceAll ?? function(f, D) {
				return f.global ? this.replace(f, D) : this.split(f).join(D);
			}, m = c("replaceAll", function() {
				if (typeof this == "string") return d;
			}), p = () => {}, g = p, v = "indent", F = "group", S = "if-break", C = "line", w = "break-parent", T = g, A = g;
			function k(f) {
				return T(f), {
					type: v,
					contents: f
				};
			}
			var V = { type: w };
			function K(f, D = {}) {
				return T(f), A(D.expandedStates, !0), {
					type: F,
					id: D.id,
					contents: f,
					break: !!D.shouldBreak,
					expandedStates: D.expandedStates
				};
			}
			function L(f, D = "", y = {}) {
				return T(f), D !== "" && T(D), {
					type: S,
					breakContents: f,
					flatContents: D,
					groupId: y.groupId
				};
			}
			function M(f, D) {
				T(f), A(D);
				let y = [];
				for (let N = 0; N < D.length; N++) N !== 0 && y.push(f), y.push(D[N]);
				return y;
			}
			var O = { type: C }, oe = {
				type: C,
				soft: !0
			}, I = [{
				type: C,
				hard: !0
			}, V];
			function B(f) {
				return (D, y, N) => {
					let b = !!N?.backwards;
					if (y === !1) return !1;
					let { length: $ } = D, ce = y;
					for (; ce >= 0 && ce < $;) {
						let Se = D.charAt(ce);
						if (f instanceof RegExp) {
							if (!f.test(Se)) return ce;
						} else if (!f.includes(Se)) return ce;
						b ? ce-- : ce++;
					}
					return ce === -1 || ce === $ ? ce : !1;
				};
			}
			var G = B(" 	"), q = B(",; 	"), ee = B(/[^\n\r]/u), W = (f) => f === `
` || f === "\r" || f === "\u2028" || f === "\u2029";
			function se(f, D, y) {
				let N = !!y?.backwards;
				if (D === !1) return !1;
				let b = f.charAt(D);
				if (N) {
					if (f.charAt(D - 1) === "\r" && b === `
`) return D - 2;
					if (W(b)) return D - 1;
				} else {
					if (b === "\r" && f.charAt(D + 1) === `
`) return D + 2;
					if (W(b)) return D + 1;
				}
				return D;
			}
			var ue = se;
			function Ne(f, D, y = {}) {
				let N = G(f, y.backwards ? D - 1 : D, y);
				return N !== ue(f, N, y);
			}
			var _ = Ne;
			function J(f, D) {
				if (D === !1) return !1;
				if (f.charAt(D) === "/" && f.charAt(D + 1) === "*") {
					for (let y = D + 2; y < f.length; ++y) if (f.charAt(y) === "*" && f.charAt(y + 1) === "/") return y + 2;
				}
				return D;
			}
			var Y = J;
			function Z(f, D) {
				return D === !1 ? !1 : f.charAt(D) === "/" && f.charAt(D + 1) === "/" ? ee(f, D) : D;
			}
			var x = Z;
			function P(f, D) {
				let y = null, N = D;
				for (; N !== y;) y = N, N = q(f, N), N = Y(f, N), N = G(f, N);
				return N = x(f, N), N = ue(f, N), N !== !1 && _(f, N);
			}
			var re = P;
			function fe(f) {
				return Array.isArray(f) && f.length > 0;
			}
			var Qe = fe, At = class extends Error {
				name = "UnexpectedNodeError";
				constructor(f, D, y = "type") {
					super(`Unexpected ${D} node ${y}: ${JSON.stringify(f[y])}.`), this.node = f;
				}
			}, ye = At, Le = null;
			function rn(f) {
				if (Le !== null && typeof Le.property) {
					let D = Le;
					return Le = rn.prototype = null, D;
				}
				return Le = rn.prototype = f ?? Object.create(null), new rn();
			}
			var Mt = 10;
			for (let f = 0; f <= Mt; f++) rn();
			function ht(f) {
				return rn(f);
			}
			function de(f, D = "type") {
				ht(f);
				function y(N) {
					let b = N[D], $ = f[b];
					if (!Array.isArray($)) throw Object.assign(/* @__PURE__ */ new Error(`Missing visitor keys for '${b}'.`), { node: N });
					return $;
				}
				return y;
			}
			var Ze = de, Li = class {
				constructor(f, D, y) {
					this.start = f.start, this.end = D.end, this.startToken = f, this.endToken = D, this.source = y;
				}
				get [Symbol.toStringTag]() {
					return "Location";
				}
				toJSON() {
					return {
						start: this.start,
						end: this.end
					};
				}
			}, te = class {
				constructor(f, D, y, N, b, $) {
					this.kind = f, this.start = D, this.end = y, this.line = N, this.column = b, this.value = $, this.prev = null, this.next = null;
				}
				get [Symbol.toStringTag]() {
					return "Token";
				}
				toJSON() {
					return {
						kind: this.kind,
						value: this.value,
						line: this.line,
						column: this.column
					};
				}
			}, Ae = {
				Name: [],
				Document: ["definitions"],
				OperationDefinition: [
					"description",
					"name",
					"variableDefinitions",
					"directives",
					"selectionSet"
				],
				VariableDefinition: [
					"description",
					"variable",
					"type",
					"defaultValue",
					"directives"
				],
				Variable: ["name"],
				SelectionSet: ["selections"],
				Field: [
					"alias",
					"name",
					"arguments",
					"directives",
					"selectionSet"
				],
				Argument: ["name", "value"],
				FragmentSpread: ["name", "directives"],
				InlineFragment: [
					"typeCondition",
					"directives",
					"selectionSet"
				],
				FragmentDefinition: [
					"description",
					"name",
					"variableDefinitions",
					"typeCondition",
					"directives",
					"selectionSet"
				],
				IntValue: [],
				FloatValue: [],
				StringValue: [],
				BooleanValue: [],
				NullValue: [],
				EnumValue: [],
				ListValue: ["values"],
				ObjectValue: ["fields"],
				ObjectField: ["name", "value"],
				Directive: ["name", "arguments"],
				NamedType: ["name"],
				ListType: ["type"],
				NonNullType: ["type"],
				SchemaDefinition: [
					"description",
					"directives",
					"operationTypes"
				],
				OperationTypeDefinition: ["type"],
				ScalarTypeDefinition: [
					"description",
					"name",
					"directives"
				],
				ObjectTypeDefinition: [
					"description",
					"name",
					"interfaces",
					"directives",
					"fields"
				],
				FieldDefinition: [
					"description",
					"name",
					"arguments",
					"type",
					"directives"
				],
				InputValueDefinition: [
					"description",
					"name",
					"type",
					"defaultValue",
					"directives"
				],
				InterfaceTypeDefinition: [
					"description",
					"name",
					"interfaces",
					"directives",
					"fields"
				],
				UnionTypeDefinition: [
					"description",
					"name",
					"directives",
					"types"
				],
				EnumTypeDefinition: [
					"description",
					"name",
					"directives",
					"values"
				],
				EnumValueDefinition: [
					"description",
					"name",
					"directives"
				],
				InputObjectTypeDefinition: [
					"description",
					"name",
					"directives",
					"fields"
				],
				DirectiveDefinition: [
					"description",
					"name",
					"arguments",
					"locations"
				],
				SchemaExtension: ["directives", "operationTypes"],
				ScalarTypeExtension: ["name", "directives"],
				ObjectTypeExtension: [
					"name",
					"interfaces",
					"directives",
					"fields"
				],
				InterfaceTypeExtension: [
					"name",
					"interfaces",
					"directives",
					"fields"
				],
				UnionTypeExtension: [
					"name",
					"directives",
					"types"
				],
				EnumTypeExtension: [
					"name",
					"directives",
					"values"
				],
				InputObjectTypeExtension: [
					"name",
					"directives",
					"fields"
				],
				TypeCoordinate: ["name"],
				MemberCoordinate: ["name", "memberName"],
				ArgumentCoordinate: [
					"name",
					"fieldName",
					"argumentName"
				],
				DirectiveCoordinate: ["name"],
				DirectiveArgumentCoordinate: ["name", "argumentName"]
			};
			new Set(Object.keys(Ae));
			var Q;
			(function(f) {
				f.QUERY = "query", f.MUTATION = "mutation", f.SUBSCRIPTION = "subscription";
			})(Q || (Q = {}));
			var ve = { ...Ae };
			for (let f of [
				"ArgumentCoordinate",
				"DirectiveArgumentCoordinate",
				"DirectiveCoordinate",
				"MemberCoordinate",
				"TypeCoordinate"
			]) delete ve[f];
			var Ke = Ze(ve, "kind"), it = (f) => f.loc.start, st = (f) => f.loc.end, Ri = "format", Wr = /^\s*#[^\S\n]*@(?:noformat|noprettier)\s*(?:\n|$)/u, oD = /^\s*#[^\S\n]*@(?:format|prettier)\s*(?:\n|$)/u, uD = (f) => oD.test(f), lD = (f) => Wr.test(f), cD = (f) => `# @${Ri}

${f}`;
			function fD(f, D, y) {
				let { node: N } = f;
				if (!N.description) return "";
				let b = [y("description")];
				return N.kind === "InputValueDefinition" && !N.description.block ? b.push(O) : b.push(I), b;
			}
			var jt = fD;
			function dD(f, D, y) {
				let { node: N } = f;
				switch (N.kind) {
					case "Document": return [...M(I, gn(f, D, y, "definitions")), I];
					case "OperationDefinition": {
						let b = D.originalText[it(N)] !== "{", $ = !!N.name;
						return [
							jt(f, D, y),
							b ? N.operation : "",
							b && $ ? [" ", y("name")] : "",
							b && !$ && Qe(N.variableDefinitions) ? " " : "",
							jp(f, y),
							bt(f, y, N),
							!b && !$ ? "" : " ",
							y("selectionSet")
						];
					}
					case "FragmentDefinition": return [
						jt(f, D, y),
						"fragment ",
						y("name"),
						jp(f, y),
						" on ",
						y("typeCondition"),
						bt(f, y, N),
						" ",
						y("selectionSet")
					];
					case "SelectionSet": return [
						"{",
						k([I, M(I, gn(f, D, y, "selections"))]),
						I,
						"}"
					];
					case "Field": return K([
						N.alias ? [y("alias"), ": "] : "",
						y("name"),
						N.arguments.length > 0 ? K([
							"(",
							k([oe, M([L("", ", "), oe], gn(f, D, y, "arguments"))]),
							oe,
							")"
						]) : "",
						bt(f, y, N),
						N.selectionSet ? " " : "",
						y("selectionSet")
					]);
					case "Name": return N.value;
					case "StringValue":
						if (N.block) {
							let b = m(0, N.value, "\"\"\"", "\\\"\"\"").split(`
`);
							return b.length === 1 && (b[0] = b[0].trim()), b.every(($) => $ === "") && (b.length = 0), M(I, [
								"\"\"\"",
								...b,
								"\"\"\""
							]);
						}
						return [
							"\"",
							m(0, m(0, N.value, /["\\]/gu, "\\$&"), `
`, "\\n"),
							"\""
						];
					case "IntValue":
					case "FloatValue":
					case "EnumValue": return N.value;
					case "BooleanValue": return N.value ? "true" : "false";
					case "NullValue": return "null";
					case "Variable": return ["$", y("name")];
					case "ListValue": return K([
						"[",
						k([oe, M([L("", ", "), oe], f.map(y, "values"))]),
						oe,
						"]"
					]);
					case "ObjectValue": {
						let b = D.bracketSpacing && N.fields.length > 0 ? " " : "";
						return K([
							"{",
							b,
							k([oe, M([L("", ", "), oe], f.map(y, "fields"))]),
							oe,
							L("", b),
							"}"
						]);
					}
					case "ObjectField":
					case "Argument": return [
						y("name"),
						": ",
						y("value")
					];
					case "Directive": return [
						"@",
						y("name"),
						N.arguments.length > 0 ? K([
							"(",
							k([oe, M([L("", ", "), oe], gn(f, D, y, "arguments"))]),
							oe,
							")"
						]) : ""
					];
					case "NamedType": return y("name");
					case "VariableDefinition": return [
						jt(f, D, y),
						y("variable"),
						": ",
						y("type"),
						N.defaultValue ? [" = ", y("defaultValue")] : "",
						bt(f, y, N)
					];
					case "ObjectTypeExtension":
					case "ObjectTypeDefinition":
					case "InputObjectTypeExtension":
					case "InputObjectTypeDefinition":
					case "InterfaceTypeExtension":
					case "InterfaceTypeDefinition": {
						let { kind: b } = N, $ = [];
						return b.endsWith("TypeDefinition") ? $.push(jt(f, D, y)) : $.push("extend "), b.startsWith("ObjectType") ? $.push("type") : b.startsWith("InputObjectType") ? $.push("input") : $.push("interface"), $.push(" ", y("name")), !b.startsWith("InputObjectType") && N.interfaces.length > 0 && $.push(" implements ", ...mD(f, D, y)), $.push(bt(f, y, N)), N.fields.length > 0 && $.push([
							" {",
							k([I, M(I, gn(f, D, y, "fields"))]),
							I,
							"}"
						]), $;
					}
					case "FieldDefinition": return [
						jt(f, D, y),
						y("name"),
						N.arguments.length > 0 ? K([
							"(",
							k([oe, M([L("", ", "), oe], gn(f, D, y, "arguments"))]),
							oe,
							")"
						]) : "",
						": ",
						y("type"),
						bt(f, y, N)
					];
					case "DirectiveDefinition": return [
						jt(f, D, y),
						"directive ",
						"@",
						y("name"),
						N.arguments.length > 0 ? K([
							"(",
							k([oe, M([L("", ", "), oe], gn(f, D, y, "arguments"))]),
							oe,
							")"
						]) : "",
						N.repeatable ? " repeatable" : "",
						" on ",
						...M(" | ", f.map(y, "locations"))
					];
					case "EnumTypeExtension":
					case "EnumTypeDefinition": return [
						jt(f, D, y),
						N.kind === "EnumTypeExtension" ? "extend " : "",
						"enum ",
						y("name"),
						bt(f, y, N),
						N.values.length > 0 ? [
							" {",
							k([I, M(I, gn(f, D, y, "values"))]),
							I,
							"}"
						] : ""
					];
					case "EnumValueDefinition": return [
						jt(f, D, y),
						y("name"),
						bt(f, y, N)
					];
					case "InputValueDefinition": return [
						jt(f, D, y),
						y("name"),
						": ",
						y("type"),
						N.defaultValue ? [" = ", y("defaultValue")] : "",
						bt(f, y, N)
					];
					case "SchemaExtension": return [
						"extend schema",
						bt(f, y, N),
						...N.operationTypes.length > 0 ? [
							" {",
							k([I, M(I, gn(f, D, y, "operationTypes"))]),
							I,
							"}"
						] : []
					];
					case "SchemaDefinition": return [
						jt(f, D, y),
						"schema",
						bt(f, y, N),
						" {",
						N.operationTypes.length > 0 ? k([I, M(I, gn(f, D, y, "operationTypes"))]) : "",
						I,
						"}"
					];
					case "OperationTypeDefinition": return [
						N.operation,
						": ",
						y("type")
					];
					case "FragmentSpread": return [
						"...",
						y("name"),
						bt(f, y, N)
					];
					case "InlineFragment": return [
						"...",
						N.typeCondition ? [" on ", y("typeCondition")] : "",
						bt(f, y, N),
						" ",
						y("selectionSet")
					];
					case "UnionTypeExtension":
					case "UnionTypeDefinition": return K([jt(f, D, y), K([
						N.kind === "UnionTypeExtension" ? "extend " : "",
						"union ",
						y("name"),
						bt(f, y, N),
						N.types.length > 0 ? [
							" =",
							L("", " "),
							k([L([O, "| "]), M([O, "| "], f.map(y, "types"))])
						] : ""
					])]);
					case "ScalarTypeExtension":
					case "ScalarTypeDefinition": return [
						jt(f, D, y),
						N.kind === "ScalarTypeExtension" ? "extend " : "",
						"scalar ",
						y("name"),
						bt(f, y, N)
					];
					case "NonNullType": return [y("type"), "!"];
					case "ListType": return [
						"[",
						y("type"),
						"]"
					];
					default: throw new ye(N, "Graphql", "kind");
				}
			}
			function bt(f, D, y) {
				if (y.directives.length === 0) return "";
				let N = M(O, f.map(D, "directives"));
				return y.kind === "FragmentDefinition" || y.kind === "OperationDefinition" ? K([O, N]) : [" ", K(k([oe, N]))];
			}
			function gn(f, D, y, N) {
				return f.map(({ isLast: b, node: $ }) => {
					let ce = y();
					return !b && re(D.originalText, st($)) ? [ce, I] : ce;
				}, N);
			}
			function hD(f) {
				return f.kind !== "Comment";
			}
			function pD({ node: f }) {
				if (f.kind === "Comment") return "#" + f.value.trimEnd();
				throw new Error("Not a comment: " + JSON.stringify(f));
			}
			function mD(f, D, y) {
				let { node: N } = f, b = [], { interfaces: $ } = N, ce = f.map(y, "interfaces");
				for (let Se = 0; Se < $.length; Se++) {
					let Ue = $[Se];
					b.push(ce[Se]);
					let Ct = $[Se + 1];
					if (Ct) {
						let wt = D.originalText.slice(Ue.loc.end, Ct.loc.start).includes("#");
						b.push(" &", wt ? O : " ");
					}
				}
				return b;
			}
			function jp(f, D) {
				let { node: y } = f;
				return Qe(y.variableDefinitions) ? K([
					"(",
					k([oe, M([L("", ", "), oe], f.map(D, "variableDefinitions"))]),
					oe,
					")"
				]) : "";
			}
			function qp(f, D) {
				f.kind === "StringValue" && f.block && !f.value.includes(`
`) && (D.value = f.value.trim());
			}
			qp.ignoredProperties = new Set(["loc", "comments"]);
			function gD(f) {
				let { node: D } = f;
				return D?.comments?.some((y) => y.value.trim() === "prettier-ignore");
			}
			var DD = {
				print: dD,
				massageAstNode: qp,
				hasPrettierIgnore: gD,
				insertPragma: cD,
				printComment: pD,
				canAttachComment: hD,
				getVisitorKeys: Ke
			}, yD = [{
				name: "GraphQL",
				type: "data",
				aceMode: "graphqlschema",
				extensions: [
					".graphql",
					".gql",
					".graphqls"
				],
				tmScope: "source.graphql",
				parsers: ["graphql"],
				vscodeLanguageIds: ["graphql"],
				linguistLanguageId: 139
			}], vD = { bracketSpacing: {
				category: "Common",
				type: "boolean",
				default: !0,
				description: "Print spaces between brackets.",
				oppositeDescription: "Do not print spaces between brackets."
			} }, Hp = {};
			a(Hp, { graphql: () => n3 });
			function ED(f) {
				return typeof f == "object" && f !== null;
			}
			function bD(f, D) {
				if (!f) throw new Error(D ?? "Unexpected invariant triggered.");
			}
			var _D = /\r\n|[\n\r]/g;
			function pl(f, D) {
				let y = 0, N = 1;
				for (let b of f.body.matchAll(_D)) {
					if (typeof b.index == "number" || bD(!1), b.index >= D) break;
					y = b.index + b[0].length, N += 1;
				}
				return {
					line: N,
					column: D + 1 - y
				};
			}
			function ND(f) {
				return Gp(f.source, pl(f.source, f.start));
			}
			function Gp(f, D) {
				let y = f.locationOffset.column - 1, N = "".padStart(y) + f.body, b = D.line - 1, $ = f.locationOffset.line - 1, ce = D.line + $, Se = D.line === 1 ? y : 0, Ue = D.column + Se, Ct = `${f.name}:${ce}:${Ue}
`, wt = N.split(/\r\n|[\n\r]/g), Yr = wt[b];
				if (Yr.length > 120) {
					let vr = Math.floor(Ue / 80), yl = Ue % 80, _t = [];
					for (let Jr = 0; Jr < Yr.length; Jr += 80) _t.push(Yr.slice(Jr, Jr + 80));
					return Ct + Wp([
						[`${ce} |`, _t[0]],
						..._t.slice(1, vr + 1).map((Jr) => ["|", Jr]),
						["|", "^".padStart(yl)],
						["|", _t[vr + 1]]
					]);
				}
				return Ct + Wp([
					[`${ce - 1} |`, wt[b - 1]],
					[`${ce} |`, Yr],
					["|", "^".padStart(Ue)],
					[`${ce + 1} |`, wt[b + 1]]
				]);
			}
			function Wp(f) {
				let D = f.filter(([N, b]) => b !== void 0), y = Math.max(...D.map(([N]) => N.length));
				return D.map(([N, b]) => N.padStart(y) + (b ? " " + b : "")).join(`
`);
			}
			function TD(f) {
				let D = f[0];
				return D == null || "kind" in D || "length" in D ? {
					nodes: D,
					source: f[1],
					positions: f[2],
					path: f[3],
					originalError: f[4],
					extensions: f[5]
				} : D;
			}
			var SD = class D2 extends Error {
				constructor(D, ...y) {
					var N, b, $;
					let { nodes: ce, source: Se, positions: Ue, path: Ct, originalError: wt, extensions: Yr } = TD(y);
					super(D), this.name = "GraphQLError", this.path = Ct ?? void 0, this.originalError = wt ?? void 0, this.nodes = zp(Array.isArray(ce) ? ce : ce ? [ce] : void 0);
					let vr = zp((N = this.nodes) === null || N === void 0 ? void 0 : N.map((_t) => _t.loc).filter((_t) => _t != null));
					this.source = Se ?? (vr == null || (b = vr[0]) === null || b === void 0 ? void 0 : b.source), this.positions = Ue ?? vr?.map((_t) => _t.start), this.locations = Ue && Se ? Ue.map((_t) => pl(Se, _t)) : vr?.map((_t) => pl(_t.source, _t.start));
					let yl = ED(wt?.extensions) ? wt?.extensions : void 0;
					this.extensions = ($ = Yr ?? yl) !== null && $ !== void 0 ? $ : Object.create(null), Object.defineProperties(this, {
						message: {
							writable: !0,
							enumerable: !0
						},
						name: { enumerable: !1 },
						nodes: { enumerable: !1 },
						source: { enumerable: !1 },
						positions: { enumerable: !1 },
						originalError: { enumerable: !1 }
					}), wt != null && wt.stack ? Object.defineProperty(this, "stack", {
						value: wt.stack,
						writable: !0,
						configurable: !0
					}) : Error.captureStackTrace ? Error.captureStackTrace(this, D2) : Object.defineProperty(this, "stack", {
						value: Error().stack,
						writable: !0,
						configurable: !0
					});
				}
				get [Symbol.toStringTag]() {
					return "GraphQLError";
				}
				toString() {
					let D = this.message;
					if (this.nodes) for (let y of this.nodes) y.loc && (D += `

` + ND(y.loc));
					else if (this.source && this.locations) for (let y of this.locations) D += `

` + Gp(this.source, y);
					return D;
				}
				toJSON() {
					let D = { message: this.message };
					return this.locations != null && (D.locations = this.locations), this.path != null && (D.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (D.extensions = this.extensions), D;
				}
			};
			function zp(f) {
				return f === void 0 || f.length === 0 ? void 0 : f;
			}
			function at(f, D, y) {
				return new SD(`Syntax Error: ${y}`, {
					source: f,
					positions: [D]
				});
			}
			var ml;
			(function(f) {
				f.QUERY = "QUERY", f.MUTATION = "MUTATION", f.SUBSCRIPTION = "SUBSCRIPTION", f.FIELD = "FIELD", f.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", f.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", f.INLINE_FRAGMENT = "INLINE_FRAGMENT", f.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", f.SCHEMA = "SCHEMA", f.SCALAR = "SCALAR", f.OBJECT = "OBJECT", f.FIELD_DEFINITION = "FIELD_DEFINITION", f.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", f.INTERFACE = "INTERFACE", f.UNION = "UNION", f.ENUM = "ENUM", f.ENUM_VALUE = "ENUM_VALUE", f.INPUT_OBJECT = "INPUT_OBJECT", f.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
			})(ml || (ml = {}));
			var le;
			(function(f) {
				f.NAME = "Name", f.DOCUMENT = "Document", f.OPERATION_DEFINITION = "OperationDefinition", f.VARIABLE_DEFINITION = "VariableDefinition", f.SELECTION_SET = "SelectionSet", f.FIELD = "Field", f.ARGUMENT = "Argument", f.FRAGMENT_SPREAD = "FragmentSpread", f.INLINE_FRAGMENT = "InlineFragment", f.FRAGMENT_DEFINITION = "FragmentDefinition", f.VARIABLE = "Variable", f.INT = "IntValue", f.FLOAT = "FloatValue", f.STRING = "StringValue", f.BOOLEAN = "BooleanValue", f.NULL = "NullValue", f.ENUM = "EnumValue", f.LIST = "ListValue", f.OBJECT = "ObjectValue", f.OBJECT_FIELD = "ObjectField", f.DIRECTIVE = "Directive", f.NAMED_TYPE = "NamedType", f.LIST_TYPE = "ListType", f.NON_NULL_TYPE = "NonNullType", f.SCHEMA_DEFINITION = "SchemaDefinition", f.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", f.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", f.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", f.FIELD_DEFINITION = "FieldDefinition", f.INPUT_VALUE_DEFINITION = "InputValueDefinition", f.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", f.UNION_TYPE_DEFINITION = "UnionTypeDefinition", f.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", f.ENUM_VALUE_DEFINITION = "EnumValueDefinition", f.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", f.DIRECTIVE_DEFINITION = "DirectiveDefinition", f.SCHEMA_EXTENSION = "SchemaExtension", f.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", f.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", f.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", f.UNION_TYPE_EXTENSION = "UnionTypeExtension", f.ENUM_TYPE_EXTENSION = "EnumTypeExtension", f.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension", f.TYPE_COORDINATE = "TypeCoordinate", f.MEMBER_COORDINATE = "MemberCoordinate", f.ARGUMENT_COORDINATE = "ArgumentCoordinate", f.DIRECTIVE_COORDINATE = "DirectiveCoordinate", f.DIRECTIVE_ARGUMENT_COORDINATE = "DirectiveArgumentCoordinate";
			})(le || (le = {}));
			function FD(f) {
				return f === 9 || f === 32;
			}
			function ki(f) {
				return f >= 48 && f <= 57;
			}
			function Yp(f) {
				return f >= 97 && f <= 122 || f >= 65 && f <= 90;
			}
			function Jp(f) {
				return Yp(f) || f === 95;
			}
			function AD(f) {
				return Yp(f) || ki(f) || f === 95;
			}
			function CD(f) {
				var D;
				let y = Number.MAX_SAFE_INTEGER, N = null, b = -1;
				for (let ce = 0; ce < f.length; ++ce) {
					var $;
					let Se = f[ce], Ue = wD(Se);
					Ue !== Se.length && (N = ($ = N) !== null && $ !== void 0 ? $ : ce, b = ce, ce !== 0 && Ue < y && (y = Ue));
				}
				return f.map((ce, Se) => Se === 0 ? ce : ce.slice(y)).slice((D = N) !== null && D !== void 0 ? D : 0, b + 1);
			}
			function wD(f) {
				let D = 0;
				for (; D < f.length && FD(f.charCodeAt(D));) ++D;
				return D;
			}
			var U;
			(function(f) {
				f.SOF = "<SOF>", f.EOF = "<EOF>", f.BANG = "!", f.DOLLAR = "$", f.AMP = "&", f.PAREN_L = "(", f.PAREN_R = ")", f.DOT = ".", f.SPREAD = "...", f.COLON = ":", f.EQUALS = "=", f.AT = "@", f.BRACKET_L = "[", f.BRACKET_R = "]", f.BRACE_L = "{", f.PIPE = "|", f.BRACE_R = "}", f.NAME = "Name", f.INT = "Int", f.FLOAT = "Float", f.STRING = "String", f.BLOCK_STRING = "BlockString", f.COMMENT = "Comment";
			})(U || (U = {}));
			var ID = class {
				constructor(f) {
					let D = new te(U.SOF, 0, 0, 0, 0);
					this.source = f, this.lastToken = D, this.token = D, this.line = 1, this.lineStart = 0;
				}
				get [Symbol.toStringTag]() {
					return "Lexer";
				}
				advance() {
					return this.lastToken = this.token, this.token = this.lookahead();
				}
				lookahead() {
					let f = this.token;
					if (f.kind !== U.EOF) do
						if (f.next) f = f.next;
						else {
							let D = RD(this, f.end);
							f.next = D, D.prev = f, f = D;
						}
					while (f.kind === U.COMMENT);
					return f;
				}
			};
			function LD(f) {
				return f === U.BANG || f === U.DOLLAR || f === U.AMP || f === U.PAREN_L || f === U.PAREN_R || f === U.DOT || f === U.SPREAD || f === U.COLON || f === U.EQUALS || f === U.AT || f === U.BRACKET_L || f === U.BRACKET_R || f === U.BRACE_L || f === U.PIPE || f === U.BRACE_R;
			}
			function zr(f) {
				return f >= 0 && f <= 55295 || f >= 57344 && f <= 1114111;
			}
			function da(f, D) {
				return Xp(f.charCodeAt(D)) && Qp(f.charCodeAt(D + 1));
			}
			function Xp(f) {
				return f >= 55296 && f <= 56319;
			}
			function Qp(f) {
				return f >= 56320 && f <= 57343;
			}
			function yr(f, D) {
				let y = f.source.body.codePointAt(D);
				if (y === void 0) return U.EOF;
				if (y >= 32 && y <= 126) {
					let N = String.fromCodePoint(y);
					return N === "\"" ? `'"'` : `"${N}"`;
				}
				return "U+" + y.toString(16).toUpperCase().padStart(4, "0");
			}
			function et(f, D, y, N, b) {
				let $ = f.line;
				return new te(D, y, N, $, 1 + y - f.lineStart, b);
			}
			function RD(f, D) {
				let y = f.source.body, N = y.length, b = D;
				for (; b < N;) {
					let $ = y.charCodeAt(b);
					switch ($) {
						case 65279:
						case 9:
						case 32:
						case 44:
							++b;
							continue;
						case 10:
							++b, ++f.line, f.lineStart = b;
							continue;
						case 13:
							y.charCodeAt(b + 1) === 10 ? b += 2 : ++b, ++f.line, f.lineStart = b;
							continue;
						case 35: return kD(f, b);
						case 33: return et(f, U.BANG, b, b + 1);
						case 36: return et(f, U.DOLLAR, b, b + 1);
						case 38: return et(f, U.AMP, b, b + 1);
						case 40: return et(f, U.PAREN_L, b, b + 1);
						case 41: return et(f, U.PAREN_R, b, b + 1);
						case 46:
							if (y.charCodeAt(b + 1) === 46 && y.charCodeAt(b + 2) === 46) return et(f, U.SPREAD, b, b + 3);
							break;
						case 58: return et(f, U.COLON, b, b + 1);
						case 61: return et(f, U.EQUALS, b, b + 1);
						case 64: return et(f, U.AT, b, b + 1);
						case 91: return et(f, U.BRACKET_L, b, b + 1);
						case 93: return et(f, U.BRACKET_R, b, b + 1);
						case 123: return et(f, U.BRACE_L, b, b + 1);
						case 124: return et(f, U.PIPE, b, b + 1);
						case 125: return et(f, U.BRACE_R, b, b + 1);
						case 34: return y.charCodeAt(b + 1) === 34 && y.charCodeAt(b + 2) === 34 ? VD(f, b) : OD(f, b);
					}
					if (ki($) || $ === 45) return xD(f, b, $);
					if (Jp($)) return $D(f, b);
					throw at(f.source, b, $ === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : zr($) || da(y, b) ? `Unexpected character: ${yr(f, b)}.` : `Invalid character: ${yr(f, b)}.`);
				}
				return et(f, U.EOF, N, N);
			}
			function kD(f, D) {
				let y = f.source.body, N = y.length, b = D + 1;
				for (; b < N;) {
					let $ = y.charCodeAt(b);
					if ($ === 10 || $ === 13) break;
					if (zr($)) ++b;
					else if (da(y, b)) b += 2;
					else break;
				}
				return et(f, U.COMMENT, D, b, y.slice(D + 1, b));
			}
			function xD(f, D, y) {
				let N = f.source.body, b = D, $ = y, ce = !1;
				if ($ === 45 && ($ = N.charCodeAt(++b)), $ === 48) {
					if ($ = N.charCodeAt(++b), ki($)) throw at(f.source, b, `Invalid number, unexpected digit after 0: ${yr(f, b)}.`);
				} else b = gl(f, b, $), $ = N.charCodeAt(b);
				if ($ === 46 && (ce = !0, $ = N.charCodeAt(++b), b = gl(f, b, $), $ = N.charCodeAt(b)), ($ === 69 || $ === 101) && (ce = !0, $ = N.charCodeAt(++b), ($ === 43 || $ === 45) && ($ = N.charCodeAt(++b)), b = gl(f, b, $), $ = N.charCodeAt(b)), $ === 46 || Jp($)) throw at(f.source, b, `Invalid number, expected digit but got: ${yr(f, b)}.`);
				return et(f, ce ? U.FLOAT : U.INT, D, b, N.slice(D, b));
			}
			function gl(f, D, y) {
				if (!ki(y)) throw at(f.source, D, `Invalid number, expected digit but got: ${yr(f, D)}.`);
				let N = f.source.body, b = D + 1;
				for (; ki(N.charCodeAt(b));) ++b;
				return b;
			}
			function OD(f, D) {
				let y = f.source.body, N = y.length, b = D + 1, $ = b, ce = "";
				for (; b < N;) {
					let Se = y.charCodeAt(b);
					if (Se === 34) return ce += y.slice($, b), et(f, U.STRING, D, b + 1, ce);
					if (Se === 92) {
						ce += y.slice($, b);
						let Ue = y.charCodeAt(b + 1) === 117 ? y.charCodeAt(b + 2) === 123 ? MD(f, b) : PD(f, b) : BD(f, b);
						ce += Ue.value, b += Ue.size, $ = b;
						continue;
					}
					if (Se === 10 || Se === 13) break;
					if (zr(Se)) ++b;
					else if (da(y, b)) b += 2;
					else throw at(f.source, b, `Invalid character within String: ${yr(f, b)}.`);
				}
				throw at(f.source, b, "Unterminated string.");
			}
			function MD(f, D) {
				let y = f.source.body, N = 0, b = 3;
				for (; b < 12;) {
					let $ = y.charCodeAt(D + b++);
					if ($ === 125) {
						if (b < 5 || !zr(N)) break;
						return {
							value: String.fromCodePoint(N),
							size: b
						};
					}
					if (N = N << 4 | xi($), N < 0) break;
				}
				throw at(f.source, D, `Invalid Unicode escape sequence: "${y.slice(D, D + b)}".`);
			}
			function PD(f, D) {
				let y = f.source.body, N = Zp(y, D + 2);
				if (zr(N)) return {
					value: String.fromCodePoint(N),
					size: 6
				};
				if (Xp(N) && y.charCodeAt(D + 6) === 92 && y.charCodeAt(D + 7) === 117) {
					let b = Zp(y, D + 8);
					if (Qp(b)) return {
						value: String.fromCodePoint(N, b),
						size: 12
					};
				}
				throw at(f.source, D, `Invalid Unicode escape sequence: "${y.slice(D, D + 6)}".`);
			}
			function Zp(f, D) {
				return xi(f.charCodeAt(D)) << 12 | xi(f.charCodeAt(D + 1)) << 8 | xi(f.charCodeAt(D + 2)) << 4 | xi(f.charCodeAt(D + 3));
			}
			function xi(f) {
				return f >= 48 && f <= 57 ? f - 48 : f >= 65 && f <= 70 ? f - 55 : f >= 97 && f <= 102 ? f - 87 : -1;
			}
			function BD(f, D) {
				let y = f.source.body;
				switch (y.charCodeAt(D + 1)) {
					case 34: return {
						value: "\"",
						size: 2
					};
					case 92: return {
						value: "\\",
						size: 2
					};
					case 47: return {
						value: "/",
						size: 2
					};
					case 98: return {
						value: "\b",
						size: 2
					};
					case 102: return {
						value: "\f",
						size: 2
					};
					case 110: return {
						value: `
`,
						size: 2
					};
					case 114: return {
						value: "\r",
						size: 2
					};
					case 116: return {
						value: "	",
						size: 2
					};
				}
				throw at(f.source, D, `Invalid character escape sequence: "${y.slice(D, D + 2)}".`);
			}
			function VD(f, D) {
				let y = f.source.body, N = y.length, b = f.lineStart, $ = D + 3, ce = $, Se = "", Ue = [];
				for (; $ < N;) {
					let Ct = y.charCodeAt($);
					if (Ct === 34 && y.charCodeAt($ + 1) === 34 && y.charCodeAt($ + 2) === 34) {
						Se += y.slice(ce, $), Ue.push(Se);
						let wt = et(f, U.BLOCK_STRING, D, $ + 3, CD(Ue).join(`
`));
						return f.line += Ue.length - 1, f.lineStart = b, wt;
					}
					if (Ct === 92 && y.charCodeAt($ + 1) === 34 && y.charCodeAt($ + 2) === 34 && y.charCodeAt($ + 3) === 34) {
						Se += y.slice(ce, $), ce = $ + 1, $ += 4;
						continue;
					}
					if (Ct === 10 || Ct === 13) {
						Se += y.slice(ce, $), Ue.push(Se), Ct === 13 && y.charCodeAt($ + 1) === 10 ? $ += 2 : ++$, Se = "", ce = $, b = $;
						continue;
					}
					if (zr(Ct)) ++$;
					else if (da(y, $)) $ += 2;
					else throw at(f.source, $, `Invalid character within String: ${yr(f, $)}.`);
				}
				throw at(f.source, $, "Unterminated string.");
			}
			function $D(f, D) {
				let y = f.source.body, N = y.length, b = D + 1;
				for (; b < N && AD(y.charCodeAt(b));) ++b;
				return et(f, U.NAME, D, b, y.slice(D, b));
			}
			function Dl(f, D) {
				if (!f) throw new Error(D);
			}
			function Kp(f) {
				return ha(f, []);
			}
			function ha(f, D) {
				switch (typeof f) {
					case "string": return JSON.stringify(f);
					case "function": return f.name ? `[function ${f.name}]` : "[function]";
					case "object": return UD(f, D);
					default: return String(f);
				}
			}
			function UD(f, D) {
				if (f === null) return "null";
				if (D.includes(f)) return "[Circular]";
				let y = [...D, f];
				if (jD(f)) {
					let N = f.toJSON();
					if (N !== f) return typeof N == "string" ? N : ha(N, y);
				} else if (Array.isArray(f)) return HD(f, y);
				return qD(f, y);
			}
			function jD(f) {
				return typeof f.toJSON == "function";
			}
			function qD(f, D) {
				let y = Object.entries(f);
				return y.length === 0 ? "{}" : D.length > 2 ? "[" + GD(f) + "]" : "{ " + y.map(([N, b]) => N + ": " + ha(b, D)).join(", ") + " }";
			}
			function HD(f, D) {
				if (f.length === 0) return "[]";
				if (D.length > 2) return "[Array]";
				let y = Math.min(10, f.length), N = f.length - y, b = [];
				for (let $ = 0; $ < y; ++$) b.push(ha(f[$], D));
				return N === 1 ? b.push("... 1 more item") : N > 1 && b.push(`... ${N} more items`), "[" + b.join(", ") + "]";
			}
			function GD(f) {
				let D = Object.prototype.toString.call(f).replace(/^\[object /, "").replace(/]$/, "");
				if (D === "Object" && typeof f.constructor == "function") {
					let y = f.constructor.name;
					if (typeof y == "string" && y !== "") return y;
				}
				return D;
			}
			var WD = globalThis.process ? function(f, D) {
				return f instanceof D;
			} : function(f, D) {
				if (f instanceof D) return !0;
				if (typeof f == "object" && f !== null) {
					var y;
					let N = D.prototype[Symbol.toStringTag];
					if (N === (Symbol.toStringTag in f ? f[Symbol.toStringTag] : (y = f.constructor) === null || y === void 0 ? void 0 : y.name)) {
						let b = Kp(f);
						throw new Error(`Cannot use ${N} "${b}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
					}
				}
				return !1;
			}, e2 = class {
				constructor(f, D = "GraphQL request", y = {
					line: 1,
					column: 1
				}) {
					typeof f == "string" || Dl(!1, `Body must be a string. Received: ${Kp(f)}.`), this.body = f, this.name = D, this.locationOffset = y, this.locationOffset.line > 0 || Dl(!1, "line in locationOffset is 1-indexed and must be positive."), this.locationOffset.column > 0 || Dl(!1, "column in locationOffset is 1-indexed and must be positive.");
				}
				get [Symbol.toStringTag]() {
					return "Source";
				}
			};
			function zD(f) {
				return WD(f, e2);
			}
			function YD(f, D) {
				let y = new JD(f, D), N = y.parseDocument();
				return Object.defineProperty(N, "tokenCount", {
					enumerable: !1,
					value: y.tokenCount
				}), N;
			}
			var JD = class {
				constructor(f, D = {}) {
					let { lexer: y, ...N } = D;
					if (y) this._lexer = y;
					else {
						let b = zD(f) ? f : new e2(f);
						this._lexer = new ID(b);
					}
					this._options = N, this._tokenCounter = 0;
				}
				get tokenCount() {
					return this._tokenCounter;
				}
				parseName() {
					let f = this.expectToken(U.NAME);
					return this.node(f, {
						kind: le.NAME,
						value: f.value
					});
				}
				parseDocument() {
					return this.node(this._lexer.token, {
						kind: le.DOCUMENT,
						definitions: this.many(U.SOF, this.parseDefinition, U.EOF)
					});
				}
				parseDefinition() {
					if (this.peek(U.BRACE_L)) return this.parseOperationDefinition();
					let f = this.peekDescription(), D = f ? this._lexer.lookahead() : this._lexer.token;
					if (f && D.kind === U.BRACE_L) throw at(this._lexer.source, this._lexer.token.start, "Unexpected description, descriptions are not supported on shorthand queries.");
					if (D.kind === U.NAME) {
						switch (D.value) {
							case "schema": return this.parseSchemaDefinition();
							case "scalar": return this.parseScalarTypeDefinition();
							case "type": return this.parseObjectTypeDefinition();
							case "interface": return this.parseInterfaceTypeDefinition();
							case "union": return this.parseUnionTypeDefinition();
							case "enum": return this.parseEnumTypeDefinition();
							case "input": return this.parseInputObjectTypeDefinition();
							case "directive": return this.parseDirectiveDefinition();
						}
						switch (D.value) {
							case "query":
							case "mutation":
							case "subscription": return this.parseOperationDefinition();
							case "fragment": return this.parseFragmentDefinition();
						}
						if (f) throw at(this._lexer.source, this._lexer.token.start, "Unexpected description, only GraphQL definitions support descriptions.");
						if (D.value === "extend") return this.parseTypeSystemExtension();
					}
					throw this.unexpected(D);
				}
				parseOperationDefinition() {
					let f = this._lexer.token;
					if (this.peek(U.BRACE_L)) return this.node(f, {
						kind: le.OPERATION_DEFINITION,
						operation: Q.QUERY,
						description: void 0,
						name: void 0,
						variableDefinitions: [],
						directives: [],
						selectionSet: this.parseSelectionSet()
					});
					let D = this.parseDescription(), y = this.parseOperationType(), N;
					return this.peek(U.NAME) && (N = this.parseName()), this.node(f, {
						kind: le.OPERATION_DEFINITION,
						operation: y,
						description: D,
						name: N,
						variableDefinitions: this.parseVariableDefinitions(),
						directives: this.parseDirectives(!1),
						selectionSet: this.parseSelectionSet()
					});
				}
				parseOperationType() {
					let f = this.expectToken(U.NAME);
					switch (f.value) {
						case "query": return Q.QUERY;
						case "mutation": return Q.MUTATION;
						case "subscription": return Q.SUBSCRIPTION;
					}
					throw this.unexpected(f);
				}
				parseVariableDefinitions() {
					return this.optionalMany(U.PAREN_L, this.parseVariableDefinition, U.PAREN_R);
				}
				parseVariableDefinition() {
					return this.node(this._lexer.token, {
						kind: le.VARIABLE_DEFINITION,
						description: this.parseDescription(),
						variable: this.parseVariable(),
						type: (this.expectToken(U.COLON), this.parseTypeReference()),
						defaultValue: this.expectOptionalToken(U.EQUALS) ? this.parseConstValueLiteral() : void 0,
						directives: this.parseConstDirectives()
					});
				}
				parseVariable() {
					let f = this._lexer.token;
					return this.expectToken(U.DOLLAR), this.node(f, {
						kind: le.VARIABLE,
						name: this.parseName()
					});
				}
				parseSelectionSet() {
					return this.node(this._lexer.token, {
						kind: le.SELECTION_SET,
						selections: this.many(U.BRACE_L, this.parseSelection, U.BRACE_R)
					});
				}
				parseSelection() {
					return this.peek(U.SPREAD) ? this.parseFragment() : this.parseField();
				}
				parseField() {
					let f = this._lexer.token, D = this.parseName(), y, N;
					return this.expectOptionalToken(U.COLON) ? (y = D, N = this.parseName()) : N = D, this.node(f, {
						kind: le.FIELD,
						alias: y,
						name: N,
						arguments: this.parseArguments(!1),
						directives: this.parseDirectives(!1),
						selectionSet: this.peek(U.BRACE_L) ? this.parseSelectionSet() : void 0
					});
				}
				parseArguments(f) {
					let D = f ? this.parseConstArgument : this.parseArgument;
					return this.optionalMany(U.PAREN_L, D, U.PAREN_R);
				}
				parseArgument(f = !1) {
					let D = this._lexer.token, y = this.parseName();
					return this.expectToken(U.COLON), this.node(D, {
						kind: le.ARGUMENT,
						name: y,
						value: this.parseValueLiteral(f)
					});
				}
				parseConstArgument() {
					return this.parseArgument(!0);
				}
				parseFragment() {
					let f = this._lexer.token;
					this.expectToken(U.SPREAD);
					let D = this.expectOptionalKeyword("on");
					return !D && this.peek(U.NAME) ? this.node(f, {
						kind: le.FRAGMENT_SPREAD,
						name: this.parseFragmentName(),
						directives: this.parseDirectives(!1)
					}) : this.node(f, {
						kind: le.INLINE_FRAGMENT,
						typeCondition: D ? this.parseNamedType() : void 0,
						directives: this.parseDirectives(!1),
						selectionSet: this.parseSelectionSet()
					});
				}
				parseFragmentDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(f, {
						kind: le.FRAGMENT_DEFINITION,
						description: D,
						name: this.parseFragmentName(),
						variableDefinitions: this.parseVariableDefinitions(),
						typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
						directives: this.parseDirectives(!1),
						selectionSet: this.parseSelectionSet()
					}) : this.node(f, {
						kind: le.FRAGMENT_DEFINITION,
						description: D,
						name: this.parseFragmentName(),
						typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
						directives: this.parseDirectives(!1),
						selectionSet: this.parseSelectionSet()
					});
				}
				parseFragmentName() {
					if (this._lexer.token.value === "on") throw this.unexpected();
					return this.parseName();
				}
				parseValueLiteral(f) {
					let D = this._lexer.token;
					switch (D.kind) {
						case U.BRACKET_L: return this.parseList(f);
						case U.BRACE_L: return this.parseObject(f);
						case U.INT: return this.advanceLexer(), this.node(D, {
							kind: le.INT,
							value: D.value
						});
						case U.FLOAT: return this.advanceLexer(), this.node(D, {
							kind: le.FLOAT,
							value: D.value
						});
						case U.STRING:
						case U.BLOCK_STRING: return this.parseStringLiteral();
						case U.NAME: switch (this.advanceLexer(), D.value) {
							case "true": return this.node(D, {
								kind: le.BOOLEAN,
								value: !0
							});
							case "false": return this.node(D, {
								kind: le.BOOLEAN,
								value: !1
							});
							case "null": return this.node(D, { kind: le.NULL });
							default: return this.node(D, {
								kind: le.ENUM,
								value: D.value
							});
						}
						case U.DOLLAR:
							if (f) if (this.expectToken(U.DOLLAR), this._lexer.token.kind === U.NAME) {
								let y = this._lexer.token.value;
								throw at(this._lexer.source, D.start, `Unexpected variable "$${y}" in constant value.`);
							} else throw this.unexpected(D);
							return this.parseVariable();
						default: throw this.unexpected();
					}
				}
				parseConstValueLiteral() {
					return this.parseValueLiteral(!0);
				}
				parseStringLiteral() {
					let f = this._lexer.token;
					return this.advanceLexer(), this.node(f, {
						kind: le.STRING,
						value: f.value,
						block: f.kind === U.BLOCK_STRING
					});
				}
				parseList(f) {
					let D = () => this.parseValueLiteral(f);
					return this.node(this._lexer.token, {
						kind: le.LIST,
						values: this.any(U.BRACKET_L, D, U.BRACKET_R)
					});
				}
				parseObject(f) {
					let D = () => this.parseObjectField(f);
					return this.node(this._lexer.token, {
						kind: le.OBJECT,
						fields: this.any(U.BRACE_L, D, U.BRACE_R)
					});
				}
				parseObjectField(f) {
					let D = this._lexer.token, y = this.parseName();
					return this.expectToken(U.COLON), this.node(D, {
						kind: le.OBJECT_FIELD,
						name: y,
						value: this.parseValueLiteral(f)
					});
				}
				parseDirectives(f) {
					let D = [];
					for (; this.peek(U.AT);) D.push(this.parseDirective(f));
					return D;
				}
				parseConstDirectives() {
					return this.parseDirectives(!0);
				}
				parseDirective(f) {
					let D = this._lexer.token;
					return this.expectToken(U.AT), this.node(D, {
						kind: le.DIRECTIVE,
						name: this.parseName(),
						arguments: this.parseArguments(f)
					});
				}
				parseTypeReference() {
					let f = this._lexer.token, D;
					if (this.expectOptionalToken(U.BRACKET_L)) {
						let y = this.parseTypeReference();
						this.expectToken(U.BRACKET_R), D = this.node(f, {
							kind: le.LIST_TYPE,
							type: y
						});
					} else D = this.parseNamedType();
					return this.expectOptionalToken(U.BANG) ? this.node(f, {
						kind: le.NON_NULL_TYPE,
						type: D
					}) : D;
				}
				parseNamedType() {
					return this.node(this._lexer.token, {
						kind: le.NAMED_TYPE,
						name: this.parseName()
					});
				}
				peekDescription() {
					return this.peek(U.STRING) || this.peek(U.BLOCK_STRING);
				}
				parseDescription() {
					if (this.peekDescription()) return this.parseStringLiteral();
				}
				parseSchemaDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("schema");
					let y = this.parseConstDirectives(), N = this.many(U.BRACE_L, this.parseOperationTypeDefinition, U.BRACE_R);
					return this.node(f, {
						kind: le.SCHEMA_DEFINITION,
						description: D,
						directives: y,
						operationTypes: N
					});
				}
				parseOperationTypeDefinition() {
					let f = this._lexer.token, D = this.parseOperationType();
					this.expectToken(U.COLON);
					let y = this.parseNamedType();
					return this.node(f, {
						kind: le.OPERATION_TYPE_DEFINITION,
						operation: D,
						type: y
					});
				}
				parseScalarTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("scalar");
					let y = this.parseName(), N = this.parseConstDirectives();
					return this.node(f, {
						kind: le.SCALAR_TYPE_DEFINITION,
						description: D,
						name: y,
						directives: N
					});
				}
				parseObjectTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("type");
					let y = this.parseName(), N = this.parseImplementsInterfaces(), b = this.parseConstDirectives(), $ = this.parseFieldsDefinition();
					return this.node(f, {
						kind: le.OBJECT_TYPE_DEFINITION,
						description: D,
						name: y,
						interfaces: N,
						directives: b,
						fields: $
					});
				}
				parseImplementsInterfaces() {
					return this.expectOptionalKeyword("implements") ? this.delimitedMany(U.AMP, this.parseNamedType) : [];
				}
				parseFieldsDefinition() {
					return this.optionalMany(U.BRACE_L, this.parseFieldDefinition, U.BRACE_R);
				}
				parseFieldDefinition() {
					let f = this._lexer.token, D = this.parseDescription(), y = this.parseName(), N = this.parseArgumentDefs();
					this.expectToken(U.COLON);
					let b = this.parseTypeReference(), $ = this.parseConstDirectives();
					return this.node(f, {
						kind: le.FIELD_DEFINITION,
						description: D,
						name: y,
						arguments: N,
						type: b,
						directives: $
					});
				}
				parseArgumentDefs() {
					return this.optionalMany(U.PAREN_L, this.parseInputValueDef, U.PAREN_R);
				}
				parseInputValueDef() {
					let f = this._lexer.token, D = this.parseDescription(), y = this.parseName();
					this.expectToken(U.COLON);
					let N = this.parseTypeReference(), b;
					this.expectOptionalToken(U.EQUALS) && (b = this.parseConstValueLiteral());
					let $ = this.parseConstDirectives();
					return this.node(f, {
						kind: le.INPUT_VALUE_DEFINITION,
						description: D,
						name: y,
						type: N,
						defaultValue: b,
						directives: $
					});
				}
				parseInterfaceTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("interface");
					let y = this.parseName(), N = this.parseImplementsInterfaces(), b = this.parseConstDirectives(), $ = this.parseFieldsDefinition();
					return this.node(f, {
						kind: le.INTERFACE_TYPE_DEFINITION,
						description: D,
						name: y,
						interfaces: N,
						directives: b,
						fields: $
					});
				}
				parseUnionTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("union");
					let y = this.parseName(), N = this.parseConstDirectives(), b = this.parseUnionMemberTypes();
					return this.node(f, {
						kind: le.UNION_TYPE_DEFINITION,
						description: D,
						name: y,
						directives: N,
						types: b
					});
				}
				parseUnionMemberTypes() {
					return this.expectOptionalToken(U.EQUALS) ? this.delimitedMany(U.PIPE, this.parseNamedType) : [];
				}
				parseEnumTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("enum");
					let y = this.parseName(), N = this.parseConstDirectives(), b = this.parseEnumValuesDefinition();
					return this.node(f, {
						kind: le.ENUM_TYPE_DEFINITION,
						description: D,
						name: y,
						directives: N,
						values: b
					});
				}
				parseEnumValuesDefinition() {
					return this.optionalMany(U.BRACE_L, this.parseEnumValueDefinition, U.BRACE_R);
				}
				parseEnumValueDefinition() {
					let f = this._lexer.token, D = this.parseDescription(), y = this.parseEnumValueName(), N = this.parseConstDirectives();
					return this.node(f, {
						kind: le.ENUM_VALUE_DEFINITION,
						description: D,
						name: y,
						directives: N
					});
				}
				parseEnumValueName() {
					if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") throw at(this._lexer.source, this._lexer.token.start, `${pa(this._lexer.token)} is reserved and cannot be used for an enum value.`);
					return this.parseName();
				}
				parseInputObjectTypeDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("input");
					let y = this.parseName(), N = this.parseConstDirectives(), b = this.parseInputFieldsDefinition();
					return this.node(f, {
						kind: le.INPUT_OBJECT_TYPE_DEFINITION,
						description: D,
						name: y,
						directives: N,
						fields: b
					});
				}
				parseInputFieldsDefinition() {
					return this.optionalMany(U.BRACE_L, this.parseInputValueDef, U.BRACE_R);
				}
				parseTypeSystemExtension() {
					let f = this._lexer.lookahead();
					if (f.kind === U.NAME) switch (f.value) {
						case "schema": return this.parseSchemaExtension();
						case "scalar": return this.parseScalarTypeExtension();
						case "type": return this.parseObjectTypeExtension();
						case "interface": return this.parseInterfaceTypeExtension();
						case "union": return this.parseUnionTypeExtension();
						case "enum": return this.parseEnumTypeExtension();
						case "input": return this.parseInputObjectTypeExtension();
					}
					throw this.unexpected(f);
				}
				parseSchemaExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("schema");
					let D = this.parseConstDirectives(), y = this.optionalMany(U.BRACE_L, this.parseOperationTypeDefinition, U.BRACE_R);
					if (D.length === 0 && y.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.SCHEMA_EXTENSION,
						directives: D,
						operationTypes: y
					});
				}
				parseScalarTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("scalar");
					let D = this.parseName(), y = this.parseConstDirectives();
					if (y.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.SCALAR_TYPE_EXTENSION,
						name: D,
						directives: y
					});
				}
				parseObjectTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("type");
					let D = this.parseName(), y = this.parseImplementsInterfaces(), N = this.parseConstDirectives(), b = this.parseFieldsDefinition();
					if (y.length === 0 && N.length === 0 && b.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.OBJECT_TYPE_EXTENSION,
						name: D,
						interfaces: y,
						directives: N,
						fields: b
					});
				}
				parseInterfaceTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("interface");
					let D = this.parseName(), y = this.parseImplementsInterfaces(), N = this.parseConstDirectives(), b = this.parseFieldsDefinition();
					if (y.length === 0 && N.length === 0 && b.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.INTERFACE_TYPE_EXTENSION,
						name: D,
						interfaces: y,
						directives: N,
						fields: b
					});
				}
				parseUnionTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("union");
					let D = this.parseName(), y = this.parseConstDirectives(), N = this.parseUnionMemberTypes();
					if (y.length === 0 && N.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.UNION_TYPE_EXTENSION,
						name: D,
						directives: y,
						types: N
					});
				}
				parseEnumTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("enum");
					let D = this.parseName(), y = this.parseConstDirectives(), N = this.parseEnumValuesDefinition();
					if (y.length === 0 && N.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.ENUM_TYPE_EXTENSION,
						name: D,
						directives: y,
						values: N
					});
				}
				parseInputObjectTypeExtension() {
					let f = this._lexer.token;
					this.expectKeyword("extend"), this.expectKeyword("input");
					let D = this.parseName(), y = this.parseConstDirectives(), N = this.parseInputFieldsDefinition();
					if (y.length === 0 && N.length === 0) throw this.unexpected();
					return this.node(f, {
						kind: le.INPUT_OBJECT_TYPE_EXTENSION,
						name: D,
						directives: y,
						fields: N
					});
				}
				parseDirectiveDefinition() {
					let f = this._lexer.token, D = this.parseDescription();
					this.expectKeyword("directive"), this.expectToken(U.AT);
					let y = this.parseName(), N = this.parseArgumentDefs(), b = this.expectOptionalKeyword("repeatable");
					this.expectKeyword("on");
					let $ = this.parseDirectiveLocations();
					return this.node(f, {
						kind: le.DIRECTIVE_DEFINITION,
						description: D,
						name: y,
						arguments: N,
						repeatable: b,
						locations: $
					});
				}
				parseDirectiveLocations() {
					return this.delimitedMany(U.PIPE, this.parseDirectiveLocation);
				}
				parseDirectiveLocation() {
					let f = this._lexer.token, D = this.parseName();
					if (Object.prototype.hasOwnProperty.call(ml, D.value)) return D;
					throw this.unexpected(f);
				}
				parseSchemaCoordinate() {
					let f = this._lexer.token, D = this.expectOptionalToken(U.AT), y = this.parseName(), N;
					!D && this.expectOptionalToken(U.DOT) && (N = this.parseName());
					let b;
					return (D || N) && this.expectOptionalToken(U.PAREN_L) && (b = this.parseName(), this.expectToken(U.COLON), this.expectToken(U.PAREN_R)), D ? b ? this.node(f, {
						kind: le.DIRECTIVE_ARGUMENT_COORDINATE,
						name: y,
						argumentName: b
					}) : this.node(f, {
						kind: le.DIRECTIVE_COORDINATE,
						name: y
					}) : N ? b ? this.node(f, {
						kind: le.ARGUMENT_COORDINATE,
						name: y,
						fieldName: N,
						argumentName: b
					}) : this.node(f, {
						kind: le.MEMBER_COORDINATE,
						name: y,
						memberName: N
					}) : this.node(f, {
						kind: le.TYPE_COORDINATE,
						name: y
					});
				}
				node(f, D) {
					return this._options.noLocation !== !0 && (D.loc = new Li(f, this._lexer.lastToken, this._lexer.source)), D;
				}
				peek(f) {
					return this._lexer.token.kind === f;
				}
				expectToken(f) {
					let D = this._lexer.token;
					if (D.kind === f) return this.advanceLexer(), D;
					throw at(this._lexer.source, D.start, `Expected ${t2(f)}, found ${pa(D)}.`);
				}
				expectOptionalToken(f) {
					return this._lexer.token.kind === f ? (this.advanceLexer(), !0) : !1;
				}
				expectKeyword(f) {
					let D = this._lexer.token;
					if (D.kind === U.NAME && D.value === f) this.advanceLexer();
					else throw at(this._lexer.source, D.start, `Expected "${f}", found ${pa(D)}.`);
				}
				expectOptionalKeyword(f) {
					let D = this._lexer.token;
					return D.kind === U.NAME && D.value === f ? (this.advanceLexer(), !0) : !1;
				}
				unexpected(f) {
					let D = f ?? this._lexer.token;
					return at(this._lexer.source, D.start, `Unexpected ${pa(D)}.`);
				}
				any(f, D, y) {
					this.expectToken(f);
					let N = [];
					for (; !this.expectOptionalToken(y);) N.push(D.call(this));
					return N;
				}
				optionalMany(f, D, y) {
					if (this.expectOptionalToken(f)) {
						let N = [];
						do
							N.push(D.call(this));
						while (!this.expectOptionalToken(y));
						return N;
					}
					return [];
				}
				many(f, D, y) {
					this.expectToken(f);
					let N = [];
					do
						N.push(D.call(this));
					while (!this.expectOptionalToken(y));
					return N;
				}
				delimitedMany(f, D) {
					this.expectOptionalToken(f);
					let y = [];
					do
						y.push(D.call(this));
					while (this.expectOptionalToken(f));
					return y;
				}
				advanceLexer() {
					let { maxTokens: f } = this._options, D = this._lexer.advance();
					if (D.kind !== U.EOF && (++this._tokenCounter, f !== void 0 && this._tokenCounter > f)) throw at(this._lexer.source, D.start, `Document contains more that ${f} tokens. Parsing aborted.`);
				}
			};
			function pa(f) {
				let D = f.value;
				return t2(f.kind) + (D != null ? ` "${D}"` : "");
			}
			function t2(f) {
				return LD(f) ? `"${f}"` : f;
			}
			function XD(f, D) {
				let y = /* @__PURE__ */ new SyntaxError(f + " (" + D.loc.start.line + ":" + D.loc.start.column + ")");
				return Object.assign(y, D);
			}
			var QD = XD;
			function ZD(f) {
				let D = [], { startToken: y, endToken: N } = f.loc;
				for (let b = y; b !== N; b = b.next) b.kind === "Comment" && D.push({
					...b,
					loc: {
						start: b.start,
						end: b.end
					}
				});
				return D;
			}
			var KD = { allowLegacyFragmentVariables: !0 };
			function e3(f) {
				if (f?.name === "GraphQLError") {
					let { message: D, locations: [y] } = f;
					return QD(D, {
						loc: { start: y },
						cause: f
					});
				}
				return f;
			}
			function t3(f) {
				let D;
				try {
					D = YD(f, KD);
				} catch (y) {
					throw e3(y);
				}
				return D.comments = ZD(D), D;
			}
			var n3 = {
				parse: t3,
				astFormat: "graphql",
				hasPragma: uD,
				hasIgnorePragma: lD,
				locStart: it,
				locEnd: st
			}, r3 = { graphql: DD };
			return u(l);
		});
	})), aD = class {
		_ctx;
		_languageService;
		_formattingOptions;
		constructor(e, t) {
			this._ctx = e, this._languageService = new $9(t.languageConfig), this._formattingOptions = t.formattingOptions;
		}
		async doValidation(e) {
			try {
				const t = this._getTextModel(e)?.getValue();
				return t ? this._languageService.getDiagnostics(e, t).map(q9) : [];
			} catch (t) {
				return console.error(t), [];
			}
		}
		async doComplete(e, t) {
			try {
				const n = this._getTextModel(e)?.getValue();
				if (!n) return [];
				const r = Sd(t);
				return this._languageService.getCompletion(e, n, r).map((i) => U9(i));
			} catch (n) {
				return console.error(n), [];
			}
		}
		async doHover(e, t) {
			try {
				const n = this._getTextModel(e)?.getValue();
				if (!n) return null;
				const r = Sd(t), i = this._languageService.getHover(e, n, r), s = dd(n, r);
				return {
					content: i,
					range: Td(new fu(new Sn(r.line, s.start), new Sn(r.line, s.end)))
				};
			} catch (n) {
				return console.error(n), null;
			}
		}
		async doGetVariablesJSONSchema(e) {
			const t = this._getTextModel(e), n = t?.getValue();
			if (!t || !n) return null;
			const r = this._languageService.getVariablesJSONSchema(e, n, { useMarkdownDescription: !0 });
			return r ? {
				...r,
				$id: "monaco://variables-schema.json",
				title: "GraphQL Variables"
			} : null;
		}
		async doFormat(e) {
			const t = this._getTextModel(e), n = t?.getValue();
			if (!t || !n) return null;
			const r = await Promise.resolve().then(() => (iD(), H9)), i = await Promise.resolve().then(() => ba(sD()));
			return r.format(n, {
				parser: "graphql",
				plugins: [i],
				...this._formattingOptions?.prettierConfig
			});
		}
		_getTextModel(e) {
			const t = this._ctx.getMirrorModels();
			for (const n of t) if (n.uri.toString() === e) return n;
			return null;
		}
		doUpdateSchema(e) {
			return this._languageService.updateSchema(e);
		}
		doUpdateSchemas(e) {
			return this._languageService.updateSchemas(e);
		}
	};
	globalThis.onmessage = () => {
		$1((e, t) => new aD(e, t));
	};
})();
