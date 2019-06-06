(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Common", "./PathUtils", "./StringBuilder", "./ClassBuilder", "./TemplateBuilder", "./Selector", "./TemplateParser", "./TemplateWatcher"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let Storage = require('fs');
    const Common_1 = require("./Common");
    const PathUtils_1 = require("./PathUtils");
    const StringBuilder_1 = require("./StringBuilder");
    const ClassBuilder_1 = require("./ClassBuilder");
    const TemplateBuilder_1 = require("./TemplateBuilder");
    const Selector_1 = require("./Selector");
    const TemplateParser_1 = require("./TemplateParser");
    const TemplateWatcher_1 = require("./TemplateWatcher");
    class FileGenerator {
        constructor() {
            this.HEADER_REGEX = /^namespace ((?:[_A-Z][_0-9a-z]*)+(?:\.(?:[_A-Z][_0-9a-z]*)+)*)(?:\r?\n)+reference ([^\r\n]+)\r?\n/m;
            this.COMMENT_REGEX = /<!--(?:.|\r|\n)*?-->/g;
            this.progressing = false;
            this.watcher = new TemplateWatcher_1.TemplateWatcher((error, filePath, fileText) => {
                if (filePath && fileText) {
                    let matches = fileText.match(this.HEADER_REGEX);
                    let directory = PathUtils_1.PathUtils.extractDirectory(filePath);
                    let classname = PathUtils_1.PathUtils.extractBasename(filePath);
                    if (matches && matches.length > 1) {
                        let header = matches[0];
                        let template = this.releaseTemplate(header.length, fileText);
                        let parser = new TemplateParser_1.TemplateParser((error, root) => {
                            let namespace = matches[1];
                            let reference = matches[2];
                            let builder = new StringBuilder_1.StringBuilder('');
                            builder.appendLine('/// <reference path="' + reference + '" />');
                            builder.appendLine();
                            builder.appendLine('// ---------------------------------------------------');
                            builder.appendLine('// AUTOMATICALLY GENERATED SOURCE CODE');
                            builder.appendLine('// ---------------------------------------------------');
                            builder.appendLine();
                            builder.appendLine('namespace ' + namespace);
                            builder.appendLine('{');
                            builder.appendLine('\timport Controller = Core.Organizer.Controller;');
                            builder.appendLine();
                            builder.appendText(this.constructControllers('\t', root.controllers));
                            builder.appendText(this.constructTemplate(classname, '\t', template));
                            builder.appendLine('}');
                            let options = {
                                encoding: 'utf8'
                            };
                            Storage.writeFile(directory + classname + 'Template.ts', builder.toString(), options, e => null);
                        });
                        parser.parse(template);
                    }
                    else
                        console.log('Incorrect template format (missing namespace or reference) in file ' + directory + classname + 'Template.ts.');
                }
            });
        }
        releaseTemplate(offset, text) {
            let body = text.substring(offset);
            return body.replace(this.COMMENT_REGEX, '');
        }
        constructTemplate(classname, prefix, template) {
            let builder = new TemplateBuilder_1.TemplatesBuilder(classname);
            return builder.build(prefix, template);
        }
        constructHandle(element) {
            return new Common_1.Variable('handle', element.name);
        }
        constructClass(prefix, handle, name) {
            let attributes = Selector_1.Selector.selectAttributes(handle);
            {
                let builder = new ClassBuilder_1.ClassBuilder(name);
                builder.addVariable(this.constructHandle(handle));
                for (let entry of attributes.handles)
                    builder.addVariable(entry);
                for (let entry of attributes.events)
                    builder.addMethod(entry);
                return builder.toString(prefix);
            }
        }
        constructScope(prefix, pattern, name) {
            let builder = new StringBuilder_1.StringBuilder('');
            builder.appendText(this.constructControllers(prefix, pattern.controllers));
            builder.appendText(this.constructLoops(prefix, pattern.loops));
            builder.appendLine(this.constructClass(prefix, pattern.handle, name));
            return builder.toString();
        }
        constructController(prefix, controller) {
            return this.constructScope(prefix, controller, controller.type);
        }
        constructControllers(prefix, controllers) {
            let builder = new StringBuilder_1.StringBuilder('');
            for (let name in controllers)
                builder.appendLine(this.constructController(prefix, controllers[name]));
            return builder.toString();
        }
        constructLoop(prefix, loop) {
            let logic = loop.logic;
            if (logic == null)
                return '';
            return this.constructScope(prefix, loop, logic);
        }
        constructLoops(prefix, loops) {
            let builder = new StringBuilder_1.StringBuilder('');
            for (let name in loops)
                builder.appendLine(this.constructLoop(prefix, loops[name]));
            return builder.toString();
        }
        generate(filePath) {
            if (this.progressing)
                return;
            this.progressing = true;
        }
        start(dirPath) {
            this.watcher.start(dirPath);
        }
        stop() {
            this.watcher.stop();
        }
    }
    exports.FileGenerator = FileGenerator;
});
//# sourceMappingURL=FileGenerator.js.map