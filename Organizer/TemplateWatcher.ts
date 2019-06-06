
let Storage = require( 'fs' );

import { Map, IWatcherCallback } from './Common';
import { TimeUtils } from "./TimeUtils";
import { FileWatcher } from './FileWatcher';


/**
 * Created by qurek on 25.06.2016.
 */
export class TemplateWatcher
{
    // variables

    private watcher : FileWatcher;

    // constructors

    public constructor( private callback : IWatcherCallback )
    {
        let regex = /\.template\.html?$/;

        this.watcher = new FileWatcher( regex, ( path : string ) : void =>
        {
            let time = TimeUtils.getTime();

            let options : Map<any> = {
                encoding : 'utf8'
            };

            Storage.readFile( path, options, ( error : NodeJS.ErrnoException, data : Buffer ) =>
            {
                try
                {
                    if ( data )
                        this.callback( null, path, data.toString() );

                    else
                        this.callback( error, null, null );

                    console.log( time + ' ' + path );
                }
                catch ( e )
                {
                    console.log( 'ERROR!!! ' + time + ' ' + path + ' -> ' + e.message );
                }
            } );
        } );
    }

    // public methods

    public start( dirPath : string ) : void
    {
        this.watcher.start( dirPath );
    }

    public stop() : void
    {
        this.watcher.stop();
    }
}
