export type RestaurantType = {
  id: string
  name: string;
  address: {
    city: string
    state: string
    pinCode: number
  }
  phone: string;
  email: string;
};
