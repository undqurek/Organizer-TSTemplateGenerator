(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StringUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StringUtils_1 = require("./StringUtils");
    class TimeUtils {
        static getTime() {
            let date = new Date();
            let year = StringUtils_1.StringUtils.createL4String(date.getFullYear());
            let month = StringUtils_1.StringUtils.createL2String(date.getMonth());
            let day = StringUtils_1.StringUtils.createL2String(date.getDate());
            let hour = StringUtils_1.StringUtils.createL2String(date.getHours());
            let minute = StringUtils_1.StringUtils.createL2String(date.getMinutes());
            let second = StringUtils_1.StringUtils.createL2String(date.getSeconds());
            let millisecond = StringUtils_1.StringUtils.createL4String(date.getMilliseconds());
            let a = year + '.' + month + '.' + day;
            let b = hour + ':' + minute + ':' + second + '.' + millisecond;
            return a + ' ' + b;
        }
    }
    exports.TimeUtils = TimeUtils;
});
//# sourceMappingURL=TimeUtils.js.map