import { AxiosError } from "axios"
import { toast } from 'react-toastify'

const errorHandler = (error: any) => {
  console.log(error)
  if (error instanceof AxiosError) {
    if (error.response) {
      toast.error(error?.response?.data.message)
    } else {
      toast.error('operation failed')
    }
  }
}

export default errorHandler