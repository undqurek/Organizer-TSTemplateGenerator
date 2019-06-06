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
    class Decompositor {
        static findMaster(root, scopes) {
            if (root == scopes[0])
                return null;
            return root;
        }
        static findParent(element, root) {
            while (true) {
                let parent = element.parent;
                if (parent == null)
                    return root;
                if (parent.$scope)
                    return parent.$scope;
                element = parent;
            }
        }
        static collectScope(scope, root) {
            let attributes = scope.attribs;
            let template = attributes['var-template'];
            let loop = attributes['var-repeat'];
            let controller = attributes['var-controller'];
            if (template) {
                if (loop)
                    throw new Error('Template cannot be simultaneously a loop (error inside template name "' + template + '"). ');
                if (controller)
                    throw new Error('Template cannot be simultaneously a controller (error inside template name "' + template + '"). ');
                let name = Interpolator_1.Interpolator.extractName(template);
                if (name in root.templates)
                    throw new Error('Template name "' + name + '" is duplicated.');
                root.templates[name] = scope.$scope = new Common_1.TemplatePattern(scope);
            }
            else {
                let parent = this.findParent(scope, root);
                if (loop) {
                    let parameter = Interpolator_1.Interpolator.parseParameter(loop);
                    if (controller == null)
                        throw new Error('Loop "' + parameter.name + '" has no controller.');
                    if (parameter.name in parent.loops)
                        throw new Error('Loop name "' + parameter.name + '" is duplicated inside scope.');
                    let logic = Interpolator_1.Interpolator.extractName(controller);
                    parent.loops[parameter.name] = scope.$scope = new Common_1.LoopPattern(parent, scope, parameter.methods, logic);
                    return;
                }
                if (controller) {
                    let variable = Interpolator_1.Interpolator.parseVariable(controller);
                    if (variable.name in parent.controllers)
                        throw new Error('Controller name "' + variable.name + '" is duplicated inside scope.');
                    parent.controllers[variable.name] = scope.$scope = new Common_1.ControllerPattern(parent, scope, variable.type);
                    return;
                }
            }
        }
        static releaseScope(element) {
            let parent = element.parent;
            if (parent) {
                element.parent = null;
                let elements = parent.children;
                let index = elements.indexOf(element);
                if (index > -1)
                    elements.splice(index, 1);
            }
            delete element.$scope;
        }
        static decomposeModel(root, scopes) {
            let master = this.findMaster(root, scopes);
            let pattern = new Common_1.RootPattern(master);
            for (let entry of scopes)
                this.collectScope(entry, pattern);
            for (let entry of scopes)
                this.releaseScope(entry);
            return pattern;
        }
    }
    exports.Decompositor = Decompositor;
});
//# sourceMappingURL=Decompositor.js.map