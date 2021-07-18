import * as utils from "@dcl/ecs-scene-utils";
import { Platform } from "./platform";

export class Elevator extends Entity {
  transform: Transform;

  floors: number[];
  currentFloor: number;
  platform: Platform;
  parent: Entity;

  velocity: number = 3;

  canvas: UICanvas;
  buttonUp: UIImage;
  buttonDown: UIImage;
  inventoryContainer: UIContainerStack;

  constructor(
    transformConstructorArgs: TransformConstructorArgs,
    floors: number[],
    currentFloor: number,
    parent: Entity
  ) {
    super();
    this.transform = new Transform(transformConstructorArgs);
    this.floors = floors;
    this.currentFloor = currentFloor;
    this.parent = parent;

    this.addComponent(this.transform);

    this.platform = new Platform(
      {
        position: new Vector3(0, 0.35, 0),
        rotation: Quaternion.Euler(0, 0, 0),
        scale: new Vector3(1.02, 1, 0.98),
      },
      new GLTFShape("models/Platform.glb"),
      this
    );

    let elevatorControlTriggerArea: Entity = new Entity();
    elevatorControlTriggerArea.addComponent(
      new Transform({
        position: new Vector3(0, 1.3526, 0),
        rotation: Quaternion.Euler(0, 0, 0),
      })
    );

    engine.addEntity(elevatorControlTriggerArea);
    elevatorControlTriggerArea.setParent(this.platform);

    elevatorControlTriggerArea.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(new Vector3(4, 2, 4), Vector3.Zero()),
        {
          onCameraEnter: () => {
            this.showControls();
            log("trigger on");
          },
          onCameraExit: () => {
            this.hideControls();
            log("trigger off");
          },
        }
      )
    );

    // Generate buttons to call elevator in each floor
    floors.forEach((floorHeight, floorIndex) => {
      // Declare cube black
      const cube = new Entity();
      // Declare circle button
      const circle = new Entity();

      // Add materials
      const myMaterial = new Material();
      const myMaterial2 = new Material();

      // Add a transform to the Cube
      cube.addComponent(
        new Transform({
          position: new Vector3(2.5, floorHeight + 2, 1.4),
          scale: new Vector3(0.4, 0.4, 0.2),
        })
      );
      // Add a transform to the Circle
      circle.addComponent(
        new Transform({
          position: new Vector3(0, 0, -0.5),
          scale: new Vector3(0.35, 0.35, 0.35),
        })
      );

      // Add shapes to the entities
      cube.addComponent(new BoxShape());
      circle.addComponent(new SphereShape());

      // Add material to cube. No brilliant
      myMaterial.albedoColor = Color3.Black();
      myMaterial.metallic = 0.1;
      myMaterial.roughness = 0.9;

      // Add material to cube. Metallic brilliant
      myMaterial2.albedoColor = Color3.Teal();
      myMaterial2.metallic = 0.9;
      myMaterial2.roughness = 0.1;

      // Add to parent
      cube.addComponent(myMaterial);
      circle.addComponent(myMaterial2);
      circle.setParent(cube);

      // Add top text
      const callElevator = new Entity();
      // Place the text above the button
      callElevator.addComponent(
        new Transform({
          position: new Vector3(0, 1, 0),
        })
      );
      // Write text
      const callText = new TextShape("Call elevator");
      // Tiny text
      callText.fontSize = 4;
      // Text color black
      callText.color = Color3.Black();
      callElevator.addComponent(callText);

      // Go to floor on click circle button
      circle.addComponent(
        new OnClick(() => {
          // Go to floor
          this.gotoFloor(floorIndex);

          // Update current floor
          this.currentFloor = floorIndex;
        })
      );

      // Show text
      callElevator.setParent(cube);
      // Add button to parent
      cube.setParent(this);
    });

    this.setParent(this.parent);

    this.canvas = new UICanvas();
    this.hideControls();

    this.buttonUp = new UIImage(this.canvas, new Texture("materials/up.png"));
    this.buttonUp.width = "100px";
    this.buttonUp.height = "100px";
    this.buttonUp.hAlign = "right";
    this.buttonUp.positionX = 0;
    this.buttonUp.positionY = 100;
    this.buttonUp.sourceWidth = 100;
    this.buttonUp.sourceHeight = 100;

    if (this.onTopFloor()) this.hideButton(this.buttonUp);
    else this.showButton(this.buttonUp);

    this.buttonUp.onClick = new OnClick(() => {
      if (!this.onTopFloor()) {
        this.gotoFloor(this.currentFloor + 1);
        // this.showButton(this.buttonDown);
        // if (this.onTopFloor()) {
        //   this.hideButton(this.buttonUp);
        // }
      }
    });

    this.buttonDown = new UIImage(
      this.canvas,
      new Texture("materials/down.png")
    );
    this.buttonDown.width = "100px";
    this.buttonDown.height = "100px";
    this.buttonDown.hAlign = "right";
    this.buttonDown.positionX = 0;
    this.buttonDown.positionY = 0;
    this.buttonDown.sourceWidth = 100;
    this.buttonDown.sourceHeight = 100;

    if (this.onGroudFloor()) this.hideButton(this.buttonDown);
    else this.showButton(this.buttonDown);

    this.buttonDown.onClick = new OnClick(() => {
      if (!this.onGroudFloor()) {
        this.gotoFloor(this.currentFloor - 1);
        this.showButton(this.buttonUp);
        // if (this.onGroudFloor()) {
        //   this.hideButton(this.buttonDown);
        // }
      }
    });
  }

  gotoFloor(floor: number) {
    if (this.currentFloor === floor) {
      return;
    }

    //Define start and end positions
    let StartPos = new Vector3(0, this.floors[this.currentFloor], 0);
    let EndPos = new Vector3(0, this.floors[floor], 0);
    let duration =
      Math.abs(this.floors[this.currentFloor] - this.floors[floor]) /
      this.velocity;

    // Move entity
    this.platform.addComponent(
      new utils.MoveTransformComponent(
        StartPos,
        EndPos,
        duration,
        null,
        utils.InterpolationType.EASEQUAD
      )
    );

    this.currentFloor = floor;

    if (this.onGroudFloor()) {
      this.showButton(this.buttonUp);
      this.hideButton(this.buttonDown);
    } else if (this.onTopFloor()) {
      this.hideButton(this.buttonUp);
      this.showButton(this.buttonDown);
    } else {
      this.showButton(this.buttonUp);
      this.showButton(this.buttonDown);
    }
  }

  showControls() {
    this.canvas.visible = true;
    this.canvas.isPointerBlocker = true;
  }

  hideControls() {
    this.canvas.visible = false;
    this.canvas.isPointerBlocker = false;
  }

  onTopFloor(): boolean {
    return this.currentFloor == this.floors.length - 1;
  }

  onGroudFloor(): boolean {
    return this.currentFloor == 0;
  }

  showButton(button: UIImage) {
    button.visible = true;
    button.isPointerBlocker = true;
  }

  hideButton(button: UIImage) {
    button.visible = false;
    button.isPointerBlocker = false;
  }
}
