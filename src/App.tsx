import UserNavbar from "./components/UserNavbar"
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import Home from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import NotFoundPage from "./pages/NotFoundPage"

const App = () => {
  return (
    <>
      <UserNavbar/>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/create" element={<CreatePage/>} /> 
        <Route path="/edit" element={<EditPage/>} /> 
        <Route path="*" element={<NotFoundPage/>} /> 
      </Routes>
    </>
  )
}

export default App