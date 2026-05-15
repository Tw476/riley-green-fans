import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"
import bgImage from "../assets/dashboard-bg.jpg"

export default function Dashboard(){

  const navigate = useNavigate()
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const unsub = onAuthStateChanged(auth,(currentUser)=>{

      setLoading(false)

      if(currentUser){
        setUser(currentUser)
      }else{
        navigate("/login")
      }

    })

    return ()=>unsub()

  },[navigate])

  const handleLogout = async()=>{
    await signOut(auth)
    navigate("/login")
  }

  if(loading){
    return(
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-2xl">
        Loading...
      </div>
    )
  }

  return(
    <div className="min-h-screen flex bg-black text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="hidden md:flex w-72 bg-black/70 border-r border-white/10 flex-col p-6 relative z-20">

        <h1 className="text-3xl font-bold mb-12">
          🎵 Riley Fans
        </h1>

        <div className="space-y-3">

          <button
            onClick={()=>navigate("/dashboard")}
            className="w-full text-left px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/20 transition"
          >
            Dashboard
          </button>

          <button
            onClick={()=>navigate("/profile")}
            className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/20 transition"
          >
            My Profile
          </button>

          <button
            onClick={()=>navigate("/edit-profile")}
            className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/20 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={()=>navigate("/feed")}
            className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/20 transition"
          >
            Fan Feed
          </button>

        </div>

        {/* USER */}
        <div className="mt-auto bg-white/10 rounded-3xl p-5 border border-white/10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-2xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="font-semibold truncate">
                {user?.email}
              </p>

              <p className="text-sm text-gray-400">
                Active Fan
              </p>
            </div>

          </div>

          <button
            onClick={handleLogout}
            className="w-full mt-5 bg-red-600 hover:bg-red-700 py-3 rounded-2xl font-bold transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 relative overflow-y-auto">

        {/* BACKGROUND IMAGE */}
        <img
          src={bgImage}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* CONTENT */}
        <div className="relative z-10 p-6 md:p-10">

          {/* HERO */}
         <div className="bg-black/60 border border-white/10 rounded-[40px] p-8 md:p-12">
            <div className="absolute top-0 right-0 w-72 h-72 bg-green-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10">

              <p className="uppercase tracking-[4px] text-green-400 text-sm mb-3">
                Riley Green Fan Community
              </p>

              <h1 className="text-5xl font-black leading-tight max-w-2xl">
                Welcome Back To The Ultimate Fan Experience
              </h1>

              <p className="text-gray-300 mt-5 max-w-xl text-lg">
                Connect with fans, update your profile, explore the community,
                and enjoy the premium Riley Green experience.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={()=>navigate("/feed")}
                  className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-2xl font-bold transition"
                >
                  Explore Feed
                </button>

                <button
                  onClick={()=>navigate("/profile")}
                  className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition border border-white/10"
                >
                  View Profile
                </button>

              <button
                onClick={()=>navigate("/chat")}
                className="w-full text-left px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/20 transition"
                >
                Fan Chat
               </button>

              </div>

            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 text-sm uppercase">
                Community
              </p>

              <h2 className="text-4xl font-black mt-3">
                Fans
              </h2>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 text-sm uppercase">
                Status
              </p>

              <h2 className="text-4xl font-black mt-3 text-green-400">
                Online
              </h2>

            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

              <p className="text-gray-400 text-sm uppercase">
                Account
              </p>

              <h2 className="text-4xl font-black mt-3">
                Premium Fan
              </h2>

            </div>

          </div>

          {/* INFO CARD */}
          <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Account Information
            </h2>

            <div className="space-y-4 text-lg">

              <p>
                <span className="text-gray-400">Email:</span>{" "}
                {user?.email}
              </p>

              <p className="break-all">
                <span className="text-gray-400">User ID:</span>{" "}
                {user?.uid}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
