/**
 * Created by qurek on 28.06.2016.
 */

export type Map<V> = { [ key : string ] : V };

export class SuperPattern
{
    public loops : Map<LoopPattern> = { };
    public controllers : Map<ControllerPattern> = { };

    constructor( public handle : any ) { }
}

export class RootPattern extends SuperPattern
{
    public templates : Map<TemplatePattern> = { };

    constructor( handle : any )
    {
        super( handle );
    }
}

export class LocalPattern extends SuperPattern
{
    constructor( public parent : RootPattern, handle : any )
    {
        super( handle );
    }
}

export class TemplatePattern extends SuperPattern
{
    constructor( handle : any )
    {
        super( handle );
    }
}

export class LoopPattern extends LocalPattern
{
    constructor( parent : RootPattern, handle : any, public methods : Array<Method>, public logic : string )
    {
        super( parent, handle );
    }
}

export class ControllerPattern extends LocalPattern
{
    constructor( parent : RootPattern, handle : any, public type : string )
    {
        super( parent, handle );
    }
}

export class Variable
{
    constructor( public name : string, public type : string ) { }
}

export class Method
{
    constructor( public name : string, public parameters : Array<string> ) { }
}

export class Parameter
{
    constructor( public name : string, public methods : Array<Method> ) { }
}

export class Event
{
    public constructor( public name : string, public method : string ) { }
}

export class Binding
{
    public constructor( public handles : Array<Variable>, public events : Array<Event> ) { }
}

export interface IFileCallback
{
    ( filePath : string ) : void
}

export interface IWatcherCallback
{
    ( error : NodeJS.ErrnoException, filePath ? : string, fileText ? : string ) : void
}

export interface IParserCallback
{
    ( error : string, root ? : RootPattern ) : void
}
