(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Analyzer", "./StringBuilder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Analyzer_1 = require("./Analyzer");
    const StringBuilder_1 = require("./StringBuilder");
    class ClassBuilder {
        constructor(name) {
            this.name = name;
            this.code = null;
            this.variables = [];
            this.methods = [];
        }
        addVariable(variable) {
            this.code = null;
            this.variables.push(variable);
        }
        addMethod(event) {
            this.code = null;
            this.methods.push(event);
        }
        toString(prefix) {
            if (this.code == null) {
                let builder = new StringBuilder_1.StringBuilder(prefix);
                builder.appendLine('export abstract class Super' + this.name + 'Controller<T> extends Controller<T>');
                builder.appendLine('{');
                let variables = new Map();
                let methods = new Map();
                if (this.variables.length > 0) {
                    builder.appendLine();
                    for (let entry of this.variables) {
                        if (variables.has(entry.name))
                            throw new Error('Variable name \'' + entry.name + '\' is duplicated.');
                        variables.set(entry.name, Analyzer_1.Analyzer.analyzeTag(entry.type));
                    }
                    for (let entry of variables)
                        builder.appendLine('\tprotected readonly ' + entry[0] + ' : ' + entry[1] + ';');
                }
                if (this.methods.length > 0) {
                    builder.appendLine();
                    for (let entry of this.methods) {
                        if (variables.has(entry.method))
                            throw new Error('Method name \'' + entry.method + '\' is used by variable.');
                        let type = methods.get(entry.method);
                        methods.set(entry.method, (type ? type + ' | ' : '') + Analyzer_1.Analyzer.analyzeEvent(entry.name));
                    }
                    for (let entry of methods)
                        builder.appendLine('\tprotected abstract ' + entry[0] + '( e : ' + entry[1] + ' ) : void;');
                }
                builder.appendLine('}');
                this.code = builder.toString();
            }
            return this.code;
        }
    }
    exports.ClassBuilder = ClassBuilder;
});
//# sourceMappingURL=ClassBuilder.js.map