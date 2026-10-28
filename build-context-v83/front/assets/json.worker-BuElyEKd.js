(function() {
	var ra = class {
		constructor() {
			this.listeners = [], this.unexpectedErrorHandler = function(e) {
				setTimeout(() => {
					throw e.stack ? Pn.isErrorNoTelemetry(e) ? new Pn(e.message + `

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
	const ia = new ra();
	function At(e) {
		sa(e) || ia.onUnexpectedError(e);
	}
	function ti(e) {
		if (e instanceof Error) {
			const { name: t, message: n } = e;
			return {
				$isError: !0,
				name: t,
				message: n,
				stack: e.stacktrace || e.stack,
				noTelemetry: Pn.isErrorNoTelemetry(e)
			};
		}
		return e;
	}
	const Tn = "Canceled";
	function sa(e) {
		return e instanceof oa ? !0 : e instanceof Error && e.name === Tn && e.message === Tn;
	}
	var oa = class extends Error {
		constructor() {
			super(Tn), this.name = this.message;
		}
	}, Pn = class Gr extends Error {
		constructor(t) {
			super(t), this.name = "CodeExpectedError";
		}
		static fromError(t) {
			if (t instanceof Gr) return t;
			const n = new Gr();
			return n.message = t.message, n.stack = t.stack, n;
		}
		static isErrorNoTelemetry(t) {
			return t.name === "CodeExpectedError";
		}
	}, Le = class qo extends Error {
		constructor(t) {
			super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, qo.prototype);
		}
	};
	function aa(e, t) {
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
	var zt;
	(function(e) {
		function t(y) {
			return y && typeof y == "object" && typeof y[Symbol.iterator] == "function";
		}
		e.is = t;
		const n = Object.freeze([]);
		function r() {
			return n;
		}
		e.empty = r;
		function* i(y) {
			yield y;
		}
		e.single = i;
		function s(y) {
			return t(y) ? y : i(y);
		}
		e.wrap = s;
		function o(y) {
			return y || n;
		}
		e.from = o;
		function* l(y) {
			for (let b = y.length - 1; b >= 0; b--) yield y[b];
		}
		e.reverse = l;
		function a(y) {
			return !y || y[Symbol.iterator]().next().done === !0;
		}
		e.isEmpty = a;
		function u(y) {
			return y[Symbol.iterator]().next().value;
		}
		e.first = u;
		function h(y, b) {
			let L = 0;
			for (const S of y) if (b(S, L++)) return !0;
			return !1;
		}
		e.some = h;
		function f(y, b) {
			for (const L of y) if (b(L)) return L;
		}
		e.find = f;
		function* d(y, b) {
			for (const L of y) b(L) && (yield L);
		}
		e.filter = d;
		function* m(y, b) {
			let L = 0;
			for (const S of y) yield b(S, L++);
		}
		e.map = m;
		function* g(y, b) {
			let L = 0;
			for (const S of y) yield* b(S, L++);
		}
		e.flatMap = g;
		function* p(...y) {
			for (const b of y) yield* b;
		}
		e.concat = p;
		function w(y, b, L) {
			let S = L;
			for (const T of y) S = b(S, T);
			return S;
		}
		e.reduce = w;
		function* _(y, b, L = y.length) {
			for (b < 0 && (b += y.length), L < 0 ? L += y.length : L > y.length && (L = y.length); b < L; b++) yield y[b];
		}
		e.slice = _;
		function N(y, b = Number.POSITIVE_INFINITY) {
			const L = [];
			if (b === 0) return [L, y];
			const S = y[Symbol.iterator]();
			for (let T = 0; T < b; T++) {
				const F = S.next();
				if (F.done) return [L, e.empty()];
				L.push(F.value);
			}
			return [L, { [Symbol.iterator]() {
				return S;
			} }];
		}
		e.consume = N;
		async function v(y) {
			const b = [];
			for await (const L of y) b.push(L);
			return Promise.resolve(b);
		}
		e.asyncToArray = v;
	})(zt || (zt = {}));
	function In(e) {
		return e;
	}
	function ni(e) {
		if (zt.is(e)) {
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
	function ua(...e) {
		return Gt(() => ni(e));
	}
	function Gt(e) {
		return In({ dispose: aa(() => {
			e();
		}) });
	}
	var Dn = class jo {
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
				ni(this._toDispose);
			} finally {
				this._toDispose.clear();
			}
		}
		add(t) {
			if (!t) return t;
			if (t === this) throw new Error("Cannot register a disposable on itself!");
			return this._isDisposed ? jo.DISABLE_DISPOSED_WARNING || console.warn((/* @__PURE__ */ new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!")).stack) : this._toDispose.add(t), t;
		}
		deleteAndLeak(t) {
			t && this._toDispose.has(t) && this._toDispose.delete(t);
		}
	}, Jt = class {
		static {
			this.None = Object.freeze({ dispose() {} });
		}
		constructor() {
			this._store = new Dn(), this._store;
		}
		dispose() {
			this._store.dispose();
		}
		_register(e) {
			if (e === this) throw new Error("Cannot register a disposable on itself!");
			return this._store.add(e);
		}
	}, X = class kn {
		static {
			this.Undefined = new kn(void 0);
		}
		constructor(t) {
			this.element = t, this.next = kn.Undefined, this.prev = kn.Undefined;
		}
	}, ca = class {
		constructor() {
			this._first = X.Undefined, this._last = X.Undefined, this._size = 0;
		}
		get size() {
			return this._size;
		}
		isEmpty() {
			return this._first === X.Undefined;
		}
		clear() {
			let e = this._first;
			for (; e !== X.Undefined;) {
				const t = e.next;
				e.prev = X.Undefined, e.next = X.Undefined, e = t;
			}
			this._first = X.Undefined, this._last = X.Undefined, this._size = 0;
		}
		unshift(e) {
			return this._insert(e, !1);
		}
		push(e) {
			return this._insert(e, !0);
		}
		_insert(e, t) {
			const n = new X(e);
			if (this._first === X.Undefined) this._first = n, this._last = n;
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
			if (this._first !== X.Undefined) {
				const e = this._first.element;
				return this._remove(this._first), e;
			}
		}
		pop() {
			if (this._last !== X.Undefined) {
				const e = this._last.element;
				return this._remove(this._last), e;
			}
		}
		_remove(e) {
			if (e.prev !== X.Undefined && e.next !== X.Undefined) {
				const t = e.prev;
				t.next = e.next, e.next.prev = t;
			} else e.prev === X.Undefined && e.next === X.Undefined ? (this._first = X.Undefined, this._last = X.Undefined) : e.next === X.Undefined ? (this._last = this._last.prev, this._last.next = X.Undefined) : e.prev === X.Undefined && (this._first = this._first.next, this._first.prev = X.Undefined);
			this._size -= 1;
		}
		*[Symbol.iterator]() {
			let e = this._first;
			for (; e !== X.Undefined;) yield e.element, e = e.next;
		}
	};
	const fa = globalThis.performance && typeof globalThis.performance.now == "function";
	var ri = class Wo {
		static create(t) {
			return new Wo(t);
		}
		constructor(t) {
			this._now = fa && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
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
	}, Xt;
	(function(e) {
		e.None = () => Jt.None;
		function t(R, x) {
			return d(R, () => {}, 0, void 0, !0, void 0, x);
		}
		e.defer = t;
		function n(R) {
			return (x, I = null, C) => {
				let P = !1, O;
				return O = R((B) => {
					if (!P) return O ? O.dispose() : P = !0, x.call(I, B);
				}, null, C), P && O.dispose(), O;
			};
		}
		e.once = n;
		function r(R, x) {
			return e.once(e.filter(R, x));
		}
		e.onceIf = r;
		function i(R, x, I) {
			return h((C, P = null, O) => R((B) => C.call(P, x(B)), null, O), I);
		}
		e.map = i;
		function s(R, x, I) {
			return h((C, P = null, O) => R((B) => {
				x(B), C.call(P, B);
			}, null, O), I);
		}
		e.forEach = s;
		function o(R, x, I) {
			return h((C, P = null, O) => R((B) => x(B) && C.call(P, B), null, O), I);
		}
		e.filter = o;
		function l(R) {
			return R;
		}
		e.signal = l;
		function a(...R) {
			return (x, I = null, C) => f(ua(...R.map((P) => P((O) => x.call(I, O)))), C);
		}
		e.any = a;
		function u(R, x, I, C) {
			let P = I;
			return i(R, (O) => (P = x(P, O), P), C);
		}
		e.reduce = u;
		function h(R, x) {
			let I;
			const P = new ve({
				onWillAddFirstListener() {
					I = R(P.fire, P);
				},
				onDidRemoveLastListener() {
					I?.dispose();
				}
			});
			return x?.add(P), P.event;
		}
		function f(R, x) {
			return x instanceof Array ? x.push(R) : x && x.add(R), R;
		}
		function d(R, x, I = 100, C = !1, P = !1, O, B) {
			let q, ee, wt, Sn = 0, Ut;
			const An = new ve({
				leakWarningThreshold: O,
				onWillAddFirstListener() {
					q = R((g0) => {
						Sn++, ee = x(ee, g0), C && !wt && (An.fire(ee), ee = void 0), Ut = () => {
							const p0 = ee;
							ee = void 0, wt = void 0, (!C || Sn > 1) && An.fire(p0), Sn = 0;
						}, typeof I == "number" ? (clearTimeout(wt), wt = setTimeout(Ut, I)) : wt === void 0 && (wt = 0, queueMicrotask(Ut));
					});
				},
				onWillRemoveListener() {
					P && Sn > 0 && Ut?.();
				},
				onDidRemoveLastListener() {
					Ut = void 0, q.dispose();
				}
			});
			return B?.add(An), An.event;
		}
		e.debounce = d;
		function m(R, x = 0, I) {
			return e.debounce(R, (C, P) => C ? (C.push(P), C) : [P], x, void 0, !0, void 0, I);
		}
		e.accumulate = m;
		function g(R, x = (C, P) => C === P, I) {
			let C = !0, P;
			return o(R, (O) => {
				const B = C || !x(O, P);
				return C = !1, P = O, B;
			}, I);
		}
		e.latch = g;
		function p(R, x, I) {
			return [e.filter(R, x, I), e.filter(R, (C) => !x(C), I)];
		}
		e.split = p;
		function w(R, x = !1, I = [], C) {
			let P = I.slice(), O = R((ee) => {
				P ? P.push(ee) : q.fire(ee);
			});
			C && C.add(O);
			const B = () => {
				P?.forEach((ee) => q.fire(ee)), P = null;
			}, q = new ve({
				onWillAddFirstListener() {
					O || (O = R((ee) => q.fire(ee)), C && C.add(O));
				},
				onDidAddFirstListener() {
					P && (x ? setTimeout(B) : B());
				},
				onDidRemoveLastListener() {
					O && O.dispose(), O = null;
				}
			});
			return C && C.add(q), q.event;
		}
		e.buffer = w;
		function _(R, x) {
			return (C, P, O) => {
				const B = x(new v());
				return R(function(q) {
					const ee = B.evaluate(q);
					ee !== N && C.call(P, ee);
				}, void 0, O);
			};
		}
		e.chain = _;
		const N = Symbol("HaltChainable");
		class v {
			constructor() {
				this.steps = [];
			}
			map(x) {
				return this.steps.push(x), this;
			}
			forEach(x) {
				return this.steps.push((I) => (x(I), I)), this;
			}
			filter(x) {
				return this.steps.push((I) => x(I) ? I : N), this;
			}
			reduce(x, I) {
				let C = I;
				return this.steps.push((P) => (C = x(C, P), C)), this;
			}
			latch(x = (I, C) => I === C) {
				let I = !0, C;
				return this.steps.push((P) => {
					const O = I || !x(P, C);
					return I = !1, C = P, O ? P : N;
				}), this;
			}
			evaluate(x) {
				for (const I of this.steps) if (x = I(x), x === N) break;
				return x;
			}
		}
		function y(R, x, I = (C) => C) {
			const C = (...q) => B.fire(I(...q)), P = () => R.on(x, C), O = () => R.removeListener(x, C), B = new ve({
				onWillAddFirstListener: P,
				onDidRemoveLastListener: O
			});
			return B.event;
		}
		e.fromNodeEventEmitter = y;
		function b(R, x, I = (C) => C) {
			const C = (...q) => B.fire(I(...q)), P = () => R.addEventListener(x, C), O = () => R.removeEventListener(x, C), B = new ve({
				onWillAddFirstListener: P,
				onDidRemoveLastListener: O
			});
			return B.event;
		}
		e.fromDOMEventEmitter = b;
		function L(R) {
			return new Promise((x) => n(R)(x));
		}
		e.toPromise = L;
		function S(R) {
			const x = new ve();
			return R.then((I) => {
				x.fire(I);
			}, () => {
				x.fire(void 0);
			}).finally(() => {
				x.dispose();
			}), x.event;
		}
		e.fromPromise = S;
		function T(R, x) {
			return R((I) => x.fire(I));
		}
		e.forward = T;
		function F(R, x, I) {
			return x(I), R((C) => x(C));
		}
		e.runAndSubscribe = F;
		class D {
			constructor(x, I) {
				this._observable = x, this._counter = 0, this._hasChanged = !1;
				const C = {
					onWillAddFirstListener: () => {
						x.addObserver(this), this._observable.reportChanges();
					},
					onDidRemoveLastListener: () => {
						x.removeObserver(this);
					}
				};
				this.emitter = new ve(C), I && I.add(this.emitter);
			}
			beginUpdate(x) {
				this._counter++;
			}
			handlePossibleChange(x) {}
			handleChange(x, I) {
				this._hasChanged = !0;
			}
			endUpdate(x) {
				this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
			}
		}
		function M(R, x) {
			return new D(R, x).emitter.event;
		}
		e.fromObservable = M;
		function k(R) {
			return (x, I, C) => {
				let P = 0, O = !1;
				const B = {
					beginUpdate() {
						P++;
					},
					endUpdate() {
						P--, P === 0 && (R.reportChanges(), O && (O = !1, x.call(I)));
					},
					handlePossibleChange() {},
					handleChange() {
						O = !0;
					}
				};
				R.addObserver(B), R.reportChanges();
				const q = { dispose() {
					R.removeObserver(B);
				} };
				return C instanceof Dn ? C.add(q) : Array.isArray(C) && C.push(q), q;
			};
		}
		e.fromObservableLight = k;
	})(Xt || (Xt = {}));
	var ha = class Jr {
		static {
			this.all = /* @__PURE__ */ new Set();
		}
		static {
			this._idPool = 0;
		}
		constructor(t) {
			this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${Jr._idPool++}`, Jr.all.add(this);
		}
		start(t) {
			this._stopWatch = new ri(), this.listenerCount = t;
		}
		stop() {
			if (this._stopWatch) {
				const t = this._stopWatch.elapsed();
				this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
			}
		}
	};
	let ma = -1;
	var da = class Ho {
		static {
			this._idPool = 1;
		}
		constructor(t, n, r = (Ho._idPool++).toString(16).padStart(3, "0")) {
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
				const [s, o] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${o}):`;
				console.warn(l), console.warn(s);
				const a = new pa(l, s);
				this._errorHandler(a);
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
	}, ga = class zo {
		static create() {
			return new zo((/* @__PURE__ */ new Error()).stack ?? "");
		}
		constructor(t) {
			this.value = t;
		}
		print() {
			console.warn(this.value.split(`
`).slice(2).join(`
`));
		}
	}, pa = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerLeakError", this.stack = t;
		}
	}, ba = class extends Error {
		constructor(e, t) {
			super(e), this.name = "ListenerRefusalError", this.stack = t;
		}
	}, On = class {
		constructor(e) {
			this.value = e;
		}
	};
	const ya = 2;
	var ve = class {
		constructor(e) {
			this._size = 0, this._options = e, this._leakageMon = this._options?.leakWarningThreshold ? new da(e?.onListenerError ?? At, this._options?.leakWarningThreshold ?? ma) : void 0, this._perfMon = this._options?._profName ? new ha(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
		}
		dispose() {
			this._disposed || (this._disposed = !0, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose());
		}
		get event() {
			return this._event ??= (e, t, n) => {
				if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
					const o = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
					console.warn(o);
					const l = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], a = new ba(`${o}. HINT: Stack shows most frequent listener (${l[1]}-times)`, l[0]);
					return (this._options?.onListenerError || At)(a), Jt.None;
				}
				if (this._disposed) return Jt.None;
				t && (e = e.bind(t));
				const r = new On(e);
				let i;
				this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * .2) && (r.stack = ga.create(), i = this._leakageMon.check(r.stack, this._size + 1)), this._listeners ? this._listeners instanceof On ? (this._deliveryQueue ??= new va(), this._listeners = [this._listeners, r]) : this._listeners.push(r) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r, this._options?.onDidAddFirstListener?.(this)), this._size++;
				const s = Gt(() => {
					i?.(), this._removeListener(r);
				});
				return n instanceof Dn ? n.add(s) : Array.isArray(n) && n.push(s), s;
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
			if (this._size * ya <= t.length) {
				let i = 0;
				for (let s = 0; s < t.length; s++) t[s] ? t[i++] = t[s] : r && (this._deliveryQueue.end--, i < this._deliveryQueue.i && this._deliveryQueue.i--);
				t.length = i;
			}
		}
		_deliver(e, t) {
			if (!e) return;
			const n = this._options?.onListenerError || At;
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
			if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof On) this._deliver(this._listeners, e);
			else {
				const t = this._deliveryQueue;
				t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
			}
			this._perfMon?.stop();
		}
		hasListeners() {
			return this._size > 0;
		}
	}, va = class {
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
	function wa() {
		return globalThis._VSCODE_NLS_MESSAGES;
	}
	function ii() {
		return globalThis._VSCODE_NLS_LANGUAGE;
	}
	const _a = ii() === "pseudo" || typeof document < "u" && document.location && document.location.hash.indexOf("pseudo=true") >= 0;
	function si(e, t) {
		let n;
		return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, i) => {
			const s = t[i[0]];
			let o = r;
			return typeof s == "string" ? o = s : (typeof s == "number" || typeof s == "boolean" || s === void 0 || s === null) && (o = String(s)), o;
		}), _a && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
	}
	function G(e, t, ...n) {
		return si(typeof e == "number" ? La(e, t) : t, n);
	}
	function La(e, t) {
		const n = wa()?.[e];
		if (typeof n != "string") {
			if (typeof t == "string") return t;
			throw new Error(`!!! NLS MISSING: ${e} !!!`);
		}
		return n;
	}
	let $n = !1, Bn = !1, Un = !1, oi = !1, qn = !1, Pe;
	const Ie = globalThis;
	let de;
	typeof Ie.vscode < "u" && typeof Ie.vscode.process < "u" ? de = Ie.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (de = process);
	const Aa = typeof de?.versions?.electron == "string" && de?.type === "renderer";
	if (typeof de == "object") {
		$n = de.platform === "win32", Bn = de.platform === "darwin", Un = de.platform === "linux", Un && de.env.SNAP && de.env.SNAP_REVISION, de.env.CI || de.env.BUILD_ARTIFACTSTAGINGDIRECTORY;
		const e = de.env.VSCODE_NLS_CONFIG;
		if (e) try {
			const t = JSON.parse(e);
			t.userLocale, t.osLocale, t.resolvedLanguage, t.languagePack?.translationsConfigFile;
		} catch {}
		oi = !0;
	} else typeof navigator == "object" && !Aa ? (Pe = navigator.userAgent, $n = Pe.indexOf("Windows") >= 0, Bn = Pe.indexOf("Macintosh") >= 0, (Pe.indexOf("Macintosh") >= 0 || Pe.indexOf("iPad") >= 0 || Pe.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints, Un = Pe.indexOf("Linux") >= 0, Pe?.indexOf("Mobi"), qn = !0, ii(), navigator.language.toLowerCase()) : console.error("Unable to resolve platform.");
	const xt = $n, ka = Bn, xa = oi, Ra = qn, Ea = qn && typeof Ie.importScripts == "function" ? Ie.origin : void 0, xe = Pe, Ma = typeof Ie.postMessage == "function" && !Ie.importScripts;
	(() => {
		if (Ma) {
			const e = [];
			Ie.addEventListener("message", (n) => {
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
				}), Ie.postMessage({ vscodeScheduleAsyncWork: r }, "*");
			};
		}
		return (e) => setTimeout(e);
	})();
	const Ta = !!(xe && xe.indexOf("Chrome") >= 0);
	xe && xe.indexOf("Firefox");
	!Ta && xe && xe.indexOf("Safari");
	xe && xe.indexOf("Edg/");
	xe && xe.indexOf("Android");
	function Pa(e) {
		return e;
	}
	var Ia = class {
		constructor(e, t) {
			this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = Pa) : (this._fn = t, this._computeKey = e.getCacheKey);
		}
		get(e) {
			const t = this._computeKey(e);
			return this.lastArgKey !== t && (this.lastArgKey = t, this.lastCache = this._fn(e)), this.lastCache;
		}
	}, ai = class {
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
	function Fa(e) {
		return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
	}
	function Va(e) {
		return e.split(/\r\n|\r|\n/);
	}
	function Da(e) {
		for (let t = 0, n = e.length; t < n; t++) {
			const r = e.charCodeAt(t);
			if (r !== 32 && r !== 9) return t;
		}
		return -1;
	}
	function Oa(e, t = e.length - 1) {
		for (let n = t; n >= 0; n--) {
			const r = e.charCodeAt(n);
			if (r !== 32 && r !== 9) return n;
		}
		return -1;
	}
	function li(e) {
		return e >= 65 && e <= 90;
	}
	function Qt(e) {
		return 55296 <= e && e <= 56319;
	}
	function Wn(e) {
		return 56320 <= e && e <= 57343;
	}
	function ui(e, t) {
		return (e - 55296 << 10) + (t - 56320) + 65536;
	}
	function $a(e, t, n) {
		const r = e.charCodeAt(n);
		if (Qt(r) && n + 1 < t) {
			const i = e.charCodeAt(n + 1);
			if (Wn(i)) return ui(r, i);
		}
		return r;
	}
	const Ba = /^[\t\n\r\x20-\x7E]*$/;
	function Ua(e) {
		return Ba.test(e);
	}
	(class qt {
		static {
			this._INSTANCE = null;
		}
		static getInstance() {
			return qt._INSTANCE || (qt._INSTANCE = new qt()), qt._INSTANCE;
		}
		constructor() {
			this._data = qa();
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
	function qa() {
		return JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]");
	}
	var Hn = class jt {
		static {
			this.ambiguousCharacterData = new ai(() => JSON.parse("{\"_common\":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],\"_default\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"cs\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"de\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"es\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"fr\":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"it\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ja\":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],\"ko\":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pl\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"pt-BR\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"qps-ploc\":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"ru\":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"tr\":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],\"zh-hans\":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],\"zh-hant\":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}"));
		}
		static {
			this.cache = new Ia({ getCacheKey: JSON.stringify }, (t) => {
				function n(a) {
					const u = /* @__PURE__ */ new Map();
					for (let h = 0; h < a.length; h += 2) u.set(a[h], a[h + 1]);
					return u;
				}
				function r(a, u) {
					const h = new Map(a);
					for (const [f, d] of u) h.set(f, d);
					return h;
				}
				function i(a, u) {
					if (!a) return u;
					const h = /* @__PURE__ */ new Map();
					for (const [f, d] of a) u.has(f) && h.set(f, d);
					return h;
				}
				const s = this.ambiguousCharacterData.value;
				let o = t.filter((a) => !a.startsWith("_") && a in s);
				o.length === 0 && (o = ["_default"]);
				let l;
				for (const a of o) {
					const u = n(s[a]);
					l = i(l, u);
				}
				return new jt(r(n(s._common), l));
			});
		}
		static getInstance(t) {
			return jt.cache.get(Array.from(t));
		}
		static {
			this._locales = new ai(() => Object.keys(jt.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
		}
		static getLocales() {
			return jt._locales.value;
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
	}, zn = class xn {
		static getRawData() {
			return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
		}
		static {
			this._data = void 0;
		}
		static getData() {
			return this._data || (this._data = new Set(xn.getRawData())), this._data;
		}
		static isInvisibleCharacter(t) {
			return xn.getData().has(t);
		}
		static get codePoints() {
			return xn.getData();
		}
	};
	let rt;
	const Gn = globalThis.vscode;
	if (typeof Gn < "u" && typeof Gn.process < "u") {
		const e = Gn.process;
		rt = {
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
	} else typeof process < "u" && typeof process?.versions?.node == "string" ? rt = {
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
	} : rt = {
		get platform() {
			return xt ? "win32" : ka ? "darwin" : "linux";
		},
		get arch() {},
		get env() {
			return {};
		},
		cwd() {
			return "/";
		}
	};
	const Yt = rt.cwd, ja = rt.env, Wa = rt.platform, Ha = 65, za = 97, Ga = 90, Ja = 122, Be = 46, oe = 47, he = 92, Ue = 58, Xa = 63;
	var ci = class extends Error {
		constructor(e, t, n) {
			let r;
			typeof t == "string" && t.indexOf("not ") === 0 ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be";
			let i = `The "${e}" ${e.indexOf(".") !== -1 ? "property" : "argument"} ${r} of type ${t}`;
			i += `. Received type ${typeof n}`, super(i), this.code = "ERR_INVALID_ARG_TYPE";
		}
	};
	function Qa(e, t) {
		if (e === null || typeof e != "object") throw new ci(t, "Object", e);
	}
	function Y(e, t) {
		if (typeof e != "string") throw new ci(t, "string", e);
	}
	const Fe = Wa === "win32";
	function $(e) {
		return e === oe || e === he;
	}
	function Jn(e) {
		return e === oe;
	}
	function qe(e) {
		return e >= Ha && e <= Ga || e >= za && e <= Ja;
	}
	function Zt(e, t, n, r) {
		let i = "", s = 0, o = -1, l = 0, a = 0;
		for (let u = 0; u <= e.length; ++u) {
			if (u < e.length) a = e.charCodeAt(u);
			else {
				if (r(a)) break;
				a = oe;
			}
			if (r(a)) {
				if (!(o === u - 1 || l === 1)) if (l === 2) {
					if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== Be || i.charCodeAt(i.length - 2) !== Be) {
						if (i.length > 2) {
							const h = i.lastIndexOf(n);
							h === -1 ? (i = "", s = 0) : (i = i.slice(0, h), s = i.length - 1 - i.lastIndexOf(n)), o = u, l = 0;
							continue;
						} else if (i.length !== 0) {
							i = "", s = 0, o = u, l = 0;
							continue;
						}
					}
					t && (i += i.length > 0 ? `${n}..` : "..", s = 2);
				} else i.length > 0 ? i += `${n}${e.slice(o + 1, u)}` : i = e.slice(o + 1, u), s = u - o - 1;
				o = u, l = 0;
			} else a === Be && l !== -1 ? ++l : l = -1;
		}
		return i;
	}
	function Ya(e) {
		return e ? `${e[0] === "." ? "" : "."}${e}` : "";
	}
	function fi(e, t) {
		Qa(t, "pathObject");
		const n = t.dir || t.root, r = t.base || `${t.name || ""}${Ya(t.ext)}`;
		return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
	}
	const le = {
		resolve(...e) {
			let t = "", n = "", r = !1;
			for (let i = e.length - 1; i >= -1; i--) {
				let s;
				if (i >= 0) {
					if (s = e[i], Y(s, `paths[${i}]`), s.length === 0) continue;
				} else t.length === 0 ? s = Yt() : (s = ja[`=${t}`] || Yt(), (s === void 0 || s.slice(0, 2).toLowerCase() !== t.toLowerCase() && s.charCodeAt(2) === he) && (s = `${t}\\`));
				const o = s.length;
				let l = 0, a = "", u = !1;
				const h = s.charCodeAt(0);
				if (o === 1) $(h) && (l = 1, u = !0);
				else if ($(h)) if (u = !0, $(s.charCodeAt(1))) {
					let f = 2, d = f;
					for (; f < o && !$(s.charCodeAt(f));) f++;
					if (f < o && f !== d) {
						const m = s.slice(d, f);
						for (d = f; f < o && $(s.charCodeAt(f));) f++;
						if (f < o && f !== d) {
							for (d = f; f < o && !$(s.charCodeAt(f));) f++;
							(f === o || f !== d) && (a = `\\\\${m}\\${s.slice(d, f)}`, l = f);
						}
					}
				} else l = 1;
				else qe(h) && s.charCodeAt(1) === Ue && (a = s.slice(0, 2), l = 2, o > 2 && $(s.charCodeAt(2)) && (u = !0, l = 3));
				if (a.length > 0) if (t.length > 0) {
					if (a.toLowerCase() !== t.toLowerCase()) continue;
				} else t = a;
				if (r) {
					if (t.length > 0) break;
				} else if (n = `${s.slice(l)}\\${n}`, r = u, u && t.length > 0) break;
			}
			return n = Zt(n, !r, "\\", $), r ? `${t}\\${n}` : `${t}${n}` || ".";
		},
		normalize(e) {
			Y(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = 0, r, i = !1;
			const s = e.charCodeAt(0);
			if (t === 1) return Jn(s) ? "\\" : e;
			if ($(s)) if (i = !0, $(e.charCodeAt(1))) {
				let l = 2, a = l;
				for (; l < t && !$(e.charCodeAt(l));) l++;
				if (l < t && l !== a) {
					const u = e.slice(a, l);
					for (a = l; l < t && $(e.charCodeAt(l));) l++;
					if (l < t && l !== a) {
						for (a = l; l < t && !$(e.charCodeAt(l));) l++;
						if (l === t) return `\\\\${u}\\${e.slice(a)}\\`;
						l !== a && (r = `\\\\${u}\\${e.slice(a, l)}`, n = l);
					}
				}
			} else n = 1;
			else qe(s) && e.charCodeAt(1) === Ue && (r = e.slice(0, 2), n = 2, t > 2 && $(e.charCodeAt(2)) && (i = !0, n = 3));
			let o = n < t ? Zt(e.slice(n), !i, "\\", $) : "";
			return o.length === 0 && !i && (o = "."), o.length > 0 && $(e.charCodeAt(t - 1)) && (o += "\\"), r === void 0 ? i ? `\\${o}` : o : i ? `${r}\\${o}` : `${r}${o}`;
		},
		isAbsolute(e) {
			Y(e, "path");
			const t = e.length;
			if (t === 0) return !1;
			const n = e.charCodeAt(0);
			return $(n) || t > 2 && qe(n) && e.charCodeAt(1) === Ue && $(e.charCodeAt(2));
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t, n;
			for (let s = 0; s < e.length; ++s) {
				const o = e[s];
				Y(o, "path"), o.length > 0 && (t === void 0 ? t = n = o : t += `\\${o}`);
			}
			if (t === void 0) return ".";
			let r = !0, i = 0;
			if (typeof n == "string" && $(n.charCodeAt(0))) {
				++i;
				const s = n.length;
				s > 1 && $(n.charCodeAt(1)) && (++i, s > 2 && ($(n.charCodeAt(2)) ? ++i : r = !1));
			}
			if (r) {
				for (; i < t.length && $(t.charCodeAt(i));) i++;
				i >= 2 && (t = `\\${t.slice(i)}`);
			}
			return le.normalize(t);
		},
		relative(e, t) {
			if (Y(e, "from"), Y(t, "to"), e === t) return "";
			const n = le.resolve(e), r = le.resolve(t);
			if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t)) return "";
			let i = 0;
			for (; i < e.length && e.charCodeAt(i) === he;) i++;
			let s = e.length;
			for (; s - 1 > i && e.charCodeAt(s - 1) === he;) s--;
			const o = s - i;
			let l = 0;
			for (; l < t.length && t.charCodeAt(l) === he;) l++;
			let a = t.length;
			for (; a - 1 > l && t.charCodeAt(a - 1) === he;) a--;
			const u = a - l, h = o < u ? o : u;
			let f = -1, d = 0;
			for (; d < h; d++) {
				const g = e.charCodeAt(i + d);
				if (g !== t.charCodeAt(l + d)) break;
				g === he && (f = d);
			}
			if (d !== h) {
				if (f === -1) return r;
			} else {
				if (u > h) {
					if (t.charCodeAt(l + d) === he) return r.slice(l + d + 1);
					if (d === 2) return r.slice(l + d);
				}
				o > h && (e.charCodeAt(i + d) === he ? f = d : d === 2 && (f = 3)), f === -1 && (f = 0);
			}
			let m = "";
			for (d = i + f + 1; d <= s; ++d) (d === s || e.charCodeAt(d) === he) && (m += m.length === 0 ? ".." : "\\..");
			return l += f, m.length > 0 ? `${m}${r.slice(l, a)}` : (r.charCodeAt(l) === he && ++l, r.slice(l, a));
		},
		toNamespacedPath(e) {
			if (typeof e != "string" || e.length === 0) return e;
			const t = le.resolve(e);
			if (t.length <= 2) return e;
			if (t.charCodeAt(0) === he) {
				if (t.charCodeAt(1) === he) {
					const n = t.charCodeAt(2);
					if (n !== Xa && n !== Be) return `\\\\?\\UNC\\${t.slice(2)}`;
				}
			} else if (qe(t.charCodeAt(0)) && t.charCodeAt(1) === Ue && t.charCodeAt(2) === he) return `\\\\?\\${t}`;
			return e;
		},
		dirname(e) {
			Y(e, "path");
			const t = e.length;
			if (t === 0) return ".";
			let n = -1, r = 0;
			const i = e.charCodeAt(0);
			if (t === 1) return $(i) ? e : ".";
			if ($(i)) {
				if (n = r = 1, $(e.charCodeAt(1))) {
					let l = 2, a = l;
					for (; l < t && !$(e.charCodeAt(l));) l++;
					if (l < t && l !== a) {
						for (a = l; l < t && $(e.charCodeAt(l));) l++;
						if (l < t && l !== a) {
							for (a = l; l < t && !$(e.charCodeAt(l));) l++;
							if (l === t) return e;
							l !== a && (n = r = l + 1);
						}
					}
				}
			} else qe(i) && e.charCodeAt(1) === Ue && (n = t > 2 && $(e.charCodeAt(2)) ? 3 : 2, r = n);
			let s = -1, o = !0;
			for (let l = t - 1; l >= r; --l) if ($(e.charCodeAt(l))) {
				if (!o) {
					s = l;
					break;
				}
			} else o = !1;
			if (s === -1) {
				if (n === -1) return ".";
				s = n;
			}
			return e.slice(0, s);
		},
		basename(e, t) {
			t !== void 0 && Y(t, "suffix"), Y(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (e.length >= 2 && qe(e.charCodeAt(0)) && e.charCodeAt(1) === Ue && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (s = e.length - 1; s >= n; --s) {
					const a = e.charCodeAt(s);
					if ($(a)) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else l === -1 && (i = !1, l = s + 1), o >= 0 && (a === t.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= n; --s) if ($(e.charCodeAt(s))) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			Y(e, "path");
			let t = 0, n = -1, r = 0, i = -1, s = !0, o = 0;
			e.length >= 2 && e.charCodeAt(1) === Ue && qe(e.charCodeAt(0)) && (t = r = 2);
			for (let l = e.length - 1; l >= t; --l) {
				const a = e.charCodeAt(l);
				if ($(a)) {
					if (!s) {
						r = l + 1;
						break;
					}
					continue;
				}
				i === -1 && (s = !1, i = l + 1), a === Be ? n === -1 ? n = l : o !== 1 && (o = 1) : n !== -1 && (o = -1);
			}
			return n === -1 || i === -1 || o === 0 || o === 1 && n === i - 1 && n === r + 1 ? "" : e.slice(n, i);
		},
		format: fi.bind(null, "\\"),
		parse(e) {
			Y(e, "path");
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
			if (n === 1) return $(i) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
			if ($(i)) {
				if (r = 1, $(e.charCodeAt(1))) {
					let f = 2, d = f;
					for (; f < n && !$(e.charCodeAt(f));) f++;
					if (f < n && f !== d) {
						for (d = f; f < n && $(e.charCodeAt(f));) f++;
						if (f < n && f !== d) {
							for (d = f; f < n && !$(e.charCodeAt(f));) f++;
							f === n ? r = f : f !== d && (r = f + 1);
						}
					}
				}
			} else if (qe(i) && e.charCodeAt(1) === Ue) {
				if (n <= 2) return t.root = t.dir = e, t;
				if (r = 2, $(e.charCodeAt(2))) {
					if (n === 3) return t.root = t.dir = e, t;
					r = 3;
				}
			}
			r > 0 && (t.root = e.slice(0, r));
			let s = -1, o = r, l = -1, a = !0, u = e.length - 1, h = 0;
			for (; u >= r; --u) {
				if (i = e.charCodeAt(u), $(i)) {
					if (!a) {
						o = u + 1;
						break;
					}
					continue;
				}
				l === -1 && (a = !1, l = u + 1), i === Be ? s === -1 ? s = u : h !== 1 && (h = 1) : s !== -1 && (h = -1);
			}
			return l !== -1 && (s === -1 || h === 0 || h === 1 && s === l - 1 && s === o + 1 ? t.base = t.name = e.slice(o, l) : (t.name = e.slice(o, s), t.base = e.slice(o, l), t.ext = e.slice(s, l))), o > 0 && o !== r ? t.dir = e.slice(0, o - 1) : t.dir = t.root, t;
		},
		sep: "\\",
		delimiter: ";",
		win32: null,
		posix: null
	}, Za = (() => {
		if (Fe) {
			const e = /\\/g;
			return () => {
				const t = Yt().replace(e, "/");
				return t.slice(t.indexOf("/"));
			};
		}
		return () => Yt();
	})(), ue = {
		resolve(...e) {
			let t = "", n = !1;
			for (let r = e.length - 1; r >= -1 && !n; r--) {
				const i = r >= 0 ? e[r] : Za();
				Y(i, `paths[${r}]`), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === oe);
			}
			return t = Zt(t, !n, "/", Jn), n ? `/${t}` : t.length > 0 ? t : ".";
		},
		normalize(e) {
			if (Y(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === oe, n = e.charCodeAt(e.length - 1) === oe;
			return e = Zt(e, !t, "/", Jn), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
		},
		isAbsolute(e) {
			return Y(e, "path"), e.length > 0 && e.charCodeAt(0) === oe;
		},
		join(...e) {
			if (e.length === 0) return ".";
			let t;
			for (let n = 0; n < e.length; ++n) {
				const r = e[n];
				Y(r, "path"), r.length > 0 && (t === void 0 ? t = r : t += `/${r}`);
			}
			return t === void 0 ? "." : ue.normalize(t);
		},
		relative(e, t) {
			if (Y(e, "from"), Y(t, "to"), e === t || (e = ue.resolve(e), t = ue.resolve(t), e === t)) return "";
			const n = 1, r = e.length, i = r - n, s = 1, o = t.length - s, l = i < o ? i : o;
			let a = -1, u = 0;
			for (; u < l; u++) {
				const f = e.charCodeAt(n + u);
				if (f !== t.charCodeAt(s + u)) break;
				f === oe && (a = u);
			}
			if (u === l) if (o > l) {
				if (t.charCodeAt(s + u) === oe) return t.slice(s + u + 1);
				if (u === 0) return t.slice(s + u);
			} else i > l && (e.charCodeAt(n + u) === oe ? a = u : u === 0 && (a = 0));
			let h = "";
			for (u = n + a + 1; u <= r; ++u) (u === r || e.charCodeAt(u) === oe) && (h += h.length === 0 ? ".." : "/..");
			return `${h}${t.slice(s + a)}`;
		},
		toNamespacedPath(e) {
			return e;
		},
		dirname(e) {
			if (Y(e, "path"), e.length === 0) return ".";
			const t = e.charCodeAt(0) === oe;
			let n = -1, r = !0;
			for (let i = e.length - 1; i >= 1; --i) if (e.charCodeAt(i) === oe) {
				if (!r) {
					n = i;
					break;
				}
			} else r = !1;
			return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
		},
		basename(e, t) {
			t !== void 0 && Y(t, "ext"), Y(e, "path");
			let n = 0, r = -1, i = !0, s;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t === e) return "";
				let o = t.length - 1, l = -1;
				for (s = e.length - 1; s >= 0; --s) {
					const a = e.charCodeAt(s);
					if (a === oe) {
						if (!i) {
							n = s + 1;
							break;
						}
					} else l === -1 && (i = !1, l = s + 1), o >= 0 && (a === t.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = l));
				}
				return n === r ? r = l : r === -1 && (r = e.length), e.slice(n, r);
			}
			for (s = e.length - 1; s >= 0; --s) if (e.charCodeAt(s) === oe) {
				if (!i) {
					n = s + 1;
					break;
				}
			} else r === -1 && (i = !1, r = s + 1);
			return r === -1 ? "" : e.slice(n, r);
		},
		extname(e) {
			Y(e, "path");
			let t = -1, n = 0, r = -1, i = !0, s = 0;
			for (let o = e.length - 1; o >= 0; --o) {
				const l = e.charCodeAt(o);
				if (l === oe) {
					if (!i) {
						n = o + 1;
						break;
					}
					continue;
				}
				r === -1 && (i = !1, r = o + 1), l === Be ? t === -1 ? t = o : s !== 1 && (s = 1) : t !== -1 && (s = -1);
			}
			return t === -1 || r === -1 || s === 0 || s === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
		},
		format: fi.bind(null, "/"),
		parse(e) {
			Y(e, "path");
			const t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			const n = e.charCodeAt(0) === oe;
			let r;
			n ? (t.root = "/", r = 1) : r = 0;
			let i = -1, s = 0, o = -1, l = !0, a = e.length - 1, u = 0;
			for (; a >= r; --a) {
				const h = e.charCodeAt(a);
				if (h === oe) {
					if (!l) {
						s = a + 1;
						break;
					}
					continue;
				}
				o === -1 && (l = !1, o = a + 1), h === Be ? i === -1 ? i = a : u !== 1 && (u = 1) : i !== -1 && (u = -1);
			}
			if (o !== -1) {
				const h = s === 0 && n ? 1 : s;
				i === -1 || u === 0 || u === 1 && i === o - 1 && i === s + 1 ? t.base = t.name = e.slice(h, o) : (t.name = e.slice(h, i), t.base = e.slice(h, o), t.ext = e.slice(i, o));
			}
			return s > 0 ? t.dir = e.slice(0, s - 1) : n && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	ue.win32 = le.win32 = le, ue.posix = le.posix = ue;
	Fe ? le.normalize : ue.normalize;
	const Ka = Fe ? le.join : ue.join;
	Fe ? le.resolve : ue.resolve;
	Fe ? le.relative : ue.relative;
	Fe ? le.dirname : ue.dirname;
	Fe ? le.basename : ue.basename;
	Fe ? le.extname : ue.extname;
	Fe ? le.sep : ue.sep;
	const el = /^\w[\w\d+.-]*$/, tl = /^\//, nl = /^\/\//;
	function rl(e, t) {
		if (!e.scheme && t) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);
		if (e.scheme && !el.test(e.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
		if (e.path) {
			if (e.authority) {
				if (!tl.test(e.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
			} else if (nl.test(e.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
		}
	}
	function il(e, t) {
		return !e && !t ? "file" : e;
	}
	function sl(e, t) {
		switch (e) {
			case "https":
			case "http":
			case "file":
				t ? t[0] !== Ne && (t = Ne + t) : t = Ne;
				break;
		}
		return t;
	}
	const z = "", Ne = "/", ol = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
	var Re = class Rn {
		static isUri(t) {
			return t instanceof Rn ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
		}
		constructor(t, n, r, i, s, o = !1) {
			typeof t == "object" ? (this.scheme = t.scheme || z, this.authority = t.authority || z, this.path = t.path || z, this.query = t.query || z, this.fragment = t.fragment || z) : (this.scheme = il(t, o), this.authority = n || z, this.path = sl(this.scheme, r || z), this.query = i || z, this.fragment = s || z, rl(this, o));
		}
		get fsPath() {
			return Xn(this, !1);
		}
		with(t) {
			if (!t) return this;
			let { scheme: n, authority: r, path: i, query: s, fragment: o } = t;
			return n === void 0 ? n = this.scheme : n === null && (n = z), r === void 0 ? r = this.authority : r === null && (r = z), i === void 0 ? i = this.path : i === null && (i = z), s === void 0 ? s = this.query : s === null && (s = z), o === void 0 ? o = this.fragment : o === null && (o = z), n === this.scheme && r === this.authority && i === this.path && s === this.query && o === this.fragment ? this : new it(n, r, i, s, o);
		}
		static parse(t, n = !1) {
			const r = ol.exec(t);
			return r ? new it(r[2] || z, Kt(r[4] || z), Kt(r[5] || z), Kt(r[7] || z), Kt(r[9] || z), n) : new it(z, z, z, z, z);
		}
		static file(t) {
			let n = z;
			if (xt && (t = t.replace(/\\/g, Ne)), t[0] === Ne && t[1] === Ne) {
				const r = t.indexOf(Ne, 2);
				r === -1 ? (n = t.substring(2), t = Ne) : (n = t.substring(2, r), t = t.substring(r) || Ne);
			}
			return new it("file", n, t, z, z);
		}
		static from(t, n) {
			return new it(t.scheme, t.authority, t.path, t.query, t.fragment, n);
		}
		static joinPath(t, ...n) {
			if (!t.path) throw new Error("[UriError]: cannot call joinPath on URI without path");
			let r;
			return xt && t.scheme === "file" ? r = Rn.file(le.join(Xn(t, !0), ...n)).path : r = ue.join(t.path, ...n), t.with({ path: r });
		}
		toString(t = !1) {
			return Qn(this, t);
		}
		toJSON() {
			return this;
		}
		static revive(t) {
			if (t) {
				if (t instanceof Rn) return t;
				{
					const n = new it(t);
					return n._formatted = t.external ?? null, n._fsPath = t._sep === hi ? t.fsPath ?? null : null, n;
				}
			} else return t;
		}
	};
	const hi = xt ? 1 : void 0;
	var it = class extends Re {
		constructor() {
			super(...arguments), this._formatted = null, this._fsPath = null;
		}
		get fsPath() {
			return this._fsPath || (this._fsPath = Xn(this, !1)), this._fsPath;
		}
		toString(e = !1) {
			return e ? Qn(this, !0) : (this._formatted || (this._formatted = Qn(this, !1)), this._formatted);
		}
		toJSON() {
			const e = { $mid: 1 };
			return this._fsPath && (e.fsPath = this._fsPath, e._sep = hi), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
		}
	};
	const mi = {
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
	function di(e, t, n) {
		let r, i = -1;
		for (let s = 0; s < e.length; s++) {
			const o = e.charCodeAt(s);
			if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || t && o === 47 || n && o === 91 || n && o === 93 || n && o === 58) i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r !== void 0 && (r += e.charAt(s));
			else {
				r === void 0 && (r = e.substr(0, s));
				const l = mi[o];
				l !== void 0 ? (i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r += l) : i === -1 && (i = s);
			}
		}
		return i !== -1 && (r += encodeURIComponent(e.substring(i))), r !== void 0 ? r : e;
	}
	function al(e) {
		let t;
		for (let n = 0; n < e.length; n++) {
			const r = e.charCodeAt(n);
			r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += mi[r]) : t !== void 0 && (t += e[n]);
		}
		return t !== void 0 ? t : e;
	}
	function Xn(e, t) {
		let n;
		return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, xt && (n = n.replace(/\//g, "\\")), n;
	}
	function Qn(e, t) {
		const n = t ? al : di;
		let r = "", { scheme: i, authority: s, path: o, query: l, fragment: a } = e;
		if (i && (r += i, r += ":"), (s || i === "file") && (r += Ne, r += Ne), s) {
			let u = s.indexOf("@");
			if (u !== -1) {
				const h = s.substr(0, u);
				s = s.substr(u + 1), u = h.lastIndexOf(":"), u === -1 ? r += n(h, !1, !1) : (r += n(h.substr(0, u), !1, !1), r += ":", r += n(h.substr(u + 1), !1, !0)), r += "@";
			}
			s = s.toLowerCase(), u = s.lastIndexOf(":"), u === -1 ? r += n(s, !1, !0) : (r += n(s.substr(0, u), !1, !0), r += s.substr(u));
		}
		if (o) {
			if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
				const u = o.charCodeAt(1);
				u >= 65 && u <= 90 && (o = `/${String.fromCharCode(u + 32)}:${o.substr(3)}`);
			} else if (o.length >= 2 && o.charCodeAt(1) === 58) {
				const u = o.charCodeAt(0);
				u >= 65 && u <= 90 && (o = `${String.fromCharCode(u + 32)}:${o.substr(2)}`);
			}
			r += n(o, !0, !1);
		}
		return l && (r += "?", r += n(l, !1, !1)), a && (r += "#", r += t ? a : di(a, !1, !1)), r;
	}
	function gi(e) {
		try {
			return decodeURIComponent(e);
		} catch {
			return e.length > 3 ? e.substr(0, 3) + gi(e.substr(3)) : e;
		}
	}
	const pi = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
	function Kt(e) {
		return e.match(pi) ? e.replace(pi, (t) => gi(t)) : e;
	}
	var je;
	(function(e) {
		e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatSesssion = "vscode-chat-editor", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output";
	})(je || (je = {}));
	var ll = class {
		constructor() {
			this._hosts = Object.create(null), this._ports = Object.create(null), this._connectionTokens = Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
		}
		setPreferredWebSchema(e) {
			this._preferredWebSchema = e;
		}
		get _remoteResourcesPath() {
			return ue.join(this._serverRootPath, je.vscodeRemoteResource);
		}
		rewrite(e) {
			if (this._delegate) try {
				return this._delegate(e);
			} catch (o) {
				return At(o), e;
			}
			const t = e.authority;
			let n = this._hosts[t];
			n && n.indexOf(":") !== -1 && n.indexOf("[") === -1 && (n = `[${n}]`);
			const r = this._ports[t], i = this._connectionTokens[t];
			let s = `path=${encodeURIComponent(e.path)}`;
			return typeof i == "string" && (s += `&tkn=${encodeURIComponent(i)}`), Re.from({
				scheme: Ra ? this._preferredWebSchema : je.vscodeRemoteResource,
				authority: `${n}:${r}`,
				path: this._remoteResourcesPath,
				query: s
			});
		}
	};
	const ul = new ll(), cl = "vscode-app";
	const bi = new class Xr {
		static {
			this.FALLBACK_AUTHORITY = cl;
		}
		asBrowserUri(t) {
			const n = this.toUri(t);
			return this.uriToBrowserUri(n);
		}
		uriToBrowserUri(t) {
			return t.scheme === je.vscodeRemote ? ul.rewrite(t) : t.scheme === je.file && (xa || Ea === `${je.vscodeFileResource}://${Xr.FALLBACK_AUTHORITY}`) ? t.with({
				scheme: je.vscodeFileResource,
				authority: t.authority || Xr.FALLBACK_AUTHORITY,
				query: null,
				fragment: null
			}) : t;
		}
		toUri(t, n) {
			if (Re.isUri(t)) return t;
			if (globalThis._VSCODE_FILE_ROOT) {
				const r = globalThis._VSCODE_FILE_ROOT;
				if (/^\w[\w\d+.-]*:\/\//.test(r)) return Re.joinPath(Re.parse(r, !0), t);
				const i = Ka(r, t);
				return Re.file(i);
			}
			return Re.parse(n.toUrl(t));
		}
	}();
	var yi;
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
			let o;
			typeof s == "string" ? o = new URL(s).searchParams : s instanceof URL ? o = s.searchParams : Re.isUri(s) && (o = new URL(s.toString(!0)).searchParams);
			const l = o?.get(n);
			if (l) return t.get(l);
		}
		e.getHeadersFromQuery = r;
		function i(s, o, l) {
			if (!globalThis.crossOriginIsolated) return;
			const a = o && l ? "3" : l ? "2" : "1";
			s instanceof URLSearchParams ? s.set(n, a) : s[n] = a;
		}
		e.addSearchParam = i;
	})(yi || (yi = {}));
	const Yn = "default", hl = "$initialize";
	var ml = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.method = r, this.args = i, this.type = 0;
		}
	}, vi = class {
		constructor(e, t, n, r) {
			this.vsWorker = e, this.seq = t, this.res = n, this.err = r, this.type = 1;
		}
	}, dl = class {
		constructor(e, t, n, r, i) {
			this.vsWorker = e, this.req = t, this.channel = n, this.eventName = r, this.arg = i, this.type = 2;
		}
	}, gl = class {
		constructor(e, t, n) {
			this.vsWorker = e, this.req = t, this.event = n, this.type = 3;
		}
	}, pl = class {
		constructor(e, t) {
			this.vsWorker = e, this.req = t, this.type = 4;
		}
	}, bl = class {
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
				}, this._send(new ml(this._workerId, r, e, t, n));
			});
		}
		listen(e, t, n) {
			let r = null;
			const i = new ve({
				onWillAddFirstListener: () => {
					r = String(++this._lastSentReq), this._pendingEmitters.set(r, i), this._send(new dl(this._workerId, r, e, t, n));
				},
				onDidRemoveLastListener: () => {
					this._pendingEmitters.delete(r), this._send(new pl(this._workerId, r)), r = null;
				}
			});
			return i.event;
		}
		handleMessage(e) {
			!e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
		}
		createProxyToRemoteChannel(e, t) {
			return new Proxy(Object.create(null), { get: (n, r) => (typeof r == "string" && !n[r] && (_i(r) ? n[r] = (i) => this.listen(e, r, i) : wi(r) ? n[r] = this.listen(e, r, void 0) : r.charCodeAt(0) === 36 && (n[r] = async (...i) => (await t?.(), this.sendMessage(e, r, i)))), n[r]) });
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
				this._send(new vi(this._workerId, t, n, void 0));
			}, (n) => {
				n.detail instanceof Error && (n.detail = ti(n.detail)), this._send(new vi(this._workerId, t, void 0, ti(n)));
			});
		}
		_handleSubscribeEventMessage(e) {
			const t = e.req, n = this._handler.handleEvent(e.channel, e.eventName, e.arg)((r) => {
				this._send(new gl(this._workerId, t, r));
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
	function wi(e) {
		return e[0] === "o" && e[1] === "n" && li(e.charCodeAt(2));
	}
	function _i(e) {
		return /^onDynamic/.test(e) && li(e.charCodeAt(9));
	}
	var yl = class {
		constructor(e, t) {
			this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = t, this._requestHandler = null, this._protocol = new bl({
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
			if (e === Yn && t === hl) return this.initialize(n[0], n[1], n[2]);
			const r = e === Yn ? this._requestHandler : this._localChannels.get(e);
			if (!r) return Promise.reject(/* @__PURE__ */ new Error(`Missing channel ${e} on worker thread`));
			if (typeof r[t] != "function") return Promise.reject(/* @__PURE__ */ new Error(`Missing method ${t} on worker thread channel ${e}`));
			try {
				return Promise.resolve(r[t].apply(r, n));
			} catch (i) {
				return Promise.reject(i);
			}
		}
		_handleEvent(e, t, n) {
			const r = e === Yn ? this._requestHandler : this._localChannels.get(e);
			if (!r) throw new Error(`Missing channel ${e} on worker thread`);
			if (_i(t)) {
				const i = r[t].call(r, n);
				if (typeof i != "function") throw new Error(`Missing dynamic event ${t} on request handler.`);
				return i;
			}
			if (wi(t)) {
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
			return t && (typeof t.baseUrl < "u" && delete t.baseUrl, typeof t.paths < "u" && typeof t.paths.vs < "u" && delete t.paths.vs, typeof t.trustedTypesPolicy < "u" && delete t.trustedTypesPolicy, t.catchError = !0, globalThis.require.config(t)), import(`${bi.asBrowserUri(`${n}.js`).toString(!0)}`).then((r) => {
				if (this._requestHandler = r.create(this), !this._requestHandler) throw new Error("No RequestHandler!");
			});
		}
	}, We = class {
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
	function Li(e, t) {
		return (t << 5) - t + e | 0;
	}
	function vl(e, t) {
		t = Li(149417, t);
		for (let n = 0, r = e.length; n < r; n++) t = Li(e.charCodeAt(n), t);
		return t;
	}
	function Zn(e, t, n = 32) {
		const r = n - t, i = ~((1 << r) - 1);
		return (e << t | (i & e) >>> r) >>> 0;
	}
	function Ni(e, t = 0, n = e.byteLength, r = 0) {
		for (let i = 0; i < n; i++) e[t + i] = r;
	}
	function wl(e, t, n = "0") {
		for (; e.length < t;) e = n + e;
		return e;
	}
	function Rt(e, t = 32) {
		return e instanceof ArrayBuffer ? Array.from(new Uint8Array(e)).map((n) => n.toString(16).padStart(2, "0")).join("") : wl((e >>> 0).toString(16), t / 4);
	}
	(class Go {
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
			let i = this._buffLen, s = this._leftoverHighSurrogate, o, l;
			for (s !== 0 ? (o = s, l = -1, s = 0) : (o = t.charCodeAt(0), l = 0);;) {
				let a = o;
				if (Qt(o)) if (l + 1 < n) {
					const u = t.charCodeAt(l + 1);
					Wn(u) ? (l++, a = ui(o, u)) : a = 65533;
				} else {
					s = o;
					break;
				}
				else Wn(o) && (a = 65533);
				if (i = this._push(r, i, a), l++, l < n) o = t.charCodeAt(l);
				else break;
			}
			this._buffLen = i, this._leftoverHighSurrogate = s;
		}
		_push(t, n, r) {
			return r < 128 ? t[n++] = r : r < 2048 ? (t[n++] = 192 | (r & 1984) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : r < 65536 ? (t[n++] = 224 | (r & 61440) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0) : (t[n++] = 240 | (r & 1835008) >>> 18, t[n++] = 128 | (r & 258048) >>> 12, t[n++] = 128 | (r & 4032) >>> 6, t[n++] = 128 | (r & 63) >>> 0), n >= 64 && (this._step(), n -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), n;
		}
		digest() {
			return this._finished || (this._finished = !0, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), Rt(this._h0) + Rt(this._h1) + Rt(this._h2) + Rt(this._h3) + Rt(this._h4);
		}
		_wrapUp() {
			this._buff[this._buffLen++] = 128, Ni(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), Ni(this._buff));
			const t = 8 * this._totalLen;
			this._buffDV.setUint32(56, Math.floor(t / 4294967296), !1), this._buffDV.setUint32(60, t % 4294967296, !1), this._step();
		}
		_step() {
			const t = Go._bigBlock32, n = this._buffDV;
			for (let f = 0; f < 64; f += 4) t.setUint32(f, n.getUint32(f, !1), !1);
			for (let f = 64; f < 320; f += 4) t.setUint32(f, Zn(t.getUint32(f - 12, !1) ^ t.getUint32(f - 32, !1) ^ t.getUint32(f - 56, !1) ^ t.getUint32(f - 64, !1), 1), !1);
			let r = this._h0, i = this._h1, s = this._h2, o = this._h3, l = this._h4, a, u, h;
			for (let f = 0; f < 80; f++) f < 20 ? (a = i & s | ~i & o, u = 1518500249) : f < 40 ? (a = i ^ s ^ o, u = 1859775393) : f < 60 ? (a = i & s | i & o | s & o, u = 2400959708) : (a = i ^ s ^ o, u = 3395469782), h = Zn(r, 5) + a + l + u + t.getUint32(f * 4, !1) & 4294967295, l = o, o = s, s = Zn(i, 30), i = r, r = h;
			this._h0 = this._h0 + r & 4294967295, this._h1 = this._h1 + i & 4294967295, this._h2 = this._h2 + s & 4294967295, this._h3 = this._h3 + o & 4294967295, this._h4 = this._h4 + l & 4294967295;
		}
	});
	var Si = class {
		constructor(e) {
			this.source = e;
		}
		getElements() {
			const e = this.source, t = new Int32Array(e.length);
			for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
			return t;
		}
	};
	function _l(e, t, n) {
		return new ki(new Si(e), new Si(t)).ComputeDiff(n).changes;
	}
	var st = class {
		static Assert(e, t) {
			if (!e) throw new Error(t);
		}
	}, ot = class {
		static Copy(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
		static Copy2(e, t, n, r, i) {
			for (let s = 0; s < i; s++) n[r + s] = e[t + s];
		}
	}, Ai = class {
		constructor() {
			this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
		}
		MarkNextChange() {
			(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new We(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
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
	}, ki = class _t {
		constructor(t, n, r = null) {
			this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
			const [i, s, o] = _t._getElements(t), [l, a, u] = _t._getElements(n);
			this._hasStrings = o && u, this._originalStringElements = i, this._originalElementsOrHash = s, this._modifiedStringElements = l, this._modifiedElementsOrHash = a, this.m_forwardHistory = [], this.m_reverseHistory = [];
		}
		static _isStringArray(t) {
			return t.length > 0 && typeof t[0] == "string";
		}
		static _getElements(t) {
			const n = t.getElements();
			if (_t._isStringArray(n)) {
				const r = new Int32Array(n.length);
				for (let i = 0, s = n.length; i < s; i++) r[i] = vl(n[i], 0);
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
			return this.ElementsAreEqual(t, n) ? _t._getStrictElement(this._originalSequence, t) === _t._getStrictElement(this._modifiedSequence, n) : !1;
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
			const o = [!1];
			let l = this.ComputeDiffRecursive(t, n, r, i, o);
			return s && (l = this.PrettifyChanges(l)), {
				quitEarly: o[0],
				changes: l
			};
		}
		ComputeDiffRecursive(t, n, r, i, s) {
			for (s[0] = !1; t <= n && r <= i && this.ElementsAreEqual(t, r);) t++, r++;
			for (; n >= t && i >= r && this.ElementsAreEqual(n, i);) n--, i--;
			if (t > n || r > i) {
				let f;
				return r <= i ? (st.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), f = [new We(t, 0, r, i - r + 1)]) : t <= n ? (st.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), f = [new We(t, n - t + 1, r, 0)]) : (st.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), st.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), f = []), f;
			}
			const o = [0], l = [0], a = this.ComputeRecursionPoint(t, n, r, i, o, l, s), u = o[0], h = l[0];
			if (a !== null) return a;
			if (!s[0]) {
				const f = this.ComputeDiffRecursive(t, u, r, h, s);
				let d = [];
				return s[0] ? d = [new We(u + 1, n - (u + 1) + 1, h + 1, i - (h + 1) + 1)] : d = this.ComputeDiffRecursive(u + 1, n, h + 1, i, s), this.ConcatenateChanges(f, d);
			}
			return [new We(t, n - t + 1, r, i - r + 1)];
		}
		WALKTRACE(t, n, r, i, s, o, l, a, u, h, f, d, m, g, p, w, _, N) {
			let v = null, y = null, b = new Ai(), L = n, S = r, T = m[0] - w[0] - i, F = -1073741824, D = this.m_forwardHistory.length - 1;
			do {
				const M = T + t;
				M === L || M < S && u[M - 1] < u[M + 1] ? (f = u[M + 1], g = f - T - i, f < F && b.MarkNextChange(), F = f, b.AddModifiedElement(f + 1, g), T = M + 1 - t) : (f = u[M - 1] + 1, g = f - T - i, f < F && b.MarkNextChange(), F = f - 1, b.AddOriginalElement(f, g + 1), T = M - 1 - t), D >= 0 && (u = this.m_forwardHistory[D], t = u[0], L = 1, S = u.length - 1);
			} while (--D >= -1);
			if (v = b.getReverseChanges(), N[0]) {
				let M = m[0] + 1, k = w[0] + 1;
				if (v !== null && v.length > 0) {
					const R = v[v.length - 1];
					M = Math.max(M, R.getOriginalEnd()), k = Math.max(k, R.getModifiedEnd());
				}
				y = [new We(M, d - M + 1, k, p - k + 1)];
			} else {
				b = new Ai(), L = o, S = l, T = m[0] - w[0] - a, F = 1073741824, D = _ ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
				do {
					const M = T + s;
					M === L || M < S && h[M - 1] >= h[M + 1] ? (f = h[M + 1] - 1, g = f - T - a, f > F && b.MarkNextChange(), F = f + 1, b.AddOriginalElement(f + 1, g + 1), T = M + 1 - s) : (f = h[M - 1], g = f - T - a, f > F && b.MarkNextChange(), F = f, b.AddModifiedElement(f + 1, g + 1), T = M - 1 - s), D >= 0 && (h = this.m_reverseHistory[D], s = h[0], L = 1, S = h.length - 1);
				} while (--D >= -1);
				y = b.getChanges();
			}
			return this.ConcatenateChanges(v, y);
		}
		ComputeRecursionPoint(t, n, r, i, s, o, l) {
			let a = 0, u = 0, h = 0, f = 0, d = 0, m = 0;
			t--, r--, s[0] = 0, o[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
			const g = n - t + (i - r), p = g + 1, w = new Int32Array(p), _ = new Int32Array(p), N = i - r, v = n - t, y = t - r, b = n - i, L = (v - N) % 2 === 0;
			w[N] = t, _[v] = n, l[0] = !1;
			for (let S = 1; S <= g / 2 + 1; S++) {
				let T = 0, F = 0;
				h = this.ClipDiagonalBound(N - S, S, N, p), f = this.ClipDiagonalBound(N + S, S, N, p);
				for (let M = h; M <= f; M += 2) {
					M === h || M < f && w[M - 1] < w[M + 1] ? a = w[M + 1] : a = w[M - 1] + 1, u = a - (M - N) - y;
					const k = a;
					for (; a < n && u < i && this.ElementsAreEqual(a + 1, u + 1);) a++, u++;
					if (w[M] = a, a + u > T + F && (T = a, F = u), !L && Math.abs(M - v) <= S - 1 && a >= _[M]) return s[0] = a, o[0] = u, k <= _[M] && S <= 1448 ? this.WALKTRACE(N, h, f, y, v, d, m, b, w, _, a, n, s, u, i, o, L, l) : null;
				}
				const D = (T - t + (F - r) - S) / 2;
				if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(T, D)) return l[0] = !0, s[0] = T, o[0] = F, D > 0 && S <= 1448 ? this.WALKTRACE(N, h, f, y, v, d, m, b, w, _, a, n, s, u, i, o, L, l) : (t++, r++, [new We(t, n - t + 1, r, i - r + 1)]);
				d = this.ClipDiagonalBound(v - S, S, v, p), m = this.ClipDiagonalBound(v + S, S, v, p);
				for (let M = d; M <= m; M += 2) {
					M === d || M < m && _[M - 1] >= _[M + 1] ? a = _[M + 1] - 1 : a = _[M - 1], u = a - (M - v) - b;
					const k = a;
					for (; a > t && u > r && this.ElementsAreEqual(a, u);) a--, u--;
					if (_[M] = a, L && Math.abs(M - N) <= S && a <= w[M]) return s[0] = a, o[0] = u, k >= w[M] && S <= 1448 ? this.WALKTRACE(N, h, f, y, v, d, m, b, w, _, a, n, s, u, i, o, L, l) : null;
				}
				if (S <= 1447) {
					let M = new Int32Array(f - h + 2);
					M[0] = N - h + 1, ot.Copy2(w, h, M, 1, f - h + 1), this.m_forwardHistory.push(M), M = new Int32Array(m - d + 2), M[0] = v - d + 1, ot.Copy2(_, d, M, 1, m - d + 1), this.m_reverseHistory.push(M);
				}
			}
			return this.WALKTRACE(N, h, f, y, v, d, m, b, w, _, a, n, s, u, i, o, L, l);
		}
		PrettifyChanges(t) {
			for (let n = 0; n < t.length; n++) {
				const r = t[n], i = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, s = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, o = r.originalLength > 0, l = r.modifiedLength > 0;
				for (; r.originalStart + r.originalLength < i && r.modifiedStart + r.modifiedLength < s && (!o || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!l || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength));) {
					const u = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
					if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !u) break;
					r.originalStart++, r.modifiedStart++;
				}
				const a = [null];
				if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], a)) {
					t[n] = a[0], t.splice(n + 1, 1), n--;
					continue;
				}
			}
			for (let n = t.length - 1; n >= 0; n--) {
				const r = t[n];
				let i = 0, s = 0;
				if (n > 0) {
					const f = t[n - 1];
					i = f.originalStart + f.originalLength, s = f.modifiedStart + f.modifiedLength;
				}
				const o = r.originalLength > 0, l = r.modifiedLength > 0;
				let a = 0, u = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
				for (let f = 1;; f++) {
					const d = r.originalStart - f, m = r.modifiedStart - f;
					if (d < i || m < s || o && !this.OriginalElementsAreEqual(d, d + r.originalLength) || l && !this.ModifiedElementsAreEqual(m, m + r.modifiedLength)) break;
					const g = (d === i && m === s ? 5 : 0) + this._boundaryScore(d, r.originalLength, m, r.modifiedLength);
					g > u && (u = g, a = f);
				}
				r.originalStart -= a, r.modifiedStart -= a;
				const h = [null];
				if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
					t[n - 1] = h[0], t.splice(n, 1), n++;
					continue;
				}
			}
			if (this._hasStrings) for (let n = 1, r = t.length; n < r; n++) {
				const i = t[n - 1], s = t[n], o = s.originalStart - i.originalStart - i.originalLength, l = i.originalStart, a = s.originalStart + s.originalLength, u = a - l, h = i.modifiedStart, f = s.modifiedStart + s.modifiedLength, d = f - h;
				if (o < 5 && u < 20 && d < 20) {
					const m = this._findBetterContiguousSequence(l, u, h, d, o);
					if (m) {
						const [g, p] = m;
						(g !== i.originalStart + i.originalLength || p !== i.modifiedStart + i.modifiedLength) && (i.originalLength = g - i.originalStart, i.modifiedLength = p - i.modifiedStart, s.originalStart = g + o, s.modifiedStart = p + o, s.originalLength = a - s.originalStart, s.modifiedLength = f - s.modifiedStart);
					}
				}
			}
			return t;
		}
		_findBetterContiguousSequence(t, n, r, i, s) {
			if (n < s || i < s) return null;
			const o = t + n - s + 1, l = r + i - s + 1;
			let a = 0, u = 0, h = 0;
			for (let f = t; f < o; f++) for (let d = r; d < l; d++) {
				const m = this._contiguousSequenceScore(f, d, s);
				m > 0 && m > a && (a = m, u = f, h = d);
			}
			return a > 0 ? [u, h] : null;
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
				return ot.Copy(t, 0, i, 0, t.length - 1), i[t.length - 1] = r[0], ot.Copy(n, 1, i, t.length, n.length - 1), i;
			} else {
				const i = new Array(t.length + n.length);
				return ot.Copy(t, 0, i, 0, t.length), ot.Copy(n, 0, i, t.length, n.length), i;
			}
		}
		ChangesOverlap(t, n, r) {
			if (st.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), st.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
				const i = t.originalStart;
				let s = t.originalLength;
				const o = t.modifiedStart;
				let l = t.modifiedLength;
				return t.originalStart + t.originalLength >= n.originalStart && (s = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new We(i, s, o, l), !0;
			} else return r[0] = null, !1;
		}
		ClipDiagonalBound(t, n, r, i) {
			if (t >= 0 && t < i) return t;
			const s = r, o = i - r - 1, l = n % 2 === 0;
			return t < 0 ? l === (s % 2 === 0) ? 0 : 1 : l === (o % 2 === 0) ? i - 1 : i - 2;
		}
	}, Z = class nt {
		constructor(t, n) {
			this.lineNumber = t, this.column = n;
		}
		with(t = this.lineNumber, n = this.column) {
			return t === this.lineNumber && n === this.column ? this : new nt(t, n);
		}
		delta(t = 0, n = 0) {
			return this.with(this.lineNumber + t, this.column + n);
		}
		equals(t) {
			return nt.equals(this, t);
		}
		static equals(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
		}
		isBefore(t) {
			return nt.isBefore(this, t);
		}
		static isBefore(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
		}
		isBeforeOrEqual(t) {
			return nt.isBeforeOrEqual(this, t);
		}
		static isBeforeOrEqual(t, n) {
			return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
		}
		static compare(t, n) {
			const r = t.lineNumber | 0, i = n.lineNumber | 0;
			return r === i ? (t.column | 0) - (n.column | 0) : r - i;
		}
		clone() {
			return new nt(this.lineNumber, this.column);
		}
		toString() {
			return "(" + this.lineNumber + "," + this.column + ")";
		}
		static lift(t) {
			return new nt(t.lineNumber, t.column);
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
	}, W = class te {
		constructor(t, n, r, i) {
			t > r || t === r && n > i ? (this.startLineNumber = r, this.startColumn = i, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = i);
		}
		isEmpty() {
			return te.isEmpty(this);
		}
		static isEmpty(t) {
			return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
		}
		containsPosition(t) {
			return te.containsPosition(this, t);
		}
		static containsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
		}
		static strictContainsPosition(t, n) {
			return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
		}
		containsRange(t) {
			return te.containsRange(this, t);
		}
		static containsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
		}
		strictContainsRange(t) {
			return te.strictContainsRange(this, t);
		}
		static strictContainsRange(t, n) {
			return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
		}
		plusRange(t) {
			return te.plusRange(this, t);
		}
		static plusRange(t, n) {
			let r, i, s, o;
			return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, i = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, i = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, i = t.startColumn), n.endLineNumber > t.endLineNumber ? (s = n.endLineNumber, o = n.endColumn) : n.endLineNumber === t.endLineNumber ? (s = n.endLineNumber, o = Math.max(n.endColumn, t.endColumn)) : (s = t.endLineNumber, o = t.endColumn), new te(r, i, s, o);
		}
		intersectRanges(t) {
			return te.intersectRanges(this, t);
		}
		static intersectRanges(t, n) {
			let r = t.startLineNumber, i = t.startColumn, s = t.endLineNumber, o = t.endColumn;
			const l = n.startLineNumber, a = n.startColumn, u = n.endLineNumber, h = n.endColumn;
			return r < l ? (r = l, i = a) : r === l && (i = Math.max(i, a)), s > u ? (s = u, o = h) : s === u && (o = Math.min(o, h)), r > s || r === s && i > o ? null : new te(r, i, s, o);
		}
		equalsRange(t) {
			return te.equalsRange(this, t);
		}
		static equalsRange(t, n) {
			return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
		}
		getEndPosition() {
			return te.getEndPosition(this);
		}
		static getEndPosition(t) {
			return new Z(t.endLineNumber, t.endColumn);
		}
		getStartPosition() {
			return te.getStartPosition(this);
		}
		static getStartPosition(t) {
			return new Z(t.startLineNumber, t.startColumn);
		}
		toString() {
			return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
		}
		setEndPosition(t, n) {
			return new te(this.startLineNumber, this.startColumn, t, n);
		}
		setStartPosition(t, n) {
			return new te(t, n, this.endLineNumber, this.endColumn);
		}
		collapseToStart() {
			return te.collapseToStart(this);
		}
		static collapseToStart(t) {
			return new te(t.startLineNumber, t.startColumn, t.startLineNumber, t.startColumn);
		}
		collapseToEnd() {
			return te.collapseToEnd(this);
		}
		static collapseToEnd(t) {
			return new te(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
		}
		delta(t) {
			return new te(this.startLineNumber + t, this.startColumn, this.endLineNumber + t, this.endColumn);
		}
		static fromPositions(t, n = t) {
			return new te(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static lift(t) {
			return t ? new te(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : null;
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
					const s = t.startColumn | 0, o = n.startColumn | 0;
					if (s === o) {
						const l = t.endLineNumber | 0, a = n.endLineNumber | 0;
						return l === a ? (t.endColumn | 0) - (n.endColumn | 0) : l - a;
					}
					return s - o;
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
	function xi(e) {
		return e < 0 ? 0 : e > 255 ? 255 : e | 0;
	}
	function at(e) {
		return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
	}
	var Ll = class Jo {
		constructor(t) {
			const n = xi(t);
			this._defaultValue = n, this._asciiMap = Jo._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
		}
		static _createAsciiMap(t) {
			const n = new Uint8Array(256);
			return n.fill(t), n;
		}
		set(t, n) {
			const r = xi(n);
			t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
		}
		get(t) {
			return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
		}
		clear() {
			this._asciiMap.fill(this._defaultValue), this._map.clear();
		}
	}, Nl = class {
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
	}, Sl = class {
		constructor(e) {
			let t = 0, n = 0;
			for (let i = 0, s = e.length; i < s; i++) {
				const [o, l, a] = e[i];
				l > t && (t = l), o > n && (n = o), a > n && (n = a);
			}
			t++, n++;
			const r = new Nl(n, t, 0);
			for (let i = 0, s = e.length; i < s; i++) {
				const [o, l, a] = e[i];
				r.set(o, l, a);
			}
			this._states = r, this._maxCharCode = t;
		}
		nextState(e, t) {
			return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
		}
	};
	let Kn = null;
	function Al() {
		return Kn === null && (Kn = new Sl([
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
		])), Kn;
	}
	let Et = null;
	function kl() {
		if (Et === null) {
			Et = new Ll(0);
			const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
			for (let n = 0; n < 35; n++) Et.set(e.charCodeAt(n), 1);
			const t = ".,;:";
			for (let n = 0; n < 4; n++) Et.set(t.charCodeAt(n), 2);
		}
		return Et;
	}
	var xl = class Qr {
		static _createLink(t, n, r, i, s) {
			let o = s - 1;
			do {
				const l = n.charCodeAt(o);
				if (t.get(l) !== 2) break;
				o--;
			} while (o > i);
			if (i > 0) {
				const l = n.charCodeAt(i - 1), a = n.charCodeAt(o);
				(l === 40 && a === 41 || l === 91 && a === 93 || l === 123 && a === 125) && o--;
			}
			return {
				range: {
					startLineNumber: r,
					startColumn: i + 1,
					endLineNumber: r,
					endColumn: o + 2
				},
				url: n.substring(i, o + 1)
			};
		}
		static computeLinks(t, n = Al()) {
			const r = kl(), i = [];
			for (let s = 1, o = t.getLineCount(); s <= o; s++) {
				const l = t.getLineContent(s), a = l.length;
				let u = 0, h = 0, f = 0, d = 1, m = !1, g = !1, p = !1, w = !1;
				for (; u < a;) {
					let _ = !1;
					const N = l.charCodeAt(u);
					if (d === 13) {
						let v;
						switch (N) {
							case 40:
								m = !0, v = 0;
								break;
							case 41:
								v = m ? 0 : 1;
								break;
							case 91:
								p = !0, g = !0, v = 0;
								break;
							case 93:
								p = !1, v = g ? 0 : 1;
								break;
							case 123:
								w = !0, v = 0;
								break;
							case 125:
								v = w ? 0 : 1;
								break;
							case 39:
							case 34:
							case 96:
								f === N ? v = 1 : f === 39 || f === 34 || f === 96 ? v = 0 : v = 1;
								break;
							case 42:
								v = f === 42 ? 1 : 0;
								break;
							case 124:
								v = f === 124 ? 1 : 0;
								break;
							case 32:
								v = p ? 0 : 1;
								break;
							default: v = r.get(N);
						}
						v === 1 && (i.push(Qr._createLink(r, l, s, h, u)), _ = !0);
					} else if (d === 12) {
						let v;
						N === 91 ? (g = !0, v = 0) : v = r.get(N), v === 1 ? _ = !0 : d = 13;
					} else d = n.nextState(d, N), d === 0 && (_ = !0);
					_ && (d = 1, m = !1, g = !1, w = !1, h = u + 1, f = N), u++;
				}
				d === 13 && i.push(Qr._createLink(r, l, s, h, a));
			}
			return i;
		}
	};
	function Rl(e) {
		return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : xl.computeLinks(e);
	}
	var El = class Xo {
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
			this.INSTANCE = new Xo();
		}
		navigateValueSet(t, n, r, i, s) {
			if (t && n) {
				const o = this.doNavigateValueSet(n, s);
				if (o) return {
					range: t,
					value: o
				};
			}
			if (r && i) {
				const o = this.doNavigateValueSet(i, s);
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
			let i = Number(t);
			const s = parseFloat(t);
			return !isNaN(i) && !isNaN(s) && i === s ? i === 0 && !n ? null : (i = Math.floor(i * r), i += n ? r : -r, String(i / r)) : null;
		}
		textReplace(t, n) {
			return this.valueSetsReplace(this._defaultValueSet, t, n);
		}
		valueSetsReplace(t, n, r) {
			let i = null;
			for (let s = 0, o = t.length; i === null && s < o; s++) i = this.valueSetReplace(t[s], n, r);
			return i;
		}
		valueSetReplace(t, n, r) {
			let i = t.indexOf(n);
			return i >= 0 ? (i += r ? 1 : -1, i < 0 ? i = t.length - 1 : i %= t.length, t[i]) : null;
		}
	};
	const Ri = Object.freeze(function(e, t) {
		const n = setTimeout(e.bind(t), 0);
		return { dispose() {
			clearTimeout(n);
		} };
	});
	var en;
	(function(e) {
		function t(n) {
			return n === e.None || n === e.Cancelled || n instanceof tn ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
		}
		e.isCancellationToken = t, e.None = Object.freeze({
			isCancellationRequested: !1,
			onCancellationRequested: Xt.None
		}), e.Cancelled = Object.freeze({
			isCancellationRequested: !0,
			onCancellationRequested: Ri
		});
	})(en || (en = {}));
	var tn = class {
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
			return this._isCancelled ? Ri : (this._emitter || (this._emitter = new ve()), this._emitter.event);
		}
		dispose() {
			this._emitter && (this._emitter.dispose(), this._emitter = null);
		}
	}, Ml = class {
		constructor(e) {
			this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
		}
		get token() {
			return this._token || (this._token = new tn()), this._token;
		}
		cancel() {
			this._token ? this._token instanceof tn && this._token.cancel() : this._token = en.Cancelled;
		}
		dispose(e = !1) {
			e && this.cancel(), this._parentListener?.dispose(), this._token ? this._token instanceof tn && this._token.dispose() : this._token = en.None;
		}
	}, er = class {
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
	const nn = new er(), tr = new er(), nr = new er(), Cl = new Array(230), Tl = {}, Pl = [], Il = Object.create(null), Fl = Object.create(null), Ei = [], rr = [];
	for (let e = 0; e <= 193; e++) Ei[e] = -1;
	for (let e = 0; e <= 132; e++) rr[e] = -1;
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
			const [s, o, l, a, u, h, f, d, m] = i;
			if (r[o] || (r[o] = !0, Pl[o] = l, Il[l] = o, Fl[l.toLowerCase()] = o, s && (Ei[o] = a, a !== 0 && a !== 3 && a !== 5 && a !== 4 && a !== 6 && a !== 57 && (rr[a] = o))), !n[a]) {
				if (n[a] = !0, !u) throw new Error(`String representation missing for key code ${a} around scan code ${l}`);
				nn.define(a, u), tr.define(a, d || u), nr.define(a, m || d || u);
			}
			h && (Cl[h] = a), f && (Tl[f] = a);
		}
		rr[3] = 46;
	})();
	var Mi;
	(function(e) {
		function t(l) {
			return nn.keyCodeToStr(l);
		}
		e.toString = t;
		function n(l) {
			return nn.strToKeyCode(l);
		}
		e.fromString = n;
		function r(l) {
			return tr.keyCodeToStr(l);
		}
		e.toUserSettingsUS = r;
		function i(l) {
			return nr.keyCodeToStr(l);
		}
		e.toUserSettingsGeneral = i;
		function s(l) {
			return tr.strToKeyCode(l) || nr.strToKeyCode(l);
		}
		e.fromUserSettings = s;
		function o(l) {
			if (l >= 98 && l <= 113) return null;
			switch (l) {
				case 16: return "Up";
				case 18: return "Down";
				case 15: return "Left";
				case 17: return "Right";
			}
			return nn.keyCodeToStr(l);
		}
		e.toElectronAccelerator = o;
	})(Mi || (Mi = {}));
	function Vl(e, t) {
		return (e | (t & 65535) << 16 >>> 0) >>> 0;
	}
	var Dl = class _e extends W {
		constructor(t, n, r, i) {
			super(t, n, r, i), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = i;
		}
		toString() {
			return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
		}
		equalsSelection(t) {
			return _e.selectionsEqual(this, t);
		}
		static selectionsEqual(t, n) {
			return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
		}
		getDirection() {
			return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
		}
		setEndPosition(t, n) {
			return this.getDirection() === 0 ? new _e(this.startLineNumber, this.startColumn, t, n) : new _e(t, n, this.startLineNumber, this.startColumn);
		}
		getPosition() {
			return new Z(this.positionLineNumber, this.positionColumn);
		}
		getSelectionStart() {
			return new Z(this.selectionStartLineNumber, this.selectionStartColumn);
		}
		setStartPosition(t, n) {
			return this.getDirection() === 0 ? new _e(t, n, this.endLineNumber, this.endColumn) : new _e(this.endLineNumber, this.endColumn, t, n);
		}
		static fromPositions(t, n = t) {
			return new _e(t.lineNumber, t.column, n.lineNumber, n.column);
		}
		static fromRange(t, n) {
			return n === 0 ? new _e(t.startLineNumber, t.startColumn, t.endLineNumber, t.endColumn) : new _e(t.endLineNumber, t.endColumn, t.startLineNumber, t.startColumn);
		}
		static liftSelection(t) {
			return new _e(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
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
			return s === 0 ? new _e(t, n, r, i) : new _e(r, i, t, n);
		}
	};
	function Ol(e) {
		return typeof e == "string";
	}
	const Ci = Object.create(null);
	function c(e, t) {
		if (Ol(t)) {
			const n = Ci[t];
			if (n === void 0) throw new Error(`${e} references an unknown codicon: ${t}`);
			t = n;
		}
		return Ci[e] = t, { id: e };
	}
	const $l = {
		add: c("add", 6e4),
		plus: c("plus", 6e4),
		gistNew: c("gist-new", 6e4),
		repoCreate: c("repo-create", 6e4),
		lightbulb: c("lightbulb", 60001),
		lightBulb: c("light-bulb", 60001),
		repo: c("repo", 60002),
		repoDelete: c("repo-delete", 60002),
		gistFork: c("gist-fork", 60003),
		repoForked: c("repo-forked", 60003),
		gitPullRequest: c("git-pull-request", 60004),
		gitPullRequestAbandoned: c("git-pull-request-abandoned", 60004),
		recordKeys: c("record-keys", 60005),
		keyboard: c("keyboard", 60005),
		tag: c("tag", 60006),
		gitPullRequestLabel: c("git-pull-request-label", 60006),
		tagAdd: c("tag-add", 60006),
		tagRemove: c("tag-remove", 60006),
		person: c("person", 60007),
		personFollow: c("person-follow", 60007),
		personOutline: c("person-outline", 60007),
		personFilled: c("person-filled", 60007),
		gitBranch: c("git-branch", 60008),
		gitBranchCreate: c("git-branch-create", 60008),
		gitBranchDelete: c("git-branch-delete", 60008),
		sourceControl: c("source-control", 60008),
		mirror: c("mirror", 60009),
		mirrorPublic: c("mirror-public", 60009),
		star: c("star", 60010),
		starAdd: c("star-add", 60010),
		starDelete: c("star-delete", 60010),
		starEmpty: c("star-empty", 60010),
		comment: c("comment", 60011),
		commentAdd: c("comment-add", 60011),
		alert: c("alert", 60012),
		warning: c("warning", 60012),
		search: c("search", 60013),
		searchSave: c("search-save", 60013),
		logOut: c("log-out", 60014),
		signOut: c("sign-out", 60014),
		logIn: c("log-in", 60015),
		signIn: c("sign-in", 60015),
		eye: c("eye", 60016),
		eyeUnwatch: c("eye-unwatch", 60016),
		eyeWatch: c("eye-watch", 60016),
		circleFilled: c("circle-filled", 60017),
		primitiveDot: c("primitive-dot", 60017),
		closeDirty: c("close-dirty", 60017),
		debugBreakpoint: c("debug-breakpoint", 60017),
		debugBreakpointDisabled: c("debug-breakpoint-disabled", 60017),
		debugHint: c("debug-hint", 60017),
		terminalDecorationSuccess: c("terminal-decoration-success", 60017),
		primitiveSquare: c("primitive-square", 60018),
		edit: c("edit", 60019),
		pencil: c("pencil", 60019),
		info: c("info", 60020),
		issueOpened: c("issue-opened", 60020),
		gistPrivate: c("gist-private", 60021),
		gitForkPrivate: c("git-fork-private", 60021),
		lock: c("lock", 60021),
		mirrorPrivate: c("mirror-private", 60021),
		close: c("close", 60022),
		removeClose: c("remove-close", 60022),
		x: c("x", 60022),
		repoSync: c("repo-sync", 60023),
		sync: c("sync", 60023),
		clone: c("clone", 60024),
		desktopDownload: c("desktop-download", 60024),
		beaker: c("beaker", 60025),
		microscope: c("microscope", 60025),
		vm: c("vm", 60026),
		deviceDesktop: c("device-desktop", 60026),
		file: c("file", 60027),
		fileText: c("file-text", 60027),
		more: c("more", 60028),
		ellipsis: c("ellipsis", 60028),
		kebabHorizontal: c("kebab-horizontal", 60028),
		mailReply: c("mail-reply", 60029),
		reply: c("reply", 60029),
		organization: c("organization", 60030),
		organizationFilled: c("organization-filled", 60030),
		organizationOutline: c("organization-outline", 60030),
		newFile: c("new-file", 60031),
		fileAdd: c("file-add", 60031),
		newFolder: c("new-folder", 60032),
		fileDirectoryCreate: c("file-directory-create", 60032),
		trash: c("trash", 60033),
		trashcan: c("trashcan", 60033),
		history: c("history", 60034),
		clock: c("clock", 60034),
		folder: c("folder", 60035),
		fileDirectory: c("file-directory", 60035),
		symbolFolder: c("symbol-folder", 60035),
		logoGithub: c("logo-github", 60036),
		markGithub: c("mark-github", 60036),
		github: c("github", 60036),
		terminal: c("terminal", 60037),
		console: c("console", 60037),
		repl: c("repl", 60037),
		zap: c("zap", 60038),
		symbolEvent: c("symbol-event", 60038),
		error: c("error", 60039),
		stop: c("stop", 60039),
		variable: c("variable", 60040),
		symbolVariable: c("symbol-variable", 60040),
		array: c("array", 60042),
		symbolArray: c("symbol-array", 60042),
		symbolModule: c("symbol-module", 60043),
		symbolPackage: c("symbol-package", 60043),
		symbolNamespace: c("symbol-namespace", 60043),
		symbolObject: c("symbol-object", 60043),
		symbolMethod: c("symbol-method", 60044),
		symbolFunction: c("symbol-function", 60044),
		symbolConstructor: c("symbol-constructor", 60044),
		symbolBoolean: c("symbol-boolean", 60047),
		symbolNull: c("symbol-null", 60047),
		symbolNumeric: c("symbol-numeric", 60048),
		symbolNumber: c("symbol-number", 60048),
		symbolStructure: c("symbol-structure", 60049),
		symbolStruct: c("symbol-struct", 60049),
		symbolParameter: c("symbol-parameter", 60050),
		symbolTypeParameter: c("symbol-type-parameter", 60050),
		symbolKey: c("symbol-key", 60051),
		symbolText: c("symbol-text", 60051),
		symbolReference: c("symbol-reference", 60052),
		goToFile: c("go-to-file", 60052),
		symbolEnum: c("symbol-enum", 60053),
		symbolValue: c("symbol-value", 60053),
		symbolRuler: c("symbol-ruler", 60054),
		symbolUnit: c("symbol-unit", 60054),
		activateBreakpoints: c("activate-breakpoints", 60055),
		archive: c("archive", 60056),
		arrowBoth: c("arrow-both", 60057),
		arrowDown: c("arrow-down", 60058),
		arrowLeft: c("arrow-left", 60059),
		arrowRight: c("arrow-right", 60060),
		arrowSmallDown: c("arrow-small-down", 60061),
		arrowSmallLeft: c("arrow-small-left", 60062),
		arrowSmallRight: c("arrow-small-right", 60063),
		arrowSmallUp: c("arrow-small-up", 60064),
		arrowUp: c("arrow-up", 60065),
		bell: c("bell", 60066),
		bold: c("bold", 60067),
		book: c("book", 60068),
		bookmark: c("bookmark", 60069),
		debugBreakpointConditionalUnverified: c("debug-breakpoint-conditional-unverified", 60070),
		debugBreakpointConditional: c("debug-breakpoint-conditional", 60071),
		debugBreakpointConditionalDisabled: c("debug-breakpoint-conditional-disabled", 60071),
		debugBreakpointDataUnverified: c("debug-breakpoint-data-unverified", 60072),
		debugBreakpointData: c("debug-breakpoint-data", 60073),
		debugBreakpointDataDisabled: c("debug-breakpoint-data-disabled", 60073),
		debugBreakpointLogUnverified: c("debug-breakpoint-log-unverified", 60074),
		debugBreakpointLog: c("debug-breakpoint-log", 60075),
		debugBreakpointLogDisabled: c("debug-breakpoint-log-disabled", 60075),
		briefcase: c("briefcase", 60076),
		broadcast: c("broadcast", 60077),
		browser: c("browser", 60078),
		bug: c("bug", 60079),
		calendar: c("calendar", 60080),
		caseSensitive: c("case-sensitive", 60081),
		check: c("check", 60082),
		checklist: c("checklist", 60083),
		chevronDown: c("chevron-down", 60084),
		chevronLeft: c("chevron-left", 60085),
		chevronRight: c("chevron-right", 60086),
		chevronUp: c("chevron-up", 60087),
		chromeClose: c("chrome-close", 60088),
		chromeMaximize: c("chrome-maximize", 60089),
		chromeMinimize: c("chrome-minimize", 60090),
		chromeRestore: c("chrome-restore", 60091),
		circleOutline: c("circle-outline", 60092),
		circle: c("circle", 60092),
		debugBreakpointUnverified: c("debug-breakpoint-unverified", 60092),
		terminalDecorationIncomplete: c("terminal-decoration-incomplete", 60092),
		circleSlash: c("circle-slash", 60093),
		circuitBoard: c("circuit-board", 60094),
		clearAll: c("clear-all", 60095),
		clippy: c("clippy", 60096),
		closeAll: c("close-all", 60097),
		cloudDownload: c("cloud-download", 60098),
		cloudUpload: c("cloud-upload", 60099),
		code: c("code", 60100),
		collapseAll: c("collapse-all", 60101),
		colorMode: c("color-mode", 60102),
		commentDiscussion: c("comment-discussion", 60103),
		creditCard: c("credit-card", 60105),
		dash: c("dash", 60108),
		dashboard: c("dashboard", 60109),
		database: c("database", 60110),
		debugContinue: c("debug-continue", 60111),
		debugDisconnect: c("debug-disconnect", 60112),
		debugPause: c("debug-pause", 60113),
		debugRestart: c("debug-restart", 60114),
		debugStart: c("debug-start", 60115),
		debugStepInto: c("debug-step-into", 60116),
		debugStepOut: c("debug-step-out", 60117),
		debugStepOver: c("debug-step-over", 60118),
		debugStop: c("debug-stop", 60119),
		debug: c("debug", 60120),
		deviceCameraVideo: c("device-camera-video", 60121),
		deviceCamera: c("device-camera", 60122),
		deviceMobile: c("device-mobile", 60123),
		diffAdded: c("diff-added", 60124),
		diffIgnored: c("diff-ignored", 60125),
		diffModified: c("diff-modified", 60126),
		diffRemoved: c("diff-removed", 60127),
		diffRenamed: c("diff-renamed", 60128),
		diff: c("diff", 60129),
		diffSidebyside: c("diff-sidebyside", 60129),
		discard: c("discard", 60130),
		editorLayout: c("editor-layout", 60131),
		emptyWindow: c("empty-window", 60132),
		exclude: c("exclude", 60133),
		extensions: c("extensions", 60134),
		eyeClosed: c("eye-closed", 60135),
		fileBinary: c("file-binary", 60136),
		fileCode: c("file-code", 60137),
		fileMedia: c("file-media", 60138),
		filePdf: c("file-pdf", 60139),
		fileSubmodule: c("file-submodule", 60140),
		fileSymlinkDirectory: c("file-symlink-directory", 60141),
		fileSymlinkFile: c("file-symlink-file", 60142),
		fileZip: c("file-zip", 60143),
		files: c("files", 60144),
		filter: c("filter", 60145),
		flame: c("flame", 60146),
		foldDown: c("fold-down", 60147),
		foldUp: c("fold-up", 60148),
		fold: c("fold", 60149),
		folderActive: c("folder-active", 60150),
		folderOpened: c("folder-opened", 60151),
		gear: c("gear", 60152),
		gift: c("gift", 60153),
		gistSecret: c("gist-secret", 60154),
		gist: c("gist", 60155),
		gitCommit: c("git-commit", 60156),
		gitCompare: c("git-compare", 60157),
		compareChanges: c("compare-changes", 60157),
		gitMerge: c("git-merge", 60158),
		githubAction: c("github-action", 60159),
		githubAlt: c("github-alt", 60160),
		globe: c("globe", 60161),
		grabber: c("grabber", 60162),
		graph: c("graph", 60163),
		gripper: c("gripper", 60164),
		heart: c("heart", 60165),
		home: c("home", 60166),
		horizontalRule: c("horizontal-rule", 60167),
		hubot: c("hubot", 60168),
		inbox: c("inbox", 60169),
		issueReopened: c("issue-reopened", 60171),
		issues: c("issues", 60172),
		italic: c("italic", 60173),
		jersey: c("jersey", 60174),
		json: c("json", 60175),
		kebabVertical: c("kebab-vertical", 60176),
		key: c("key", 60177),
		law: c("law", 60178),
		lightbulbAutofix: c("lightbulb-autofix", 60179),
		linkExternal: c("link-external", 60180),
		link: c("link", 60181),
		listOrdered: c("list-ordered", 60182),
		listUnordered: c("list-unordered", 60183),
		liveShare: c("live-share", 60184),
		loading: c("loading", 60185),
		location: c("location", 60186),
		mailRead: c("mail-read", 60187),
		mail: c("mail", 60188),
		markdown: c("markdown", 60189),
		megaphone: c("megaphone", 60190),
		mention: c("mention", 60191),
		milestone: c("milestone", 60192),
		gitPullRequestMilestone: c("git-pull-request-milestone", 60192),
		mortarBoard: c("mortar-board", 60193),
		move: c("move", 60194),
		multipleWindows: c("multiple-windows", 60195),
		mute: c("mute", 60196),
		noNewline: c("no-newline", 60197),
		note: c("note", 60198),
		octoface: c("octoface", 60199),
		openPreview: c("open-preview", 60200),
		package: c("package", 60201),
		paintcan: c("paintcan", 60202),
		pin: c("pin", 60203),
		play: c("play", 60204),
		run: c("run", 60204),
		plug: c("plug", 60205),
		preserveCase: c("preserve-case", 60206),
		preview: c("preview", 60207),
		project: c("project", 60208),
		pulse: c("pulse", 60209),
		question: c("question", 60210),
		quote: c("quote", 60211),
		radioTower: c("radio-tower", 60212),
		reactions: c("reactions", 60213),
		references: c("references", 60214),
		refresh: c("refresh", 60215),
		regex: c("regex", 60216),
		remoteExplorer: c("remote-explorer", 60217),
		remote: c("remote", 60218),
		remove: c("remove", 60219),
		replaceAll: c("replace-all", 60220),
		replace: c("replace", 60221),
		repoClone: c("repo-clone", 60222),
		repoForcePush: c("repo-force-push", 60223),
		repoPull: c("repo-pull", 60224),
		repoPush: c("repo-push", 60225),
		report: c("report", 60226),
		requestChanges: c("request-changes", 60227),
		rocket: c("rocket", 60228),
		rootFolderOpened: c("root-folder-opened", 60229),
		rootFolder: c("root-folder", 60230),
		rss: c("rss", 60231),
		ruby: c("ruby", 60232),
		saveAll: c("save-all", 60233),
		saveAs: c("save-as", 60234),
		save: c("save", 60235),
		screenFull: c("screen-full", 60236),
		screenNormal: c("screen-normal", 60237),
		searchStop: c("search-stop", 60238),
		server: c("server", 60240),
		settingsGear: c("settings-gear", 60241),
		settings: c("settings", 60242),
		shield: c("shield", 60243),
		smiley: c("smiley", 60244),
		sortPrecedence: c("sort-precedence", 60245),
		splitHorizontal: c("split-horizontal", 60246),
		splitVertical: c("split-vertical", 60247),
		squirrel: c("squirrel", 60248),
		starFull: c("star-full", 60249),
		starHalf: c("star-half", 60250),
		symbolClass: c("symbol-class", 60251),
		symbolColor: c("symbol-color", 60252),
		symbolConstant: c("symbol-constant", 60253),
		symbolEnumMember: c("symbol-enum-member", 60254),
		symbolField: c("symbol-field", 60255),
		symbolFile: c("symbol-file", 60256),
		symbolInterface: c("symbol-interface", 60257),
		symbolKeyword: c("symbol-keyword", 60258),
		symbolMisc: c("symbol-misc", 60259),
		symbolOperator: c("symbol-operator", 60260),
		symbolProperty: c("symbol-property", 60261),
		wrench: c("wrench", 60261),
		wrenchSubaction: c("wrench-subaction", 60261),
		symbolSnippet: c("symbol-snippet", 60262),
		tasklist: c("tasklist", 60263),
		telescope: c("telescope", 60264),
		textSize: c("text-size", 60265),
		threeBars: c("three-bars", 60266),
		thumbsdown: c("thumbsdown", 60267),
		thumbsup: c("thumbsup", 60268),
		tools: c("tools", 60269),
		triangleDown: c("triangle-down", 60270),
		triangleLeft: c("triangle-left", 60271),
		triangleRight: c("triangle-right", 60272),
		triangleUp: c("triangle-up", 60273),
		twitter: c("twitter", 60274),
		unfold: c("unfold", 60275),
		unlock: c("unlock", 60276),
		unmute: c("unmute", 60277),
		unverified: c("unverified", 60278),
		verified: c("verified", 60279),
		versions: c("versions", 60280),
		vmActive: c("vm-active", 60281),
		vmOutline: c("vm-outline", 60282),
		vmRunning: c("vm-running", 60283),
		watch: c("watch", 60284),
		whitespace: c("whitespace", 60285),
		wholeWord: c("whole-word", 60286),
		window: c("window", 60287),
		wordWrap: c("word-wrap", 60288),
		zoomIn: c("zoom-in", 60289),
		zoomOut: c("zoom-out", 60290),
		listFilter: c("list-filter", 60291),
		listFlat: c("list-flat", 60292),
		listSelection: c("list-selection", 60293),
		selection: c("selection", 60293),
		listTree: c("list-tree", 60294),
		debugBreakpointFunctionUnverified: c("debug-breakpoint-function-unverified", 60295),
		debugBreakpointFunction: c("debug-breakpoint-function", 60296),
		debugBreakpointFunctionDisabled: c("debug-breakpoint-function-disabled", 60296),
		debugStackframeActive: c("debug-stackframe-active", 60297),
		circleSmallFilled: c("circle-small-filled", 60298),
		debugStackframeDot: c("debug-stackframe-dot", 60298),
		terminalDecorationMark: c("terminal-decoration-mark", 60298),
		debugStackframe: c("debug-stackframe", 60299),
		debugStackframeFocused: c("debug-stackframe-focused", 60299),
		debugBreakpointUnsupported: c("debug-breakpoint-unsupported", 60300),
		symbolString: c("symbol-string", 60301),
		debugReverseContinue: c("debug-reverse-continue", 60302),
		debugStepBack: c("debug-step-back", 60303),
		debugRestartFrame: c("debug-restart-frame", 60304),
		debugAlt: c("debug-alt", 60305),
		callIncoming: c("call-incoming", 60306),
		callOutgoing: c("call-outgoing", 60307),
		menu: c("menu", 60308),
		expandAll: c("expand-all", 60309),
		feedback: c("feedback", 60310),
		gitPullRequestReviewer: c("git-pull-request-reviewer", 60310),
		groupByRefType: c("group-by-ref-type", 60311),
		ungroupByRefType: c("ungroup-by-ref-type", 60312),
		account: c("account", 60313),
		gitPullRequestAssignee: c("git-pull-request-assignee", 60313),
		bellDot: c("bell-dot", 60314),
		debugConsole: c("debug-console", 60315),
		library: c("library", 60316),
		output: c("output", 60317),
		runAll: c("run-all", 60318),
		syncIgnored: c("sync-ignored", 60319),
		pinned: c("pinned", 60320),
		githubInverted: c("github-inverted", 60321),
		serverProcess: c("server-process", 60322),
		serverEnvironment: c("server-environment", 60323),
		pass: c("pass", 60324),
		issueClosed: c("issue-closed", 60324),
		stopCircle: c("stop-circle", 60325),
		playCircle: c("play-circle", 60326),
		record: c("record", 60327),
		debugAltSmall: c("debug-alt-small", 60328),
		vmConnect: c("vm-connect", 60329),
		cloud: c("cloud", 60330),
		merge: c("merge", 60331),
		export: c("export", 60332),
		graphLeft: c("graph-left", 60333),
		magnet: c("magnet", 60334),
		notebook: c("notebook", 60335),
		redo: c("redo", 60336),
		checkAll: c("check-all", 60337),
		pinnedDirty: c("pinned-dirty", 60338),
		passFilled: c("pass-filled", 60339),
		circleLargeFilled: c("circle-large-filled", 60340),
		circleLarge: c("circle-large", 60341),
		circleLargeOutline: c("circle-large-outline", 60341),
		combine: c("combine", 60342),
		gather: c("gather", 60342),
		table: c("table", 60343),
		variableGroup: c("variable-group", 60344),
		typeHierarchy: c("type-hierarchy", 60345),
		typeHierarchySub: c("type-hierarchy-sub", 60346),
		typeHierarchySuper: c("type-hierarchy-super", 60347),
		gitPullRequestCreate: c("git-pull-request-create", 60348),
		runAbove: c("run-above", 60349),
		runBelow: c("run-below", 60350),
		notebookTemplate: c("notebook-template", 60351),
		debugRerun: c("debug-rerun", 60352),
		workspaceTrusted: c("workspace-trusted", 60353),
		workspaceUntrusted: c("workspace-untrusted", 60354),
		workspaceUnknown: c("workspace-unknown", 60355),
		terminalCmd: c("terminal-cmd", 60356),
		terminalDebian: c("terminal-debian", 60357),
		terminalLinux: c("terminal-linux", 60358),
		terminalPowershell: c("terminal-powershell", 60359),
		terminalTmux: c("terminal-tmux", 60360),
		terminalUbuntu: c("terminal-ubuntu", 60361),
		terminalBash: c("terminal-bash", 60362),
		arrowSwap: c("arrow-swap", 60363),
		copy: c("copy", 60364),
		personAdd: c("person-add", 60365),
		filterFilled: c("filter-filled", 60366),
		wand: c("wand", 60367),
		debugLineByLine: c("debug-line-by-line", 60368),
		inspect: c("inspect", 60369),
		layers: c("layers", 60370),
		layersDot: c("layers-dot", 60371),
		layersActive: c("layers-active", 60372),
		compass: c("compass", 60373),
		compassDot: c("compass-dot", 60374),
		compassActive: c("compass-active", 60375),
		azure: c("azure", 60376),
		issueDraft: c("issue-draft", 60377),
		gitPullRequestClosed: c("git-pull-request-closed", 60378),
		gitPullRequestDraft: c("git-pull-request-draft", 60379),
		debugAll: c("debug-all", 60380),
		debugCoverage: c("debug-coverage", 60381),
		runErrors: c("run-errors", 60382),
		folderLibrary: c("folder-library", 60383),
		debugContinueSmall: c("debug-continue-small", 60384),
		beakerStop: c("beaker-stop", 60385),
		graphLine: c("graph-line", 60386),
		graphScatter: c("graph-scatter", 60387),
		pieChart: c("pie-chart", 60388),
		bracket: c("bracket", 60175),
		bracketDot: c("bracket-dot", 60389),
		bracketError: c("bracket-error", 60390),
		lockSmall: c("lock-small", 60391),
		azureDevops: c("azure-devops", 60392),
		verifiedFilled: c("verified-filled", 60393),
		newline: c("newline", 60394),
		layout: c("layout", 60395),
		layoutActivitybarLeft: c("layout-activitybar-left", 60396),
		layoutActivitybarRight: c("layout-activitybar-right", 60397),
		layoutPanelLeft: c("layout-panel-left", 60398),
		layoutPanelCenter: c("layout-panel-center", 60399),
		layoutPanelJustify: c("layout-panel-justify", 60400),
		layoutPanelRight: c("layout-panel-right", 60401),
		layoutPanel: c("layout-panel", 60402),
		layoutSidebarLeft: c("layout-sidebar-left", 60403),
		layoutSidebarRight: c("layout-sidebar-right", 60404),
		layoutStatusbar: c("layout-statusbar", 60405),
		layoutMenubar: c("layout-menubar", 60406),
		layoutCentered: c("layout-centered", 60407),
		target: c("target", 60408),
		indent: c("indent", 60409),
		recordSmall: c("record-small", 60410),
		errorSmall: c("error-small", 60411),
		terminalDecorationError: c("terminal-decoration-error", 60411),
		arrowCircleDown: c("arrow-circle-down", 60412),
		arrowCircleLeft: c("arrow-circle-left", 60413),
		arrowCircleRight: c("arrow-circle-right", 60414),
		arrowCircleUp: c("arrow-circle-up", 60415),
		layoutSidebarRightOff: c("layout-sidebar-right-off", 60416),
		layoutPanelOff: c("layout-panel-off", 60417),
		layoutSidebarLeftOff: c("layout-sidebar-left-off", 60418),
		blank: c("blank", 60419),
		heartFilled: c("heart-filled", 60420),
		map: c("map", 60421),
		mapHorizontal: c("map-horizontal", 60421),
		foldHorizontal: c("fold-horizontal", 60421),
		mapFilled: c("map-filled", 60422),
		mapHorizontalFilled: c("map-horizontal-filled", 60422),
		foldHorizontalFilled: c("fold-horizontal-filled", 60422),
		circleSmall: c("circle-small", 60423),
		bellSlash: c("bell-slash", 60424),
		bellSlashDot: c("bell-slash-dot", 60425),
		commentUnresolved: c("comment-unresolved", 60426),
		gitPullRequestGoToChanges: c("git-pull-request-go-to-changes", 60427),
		gitPullRequestNewChanges: c("git-pull-request-new-changes", 60428),
		searchFuzzy: c("search-fuzzy", 60429),
		commentDraft: c("comment-draft", 60430),
		send: c("send", 60431),
		sparkle: c("sparkle", 60432),
		insert: c("insert", 60433),
		mic: c("mic", 60434),
		thumbsdownFilled: c("thumbsdown-filled", 60435),
		thumbsupFilled: c("thumbsup-filled", 60436),
		coffee: c("coffee", 60437),
		snake: c("snake", 60438),
		game: c("game", 60439),
		vr: c("vr", 60440),
		chip: c("chip", 60441),
		piano: c("piano", 60442),
		music: c("music", 60443),
		micFilled: c("mic-filled", 60444),
		repoFetch: c("repo-fetch", 60445),
		copilot: c("copilot", 60446),
		lightbulbSparkle: c("lightbulb-sparkle", 60447),
		robot: c("robot", 60448),
		sparkleFilled: c("sparkle-filled", 60449),
		diffSingle: c("diff-single", 60450),
		diffMultiple: c("diff-multiple", 60451),
		surroundWith: c("surround-with", 60452),
		share: c("share", 60453),
		gitStash: c("git-stash", 60454),
		gitStashApply: c("git-stash-apply", 60455),
		gitStashPop: c("git-stash-pop", 60456),
		vscode: c("vscode", 60457),
		vscodeInsiders: c("vscode-insiders", 60458),
		codeOss: c("code-oss", 60459),
		runCoverage: c("run-coverage", 60460),
		runAllCoverage: c("run-all-coverage", 60461),
		coverage: c("coverage", 60462),
		githubProject: c("github-project", 60463),
		mapVertical: c("map-vertical", 60464),
		foldVertical: c("fold-vertical", 60464),
		mapVerticalFilled: c("map-vertical-filled", 60465),
		foldVerticalFilled: c("fold-vertical-filled", 60465),
		goToSearch: c("go-to-search", 60466),
		percentage: c("percentage", 60467),
		sortPercentage: c("sort-percentage", 60467),
		attach: c("attach", 60468)
	}, Bl = {
		dialogError: c("dialog-error", "error"),
		dialogWarning: c("dialog-warning", "warning"),
		dialogInfo: c("dialog-info", "info"),
		dialogClose: c("dialog-close", "close"),
		treeItemExpanded: c("tree-item-expanded", "chevron-down"),
		treeFilterOnTypeOn: c("tree-filter-on-type-on", "list-filter"),
		treeFilterOnTypeOff: c("tree-filter-on-type-off", "list-selection"),
		treeFilterClear: c("tree-filter-clear", "close"),
		treeItemLoading: c("tree-item-loading", "loading"),
		menuSelection: c("menu-selection", "check"),
		menuSubmenu: c("menu-submenu", "chevron-right"),
		menuBarMore: c("menubar-more", "more"),
		scrollbarButtonLeft: c("scrollbar-button-left", "triangle-left"),
		scrollbarButtonRight: c("scrollbar-button-right", "triangle-right"),
		scrollbarButtonUp: c("scrollbar-button-up", "triangle-up"),
		scrollbarButtonDown: c("scrollbar-button-down", "triangle-down"),
		toolBarMore: c("toolbar-more", "more"),
		quickInputBack: c("quick-input-back", "arrow-left"),
		dropDownButton: c("drop-down-button", 60084),
		symbolCustomColor: c("symbol-customcolor", 60252),
		exportIcon: c("export", 60332),
		workspaceUnspecified: c("workspace-unspecified", 60355),
		newLine: c("newline", 60394),
		thumbsDownFilled: c("thumbsdown-filled", 60435),
		thumbsUpFilled: c("thumbsup-filled", 60436),
		gitFetch: c("git-fetch", 60445),
		lightbulbSparkleAutofix: c("lightbulb-sparkle-autofix", 60447),
		debugBreakpointPending: c("debug-breakpoint-pending", 60377)
	}, V = {
		...$l,
		...Bl
	};
	var Ti = class {
		constructor() {
			this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new ve(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
		}
		handleChange(e) {
			this._onDidChange.fire({
				changedLanguages: e,
				changedColorMap: !1
			});
		}
		register(e, t) {
			return this._tokenizationSupports.set(e, t), this.handleChange([e]), Gt(() => {
				this._tokenizationSupports.get(e) === t && (this._tokenizationSupports.delete(e), this.handleChange([e]));
			});
		}
		get(e) {
			return this._tokenizationSupports.get(e) || null;
		}
		registerFactory(e, t) {
			this._factories.get(e)?.dispose();
			const n = new Ul(this, e, t);
			return this._factories.set(e, n), Gt(() => {
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
	}, Ul = class extends Jt {
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
	}, ql = class {
		constructor(e, t, n) {
			this.offset = e, this.type = t, this.language = n, this._tokenBrand = void 0;
		}
		toString() {
			return "(" + this.offset + ", " + this.type + ")";
		}
	}, Pi;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(Pi || (Pi = {}));
	var Ii;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, V.symbolMethod), t.set(1, V.symbolFunction), t.set(2, V.symbolConstructor), t.set(3, V.symbolField), t.set(4, V.symbolVariable), t.set(5, V.symbolClass), t.set(6, V.symbolStruct), t.set(7, V.symbolInterface), t.set(8, V.symbolModule), t.set(9, V.symbolProperty), t.set(10, V.symbolEvent), t.set(11, V.symbolOperator), t.set(12, V.symbolUnit), t.set(13, V.symbolValue), t.set(15, V.symbolEnum), t.set(14, V.symbolConstant), t.set(15, V.symbolEnum), t.set(16, V.symbolEnumMember), t.set(17, V.symbolKeyword), t.set(27, V.symbolSnippet), t.set(18, V.symbolText), t.set(19, V.symbolColor), t.set(20, V.symbolFile), t.set(21, V.symbolReference), t.set(22, V.symbolCustomColor), t.set(23, V.symbolFolder), t.set(24, V.symbolTypeParameter), t.set(25, V.account), t.set(26, V.issues);
		function n(s) {
			let o = t.get(s);
			return o || (console.info("No codicon found for CompletionItemKind " + s), o = V.symbolProperty), o;
		}
		e.toIcon = n;
		const r = /* @__PURE__ */ new Map();
		r.set("method", 0), r.set("function", 1), r.set("constructor", 2), r.set("field", 3), r.set("variable", 4), r.set("class", 5), r.set("struct", 6), r.set("interface", 7), r.set("module", 8), r.set("property", 9), r.set("event", 10), r.set("operator", 11), r.set("unit", 12), r.set("value", 13), r.set("constant", 14), r.set("enum", 15), r.set("enum-member", 16), r.set("enumMember", 16), r.set("keyword", 17), r.set("snippet", 27), r.set("text", 18), r.set("color", 19), r.set("file", 20), r.set("reference", 21), r.set("customcolor", 22), r.set("folder", 23), r.set("type-parameter", 24), r.set("typeParameter", 24), r.set("account", 25), r.set("issue", 26);
		function i(s, o) {
			let l = r.get(s);
			return typeof l > "u" && !o && (l = 9), l;
		}
		e.fromString = i;
	})(Ii || (Ii = {}));
	var Fi;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(Fi || (Fi = {}));
	var Vi;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
	})(Vi || (Vi = {}));
	var Di;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(Di || (Di = {}));
	var Oi;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(Oi || (Oi = {}));
	G("Array", "array"), G("Boolean", "boolean"), G("Class", "class"), G("Constant", "constant"), G("Constructor", "constructor"), G("Enum", "enumeration"), G("EnumMember", "enumeration member"), G("Event", "event"), G("Field", "field"), G("File", "file"), G("Function", "function"), G("Interface", "interface"), G("Key", "key"), G("Method", "method"), G("Module", "module"), G("Namespace", "namespace"), G("Null", "null"), G("Number", "number"), G("Object", "object"), G("Operator", "operator"), G("Package", "package"), G("Property", "property"), G("String", "string"), G("Struct", "struct"), G("TypeParameter", "type parameter"), G("Variable", "variable");
	var $i;
	(function(e) {
		const t = /* @__PURE__ */ new Map();
		t.set(0, V.symbolFile), t.set(1, V.symbolModule), t.set(2, V.symbolNamespace), t.set(3, V.symbolPackage), t.set(4, V.symbolClass), t.set(5, V.symbolMethod), t.set(6, V.symbolProperty), t.set(7, V.symbolField), t.set(8, V.symbolConstructor), t.set(9, V.symbolEnum), t.set(10, V.symbolInterface), t.set(11, V.symbolFunction), t.set(12, V.symbolVariable), t.set(13, V.symbolConstant), t.set(14, V.symbolString), t.set(15, V.symbolNumber), t.set(16, V.symbolBoolean), t.set(17, V.symbolArray), t.set(18, V.symbolObject), t.set(19, V.symbolKey), t.set(20, V.symbolNull), t.set(21, V.symbolEnumMember), t.set(22, V.symbolStruct), t.set(23, V.symbolEvent), t.set(24, V.symbolOperator), t.set(25, V.symbolTypeParameter);
		function n(r) {
			let i = t.get(r);
			return i || (console.info("No codicon found for SymbolKind " + r), i = V.symbolProperty), i;
		}
		e.toIcon = n;
	})($i || ($i = {}));
	(class Xe {
		static {
			this.Comment = new Xe("comment");
		}
		static {
			this.Imports = new Xe("imports");
		}
		static {
			this.Region = new Xe("region");
		}
		static fromValue(t) {
			switch (t) {
				case "comment": return Xe.Comment;
				case "imports": return Xe.Imports;
				case "region": return Xe.Region;
			}
			return new Xe(t);
		}
		constructor(t) {
			this.value = t;
		}
	});
	var Bi;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(Bi || (Bi = {}));
	var Ui;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Ui || (Ui = {}));
	var qi;
	(function(e) {
		function t(n) {
			return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
		}
		e.is = t;
	})(qi || (qi = {}));
	var ji;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(ji || (ji = {}));
	new Ti();
	new Ti();
	var Wi;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(Wi || (Wi = {}));
	var Hi;
	(function(e) {
		e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
	})(Hi || (Hi = {}));
	var zi;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
	})(zi || (zi = {}));
	var Gi;
	(function(e) {
		e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
	})(Gi || (Gi = {}));
	var Ji;
	(function(e) {
		e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
	})(Ji || (Ji = {}));
	var Xi;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Xi || (Xi = {}));
	var Qi;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
	})(Qi || (Qi = {}));
	var Yi;
	(function(e) {
		e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
	})(Yi || (Yi = {}));
	var Zi;
	(function(e) {
		e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
	})(Zi || (Zi = {}));
	var Ki;
	(function(e) {
		e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(Ki || (Ki = {}));
	var es;
	(function(e) {
		e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
	})(es || (es = {}));
	var ts;
	(function(e) {
		e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
	})(ts || (ts = {}));
	var ns;
	(function(e) {
		e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.emptySelectionClipboard = 37] = "emptySelectionClipboard", e[e.experimentalWhitespaceRendering = 38] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 39] = "extraEditorClassName", e[e.fastScrollSensitivity = 40] = "fastScrollSensitivity", e[e.find = 41] = "find", e[e.fixedOverflowWidgets = 42] = "fixedOverflowWidgets", e[e.folding = 43] = "folding", e[e.foldingStrategy = 44] = "foldingStrategy", e[e.foldingHighlight = 45] = "foldingHighlight", e[e.foldingImportsByDefault = 46] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 47] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 48] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 49] = "fontFamily", e[e.fontInfo = 50] = "fontInfo", e[e.fontLigatures = 51] = "fontLigatures", e[e.fontSize = 52] = "fontSize", e[e.fontWeight = 53] = "fontWeight", e[e.fontVariations = 54] = "fontVariations", e[e.formatOnPaste = 55] = "formatOnPaste", e[e.formatOnType = 56] = "formatOnType", e[e.glyphMargin = 57] = "glyphMargin", e[e.gotoLocation = 58] = "gotoLocation", e[e.hideCursorInOverviewRuler = 59] = "hideCursorInOverviewRuler", e[e.hover = 60] = "hover", e[e.inDiffEditor = 61] = "inDiffEditor", e[e.inlineSuggest = 62] = "inlineSuggest", e[e.inlineEdit = 63] = "inlineEdit", e[e.letterSpacing = 64] = "letterSpacing", e[e.lightbulb = 65] = "lightbulb", e[e.lineDecorationsWidth = 66] = "lineDecorationsWidth", e[e.lineHeight = 67] = "lineHeight", e[e.lineNumbers = 68] = "lineNumbers", e[e.lineNumbersMinChars = 69] = "lineNumbersMinChars", e[e.linkedEditing = 70] = "linkedEditing", e[e.links = 71] = "links", e[e.matchBrackets = 72] = "matchBrackets", e[e.minimap = 73] = "minimap", e[e.mouseStyle = 74] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 75] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 76] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 77] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 78] = "multiCursorModifier", e[e.multiCursorPaste = 79] = "multiCursorPaste", e[e.multiCursorLimit = 80] = "multiCursorLimit", e[e.occurrencesHighlight = 81] = "occurrencesHighlight", e[e.overviewRulerBorder = 82] = "overviewRulerBorder", e[e.overviewRulerLanes = 83] = "overviewRulerLanes", e[e.padding = 84] = "padding", e[e.pasteAs = 85] = "pasteAs", e[e.parameterHints = 86] = "parameterHints", e[e.peekWidgetDefaultFocus = 87] = "peekWidgetDefaultFocus", e[e.placeholder = 88] = "placeholder", e[e.definitionLinkOpensInPeek = 89] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 90] = "quickSuggestions", e[e.quickSuggestionsDelay = 91] = "quickSuggestionsDelay", e[e.readOnly = 92] = "readOnly", e[e.readOnlyMessage = 93] = "readOnlyMessage", e[e.renameOnType = 94] = "renameOnType", e[e.renderControlCharacters = 95] = "renderControlCharacters", e[e.renderFinalNewline = 96] = "renderFinalNewline", e[e.renderLineHighlight = 97] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 98] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 99] = "renderValidationDecorations", e[e.renderWhitespace = 100] = "renderWhitespace", e[e.revealHorizontalRightPadding = 101] = "revealHorizontalRightPadding", e[e.roundedSelection = 102] = "roundedSelection", e[e.rulers = 103] = "rulers", e[e.scrollbar = 104] = "scrollbar", e[e.scrollBeyondLastColumn = 105] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 106] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 107] = "scrollPredominantAxis", e[e.selectionClipboard = 108] = "selectionClipboard", e[e.selectionHighlight = 109] = "selectionHighlight", e[e.selectOnLineNumbers = 110] = "selectOnLineNumbers", e[e.showFoldingControls = 111] = "showFoldingControls", e[e.showUnused = 112] = "showUnused", e[e.snippetSuggestions = 113] = "snippetSuggestions", e[e.smartSelect = 114] = "smartSelect", e[e.smoothScrolling = 115] = "smoothScrolling", e[e.stickyScroll = 116] = "stickyScroll", e[e.stickyTabStops = 117] = "stickyTabStops", e[e.stopRenderingLineAfter = 118] = "stopRenderingLineAfter", e[e.suggest = 119] = "suggest", e[e.suggestFontSize = 120] = "suggestFontSize", e[e.suggestLineHeight = 121] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 122] = "suggestOnTriggerCharacters", e[e.suggestSelection = 123] = "suggestSelection", e[e.tabCompletion = 124] = "tabCompletion", e[e.tabIndex = 125] = "tabIndex", e[e.unicodeHighlighting = 126] = "unicodeHighlighting", e[e.unusualLineTerminators = 127] = "unusualLineTerminators", e[e.useShadowDOM = 128] = "useShadowDOM", e[e.useTabStops = 129] = "useTabStops", e[e.wordBreak = 130] = "wordBreak", e[e.wordSegmenterLocales = 131] = "wordSegmenterLocales", e[e.wordSeparators = 132] = "wordSeparators", e[e.wordWrap = 133] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 134] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 135] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 136] = "wordWrapColumn", e[e.wordWrapOverride1 = 137] = "wordWrapOverride1", e[e.wordWrapOverride2 = 138] = "wordWrapOverride2", e[e.wrappingIndent = 139] = "wrappingIndent", e[e.wrappingStrategy = 140] = "wrappingStrategy", e[e.showDeprecated = 141] = "showDeprecated", e[e.inlayHints = 142] = "inlayHints", e[e.editorClassName = 143] = "editorClassName", e[e.pixelRatio = 144] = "pixelRatio", e[e.tabFocusMode = 145] = "tabFocusMode", e[e.layoutInfo = 146] = "layoutInfo", e[e.wrappingInfo = 147] = "wrappingInfo", e[e.defaultColorDecorators = 148] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 149] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 150] = "inlineCompletionsAccessibilityVerbose";
	})(ns || (ns = {}));
	var rs;
	(function(e) {
		e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
	})(rs || (rs = {}));
	var is;
	(function(e) {
		e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
	})(is || (is = {}));
	var ss;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(ss || (ss = {}));
	var os;
	(function(e) {
		e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
	})(os || (os = {}));
	var as;
	(function(e) {
		e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
	})(as || (as = {}));
	var ls;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(ls || (ls = {}));
	var us;
	(function(e) {
		e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
	})(us || (us = {}));
	var cs;
	(function(e) {
		e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
	})(cs || (cs = {}));
	var fs;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(fs || (fs = {}));
	var ir;
	(function(e) {
		e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
	})(ir || (ir = {}));
	var sr;
	(function(e) {
		e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
	})(sr || (sr = {}));
	var or;
	(function(e) {
		e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
	})(or || (or = {}));
	var hs;
	(function(e) {
		e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
	})(hs || (hs = {}));
	var ms;
	(function(e) {
		e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
	})(ms || (ms = {}));
	var ds;
	(function(e) {
		e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
	})(ds || (ds = {}));
	var gs;
	(function(e) {
		e[e.AIGenerated = 1] = "AIGenerated";
	})(gs || (gs = {}));
	var ps;
	(function(e) {
		e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
	})(ps || (ps = {}));
	var bs;
	(function(e) {
		e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
	})(bs || (bs = {}));
	var ys;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(ys || (ys = {}));
	var vs;
	(function(e) {
		e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
	})(vs || (vs = {}));
	var ws;
	(function(e) {
		e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
	})(ws || (ws = {}));
	var _s;
	(function(e) {
		e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
	})(_s || (_s = {}));
	var Ls;
	(function(e) {
		e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
	})(Ls || (Ls = {}));
	var Ns;
	(function(e) {
		e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
	})(Ns || (Ns = {}));
	var Ss;
	(function(e) {
		e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
	})(Ss || (Ss = {}));
	var ar;
	(function(e) {
		e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
	})(ar || (ar = {}));
	var As;
	(function(e) {
		e.Off = "off", e.OnCode = "onCode", e.On = "on";
	})(As || (As = {}));
	var ks;
	(function(e) {
		e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
	})(ks || (ks = {}));
	var xs;
	(function(e) {
		e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
	})(xs || (xs = {}));
	var Rs;
	(function(e) {
		e[e.Deprecated = 1] = "Deprecated";
	})(Rs || (Rs = {}));
	var Es;
	(function(e) {
		e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
	})(Es || (Es = {}));
	var Ms;
	(function(e) {
		e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
	})(Ms || (Ms = {}));
	var Cs;
	(function(e) {
		e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
	})(Cs || (Cs = {}));
	var Ts;
	(function(e) {
		e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
	})(Ts || (Ts = {}));
	var jl = class {
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
			return Vl(e, t);
		}
	};
	function Wl() {
		return {
			editor: void 0,
			languages: void 0,
			CancellationTokenSource: Ml,
			Emitter: ve,
			KeyCode: ir,
			KeyMod: jl,
			Position: Z,
			Range: W,
			Selection: Dl,
			SelectionDirection: ar,
			MarkerSeverity: sr,
			MarkerTag: or,
			Uri: Re,
			Token: ql
		};
	}
	var Hl = class Yr {
		static {
			this.CHANNEL_NAME = "editorWorkerHost";
		}
		static getChannel(t) {
			return t.getChannel(Yr.CHANNEL_NAME);
		}
		static setChannel(t, n) {
			t.setChannel(Yr.CHANNEL_NAME, n);
		}
	}, Ps, Is, zl = class {
		constructor(e, t) {
			this.uri = e, this.value = t;
		}
	};
	function Gl(e) {
		return Array.isArray(e);
	}
	(class Wt {
		static {
			this.defaultToKey = (t) => t.toString();
		}
		constructor(t, n) {
			if (this[Ps] = "ResourceMap", t instanceof Wt) this.map = new Map(t.map), this.toKey = n ?? Wt.defaultToKey;
			else if (Gl(t)) {
				this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? Wt.defaultToKey;
				for (const [r, i] of t) this.set(r, i);
			} else this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? Wt.defaultToKey;
		}
		set(t, n) {
			return this.map.set(this.toKey(t), new zl(t, n)), this;
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
		*[(Ps = Symbol.toStringTag, Symbol.iterator)]() {
			for (const [, t] of this.map) yield [t.uri, t.value];
		}
	});
	var Jl = class {
		constructor() {
			this[Is] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
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
		[(Is = Symbol.toStringTag, Symbol.iterator)]() {
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
	}, Xl = class extends Jl {
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
	}, Ql = class extends Xl {
		constructor(e, t = 1) {
			super(e, t);
		}
		trim(e) {
			this.trimOld(e);
		}
		set(e, t) {
			return super.set(e, t), this.checkTrim(), this;
		}
	}, Yl = class {
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
	new Ql(10);
	function Zl(e) {
		let t = [];
		for (; Object.prototype !== e;) t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
		return t;
	}
	function Fs(e) {
		const t = [];
		for (const n of Zl(e)) typeof e[n] == "function" && t.push(n);
		return t;
	}
	function Kl(e, t) {
		const n = (i) => function() {
			return t(i, Array.prototype.slice.call(arguments, 0));
		}, r = {};
		for (const i of e) r[i] = n(i);
		return r;
	}
	var Vs;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
	})(Vs || (Vs = {}));
	var Ds;
	(function(e) {
		e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
	})(Ds || (Ds = {}));
	var Os;
	(function(e) {
		e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
	})(Os || (Os = {}));
	function eu(e, t, n, r, i) {
		if (r === 0) return !0;
		const s = t.charCodeAt(r - 1);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const o = t.charCodeAt(r);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function tu(e, t, n, r, i) {
		if (r + i === n) return !0;
		const s = t.charCodeAt(r + i);
		if (e.get(s) !== 0 || s === 13 || s === 10) return !0;
		if (i > 0) {
			const o = t.charCodeAt(r + i - 1);
			if (e.get(o) !== 0) return !0;
		}
		return !1;
	}
	function nu(e, t, n, r, i) {
		return eu(e, t, n, r, i) && tu(e, t, n, r, i);
	}
	var ru = class {
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
						$a(e, t, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
						continue;
					}
					return null;
				}
				if (this._prevMatchStartIndex = r, this._prevMatchLength = i, !this._wordSeparators || nu(this._wordSeparators, e, t, r, i)) return n;
			} while (n);
			return null;
		}
	};
	function iu(e, t = "Unreachable") {
		throw new Error(t);
	}
	function rn(e) {
		if (!e()) {
			debugger;
			e(), At(new Le("Assertion Failed"));
		}
	}
	function $s(e, t) {
		let n = 0;
		for (; n < e.length - 1;) {
			const r = e[n], i = e[n + 1];
			if (!t(r, i)) return !1;
			n++;
		}
		return !0;
	}
	const su = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
	function ou(e = "") {
		let t = "(-?\\d*\\.\\d\\w*)|([^";
		for (const n of su) e.indexOf(n) >= 0 || (t += "\\" + n);
		return t += "\\s]+)", new RegExp(t, "g");
	}
	const Bs = ou();
	function Us(e) {
		let t = Bs;
		if (e && e instanceof RegExp) if (e.global) t = e;
		else {
			let n = "g";
			e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
		}
		return t.lastIndex = 0, t;
	}
	const qs = new ca();
	qs.unshift({
		maxLen: 1e3,
		windowSize: 15,
		timeBudget: 150
	});
	function lr(e, t, n, r, i) {
		if (t = Us(t), i || (i = zt.first(qs)), n.length > i.maxLen) {
			let u = e - i.maxLen / 2;
			return u < 0 ? u = 0 : r += u, n = n.substring(u, e + i.maxLen / 2), lr(e, t, n, r, i);
		}
		const s = Date.now(), o = e - 1 - r;
		let l = -1, a = null;
		for (let u = 1; !(Date.now() - s >= i.timeBudget); u++) {
			const h = o - i.windowSize * u;
			t.lastIndex = Math.max(0, h);
			const f = au(t, n, o, l);
			if (!f && a || (a = f, h <= 0)) break;
			l = h;
		}
		if (a) {
			const u = {
				word: a[0],
				startColumn: r + 1 + a.index,
				endColumn: r + 1 + a.index + a[0].length
			};
			return t.lastIndex = 0, u;
		}
		return null;
	}
	function au(e, t, n, r) {
		let i;
		for (; i = e.exec(t);) {
			const s = i.index || 0;
			if (s <= n && e.lastIndex >= n) return i;
			if (r > 0 && s > r) return null;
		}
		return null;
	}
	var lu = class {
		static computeUnicodeHighlights(e, t, n) {
			const r = n ? n.startLineNumber : 1, i = n ? n.endLineNumber : e.getLineCount(), s = new js(t), o = s.getCandidateCodePoints();
			let l;
			o === "allNonBasicAscii" ? l = /* @__PURE__ */ new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : l = new RegExp(`${uu(Array.from(o))}`, "g");
			const a = new ru(null, l), u = [];
			let h = !1, f, d = 0, m = 0, g = 0;
			e: for (let p = r, w = i; p <= w; p++) {
				const _ = e.getLineContent(p), N = _.length;
				a.reset(0);
				do
					if (f = a.next(_), f) {
						let v = f.index, y = f.index + f[0].length;
						if (v > 0) Qt(_.charCodeAt(v - 1)) && v--;
						if (y + 1 < N) Qt(_.charCodeAt(y - 1)) && y++;
						const b = _.substring(v, y);
						let L = lr(v + 1, Bs, _, 0);
						L && L.endColumn <= v + 1 && (L = null);
						const S = s.shouldHighlightNonBasicASCII(b, L ? L.word : null);
						if (S !== 0) {
							if (S === 3 ? d++ : S === 2 ? m++ : S === 1 ? g++ : iu(S), u.length >= 1e3) {
								h = !0;
								break e;
							}
							u.push(new W(p, v + 1, p, y + 1));
						}
					}
				while (f);
			}
			return {
				ranges: u,
				hasMore: h,
				ambiguousCharacterCount: d,
				invisibleCharacterCount: m,
				nonBasicAsciiCharacterCount: g
			};
		}
		static computeUnicodeHighlightReason(e, t) {
			const n = new js(t);
			switch (n.shouldHighlightNonBasicASCII(e, null)) {
				case 0: return null;
				case 2: return { kind: 1 };
				case 3: {
					const r = e.codePointAt(0), i = n.ambiguousCharacters.getPrimaryConfusable(r), s = Hn.getLocales().filter((o) => !Hn.getInstance(new Set([...t.allowedLocales, o])).isAmbiguous(r));
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
	function uu(e, t) {
		return `[${Fa(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
	}
	var js = class {
		constructor(e) {
			this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = Hn.getInstance(new Set(e.allowedLocales));
		}
		getCandidateCodePoints() {
			if (this.options.nonBasicASCII) return "allNonBasicAscii";
			const e = /* @__PURE__ */ new Set();
			if (this.options.invisibleCharacters) for (const t of zn.codePoints) Ws(String.fromCodePoint(t)) || e.add(t);
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
				const o = s.codePointAt(0), l = Ua(s);
				r = r || l, !l && !this.ambiguousCharacters.isAmbiguous(o) && !zn.isInvisibleCharacter(o) && (i = !0);
			}
			return !r && i ? 0 : this.options.invisibleCharacters && !Ws(e) && zn.isInvisibleCharacter(n) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(n) ? 3 : 0;
		}
	};
	function Ws(e) {
		return e === " " || e === `
` || e === "	";
	}
	var sn = class {
		constructor(e, t, n) {
			this.changes = e, this.moves = t, this.hitTimeout = n;
		}
	}, cu = class {
		constructor(e, t) {
			this.lineRangeMapping = e, this.changes = t;
		}
	}, J = class Te {
		static addRange(t, n) {
			let r = 0;
			for (; r < n.length && n[r].endExclusive < t.start;) r++;
			let i = r;
			for (; i < n.length && n[i].start <= t.endExclusive;) i++;
			if (r === i) n.splice(r, 0, t);
			else {
				const s = Math.min(t.start, n[r].start), o = Math.max(t.endExclusive, n[i - 1].endExclusive);
				n.splice(r, i - r, new Te(s, o));
			}
		}
		static tryCreate(t, n) {
			if (!(t > n)) return new Te(t, n);
		}
		static ofLength(t) {
			return new Te(0, t);
		}
		static ofStartAndLength(t, n) {
			return new Te(t, t + n);
		}
		constructor(t, n) {
			if (this.start = t, this.endExclusive = n, t > n) throw new Le(`Invalid range: ${this.toString()}`);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(t) {
			return new Te(this.start + t, this.endExclusive + t);
		}
		deltaStart(t) {
			return new Te(this.start + t, this.endExclusive);
		}
		deltaEnd(t) {
			return new Te(this.start, this.endExclusive + t);
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
			return new Te(Math.min(this.start, t.start), Math.max(this.endExclusive, t.endExclusive));
		}
		intersect(t) {
			const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
			if (n <= r) return new Te(n, r);
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
			if (this.isEmpty) throw new Le(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, t));
		}
		clipCyclic(t) {
			if (this.isEmpty) throw new Le(`Invalid clipping range: ${this.toString()}`);
			return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
		}
		forEach(t) {
			for (let n = this.start; n < this.endExclusive; n++) t(n);
		}
	};
	function lt(e, t) {
		const n = Mt(e, t);
		return n === -1 ? void 0 : e[n];
	}
	function Mt(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const o = Math.floor((i + s) / 2);
			t(e[o]) ? i = o + 1 : s = o;
		}
		return i - 1;
	}
	function fu(e, t) {
		const n = ur(e, t);
		return n === e.length ? void 0 : e[n];
	}
	function ur(e, t, n = 0, r = e.length) {
		let i = n, s = r;
		for (; i < s;) {
			const o = Math.floor((i + s) / 2);
			t(e[o]) ? s = o : i = o + 1;
		}
		return i;
	}
	var Hs = class Qo {
		static {
			this.assertInvariants = !1;
		}
		constructor(t) {
			this._array = t, this._findLastMonotonousLastIdx = 0;
		}
		findLastMonotonous(t) {
			if (Qo.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const r of this._array) if (this._prevFindLastPredicate(r) && !t(r)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = t;
			}
			const n = Mt(this._array, t, this._findLastMonotonousLastIdx);
			return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
		}
	}, H = class Oe {
		static fromRangeInclusive(t) {
			return new Oe(t.startLineNumber, t.endLineNumber + 1);
		}
		static joinMany(t) {
			if (t.length === 0) return [];
			let n = new on(t[0].slice());
			for (let r = 1; r < t.length; r++) n = n.getUnion(new on(t[r].slice()));
			return n.ranges;
		}
		static join(t) {
			if (t.length === 0) throw new Le("lineRanges cannot be empty");
			let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
			for (let i = 1; i < t.length; i++) n = Math.min(n, t[i].startLineNumber), r = Math.max(r, t[i].endLineNumberExclusive);
			return new Oe(n, r);
		}
		static ofLength(t, n) {
			return new Oe(t, t + n);
		}
		static deserialize(t) {
			return new Oe(t[0], t[1]);
		}
		constructor(t, n) {
			if (t > n) throw new Le(`startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`);
			this.startLineNumber = t, this.endLineNumberExclusive = n;
		}
		contains(t) {
			return this.startLineNumber <= t && t < this.endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(t) {
			return new Oe(this.startLineNumber + t, this.endLineNumberExclusive + t);
		}
		deltaLength(t) {
			return new Oe(this.startLineNumber, this.endLineNumberExclusive + t);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(t) {
			return new Oe(Math.min(this.startLineNumber, t.startLineNumber), Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive));
		}
		toString() {
			return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
		}
		intersect(t) {
			const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
			if (n <= r) return new Oe(n, r);
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
			return this.isEmpty ? null : new W(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toExclusiveRange() {
			return new W(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
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
			return new J(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
	}, on = class Lt {
		constructor(t = []) {
			this._normalizedRanges = t;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(t) {
			if (t.length === 0) return;
			const n = ur(this._normalizedRanges, (i) => i.endLineNumberExclusive >= t.startLineNumber), r = Mt(this._normalizedRanges, (i) => i.startLineNumber <= t.endLineNumberExclusive) + 1;
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
			const n = lt(this._normalizedRanges, (r) => r.startLineNumber <= t);
			return !!n && n.endLineNumberExclusive > t;
		}
		intersects(t) {
			const n = lt(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
			return !!n && n.endLineNumberExclusive > t.startLineNumber;
		}
		getUnion(t) {
			if (this._normalizedRanges.length === 0) return t;
			if (t._normalizedRanges.length === 0) return this;
			const n = [];
			let r = 0, i = 0, s = null;
			for (; r < this._normalizedRanges.length || i < t._normalizedRanges.length;) {
				let o = null;
				if (r < this._normalizedRanges.length && i < t._normalizedRanges.length) {
					const l = this._normalizedRanges[r], a = t._normalizedRanges[i];
					l.startLineNumber < a.startLineNumber ? (o = l, r++) : (o = a, i++);
				} else r < this._normalizedRanges.length ? (o = this._normalizedRanges[r], r++) : (o = t._normalizedRanges[i], i++);
				s === null ? s = o : s.endLineNumberExclusive >= o.startLineNumber ? s = new H(s.startLineNumber, Math.max(s.endLineNumberExclusive, o.endLineNumberExclusive)) : (n.push(s), s = o);
			}
			return s !== null && n.push(s), new Lt(n);
		}
		subtractFrom(t) {
			const n = ur(this._normalizedRanges, (o) => o.endLineNumberExclusive >= t.startLineNumber), r = Mt(this._normalizedRanges, (o) => o.startLineNumber <= t.endLineNumberExclusive) + 1;
			if (n === r) return new Lt([t]);
			const i = [];
			let s = t.startLineNumber;
			for (let o = n; o < r; o++) {
				const l = this._normalizedRanges[o];
				l.startLineNumber > s && i.push(new H(s, l.startLineNumber)), s = l.endLineNumberExclusive;
			}
			return s < t.endLineNumberExclusive && i.push(new H(s, t.endLineNumberExclusive)), new Lt(i);
		}
		toString() {
			return this._normalizedRanges.map((t) => t.toString()).join(", ");
		}
		getIntersection(t) {
			const n = [];
			let r = 0, i = 0;
			for (; r < this._normalizedRanges.length && i < t._normalizedRanges.length;) {
				const s = this._normalizedRanges[r], o = t._normalizedRanges[i], l = s.intersect(o);
				l && !l.isEmpty && n.push(l), s.endLineNumberExclusive < o.endLineNumberExclusive ? r++ : i++;
			}
			return new Lt(n);
		}
		getWithDelta(t) {
			return new Lt(this._normalizedRanges.map((n) => n.delta(t)));
		}
	};
	(class Nt {
		static {
			this.zero = new Nt(0, 0);
		}
		static betweenPositions(t, n) {
			return t.lineNumber === n.lineNumber ? new Nt(0, n.column - t.column) : new Nt(n.lineNumber - t.lineNumber, n.column - 1);
		}
		static ofRange(t) {
			return Nt.betweenPositions(t.getStartPosition(), t.getEndPosition());
		}
		static ofText(t) {
			let n = 0, r = 0;
			for (const i of t) i === `
` ? (n++, r = 0) : r++;
			return new Nt(n, r);
		}
		constructor(t, n) {
			this.lineCount = t, this.columnCount = n;
		}
		isGreaterThanOrEqualTo(t) {
			return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
		}
		createRange(t) {
			return this.lineCount === 0 ? new W(t.lineNumber, t.column, t.lineNumber, t.column + this.columnCount) : new W(t.lineNumber, t.column, t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		addToPosition(t) {
			return this.lineCount === 0 ? new Z(t.lineNumber, t.column + this.columnCount) : new Z(t.lineNumber + this.lineCount, this.columnCount + 1);
		}
		toString() {
			return `${this.lineCount},${this.columnCount}`;
		}
	});
	var hu = class {
		constructor(e, t) {
			this.range = e, this.text = t;
		}
		toSingleEditOperation() {
			return {
				range: this.range,
				text: this.text
			};
		}
	}, ut = class St {
		static inverse(t, n, r) {
			const i = [];
			let s = 1, o = 1;
			for (const a of t) {
				const u = new St(new H(s, a.original.startLineNumber), new H(o, a.modified.startLineNumber));
				u.modified.isEmpty || i.push(u), s = a.original.endLineNumberExclusive, o = a.modified.endLineNumberExclusive;
			}
			const l = new St(new H(s, n + 1), new H(o, r + 1));
			return l.modified.isEmpty || i.push(l), i;
		}
		static clip(t, n, r) {
			const i = [];
			for (const s of t) {
				const o = s.original.intersect(n), l = s.modified.intersect(r);
				o && !o.isEmpty && l && !l.isEmpty && i.push(new St(o, l));
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
			return new St(this.modified, this.original);
		}
		join(t) {
			return new St(this.original.join(t.original), this.modified.join(t.modified));
		}
		toRangeMapping() {
			const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
			if (t && n) return new Ve(t, n);
			if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new Le("not a valid diff");
				return new Ve(new W(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new W(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new Ve(new W(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new W(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(t, n) {
			if (zs(this.original.endLineNumberExclusive, t) && zs(this.modified.endLineNumberExclusive, n)) return new Ve(new W(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new W(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new Ve(W.fromPositions(new Z(this.original.startLineNumber, 1), ct(new Z(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), W.fromPositions(new Z(this.modified.startLineNumber, 1), ct(new Z(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new Ve(W.fromPositions(ct(new Z(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), ct(new Z(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), W.fromPositions(ct(new Z(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), ct(new Z(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
			throw new Le();
		}
	};
	function ct(e, t) {
		if (e.lineNumber < 1) return new Z(1, 1);
		if (e.lineNumber > t.length) return new Z(t.length, t[t.length - 1].length + 1);
		const n = t[e.lineNumber - 1];
		return e.column > n.length + 1 ? new Z(e.lineNumber, n.length + 1) : e;
	}
	function zs(e, t) {
		return e >= 1 && e <= t.length;
	}
	var Ct = class En extends ut {
		static fromRangeMappings(t) {
			return new En(H.join(t.map((n) => H.fromRangeInclusive(n.originalRange))), H.join(t.map((n) => H.fromRangeInclusive(n.modifiedRange))), t);
		}
		constructor(t, n, r) {
			super(t, n), this.innerChanges = r;
		}
		flip() {
			return new En(this.modified, this.original, this.innerChanges?.map((t) => t.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new En(this.original, this.modified, [this.toRangeMapping()]);
		}
	}, Ve = class Yo {
		static assertSorted(t) {
			for (let n = 1; n < t.length; n++) {
				const r = t[n - 1], i = t[n];
				if (!(r.originalRange.getEndPosition().isBeforeOrEqual(i.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(i.modifiedRange.getStartPosition()))) throw new Le("Range mappings must be sorted");
			}
		}
		constructor(t, n) {
			this.originalRange = t, this.modifiedRange = n;
		}
		toString() {
			return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
		}
		flip() {
			return new Yo(this.modifiedRange, this.originalRange);
		}
		toTextEdit(t) {
			const n = t.getValueOfRange(this.modifiedRange);
			return new hu(this.originalRange, n);
		}
	};
	const mu = 3;
	var du = class {
		computeDiff(e, t, n) {
			const r = new bu(e, t, {
				maxComputationTime: n.maxComputationTimeMs,
				shouldIgnoreTrimWhitespace: n.ignoreTrimWhitespace,
				shouldComputeCharChanges: !0,
				shouldMakePrettyDiff: !0,
				shouldPostProcessCharChanges: !0
			}).computeDiff(), i = [];
			let s = null;
			for (const o of r.changes) {
				let l;
				o.originalEndLineNumber === 0 ? l = new H(o.originalStartLineNumber + 1, o.originalStartLineNumber + 1) : l = new H(o.originalStartLineNumber, o.originalEndLineNumber + 1);
				let a;
				o.modifiedEndLineNumber === 0 ? a = new H(o.modifiedStartLineNumber + 1, o.modifiedStartLineNumber + 1) : a = new H(o.modifiedStartLineNumber, o.modifiedEndLineNumber + 1);
				let u = new Ct(l, a, o.charChanges?.map((h) => new Ve(new W(h.originalStartLineNumber, h.originalStartColumn, h.originalEndLineNumber, h.originalEndColumn), new W(h.modifiedStartLineNumber, h.modifiedStartColumn, h.modifiedEndLineNumber, h.modifiedEndColumn))));
				s && (s.modified.endLineNumberExclusive === u.modified.startLineNumber || s.original.endLineNumberExclusive === u.original.startLineNumber) && (u = new Ct(s.original.join(u.original), s.modified.join(u.modified), s.innerChanges && u.innerChanges ? s.innerChanges.concat(u.innerChanges) : void 0), i.pop()), i.push(u), s = u;
			}
			return rn(() => $s(i, (o, l) => l.original.startLineNumber - o.original.endLineNumberExclusive === l.modified.startLineNumber - o.modified.endLineNumberExclusive && o.original.endLineNumberExclusive < l.original.startLineNumber && o.modified.endLineNumberExclusive < l.modified.startLineNumber)), new sn(i, [], r.quitEarly);
		}
	};
	function Gs(e, t, n, r) {
		return new ki(e, t, n).ComputeDiff(r);
	}
	var Js = class {
		constructor(e) {
			const t = [], n = [];
			for (let r = 0, i = e.length; r < i; r++) t[r] = fr(e[r], 1), n[r] = hr(e[r], 1);
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
			let o = 0;
			for (let l = t; l <= n; l++) {
				const a = this.lines[l], u = e ? this._startColumns[l] : 1, h = e ? this._endColumns[l] : a.length + 1;
				for (let f = u; f < h; f++) r[o] = a.charCodeAt(f - 1), i[o] = l + 1, s[o] = f, o++;
				!e && l < n && (r[o] = 10, i[o] = l + 1, s[o] = a.length + 1, o++);
			}
			return new gu(r, i, s);
		}
	}, gu = class {
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
	}, an = class Zo {
		constructor(t, n, r, i, s, o, l, a) {
			this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = i, this.modifiedStartLineNumber = s, this.modifiedStartColumn = o, this.modifiedEndLineNumber = l, this.modifiedEndColumn = a;
		}
		static createFromDiffChange(t, n, r) {
			return new Zo(n.getStartLineNumber(t.originalStart), n.getStartColumn(t.originalStart), n.getEndLineNumber(t.originalStart + t.originalLength - 1), n.getEndColumn(t.originalStart + t.originalLength - 1), r.getStartLineNumber(t.modifiedStart), r.getStartColumn(t.modifiedStart), r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), r.getEndColumn(t.modifiedStart + t.modifiedLength - 1));
		}
	};
	function pu(e) {
		if (e.length <= 1) return e;
		const t = [e[0]];
		let n = t[0];
		for (let r = 1, i = e.length; r < i; r++) {
			const s = e[r], o = s.originalStart - (n.originalStart + n.originalLength), l = s.modifiedStart - (n.modifiedStart + n.modifiedLength);
			Math.min(o, l) < mu ? (n.originalLength = s.originalStart + s.originalLength - n.originalStart, n.modifiedLength = s.modifiedStart + s.modifiedLength - n.modifiedStart) : (t.push(s), n = s);
		}
		return t;
	}
	var cr = class Ko {
		constructor(t, n, r, i, s) {
			this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = i, this.charChanges = s;
		}
		static createFromDiffResult(t, n, r, i, s, o, l) {
			let a, u, h, f, d;
			if (n.originalLength === 0 ? (a = r.getStartLineNumber(n.originalStart) - 1, u = 0) : (a = r.getStartLineNumber(n.originalStart), u = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (h = i.getStartLineNumber(n.modifiedStart) - 1, f = 0) : (h = i.getStartLineNumber(n.modifiedStart), f = i.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), o && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && s()) {
				const m = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), g = i.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
				if (m.getElements().length > 0 && g.getElements().length > 0) {
					let p = Gs(m, g, s, !0).changes;
					l && (p = pu(p)), d = [];
					for (let w = 0, _ = p.length; w < _; w++) d.push(an.createFromDiffChange(p[w], m, g));
				}
			}
			return new Ko(a, u, h, f, d);
		}
	}, bu = class {
		constructor(e, t, n) {
			this.shouldComputeCharChanges = n.shouldComputeCharChanges, this.shouldPostProcessCharChanges = n.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = n.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = t, this.original = new Js(e), this.modified = new Js(t), this.continueLineDiff = Xs(n.maxComputationTime), this.continueCharDiff = Xs(n.maxComputationTime === 0 ? 0 : Math.min(n.maxComputationTime, 5e3));
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
			const e = Gs(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), t = e.changes, n = e.quitEarly;
			if (this.shouldIgnoreTrimWhitespace) {
				const o = [];
				for (let l = 0, a = t.length; l < a; l++) o.push(cr.createFromDiffResult(this.shouldIgnoreTrimWhitespace, t[l], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
				return {
					quitEarly: n,
					changes: o
				};
			}
			const r = [];
			let i = 0, s = 0;
			for (let o = -1, l = t.length; o < l; o++) {
				const a = o + 1 < l ? t[o + 1] : null, u = a ? a.originalStart : this.originalLines.length, h = a ? a.modifiedStart : this.modifiedLines.length;
				for (; i < u && s < h;) {
					const f = this.originalLines[i], d = this.modifiedLines[s];
					if (f !== d) {
						{
							let m = fr(f, 1), g = fr(d, 1);
							for (; m > 1 && g > 1 && f.charCodeAt(m - 2) === d.charCodeAt(g - 2);) m--, g--;
							(m > 1 || g > 1) && this._pushTrimWhitespaceCharChange(r, i + 1, 1, m, s + 1, 1, g);
						}
						{
							let m = hr(f, 1), g = hr(d, 1);
							const p = f.length + 1, w = d.length + 1;
							for (; m < p && g < w && f.charCodeAt(m - 1) === f.charCodeAt(g - 1);) m++, g++;
							(m < p || g < w) && this._pushTrimWhitespaceCharChange(r, i + 1, m, p, s + 1, g, w);
						}
					}
					i++, s++;
				}
				a && (r.push(cr.createFromDiffResult(this.shouldIgnoreTrimWhitespace, a, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), i += a.originalLength, s += a.modifiedLength);
			}
			return {
				quitEarly: n,
				changes: r
			};
		}
		_pushTrimWhitespaceCharChange(e, t, n, r, i, s, o) {
			if (this._mergeTrimWhitespaceCharChange(e, t, n, r, i, s, o)) return;
			let l;
			this.shouldComputeCharChanges && (l = [new an(t, n, t, r, i, s, i, o)]), e.push(new cr(t, t, i, i, l));
		}
		_mergeTrimWhitespaceCharChange(e, t, n, r, i, s, o) {
			const l = e.length;
			if (l === 0) return !1;
			const a = e[l - 1];
			return a.originalEndLineNumber === 0 || a.modifiedEndLineNumber === 0 ? !1 : a.originalEndLineNumber === t && a.modifiedEndLineNumber === i ? (this.shouldComputeCharChanges && a.charChanges && a.charChanges.push(new an(t, n, t, r, i, s, i, o)), !0) : a.originalEndLineNumber + 1 === t && a.modifiedEndLineNumber + 1 === i ? (a.originalEndLineNumber = t, a.modifiedEndLineNumber = i, this.shouldComputeCharChanges && a.charChanges && a.charChanges.push(new an(t, n, t, r, i, s, i, o)), !0) : !1;
		}
	};
	function fr(e, t) {
		const n = Da(e);
		return n === -1 ? t : n + 1;
	}
	function hr(e, t) {
		const n = Oa(e);
		return n === -1 ? t : n + 2;
	}
	function Xs(e) {
		if (e === 0) return () => !0;
		const t = Date.now();
		return () => Date.now() - t < e;
	}
	function yu(e, t, n = (r, i) => r === i) {
		if (e === t) return !0;
		if (!e || !t || e.length !== t.length) return !1;
		for (let r = 0, i = e.length; r < i; r++) if (!n(e[r], t[r])) return !1;
		return !0;
	}
	function* vu(e, t) {
		let n, r;
		for (const i of e) r !== void 0 && t(r, i) ? n.push(i) : (n && (yield n), n = [i]), r = i;
		n && (yield n);
	}
	function wu(e, t) {
		for (let n = 0; n <= e.length; n++) t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
	}
	function _u(e, t) {
		for (let n = 0; n < e.length; n++) t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
	}
	function Lu(e, t) {
		for (const n of t) e.push(n);
	}
	var mr;
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
	})(mr || (mr = {}));
	function ln(e, t) {
		return (n, r) => t(e(n), e(r));
	}
	const un = (e, t) => e - t;
	function Nu(e) {
		return (t, n) => -e(t, n);
	}
	(class Mn {
		static {
			this.empty = new Mn((t) => {});
		}
		constructor(t) {
			this.iterate = t;
		}
		toArray() {
			const t = [];
			return this.iterate((n) => (t.push(n), !0)), t;
		}
		filter(t) {
			return new Mn((n) => this.iterate((r) => t(r) ? n(r) : !0));
		}
		map(t) {
			return new Mn((n) => this.iterate((r) => n(t(r))));
		}
		findLast(t) {
			let n;
			return this.iterate((r) => (t(r) && (n = r), !0)), n;
		}
		findLastMaxBy(t) {
			let n, r = !0;
			return this.iterate((i) => ((r || mr.isGreaterThan(t(i, n))) && (r = !1, n = i), !0)), n;
		}
	});
	var ft = class Zr {
		static trivial(t, n) {
			return new Zr([new me(J.ofLength(t.length), J.ofLength(n.length))], !1);
		}
		static trivialTimedOut(t, n) {
			return new Zr([new me(J.ofLength(t.length), J.ofLength(n.length))], !0);
		}
		constructor(t, n) {
			this.diffs = t, this.hitTimeout = n;
		}
	}, me = class $e {
		static invert(t, n) {
			const r = [];
			return wu(t, (i, s) => {
				r.push($e.fromOffsetPairs(i ? i.getEndExclusives() : Qe.zero, s ? s.getStarts() : new Qe(n, (i ? i.seq2Range.endExclusive - i.seq1Range.endExclusive : 0) + n)));
			}), r;
		}
		static fromOffsetPairs(t, n) {
			return new $e(new J(t.offset1, n.offset1), new J(t.offset2, n.offset2));
		}
		static assertSorted(t) {
			let n;
			for (const r of t) {
				if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start)) throw new Le("Sequence diffs must be sorted");
				n = r;
			}
		}
		constructor(t, n) {
			this.seq1Range = t, this.seq2Range = n;
		}
		swap() {
			return new $e(this.seq2Range, this.seq1Range);
		}
		toString() {
			return `${this.seq1Range} <-> ${this.seq2Range}`;
		}
		join(t) {
			return new $e(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
		}
		delta(t) {
			return t === 0 ? this : new $e(this.seq1Range.delta(t), this.seq2Range.delta(t));
		}
		deltaStart(t) {
			return t === 0 ? this : new $e(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
		}
		deltaEnd(t) {
			return t === 0 ? this : new $e(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
		}
		intersect(t) {
			const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
			if (!(!n || !r)) return new $e(n, r);
		}
		getStarts() {
			return new Qe(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new Qe(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	}, Qe = class Cn {
		static {
			this.zero = new Cn(0, 0);
		}
		static {
			this.max = new Cn(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		}
		constructor(t, n) {
			this.offset1 = t, this.offset2 = n;
		}
		toString() {
			return `${this.offset1} <-> ${this.offset2}`;
		}
		delta(t) {
			return t === 0 ? this : new Cn(this.offset1 + t, this.offset2 + t);
		}
		equals(t) {
			return this.offset1 === t.offset1 && this.offset2 === t.offset2;
		}
	}, dr = class ea {
		static {
			this.instance = new ea();
		}
		isValid() {
			return !0;
		}
	}, Su = class {
		constructor(e) {
			if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0) throw new Le("timeout must be positive");
		}
		isValid() {
			if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
				this.valid = !1;
				debugger;
			}
			return this.valid;
		}
	}, gr = class {
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
	function pr(e) {
		return e === 32 || e === 9;
	}
	var Qs = class Kr {
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
				const o = n[s];
				for (let a = 0; a < o.length; a++) {
					i++;
					const u = o[a], h = Kr.getKey(u);
					this.histogram[h] = (this.histogram[h] || 0) + 1;
				}
				i++;
				const l = Kr.getKey(`
`);
				this.histogram[l] = (this.histogram[l] || 0) + 1;
			}
			this.totalCount = i;
		}
		computeSimilarity(t) {
			let n = 0;
			const r = Math.max(this.histogram.length, t.histogram.length);
			for (let i = 0; i < r; i++) n += Math.abs((this.histogram[i] ?? 0) - (t.histogram[i] ?? 0));
			return 1 - n / (this.totalCount + t.totalCount);
		}
	}, Au = class {
		compute(e, t, n = dr.instance, r) {
			if (e.length === 0 || t.length === 0) return ft.trivial(e, t);
			const i = new gr(e.length, t.length), s = new gr(e.length, t.length), o = new gr(e.length, t.length);
			for (let m = 0; m < e.length; m++) for (let g = 0; g < t.length; g++) {
				if (!n.isValid()) return ft.trivialTimedOut(e, t);
				const p = m === 0 ? 0 : i.get(m - 1, g), w = g === 0 ? 0 : i.get(m, g - 1);
				let _;
				e.getElement(m) === t.getElement(g) ? (m === 0 || g === 0 ? _ = 0 : _ = i.get(m - 1, g - 1), m > 0 && g > 0 && s.get(m - 1, g - 1) === 3 && (_ += o.get(m - 1, g - 1)), _ += r ? r(m, g) : 1) : _ = -1;
				const N = Math.max(p, w, _);
				if (N === _) {
					const v = m > 0 && g > 0 ? o.get(m - 1, g - 1) : 0;
					o.set(m, g, v + 1), s.set(m, g, 3);
				} else N === p ? (o.set(m, g, 0), s.set(m, g, 1)) : N === w && (o.set(m, g, 0), s.set(m, g, 2));
				i.set(m, g, N);
			}
			const l = [];
			let a = e.length, u = t.length;
			function h(m, g) {
				(m + 1 !== a || g + 1 !== u) && l.push(new me(new J(m + 1, a), new J(g + 1, u))), a = m, u = g;
			}
			let f = e.length - 1, d = t.length - 1;
			for (; f >= 0 && d >= 0;) s.get(f, d) === 3 ? (h(f, d), f--, d--) : s.get(f, d) === 1 ? f-- : d--;
			return h(-1, -1), l.reverse(), new ft(l, !1);
		}
	}, Ys = class {
		compute(e, t, n = dr.instance) {
			if (e.length === 0 || t.length === 0) return ft.trivial(e, t);
			const r = e, i = t;
			function s(g, p) {
				for (; g < r.length && p < i.length && r.getElement(g) === i.getElement(p);) g++, p++;
				return g;
			}
			let o = 0;
			const l = new ku();
			l.set(0, s(0, 0));
			const a = new xu();
			a.set(0, l.get(0) === 0 ? null : new Zs(null, 0, 0, l.get(0)));
			let u = 0;
			e: for (;;) {
				if (o++, !n.isValid()) return ft.trivialTimedOut(r, i);
				const g = -Math.min(o, i.length + o % 2), p = Math.min(o, r.length + o % 2);
				for (u = g; u <= p; u += 2) {
					let w = 0;
					const _ = u === p ? -1 : l.get(u + 1), N = u === g ? -1 : l.get(u - 1) + 1;
					w++;
					const v = Math.min(Math.max(_, N), r.length), y = v - u;
					if (w++, v > r.length || y > i.length) continue;
					const b = s(v, y);
					l.set(u, b);
					const L = v === _ ? a.get(u + 1) : a.get(u - 1);
					if (a.set(u, b !== v ? new Zs(L, v, y, b - v) : L), l.get(u) === r.length && l.get(u) - u === i.length) break e;
				}
			}
			let h = a.get(u);
			const f = [];
			let d = r.length, m = i.length;
			for (;;) {
				const g = h ? h.x + h.length : 0, p = h ? h.y + h.length : 0;
				if ((g !== d || p !== m) && f.push(new me(new J(g, d), new J(p, m))), !h) break;
				d = h.x, m = h.y, h = h.prev;
			}
			return f.reverse(), new ft(f, !1);
		}
	}, Zs = class {
		constructor(e, t, n, r) {
			this.prev = e, this.x = t, this.y = n, this.length = r;
		}
	}, ku = class {
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
	}, xu = class {
		constructor() {
			this.positiveArr = [], this.negativeArr = [];
		}
		get(e) {
			return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
		}
		set(e, t) {
			e < 0 ? (e = -e - 1, this.negativeArr[e] = t) : this.positiveArr[e] = t;
		}
	}, cn = class {
		constructor(e, t, n) {
			this.lines = e, this.range = t, this.considerWhitespaceChanges = n, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
			for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
				let i = e[r - 1], s = 0;
				r === this.range.startLineNumber && this.range.startColumn > 1 && (s = this.range.startColumn - 1, i = i.substring(s)), this.lineStartOffsets.push(s);
				let o = 0;
				if (!n) {
					const a = i.trimStart();
					o = i.length - a.length, i = a.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(o);
				const l = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - s - o, i.length) : i.length;
				for (let a = 0; a < l; a++) this.elements.push(i.charCodeAt(a));
				r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new J(0, this.length));
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
			const t = e1(e > 0 ? this.elements[e - 1] : -1), n = e1(e < this.elements.length ? this.elements[e] : -1);
			if (t === 7 && n === 8) return 0;
			if (t === 8) return 150;
			let r = 0;
			return t !== n && (r += 10, t === 0 && n === 1 && (r += 1)), r += Ks(t), r += Ks(n), r;
		}
		translateOffset(e, t = "right") {
			const n = Mt(this.firstElementOffsetByLineIdx, (i) => i <= e), r = e - this.firstElementOffsetByLineIdx[n];
			return new Z(this.range.startLineNumber + n, 1 + this.lineStartOffsets[n] + r + (r === 0 && t === "left" ? 0 : this.trimmedWsLengthsByLineIdx[n]));
		}
		translateRange(e) {
			const t = this.translateOffset(e.start, "right"), n = this.translateOffset(e.endExclusive, "left");
			return n.isBefore(t) ? W.fromPositions(n, n) : W.fromPositions(t, n);
		}
		findWordContaining(e) {
			if (e < 0 || e >= this.elements.length || !br(this.elements[e])) return;
			let t = e;
			for (; t > 0 && br(this.elements[t - 1]);) t--;
			let n = e;
			for (; n < this.elements.length && br(this.elements[n]);) n++;
			return new J(t, n);
		}
		countLinesIn(e) {
			return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
		}
		isStronglyEqual(e, t) {
			return this.elements[e] === this.elements[t];
		}
		extendToFullLines(e) {
			return new J(lt(this.firstElementOffsetByLineIdx, (t) => t <= e.start) ?? 0, fu(this.firstElementOffsetByLineIdx, (t) => e.endExclusive <= t) ?? this.elements.length);
		}
	};
	function br(e) {
		return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
	}
	const Ru = {
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
	function Ks(e) {
		return Ru[e];
	}
	function e1(e) {
		return e === 10 ? 8 : e === 13 ? 7 : pr(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
	}
	function Eu(e, t, n, r, i, s) {
		let { moves: o, excludedChanges: l } = Cu(e, t, n, s);
		if (!s.isValid()) return [];
		const a = Tu(e.filter((u) => !l.has(u)), r, i, t, n, s);
		return Lu(o, a), o = Pu(o), o = o.filter((u) => {
			const h = u.original.toOffsetRange().slice(t).map((f) => f.trim());
			return h.join(`
`).length >= 15 && Mu(h, (f) => f.length >= 2) >= 2;
		}), o = Iu(e, o), o;
	}
	function Mu(e, t) {
		let n = 0;
		for (const r of e) t(r) && n++;
		return n;
	}
	function Cu(e, t, n, r) {
		const i = [], s = e.filter((a) => a.modified.isEmpty && a.original.length >= 3).map((a) => new Qs(a.original, t, a)), o = new Set(e.filter((a) => a.original.isEmpty && a.modified.length >= 3).map((a) => new Qs(a.modified, n, a))), l = /* @__PURE__ */ new Set();
		for (const a of s) {
			let u = -1, h;
			for (const f of o) {
				const d = a.computeSimilarity(f);
				d > u && (u = d, h = f);
			}
			if (u > .9 && h && (o.delete(h), i.push(new ut(a.range, h.range)), l.add(a.source), l.add(h.source)), !r.isValid()) return {
				moves: i,
				excludedChanges: l
			};
		}
		return {
			moves: i,
			excludedChanges: l
		};
	}
	function Tu(e, t, n, r, i, s) {
		const o = [], l = new Yl();
		for (const d of e) for (let m = d.original.startLineNumber; m < d.original.endLineNumberExclusive - 2; m++) {
			const g = `${t[m - 1]}:${t[m + 1 - 1]}:${t[m + 2 - 1]}`;
			l.add(g, { range: new H(m, m + 3) });
		}
		const a = [];
		e.sort(ln((d) => d.modified.startLineNumber, un));
		for (const d of e) {
			let m = [];
			for (let g = d.modified.startLineNumber; g < d.modified.endLineNumberExclusive - 2; g++) {
				const p = `${n[g - 1]}:${n[g + 1 - 1]}:${n[g + 2 - 1]}`, w = new H(g, g + 3), _ = [];
				l.forEach(p, ({ range: N }) => {
					for (const y of m) if (y.originalLineRange.endLineNumberExclusive + 1 === N.endLineNumberExclusive && y.modifiedLineRange.endLineNumberExclusive + 1 === w.endLineNumberExclusive) {
						y.originalLineRange = new H(y.originalLineRange.startLineNumber, N.endLineNumberExclusive), y.modifiedLineRange = new H(y.modifiedLineRange.startLineNumber, w.endLineNumberExclusive), _.push(y);
						return;
					}
					const v = {
						modifiedLineRange: w,
						originalLineRange: N
					};
					a.push(v), _.push(v);
				}), m = _;
			}
			if (!s.isValid()) return [];
		}
		a.sort(Nu(ln((d) => d.modifiedLineRange.length, un)));
		const u = new on(), h = new on();
		for (const d of a) {
			const m = d.modifiedLineRange.startLineNumber - d.originalLineRange.startLineNumber, g = u.subtractFrom(d.modifiedLineRange), p = h.subtractFrom(d.originalLineRange).getWithDelta(m), w = g.getIntersection(p);
			for (const _ of w.ranges) {
				if (_.length < 3) continue;
				const N = _, v = _.delta(-m);
				o.push(new ut(v, N)), u.addRange(N), h.addRange(v);
			}
		}
		o.sort(ln((d) => d.original.startLineNumber, un));
		const f = new Hs(e);
		for (let d = 0; d < o.length; d++) {
			const m = o[d], g = f.findLastMonotonous((L) => L.original.startLineNumber <= m.original.startLineNumber), p = lt(e, (L) => L.modified.startLineNumber <= m.modified.startLineNumber), w = Math.max(m.original.startLineNumber - g.original.startLineNumber, m.modified.startLineNumber - p.modified.startLineNumber), _ = f.findLastMonotonous((L) => L.original.startLineNumber < m.original.endLineNumberExclusive), N = lt(e, (L) => L.modified.startLineNumber < m.modified.endLineNumberExclusive), v = Math.max(_.original.endLineNumberExclusive - m.original.endLineNumberExclusive, N.modified.endLineNumberExclusive - m.modified.endLineNumberExclusive);
			let y;
			for (y = 0; y < w; y++) {
				const L = m.original.startLineNumber - y - 1, S = m.modified.startLineNumber - y - 1;
				if (L > r.length || S > i.length || u.contains(S) || h.contains(L) || !t1(r[L - 1], i[S - 1], s)) break;
			}
			y > 0 && (h.addRange(new H(m.original.startLineNumber - y, m.original.startLineNumber)), u.addRange(new H(m.modified.startLineNumber - y, m.modified.startLineNumber)));
			let b;
			for (b = 0; b < v; b++) {
				const L = m.original.endLineNumberExclusive + b, S = m.modified.endLineNumberExclusive + b;
				if (L > r.length || S > i.length || u.contains(S) || h.contains(L) || !t1(r[L - 1], i[S - 1], s)) break;
			}
			b > 0 && (h.addRange(new H(m.original.endLineNumberExclusive, m.original.endLineNumberExclusive + b)), u.addRange(new H(m.modified.endLineNumberExclusive, m.modified.endLineNumberExclusive + b))), (y > 0 || b > 0) && (o[d] = new ut(new H(m.original.startLineNumber - y, m.original.endLineNumberExclusive + b), new H(m.modified.startLineNumber - y, m.modified.endLineNumberExclusive + b)));
		}
		return o;
	}
	function t1(e, t, n) {
		if (e.trim() === t.trim()) return !0;
		if (e.length > 300 && t.length > 300) return !1;
		const r = new Ys().compute(new cn([e], new W(1, 1, 1, e.length), !1), new cn([t], new W(1, 1, 1, t.length), !1), n);
		let i = 0;
		const s = me.invert(r.diffs, e.length);
		for (const a of s) a.seq1Range.forEach((u) => {
			pr(e.charCodeAt(u)) || i++;
		});
		function o(a) {
			let u = 0;
			for (let h = 0; h < e.length; h++) pr(a.charCodeAt(h)) || u++;
			return u;
		}
		const l = o(e.length > t.length ? e : t);
		return i / l > .6 && l > 10;
	}
	function Pu(e) {
		if (e.length === 0) return e;
		e.sort(ln((n) => n.original.startLineNumber, un));
		const t = [e[0]];
		for (let n = 1; n < e.length; n++) {
			const r = t[t.length - 1], i = e[n], s = i.original.startLineNumber - r.original.endLineNumberExclusive, o = i.modified.startLineNumber - r.modified.endLineNumberExclusive;
			if (s >= 0 && o >= 0 && s + o <= 2) {
				t[t.length - 1] = r.join(i);
				continue;
			}
			t.push(i);
		}
		return t;
	}
	function Iu(e, t) {
		const n = new Hs(e);
		return t = t.filter((r) => (n.findLastMonotonous((i) => i.original.startLineNumber < r.original.endLineNumberExclusive) || new ut(new H(1, 1), new H(1, 1))) !== lt(e, (i) => i.modified.startLineNumber < r.modified.endLineNumberExclusive)), t;
	}
	function n1(e, t, n) {
		let r = n;
		return r = r1(e, t, r), r = r1(e, t, r), r = Fu(e, t, r), r;
	}
	function r1(e, t, n) {
		if (n.length === 0) return n;
		const r = [];
		r.push(n[0]);
		for (let s = 1; s < n.length; s++) {
			const o = r[r.length - 1];
			let l = n[s];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const a = l.seq1Range.start - o.seq1Range.endExclusive;
				let u;
				for (u = 1; u <= a && !(e.getElement(l.seq1Range.start - u) !== e.getElement(l.seq1Range.endExclusive - u) || t.getElement(l.seq2Range.start - u) !== t.getElement(l.seq2Range.endExclusive - u)); u++);
				if (u--, u === a) {
					r[r.length - 1] = new me(new J(o.seq1Range.start, l.seq1Range.endExclusive - a), new J(o.seq2Range.start, l.seq2Range.endExclusive - a));
					continue;
				}
				l = l.delta(-u);
			}
			r.push(l);
		}
		const i = [];
		for (let s = 0; s < r.length - 1; s++) {
			const o = r[s + 1];
			let l = r[s];
			if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
				const a = o.seq1Range.start - l.seq1Range.endExclusive;
				let u;
				for (u = 0; u < a && !(!e.isStronglyEqual(l.seq1Range.start + u, l.seq1Range.endExclusive + u) || !t.isStronglyEqual(l.seq2Range.start + u, l.seq2Range.endExclusive + u)); u++);
				if (u === a) {
					r[s + 1] = new me(new J(l.seq1Range.start + a, o.seq1Range.endExclusive), new J(l.seq2Range.start + a, o.seq2Range.endExclusive));
					continue;
				}
				u > 0 && (l = l.delta(u));
			}
			i.push(l);
		}
		return r.length > 0 && i.push(r[r.length - 1]), i;
	}
	function Fu(e, t, n) {
		if (!e.getBoundaryScore || !t.getBoundaryScore) return n;
		for (let r = 0; r < n.length; r++) {
			const i = r > 0 ? n[r - 1] : void 0, s = n[r], o = r + 1 < n.length ? n[r + 1] : void 0, l = new J(i ? i.seq1Range.endExclusive + 1 : 0, o ? o.seq1Range.start - 1 : e.length), a = new J(i ? i.seq2Range.endExclusive + 1 : 0, o ? o.seq2Range.start - 1 : t.length);
			s.seq1Range.isEmpty ? n[r] = i1(s, e, t, l, a) : s.seq2Range.isEmpty && (n[r] = i1(s.swap(), t, e, a, l).swap());
		}
		return n;
	}
	function i1(e, t, n, r, i) {
		let o = 1;
		for (; e.seq1Range.start - o >= r.start && e.seq2Range.start - o >= i.start && n.isStronglyEqual(e.seq2Range.start - o, e.seq2Range.endExclusive - o) && o < 100;) o++;
		o--;
		let l = 0;
		for (; e.seq1Range.start + l < r.endExclusive && e.seq2Range.endExclusive + l < i.endExclusive && n.isStronglyEqual(e.seq2Range.start + l, e.seq2Range.endExclusive + l) && l < 100;) l++;
		if (o === 0 && l === 0) return e;
		let a = 0, u = -1;
		for (let h = -o; h <= l; h++) {
			const f = e.seq2Range.start + h, d = e.seq2Range.endExclusive + h, m = e.seq1Range.start + h, g = t.getBoundaryScore(m) + n.getBoundaryScore(f) + n.getBoundaryScore(d);
			g > u && (u = g, a = h);
		}
		return e.delta(a);
	}
	function Vu(e, t, n) {
		const r = [];
		for (const i of n) {
			const s = r[r.length - 1];
			if (!s) {
				r.push(i);
				continue;
			}
			i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new me(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)) : r.push(i);
		}
		return r;
	}
	function Du(e, t, n) {
		const r = me.invert(n, e.length), i = [];
		let s = new Qe(0, 0);
		function o(l, a) {
			if (l.offset1 < s.offset1 || l.offset2 < s.offset2) return;
			const u = e.findWordContaining(l.offset1), h = t.findWordContaining(l.offset2);
			if (!u || !h) return;
			let f = new me(u, h);
			const d = f.intersect(a);
			let m = d.seq1Range.length, g = d.seq2Range.length;
			for (; r.length > 0;) {
				const p = r[0];
				if (!(p.seq1Range.intersects(f.seq1Range) || p.seq2Range.intersects(f.seq2Range))) break;
				const w = new me(e.findWordContaining(p.seq1Range.start), t.findWordContaining(p.seq2Range.start)), _ = w.intersect(p);
				if (m += _.seq1Range.length, g += _.seq2Range.length, f = f.join(w), f.seq1Range.endExclusive >= p.seq1Range.endExclusive) r.shift();
				else break;
			}
			m + g < (f.seq1Range.length + f.seq2Range.length) * 2 / 3 && i.push(f), s = f.getEndExclusives();
		}
		for (; r.length > 0;) {
			const l = r.shift();
			l.seq1Range.isEmpty || (o(l.getStarts(), l), o(l.getEndExclusives().delta(-1), l));
		}
		return Ou(n, i);
	}
	function Ou(e, t) {
		const n = [];
		for (; e.length > 0 || t.length > 0;) {
			const r = e[0], i = t[0];
			let s;
			r && (!i || r.seq1Range.start < i.seq1Range.start) ? s = e.shift() : s = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= s.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(s) : n.push(s);
		}
		return n;
	}
	function $u(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const l = [r[0]];
			for (let a = 1; a < r.length; a++) {
				let f = function(d, m) {
					const g = new J(h.seq1Range.endExclusive, u.seq1Range.start);
					return e.getText(g).replace(/\s/g, "").length <= 4 && (d.seq1Range.length + d.seq2Range.length > 5 || m.seq1Range.length + m.seq2Range.length > 5);
				};
				const u = r[a], h = l[l.length - 1];
				f(h, u) ? (s = !0, l[l.length - 1] = l[l.length - 1].join(u)) : l.push(u);
			}
			r = l;
		} while (i++ < 10 && s);
		return r;
	}
	function Bu(e, t, n) {
		let r = n;
		if (r.length === 0) return r;
		let i = 0, s;
		do {
			s = !1;
			const a = [r[0]];
			for (let u = 1; u < r.length; u++) {
				let d = function(m, g) {
					const p = new J(f.seq1Range.endExclusive, h.seq1Range.start);
					if (e.countLinesIn(p) > 5 || p.length > 500) return !1;
					const w = e.getText(p).trim();
					if (w.length > 20 || w.split(/\r\n|\r|\n/).length > 1) return !1;
					const _ = e.countLinesIn(m.seq1Range), N = m.seq1Range.length, v = t.countLinesIn(m.seq2Range), y = m.seq2Range.length, b = e.countLinesIn(g.seq1Range), L = g.seq1Range.length, S = t.countLinesIn(g.seq2Range), T = g.seq2Range.length, F = 130;
					function D(M) {
						return Math.min(M, F);
					}
					return Math.pow(Math.pow(D(_ * 40 + N), 1.5) + Math.pow(D(v * 40 + y), 1.5), 1.5) + Math.pow(Math.pow(D(b * 40 + L), 1.5) + Math.pow(D(S * 40 + T), 1.5), 1.5) > (F ** 1.5) ** 1.5 * 1.3;
				};
				const h = r[u], f = a[a.length - 1];
				d(f, h) ? (s = !0, a[a.length - 1] = a[a.length - 1].join(h)) : a.push(h);
			}
			r = a;
		} while (i++ < 10 && s);
		const o = [];
		return _u(r, (a, u, h) => {
			let f = u;
			function d(N) {
				return N.length > 0 && N.trim().length <= 3 && u.seq1Range.length + u.seq2Range.length > 100;
			}
			const m = e.extendToFullLines(u.seq1Range), g = e.getText(new J(m.start, u.seq1Range.start));
			d(g) && (f = f.deltaStart(-g.length));
			const p = e.getText(new J(u.seq1Range.endExclusive, m.endExclusive));
			d(p) && (f = f.deltaEnd(p.length));
			const w = me.fromOffsetPairs(a ? a.getEndExclusives() : Qe.zero, h ? h.getStarts() : Qe.max), _ = f.intersect(w);
			o.length > 0 && _.getStarts().equals(o[o.length - 1].getEndExclusives()) ? o[o.length - 1] = o[o.length - 1].join(_) : o.push(_);
		}), o;
	}
	var s1 = class {
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
			return 1e3 - ((e === 0 ? 0 : o1(this.lines[e - 1])) + (e === this.lines.length ? 0 : o1(this.lines[e])));
		}
		getText(e) {
			return this.lines.slice(e.start, e.endExclusive).join(`
`);
		}
		isStronglyEqual(e, t) {
			return this.lines[e] === this.lines[t];
		}
	};
	function o1(e) {
		let t = 0;
		for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9);) t++;
		return t;
	}
	var Uu = class {
		constructor() {
			this.dynamicProgrammingDiffing = new Au(), this.myersDiffingAlgorithm = new Ys();
		}
		computeDiff(e, t, n) {
			if (e.length <= 1 && yu(e, t, (y, b) => y === b)) return new sn([], [], !1);
			if (e.length === 1 && e[0].length === 0 || t.length === 1 && t[0].length === 0) return new sn([new Ct(new H(1, e.length + 1), new H(1, t.length + 1), [new Ve(new W(1, 1, e.length, e[e.length - 1].length + 1), new W(1, 1, t.length, t[t.length - 1].length + 1))])], [], !1);
			const r = n.maxComputationTimeMs === 0 ? dr.instance : new Su(n.maxComputationTimeMs), i = !n.ignoreTrimWhitespace, s = /* @__PURE__ */ new Map();
			function o(y) {
				let b = s.get(y);
				return b === void 0 && (b = s.size, s.set(y, b)), b;
			}
			const l = e.map((y) => o(y.trim())), a = t.map((y) => o(y.trim())), u = new s1(l, e), h = new s1(a, t), f = u.length + h.length < 1700 ? this.dynamicProgrammingDiffing.compute(u, h, r, (y, b) => e[y] === t[b] ? t[b].length === 0 ? .1 : 1 + Math.log(1 + t[b].length) : .99) : this.myersDiffingAlgorithm.compute(u, h, r);
			let d = f.diffs, m = f.hitTimeout;
			d = n1(u, h, d), d = $u(u, h, d);
			const g = [], p = (y) => {
				if (i) for (let b = 0; b < y; b++) {
					const L = w + b, S = _ + b;
					if (e[L] !== t[S]) {
						const T = this.refineDiff(e, t, new me(new J(L, L + 1), new J(S, S + 1)), r, i);
						for (const F of T.mappings) g.push(F);
						T.hitTimeout && (m = !0);
					}
				}
			};
			let w = 0, _ = 0;
			for (const y of d) {
				rn(() => y.seq1Range.start - w === y.seq2Range.start - _), p(y.seq1Range.start - w), w = y.seq1Range.endExclusive, _ = y.seq2Range.endExclusive;
				const b = this.refineDiff(e, t, y, r, i);
				b.hitTimeout && (m = !0);
				for (const L of b.mappings) g.push(L);
			}
			p(e.length - w);
			const N = a1(g, e, t);
			let v = [];
			return n.computeMoves && (v = this.computeMoves(N, e, t, l, a, r, i)), rn(() => {
				function y(L, S) {
					if (L.lineNumber < 1 || L.lineNumber > S.length) return !1;
					const T = S[L.lineNumber - 1];
					return !(L.column < 1 || L.column > T.length + 1);
				}
				function b(L, S) {
					return !(L.startLineNumber < 1 || L.startLineNumber > S.length + 1 || L.endLineNumberExclusive < 1 || L.endLineNumberExclusive > S.length + 1);
				}
				for (const L of N) {
					if (!L.innerChanges) return !1;
					for (const S of L.innerChanges) if (!(y(S.modifiedRange.getStartPosition(), t) && y(S.modifiedRange.getEndPosition(), t) && y(S.originalRange.getStartPosition(), e) && y(S.originalRange.getEndPosition(), e))) return !1;
					if (!b(L.modified, t) || !b(L.original, e)) return !1;
				}
				return !0;
			}), new sn(N, v, m);
		}
		computeMoves(e, t, n, r, i, s, o) {
			return Eu(e, t, n, r, i, s).map((l) => new cu(l, a1(this.refineDiff(t, n, new me(l.original.toOffsetRange(), l.modified.toOffsetRange()), s, o).mappings, t, n, !0)));
		}
		refineDiff(e, t, n, r, i) {
			const s = ju(n).toRangeMapping2(e, t), o = new cn(e, s.originalRange, i), l = new cn(t, s.modifiedRange, i), a = o.length + l.length < 500 ? this.dynamicProgrammingDiffing.compute(o, l, r) : this.myersDiffingAlgorithm.compute(o, l, r);
			let u = a.diffs;
			return u = n1(o, l, u), u = Du(o, l, u), u = Vu(o, l, u), u = Bu(o, l, u), {
				mappings: u.map((h) => new Ve(o.translateRange(h.seq1Range), l.translateRange(h.seq2Range))),
				hitTimeout: a.hitTimeout
			};
		}
	};
	function a1(e, t, n, r = !1) {
		const i = [];
		for (const s of vu(e.map((o) => qu(o, t, n)), (o, l) => o.original.overlapOrTouch(l.original) || o.modified.overlapOrTouch(l.modified))) {
			const o = s[0], l = s[s.length - 1];
			i.push(new Ct(o.original.join(l.original), o.modified.join(l.modified), s.map((a) => a.innerChanges[0])));
		}
		return rn(() => !r && i.length > 0 && (i[0].modified.startLineNumber !== i[0].original.startLineNumber || n.length - i[i.length - 1].modified.endLineNumberExclusive !== t.length - i[i.length - 1].original.endLineNumberExclusive) ? !1 : $s(i, (s, o) => o.original.startLineNumber - s.original.endLineNumberExclusive === o.modified.startLineNumber - s.modified.endLineNumberExclusive && s.original.endLineNumberExclusive < o.original.startLineNumber && s.modified.endLineNumberExclusive < o.modified.startLineNumber)), i;
	}
	function qu(e, t, n) {
		let r = 0, i = 0;
		return e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (i = -1), e.modifiedRange.startColumn - 1 >= n[e.modifiedRange.startLineNumber - 1].length && e.originalRange.startColumn - 1 >= t[e.originalRange.startLineNumber - 1].length && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + i && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + i && (r = 1), new Ct(new H(e.originalRange.startLineNumber + r, e.originalRange.endLineNumber + 1 + i), new H(e.modifiedRange.startLineNumber + r, e.modifiedRange.endLineNumber + 1 + i), [e]);
	}
	function ju(e) {
		return new ut(new H(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new H(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
	}
	const l1 = {
		getLegacy: () => new du(),
		getDefault: () => new Uu()
	};
	function He(e, t) {
		const n = Math.pow(10, t);
		return Math.round(e * n) / n;
	}
	var se = class {
		constructor(e, t, n, r = 1) {
			this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, t)) | 0, this.b = Math.min(255, Math.max(0, n)) | 0, this.a = He(Math.max(Math.min(1, r), 0), 3);
		}
		static equals(e, t) {
			return e.r === t.r && e.g === t.g && e.b === t.b && e.a === t.a;
		}
	}, Ye = class Ht {
		constructor(t, n, r, i) {
			this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = He(Math.max(Math.min(1, n), 0), 3), this.l = He(Math.max(Math.min(1, r), 0), 3), this.a = He(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = t.a, o = Math.max(n, r, i), l = Math.min(n, r, i);
			let a = 0, u = 0;
			const h = (l + o) / 2, f = o - l;
			if (f > 0) {
				switch (u = Math.min(h <= .5 ? f / (2 * h) : f / (2 - 2 * h), 1), o) {
					case n:
						a = (r - i) / f + (r < i ? 6 : 0);
						break;
					case r:
						a = (i - n) / f + 2;
						break;
					case i:
						a = (n - r) / f + 4;
						break;
				}
				a *= 60, a = Math.round(a);
			}
			return new Ht(a, u, h, s);
		}
		static _hue2rgb(t, n, r) {
			return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
		}
		static toRGBA(t) {
			const n = t.h / 360, { s: r, l: i, a: s } = t;
			let o, l, a;
			if (r === 0) o = l = a = i;
			else {
				const u = i < .5 ? i * (1 + r) : i + r - i * r, h = 2 * i - u;
				o = Ht._hue2rgb(h, u, n + 1 / 3), l = Ht._hue2rgb(h, u, n), a = Ht._hue2rgb(h, u, n - 1 / 3);
			}
			return new se(Math.round(o * 255), Math.round(l * 255), Math.round(a * 255), s);
		}
	}, fn = class ta {
		constructor(t, n, r, i) {
			this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = He(Math.max(Math.min(1, n), 0), 3), this.v = He(Math.max(Math.min(1, r), 0), 3), this.a = He(Math.max(Math.min(1, i), 0), 3);
		}
		static equals(t, n) {
			return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
		}
		static fromRGBA(t) {
			const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = Math.max(n, r, i), o = s - Math.min(n, r, i), l = s === 0 ? 0 : o / s;
			let a;
			return o === 0 ? a = 0 : s === n ? a = ((r - i) / o % 6 + 6) % 6 : s === r ? a = (i - n) / o + 2 : a = (n - r) / o + 4, new ta(Math.round(a * 60), l, s, t.a);
		}
		static toRGBA(t) {
			const { h: n, s: r, v: i, a: s } = t, o = i * r, l = o * (1 - Math.abs(n / 60 % 2 - 1)), a = i - o;
			let [u, h, f] = [
				0,
				0,
				0
			];
			return n < 60 ? (u = o, h = l) : n < 120 ? (u = l, h = o) : n < 180 ? (h = o, f = l) : n < 240 ? (h = l, f = o) : n < 300 ? (u = l, f = o) : n <= 360 && (u = o, f = l), u = Math.round((u + a) * 255), h = Math.round((h + a) * 255), f = Math.round((f + a) * 255), new se(u, h, f, s);
		}
	}, hn = class ie {
		static fromHex(t) {
			return ie.Format.CSS.parseHex(t) || ie.red;
		}
		static equals(t, n) {
			return !t && !n ? !0 : !t || !n ? !1 : t.equals(n);
		}
		get hsla() {
			return this._hsla ? this._hsla : Ye.fromRGBA(this.rgba);
		}
		get hsva() {
			return this._hsva ? this._hsva : fn.fromRGBA(this.rgba);
		}
		constructor(t) {
			if (t) if (t instanceof se) this.rgba = t;
			else if (t instanceof Ye) this._hsla = t, this.rgba = Ye.toRGBA(t);
			else if (t instanceof fn) this._hsva = t, this.rgba = fn.toRGBA(t);
			else throw new Error("Invalid color ctor argument");
			else throw new Error("Color needs a value");
		}
		equals(t) {
			return !!t && se.equals(this.rgba, t.rgba) && Ye.equals(this.hsla, t.hsla) && fn.equals(this.hsva, t.hsva);
		}
		getRelativeLuminance() {
			const t = ie._relativeLuminanceForComponent(this.rgba.r), n = ie._relativeLuminanceForComponent(this.rgba.g), r = ie._relativeLuminanceForComponent(this.rgba.b);
			return He(.2126 * t + .7152 * n + .0722 * r, 4);
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
			return new ie(new Ye(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * t, this.hsla.a));
		}
		darken(t) {
			return new ie(new Ye(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * t, this.hsla.a));
		}
		transparent(t) {
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new ie(new se(n, r, i, s * t));
		}
		isTransparent() {
			return this.rgba.a === 0;
		}
		isOpaque() {
			return this.rgba.a === 1;
		}
		opposite() {
			return new ie(new se(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
		}
		makeOpaque(t) {
			if (this.isOpaque() || t.rgba.a !== 1) return this;
			const { r: n, g: r, b: i, a: s } = this.rgba;
			return new ie(new se(t.rgba.r - s * (t.rgba.r - n), t.rgba.g - s * (t.rgba.g - r), t.rgba.b - s * (t.rgba.b - i), 1));
		}
		toString() {
			return this._toString || (this._toString = ie.Format.CSS.format(this)), this._toString;
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
			this.white = new ie(new se(255, 255, 255, 1));
		}
		static {
			this.black = new ie(new se(0, 0, 0, 1));
		}
		static {
			this.red = new ie(new se(255, 0, 0, 1));
		}
		static {
			this.blue = new ie(new se(0, 0, 255, 1));
		}
		static {
			this.green = new ie(new se(0, 255, 0, 1));
		}
		static {
			this.cyan = new ie(new se(0, 255, 255, 1));
		}
		static {
			this.lightgrey = new ie(new se(211, 211, 211, 1));
		}
		static {
			this.transparent = new ie(new se(0, 0, 0, 0));
		}
	};
	(function(e) {
		(function(t) {
			(function(n) {
				function r(m) {
					return m.rgba.a === 1 ? `rgb(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b})` : e.Format.CSS.formatRGBA(m);
				}
				n.formatRGB = r;
				function i(m) {
					return `rgba(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b}, ${+m.rgba.a.toFixed(2)})`;
				}
				n.formatRGBA = i;
				function s(m) {
					return m.hsla.a === 1 ? `hsl(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(m);
				}
				n.formatHSL = s;
				function o(m) {
					return `hsla(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%, ${m.hsla.a.toFixed(2)})`;
				}
				n.formatHSLA = o;
				function l(m) {
					const g = m.toString(16);
					return g.length !== 2 ? "0" + g : g;
				}
				function a(m) {
					return `#${l(m.rgba.r)}${l(m.rgba.g)}${l(m.rgba.b)}`;
				}
				n.formatHex = a;
				function u(m, g = !1) {
					return g && m.rgba.a === 1 ? e.Format.CSS.formatHex(m) : `#${l(m.rgba.r)}${l(m.rgba.g)}${l(m.rgba.b)}${l(Math.round(m.rgba.a * 255))}`;
				}
				n.formatHexA = u;
				function h(m) {
					return m.isOpaque() ? e.Format.CSS.formatHex(m) : e.Format.CSS.formatRGBA(m);
				}
				n.format = h;
				function f(m) {
					const g = m.length;
					if (g === 0 || m.charCodeAt(0) !== 35) return null;
					if (g === 7) return new e(new se(16 * d(m.charCodeAt(1)) + d(m.charCodeAt(2)), 16 * d(m.charCodeAt(3)) + d(m.charCodeAt(4)), 16 * d(m.charCodeAt(5)) + d(m.charCodeAt(6)), 1));
					if (g === 9) return new e(new se(16 * d(m.charCodeAt(1)) + d(m.charCodeAt(2)), 16 * d(m.charCodeAt(3)) + d(m.charCodeAt(4)), 16 * d(m.charCodeAt(5)) + d(m.charCodeAt(6)), (16 * d(m.charCodeAt(7)) + d(m.charCodeAt(8))) / 255));
					if (g === 4) {
						const p = d(m.charCodeAt(1)), w = d(m.charCodeAt(2)), _ = d(m.charCodeAt(3));
						return new e(new se(16 * p + p, 16 * w + w, 16 * _ + _));
					}
					if (g === 5) {
						const p = d(m.charCodeAt(1)), w = d(m.charCodeAt(2)), _ = d(m.charCodeAt(3)), N = d(m.charCodeAt(4));
						return new e(new se(16 * p + p, 16 * w + w, 16 * _ + _, (16 * N + N) / 255));
					}
					return null;
				}
				n.parseHex = f;
				function d(m) {
					switch (m) {
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
	})(hn || (hn = {}));
	function u1(e) {
		const t = [];
		for (const n of e) {
			const r = Number(n);
			(r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
		}
		return t;
	}
	function yr(e, t, n, r) {
		return {
			red: e / 255,
			blue: n / 255,
			green: t / 255,
			alpha: r
		};
	}
	function Tt(e, t) {
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
	function Wu(e, t) {
		if (!e) return;
		const n = hn.Format.CSS.parseHex(t);
		if (n) return {
			range: e,
			color: yr(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
		};
	}
	function c1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = u1(t[0].values());
		return {
			range: e,
			color: yr(r[0], r[1], r[2], n ? r[3] : 1)
		};
	}
	function f1(e, t, n) {
		if (!e || t.length !== 1) return;
		const r = u1(t[0].values()), i = new hn(new Ye(r[0], r[1] / 100, r[2] / 100, n ? r[3] : 1));
		return {
			range: e,
			color: yr(i.rgba.r, i.rgba.g, i.rgba.b, i.rgba.a)
		};
	}
	function Pt(e, t) {
		return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
	}
	function Hu(e) {
		const t = [], n = Pt(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
		if (n.length > 0) for (const r of n) {
			const i = r.filter((a) => a !== void 0), s = i[1], o = i[2];
			if (!o) continue;
			let l;
			s === "rgb" ? l = c1(Tt(e, r), Pt(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm), !1) : s === "rgba" ? l = c1(Tt(e, r), Pt(o, /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : s === "hsl" ? l = f1(Tt(e, r), Pt(o, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm), !1) : s === "hsla" ? l = f1(Tt(e, r), Pt(o, /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm), !0) : s === "#" && (l = Wu(Tt(e, r), s + o)), l && t.push(l);
		}
		return t;
	}
	function zu(e) {
		return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : Hu(e);
	}
	const h1 = /* @__PURE__ */ new RegExp("\\bMARK:\\s*(.*)$", "d"), Gu = /^-+|-+$/g;
	function Ju(e, t) {
		let n = [];
		if (t.findRegionSectionHeaders && t.foldingRules?.markers) {
			const r = Xu(e, t);
			n = n.concat(r);
		}
		if (t.findMarkSectionHeaders) {
			const r = Qu(e);
			n = n.concat(r);
		}
		return n;
	}
	function Xu(e, t) {
		const n = [], r = e.getLineCount();
		for (let i = 1; i <= r; i++) {
			const s = e.getLineContent(i), o = s.match(t.foldingRules.markers.start);
			if (o) {
				const l = {
					startLineNumber: i,
					startColumn: o[0].length + 1,
					endLineNumber: i,
					endColumn: s.length + 1
				};
				if (l.endColumn > l.startColumn) {
					const a = {
						range: l,
						...m1(s.substring(o[0].length)),
						shouldBeInComments: !1
					};
					(a.text || a.hasSeparatorLine) && n.push(a);
				}
			}
		}
		return n;
	}
	function Qu(e) {
		const t = [], n = e.getLineCount();
		for (let r = 1; r <= n; r++) Yu(e.getLineContent(r), r, t);
		return t;
	}
	function Yu(e, t, n) {
		h1.lastIndex = 0;
		const r = h1.exec(e);
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
					...m1(r[1]),
					shouldBeInComments: !0
				};
				(s.text || s.hasSeparatorLine) && n.push(s);
			}
		}
	}
	function m1(e) {
		e = e.trim();
		const t = e.startsWith("-");
		return e = e.replace(Gu, ""), {
			text: e,
			hasSeparatorLine: t
		};
	}
	(function() {
		typeof globalThis.requestIdleCallback != "function" || globalThis.cancelIdleCallback;
	})();
	var d1;
	(function(e) {
		async function t(r) {
			let i;
			const s = await Promise.all(r.map((o) => o.then((l) => l, (l) => {
				i || (i = l);
			})));
			if (typeof i < "u") throw i;
			return s;
		}
		e.settled = t;
		function n(r) {
			return new Promise(async (i, s) => {
				try {
					await r(i, s);
				} catch (o) {
					s(o);
				}
			});
		}
		e.withAsyncBody = n;
	})(d1 || (d1 = {}));
	(class ye {
		static fromArray(t) {
			return new ye((n) => {
				n.emitMany(t);
			});
		}
		static fromPromise(t) {
			return new ye(async (n) => {
				n.emitMany(await t);
			});
		}
		static fromPromises(t) {
			return new ye(async (n) => {
				await Promise.all(t.map(async (r) => n.emitOne(await r)));
			});
		}
		static merge(t) {
			return new ye(async (n) => {
				await Promise.all(t.map(async (r) => {
					for await (const i of r) n.emitOne(i);
				}));
			});
		}
		static {
			this.EMPTY = ye.fromArray([]);
		}
		constructor(t, n) {
			this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new ve(), queueMicrotask(async () => {
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
						await Xt.toPromise(this._onStateChanged.event);
					} while (!0);
				},
				return: async () => (this._onReturn?.(), {
					done: !0,
					value: void 0
				})
			};
		}
		static map(t, n) {
			return new ye(async (r) => {
				for await (const i of t) r.emitOne(n(i));
			});
		}
		map(t) {
			return ye.map(this, t);
		}
		static filter(t, n) {
			return new ye(async (r) => {
				for await (const i of t) n(i) && r.emitOne(i);
			});
		}
		filter(t) {
			return ye.filter(this, t);
		}
		static coalesce(t) {
			return ye.filter(t, (n) => !!n);
		}
		coalesce() {
			return ye.coalesce(this);
		}
		static async toPromise(t) {
			const n = [];
			for await (const r of t) n.push(r);
			return n;
		}
		toPromise() {
			return ye.toPromise(this);
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
	var Ku = class {
		constructor(e) {
			this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
		}
		insertValues(e, t) {
			e = at(e);
			const n = this.values, r = this.prefixSum, i = t.length;
			return i === 0 ? !1 : (this.values = new Uint32Array(n.length + i), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e), e + i), this.values.set(t, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		setValue(e, t) {
			return e = at(e), t = at(t), this.values[e] === t ? !1 : (this.values[e] = t, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
		}
		removeValues(e, t) {
			e = at(e), t = at(t);
			const n = this.values, r = this.prefixSum;
			if (e >= n.length) return !1;
			const i = n.length - e;
			return t >= i && (t = i), t === 0 ? !1 : (this.values = new Uint32Array(n.length - t), this.values.set(n.subarray(0, e), 0), this.values.set(n.subarray(e + t), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
		}
		getTotalSum() {
			return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
		}
		getPrefixSum(e) {
			return e < 0 ? 0 : (e = at(e), this._getPrefixSum(e));
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
			return new ec(r, e - s);
		}
	}, ec = class {
		constructor(e, t) {
			this.index = e, this.remainder = t, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = t;
		}
	}, tc = class {
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
			for (const n of t) this._acceptDeleteRange(n.range), this._acceptInsertText(new Z(n.range.startLineNumber, n.range.startColumn), n.text);
			this._versionId = e.versionId, this._cachedTextValue = null;
		}
		_ensureLineStarts() {
			if (!this._lineStarts) {
				const e = this._eol.length, t = this._lines.length, n = new Uint32Array(t);
				for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
				this._lineStarts = new Ku(n);
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
			const n = Va(t);
			if (n.length === 1) {
				this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
				return;
			}
			n[n.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + n[0]);
			const r = new Uint32Array(n.length - 1);
			for (let i = 1; i < n.length; i++) this._lines.splice(e.lineNumber + i - 1, 0, n[i]), r[i - 1] = n[i].length + this._eol.length;
			this._lineStarts && this._lineStarts.insertValues(e.lineNumber, r);
		}
	}, nc = class {
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
			this._models[e.url] = new rc(Re.parse(e.url), e.lines, e.EOL, e.versionId);
		}
		$acceptModelChanged(e, t) {
			this._models[e] && this._models[e].onEvents(t);
		}
		$acceptRemovedModel(e) {
			this._models[e] && delete this._models[e];
		}
	}, rc = class extends tc {
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
				const r = this._lines[n], i = this.offsetAt(new Z(n + 1, 1)), s = r.matchAll(e);
				for (const o of s) (o.index || o.index === 0) && (o.index = o.index + i), t.push(o);
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
			const n = lr(e.column, Us(t), this._lines[e.lineNumber - 1], 0);
			return n ? new W(e.lineNumber, n.startColumn, e.lineNumber, n.endColumn) : null;
		}
		words(e) {
			const t = this._lines, n = this._wordenize.bind(this);
			let r = 0, i = "", s = 0, o = [];
			return { *[Symbol.iterator]() {
				for (;;) if (s < o.length) {
					const l = i.substring(o[s].start, o[s].end);
					s += 1, yield l;
				} else if (r < t.length) i = t[r], o = n(i, e), s = 0, r += 1;
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
			if (!Z.isIPosition(e)) throw new Error("bad position");
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
	}, ic = class {
		constructor() {
			this._workerTextModelSyncServer = new nc();
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
			return r ? lu.computeUnicodeHighlights(r, t, n) : {
				ranges: [],
				hasMore: !1,
				ambiguousCharacterCount: 0,
				invisibleCharacterCount: 0,
				nonBasicAsciiCharacterCount: 0
			};
		}
		async $findSectionHeaders(e, t) {
			const n = this._getModel(e);
			return n ? Ju(n, t) : [];
		}
		async $computeDiff(e, t, n, r) {
			const i = this._getModel(e), s = this._getModel(t);
			return !i || !s ? null : mn.computeDiff(i, s, n, r);
		}
		static computeDiff(e, t, n, r) {
			const i = r === "advanced" ? l1.getDefault() : l1.getLegacy(), s = e.getLinesContent(), o = t.getLinesContent(), l = i.computeDiff(s, o, n), a = l.changes.length > 0 ? !1 : this._modelsAreIdentical(e, t);
			function u(h) {
				return h.map((f) => [
					f.original.startLineNumber,
					f.original.endLineNumberExclusive,
					f.modified.startLineNumber,
					f.modified.endLineNumberExclusive,
					f.innerChanges?.map((d) => [
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
				identical: a,
				quitEarly: l.hitTimeout,
				changes: u(l.changes),
				moves: l.moves.map((h) => [
					h.lineRangeMapping.original.startLineNumber,
					h.lineRangeMapping.original.endLineNumberExclusive,
					h.lineRangeMapping.modified.startLineNumber,
					h.lineRangeMapping.modified.endLineNumberExclusive,
					u(h.changes)
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
			t = t.slice(0).sort((l, a) => l.range && a.range ? W.compareRangesUsingStarts(l.range, a.range) : (l.range ? 0 : 1) - (a.range ? 0 : 1));
			let o = 0;
			for (let l = 1; l < t.length; l++) W.getEndPosition(t[o].range).equals(W.getStartPosition(t[l].range)) ? (t[o].range = W.fromPositions(W.getStartPosition(t[o].range), W.getEndPosition(t[l].range)), t[o].text += t[l].text) : (o++, t[o] = t[l]);
			t.length = o + 1;
			for (let { range: l, text: a, eol: u } of t) {
				if (typeof u == "number" && (s = u), W.isEmpty(l) && !a) continue;
				const h = r.getValueInRange(l);
				if (a = a.replace(/\r\n|\n|\r/g, r.eol), h === a) continue;
				if (Math.max(a.length, h.length) > mn._diffLimit) {
					i.push({
						range: l,
						text: a
					});
					continue;
				}
				const f = _l(h, a, n), d = r.offsetAt(W.lift(l).getStartPosition());
				for (const m of f) {
					const g = r.positionAt(d + m.originalStart), p = r.positionAt(d + m.originalStart + m.originalLength), w = {
						text: a.substr(m.modifiedStart, m.modifiedLength),
						range: {
							startLineNumber: g.lineNumber,
							startColumn: g.column,
							endLineNumber: p.lineNumber,
							endColumn: p.column
						}
					};
					r.getValueInRange(w.range) !== w.text && i.push(w);
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
			return t ? Rl(t) : null;
		}
		async $computeDefaultDocumentColors(e) {
			const t = this._getModel(e);
			return t ? zu(t) : null;
		}
		static {
			this._suggestionsLimit = 1e4;
		}
		async $textualSuggest(e, t, n, r) {
			const i = new ri(), s = new RegExp(n, r), o = /* @__PURE__ */ new Set();
			e: for (const l of e) {
				const a = this._getModel(l);
				if (a) {
					for (const u of a.words(s)) if (!(u === t || !isNaN(Number(u))) && (o.add(u), o.size > mn._suggestionsLimit)) break e;
				}
			}
			return {
				words: Array.from(o),
				duration: i.elapsed()
			};
		}
		async $computeWordRanges(e, t, n, r) {
			const i = this._getModel(e);
			if (!i) return Object.create(null);
			const s = new RegExp(n, r), o = Object.create(null);
			for (let l = t.startLineNumber; l < t.endLineNumber; l++) {
				const a = i.getLineWords(l, s);
				for (const u of a) {
					if (!isNaN(Number(u.word))) continue;
					let h = o[u.word];
					h || (h = [], o[u.word] = h), h.push({
						startLineNumber: l,
						startColumn: u.startColumn,
						endLineNumber: l,
						endColumn: u.endColumn
					});
				}
			}
			return o;
		}
		async $navigateValueSet(e, t, n, r, i) {
			const s = this._getModel(e);
			if (!s) return null;
			const o = new RegExp(r, i);
			t.startColumn === t.endColumn && (t = {
				startLineNumber: t.startLineNumber,
				startColumn: t.startColumn,
				endLineNumber: t.endLineNumber,
				endColumn: t.endColumn + 1
			});
			const l = s.getValueInRange(t), a = s.getWordAtPosition({
				lineNumber: t.startLineNumber,
				column: t.startColumn
			}, o);
			if (!a) return null;
			const u = s.getValueInRange(a);
			return El.INSTANCE.navigateValueSet(t, l, a, u, n);
		}
	}, mn = class extends ic {
		constructor(e, t) {
			super(), this._host = e, this._foreignModuleFactory = t, this._foreignModule = null;
		}
		async $ping() {
			return "pong";
		}
		$loadForeignModule(e, t, n) {
			const i = {
				host: Kl(n, (s, o) => this._host.$fhr(s, o)),
				getMirrorModels: () => this._getModels()
			};
			return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(i, t), Promise.resolve(Fs(this._foreignModule))) : new Promise((s, o) => {
				const l = (a) => {
					this._foreignModule = a.create(i, t), s(Fs(this._foreignModule));
				};
				import(`${bi.asBrowserUri(`${e}.js`).toString(!0)}`).then(l).catch(o);
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
	typeof importScripts == "function" && (globalThis.monaco = Wl());
	let wr = !1;
	function g1(e) {
		if (wr) return;
		wr = !0;
		const t = new yl((n) => {
			globalThis.postMessage(n);
		}, (n) => new mn(Hl.getChannel(n), e));
		globalThis.onmessage = (n) => {
			t.onmessage(n.data);
		};
	}
	globalThis.onmessage = (e) => {
		wr || g1(null);
	};
	function _r(e, t = !1) {
		const n = e.length;
		let r = 0, i = "", s = 0, o = 16, l = 0, a = 0, u = 0, h = 0, f = 0;
		function d(v, y) {
			let b = 0, L = 0;
			for (; b < v || !y;) {
				let S = e.charCodeAt(r);
				if (S >= 48 && S <= 57) L = L * 16 + S - 48;
				else if (S >= 65 && S <= 70) L = L * 16 + S - 65 + 10;
				else if (S >= 97 && S <= 102) L = L * 16 + S - 97 + 10;
				else break;
				r++, b++;
			}
			return b < v && (L = -1), L;
		}
		function m(v) {
			r = v, i = "", s = 0, o = 16, f = 0;
		}
		function g() {
			let v = r;
			if (e.charCodeAt(r) === 48) r++;
			else for (r++; r < e.length && ht(e.charCodeAt(r));) r++;
			if (r < e.length && e.charCodeAt(r) === 46) if (r++, r < e.length && ht(e.charCodeAt(r))) for (r++; r < e.length && ht(e.charCodeAt(r));) r++;
			else return f = 3, e.substring(v, r);
			let y = r;
			if (r < e.length && (e.charCodeAt(r) === 69 || e.charCodeAt(r) === 101)) if (r++, (r < e.length && e.charCodeAt(r) === 43 || e.charCodeAt(r) === 45) && r++, r < e.length && ht(e.charCodeAt(r))) {
				for (r++; r < e.length && ht(e.charCodeAt(r));) r++;
				y = r;
			} else f = 3;
			return e.substring(v, y);
		}
		function p() {
			let v = "", y = r;
			for (;;) {
				if (r >= n) {
					v += e.substring(y, r), f = 2;
					break;
				}
				const b = e.charCodeAt(r);
				if (b === 34) {
					v += e.substring(y, r), r++;
					break;
				}
				if (b === 92) {
					if (v += e.substring(y, r), r++, r >= n) {
						f = 2;
						break;
					}
					switch (e.charCodeAt(r++)) {
						case 34:
							v += "\"";
							break;
						case 92:
							v += "\\";
							break;
						case 47:
							v += "/";
							break;
						case 98:
							v += "\b";
							break;
						case 102:
							v += "\f";
							break;
						case 110:
							v += `
`;
							break;
						case 114:
							v += "\r";
							break;
						case 116:
							v += "	";
							break;
						case 117:
							const L = d(4, !0);
							L >= 0 ? v += String.fromCharCode(L) : f = 4;
							break;
						default: f = 5;
					}
					y = r;
					continue;
				}
				if (b >= 0 && b <= 31) if (It(b)) {
					v += e.substring(y, r), f = 2;
					break;
				} else f = 6;
				r++;
			}
			return v;
		}
		function w() {
			if (i = "", f = 0, s = r, a = l, h = u, r >= n) return s = n, o = 17;
			let v = e.charCodeAt(r);
			if (Lr(v)) {
				do
					r++, i += String.fromCharCode(v), v = e.charCodeAt(r);
				while (Lr(v));
				return o = 15;
			}
			if (It(v)) return r++, i += String.fromCharCode(v), v === 13 && e.charCodeAt(r) === 10 && (r++, i += `
`), l++, u = r, o = 14;
			switch (v) {
				case 123: return r++, o = 1;
				case 125: return r++, o = 2;
				case 91: return r++, o = 3;
				case 93: return r++, o = 4;
				case 58: return r++, o = 6;
				case 44: return r++, o = 5;
				case 34: return r++, i = p(), o = 10;
				case 47:
					const y = r - 1;
					if (e.charCodeAt(r + 1) === 47) {
						for (r += 2; r < n && !It(e.charCodeAt(r));) r++;
						return i = e.substring(y, r), o = 12;
					}
					if (e.charCodeAt(r + 1) === 42) {
						r += 2;
						const b = n - 1;
						let L = !1;
						for (; r < b;) {
							const S = e.charCodeAt(r);
							if (S === 42 && e.charCodeAt(r + 1) === 47) {
								r += 2, L = !0;
								break;
							}
							r++, It(S) && (S === 13 && e.charCodeAt(r) === 10 && r++, l++, u = r);
						}
						return L || (r++, f = 1), i = e.substring(y, r), o = 13;
					}
					return i += String.fromCharCode(v), r++, o = 16;
				case 45: if (i += String.fromCharCode(v), r++, r === n || !ht(e.charCodeAt(r))) return o = 16;
				case 48:
				case 49:
				case 50:
				case 51:
				case 52:
				case 53:
				case 54:
				case 55:
				case 56:
				case 57: return i += g(), o = 11;
				default:
					for (; r < n && _(v);) r++, v = e.charCodeAt(r);
					if (s !== r) {
						switch (i = e.substring(s, r), i) {
							case "true": return o = 8;
							case "false": return o = 9;
							case "null": return o = 7;
						}
						return o = 16;
					}
					return i += String.fromCharCode(v), r++, o = 16;
			}
		}
		function _(v) {
			if (Lr(v) || It(v)) return !1;
			switch (v) {
				case 125:
				case 93:
				case 123:
				case 91:
				case 34:
				case 58:
				case 44:
				case 47: return !1;
			}
			return !0;
		}
		function N() {
			let v;
			do
				v = w();
			while (v >= 12 && v <= 15);
			return v;
		}
		return {
			setPosition: m,
			getPosition: () => r,
			scan: t ? N : w,
			getToken: () => o,
			getTokenValue: () => i,
			getTokenOffset: () => s,
			getTokenLength: () => r - s,
			getTokenStartLine: () => a,
			getTokenStartCharacter: () => s - h,
			getTokenError: () => f
		};
	}
	function Lr(e) {
		return e === 32 || e === 9;
	}
	function It(e) {
		return e === 10 || e === 13;
	}
	function ht(e) {
		return e >= 48 && e <= 57;
	}
	var p1;
	(function(e) {
		e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab";
	})(p1 || (p1 = {}));
	var we = new Array(20).fill(0).map((e, t) => " ".repeat(t)), mt = 200, b1 = {
		" ": {
			"\n": new Array(mt).fill(0).map((e, t) => `
` + " ".repeat(t)),
			"\r": new Array(mt).fill(0).map((e, t) => "\r" + " ".repeat(t)),
			"\r\n": new Array(mt).fill(0).map((e, t) => `\r
` + " ".repeat(t))
		},
		"	": {
			"\n": new Array(mt).fill(0).map((e, t) => `
` + "	".repeat(t)),
			"\r": new Array(mt).fill(0).map((e, t) => "\r" + "	".repeat(t)),
			"\r\n": new Array(mt).fill(0).map((e, t) => `\r
` + "	".repeat(t))
		}
	}, sc = [
		`
`,
		"\r",
		`\r
`
	];
	function oc(e, t, n) {
		let r, i, s, o, l;
		if (t) {
			for (o = t.offset, l = o + t.length, s = o; s > 0 && !y1(e, s - 1);) s--;
			let b = l;
			for (; b < e.length && !y1(e, b);) b++;
			i = e.substring(s, b), r = ac(i, n);
		} else i = e, r = 0, s = 0, o = 0, l = e.length;
		const a = lc(n, e), u = sc.includes(a);
		let h = 0, f = 0, d;
		n.insertSpaces ? d = we[n.tabSize || 4] ?? dt(we[1], n.tabSize || 4) : d = "	";
		const m = d === "	" ? "	" : " ";
		let g = _r(i, !1), p = !1;
		function w() {
			if (h > 1) return dt(a, h) + dt(d, r + f);
			const b = d.length * (r + f);
			return !u || b > b1[m][a].length ? a + dt(d, r + f) : b <= 0 ? a : b1[m][a][b];
		}
		function _() {
			let b = g.scan();
			for (h = 0; b === 15 || b === 14;) b === 14 && n.keepLines ? h += 1 : b === 14 && (h = 1), b = g.scan();
			return p = b === 16 || g.getTokenError() !== 0, b;
		}
		const N = [];
		function v(b, L, S) {
			!p && (!t || L < l && S > o) && e.substring(L, S) !== b && N.push({
				offset: L,
				length: S - L,
				content: b
			});
		}
		let y = _();
		if (n.keepLines && h > 0 && v(dt(a, h), 0, 0), y !== 17) {
			let b = g.getTokenOffset() + s;
			v(d.length * r < 20 && n.insertSpaces ? we[d.length * r] : dt(d, r), s, b);
		}
		for (; y !== 17;) {
			let b = g.getTokenOffset() + g.getTokenLength() + s, L = _(), S = "", T = !1;
			for (; h === 0 && (L === 12 || L === 13);) {
				let D = g.getTokenOffset() + s;
				v(we[1], b, D), b = g.getTokenOffset() + g.getTokenLength() + s, T = L === 12, S = T ? w() : "", L = _();
			}
			if (L === 2) y !== 1 && f--, n.keepLines && h > 0 || !n.keepLines && y !== 1 ? S = w() : n.keepLines && (S = we[1]);
			else if (L === 4) y !== 3 && f--, n.keepLines && h > 0 || !n.keepLines && y !== 3 ? S = w() : n.keepLines && (S = we[1]);
			else {
				switch (y) {
					case 3:
					case 1:
						f++, n.keepLines && h > 0 || !n.keepLines ? S = w() : S = we[1];
						break;
					case 5:
						n.keepLines && h > 0 || !n.keepLines ? S = w() : S = we[1];
						break;
					case 12:
						S = w();
						break;
					case 13:
						h > 0 ? S = w() : T || (S = we[1]);
						break;
					case 6:
						n.keepLines && h > 0 ? S = w() : T || (S = we[1]);
						break;
					case 10:
						n.keepLines && h > 0 ? S = w() : L === 6 && !T && (S = "");
						break;
					case 7:
					case 8:
					case 9:
					case 11:
					case 2:
					case 4:
						n.keepLines && h > 0 ? S = w() : (L === 12 || L === 13) && !T ? S = we[1] : L !== 5 && L !== 17 && (p = !0);
						break;
					case 16:
						p = !0;
						break;
				}
				h > 0 && (L === 12 || L === 13) && (S = w());
			}
			L === 17 && (n.keepLines && h > 0 ? S = w() : S = n.insertFinalNewline ? a : "");
			const F = g.getTokenOffset() + s;
			v(S, b, F), y = L;
		}
		return N;
	}
	function dt(e, t) {
		let n = "";
		for (let r = 0; r < t; r++) n += e;
		return n;
	}
	function ac(e, t) {
		let n = 0, r = 0;
		const i = t.tabSize || 4;
		for (; n < e.length;) {
			let s = e.charAt(n);
			if (s === we[1]) r++;
			else if (s === "	") r += i;
			else break;
			n++;
		}
		return Math.floor(r / i);
	}
	function lc(e, t) {
		for (let n = 0; n < t.length; n++) {
			const r = t.charAt(n);
			if (r === "\r") return n + 1 < t.length && t.charAt(n + 1) === `
` ? `\r
` : "\r";
			if (r === `
`) return `
`;
		}
		return e && e.eol || `
`;
	}
	function y1(e, t) {
		return `\r
`.indexOf(e.charAt(t)) !== -1;
	}
	var dn;
	(function(e) {
		e.DEFAULT = { allowTrailingComma: !1 };
	})(dn || (dn = {}));
	function uc(e, t = [], n = dn.DEFAULT) {
		let r = null, i = [];
		const s = [];
		function o(l) {
			Array.isArray(i) ? i.push(l) : r !== null && (i[r] = l);
		}
		return fc(e, {
			onObjectBegin: () => {
				const l = {};
				o(l), s.push(i), i = l, r = null;
			},
			onObjectProperty: (l) => {
				r = l;
			},
			onObjectEnd: () => {
				i = s.pop();
			},
			onArrayBegin: () => {
				const l = [];
				o(l), s.push(i), i = l, r = null;
			},
			onArrayEnd: () => {
				i = s.pop();
			},
			onLiteralValue: o,
			onError: (l, a, u) => {
				t.push({
					error: l,
					offset: a,
					length: u
				});
			}
		}, n), i[0];
	}
	function v1(e) {
		if (!e.parent || !e.parent.children) return [];
		const t = v1(e.parent);
		if (e.parent.type === "property") {
			const n = e.parent.children[0].value;
			t.push(n);
		} else if (e.parent.type === "array") {
			const n = e.parent.children.indexOf(e);
			n !== -1 && t.push(n);
		}
		return t;
	}
	function Nr(e) {
		switch (e.type) {
			case "array": return e.children.map(Nr);
			case "object":
				const t = Object.create(null);
				for (let n of e.children) {
					const r = n.children[1];
					r && (t[n.children[0].value] = Nr(r));
				}
				return t;
			case "null":
			case "string":
			case "number":
			case "boolean": return e.value;
			default: return;
		}
	}
	function cc(e, t, n = !1) {
		return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
	}
	function w1(e, t, n = !1) {
		if (cc(e, t, n)) {
			const r = e.children;
			if (Array.isArray(r)) for (let i = 0; i < r.length && r[i].offset <= t; i++) {
				const s = w1(r[i], t, n);
				if (s) return s;
			}
			return e;
		}
	}
	function fc(e, t, n = dn.DEFAULT) {
		const r = _r(e, !1), i = [];
		function s(k) {
			return k ? () => k(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
		}
		function o(k) {
			return k ? () => k(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
		}
		function l(k) {
			return k ? (R) => k(R, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
		}
		function a(k) {
			return k ? (R) => k(R, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
		}
		const u = o(t.onObjectBegin), h = a(t.onObjectProperty), f = s(t.onObjectEnd), d = o(t.onArrayBegin), m = s(t.onArrayEnd), g = a(t.onLiteralValue), p = l(t.onSeparator), w = s(t.onComment), _ = l(t.onError), N = n && n.disallowComments, v = n && n.allowTrailingComma;
		function y() {
			for (;;) {
				const k = r.scan();
				switch (r.getTokenError()) {
					case 4:
						b(14);
						break;
					case 5:
						b(15);
						break;
					case 3:
						b(13);
						break;
					case 1:
						N || b(11);
						break;
					case 2:
						b(12);
						break;
					case 6:
						b(16);
						break;
				}
				switch (k) {
					case 12:
					case 13:
						N ? b(10) : w();
						break;
					case 16:
						b(1);
						break;
					case 15:
					case 14: break;
					default: return k;
				}
			}
		}
		function b(k, R = [], x = []) {
			if (_(k), R.length + x.length > 0) {
				let I = r.getToken();
				for (; I !== 17;) {
					if (R.indexOf(I) !== -1) {
						y();
						break;
					} else if (x.indexOf(I) !== -1) break;
					I = y();
				}
			}
		}
		function L(k) {
			const R = r.getTokenValue();
			return k ? g(R) : (h(R), i.push(R)), y(), !0;
		}
		function S() {
			switch (r.getToken()) {
				case 11:
					const k = r.getTokenValue();
					let R = Number(k);
					isNaN(R) && (b(2), R = 0), g(R);
					break;
				case 7:
					g(null);
					break;
				case 8:
					g(!0);
					break;
				case 9:
					g(!1);
					break;
				default: return !1;
			}
			return y(), !0;
		}
		function T() {
			return r.getToken() !== 10 ? (b(3, [], [2, 5]), !1) : (L(!1), r.getToken() === 6 ? (p(":"), y(), M() || b(4, [], [2, 5])) : b(5, [], [2, 5]), i.pop(), !0);
		}
		function F() {
			u(), y();
			let k = !1;
			for (; r.getToken() !== 2 && r.getToken() !== 17;) {
				if (r.getToken() === 5) {
					if (k || b(4, [], []), p(","), y(), r.getToken() === 2 && v) break;
				} else k && b(6, [], []);
				T() || b(4, [], [2, 5]), k = !0;
			}
			return f(), r.getToken() !== 2 ? b(7, [2], []) : y(), !0;
		}
		function D() {
			d(), y();
			let k = !0, R = !1;
			for (; r.getToken() !== 4 && r.getToken() !== 17;) {
				if (r.getToken() === 5) {
					if (R || b(4, [], []), p(","), y(), r.getToken() === 4 && v) break;
				} else R && b(6, [], []);
				k ? (i.push(0), k = !1) : i[i.length - 1]++, M() || b(4, [], [4, 5]), R = !0;
			}
			return m(), k || i.pop(), r.getToken() !== 4 ? b(8, [4], []) : y(), !0;
		}
		function M() {
			switch (r.getToken()) {
				case 3: return D();
				case 1: return F();
				case 10: return L(!0);
				default: return S();
			}
		}
		return y(), r.getToken() === 17 ? n.allowEmptyContent ? !0 : (b(4, [], []), !1) : M() ? (r.getToken() !== 17 && b(9, [], []), !0) : (b(4, [], []), !1);
	}
	var Ze = _r, _1;
	(function(e) {
		e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter";
	})(_1 || (_1 = {}));
	var L1;
	(function(e) {
		e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF";
	})(L1 || (L1 = {}));
	var hc = uc, mc = w1, dc = v1, gc = Nr, N1;
	(function(e) {
		e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter";
	})(N1 || (N1 = {}));
	function pc(e, t, n) {
		return oc(e, t, n);
	}
	function gt(e, t) {
		if (e === t) return !0;
		if (e == null || t === null || t === void 0 || typeof e != typeof t || typeof e != "object" || Array.isArray(e) !== Array.isArray(t)) return !1;
		let n, r;
		if (Array.isArray(e)) {
			if (e.length !== t.length) return !1;
			for (n = 0; n < e.length; n++) if (!gt(e[n], t[n])) return !1;
		} else {
			const i = [];
			for (r in e) i.push(r);
			i.sort();
			const s = [];
			for (r in t) s.push(r);
			if (s.sort(), !gt(i, s)) return !1;
			for (n = 0; n < i.length; n++) if (!gt(e[i[n]], t[i[n]])) return !1;
		}
		return !0;
	}
	function ce(e) {
		return typeof e == "number";
	}
	function Se(e) {
		return typeof e < "u";
	}
	function Ee(e) {
		return typeof e == "boolean";
	}
	function S1(e) {
		return typeof e == "string";
	}
	function ze(e) {
		return typeof e == "object" && e !== null && !Array.isArray(e);
	}
	function bc(e, t) {
		if (e.length < t.length) return !1;
		for (let n = 0; n < t.length; n++) if (e[n] !== t[n]) return !1;
		return !0;
	}
	function Ft(e, t) {
		const n = e.length - t.length;
		return n > 0 ? e.lastIndexOf(t) === n : n === 0 ? e === t : !1;
	}
	function gn(e) {
		let t = "";
		bc(e, "(?i)") && (e = e.substring(4), t = "i");
		try {
			return new RegExp(e, t + "u");
		} catch {
			try {
				return new RegExp(e, t);
			} catch {
				return;
			}
		}
	}
	function A1(e) {
		let t = 0;
		for (let n = 0; n < e.length; n++) {
			t++;
			const r = e.charCodeAt(n);
			55296 <= r && r <= 56319 && n++;
		}
		return t;
	}
	var k1;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})(k1 || (k1 = {}));
	var Sr;
	(function(e) {
		function t(n) {
			return typeof n == "string";
		}
		e.is = t;
	})(Sr || (Sr = {}));
	var x1;
	(function(e) {
		e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(x1 || (x1 = {}));
	var pn;
	(function(e) {
		e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
		function t(n) {
			return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
		}
		e.is = t;
	})(pn || (pn = {}));
	var Q;
	(function(e) {
		function t(r, i) {
			return r === Number.MAX_VALUE && (r = pn.MAX_VALUE), i === Number.MAX_VALUE && (i = pn.MAX_VALUE), {
				line: r,
				character: i
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.objectLiteral(i) && A.uinteger(i.line) && A.uinteger(i.character);
		}
		e.is = n;
	})(Q || (Q = {}));
	var U;
	(function(e) {
		function t(r, i, s, o) {
			if (A.uinteger(r) && A.uinteger(i) && A.uinteger(s) && A.uinteger(o)) return {
				start: Q.create(r, i),
				end: Q.create(s, o)
			};
			if (Q.is(r) && Q.is(i)) return {
				start: r,
				end: i
			};
			throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${o}]`);
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.objectLiteral(i) && Q.is(i.start) && Q.is(i.end);
		}
		e.is = n;
	})(U || (U = {}));
	var pt;
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
			return A.objectLiteral(i) && U.is(i.range) && (A.string(i.uri) || A.undefined(i.uri));
		}
		e.is = n;
	})(pt || (pt = {}));
	var R1;
	(function(e) {
		function t(r, i, s, o) {
			return {
				targetUri: r,
				targetRange: i,
				targetSelectionRange: s,
				originSelectionRange: o
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.objectLiteral(i) && U.is(i.targetRange) && A.string(i.targetUri) && U.is(i.targetSelectionRange) && (U.is(i.originSelectionRange) || A.undefined(i.originSelectionRange));
		}
		e.is = n;
	})(R1 || (R1 = {}));
	var Ar;
	(function(e) {
		function t(r, i, s, o) {
			return {
				red: r,
				green: i,
				blue: s,
				alpha: o
			};
		}
		e.create = t;
		function n(r) {
			const i = r;
			return A.objectLiteral(i) && A.numberRange(i.red, 0, 1) && A.numberRange(i.green, 0, 1) && A.numberRange(i.blue, 0, 1) && A.numberRange(i.alpha, 0, 1);
		}
		e.is = n;
	})(Ar || (Ar = {}));
	var E1;
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
			return A.objectLiteral(i) && U.is(i.range) && Ar.is(i.color);
		}
		e.is = n;
	})(E1 || (E1 = {}));
	var M1;
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
			return A.objectLiteral(i) && A.string(i.label) && (A.undefined(i.textEdit) || Me.is(i)) && (A.undefined(i.additionalTextEdits) || A.typedArray(i.additionalTextEdits, Me.is));
		}
		e.is = n;
	})(M1 || (M1 = {}));
	var Vt;
	(function(e) {
		e.Comment = "comment", e.Imports = "imports", e.Region = "region";
	})(Vt || (Vt = {}));
	var C1;
	(function(e) {
		function t(r, i, s, o, l, a) {
			const u = {
				startLine: r,
				endLine: i
			};
			return A.defined(s) && (u.startCharacter = s), A.defined(o) && (u.endCharacter = o), A.defined(l) && (u.kind = l), A.defined(a) && (u.collapsedText = a), u;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return A.objectLiteral(i) && A.uinteger(i.startLine) && A.uinteger(i.startLine) && (A.undefined(i.startCharacter) || A.uinteger(i.startCharacter)) && (A.undefined(i.endCharacter) || A.uinteger(i.endCharacter)) && (A.undefined(i.kind) || A.string(i.kind));
		}
		e.is = n;
	})(C1 || (C1 = {}));
	var kr;
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
			return A.defined(i) && pt.is(i.location) && A.string(i.message);
		}
		e.is = n;
	})(kr || (kr = {}));
	var ge;
	(function(e) {
		e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
	})(ge || (ge = {}));
	var T1;
	(function(e) {
		e.Unnecessary = 1, e.Deprecated = 2;
	})(T1 || (T1 = {}));
	var P1;
	(function(e) {
		function t(n) {
			const r = n;
			return A.objectLiteral(r) && A.string(r.href);
		}
		e.is = t;
	})(P1 || (P1 = {}));
	var De;
	(function(e) {
		function t(r, i, s, o, l, a) {
			let u = {
				range: r,
				message: i
			};
			return A.defined(s) && (u.severity = s), A.defined(o) && (u.code = o), A.defined(l) && (u.source = l), A.defined(a) && (u.relatedInformation = a), u;
		}
		e.create = t;
		function n(r) {
			var i;
			let s = r;
			return A.defined(s) && U.is(s.range) && A.string(s.message) && (A.number(s.severity) || A.undefined(s.severity)) && (A.integer(s.code) || A.string(s.code) || A.undefined(s.code)) && (A.undefined(s.codeDescription) || A.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (A.string(s.source) || A.undefined(s.source)) && (A.undefined(s.relatedInformation) || A.typedArray(s.relatedInformation, kr.is));
		}
		e.is = n;
	})(De || (De = {}));
	var bt;
	(function(e) {
		function t(r, i, ...s) {
			let o = {
				title: r,
				command: i
			};
			return A.defined(s) && s.length > 0 && (o.arguments = s), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.defined(i) && A.string(i.title) && A.string(i.command);
		}
		e.is = n;
	})(bt || (bt = {}));
	var Me;
	(function(e) {
		function t(s, o) {
			return {
				range: s,
				newText: o
			};
		}
		e.replace = t;
		function n(s, o) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: o
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
			const o = s;
			return A.objectLiteral(o) && A.string(o.newText) && U.is(o.range);
		}
		e.is = i;
	})(Me || (Me = {}));
	var xr;
	(function(e) {
		function t(r, i, s) {
			const o = { label: r };
			return i !== void 0 && (o.needsConfirmation = i), s !== void 0 && (o.description = s), o;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return A.objectLiteral(i) && A.string(i.label) && (A.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (A.string(i.description) || i.description === void 0);
		}
		e.is = n;
	})(xr || (xr = {}));
	var yt;
	(function(e) {
		function t(n) {
			const r = n;
			return A.string(r);
		}
		e.is = t;
	})(yt || (yt = {}));
	var I1;
	(function(e) {
		function t(s, o, l) {
			return {
				range: s,
				newText: o,
				annotationId: l
			};
		}
		e.replace = t;
		function n(s, o, l) {
			return {
				range: {
					start: s,
					end: s
				},
				newText: o,
				annotationId: l
			};
		}
		e.insert = n;
		function r(s, o) {
			return {
				range: s,
				newText: "",
				annotationId: o
			};
		}
		e.del = r;
		function i(s) {
			const o = s;
			return Me.is(o) && (xr.is(o.annotationId) || yt.is(o.annotationId));
		}
		e.is = i;
	})(I1 || (I1 = {}));
	var Rr;
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
			return A.defined(i) && Pr.is(i.textDocument) && Array.isArray(i.edits);
		}
		e.is = n;
	})(Rr || (Rr = {}));
	var Er;
	(function(e) {
		function t(r, i, s) {
			let o = {
				kind: "create",
				uri: r
			};
			return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "create" && A.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || A.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || A.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || yt.is(i.annotationId));
		}
		e.is = n;
	})(Er || (Er = {}));
	var Mr;
	(function(e) {
		function t(r, i, s, o) {
			let l = {
				kind: "rename",
				oldUri: r,
				newUri: i
			};
			return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (l.options = s), o !== void 0 && (l.annotationId = o), l;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "rename" && A.string(i.oldUri) && A.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || A.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || A.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || yt.is(i.annotationId));
		}
		e.is = n;
	})(Mr || (Mr = {}));
	var Cr;
	(function(e) {
		function t(r, i, s) {
			let o = {
				kind: "delete",
				uri: r
			};
			return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && i.kind === "delete" && A.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || A.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || A.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || yt.is(i.annotationId));
		}
		e.is = n;
	})(Cr || (Cr = {}));
	var Tr;
	(function(e) {
		function t(n) {
			let r = n;
			return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => A.string(i.kind) ? Er.is(i) || Mr.is(i) || Cr.is(i) : Rr.is(i)));
		}
		e.is = t;
	})(Tr || (Tr = {}));
	var F1;
	(function(e) {
		function t(r) {
			return { uri: r };
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.defined(i) && A.string(i.uri);
		}
		e.is = n;
	})(F1 || (F1 = {}));
	var V1;
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
			return A.defined(i) && A.string(i.uri) && A.integer(i.version);
		}
		e.is = n;
	})(V1 || (V1 = {}));
	var Pr;
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
			return A.defined(i) && A.string(i.uri) && (i.version === null || A.integer(i.version));
		}
		e.is = n;
	})(Pr || (Pr = {}));
	var D1;
	(function(e) {
		function t(r, i, s, o) {
			return {
				uri: r,
				languageId: i,
				version: s,
				text: o
			};
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.defined(i) && A.string(i.uri) && A.string(i.languageId) && A.integer(i.version) && A.string(i.text);
		}
		e.is = n;
	})(D1 || (D1 = {}));
	var Ke;
	(function(e) {
		e.PlainText = "plaintext", e.Markdown = "markdown";
		function t(n) {
			const r = n;
			return r === e.PlainText || r === e.Markdown;
		}
		e.is = t;
	})(Ke || (Ke = {}));
	var Dt;
	(function(e) {
		function t(n) {
			const r = n;
			return A.objectLiteral(n) && Ke.is(r.kind) && A.string(r.value);
		}
		e.is = t;
	})(Dt || (Dt = {}));
	var pe;
	(function(e) {
		e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
	})(pe || (pe = {}));
	var ne;
	(function(e) {
		e.PlainText = 1, e.Snippet = 2;
	})(ne || (ne = {}));
	var O1;
	(function(e) {
		e.Deprecated = 1;
	})(O1 || (O1 = {}));
	var $1;
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
			return i && A.string(i.newText) && U.is(i.insert) && U.is(i.replace);
		}
		e.is = n;
	})($1 || ($1 = {}));
	var B1;
	(function(e) {
		e.asIs = 1, e.adjustIndentation = 2;
	})(B1 || (B1 = {}));
	var U1;
	(function(e) {
		function t(n) {
			const r = n;
			return r && (A.string(r.detail) || r.detail === void 0) && (A.string(r.description) || r.description === void 0);
		}
		e.is = t;
	})(U1 || (U1 = {}));
	var Ir;
	(function(e) {
		function t(n) {
			return { label: n };
		}
		e.create = t;
	})(Ir || (Ir = {}));
	var q1;
	(function(e) {
		function t(n, r) {
			return {
				items: n || [],
				isIncomplete: !!r
			};
		}
		e.create = t;
	})(q1 || (q1 = {}));
	var bn;
	(function(e) {
		function t(r) {
			return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		e.fromPlainText = t;
		function n(r) {
			const i = r;
			return A.string(i) || A.objectLiteral(i) && A.string(i.language) && A.string(i.value);
		}
		e.is = n;
	})(bn || (bn = {}));
	var j1;
	(function(e) {
		function t(n) {
			let r = n;
			return !!r && A.objectLiteral(r) && (Dt.is(r.contents) || bn.is(r.contents) || A.typedArray(r.contents, bn.is)) && (n.range === void 0 || U.is(n.range));
		}
		e.is = t;
	})(j1 || (j1 = {}));
	var W1;
	(function(e) {
		function t(n, r) {
			return r ? {
				label: n,
				documentation: r
			} : { label: n };
		}
		e.create = t;
	})(W1 || (W1 = {}));
	var H1;
	(function(e) {
		function t(n, r, ...i) {
			let s = { label: n };
			return A.defined(r) && (s.documentation = r), A.defined(i) ? s.parameters = i : s.parameters = [], s;
		}
		e.create = t;
	})(H1 || (H1 = {}));
	var z1;
	(function(e) {
		e.Text = 1, e.Read = 2, e.Write = 3;
	})(z1 || (z1 = {}));
	var G1;
	(function(e) {
		function t(n, r) {
			let i = { range: n };
			return A.number(r) && (i.kind = r), i;
		}
		e.create = t;
	})(G1 || (G1 = {}));
	var Ce;
	(function(e) {
		e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
	})(Ce || (Ce = {}));
	var J1;
	(function(e) {
		e.Deprecated = 1;
	})(J1 || (J1 = {}));
	var X1;
	(function(e) {
		function t(n, r, i, s, o) {
			let l = {
				name: n,
				kind: r,
				location: {
					uri: s,
					range: i
				}
			};
			return o && (l.containerName = o), l;
		}
		e.create = t;
	})(X1 || (X1 = {}));
	var Q1;
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
	})(Q1 || (Q1 = {}));
	var Y1;
	(function(e) {
		function t(r, i, s, o, l, a) {
			let u = {
				name: r,
				detail: i,
				kind: s,
				range: o,
				selectionRange: l
			};
			return a !== void 0 && (u.children = a), u;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && A.string(i.name) && A.number(i.kind) && U.is(i.range) && U.is(i.selectionRange) && (i.detail === void 0 || A.string(i.detail)) && (i.deprecated === void 0 || A.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
		}
		e.is = n;
	})(Y1 || (Y1 = {}));
	var Z1;
	(function(e) {
		e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
	})(Z1 || (Z1 = {}));
	var yn;
	(function(e) {
		e.Invoked = 1, e.Automatic = 2;
	})(yn || (yn = {}));
	var K1;
	(function(e) {
		function t(r, i, s) {
			let o = { diagnostics: r };
			return i != null && (o.only = i), s != null && (o.triggerKind = s), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.defined(i) && A.typedArray(i.diagnostics, De.is) && (i.only === void 0 || A.typedArray(i.only, A.string)) && (i.triggerKind === void 0 || i.triggerKind === yn.Invoked || i.triggerKind === yn.Automatic);
		}
		e.is = n;
	})(K1 || (K1 = {}));
	var eo;
	(function(e) {
		function t(r, i, s) {
			let o = { title: r }, l = !0;
			return typeof i == "string" ? (l = !1, o.kind = i) : bt.is(i) ? o.command = i : o.edit = i, l && s !== void 0 && (o.kind = s), o;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return i && A.string(i.title) && (i.diagnostics === void 0 || A.typedArray(i.diagnostics, De.is)) && (i.kind === void 0 || A.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || bt.is(i.command)) && (i.isPreferred === void 0 || A.boolean(i.isPreferred)) && (i.edit === void 0 || Tr.is(i.edit));
		}
		e.is = n;
	})(eo || (eo = {}));
	var to;
	(function(e) {
		function t(r, i) {
			let s = { range: r };
			return A.defined(i) && (s.data = i), s;
		}
		e.create = t;
		function n(r) {
			let i = r;
			return A.defined(i) && U.is(i.range) && (A.undefined(i.command) || bt.is(i.command));
		}
		e.is = n;
	})(to || (to = {}));
	var no;
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
			return A.defined(i) && A.uinteger(i.tabSize) && A.boolean(i.insertSpaces);
		}
		e.is = n;
	})(no || (no = {}));
	var ro;
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
			return A.defined(i) && U.is(i.range) && (A.undefined(i.target) || A.string(i.target));
		}
		e.is = n;
	})(ro || (ro = {}));
	var vn;
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
			return A.objectLiteral(i) && U.is(i.range) && (i.parent === void 0 || e.is(i.parent));
		}
		e.is = n;
	})(vn || (vn = {}));
	var io;
	(function(e) {
		e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator";
	})(io || (io = {}));
	var so;
	(function(e) {
		e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
	})(so || (so = {}));
	var oo;
	(function(e) {
		function t(n) {
			const r = n;
			return A.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
		}
		e.is = t;
	})(oo || (oo = {}));
	var ao;
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
			return i != null && U.is(i.range) && A.string(i.text);
		}
		e.is = n;
	})(ao || (ao = {}));
	var lo;
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
			return i != null && U.is(i.range) && A.boolean(i.caseSensitiveLookup) && (A.string(i.variableName) || i.variableName === void 0);
		}
		e.is = n;
	})(lo || (lo = {}));
	var uo;
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
			return i != null && U.is(i.range) && (A.string(i.expression) || i.expression === void 0);
		}
		e.is = n;
	})(uo || (uo = {}));
	var co;
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
			return A.defined(i) && U.is(r.stoppedLocation);
		}
		e.is = n;
	})(co || (co = {}));
	var Fr;
	(function(e) {
		e.Type = 1, e.Parameter = 2;
		function t(n) {
			return n === 1 || n === 2;
		}
		e.is = t;
	})(Fr || (Fr = {}));
	var Vr;
	(function(e) {
		function t(r) {
			return { value: r };
		}
		e.create = t;
		function n(r) {
			const i = r;
			return A.objectLiteral(i) && (i.tooltip === void 0 || A.string(i.tooltip) || Dt.is(i.tooltip)) && (i.location === void 0 || pt.is(i.location)) && (i.command === void 0 || bt.is(i.command));
		}
		e.is = n;
	})(Vr || (Vr = {}));
	var fo;
	(function(e) {
		function t(r, i, s) {
			const o = {
				position: r,
				label: i
			};
			return s !== void 0 && (o.kind = s), o;
		}
		e.create = t;
		function n(r) {
			const i = r;
			return A.objectLiteral(i) && Q.is(i.position) && (A.string(i.label) || A.typedArray(i.label, Vr.is)) && (i.kind === void 0 || Fr.is(i.kind)) && i.textEdits === void 0 || A.typedArray(i.textEdits, Me.is) && (i.tooltip === void 0 || A.string(i.tooltip) || Dt.is(i.tooltip)) && (i.paddingLeft === void 0 || A.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || A.boolean(i.paddingRight));
		}
		e.is = n;
	})(fo || (fo = {}));
	var ho;
	(function(e) {
		function t(n) {
			return {
				kind: "snippet",
				value: n
			};
		}
		e.createSnippet = t;
	})(ho || (ho = {}));
	var mo;
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
	})(mo || (mo = {}));
	var go;
	(function(e) {
		function t(n) {
			return { items: n };
		}
		e.create = t;
	})(go || (go = {}));
	var po;
	(function(e) {
		e.Invoked = 0, e.Automatic = 1;
	})(po || (po = {}));
	var bo;
	(function(e) {
		function t(n, r) {
			return {
				range: n,
				text: r
			};
		}
		e.create = t;
	})(bo || (bo = {}));
	var yo;
	(function(e) {
		function t(n, r) {
			return {
				triggerKind: n,
				selectedCompletionInfo: r
			};
		}
		e.create = t;
	})(yo || (yo = {}));
	var vo;
	(function(e) {
		function t(n) {
			const r = n;
			return A.objectLiteral(r) && Sr.is(r.uri) && A.string(r.name);
		}
		e.is = t;
	})(vo || (vo = {}));
	var wo;
	(function(e) {
		function t(s, o, l, a) {
			return new yc(s, o, l, a);
		}
		e.create = t;
		function n(s) {
			let o = s;
			return !!(A.defined(o) && A.string(o.uri) && (A.undefined(o.languageId) || A.string(o.languageId)) && A.uinteger(o.lineCount) && A.func(o.getText) && A.func(o.positionAt) && A.func(o.offsetAt));
		}
		e.is = n;
		function r(s, o) {
			let l = s.getText(), a = i(o, (h, f) => {
				let d = h.range.start.line - f.range.start.line;
				return d === 0 ? h.range.start.character - f.range.start.character : d;
			}), u = l.length;
			for (let h = a.length - 1; h >= 0; h--) {
				let f = a[h], d = s.offsetAt(f.range.start), m = s.offsetAt(f.range.end);
				if (m <= u) l = l.substring(0, d) + f.newText + l.substring(m, l.length);
				else throw new Error("Overlapping edit");
				u = d;
			}
			return l;
		}
		e.applyEdits = r;
		function i(s, o) {
			if (s.length <= 1) return s;
			const l = s.length / 2 | 0, a = s.slice(0, l), u = s.slice(l);
			i(a, o), i(u, o);
			let h = 0, f = 0, d = 0;
			for (; h < a.length && f < u.length;) o(a[h], u[f]) <= 0 ? s[d++] = a[h++] : s[d++] = u[f++];
			for (; h < a.length;) s[d++] = a[h++];
			for (; f < u.length;) s[d++] = u[f++];
			return s;
		}
	})(wo || (wo = {}));
	var yc = class {
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
			if (r === 0) return Q.create(0, e);
			for (; n < r;) {
				let s = Math.floor((n + r) / 2);
				t[s] > e ? r = s : n = s + 1;
			}
			let i = n - 1;
			return Q.create(i, e - t[i]);
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
	}, A;
	(function(e) {
		const t = Object.prototype.toString;
		function n(m) {
			return typeof m < "u";
		}
		e.defined = n;
		function r(m) {
			return typeof m > "u";
		}
		e.undefined = r;
		function i(m) {
			return m === !0 || m === !1;
		}
		e.boolean = i;
		function s(m) {
			return t.call(m) === "[object String]";
		}
		e.string = s;
		function o(m) {
			return t.call(m) === "[object Number]";
		}
		e.number = o;
		function l(m, g, p) {
			return t.call(m) === "[object Number]" && g <= m && m <= p;
		}
		e.numberRange = l;
		function a(m) {
			return t.call(m) === "[object Number]" && -2147483648 <= m && m <= 2147483647;
		}
		e.integer = a;
		function u(m) {
			return t.call(m) === "[object Number]" && 0 <= m && m <= 2147483647;
		}
		e.uinteger = u;
		function h(m) {
			return t.call(m) === "[object Function]";
		}
		e.func = h;
		function f(m) {
			return m !== null && typeof m == "object";
		}
		e.objectLiteral = f;
		function d(m, g) {
			return Array.isArray(m) && m.every(g);
		}
		e.typedArray = d;
	})(A || (A = {}));
	var _o = class ei {
		constructor(t, n, r, i) {
			this._uri = t, this._languageId = n, this._version = r, this._content = i, this._lineOffsets = void 0;
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
		getText(t) {
			if (t) {
				const n = this.offsetAt(t.start), r = this.offsetAt(t.end);
				return this._content.substring(n, r);
			}
			return this._content;
		}
		update(t, n) {
			for (let r of t) if (ei.isIncremental(r)) {
				const i = No(r.range), s = this.offsetAt(i.start), o = this.offsetAt(i.end);
				this._content = this._content.substring(0, s) + r.text + this._content.substring(o, this._content.length);
				const l = Math.max(i.start.line, 0), a = Math.max(i.end.line, 0);
				let u = this._lineOffsets;
				const h = Lo(r.text, !1, s);
				if (a - l === h.length) for (let d = 0, m = h.length; d < m; d++) u[d + l + 1] = h[d];
				else h.length < 1e4 ? u.splice(l + 1, a - l, ...h) : this._lineOffsets = u = u.slice(0, l + 1).concat(h, u.slice(a + 1));
				const f = r.text.length - (o - s);
				if (f !== 0) for (let d = l + 1 + h.length, m = u.length; d < m; d++) u[d] = u[d] + f;
			} else if (ei.isFull(r)) this._content = r.text, this._lineOffsets = void 0;
			else throw new Error("Unknown change event received");
			this._version = n;
		}
		getLineOffsets() {
			return this._lineOffsets === void 0 && (this._lineOffsets = Lo(this._content, !0)), this._lineOffsets;
		}
		positionAt(t) {
			t = Math.max(Math.min(t, this._content.length), 0);
			let n = this.getLineOffsets(), r = 0, i = n.length;
			if (i === 0) return {
				line: 0,
				character: t
			};
			for (; r < i;) {
				let o = Math.floor((r + i) / 2);
				n[o] > t ? i = o : r = o + 1;
			}
			let s = r - 1;
			return {
				line: s,
				character: t - n[s]
			};
		}
		offsetAt(t) {
			let n = this.getLineOffsets();
			if (t.line >= n.length) return this._content.length;
			if (t.line < 0) return 0;
			let r = n[t.line], i = t.line + 1 < n.length ? n[t.line + 1] : this._content.length;
			return Math.max(Math.min(r + t.character, i), r);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
		static isIncremental(t) {
			let n = t;
			return n != null && typeof n.text == "string" && n.range !== void 0 && (n.rangeLength === void 0 || typeof n.rangeLength == "number");
		}
		static isFull(t) {
			let n = t;
			return n != null && typeof n.text == "string" && n.range === void 0 && n.rangeLength === void 0;
		}
	}, Ae;
	(function(e) {
		function t(i, s, o, l) {
			return new _o(i, s, o, l);
		}
		e.create = t;
		function n(i, s, o) {
			if (i instanceof _o) return i.update(s, o), i;
			throw new Error("TextDocument.update: document must be created by TextDocument.create");
		}
		e.update = n;
		function r(i, s) {
			let o = i.getText(), l = Dr(s.map(vc), (h, f) => {
				let d = h.range.start.line - f.range.start.line;
				return d === 0 ? h.range.start.character - f.range.start.character : d;
			}), a = 0;
			const u = [];
			for (const h of l) {
				let f = i.offsetAt(h.range.start);
				if (f < a) throw new Error("Overlapping edit");
				f > a && u.push(o.substring(a, f)), h.newText.length && u.push(h.newText), a = i.offsetAt(h.range.end);
			}
			return u.push(o.substr(a)), u.join("");
		}
		e.applyEdits = r;
	})(Ae || (Ae = {}));
	function Dr(e, t) {
		if (e.length <= 1) return e;
		const n = e.length / 2 | 0, r = e.slice(0, n), i = e.slice(n);
		Dr(r, t), Dr(i, t);
		let s = 0, o = 0, l = 0;
		for (; s < r.length && o < i.length;) t(r[s], i[o]) <= 0 ? e[l++] = r[s++] : e[l++] = i[o++];
		for (; s < r.length;) e[l++] = r[s++];
		for (; o < i.length;) e[l++] = i[o++];
		return e;
	}
	function Lo(e, t, n = 0) {
		const r = t ? [n] : [];
		for (let i = 0; i < e.length; i++) {
			let s = e.charCodeAt(i);
			(s === 13 || s === 10) && (s === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, r.push(n + i + 1));
		}
		return r;
	}
	function No(e) {
		const t = e.start, n = e.end;
		return t.line > n.line || t.line === n.line && t.character > n.character ? {
			start: n,
			end: t
		} : e;
	}
	function vc(e) {
		const t = No(e.range);
		return t !== e.range ? {
			newText: e.newText,
			range: t
		} : e;
	}
	var j;
	(function(e) {
		e[e.Undefined = 0] = "Undefined", e[e.EnumValueMismatch = 1] = "EnumValueMismatch", e[e.Deprecated = 2] = "Deprecated", e[e.UnexpectedEndOfComment = 257] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 258] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 259] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 260] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 261] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 262] = "InvalidCharacter", e[e.PropertyExpected = 513] = "PropertyExpected", e[e.CommaExpected = 514] = "CommaExpected", e[e.ColonExpected = 515] = "ColonExpected", e[e.ValueExpected = 516] = "ValueExpected", e[e.CommaOrCloseBacketExpected = 517] = "CommaOrCloseBacketExpected", e[e.CommaOrCloseBraceExpected = 518] = "CommaOrCloseBraceExpected", e[e.TrailingComma = 519] = "TrailingComma", e[e.DuplicateKey = 520] = "DuplicateKey", e[e.CommentNotPermitted = 521] = "CommentNotPermitted", e[e.PropertyKeysMustBeDoublequoted = 528] = "PropertyKeysMustBeDoublequoted", e[e.SchemaResolveError = 768] = "SchemaResolveError", e[e.SchemaUnsupportedFeature = 769] = "SchemaUnsupportedFeature";
	})(j || (j = {}));
	var ke;
	(function(e) {
		e[e.v3 = 3] = "v3", e[e.v4 = 4] = "v4", e[e.v6 = 6] = "v6", e[e.v7 = 7] = "v7", e[e.v2019_09 = 19] = "v2019_09", e[e.v2020_12 = 20] = "v2020_12";
	})(ke || (ke = {}));
	var Or;
	(function(e) {
		e.LATEST = { textDocument: { completion: { completionItem: {
			documentationFormat: [Ke.Markdown, Ke.PlainText],
			commitCharactersSupport: !0,
			labelDetailsSupport: !0
		} } } };
	})(Or || (Or = {}));
	var wc;
	function E(...e) {
		const t = e[0];
		let n, r, i;
		if (typeof t == "string") n = t, r = t, e.splice(0, 1), i = !e || typeof e[0] != "object" ? e : e[0];
		else if (t instanceof Array) {
			const o = e.slice(1);
			if (t.length !== o.length + 1) throw new Error("expected a string as the first argument to l10n.t");
			let l = t[0];
			for (let a = 1; a < t.length; a++) l += `{${a - 1}}` + t[a];
			return E(l, ...o);
		} else r = t.message, n = r, t.comment && t.comment.length > 0 && (n += `/${Array.isArray(t.comment) ? t.comment.join("") : t.comment}`), i = t.args ?? {};
		const s = wc?.[n];
		return s ? typeof s == "string" ? wn(s, i) : s.comment ? wn(s.message, i) : wn(r, i) : wn(r, i);
	}
	var _c = /{([^}]+)}/g;
	function wn(e, t) {
		return Object.keys(t).length === 0 ? e : e.replace(_c, (n, r) => t[r] ?? n);
	}
	var Lc = {
		"color-hex": {
			errorMessage: E("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."),
			pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
		},
		"date-time": {
			errorMessage: E("String is not a RFC3339 date-time."),
			pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
		},
		date: {
			errorMessage: E("String is not a RFC3339 date."),
			pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
		},
		time: {
			errorMessage: E("String is not a RFC3339 time."),
			pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
		},
		email: {
			errorMessage: E("String is not an e-mail address."),
			pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/
		},
		hostname: {
			errorMessage: E("String is not a hostname."),
			pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i
		},
		ipv4: {
			errorMessage: E("String is not an IPv4 address."),
			pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/
		},
		ipv6: {
			errorMessage: E("String is not an IPv6 address."),
			pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i
		}
	}, et = class {
		constructor(e, t, n = 0) {
			this.offset = t, this.length = n, this.parent = e;
		}
		get children() {
			return [];
		}
		toString() {
			return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
		}
	}, Nc = class extends et {
		constructor(e, t) {
			super(e, t), this.type = "null", this.value = null;
		}
	}, So = class extends et {
		constructor(e, t, n) {
			super(e, n), this.type = "boolean", this.value = t;
		}
	}, Sc = class extends et {
		constructor(e, t) {
			super(e, t), this.type = "array", this.items = [];
		}
		get children() {
			return this.items;
		}
	}, Ac = class extends et {
		constructor(e, t) {
			super(e, t), this.type = "number", this.isInteger = !0, this.value = NaN;
		}
	}, $r = class extends et {
		constructor(e, t, n) {
			super(e, t, n), this.type = "string", this.value = "";
		}
	}, kc = class extends et {
		constructor(e, t, n) {
			super(e, t), this.type = "property", this.colonOffset = -1, this.keyNode = n;
		}
		get children() {
			return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
		}
	}, xc = class extends et {
		constructor(e, t) {
			super(e, t), this.type = "object", this.properties = [];
		}
		get children() {
			return this.properties;
		}
	};
	function be(e) {
		return Ee(e) ? e ? {} : { not: {} } : e;
	}
	var Ao;
	(function(e) {
		e[e.Key = 0] = "Key", e[e.Enum = 1] = "Enum";
	})(Ao || (Ao = {}));
	var Rc = {
		"http://json-schema.org/draft-03/schema#": ke.v3,
		"http://json-schema.org/draft-04/schema#": ke.v4,
		"http://json-schema.org/draft-06/schema#": ke.v6,
		"http://json-schema.org/draft-07/schema#": ke.v7,
		"https://json-schema.org/draft/2019-09/schema": ke.v2019_09,
		"https://json-schema.org/draft/2020-12/schema": ke.v2020_12
	}, ko = class {
		constructor(e) {
			this.schemaDraft = e;
		}
	}, Ec = class na {
		constructor(t = -1, n) {
			this.focusOffset = t, this.exclude = n, this.schemas = [];
		}
		add(t) {
			this.schemas.push(t);
		}
		merge(t) {
			Array.prototype.push.apply(this.schemas, t.schemas);
		}
		include(t) {
			return (this.focusOffset === -1 || xo(t, this.focusOffset)) && t !== this.exclude;
		}
		newSub() {
			return new na(-1, this.exclude);
		}
	}, Ot = class {
		constructor() {}
		get schemas() {
			return [];
		}
		add(e) {}
		merge(e) {}
		include(e) {
			return !0;
		}
		newSub() {
			return this;
		}
	};
	Ot.instance = new Ot();
	var fe = class {
		constructor() {
			this.problems = [], this.propertiesMatches = 0, this.processedProperties = /* @__PURE__ */ new Set(), this.propertiesValueMatches = 0, this.primaryValueMatches = 0, this.enumValueMatch = !1, this.enumValues = void 0;
		}
		hasProblems() {
			return !!this.problems.length;
		}
		merge(e) {
			this.problems = this.problems.concat(e.problems), this.propertiesMatches += e.propertiesMatches, this.propertiesValueMatches += e.propertiesValueMatches, this.mergeProcessedProperties(e);
		}
		mergeEnumValues(e) {
			if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
				this.enumValues = this.enumValues.concat(e.enumValues);
				for (const t of this.problems) t.code === j.EnumValueMismatch && (t.message = E("Value is not accepted. Valid values: {0}.", this.enumValues.map((n) => JSON.stringify(n)).join(", ")));
			}
		}
		mergePropertyMatch(e) {
			this.problems = this.problems.concat(e.problems), this.propertiesMatches++, (e.enumValueMatch || !e.hasProblems() && e.propertiesMatches) && this.propertiesValueMatches++, e.enumValueMatch && e.enumValues && e.enumValues.length === 1 && this.primaryValueMatches++;
		}
		mergeProcessedProperties(e) {
			e.processedProperties.forEach((t) => this.processedProperties.add(t));
		}
		compare(e) {
			const t = this.hasProblems();
			return t !== e.hasProblems() ? t ? -1 : 1 : this.enumValueMatch !== e.enumValueMatch ? e.enumValueMatch ? -1 : 1 : this.primaryValueMatches !== e.primaryValueMatches ? this.primaryValueMatches - e.primaryValueMatches : this.propertiesValueMatches !== e.propertiesValueMatches ? this.propertiesValueMatches - e.propertiesValueMatches : this.propertiesMatches - e.propertiesMatches;
		}
	};
	function Mc(e, t = []) {
		return new Ro(e, t, []);
	}
	function tt(e) {
		return gc(e);
	}
	function Br(e) {
		return dc(e);
	}
	function xo(e, t, n = !1) {
		return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
	}
	var Ro = class {
		constructor(e, t = [], n = []) {
			this.root = e, this.syntaxErrors = t, this.comments = n;
		}
		getNodeFromOffset(e, t = !1) {
			if (this.root) return mc(this.root, e, t);
		}
		visit(e) {
			if (this.root) {
				const t = (n) => {
					let r = e(n);
					const i = n.children;
					if (Array.isArray(i)) for (let s = 0; s < i.length && r; s++) r = t(i[s]);
					return r;
				};
				t(this.root);
			}
		}
		validate(e, t, n = ge.Warning, r) {
			if (this.root && t) {
				const i = new fe();
				return ae(this.root, t, i, Ot.instance, new ko(r ?? Eo(t))), i.problems.map((s) => {
					const o = U.create(e.positionAt(s.location.offset), e.positionAt(s.location.offset + s.location.length));
					return De.create(o, s.message, s.severity ?? n, s.code);
				});
			}
		}
		getMatchingSchemas(e, t = -1, n) {
			if (this.root && e) {
				const r = new Ec(t, n), i = new ko(Eo(e));
				return ae(this.root, e, new fe(), r, i), r.schemas;
			}
			return [];
		}
	};
	function Eo(e, t = ke.v2020_12) {
		let n = e.$schema;
		return n ? Rc[n] ?? t : t;
	}
	function ae(e, t, n, r, i) {
		if (!e || !r.include(e)) return;
		if (e.type === "property") return ae(e.valueNode, t, n, r, i);
		const s = e;
		switch (o(), s.type) {
			case "object":
				h(s);
				break;
			case "array":
				u(s);
				break;
			case "string":
				a(s);
				break;
			case "number":
				l(s);
				break;
		}
		r.add({
			node: s,
			schema: t
		});
		function o() {
			function f(N) {
				return s.type === N || N === "integer" && s.type === "number" && s.isInteger;
			}
			if (Array.isArray(t.type) ? t.type.some(f) || n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				message: t.errorMessage || E("Incorrect type. Expected one of {0}.", t.type.join(", "))
			}) : t.type && (f(t.type) || n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				message: t.errorMessage || E("Incorrect type. Expected \"{0}\".", t.type)
			})), Array.isArray(t.allOf)) for (const N of t.allOf) {
				const v = new fe(), y = r.newSub();
				ae(s, be(N), v, y, i), n.merge(v), r.merge(y);
			}
			const d = be(t.not);
			if (d) {
				const N = new fe(), v = r.newSub();
				ae(s, d, N, v, i), N.hasProblems() || n.problems.push({
					location: {
						offset: s.offset,
						length: s.length
					},
					message: t.errorMessage || E("Matches a schema that is not allowed.")
				});
				for (const y of v.schemas) y.inverted = !y.inverted, r.add(y);
			}
			const m = (N, v) => {
				const y = [];
				let b;
				for (const L of N) {
					const S = be(L), T = new fe(), F = r.newSub();
					if (ae(s, S, T, F, i), T.hasProblems() || y.push(S), !b) b = {
						schema: S,
						validationResult: T,
						matchingSchemas: F
					};
					else if (!v && !T.hasProblems() && !b.validationResult.hasProblems()) b.matchingSchemas.merge(F), b.validationResult.propertiesMatches += T.propertiesMatches, b.validationResult.propertiesValueMatches += T.propertiesValueMatches, b.validationResult.mergeProcessedProperties(T);
					else {
						const D = T.compare(b.validationResult);
						D > 0 ? b = {
							schema: S,
							validationResult: T,
							matchingSchemas: F
						} : D === 0 && (b.matchingSchemas.merge(F), b.validationResult.mergeEnumValues(T));
					}
				}
				return y.length > 1 && v && n.problems.push({
					location: {
						offset: s.offset,
						length: 1
					},
					message: E("Matches multiple schemas when only one must validate.")
				}), b && (n.merge(b.validationResult), r.merge(b.matchingSchemas)), y.length;
			};
			Array.isArray(t.anyOf) && m(t.anyOf, !1), Array.isArray(t.oneOf) && m(t.oneOf, !0);
			const g = (N) => {
				const v = new fe(), y = r.newSub();
				ae(s, be(N), v, y, i), n.merge(v), r.merge(y);
			}, p = (N, v, y) => {
				const b = be(N), L = new fe(), S = r.newSub();
				ae(s, b, L, S, i), r.merge(S), n.mergeProcessedProperties(L), L.hasProblems() ? y && g(y) : v && g(v);
			}, w = be(t.if);
			if (w && p(w, be(t.then), be(t.else)), Array.isArray(t.enum)) {
				const N = tt(s);
				let v = !1;
				for (const y of t.enum) if (gt(N, y)) {
					v = !0;
					break;
				}
				n.enumValues = t.enum, n.enumValueMatch = v, v || n.problems.push({
					location: {
						offset: s.offset,
						length: s.length
					},
					code: j.EnumValueMismatch,
					message: t.errorMessage || E("Value is not accepted. Valid values: {0}.", t.enum.map((y) => JSON.stringify(y)).join(", "))
				});
			}
			Se(t.const) && (gt(tt(s), t.const) ? n.enumValueMatch = !0 : (n.problems.push({
				location: {
					offset: s.offset,
					length: s.length
				},
				code: j.EnumValueMismatch,
				message: t.errorMessage || E("Value must be {0}.", JSON.stringify(t.const))
			}), n.enumValueMatch = !1), n.enumValues = [t.const]);
			let _ = t.deprecationMessage;
			if (_ || t.deprecated) {
				_ = _ || E("Value is deprecated");
				let N = s.parent?.type === "property" ? s.parent : s;
				n.problems.push({
					location: {
						offset: N.offset,
						length: N.length
					},
					severity: ge.Warning,
					message: _,
					code: j.Deprecated
				});
			}
		}
		function l(f) {
			const d = f.value;
			function m(y) {
				const b = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(y.toString());
				return b && {
					value: Number(b[1] + (b[2] || "")),
					multiplier: (b[2]?.length || 0) - (parseInt(b[3]) || 0)
				};
			}
			if (ce(t.multipleOf)) {
				let y = -1;
				if (Number.isInteger(t.multipleOf)) y = d % t.multipleOf;
				else {
					let b = m(t.multipleOf), L = m(d);
					if (b && L) {
						const S = 10 ** Math.abs(L.multiplier - b.multiplier);
						L.multiplier < b.multiplier ? L.value *= S : b.value *= S, y = L.value % b.value;
					}
				}
				y !== 0 && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: E("Value is not divisible by {0}.", t.multipleOf)
				});
			}
			function g(y, b) {
				if (ce(b)) return b;
				if (Ee(b) && b) return y;
			}
			function p(y, b) {
				if (!Ee(b) || !b) return y;
			}
			const w = g(t.minimum, t.exclusiveMinimum);
			ce(w) && d <= w && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Value is below the exclusive minimum of {0}.", w)
			});
			const _ = g(t.maximum, t.exclusiveMaximum);
			ce(_) && d >= _ && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Value is above the exclusive maximum of {0}.", _)
			});
			const N = p(t.minimum, t.exclusiveMinimum);
			ce(N) && d < N && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Value is below the minimum of {0}.", N)
			});
			const v = p(t.maximum, t.exclusiveMaximum);
			ce(v) && d > v && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Value is above the maximum of {0}.", v)
			});
		}
		function a(f) {
			if (ce(t.minLength) && A1(f.value) < t.minLength && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("String is shorter than the minimum length of {0}.", t.minLength)
			}), ce(t.maxLength) && A1(f.value) > t.maxLength && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("String is longer than the maximum length of {0}.", t.maxLength)
			}), S1(t.pattern) && (gn(t.pattern)?.test(f.value) || n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: t.patternErrorMessage || t.errorMessage || E("String does not match the pattern of \"{0}\".", t.pattern)
			})), t.format) switch (t.format) {
				case "uri":
				case "uri-reference":
					{
						let m;
						if (!f.value) m = E("URI expected.");
						else {
							const g = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(f.value);
							g ? !g[2] && t.format === "uri" && (m = E("URI with a scheme is expected.")) : m = E("URI is expected.");
						}
						m && n.problems.push({
							location: {
								offset: f.offset,
								length: f.length
							},
							message: t.patternErrorMessage || t.errorMessage || E("String is not a URI: {0}", m)
						});
					}
					break;
				case "color-hex":
				case "date-time":
				case "date":
				case "time":
				case "email":
				case "hostname":
				case "ipv4":
				case "ipv6":
					const d = Lc[t.format];
					(!f.value || !d.pattern.exec(f.value)) && n.problems.push({
						location: {
							offset: f.offset,
							length: f.length
						},
						message: t.patternErrorMessage || t.errorMessage || d.errorMessage
					});
				default:
			}
		}
		function u(f) {
			let d, m;
			i.schemaDraft >= ke.v2020_12 ? (d = t.prefixItems, m = Array.isArray(t.items) ? void 0 : t.items) : (d = Array.isArray(t.items) ? t.items : void 0, m = Array.isArray(t.items) ? t.additionalItems : t.items);
			let g = 0;
			if (d !== void 0) {
				const _ = Math.min(d.length, f.items.length);
				for (; g < _; g++) {
					const N = d[g], v = be(N), y = new fe(), b = f.items[g];
					b && (ae(b, v, y, r, i), n.mergePropertyMatch(y)), n.processedProperties.add(String(g));
				}
			}
			if (m !== void 0 && g < f.items.length) if (typeof m == "boolean") for (m === !1 && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Array has too many items according to schema. Expected {0} or fewer.", g)
			}); g < f.items.length; g++) n.processedProperties.add(String(g)), n.propertiesValueMatches++;
			else for (; g < f.items.length; g++) {
				const _ = new fe();
				ae(f.items[g], m, _, r, i), n.mergePropertyMatch(_), n.processedProperties.add(String(g));
			}
			const p = be(t.contains);
			if (p) {
				let _ = 0;
				for (let N = 0; N < f.items.length; N++) {
					const v = f.items[N], y = new fe();
					ae(v, p, y, Ot.instance, i), y.hasProblems() || (_++, i.schemaDraft >= ke.v2020_12 && n.processedProperties.add(String(N)));
				}
				_ === 0 && !ce(t.minContains) && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || E("Array does not contain required item.")
				}), ce(t.minContains) && _ < t.minContains && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || E("Array has too few items that match the contains contraint. Expected {0} or more.", t.minContains)
				}), ce(t.maxContains) && _ > t.maxContains && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: t.errorMessage || E("Array has too many items that match the contains contraint. Expected {0} or less.", t.maxContains)
				});
			}
			const w = t.unevaluatedItems;
			if (w !== void 0) for (let _ = 0; _ < f.items.length; _++) {
				if (!n.processedProperties.has(String(_))) if (w === !1) n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: E("Item does not match any validation rule from the array.")
				});
				else {
					const N = new fe();
					ae(f.items[_], t.unevaluatedItems, N, r, i), n.mergePropertyMatch(N);
				}
				n.processedProperties.add(String(_)), n.propertiesValueMatches++;
			}
			if (ce(t.minItems) && f.items.length < t.minItems && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Array has too few items. Expected {0} or more.", t.minItems)
			}), ce(t.maxItems) && f.items.length > t.maxItems && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Array has too many items. Expected {0} or fewer.", t.maxItems)
			}), t.uniqueItems === !0) {
				let _ = function() {
					for (let v = 0; v < N.length - 1; v++) {
						const y = N[v];
						for (let b = v + 1; b < N.length; b++) if (gt(y, N[b])) return !0;
					}
					return !1;
				};
				const N = tt(f);
				_() && n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: E("Array has duplicate items.")
				});
			}
		}
		function h(f) {
			const d = Object.create(null), m = /* @__PURE__ */ new Set();
			for (const v of f.properties) {
				const y = v.keyNode.value;
				d[y] = v.valueNode, m.add(y);
			}
			if (Array.isArray(t.required)) {
				for (const v of t.required) if (!d[v]) {
					const y = f.parent && f.parent.type === "property" && f.parent.keyNode, b = y ? {
						offset: y.offset,
						length: y.length
					} : {
						offset: f.offset,
						length: 1
					};
					n.problems.push({
						location: b,
						message: E("Missing property \"{0}\".", v)
					});
				}
			}
			const g = (v) => {
				m.delete(v), n.processedProperties.add(v);
			};
			if (t.properties) for (const v of Object.keys(t.properties)) {
				g(v);
				const y = t.properties[v], b = d[v];
				if (b) if (Ee(y)) if (y) n.propertiesMatches++, n.propertiesValueMatches++;
				else {
					const L = b.parent;
					n.problems.push({
						location: {
							offset: L.keyNode.offset,
							length: L.keyNode.length
						},
						message: t.errorMessage || E("Property {0} is not allowed.", v)
					});
				}
				else {
					const L = new fe();
					ae(b, y, L, r, i), n.mergePropertyMatch(L);
				}
			}
			if (t.patternProperties) for (const v of Object.keys(t.patternProperties)) {
				const y = gn(v);
				if (y) {
					const b = [];
					for (const L of m) if (y.test(L)) {
						b.push(L);
						const S = d[L];
						if (S) {
							const T = t.patternProperties[v];
							if (Ee(T)) if (T) n.propertiesMatches++, n.propertiesValueMatches++;
							else {
								const F = S.parent;
								n.problems.push({
									location: {
										offset: F.keyNode.offset,
										length: F.keyNode.length
									},
									message: t.errorMessage || E("Property {0} is not allowed.", L)
								});
							}
							else {
								const F = new fe();
								ae(S, T, F, r, i), n.mergePropertyMatch(F);
							}
						}
					}
					b.forEach(g);
				}
			}
			const p = t.additionalProperties;
			if (p !== void 0) for (const v of m) {
				g(v);
				const y = d[v];
				if (y) {
					if (p === !1) {
						const b = y.parent;
						n.problems.push({
							location: {
								offset: b.keyNode.offset,
								length: b.keyNode.length
							},
							message: t.errorMessage || E("Property {0} is not allowed.", v)
						});
					} else if (p !== !0) {
						const b = new fe();
						ae(y, p, b, r, i), n.mergePropertyMatch(b);
					}
				}
			}
			const w = t.unevaluatedProperties;
			if (w !== void 0) {
				const v = [];
				for (const y of m) if (!n.processedProperties.has(y)) {
					v.push(y);
					const b = d[y];
					if (b) {
						if (w === !1) {
							const L = b.parent;
							n.problems.push({
								location: {
									offset: L.keyNode.offset,
									length: L.keyNode.length
								},
								message: t.errorMessage || E("Property {0} is not allowed.", y)
							});
						} else if (w !== !0) {
							const L = new fe();
							ae(b, w, L, r, i), n.mergePropertyMatch(L);
						}
					}
				}
				v.forEach(g);
			}
			if (ce(t.maxProperties) && f.properties.length > t.maxProperties && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Object has more properties than limit of {0}.", t.maxProperties)
			}), ce(t.minProperties) && f.properties.length < t.minProperties && n.problems.push({
				location: {
					offset: f.offset,
					length: f.length
				},
				message: E("Object has fewer properties than the required number of {0}", t.minProperties)
			}), t.dependentRequired) for (const v in t.dependentRequired) {
				const y = d[v], b = t.dependentRequired[v];
				y && Array.isArray(b) && N(v, b);
			}
			if (t.dependentSchemas) for (const v in t.dependentSchemas) {
				const y = d[v], b = t.dependentSchemas[v];
				y && ze(b) && N(v, b);
			}
			if (t.dependencies) for (const v in t.dependencies) d[v] && N(v, t.dependencies[v]);
			const _ = be(t.propertyNames);
			if (_) for (const v of f.properties) {
				const y = v.keyNode;
				y && ae(y, _, n, Ot.instance, i);
			}
			function N(v, y) {
				if (Array.isArray(y)) for (const b of y) d[b] ? n.propertiesValueMatches++ : n.problems.push({
					location: {
						offset: f.offset,
						length: f.length
					},
					message: E("Object is missing property {0} required by property {1}.", b, v)
				});
				else {
					const b = be(y);
					if (b) {
						const L = new fe();
						ae(f, b, L, r, i), n.mergePropertyMatch(L);
					}
				}
			}
		}
	}
	function Cc(e, t) {
		const n = [];
		let r = -1;
		const i = e.getText(), s = Ze(i, !1), o = t && t.collectComments ? [] : void 0;
		function l() {
			for (;;) {
				const b = s.scan();
				switch (h(), b) {
					case 12:
					case 13:
						Array.isArray(o) && o.push(U.create(e.positionAt(s.getTokenOffset()), e.positionAt(s.getTokenOffset() + s.getTokenLength())));
						break;
					case 15:
					case 14: break;
					default: return b;
				}
			}
		}
		function a(b, L, S, T, F = ge.Error) {
			if (n.length === 0 || S !== r) {
				const D = U.create(e.positionAt(S), e.positionAt(T));
				n.push(De.create(D, b, F, L, e.languageId)), r = S;
			}
		}
		function u(b, L, S = void 0, T = [], F = []) {
			let D = s.getTokenOffset(), M = s.getTokenOffset() + s.getTokenLength();
			if (D === M && D > 0) {
				for (D--; D > 0 && /\s/.test(i.charAt(D));) D--;
				M = D + 1;
			}
			if (a(b, L, D, M), S && f(S, !1), T.length + F.length > 0) {
				let k = s.getToken();
				for (; k !== 17;) {
					if (T.indexOf(k) !== -1) {
						l();
						break;
					} else if (F.indexOf(k) !== -1) break;
					k = l();
				}
			}
			return S;
		}
		function h() {
			switch (s.getTokenError()) {
				case 4: return u(E("Invalid unicode sequence in string."), j.InvalidUnicode), !0;
				case 5: return u(E("Invalid escape character in string."), j.InvalidEscapeCharacter), !0;
				case 3: return u(E("Unexpected end of number."), j.UnexpectedEndOfNumber), !0;
				case 1: return u(E("Unexpected end of comment."), j.UnexpectedEndOfComment), !0;
				case 2: return u(E("Unexpected end of string."), j.UnexpectedEndOfString), !0;
				case 6: return u(E("Invalid characters in string. Control characters must be escaped."), j.InvalidCharacter), !0;
			}
			return !1;
		}
		function f(b, L) {
			return b.length = s.getTokenOffset() + s.getTokenLength() - b.offset, L && l(), b;
		}
		function d(b) {
			if (s.getToken() !== 3) return;
			const L = new Sc(b, s.getTokenOffset());
			l();
			let S = !1;
			for (; s.getToken() !== 4 && s.getToken() !== 17;) {
				if (s.getToken() === 5) {
					S || u(E("Value expected"), j.ValueExpected);
					const F = s.getTokenOffset();
					if (l(), s.getToken() === 4) {
						S && a(E("Trailing comma"), j.TrailingComma, F, F + 1);
						continue;
					}
				} else S && u(E("Expected comma"), j.CommaExpected);
				const T = v(L);
				T ? L.items.push(T) : u(E("Value expected"), j.ValueExpected, void 0, [], [4, 5]), S = !0;
			}
			return s.getToken() !== 4 ? u(E("Expected comma or closing bracket"), j.CommaOrCloseBacketExpected, L) : f(L, !0);
		}
		const m = new $r(void 0, 0, 0);
		function g(b, L) {
			const S = new kc(b, s.getTokenOffset(), m);
			let T = w(S);
			if (!T) if (s.getToken() === 16) {
				u(E("Property keys must be doublequoted"), j.PropertyKeysMustBeDoublequoted);
				const D = new $r(S, s.getTokenOffset(), s.getTokenLength());
				D.value = s.getTokenValue(), T = D, l();
			} else return;
			if (S.keyNode = T, T.value !== "//") {
				const D = L[T.value];
				D ? (a(E("Duplicate object key"), j.DuplicateKey, S.keyNode.offset, S.keyNode.offset + S.keyNode.length, ge.Warning), ze(D) && a(E("Duplicate object key"), j.DuplicateKey, D.keyNode.offset, D.keyNode.offset + D.keyNode.length, ge.Warning), L[T.value] = !0) : L[T.value] = S;
			}
			if (s.getToken() === 6) S.colonOffset = s.getTokenOffset(), l();
			else if (u(E("Colon expected"), j.ColonExpected), s.getToken() === 10 && e.positionAt(T.offset + T.length).line < e.positionAt(s.getTokenOffset()).line) return S.length = T.length, S;
			const F = v(S);
			return F ? (S.valueNode = F, S.length = F.offset + F.length - S.offset, S) : u(E("Value expected"), j.ValueExpected, S, [], [2, 5]);
		}
		function p(b) {
			if (s.getToken() !== 1) return;
			const L = new xc(b, s.getTokenOffset()), S = Object.create(null);
			l();
			let T = !1;
			for (; s.getToken() !== 2 && s.getToken() !== 17;) {
				if (s.getToken() === 5) {
					T || u(E("Property expected"), j.PropertyExpected);
					const D = s.getTokenOffset();
					if (l(), s.getToken() === 2) {
						T && a(E("Trailing comma"), j.TrailingComma, D, D + 1);
						continue;
					}
				} else T && u(E("Expected comma"), j.CommaExpected);
				const F = g(L, S);
				F ? L.properties.push(F) : u(E("Property expected"), j.PropertyExpected, void 0, [], [2, 5]), T = !0;
			}
			return s.getToken() !== 2 ? u(E("Expected comma or closing brace"), j.CommaOrCloseBraceExpected, L) : f(L, !0);
		}
		function w(b) {
			if (s.getToken() !== 10) return;
			const L = new $r(b, s.getTokenOffset());
			return L.value = s.getTokenValue(), f(L, !0);
		}
		function _(b) {
			if (s.getToken() !== 11) return;
			const L = new Ac(b, s.getTokenOffset());
			if (s.getTokenError() === 0) {
				const S = s.getTokenValue();
				try {
					const T = JSON.parse(S);
					if (!ce(T)) return u(E("Invalid number format."), j.Undefined, L);
					L.value = T;
				} catch {
					return u(E("Invalid number format."), j.Undefined, L);
				}
				L.isInteger = S.indexOf(".") === -1;
			}
			return f(L, !0);
		}
		function N(b) {
			switch (s.getToken()) {
				case 7: return f(new Nc(b, s.getTokenOffset()), !0);
				case 8: return f(new So(b, !0, s.getTokenOffset()), !0);
				case 9: return f(new So(b, !1, s.getTokenOffset()), !0);
				default: return;
			}
		}
		function v(b) {
			return d(b) || p(b) || w(b) || _(b) || N(b);
		}
		let y;
		return l() !== 17 && (y = v(y), y ? s.getToken() !== 17 && u(E("End of file expected."), j.Undefined) : u(E("Expected a JSON object, array or literal."), j.Undefined)), new Ro(y, n, o);
	}
	function Ur(e, t, n) {
		if (e !== null && typeof e == "object") {
			const r = t + "	";
			if (Array.isArray(e)) {
				if (e.length === 0) return "[]";
				let i = `[
`;
				for (let s = 0; s < e.length; s++) i += r + Ur(e[s], r, n), s < e.length - 1 && (i += ","), i += `
`;
				return i += t + "]", i;
			} else {
				const i = Object.keys(e);
				if (i.length === 0) return "{}";
				let s = `{
`;
				for (let o = 0; o < i.length; o++) {
					const l = i[o];
					s += r + JSON.stringify(l) + ": " + Ur(e[l], r, n), o < i.length - 1 && (s += ","), s += `
`;
				}
				return s += t + "}", s;
			}
		}
		return n(e);
	}
	var Tc = class {
		constructor(e, t = [], n = Promise, r = {}) {
			this.schemaService = e, this.contributions = t, this.promiseConstructor = n, this.clientCapabilities = r;
		}
		doResolve(e) {
			for (let t = this.contributions.length - 1; t >= 0; t--) {
				const n = this.contributions[t].resolveCompletion;
				if (n) {
					const r = n(e);
					if (r) return r;
				}
			}
			return this.promiseConstructor.resolve(e);
		}
		doComplete(e, t, n) {
			const r = {
				items: [],
				isIncomplete: !1
			}, i = e.getText(), s = e.offsetAt(t);
			let o = n.getNodeFromOffset(s, !0);
			if (this.isInComment(e, o ? o.offset : 0, s)) return Promise.resolve(r);
			if (o && s === o.offset + o.length && s > 0) {
				const f = i[s - 1];
				(o.type === "object" && f === "}" || o.type === "array" && f === "]") && (o = o.parent);
			}
			const l = this.getCurrentWord(e, s);
			let a;
			if (o && (o.type === "string" || o.type === "number" || o.type === "boolean" || o.type === "null")) a = U.create(e.positionAt(o.offset), e.positionAt(o.offset + o.length));
			else {
				let f = s - l.length;
				f > 0 && i[f - 1] === "\"" && f--, a = U.create(e.positionAt(f), t);
			}
			const u = /* @__PURE__ */ new Map(), h = {
				add: (f) => {
					let d = f.label;
					const m = u.get(d);
					if (m) m.documentation || (m.documentation = f.documentation), m.detail || (m.detail = f.detail), m.labelDetails || (m.labelDetails = f.labelDetails);
					else {
						if (d = d.replace(/[\n]/g, "↵"), d.length > 60) {
							const g = d.substr(0, 57).trim() + "...";
							u.has(g) || (d = g);
						}
						f.textEdit = Me.replace(a, f.insertText), f.label = d, u.set(d, f), r.items.push(f);
					}
				},
				setAsIncomplete: () => {
					r.isIncomplete = !0;
				},
				error: (f) => {
					console.error(f);
				},
				getNumberOfProposals: () => r.items.length
			};
			return this.schemaService.getSchemaForResource(e.uri, n).then((f) => {
				const d = [];
				let m = !0, g = "", p;
				if (o && o.type === "string") {
					const _ = o.parent;
					_ && _.type === "property" && _.keyNode === o && (m = !_.valueNode, p = _, g = i.substr(o.offset + 1, o.length - 2), _ && (o = _.parent));
				}
				if (o && o.type === "object") {
					if (o.offset === s) return r;
					o.properties.forEach((v) => {
						(!p || p !== v) && u.set(v.keyNode.value, Ir.create("__"));
					});
					let _ = "";
					m && (_ = this.evaluateSeparatorAfter(e, e.offsetAt(a.end))), f ? this.getPropertyCompletions(f, n, o, m, _, h) : this.getSchemaLessPropertyCompletions(n, o, g, h);
					const N = Br(o);
					this.contributions.forEach((v) => {
						const y = v.collectPropertyCompletions(e.uri, N, l, m, _ === "", h);
						y && d.push(y);
					}), !f && l.length > 0 && i.charAt(s - l.length - 1) !== "\"" && (h.add({
						kind: pe.Property,
						label: this.getLabelForValue(l),
						insertText: this.getInsertTextForProperty(l, void 0, !1, _),
						insertTextFormat: ne.Snippet,
						documentation: ""
					}), h.setAsIncomplete());
				}
				const w = {};
				return f ? this.getValueCompletions(f, n, o, s, e, h, w) : this.getSchemaLessValueCompletions(n, o, s, e, h), this.contributions.length > 0 && this.getContributedValueCompletions(n, o, s, e, h, d), this.promiseConstructor.all(d).then(() => {
					if (h.getNumberOfProposals() === 0) {
						let _ = s;
						o && (o.type === "string" || o.type === "number" || o.type === "boolean" || o.type === "null") && (_ = o.offset + o.length);
						const N = this.evaluateSeparatorAfter(e, _);
						this.addFillerValueCompletions(w, N, h);
					}
					return r;
				});
			});
		}
		getPropertyCompletions(e, t, n, r, i, s) {
			t.getMatchingSchemas(e.schema, n.offset).forEach((o) => {
				if (o.node === n && !o.inverted) {
					const l = o.schema.properties;
					l && Object.keys(l).forEach((u) => {
						const h = l[u];
						if (typeof h == "object" && !h.deprecationMessage && !h.doNotSuggest) {
							const f = {
								kind: pe.Property,
								label: u,
								insertText: this.getInsertTextForProperty(u, h, r, i),
								insertTextFormat: ne.Snippet,
								filterText: this.getFilterTextForValue(u),
								documentation: this.fromMarkup(h.markdownDescription) || h.description || ""
							};
							h.suggestSortText !== void 0 && (f.sortText = h.suggestSortText), f.insertText && Ft(f.insertText, `$1${i}`) && (f.command = {
								title: "Suggest",
								command: "editor.action.triggerSuggest"
							}), s.add(f);
						}
					});
					const a = o.schema.propertyNames;
					if (typeof a == "object" && !a.deprecationMessage && !a.doNotSuggest) {
						const u = (h, f = void 0) => {
							const d = {
								kind: pe.Property,
								label: h,
								insertText: this.getInsertTextForProperty(h, void 0, r, i),
								insertTextFormat: ne.Snippet,
								filterText: this.getFilterTextForValue(h),
								documentation: f || this.fromMarkup(a.markdownDescription) || a.description || ""
							};
							a.suggestSortText !== void 0 && (d.sortText = a.suggestSortText), d.insertText && Ft(d.insertText, `$1${i}`) && (d.command = {
								title: "Suggest",
								command: "editor.action.triggerSuggest"
							}), s.add(d);
						};
						if (a.enum) for (let h = 0; h < a.enum.length; h++) {
							let f;
							a.markdownEnumDescriptions && h < a.markdownEnumDescriptions.length ? f = this.fromMarkup(a.markdownEnumDescriptions[h]) : a.enumDescriptions && h < a.enumDescriptions.length && (f = a.enumDescriptions[h]), u(a.enum[h], f);
						}
						a.const && u(a.const);
					}
				}
			});
		}
		getSchemaLessPropertyCompletions(e, t, n, r) {
			const i = (s) => {
				s.properties.forEach((o) => {
					const l = o.keyNode.value;
					r.add({
						kind: pe.Property,
						label: l,
						insertText: this.getInsertTextForValue(l, ""),
						insertTextFormat: ne.Snippet,
						filterText: this.getFilterTextForValue(l),
						documentation: ""
					});
				});
			};
			if (t.parent) if (t.parent.type === "property") {
				const s = t.parent.keyNode.value;
				e.visit((o) => (o.type === "property" && o !== t.parent && o.keyNode.value === s && o.valueNode && o.valueNode.type === "object" && i(o.valueNode), !0));
			} else t.parent.type === "array" && t.parent.items.forEach((s) => {
				s.type === "object" && s !== t && i(s);
			});
			else t.type === "object" && r.add({
				kind: pe.Property,
				label: "$schema",
				insertText: this.getInsertTextForProperty("$schema", void 0, !0, ""),
				insertTextFormat: ne.Snippet,
				documentation: "",
				filterText: this.getFilterTextForValue("$schema")
			});
		}
		getSchemaLessValueCompletions(e, t, n, r, i) {
			let s = n;
			if (t && (t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (s = t.offset + t.length, t = t.parent), !t) {
				i.add({
					kind: this.getSuggestionKind("object"),
					label: "Empty object",
					insertText: this.getInsertTextForValue({}, ""),
					insertTextFormat: ne.Snippet,
					documentation: ""
				}), i.add({
					kind: this.getSuggestionKind("array"),
					label: "Empty array",
					insertText: this.getInsertTextForValue([], ""),
					insertTextFormat: ne.Snippet,
					documentation: ""
				});
				return;
			}
			const o = this.evaluateSeparatorAfter(r, s), l = (a) => {
				a.parent && !xo(a.parent, n, !0) && i.add({
					kind: this.getSuggestionKind(a.type),
					label: this.getLabelTextForMatchingNode(a, r),
					insertText: this.getInsertTextForMatchingNode(a, r, o),
					insertTextFormat: ne.Snippet,
					documentation: ""
				}), a.type === "boolean" && this.addBooleanValueCompletion(!a.value, o, i);
			};
			if (t.type === "property" && n > (t.colonOffset || 0)) {
				const a = t.valueNode;
				if (a && (n > a.offset + a.length || a.type === "object" || a.type === "array")) return;
				const u = t.keyNode.value;
				e.visit((h) => (h.type === "property" && h.keyNode.value === u && h.valueNode && l(h.valueNode), !0)), u === "$schema" && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(o, i);
			}
			if (t.type === "array") if (t.parent && t.parent.type === "property") {
				const a = t.parent.keyNode.value;
				e.visit((u) => (u.type === "property" && u.keyNode.value === a && u.valueNode && u.valueNode.type === "array" && u.valueNode.items.forEach(l), !0));
			} else t.items.forEach(l);
		}
		getValueCompletions(e, t, n, r, i, s, o) {
			let l = r, a, u;
			if (n && (n.type === "string" || n.type === "number" || n.type === "boolean" || n.type === "null") && (l = n.offset + n.length, u = n, n = n.parent), !n) {
				this.addSchemaValueCompletions(e.schema, "", s, o);
				return;
			}
			if (n.type === "property" && r > (n.colonOffset || 0)) {
				const h = n.valueNode;
				if (h && r > h.offset + h.length) return;
				a = n.keyNode.value, n = n.parent;
			}
			if (n && (a !== void 0 || n.type === "array")) {
				const h = this.evaluateSeparatorAfter(i, l), f = t.getMatchingSchemas(e.schema, n.offset, u);
				for (const d of f) if (d.node === n && !d.inverted && d.schema) {
					if (n.type === "array" && d.schema.items) {
						let m = s;
						if (d.schema.uniqueItems) {
							const g = /* @__PURE__ */ new Set();
							n.children.forEach((p) => {
								p.type !== "array" && p.type !== "object" && g.add(this.getLabelForValue(tt(p)));
							}), m = {
								...s,
								add(p) {
									g.has(p.label) || s.add(p);
								}
							};
						}
						if (Array.isArray(d.schema.items)) {
							const g = this.findItemAtOffset(n, i, r);
							g < d.schema.items.length && this.addSchemaValueCompletions(d.schema.items[g], h, m, o);
						} else this.addSchemaValueCompletions(d.schema.items, h, m, o);
					}
					if (a !== void 0) {
						let m = !1;
						if (d.schema.properties) {
							const g = d.schema.properties[a];
							g && (m = !0, this.addSchemaValueCompletions(g, h, s, o));
						}
						if (d.schema.patternProperties && !m) {
							for (const g of Object.keys(d.schema.patternProperties)) if (gn(g)?.test(a)) {
								m = !0;
								const p = d.schema.patternProperties[g];
								this.addSchemaValueCompletions(p, h, s, o);
							}
						}
						if (d.schema.additionalProperties && !m) {
							const g = d.schema.additionalProperties;
							this.addSchemaValueCompletions(g, h, s, o);
						}
					}
				}
				a === "$schema" && !n.parent && this.addDollarSchemaCompletions(h, s), o.boolean && (this.addBooleanValueCompletion(!0, h, s), this.addBooleanValueCompletion(!1, h, s)), o.null && this.addNullValueCompletion(h, s);
			}
		}
		getContributedValueCompletions(e, t, n, r, i, s) {
			if (!t) this.contributions.forEach((o) => {
				const l = o.collectDefaultCompletions(r.uri, i);
				l && s.push(l);
			});
			else if ((t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (t = t.parent), t && t.type === "property" && n > (t.colonOffset || 0)) {
				const o = t.keyNode.value, l = t.valueNode;
				if ((!l || n <= l.offset + l.length) && t.parent) {
					const a = Br(t.parent);
					this.contributions.forEach((u) => {
						const h = u.collectValueCompletions(r.uri, a, o, i);
						h && s.push(h);
					});
				}
			}
		}
		addSchemaValueCompletions(e, t, n, r) {
			typeof e == "object" && (this.addEnumValueCompletions(e, t, n), this.addDefaultValueCompletions(e, t, n), this.collectTypes(e, r), Array.isArray(e.allOf) && e.allOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.anyOf) && e.anyOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.oneOf) && e.oneOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)));
		}
		addDefaultValueCompletions(e, t, n, r = 0) {
			let i = !1;
			if (Se(e.default)) {
				let s = e.type, o = e.default;
				for (let a = r; a > 0; a--) o = [o], s = "array";
				const l = {
					kind: this.getSuggestionKind(s),
					label: this.getLabelForValue(o),
					insertText: this.getInsertTextForValue(o, t),
					insertTextFormat: ne.Snippet
				};
				this.doesSupportsLabelDetails() ? l.labelDetails = { description: E("Default value") } : l.detail = E("Default value"), n.add(l), i = !0;
			}
			Array.isArray(e.examples) && e.examples.forEach((s) => {
				let o = e.type, l = s;
				for (let a = r; a > 0; a--) l = [l], o = "array";
				n.add({
					kind: this.getSuggestionKind(o),
					label: this.getLabelForValue(l),
					insertText: this.getInsertTextForValue(l, t),
					insertTextFormat: ne.Snippet
				}), i = !0;
			}), Array.isArray(e.defaultSnippets) && e.defaultSnippets.forEach((s) => {
				let o = e.type, l = s.body, a = s.label, u, h;
				if (Se(l)) {
					e.type;
					for (let f = r; f > 0; f--) l = [l];
					u = this.getInsertTextForSnippetValue(l, t), h = this.getFilterTextForSnippetValue(l), a = a || this.getLabelForSnippetValue(l);
				} else if (typeof s.bodyText == "string") {
					let f = "", d = "", m = "";
					for (let g = r; g > 0; g--) f = f + m + `[
`, d = d + `
` + m + "]", m += "	", o = "array";
					u = f + m + s.bodyText.split(`
`).join(`
` + m) + d + t, a = a || u, h = u.replace(/[\n]/g, "");
				} else return;
				n.add({
					kind: this.getSuggestionKind(o),
					label: a,
					documentation: this.fromMarkup(s.markdownDescription) || s.description,
					insertText: u,
					insertTextFormat: ne.Snippet,
					filterText: h
				}), i = !0;
			}), !i && typeof e.items == "object" && !Array.isArray(e.items) && r < 5 && this.addDefaultValueCompletions(e.items, t, n, r + 1);
		}
		addEnumValueCompletions(e, t, n) {
			if (Se(e.const) && n.add({
				kind: this.getSuggestionKind(e.type),
				label: this.getLabelForValue(e.const),
				insertText: this.getInsertTextForValue(e.const, t),
				insertTextFormat: ne.Snippet,
				documentation: this.fromMarkup(e.markdownDescription) || e.description
			}), Array.isArray(e.enum)) for (let r = 0, i = e.enum.length; r < i; r++) {
				const s = e.enum[r];
				let o = this.fromMarkup(e.markdownDescription) || e.description;
				e.markdownEnumDescriptions && r < e.markdownEnumDescriptions.length && this.doesSupportMarkdown() ? o = this.fromMarkup(e.markdownEnumDescriptions[r]) : e.enumDescriptions && r < e.enumDescriptions.length && (o = e.enumDescriptions[r]), n.add({
					kind: this.getSuggestionKind(e.type),
					label: this.getLabelForValue(s),
					insertText: this.getInsertTextForValue(s, t),
					insertTextFormat: ne.Snippet,
					documentation: o
				});
			}
		}
		collectTypes(e, t) {
			if (Array.isArray(e.enum) || Se(e.const)) return;
			const n = e.type;
			Array.isArray(n) ? n.forEach((r) => t[r] = !0) : n && (t[n] = !0);
		}
		addFillerValueCompletions(e, t, n) {
			e.object && n.add({
				kind: this.getSuggestionKind("object"),
				label: "{}",
				insertText: this.getInsertTextForGuessedValue({}, t),
				insertTextFormat: ne.Snippet,
				detail: E("New object"),
				documentation: ""
			}), e.array && n.add({
				kind: this.getSuggestionKind("array"),
				label: "[]",
				insertText: this.getInsertTextForGuessedValue([], t),
				insertTextFormat: ne.Snippet,
				detail: E("New array"),
				documentation: ""
			});
		}
		addBooleanValueCompletion(e, t, n) {
			n.add({
				kind: this.getSuggestionKind("boolean"),
				label: e ? "true" : "false",
				insertText: this.getInsertTextForValue(e, t),
				insertTextFormat: ne.Snippet,
				documentation: ""
			});
		}
		addNullValueCompletion(e, t) {
			t.add({
				kind: this.getSuggestionKind("null"),
				label: "null",
				insertText: "null" + e,
				insertTextFormat: ne.Snippet,
				documentation: ""
			});
		}
		addDollarSchemaCompletions(e, t) {
			this.schemaService.getRegisteredSchemaIds((n) => n === "http" || n === "https").forEach((n) => {
				n.startsWith("http://json-schema.org/draft-") && (n = n + "#"), t.add({
					kind: pe.Module,
					label: this.getLabelForValue(n),
					filterText: this.getFilterTextForValue(n),
					insertText: this.getInsertTextForValue(n, e),
					insertTextFormat: ne.Snippet,
					documentation: ""
				});
			});
		}
		getLabelForValue(e) {
			return JSON.stringify(e);
		}
		getValueFromLabel(e) {
			return JSON.parse(e);
		}
		getFilterTextForValue(e) {
			return JSON.stringify(e);
		}
		getFilterTextForSnippetValue(e) {
			return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
		}
		getLabelForSnippetValue(e) {
			return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
		}
		getInsertTextForPlainText(e) {
			return e.replace(/[\\\$\}]/g, "\\$&");
		}
		getInsertTextForValue(e, t) {
			const n = JSON.stringify(e, null, "	");
			return n === "{}" ? "{$1}" + t : n === "[]" ? "[$1]" + t : this.getInsertTextForPlainText(n + t);
		}
		getInsertTextForSnippetValue(e, t) {
			return Ur(e, "", (r) => typeof r == "string" && r[0] === "^" ? r.substr(1) : JSON.stringify(r)) + t;
		}
		getInsertTextForGuessedValue(e, t) {
			switch (typeof e) {
				case "object": return e === null ? "${1:null}" + t : this.getInsertTextForValue(e, t);
				case "string":
					let n = JSON.stringify(e);
					return n = n.substr(1, n.length - 2), n = this.getInsertTextForPlainText(n), "\"${1:" + n + "}\"" + t;
				case "number":
				case "boolean": return "${1:" + JSON.stringify(e) + "}" + t;
			}
			return this.getInsertTextForValue(e, t);
		}
		getSuggestionKind(e) {
			if (Array.isArray(e)) {
				const t = e;
				e = t.length > 0 ? t[0] : void 0;
			}
			if (!e) return pe.Value;
			switch (e) {
				case "string": return pe.Value;
				case "object": return pe.Module;
				case "property": return pe.Property;
				default: return pe.Value;
			}
		}
		getLabelTextForMatchingNode(e, t) {
			switch (e.type) {
				case "array": return "[]";
				case "object": return "{}";
				default: return t.getText().substr(e.offset, e.length);
			}
		}
		getInsertTextForMatchingNode(e, t, n) {
			switch (e.type) {
				case "array": return this.getInsertTextForValue([], n);
				case "object": return this.getInsertTextForValue({}, n);
				default:
					const r = t.getText().substr(e.offset, e.length) + n;
					return this.getInsertTextForPlainText(r);
			}
		}
		getInsertTextForProperty(e, t, n, r) {
			const i = this.getInsertTextForValue(e, "");
			if (!n) return i;
			const s = i + ": ";
			let o, l = 0;
			if (t) {
				if (Array.isArray(t.defaultSnippets)) {
					if (t.defaultSnippets.length === 1) {
						const a = t.defaultSnippets[0].body;
						Se(a) && (o = this.getInsertTextForSnippetValue(a, ""));
					}
					l += t.defaultSnippets.length;
				}
				if (t.enum && (!o && t.enum.length === 1 && (o = this.getInsertTextForGuessedValue(t.enum[0], "")), l += t.enum.length), Se(t.const) && (o || (o = this.getInsertTextForGuessedValue(t.const, "")), l++), Se(t.default) && (o || (o = this.getInsertTextForGuessedValue(t.default, "")), l++), Array.isArray(t.examples) && t.examples.length && (o || (o = this.getInsertTextForGuessedValue(t.examples[0], "")), l += t.examples.length), l === 0) {
					let a = Array.isArray(t.type) ? t.type[0] : t.type;
					switch (a || (t.properties ? a = "object" : t.items && (a = "array")), a) {
						case "boolean":
							o = "$1";
							break;
						case "string":
							o = "\"$1\"";
							break;
						case "object":
							o = "{$1}";
							break;
						case "array":
							o = "[$1]";
							break;
						case "number":
						case "integer":
							o = "${1:0}";
							break;
						case "null":
							o = "${1:null}";
							break;
						default: return i;
					}
				}
			}
			return (!o || l > 1) && (o = "$1"), s + o + r;
		}
		getCurrentWord(e, t) {
			let n = t - 1;
			const r = e.getText();
			for (; n >= 0 && ` 	
\r\v":{[,]}`.indexOf(r.charAt(n)) === -1;) n--;
			return r.substring(n + 1, t);
		}
		evaluateSeparatorAfter(e, t) {
			const n = Ze(e.getText(), !0);
			switch (n.setPosition(t), n.scan()) {
				case 5:
				case 2:
				case 4:
				case 17: return "";
				default: return ",";
			}
		}
		findItemAtOffset(e, t, n) {
			const r = Ze(t.getText(), !0), i = e.items;
			for (let s = i.length - 1; s >= 0; s--) {
				const o = i[s];
				if (n > o.offset + o.length) return r.setPosition(o.offset + o.length), r.scan() === 5 && n >= r.getTokenOffset() + r.getTokenLength() ? s + 1 : s;
				if (n >= o.offset) return s;
			}
			return 0;
		}
		isInComment(e, t, n) {
			const r = Ze(e.getText(), !1);
			r.setPosition(t);
			let i = r.scan();
			for (; i !== 17 && r.getTokenOffset() + r.getTokenLength() < n;) i = r.scan();
			return (i === 12 || i === 13) && r.getTokenOffset() <= n;
		}
		fromMarkup(e) {
			if (e && this.doesSupportMarkdown()) return {
				kind: Ke.Markdown,
				value: e
			};
		}
		doesSupportMarkdown() {
			if (!Se(this.supportsMarkdown)) {
				const e = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
				this.supportsMarkdown = Array.isArray(e) && e.indexOf(Ke.Markdown) !== -1;
			}
			return this.supportsMarkdown;
		}
		doesSupportsCommitCharacters() {
			return Se(this.supportsCommitCharacters) || (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport), this.supportsCommitCharacters;
		}
		doesSupportsLabelDetails() {
			return Se(this.labelDetailsSupport) || (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport), this.labelDetailsSupport;
		}
	}, Pc = class {
		constructor(e, t = [], n) {
			this.schemaService = e, this.contributions = t, this.promise = n || Promise;
		}
		doHover(e, t, n) {
			const r = e.offsetAt(t);
			let i = n.getNodeFromOffset(r);
			if (!i || (i.type === "object" || i.type === "array") && r > i.offset + 1 && r < i.offset + i.length - 1) return this.promise.resolve(null);
			const s = i;
			if (i.type === "string") {
				const u = i.parent;
				if (u && u.type === "property" && u.keyNode === i && (i = u.valueNode, !i)) return this.promise.resolve(null);
			}
			const o = U.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), l = (u) => ({
				contents: u,
				range: o
			}), a = Br(i);
			for (let u = this.contributions.length - 1; u >= 0; u--) {
				const h = this.contributions[u].getInfoContribution(e.uri, a);
				if (h) return h.then((f) => l(f));
			}
			return this.schemaService.getSchemaForResource(e.uri, n).then((u) => {
				if (u && i) {
					const h = n.getMatchingSchemas(u.schema, i.offset);
					let f, d, m, g;
					h.every((w) => {
						if (w.node === i && !w.inverted && w.schema && (f = f || w.schema.title, d = d || w.schema.markdownDescription || qr(w.schema.description), w.schema.enum)) {
							const _ = w.schema.enum.indexOf(tt(i));
							w.schema.markdownEnumDescriptions ? m = w.schema.markdownEnumDescriptions[_] : w.schema.enumDescriptions && (m = qr(w.schema.enumDescriptions[_])), m && (g = w.schema.enum[_], typeof g != "string" && (g = JSON.stringify(g)));
						}
						return !0;
					});
					let p = "";
					return f && (p = qr(f)), d && (p.length > 0 && (p += `

`), p += d), m && (p.length > 0 && (p += `

`), p += `\`${Ic(g)}\`: ${m}`), l([p]);
				}
				return null;
			});
		}
	};
	function qr(e) {
		if (e) return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, `$1

$3`).replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
	}
	function Ic(e) {
		return e.indexOf("`") !== -1 ? "`` " + e + " ``" : e;
	}
	var Fc = class {
		constructor(e, t) {
			this.jsonSchemaService = e, this.promise = t, this.validationEnabled = !0;
		}
		configure(e) {
			e && (this.validationEnabled = e.validate !== !1, this.commentSeverity = e.allowComments ? void 0 : ge.Error);
		}
		doValidation(e, t, n, r) {
			if (!this.validationEnabled) return this.promise.resolve([]);
			const i = [], s = {}, o = (a) => {
				const u = a.range.start.line + " " + a.range.start.character + " " + a.message;
				s[u] || (s[u] = !0, i.push(a));
			}, l = (a) => {
				let u = n?.trailingCommas ? _n(n.trailingCommas) : ge.Error, h = n?.comments ? _n(n.comments) : this.commentSeverity, f = n?.schemaValidation ? _n(n.schemaValidation) : ge.Warning, d = n?.schemaRequest ? _n(n.schemaRequest) : ge.Warning;
				if (a) {
					const m = (g, p) => {
						if (t.root && d) {
							const w = t.root, _ = w.type === "object" ? w.properties[0] : void 0;
							if (_ && _.keyNode.value === "$schema") {
								const N = _.valueNode || _, v = U.create(e.positionAt(N.offset), e.positionAt(N.offset + N.length));
								o(De.create(v, g, d, p));
							} else {
								const N = U.create(e.positionAt(w.offset), e.positionAt(w.offset + 1));
								o(De.create(N, g, d, p));
							}
						}
					};
					if (a.errors.length) m(a.errors[0], j.SchemaResolveError);
					else if (f) {
						for (const p of a.warnings) m(p, j.SchemaUnsupportedFeature);
						const g = t.validate(e, a.schema, f, n?.schemaDraft);
						g && g.forEach(o);
					}
					Mo(a.schema) && (h = void 0), Co(a.schema) && (u = void 0);
				}
				for (const m of t.syntaxErrors) {
					if (m.code === j.TrailingComma) {
						if (typeof u != "number") continue;
						m.severity = u;
					}
					o(m);
				}
				if (typeof h == "number") {
					const m = E("Comments are not permitted in JSON.");
					t.comments.forEach((g) => {
						o(De.create(g, m, h, j.CommentNotPermitted));
					});
				}
				return i;
			};
			if (r) {
				const a = r.id || "schemaservice://untitled/" + Vc++;
				return this.jsonSchemaService.registerExternalSchema({
					uri: a,
					schema: r
				}).getResolvedSchema().then((u) => l(u));
			}
			return this.jsonSchemaService.getSchemaForResource(e.uri, t).then((a) => l(a));
		}
		getLanguageStatus(e, t) {
			return { schemas: this.jsonSchemaService.getSchemaURIsForResource(e.uri, t) };
		}
	}, Vc = 0;
	function Mo(e) {
		if (e && typeof e == "object") {
			if (Ee(e.allowComments)) return e.allowComments;
			if (e.allOf) for (const t of e.allOf) {
				const n = Mo(t);
				if (Ee(n)) return n;
			}
		}
	}
	function Co(e) {
		if (e && typeof e == "object") {
			if (Ee(e.allowTrailingCommas)) return e.allowTrailingCommas;
			const t = e;
			if (Ee(t.allowsTrailingCommas)) return t.allowsTrailingCommas;
			if (e.allOf) for (const n of e.allOf) {
				const r = Co(n);
				if (Ee(r)) return r;
			}
		}
	}
	function _n(e) {
		switch (e) {
			case "error": return ge.Error;
			case "warning": return ge.Warning;
			case "ignore": return;
		}
	}
	var To = 48, Dc = 57, Oc = 65, Ln = 97, $c = 102;
	function K(e) {
		return e < To ? 0 : e <= Dc ? e - To : (e < Ln && (e += Ln - Oc), e >= Ln && e <= $c ? e - Ln + 10 : 0);
	}
	function Bc(e) {
		if (e[0] === "#") switch (e.length) {
			case 4: return {
				red: K(e.charCodeAt(1)) * 17 / 255,
				green: K(e.charCodeAt(2)) * 17 / 255,
				blue: K(e.charCodeAt(3)) * 17 / 255,
				alpha: 1
			};
			case 5: return {
				red: K(e.charCodeAt(1)) * 17 / 255,
				green: K(e.charCodeAt(2)) * 17 / 255,
				blue: K(e.charCodeAt(3)) * 17 / 255,
				alpha: K(e.charCodeAt(4)) * 17 / 255
			};
			case 7: return {
				red: (K(e.charCodeAt(1)) * 16 + K(e.charCodeAt(2))) / 255,
				green: (K(e.charCodeAt(3)) * 16 + K(e.charCodeAt(4))) / 255,
				blue: (K(e.charCodeAt(5)) * 16 + K(e.charCodeAt(6))) / 255,
				alpha: 1
			};
			case 9: return {
				red: (K(e.charCodeAt(1)) * 16 + K(e.charCodeAt(2))) / 255,
				green: (K(e.charCodeAt(3)) * 16 + K(e.charCodeAt(4))) / 255,
				blue: (K(e.charCodeAt(5)) * 16 + K(e.charCodeAt(6))) / 255,
				alpha: (K(e.charCodeAt(7)) * 16 + K(e.charCodeAt(8))) / 255
			};
		}
	}
	var Uc = class {
		constructor(e) {
			this.schemaService = e;
		}
		findDocumentSymbols(e, t, n = { resultLimit: Number.MAX_VALUE }) {
			const r = t.root;
			if (!r) return [];
			let i = n.resultLimit || Number.MAX_VALUE;
			const s = e.uri;
			if ((s === "vscode://defaultsettings/keybindings.json" || Ft(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
				const f = [];
				for (const d of r.items) if (d.type === "object") {
					for (const m of d.properties) if (m.keyNode.value === "key" && m.valueNode) {
						const g = pt.create(e.uri, Ge(e, d));
						if (f.push({
							name: Po(m.valueNode),
							kind: Ce.Function,
							location: g
						}), i--, i <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), f;
					}
				}
				return f;
			}
			const o = [{
				node: r,
				containerName: ""
			}];
			let l = 0, a = !1;
			const u = [], h = (f, d) => {
				f.type === "array" ? f.items.forEach((m) => {
					m && o.push({
						node: m,
						containerName: d
					});
				}) : f.type === "object" && f.properties.forEach((m) => {
					const g = m.valueNode;
					if (g) if (i > 0) {
						i--;
						const p = pt.create(e.uri, Ge(e, m)), w = d ? d + "." + m.keyNode.value : m.keyNode.value;
						u.push({
							name: this.getKeyLabel(m),
							kind: this.getSymbolKind(g.type),
							location: p,
							containerName: d
						}), o.push({
							node: g,
							containerName: w
						});
					} else a = !0;
				});
			};
			for (; l < o.length;) {
				const f = o[l++];
				h(f.node, f.containerName);
			}
			return a && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), u;
		}
		findDocumentSymbols2(e, t, n = { resultLimit: Number.MAX_VALUE }) {
			const r = t.root;
			if (!r) return [];
			let i = n.resultLimit || Number.MAX_VALUE;
			const s = e.uri;
			if ((s === "vscode://defaultsettings/keybindings.json" || Ft(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
				const f = [];
				for (const d of r.items) if (d.type === "object") {
					for (const m of d.properties) if (m.keyNode.value === "key" && m.valueNode) {
						const g = Ge(e, d), p = Ge(e, m.keyNode);
						if (f.push({
							name: Po(m.valueNode),
							kind: Ce.Function,
							range: g,
							selectionRange: p
						}), i--, i <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), f;
					}
				}
				return f;
			}
			const o = [], l = [{
				node: r,
				result: o
			}];
			let a = 0, u = !1;
			const h = (f, d) => {
				f.type === "array" ? f.items.forEach((m, g) => {
					if (m) if (i > 0) {
						i--;
						const p = Ge(e, m), w = p, _ = {
							name: String(g),
							kind: this.getSymbolKind(m.type),
							range: p,
							selectionRange: w,
							children: []
						};
						d.push(_), l.push({
							result: _.children,
							node: m
						});
					} else u = !0;
				}) : f.type === "object" && f.properties.forEach((m) => {
					const g = m.valueNode;
					if (g) if (i > 0) {
						i--;
						const p = Ge(e, m), w = Ge(e, m.keyNode), _ = [], N = {
							name: this.getKeyLabel(m),
							kind: this.getSymbolKind(g.type),
							range: p,
							selectionRange: w,
							children: _,
							detail: this.getDetail(g)
						};
						d.push(N), l.push({
							result: _,
							node: g
						});
					} else u = !0;
				});
			};
			for (; a < l.length;) {
				const f = l[a++];
				h(f.node, f.result);
			}
			return u && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), o;
		}
		getSymbolKind(e) {
			switch (e) {
				case "object": return Ce.Module;
				case "string": return Ce.String;
				case "number": return Ce.Number;
				case "array": return Ce.Array;
				case "boolean": return Ce.Boolean;
				default: return Ce.Variable;
			}
		}
		getKeyLabel(e) {
			let t = e.keyNode.value;
			return t && (t = t.replace(/[\n]/g, "↵")), t && t.trim() ? t : `"${t}"`;
		}
		getDetail(e) {
			if (e) {
				if (e.type === "boolean" || e.type === "number" || e.type === "null" || e.type === "string") return String(e.value);
				if (e.type === "array") return e.children.length ? void 0 : "[]";
				if (e.type === "object") return e.children.length ? void 0 : "{}";
			}
		}
		findDocumentColors(e, t, n) {
			return this.schemaService.getSchemaForResource(e.uri, t).then((r) => {
				const i = [];
				if (r) {
					let s = n && typeof n.resultLimit == "number" ? n.resultLimit : Number.MAX_VALUE;
					const o = t.getMatchingSchemas(r.schema), l = {};
					for (const a of o) if (!a.inverted && a.schema && (a.schema.format === "color" || a.schema.format === "color-hex") && a.node && a.node.type === "string") {
						const u = String(a.node.offset);
						if (!l[u]) {
							const h = Bc(tt(a.node));
							if (h) {
								const f = Ge(e, a.node);
								i.push({
									color: h,
									range: f
								});
							}
							if (l[u] = !0, s--, s <= 0) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(e.uri), i;
						}
					}
				}
				return i;
			});
		}
		getColorPresentations(e, t, n, r) {
			const i = [], s = Math.round(n.red * 255), o = Math.round(n.green * 255), l = Math.round(n.blue * 255);
			function a(h) {
				const f = h.toString(16);
				return f.length !== 2 ? "0" + f : f;
			}
			let u;
			return n.alpha === 1 ? u = `#${a(s)}${a(o)}${a(l)}` : u = `#${a(s)}${a(o)}${a(l)}${a(Math.round(n.alpha * 255))}`, i.push({
				label: u,
				textEdit: Me.replace(r, JSON.stringify(u))
			}), i;
		}
	};
	function Ge(e, t) {
		return U.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
	}
	function Po(e) {
		return tt(e) || E("<empty>");
	}
	var jr = {
		schemaAssociations: [],
		schemas: {
			"http://json-schema.org/draft-04/schema#": {
				$schema: "http://json-schema.org/draft-04/schema#",
				definitions: {
					schemaArray: {
						type: "array",
						minItems: 1,
						items: { $ref: "#" }
					},
					positiveInteger: {
						type: "integer",
						minimum: 0
					},
					positiveIntegerDefault0: { allOf: [{ $ref: "#/definitions/positiveInteger" }, { default: 0 }] },
					simpleTypes: {
						type: "string",
						enum: [
							"array",
							"boolean",
							"integer",
							"null",
							"number",
							"object",
							"string"
						]
					},
					stringArray: {
						type: "array",
						items: { type: "string" },
						minItems: 1,
						uniqueItems: !0
					}
				},
				type: "object",
				properties: {
					id: {
						type: "string",
						format: "uri"
					},
					$schema: {
						type: "string",
						format: "uri"
					},
					title: { type: "string" },
					description: { type: "string" },
					default: {},
					multipleOf: {
						type: "number",
						minimum: 0,
						exclusiveMinimum: !0
					},
					maximum: { type: "number" },
					exclusiveMaximum: {
						type: "boolean",
						default: !1
					},
					minimum: { type: "number" },
					exclusiveMinimum: {
						type: "boolean",
						default: !1
					},
					maxLength: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minLength: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					pattern: {
						type: "string",
						format: "regex"
					},
					additionalItems: {
						anyOf: [{ type: "boolean" }, { $ref: "#" }],
						default: {}
					},
					items: {
						anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
						default: {}
					},
					maxItems: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minItems: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					uniqueItems: {
						type: "boolean",
						default: !1
					},
					maxProperties: { allOf: [{ $ref: "#/definitions/positiveInteger" }] },
					minProperties: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] },
					required: { allOf: [{ $ref: "#/definitions/stringArray" }] },
					additionalProperties: {
						anyOf: [{ type: "boolean" }, { $ref: "#" }],
						default: {}
					},
					definitions: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					properties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					patternProperties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					dependencies: {
						type: "object",
						additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
					},
					enum: {
						type: "array",
						minItems: 1,
						uniqueItems: !0
					},
					type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
						type: "array",
						items: { $ref: "#/definitions/simpleTypes" },
						minItems: 1,
						uniqueItems: !0
					}] },
					format: { anyOf: [{
						type: "string",
						enum: [
							"date-time",
							"uri",
							"email",
							"hostname",
							"ipv4",
							"ipv6",
							"regex"
						]
					}, { type: "string" }] },
					allOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					anyOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					oneOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] },
					not: { allOf: [{ $ref: "#" }] }
				},
				dependencies: {
					exclusiveMaximum: ["maximum"],
					exclusiveMinimum: ["minimum"]
				},
				default: {}
			},
			"http://json-schema.org/draft-07/schema#": {
				definitions: {
					schemaArray: {
						type: "array",
						minItems: 1,
						items: { $ref: "#" }
					},
					nonNegativeInteger: {
						type: "integer",
						minimum: 0
					},
					nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
					simpleTypes: { enum: [
						"array",
						"boolean",
						"integer",
						"null",
						"number",
						"object",
						"string"
					] },
					stringArray: {
						type: "array",
						items: { type: "string" },
						uniqueItems: !0,
						default: []
					}
				},
				type: ["object", "boolean"],
				properties: {
					$id: {
						type: "string",
						format: "uri-reference"
					},
					$schema: {
						type: "string",
						format: "uri"
					},
					$ref: {
						type: "string",
						format: "uri-reference"
					},
					$comment: { type: "string" },
					title: { type: "string" },
					description: { type: "string" },
					default: !0,
					readOnly: {
						type: "boolean",
						default: !1
					},
					examples: {
						type: "array",
						items: !0
					},
					multipleOf: {
						type: "number",
						exclusiveMinimum: 0
					},
					maximum: { type: "number" },
					exclusiveMaximum: { type: "number" },
					minimum: { type: "number" },
					exclusiveMinimum: { type: "number" },
					maxLength: { $ref: "#/definitions/nonNegativeInteger" },
					minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					pattern: {
						type: "string",
						format: "regex"
					},
					additionalItems: { $ref: "#" },
					items: {
						anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
						default: !0
					},
					maxItems: { $ref: "#/definitions/nonNegativeInteger" },
					minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					uniqueItems: {
						type: "boolean",
						default: !1
					},
					contains: { $ref: "#" },
					maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
					minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
					required: { $ref: "#/definitions/stringArray" },
					additionalProperties: { $ref: "#" },
					definitions: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					properties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						default: {}
					},
					patternProperties: {
						type: "object",
						additionalProperties: { $ref: "#" },
						propertyNames: { format: "regex" },
						default: {}
					},
					dependencies: {
						type: "object",
						additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
					},
					propertyNames: { $ref: "#" },
					const: !0,
					enum: {
						type: "array",
						items: !0,
						minItems: 1,
						uniqueItems: !0
					},
					type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
						type: "array",
						items: { $ref: "#/definitions/simpleTypes" },
						minItems: 1,
						uniqueItems: !0
					}] },
					format: { type: "string" },
					contentMediaType: { type: "string" },
					contentEncoding: { type: "string" },
					if: { $ref: "#" },
					then: { $ref: "#" },
					else: { $ref: "#" },
					allOf: { $ref: "#/definitions/schemaArray" },
					anyOf: { $ref: "#/definitions/schemaArray" },
					oneOf: { $ref: "#/definitions/schemaArray" },
					not: { $ref: "#" }
				},
				default: !0
			}
		}
	}, qc = {
		id: E("A unique identifier for the schema."),
		$schema: E("The schema to verify this document against."),
		title: E("A descriptive title of the element."),
		description: E("A long description of the element. Used in hover menus and suggestions."),
		default: E("A default value. Used by suggestions."),
		multipleOf: E("A number that should cleanly divide the current value (i.e. have no remainder)."),
		maximum: E("The maximum numerical value, inclusive by default."),
		exclusiveMaximum: E("Makes the maximum property exclusive."),
		minimum: E("The minimum numerical value, inclusive by default."),
		exclusiveMinimum: E("Makes the minimum property exclusive."),
		maxLength: E("The maximum length of a string."),
		minLength: E("The minimum length of a string."),
		pattern: E("A regular expression to match the string against. It is not implicitly anchored."),
		additionalItems: E("For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
		items: E("For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
		maxItems: E("The maximum number of items that can be inside an array. Inclusive."),
		minItems: E("The minimum number of items that can be inside an array. Inclusive."),
		uniqueItems: E("If all of the items in the array must be unique. Defaults to false."),
		maxProperties: E("The maximum number of properties an object can have. Inclusive."),
		minProperties: E("The minimum number of properties an object can have. Inclusive."),
		required: E("An array of strings that lists the names of all properties required on this object."),
		additionalProperties: E("Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
		definitions: E("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
		properties: E("A map of property names to schemas for each property."),
		patternProperties: E("A map of regular expressions on property names to schemas for matching properties."),
		dependencies: E("A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
		enum: E("The set of literal values that are valid."),
		type: E("Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
		format: E("Describes the format expected for the value."),
		allOf: E("An array of schemas, all of which must match."),
		anyOf: E("An array of schemas, where at least one must match."),
		oneOf: E("An array of schemas, exactly one of which must match."),
		not: E("A schema which must not match."),
		$id: E("A unique identifier for the schema."),
		$ref: E("Reference a definition hosted on any location."),
		$comment: E("Comments from schema authors to readers or maintainers of the schema."),
		readOnly: E("Indicates that the value of the instance is managed exclusively by the owning authority."),
		examples: E("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
		contains: E("An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
		propertyNames: E("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
		const: E("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
		contentMediaType: E("Describes the media type of a string property."),
		contentEncoding: E("Describes the content encoding of a string property."),
		if: E("The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
		then: E("The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
		else: E("The \"else\" subschema is used for validation when the \"if\" subschema fails.")
	};
	for (const e in jr.schemas) {
		const t = jr.schemas[e];
		for (const n in t.properties) {
			let r = t.properties[n];
			typeof r == "boolean" && (r = t.properties[n] = {});
			const i = qc[n];
			i && (r.description = i);
		}
	}
	var Io;
	(() => {
		"use strict";
		var e = { 470: (i) => {
			function s(a) {
				if (typeof a != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(a));
			}
			function o(a, u) {
				for (var h, f = "", d = 0, m = -1, g = 0, p = 0; p <= a.length; ++p) {
					if (p < a.length) h = a.charCodeAt(p);
					else {
						if (h === 47) break;
						h = 47;
					}
					if (h === 47) {
						if (!(m === p - 1 || g === 1)) if (m !== p - 1 && g === 2) {
							if (f.length < 2 || d !== 2 || f.charCodeAt(f.length - 1) !== 46 || f.charCodeAt(f.length - 2) !== 46) {
								if (f.length > 2) {
									var w = f.lastIndexOf("/");
									if (w !== f.length - 1) {
										w === -1 ? (f = "", d = 0) : d = (f = f.slice(0, w)).length - 1 - f.lastIndexOf("/"), m = p, g = 0;
										continue;
									}
								} else if (f.length === 2 || f.length === 1) {
									f = "", d = 0, m = p, g = 0;
									continue;
								}
							}
							u && (f.length > 0 ? f += "/.." : f = "..", d = 2);
						} else f.length > 0 ? f += "/" + a.slice(m + 1, p) : f = a.slice(m + 1, p), d = p - m - 1;
						m = p, g = 0;
					} else h === 46 && g !== -1 ? ++g : g = -1;
				}
				return f;
			}
			var l = {
				resolve: function() {
					for (var a, u = "", h = !1, f = arguments.length - 1; f >= -1 && !h; f--) {
						var d;
						f >= 0 ? d = arguments[f] : (a === void 0 && (a = process.cwd()), d = a), s(d), d.length !== 0 && (u = d + "/" + u, h = d.charCodeAt(0) === 47);
					}
					return u = o(u, !h), h ? u.length > 0 ? "/" + u : "/" : u.length > 0 ? u : ".";
				},
				normalize: function(a) {
					if (s(a), a.length === 0) return ".";
					var u = a.charCodeAt(0) === 47, h = a.charCodeAt(a.length - 1) === 47;
					return (a = o(a, !u)).length !== 0 || u || (a = "."), a.length > 0 && h && (a += "/"), u ? "/" + a : a;
				},
				isAbsolute: function(a) {
					return s(a), a.length > 0 && a.charCodeAt(0) === 47;
				},
				join: function() {
					if (arguments.length === 0) return ".";
					for (var a, u = 0; u < arguments.length; ++u) {
						var h = arguments[u];
						s(h), h.length > 0 && (a === void 0 ? a = h : a += "/" + h);
					}
					return a === void 0 ? "." : l.normalize(a);
				},
				relative: function(a, u) {
					if (s(a), s(u), a === u || (a = l.resolve(a)) === (u = l.resolve(u))) return "";
					for (var h = 1; h < a.length && a.charCodeAt(h) === 47; ++h);
					for (var f = a.length, d = f - h, m = 1; m < u.length && u.charCodeAt(m) === 47; ++m);
					for (var g = u.length - m, p = d < g ? d : g, w = -1, _ = 0; _ <= p; ++_) {
						if (_ === p) {
							if (g > p) {
								if (u.charCodeAt(m + _) === 47) return u.slice(m + _ + 1);
								if (_ === 0) return u.slice(m + _);
							} else d > p && (a.charCodeAt(h + _) === 47 ? w = _ : _ === 0 && (w = 0));
							break;
						}
						var N = a.charCodeAt(h + _);
						if (N !== u.charCodeAt(m + _)) break;
						N === 47 && (w = _);
					}
					var v = "";
					for (_ = h + w + 1; _ <= f; ++_) _ !== f && a.charCodeAt(_) !== 47 || (v.length === 0 ? v += ".." : v += "/..");
					return v.length > 0 ? v + u.slice(m + w) : (m += w, u.charCodeAt(m) === 47 && ++m, u.slice(m));
				},
				_makeLong: function(a) {
					return a;
				},
				dirname: function(a) {
					if (s(a), a.length === 0) return ".";
					for (var u = a.charCodeAt(0), h = u === 47, f = -1, d = !0, m = a.length - 1; m >= 1; --m) if ((u = a.charCodeAt(m)) === 47) {
						if (!d) {
							f = m;
							break;
						}
					} else d = !1;
					return f === -1 ? h ? "/" : "." : h && f === 1 ? "//" : a.slice(0, f);
				},
				basename: function(a, u) {
					if (u !== void 0 && typeof u != "string") throw new TypeError("\"ext\" argument must be a string");
					s(a);
					var h, f = 0, d = -1, m = !0;
					if (u !== void 0 && u.length > 0 && u.length <= a.length) {
						if (u.length === a.length && u === a) return "";
						var g = u.length - 1, p = -1;
						for (h = a.length - 1; h >= 0; --h) {
							var w = a.charCodeAt(h);
							if (w === 47) {
								if (!m) {
									f = h + 1;
									break;
								}
							} else p === -1 && (m = !1, p = h + 1), g >= 0 && (w === u.charCodeAt(g) ? --g == -1 && (d = h) : (g = -1, d = p));
						}
						return f === d ? d = p : d === -1 && (d = a.length), a.slice(f, d);
					}
					for (h = a.length - 1; h >= 0; --h) if (a.charCodeAt(h) === 47) {
						if (!m) {
							f = h + 1;
							break;
						}
					} else d === -1 && (m = !1, d = h + 1);
					return d === -1 ? "" : a.slice(f, d);
				},
				extname: function(a) {
					s(a);
					for (var u = -1, h = 0, f = -1, d = !0, m = 0, g = a.length - 1; g >= 0; --g) {
						var p = a.charCodeAt(g);
						if (p !== 47) f === -1 && (d = !1, f = g + 1), p === 46 ? u === -1 ? u = g : m !== 1 && (m = 1) : u !== -1 && (m = -1);
						else if (!d) {
							h = g + 1;
							break;
						}
					}
					return u === -1 || f === -1 || m === 0 || m === 1 && u === f - 1 && u === h + 1 ? "" : a.slice(u, f);
				},
				format: function(a) {
					if (a === null || typeof a != "object") throw new TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof a);
					return (function(u, h) {
						var f = h.dir || h.root, d = h.base || (h.name || "") + (h.ext || "");
						return f ? f === h.root ? f + d : f + "/" + d : d;
					})(0, a);
				},
				parse: function(a) {
					s(a);
					var u = {
						root: "",
						dir: "",
						base: "",
						ext: "",
						name: ""
					};
					if (a.length === 0) return u;
					var h, f = a.charCodeAt(0), d = f === 47;
					d ? (u.root = "/", h = 1) : h = 0;
					for (var m = -1, g = 0, p = -1, w = !0, _ = a.length - 1, N = 0; _ >= h; --_) if ((f = a.charCodeAt(_)) !== 47) p === -1 && (w = !1, p = _ + 1), f === 46 ? m === -1 ? m = _ : N !== 1 && (N = 1) : m !== -1 && (N = -1);
					else if (!w) {
						g = _ + 1;
						break;
					}
					return m === -1 || p === -1 || N === 0 || N === 1 && m === p - 1 && m === g + 1 ? p !== -1 && (u.base = u.name = g === 0 && d ? a.slice(1, p) : a.slice(g, p)) : (g === 0 && d ? (u.name = a.slice(1, m), u.base = a.slice(1, p)) : (u.name = a.slice(g, m), u.base = a.slice(g, p)), u.ext = a.slice(m, p)), g > 0 ? u.dir = a.slice(0, g - 1) : d && (u.dir = "/"), u;
				},
				sep: "/",
				delimiter: ":",
				win32: null,
				posix: null
			};
			l.posix = l, i.exports = l;
		} }, t = {};
		function n(i) {
			var s = t[i];
			if (s !== void 0) return s.exports;
			var o = t[i] = { exports: {} };
			return e[i](o, o.exports, n), o.exports;
		}
		n.d = (i, s) => {
			for (var o in s) n.o(s, o) && !n.o(i, o) && Object.defineProperty(i, o, {
				enumerable: !0,
				get: s[o]
			});
		}, n.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s), n.r = (i) => {
			typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
		};
		var r = {};
		(() => {
			let i;
			n.r(r), n.d(r, {
				URI: () => d,
				Utils: () => D
			}), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
			const s = /^\w[\w\d+.-]*$/, o = /^\//, l = /^\/\//;
			function a(M, k) {
				if (!M.scheme && k) throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);
				if (M.scheme && !s.test(M.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
				if (M.path) {
					if (M.authority) {
						if (!o.test(M.path)) throw new Error("[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash (\"/\") character");
					} else if (l.test(M.path)) throw new Error("[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters (\"//\")");
				}
			}
			const u = "", h = "/", f = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
			class d {
				static isUri(k) {
					return k instanceof d || !!k && typeof k.authority == "string" && typeof k.fragment == "string" && typeof k.path == "string" && typeof k.query == "string" && typeof k.scheme == "string" && typeof k.fsPath == "string" && typeof k.with == "function" && typeof k.toString == "function";
				}
				scheme;
				authority;
				path;
				query;
				fragment;
				constructor(k, R, x, I, C, P = !1) {
					typeof k == "object" ? (this.scheme = k.scheme || u, this.authority = k.authority || u, this.path = k.path || u, this.query = k.query || u, this.fragment = k.fragment || u) : (this.scheme = (function(O, B) {
						return O || B ? O : "file";
					})(k, P), this.authority = R || u, this.path = (function(O, B) {
						switch (O) {
							case "https":
							case "http":
							case "file": B ? B[0] !== h && (B = h + B) : B = h;
						}
						return B;
					})(this.scheme, x || u), this.query = I || u, this.fragment = C || u, a(this, P));
				}
				get fsPath() {
					return N(this, !1);
				}
				with(k) {
					if (!k) return this;
					let { scheme: R, authority: x, path: I, query: C, fragment: P } = k;
					return R === void 0 ? R = this.scheme : R === null && (R = u), x === void 0 ? x = this.authority : x === null && (x = u), I === void 0 ? I = this.path : I === null && (I = u), C === void 0 ? C = this.query : C === null && (C = u), P === void 0 ? P = this.fragment : P === null && (P = u), R === this.scheme && x === this.authority && I === this.path && C === this.query && P === this.fragment ? this : new g(R, x, I, C, P);
				}
				static parse(k, R = !1) {
					const x = f.exec(k);
					return x ? new g(x[2] || u, L(x[4] || u), L(x[5] || u), L(x[7] || u), L(x[9] || u), R) : new g(u, u, u, u, u);
				}
				static file(k) {
					let R = u;
					if (i && (k = k.replace(/\\/g, h)), k[0] === h && k[1] === h) {
						const x = k.indexOf(h, 2);
						x === -1 ? (R = k.substring(2), k = h) : (R = k.substring(2, x), k = k.substring(x) || h);
					}
					return new g("file", R, k, u, u);
				}
				static from(k) {
					const R = new g(k.scheme, k.authority, k.path, k.query, k.fragment);
					return a(R, !0), R;
				}
				toString(k = !1) {
					return v(this, k);
				}
				toJSON() {
					return this;
				}
				static revive(k) {
					if (k) {
						if (k instanceof d) return k;
						{
							const R = new g(k);
							return R._formatted = k.external, R._fsPath = k._sep === m ? k.fsPath : null, R;
						}
					}
					return k;
				}
			}
			const m = i ? 1 : void 0;
			class g extends d {
				_formatted = null;
				_fsPath = null;
				get fsPath() {
					return this._fsPath || (this._fsPath = N(this, !1)), this._fsPath;
				}
				toString(k = !1) {
					return k ? v(this, !0) : (this._formatted || (this._formatted = v(this, !1)), this._formatted);
				}
				toJSON() {
					const k = { $mid: 1 };
					return this._fsPath && (k.fsPath = this._fsPath, k._sep = m), this._formatted && (k.external = this._formatted), this.path && (k.path = this.path), this.scheme && (k.scheme = this.scheme), this.authority && (k.authority = this.authority), this.query && (k.query = this.query), this.fragment && (k.fragment = this.fragment), k;
				}
			}
			const p = {
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
			function w(M, k, R) {
				let x, I = -1;
				for (let C = 0; C < M.length; C++) {
					const P = M.charCodeAt(C);
					if (P >= 97 && P <= 122 || P >= 65 && P <= 90 || P >= 48 && P <= 57 || P === 45 || P === 46 || P === 95 || P === 126 || k && P === 47 || R && P === 91 || R && P === 93 || R && P === 58) I !== -1 && (x += encodeURIComponent(M.substring(I, C)), I = -1), x !== void 0 && (x += M.charAt(C));
					else {
						x === void 0 && (x = M.substr(0, C));
						const O = p[P];
						O !== void 0 ? (I !== -1 && (x += encodeURIComponent(M.substring(I, C)), I = -1), x += O) : I === -1 && (I = C);
					}
				}
				return I !== -1 && (x += encodeURIComponent(M.substring(I))), x !== void 0 ? x : M;
			}
			function _(M) {
				let k;
				for (let R = 0; R < M.length; R++) {
					const x = M.charCodeAt(R);
					x === 35 || x === 63 ? (k === void 0 && (k = M.substr(0, R)), k += p[x]) : k !== void 0 && (k += M[R]);
				}
				return k !== void 0 ? k : M;
			}
			function N(M, k) {
				let R;
				return R = M.authority && M.path.length > 1 && M.scheme === "file" ? `//${M.authority}${M.path}` : M.path.charCodeAt(0) === 47 && (M.path.charCodeAt(1) >= 65 && M.path.charCodeAt(1) <= 90 || M.path.charCodeAt(1) >= 97 && M.path.charCodeAt(1) <= 122) && M.path.charCodeAt(2) === 58 ? k ? M.path.substr(1) : M.path[1].toLowerCase() + M.path.substr(2) : M.path, i && (R = R.replace(/\//g, "\\")), R;
			}
			function v(M, k) {
				const R = k ? _ : w;
				let x = "", { scheme: I, authority: C, path: P, query: O, fragment: B } = M;
				if (I && (x += I, x += ":"), (C || I === "file") && (x += h, x += h), C) {
					let q = C.indexOf("@");
					if (q !== -1) {
						const ee = C.substr(0, q);
						C = C.substr(q + 1), q = ee.lastIndexOf(":"), q === -1 ? x += R(ee, !1, !1) : (x += R(ee.substr(0, q), !1, !1), x += ":", x += R(ee.substr(q + 1), !1, !0)), x += "@";
					}
					C = C.toLowerCase(), q = C.lastIndexOf(":"), q === -1 ? x += R(C, !1, !0) : (x += R(C.substr(0, q), !1, !0), x += C.substr(q));
				}
				if (P) {
					if (P.length >= 3 && P.charCodeAt(0) === 47 && P.charCodeAt(2) === 58) {
						const q = P.charCodeAt(1);
						q >= 65 && q <= 90 && (P = `/${String.fromCharCode(q + 32)}:${P.substr(3)}`);
					} else if (P.length >= 2 && P.charCodeAt(1) === 58) {
						const q = P.charCodeAt(0);
						q >= 65 && q <= 90 && (P = `${String.fromCharCode(q + 32)}:${P.substr(2)}`);
					}
					x += R(P, !0, !1);
				}
				return O && (x += "?", x += R(O, !1, !1)), B && (x += "#", x += k ? B : w(B, !1, !1)), x;
			}
			function y(M) {
				try {
					return decodeURIComponent(M);
				} catch {
					return M.length > 3 ? M.substr(0, 3) + y(M.substr(3)) : M;
				}
			}
			const b = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
			function L(M) {
				return M.match(b) ? M.replace(b, (k) => y(k)) : M;
			}
			var S = n(470);
			const T = S.posix || S, F = "/";
			var D;
			(function(M) {
				M.joinPath = function(k, ...R) {
					return k.with({ path: T.join(k.path, ...R) });
				}, M.resolvePath = function(k, ...R) {
					let x = k.path, I = !1;
					x[0] !== F && (x = F + x, I = !0);
					let C = T.resolve(x, ...R);
					return I && C[0] === F && !k.authority && (C = C.substring(1)), k.with({ path: C });
				}, M.dirname = function(k) {
					if (k.path.length === 0 || k.path === F) return k;
					let R = T.dirname(k.path);
					return R.length === 1 && R.charCodeAt(0) === 46 && (R = ""), k.with({ path: R });
				}, M.basename = function(k) {
					return T.basename(k.path);
				}, M.extname = function(k) {
					return T.extname(k.path);
				};
			})(D || (D = {}));
		})(), Io = r;
	})();
	var { URI: vt, Utils: q0 } = Io;
	function jc(e, t) {
		if (typeof e != "string") throw new TypeError("Expected a string");
		const n = String(e);
		let r = "";
		const i = t ? !!t.extended : !1, s = t ? !!t.globstar : !1;
		let o = !1;
		const l = t && typeof t.flags == "string" ? t.flags : "";
		let a;
		for (let u = 0, h = n.length; u < h; u++) switch (a = n[u], a) {
			case "/":
			case "$":
			case "^":
			case "+":
			case ".":
			case "(":
			case ")":
			case "=":
			case "!":
			case "|":
				r += "\\" + a;
				break;
			case "?": if (i) {
				r += ".";
				break;
			}
			case "[":
			case "]": if (i) {
				r += a;
				break;
			}
			case "{": if (i) {
				o = !0, r += "(";
				break;
			}
			case "}": if (i) {
				o = !1, r += ")";
				break;
			}
			case ",":
				if (o) {
					r += "|";
					break;
				}
				r += "\\" + a;
				break;
			case "*":
				const f = n[u - 1];
				let d = 1;
				for (; n[u + 1] === "*";) d++, u++;
				const m = n[u + 1];
				s ? d > 1 && (f === "/" || f === void 0 || f === "{" || f === ",") && (m === "/" || m === void 0 || m === "," || m === "}") ? (m === "/" ? u++ : f === "/" && r.endsWith("\\/") && (r = r.substr(0, r.length - 2)), r += "((?:[^/]*(?:/|$))*)") : r += "([^/]*)" : r += ".*";
				break;
			default: r += a;
		}
		return (!l || !~l.indexOf("g")) && (r = "^" + r + "$"), new RegExp(r, l);
	}
	var Wc = "!", Hc = "/", zc = class {
		constructor(e, t, n) {
			this.folderUri = t, this.uris = n, this.globWrappers = [];
			try {
				for (let r of e) {
					const i = r[0] !== Wc;
					i || (r = r.substring(1)), r.length > 0 && (r[0] === Hc && (r = r.substring(1)), this.globWrappers.push({
						regexp: jc("**/" + r, {
							extended: !0,
							globstar: !0
						}),
						include: i
					}));
				}
				t && (t = Vo(t), t.endsWith("/") || (t = t + "/"), this.folderUri = t);
			} catch {
				this.globWrappers.length = 0, this.uris = [];
			}
		}
		matchesPattern(e) {
			if (this.folderUri && !e.startsWith(this.folderUri)) return !1;
			let t = !1;
			for (const { regexp: n, include: r } of this.globWrappers) n.test(e) && (t = r);
			return t;
		}
		getURIs() {
			return this.uris;
		}
	}, Gc = class {
		constructor(e, t, n) {
			this.service = e, this.uri = t, this.dependencies = /* @__PURE__ */ new Set(), this.anchors = void 0, n && (this.unresolvedSchema = this.service.promise.resolve(new $t(n)));
		}
		getUnresolvedSchema() {
			return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)), this.unresolvedSchema;
		}
		getResolvedSchema() {
			return this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then((e) => this.service.resolveSchemaContent(e, this))), this.resolvedSchema;
		}
		clearSchema() {
			const e = !!this.unresolvedSchema;
			return this.resolvedSchema = void 0, this.unresolvedSchema = void 0, this.dependencies.clear(), this.anchors = void 0, e;
		}
	}, $t = class {
		constructor(e, t = []) {
			this.schema = e, this.errors = t;
		}
	}, Fo = class {
		constructor(e, t = [], n = [], r) {
			this.schema = e, this.errors = t, this.warnings = n, this.schemaDraft = r;
		}
		getSection(e) {
			const t = this.getSectionRecursive(e, this.schema);
			if (t) return be(t);
		}
		getSectionRecursive(e, t) {
			if (!t || typeof t == "boolean" || e.length === 0) return t;
			const n = e.shift();
			if (t.properties && typeof t.properties[n]) return this.getSectionRecursive(e, t.properties[n]);
			if (t.patternProperties) {
				for (const r of Object.keys(t.patternProperties)) if (gn(r)?.test(n)) return this.getSectionRecursive(e, t.patternProperties[r]);
			} else {
				if (typeof t.additionalProperties == "object") return this.getSectionRecursive(e, t.additionalProperties);
				if (n.match("[0-9]+")) {
					if (Array.isArray(t.items)) {
						const r = parseInt(n, 10);
						if (!isNaN(r) && t.items[r]) return this.getSectionRecursive(e, t.items[r]);
					} else if (t.items) return this.getSectionRecursive(e, t.items);
				}
			}
		}
	}, Jc = class {
		constructor(e, t, n) {
			this.contextService = t, this.requestService = e, this.promiseConstructor = n || Promise, this.callOnDispose = [], this.contributionSchemas = {}, this.contributionAssociations = [], this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {};
		}
		getRegisteredSchemaIds(e) {
			return Object.keys(this.registeredSchemasIds).filter((t) => {
				const n = vt.parse(t).scheme;
				return n !== "schemaservice" && (!e || e(n));
			});
		}
		get promise() {
			return this.promiseConstructor;
		}
		dispose() {
			for (; this.callOnDispose.length > 0;) this.callOnDispose.pop()();
		}
		onResourceChange(e) {
			this.cachedSchemaForResource = void 0;
			let t = !1;
			e = Je(e);
			const n = [e], r = Object.keys(this.schemasById).map((i) => this.schemasById[i]);
			for (; n.length;) {
				const i = n.pop();
				for (let s = 0; s < r.length; s++) {
					const o = r[s];
					o && (o.uri === i || o.dependencies.has(i)) && (o.uri !== i && n.push(o.uri), o.clearSchema() && (t = !0), r[s] = void 0);
				}
			}
			return t;
		}
		setSchemaContributions(e) {
			if (e.schemas) {
				const t = e.schemas;
				for (const n in t) {
					const r = Je(n);
					this.contributionSchemas[r] = this.addSchemaHandle(r, t[n]);
				}
			}
			if (Array.isArray(e.schemaAssociations)) {
				const t = e.schemaAssociations;
				for (let n of t) {
					const r = n.uris.map(Je), i = this.addFilePatternAssociation(n.pattern, n.folderUri, r);
					this.contributionAssociations.push(i);
				}
			}
		}
		addSchemaHandle(e, t) {
			const n = new Gc(this, e, t);
			return this.schemasById[e] = n, n;
		}
		getOrAddSchemaHandle(e, t) {
			return this.schemasById[e] || this.addSchemaHandle(e, t);
		}
		addFilePatternAssociation(e, t, n) {
			const r = new zc(e, t, n);
			return this.filePatternAssociations.push(r), r;
		}
		registerExternalSchema(e) {
			const t = Je(e.uri);
			return this.registeredSchemasIds[t] = !0, this.cachedSchemaForResource = void 0, e.fileMatch && e.fileMatch.length && this.addFilePatternAssociation(e.fileMatch, e.folderUri, [t]), e.schema ? this.addSchemaHandle(t, e.schema) : this.getOrAddSchemaHandle(t);
		}
		clearExternalSchemas() {
			this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}, this.cachedSchemaForResource = void 0;
			for (const e in this.contributionSchemas) this.schemasById[e] = this.contributionSchemas[e], this.registeredSchemasIds[e] = !0;
			for (const e of this.contributionAssociations) this.filePatternAssociations.push(e);
		}
		getResolvedSchema(e) {
			const t = Je(e), n = this.schemasById[t];
			return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
		}
		loadSchema(e) {
			if (!this.requestService) {
				const t = E("Unable to load schema from '{0}'. No schema request service available", Bt(e));
				return this.promise.resolve(new $t({}, [t]));
			}
			return e.startsWith("http://json-schema.org/") && (e = "https" + e.substring(4)), this.requestService(e).then((t) => {
				if (!t) return new $t({}, [E("Unable to load schema from '{0}': No content.", Bt(e))]);
				const n = [];
				t.charCodeAt(0) === 65279 && (n.push(E("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", Bt(e))), t = t.trimStart());
				let r = {};
				const i = [];
				return r = hc(t, i), i.length && n.push(E("Unable to parse content from '{0}': Parse error at offset {1}.", Bt(e), i[0].offset)), new $t(r, n);
			}, (t) => {
				let n = t.toString();
				const r = t.toString().split("Error: ");
				return r.length > 1 && (n = r[1]), Ft(n, ".") && (n = n.substr(0, n.length - 1)), new $t({}, [E("Unable to load schema from '{0}': {1}.", Bt(e), n)]);
			});
		}
		resolveSchemaContent(e, t) {
			const n = e.errors.slice(0), r = e.schema;
			let i = r.$schema ? Je(r.$schema) : void 0;
			if (i === "http://json-schema.org/draft-03/schema") return this.promise.resolve(new Fo({}, [E("Draft-03 schemas are not supported.")], [], i));
			let s = /* @__PURE__ */ new Set();
			const o = this.contextService, l = (g, p) => {
				p = decodeURIComponent(p);
				let w = g;
				return p[0] === "/" && (p = p.substring(1)), p.split("/").some((_) => (_ = _.replace(/~1/g, "/").replace(/~0/g, "~"), w = w[_], !w)), w;
			}, a = (g, p, w) => (p.anchors || (p.anchors = m(g)), p.anchors.get(w)), u = (g, p) => {
				for (const w in p) p.hasOwnProperty(w) && w !== "id" && w !== "$id" && (g[w] = p[w]);
			}, h = (g, p, w, _) => {
				let N;
				_ === void 0 || _.length === 0 ? N = p : _.charAt(0) === "/" ? N = l(p, _) : N = a(p, w, _), N ? u(g, N) : n.push(E("$ref '{0}' in '{1}' can not be resolved.", _ || "", w.uri));
			}, f = (g, p, w, _) => {
				o && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(p) && (p = o.resolveRelativePath(p, _.uri)), p = Je(p);
				const N = this.getOrAddSchemaHandle(p);
				return N.getUnresolvedSchema().then((v) => {
					if (_.dependencies.add(p), v.errors.length) {
						const y = w ? p + "#" + w : p;
						n.push(E("Problems loading reference '{0}': {1}", y, v.errors[0]));
					}
					return h(g, v.schema, N, w), d(g, v.schema, N);
				});
			}, d = (g, p, w) => {
				const _ = [];
				return this.traverseNodes(g, (N) => {
					const v = /* @__PURE__ */ new Set();
					for (; N.$ref;) {
						const y = N.$ref, b = y.split("#", 2);
						if (delete N.$ref, b[0].length > 0) {
							_.push(f(N, b[0], b[1], w));
							return;
						} else if (!v.has(y)) {
							const L = b[1];
							h(N, p, w, L), v.add(y);
						}
					}
					N.$recursiveRef && s.add("$recursiveRef"), N.$dynamicRef && s.add("$dynamicRef");
				}), this.promise.all(_);
			}, m = (g) => {
				const p = /* @__PURE__ */ new Map();
				return this.traverseNodes(g, (w) => {
					const _ = w.$id || w.id, N = S1(_) && _.charAt(0) === "#" ? _.substring(1) : w.$anchor;
					N && (p.has(N) ? n.push(E("Duplicate anchor declaration: '{0}'", N)) : p.set(N, w)), w.$recursiveAnchor && s.add("$recursiveAnchor"), w.$dynamicAnchor && s.add("$dynamicAnchor");
				}), p;
			};
			return d(r, r, t).then((g) => {
				let p = [];
				return s.size && p.push(E("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(s.keys()).join(", "))), new Fo(r, n, p, i);
			});
		}
		traverseNodes(e, t) {
			if (!e || typeof e != "object") return Promise.resolve(null);
			const n = /* @__PURE__ */ new Set(), r = (...u) => {
				for (const h of u) ze(h) && l.push(h);
			}, i = (...u) => {
				for (const h of u) if (ze(h)) for (const f in h) {
					const d = h[f];
					ze(d) && l.push(d);
				}
			}, s = (...u) => {
				for (const h of u) if (Array.isArray(h)) for (const f of h) ze(f) && l.push(f);
			}, o = (u) => {
				if (Array.isArray(u)) for (const h of u) ze(h) && l.push(h);
				else ze(u) && l.push(u);
			}, l = [e];
			let a = l.pop();
			for (; a;) n.has(a) || (n.add(a), t(a), r(a.additionalItems, a.additionalProperties, a.not, a.contains, a.propertyNames, a.if, a.then, a.else, a.unevaluatedItems, a.unevaluatedProperties), i(a.definitions, a.$defs, a.properties, a.patternProperties, a.dependencies, a.dependentSchemas), s(a.anyOf, a.allOf, a.oneOf, a.prefixItems), o(a.items)), a = l.pop();
		}
		getSchemaFromProperty(e, t) {
			if (t.root?.type === "object") {
				for (const n of t.root.properties) if (n.keyNode.value === "$schema" && n.valueNode?.type === "string") {
					let r = n.valueNode.value;
					return this.contextService && !/^\w[\w\d+.-]*:/.test(r) && (r = this.contextService.resolveRelativePath(r, e)), r;
				}
			}
		}
		getAssociatedSchemas(e) {
			const t = Object.create(null), n = [], r = Vo(e);
			for (const i of this.filePatternAssociations) if (i.matchesPattern(r)) for (const s of i.getURIs()) t[s] || (n.push(s), t[s] = !0);
			return n;
		}
		getSchemaURIsForResource(e, t) {
			let n = t && this.getSchemaFromProperty(e, t);
			return n ? [n] : this.getAssociatedSchemas(e);
		}
		getSchemaForResource(e, t) {
			if (t) {
				let i = this.getSchemaFromProperty(e, t);
				if (i) {
					const s = Je(i);
					return this.getOrAddSchemaHandle(s).getResolvedSchema();
				}
			}
			if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === e) return this.cachedSchemaForResource.resolvedSchema;
			const n = this.getAssociatedSchemas(e), r = n.length > 0 ? this.createCombinedSchema(e, n).getResolvedSchema() : this.promise.resolve(void 0);
			return this.cachedSchemaForResource = {
				resource: e,
				resolvedSchema: r
			}, r;
		}
		createCombinedSchema(e, t) {
			if (t.length === 1) return this.getOrAddSchemaHandle(t[0]);
			{
				const n = "schemaservice://combinedSchema/" + encodeURIComponent(e), r = { allOf: t.map((i) => ({ $ref: i })) };
				return this.addSchemaHandle(n, r);
			}
		}
		getMatchingSchemas(e, t, n) {
			if (n) {
				const r = n.id || "schemaservice://untitled/matchingSchemas/" + Xc++;
				return this.addSchemaHandle(r, n).getResolvedSchema().then((i) => t.getMatchingSchemas(i.schema).filter((s) => !s.inverted));
			}
			return this.getSchemaForResource(e.uri, t).then((r) => r ? t.getMatchingSchemas(r.schema).filter((i) => !i.inverted) : []);
		}
	}, Xc = 0;
	function Je(e) {
		try {
			return vt.parse(e).toString(!0);
		} catch {
			return e;
		}
	}
	function Vo(e) {
		try {
			return vt.parse(e).with({
				fragment: null,
				query: null
			}).toString(!0);
		} catch {
			return e;
		}
	}
	function Bt(e) {
		try {
			const t = vt.parse(e);
			if (t.scheme === "file") return t.fsPath;
		} catch {}
		return e;
	}
	function Qc(e, t) {
		const n = [], r = [], i = [];
		let s = -1;
		const o = Ze(e.getText(), !1);
		let l = o.scan();
		function a(g) {
			n.push(g), r.push(i.length);
		}
		for (; l !== 17;) {
			switch (l) {
				case 1:
				case 3: {
					const g = e.positionAt(o.getTokenOffset()).line, p = {
						startLine: g,
						endLine: g,
						kind: l === 1 ? "object" : "array"
					};
					i.push(p);
					break;
				}
				case 2:
				case 4: {
					const g = l === 2 ? "object" : "array";
					if (i.length > 0 && i[i.length - 1].kind === g) {
						const p = i.pop(), w = e.positionAt(o.getTokenOffset()).line;
						p && w > p.startLine + 1 && s !== p.startLine && (p.endLine = w - 1, a(p), s = p.startLine);
					}
					break;
				}
				case 13: {
					const g = e.positionAt(o.getTokenOffset()).line, p = e.positionAt(o.getTokenOffset() + o.getTokenLength()).line;
					o.getTokenError() === 1 && g + 1 < e.lineCount ? o.setPosition(e.offsetAt(Q.create(g + 1, 0))) : g < p && (a({
						startLine: g,
						endLine: p,
						kind: Vt.Comment
					}), s = g);
					break;
				}
				case 12: {
					const g = e.getText().substr(o.getTokenOffset(), o.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
					if (g) {
						const p = e.positionAt(o.getTokenOffset()).line;
						if (g[1]) {
							const w = {
								startLine: p,
								endLine: p,
								kind: Vt.Region
							};
							i.push(w);
						} else {
							let w = i.length - 1;
							for (; w >= 0 && i[w].kind !== Vt.Region;) w--;
							if (w >= 0) {
								const _ = i[w];
								i.length = w, p > _.startLine && s !== _.startLine && (_.endLine = p, a(_), s = _.startLine);
							}
						}
					}
					break;
				}
			}
			l = o.scan();
		}
		const u = t && t.rangeLimit;
		if (typeof u != "number" || n.length <= u) return n;
		t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri);
		const h = [];
		for (let g of r) g < 30 && (h[g] = (h[g] || 0) + 1);
		let f = 0, d = 0;
		for (let g = 0; g < h.length; g++) {
			const p = h[g];
			if (p) {
				if (p + f > u) {
					d = g;
					break;
				}
				f += p;
			}
		}
		const m = [];
		for (let g = 0; g < n.length; g++) {
			const p = r[g];
			typeof p == "number" && (p < d || p === d && f++ < u) && m.push(n[g]);
		}
		return m;
	}
	function Yc(e, t, n) {
		function r(l) {
			let a = e.offsetAt(l), u = n.getNodeFromOffset(a, !0);
			const h = [];
			for (; u;) {
				switch (u.type) {
					case "string":
					case "object":
					case "array":
						const d = u.offset + 1, m = u.offset + u.length - 1;
						d < m && a >= d && a <= m && h.push(i(d, m)), h.push(i(u.offset, u.offset + u.length));
						break;
					case "number":
					case "boolean":
					case "null":
					case "property":
						h.push(i(u.offset, u.offset + u.length));
						break;
				}
				if (u.type === "property" || u.parent && u.parent.type === "array") {
					const d = o(u.offset + u.length, 5);
					d !== -1 && h.push(i(u.offset, d));
				}
				u = u.parent;
			}
			let f;
			for (let d = h.length - 1; d >= 0; d--) f = vn.create(h[d], f);
			return f || (f = vn.create(U.create(l, l))), f;
		}
		function i(l, a) {
			return U.create(e.positionAt(l), e.positionAt(a));
		}
		const s = Ze(e.getText(), !0);
		function o(l, a) {
			return s.setPosition(l), s.scan() === a ? s.getTokenOffset() + s.getTokenLength() : -1;
		}
		return t.map(r);
	}
	function Wr(e, t, n) {
		let r;
		if (n) {
			const s = e.offsetAt(n.start);
			r = {
				offset: s,
				length: e.offsetAt(n.end) - s
			};
		}
		const i = {
			tabSize: t ? t.tabSize : 4,
			insertSpaces: t?.insertSpaces === !0,
			insertFinalNewline: t?.insertFinalNewline === !0,
			eol: `
`,
			keepLines: t?.keepLines === !0
		};
		return pc(e.getText(), r, i).map((s) => Me.replace(U.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), s.content));
	}
	var re;
	(function(e) {
		e[e.Object = 0] = "Object", e[e.Array = 1] = "Array";
	})(re || (re = {}));
	var Nn = class {
		constructor(e, t) {
			this.propertyName = e ?? "", this.beginningLineNumber = t, this.childrenProperties = [], this.lastProperty = !1, this.noKeyName = !1;
		}
		addChildProperty(e) {
			if (e.parent = this, this.childrenProperties.length > 0) {
				let t = 0;
				e.noKeyName ? t = this.childrenProperties.length : t = Kc(this.childrenProperties, e, Zc), t < 0 && (t = t * -1 - 1), this.childrenProperties.splice(t, 0, e);
			} else this.childrenProperties.push(e);
			return e;
		}
	};
	function Zc(e, t) {
		const n = e.propertyName.toLowerCase(), r = t.propertyName.toLowerCase();
		return n < r ? -1 : n > r ? 1 : 0;
	}
	function Kc(e, t, n) {
		const r = t.propertyName.toLowerCase(), i = e[0].propertyName.toLowerCase(), s = e[e.length - 1].propertyName.toLowerCase();
		if (r < i) return 0;
		if (r > s) return e.length;
		let o = 0, l = e.length - 1;
		for (; o <= l;) {
			let a = l + o >> 1, u = n(t, e[a]);
			if (u > 0) o = a + 1;
			else if (u < 0) l = a - 1;
			else return a;
		}
		return -o - 1;
	}
	function e0(e, t) {
		const n = {
			...t,
			keepLines: !1
		}, r = Ae.applyEdits(e, Wr(e, n, void 0)), i = Ae.create("test://test.json", "json", 0, r), s = n0(i, t0(i)), o = Wr(s, n, void 0), l = Ae.applyEdits(s, o);
		return [Me.replace(U.create(Q.create(0, 0), e.positionAt(e.getText().length)), l)];
	}
	function t0(e) {
		const t = Ze(e.getText(), !1);
		let n = new Nn(), r = n, i = n, s = n, o, l = 0, a = 0, u, h, f = -1, d = -1, m = 0, g = 0, p = [], w = !1, _ = !1;
		for (; (o = t.scan()) !== 17;) {
			if (w === !0 && o !== 14 && o !== 15 && o !== 12 && o !== 13 && i.endLineNumber === void 0) {
				let N = t.getTokenStartLine();
				h === 2 || h === 4 ? s.endLineNumber = N - 1 : i.endLineNumber = N - 1, m = N, w = !1;
			}
			if (_ === !0 && o !== 14 && o !== 15 && o !== 12 && o !== 13 && (m = t.getTokenStartLine(), _ = !1), t.getTokenStartLine() !== l) {
				for (let N = l; N < t.getTokenStartLine(); N++) {
					const v = e.getText(U.create(Q.create(N, 0), Q.create(N + 1, 0))).length;
					a = a + v;
				}
				l = t.getTokenStartLine();
			}
			switch (o) {
				case 10:
					if (u === void 0 || u === 1 || u === 5 && p[p.length - 1] === re.Object) {
						const N = new Nn(t.getTokenValue(), m);
						s = i, i = r.addChildProperty(N);
					}
					break;
				case 3:
					if (n.beginningLineNumber === void 0 && (n.beginningLineNumber = t.getTokenStartLine()), p[p.length - 1] === re.Object) r = i;
					else if (p[p.length - 1] === re.Array) {
						const N = new Nn(t.getTokenValue(), m);
						N.noKeyName = !0, s = i, i = r.addChildProperty(N), r = i;
					}
					p.push(re.Array), i.type = re.Array, m = t.getTokenStartLine(), m++;
					break;
				case 1:
					if (n.beginningLineNumber === void 0) n.beginningLineNumber = t.getTokenStartLine();
					else if (p[p.length - 1] === re.Array) {
						const N = new Nn(t.getTokenValue(), m);
						N.noKeyName = !0, s = i, i = r.addChildProperty(N);
					}
					i.type = re.Object, p.push(re.Object), r = i, m = t.getTokenStartLine(), m++;
					break;
				case 4:
					g = t.getTokenStartLine(), p.pop(), i.endLineNumber === void 0 && (u === 2 || u === 4) && (i.endLineNumber = g - 1, i.lastProperty = !0, i.lineWhereToAddComma = f, i.indexWhereToAddComa = d, s = i, i = i ? i.parent : void 0, r = i), n.endLineNumber = g, m = g + 1;
					break;
				case 2:
					g = t.getTokenStartLine(), p.pop(), u !== 1 && (i.endLineNumber === void 0 && (i.endLineNumber = g - 1, i.lastProperty = !0, i.lineWhereToAddComma = f, i.indexWhereToAddComa = d), s = i, i = i ? i.parent : void 0, r = i), n.endLineNumber = t.getTokenStartLine(), m = g + 1;
					break;
				case 5:
					g = t.getTokenStartLine(), i.endLineNumber === void 0 && (p[p.length - 1] === re.Object || p[p.length - 1] === re.Array && (u === 2 || u === 4)) && (i.endLineNumber = g, i.commaIndex = t.getTokenOffset() - a, i.commaLine = g), (u === 2 || u === 4) && (s = i, i = i ? i.parent : void 0, r = i), m = g + 1;
					break;
				case 13:
					u === 5 && f === t.getTokenStartLine() && (p[p.length - 1] === re.Array && (h === 2 || h === 4) || p[p.length - 1] === re.Object) && (p[p.length - 1] === re.Array && (h === 2 || h === 4) || p[p.length - 1] === re.Object) && (i.endLineNumber = void 0, w = !0), (u === 1 || u === 3) && f === t.getTokenStartLine() && (_ = !0);
					break;
			}
			o !== 14 && o !== 13 && o !== 12 && o !== 15 && (h = u, u = o, f = t.getTokenStartLine(), d = t.getTokenOffset() + t.getTokenLength() - a);
		}
		return n;
	}
	function n0(e, t) {
		if (t.childrenProperties.length === 0) return e;
		const n = Ae.create("test://test.json", "json", 0, e.getText()), r = [];
		for (Do(r, t, t.beginningLineNumber); r.length > 0;) {
			const i = r.shift(), s = i.propertyTreeArray;
			let o = i.beginningLineNumber;
			for (let l = 0; l < s.length; l++) {
				const a = s[l], u = U.create(Q.create(a.beginningLineNumber, 0), Q.create(a.endLineNumber + 1, 0)), h = e.getText(u), f = Ae.create("test://test.json", "json", 0, h);
				if (a.lastProperty === !0 && l !== s.length - 1) {
					const g = a.lineWhereToAddComma - a.beginningLineNumber, p = a.indexWhereToAddComa, w = {
						range: U.create(Q.create(g, p), Q.create(g, p)),
						text: ","
					};
					Ae.update(f, [w], 1);
				} else if (a.lastProperty === !1 && l === s.length - 1) {
					const g = a.commaIndex, p = a.commaLine - a.beginningLineNumber, w = {
						range: U.create(Q.create(p, g), Q.create(p, g + 1)),
						text: ""
					};
					Ae.update(f, [w], 1);
				}
				const d = a.endLineNumber - a.beginningLineNumber + 1, m = {
					range: U.create(Q.create(o, 0), Q.create(o + d, 0)),
					text: f.getText()
				};
				Ae.update(n, [m], 1), Do(r, a, o), o = o + d;
			}
		}
		return n;
	}
	function Do(e, t, n) {
		if (t.childrenProperties.length !== 0) if (t.type === re.Object) {
			let r = Infinity;
			for (const s of t.childrenProperties) s.beginningLineNumber < r && (r = s.beginningLineNumber);
			const i = r - t.beginningLineNumber;
			n = n + i, e.push(new $o(n, t.childrenProperties));
		} else t.type === re.Array && Oo(e, t, n);
	}
	function Oo(e, t, n) {
		for (const r of t.childrenProperties) {
			if (r.type === re.Object) {
				let i = Infinity;
				for (const o of r.childrenProperties) o.beginningLineNumber < i && (i = o.beginningLineNumber);
				const s = i - r.beginningLineNumber;
				e.push(new $o(n + r.beginningLineNumber - t.beginningLineNumber + s, r.childrenProperties));
			}
			r.type === re.Array && Oo(e, r, n + r.beginningLineNumber - t.beginningLineNumber);
		}
	}
	var $o = class {
		constructor(e, t) {
			this.beginningLineNumber = e, this.propertyTreeArray = t;
		}
	};
	function r0(e, t) {
		const n = [];
		return t.visit((r) => {
			if (r.type === "property" && r.keyNode.value === "$ref" && r.valueNode?.type === "string") {
				const i = r.valueNode.value, s = s0(t, i);
				if (s) {
					const o = e.positionAt(s.offset);
					n.push({
						target: `${e.uri}#${o.line + 1},${o.character + 1}`,
						range: i0(e, r.valueNode)
					});
				}
			}
			return !0;
		}), Promise.resolve(n);
	}
	function i0(e, t) {
		return U.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1));
	}
	function s0(e, t) {
		const n = o0(t);
		return n ? Hr(n, e.root) : null;
	}
	function Hr(e, t) {
		if (!t) return null;
		if (e.length === 0) return t;
		const n = e.shift();
		if (t && t.type === "object") {
			const r = t.properties.find((i) => i.keyNode.value === n);
			return r ? Hr(e, r.valueNode) : null;
		} else if (t && t.type === "array" && n.match(/^(0|[1-9][0-9]*)$/)) {
			const r = Number.parseInt(n), i = t.items[r];
			return i ? Hr(e, i) : null;
		}
		return null;
	}
	function o0(e) {
		return e === "#" ? [] : e[0] !== "#" || e[1] !== "/" ? null : e.substring(2).split(/\//).map(a0);
	}
	function a0(e) {
		return e.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	function l0(e) {
		const t = e.promiseConstructor || Promise, n = new Jc(e.schemaRequestService, e.workspaceContext, t);
		n.setSchemaContributions(jr);
		const r = new Tc(n, e.contributions, t, e.clientCapabilities), i = new Pc(n, e.contributions, t), s = new Uc(n), o = new Fc(n, t);
		return {
			configure: (l) => {
				n.clearExternalSchemas(), l.schemas?.forEach(n.registerExternalSchema.bind(n)), o.configure(l);
			},
			resetSchema: (l) => n.onResourceChange(l),
			doValidation: o.doValidation.bind(o),
			getLanguageStatus: o.getLanguageStatus.bind(o),
			parseJSONDocument: (l) => Cc(l, { collectComments: !0 }),
			newJSONDocument: (l, a) => Mc(l, a),
			getMatchingSchemas: n.getMatchingSchemas.bind(n),
			doResolve: r.doResolve.bind(r),
			doComplete: r.doComplete.bind(r),
			findDocumentSymbols: s.findDocumentSymbols.bind(s),
			findDocumentSymbols2: s.findDocumentSymbols2.bind(s),
			findDocumentColors: s.findDocumentColors.bind(s),
			getColorPresentations: s.getColorPresentations.bind(s),
			doHover: i.doHover.bind(i),
			getFoldingRanges: Qc,
			getSelectionRanges: Yc,
			findDefinition: () => Promise.resolve([]),
			findLinks: r0,
			format: (l, a, u) => Wr(l, u, a),
			sort: (l, a) => e0(l, a)
		};
	}
	var Bo;
	typeof fetch < "u" && (Bo = function(e) {
		return fetch(e).then((t) => t.text());
	});
	var u0 = class {
		constructor(e, t) {
			this._ctx = e, this._languageSettings = t.languageSettings, this._languageId = t.languageId, this._languageService = l0({
				workspaceContext: { resolveRelativePath: (n, r) => h0(r.substr(0, r.lastIndexOf("/") + 1), n) },
				schemaRequestService: t.enableSchemaRequest ? Bo : void 0,
				clientCapabilities: Or.LATEST
			}), this._languageService.configure(this._languageSettings);
		}
		async doValidation(e) {
			let t = this._getTextDocument(e);
			if (t) {
				let n = this._languageService.parseJSONDocument(t);
				return this._languageService.doValidation(t, n, this._languageSettings);
			}
			return Promise.resolve([]);
		}
		async doComplete(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return null;
			let r = this._languageService.parseJSONDocument(n);
			return this._languageService.doComplete(n, t, r);
		}
		async doResolve(e) {
			return this._languageService.doResolve(e);
		}
		async doHover(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return null;
			let r = this._languageService.parseJSONDocument(n);
			return this._languageService.doHover(n, t, r);
		}
		async format(e, t, n) {
			let r = this._getTextDocument(e);
			if (!r) return [];
			let i = this._languageService.format(r, t, n);
			return Promise.resolve(i);
		}
		async resetSchema(e) {
			return Promise.resolve(this._languageService.resetSchema(e));
		}
		async findDocumentSymbols(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentSymbols2(t, n);
			return Promise.resolve(r);
		}
		async findDocumentColors(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentColors(t, n);
			return Promise.resolve(r);
		}
		async getColorPresentations(e, t, n) {
			let r = this._getTextDocument(e);
			if (!r) return [];
			let i = this._languageService.parseJSONDocument(r), s = this._languageService.getColorPresentations(r, i, t, n);
			return Promise.resolve(s);
		}
		async getFoldingRanges(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return [];
			let r = this._languageService.getFoldingRanges(n, t);
			return Promise.resolve(r);
		}
		async getSelectionRanges(e, t) {
			let n = this._getTextDocument(e);
			if (!n) return [];
			let r = this._languageService.parseJSONDocument(n), i = this._languageService.getSelectionRanges(n, t, r);
			return Promise.resolve(i);
		}
		async parseJSONDocument(e) {
			let t = this._getTextDocument(e);
			if (!t) return null;
			let n = this._languageService.parseJSONDocument(t);
			return Promise.resolve(n);
		}
		async getMatchingSchemas(e) {
			let t = this._getTextDocument(e);
			if (!t) return [];
			let n = this._languageService.parseJSONDocument(t);
			return Promise.resolve(this._languageService.getMatchingSchemas(t, n));
		}
		_getTextDocument(e) {
			let t = this._ctx.getMirrorModels();
			for (let n of t) if (n.uri.toString() === e) return Ae.create(e, this._languageId, n.version, n.getValue());
			return null;
		}
	}, c0 = 47, zr = 46;
	function f0(e) {
		return e.charCodeAt(0) === c0;
	}
	function h0(e, t) {
		if (f0(t)) {
			const n = vt.parse(e), r = t.split("/");
			return n.with({ path: Uo(r) }).toString();
		}
		return m0(e, t);
	}
	function Uo(e) {
		const t = [];
		for (const r of e) r.length === 0 || r.length === 1 && r.charCodeAt(0) === zr || (r.length === 2 && r.charCodeAt(0) === zr && r.charCodeAt(1) === zr ? t.pop() : t.push(r));
		e.length > 1 && e[e.length - 1].length === 0 && t.push("");
		let n = t.join("/");
		return e[0].length === 0 && (n = "/" + n), n;
	}
	function m0(e, ...t) {
		const n = vt.parse(e), r = n.path.split("/");
		for (let i of t) r.push(...i.split("/"));
		return n.with({ path: Uo(r) }).toString();
	}
	self.onmessage = () => {
		g1((e, t) => new u0(e, t));
	};
})();
