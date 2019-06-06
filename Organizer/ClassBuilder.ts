
import { Variable, Event } from './Common';
import { Analyzer } from "./Analyzer";
import { StringBuilder } from './StringBuilder';


/**
 * Created by qurek on 25.06.2016.
 */
export class ClassBuilder
{
    // variables

    private code : string = null;

    private variables : Array<Variable> = [ ];
    private methods : Array<Event> = [ ];

    // constructors

    public constructor( private name : string )
    {
        // nothing here ...
    }

    // public methods

    public addVariable( variable : Variable ) : void
    {
        this.code = null;
        
        this.variables.push( variable );
    }

    public addMethod( event : Event ) : void
    {
        this.code = null;
        
        this.methods.push( event );
    }

    public toString( prefix : string ) : string
    {
        if( this.code == null )
        {
            let builder = new StringBuilder( prefix );

            builder.appendLine( 'export abstract class Super' + this.name + 'Controller<T> extends Controller<T>' );
            builder.appendLine( '{' );

            let variables = new Map<string, string>();
            let methods = new Map<string, string>();

            if( this.variables.length > 0 )
            {
                builder.appendLine();

                for( let entry of this.variables )
                {
                    if( variables.has( entry.name ) )
                        throw new Error( 'Variable name \'' + entry.name + '\' is duplicated.' );

                    variables.set( entry.name, Analyzer.analyzeTag( entry.type ) );
                }

                for( let entry of variables )
                    builder.appendLine( '\tprotected readonly ' + entry[ 0 ] + ' : ' + entry[ 1 ] + ';' );
            }

            if( this.methods.length > 0 )
            {
                builder.appendLine();

                for( let entry of this.methods )
                {
                    if( variables.has( entry.method ) )
                        throw new Error( 'Method name \'' + entry.method + '\' is used by variable.' );

                    let type = methods.get( entry.method );

                    methods.set( entry.method, ( type ? type + ' | ' : '' ) + Analyzer.analyzeEvent( entry.name ) );
                }

                for( let entry of methods )
                    builder.appendLine( '\tprotected abstract ' + entry[ 0 ] + '( e : ' + entry[ 1 ] + ' ) : void;' );
            }

            builder.appendLine( '}' );

            this.code = builder.toString();
        }

        return this.code;
    }
}
