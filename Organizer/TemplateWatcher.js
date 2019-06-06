(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TimeUtils", "./FileWatcher"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Storage = require('fs');
    const TimeUtils_1 = require("./TimeUtils");
    const FileWatcher_1 = require("./FileWatcher");
    class TemplateWatcher {
        constructor(callback) {
            this.callback = callback;
            let regex = /\.template\.html?$/;
            this.watcher = new FileWatcher_1.FileWatcher(regex, (path) => {
                let time = TimeUtils_1.TimeUtils.getTime();
                let options = {
                    encoding: 'utf8'
                };
                Storage.readFile(path, options, (error, data) => {
                    try {
                        if (data)
                            this.callback(null, path, data.toString());
                        else
                            this.callback(error, null, null);
                        console.log(time + ' ' + path);
                    }
                    catch (e) {
                        console.log('ERROR!!! ' + time + ' ' + path + ' -> ' + e.message);
                    }
                });
            });
        }
        start(dirPath) {
            this.watcher.start(dirPath);
        }
        stop() {
            this.watcher.stop();
        }
    }
    exports.TemplateWatcher = TemplateWatcher;
});
//# sourceMappingURL=TemplateWatcher.js.map