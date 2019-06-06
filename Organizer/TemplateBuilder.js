(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./StringBuilder"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const StringBuilder_1 = require("./StringBuilder");
    class TemplatesBuilder {
        constructor(className) {
            this.className = className;
        }
        build(prefix, template) {
            let builder = new StringBuilder_1.StringBuilder(prefix);
            builder.appendLine('export class ' + this.className + 'Template');
            builder.appendLine('{');
            builder.appendLine('\tpublic static readonly TEMPLATE : string = `');
            let text = template.replace(TemplatesBuilder.QUOTE_REGEX, '\\`');
            let parts = text.split(TemplatesBuilder.NEWLINE_REGEX);
            for (let entry of parts)
                builder.appendLine('\t\t' + entry);
            builder.appendLine('\t`;');
            builder.appendLine('}');
            return builder.toString();
        }
    }
    TemplatesBuilder.QUOTE_REGEX = /`/g;
    TemplatesBuilder.NEWLINE_REGEX = /\r?\n/g;
    exports.TemplatesBuilder = TemplatesBuilder;
});
//# sourceMappingURL=TemplateBuilder.js.map