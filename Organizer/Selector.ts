
import { Map, Variable, Event, Binding } from "./Common";
import { Interpolator } from "./Interpolator";


/**
 * Created by qurek on 25.06.2016.
 */
export class Selector
{
    // public methods

    public static selectElement( elements : Array<any> ) : any
    {
        for( let entry of elements )
        {
            if( entry.type == 'tag' )
                return entry;
        }

        return null;
    }

    public static selectElements( element : any, callback : ( element : any ) => void ) : void
    {
        let collect = ( element : any ) : boolean =>
        {
            if( element.type == 'tag' || element.type == 'style' || element.type == 'script' )
            {
                callback( element );

                return true;
            }

            return false;
        };

        let analyze = ( element : any ) : void =>
        {
            if( collect( element ) )
            {
                let elements = element.children;

                for( let entry of elements )
                    analyze( entry );
            }
        };

        analyze( element );
    }

    public static selectScopes( element : any ) : Array<any>
    {
        let result = new Array<any>();

        this.selectElements( element, ( element : any ) : void =>
        {
            let attributes = element.attribs;

            if( 'var-controller' in attributes || 'var-repeat' in attributes )
                result.push( element );
        } );

        return result;
    }

    public static selectAttribute( attributes : Map<string>, name : string, callback : ( attribute : string ) => void )
    {
        if( name in attributes )
            callback( attributes[ name ] );
    }

    public static selectAttributes( element : any ) : Binding
    {
        let handles = new Array<Variable>();
        let events = new Array<Event>();

        this.selectElements( element, ( element : any ) : void =>
        {
            let attributes = element.attribs;

            this.selectAttribute( attributes, 'var-handle', ( attribute : string ) : void =>
            {
                handles.push( new Variable( attribute, element.name ) );
            } );

            this.selectAttribute( attributes, 'var-events', ( attribute : string ) : void =>
            {
                let parts = attribute.split( ',' );

                for( let entry of parts )
                    events.push( Interpolator.parseEvent( entry ) );
            } );
        } );

        return new Binding( handles, events );
    }
}
