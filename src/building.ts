import { Elevator } from "./elevator/elevator";

export class Building extends Entity {
  transform!: Transform;
  parent!: Entity;
  shape!: GLTFShape;
  debug: boolean;

  elevator!: Elevator;

  constructor(
    transformConstructorArgs: TransformConstructorArgs,
    shape: GLTFShape,
    parent: Entity,
    debug: boolean
  ) {
    super();
    this.transform = new Transform(transformConstructorArgs);
    this.shape = shape;
    this.parent = parent;
    this.debug = debug;

    this.addComponent(this.transform);

    this.shape.withCollisions = true;
    this.shape.isPointerBlocker = true;
    this.shape.visible = true;
    this.addComponent(this.shape);

    // Set the elevator coordinates
    this.elevator = new Elevator(
      {
        position: new Vector3(0.84, 0, -0.56),
      },
      [0.35, 13, 23.4],
      0,
      this
    );

    engine.addEntity(this);
    this.setParent(this.parent);
  }
}
