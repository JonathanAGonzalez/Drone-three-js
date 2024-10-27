import { create } from 'zustand';

type State = {
  isCustomizer: boolean;
  selectedColor: string;
  selectedTexture: string;
  handleColorClick: (color: string) => void;
  handleTextureChange: (texture: string) => void;
};

type Action = {
  isCustomizer: boolean;
  selectedColor: string;
  selectedTexture: string;
  handleCustomizer: () => void;
  handleColorClick: (color: string) => void;
  handleTextureChange: (texture: string) => void;
};

export const useCustomizer = create<State & Action>((set) => ({
  isCustomizer: false,
  selectedColor: '',
  selectedTexture: '',
  handleCustomizer: () =>
    set((store) => ({ isCustomizer: !store.isCustomizer })),
  handleColorClick: (color: string) => set({ selectedColor: color }),
  handleTextureChange: (texture: string) => set({ selectedTexture: texture }),
}));
