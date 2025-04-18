import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Spinner } from "@material-tailwind/react";
import TextField from "./TextField";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RestaurantType } from "../constants/types";
import { GrRestaurant } from "react-icons/gr";
import CountryStateCitySelector from "./CountryStateCitySelector";
import { useState } from "react";
import { axiosInstance } from "../config/axiosInstance";
import errorHandler from "../util/errorHandler";
import { toast } from "react-toastify";
import { useRestaurants } from "../context/RestaurantContext";


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
  pincode: z
    .string()
    .regex(/^\d{6}$/, { message: "Pincode must be exactly 6 digits." }),
});

type FormInputs = z.infer<typeof formSchema>;

type Props = {
  isEdit: boolean
  restaurant?: RestaurantType
}

const CreateForm = ({ isEdit, restaurant }: Props) => {
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useRestaurants()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? restaurant?.name : "",
      email: isEdit ? restaurant?.email : "",
      phone: isEdit ? restaurant?.phone : "",
      pincode: isEdit ? String(restaurant?.address.pinCode) : "",
    },
  });

  const onSubmit = async (data: FormInputs) => {
    console.log('onsubmit called ')
    if (!isEdit && (state === '' || city === '')) {
      toast.error('State and city are required')
      return
    }
    setIsLoading(true)
    const updatedData: Partial<RestaurantType> = {
      id: restaurant?.id,
      name: data.name,
      address: {
        city: city,
        state: state,
        pinCode: data.pincode
      },
      phone: data.phone,
      email: data.email
    }
    try {
      let res
      if (isEdit) {
        if (!restaurant?.id) return
        console.log('restaurant edit call')
        res = await axiosInstance.patch(`/${restaurant.id}`, { restaurant: updatedData })
        toast('Restaurant updated.')
      } else {
        console.log('restaurant create call')
        res = await axiosInstance.post('/', { restaurant: updatedData })
        reset()
        toast('New Restaurant created.')
      }
      console.log(res.data)
      dispatch({ type: 'ADD', payload: res.data })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      errorHandler(error)
    }
  }

  const getStateAndCountry = (state: string, city: string) => {
    console.log("Final selection:", { state, city });
    setState(state)
    setCity(city)
  };


  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const phoneError = errors.phone?.message;
  const pincodeError = errors.pincode?.message;

  if (isLoading) return (<div className="w-full h-screen flex justify-center max-w-md p-3" > <Spinner /> </div>)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-3">
      <TextField
        label="Restaurant Name"
        error={nameError}
        icon={GrRestaurant}
        placeholder="seven senses"
        {...register("name")}
      />
      <TextField
        type="email"
        label="Email"
        error={emailError}
        icon={IoMail}
        placeholder="someone@example.com"
        {...register("email")}
      />
      <TextField
        type="phone"
        label="Phone"
        error={phoneError}
        icon={FaPhone}
        placeholder="9021231231"
        {...register("phone")}
      />
      <TextField
        type="pinCode"
        label="Pincode"
        error={pincodeError}
        icon={FaMapMarkerAlt}
        {...register("pincode")}
      />

      {!isEdit &&
        <CountryStateCitySelector
          getStateAndCountry={getStateAndCountry}
        />
      }

      <Button type="submit" className="w-full">
        {isEdit ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
}

export default CreateForm