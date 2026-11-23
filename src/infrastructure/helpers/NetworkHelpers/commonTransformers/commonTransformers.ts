type CascaderLevel = "building" | "floor" | "room";

export interface CascaderNode {
  value: number;
  label: string;
  level: CascaderLevel;
  isLeaf: boolean;
  loading?: boolean;
  children?: CascaderNode[];
}

export function transformDormitoryTreeViewData(
  rawBuildingsString: string
): CascaderNode[] {
  const buildings = JSON.parse(rawBuildingsString) as {
    id: number;
    title: string;
    floors?: {
      id: number;
      title: string;
      rooms?: { id: number; title: string }[];
    }[];
  }[];

  return buildings.map((building) => ({
    value: building.id,
    label: building.title,
    level: "building",
    isLeaf: false,
    loading: false,
    children:
      building.floors?.map((floor) => ({
        value: floor.id,
        label: floor.title,
        level: "floor",
        isLeaf: false,
        loading: false,
        children:
          floor.rooms?.map((room) => ({
            value: room.id,
            label: room.title,
            level: "room",
            isLeaf: true,
          })) ?? [],
      })) ?? [],
  }));
}
