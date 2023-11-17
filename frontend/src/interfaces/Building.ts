interface Building {
  building_id: number;
  u_id: number;
  street: string;
  city: string;
  post_code: string;
  name: string;
  manager_name: string;
}

enum BuildingColor {
  GREEN = '#228b22',
  YELLOW = '#fff700',
  RED = 'red',
}

type BuildingInput = Omit<Building, 'building_id' | 'u_id'>;

export type { Building, BuildingInput };
export { BuildingColor };
