import {
  SkinnedMesh,
  Bone,
  Object3D,
  MeshStandardMaterial,
  Texture,
  Group,
  TextureLoader,
  Color,
} from 'three';
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import drone from '../model/dronev2.glb';
import { useFrame } from '@react-three/fiber';
import { useCustomizer } from '../store/customizer.store';

type GLTFResult = GLTF & {
  nodes: {
    Object_50: SkinnedMesh;
    GLTF_created_0_rootJoint: Bone;
    propeller_back_anim_joint13_13: Object3D;
    propeller_left_anim_joint7_7: Object3D;
    propeller_right_anim_joint10_10: Object3D;
  };
  materials: {
    material_0: MeshStandardMaterial;
  };
};

type TextureMap = { [key: string]: Texture };

const floatAmplitude = 0.1;
const floatSpeed = 2;
const floatHeight = 0.1;

export function DroneV2() {
  const group = useRef<Group>(null);
  const { nodes, materials } = useGLTF(drone) as GLTFResult;
  const texture = useCustomizer((store) => store.selectedTexture);
  const selectedColor = useCustomizer((store) => store.selectedColor);

  const textureLoader = new TextureLoader();
  const textures: TextureMap = {};

  //Propellers
  const propeller13 = nodes['propeller_back_anim_joint13_13'];
  const propeller7 = nodes['propeller_left_anim_joint7_7'];
  const propeller10 = nodes['propeller_right_anim_joint10_10'];

  const loadTexture = (url: string): Texture => {
    if (!textures[url]) {
      textures[url] = textureLoader.load(url);
    }
    return textures[url];
  };

  const textureMap = loadTexture(texture || '/textures/material_0_normal.png');

  useEffect(() => {
    if (!textureMap) return;

    if (group.current) {
      group.current.position.y = floatHeight;
    }

    materials.material_0.map = textureMap;
    materials.material_0.needsUpdate = true;
  }, [textureMap, materials]);

  const targetColor = useRef(new Color(selectedColor));
  const currentColor = useRef(new Color(materials.material_0.color.getHex()));

  useEffect(() => {
    // Update the target color
    targetColor.current.set(selectedColor);
  }, [selectedColor]);

  useFrame(() => {
    if (group.current) {
      // Rotation propellers
      if (propeller13 && propeller7 && propeller10) {
        propeller13.rotation.y += 0.2;
        propeller7.rotation.y += 0.2;
        propeller10.rotation.y += 0.2;
      }

      // Floating effect
      const time = Date.now() * 0.0006;
      const floatOffset = Math.sin(time * floatSpeed) * floatAmplitude;
      group.current.position.y = floatHeight + floatOffset;

      // Interpolate the current color to the target color
      currentColor.current.lerp(targetColor.current, 0.1);
      materials.material_0.color.set(currentColor.current);
    }
  });

  return (
    <group ref={group} dispose={null}>
      <group name='Sketchfab_Scene'>
        <group
          name='Sketchfab_model'
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.4099}
        >
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='RootNode0_0' scale={0.01}>
                <group name='skeletal1_1'>
                  <group name='GLTF_created_0'>
                    <primitive object={nodes.GLTF_created_0_rootJoint} />
                    <skinnedMesh
                      name='Object_50'
                      geometry={nodes.Object_50.geometry}
                      material={materials.material_0}
                      skeleton={nodes.Object_50.skeleton}
                    />
                    <group name='drone44_44_correction'>
                      <group name='drone44_44' />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(drone);
