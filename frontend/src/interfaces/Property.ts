interface Property {
  id: number;
  address: string;
  city: string;
  postcode: number;
}

type PropertyInput = Omit<Property, 'id'>;

export { Property, PropertyInput };
