
const { Parser, DomHandler } = require( 'htmlparser2' );

import { Selector } from './Selector';
import { Decompositor } from './Decompositor';
import { IParserCallback } from './Common';


/**
 * Created by qurek on 25.06.2016.
 */
export class TemplateParser
{
    // variables

    private parser : any;

    // constructors

    public constructor( callback : IParserCallback )
    {
        this.parser = new Parser( new DomHandler( ( error : string, children ? : any ) : void =>
        {
            if( children )
            {
                let root = Selector.selectElement( children );
                let scopes = Selector.selectScopes( root );

                let pattern = Decompositor.decomposeModel( root, scopes );

                callback( null, pattern );
            }
            else
                callback( error, null );
        } ) );
    }

    // public methods

    public parse( html : string ) : void
    {
        this.parser.write( html );
        this.parser.end();
    }
}
