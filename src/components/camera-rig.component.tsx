import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useRef } from 'react';
import { Group } from 'three';

export const CameraRig = ({ children }: { children: React.ReactNode }) => {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    easing.dampE(
      group.current?.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};
