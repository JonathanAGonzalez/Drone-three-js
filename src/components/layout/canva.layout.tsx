import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, OrbitControls } from '@react-three/drei';
import { PerspectiveCamera } from 'three';

import { useCustomizer } from '../../store/customizer.store';
import { CameraRig } from '../camera-rig.component';

const CustomCamera = () => {
  const isCustomizer = useCustomizer((store) => store.isCustomizer);
  const fov = isCustomizer ? 20 : 30;

  useFrame((state) => {
    const { camera } = state;
    if (camera instanceof PerspectiveCamera) {
      camera.fov = fov;
    }
    camera.updateProjectionMatrix();
  });

  return null;
};

export const CanvasLayout = ({ children }: { children: React.ReactNode }) => {
  const rootElement = document.getElementById('root') || undefined;
  const isCustomizer = useCustomizer((store) => store.isCustomizer);

  return (
    <Canvas
      eventSource={rootElement}
      eventPrefix='client'
      className={isCustomizer ? 'top-[220px] md:top-[0px]' : ''}
      shadows
      camera={{
        position: [3, 1, 5],
        fov: 50, // Fov predeterminated
      }}
    >
      <CustomCamera />
      <Environment preset='city' />
      <ambientLight intensity={2} />
      <CameraRig>
        <Center>{children}</Center>
      </CameraRig>
      {isCustomizer && (
        <OrbitControls
          maxDistance={5}
          minZoom={1}
          maxZoom={6}
          minDistance={4}
          enablePan={false}
        />
      )}
    </Canvas>
  );
};
