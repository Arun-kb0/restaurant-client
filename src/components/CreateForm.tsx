import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@material-tailwind/react";
import TextField from "./TextField";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RestaurantType } from "../constants/types";
import { GrRestaurant } from "react-icons/gr";


const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone number must be exactly 10 digits." }),
  street: z.string().min(1, { message: "Street is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: isEdit ? restaurant?.name : "",
      email: isEdit ? restaurant?.email : "",
      phone: isEdit ? restaurant?.phone : "",
      street: isEdit ? restaurant?.address.street : "",
      city: isEdit ? restaurant?.address.city : "",
      state: isEdit ? restaurant?.address.state : "",
      pincode: isEdit ? String(restaurant?.address.pinCode ) : "",
    },
  });

  function onSubmit(data: FormInputs) {
    if (isEdit) {
      console.log('restaurant edit call')
    } else {
      console.log('restaurant create call')
    }
    console.log(data);
  }

  const nameError = errors.name?.message;
  const emailError = errors.email?.message;
  const phoneError = errors.phone?.message;
  const streetError = errors.street?.message;
  const cityError = errors.city?.message;
  const stateError = errors.state?.message;
  const pincodeError = errors.pincode?.message;

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
        type="street"
        label="Street"
        error={streetError}
        icon={FaMapMarkerAlt}
        {...register("street")}
      />
      <TextField
        type="city"
        label="City"
        error={cityError}
        icon={FaMapMarkerAlt}
        {...register("city")}
      />
      <TextField
        type="state"
        label="State"
        error={stateError}
        icon={FaMapMarkerAlt}
        {...register("state")}
      />
      <TextField
        type="pinCode"
        label="Pincode"
        error={pincodeError}
        icon={FaMapMarkerAlt}
        {...register("pincode")}
      />
      <Button type="submit" className="w-full">
        {isEdit ? 'Edit' : 'Create'}
      </Button>
    </form>
  );
}

export default CreateForm