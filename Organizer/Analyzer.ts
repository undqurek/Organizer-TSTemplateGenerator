
import { Map, Variable, Event, Binding } from "./Common";
import { Interpolator } from "./Interpolator";


/**
 * Created by qurek on 25.06.2016.
 */
export class Analyzer
{
    // https://www.w3schools.com/tags/
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a

    // helper methods

    private static types : Map<string> = {
        'a' : 'HTMLAnchorElement',
        'abbr' : 'HTMLElement',
        'address' : 'HTMLElement', // HTMLSpanElement
        'area' : 'HTMLAreaElement',
        'article' : 'HTMLElement',
        'aside' : 'HTMLElement',
        'audio' : 'HTMLAudioElement',
        'b' : 'HTMLElement',
        'base' : 'HTMLBaseElement',
        'bdi' : 'HTMLElement',
        'bdo' : 'HTMLElement', // HTMLSpanElement
        'blockquote' : 'HTMLQuoteElement',
        'body' : 'HTMLBodyElement',
        'br' : 'HTMLBRElement',
        'button' : 'HTMLButtonElement',
        'canvas' : 'HTMLCanvasElement',
        'caption' : 'HTMLTableCaptionElement',
        'cite' : 'HTMLElement', // HTMLSpanElement
        'code' : 'HTMLElement', // HTMLSpanElement
        'col' : 'HTMLTableColElement',
        'colgroup' : 'HTMLTableColElement',
        'data' : 'HTMLDataElement',
        'datalist' : 'HTMLDataListElement',
        'dd' : 'HTMLElement',
        'del' : 'HTMLModElement',
        'details' : 'HTMLDetailsElement',
        'dfn' : 'HTMLElement',
        'dialog' : 'HTMLDialogElement',
        'div' : 'HTMLDivElement',
        'dl' : 'HTMLDListElement',
        'dt' : 'HTMLElement', // HTMLSpanElement
        'em' : 'HTMLElement', // HTMLSpanElement
        'embed' : 'HTMLEmbedElement',
        'fieldset' : 'HTMLFieldSetElement',
        'figcaption' : 'HTMLElement',
        'figure' : 'HTMLElement',
        'footer' : 'HTMLElement',
        'form' : 'HTMLFormElement',
        'h1' : 'HTMLHeadingElement',
        'h2' : 'HTMLHeadingElement',
        'h3' : 'HTMLHeadingElement',
        'h4' : 'HTMLHeadingElement',
        'h5' : 'HTMLHeadingElement',
        'h6' : 'HTMLHeadingElement',
        'head' : 'HTMLHeadElement',
        'header' : 'HTMLElement',
        'hr' : 'HTMLHRElement',
        'html' : 'HTMLHtmlElement',
        'i' : 'HTMLElement', // HTMLSpanElement
        'iframe' : 'HTMLIFrameElement',
        'img' : 'HTMLImageElement',
        'input' : 'HTMLInputElement',
        'ins' : 'HTMLModElement',
        'kbd' : 'HTMLElement',
        'label' : 'HTMLLabelElement',
        'legend' : 'HTMLLegendElement',
        'li' : 'HTMLLIElement',
        'link' : 'HTMLLinkElement',
        'main' : 'HTMLElement',
        'map' : 'HTMLMapElement',
        'mark' : 'HTMLElement',
        'meta' : 'HTMLMetaElement',
        'meter' : 'HTMLMeterElement',
        'nav' : 'HTMLElement',
        'noscript' : 'HTMLElement',
        'object' : 'HTMLObjectElement',
        'ol' : 'HTMLOListElement',
        'optgroup' : 'HTMLOptGroupElement',
        'option' : 'HTMLOptionElement',
        'output' : 'HTMLOutputElement',
        'p' : 'HTMLParagraphElement',
        'param' : 'HTMLParamElement',
        'picture' : 'HTMLPictureElement',
        'pre' : 'HTMLPreElement',
        'progress' : 'HTMLProgressElement',
        'q' : 'HTMLQuoteElement',
        'rp' : 'HTMLElement',
        'rt' : 'HTMLElement',
        'ruby' : 'HTMLElement',
        's' : 'HTMLElement',
        'samp' : 'HTMLElement',
        'script' : 'HTMLScriptElement',
        'section' : 'HTMLElement',
        'select' : 'HTMLSelectElement',
        'small' : 'HTMLElement',
        'source' : 'HTMLSourceElement',
        'span' : 'HTMLSpanElement', // HTMLElement
        'strong' : 'HTMLElement',
        'style' : 'HTMLStyleElement',
        'sub' : 'HTMLElement',
        'summary' : 'HTMLElement',
        'sup' : 'HTMLElement',
        'svg' : 'SVGElement',
        'table' : 'HTMLTableElement',
        'tbody' : 'HTMLTableSectionElement',
        'td' : 'HTMLTableDataCellElement', // HTMLTableCellElement
        'template' : 'HTMLTemplateElement',
        'textarea' : 'HTMLTextAreaElement',
        'tfoot' : 'HTMLTableSectionElement',
        'th' : 'HTMLTableHeaderCellElement', // HTMLTableCellElement
        'thead' : 'HTMLTableSectionElement',
        'time' : 'HTMLTimeElement',
        'title' : 'HTMLTitleElement',
        'tr' : 'HTMLTableRowElement',
        'track' : 'HTMLTrackElement',
        'u' : 'HTMLElement',
        'ul' : 'HTMLUListElement',
        'var' : 'HTMLElement',
        'video' : 'HTMLVideoElement',
        'wbr' : 'HTMLElement'
    };

    private static events : Map<string> = {
        // --- MouseEvent
        'click' : 'MouseEvent',
        'dblclick' : 'MouseEvent',
        'mousedown' : 'MouseEvent',
        'mouseup' : 'MouseEvent',
        'mouseenter' : 'MouseEvent',
        'mouseleave' : 'MouseEvent',
        'mouseover' : 'MouseEvent',
        'mouseout' : 'MouseEvent',
        'mousemove' : 'MouseEvent',
        'contextmenu' : 'MouseEvent',
        // --- KeyboardEvent
        'keydown' : 'KeyboardEvent',
        'keyup' : 'KeyboardEvent',
        'keypress' : 'KeyboardEvent',
        // --- DragEvent
        'drag' : 'DragEvent',
        'drop' : 'DragEvent',
        'dragstart' : 'DragEvent',
        'dragend' : 'DragEvent',
        'dragenter' : 'DragEvent',
        'dragleave' : 'DragEvent',
        'dragover' : 'DragEvent',
        // --- TouchEvent
        'touchstart' : 'TouchEvent',
        'touchend' : 'TouchEvent',
        'touchcancel' : 'TouchEvent',
        'touchmove' : 'TouchEvent'
    };

    // public methods

    public static analyzeTag( name : string ) : string
    {
        let type = this.types[ name ];

        if( type )
            return type;

        return 'HTMLElement'; // Element ?
    }

    public static analyzeEvent( name : string ) : string
    {
        let event = this.events[ name ];

        if( event )
            return event;

        return 'Event';
    }
}
