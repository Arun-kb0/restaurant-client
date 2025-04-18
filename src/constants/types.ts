export type RestaurantType = {
  id: string
  name: string;
  address: {
    city: string
    state: string
    pinCode: string
  }
  phone: string;
  email: string;
};
