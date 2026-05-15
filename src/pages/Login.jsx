import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

export default function Login(){

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleLogin = async(e)=>{
    e.preventDefault()

    try{
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      navigate("/dashboard")

    }catch(err){
      alert(err.message)
    }
  }

  return(
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* BACKGROUND IMAGE (FIXED) */}
      <img
        src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* FORM */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl"
      >

        <h1 className="text-4xl font-bold text-center text-white mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-300 mb-8">
          Login to Riley Green Fans
        </p>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-xl bg-black/40 text-white border border-gray-700 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 p-4 rounded-xl font-bold text-white"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={()=>navigate("/")}
            className="text-green-400 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </form>

    </div>
  )
}