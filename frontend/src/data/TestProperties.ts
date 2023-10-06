import { Property, PropertyInput } from '../interfaces/Property';
import { CITIES } from '../variables/Constants';

const p1: Property = {
  id: 1,
  address: 'Testikuja 1',
  city: CITIES[0],
  postcode: '00100',
  name: 'Nimi 1',
};

const p2: Property = {
  id: 2,
  address: 'Testikuja 2',
  city: CITIES[1],
  postcode: '00200',
  name: 'Nimi 2',
};

const p3: Property = {
  id: 3,
  address: 'Testitie 3',
  city: CITIES[1],
  postcode: '00200',
  name: 'Nimi 3',
};

export const testProperties = [p1, p2, p3];
