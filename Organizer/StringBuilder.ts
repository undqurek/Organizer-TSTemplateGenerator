/**
 * Created by qurek on 28.06.2016.
 */
export class StringBuilder
{
    // variables

    private buffer : string = '';

    // constructors

    public constructor( private prefix : string = '' )
    {
        // nothing here ...
    }

    // public methods

    public appendText( text : string ) : void
    {
        this.buffer += this.prefix + text;
    }

    public appendLine( line ? : string ) : void
    {
        this.buffer += ( line ? this.prefix + line + '\n' : '\n' );
    }

    public toString() : string
    {
        return this.buffer;
    }
}
