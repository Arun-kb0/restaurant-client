import PageTitle from '../components/PageTitle'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <main className='bg-black min-h-screen flex justify-center items-center'>

      <div className='space-y-4'>
        <PageTitle title='page not found' />
        <div className='flex justify-center'>
          <Button onClick={handleNavigate}>
            Home
          </Button>
        </div>
      </div>

    </main>
  )
}

export default NotFoundPage