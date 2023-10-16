import { Building, BuildingInput } from '../interfaces/Building';
import { CITIES } from '../variables/Constants';

const p1: Building = {
  building_id: 1,
  street: 'Testikuja 1',
  city: CITIES[0],
  post_code: '00100',
  name: 'Nimi 1',
};

const p2: Building = {
  building_id: 2,
  street: 'Testikuja 2',
  city: CITIES[1],
  post_code: '00200',
  name: 'Nimi 2',
};

const p3: Building = {
  building_id: 3,
  street: 'Testitie 3',
  city: CITIES[1],
  post_code: '00200',
  name: 'Nimi 3',
};

export const testProperties = [p1, p2, p3];
