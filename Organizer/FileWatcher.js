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
    let Watcher = require('chokidar');
    class FileWatcher {
        constructor(regex, callback) {
            this.regex = regex;
            this.callback = callback;
            this.watcher = null;
        }
        apply(path) {
            path = path.replace(FileWatcher.SEPARATOR_REGEX, '/');
            if (this.regex.test(path))
                this.callback(path);
        }
        start(dirPath) {
            if (this.watcher)
                return;
            this.watcher = Watcher.watch(dirPath);
            this.watcher.on('add', path => this.apply(path));
            this.watcher.on('change', path => this.apply(path));
        }
        stop() {
            if (this.watcher) {
                this.watcher.close();
                this.watcher = null;
            }
        }
    }
    FileWatcher.SEPARATOR_REGEX = /\\/g;
    exports.FileWatcher = FileWatcher;
});
//# sourceMappingURL=FileWatcher.js.map