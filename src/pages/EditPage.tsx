import { useLocation } from 'react-router-dom'
import CreateForm from '../components/CreateForm'
import PageTitle from '../components/PageTitle'
import { useState } from 'react'

const restaurant = {
  id: "1",
  name: "The Culinary Haven",
  address: {
    street: "25 Gourmet Blvd",
    city: "Taste Town",
    state: "TX",
    pinCode: 75001,
  },
  phone: "(555) 123-4567",
  email: "info@culinaryhaven.com",
}

const EditPage = () => {
  const location = useLocation()
  
  return (
    <main className="bg-black min-h-screen flex justify-center items-center">

      <div>
        <PageTitle title='edit restaurant' />
        <CreateForm
          isEdit={true}
          restaurant={location.state}
        />
      </div>

    </main>
  )
}

export default EditPage