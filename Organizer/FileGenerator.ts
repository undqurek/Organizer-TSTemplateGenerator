
let Storage = require( 'fs' );

import { Map, RootPattern, LoopPattern, ControllerPattern, LocalPattern, Variable, TemplatePattern } from "./Common";
import { PathUtils } from './PathUtils';
import { StringBuilder } from './StringBuilder';
import { ClassBuilder } from "./ClassBuilder";
import { TemplatesBuilder } from "./TemplateBuilder";
import { Analyzer } from "./Analyzer";
import { Selector } from './Selector';
import { TemplateParser } from './TemplateParser';
import { TemplateWatcher } from './TemplateWatcher';

/**
 * Created by qurek on 25.06.2016.
 */
export class FileGenerator
{
    // variables

    private HEADER_REGEX : RegExp = /^namespace ((?:[_A-Z][_0-9a-z]*)+(?:\.(?:[_A-Z][_0-9a-z]*)+)*)(?:\r?\n)+reference ([^\r\n]+)\r?\n/m;
    private COMMENT_REGEX : RegExp = /<!--(?:.|\r|\n)*?-->/g;

    private watcher : TemplateWatcher;
    private progressing : boolean = false;

    // constructors

    public constructor()
    {
        this.watcher = new TemplateWatcher( ( error : NodeJS.ErrnoException, filePath ? : string, fileText ? : string ) : void =>
        {
            if ( filePath && fileText )
            {
                let matches = fileText.match( this.HEADER_REGEX );

                let directory = PathUtils.extractDirectory( filePath );
                let classname = PathUtils.extractBasename( filePath );

                if( matches && matches.length > 1 )
                {
                    let header = matches[ 0 ];

                    let template = this.releaseTemplate( header.length, fileText );

                    let parser = new TemplateParser( ( error : string, root ? : RootPattern ) : void =>
                    {
                        let namespace =  matches[ 1 ];
                        let reference =  matches[ 2 ];

                        let builder = new StringBuilder( '' );

                        builder.appendLine( '/// <reference path="' + reference + '" />' );
                        builder.appendLine();
                        builder.appendLine( '// ---------------------------------------------------' );
                        builder.appendLine( '// AUTOMATICALLY GENERATED SOURCE CODE' );
                        builder.appendLine( '// ---------------------------------------------------' );
                        builder.appendLine();
                        builder.appendLine( 'namespace ' + namespace );
                        builder.appendLine( '{' );
                        builder.appendLine( '\timport Controller = Core.Organizer.Controller;' );
                        builder.appendLine();
                        builder.appendText( this.constructControllers( '\t', root.controllers ) );
                        builder.appendText( this.constructTemplate( classname, '\t', template ) );
                        builder.appendLine( '}' );

                        let options : Map<any> = {
                            encoding : 'utf8'
                        };

                        Storage.writeFile( directory + classname + 'Template.ts', builder.toString(), options, e => null );
                    } );

                    parser.parse( template );
                }
                else
                    console.log( 'Incorrect template format (missing namespace or reference) in file ' + directory + classname + 'Template.ts.' );
            }
        } );
    }

    // helper methods

    private releaseTemplate( offset : number, text : string ) : string
    {
        let body = text.substring( offset );

        return body.replace( this.COMMENT_REGEX, '' );
    }

    private constructTemplate( classname : string, prefix : string, template : string ) : string
    {
        let builder = new TemplatesBuilder( classname );

        return builder.build( prefix, template );
    }

    private constructHandle( element : any ) : Variable
    {
        return new Variable( 'handle', element.name );
    }

    private constructClass( prefix : string, handle : any, name : string ) : string
    {
        let attributes = Selector.selectAttributes( handle );

        {
            let builder = new ClassBuilder( name );

            builder.addVariable( this.constructHandle( handle ) );

            for( let entry of attributes.handles )
                builder.addVariable( entry );

            for( let entry of attributes.events )
                builder.addMethod( entry );

            return builder.toString( prefix );
        }
    }

    private constructScope( prefix : string, pattern : LocalPattern, name : string ) : string
    {
        let builder = new StringBuilder( '' );

        builder.appendText( this.constructControllers( prefix, pattern.controllers ) );
        builder.appendText( this.constructLoops( prefix, pattern.loops ) );
        builder.appendLine( this.constructClass( prefix, pattern.handle, name ) );

        return builder.toString();
    }

    private constructController( prefix : string, controller : ControllerPattern ) : string
    {
        return this.constructScope( prefix, controller, controller.type );
    }

    private constructControllers( prefix : string, controllers : Map<ControllerPattern> ) : string
    {
        let builder = new StringBuilder( '' );

        for( let name in controllers )
            builder.appendLine( this.constructController( prefix, controllers[ name ] ) );

        return builder.toString();
    }

    private constructLoop( prefix : string, loop : LoopPattern ) : string
    {
        let logic = loop.logic;

        if( logic == null )
            return '';

        return this.constructScope( prefix, loop, logic );
    }

    private constructLoops( prefix : string, loops : Map<LoopPattern> ) : string
    {
        let builder = new StringBuilder( '' );

        for( let name in loops )
            builder.appendLine( this.constructLoop( prefix, loops[ name ] ) );

        return builder.toString();
    }

    public generate( filePath : string ) : void
    {
        if( this.progressing )
            return;

        this.progressing = true;

        //TODO:

        // FileSystem.readFile( filePath, 'utf8', ( error : NodeJS.ErrnoException, data: Buffer ) =>
        // {
        //     if ( data )
        //     {
        //         let fileText = data.toString();
        //         let matches = fileText.match( this.NAMESPACE_REGEX );
        //
        //         if( matches.length > 1 )
        //         {
        //             directory = PathUtils.extractDirectory( filePath );
        //             className = this.extractName( filePath );
        //
        //             namespace =  matches[ 1 ];
        //             template =  fileText.substr( namespace.length + 10 );
        //
        //             this.parser.parseFrame( template );
        //         }
        //         else
        //             console.log( 'Incorrect template format (checkSession namespace).' );
        //     }
        // } );
    }

    public start( dirPath : string ) : void
    {
        this.watcher.start( dirPath );
    }

    public stop() : void
    {
        this.watcher.stop();
    }
}

