export * from "./Home";
export * from "./TargetInfo";
export * from "./TargetSearch";
export * from "./TargetCreate";
export * from "./NavigationBar";

export interface Picture {
  id: number;
  path: string;
};

export interface Target {
  id: number;
  first_name: string;
  last_name: string;
  pictures: Picture[];
}

export const getName = (target: Target) => {
  return target.first_name + " " + target.last_name;
};
