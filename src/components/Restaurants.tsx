import { useEffect, useState } from "react";
import { RestaurantType } from "../constants/types";
import PageTitle from "./PageTitle";
import RestaurantCard from "./RestaurantCard"
import { axiosInstance } from "../config/axiosInstance";
import errorHandler from "../util/errorHandler";


const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([])
  const [page, setPage] = useState(1)
  const [numberOfPages, setNumberOfPages] = useState(1)

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get('/', {
          params: {
            page,
            numberOfPages
          }
        })
        setRestaurants(res.data.restaurants)
        setPage(res.data.currentPage)
        setNumberOfPages(res.data.numberOfPages)
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [])

  useEffect(() => {
    if (page > numberOfPages) return
    (async () => {
      try {
        const res = await axiosInstance.get('/', {
          params: {
            page: page + 1,
            numberOfPages
          }
        })
        console.log(res.data)
        setRestaurants(res.data.restaurants)
        setPage(res.data.currentPage)
        setNumberOfPages(res.data.numberOfPages)
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [page])



  return (
    <section className="space-y-6">

      <PageTitle title='Restaurants' />

      <div className="flex flex-wrap justify-center gap-2">
        {restaurants?.map((restaurant) => (
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