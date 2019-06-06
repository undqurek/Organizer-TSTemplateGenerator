(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Organizer/FileGenerator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const FileGenerator_1 = require("./Organizer/FileGenerator");
    let args = process.argv;
    let mode = args[2];
    let path = args[3];
    let generator = new FileGenerator_1.FileGenerator();
    switch (mode) {
        default:
        case 'watcher':
            generator.start((path || '.') + '/');
            break;
        case 'file':
            if (path == null)
                throw new Error('File path is required for file mode.');
            generator.generate(path);
            break;
    }
});
//# sourceMappingURL=Main.js.map