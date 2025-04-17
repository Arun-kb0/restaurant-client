import { useLocation } from 'react-router-dom'
import CreateForm from '../components/CreateForm'
import PageTitle from '../components/PageTitle'


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