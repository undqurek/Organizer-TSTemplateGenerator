
import { StringBuilder } from './StringBuilder';


/**
 * Created by qurek on 25.06.2016.
 */
export class TemplatesBuilder
{
    // constants

    private static readonly QUOTE_REGEX : RegExp = /`/g;
    private static readonly NEWLINE_REGEX : RegExp = /\r?\n/g;

    // constructors

    public constructor( private className : string )
    {
        // nothing here ...
    }

    // public methods

    public build( prefix : string, template : string ) : string
    {
        let builder = new StringBuilder( prefix );

        builder.appendLine( 'export class ' + this.className + 'Template' );
        builder.appendLine( '{' );
        builder.appendLine( '\tpublic static readonly TEMPLATE : string = `' );

        let text = template.replace( TemplatesBuilder.QUOTE_REGEX, '\\`' );
        let parts = text.split( TemplatesBuilder.NEWLINE_REGEX );

        for( let entry of parts )
            builder.appendLine( '\t\t' + entry );

        builder.appendLine( '\t`;' );
        builder.appendLine( '}' );

        return builder.toString();
    }
}
