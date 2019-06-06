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
    class PathUtils {
        static extractDirectory(path) {
            let index = path.lastIndexOf('/');
            if (index > -1)
                return path.substring(0, index) + '/';
            return '';
        }
        static extractFilename(path) {
            let index = path.lastIndexOf('/');
            if (index > -1)
                return path.substring(index + 1);
            return path;
        }
        static extractBasename(path) {
            let name = this.extractFilename(path);
            if (name.length > 0) {
                let index = name.indexOf('.');
                if (index > -1)
                    return name.substring(0, index);
            }
            return '';
        }
        static normalizeName(name) {
            if (name.length > 0)
                return name[0].toUpperCase() + name.substr(1);
            return '';
        }
    }
    exports.PathUtils = PathUtils;
});
//# sourceMappingURL=PathUtils.js.map