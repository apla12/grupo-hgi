// node_modules/zone.js/fesm2015/zone.js
var global = globalThis;
function __symbol__(name) {
  const symbolPrefix = global["__Zone_symbol_prefix"] || "__zone_symbol__";
  return symbolPrefix + name;
}
function initZone() {
  const performance = global["performance"];
  function mark(name) {
    performance && performance["mark"] && performance["mark"](name);
  }
  function performanceMeasure(name, label) {
    performance && performance["measure"] && performance["measure"](name, label);
  }
  mark("Zone");
  const _ZoneImpl = class _ZoneImpl {
    static assertZonePatched() {
      if (global["Promise"] !== patches["ZoneAwarePromise"]) {
        throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
      }
    }
    static get root() {
      let zone = _ZoneImpl.current;
      while (zone.parent) {
        zone = zone.parent;
      }
      return zone;
    }
    static get current() {
      return _currentZoneFrame.zone;
    }
    static get currentTask() {
      return _currentTask;
    }
    // tslint:disable-next-line:require-internal-with-underscore
    static __load_patch(name, fn, ignoreDuplicate = false) {
      if (patches.hasOwnProperty(name)) {
        const checkDuplicate = global[__symbol__("forceDuplicateZoneCheck")] === true;
        if (!ignoreDuplicate && checkDuplicate) {
          throw Error("Already loaded patch: " + name);
        }
      } else if (!global["__Zone_disable_" + name]) {
        const perfName = "Zone:" + name;
        mark(perfName);
        patches[name] = fn(global, _ZoneImpl, _api);
        performanceMeasure(perfName, perfName);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    constructor(parent, zoneSpec) {
      this._parent = parent;
      this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
      this._properties = zoneSpec && zoneSpec.properties || {};
      this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
    }
    get(key) {
      const zone = this.getZoneWith(key);
      if (zone)
        return zone._properties[key];
    }
    getZoneWith(key) {
      let current = this;
      while (current) {
        if (current._properties.hasOwnProperty(key)) {
          return current;
        }
        current = current._parent;
      }
      return null;
    }
    fork(zoneSpec) {
      if (!zoneSpec)
        throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, zoneSpec);
    }
    wrap(callback, source) {
      if (typeof callback !== "function") {
        throw new Error("Expecting function got: " + callback);
      }
      const _callback = this._zoneDelegate.intercept(this, callback, source);
      const zone = this;
      return function() {
        return zone.runGuarded(_callback, this, arguments, source);
      };
    }
    run(callback, applyThis, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runGuarded(callback, applyThis = null, applyArgs, source) {
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        _currentZoneFrame = _currentZoneFrame.parent;
      }
    }
    runTask(task, applyThis, applyArgs) {
      if (task.zone != this) {
        throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      }
      if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
        return;
      }
      const reEntryGuard = task.state != running;
      reEntryGuard && task._transitionTo(running, scheduled);
      task.runCount++;
      const previousTask = _currentTask;
      _currentTask = task;
      _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
      try {
        if (task.type == macroTask && task.data && !task.data.isPeriodic) {
          task.cancelFn = void 0;
        }
        try {
          return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
        } catch (error) {
          if (this._zoneDelegate.handleError(this, error)) {
            throw error;
          }
        }
      } finally {
        if (task.state !== notScheduled && task.state !== unknown) {
          if (task.type == eventTask || task.data && task.data.isPeriodic) {
            reEntryGuard && task._transitionTo(scheduled, running);
          } else {
            task.runCount = 0;
            this._updateTaskCount(task, -1);
            reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
          }
        }
        _currentZoneFrame = _currentZoneFrame.parent;
        _currentTask = previousTask;
      }
    }
    scheduleTask(task) {
      if (task.zone && task.zone !== this) {
        let newZone = this;
        while (newZone) {
          if (newZone === task.zone) {
            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
          }
          newZone = newZone.parent;
        }
      }
      task._transitionTo(scheduling, notScheduled);
      const zoneDelegates = [];
      task._zoneDelegates = zoneDelegates;
      task._zone = this;
      try {
        task = this._zoneDelegate.scheduleTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, scheduling, notScheduled);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      if (task._zoneDelegates === zoneDelegates) {
        this._updateTaskCount(task, 1);
      }
      if (task.state == scheduling) {
        task._transitionTo(scheduled, scheduling);
      }
      return task;
    }
    scheduleMicroTask(source, callback, data, customSchedule) {
      return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
    }
    scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
    }
    scheduleEventTask(source, callback, data, customSchedule, customCancel) {
      return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
    }
    cancelTask(task) {
      if (task.zone != this)
        throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
      if (task.state !== scheduled && task.state !== running) {
        return;
      }
      task._transitionTo(canceling, scheduled, running);
      try {
        this._zoneDelegate.cancelTask(this, task);
      } catch (err) {
        task._transitionTo(unknown, canceling);
        this._zoneDelegate.handleError(this, err);
        throw err;
      }
      this._updateTaskCount(task, -1);
      task._transitionTo(notScheduled, canceling);
      task.runCount = 0;
      return task;
    }
    _updateTaskCount(task, count) {
      const zoneDelegates = task._zoneDelegates;
      if (count == -1) {
        task._zoneDelegates = null;
      }
      for (let i = 0; i < zoneDelegates.length; i++) {
        zoneDelegates[i]._updateTaskCount(task.type, count);
      }
    }
  };
  _ZoneImpl.__symbol__ = __symbol__;
  let ZoneImpl = _ZoneImpl;
  const DELEGATE_ZS = {
    name: "",
    onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
    onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
    onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
    onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
  };
  class _ZoneDelegate {
    get zone() {
      return this._zone;
    }
    constructor(zone, parentDelegate, zoneSpec) {
      this._taskCounts = {
        "microTask": 0,
        "macroTask": 0,
        "eventTask": 0
      };
      this._zone = zone;
      this._parentDelegate = parentDelegate;
      this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
      this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
      this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this._zone : parentDelegate._forkCurrZone);
      this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
      this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
      this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this._zone : parentDelegate._interceptCurrZone);
      this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
      this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
      this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this._zone : parentDelegate._invokeCurrZone);
      this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
      this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
      this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this._zone : parentDelegate._handleErrorCurrZone);
      this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
      this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
      this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this._zone : parentDelegate._scheduleTaskCurrZone);
      this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
      this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
      this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this._zone : parentDelegate._invokeTaskCurrZone);
      this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
      this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
      this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this._zone : parentDelegate._cancelTaskCurrZone);
      this._hasTaskZS = null;
      this._hasTaskDlgt = null;
      this._hasTaskDlgtOwner = null;
      this._hasTaskCurrZone = null;
      const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
      const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
      if (zoneSpecHasTask || parentHasTask) {
        this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
        this._hasTaskDlgt = parentDelegate;
        this._hasTaskDlgtOwner = this;
        this._hasTaskCurrZone = this._zone;
        if (!zoneSpec.onScheduleTask) {
          this._scheduleTaskZS = DELEGATE_ZS;
          this._scheduleTaskDlgt = parentDelegate;
          this._scheduleTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onInvokeTask) {
          this._invokeTaskZS = DELEGATE_ZS;
          this._invokeTaskDlgt = parentDelegate;
          this._invokeTaskCurrZone = this._zone;
        }
        if (!zoneSpec.onCancelTask) {
          this._cancelTaskZS = DELEGATE_ZS;
          this._cancelTaskDlgt = parentDelegate;
          this._cancelTaskCurrZone = this._zone;
        }
      }
    }
    fork(targetZone, zoneSpec) {
      return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new ZoneImpl(targetZone, zoneSpec);
    }
    intercept(targetZone, callback, source) {
      return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
    }
    invoke(targetZone, callback, applyThis, applyArgs, source) {
      return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
    }
    handleError(targetZone, error) {
      return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
    }
    scheduleTask(targetZone, task) {
      let returnTask = task;
      if (this._scheduleTaskZS) {
        if (this._hasTaskZS) {
          returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
        }
        returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
        if (!returnTask)
          returnTask = task;
      } else {
        if (task.scheduleFn) {
          task.scheduleFn(task);
        } else if (task.type == microTask) {
          scheduleMicroTask(task);
        } else {
          throw new Error("Task is missing scheduleFn.");
        }
      }
      return returnTask;
    }
    invokeTask(targetZone, task, applyThis, applyArgs) {
      return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
    }
    cancelTask(targetZone, task) {
      let value;
      if (this._cancelTaskZS) {
        value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
      } else {
        if (!task.cancelFn) {
          throw Error("Task is not cancelable");
        }
        value = task.cancelFn(task);
      }
      return value;
    }
    hasTask(targetZone, isEmpty) {
      try {
        this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
      } catch (err) {
        this.handleError(targetZone, err);
      }
    }
    // tslint:disable-next-line:require-internal-with-underscore
    _updateTaskCount(type, count) {
      const counts = this._taskCounts;
      const prev = counts[type];
      const next = counts[type] = prev + count;
      if (next < 0) {
        throw new Error("More tasks executed then were scheduled.");
      }
      if (prev == 0 || next == 0) {
        const isEmpty = {
          microTask: counts["microTask"] > 0,
          macroTask: counts["macroTask"] > 0,
          eventTask: counts["eventTask"] > 0,
          change: type
        };
        this.hasTask(this._zone, isEmpty);
      }
    }
  }
  class ZoneTask {
    constructor(type, source, callback, options, scheduleFn, cancelFn) {
      this._zone = null;
      this.runCount = 0;
      this._zoneDelegates = null;
      this._state = "notScheduled";
      this.type = type;
      this.source = source;
      this.data = options;
      this.scheduleFn = scheduleFn;
      this.cancelFn = cancelFn;
      if (!callback) {
        throw new Error("callback is not defined");
      }
      this.callback = callback;
      const self2 = this;
      if (type === eventTask && options && options.useG) {
        this.invoke = ZoneTask.invokeTask;
      } else {
        this.invoke = function() {
          return ZoneTask.invokeTask.call(global, self2, this, arguments);
        };
      }
    }
    static invokeTask(task, target, args) {
      if (!task) {
        task = this;
      }
      _numberOfNestedTaskFrames++;
      try {
        task.runCount++;
        return task.zone.runTask(task, target, args);
      } finally {
        if (_numberOfNestedTaskFrames == 1) {
          drainMicroTaskQueue();
        }
        _numberOfNestedTaskFrames--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(notScheduled, scheduling);
    }
    // tslint:disable-next-line:require-internal-with-underscore
    _transitionTo(toState, fromState1, fromState2) {
      if (this._state === fromState1 || this._state === fromState2) {
        this._state = toState;
        if (toState == notScheduled) {
          this._zoneDelegates = null;
        }
      } else {
        throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
      }
    }
    toString() {
      if (this.data && typeof this.data.handleId !== "undefined") {
        return this.data.handleId.toString();
      } else {
        return Object.prototype.toString.call(this);
      }
    }
    // add toJSON method to prevent cyclic error when
    // call JSON.stringify(zoneTask)
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount
      };
    }
  }
  const symbolSetTimeout = __symbol__("setTimeout");
  const symbolPromise = __symbol__("Promise");
  const symbolThen = __symbol__("then");
  let _microTaskQueue = [];
  let _isDrainingMicrotaskQueue = false;
  let nativeMicroTaskQueuePromise;
  function nativeScheduleMicroTask(func) {
    if (!nativeMicroTaskQueuePromise) {
      if (global[symbolPromise]) {
        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
      }
    }
    if (nativeMicroTaskQueuePromise) {
      let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
      if (!nativeThen) {
        nativeThen = nativeMicroTaskQueuePromise["then"];
      }
      nativeThen.call(nativeMicroTaskQueuePromise, func);
    } else {
      global[symbolSetTimeout](func, 0);
    }
  }
  function scheduleMicroTask(task) {
    if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
      nativeScheduleMicroTask(drainMicroTaskQueue);
    }
    task && _microTaskQueue.push(task);
  }
  function drainMicroTaskQueue() {
    if (!_isDrainingMicrotaskQueue) {
      _isDrainingMicrotaskQueue = true;
      while (_microTaskQueue.length) {
        const queue = _microTaskQueue;
        _microTaskQueue = [];
        for (let i = 0; i < queue.length; i++) {
          const task = queue[i];
          try {
            task.zone.runTask(task, null, null);
          } catch (error) {
            _api.onUnhandledError(error);
          }
        }
      }
      _api.microtaskDrainDone();
      _isDrainingMicrotaskQueue = false;
    }
  }
  const NO_ZONE = { name: "NO ZONE" };
  const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
  const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
  const patches = {};
  const _api = {
    symbol: __symbol__,
    currentZoneFrame: () => _currentZoneFrame,
    onUnhandledError: noop,
    microtaskDrainDone: noop,
    scheduleMicroTask,
    showUncaughtError: () => !ZoneImpl[__symbol__("ignoreConsoleErrorUncaughtError")],
    patchEventTarget: () => [],
    patchOnProperties: noop,
    patchMethod: () => noop,
    bindArguments: () => [],
    patchThen: () => noop,
    patchMacroTask: () => noop,
    patchEventPrototype: () => noop,
    isIEOrEdge: () => false,
    getGlobalObjects: () => void 0,
    ObjectDefineProperty: () => noop,
    ObjectGetOwnPropertyDescriptor: () => void 0,
    ObjectCreate: () => void 0,
    ArraySlice: () => [],
    patchClass: () => noop,
    wrapWithCurrentZone: () => noop,
    filterProperties: () => [],
    attachOriginToPatched: () => noop,
    _redefineProperty: () => noop,
    patchCallbacks: () => noop,
    nativeScheduleMicroTask
  };
  let _currentZoneFrame = { parent: null, zone: new ZoneImpl(null, null) };
  let _currentTask = null;
  let _numberOfNestedTaskFrames = 0;
  function noop() {
  }
  performanceMeasure("Zone", "Zone");
  return ZoneImpl;
}
function loadZone() {
  const global2 = globalThis;
  const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
  if (global2["Zone"] && (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function")) {
    throw new Error("Zone already loaded.");
  }
  global2["Zone"] ??= initZone();
  return global2["Zone"];
}
var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ObjectDefineProperty = Object.defineProperty;
var ObjectGetPrototypeOf = Object.getPrototypeOf;
var ObjectCreate = Object.create;
var ArraySlice = Array.prototype.slice;
var ADD_EVENT_LISTENER_STR = "addEventListener";
var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
var ZONE_SYMBOL_ADD_EVENT_LISTENER = __symbol__(ADD_EVENT_LISTENER_STR);
var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = __symbol__(REMOVE_EVENT_LISTENER_STR);
var TRUE_STR = "true";
var FALSE_STR = "false";
var ZONE_SYMBOL_PREFIX = __symbol__("");
function wrapWithCurrentZone(callback, source) {
  return Zone.current.wrap(callback, source);
}
function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
  return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
}
var zoneSymbol = __symbol__;
var isWindowExists = typeof window !== "undefined";
var internalWindow = isWindowExists ? window : void 0;
var _global = isWindowExists && internalWindow || globalThis;
var REMOVE_ATTRIBUTE = "removeAttribute";
function bindArguments(args, source) {
  for (let i = args.length - 1; i >= 0; i--) {
    if (typeof args[i] === "function") {
      args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
    }
  }
  return args;
}
function patchPrototype(prototype, fnNames) {
  const source = prototype.constructor["name"];
  for (let i = 0; i < fnNames.length; i++) {
    const name = fnNames[i];
    const delegate = prototype[name];
    if (delegate) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
      if (!isPropertyWritable(prototypeDesc)) {
        continue;
      }
      prototype[name] = ((delegate2) => {
        const patched = function() {
          return delegate2.apply(this, bindArguments(arguments, source + "." + name));
        };
        attachOriginToPatched(patched, delegate2);
        return patched;
      })(delegate);
    }
  }
}
function isPropertyWritable(propertyDesc) {
  if (!propertyDesc) {
    return true;
  }
  if (propertyDesc.writable === false) {
    return false;
  }
  return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
}
var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
var isNode = !("nw" in _global) && typeof _global.process !== "undefined" && _global.process.toString() === "[object process]";
var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var isMix = typeof _global.process !== "undefined" && _global.process.toString() === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
var zoneSymbolEventNames$1 = {};
var wrapFn = function(event) {
  event = event || _global.event;
  if (!event) {
    return;
  }
  let eventNameSymbol = zoneSymbolEventNames$1[event.type];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
  }
  const target = this || event.target || _global;
  const listener = target[eventNameSymbol];
  let result;
  if (isBrowser && target === internalWindow && event.type === "error") {
    const errorEvent = event;
    result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
    if (result === true) {
      event.preventDefault();
    }
  } else {
    result = listener && listener.apply(this, arguments);
    if (result != void 0 && !result) {
      event.preventDefault();
    }
  }
  return result;
};
function patchProperty(obj, prop, prototype) {
  let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
  if (!desc && prototype) {
    const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
    if (prototypeDesc) {
      desc = { enumerable: true, configurable: true };
    }
  }
  if (!desc || !desc.configurable) {
    return;
  }
  const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
  if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
    return;
  }
  delete desc.writable;
  delete desc.value;
  const originalDescGet = desc.get;
  const originalDescSet = desc.set;
  const eventName = prop.slice(2);
  let eventNameSymbol = zoneSymbolEventNames$1[eventName];
  if (!eventNameSymbol) {
    eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
  }
  desc.set = function(newValue) {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return;
    }
    const previousValue = target[eventNameSymbol];
    if (typeof previousValue === "function") {
      target.removeEventListener(eventName, wrapFn);
    }
    originalDescSet && originalDescSet.call(target, null);
    target[eventNameSymbol] = newValue;
    if (typeof newValue === "function") {
      target.addEventListener(eventName, wrapFn, false);
    }
  };
  desc.get = function() {
    let target = this;
    if (!target && obj === _global) {
      target = _global;
    }
    if (!target) {
      return null;
    }
    const listener = target[eventNameSymbol];
    if (listener) {
      return listener;
    } else if (originalDescGet) {
      let value = originalDescGet.call(this);
      if (value) {
        desc.set.call(this, value);
        if (typeof target[REMOVE_ATTRIBUTE] === "function") {
          target.removeAttribute(prop);
        }
        return value;
      }
    }
    return null;
  };
  ObjectDefineProperty(obj, prop, desc);
  obj[onPropPatchedSymbol] = true;
}
function patchOnProperties(obj, properties, prototype) {
  if (properties) {
    for (let i = 0; i < properties.length; i++) {
      patchProperty(obj, "on" + properties[i], prototype);
    }
  } else {
    const onProperties = [];
    for (const prop in obj) {
      if (prop.slice(0, 2) == "on") {
        onProperties.push(prop);
      }
    }
    for (let j = 0; j < onProperties.length; j++) {
      patchProperty(obj, onProperties[j], prototype);
    }
  }
}
var originalInstanceKey = zoneSymbol("originalInstance");
function patchClass(className) {
  const OriginalClass = _global[className];
  if (!OriginalClass)
    return;
  _global[zoneSymbol(className)] = OriginalClass;
  _global[className] = function() {
    const a = bindArguments(arguments, className);
    switch (a.length) {
      case 0:
        this[originalInstanceKey] = new OriginalClass();
        break;
      case 1:
        this[originalInstanceKey] = new OriginalClass(a[0]);
        break;
      case 2:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
        break;
      case 3:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
        break;
      case 4:
        this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
        break;
      default:
        throw new Error("Arg list too long.");
    }
  };
  attachOriginToPatched(_global[className], OriginalClass);
  const instance = new OriginalClass(function() {
  });
  let prop;
  for (prop in instance) {
    if (className === "XMLHttpRequest" && prop === "responseBlob")
      continue;
    (function(prop2) {
      if (typeof instance[prop2] === "function") {
        _global[className].prototype[prop2] = function() {
          return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
        };
      } else {
        ObjectDefineProperty(_global[className].prototype, prop2, {
          set: function(fn) {
            if (typeof fn === "function") {
              this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
              attachOriginToPatched(this[originalInstanceKey][prop2], fn);
            } else {
              this[originalInstanceKey][prop2] = fn;
            }
          },
          get: function() {
            return this[originalInstanceKey][prop2];
          }
        });
      }
    })(prop);
  }
  for (prop in OriginalClass) {
    if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
      _global[className][prop] = OriginalClass[prop];
    }
  }
}
function patchMethod(target, name, patchFn) {
  let proto = target;
  while (proto && !proto.hasOwnProperty(name)) {
    proto = ObjectGetPrototypeOf(proto);
  }
  if (!proto && target[name]) {
    proto = target;
  }
  const delegateName = zoneSymbol(name);
  let delegate = null;
  if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
    delegate = proto[delegateName] = proto[name];
    const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
    if (isPropertyWritable(desc)) {
      const patchDelegate = patchFn(delegate, delegateName, name);
      proto[name] = function() {
        return patchDelegate(this, arguments);
      };
      attachOriginToPatched(proto[name], delegate);
    }
  }
  return delegate;
}
function patchMacroTask(obj, funcName, metaCreator) {
  let setNative = null;
  function scheduleTask(task) {
    const data = task.data;
    data.args[data.cbIdx] = function() {
      task.invoke.apply(this, arguments);
    };
    setNative.apply(data.target, data.args);
    return task;
  }
  setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
    const meta = metaCreator(self2, args);
    if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
      return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
    } else {
      return delegate.apply(self2, args);
    }
  });
}
function attachOriginToPatched(patched, original) {
  patched[zoneSymbol("OriginalDelegate")] = original;
}
var isDetectedIEOrEdge = false;
var ieOrEdge = false;
function isIE() {
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1) {
      return true;
    }
  } catch (error) {
  }
  return false;
}
function isIEOrEdge() {
  if (isDetectedIEOrEdge) {
    return ieOrEdge;
  }
  isDetectedIEOrEdge = true;
  try {
    const ua = internalWindow.navigator.userAgent;
    if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
      ieOrEdge = true;
    }
  } catch (error) {
  }
  return ieOrEdge;
}
var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    const options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported = true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
  useG: true
};
var zoneSymbolEventNames = {};
var globalSources = {};
var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
function prepareEventNames(eventName, eventNameToString) {
  const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
  const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
  const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
  const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
  zoneSymbolEventNames[eventName] = {};
  zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
  zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
}
function patchEventTarget(_global2, api, apis, patchOptions) {
  const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
  const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
  const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
  const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
  const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
  const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
  const PREPEND_EVENT_LISTENER = "prependListener";
  const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
  const invokeTask = function(task, target, event) {
    if (task.isRemoved) {
      return;
    }
    const delegate = task.callback;
    if (typeof delegate === "object" && delegate.handleEvent) {
      task.callback = (event2) => delegate.handleEvent(event2);
      task.originalDelegate = delegate;
    }
    let error;
    try {
      task.invoke(task, target, [event]);
    } catch (err) {
      error = err;
    }
    const options = task.options;
    if (options && typeof options === "object" && options.once) {
      const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
      target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
    }
    return error;
  };
  function globalCallback(context, event, isCapture) {
    event = event || _global2.event;
    if (!event) {
      return;
    }
    const target = context || event.target || _global2;
    const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
    if (tasks) {
      const errors = [];
      if (tasks.length === 1) {
        const err = invokeTask(tasks[0], target, event);
        err && errors.push(err);
      } else {
        const copyTasks = tasks.slice();
        for (let i = 0; i < copyTasks.length; i++) {
          if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
            break;
          }
          const err = invokeTask(copyTasks[i], target, event);
          err && errors.push(err);
        }
      }
      if (errors.length === 1) {
        throw errors[0];
      } else {
        for (let i = 0; i < errors.length; i++) {
          const err = errors[i];
          api.nativeScheduleMicroTask(() => {
            throw err;
          });
        }
      }
    }
  }
  const globalZoneAwareCallback = function(event) {
    return globalCallback(this, event, false);
  };
  const globalZoneAwareCaptureCallback = function(event) {
    return globalCallback(this, event, true);
  };
  function patchEventTargetMethods(obj, patchOptions2) {
    if (!obj) {
      return false;
    }
    let useGlobalCallback = true;
    if (patchOptions2 && patchOptions2.useG !== void 0) {
      useGlobalCallback = patchOptions2.useG;
    }
    const validateHandler = patchOptions2 && patchOptions2.vh;
    let checkDuplicate = true;
    if (patchOptions2 && patchOptions2.chkDup !== void 0) {
      checkDuplicate = patchOptions2.chkDup;
    }
    let returnTarget = false;
    if (patchOptions2 && patchOptions2.rt !== void 0) {
      returnTarget = patchOptions2.rt;
    }
    let proto = obj;
    while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && obj[ADD_EVENT_LISTENER]) {
      proto = obj;
    }
    if (!proto) {
      return false;
    }
    if (proto[zoneSymbolAddEventListener]) {
      return false;
    }
    const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
    const taskData = {};
    const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
    const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
    const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
    const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
    let nativePrependEventListener;
    if (patchOptions2 && patchOptions2.prepend) {
      nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
    }
    function buildEventListenerOptions(options, passive) {
      if (!passiveSupported && typeof options === "object" && options) {
        return !!options.capture;
      }
      if (!passiveSupported || !passive) {
        return options;
      }
      if (typeof options === "boolean") {
        return { capture: options, passive: true };
      }
      if (!options) {
        return { passive: true };
      }
      if (typeof options === "object" && options.passive !== false) {
        return { ...options, passive: true };
      }
      return options;
    }
    const customScheduleGlobal = function(task) {
      if (taskData.isExisting) {
        return;
      }
      return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
    };
    const customCancelGlobal = function(task) {
      if (!task.isRemoved) {
        const symbolEventNames = zoneSymbolEventNames[task.eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && task.target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (existingTask === task) {
              existingTasks.splice(i, 1);
              task.isRemoved = true;
              if (existingTasks.length === 0) {
                task.allRemoved = true;
                task.target[symbolEventName] = null;
              }
              break;
            }
          }
        }
      }
      if (!task.allRemoved) {
        return;
      }
      return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
    };
    const customScheduleNonGlobal = function(task) {
      return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customSchedulePrepend = function(task) {
      return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
    };
    const customCancelNonGlobal = function(task) {
      return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
    };
    const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
    const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
    const compareTaskCallbackVsDelegate = function(task, delegate) {
      const typeOfDelegate = typeof delegate;
      return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
    };
    const compare = patchOptions2 && patchOptions2.diff ? patchOptions2.diff : compareTaskCallbackVsDelegate;
    const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
    const passiveEvents = _global2[zoneSymbol("PASSIVE_EVENTS")];
    const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
      return function() {
        const target = this || _global2;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        let delegate = arguments[1];
        if (!delegate) {
          return nativeListener.apply(this, arguments);
        }
        if (isNode && eventName === "uncaughtException") {
          return nativeListener.apply(this, arguments);
        }
        let isHandleEvent = false;
        if (typeof delegate !== "function") {
          if (!delegate.handleEvent) {
            return nativeListener.apply(this, arguments);
          }
          isHandleEvent = true;
        }
        if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
          return;
        }
        const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
        const options = buildEventListenerOptions(arguments[2], passive);
        const signal = options?.signal;
        if (signal?.aborted) {
          return;
        }
        if (unpatchedEvents) {
          for (let i = 0; i < unpatchedEvents.length; i++) {
            if (eventName === unpatchedEvents[i]) {
              if (passive) {
                return nativeListener.call(target, eventName, delegate, options);
              } else {
                return nativeListener.apply(this, arguments);
              }
            }
          }
        }
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const once = options && typeof options === "object" ? options.once : false;
        const zone = Zone.current;
        let symbolEventNames = zoneSymbolEventNames[eventName];
        if (!symbolEventNames) {
          prepareEventNames(eventName, eventNameToString);
          symbolEventNames = zoneSymbolEventNames[eventName];
        }
        const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        let existingTasks = target[symbolEventName];
        let isExisting = false;
        if (existingTasks) {
          isExisting = true;
          if (checkDuplicate) {
            for (let i = 0; i < existingTasks.length; i++) {
              if (compare(existingTasks[i], delegate)) {
                return;
              }
            }
          }
        } else {
          existingTasks = target[symbolEventName] = [];
        }
        let source;
        const constructorName = target.constructor["name"];
        const targetSource = globalSources[constructorName];
        if (targetSource) {
          source = targetSource[eventName];
        }
        if (!source) {
          source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
        }
        taskData.options = options;
        if (once) {
          taskData.options.once = false;
        }
        taskData.target = target;
        taskData.capture = capture;
        taskData.eventName = eventName;
        taskData.isExisting = isExisting;
        const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
        if (data) {
          data.taskData = taskData;
        }
        if (signal) {
          taskData.options.signal = void 0;
        }
        const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
        if (signal) {
          taskData.options.signal = signal;
          const onAbort = () => task.zone.cancelTask(task);
          nativeListener.call(signal, "abort", onAbort, { once: true });
          if (data) {
            data.removeAbortListener = () => signal.removeEventListener("abort", onAbort);
          }
        }
        taskData.target = null;
        if (data) {
          data.taskData = null;
        }
        if (once) {
          options.once = true;
        }
        if (!(!passiveSupported && typeof task.options === "boolean")) {
          task.options = options;
        }
        task.target = target;
        task.capture = capture;
        task.eventName = eventName;
        if (isHandleEvent) {
          task.originalDelegate = delegate;
        }
        if (!prepend) {
          existingTasks.push(task);
        } else {
          existingTasks.unshift(task);
        }
        if (returnTarget2) {
          return target;
        }
      };
    };
    proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
    if (nativePrependEventListener) {
      proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
    }
    proto[REMOVE_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const options = arguments[2];
      const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
      const delegate = arguments[1];
      if (!delegate) {
        return nativeRemoveEventListener.apply(this, arguments);
      }
      if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
        return;
      }
      const symbolEventNames = zoneSymbolEventNames[eventName];
      let symbolEventName;
      if (symbolEventNames) {
        symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
      }
      const existingTasks = symbolEventName && target[symbolEventName];
      if (existingTasks) {
        for (let i = 0; i < existingTasks.length; i++) {
          const existingTask = existingTasks[i];
          if (compare(existingTask, delegate)) {
            existingTasks.splice(i, 1);
            existingTask.isRemoved = true;
            if (existingTasks.length === 0) {
              existingTask.allRemoved = true;
              target[symbolEventName] = null;
              if (!capture && typeof eventName === "string") {
                const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                target[onPropertySymbol] = null;
              }
            }
            const taskData2 = existingTask.data;
            if (taskData2?.removeAbortListener) {
              taskData2.removeAbortListener();
              taskData2.removeAbortListener = null;
            }
            existingTask.zone.cancelTask(existingTask);
            if (returnTarget) {
              return target;
            }
            return;
          }
        }
      }
      return nativeRemoveEventListener.apply(this, arguments);
    };
    proto[LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (patchOptions2 && patchOptions2.transferEventName) {
        eventName = patchOptions2.transferEventName(eventName);
      }
      const listeners = [];
      const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
        listeners.push(delegate);
      }
      return listeners;
    };
    proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
      const target = this || _global2;
      let eventName = arguments[0];
      if (!eventName) {
        const keys = Object.keys(target);
        for (let i = 0; i < keys.length; i++) {
          const prop = keys[i];
          const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
          let evtName = match && match[1];
          if (evtName && evtName !== "removeListener") {
            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
          }
        }
        this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
      } else {
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const symbolEventNames = zoneSymbolEventNames[eventName];
        if (symbolEventNames) {
          const symbolEventName = symbolEventNames[FALSE_STR];
          const symbolCaptureEventName = symbolEventNames[TRUE_STR];
          const tasks = target[symbolEventName];
          const captureTasks = target[symbolCaptureEventName];
          if (tasks) {
            const removeTasks = tasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
          if (captureTasks) {
            const removeTasks = captureTasks.slice();
            for (let i = 0; i < removeTasks.length; i++) {
              const task = removeTasks[i];
              let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
              this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
            }
          }
        }
      }
      if (returnTarget) {
        return this;
      }
    };
    attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
    attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
    if (nativeRemoveAllListeners) {
      attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
    }
    if (nativeListeners) {
      attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
    }
    return true;
  }
  let results = [];
  for (let i = 0; i < apis.length; i++) {
    results[i] = patchEventTargetMethods(apis[i], patchOptions);
  }
  return results;
}
function findEventTasks(target, eventName) {
  if (!eventName) {
    const foundTasks = [];
    for (let prop in target) {
      const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
      let evtName = match && match[1];
      if (evtName && (!eventName || evtName === eventName)) {
        const tasks = target[prop];
        if (tasks) {
          for (let i = 0; i < tasks.length; i++) {
            foundTasks.push(tasks[i]);
          }
        }
      }
    }
    return foundTasks;
  }
  let symbolEventName = zoneSymbolEventNames[eventName];
  if (!symbolEventName) {
    prepareEventNames(eventName);
    symbolEventName = zoneSymbolEventNames[eventName];
  }
  const captureFalseTasks = target[symbolEventName[FALSE_STR]];
  const captureTrueTasks = target[symbolEventName[TRUE_STR]];
  if (!captureFalseTasks) {
    return captureTrueTasks ? captureTrueTasks.slice() : [];
  } else {
    return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
  }
}
function patchEventPrototype(global2, api) {
  const Event = global2["Event"];
  if (Event && Event.prototype) {
    api.patchMethod(Event.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
      self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
      delegate && delegate.apply(self2, args);
    });
  }
}
function patchQueueMicrotask(global2, api) {
  api.patchMethod(global2, "queueMicrotask", (delegate) => {
    return function(self2, args) {
      Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
    };
  });
}
var taskSymbol = zoneSymbol("zoneTask");
function patchTimer(window2, setName, cancelName, nameSuffix) {
  let setNative = null;
  let clearNative = null;
  setName += nameSuffix;
  cancelName += nameSuffix;
  const tasksByHandleId = {};
  function scheduleTask(task) {
    const data = task.data;
    data.args[0] = function() {
      return task.invoke.apply(this, arguments);
    };
    data.handleId = setNative.apply(window2, data.args);
    return task;
  }
  function clearTask(task) {
    return clearNative.call(window2, task.data.handleId);
  }
  setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
    if (typeof args[0] === "function") {
      const options = {
        isPeriodic: nameSuffix === "Interval",
        delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
        args
      };
      const callback = args[0];
      args[0] = function timer() {
        try {
          return callback.apply(this, arguments);
        } finally {
          if (!options.isPeriodic) {
            if (typeof options.handleId === "number") {
              delete tasksByHandleId[options.handleId];
            } else if (options.handleId) {
              options.handleId[taskSymbol] = null;
            }
          }
        }
      };
      const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
      if (!task) {
        return task;
      }
      const handle = task.data.handleId;
      if (typeof handle === "number") {
        tasksByHandleId[handle] = task;
      } else if (handle) {
        handle[taskSymbol] = task;
      }
      if (handle && handle.ref && handle.unref && typeof handle.ref === "function" && typeof handle.unref === "function") {
        task.ref = handle.ref.bind(handle);
        task.unref = handle.unref.bind(handle);
      }
      if (typeof handle === "number" || handle) {
        return handle;
      }
      return task;
    } else {
      return delegate.apply(window2, args);
    }
  });
  clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
    const id = args[0];
    let task;
    if (typeof id === "number") {
      task = tasksByHandleId[id];
    } else {
      task = id && id[taskSymbol];
      if (!task) {
        task = id;
      }
    }
    if (task && typeof task.type === "string") {
      if (task.state !== "notScheduled" && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
        if (typeof id === "number") {
          delete tasksByHandleId[id];
        } else if (id) {
          id[taskSymbol] = null;
        }
        task.zone.cancelTask(task);
      }
    } else {
      delegate.apply(window2, args);
    }
  });
}
function patchCustomElements(_global2, api) {
  const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
  if (!isBrowser2 && !isMix2 || !_global2["customElements"] || !("customElements" in _global2)) {
    return;
  }
  const callbacks = [
    "connectedCallback",
    "disconnectedCallback",
    "adoptedCallback",
    "attributeChangedCallback",
    "formAssociatedCallback",
    "formDisabledCallback",
    "formResetCallback",
    "formStateRestoreCallback"
  ];
  api.patchCallbacks(api, _global2.customElements, "customElements", "define", callbacks);
}
function eventTargetPatch(_global2, api) {
  if (Zone[api.symbol("patchEventTarget")]) {
    return;
  }
  const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
  for (let i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    const falseEventName = eventName + FALSE_STR2;
    const trueEventName = eventName + TRUE_STR2;
    const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
    zoneSymbolEventNames2[eventName] = {};
    zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol;
    zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
  }
  const EVENT_TARGET = _global2["EventTarget"];
  if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
    return;
  }
  api.patchEventTarget(_global2, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
  return true;
}
function patchEvent(global2, api) {
  api.patchEventPrototype(global2, api);
}
function filterProperties(target, onProperties, ignoreProperties) {
  if (!ignoreProperties || ignoreProperties.length === 0) {
    return onProperties;
  }
  const tip = ignoreProperties.filter((ip) => ip.target === target);
  if (!tip || tip.length === 0) {
    return onProperties;
  }
  const targetIgnoreProperties = tip[0].ignoreProperties;
  return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
}
function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
  if (!target) {
    return;
  }
  const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
  patchOnProperties(target, filteredProperties, prototype);
}
function getOnEventNames(target) {
  return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
}
function propertyDescriptorPatch(api, _global2) {
  if (isNode && !isMix) {
    return;
  }
  if (Zone[api.symbol("patchEvents")]) {
    return;
  }
  const ignoreProperties = _global2["__Zone_ignore_on_properties"];
  let patchTargets = [];
  if (isBrowser) {
    const internalWindow2 = window;
    patchTargets = patchTargets.concat([
      "Document",
      "SVGElement",
      "Element",
      "HTMLElement",
      "HTMLBodyElement",
      "HTMLMediaElement",
      "HTMLFrameSetElement",
      "HTMLFrameElement",
      "HTMLIFrameElement",
      "HTMLMarqueeElement",
      "Worker"
    ]);
    const ignoreErrorProperties = isIE() ? [{ target: internalWindow2, ignoreProperties: ["error"] }] : [];
    patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
  }
  patchTargets = patchTargets.concat([
    "XMLHttpRequest",
    "XMLHttpRequestEventTarget",
    "IDBIndex",
    "IDBRequest",
    "IDBOpenDBRequest",
    "IDBDatabase",
    "IDBTransaction",
    "IDBCursor",
    "WebSocket"
  ]);
  for (let i = 0; i < patchTargets.length; i++) {
    const target = _global2[patchTargets[i]];
    target && target.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
  }
}
function patchBrowser(Zone2) {
  Zone2.__load_patch("legacy", (global2) => {
    const legacyPatch = global2[Zone2.__symbol__("legacyPatch")];
    if (legacyPatch) {
      legacyPatch();
    }
  });
  Zone2.__load_patch("timers", (global2) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global2, set, clear, "Timeout");
    patchTimer(global2, set, clear, "Interval");
    patchTimer(global2, set, clear, "Immediate");
  });
  Zone2.__load_patch("requestAnimationFrame", (global2) => {
    patchTimer(global2, "request", "cancel", "AnimationFrame");
    patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone2.__load_patch("blocking", (global2, Zone3) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global2, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone3.current.run(delegate, global2, args, name2);
        };
      });
    }
  });
  Zone2.__load_patch("EventTarget", (global2, Zone3, api) => {
    patchEvent(global2, api);
    eventTargetPatch(global2, api);
    const XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global2, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone2.__load_patch("MutationObserver", (global2, Zone3, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone2.__load_patch("IntersectionObserver", (global2, Zone3, api) => {
    patchClass("IntersectionObserver");
  });
  Zone2.__load_patch("FileReader", (global2, Zone3, api) => {
    patchClass("FileReader");
  });
  Zone2.__load_patch("on_property", (global2, Zone3, api) => {
    propertyDescriptorPatch(api, global2);
  });
  Zone2.__load_patch("customElements", (global2, Zone3, api) => {
    patchCustomElements(global2, api);
  });
  Zone2.__load_patch("XHR", (global2, Zone3) => {
    patchXHR(global2);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest = window2["XMLHttpRequest"];
      if (!XMLHttpRequest) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone3.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone3.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone3.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = {
            target: self2,
            url: self2[XHR_URL],
            isPeriodic: false,
            args,
            aborted: false
          };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone3.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone2.__load_patch("geolocation", (global2) => {
    if (global2["navigator"] && global2["navigator"].geolocation) {
      patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone2.__load_patch("PromiseRejectionEvent", (global2, Zone3) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global2, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global2["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, {
              promise: e.promise,
              reason: e.rejection
            });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global2["PromiseRejectionEvent"]) {
      Zone3[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone3[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone2.__load_patch("queueMicrotask", (global2, Zone3, api) => {
    patchQueueMicrotask(global2, api);
  });
}
function patchPromise(Zone2) {
  Zone2.__load_patch("ZoneAwarePromise", (global2, Zone3, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__2 = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global2[__symbol__2("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__2("Promise");
    const symbolThen = __symbol__2("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__2("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone3[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && value.then;
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__2("state");
    const symbolValue = __symbol__2("value");
    const symbolFinally = __symbol__2("finally");
    const symbolParentPromiseValue = __symbol__2("parentPromiseValue");
    const symbolParentPromiseState = __symbol__2("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__2("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace = Zone3.currentTask && Zone3.currentTask.data && Zone3.currentTask.data[creationTrace];
            if (trace) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, {
                configurable: true,
                enumerable: false,
                writable: true,
                value: trace
              });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone3.current;
            uncaughtPromiseError.task = Zone3.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__2("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone3[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global2.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone3.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global2[symbolPromise] = global2["Promise"];
    global2["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__2("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      patchMethod(global2, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone3.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
}
function patchToString(Zone2) {
  Zone2.__load_patch("toString", (global2) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global2[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global2[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
}
function patchCallbacks(api, target, targetName, method, callbacks) {
  const symbol = Zone.__symbol__(method);
  if (target[symbol]) {
    return;
  }
  const nativeDelegate = target[symbol] = target[method];
  target[method] = function(name, opts, options) {
    if (opts && opts.prototype) {
      callbacks.forEach(function(callback) {
        const source = `${targetName}.${method}::` + callback;
        const prototype = opts.prototype;
        try {
          if (prototype.hasOwnProperty(callback)) {
            const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
            if (descriptor && descriptor.value) {
              descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
              api._redefineProperty(opts.prototype, callback, descriptor);
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } else if (prototype[callback]) {
            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
          }
        } catch {
        }
      });
    }
    return nativeDelegate.call(target, name, opts, options);
  };
  api.attachOriginToPatched(target[method], nativeDelegate);
}
function patchUtil(Zone2) {
  Zone2.__load_patch("util", (global2, Zone3, api) => {
    const eventNames = getOnEventNames(global2);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone3.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone3.__symbol__("UNPATCHED_EVENTS");
    if (global2[SYMBOL_UNPATCHED_EVENTS]) {
      global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone3[SYMBOL_BLACK_LISTED_EVENTS] = Zone3[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames,
      eventNames,
      isBrowser,
      isMix,
      isNode,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
}
function patchCommon(Zone2) {
  patchPromise(Zone2);
  patchToString(Zone2);
  patchUtil(Zone2);
}
var Zone$1 = loadZone();
patchCommon(Zone$1);
patchBrowser(Zone$1);
/*! Bundled license information:

zone.js/fesm2015/zone.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/


//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy96b25lLmpzL2Zlc20yMDE1L3pvbmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFyIHY8dW5rbm93bj5cbiAqIChjKSAyMDEwLTIwMjQgR29vZ2xlIExMQy4gaHR0cHM6Ly9hbmd1bGFyLmlvL1xuICogTGljZW5zZTogTUlUXG4gKi9cbmNvbnN0IGdsb2JhbCA9IGdsb2JhbFRoaXM7XG4vLyBfX1pvbmVfc3ltYm9sX3ByZWZpeCBnbG9iYWwgY2FuIGJlIHVzZWQgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgem9uZVxuLy8gc3ltYm9sIHByZWZpeCB3aXRoIGEgY3VzdG9tIG9uZSBpZiBuZWVkZWQuXG5mdW5jdGlvbiBfX3N5bWJvbF9fKG5hbWUpIHtcbiAgICBjb25zdCBzeW1ib2xQcmVmaXggPSBnbG9iYWxbJ19fWm9uZV9zeW1ib2xfcHJlZml4J10gfHwgJ19fem9uZV9zeW1ib2xfXyc7XG4gICAgcmV0dXJuIHN5bWJvbFByZWZpeCArIG5hbWU7XG59XG5mdW5jdGlvbiBpbml0Wm9uZSgpIHtcbiAgICBjb25zdCBwZXJmb3JtYW5jZSA9IGdsb2JhbFsncGVyZm9ybWFuY2UnXTtcbiAgICBmdW5jdGlvbiBtYXJrKG5hbWUpIHtcbiAgICAgICAgcGVyZm9ybWFuY2UgJiYgcGVyZm9ybWFuY2VbJ21hcmsnXSAmJiBwZXJmb3JtYW5jZVsnbWFyayddKG5hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwZXJmb3JtYW5jZU1lYXN1cmUobmFtZSwgbGFiZWwpIHtcbiAgICAgICAgcGVyZm9ybWFuY2UgJiYgcGVyZm9ybWFuY2VbJ21lYXN1cmUnXSAmJiBwZXJmb3JtYW5jZVsnbWVhc3VyZSddKG5hbWUsIGxhYmVsKTtcbiAgICB9XG4gICAgbWFyaygnWm9uZScpO1xuICAgIGNsYXNzIFpvbmVJbXBsIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnJlcXVpcmUtaW50ZXJuYWwtd2l0aC11bmRlcnNjb3JlXG4gICAgICAgIHN0YXRpYyB7IHRoaXMuX19zeW1ib2xfXyA9IF9fc3ltYm9sX187IH1cbiAgICAgICAgc3RhdGljIGFzc2VydFpvbmVQYXRjaGVkKCkge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFsnUHJvbWlzZSddICE9PSBwYXRjaGVzWydab25lQXdhcmVQcm9taXNlJ10pIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1pvbmUuanMgaGFzIGRldGVjdGVkIHRoYXQgWm9uZUF3YXJlUHJvbWlzZSBgKHdpbmRvd3xnbG9iYWwpLlByb21pc2VgICcgK1xuICAgICAgICAgICAgICAgICAgICAnaGFzIGJlZW4gb3ZlcndyaXR0ZW4uXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICdNb3N0IGxpa2VseSBjYXVzZSBpcyB0aGF0IGEgUHJvbWlzZSBwb2x5ZmlsbCBoYXMgYmVlbiBsb2FkZWQgJyArXG4gICAgICAgICAgICAgICAgICAgICdhZnRlciBab25lLmpzIChQb2x5ZmlsbGluZyBQcm9taXNlIGFwaSBpcyBub3QgbmVjZXNzYXJ5IHdoZW4gem9uZS5qcyBpcyBsb2FkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnSWYgeW91IG11c3QgbG9hZCBvbmUsIGRvIHNvIGJlZm9yZSBsb2FkaW5nIHpvbmUuanMuKScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXQgcm9vdCgpIHtcbiAgICAgICAgICAgIGxldCB6b25lID0gWm9uZUltcGwuY3VycmVudDtcbiAgICAgICAgICAgIHdoaWxlICh6b25lLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHpvbmUgPSB6b25lLnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB6b25lO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycmVudFpvbmVGcmFtZS56b25lO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRpYyBnZXQgY3VycmVudFRhc2soKSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJlbnRUYXNrO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpyZXF1aXJlLWludGVybmFsLXdpdGgtdW5kZXJzY29yZVxuICAgICAgICBzdGF0aWMgX19sb2FkX3BhdGNoKG5hbWUsIGZuLCBpZ25vcmVEdXBsaWNhdGUgPSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKHBhdGNoZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBgY2hlY2tEdXBsaWNhdGVgIG9wdGlvbiBpcyBkZWZpbmVkIGZyb20gZ2xvYmFsIHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgLy8gc28gaXQgd29ya3MgZm9yIGFsbCBtb2R1bGVzLlxuICAgICAgICAgICAgICAgIC8vIGBpZ25vcmVEdXBsaWNhdGVgIGNhbiB3b3JrIGZvciB0aGUgc3BlY2lmaWVkIG1vZHVsZVxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZ2xvYmFsW19fc3ltYm9sX18oJ2ZvcmNlRHVwbGljYXRlWm9uZUNoZWNrJyldID09PSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmICghaWdub3JlRHVwbGljYXRlICYmIGNoZWNrRHVwbGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdBbHJlYWR5IGxvYWRlZCBwYXRjaDogJyArIG5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFnbG9iYWxbJ19fWm9uZV9kaXNhYmxlXycgKyBuYW1lXSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmZOYW1lID0gJ1pvbmU6JyArIG5hbWU7XG4gICAgICAgICAgICAgICAgbWFyayhwZXJmTmFtZSk7XG4gICAgICAgICAgICAgICAgcGF0Y2hlc1tuYW1lXSA9IGZuKGdsb2JhbCwgWm9uZUltcGwsIF9hcGkpO1xuICAgICAgICAgICAgICAgIHBlcmZvcm1hbmNlTWVhc3VyZShwZXJmTmFtZSwgcGVyZk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdldCBwYXJlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGdldCBuYW1lKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3RydWN0b3IocGFyZW50LCB6b25lU3BlYykge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHpvbmVTcGVjID8gem9uZVNwZWMubmFtZSB8fCAndW5uYW1lZCcgOiAnPHJvb3Q+JztcbiAgICAgICAgICAgIHRoaXMuX3Byb3BlcnRpZXMgPSAoem9uZVNwZWMgJiYgem9uZVNwZWMucHJvcGVydGllcykgfHwge307XG4gICAgICAgICAgICB0aGlzLl96b25lRGVsZWdhdGUgPSBuZXcgX1pvbmVEZWxlZ2F0ZSh0aGlzLCB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50Ll96b25lRGVsZWdhdGUsIHpvbmVTcGVjKTtcbiAgICAgICAgfVxuICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgICBjb25zdCB6b25lID0gdGhpcy5nZXRab25lV2l0aChrZXkpO1xuICAgICAgICAgICAgaWYgKHpvbmUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHpvbmUuX3Byb3BlcnRpZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBnZXRab25lV2l0aChrZXkpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQuX3Byb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQuX3BhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvcmsoem9uZVNwZWMpIHtcbiAgICAgICAgICAgIGlmICghem9uZVNwZWMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdab25lU3BlYyByZXF1aXJlZCEnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lRGVsZWdhdGUuZm9yayh0aGlzLCB6b25lU3BlYyk7XG4gICAgICAgIH1cbiAgICAgICAgd3JhcChjYWxsYmFjaywgc291cmNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RpbmcgZnVuY3Rpb24gZ290OiAnICsgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgX2NhbGxiYWNrID0gdGhpcy5fem9uZURlbGVnYXRlLmludGVyY2VwdCh0aGlzLCBjYWxsYmFjaywgc291cmNlKTtcbiAgICAgICAgICAgIGNvbnN0IHpvbmUgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gem9uZS5ydW5HdWFyZGVkKF9jYWxsYmFjaywgdGhpcywgYXJndW1lbnRzLCBzb3VyY2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBydW4oY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpIHtcbiAgICAgICAgICAgIF9jdXJyZW50Wm9uZUZyYW1lID0geyBwYXJlbnQ6IF9jdXJyZW50Wm9uZUZyYW1lLCB6b25lOiB0aGlzIH07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lRGVsZWdhdGUuaW52b2tlKHRoaXMsIGNhbGxiYWNrLCBhcHBseVRoaXMsIGFwcGx5QXJncywgc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIF9jdXJyZW50Wm9uZUZyYW1lID0gX2N1cnJlbnRab25lRnJhbWUucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJ1bkd1YXJkZWQoY2FsbGJhY2ssIGFwcGx5VGhpcyA9IG51bGwsIGFwcGx5QXJncywgc291cmNlKSB7XG4gICAgICAgICAgICBfY3VycmVudFpvbmVGcmFtZSA9IHsgcGFyZW50OiBfY3VycmVudFpvbmVGcmFtZSwgem9uZTogdGhpcyB9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZURlbGVnYXRlLmludm9rZSh0aGlzLCBjYWxsYmFjaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MsIHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fem9uZURlbGVnYXRlLmhhbmRsZUVycm9yKHRoaXMsIGVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBfY3VycmVudFpvbmVGcmFtZSA9IF9jdXJyZW50Wm9uZUZyYW1lLnBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBydW5UYXNrKHRhc2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzKSB7XG4gICAgICAgICAgICBpZiAodGFzay56b25lICE9IHRoaXMpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgdGFzayBjYW4gb25seSBiZSBydW4gaW4gdGhlIHpvbmUgb2YgY3JlYXRpb24hIChDcmVhdGlvbjogJyArXG4gICAgICAgICAgICAgICAgICAgICh0YXNrLnpvbmUgfHwgTk9fWk9ORSkubmFtZSArXG4gICAgICAgICAgICAgICAgICAgICc7IEV4ZWN1dGlvbjogJyArXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZSArXG4gICAgICAgICAgICAgICAgICAgICcpJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci96b25lLmpzL2lzc3Vlcy83NzgsIHNvbWV0aW1lcyBldmVudFRhc2tcbiAgICAgICAgICAgIC8vIHdpbGwgcnVuIGluIG5vdFNjaGVkdWxlZChjYW5jZWxlZCkgc3RhdGUsIHdlIHNob3VsZCBub3QgdHJ5IHRvXG4gICAgICAgICAgICAvLyBydW4gc3VjaCBraW5kIG9mIHRhc2sgYnV0IGp1c3QgcmV0dXJuXG4gICAgICAgICAgICBpZiAodGFzay5zdGF0ZSA9PT0gbm90U2NoZWR1bGVkICYmICh0YXNrLnR5cGUgPT09IGV2ZW50VGFzayB8fCB0YXNrLnR5cGUgPT09IG1hY3JvVGFzaykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZUVudHJ5R3VhcmQgPSB0YXNrLnN0YXRlICE9IHJ1bm5pbmc7XG4gICAgICAgICAgICByZUVudHJ5R3VhcmQgJiYgdGFzay5fdHJhbnNpdGlvblRvKHJ1bm5pbmcsIHNjaGVkdWxlZCk7XG4gICAgICAgICAgICB0YXNrLnJ1bkNvdW50Kys7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1Rhc2sgPSBfY3VycmVudFRhc2s7XG4gICAgICAgICAgICBfY3VycmVudFRhc2sgPSB0YXNrO1xuICAgICAgICAgICAgX2N1cnJlbnRab25lRnJhbWUgPSB7IHBhcmVudDogX2N1cnJlbnRab25lRnJhbWUsIHpvbmU6IHRoaXMgfTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2sudHlwZSA9PSBtYWNyb1Rhc2sgJiYgdGFzay5kYXRhICYmICF0YXNrLmRhdGEuaXNQZXJpb2RpYykge1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNhbmNlbEZuID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fem9uZURlbGVnYXRlLmludm9rZVRhc2sodGhpcywgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3pvbmVEZWxlZ2F0ZS5oYW5kbGVFcnJvcih0aGlzLCBlcnJvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHRhc2sncyBzdGF0ZSBpcyBub3RTY2hlZHVsZWQgb3IgdW5rbm93biwgdGhlbiBpdCBoYXMgYWxyZWFkeSBiZWVuIGNhbmNlbGxlZFxuICAgICAgICAgICAgICAgIC8vIHdlIHNob3VsZCBub3QgcmVzZXQgdGhlIHN0YXRlIHRvIHNjaGVkdWxlZFxuICAgICAgICAgICAgICAgIGlmICh0YXNrLnN0YXRlICE9PSBub3RTY2hlZHVsZWQgJiYgdGFzay5zdGF0ZSAhPT0gdW5rbm93bikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFzay50eXBlID09IGV2ZW50VGFzayB8fCAodGFzay5kYXRhICYmIHRhc2suZGF0YS5pc1BlcmlvZGljKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVFbnRyeUd1YXJkICYmIHRhc2suX3RyYW5zaXRpb25UbyhzY2hlZHVsZWQsIHJ1bm5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5ydW5Db3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVUYXNrQ291bnQodGFzaywgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVFbnRyeUd1YXJkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5fdHJhbnNpdGlvblRvKG5vdFNjaGVkdWxlZCwgcnVubmluZywgbm90U2NoZWR1bGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfY3VycmVudFpvbmVGcmFtZSA9IF9jdXJyZW50Wm9uZUZyYW1lLnBhcmVudDtcbiAgICAgICAgICAgICAgICBfY3VycmVudFRhc2sgPSBwcmV2aW91c1Rhc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2NoZWR1bGVUYXNrKHRhc2spIHtcbiAgICAgICAgICAgIGlmICh0YXNrLnpvbmUgJiYgdGFzay56b25lICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHRhc2sgd2FzIHJlc2NoZWR1bGVkLCB0aGUgbmV3Wm9uZVxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBub3QgYmUgdGhlIGNoaWxkcmVuIG9mIHRoZSBvcmlnaW5hbCB6b25lXG4gICAgICAgICAgICAgICAgbGV0IG5ld1pvbmUgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHdoaWxlIChuZXdab25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdab25lID09PSB0YXNrLnpvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGBjYW4gbm90IHJlc2NoZWR1bGUgdGFzayB0byAke3RoaXMubmFtZX0gd2hpY2ggaXMgZGVzY2VuZGFudHMgb2YgdGhlIG9yaWdpbmFsIHpvbmUgJHt0YXNrLnpvbmUubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdab25lID0gbmV3Wm9uZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFzay5fdHJhbnNpdGlvblRvKHNjaGVkdWxpbmcsIG5vdFNjaGVkdWxlZCk7XG4gICAgICAgICAgICBjb25zdCB6b25lRGVsZWdhdGVzID0gW107XG4gICAgICAgICAgICB0YXNrLl96b25lRGVsZWdhdGVzID0gem9uZURlbGVnYXRlcztcbiAgICAgICAgICAgIHRhc2suX3pvbmUgPSB0aGlzO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0YXNrID0gdGhpcy5fem9uZURlbGVnYXRlLnNjaGVkdWxlVGFzayh0aGlzLCB0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyBzaG91bGQgc2V0IHRhc2sncyBzdGF0ZSB0byB1bmtub3duIHdoZW4gc2NoZWR1bGVUYXNrIHRocm93IGVycm9yXG4gICAgICAgICAgICAgICAgLy8gYmVjYXVzZSB0aGUgZXJyIG1heSBmcm9tIHJlc2NoZWR1bGUsIHNvIHRoZSBmcm9tU3RhdGUgbWF5YmUgbm90U2NoZWR1bGVkXG4gICAgICAgICAgICAgICAgdGFzay5fdHJhbnNpdGlvblRvKHVua25vd24sIHNjaGVkdWxpbmcsIG5vdFNjaGVkdWxlZCk7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogQEppYUxpUGFzc2lvbiwgc2hvdWxkIHdlIGNoZWNrIHRoZSByZXN1bHQgZnJvbSBoYW5kbGVFcnJvcj9cbiAgICAgICAgICAgICAgICB0aGlzLl96b25lRGVsZWdhdGUuaGFuZGxlRXJyb3IodGhpcywgZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFzay5fem9uZURlbGVnYXRlcyA9PT0gem9uZURlbGVnYXRlcykge1xuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gY2hlY2sgYmVjYXVzZSBpbnRlcm5hbGx5IHRoZSBkZWxlZ2F0ZSBjYW4gcmVzY2hlZHVsZSB0aGUgdGFzay5cbiAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVUYXNrQ291bnQodGFzaywgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGFzay5zdGF0ZSA9PSBzY2hlZHVsaW5nKSB7XG4gICAgICAgICAgICAgICAgdGFzay5fdHJhbnNpdGlvblRvKHNjaGVkdWxlZCwgc2NoZWR1bGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFzaztcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZU1pY3JvVGFzayhzb3VyY2UsIGNhbGxiYWNrLCBkYXRhLCBjdXN0b21TY2hlZHVsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVUYXNrKG5ldyBab25lVGFzayhtaWNyb1Rhc2ssIHNvdXJjZSwgY2FsbGJhY2ssIGRhdGEsIGN1c3RvbVNjaGVkdWxlLCB1bmRlZmluZWQpKTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlZHVsZU1hY3JvVGFzayhzb3VyY2UsIGNhbGxiYWNrLCBkYXRhLCBjdXN0b21TY2hlZHVsZSwgY3VzdG9tQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZVRhc2sobmV3IFpvbmVUYXNrKG1hY3JvVGFzaywgc291cmNlLCBjYWxsYmFjaywgZGF0YSwgY3VzdG9tU2NoZWR1bGUsIGN1c3RvbUNhbmNlbCkpO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlRXZlbnRUYXNrKHNvdXJjZSwgY2FsbGJhY2ssIGRhdGEsIGN1c3RvbVNjaGVkdWxlLCBjdXN0b21DYW5jZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjaGVkdWxlVGFzayhuZXcgWm9uZVRhc2soZXZlbnRUYXNrLCBzb3VyY2UsIGNhbGxiYWNrLCBkYXRhLCBjdXN0b21TY2hlZHVsZSwgY3VzdG9tQ2FuY2VsKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FuY2VsVGFzayh0YXNrKSB7XG4gICAgICAgICAgICBpZiAodGFzay56b25lICE9IHRoaXMpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIHRhc2sgY2FuIG9ubHkgYmUgY2FuY2VsbGVkIGluIHRoZSB6b25lIG9mIGNyZWF0aW9uISAoQ3JlYXRpb246ICcgK1xuICAgICAgICAgICAgICAgICAgICAodGFzay56b25lIHx8IE5PX1pPTkUpLm5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnOyBFeGVjdXRpb246ICcgK1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAnKScpO1xuICAgICAgICAgICAgaWYgKHRhc2suc3RhdGUgIT09IHNjaGVkdWxlZCAmJiB0YXNrLnN0YXRlICE9PSBydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFzay5fdHJhbnNpdGlvblRvKGNhbmNlbGluZywgc2NoZWR1bGVkLCBydW5uaW5nKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fem9uZURlbGVnYXRlLmNhbmNlbFRhc2sodGhpcywgdGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgZXJyb3Igb2NjdXJzIHdoZW4gY2FuY2VsVGFzaywgdHJhbnNpdCB0aGUgc3RhdGUgdG8gdW5rbm93blxuICAgICAgICAgICAgICAgIHRhc2suX3RyYW5zaXRpb25Ubyh1bmtub3duLCBjYW5jZWxpbmcpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3pvbmVEZWxlZ2F0ZS5oYW5kbGVFcnJvcih0aGlzLCBlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVRhc2tDb3VudCh0YXNrLCAtMSk7XG4gICAgICAgICAgICB0YXNrLl90cmFuc2l0aW9uVG8obm90U2NoZWR1bGVkLCBjYW5jZWxpbmcpO1xuICAgICAgICAgICAgdGFzay5ydW5Db3VudCA9IDA7XG4gICAgICAgICAgICByZXR1cm4gdGFzaztcbiAgICAgICAgfVxuICAgICAgICBfdXBkYXRlVGFza0NvdW50KHRhc2ssIGNvdW50KSB7XG4gICAgICAgICAgICBjb25zdCB6b25lRGVsZWdhdGVzID0gdGFzay5fem9uZURlbGVnYXRlcztcbiAgICAgICAgICAgIGlmIChjb3VudCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRhc2suX3pvbmVEZWxlZ2F0ZXMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB6b25lRGVsZWdhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgem9uZURlbGVnYXRlc1tpXS5fdXBkYXRlVGFza0NvdW50KHRhc2sudHlwZSwgY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IERFTEVHQVRFX1pTID0ge1xuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgb25IYXNUYXNrOiAoZGVsZWdhdGUsIF8sIHRhcmdldCwgaGFzVGFza1N0YXRlKSA9PiBkZWxlZ2F0ZS5oYXNUYXNrKHRhcmdldCwgaGFzVGFza1N0YXRlKSxcbiAgICAgICAgb25TY2hlZHVsZVRhc2s6IChkZWxlZ2F0ZSwgXywgdGFyZ2V0LCB0YXNrKSA9PiBkZWxlZ2F0ZS5zY2hlZHVsZVRhc2sodGFyZ2V0LCB0YXNrKSxcbiAgICAgICAgb25JbnZva2VUYXNrOiAoZGVsZWdhdGUsIF8sIHRhcmdldCwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpID0+IGRlbGVnYXRlLmludm9rZVRhc2sodGFyZ2V0LCB0YXNrLCBhcHBseVRoaXMsIGFwcGx5QXJncyksXG4gICAgICAgIG9uQ2FuY2VsVGFzazogKGRlbGVnYXRlLCBfLCB0YXJnZXQsIHRhc2spID0+IGRlbGVnYXRlLmNhbmNlbFRhc2sodGFyZ2V0LCB0YXNrKSxcbiAgICB9O1xuICAgIGNsYXNzIF9ab25lRGVsZWdhdGUge1xuICAgICAgICBnZXQgem9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0cnVjdG9yKHpvbmUsIHBhcmVudERlbGVnYXRlLCB6b25lU3BlYykge1xuICAgICAgICAgICAgdGhpcy5fdGFza0NvdW50cyA9IHtcbiAgICAgICAgICAgICAgICAnbWljcm9UYXNrJzogMCxcbiAgICAgICAgICAgICAgICAnbWFjcm9UYXNrJzogMCxcbiAgICAgICAgICAgICAgICAnZXZlbnRUYXNrJzogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl96b25lID0gem9uZTtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudERlbGVnYXRlID0gcGFyZW50RGVsZWdhdGU7XG4gICAgICAgICAgICB0aGlzLl9mb3JrWlMgPSB6b25lU3BlYyAmJiAoem9uZVNwZWMgJiYgem9uZVNwZWMub25Gb3JrID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5fZm9ya1pTKTtcbiAgICAgICAgICAgIHRoaXMuX2ZvcmtEbGd0ID0gem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uRm9yayA/IHBhcmVudERlbGVnYXRlIDogcGFyZW50RGVsZWdhdGUuX2ZvcmtEbGd0KTtcbiAgICAgICAgICAgIHRoaXMuX2ZvcmtDdXJyWm9uZSA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uRm9yayA/IHRoaXMuX3pvbmUgOiBwYXJlbnREZWxlZ2F0ZS5fZm9ya0N1cnJab25lKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdFpTID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25JbnRlcmNlcHQgPyB6b25lU3BlYyA6IHBhcmVudERlbGVnYXRlLl9pbnRlcmNlcHRaUyk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHREbGd0ID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25JbnRlcmNlcHQgPyBwYXJlbnREZWxlZ2F0ZSA6IHBhcmVudERlbGVnYXRlLl9pbnRlcmNlcHREbGd0KTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdEN1cnJab25lID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25JbnRlcmNlcHQgPyB0aGlzLl96b25lIDogcGFyZW50RGVsZWdhdGUuX2ludGVyY2VwdEN1cnJab25lKTtcbiAgICAgICAgICAgIHRoaXMuX2ludm9rZVpTID0gem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5faW52b2tlWlMpO1xuICAgICAgICAgICAgdGhpcy5faW52b2tlRGxndCA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5faW52b2tlRGxndCk7XG4gICAgICAgICAgICB0aGlzLl9pbnZva2VDdXJyWm9uZSA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uSW52b2tlID8gdGhpcy5fem9uZSA6IHBhcmVudERlbGVnYXRlLl9pbnZva2VDdXJyWm9uZSk7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvclpTID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHpvbmVTcGVjIDogcGFyZW50RGVsZWdhdGUuX2hhbmRsZUVycm9yWlMpO1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3JEbGd0ID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHBhcmVudERlbGVnYXRlIDogcGFyZW50RGVsZWdhdGUuX2hhbmRsZUVycm9yRGxndCk7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvckN1cnJab25lID1cbiAgICAgICAgICAgICAgICB6b25lU3BlYyAmJiAoem9uZVNwZWMub25IYW5kbGVFcnJvciA/IHRoaXMuX3pvbmUgOiBwYXJlbnREZWxlZ2F0ZS5faGFuZGxlRXJyb3JDdXJyWm9uZSk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZVRhc2taUyA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gem9uZVNwZWMgOiBwYXJlbnREZWxlZ2F0ZS5fc2NoZWR1bGVUYXNrWlMpO1xuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrRGxndCA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gcGFyZW50RGVsZWdhdGUgOiBwYXJlbnREZWxlZ2F0ZS5fc2NoZWR1bGVUYXNrRGxndCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZVRhc2tDdXJyWm9uZSA9XG4gICAgICAgICAgICAgICAgem9uZVNwZWMgJiYgKHpvbmVTcGVjLm9uU2NoZWR1bGVUYXNrID8gdGhpcy5fem9uZSA6IHBhcmVudERlbGVnYXRlLl9zY2hlZHVsZVRhc2tDdXJyWm9uZSk7XG4gICAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrWlMgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkludm9rZVRhc2sgPyB6b25lU3BlYyA6IHBhcmVudERlbGVnYXRlLl9pbnZva2VUYXNrWlMpO1xuICAgICAgICAgICAgdGhpcy5faW52b2tlVGFza0RsZ3QgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkludm9rZVRhc2sgPyBwYXJlbnREZWxlZ2F0ZSA6IHBhcmVudERlbGVnYXRlLl9pbnZva2VUYXNrRGxndCk7XG4gICAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrQ3VyclpvbmUgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkludm9rZVRhc2sgPyB0aGlzLl96b25lIDogcGFyZW50RGVsZWdhdGUuX2ludm9rZVRhc2tDdXJyWm9uZSk7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxUYXNrWlMgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyB6b25lU3BlYyA6IHBhcmVudERlbGVnYXRlLl9jYW5jZWxUYXNrWlMpO1xuICAgICAgICAgICAgdGhpcy5fY2FuY2VsVGFza0RsZ3QgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyBwYXJlbnREZWxlZ2F0ZSA6IHBhcmVudERlbGVnYXRlLl9jYW5jZWxUYXNrRGxndCk7XG4gICAgICAgICAgICB0aGlzLl9jYW5jZWxUYXNrQ3VyclpvbmUgPVxuICAgICAgICAgICAgICAgIHpvbmVTcGVjICYmICh6b25lU3BlYy5vbkNhbmNlbFRhc2sgPyB0aGlzLl96b25lIDogcGFyZW50RGVsZWdhdGUuX2NhbmNlbFRhc2tDdXJyWm9uZSk7XG4gICAgICAgICAgICB0aGlzLl9oYXNUYXNrWlMgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5faGFzVGFza0RsZ3QgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5faGFzVGFza0RsZ3RPd25lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9oYXNUYXNrQ3VyclpvbmUgPSBudWxsO1xuICAgICAgICAgICAgY29uc3Qgem9uZVNwZWNIYXNUYXNrID0gem9uZVNwZWMgJiYgem9uZVNwZWMub25IYXNUYXNrO1xuICAgICAgICAgICAgY29uc3QgcGFyZW50SGFzVGFzayA9IHBhcmVudERlbGVnYXRlICYmIHBhcmVudERlbGVnYXRlLl9oYXNUYXNrWlM7XG4gICAgICAgICAgICBpZiAoem9uZVNwZWNIYXNUYXNrIHx8IHBhcmVudEhhc1Rhc2spIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBuZWVkIHRvIHJlcG9ydCBoYXNUYXNrLCB0aGFuIHRoaXMgWlMgbmVlZHMgdG8gZG8gcmVmIGNvdW50aW5nIG9uIHRhc2tzLiBJbiBzdWNoXG4gICAgICAgICAgICAgICAgLy8gYSBjYXNlIGFsbCB0YXNrIHJlbGF0ZWQgaW50ZXJjZXB0b3JzIG11c3QgZ28gdGhyb3VnaCB0aGlzIFpELiBXZSBjYW4ndCBzaG9ydCBjaXJjdWl0IGl0LlxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc1Rhc2taUyA9IHpvbmVTcGVjSGFzVGFzayA/IHpvbmVTcGVjIDogREVMRUdBVEVfWlM7XG4gICAgICAgICAgICAgICAgdGhpcy5faGFzVGFza0RsZ3QgPSBwYXJlbnREZWxlZ2F0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUYXNrRGxndE93bmVyID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUYXNrQ3VyclpvbmUgPSB0aGlzLl96b25lO1xuICAgICAgICAgICAgICAgIGlmICghem9uZVNwZWMub25TY2hlZHVsZVRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrWlMgPSBERUxFR0FURV9aUztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVUYXNrRGxndCA9IHBhcmVudERlbGVnYXRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZVRhc2tDdXJyWm9uZSA9IHRoaXMuX3pvbmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghem9uZVNwZWMub25JbnZva2VUYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ludm9rZVRhc2taUyA9IERFTEVHQVRFX1pTO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrRGxndCA9IHBhcmVudERlbGVnYXRlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbnZva2VUYXNrQ3VyclpvbmUgPSB0aGlzLl96b25lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXpvbmVTcGVjLm9uQ2FuY2VsVGFzaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYW5jZWxUYXNrWlMgPSBERUxFR0FURV9aUztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsVGFza0RsZ3QgPSBwYXJlbnREZWxlZ2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2FuY2VsVGFza0N1cnJab25lID0gdGhpcy5fem9uZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yayh0YXJnZXRab25lLCB6b25lU3BlYykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcmtaU1xuICAgICAgICAgICAgICAgID8gdGhpcy5fZm9ya1pTLm9uRm9yayh0aGlzLl9mb3JrRGxndCwgdGhpcy56b25lLCB0YXJnZXRab25lLCB6b25lU3BlYylcbiAgICAgICAgICAgICAgICA6IG5ldyBab25lSW1wbCh0YXJnZXRab25lLCB6b25lU3BlYyk7XG4gICAgICAgIH1cbiAgICAgICAgaW50ZXJjZXB0KHRhcmdldFpvbmUsIGNhbGxiYWNrLCBzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnRlcmNlcHRaU1xuICAgICAgICAgICAgICAgID8gdGhpcy5faW50ZXJjZXB0WlMub25JbnRlcmNlcHQodGhpcy5faW50ZXJjZXB0RGxndCwgdGhpcy5faW50ZXJjZXB0Q3VyclpvbmUsIHRhcmdldFpvbmUsIGNhbGxiYWNrLCBzb3VyY2UpXG4gICAgICAgICAgICAgICAgOiBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgICAgICBpbnZva2UodGFyZ2V0Wm9uZSwgY2FsbGJhY2ssIGFwcGx5VGhpcywgYXBwbHlBcmdzLCBzb3VyY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2VaU1xuICAgICAgICAgICAgICAgID8gdGhpcy5faW52b2tlWlMub25JbnZva2UodGhpcy5faW52b2tlRGxndCwgdGhpcy5faW52b2tlQ3VyclpvbmUsIHRhcmdldFpvbmUsIGNhbGxiYWNrLCBhcHBseVRoaXMsIGFwcGx5QXJncywgc291cmNlKVxuICAgICAgICAgICAgICAgIDogY2FsbGJhY2suYXBwbHkoYXBwbHlUaGlzLCBhcHBseUFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlRXJyb3JaU1xuICAgICAgICAgICAgICAgID8gdGhpcy5faGFuZGxlRXJyb3JaUy5vbkhhbmRsZUVycm9yKHRoaXMuX2hhbmRsZUVycm9yRGxndCwgdGhpcy5faGFuZGxlRXJyb3JDdXJyWm9uZSwgdGFyZ2V0Wm9uZSwgZXJyb3IpXG4gICAgICAgICAgICAgICAgOiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHNjaGVkdWxlVGFzayh0YXJnZXRab25lLCB0YXNrKSB7XG4gICAgICAgICAgICBsZXQgcmV0dXJuVGFzayA9IHRhc2s7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2NoZWR1bGVUYXNrWlMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faGFzVGFza1pTKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblRhc2suX3pvbmVEZWxlZ2F0ZXMucHVzaCh0aGlzLl9oYXNUYXNrRGxndE93bmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuVGFzayA9IHRoaXMuX3NjaGVkdWxlVGFza1pTLm9uU2NoZWR1bGVUYXNrKHRoaXMuX3NjaGVkdWxlVGFza0RsZ3QsIHRoaXMuX3NjaGVkdWxlVGFza0N1cnJab25lLCB0YXJnZXRab25lLCB0YXNrKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJldHVyblRhc2spXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblRhc2sgPSB0YXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhc2suc2NoZWR1bGVGbikge1xuICAgICAgICAgICAgICAgICAgICB0YXNrLnNjaGVkdWxlRm4odGFzayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhc2sudHlwZSA9PSBtaWNyb1Rhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVNaWNyb1Rhc2sodGFzayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Rhc2sgaXMgbWlzc2luZyBzY2hlZHVsZUZuLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXR1cm5UYXNrO1xuICAgICAgICB9XG4gICAgICAgIGludm9rZVRhc2sodGFyZ2V0Wm9uZSwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnZva2VUYXNrWlNcbiAgICAgICAgICAgICAgICA/IHRoaXMuX2ludm9rZVRhc2taUy5vbkludm9rZVRhc2sodGhpcy5faW52b2tlVGFza0RsZ3QsIHRoaXMuX2ludm9rZVRhc2tDdXJyWm9uZSwgdGFyZ2V0Wm9uZSwgdGFzaywgYXBwbHlUaGlzLCBhcHBseUFyZ3MpXG4gICAgICAgICAgICAgICAgOiB0YXNrLmNhbGxiYWNrLmFwcGx5KGFwcGx5VGhpcywgYXBwbHlBcmdzKTtcbiAgICAgICAgfVxuICAgICAgICBjYW5jZWxUYXNrKHRhcmdldFpvbmUsIHRhc2spIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYW5jZWxUYXNrWlMpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX2NhbmNlbFRhc2taUy5vbkNhbmNlbFRhc2sodGhpcy5fY2FuY2VsVGFza0RsZ3QsIHRoaXMuX2NhbmNlbFRhc2tDdXJyWm9uZSwgdGFyZ2V0Wm9uZSwgdGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhc2suY2FuY2VsRm4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1Rhc2sgaXMgbm90IGNhbmNlbGFibGUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0YXNrLmNhbmNlbEZuKHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGhhc1Rhc2sodGFyZ2V0Wm9uZSwgaXNFbXB0eSkge1xuICAgICAgICAgICAgLy8gaGFzVGFzayBzaG91bGQgbm90IHRocm93IGVycm9yIHNvIG90aGVyIFpvbmVEZWxlZ2F0ZVxuICAgICAgICAgICAgLy8gY2FuIHN0aWxsIHRyaWdnZXIgaGFzVGFzayBjYWxsYmFja1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNUYXNrWlMgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFzVGFza1pTLm9uSGFzVGFzayh0aGlzLl9oYXNUYXNrRGxndCwgdGhpcy5faGFzVGFza0N1cnJab25lLCB0YXJnZXRab25lLCBpc0VtcHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKHRhcmdldFpvbmUsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnJlcXVpcmUtaW50ZXJuYWwtd2l0aC11bmRlcnNjb3JlXG4gICAgICAgIF91cGRhdGVUYXNrQ291bnQodHlwZSwgY291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cyA9IHRoaXMuX3Rhc2tDb3VudHM7XG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gY291bnRzW3R5cGVdO1xuICAgICAgICAgICAgY29uc3QgbmV4dCA9IChjb3VudHNbdHlwZV0gPSBwcmV2ICsgY291bnQpO1xuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3JlIHRhc2tzIGV4ZWN1dGVkIHRoZW4gd2VyZSBzY2hlZHVsZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJldiA9PSAwIHx8IG5leHQgPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRW1wdHkgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1pY3JvVGFzazogY291bnRzWydtaWNyb1Rhc2snXSA+IDAsXG4gICAgICAgICAgICAgICAgICAgIG1hY3JvVGFzazogY291bnRzWydtYWNyb1Rhc2snXSA+IDAsXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VGFzazogY291bnRzWydldmVudFRhc2snXSA+IDAsXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZTogdHlwZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuaGFzVGFzayh0aGlzLl96b25lLCBpc0VtcHR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjbGFzcyBab25lVGFzayB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGUsIHNvdXJjZSwgY2FsbGJhY2ssIG9wdGlvbnMsIHNjaGVkdWxlRm4sIGNhbmNlbEZuKSB7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cmVxdWlyZS1pbnRlcm5hbC13aXRoLXVuZGVyc2NvcmVcbiAgICAgICAgICAgIHRoaXMuX3pvbmUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5ydW5Db3VudCA9IDA7XG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cmVxdWlyZS1pbnRlcm5hbC13aXRoLXVuZGVyc2NvcmVcbiAgICAgICAgICAgIHRoaXMuX3pvbmVEZWxlZ2F0ZXMgPSBudWxsO1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnJlcXVpcmUtaW50ZXJuYWwtd2l0aC11bmRlcnNjb3JlXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICdub3RTY2hlZHVsZWQnO1xuICAgICAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gb3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVGbiA9IHNjaGVkdWxlRm47XG4gICAgICAgICAgICB0aGlzLmNhbmNlbEZuID0gY2FuY2VsRm47XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYWxsYmFjayBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyBUT0RPOiBASmlhTGlQYXNzaW9uIG9wdGlvbnMgc2hvdWxkIGhhdmUgaW50ZXJmYWNlXG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gZXZlbnRUYXNrICYmIG9wdGlvbnMgJiYgb3B0aW9ucy51c2VHKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZva2UgPSBab25lVGFzay5pbnZva2VUYXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBab25lVGFzay5pbnZva2VUYXNrLmNhbGwoZ2xvYmFsLCBzZWxmLCB0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGljIGludm9rZVRhc2sodGFzaywgdGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgICAgICBpZiAoIXRhc2spIHtcbiAgICAgICAgICAgICAgICB0YXNrID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9udW1iZXJPZk5lc3RlZFRhc2tGcmFtZXMrKztcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGFzay5ydW5Db3VudCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXNrLnpvbmUucnVuVGFzayh0YXNrLCB0YXJnZXQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9udW1iZXJPZk5lc3RlZFRhc2tGcmFtZXMgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkcmFpbk1pY3JvVGFza1F1ZXVlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9udW1iZXJPZk5lc3RlZFRhc2tGcmFtZXMtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnZXQgem9uZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl96b25lO1xuICAgICAgICB9XG4gICAgICAgIGdldCBzdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBjYW5jZWxTY2hlZHVsZVJlcXVlc3QoKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uVG8obm90U2NoZWR1bGVkLCBzY2hlZHVsaW5nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cmVxdWlyZS1pbnRlcm5hbC13aXRoLXVuZGVyc2NvcmVcbiAgICAgICAgX3RyYW5zaXRpb25Ubyh0b1N0YXRlLCBmcm9tU3RhdGUxLCBmcm9tU3RhdGUyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUgPT09IGZyb21TdGF0ZTEgfHwgdGhpcy5fc3RhdGUgPT09IGZyb21TdGF0ZTIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHRvU3RhdGU7XG4gICAgICAgICAgICAgICAgaWYgKHRvU3RhdGUgPT0gbm90U2NoZWR1bGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3pvbmVEZWxlZ2F0ZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLnR5cGV9ICcke3RoaXMuc291cmNlfSc6IGNhbiBub3QgdHJhbnNpdGlvbiB0byAnJHt0b1N0YXRlfScsIGV4cGVjdGluZyBzdGF0ZSAnJHtmcm9tU3RhdGUxfScke2Zyb21TdGF0ZTIgPyBcIiBvciAnXCIgKyBmcm9tU3RhdGUyICsgXCInXCIgOiAnJ30sIHdhcyAnJHt0aGlzLl9zdGF0ZX0nLmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRvU3RyaW5nKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSAmJiB0eXBlb2YgdGhpcy5kYXRhLmhhbmRsZUlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuaGFuZGxlSWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkIHRvSlNPTiBtZXRob2QgdG8gcHJldmVudCBjeWNsaWMgZXJyb3Igd2hlblxuICAgICAgICAvLyBjYWxsIEpTT04uc3RyaW5naWZ5KHpvbmVUYXNrKVxuICAgICAgICB0b0pTT04oKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICAgICAgICAgIHpvbmU6IHRoaXMuem9uZS5uYW1lLFxuICAgICAgICAgICAgICAgIHJ1bkNvdW50OiB0aGlzLnJ1bkNvdW50LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8gIE1JQ1JPVEFTSyBRVUVVRVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIGNvbnN0IHN5bWJvbFNldFRpbWVvdXQgPSBfX3N5bWJvbF9fKCdzZXRUaW1lb3V0Jyk7XG4gICAgY29uc3Qgc3ltYm9sUHJvbWlzZSA9IF9fc3ltYm9sX18oJ1Byb21pc2UnKTtcbiAgICBjb25zdCBzeW1ib2xUaGVuID0gX19zeW1ib2xfXygndGhlbicpO1xuICAgIGxldCBfbWljcm9UYXNrUXVldWUgPSBbXTtcbiAgICBsZXQgX2lzRHJhaW5pbmdNaWNyb3Rhc2tRdWV1ZSA9IGZhbHNlO1xuICAgIGxldCBuYXRpdmVNaWNyb1Rhc2tRdWV1ZVByb21pc2U7XG4gICAgZnVuY3Rpb24gbmF0aXZlU2NoZWR1bGVNaWNyb1Rhc2soZnVuYykge1xuICAgICAgICBpZiAoIW5hdGl2ZU1pY3JvVGFza1F1ZXVlUHJvbWlzZSkge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFtzeW1ib2xQcm9taXNlXSkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZU1pY3JvVGFza1F1ZXVlUHJvbWlzZSA9IGdsb2JhbFtzeW1ib2xQcm9taXNlXS5yZXNvbHZlKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVNaWNyb1Rhc2tRdWV1ZVByb21pc2UpIHtcbiAgICAgICAgICAgIGxldCBuYXRpdmVUaGVuID0gbmF0aXZlTWljcm9UYXNrUXVldWVQcm9taXNlW3N5bWJvbFRoZW5dO1xuICAgICAgICAgICAgaWYgKCFuYXRpdmVUaGVuKSB7XG4gICAgICAgICAgICAgICAgLy8gbmF0aXZlIFByb21pc2UgaXMgbm90IHBhdGNoYWJsZSwgd2UgbmVlZCB0byB1c2UgYHRoZW5gIGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgLy8gaXNzdWUgMTA3OFxuICAgICAgICAgICAgICAgIG5hdGl2ZVRoZW4gPSBuYXRpdmVNaWNyb1Rhc2tRdWV1ZVByb21pc2VbJ3RoZW4nXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5hdGl2ZVRoZW4uY2FsbChuYXRpdmVNaWNyb1Rhc2tRdWV1ZVByb21pc2UsIGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsW3N5bWJvbFNldFRpbWVvdXRdKGZ1bmMsIDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlTWljcm9UYXNrKHRhc2spIHtcbiAgICAgICAgLy8gaWYgd2UgYXJlIG5vdCBydW5uaW5nIGluIGFueSB0YXNrLCBhbmQgdGhlcmUgaGFzIG5vdCBiZWVuIGFueXRoaW5nIHNjaGVkdWxlZFxuICAgICAgICAvLyB3ZSBtdXN0IGJvb3RzdHJhcCB0aGUgaW5pdGlhbCB0YXNrIGNyZWF0aW9uIGJ5IG1hbnVhbGx5IHNjaGVkdWxpbmcgdGhlIGRyYWluXG4gICAgICAgIGlmIChfbnVtYmVyT2ZOZXN0ZWRUYXNrRnJhbWVzID09PSAwICYmIF9taWNyb1Rhc2tRdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIFdlIGFyZSBub3QgcnVubmluZyBpbiBUYXNrLCBzbyB3ZSBuZWVkIHRvIGtpY2tzdGFydCB0aGUgbWljcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgbmF0aXZlU2NoZWR1bGVNaWNyb1Rhc2soZHJhaW5NaWNyb1Rhc2tRdWV1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGFzayAmJiBfbWljcm9UYXNrUXVldWUucHVzaCh0YXNrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZHJhaW5NaWNyb1Rhc2tRdWV1ZSgpIHtcbiAgICAgICAgaWYgKCFfaXNEcmFpbmluZ01pY3JvdGFza1F1ZXVlKSB7XG4gICAgICAgICAgICBfaXNEcmFpbmluZ01pY3JvdGFza1F1ZXVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHdoaWxlIChfbWljcm9UYXNrUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVldWUgPSBfbWljcm9UYXNrUXVldWU7XG4gICAgICAgICAgICAgICAgX21pY3JvVGFza1F1ZXVlID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gcXVldWVbaV07XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLnpvbmUucnVuVGFzayh0YXNrLCBudWxsLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hcGkub25VbmhhbmRsZWRFcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfYXBpLm1pY3JvdGFza0RyYWluRG9uZSgpO1xuICAgICAgICAgICAgX2lzRHJhaW5pbmdNaWNyb3Rhc2tRdWV1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLyAgQk9PVFNUUkFQXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgY29uc3QgTk9fWk9ORSA9IHsgbmFtZTogJ05PIFpPTkUnIH07XG4gICAgY29uc3Qgbm90U2NoZWR1bGVkID0gJ25vdFNjaGVkdWxlZCcsIHNjaGVkdWxpbmcgPSAnc2NoZWR1bGluZycsIHNjaGVkdWxlZCA9ICdzY2hlZHVsZWQnLCBydW5uaW5nID0gJ3J1bm5pbmcnLCBjYW5jZWxpbmcgPSAnY2FuY2VsaW5nJywgdW5rbm93biA9ICd1bmtub3duJztcbiAgICBjb25zdCBtaWNyb1Rhc2sgPSAnbWljcm9UYXNrJywgbWFjcm9UYXNrID0gJ21hY3JvVGFzaycsIGV2ZW50VGFzayA9ICdldmVudFRhc2snO1xuICAgIGNvbnN0IHBhdGNoZXMgPSB7fTtcbiAgICBjb25zdCBfYXBpID0ge1xuICAgICAgICBzeW1ib2w6IF9fc3ltYm9sX18sXG4gICAgICAgIGN1cnJlbnRab25lRnJhbWU6ICgpID0+IF9jdXJyZW50Wm9uZUZyYW1lLFxuICAgICAgICBvblVuaGFuZGxlZEVycm9yOiBub29wLFxuICAgICAgICBtaWNyb3Rhc2tEcmFpbkRvbmU6IG5vb3AsXG4gICAgICAgIHNjaGVkdWxlTWljcm9UYXNrOiBzY2hlZHVsZU1pY3JvVGFzayxcbiAgICAgICAgc2hvd1VuY2F1Z2h0RXJyb3I6ICgpID0+ICFab25lSW1wbFtfX3N5bWJvbF9fKCdpZ25vcmVDb25zb2xlRXJyb3JVbmNhdWdodEVycm9yJyldLFxuICAgICAgICBwYXRjaEV2ZW50VGFyZ2V0OiAoKSA9PiBbXSxcbiAgICAgICAgcGF0Y2hPblByb3BlcnRpZXM6IG5vb3AsXG4gICAgICAgIHBhdGNoTWV0aG9kOiAoKSA9PiBub29wLFxuICAgICAgICBiaW5kQXJndW1lbnRzOiAoKSA9PiBbXSxcbiAgICAgICAgcGF0Y2hUaGVuOiAoKSA9PiBub29wLFxuICAgICAgICBwYXRjaE1hY3JvVGFzazogKCkgPT4gbm9vcCxcbiAgICAgICAgcGF0Y2hFdmVudFByb3RvdHlwZTogKCkgPT4gbm9vcCxcbiAgICAgICAgaXNJRU9yRWRnZTogKCkgPT4gZmFsc2UsXG4gICAgICAgIGdldEdsb2JhbE9iamVjdHM6ICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICAgT2JqZWN0RGVmaW5lUHJvcGVydHk6ICgpID0+IG5vb3AsXG4gICAgICAgIE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcjogKCkgPT4gdW5kZWZpbmVkLFxuICAgICAgICBPYmplY3RDcmVhdGU6ICgpID0+IHVuZGVmaW5lZCxcbiAgICAgICAgQXJyYXlTbGljZTogKCkgPT4gW10sXG4gICAgICAgIHBhdGNoQ2xhc3M6ICgpID0+IG5vb3AsXG4gICAgICAgIHdyYXBXaXRoQ3VycmVudFpvbmU6ICgpID0+IG5vb3AsXG4gICAgICAgIGZpbHRlclByb3BlcnRpZXM6ICgpID0+IFtdLFxuICAgICAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQ6ICgpID0+IG5vb3AsXG4gICAgICAgIF9yZWRlZmluZVByb3BlcnR5OiAoKSA9PiBub29wLFxuICAgICAgICBwYXRjaENhbGxiYWNrczogKCkgPT4gbm9vcCxcbiAgICAgICAgbmF0aXZlU2NoZWR1bGVNaWNyb1Rhc2s6IG5hdGl2ZVNjaGVkdWxlTWljcm9UYXNrLFxuICAgIH07XG4gICAgbGV0IF9jdXJyZW50Wm9uZUZyYW1lID0geyBwYXJlbnQ6IG51bGwsIHpvbmU6IG5ldyBab25lSW1wbChudWxsLCBudWxsKSB9O1xuICAgIGxldCBfY3VycmVudFRhc2sgPSBudWxsO1xuICAgIGxldCBfbnVtYmVyT2ZOZXN0ZWRUYXNrRnJhbWVzID0gMDtcbiAgICBmdW5jdGlvbiBub29wKCkgeyB9XG4gICAgcGVyZm9ybWFuY2VNZWFzdXJlKCdab25lJywgJ1pvbmUnKTtcbiAgICByZXR1cm4gWm9uZUltcGw7XG59XG5cbmZ1bmN0aW9uIGxvYWRab25lKCkge1xuICAgIC8vIGlmIGdsb2JhbFsnWm9uZSddIGFscmVhZHkgZXhpc3RzIChtYXliZSB6b25lLmpzIHdhcyBhbHJlYWR5IGxvYWRlZCBvclxuICAgIC8vIHNvbWUgb3RoZXIgbGliIGFsc28gcmVnaXN0ZXJlZCBhIGdsb2JhbCBvYmplY3QgbmFtZWQgWm9uZSksIHdlIG1heSBuZWVkXG4gICAgLy8gdG8gdGhyb3cgYW4gZXJyb3IsIGJ1dCBzb21ldGltZXMgdXNlciBtYXkgbm90IHdhbnQgdGhpcyBlcnJvci5cbiAgICAvLyBGb3IgZXhhbXBsZSxcbiAgICAvLyB3ZSBoYXZlIHR3byB3ZWIgcGFnZXMsIHBhZ2UxIGluY2x1ZGVzIHpvbmUuanMsIHBhZ2UyIGRvZXNuJ3QuXG4gICAgLy8gYW5kIHRoZSAxc3QgdGltZSB1c2VyIGxvYWQgcGFnZTEgYW5kIHBhZ2UyLCBldmVyeXRoaW5nIHdvcmsgZmluZSxcbiAgICAvLyBidXQgd2hlbiB1c2VyIGxvYWQgcGFnZTIgYWdhaW4sIGVycm9yIG9jY3VycyBiZWNhdXNlIGdsb2JhbFsnWm9uZSddIGFscmVhZHkgZXhpc3RzLlxuICAgIC8vIHNvIHdlIGFkZCBhIGZsYWcgdG8gbGV0IHVzZXIgY2hvb3NlIHdoZXRoZXIgdG8gdGhyb3cgdGhpcyBlcnJvciBvciBub3QuXG4gICAgLy8gQnkgZGVmYXVsdCwgaWYgZXhpc3RpbmcgWm9uZSBpcyBmcm9tIHpvbmUuanMsIHdlIHdpbGwgbm90IHRocm93IHRoZSBlcnJvci5cbiAgICBjb25zdCBnbG9iYWwgPSBnbG9iYWxUaGlzO1xuICAgIGNvbnN0IGNoZWNrRHVwbGljYXRlID0gZ2xvYmFsW19fc3ltYm9sX18oJ2ZvcmNlRHVwbGljYXRlWm9uZUNoZWNrJyldID09PSB0cnVlO1xuICAgIGlmIChnbG9iYWxbJ1pvbmUnXSAmJiAoY2hlY2tEdXBsaWNhdGUgfHwgdHlwZW9mIGdsb2JhbFsnWm9uZSddLl9fc3ltYm9sX18gIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWm9uZSBhbHJlYWR5IGxvYWRlZC4nKTtcbiAgICB9XG4gICAgLy8gSW5pdGlhbGl6ZSBnbG9iYWwgYFpvbmVgIGNvbnN0YW50LlxuICAgIGdsb2JhbFsnWm9uZSddID8/PSBpbml0Wm9uZSgpO1xuICAgIHJldHVybiBnbG9iYWxbJ1pvbmUnXTtcbn1cblxuLyoqXG4gKiBTdXBwcmVzcyBjbG9zdXJlIGNvbXBpbGVyIGVycm9ycyBhYm91dCB1bmtub3duICdab25lJyB2YXJpYWJsZVxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHt1bmRlZmluZWRWYXJzLGdsb2JhbFRoaXMsbWlzc2luZ1JlcXVpcmV9XG4gKi9cbi8vIGlzc3VlICM5ODksIHRvIHJlZHVjZSBidW5kbGUgc2l6ZSwgdXNlIHNob3J0IG5hbWVcbi8qKiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICovXG5jb25zdCBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuLyoqIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAqL1xuY29uc3QgT2JqZWN0RGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vKiogT2JqZWN0LmdldFByb3RvdHlwZU9mICovXG5jb25zdCBPYmplY3RHZXRQcm90b3R5cGVPZiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbi8qKiBPYmplY3QuY3JlYXRlICovXG5jb25zdCBPYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuLyoqIEFycmF5LnByb3RvdHlwZS5zbGljZSAqL1xuY29uc3QgQXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbi8qKiBhZGRFdmVudExpc3RlbmVyIHN0cmluZyBjb25zdCAqL1xuY29uc3QgQUREX0VWRU5UX0xJU1RFTkVSX1NUUiA9ICdhZGRFdmVudExpc3RlbmVyJztcbi8qKiByZW1vdmVFdmVudExpc3RlbmVyIHN0cmluZyBjb25zdCAqL1xuY29uc3QgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSX1NUUiA9ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbi8qKiB6b25lU3ltYm9sIGFkZEV2ZW50TGlzdGVuZXIgKi9cbmNvbnN0IFpPTkVfU1lNQk9MX0FERF9FVkVOVF9MSVNURU5FUiA9IF9fc3ltYm9sX18oQUREX0VWRU5UX0xJU1RFTkVSX1NUUik7XG4vKiogem9uZVN5bWJvbCByZW1vdmVFdmVudExpc3RlbmVyICovXG5jb25zdCBaT05FX1NZTUJPTF9SRU1PVkVfRVZFTlRfTElTVEVORVIgPSBfX3N5bWJvbF9fKFJFTU9WRV9FVkVOVF9MSVNURU5FUl9TVFIpO1xuLyoqIHRydWUgc3RyaW5nIGNvbnN0ICovXG5jb25zdCBUUlVFX1NUUiA9ICd0cnVlJztcbi8qKiBmYWxzZSBzdHJpbmcgY29uc3QgKi9cbmNvbnN0IEZBTFNFX1NUUiA9ICdmYWxzZSc7XG4vKiogWm9uZSBzeW1ib2wgcHJlZml4IHN0cmluZyBjb25zdC4gKi9cbmNvbnN0IFpPTkVfU1lNQk9MX1BSRUZJWCA9IF9fc3ltYm9sX18oJycpO1xuZnVuY3Rpb24gd3JhcFdpdGhDdXJyZW50Wm9uZShjYWxsYmFjaywgc291cmNlKSB7XG4gICAgcmV0dXJuIFpvbmUuY3VycmVudC53cmFwKGNhbGxiYWNrLCBzb3VyY2UpO1xufVxuZnVuY3Rpb24gc2NoZWR1bGVNYWNyb1Rhc2tXaXRoQ3VycmVudFpvbmUoc291cmNlLCBjYWxsYmFjaywgZGF0YSwgY3VzdG9tU2NoZWR1bGUsIGN1c3RvbUNhbmNlbCkge1xuICAgIHJldHVybiBab25lLmN1cnJlbnQuc2NoZWR1bGVNYWNyb1Rhc2soc291cmNlLCBjYWxsYmFjaywgZGF0YSwgY3VzdG9tU2NoZWR1bGUsIGN1c3RvbUNhbmNlbCk7XG59XG5jb25zdCB6b25lU3ltYm9sID0gX19zeW1ib2xfXztcbmNvbnN0IGlzV2luZG93RXhpc3RzID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG5jb25zdCBpbnRlcm5hbFdpbmRvdyA9IGlzV2luZG93RXhpc3RzID8gd2luZG93IDogdW5kZWZpbmVkO1xuY29uc3QgX2dsb2JhbCA9IChpc1dpbmRvd0V4aXN0cyAmJiBpbnRlcm5hbFdpbmRvdykgfHwgZ2xvYmFsVGhpcztcbmNvbnN0IFJFTU9WRV9BVFRSSUJVVEUgPSAncmVtb3ZlQXR0cmlidXRlJztcbmZ1bmN0aW9uIGJpbmRBcmd1bWVudHMoYXJncywgc291cmNlKSB7XG4gICAgZm9yIChsZXQgaSA9IGFyZ3MubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzW2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzW2ldID0gd3JhcFdpdGhDdXJyZW50Wm9uZShhcmdzW2ldLCBzb3VyY2UgKyAnXycgKyBpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJncztcbn1cbmZ1bmN0aW9uIHBhdGNoUHJvdG90eXBlKHByb3RvdHlwZSwgZm5OYW1lcykge1xuICAgIGNvbnN0IHNvdXJjZSA9IHByb3RvdHlwZS5jb25zdHJ1Y3RvclsnbmFtZSddO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm5OYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gZm5OYW1lc1tpXTtcbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSBwcm90b3R5cGVbbmFtZV07XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgY29uc3QgcHJvdG90eXBlRGVzYyA9IE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90b3R5cGUsIG5hbWUpO1xuICAgICAgICAgICAgaWYgKCFpc1Byb3BlcnR5V3JpdGFibGUocHJvdG90eXBlRGVzYykpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb3RvdHlwZVtuYW1lXSA9ICgoZGVsZWdhdGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRjaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkodGhpcywgYmluZEFyZ3VtZW50cyhhcmd1bWVudHMsIHNvdXJjZSArICcuJyArIG5hbWUpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwYXRjaGVkLCBkZWxlZ2F0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGNoZWQ7XG4gICAgICAgICAgICB9KShkZWxlZ2F0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpc1Byb3BlcnR5V3JpdGFibGUocHJvcGVydHlEZXNjKSB7XG4gICAgaWYgKCFwcm9wZXJ0eURlc2MpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0eURlc2Mud3JpdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuICEodHlwZW9mIHByb3BlcnR5RGVzYy5nZXQgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHByb3BlcnR5RGVzYy5zZXQgPT09ICd1bmRlZmluZWQnKTtcbn1cbmNvbnN0IGlzV2ViV29ya2VyID0gdHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGU7XG4vLyBNYWtlIHN1cmUgdG8gYWNjZXNzIGBwcm9jZXNzYCB0aHJvdWdoIGBfZ2xvYmFsYCBzbyB0aGF0IFdlYlBhY2sgZG9lcyBub3QgYWNjaWRlbnRhbGx5IGJyb3dzZXJpZnlcbi8vIHRoaXMgY29kZS5cbmNvbnN0IGlzTm9kZSA9ICEoJ253JyBpbiBfZ2xvYmFsKSAmJlxuICAgIHR5cGVvZiBfZ2xvYmFsLnByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmXG4gICAgX2dsb2JhbC5wcm9jZXNzLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IHByb2Nlc3NdJztcbmNvbnN0IGlzQnJvd3NlciA9ICFpc05vZGUgJiYgIWlzV2ViV29ya2VyICYmICEhKGlzV2luZG93RXhpc3RzICYmIGludGVybmFsV2luZG93WydIVE1MRWxlbWVudCddKTtcbi8vIHdlIGFyZSBpbiBlbGVjdHJvbiBvZiBudywgc28gd2UgYXJlIGJvdGggYnJvd3NlciBhbmQgbm9kZWpzXG4vLyBNYWtlIHN1cmUgdG8gYWNjZXNzIGBwcm9jZXNzYCB0aHJvdWdoIGBfZ2xvYmFsYCBzbyB0aGF0IFdlYlBhY2sgZG9lcyBub3QgYWNjaWRlbnRhbGx5IGJyb3dzZXJpZnlcbi8vIHRoaXMgY29kZS5cbmNvbnN0IGlzTWl4ID0gdHlwZW9mIF9nbG9iYWwucHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICBfZ2xvYmFsLnByb2Nlc3MudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nICYmXG4gICAgIWlzV2ViV29ya2VyICYmXG4gICAgISEoaXNXaW5kb3dFeGlzdHMgJiYgaW50ZXJuYWxXaW5kb3dbJ0hUTUxFbGVtZW50J10pO1xuY29uc3Qgem9uZVN5bWJvbEV2ZW50TmFtZXMkMSA9IHt9O1xuY29uc3Qgd3JhcEZuID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvOTExLCBpbiBJRSwgc29tZXRpbWVzXG4gICAgLy8gZXZlbnQgd2lsbCBiZSB1bmRlZmluZWQsIHNvIHdlIG5lZWQgdG8gdXNlIHdpbmRvdy5ldmVudFxuICAgIGV2ZW50ID0gZXZlbnQgfHwgX2dsb2JhbC5ldmVudDtcbiAgICBpZiAoIWV2ZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGV2ZW50TmFtZVN5bWJvbCA9IHpvbmVTeW1ib2xFdmVudE5hbWVzJDFbZXZlbnQudHlwZV07XG4gICAgaWYgKCFldmVudE5hbWVTeW1ib2wpIHtcbiAgICAgICAgZXZlbnROYW1lU3ltYm9sID0gem9uZVN5bWJvbEV2ZW50TmFtZXMkMVtldmVudC50eXBlXSA9IHpvbmVTeW1ib2woJ09OX1BST1BFUlRZJyArIGV2ZW50LnR5cGUpO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzIHx8IGV2ZW50LnRhcmdldCB8fCBfZ2xvYmFsO1xuICAgIGNvbnN0IGxpc3RlbmVyID0gdGFyZ2V0W2V2ZW50TmFtZVN5bWJvbF07XG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAoaXNCcm93c2VyICYmIHRhcmdldCA9PT0gaW50ZXJuYWxXaW5kb3cgJiYgZXZlbnQudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAvLyB3aW5kb3cub25lcnJvciBoYXZlIGRpZmZlcmVudCBzaWduYXR1cmVcbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0dsb2JhbEV2ZW50SGFuZGxlcnMvb25lcnJvciN3aW5kb3cub25lcnJvclxuICAgICAgICAvLyBhbmQgb25lcnJvciBjYWxsYmFjayB3aWxsIHByZXZlbnQgZGVmYXVsdCB3aGVuIGNhbGxiYWNrIHJldHVybiB0cnVlXG4gICAgICAgIGNvbnN0IGVycm9yRXZlbnQgPSBldmVudDtcbiAgICAgICAgcmVzdWx0ID1cbiAgICAgICAgICAgIGxpc3RlbmVyICYmXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuY2FsbCh0aGlzLCBlcnJvckV2ZW50Lm1lc3NhZ2UsIGVycm9yRXZlbnQuZmlsZW5hbWUsIGVycm9yRXZlbnQubGluZW5vLCBlcnJvckV2ZW50LmNvbG5vLCBlcnJvckV2ZW50LmVycm9yKTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gbGlzdGVuZXIgJiYgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPSB1bmRlZmluZWQgJiYgIXJlc3VsdCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmZ1bmN0aW9uIHBhdGNoUHJvcGVydHkob2JqLCBwcm9wLCBwcm90b3R5cGUpIHtcbiAgICBsZXQgZGVzYyA9IE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xuICAgIGlmICghZGVzYyAmJiBwcm90b3R5cGUpIHtcbiAgICAgICAgLy8gd2hlbiBwYXRjaCB3aW5kb3cgb2JqZWN0LCB1c2UgcHJvdG90eXBlIHRvIGNoZWNrIHByb3AgZXhpc3Qgb3Igbm90XG4gICAgICAgIGNvbnN0IHByb3RvdHlwZURlc2MgPSBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBwcm9wKTtcbiAgICAgICAgaWYgKHByb3RvdHlwZURlc2MpIHtcbiAgICAgICAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGlmIHRoZSBkZXNjcmlwdG9yIG5vdCBleGlzdHMgb3IgaXMgbm90IGNvbmZpZ3VyYWJsZVxuICAgIC8vIGp1c3QgcmV0dXJuXG4gICAgaWYgKCFkZXNjIHx8ICFkZXNjLmNvbmZpZ3VyYWJsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG9uUHJvcFBhdGNoZWRTeW1ib2wgPSB6b25lU3ltYm9sKCdvbicgKyBwcm9wICsgJ3BhdGNoZWQnKTtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KG9uUHJvcFBhdGNoZWRTeW1ib2wpICYmIG9ialtvblByb3BQYXRjaGVkU3ltYm9sXSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIEEgcHJvcGVydHkgZGVzY3JpcHRvciBjYW5ub3QgaGF2ZSBnZXR0ZXIvc2V0dGVyIGFuZCBiZSB3cml0YWJsZVxuICAgIC8vIGRlbGV0aW5nIHRoZSB3cml0YWJsZSBhbmQgdmFsdWUgcHJvcGVydGllcyBhdm9pZHMgdGhpcyBlcnJvcjpcbiAgICAvL1xuICAgIC8vIFR5cGVFcnJvcjogcHJvcGVydHkgZGVzY3JpcHRvcnMgbXVzdCBub3Qgc3BlY2lmeSBhIHZhbHVlIG9yIGJlIHdyaXRhYmxlIHdoZW4gYVxuICAgIC8vIGdldHRlciBvciBzZXR0ZXIgaGFzIGJlZW4gc3BlY2lmaWVkXG4gICAgZGVsZXRlIGRlc2Mud3JpdGFibGU7XG4gICAgZGVsZXRlIGRlc2MudmFsdWU7XG4gICAgY29uc3Qgb3JpZ2luYWxEZXNjR2V0ID0gZGVzYy5nZXQ7XG4gICAgY29uc3Qgb3JpZ2luYWxEZXNjU2V0ID0gZGVzYy5zZXQ7XG4gICAgLy8gc2xpY2UoMikgY3V6ICdvbmNsaWNrJyAtPiAnY2xpY2snLCBldGNcbiAgICBjb25zdCBldmVudE5hbWUgPSBwcm9wLnNsaWNlKDIpO1xuICAgIGxldCBldmVudE5hbWVTeW1ib2wgPSB6b25lU3ltYm9sRXZlbnROYW1lcyQxW2V2ZW50TmFtZV07XG4gICAgaWYgKCFldmVudE5hbWVTeW1ib2wpIHtcbiAgICAgICAgZXZlbnROYW1lU3ltYm9sID0gem9uZVN5bWJvbEV2ZW50TmFtZXMkMVtldmVudE5hbWVdID0gem9uZVN5bWJvbCgnT05fUFJPUEVSVFknICsgZXZlbnROYW1lKTtcbiAgICB9XG4gICAgZGVzYy5zZXQgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgLy8gaW4gc29tZSBvZiB3aW5kb3dzJ3Mgb25wcm9wZXJ0eSBjYWxsYmFjaywgdGhpcyBpcyB1bmRlZmluZWRcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBjaGVjayBpdFxuICAgICAgICBsZXQgdGFyZ2V0ID0gdGhpcztcbiAgICAgICAgaWYgKCF0YXJnZXQgJiYgb2JqID09PSBfZ2xvYmFsKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBfZ2xvYmFsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldmlvdXNWYWx1ZSA9IHRhcmdldFtldmVudE5hbWVTeW1ib2xdO1xuICAgICAgICBpZiAodHlwZW9mIHByZXZpb3VzVmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcEZuKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpc3N1ZSAjOTc4LCB3aGVuIG9ubG9hZCBoYW5kbGVyIHdhcyBhZGRlZCBiZWZvcmUgbG9hZGluZyB6b25lLmpzXG4gICAgICAgIC8vIHdlIHNob3VsZCByZW1vdmUgaXQgd2l0aCBvcmlnaW5hbERlc2NTZXRcbiAgICAgICAgb3JpZ2luYWxEZXNjU2V0ICYmIG9yaWdpbmFsRGVzY1NldC5jYWxsKHRhcmdldCwgbnVsbCk7XG4gICAgICAgIHRhcmdldFtldmVudE5hbWVTeW1ib2xdID0gbmV3VmFsdWU7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcEZuLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIFRoZSBnZXR0ZXIgd291bGQgcmV0dXJuIHVuZGVmaW5lZCBmb3IgdW5hc3NpZ25lZCBwcm9wZXJ0aWVzIGJ1dCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhblxuICAgIC8vIHVuYXNzaWduZWQgcHJvcGVydHkgaXMgbnVsbFxuICAgIGRlc2MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBpbiBzb21lIG9mIHdpbmRvd3MncyBvbnByb3BlcnR5IGNhbGxiYWNrLCB0aGlzIGlzIHVuZGVmaW5lZFxuICAgICAgICAvLyBzbyB3ZSBuZWVkIHRvIGNoZWNrIGl0XG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzO1xuICAgICAgICBpZiAoIXRhcmdldCAmJiBvYmogPT09IF9nbG9iYWwpIHtcbiAgICAgICAgICAgIHRhcmdldCA9IF9nbG9iYWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGFyZ2V0W2V2ZW50TmFtZVN5bWJvbF07XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9yaWdpbmFsRGVzY0dldCkge1xuICAgICAgICAgICAgLy8gcmVzdWx0IHdpbGwgYmUgbnVsbCB3aGVuIHVzZSBpbmxpbmUgZXZlbnQgYXR0cmlidXRlLFxuICAgICAgICAgICAgLy8gc3VjaCBhcyA8YnV0dG9uIG9uY2xpY2s9XCJmdW5jKCk7XCI+T0s8L2J1dHRvbj5cbiAgICAgICAgICAgIC8vIGJlY2F1c2UgdGhlIG9uY2xpY2sgZnVuY3Rpb24gaXMgaW50ZXJuYWwgcmF3IHVuY29tcGlsZWQgaGFuZGxlclxuICAgICAgICAgICAgLy8gdGhlIG9uY2xpY2sgd2lsbCBiZSBldmFsdWF0ZWQgd2hlbiBmaXJzdCB0aW1lIGV2ZW50IHdhcyB0cmlnZ2VyZWQgb3JcbiAgICAgICAgICAgIC8vIHRoZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZCwgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvNTI1XG4gICAgICAgICAgICAvLyBzbyB3ZSBzaG91bGQgdXNlIG9yaWdpbmFsIG5hdGl2ZSBnZXQgdG8gcmV0cmlldmUgdGhlIGhhbmRsZXJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IG9yaWdpbmFsRGVzY0dldC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVzYy5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbUkVNT1ZFX0FUVFJJQlVURV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgT2JqZWN0RGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZXNjKTtcbiAgICBvYmpbb25Qcm9wUGF0Y2hlZFN5bWJvbF0gPSB0cnVlO1xufVxuZnVuY3Rpb24gcGF0Y2hPblByb3BlcnRpZXMob2JqLCBwcm9wZXJ0aWVzLCBwcm90b3R5cGUpIHtcbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhdGNoUHJvcGVydHkob2JqLCAnb24nICsgcHJvcGVydGllc1tpXSwgcHJvdG90eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgb25Qcm9wZXJ0aWVzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChwcm9wLnNsaWNlKDAsIDIpID09ICdvbicpIHtcbiAgICAgICAgICAgICAgICBvblByb3BlcnRpZXMucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9uUHJvcGVydGllcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcGF0Y2hQcm9wZXJ0eShvYmosIG9uUHJvcGVydGllc1tqXSwgcHJvdG90eXBlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IG9yaWdpbmFsSW5zdGFuY2VLZXkgPSB6b25lU3ltYm9sKCdvcmlnaW5hbEluc3RhbmNlJyk7XG4vLyB3cmFwIHNvbWUgbmF0aXZlIEFQSSBvbiBgd2luZG93YFxuZnVuY3Rpb24gcGF0Y2hDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBjb25zdCBPcmlnaW5hbENsYXNzID0gX2dsb2JhbFtjbGFzc05hbWVdO1xuICAgIGlmICghT3JpZ2luYWxDbGFzcylcbiAgICAgICAgcmV0dXJuO1xuICAgIC8vIGtlZXAgb3JpZ2luYWwgY2xhc3MgaW4gZ2xvYmFsXG4gICAgX2dsb2JhbFt6b25lU3ltYm9sKGNsYXNzTmFtZSldID0gT3JpZ2luYWxDbGFzcztcbiAgICBfZ2xvYmFsW2NsYXNzTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGEgPSBiaW5kQXJndW1lbnRzKGFyZ3VtZW50cywgY2xhc3NOYW1lKTtcbiAgICAgICAgc3dpdGNoIChhLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldID0gbmV3IE9yaWdpbmFsQ2xhc3MoYVswXSwgYVsxXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XSA9IG5ldyBPcmlnaW5hbENsYXNzKGFbMF0sIGFbMV0sIGFbMl0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0gPSBuZXcgT3JpZ2luYWxDbGFzcyhhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcmcgbGlzdCB0b28gbG9uZy4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gYXR0YWNoIG9yaWdpbmFsIGRlbGVnYXRlIHRvIHBhdGNoZWQgZnVuY3Rpb25cbiAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQoX2dsb2JhbFtjbGFzc05hbWVdLCBPcmlnaW5hbENsYXNzKTtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBPcmlnaW5hbENsYXNzKGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgbGV0IHByb3A7XG4gICAgZm9yIChwcm9wIGluIGluc3RhbmNlKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD00NDcyMVxuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSAnWE1MSHR0cFJlcXVlc3QnICYmIHByb3AgPT09ICdyZXNwb25zZUJsb2InKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIChmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbnN0YW5jZVtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIF9nbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGVbcHJvcF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdLmFwcGx5KHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV0sIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KF9nbG9iYWxbY2xhc3NOYW1lXS5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW29yaWdpbmFsSW5zdGFuY2VLZXldW3Byb3BdID0gd3JhcFdpdGhDdXJyZW50Wm9uZShmbiwgY2xhc3NOYW1lICsgJy4nICsgcHJvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8ga2VlcCBjYWxsYmFjayBpbiB3cmFwcGVkIGZ1bmN0aW9uIHNvIHdlIGNhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSBpdCBpbiBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgdG8gcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5hdGl2ZSBvbmUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0sIGZuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbb3JpZ2luYWxJbnN0YW5jZUtleV1bcHJvcF0gPSBmbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1tvcmlnaW5hbEluc3RhbmNlS2V5XVtwcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkocHJvcCk7XG4gICAgfVxuICAgIGZvciAocHJvcCBpbiBPcmlnaW5hbENsYXNzKSB7XG4gICAgICAgIGlmIChwcm9wICE9PSAncHJvdG90eXBlJyAmJiBPcmlnaW5hbENsYXNzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICBfZ2xvYmFsW2NsYXNzTmFtZV1bcHJvcF0gPSBPcmlnaW5hbENsYXNzW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gcGF0Y2hNZXRob2QodGFyZ2V0LCBuYW1lLCBwYXRjaEZuKSB7XG4gICAgbGV0IHByb3RvID0gdGFyZ2V0O1xuICAgIHdoaWxlIChwcm90byAmJiAhcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgcHJvdG8gPSBPYmplY3RHZXRQcm90b3R5cGVPZihwcm90byk7XG4gICAgfVxuICAgIGlmICghcHJvdG8gJiYgdGFyZ2V0W25hbWVdKSB7XG4gICAgICAgIC8vIHNvbWVob3cgd2UgZGlkIG5vdCBmaW5kIGl0LCBidXQgd2UgY2FuIHNlZSBpdC4gVGhpcyBoYXBwZW5zIG9uIElFIGZvciBXaW5kb3cgcHJvcGVydGllcy5cbiAgICAgICAgcHJvdG8gPSB0YXJnZXQ7XG4gICAgfVxuICAgIGNvbnN0IGRlbGVnYXRlTmFtZSA9IHpvbmVTeW1ib2wobmFtZSk7XG4gICAgbGV0IGRlbGVnYXRlID0gbnVsbDtcbiAgICBpZiAocHJvdG8gJiYgKCEoZGVsZWdhdGUgPSBwcm90b1tkZWxlZ2F0ZU5hbWVdKSB8fCAhcHJvdG8uaGFzT3duUHJvcGVydHkoZGVsZWdhdGVOYW1lKSkpIHtcbiAgICAgICAgZGVsZWdhdGUgPSBwcm90b1tkZWxlZ2F0ZU5hbWVdID0gcHJvdG9bbmFtZV07XG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgcHJvdG9bbmFtZV0gaXMgd3JpdGFibGVcbiAgICAgICAgLy8gc29tZSBwcm9wZXJ0eSBpcyByZWFkb25seSBpbiBzYWZhcmksIHN1Y2ggYXMgSHRtbENhbnZhc0VsZW1lbnQucHJvdG90eXBlLnRvQmxvYlxuICAgICAgICBjb25zdCBkZXNjID0gcHJvdG8gJiYgT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBuYW1lKTtcbiAgICAgICAgaWYgKGlzUHJvcGVydHlXcml0YWJsZShkZXNjKSkge1xuICAgICAgICAgICAgY29uc3QgcGF0Y2hEZWxlZ2F0ZSA9IHBhdGNoRm4oZGVsZWdhdGUsIGRlbGVnYXRlTmFtZSwgbmFtZSk7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0Y2hEZWxlZ2F0ZSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwcm90b1tuYW1lXSwgZGVsZWdhdGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWxlZ2F0ZTtcbn1cbi8vIFRPRE86IEBKaWFMaVBhc3Npb24sIHN1cHBvcnQgY2FuY2VsIHRhc2sgbGF0ZXIgaWYgbmVjZXNzYXJ5XG5mdW5jdGlvbiBwYXRjaE1hY3JvVGFzayhvYmosIGZ1bmNOYW1lLCBtZXRhQ3JlYXRvcikge1xuICAgIGxldCBzZXROYXRpdmUgPSBudWxsO1xuICAgIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0YXNrLmRhdGE7XG4gICAgICAgIGRhdGEuYXJnc1tkYXRhLmNiSWR4XSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRhc2suaW52b2tlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIHNldE5hdGl2ZS5hcHBseShkYXRhLnRhcmdldCwgZGF0YS5hcmdzKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuICAgIHNldE5hdGl2ZSA9IHBhdGNoTWV0aG9kKG9iaiwgZnVuY05hbWUsIChkZWxlZ2F0ZSkgPT4gZnVuY3Rpb24gKHNlbGYsIGFyZ3MpIHtcbiAgICAgICAgY29uc3QgbWV0YSA9IG1ldGFDcmVhdG9yKHNlbGYsIGFyZ3MpO1xuICAgICAgICBpZiAobWV0YS5jYklkeCA+PSAwICYmIHR5cGVvZiBhcmdzW21ldGEuY2JJZHhdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gc2NoZWR1bGVNYWNyb1Rhc2tXaXRoQ3VycmVudFpvbmUobWV0YS5uYW1lLCBhcmdzW21ldGEuY2JJZHhdLCBtZXRhLCBzY2hlZHVsZVRhc2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY2F1c2UgYW4gZXJyb3IgYnkgY2FsbGluZyBpdCBkaXJlY3RseS5cbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHBhdGNoZWQsIG9yaWdpbmFsKSB7XG4gICAgcGF0Y2hlZFt6b25lU3ltYm9sKCdPcmlnaW5hbERlbGVnYXRlJyldID0gb3JpZ2luYWw7XG59XG5sZXQgaXNEZXRlY3RlZElFT3JFZGdlID0gZmFsc2U7XG5sZXQgaWVPckVkZ2UgPSBmYWxzZTtcbmZ1bmN0aW9uIGlzSUUoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdWEgPSBpbnRlcm5hbFdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICBpZiAodWEuaW5kZXhPZignTVNJRSAnKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNJRU9yRWRnZSgpIHtcbiAgICBpZiAoaXNEZXRlY3RlZElFT3JFZGdlKSB7XG4gICAgICAgIHJldHVybiBpZU9yRWRnZTtcbiAgICB9XG4gICAgaXNEZXRlY3RlZElFT3JFZGdlID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB1YSA9IGludGVybmFsV2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgIGlmICh1YS5pbmRleE9mKCdNU0lFICcpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdFZGdlLycpICE9PSAtMSkge1xuICAgICAgICAgICAgaWVPckVkZ2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikgeyB9XG4gICAgcmV0dXJuIGllT3JFZGdlO1xufVxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBzdXBwcmVzcyB7bWlzc2luZ1JlcXVpcmV9XG4gKi9cbmxldCBwYXNzaXZlU3VwcG9ydGVkID0gZmFsc2U7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIE5vdGU6IFdlIHBhc3MgdGhlIGBvcHRpb25zYCBvYmplY3QgYXMgdGhlIGV2ZW50IGhhbmRsZXIgdG9vLiBUaGlzIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlXG4gICAgICAgIC8vIHNpZ25hdHVyZSBvZiBgYWRkRXZlbnRMaXN0ZW5lcmAgb3IgYHJlbW92ZUV2ZW50TGlzdGVuZXJgIGJ1dCBlbmFibGVzIHVzIHRvIHJlbW92ZSB0aGUgaGFuZGxlclxuICAgICAgICAvLyB3aXRob3V0IGFuIGFjdHVhbCBoYW5kbGVyLlxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG59XG4vLyBhbiBpZGVudGlmaWVyIHRvIHRlbGwgWm9uZVRhc2sgZG8gbm90IGNyZWF0ZSBhIG5ldyBpbnZva2UgY2xvc3VyZVxuY29uc3QgT1BUSU1JWkVEX1pPTkVfRVZFTlRfVEFTS19EQVRBID0ge1xuICAgIHVzZUc6IHRydWUsXG59O1xuY29uc3Qgem9uZVN5bWJvbEV2ZW50TmFtZXMgPSB7fTtcbmNvbnN0IGdsb2JhbFNvdXJjZXMgPSB7fTtcbmNvbnN0IEVWRU5UX05BTUVfU1lNQk9MX1JFR1ggPSBuZXcgUmVnRXhwKCdeJyArIFpPTkVfU1lNQk9MX1BSRUZJWCArICcoXFxcXHcrKSh0cnVlfGZhbHNlKSQnKTtcbmNvbnN0IElNTUVESUFURV9QUk9QQUdBVElPTl9TWU1CT0wgPSB6b25lU3ltYm9sKCdwcm9wYWdhdGlvblN0b3BwZWQnKTtcbmZ1bmN0aW9uIHByZXBhcmVFdmVudE5hbWVzKGV2ZW50TmFtZSwgZXZlbnROYW1lVG9TdHJpbmcpIHtcbiAgICBjb25zdCBmYWxzZUV2ZW50TmFtZSA9IChldmVudE5hbWVUb1N0cmluZyA/IGV2ZW50TmFtZVRvU3RyaW5nKGV2ZW50TmFtZSkgOiBldmVudE5hbWUpICsgRkFMU0VfU1RSO1xuICAgIGNvbnN0IHRydWVFdmVudE5hbWUgPSAoZXZlbnROYW1lVG9TdHJpbmcgPyBldmVudE5hbWVUb1N0cmluZyhldmVudE5hbWUpIDogZXZlbnROYW1lKSArIFRSVUVfU1RSO1xuICAgIGNvbnN0IHN5bWJvbCA9IFpPTkVfU1lNQk9MX1BSRUZJWCArIGZhbHNlRXZlbnROYW1lO1xuICAgIGNvbnN0IHN5bWJvbENhcHR1cmUgPSBaT05FX1NZTUJPTF9QUkVGSVggKyB0cnVlRXZlbnROYW1lO1xuICAgIHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV0gPSB7fTtcbiAgICB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdW0ZBTFNFX1NUUl0gPSBzeW1ib2w7XG4gICAgem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXVtUUlVFX1NUUl0gPSBzeW1ib2xDYXB0dXJlO1xufVxuZnVuY3Rpb24gcGF0Y2hFdmVudFRhcmdldChfZ2xvYmFsLCBhcGksIGFwaXMsIHBhdGNoT3B0aW9ucykge1xuICAgIGNvbnN0IEFERF9FVkVOVF9MSVNURU5FUiA9IChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLmFkZCkgfHwgQUREX0VWRU5UX0xJU1RFTkVSX1NUUjtcbiAgICBjb25zdCBSRU1PVkVfRVZFTlRfTElTVEVORVIgPSAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5ybSkgfHwgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSX1NUUjtcbiAgICBjb25zdCBMSVNURU5FUlNfRVZFTlRfTElTVEVORVIgPSAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5saXN0ZW5lcnMpIHx8ICdldmVudExpc3RlbmVycyc7XG4gICAgY29uc3QgUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVIgPSAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5ybUFsbCkgfHwgJ3JlbW92ZUFsbExpc3RlbmVycyc7XG4gICAgY29uc3Qgem9uZVN5bWJvbEFkZEV2ZW50TGlzdGVuZXIgPSB6b25lU3ltYm9sKEFERF9FVkVOVF9MSVNURU5FUik7XG4gICAgY29uc3QgQUREX0VWRU5UX0xJU1RFTkVSX1NPVVJDRSA9ICcuJyArIEFERF9FVkVOVF9MSVNURU5FUiArICc6JztcbiAgICBjb25zdCBQUkVQRU5EX0VWRU5UX0xJU1RFTkVSID0gJ3ByZXBlbmRMaXN0ZW5lcic7XG4gICAgY29uc3QgUFJFUEVORF9FVkVOVF9MSVNURU5FUl9TT1VSQ0UgPSAnLicgKyBQUkVQRU5EX0VWRU5UX0xJU1RFTkVSICsgJzonO1xuICAgIGNvbnN0IGludm9rZVRhc2sgPSBmdW5jdGlvbiAodGFzaywgdGFyZ2V0LCBldmVudCkge1xuICAgICAgICAvLyBmb3IgYmV0dGVyIHBlcmZvcm1hbmNlLCBjaGVjayBpc1JlbW92ZWQgd2hpY2ggaXMgc2V0XG4gICAgICAgIC8vIGJ5IHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgICAgICAgaWYgKHRhc2suaXNSZW1vdmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGRlbGVnYXRlID09PSAnb2JqZWN0JyAmJiBkZWxlZ2F0ZS5oYW5kbGVFdmVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBiaW5kIHZlcnNpb24gb2YgaGFuZGxlRXZlbnQgd2hlbiBpbnZva2VcbiAgICAgICAgICAgIHRhc2suY2FsbGJhY2sgPSAoZXZlbnQpID0+IGRlbGVnYXRlLmhhbmRsZUV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGludm9rZSBzdGF0aWMgdGFzay5pbnZva2VcbiAgICAgICAgLy8gbmVlZCB0byB0cnkvY2F0Y2ggZXJyb3IgaGVyZSwgb3RoZXJ3aXNlLCB0aGUgZXJyb3IgaW4gb25lIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIC8vIHdpbGwgYnJlYWsgdGhlIGV4ZWN1dGlvbnMgb2YgdGhlIG90aGVyIGV2ZW50IGxpc3RlbmVycy4gQWxzbyBlcnJvciB3aWxsXG4gICAgICAgIC8vIG5vdCByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIHdoZW4gYG9uY2VgIG9wdGlvbnMgaXMgdHJ1ZS5cbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGFzay5pbnZva2UodGFzaywgdGFyZ2V0LCBbZXZlbnRdKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBlcnJvciA9IGVycjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvcHRpb25zID0gdGFzay5vcHRpb25zO1xuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgJiYgb3B0aW9ucy5vbmNlKSB7XG4gICAgICAgICAgICAvLyBpZiBvcHRpb25zLm9uY2UgaXMgdHJ1ZSwgYWZ0ZXIgaW52b2tlIG9uY2UgcmVtb3ZlIGxpc3RlbmVyIGhlcmVcbiAgICAgICAgICAgIC8vIG9ubHkgYnJvd3NlciBuZWVkIHRvIGRvIHRoaXMsIG5vZGVqcyBldmVudEVtaXR0ZXIgd2lsbCBjYWwgcmVtb3ZlTGlzdGVuZXJcbiAgICAgICAgICAgIC8vIGluc2lkZSBFdmVudEVtaXR0ZXIub25jZVxuICAgICAgICAgICAgY29uc3QgZGVsZWdhdGUgPSB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgPyB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgOiB0YXNrLmNhbGxiYWNrO1xuICAgICAgICAgICAgdGFyZ2V0W1JFTU9WRV9FVkVOVF9MSVNURU5FUl0uY2FsbCh0YXJnZXQsIGV2ZW50LnR5cGUsIGRlbGVnYXRlLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnbG9iYWxDYWxsYmFjayhjb250ZXh0LCBldmVudCwgaXNDYXB0dXJlKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzkxMSwgaW4gSUUsIHNvbWV0aW1lc1xuICAgICAgICAvLyBldmVudCB3aWxsIGJlIHVuZGVmaW5lZCwgc28gd2UgbmVlZCB0byB1c2Ugd2luZG93LmV2ZW50XG4gICAgICAgIGV2ZW50ID0gZXZlbnQgfHwgX2dsb2JhbC5ldmVudDtcbiAgICAgICAgaWYgKCFldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGV2ZW50LnRhcmdldCBpcyBuZWVkZWQgZm9yIFNhbXN1bmcgVFYgYW5kIFNvdXJjZUJ1ZmZlclxuICAgICAgICAvLyB8fCBnbG9iYWwgaXMgbmVlZGVkIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL3pvbmUuanMvaXNzdWVzLzE5MFxuICAgICAgICBjb25zdCB0YXJnZXQgPSBjb250ZXh0IHx8IGV2ZW50LnRhcmdldCB8fCBfZ2xvYmFsO1xuICAgICAgICBjb25zdCB0YXNrcyA9IHRhcmdldFt6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudC50eXBlXVtpc0NhcHR1cmUgPyBUUlVFX1NUUiA6IEZBTFNFX1NUUl1dO1xuICAgICAgICBpZiAodGFza3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgICAgICAgLy8gaW52b2tlIGFsbCB0YXNrcyB3aGljaCBhdHRhY2hlZCB0byBjdXJyZW50IHRhcmdldCB3aXRoIGdpdmVuIGV2ZW50LnR5cGUgYW5kIGNhcHR1cmUgPSBmYWxzZVxuICAgICAgICAgICAgLy8gZm9yIHBlcmZvcm1hbmNlIGNvbmNlcm4sIGlmIHRhc2subGVuZ3RoID09PSAxLCBqdXN0IGludm9rZVxuICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IGludm9rZVRhc2sodGFza3NbMF0sIHRhcmdldCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVyciAmJiBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvem9uZS5qcy9pc3N1ZXMvODM2XG4gICAgICAgICAgICAgICAgLy8gY29weSB0aGUgdGFza3MgYXJyYXkgYmVmb3JlIGludm9rZSwgdG8gYXZvaWRcbiAgICAgICAgICAgICAgICAvLyB0aGUgY2FsbGJhY2sgd2lsbCByZW1vdmUgaXRzZWxmIG9yIG90aGVyIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weVRhc2tzID0gdGFza3Muc2xpY2UoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvcHlUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQgJiYgZXZlbnRbSU1NRURJQVRFX1BST1BBR0FUSU9OX1NZTUJPTF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IGludm9rZVRhc2soY29weVRhc2tzW2ldLCB0YXJnZXQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgZXJyICYmIGVycm9ycy5wdXNoKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2luY2UgdGhlcmUgaXMgb25seSBvbmUgZXJyb3IsIHdlIGRvbid0IG5lZWQgdG8gc2NoZWR1bGUgbWljcm9UYXNrXG4gICAgICAgICAgICAvLyB0byB0aHJvdyB0aGUgZXJyb3IuXG4gICAgICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IGVycm9yc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYXBpLm5hdGl2ZVNjaGVkdWxlTWljcm9UYXNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGdsb2JhbCBzaGFyZWQgem9uZUF3YXJlQ2FsbGJhY2sgdG8gaGFuZGxlIGFsbCBldmVudCBjYWxsYmFjayB3aXRoIGNhcHR1cmUgPSBmYWxzZVxuICAgIGNvbnN0IGdsb2JhbFpvbmVBd2FyZUNhbGxiYWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxDYWxsYmFjayh0aGlzLCBldmVudCwgZmFsc2UpO1xuICAgIH07XG4gICAgLy8gZ2xvYmFsIHNoYXJlZCB6b25lQXdhcmVDYWxsYmFjayB0byBoYW5kbGUgYWxsIGV2ZW50IGNhbGxiYWNrIHdpdGggY2FwdHVyZSA9IHRydWVcbiAgICBjb25zdCBnbG9iYWxab25lQXdhcmVDYXB0dXJlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbENhbGxiYWNrKHRoaXMsIGV2ZW50LCB0cnVlKTtcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHBhdGNoRXZlbnRUYXJnZXRNZXRob2RzKG9iaiwgcGF0Y2hPcHRpb25zKSB7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHVzZUdsb2JhbENhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgaWYgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMudXNlRyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB1c2VHbG9iYWxDYWxsYmFjayA9IHBhdGNoT3B0aW9ucy51c2VHO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlSGFuZGxlciA9IHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMudmg7XG4gICAgICAgIGxldCBjaGVja0R1cGxpY2F0ZSA9IHRydWU7XG4gICAgICAgIGlmIChwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLmNoa0R1cCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGVja0R1cGxpY2F0ZSA9IHBhdGNoT3B0aW9ucy5jaGtEdXA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJldHVyblRhcmdldCA9IGZhbHNlO1xuICAgICAgICBpZiAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5ydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm5UYXJnZXQgPSBwYXRjaE9wdGlvbnMucnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb3RvID0gb2JqO1xuICAgICAgICB3aGlsZSAocHJvdG8gJiYgIXByb3RvLmhhc093blByb3BlcnR5KEFERF9FVkVOVF9MSVNURU5FUikpIHtcbiAgICAgICAgICAgIHByb3RvID0gT2JqZWN0R2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvdG8gJiYgb2JqW0FERF9FVkVOVF9MSVNURU5FUl0pIHtcbiAgICAgICAgICAgIC8vIHNvbWVob3cgd2UgZGlkIG5vdCBmaW5kIGl0LCBidXQgd2UgY2FuIHNlZSBpdC4gVGhpcyBoYXBwZW5zIG9uIElFIGZvciBXaW5kb3cgcHJvcGVydGllcy5cbiAgICAgICAgICAgIHByb3RvID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcHJvdG8pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvdG9bem9uZVN5bWJvbEFkZEV2ZW50TGlzdGVuZXJdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZlbnROYW1lVG9TdHJpbmcgPSBwYXRjaE9wdGlvbnMgJiYgcGF0Y2hPcHRpb25zLmV2ZW50TmFtZVRvU3RyaW5nO1xuICAgICAgICAvLyBhIHNoYXJlZCBnbG9iYWwgdGFza0RhdGEgdG8gcGFzcyBkYXRhIGZvciBzY2hlZHVsZUV2ZW50VGFza1xuICAgICAgICAvLyBzbyB3ZSBkbyBub3QgbmVlZCB0byBjcmVhdGUgYSBuZXcgb2JqZWN0IGp1c3QgZm9yIHBhc3Mgc29tZSBkYXRhXG4gICAgICAgIGNvbnN0IHRhc2tEYXRhID0ge307XG4gICAgICAgIGNvbnN0IG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSAocHJvdG9bem9uZVN5bWJvbEFkZEV2ZW50TGlzdGVuZXJdID0gcHJvdG9bQUREX0VWRU5UX0xJU1RFTkVSXSk7XG4gICAgICAgIGNvbnN0IG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIgPSAocHJvdG9bem9uZVN5bWJvbChSRU1PVkVfRVZFTlRfTElTVEVORVIpXSA9XG4gICAgICAgICAgICBwcm90b1tSRU1PVkVfRVZFTlRfTElTVEVORVJdKTtcbiAgICAgICAgY29uc3QgbmF0aXZlTGlzdGVuZXJzID0gKHByb3RvW3pvbmVTeW1ib2woTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSKV0gPVxuICAgICAgICAgICAgcHJvdG9bTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSXSk7XG4gICAgICAgIGNvbnN0IG5hdGl2ZVJlbW92ZUFsbExpc3RlbmVycyA9IChwcm90b1t6b25lU3ltYm9sKFJFTU9WRV9BTExfTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSKV0gPVxuICAgICAgICAgICAgcHJvdG9bUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdKTtcbiAgICAgICAgbGV0IG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyO1xuICAgICAgICBpZiAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy5wcmVwZW5kKSB7XG4gICAgICAgICAgICBuYXRpdmVQcmVwZW5kRXZlbnRMaXN0ZW5lciA9IHByb3RvW3pvbmVTeW1ib2wocGF0Y2hPcHRpb25zLnByZXBlbmQpXSA9XG4gICAgICAgICAgICAgICAgcHJvdG9bcGF0Y2hPcHRpb25zLnByZXBlbmRdO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIHV0aWwgZnVuY3Rpb24gd2lsbCBidWlsZCBhbiBvcHRpb24gb2JqZWN0IHdpdGggcGFzc2l2ZSBvcHRpb25cbiAgICAgICAgICogdG8gaGFuZGxlIGFsbCBwb3NzaWJsZSBpbnB1dCBmcm9tIHRoZSB1c2VyLlxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gYnVpbGRFdmVudExpc3RlbmVyT3B0aW9ucyhvcHRpb25zLCBwYXNzaXZlKSB7XG4gICAgICAgICAgICBpZiAoIXBhc3NpdmVTdXBwb3J0ZWQgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAvLyBkb2Vzbid0IHN1cHBvcnQgcGFzc2l2ZSBidXQgdXNlciB3YW50IHRvIHBhc3MgYW4gb2JqZWN0IGFzIG9wdGlvbnMuXG4gICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIG5vdCB3b3JrIG9uIHNvbWUgb2xkIGJyb3dzZXIsIHNvIHdlIGp1c3QgcGFzcyBhIGJvb2xlYW5cbiAgICAgICAgICAgICAgICAvLyBhcyB1c2VDYXB0dXJlIHBhcmFtZXRlclxuICAgICAgICAgICAgICAgIHJldHVybiAhIW9wdGlvbnMuY2FwdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFzc2l2ZVN1cHBvcnRlZCB8fCAhcGFzc2l2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBjYXB0dXJlOiBvcHRpb25zLCBwYXNzaXZlOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBwYXNzaXZlOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnICYmIG9wdGlvbnMucGFzc2l2ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5vcHRpb25zLCBwYXNzaXZlOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXN0b21TY2hlZHVsZUdsb2JhbCA9IGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAvLyBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgdGFzayBmb3IgdGhlIGV2ZW50TmFtZSArIGNhcHR1cmUsXG4gICAgICAgICAgICAvLyBqdXN0IHJldHVybiwgYmVjYXVzZSB3ZSB1c2UgdGhlIHNoYXJlZCBnbG9iYWxab25lQXdhcmVDYWxsYmFjayBoZXJlLlxuICAgICAgICAgICAgaWYgKHRhc2tEYXRhLmlzRXhpc3RpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5jYWxsKHRhc2tEYXRhLnRhcmdldCwgdGFza0RhdGEuZXZlbnROYW1lLCB0YXNrRGF0YS5jYXB0dXJlID8gZ2xvYmFsWm9uZUF3YXJlQ2FwdHVyZUNhbGxiYWNrIDogZ2xvYmFsWm9uZUF3YXJlQ2FsbGJhY2ssIHRhc2tEYXRhLm9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjdXN0b21DYW5jZWxHbG9iYWwgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgLy8gaWYgdGFzayBpcyBub3QgbWFya2VkIGFzIGlzUmVtb3ZlZCwgdGhpcyBjYWxsIGlzIGRpcmVjdGx5XG4gICAgICAgICAgICAvLyBmcm9tIFpvbmUucHJvdG90eXBlLmNhbmNlbFRhc2ssIHdlIHNob3VsZCByZW1vdmUgdGhlIHRhc2tcbiAgICAgICAgICAgIC8vIGZyb20gdGFza3NMaXN0IG9mIHRhcmdldCBmaXJzdFxuICAgICAgICAgICAgaWYgKCF0YXNrLmlzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbEV2ZW50TmFtZXMgPSB6b25lU3ltYm9sRXZlbnROYW1lc1t0YXNrLmV2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgbGV0IHN5bWJvbEV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoc3ltYm9sRXZlbnROYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBzeW1ib2xFdmVudE5hbWUgPSBzeW1ib2xFdmVudE5hbWVzW3Rhc2suY2FwdHVyZSA/IFRSVUVfU1RSIDogRkFMU0VfU1RSXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHN5bWJvbEV2ZW50TmFtZSAmJiB0YXNrLnRhcmdldFtzeW1ib2xFdmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXhpc3RpbmdUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrID0gZXhpc3RpbmdUYXNrc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2sgPT09IHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgaXNSZW1vdmVkIHRvIGRhdGEgZm9yIGZhc3RlciBpbnZva2VUYXNrIGNoZWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5pc1JlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgdGFza3MgZm9yIHRoZSBldmVudE5hbWUgKyBjYXB0dXJlIGhhdmUgZ29uZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGdsb2JhbFpvbmVBd2FyZUNhbGxiYWNrIGFuZCByZW1vdmUgdGhlIHRhc2sgY2FjaGUgZnJvbSB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5hbGxSZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay50YXJnZXRbc3ltYm9sRXZlbnROYW1lXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgYWxsIHRhc2tzIGZvciB0aGUgZXZlbnROYW1lICsgY2FwdHVyZSBoYXZlIGdvbmUsXG4gICAgICAgICAgICAvLyB3ZSB3aWxsIHJlYWxseSByZW1vdmUgdGhlIGdsb2JhbCBldmVudCBjYWxsYmFjayxcbiAgICAgICAgICAgIC8vIGlmIG5vdCwgcmV0dXJuXG4gICAgICAgICAgICBpZiAoIXRhc2suYWxsUmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGFzay50YXJnZXQsIHRhc2suZXZlbnROYW1lLCB0YXNrLmNhcHR1cmUgPyBnbG9iYWxab25lQXdhcmVDYXB0dXJlQ2FsbGJhY2sgOiBnbG9iYWxab25lQXdhcmVDYWxsYmFjaywgdGFzay5vcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3VzdG9tU2NoZWR1bGVOb25HbG9iYWwgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuY2FsbCh0YXNrRGF0YS50YXJnZXQsIHRhc2tEYXRhLmV2ZW50TmFtZSwgdGFzay5pbnZva2UsIHRhc2tEYXRhLm9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjdXN0b21TY2hlZHVsZVByZXBlbmQgPSBmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyLmNhbGwodGFza0RhdGEudGFyZ2V0LCB0YXNrRGF0YS5ldmVudE5hbWUsIHRhc2suaW52b2tlLCB0YXNrRGF0YS5vcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3VzdG9tQ2FuY2VsTm9uR2xvYmFsID0gZnVuY3Rpb24gKHRhc2spIHtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmNhbGwodGFzay50YXJnZXQsIHRhc2suZXZlbnROYW1lLCB0YXNrLmludm9rZSwgdGFzay5vcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY3VzdG9tU2NoZWR1bGUgPSB1c2VHbG9iYWxDYWxsYmFjayA/IGN1c3RvbVNjaGVkdWxlR2xvYmFsIDogY3VzdG9tU2NoZWR1bGVOb25HbG9iYWw7XG4gICAgICAgIGNvbnN0IGN1c3RvbUNhbmNlbCA9IHVzZUdsb2JhbENhbGxiYWNrID8gY3VzdG9tQ2FuY2VsR2xvYmFsIDogY3VzdG9tQ2FuY2VsTm9uR2xvYmFsO1xuICAgICAgICBjb25zdCBjb21wYXJlVGFza0NhbGxiYWNrVnNEZWxlZ2F0ZSA9IGZ1bmN0aW9uICh0YXNrLCBkZWxlZ2F0ZSkge1xuICAgICAgICAgICAgY29uc3QgdHlwZU9mRGVsZWdhdGUgPSB0eXBlb2YgZGVsZWdhdGU7XG4gICAgICAgICAgICByZXR1cm4gKCh0eXBlT2ZEZWxlZ2F0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0YXNrLmNhbGxiYWNrID09PSBkZWxlZ2F0ZSkgfHxcbiAgICAgICAgICAgICAgICAodHlwZU9mRGVsZWdhdGUgPT09ICdvYmplY3QnICYmIHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA9PT0gZGVsZWdhdGUpKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGFyZSA9IHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMuZGlmZiA/IHBhdGNoT3B0aW9ucy5kaWZmIDogY29tcGFyZVRhc2tDYWxsYmFja1ZzRGVsZWdhdGU7XG4gICAgICAgIGNvbnN0IHVucGF0Y2hlZEV2ZW50cyA9IFpvbmVbem9uZVN5bWJvbCgnVU5QQVRDSEVEX0VWRU5UUycpXTtcbiAgICAgICAgY29uc3QgcGFzc2l2ZUV2ZW50cyA9IF9nbG9iYWxbem9uZVN5bWJvbCgnUEFTU0lWRV9FVkVOVFMnKV07XG4gICAgICAgIGNvbnN0IG1ha2VBZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYXRpdmVMaXN0ZW5lciwgYWRkU291cmNlLCBjdXN0b21TY2hlZHVsZUZuLCBjdXN0b21DYW5jZWxGbiwgcmV0dXJuVGFyZ2V0ID0gZmFsc2UsIHByZXBlbmQgPSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzIHx8IF9nbG9iYWw7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICBpZiAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy50cmFuc2ZlckV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBwYXRjaE9wdGlvbnMudHJhbnNmZXJFdmVudE5hbWUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGRlbGVnYXRlID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgIGlmICghZGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05vZGUgJiYgZXZlbnROYW1lID09PSAndW5jYXVnaHRFeGNlcHRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvbid0IHBhdGNoIHVuY2F1Z2h0RXhjZXB0aW9uIG9mIG5vZGVqcyB0byBwcmV2ZW50IGVuZGxlc3MgbG9vcFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZG9uJ3QgY3JlYXRlIHRoZSBiaW5kIGRlbGVnYXRlIGZ1bmN0aW9uIGZvciBoYW5kbGVFdmVudFxuICAgICAgICAgICAgICAgIC8vIGNhc2UgaGVyZSB0byBpbXByb3ZlIGFkZEV2ZW50TGlzdGVuZXIgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIGNyZWF0ZSB0aGUgYmluZCBkZWxlZ2F0ZSB3aGVuIGludm9rZVxuICAgICAgICAgICAgICAgIGxldCBpc0hhbmRsZUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWxlZ2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWRlbGVnYXRlLmhhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0hhbmRsZUV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlSGFuZGxlciAmJiAhdmFsaWRhdGVIYW5kbGVyKG5hdGl2ZUxpc3RlbmVyLCBkZWxlZ2F0ZSwgdGFyZ2V0LCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcGFzc2l2ZSA9IHBhc3NpdmVTdXBwb3J0ZWQgJiYgISFwYXNzaXZlRXZlbnRzICYmIHBhc3NpdmVFdmVudHMuaW5kZXhPZihldmVudE5hbWUpICE9PSAtMTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gYnVpbGRFdmVudExpc3RlbmVyT3B0aW9ucyhhcmd1bWVudHNbMl0sIHBhc3NpdmUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpZ25hbCA9IG9wdGlvbnM/LnNpZ25hbDtcbiAgICAgICAgICAgICAgICBpZiAoc2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBzaWduYWwgaXMgYW4gYWJvcnRlZCBvbmUsIGp1c3QgcmV0dXJuIHdpdGhvdXQgYXR0YWNoaW5nIHRoZSBldmVudCBsaXN0ZW5lci5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodW5wYXRjaGVkRXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHVucGF0Y2hlZCBsaXN0XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5wYXRjaGVkRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lID09PSB1bnBhdGNoZWRFdmVudHNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFzc2l2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlTGlzdGVuZXIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgZGVsZWdhdGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSAhb3B0aW9ucyA/IGZhbHNlIDogdHlwZW9mIG9wdGlvbnMgPT09ICdib29sZWFuJyA/IHRydWUgOiBvcHRpb25zLmNhcHR1cmU7XG4gICAgICAgICAgICAgICAgY29uc3Qgb25jZSA9IG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnID8gb3B0aW9ucy5vbmNlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgY29uc3Qgem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICAgICAgICBsZXQgc3ltYm9sRXZlbnROYW1lcyA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCFzeW1ib2xFdmVudE5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXBhcmVFdmVudE5hbWVzKGV2ZW50TmFtZSwgZXZlbnROYW1lVG9TdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICBzeW1ib2xFdmVudE5hbWVzID0gem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ltYm9sRXZlbnROYW1lID0gc3ltYm9sRXZlbnROYW1lc1tjYXB0dXJlID8gVFJVRV9TVFIgOiBGQUxTRV9TVFJdO1xuICAgICAgICAgICAgICAgIGxldCBleGlzdGluZ1Rhc2tzID0gdGFyZ2V0W3N5bWJvbEV2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgbGV0IGlzRXhpc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdUYXNrcykge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5IGhhdmUgdGFzayByZWdpc3RlcmVkXG4gICAgICAgICAgICAgICAgICAgIGlzRXhpc3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tEdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXhpc3RpbmdUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGV4aXN0aW5nVGFza3NbaV0sIGRlbGVnYXRlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzYW1lIGNhbGxiYWNrLCBzYW1lIGNhcHR1cmUsIHNhbWUgZXZlbnQgbmFtZSwganVzdCByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrcyA9IHRhcmdldFtzeW1ib2xFdmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgY29uc3RydWN0b3JOYW1lID0gdGFyZ2V0LmNvbnN0cnVjdG9yWyduYW1lJ107XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0U291cmNlID0gZ2xvYmFsU291cmNlc1tjb25zdHJ1Y3Rvck5hbWVdO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlID0gdGFyZ2V0U291cmNlW2V2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3Rvck5hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZFNvdXJjZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV2ZW50TmFtZVRvU3RyaW5nID8gZXZlbnROYW1lVG9TdHJpbmcoZXZlbnROYW1lKSA6IGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBjcmVhdGUgYSBuZXcgb2JqZWN0IGFzIHRhc2suZGF0YSB0byBwYXNzIHRob3NlIHRoaW5nc1xuICAgICAgICAgICAgICAgIC8vIGp1c3QgdXNlIHRoZSBnbG9iYWwgc2hhcmVkIG9uZVxuICAgICAgICAgICAgICAgIHRhc2tEYXRhLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChvbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGFkZEV2ZW50TGlzdGVuZXIgd2l0aCBvbmNlIG9wdGlvbnMsIHdlIGRvbid0IHBhc3MgaXQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gbmF0aXZlIGFkZEV2ZW50TGlzdGVuZXIsIGluc3RlYWQgd2Uga2VlcCB0aGUgb25jZSBzZXR0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBoYW5kbGUgb3Vyc2VsdmVzLlxuICAgICAgICAgICAgICAgICAgICB0YXNrRGF0YS5vcHRpb25zLm9uY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFza0RhdGEudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRhc2tEYXRhLmNhcHR1cmUgPSBjYXB0dXJlO1xuICAgICAgICAgICAgICAgIHRhc2tEYXRhLmV2ZW50TmFtZSA9IGV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICB0YXNrRGF0YS5pc0V4aXN0aW5nID0gaXNFeGlzdGluZztcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdXNlR2xvYmFsQ2FsbGJhY2sgPyBPUFRJTUlaRURfWk9ORV9FVkVOVF9UQVNLX0RBVEEgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgLy8ga2VlcCB0YXNrRGF0YSBpbnRvIGRhdGEgdG8gYWxsb3cgb25TY2hlZHVsZUV2ZW50VGFzayB0byBhY2Nlc3MgdGhlIHRhc2sgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnRhc2tEYXRhID0gdGFza0RhdGE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzaWduYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgYWRkRXZlbnRMaXN0ZW5lciB3aXRoIHNpZ25hbCBvcHRpb25zLCB3ZSBkb24ndCBwYXNzIGl0IHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIG5hdGl2ZSBhZGRFdmVudExpc3RlbmVyLCBpbnN0ZWFkIHdlIGtlZXAgdGhlIHNpZ25hbCBzZXR0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBoYW5kbGUgb3Vyc2VsdmVzLlxuICAgICAgICAgICAgICAgICAgICB0YXNrRGF0YS5vcHRpb25zLnNpZ25hbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IHpvbmUuc2NoZWR1bGVFdmVudFRhc2soc291cmNlLCBkZWxlZ2F0ZSwgZGF0YSwgY3VzdG9tU2NoZWR1bGVGbiwgY3VzdG9tQ2FuY2VsRm4pO1xuICAgICAgICAgICAgICAgIGlmIChzaWduYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWZ0ZXIgdGFzayBpcyBzY2hlZHVsZWQsIHdlIG5lZWQgdG8gc3RvcmUgdGhlIHNpZ25hbCBiYWNrIHRvIHRhc2sub3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICB0YXNrRGF0YS5vcHRpb25zLnNpZ25hbCA9IHNpZ25hbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gV3JhcHBpbmcgYHRhc2tgIGluIGEgd2VhayByZWZlcmVuY2Ugd291bGQgbm90IHByZXZlbnQgbWVtb3J5IGxlYWtzLiBXZWFrIHJlZmVyZW5jZXMgYXJlXG4gICAgICAgICAgICAgICAgICAgIC8vIHByaW1hcmlseSB1c2VkIGZvciBwcmV2ZW50aW5nIHN0cm9uZyByZWZlcmVuY2VzIGN5Y2xlcy4gYG9uQWJvcnRgIGlzIGFsd2F5cyByZWFjaGFibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gYXMgaXQncyBhbiBldmVudCBsaXN0ZW5lciwgc28gaXRzIGNsb3N1cmUgcmV0YWlucyBhIHN0cm9uZyByZWZlcmVuY2UgdG8gdGhlIGB0YXNrYC5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25BYm9ydCA9ICgpID0+IHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgICAgICAgICAgICBuYXRpdmVMaXN0ZW5lci5jYWxsKHNpZ25hbCwgJ2Fib3J0Jywgb25BYm9ydCwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlbW92ZSB0aGUgYGFib3J0YCBsaXN0ZW5lciB3aGVuIHRoZSBldmVudCBsaXN0ZW5lciBpcyBnb2luZyB0byBiZSByZW1vdmVkLFxuICAgICAgICAgICAgICAgICAgICAvLyBhcyBpdCBjcmVhdGVzIGEgY2xvc3VyZSB0aGF0IGNhcHR1cmVzIGB0YXNrYC4gVGhpcyBjbG9zdXJlIHJldGFpbnMgYSByZWZlcmVuY2UgdG8gdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIGB0YXNrYCBvYmplY3QgZXZlbiBhZnRlciBpdCBnb2VzIG91dCBvZiBzY29wZSwgcHJldmVudGluZyBgdGFza2AgZnJvbSBiZWluZyBnYXJiYWdlXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlY3RlZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEucmVtb3ZlQWJvcnRMaXN0ZW5lciA9ICgpID0+IHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQWJvcnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBjbGVhciB0YXNrRGF0YS50YXJnZXQgdG8gYXZvaWQgbWVtb3J5IGxlYWtcbiAgICAgICAgICAgICAgICAvLyBpc3N1ZSwgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjA0NDJcbiAgICAgICAgICAgICAgICB0YXNrRGF0YS50YXJnZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gY2xlYXIgdXAgdGFza0RhdGEgYmVjYXVzZSBpdCBpcyBhIGdsb2JhbCBvYmplY3RcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhLnRhc2tEYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSB0byBzYXZlIHRob3NlIGluZm9ybWF0aW9uIHRvIHRhc2sgaW4gY2FzZVxuICAgICAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uIG1heSBjYWxsIHRhc2suem9uZS5jYW5jZWxUYXNrKCkgZGlyZWN0bHlcbiAgICAgICAgICAgICAgICBpZiAob25jZSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLm9uY2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISghcGFzc2l2ZVN1cHBvcnRlZCAmJiB0eXBlb2YgdGFzay5vcHRpb25zID09PSAnYm9vbGVhbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBzdXBwb3J0IHBhc3NpdmUsIGFuZCB3ZSBwYXNzIGFuIG9wdGlvbiBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gYWRkRXZlbnRMaXN0ZW5lciwgd2Ugc2hvdWxkIHNhdmUgdGhlIG9wdGlvbnMgdG8gdGFza1xuICAgICAgICAgICAgICAgICAgICB0YXNrLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXNrLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICB0YXNrLmNhcHR1cmUgPSBjYXB0dXJlO1xuICAgICAgICAgICAgICAgIHRhc2suZXZlbnROYW1lID0gZXZlbnROYW1lO1xuICAgICAgICAgICAgICAgIGlmIChpc0hhbmRsZUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgb3JpZ2luYWwgZGVsZWdhdGUgZm9yIGNvbXBhcmUgdG8gY2hlY2sgZHVwbGljYXRlXG4gICAgICAgICAgICAgICAgICAgIHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXByZXBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmdUYXNrcy51bnNoaWZ0KHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmV0dXJuVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdG9bQUREX0VWRU5UX0xJU1RFTkVSXSA9IG1ha2VBZGRMaXN0ZW5lcihuYXRpdmVBZGRFdmVudExpc3RlbmVyLCBBRERfRVZFTlRfTElTVEVORVJfU09VUkNFLCBjdXN0b21TY2hlZHVsZSwgY3VzdG9tQ2FuY2VsLCByZXR1cm5UYXJnZXQpO1xuICAgICAgICBpZiAobmF0aXZlUHJlcGVuZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHByb3RvW1BSRVBFTkRfRVZFTlRfTElTVEVORVJdID0gbWFrZUFkZExpc3RlbmVyKG5hdGl2ZVByZXBlbmRFdmVudExpc3RlbmVyLCBQUkVQRU5EX0VWRU5UX0xJU1RFTkVSX1NPVVJDRSwgY3VzdG9tU2NoZWR1bGVQcmVwZW5kLCBjdXN0b21DYW5jZWwsIHJldHVyblRhcmdldCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdG9bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMgfHwgX2dsb2JhbDtcbiAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZiAocGF0Y2hPcHRpb25zICYmIHBhdGNoT3B0aW9ucy50cmFuc2ZlckV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IHBhdGNoT3B0aW9ucy50cmFuc2ZlckV2ZW50TmFtZShldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgIGNvbnN0IGNhcHR1cmUgPSAhb3B0aW9ucyA/IGZhbHNlIDogdHlwZW9mIG9wdGlvbnMgPT09ICdib29sZWFuJyA/IHRydWUgOiBvcHRpb25zLmNhcHR1cmU7XG4gICAgICAgICAgICBjb25zdCBkZWxlZ2F0ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIGlmICghZGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlSGFuZGxlciAmJlxuICAgICAgICAgICAgICAgICF2YWxpZGF0ZUhhbmRsZXIobmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciwgZGVsZWdhdGUsIHRhcmdldCwgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHN5bWJvbEV2ZW50TmFtZXMgPSB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgbGV0IHN5bWJvbEV2ZW50TmFtZTtcbiAgICAgICAgICAgIGlmIChzeW1ib2xFdmVudE5hbWVzKSB7XG4gICAgICAgICAgICAgICAgc3ltYm9sRXZlbnROYW1lID0gc3ltYm9sRXZlbnROYW1lc1tjYXB0dXJlID8gVFJVRV9TVFIgOiBGQUxTRV9TVFJdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrcyA9IHN5bWJvbEV2ZW50TmFtZSAmJiB0YXJnZXRbc3ltYm9sRXZlbnROYW1lXTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ1Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBleGlzdGluZ1Rhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nVGFzayA9IGV4aXN0aW5nVGFza3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlKGV4aXN0aW5nVGFzaywgZGVsZWdhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCBpc1JlbW92ZWQgdG8gZGF0YSBmb3IgZmFzdGVyIGludm9rZVRhc2sgY2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nVGFzay5pc1JlbW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV4aXN0aW5nVGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIHRhc2tzIGZvciB0aGUgZXZlbnROYW1lICsgY2FwdHVyZSBoYXZlIGdvbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGdsb2JhbFpvbmVBd2FyZUNhbGxiYWNrIGFuZCByZW1vdmUgdGhlIHRhc2sgY2FjaGUgZnJvbSB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZ1Rhc2suYWxsUmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3N5bWJvbEV2ZW50TmFtZV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSB0YXJnZXQsIHdlIGhhdmUgYW4gZXZlbnQgbGlzdGVuZXIgd2hpY2ggaXMgYWRkZWQgYnkgb25fcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWNoIGFzIHRhcmdldC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7fSwgc28gd2UgbmVlZCB0byBjbGVhciB0aGlzIGludGVybmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydHkgdG9vIGlmIGFsbCBkZWxlZ2F0ZXMgd2l0aCBjYXB0dXJlPWZhbHNlIHdlcmUgcmVtb3ZlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vIGdpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMTY0M1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzU0NTgxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYXB0dXJlICYmIHR5cGVvZiBldmVudE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uUHJvcGVydHlTeW1ib2wgPSBaT05FX1NZTUJPTF9QUkVGSVggKyAnT05fUFJPUEVSVFknICsgZXZlbnROYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbb25Qcm9wZXJ0eVN5bWJvbF0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGUgdGhhdCBgcmVtb3ZlQWxsTGlzdGVuZXJzYCB3b3VsZCB1bHRpbWF0ZWx5IGNhbGwgYHJlbW92ZUV2ZW50TGlzdGVuZXJgLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc28gd2UncmUgc2FmZSB0byByZW1vdmUgdGhlIGFib3J0IGxpc3RlbmVyIG9ubHkgb25jZSBoZXJlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGEgPSBleGlzdGluZ1Rhc2suZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXNrRGF0YT8ucmVtb3ZlQWJvcnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2tEYXRhLnJlbW92ZUFib3J0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrRGF0YS5yZW1vdmVBYm9ydExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nVGFzay56b25lLmNhbmNlbFRhc2soZXhpc3RpbmdUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXR1cm5UYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaXNzdWUgOTMwLCBkaWRuJ3QgZmluZCB0aGUgZXZlbnQgbmFtZSBvciBjYWxsYmFja1xuICAgICAgICAgICAgLy8gZnJvbSB6b25lIGtlcHQgZXhpc3RpbmdUYXNrcywgdGhlIGNhbGxiYWNrIG1heWJlXG4gICAgICAgICAgICAvLyBhZGRlZCBvdXRzaWRlIG9mIHpvbmUsIHdlIG5lZWQgdG8gY2FsbCBuYXRpdmUgcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAgICAgICAgLy8gdG8gdHJ5IHRvIHJlbW92ZSBpdC5cbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIHByb3RvW0xJU1RFTkVSU19FVkVOVF9MSVNURU5FUl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzIHx8IF9nbG9iYWw7XG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMudHJhbnNmZXJFdmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBwYXRjaE9wdGlvbnMudHJhbnNmZXJFdmVudE5hbWUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xuICAgICAgICAgICAgY29uc3QgdGFza3MgPSBmaW5kRXZlbnRUYXNrcyh0YXJnZXQsIGV2ZW50TmFtZVRvU3RyaW5nID8gZXZlbnROYW1lVG9TdHJpbmcoZXZlbnROYW1lKSA6IGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhc2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IHRhc2tzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBkZWxlZ2F0ZSA9IHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA/IHRhc2sub3JpZ2luYWxEZWxlZ2F0ZSA6IHRhc2suY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2goZGVsZWdhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcbiAgICAgICAgfTtcbiAgICAgICAgcHJvdG9bUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcyB8fCBfZ2xvYmFsO1xuICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3AgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IEVWRU5UX05BTUVfU1lNQk9MX1JFR1guZXhlYyhwcm9wKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV2dE5hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaW4gbm9kZWpzIEV2ZW50RW1pdHRlciwgcmVtb3ZlTGlzdGVuZXIgZXZlbnQgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlZCBmb3IgbW9uaXRvcmluZyB0aGUgcmVtb3ZlTGlzdGVuZXIgY2FsbCxcbiAgICAgICAgICAgICAgICAgICAgLy8gc28ganVzdCBrZWVwIHJlbW92ZUxpc3RlbmVyIGV2ZW50TGlzdGVuZXIgdW50aWxcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsIG90aGVyIGV2ZW50TGlzdGVuZXJzIGFyZSByZW1vdmVkXG4gICAgICAgICAgICAgICAgICAgIGlmIChldnROYW1lICYmIGV2dE5hbWUgIT09ICdyZW1vdmVMaXN0ZW5lcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdLmNhbGwodGhpcywgZXZ0TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHJlbW92ZUxpc3RlbmVyIGxpc3RlbmVyIGZpbmFsbHlcbiAgICAgICAgICAgICAgICB0aGlzW1JFTU9WRV9BTExfTElTVEVORVJTX0VWRU5UX0xJU1RFTkVSXS5jYWxsKHRoaXMsICdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGNoT3B0aW9ucyAmJiBwYXRjaE9wdGlvbnMudHJhbnNmZXJFdmVudE5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gcGF0Y2hPcHRpb25zLnRyYW5zZmVyRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbEV2ZW50TmFtZXMgPSB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChzeW1ib2xFdmVudE5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN5bWJvbEV2ZW50TmFtZSA9IHN5bWJvbEV2ZW50TmFtZXNbRkFMU0VfU1RSXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ltYm9sQ2FwdHVyZUV2ZW50TmFtZSA9IHN5bWJvbEV2ZW50TmFtZXNbVFJVRV9TVFJdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHRhcmdldFtzeW1ib2xFdmVudE5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXB0dXJlVGFza3MgPSB0YXJnZXRbc3ltYm9sQ2FwdHVyZUV2ZW50TmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXNrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlVGFza3MgPSB0YXNrcy5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW1vdmVUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSByZW1vdmVUYXNrc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVsZWdhdGUgPSB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgPyB0YXNrLm9yaWdpbmFsRGVsZWdhdGUgOiB0YXNrLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXS5jYWxsKHRoaXMsIGV2ZW50TmFtZSwgZGVsZWdhdGUsIHRhc2sub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhcHR1cmVUYXNrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlVGFza3MgPSBjYXB0dXJlVGFza3Muc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3ZlVGFza3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gcmVtb3ZlVGFza3NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRlbGVnYXRlID0gdGFzay5vcmlnaW5hbERlbGVnYXRlID8gdGFzay5vcmlnaW5hbERlbGVnYXRlIDogdGFzay5jYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0uY2FsbCh0aGlzLCBldmVudE5hbWUsIGRlbGVnYXRlLCB0YXNrLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJldHVyblRhcmdldCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBmb3IgbmF0aXZlIHRvU3RyaW5nIHBhdGNoXG4gICAgICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwcm90b1tBRERfRVZFTlRfTElTVEVORVJdLCBuYXRpdmVBZGRFdmVudExpc3RlbmVyKTtcbiAgICAgICAgYXR0YWNoT3JpZ2luVG9QYXRjaGVkKHByb3RvW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0sIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIpO1xuICAgICAgICBpZiAobmF0aXZlUmVtb3ZlQWxsTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQocHJvdG9bUkVNT1ZFX0FMTF9MSVNURU5FUlNfRVZFTlRfTElTVEVORVJdLCBuYXRpdmVSZW1vdmVBbGxMaXN0ZW5lcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuYXRpdmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGF0dGFjaE9yaWdpblRvUGF0Y2hlZChwcm90b1tMSVNURU5FUlNfRVZFTlRfTElTVEVORVJdLCBuYXRpdmVMaXN0ZW5lcnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRzW2ldID0gcGF0Y2hFdmVudFRhcmdldE1ldGhvZHMoYXBpc1tpXSwgcGF0Y2hPcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG59XG5mdW5jdGlvbiBmaW5kRXZlbnRUYXNrcyh0YXJnZXQsIGV2ZW50TmFtZSkge1xuICAgIGlmICghZXZlbnROYW1lKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kVGFza3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gRVZFTlRfTkFNRV9TWU1CT0xfUkVHWC5leGVjKHByb3ApO1xuICAgICAgICAgICAgbGV0IGV2dE5hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXTtcbiAgICAgICAgICAgIGlmIChldnROYW1lICYmICghZXZlbnROYW1lIHx8IGV2dE5hbWUgPT09IGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrcyA9IHRhcmdldFtwcm9wXTtcbiAgICAgICAgICAgICAgICBpZiAodGFza3MpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRUYXNrcy5wdXNoKHRhc2tzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm91bmRUYXNrcztcbiAgICB9XG4gICAgbGV0IHN5bWJvbEV2ZW50TmFtZSA9IHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV07XG4gICAgaWYgKCFzeW1ib2xFdmVudE5hbWUpIHtcbiAgICAgICAgcHJlcGFyZUV2ZW50TmFtZXMoZXZlbnROYW1lKTtcbiAgICAgICAgc3ltYm9sRXZlbnROYW1lID0gem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXTtcbiAgICB9XG4gICAgY29uc3QgY2FwdHVyZUZhbHNlVGFza3MgPSB0YXJnZXRbc3ltYm9sRXZlbnROYW1lW0ZBTFNFX1NUUl1dO1xuICAgIGNvbnN0IGNhcHR1cmVUcnVlVGFza3MgPSB0YXJnZXRbc3ltYm9sRXZlbnROYW1lW1RSVUVfU1RSXV07XG4gICAgaWYgKCFjYXB0dXJlRmFsc2VUYXNrcykge1xuICAgICAgICByZXR1cm4gY2FwdHVyZVRydWVUYXNrcyA/IGNhcHR1cmVUcnVlVGFza3Muc2xpY2UoKSA6IFtdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhcHR1cmVUcnVlVGFza3NcbiAgICAgICAgICAgID8gY2FwdHVyZUZhbHNlVGFza3MuY29uY2F0KGNhcHR1cmVUcnVlVGFza3MpXG4gICAgICAgICAgICA6IGNhcHR1cmVGYWxzZVRhc2tzLnNsaWNlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcGF0Y2hFdmVudFByb3RvdHlwZShnbG9iYWwsIGFwaSkge1xuICAgIGNvbnN0IEV2ZW50ID0gZ2xvYmFsWydFdmVudCddO1xuICAgIGlmIChFdmVudCAmJiBFdmVudC5wcm90b3R5cGUpIHtcbiAgICAgICAgYXBpLnBhdGNoTWV0aG9kKEV2ZW50LnByb3RvdHlwZSwgJ3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbicsIChkZWxlZ2F0ZSkgPT4gZnVuY3Rpb24gKHNlbGYsIGFyZ3MpIHtcbiAgICAgICAgICAgIHNlbGZbSU1NRURJQVRFX1BST1BBR0FUSU9OX1NZTUJPTF0gPSB0cnVlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byBjYWxsIHRoZSBuYXRpdmUgc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uXG4gICAgICAgICAgICAvLyBpbiBjYXNlIGluIHNvbWUgaHlicmlkIGFwcGxpY2F0aW9uLCBzb21lIHBhcnQgb2ZcbiAgICAgICAgICAgIC8vIGFwcGxpY2F0aW9uIHdpbGwgYmUgY29udHJvbGxlZCBieSB6b25lLCBzb21lIGFyZSBub3RcbiAgICAgICAgICAgIGRlbGVnYXRlICYmIGRlbGVnYXRlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHttaXNzaW5nUmVxdWlyZX1cbiAqL1xuZnVuY3Rpb24gcGF0Y2hRdWV1ZU1pY3JvdGFzayhnbG9iYWwsIGFwaSkge1xuICAgIGFwaS5wYXRjaE1ldGhvZChnbG9iYWwsICdxdWV1ZU1pY3JvdGFzaycsIChkZWxlZ2F0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNlbGYsIGFyZ3MpIHtcbiAgICAgICAgICAgIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygncXVldWVNaWNyb3Rhc2snLCBhcmdzWzBdKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3XG4gKiBAc3VwcHJlc3Mge21pc3NpbmdSZXF1aXJlfVxuICovXG5jb25zdCB0YXNrU3ltYm9sID0gem9uZVN5bWJvbCgnem9uZVRhc2snKTtcbmZ1bmN0aW9uIHBhdGNoVGltZXIod2luZG93LCBzZXROYW1lLCBjYW5jZWxOYW1lLCBuYW1lU3VmZml4KSB7XG4gICAgbGV0IHNldE5hdGl2ZSA9IG51bGw7XG4gICAgbGV0IGNsZWFyTmF0aXZlID0gbnVsbDtcbiAgICBzZXROYW1lICs9IG5hbWVTdWZmaXg7XG4gICAgY2FuY2VsTmFtZSArPSBuYW1lU3VmZml4O1xuICAgIGNvbnN0IHRhc2tzQnlIYW5kbGVJZCA9IHt9O1xuICAgIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0YXNrLmRhdGE7XG4gICAgICAgIGRhdGEuYXJnc1swXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0YXNrLmludm9rZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBkYXRhLmhhbmRsZUlkID0gc2V0TmF0aXZlLmFwcGx5KHdpbmRvdywgZGF0YS5hcmdzKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsZWFyVGFzayh0YXNrKSB7XG4gICAgICAgIHJldHVybiBjbGVhck5hdGl2ZS5jYWxsKHdpbmRvdywgdGFzay5kYXRhLmhhbmRsZUlkKTtcbiAgICB9XG4gICAgc2V0TmF0aXZlID0gcGF0Y2hNZXRob2Qod2luZG93LCBzZXROYW1lLCAoZGVsZWdhdGUpID0+IGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBpc1BlcmlvZGljOiBuYW1lU3VmZml4ID09PSAnSW50ZXJ2YWwnLFxuICAgICAgICAgICAgICAgIGRlbGF5OiBuYW1lU3VmZml4ID09PSAnVGltZW91dCcgfHwgbmFtZVN1ZmZpeCA9PT0gJ0ludGVydmFsJyA/IGFyZ3NbMV0gfHwgMCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYXJnc1swXTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSBmdW5jdGlvbiB0aW1lcigpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlzc3VlLTkzNCwgdGFzayB3aWxsIGJlIGNhbmNlbGxlZFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGl0IGlzIGEgcGVyaW9kaWMgdGFzayBzdWNoIGFzXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldEludGVydmFsXG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzQwMzg3XG4gICAgICAgICAgICAgICAgICAgIC8vIENsZWFudXAgdGFza3NCeUhhbmRsZUlkIHNob3VsZCBiZSBoYW5kbGVkIGJlZm9yZSBzY2hlZHVsZVRhc2tcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2Ugc29tZSB6b25lU3BlYyBtYXkgaW50ZXJjZXB0IGFuZCBkb2Vzbid0IHRyaWdnZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gc2NoZWR1bGVGbihzY2hlZHVsZVRhc2spIHByb3ZpZGVkIGhlcmUuXG4gICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucy5pc1BlcmlvZGljKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMuaGFuZGxlSWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gbm9uLW5vZGVqcyBlbnYsIHdlIHJlbW92ZSB0aW1lcklkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbSBsb2NhbCBjYWNoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlSWRbb3B0aW9ucy5oYW5kbGVJZF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLmhhbmRsZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm9kZSByZXR1cm5zIGNvbXBsZXggb2JqZWN0cyBhcyBoYW5kbGVJZHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSByZW1vdmUgdGFzayByZWZlcmVuY2UgZnJvbSB0aW1lciBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmhhbmRsZUlkW3Rhc2tTeW1ib2xdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCB0YXNrID0gc2NoZWR1bGVNYWNyb1Rhc2tXaXRoQ3VycmVudFpvbmUoc2V0TmFtZSwgYXJnc1swXSwgb3B0aW9ucywgc2NoZWR1bGVUYXNrLCBjbGVhclRhc2spO1xuICAgICAgICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb2RlLmpzIG11c3QgYWRkaXRpb25hbGx5IHN1cHBvcnQgdGhlIHJlZiBhbmQgdW5yZWYgZnVuY3Rpb25zLlxuICAgICAgICAgICAgY29uc3QgaGFuZGxlID0gdGFzay5kYXRhLmhhbmRsZUlkO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIG5vbiBub2RlanMgZW52LCB3ZSBzYXZlIGhhbmRsZUlkOiB0YXNrXG4gICAgICAgICAgICAgICAgLy8gbWFwcGluZyBpbiBsb2NhbCBjYWNoZSBmb3IgY2xlYXJUaW1lb3V0XG4gICAgICAgICAgICAgICAgdGFza3NCeUhhbmRsZUlkW2hhbmRsZV0gPSB0YXNrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaGFuZGxlKSB7XG4gICAgICAgICAgICAgICAgLy8gZm9yIG5vZGVqcyBlbnYsIHdlIHNhdmUgdGFza1xuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSBpbiB0aW1lcklkIE9iamVjdCBmb3IgY2xlYXJUaW1lb3V0XG4gICAgICAgICAgICAgICAgaGFuZGxlW3Rhc2tTeW1ib2xdID0gdGFzaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgaGFuZGxlIGlzIG51bGwsIGJlY2F1c2Ugc29tZSBwb2x5ZmlsbCBvciBicm93c2VyXG4gICAgICAgICAgICAvLyBtYXkgcmV0dXJuIHVuZGVmaW5lZCBmcm9tIHNldFRpbWVvdXQvc2V0SW50ZXJ2YWwvc2V0SW1tZWRpYXRlL3JlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICAgICAgaWYgKGhhbmRsZSAmJlxuICAgICAgICAgICAgICAgIGhhbmRsZS5yZWYgJiZcbiAgICAgICAgICAgICAgICBoYW5kbGUudW5yZWYgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgaGFuZGxlLnJlZiA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBoYW5kbGUudW5yZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0YXNrLnJlZiA9IGhhbmRsZS5yZWYuYmluZChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHRhc2sudW5yZWYgPSBoYW5kbGUudW5yZWYuYmluZChoYW5kbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGUgPT09ICdudW1iZXInIHx8IGhhbmRsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBoYW5kbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGFzaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhdXNlIGFuIGVycm9yIGJ5IGNhbGxpbmcgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGUuYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNsZWFyTmF0aXZlID0gcGF0Y2hNZXRob2Qod2luZG93LCBjYW5jZWxOYW1lLCAoZGVsZWdhdGUpID0+IGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICAgIGNvbnN0IGlkID0gYXJnc1swXTtcbiAgICAgICAgbGV0IHRhc2s7XG4gICAgICAgIGlmICh0eXBlb2YgaWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAvLyBub24gbm9kZWpzIGVudi5cbiAgICAgICAgICAgIHRhc2sgPSB0YXNrc0J5SGFuZGxlSWRbaWRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gbm9kZWpzIGVudi5cbiAgICAgICAgICAgIHRhc2sgPSBpZCAmJiBpZFt0YXNrU3ltYm9sXTtcbiAgICAgICAgICAgIC8vIG90aGVyIGVudmlyb25tZW50cy5cbiAgICAgICAgICAgIGlmICghdGFzaykge1xuICAgICAgICAgICAgICAgIHRhc2sgPSBpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGFzayAmJiB0eXBlb2YgdGFzay50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKHRhc2suc3RhdGUgIT09ICdub3RTY2hlZHVsZWQnICYmXG4gICAgICAgICAgICAgICAgKCh0YXNrLmNhbmNlbEZuICYmIHRhc2suZGF0YS5pc1BlcmlvZGljKSB8fCB0YXNrLnJ1bkNvdW50ID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaWQgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlSWRbaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZFt0YXNrU3ltYm9sXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERvIG5vdCBjYW5jZWwgYWxyZWFkeSBjYW5jZWxlZCBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNhdXNlIGFuIGVycm9yIGJ5IGNhbGxpbmcgaXQgZGlyZWN0bHkuXG4gICAgICAgICAgICBkZWxlZ2F0ZS5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHBhdGNoQ3VzdG9tRWxlbWVudHMoX2dsb2JhbCwgYXBpKSB7XG4gICAgY29uc3QgeyBpc0Jyb3dzZXIsIGlzTWl4IH0gPSBhcGkuZ2V0R2xvYmFsT2JqZWN0cygpO1xuICAgIGlmICgoIWlzQnJvd3NlciAmJiAhaXNNaXgpIHx8ICFfZ2xvYmFsWydjdXN0b21FbGVtZW50cyddIHx8ICEoJ2N1c3RvbUVsZW1lbnRzJyBpbiBfZ2xvYmFsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2N1c3RvbS1lbGVtZW50cy5odG1sI2NvbmNlcHQtY3VzdG9tLWVsZW1lbnQtZGVmaW5pdGlvbi1saWZlY3ljbGUtY2FsbGJhY2tzXG4gICAgY29uc3QgY2FsbGJhY2tzID0gW1xuICAgICAgICAnY29ubmVjdGVkQ2FsbGJhY2snLFxuICAgICAgICAnZGlzY29ubmVjdGVkQ2FsbGJhY2snLFxuICAgICAgICAnYWRvcHRlZENhbGxiYWNrJyxcbiAgICAgICAgJ2F0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaycsXG4gICAgICAgICdmb3JtQXNzb2NpYXRlZENhbGxiYWNrJyxcbiAgICAgICAgJ2Zvcm1EaXNhYmxlZENhbGxiYWNrJyxcbiAgICAgICAgJ2Zvcm1SZXNldENhbGxiYWNrJyxcbiAgICAgICAgJ2Zvcm1TdGF0ZVJlc3RvcmVDYWxsYmFjaycsXG4gICAgXTtcbiAgICBhcGkucGF0Y2hDYWxsYmFja3MoYXBpLCBfZ2xvYmFsLmN1c3RvbUVsZW1lbnRzLCAnY3VzdG9tRWxlbWVudHMnLCAnZGVmaW5lJywgY2FsbGJhY2tzKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRQYXRjaChfZ2xvYmFsLCBhcGkpIHtcbiAgICBpZiAoWm9uZVthcGkuc3ltYm9sKCdwYXRjaEV2ZW50VGFyZ2V0JyldKSB7XG4gICAgICAgIC8vIEV2ZW50VGFyZ2V0IGlzIGFscmVhZHkgcGF0Y2hlZC5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7IGV2ZW50TmFtZXMsIHpvbmVTeW1ib2xFdmVudE5hbWVzLCBUUlVFX1NUUiwgRkFMU0VfU1RSLCBaT05FX1NZTUJPTF9QUkVGSVggfSA9IGFwaS5nZXRHbG9iYWxPYmplY3RzKCk7XG4gICAgLy8gIHByZWRlZmluZSBhbGwgX196b25lX3N5bWJvbF9fICsgZXZlbnROYW1lICsgdHJ1ZS9mYWxzZSBzdHJpbmdcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZXZlbnROYW1lID0gZXZlbnROYW1lc1tpXTtcbiAgICAgICAgY29uc3QgZmFsc2VFdmVudE5hbWUgPSBldmVudE5hbWUgKyBGQUxTRV9TVFI7XG4gICAgICAgIGNvbnN0IHRydWVFdmVudE5hbWUgPSBldmVudE5hbWUgKyBUUlVFX1NUUjtcbiAgICAgICAgY29uc3Qgc3ltYm9sID0gWk9ORV9TWU1CT0xfUFJFRklYICsgZmFsc2VFdmVudE5hbWU7XG4gICAgICAgIGNvbnN0IHN5bWJvbENhcHR1cmUgPSBaT05FX1NZTUJPTF9QUkVGSVggKyB0cnVlRXZlbnROYW1lO1xuICAgICAgICB6b25lU3ltYm9sRXZlbnROYW1lc1tldmVudE5hbWVdID0ge307XG4gICAgICAgIHpvbmVTeW1ib2xFdmVudE5hbWVzW2V2ZW50TmFtZV1bRkFMU0VfU1RSXSA9IHN5bWJvbDtcbiAgICAgICAgem9uZVN5bWJvbEV2ZW50TmFtZXNbZXZlbnROYW1lXVtUUlVFX1NUUl0gPSBzeW1ib2xDYXB0dXJlO1xuICAgIH1cbiAgICBjb25zdCBFVkVOVF9UQVJHRVQgPSBfZ2xvYmFsWydFdmVudFRhcmdldCddO1xuICAgIGlmICghRVZFTlRfVEFSR0VUIHx8ICFFVkVOVF9UQVJHRVQucHJvdG90eXBlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXBpLnBhdGNoRXZlbnRUYXJnZXQoX2dsb2JhbCwgYXBpLCBbRVZFTlRfVEFSR0VUICYmIEVWRU5UX1RBUkdFVC5wcm90b3R5cGVdKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHBhdGNoRXZlbnQoZ2xvYmFsLCBhcGkpIHtcbiAgICBhcGkucGF0Y2hFdmVudFByb3RvdHlwZShnbG9iYWwsIGFwaSk7XG59XG5cbi8qKlxuICogQGZpbGVvdmVydmlld1xuICogQHN1cHByZXNzIHtnbG9iYWxUaGlzfVxuICovXG5mdW5jdGlvbiBmaWx0ZXJQcm9wZXJ0aWVzKHRhcmdldCwgb25Qcm9wZXJ0aWVzLCBpZ25vcmVQcm9wZXJ0aWVzKSB7XG4gICAgaWYgKCFpZ25vcmVQcm9wZXJ0aWVzIHx8IGlnbm9yZVByb3BlcnRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvblByb3BlcnRpZXM7XG4gICAgfVxuICAgIGNvbnN0IHRpcCA9IGlnbm9yZVByb3BlcnRpZXMuZmlsdGVyKChpcCkgPT4gaXAudGFyZ2V0ID09PSB0YXJnZXQpO1xuICAgIGlmICghdGlwIHx8IHRpcC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9uUHJvcGVydGllcztcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0SWdub3JlUHJvcGVydGllcyA9IHRpcFswXS5pZ25vcmVQcm9wZXJ0aWVzO1xuICAgIHJldHVybiBvblByb3BlcnRpZXMuZmlsdGVyKChvcCkgPT4gdGFyZ2V0SWdub3JlUHJvcGVydGllcy5pbmRleE9mKG9wKSA9PT0gLTEpO1xufVxuZnVuY3Rpb24gcGF0Y2hGaWx0ZXJlZFByb3BlcnRpZXModGFyZ2V0LCBvblByb3BlcnRpZXMsIGlnbm9yZVByb3BlcnRpZXMsIHByb3RvdHlwZSkge1xuICAgIC8vIGNoZWNrIHdoZXRoZXIgdGFyZ2V0IGlzIGF2YWlsYWJsZSwgc29tZXRpbWVzIHRhcmdldCB3aWxsIGJlIHVuZGVmaW5lZFxuICAgIC8vIGJlY2F1c2UgZGlmZmVyZW50IGJyb3dzZXIgb3Igc29tZSAzcmQgcGFydHkgcGx1Z2luLlxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsdGVyZWRQcm9wZXJ0aWVzID0gZmlsdGVyUHJvcGVydGllcyh0YXJnZXQsIG9uUHJvcGVydGllcywgaWdub3JlUHJvcGVydGllcyk7XG4gICAgcGF0Y2hPblByb3BlcnRpZXModGFyZ2V0LCBmaWx0ZXJlZFByb3BlcnRpZXMsIHByb3RvdHlwZSk7XG59XG4vKipcbiAqIEdldCBhbGwgZXZlbnQgbmFtZSBwcm9wZXJ0aWVzIHdoaWNoIHRoZSBldmVudCBuYW1lIHN0YXJ0c1dpdGggYG9uYFxuICogZnJvbSB0aGUgdGFyZ2V0IG9iamVjdCBpdHNlbGYsIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGFyZSBub3QgY29uc2lkZXJlZC5cbiAqL1xuZnVuY3Rpb24gZ2V0T25FdmVudE5hbWVzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAgIC5maWx0ZXIoKG5hbWUpID0+IG5hbWUuc3RhcnRzV2l0aCgnb24nKSAmJiBuYW1lLmxlbmd0aCA+IDIpXG4gICAgICAgIC5tYXAoKG5hbWUpID0+IG5hbWUuc3Vic3RyaW5nKDIpKTtcbn1cbmZ1bmN0aW9uIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoKGFwaSwgX2dsb2JhbCkge1xuICAgIGlmIChpc05vZGUgJiYgIWlzTWl4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKFpvbmVbYXBpLnN5bWJvbCgncGF0Y2hFdmVudHMnKV0pIHtcbiAgICAgICAgLy8gZXZlbnRzIGFyZSBhbHJlYWR5IGJlZW4gcGF0Y2hlZCBieSBsZWdhY3kgcGF0Y2guXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaWdub3JlUHJvcGVydGllcyA9IF9nbG9iYWxbJ19fWm9uZV9pZ25vcmVfb25fcHJvcGVydGllcyddO1xuICAgIC8vIGZvciBicm93c2VycyB0aGF0IHdlIGNhbiBwYXRjaCB0aGUgZGVzY3JpcHRvcjogIENocm9tZSAmIEZpcmVmb3hcbiAgICBsZXQgcGF0Y2hUYXJnZXRzID0gW107XG4gICAgaWYgKGlzQnJvd3Nlcikge1xuICAgICAgICBjb25zdCBpbnRlcm5hbFdpbmRvdyA9IHdpbmRvdztcbiAgICAgICAgcGF0Y2hUYXJnZXRzID0gcGF0Y2hUYXJnZXRzLmNvbmNhdChbXG4gICAgICAgICAgICAnRG9jdW1lbnQnLFxuICAgICAgICAgICAgJ1NWR0VsZW1lbnQnLFxuICAgICAgICAgICAgJ0VsZW1lbnQnLFxuICAgICAgICAgICAgJ0hUTUxFbGVtZW50JyxcbiAgICAgICAgICAgICdIVE1MQm9keUVsZW1lbnQnLFxuICAgICAgICAgICAgJ0hUTUxNZWRpYUVsZW1lbnQnLFxuICAgICAgICAgICAgJ0hUTUxGcmFtZVNldEVsZW1lbnQnLFxuICAgICAgICAgICAgJ0hUTUxGcmFtZUVsZW1lbnQnLFxuICAgICAgICAgICAgJ0hUTUxJRnJhbWVFbGVtZW50JyxcbiAgICAgICAgICAgICdIVE1MTWFycXVlZUVsZW1lbnQnLFxuICAgICAgICAgICAgJ1dvcmtlcicsXG4gICAgICAgIF0pO1xuICAgICAgICBjb25zdCBpZ25vcmVFcnJvclByb3BlcnRpZXMgPSBpc0lFKClcbiAgICAgICAgICAgID8gW3sgdGFyZ2V0OiBpbnRlcm5hbFdpbmRvdywgaWdub3JlUHJvcGVydGllczogWydlcnJvciddIH1dXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICAvLyBpbiBJRS9FZGdlLCBvblByb3Agbm90IGV4aXN0IGluIHdpbmRvdyBvYmplY3QsIGJ1dCBpbiBXaW5kb3dQcm90b3R5cGVcbiAgICAgICAgLy8gc28gd2UgbmVlZCB0byBwYXNzIFdpbmRvd1Byb3RvdHlwZSB0byBjaGVjayBvblByb3AgZXhpc3Qgb3Igbm90XG4gICAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKGludGVybmFsV2luZG93LCBnZXRPbkV2ZW50TmFtZXMoaW50ZXJuYWxXaW5kb3cpLCBpZ25vcmVQcm9wZXJ0aWVzID8gaWdub3JlUHJvcGVydGllcy5jb25jYXQoaWdub3JlRXJyb3JQcm9wZXJ0aWVzKSA6IGlnbm9yZVByb3BlcnRpZXMsIE9iamVjdEdldFByb3RvdHlwZU9mKGludGVybmFsV2luZG93KSk7XG4gICAgfVxuICAgIHBhdGNoVGFyZ2V0cyA9IHBhdGNoVGFyZ2V0cy5jb25jYXQoW1xuICAgICAgICAnWE1MSHR0cFJlcXVlc3QnLFxuICAgICAgICAnWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCcsXG4gICAgICAgICdJREJJbmRleCcsXG4gICAgICAgICdJREJSZXF1ZXN0JyxcbiAgICAgICAgJ0lEQk9wZW5EQlJlcXVlc3QnLFxuICAgICAgICAnSURCRGF0YWJhc2UnLFxuICAgICAgICAnSURCVHJhbnNhY3Rpb24nLFxuICAgICAgICAnSURCQ3Vyc29yJyxcbiAgICAgICAgJ1dlYlNvY2tldCcsXG4gICAgXSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRjaFRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gX2dsb2JhbFtwYXRjaFRhcmdldHNbaV1dO1xuICAgICAgICB0YXJnZXQgJiZcbiAgICAgICAgICAgIHRhcmdldC5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgIHBhdGNoRmlsdGVyZWRQcm9wZXJ0aWVzKHRhcmdldC5wcm90b3R5cGUsIGdldE9uRXZlbnROYW1lcyh0YXJnZXQucHJvdG90eXBlKSwgaWdub3JlUHJvcGVydGllcyk7XG4gICAgfVxufVxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBzdXBwcmVzcyB7bWlzc2luZ1JlcXVpcmV9XG4gKi9cbmZ1bmN0aW9uIHBhdGNoQnJvd3Nlcihab25lKSB7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ2xlZ2FjeScsIChnbG9iYWwpID0+IHtcbiAgICAgICAgY29uc3QgbGVnYWN5UGF0Y2ggPSBnbG9iYWxbWm9uZS5fX3N5bWJvbF9fKCdsZWdhY3lQYXRjaCcpXTtcbiAgICAgICAgaWYgKGxlZ2FjeVBhdGNoKSB7XG4gICAgICAgICAgICBsZWdhY3lQYXRjaCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ3RpbWVycycsIChnbG9iYWwpID0+IHtcbiAgICAgICAgY29uc3Qgc2V0ID0gJ3NldCc7XG4gICAgICAgIGNvbnN0IGNsZWFyID0gJ2NsZWFyJztcbiAgICAgICAgcGF0Y2hUaW1lcihnbG9iYWwsIHNldCwgY2xlYXIsICdUaW1lb3V0Jyk7XG4gICAgICAgIHBhdGNoVGltZXIoZ2xvYmFsLCBzZXQsIGNsZWFyLCAnSW50ZXJ2YWwnKTtcbiAgICAgICAgcGF0Y2hUaW1lcihnbG9iYWwsIHNldCwgY2xlYXIsICdJbW1lZGlhdGUnKTtcbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgKGdsb2JhbCkgPT4ge1xuICAgICAgICBwYXRjaFRpbWVyKGdsb2JhbCwgJ3JlcXVlc3QnLCAnY2FuY2VsJywgJ0FuaW1hdGlvbkZyYW1lJyk7XG4gICAgICAgIHBhdGNoVGltZXIoZ2xvYmFsLCAnbW96UmVxdWVzdCcsICdtb3pDYW5jZWwnLCAnQW5pbWF0aW9uRnJhbWUnKTtcbiAgICAgICAgcGF0Y2hUaW1lcihnbG9iYWwsICd3ZWJraXRSZXF1ZXN0JywgJ3dlYmtpdENhbmNlbCcsICdBbmltYXRpb25GcmFtZScpO1xuICAgIH0pO1xuICAgIFpvbmUuX19sb2FkX3BhdGNoKCdibG9ja2luZycsIChnbG9iYWwsIFpvbmUpID0+IHtcbiAgICAgICAgY29uc3QgYmxvY2tpbmdNZXRob2RzID0gWydhbGVydCcsICdwcm9tcHQnLCAnY29uZmlybSddO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NraW5nTWV0aG9kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGJsb2NraW5nTWV0aG9kc1tpXTtcbiAgICAgICAgICAgIHBhdGNoTWV0aG9kKGdsb2JhbCwgbmFtZSwgKGRlbGVnYXRlLCBzeW1ib2wsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHMsIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFpvbmUuY3VycmVudC5ydW4oZGVsZWdhdGUsIGdsb2JhbCwgYXJncywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ0V2ZW50VGFyZ2V0JywgKGdsb2JhbCwgWm9uZSwgYXBpKSA9PiB7XG4gICAgICAgIHBhdGNoRXZlbnQoZ2xvYmFsLCBhcGkpO1xuICAgICAgICBldmVudFRhcmdldFBhdGNoKGdsb2JhbCwgYXBpKTtcbiAgICAgICAgLy8gcGF0Y2ggWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCdzIGFkZEV2ZW50TGlzdGVuZXIvcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICAgICAgICBjb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gZ2xvYmFsWydYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0J107XG4gICAgICAgIGlmIChYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ICYmIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlKSB7XG4gICAgICAgICAgICBhcGkucGF0Y2hFdmVudFRhcmdldChnbG9iYWwsIGFwaSwgW1hNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgnTXV0YXRpb25PYnNlcnZlcicsIChnbG9iYWwsIFpvbmUsIGFwaSkgPT4ge1xuICAgICAgICBwYXRjaENsYXNzKCdNdXRhdGlvbk9ic2VydmVyJyk7XG4gICAgICAgIHBhdGNoQ2xhc3MoJ1dlYktpdE11dGF0aW9uT2JzZXJ2ZXInKTtcbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInLCAoZ2xvYmFsLCBab25lLCBhcGkpID0+IHtcbiAgICAgICAgcGF0Y2hDbGFzcygnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInKTtcbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgnRmlsZVJlYWRlcicsIChnbG9iYWwsIFpvbmUsIGFwaSkgPT4ge1xuICAgICAgICBwYXRjaENsYXNzKCdGaWxlUmVhZGVyJyk7XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ29uX3Byb3BlcnR5JywgKGdsb2JhbCwgWm9uZSwgYXBpKSA9PiB7XG4gICAgICAgIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoKGFwaSwgZ2xvYmFsKTtcbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgnY3VzdG9tRWxlbWVudHMnLCAoZ2xvYmFsLCBab25lLCBhcGkpID0+IHtcbiAgICAgICAgcGF0Y2hDdXN0b21FbGVtZW50cyhnbG9iYWwsIGFwaSk7XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ1hIUicsIChnbG9iYWwsIFpvbmUpID0+IHtcbiAgICAgICAgLy8gVHJlYXQgWE1MSHR0cFJlcXVlc3QgYXMgYSBtYWNyb3Rhc2suXG4gICAgICAgIHBhdGNoWEhSKGdsb2JhbCk7XG4gICAgICAgIGNvbnN0IFhIUl9UQVNLID0gem9uZVN5bWJvbCgneGhyVGFzaycpO1xuICAgICAgICBjb25zdCBYSFJfU1lOQyA9IHpvbmVTeW1ib2woJ3hoclN5bmMnKTtcbiAgICAgICAgY29uc3QgWEhSX0xJU1RFTkVSID0gem9uZVN5bWJvbCgneGhyTGlzdGVuZXInKTtcbiAgICAgICAgY29uc3QgWEhSX1NDSEVEVUxFRCA9IHpvbmVTeW1ib2woJ3hoclNjaGVkdWxlZCcpO1xuICAgICAgICBjb25zdCBYSFJfVVJMID0gem9uZVN5bWJvbCgneGhyVVJMJyk7XG4gICAgICAgIGNvbnN0IFhIUl9FUlJPUl9CRUZPUkVfU0NIRURVTEVEID0gem9uZVN5bWJvbCgneGhyRXJyb3JCZWZvcmVTY2hlZHVsZWQnKTtcbiAgICAgICAgZnVuY3Rpb24gcGF0Y2hYSFIod2luZG93KSB7XG4gICAgICAgICAgICBjb25zdCBYTUxIdHRwUmVxdWVzdCA9IHdpbmRvd1snWE1MSHR0cFJlcXVlc3QnXTtcbiAgICAgICAgICAgIGlmICghWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAvLyBYTUxIdHRwUmVxdWVzdCBpcyBub3QgYXZhaWxhYmxlIGluIHNlcnZpY2Ugd29ya2VyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgWE1MSHR0cFJlcXVlc3RQcm90b3R5cGUgPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGU7XG4gICAgICAgICAgICBmdW5jdGlvbiBmaW5kUGVuZGluZ1Rhc2sodGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtYSFJfVEFTS107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb3JpQWRkTGlzdGVuZXIgPSBYTUxIdHRwUmVxdWVzdFByb3RvdHlwZVtaT05FX1NZTUJPTF9BRERfRVZFTlRfTElTVEVORVJdO1xuICAgICAgICAgICAgbGV0IG9yaVJlbW92ZUxpc3RlbmVyID0gWE1MSHR0cFJlcXVlc3RQcm90b3R5cGVbWk9ORV9TWU1CT0xfUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXTtcbiAgICAgICAgICAgIGlmICghb3JpQWRkTGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gd2luZG93WydYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0J107XG4gICAgICAgICAgICAgICAgaWYgKFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldFByb3RvdHlwZSA9IFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlO1xuICAgICAgICAgICAgICAgICAgICBvcmlBZGRMaXN0ZW5lciA9IFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXRQcm90b3R5cGVbWk9ORV9TWU1CT0xfQUREX0VWRU5UX0xJU1RFTkVSXTtcbiAgICAgICAgICAgICAgICAgICAgb3JpUmVtb3ZlTGlzdGVuZXIgPSBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0UHJvdG90eXBlW1pPTkVfU1lNQk9MX1JFTU9WRV9FVkVOVF9MSVNURU5FUl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgUkVBRFlfU1RBVEVfQ0hBTkdFID0gJ3JlYWR5c3RhdGVjaGFuZ2UnO1xuICAgICAgICAgICAgY29uc3QgU0NIRURVTEVEID0gJ3NjaGVkdWxlZCc7XG4gICAgICAgICAgICBmdW5jdGlvbiBzY2hlZHVsZVRhc2sodGFzaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0YXNrLmRhdGE7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZGF0YS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W1hIUl9TQ0hFRFVMRURdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W1hIUl9FUlJPUl9CRUZPUkVfU0NIRURVTEVEXSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBleGlzdGluZyBldmVudCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gdGFyZ2V0W1hIUl9MSVNURU5FUl07XG4gICAgICAgICAgICAgICAgaWYgKCFvcmlBZGRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBvcmlBZGRMaXN0ZW5lciA9IHRhcmdldFtaT05FX1NZTUJPTF9BRERfRVZFTlRfTElTVEVORVJdO1xuICAgICAgICAgICAgICAgICAgICBvcmlSZW1vdmVMaXN0ZW5lciA9IHRhcmdldFtaT05FX1NZTUJPTF9SRU1PVkVfRVZFTlRfTElTVEVORVJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgb3JpUmVtb3ZlTGlzdGVuZXIuY2FsbCh0YXJnZXQsIFJFQURZX1NUQVRFX0NIQU5HRSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXdMaXN0ZW5lciA9ICh0YXJnZXRbWEhSX0xJU1RFTkVSXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5yZWFkeVN0YXRlID09PSB0YXJnZXQuRE9ORSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc29tZXRpbWVzIG9uIHNvbWUgYnJvd3NlcnMgWE1MSHR0cFJlcXVlc3Qgd2lsbCBmaXJlIG9ucmVhZHlzdGF0ZWNoYW5nZSB3aXRoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWFkeVN0YXRlPTQgbXVsdGlwbGUgdGltZXMsIHNvIHdlIG5lZWQgdG8gY2hlY2sgdGFzayBzdGF0ZSBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYWJvcnRlZCAmJiB0YXJnZXRbWEhSX1NDSEVEVUxFRF0gJiYgdGFzay5zdGF0ZSA9PT0gU0NIRURVTEVEKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGUgeGhyIGhhcyByZWdpc3RlcmVkIG9ubG9hZCBsaXN0ZW5lclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHRoZSB0YXNrIHNob3VsZCBpbnZva2UgYWZ0ZXIgYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25sb2FkIGxpc3RlbmVycyBmaW5pc2guXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxzbyBpZiB0aGUgcmVxdWVzdCBmYWlsZWQgd2l0aG91dCByZXNwb25zZSAoc3RhdHVzID0gMCksIHRoZSBsb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIG5vdCBiZSB0cmlnZ2VyZWQsIGluIHRoYXQgY2FzZSwgd2Ugc2hvdWxkIGFsc28gaW52b2tlIHRoZSBwbGFjZWhvbGRlciBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGNsb3NlIHRoZSBYTUxIdHRwUmVxdWVzdDo6c2VuZCBtYWNyb1Rhc2suXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzg3OTVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2FkVGFza3MgPSB0YXJnZXRbWm9uZS5fX3N5bWJvbF9fKCdsb2FkZmFsc2UnKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5zdGF0dXMgIT09IDAgJiYgbG9hZFRhc2tzICYmIGxvYWRUYXNrcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9yaUludm9rZSA9IHRhc2suaW52b2tlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmludm9rZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdG8gbG9hZCB0aGUgdGFza3MgYWdhaW4sIGJlY2F1c2UgaW4gb3RoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxvYWQgbGlzdGVuZXIsIHRoZXkgbWF5IHJlbW92ZSB0aGVtc2VsdmVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2FkVGFza3MgPSB0YXJnZXRbWm9uZS5fX3N5bWJvbF9fKCdsb2FkZmFsc2UnKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvYWRUYXNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2FkVGFza3NbaV0gPT09IHRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFRhc2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRhdGEuYWJvcnRlZCAmJiB0YXNrLnN0YXRlID09PSBTQ0hFRFVMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlJbnZva2UuY2FsbCh0YXNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFkYXRhLmFib3J0ZWQgJiYgdGFyZ2V0W1hIUl9TQ0hFRFVMRURdID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVycm9yIG9jY3VycyB3aGVuIHhoci5zZW5kKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbWEhSX0VSUk9SX0JFRk9SRV9TQ0hFRFVMRURdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG9yaUFkZExpc3RlbmVyLmNhbGwodGFyZ2V0LCBSRUFEWV9TVEFURV9DSEFOR0UsIG5ld0xpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdG9yZWRUYXNrID0gdGFyZ2V0W1hIUl9UQVNLXTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0b3JlZFRhc2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W1hIUl9UQVNLXSA9IHRhc2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbmROYXRpdmUuYXBwbHkodGFyZ2V0LCBkYXRhLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHRhcmdldFtYSFJfU0NIRURVTEVEXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBwbGFjZWhvbGRlckNhbGxiYWNrKCkgeyB9XG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhclRhc2sodGFzaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0YXNrLmRhdGE7XG4gICAgICAgICAgICAgICAgLy8gTm90ZSAtIGlkZWFsbHksIHdlIHdvdWxkIGNhbGwgZGF0YS50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lciBoZXJlLCBidXQgaXQncyB0b28gbGF0ZVxuICAgICAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgaXQgZnJvbSBmaXJpbmcuIFNvIGluc3RlYWQsIHdlIHN0b3JlIGluZm8gZm9yIHRoZSBldmVudCBsaXN0ZW5lci5cbiAgICAgICAgICAgICAgICBkYXRhLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBhYm9ydE5hdGl2ZS5hcHBseShkYXRhLnRhcmdldCwgZGF0YS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG9wZW5OYXRpdmUgPSBwYXRjaE1ldGhvZChYTUxIdHRwUmVxdWVzdFByb3RvdHlwZSwgJ29wZW4nLCAoKSA9PiBmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgICAgICAgIHNlbGZbWEhSX1NZTkNdID0gYXJnc1syXSA9PSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxmW1hIUl9VUkxdID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3Blbk5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgWE1MSFRUUFJFUVVFU1RfU09VUkNFID0gJ1hNTEh0dHBSZXF1ZXN0LnNlbmQnO1xuICAgICAgICAgICAgY29uc3QgZmV0Y2hUYXNrQWJvcnRpbmcgPSB6b25lU3ltYm9sKCdmZXRjaFRhc2tBYm9ydGluZycpO1xuICAgICAgICAgICAgY29uc3QgZmV0Y2hUYXNrU2NoZWR1bGluZyA9IHpvbmVTeW1ib2woJ2ZldGNoVGFza1NjaGVkdWxpbmcnKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbmROYXRpdmUgPSBwYXRjaE1ldGhvZChYTUxIdHRwUmVxdWVzdFByb3RvdHlwZSwgJ3NlbmQnLCAoKSA9PiBmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgICAgICAgIGlmIChab25lLmN1cnJlbnRbZmV0Y2hUYXNrU2NoZWR1bGluZ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYSBmZXRjaCBpcyBzY2hlZHVsaW5nLCBzbyB3ZSBhcmUgdXNpbmcgeGhyIHRvIHBvbHlmaWxsIGZldGNoXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBiZWNhdXNlIHdlIGFscmVhZHkgc2NoZWR1bGUgbWFjcm9UYXNrIGZvciBmZXRjaCwgd2Ugc2hvdWxkXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBzY2hlZHVsZSBhIG1hY3JvVGFzayBmb3IgeGhyIGFnYWluXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZW5kTmF0aXZlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2VsZltYSFJfU1lOQ10pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIFhIUiBpcyBzeW5jIHRoZXJlIGlzIG5vIHRhc2sgdG8gc2NoZWR1bGUsIGp1c3QgZXhlY3V0ZSB0aGUgY29kZS5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlbmROYXRpdmUuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBzZWxmLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBzZWxmW1hIUl9VUkxdLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNQZXJpb2RpYzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2sgPSBzY2hlZHVsZU1hY3JvVGFza1dpdGhDdXJyZW50Wm9uZShYTUxIVFRQUkVRVUVTVF9TT1VSQ0UsIHBsYWNlaG9sZGVyQ2FsbGJhY2ssIG9wdGlvbnMsIHNjaGVkdWxlVGFzaywgY2xlYXJUYXNrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGZbWEhSX0VSUk9SX0JFRk9SRV9TQ0hFRFVMRURdID09PSB0cnVlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhb3B0aW9ucy5hYm9ydGVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXNrLnN0YXRlID09PSBTQ0hFRFVMRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHhociByZXF1ZXN0IHRocm93IGVycm9yIHdoZW4gc2VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGludm9rZSB0YXNrIGluc3RlYWQgb2YgbGVhdmluZyBhIHNjaGVkdWxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGVuZGluZyBtYWNyb1Rhc2tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suaW52b2tlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IGFib3J0TmF0aXZlID0gcGF0Y2hNZXRob2QoWE1MSHR0cFJlcXVlc3RQcm90b3R5cGUsICdhYm9ydCcsICgpID0+IGZ1bmN0aW9uIChzZWxmLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IGZpbmRQZW5kaW5nVGFzayhzZWxmKTtcbiAgICAgICAgICAgICAgICBpZiAodGFzayAmJiB0eXBlb2YgdGFzay50eXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBYSFIgaGFzIGFscmVhZHkgY29tcGxldGVkLCBkbyBub3RoaW5nLlxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgWEhSIGhhcyBhbHJlYWR5IGJlZW4gYWJvcnRlZCwgZG8gbm90aGluZy5cbiAgICAgICAgICAgICAgICAgICAgLy8gRml4ICM1NjksIGNhbGwgYWJvcnQgbXVsdGlwbGUgdGltZXMgYmVmb3JlIGRvbmUgd2lsbCBjYXVzZVxuICAgICAgICAgICAgICAgICAgICAvLyBtYWNyb1Rhc2sgdGFzayBjb3VudCBiZSBuZWdhdGl2ZSBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhc2suY2FuY2VsRm4gPT0gbnVsbCB8fCAodGFzay5kYXRhICYmIHRhc2suZGF0YS5hYm9ydGVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRhc2suem9uZS5jYW5jZWxUYXNrKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChab25lLmN1cnJlbnRbZmV0Y2hUYXNrQWJvcnRpbmddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhYm9ydCBpcyBjYWxsZWQgZnJvbSBmZXRjaCBwb2x5ZmlsbCwgd2UgbmVlZCB0byBjYWxsIG5hdGl2ZSBhYm9ydCBvZiBYSFIuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhYm9ydE5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBhcmUgdHJ5aW5nIHRvIGFib3J0IGFuIFhIUiB3aGljaCBoYXMgbm90IHlldCBiZWVuIHNlbnQsIHNvIHRoZXJlIGlzIG5vXG4gICAgICAgICAgICAgICAgLy8gdGFza1xuICAgICAgICAgICAgICAgIC8vIHRvIGNhbmNlbC4gRG8gbm90aGluZy5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ2dlb2xvY2F0aW9uJywgKGdsb2JhbCkgPT4ge1xuICAgICAgICAvLy8gR0VPX0xPQ0FUSU9OXG4gICAgICAgIGlmIChnbG9iYWxbJ25hdmlnYXRvciddICYmIGdsb2JhbFsnbmF2aWdhdG9yJ10uZ2VvbG9jYXRpb24pIHtcbiAgICAgICAgICAgIHBhdGNoUHJvdG90eXBlKGdsb2JhbFsnbmF2aWdhdG9yJ10uZ2VvbG9jYXRpb24sIFsnZ2V0Q3VycmVudFBvc2l0aW9uJywgJ3dhdGNoUG9zaXRpb24nXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBab25lLl9fbG9hZF9wYXRjaCgnUHJvbWlzZVJlamVjdGlvbkV2ZW50JywgKGdsb2JhbCwgWm9uZSkgPT4ge1xuICAgICAgICAvLyBoYW5kbGUgdW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uXG4gICAgICAgIGZ1bmN0aW9uIGZpbmRQcm9taXNlUmVqZWN0aW9uSGFuZGxlcihldnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudFRhc2tzID0gZmluZEV2ZW50VGFza3MoZ2xvYmFsLCBldnROYW1lKTtcbiAgICAgICAgICAgICAgICBldmVudFRhc2tzLmZvckVhY2goKGV2ZW50VGFzaykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3dzIGhhcyBhZGRlZCB1bmhhbmRsZWRyZWplY3Rpb24gZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gdHJpZ2dlciB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgUHJvbWlzZVJlamVjdGlvbkV2ZW50ID0gZ2xvYmFsWydQcm9taXNlUmVqZWN0aW9uRXZlbnQnXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFByb21pc2VSZWplY3Rpb25FdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IFByb21pc2VSZWplY3Rpb25FdmVudChldnROYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZTogZS5wcm9taXNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYXNvbjogZS5yZWplY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VGFzay5pbnZva2UoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2xvYmFsWydQcm9taXNlUmVqZWN0aW9uRXZlbnQnXSkge1xuICAgICAgICAgICAgWm9uZVt6b25lU3ltYm9sKCd1bmhhbmRsZWRQcm9taXNlUmVqZWN0aW9uSGFuZGxlcicpXSA9XG4gICAgICAgICAgICAgICAgZmluZFByb21pc2VSZWplY3Rpb25IYW5kbGVyKCd1bmhhbmRsZWRyZWplY3Rpb24nKTtcbiAgICAgICAgICAgIFpvbmVbem9uZVN5bWJvbCgncmVqZWN0aW9uSGFuZGxlZEhhbmRsZXInKV0gPVxuICAgICAgICAgICAgICAgIGZpbmRQcm9taXNlUmVqZWN0aW9uSGFuZGxlcigncmVqZWN0aW9uaGFuZGxlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgWm9uZS5fX2xvYWRfcGF0Y2goJ3F1ZXVlTWljcm90YXNrJywgKGdsb2JhbCwgWm9uZSwgYXBpKSA9PiB7XG4gICAgICAgIHBhdGNoUXVldWVNaWNyb3Rhc2soZ2xvYmFsLCBhcGkpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwYXRjaFByb21pc2UoWm9uZSkge1xuICAgIFpvbmUuX19sb2FkX3BhdGNoKCdab25lQXdhcmVQcm9taXNlJywgKGdsb2JhbCwgWm9uZSwgYXBpKSA9PiB7XG4gICAgICAgIGNvbnN0IE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICAgICAgIGNvbnN0IE9iamVjdERlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgICAgICBmdW5jdGlvbiByZWFkYWJsZU9iamVjdFRvU3RyaW5nKG9iaikge1xuICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmoudG9TdHJpbmcgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChjbGFzc05hbWUgPyBjbGFzc05hbWUgOiAnJykgKyAnOiAnICsgSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmogPyBvYmoudG9TdHJpbmcoKSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IF9fc3ltYm9sX18gPSBhcGkuc3ltYm9sO1xuICAgICAgICBjb25zdCBfdW5jYXVnaHRQcm9taXNlRXJyb3JzID0gW107XG4gICAgICAgIGNvbnN0IGlzRGlzYWJsZVdyYXBwaW5nVW5jYXVnaHRQcm9taXNlUmVqZWN0aW9uID0gZ2xvYmFsW19fc3ltYm9sX18oJ0RJU0FCTEVfV1JBUFBJTkdfVU5DQVVHSFRfUFJPTUlTRV9SRUpFQ1RJT04nKV0gIT09IGZhbHNlO1xuICAgICAgICBjb25zdCBzeW1ib2xQcm9taXNlID0gX19zeW1ib2xfXygnUHJvbWlzZScpO1xuICAgICAgICBjb25zdCBzeW1ib2xUaGVuID0gX19zeW1ib2xfXygndGhlbicpO1xuICAgICAgICBjb25zdCBjcmVhdGlvblRyYWNlID0gJ19fY3JlYXRpb25UcmFjZV9fJztcbiAgICAgICAgYXBpLm9uVW5oYW5kbGVkRXJyb3IgPSAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGFwaS5zaG93VW5jYXVnaHRFcnJvcigpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVqZWN0aW9uID0gZSAmJiBlLnJlamVjdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAocmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuaGFuZGxlZCBQcm9taXNlIHJlamVjdGlvbjonLCByZWplY3Rpb24gaW5zdGFuY2VvZiBFcnJvciA/IHJlamVjdGlvbi5tZXNzYWdlIDogcmVqZWN0aW9uLCAnOyBab25lOicsIGUuem9uZS5uYW1lLCAnOyBUYXNrOicsIGUudGFzayAmJiBlLnRhc2suc291cmNlLCAnOyBWYWx1ZTonLCByZWplY3Rpb24sIHJlamVjdGlvbiBpbnN0YW5jZW9mIEVycm9yID8gcmVqZWN0aW9uLnN0YWNrIDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBhcGkubWljcm90YXNrRHJhaW5Eb25lID0gKCkgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKF91bmNhdWdodFByb21pc2VFcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdW5jYXVnaHRQcm9taXNlRXJyb3IgPSBfdW5jYXVnaHRQcm9taXNlRXJyb3JzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdW5jYXVnaHRQcm9taXNlRXJyb3Iuem9uZS5ydW5HdWFyZGVkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1bmNhdWdodFByb21pc2VFcnJvci50aHJvd09yaWdpbmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgdW5jYXVnaHRQcm9taXNlRXJyb3IucmVqZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgdW5jYXVnaHRQcm9taXNlRXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlVW5oYW5kbGVkUmVqZWN0aW9uKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IFVOSEFORExFRF9QUk9NSVNFX1JFSkVDVElPTl9IQU5ETEVSX1NZTUJPTCA9IF9fc3ltYm9sX18oJ3VuaGFuZGxlZFByb21pc2VSZWplY3Rpb25IYW5kbGVyJyk7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVVuaGFuZGxlZFJlamVjdGlvbihlKSB7XG4gICAgICAgICAgICBhcGkub25VbmhhbmRsZWRFcnJvcihlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IFpvbmVbVU5IQU5ETEVEX1BST01JU0VfUkVKRUNUSU9OX0hBTkRMRVJfU1lNQk9MXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHsgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGlzVGhlbmFibGUodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS50aGVuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmRSZXNvbHV0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZFJlamVjdGlvbihyZWplY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBab25lQXdhcmVQcm9taXNlLnJlamVjdChyZWplY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN5bWJvbFN0YXRlID0gX19zeW1ib2xfXygnc3RhdGUnKTtcbiAgICAgICAgY29uc3Qgc3ltYm9sVmFsdWUgPSBfX3N5bWJvbF9fKCd2YWx1ZScpO1xuICAgICAgICBjb25zdCBzeW1ib2xGaW5hbGx5ID0gX19zeW1ib2xfXygnZmluYWxseScpO1xuICAgICAgICBjb25zdCBzeW1ib2xQYXJlbnRQcm9taXNlVmFsdWUgPSBfX3N5bWJvbF9fKCdwYXJlbnRQcm9taXNlVmFsdWUnKTtcbiAgICAgICAgY29uc3Qgc3ltYm9sUGFyZW50UHJvbWlzZVN0YXRlID0gX19zeW1ib2xfXygncGFyZW50UHJvbWlzZVN0YXRlJyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9ICdQcm9taXNlLnRoZW4nO1xuICAgICAgICBjb25zdCBVTlJFU09MVkVEID0gbnVsbDtcbiAgICAgICAgY29uc3QgUkVTT0xWRUQgPSB0cnVlO1xuICAgICAgICBjb25zdCBSRUpFQ1RFRCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBSRUpFQ1RFRF9OT19DQVRDSCA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIG1ha2VSZXNvbHZlcihwcm9taXNlLCBzdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgc3RhdGUsIHYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKHByb21pc2UsIGZhbHNlLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBEbyBub3QgcmV0dXJuIHZhbHVlIG9yIHlvdSB3aWxsIGJyZWFrIHRoZSBQcm9taXNlIHNwZWMuXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9uY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgd2FzQ2FsbGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gd3JhcHBlcih3cmFwcGVkRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAod2FzQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2FzQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlZEZ1bmN0aW9uLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IFRZUEVfRVJST1IgPSAnUHJvbWlzZSByZXNvbHZlZCB3aXRoIGl0c2VsZic7XG4gICAgICAgIGNvbnN0IENVUlJFTlRfVEFTS19UUkFDRV9TWU1CT0wgPSBfX3N5bWJvbF9fKCdjdXJyZW50VGFza1RyYWNlJyk7XG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvblxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG9uY2VXcmFwcGVyID0gb25jZSgpO1xuICAgICAgICAgICAgaWYgKHByb21pc2UgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihUWVBFX0VSUk9SKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9taXNlW3N5bWJvbFN0YXRlXSA9PT0gVU5SRVNPTFZFRCkge1xuICAgICAgICAgICAgICAgIC8vIHNob3VsZCBvbmx5IGdldCB2YWx1ZS50aGVuIG9uY2UgYmFzZWQgb24gcHJvbWlzZSBzcGVjLlxuICAgICAgICAgICAgICAgIGxldCB0aGVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4gPSB2YWx1ZSAmJiB2YWx1ZS50aGVuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgb25jZVdyYXBwZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiAodmFsdWUgaW5zdGFuY2VvZiBab25lQXdhcmVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSBpbnN0YW5jZW9mIFpvbmVBd2FyZVByb21pc2UgJiZcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuaGFzT3duUHJvcGVydHkoc3ltYm9sU3RhdGUpICYmXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmhhc093blByb3BlcnR5KHN5bWJvbFZhbHVlKSAmJlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVtzeW1ib2xTdGF0ZV0gIT09IFVOUkVTT0xWRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJSZWplY3RlZE5vQ2F0Y2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCB2YWx1ZVtzeW1ib2xTdGF0ZV0sIHZhbHVlW3N5bWJvbFZhbHVlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlICE9PSBSRUpFQ1RFRCAmJiB0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLCBvbmNlV3JhcHBlcihtYWtlUmVzb2x2ZXIocHJvbWlzZSwgc3RhdGUpKSwgb25jZVdyYXBwZXIobWFrZVJlc29sdmVyKHByb21pc2UsIGZhbHNlKSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uY2VXcmFwcGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShwcm9taXNlLCBmYWxzZSwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2Vbc3ltYm9sU3RhdGVdID0gc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXVlID0gcHJvbWlzZVtzeW1ib2xWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2Vbc3ltYm9sVmFsdWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9taXNlW3N5bWJvbEZpbmFsbHldID09PSBzeW1ib2xGaW5hbGx5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcHJvbWlzZSBpcyBnZW5lcmF0ZWQgYnkgUHJvbWlzZS5wcm90b3R5cGUuZmluYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlID09PSBSRVNPTFZFRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBzdGF0ZSBpcyByZXNvbHZlZCwgc2hvdWxkIGlnbm9yZSB0aGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdXNlIHBhcmVudCBwcm9taXNlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVtzeW1ib2xTdGF0ZV0gPSBwcm9taXNlW3N5bWJvbFBhcmVudFByb21pc2VTdGF0ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZVtzeW1ib2xWYWx1ZV0gPSBwcm9taXNlW3N5bWJvbFBhcmVudFByb21pc2VWYWx1ZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjb3JkIHRhc2sgaW5mb3JtYXRpb24gaW4gdmFsdWUgd2hlbiBlcnJvciBvY2N1cnMsIHNvIHdlIGNhblxuICAgICAgICAgICAgICAgICAgICAvLyBkbyBzb21lIGFkZGl0aW9uYWwgd29yayBzdWNoIGFzIHJlbmRlciBsb25nU3RhY2tUcmFjZVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUgPT09IFJFSkVDVEVEICYmIHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGxvbmdTdGFja1RyYWNlWm9uZSBpcyBoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmFjZSA9IFpvbmUuY3VycmVudFRhc2sgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBab25lLmN1cnJlbnRUYXNrLmRhdGEgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBab25lLmN1cnJlbnRUYXNrLmRhdGFbY3JlYXRpb25UcmFjZV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmx5IGtlZXAgdGhlIGxvbmcgc3RhY2sgdHJhY2UgaW50byBlcnJvciB3aGVuIGluIGxvbmdTdGFja1RyYWNlWm9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdERlZmluZVByb3BlcnR5KHZhbHVlLCBDVVJSRU5UX1RBU0tfVFJBQ0VfU1lNQk9MLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdHJhY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZHVsZVJlc29sdmVPclJlamVjdChwcm9taXNlLCBxdWV1ZVtpKytdLCBxdWV1ZVtpKytdLCBxdWV1ZVtpKytdLCBxdWV1ZVtpKytdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09IDAgJiYgc3RhdGUgPT0gUkVKRUNURUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2Vbc3ltYm9sU3RhdGVdID0gUkVKRUNURURfTk9fQ0FUQ0g7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdW5jYXVnaHRQcm9taXNlRXJyb3IgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSGVyZSB3ZSB0aHJvd3MgYSBuZXcgRXJyb3IgdG8gcHJpbnQgbW9yZSByZWFkYWJsZSBlcnJvciBsb2dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgaWYgdGhlIHZhbHVlIGlzIG5vdCBhbiBlcnJvciwgem9uZS5qcyBidWlsZHMgYW4gYEVycm9yYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdCBoZXJlIHRvIGF0dGFjaCB0aGUgc3RhY2sgaW5mb3JtYXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNhdWdodCAoaW4gcHJvbWlzZSk6ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkYWJsZU9iamVjdFRvU3RyaW5nKHZhbHVlKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSAmJiB2YWx1ZS5zdGFjayA/ICdcXG4nICsgdmFsdWUuc3RhY2sgOiAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuY2F1Z2h0UHJvbWlzZUVycm9yID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGlzYWJsZVdyYXBwaW5nVW5jYXVnaHRQcm9taXNlUmVqZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgZGlzYWJsZSB3cmFwcGluZyB1bmNhdWdodCBwcm9taXNlIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSB0aGUgdmFsdWUgaW5zdGVhZCBvZiB3cmFwcGluZyBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmNhdWdodFByb21pc2VFcnJvci50aHJvd09yaWdpbmFsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVuY2F1Z2h0UHJvbWlzZUVycm9yLnJlamVjdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jYXVnaHRQcm9taXNlRXJyb3IucHJvbWlzZSA9IHByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmNhdWdodFByb21pc2VFcnJvci56b25lID0gWm9uZS5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jYXVnaHRQcm9taXNlRXJyb3IudGFzayA9IFpvbmUuY3VycmVudFRhc2s7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdW5jYXVnaHRQcm9taXNlRXJyb3JzLnB1c2godW5jYXVnaHRQcm9taXNlRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnNjaGVkdWxlTWljcm9UYXNrKCk7IC8vIHRvIG1ha2Ugc3VyZSB0aGF0IGl0IGlzIHJ1bm5pbmdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlc29sdmluZyBhbiBhbHJlYWR5IHJlc29sdmVkIHByb21pc2UgaXMgYSBub29wLlxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgUkVKRUNUSU9OX0hBTkRMRURfSEFORExFUiA9IF9fc3ltYm9sX18oJ3JlamVjdGlvbkhhbmRsZWRIYW5kbGVyJyk7XG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyUmVqZWN0ZWROb0NhdGNoKHByb21pc2UpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlW3N5bWJvbFN0YXRlXSA9PT0gUkVKRUNURURfTk9fQ0FUQ0gpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCBubyBjYXRjaCBzdGF0dXNcbiAgICAgICAgICAgICAgICAvLyBhbmQgcXVldWUubGVuZ3RoID4gMCwgbWVhbnMgdGhlcmUgaXMgYSBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICAgICAgLy8gaGVyZSB0byBoYW5kbGUgdGhlIHJlamVjdGVkIHByb21pc2UsIHdlIHNob3VsZCB0cmlnZ2VyXG4gICAgICAgICAgICAgICAgLy8gd2luZG93cy5yZWplY3Rpb25oYW5kbGVkIGV2ZW50SGFuZGxlciBvciBub2RlanMgcmVqZWN0aW9uSGFuZGxlZFxuICAgICAgICAgICAgICAgIC8vIGV2ZW50SGFuZGxlclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBab25lW1JFSkVDVElPTl9IQU5ETEVEX0hBTkRMRVJdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlciAmJiB0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIHsgcmVqZWN0aW9uOiBwcm9taXNlW3N5bWJvbFZhbHVlXSwgcHJvbWlzZTogcHJvbWlzZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7IH1cbiAgICAgICAgICAgICAgICBwcm9taXNlW3N5bWJvbFN0YXRlXSA9IFJFSkVDVEVEO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3VuY2F1Z2h0UHJvbWlzZUVycm9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvbWlzZSA9PT0gX3VuY2F1Z2h0UHJvbWlzZUVycm9yc1tpXS5wcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdW5jYXVnaHRQcm9taXNlRXJyb3JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzY2hlZHVsZVJlc29sdmVPclJlamVjdChwcm9taXNlLCB6b25lLCBjaGFpblByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICAgICAgICBjbGVhclJlamVjdGVkTm9DYXRjaChwcm9taXNlKTtcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VTdGF0ZSA9IHByb21pc2Vbc3ltYm9sU3RhdGVdO1xuICAgICAgICAgICAgY29uc3QgZGVsZWdhdGUgPSBwcm9taXNlU3RhdGVcbiAgICAgICAgICAgICAgICA/IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICAgICA/IG9uRnVsZmlsbGVkXG4gICAgICAgICAgICAgICAgICAgIDogZm9yd2FyZFJlc29sdXRpb25cbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgID8gb25SZWplY3RlZFxuICAgICAgICAgICAgICAgICAgICA6IGZvcndhcmRSZWplY3Rpb247XG4gICAgICAgICAgICB6b25lLnNjaGVkdWxlTWljcm9UYXNrKHNvdXJjZSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudFByb21pc2VWYWx1ZSA9IHByb21pc2Vbc3ltYm9sVmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZpbmFsbHlQcm9taXNlID0gISFjaGFpblByb21pc2UgJiYgc3ltYm9sRmluYWxseSA9PT0gY2hhaW5Qcm9taXNlW3N5bWJvbEZpbmFsbHldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaW5hbGx5UHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIHByb21pc2UgaXMgZ2VuZXJhdGVkIGZyb20gZmluYWxseSBjYWxsLCBrZWVwIHBhcmVudCBwcm9taXNlJ3Mgc3RhdGUgYW5kIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFpblByb21pc2Vbc3ltYm9sUGFyZW50UHJvbWlzZVZhbHVlXSA9IHBhcmVudFByb21pc2VWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYWluUHJvbWlzZVtzeW1ib2xQYXJlbnRQcm9taXNlU3RhdGVdID0gcHJvbWlzZVN0YXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBub3QgcGFzcyB2YWx1ZSB0byBmaW5hbGx5IGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gem9uZS5ydW4oZGVsZWdhdGUsIHVuZGVmaW5lZCwgaXNGaW5hbGx5UHJvbWlzZSAmJiBkZWxlZ2F0ZSAhPT0gZm9yd2FyZFJlamVjdGlvbiAmJiBkZWxlZ2F0ZSAhPT0gZm9yd2FyZFJlc29sdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgID8gW11cbiAgICAgICAgICAgICAgICAgICAgICAgIDogW3BhcmVudFByb21pc2VWYWx1ZV0pO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShjaGFpblByb21pc2UsIHRydWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGVycm9yIG9jY3Vycywgc2hvdWxkIGFsd2F5cyByZXR1cm4gdGhpcyBlcnJvclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlUHJvbWlzZShjaGFpblByb21pc2UsIGZhbHNlLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgY2hhaW5Qcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBaT05FX0FXQVJFX1BST01JU0VfVE9fU1RSSU5HID0gJ2Z1bmN0aW9uIFpvbmVBd2FyZVByb21pc2UoKSB7IFtuYXRpdmUgY29kZV0gfSc7XG4gICAgICAgIGNvbnN0IG5vb3AgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIGNvbnN0IEFnZ3JlZ2F0ZUVycm9yID0gZ2xvYmFsLkFnZ3JlZ2F0ZUVycm9yO1xuICAgICAgICBjbGFzcyBab25lQXdhcmVQcm9taXNlIHtcbiAgICAgICAgICAgIHN0YXRpYyB0b1N0cmluZygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWk9ORV9BV0FSRV9QUk9NSVNFX1RPX1NUUklORztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRpYyByZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlUHJvbWlzZShuZXcgdGhpcyhudWxsKSwgUkVTT0xWRUQsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRpYyByZWplY3QoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2UobmV3IHRoaXMobnVsbCksIFJFSkVDVEVELCBlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGF0aWMgd2l0aFJlc29sdmVycygpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgICAgICAgICByZXN1bHQucHJvbWlzZSA9IG5ldyBab25lQXdhcmVQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucmVzb2x2ZSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlamVjdCA9IHJlajtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGljIGFueSh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXZhbHVlcyB8fCB0eXBlb2YgdmFsdWVzW1N5bWJvbC5pdGVyYXRvcl0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBZ2dyZWdhdGVFcnJvcihbXSwgJ0FsbCBwcm9taXNlcyB3ZXJlIHJlamVjdGVkJykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKFpvbmVBd2FyZVByb21pc2UucmVzb2x2ZSh2KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFnZ3JlZ2F0ZUVycm9yKFtdLCAnQWxsIHByb21pc2VzIHdlcmUgcmVqZWN0ZWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFnZ3JlZ2F0ZUVycm9yKFtdLCAnQWxsIHByb21pc2VzIHdlcmUgcmVqZWN0ZWQnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBmaW5pc2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IFtdO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgWm9uZUF3YXJlUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvbWlzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VzW2ldLnRoZW4oKHYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBBZ2dyZWdhdGVFcnJvcihlcnJvcnMsICdBbGwgcHJvbWlzZXMgd2VyZSByZWplY3RlZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGljIHJhY2UodmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgbGV0IHJlamVjdDtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyB0aGlzKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QgPSByZWo7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gb25SZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBvblJlamVjdChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGljIGFsbCh2YWx1ZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gWm9uZUF3YXJlUHJvbWlzZS5hbGxXaXRoQ2FsbGJhY2sodmFsdWVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXRpYyBhbGxTZXR0bGVkKHZhbHVlcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IFAgPSB0aGlzICYmIHRoaXMucHJvdG90eXBlIGluc3RhbmNlb2YgWm9uZUF3YXJlUHJvbWlzZSA/IHRoaXMgOiBab25lQXdhcmVQcm9taXNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBQLmFsbFdpdGhDYWxsYmFjayh2YWx1ZXMsIHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbkNhbGxiYWNrOiAodmFsdWUpID0+ICh7IHN0YXR1czogJ2Z1bGZpbGxlZCcsIHZhbHVlIH0pLFxuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrOiAoZXJyKSA9PiAoeyBzdGF0dXM6ICdyZWplY3RlZCcsIHJlYXNvbjogZXJyIH0pLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhdGljIGFsbFdpdGhDYWxsYmFjayh2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgbGV0IHJlamVjdDtcbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyB0aGlzKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QgPSByZWo7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gU3RhcnQgYXQgMiB0byBwcmV2ZW50IHByZW1hdHVyZWx5IHJlc29sdmluZyBpZiAudGhlbiBpcyBjYWxsZWQgaW1tZWRpYXRlbHkuXG4gICAgICAgICAgICAgICAgbGV0IHVucmVzb2x2ZWRDb3VudCA9IDI7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkVmFsdWVzID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJWYWx1ZUluZGV4ID0gdmFsdWVJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRWYWx1ZXNbY3VyVmFsdWVJbmRleF0gPSBjYWxsYmFjayA/IGNhbGxiYWNrLnRoZW5DYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnJlc29sdmVkQ291bnQtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5yZXNvbHZlZENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzb2x2ZWRWYWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRWYWx1ZXNbY3VyVmFsdWVJbmRleF0gPSBjYWxsYmFjay5lcnJvckNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVucmVzb2x2ZWRDb3VudC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodW5yZXNvbHZlZENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc29sdmVkVmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoICh0aGVuRXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhlbkVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdW5yZXNvbHZlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTWFrZSB0aGUgdW5yZXNvbHZlZENvdW50IHplcm8tYmFzZWQgYWdhaW4uXG4gICAgICAgICAgICAgICAgdW5yZXNvbHZlZENvdW50IC09IDI7XG4gICAgICAgICAgICAgICAgaWYgKHVucmVzb2x2ZWRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc29sdmVkVmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihleGVjdXRvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGlmICghKHByb21pc2UgaW5zdGFuY2VvZiBab25lQXdhcmVQcm9taXNlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgYmUgYW4gaW5zdGFuY2VvZiBQcm9taXNlLicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcm9taXNlW3N5bWJvbFN0YXRlXSA9IFVOUkVTT0xWRUQ7XG4gICAgICAgICAgICAgICAgcHJvbWlzZVtzeW1ib2xWYWx1ZV0gPSBbXTsgLy8gcXVldWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25jZVdyYXBwZXIgPSBvbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dG9yICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBleGVjdXRvcihvbmNlV3JhcHBlcihtYWtlUmVzb2x2ZXIocHJvbWlzZSwgUkVTT0xWRUQpKSwgb25jZVdyYXBwZXIobWFrZVJlc29sdmVyKHByb21pc2UsIFJFSkVDVEVEKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UocHJvbWlzZSwgZmFsc2UsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdQcm9taXNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdldCBbU3ltYm9sLnNwZWNpZXNdKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBab25lQXdhcmVQcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIFdlIG11c3QgcmVhZCBgU3ltYm9sLnNwZWNpZXNgIHNhZmVseSBiZWNhdXNlIGB0aGlzYCBtYXkgYmUgYW55dGhpbmcuIEZvciBpbnN0YW5jZSwgYHRoaXNgXG4gICAgICAgICAgICAgICAgLy8gbWF5IGJlIGFuIG9iamVjdCB3aXRob3V0IGEgcHJvdG90eXBlIChjcmVhdGVkIHRocm91Z2ggYE9iamVjdC5jcmVhdGUobnVsbClgKTsgdGh1c1xuICAgICAgICAgICAgICAgIC8vIGB0aGlzLmNvbnN0cnVjdG9yYCB3aWxsIGJlIHVuZGVmaW5lZC4gT25lIG9mIHRoZSB1c2UgY2FzZXMgaXMgU3lzdGVtSlMgY3JlYXRpbmdcbiAgICAgICAgICAgICAgICAvLyBwcm90b3R5cGUtbGVzcyBvYmplY3RzIChtb2R1bGVzKSB2aWEgYE9iamVjdC5jcmVhdGUobnVsbClgLiBUaGUgU3lzdGVtSlMgY3JlYXRlcyBhbiBlbXB0eVxuICAgICAgICAgICAgICAgIC8vIG9iamVjdCBhbmQgY29waWVzIHByb21pc2UgcHJvcGVydGllcyBpbnRvIHRoYXQgb2JqZWN0ICh3aXRoaW4gdGhlIGBnZXRPckNyZWF0ZUxvYWRgXG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24pLiBUaGUgem9uZS5qcyB0aGVuIGNoZWNrcyBpZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaGFzIHRoZSBgdGhlbmAgbWV0aG9kIGFuZFxuICAgICAgICAgICAgICAgIC8vIGludm9rZXMgaXQgd2l0aCB0aGUgYHZhbHVlYCBjb250ZXh0LiBPdGhlcndpc2UsIHRoaXMgd2lsbCB0aHJvdyBhbiBlcnJvcjogYFR5cGVFcnJvcjpcbiAgICAgICAgICAgICAgICAvLyBDYW5ub3QgcmVhZCBwcm9wZXJ0aWVzIG9mIHVuZGVmaW5lZCAocmVhZGluZyAnU3ltYm9sKFN5bWJvbC5zcGVjaWVzKScpYC5cbiAgICAgICAgICAgICAgICBsZXQgQyA9IHRoaXMuY29uc3RydWN0b3I/LltTeW1ib2wuc3BlY2llc107XG4gICAgICAgICAgICAgICAgaWYgKCFDIHx8IHR5cGVvZiBDICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIEMgPSB0aGlzLmNvbnN0cnVjdG9yIHx8IFpvbmVBd2FyZVByb21pc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYWluUHJvbWlzZSA9IG5ldyBDKG5vb3ApO1xuICAgICAgICAgICAgICAgIGNvbnN0IHpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbc3ltYm9sU3RhdGVdID09IFVOUkVTT0xWRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tzeW1ib2xWYWx1ZV0ucHVzaCh6b25lLCBjaGFpblByb21pc2UsIG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlUmVzb2x2ZU9yUmVqZWN0KHRoaXMsIHpvbmUsIGNoYWluUHJvbWlzZSwgb25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhaW5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2gob25SZWplY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRoZW4obnVsbCwgb25SZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgICAgICAgICAgICAgIC8vIFNlZSBjb21tZW50IG9uIHRoZSBjYWxsIHRvIGB0aGVuYCBhYm91dCB3aHkgdGhlZSBgU3ltYm9sLnNwZWNpZXNgIGlzIHNhZmVseSBhY2Nlc3NlZC5cbiAgICAgICAgICAgICAgICBsZXQgQyA9IHRoaXMuY29uc3RydWN0b3I/LltTeW1ib2wuc3BlY2llc107XG4gICAgICAgICAgICAgICAgaWYgKCFDIHx8IHR5cGVvZiBDICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIEMgPSBab25lQXdhcmVQcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjaGFpblByb21pc2UgPSBuZXcgQyhub29wKTtcbiAgICAgICAgICAgICAgICBjaGFpblByb21pc2Vbc3ltYm9sRmluYWxseV0gPSBzeW1ib2xGaW5hbGx5O1xuICAgICAgICAgICAgICAgIGNvbnN0IHpvbmUgPSBab25lLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbc3ltYm9sU3RhdGVdID09IFVOUkVTT0xWRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tzeW1ib2xWYWx1ZV0ucHVzaCh6b25lLCBjaGFpblByb21pc2UsIG9uRmluYWxseSwgb25GaW5hbGx5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNjaGVkdWxlUmVzb2x2ZU9yUmVqZWN0KHRoaXMsIHpvbmUsIGNoYWluUHJvbWlzZSwgb25GaW5hbGx5LCBvbkZpbmFsbHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhaW5Qcm9taXNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFByb3RlY3QgYWdhaW5zdCBhZ2dyZXNzaXZlIG9wdGltaXplcnMgZHJvcHBpbmcgc2VlbWluZ2x5IHVudXNlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAvLyBFLmcuIENsb3N1cmUgQ29tcGlsZXIgaW4gYWR2YW5jZWQgbW9kZS5cbiAgICAgICAgWm9uZUF3YXJlUHJvbWlzZVsncmVzb2x2ZSddID0gWm9uZUF3YXJlUHJvbWlzZS5yZXNvbHZlO1xuICAgICAgICBab25lQXdhcmVQcm9taXNlWydyZWplY3QnXSA9IFpvbmVBd2FyZVByb21pc2UucmVqZWN0O1xuICAgICAgICBab25lQXdhcmVQcm9taXNlWydyYWNlJ10gPSBab25lQXdhcmVQcm9taXNlLnJhY2U7XG4gICAgICAgIFpvbmVBd2FyZVByb21pc2VbJ2FsbCddID0gWm9uZUF3YXJlUHJvbWlzZS5hbGw7XG4gICAgICAgIGNvbnN0IE5hdGl2ZVByb21pc2UgPSAoZ2xvYmFsW3N5bWJvbFByb21pc2VdID0gZ2xvYmFsWydQcm9taXNlJ10pO1xuICAgICAgICBnbG9iYWxbJ1Byb21pc2UnXSA9IFpvbmVBd2FyZVByb21pc2U7XG4gICAgICAgIGNvbnN0IHN5bWJvbFRoZW5QYXRjaGVkID0gX19zeW1ib2xfXygndGhlblBhdGNoZWQnKTtcbiAgICAgICAgZnVuY3Rpb24gcGF0Y2hUaGVuKEN0b3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3RvID0gQ3Rvci5wcm90b3R5cGU7XG4gICAgICAgICAgICBjb25zdCBwcm9wID0gT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCAndGhlbicpO1xuICAgICAgICAgICAgaWYgKHByb3AgJiYgKHByb3Aud3JpdGFibGUgPT09IGZhbHNlIHx8ICFwcm9wLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBDdG9yLnByb3RvdHlwZS50aGVuIHByb3BlcnR5RGVzY3JpcHRvciBpcyB3cml0YWJsZSBvciBub3RcbiAgICAgICAgICAgICAgICAvLyBpbiBtZXRlb3IgZW52LCB3cml0YWJsZSBpcyBmYWxzZSwgd2Ugc2hvdWxkIGlnbm9yZSBzdWNoIGNhc2VcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbFRoZW4gPSBwcm90by50aGVuO1xuICAgICAgICAgICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgbWV0aG9kLlxuICAgICAgICAgICAgcHJvdG9bc3ltYm9sVGhlbl0gPSBvcmlnaW5hbFRoZW47XG4gICAgICAgICAgICBDdG9yLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gKG9uUmVzb2x2ZSwgb25SZWplY3QpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3cmFwcGVkID0gbmV3IFpvbmVBd2FyZVByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbFRoZW4uY2FsbCh0aGlzLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB3cmFwcGVkLnRoZW4ob25SZXNvbHZlLCBvblJlamVjdCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQ3RvcltzeW1ib2xUaGVuUGF0Y2hlZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5wYXRjaFRoZW4gPSBwYXRjaFRoZW47XG4gICAgICAgIGZ1bmN0aW9uIHpvbmVpZnkoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoc2VsZiwgYXJncykge1xuICAgICAgICAgICAgICAgIGxldCByZXN1bHRQcm9taXNlID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdFByb21pc2UgaW5zdGFuY2VvZiBab25lQXdhcmVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY3RvciA9IHJlc3VsdFByb21pc2UuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgaWYgKCFjdG9yW3N5bWJvbFRoZW5QYXRjaGVkXSkge1xuICAgICAgICAgICAgICAgICAgICBwYXRjaFRoZW4oY3Rvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRQcm9taXNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTmF0aXZlUHJvbWlzZSkge1xuICAgICAgICAgICAgcGF0Y2hUaGVuKE5hdGl2ZVByb21pc2UpO1xuICAgICAgICAgICAgcGF0Y2hNZXRob2QoZ2xvYmFsLCAnZmV0Y2gnLCAoZGVsZWdhdGUpID0+IHpvbmVpZnkoZGVsZWdhdGUpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGlzIGlzIG5vdCBwYXJ0IG9mIHB1YmxpYyBBUEksIGJ1dCBpdCBpcyB1c2VmdWwgZm9yIHRlc3RzLCBzbyB3ZSBleHBvc2UgaXQuXG4gICAgICAgIFByb21pc2VbWm9uZS5fX3N5bWJvbF9fKCd1bmNhdWdodFByb21pc2VFcnJvcnMnKV0gPSBfdW5jYXVnaHRQcm9taXNlRXJyb3JzO1xuICAgICAgICByZXR1cm4gWm9uZUF3YXJlUHJvbWlzZTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hUb1N0cmluZyhab25lKSB7XG4gICAgLy8gb3ZlcnJpZGUgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nIHRvIG1ha2Ugem9uZS5qcyBwYXRjaGVkIGZ1bmN0aW9uXG4gICAgLy8gbG9vayBsaWtlIG5hdGl2ZSBmdW5jdGlvblxuICAgIFpvbmUuX19sb2FkX3BhdGNoKCd0b1N0cmluZycsIChnbG9iYWwpID0+IHtcbiAgICAgICAgLy8gcGF0Y2ggRnVuYy5wcm90b3R5cGUudG9TdHJpbmcgdG8gbGV0IHRoZW0gbG9vayBsaWtlIG5hdGl2ZVxuICAgICAgICBjb25zdCBvcmlnaW5hbEZ1bmN0aW9uVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG4gICAgICAgIGNvbnN0IE9SSUdJTkFMX0RFTEVHQVRFX1NZTUJPTCA9IHpvbmVTeW1ib2woJ09yaWdpbmFsRGVsZWdhdGUnKTtcbiAgICAgICAgY29uc3QgUFJPTUlTRV9TWU1CT0wgPSB6b25lU3ltYm9sKCdQcm9taXNlJyk7XG4gICAgICAgIGNvbnN0IEVSUk9SX1NZTUJPTCA9IHpvbmVTeW1ib2woJ0Vycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld0Z1bmN0aW9uVG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsRGVsZWdhdGUgPSB0aGlzW09SSUdJTkFMX0RFTEVHQVRFX1NZTUJPTF07XG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsRGVsZWdhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcmlnaW5hbERlbGVnYXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxGdW5jdGlvblRvU3RyaW5nLmNhbGwob3JpZ2luYWxEZWxlZ2F0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9yaWdpbmFsRGVsZWdhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hdGl2ZVByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV9TWU1CT0xdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRnVuY3Rpb25Ub1N0cmluZy5jYWxsKG5hdGl2ZVByb21pc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYXRpdmVFcnJvciA9IGdsb2JhbFtFUlJPUl9TWU1CT0xdO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmF0aXZlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEZ1bmN0aW9uVG9TdHJpbmcuY2FsbChuYXRpdmVFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxGdW5jdGlvblRvU3RyaW5nLmNhbGwodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIG5ld0Z1bmN0aW9uVG9TdHJpbmdbT1JJR0lOQUxfREVMRUdBVEVfU1lNQk9MXSA9IG9yaWdpbmFsRnVuY3Rpb25Ub1N0cmluZztcbiAgICAgICAgRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gbmV3RnVuY3Rpb25Ub1N0cmluZztcbiAgICAgICAgLy8gcGF0Y2ggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyB0byBsZXQgdGhlbSBsb29rIGxpa2UgbmF0aXZlXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsT2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICAgICAgICBjb25zdCBQUk9NSVNFX09CSkVDVF9UT19TVFJJTkcgPSAnW29iamVjdCBQcm9taXNlXSc7XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIFByb21pc2UgPT09ICdmdW5jdGlvbicgJiYgdGhpcyBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUFJPTUlTRV9PQkpFQ1RfVE9fU1RSSU5HO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsT2JqZWN0VG9TdHJpbmcuY2FsbCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcGF0Y2hDYWxsYmFja3MoYXBpLCB0YXJnZXQsIHRhcmdldE5hbWUsIG1ldGhvZCwgY2FsbGJhY2tzKSB7XG4gICAgY29uc3Qgc3ltYm9sID0gWm9uZS5fX3N5bWJvbF9fKG1ldGhvZCk7XG4gICAgaWYgKHRhcmdldFtzeW1ib2xdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmF0aXZlRGVsZWdhdGUgPSAodGFyZ2V0W3N5bWJvbF0gPSB0YXJnZXRbbWV0aG9kXSk7XG4gICAgdGFyZ2V0W21ldGhvZF0gPSBmdW5jdGlvbiAobmFtZSwgb3B0cywgb3B0aW9ucykge1xuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlID0gYCR7dGFyZ2V0TmFtZX0uJHttZXRob2R9OjpgICsgY2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdG90eXBlID0gb3B0cy5wcm90b3R5cGU7XG4gICAgICAgICAgICAgICAgLy8gTm90ZTogdGhlIGBwYXRjaENhbGxiYWNrc2AgaXMgdXNlZCBmb3IgcGF0Y2hpbmcgdGhlIGBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnRgIGFuZFxuICAgICAgICAgICAgICAgIC8vIGBjdXN0b21FbGVtZW50cy5kZWZpbmVgLiBXZSBleHBsaWNpdGx5IHdyYXAgdGhlIHBhdGNoaW5nIGNvZGUgaW50byB0cnktY2F0Y2ggc2luY2VcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFja3MgbWF5IGJlIGFscmVhZHkgcGF0Y2hlZCBieSBvdGhlciB3ZWIgY29tcG9uZW50cyBmcmFtZXdvcmtzIChlLmcuIExXQyksIGFuZCB0aGV5XG4gICAgICAgICAgICAgICAgLy8gbWFrZSB0aG9zZSBwcm9wZXJ0aWVzIG5vbi13cml0YWJsZS4gVGhpcyBtZWFucyB0aGF0IHBhdGNoaW5nIGNhbGxiYWNrIHdpbGwgdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICAvLyBgY2Fubm90IGFzc2lnbiB0byByZWFkLW9ubHkgcHJvcGVydHlgLiBTZWUgdGhpcyBjb2RlIGFzIGFuIGV4YW1wbGU6XG4gICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NhbGVzZm9yY2UvbHdjL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL0Bsd2MvZW5naW5lLWNvcmUvc3JjL2ZyYW1ld29yay9iYXNlLWJyaWRnZS1lbGVtZW50LnRzI0wxODAtTDE4NlxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc3RvcCB0aGUgYXBwbGljYXRpb24gcmVuZGVyaW5nIGlmIHdlIGNvdWxkbid0IHBhdGNoIHNvbWVcbiAgICAgICAgICAgICAgICAvLyBjYWxsYmFjaywgZS5nLiBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYC5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvdG90eXBlLmhhc093blByb3BlcnR5KGNhbGxiYWNrKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IGFwaS5PYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG90eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRvci52YWx1ZSA9IGFwaS53cmFwV2l0aEN1cnJlbnRab25lKGRlc2NyaXB0b3IudmFsdWUsIHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpLl9yZWRlZmluZVByb3BlcnR5KG9wdHMucHJvdG90eXBlLCBjYWxsYmFjaywgZGVzY3JpcHRvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChwcm90b3R5cGVbY2FsbGJhY2tdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG90eXBlW2NhbGxiYWNrXSA9IGFwaS53cmFwV2l0aEN1cnJlbnRab25lKHByb3RvdHlwZVtjYWxsYmFja10sIHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocHJvdG90eXBlW2NhbGxiYWNrXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG90eXBlW2NhbGxiYWNrXSA9IGFwaS53cmFwV2l0aEN1cnJlbnRab25lKHByb3RvdHlwZVtjYWxsYmFja10sIHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgICAvLyBOb3RlOiB3ZSBsZWF2ZSB0aGUgY2F0Y2ggYmxvY2sgZW1wdHkgc2luY2UgdGhlcmUncyBubyB3YXkgdG8gaGFuZGxlIHRoZSBlcnJvciByZWxhdGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIG5vbi13cml0YWJsZSBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlRGVsZWdhdGUuY2FsbCh0YXJnZXQsIG5hbWUsIG9wdHMsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgYXBpLmF0dGFjaE9yaWdpblRvUGF0Y2hlZCh0YXJnZXRbbWV0aG9kXSwgbmF0aXZlRGVsZWdhdGUpO1xufVxuXG5mdW5jdGlvbiBwYXRjaFV0aWwoWm9uZSkge1xuICAgIFpvbmUuX19sb2FkX3BhdGNoKCd1dGlsJywgKGdsb2JhbCwgWm9uZSwgYXBpKSA9PiB7XG4gICAgICAgIC8vIENvbGxlY3QgbmF0aXZlIGV2ZW50IG5hbWVzIGJ5IGxvb2tpbmcgYXQgcHJvcGVydGllc1xuICAgICAgICAvLyBvbiB0aGUgZ2xvYmFsIG5hbWVzcGFjZSwgZS5nLiAnb25jbGljaycuXG4gICAgICAgIGNvbnN0IGV2ZW50TmFtZXMgPSBnZXRPbkV2ZW50TmFtZXMoZ2xvYmFsKTtcbiAgICAgICAgYXBpLnBhdGNoT25Qcm9wZXJ0aWVzID0gcGF0Y2hPblByb3BlcnRpZXM7XG4gICAgICAgIGFwaS5wYXRjaE1ldGhvZCA9IHBhdGNoTWV0aG9kO1xuICAgICAgICBhcGkuYmluZEFyZ3VtZW50cyA9IGJpbmRBcmd1bWVudHM7XG4gICAgICAgIGFwaS5wYXRjaE1hY3JvVGFzayA9IHBhdGNoTWFjcm9UYXNrO1xuICAgICAgICAvLyBJbiBlYXJsaWVyIHZlcnNpb24gb2Ygem9uZS5qcyAoPDAuOS4wKSwgd2UgdXNlIGVudiBuYW1lIGBfX3pvbmVfc3ltYm9sX19CTEFDS19MSVNURURfRVZFTlRTYFxuICAgICAgICAvLyB0byBkZWZpbmUgd2hpY2ggZXZlbnRzIHdpbGwgbm90IGJlIHBhdGNoZWQgYnkgYFpvbmUuanNgLiBJbiBuZXdlciB2ZXJzaW9uICg+PTAuOS4wKSwgd2VcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBlbnYgbmFtZSB0byBgX196b25lX3N5bWJvbF9fVU5QQVRDSEVEX0VWRU5UU2AgdG8ga2VlcCB0aGUgbmFtZSBjb25zaXN0ZW50IHdpdGhcbiAgICAgICAgLy8gYW5ndWxhciByZXBvLiBUaGUgIGBfX3pvbmVfc3ltYm9sX19CTEFDS19MSVNURURfRVZFTlRTYCBpcyBkZXByZWNhdGVkLCBidXQgaXQgaXMgc3RpbGwgYmVcbiAgICAgICAgLy8gc3VwcG9ydGVkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgY29uc3QgU1lNQk9MX0JMQUNLX0xJU1RFRF9FVkVOVFMgPSBab25lLl9fc3ltYm9sX18oJ0JMQUNLX0xJU1RFRF9FVkVOVFMnKTtcbiAgICAgICAgY29uc3QgU1lNQk9MX1VOUEFUQ0hFRF9FVkVOVFMgPSBab25lLl9fc3ltYm9sX18oJ1VOUEFUQ0hFRF9FVkVOVFMnKTtcbiAgICAgICAgaWYgKGdsb2JhbFtTWU1CT0xfVU5QQVRDSEVEX0VWRU5UU10pIHtcbiAgICAgICAgICAgIGdsb2JhbFtTWU1CT0xfQkxBQ0tfTElTVEVEX0VWRU5UU10gPSBnbG9iYWxbU1lNQk9MX1VOUEFUQ0hFRF9FVkVOVFNdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbG9iYWxbU1lNQk9MX0JMQUNLX0xJU1RFRF9FVkVOVFNdKSB7XG4gICAgICAgICAgICBab25lW1NZTUJPTF9CTEFDS19MSVNURURfRVZFTlRTXSA9IFpvbmVbU1lNQk9MX1VOUEFUQ0hFRF9FVkVOVFNdID1cbiAgICAgICAgICAgICAgICBnbG9iYWxbU1lNQk9MX0JMQUNLX0xJU1RFRF9FVkVOVFNdO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5wYXRjaEV2ZW50UHJvdG90eXBlID0gcGF0Y2hFdmVudFByb3RvdHlwZTtcbiAgICAgICAgYXBpLnBhdGNoRXZlbnRUYXJnZXQgPSBwYXRjaEV2ZW50VGFyZ2V0O1xuICAgICAgICBhcGkuaXNJRU9yRWRnZSA9IGlzSUVPckVkZ2U7XG4gICAgICAgIGFwaS5PYmplY3REZWZpbmVQcm9wZXJ0eSA9IE9iamVjdERlZmluZVByb3BlcnR5O1xuICAgICAgICBhcGkuT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0R2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAgICAgICBhcGkuT2JqZWN0Q3JlYXRlID0gT2JqZWN0Q3JlYXRlO1xuICAgICAgICBhcGkuQXJyYXlTbGljZSA9IEFycmF5U2xpY2U7XG4gICAgICAgIGFwaS5wYXRjaENsYXNzID0gcGF0Y2hDbGFzcztcbiAgICAgICAgYXBpLndyYXBXaXRoQ3VycmVudFpvbmUgPSB3cmFwV2l0aEN1cnJlbnRab25lO1xuICAgICAgICBhcGkuZmlsdGVyUHJvcGVydGllcyA9IGZpbHRlclByb3BlcnRpZXM7XG4gICAgICAgIGFwaS5hdHRhY2hPcmlnaW5Ub1BhdGNoZWQgPSBhdHRhY2hPcmlnaW5Ub1BhdGNoZWQ7XG4gICAgICAgIGFwaS5fcmVkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgICAgICAgYXBpLnBhdGNoQ2FsbGJhY2tzID0gcGF0Y2hDYWxsYmFja3M7XG4gICAgICAgIGFwaS5nZXRHbG9iYWxPYmplY3RzID0gKCkgPT4gKHtcbiAgICAgICAgICAgIGdsb2JhbFNvdXJjZXMsXG4gICAgICAgICAgICB6b25lU3ltYm9sRXZlbnROYW1lcyxcbiAgICAgICAgICAgIGV2ZW50TmFtZXMsXG4gICAgICAgICAgICBpc0Jyb3dzZXIsXG4gICAgICAgICAgICBpc01peCxcbiAgICAgICAgICAgIGlzTm9kZSxcbiAgICAgICAgICAgIFRSVUVfU1RSLFxuICAgICAgICAgICAgRkFMU0VfU1RSLFxuICAgICAgICAgICAgWk9ORV9TWU1CT0xfUFJFRklYLFxuICAgICAgICAgICAgQUREX0VWRU5UX0xJU1RFTkVSX1NUUixcbiAgICAgICAgICAgIFJFTU9WRV9FVkVOVF9MSVNURU5FUl9TVFIsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwYXRjaENvbW1vbihab25lKSB7XG4gICAgcGF0Y2hQcm9taXNlKFpvbmUpO1xuICAgIHBhdGNoVG9TdHJpbmcoWm9uZSk7XG4gICAgcGF0Y2hVdGlsKFpvbmUpO1xufVxuXG5jb25zdCBab25lJDEgPSBsb2FkWm9uZSgpO1xucGF0Y2hDb21tb24oWm9uZSQxKTtcbnBhdGNoQnJvd3Nlcihab25lJDEpO1xuIl0sIm1hcHBpbmdzIjoiO0FBTUEsSUFBTSxTQUFTO0FBR2YsU0FBUyxXQUFXLE1BQU07QUFDdEIsUUFBTSxlQUFlLE9BQU8sc0JBQXNCLEtBQUs7QUFDdkQsU0FBTyxlQUFlO0FBQzFCO0FBQ0EsU0FBUyxXQUFXO0FBQ2hCLFFBQU0sY0FBYyxPQUFPLGFBQWE7QUFDeEMsV0FBUyxLQUFLLE1BQU07QUFDaEIsbUJBQWUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEVBQUUsSUFBSTtBQUFBLEVBQ2xFO0FBQ0EsV0FBUyxtQkFBbUIsTUFBTSxPQUFPO0FBQ3JDLG1CQUFlLFlBQVksU0FBUyxLQUFLLFlBQVksU0FBUyxFQUFFLE1BQU0sS0FBSztBQUFBLEVBQy9FO0FBQ0EsT0FBSyxNQUFNO0FBQ1gsUUFBTSxZQUFOLE1BQU0sVUFBUztBQUFBLElBR1gsT0FBTyxvQkFBb0I7QUFDdkIsVUFBSSxPQUFPLFNBQVMsTUFBTSxRQUFRLGtCQUFrQixHQUFHO0FBQ25ELGNBQU0sSUFBSSxNQUFNLCtSQUkwQztBQUFBLE1BQzlEO0FBQUEsSUFDSjtBQUFBLElBQ0EsV0FBVyxPQUFPO0FBQ2QsVUFBSSxPQUFPLFVBQVM7QUFDcEIsYUFBTyxLQUFLLFFBQVE7QUFDaEIsZUFBTyxLQUFLO0FBQUEsTUFDaEI7QUFDQSxhQUFPO0FBQUEsSUFDWDtBQUFBLElBQ0EsV0FBVyxVQUFVO0FBQ2pCLGFBQU8sa0JBQWtCO0FBQUEsSUFDN0I7QUFBQSxJQUNBLFdBQVcsY0FBYztBQUNyQixhQUFPO0FBQUEsSUFDWDtBQUFBO0FBQUEsSUFFQSxPQUFPLGFBQWEsTUFBTSxJQUFJLGtCQUFrQixPQUFPO0FBQ25ELFVBQUksUUFBUSxlQUFlLElBQUksR0FBRztBQUk5QixjQUFNLGlCQUFpQixPQUFPLFdBQVcseUJBQXlCLENBQUMsTUFBTTtBQUN6RSxZQUFJLENBQUMsbUJBQW1CLGdCQUFnQjtBQUNwQyxnQkFBTSxNQUFNLDJCQUEyQixJQUFJO0FBQUEsUUFDL0M7QUFBQSxNQUNKLFdBQ1MsQ0FBQyxPQUFPLG9CQUFvQixJQUFJLEdBQUc7QUFDeEMsY0FBTSxXQUFXLFVBQVU7QUFDM0IsYUFBSyxRQUFRO0FBQ2IsZ0JBQVEsSUFBSSxJQUFJLEdBQUcsUUFBUSxXQUFVLElBQUk7QUFDekMsMkJBQW1CLFVBQVUsUUFBUTtBQUFBLE1BQ3pDO0FBQUEsSUFDSjtBQUFBLElBQ0EsSUFBSSxTQUFTO0FBQ1QsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFBQSxJQUNBLElBQUksT0FBTztBQUNQLGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQUEsSUFDQSxZQUFZLFFBQVEsVUFBVTtBQUMxQixXQUFLLFVBQVU7QUFDZixXQUFLLFFBQVEsV0FBVyxTQUFTLFFBQVEsWUFBWTtBQUNyRCxXQUFLLGNBQWUsWUFBWSxTQUFTLGNBQWUsQ0FBQztBQUN6RCxXQUFLLGdCQUFnQixJQUFJLGNBQWMsTUFBTSxLQUFLLFdBQVcsS0FBSyxRQUFRLGVBQWUsUUFBUTtBQUFBLElBQ3JHO0FBQUEsSUFDQSxJQUFJLEtBQUs7QUFDTCxZQUFNLE9BQU8sS0FBSyxZQUFZLEdBQUc7QUFDakMsVUFBSTtBQUNBLGVBQU8sS0FBSyxZQUFZLEdBQUc7QUFBQSxJQUNuQztBQUFBLElBQ0EsWUFBWSxLQUFLO0FBQ2IsVUFBSSxVQUFVO0FBQ2QsYUFBTyxTQUFTO0FBQ1osWUFBSSxRQUFRLFlBQVksZUFBZSxHQUFHLEdBQUc7QUFDekMsaUJBQU87QUFBQSxRQUNYO0FBQ0Esa0JBQVUsUUFBUTtBQUFBLE1BQ3RCO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFBQSxJQUNBLEtBQUssVUFBVTtBQUNYLFVBQUksQ0FBQztBQUNELGNBQU0sSUFBSSxNQUFNLG9CQUFvQjtBQUN4QyxhQUFPLEtBQUssY0FBYyxLQUFLLE1BQU0sUUFBUTtBQUFBLElBQ2pEO0FBQUEsSUFDQSxLQUFLLFVBQVUsUUFBUTtBQUNuQixVQUFJLE9BQU8sYUFBYSxZQUFZO0FBQ2hDLGNBQU0sSUFBSSxNQUFNLDZCQUE2QixRQUFRO0FBQUEsTUFDekQ7QUFDQSxZQUFNLFlBQVksS0FBSyxjQUFjLFVBQVUsTUFBTSxVQUFVLE1BQU07QUFDckUsWUFBTSxPQUFPO0FBQ2IsYUFBTyxXQUFZO0FBQ2YsZUFBTyxLQUFLLFdBQVcsV0FBVyxNQUFNLFdBQVcsTUFBTTtBQUFBLE1BQzdEO0FBQUEsSUFDSjtBQUFBLElBQ0EsSUFBSSxVQUFVLFdBQVcsV0FBVyxRQUFRO0FBQ3hDLDBCQUFvQixFQUFFLFFBQVEsbUJBQW1CLE1BQU0sS0FBSztBQUM1RCxVQUFJO0FBQ0EsZUFBTyxLQUFLLGNBQWMsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLE1BQU07QUFBQSxNQUNqRixVQUNBO0FBQ0ksNEJBQW9CLGtCQUFrQjtBQUFBLE1BQzFDO0FBQUEsSUFDSjtBQUFBLElBQ0EsV0FBVyxVQUFVLFlBQVksTUFBTSxXQUFXLFFBQVE7QUFDdEQsMEJBQW9CLEVBQUUsUUFBUSxtQkFBbUIsTUFBTSxLQUFLO0FBQzVELFVBQUk7QUFDQSxZQUFJO0FBQ0EsaUJBQU8sS0FBSyxjQUFjLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNO0FBQUEsUUFDakYsU0FDTyxPQUFPO0FBQ1YsY0FBSSxLQUFLLGNBQWMsWUFBWSxNQUFNLEtBQUssR0FBRztBQUM3QyxrQkFBTTtBQUFBLFVBQ1Y7QUFBQSxRQUNKO0FBQUEsTUFDSixVQUNBO0FBQ0ksNEJBQW9CLGtCQUFrQjtBQUFBLE1BQzFDO0FBQUEsSUFDSjtBQUFBLElBQ0EsUUFBUSxNQUFNLFdBQVcsV0FBVztBQUNoQyxVQUFJLEtBQUssUUFBUSxNQUFNO0FBQ25CLGNBQU0sSUFBSSxNQUFNLGlFQUNYLEtBQUssUUFBUSxTQUFTLE9BQ3ZCLGtCQUNBLEtBQUssT0FDTCxHQUFHO0FBQUEsTUFDWDtBQUlBLFVBQUksS0FBSyxVQUFVLGlCQUFpQixLQUFLLFNBQVMsYUFBYSxLQUFLLFNBQVMsWUFBWTtBQUNyRjtBQUFBLE1BQ0o7QUFDQSxZQUFNLGVBQWUsS0FBSyxTQUFTO0FBQ25DLHNCQUFnQixLQUFLLGNBQWMsU0FBUyxTQUFTO0FBQ3JELFdBQUs7QUFDTCxZQUFNLGVBQWU7QUFDckIscUJBQWU7QUFDZiwwQkFBb0IsRUFBRSxRQUFRLG1CQUFtQixNQUFNLEtBQUs7QUFDNUQsVUFBSTtBQUNBLFlBQUksS0FBSyxRQUFRLGFBQWEsS0FBSyxRQUFRLENBQUMsS0FBSyxLQUFLLFlBQVk7QUFDOUQsZUFBSyxXQUFXO0FBQUEsUUFDcEI7QUFDQSxZQUFJO0FBQ0EsaUJBQU8sS0FBSyxjQUFjLFdBQVcsTUFBTSxNQUFNLFdBQVcsU0FBUztBQUFBLFFBQ3pFLFNBQ08sT0FBTztBQUNWLGNBQUksS0FBSyxjQUFjLFlBQVksTUFBTSxLQUFLLEdBQUc7QUFDN0Msa0JBQU07QUFBQSxVQUNWO0FBQUEsUUFDSjtBQUFBLE1BQ0osVUFDQTtBQUdJLFlBQUksS0FBSyxVQUFVLGdCQUFnQixLQUFLLFVBQVUsU0FBUztBQUN2RCxjQUFJLEtBQUssUUFBUSxhQUFjLEtBQUssUUFBUSxLQUFLLEtBQUssWUFBYTtBQUMvRCw0QkFBZ0IsS0FBSyxjQUFjLFdBQVcsT0FBTztBQUFBLFVBQ3pELE9BQ0s7QUFDRCxpQkFBSyxXQUFXO0FBQ2hCLGlCQUFLLGlCQUFpQixNQUFNLEVBQUU7QUFDOUIsNEJBQ0ksS0FBSyxjQUFjLGNBQWMsU0FBUyxZQUFZO0FBQUEsVUFDOUQ7QUFBQSxRQUNKO0FBQ0EsNEJBQW9CLGtCQUFrQjtBQUN0Qyx1QkFBZTtBQUFBLE1BQ25CO0FBQUEsSUFDSjtBQUFBLElBQ0EsYUFBYSxNQUFNO0FBQ2YsVUFBSSxLQUFLLFFBQVEsS0FBSyxTQUFTLE1BQU07QUFHakMsWUFBSSxVQUFVO0FBQ2QsZUFBTyxTQUFTO0FBQ1osY0FBSSxZQUFZLEtBQUssTUFBTTtBQUN2QixrQkFBTSxNQUFNLDhCQUE4QixLQUFLLElBQUksOENBQThDLEtBQUssS0FBSyxJQUFJLEVBQUU7QUFBQSxVQUNySDtBQUNBLG9CQUFVLFFBQVE7QUFBQSxRQUN0QjtBQUFBLE1BQ0o7QUFDQSxXQUFLLGNBQWMsWUFBWSxZQUFZO0FBQzNDLFlBQU0sZ0JBQWdCLENBQUM7QUFDdkIsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxRQUFRO0FBQ2IsVUFBSTtBQUNBLGVBQU8sS0FBSyxjQUFjLGFBQWEsTUFBTSxJQUFJO0FBQUEsTUFDckQsU0FDTyxLQUFLO0FBR1IsYUFBSyxjQUFjLFNBQVMsWUFBWSxZQUFZO0FBRXBELGFBQUssY0FBYyxZQUFZLE1BQU0sR0FBRztBQUN4QyxjQUFNO0FBQUEsTUFDVjtBQUNBLFVBQUksS0FBSyxtQkFBbUIsZUFBZTtBQUV2QyxhQUFLLGlCQUFpQixNQUFNLENBQUM7QUFBQSxNQUNqQztBQUNBLFVBQUksS0FBSyxTQUFTLFlBQVk7QUFDMUIsYUFBSyxjQUFjLFdBQVcsVUFBVTtBQUFBLE1BQzVDO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFBQSxJQUNBLGtCQUFrQixRQUFRLFVBQVUsTUFBTSxnQkFBZ0I7QUFDdEQsYUFBTyxLQUFLLGFBQWEsSUFBSSxTQUFTLFdBQVcsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLE1BQVMsQ0FBQztBQUFBLElBQ3ZHO0FBQUEsSUFDQSxrQkFBa0IsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLGNBQWM7QUFDcEUsYUFBTyxLQUFLLGFBQWEsSUFBSSxTQUFTLFdBQVcsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLFlBQVksQ0FBQztBQUFBLElBQzFHO0FBQUEsSUFDQSxrQkFBa0IsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLGNBQWM7QUFDcEUsYUFBTyxLQUFLLGFBQWEsSUFBSSxTQUFTLFdBQVcsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLFlBQVksQ0FBQztBQUFBLElBQzFHO0FBQUEsSUFDQSxXQUFXLE1BQU07QUFDYixVQUFJLEtBQUssUUFBUTtBQUNiLGNBQU0sSUFBSSxNQUFNLHVFQUNYLEtBQUssUUFBUSxTQUFTLE9BQ3ZCLGtCQUNBLEtBQUssT0FDTCxHQUFHO0FBQ1gsVUFBSSxLQUFLLFVBQVUsYUFBYSxLQUFLLFVBQVUsU0FBUztBQUNwRDtBQUFBLE1BQ0o7QUFDQSxXQUFLLGNBQWMsV0FBVyxXQUFXLE9BQU87QUFDaEQsVUFBSTtBQUNBLGFBQUssY0FBYyxXQUFXLE1BQU0sSUFBSTtBQUFBLE1BQzVDLFNBQ08sS0FBSztBQUVSLGFBQUssY0FBYyxTQUFTLFNBQVM7QUFDckMsYUFBSyxjQUFjLFlBQVksTUFBTSxHQUFHO0FBQ3hDLGNBQU07QUFBQSxNQUNWO0FBQ0EsV0FBSyxpQkFBaUIsTUFBTSxFQUFFO0FBQzlCLFdBQUssY0FBYyxjQUFjLFNBQVM7QUFDMUMsV0FBSyxXQUFXO0FBQ2hCLGFBQU87QUFBQSxJQUNYO0FBQUEsSUFDQSxpQkFBaUIsTUFBTSxPQUFPO0FBQzFCLFlBQU0sZ0JBQWdCLEtBQUs7QUFDM0IsVUFBSSxTQUFTLElBQUk7QUFDYixhQUFLLGlCQUFpQjtBQUFBLE1BQzFCO0FBQ0EsZUFBUyxJQUFJLEdBQUcsSUFBSSxjQUFjLFFBQVEsS0FBSztBQUMzQyxzQkFBYyxDQUFDLEVBQUUsaUJBQWlCLEtBQUssTUFBTSxLQUFLO0FBQUEsTUFDdEQ7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQTlPYSxZQUFLLGFBQWE7QUFGL0IsTUFBTSxXQUFOO0FBaVBBLFFBQU0sY0FBYztBQUFBLElBQ2hCLE1BQU07QUFBQSxJQUNOLFdBQVcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxpQkFBaUIsU0FBUyxRQUFRLFFBQVEsWUFBWTtBQUFBLElBQ3ZGLGdCQUFnQixDQUFDLFVBQVUsR0FBRyxRQUFRLFNBQVMsU0FBUyxhQUFhLFFBQVEsSUFBSTtBQUFBLElBQ2pGLGNBQWMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxNQUFNLFdBQVcsY0FBYyxTQUFTLFdBQVcsUUFBUSxNQUFNLFdBQVcsU0FBUztBQUFBLElBQ3pILGNBQWMsQ0FBQyxVQUFVLEdBQUcsUUFBUSxTQUFTLFNBQVMsV0FBVyxRQUFRLElBQUk7QUFBQSxFQUNqRjtBQUFBLEVBQ0EsTUFBTSxjQUFjO0FBQUEsSUFDaEIsSUFBSSxPQUFPO0FBQ1AsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFBQSxJQUNBLFlBQVksTUFBTSxnQkFBZ0IsVUFBVTtBQUN4QyxXQUFLLGNBQWM7QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxNQUNqQjtBQUNBLFdBQUssUUFBUTtBQUNiLFdBQUssa0JBQWtCO0FBQ3ZCLFdBQUssVUFBVSxhQUFhLFlBQVksU0FBUyxTQUFTLFdBQVcsZUFBZTtBQUNwRixXQUFLLFlBQVksYUFBYSxTQUFTLFNBQVMsaUJBQWlCLGVBQWU7QUFDaEYsV0FBSyxnQkFDRCxhQUFhLFNBQVMsU0FBUyxLQUFLLFFBQVEsZUFBZTtBQUMvRCxXQUFLLGVBQ0QsYUFBYSxTQUFTLGNBQWMsV0FBVyxlQUFlO0FBQ2xFLFdBQUssaUJBQ0QsYUFBYSxTQUFTLGNBQWMsaUJBQWlCLGVBQWU7QUFDeEUsV0FBSyxxQkFDRCxhQUFhLFNBQVMsY0FBYyxLQUFLLFFBQVEsZUFBZTtBQUNwRSxXQUFLLFlBQVksYUFBYSxTQUFTLFdBQVcsV0FBVyxlQUFlO0FBQzVFLFdBQUssY0FDRCxhQUFhLFNBQVMsV0FBVyxpQkFBaUIsZUFBZTtBQUNyRSxXQUFLLGtCQUNELGFBQWEsU0FBUyxXQUFXLEtBQUssUUFBUSxlQUFlO0FBQ2pFLFdBQUssaUJBQ0QsYUFBYSxTQUFTLGdCQUFnQixXQUFXLGVBQWU7QUFDcEUsV0FBSyxtQkFDRCxhQUFhLFNBQVMsZ0JBQWdCLGlCQUFpQixlQUFlO0FBQzFFLFdBQUssdUJBQ0QsYUFBYSxTQUFTLGdCQUFnQixLQUFLLFFBQVEsZUFBZTtBQUN0RSxXQUFLLGtCQUNELGFBQWEsU0FBUyxpQkFBaUIsV0FBVyxlQUFlO0FBQ3JFLFdBQUssb0JBQ0QsYUFBYSxTQUFTLGlCQUFpQixpQkFBaUIsZUFBZTtBQUMzRSxXQUFLLHdCQUNELGFBQWEsU0FBUyxpQkFBaUIsS0FBSyxRQUFRLGVBQWU7QUFDdkUsV0FBSyxnQkFDRCxhQUFhLFNBQVMsZUFBZSxXQUFXLGVBQWU7QUFDbkUsV0FBSyxrQkFDRCxhQUFhLFNBQVMsZUFBZSxpQkFBaUIsZUFBZTtBQUN6RSxXQUFLLHNCQUNELGFBQWEsU0FBUyxlQUFlLEtBQUssUUFBUSxlQUFlO0FBQ3JFLFdBQUssZ0JBQ0QsYUFBYSxTQUFTLGVBQWUsV0FBVyxlQUFlO0FBQ25FLFdBQUssa0JBQ0QsYUFBYSxTQUFTLGVBQWUsaUJBQWlCLGVBQWU7QUFDekUsV0FBSyxzQkFDRCxhQUFhLFNBQVMsZUFBZSxLQUFLLFFBQVEsZUFBZTtBQUNyRSxXQUFLLGFBQWE7QUFDbEIsV0FBSyxlQUFlO0FBQ3BCLFdBQUssb0JBQW9CO0FBQ3pCLFdBQUssbUJBQW1CO0FBQ3hCLFlBQU0sa0JBQWtCLFlBQVksU0FBUztBQUM3QyxZQUFNLGdCQUFnQixrQkFBa0IsZUFBZTtBQUN2RCxVQUFJLG1CQUFtQixlQUFlO0FBR2xDLGFBQUssYUFBYSxrQkFBa0IsV0FBVztBQUMvQyxhQUFLLGVBQWU7QUFDcEIsYUFBSyxvQkFBb0I7QUFDekIsYUFBSyxtQkFBbUIsS0FBSztBQUM3QixZQUFJLENBQUMsU0FBUyxnQkFBZ0I7QUFDMUIsZUFBSyxrQkFBa0I7QUFDdkIsZUFBSyxvQkFBb0I7QUFDekIsZUFBSyx3QkFBd0IsS0FBSztBQUFBLFFBQ3RDO0FBQ0EsWUFBSSxDQUFDLFNBQVMsY0FBYztBQUN4QixlQUFLLGdCQUFnQjtBQUNyQixlQUFLLGtCQUFrQjtBQUN2QixlQUFLLHNCQUFzQixLQUFLO0FBQUEsUUFDcEM7QUFDQSxZQUFJLENBQUMsU0FBUyxjQUFjO0FBQ3hCLGVBQUssZ0JBQWdCO0FBQ3JCLGVBQUssa0JBQWtCO0FBQ3ZCLGVBQUssc0JBQXNCLEtBQUs7QUFBQSxRQUNwQztBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSxLQUFLLFlBQVksVUFBVTtBQUN2QixhQUFPLEtBQUssVUFDTixLQUFLLFFBQVEsT0FBTyxLQUFLLFdBQVcsS0FBSyxNQUFNLFlBQVksUUFBUSxJQUNuRSxJQUFJLFNBQVMsWUFBWSxRQUFRO0FBQUEsSUFDM0M7QUFBQSxJQUNBLFVBQVUsWUFBWSxVQUFVLFFBQVE7QUFDcEMsYUFBTyxLQUFLLGVBQ04sS0FBSyxhQUFhLFlBQVksS0FBSyxnQkFBZ0IsS0FBSyxvQkFBb0IsWUFBWSxVQUFVLE1BQU0sSUFDeEc7QUFBQSxJQUNWO0FBQUEsSUFDQSxPQUFPLFlBQVksVUFBVSxXQUFXLFdBQVcsUUFBUTtBQUN2RCxhQUFPLEtBQUssWUFDTixLQUFLLFVBQVUsU0FBUyxLQUFLLGFBQWEsS0FBSyxpQkFBaUIsWUFBWSxVQUFVLFdBQVcsV0FBVyxNQUFNLElBQ2xILFNBQVMsTUFBTSxXQUFXLFNBQVM7QUFBQSxJQUM3QztBQUFBLElBQ0EsWUFBWSxZQUFZLE9BQU87QUFDM0IsYUFBTyxLQUFLLGlCQUNOLEtBQUssZUFBZSxjQUFjLEtBQUssa0JBQWtCLEtBQUssc0JBQXNCLFlBQVksS0FBSyxJQUNyRztBQUFBLElBQ1Y7QUFBQSxJQUNBLGFBQWEsWUFBWSxNQUFNO0FBQzNCLFVBQUksYUFBYTtBQUNqQixVQUFJLEtBQUssaUJBQWlCO0FBQ3RCLFlBQUksS0FBSyxZQUFZO0FBQ2pCLHFCQUFXLGVBQWUsS0FBSyxLQUFLLGlCQUFpQjtBQUFBLFFBQ3pEO0FBQ0EscUJBQWEsS0FBSyxnQkFBZ0IsZUFBZSxLQUFLLG1CQUFtQixLQUFLLHVCQUF1QixZQUFZLElBQUk7QUFDckgsWUFBSSxDQUFDO0FBQ0QsdUJBQWE7QUFBQSxNQUNyQixPQUNLO0FBQ0QsWUFBSSxLQUFLLFlBQVk7QUFDakIsZUFBSyxXQUFXLElBQUk7QUFBQSxRQUN4QixXQUNTLEtBQUssUUFBUSxXQUFXO0FBQzdCLDRCQUFrQixJQUFJO0FBQUEsUUFDMUIsT0FDSztBQUNELGdCQUFNLElBQUksTUFBTSw2QkFBNkI7QUFBQSxRQUNqRDtBQUFBLE1BQ0o7QUFDQSxhQUFPO0FBQUEsSUFDWDtBQUFBLElBQ0EsV0FBVyxZQUFZLE1BQU0sV0FBVyxXQUFXO0FBQy9DLGFBQU8sS0FBSyxnQkFDTixLQUFLLGNBQWMsYUFBYSxLQUFLLGlCQUFpQixLQUFLLHFCQUFxQixZQUFZLE1BQU0sV0FBVyxTQUFTLElBQ3RILEtBQUssU0FBUyxNQUFNLFdBQVcsU0FBUztBQUFBLElBQ2xEO0FBQUEsSUFDQSxXQUFXLFlBQVksTUFBTTtBQUN6QixVQUFJO0FBQ0osVUFBSSxLQUFLLGVBQWU7QUFDcEIsZ0JBQVEsS0FBSyxjQUFjLGFBQWEsS0FBSyxpQkFBaUIsS0FBSyxxQkFBcUIsWUFBWSxJQUFJO0FBQUEsTUFDNUcsT0FDSztBQUNELFlBQUksQ0FBQyxLQUFLLFVBQVU7QUFDaEIsZ0JBQU0sTUFBTSx3QkFBd0I7QUFBQSxRQUN4QztBQUNBLGdCQUFRLEtBQUssU0FBUyxJQUFJO0FBQUEsTUFDOUI7QUFDQSxhQUFPO0FBQUEsSUFDWDtBQUFBLElBQ0EsUUFBUSxZQUFZLFNBQVM7QUFHekIsVUFBSTtBQUNBLGFBQUssY0FDRCxLQUFLLFdBQVcsVUFBVSxLQUFLLGNBQWMsS0FBSyxrQkFBa0IsWUFBWSxPQUFPO0FBQUEsTUFDL0YsU0FDTyxLQUFLO0FBQ1IsYUFBSyxZQUFZLFlBQVksR0FBRztBQUFBLE1BQ3BDO0FBQUEsSUFDSjtBQUFBO0FBQUEsSUFFQSxpQkFBaUIsTUFBTSxPQUFPO0FBQzFCLFlBQU0sU0FBUyxLQUFLO0FBQ3BCLFlBQU0sT0FBTyxPQUFPLElBQUk7QUFDeEIsWUFBTSxPQUFRLE9BQU8sSUFBSSxJQUFJLE9BQU87QUFDcEMsVUFBSSxPQUFPLEdBQUc7QUFDVixjQUFNLElBQUksTUFBTSwwQ0FBMEM7QUFBQSxNQUM5RDtBQUNBLFVBQUksUUFBUSxLQUFLLFFBQVEsR0FBRztBQUN4QixjQUFNLFVBQVU7QUFBQSxVQUNaLFdBQVcsT0FBTyxXQUFXLElBQUk7QUFBQSxVQUNqQyxXQUFXLE9BQU8sV0FBVyxJQUFJO0FBQUEsVUFDakMsV0FBVyxPQUFPLFdBQVcsSUFBSTtBQUFBLFVBQ2pDLFFBQVE7QUFBQSxRQUNaO0FBQ0EsYUFBSyxRQUFRLEtBQUssT0FBTyxPQUFPO0FBQUEsTUFDcEM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsTUFBTSxTQUFTO0FBQUEsSUFDWCxZQUFZLE1BQU0sUUFBUSxVQUFVLFNBQVMsWUFBWSxVQUFVO0FBRS9ELFdBQUssUUFBUTtBQUNiLFdBQUssV0FBVztBQUVoQixXQUFLLGlCQUFpQjtBQUV0QixXQUFLLFNBQVM7QUFDZCxXQUFLLE9BQU87QUFDWixXQUFLLFNBQVM7QUFDZCxXQUFLLE9BQU87QUFDWixXQUFLLGFBQWE7QUFDbEIsV0FBSyxXQUFXO0FBQ2hCLFVBQUksQ0FBQyxVQUFVO0FBQ1gsY0FBTSxJQUFJLE1BQU0seUJBQXlCO0FBQUEsTUFDN0M7QUFDQSxXQUFLLFdBQVc7QUFDaEIsWUFBTUEsUUFBTztBQUViLFVBQUksU0FBUyxhQUFhLFdBQVcsUUFBUSxNQUFNO0FBQy9DLGFBQUssU0FBUyxTQUFTO0FBQUEsTUFDM0IsT0FDSztBQUNELGFBQUssU0FBUyxXQUFZO0FBQ3RCLGlCQUFPLFNBQVMsV0FBVyxLQUFLLFFBQVFBLE9BQU0sTUFBTSxTQUFTO0FBQUEsUUFDakU7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTyxXQUFXLE1BQU0sUUFBUSxNQUFNO0FBQ2xDLFVBQUksQ0FBQyxNQUFNO0FBQ1AsZUFBTztBQUFBLE1BQ1g7QUFDQTtBQUNBLFVBQUk7QUFDQSxhQUFLO0FBQ0wsZUFBTyxLQUFLLEtBQUssUUFBUSxNQUFNLFFBQVEsSUFBSTtBQUFBLE1BQy9DLFVBQ0E7QUFDSSxZQUFJLDZCQUE2QixHQUFHO0FBQ2hDLDhCQUFvQjtBQUFBLFFBQ3hCO0FBQ0E7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsSUFBSSxPQUFPO0FBQ1AsYUFBTyxLQUFLO0FBQUEsSUFDaEI7QUFBQSxJQUNBLElBQUksUUFBUTtBQUNSLGFBQU8sS0FBSztBQUFBLElBQ2hCO0FBQUEsSUFDQSx3QkFBd0I7QUFDcEIsV0FBSyxjQUFjLGNBQWMsVUFBVTtBQUFBLElBQy9DO0FBQUE7QUFBQSxJQUVBLGNBQWMsU0FBUyxZQUFZLFlBQVk7QUFDM0MsVUFBSSxLQUFLLFdBQVcsY0FBYyxLQUFLLFdBQVcsWUFBWTtBQUMxRCxhQUFLLFNBQVM7QUFDZCxZQUFJLFdBQVcsY0FBYztBQUN6QixlQUFLLGlCQUFpQjtBQUFBLFFBQzFCO0FBQUEsTUFDSixPQUNLO0FBQ0QsY0FBTSxJQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksS0FBSyxLQUFLLE1BQU0sNkJBQTZCLE9BQU8sdUJBQXVCLFVBQVUsSUFBSSxhQUFhLFVBQVUsYUFBYSxNQUFNLEVBQUUsVUFBVSxLQUFLLE1BQU0sSUFBSTtBQUFBLE1BQzlMO0FBQUEsSUFDSjtBQUFBLElBQ0EsV0FBVztBQUNQLFVBQUksS0FBSyxRQUFRLE9BQU8sS0FBSyxLQUFLLGFBQWEsYUFBYTtBQUN4RCxlQUFPLEtBQUssS0FBSyxTQUFTLFNBQVM7QUFBQSxNQUN2QyxPQUNLO0FBQ0QsZUFBTyxPQUFPLFVBQVUsU0FBUyxLQUFLLElBQUk7QUFBQSxNQUM5QztBQUFBLElBQ0o7QUFBQTtBQUFBO0FBQUEsSUFHQSxTQUFTO0FBQ0wsYUFBTztBQUFBLFFBQ0gsTUFBTSxLQUFLO0FBQUEsUUFDWCxPQUFPLEtBQUs7QUFBQSxRQUNaLFFBQVEsS0FBSztBQUFBLFFBQ2IsTUFBTSxLQUFLLEtBQUs7QUFBQSxRQUNoQixVQUFVLEtBQUs7QUFBQSxNQUNuQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBTUEsUUFBTSxtQkFBbUIsV0FBVyxZQUFZO0FBQ2hELFFBQU0sZ0JBQWdCLFdBQVcsU0FBUztBQUMxQyxRQUFNLGFBQWEsV0FBVyxNQUFNO0FBQ3BDLE1BQUksa0JBQWtCLENBQUM7QUFDdkIsTUFBSSw0QkFBNEI7QUFDaEMsTUFBSTtBQUNKLFdBQVMsd0JBQXdCLE1BQU07QUFDbkMsUUFBSSxDQUFDLDZCQUE2QjtBQUM5QixVQUFJLE9BQU8sYUFBYSxHQUFHO0FBQ3ZCLHNDQUE4QixPQUFPLGFBQWEsRUFBRSxRQUFRLENBQUM7QUFBQSxNQUNqRTtBQUFBLElBQ0o7QUFDQSxRQUFJLDZCQUE2QjtBQUM3QixVQUFJLGFBQWEsNEJBQTRCLFVBQVU7QUFDdkQsVUFBSSxDQUFDLFlBQVk7QUFHYixxQkFBYSw0QkFBNEIsTUFBTTtBQUFBLE1BQ25EO0FBQ0EsaUJBQVcsS0FBSyw2QkFBNkIsSUFBSTtBQUFBLElBQ3JELE9BQ0s7QUFDRCxhQUFPLGdCQUFnQixFQUFFLE1BQU0sQ0FBQztBQUFBLElBQ3BDO0FBQUEsRUFDSjtBQUNBLFdBQVMsa0JBQWtCLE1BQU07QUFHN0IsUUFBSSw4QkFBOEIsS0FBSyxnQkFBZ0IsV0FBVyxHQUFHO0FBRWpFLDhCQUF3QixtQkFBbUI7QUFBQSxJQUMvQztBQUNBLFlBQVEsZ0JBQWdCLEtBQUssSUFBSTtBQUFBLEVBQ3JDO0FBQ0EsV0FBUyxzQkFBc0I7QUFDM0IsUUFBSSxDQUFDLDJCQUEyQjtBQUM1QixrQ0FBNEI7QUFDNUIsYUFBTyxnQkFBZ0IsUUFBUTtBQUMzQixjQUFNLFFBQVE7QUFDZCwwQkFBa0IsQ0FBQztBQUNuQixpQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNuQyxnQkFBTSxPQUFPLE1BQU0sQ0FBQztBQUNwQixjQUFJO0FBQ0EsaUJBQUssS0FBSyxRQUFRLE1BQU0sTUFBTSxJQUFJO0FBQUEsVUFDdEMsU0FDTyxPQUFPO0FBQ1YsaUJBQUssaUJBQWlCLEtBQUs7QUFBQSxVQUMvQjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQ0EsV0FBSyxtQkFBbUI7QUFDeEIsa0NBQTRCO0FBQUEsSUFDaEM7QUFBQSxFQUNKO0FBTUEsUUFBTSxVQUFVLEVBQUUsTUFBTSxVQUFVO0FBQ2xDLFFBQU0sZUFBZSxnQkFBZ0IsYUFBYSxjQUFjLFlBQVksYUFBYSxVQUFVLFdBQVcsWUFBWSxhQUFhLFVBQVU7QUFDakosUUFBTSxZQUFZLGFBQWEsWUFBWSxhQUFhLFlBQVk7QUFDcEUsUUFBTSxVQUFVLENBQUM7QUFDakIsUUFBTSxPQUFPO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixrQkFBa0IsTUFBTTtBQUFBLElBQ3hCLGtCQUFrQjtBQUFBLElBQ2xCLG9CQUFvQjtBQUFBLElBQ3BCO0FBQUEsSUFDQSxtQkFBbUIsTUFBTSxDQUFDLFNBQVMsV0FBVyxpQ0FBaUMsQ0FBQztBQUFBLElBQ2hGLGtCQUFrQixNQUFNLENBQUM7QUFBQSxJQUN6QixtQkFBbUI7QUFBQSxJQUNuQixhQUFhLE1BQU07QUFBQSxJQUNuQixlQUFlLE1BQU0sQ0FBQztBQUFBLElBQ3RCLFdBQVcsTUFBTTtBQUFBLElBQ2pCLGdCQUFnQixNQUFNO0FBQUEsSUFDdEIscUJBQXFCLE1BQU07QUFBQSxJQUMzQixZQUFZLE1BQU07QUFBQSxJQUNsQixrQkFBa0IsTUFBTTtBQUFBLElBQ3hCLHNCQUFzQixNQUFNO0FBQUEsSUFDNUIsZ0NBQWdDLE1BQU07QUFBQSxJQUN0QyxjQUFjLE1BQU07QUFBQSxJQUNwQixZQUFZLE1BQU0sQ0FBQztBQUFBLElBQ25CLFlBQVksTUFBTTtBQUFBLElBQ2xCLHFCQUFxQixNQUFNO0FBQUEsSUFDM0Isa0JBQWtCLE1BQU0sQ0FBQztBQUFBLElBQ3pCLHVCQUF1QixNQUFNO0FBQUEsSUFDN0IsbUJBQW1CLE1BQU07QUFBQSxJQUN6QixnQkFBZ0IsTUFBTTtBQUFBLElBQ3RCO0FBQUEsRUFDSjtBQUNBLE1BQUksb0JBQW9CLEVBQUUsUUFBUSxNQUFNLE1BQU0sSUFBSSxTQUFTLE1BQU0sSUFBSSxFQUFFO0FBQ3ZFLE1BQUksZUFBZTtBQUNuQixNQUFJLDRCQUE0QjtBQUNoQyxXQUFTLE9BQU87QUFBQSxFQUFFO0FBQ2xCLHFCQUFtQixRQUFRLE1BQU07QUFDakMsU0FBTztBQUNYO0FBRUEsU0FBUyxXQUFXO0FBVWhCLFFBQU1DLFVBQVM7QUFDZixRQUFNLGlCQUFpQkEsUUFBTyxXQUFXLHlCQUF5QixDQUFDLE1BQU07QUFDekUsTUFBSUEsUUFBTyxNQUFNLE1BQU0sa0JBQWtCLE9BQU9BLFFBQU8sTUFBTSxFQUFFLGVBQWUsYUFBYTtBQUN2RixVQUFNLElBQUksTUFBTSxzQkFBc0I7QUFBQSxFQUMxQztBQUVBLEVBQUFBLFFBQU8sTUFBTSxNQUFNLFNBQVM7QUFDNUIsU0FBT0EsUUFBTyxNQUFNO0FBQ3hCO0FBU0EsSUFBTSxpQ0FBaUMsT0FBTztBQUU5QyxJQUFNLHVCQUF1QixPQUFPO0FBRXBDLElBQU0sdUJBQXVCLE9BQU87QUFFcEMsSUFBTSxlQUFlLE9BQU87QUFFNUIsSUFBTSxhQUFhLE1BQU0sVUFBVTtBQUVuQyxJQUFNLHlCQUF5QjtBQUUvQixJQUFNLDRCQUE0QjtBQUVsQyxJQUFNLGlDQUFpQyxXQUFXLHNCQUFzQjtBQUV4RSxJQUFNLG9DQUFvQyxXQUFXLHlCQUF5QjtBQUU5RSxJQUFNLFdBQVc7QUFFakIsSUFBTSxZQUFZO0FBRWxCLElBQU0scUJBQXFCLFdBQVcsRUFBRTtBQUN4QyxTQUFTLG9CQUFvQixVQUFVLFFBQVE7QUFDM0MsU0FBTyxLQUFLLFFBQVEsS0FBSyxVQUFVLE1BQU07QUFDN0M7QUFDQSxTQUFTLGlDQUFpQyxRQUFRLFVBQVUsTUFBTSxnQkFBZ0IsY0FBYztBQUM1RixTQUFPLEtBQUssUUFBUSxrQkFBa0IsUUFBUSxVQUFVLE1BQU0sZ0JBQWdCLFlBQVk7QUFDOUY7QUFDQSxJQUFNLGFBQWE7QUFDbkIsSUFBTSxpQkFBaUIsT0FBTyxXQUFXO0FBQ3pDLElBQU0saUJBQWlCLGlCQUFpQixTQUFTO0FBQ2pELElBQU0sVUFBVyxrQkFBa0Isa0JBQW1CO0FBQ3RELElBQU0sbUJBQW1CO0FBQ3pCLFNBQVMsY0FBYyxNQUFNLFFBQVE7QUFDakMsV0FBUyxJQUFJLEtBQUssU0FBUyxHQUFHLEtBQUssR0FBRyxLQUFLO0FBQ3ZDLFFBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZO0FBQy9CLFdBQUssQ0FBQyxJQUFJLG9CQUFvQixLQUFLLENBQUMsR0FBRyxTQUFTLE1BQU0sQ0FBQztBQUFBLElBQzNEO0FBQUEsRUFDSjtBQUNBLFNBQU87QUFDWDtBQUNBLFNBQVMsZUFBZSxXQUFXLFNBQVM7QUFDeEMsUUFBTSxTQUFTLFVBQVUsWUFBWSxNQUFNO0FBQzNDLFdBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxRQUFRLEtBQUs7QUFDckMsVUFBTSxPQUFPLFFBQVEsQ0FBQztBQUN0QixVQUFNLFdBQVcsVUFBVSxJQUFJO0FBQy9CLFFBQUksVUFBVTtBQUNWLFlBQU0sZ0JBQWdCLCtCQUErQixXQUFXLElBQUk7QUFDcEUsVUFBSSxDQUFDLG1CQUFtQixhQUFhLEdBQUc7QUFDcEM7QUFBQSxNQUNKO0FBQ0EsZ0JBQVUsSUFBSSxLQUFLLENBQUNDLGNBQWE7QUFDN0IsY0FBTSxVQUFVLFdBQVk7QUFDeEIsaUJBQU9BLFVBQVMsTUFBTSxNQUFNLGNBQWMsV0FBVyxTQUFTLE1BQU0sSUFBSSxDQUFDO0FBQUEsUUFDN0U7QUFDQSw4QkFBc0IsU0FBU0EsU0FBUTtBQUN2QyxlQUFPO0FBQUEsTUFDWCxHQUFHLFFBQVE7QUFBQSxJQUNmO0FBQUEsRUFDSjtBQUNKO0FBQ0EsU0FBUyxtQkFBbUIsY0FBYztBQUN0QyxNQUFJLENBQUMsY0FBYztBQUNmLFdBQU87QUFBQSxFQUNYO0FBQ0EsTUFBSSxhQUFhLGFBQWEsT0FBTztBQUNqQyxXQUFPO0FBQUEsRUFDWDtBQUNBLFNBQU8sRUFBRSxPQUFPLGFBQWEsUUFBUSxjQUFjLE9BQU8sYUFBYSxRQUFRO0FBQ25GO0FBQ0EsSUFBTSxjQUFjLE9BQU8sc0JBQXNCLGVBQWUsZ0JBQWdCO0FBR2hGLElBQU0sU0FBUyxFQUFFLFFBQVEsWUFDckIsT0FBTyxRQUFRLFlBQVksZUFDM0IsUUFBUSxRQUFRLFNBQVMsTUFBTTtBQUNuQyxJQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUUsa0JBQWtCLGVBQWUsYUFBYTtBQUk5RixJQUFNLFFBQVEsT0FBTyxRQUFRLFlBQVksZUFDckMsUUFBUSxRQUFRLFNBQVMsTUFBTSxzQkFDL0IsQ0FBQyxlQUNELENBQUMsRUFBRSxrQkFBa0IsZUFBZSxhQUFhO0FBQ3JELElBQU0seUJBQXlCLENBQUM7QUFDaEMsSUFBTSxTQUFTLFNBQVUsT0FBTztBQUc1QixVQUFRLFNBQVMsUUFBUTtBQUN6QixNQUFJLENBQUMsT0FBTztBQUNSO0FBQUEsRUFDSjtBQUNBLE1BQUksa0JBQWtCLHVCQUF1QixNQUFNLElBQUk7QUFDdkQsTUFBSSxDQUFDLGlCQUFpQjtBQUNsQixzQkFBa0IsdUJBQXVCLE1BQU0sSUFBSSxJQUFJLFdBQVcsZ0JBQWdCLE1BQU0sSUFBSTtBQUFBLEVBQ2hHO0FBQ0EsUUFBTSxTQUFTLFFBQVEsTUFBTSxVQUFVO0FBQ3ZDLFFBQU0sV0FBVyxPQUFPLGVBQWU7QUFDdkMsTUFBSTtBQUNKLE1BQUksYUFBYSxXQUFXLGtCQUFrQixNQUFNLFNBQVMsU0FBUztBQUlsRSxVQUFNLGFBQWE7QUFDbkIsYUFDSSxZQUNJLFNBQVMsS0FBSyxNQUFNLFdBQVcsU0FBUyxXQUFXLFVBQVUsV0FBVyxRQUFRLFdBQVcsT0FBTyxXQUFXLEtBQUs7QUFDMUgsUUFBSSxXQUFXLE1BQU07QUFDakIsWUFBTSxlQUFlO0FBQUEsSUFDekI7QUFBQSxFQUNKLE9BQ0s7QUFDRCxhQUFTLFlBQVksU0FBUyxNQUFNLE1BQU0sU0FBUztBQUNuRCxRQUFJLFVBQVUsVUFBYSxDQUFDLFFBQVE7QUFDaEMsWUFBTSxlQUFlO0FBQUEsSUFDekI7QUFBQSxFQUNKO0FBQ0EsU0FBTztBQUNYO0FBQ0EsU0FBUyxjQUFjLEtBQUssTUFBTSxXQUFXO0FBQ3pDLE1BQUksT0FBTywrQkFBK0IsS0FBSyxJQUFJO0FBQ25ELE1BQUksQ0FBQyxRQUFRLFdBQVc7QUFFcEIsVUFBTSxnQkFBZ0IsK0JBQStCLFdBQVcsSUFBSTtBQUNwRSxRQUFJLGVBQWU7QUFDZixhQUFPLEVBQUUsWUFBWSxNQUFNLGNBQWMsS0FBSztBQUFBLElBQ2xEO0FBQUEsRUFDSjtBQUdBLE1BQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxjQUFjO0FBQzdCO0FBQUEsRUFDSjtBQUNBLFFBQU0sc0JBQXNCLFdBQVcsT0FBTyxPQUFPLFNBQVM7QUFDOUQsTUFBSSxJQUFJLGVBQWUsbUJBQW1CLEtBQUssSUFBSSxtQkFBbUIsR0FBRztBQUNyRTtBQUFBLEVBQ0o7QUFNQSxTQUFPLEtBQUs7QUFDWixTQUFPLEtBQUs7QUFDWixRQUFNLGtCQUFrQixLQUFLO0FBQzdCLFFBQU0sa0JBQWtCLEtBQUs7QUFFN0IsUUFBTSxZQUFZLEtBQUssTUFBTSxDQUFDO0FBQzlCLE1BQUksa0JBQWtCLHVCQUF1QixTQUFTO0FBQ3RELE1BQUksQ0FBQyxpQkFBaUI7QUFDbEIsc0JBQWtCLHVCQUF1QixTQUFTLElBQUksV0FBVyxnQkFBZ0IsU0FBUztBQUFBLEVBQzlGO0FBQ0EsT0FBSyxNQUFNLFNBQVUsVUFBVTtBQUczQixRQUFJLFNBQVM7QUFDYixRQUFJLENBQUMsVUFBVSxRQUFRLFNBQVM7QUFDNUIsZUFBUztBQUFBLElBQ2I7QUFDQSxRQUFJLENBQUMsUUFBUTtBQUNUO0FBQUEsSUFDSjtBQUNBLFVBQU0sZ0JBQWdCLE9BQU8sZUFBZTtBQUM1QyxRQUFJLE9BQU8sa0JBQWtCLFlBQVk7QUFDckMsYUFBTyxvQkFBb0IsV0FBVyxNQUFNO0FBQUEsSUFDaEQ7QUFHQSx1QkFBbUIsZ0JBQWdCLEtBQUssUUFBUSxJQUFJO0FBQ3BELFdBQU8sZUFBZSxJQUFJO0FBQzFCLFFBQUksT0FBTyxhQUFhLFlBQVk7QUFDaEMsYUFBTyxpQkFBaUIsV0FBVyxRQUFRLEtBQUs7QUFBQSxJQUNwRDtBQUFBLEVBQ0o7QUFHQSxPQUFLLE1BQU0sV0FBWTtBQUduQixRQUFJLFNBQVM7QUFDYixRQUFJLENBQUMsVUFBVSxRQUFRLFNBQVM7QUFDNUIsZUFBUztBQUFBLElBQ2I7QUFDQSxRQUFJLENBQUMsUUFBUTtBQUNULGFBQU87QUFBQSxJQUNYO0FBQ0EsVUFBTSxXQUFXLE9BQU8sZUFBZTtBQUN2QyxRQUFJLFVBQVU7QUFDVixhQUFPO0FBQUEsSUFDWCxXQUNTLGlCQUFpQjtBQU90QixVQUFJLFFBQVEsZ0JBQWdCLEtBQUssSUFBSTtBQUNyQyxVQUFJLE9BQU87QUFDUCxhQUFLLElBQUksS0FBSyxNQUFNLEtBQUs7QUFDekIsWUFBSSxPQUFPLE9BQU8sZ0JBQWdCLE1BQU0sWUFBWTtBQUNoRCxpQkFBTyxnQkFBZ0IsSUFBSTtBQUFBLFFBQy9CO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDQSx1QkFBcUIsS0FBSyxNQUFNLElBQUk7QUFDcEMsTUFBSSxtQkFBbUIsSUFBSTtBQUMvQjtBQUNBLFNBQVMsa0JBQWtCLEtBQUssWUFBWSxXQUFXO0FBQ25ELE1BQUksWUFBWTtBQUNaLGFBQVMsSUFBSSxHQUFHLElBQUksV0FBVyxRQUFRLEtBQUs7QUFDeEMsb0JBQWMsS0FBSyxPQUFPLFdBQVcsQ0FBQyxHQUFHLFNBQVM7QUFBQSxJQUN0RDtBQUFBLEVBQ0osT0FDSztBQUNELFVBQU0sZUFBZSxDQUFDO0FBQ3RCLGVBQVcsUUFBUSxLQUFLO0FBQ3BCLFVBQUksS0FBSyxNQUFNLEdBQUcsQ0FBQyxLQUFLLE1BQU07QUFDMUIscUJBQWEsS0FBSyxJQUFJO0FBQUEsTUFDMUI7QUFBQSxJQUNKO0FBQ0EsYUFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLFFBQVEsS0FBSztBQUMxQyxvQkFBYyxLQUFLLGFBQWEsQ0FBQyxHQUFHLFNBQVM7QUFBQSxJQUNqRDtBQUFBLEVBQ0o7QUFDSjtBQUNBLElBQU0sc0JBQXNCLFdBQVcsa0JBQWtCO0FBRXpELFNBQVMsV0FBVyxXQUFXO0FBQzNCLFFBQU0sZ0JBQWdCLFFBQVEsU0FBUztBQUN2QyxNQUFJLENBQUM7QUFDRDtBQUVKLFVBQVEsV0FBVyxTQUFTLENBQUMsSUFBSTtBQUNqQyxVQUFRLFNBQVMsSUFBSSxXQUFZO0FBQzdCLFVBQU0sSUFBSSxjQUFjLFdBQVcsU0FBUztBQUM1QyxZQUFRLEVBQUUsUUFBUTtBQUFBLE1BQ2QsS0FBSztBQUNELGFBQUssbUJBQW1CLElBQUksSUFBSSxjQUFjO0FBQzlDO0FBQUEsTUFDSixLQUFLO0FBQ0QsYUFBSyxtQkFBbUIsSUFBSSxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDbEQ7QUFBQSxNQUNKLEtBQUs7QUFDRCxhQUFLLG1CQUFtQixJQUFJLElBQUksY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN4RDtBQUFBLE1BQ0osS0FBSztBQUNELGFBQUssbUJBQW1CLElBQUksSUFBSSxjQUFjLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzlEO0FBQUEsTUFDSixLQUFLO0FBQ0QsYUFBSyxtQkFBbUIsSUFBSSxJQUFJLGNBQWMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDcEU7QUFBQSxNQUNKO0FBQ0ksY0FBTSxJQUFJLE1BQU0sb0JBQW9CO0FBQUEsSUFDNUM7QUFBQSxFQUNKO0FBRUEsd0JBQXNCLFFBQVEsU0FBUyxHQUFHLGFBQWE7QUFDdkQsUUFBTSxXQUFXLElBQUksY0FBYyxXQUFZO0FBQUEsRUFBRSxDQUFDO0FBQ2xELE1BQUk7QUFDSixPQUFLLFFBQVEsVUFBVTtBQUVuQixRQUFJLGNBQWMsb0JBQW9CLFNBQVM7QUFDM0M7QUFDSixLQUFDLFNBQVVDLE9BQU07QUFDYixVQUFJLE9BQU8sU0FBU0EsS0FBSSxNQUFNLFlBQVk7QUFDdEMsZ0JBQVEsU0FBUyxFQUFFLFVBQVVBLEtBQUksSUFBSSxXQUFZO0FBQzdDLGlCQUFPLEtBQUssbUJBQW1CLEVBQUVBLEtBQUksRUFBRSxNQUFNLEtBQUssbUJBQW1CLEdBQUcsU0FBUztBQUFBLFFBQ3JGO0FBQUEsTUFDSixPQUNLO0FBQ0QsNkJBQXFCLFFBQVEsU0FBUyxFQUFFLFdBQVdBLE9BQU07QUFBQSxVQUNyRCxLQUFLLFNBQVUsSUFBSTtBQUNmLGdCQUFJLE9BQU8sT0FBTyxZQUFZO0FBQzFCLG1CQUFLLG1CQUFtQixFQUFFQSxLQUFJLElBQUksb0JBQW9CLElBQUksWUFBWSxNQUFNQSxLQUFJO0FBSWhGLG9DQUFzQixLQUFLLG1CQUFtQixFQUFFQSxLQUFJLEdBQUcsRUFBRTtBQUFBLFlBQzdELE9BQ0s7QUFDRCxtQkFBSyxtQkFBbUIsRUFBRUEsS0FBSSxJQUFJO0FBQUEsWUFDdEM7QUFBQSxVQUNKO0FBQUEsVUFDQSxLQUFLLFdBQVk7QUFDYixtQkFBTyxLQUFLLG1CQUFtQixFQUFFQSxLQUFJO0FBQUEsVUFDekM7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSixHQUFHLElBQUk7QUFBQSxFQUNYO0FBQ0EsT0FBSyxRQUFRLGVBQWU7QUFDeEIsUUFBSSxTQUFTLGVBQWUsY0FBYyxlQUFlLElBQUksR0FBRztBQUM1RCxjQUFRLFNBQVMsRUFBRSxJQUFJLElBQUksY0FBYyxJQUFJO0FBQUEsSUFDakQ7QUFBQSxFQUNKO0FBQ0o7QUFDQSxTQUFTLFlBQVksUUFBUSxNQUFNLFNBQVM7QUFDeEMsTUFBSSxRQUFRO0FBQ1osU0FBTyxTQUFTLENBQUMsTUFBTSxlQUFlLElBQUksR0FBRztBQUN6QyxZQUFRLHFCQUFxQixLQUFLO0FBQUEsRUFDdEM7QUFDQSxNQUFJLENBQUMsU0FBUyxPQUFPLElBQUksR0FBRztBQUV4QixZQUFRO0FBQUEsRUFDWjtBQUNBLFFBQU0sZUFBZSxXQUFXLElBQUk7QUFDcEMsTUFBSSxXQUFXO0FBQ2YsTUFBSSxVQUFVLEVBQUUsV0FBVyxNQUFNLFlBQVksTUFBTSxDQUFDLE1BQU0sZUFBZSxZQUFZLElBQUk7QUFDckYsZUFBVyxNQUFNLFlBQVksSUFBSSxNQUFNLElBQUk7QUFHM0MsVUFBTSxPQUFPLFNBQVMsK0JBQStCLE9BQU8sSUFBSTtBQUNoRSxRQUFJLG1CQUFtQixJQUFJLEdBQUc7QUFDMUIsWUFBTSxnQkFBZ0IsUUFBUSxVQUFVLGNBQWMsSUFBSTtBQUMxRCxZQUFNLElBQUksSUFBSSxXQUFZO0FBQ3RCLGVBQU8sY0FBYyxNQUFNLFNBQVM7QUFBQSxNQUN4QztBQUNBLDRCQUFzQixNQUFNLElBQUksR0FBRyxRQUFRO0FBQUEsSUFDL0M7QUFBQSxFQUNKO0FBQ0EsU0FBTztBQUNYO0FBRUEsU0FBUyxlQUFlLEtBQUssVUFBVSxhQUFhO0FBQ2hELE1BQUksWUFBWTtBQUNoQixXQUFTLGFBQWEsTUFBTTtBQUN4QixVQUFNLE9BQU8sS0FBSztBQUNsQixTQUFLLEtBQUssS0FBSyxLQUFLLElBQUksV0FBWTtBQUNoQyxXQUFLLE9BQU8sTUFBTSxNQUFNLFNBQVM7QUFBQSxJQUNyQztBQUNBLGNBQVUsTUFBTSxLQUFLLFFBQVEsS0FBSyxJQUFJO0FBQ3RDLFdBQU87QUFBQSxFQUNYO0FBQ0EsY0FBWSxZQUFZLEtBQUssVUFBVSxDQUFDLGFBQWEsU0FBVUgsT0FBTSxNQUFNO0FBQ3ZFLFVBQU0sT0FBTyxZQUFZQSxPQUFNLElBQUk7QUFDbkMsUUFBSSxLQUFLLFNBQVMsS0FBSyxPQUFPLEtBQUssS0FBSyxLQUFLLE1BQU0sWUFBWTtBQUMzRCxhQUFPLGlDQUFpQyxLQUFLLE1BQU0sS0FBSyxLQUFLLEtBQUssR0FBRyxNQUFNLFlBQVk7QUFBQSxJQUMzRixPQUNLO0FBRUQsYUFBTyxTQUFTLE1BQU1BLE9BQU0sSUFBSTtBQUFBLElBQ3BDO0FBQUEsRUFDSixDQUFDO0FBQ0w7QUFDQSxTQUFTLHNCQUFzQixTQUFTLFVBQVU7QUFDOUMsVUFBUSxXQUFXLGtCQUFrQixDQUFDLElBQUk7QUFDOUM7QUFDQSxJQUFJLHFCQUFxQjtBQUN6QixJQUFJLFdBQVc7QUFDZixTQUFTLE9BQU87QUFDWixNQUFJO0FBQ0EsVUFBTSxLQUFLLGVBQWUsVUFBVTtBQUNwQyxRQUFJLEdBQUcsUUFBUSxPQUFPLE1BQU0sTUFBTSxHQUFHLFFBQVEsVUFBVSxNQUFNLElBQUk7QUFDN0QsYUFBTztBQUFBLElBQ1g7QUFBQSxFQUNKLFNBQ08sT0FBTztBQUFBLEVBQUU7QUFDaEIsU0FBTztBQUNYO0FBQ0EsU0FBUyxhQUFhO0FBQ2xCLE1BQUksb0JBQW9CO0FBQ3BCLFdBQU87QUFBQSxFQUNYO0FBQ0EsdUJBQXFCO0FBQ3JCLE1BQUk7QUFDQSxVQUFNLEtBQUssZUFBZSxVQUFVO0FBQ3BDLFFBQUksR0FBRyxRQUFRLE9BQU8sTUFBTSxNQUFNLEdBQUcsUUFBUSxVQUFVLE1BQU0sTUFBTSxHQUFHLFFBQVEsT0FBTyxNQUFNLElBQUk7QUFDM0YsaUJBQVc7QUFBQSxJQUNmO0FBQUEsRUFDSixTQUNPLE9BQU87QUFBQSxFQUFFO0FBQ2hCLFNBQU87QUFDWDtBQU1BLElBQUksbUJBQW1CO0FBQ3ZCLElBQUksT0FBTyxXQUFXLGFBQWE7QUFDL0IsTUFBSTtBQUNBLFVBQU0sVUFBVSxPQUFPLGVBQWUsQ0FBQyxHQUFHLFdBQVc7QUFBQSxNQUNqRCxLQUFLLFdBQVk7QUFDYiwyQkFBbUI7QUFBQSxNQUN2QjtBQUFBLElBQ0osQ0FBQztBQUlELFdBQU8saUJBQWlCLFFBQVEsU0FBUyxPQUFPO0FBQ2hELFdBQU8sb0JBQW9CLFFBQVEsU0FBUyxPQUFPO0FBQUEsRUFDdkQsU0FDTyxLQUFLO0FBQ1IsdUJBQW1CO0FBQUEsRUFDdkI7QUFDSjtBQUVBLElBQU0saUNBQWlDO0FBQUEsRUFDbkMsTUFBTTtBQUNWO0FBQ0EsSUFBTSx1QkFBdUIsQ0FBQztBQUM5QixJQUFNLGdCQUFnQixDQUFDO0FBQ3ZCLElBQU0seUJBQXlCLElBQUksT0FBTyxNQUFNLHFCQUFxQixxQkFBcUI7QUFDMUYsSUFBTSwrQkFBK0IsV0FBVyxvQkFBb0I7QUFDcEUsU0FBUyxrQkFBa0IsV0FBVyxtQkFBbUI7QUFDckQsUUFBTSxrQkFBa0Isb0JBQW9CLGtCQUFrQixTQUFTLElBQUksYUFBYTtBQUN4RixRQUFNLGlCQUFpQixvQkFBb0Isa0JBQWtCLFNBQVMsSUFBSSxhQUFhO0FBQ3ZGLFFBQU0sU0FBUyxxQkFBcUI7QUFDcEMsUUFBTSxnQkFBZ0IscUJBQXFCO0FBQzNDLHVCQUFxQixTQUFTLElBQUksQ0FBQztBQUNuQyx1QkFBcUIsU0FBUyxFQUFFLFNBQVMsSUFBSTtBQUM3Qyx1QkFBcUIsU0FBUyxFQUFFLFFBQVEsSUFBSTtBQUNoRDtBQUNBLFNBQVMsaUJBQWlCSSxVQUFTLEtBQUssTUFBTSxjQUFjO0FBQ3hELFFBQU0scUJBQXNCLGdCQUFnQixhQUFhLE9BQVE7QUFDakUsUUFBTSx3QkFBeUIsZ0JBQWdCLGFBQWEsTUFBTztBQUNuRSxRQUFNLDJCQUE0QixnQkFBZ0IsYUFBYSxhQUFjO0FBQzdFLFFBQU0sc0NBQXVDLGdCQUFnQixhQUFhLFNBQVU7QUFDcEYsUUFBTSw2QkFBNkIsV0FBVyxrQkFBa0I7QUFDaEUsUUFBTSw0QkFBNEIsTUFBTSxxQkFBcUI7QUFDN0QsUUFBTSx5QkFBeUI7QUFDL0IsUUFBTSxnQ0FBZ0MsTUFBTSx5QkFBeUI7QUFDckUsUUFBTSxhQUFhLFNBQVUsTUFBTSxRQUFRLE9BQU87QUFHOUMsUUFBSSxLQUFLLFdBQVc7QUFDaEI7QUFBQSxJQUNKO0FBQ0EsVUFBTSxXQUFXLEtBQUs7QUFDdEIsUUFBSSxPQUFPLGFBQWEsWUFBWSxTQUFTLGFBQWE7QUFFdEQsV0FBSyxXQUFXLENBQUNDLFdBQVUsU0FBUyxZQUFZQSxNQUFLO0FBQ3JELFdBQUssbUJBQW1CO0FBQUEsSUFDNUI7QUFLQSxRQUFJO0FBQ0osUUFBSTtBQUNBLFdBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFBQSxJQUNyQyxTQUNPLEtBQUs7QUFDUixjQUFRO0FBQUEsSUFDWjtBQUNBLFVBQU0sVUFBVSxLQUFLO0FBQ3JCLFFBQUksV0FBVyxPQUFPLFlBQVksWUFBWSxRQUFRLE1BQU07QUFJeEQsWUFBTUgsWUFBVyxLQUFLLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLO0FBQ3RFLGFBQU8scUJBQXFCLEVBQUUsS0FBSyxRQUFRLE1BQU0sTUFBTUEsV0FBVSxPQUFPO0FBQUEsSUFDNUU7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUNBLFdBQVMsZUFBZSxTQUFTLE9BQU8sV0FBVztBQUcvQyxZQUFRLFNBQVNFLFNBQVE7QUFDekIsUUFBSSxDQUFDLE9BQU87QUFDUjtBQUFBLElBQ0o7QUFHQSxVQUFNLFNBQVMsV0FBVyxNQUFNLFVBQVVBO0FBQzFDLFVBQU0sUUFBUSxPQUFPLHFCQUFxQixNQUFNLElBQUksRUFBRSxZQUFZLFdBQVcsU0FBUyxDQUFDO0FBQ3ZGLFFBQUksT0FBTztBQUNQLFlBQU0sU0FBUyxDQUFDO0FBR2hCLFVBQUksTUFBTSxXQUFXLEdBQUc7QUFDcEIsY0FBTSxNQUFNLFdBQVcsTUFBTSxDQUFDLEdBQUcsUUFBUSxLQUFLO0FBQzlDLGVBQU8sT0FBTyxLQUFLLEdBQUc7QUFBQSxNQUMxQixPQUNLO0FBSUQsY0FBTSxZQUFZLE1BQU0sTUFBTTtBQUM5QixpQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVEsS0FBSztBQUN2QyxjQUFJLFNBQVMsTUFBTSw0QkFBNEIsTUFBTSxNQUFNO0FBQ3ZEO0FBQUEsVUFDSjtBQUNBLGdCQUFNLE1BQU0sV0FBVyxVQUFVLENBQUMsR0FBRyxRQUFRLEtBQUs7QUFDbEQsaUJBQU8sT0FBTyxLQUFLLEdBQUc7QUFBQSxRQUMxQjtBQUFBLE1BQ0o7QUFHQSxVQUFJLE9BQU8sV0FBVyxHQUFHO0FBQ3JCLGNBQU0sT0FBTyxDQUFDO0FBQUEsTUFDbEIsT0FDSztBQUNELGlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3BDLGdCQUFNLE1BQU0sT0FBTyxDQUFDO0FBQ3BCLGNBQUksd0JBQXdCLE1BQU07QUFDOUIsa0JBQU07QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNMO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBRUEsUUFBTSwwQkFBMEIsU0FBVSxPQUFPO0FBQzdDLFdBQU8sZUFBZSxNQUFNLE9BQU8sS0FBSztBQUFBLEVBQzVDO0FBRUEsUUFBTSxpQ0FBaUMsU0FBVSxPQUFPO0FBQ3BELFdBQU8sZUFBZSxNQUFNLE9BQU8sSUFBSTtBQUFBLEVBQzNDO0FBQ0EsV0FBUyx3QkFBd0IsS0FBS0UsZUFBYztBQUNoRCxRQUFJLENBQUMsS0FBSztBQUNOLGFBQU87QUFBQSxJQUNYO0FBQ0EsUUFBSSxvQkFBb0I7QUFDeEIsUUFBSUEsaUJBQWdCQSxjQUFhLFNBQVMsUUFBVztBQUNqRCwwQkFBb0JBLGNBQWE7QUFBQSxJQUNyQztBQUNBLFVBQU0sa0JBQWtCQSxpQkFBZ0JBLGNBQWE7QUFDckQsUUFBSSxpQkFBaUI7QUFDckIsUUFBSUEsaUJBQWdCQSxjQUFhLFdBQVcsUUFBVztBQUNuRCx1QkFBaUJBLGNBQWE7QUFBQSxJQUNsQztBQUNBLFFBQUksZUFBZTtBQUNuQixRQUFJQSxpQkFBZ0JBLGNBQWEsT0FBTyxRQUFXO0FBQy9DLHFCQUFlQSxjQUFhO0FBQUEsSUFDaEM7QUFDQSxRQUFJLFFBQVE7QUFDWixXQUFPLFNBQVMsQ0FBQyxNQUFNLGVBQWUsa0JBQWtCLEdBQUc7QUFDdkQsY0FBUSxxQkFBcUIsS0FBSztBQUFBLElBQ3RDO0FBQ0EsUUFBSSxDQUFDLFNBQVMsSUFBSSxrQkFBa0IsR0FBRztBQUVuQyxjQUFRO0FBQUEsSUFDWjtBQUNBLFFBQUksQ0FBQyxPQUFPO0FBQ1IsYUFBTztBQUFBLElBQ1g7QUFDQSxRQUFJLE1BQU0sMEJBQTBCLEdBQUc7QUFDbkMsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLG9CQUFvQkEsaUJBQWdCQSxjQUFhO0FBR3ZELFVBQU0sV0FBVyxDQUFDO0FBQ2xCLFVBQU0seUJBQTBCLE1BQU0sMEJBQTBCLElBQUksTUFBTSxrQkFBa0I7QUFDNUYsVUFBTSw0QkFBNkIsTUFBTSxXQUFXLHFCQUFxQixDQUFDLElBQ3RFLE1BQU0scUJBQXFCO0FBQy9CLFVBQU0sa0JBQW1CLE1BQU0sV0FBVyx3QkFBd0IsQ0FBQyxJQUMvRCxNQUFNLHdCQUF3QjtBQUNsQyxVQUFNLDJCQUE0QixNQUFNLFdBQVcsbUNBQW1DLENBQUMsSUFDbkYsTUFBTSxtQ0FBbUM7QUFDN0MsUUFBSTtBQUNKLFFBQUlBLGlCQUFnQkEsY0FBYSxTQUFTO0FBQ3RDLG1DQUE2QixNQUFNLFdBQVdBLGNBQWEsT0FBTyxDQUFDLElBQy9ELE1BQU1BLGNBQWEsT0FBTztBQUFBLElBQ2xDO0FBS0EsYUFBUywwQkFBMEIsU0FBUyxTQUFTO0FBQ2pELFVBQUksQ0FBQyxvQkFBb0IsT0FBTyxZQUFZLFlBQVksU0FBUztBQUk3RCxlQUFPLENBQUMsQ0FBQyxRQUFRO0FBQUEsTUFDckI7QUFDQSxVQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUztBQUMvQixlQUFPO0FBQUEsTUFDWDtBQUNBLFVBQUksT0FBTyxZQUFZLFdBQVc7QUFDOUIsZUFBTyxFQUFFLFNBQVMsU0FBUyxTQUFTLEtBQUs7QUFBQSxNQUM3QztBQUNBLFVBQUksQ0FBQyxTQUFTO0FBQ1YsZUFBTyxFQUFFLFNBQVMsS0FBSztBQUFBLE1BQzNCO0FBQ0EsVUFBSSxPQUFPLFlBQVksWUFBWSxRQUFRLFlBQVksT0FBTztBQUMxRCxlQUFPLEVBQUUsR0FBRyxTQUFTLFNBQVMsS0FBSztBQUFBLE1BQ3ZDO0FBQ0EsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLHVCQUF1QixTQUFVLE1BQU07QUFHekMsVUFBSSxTQUFTLFlBQVk7QUFDckI7QUFBQSxNQUNKO0FBQ0EsYUFBTyx1QkFBdUIsS0FBSyxTQUFTLFFBQVEsU0FBUyxXQUFXLFNBQVMsVUFBVSxpQ0FBaUMseUJBQXlCLFNBQVMsT0FBTztBQUFBLElBQ3pLO0FBQ0EsVUFBTSxxQkFBcUIsU0FBVSxNQUFNO0FBSXZDLFVBQUksQ0FBQyxLQUFLLFdBQVc7QUFDakIsY0FBTSxtQkFBbUIscUJBQXFCLEtBQUssU0FBUztBQUM1RCxZQUFJO0FBQ0osWUFBSSxrQkFBa0I7QUFDbEIsNEJBQWtCLGlCQUFpQixLQUFLLFVBQVUsV0FBVyxTQUFTO0FBQUEsUUFDMUU7QUFDQSxjQUFNLGdCQUFnQixtQkFBbUIsS0FBSyxPQUFPLGVBQWU7QUFDcEUsWUFBSSxlQUFlO0FBQ2YsbUJBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFDM0Msa0JBQU0sZUFBZSxjQUFjLENBQUM7QUFDcEMsZ0JBQUksaUJBQWlCLE1BQU07QUFDdkIsNEJBQWMsT0FBTyxHQUFHLENBQUM7QUFFekIsbUJBQUssWUFBWTtBQUNqQixrQkFBSSxjQUFjLFdBQVcsR0FBRztBQUc1QixxQkFBSyxhQUFhO0FBQ2xCLHFCQUFLLE9BQU8sZUFBZSxJQUFJO0FBQUEsY0FDbkM7QUFDQTtBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFJQSxVQUFJLENBQUMsS0FBSyxZQUFZO0FBQ2xCO0FBQUEsTUFDSjtBQUNBLGFBQU8sMEJBQTBCLEtBQUssS0FBSyxRQUFRLEtBQUssV0FBVyxLQUFLLFVBQVUsaUNBQWlDLHlCQUF5QixLQUFLLE9BQU87QUFBQSxJQUM1SjtBQUNBLFVBQU0sMEJBQTBCLFNBQVUsTUFBTTtBQUM1QyxhQUFPLHVCQUF1QixLQUFLLFNBQVMsUUFBUSxTQUFTLFdBQVcsS0FBSyxRQUFRLFNBQVMsT0FBTztBQUFBLElBQ3pHO0FBQ0EsVUFBTSx3QkFBd0IsU0FBVSxNQUFNO0FBQzFDLGFBQU8sMkJBQTJCLEtBQUssU0FBUyxRQUFRLFNBQVMsV0FBVyxLQUFLLFFBQVEsU0FBUyxPQUFPO0FBQUEsSUFDN0c7QUFDQSxVQUFNLHdCQUF3QixTQUFVLE1BQU07QUFDMUMsYUFBTywwQkFBMEIsS0FBSyxLQUFLLFFBQVEsS0FBSyxXQUFXLEtBQUssUUFBUSxLQUFLLE9BQU87QUFBQSxJQUNoRztBQUNBLFVBQU0saUJBQWlCLG9CQUFvQix1QkFBdUI7QUFDbEUsVUFBTSxlQUFlLG9CQUFvQixxQkFBcUI7QUFDOUQsVUFBTSxnQ0FBZ0MsU0FBVSxNQUFNLFVBQVU7QUFDNUQsWUFBTSxpQkFBaUIsT0FBTztBQUM5QixhQUFTLG1CQUFtQixjQUFjLEtBQUssYUFBYSxZQUN2RCxtQkFBbUIsWUFBWSxLQUFLLHFCQUFxQjtBQUFBLElBQ2xFO0FBQ0EsVUFBTSxVQUFVQSxpQkFBZ0JBLGNBQWEsT0FBT0EsY0FBYSxPQUFPO0FBQ3hFLFVBQU0sa0JBQWtCLEtBQUssV0FBVyxrQkFBa0IsQ0FBQztBQUMzRCxVQUFNLGdCQUFnQkYsU0FBUSxXQUFXLGdCQUFnQixDQUFDO0FBQzFELFVBQU0sa0JBQWtCLFNBQVUsZ0JBQWdCLFdBQVcsa0JBQWtCLGdCQUFnQkcsZ0JBQWUsT0FBTyxVQUFVLE9BQU87QUFDbEksYUFBTyxXQUFZO0FBQ2YsY0FBTSxTQUFTLFFBQVFIO0FBQ3ZCLFlBQUksWUFBWSxVQUFVLENBQUM7QUFDM0IsWUFBSUUsaUJBQWdCQSxjQUFhLG1CQUFtQjtBQUNoRCxzQkFBWUEsY0FBYSxrQkFBa0IsU0FBUztBQUFBLFFBQ3hEO0FBQ0EsWUFBSSxXQUFXLFVBQVUsQ0FBQztBQUMxQixZQUFJLENBQUMsVUFBVTtBQUNYLGlCQUFPLGVBQWUsTUFBTSxNQUFNLFNBQVM7QUFBQSxRQUMvQztBQUNBLFlBQUksVUFBVSxjQUFjLHFCQUFxQjtBQUU3QyxpQkFBTyxlQUFlLE1BQU0sTUFBTSxTQUFTO0FBQUEsUUFDL0M7QUFJQSxZQUFJLGdCQUFnQjtBQUNwQixZQUFJLE9BQU8sYUFBYSxZQUFZO0FBQ2hDLGNBQUksQ0FBQyxTQUFTLGFBQWE7QUFDdkIsbUJBQU8sZUFBZSxNQUFNLE1BQU0sU0FBUztBQUFBLFVBQy9DO0FBQ0EsMEJBQWdCO0FBQUEsUUFDcEI7QUFDQSxZQUFJLG1CQUFtQixDQUFDLGdCQUFnQixnQkFBZ0IsVUFBVSxRQUFRLFNBQVMsR0FBRztBQUNsRjtBQUFBLFFBQ0o7QUFDQSxjQUFNLFVBQVUsb0JBQW9CLENBQUMsQ0FBQyxpQkFBaUIsY0FBYyxRQUFRLFNBQVMsTUFBTTtBQUM1RixjQUFNLFVBQVUsMEJBQTBCLFVBQVUsQ0FBQyxHQUFHLE9BQU87QUFDL0QsY0FBTSxTQUFTLFNBQVM7QUFDeEIsWUFBSSxRQUFRLFNBQVM7QUFFakI7QUFBQSxRQUNKO0FBQ0EsWUFBSSxpQkFBaUI7QUFFakIsbUJBQVMsSUFBSSxHQUFHLElBQUksZ0JBQWdCLFFBQVEsS0FBSztBQUM3QyxnQkFBSSxjQUFjLGdCQUFnQixDQUFDLEdBQUc7QUFDbEMsa0JBQUksU0FBUztBQUNULHVCQUFPLGVBQWUsS0FBSyxRQUFRLFdBQVcsVUFBVSxPQUFPO0FBQUEsY0FDbkUsT0FDSztBQUNELHVCQUFPLGVBQWUsTUFBTSxNQUFNLFNBQVM7QUFBQSxjQUMvQztBQUFBLFlBQ0o7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUNBLGNBQU0sVUFBVSxDQUFDLFVBQVUsUUFBUSxPQUFPLFlBQVksWUFBWSxPQUFPLFFBQVE7QUFDakYsY0FBTSxPQUFPLFdBQVcsT0FBTyxZQUFZLFdBQVcsUUFBUSxPQUFPO0FBQ3JFLGNBQU0sT0FBTyxLQUFLO0FBQ2xCLFlBQUksbUJBQW1CLHFCQUFxQixTQUFTO0FBQ3JELFlBQUksQ0FBQyxrQkFBa0I7QUFDbkIsNEJBQWtCLFdBQVcsaUJBQWlCO0FBQzlDLDZCQUFtQixxQkFBcUIsU0FBUztBQUFBLFFBQ3JEO0FBQ0EsY0FBTSxrQkFBa0IsaUJBQWlCLFVBQVUsV0FBVyxTQUFTO0FBQ3ZFLFlBQUksZ0JBQWdCLE9BQU8sZUFBZTtBQUMxQyxZQUFJLGFBQWE7QUFDakIsWUFBSSxlQUFlO0FBRWYsdUJBQWE7QUFDYixjQUFJLGdCQUFnQjtBQUNoQixxQkFBUyxJQUFJLEdBQUcsSUFBSSxjQUFjLFFBQVEsS0FBSztBQUMzQyxrQkFBSSxRQUFRLGNBQWMsQ0FBQyxHQUFHLFFBQVEsR0FBRztBQUVyQztBQUFBLGNBQ0o7QUFBQSxZQUNKO0FBQUEsVUFDSjtBQUFBLFFBQ0osT0FDSztBQUNELDBCQUFnQixPQUFPLGVBQWUsSUFBSSxDQUFDO0FBQUEsUUFDL0M7QUFDQSxZQUFJO0FBQ0osY0FBTSxrQkFBa0IsT0FBTyxZQUFZLE1BQU07QUFDakQsY0FBTSxlQUFlLGNBQWMsZUFBZTtBQUNsRCxZQUFJLGNBQWM7QUFDZCxtQkFBUyxhQUFhLFNBQVM7QUFBQSxRQUNuQztBQUNBLFlBQUksQ0FBQyxRQUFRO0FBQ1QsbUJBQ0ksa0JBQ0ksYUFDQyxvQkFBb0Isa0JBQWtCLFNBQVMsSUFBSTtBQUFBLFFBQ2hFO0FBR0EsaUJBQVMsVUFBVTtBQUNuQixZQUFJLE1BQU07QUFJTixtQkFBUyxRQUFRLE9BQU87QUFBQSxRQUM1QjtBQUNBLGlCQUFTLFNBQVM7QUFDbEIsaUJBQVMsVUFBVTtBQUNuQixpQkFBUyxZQUFZO0FBQ3JCLGlCQUFTLGFBQWE7QUFDdEIsY0FBTSxPQUFPLG9CQUFvQixpQ0FBaUM7QUFFbEUsWUFBSSxNQUFNO0FBQ04sZUFBSyxXQUFXO0FBQUEsUUFDcEI7QUFDQSxZQUFJLFFBQVE7QUFJUixtQkFBUyxRQUFRLFNBQVM7QUFBQSxRQUM5QjtBQUNBLGNBQU0sT0FBTyxLQUFLLGtCQUFrQixRQUFRLFVBQVUsTUFBTSxrQkFBa0IsY0FBYztBQUM1RixZQUFJLFFBQVE7QUFFUixtQkFBUyxRQUFRLFNBQVM7QUFJMUIsZ0JBQU0sVUFBVSxNQUFNLEtBQUssS0FBSyxXQUFXLElBQUk7QUFDL0MseUJBQWUsS0FBSyxRQUFRLFNBQVMsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBSzVELGNBQUksTUFBTTtBQUNOLGlCQUFLLHNCQUFzQixNQUFNLE9BQU8sb0JBQW9CLFNBQVMsT0FBTztBQUFBLFVBQ2hGO0FBQUEsUUFDSjtBQUdBLGlCQUFTLFNBQVM7QUFFbEIsWUFBSSxNQUFNO0FBQ04sZUFBSyxXQUFXO0FBQUEsUUFDcEI7QUFHQSxZQUFJLE1BQU07QUFDTixrQkFBUSxPQUFPO0FBQUEsUUFDbkI7QUFDQSxZQUFJLEVBQUUsQ0FBQyxvQkFBb0IsT0FBTyxLQUFLLFlBQVksWUFBWTtBQUczRCxlQUFLLFVBQVU7QUFBQSxRQUNuQjtBQUNBLGFBQUssU0FBUztBQUNkLGFBQUssVUFBVTtBQUNmLGFBQUssWUFBWTtBQUNqQixZQUFJLGVBQWU7QUFFZixlQUFLLG1CQUFtQjtBQUFBLFFBQzVCO0FBQ0EsWUFBSSxDQUFDLFNBQVM7QUFDVix3QkFBYyxLQUFLLElBQUk7QUFBQSxRQUMzQixPQUNLO0FBQ0Qsd0JBQWMsUUFBUSxJQUFJO0FBQUEsUUFDOUI7QUFDQSxZQUFJQyxlQUFjO0FBQ2QsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxVQUFNLGtCQUFrQixJQUFJLGdCQUFnQix3QkFBd0IsMkJBQTJCLGdCQUFnQixjQUFjLFlBQVk7QUFDekksUUFBSSw0QkFBNEI7QUFDNUIsWUFBTSxzQkFBc0IsSUFBSSxnQkFBZ0IsNEJBQTRCLCtCQUErQix1QkFBdUIsY0FBYyxjQUFjLElBQUk7QUFBQSxJQUN0SztBQUNBLFVBQU0scUJBQXFCLElBQUksV0FBWTtBQUN2QyxZQUFNLFNBQVMsUUFBUUg7QUFDdkIsVUFBSSxZQUFZLFVBQVUsQ0FBQztBQUMzQixVQUFJRSxpQkFBZ0JBLGNBQWEsbUJBQW1CO0FBQ2hELG9CQUFZQSxjQUFhLGtCQUFrQixTQUFTO0FBQUEsTUFDeEQ7QUFDQSxZQUFNLFVBQVUsVUFBVSxDQUFDO0FBQzNCLFlBQU0sVUFBVSxDQUFDLFVBQVUsUUFBUSxPQUFPLFlBQVksWUFBWSxPQUFPLFFBQVE7QUFDakYsWUFBTSxXQUFXLFVBQVUsQ0FBQztBQUM1QixVQUFJLENBQUMsVUFBVTtBQUNYLGVBQU8sMEJBQTBCLE1BQU0sTUFBTSxTQUFTO0FBQUEsTUFDMUQ7QUFDQSxVQUFJLG1CQUNBLENBQUMsZ0JBQWdCLDJCQUEyQixVQUFVLFFBQVEsU0FBUyxHQUFHO0FBQzFFO0FBQUEsTUFDSjtBQUNBLFlBQU0sbUJBQW1CLHFCQUFxQixTQUFTO0FBQ3ZELFVBQUk7QUFDSixVQUFJLGtCQUFrQjtBQUNsQiwwQkFBa0IsaUJBQWlCLFVBQVUsV0FBVyxTQUFTO0FBQUEsTUFDckU7QUFDQSxZQUFNLGdCQUFnQixtQkFBbUIsT0FBTyxlQUFlO0FBQy9ELFVBQUksZUFBZTtBQUNmLGlCQUFTLElBQUksR0FBRyxJQUFJLGNBQWMsUUFBUSxLQUFLO0FBQzNDLGdCQUFNLGVBQWUsY0FBYyxDQUFDO0FBQ3BDLGNBQUksUUFBUSxjQUFjLFFBQVEsR0FBRztBQUNqQywwQkFBYyxPQUFPLEdBQUcsQ0FBQztBQUV6Qix5QkFBYSxZQUFZO0FBQ3pCLGdCQUFJLGNBQWMsV0FBVyxHQUFHO0FBRzVCLDJCQUFhLGFBQWE7QUFDMUIscUJBQU8sZUFBZSxJQUFJO0FBTTFCLGtCQUFJLENBQUMsV0FBVyxPQUFPLGNBQWMsVUFBVTtBQUMzQyxzQkFBTSxtQkFBbUIscUJBQXFCLGdCQUFnQjtBQUM5RCx1QkFBTyxnQkFBZ0IsSUFBSTtBQUFBLGNBQy9CO0FBQUEsWUFDSjtBQUdBLGtCQUFNRSxZQUFXLGFBQWE7QUFDOUIsZ0JBQUlBLFdBQVUscUJBQXFCO0FBQy9CLGNBQUFBLFVBQVMsb0JBQW9CO0FBQzdCLGNBQUFBLFVBQVMsc0JBQXNCO0FBQUEsWUFDbkM7QUFDQSx5QkFBYSxLQUFLLFdBQVcsWUFBWTtBQUN6QyxnQkFBSSxjQUFjO0FBQ2QscUJBQU87QUFBQSxZQUNYO0FBQ0E7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFLQSxhQUFPLDBCQUEwQixNQUFNLE1BQU0sU0FBUztBQUFBLElBQzFEO0FBQ0EsVUFBTSx3QkFBd0IsSUFBSSxXQUFZO0FBQzFDLFlBQU0sU0FBUyxRQUFRSjtBQUN2QixVQUFJLFlBQVksVUFBVSxDQUFDO0FBQzNCLFVBQUlFLGlCQUFnQkEsY0FBYSxtQkFBbUI7QUFDaEQsb0JBQVlBLGNBQWEsa0JBQWtCLFNBQVM7QUFBQSxNQUN4RDtBQUNBLFlBQU0sWUFBWSxDQUFDO0FBQ25CLFlBQU0sUUFBUSxlQUFlLFFBQVEsb0JBQW9CLGtCQUFrQixTQUFTLElBQUksU0FBUztBQUNqRyxlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ25DLGNBQU0sT0FBTyxNQUFNLENBQUM7QUFDcEIsWUFBSSxXQUFXLEtBQUssbUJBQW1CLEtBQUssbUJBQW1CLEtBQUs7QUFDcEUsa0JBQVUsS0FBSyxRQUFRO0FBQUEsTUFDM0I7QUFDQSxhQUFPO0FBQUEsSUFDWDtBQUNBLFVBQU0sbUNBQW1DLElBQUksV0FBWTtBQUNyRCxZQUFNLFNBQVMsUUFBUUY7QUFDdkIsVUFBSSxZQUFZLFVBQVUsQ0FBQztBQUMzQixVQUFJLENBQUMsV0FBVztBQUNaLGNBQU0sT0FBTyxPQUFPLEtBQUssTUFBTTtBQUMvQixpQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNsQyxnQkFBTSxPQUFPLEtBQUssQ0FBQztBQUNuQixnQkFBTSxRQUFRLHVCQUF1QixLQUFLLElBQUk7QUFDOUMsY0FBSSxVQUFVLFNBQVMsTUFBTSxDQUFDO0FBSzlCLGNBQUksV0FBVyxZQUFZLGtCQUFrQjtBQUN6QyxpQkFBSyxtQ0FBbUMsRUFBRSxLQUFLLE1BQU0sT0FBTztBQUFBLFVBQ2hFO0FBQUEsUUFDSjtBQUVBLGFBQUssbUNBQW1DLEVBQUUsS0FBSyxNQUFNLGdCQUFnQjtBQUFBLE1BQ3pFLE9BQ0s7QUFDRCxZQUFJRSxpQkFBZ0JBLGNBQWEsbUJBQW1CO0FBQ2hELHNCQUFZQSxjQUFhLGtCQUFrQixTQUFTO0FBQUEsUUFDeEQ7QUFDQSxjQUFNLG1CQUFtQixxQkFBcUIsU0FBUztBQUN2RCxZQUFJLGtCQUFrQjtBQUNsQixnQkFBTSxrQkFBa0IsaUJBQWlCLFNBQVM7QUFDbEQsZ0JBQU0seUJBQXlCLGlCQUFpQixRQUFRO0FBQ3hELGdCQUFNLFFBQVEsT0FBTyxlQUFlO0FBQ3BDLGdCQUFNLGVBQWUsT0FBTyxzQkFBc0I7QUFDbEQsY0FBSSxPQUFPO0FBQ1Asa0JBQU0sY0FBYyxNQUFNLE1BQU07QUFDaEMscUJBQVMsSUFBSSxHQUFHLElBQUksWUFBWSxRQUFRLEtBQUs7QUFDekMsb0JBQU0sT0FBTyxZQUFZLENBQUM7QUFDMUIsa0JBQUksV0FBVyxLQUFLLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLO0FBQ3BFLG1CQUFLLHFCQUFxQixFQUFFLEtBQUssTUFBTSxXQUFXLFVBQVUsS0FBSyxPQUFPO0FBQUEsWUFDNUU7QUFBQSxVQUNKO0FBQ0EsY0FBSSxjQUFjO0FBQ2Qsa0JBQU0sY0FBYyxhQUFhLE1BQU07QUFDdkMscUJBQVMsSUFBSSxHQUFHLElBQUksWUFBWSxRQUFRLEtBQUs7QUFDekMsb0JBQU0sT0FBTyxZQUFZLENBQUM7QUFDMUIsa0JBQUksV0FBVyxLQUFLLG1CQUFtQixLQUFLLG1CQUFtQixLQUFLO0FBQ3BFLG1CQUFLLHFCQUFxQixFQUFFLEtBQUssTUFBTSxXQUFXLFVBQVUsS0FBSyxPQUFPO0FBQUEsWUFDNUU7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFDQSxVQUFJLGNBQWM7QUFDZCxlQUFPO0FBQUEsTUFDWDtBQUFBLElBQ0o7QUFFQSwwQkFBc0IsTUFBTSxrQkFBa0IsR0FBRyxzQkFBc0I7QUFDdkUsMEJBQXNCLE1BQU0scUJBQXFCLEdBQUcseUJBQXlCO0FBQzdFLFFBQUksMEJBQTBCO0FBQzFCLDRCQUFzQixNQUFNLG1DQUFtQyxHQUFHLHdCQUF3QjtBQUFBLElBQzlGO0FBQ0EsUUFBSSxpQkFBaUI7QUFDakIsNEJBQXNCLE1BQU0sd0JBQXdCLEdBQUcsZUFBZTtBQUFBLElBQzFFO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLFVBQVUsQ0FBQztBQUNmLFdBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDbEMsWUFBUSxDQUFDLElBQUksd0JBQXdCLEtBQUssQ0FBQyxHQUFHLFlBQVk7QUFBQSxFQUM5RDtBQUNBLFNBQU87QUFDWDtBQUNBLFNBQVMsZUFBZSxRQUFRLFdBQVc7QUFDdkMsTUFBSSxDQUFDLFdBQVc7QUFDWixVQUFNLGFBQWEsQ0FBQztBQUNwQixhQUFTLFFBQVEsUUFBUTtBQUNyQixZQUFNLFFBQVEsdUJBQXVCLEtBQUssSUFBSTtBQUM5QyxVQUFJLFVBQVUsU0FBUyxNQUFNLENBQUM7QUFDOUIsVUFBSSxZQUFZLENBQUMsYUFBYSxZQUFZLFlBQVk7QUFDbEQsY0FBTSxRQUFRLE9BQU8sSUFBSTtBQUN6QixZQUFJLE9BQU87QUFDUCxtQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNuQyx1QkFBVyxLQUFLLE1BQU0sQ0FBQyxDQUFDO0FBQUEsVUFDNUI7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUNBLE1BQUksa0JBQWtCLHFCQUFxQixTQUFTO0FBQ3BELE1BQUksQ0FBQyxpQkFBaUI7QUFDbEIsc0JBQWtCLFNBQVM7QUFDM0Isc0JBQWtCLHFCQUFxQixTQUFTO0FBQUEsRUFDcEQ7QUFDQSxRQUFNLG9CQUFvQixPQUFPLGdCQUFnQixTQUFTLENBQUM7QUFDM0QsUUFBTSxtQkFBbUIsT0FBTyxnQkFBZ0IsUUFBUSxDQUFDO0FBQ3pELE1BQUksQ0FBQyxtQkFBbUI7QUFDcEIsV0FBTyxtQkFBbUIsaUJBQWlCLE1BQU0sSUFBSSxDQUFDO0FBQUEsRUFDMUQsT0FDSztBQUNELFdBQU8sbUJBQ0Qsa0JBQWtCLE9BQU8sZ0JBQWdCLElBQ3pDLGtCQUFrQixNQUFNO0FBQUEsRUFDbEM7QUFDSjtBQUNBLFNBQVMsb0JBQW9CTCxTQUFRLEtBQUs7QUFDdEMsUUFBTSxRQUFRQSxRQUFPLE9BQU87QUFDNUIsTUFBSSxTQUFTLE1BQU0sV0FBVztBQUMxQixRQUFJLFlBQVksTUFBTSxXQUFXLDRCQUE0QixDQUFDLGFBQWEsU0FBVUQsT0FBTSxNQUFNO0FBQzdGLE1BQUFBLE1BQUssNEJBQTRCLElBQUk7QUFJckMsa0JBQVksU0FBUyxNQUFNQSxPQUFNLElBQUk7QUFBQSxJQUN6QyxDQUFDO0FBQUEsRUFDTDtBQUNKO0FBTUEsU0FBUyxvQkFBb0JDLFNBQVEsS0FBSztBQUN0QyxNQUFJLFlBQVlBLFNBQVEsa0JBQWtCLENBQUMsYUFBYTtBQUNwRCxXQUFPLFNBQVVELE9BQU0sTUFBTTtBQUN6QixXQUFLLFFBQVEsa0JBQWtCLGtCQUFrQixLQUFLLENBQUMsQ0FBQztBQUFBLElBQzVEO0FBQUEsRUFDSixDQUFDO0FBQ0w7QUFNQSxJQUFNLGFBQWEsV0FBVyxVQUFVO0FBQ3hDLFNBQVMsV0FBV1MsU0FBUSxTQUFTLFlBQVksWUFBWTtBQUN6RCxNQUFJLFlBQVk7QUFDaEIsTUFBSSxjQUFjO0FBQ2xCLGFBQVc7QUFDWCxnQkFBYztBQUNkLFFBQU0sa0JBQWtCLENBQUM7QUFDekIsV0FBUyxhQUFhLE1BQU07QUFDeEIsVUFBTSxPQUFPLEtBQUs7QUFDbEIsU0FBSyxLQUFLLENBQUMsSUFBSSxXQUFZO0FBQ3ZCLGFBQU8sS0FBSyxPQUFPLE1BQU0sTUFBTSxTQUFTO0FBQUEsSUFDNUM7QUFDQSxTQUFLLFdBQVcsVUFBVSxNQUFNQSxTQUFRLEtBQUssSUFBSTtBQUNqRCxXQUFPO0FBQUEsRUFDWDtBQUNBLFdBQVMsVUFBVSxNQUFNO0FBQ3JCLFdBQU8sWUFBWSxLQUFLQSxTQUFRLEtBQUssS0FBSyxRQUFRO0FBQUEsRUFDdEQ7QUFDQSxjQUFZLFlBQVlBLFNBQVEsU0FBUyxDQUFDLGFBQWEsU0FBVVQsT0FBTSxNQUFNO0FBQ3pFLFFBQUksT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZO0FBQy9CLFlBQU0sVUFBVTtBQUFBLFFBQ1osWUFBWSxlQUFlO0FBQUEsUUFDM0IsT0FBTyxlQUFlLGFBQWEsZUFBZSxhQUFhLEtBQUssQ0FBQyxLQUFLLElBQUk7QUFBQSxRQUM5RTtBQUFBLE1BQ0o7QUFDQSxZQUFNLFdBQVcsS0FBSyxDQUFDO0FBQ3ZCLFdBQUssQ0FBQyxJQUFJLFNBQVMsUUFBUTtBQUN2QixZQUFJO0FBQ0EsaUJBQU8sU0FBUyxNQUFNLE1BQU0sU0FBUztBQUFBLFFBQ3pDLFVBQ0E7QUFRSSxjQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3JCLGdCQUFJLE9BQU8sUUFBUSxhQUFhLFVBQVU7QUFHdEMscUJBQU8sZ0JBQWdCLFFBQVEsUUFBUTtBQUFBLFlBQzNDLFdBQ1MsUUFBUSxVQUFVO0FBR3ZCLHNCQUFRLFNBQVMsVUFBVSxJQUFJO0FBQUEsWUFDbkM7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFDQSxZQUFNLE9BQU8saUNBQWlDLFNBQVMsS0FBSyxDQUFDLEdBQUcsU0FBUyxjQUFjLFNBQVM7QUFDaEcsVUFBSSxDQUFDLE1BQU07QUFDUCxlQUFPO0FBQUEsTUFDWDtBQUVBLFlBQU0sU0FBUyxLQUFLLEtBQUs7QUFDekIsVUFBSSxPQUFPLFdBQVcsVUFBVTtBQUc1Qix3QkFBZ0IsTUFBTSxJQUFJO0FBQUEsTUFDOUIsV0FDUyxRQUFRO0FBR2IsZUFBTyxVQUFVLElBQUk7QUFBQSxNQUN6QjtBQUdBLFVBQUksVUFDQSxPQUFPLE9BQ1AsT0FBTyxTQUNQLE9BQU8sT0FBTyxRQUFRLGNBQ3RCLE9BQU8sT0FBTyxVQUFVLFlBQVk7QUFDcEMsYUFBSyxNQUFNLE9BQU8sSUFBSSxLQUFLLE1BQU07QUFDakMsYUFBSyxRQUFRLE9BQU8sTUFBTSxLQUFLLE1BQU07QUFBQSxNQUN6QztBQUNBLFVBQUksT0FBTyxXQUFXLFlBQVksUUFBUTtBQUN0QyxlQUFPO0FBQUEsTUFDWDtBQUNBLGFBQU87QUFBQSxJQUNYLE9BQ0s7QUFFRCxhQUFPLFNBQVMsTUFBTVMsU0FBUSxJQUFJO0FBQUEsSUFDdEM7QUFBQSxFQUNKLENBQUM7QUFDRCxnQkFBYyxZQUFZQSxTQUFRLFlBQVksQ0FBQyxhQUFhLFNBQVVULE9BQU0sTUFBTTtBQUM5RSxVQUFNLEtBQUssS0FBSyxDQUFDO0FBQ2pCLFFBQUk7QUFDSixRQUFJLE9BQU8sT0FBTyxVQUFVO0FBRXhCLGFBQU8sZ0JBQWdCLEVBQUU7QUFBQSxJQUM3QixPQUNLO0FBRUQsYUFBTyxNQUFNLEdBQUcsVUFBVTtBQUUxQixVQUFJLENBQUMsTUFBTTtBQUNQLGVBQU87QUFBQSxNQUNYO0FBQUEsSUFDSjtBQUNBLFFBQUksUUFBUSxPQUFPLEtBQUssU0FBUyxVQUFVO0FBQ3ZDLFVBQUksS0FBSyxVQUFVLG1CQUNiLEtBQUssWUFBWSxLQUFLLEtBQUssY0FBZSxLQUFLLGFBQWEsSUFBSTtBQUNsRSxZQUFJLE9BQU8sT0FBTyxVQUFVO0FBQ3hCLGlCQUFPLGdCQUFnQixFQUFFO0FBQUEsUUFDN0IsV0FDUyxJQUFJO0FBQ1QsYUFBRyxVQUFVLElBQUk7QUFBQSxRQUNyQjtBQUVBLGFBQUssS0FBSyxXQUFXLElBQUk7QUFBQSxNQUM3QjtBQUFBLElBQ0osT0FDSztBQUVELGVBQVMsTUFBTVMsU0FBUSxJQUFJO0FBQUEsSUFDL0I7QUFBQSxFQUNKLENBQUM7QUFDTDtBQUVBLFNBQVMsb0JBQW9CTCxVQUFTLEtBQUs7QUFDdkMsUUFBTSxFQUFFLFdBQUFNLFlBQVcsT0FBQUMsT0FBTSxJQUFJLElBQUksaUJBQWlCO0FBQ2xELE1BQUssQ0FBQ0QsY0FBYSxDQUFDQyxVQUFVLENBQUNQLFNBQVEsZ0JBQWdCLEtBQUssRUFBRSxvQkFBb0JBLFdBQVU7QUFDeEY7QUFBQSxFQUNKO0FBRUEsUUFBTSxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNKO0FBQ0EsTUFBSSxlQUFlLEtBQUtBLFNBQVEsZ0JBQWdCLGtCQUFrQixVQUFVLFNBQVM7QUFDekY7QUFFQSxTQUFTLGlCQUFpQkEsVUFBUyxLQUFLO0FBQ3BDLE1BQUksS0FBSyxJQUFJLE9BQU8sa0JBQWtCLENBQUMsR0FBRztBQUV0QztBQUFBLEVBQ0o7QUFDQSxRQUFNLEVBQUUsWUFBWSxzQkFBQVEsdUJBQXNCLFVBQUFDLFdBQVUsV0FBQUMsWUFBVyxvQkFBQUMsb0JBQW1CLElBQUksSUFBSSxpQkFBaUI7QUFFM0csV0FBUyxJQUFJLEdBQUcsSUFBSSxXQUFXLFFBQVEsS0FBSztBQUN4QyxVQUFNLFlBQVksV0FBVyxDQUFDO0FBQzlCLFVBQU0saUJBQWlCLFlBQVlEO0FBQ25DLFVBQU0sZ0JBQWdCLFlBQVlEO0FBQ2xDLFVBQU0sU0FBU0Usc0JBQXFCO0FBQ3BDLFVBQU0sZ0JBQWdCQSxzQkFBcUI7QUFDM0MsSUFBQUgsc0JBQXFCLFNBQVMsSUFBSSxDQUFDO0FBQ25DLElBQUFBLHNCQUFxQixTQUFTLEVBQUVFLFVBQVMsSUFBSTtBQUM3QyxJQUFBRixzQkFBcUIsU0FBUyxFQUFFQyxTQUFRLElBQUk7QUFBQSxFQUNoRDtBQUNBLFFBQU0sZUFBZVQsU0FBUSxhQUFhO0FBQzFDLE1BQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLFdBQVc7QUFDMUM7QUFBQSxFQUNKO0FBQ0EsTUFBSSxpQkFBaUJBLFVBQVMsS0FBSyxDQUFDLGdCQUFnQixhQUFhLFNBQVMsQ0FBQztBQUMzRSxTQUFPO0FBQ1g7QUFDQSxTQUFTLFdBQVdILFNBQVEsS0FBSztBQUM3QixNQUFJLG9CQUFvQkEsU0FBUSxHQUFHO0FBQ3ZDO0FBTUEsU0FBUyxpQkFBaUIsUUFBUSxjQUFjLGtCQUFrQjtBQUM5RCxNQUFJLENBQUMsb0JBQW9CLGlCQUFpQixXQUFXLEdBQUc7QUFDcEQsV0FBTztBQUFBLEVBQ1g7QUFDQSxRQUFNLE1BQU0saUJBQWlCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsV0FBVyxNQUFNO0FBQ2hFLE1BQUksQ0FBQyxPQUFPLElBQUksV0FBVyxHQUFHO0FBQzFCLFdBQU87QUFBQSxFQUNYO0FBQ0EsUUFBTSx5QkFBeUIsSUFBSSxDQUFDLEVBQUU7QUFDdEMsU0FBTyxhQUFhLE9BQU8sQ0FBQyxPQUFPLHVCQUF1QixRQUFRLEVBQUUsTUFBTSxFQUFFO0FBQ2hGO0FBQ0EsU0FBUyx3QkFBd0IsUUFBUSxjQUFjLGtCQUFrQixXQUFXO0FBR2hGLE1BQUksQ0FBQyxRQUFRO0FBQ1Q7QUFBQSxFQUNKO0FBQ0EsUUFBTSxxQkFBcUIsaUJBQWlCLFFBQVEsY0FBYyxnQkFBZ0I7QUFDbEYsb0JBQWtCLFFBQVEsb0JBQW9CLFNBQVM7QUFDM0Q7QUFLQSxTQUFTLGdCQUFnQixRQUFRO0FBQzdCLFNBQU8sT0FBTyxvQkFBb0IsTUFBTSxFQUNuQyxPQUFPLENBQUMsU0FBUyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDLEVBQ3pELElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUM7QUFDeEM7QUFDQSxTQUFTLHdCQUF3QixLQUFLRyxVQUFTO0FBQzNDLE1BQUksVUFBVSxDQUFDLE9BQU87QUFDbEI7QUFBQSxFQUNKO0FBQ0EsTUFBSSxLQUFLLElBQUksT0FBTyxhQUFhLENBQUMsR0FBRztBQUVqQztBQUFBLEVBQ0o7QUFDQSxRQUFNLG1CQUFtQkEsU0FBUSw2QkFBNkI7QUFFOUQsTUFBSSxlQUFlLENBQUM7QUFDcEIsTUFBSSxXQUFXO0FBQ1gsVUFBTVksa0JBQWlCO0FBQ3ZCLG1CQUFlLGFBQWEsT0FBTztBQUFBLE1BQy9CO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0osQ0FBQztBQUNELFVBQU0sd0JBQXdCLEtBQUssSUFDN0IsQ0FBQyxFQUFFLFFBQVFBLGlCQUFnQixrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUN4RCxDQUFDO0FBR1AsNEJBQXdCQSxpQkFBZ0IsZ0JBQWdCQSxlQUFjLEdBQUcsbUJBQW1CLGlCQUFpQixPQUFPLHFCQUFxQixJQUFJLGtCQUFrQixxQkFBcUJBLGVBQWMsQ0FBQztBQUFBLEVBQ3ZNO0FBQ0EsaUJBQWUsYUFBYSxPQUFPO0FBQUEsSUFDL0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0osQ0FBQztBQUNELFdBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxRQUFRLEtBQUs7QUFDMUMsVUFBTSxTQUFTWixTQUFRLGFBQWEsQ0FBQyxDQUFDO0FBQ3RDLGNBQ0ksT0FBTyxhQUNQLHdCQUF3QixPQUFPLFdBQVcsZ0JBQWdCLE9BQU8sU0FBUyxHQUFHLGdCQUFnQjtBQUFBLEVBQ3JHO0FBQ0o7QUFNQSxTQUFTLGFBQWFhLE9BQU07QUFDeEIsRUFBQUEsTUFBSyxhQUFhLFVBQVUsQ0FBQ2hCLFlBQVc7QUFDcEMsVUFBTSxjQUFjQSxRQUFPZ0IsTUFBSyxXQUFXLGFBQWEsQ0FBQztBQUN6RCxRQUFJLGFBQWE7QUFDYixrQkFBWTtBQUFBLElBQ2hCO0FBQUEsRUFDSixDQUFDO0FBQ0QsRUFBQUEsTUFBSyxhQUFhLFVBQVUsQ0FBQ2hCLFlBQVc7QUFDcEMsVUFBTSxNQUFNO0FBQ1osVUFBTSxRQUFRO0FBQ2QsZUFBV0EsU0FBUSxLQUFLLE9BQU8sU0FBUztBQUN4QyxlQUFXQSxTQUFRLEtBQUssT0FBTyxVQUFVO0FBQ3pDLGVBQVdBLFNBQVEsS0FBSyxPQUFPLFdBQVc7QUFBQSxFQUM5QyxDQUFDO0FBQ0QsRUFBQWdCLE1BQUssYUFBYSx5QkFBeUIsQ0FBQ2hCLFlBQVc7QUFDbkQsZUFBV0EsU0FBUSxXQUFXLFVBQVUsZ0JBQWdCO0FBQ3hELGVBQVdBLFNBQVEsY0FBYyxhQUFhLGdCQUFnQjtBQUM5RCxlQUFXQSxTQUFRLGlCQUFpQixnQkFBZ0IsZ0JBQWdCO0FBQUEsRUFDeEUsQ0FBQztBQUNELEVBQUFnQixNQUFLLGFBQWEsWUFBWSxDQUFDaEIsU0FBUWdCLFVBQVM7QUFDNUMsVUFBTSxrQkFBa0IsQ0FBQyxTQUFTLFVBQVUsU0FBUztBQUNyRCxhQUFTLElBQUksR0FBRyxJQUFJLGdCQUFnQixRQUFRLEtBQUs7QUFDN0MsWUFBTSxPQUFPLGdCQUFnQixDQUFDO0FBQzlCLGtCQUFZaEIsU0FBUSxNQUFNLENBQUMsVUFBVSxRQUFRaUIsVUFBUztBQUNsRCxlQUFPLFNBQVUsR0FBRyxNQUFNO0FBQ3RCLGlCQUFPRCxNQUFLLFFBQVEsSUFBSSxVQUFVaEIsU0FBUSxNQUFNaUIsS0FBSTtBQUFBLFFBQ3hEO0FBQUEsTUFDSixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0osQ0FBQztBQUNELEVBQUFELE1BQUssYUFBYSxlQUFlLENBQUNoQixTQUFRZ0IsT0FBTSxRQUFRO0FBQ3BELGVBQVdoQixTQUFRLEdBQUc7QUFDdEIscUJBQWlCQSxTQUFRLEdBQUc7QUFFNUIsVUFBTSw0QkFBNEJBLFFBQU8sMkJBQTJCO0FBQ3BFLFFBQUksNkJBQTZCLDBCQUEwQixXQUFXO0FBQ2xFLFVBQUksaUJBQWlCQSxTQUFRLEtBQUssQ0FBQywwQkFBMEIsU0FBUyxDQUFDO0FBQUEsSUFDM0U7QUFBQSxFQUNKLENBQUM7QUFDRCxFQUFBZ0IsTUFBSyxhQUFhLG9CQUFvQixDQUFDaEIsU0FBUWdCLE9BQU0sUUFBUTtBQUN6RCxlQUFXLGtCQUFrQjtBQUM3QixlQUFXLHdCQUF3QjtBQUFBLEVBQ3ZDLENBQUM7QUFDRCxFQUFBQSxNQUFLLGFBQWEsd0JBQXdCLENBQUNoQixTQUFRZ0IsT0FBTSxRQUFRO0FBQzdELGVBQVcsc0JBQXNCO0FBQUEsRUFDckMsQ0FBQztBQUNELEVBQUFBLE1BQUssYUFBYSxjQUFjLENBQUNoQixTQUFRZ0IsT0FBTSxRQUFRO0FBQ25ELGVBQVcsWUFBWTtBQUFBLEVBQzNCLENBQUM7QUFDRCxFQUFBQSxNQUFLLGFBQWEsZUFBZSxDQUFDaEIsU0FBUWdCLE9BQU0sUUFBUTtBQUNwRCw0QkFBd0IsS0FBS2hCLE9BQU07QUFBQSxFQUN2QyxDQUFDO0FBQ0QsRUFBQWdCLE1BQUssYUFBYSxrQkFBa0IsQ0FBQ2hCLFNBQVFnQixPQUFNLFFBQVE7QUFDdkQsd0JBQW9CaEIsU0FBUSxHQUFHO0FBQUEsRUFDbkMsQ0FBQztBQUNELEVBQUFnQixNQUFLLGFBQWEsT0FBTyxDQUFDaEIsU0FBUWdCLFVBQVM7QUFFdkMsYUFBU2hCLE9BQU07QUFDZixVQUFNLFdBQVcsV0FBVyxTQUFTO0FBQ3JDLFVBQU0sV0FBVyxXQUFXLFNBQVM7QUFDckMsVUFBTSxlQUFlLFdBQVcsYUFBYTtBQUM3QyxVQUFNLGdCQUFnQixXQUFXLGNBQWM7QUFDL0MsVUFBTSxVQUFVLFdBQVcsUUFBUTtBQUNuQyxVQUFNLDZCQUE2QixXQUFXLHlCQUF5QjtBQUN2RSxhQUFTLFNBQVNRLFNBQVE7QUFDdEIsWUFBTSxpQkFBaUJBLFFBQU8sZ0JBQWdCO0FBQzlDLFVBQUksQ0FBQyxnQkFBZ0I7QUFFakI7QUFBQSxNQUNKO0FBQ0EsWUFBTSwwQkFBMEIsZUFBZTtBQUMvQyxlQUFTLGdCQUFnQixRQUFRO0FBQzdCLGVBQU8sT0FBTyxRQUFRO0FBQUEsTUFDMUI7QUFDQSxVQUFJLGlCQUFpQix3QkFBd0IsOEJBQThCO0FBQzNFLFVBQUksb0JBQW9CLHdCQUF3QixpQ0FBaUM7QUFDakYsVUFBSSxDQUFDLGdCQUFnQjtBQUNqQixjQUFNLDRCQUE0QkEsUUFBTywyQkFBMkI7QUFDcEUsWUFBSSwyQkFBMkI7QUFDM0IsZ0JBQU0scUNBQXFDLDBCQUEwQjtBQUNyRSwyQkFBaUIsbUNBQW1DLDhCQUE4QjtBQUNsRiw4QkFBb0IsbUNBQW1DLGlDQUFpQztBQUFBLFFBQzVGO0FBQUEsTUFDSjtBQUNBLFlBQU0scUJBQXFCO0FBQzNCLFlBQU0sWUFBWTtBQUNsQixlQUFTLGFBQWEsTUFBTTtBQUN4QixjQUFNLE9BQU8sS0FBSztBQUNsQixjQUFNLFNBQVMsS0FBSztBQUNwQixlQUFPLGFBQWEsSUFBSTtBQUN4QixlQUFPLDBCQUEwQixJQUFJO0FBRXJDLGNBQU0sV0FBVyxPQUFPLFlBQVk7QUFDcEMsWUFBSSxDQUFDLGdCQUFnQjtBQUNqQiwyQkFBaUIsT0FBTyw4QkFBOEI7QUFDdEQsOEJBQW9CLE9BQU8saUNBQWlDO0FBQUEsUUFDaEU7QUFDQSxZQUFJLFVBQVU7QUFDViw0QkFBa0IsS0FBSyxRQUFRLG9CQUFvQixRQUFRO0FBQUEsUUFDL0Q7QUFDQSxjQUFNLGNBQWUsT0FBTyxZQUFZLElBQUksTUFBTTtBQUM5QyxjQUFJLE9BQU8sZUFBZSxPQUFPLE1BQU07QUFHbkMsZ0JBQUksQ0FBQyxLQUFLLFdBQVcsT0FBTyxhQUFhLEtBQUssS0FBSyxVQUFVLFdBQVc7QUFRcEUsb0JBQU0sWUFBWSxPQUFPUSxNQUFLLFdBQVcsV0FBVyxDQUFDO0FBQ3JELGtCQUFJLE9BQU8sV0FBVyxLQUFLLGFBQWEsVUFBVSxTQUFTLEdBQUc7QUFDMUQsc0JBQU0sWUFBWSxLQUFLO0FBQ3ZCLHFCQUFLLFNBQVMsV0FBWTtBQUd0Qix3QkFBTUUsYUFBWSxPQUFPRixNQUFLLFdBQVcsV0FBVyxDQUFDO0FBQ3JELDJCQUFTLElBQUksR0FBRyxJQUFJRSxXQUFVLFFBQVEsS0FBSztBQUN2Qyx3QkFBSUEsV0FBVSxDQUFDLE1BQU0sTUFBTTtBQUN2QixzQkFBQUEsV0FBVSxPQUFPLEdBQUcsQ0FBQztBQUFBLG9CQUN6QjtBQUFBLGtCQUNKO0FBQ0Esc0JBQUksQ0FBQyxLQUFLLFdBQVcsS0FBSyxVQUFVLFdBQVc7QUFDM0MsOEJBQVUsS0FBSyxJQUFJO0FBQUEsa0JBQ3ZCO0FBQUEsZ0JBQ0o7QUFDQSwwQkFBVSxLQUFLLElBQUk7QUFBQSxjQUN2QixPQUNLO0FBQ0QscUJBQUssT0FBTztBQUFBLGNBQ2hCO0FBQUEsWUFDSixXQUNTLENBQUMsS0FBSyxXQUFXLE9BQU8sYUFBYSxNQUFNLE9BQU87QUFFdkQscUJBQU8sMEJBQTBCLElBQUk7QUFBQSxZQUN6QztBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQ0EsdUJBQWUsS0FBSyxRQUFRLG9CQUFvQixXQUFXO0FBQzNELGNBQU0sYUFBYSxPQUFPLFFBQVE7QUFDbEMsWUFBSSxDQUFDLFlBQVk7QUFDYixpQkFBTyxRQUFRLElBQUk7QUFBQSxRQUN2QjtBQUNBLG1CQUFXLE1BQU0sUUFBUSxLQUFLLElBQUk7QUFDbEMsZUFBTyxhQUFhLElBQUk7QUFDeEIsZUFBTztBQUFBLE1BQ1g7QUFDQSxlQUFTLHNCQUFzQjtBQUFBLE1BQUU7QUFDakMsZUFBUyxVQUFVLE1BQU07QUFDckIsY0FBTSxPQUFPLEtBQUs7QUFHbEIsYUFBSyxVQUFVO0FBQ2YsZUFBTyxZQUFZLE1BQU0sS0FBSyxRQUFRLEtBQUssSUFBSTtBQUFBLE1BQ25EO0FBQ0EsWUFBTSxhQUFhLFlBQVkseUJBQXlCLFFBQVEsTUFBTSxTQUFVbkIsT0FBTSxNQUFNO0FBQ3hGLFFBQUFBLE1BQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxLQUFLO0FBQzVCLFFBQUFBLE1BQUssT0FBTyxJQUFJLEtBQUssQ0FBQztBQUN0QixlQUFPLFdBQVcsTUFBTUEsT0FBTSxJQUFJO0FBQUEsTUFDdEMsQ0FBQztBQUNELFlBQU0sd0JBQXdCO0FBQzlCLFlBQU0sb0JBQW9CLFdBQVcsbUJBQW1CO0FBQ3hELFlBQU0sc0JBQXNCLFdBQVcscUJBQXFCO0FBQzVELFlBQU0sYUFBYSxZQUFZLHlCQUF5QixRQUFRLE1BQU0sU0FBVUEsT0FBTSxNQUFNO0FBQ3hGLFlBQUlpQixNQUFLLFFBQVEsbUJBQW1CLE1BQU0sTUFBTTtBQUk1QyxpQkFBTyxXQUFXLE1BQU1qQixPQUFNLElBQUk7QUFBQSxRQUN0QztBQUNBLFlBQUlBLE1BQUssUUFBUSxHQUFHO0FBRWhCLGlCQUFPLFdBQVcsTUFBTUEsT0FBTSxJQUFJO0FBQUEsUUFDdEMsT0FDSztBQUNELGdCQUFNLFVBQVU7QUFBQSxZQUNaLFFBQVFBO0FBQUEsWUFDUixLQUFLQSxNQUFLLE9BQU87QUFBQSxZQUNqQixZQUFZO0FBQUEsWUFDWjtBQUFBLFlBQ0EsU0FBUztBQUFBLFVBQ2I7QUFDQSxnQkFBTSxPQUFPLGlDQUFpQyx1QkFBdUIscUJBQXFCLFNBQVMsY0FBYyxTQUFTO0FBQzFILGNBQUlBLFNBQ0FBLE1BQUssMEJBQTBCLE1BQU0sUUFDckMsQ0FBQyxRQUFRLFdBQ1QsS0FBSyxVQUFVLFdBQVc7QUFJMUIsaUJBQUssT0FBTztBQUFBLFVBQ2hCO0FBQUEsUUFDSjtBQUFBLE1BQ0osQ0FBQztBQUNELFlBQU0sY0FBYyxZQUFZLHlCQUF5QixTQUFTLE1BQU0sU0FBVUEsT0FBTSxNQUFNO0FBQzFGLGNBQU0sT0FBTyxnQkFBZ0JBLEtBQUk7QUFDakMsWUFBSSxRQUFRLE9BQU8sS0FBSyxRQUFRLFVBQVU7QUFLdEMsY0FBSSxLQUFLLFlBQVksUUFBUyxLQUFLLFFBQVEsS0FBSyxLQUFLLFNBQVU7QUFDM0Q7QUFBQSxVQUNKO0FBQ0EsZUFBSyxLQUFLLFdBQVcsSUFBSTtBQUFBLFFBQzdCLFdBQ1NpQixNQUFLLFFBQVEsaUJBQWlCLE1BQU0sTUFBTTtBQUUvQyxpQkFBTyxZQUFZLE1BQU1qQixPQUFNLElBQUk7QUFBQSxRQUN2QztBQUFBLE1BSUosQ0FBQztBQUFBLElBQ0w7QUFBQSxFQUNKLENBQUM7QUFDRCxFQUFBaUIsTUFBSyxhQUFhLGVBQWUsQ0FBQ2hCLFlBQVc7QUFFekMsUUFBSUEsUUFBTyxXQUFXLEtBQUtBLFFBQU8sV0FBVyxFQUFFLGFBQWE7QUFDeEQscUJBQWVBLFFBQU8sV0FBVyxFQUFFLGFBQWEsQ0FBQyxzQkFBc0IsZUFBZSxDQUFDO0FBQUEsSUFDM0Y7QUFBQSxFQUNKLENBQUM7QUFDRCxFQUFBZ0IsTUFBSyxhQUFhLHlCQUF5QixDQUFDaEIsU0FBUWdCLFVBQVM7QUFFekQsYUFBUyw0QkFBNEIsU0FBUztBQUMxQyxhQUFPLFNBQVUsR0FBRztBQUNoQixjQUFNLGFBQWEsZUFBZWhCLFNBQVEsT0FBTztBQUNqRCxtQkFBVyxRQUFRLENBQUMsY0FBYztBQUc5QixnQkFBTSx3QkFBd0JBLFFBQU8sdUJBQXVCO0FBQzVELGNBQUksdUJBQXVCO0FBQ3ZCLGtCQUFNLE1BQU0sSUFBSSxzQkFBc0IsU0FBUztBQUFBLGNBQzNDLFNBQVMsRUFBRTtBQUFBLGNBQ1gsUUFBUSxFQUFFO0FBQUEsWUFDZCxDQUFDO0FBQ0Qsc0JBQVUsT0FBTyxHQUFHO0FBQUEsVUFDeEI7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMO0FBQUEsSUFDSjtBQUNBLFFBQUlBLFFBQU8sdUJBQXVCLEdBQUc7QUFDakMsTUFBQWdCLE1BQUssV0FBVyxrQ0FBa0MsQ0FBQyxJQUMvQyw0QkFBNEIsb0JBQW9CO0FBQ3BELE1BQUFBLE1BQUssV0FBVyx5QkFBeUIsQ0FBQyxJQUN0Qyw0QkFBNEIsa0JBQWtCO0FBQUEsSUFDdEQ7QUFBQSxFQUNKLENBQUM7QUFDRCxFQUFBQSxNQUFLLGFBQWEsa0JBQWtCLENBQUNoQixTQUFRZ0IsT0FBTSxRQUFRO0FBQ3ZELHdCQUFvQmhCLFNBQVEsR0FBRztBQUFBLEVBQ25DLENBQUM7QUFDTDtBQUVBLFNBQVMsYUFBYWdCLE9BQU07QUFDeEIsRUFBQUEsTUFBSyxhQUFhLG9CQUFvQixDQUFDaEIsU0FBUWdCLE9BQU0sUUFBUTtBQUN6RCxVQUFNRyxrQ0FBaUMsT0FBTztBQUM5QyxVQUFNQyx3QkFBdUIsT0FBTztBQUNwQyxhQUFTLHVCQUF1QixLQUFLO0FBQ2pDLFVBQUksT0FBTyxJQUFJLGFBQWEsT0FBTyxVQUFVLFVBQVU7QUFDbkQsY0FBTSxZQUFZLElBQUksZUFBZSxJQUFJLFlBQVk7QUFDckQsZ0JBQVEsWUFBWSxZQUFZLE1BQU0sT0FBTyxLQUFLLFVBQVUsR0FBRztBQUFBLE1BQ25FO0FBQ0EsYUFBTyxNQUFNLElBQUksU0FBUyxJQUFJLE9BQU8sVUFBVSxTQUFTLEtBQUssR0FBRztBQUFBLElBQ3BFO0FBQ0EsVUFBTUMsY0FBYSxJQUFJO0FBQ3ZCLFVBQU0seUJBQXlCLENBQUM7QUFDaEMsVUFBTSw0Q0FBNENyQixRQUFPcUIsWUFBVyw2Q0FBNkMsQ0FBQyxNQUFNO0FBQ3hILFVBQU0sZ0JBQWdCQSxZQUFXLFNBQVM7QUFDMUMsVUFBTSxhQUFhQSxZQUFXLE1BQU07QUFDcEMsVUFBTSxnQkFBZ0I7QUFDdEIsUUFBSSxtQkFBbUIsQ0FBQyxNQUFNO0FBQzFCLFVBQUksSUFBSSxrQkFBa0IsR0FBRztBQUN6QixjQUFNLFlBQVksS0FBSyxFQUFFO0FBQ3pCLFlBQUksV0FBVztBQUNYLGtCQUFRLE1BQU0sZ0NBQWdDLHFCQUFxQixRQUFRLFVBQVUsVUFBVSxXQUFXLFdBQVcsRUFBRSxLQUFLLE1BQU0sV0FBVyxFQUFFLFFBQVEsRUFBRSxLQUFLLFFBQVEsWUFBWSxXQUFXLHFCQUFxQixRQUFRLFVBQVUsUUFBUSxNQUFTO0FBQUEsUUFDelAsT0FDSztBQUNELGtCQUFRLE1BQU0sQ0FBQztBQUFBLFFBQ25CO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxRQUFJLHFCQUFxQixNQUFNO0FBQzNCLGFBQU8sdUJBQXVCLFFBQVE7QUFDbEMsY0FBTSx1QkFBdUIsdUJBQXVCLE1BQU07QUFDMUQsWUFBSTtBQUNBLCtCQUFxQixLQUFLLFdBQVcsTUFBTTtBQUN2QyxnQkFBSSxxQkFBcUIsZUFBZTtBQUNwQyxvQkFBTSxxQkFBcUI7QUFBQSxZQUMvQjtBQUNBLGtCQUFNO0FBQUEsVUFDVixDQUFDO0FBQUEsUUFDTCxTQUNPLE9BQU87QUFDVixtQ0FBeUIsS0FBSztBQUFBLFFBQ2xDO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFDQSxVQUFNLDZDQUE2Q0EsWUFBVyxrQ0FBa0M7QUFDaEcsYUFBUyx5QkFBeUIsR0FBRztBQUNqQyxVQUFJLGlCQUFpQixDQUFDO0FBQ3RCLFVBQUk7QUFDQSxjQUFNLFVBQVVMLE1BQUssMENBQTBDO0FBQy9ELFlBQUksT0FBTyxZQUFZLFlBQVk7QUFDL0Isa0JBQVEsS0FBSyxNQUFNLENBQUM7QUFBQSxRQUN4QjtBQUFBLE1BQ0osU0FDTyxLQUFLO0FBQUEsTUFBRTtBQUFBLElBQ2xCO0FBQ0EsYUFBUyxXQUFXLE9BQU87QUFDdkIsYUFBTyxTQUFTLE1BQU07QUFBQSxJQUMxQjtBQUNBLGFBQVMsa0JBQWtCLE9BQU87QUFDOUIsYUFBTztBQUFBLElBQ1g7QUFDQSxhQUFTLGlCQUFpQixXQUFXO0FBQ2pDLGFBQU8saUJBQWlCLE9BQU8sU0FBUztBQUFBLElBQzVDO0FBQ0EsVUFBTSxjQUFjSyxZQUFXLE9BQU87QUFDdEMsVUFBTSxjQUFjQSxZQUFXLE9BQU87QUFDdEMsVUFBTSxnQkFBZ0JBLFlBQVcsU0FBUztBQUMxQyxVQUFNLDJCQUEyQkEsWUFBVyxvQkFBb0I7QUFDaEUsVUFBTSwyQkFBMkJBLFlBQVcsb0JBQW9CO0FBQ2hFLFVBQU0sU0FBUztBQUNmLFVBQU0sYUFBYTtBQUNuQixVQUFNLFdBQVc7QUFDakIsVUFBTSxXQUFXO0FBQ2pCLFVBQU0sb0JBQW9CO0FBQzFCLGFBQVMsYUFBYSxTQUFTLE9BQU87QUFDbEMsYUFBTyxDQUFDLE1BQU07QUFDVixZQUFJO0FBQ0EseUJBQWUsU0FBUyxPQUFPLENBQUM7QUFBQSxRQUNwQyxTQUNPLEtBQUs7QUFDUix5QkFBZSxTQUFTLE9BQU8sR0FBRztBQUFBLFFBQ3RDO0FBQUEsTUFFSjtBQUFBLElBQ0o7QUFDQSxVQUFNLE9BQU8sV0FBWTtBQUNyQixVQUFJLFlBQVk7QUFDaEIsYUFBTyxTQUFTLFFBQVEsaUJBQWlCO0FBQ3JDLGVBQU8sV0FBWTtBQUNmLGNBQUksV0FBVztBQUNYO0FBQUEsVUFDSjtBQUNBLHNCQUFZO0FBQ1osMEJBQWdCLE1BQU0sTUFBTSxTQUFTO0FBQUEsUUFDekM7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUNBLFVBQU0sYUFBYTtBQUNuQixVQUFNLDRCQUE0QkEsWUFBVyxrQkFBa0I7QUFFL0QsYUFBUyxlQUFlLFNBQVMsT0FBTyxPQUFPO0FBQzNDLFlBQU0sY0FBYyxLQUFLO0FBQ3pCLFVBQUksWUFBWSxPQUFPO0FBQ25CLGNBQU0sSUFBSSxVQUFVLFVBQVU7QUFBQSxNQUNsQztBQUNBLFVBQUksUUFBUSxXQUFXLE1BQU0sWUFBWTtBQUVyQyxZQUFJLE9BQU87QUFDWCxZQUFJO0FBQ0EsY0FBSSxPQUFPLFVBQVUsWUFBWSxPQUFPLFVBQVUsWUFBWTtBQUMxRCxtQkFBTyxTQUFTLE1BQU07QUFBQSxVQUMxQjtBQUFBLFFBQ0osU0FDTyxLQUFLO0FBQ1Isc0JBQVksTUFBTTtBQUNkLDJCQUFlLFNBQVMsT0FBTyxHQUFHO0FBQUEsVUFDdEMsQ0FBQyxFQUFFO0FBQ0gsaUJBQU87QUFBQSxRQUNYO0FBRUEsWUFBSSxVQUFVLFlBQ1YsaUJBQWlCLG9CQUNqQixNQUFNLGVBQWUsV0FBVyxLQUNoQyxNQUFNLGVBQWUsV0FBVyxLQUNoQyxNQUFNLFdBQVcsTUFBTSxZQUFZO0FBQ25DLCtCQUFxQixLQUFLO0FBQzFCLHlCQUFlLFNBQVMsTUFBTSxXQUFXLEdBQUcsTUFBTSxXQUFXLENBQUM7QUFBQSxRQUNsRSxXQUNTLFVBQVUsWUFBWSxPQUFPLFNBQVMsWUFBWTtBQUN2RCxjQUFJO0FBQ0EsaUJBQUssS0FBSyxPQUFPLFlBQVksYUFBYSxTQUFTLEtBQUssQ0FBQyxHQUFHLFlBQVksYUFBYSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsVUFDekcsU0FDTyxLQUFLO0FBQ1Isd0JBQVksTUFBTTtBQUNkLDZCQUFlLFNBQVMsT0FBTyxHQUFHO0FBQUEsWUFDdEMsQ0FBQyxFQUFFO0FBQUEsVUFDUDtBQUFBLFFBQ0osT0FDSztBQUNELGtCQUFRLFdBQVcsSUFBSTtBQUN2QixnQkFBTSxRQUFRLFFBQVEsV0FBVztBQUNqQyxrQkFBUSxXQUFXLElBQUk7QUFDdkIsY0FBSSxRQUFRLGFBQWEsTUFBTSxlQUFlO0FBRTFDLGdCQUFJLFVBQVUsVUFBVTtBQUdwQixzQkFBUSxXQUFXLElBQUksUUFBUSx3QkFBd0I7QUFDdkQsc0JBQVEsV0FBVyxJQUFJLFFBQVEsd0JBQXdCO0FBQUEsWUFDM0Q7QUFBQSxVQUNKO0FBR0EsY0FBSSxVQUFVLFlBQVksaUJBQWlCLE9BQU87QUFFOUMsa0JBQU0sUUFBUUwsTUFBSyxlQUNmQSxNQUFLLFlBQVksUUFDakJBLE1BQUssWUFBWSxLQUFLLGFBQWE7QUFDdkMsZ0JBQUksT0FBTztBQUVQLGNBQUFJLHNCQUFxQixPQUFPLDJCQUEyQjtBQUFBLGdCQUNuRCxjQUFjO0FBQUEsZ0JBQ2QsWUFBWTtBQUFBLGdCQUNaLFVBQVU7QUFBQSxnQkFDVixPQUFPO0FBQUEsY0FDWCxDQUFDO0FBQUEsWUFDTDtBQUFBLFVBQ0o7QUFDQSxtQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFVBQVM7QUFDL0Isb0NBQXdCLFNBQVMsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUM7QUFBQSxVQUNuRjtBQUNBLGNBQUksTUFBTSxVQUFVLEtBQUssU0FBUyxVQUFVO0FBQ3hDLG9CQUFRLFdBQVcsSUFBSTtBQUN2QixnQkFBSSx1QkFBdUI7QUFDM0IsZ0JBQUk7QUFJQSxvQkFBTSxJQUFJLE1BQU0sNEJBQ1osdUJBQXVCLEtBQUssS0FDM0IsU0FBUyxNQUFNLFFBQVEsT0FBTyxNQUFNLFFBQVEsR0FBRztBQUFBLFlBQ3hELFNBQ08sS0FBSztBQUNSLHFDQUF1QjtBQUFBLFlBQzNCO0FBQ0EsZ0JBQUksMkNBQTJDO0FBRzNDLG1DQUFxQixnQkFBZ0I7QUFBQSxZQUN6QztBQUNBLGlDQUFxQixZQUFZO0FBQ2pDLGlDQUFxQixVQUFVO0FBQy9CLGlDQUFxQixPQUFPSixNQUFLO0FBQ2pDLGlDQUFxQixPQUFPQSxNQUFLO0FBQ2pDLG1DQUF1QixLQUFLLG9CQUFvQjtBQUNoRCxnQkFBSSxrQkFBa0I7QUFBQSxVQUMxQjtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsYUFBTztBQUFBLElBQ1g7QUFDQSxVQUFNLDRCQUE0QkssWUFBVyx5QkFBeUI7QUFDdEUsYUFBUyxxQkFBcUIsU0FBUztBQUNuQyxVQUFJLFFBQVEsV0FBVyxNQUFNLG1CQUFtQjtBQU01QyxZQUFJO0FBQ0EsZ0JBQU0sVUFBVUwsTUFBSyx5QkFBeUI7QUFDOUMsY0FBSSxXQUFXLE9BQU8sWUFBWSxZQUFZO0FBQzFDLG9CQUFRLEtBQUssTUFBTSxFQUFFLFdBQVcsUUFBUSxXQUFXLEdBQUcsUUFBaUIsQ0FBQztBQUFBLFVBQzVFO0FBQUEsUUFDSixTQUNPLEtBQUs7QUFBQSxRQUFFO0FBQ2QsZ0JBQVEsV0FBVyxJQUFJO0FBQ3ZCLGlCQUFTLElBQUksR0FBRyxJQUFJLHVCQUF1QixRQUFRLEtBQUs7QUFDcEQsY0FBSSxZQUFZLHVCQUF1QixDQUFDLEVBQUUsU0FBUztBQUMvQyxtQ0FBdUIsT0FBTyxHQUFHLENBQUM7QUFBQSxVQUN0QztBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUNBLGFBQVMsd0JBQXdCLFNBQVMsTUFBTSxjQUFjLGFBQWEsWUFBWTtBQUNuRiwyQkFBcUIsT0FBTztBQUM1QixZQUFNLGVBQWUsUUFBUSxXQUFXO0FBQ3hDLFlBQU0sV0FBVyxlQUNYLE9BQU8sZ0JBQWdCLGFBQ25CLGNBQ0Esb0JBQ0osT0FBTyxlQUFlLGFBQ2xCLGFBQ0E7QUFDVixXQUFLLGtCQUFrQixRQUFRLE1BQU07QUFDakMsWUFBSTtBQUNBLGdCQUFNLHFCQUFxQixRQUFRLFdBQVc7QUFDOUMsZ0JBQU0sbUJBQW1CLENBQUMsQ0FBQyxnQkFBZ0Isa0JBQWtCLGFBQWEsYUFBYTtBQUN2RixjQUFJLGtCQUFrQjtBQUVsQix5QkFBYSx3QkFBd0IsSUFBSTtBQUN6Qyx5QkFBYSx3QkFBd0IsSUFBSTtBQUFBLFVBQzdDO0FBRUEsZ0JBQU0sUUFBUSxLQUFLLElBQUksVUFBVSxRQUFXLG9CQUFvQixhQUFhLG9CQUFvQixhQUFhLG9CQUN4RyxDQUFDLElBQ0QsQ0FBQyxrQkFBa0IsQ0FBQztBQUMxQix5QkFBZSxjQUFjLE1BQU0sS0FBSztBQUFBLFFBQzVDLFNBQ08sT0FBTztBQUVWLHlCQUFlLGNBQWMsT0FBTyxLQUFLO0FBQUEsUUFDN0M7QUFBQSxNQUNKLEdBQUcsWUFBWTtBQUFBLElBQ25CO0FBQ0EsVUFBTSwrQkFBK0I7QUFDckMsVUFBTSxPQUFPLFdBQVk7QUFBQSxJQUFFO0FBQzNCLFVBQU0saUJBQWlCaEIsUUFBTztBQUFBLElBQzlCLE1BQU0saUJBQWlCO0FBQUEsTUFDbkIsT0FBTyxXQUFXO0FBQ2QsZUFBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLE9BQU8sUUFBUSxPQUFPO0FBQ2xCLFlBQUksaUJBQWlCLGtCQUFrQjtBQUNuQyxpQkFBTztBQUFBLFFBQ1g7QUFDQSxlQUFPLGVBQWUsSUFBSSxLQUFLLElBQUksR0FBRyxVQUFVLEtBQUs7QUFBQSxNQUN6RDtBQUFBLE1BQ0EsT0FBTyxPQUFPLE9BQU87QUFDakIsZUFBTyxlQUFlLElBQUksS0FBSyxJQUFJLEdBQUcsVUFBVSxLQUFLO0FBQUEsTUFDekQ7QUFBQSxNQUNBLE9BQU8sZ0JBQWdCO0FBQ25CLGNBQU0sU0FBUyxDQUFDO0FBQ2hCLGVBQU8sVUFBVSxJQUFJLGlCQUFpQixDQUFDLEtBQUssUUFBUTtBQUNoRCxpQkFBTyxVQUFVO0FBQ2pCLGlCQUFPLFNBQVM7QUFBQSxRQUNwQixDQUFDO0FBQ0QsZUFBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLE9BQU8sSUFBSSxRQUFRO0FBQ2YsWUFBSSxDQUFDLFVBQVUsT0FBTyxPQUFPLE9BQU8sUUFBUSxNQUFNLFlBQVk7QUFDMUQsaUJBQU8sUUFBUSxPQUFPLElBQUksZUFBZSxDQUFDLEdBQUcsNEJBQTRCLENBQUM7QUFBQSxRQUM5RTtBQUNBLGNBQU0sV0FBVyxDQUFDO0FBQ2xCLFlBQUksUUFBUTtBQUNaLFlBQUk7QUFDQSxtQkFBUyxLQUFLLFFBQVE7QUFDbEI7QUFDQSxxQkFBUyxLQUFLLGlCQUFpQixRQUFRLENBQUMsQ0FBQztBQUFBLFVBQzdDO0FBQUEsUUFDSixTQUNPLEtBQUs7QUFDUixpQkFBTyxRQUFRLE9BQU8sSUFBSSxlQUFlLENBQUMsR0FBRyw0QkFBNEIsQ0FBQztBQUFBLFFBQzlFO0FBQ0EsWUFBSSxVQUFVLEdBQUc7QUFDYixpQkFBTyxRQUFRLE9BQU8sSUFBSSxlQUFlLENBQUMsR0FBRyw0QkFBNEIsQ0FBQztBQUFBLFFBQzlFO0FBQ0EsWUFBSSxXQUFXO0FBQ2YsY0FBTSxTQUFTLENBQUM7QUFDaEIsZUFBTyxJQUFJLGlCQUFpQixDQUFDLFNBQVMsV0FBVztBQUM3QyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSztBQUN0QyxxQkFBUyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDcEIsa0JBQUksVUFBVTtBQUNWO0FBQUEsY0FDSjtBQUNBLHlCQUFXO0FBQ1gsc0JBQVEsQ0FBQztBQUFBLFlBQ2IsR0FBRyxDQUFDLFFBQVE7QUFDUixxQkFBTyxLQUFLLEdBQUc7QUFDZjtBQUNBLGtCQUFJLFVBQVUsR0FBRztBQUNiLDJCQUFXO0FBQ1gsdUJBQU8sSUFBSSxlQUFlLFFBQVEsNEJBQTRCLENBQUM7QUFBQSxjQUNuRTtBQUFBLFlBQ0osQ0FBQztBQUFBLFVBQ0w7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMO0FBQUEsTUFDQSxPQUFPLEtBQUssUUFBUTtBQUNoQixZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUksVUFBVSxJQUFJLEtBQUssQ0FBQyxLQUFLLFFBQVE7QUFDakMsb0JBQVU7QUFDVixtQkFBUztBQUFBLFFBQ2IsQ0FBQztBQUNELGlCQUFTLFVBQVUsT0FBTztBQUN0QixrQkFBUSxLQUFLO0FBQUEsUUFDakI7QUFDQSxpQkFBUyxTQUFTLE9BQU87QUFDckIsaUJBQU8sS0FBSztBQUFBLFFBQ2hCO0FBQ0EsaUJBQVMsU0FBUyxRQUFRO0FBQ3RCLGNBQUksQ0FBQyxXQUFXLEtBQUssR0FBRztBQUNwQixvQkFBUSxLQUFLLFFBQVEsS0FBSztBQUFBLFVBQzlCO0FBQ0EsZ0JBQU0sS0FBSyxXQUFXLFFBQVE7QUFBQSxRQUNsQztBQUNBLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxPQUFPLElBQUksUUFBUTtBQUNmLGVBQU8saUJBQWlCLGdCQUFnQixNQUFNO0FBQUEsTUFDbEQ7QUFBQSxNQUNBLE9BQU8sV0FBVyxRQUFRO0FBQ3RCLGNBQU0sSUFBSSxRQUFRLEtBQUsscUJBQXFCLG1CQUFtQixPQUFPO0FBQ3RFLGVBQU8sRUFBRSxnQkFBZ0IsUUFBUTtBQUFBLFVBQzdCLGNBQWMsQ0FBQyxXQUFXLEVBQUUsUUFBUSxhQUFhLE1BQU07QUFBQSxVQUN2RCxlQUFlLENBQUMsU0FBUyxFQUFFLFFBQVEsWUFBWSxRQUFRLElBQUk7QUFBQSxRQUMvRCxDQUFDO0FBQUEsTUFDTDtBQUFBLE1BQ0EsT0FBTyxnQkFBZ0IsUUFBUSxVQUFVO0FBQ3JDLFlBQUk7QUFDSixZQUFJO0FBQ0osWUFBSSxVQUFVLElBQUksS0FBSyxDQUFDLEtBQUssUUFBUTtBQUNqQyxvQkFBVTtBQUNWLG1CQUFTO0FBQUEsUUFDYixDQUFDO0FBRUQsWUFBSSxrQkFBa0I7QUFDdEIsWUFBSSxhQUFhO0FBQ2pCLGNBQU0saUJBQWlCLENBQUM7QUFDeEIsaUJBQVMsU0FBUyxRQUFRO0FBQ3RCLGNBQUksQ0FBQyxXQUFXLEtBQUssR0FBRztBQUNwQixvQkFBUSxLQUFLLFFBQVEsS0FBSztBQUFBLFVBQzlCO0FBQ0EsZ0JBQU0sZ0JBQWdCO0FBQ3RCLGNBQUk7QUFDQSxrQkFBTSxLQUFLLENBQUNzQixXQUFVO0FBQ2xCLDZCQUFlLGFBQWEsSUFBSSxXQUFXLFNBQVMsYUFBYUEsTUFBSyxJQUFJQTtBQUMxRTtBQUNBLGtCQUFJLG9CQUFvQixHQUFHO0FBQ3ZCLHdCQUFRLGNBQWM7QUFBQSxjQUMxQjtBQUFBLFlBQ0osR0FBRyxDQUFDLFFBQVE7QUFDUixrQkFBSSxDQUFDLFVBQVU7QUFDWCx1QkFBTyxHQUFHO0FBQUEsY0FDZCxPQUNLO0FBQ0QsK0JBQWUsYUFBYSxJQUFJLFNBQVMsY0FBYyxHQUFHO0FBQzFEO0FBQ0Esb0JBQUksb0JBQW9CLEdBQUc7QUFDdkIsMEJBQVEsY0FBYztBQUFBLGdCQUMxQjtBQUFBLGNBQ0o7QUFBQSxZQUNKLENBQUM7QUFBQSxVQUNMLFNBQ08sU0FBUztBQUNaLG1CQUFPLE9BQU87QUFBQSxVQUNsQjtBQUNBO0FBQ0E7QUFBQSxRQUNKO0FBRUEsMkJBQW1CO0FBQ25CLFlBQUksb0JBQW9CLEdBQUc7QUFDdkIsa0JBQVEsY0FBYztBQUFBLFFBQzFCO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFBQSxNQUNBLFlBQVksVUFBVTtBQUNsQixjQUFNLFVBQVU7QUFDaEIsWUFBSSxFQUFFLG1CQUFtQixtQkFBbUI7QUFDeEMsZ0JBQU0sSUFBSSxNQUFNLGdDQUFnQztBQUFBLFFBQ3BEO0FBQ0EsZ0JBQVEsV0FBVyxJQUFJO0FBQ3ZCLGdCQUFRLFdBQVcsSUFBSSxDQUFDO0FBQ3hCLFlBQUk7QUFDQSxnQkFBTSxjQUFjLEtBQUs7QUFDekIsc0JBQ0ksU0FBUyxZQUFZLGFBQWEsU0FBUyxRQUFRLENBQUMsR0FBRyxZQUFZLGFBQWEsU0FBUyxRQUFRLENBQUMsQ0FBQztBQUFBLFFBQzNHLFNBQ08sT0FBTztBQUNWLHlCQUFlLFNBQVMsT0FBTyxLQUFLO0FBQUEsUUFDeEM7QUFBQSxNQUNKO0FBQUEsTUFDQSxLQUFLLE9BQU8sV0FBVyxJQUFJO0FBQ3ZCLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxLQUFLLE9BQU8sT0FBTyxJQUFJO0FBQ25CLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxLQUFLLGFBQWEsWUFBWTtBQVMxQixZQUFJLElBQUksS0FBSyxjQUFjLE9BQU8sT0FBTztBQUN6QyxZQUFJLENBQUMsS0FBSyxPQUFPLE1BQU0sWUFBWTtBQUMvQixjQUFJLEtBQUssZUFBZTtBQUFBLFFBQzVCO0FBQ0EsY0FBTSxlQUFlLElBQUksRUFBRSxJQUFJO0FBQy9CLGNBQU0sT0FBT04sTUFBSztBQUNsQixZQUFJLEtBQUssV0FBVyxLQUFLLFlBQVk7QUFDakMsZUFBSyxXQUFXLEVBQUUsS0FBSyxNQUFNLGNBQWMsYUFBYSxVQUFVO0FBQUEsUUFDdEUsT0FDSztBQUNELGtDQUF3QixNQUFNLE1BQU0sY0FBYyxhQUFhLFVBQVU7QUFBQSxRQUM3RTtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQUEsTUFDQSxNQUFNLFlBQVk7QUFDZCxlQUFPLEtBQUssS0FBSyxNQUFNLFVBQVU7QUFBQSxNQUNyQztBQUFBLE1BQ0EsUUFBUSxXQUFXO0FBRWYsWUFBSSxJQUFJLEtBQUssY0FBYyxPQUFPLE9BQU87QUFDekMsWUFBSSxDQUFDLEtBQUssT0FBTyxNQUFNLFlBQVk7QUFDL0IsY0FBSTtBQUFBLFFBQ1I7QUFDQSxjQUFNLGVBQWUsSUFBSSxFQUFFLElBQUk7QUFDL0IscUJBQWEsYUFBYSxJQUFJO0FBQzlCLGNBQU0sT0FBT0EsTUFBSztBQUNsQixZQUFJLEtBQUssV0FBVyxLQUFLLFlBQVk7QUFDakMsZUFBSyxXQUFXLEVBQUUsS0FBSyxNQUFNLGNBQWMsV0FBVyxTQUFTO0FBQUEsUUFDbkUsT0FDSztBQUNELGtDQUF3QixNQUFNLE1BQU0sY0FBYyxXQUFXLFNBQVM7QUFBQSxRQUMxRTtBQUNBLGVBQU87QUFBQSxNQUNYO0FBQUEsSUFDSjtBQUdBLHFCQUFpQixTQUFTLElBQUksaUJBQWlCO0FBQy9DLHFCQUFpQixRQUFRLElBQUksaUJBQWlCO0FBQzlDLHFCQUFpQixNQUFNLElBQUksaUJBQWlCO0FBQzVDLHFCQUFpQixLQUFLLElBQUksaUJBQWlCO0FBQzNDLFVBQU0sZ0JBQWlCaEIsUUFBTyxhQUFhLElBQUlBLFFBQU8sU0FBUztBQUMvRCxJQUFBQSxRQUFPLFNBQVMsSUFBSTtBQUNwQixVQUFNLG9CQUFvQnFCLFlBQVcsYUFBYTtBQUNsRCxhQUFTLFVBQVUsTUFBTTtBQUNyQixZQUFNLFFBQVEsS0FBSztBQUNuQixZQUFNLE9BQU9GLGdDQUErQixPQUFPLE1BQU07QUFDekQsVUFBSSxTQUFTLEtBQUssYUFBYSxTQUFTLENBQUMsS0FBSyxlQUFlO0FBR3pEO0FBQUEsTUFDSjtBQUNBLFlBQU0sZUFBZSxNQUFNO0FBRTNCLFlBQU0sVUFBVSxJQUFJO0FBQ3BCLFdBQUssVUFBVSxPQUFPLFNBQVUsV0FBVyxVQUFVO0FBQ2pELGNBQU0sVUFBVSxJQUFJLGlCQUFpQixDQUFDLFNBQVMsV0FBVztBQUN0RCx1QkFBYSxLQUFLLE1BQU0sU0FBUyxNQUFNO0FBQUEsUUFDM0MsQ0FBQztBQUNELGVBQU8sUUFBUSxLQUFLLFdBQVcsUUFBUTtBQUFBLE1BQzNDO0FBQ0EsV0FBSyxpQkFBaUIsSUFBSTtBQUFBLElBQzlCO0FBQ0EsUUFBSSxZQUFZO0FBQ2hCLGFBQVMsUUFBUSxJQUFJO0FBQ2pCLGFBQU8sU0FBVXBCLE9BQU0sTUFBTTtBQUN6QixZQUFJLGdCQUFnQixHQUFHLE1BQU1BLE9BQU0sSUFBSTtBQUN2QyxZQUFJLHlCQUF5QixrQkFBa0I7QUFDM0MsaUJBQU87QUFBQSxRQUNYO0FBQ0EsWUFBSSxPQUFPLGNBQWM7QUFDekIsWUFBSSxDQUFDLEtBQUssaUJBQWlCLEdBQUc7QUFDMUIsb0JBQVUsSUFBSTtBQUFBLFFBQ2xCO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsUUFBSSxlQUFlO0FBQ2YsZ0JBQVUsYUFBYTtBQUN2QixrQkFBWUMsU0FBUSxTQUFTLENBQUMsYUFBYSxRQUFRLFFBQVEsQ0FBQztBQUFBLElBQ2hFO0FBRUEsWUFBUWdCLE1BQUssV0FBVyx1QkFBdUIsQ0FBQyxJQUFJO0FBQ3BELFdBQU87QUFBQSxFQUNYLENBQUM7QUFDTDtBQUVBLFNBQVMsY0FBY0EsT0FBTTtBQUd6QixFQUFBQSxNQUFLLGFBQWEsWUFBWSxDQUFDaEIsWUFBVztBQUV0QyxVQUFNLDJCQUEyQixTQUFTLFVBQVU7QUFDcEQsVUFBTSwyQkFBMkIsV0FBVyxrQkFBa0I7QUFDOUQsVUFBTSxpQkFBaUIsV0FBVyxTQUFTO0FBQzNDLFVBQU0sZUFBZSxXQUFXLE9BQU87QUFDdkMsVUFBTSxzQkFBc0IsU0FBUyxXQUFXO0FBQzVDLFVBQUksT0FBTyxTQUFTLFlBQVk7QUFDNUIsY0FBTSxtQkFBbUIsS0FBSyx3QkFBd0I7QUFDdEQsWUFBSSxrQkFBa0I7QUFDbEIsY0FBSSxPQUFPLHFCQUFxQixZQUFZO0FBQ3hDLG1CQUFPLHlCQUF5QixLQUFLLGdCQUFnQjtBQUFBLFVBQ3pELE9BQ0s7QUFDRCxtQkFBTyxPQUFPLFVBQVUsU0FBUyxLQUFLLGdCQUFnQjtBQUFBLFVBQzFEO0FBQUEsUUFDSjtBQUNBLFlBQUksU0FBUyxTQUFTO0FBQ2xCLGdCQUFNLGdCQUFnQkEsUUFBTyxjQUFjO0FBQzNDLGNBQUksZUFBZTtBQUNmLG1CQUFPLHlCQUF5QixLQUFLLGFBQWE7QUFBQSxVQUN0RDtBQUFBLFFBQ0o7QUFDQSxZQUFJLFNBQVMsT0FBTztBQUNoQixnQkFBTSxjQUFjQSxRQUFPLFlBQVk7QUFDdkMsY0FBSSxhQUFhO0FBQ2IsbUJBQU8seUJBQXlCLEtBQUssV0FBVztBQUFBLFVBQ3BEO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFDQSxhQUFPLHlCQUF5QixLQUFLLElBQUk7QUFBQSxJQUM3QztBQUNBLHdCQUFvQix3QkFBd0IsSUFBSTtBQUNoRCxhQUFTLFVBQVUsV0FBVztBQUU5QixVQUFNLHlCQUF5QixPQUFPLFVBQVU7QUFDaEQsVUFBTSwyQkFBMkI7QUFDakMsV0FBTyxVQUFVLFdBQVcsV0FBWTtBQUNwQyxVQUFJLE9BQU8sWUFBWSxjQUFjLGdCQUFnQixTQUFTO0FBQzFELGVBQU87QUFBQSxNQUNYO0FBQ0EsYUFBTyx1QkFBdUIsS0FBSyxJQUFJO0FBQUEsSUFDM0M7QUFBQSxFQUNKLENBQUM7QUFDTDtBQUVBLFNBQVMsZUFBZSxLQUFLLFFBQVEsWUFBWSxRQUFRLFdBQVc7QUFDaEUsUUFBTSxTQUFTLEtBQUssV0FBVyxNQUFNO0FBQ3JDLE1BQUksT0FBTyxNQUFNLEdBQUc7QUFDaEI7QUFBQSxFQUNKO0FBQ0EsUUFBTSxpQkFBa0IsT0FBTyxNQUFNLElBQUksT0FBTyxNQUFNO0FBQ3RELFNBQU8sTUFBTSxJQUFJLFNBQVUsTUFBTSxNQUFNLFNBQVM7QUFDNUMsUUFBSSxRQUFRLEtBQUssV0FBVztBQUN4QixnQkFBVSxRQUFRLFNBQVUsVUFBVTtBQUNsQyxjQUFNLFNBQVMsR0FBRyxVQUFVLElBQUksTUFBTSxPQUFPO0FBQzdDLGNBQU0sWUFBWSxLQUFLO0FBU3ZCLFlBQUk7QUFDQSxjQUFJLFVBQVUsZUFBZSxRQUFRLEdBQUc7QUFDcEMsa0JBQU0sYUFBYSxJQUFJLCtCQUErQixXQUFXLFFBQVE7QUFDekUsZ0JBQUksY0FBYyxXQUFXLE9BQU87QUFDaEMseUJBQVcsUUFBUSxJQUFJLG9CQUFvQixXQUFXLE9BQU8sTUFBTTtBQUNuRSxrQkFBSSxrQkFBa0IsS0FBSyxXQUFXLFVBQVUsVUFBVTtBQUFBLFlBQzlELFdBQ1MsVUFBVSxRQUFRLEdBQUc7QUFDMUIsd0JBQVUsUUFBUSxJQUFJLElBQUksb0JBQW9CLFVBQVUsUUFBUSxHQUFHLE1BQU07QUFBQSxZQUM3RTtBQUFBLFVBQ0osV0FDUyxVQUFVLFFBQVEsR0FBRztBQUMxQixzQkFBVSxRQUFRLElBQUksSUFBSSxvQkFBb0IsVUFBVSxRQUFRLEdBQUcsTUFBTTtBQUFBLFVBQzdFO0FBQUEsUUFDSixRQUNNO0FBQUEsUUFHTjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFDQSxXQUFPLGVBQWUsS0FBSyxRQUFRLE1BQU0sTUFBTSxPQUFPO0FBQUEsRUFDMUQ7QUFDQSxNQUFJLHNCQUFzQixPQUFPLE1BQU0sR0FBRyxjQUFjO0FBQzVEO0FBRUEsU0FBUyxVQUFVZ0IsT0FBTTtBQUNyQixFQUFBQSxNQUFLLGFBQWEsUUFBUSxDQUFDaEIsU0FBUWdCLE9BQU0sUUFBUTtBQUc3QyxVQUFNLGFBQWEsZ0JBQWdCaEIsT0FBTTtBQUN6QyxRQUFJLG9CQUFvQjtBQUN4QixRQUFJLGNBQWM7QUFDbEIsUUFBSSxnQkFBZ0I7QUFDcEIsUUFBSSxpQkFBaUI7QUFNckIsVUFBTSw2QkFBNkJnQixNQUFLLFdBQVcscUJBQXFCO0FBQ3hFLFVBQU0sMEJBQTBCQSxNQUFLLFdBQVcsa0JBQWtCO0FBQ2xFLFFBQUloQixRQUFPLHVCQUF1QixHQUFHO0FBQ2pDLE1BQUFBLFFBQU8sMEJBQTBCLElBQUlBLFFBQU8sdUJBQXVCO0FBQUEsSUFDdkU7QUFDQSxRQUFJQSxRQUFPLDBCQUEwQixHQUFHO0FBQ3BDLE1BQUFnQixNQUFLLDBCQUEwQixJQUFJQSxNQUFLLHVCQUF1QixJQUMzRGhCLFFBQU8sMEJBQTBCO0FBQUEsSUFDekM7QUFDQSxRQUFJLHNCQUFzQjtBQUMxQixRQUFJLG1CQUFtQjtBQUN2QixRQUFJLGFBQWE7QUFDakIsUUFBSSx1QkFBdUI7QUFDM0IsUUFBSSxpQ0FBaUM7QUFDckMsUUFBSSxlQUFlO0FBQ25CLFFBQUksYUFBYTtBQUNqQixRQUFJLGFBQWE7QUFDakIsUUFBSSxzQkFBc0I7QUFDMUIsUUFBSSxtQkFBbUI7QUFDdkIsUUFBSSx3QkFBd0I7QUFDNUIsUUFBSSxvQkFBb0IsT0FBTztBQUMvQixRQUFJLGlCQUFpQjtBQUNyQixRQUFJLG1CQUFtQixPQUFPO0FBQUEsTUFDMUI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0osQ0FBQztBQUNMO0FBRUEsU0FBUyxZQUFZZ0IsT0FBTTtBQUN2QixlQUFhQSxLQUFJO0FBQ2pCLGdCQUFjQSxLQUFJO0FBQ2xCLFlBQVVBLEtBQUk7QUFDbEI7QUFFQSxJQUFNLFNBQVMsU0FBUztBQUN4QixZQUFZLE1BQU07QUFDbEIsYUFBYSxNQUFNOyIsIm5hbWVzIjpbInNlbGYiLCJnbG9iYWwiLCJkZWxlZ2F0ZSIsInByb3AiLCJfZ2xvYmFsIiwiZXZlbnQiLCJwYXRjaE9wdGlvbnMiLCJyZXR1cm5UYXJnZXQiLCJ0YXNrRGF0YSIsIndpbmRvdyIsImlzQnJvd3NlciIsImlzTWl4Iiwiem9uZVN5bWJvbEV2ZW50TmFtZXMiLCJUUlVFX1NUUiIsIkZBTFNFX1NUUiIsIlpPTkVfU1lNQk9MX1BSRUZJWCIsImludGVybmFsV2luZG93IiwiWm9uZSIsIm5hbWUiLCJsb2FkVGFza3MiLCJPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJPYmplY3REZWZpbmVQcm9wZXJ0eSIsIl9fc3ltYm9sX18iLCJ2YWx1ZSJdLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19