import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import { useNavigate } from "react-router-dom"

export default function EditProfile(){

  const navigate = useNavigate()
  const [userId,setUserId] = useState(null)

  const [form,setForm] = useState({
    fullName:"",
    username:"",
    country:"",
    favoriteSong:"",
    bio:""
  })

  useEffect(()=>{

    onAuthStateChanged(auth, async(user)=>{

      if(!user){
        navigate("/login")
        return
      }

      setUserId(user.uid)

      const ref = doc(db,"users",user.uid)
      const snap = await getDoc(ref)

      if(snap.exists()){
        setForm(snap.data())
      }

    })

  },[navigate])

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSave = async()=>{
    await updateDoc(doc(db,"users",userId),form)
    alert("Profile updated")
    navigate("/dashboard")
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">

      <div className="w-full max-w-xl bg-white/10 p-8 rounded-3xl">

        <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>

        <input name="fullName" value={form.fullName || ""} onChange={handleChange}
          className="w-full p-3 mb-3 bg-black/40 rounded"/>

        <input name="username" value={form.username || ""} onChange={handleChange}
          className="w-full p-3 mb-3 bg-black/40 rounded"/>

        <input name="country" value={form.country || ""} onChange={handleChange}
          className="w-full p-3 mb-3 bg-black/40 rounded"/>

        <input name="favoriteSong" value={form.favoriteSong || ""} onChange={handleChange}
          className="w-full p-3 mb-3 bg-black/40 rounded"/>

        <textarea name="bio" value={form.bio || ""} onChange={handleChange}
          className="w-full p-3 mb-3 bg-black/40 rounded"/>

        <button onClick={handleSave}
          className="w-full bg-green-600 p-3 rounded font-bold">
          Save Changes
        </button>

      </div>

    </div>
  )
}