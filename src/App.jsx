import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Feed from "./pages/Feed"
import Chat from "./pages/Chat"

export default function App(){

  return(
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/chat" element={<Chat />} />

        {/* DASHBOARD (PROTECTED INSIDE DASHBOARD FILE) */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}