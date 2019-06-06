
import { RootPattern, TemplatePattern, ControllerPattern, LoopPattern } from './Common';
import { Interpolator } from './Interpolator';


/**
 * Created by qurek on 25.06.2016.
 */
export class Decompositor
{
    // helper methods

    private static findMaster( root : any, scopes : any ) : any
    {
        if( root == scopes[ 0 ] )
            return null;

        return root;
    }

    private static findParent( element : any, root : any ) : any
    {
        while( true )
        {
            let parent = element.parent;

            if( parent == null )
                return root;

            if( parent.$scope )
                return parent.$scope;

            element = parent;
        }
    }

    private static collectScope( scope : any, root : any ) : void
    {
        let attributes = scope.attribs;

        let template = attributes[ 'var-template' ];
        let loop = attributes[ 'var-repeat' ];
        let controller = attributes[ 'var-controller' ];

        if( template )
        {
            if( loop )
                throw new Error( 'Template cannot be simultaneously a loop (error inside template name "' + template + '"). ' );

            if( controller )
                throw new Error( 'Template cannot be simultaneously a controller (error inside template name "' + template + '"). ' );

            let name = Interpolator.extractName( template );

            if( name in root.templates )
                throw new Error( 'Template name "' + name + '" is duplicated.' );

            root.templates[ name ] = scope.$scope = new TemplatePattern( scope );
        }
        else
        {
            let parent = this.findParent( scope, root );

            if( loop )
            {
                let parameter = Interpolator.parseParameter( loop );

                if( controller == null )
                    throw new Error( 'Loop "' + parameter.name + '" has no controller.' );

                if( parameter.name in parent.loops )
                    throw new Error( 'Loop name "' + parameter.name + '" is duplicated inside scope.' );

                let logic = Interpolator.extractName( controller );

                parent.loops[ parameter.name ] = scope.$scope = new LoopPattern( parent, scope, parameter.methods, logic );

                return;
            }

            if( controller )
            {
                let variable = Interpolator.parseVariable( controller );

                if( variable.name in parent.controllers )
                    throw new Error( 'Controller name "' + variable.name + '" is duplicated inside scope.' );

                parent.controllers[ variable.name ] = scope.$scope = new ControllerPattern( parent, scope, variable.type );

                return;
            }
        }
    }

    private static releaseScope( element : any ) : void
    {
        let parent = element.parent;

        if( parent )
        {
            element.parent = null;

            let elements = parent.children;
            let index = elements.indexOf( element );

            if( index > -1 )
                elements.splice( index, 1 );
        }

        delete element.$scope;
    }

    // public methods

    public static decomposeModel( root : any, scopes : any ) : RootPattern
    {
        let master = this.findMaster( root, scopes );
        let pattern = new RootPattern( master );

        for( let entry of scopes )
            this.collectScope( entry, pattern );

        for( let entry of scopes )
            this.releaseScope( entry );

        return pattern;
    }
}
