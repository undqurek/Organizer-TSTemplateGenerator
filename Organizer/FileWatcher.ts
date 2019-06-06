
let Watcher = require( 'chokidar' );

import { IFileCallback } from './Common';


/**
 * Created by qurek on 25.06.2016.
 */
export class FileWatcher
{
    // constants

    private static readonly SEPARATOR_REGEX : RegExp = /\\/g;

    // variables

    private watcher : any = null;

    // constructors

    public constructor( private regex : RegExp, private callback : IFileCallback )
    {
        // nothing here ...
    }

    // helper methods

    private apply( path : string ) : void
    {
        path = path.replace( FileWatcher.SEPARATOR_REGEX, '/' );

        if( this.regex.test( path ) )
            this.callback( path );
    }

    // public methods

    public start( dirPath : string ) : void
    {
        if( this.watcher )
            return;

        this.watcher = Watcher.watch( dirPath );

        this.watcher.on( 'add', path => this.apply( path ) );
        this.watcher.on( 'change', path => this.apply( path ) );
    }

    public stop() : void
    {
        if( this.watcher )
        {
            this.watcher.close();

            this.watcher = null;
        }
    }
}

