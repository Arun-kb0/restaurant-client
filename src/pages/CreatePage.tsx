import CreateForm from '../components/CreateForm'
import PageTitle from '../components/PageTitle'


const CreatePage = () => {
  return (
    <main className="bg-black min-h-screen flex justify-center items-center">

      <div>
        <PageTitle title='add new restaurant' />
        <CreateForm isEdit={false} />
      </div>

    </main>
  )
}

export default CreatePage