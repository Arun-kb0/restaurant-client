import { RestaurantType } from "../constants/types";
import PageTitle from "./PageTitle";
import RestaurantCard from "./RestaurantCard"

export const restaurants: RestaurantType[] = [
  {
    id: "1",
    name: "The Culinary Haven",
    address: {
      city: "Taste Town",
      state: "TX",
      pinCode: 75001,
    },
    phone: "(555) 123-4567",
    email: "info@culinaryhaven.com",
  },
  {
    id: "2",
    name: "Skyline Bistro",
    address: {
      city: "Metro Heights",
      state: "CA",
      pinCode: 90001,
    },
    phone: "(555) 234-5678",
    email: "contact@skylinebistro.com",
  },
  {
    id: "3",
    name: "Lakeview Cafe",
    address: {
      city: "Meadow Springs",
      state: "WA",
      pinCode: 98001,
    },
    phone: "(555) 345-6789",
    email: "hello@lakeviewcafe.com",
  },
  {
    id: "4",
    name: "Urban Feast",
    address: {
      city: "Urban City",
      state: "NY",
      pinCode: 10005,
    },
    phone: "(555) 456-7890",
    email: "support@urbanfeast.com",
  },
];



const Restaurants = () => {
  return (
    <section className="space-y-6">

      <PageTitle title='Restaurants' />


      <div className="flex flex-wrap justify-center gap-2">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>

    </section>
  )
}

export default Restaurants