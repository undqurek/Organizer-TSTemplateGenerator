
/**
 * Created by qurek on 27.06.2016.
 */
export class PathUtils
{
    // public methods

    public static extractDirectory( path : string ) : string
    {
        let index = path.lastIndexOf( '/' );

        if( index > -1 )
            return path.substring( 0, index ) + '/';

        return '';
    }

    public static extractFilename( path : string ) : string
    {
        let index = path.lastIndexOf( '/' );

        if( index > -1 )
            return path.substring( index + 1 );

        return path;
    }

    public static extractBasename( path : string ) : string
    {
        let name = this.extractFilename( path );

        if( name.length > 0 )
        {
            let index = name.indexOf( '.' );

            if( index > -1 )
                return name.substring( 0, index );
        }

        return '';
    }

    public static normalizeName( name : string ) : string
    {
        if( name.length > 0 )
            return name[ 0 ].toUpperCase() + name.substr( 1 );

        return '';
    }
}