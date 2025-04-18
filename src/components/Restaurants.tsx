import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import RestaurantCard from "./RestaurantCard"
import { axiosInstance } from "../config/axiosInstance";
import errorHandler from "../util/errorHandler";
import { useRestaurants } from "../context/RestaurantContext";
import { Spinner } from "@material-tailwind/react";
import InfiniteScroll from "react-infinite-scroll-component";


const Restaurants = () => {
  const { state: { restaurants, page, numberOfPages }, dispatch } = useRestaurants()
  const [isLoading, setIsLoading] = useState(false)
  const [_, setHasMore] = useState<boolean>(() => page <= numberOfPages)

  useEffect(() => {
    console.log('page one call')
    if (restaurants.length !== 0) return

    (async () => {
      try {
        setIsLoading(true)
        const res = await axiosInstance.get('/', {
          params: {
            page,
            numberOfPages
          }
        })
        dispatch({ type: 'SET', payload: res.data })
        setIsLoading(false)
      } catch (error) {
        errorHandler(error)
      }
    })()
  }, [])

  const loadMore = async () => {
    console.log('triggered !!!! ')
    if (isLoading && page > numberOfPages) return
    try {
      setIsLoading(true)
      const res = await axiosInstance.get('/', {
        params: {
          page: page + 1,
          numberOfPages
        }
      })
      dispatch({ type: 'SET', payload: res.data })
      setIsLoading(false)
    } catch (error) {
      errorHandler(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setHasMore(page <= numberOfPages)
  }, [page, numberOfPages])

  return (
    // <>
    //   <PageTitle title='Restaurants' />
    //   <InfiniteScroll
    //     className='flex flex-wrap justify-center gap-2'
    //     scrollableTarget='home'
    //     dataLength={restaurants.length}
    //     next={loadMore}
    //     hasMore={hasMore}
    //     loader={isLoading &&
    //       <div className='w-full h-40 flex justify-center items-center'>
    //         <Spinner />
    //       </div>
    //     }
    //     height={window.innerHeight - 240}
    //   >
    //     {restaurants.map((restaurant) => (
    //       <RestaurantCard
    //         key={restaurant.id}
    //         restaurant={restaurant}
    //       />
    //     ))}
    //   </InfiniteScroll>

    // </>

    <>
      <PageTitle title="Restaurants" />
      <InfiniteScroll
        scrollableTarget="home"
        dataLength={restaurants.length}
        next={loadMore}
        hasMore={true}
        loader={
          isLoading && (
            <div className="w-full h-40 flex justify-center items-center">
              <Spinner />
            </div>
          )
        }
        className="flex flex-wrap justify-center gap-2"
      >
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </InfiniteScroll>

    </>

  )
}

export default Restaurants