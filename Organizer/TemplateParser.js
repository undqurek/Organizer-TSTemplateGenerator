(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Selector", "./Decompositor"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { Parser, DomHandler } = require('htmlparser2');
    const Selector_1 = require("./Selector");
    const Decompositor_1 = require("./Decompositor");
    class TemplateParser {
        constructor(callback) {
            this.parser = new Parser(new DomHandler((error, children) => {
                if (children) {
                    let root = Selector_1.Selector.selectElement(children);
                    let scopes = Selector_1.Selector.selectScopes(root);
                    let pattern = Decompositor_1.Decompositor.decomposeModel(root, scopes);
                    callback(null, pattern);
                }
                else
                    callback(error, null);
            }));
        }
        parse(html) {
            this.parser.write(html);
            this.parser.end();
        }
    }
    exports.TemplateParser = TemplateParser;
});
//# sourceMappingURL=TemplateParser.js.map