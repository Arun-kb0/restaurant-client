import {
  createContext, Dispatch, ReactNode,
  useContext, useReducer
} from "react";
import { RestaurantType } from "../constants/types";

type Action =
  | { type: 'ADD', payload: RestaurantType }
  | { type: 'UPDATE', payload: RestaurantType }
  | { type: 'DELETE', payload: { restaurantId: string } }
  | { type: 'SET', payload: { restaurants: RestaurantType[], currentPage: number, numberOfPages: number } }

type State = {
  restaurants: RestaurantType[]
  page: number
  numberOfPages: number
}

const restaurantReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET': {
      const { restaurants: newRestaurants, currentPage, numberOfPages } = action.payload;
      if (currentPage === 1) {
        return {
          ...state,
          restaurants: newRestaurants,
          page: currentPage,
          numberOfPages
        }
      }

      const ids = new Set(state.restaurants?.map(item => item.id))
      const unique = newRestaurants.filter(item => !ids.has(item.id))
      return {
        restaurants: [...state.restaurants, ...unique],
        page: currentPage,
        numberOfPages,
      };
    } case 'ADD': {
      return {
        ...state,
        restaurants: [action.payload, ...state.restaurants]
      }
    } case 'UPDATE': {
      const updated = state.restaurants.filter(item => item.id !== action.payload.id);
      updated.push(action.payload);
      return {
        ...state,
        restaurants: updated
      }
    } case 'DELETE': {
      const filtered = state.restaurants.filter((item) => (
        item.id !== action.payload.restaurantId
      ))
      return {
        ...state,
        restaurants: filtered
      }
    } default:
      return state
  }
}

interface RestaurantContextProps {
  state: State
  dispatch: Dispatch<Action>;
}

// * context
const RestaurantContext = createContext<RestaurantContextProps | undefined>(
  undefined
)

// * provider
const initialState: State = {
  restaurants: [],
  page: 1,
  numberOfPages: 1,
}

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(restaurantReducer, initialState);

  return (
    <RestaurantContext.Provider value={{ state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  )
}

// * hook for consuming
export const useRestaurants = () => {
  const context = useContext(RestaurantContext)
  if (!context) {
    throw new Error("useRestaurants must be used within a RestaurantProvider")
  }
  return context
}