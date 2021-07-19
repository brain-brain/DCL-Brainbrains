
const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(-16, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const floorGlassSmall36 = new Entity('floorGlassSmall36')
engine.addEntity(floorGlassSmall36)
floorGlassSmall36.setParent(_scene)
const gltfShape = new GLTFShape("models/GlassFloor_Small.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
floorGlassSmall36.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(32, 0, 0),
  rotation: new Quaternion(0, 0.7071068286895752, 0, 0.7071068286895752),
  scale: new Vector3(8, 16.75, 1.25)
})
floorGlassSmall36.addComponentOrReplace(transform2)

const glossyAethereaTiles = new Entity('glossyAethereaTiles')
engine.addEntity(glossyAethereaTiles)
glossyAethereaTiles.setParent(_scene)
const gltfShape2 = new GLTFShape("models/CityTile.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
glossyAethereaTiles.addComponentOrReplace(gltfShape2)
const transform3 = new Transform({
  position: new Vector3(16, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1.998, 1, 1)
})
glossyAethereaTiles.addComponentOrReplace(transform3)

const glossyAethereaTiles2 = new Entity('glossyAethereaTiles2')
engine.addEntity(glossyAethereaTiles2)
glossyAethereaTiles2.setParent(_scene)
glossyAethereaTiles2.addComponentOrReplace(gltfShape2)
const transform4 = new Transform({
  position: new Vector3(39.99, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
glossyAethereaTiles2.addComponentOrReplace(transform4)

const floorGlass3 = new Entity('floorGlass3')
engine.addEntity(floorGlass3)
floorGlass3.setParent(_scene)
const gltfShape3 = new GLTFShape("models/GlassFloor.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
floorGlass3.addComponentOrReplace(gltfShape3)
const transform6 = new Transform({
  position: new Vector3(48, 0, 16),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(3.999999761581421, 42, 3.9493203163146973)
})
floorGlass3.addComponentOrReplace(transform6)

const brainbrainSMusic = new Entity('brainbrainSMusic')
engine.addEntity(brainbrainSMusic)
brainbrainSMusic.setParent(_scene)
const transform7 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0.7071068286895752, 0, 0.7071068286895752),
  scale: new Vector3(1, 1, 1)
})

import { Building } from "./building";

let debug = false;

// Add root scene
const scene = new Entity();
scene.addComponent(
  new Transform({
    position: new Vector3(8, 0.05, 8),
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
