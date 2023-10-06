interface Property {
  id: number;
  address: string;
  city: string;
  postcode: string;
  name: string;
}

type PropertyInput = Omit<Property, 'id'>;

export { Property, PropertyInput };
