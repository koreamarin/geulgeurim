import {create} from 'zustand';


interface FilterState {
  positionIds : number[];
  experienceTypes  : string[];
  closeTypes  : string[];
  ChangePositionIds: (newPositionIds:number[]) => void;
  ChangeExperienceTypes: (newExperienceTypes:string[]) => void;
  ChangeCloseTypes: (newCloseTypes:string[]) => void;
  ResetFilter: () => void;
}

export const useRecruitFilterStore = create<FilterState>((set) => ({
  positionIds: [],
  experienceTypes: [],
  closeTypes: [],
  ChangePositionIds: (newPositionIds: number[]) => set({ positionIds: newPositionIds }),
  ChangeExperienceTypes: (newExperienceTypes: string[]) => set({ experienceTypes: newExperienceTypes }),
  ChangeCloseTypes: (newCloseTypes: string[]) => set({ closeTypes: newCloseTypes }),
  ResetFilter: () => set({ positionIds: [], experienceTypes: [], closeTypes: [] }),
}));

