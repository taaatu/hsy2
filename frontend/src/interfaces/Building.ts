interface Building {
  building_id: number;
  u_id: number;
  street: string;
  city: string;
  post_code: string;
  name: string;
  manager_name: string;
}

type BuildingInput = Omit<Building, 'building_id' | 'u_id'>;

export type { Building, BuildingInput };
