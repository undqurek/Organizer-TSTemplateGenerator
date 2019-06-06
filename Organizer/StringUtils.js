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
    class StringUtils {
        static createL2String(number) {
            return (number > 9 ? number.toString() : '0' + number);
        }
        static createL4String(number) {
            if (number > 9) {
                if (number > 99) {
                    if (number > 999)
                        return number.toString();
                    return '0' + number;
                }
                return '00' + number;
            }
            return '000' + number;
        }
    }
    exports.StringUtils = StringUtils;
});
//# sourceMappingURL=StringUtils.js.map