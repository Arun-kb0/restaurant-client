export type RestaurantType = {
  id: string
  name: string;
  address: {
    street: string
    city: string
    state: string
    pinCode: number
  }
  phone: string;
  email: string;
};
