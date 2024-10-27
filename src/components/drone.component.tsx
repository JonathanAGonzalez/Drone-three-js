import { Material, Mesh } from 'three';
import { useGLTF } from '@react-three/drei';
import drone from '../model/drone.glb';

interface GLTFResult {
  nodes: {
    Object_2: Mesh;
    Object_3: Mesh;
  };
  materials: {
    'Scene_-_Root': Material;
  };
}

export const Drone = () => {
  const { nodes, materials } = useGLTF(drone) as unknown as GLTFResult;

  return (
    <group dispose={null}>
      <group rotation={[0, -0.411, 0]} scale={0.001}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials['Scene_-_Root']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials['Scene_-_Root']}
        />
      </group>
    </group>
  );
};
