(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Common", "./Interpolator"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Common_1 = require("./Common");
    const Interpolator_1 = require("./Interpolator");
    class Selector {
        static selectElement(elements) {
            for (let entry of elements) {
                if (entry.type == 'tag')
                    return entry;
            }
            return null;
        }
        static selectElements(element, callback) {
            let collect = (element) => {
                if (element.type == 'tag' || element.type == 'style' || element.type == 'script') {
                    callback(element);
                    return true;
                }
                return false;
            };
            let analyze = (element) => {
                if (collect(element)) {
                    let elements = element.children;
                    for (let entry of elements)
                        analyze(entry);
                }
            };
            analyze(element);
        }
        static selectScopes(element) {
            let result = new Array();
            this.selectElements(element, (element) => {
                let attributes = element.attribs;
                if ('var-controller' in attributes || 'var-repeat' in attributes)
                    result.push(element);
            });
            return result;
        }
        static selectAttribute(attributes, name, callback) {
            if (name in attributes)
                callback(attributes[name]);
        }
        static selectAttributes(element) {
            let handles = new Array();
            let events = new Array();
            this.selectElements(element, (element) => {
                let attributes = element.attribs;
                this.selectAttribute(attributes, 'var-handle', (attribute) => {
                    handles.push(new Common_1.Variable(attribute, element.name));
                });
                this.selectAttribute(attributes, 'var-events', (attribute) => {
                    let parts = attribute.split(',');
                    for (let entry of parts)
                        events.push(Interpolator_1.Interpolator.parseEvent(entry));
                });
            });
            return new Common_1.Binding(handles, events);
        }
    }
    exports.Selector = Selector;
});
//# sourceMappingURL=Selector.js.map