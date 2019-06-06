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
    class Analyzer {
        static analyzeTag(name) {
            let type = this.types[name];
            if (type)
                return type;
            return 'HTMLElement';
        }
        static analyzeEvent(name) {
            let event = this.events[name];
            if (event)
                return event;
            return 'Event';
        }
    }
    Analyzer.types = {
        'a': 'HTMLAnchorElement',
        'abbr': 'HTMLElement',
        'address': 'HTMLElement',
        'area': 'HTMLAreaElement',
        'article': 'HTMLElement',
        'aside': 'HTMLElement',
        'audio': 'HTMLAudioElement',
        'b': 'HTMLElement',
        'base': 'HTMLBaseElement',
        'bdi': 'HTMLElement',
        'bdo': 'HTMLElement',
        'blockquote': 'HTMLQuoteElement',
        'body': 'HTMLBodyElement',
        'br': 'HTMLBRElement',
        'button': 'HTMLButtonElement',
        'canvas': 'HTMLCanvasElement',
        'caption': 'HTMLTableCaptionElement',
        'cite': 'HTMLElement',
        'code': 'HTMLElement',
        'col': 'HTMLTableColElement',
        'colgroup': 'HTMLTableColElement',
        'data': 'HTMLDataElement',
        'datalist': 'HTMLDataListElement',
        'dd': 'HTMLElement',
        'del': 'HTMLModElement',
        'details': 'HTMLDetailsElement',
        'dfn': 'HTMLElement',
        'dialog': 'HTMLDialogElement',
        'div': 'HTMLDivElement',
        'dl': 'HTMLDListElement',
        'dt': 'HTMLElement',
        'em': 'HTMLElement',
        'embed': 'HTMLEmbedElement',
        'fieldset': 'HTMLFieldSetElement',
        'figcaption': 'HTMLElement',
        'figure': 'HTMLElement',
        'footer': 'HTMLElement',
        'form': 'HTMLFormElement',
        'h1': 'HTMLHeadingElement',
        'h2': 'HTMLHeadingElement',
        'h3': 'HTMLHeadingElement',
        'h4': 'HTMLHeadingElement',
        'h5': 'HTMLHeadingElement',
        'h6': 'HTMLHeadingElement',
        'head': 'HTMLHeadElement',
        'header': 'HTMLElement',
        'hr': 'HTMLHRElement',
        'html': 'HTMLHtmlElement',
        'i': 'HTMLElement',
        'iframe': 'HTMLIFrameElement',
        'img': 'HTMLImageElement',
        'input': 'HTMLInputElement',
        'ins': 'HTMLModElement',
        'kbd': 'HTMLElement',
        'label': 'HTMLLabelElement',
        'legend': 'HTMLLegendElement',
        'li': 'HTMLLIElement',
        'link': 'HTMLLinkElement',
        'main': 'HTMLElement',
        'map': 'HTMLMapElement',
        'mark': 'HTMLElement',
        'meta': 'HTMLMetaElement',
        'meter': 'HTMLMeterElement',
        'nav': 'HTMLElement',
        'noscript': 'HTMLElement',
        'object': 'HTMLObjectElement',
        'ol': 'HTMLOListElement',
        'optgroup': 'HTMLOptGroupElement',
        'option': 'HTMLOptionElement',
        'output': 'HTMLOutputElement',
        'p': 'HTMLParagraphElement',
        'param': 'HTMLParamElement',
        'picture': 'HTMLPictureElement',
        'pre': 'HTMLPreElement',
        'progress': 'HTMLProgressElement',
        'q': 'HTMLQuoteElement',
        'rp': 'HTMLElement',
        'rt': 'HTMLElement',
        'ruby': 'HTMLElement',
        's': 'HTMLElement',
        'samp': 'HTMLElement',
        'script': 'HTMLScriptElement',
        'section': 'HTMLElement',
        'select': 'HTMLSelectElement',
        'small': 'HTMLElement',
        'source': 'HTMLSourceElement',
        'span': 'HTMLSpanElement',
        'strong': 'HTMLElement',
        'style': 'HTMLStyleElement',
        'sub': 'HTMLElement',
        'summary': 'HTMLElement',
        'sup': 'HTMLElement',
        'svg': 'SVGElement',
        'table': 'HTMLTableElement',
        'tbody': 'HTMLTableSectionElement',
        'td': 'HTMLTableDataCellElement',
        'template': 'HTMLTemplateElement',
        'textarea': 'HTMLTextAreaElement',
        'tfoot': 'HTMLTableSectionElement',
        'th': 'HTMLTableHeaderCellElement',
        'thead': 'HTMLTableSectionElement',
        'time': 'HTMLTimeElement',
        'title': 'HTMLTitleElement',
        'tr': 'HTMLTableRowElement',
        'track': 'HTMLTrackElement',
        'u': 'HTMLElement',
        'ul': 'HTMLUListElement',
        'var': 'HTMLElement',
        'video': 'HTMLVideoElement',
        'wbr': 'HTMLElement'
    };
    Analyzer.events = {
        'click': 'MouseEvent',
        'dblclick': 'MouseEvent',
        'mousedown': 'MouseEvent',
        'mouseup': 'MouseEvent',
        'mouseenter': 'MouseEvent',
        'mouseleave': 'MouseEvent',
        'mouseover': 'MouseEvent',
        'mouseout': 'MouseEvent',
        'mousemove': 'MouseEvent',
        'contextmenu': 'MouseEvent',
        'keydown': 'KeyboardEvent',
        'keyup': 'KeyboardEvent',
        'keypress': 'KeyboardEvent',
        'drag': 'DragEvent',
        'drop': 'DragEvent',
        'dragstart': 'DragEvent',
        'dragend': 'DragEvent',
        'dragenter': 'DragEvent',
        'dragleave': 'DragEvent',
        'dragover': 'DragEvent',
        'touchstart': 'TouchEvent',
        'touchend': 'TouchEvent',
        'touchcancel': 'TouchEvent',
        'touchmove': 'TouchEvent'
    };
    exports.Analyzer = Analyzer;
});
//# sourceMappingURL=Analyzer.js.map