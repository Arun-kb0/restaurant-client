import { Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { RestaurantType } from "../constants/types";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import errorHandler from "../util/errorHandler";
import { useRestaurants } from "../context/RestaurantContext";

type Props = {
  restaurant: RestaurantType
}

const RestaurantCard = ({ restaurant }: Props) => {
  const navigate = useNavigate()
  const { dispatch } = useRestaurants()

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/${restaurant.id}`)
      dispatch({ type: 'DELETE', payload: { restaurantId: res.data.id } })
    } catch (error) {
      errorHandler(error)
    }
  }

  const handleEdit = () => {
    navigate('/edit', { state: restaurant })
  }

  return (
    <Card className="max-w-xs max-h-72">
      <Card.Body>
        <Typography type="h4" className='text-center font-semibold capitalize ' >{restaurant.name}</Typography>
        <div>
          <Typography className="my-1 text-foreground font-semibold"> Address </Typography>
          <Typography className="my-1 text-foreground"> {`${restaurant.address.city}, ${restaurant.address.state}, `}</Typography>
          <Typography className="my-1 text-foreground"> pincode : {restaurant.address.pinCode}</Typography>
        </div>
        <div>
          <Typography className="my-1 text-foreground font-semibold"> Contact </Typography>
          <Typography className="my-1 text-foreground"> phone : {restaurant.phone}</Typography>
          <Typography className="my-1 text-foreground"> email : {restaurant.email}</Typography>
        </div>

      </Card.Body>
      <Card.Footer className='flex justify-center item-center gap-2' >
        <Tooltip>
          <Tooltip.Trigger>
            <IconButton variant="outline" onClick={handleEdit}>
              <MdModeEdit className="h-[60%] w-[60%]" />
            </IconButton>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Edit
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger>
            <IconButton variant="outline" onClick={handleDelete}>
              <MdDelete className="h-[60%] w-[60%]" />
            </IconButton>
          </Tooltip.Trigger>
          <Tooltip.Content>
            Delete
            <Tooltip.Arrow />
          </Tooltip.Content>
        </Tooltip>
      </Card.Footer>
    </Card >
  );
}

export default RestaurantCard