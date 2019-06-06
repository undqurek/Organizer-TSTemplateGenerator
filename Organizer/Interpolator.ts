
import { Method, Variable, Parameter, Event } from './Common';


/**
 * Created by qurek on 25.06.2016.
 */
export class Interpolator
{
    // constants

    private static readonly NAME_REGEX = /^\s*(\w+)\s*$/;
    private static readonly PATH_REGEX = /^\s*(\w+(?:\.\w+)*)\s*$/;
    private static readonly VARIABLE_REGEX = /\s*(\w+)\s+as\s+(\w+)\s*/;
    private static readonly PARAMETER_REGEX = /\s*(\w+)\s*:?\s*([^:]*)\s*/;
    private static readonly DECLARATION_REGEX = /\s*(\w+)(?:\(([^()]*)\))?\s*/;
    private static readonly EVENT_REGEX = /^\s*(\w+)\s*(?:\((.+)\))?\s*:\s*(\w+)\s*$/; // /^\s*(\w+)\s*:\s*(\w+)\s*$/;

    // public methods

    public static extractName( text : string ) : string
    {
        let matches = text.match( this.NAME_REGEX );

        if( matches == null )
            throw new Error( 'Incorrect parameter format (used: "' + text + '").' );

        return matches[ 1 ];
    }

    public static extractPath( text : string ) : string
    {
        let matches = text.match( this.PATH_REGEX );

        if( matches == null )
            throw new Error( 'Incorrect object path format (used: "' + text + '").' );

        return matches[ 1 ];
    }

    public static extractParameters( text : string ) : Array<string>
    {
        let parts = text.split( ',' );

        {
            let result = new Array<string>();

            for( let entry of parts )
                result.push( this.extractPath( entry ) );

            return result;
        }
    }

    public static extractMethods( text : string ) : Array<Method>
    {
        let parts = text.split( '|' );

        {
            let result = new Array<Method>();

            for( let entry of parts )
            {
                let matches = entry.match( this.DECLARATION_REGEX );

                if( matches == null )
                    throw new Error( 'Incorrect function format (used: "' + text + '").' );

                let content = matches[ 2 ];
                let parameters = content ? this.extractParameters( content ) : new Array<string>();

                result.push( new Method( content, parameters ) );
            }

            return result;
        }
    }

    public static parseVariable( text : string ) : Variable
    {
        let matches = text.match( this.VARIABLE_REGEX ); // Controller as variable

        if( matches == null )
            throw new Error( 'Incorrect controller attribute format (used: "' + text + '").' );

        return new Variable( matches[ 2 ], matches[ 1 ] );
    }

    public static parseParameter( text : string ) : Parameter
    {
        let matches = text.match( this.PARAMETER_REGEX ); // items:object(id)|array

        if( matches == null )
            throw new Error( 'Incorrect var-repeat attribute format (used: "' + text + '").' );

        let content = matches[ 2 ];
        let methods = content ? this.extractMethods( content ) : new Array<Method>();

        return new Parameter( matches[ 1 ], methods );
    }

    public static parseEvent( part : string ) : Event
    {
        let matches = part.match( this.EVENT_REGEX );

        if( matches == null )
            throw new Error( 'Incorrect var-events attribute format (used: "' + part + '").' );

        return new Event( matches[ 1 ], matches[ 3 ] );
    }
}
