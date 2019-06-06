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
    class StringBuilder {
        constructor(prefix = '') {
            this.prefix = prefix;
            this.buffer = '';
        }
        appendText(text) {
            this.buffer += this.prefix + text;
        }
        appendLine(line) {
            this.buffer += (line ? this.prefix + line + '\n' : '\n');
        }
        toString() {
            return this.buffer;
        }
    }
    exports.StringBuilder = StringBuilder;
});
//# sourceMappingURL=StringBuilder.js.map