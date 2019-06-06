(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SuperPattern {
        constructor(handle) {
            this.handle = handle;
            this.loops = {};
            this.controllers = {};
        }
    }
    exports.SuperPattern = SuperPattern;
    class RootPattern extends SuperPattern {
        constructor(handle) {
            super(handle);
            this.templates = {};
        }
    }
    exports.RootPattern = RootPattern;
    class LocalPattern extends SuperPattern {
        constructor(parent, handle) {
            super(handle);
            this.parent = parent;
        }
    }
    exports.LocalPattern = LocalPattern;
    class TemplatePattern extends SuperPattern {
        constructor(handle) {
            super(handle);
        }
    }
    exports.TemplatePattern = TemplatePattern;
    class LoopPattern extends LocalPattern {
        constructor(parent, handle, methods, logic) {
            super(parent, handle);
            this.methods = methods;
            this.logic = logic;
        }
    }
    exports.LoopPattern = LoopPattern;
    class ControllerPattern extends LocalPattern {
        constructor(parent, handle, type) {
            super(parent, handle);
            this.type = type;
        }
    }
    exports.ControllerPattern = ControllerPattern;
    class Variable {
        constructor(name, type) {
            this.name = name;
            this.type = type;
        }
    }
    exports.Variable = Variable;
    class Method {
        constructor(name, parameters) {
            this.name = name;
            this.parameters = parameters;
        }
    }
    exports.Method = Method;
    class Parameter {
        constructor(name, methods) {
            this.name = name;
            this.methods = methods;
        }
    }
    exports.Parameter = Parameter;
    class Event {
        constructor(name, method) {
            this.name = name;
            this.method = method;
        }
    }
    exports.Event = Event;
    class Binding {
        constructor(handles, events) {
            this.handles = handles;
            this.events = events;
        }
    }
    exports.Binding = Binding;
});
//# sourceMappingURL=Common.js.map