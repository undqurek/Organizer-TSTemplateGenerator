(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Common_1 = require("./Common");
    class Interpolator {
        static extractName(text) {
            let matches = text.match(this.NAME_REGEX);
            if (matches == null)
                throw new Error('Incorrect parameter format (used: "' + text + '").');
            return matches[1];
        }
        static extractPath(text) {
            let matches = text.match(this.PATH_REGEX);
            if (matches == null)
                throw new Error('Incorrect object path format (used: "' + text + '").');
            return matches[1];
        }
        static extractParameters(text) {
            let parts = text.split(',');
            {
                let result = new Array();
                for (let entry of parts)
                    result.push(this.extractPath(entry));
                return result;
            }
        }
        static extractMethods(text) {
            let parts = text.split('|');
            {
                let result = new Array();
                for (let entry of parts) {
                    let matches = entry.match(this.DECLARATION_REGEX);
                    if (matches == null)
                        throw new Error('Incorrect function format (used: "' + text + '").');
                    let content = matches[2];
                    let parameters = content ? this.extractParameters(content) : new Array();
                    result.push(new Common_1.Method(content, parameters));
                }
                return result;
            }
        }
        static parseVariable(text) {
            let matches = text.match(this.VARIABLE_REGEX);
            if (matches == null)
                throw new Error('Incorrect controller attribute format (used: "' + text + '").');
            return new Common_1.Variable(matches[2], matches[1]);
        }
        static parseParameter(text) {
            let matches = text.match(this.PARAMETER_REGEX);
            if (matches == null)
                throw new Error('Incorrect var-repeat attribute format (used: "' + text + '").');
            let content = matches[2];
            let methods = content ? this.extractMethods(content) : new Array();
            return new Common_1.Parameter(matches[1], methods);
        }
        static parseEvent(part) {
            let matches = part.match(this.EVENT_REGEX);
            if (matches == null)
                throw new Error('Incorrect var-events attribute format (used: "' + part + '").');
            return new Common_1.Event(matches[1], matches[3]);
        }
    }
    Interpolator.NAME_REGEX = /^\s*(\w+)\s*$/;
    Interpolator.PATH_REGEX = /^\s*(\w+(?:\.\w+)*)\s*$/;
    Interpolator.VARIABLE_REGEX = /\s*(\w+)\s+as\s+(\w+)\s*/;
    Interpolator.PARAMETER_REGEX = /\s*(\w+)\s*:?\s*([^:]*)\s*/;
    Interpolator.DECLARATION_REGEX = /\s*(\w+)(?:\(([^()]*)\))?\s*/;
    Interpolator.EVENT_REGEX = /^\s*(\w+)\s*(?:\((.+)\))?\s*:\s*(\w+)\s*$/;
    exports.Interpolator = Interpolator;
});
//# sourceMappingURL=Interpolator.js.map