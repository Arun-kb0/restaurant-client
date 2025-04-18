import { AxiosError } from "axios"
import { toast } from 'react-toastify'

const errorHandler = (error: any) => {
  if (error instanceof AxiosError) {
    toast.error(error.message)
  }
}

export default errorHandler