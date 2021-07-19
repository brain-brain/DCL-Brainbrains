export class Platform extends Entity{

    transform: Transform;
    shape: GLTFShape | PlaneShape;
    parent: Entity;

    constructor(transformConstructorArgs: TransformConstructorArgs, shape: GLTFShape, parent: Entity){
        super();
        this.transform = new Transform(transformConstructorArgs);
        this.shape = shape;
        this.parent = parent;

        this.addComponent(this.transform);

        this.shape.withCollisions = true
        this.shape.isPointerBlocker = true
        this.shape.visible = true

        this.addComponent(this.shape);

        engine.addEntity(this);
        this.setParent(this.parent);
        
    }
}