import { Building } from "./building";

let debug = false;

// Add root scene
const scene = new Entity();
scene.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    rotation: Quaternion.Euler(0, -180, 0),
    scale: new Vector3(1, 1, 1),
  })
);

engine.addEntity(scene);

// Add building
let building: Building = new Building(
  {
    position: new Vector3(0, -0.18, 0),
    rotation: Quaternion.Euler(0, 270, 0),
    scale: new Vector3(1, 1, 1),
  },
  new GLTFShape("models/Guitar Building IX.glb"),
  scene,
  debug
);
