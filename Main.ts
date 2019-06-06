/// <reference path="node.d.ts" />


import { FileGenerator } from './Organizer/FileGenerator';


let args = process.argv;

let mode = args[ 2 ];
let path = args[ 3 ];

let generator = new FileGenerator();

switch( mode )
{
    default:
    case 'watcher':

        generator.start( ( path || '.' ) + '/' );

        break;

    case 'file':

        if( path == null )
            throw new Error( 'File path is required for file mode.' );

        generator.generate( path );

        break;
}
