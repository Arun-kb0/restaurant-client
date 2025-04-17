import UserNavbar from "./components/UserNavbar"
import CreatePage from "./pages/CreatePage"
import EditPage from "./pages/EditPage"
import Home from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <>
      <UserNavbar/>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/create" element={<CreatePage/>} /> 
        <Route path="/edit" element={<EditPage/>} /> 
      </Routes>
    </>
  )
}

export default App